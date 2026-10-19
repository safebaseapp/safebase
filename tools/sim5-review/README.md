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
