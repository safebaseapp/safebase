import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  cancelLemonSubscription,
  getLemonSubscription,
  resumeLemonSubscription,
  subscriptionFields,
} from "@/lib/lemonsqueezy";

const OWNER_EMAIL = "safebase.global@gmail.com";

async function accountContext() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan,role,status,lemon_subscription_id,lemon_customer_id,subscription_status,subscription_cancelled,subscription_renews_at,subscription_ends_at")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) return { error: NextResponse.json({ error: "Unable to load account" }, { status: 500 }) };
  const protectedAccount = profile?.role === "admin" || user.email?.toLowerCase() === OWNER_EMAIL;
  return { supabase, user, profile, protectedAccount };
}

export async function GET() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { profile, protectedAccount } = ctx;

  return NextResponse.json({
    plan: protectedAccount ? "premium" : profile?.plan || "free",
    protectedAccount,
    billingManaged: Boolean(profile?.lemon_subscription_id),
    subscription: profile?.lemon_subscription_id ? {
      id: profile.lemon_subscription_id,
      status: profile.subscription_status,
      cancelled: Boolean(profile.subscription_cancelled),
      renewsAt: profile.subscription_renews_at,
      endsAt: profile.subscription_ends_at,
    } : null,
  });
}

export async function POST() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { profile, protectedAccount } = ctx;
  if (protectedAccount) return NextResponse.json({ error: "Owner/admin billing is protected" }, { status: 403 });
  if (!profile?.lemon_subscription_id) return NextResponse.json({ error: "No managed subscription found" }, { status: 404 });

  try {
    const subscription = await getLemonSubscription(profile.lemon_subscription_id);
    const url = subscription.data.attributes.urls?.customer_portal;
    if (!url) return NextResponse.json({ error: "Customer portal is unavailable" }, { status: 502 });
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Lemon customer portal error", error);
    return NextResponse.json({ error: "Unable to open billing portal" }, { status: 502 });
  }
}

export async function DELETE() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { supabase, user, profile, protectedAccount } = ctx;
  if (protectedAccount) return NextResponse.json({ error: "Owner/admin subscription cannot be cancelled" }, { status: 403 });
  if (!profile?.lemon_subscription_id) return NextResponse.json({ error: "No managed subscription found" }, { status: 404 });

  try {
    const subscription = await cancelLemonSubscription(profile.lemon_subscription_id);
    const fields = subscriptionFields(subscription);
    const { error } = await supabase.from("profiles").update(fields).eq("id", user.id);
    if (error) throw error;
    return NextResponse.json({ ok: true, subscription: { status: fields.subscription_status, cancelled: fields.subscription_cancelled, renewsAt: fields.subscription_renews_at, endsAt: fields.subscription_ends_at } });
  } catch (error) {
    console.error("Subscription cancellation error", error);
    return NextResponse.json({ error: "Subscription could not be cancelled" }, { status: 502 });
  }
}

export async function PATCH() {
  const ctx = await accountContext();
  if ("error" in ctx) return ctx.error;
  const { supabase, user, profile, protectedAccount } = ctx;
  if (protectedAccount) return NextResponse.json({ error: "Owner/admin subscription is protected" }, { status: 403 });
  if (!profile?.lemon_subscription_id) return NextResponse.json({ error: "No managed subscription found" }, { status: 404 });
  if (!profile.subscription_cancelled && profile.subscription_status !== "cancelled") return NextResponse.json({ error: "Subscription is not cancelled" }, { status: 409 });

  try {
    const subscription = await resumeLemonSubscription(profile.lemon_subscription_id);
    const fields = subscriptionFields(subscription);
    const { error } = await supabase.from("profiles").update({ ...fields, plan: "premium" }).eq("id", user.id);
    if (error) throw error;
    return NextResponse.json({ ok: true, subscription: { status: fields.subscription_status, cancelled: fields.subscription_cancelled, renewsAt: fields.subscription_renews_at, endsAt: fields.subscription_ends_at } });
  } catch (error) {
    console.error("Subscription resume error", error);
    return NextResponse.json({ error: "Subscription could not be resumed" }, { status: 502 });
  }
}
