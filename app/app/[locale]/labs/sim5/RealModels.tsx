"use client";
import { useEffect, useRef, useState } from "react";

export default function RealModels({tr}:{tr:boolean}) {
 const mount=useRef<HTMLDivElement>(null);
 const held=useRef<Set<string>>(new Set());
 const reset=useRef<()=>void>(()=>{});
 const [status,setStatus]=useState(tr?"Saha hazırlanıyor…":"Preparing site…");
 const [loaded,setLoaded]=useState(0);
 const [activeInspection,setActiveInspection]=useState<string|null>(null);
 const [completedInspections,setCompletedInspections]=useState<string[]>([]);
 const [inspectionFeedback,setInspectionFeedback]=useState("");
 const [nearbyHazard,setNearbyHazard]=useState<string|null>(null);
 const nearbyRef=useRef<string|null>(null);
 const inspectNearby=useRef<()=>void>(()=>{});
 const inspections:Record<string,{question:[string,string],answers:[[string,string],[string,string]],correct:number,explanation:[string,string]}>= {
  leak:{question:["Tank sahasında şüpheli sızıntı var. İlk adım?","Suspected tank-yard leak. First action?"],answers:[["Alanı izole et, güvenli mesafeden bildir","Isolate the area and report from a safe distance"],["Sızıntının kaynağına yaklaş","Approach the leak source"]],correct:0,explanation:["Bilinmeyen sızıntıya yaklaşma; acil müdahale prosedürünü başlat.","Do not approach an unknown release; initiate the emergency response procedure."]},
  hotwork:{question:["Sıcak çalışma öncesi yanıcı atmosfer ihtimali var. Ne yaparsın?","Potential flammable atmosphere before hot work. What do you do?"],answers:[["Yangın söndürücü ile işe başla","Start with a fire extinguisher"],["İşi durdur, izin ve gaz ölçümünü doğrula","Stop work and verify permit and gas testing"]],correct:1,explanation:["Çalışma izni, atmosfer testi ve yangın gözcüsü kontrol edilmeli.","Verify the permit, atmosphere testing and fire watch."]},
  access:{question:["Acil çıkış güzergâhı engellenmiş. Ne yaparsın?","An emergency route is obstructed. What do you do?"],answers:[["Engeli güvenle kaldırttır ve erişimi doğrula","Arrange safe removal and verify access"],["Vardiya sonunu bekle","Wait until the end of the shift"]],correct:0,explanation:["Acil kaçış yolları sürekli açık tutulmalıdır.","Emergency escape routes must remain clear."]}
 };
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
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.96;
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);
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
        child.castShadow=true;child.receiveShadow=true;
        const bounds=new THREE.Box3().setFromObject(child);
        if(bounds.isEmpty()||bounds.max.y<.25||bounds.min.y>2.7)return;
        colliders.push(child);colliderBoxes.push(bounds);
      });
    };
    const load=(url:string,height:number,x:number,z:number)=>new Promise<void>((resolve,reject)=>loader.load(url,(g:any)=>{if(!active){resolve();return}fit(g.scene,height,x,z);resolve()},undefined,reject));
    const paths=["/sim5/SERNEM_SIM4_Factory_optimized.glb","/sim5/large_industrial_storage_tanks%20(1).glb"];
    const results=await Promise.allSettled([load(paths[0],17.5,-47,-12),load(paths[1],17,47,-12)]);
    if(active){const count=results.filter(r=>r.status==="fulfilled").length;setLoaded(count);setStatus(count===2?(tr?"Gerçek tesis hazır · 2/2 model":"Industrial site ready · 2/2 models"):(tr?`Model yükleme: ${count}/2 — dosya bağlantısını kontrol et`:`Model loading: ${count}/2 — check asset links`))}
    // Visible site conditions replace the oversized interaction spheres.
    const inspectionMarkers:any[]=[];
    const hazardMaterial=(color:string,opacity=1)=>new THREE.MeshStandardMaterial({color,roughness:.85,transparent:opacity<1,opacity,side:THREE.DoubleSide});
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
    const valve=place(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.45,12),darkMetal),leakX+.9,1.55,leakZ);
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
    // Optional licensed real welder scene. Falls back to procedural objects until the GLB is uploaded.
    const workX=-22,workZ=-5;
    let realWelderLoaded=false;
    try{
      const welderScene=await new Promise<any>((resolve,reject)=>loader.load("/sim5/SERNEM_Welder_06_under25MB.glb",(g:any)=>resolve(g.scene),undefined,reject));
      // Keep the author's textures, but correct color space and washed-out material response.
      // This Sketchfab GLB contains the welder, power unit and cable as one assembly.
      welderScene.traverse((obj:any)=>{
        if(!obj.isMesh)return;
        obj.castShadow=true;obj.receiveShadow=true;
        const materials=Array.isArray(obj.material)?obj.material:[obj.material];
        for(const mat of materials){
          if(!mat)continue;
          if(mat.map){mat.map.colorSpace=THREE.SRGBColorSpace;mat.map.needsUpdate=true;}
          if(mat.emissiveMap){mat.emissiveMap.colorSpace=THREE.SRGBColorSpace;mat.emissiveMap.needsUpdate=true;}
          // Authored color textures are valid in the GLB, but some imported
          // material assignments render near-white. Give human PPE a realistic
          // deterministic color fallback rather than leaving a white mannequin.
          const label=String(mat.name||"").toLowerCase();
          const fallback=label.includes("bodysuit")||label.includes("mc-bodysuit")?"#234f78":
            label.includes("apron")?"#7b4e34":
            label.includes("helmet")?"#e6d9b0":
            label.includes("caucasian")?"#b88d73":
            label.includes("hair")?"#242020":null;
          if(fallback&&mat.color){
            mat.color.set(fallback);
            // Fallback must be visible even when a texture is absent or white.
            if(mat.map&&label.includes("bodysuit"))mat.map=null;
            if(mat.map&&label.includes("apron"))mat.map=null;
          }
          if(mat.isMeshStandardMaterial||mat.isMeshPhysicalMaterial){
            mat.roughness=Math.max(.55,mat.roughness??.8);
            mat.metalness=Math.min(.35,mat.metalness??0);
            mat.needsUpdate=true;
          }
        }
      });
      // Fit on the HUMAN height, not the entire assembly (which includes equipment).
      // Use the assembly's original dimensions and clamp it to a plausible site footprint.
      welderScene.updateMatrixWorld(true);
      const originalBounds=new THREE.Box3().setFromObject(welderScene);
      const originalSize=originalBounds.getSize(new THREE.Vector3());
      const scale=Math.min(2.2/Math.max(originalSize.y,.01),6.5/Math.max(originalSize.x,.01),6.5/Math.max(originalSize.z,.01));
      welderScene.scale.multiplyScalar(scale);
      welderScene.updateMatrixWorld(true);
      const bounds=new THREE.Box3().setFromObject(welderScene);
      const center=bounds.getCenter(new THREE.Vector3());
      // Ground the *visible boots*, not the full imported assembly. The
      // downloaded asset includes trailing cables and a wheeled power unit,
      // whose bounding boxes are not reliable ground references.
      const boots:any[]=[];
      welderScene.traverse((obj:any)=>{
        if(!obj.isMesh)return;
        const matNames=(Array.isArray(obj.material)?obj.material:[obj.material]).map((m:any)=>m?.name||"").join(" ");
        const name=(obj.name+" "+matNames).toLowerCase();
        if(/boot|shoe|foot|feet|rubberboot|wellies/.test(name))boots.push(obj);
      });
      const bootBounds=new THREE.Box3();
      for(const obj of boots)bootBounds.expandByObject(obj);
      // If the source mesh has no identifiable footwear, the scene bounding
      // box is used as a fallback, with no arbitrary vertical offset.
      const bottom=boots.length&&!bootBounds.isEmpty()?bootBounds.min.y:bounds.min.y;
      welderScene.position.x+=workX-center.x;
      welderScene.position.y+=.015-bottom;
      welderScene.position.z+=workZ-center.z;
      welderScene.updateMatrixWorld(true);
      scene.add(welderScene);
      // The source worker's visor is stored upright. Add a lowered,
      // dark protective face screen at the working side of the helmet.
      // This is a static PPE pose correction, not skeletal animation.
      const headParts:any[]=[];
      welderScene.traverse((obj:any)=>{if(!obj.isMesh)return;const names=(Array.isArray(obj.material)?obj.material:[obj.material]).map((m:any)=>m?.name||"").join(" ");if(/head|face|helmet|hardhat|caucasian/i.test(obj.name+" "+names))headParts.push(obj)});
      const headBounds=new THREE.Box3();
      for(const obj of headParts)headBounds.expandByObject(obj);
      const headCenter=headParts.length?headBounds.getCenter(new THREE.Vector3()):new THREE.Vector3(workX,1.93,workZ);
      const visorFrame=new THREE.Group();
      visorFrame.position.set(headCenter.x,headCenter.y-.12,headCenter.z-.19);
      visorFrame.rotation.y=0;
      const visorMat=new THREE.MeshPhysicalMaterial({color:"#152027",roughness:.35,metalness:.08,side:THREE.DoubleSide});
      const visor=new THREE.Mesh(new THREE.BoxGeometry(.055,.34,.31),visorMat);
      visor.position.set(0,-.12,0);visor.castShadow=true;visorFrame.add(visor);
      const windowMesh=new THREE.Mesh(new THREE.BoxGeometry(.061,.085,.19),new THREE.MeshPhysicalMaterial({color:"#28343c",roughness:.22,transparent:true,opacity:.78}));
      windowMesh.position.set(.004,-.095,0);visorFrame.add(windowMesh);
      const rim=new THREE.Mesh(new THREE.BoxGeometry(.075,.035,.33),darkMetal);
      rim.position.set(0,.055,0);visorFrame.add(rim);
      scene.add(visorFrame);
      // Entire loaded assembly is selectable for the hot-work HSE exercise.
      welderScene.traverse((obj:any)=>{if(obj.isMesh){obj.userData.inspectionId="hotwork";inspectionMarkers.push(obj);}});
      realWelderLoaded=true;
    }catch{ /* Preserve the existing playable scene if the asset is unavailable. */ }
    // Hot-work violation: fallback equipment and combustible drums.

    const sparkMeshes:any[]=[];
    if(!realWelderLoaded){
    place(new THREE.Mesh(new THREE.BoxGeometry(2.4,.14,1.3),darkMetal),workX,1.1,workZ,"hotwork");
    for(const dx of [-.95,.95])for(const dz of [-.45,.45])place(new THREE.Mesh(new THREE.BoxGeometry(.1,1.05,.1),darkMetal),workX+dx,.54,workZ+dz);
    for(let i=0;i<18;i++){const spark=place(new THREE.Mesh(new THREE.CylinderGeometry(.008,.018,.16+(i%3)*.05,5),new THREE.MeshBasicMaterial({color:i%2?0xffd56b:0xff832b})),workX+(i%7-3)*.14,1.2+(i%5)*.12,workZ+(i%4-2)*.1);spark.rotation.z=(i%7)*.33;}
    for(const dx of [-2.5,-1.8])place(new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,1.05,12),rust),workX+dx,.57,workZ+1.6,"hotwork");
    // Work equipment: compact welding power source, cable and nearby unsecured extinguisher.
    const welder=place(new THREE.Mesh(new THREE.BoxGeometry(.85,.72,.55),material("#d2a42c",.3)),workX+2.4,.48,workZ-.7,"hotwork");
    welder.rotation.y=-.2;
    place(new THREE.Mesh(new THREE.BoxGeometry(.48,.28,.025),material("#29363b")),workX+2.4,.62,workZ-.41);
    for(const dx of [-.29,.29])place(new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.1,12),darkMetal),workX+2.4+dx,.17,workZ-.7).rotation.z=Math.PI/2;
    const cablePoints=[new THREE.Vector3(workX+2.4,.36,workZ-.4),new THREE.Vector3(workX+1.8,.16,workZ),new THREE.Vector3(workX+.8,.17,workZ+.45),new THREE.Vector3(workX+.1,1.12,workZ)];
    const cableCurve=new THREE.CatmullRomCurve3(cablePoints);
    place(new THREE.Mesh(new THREE.TubeGeometry(cableCurve,35,.035,7,false),material("#22292b")),0,0,0);
    // The detailed extinguisher below is shared by real and fallback scenes;
    // do not render a second overlapping red cylinder here.
    }
    // Compact hot-work context. Keep the imported welder and its detailed
    // equipment visually dominant; avoid giant untextured props in the foreground.
    // A small weld coupon on a compact stand, offset to the operator's
    // working side. Unlike the former long pipe, this does not obscure the
    // worker or pretend the static torch is already touching a weld seam.
    // Keep the coupon outside the welder's body silhouette. A static
    // source pose is not an animated welding operation.
    const couponSteel=material("#58636a",.65);
    // Raise and bring the work surface towards the torch side of the
    // imported worker, instead of leaving the coupon below the raised hand.
    const standX=workX+2.1,standZ=workZ-1.15;
    for(const dx of [-.46,.46])for(const dz of [-.35,.35]){
      box(standX+dx,.715,standZ+dz,.09,1.43,.09,darkMetal);
      box(standX+dx,.09,standZ+dz,.19,.08,.19,darkMetal);
    }
    for(const dz of [-.35,.35])box(standX,.38,standZ+dz,1.03,.065,.07,darkMetal);
    for(const dx of [-.46,.46])box(standX+dx,.38,standZ,.07,.065,.78,darkMetal);
    box(standX,1.47,standZ,1.12,.075,.83,couponSteel);
    const coupon=place(new THREE.Mesh(new THREE.BoxGeometry(.46,.16,.27),couponSteel),standX,1.65,standZ,"hotwork");
    coupon.rotation.y=.16;
    // A short electrode terminates at the coupon; no floating weld point.
    const contact=new THREE.Vector3(standX-.3,1.75,standZ+.12);
    const electrodeStart=new THREE.Vector3(workX+.73,1.84,workZ-.5);
    const electrodeVector=contact.clone().sub(electrodeStart);
    const electrode=new THREE.Mesh(new THREE.CylinderGeometry(.014,.014,electrodeVector.length(),8),material("#343c42",.6));
    electrode.position.copy(electrodeStart.clone().add(contact).multiplyScalar(.5));
    electrode.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),electrodeVector.normalize());
    scene.add(electrode);
    // Extend the visibly loose imported lead to a plausible floor connection
    // rather than leaving a cable end isolated on the ground.
    if(realWelderLoaded){
      const leadPath=[new THREE.Vector3(workX-.55,.14,workZ+1.05),new THREE.Vector3(workX-.05,.12,workZ+.75),new THREE.Vector3(workX+.35,.13,workZ+.12),new THREE.Vector3(workX+.52,.65,workZ-.26),electrodeStart];
      const lead=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(leadPath),36,.025,8,false),material("#20252a"));
      lead.castShadow=true;scene.add(lead);
    }
    // Contact-only light and restrained sparks, never suspended mid-air.
    const weldLight=new THREE.PointLight(0x9ccfff,0,3.2,1.8);
    weldLight.position.copy(contact);scene.add(weldLight);
    const contactSparks:any[]=[];
    for(let i=0;i<12;i++){
      const a=i*2.39996;
      const p=place(new THREE.Mesh(new THREE.SphereGeometry(.012+(i%3)*.004,5,4),new THREE.MeshBasicMaterial({color:i%2?0xffd47c:0xfff4d8})),contact.x+Math.cos(a)*(.06+i*.012),contact.y+Math.sin(a)*(.05+i*.008),contact.z+Math.sin(a*1.4)*.09);
      contactSparks.push(p);
    }
    // Hazard remains the combustible material within the hot-work zone.
    // The static source asset is not represented as a finished welding animation.
    // Compact but recognizable portable fire extinguisher, including the
    // safety handle, pressure gauge, flexible hose and discharge nozzle.
    const exX=workX-2.6,exZ=workZ+3.1;
    const extinguisherRed=material("#c52c23",.23);
    const fireWatchExt=place(new THREE.Mesh(new THREE.CylinderGeometry(.16,.17,.72,32),extinguisherRed),exX,.39,exZ,"hotwork");
    place(new THREE.Mesh(new THREE.CylinderGeometry(.085,.1,.085,20),darkMetal),exX,.045,exZ,"hotwork");
    place(new THREE.Mesh(new THREE.CylinderGeometry(.045,.05,.075,16),darkMetal),exX,.79,exZ,"hotwork");
    box(exX,.85,exZ,.38,.04,.075,darkMetal);
    box(exX-.13,.89,exZ,.17,.03,.065,darkMetal);
    const gauge=place(new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.026,18),material("#ddd9ca",.38)),exX+.11,.83,exZ,"hotwork");
    gauge.rotation.z=Math.PI/2;
    place(new THREE.Mesh(new THREE.PlaneGeometry(.22,.27),new THREE.MeshBasicMaterial({color:"#e9e6dc",side:THREE.DoubleSide})),exX,.42,exZ+.168,"hotwork");
    const safetyPin=place(new THREE.Mesh(new THREE.TorusGeometry(.034,.009,7,12),material("#d6c36e",.5)),exX-.13,.87,exZ,"hotwork");
    safetyPin.rotation.y=Math.PI/2;
    const hosePoints=[
      new THREE.Vector3(exX+.12,.81,exZ),
      new THREE.Vector3(exX+.28,.68,exZ+.03),
      new THREE.Vector3(exX+.3,.36,exZ+.07),
      new THREE.Vector3(exX+.22,.13,exZ+.13)
    ];
    const exHose=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hosePoints),18,.018,7,false),darkMetal);
    exHose.castShadow=true;scene.add(exHose);
    const nozzle=place(new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,.09,12),darkMetal),exX+.22,.13,exZ+.13,"hotwork");
    nozzle.rotation.x=Math.PI/2;
    // The fire extinguisher is intentionally close to combustibles but not
    // a replacement for a hot-work permit or proper fire-watch controls.
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
    // Small animated sparks, rather than static hovering particles.
    sparkMeshes.push(...scene.children.filter((obj:any)=>obj.isMesh&&obj.geometry?.type==="CylinderGeometry"&&obj.material?.type==="MeshBasicMaterial"));
    // Obstructed yard entrance: stacked timber pallets and crates beside the equipment access route.
    const accessX=19.5,accessZ=-5;
    for(let layer=0;layer<3;layer++){
      for(const dz of [-.65,0,.65])place(new THREE.Mesh(new THREE.BoxGeometry(2.8,.16,.47),wood),accessX,.27+layer*.25,accessZ+dz,"access");
      for(const dx of [-1,0,1])place(new THREE.Mesh(new THREE.BoxGeometry(.24,.12,2.15),wood),accessX+dx,.14+layer*.25,accessZ,"access");
    }
    place(new THREE.Mesh(new THREE.BoxGeometry(.95,.9,.85),material("#b59c78")),accessX+.7,1.2,accessZ,"access");
    physicalBoxes.push(new THREE.Box3(new THREE.Vector3(accessX-1.5,.2,accessZ-1.4),new THREE.Vector3(accessX+1.5,1.9,accessZ+1.4)));
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
        if(targetId&&camera.position.distanceTo(worldHit)<10){
          setActiveInspection(targetId);setInspectionFeedback("");
        }
      }
    };
    renderer.domElement.addEventListener("pointerup",inspect);
    inspectNearby.current=()=>{const id=nearbyRef.current;if(id){setActiveInspection(id);setInspectionFeedback("")}};
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
      else {camera.position.set(-18,1.8,10);yaw=Math.PI;pitch=-.06;camera.lookAt(-18,1.8,-20)}
    };
    reset.current=setCamera;setCamera();
    const isTyping=(target:EventTarget|null)=>target instanceof HTMLElement&&!!target.closest("input,textarea,select,[contenteditable='true']");
    const down=(e:KeyboardEvent)=>{if(isTyping(e.target)||e.altKey||e.ctrlKey||e.metaKey)return;const key=e.key.toLowerCase();if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(key)){held.current.add(key);if(e.key.startsWith("Arrow")&&modeRef.current==="walk")e.preventDefault()}};
    const up=(e:KeyboardEvent)=>held.current.delete(e.key.toLowerCase());
    const blur=()=>{held.current.clear();drag=false};
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);window.addEventListener("blur",blur);
    const pointerDown=(e:PointerEvent)=>{if(e.pointerType==="mouse"&&e.button!==0)return;drag=true;px=e.clientX;py=e.clientY;startX=px;startY=py;renderer.domElement.setPointerCapture?.(e.pointerId)};
    const pointerUp=()=>drag=false;
    const pointerMove=(e:PointerEvent)=>{if(!drag)return;const dx=e.clientX-px,dy=e.clientY-py;px=e.clientX;py=e.clientY;if(modeRef.current==="walk"){yaw-=dx*.004;pitch=Math.max(-1.15,Math.min(1.15,pitch-dy*.003))}else{orbitAngle+=dx*.004}};
    // Touch gestures should rotate the 3D camera rather than scroll the page.
    renderer.domElement.style.touchAction="none";
    renderer.domElement.addEventListener("pointerdown",pointerDown);renderer.domElement.addEventListener("pointerup",pointerUp);renderer.domElement.addEventListener("pointercancel",pointerUp);renderer.domElement.addEventListener("lostpointercapture",pointerUp);renderer.domElement.addEventListener("pointermove",pointerMove);
    let last=performance.now();
    const tick=(now:number)=>{
      if(!active)return;
      // Keep the preview lightweight when its browser tab is not visible.
      // Continue scheduling so rendering resumes automatically on return.
      if(document.hidden){last=now;raf=requestAnimationFrame(tick);return;}
      const dt=Math.min(.05,(now-last)/1000);last=now;
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
      if(modeRef.current==="walk"){
        const hazards:[string,number,number][]=[["hotwork",workX,workZ],["leak",leakX,leakZ],["access",accessX,accessZ]];
        const closest=hazards.map(([id,x,z])=>({id,d:Math.hypot(camera.position.x-x,camera.position.z-z)})).sort((a,b)=>a.d-b.d)[0];
        const next=closest?.d<7?closest.id:null;
        if(next!==nearbyRef.current){nearbyRef.current=next;setNearbyHazard(next)}
      }else if(nearbyRef.current){nearbyRef.current=null;setNearbyHazard(null)}
      // Staggered gravity-like drops: origin at flange, landing at the puddle.
      for(let i=0;i<leakDrops.length;i++){
        const phase=((now*.00052+i/leakDrops.length)%1);
        const drop=leakDrops[i];
        drop.position.set(leakX+.035*Math.sin(i*2.1),1.07-(phase*phase)*.88,leakZ+.29+phase*.18);
        drop.visible=phase<.96;
      }
      for(let i=0;i<sparkMeshes.length;i++){const spark=sparkMeshes[i];spark.visible=Math.sin(now*.016+i*3)>-.35;}
      const arcActive=realWelderLoaded&&Math.sin(now*.009)>-.42;
      weldLight.intensity=arcActive?1.7+.5*Math.sin(now*.035):0;
      for(let i=0;i<contactSparks.length;i++)contactSparks[i].visible=arcActive&&Math.sin(now*.03+i*2.1)>.05;
      renderer.render(scene,camera);raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    const resize=()=>{if(!host.clientWidth||!host.clientHeight)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)};
    // Window resize alone misses responsive parent/layout changes. Observe
    // the actual canvas container so its aspect ratio stays accurate on mobile.
    const sizeObserver=typeof ResizeObserver!=="undefined"?new ResizeObserver(resize):null;
    sizeObserver?.observe(host);
    window.addEventListener("resize",resize);
    resize();
    cleanup=()=>{sizeObserver?.disconnect();window.removeEventListener("resize",resize);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);window.removeEventListener("blur",blur);renderer?.domElement?.removeEventListener("pointerdown",pointerDown);renderer?.domElement?.removeEventListener("pointerup",pointerUp);renderer?.domElement?.removeEventListener("pointercancel",pointerUp);renderer?.domElement?.removeEventListener("lostpointercapture",pointerUp);renderer?.domElement?.removeEventListener("pointerup",inspect);renderer?.domElement?.removeEventListener("pointermove",pointerMove)};
   }catch(e){if(active)setStatus("3D error: "+String(e))}
  })();
  return()=>{active=false;cancelAnimationFrame(raf);cleanup();renderer?.dispose();renderer?.domElement?.remove();held.current.clear()};
 },[tr]);
 const controls=[["↶","arrowleft"],["←","a"],["↑","w"],["↓","s"],["→","d"],["↷","arrowright"]];
 return <section style={{boxSizing:"border-box",maxWidth:1600,width:"100%",minWidth:0,margin:"0 auto",overflowX:"hidden"}}>
  <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",justifyContent:"space-between",marginBottom:12}}>
   <p style={{color:"#9de8e9",margin:0}} role="status">{status}</p>
   <div style={{display:"flex",gap:8,flexWrap:"wrap",maxWidth:"100%"}}>
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
  {mode==="walk"&&nearbyHazard&&<button onClick={()=>inspectNearby.current()} style={{padding:"12px 20px",background:"#d6a52c",color:"#13242d",border:0,borderRadius:9,fontWeight:800,cursor:"pointer"}}>{tr?"🔍 Yakındaki tehlikeyi incele":"🔍 Inspect nearby hazard"}</button>}
  <p style={{color:"#a3efbc",fontWeight:600}}>{tr?"HSE kararları":"HSE decisions"}: {completedInspections.length}/3 · {tr?"Yürüme modunda uygunsuzluğa yaklaş ve dokun":"In walk mode approach and inspect visible hazards"}</p>
  {activeInspection&&<section style={{background:"#123344",padding:16,borderRadius:12,marginTop:12}}><h2 style={{fontSize:18}}>{inspections[activeInspection].question[tr?0:1]}</h2>{inspections[activeInspection].answers.map((answer,i)=><button key={i} onClick={()=>{const current=inspections[activeInspection];if(i===current.correct){setCompletedInspections(prev=>prev.includes(activeInspection)?prev:[...prev,activeInspection]);setActiveInspection(null)}setInspectionFeedback((i===current.correct?(tr?"Doğru. ":"Correct. "):(tr?"Güvensiz seçim. ":"Unsafe choice. "))+current.explanation[tr?0:1])}} style={{display:"block",width:"100%",textAlign:"left",padding:12,marginTop:8,border:"1px solid #497c91",borderRadius:8,background:"#174659",color:"white"}}>{answer[tr?0:1]}</button>)}<button onClick={()=>setActiveInspection(null)} style={{marginTop:10,padding:8}}>{tr?"Kapat":"Close"}</button></section>}
  {inspectionFeedback&&<p role="status" style={{color:"#ffcf7d"}}>{inspectionFeedback}</p>}
  <p style={{fontSize:12,color:"#9cb1bb"}}>{tr?"Saha yerleşimi konsept prototipidir; gerçek bir tesisin onaylı kaçış veya trafik planı değildir.":"Concept site layout only; not an approved traffic or evacuation plan for a real facility."} · Factory: Pepe Orejel · Oil Tank: burnedhrum · Welder: grewe.juergen · CC BY 4.0 · {loaded}/2 GLB</p>
 </section>;
}
