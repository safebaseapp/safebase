# Package 7 validation (in progress)

- DEMO: 90 TR/EN browser checks at 1280x1000, 320x568, 390x844, 844x390,
  including real keyboard/native CDP touch, two allowed findings, blocked Premium
  evidence, short normalized report, repeat, no writes, and once-per-run GA4.
- WebGL unavailable, model failure, context loss: 6 checks.
- Signaller: 6 WebGL checks across 3 views; authored geometry and source assets
  unchanged, tinted suit/leather and fitted high-visibility vest visible.
- Server policy: 9 pure cases and 10 real authorization-module fixture cases.
- Server page: 17 cases, including forged query parameters and guest/free/
  inactive/expired/config-missing/active Premium/admin/reward in TR/EN.
- API: 12 real-handler dependency-fixture checks.
- Replay: 18 action-log checks. Recorder: 5 real-browser/intercepted-transport
  checks, including failed-save feedback and retry.
- PostgreSQL 17 isolated container: migration + 15 RLS/ownership/idempotency/
  concurrency/XP checks. **LIVE SUPABASE NOT RUN.**
- TypeScript passed. Changed-file lint: 0 errors; 7 pre-existing warnings in
  shared navbar and Labs image. An expanded lint of the unused legacy
  IndustrialScene still reports existing errors; that module is not changed.
- `npm exec -- next build` passed (prebuild intentionally not invoked because it
  rewrites tracked PDFs). Existing NFT tracing warning comes from admin/content.
- Actual production Next server without Supabase: DEMO and full gate HTTP 200;
  forged premium query and RSC request contain the gate and no operable scene.
  Actual guest API returns 403, not a successful DB operation.

## Required regression investigation

The original Package 6 mission suite's height test currently fails at the mobile
portrait upper tank connector (about X=61.755, Y=12.225, Z=-26.659). Desktop reaches
all six findings. Reproducing against exact baseline
`9c7bb81462148ab64cbb3a6b5825a185ee05b188`, with no branch switch or source edits,
fails at the same position. This is **not a passing gate**; diagnosis continues.
The review server can bundle baseline SIM modules with `SIM5_REVIEW_BASELINE`.
`SIM5_HEIGHT_LAYOUT` scopes diagnostic runs only; final regression uses all layouts.

## External limits

Supabase keys were intentionally not configured. No production DB migration,
real session/billing/reward tests, or live GA4 collection claimed. GitHub HTTPS
fetch/push works; API currently returns Forbidden, so Draft PR creation may remain
blocked. The cloud draft adds only required `esm.sh` and `api.github.com` network
destinations, preserving existing font entries; saving is not publication and
current egress to those hosts is still denied. WebGL fixtures self-host the
same pinned Three runtime and original GLBs.
