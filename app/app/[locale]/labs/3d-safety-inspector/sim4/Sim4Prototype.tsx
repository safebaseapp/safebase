"use client";

import { useEffect, useRef, useState } from "react";

type PcApp = { start: () => void; destroy: () => void; resizeCanvas: (w: number, h: number) => void; root: { addChild: (entity: unknown) => void }; scene: { ambientLight: unknown } };
type PcApi = {
  Application: new (canvas: HTMLCanvasElement, options: Record<string, unknown>) => PcApp;
  Entity: new (name: string) => { addComponent: (type: string, options: Record<string, unknown>) => void; setPosition: (x: number, y: number, z: number) => void; setEulerAngles: (x: number, y: number, z: number) => void };
  Color: new (r: number, g: number, b: number) => unknown;
  FILLMODE_NONE: string;
  RESOLUTION_AUTO: string;
};

declare global { interface Window { pc?: PcApi } }

const SCRIPT_URL = "https://code.playcanvas.com/playcanvas-stable.min.js";

export default function Sim4Prototype() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("PlayCanvas motoru başlatılıyor…");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let app: PcApp | undefined;
    let observer: ResizeObserver | undefined;
    const start = () => {
      if (disposed || !window.pc || !canvas) return;
      try {
        const pc = window.pc;
        app = new pc.Application(canvas, { graphicsDeviceOptions: { antialias: true, alpha: false } });
        const camera = new pc.Entity("Prototype camera");
        camera.addComponent("camera", { clearColor: new pc.Color(0.045, 0.085, 0.12), farClip: 800 });
        camera.setPosition(0, 3, 10);
        camera.setEulerAngles(-8, 0, 0);
        app.root.addChild(camera);
        app.start();
        const resize = () => { if (canvas && app) app.resizeCanvas(canvas.clientWidth, canvas.clientHeight); };
        observer = new ResizeObserver(resize);
        observer.observe(canvas);
        resize();
        setStatus("Motor başlatıldı. Rafineri modeli henüz seçilmedi; bu yalnızca teknik entegrasyon testidir.");
      } catch (error) {
        console.error("SIM4 PlayCanvas startup failed", error);
        setStatus("PlayCanvas başlatılamadı. Tarayıcı konsolundaki hata incelenmeli.");
      }
    };
    if (window.pc) start();
    else {
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.dataset.sernemSim4 = "playcanvas";
      script.onload = start;
      script.onerror = () => setStatus("PlayCanvas betiği yüklenemedi.");
      document.head.appendChild(script);
    }
    return () => { disposed = true; observer?.disconnect(); app?.destroy(); };
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">SERNEM SIM 4.0 — Refinery Prototype</h1>
      <p className="mt-2 text-sm opacity-80">Bağımsız PlayCanvas teknik denemesi. SIM 3.0 ve canlı eğitim sistemi değiştirilmedi.</p>
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-600 bg-slate-950">
        <canvas ref={canvasRef} className="block h-[65vh] min-h-[360px] w-full" aria-label="SIM 4.0 PlayCanvas prototip görüntüsü" />
      </div>
      <p className="mt-3 text-sm" role="status">{status}</p>
      <p className="mt-2 text-xs opacity-70">Kalite onayı için gerçek rafineri GLB/GLTF çevresi, lisans ve mobil performans doğrulaması gereklidir.</p>
    </main>
  );
}
