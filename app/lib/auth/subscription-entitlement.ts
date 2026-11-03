// Pure, testable billing access rule. DO NOT import service-role credentials in browser code.
export type TrialEntitlement = {
  status: string;
  trial_ends_at: string | null;
  access_ends_at: string | null;
  lemon_subscription_id: string | null;
};
export type SubscriptionEntitlement = {
  plan: string | null | undefined;
  lemon_subscription_id?: string | null;
  subscription_status?: string | null;
  subscription_cancelled?: boolean | null;
  subscription_ends_at?: string | null;
  subscription_paid_through_at?: string | null;
  trial?: TrialEntitlement | null;
};
const deadline = (value: string | null | undefined) => {
  const result = Date.parse(value || "");
  return Number.isFinite(result) ? result : null;
};
function activeUntil(now: number, ...values: (string | null | undefined)[]) {
  const dates = values.map(deadline).filter((x): x is number => x !== null);
  return dates.length > 0 && Math.min(...dates) > now;
}
/**
 * Cancellation stops future renewal; a confirmed paid period remains valid
 * only until the earliest recorded ending boundary. A cancelled trial is
 * capped by its original trial deadline unless verified paid evidence exists.
 */
export function hasBillingEntitlement(value: SubscriptionEntitlement, now = Date.now()): boolean {
  const status = (value.subscription_status || "").toLowerCase();
  const cancelled = Boolean(value.subscription_cancelled || status === "cancelled");
  const paidPeriod = deadline(value.subscription_paid_through_at);
  const paidPeriodActive = paidPeriod !== null && paidPeriod > now;
  // When a paid billing period is explicitly recorded, do not trust a stale
  // active/paid flag beyond that period if renewal webhooks are delayed.
  if (paidPeriod !== null && !paidPeriodActive) return false;
  const subscriptionId = value.lemon_subscription_id;
  const trial = value.trial;

  if (trial) {
    // An unattached reservation never grants rights; it may be from a failed checkout.
    if (!subscriptionId || trial.lemon_subscription_id !== subscriptionId) return false;
    if (["reserved", "checkout_created", "checkout_failed", "expired"].includes(trial.status)) return false;
    if (["expired", "unpaid", "paused", "past_due"].includes(status)) return false;
    if (cancelled || trial.status === "cancelled") {
      if (paidPeriodActive) {
        return activeUntil(now, value.subscription_ends_at, value.subscription_paid_through_at);
      }
      // Never treat the end of a *paid* month as a trial extension.
      return activeUntil(now, trial.trial_ends_at, trial.access_ends_at || trial.trial_ends_at,
        value.subscription_ends_at || trial.trial_ends_at);
    }
    if (trial.status === "on_trial") {
      return activeUntil(now, trial.trial_ends_at) && ["", "on_trial"].includes(status);
    }
    if (trial.status === "active") {
      return value.plan === "premium" && ["", "active", "paid"].includes(status);
    }
    return false;
  }

  if (!subscriptionId) {
    // Preserve previously granted manual/reward Premium access. Reward validity
    // is controlled by its separate reward entitlement checker.
    return value.plan === "premium";
  }
  if (["expired", "unpaid", "paused", "past_due"].includes(status)) return false;
  if (cancelled) {
    if (paidPeriod !== null) {
      return activeUntil(now, value.subscription_ends_at, value.subscription_paid_through_at);
    }
    // Backwards compatibility for paid accounts cancelled before this migration.
    return value.plan === "premium" && activeUntil(now, value.subscription_ends_at);
  }
  if (status === "on_trial") return false; // No verified trial record.
  return value.plan === "premium" && ["", "active", "paid"].includes(status);
}
