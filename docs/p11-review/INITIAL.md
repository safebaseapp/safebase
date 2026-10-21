# Read-only baseline — Issue #114

Verified base: e25c7c11eb6902f4ecefe096fee4a8e1b959bc11 (main read/fetch only).
PR #109 white-tank release, #110 Budapest daily XP and #113 community strip are ancestors. Existing P9 branch was not used as a stale base. New branch: codex/sernem-conversion-mobile-pdf-qa-p11.

| Area | Initial status | Hypothesis / reproduction |
|---|---|---|
| Toolbox PDFs | not reproduced | Existing qa:toolbox-pdfs passes 140 localized standard and 140 four-page branded files |
| Existing download source QA | not reproduced | qa:download-flows passes; source-token check is not behavioral authorization proof |
| Expired trial Premium gates | hypothesis | Set profile.plan=premium but verified trial expired; request requirePremiumUser, Word/poster and sign premium access |
| Upgrade conversion after trial | hypothesis | Expired profile premium label redirects dashboard rather than allowing upgrade |
| Webhook pending grants | hypothesis | Signed order/unsupported/unpaid event for unmatched identity may create active pending entitlement |
| Webhook stale/foreign subscription | hypothesis | Signed old expired subscription can overwrite profile bound to a newer subscription; only trial calls provider reconciliation |
| Registration confirmation | hypothesis | emailRedirectTo points directly at destination, no code-exchange callback route found |
| Login next for API download | hypothesis | API redirects login with /api/... next, but login only accepts /tr/ or /en/ and discards it |
| Auth network failures | hypothesis | Rejected signIn/signUp/reset promise leaves loading active without feedback |
| Live users/payments/mail/GA4 | not testable | Forbidden production interactions; only local fixtures allowed; no real credentials loaded |
| Responsive/PDF representative output | pending | Real Chromium with isolated local auth/service fixtures and no external payment/mail traffic |

No production, main, DB, billing settings or customer data changes. All fixture identities and provider responses are synthetic. Findings become confirmed only after executable reproduction below; not reproduced/not testable remain separate.
