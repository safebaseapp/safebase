"use client";
import { useEffect, useRef, useState } from "react";

export default function RealModels({tr}:{tr:boolean}) {
 const ref=useRef<HTMLDivElement>(null);
 const [message,setMessage]=useState(tr?"Gerçek 3D modeller yükleniyor…":"Loading real 3D models…");
 const [selected,setSelected]=useState(0);
 useEffect(()=>{
  let active=true,renderer:any,frame=0,cleanup=()=>{};
  (async()=>{
   try {
    const threeUrl="https://esm.sh/three@0.180.0";
    const THREE:any=await import(/* webpackIgnore: true */ threeUrl);
    const loaderUrl="https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
    const {GLTFLoader}=await import(/* webpackIgnore: true */ loaderUrl);
    if(!active||!ref.current)return;
    const host=ref.current,scene=new THREE.Scene();
    scene.background=new THREE.Color("#91b3c1");
    scene.add(new THREE.HemisphereLight(0xffffff,0x4b5962,2.2));
    const sun=new THREE.DirectionalLight(0xfff3df,2.4);sun.position.set(25,40,15);scene.add(sun);
    const camera=new THREE.PerspectiveCamera(65,host.clientWidth/host.clientHeight,.1,2000);
    camera.position.set(0,15,65);
    renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(host.clientWidth,host.clientHeight);host.appendChild(renderer.domElement);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.MeshStandardMaterial({color:"#586a63",roughness:.9}));
    ground.rotation.x=-Math.PI/2;ground.position.y=-.08;scene.add(ground);
    const loader=new GLTFLoader(),loaded:any[]=[];
    let yaw=Math.PI,pitch=-.13,drag=false,px=0,py=0;
    const keys=new Set<string>();
    const down=(e:KeyboardEvent)=>keys.add(e.key.toLowerCase()),up=(e:KeyboardEvent)=>keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    const onDown=(e:PointerEvent)=>{drag=true;px=e.clientX;py=e.clientY};
    const onUp=()=>drag=false;
    const onMove=(e:PointerEvent)=>{if(!drag)return;yaw-=(e.clientX-px)*.004;pitch=Math.max(-1.1,Math.min(1.1,pitch-(e.clientY-py)*.003));px=e.clientX;py=e.clientY};
    renderer.domElement.addEventListener("pointerdown",onDown);window.addEventListener("pointerup",onUp);window.addEventListener("pointermove",onMove);
    const fit=(obj:any,targetHeight:number,x:number,z:number)=>{
      const box=new THREE.Box3().setFromObject(obj),size=box.getSize(new THREE.Vector3());
      const scale=targetHeight/Math.max(size.y,.01);obj.scale.multiplyScalar(scale);
      const b=new THREE.Box3().setFromObject(obj),center=b.getCenter(new THREE.Vector3());
      obj.position.x+=x-center.x;obj.position.y-=b.min.y;obj.position.z+=z-center.z;scene.add(obj);loaded.push(obj);
    };
    const load=(url:string,h:number,x:number,z:number)=>new Promise<void>((resolve,reject)=>loader.load(url,(g:any)=>{fit(g.scene,h,x,z);resolve()},undefined,reject));
    const urls=["/sim5/factory.glb","/sim5/oil-tanks.glb"];
    const result=await Promise.allSettled([load(urls[0],23,-23,-12),load(urls[1],16,24,-8)]);
    if(active){const ok=result.filter(r=>r.status==="fulfilled").length;setSelected(ok);setMessage(ok===2?(tr?"İki gerçek model yüklendi":"Both real models loaded"):(tr?`${ok}/2 model yüklendi — eksik GLB dosyalarını seçebilirsin`:`${ok}/2 models loaded — select missing GLB files`));}
    const fileInput=document.getElementById("sim5-local-glb") as HTMLInputElement|null;
    const onFile=async(e:Event)=>{const files=Array.from((e.target as HTMLInputElement).files||[]);for(let i=0;i<files.length;i++){const file=files[i];const url=URL.createObjectURL(file);try{await load(url,i===0?23:16,i===0?-23:24,-8);setSelected(loaded.length);setMessage(tr?"Gerçek modeller sahneye eklendi":"Real models added to the scene")}catch(err){setMessage(String(err))}finally{URL.revokeObjectURL(url)}}};
    fileInput?.addEventListener("change",onFile);
    let last=performance.now();
    const animate=(now:number)=>{if(!active)return;const dt=Math.min((now-last)/1000,.05);last=now;
      const f=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw)),r=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
      if(keys.has("w")||keys.has("arrowup"))camera.position.addScaledVector(f,dt*11);
      if(keys.has("s")||keys.has("arrowdown"))camera.position.addScaledVector(f,-dt*11);
      if(keys.has("a"))camera.position.addScaledVector(r,dt*11);
      if(keys.has("d"))camera.position.addScaledVector(r,-dt*11);
      if(keys.has("arrowleft"))yaw+=dt;if(keys.has("arrowright"))yaw-=dt;
      camera.position.y=2.2;camera.lookAt(camera.position.clone().add(new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch))));
      renderer.render(scene,camera);frame=requestAnimationFrame(animate);
    };frame=requestAnimationFrame(animate);
    const resize=()=>{if(!host.clientWidth)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)};
    window.addEventListener("resize",resize);
    cleanup=()=>{fileInput?.removeEventListener("change",onFile);window.removeEventListener("resize",resize);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);window.removeEventListener("pointerup",onUp);window.removeEventListener("pointermove",onMove);renderer?.domElement?.removeEventListener("pointerdown",onDown)};
   }catch(err){if(active)setMessage("3D: "+String(err))}
  })();
  return()=>{active=false;cancelAnimationFrame(frame);cleanup();renderer?.dispose();renderer?.domElement?.remove()};
 },[tr]);
 return <section><p style={{color:"#a7e9fb"}}>{message}</p><div ref={ref} style={{height:"min(72vh,720px)",minHeight:360,borderRadius:12,overflow:"hidden",touchAction:"none"}}/><p style={{marginTop:12}}>{tr?"Model dosyaları sunucuda bulunmazsa kendi GLB dosyalarını seç:":"If the model files are not on the server, choose your GLB files:"}</p><input id="sim5-local-glb" type="file" accept=".glb,model/gltf-binary" multiple style={{padding:12,background:"#163747",borderRadius:8,color:"#fff",maxWidth:"100%"}}/><p style={{color:"#a7b8c1",fontSize:13}}>{tr?"WASD: yürü · Fareyle sürükle: bak · Yerel dosyalar yalnızca tarayıcında açılır.":"WASD: walk · Drag: look · Local files remain in your browser."} ({selected}/2)</p><p style={{fontSize:12,color:"#9cb1bb"}}>Factory: Pepe Orejel · Oil Tank: burnedhrum · CC BY 4.0</p></section>;
}
