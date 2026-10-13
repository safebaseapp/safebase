/** Lemon Squeezy product identifiers are public, but never mix test and live IDs. */
const TEST_PRODUCT_ID = "1436559";
const TEST_VARIANT_ID = "2243177";
const LIVE_PRODUCT_ID = "1435961";
const LIVE_VARIANT_ID = "2242268";

const testMode = process.env.VERCEL_ENV !== "production";
export const PREMIUM_TRIAL_PRODUCT_ID = testMode ? TEST_PRODUCT_ID : LIVE_PRODUCT_ID;
export const PREMIUM_TRIAL_VARIANT_ID = testMode ? TEST_VARIANT_ID : LIVE_VARIANT_ID;
export const PREMIUM_TRIAL_HOURS = 24;
export const PREMIUM_TRIAL_MONTHLY_PRICE_EUR = 9.99;

/** Always disabled unless explicitly enabled. Never enable in production before end-to-end QA. */
export function premiumTrialEnabled(): boolean {
  return process.env.SERNEM_PREMIUM_TRIAL_ENABLED === "true";
}
