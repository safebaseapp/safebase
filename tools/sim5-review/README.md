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
