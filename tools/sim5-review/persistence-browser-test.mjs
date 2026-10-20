import {startServer} from './server.mjs';import {chromium} from 'playwright';import {startMission,lookAtInspection,siteInspections} from './mission-test-support.mjs';import {build} from 'esbuild';import {repoRoot,toolRoot} from './inspect.mjs';import path from 'node:path';import fs from 'node:fs';import assert from 'node:assert/strict';
const b=await build({entryPoints:[path.join(repoRoot,'app/lib/sim5/replay.ts')],bundle:true,format:'esm',write:false,tsconfig:path.join(repoRoot,'app/tsconfig.json')});const {verifyMissionLog,isLogExtension}=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].contents).toString('base64'));
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=[],errors=[],saved=[];const check=(n,b)=>{assert.ok(b,n);checks.push(n);console.log('CHECK',n)};
try{
 const p=await browser.newPage({viewport:{width:1280,height:1000}});p.on('pageerror',e=>errors.push(e.message));let runId,revision=0,previous=[],failNext=false;
 await p.route('**/api/labs/sim5/runs',async route=>{
  const body=route.request().postDataJSON();
  if(body.action==='start'){runId=body.runId;return route.fulfill({json:{ok:true,run:{id:runId,revision:0}}})}
  if(failNext){failNext=false;return route.fulfill({status:503,json:{ok:false,error:'FIXTURE_OUTAGE'}})}
  try{assert.equal(body.runId,runId);assert.equal(body.revision,revision);const v=verifyMissionLog(body.events,120000);assert.ok(isLogExtension(previous,v.log));previous=v.log;revision++;saved.push(v);return route.fulfill({json:{ok:true,revision,xpAwarded:v.eligibleXp,status:v.status}})}catch(e){errors.push('replay: '+String(e));return route.fulfill({status:400,json:{ok:false,error:'INVALID_LOG'}})}
 });
 await p.goto(url+'/site.html?persist=fixture');await startMission(p);await p.getByText('Saved on server',{exact:false}).waitFor();
 check('production recorder starts a server run',saved.length>0&&saved[0].state.phase==='active');
 for(const [id,pos]of [['hotwork',[-18,1.8,-2]],['lifting',[-17,1.8,47]]]){
  await p.evaluate(pos=>window.siteCamera.position.fromArray(pos),pos);await lookAtInspection(p,id);await p.getByRole('button',{name:'🔍 Inspect nearby hazard',exact:true}).click();await p.getByRole('button',{name:siteInspections[id].answers[siteInspections[id].correct][1],exact:true}).click();
 }
 await p.getByRole('button',{name:'Pause inspection',exact:true}).click();await p.waitForTimeout(200);await p.getByRole('button',{name:'Retry save',exact:true}).click();await p.waitForTimeout(200);
 check('real UI evidence positions and legal answer log pass server replay',saved.at(-1).summary.completed.length===2&&saved.at(-1).eligibleXp===0);
 await p.getByRole('button',{name:'Resume inspection',exact:true}).click();failNext=true;await p.getByRole('button',{name:'Finish inspection',exact:true}).click();await p.getByText('Account save failed.',{exact:false}).waitFor();check('failed save is visibly reported, local report kept',await p.getByTestId('mission-report').count()===1);
 await p.getByRole('button',{name:'Retry save',exact:true}).click();await p.getByText('Saved on server',{exact:false}).waitFor();check('retry persists partial report without XP',saved.at(-1).status==='partial'&&saved.at(-1).eligibleXp===0);
 check('no browser or replay errors',errors.length===0);
 fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/recorder-results.json'),JSON.stringify({checks,errors,saves:saved.map(v=>({status:v.status,score:v.summary.score,events:v.log.length})),liveSupabase:'NOT_RUN',transport:'intercepted browser fixture; real server replay'},null,2));console.log('PASS',checks.length);
}finally{await browser.close();server.closeAllConnections();server.close()}
