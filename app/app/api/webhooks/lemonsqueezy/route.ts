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

function lifecycleFields(payload: any) {
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

    const payload = JSON.parse(rawBody);
    const eventName = String(payload?.meta?.event_name ?? "");
    const attributes = payload?.data?.attributes ?? {};
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

    const normalizedEmail = email ? String(email).trim().toLowerCase() : "";
    const fields = lifecycleFields(payload);
    let explicitStatus = String(attributes?.status ?? "").toLowerCase();
    const isTrialCheckout = Boolean(customData?.trial_reservation_id);
    // Reconcile trial status with Lemon to avoid out-of-order webhook grants.
    if (isTrialCheckout) {
      if (payload?.data?.type !== "subscriptions" || !payload?.data?.id || !customUserId) {
        return NextResponse.json({ error: "Invalid trial identity" }, { status: 400 });
      }
      const current = await getLemonSubscription(String(payload.data.id));
      if (String(current.data.attributes.variant_id ?? "") !== PREMIUM_TRIAL_VARIANT_ID) {
        return NextResponse.json({ error: "Trial variant mismatch" }, { status: 400 });
      }
      explicitStatus = String(current.data.attributes.status ?? "").toLowerCase();
      attributes.status = explicitStatus;
      attributes.cancelled = current.data.attributes.cancelled;
      attributes.renews_at = current.data.attributes.renews_at ?? null;
      attributes.ends_at = current.data.attributes.ends_at ?? null;
    }
    const isSubscriptionEvent = eventName.startsWith("subscription_");
    const isExpired = eventName === "subscription_expired" || explicitStatus === "expired";
    // Never grant Premium from an event name alone: billing retries, failed
    // payments and paused subscriptions must not create new entitlements.
    const grantedStatuses = new Set(["active", "on_trial"]);
    const revokedStatuses = new Set(["expired", "unpaid"]);
    const nextPlan: "premium" | "free" | null = !isSubscriptionEvent
      ? null
      : grantedStatuses.has(explicitStatus)
        ? "premium"
        : (isExpired || revokedStatuses.has(explicitStatus))
          ? "free"
          : null;

    let matchedUserId: string | null = null;

    // Preferred identity: a Supabase user ID explicitly attached to the Lemon checkout.
    // Lemon Squeezy returns checkout custom data under meta.custom_data for subscription/order webhooks.
    if (customUserId) {
      const { data: profileById, error: profileByIdError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("id", customUserId)
        .maybeSingle();

      if (profileByIdError) throw profileByIdError;

      if (profileById?.id) {
        matchedUserId = profileById.id;
        const profileEmail = profileById.email ? String(profileById.email).trim().toLowerCase() : "";
        if (normalizedEmail && profileEmail && normalizedEmail !== profileEmail) {
          console.warn("Lemon Squeezy webhook: custom user ID matched with different billing email", {
            eventName,
            userId: customUserId,
          });
        }
      } else {
        const { data: authUser } = await supabase.auth.admin.getUserById(customUserId);
        if (authUser?.user?.id) matchedUserId = authUser.user.id;
      }
    }

    // Backward-compatible fallback for existing Lemon checkout links that do not yet pass user_id.
    if (!matchedUserId && normalizedEmail && !isTrialCheckout) {
      const { data: profileMatch } = await supabase
        .from("profiles")
        .select("id")
        .ilike("email", normalizedEmail)
        .limit(1)
        .maybeSingle();

      if (profileMatch?.id) matchedUserId = profileMatch.id;
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

    if (matchedUserId && customData?.trial_reservation_id && payload?.data?.type === "subscriptions") {
      const trialReservationId = String(customData.trial_reservation_id);
      const trialStatus = explicitStatus === "on_trial" ? "on_trial"
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
          .update({ status: trialStatus, updated_at: new Date().toISOString() })
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

      const { error } = await supabase.from("profiles").update(update).eq("id", matchedUserId);
      if (error) throw error;

      console.log(`SERNEM billing sync: ${matchedUserId} (${eventName})`);
      return NextResponse.json({ received: true });
    }

    // Pending entitlement remains the safety net for legacy/external checkouts that cannot be matched yet.
    if (!normalizedEmail) {
      console.error("Lemon Squeezy webhook: unmatched custom user ID and no billing email", {
        eventName,
        userId: customUserId,
      });
      return NextResponse.json({ error: "Unable to match customer" }, { status: 400 });
    }

    const pendingStatus = isExpired ? "inactive" : "active";
    const { data: existing, error: lookupError } = await supabase
      .from("pending_premium_entitlements")
      .select("id")
      .ilike("email", normalizedEmail)
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

    if (existing?.id) {
      const { error } = await supabase.from("pending_premium_entitlements").update(pendingUpdate).eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("pending_premium_entitlements").insert(pendingUpdate);
      if (error) throw error;
    }

    console.log(`SERNEM pending Premium: ${normalizedEmail} -> ${pendingStatus} (${eventName})`);
    return NextResponse.json({ ok: true, pending: true });
  } catch (error) {
    console.error("Lemon Squeezy webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
