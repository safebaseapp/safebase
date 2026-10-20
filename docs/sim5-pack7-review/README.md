# SERNEM SIM 5.0 — Package 7 review

Refs [Issue #102](https://github.com/safebaseapp/safebase/issues/102).
Built on the approved Pack 5 + Pack 6 + Labs integration and movement-start UX,
starting at `9c7bb81462148ab64cbb3a6b5825a185ee05b188` on the recovery branch.
The earlier #99, #100 and #103 review branches/PRs were not merged or changed.

- Public unlimited guest DEMO: two engine-allowlisted findings, no account writes.
- Server-gated six-finding full mission: existing admin/reward/billing truth,
  suspended/expired/unavailable access fails closed.
- Per-user run history and server-replayed results, service-only atomic
  best-score XP (lifetime 200 for this static mission), explicit interrupted-run
  policy and failed-save/retry feedback.
- Two Labs entry actions, TR/EN, six existing-helper GA4 event
  types, SEO additions, loading/error fallback and material-only signaller fix.
- Frame-step-independent tank-connector collision correction, with original
  industrial assets, lifting/welding geometry and mobile controls preserved.

[Architecture, entitlement audit and database rollback](ARCHITECTURE.md) ·
[Validation and explicit release limitations](VALIDATION.md)

## Visual evidence

| Image | What it proves / scope |
| --- | --- |
| [TR mobile DEMO](renders/demo-tr-390x844.png) | Real WebGL scene/component in the isolated browser fixture |
| [TR short DEMO report](renders/demo-report-tr-390x844.png) | Two findings, normalized score, clearly DEMO, no account XP |
| [EN short DEMO report](renders/demo-report-en-844x390.png) | English report at landscape width |
| [TR full gate](renders/next-gate-tr.png), [EN full gate](renders/next-gate-en.png) | Actual Next page without Supabase; two actions, honest difference table, no operable full scene |
| [Full six-finding report](renders/full-six-finding-report.png) | Actual six-finding desktop flow with wrong/correct answers and explicit finish in the browser fixture; local result, no live account save |
| [Upper walkway](renders/full-upper-walkway.png) | Real input/vertical traversal and scene consequences in full-mode fixture; no live Premium account claimed |
| [Stopped arc](renders/welding-stopped.png) | Real rendered welding consequence after a safe control |
| [Signaller](renders/signaller-1.png) | Blue suit, leather PPE and fitted orange/reflective vest; material-only change |
| [WebGL unavailable](renders/unavailable.png) | Accessible failure state; broken scene cannot start |

Source asset licenses and attribution remain unchanged. Screenshots are real
browser captures; no generated imagery or fabricated ratings, leaderboard
numbers or certification claims are used. Full-mode fixture results are local
educational attempts, **not successful live Supabase persistence tests**.
