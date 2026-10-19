# Package 6 validation

Final component code passed **289 checks**, TypeScript, targeted ESLint and the production build on 2026-10-19. Individual final reports and timestamps are retained below; the total counts assertions, not 289 independent test cases or devices. Development-time failed runs are not counted as passing checks.

| Final check group | Passed | Evidence |
| --- | ---: | --- |
| Mission state/scoring/clock contract | 27 | [State results](results/mission-state-results.json) |
| Actual component lifecycle and scene consequences | 43 | [Browser results](results/mission-browser-results.json) |
| Six findings, safe routes, stairs, upper controls and replay | 52 | [Height/route results](results/height-results.json) |
| Mobile answer approach, collision and GPU workload | 7 | [Runtime results](results/runtime-validation.json) |
| Real Three head-clearance raycasts | 5 | [Navigation results](results/navigation-results.json) |
| Welding geometry/render and TR/EN HSE integration | 28 | [Welding results](results/results.json) |
| Original colors, lifting/rigging and TR/EN controls | 47 | [Color/lifting results](results/pack-results.json) |
| Desktop input, native mobile touch/layout/quality | 80 | [Control results](results/controls-results.json) |
| **Total** | **289** | [Machine-readable summary and preserved asset hashes](results/summary.json) |

`npx tsc --noEmit` passed. `npx eslint` passed for `RealModels.tsx`, `SiteEvidence.ts`, `WeldingOperation.ts`, `MissionState.ts`, `useMission.ts`, `MissionConsequences.ts`, `MissionPanel.tsx` and `MissionSceneEffects.ts`. `npx next build` passed; [full build output](results/next-build.txt) retains the inherited NFT/import trace warning from `next.config.ts` through the admin content page. The PDF-mutating npm prebuild was not invoked. Fonts/layout/globals, navigation, lifting builder and all three GLBs have no package diff.

The final gate results were completed individually after correcting test harness assumptions. During development: a fixed 1.25-second HUD wait was replaced with an adaptive wait for the one-second display sampling; esbuild was given an explicit repository working directory; the automated walker gained target reacquisition after overshoot under software-GPU load; the wall probe resets camera yaw after evidence viewing; and the leak assertion respects the existing staggered animation that hides each droplet briefly on impact. None of these changes relaxes production collision, movement, inspection or scoring rules. There are no unresolved failures in the final reported gates.

## Real WebGL outcome evidence

These are Chromium WebGL screenshots from the actual component and original assets, not mockups. The browser result records an actually active rendered arc before the decision and an extinguished one afterward; arc/halo/light/all sparks remain off in six subsequent checks.

| Outcome | Before | After |
| --- | --- | --- |
| Stop welding | [Active arc and sparks](renders/welding-before.png) | [Arc/light/sparks stopped](renders/welding-stopped.png) |
| Stow loose tool | [Loose tool at edge](renders/desktop-droppedTool-before-control.png) | [Closed, latched storage and pending-edge-control status](renders/desktop-droppedTool-after-control.png) |
| Contain small fittings | [Open tray on bridge](renders/desktop-materials-before-control.png) | [Closed box on guarded tank platform; bridge clear](renders/desktop-materials-after-control.png) |

[Welding status](renders/welding-status.png), [isolation/removal request indicators](renders/ground-control-requests.png), and [measured partial report](renders/partial-report.png) distinguish requests from actions. Leak droplets and all 19 access-obstruction meshes remain after their requests. Geometry diagnostics for welding/lifting are unchanged by decisions. Restart hides control indicators/lids and restores both original upper evidence positions.

General views: [south](renders/site-south.png), [east](renders/site-east.png), [west](renders/site-west.png). Close-ups: [stairs](renders/stairs.png), [upper platforms](renders/upper-platform.png), [lifting](renders/lifting.png), [designated signaller](renders/signaller.png). General views show the pre-mission scene; there are no initial hazard waypoint markers.

## Stair proof: actual input and actual player Y

The route report includes intermediate world-space coordinates. Desktop walks from the safe road start through welding, outside lifting, the access bypass and leak, then around the tank to the stairs. It never sets player coordinates. Mobile stair fixtures set XZ at the entrance only; vertical movement, platform travel and descent use native touch D-pad input, without assigning Y.

| Sample | Desktop eye Y (m) | Portrait (m) | Landscape (m) |
| --- | ---: | ---: | ---: |
| First flight, Z −17 | 2.172 | 2.154 | 2.154 |
| Mid-stair, Z −21 | 6.422 | 6.422 | 6.426 |
| Top-flight approach, Z −26.6 | 11.547 | 11.548 | 11.550 |
| Upper walkway | 12.910 | 12.910 | 12.910 |
| Return to ground, Z −15 | 1.768 | 1.765 | 1.768 |

Sequential actual-camera screenshots: [ground](renders/desktop-ground.png) → [first flight](renders/desktop-ascent-17.png) → [mid-stair](renders/desktop-ascent-21.png) → [top flight](renders/desktop-ascent-26.6.png) → [upper walkway](renders/desktop-upper-walkway.png) → [descent](renders/desktop-descent-20.png) → [ground again](renders/desktop-descent-15.png). The test badge reports the real camera Y at capture; minor differences from sampled route coordinates reflect camera smoothing between samples.

Native mobile sequences: portrait [ascent](renders/mobile-portrait-ascent-21.png), [upper](renders/mobile-portrait-upper-walkway.png), [descent](renders/mobile-portrait-descent-15.png); landscape [ascent](renders/mobile-landscape-ascent-21.png), [upper](renders/mobile-landscape-upper-walkway.png), [descent](renders/mobile-landscape-descent-15.png). The tests reject ground-level inspection of both upper anchors, preserve upper support against rails, block the tank wall and lifting exclusion volume, and verify release stops movement.

The desktop six-finding wrong→correct route finishes at **80/100, 160 mission XP**; each scoped mobile two-upper-finding route finishes at **16/100, 32 XP**, with the other four findings correctly missing. The pure-state tests also verify a first-correct six-finding attempt is exactly **100/100, 200 XP**. These are measured test attempts, not a user's persistent achievement history.

## Mobile quality and limitations

Native touch checks cover 320×568, 390×844 and 844×390 layouts, D-pad hold/release/cancel/lost capture, simultaneous walk/look, resize clearing input, accessible Inspect, report/confirmation layout and non-overlapping HUD. [Small portrait report](renders/small-portrait-report.png) and [TR landscape report](renders/landscape-report.png) are included. The same three GLBs, operation meshes, textures and scene logic run on desktop/mobile; existing DPR cap 1.8 is preserved. No mobile-only asset removal was added.

The diagnostic burst completed six GPU frames with WebGL error 0, 2,621,152 triangles and 907 draw calls at DPR 1.8, within the Package 5 comparison budget. Small frame-to-frame differences include animated spark visibility; this is not a claim of improved hardware FPS.

Physical Android/iOS, sustained device FPS/thermal/memory pressure and authenticated Supabase application E2E were **not tested**. The isolated fixture uses software SwiftShader and on-demand screenshot draws while the actual component input/animation loop runs. General/operation captures use a review-only camera clone; stair proofs use the real player camera. No merge, production deployment, persistent XP or daily mission generation was performed.
