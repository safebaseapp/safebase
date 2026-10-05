import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

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
    const email = attributes?.user_email || attributes?.customer_email || attributes?.email;

    if (!email) {
      console.error("Lemon Squeezy webhook: customer email missing", eventName);
      return NextResponse.json({ error: "Customer email missing" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const normalizedEmail = String(email).trim().toLowerCase();
    const fields = lifecycleFields(payload);
    const explicitStatus = String(attributes?.status ?? "").toLowerCase();
    const isExpired = eventName === "subscription_expired" || explicitStatus === "expired";
    const isPremiumEvent = eventName.startsWith("subscription_") && !isExpired;
    const nextPlan: "premium" | "free" | null = isExpired ? "free" : isPremiumEvent ? "premium" : null;

    let matchedUserId: string | null = null;

    const { data: profileMatch } = await supabase
      .from("profiles")
      .select("id")
      .ilike("email", normalizedEmail)
      .limit(1)
      .maybeSingle();

    if (profileMatch?.id) matchedUserId = profileMatch.id;

    if (!matchedUserId) {
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

      console.log(`SERNEM billing sync: ${normalizedEmail} (${eventName})`);
      return NextResponse.json({ received: true });
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
