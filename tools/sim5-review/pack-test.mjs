import {startMission,lookAtInspection,resumeMission} from './mission-test-support.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
import {startServer} from './server.mjs';
import {toolRoot,repoRoot} from './inspect.mjs';
const out=path.join(toolRoot,'artifacts');await fs.mkdir(out,{recursive:true});await fs.rm(path.join(out,'pack-results.json'),{force:true});
const baseline=JSON.parse(await fs.readFile(path.join(repoRoot,'docs/sim5-welding-review/results.json'),'utf8'));
const{server,url}=await startServer(0);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1200,height:1000}}),errors=[],external=[],checks=[],samples=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(new URL(r.url()).origin!==url)external.push(r.url());});
const check=(name,condition)=>{assert.ok(condition,name);checks.push(name);console.log('CHECK',name);};
let lift,weld;
try{
 await page.goto(url);await page.waitForFunction(()=>window.ready);
 weld=await page.evaluate(()=>{
  const op=window.operation,mesh=n=>op.group.getObjectByName(n);
  return{diagnostics:op.diagnostics,hatTangent:!!mesh('Object_12').geometry.attributes.tangent,apronRoughness:mesh('Object_27').material.roughness,suitMap:!!mesh('Object_19').material.map,apronMap:!!mesh('Object_27').material.map,arcRadius:mesh('weld-arc').geometry.parameters.radius,arcIntensity:mesh('weld-light').intensity};
 });
 for(const key of ['tip','contact','leadSocket','machineSocket','leadStart','leadEnd','benchCenter','eye','lensCenter']){
  check(`welding geometry unchanged: ${key}`,weld.diagnostics[key].every((x,i)=>Math.abs(x-baseline.geometry.diagnostics[key][i])<1e-9));
 }
 check('authored suit and apron textures retained',weld.suitMap&&weld.apronMap);
 check('leather is rough and hardhat tangent frame is refreshed',weld.apronRoughness>=.8&&!weld.hatTangent);
 check('arc visibility increased without moving its contact',weld.arcRadius>.014&&weld.arcIntensity>2);
 const colorViews=[[[3.4,2.8,-4.6],[-3,6,-4]],[[-3.3,2.2,-2.4],[4,4,2]],[[3.4,2.8,4.6],[-4,3,4]]];
 for(let i=0;i<colorViews.length;i++){
  const[position,light]=colorViews[i];
  for(const[name,names]of [['suit',['Object_17','Object_18','Object_19','Object_20']],['apron',['Object_27']],['gloves-boots',['Object_10','Object_14','Object_15']],['hardhat',['Object_12']]]){
   const sample=await page.evaluate(({names,position,light})=>window.sampleMaterial(names,position,light),{names,position,light});samples.push({name,view:i,...sample});console.log("SAMPLE",name,i,JSON.stringify(sample));
   const[r,g,b]=sample.mean;
   const suit=samples.find(s=>s.name==='suit'&&s.view===i).mean.reduce((sum,x)=>sum+x,0)/3;
   check(`${name}: rendered color under light/view ${i+1}`,sample.pixels>1000&&(name==='suit'?b>r*1.25&&g>r*1.1&&sample.whiteFraction<.04:name==='hardhat'?Math.min(r,g,b)>suit*2&&Math.max(r,g,b)/Math.min(r,g,b)<1.3:r>b*1.1&&sample.whiteFraction<.06));
  }
  await page.evaluate(position=>window.shot(position,[-.3,.95,.35],.1),position);await page.screenshot({path:path.join(out,`pack-welder-${i+1}.png`)});
 }
 await page.evaluate(()=>window.shot([.7,1.7,-.25],[.01,1.19,-.85],.1));await page.screenshot({path:path.join(out,'pack-weld-contact.png')});
 await page.goto(url+'/lifting.html');await page.waitForFunction(()=>window.ready);
 lift=await page.evaluate(()=>{
  const T=window.THREE,op=window.operation,g=op.group,d=op.diagnostics;g.updateMatrixWorld(true);
  const v=a=>new T.Vector3(...a),box=name=>new T.Box3().setFromObject(g.getObjectByName(name),true);
  const endpoints=m=>[new T.Vector3(0,m.geometry.parameters.height/2,0).applyMatrix4(m.matrixWorld),new T.Vector3(0,-m.geometry.parameters.height/2,0).applyMatrix4(m.matrixWorld)].sort((a,b)=>b.y-a.y);
  const block=box('hook-block'),pipe=box('lifted-pipe');
  const rope=g.children.filter(m=>m.name==='vertical-hoist-rope').map(m=>{const[a,b]=endpoints(m);return{top:a.toArray(),bottom:b.toArray(),verticalError:Math.hypot(a.x-b.x,a.z-b.z),blockGap:Math.abs(b.y-block.max.y)};});
  const matBounds=g.children.filter(m=>m.name==='outrigger-mat').map(m=>new T.Box3().setFromObject(m,true));
  const slings=g.children.filter(m=>m.name==='basket-sling').map(m=>{
   const a=m.geometry.attributes.position,points=[];for(let i=0;i<a.count;i+=2)points.push(new T.Vector3().fromBufferAttribute(a,i).add(new T.Vector3().fromBufferAttribute(a,i+1)).multiplyScalar(.5));
   const below=points.filter(p=>p.y<d.load[1]-.01);
   return{start:points[0].toArray(),end:points.at(-1).toArray(),minRadius:Math.min(...below.map(p=>Math.hypot(p.x-d.load[0],p.y-d.load[1]))),minY:Math.min(...points.map(p=>p.y)),belowCount:below.length};
  });
  let invalid=0;g.traverse(m=>{if(!m.isMesh)return;for(const name of ['position','normal']){const a=m.geometry.attributes[name];if(!a)continue;for(let i=0;i<a.count;i++){const p=new T.Vector3().fromBufferAttribute(a,i);if(![p.x,p.y,p.z].every(Number.isFinite))invalid++;}}});
  const sheave=g.getObjectByName('boom-head-sheave'),ropeTop=v(rope[0].top);
  const reeving=g.children.filter(m=>m.name==='head-reeving').map(m=>{const path=m.geometry.parameters.path;return path.getPoint(1).toArray();});
  return{diagnostics:d,invalid,rope,slings,pipeMin:pipe.min.toArray(),pipeMax:pipe.max.toArray(),pipeCenter:pipe.getCenter(new T.Vector3()).toArray(),matMinY:matBounds.map(b=>b.min.y),sheaveTangentError:Math.hypot(ropeTop.x-(sheave.position.x+sheave.geometry.parameters.radiusTop),ropeTop.y-sheave.position.y),reeving};
 });
 const d=lift.diagnostics,dist=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
 check('lifting meshes have finite geometry and normals',lift.invalid===0);
 check('pipe is hollow and suspended above the slab',d.pipeInnerRadius>0&&d.pipeInnerRadius<d.pipeRadius&&lift.pipeMin[1]>2);
 check('pipe remains horizontal and centred under the hook',Math.abs(lift.pipeCenter[0]-d.hookBlock[0])<1e-6&&Math.abs(lift.pipeCenter[2]-d.hookBlock[2])<1e-6&&Math.abs(lift.pipeMax[1]-lift.pipeMin[1]-2*d.pipeRadius)<1e-6);
 check('two hoist falls are plumb and meet the hook block',lift.rope.length===2&&lift.rope.every(r=>r.verticalError<1e-8&&r.blockGap<1e-6));
 check('hoist falls run tangentially over the head sheave',lift.sheaveTangentError<1e-6);
 check('head reeving joins both hoist falls',lift.reeving.every((p,i)=>dist(p,lift.rope[i].top)<1e-6));
 check('basket slings join the same master link at both ends',lift.slings.length===2&&lift.slings.every(s=>dist(s.start,d.masterBottom)<1e-6&&dist(s.end,d.masterBottom)<1e-6));
 check('both basket wraps support the underside without cutting the pipe',lift.slings.every(s=>s.belowCount>10&&s.minRadius>=d.pipeRadius-.002&&s.minRadius<d.pipeRadius+.01&&s.minY>2));
 check('equal pick stations straddle the load centre',Math.abs(d.slingStations[0]+d.slingStations[1])<1e-8&&d.slingStations[1]<d.pipeLength/2);
 check('sling legs have a plausible angle above horizontal',d.slingAngleDegrees>=45&&d.slingAngleDegrees<75);
 check('four deployed outrigger mats rest on the pad',lift.matMinY.length===4&&lift.matMinY.every(y=>Math.abs(y)<1e-6));
 check('all outriggers and pipe lie inside the exclusion zone',d.feet.every(p=>p[0]>d.zone.minX&&p[0]<d.zone.maxX&&p[2]>d.zone.minZ&&p[2]<d.zone.maxZ)&&d.load[0]+d.pipeRadius<d.zone.maxX&&d.pipeLength/2<d.zone.maxZ);
 for(const[name,position,target]of [['front',[20,16,-21],[2.5,5,0]],['rear',[-19,14,20],[2.5,5,0]],['road-side',[22,11,21],[2.5,5,0]],['rigging',[12,6,-7],[7.2,3.9,0]],['head-reeving',[10,14,-4],[6.9,12.8,0]]]){
  await page.evaluate(({position,target})=>window.shot(position,target),{position,target});await page.screenshot({path:path.join(out,`pack-lifting-${name}.png`)});
 }
 for(const lang of ['en','tr']){
  await page.goto(url+'/site.html?lang='+lang);await page.waitForFunction(()=>window.siteScene?.getObjectByName('sim5-lifting-operation'),null,{timeout:120000});
  const placement=await page.evaluate(()=>{const group=window.siteScene.getObjectByName('sim5-lifting-operation');return{position:group.position.toArray(),hasWelder:!!window.siteScene.getObjectByName('sim5-welding-operation')};});
  check(`${lang}: lifting pad is off the road and beyond the factory plot`,placement.position[0]+12.85<-11.1&&placement.position[2]-8>30.5&&placement.hasWelder);
  await startMission(page,lang);await page.getByRole('button',{name:lang==='tr'?'Sahada yürü':'Walk site',exact:true}).click();await page.evaluate(()=>window.siteCamera.position.set(-17,1.8,47));
  await lookAtInspection(page,'lifting');
  const inspect=page.getByRole('button',{name:lang==='tr'?'🔍 Yakındaki tehlikeyi incele':'🔍 Inspect nearby hazard'});await inspect.waitFor();await inspect.click();
  await page.getByRole('button',{name:lang==='tr'?'Bariyer varken sapan ve işaretçi kontrolü gerekmez':'A barrier makes rigging and signaller checks unnecessary',exact:true}).click();await page.getByText(lang==='tr'?'Güvensiz seçim.':'Unsafe choice.',{exact:false}).waitFor();
  check(`${lang}: unsafe assumption that barriers replace rigging checks is rejected`,(await page.getByTestId('sim5-hse-progress').innerText()).includes('0/6'));
  await page.getByRole('button',{name:lang==='tr'?'Kaldırma planı, sapanlar, zemin/ayaklar ve işaretçi iletişimi':'Lift plan, rigging, ground/outriggers and signaller communication',exact:true}).click();await page.getByText(lang==='tr'?'Doğru.':'Correct.',{exact:false}).waitFor();
  check(`${lang}: safe lifting decision is recorded once`,(await page.getByTestId('sim5-hse-progress').innerText()).includes('1/6'));
  await inspect.click();
  await page.getByRole('heading',{name:lang==='tr'?'Kontrol durumu':'Control status',exact:true}).waitFor();await page.getByRole('button',{name:lang==='tr'?'Kapat':'Close',exact:true}).click();
  check(`${lang}: repeat lifting inspection cannot inflate progress`,(await page.getByTestId('sim5-hse-progress').innerText()).includes('1/6'));
  for(const hazard of [
   {id:'hotwork',position:[-22,1.8,-2],answer:['İşi durdur, izin ve gaz ölçümünü doğrula','Stop work and verify permit and gas testing']},
   {id:'leak',position:[22,1.8,-17],answer:['Alanı izole et, güvenli mesafeden bildir','Isolate the area and report from a safe distance']},
   {id:'access',position:[19.5,1.8,-2],answer:['Engeli güvenle kaldırttır ve erişimi doğrula','Arrange safe removal and verify access']}
  ]){
   await page.evaluate(position=>window.siteCamera.position.fromArray(position),hazard.position);await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await lookAtInspection(page,hazard.id);await inspect.click();
   await page.getByRole('button',{name:hazard.answer[lang==='tr'?0:1],exact:true}).click();await page.getByText(lang==='tr'?'Doğru.':'Correct.',{exact:false}).waitFor();
  }
  check(`${lang}: existing three decisions and lifting finish together at 4/6`,(await page.getByTestId('sim5-hse-progress').innerText()).includes('4/6'));
  await page.evaluate(()=>window.siteCamera.position.set(-17,1.8,47));await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await lookAtInspection(page,'lifting');await inspect.click();
  await page.getByRole('heading',{name:lang==='tr'?'Kontrol durumu':'Control status',exact:true}).waitFor();await page.getByRole('button',{name:lang==='tr'?'Kapat':'Close',exact:true}).click();
  for(const[name,position,target]of [['approach',[-12,6,33],[-27,4.8,47]],['rear',[-47,11,60],[-27,5,47]],['overview',[66,58,115],[-2,3,12]]]){
   await page.evaluate(({position,target})=>{window.reviewCamera={position,target};window.reviewFrameRequested=true;},{position,target});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await page.screenshot({path:path.join(out,`pack-site-${lang}-${name}.png`)});
  }
 }
 check('no browser page errors or external network requests',errors.length===0&&external.length===0);
 await fs.writeFile(path.join(out,'pack-results.json'),JSON.stringify({timestamp:new Date().toISOString(),checks,materialSamples:samples,welding:weld,lifting:lift,errors,externalRequests:external},null,2));
 console.log(`PASS: ${checks.length} color, lifting, geometry-preservation and TR/EN interaction checks.`);
}catch(error){console.error('ERROR',error);console.error('BROWSER',errors);await fs.writeFile(path.join(out,'pack-failure.json'),JSON.stringify({samples,lift,weld,errors},null,2));throw error;}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
