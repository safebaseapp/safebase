# SERNEM — 24-hour Premium trial (implementation contract)

Status: implementation branch; NOT LIVE. The existing paid checkout and subscriptions remain unchanged until end-to-end test passes.

## Confirmed existing application
- Next.js app is in `app/`.
- Existing Lemon Squeezy webhook: `app/app/api/webhooks/lemonsqueezy/route.ts`.
- Existing subscription management API helper: `app/lib/lemonsqueezy.ts`.
- Existing webhook associates subscription with `profiles.id` using `meta.custom_data.user_id` and currently permits an email fallback for legacy orders.

## Required flow
1. Anonymous visitor clicks the trial CTA -> route to existing SERNEM registration. Preserve safe post-auth return path.
2. Verified Supabase login is required before generating checkout server-side. Existing free users proceed directly.
3. Server checks profile and trial entitlement; reject existing premium users, previous trials, concurrent pending checkouts and invalid identities. Recheck transactionally to guard races. No client-authored user_id.
4. Open Lemon Squeezy-hosted checkout for a distinct **monthly €10 trial-enabled variant** with 1-day free trial and payment method required. Pass server-resolved user_id and an opaque attempt ID through checkout custom_data.
5. Show prominent informed consent: €0 today, first €10 at exact trial end, €10 monthly thereafter, cancel-before-charge deadline, legally applicable refund/withdrawal rules; use an unchecked explicit acceptance control and keep auditable consent record.
6. Grant premium for verified Lemon Squeezy `on_trial` status; mark trial usage based on the provider-confirmed subscription; do not start timer on account creation or merely on checkout opening.
7. Grant paid premium for verified `active` status. Protect against replay, out-of-order and duplicate webhooks; retrieve provider subscription when needed and use idempotency.
8. Cancellation through account billing/customer portal must stop first charge when provider confirms cancellation before the trial cutoff. State accurately whether access lasts until trial end. Validate this in Lemon Squeezy test mode.
9. Following lapse, fall back to free without deleting the account. Existing paid customers should not be put into a new trial.
10. Track the trial funnel: CTA, register, checkout, verified on_trial, cancelled, trial->paid, payment failure. Avoid transmitting card data into SERNEM.

## Existing webhook audit finding
`nextPlan` is currently computed from any `subscription_*` event other than explicit expiry. Status must be checked before plan changes: don't grant premium based solely on event name; account for valid on_trial, active, cancelled-with-access-until, expired, unpaid and past_due states without revoking current legitimate subscriptions inadvertently. Review and regression-test the present production data model before changing this path.

## Test plan — blockers before production
- New visitor -> sign up -> authenticated trial checkout.
- Already signed-in free user -> checkout.
- Anonymous direct checkout request -> unauthorized, no checkout generated.
- Existing premium user -> billing management, not trial.
- Previous trial / retry / two simultaneous tabs -> no second trial entitlement.
- Checkout abandoned -> free account remains free, no trial consumed.
- Webhook signature invalid -> rejected; unknown user -> never premium.
- Verified on_trial -> time-boxed premium; expiry -> free.
- Trial cancelled immediately, one hour before end, last minutes before end -> NO first charge (provider test / support confirmation).
- Trial not cancelled -> monthly €10 payment and active status.
- Failed renewal and charge disputes: policy and entitlement behaviour verified.
- Duplicate/out-of-order webhook delivery; failed database write retried.
- TR/EN locale, legal copy, exact billing timestamp in user timezone; mobile + desktop.
- No production variant or real card used before test-mode pass.
