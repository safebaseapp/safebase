/* eslint-disable @typescript-eslint/no-explicit-any -- pinned Three runtime */
type Profile = "auto" | "high" | "balanced" | "low" | "baseline";
export const sim5DiagnosticsAllowed = () => process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
export function frameStats(values:number[]) {
 const sorted=[...values].sort((a,b)=>a-b),n=sorted.length;
 const percentile=(q:number)=>n?sorted[Math.ceil(n*q)-1]:0;
 return {samples:n,fps:n?1000*n/values.reduce((a,b)=>a+b,0):0,p50:percentile(.5),p95:percentile(.95),p99:percentile(.99),over50:values.filter(x=>x>50).length,over100:values.filter(x=>x>100).length};
}
/** Render-only policy. No mission, navigation, storage or network dependencies. */
export function createRenderPerformance(T:any,scene:any,renderer:any,host:HTMLElement,tr:boolean) {
 const params=new URLSearchParams(location.search),debug=sim5DiagnosticsAllowed()&&params.get("sim5Perf")==="1";
 let profile:Profile=debug&&params.get("sim5Renderer")==="baseline"?"baseline":"auto";
 const native=Math.min(window.devicePixelRatio||1,1.8);
 let ratio=profile==="auto"?Math.min(native,1.5):native,lastSample=0,lastPublish=0,lastAdjust=performance.now(),bad=0,good=0;
 renderer.setPixelRatio(ratio);
 const intervals:number[]=[],windowFrames:number[]=[],longTasks:number[]=[];
 // Emissive millimetre sparks/arc and tiny falling drops need no solar silhouette.
 // Keep their meshes/materials/animation and all equipment/HSE shadows intact.
 const particles:any[]=[],casters:any[]=[];
 scene.traverse((o:any)=>{if(!o.isMesh)return;if(["weld-arc","weld-arc-halo","contact-spark"].includes(o.name)||(o.userData.inspectionId==="leak"&&o.geometry.type==="SphereGeometry")){particles.push({mesh:o,cast:o.castShadow});}else if(o.castShadow){casters.push({mesh:o,matrix:o.matrixWorld.clone(),visible:null,version:-1});}});
 let panel:HTMLElement|undefined,output:HTMLElement|undefined,snapshot:any={},observer:PerformanceObserver|undefined;
 if(debug){
  panel=document.createElement("aside");panel.setAttribute("aria-label",tr?"SIM performans ölçümü":"SIM performance diagnostics");panel.dataset.sim5Perf="true";
  Object.assign(panel.style,{position:"absolute",right:"8px",bottom:"70px",zIndex:"5",maxWidth:"calc(100% - 16px)",width:"300px",boxSizing:"border-box",background:"rgba(5,20,30,.94)",color:"#fff",padding:"8px",font:"11px/1.4 monospace",pointerEvents:"none",borderRadius:"8px"});
  output=document.createElement("pre");Object.assign(output.style,{whiteSpace:"pre-wrap",overflowWrap:"anywhere",margin:"0 0 6px"});panel.append(output);
  const select=document.createElement("select");select.setAttribute("aria-label",tr?"Çizim profili":"Render profile");select.style.pointerEvents="auto";select.style.maxWidth="100%";
  for(const value of ["auto","high","balanced","low","baseline"] as Profile[]){const option=document.createElement("option");option.value=value;option.textContent=value;select.append(option)}select.value=profile;
  select.onchange=()=>{profile=select.value as Profile;ratio=Math.min(native,profile==="balanced"?1.25:profile==="low"?.85:profile==="auto"?1.5:native);renderer.setPixelRatio(ratio);renderer.shadowMap.needsUpdate=true;intervals.length=windowFrames.length=0;bad=good=0;lastAdjust=performance.now();lastSample=0;};panel.append(select);
  const copy=document.createElement("button");copy.type="button";copy.textContent=tr?"Anonim ölçümü kopyala":"Copy anonymous metrics";copy.style.pointerEvents="auto";copy.onclick=()=>{void navigator.clipboard?.writeText(JSON.stringify(snapshot,null,2)).then(()=>{copy.textContent=tr?"Kopyalandı":"Copied"}).catch(()=>{copy.textContent=tr?"Kopyalanamadı":"Copy unavailable"})};panel.append(copy);host.parentElement?.append(panel);
  try{observer=new PerformanceObserver(list=>{for(const entry of list.getEntries())longTasks.push(entry.duration);if(longTasks.length>200)longTasks.splice(0,longTasks.length-200)});observer.observe({entryTypes:["longtask"]});}catch{/* Unsupported browser: explicitly reported below. */}
 }
 let shadowCalls=0,shadowTriangles=0;
 const originalShadowRender=renderer.shadowMap.render;
 if(debug)renderer.shadowMap.render=function(...args:any[]){const calls=renderer.info.render.calls,triangles=renderer.info.render.triangles;originalShadowRender.apply(renderer.shadowMap,args);shadowCalls=renderer.info.render.calls-calls;shadowTriangles=renderer.info.render.triangles-triangles;};
 const gl=debug?renderer.getContext():null,extension=gl?.getExtension("WEBGL_debug_renderer_info"),gpu=extension?gl.getParameter(extension.UNMASKED_RENDERER_WEBGL):"unavailable";
 function beforeRender(){
  const baseline=profile==="baseline";renderer.shadowMap.autoUpdate=baseline;
  for(const p of particles)p.mesh.castShadow=baseline?p.cast:false;
  if(baseline)return;
  scene.updateMatrixWorld(true);
  for(const c of casters){
   let visible=true;for(let o=c.mesh;o;o=o.parent)if(!o.visible){visible=false;break;}
   const version=c.mesh.geometry.attributes.position.version;
   if(c.visible!==visible||!c.matrix.equals(c.mesh.matrixWorld)||c.version!==version||c.mesh.isSkinnedMesh||c.mesh.morphTargetInfluences?.length){renderer.shadowMap.needsUpdate=true;c.visible=visible;c.matrix.copy(c.mesh.matrixWorld);c.version=version;}
  }
 }
 function sample(now:number,position:any,mode:string,renderMs:number,shadowUpdated:boolean,allowAdapt=true){
  if(lastSample&&now-lastSample<10000){const delta=now-lastSample;windowFrames.push(delta);if(debug){intervals.push(delta);if(intervals.length>240)intervals.shift();}}lastSample=now;
  if(allowAdapt&&profile==="auto"&&now-lastAdjust>=4000&&windowFrames.length>=8){
   const {p95}=frameStats(windowFrames);bad=p95>60?bad+2:p95>28?bad+1:0;good=p95<19?good+1:0;
   if(bad>=2&&ratio>Math.min(native,.85)){ratio=Math.max(Math.min(native,.85),Math.round((ratio-.15)*100)/100);renderer.setPixelRatio(ratio);bad=good=0;}
   else if(good>=8&&ratio<native){ratio=Math.min(native,Math.round((ratio+.1)*100)/100);renderer.setPixelRatio(ratio);bad=good=0;}
   windowFrames.length=0;lastAdjust=now;
  }
  if(windowFrames.length>240)windowFrames.shift();
  if(!debug||now-lastPublish<500)return;lastPublish=now;
  const zone=position.x< -12?(position.z>30?"lifting":"welding/factory"):(position.x>15?"tank yard":"road");
  snapshot={...frameStats(intervals),zone,mode,profile,dpr:renderer.getPixelRatio(),viewport:[host.clientWidth,host.clientHeight],gpu,shadows:renderer.shadowMap.enabled,shadowMap:2048,shadowUpdated,shadowCalls,shadowTriangles,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,renderSubmitMs:renderMs,longTasks:observer?{count:longTasks.length,maxMs:Math.max(0,...longTasks)}:"unsupported",gc:"not available",note:"Rolling 240 rendered RAF intervals; submit time is CPU, not GPU time. Calls include shadow pass. No network/storage."};
  if(output)output.textContent=`${zone} · ${mode} · ${profile}\nFPS ${snapshot.fps.toFixed(1)} | p50 ${snapshot.p50.toFixed(1)} ms\np95 ${snapshot.p95.toFixed(1)} | p99 ${snapshot.p99.toFixed(1)} ms\n>50 ${snapshot.over50} | >100 ${snapshot.over100} / ${snapshot.samples}\ncalls ${snapshot.calls} | triangles ${snapshot.triangles}\nDPR ${snapshot.dpr} | shadows 2048 ${shadowUpdated?"updated":"cached"} (${shadowCalls} calls)\n${gpu}\nlong tasks ${observer?longTasks.length:"unsupported"}`;
 }
 return {beforeRender,sample,debug,resetTiming(){lastSample=0;windowFrames.length=0;},dispose(){if(debug)renderer.shadowMap.render=originalShadowRender;observer?.disconnect();panel?.remove();}};
}
