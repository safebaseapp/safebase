// Exercise the actual Safety Signs entitlement route with synthetic dependencies.
// No network, database or payment writes. Billing helper behavior is tested separately.
import { build } from "../sim5-review/node_modules/esbuild/lib/main.js";
import fs from "node:fs";
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const bundle = await build({
  entryPoints: ["app/app/api/safety-signs/download-access/route.ts"],
  bundle: true, platform: "node", format: "cjs", write: false,
  tsconfig: "app/tsconfig.json",
  plugins: [{
    name: "read-only-entitlement-fixtures",
    setup(b) {
      b.onResolve({
        filter: /^@\/lib\/auth\/|^@\/utils\/supabase\/server$|^next\/server$/,
      }, a => ({ path: a.path, namespace: "qa" }));
      b.onLoad({ filter: /.*/, namespace: "qa" }, a => {
        let contents;
        if (a.path === "next/server") {
          contents = "export const NextResponse={json:(body,options={})=>({body,status:options.status||200,headers:options.headers})}";
        } else if (a.path.endsWith("server-access")) {
          contents = "export async function getCurrentAccessProfile(){if(globalThis.signCase.throwAccess)throw Error('fixture access error');return globalThis.signCase}";
        } else if (a.path.endsWith("reward-access")) {
          contents = "export async function hasActiveReward(){return globalThis.signCase.reward===true}";
        } else if (a.path.endsWith("billing-premium")) {
          contents = "export async function hasCurrentBillingPremium(){return globalThis.signCase.billing===true}";
        } else if (a.path.endsWith("/access")) {
          contents = "export function isAdminUser(){return globalThis.signCase.admin===true}";
        } else {
          contents = "export async function createClient(){return {synthetic:true}}";
        }
        return { loader: "js", contents };
      });
    },
  }],
});

const output = "/tmp/signs-access.cjs";
fs.writeFileSync(output, bundle.outputFiles[0].text);
const { GET } = createRequire(import.meta.url)(output);

const active = (plan = "free", role = "user") => ({ status: "active", plan, role });
const user = { id: "fixture-user" };
const fixtures = [
  { name: "anonymous", user: null, profile: null, expectedPremium: false, expectedStatus: 401 },
  { name: "free", user, profile: active(), expectedPremium: false },
  { name: "legacy-paid-current", user, profile: active("premium"), billing: true, expectedPremium: true },
  { name: "expired-stale-plan", user, profile: active("premium"), billing: false, expectedPremium: false },
  { name: "cancelled-after-access-end", user, profile: active("premium"), billing: false, expectedPremium: false },
  { name: "trial-current", user, profile: active("free"), billing: true, expectedPremium: true },
  { name: "suspended", user, profile: { status: "suspended", plan: "premium", role: "user" }, billing: true, expectedPremium: false },
  { name: "active-reward", user, profile: active(), reward: true, expectedPremium: true },
  { name: "admin", user, profile: active(), admin: true, expectedPremium: true },
  { name: "admin-profile", user, profile: active("free", "admin"), expectedPremium: true },
  { name: "missing-profile", user, profile: null, expectedPremium: false },
  { name: "unavailable-billing", user, profile: active("premium"), billing: false, expectedPremium: false },
  { name: "access-error", user, profile: active("premium"), throwAccess: true, expectedPremium: false, expectedStatus: 503 },
];

const results = [];
for (const c of fixtures) {
  globalThis.signCase = c;
  const r = await GET();
  const expectedStatus = c.expectedStatus ?? 200;
  assert.equal(r.status, expectedStatus, c.name + " HTTP");
  assert.equal(r.headers["Cache-Control"], "private, no-store", c.name + " cache");
  assert.equal(r.body.isPremium, c.expectedPremium, c.name + " Premium");
  if (c.name === "anonymous") assert.equal(r.body.authenticated, false);
  results.push({
    name: c.name,
    expectedPremium: c.expectedPremium,
    actualPremium: r.body.isPremium,
    status: r.status,
    result: "PASS",
    note: "API route tested against synthetic billing/reward/profile decisions, not live entitlements.",
  });
}
const report = {
  results,
  realSupabase: "NOT TESTED",
  actualBillingHelper: "NOT TESTED HERE: billing mock only",
  changesToEligibility: "Route uses existing hasCurrentBillingPremium instead of profile.plan alone",
};
fs.writeFileSync("docs/safety-signs-pack/evidence/access-audit.json", JSON.stringify(report, null, 2) + "\n");
console.log(results.map(x => x.name + ": " + x.result).join("\n"));
