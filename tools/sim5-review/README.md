# SIM 5 welding review

This isolated browser fixture loads the actual `WeldingOperation.ts` and
`RealModels.tsx` from the application. It does not start Next, contact production,
use Supabase, or replace either industrial GLB. It serves Three 0.180.0 locally,
matching the site's existing CDN version, so browser validation needs no egress.

```sh
cd /workspace/safebase
npm ci --prefix tools/sim5-review
npm --prefix tools/sim5-review run inspect
npm --prefix tools/sim5-review test
```

Node 24.19.0, Chromium at `/usr/bin/chromium`, and Playwright 1.62.1 were used.
Set `CHROMIUM_PATH` if the executable is elsewhere. Dependencies install into
this tool's ignored `node_modules`; application manifests and lockfiles stay
unchanged. `npm --prefix tools/sim5-review run serve` starts the loopback-only
manual fixture. `/` reviews the station, `/site.html?lang=tr` and
`/site.html?lang=en` mount the real site component. These are internal fixtures,
not public previews.

`inspect` traverses every GLB node, composes its complete matrix chain, reads
every position accessor, and saves actual vertex bounds, material assignments,
node transforms, license metadata and the asset checksum to
`artifacts/asset-inspection.json`. The original JSON accessor min/max alone is
not a world-space measurement.

`test` verifies nozzle/coupon contact, wire length, arc origin, glove/grip
intersection, eye-to-window ray intersection, cable endpoints and floor
clearance, valid normals, grounded boots/extinguisher, animated particles, and
both languages' safe/unsafe choices for all three HSE scenarios. It captures
three distinct station views, three detail views and both actual site variants.
Results are written only on a successful run to `artifacts/results.json`.
Browser page errors or unexpected network origins fail the run; embedded GLB
blob textures are local resources. Source and industrial asset checksums are
also verified.

The integration fixture's `review-three.js` subclasses only the test renderer:
it captures the real scene/camera and renders requested frames rather than
continuously saturating the software GPU. The actual component's animation,
movement and HSE update loop continues. No test hooks or alternate scene are
added to application code. Station detail captures use an unmodified renderer
with shadows and lights enabled. The test camera can be overridden without
changing the component's initial camera or controls.

Screenshots and full machine-readable reports are ignored generated artifacts.
Selected, visually inspected captures are retained in
`docs/sim5-welding-review/` with the development report.

## Lifting and welder-color pack

Run `npm --prefix tools/sim5-review run test:all` from the repository root.
This preserves the 28 welding/site regression checks and then runs
`pack-test.mjs`: 47 additional checks for unchanged welding anchors, actual
rendered colors under three camera/light combinations, hook/rope/sling
connectivity, hollow balanced pipe geometry, grounded outriggers, site clearance,
and both languages' four HSE decisions. `test:pack` runs that second suite alone.
The additional manual fixture is `/lifting.html` (add `?lang=tr` for labels).

Color samples render only the selected garment against black with the real
material, textures and lighting. Non-background pixels are read back from
WebGL. Blue/brown chroma and white-pixel fractions are checked; the hardhat's
brightness is compared with the suit under the same illumination, so a shaded
white hardhat is not incorrectly required to have sunlit pixel values.
These checks do not replace inspection of complete station/site captures.

`artifacts/pack-results.json` records each assertion and measured values; captures
use the `pack-` prefix. Passing result files are removed at the beginning of each
suite and written only after all checks pass. The original GLBs are still
checksummed. No downloaded crane asset is needed: crane and rigging geometry are
original procedural project code under the repository's MIT license.

## Direction and mobile-input review

`npm --prefix tools/sim5-review run test:controls` runs the real site component
at desktop, 320×568, 390×844 and 844×390 sizes, with the page's 24px container
padding. The fixture has a mobile viewport meta tag. It exposes the renderer
only in the test shim to compare actual mesh/vertex counts, materials,
antialiasing, pixel ratio, tone mapping and shadows between devices.

The 80 checks use real keyboard, mouse, CDP touch and multi-touch events:
camera-relative strafe at four yaw angles, hold/release, touch cancel, native
capture loss, simultaneous look/move, mixed pointer/keyboard input, reset,
mode changes, blur/visibility cleanup, viewport rotation, inspect after drag,
keyboard activation after touch, and overflow/overlap/44px target checks.
For partial CDP `touchEnd`, provide the ending finger (not remaining fingers).
Capture loss is tested after activating capture and processing the next pointer
event, as required by pending pointer capture semantics.

Control screenshots capture the actual viewport, rather than temporarily
resizing a mobile viewport for a full-page screenshot. They are real WebGL
renders with identical review camera placement. The fixture does not replace
production navigation or reduce mobile rendering quality. Results and screenshots
are generated under `artifacts/controls-*`; reviewed copies live under
`docs/sim5-mobile-controls-review/`.

## Package 7

`npm --prefix tools/sim5-review run test:package7` runs demo, authorization,
server page/API, legal log replay, SEO, connector, GA4-dispatch, recorder,
signaller and WebGL failure tests. The ordinary Package 6 `test:mission` suite
still runs every original layout and operation check. Browser fixtures use the
actual scene modules/GLBs and pinned Three; they do not connect to Supabase.

For SQL, start a dedicated disposable `postgres:17-alpine` container named
`sim5-pack7-db` with no published ports (the test invokes psql through docker
exec). Then run `npm --prefix tools/sim5-review run test:database`. It recreates
**only the local `sim5_test` database in that dedicated test container** and uses
Supabase-shaped auth/role fixtures. Never point it at a real project database.
`SIM5_TEST_CONTAINER` changes the disposable container name. Remove the container
after testing. This validates PostgreSQL migration/RLS/concurrency, not live
Supabase auth, policies or network connectivity.

`SIM5_NEXT_URL=http://127.0.0.1:3100 node tools/sim5-review/next-smoke-test.mjs`
checks the real local Next server without Supabase: SSR/RSC gates, guest API and
public demo entry. No localhost user preview links are provided.

For baseline diagnosis only, `SIM5_REVIEW_BASELINE=<40-character commit SHA>`
bundles SIM modules from that exact commit without changing checkout files.
`SIM5_HEIGHT_LAYOUT=mobile-portrait` scopes a diagnostic height run; omit it for
all mandatory regression layouts. `connector-test.mjs` exposes the real
navigation through the **review bundler only**, never production code, and
checks small movement steps against the actual industrial geometry. To reproduce
the old false collision, run it with the starting SHA and
`SIM5_EXPECT_CONNECTOR_BLOCKED=1`. Review artifacts record their test type;
fixture passes must never be described as live Supabase or live GA4 passes.

The optional `next-demo-browser-test.mjs` checks the actual Next page and CDN
runtime without substituting Three or GLBs, and blocks live analytics. It needs
Chromium to trust the environment proxy CA. A CA failure is a failed smoke test,
not permission to disable TLS verification. Restart Next after rebuilding so
old manifests do not reference removed chunks. During Package 7 review this
extra CDN-browser test was blocked by `ERR_CERT_AUTHORITY_INVALID`; self-hosted
WebGL and actual Next SSR/RSC checks passed independently.
