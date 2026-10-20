// Re-render the exact SIM 5.0 Three.js runtime after the white-coat change.
// This is a TEST-ONLY camera, never injected into the real game.
// On success copy actual Chromium/WebGL pixels into the shared marketing asset.
import {startServer} from "./server.mjs";
import {chromium} from "playwright";
import {repoRoot,toolRoot} from "./inspect.mjs";
import {createRequire} from "node:module";
import {createHash} from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const require=createRequire(path.join(repoRoot,"app/package.json"));
const sharp=require("sharp");
const output=path.join(toolRoot,"artifacts/white-tank");
fs.mkdirSync(output,{recursive:true});
const images=path.join(repoRoot,"app/public/images");
const shotPath=path.join(images,"sim5-site-showcase.webp");
const provenancePath=path.join(repoRoot,"docs/sim5-white-tank-review/provenance.json");
const angles=[
 {name:"southwest",position:[-45,59,113],target:[0,2,12],fov:42},
 {name:"south",position:[-8,51,109],target:[1,2,11],fov:42},
 {name:"southeast",position:[35,51,107],target:[0,2,12],fov:44},
];
const chosen=angles[0];
const {server,url}=await startServer(0);
const browser=await chromium.launch({
 executablePath:process.env.SIM5_CHROMIUM_PATH||chromium.executablePath(),
 args:["--no-sandbox","--use-angle=swiftshader","--enable-unsafe-swiftshader"],
});
try{
 const page=await browser.newPage({viewport:{width:2560,height:1600}});
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto(url+"/site.html?mode=demo");
 await page.waitForFunction(()=>{
  const scene=window.siteScene,root=scene?.getObjectByName("sim5-modern-white-storage-tanks");
  if(!root)return false;
  let painted=0;
  root.traverse(o=>{
   if(!o.isMesh)return;
   for(const mat of (Array.isArray(o.material)?o.material:[o.material]))if(mat?.name?.startsWith("SIM5_Modern_White_Tank_"))painted++;
  });
  return painted>0&&!!scene.getObjectByName("sim5-signaller");
 },null,{timeout:120000});
 const coatingReport=await page.evaluate(()=>{
  const root=window.siteScene.getObjectByName("sim5-modern-white-storage-tanks");
  const materialNames=new Set();
  let geometryCount=0;
  root.traverse(o=>{
   if(!o.isMesh)return;geometryCount++;
   for(const mat of (Array.isArray(o.material)?o.material:[o.material]))if(mat?.name?.startsWith("SIM5_Modern_White_Tank_"))materialNames.add(mat.name);
  });
  return {name:root.name,geometryCount,materials:[...materialNames]};
 });
 assert.ok(coatingReport.geometryCount>0&&coatingReport.materials.includes("SIM5_Modern_White_Tank_Large_tank"),"modern white tank material was not rendered");
 await page.addStyleTag({content:"html,body,main{width:2560px!important;max-width:none!important;margin:0!important;padding:0!important}main>div{max-width:none!important}.sim5-stage{position:fixed!important;top:0!important;left:0!important;width:2560px!important;height:1440px!important;z-index:99999!important}.sim5-canvas{width:2560px!important;height:1440px!important;border-radius:0!important}.sim5-start-overlay,.sim5-mission-hud,.sim5-touch-dpad,.sim5-touch-inspect{visibility:hidden!important}"});
 await page.waitForFunction(()=>window.siteRenderer?.domElement.width===2560&&window.siteRenderer?.domElement.height===1440,null,{timeout:120000});
 const records=[];
 for(const view of angles){
  const count=await page.evaluate(()=>window.reviewFrameCount||0);
  await page.evaluate(v=>{window.reviewCamera=v;window.reviewFrameRequested=true;window.reviewContinuous=true},view);
  await page.waitForFunction(n=>(window.reviewFrameCount||0)>n,count,{timeout:120000});
  const png=path.join(output,view.name+".png"),webp=path.join(output,view.name+".webp");
  await page.screenshot({path:png,clip:{x:0,y:0,width:2560,height:1440},timeout:120000});
  await page.evaluate(()=>window.reviewContinuous=false);
  await sharp(png).webp({quality:88,effort:6}).toFile(webp);
  records.push({...view,bytes:fs.statSync(webp).size,sha256:createHash("sha256").update(fs.readFileSync(webp)).digest("hex")});
 }
 assert.equal(errors.length,0,errors.join("\n"));
 fs.copyFileSync(path.join(output,chosen.name+".webp"),shotPath);
 const sources=["SERNEM_SIM4_Factory_optimized.glb","large_industrial_storage_tanks (1).glb"].map(name=>({
  name,sha256:createHash("sha256").update(fs.readFileSync(path.join(repoRoot,"app/public/sim5",name))).digest("hex")
 }));
 fs.mkdirSync(path.dirname(provenancePath),{recursive:true});
 const provenance={timestamp:new Date().toISOString(),source:"Actual RealModels 3D scene rendered by headless Chromium",cameraMode:"test-only cloned camera",gameplayChanged:false,modelGeometryChanged:false,tankFinish:"modern white coated steel",coatingReport,sourceModels:sources,selected:chosen.name,candidates:records,imagePath:"app/public/images/sim5-site-showcase.webp",sha256:createHash("sha256").update(fs.readFileSync(shotPath)).digest("hex")};
 fs.writeFileSync(provenancePath,JSON.stringify(provenance,null,2)+"\n");
 console.log("PASS: real modern-white-tank WebGL scene captured",JSON.stringify({selected:chosen.name,coatingReport,sha256:provenance.sha256}));
}finally{
 await browser.close();
 server.closeAllConnections();server.close();
}
