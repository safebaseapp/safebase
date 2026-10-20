import {startServer} from './server.mjs';import {chromium} from 'playwright';import {toolRoot} from './inspect.mjs';import path from 'node:path';import fs from 'node:fs';import assert from 'node:assert/strict';
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=[],samples=[];const check=(n,b)=>{assert.ok(b,n);checks.push(n);console.log('CHECK',n)};
try{
 const p=await browser.newPage({viewport:{width:1200,height:1000}});await p.goto(url+'/site.html');await p.waitForFunction(()=>window.siteScene?.getObjectByName('sim5-signaller'),null,{timeout:120000});
 for(const [i,position]of [[0,[-14.7,2.1,52.4]],[1,[-19.8,2.3,59.5]],[2,[-14,2.3,58]]]){
  const data=await p.evaluate(async({position})=>{
   const T=await import('/vendor/three/build/three.module.js'),g=window.siteScene.getObjectByName('sim5-signaller'),suit=g.children.filter(m=>/^signaller-Object_(17|18|19|20)$/.test(m.name));
   const renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setSize(480,600);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;
   const scene=new T.Scene();scene.background=new T.Color('black');scene.add(new T.HemisphereLight(0xd8ebff,0x687363,1.35));const sun=new T.DirectionalLight(0xffedcf,2.8);sun.position.set(-65,95,42);scene.add(sun);
   const clone=new T.Group();clone.position.copy(g.position);clone.rotation.copy(g.rotation);for(const m of suit)clone.add(m.clone());scene.add(clone);
   const camera=new T.PerspectiveCamera(35,480/600,.1,100);camera.position.fromArray(position);camera.lookAt(-17,.95,56);renderer.render(scene,camera);
   const gl=renderer.getContext(),pix=new Uint8Array(480*600*4);gl.readPixels(0,0,480,600,gl.RGBA,gl.UNSIGNED_BYTE,pix);let count=0,r=0,green=0,b=0,white=0;
   for(let i=0;i<pix.length;i+=4)if(Math.max(pix[i],pix[i+1],pix[i+2])>25){count++;r+=pix[i];green+=pix[i+1];b+=pix[i+2];if(Math.min(pix[i],pix[i+1],pix[i+2])>220)white++;}
   const result={pixels:count,mean:[r/count,green/count,b/count],whiteFraction:white/count,positions:g.position.toArray(),vestTriangles:g.children.filter(m=>m.name==='signaller-fitted-vest').reduce((n,m)=>n+m.geometry.index.count/3,0)};renderer.dispose();return result;
  },{position});samples.push(data);check(`view ${i+1}: suit is rendered blue, not washed white`,data.pixels>1000&&data.mean[2]>data.mean[0]*1.25&&data.mean[1]>data.mean[0]*1.1&&data.whiteFraction<.04);check(`view ${i+1}: fitted high-visibility vest retains real triangles`,data.vestTriangles>100);
  const frame=await p.evaluate(()=>window.reviewFrameCount||0);await p.evaluate(position=>{window.reviewCamera={position,target:[-17,.95,56]};window.reviewFrameRequested=true},position);await p.waitForFunction(n=>window.reviewFrameCount>n,frame);await p.locator('canvas').screenshot({path:path.join(toolRoot,`artifacts/pack7/signaller-${i+1}.png`)});
 }
 fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/signaller-results.json'),JSON.stringify({checks,samples},null,2));console.log('PASS',checks.length);
}finally{await browser.close();server.closeAllConnections();server.close()}
