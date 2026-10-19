import {startMission,lookAtInspection,resumeMission} from './mission-test-support.mjs';
import {repoRoot} from './inspect.mjs';
import {startServer} from './server.mjs';
import {chromium} from 'playwright';
import {build} from 'esbuild';
import fs from 'node:fs';
import assert from 'node:assert/strict';
process.chdir(repoRoot);
const out=process.env.SIM5_REVIEW_OUT||'docs/sim5-height-review';fs.mkdirSync(out,{recursive:true});
const checks=[],routes=[],errors=[];const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('CHECK',name)};
const compiled=await build({absWorkingDir:repoRoot,entryPoints:['app/app/[locale]/labs/sim5/SiteInspections.ts'],format:'esm',write:false});
const {siteInspections,canInspectAt}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].contents).toString('base64'));
for(const h of Object.values(siteInspections)){
 check(`${h.id}: complete TR/EN scene evidence and control data`,h.questionTR&&h.questionEN&&h.explanationTR&&h.explanationEN&&h.visibleEvidence.every(Boolean)&&h.requiredControls.length&&h.answers.every(a=>a.every(Boolean))&&h.correctAnswer===h.correct);
 if(h.level)check(`${h.id}: same XZ on ground cannot inspect upper finding`,!canInspectAt(h,{x:h.location[0],y:1.8,z:h.location[2]}));
}
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
async function exercise({mobile=false,width=1280,height=950,lang='en',name='desktop'}){
 const context=await browser.newContext({viewport:{width,height},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:mobile?2:1});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(url+'/site.html?lang='+lang);await page.waitForFunction(()=>window.siteScene?.getObjectByName('sim5-signaller'),null,{timeout:120000});await startMission(page,lang);await page.getByRole('button',{name:lang==='tr'?'Sahada yürü':'Walk site',exact:true}).click();
 const cdp=mobile?await context.newCDPSession(page):null;
 const pos=()=>page.evaluate(()=>window.siteCamera.position.toArray());
 const touch=(type,points=[])=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
 const point=(x,y,id=1)=>({x,y,id,radiusX:4,radiusY:4,force:1});
 async function stage(){await page.locator('.sim5-stage').scrollIntoViewIfNeeded()}
 async function drag(dx,dy=0){await stage();const b=await page.locator('canvas').boundingBox();const x=b.x+b.width/2,y=b.y+Math.min(105,b.height*.3);if(mobile){await touch('touchStart',[point(x,y,2)]);await touch('touchMove',[point(x+dx,y+dy,2)]);await touch('touchEnd');}else{await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+dx,y+dy,{steps:2});await page.mouse.up();}await page.waitForTimeout(40)}
 async function aim(x,z){for(let i=0;i<12;i++){const d=await page.evaluate(()=>{const v=window.siteCamera.getWorldDirection(window.siteCamera.position.clone());return {x:v.x,z:v.z,p:window.siteCamera.position.toArray()}});let delta=Math.atan2(x-d.p[0],z-d.p[2])-Math.atan2(d.x,d.z);delta=Math.atan2(Math.sin(delta),Math.cos(delta));if(Math.abs(delta)<.003)return;await drag(Math.max(-width*.35,Math.min(width*.35,-delta/.004)));}throw Error('Could not aim')}
 async function face(id){const point=siteInspections[id].location;for(let i=0;i<14;i++){const d=await page.evaluate(point=>{const c=window.siteCamera,v=c.getWorldDirection(c.position.clone()),dx=point[0]-c.position.x,dy=point[1]-c.position.y,dz=point[2]-c.position.z;let yaw=Math.atan2(dx,dz)-Math.atan2(v.x,v.z);return{yaw:Math.atan2(Math.sin(yaw),Math.cos(yaw)),pitch:Math.max(-1.15,Math.min(1.15,Math.atan2(dy,Math.hypot(dx,dz))))-Math.asin(v.y)}},point);if(Math.abs(d.yaw)<.003&&Math.abs(d.pitch)<.003){await page.waitForTimeout(80);return;}const b=await page.locator('canvas').boundingBox();await drag(Math.max(-b.width*.35,Math.min(b.width*.35,-d.yaw/.004)),Math.max(-b.height*.27,Math.min(b.height*.27,-d.pitch/.003)));}throw Error('Could not face '+id);}
 async function hold(){if(mobile){await stage();const b=await page.locator('[data-testid="sim5-touch-w"]').boundingBox();await touch('touchStart',[point(b.x+b.width/2,b.y+b.height/2)]);}else await page.keyboard.down('w')}
 async function release(){if(mobile)await touch('touchEnd');else await page.keyboard.up('w')}
 async function walk(x,z,label){await aim(x,z);await hold();let best=Infinity,stuck=0;for(let i=0;i<900;i++){await page.waitForTimeout(20);const p=await pos(),d=Math.hypot(x-p[0],z-p[2]);if(d<.3){await release();await page.waitForTimeout(120);const position=await pos();routes.push({device:name,label,position,time:Date.now()});console.log(name,label,position);return position;}if(d>best+.25){await release();await aim(x,z);await hold();best=d;stuck=0;continue;}if(d<best-.01){best=d;stuck=0}else stuck++;if(stuck>65){await release();throw Error(`${name}: ${label} stuck ${p} target ${x},${z}`)}}await release();throw Error('timeout '+label)}
 async function shot(label){await page.evaluate(label=>{let badge=document.getElementById('review-height');if(!badge){badge=document.createElement('div');badge.id='review-height';Object.assign(badge.style,{position:'fixed',top:'4px',left:'4px',zIndex:9999,background:'#102b36',color:'#fff',padding:'6px',font:'13px monospace',pointerEvents:'none'});document.body.appendChild(badge)}badge.textContent=label+' | actual WebGL eye Y='+window.siteCamera.position.y.toFixed(3)+'m';window.reviewFrameRequested=true;},label);await page.waitForTimeout(200);await page.screenshot({path:`${out}/${name}-${label}.png`,fullPage:false})}
 async function resultShot(label){const frame=await page.evaluate(()=>window.reviewFrameCount||0);await page.evaluate(()=>{window.reviewCamera={position:[59,18,-17],target:[49,11.2,-26.5]};window.reviewFrameRequested=true});await page.waitForFunction(n=>window.reviewFrameCount>n,frame);await page.locator('canvas').screenshot({path:`${out}/${name}-${label}.png`});await page.evaluate(()=>window.reviewCamera=null);}
 async function answer(id){await face(id);const h=siteInspections[id],inspect=mobile?page.locator('.sim5-touch-inspect'):page.getByRole('button',{name:lang==='tr'?'🔍 Yakındaki tehlikeyi incele':'🔍 Inspect nearby hazard',exact:true});await inspect.waitFor({timeout:10000});if(mobile)await inspect.tap();else await inspect.click();await page.getByRole('heading',{name:h.question[lang==='tr'?0:1],exact:true}).waitFor();const wrong=page.getByRole('button',{name:h.answers[1-h.correct][lang==='tr'?0:1],exact:true});if(mobile)await wrong.tap();else await wrong.click();await page.getByText(lang==='tr'?'Güvensiz seçim.':'Unsafe choice.',{exact:false}).waitFor();if(id==='materials'||id==='droppedTool')await resultShot(id+'-before-control');const correct=page.getByRole('button',{name:h.answers[h.correct][lang==='tr'?0:1],exact:true});if(mobile)await correct.tap();else await correct.click();await page.getByText(lang==='tr'?'Doğru.':'Correct.',{exact:false}).waitFor();check(`${name}: ${id} rejects wrong control and records correct decision`,true);if(id==='materials'||id==='droppedTool'){await resultShot(id+'-after-control');check(`${name}: ${id} has an actual closed-container scene result`,await page.evaluate(id=>window.siteScene.getObjectByName(id==='materials'?'closed-fittings-lid':'secured-tool-lid').visible,id));}await stage()}
 if(!mobile){
  for(const [x,z,label] of [[0,0,'main-road'],[-14,0,'factory-gate'],[-18,-2,'welding-approach']])await walk(x,z,label);await answer('hotwork');
  for(const [x,z,label] of [[-17,20,'factory-exit'],[-17,47,'lifting-outside']])await walk(x,z,label);await answer('lifting');
  await aim(-23,47);await hold();await page.waitForTimeout(1400);await release();check('desktop: lifting exclusion volume prevents entry',(await pos())[0]>-18.59);await walk(-17,47,'lifting-return');
  for(const [x,z,label] of [[-14,47,'west-gate'],[0,47,'road-crossing'],[0,-6,'tank-gate'],[17,-9,'access-side-approach']])await walk(x,z,label);await answer('access');
  for(const [x,z,label] of [[25,-9,'access-bypass'],[24,-16,'leak-safe-approach']])await walk(x,z,label);await answer('leak');
  for(const [x,z,label] of [[25,14,'tank-south'],[65,14,'east-aisle'],[65,-15,'stair-approach'],[63.3,-15,'stair-bottom']])await walk(x,z,label);
 }else{
  // Scoped mobile stair test: fixture places only XZ at the stair entrance.
  // Y is never assigned after entering walk mode; ascent/descent use native touch.
  await page.evaluate(()=>{window.siteCamera.position.x=63.3;window.siteCamera.position.z=-15});await stage();
 }
 const ascent=[];await shot('ground');for(const z of [-17,-19,-21,-22,-24,-26,-26.6]){ascent.push(await walk(63.3,z,'ascent-'+Math.abs(z)));if([-17,-21,-26.6].includes(z))await shot('ascent-'+Math.abs(z));}
 check(`${name}: real input raises eye Y by over 9 metres`,ascent.at(-1)[1]-ascent[0][1]>9);
 for(const [x,z,label] of [[63.3,-26.65,'top-landing'],[62.5,-26.65,'connector'],[61.5,-26.65,'upper-access'],[60,-26.65,'tank-platform'],[60,-25.6,'valve-bypass'],[58,-25.3,'dropped-tool-approach']])await walk(x,z,label);await answer('droppedTool');await shot('upper-tool');
 for(const [x,z,label] of [[55.8,-25.6,'inner-platform'],[55.8,-26.65,'bridge-entry'],[55,-26.65,'upper-walkway'],[52,-26.6,'materials-approach']])await walk(x,z,label);await answer('materials');await shot('upper-walkway');
 check(`${name}: upper walking surface keeps eye above 12.8m`,(await pos())[1]>12.8);
 await aim(52,-30);await hold();await page.waitForTimeout(1000);await release();const rail=await pos();check(`${name}: bridge rail blocks travel and retains upper level`,rail[2]>-26.87&&rail[1]>12.8);
 await walk(52,-26.6,'rail-return');
 for(const [x,z,label] of [[55,-26.65,'return-bridge'],[55.8,-26.65,'return-platform'],[55.8,-25.6,'return-inner'],[60,-25.6,'return-valve-bypass'],[60,-26.65,'return-access'],[61.5,-26.65,'down-connector'],[62.5,-26.65,'down-seam'],[63.3,-26.65,'down-landing']])await walk(x,z,label);
 const descent=[];for(const z of [-26,-24,-22,-20,-18,-16,-15]){descent.push(await walk(63.3,z,'descent-'+Math.abs(z)));if([-24,-20,-15].includes(z))await shot('descent-'+Math.abs(z));}
 check(`${name}: returns to ground by the same stairs`,descent.at(-1)[1]<2&&descent[0][1]-descent.at(-1)[1]>8);
 const stop=await pos();await page.waitForTimeout(400);check(`${name}: release leaves no horizontal stuck movement`,Math.hypot((await pos())[0]-stop[0],(await pos())[2]-stop[2])<1e-6);
 if(!mobile){
  check('desktop: all six scene decisions complete before explicit finish',(await page.getByTestId('sim5-hse-progress').innerText()).includes('6/6')&&(await page.locator('body').innerText()).includes('All six control decisions recorded.'));
  for(const [x,z,label] of [[65,-15,'return-east'],[65,14,'return-south'],[25,14,'wall-approach-south'],[25,0,'tank-wall-approach']])await walk(x,z,label);await aim(36,0);await hold();await page.waitForTimeout(2500);await release();check('desktop: imported tank wall blocks the player',(await pos())[0]<32);
 }
 await page.getByRole('button',{name:lang==='tr'?'Denetimi bitir':'Finish inspection',exact:true}).click();
 const report=await page.getByTestId('mission-report').innerText();
 check(`${name}: explicit finish produces measured score and wrong-decision report`,report.includes(mobile?'16/100':'80/100')&&report.includes(mobile?'32':'160')&&report.includes(lang==='tr'?'Aktif süre':'Active time'));
 const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,meshCount:window.siteRenderer.info.memory.geometries,textures:window.siteRenderer.info.memory.textures,webgl:window.siteRenderer.getContext().getParameter(window.siteRenderer.getContext().VERSION)}));check(`${name}: real WebGL and no horizontal page overflow`,metrics.webgl.includes('WebGL')&&metrics.scroll<=metrics.width);const consequences=await page.evaluate(()=>({toolBox:window.siteScene.getObjectByName('secured-tool-box').visible,tool:window.siteScene.getObjectByName('evidence-droppedTool').position.toArray(),closedFittings:window.siteScene.getObjectByName('closed-fittings-lid').visible,fittings:window.siteScene.getObjectByName('evidence-materials').position.toArray()}));routes.push({device:name,metrics,consequences});
 await page.getByRole('button',{name:lang==='tr'?'Görevi yeniden başlat':'Restart mission',exact:true}).click();
 await page.getByRole('button',{name:lang==='tr'?'Onayla':'Confirm',exact:true}).click();
 await page.getByRole('button',{name:lang==='tr'?'Denetime başla':'Start inspection',exact:true}).waitFor();
 await page.waitForFunction(()=>!window.siteScene.getObjectByName('secured-tool-lid').visible&&!window.siteScene.getObjectByName('closed-fittings-lid').visible);
 const restored=await page.evaluate(()=>({tool:window.siteScene.getObjectByName('evidence-droppedTool').position.toArray(),materials:window.siteScene.getObjectByName('evidence-materials').position.toArray()}));
 check(`${name}: replay restores both original upper evidence positions and removes control lids`,Math.abs(restored.tool[0]-57.8)<1e-6&&Math.abs(restored.tool[2]+24.1)<1e-6&&Math.abs(restored.materials[0]-51.5)<1e-6&&Math.abs(restored.materials[2]+26.55)<1e-6);
 await context.close();
}
try{
 await exercise({});await exercise({mobile:true,width:390,height:844,lang:'tr',name:'mobile-portrait'});await exercise({mobile:true,width:844,height:390,lang:'en',name:'mobile-landscape'});
 check('no browser errors',errors.length===0);fs.rmSync(`${out}/height-failure.json`,{force:true});fs.writeFileSync(`${out}/height-results.json`,JSON.stringify({timestamp:new Date().toISOString(),checks,routes,errors,renderer:'Chromium / SwiftShader; on-demand render captures, live component input/animation loop',mobileFixture:'XZ placement at stair entrance only; no Y assignments; all vertical travel is native D-pad input'},null,2));console.log('PASS',checks.length);
}catch(e){fs.writeFileSync(`${out}/height-failure.json`,JSON.stringify({checks,routes,errors,error:String(e)},null,2));throw e}finally{await browser.close();server.closeAllConnections();server.close()}
