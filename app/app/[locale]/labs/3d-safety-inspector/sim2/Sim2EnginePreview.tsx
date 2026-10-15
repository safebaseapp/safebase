"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trainingHazards } from "../hazards";
import { assessments, MAX_MISSION_SCORE, pointsForDecision } from "../assessment";

type Language = "tr" | "en";
type Engine = {
  inspect: () => void;
  move: (direction: string, active: boolean) => void;
  teleport: (id: string) => void;
  stop: () => void;
  cameraMode: (firstPerson: boolean) => void;
};
const accent = "#70e3d1";
const buttonStyle = { background: "#163c50", color: "#e7faff", border: "1px solid #407287", borderRadius: 10, padding: "10px 14px", cursor: "pointer" } as const;

/** SIM 3.0 experimental playable vertical slice. Uses P5's authored scenarios and decisions.
 * Marker geometry is a temporary, visibly labeled training placeholder, NOT a
 * photorealistic representation of each unsafe condition. No XP or DB writes.
 */
export default function Sim2EnginePreview() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<Engine | null>(null);
  const solvedRef = useRef<Record<string, number>>({});
  const languageRef = useRef<Language>("tr");
  const [status, setStatus] = useState("Saha yükleniyor…");
  const [language, setLanguage] = useState<Language>("tr");
  const [selected, setSelected] = useState<string | null>(null);
  const [solved, setSolved] = useState<Record<string, number>>({});
  const [mistakes, setMistakes] = useState<Record<string, number>>({});
  const [distance, setDistance] = useState<number | null>(null);
  const [location, setLocation] = useState("X 0 · Z 0");
  const [help, setHelp] = useState(true);
  const [guidance, setGuidance] = useState(false);
  const [firstPerson, setFirstPerson] = useState(true);
  const guidanceRef = useRef(false);
  useEffect(()=>{guidanceRef.current=guidance;},[guidance]);
  const [nearbyHint, setNearbyHint] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const active = trainingHazards.find(h => h.id === selected);
  const completed = Object.keys(solved).length;
  const score = Object.values(solved).reduce((sum, points) => sum + points, 0);
  useEffect(() => { solvedRef.current = solved; }, [solved]);
  useEffect(() => { languageRef.current = language; }, [language]);
  const inspectRef = useRef<(id: string, distance: number) => void>(() => {});
  inspectRef.current = (id, d) => {
    if (solvedRef.current[id] !== undefined) return;
    setDistance(d);
    setSelected(id);
  };
  const choose = (choice: number) => {
    if (!selected || solved[selected] !== undefined) return;
    if (choice === assessments[selected].correct) {
      setSolved(prev => ({ ...prev, [selected]: pointsForDecision(mistakes[selected] || 0) }));
      setSelected(null);
      setDistance(null);
    } else setMistakes(prev => ({ ...prev, [selected]: (prev[selected] || 0) + 1 }));
  };
  const restart = () => { setSolved({}); setMistakes({}); setSelected(null); setDistance(null); setElapsed(0); engine.current?.teleport("spawn"); };
  const movement = useCallback((direction: string, active: boolean) => engine.current?.move(direction, active), []);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const start = async () => {
      try {
        // @ts-ignore External ESM prototype, dependency is intentionally isolated.
        const THREE = await import(/* webpackIgnore: true */ "https://esm.sh/three@0.180.0");
        // @ts-ignore External ESM prototype, dependency is intentionally isolated.
        const { GLTFLoader } = await import(/* webpackIgnore: true */ "https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js");
        if (disposed || !canvas.current) return;
        const element = canvas.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#a6c5d5");
        scene.fog = new THREE.FogExp2("#a6c5d5", 0.0037);
        const camera = new THREE.PerspectiveCamera(73, 1, 0.08, 190);
        const renderer = new THREE.WebGLRenderer({ canvas: element, antialias: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        scene.add(new THREE.HemisphereLight(0xf3f7ff, 0x6c726c, 1.65));
        const ambientFill=new THREE.AmbientLight(0xe0edff,0.26);scene.add(ambientFill);
        const sun = new THREE.DirectionalLight(0xffe4b6, 2.25);
        sun.position.set(-22, 44, 22);
        sun.castShadow = true;
        sun.shadow.mapSize.set(1024, 1024);
        sun.shadow.camera.left = -65; sun.shadow.camera.right = 65;
        sun.shadow.camera.top = 65; sun.shadow.camera.bottom = -65;
        scene.add(sun);
        const material = (color: number, metalness = 0.15) => new THREE.MeshStandardMaterial({ color, roughness: 0.83, metalness });
        // Deterministic tileable surface maps: concrete aggregate and worn asphalt.
        // Canvas textures work offline and on iOS; no extra package or asset download.
        const surfaceTexture=(base:string,seed:number,roadSurface=false)=>{
          const c=document.createElement("canvas");c.width=c.height=512;
          const ctx=c.getContext("2d");if(!ctx)return null;
          ctx.fillStyle=base;ctx.fillRect(0,0,512,512);
          let state=seed;const rand=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
          for(let i=0;i<22000;i++){
            const v=Math.floor(rand()*75+55),alpha=rand()*0.15+0.035;
            ctx.fillStyle=`rgba(${v},${v+3},${v+2},${alpha})`;
            const x=rand()*512,y=rand()*512,r=rand()*2.8+0.25;
            ctx.fillRect(x,y,r,r);
          }
          if(roadSurface){
            ctx.strokeStyle="rgba(26,32,33,0.16)";ctx.lineWidth=1;
            for(let i=0;i<16;i++){const y=rand()*512;ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(130,y+rand()*20,300,y-rand()*18,512,y+rand()*8);ctx.stroke();}
          }else{
            ctx.strokeStyle="rgba(42,47,47,0.22)";ctx.lineWidth=2;
            for(let i=0;i<=512;i+=128){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,512);ctx.moveTo(0,i);ctx.lineTo(512,i);ctx.stroke();}
          }
          const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;
          t.repeat.set(24,24);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return t;
        };
        const asphalt = new THREE.MeshStandardMaterial({color:0xc4c5c0,map:surfaceTexture("#858e8b",23),roughness:0.96,metalness:0});
        const road = new THREE.MeshStandardMaterial({color:0xb3b4ad,map:surfaceTexture("#737976",71,true),roughness:0.98,metalness:0});
        const railing = material(0xb5c0bb,0.65);
        const safetyRed = material(0xb94935);
        const glass = new THREE.MeshStandardMaterial({color:0x8daeb4,metalness:0.25,roughness:0.22,transparent:true,opacity:0.7});
        const steel = material(0x70828a, 0.55);
        const yellow = material(0xe0b24b);
        const danger = material(0xe46b4e);
        const safe = material(0x48bda3);
        const concrete = material(0x8c9695);
        const box = (x: number, y: number, z: number, w: number, h: number, d: number, mat: any, parent = scene) => {
          const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
          mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh);
          return mesh;
        };
        const pipe = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, radius: number, mat: any, parent = scene) => {
          const a = new THREE.Vector3(ax, ay, az), b = new THREE.Vector3(bx, by, bz);
          const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, a.distanceTo(b), 9), mat);
          mesh.position.copy(a).add(b).multiplyScalar(0.5);
          mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize());
          mesh.castShadow = true; parent.add(mesh); return mesh;
        };
        box(0, -0.14, 0, 155, 0.28, 155, asphalt);
        box(4.3, 0.055, 9, 15, 0.1, 132, road);
        for (let z=-60;z<=65;z+=8) {box(4.3,0.115,z,0.14,0.015,3.2,yellow);}
        for (const x of [-64,64]) for(let z=-64;z<=64;z+=5){pipe(x,0,z,x,2.1,z,0.055,railing); if(z<64)pipe(x,1.2,z,x,1.2,z+5,0.042,railing);}
        for (const z of [-64,64]) for(let x=-64;x<=64;x+=5){pipe(x,0,z,x,2.1,z,0.055,railing); if(x<64)pipe(x,1.2,z,x+5,1.2,z,0.042,railing);}
        // Service road: concrete kerbs, crossing and striped hazard exclusion zone.
        for(const x of [-3.3,11.7])box(x,0.15,9,0.3,0.3,132,concrete);
        for(let x=-2.8;x<=11;x+=1.25)box(x,0.125,30,0.72,0.02,3.1,concrete);
        for(let i=0;i<10;i++) {const stripe=box(19+i*0.55,0.12,22,0.18,0.02,5,yellow);stripe.rotation.y=-0.55;}
        for (let z = -60; z <= 60; z += 10) {
          box(-0.4, 0.12, z, 0.16, 0.02, 4.2, yellow);
          box(9, 0.12, z, 0.12, 0.02, 3.4, yellow);
        }
        // Coherent industrial compound, deliberately outside the central walk corridor.
        for (const x of [-27, -17, -7, 3, 13, 23]) {
          for (const z of [-29, -22]) pipe(x, 0, z, x, 6.2, z, 0.15, steel);
          box(x, 6.2, -25.5, 0.42, 0.35, 8, steel);
        }
        for (const z of [-27.4, -25.5, -23.6]) {
          pipe(-28, 6.55, z, 24, 6.55, z, 0.24, z === -25.5 ? yellow : steel);
        }
        // Scaffold frames, deck and visibly missing edge segment.
        for (const x of [-12, -6, 0]) for (const z of [-12, -6]) {
          pipe(x, 0, z, x, 7.5, z, 0.085, steel);
          box(x, 0.12, z, 0.52, 0.24, 0.52, concrete);
        }
        for (const y of [3.4, 6.6]) {
          box(-6, y, -9, 12.5, 0.22, 6.2, material(0x856e54));
          for (const z of [-12, -6]) {
            pipe(-12, y + 1, z, -7.5, y + 1, z, 0.07, steel);
            pipe(-4.5, y + 1, z, 0, y + 1, z, 0.07, steel);
          }
        }
        // Workshop, maintenance pad, lift zone and route separation.
        box(-26, 0.13, 18, 22, 0.26, 26, concrete);
        box(-30, 4.8, 20, 12, 9.6, 16, material(0x50626c, 0.4));
        box(-30, 9.8, 20, 13, 0.55, 17, steel);
        for (const x of [-35, -31, -27]) box(x, 4.5, 11.95, 1.4, 4.8, 0.18, material(0x303c43));
        for (const x of [14, 22]) {
          pipe(x, 0, 27, x, 10, 27, 0.35, steel);
          box(x, 0.3, 27, 1.7, 0.6, 1.7, concrete);
        }
        box(18, 10, 27, 11, 0.65, 0.8, steel);
        pipe(18, 9.7, 27, 18, 5.3, 27, 0.055, steel);
        box(18, 4.7, 27, 3.2, 1.2, 2.4, yellow);
        // Production-style detail layer: safety rails, pipe flanges, pump skids,
        // bollards and instrument clusters to break up the toy-like empty compound.
        const stainless=material(0xa5aaa5,0.72),darkSteel=material(0x36474d,0.66);
        for(const x of [-27,-17,-7,3,13,23]){
          for(const z of [-29,-22]){
            box(x,0.18,z,0.9,0.35,0.9,concrete);
            for(const h of [0.5,1.15,1.8])pipe(x-0.28,h,z,x+0.28,h,z,0.035,stainless);
          }
        }
        for(let x=-25;x<=20;x+=9){
          const z=-16;
          box(x,0.26,z,3.4,0.45,2.1,concrete);
          const pump=new THREE.Mesh(new THREE.CylinderGeometry(0.68,0.68,1.7,24),darkSteel);
          pump.rotation.z=Math.PI/2;pump.position.set(x,1.12,z);pump.castShadow=true;scene.add(pump);
          for(const dx of [-1,1]){
            const flange=new THREE.Mesh(new THREE.TorusGeometry(0.48,0.085,8,24),stainless);
            flange.rotation.y=Math.PI/2;flange.position.set(x+dx,1.12,z);scene.add(flange);
          }
          pipe(x,1.12,z-0.8,x,1.12,z-2.8,0.19,steel);
          pipe(x,1.12,z+0.8,x,1.12,z+2.8,0.19,steel);
        }
        for(const z of [-46,-38,-30,-22,-14,-6,2,10,18,26,34,42,50]){
          for(const x of [-4.0,12.3]){
            const post=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.13,1.15,12),yellow);
            post.position.set(x,0.575,z);post.castShadow=true;scene.add(post);
            pipe(x,0.87,z,x,0.96,z,0.13,darkSteel);
          }
        }
        for(const x of [-35,-25,-15]){
          const post=pipe(x,0,30,x,5.2,30,0.09,steel);
          box(x,5.1,30,1.3,0.5,0.65,darkSteel);
          const lamp=new THREE.PointLight(0xffe3b2,0.5,12,2);
          lamp.position.set(x,4.9,30);scene.add(lamp);
        }
        // SIM3: no procedurally generated welding tables, crates or cylinders.
        // Keep the actual hazard position consistent with trainingHazards.
        const hotWorkTarget=trainingHazards.find(h=>h.id==="hot-work-combustible");
        const workX=hotWorkTarget?.target[0] ?? -10,workZ=hotWorkTarget?.target[2] ?? 28;
        const weldZoneAnimate=(_time:number)=>{};
        // More readable field equipment: valves, fire points, barriers, work lighting.
        for(const x of [-24,-12,0,12,24]) {
          pipe(x,0,-18,x,1.3,-18,0.13,steel);
          const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.42,0.065,7,16),safetyRed);
          wheel.rotation.x=Math.PI/2;wheel.position.set(x,1.35,-18);scene.add(wheel);
        }
        for(const z of [-20,2,24,45]){
          box(-4.2,0.55,z,0.28,1.1,0.28,yellow);
          box(-4.2,1.12,z,0.38,0.18,0.38,steel);
          box(12.6,0.55,z,0.28,1.1,0.28,yellow);
          box(12.6,1.12,z,0.38,0.18,0.38,steel);
        }
        for(const z of [4,18,34]){
          box(-15,1.2,z,0.9,2.4,0.5,safetyRed);
          box(-15,2.1,z+0.27,0.45,0.35,0.04,concrete);
        }
        for(const x of [-35,-25,-15]){
          box(x,1.6,29,0.12,3.2,0.12,steel);
          box(x,3.2,29,0.8,0.2,0.55,glass);
        }
        // Simple temporary training props; each marker is distinct and locatable.
        const props: Record<string, (x: number, y: number, z: number) => void> = {
          "exit-blocked": (x,y,z) => { box(x,0.65,z,2.3,1.3,1.3,danger); box(x+1.5,0.4,z,0.8,0.8,1,concrete); },
          "trailing-cable": (x,y,z) => { for(let i=0;i<7;i++) pipe(x-2+i*0.65,0.11,z+Math.sin(i)*0.45,x-1.4+i*0.65,0.11,z+Math.sin(i+1)*0.45,0.065,material(0x20272c)); },
          "open-excavation": (x,y,z) => { box(x,-0.07,z,4,0.1,3,material(0x1e282b)); for(const d of [-2.3,2.3]) pipe(x+d,0,z-2,x+d,1,z-2,0.07,yellow); },
          "scaffold-guardrail": (x,y,z) => { box(x,3.55,z,1.5,0.15,0.3,danger); },
          "scaffold-loose-tools": (x,y,z) => { for(let i=0;i<4;i++) box(x+i*0.4,6.95,z,0.35,0.3,0.28,steel); },
          "cylinder-unsecured": (x,y,z) => { for(const dx of [0,0.55]){pipe(x+dx,0.2,z,x+dx,1.6,z,0.19,danger);box(x+dx,1.67,z,0.25,0.13,0.25,steel);} },
          "hot-work-combustible": (_x,_y,_z) => { /* Only show licensed 3D assets here; no placeholder boxes. */ },
          "suspended-load": (x,y,z) => { box(x,3.1,z,3,1.5,2,yellow); },
          "vehicle-interface": (x,y,z) => {box(x,0.95,z,3.4,1.1,2.2,yellow);box(x-0.8,1.75,z,1.45,1.1,1.6,steel);for(const d of [-1.1,1.1])for(const zz of [-0.9,0.9]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.42,0.23,12),material(0x1e2427));wheel.rotation.z=Math.PI/2;wheel.position.set(x+d,0.43,z+zz);scene.add(wheel);}for(const zz of [-0.55,0.55])pipe(x+1.8,0.23,z+zz,x+4.1,0.23,z+zz,0.075,steel); },
          "electrical-panel": (x,y,z) => { box(x,1.3,z,1.3,2.4,0.65,danger); box(x+0.2,1.5,z+0.35,0.5,0.65,0.05,material(0x20282b)); },
          "oil-spill": (x,y,z) => {const spill=new THREE.Mesh(new THREE.CircleGeometry(1.6,28),new THREE.MeshStandardMaterial({color:0x111b1c,roughness:0.18,metalness:0.45}));spill.rotation.x=-Math.PI/2;spill.scale.set(1.35,0.7,1);spill.position.set(x,0.028,z);scene.add(spill); },
          "improper-materials": (x,y,z) => { for(let i=0;i<4;i++) pipe(x-1.7,0.25+i*0.38,z,x+1.7,0.25+i*0.38,z,0.17,steel); },
        };
        const markers: { id: string; position: any; mesh: any }[] = [];
        const markerMaterial = new THREE.MeshStandardMaterial({ color: 0xffa35a, emissive: 0x733213, emissiveIntensity: 0.5, roughness: 0.35, transparent:true, opacity:0 });
        const doneMaterial = new THREE.MeshStandardMaterial({ color: 0x49d8a7, emissive: 0x13694f, emissiveIntensity: 0.5 });
        for (const hazard of trainingHazards) {
          const [x, y, z] = hazard.target;
          props[hazard.id]?.(x, y, z);
          const py = Math.max(1.8, Math.min(y + 1.25, 7.9));
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.75, 10, 8), markerMaterial.clone());
          mesh.position.set(x, py, z);
          mesh.userData.hazardId = hazard.id;
          scene.add(mesh);
          markers.push({ id: hazard.id, mesh, position: new THREE.Vector3(x, py, z) });
        }
        let weldingAssetLoaded=false;
        // Poly Haven Portable Welding Cart (CC0), hosted in app/public/models/refinery.
        try {
          const weldingAsset=await new GLTFLoader().loadAsync("/models/refinery/portable_welding_cart_1k.glb");
          if(disposed)return;
          const model=weldingAsset.scene;
          const bounds=new THREE.Box3().setFromObject(model);
          const size=bounds.getSize(new THREE.Vector3());
          const center=bounds.getCenter(new THREE.Vector3());
          if(size.y>0){
            const scale=3.12/size.y;
            model.scale.setScalar(scale);
            model.position.set(workX-center.x*scale, -bounds.min.y*scale,workZ-center.z*scale);
            model.traverse((obj:any)=>{if(obj.isMesh){obj.castShadow=true;obj.receiveShadow=true;}});
            scene.add(model);
            weldingAssetLoaded=true;
          }
        }catch(assetError){
          console.warn("SIM3 locally hosted welding asset unavailable",assetError);
          setStatus("SIM 3.0: Kaynak ekipmanı GLB dosyası bulunamadı; /models/refinery/ yolunu kontrol edin.");
        }
        // Industrial tank weathering. Original GLB ships without usable base-color maps;
        // supply a lightweight authored coating rather than displaying bare white geometry.
        const coatingCanvas=document.createElement("canvas");coatingCanvas.width=coatingCanvas.height=512;
        const coatingCtx=coatingCanvas.getContext("2d");
        if(coatingCtx){
          coatingCtx.fillStyle="#a1a7a1";coatingCtx.fillRect(0,0,512,512);
          let seed=41257;const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
          for(let i=0;i<32000;i++){
            const x=noise()*512,y=noise()*512,v=45+Math.floor(noise()*80);
            coatingCtx.fillStyle="rgba("+v+","+(v+5)+","+(v+7)+","+(noise()*0.16+0.035)+")";
            coatingCtx.fillRect(x,y,noise()*4+0.4,noise()*9+0.6);
          }
          for(let i=0;i<45;i++){
            const x=noise()*512,y=noise()*512;
            const grad=coatingCtx.createLinearGradient(x,y,x+noise()*30,y+90+noise()*170);
            grad.addColorStop(0,"rgba(80,66,51,0.0)");
            grad.addColorStop(0.25,"rgba(87,71,55,0.16)");
            grad.addColorStop(1,"rgba(67,60,53,0.0)");
            coatingCtx.fillStyle=grad;coatingCtx.fillRect(x,y,12+noise()*42,190);
          }
        }
        const coatingTexture=new THREE.CanvasTexture(coatingCanvas);
        coatingTexture.colorSpace=THREE.SRGBColorSpace;
        coatingTexture.wrapS=coatingTexture.wrapT=THREE.RepeatWrapping;
        coatingTexture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
        let coatedMeshes=0;
        let meshCount = 0, mappedMaterials = 0;
        try {
          const gltf = await new GLTFLoader().loadAsync("/models/refinery/large_industrial_storage_tanks.glb");
          if (disposed) return;
          const bounds = new THREE.Box3().setFromObject(gltf.scene);
          const center = bounds.getCenter(new THREE.Vector3());
          const size = bounds.getSize(new THREE.Vector3());
          gltf.scene.position.sub(center);
          gltf.scene.position.y += size.y / 2;
          gltf.scene.position.x += 28;
          gltf.scene.position.z -= 5;
          gltf.scene.traverse((obj: any) => {
            if (obj.isMesh) {
              obj.castShadow = true; obj.receiveShadow = true; meshCount++;
              for (const mat of (Array.isArray(obj.material) ? obj.material : [obj.material])) {
                if(mat && !mat.map && obj.geometry?.attributes?.uv && mat.isMeshStandardMaterial){
                  mat.map=coatingTexture;
                  mat.color.set("#b7b9b2");
                  mat.roughness=0.78;
                  mat.metalness=0.52;
                  mat.needsUpdate=true;
                  coatedMeshes++;
                }
                if (mat?.map) mappedMaterials++;
              }
            }
          });
          scene.add(gltf.scene);
        } catch (err) {
          setStatus("GLB yüklenemedi, eğitim sahası açık: " + String(err));
        }
        if (disposed) return;
        const position = new THREE.Vector3(0, 1.72, 38);
        const inspector = new THREE.Group();
        const animatedLimbs: any[] = [];
        const avatarMaterial = (color:number) => new THREE.MeshStandardMaterial({color,roughness:0.85});
        // Rounded anatomical silhouette instead of Minecraft-style boxes.
        const vest=avatarMaterial(0xcbe636), uniform=avatarMaterial(0x243746);
        const skin=avatarMaterial(0x98705c), boots=avatarMaterial(0x20262b);
        const reflective=new THREE.MeshStandardMaterial({color:0xdde9e1,metalness:0.25,roughness:0.52});
        const body=new THREE.Mesh(new THREE.CapsuleGeometry(0.35,0.45,6,16),vest);
        body.scale.z=0.72;body.position.y=1.24;body.castShadow=true;inspector.add(body);
        const waist=new THREE.Mesh(new THREE.CapsuleGeometry(0.29,0.15,4,12),uniform);
        waist.scale.z=0.82;waist.position.y=0.78;inspector.add(waist);
        for(const x of [-0.2,0.2]){
          const leg=new THREE.Group();leg.position.set(x,0.71,0);
          const limb=new THREE.Mesh(new THREE.CapsuleGeometry(0.125,0.37,4,12),uniform);
          limb.position.y=-0.32;limb.castShadow=true;leg.add(limb);
          const shoe=new THREE.Mesh(new THREE.SphereGeometry(0.16,12,8),boots);
          shoe.scale.set(1,0.65,1.55);shoe.position.set(0,-0.62,-0.09);leg.add(shoe);
          inspector.add(leg);animatedLimbs.push(leg);
        }
        for(const x of [-0.43,0.43]){
          const arm=new THREE.Group();arm.position.set(x,1.52,0);
          const sleeve=new THREE.Mesh(new THREE.CapsuleGeometry(0.115,0.38,4,12),uniform);
          sleeve.position.y=-0.32;sleeve.castShadow=true;arm.add(sleeve);
          const glove=new THREE.Mesh(new THREE.SphereGeometry(0.12,12,8),boots);
          glove.position.y=-0.65;arm.add(glove);
          inspector.add(arm);animatedLimbs.push(arm);
        }
        const neck=new THREE.Mesh(new THREE.CylinderGeometry(0.115,0.12,0.17,12),skin);
        neck.position.y=1.76;inspector.add(neck);
        const head=new THREE.Mesh(new THREE.SphereGeometry(0.23,18,14),skin);
        head.scale.set(0.88,1.12,0.91);head.position.y=1.97;inspector.add(head);
        const helmet=new THREE.Mesh(new THREE.SphereGeometry(0.28,20,12,0,Math.PI*2,0,Math.PI*0.63),avatarMaterial(0xf3f3e8));
        helmet.position.y=2.10;helmet.castShadow=true;inspector.add(helmet);
        const brim=new THREE.Mesh(new THREE.CylinderGeometry(0.285,0.285,0.035,24),avatarMaterial(0xf3f3e8));
        brim.position.y=2.06;inspector.add(brim);
        for(const x of [-0.25,0.25]){
          const stripe=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.54,0.016),reflective);
          stripe.position.set(x,1.27,0.26);inspector.add(stripe);
        }
        const vestCanvas=document.createElement("canvas");vestCanvas.width=512;vestCanvas.height=256;
        const vc=vestCanvas.getContext("2d");
        if(vc){vc.fillStyle="#cbe636";vc.fillRect(0,0,512,256);vc.fillStyle="#13251c";vc.font="bold 64px Arial";vc.textAlign="center";vc.fillText("SERNEM",256,140);vc.font="bold 35px Arial";vc.fillText("SIM",256,190);}
        const logo=new THREE.Mesh(new THREE.PlaneGeometry(0.55,0.27),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(vestCanvas),side:THREE.DoubleSide}));
        logo.position.set(0,1.22,0.258);inspector.add(logo);
        scene.add(inspector);
        const blockers = [
          {x:-30,z:20,w:13,d:17},{x:-6,z:-9,w:13,d:7},
          {x:18,z:27,w:12,d:3},{x:28,z:-5,w:15,d:15},
        ];
        const blocked = (x:number,z:number) => blockers.some(b=>Math.abs(x-b.x)<b.w/2+0.65 && Math.abs(z-b.z)<b.d/2+0.65);
        let yaw = Math.PI, pitch = -0.04;
        let isFirstPerson = true;
        const held = new Set<string>();
        const raycaster = new THREE.Raycaster();
        const centerRay = new THREE.Vector2(0, 0);
        let pointerX: number | null = null, pointerY: number | null = null;
        let lastTime = performance.now(), lastHud = 0;
        let seconds = 0;
        const teleport = (id: string) => {
          if (id === "spawn") { position.set(0, 1.72, 38); yaw = Math.PI; pitch = -0.04; return; }
          const h = trainingHazards.find(v => v.id === id);
          if (!h) return;
          position.set(h.target[0], 1.72, h.target[2] + 4.3);
          if(blocked(position.x,position.z)) position.set(h.target[0]+5.5,1.72,h.target[2]+5.5);
          yaw = Math.PI; pitch = Math.atan2(h.target[1] + 1.25 - 1.72, 4.3);
        };
        const look = (dx: number, dy: number) => {
          yaw -= dx * 0.0035;
          pitch = Math.max(-1.1, Math.min(1.1, pitch - dy * 0.0035));
        };
        const inspect = () => {
          camera.updateMatrixWorld();
          raycaster.setFromCamera(centerRay, camera);
          const hits = raycaster.intersectObjects(markers.map(m => m.mesh), false);
          const targeted = hits.find((hit: any) => hit.distance <= 11 && solvedRef.current[hit.object.userData.hazardId] === undefined);
          const nearby = markers.filter(m => solvedRef.current[m.id] === undefined)
            .map(m => ({ marker: m, d: m.position.distanceTo(position) }))
            .filter(v => v.d < 3.8).sort((a,b) => a.d - b.d)[0];
          if (targeted) inspectRef.current(targeted.object.userData.hazardId, targeted.distance);
          else if (nearby) inspectRef.current(nearby.marker.id, nearby.d);
          else setStatus(languageRef.current === "tr" ? "Bir uygunsuzluğa yaklaş ve merkezde hedefle." : "Approach a hazard and aim with the crosshair.");
        };
        const onKeyDown = (event: KeyboardEvent) => {
          if (["INPUT","TEXTAREA","BUTTON"].includes((event.target as HTMLElement)?.tagName)) return;
          const key = event.key.toLowerCase();
          if (["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","shift"].includes(key)) { held.add(key); event.preventDefault(); }
          if (key === "e" && !event.repeat) inspect();
        };
        const onKeyUp = (event: KeyboardEvent) => held.delete(event.key.toLowerCase());
        const onPointerDown = (event: PointerEvent) => {
          pointerX = event.clientX; pointerY = event.clientY;
          element.setPointerCapture(event.pointerId);
        };
        const onPointerMove = (event: PointerEvent) => {
          if (pointerX === null || pointerY === null) return;
          look(event.clientX - pointerX, event.clientY - pointerY);
          pointerX = event.clientX; pointerY = event.clientY;
        };
        const onPointerUp = () => { pointerX = null; pointerY = null; };
        const onResize = () => {
          const w = element.clientWidth, h = element.clientHeight;
          if (!w || !h) return;
          camera.aspect = w/h; camera.updateProjectionMatrix();
          renderer.setSize(w,h,false);
        };
        window.addEventListener("keydown",onKeyDown);
        window.addEventListener("keyup",onKeyUp);
        window.addEventListener("blur",onPointerUp);
        window.addEventListener("resize",onResize);
        element.addEventListener("pointerdown",onPointerDown);
        element.addEventListener("pointermove",onPointerMove);
        element.addEventListener("pointerup",onPointerUp);
        element.addEventListener("pointercancel",onPointerUp);
        onResize();
        engine.current = { inspect, move: (key,on) => { if (on) held.add(key); else held.delete(key); }, teleport, stop: () => held.clear(), cameraMode: (enabled) => { isFirstPerson=enabled; } };
        setStatus("SIM 3.0 · Kaynak GLB: " + (weldingAssetLoaded ? "YÜKLENDİ" : "YÜKLENEMEDİ") + " · Tank: " + meshCount + " mesh · " + mappedMaterials + " dokulu · 12 HSE bulgusu");
        renderer.setAnimationLoop((now: number) => {
          const dt = Math.min((now-lastTime)/1000,0.045); lastTime = now;
          const speed = held.has("shift") ? 9 : 5.1;
          const forward = Number(held.has("w") || held.has("arrowup")) - Number(held.has("s") || held.has("arrowdown"));
          const sideways = Number(held.has("d") || held.has("arrowright")) - Number(held.has("a") || held.has("arrowleft"));
          const length = Math.hypot(forward,sideways) || 1;
          const nextX=position.x+(Math.sin(yaw)*forward + Math.cos(yaw)*sideways)/length*speed*dt;
          const nextZ=position.z+(Math.cos(yaw)*forward - Math.sin(yaw)*sideways)/length*speed*dt;
          if(!blocked(nextX,position.z))position.x=nextX;
          if(!blocked(position.x,nextZ))position.z=nextZ;
          position.x = Math.max(-69,Math.min(69,position.x));
          position.z = Math.max(-69,Math.min(69,position.z));
          weldZoneAnimate(now);
          inspector.position.set(position.x,0,position.z);
          inspector.rotation.y=yaw+Math.PI;
          const walking=Math.hypot(forward,sideways)>0;
          const stride=walking?Math.sin(now*0.012*(held.has("shift")?1.5:1))*0.52:0;
          animatedLimbs[0].rotation.x=stride;animatedLimbs[1].rotation.x=-stride;
          animatedLimbs[2].rotation.x=-stride*0.65;animatedLimbs[3].rotation.x=stride*0.65;
          // Eye-level inspection camera is the default; third-person remains optional.
          inspector.visible=!isFirstPerson;
          camera.position.set(position.x+(isFirstPerson?0:Math.sin(yaw)*3.2),position.y+(isFirstPerson?0.02:1.35),position.z+(isFirstPerson?0:Math.cos(yaw)*3.2));
          camera.rotation.order = "YXZ";
          camera.rotation.set(pitch-(isFirstPerson?0:0.14),yaw,0);
          for(const marker of markers) {
            const solvedNow=solvedRef.current[marker.id] !== undefined;
            marker.mesh.material.color.copy(solvedNow ? doneMaterial.color : markerMaterial.color);
            marker.mesh.material.opacity = solvedNow ? 0 : guidanceRef.current ? 0.9 : 0;
            marker.mesh.material.depthWrite = guidanceRef.current && !solvedNow;
            marker.mesh.rotation.y += dt*1.3;
          }
          renderer.render(scene,camera);
          seconds+=dt;
          if(now-lastHud>600) { lastHud=now; setLocation("X "+position.x.toFixed(1)+" · Z "+position.z.toFixed(1)); setElapsed(Math.floor(seconds)); const nearest=markers.filter(m=>solvedRef.current[m.id]===undefined).map(m=>({m,d:m.position.distanceTo(position)})).sort((a,b)=>a.d-b.d)[0];setNearbyHint(nearest&&nearest.d<9?(languageRef.current==="tr"?"Yakında incelenebilir bir risk var":"Potential hazard nearby"):""); }
        });
        cleanup = () => {
          renderer.setAnimationLoop(null);
          window.removeEventListener("keydown",onKeyDown);
          window.removeEventListener("keyup",onKeyUp);
          window.removeEventListener("blur",onPointerUp);
          window.removeEventListener("resize",onResize);
          element.removeEventListener("pointerdown",onPointerDown);
          element.removeEventListener("pointermove",onPointerMove);
          element.removeEventListener("pointerup",onPointerUp);
          element.removeEventListener("pointercancel",onPointerUp);
          engine.current = null;
          scene.traverse((obj: any) => { if(obj.geometry) obj.geometry.dispose(); });
          renderer.dispose();
        };
      } catch(err) {
        if(!disposed) setStatus("SIM 3.0 motor hatası: "+String(err));
      }
    };
    void start();
    return () => { disposed = true; cleanup(); };
  }, []);

  const t = (tr: string,en: string) => language === "tr" ? tr : en;
  return <section style={{minHeight:"100vh",background:"#061824",color:"#e4f6fa",padding:"clamp(12px,2vw,26px)"}}>
    <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:12}}>
      <div><h1 style={{fontSize:"clamp(23px,3vw,38px)",fontWeight:850}}>SERNEM SIM 3.0 <span style={{fontSize:13,color:accent}}>MISSION 01</span></h1>
      <p style={{fontSize:13,color:"#9ab8c6"}}>{t("3D sahada uygunsuzlukları bul ve doğru müdahaleyi seç","Find site hazards and select the correct intervention")}</p></div>
      <div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap"}}>
        <strong style={{color:accent}}>{completed}/12 · {score}/{MAX_MISSION_SCORE} {t("puan","points")} · {Math.floor(elapsed/60)}:{String(elapsed%60).padStart(2,"0")}</strong>
        <button style={buttonStyle} onClick={()=>setFirstPerson(v=>{engine.current?.cameraMode(!v);return !v;})}>{firstPerson?t("Üçüncü şahıs","Third person"):t("Göz hizası","Eye level")}</button>
        <button style={buttonStyle} onClick={()=>setGuidance(v=>!v)}>{guidance?t("İşaretleri gizle","Hide hints"):t("Eğitim ipuçları","Training hints")}</button>
        <button style={buttonStyle} onClick={()=>setLanguage(v=>v==="tr"?"en":"tr")}>{language==="tr"?"EN":"TR"}</button>
        <button style={buttonStyle} onClick={restart}>{t("Yeniden başlat","Restart")}</button>
      </div>
    </header>
    <div style={{height:"min(70vh,750px)",minHeight:440,position:"relative",overflow:"hidden",border:"1px solid #346171",borderRadius:18,background:"#90a7b5"}}>
      <canvas ref={canvas} style={{width:"100%",height:"100%",display:"block",touchAction:"none",cursor:"crosshair"}} />
      <div style={{position:"absolute",top:12,left:12,background:"#092538db",borderRadius:10,padding:"9px 12px",fontSize:12,maxWidth:"65%"}}>{status}<div style={{color:accent}}>{location}</div></div>
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",fontSize:30,color:"#f1fff5",textShadow:"0 0 5px #082a32",pointerEvents:"none"}}>+</div>
      {nearbyHint && <div style={{position:"absolute",bottom:82,left:"50%",transform:"translateX(-50%)",padding:"7px 12px",borderRadius:10,background:"#0b3542d9",color:"#c9f5e7",fontSize:12,pointerEvents:"none"}}>{nearbyHint}</div>}
      {help && <div style={{position:"absolute",left:"50%",top:12,transform:"translateX(-50%)",background:"#082538ed",borderRadius:12,padding:"10px 14px",fontSize:12,maxWidth:"80%",textAlign:"center"}}>{t("WASD: yürü · Fareyle sürükle: bak · E: incele · Sahadaki uygunsuzlukları incele","WASD: move · Drag: look · E: inspect · Find hazards")} <button onClick={()=>setHelp(false)} style={{marginLeft:10,color:accent}}>✕</button></div>}
      <div style={{position:"absolute",bottom:12,left:12,display:"grid",gridTemplateColumns:"repeat(3,48px)",gap:5,touchAction:"none"}}>
        <span/><button style={buttonStyle} onPointerDown={e=>{e.preventDefault();movement("w",true);}} onPointerUp={()=>movement("w",false)} onPointerCancel={()=>movement("w",false)}>▲</button><span/>
        <button style={buttonStyle} onPointerDown={e=>{e.preventDefault();movement("a",true);}} onPointerUp={()=>movement("a",false)} onPointerCancel={()=>movement("a",false)}>◀</button>
        <button style={buttonStyle} onPointerDown={e=>{e.preventDefault();movement("s",true);}} onPointerUp={()=>movement("s",false)} onPointerCancel={()=>movement("s",false)}>▼</button>
        <button style={buttonStyle} onPointerDown={e=>{e.preventDefault();movement("d",true);}} onPointerUp={()=>movement("d",false)} onPointerCancel={()=>movement("d",false)}>▶</button>
      </div>
      <button onClick={()=>engine.current?.inspect()} style={{...buttonStyle,position:"absolute",bottom:17,right:12,background:"#147b79",border:"2px solid #7cf5d9",fontWeight:800,fontSize:15}}>{t("İNCELE · E","INSPECT · E")}</button>
    </div>
    {selected && active && <div role="dialog" aria-label={active[language].title} style={{position:"fixed",inset:0,zIndex:100,background:"#020b1280",display:"flex",justifyContent:"flex-end",alignItems:"center",padding:16}}>
      <div style={{background:"#102e40",border:"1px solid #4e9f9f",borderRadius:18,padding:22,width:"min(390px,100%)",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:12}}><h2 style={{fontSize:21,fontWeight:800}}>{active[language].title}</h2><button style={buttonStyle} onClick={()=>setSelected(null)}>✕</button></div>
        <p style={{color:"#a6cbd2",marginTop:8}}>{active[language].category} · {distance?.toFixed(1)} m</p>
        <p style={{marginTop:16}}>{active[language].evidence}</p>
        <h3 style={{marginTop:18,fontWeight:750,color:accent}}>{t("Doğru güvenlik müdahalesi hangisi?","Which is the correct safety intervention?")}</h3>
        <div style={{display:"grid",gap:10,marginTop:12}}>{assessments[active.id][language].map((option,i)=><button key={i} onClick={()=>choose(i)} style={{...buttonStyle,textAlign:"left",padding:15}}>{String.fromCharCode(65+i)}. {option}</button>)}</div>
        {(mistakes[active.id]||0)>0&&<p style={{color:"#ffcb94",marginTop:12}}>{t("Yanlış müdahale. Tekrar değerlendir.","Incorrect. Reconsider the control.")} ({mistakes[active.id]})</p>}
      </div>
    </div>}
    <section style={{marginTop:18,background:"#0c2a39",border:"1px solid #294d5b",borderRadius:14,padding:16}}>
      <h2 style={{fontSize:19,fontWeight:750}}>{t("Saha bulguları ve yön bulma","Site findings and navigation")}</h2>
      <p style={{fontSize:12,color:"#a0beca",margin:"6px 0 14px"}}>{t("Önce sahada ara. Kaybolursan bir bölgeye git düğmesiyle eğitim noktasına ulaşabilirsin. İpuçlarını açarak eğitim bölgelerine gidebilirsin.","Explore the site first. Use go-to to reach a training location if needed. Enable training hints to jump to a training location.")}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:9}}>
        {trainingHazards.map((hazard,index)=><div key={hazard.id} style={{padding:11,borderRadius:9,border:"1px solid #315567",background:solved[hazard.id]!==undefined?"#164a42":"#123243"}}>
          <div style={{fontSize:13,fontWeight:700}}>{solved[hazard.id]!==undefined?"✓ ":""}{index+1}. {hazard[language].title}</div>
          {guidance&&<button style={{...buttonStyle,padding:"6px 10px",fontSize:12,marginTop:8}} onClick={()=>engine.current?.teleport(hazard.id)}>{t("Bölgeye git","Go to area")}</button>}
        </div>)}
      </div>
    </section>
    {completed===12&&<section style={{marginTop:16,padding:22,borderRadius:16,background:"#123a42",border:"1px solid #4d9c8d"}}>
      <h2 style={{fontSize:24,fontWeight:850,color:accent}}>{t("Saha denetimi tamamlandı","Inspection completed")}</h2>
      <p style={{marginTop:8}}>{score}/{MAX_MISSION_SCORE} {t("puan","points")} · {Math.floor(elapsed/60)}:{String(elapsed%60).padStart(2,"0")} · {t("12 uygunsuzluk değerlendirildi","12 hazards assessed")}</p>
      <p style={{marginTop:8,color:"#d1e6e4"}}>{score>=200?t("Başarılı denetim: yüksek doğruluk.","Strong inspection: high decision accuracy."):t("Eğitim önerisi: yanlış müdahaleleri tekrar gözden geçir.","Training recommended: review incorrect decisions.")}</p>
      <button style={{...buttonStyle,marginTop:14}} onClick={()=>window.print()}>{t("Denetim sonucunu yazdır","Print inspection result")}</button>
    </section>}
    <p style={{fontSize:11,color:"#8cabb9",marginTop:14}}>Experimental training simulation · Welding cart: Poly Haven (CC0). Tank model: Duane’s Mind / Sketchfab (CC BY). No Labs XP or account writes. Remaining hazard props are training placeholders, not verified real-world site observations.</p>
  </section>;
}
