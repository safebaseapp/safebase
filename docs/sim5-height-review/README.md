# SIM 5.0 Package 5 — review evidence

Base: `codex/sim5-mobile-input-reliability` at `7228c511b8881c369d0cb21915b81a0cc58112fc`.

This package keeps the approved welding and lifting builders and all three GLBs unchanged. It adds ground-following, two-level exploration through the tank model’s actual stairs, scene-bound findings and a visible signaller. No font fallback, deployment or production change is included.

## Geometry and access

The factory has 48 nodes / 45 meshes; the tank asset has 89 nodes / 43 meshes. Source transforms, materials, bounds, hashes and provenance are recorded in [source-geometry.json](source-geometry.json). Three/GLTFLoader’s final fitted scene, rather than a guessed source-coordinate conversion, is recorded in [runtime-geometry.json](runtime-geometry.json).

The factory’s existing fit buries its understructure by 3.4 m. Its combined meshes are not treated as a made-up rectangular building or an invented stair location. The tank model contains `StairA_lambert3_0`, `StairB_lambert3_0` and the final `polySurface494_lambert3_0` connector. Runtime stair bounds are X 62.78–63.80, Z −16.59…−27.18; tread levels reach approximately 0.474, 5.155 and 9.856 m. The connector reaches the tank crown at about 11.21 m. Actual down-rays revealed narrow seams between the two flights and the upper connector; small steel landing plates close them. A low entrance step makes the first high authored tread accessible. The inter-tank bridge has a positive walking deck, longitudinal support beams and guarded edges. Original asset bytes and transforms are preserved.

The player’s feet are constrained to upward-facing support within a 0.32 m step. Camera height follows the feet with smoothing; the floor state is independent of that smoothing. Missing support and large drops block horizontal travel. Imported geometry is considered at all elevations; body checks are relative to the current floor. Bidirectional vertical rays also prevent a rising step from lifting the head through a low floor or pipe. Ground speed is preserved, while elevated travel is slower. The lifting exclusion zone is a solid restricted volume.

The pedestrian route starts on the main road, reaches welding through the open factory approach, inspects lifting from the east side of its barrier, uses the clear side of the obstructed entrance, reaches the leak without walking into pipework, and approaches the tank stairs around the south/east aisle. The barrier is never removed to make the route pass.

## Scene and decisions

Four existing scenario IDs remain. Two upper findings add a loose spanner at a tank-platform toe edge and open fittings storage on the guarded service bridge. Questions are not globally revealed: proximity discovers visible evidence. Inspection uses 3D distance, level and geometry visibility; answering revalidates the current approach. Ground-level XZ proximity cannot complete an upper finding. Repeat inspection cannot award another completion.

The hot-work question describes the actually absent fire watch and nearby combustible drums. The unstaffed station is visible; the extinguisher remains. The lifting question checks plan, rigging, ground/outriggers and designated-signaller communication from outside the barrier. A detailed worker with PPE, fitted vest and radio stands outside the load area, facing the operation. No unconditional harness rule is imposed for a guarded walkway. Task-specific fall protection, tool/material containment and protection of people below are distinguished.

[Asset licenses and adaptations](LICENSES.md).

## Reproduce

From `tools/sim5-review`, install with `npm ci`, then:

```sh
npm run inspect:site
npm run test:height
npm run test:all
npm run test:controls
npm run render:site
npm run test:runtime
npm run test:navigation
```

The browser fixture bundles the actual React component and operation modules, serves the original GLBs and uses real Chromium WebGL/SwiftShader. It bypasses authentication/Supabase only. The normal component’s input, collision and animation loop runs; rendering is requested for captures to make software-GPU tests practical. Screenshot camera overrides are used only for general review angles. Stair proofs use the actual player camera. Desktop routes never assign player coordinates. Scoped mobile stair tests place only XZ at the entrance, then use native touch for all climbing, upper walking and descent; they never assign Y.

Validation results, measured route coordinates and evidence links are recorded below after the final run. Hardware-device FPS and production authentication are outside this isolated fixture’s claims.

Measured factory horizontal-face candidates (world coordinates, **not automatically certified as walkable roofs/floors**):

| Mesh / surface Y | X bounds | Z bounds | Upward area |
| --- | --- | --- | --- |
| Object_8 / 3.370 m | −68.75…−54.63 | −25.39…−10.52 | 16.86 m² |
| Object_9 / 3.430 m | −49.89…−31.08 | −13.52…10.24 | 9.07 m² |
| Object_9 / 5.955 m | −39.45…−35.91 | −18.15…−14.81 | 4.88 m² |
| Object_4 / 7.783 m | −57.35…−30.39 | −19.63…10.79 | 314.22 m² |

Bounds enclose the triangle collection; they do not imply a solid rectangular floor. The package designates the actual tank service stair/platform route for upper-level exploration rather than allowing arbitrary factory roof climbing.


## Final validation

200 assertions passed: [5 head-clearance geometry checks](navigation-results.json), [40 exploration/height checks](height-results.json), [28 welding checks](welding-results.json), [47 color/lifting checks](lifting-color-results.json) and [80 input/mobile-quality checks](mobile-controls-results.json).

- Real desktop keyboard route from the main road to all four existing scenarios, then both stair flights, tank crown, bridge, both upper findings and safe descent. All six EN questions exercise wrong and correct answers. TR coverage combines all four retained ground questions and both upper questions exercised using native mobile touch.
- Native CDP touch in 390×844 portrait/TR and 844×390 landscape/EN: ascend, walk at height, inspect both findings, stop at bridge rail, return down the same stairs, release without stuck movement. The retained input suite also tests 320×568, four camera yaws, all direction aliases, pointer cancel/lost capture, simultaneous walk/look, resize, reset, visibility and mode changes.
- [Supplementary runtime checks](runtime-validation.json): no upper inspection exposed at either exact upper XZ anchor when eye Y=1.8 m; answering after leaving the approach awards no completion; answer buttons fit 390 px and are at least 44 px high; imported tank collision blocks travel; six consecutive GPU-completed WebGL frames report no GL error.
- TypeScript `tsc --noEmit`, targeted ESLint and direct `next build` pass. Build retains the unrelated pre-existing `next.config.ts`/admin content trace warning. The lint runtime-`any` boundary uses the same documented exception as the existing operation builders; unused legacy helpers were removed. No test assertions were disabled.
- Stopping-input tests now measure XZ travel, because camera Y legitimately settles after motion stops. Height ascent, upper support and descent are independently asserted in the 40-check suite. Original ground-scenario counters were updated from 4/4 to 4/6; their correct/incorrect/repeat-scoring assertions remain.

### Measured climb and return

| Input / viewport | Highest recorded eye Y | Eye Y after stair descent |
| --- | --- | --- |
| desktop | 12.913 m | 1.773 m |
| mobile-portrait | 12.913 m | 1.768 m |
| mobile-landscape | 12.913 m | 1.765 m |

The screenshot badge is test-only and reads the actual player camera Y. These are live WebGL frames, not mock-ups or coordinate-only unit tests.

| Sequence | Desktop | Native mobile portrait | Native mobile landscape |
| --- | --- | --- | --- |
| Entrance | [ground](desktop-ground.png) | [ground](mobile-portrait-ground.png) | [ground](mobile-landscape-ground.png) |
| Lower flight | [Y≈2.15](desktop-ascent-17.png) | [lower flight](mobile-portrait-ascent-17.png) | [lower flight](mobile-landscape-ascent-17.png) |
| Middle / second flight | [Y≈6.43](desktop-ascent-21.png) | [middle](mobile-portrait-ascent-21.png) | [middle](mobile-landscape-ascent-21.png) |
| Upper stair landing | [Y≈11.54](desktop-ascent-26.6.png) | [landing](mobile-portrait-ascent-26.6.png) | [landing](mobile-landscape-ascent-26.6.png) |
| Tank platform | [upper finding](desktop-upper-tool.png) | [upper finding](mobile-portrait-upper-tool.png) | [upper finding](mobile-landscape-upper-tool.png) |
| Upper bridge | [walkway](desktop-upper-walkway.png) | [walkway](mobile-portrait-upper-walkway.png) | [walkway](mobile-landscape-upper-walkway.png) |
| Return down | [descent](desktop-descent-20.png) | [descent](mobile-portrait-descent-20.png) | [descent](mobile-landscape-descent-20.png) |
| Back on ground | [Y≈1.77](desktop-descent-15.png) | [Y≈1.77](mobile-portrait-descent-15.png) | [Y≈1.77](mobile-landscape-descent-15.png) |

### Render gallery

- General scene views: [south](site-south.png), [east](site-east.png), [west](site-west.png).
- Close views: [actual stairs](stairs.png), [upper platform](upper-platform.png), [tool/toe edge](tool.png), [fittings storage](materials.png), [welding](welding.png), [crane and signaller](lifting.png), [signaller/PPE](signaller.png).
- Unannotated control/layout views: [desktop](controls-desktop.png), [small portrait](controls-small-portrait.png), [portrait](controls-portrait.png), [landscape](controls-landscape.png).

### Limits and remaining risks

The authentication-free fixture is the actual SIM component, not the entire Supabase-authenticated site. Authenticated development-environment navigation still needs the project’s environment bindings. Physical iOS/Android GPU, thermal and sustained-FPS testing was not performed. The diagnostic software-GPU burst is not a phone FPS benchmark. Mobile preserves desktop models, vertex detail, textures, colors, shadows and antialiasing; DPR remains capped at 1.8 on both. The scene remains relatively heavy (about 2.62M rendered triangles / 926 calls in the recorded overview); hardware profiling is still appropriate.

Movement is a constrained, ground-following kinematic controller, with supported steps and blocked drops; it is not a general rigid-body/jump/fall physics simulator. The designated upper exploration route is the tank service route. Factory horizontal-face candidates are not advertised as accessible roof areas. The legacy models and concept site layout are preserved; this training scene is not a certified real-facility access plan. No merge, main update or production deployment is part of this package.
