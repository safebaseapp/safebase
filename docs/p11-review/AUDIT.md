# SERNEM Paket 11 — Issue #114

**Son takip kapanışı:** [FOLLOWUP.md](FOLLOWUP.md) — önceki testler yeniden çalıştırılmadı; yalnız ücretli binding/geçmiş trial etkileşimi için 8 yeni hedefli kontrol. Son karar NO-GO.

Review date: 21 October 2026 (Europe/Budapest). **A + B delivered together; production approval remains blocked.**

Final safety re-review: **[Türkçe GO / NO-GO değerlendirmesi](RELEASE-REVIEW.md)**. Current affected-file ESLint is PASS (0 errors, 14 warnings); the four baseline errors below were subsequently fixed. Real variant/sandbox/Preview-access blockers remain. Historical initial-run evidence is retained; latest rerun evidence is in [results/release](results/release).

## Scope and preservation

Base: `e25c7c11eb6902f4ecefe096fee4a8e1b959bc11`, verified remote main. Merged PRs #109 (SIM showcase), #110 (Budapest daily XP), #113 (homepage community) are ancestors. Work uses `codex/sernem-conversion-mobile-pdf-qa-p11`; the stale Pack 9 branch was not reused/reset. First implementation checkpoint: `283edb2`.

Issue #114 was read in full. The initial read-only hypotheses are in [INITIAL.md](INITIAL.md). No production/main changes, migrations, live Supabase requests, customer account changes, payment/email transactions, provider configuration changes, new dependencies, SIM assets, gameplay, scoring or XP changes. Build scripts/package scripts remain unchanged. Prebuild regenerated 280 PDFs as designed; those incidental generated changes were restored and excluded from the PR. Evidence PDFs below contain synthetic inputs only.

## Confirmed findings: reproduction → fix → retest

| ID / severity | Before / reproduction | Minimal correction | After / evidence |
|---|---|---|---|
| A1 P1 expired entitlement | Premium-labelled profile with expired trial or expired/cancelled billing still passed gates; upgrade redirected away. Baseline entitlement 1 failure and billing 2 failures. | Verify current billing/trial deadline on server, preserve admin/rewards/manual subscriptions, fail closed on verification errors; use same decision for premium Word/poster/sign exports and upgrade. | Entitlement 4, billing 7 fixtures pass; native role matrix passes. No stored account downgrade required. |
| A2 P1 unsafe webhook grant | Signed unpaid/unsupported order could grant active pending access; foreign/stale subscription could replace current binding; unrelated variant accepted. Baseline 5 failures. | Ignore orders/unsupported events, reconcile subscription with provider, validate identity/trial/variant, conditional binding update, inactive unpaid pending state. No provider data/identity logging. | 7 handler fixtures pass: invalid signature, pending unpaid, unsupported order, foreign binding, stale reconciled state, variant rejection, repeated active state. Provider is mocked. See release blocker below. |
| A3 P1 auth return/loading | Signup had no PKCE exchange callback; API-download `next` lost; rejected SDK promise left four forms loading. Baseline browser 10 failures. | Local return-path allowlist, SSR callback exchange, locale/next preservation, try/catch/finally and duplicate-submit guard; localized feedback. | 10 component checks, callback suite and 14 actual TR/EN SDK lifecycle steps pass against local protocol fixture. Real mail delivery not tested. |
| A4 P1 Free resource false lock | Standard PDF/print inherited adjacent Premium text; Word endpoint not identified. Initial access-loading click bounced signed Free account to login. | Inspect clicked action/explicit marker/endpoint; verify server access; wait and replay pending access click once. | 4 classification fixtures and delayed-auth real-browser regression pass (both fail on baseline). Standard Free PDF/PNG/print remains available. |
| A5 P1 expired branding | Previously uploaded logo displayed for expired trial on `posters/working-at-height-rules?brand=1`. Baseline expired FAIL, paid PASS. | Own-account server branding endpoint requires active verified Premium/admin/reward, private no-store, short signed URL; poster/risk clients consume verified access. | Expired denied and paid logo preserved in browser; server matrix covers guest, Free, expired, trial, paid, admin, suspended and ignored foreign query ID. Live storage RLS is not verified. |
| A6 P1 duplicate checkout intent | Checkout gesture had no in-flight guard and existing DB `checkout_start` had no GA4 counterpart. | One in-flight gesture, mirror existing event with locale/product/provider only, retry feedback. | Browser test: one opening, one GA4 event, one DB event; offline feedback. Actual payment is not opened. |
| B1 P1 narrow-screen controls | Downloads TR/EN at 320/360 and Method Statement EN at 320 overflowed (5 genuine failures). | Single-column narrow grid, shrink/wrap content, constrain PDF CTA width. | Final 240/240 rows pass; before/after evidence below. Initial two admin-menu failures were a missing synthetic owner configuration/CSP fixture problem, not product defects. |
| B2 P1 missing PDF header | Actual printed Method Statement lost title/document-control because global print rules hide `header`. | Scoped print display for this document header only. | Before PDFs fail title/control check; after both languages pass, retaining `SRN-MS-001`. No approved document text changed. |

No confirmed P0. Do not interpret fixture passes as live-provider verification.

## Test matrices and actual results

Full per-row role/route/language/expected/actual results: [server access (70)](results/access-matrix.json), [mobile (240)](results/mobile-matrix.json), [PDF checks (134)](results/pdf-results.json), [guest → Free → Premium decision journey (20)](results/journey.json), [SDK lifecycle (14)](results/auth-lifecycle.json). Mobile rows record HTTP status, overflow and browser exceptions; their expected condition is status <400, no overflow and no uncaught exception. Redirect access rows explicitly compare expected to actual. These are representative regressions, not exhaustive UI certification.

| Command / coverage | Baseline | Final |
|---|---|---|
| `cd app && npm run qa:toolbox-pdfs` | PASS | PASS, 140 standard + 140 branded-base localized files / 70 topics |
| `npm run qa:download-flows` | PASS | PASS; source-token checks, not authorization proof |
| `npx tsc --noEmit` | PASS | PASS |
| ESLint all affected TS/TSX | Existing Quick Risk errors independently reproduced on base | **PASS: 0 errors, 14 warnings** in final safety review; initial 4 errors fixed without disables/config changes |
| `npm run build` | Not used as baseline runtime | PASS, normal unmodified prebuild and production compile/prerender |
| Entitlement / billing / webhook | 1 / 2 / 5 failing cases | 4 / 7 / 16 cases PASS after final safety review |
| Auth components / callback / trial | 10 component failures; callback absent | PASS; 21 mocked trial boundary/DST/one-use/parallel-checkout assertions |
| Resource classification / early click | 3 failures / 1 failure | 4 PASS / delayed-auth browser PASS |
| Native server role matrix | Hypotheses initially | 70/70 PASS, TR/EN, guest/Free/trial/expired/paid/admin/suspended |
| Responsive / admin menu + server | 233/240 (5 product + 2 fixture failures) | 240/240 PASS, 320/360/390/768/1024/1440 |
| Actual PDF/PNG / header | Header absent in 2 real PDFs | 134/134 checks and 2 header assertions PASS |
| Branding / checkout duplicate | Expired logo reproduced | Both entitlement cases PASS; checkout browser PASS |
| Native SDK lifecycle / decision journey | Auth return flaws reproduced independently | 14/14 and 20/20 PASS |
| Existing SIM access/demo/mission | Latest approved implementation retained | Access fixtures PASS, demo two findings/zero XP PASS, mission state 27 PASS |
| Latest daily XP PostgreSQL regression | PR #110 already on base | 14 PASS in isolated network-disabled local PostgreSQL; first award 200, existing prior total preserved, daily +50, concurrent retry/DST/RLS checks |

Logs are in [results](results). An initial concurrent final journey run hit local `ECONNRESET`; the suite was rerun after heavy PDF/browser work and completed 20/20. No product change was made to hide this infrastructure failure. Browser fixture setup initially needed corrected selectors and an isolated transport CSP exception; those harness errors are not product fixes.

### Browser and PDF coverage

TR/EN routes across six widths: home, login, register, forgot/reset, upgrade, premium-trial, Toolbox, Risk Assessment, Quick Risk, Method Statement, Posters, Safety Signs, Downloads, dashboard, admin, Labs, SIM demo/full entry. Mobile owner menu is checked separately from server authorization for Free/admin/suspended. Native lifecycle exercises signup → local PKCE callback → preserved destination, recovery/reset, invalid password feedback, valid login, logout/401 and invalid recovery link. Component fixtures also cover transport failures. Guest checkout retains login destination; Free checkout intent is intercepted; Free full SIM is denied and paid entry allowed without mission/XP writes.

Actual Free UI print actions produce risk, method, inspection/report and poster PDFs in both languages; native Toolbox PDF endpoints produce standard and four-page branded PDFs. Files are parsed with pdf-lib/pdftotext, nonempty, correct PDF response types for endpoints, expected document text and Turkish glyphs checked. Safety Signs generates real one-page A4 and A3 PDFs with measured physical page sizes and a nonempty PNG. Representative output pages were visually reviewed; Method Statement's first page is dense but legible, Inspection intentionally reports incomplete synthetic input. This is not a claim that every checklist/editor permutation or every multipage break was inspected.

Evidence:

- Method Statement [before TR PDF](pdf-before/method-tr-a4.pdf), [before page](pdf-before/method-tr-a4.png), [after PDF](pdf-after/method-tr-a4.pdf), [after page](pdf-after/method-tr-a4.png); EN PDFs also retained.
- Actual [risk PDF](pdf-after/risk-tr-a4.pdf), [inspection PDF](pdf-after/inspection-tr-a4.pdf), [poster PDF](pdf-after/poster-tr-a4.pdf), [A4 sign](pdf-after/sign-tr-A4.pdf), [A3 sign](pdf-after/sign-tr-A3.pdf).
- [Four-page Toolbox PDF](pdf-after/toolbox-branded-tr.pdf): [page 2 visual](evidence/toolbox-page2.png), [page 4 signature sheet](evidence/toolbox-page4.png).
- Downloads 320 [before](evidence/overflow-en-320-downloads.png) / [after](evidence/after-en-320-downloads.png); Method CTA 320 [before](evidence/overflow-en-320-tools-method-statement.png) / [after](evidence/after-en-320-method.png). The DOM overflow matrix supplies numerical proof beyond viewport screenshots.
- Decision journey [TR mobile](evidence/journey-tr-390.png) / [EN desktop](evidence/journey-en-1440.png).

### Analytics audit (source coverage, no live analytics access)

Existing real event names: `organic_landing`, `tool_open`, `tool_start`, `tool_complete`, `content_save`, `content_export`, `content_download`, `sign_up`, `premium_intent`; login uses `login`, checkout uses `checkout_start`. SIM keeps `sim5_showcase_view`, `sim5_demo_cta_click`, `sim5_premium_cta_click`. Resource DB events use `resource_attempt|...` / `resource_download|...` patterns. GA4 helper lives in `app/lib/analytics.ts`; identity-linked internal activity writes are separate.

Only the missing GA4 mirror of existing `checkout_start` and duplicate gesture were corrected. No email, account ID, token, provider response or checkout URL is added to GA4. Existing `sign_up` is SDK signup success, not proof of email confirmation. No verified server-to-GA4 `trial_started`, `purchase` or `premium_activated` completion chain was found; this remains a P2 observability gap, not an invented conversion metric. Live GA4 collection, consent/adblock behavior, conversion rate and abandonment rate are **not testable** here.

## Unresolved / release blockers

1. **Resolved in final safety review:** the four Quick Risk Assessment lint errors. Deterministic initial row ID, event-time IDs, router navigation and guarded dependent-selection adjustment replace render impurity/global mutation/effect cascade. [Current lint](results/release/p11-release-eslint.log): 0 errors, 14 existing warnings. The earlier [4-error run](results/p11-lint-final.log) remains historical evidence, not the current result.
2. **Deployment configuration blocker:** strict new-subscription variant allowlist contains the existing trial variant plus optional comma-separated `LEMONSQUEEZY_PREMIUM_VARIANT_IDS`. The legacy normal checkout numeric variant is not discoverable from repository source. Before deployment, review and configure its exact approved IDs in a sandbox and verify a legitimate new paid activation. Otherwise a legitimate unbound paid subscription can be rejected. Existing bound subscriptions retain legacy mappings. No live env/config was changed.
3. Real Supabase auth callback redirect allowlist/mail templates, email delivery/expired sessions, persisted customer entitlement/RLS/storage scopes, provider checkout/return/cancel/renewal/distributed webhook delivery are **not tested**. The new callback path must be reviewed against sandbox Auth redirect configuration before release. Mock CAS/reconciliation/repeat tests do not prove real provider ordering or distributed exactly-once delivery.
4. New branding API scopes paths exclusively to verified `user.id` and ignores foreign IDs. **Live bucket/RLS policies are absent from available repository evidence and were not queried/changed.** Direct storage denial must be validated in an authorized isolated Supabase project before declaring storage-level security complete. User files remain untouched.
5. Native iOS/Android, physical touch targets, every modal/overlay/back-navigation state, real download dialogs/printer drivers and SIM WebGL hardware/CDN rendering are **not tested**. Browser checks prove entry/access/layout and generated representative files only. No GPU/scene change made.
6. PDF QA/source checks and local SQL fixtures are not proof of live Supabase access. No production rollout or merge is authorized by these results. User approval and the above sandbox/configuration gates remain required.

## Reproduction environment

Node 24 / Next 16.2.10; installed Chromium/Playwright/esbuild from existing `tools/sim5-review/node_modules`, app dependencies, pdf-lib, pdftotext/pdftoppm. No dependency additions. `tools/p11-review/fixture-server.mjs` listens only on 127.0.0.1:54511, uses synthetic `.invalid` accounts and local auth/REST/storage protocol responses; it never forwards to Supabase. Tests abort browser requests outside 127.0.0.1. Fixture browser contexts use `bypassCSP:true` solely because production CSP intentionally does not allow local HTTP fixture storage; production CSP is unchanged and is **not** claimed tested by this suite.

Start fixture: `node tools/p11-review/fixture-server.mjs`. In `app`, build/start with explicitly fake `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54511`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=p11-fixture-public`, `SUPABASE_SERVICE_ROLE_KEY=p11-fixture-service`, and synthetic owner `ADMIN_EMAILS=admin@fixture.invalid`. Start the completed build on a fresh port; set `P11_URL=http://127.0.0.1:3127` for browser/server scripts. Never reuse these environment values for deployment.

Run `node tools/p11-review/{entitlement-test,billing-test,webhook-test,callback-test,trial-test,resource-gate-test,auth-browser,checkout-browser,loading-gate-browser}.mjs` individually (brace notation here denotes separate commands). Then `access-matrix.mjs`, `mobile-matrix.mjs`, `auth-lifecycle.mjs`, `journey-browser.mjs`, `branding-browser.mjs`, `pdf-qa.mjs`, `pdf-header-test.mjs`. Run heavy browser/PDF suites sequentially on constrained machines. `P11_BASELINE=1` loads base source for unit/component reproductions without checkout/reset; baseline native screenshots/PDFs were collected before fixes. Runtime artifacts are ignored; only selected sanitized evidence is committed.
