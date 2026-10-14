import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Checks Lemon trial entitlements using the service role because trial
 * reservations are intentionally inaccessible to browser/authenticated roles.
 * Existing subscriptions without a trial reservation remain unchanged.
 */
export async function hasCurrentBillingPremium(
  _supabase: unknown,
  userId: string,
  plan: string | null | undefined,
): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: trial, error } = await db.from("premium_trial_reservations")
    .select("status,trial_ends_at,access_ends_at,lemon_subscription_id")
    .eq("user_id", userId).maybeSingle();
  if (error) {
    console.error("Trial entitlement verification failed", error);
    return false;
  }
  if (!trial) return plan === "premium";

  // Reservation alone does not grant Premium.
  if (trial.status === "reserved" || trial.status === "checkout_created" || trial.status === "checkout_failed")
    return false;

  // Purchased and converted subscriptions must be handled separately after
  // the provider confirms an active paid status.
  if (trial.status === "active") return plan === "premium" && Boolean(trial.lemon_subscription_id);

  if (trial.status !== "on_trial" && trial.status !== "cancelled") return false;
  const deadline = trial.status === "on_trial"
    ? trial.trial_ends_at
    : trial.access_ends_at || trial.trial_ends_at;
  const expires = Date.parse(deadline || "");
  return Boolean(trial.lemon_subscription_id) && Number.isFinite(expires) && Date.now() < expires;
}
