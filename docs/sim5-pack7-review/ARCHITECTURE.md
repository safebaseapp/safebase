# Package 7 architecture and entitlement audit

Baseline: `codex/sim5-demo-premium-labs-pack7-recovery`,
`9c7bb81462148ab64cbb3a6b5825a185ee05b188`. Includes Pack 5 geometry,
Pack 6 mission reducer and Labs integration (`6601f0d`). Existing checkouts only;
main/production and earlier PRs remain unchanged.

## Experiences

- `/tr|en/labs/sim5/demo`: public, unlimited, two allowlisted findings
  (`hotwork`, `lifting`), normalized DEMO score, no account XP or run writes.
  The scene stays shared; other zones are scenery, not demo challenges.
- `/tr|en/labs/sim5`: server-authorized full six-finding mission or transparent
  gate. Query strings and client-provided Premium flags cannot authorize it.
- `/api/labs/sim5/runs`: private/no-store, rechecks entitlement for every read and
  write, binds run ownership to the authenticated user. Same-origin mutations.

## Existing entitlement sources

`getCurrentAccessProfile`, `isAdminUser`, `hasActiveReward` are reused.
`requirePremiumUser` was audited: its unconditional `profile.plan === premium`
check does not verify expired trial reservations. SIM therefore also uses the
existing `hasCurrentBillingPremium` verifier instead of changing authorization
for unrelated modules. Admin and live reward bypass billing; suspended/missing
profiles fail closed even for admin emails. Billing verification failures and
missing configuration do not grant access. Existing billing verifier requires
server-side writer credentials; these are NOT configured by this task.

## Persistence and XP

Runs start with an idempotent random UUID and are written only by the trusted
server with `createLabsWriter`. Authenticated database roles have owner-only
SELECT; no INSERT/UPDATE/DELETE or award-RPC permission. The service-only RPC
locks the run and verifies revision/log prefix. A per-user transaction lock
serializes awards across concurrent runs. History stores schema, sanitized events,
answers/times, report, score, status, start/end times and awarded XP.

Server replay accepts only legal actions, allowed IDs/answer indices, monotonic
bounded timestamps and evidence positions consistent with inspection level and
radius. It recomputes correct/wrong answers and score; client score, XP, completion
and Premium fields are rejected. Position logs are simulated browser evidence,
not tamper-proof proof of camera movement or real-world competence. A determined
Premium player can script a legal answer sequence; this is an educational tool,
not an examination or certification system.

Global XP is improvement-only for the **same static six-finding mission**:
`max(0, verified score*2 - previous best XP)`, only for all six completed findings.
Lifetime maximum 200; cancelled/partial runs award zero. Replays remain unlimited.
Existing Labs totals increment atomically; other attempt records are unchanged.
The repository already routes existing Labs writes through createLabsWriter.
The migration revokes legacy direct browser writes to lab_user_progress and
lab_attempts, preventing users from bypassing replay by forging totals/attempts.
Authenticated owner reads and service-role writes remain available.
Streak/date and level follow existing Labs semantics. SIM history is separate
from the existing `lab_attempts` table so unrelated triggers cannot double-award.

The browser checkpoints every 10 seconds and on pause/finish/cancel. Failed saves
are visibly reported and can be retried. Reload/tab close retains the last
successful checkpoint, shown as interrupted; **no automatic resume**. Start a new
attempt. Restart archives an ongoing attempt as cancelled. Live processes and
in-memory unsaved events do not survive page reload.

## Database rollout and rollback

`app/supabase/migrations/20261020_sim5_runs.sql` adds transactional SIM storage
and hardens direct-client write permissions on the existing Labs tables. It
preserves their rows and service-role write paths.
Apply to a disposable staging Supabase project first, after the existing Labs
migration. Confirm active/free/suspended/reward/expired sessions and service-role
RPC privileges using that project's actual policies before release.

No migration has been applied to Supabase or production. Local PostgreSQL role
fixtures exercise SQL execution, RLS and concurrency; they do not prove deployed
Supabase schema compatibility, auth, billing or network connectivity.

Rollback: revert application commits; leave the new SIM tables intact to preserve
history. If removal is explicitly approved, export SIM data first, revoke the
RPC, then drop only `save_sim5_run`, `sim5_runs`, `sim5_xp_best`. Do not subtract
already-awarded XP or change other Labs tables/triggers without a separate audit.
