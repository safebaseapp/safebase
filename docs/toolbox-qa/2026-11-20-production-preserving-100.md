# SERNEM Toolbox 100 — production-preserving release 20 November 2026

- Parent production commit: `72b5c87a69270626493ad250fb9ce124b0a77172` (72 live records).
- Source of 28 new bilingual topics: PR #159 (`e21a6b38d9185a8a5e1cd3be70e9609468d8fb6c`).
- 72 existing records preserved byte-for-byte at the JSON record level, including manually improved torque and fuel-system hot-work text.
- 28 new records appended, resulting in 100 unique topics / 200 localized TR+EN content records.
- Catalogue category/icon mapping, bilingual PDF templates and QA safeguards are carried from PR #159.
- Existing 70 static PDF masters unchanged; other topics follow the existing sign-in-protected dynamic PDF path.
- Strict wrapping audit applies to the new 28 records; the two previously live, longer-form topics are explicitly excluded from that *new* limit check, retaining the production PDF behavior. Separate visual PDF review of those two remains required.
- Build, web smoke, signed-in Free/Premium download, print output, site-specific HSE reviewer and production verification remain release gates. No automatic deployment authorized before QA.
