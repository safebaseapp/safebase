# Access and redirects

The PR #105 login-return fix is preserved without rewriting production authorization. Both localized DEMO upgrade links and full-mission gates return guests to `/{locale}/labs/sim5` through login; signed-in Free users go to upgrade with that destination; inactive/suspended accounts go to account-suspended. Active Premium/Admin can play full mode. The server page never renders an operable full scene when access is denied. Unknown subscription/auth/configuration fails closed.

`node tools/sim5-review/redirect-test.mjs`: 20 real-page/dependency-fixture cases pass (TR/EN × DEMO/full × guest/unavailable/free/inactive/premium). Package 7 separately checks expired Premium, Admin, reward, missing profile, unavailable auth, query manipulation and server API gates. These are code/fixture tests. LIVE login sessions and subscription billing are NOT TESTED without staging Supabase.
