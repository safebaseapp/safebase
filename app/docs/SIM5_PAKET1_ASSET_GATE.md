# SERNEM SIM 5.0 — Paket 1: Asset and engine gate

Status: **BLOCKED (real refinery asset not yet verified)**. This branch is isolated from SIM 3.0 and production.

## Existing code audit (2026-10-16)
- Default branch `main` has Next.js 16.2.10 and React 19.2.4 in `app/package.json`.
- `three`, `@playcanvas/engine`, and other 3D runtime packages are **not** declared in the application dependencies.
- The old SIM 4.0 and 360 prototypes are on a different feature branch and must not be treated as a production-ready 3D foundation.
- SIM 3.0 remains unchanged.

## Mandatory asset acceptance
1. An authentic industrial refinery 3D scene, not a still photograph, panorama, or procedurally generated box environment.
2. License confirmed for SERNEM's commercial use, redistribution/hosting, derivative safety training, and required attribution.
3. Downloadable GLB/glTF or source asset with textures and PBR materials; inspect actual files and material links.
4. A meaningful walkable area with floors, platforms, piping and equipment; inspect geometry and scale.
5. Mobile and desktop performance verified with actual loaded asset in browser; avoid promises of FPS before measurement.
6. No real/fictitious hazards or XP until physically represented in the model.

## Go/no-go
- **PASS** only after a licensed refinery scene renders with real geometry, stable movement, and measured mobile usability.
- **BLOCKED** if asset/license/files cannot be validated. No fallback to photos, panoramas, generic warehouses or fake scenes.
- **FAIL** if visuals or performance fall below agreed quality.

## Next implementation after asset approval
Install one 3D runtime, create isolated `/en/labs/3d-safety-inspector/sim5` and `/tr/...` routes, implement real movement/collision/touch, then browser-test the asset. Do not begin hazard/XP packages before this gate passes.

## Asset search checkpoint — 2026-10-16
Research sources and disposition (research only; no assets imported):
- **Sketchfab / burnedhrum, "Gas / Oil Tank / Refinery / Storage"** — downloadable CC BY model, ~110.1k triangles, ~63.6k vertices. It is **one storage tank**, not a complete walkable refinery. **REJECT as primary scene**; potential supporting asset only after downloaded file/material QA. https://sketchfab.com/3d-models/gas-oil-tank-refinery-storage-f386d1acb6eb4e8dbdd6fa19d2ce801e
- **Sketchfab Store / lwjcxhlsc, "Refinery"** — full complex refinery description, ~197.3k triangles, mentions texture PNG and real-time/mobile. **BLOCKED**: paid-store listing and actual asset/license/download not verified; no purchase authorized. https://sketchfab.com/3d-models/refinery-851fa1dad60c40a992ccef5fd0155241
- **3D CAD Browser, "Petroleum Plant Refinery"** — 50,259 polygons, 44 objects, 17 materials, 0 textures; account required, redistribution restrictions. **REJECT** for current quality/licensing/download constraints. https://www.3dcadbrowser.com/3d-model/petroleum-plant-refinery
- **Kenney Factory Kit / City Kit Industrial** — CC0 but low-poly/stylized; **REJECT** for primary photorealistic environment. https://kenney.nl/assets/factory-kit
- **Sketchfab refinery listings** — discovery index only; does not establish file/license suitability. https://sketchfab.com/tags/oil-refinery

**Decision:** No candidate meets all gates. **Paket 1 remains BLOCKED**; no deployment or false demo. Next search should prioritize verifiable complete refinery scenes with PBR textures and explicit commercial hosting permissions; evaluate actual download files before integration.

## Candidate expansion — 2026-10-16, second pass
Search expanded to professional/commercial refinery environments rather than accepting low-poly substitutes.

**Priority A (pending acquisition/inspection):**
- OpiStudio, *Modular Industrial Refinery and Chemical Plant Complex — 3D Environment Kit*: https://www.fab.com/listings/8a134d13-ef9e-490d-ae1e-d82e1527072d . Listing claims distillation towers, pipelines, tanks, modular scene, PBR workflow, GLB/glTF/FBX/OBJ. **UNVERIFIED**: actual scene content, visual quality, file sizes, licensing entitlement, collision/walkability, mobile performance. No purchase or download made.
- MSP Assets, *Industrial Refinery Processing Plant Complex*: https://www.fab.com/listings/18f83f06-9621-451d-bc1f-8ee820ae29ea . Listing claims a large detailed complex with pipelines/tanks/columns and GLB; publisher claims mobile optimization. **UNVERIFIED**: actual texture quality, walkable interior, performance, license/entitlement. No purchase or download made.

**Rejected alternatives:**
- Pplouch, *Oil Refinery Low Poly*: https://www.fab.com/listings/36fe799a-a9d8-4479-ad0c-d5ecd44df4a9 . Low-poly visual style violates user's quality gate.
- 3D CAD Browser, *Refinery Plant*: https://www.3dcadbrowser.com/3d-model/refinery-plant . Listing reports 142206 polygons, 1724 objects, 17 materials but **0 textures** and **no UV mapping**. Reject for photorealistic ready-to-deploy primary environment.

**Hard stop remains:** Neither priority model is an accepted asset until a legitimate downloadable copy is inspected, license permits intended SERNEM hosting, and actual in-browser rendering/mobile performance is tested. Do not deploy stock images or substitute scenes. SIM 3.0 and production remain untouched.
