# SERNEM SIM 5.0 — Package 8 release preparation

Draft PR: https://github.com/safebaseapp/safebase/pull/106
Branch: `codex/sim5-final-homepage-menu-visual-xp-pack8`
Verified start: `fix/sim5-demo-post-completion-webgl-20261020` at `95f7f9e49d0abb0c26f5b5866500bec0db63fb49`. The new branch was pushed before development. PR #104/#105 and Issue #102 were reviewed; neither earlier PR was modified or merged. The draft targets the #105 branch to isolate Package 8 review. Main remains `b8ebca8e07bcbf500c276767d4a80251d3db2b08`.

## User-visible changes

Homepage order is **existing hero → SIM 5.0 featured showcase → existing SERNEM Labs showcase → existing industry sections**. Both localized homepages use the same accessible two-column dark cyan/violet component. Mobile places the real site image first, followed by title, localized HSE copy, seven feature labels, DEMO and Premium CTAs. The two-finding guest version and six-finding Premium scope are explicit. Existing homepage content and metadata are retained. The Labs homepage section renders in the page tree instead of inserting a portal after hydration.

The actual scene capture is [`app/public/images/sim5-site-showcase.webp`](../../app/public/images/sim5-site-showcase.webp), **1760×994, 62,886 bytes**, reused in the homepage, Labs feature and compact Platform → HSE Labs entry. [Capture provenance](showcase-provenance.json) records the temporary test camera, original GLB hashes and asset SHA-256. Gameplay camera, geometry, models, lighting and PR #105 runtime are unchanged. Next Image reserves space and uses responsive sources/crops.

Both menus preserve HSE Labs, Spot the Hazard and Incident Simulator. Escape closes the menu and restores the trigger; Tab reaches both SIM links. Accordion render helpers avoid remounting DOM/focus on state changes. A pre-existing 1024–1535 px navigation gap is fixed by making the main menu available up to the desktop Platform breakpoint.

## Screenshots

| Surface | Desktop | Mobile |
|---|---|---|
| Homepage TR | [image](renders/homepage-tr-desktop.webp) | [image](renders/homepage-tr-mobile.webp) |
| Homepage EN | [image](renders/homepage-en-desktop.webp) | [image](renders/homepage-en-mobile.webp) |
| Platform / HSE Labs TR | [image](renders/menu-tr-desktop.webp) | [image](renders/menu-tr-mobile.webp) |
| Platform / HSE Labs EN | [image](renders/menu-en-desktop.webp) | [image](renders/menu-en-mobile.webp) |
| Labs TR | [image](renders/labs-tr-desktop.webp) | [image](renders/labs-tr-mobile.webp) |
| Labs EN | [image](renders/labs-en-desktop.webp) | [image](renders/labs-en-mobile.webp) |

Captured from the actual local production build in Chromium; these are not Vercel or physical-device screenshots. [Completed TR report after forced context loss](renders/completed-context-loss-tr.webp), [EN](renders/completed-context-loss-en.webp).

## Validation

| Check | Result / limit |
|---|---|
| Original Package 6 regressions | **289 pass**: mission state 27, mission browser 43, height 52, runtime 7, navigation 5, geometry 28, lifting/color 47, controls 80. [log](results/original-regressions.txt) |
| Package 7 suite | **13 scripts pass**, including guest two-finding/replay/no-write tests, server entitlement fixtures, server page/API gates, six-finding replay/persistence, SEO, actual geometry, analytics and WebGL failure handling. [log](results/package7.txt) |
| Homepage/menu/Labs/CTA | **125 pass**, TR/EN at 1600×1000, 1440×1000, 820×1180, 390×844, 320×568, 844×390. Real image, hero order, localized hrefs, existing links, keyboard/focus/Escape, no overflow, and actual DEMO/Premium navigation. [results](results/showcase-results.json) |
| Login return destinations | **20 fixtures pass** across localized DEMO/full pages, guest/unavailable/free/inactive/Premium. Guest login returns directly to full SIM; Free upgrade retains destination. [log](results/redirects.txt) |
| Completion and WebGL resilience | **13 pass**, two 100/100 completions per language, replay resumes rendering, exact report retained after real `WEBGL_lose_context`, zero DEMO writes. Active 57–58 render calls per 1.1s → finished 4 → lost context 0. Invocation rates on software WebGL, not hardware GPU utilization. [results](results/completion-webgl-results.json) |
| GA4 event code | Showcase view/DEMO/Premium CTA each once under StrictMode/rerender. Existing gate/start/complete/full-complete scripts pass with local `gtag` collectors and no PII. [results](results/showcase-analytics-results.json). **LIVE GA4 collector NOT TESTED** |
| Local PostgreSQL 17 | **20 pass**: migration, RLS, ownership, service role, malformed/null reports, duplicate/concurrent runs, best-score delta, progress/streak/level and legacy writer preservation. Disposable Docker DB with `--network none`. [log](results/database.txt) |
| Real Next server, no Supabase | **8 pass**, guest DEMO SSR, denied full SSR/RSC even with forged flags, API 403, localized gate hydration. [log](results/next-smoke.txt) |
| TypeScript | **Pass**, standalone `tsc --noEmit` and production build typecheck. [log](results/typescript.txt) |
| Next production build | **Pass**, 848 generated pages. Existing dynamic-import warnings remain in admin content renderer. [log](results/next-build.txt) |
| Changed application files ESLint | **0 errors, 13 warnings** (existing image/unused/dependency warnings). [log](results/changed-files-lint.txt) |
| Repository-wide ESLint | **FAIL: 183 errors, 113 warnings** in existing repository code; not a clean global lint result. Unchanged legacy `IndustrialScene.tsx` alone has 14 errors. [full log](results/repository-lint.txt) |
| Direct CDN browser integration | **FAIL / environment blocked**: Chromium cannot trust the cloud proxy certificate for `esm.sh`, `ERR_CERT_AUTHORITY_INVALID`; actual Next scene load times out. No certificate bypass. Self-hosted pinned Three/real GLB WebGL tests passed separately. [evidence](results/cdn-browser-failure.json) |
| Vercel Preview | Latest deployment status and URL are in the Draft PR; READY is a deployment result, not live Supabase/GA4 proof. |

The original Package 7 WebGL fallback assertion was updated to the localized wording already introduced by PR #105; the same accessible alert and disabled start behavior remain checked. Early UI test runs exposed the navigation breakpoint gap (fixed), and a `networkidle` wait was replaced with actual DOM/image checks because unrelated prefetch/analytics requests can stay active. The final 125-check run passes.

## XP and database reality

**CODE/LOCAL DB TESTS PASSED. LIVE SUPABASE NOT TESTED.** Production lacks `sim5_runs` and `sim5_xp_best`; no staging exists. No production connection, migration, profile changes, XP writes or paid project/branch creation occurred.

See [XP audit](xp-security.md) for the trusted replay → owner/revision validation → service-role RPC → serialized best-score delta flow. The static six-finding mission permits unlimited replay but a maximum lifetime 200 XP, awarded only for best-score improvements. DEMO never records runs/XP/history. RLS isolates account history. SQL now also rejects NULL/incomplete trusted RPC reports and duplicate/missing finding IDs; existing server replay already rejected these and client RPC execution was already denied.

Required SIM migration: [`20261020_sim5_runs.sql`](../../app/supabase/migrations/20261020_sim5_runs.sql). It depends on existing Labs schema [`20260930_sernem_labs_v1.sql`](../../app/supabase/migrations/20260930_sernem_labs_v1.sql); inspect the actual migration ledger, do not rerun an applied migration. It intentionally revokes legacy direct-client writes to progress/attempts; inventory external writers before approval. Supabase public configuration and service-role key must be provided separately for full persistence. No secrets are in this report.

## Remaining release risks

- Full persisted Premium completion/history/XP still needs an approved migration and a real staging auth/subscription/RLS end-to-end run. Missing configuration fails closed and is not a successful write.
- Real GA4 collector, physical desktop/mobile GPUs and uninterrupted CDN access outside this proxy remain unverified. Do not infer hardware performance from SwiftShader.
- Global ESLint remains failing outside the Package 8 changed files. No production readiness claim hides that failure.
- No merge or production publication was performed. The PR remains Draft for final review; deployment readiness does not authorize production database work.

## Reproduce

From repo root, original suite: `node tools/sim5-review/mission-suite.mjs`; Package 7: `node tools/sim5-review/package7-suite.mjs`. Build `app` with `npm run build` (its existing prebuild regenerates toolbox PDFs; do not commit unrelated generated changes), then start a local production server. Run Package 8 with `SIM5_NEXT_URL=http://127.0.0.1:<port> node tools/sim5-review/package8-suite.mjs`. Local DB only: start disposable `postgres:17-alpine` container named `sim5-pack7-db` with `--network none`, then `node tools/sim5-review/database-test.mjs`; remove it afterward. Never point that test at production.
