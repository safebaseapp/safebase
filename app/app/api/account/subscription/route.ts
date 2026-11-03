import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import {
  cancelLemonSubscription,
  getLemonSubscription,
  getRecentPaidSubscriptionInvoice,
  resumeLemonSubscription,
  subscriptionFields,
} from "@/lib/lemonsqueezy";
import { hasCurrentBillingPremium } from "@/lib/auth/billing-premium";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const OWNER_EMAIL = "safebase.global@gmail.com";
const noStore = { "Cache-Control": "private, no-store" };

function adminDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Billing database is not configured");
  return createAdminClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function accountContext() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan,role,status,lemon_subscription_id,lemon_customer_id,subscription_status,subscription_cancelled,subscription_renews_at,subscription_ends_at,subscription_paid_through_at,subscription_paid_verified_at")
    .eq("id", user.id)
    .maybeSingle();
  if (profileError || !profile) return { error: NextResponse.json({ error: "Unable to load account" }, { status: 500 }) };
  const protectedAccount = profile.role === "admin" || user.email?.toLowerCase() === OWNER_EMAIL;
  return { supabase, user, profile, protectedAccount };
}

async function loadTrialRecord(userId: string, subscriptionId: string) {
  const db = adminDatabase();
  const { data, error } = await db.from("premium_trial_reservations")
    .select("id,status,trial_ends_at,access_ends_at,lemon_subscription_id")
    .eq("user_id", userId)
    .eq("lemon_subscription_id", subscriptionId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

function validUntil(...values: (string | null | undefined)[]) {
  const available = values.map((v) => Date.parse(v || "")).filter(Number.isFinite);
  return available.length ? new Date(Math.min(...available)).toISOString() : null;
}

function snapshot(fields: ReturnType<typeof subscriptionFields>) {
  return {
    status: fields.subscription_status,
    cancelled: fields.subscription_cancelled,
    renewsAt: fields.subscription_renews_at,
    endsAt: fields.subscription_ends_at,
  };
}

export async function GET() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { supabase, user, profile, protectedAccount } = ctx;
  const premiumAccess = protectedAccount ||
    await hasCurrentBillingPremium(supabase, user.id, profile.plan);
  let trialEndsAt: string | null = null;
  if (profile.lemon_subscription_id) {
    try {
      const trial = await loadTrialRecord(user.id, profile.lemon_subscription_id);
      trialEndsAt = trial?.trial_ends_at || null;
    } catch (error) {
      console.error("Billing trial lookup failed", error);
      return NextResponse.json({ error: "Unable to verify subscription period" }, { status: 503, headers: noStore });
    }
  }
  return NextResponse.json({
    plan: premiumAccess ? "premium" : "free",
    premiumAccess,
    protectedAccount,
    billingManaged: Boolean(profile.lemon_subscription_id),
    subscription: profile.lemon_subscription_id ? {
      status: profile.subscription_status,
      cancelled: Boolean(profile.subscription_cancelled),
      renewsAt: profile.subscription_renews_at,
      endsAt: profile.subscription_ends_at,
      paidThroughAt: profile.subscription_paid_through_at,
      paidVerifiedAt: profile.subscription_paid_verified_at,
      trialEndsAt,
    } : null,
  }, { headers: noStore });
}

export async function POST() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { profile, protectedAccount } = ctx;
  if (protectedAccount) return NextResponse.json({ error: "Owner/admin billing is protected" }, { status: 403 });
  if (!profile.lemon_subscription_id) return NextResponse.json({ error: "No managed subscription found" }, { status: 404 });
  try {
    const sub = await getLemonSubscription(profile.lemon_subscription_id);
    const url = sub.data.attributes.urls?.customer_portal;
    if (!url || new URL(url).protocol !== "https:") {
      return NextResponse.json({ error: "Customer portal is unavailable" }, { status: 502 });
    }
    return NextResponse.json({ url }, { headers: noStore });
  } catch (error) {
    console.error("Lemon customer portal error", error);
    return NextResponse.json({ error: "Unable to open billing portal" }, { status: 502 });
  }
}

export async function DELETE() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { user, profile, protectedAccount } = ctx;
  if (protectedAccount) return NextResponse.json({ error: "Owner/admin subscription cannot be cancelled" }, { status: 403 });
  const id = profile.lemon_subscription_id;
  if (!id) return NextResponse.json({ error: "No managed subscription found" }, { status: 404 });

  try {
    const current = await getLemonSubscription(id);
    if (String(current.data.id) !== id || current.data.type !== "subscriptions")
      return NextResponse.json({ error: "Subscription identity mismatch" }, { status: 502 });
    const before = current.data.attributes;
    const alreadyCancelled = Boolean(before.cancelled);
    if (!alreadyCancelled && !["active", "on_trial"].includes(String(before.status).toLowerCase()))
      return NextResponse.json({ error: "No active renewal to cancel" }, { status: 409 });

    const trial = await loadTrialRecord(user.id, id);
    // A provider status of "active" is a paid subscription; "on_trial"
    // is a free trial. Independently inspect paid invoices as evidence.
    let verifiedPaidAt: string | null = profile.subscription_paid_verified_at || null;
    if (["active", "cancelled"].includes(String(before.status).toLowerCase())) {
      try {
        const invoice = await getRecentPaidSubscriptionInvoice(id);
        if (invoice.verified) verifiedPaidAt = invoice.paidAt;
      } catch (error) {
        // Cancellation must remain possible even if invoice history is offline.
        console.error("Paid invoice verification unavailable during cancellation", error);
      }
    }

    const updated = alreadyCancelled ? current : await cancelLemonSubscription(id);
    const fields = subscriptionFields(updated);
    if (!fields.subscription_cancelled || fields.subscription_status !== "cancelled")
      return NextResponse.json({ error: "Provider did not confirm cancellation" }, { status: 502 });

    const isTrialCancellation = String(before.status).toLowerCase() === "on_trial" ||
      (alreadyCancelled && Boolean(trial?.trial_ends_at) && !verifiedPaidAt &&
        !profile.subscription_paid_through_at);
    const providerEnd = fields.subscription_ends_at;
    // Provider may expose a later subscription interval when a free trial is
    // cancelled. Never use the provider end by itself as evidence of trial access.
    const trialCutoff = isTrialCancellation && (before.trial_ends_at || trial?.trial_ends_at)
      ? validUntil(before.trial_ends_at, trial?.trial_ends_at, providerEnd)
      : null;
    const paidThrough = isTrialCancellation
      ? null
      : providerEnd || profile.subscription_paid_through_at || null;
    const accessEndsAt = isTrialCancellation ? trialCutoff : paidThrough;
    const db = adminDatabase();
    const { error: syncError, data: saved } = await db.from("profiles")
      .update({
        ...fields,
        subscription_paid_through_at: paidThrough,
        subscription_paid_verified_at: isTrialCancellation ? null : verifiedPaidAt,
      })
      .eq("id", user.id).eq("lemon_subscription_id", id)
      .select("id").maybeSingle();
    if (syncError || !saved) {
      console.error("Provider cancellation confirmed but profile sync pending", syncError);
      return NextResponse.json({
        confirmed: true, warning: "Subscription cancelled at payment provider; account sync pending",
        accessEndsAt, paidPeriod: !isTrialCancellation,
      }, { status: 202, headers: noStore });
    }

    if (trial) {
      const { error } = await db.from("premium_trial_reservations")
        .update({ status: "cancelled", access_ends_at: accessEndsAt, updated_at: new Date().toISOString() })
        .eq("id", trial.id).eq("user_id", user.id).eq("lemon_subscription_id", id);
      if (error) {
        console.error("Provider cancellation confirmed but trial sync pending", error);
        return NextResponse.json({
          confirmed: true, warning: "Subscription cancelled; trial records awaiting synchronization",
          accessEndsAt, paidPeriod: !isTrialCancellation,
        }, { status: 202, headers: noStore });
      }
    }
    return NextResponse.json({
      confirmed: true, ok: true, subscription: snapshot(fields),
      accessEndsAt, paidPeriod: !isTrialCancellation, invoiceVerified: Boolean(verifiedPaidAt),
    }, { headers: noStore });
  } catch (error) {
    console.error("Subscription cancellation error", error);
    return NextResponse.json({ error: "Subscription could not be cancelled; no confirmation received" }, { status: 502, headers: noStore });
  }
}

export async function PATCH() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { user, profile, protectedAccount } = ctx;
  if (protectedAccount) return NextResponse.json({ error: "Owner/admin subscription is protected" }, { status: 403 });
  const id = profile.lemon_subscription_id;
  if (!id) return NextResponse.json({ error: "No managed subscription found" }, { status: 404 });
  try {
    const current = await getLemonSubscription(id);
    if (!current.data.attributes.cancelled)
      return NextResponse.json({ error: "Subscription is not cancelled" }, { status: 409 });
    const end = Date.parse(current.data.attributes.ends_at || "");
    if (!Number.isFinite(end) || end <= Date.now())
      return NextResponse.json({ error: "Subscription has already expired" }, { status: 409 });
    const next = await resumeLemonSubscription(id);
    if (next.data.attributes.cancelled || next.data.attributes.status !== "active")
      return NextResponse.json({ error: "Provider did not confirm resumption" }, { status: 502 });
    const fields = subscriptionFields(next);
    const db = adminDatabase();
    const { error: syncError } = await db.from("profiles")
      .update({ ...fields, plan: "premium" }).eq("id", user.id).eq("lemon_subscription_id", id);
    if (syncError) {
      console.error("Subscription resumed but profile sync pending", syncError);
      return NextResponse.json({ confirmed: true, warning: "Resumed at provider; account sync pending" }, { status: 202 });
    }
    const trial = await loadTrialRecord(user.id, id);
    if (trial) {
      const { error } = await db.from("premium_trial_reservations").update({
        status: "active", access_ends_at: null, updated_at: new Date().toISOString(),
      }).eq("id", trial.id).eq("user_id", user.id);
      if (error) console.error("Trial record after resume awaiting webhook synchronization", error);
    }
    return NextResponse.json({ ok: true, confirmed: true, subscription: snapshot(fields) }, { headers: noStore });
  } catch (error) {
    console.error("Subscription resume error", error);
    return NextResponse.json({ error: "Subscription could not be resumed" }, { status: 502 });
  }
}
