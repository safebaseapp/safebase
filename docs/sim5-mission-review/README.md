# SIM 5.0 Package 6 — mission review

Issue [#98](https://github.com/safebaseapp/safebase/issues/98), based on Package 5 at `cefb5bd7b0ba021929596f60c87ecd02289a9fb2`. Review branch: `codex/sim5-hse-mission-scoring-pack6`; PR base: `codex/sim5-industrial-exploration-height-pack`.

## Behavior

The existing six world-space findings now form one inspection attempt: bilingual briefing → explicit start → approach visible evidence at its accessible level → control decision → technical feedback → explicit finish/report. Discovery requires the anchor to be in the camera view as well as satisfying the existing 3D distance, floor and geometry visibility checks. Answers revalidate the approach. Upper findings cannot be completed from ground level.

Pause, focus loss and hidden tabs stop active time and input; returning requires Resume. Camera reset and overview/walk changes preserve the attempt. Restart and cancellation require a confirmation, pause the attempt, and initially focus the safe Keep option. Restart clears the attempt and restores scene controls. Early finish and cancellation preserve an incomplete report with missed findings and no free correct answers. Completed findings reopen as control-status reviews, without rewards or stale active-hazard questions.

The report records discovered/missed findings, each answer and its active-time timestamp, wrong first decisions, control status, score, attempt-local XP and technical learning recommendations. State is memory-only; leaving/reloading loses it. There are no profile, Labs XP, Supabase or localStorage writes. The versioned `sim5-mission/1` summary is a plain serializable data contract, not a persistence feature. Issue 6D/6E remain deferred.

## Scoring

| Finding | Weight | Rationale within this training scene |
| --- | ---: | --- |
| Hot work | 25 | Ignition sources, nearby combustibles and missing fire watch |
| Lifting | 25 | Suspended load, rigging and exclusion/communication controls |
| Leak | 20 | Uncontrolled release requiring isolation and authorized response |
| Loose upper tool | 15 | Dropped-object exposure from the platform edge |
| Blocked access | 10 | Obstructed designated access requiring authorized clearance |
| Open fittings storage | 5 | Small-part containment on a guarded service walkway |

Weights sum to 100 and are relative training priorities, not a certified quantitative risk assessment. Discovery earns 20% of a finding's weight; correct control earns 80%. A wrong first decision deducts 20% once and remains deducted after correction. Further wrong answers remain in the history but do not stack penalties. A corrected finding therefore earns at most 80% of its weight. Scores are independent of answer order and speed; no speed bonus encourages unsafe rushing. Reopening, repeated discovery and rapid duplicate answers cannot farm points.

All first-correct decisions yield 100/100 and 200 mission XP. All wrong-then-correct decisions yield 80/100 and 160 mission XP. XP = score × 2, never accumulates between attempts, and carries no qualification/certificate claim. Active time uses actual elapsed `performance.now()` deltas, independently of capped animation frame deltas. HUD time is sampled each second; pause/finish settle the exact elapsed time.

## Actual scene outcomes

| Decision | Visible consequence | What remains pending |
| --- | --- | --- |
| Hot work | Arc, halo, light and all sparks stop; status card appears | Permit, gas testing and competent fire watch; no restart authorization |
| Lifting | Amber verification-request card outside the exclusion zone | Plan, rigging, ground/outriggers and communication verification; barrier stays closed, signaller remains present |
| Leak | Amber isolation-request perimeter and status card | Authorized isolation/response; release is not falsely repaired |
| Blocked access | Authorized-clearance request card | Pallets remain; route is not falsely declared clear |
| Loose tool | Tool moves into a closed, latched box away from the edge | Toe containment/control of people below remains requested |
| Open fittings | Tray/fittings move off the bridge into closed storage on the guarded tank platform | This containment action is applied, not blanket approval of all work at height |

Control geometry is allocated once and toggled/moved on state changes. Mission ticks do not reload GLBs or rebuild geometry. Welding has one optional animation-enable argument; its approved geometry, pose, materials and default animation remain unchanged. Lifting, navigation, inspection definitions, three GLBs, fonts and asset licenses are preserved. No new downloaded 3D assets or dependencies were introduced. Existing attribution remains in [Package 5 licenses](../sim5-height-review/LICENSES.md).

## Reproduce and manually review

Install existing lockfiles with `npm ci` in `app` and `tools/sim5-review`. Chromium must be available at `/usr/bin/chromium`. From `tools/sim5-review` run:

```sh
npm run test:mission
npm run serve
```

The suite runs state, lifecycle, height-route, runtime, navigation, welding, lifting and mobile-control checks. Generated files stay under ignored `tools/sim5-review/artifacts`; checked-in evidence below is a selected copy from the final run. The fixture bundles the actual React component and operation modules, serves the original GLBs and runs Chromium WebGL/SwiftShader. It bypasses application authentication/Supabase, not scene logic. Production application files contain no fixture camera/debug hooks.

For manual review open the server's `site.html?lang=en` or `site.html?lang=tr`. Start the inspection, use WASD/arrows or hold the mobile D-pad, and drag to look. Face nearby visible evidence and Inspect. Try an unsafe choice, read its technical reason, then choose the control and observe its outcome. Remain outside lifting barriers; use the southern/eastern approach to the tank service stairs. Walk up, inspect both upper findings, return by the same stairs, then Finish. Review missed/incorrect decisions and requested versus applied controls. Confirm Restart to return to the briefing with fresh controls and zero score. Camera reset is separate and preserves decisions.

## Verification boundaries

Desktop route tests walk from the safe road start to all six findings and descend the real stairs without assigning player coordinates. Scoped mobile stair tests place XZ at the entrance only, then use native CDP touch input for ascent, upper walking and descent; player Y is never assigned. Stair screenshots use the actual player camera. Operation close-ups use a review-only camera clone while the actual component simulation runs. Software-GPU draws are requested on demand for screenshots; the runtime test additionally measures six consecutive GPU-completed frames.

Physical Android/iOS hardware, sustained device FPS/thermal behavior, authenticated Supabase application E2E and production deployment were not tested. SwiftShader timings are diagnostics, not mobile hardware FPS. Navigation remains the existing kinematic walking system. The build retains the inherited `next.config.ts`/admin-content import-trace warning. No merge or deployment is part of this package.

Final check counts, measured coordinates and render links are in [VALIDATION.md](VALIDATION.md).
