"use client";
/* eslint-disable @typescript-eslint/no-explicit-any -- Three is loaded by the pinned runtime module, as in the operation modules. */
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { createWeldingOperation } from "./WeldingOperation";
import { createLiftingOperation } from "./LiftingOperation";
import { createRenderPerformance } from "./RenderPerformance";
import { createSiteNavigation } from "./SiteNavigation";
import { siteInspections, canInspectAt } from "./SiteInspections";
import { addUpperEvidence, createSignaller, addFireWatchStation } from "./SiteEvidence";
import { useMission } from "./useMission";
import { missionSummary, type MissionMode } from "./MissionState";
import { MissionPanel, MissionHud } from "./MissionPanel";
import { controlOutcomes, wrongDecisionReasons, scenarioNames } from "./MissionConsequences";
import { createMissionSceneEffects } from "./MissionSceneEffects";
import Sim5DailyReward from "./Sim5DailyReward";

const inspections=siteInspections;

export default function RealModels({tr, missionMode = "full", persist = false, unlockHref}:{tr:boolean; missionMode?: MissionMode; persist?: boolean; unlockHref?: string}) {
 const mount=useRef<HTMLDivElement>(null);
 const held=useRef<Set<string>>(new Set());
 const keyboard=useRef<Set<string>>(new Set());
 const pointers=useRef<Map<number,string>>(new Map());
 const syncInput=useCallback(()=>{held.current.clear();for(const key of keyboard.current)held.current.add(key);for(const key of pointers.current.values())held.current.add(key)},[]);
 const clearInput=useCallback(()=>{keyboard.current.clear();pointers.current.clear();held.current.clear()},[]);
 const releasePointer=useCallback((pointerId:number)=>{pointers.current.delete(pointerId);syncInput()},[syncInput]);
 const reset=useRef<()=>void>(()=>{});
 const [status,setStatus]=useState(tr?"Saha hazırlanıyor…":"Preparing site…");
 const [sceneError,setSceneError]=useState(false);
 const [loaded,setLoaded]=useState(0);
 const [activeInspection,setActiveInspection]=useState<string|null>(null);
 const {mission,missionRef,send,persistence}=useMission(missionMode,persist,tr);
 const summary=missionSummary(mission);
 const completedInspections=summary.completed;
 const discovered=summary.found;
 useEffect(()=>{if(mission.mode==="demo"&&mission.phase==="active"&&Object.values(mission.findings).every(f=>f.completed))send({type:"finish"})},[mission,send]);
 const [ready,setReady]=useState(false);
 const [inspectionFeedback,setInspectionFeedback]=useState("");
 const [nearbyHazard,setNearbyHazard]=useState<string|null>(null);
 const nearbyRef=useRef<string|null>(null);
 const inspectNearby=useRef<()=>void>(()=>{});
 const inspectionAvailable=useRef<(id:string)=>boolean>(()=>false);
 const inspectPress=useRef<{id:number;x:number;y:number}|null>(null);
 const touchInspection=useRef(false);
 const beginInspection=(e:ReactPointerEvent<HTMLButtonElement>)=>{
  touchInspection.current=e.pointerType!=="mouse";
  inspectPress.current={id:e.pointerId,x:e.clientX,y:e.clientY};
 };
 const finishInspection=(e:ReactPointerEvent<HTMLButtonElement>)=>{
  const press=inspectPress.current;inspectPress.current=null;
  if(touchInspection.current&&press?.id===e.pointerId&&Math.hypot(e.clientX-press.x,e.clientY-press.y)<12){e.preventDefault();inspectNearby.current();}
 };
 const clickInspection=(e:ReactMouseEvent<HTMLButtonElement>)=>{if(e.detail===0||!touchInspection.current)inspectNearby.current()};
 const cancelInspection=()=>{inspectPress.current=null};
 const inspectionEvents={onPointerDown:beginInspection,onPointerUp:finishInspection,onPointerCancel:cancelInspection,onLostPointerCapture:cancelInspection,onClick:clickInspection};
 const inspectionRecords=Object.fromEntries(Object.entries(inspections).map(([id,h])=>[id,{...h,completed:completedInspections.includes(id)}]));
 const [mode,setMode]=useState<"walk"|"overview">("overview");
 const modeRef=useRef<"walk"|"overview">("overview");
 const startMission=()=>{clearInput();send({type:"start"});modeRef.current="walk";setMode("walk");reset.current();if(window.matchMedia("(pointer:coarse),(max-width:700px)").matches)requestAnimationFrame(()=>mount.current?.scrollIntoView({block:"center"}));};
 const restartMission=()=>{clearInput();send({type:"restart"});setInspectionFeedback("");setActiveInspection(null);nearbyRef.current=null;setNearbyHazard(null);reset.current();};
 useEffect(()=>{if(mission.phase!=="active")clearInput()},[mission.phase,clearInput]);
 const switchMode=(m:"walk"|"overview")=>{clearInput();modeRef.current=m;setMode(m);reset.current()};
 useEffect(()=>{
  let active=true,raf=0,renderer:any,cleanup=()=>{},contextUnavailable=false;
  const contextLost=(event:Event)=>{
   event.preventDefault();
   if(!active)return;
   // Stop scheduling GPU work if the context disappears during rendering.
   contextUnavailable=true;
   cancelAnimationFrame(raf);
   clearInput();
   const reportReady=missionRef.current.phase==="finished"||missionRef.current.phase==="cancelled";
   if(!reportReady)send({type:"pause"});
   setReady(false);
   setSceneError(true);
   setStatus(reportReady
    ? (tr?"3D görüntü durdu; görev raporun bu sayfada korunuyor.":"The 3D view stopped; your mission report remains on this page.")
    : (tr?"WebGL görüntüsü kesildi. Sahneyi yeniden yükle.":"WebGL rendering stopped. Reload the scene."));
  };
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
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);
    renderer.domElement.addEventListener("webglcontextlost",contextLost);
    scene.add(new THREE.HemisphereLight(0xd8ebff,0x687363,1.35));
    const sun=new THREE.DirectionalLight(0xffedcf,2.8);sun.position.set(-65,95,42);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-120;sun.shadow.camera.right=120;sun.shadow.camera.top=120;sun.shadow.camera.bottom=-120;sun.shadow.camera.near=1;sun.shadow.camera.far=240;sun.shadow.bias=-.00025;sun.shadow.normalBias=.035;scene.add(sun);
    const material=(color:string,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness:.85,metalness});
    const asphalt=material("#444f57"),walkway=material("#a9b5af"),grass=material("#607668"),white=material("#e4e5dc"),yellow=material("#e9c34a"),fence=material("#aebec4",.35);
    const surfaceTexture=(base:string,variation:number,scale:number)=>{
      const canvas=document.createElement("canvas");canvas.width=256;canvas.height=256;
      const ctx=canvas.getContext("2d");if(!ctx)return null;
      ctx.fillStyle=base;ctx.fillRect(0,0,256,256);
      for(let i=0;i<6500;i++){const v=Math.floor(80+Math.random()*120);ctx.fillStyle=`rgba(${v},${v},${v},${Math.random()*variation})`;ctx.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}
      const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(scale,scale);texture.colorSpace=THREE.SRGBColorSpace;return texture;
    };
    const roadTexture=surfaceTexture("#515b60",.14,16),concreteTexture=surfaceTexture("#a3a9a4",.12,12);
    if(roadTexture){asphalt.map=roadTexture;asphalt.color.set("#ffffff");asphalt.needsUpdate=true;}
    if(concreteTexture){walkway.map=concreteTexture;walkway.color.set("#ffffff");walkway.needsUpdate=true;}
    const box=(x:number,y:number,z:number,w:number,h:number,d:number,m:any)=>{
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=h>.2;mesh.receiveShadow=true;scene.add(mesh);return mesh;
    };
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(450,450),grass);ground.rotation.x=-Math.PI/2;ground.position.y=-.14;ground.receiveShadow=true;scene.add(ground);
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
    const physicalBoxes:any[]=[];
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
        child.castShadow=true;child.receiveShadow=true;
        const bounds=new THREE.Box3().setFromObject(child);
        if(bounds.isEmpty()||bounds.max.y<.25)return;
        colliders.push(child);colliderBoxes.push(bounds);
      });
    };
    // The source storage-tank GLB includes a rusty baked albedo. Refinish only
    // the STORAGE-TANK model with modern painted steel; keep its geometry,
    // stairs, railings, UVs, world transforms and collision meshes untouched.
    // Never recolor the factory model (which also includes white cylinders).
    const tankCoatings:Record<string,[string,number,number]>={
      "Large_tank":["#eff4f1",.61,.17],
      "Round_Tank_Material":["#f1f4f2",.65,.14],
      "Long_TankLong_TankA_Material":["#dce7e6",.63,.23],
      "Long_Tanklambert3":["#c3d3d8",.59,.32],
      "lambert3":["#a8bec7",.55,.39],
    };
    const applyModernTankFinish=(root:any)=>{
      const refinished=new Map<string,any>();
      let coated=0;
      root.traverse((child:any)=>{
        if(!child.isMesh)return;
        const coat=(previous:any)=>{
          const key=previous?.name||"";
          const spec=tankCoatings[key];
          if(!spec)return previous;
          let finish=refinished.get(key);
          if(!finish){
            finish=new THREE.MeshStandardMaterial({
              name:"SIM5_Modern_White_Tank_"+key,
              color:spec[0],roughness:spec[1],metalness:spec[2],
              side:previous.side??THREE.FrontSide,
            });
            refinished.set(key,finish);
          }
          coated++;
          return finish;
        };
        child.material=Array.isArray(child.material)?child.material.map(coat):coat(child.material);
      });
      if(!coated)throw new Error("Storage tank finishes were not found in the loaded GLB.");
      root.userData.sim5TankFinish="modern-white";
      root.name="sim5-modern-white-storage-tanks";
    };
    const load=(url:string,height:number,x:number,z:number)=>new Promise<void>((resolve,reject)=>loader.load(url,(g:any)=>{
      if(!active){resolve();return}
      try{
        if(x>0)applyModernTankFinish(g.scene);
        fit(g.scene,height,x,z);resolve();
      }catch(error){reject(error)}
    },undefined,reject));
    const paths=["/sim5/SERNEM_SIM4_Factory_optimized.glb","/sim5/large_industrial_storage_tanks%20(1).glb"];
    const results=await Promise.allSettled([load(paths[0],17.5,-47,-12),load(paths[1],17,47,-12)]);
    if(results.some(r=>r.status==="rejected"))throw new Error(tr?"Tesis modelleri yüklenemedi; yeniden yüklemeyi dene.":"Site models could not load; try reloading.");
    if(active){const count=results.filter(r=>r.status==="fulfilled").length;setLoaded(count);setStatus(count===2?(tr?"Gerçek tesis hazır · 2/2 model":"Industrial site ready · 2/2 models"):(tr?`Model yükleme: ${count}/2 — dosya bağlantısını kontrol et`:`Model loading: ${count}/2 — check asset links`))}
    // Visible site conditions replace the oversized interaction spheres.
    const inspectionMarkers:any[]=[];
    const darkMetal=material("#505b62",.5),rust=material("#a85d36"),wood=material("#8b6747");
    const place=(mesh:any,x:number,y:number,z:number,id?:string)=>{
      mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;if(id)mesh.userData.inspectionId=id;scene.add(mesh);
      if(id)inspectionMarkers.push(mesh);return mesh;
    };
    // Tank-yard leak: pipe joint, flange, drip and irregular liquid spill.
    const leakX=22,leakZ=-20;
    // Supported pipework with a visible elbow, valve and bolted joint.
    const pipe=place(new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,3.5,16),darkMetal),leakX,1.25,leakZ);
    pipe.rotation.z=Math.PI/2;
    // Pipe rack continuation connects the leaking spool to the tank-yard
    // process network, rather than leaving a floating isolated pipe segment.
    const pipeRuns:[[number,number,number],[number,number,number]][]=[
      [[leakX+1.75,1.25,leakZ],[36,1.25,leakZ]],
      [[36,1.25,leakZ],[36,1.25,-10]],
      [[36,1.25,-10],[43,1.25,-10]]
    ];
    for(const [a,b] of pipeRuns){
      const p1=new THREE.Vector3(...a),p2=new THREE.Vector3(...b);
      const direction=p2.clone().sub(p1),length=direction.length();
      const run=new THREE.Mesh(new THREE.CylinderGeometry(.21,.21,length,14),darkMetal);
      run.position.copy(p1.add(p2).multiplyScalar(.5));
      run.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());
      run.castShadow=true;run.receiveShadow=true;scene.add(run);
    }
    for(const [x,z] of [[27,leakZ],[33,leakZ],[36,-16],[39,-10]]){
      box(x,.66,z,.16,1.12,.22,darkMetal);
      box(x,.14,z,.7,.12,.65,darkMetal);
    }
    for(const dx of [-1.35,1.35]){
      box(leakX+dx,.68,leakZ,.15,1.15,.17,darkMetal);
      box(leakX+dx,.17,leakZ,.65,.13,.7,darkMetal);
    }
    place(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.45,12),darkMetal),leakX+.9,1.55,leakZ);
    place(new THREE.Mesh(new THREE.TorusGeometry(.3,.035,8,24),material("#b3472f",.35)),leakX+.9,1.83,leakZ).rotation.x=Math.PI/2;
    for(let i=0;i<8;i++){const a=i*Math.PI/4;place(new THREE.Mesh(new THREE.SphereGeometry(.045,7,6),material("#aeb6b3",.6)),leakX,1.25+Math.cos(a)*.31,leakZ+Math.sin(a)*.31)}
    place(new THREE.Mesh(new THREE.TorusGeometry(.34,.09,10,18),rust),leakX,1.25,leakZ,"leak").rotation.y=Math.PI/2;
    const spillShape=new THREE.Shape();
    for(let i=0;i<=48;i++){const a=i*Math.PI*2/48;const radius=1+.14*Math.sin(5*a)+.09*Math.sin(11*a);const x=Math.cos(a)*radius*1.65,y=Math.sin(a)*radius*.9;if(i===0)spillShape.moveTo(x,y);else spillShape.lineTo(x,y)}
    const puddle=place(new THREE.Mesh(new THREE.ShapeGeometry(spillShape),new THREE.MeshStandardMaterial({color:"#353d37",roughness:.22,metalness:.12,transparent:true,opacity:.78,side:THREE.DoubleSide,depthWrite:false})),leakX,.18,leakZ+.65,"leak");
    puddle.rotation.x=-Math.PI/2;
    // Two restrained flange faces make the joint itself the leak origin.
    for(const dx of [-.13,.13]){
      const flange=place(new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.07,24),darkMetal),leakX+dx,1.25,leakZ,"leak");
      flange.rotation.z=Math.PI/2;
    }
    // Animated droplets fall from the underside of the leaking flange into
    // the existing irregular puddle. No rigid diagonal "stick" geometry.
    const leakDrops:any[]=[];
    const dropMat=new THREE.MeshPhysicalMaterial({color:"#353c31",roughness:.18,metalness:.12,transparent:true,opacity:.9});
    for(let i=0;i<5;i++){
      const drop=place(new THREE.Mesh(new THREE.SphereGeometry(.027+i%2*.008,10,8),dropMat),leakX,.9,leakZ+.3,"leak");
      drop.scale.y=1.7;leakDrops.push(drop);
    }
    // A slight wet stain directly below the flange visually joins the
    // leak source to the collection area.
    const wetMark=place(new THREE.Mesh(new THREE.CircleGeometry(.23,24),new THREE.MeshStandardMaterial({color:"#333b32",roughness:.24,transparent:true,opacity:.65,depthWrite:false,side:THREE.DoubleSide})),leakX,.135,leakZ+.34,"leak");
    wetMark.rotation.x=-Math.PI/2;
    // Geometry-derived welding station. Source pose and equipment are inspected
    // in WeldingOperation; no guessed site-space hand, visor or arc coordinates.
    const workX=-22,workZ=-5;
    let weldingOperation:ReturnType<typeof createWeldingOperation>|null=null;
    try{
      const gltf=await loader.loadAsync("/sim5/SERNEM_Welder_06_under25MB.glb");
      if(!active)return;
      weldingOperation=createWeldingOperation(THREE,gltf.scene,tr);
      weldingOperation.group.position.add(new THREE.Vector3(workX,.06,workZ));
      scene.add(weldingOperation.group);
      scene.add(createSignaller(THREE,gltf.scene));
      weldingOperation.group.updateMatrixWorld(true);
      weldingOperation.group.traverse((obj:{isMesh?:boolean;name:string;userData:{part?:string}})=>{
        if(!obj.isMesh)return;
        inspectionMarkers.push(obj);
        // Table and power unit are solid in walk mode; cables are not walls.
        if(obj.name==="bench-top"||obj.userData.part==="power-source"){
          const bounds=new THREE.Box3().setFromObject(obj);
          if(bounds.max.y>.25){colliders.push(obj);colliderBoxes.push(bounds);}
        }
      });
    }catch(error){
      throw error;
    }
    // Front-yard lifting pad, beyond the factory footprint and off the road.
    const liftingX=-30,liftingZ=47;
    const liftingOperation=createLiftingOperation(THREE,tr);
    liftingOperation.group.position.set(liftingX,.06,liftingZ);
    scene.add(liftingOperation.group);
    liftingOperation.group.updateMatrixWorld(true);
    liftingOperation.group.traverse((obj:{isMesh?:boolean;name:string})=>{
      if(!obj.isMesh)return;
      inspectionMarkers.push(obj);
      if(["crane-chassis","crane-tire","outrigger-mat","outrigger-extension","barrier-post","barrier-foot"].includes(obj.name)){
        colliders.push(obj);colliderBoxes.push(new THREE.Box3().setFromObject(obj));
      }
    });
    // Combustibles remain an intentional hot-work HSE decision, independent
    // of the corrected operator, protective equipment and electrical circuit.
    for(const dx of [-2.4,-1.8]){
      const drum=place(new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.74,20),material("#915337",.12)),workX+dx,.37,workZ+2.1,"hotwork");
      drum.castShadow=true;
    }
    // Tank-yard scene: realistic proportions, no billboard-like warning slabs.
    // A few compact service skids provide scale without overwhelming the tanks.
    const skidSteel=material("#62717b",.42);
    for(const [sx,sz] of [[35,-32],[57,5]]){
      box(sx,.23,sz,2.1,.27,1.05,skidSteel);
      for(const dx of [-.7,.7])box(sx+dx,.48,sz,.14,.34,.85,darkMetal);
      const servicePipe=place(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,1.9,16),skidSteel),sx,.72,sz);
      servicePipe.rotation.z=Math.PI/2;
    }
    // A visible containment tray beneath the stored drums.
    box(29,.11,-29,3.55,.1,2.55,darkMetal);
    for(const x of [27.28,30.72])box(x,.23,-29,.09,.23,2.55,darkMetal);
    for(const z of [-30.22,-27.78])box(29,.23,z,3.55,.23,.09,darkMetal);
    // Drum storage on a low bunded pallet, placed away from the leak.
    box(29,.17,-29,3.2,.18,2.15,wood);
    for(const [cx,cz] of [[28.25,-29.5],[29.5,-29.5],[28.25,-28.55],[29.5,-28.55]]){
      place(new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.68,18),material("#32516b",.14)),cx,.61,cz);
    }
    // Visible warning paint on the yard surface.
    const warning=material("#e0b83c");
    for(const dx of [-3.2,3.2])box(workX+dx,.14,workZ, .14,.025,5.8,warning);
    for(const dz of [-2.8,2.8])box(workX,.14,workZ+dz,6.4,.025,.14,warning);
    // Obstructed yard entrance: stacked timber pallets and crates beside the equipment access route.
    const accessX=19.5,accessZ=-5;
    for(let layer=0;layer<3;layer++){
      for(const dz of [-.65,0,.65])place(new THREE.Mesh(new THREE.BoxGeometry(2.8,.16,.47),wood),accessX,.27+layer*.25,accessZ+dz,"access");
      for(const dx of [-1,0,1])place(new THREE.Mesh(new THREE.BoxGeometry(.24,.12,2.15),wood),accessX+dx,.14+layer*.25,accessZ,"access");
    }
    place(new THREE.Mesh(new THREE.BoxGeometry(.95,.9,.85),material("#b59c78")),accessX+.7,1.2,accessZ,"access");
    physicalBoxes.push(new THREE.Box3(new THREE.Vector3(accessX-1.5,.2,accessZ-1.4),new THREE.Vector3(accessX+1.5,1.9,accessZ+1.4)));
    physicalBoxes.push(new THREE.Box3(new THREE.Vector3(-36.2,0,40.8),new THREE.Vector3(-18.8,15,53.2)));
    box(-17.5,.02,56,3,.08,3,walkway);
    const upperEvidence=addUpperEvidence(THREE,scene,inspectionMarkers);
    const consequences=createMissionSceneEffects(THREE,scene,tr,upperEvidence);
    consequences.sync(Object.entries(missionRef.current.findings).filter(([,finding])=>finding.completed).map(([id])=>id));
    let appliedFindings=missionRef.current.findings;
    addFireWatchStation(THREE,scene,tr);
    const sightRay=new THREE.Raycaster();
    const available=(id:string)=>{
      const h=inspections[id];if(!Object.hasOwn(missionRef.current.findings,id)||missionRef.current.phase!=="active"||modeRef.current!=="walk"||!h||!canInspectAt(h,camera.position))return false;
      camera.updateMatrixWorld(true);
      const projected=new THREE.Vector3(...h.location).project(camera);
      if(projected.z< -1||projected.z>1||Math.abs(projected.x)>.98||Math.abs(projected.y)>.98)return false;
      const direction=new THREE.Vector3(...h.location).sub(camera.position),distance=direction.length();
      sightRay.set(camera.position,direction.normalize());sightRay.near=.1;sightRay.far=Math.max(.1,distance-.15);
      return !sightRay.intersectObjects(colliders,false).some((hit:any)=>hit.object.userData.inspectionId!==id);
    };
    const inspectRay=new THREE.Raycaster(),inspectPointer=new THREE.Vector2();let startX=0,startY=0;
    const inspect=(e:PointerEvent)=>{
      if(modeRef.current!=="walk"||Math.hypot(e.clientX-startX,e.clientY-startY)>12)return;
      const rect=renderer.domElement.getBoundingClientRect();
      if(!rect.width||!rect.height)return;
      inspectPointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
      inspectRay.setFromCamera(inspectPointer,camera);
      const hit=inspectRay.intersectObjects(inspectionMarkers)[0];
      if(hit){
        const worldHit=hit.point;
        const targetId=hit.object.userData.inspectionId;
        if(targetId&&available(targetId)&&camera.position.distanceTo(worldHit)<10){
          send({type:"discover",id:targetId,position:camera.position.toArray()});clearInput();setActiveInspection(targetId);setInspectionFeedback("");
        }
      }
    };
    renderer.domElement.addEventListener("pointerup",inspect);
    inspectionAvailable.current=available;
    inspectNearby.current=()=>{const id=nearbyRef.current;if(id&&available(id)){send({type:"discover",id,position:camera.position.toArray()});clearInput();setActiveInspection(id);setInspectionFeedback("")}};
    box(63.3,.125,-16.1,1.05,.25,1.5,walkway);
    // Close the measured 8 cm seam between the two authored stair landings.
    box(63.3,5.115,-21.95,.83,.08,.5,darkMetal);
    // The upper landing has a second measured seam at X=62.8.
    box(62.8,9.81,-26.65,.48,.08,.83,darkMetal);
    // Positive walking deck over the authored inter-tank service bridge.
    // Tank crowns support the ends; two longitudinal beams carry the span.
    box(51.35,11.17,-26.65,7.9,.08,.86,darkMetal);
    for(const z of [-27.1,-26.2]){
      physicalBoxes.push(new THREE.Box3(new THREE.Vector3(47.5,11.21,z-.04),new THREE.Vector3(55.2,12.35,z+.04)));
      box(51.35,11.02,z,7.9,.25,.12,darkMetal);
      for(const h of [11.77,12.32])box(51.35,h,z,7.7,.055,.055,fence);
      box(51.35,11.29,z,7.7,.15,.025,darkMetal);
      for(let x=47.5;x<55.3;x+=1.45)box(x,11.77,z,.055,1.1,.055,fence);
    }
    const renderPerformance=createRenderPerformance(THREE,scene,renderer,host,tr);
    renderer.info.autoReset=false;
    const navigation=createSiteNavigation(THREE,scene,colliders,colliderBoxes,physicalBoxes);
    const canStep=navigation.step;
    let yaw=Math.PI,pitch=-.13,drag=false,px=0,py=0,orbitAngle=.5;
    let dragPointer:number|null=null;
    const setCamera=()=>{
      clearInput();drag=false;dragPointer=null;navigation.reset();setActiveInspection(null);
      if(modeRef.current==="overview"){camera.position.set(104,68,123);camera.lookAt(0,4,-8)}
      else {camera.position.set(0,1.8,90);yaw=Math.PI;pitch=-.06;camera.lookAt(0,1.8,60)}
    };
    reset.current=setCamera;setCamera();
    const isTyping=(target:EventTarget|null)=>target instanceof HTMLElement&&!!target.closest("input,textarea,select,[contenteditable='true']");
    const down=(e:KeyboardEvent)=>{
      if(missionRef.current.phase!=="active"||modeRef.current!=="walk"||isTyping(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;
      const key=e.key.toLowerCase();
      if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(key)){
        e.preventDefault();if(e.repeat&&!keyboard.current.has(key))return;keyboard.current.add(key);syncInput();
      }
    };
    const up=(e:KeyboardEvent)=>{keyboard.current.delete(e.key.toLowerCase());syncInput()};
    const blur=()=>{clearInput();drag=false;dragPointer=null};
    const visibility=()=>{if(document.hidden)blur()};
    const release=(e:PointerEvent)=>releasePointer(e.pointerId);
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);window.addEventListener("blur",blur);
    window.addEventListener("pointerup",release);window.addEventListener("pointercancel",release);window.addEventListener("lostpointercapture",release);
    document.addEventListener("visibilitychange",visibility);
    const pointerDown=(e:PointerEvent)=>{
      if((e.pointerType==="mouse"&&e.button!==0)||dragPointer!==null)return;
      drag=true;dragPointer=e.pointerId;px=e.clientX;py=e.clientY;startX=px;startY=py;renderer.domElement.setPointerCapture?.(e.pointerId);
    };
    const pointerUp=(e:PointerEvent)=>{if(e.pointerId===dragPointer){drag=false;dragPointer=null}};
    const pointerMove=(e:PointerEvent)=>{if(!drag||e.pointerId!==dragPointer)return;const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;if(modeRef.current==="walk"){yaw-=dx*.004;pitch=Math.max(-1.15,Math.min(1.15,pitch-dy*.003))}else{orbitAngle+=dx*.004}};
    // Touch gestures should rotate the 3D camera rather than scroll the page.
    renderer.domElement.style.touchAction="none";
    renderer.domElement.addEventListener("pointerdown",pointerDown);renderer.domElement.addEventListener("pointerup",pointerUp);renderer.domElement.addEventListener("pointercancel",pointerUp);renderer.domElement.addEventListener("lostpointercapture",pointerUp);renderer.domElement.addEventListener("pointermove",pointerMove);
    let last=performance.now(),simulationSeconds=0,lastReportRender=0;
    const tick=(now:number)=>{
      if(!active||contextUnavailable)return;
      // Keep the preview lightweight when its browser tab is not visible.
      // Continue scheduling so rendering resumes automatically on return.
      if(document.hidden){renderPerformance.resetTiming();last=now;raf=requestAnimationFrame(tick);return;}
      // Reports do not need full-frame-rate 3D updates. Keep the scene
      // viewable while reducing GPU demand until the next attempt starts.
      const terminal=missionRef.current.phase==="finished"||missionRef.current.phase==="cancelled";
      if(terminal&&now-lastReportRender<250){last=now;raf=requestAnimationFrame(tick);return;}
      if(terminal)lastReportRender=now;
      const dt=Math.min(.05,(now-last)/1000);last=now;
      if(missionRef.current.phase==="active"||missionRef.current.phase==="briefing")simulationSeconds+=dt;
      if(modeRef.current==="overview"){
        const distance=145;camera.position.set(Math.sin(orbitAngle)*distance,66,Math.cos(orbitAngle)*distance);camera.lookAt(0,4,-8);
      }else{
        const forward=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw));
        // Camera-right is forward crossed with world-up (the old vector pointed left).
        const right=forward.clone().cross(new THREE.Vector3(0,1,0));
        const move=new THREE.Vector3();
        if(held.current.has("w")||held.current.has("arrowup"))move.add(forward);
        if(held.current.has("s")||held.current.has("arrowdown"))move.sub(forward);
        if(held.current.has("a")||held.current.has("arrowleft"))move.sub(right);
        if(held.current.has("d")||held.current.has("arrowright"))move.add(right);
        if(missionRef.current.phase==="active"&&move.lengthSq()>0){
          move.normalize().multiplyScalar(dt*(navigation.feet>.35?2:7));
          // Separate axes permit sliding along tank walls and pipework.
          const xNext=camera.position.clone();xNext.x+=move.x;
          if(canStep(xNext,camera.position))camera.position.x=xNext.x;
          const zNext=camera.position.clone();zNext.z+=move.z;
          if(canStep(zNext,camera.position))camera.position.z=zNext.z;
        }
        camera.position.x=Math.max(-80,Math.min(80,camera.position.x));
        camera.position.z=Math.max(-62,Math.min(115,camera.position.z));
        navigation.update(camera,dt);
        camera.lookAt(camera.position.clone().add(new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch))));
      }
      if(modeRef.current==="walk"){
        const closest=Object.values(inspections).filter(h=>available(h.id)).sort((a,b)=>camera.position.distanceTo(new THREE.Vector3(...a.location))-camera.position.distanceTo(new THREE.Vector3(...b.location)))[0];
        const next=closest?.id||null;
        if(next!==nearbyRef.current){nearbyRef.current=next;setNearbyHazard(next);if(next&&!missionRef.current.findings[next].discovered)send({type:"discover",id:next,position:camera.position.toArray()})}
      }else if(nearbyRef.current){nearbyRef.current=null;setNearbyHazard(null)}
      // Staggered gravity-like drops: origin at flange, landing at the puddle.
      for(let i=0;i<leakDrops.length;i++){
        const phase=((simulationSeconds*.52+i/leakDrops.length)%1);
        const drop=leakDrops[i];
        drop.position.set(leakX+.035*Math.sin(i*2.1),1.07-(phase*phase)*.88,leakZ+.29+phase*.18);
        drop.visible=phase<.96;
      }
      if(appliedFindings!==missionRef.current.findings){appliedFindings=missionRef.current.findings;consequences.sync(Object.entries(appliedFindings).filter(([,finding])=>finding.completed).map(([id])=>id));}
      const missionNow=missionRef.current;
      weldingOperation?.update(simulationSeconds,!missionNow.findings.hotwork.completed);
      renderPerformance.beforeRender();
      const shadowUpdated=renderer.shadowMap.autoUpdate||renderer.shadowMap.needsUpdate;
      renderer.info.reset();
      const renderStarted=renderPerformance.debug?performance.now():0;
      renderer.render(scene,camera);
      renderPerformance.sample(now,camera.position,modeRef.current,renderPerformance.debug?performance.now()-renderStarted:0,shadowUpdated,!terminal);
      if(!contextUnavailable)raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    const resize=()=>{renderPerformance.resetTiming();clearInput();drag=false;dragPointer=null;if(!host.clientWidth||!host.clientHeight)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)};
    // Window resize alone misses responsive parent/layout changes. Observe
    // the actual canvas container so its aspect ratio stays accurate on mobile.
    const sizeObserver=typeof ResizeObserver!=="undefined"?new ResizeObserver(resize):null;
    sizeObserver?.observe(host);
    window.addEventListener("resize",resize);
    resize();
    if(active)setReady(results.every(r=>r.status==="fulfilled")&&!!weldingOperation);
    cleanup=()=>{renderPerformance.dispose();sizeObserver?.disconnect();window.removeEventListener("resize",resize);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);window.removeEventListener("blur",blur);window.removeEventListener("pointerup",release);window.removeEventListener("pointercancel",release);window.removeEventListener("lostpointercapture",release);document.removeEventListener("visibilitychange",visibility);renderer?.domElement?.removeEventListener("pointerdown",pointerDown);renderer?.domElement?.removeEventListener("pointerup",pointerUp);renderer?.domElement?.removeEventListener("pointercancel",pointerUp);renderer?.domElement?.removeEventListener("lostpointercapture",pointerUp);renderer?.domElement?.removeEventListener("pointerup",inspect);renderer?.domElement?.removeEventListener("pointermove",pointerMove)};
   }catch(e){if(active){setReady(false);setSceneError(true);setStatus((tr?"3D sahne açılamadı. WebGL destekleyen bir tarayıcıda yeniden dene. ":"Unable to open the 3D scene. Retry in a WebGL-capable browser. ")+String(e))}}
  })();
  return()=>{active=false;cancelAnimationFrame(raf);cleanup();renderer?.domElement?.removeEventListener("webglcontextlost",contextLost);renderer?.dispose();renderer?.domElement?.remove();clearInput()};
 },[tr,clearInput,syncInput,releasePointer,missionRef,send]);

 const controls:[string,string,string,string][]=[
  ["←","a","Sola git","Strafe left"],
  ["↑","w","İleri git","Move forward"],
  ["↓","s","Geri git","Move backward"],
  ["→","d","Sağa git","Strafe right"],
 ];
 const touchButtons:[string,string,number,number,string,string][]=[
  ["↑","w",2,1,"İleri","Forward"],
  ["←","a",1,2,"Sol","Left"],
  ["↓","s",2,2,"Geri","Back"],
  ["→","d",3,2,"Sağ","Right"]
 ];
 const holdKey=(key:string,e:ReactPointerEvent<HTMLButtonElement>)=>{
  if(missionRef.current.phase!=="active"||modeRef.current!=="walk")return;
  if(e.pointerType==="mouse"&&e.button!==0)return;
  e.preventDefault();pointers.current.set(e.pointerId,key);syncInput();
  try{e.currentTarget.setPointerCapture(e.pointerId)}catch{/* button can detach after mode change */}
 };
 const releaseKey=(e:ReactPointerEvent<HTMLButtonElement>)=>{releasePointer(e.pointerId)};
 return <>
  <style>{`
   .sim5-inspection button{box-sizing:border-box;min-height:44px}
   .sim5-stage{position:relative;width:100%;min-width:0;isolation:isolate}
   .sim5-canvas{height:min(72vh,750px);min-height:380px}
   .sim5-start-overlay{position:absolute;top:16px;left:16px;z-index:4;width:min(370px,calc(100% - 32px));box-sizing:border-box;padding:16px;background:rgba(7,29,43,.95);border:1px solid #8ddae6;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.28);color:#effdff}
   .sim5-start-overlay strong{display:block;font-size:17px;line-height:1.4}
   .sim5-start-overlay p{margin:8px 0 12px;font-size:13px;line-height:1.5;color:#c6e4ea}
   .sim5-start-overlay button{min-height:44px;padding:10px 18px;border:0;border-radius:9px;background:#8ee6f0;color:#082334;font-size:15px;font-weight:800;cursor:pointer}
   .sim5-start-overlay button:disabled{opacity:.6;cursor:wait}
   .sim5-touch-dpad,.sim5-touch-inspect{display:none}
   .sim5-desktop-controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:12px}
   .sim5-desktop-controls button{min-width:52px;min-height:48px;border:0;border-radius:9px;background:#176b82;color:#fff;font-size:19px;touch-action:none;cursor:pointer}
   .sim5-desktop-controls button:disabled{background:#364a55;cursor:default}
   .sim5-touch-button{box-sizing:border-box}
   .sim5-touch-help{display:none}
   .sim5-controls-help{font-size:13px;color:#b7cdd5}
   @media (pointer:coarse),(max-width:700px){
    .sim5-canvas{height:min(68svh,680px);min-height:350px}
    .sim5-touch-dpad{position:absolute;left:14px;bottom:14px;display:grid;grid-template-columns:repeat(3,54px);grid-template-rows:repeat(2,54px);gap:5px;z-index:2;touch-action:none;user-select:none}
    .sim5-touch-button{width:54px;height:54px;border:1px solid rgba(179,233,244,.58);border-radius:12px;background:rgba(12,50,65,.86);color:#fff;font-size:25px;font-weight:700;touch-action:none;user-select:none;cursor:pointer}
    .sim5-touch-button:active{background:#1388a9}
    .sim5-touch-inspect{position:absolute;right:12px;top:12px;height:fit-content;display:block;max-width:43%;padding:12px 14px;border:0;border-radius:10px;font-weight:800;background:#e4b53e;color:#17272e;z-index:2;touch-action:manipulation}
    .sim5-desktop-controls button,.sim5-controls-help{display:none}
    .sim5-touch-help{display:block;font-size:13px;color:#b7cdd5}
   }
   @media (max-width:420px){
    .sim5-canvas{height:min(65svh,570px);min-height:320px}
    .sim5-touch-dpad{left:8px;bottom:8px;grid-template-columns:repeat(3,46px);grid-template-rows:repeat(2,46px);gap:4px}
    .sim5-touch-button{width:46px;height:46px}
    .sim5-touch-inspect{font-size:12px;right:8px;top:8px;padding:10px;max-width:calc(100% - 16px)}
   }
   @media (orientation:landscape) and (max-height:540px){
    .sim5-canvas{height:70svh;min-height:245px}
    .sim5-touch-dpad{grid-template-columns:repeat(3,44px);grid-template-rows:repeat(2,44px);left:8px;bottom:8px;gap:4px}
    .sim5-touch-button{width:44px;height:44px;font-size:23px}
   }
`}</style>
  <section style={{boxSizing:"border-box",maxWidth:1600,width:"100%",minWidth:0,margin:"0 auto",overflowX:"hidden"}}>
   <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",justifyContent:"space-between",marginBottom:12}}>
    <p style={{color:"#9de8e9",margin:0}} role="status">{status}</p>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",maxWidth:"100%"}}>
     <button onClick={()=>switchMode("overview")} style={{padding:"10px 14px",borderRadius:8,border:mode==="overview"?"1px solid #7ed9ef":"1px solid #375769",background:mode==="overview"?"#14617b":"#142c3a",color:"white",cursor:"pointer"}}>{tr?"Kuş bakışı":"Overview"}</button>
     <button onClick={()=>switchMode("walk")} style={{padding:"10px 14px",borderRadius:8,border:mode==="walk"?"1px solid #7ed9ef":"1px solid #375769",background:mode==="walk"?"#14617b":"#142c3a",color:"white",cursor:"pointer"}}>{tr?"Sahada yürü":"Walk site"}</button>
     <button onClick={()=>{clearInput();reset.current()}} style={{padding:"10px 14px",borderRadius:8,border:"1px solid #375769",background:"#142c3a",color:"white",cursor:"pointer"}}>{tr?"Kamerayı sıfırla":"Reset camera"}</button>
    </div>
   </div>
   {persist && missionMode === "full" && <Sim5DailyReward tr={tr} refreshKey={mission.phase==="finished"?persistence.historyRevision:0}/>}
   {persist && missionMode === "full" && <aside className="rounded-xl border border-cyan-300/30 p-3">
    <p>{tr?"İlk başarılı tam denetimde en iyi puana göre en fazla 200 kalıcı XP verilir. Sonraki günlerde 100/100 puanla günlük +50 XP kazanılabilir. Aynı gün tekrar oynamak serbesttir ancak ek günlük XP vermez. Skor sunucuda doğrulanır.":"The first full inspection awards up to 200 lifetime best-score XP. On following days, a perfect 100/100 score earns +50 XP daily. Replays are unlimited, but daily XP is awarded only once per day. The server verifies the score."}</p>
    <p>{tr?"Sekme kapanır veya sayfa yenilenirse son başarılı kayıt geçmişte eksik deneme olarak kalır; otomatik devam edilmez. Yeni deneme başlat. Kayıt 10 saniyede bir ve duraklatma/bitirmede denenir.":"Closing or reloading keeps the last successful checkpoint as an interrupted attempt in history; it does not auto-resume. Start a new attempt. Saves are attempted every 10 seconds and on pause/finish."}</p>
    {persistence.status && <p role="status">{persistence.status}</p>}<button type="button" className="min-h-11 underline" onClick={persistence.retry}>{tr?"Kaydı yeniden dene":"Retry save"}</button>
   </aside>}
   {sceneError&&<div role="alert"><p>{mission.phase==="finished"||mission.phase==="cancelled"
    ? (tr?"3D görüntü durdu; mevcut görev raporu bu sayfada duruyor. Tekrar oynamak için sayfayı yeniden yükle.":"The 3D view stopped; your mission report remains on this page. Reload to play again.")
    : (tr?"3D görüntü durdu; yeni görev başlatılamaz. Yeniden yüklemeyi dene.":"The 3D view stopped; a new mission cannot start. Try reloading.")}</p><button type="button" className="min-h-11 underline" onClick={()=>window.location.reload()}>{tr?"Yeniden yükle":"Reload"}</button></div>}
   <MissionPanel unlockHref={unlockHref} mission={mission} tr={tr} ready={ready} send={send} onStart={startMission} onRestart={restartMission}/>
   <p style={{color:"#c4dce3",fontSize:14}}>{missionMode==="demo"?(tr?"DEMO: Kaynak ve kaldırma sahnelerinde iki bulguyu değerlendir. Diğer bulgular ve üst platform görevleri Premium sürümdedir.":"DEMO: Assess two findings at the welding and lifting stations. Other findings and upper-platform missions belong to Premium."):tr?"Saha brifingi: İşaretli geçişleri kullan. Aktif kaldırma alanına girme. Görünür kanıtları yaklaşarak incele; tank merdivenleri üst servis yoluna çıkar. Üst seviyeyi de araştır.":"Site briefing: Use marked access routes. Stay outside the active lifting zone. Approach visible evidence to inspect it; the tank stairs lead to the upper service walkway. Explore both levels."}</p>
   <div className="sim5-stage">
    <div ref={mount} className="sim5-canvas" style={{width:"100%",borderRadius:14,overflow:"hidden",background:"#91b1c5",touchAction:"none"}}/>
    {mission.phase==="briefing"&&<div className="sim5-start-overlay" role="status" data-testid="sim5-start-overlay">
     <strong>{tr?"Yürümek için önce denetimi başlat":"Start the inspection to walk"}</strong>
     <p>{tr?"Yön tuşları ve WASD, görev başladıktan sonra açılır. Kaynak ve vinç risklerini sahada keşfet.":"The arrows and WASD unlock when the inspection starts. Explore welding and lifting hazards."}</p>
     <button type="button" disabled={!ready} onClick={startMission}>{ready?(tr?"Denetime başla →":"Start inspection →"):(tr?"Saha yükleniyor…":"Loading site…")}</button>
    </div>}
    {mission.phase==="paused"&&mode==="walk"&&<div className="sim5-start-overlay" role="status" data-testid="sim5-paused-overlay">
     <strong>{tr?"Denetim duraklatıldı":"Inspection paused"}</strong>
     <p>{tr?"Yön tuşları ve WASD, görev duraklatıldığında kapalıdır.":"The arrows and WASD are disabled while the mission is paused."}</p>
     <button type="button" onClick={()=>send({type:"resume"})}>{tr?"Denetime devam et →":"Resume inspection →"}</button>
    </div>}
    <MissionHud mission={mission} tr={tr}/>
    {mode==="walk"&&<div className="sim5-touch-dpad" role="group" aria-label={tr?"Hareket kontrolleri":"Movement controls"}>
     {touchButtons.map(([symbol,key,col,row,trl,enl])=><button key={key} type="button" data-testid={"sim5-touch-"+key} className="sim5-touch-button" disabled={mission.phase!=="active"} aria-label={tr?trl:enl} title={tr?trl:enl} style={{gridColumn:col,gridRow:row}}
      onPointerDown={e=>holdKey(key,e)}
      onPointerUp={releaseKey}
      onPointerCancel={releaseKey}
      onLostPointerCapture={releaseKey}
      onContextMenu={e=>e.preventDefault()}>{symbol}</button>)}
    </div>}
    {mode==="walk"&&nearbyHazard&&<button type="button" className="sim5-touch-inspect" {...inspectionEvents}>{tr?"🔍 Tehlikeyi incele":"🔍 Inspect hazard"}</button>}
   </div>
   <div className="sim5-desktop-controls">
    {controls.map(([symbol,key,trl,enl])=><button type="button" key={key} disabled={mode!=="walk"||mission.phase!=="active"} aria-label={tr?trl:enl} title={tr?trl:enl}
     onPointerDown={e=>holdKey(key,e)} onPointerUp={releaseKey} onPointerCancel={releaseKey} onLostPointerCapture={releaseKey} onContextMenu={e=>e.preventDefault()}>{symbol}</button>)}
    <span className="sim5-controls-help">{mission.phase==="briefing"?(tr?"Hareket kilitli · Sahnenin üzerindeki Denetime başla düğmesine bas":"Movement locked · Select Start inspection on the scene"):mission.phase==="paused"?(tr?"Denetim duraklatıldı · Devam et düğmesine bas":"Inspection paused · Select Resume inspection"):mode==="walk"?(tr?"WASD / ok tuşları ile yürü · sürükleyerek bak · açıklıklardan tesislere gir":"WASD / arrows to walk · drag to look · enter the plots through marked openings"):(tr?"Sürükleyerek tesisin etrafında dön · Yürü butonuyla girişe geç":"Drag to orbit site · select Walk to enter")}</span>
    <span className="sim5-touch-help">{mission.phase==="briefing"?(tr?"Hareket için önce Denetime başla":"Start inspection to unlock movement"):mission.phase==="paused"?(tr?"Hareket için Denetime devam et":"Resume inspection to move"):mode==="walk"?(tr?"Yön tuşlarını basılı tut · Sahneyi sürükleyerek bak":"Hold a direction to move · Drag the scene to look"):(tr?"Yürü modunu seç · Sürükleyerek tesisin etrafında dön":"Select Walk · Drag to orbit the site")}</span>
   </div>
  {mode==="walk"&&nearbyHazard&&<button {...inspectionEvents} style={{padding:"12px 20px",background:"#d6a52c",color:"#13242d",border:0,borderRadius:9,fontWeight:800,cursor:"pointer"}}>{tr?"🔍 Yakındaki tehlikeyi incele":"🔍 Inspect nearby hazard"}</button>}
  <p data-testid="sim5-hse-progress" style={{color:"#a3efbc",fontWeight:600}}>{tr?"HSE kararları":"HSE decisions"}: {completedInspections.length}/{Object.keys(mission.findings).length} · {tr?"Yürüme modunda uygunsuzluğa yaklaş ve dokun":"In walk mode approach and inspect visible hazards"}</p>
  {discovered.length>0&&<ul style={{color:"#c4dce3"}} aria-label={tr?"Bulunan uygunsuzluklar":"Discovered findings"}>{discovered.map(id=><li key={id}>{inspectionRecords[id].completed?"✓ ":"○ "}{inspectionRecords[id].completed?scenarioNames[id][tr?0:1]+" · "+controlOutcomes[id].sign[tr?0:1]:inspections[id].visibleEvidence[tr?0:1]}</li>)}</ul>}
  {activeInspection&&mission.phase==="active"&&<section className="sim5-inspection" style={{background:"#123344",padding:16,borderRadius:12,marginTop:12}}>
   {mission.findings[activeInspection].completed?<><h2>{tr?"Kontrol durumu":"Control status"}</h2><p>{tr?"İlk gözlenen kanıt: ":"Initially observed evidence: "}{inspections[activeInspection].visibleEvidence[tr?0:1]}</p><p>{controlOutcomes[activeInspection].text[tr?0:1]}</p><p>{tr?"Bu bulgu için karar kaydedildi; tekrar puan veya XP verilmez.":"The decision is recorded; reviewing this finding awards no additional score or XP."}</p></>:<>
    <p>{tr?"Gözlenen kanıt: ":"Observed evidence: "}{inspections[activeInspection].visibleEvidence[tr?0:1]}</p>
    <h2 style={{fontSize:18}}>{inspections[activeInspection].question[tr?0:1]}</h2>
    {inspections[activeInspection].answers.map((answer,i)=><button key={i} onClick={()=>{
     if(!inspectionAvailable.current(activeInspection)){setActiveInspection(null);setInspectionFeedback(tr?"İnceleme noktasına güvenli seviyeden yaklaş ve kanıta bak.":"Approach the inspection point at its accessible level and look at the evidence.");return;}
     if(missionRef.current.findings[activeInspection].completed)return;
     const current=inspections[activeInspection],correct=i===current.correct;
     send({type:"answer",id:activeInspection,answer:i});
     if(correct)setActiveInspection(null);
     setInspectionFeedback((correct?(tr?"Doğru. ":"Correct. "):(tr?"Güvensiz seçim. ":"Unsafe choice. "))+(correct?current.explanation[tr?0:1]+" "+controlOutcomes[activeInspection].text[tr?0:1]:wrongDecisionReasons[activeInspection][tr?0:1]));
    }} style={{display:"block",width:"100%",textAlign:"left",padding:12,marginTop:8,border:"1px solid #497c91",borderRadius:8,background:"#174659",color:"white"}}>{answer[tr?0:1]}</button>)}
   </>}
   <button onClick={()=>setActiveInspection(null)} style={{marginTop:10,padding:8}}>{tr?"Kapat":"Close"}</button>
  </section>}
  {inspectionFeedback&&<p role="status" style={{color:"#ffcf7d"}}>{inspectionFeedback}</p>}
  <p style={{fontSize:12,color:"#9cb1bb"}}>{tr?"Saha yerleşimi konsept prototipidir; gerçek bir tesisin onaylı kaçış veya trafik planı değildir.":"Concept site layout only; not an approved traffic or evacuation plan for a real facility."} · Factory: Pepe Orejel · Oil Tank: Duane’s Mind (Sketchfab) · Welder: grewe.juergen · CC BY 4.0 · {loaded}/2 GLB</p>
  </section>
 </>;
}
