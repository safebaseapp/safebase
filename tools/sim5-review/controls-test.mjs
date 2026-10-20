import {startMission,lookAtInspection,resumeMission} from './mission-test-support.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
import {startServer} from './server.mjs';
import {toolRoot} from './inspect.mjs';
const out=path.join(toolRoot,'artifacts');await fs.mkdir(out,{recursive:true});await fs.rm(path.join(out,'controls-results.json'),{force:true});
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=[],errors=[],layouts=[],quality=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('CHECK',name);};
const frames=(p,n=8)=>p.evaluate(n=>new Promise(resolve=>{let i=0;const step=()=>++i>=n?resolve():requestAnimationFrame(step);requestAnimationFrame(step)}),n);
const pos=p=>p.evaluate(()=>window.siteCamera.position.toArray());
// Input release governs horizontal travel; the separate height suite checks vertical settling.
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[2]-b[2]);
const openRoad=async p=>{await p.evaluate(()=>window.siteCamera.position.set(0,1.8,90));await frames(p,2);};
const observe=p=>{p.on('pageerror',e=>errors.push(e.message));};
const load=async(p,lang='en')=>{await p.goto(url+'/site.html?lang='+lang);await p.evaluate(()=>{window.controlEvents=[];for(const type of ['pointerdown','pointerup','pointercancel','lostpointercapture','click'])window.addEventListener(type,e=>{window.controlEvents.push([type,e.target.className,e.pointerId]);window.controlEvents=window.controlEvents.slice(-30);},true);});await p.waitForFunction(()=>window.siteScene?.getObjectByName('sim5-lifting-operation'),null,{timeout:120000});await startMission(p,lang);await p.getByRole('button',{name:lang==='tr'?'Sahada yürü':'Walk site',exact:true}).click();await frames(p,2);};
const state=()=>{
 const c=window.siteCamera;c.updateMatrixWorld(true);const m=c.matrixWorld.elements;
 return {position:c.position.toArray(),right:[m[0],m[1],m[2]],quaternion:c.quaternion.toArray()};
};
const getQuality=()=>{
 const scene=window.siteScene,r=window.siteRenderer,meshes=[];
 scene.traverse(o=>{if(o.isMesh)meshes.push(o);});
 return{meshCount:meshes.length,vertices:meshes.reduce((n,o)=>n+o.geometry.attributes.position.count,0),pixelRatio:r.getPixelRatio(),antialias:r.getContext().getContextAttributes().antialias,toneMapping:r.toneMapping,exposure:r.toneMappingExposure,shadows:r.shadowMap.enabled,shadowType:r.shadowMap.type,shadowResolution:scene.children.find(o=>o.isDirectionalLight).shadow.mapSize.toArray(),
 materials:['Object_19','Object_27','Object_12','Object_10'].map(name=>{const m=scene.getObjectByName('sim5-welding-operation').getObjectByName(name).material;return{name,color:m.color.getHexString(),roughness:m.roughness,map:!!m.map};}),
 parts:['sim5-welding-operation','sim5-lifting-operation','extinguisher-body','basket-sling','lifted-pipe','face-shield','torch-lead'].map(name=>({name,present:name==='face-shield'?meshes.some(o=>o.userData.part===name):!!scene.getObjectByName(name)}))};
};
let baseline;
try{
 const desktop=await browser.newContext({viewport:{width:1200,height:1000},deviceScaleFactor:2});const p=await desktop.newPage();observe(p);await load(p);baseline=await p.evaluate(getQuality);quality.push({device:'desktop',...baseline});
 for(let angle=0;angle<4;angle++){
  if(angle){const b=await p.locator('canvas').boundingBox();await p.mouse.move(b.x+b.width*.8,b.y+120);await p.mouse.down();await p.mouse.move(b.x+b.width*.8-Math.PI/2/.004,b.y+120,{steps:4});await p.mouse.up();await frames(p,2);}
  for(const[key,sign]of [['d',1],['ArrowRight',1],['a',-1],['ArrowLeft',-1]]){
   await openRoad(p);const a=await p.evaluate(state);await p.keyboard.down(key);await frames(p);await p.keyboard.up(key);await frames(p,2);const b=await p.evaluate(state);
   const delta=b.position.map((x,i)=>x-a.position[i]),projection=delta.reduce((sum,x,i)=>sum+x*a.right[i],0),length=Math.hypot(...delta);
   check(`yaw ${angle*90}: ${key} moves screen-${sign>0?'right':'left'} without turning`,projection*sign>.12&&Math.abs(projection)/length>.995&&Math.abs(a.quaternion.reduce((n,x,i)=>n+x*b.quaternion[i],0))>.99999);
  }
 }
 await openRoad(p);await p.keyboard.down('d');await frames(p);await p.getByRole('button',{name:'Reset camera',exact:true}).click();const reset=await pos(p);await p.keyboard.down('d');await frames(p);check('reset clears held keyboard input and ignores stale auto-repeat',distance(reset,await pos(p))<1e-6);await p.keyboard.up('d');
 await p.keyboard.down('d');await p.getByRole('button',{name:'Overview',exact:true}).click();await p.getByRole('button',{name:'Walk site',exact:true}).click();const switched=await pos(p);await frames(p);check('mode switch clears held input',distance(switched,await pos(p))<1e-6);await p.keyboard.up('d');
 for(const event of ['blur','visibilitychange']){
  await openRoad(p);await p.keyboard.down('d');await frames(p,3);await p.evaluate(event=>{if(event==='blur')window.dispatchEvent(new Event(event));else{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event(event));delete document.hidden;}},event);const a=await pos(p);await frames(p);check(`${event} clears held input`,distance(a,await pos(p))<1e-6);await p.keyboard.up('d');await resumeMission(p);
 }
 await openRoad(p);await p.keyboard.down('d');const button=p.getByRole('button',{name:'Strafe right',exact:true});await button.hover();await p.mouse.down();await frames(p,3);await p.mouse.up();const still=await pos(p);await frames(p);check('releasing a pointer preserves the same held keyboard key',distance(still,await pos(p))>.12);await p.keyboard.up('d');const stopped=await pos(p);await frames(p);check('all input released stops movement',distance(stopped,await pos(p))<1e-6);
 await p.locator('.sim5-stage').scrollIntoViewIfNeeded();await p.evaluate(()=>{window.reviewCamera={position:[-12,6,33],target:[-27,4.8,47]};window.reviewFrameRequested=true;});await frames(p,2);await p.screenshot({path:path.join(out,'controls-desktop.png')});
 await desktop.close();
 for(const layout of [{name:'small-portrait',width:320,height:568,lang:'tr'},{name:'portrait',width:390,height:844,lang:'en'},{name:'landscape',width:844,height:390,lang:'tr'}]){
  const context=await browser.newContext({viewport:{width:layout.width,height:layout.height},isMobile:true,hasTouch:true,deviceScaleFactor:2});const page=await context.newPage();observe(page);await load(page,layout.lang);const cdp=await context.newCDPSession(page);
  await page.locator('.sim5-stage').scrollIntoViewIfNeeded();await frames(page,2);
  const touch=async(type,points=[])=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
  const hold=async(key,id=11)=>{const b=await page.getByTestId('sim5-touch-'+key).boundingBox();const point={x:b.x+b.width/2,y:b.y+b.height/2,id};await touch('touchStart',[point]);return point;};
  const q=await page.evaluate(getQuality);quality.push({device:layout.name,...q});
  check(`${layout.name}: same models, vertex detail, colors, shadows and antialiasing as desktop`,q.meshCount===baseline.meshCount&&q.vertices===baseline.vertices&&q.antialias&&q.pixelRatio===baseline.pixelRatio&&q.shadows===baseline.shadows&&q.shadowType===baseline.shadowType&&JSON.stringify(q.shadowResolution)===JSON.stringify(baseline.shadowResolution)&&q.toneMapping===baseline.toneMapping&&q.exposure===baseline.exposure&&JSON.stringify(q.materials)===JSON.stringify(baseline.materials)&&q.parts.every(p=>p.present));
  for(const[key,axis,sign]of [['d','right',1],['a','right',-1],['w','forward',1],['s','forward',-1]]){
   await openRoad(page);const before=await page.evaluate(state);await hold(key);await frames(page);await touch('touchEnd');await frames(page,2);const after=await page.evaluate(state);const delta=after.position.map((x,i)=>x-before.position[i]);
   const dir=axis==='right'?before.right:[before.right[2],0,-before.right[0]];
   check(`${layout.name}: hold ${key} moves in the labelled direction`,delta.reduce((n,x,i)=>n+x*dir[i],0)*sign>.1);
   const a=await pos(page);await frames(page);check(`${layout.name}: releasing ${key} stops`,distance(a,await pos(page))<1e-6);
  }
  await openRoad(page);await hold('d');await frames(page,3);await touch('touchCancel');const cancel=await pos(page);await frames(page);check(`${layout.name}: native touch cancel stops movement`,distance(cancel,await pos(page))<1e-6);
  await page.evaluate(()=>{window.lastButtonPointer=null;document.querySelector('[data-testid="sim5-touch-d"]').addEventListener('pointerdown',e=>window.lastButtonPointer=e.pointerId,{once:true});});const captured=await hold('d');await touch('touchMove',[{...captured,x:captured.x+4}]);await frames(page,3);await page.evaluate(()=>{const b=document.querySelector('[data-testid="sim5-touch-d"]');b.releasePointerCapture(window.lastButtonPointer);});await touch('touchMove',[{...captured,x:captured.x+8}]);await frames(page,2);const lost=await pos(page);await frames(page);check(`${layout.name}: lost capture stops movement`,distance(lost,await pos(page))<1e-6);await touch('touchEnd');
  const b=await page.locator('canvas').boundingBox(),before=await page.evaluate(state);await touch('touchStart',[{x:b.x+b.width*.65,y:b.y+80,id:21}]);await touch('touchMove',[{x:b.x+b.width*.65-50,y:b.y+90,id:21}]);await touch('touchEnd');await frames(page,2);const after=await page.evaluate(state);check(`${layout.name}: native canvas drag changes viewing direction`,Math.abs(before.quaternion.reduce((n,x,i)=>n+x*after.quaternion[i],0))<.999);
  await openRoad(page);const walking=await hold('w',31),view={x:b.x+b.width*.75,y:b.y+75,id:32};const simultaneous=await page.evaluate(state);
  await touch('touchStart',[walking,view]);await touch('touchMove',[walking,{...view,x:view.x-35}]);await frames(page);const combined=await page.evaluate(state);
  check(`${layout.name}: two fingers can walk and look together`,distance(simultaneous.position,combined.position)>.1&&Math.abs(simultaneous.quaternion.reduce((n,x,i)=>n+x*combined.quaternion[i],0))<.999);
  await touch('touchEnd',[walking]);await frames(page,2);const released=await pos(page);const looking=await page.evaluate(state);await touch('touchMove',[{...view,x:view.x-70}]);await frames(page);const stillLooking=await page.evaluate(state);
  check(`${layout.name}: releasing movement finger keeps camera drag active without walking`,distance(released,stillLooking.position)<1e-6&&Math.abs(looking.quaternion.reduce((n,x,i)=>n+x*stillLooking.quaternion[i],0))<.999);await touch('touchEnd');
  await page.evaluate(()=>window.siteCamera.position.set(-17,1.8,47));await frames(page,2);
  await lookAtInspection(page,'lifting');
  const inspect=page.locator('.sim5-touch-inspect');await inspect.waitFor({state:'visible'});
  const metrics=await page.evaluate(()=>{const rect=s=>{const b=document.querySelector(s).getBoundingClientRect();return{x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom};};return{viewport:[innerWidth,innerHeight],scrollWidth:document.documentElement.scrollWidth,canvas:rect('canvas'),pad:rect('.sim5-touch-dpad'),inspect:rect('.sim5-touch-inspect'),buttons:[...document.querySelectorAll('.sim5-touch-button')].map(e=>{const b=e.getBoundingClientRect();return{x:b.x,right:b.right,width:b.width,height:b.height};})};});layouts.push({name:layout.name,...metrics});
  check(`${layout.name}: no horizontal overflow or clipped controls`,metrics.scrollWidth<=layout.width&&metrics.buttons.every(b=>b.x>=0&&b.right<=layout.width&&b.width>=44&&b.height>=44)&&metrics.inspect.x>=0&&metrics.inspect.right<=layout.width);
  check(`${layout.name}: inspect and D-pad do not overlap and remain in viewport`,metrics.inspect.bottom<=metrics.pad.y&&metrics.pad.bottom<=layout.height&&metrics.inspect.y>=0&&metrics.canvas.height>=245);
  await inspect.tap();await page.getByRole('button',{name:layout.lang==='tr'?'Bariyer varken sapan ve işaretçi kontrolü gerekmez':'A barrier makes rigging and signaller checks unnecessary',exact:true}).waitFor();check(`${layout.name}: touch inspect opens the correct lifting hazard`,true);await page.getByRole('button',{name:layout.lang==='tr'?'Kaldırma planı, sapanlar, zemin/ayaklar ve işaretçi iletişimi':'Lift plan, rigging, ground/outriggers and signaller communication',exact:true}).tap();await page.getByText(layout.lang==='tr'?'Doğru.':'Correct.',{exact:false}).waitFor();
  await inspect.focus();await page.keyboard.press('Enter');await page.getByRole('heading',{name:layout.lang==='tr'?'Kontrol durumu':'Control status',exact:true}).waitFor();check(`${layout.name}: keyboard inspection still works after touch`,true);await page.getByRole('button',{name:layout.lang==='tr'?'Kapat':'Close',exact:true}).click();
  await page.locator('.sim5-stage').scrollIntoViewIfNeeded();await page.evaluate(()=>{window.reviewCamera={position:[-12,6,33],target:[-27,4.8,47]};window.reviewFrameRequested=true;});await frames(page,2);await page.screenshot({path:path.join(out,`controls-${layout.name}.png`),fullPage:false});
  await openRoad(page);await hold('d');await frames(page,3);await page.setViewportSize({width:layout.height,height:layout.width});await frames(page,4);await touch('touchEnd');const rotated=await pos(page);await frames(page);check(`${layout.name}: rotating viewport clears active input`,distance(rotated,await pos(page))<1e-6);
  await context.close();
 }
 check('no browser page errors',errors.length===0);
 await fs.writeFile(path.join(out,'controls-results.json'),JSON.stringify({timestamp:new Date().toISOString(),checks,layouts,quality,errors},null,2));console.log(`PASS: ${checks.length} input, mobile layout and quality checks`);
}catch(error){for(const p of browser.contexts().flatMap(c=>c.pages())){console.error(await p.locator("body").innerText());await p.screenshot({path:path.join(out,"controls-failure.png"),fullPage:true});}throw error;}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
