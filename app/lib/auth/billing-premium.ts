import "server-only";
import { createClient } from "@supabase/supabase-js";
import { hasBillingEntitlement } from "./subscription-entitlement";

/** Resolve current billing rights from server-verified profile and trial records.
 * A cancelled paid subscription remains valid ONLY until its paid-through date.
 * A cancelled free trial remains capped at the free trial's verified deadline.
 * Never trust client-supplied plans or JWT user_metadata for entitlement.
 */
export async function hasCurrentBillingPremium(
  _supabase: unknown,
  userId: string,
  _plan: string | null | undefined,
): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const [profileResult, trialResult] = await Promise.all([
    db.from("profiles")
      .select("plan,lemon_subscription_id,subscription_status,subscription_cancelled,subscription_ends_at,subscription_paid_through_at")
      .eq("id", userId).maybeSingle(),
    db.from("premium_trial_reservations")
      .select("status,trial_ends_at,access_ends_at,lemon_subscription_id")
      .eq("user_id", userId).maybeSingle(),
  ]);
  if (profileResult.error || trialResult.error || !profileResult.data) {
    console.error("Billing entitlement query failed", profileResult.error || trialResult.error);
    return false;
  }
  return hasBillingEntitlement({ ...profileResult.data, trial: trialResult.data });
}
