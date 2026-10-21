import {startServer} from '../sim5-review/server.mjs';
import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';
import fs from 'node:fs';
process.env.SIM5_NAV_PROBE='1';
const label=process.argv[2]||'before';
const {server,url}=await startServer(0);
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
 const p=await browser.newPage({viewport:{width:1280,height:900}});
 await p.goto(url+'/site.html?mode=demo');
 await p.waitForFunction(()=>window.reviewNavigation&&window.siteScene?.getObjectByName('sim5-signaller'),null,{timeout:120000});
 const result=await p.evaluate(async()=>{
  const T=await import('/vendor/three/build/three.module.js');
  let rays=0;const original=T.Mesh.prototype.raycast;T.Mesh.prototype.raycast=function(...a){rays++;return original.apply(this,a)};
  const nav=window.reviewNavigation;
  const route=[[-18,-2],[-17,20],[-17,47],[0,47],[0,0],[-14,0],[-18,-2]];
  const passes=[];
  for(let pass=0;pass<5;pass++){
   nav.reset();let v=new T.Vector3(...[-18,1.8,-2]);const times=[],decisions=[];rays=0;
   for(const [x,z]of route.slice(1)){
    const n=Math.ceil(Math.hypot(x-v.x,z-v.z)/.1),dx=(x-v.x)/n,dz=(z-v.z)/n;
    for(let i=0;i<n;i++){
     const start=performance.now();const nx=v.clone();nx.x+=dx;const a=nav.step(nx,v);if(a)v.x=nx.x;
     const nz=v.clone();nz.z+=dz;const b=nav.step(nz,v);if(b)v.z=nz.z;
     times.push(performance.now()-start);decisions.push([a,b,nav.feet,v.x,v.z]);
    }
   }
   const sorted=[...times].sort((a,b)=>a-b),pct=q=>sorted[Math.floor((sorted.length-1)*q)];
   passes.push({samples:times.length,totalMs:times.reduce((a,b)=>a+b,0),medianMs:pct(.5),p95Ms:pct(.95),p99Ms:pct(.99),over50Ms:times.filter(t=>t>50).length,meshRaycasts:rays,decisions});
  }
  T.Mesh.prototype.raycast=original;
  const geometry={meshes:0,missingBounds:0};window.siteScene.traverse(o=>{if(o.isMesh){geometry.meshes++;if(!o.geometry.boundingBox)geometry.missingBounds++}});
  const r=window.siteRenderer,gl=r.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info');
  return {geometry,route,passes,renderer:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),calls:r.info.render.calls,triangles:r.info.render.triangles,pixelRatio:r.getPixelRatio(),note:'Navigation CPU microbenchmark on actual scene geometry, two axis steps per sample; not FPS or a successful end-to-end route. Review renderer is on demand.'};
 });
 const frames=process.env.SIM5_CPU_ONLY==='1'?null:await p.evaluate(async()=>{window.reviewRenderTimes=[];window.reviewContinuous=true;const intervals=[];let previous=performance.now();await new Promise(resolve=>{function sample(t){intervals.push(t-previous);previous=t;if(intervals.length>=12){window.reviewContinuous=false;resolve()}else requestAnimationFrame(sample)}requestAnimationFrame(sample)});const sorted=intervals.slice(1).sort((a,b)=>a-b);return {intervalsMs:intervals,averageFPS:1000/(sorted.reduce((a,b)=>a+b,0)/sorted.length),medianMs:sorted[Math.floor(sorted.length*.5)],p95Ms:sorted[Math.floor(sorted.length*.95)],p99Ms:sorted[Math.floor(sorted.length*.99)],over50Ms:sorted.filter(t=>t>50).length,gpuCompletedRenderMs:window.reviewRenderTimes,note:'12-frame standing diagnostic, SwiftShader with gl.finish per render; NOT real hardware FPS or the walking route.'}});result.frames=frames;result.source=process.env.SIM5_REVIEW_BASELINE||'working-tree';
 fs.writeFileSync(`docs/sim5-performance/${label}.json`,JSON.stringify(result)+'\n');
 console.log(JSON.stringify({...result,passes:result.passes.map(({decisions,...p})=>p)},null,2));
}finally{await browser.close();server.closeAllConnections();server.close()}
