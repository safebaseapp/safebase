# Paket 12 — başlangıç envanteri

Base/rollback `e25c7c11eb6902f4ecefe096fee4a8e1b959bc11` (current remote main, read/fetch only). Branch `codex/sernem-ai-visibility-authority-pack12` created directly from `origin/main`. P11 remains separate Draft #115; no cherry-pick/merge/rebase. No dependency additions.

| Area | Initial finding | Decision |
|---|---|---|
| robots wildcard/OAI shared rules | VERIFIED IMPLEMENTED | Reuse; do not create bot-specific overrides or GPTBot grant |
| Exact private paths without trailing slash, auth/register | DEFECTIVE | 45 private-path failures in baseline semantic bot checks; tighten only crawler exclusion |
| Localized sitemap/hreflang, no fake lastmod | VERIFIED IMPLEMENTED | Keep all existing entries and genuine-public SIM landing/demo |
| Public poster details | MISSING | 15 existing routes absent from sitemap (2 representative failing checks); add 30 localized entries and public metadata |
| Canonical language defaults | DEFECTIVE on risk library/calculator | Local public-HTML check found missing x-default on these two routes; add it only there |
| Organization / WebSite / TechArticle / BreadcrumbList | VERIFIED IMPLEMENTED on generated guides; DEFECTIVE on 14 dedicated core routes | Preserve identity; shared template fixes missing core article schema and adds visible-source citations |
| Public risk calculator schema | MISSING | Truthful WebApplication description; preserve existing activity event and calculator behavior |
| Answer components and llms.txt | VERIFIED IMPLEMENTED | Reuse; add only public reference paths and scope notes |
| HSE content | DEFECTIVE / LIMITED AUDIT | Generic OSHA badge ambiguous; excavation setback overgeneralized; add jurisdiction and practical scope, no new claimed standard editions |
| Bing verification / IndexNow | NOT TESTABLE / MISSING | No ownership/account evidence. Opt-in offline-first utility only; no key publication or submission |
| Live robots/sitemap, official references, searches | BLOCKED | Network CONNECT proxy 403; not an application 403 or indexing absence |
| FAQPage rich result | NOT RECOMMENDED | Existing visible answer components are enough; no eligibility or ranking promise |
| Wikipedia promotion / mass URLs | NOT RECOMMENDED | No independent notability proof; no fake pages or promotional entries |
