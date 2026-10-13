import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Restricts Lemon trial-origin Premium access to the verified provider deadline.
 * Existing paid memberships (not trial-origin), admin and independent prizes are
 * unaffected. A database failure fails closed for trial-linked accounts.
 */
export async function hasCurrentBillingPremium(
  supabase: SupabaseClient,
  userId: string,
  plan: string | null | undefined,
): Promise<boolean> {
  const { data: trial, error } = await supabase
    .from("premium_trial_reservations")
    .select("status,trial_ends_at,access_ends_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    console.error("Trial entitlement verification failed", error);
    return false;
  }
  if (!trial) return plan === "premium";
  const deadline = trial.status === "on_trial" ? trial.trial_ends_at
    : trial.status === "cancelled" ? (trial.access_ends_at || trial.trial_ends_at) : null;
  if (deadline) {
    const millis = Date.parse(deadline);
    if (Number.isFinite(millis) && millis > Date.now()) return true;
  }
  return trial.status === "active" && plan === "premium";
}
