# Package 7 validation

Implementation is on `codex/sim5-demo-premium-labs-pack7-recovery`, from exact
baseline `9c7bb81462148ab64cbb3a6b5825a185ee05b188`. This is a **Draft review**,
not production release approval. Supabase configuration was intentionally skipped.

## Passed

| Check | Result and scope |
| --- | --- |
| Original Package 6 mission suite | **289/289**, all 8 scripts, unchanged assertions and all default layouts |
| Package 7 suite | **13/13 scripts**: state allowlist, policy, server authorization, page gate, replay, API, SEO, connector, GA4 dispatch, demo browser, recorder, signaller, WebGL failures |
| Public DEMO browser | **90 checks**, TR/EN at 1280×1000, 320×568, 390×844, 844×390; real keyboard/native touch, two findings, consequences, report/repeat, no guest writes, once-per-run analytics |
| Isolated PostgreSQL 17 | **17 checks**: migration, owner RLS, no client writes/RPC, legacy XP-forgery path closed, existing server Labs writer retained, preservation, idempotency, concurrent same/different runs, best-score improvement |
| Actual local Next server, no Supabase | **8 checks**: public entry, SSR/RSC full gates with forged flags, guest API 403, gate hydration |
| TypeScript / Next build | Passed on final application source; `npm exec -- next build` avoids the asset-rewriting prebuild hook |
| Changed-file ESLint | **0 errors**, 7 pre-existing shared-navbar/Labs-image warnings |
| Sitemap | **818 → 824**, exactly six TR/EN entries; existing entries unchanged, no duplicates |
| Asset/operation checksums | All **3 GLBs** and welding/lifting operation sources unchanged from baseline |

The 289 regression checks comprise 27 mission-state, 43 mission-browser,
52 height, 7 runtime, 5 navigation, 28 welding, 47 lifting/color and 80
input/mobile-layout checks. Software SwiftShader timings are diagnostic, **not
claims about physical mobile hardware FPS**. The runtime check verifies six
GPU-completed frames, workload limits, collision and stale-answer rejection.

Expanded lint of the unused, unchanged legacy `IndustrialScene.tsx` still reports
its existing errors. The actual modified scene component and all other changed
TypeScript files pass targeted lint. Next build retains an existing NFT tracing
warning originating in `admin/content`, unrelated to SIM.

## Auth matrix

These use the real server authorization/page/API code with dependency fixtures;
only the unconfigured guest case was also checked against a real local Next
server. **No real Supabase session or billing entitlement was tested.**

| Identity/status | Full scene | Result mutation |
| --- | --- | --- |
| Guest / unconfigured auth | Gate, no operable six-finding scene | Denied |
| Signed-in free | Upgrade gate | Denied |
| Suspended, including admin | Denied | Denied |
| Expired trial / unverified billing | Denied | Denied |
| Active billing Premium | Full mode | Owner-bound server verification |
| Active admin | Full mode | Owner-bound server verification |
| Active reward Premium | Full mode | Owner-bound server verification |
| Missing profile / auth unavailable | Fail closed | Denied |

The server does not accept client Premium/score/XP/completion flags. It replays
legal evidence and answer events; the service-only transaction deduplicates XP.
A scripted **legal** educational answer sequence is not prevented or presented
as an examination. See [architecture](ARCHITECTURE.md) for this boundary,
reload behavior, the migration and rollback notes.

## Connector regression found and fixed

The original height test failed on the mobile upper tank connector near
X=61.755, Y=12.225, Z=-26.659. Bundling the exact baseline without changing
checkout files reproduced the same failure. Ray probes showed a low body ray
anticipating the imported riser before the centre reached its rising walkway.

The fix uses a round footprint and validates intervening walkable support in
small spatial steps before treating such a hit as a wall. It does not change
models, approved geometry, barrier volumes or the maximum step height. All
**21 connector cases** (0.2–20 mm steps, three lateral offsets) now pass, as do
the full native desktop/mobile ascent/descent, tank wall and bridge rail tests.
The final original suite passes; the initial failures are not counted as passes.

## External limitations / release gates

- **LIVE SUPABASE NOT RUN.** No staging/production migration applied. Actual
  auth/billing/reward sessions, Supabase's deployed policies/schema, and live
  history/XP persistence must be verified before release.
- Local PostgreSQL uses explicit Supabase-shaped role/auth fixtures; its passing
  SQL/RLS/concurrency tests do not establish live Supabase compatibility.
- **LIVE GA4 collection NOT RUN.** Tests verify project `trackEvent` dispatch,
  no PII and deduplication under StrictMode/re-render, not collector ingestion.
- An additional actual Next/CDN WebGL smoke test **failed** because cloud
  Chromium rejected the environment proxy CA (`ERR_CERT_AUTHORITY_INVALID` on
  `esm.sh`). TLS verification was not bypassed. The app displayed its graceful
  fallback. Actual Next SSR/RSC checks and self-hosted, pinned-Three WebGL fixture
  checks passed; they are separate evidence, not a claimed CDN-browser pass.
- HTTPS GitHub fetch/push/API and verified curl access to the CDN now work.
  Only needed `esm.sh` and `api.github.com` entries were added to the cloud draft,
  preserving existing font domains. No environment publication was performed.

## Evidence and reproduction

Machine-readable results are in [results/summary.json](results/summary.json).
Selected images are described in [README.md](README.md). Browser fixtures bundle
real application modules with the original GLBs and Three 0.180.0. Simulated auth
and intercepted persistence are explicitly labeled in their result files.

From the repository root:

```sh
npm --prefix tools/sim5-review run test:mission
npm --prefix tools/sim5-review run test:package7
# Dedicated disposable local PostgreSQL container only:
npm --prefix tools/sim5-review run test:database
cd app
npx tsc --noEmit
npm exec -- next build
```

Start a fresh local Next server after building before running `next-smoke-test.mjs`;
a server retaining an older build can reference removed chunks. The optional
`next-demo-browser-test.mjs` additionally needs Chromium to trust the environment
proxy CA. It deliberately preserves TLS verification and blocks live analytics.
