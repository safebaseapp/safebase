import assert from 'node:assert/strict';import {build} from 'esbuild';import {repoRoot} from './inspect.mjs';import path from 'node:path';
// Execute the real server authorization module with isolated dependency fixtures.
// This verifies wiring and fail-closed behavior, not Supabase connectivity.
globalThis.sim5Fixture={};
const stubs={
 'server-only':'',
 '@/lib/auth/server-access':'export async function getCurrentAccessProfile(){if(globalThis.sim5Fixture.fail)throw Error("offline");return globalThis.sim5Fixture.identity}',
 '@/lib/auth/access':'export function isAdminUser(){return globalThis.sim5Fixture.adminEmail===true}',
 '@/lib/auth/reward-access':'export async function hasActiveReward(){return globalThis.sim5Fixture.reward===true}',
 '@/lib/auth/billing-premium':'export async function hasCurrentBillingPremium(){return globalThis.sim5Fixture.billing===true}',
 '@/utils/supabase/server':'export async function createClient(){return {}}'
};
const b=await build({entryPoints:[path.join(repoRoot,'app/lib/sim5/server-access.ts')],bundle:true,format:'esm',write:false,plugins:[{name:'fixtures',setup(b){b.onResolve({filter:/.*/},a=>Object.hasOwn(stubs,a.path)?{path:a.path,namespace:'fixture'}:null);b.onLoad({filter:/.*/,namespace:'fixture'},a=>({contents:stubs[a.path],loader:'js'}))}}]});
const {getSim5Access:get}=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].contents).toString('base64'));
const names=['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'],before=names.map(n=>process.env[n]);
try {
 for(const n of names)delete process.env[n];assert.equal((await get()).reason,'unconfigured');
 for(const n of names)process.env[n]='fixture-only';
 for(const [label,facts,expected]of [
 ['guest',{identity:{user:null,profile:null}},false],
 ['free',{identity:{user:{id:'a'},profile:{status:'active',role:'user',plan:'free'}}},false],
 ['premium',{billing:true,identity:{user:{id:'a'},profile:{status:'active',role:'user',plan:'premium'}}},true],
 ['expired premium plan',{billing:false,identity:{user:{id:'a'},profile:{status:'active',role:'user',plan:'premium'}}},false],
 ['suspended admin',{adminEmail:true,billing:true,reward:true,identity:{user:{id:'a'},profile:{status:'suspended',role:'admin',plan:'premium'}}},false],
 ['admin role',{identity:{user:{id:'a'},profile:{status:'active',role:'admin',plan:'free'}}},true],
 ['admin email',{adminEmail:true,identity:{user:{id:'a'},profile:{status:'active',role:'user',plan:'free'}}},true],
 ['reward',{reward:true,identity:{user:{id:'a'},profile:{status:'active',role:'user',plan:'free'}}},true],
 ['profile missing',{identity:{user:{id:'a'},profile:null}},false],
 ['auth unavailable',{fail:true},false]
 ]){globalThis.sim5Fixture=facts;assert.equal((await get()).allowed,expected,label);console.log('CHECK server',label)}
 console.log('PASS server authorization fixtures; LIVE auth NOT RUN');
}finally{names.forEach((n,i)=>before[i]===undefined?delete process.env[n]:process.env[n]=before[i]);delete globalThis.sim5Fixture;}
