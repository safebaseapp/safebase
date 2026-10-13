import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { getLemonSubscription, cancelLemonSubscription } from "../../../../lib/lemonsqueezy";
import { PREMIUM_TRIAL_VARIANT_ID, premiumTrialEnabled } from "../../../../lib/premium-trial-config";

export async function POST() {
  if (!premiumTrialEnabled()) return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return NextResponse.json({ error: "Login required" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  const db = createAdminClient(url, key);
  const { data: profile, error } = await db.from("profiles")
    .select("lemon_subscription_id").eq("id", user.id).maybeSingle();
  if (error || !profile?.lemon_subscription_id) {
    return NextResponse.json({ error: "Subscription unavailable" }, { status: 409 });
  }
  const { data: reservation, error: reservationError } = await db.from("premium_trial_reservations")
    .select("id,status").eq("user_id", user.id).maybeSingle();
  if (reservationError || !reservation || reservation.status !== "on_trial") {
    return NextResponse.json({ error: "No verified trial to cancel" }, { status: 409 });
  }
  const id = String(profile.lemon_subscription_id);
  try {
    const current = await getLemonSubscription(id);
    if (String(current.data.attributes.variant_id ?? "") !== PREMIUM_TRIAL_VARIANT_ID ||
        current.data.attributes.status !== "on_trial") {
      return NextResponse.json({ error: "Not an active free trial" }, { status: 409 });
    }
    if (!current.data.attributes.cancelled) await cancelLemonSubscription(id);
    const confirmation = await getLemonSubscription(id);
    if (!confirmation.data.attributes.cancelled) {
      return NextResponse.json({ error: "Cancellation not confirmed" }, { status: 502 });
    }
    const { error: syncError } = await db.from("premium_trial_reservations").update({
      status: "cancelled",
      access_ends_at: confirmation.data.attributes.ends_at ?? null,
      updated_at: new Date().toISOString()
    }).eq("id", reservation.id).eq("user_id", user.id);
    if (syncError) {
      return NextResponse.json({
        confirmed: true,
        warning: "Provider cancellation confirmed; local synchronization pending",
        accessEndsAt: confirmation.data.attributes.ends_at ?? null
      }, { status: 202 });
    }
    return NextResponse.json({
      confirmed: true,
      accessEndsAt: confirmation.data.attributes.ends_at ?? null
    });
  } catch {
    return NextResponse.json({ error: "Cancellation could not be confirmed. Check your billing portal." }, { status: 502 });
  }
}
