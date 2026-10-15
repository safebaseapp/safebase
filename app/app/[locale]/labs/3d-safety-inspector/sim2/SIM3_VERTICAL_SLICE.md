# SERNEM SIM 3.0 — Production gate

## Goal
A playable, convincing browser-based industrial HSE training simulation. Do not claim photorealism from procedural placeholder props or render-only demonstrations.

## First deliverable — Hot Work / Unsecured Gas Cylinders
- One complete walkable refinery work zone with an inspectable hot-work scene and correctly represented gas cylinder storage violation.
- Player can move, approach, inspect, select an HSE action, receive feedback, and finish the task.
- Desktop mouse/keyboard and iPhone touch controls.
- Turkish and English.
- Keep the existing 12-scenario data and scoring; port to the new scene only after this first scenario passes visual and functional acceptance.
- No production deploy without explicit approval.

## Asset acceptance gate
For every external 3D model, record: creator, original URL, exact license, attribution, commercial use permission, modification permission, download format, polygon count, texture dimensions, size, and a screenshot of the imported model. Reject unknown or noncommercial-only licensing. Preserve credits in product UI.
Required models: refinery environment, industrial worker with walk/idle animation, forklift, scaffold, industrial pipework, gas cylinder rack, welding setup, fire protection and signage.
Model placement must make each violation legible without artificial orange floating markers.

## Technical gate
- Test actual asset in Three.js scene, not a standalone viewer.
- Verify texture maps are present; avoid reporting mesh count as textured mesh count.
- Measure mobile performance and memory; reduce asset complexity where needed.
- Inspect raycast and distance checks against the actual unsafe object, not only invisible placeholder spheres.
- Validate collision, spawn, camera, movement, inspection, choice, scoring, restart, TR/EN and touch.

## Delivery gate
1. Asset manifest and rights audit
2. One fully dressed playable hot-work scene
3. Desktop and iPhone QA
4. 12-scenario rollout
5. User approval of Preview before production

Do not equate Vercel READY with gameplay or visual QA PASS.
