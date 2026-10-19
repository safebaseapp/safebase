import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from 'playwright';
import {createHash} from 'node:crypto';
import {inspectAsset,repoRoot,toolRoot} from './inspect.mjs';
import {startServer} from './server.mjs';
const out=path.join(toolRoot,'artifacts');await fs.mkdir(out,{recursive:true});await fs.rm(path.join(out,'results.json'),{force:true});
const asset=inspectAsset();
assert.equal(asset.sha256,'147b7b18d9121c77b08ab3137e2f8678174806b470ad82a9ecf6a7184fd245c7');
assert.equal(asset.nodes.length,772);assert.equal(asset.meshCount,387);assert.equal(asset.materials.length,27);
await fs.writeFile(path.join(out,'asset-inspection.json'),JSON.stringify(asset,null,2));
const {server,url}=await startServer(0);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],requests=[],checks=[];
const page=await browser.newPage({viewport:{width:1200,height:1000}});
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(new URL(r.url()).origin!==url)requests.push(r.url());});
try{
 await page.goto(url);await page.waitForFunction(()=>window.ready,null,{timeout:90000});
 const geometry=await page.evaluate(()=>{
  const T=window.THREE,op=window.operation,d=op.diagnostics,g=op.group;
  g.updateMatrixWorld(true);
  const p=a=>new T.Vector3(...a),b=name=>new T.Box3().setFromObject(g.getObjectByName(name),true);
  const wire=g.getObjectByName('consumable-wire');
  const coupon=b('coupon-base'),upright=b('coupon-upright'),bench=b('bench-top');
  const worldContact=p(d.contact).add(g.position),worldEye=p(d.eye).add(g.position);
  const ray=new T.Raycaster(worldEye,worldContact.clone().sub(worldEye).normalize(),0,.8);
  const faceHits=ray.intersectObjects([g.getObjectByName('Object_763'),g.getObjectByName('Object_771')],false);
  let invalid=0,zeroNormals=0;
  g.traverse(mesh=>{if(!mesh.isMesh)return;for(const attr of [mesh.geometry.attributes.position,mesh.geometry.attributes.normal]){if(!attr)continue;for(let i=0;i<attr.count;i++){const v=new T.Vector3().fromBufferAttribute(attr,i);if(![v.x,v.y,v.z].every(Number.isFinite))invalid++;if(attr===mesh.geometry.attributes.normal&&mesh.userData.part==='worker'&&v.length()<.5)zeroNormals++;}}});
  const cable=g.getObjectByName('torch-lead'),returnCable=g.getObjectByName('work-return-lead');
  let cableMin=Infinity;for(const lead of [cable,returnCable])for(let i=0;i<=1000;i++){const q=lead.geometry.parameters.path.getPoint(i/1000);cableMin=Math.min(cableMin,q.y-d.floor-lead.geometry.parameters.radius);}
  const eyeToLens=p(d.lensCenter).sub(p(d.eye)).normalize(),eyeToContact=p(d.contact).sub(p(d.eye)).normalize();
  const hand=b('Object_10'),grip=b('Object_709');
  return {diagnostics:d,invalid,zeroNormals,cableMin,wireLength:wire.geometry.parameters.height,
   benchAhead:p(d.benchCenter).setY(0).dot(p(d.forward)),
   contactBaseDelta:Math.abs(worldContact.y-coupon.max.y),contactUprightDelta:Math.abs(worldContact.z-upright.max.z),
   benchPlateGap:Math.abs(bench.max.y-coupon.min.y),eyeShieldHit:faceHits.map(h=>({part:h.object.name,distance:h.distance})),
   lensGazeAngle:T.MathUtils.radToDeg(eyeToLens.angleTo(eyeToContact)),
   leadStartError:p(d.leadStart).distanceTo(p(d.machineSocket)),leadEndError:p(d.leadEnd).distanceTo(p(d.leadSocket)),
   handGripOverlap:hand.intersectsBox(grip),extinguisherBottom:b('extinguisher-body').min.y,
   groundClearance:b('Object_14').min.y,arcPosition:g.getObjectByName('weld-arc').getWorldPosition(new T.Vector3()).distanceTo(worldContact)};
 });
 const check=(name,condition)=>{console.log('CHECK',name);assert.ok(condition,`${name}: ${JSON.stringify(geometry)}`);checks.push(name);};
 check('mesh positions and normals finite',geometry.invalid===0);
 check('posed worker normals retain lighting',geometry.zeroNormals===0);
 check('table is on the measured forward side',geometry.benchAhead>.6);
 check('wire has 12mm nozzle standoff',Math.abs(geometry.wireLength-.012)<1e-6);
 check('contact lies on both fillet faces',geometry.contactBaseDelta<1e-6&&geometry.contactUprightDelta<1e-6);
 check('coupon rests on tabletop',geometry.benchPlateGap<1e-6);
 check('arc originates at the contact',geometry.arcPosition<1e-6);
 check('machine to grip lead endpoints continuous',geometry.leadStartError<1e-6&&geometry.leadEndError<1e-6);
 check('torch and work-return leads stay above floor',geometry.cableMin>=-1e-7);
 check('torch grip remains inside the glove',geometry.handGripOverlap);
 check('eye to weld ray passes through shield window',geometry.eyeShieldHit.some(h=>h.part==='Object_763'));
 check('shield viewing axis follows the weld',geometry.lensGazeAngle<8);
 check('extinguisher rests on ground',Math.abs(geometry.extinguisherBottom)<1e-6);
 check('boots remain grounded',geometry.groundClearance<.005&&geometry.groundClearance>=0);
 const shots=[
  ['01-front',[3.4,2.8,-4.6],[-.3,.95,.35]],
  ['02-operator-side',[-3.3,2.2,-2.4],[-.25,.95,.35]],
  ['03-rear-connections',[3.4,2.8,4.6],[-.25,.95,.35]],
  ['04-torch-contact',[.7,1.7,-.25],[.01,1.19,-.85]],
  ['05-face-shield',[-.9,1.9,-1.2],[-.01,1.51,-.36]],
  ['06-extinguisher',[-1.7,.9,-1.65],[-.92,.30,-.45]]
 ];
 for(const [name,position,target]of shots){await page.evaluate(({position,target})=>window.shot(position,target,.1),{position,target});await page.screenshot({path:path.join(out,`${name}.png`)});}
 const sparkMotion=await page.evaluate(()=>{const op=window.operation;op.update(.1);const a=op.group.children.filter(o=>o.name==='contact-spark').map(o=>o.position.toArray());op.update(.17);const b=op.group.children.filter(o=>o.name==='contact-spark').map(o=>o.position.toArray());return JSON.stringify(a)!==JSON.stringify(b)});
 check('contact particles move with elapsed time',sparkMotion);
 for(const lang of ['en','tr']){
  console.log('SITE',lang);await page.goto(`${url}/site.html?lang=${lang}`);
  await page.waitForFunction(()=>window.siteScene?.getObjectByName('sim5-welding-operation'),null,{timeout:120000});
  const site=await page.evaluate(()=>({meshes:window.siteScene.children.length,station:!!window.siteScene.getObjectByName('sim5-welding-operation')}));
  check(`${lang}: actual site component includes welding operation`,site.station&&site.meshes>100);
  await page.getByRole('button',{name:lang==='tr'?'Sahada yürü':'Walk site',exact:true}).click();
  await page.evaluate(()=>window.siteCamera.position.set(-22,1.8,-2));
  const inspect=page.getByRole('button',{name:lang==='tr'?'🔍 Yakındaki tehlikeyi incele':'🔍 Inspect nearby hazard'});
  await inspect.waitFor({timeout:15000});await inspect.click();
  await page.getByRole('button',{name:lang==='tr'?'Yangın söndürücü ile işe başla':'Start with a fire extinguisher',exact:true}).click();
  await page.getByText(lang==='tr'?'Güvensiz seçim.':'Unsafe choice.',{exact:false}).waitFor();
  await page.getByRole('button',{name:lang==='tr'?'İşi durdur, izin ve gaz ölçümünü doğrula':'Stop work and verify permit and gas testing',exact:true}).click();
  await page.getByText(lang==='tr'?'Doğru.':'Correct.',{exact:false}).waitFor();
  const body=await page.locator('body').innerText();
  check(`${lang}: incorrect hot-work choice rejected and correct choice recorded`,body.includes('1/4'));
  check(`${lang}: both industrial assets loaded`,body.includes('2/2'));
  await page.evaluate(()=>{window.reviewCamera={position:[-18.6,2.8,-9.6],target:[-22.3,1,-4.65]};window.reviewFrameRequested=true;});
  await page.waitForFunction(()=>!!window.siteCamera);
  // Wait for an actual renderer frame after setting the test-only camera.
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await page.screenshot({path:path.join(out,`site-${lang}.png`)});
  for(const hazard of [
   {name:'leak',position:[22,1.8,-17],correct:['Alanı izole et, güvenli mesafeden bildir','Isolate the area and report from a safe distance'],wrong:['Sızıntının kaynağına yaklaş','Approach the leak source']},
   {name:'access',position:[19.5,1.8,-2],correct:['Engeli güvenle kaldırttır ve erişimi doğrula','Arrange safe removal and verify access'],wrong:['Vardiya sonunu bekle','Wait until the end of the shift']}
  ]){
   await page.evaluate(position=>window.siteCamera.position.fromArray(position),hazard.position);
   await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
   await inspect.click();
   await page.getByRole('button',{name:hazard.wrong[lang==='tr'?0:1],exact:true}).click();
   await page.getByText(lang==='tr'?'Güvensiz seçim.':'Unsafe choice.',{exact:false}).waitFor();
   await page.getByRole('button',{name:hazard.correct[lang==='tr'?0:1],exact:true}).click();
   await page.getByText(lang==='tr'?'Doğru.':'Correct.',{exact:false}).waitFor();
   checks.push(`${lang}: ${hazard.name} unsafe choice rejected and safe choice accepted`);
  }
  check(`${lang}: all three HSE decisions completed`,(await page.locator('body').innerText()).includes('3/4'));
 }
 assert.deepEqual(errors,[],'Browser errors');assert.deepEqual(requests,[],'Isolated review unexpectedly used external network');
 checks.push('no browser errors or external network requests');
 // Models from the site outside the welder must be byte-identical.
 for(const [name,expected]of [['SERNEM_SIM4_Factory_optimized.glb','0bfb3c1baed3478cbffed6ab078e4e080c0a361ae2f185896ecc4607922d9785'],['large_industrial_storage_tanks (1).glb','57f8af41a804fb9f231437c73c5fcd1d11047a4aac42aaa43f0b52dd8d3558e8']]){
  const bytes=await fs.readFile(path.join(repoRoot,'app/public/sim5',name));assert.equal(createHash('sha256').update(bytes).digest('hex'),expected);
 }
 const result={timestamp:new Date().toISOString(),checks,geometry,errors,externalRequests:requests,assetSha256:asset.sha256};
 await fs.writeFile(path.join(out,'results.json'),JSON.stringify(result,null,2));
 console.log(`PASS: ${checks.length} geometry, rendering, integration and TR/EN HSE checks. Screenshots: ${out}`);

}catch(error){console.error('PAGE',await page.locator('body').innerText());console.error('ERRORS',errors);throw error;}finally{await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
