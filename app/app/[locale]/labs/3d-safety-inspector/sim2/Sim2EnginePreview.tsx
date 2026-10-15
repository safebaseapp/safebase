"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Isolated SIM 2.0 renderer proof of concept. Existing P5 playtest stays intact.
 * Loads Three.js ES modules on the client without changing production dependencies.
 * The refinery GLB is the same attributed model used by the existing game.
 */
export default function Sim2EnginePreview() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("3D motor hazırlanıyor…");
  useEffect(() => {
    let cancelled = false;
    let renderer: { dispose: () => void; setAnimationLoop: (cb: null | (() => void)) => void; domElement: HTMLCanvasElement } | undefined;
    let frame = 0;
    let resize: (() => void) | undefined;
    const start = async () => {
      try {
        // @ts-ignore External ESM prototype module; isolated from application dependencies.
        const THREE = await import(/* webpackIgnore: true */ "https://esm.sh/three@0.180.0");
        // @ts-ignore External ESM prototype module; isolated from application dependencies.
        const { GLTFLoader } = await import(/* webpackIgnore: true */ "https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js");
        if (cancelled || !canvas.current) return;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#9aafbb");
        scene.fog = new THREE.Fog("#9aafbb", 55, 170);
        const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 250);
        camera.position.set(22, 12, 35);
        camera.lookAt(0, 6, 0);
        const webgl = new THREE.WebGLRenderer({ canvas: canvas.current, antialias: true, powerPreference: "high-performance" });
        renderer = webgl;
        webgl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        webgl.outputColorSpace = THREE.SRGBColorSpace;
        webgl.toneMapping = THREE.ACESFilmicToneMapping;
        webgl.toneMappingExposure = 1.35;
        webgl.shadowMap.enabled = true;
        webgl.shadowMap.type = THREE.PCFSoftShadowMap;
        scene.add(new THREE.HemisphereLight(0xe9f4ff, 0x52616c, 2.3));
        const sun = new THREE.DirectionalLight(0xffe8c7, 3.2);
        sun.position.set(-30, 48, 22);
        sun.castShadow = true;
        sun.shadow.mapSize.set(1024, 1024);
        sun.shadow.camera.left = -55;
        sun.shadow.camera.right = 55;
        sun.shadow.camera.top = 55;
        sun.shadow.camera.bottom = -55;
        scene.add(sun);
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(150, 150),
          new THREE.MeshStandardMaterial({ color: 0x727d80, roughness: 0.96, metalness: 0.02 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);
        const loader = new GLTFLoader();
        const model = await loader.loadAsync("/models/refinery/large_industrial_storage_tanks.glb");
        if (cancelled) { webgl.dispose(); return; }
        const bounds = new THREE.Box3().setFromObject(model.scene);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        model.scene.position.sub(center);
        model.scene.position.y += size.y / 2;
        model.scene.traverse((obj: any) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
        scene.add(model.scene);
        const maxSize = Math.max(size.x, size.y, size.z);
        camera.position.set(maxSize * 1.15, Math.max(size.y * 0.85, 9), maxSize * 1.5);
        camera.lookAt(0, size.y * 0.42, 0);
        resize = () => {
          if (!canvas.current) return;
          const width = canvas.current.clientWidth;
          const height = canvas.current.clientHeight;
          if (!width || !height) return;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          webgl.setSize(width, height, false);
        };
        window.addEventListener("resize", resize);
        resize();
        setStatus("SIM 2.0 · Gerçek GLB / PBR / gölgeler");
        webgl.setAnimationLoop(() => {
          frame++;
          camera.position.x = Math.cos(frame * 0.0015) * maxSize * 1.35;
          camera.position.z = Math.sin(frame * 0.0015) * maxSize * 1.35;
          camera.lookAt(0, size.y * 0.42, 0);
          webgl.render(scene, camera);
        });
      } catch (error) {
        if (!cancelled) setStatus("Motor yüklenemedi: " + String(error));
      }
    };
    void start();
    return () => {
      cancelled = true;
      if (resize) window.removeEventListener("resize", resize);
      renderer?.setAnimationLoop(null);
      renderer?.dispose();
    };
  }, []);
  return <section style={{ minHeight: "100vh", padding: "24px", color: "#d7edf3", background: "#071a26" }}>
    <h1 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, marginBottom: 8 }}>SERNEM SIM 2.0</h1>
    <p style={{ marginBottom: 16, color: "#a7c5d0" }}>Yeni 3D motor ve gerçek rafineri modeli · İzole motor testi (henüz oynanabilir görev sürümü değil)</p>
    <div style={{ position: "relative", height: "min(72vh,720px)", minHeight: 360, borderRadius: 18, overflow: "hidden", border: "1px solid #285364" }}>
      <canvas ref={canvas} style={{ width: "100%", height: "100%", display: "block" }} />
      <div role="status" style={{ position: "absolute", left: 12, bottom: 12, background: "#0a2638dd", borderRadius: 9, padding: "9px 12px", fontSize: 13 }}>{status}</div>
    </div>
    <p style={{ marginTop: 14, fontSize: 12, color: "#87a6b3" }}>Refinery model: Duane’s Mind (Sketchfab), CC BY. Three.js engine proof of concept.</p>
  </section>;
}
