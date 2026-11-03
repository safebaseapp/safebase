import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const source = read("lib/auth/subscription-entitlement.ts");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
const moduleObj = { exports: {} };
new Function("module", "exports", compiled.outputText)(moduleObj, moduleObj.exports);
const { hasBillingEntitlement } = moduleObj.exports;
assert.equal(typeof hasBillingEntitlement, "function");

const now = Date.parse("2026-11-03T12:00:00.000Z");
const past = "2026-11-02T12:00:00.000Z";
const paidEnd = "2026-11-15T12:00:00.000Z";
const future = "2026-11-24T12:00:00.000Z";
const tomorrow = "2026-11-04T12:00:00.000Z";
const trialStart = "2026-11-03T01:00:00.000Z";
const trialEnd = "2026-11-04T01:00:00.000Z";
const baseTrial = { status: "on_trial", trial_ends_at: trialEnd, access_ends_at: null, lemon_subscription_id: "trial-abc" };
const cases = [
  ["free no subscription", { plan: "free" }, false],
  ["manual premium without sub", { plan: "premium" }, true],
  ["paid legacy status", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "paid" }, true],
  ["active paid", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "active" }, true],
  ["active paid with renewed future period", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "active", subscription_paid_through_at: future }, true],
  ["active stale flag after paid period", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "active", subscription_paid_through_at: past }, false],
  ["paid canceled, valid grace", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: paidEnd, subscription_paid_through_at: paidEnd }, true],
  ["paid canceled, expired", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: past, subscription_paid_through_at: paidEnd }, false],
  ["paid explicit cutoff earlier", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: future, subscription_paid_through_at: past }, false],
  ["paid at exact end", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: paidEnd, subscription_paid_through_at: paidEnd }, false, Date.parse(paidEnd)],
  ["cancelled paid legacy no evidence before end", { plan: "premium", lemon_subscription_id: "legacy", subscription_status: "cancelled", subscription_ends_at: paidEnd }, true],
  ["cancelled paid legacy no evidence after end", { plan: "premium", lemon_subscription_id: "legacy", subscription_status: "cancelled", subscription_ends_at: past }, false],
  ["cancelled no end", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "cancelled" }, false],
  ["expired status remains premium stale", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "expired", subscription_ends_at: future }, false],
  ["unpaid status", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "unpaid" }, false],
  ["paused status", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "paused" }, false],
  ["past due (fail closed)", { plan: "premium", lemon_subscription_id: "s1", subscription_status: "past_due" }, false],
  ["trial without reservation", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "on_trial" }, false],
  ["trial valid", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "on_trial", trial: baseTrial }, true],
  ["trial valid even plan pending free", { plan: "free", lemon_subscription_id: "trial-abc", subscription_status: "on_trial", trial: baseTrial }, true],
  ["trial at exact expiration", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "on_trial", trial: baseTrial }, false, Date.parse(trialEnd)],
  ["trial mismatch id", { plan: "premium", lemon_subscription_id: "different-id", subscription_status: "on_trial", trial: baseTrial }, false],
  ["trial reservation checkout_created not access", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "on_trial", trial: { ...baseTrial, status: "checkout_created" } }, false],
  ["cancelled trial still within 24h", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: future, trial: { ...baseTrial, status: "cancelled", access_ends_at: future } }, true],
  ["cancelled trial not granted paid month", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: future, trial: { ...baseTrial, status: "cancelled", access_ends_at: future } }, false, Date.parse(trialEnd) + 1000],
  ["cancelled trial within provider shorter end", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: past, trial: { ...baseTrial, status: "cancelled", access_ends_at: future } }, false],
  ["trial converted to paid, cancelled within paid period", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: paidEnd, subscription_paid_through_at: paidEnd, trial: { ...baseTrial, status: "cancelled", access_ends_at: paidEnd } }, true],
  ["trial converted to paid, can complete month beyond trial date", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: paidEnd, subscription_paid_through_at: paidEnd, trial: { ...baseTrial, status: "cancelled", access_ends_at: paidEnd } }, true, Date.parse(tomorrow)],
  ["trial converted to paid, ends at paid cutoff", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "cancelled", subscription_cancelled: true, subscription_ends_at: paidEnd, subscription_paid_through_at: paidEnd, trial: { ...baseTrial, status: "cancelled" } }, false, Date.parse(paidEnd)],
  ["trial paid active", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "active", trial: { ...baseTrial, status: "active" } }, true],
  ["trial converted active with stale on_trial record", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "active", trial: { ...baseTrial, status: "on_trial" } }, false],
  ["expired trial reservation", { plan: "premium", lemon_subscription_id: "trial-abc", subscription_status: "expired", trial: { ...baseTrial, status: "expired" } }, false],
];
for (const [name, value, expected, at = now] of cases) {
  assert.equal(hasBillingEntitlement(value, at), expected, name);
}
const account = read("app/api/account/subscription/route.ts");
const auth = read("lib/auth/billing-premium.ts");
const webhook = read("app/api/webhooks/lemonsqueezy/route.ts");
const emailApi = read("app/api/account/marketing-preferences/route.ts");
const UI = read("app/[locale]/account/BillingPreferencesPanel.tsx");
const accountPage = read("app/[locale]/account/page.tsx");
const migration = read("supabase/migrations/20261103_account_subscription_paid_period_and_marketing_preference.sql");
for (const needle of ["cancelLemonSubscription(id)", "getLemonSubscription(id)", "adminDatabase()", "confirmed: true", "subscription_paid_through_at", "premium_trial_reservations", "loadTrialRecord", "isTrialCancellation"])
  assert.ok(account.includes(needle), "Billing route missing " + needle);
for (const needle of ["hasBillingEntitlement", "subscription_paid_through_at", "premium_trial_reservations"])
  assert.ok(auth.includes(needle), "Billing authorization missing " + needle);
assert.ok(webhook.includes("subscription_paid_through_at") && webhook.includes("getRecentPaidSubscriptionInvoice"), "Webhook paid-period evidence missing");
for (const needle of ['marketing_email_opt_in', '.eq("user_id", user.id)', "onConflict: \"user_id\"", 'typeof body.marketingEmailOptIn !== "boolean"'])
  assert.ok(emailApi.includes(needle), "Marketing API missing " + needle);
assert.ok(UI.includes("Aboneliği İptal Et") && UI.includes("Pazarlama E-postalarından Çık") && UI.includes('method: "DELETE"') && UI.includes('method: "PUT"'));
assert.ok(accountPage.includes("<BillingPreferencesPanel") && accountPage.includes("verifiedPremiumAccess"));
for (const needle of ["enable row level security", "auth.uid()", "marketing_email_opt_in boolean not null default false", "grant select, insert, update on table public.user_communication_preferences to authenticated"])
  assert.ok(migration.includes(needle), "Marketing table RLS missing " + needle);
// The legacy account lifecycle summary must not bypass the newer confirmed
// cancellation flow. Account deletion and protected admin status must remain.
const oldPanel = read("app/[locale]/account/AccountLifecyclePanel.tsx");
assert.ok(oldPanel.includes('href="#subscription-preferences"'), "Old summary must link to canonical subscription manager");
assert.ok(!oldPanel.includes('act("cancel")') && !oldPanel.includes('async function act('), "Unconfirmed duplicate cancel flow must not remain");
assert.ok(oldPanel.includes("Korumalı Owner Hesabı"), "Owner protection must remain");
assert.ok(oldPanel.includes("async function deleteAccount()"), "Account deletion flow must remain");
assert.ok(UI.includes('id="subscription-preferences"'), "Canonical subscription manager missing anchored destination");
assert.ok(UI.includes("window.confirm("), "Cancellation/restart must require user confirmation");
assert.ok(UI.includes("resumeRenewal"), "Existing reactivation capability must not be lost");
console.log("PASS: only one confirmed billing action UI; protected admin and deletion preserved.");
console.log("PASS: " + cases.length + " billing/expiry/trial/legacy entitlement scenarios and authenticated marketing/account wiring.");
console.log("NO-LIVE-WRITES: This test changes no actual subscriptions, users, charges or email preferences.");
