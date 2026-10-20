import {startServer} from './server.mjs';
import {chromium} from 'playwright';
import {startMission,lookAtInspection,siteInspections} from './mission-test-support.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const {server,url}=await startServer(0);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=[],errors=[],writes=[];
const check=(n,b)=>{assert.ok(b,n);checks.push(n);console.log('CHECK',n)};
fs.mkdirSync(new URL('./artifacts/pack7/',import.meta.url),{recursive:true});
try {
for(const layout of [{width:1280,height:1000},{width:320,height:568},{width:390,height:844},{width:844,height:390}])for(const lang of ['tr','en']){
 const mobile=layout.width<1000,tr=lang==='tr',tag=`${lang}-${layout.width}x${layout.height}`;
 const ctx=await browser.newContext({viewport:layout,isMobile:mobile,hasTouch:mobile});const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.method()!=='GET')writes.push(r.url())});
 await p.goto(url+'/site.html?mode=demo&lang='+lang+'&premium=true');await startMission(p,lang);
 if(mobile){await p.locator('.sim5-stage').scrollIntoViewIfNeeded();const cdp=await ctx.newCDPSession(p);const b=await p.getByTestId('sim5-touch-d').boundingBox();const before=await p.evaluate(()=>window.siteCamera.position.x);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width/2,y:b.y+b.height/2,id:1}]});await p.waitForTimeout(250);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});check(tag+' native touch moves',await p.evaluate(()=>window.siteCamera.position.x)>before+.2);}
 else {const before=await p.evaluate(()=>window.siteCamera.position.z);await p.keyboard.down('w');await p.waitForTimeout(200);await p.keyboard.up('w');check(tag+' keyboard moves',await p.evaluate(()=>window.siteCamera.position.z)<before-.2);}
 for(const id of ['leak','access','droppedTool','materials']){const h=siteInspections[id];await p.evaluate(v=>window.siteCamera.position.fromArray(v),[h.location[0]+3,h.location[1]+.4,h.location[2]+3]);await lookAtInspection(p,id);await p.waitForTimeout(60);check(tag+' rejects '+id,await p.locator('.sim5-touch-inspect').count()===0&&await p.getByRole('button',{name:/🔍/}).count()===0);}
 await p.getByRole('button',{name:tr?'Kamerayı sıfırla':'Reset camera',exact:true}).click();
 for(const [id,pos] of [['hotwork',[-18,1.8,-2]],['lifting',[-17,1.8,47]]]){
  await p.evaluate(v=>window.siteCamera.position.fromArray(v),pos);await lookAtInspection(p,id);
  const inspect=mobile?p.locator('.sim5-touch-inspect'):p.getByRole('button',{name:'🔍 Inspect nearby hazard',exact:true});
  // Desktop TR uses its localized label.
  const button=!mobile&&tr?p.getByRole('button',{name:'🔍 Yakındaki tehlikeyi incele',exact:true}):inspect;
  if(mobile)await button.tap();else await button.click();
  const a=p.getByRole('button',{name:siteInspections[id].answers[siteInspections[id].correct][tr?0:1],exact:true});if(mobile)await a.tap();else await a.click();
 }
 await p.getByTestId('mission-report').waitFor();const report=await p.getByTestId('mission-report').innerText();check(tag+' normalized two-finding report',report.includes('100/100')&&report.includes('2/2')&&report.includes('DEMO'));
 check(tag+' no premium findings in report',!report.includes('6/6'));
 check(tag+' no horizontal overflow',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await p.locator('.sim5-stage').scrollIntoViewIfNeeded();await p.screenshot({path:new URL('./artifacts/pack7/demo-'+tag+'.png',import.meta.url).pathname});
 const restart=p.getByRole('button',{name:tr?'Görevi yeniden başlat':'Restart mission',exact:true});await restart.click();await p.getByRole('button',{name:tr?'Onayla':'Confirm',exact:true}).click();check(tag+' replay returns to briefing',await p.getByTestId('sim5-start-overlay').count()===1);
 check(tag+' no guest state persistence',await p.evaluate(()=>localStorage.length===0));await ctx.close();
}
check('no browser exceptions',errors.length===0);check('no demo writes',writes.length===0);
fs.writeFileSync(new URL('./artifacts/pack7/demo-results.json',import.meta.url),JSON.stringify({timestamp:new Date().toISOString(),checks,errors,writes},null,2));
console.log('PASS',checks.length);
}finally{await browser.close();server.closeAllConnections();server.close();}
