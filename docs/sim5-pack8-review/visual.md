# Actual SIM 5.0 site capture

`app/public/images/sim5-site-showcase.webp` is a 1760×994 capture of the existing `RealModels.tsx` scene with its original GLBs and pinned Three 0.180.0. The temporary test camera is recorded in `showcase-provenance.json`. No gameplay camera, model, geometry, material or lighting changes are shipped. No stock or generated image is used.

Reproduce with `node tools/sim5-review/capture-showcase.mjs` (local Chromium/SwiftShader fixture). Software rendering is test instrumentation, not a physical-device performance measurement. The optimized WebP uses quality 86. Next Image reserves its dimensions, uses responsive sources and crops inside reserved frames.

Placement: existing homepage hero → new SIM showcase → existing Labs showcase → existing industry sections. The Labs showcase now renders in the page tree rather than being inserted after hydration. Platform → HSE Labs preserves the existing Labs, Spot the Hazard and Incident Simulator links, adding a compact SIM entry. Both menus support Escape and return focus to their trigger; render helpers preserve accordion DOM and focus between state changes.
