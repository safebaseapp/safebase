/**
 * Lemon Squeezy 24-hour Premium trial variant.
 * Product is currently DRAFT. Do not create live checkout until it is published,
 * the server-side eligibility checks are deployed, and test-mode cancellation is verified.
 * Product/variant IDs are public identifiers, NOT credentials.
 */
export const PREMIUM_TRIAL_PRODUCT_ID = "1435961";
export const PREMIUM_TRIAL_VARIANT_ID = "2242268";
export const PREMIUM_TRIAL_HOURS = 24;
export const PREMIUM_TRIAL_MONTHLY_PRICE_EUR = 9.99;

/** Deliberately disabled by default to protect the existing subscription flow. */
export function premiumTrialEnabled(): boolean {
  return process.env.SERNEM_PREMIUM_TRIAL_ENABLED === "true";
}
