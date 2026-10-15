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
    let azimuth = 0;
    let orbitDistance = 1;
    let dragX: number | null = null;
    let userInteracted = false;
    let resize: (() => void) | undefined;
    let removeControls: (() => void) | undefined;
    const start = async () => {
      try {
        // @ts-ignore External ESM prototype module; isolated from application dependencies.
        const THREE = await import(/* webpackIgnore: true */ "https://esm.sh/three@0.180.0");
        // @ts-ignore External ESM prototype module; isolated from application dependencies.
        const { GLTFLoader } = await import(/* webpackIgnore: true */ "https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js");
        if (cancelled || !canvas.current) return;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#9aafbb");
        scene.fog = new THREE.Fog("#9aafbb", 85, 220);
        const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 250);
        camera.position.set(22, 12, 35);
        camera.lookAt(0, 6, 0);
        const webgl = new THREE.WebGLRenderer({ canvas: canvas.current, antialias: true, powerPreference: "high-performance" });
        const canvasElement = canvas.current;
        const onPointerDown = (event: PointerEvent) => { dragX = event.clientX; userInteracted = true; canvasElement.setPointerCapture(event.pointerId); };
        const onPointerMove = (event: PointerEvent) => { if (dragX !== null) { azimuth += (event.clientX - dragX) * 0.006; dragX = event.clientX; } };
        const onPointerUp = () => { dragX = null; };
        const onWheel = (event: WheelEvent) => { event.preventDefault(); orbitDistance = Math.min(2.4, Math.max(0.65, orbitDistance + event.deltaY * 0.001)); userInteracted = true; };
        canvasElement.addEventListener("pointerdown", onPointerDown);
        canvasElement.addEventListener("pointermove", onPointerMove);
        canvasElement.addEventListener("pointerup", onPointerUp);
        canvasElement.addEventListener("pointercancel", onPointerUp);
        canvasElement.addEventListener("wheel", onWheel, { passive: false });
        removeControls = () => { canvasElement.removeEventListener("pointerdown", onPointerDown); canvasElement.removeEventListener("pointermove", onPointerMove); canvasElement.removeEventListener("pointerup", onPointerUp); canvasElement.removeEventListener("pointercancel", onPointerUp); canvasElement.removeEventListener("wheel", onWheel); };
        renderer = webgl;
        webgl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        webgl.outputColorSpace = THREE.SRGBColorSpace;
        webgl.toneMapping = THREE.ACESFilmicToneMapping;
        webgl.toneMappingExposure = 0.82;
        webgl.shadowMap.enabled = true;
        webgl.shadowMap.type = THREE.PCFSoftShadowMap;
        scene.add(new THREE.HemisphereLight(0xddeaf2, 0x495963, 0.85));
        const sun = new THREE.DirectionalLight(0xffebd4, 1.9);
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
        let meshCount = 0;
        let mappedMaterials = 0;
        let totalMaterials = 0;
        model.scene.traverse((obj: any) => {
          if (obj instanceof THREE.Mesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
            meshCount++;
            const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const mat of materials) {
              if (!mat) continue;
              totalMaterials++;
              if (mat.map) { mappedMaterials++; mat.map.colorSpace = THREE.SRGBColorSpace; }
              mat.needsUpdate = true;
            }
          }
        });
        scene.add(model.scene);
        const maxSize = Math.max(size.x, size.y, size.z);
        camera.position.set(maxSize * 0.9, Math.max(size.y * 0.65, 9), maxSize * 1.1);
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
        setStatus(`SIM 2.0 · ${meshCount} mesh · ${mappedMaterials}/${totalMaterials} dokulu malzeme · PBR`);
        webgl.setAnimationLoop(() => {
          frame++;
          if (!userInteracted) azimuth += 0.0015;
          camera.position.x = Math.cos(azimuth) * maxSize * 1.05 * orbitDistance;
          camera.position.z = Math.sin(azimuth) * maxSize * 1.05 * orbitDistance;
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
      removeControls?.();
      renderer?.setAnimationLoop(null);
      renderer?.dispose();
    };
  }, []);
  return <section style={{ minHeight: "100vh", padding: "24px", color: "#d7edf3", background: "#071a26" }}>
    <h1 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, marginBottom: 8 }}>SERNEM SIM 2.0</h1>
    <p style={{ marginBottom: 16, color: "#a7c5d0" }}>Yeni 3D motor ve gerçek rafineri modeli · Fareyle veya dokunarak döndür · Kaydırarak yakınlaştır · Motor testi</p>
    <div style={{ position: "relative", height: "min(72vh,720px)", minHeight: 360, borderRadius: 18, overflow: "hidden", border: "1px solid #285364" }}>
      <canvas ref={canvas} style={{ width: "100%", height: "100%", display: "block", touchAction: "none", cursor: "grab" }} />
      <div role="status" style={{ position: "absolute", left: 12, bottom: 12, background: "#0a2638dd", borderRadius: 9, padding: "9px 12px", fontSize: 13 }}>{status}</div>
    </div>
    <p style={{ marginTop: 14, fontSize: 12, color: "#87a6b3" }}>Refinery model: Duane’s Mind (Sketchfab), CC BY. Three.js engine proof of concept.</p>
  </section>;
}
