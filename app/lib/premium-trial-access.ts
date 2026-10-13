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
