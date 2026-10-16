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
