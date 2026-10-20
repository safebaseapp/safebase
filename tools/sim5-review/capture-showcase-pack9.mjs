// Photography only: current RealModels, original materials/GLBs, cloned camera.
import {startServer} from './server.mjs';
import {chromium} from 'playwright';
import {repoRoot,toolRoot} from './inspect.mjs';
import {createRequire} from 'node:module';import {createHash} from 'node:crypto';
import fs from 'node:fs';import path from 'node:path';
const require=createRequire(path.join(repoRoot,'app/package.json')),sharp=require('sharp');
const out=path.join(toolRoot,'artifacts/pack9');fs.mkdirSync(out,{recursive:true});
const views=[
 {name:'south-low',position:[-10,58,112],target:[-5,2,18],fov:40},
 {name:'southwest',position:[-45,66,115],target:[-5,2,18],fov:40},
 {name:'southeast-low',position:[55,65,115],target:[0,2,18],fov:43},
];
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:2560,height:1700}}),errors=[],loaded=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(new URL(r.url()).pathname.endsWith('.glb'))loaded.push({path:decodeURIComponent(new URL(r.url()).pathname),status:r.status()})});
 await p.goto(url+'/site.html?mode=demo');await p.waitForFunction(()=>window.siteScene?.getObjectByName('sim5-signaller'),null,{timeout:120000});
 await p.addStyleTag({content:'html,body,main{width:2560px!important;max-width:none!important;margin:0!important;padding:0!important}main>div{max-width:none!important}.sim5-stage{position:fixed!important;top:0!important;left:0!important;width:2560px!important;height:1440px!important;z-index:99999!important}.sim5-canvas{width:2560px!important;height:1440px!important;border-radius:0!important}.sim5-start-overlay,.sim5-mission-hud,.sim5-touch-dpad,.sim5-touch-inspect{visibility:hidden!important}'});
 await p.waitForFunction(()=>window.siteRenderer?.domElement.width===2560&&window.siteRenderer?.domElement.height===1440,null,{timeout:120000});
 const records=[];
 for(const view of views){
  const frame=await p.evaluate(()=>window.reviewFrameCount||0);
  await p.evaluate(view=>{window.reviewCamera=view;window.reviewFrameRequested=true;window.reviewContinuous=true},view);
  await p.waitForFunction(n=>window.reviewFrameCount>n,frame,{timeout:120000});
  await p.screenshot({path:path.join(out,view.name+'.png'),clip:{x:0,y:0,width:2560,height:1440},timeout:120000});
  await p.evaluate(()=>window.reviewContinuous=false);
  const dest=path.join(out,view.name+'.webp');await sharp(path.join(out,view.name+'.png')).webp({quality:88,effort:6}).toFile(dest);
  records.push({...view,...await sharp(dest).metadata(),bytes:fs.statSync(dest).size,sha256:createHash('sha256').update(fs.readFileSync(dest)).digest('hex')});console.log('CAPTURE',view.name,fs.statSync(dest).size);
 }
 if(errors.length||loaded.some(x=>x.status!==200))throw Error(JSON.stringify({errors,loaded}));
 const sources=loaded.map(x=>({...x,sha256:createHash('sha256').update(fs.readFileSync(path.join(repoRoot,'app/public',x.path))).digest('hex')}));
 const record={timestamp:new Date().toISOString(),renderer:'Actual RealModels; test-only cloned camera; pinned Three 0.180.0 software WebGL',runtimeModified:false,materialsModified:false,sources,views:records};fs.writeFileSync(path.join(out,'capture-provenance.json'),JSON.stringify(record,null,2));
}finally{await browser.close();server.closeAllConnections();server.close()}
