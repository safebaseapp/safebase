// P11 follow-up only: verified paid profile versus historical trial reservation.
// Does not repeat trial setup, auth lifecycle, checkout or provider integration.
import assert from 'node:assert/strict';
import {moduleFor} from './compile.mjs';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://fixture.invalid';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'synthetic-followup';
globalThis.paidFollowup = {};
const {hasCurrentBillingPremium} = await moduleFor('app/lib/auth/billing-premium.ts', {
  'server-only':'',
  '@supabase/supabase-js': `export function createClient(){return {from(table){return {select(){return this},eq(){return this},maybeSingle:async()=>({data:table==='profiles'?globalThis.paidFollowup.profile:globalThis.paidFollowup.trial,error:table===globalThis.paidFollowup.errorTable?{code:'synthetic-unavailable'}:null})}}}}`,
});
const staleTrial = {status:'expired',trial_ends_at:'2020-01-01',lemon_subscription_id:'old-trial-sub'};
const activePaid = {subscription_status:'active',lemon_subscription_id:'verified-new-paid-sub'};
const cases = [
  ['new paid binding is not vetoed by expired prior trial', activePaid, staleTrial, 'premium', true],
  ['renewed same binding is not vetoed by stale cancelled trial', activePaid, {...staleTrial,status:'cancelled',lemon_subscription_id:activePaid.lemon_subscription_id,access_ends_at:'2020-01-01'}, 'premium', true],
  ['paid cancellation retains only verified future access', {...activePaid,subscription_status:'cancelled',subscription_ends_at:'2099-01-01'}, staleTrial, 'premium', true],
  ['expired paid cancellation cannot use stale Premium label', {...activePaid,subscription_status:'cancelled',subscription_ends_at:'2020-01-01'}, staleTrial, 'premium', false],
  ['unbound active status is insufficient to override prior trial', {subscription_status:'active'}, staleTrial, 'premium', false],
  ['Free plan is insufficient to claim a paid binding', activePaid, staleTrial, 'free', false],
  ['unpaid binding cannot override prior trial', {...activePaid,subscription_status:'unpaid'}, staleTrial, 'premium', false],
];
let failures = 0;
for (const [name,profile,trial,plan,expected] of cases) {
  globalThis.paidFollowup={profile,trial};
  const actual = await hasCurrentBillingPremium(null,'synthetic-user',plan);
  console.log(actual===expected?'PASS':'FAIL',name);
  if(actual!==expected)failures++;
}
globalThis.paidFollowup={profile:activePaid,trial:staleTrial,errorTable:'profiles'};
assert.equal(await hasCurrentBillingPremium(null,'synthetic-user','premium'),false);
console.log('PASS profile verification failure remains closed');
assert.equal(failures,0,'P11 paid access follow-up regressions');
