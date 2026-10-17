"use client";
import { useEffect, useRef, useState } from "react";

export default function RealModels({tr}:{tr:boolean}) {
 const mount=useRef<HTMLDivElement>(null);
 const held=useRef<Set<string>>(new Set());
 const reset=useRef<()=>void>(()=>{});
 const [status,setStatus]=useState(tr?"Saha hazırlanıyor…":"Preparing site…");
 const [loaded,setLoaded]=useState(0);
 const [mode,setMode]=useState<"walk"|"overview">("overview");
 const modeRef=useRef<"walk"|"overview">("overview");
 const switchMode=(m:"walk"|"overview")=>{modeRef.current=m;setMode(m);reset.current()};
 useEffect(()=>{
  let active=true,raf=0,renderer:any,cleanup=()=>{};
  const host=mount.current;if(!host)return;
  (async()=>{
   try {
    const threeUrl="https://esm.sh/three@0.180.0";
    const THREE:any=await import(/* webpackIgnore: true */ threeUrl);
    const loaderUrl="https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
    const {GLTFLoader}=await import(/* webpackIgnore: true */ loaderUrl);
    if(!active||!mount.current)return;
    const scene=new THREE.Scene();scene.background=new THREE.Color("#91b1c5");scene.fog=new THREE.Fog("#91b1c5",160,360);
    const camera=new THREE.PerspectiveCamera(64,host.clientWidth/Math.max(1,host.clientHeight),.1,900);
    renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));renderer.setSize(host.clientWidth,host.clientHeight);
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
    host.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xe8f3ff,0x697369,2.1));
    const sun=new THREE.DirectionalLight(0xfff3dc,2.5);sun.position.set(-55,85,30);scene.add(sun);
    const material=(color:string,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness:.85,metalness});
    const asphalt=material("#444f57"),walkway=material("#a9b5af"),grass=material("#607668"),white=material("#e4e5dc"),yellow=material("#e9c34a"),fence=material("#aebec4",.35);
    const box=(x:number,y:number,z:number,w:number,h:number,d:number,m:any)=>{
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);scene.add(mesh);return mesh;
    };
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(450,450),grass);ground.rotation.x=-Math.PI/2;ground.position.y=-.14;scene.add(ground);
    // Central service road, continuous pedestrian sidewalks and safe crosswalks.
    box(0,.025,25,13,.09,155,asphalt);
    for(const side of [-1,1]){
      box(side*9,.07,25,3.5,.12,155,walkway);
      box(side*6.65,.13,25,.18,.08,155,white);
      for(let z=-48;z<99;z+=7)box(side*5.7,.13,z,.16,.05,3.2,yellow);
      for(let z=-48;z<99;z+=12){
        // Leave pedestrian gates at the entrance and opposite equipment plots.
        if((z>=-18&&z<=6)||(z>=42&&z<=66))continue;
        box(side*11,.72,z,.09,1.4,.09,fence);
        box(side*11,1.4,z,.09,.08,11.8,fence);
      }
    }
    for(let z=-48;z<100;z+=12)box(0,.14,z,.18,.05,4.1,white);
    for(let x=-5.6;x<=5.6;x+=1.2)box(x,.15,57,.65,.05,3,white);
    // Industrial equipment plots are separated from the central circulation corridor.
    box(-47,.02,-12,62,.07,85,material("#777f7c"));
    box(47,.02,-12,62,.07,85,material("#777f7c"));
    for(const x of [-15.5,15.5]){
      // Intermittent railings, with wide access gaps for entering both facilities.
      for(let z=-48;z<=24;z+=12){
        if(z>=-18&&z<=6)continue;
        box(x,.63,z,.14,1.2,.14,fence);
        box(x,1.2,z,.1,.07,10,fence);
      }
    }
    // Paved pedestrian entrances connect the road sidewalks to the equipment yards.
    for(const side of [-1,1]){
      box(side*14,.14,-6,9,.08,6,walkway);
      box(side*14,.14,47,9,.08,6,walkway);
    }
    // Entry apron and marked pedestrian access.
    box(0,.03,103,42,.08,21,asphalt);
    box(0,.15,91,11,.07,1,white);
    // Equipment yards are level, without invented columns or elevated foundations.
    const colliders:any[]=[];
    const colliderBoxes:any[]=[];
    const collisionRay=new THREE.Raycaster();
    const physicalBoxes:any[]=[];
    // Prevent walking through roadside posts and barriers without blocking marked gates.
    const solid=(x:number,y:number,z:number,w:number,h:number,d:number,m:any)=>{
      box(x,y,z,w,h,d,m);
      physicalBoxes.push(new THREE.Box3(new THREE.Vector3(x-w/2,y-h/2,z-d/2),new THREE.Vector3(x+w/2,y+h/2,z+d/2)));
    };
    // Guardrails on both sides of the service road, leaving designated access gaps.
    for(const side of [-1,1])for(let z=-48;z<99;z+=12){
      if((z>=-18&&z<=6)||(z>=42&&z<=66))continue;
      physicalBoxes.push(new THREE.Box3(new THREE.Vector3(side*11-.12,0,z-5.9),new THREE.Vector3(side*11+.12,1.5,z+5.9)));
    }
    const loader=new GLTFLoader();
    const fit=(obj:any,targetHeight:number,x:number,z:number)=>{
      obj.updateMatrixWorld(true);
      const before=new THREE.Box3().setFromObject(obj);
      const size=before.getSize(new THREE.Vector3());
      // Limit all THREE dimensions: the full pipe network must stay inside its own yard.
      const maxWidth=x<0?60:52;
      const maxDepth=x<0?80:70;
      const scale=Math.min(targetHeight/Math.max(size.y,.01),maxWidth/Math.max(size.x,.01),maxDepth/Math.max(size.z,.01));
      obj.scale.multiplyScalar(scale);
      obj.updateMatrixWorld(true);
      const scaled=new THREE.Box3().setFromObject(obj);
      const center=scaled.getCenter(new THREE.Vector3());
      obj.position.x+=x-center.x;
      obj.position.z+=z-center.z;
      // The factory model is authored with an elevated service deck. Embed its
      // low understructure into the yard rather than inventing tall support piers.
      const burial=x<0?Math.min(3.4,(scaled.max.y-scaled.min.y)*.28):0;
      obj.position.y+=.08-scaled.min.y-burial;
      obj.updateMatrixWorld(true);
      scene.add(obj);
      obj.traverse((child:any)=>{
        if(!child.isMesh)return;
        const bounds=new THREE.Box3().setFromObject(child);
        if(bounds.isEmpty()||bounds.max.y<.25||bounds.min.y>2.7)return;
        colliders.push(child);colliderBoxes.push(bounds);
      });
    };
    const load=(url:string,height:number,x:number,z:number)=>new Promise<void>((resolve,reject)=>loader.load(url,(g:any)=>{if(!active){resolve();return}fit(g.scene,height,x,z);resolve()},undefined,reject));
    const paths=["/sim5/SERNEM_SIM4_Factory_optimized.glb","/sim5/large_industrial_storage_tanks%20(1).glb"];
    const results=await Promise.allSettled([load(paths[0],17.5,-47,-12),load(paths[1],17,47,-12)]);
    if(active){const count=results.filter(r=>r.status==="fulfilled").length;setLoaded(count);setStatus(count===2?(tr?"Gerçek tesis hazır · 2/2 model":"Industrial site ready · 2/2 models"):(tr?`Model yükleme: ${count}/2 — dosya bağlantısını kontrol et`:`Model loading: ${count}/2 — check asset links`))}
    // Movement is tested against imported geometry, not only the outer site bounds.
    const canStep=(next:any,previous:any)=>{
      const delta=next.clone().sub(previous);delta.y=0;
      const distance=delta.length();if(distance<.00001)return true;
      const direction=delta.normalize();
      const reach=distance+.48;
      const capsule=new THREE.Box3(new THREE.Vector3(next.x-.43,.22,next.z-.43),new THREE.Vector3(next.x+.43,1.83,next.z+.43));
      if(physicalBoxes.some(b=>b.intersectsBox(capsule)))return false;
      const near:any[]=[];
      for(let i=0;i<colliders.length;i++){
        const b=colliderBoxes[i];
        if(b.max.x<Math.min(next.x,previous.x)-.7||b.min.x>Math.max(next.x,previous.x)+.7||
           b.max.z<Math.min(next.z,previous.z)-.7||b.min.z>Math.max(next.z,previous.z)+.7)continue;
        near.push(colliders[i]);
      }
      if(!near.length)return true;
      for(const height of [.45,1.15,1.75]){
        collisionRay.set(new THREE.Vector3(previous.x,height,previous.z),direction);
        collisionRay.near=0;collisionRay.far=reach;
        if(collisionRay.intersectObjects(near,false).length)return false;
      }
      return true;
    };
    let yaw=Math.PI,pitch=-.13,drag=false,px=0,py=0,orbitAngle=.5;
    const setCamera=()=>{
      if(modeRef.current==="overview"){camera.position.set(104,68,123);camera.lookAt(0,4,-8)}
      else {camera.position.set(0,1.8,99);yaw=Math.PI;pitch=-.06;camera.lookAt(0,1.8,60)}
    };
    reset.current=setCamera;setCamera();
    const down=(e:KeyboardEvent)=>{if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(e.key.toLowerCase())){held.current.add(e.key.toLowerCase());if(e.key.startsWith("Arrow"))e.preventDefault()}};
    const up=(e:KeyboardEvent)=>held.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    const pointerDown=(e:PointerEvent)=>{drag=true;px=e.clientX;py=e.clientY;renderer.domElement.setPointerCapture?.(e.pointerId)};
    const pointerUp=()=>drag=false;
    const pointerMove=(e:PointerEvent)=>{if(!drag)return;const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;if(modeRef.current==="walk"){yaw-=dx*.004;pitch=Math.max(-1.15,Math.min(1.15,pitch-dy*.003))}else{orbitAngle+=dx*.004}};
    renderer.domElement.addEventListener("pointerdown",pointerDown);renderer.domElement.addEventListener("pointerup",pointerUp);renderer.domElement.addEventListener("pointermove",pointerMove);
    let last=performance.now();
    const tick=(now:number)=>{
      if(!active)return;const dt=Math.min(.05,(now-last)/1000);last=now;
      if(modeRef.current==="overview"){
        const distance=145;camera.position.set(Math.sin(orbitAngle)*distance,66,Math.cos(orbitAngle)*distance);camera.lookAt(0,4,-8);
      }else{
        const forward=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));
        const right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
        const move=new THREE.Vector3();
        if(held.current.has("w")||held.current.has("arrowup"))move.add(forward);
        if(held.current.has("s")||held.current.has("arrowdown"))move.sub(forward);
        if(held.current.has("a"))move.sub(right);
        if(held.current.has("d"))move.add(right);
        if(move.lengthSq()>0){
          move.normalize().multiplyScalar(dt*7);
          // Separate axes permit sliding along tank walls and pipework.
          const xNext=camera.position.clone();xNext.x+=move.x;
          if(canStep(xNext,camera.position))camera.position.x=xNext.x;
          const zNext=camera.position.clone();zNext.z+=move.z;
          if(canStep(zNext,camera.position))camera.position.z=zNext.z;
        }
        if(held.current.has("arrowleft"))yaw+=dt*1.4;
        if(held.current.has("arrowright"))yaw-=dt*1.4;
        camera.position.x=Math.max(-80,Math.min(80,camera.position.x));
        camera.position.z=Math.max(-62,Math.min(115,camera.position.z));
        camera.position.y=1.8;
        camera.lookAt(camera.position.clone().add(new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch))));
      }
      renderer.render(scene,camera);raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    const resize=()=>{if(!host.clientWidth||!host.clientHeight)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)};
    window.addEventListener("resize",resize);
    cleanup=()=>{window.removeEventListener("resize",resize);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);renderer?.domElement?.removeEventListener("pointerdown",pointerDown);renderer?.domElement?.removeEventListener("pointerup",pointerUp);renderer?.domElement?.removeEventListener("pointermove",pointerMove)};
   }catch(e){if(active)setStatus("3D error: "+String(e))}
  })();
  return()=>{active=false;cancelAnimationFrame(raf);cleanup();renderer?.dispose();renderer?.domElement?.remove();held.current.clear()};
 },[tr]);
 const controls=[["↶","arrowleft"],["←","a"],["↑","w"],["↓","s"],["→","d"],["↷","arrowright"]];
 return <section style={{maxWidth:1600,margin:"0 auto"}}>
  <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",justifyContent:"space-between",marginBottom:12}}>
   <p style={{color:"#9de8e9",margin:0}} role="status">{status}</p>
   <div style={{display:"flex",gap:8}}>
    <button onClick={()=>switchMode("overview")} style={{padding:"10px 14px",borderRadius:8,border:mode==="overview"?"1px solid #7ed9ef":"1px solid #375769",background:mode==="overview"?"#14617b":"#142c3a",color:"white",cursor:"pointer"}}>{tr?"Kuş bakışı":"Overview"}</button>
    <button onClick={()=>switchMode("walk")} style={{padding:"10px 14px",borderRadius:8,border:mode==="walk"?"1px solid #7ed9ef":"1px solid #375769",background:mode==="walk"?"#14617b":"#142c3a",color:"white",cursor:"pointer"}}>{tr?"Sahada yürü":"Walk site"}</button>
    <button onClick={()=>reset.current()} style={{padding:"10px 14px",borderRadius:8,border:"1px solid #375769",background:"#142c3a",color:"white",cursor:"pointer"}}>{tr?"Sıfırla":"Reset"}</button>
   </div>
  </div>
  <div ref={mount} style={{width:"100%",height:"min(72vh,750px)",minHeight:380,borderRadius:14,overflow:"hidden",background:"#91b1c5",touchAction:"none"}}/>
  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginTop:12}}>
   {controls.map(([label,key])=><button key={key} disabled={mode!=="walk"} onPointerDown={e=>{e.preventDefault();held.current.add(key)}} onPointerUp={()=>held.current.delete(key)} onPointerCancel={()=>held.current.delete(key)} onPointerLeave={()=>held.current.delete(key)} style={{padding:"12px 18px",border:0,borderRadius:9,background:mode==="walk"?"#176b82":"#364a55",color:"white",fontSize:19,touchAction:"none",cursor:"pointer"}}>{label}</button>)}
   <span style={{fontSize:13,color:"#b7cdd5"}}>{mode==="walk"?(tr?"WASD ile yürü · sürükleyerek bak · açıklıklardan tesislere gir":"WASD to walk · drag to look · enter the plots through marked openings"):(tr?"Sürükleyerek tesisin etrafında dön · Yürü butonuyla girişe geç":"Drag to orbit site · select Walk to enter")}</span>
  </div>
  <p style={{fontSize:12,color:"#9cb1bb"}}>{tr?"Saha yerleşimi konsept prototipidir; gerçek bir tesisin onaylı kaçış veya trafik planı değildir.":"Concept site layout only; not an approved traffic or evacuation plan for a real facility."} · Factory: Pepe Orejel · Oil Tank: burnedhrum · CC BY 4.0 · {loaded}/2 GLB</p>
 </section>;
}
