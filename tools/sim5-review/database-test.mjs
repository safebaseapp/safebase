// Isolated PostgreSQL container only. Never points to a Supabase/project database.
import {spawnSync,spawn} from 'node:child_process';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {repoRoot,toolRoot} from './inspect.mjs';
const container=process.env.SIM5_TEST_CONTAINER||'sim5-pack7-db';
function sql(text,shouldFail=false){const r=spawnSync('docker',['exec','-i',container,'psql','-U','postgres','-v','ON_ERROR_STOP=1','-qAt'],{input:text,encoding:'utf8'});if(shouldFail){assert.notEqual(r.status,0);return r.stderr}if(r.status!==0)throw Error(r.stderr);return r.stdout.trim()}
const checks=[];const check=(n,fn)=>{fn();checks.push(n);console.log('CHECK',n)};
// Disposable dedicated DB, initialized once per run for repeatability.
sql(`drop database if exists sim5_test; create database sim5_test;`);
function db(text,shouldFail=false){return sql('\\connect sim5_test\n'+text,shouldFail)}
// Role definitions emulate the Supabase database boundary, not its live auth service.
sql(`do $$ begin if not exists(select 1 from pg_roles where rolname='anon') then create role anon; end if; if not exists(select 1 from pg_roles where rolname='authenticated') then create role authenticated; end if; if not exists(select 1 from pg_roles where rolname='service_role') then create role service_role bypassrls; end if; end $$;`);
db(`create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema auth to authenticated;grant execute on function auth.uid() to authenticated;`);
db(fs.readFileSync(path.join(repoRoot,'app/supabase/migrations/20260930_sernem_labs_v1.sql'),'utf8'));
check('migration executes on PostgreSQL 17 with existing Labs schema',()=>db(fs.readFileSync(path.join(repoRoot,'app/supabase/migrations/20261020_sim5_runs.sql'),'utf8')));
const a='00000000-0000-4000-8000-000000000001',b='00000000-0000-4000-8000-000000000002',run='10000000-0000-4000-8000-000000000001',run2='10000000-0000-4000-8000-000000000002';
db(`insert into auth.users values('${a}'),('${b}');insert into lab_user_progress(user_id,total_xp,scenario_count,current_streak,longest_streak,last_activity_date) values('${a}',700,3,2,2,current_date-1);insert into sim5_runs(id,user_id,locale) values('${run}','${a}','en'),('${run2}','${b}','tr');`);
const report=(score)=>JSON.stringify({schema:'sim5-mission/1',phase:'finished',score,completed:['hotwork','lifting','leak','access','droppedTool','materials']});
const save=(id,user,score=100)=>`set role service_role; select public.save_sim5_run('${user}','${id}',0,'[{"atMs":0,"event":{"type":"start"}},{"atMs":1,"event":{"type":"finish"}}]'::jsonb,'${report(score)}'::jsonb,'completed',${score});`;
const auth=(user)=>`set role authenticated;set "request.jwt.claim.sub"='${user}';`;
check('RLS reads only owned runs',()=>assert.equal(db(auth(a)+"select count(*) from public.sim5_runs;"),'1'));
check('anonymous cannot read runs',()=>assert.match(db('set role anon;select * from public.sim5_runs;',true),/permission denied/));
check('authenticated cannot insert forged results',()=>assert.match(db(auth(a)+`insert into public.sim5_runs(user_id,locale,score)values('${a}','en',100);`,true),/permission denied/));
check('authenticated cannot update or delete owned results',()=>{assert.match(db(auth(a)+`update public.sim5_runs set score=100;`,true),/permission denied/);assert.match(db(auth(a)+`delete from public.sim5_runs;`,true),/permission denied/)});
check('authenticated cannot invoke award RPC',()=>assert.match(db(auth(a)+save(run,a).replace('set role service_role;',''),true),/permission denied/));
check('RPC binds run ownership',()=>assert.match(db(save(run,b),true),/RUN_NOT_FOUND/));
check('first 80 score credits only 160 XP and preserves old progress',()=>{db(save(run,a,80));assert.equal(db(`select total_xp||','||scenario_count||','||current_streak from lab_user_progress where user_id='${a}';`),'860,4,3')});
check('same run retry is idempotent',()=>{db(save(run,a,80));assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}';`),'860')});
const ids=['20000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000002'];
for(const id of ids)db(`insert into sim5_runs(id,user_id,locale)values('${id}','${a}','en');`);
function concurrent(text){return new Promise((resolve,reject)=>{const p=spawn('docker',['exec','-i',container,'psql','-U','postgres','-d','sim5_test','-v','ON_ERROR_STOP=1','-qAt']);let out='',err='';p.stdout.on('data',d=>out+=d);p.stderr.on('data',d=>err+=d);p.on('close',code=>code?reject(Error(err)):resolve(out));p.stdin.end(text)})}
await Promise.all(ids.map(id=>concurrent(save(id,a,100))));
check('concurrent runs award only best-score improvement once',()=>assert.equal(db(`select total_xp||','||scenario_count||','||current_streak from lab_user_progress where user_id='${a}';`),'900,4,3'));
await Promise.all(Array.from({length:4},()=>concurrent(save(ids[0],a,100))));
check('concurrent duplicate retries cannot double-credit XP',()=>assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}';`),'900'));
check('cross-account history is invisible after award',()=>assert.equal(db(auth(b)+`select count(*) from sim5_runs where user_id='${a}';`),'0'));
const partial='30000000-0000-4000-8000-000000000001';db(`insert into sim5_runs(id,user_id,locale)values('${partial}','${a}','en');`);
check('partial run receives no XP',()=>{db(save(partial,a).replace("'completed',100","'partial',100"));assert.equal(db(`select xp_awarded from sim5_runs where id='${partial}';`),'0')});
check('full run cannot be rewritten after finalization',()=>assert.match(db(save(run,a,100).replace('"atMs":1','"atMs":2'),true),/RUN_CONFLICT/));
check('additive migration preserves other lab attempts',()=>assert.equal(db('select count(*) from lab_attempts;'),'0'));
fs.mkdirSync(path.join(toolRoot,'artifacts/pack7'),{recursive:true});fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/database-results.json'),JSON.stringify({timestamp:new Date().toISOString(),database:'isolated PostgreSQL 17; Supabase role fixtures',liveSupabase:'NOT_RUN',checks},null,2));console.log('PASS',checks.length,'local PostgreSQL checks; LIVE Supabase NOT RUN');
