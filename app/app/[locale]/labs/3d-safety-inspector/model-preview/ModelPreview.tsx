"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const MODEL = "/models/refinery/large_industrial_storage_tanks.glb";
const SCRIPT = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js";
const SKETCHFAB = "https://sketchfab.com/models/bd3ac97071104b64bc388a155b64f79e/embed?autostart=1&ui_infos=0&ui_watermark=0";

export default function ModelPreview({ locale }: { locale: "tr" | "en" }) {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"checking" | "missing" | "loading" | "ready" | "error">("checking");
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const tr = locale === "tr";
  useEffect(() => {
    let cancelled = false;
    let viewer: HTMLElement | null = null;
    let script: HTMLScriptElement | null = null;
    const init = async () => {
      try {
        const head = localUrl ? { ok: true } : await fetch(MODEL, { method: "HEAD", cache: "no-store" });
        if (!head.ok) { if (!cancelled) setStatus("missing"); return; }
        if (cancelled) return;
        setStatus("loading");
        if (!customElements.get("model-viewer")) {
          script = document.createElement("script");
          script.type = "module";
          script.src = SCRIPT;
          document.head.appendChild(script);
        }
        await customElements.whenDefined("model-viewer");
        if (cancelled || !host.current) return;
        viewer = document.createElement("model-viewer");
        viewer.setAttribute("src", localUrl || MODEL);
        viewer.setAttribute("alt", "Industrial storage tanks with piping, stairs and equipment");
        viewer.setAttribute("camera-controls", "");
        viewer.setAttribute("auto-rotate", "");
        viewer.setAttribute("shadow-intensity", "1");
        viewer.setAttribute("environment-image", "neutral");
        viewer.setAttribute("exposure", "1");
        viewer.style.cssText = "display:block;width:100%;height:100%;background:linear-gradient(#d4e0e7,#7d929e);";
        viewer.addEventListener("load", () => { if (!cancelled) setStatus("ready"); });
        viewer.addEventListener("error", () => { if (!cancelled) setStatus("error"); });
        host.current.appendChild(viewer);
      } catch { if (!cancelled) setStatus("error"); }
    };
    void init();
    return () => { cancelled = true; viewer?.remove(); script?.remove(); };
  }, [localUrl]);
  return <main style={{minHeight:"100vh",background:"#091723",color:"#e9f5fc",padding:"24px",fontFamily:"system-ui"}}>
    <div style={{maxWidth:1200,margin:"auto"}}>
      <Link href={`/${locale}/labs/3d-safety-inspector/playtest`} style={{color:"#76d9e7"}}>← SERNEM SIM</Link>
      <h1 style={{fontSize:"clamp(22px,4vw,38px)",margin:"20px 0 6px"}}>SERNEM SIM · {tr?"Gerçek 3D Model Testi":"Real 3D Asset Test"}</h1>
      <p style={{color:"#b8d1de"}}>{tr?"Large Industrial Storage Tanks · GLB model görüntüleme testi":"Large Industrial Storage Tanks · GLB asset viewer"}</p>
      <label style={{display:"inline-block",marginTop:12,padding:"10px 16px",border:"1px solid #5abdc8",borderRadius:9,cursor:"pointer",color:"#a6f5ef"}}>
        {tr?"Bilgisayarımdan GLB aç":"Open GLB from device"}
        <input type="file" accept=".glb,model/gltf-binary" style={{display:"none"}} onChange={e=>{
          const file=e.target.files?.[0]; if(!file)return;
          if(file.size>100*1024*1024){setStatus("error");return;}
          setLocalUrl(prev=>{if(prev)URL.revokeObjectURL(prev);return URL.createObjectURL(file);});
        }}/>
      </label>
      <div ref={host} style={{height:"min(68vh,650px)",minHeight:360,border:"1px solid #335062",borderRadius:16,overflow:"hidden",position:"relative",marginTop:20}}>
        {status!=="ready"&&<div role="status" style={{position:"absolute",inset:0,display:"grid",placeItems:"center",textAlign:"center",padding:30}}>
          {status==="checking"||status==="loading"?(tr?"Model yükleniyor…":"Loading model…"):status==="missing"?(tr?"GLB henüz GitHub deposuna yüklenmedi. Beklenen yol: "+MODEL:"GLB has not been uploaded to GitHub yet: "+MODEL):(tr?"Model görüntüleyici yüklenemedi. Ağ veya CDN engeli olabilir.":"Model viewer failed to load. CDN or network may be blocked.")}
        </div>}
      </div>
      {status==="missing"&&<div style={{marginTop:16}}>
        <p style={{color:"#c9dfe8"}}>{tr?"GLB henüz sunucuda değil. Aşağıdaki orijinal Sketchfab 3D modeli şimdi inceleyebilirsin.":"The GLB is not hosted yet. Explore the original 3D model below."}</p>
        <iframe title="Large Industrial Storage Tanks - Sketchfab" src={SKETCHFAB} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy" style={{width:"100%",height:"min(65vh,600px)",minHeight:340,border:"1px solid #335062",borderRadius:16}}/>
      </div>}
      <p style={{color:"#a9c2ce",fontSize:13,marginTop:16}}>{tr?"Kaynak: Large Industrial Storage Tanks — Duane’s Mind (CC BY). Bu sayfa yalnızca model incelemesi içindir; 12 bulgulu oyun ayrı çalışır.":"Credit: Large Industrial Storage Tanks — Duane’s Mind (CC BY). Asset inspection only; the 12-hazard game remains separate."}</p>
    </div>
  </main>;
}
