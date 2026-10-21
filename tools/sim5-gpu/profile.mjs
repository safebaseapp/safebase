import {startServer} from '../sim5-review/server.mjs';
import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';
import fs from 'node:fs';
process.env.SIM5_NAV_PROBE='1';
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:2});
 await p.route('**/review-three.js',r=>r.fulfill({contentType:'text/javascript',body:`export * from '/vendor/three/build/three.module.js';import {WebGLRenderer as R} from '/vendor/three/build/three.module.js';export class WebGLRenderer extends R {constructor(o){super(o);const render=this.render.bind(this);this.render=(s,c)=>{window.siteScene=s;window.siteCamera=c;window.siteRenderer=this;if(!window.runGPU)return;window.runGPU=false;this.info.autoReset=false;this.info.reset();const gl=this.getContext();gl.finish();let shadowCalls=0,shadowTriangles=0;const shadow=this.shadowMap.render.bind(this.shadowMap);this.shadowMap.render=(...a)=>{const calls=this.info.render.calls,tri=this.info.render.triangles;shadow(...a);shadowCalls=this.info.render.calls-calls;shadowTriangles=this.info.render.triangles-tri};const start=performance.now();render(s,window.gpuCamera||c);gl.finish();window.gpuResult={ms:performance.now()-start,calls:this.info.render.calls,triangles:this.info.render.triangles,shadowCalls,shadowTriangles,dpr:this.getPixelRatio()};this.shadowMap.render=shadow;}}}` }));
 await p.goto(url+'/site.html?mode=demo');await p.waitForFunction(()=>window.reviewNavigation,null,{timeout:120000});
 const results=[];
 for(const condition of ['baseline','cached-shadow','dpr1','dpr075']){
  for(const [zone,position,target] of [['welding',[-18,1.8,-2],[-22,1,-5]],['road',[0,1.8,15],[-17,1,25]],['lifting',[-17,1.8,47],[-30,3,47]],['return',[-18,1.8,-2],[-22,1,-5]]]){
   await p.evaluate(async({condition,position,target})=>{const T=await import('/vendor/three/build/three.module.js');const r=window.siteRenderer;window.gpuCamera=window.siteCamera.clone();window.gpuCamera.position.fromArray(position);window.gpuCamera.lookAt(...target);r.setPixelRatio(condition==='dpr1'?1:condition==='dpr075'?.75:1.8);r.shadowMap.autoUpdate=condition!=='cached-shadow';r.shadowMap.needsUpdate=condition!=='cached-shadow';window.gpuResult=null;window.runGPU=true},{condition,position,target});
   await p.waitForFunction(()=>window.gpuResult,null,{timeout:120000});results.push({condition,zone,...await p.evaluate(()=>window.gpuResult)});
  }
 }
 const renderer=await p.evaluate(()=>{const gl=window.siteRenderer.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)});
 fs.writeFileSync('docs/sim5-gpu/ablation.json',JSON.stringify({renderer,viewport:[1280,900],deviceScaleFactor:2,results,note:'Actual scene rasterization, gl.finish synchronized. SwiftShader CPU software GPU: not hardware FPS. Cached shadow ablation reuses baseline map, does not change materials/geometry. First zone may include compilation.'},null,2));console.log(results);
}finally{await browser.close();server.closeAllConnections();server.close()}
