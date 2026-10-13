export type TrialBillingState = {
  status: string;
  endsAt?: string | null;
  trialEndsAt?: string | null;
};

export function hasPremiumAccess(value: TrialBillingState, at = Date.now()): boolean {
  if (value.status === "active") return true;
  if (value.status === "on_trial") {
    const limit = Date.parse(value.trialEndsAt || "");
    return Number.isFinite(limit) && at < limit;
  }
  if (value.status === "cancelled") {
    const limit = Date.parse(value.endsAt || "");
    return Number.isFinite(limit) && at < limit;
  }
  return false;
}

/**
 * Trial grants are time bounded regardless of delayed webhooks.
 * A paid active subscription is checked independently; this function must
 * never downgrade a separate valid subscription or a prize entitlement.
 */
export function trialAccessUntil(status: string, trialEndsAt: string | null, accessEndsAt: string | null, now = Date.now()): boolean {
  if (status !== "on_trial" && status !== "cancelled") return false;
  const deadline = Date.parse((status === "cancelled" ? accessEndsAt : trialEndsAt) || "");
  return Number.isFinite(deadline) && deadline > now;
}
