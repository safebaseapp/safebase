"use client";
import { useEffect, useRef, useState } from "react";

export default function IndustrialScene({tr}:{tr:boolean}) {
 const mount=useRef<HTMLDivElement>(null);
 const [status,setStatus]=useState(tr?"3D saha yükleniyor":"Loading 3D site");
 useEffect(()=>{
  let disposed=false,renderer:any,frame=0;
  const keys=new Set<string>();
  const down=(e:KeyboardEvent)=>keys.add(e.key.toLowerCase());
  const up=(e:KeyboardEvent)=>keys.delete(e.key.toLowerCase());
  window.addEventListener("keydown",down);window.addEventListener("keyup",up);
  (async()=>{
   try {
    const THREE=await import("three");
    if(disposed||!mount.current)return;
    const host=mount.current;
    const scene=new THREE.Scene();scene.background=new THREE.Color("#91b5c8");scene.fog=new THREE.Fog("#91b5c8",90,280);
    const camera=new THREE.PerspectiveCamera(72,host.clientWidth/host.clientHeight,.1,600);
    camera.position.set(4,2.1,22);
    renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(host.clientWidth,host.clientHeight);renderer.shadowMap.enabled=true;host.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xffffff,0x526170,2.1));
    const sun=new THREE.DirectionalLight(0xffffff,2.1);sun.position.set(30,60,20);scene.add(sun);
    const mat=(color:string,metalness=.15)=>new THREE.MeshStandardMaterial({color,metalness,roughness:.65});
    const concrete=mat("#a2a6a3"),steel=mat("#6b828a",.6),rust=mat("#ab6e45"),yellow=mat("#e7bd34"),red=mat("#c85d42");
    const add=(geo:any,m:any,x:number,y:number,z:number)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);scene.add(o);return o};
    add(new THREE.PlaneGeometry(250,250),mat("#7a8984"),0,0,0).rotation.x=-Math.PI/2;
    for(let i=0;i<4;i++){let x=-40+i*25;add(new THREE.BoxGeometry(16,10,13),concrete,x,5,-35);for(let j=0;j<5;j++)add(new THREE.BoxGeometry(1.3,.9,.2),steel,x-6+j*3,7,-28.4);}
    for(let i=0;i<7;i++){let x=-45+i*15;let tank=add(new THREE.CylinderGeometry(5,5,10,32),i%2?steel:concrete,x,5,2);add(new THREE.CylinderGeometry(5.2,5.2,.35,32),rust,x,10.2,2);add(new THREE.CylinderGeometry(.15,.15,12,8),yellow,x+5.3,6,2);}
    for(let i=0;i<8;i++){let x=-48+i*14;add(new THREE.CylinderGeometry(1.1,1.1,17,12),steel,x,8.5,-16);add(new THREE.CylinderGeometry(1.4,1.4,1,12),rust,x,17.5,-16);}
    for(let i=0;i<6;i++){let z=-28+i*10;const pipe=add(new THREE.CylinderGeometry(.45,.45,110,12),i%2?red:yellow,0,4,z);pipe.rotation.z=Math.PI/2;for(let x=-48;x<=48;x+=16)add(new THREE.BoxGeometry(.7,4,.7),steel,x,2,z);}
    for(let i=0;i<8;i++)add(new THREE.BoxGeometry(1.1,5,1.1),yellow,-56+i*16,2.5,17);
    add(new THREE.BoxGeometry(12,.1,95),mat("#555d61"),0,.08,44);
    for(let z=3;z<85;z+=7)add(new THREE.BoxGeometry(.2,.11,3),yellow,0,.15,z);
    let yaw=Math.PI, pitch=-.08,drag=false,px=0,py=0;
    const onDown=(e:PointerEvent)=>{drag=true;px=e.clientX;py=e.clientY};
    const onUp=()=>drag=false;
    const onMove=(e:PointerEvent)=>{if(!drag)return;yaw-=(e.clientX-px)*.004;pitch=Math.max(-1.2,Math.min(1.2,pitch-(e.clientY-py)*.003));px=e.clientX;py=e.clientY};
    renderer.domElement.addEventListener("pointerdown",onDown);window.addEventListener("pointerup",onUp);window.addEventListener("pointermove",onMove);
    let last=performance.now();
    function animate(now:number){if(disposed)return;const dt=Math.min((now-last)/1000,.06);last=now;
     const f=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw)),r=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
     if(keys.has("w")||keys.has("arrowup"))camera.position.addScaledVector(f,dt*11);
     if(keys.has("s")||keys.has("arrowdown"))camera.position.addScaledVector(f,-dt*11);
     if(keys.has("a"))camera.position.addScaledVector(r,dt*11);
     if(keys.has("d"))camera.position.addScaledVector(r,-dt*11);
     if(keys.has("arrowleft"))yaw+=dt*1.5;if(keys.has("arrowright"))yaw-=dt*1.5;
     camera.position.y=2.1;camera.lookAt(camera.position.clone().add(new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch))));
     renderer.render(scene,camera);frame=requestAnimationFrame(animate);
    }
    frame=requestAnimationFrame(animate);setStatus(tr?"3D saha hazır — WASD ile yürü, sürükleyerek bak":"3D site ready — WASD to walk, drag to look");
    const resize=()=>{if(!host.clientWidth)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)};
    window.addEventListener("resize",resize);
    (host as any).__cleanup=()=>{window.removeEventListener("resize",resize);window.removeEventListener("pointerup",onUp);window.removeEventListener("pointermove",onMove);renderer.domElement.removeEventListener("pointerdown",onDown)};
   }catch(e){setStatus("3D error: "+String(e))}
  })();
  return()=>{disposed=true;cancelAnimationFrame(frame);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);(mount.current as any)?.__cleanup?.();renderer?.dispose();renderer?.domElement?.remove()};
 },[tr]);
 return <div><p style={{color:"#a7e9fb"}}>{status}</p><div ref={mount} style={{width:"100%",height:"min(70vh,720px)",minHeight:350,background:"#91b5c8",touchAction:"none",borderRadius:12,overflow:"hidden"}}/><div style={{display:"flex",gap:8,marginTop:10}}>{[["↶","arrowleft"],["↑","w"],["↓","s"],["↷","arrowright"]].map(([label,key])=><button key={key} style={{padding:"12px 18px",background:"#176b82",color:"white",border:0,borderRadius:8}} onPointerDown={()=>window.dispatchEvent(new KeyboardEvent("keydown",{key}))} onPointerUp={()=>window.dispatchEvent(new KeyboardEvent("keyup",{key}))} onPointerLeave={()=>window.dispatchEvent(new KeyboardEvent("keyup",{key}))}>{label}</button>)}</div><p style={{fontSize:12,color:"#eabf7c"}}>{tr?"Geçici geometrik saha prototipi; lisanslı Factory ve Oil Tank modelleri henüz aktarılmadı.":"Temporary geometric site prototype; licensed Factory and Oil Tank assets are not yet uploaded."}</p></div>;
}
