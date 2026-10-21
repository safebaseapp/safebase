import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { getLemonSubscription } from "../../../../lib/lemonsqueezy";
import { PREMIUM_TRIAL_VARIANT_ID } from "../../../../lib/premium-trial-config";

export const runtime = "nodejs";

function verifySignature(rawBody: string, signature: string | null) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(digest, "utf8"), Buffer.from(signature, "utf8"));
  } catch {
    return false;
  }
}

type WebhookPayload = {
  meta?: { event_name?: string; custom_data?: { user_id?: string; trial_reservation_id?: string } };
  data?: { id?: string; type?: string; attributes?: { variant_id?: string | number; trial_ends_at?: string | null; customer_id?: string | number; status?: string; cancelled?: boolean; renews_at?: string | null; ends_at?: string | null; user_email?: string; customer_email?: string; email?: string } };
};

function lifecycleFields(payload: WebhookPayload) {
  const data = payload?.data ?? {};
  const attributes = data?.attributes ?? {};
  const isSubscription = data?.type === "subscriptions";

  return {
    lemon_subscription_id: isSubscription && data?.id ? String(data.id) : null,
    lemon_customer_id:
      attributes?.customer_id === undefined || attributes?.customer_id === null
        ? null
        : String(attributes.customer_id),
    subscription_status: attributes?.status ? String(attributes.status).toLowerCase() : null,
    subscription_cancelled: Boolean(attributes?.cancelled),
    subscription_renews_at: attributes?.renews_at || null,
    subscription_ends_at: attributes?.ends_at || null,
  };
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-signature");

    if (!verifySignature(rawBody, signature)) {
      console.error("Lemon Squeezy webhook: invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody) as WebhookPayload;
    const eventName = String(payload?.meta?.event_name ?? "");
    let attributes = payload?.data?.attributes ?? {};
    const customData = payload?.meta?.custom_data ?? {};
    const customUserId = customData?.user_id ? String(customData.user_id).trim() : "";
    const email = attributes?.user_email || attributes?.customer_email || attributes?.email;

    if (!email && !customUserId) {
      console.error("Lemon Squeezy webhook: customer identity missing", eventName);
      return NextResponse.json({ error: "Customer identity missing" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    let normalizedEmail = email ? String(email).trim().toLowerCase() : "";
    // Only subscriptions grant membership. Orders and payment notification events
    // must not create pending grants that the profile trigger would later apply.
    if (!eventName.startsWith("subscription_") || payload?.data?.type !== "subscriptions" || !payload.data.id) {
      return NextResponse.json({ received: true, ignored: true });
    }
    const current = await getLemonSubscription(String(payload.data.id));
    if (current.data.id !== String(payload.data.id) || current.data.type !== "subscriptions") {
      return NextResponse.json({ error: "Subscription mismatch" }, { status: 400 });
    }
    attributes = current.data.attributes;
    payload.data.attributes = attributes;
    normalizedEmail = String(attributes.user_email || email || "").trim().toLowerCase();
    const explicitStatus = String(attributes.status ?? "").toLowerCase();
    const verifiedTrialEndsAt = attributes.trial_ends_at ?? null;
    const verifiedAccessEndsAt = attributes.ends_at ?? null;
    const isTrialCheckout = Boolean(customData?.trial_reservation_id);
    if (isTrialCheckout && (!customUserId || String(attributes.variant_id ?? "") !== PREMIUM_TRIAL_VARIANT_ID)) {
      return NextResponse.json({ error: "Trial identity or variant mismatch" }, { status: 400 });
    }
    const approvedVariants = new Set([PREMIUM_TRIAL_VARIANT_ID,
      ...(process.env.LEMONSQUEEZY_PREMIUM_VARIANT_IDS ?? "").split(",").map(v => v.trim()).filter(Boolean)]);
    const approvedVariant = approvedVariants.has(String(attributes.variant_id ?? ""));
    const fields = lifecycleFields(payload);
    const isSubscriptionEvent = eventName.startsWith("subscription_");
    const isExpired = explicitStatus === "expired";
    // Never grant Premium from an event name alone: billing retries, failed
    // payments and paused subscriptions must not create new entitlements.
    const grantedStatuses = new Set(["active", "on_trial"]);
    const revokedStatuses = new Set(["expired", "unpaid", "paused"]);
    const cancelledAccessEnds = Date.parse(verifiedAccessEndsAt || "");
    const nextPlan: "premium" | "free" | null = !isSubscriptionEvent
      ? null
      : grantedStatuses.has(explicitStatus)
        ? "premium"
        : explicitStatus === "cancelled"
          ? Number.isFinite(cancelledAccessEnds) && Date.now() < cancelledAccessEnds ? "premium" : "free"
        : (isExpired || revokedStatuses.has(explicitStatus))
          ? "free"
          : null;

    let matchedUserId: string | null = null;
    let existingSubscription: string | null = null;

    // An existing verified subscription binding survives billing/account email
    // changes. Never let event custom data redirect that binding to another user.
    const { data: boundProfile, error: boundProfileError } = await supabase
      .from("profiles").select("id,lemon_subscription_id")
      .eq("lemon_subscription_id", String(payload.data.id)).maybeSingle();
    if (boundProfileError) throw boundProfileError;
    if (boundProfile?.id) {
      if (customUserId && customUserId !== boundProfile.id) {
        return NextResponse.json({ error: "Subscription identity mismatch" }, { status: 400 });
      }
      matchedUserId = boundProfile.id;
      existingSubscription = boundProfile.lemon_subscription_id;
    }

    // New bindings require checkout identity and provider email agreement.
    if (!matchedUserId && customUserId) {
      const { data: profileById, error: profileByIdError } = await supabase
        .from("profiles")
        .select("id, email, lemon_subscription_id")
        .eq("id", customUserId)
        .maybeSingle();

      if (profileByIdError) throw profileByIdError;

      if (profileById?.id) {
        matchedUserId = profileById.id;
        existingSubscription = profileById.lemon_subscription_id ?? null;
        const profileEmail = profileById.email ? String(profileById.email).trim().toLowerCase() : "";
        if (normalizedEmail && profileEmail && normalizedEmail !== profileEmail) {
          return NextResponse.json({ error: "Billing identity mismatch" }, { status: 400 });
        }
      } else {
        const { data: authUser, error: authUserError } = await supabase.auth.admin.getUserById(customUserId);
        if (authUserError) throw authUserError;
        if (authUser?.user?.id) {
          if (!normalizedEmail || authUser.user.email?.trim().toLowerCase() !== normalizedEmail) {
            return NextResponse.json({ error: "Billing identity mismatch" }, { status: 400 });
          }
          matchedUserId = authUser.user.id;
        }
      }
    }

    // Backward-compatible fallback for existing Lemon checkout links that do not yet pass user_id.
    if (!matchedUserId && normalizedEmail && !isTrialCheckout) {
      const { data: profileMatch } = await supabase
        .from("profiles")
        .select("id,lemon_subscription_id")
        .eq("email", normalizedEmail)
        .limit(1)
        .maybeSingle();

      if (profileMatch?.id) { matchedUserId = profileMatch.id; existingSubscription = profileMatch.lemon_subscription_id ?? null; }
    }

    if (!matchedUserId && normalizedEmail && !isTrialCheckout) {
      let page = 1;
      while (!matchedUserId && page <= 10) {
        const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
        if (error) throw error;
        const match = data.users.find((user) => user.email?.trim().toLowerCase() === normalizedEmail);
        if (match) matchedUserId = match.id;
        if (data.users.length < 1000) break;
        page += 1;
      }
    }

    if (isTrialCheckout && !matchedUserId) {
      return NextResponse.json({ error: "Trial account not found" }, { status: 400 });
    }
    if (explicitStatus === "on_trial" && (!isTrialCheckout || !Number.isFinite(Date.parse(verifiedTrialEndsAt || "")) || Date.parse(verifiedTrialEndsAt!) <= Date.now())) {
      return NextResponse.json({ error: "A current verified trial reservation is required" }, { status: 400 });
    }
    if (existingSubscription && existingSubscription !== String(payload.data.id)) {
      return NextResponse.json({ error: "Different subscription is already linked" }, { status: 409 });
    }
    // Existing bound subscriptions keep their legacy product mapping. New grants
    // require an explicitly approved variant; unknown products never grant access.
    if (!approvedVariant && existingSubscription !== String(payload.data.id)) {
      return NextResponse.json({ error: "Unapproved subscription variant" }, { status: 400 });
    }
    if (!nextPlan) return NextResponse.json({ received: true, ignored: true });

    if (matchedUserId && customData?.trial_reservation_id && payload?.data?.type === "subscriptions") {
      const trialReservationId = String(customData.trial_reservation_id);
      const trialStatus = attributes?.cancelled === true ? "cancelled"
        : explicitStatus === "on_trial" ? "on_trial"
        : explicitStatus === "active" ? "active"
        : explicitStatus === "expired" ? "expired"
        : explicitStatus === "cancelled" ? "cancelled" : null;
      if (trialStatus) {
        const { data: trialReservation, error: reservationLookupError } = await supabase
          .from("premium_trial_reservations")
          .select("id")
          .eq("id", trialReservationId)
          .eq("user_id", matchedUserId)
          .maybeSingle();
        if (reservationLookupError) throw reservationLookupError;
        if (!trialReservation) {
          console.error("Lemon Squeezy webhook: trial reservation does not match user");
          return NextResponse.json({ error: "Invalid trial reservation" }, { status: 400 });
        }
        const { error: trialSyncError } = await supabase
          .from("premium_trial_reservations")
          .update({ status: trialStatus, lemon_subscription_id: String(payload.data.id), trial_ends_at: verifiedTrialEndsAt, access_ends_at: verifiedAccessEndsAt, updated_at: new Date().toISOString() })
          .eq("id", trialReservationId).eq("user_id", matchedUserId);
        if (trialSyncError) throw trialSyncError;
      }
    }

    if (matchedUserId) {
      const update: Record<string, unknown> = {
        subscription_synced_at: new Date().toISOString(),
      };

      if (nextPlan) update.plan = nextPlan;
      if (fields.lemon_subscription_id) update.lemon_subscription_id = fields.lemon_subscription_id;
      if (fields.lemon_customer_id) update.lemon_customer_id = fields.lemon_customer_id;
      if (fields.subscription_status) update.subscription_status = fields.subscription_status;
      if (payload?.data?.type === "subscriptions") {
        update.subscription_cancelled = fields.subscription_cancelled;
        update.subscription_renews_at = fields.subscription_renews_at;
        update.subscription_ends_at = fields.subscription_ends_at;
      }

      let write = supabase.from("profiles").update(update).eq("id", matchedUserId);
      write = existingSubscription ? write.eq("lemon_subscription_id", existingSubscription) : write.is("lemon_subscription_id", null);
      const { data: saved, error } = await write.select("id").maybeSingle();
      if (error) throw error;
      if (!saved) return NextResponse.json({ error: "Subscription binding changed; retry" }, { status: 409 });

      console.info("SERNEM billing state synchronized");
      return NextResponse.json({ received: true });
    }

    // Pending entitlement remains the safety net for legacy/external checkouts that cannot be matched yet.
    if (!normalizedEmail) {
      console.error("Lemon Squeezy webhook: unmatched customer");
      return NextResponse.json({ error: "Unable to match customer" }, { status: 400 });
    }

    const pendingStatus = nextPlan === "premium" ? "active" : "inactive";
    const { data: existing, error: lookupError } = await supabase
      .from("pending_premium_entitlements")
      .select("id,lemon_subscription_id")
      .eq("email", normalizedEmail)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (lookupError) throw lookupError;

    const pendingUpdate: Record<string, unknown> = {
      email: normalizedEmail,
      status: pendingStatus,
      updated_at: new Date().toISOString(),
    };
    if (fields.lemon_subscription_id) pendingUpdate.lemon_subscription_id = fields.lemon_subscription_id;
    if (fields.lemon_customer_id) pendingUpdate.lemon_customer_id = fields.lemon_customer_id;
    if (fields.subscription_status) pendingUpdate.subscription_status = fields.subscription_status;
    if (payload?.data?.type === "subscriptions") {
      pendingUpdate.subscription_cancelled = fields.subscription_cancelled;
      pendingUpdate.subscription_renews_at = fields.subscription_renews_at;
      pendingUpdate.subscription_ends_at = fields.subscription_ends_at;
    }

    if (existing?.lemon_subscription_id && existing.lemon_subscription_id !== String(payload.data.id)) {
      return NextResponse.json({ error: "Different pending subscription is already linked" }, { status: 409 });
    }
    if (existing?.id) {
      const { error } = await supabase.from("pending_premium_entitlements").update(pendingUpdate).eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("pending_premium_entitlements").insert(pendingUpdate);
      if (error) throw error;
    }

    console.info("SERNEM pending billing state synchronized");
    return NextResponse.json({ ok: true, pending: true });
  } catch {
    console.error("Lemon Squeezy webhook processing failed");
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
