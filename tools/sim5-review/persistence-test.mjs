import assert from 'node:assert/strict';import {build} from 'esbuild';import {repoRoot,toolRoot} from './inspect.mjs';import path from 'node:path';import fs from 'node:fs';
const b=await build({entryPoints:[path.join(repoRoot,'app/lib/sim5/replay.ts')],bundle:true,format:'esm',write:false,tsconfig:path.join(repoRoot,'app/tsconfig.json')});const {verifyMissionLog:verify,isLogExtension}=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].contents).toString('base64'));
const d=await build({entryPoints:[path.join(repoRoot,'app/app/[locale]/labs/sim5/SiteInspections.ts')],format:'esm',write:false});const {siteInspections:h}=await import('data:text/javascript;base64,'+Buffer.from(d.outputFiles[0].contents).toString('base64'));
const checks=[];function check(n,fn){fn();checks.push(n);console.log('CHECK',n)}
let log=[{atMs:0,event:{type:'start'}}],t=100;
for(const [id,hazard]of Object.entries(h)){log.push({atMs:t++,event:{type:'discover',id,position:[hazard.location[0]+.2,hazard.level===1?12.91:1.8,hazard.location[2]+.2]}});log.push({atMs:t++,event:{type:'answer',id,answer:hazard.correct}})}
log.push({atMs:1000,event:{type:'finish'}});
const result=verify(log,1000);
check('server recomputes complete six-finding report and 200 maximum XP',()=>{assert.equal(result.summary.score,100);assert.equal(result.eligibleXp,200);assert.equal(result.status,'completed');assert.equal(result.summary.completed.length,6)});
check('sanitized log roundtrips and extends checkpoints',()=>{assert.deepEqual(verify(result.log,1000).summary,result.summary);assert.ok(isLogExtension(log.slice(0,3),result.log));assert.ok(!isLogExtension(log.slice(0,3),log.slice(1)))});
for(const [label,bad]of [
 ['self asserted XP',log.map((e,i)=>i?e:{...e,event:{...e.event,xp:200}})],
 ['self asserted completion',[{atMs:0,event:{type:'start'}},{atMs:1,event:{type:'complete',id:'hotwork'}}]],
 ['answer before discovery',[log[0],{atMs:1,event:{type:'answer',id:'hotwork',answer:1}}]],
 ['unknown finding',[log[0],{atMs:1,event:{type:'discover',id:'__proto__',position:[0,0,0]}}]],
 ['remote discovery',[log[0],{atMs:1,event:{type:'discover',id:'hotwork',position:[0,1.8,90]}}]],
 ['reversed time',log.map((e,i)=>i===4?{...e,atMs:0}:e)],
 ['future time',log.map((e,i)=>i===log.length-1?{...e,atMs:999999}:e)],
 ['invalid answer',log.map((e,i)=>i===2?{...e,event:{...e.event,answer:999}}:e)],
 ['resume after final',[...log,{atMs:1100,event:{type:'resume'}}]],
 ['duplicate answer',[...log.slice(0,3),{atMs:102,event:{...log[2].event}}]],
 ['run restart',[log[0],{atMs:1,event:{type:'restart'}}]],
 ['empty log',[]],['oversized log',Array(4097).fill(log[0])]
])check('rejects '+label,()=>assert.throws(()=>verify(bad,1000)));
check('JSONB key reordering preserves prefix identity',()=>{const previous=JSON.parse(JSON.stringify(log.slice(0,3)),(k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).reverse()):v);assert.ok(isLogExtension(previous,result.log))});
check('early finish and cancel never award permanent XP',()=>{for(const type of ['finish','cancel']){const v=verify([log[0],{atMs:500,event:{type}}],500);assert.equal(v.eligibleXp,0);assert.equal(v.summary.completed.length,0)}});
check('pause/resume excludes inactive time',()=>{const v=verify([log[0],{atMs:100,event:{type:'pause'}},{atMs:1000,event:{type:'resume'}},{atMs:1100,event:{type:'finish'}}],1100);assert.equal(v.summary.activeMs,200)});
fs.mkdirSync(path.join(toolRoot,'artifacts/pack7'),{recursive:true});fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/persistence-results.json'),JSON.stringify({checks,liveSupabase:'NOT_RUN'},null,2));
fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/full-log.json'),JSON.stringify(log));
console.log('PASS',checks.length,'server log checks; LIVE DB NOT RUN');
