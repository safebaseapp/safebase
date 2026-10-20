import {startServer} from './server.mjs';
import {chromium} from 'playwright';
import {repoRoot,toolRoot} from './inspect.mjs';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
import fs from 'node:fs';import path from 'node:path';
const require=createRequire(path.join(repoRoot,'app/package.json')),sharp=require('sharp');
const out=path.join(toolRoot,'artifacts/pack8');fs.mkdirSync(out,{recursive:true});
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1920,height:1300}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(url+'/site.html?mode=demo');await p.waitForFunction(()=>window.siteScene?.getObjectByName('sim5-signaller'),null,{timeout:120000});
 await p.evaluate(()=>{document.querySelector('main').style.padding='0';const host=document.querySelector('.sim5-canvas');host.style.height='1080px';host.style.width='1920px';});await p.addStyleTag({content:'.sim5-start-overlay,.sim5-mission-hud,.sim5-touch-dpad,.sim5-touch-inspect{visibility:hidden!important}'});await p.waitForTimeout(100);
 const views=[{name:'south',position:[70,100,80],target:[0,1,7],fov:47},{name:'southeast',position:[85,110,100],target:[0,2,10],fov:47},{name:'wide',position:[45,115,90],target:[0,0,10],fov:48}];
 for(const view of views.filter(v=>v.name===(process.env.SIM5_SHOWCASE_VIEW||'southeast'))){const frame=await p.evaluate(()=>window.reviewFrameCount||0);await p.evaluate(view=>{window.reviewCamera=view;window.reviewFrameRequested=true;window.reviewContinuous=true},view);await p.waitForFunction(n=>window.reviewFrameCount>n,frame,{timeout:120000});await p.screenshot({path:path.join(out,`showcase-${view.name}.png`),clip:await p.locator('canvas').boundingBox(),timeout:120000});await p.evaluate(()=>window.reviewContinuous=false);}
 if(errors.length)throw Error(errors.join('\n'));
 const chosen=process.env.SIM5_SHOWCASE_VIEW||'southeast',input=path.join(out,`showcase-${chosen}.png`),dest=path.join(repoRoot,'app/public/images/sim5-site-showcase.webp');
 await sharp(input).webp({quality:86,effort:6}).toFile(dest);
 const metadata=await sharp(dest).metadata();
 const sources=['SERNEM_SIM4_Factory_optimized.glb','large_industrial_storage_tanks (1).glb','SERNEM_Welder_06_under25MB.glb'].map(name=>({name,sha256:createHash('sha256').update(fs.readFileSync(path.join(repoRoot,'app/public/sim5',name))).digest('hex')}));
 const record={timestamp:new Date().toISOString(),source:'Actual RealModels scene, pinned Three 0.180.0, original GLBs; no stock/generated imagery',camera:views.find(v=>v.name===chosen),runtimeCameraChanged:false,width:metadata.width,height:metadata.height,bytes:fs.statSync(dest).size,sha256:createHash('sha256').update(fs.readFileSync(dest)).digest('hex'),sources};fs.writeFileSync(path.join(out,'showcase-provenance.json'),JSON.stringify(record,null,2));console.log(JSON.stringify(record));
}finally{await browser.close();server.closeAllConnections();server.close()}
