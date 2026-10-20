// SIM5 daily XP — disposable PostgreSQL only. NEVER run against live Supabase.
import {spawnSync,spawn} from "node:child_process";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {repoRoot} from "./inspect.mjs";
const container=process.env.SIM5_TEST_CONTAINER||"sim5-pack7-db";
const baseMigration=path.join(repoRoot,"app/supabase/migrations/20261020_sim5_runs.sql");
const dailyMigration=path.join(repoRoot,"app/supabase/migrations/20261020_sim5_daily_inspection_xp.sql");
let n=0;
function sql(query,fail=false){
 const r=spawnSync("docker",["exec","-i",container,"psql","-U","postgres","-v","ON_ERROR_STOP=1","-qAt"],{input:query,encoding:"utf8"});
 if(fail){assert.notEqual(r.status,0,query.slice(0,140));return r.stderr}
 if(r.status!==0)throw Error(r.stderr||r.stdout);
 return r.stdout.trim();
}
function db(q,fail=false){return sql("\\connect sim5_daily_test\n"+q,fail)}
function check(label,test){test();n++;console.log("PASS",n,label);}
sql("drop database if exists sim5_daily_test with (force); create database sim5_daily_test;");
sql("do $$ begin if not exists(select 1 from pg_roles where rolname='anon') then create role anon; end if; if not exists(select 1 from pg_roles where rolname='authenticated') then create role authenticated; end if; if not exists(select 1 from pg_roles where rolname='service_role') then create role service_role bypassrls; end if; end $$;");
db("create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated;grant execute on function auth.uid() to authenticated;");
db(fs.readFileSync(path.join(repoRoot,"app/supabase/migrations/20260930_sernem_labs_v1.sql"),"utf8"));
db("grant select,insert,update,delete on lab_attempts,lab_user_progress to anon,authenticated,service_role;");
db(fs.readFileSync(baseMigration,"utf8"));
const a="00000000-0000-4000-8000-000000001001",b="00000000-0000-4000-8000-000000001002";
const uuid=n=>`10000000-0000-4000-8000-${String(n).padStart(12,"0")}`;
const eventLog='[{"atMs":0,"event":{"type":"start"}},{"atMs":75000,"event":{"type":"finish"}}]';
const report=(score)=>JSON.stringify({schema:"sim5-mission/1",phase:"finished",score,completed:["hotwork","lifting","leak","access","droppedTool","materials"]});
function start(user,id){db(`insert into sim5_runs(id,user_id,locale) values('${id}','${user}','tr');`)}
function saveStmt(user,id,score=100){return `set role service_role;select public.save_sim5_run('${user}','${id}',0,'${eventLog}'::jsonb,'${report(score)}'::jsonb,'completed',${score});`}
function award(user,id,score=100){const output=db(saveStmt(user,id,score));return JSON.parse(output.slice(output.lastIndexOf("\n")+1));}
db(`insert into auth.users(id) values('${a}'),('${b}');insert into lab_user_progress(user_id,total_xp) values('${a}',2700);`);
start(a,uuid(1));start(a,uuid(2));
check("legacy first run credits lifetime 200",()=>{const x=award(a,uuid(1));assert.equal(x.xpAwarded,200);assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}'`),"2900")});
check("legacy same-day replay credits no XP",()=>{assert.equal(award(a,uuid(2)).xpAwarded,0);assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}'`),"2900")});
check("daily migration backfills historical completed days and preserves total 2900",()=>{
 db(fs.readFileSync(dailyMigration,"utf8"));
 assert.equal(db(`select xp_awarded from sim5_daily_rewards where user_id='${a}'`),"0");
 assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}'`),"2900");
});
check("authenticated can read own daily reward but not another user's",()=>{
 assert.equal(db(`set role authenticated;set "request.jwt.claim.sub"='${a}';select count(*) from sim5_daily_rewards;`),"1");
 assert.equal(db(`set role authenticated;set "request.jwt.claim.sub"='${b}';select count(*) from sim5_daily_rewards;`),"0");
});
check("guest and authenticated cannot create forged daily reward",()=>{
 assert.match(db("set role anon;select * from sim5_daily_rewards;",true),/permission denied/);
 assert.match(db(`set role authenticated;set "request.jwt.claim.sub"='${a}';insert into sim5_daily_rewards(user_id,reward_date,run_id,xp_awarded) values('${a}',current_date,'${uuid(1)}',50);`,true),/permission denied/);
});
check("client cannot execute protected server RPC",()=>assert.match(db(`set role authenticated;set "request.jwt.claim.sub"='${a}';select save_sim5_run('${a}','${uuid(1)}',0,'[]'::jsonb,'{}'::jsonb,'completed',100);`,true),/permission denied/));
start(a,uuid(3));
check("existing 200 XP holder cannot get another 50 on migration day",()=>{const x=award(a,uuid(3));assert.equal(x.xpAwarded,0);assert.equal(x.dailyXpAwarded,0);assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}'`),"2900")});
start(b,uuid(4));
check("brand-new user's first perfect awards only 200 and reserves daily slot",()=>{
 const x=award(b,uuid(4));assert.equal(x.xpAwarded,200);assert.equal(x.bestXpAwarded,200);assert.equal(x.dailyXpAwarded,0);
 assert.equal(db(`select xp_awarded from sim5_daily_rewards where user_id='${b}'`),"0");
});
start(b,uuid(5));
check("new user replay on first day gets zero",()=>assert.equal(award(b,uuid(5)).xpAwarded,0));
// Simulate the *next Budapest day* in an isolated database by shifting the
// previously claimed reward date backwards, not by altering the real clock.
db(`update sim5_daily_rewards set reward_date=(now() at time zone 'Europe/Budapest')::date -1 where user_id='${a}';`);
start(a,uuid(6));start(a,uuid(7));
function concurrent(query){return new Promise((resolve,reject)=>{
 const p=spawn("docker",["exec","-i",container,"psql","-U","postgres","-d","sim5_daily_test","-v","ON_ERROR_STOP=1","-qAt"]);
 let out="",err="";p.stdout.on("data",d=>out+=d);p.stderr.on("data",d=>err+=d);
 p.on("close",code=>code?reject(Error(err)):resolve(out.trim()));p.stdin.end(query);
})}
const rewards=await Promise.all([concurrent(saveStmt(a,uuid(6))),concurrent(saveStmt(a,uuid(7)))]);
check("simultaneous next-day perfect completions credit at most one 50",()=>{
 const results=rewards.map(t=>JSON.parse(t.slice(t.lastIndexOf("\n")+1)));
 assert.deepEqual(results.map(x=>x.xpAwarded).sort((x,y)=>x-y),[0,50]);
 assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}'`),"2950");
 assert.equal(db(`select count(*) from sim5_daily_rewards where user_id='${a}' and xp_awarded=50`),"1");
});
check("same-run retries are idempotent",()=>{
 const x=award(a,uuid(6));const y=award(a,uuid(7));
 assert.deepEqual([x.xpAwarded,y.xpAwarded].sort((p,q)=>p-q),[0,50]);
 assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}'`),"2950");
});
start(a,uuid(8));
check("third perfect run same day still earns zero",()=>{assert.equal(award(a,uuid(8)).xpAwarded,0);assert.equal(db(`select total_xp from lab_user_progress where user_id='${a}'`),"2950")});
check("distinct foreign accounts have independent reward date",()=>{
 assert.equal(db(`select count(*) from sim5_daily_rewards where user_id='${b}'`),"1");
 assert.equal(db(`select best_xp from sim5_xp_best where user_id='${a}'`),"200");
});
check("Budapest date changes correctly around summer and winter DST",()=>{
 const s=db("select (timestamp with time zone '2026-10-25 22:59:59+00' at time zone 'Europe/Budapest')::date || ',' || (timestamp with time zone '2026-10-25 23:00:01+00' at time zone 'Europe/Budapest')::date;");
 assert.equal(s,"2026-10-25,2026-10-26");
 const t=db("select (timestamp with time zone '2026-07-20 21:59:59+00' at time zone 'Europe/Budapest')::date || ',' || (timestamp with time zone '2026-07-20 22:00:01+00' at time zone 'Europe/Budapest')::date;");
 assert.equal(t,"2026-07-20,2026-07-21");
});
console.log("PASS",n,"daily reward PostgreSQL tests, no live Supabase writes");
