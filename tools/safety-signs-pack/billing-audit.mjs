// Read-only behavior test for the actual billing-premium helper.
// Only a synthetic service-role client is injected; no real Supabase or Lemon calls.
import { build } from "../sim5-review/node_modules/esbuild/lib/main.js";
import { createRequire } from "node:module";
import fs from "node:fs";
import assert from "node:assert/strict";

const result = await build({
  entryPoints: ["app/lib/auth/billing-premium.ts"],
  bundle: true, platform: "node", format: "cjs", write: false,
  tsconfig: "app/tsconfig.json",
  plugins: [{
    name: "billing-fixture-client",
    setup(b) {
      b.onResolve({ filter: /^(server-only|@supabase\/supabase-js)$/ }, a => ({
        path: a.path, namespace: "qa",
      }));
      b.onLoad({ filter: /.*/, namespace: "qa" }, a => ({
        loader: "js",
        contents: a.path === "server-only"
          ? "export default {}"
          : `export function createClient(){return {from(){return {select(){return {eq(){return {async maybeSingle(){return globalThis.billingCase.queryError?{error:{message:'fixture error'}}:{data:globalThis.billingCase.trial??null,error:null}}}}}}}}}}`,
      }));
    },
  }],
});
const file = "/tmp/signs-billing-audit.cjs";
fs.writeFileSync(file, result.outputFiles[0].text);
const { hasCurrentBillingPremium } = createRequire(import.meta.url)(file);
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://synthetic.invalid";
process.env.SUPABASE_SERVICE_ROLE_KEY = "synthetic-no-network";

const future = "2099-12-31T00:00:00Z";
const expired = "2000-01-01T00:00:00Z";
const cases = [
  ["free no reservation", "free", null, false],
  ["legacy premium no reservation", "premium", null, true],
  ["current trial", "free", { status: "on_trial", trial_ends_at: future, lemon_subscription_id: "fixture" }, true],
  ["expired stale premium", "premium", { status: "on_trial", trial_ends_at: expired, lemon_subscription_id: "fixture" }, false],
  ["cancelled past grace", "premium", { status: "cancelled", access_ends_at: expired, lemon_subscription_id: "fixture" }, false],
  ["cancelled current grace", "free", { status: "cancelled", access_ends_at: future, lemon_subscription_id: "fixture" }, true],
  ["reserved", "premium", { status: "reserved", trial_ends_at: future, lemon_subscription_id: "fixture" }, false],
  ["trial no subscription", "premium", { status: "on_trial", trial_ends_at: future, lemon_subscription_id: null }, false],
  ["active confirmed record", "premium", { status: "active", lemon_subscription_id: "fixture" }, true],
  ["active without plan", "free", { status: "active", lemon_subscription_id: "fixture" }, false],
];
const results = [];
for (const [name, plan, trial, expected] of cases) {
  globalThis.billingCase = { trial };
  const actual = await hasCurrentBillingPremium(null, "synthetic-user", plan);
  assert.equal(actual, expected, name);
  results.push({ name, expected, actual, result: "PASS" });
}
globalThis.billingCase = { queryError: true };
assert.equal(await hasCurrentBillingPremium(null, "synthetic-user", "premium"), false);
results.push({ name: "billing db read error", expected: false, actual: false, result: "PASS" });
console.log(results.map(x => x.name + ": " + x.result).join("\n"));
console.log("LIMIT: fixture-only; live provider and legacy subscriptions without reservation not independently validated.");
