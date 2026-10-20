import {startServer} from './server.mjs';import {chromium} from 'playwright';import fs from 'node:fs';import path from 'node:path';import {toolRoot} from './inspect.mjs';import assert from 'node:assert/strict';
process.env.SIM5_NAV_PROBE='1';
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage();await p.goto(url+'/site.html');await p.waitForFunction(()=>window.reviewNavigation,null,{timeout:120000});
 const cases=await p.evaluate(()=>{
  const result=[];for(const dx of [.02,.01,.008,.004,.002,.001,.0002])for(const z of [-26.659,-26.65,-26.64]){
   const nav=window.reviewNavigation,v=window.siteCamera.position.clone();nav.reset();v.set(63.3,1.8,-15);let blocked=false;
   for(let z=-15;z>=-26.65;z-=.02){const next=v.clone();next.z=z;if(!nav.step(next,v)){blocked=true;break;}v.copy(next);}
   v.z=z;for(let x=63.3;x>=61.755;x-=.02){const next=v.clone();next.x=x;if(!nav.step(next,v)){blocked=true;break;}v.copy(next);}
   for(let i=0;i<4000&&!blocked&&v.x>61.4;i++){const next=v.clone();next.x-=dx;if(!nav.step(next,v)){blocked=true;break;}v.copy(next);}
   result.push({dx,z,blocked,x:v.x,feet:nav.feet});
  }return result;
 });
 if(process.env.SIM5_EXPECT_CONNECTOR_BLOCKED==='1'){assert.ok(cases.some(c=>c.blocked));console.log('CONFIRMED baseline connector false collision',cases.filter(c=>c.blocked).length,'of',cases.length);}
 else {for(const c of cases)assert.ok(!c.blocked&&c.x<=61.4,JSON.stringify(c));fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/connector-results.json'),JSON.stringify({cases,geometry:'actual industrial GLBs',fixture:'real navigation exposed only by review bundler'},null,2));console.log('PASS',cases.length,'actual-geometry connector cases, steps 0.2mm–20mm');}
}finally{await browser.close();server.closeAllConnections();server.close()}
