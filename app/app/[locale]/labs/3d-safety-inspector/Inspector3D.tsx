"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { RefineryWorld } from "./world";
import s from "./inspector.module.css";

type Mode = "ready" | "running" | "paused" | "unsupported";
type Props = { locale: "tr" | "en" };
type Position = { x: number; z: number };

export default function Inspector3D({ locale }: Props) {
  const isTr = locale === "tr";
  const canvas = useRef<HTMLCanvasElement>(null);
  const world = useRef<RefineryWorld | null>(null);
  const active = useRef(false);
  const keys = useRef(new Set<string>());
  const [mode, setMode] = useState<Mode>("ready");
  const [error, setError] = useState("");
  const [position, setPosition] = useState<Position>({ x: 0, z: 30 });
  const [graphics, setGraphics] = useState<"high" | "low">("high");

  const pause = useCallback(() => {
    active.current = false;
    keys.current.clear();
    if (document.pointerLockElement === canvas.current) document.exitPointerLock();
    setMode((old) => old === "running" ? "paused" : old);
  }, []);

  useEffect(() => {
    const target = canvas.current;
    if (!target) return;
    let engine: RefineryWorld;
    try {
      engine = new RefineryWorld(target);
      world.current = engine;
    } catch (e) {
      setError(e instanceof Error ? e.message : "3D scene could not initialize");
      setMode("unsupported");
      return;
    }
    let frame = 0, previous = performance.now(), lastPosition = previous;
    let dragX = 0, dragY = 0, dragging = false;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (active.current) {
        const pressed = keys.current;
        const f = Number(pressed.has("KeyW") || pressed.has("ArrowUp")) - Number(pressed.has("KeyS") || pressed.has("ArrowDown"));
        const side = Number(pressed.has("KeyD") || pressed.has("ArrowRight")) - Number(pressed.has("KeyA") || pressed.has("ArrowLeft"));
        engine.walk(f, side, dt, pressed.has("ShiftLeft") || pressed.has("ShiftRight"));
      }
      // Render even when paused so the user sees the environment before entering.
      if (!document.hidden) engine.render();
      if (now - lastPosition > 420) {
        lastPosition = now;
        setPosition({ x: engine.state.x, z: engine.state.z });
      }
    };
    frame = requestAnimationFrame(tick);
    const onKeyDown = (event: KeyboardEvent) => {
      if (!active.current) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
      if (event.code === "Escape") { pause(); return; }
      keys.current.add(event.code);
    };
    const onKeyUp = (event: KeyboardEvent) => keys.current.delete(event.code);
    const onBlur = () => { if (active.current) pause(); };
    const onMouse = (event: MouseEvent) => {
      if (active.current && document.pointerLockElement === target) engine.look(event.movementX, event.movementY);
      else if (active.current && dragging) {
        engine.look(event.clientX - dragX, event.clientY - dragY);
        dragX = event.clientX; dragY = event.clientY;
      }
    };
    const onPointer = () => {
      if (document.pointerLockElement !== target && active.current && !dragging) {
        pause();
      }
    };
    const onMouseDown = (event: MouseEvent) => {
      if (event.button === 0 && active.current && document.pointerLockElement !== target) {
        dragging = true; dragX = event.clientX; dragY = event.clientY;
      }
    };
    const onMouseUp = () => { dragging = false; };
    const onContext = (event: MouseEvent) => event.preventDefault();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("pointerlockchange", onPointer);
    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("contextmenu", onContext);
    return () => {
      cancelAnimationFrame(frame);
      active.current = false;
      keys.current.clear();
      if (document.pointerLockElement === target) document.exitPointerLock();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("pointerlockchange", onPointer);
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("contextmenu", onContext);
      engine.dispose();
      world.current = null;
    };
  }, [pause]);

  const start = () => {
    if (!world.current) return;
    active.current = true;
    setMode("running");
    try {
      // Pointer lock is requested only from this direct user click.
      const result = canvas.current?.requestPointerLock();
      if (result && typeof result.catch === "function") {
        void result.catch(() => { /* drag-look remains available as a fallback */ });
      }
    } catch {
      // Keyboard navigation + mouse drag remains functional when lock is denied.
    }
  };
  const reset = () => {
    world.current?.reset();
    setPosition({ x: 0, z: 30 });
    pause();
    setMode("ready");
  };

  return (
    <main className={s.page}>
      <div className={s.shell}>
        <div className={s.nav}>
          <Link href={`/${locale}/labs`} className={s.back}>← {isTr ? "SERNEM Labs'e dön" : "Back to SERNEM Labs"}</Link>
          <span className={s.kicker}>SERNEM LABS / 3D SAFETY INSPECTOR / PACKAGE 01</span>
          <span className={s.status}>{isTr ? "OYUN PROTOTİPİ" : "PLAYABLE PROTOTYPE"}</span>
        </div>
        <div className={s.heading}>
          <div>
            <p className={s.eyebrow}>FIELD WALKTHROUGH · REFINERY MAINTENANCE ZONE</p>
            <h1>{isTr ? "Sahaya gir. Çevreni keşfet." : "Enter the site. Explore the field."}</h1>
            <p>{isTr ? "İlk paket: gezilebilir 3D endüstriyel saha, yürüyüş, bakış kontrolü ve çarpışma. Tehlike tespiti ikinci pakette eklenecek." : "Package one: explorable 3D industrial field, walking, camera and collisions. Hazard detection arrives in package two."}</p>
          </div>
          <div className={s.build}>ALPHA / P1 <span>●</span> WEBGL2</div>
        </div>

        <section className={s.viewport} aria-label={isTr ? "Gezilebilir 3D rafineri sahası" : "Explorable 3D refinery field"}>
          <canvas
            ref={canvas}
            className={s.canvas}
            aria-label={isTr ? "3D eğitim sahası. Başlat düğmesini seçin." : "3D training field. Choose Start to begin."}
          />
          <div className={s.topHud}>
            <div className={s.hudLabel}><b>MISSION 01</b><span>{isTr ? "SAHA KEŞFİ" : "FIELD ORIENTATION"}</span></div>
            <div className={s.hudRight}><span className={s.dot} /> {mode === "running" ? (isTr ? "SAHADASIN" : "ON SITE") : (isTr ? "HAZIR" : "STANDBY")}</div>
          </div>
          {mode === "running" && (
            <>
              <div className={s.crosshair} aria-hidden="true"><span /><span /></div>
              <div className={s.bottomHud}>
                <div className={s.controls}><b>W A S D</b><span>{isTr ? "Hareket" : "Move"}</span><b>{isTr ? "FARE" : "MOUSE"}</b><span>{isTr ? "Bakış" : "Look"}</span><b>SHIFT</b><span>{isTr ? "Hızlı yürü" : "Sprint"}</span></div>
                <button className={s.pause} type="button" onClick={pause}>{isTr ? "Duraklat" : "Pause"} <span>ESC</span></button>
              </div>
              <div className={s.coords}>X {position.x.toFixed(1)} &nbsp; | &nbsp; Z {position.z.toFixed(1)}</div>
            </>
          )}
          {mode !== "running" && (
            <div className={s.overlay}>
              <div className={s.modal}>
                <p className={s.eyebrow}>SERNEM FIELD TRAINING · 3D EXPERIENCE</p>
                <h2>{mode === "unsupported" ? (isTr ? "3D motor kullanılamıyor" : "3D engine unavailable") : mode === "paused" ? (isTr ? "Saha incelemesi duraklatıldı" : "Field walkthrough paused") : (isTr ? "Rafineri eğitim sahası" : "Refinery training environment")}</h2>
                <p>{mode === "unsupported" ? error : isTr ? "Boru hatları, tanklar, iskeleler ve bakım alanlarını gez. Bu birinci paket; tehlike puanlaması henüz etkin değil." : "Walk through pipe racks, tanks, scaffolding and a maintenance zone. This is package one; hazard scoring is not active yet."}</p>
                {mode !== "unsupported" && (
                  <>
                    <div className={s.features}>
                      <span>{isTr ? "3D saha" : "3D world"}</span>
                      <span>WASD + {isTr ? "fare" : "mouse"}</span>
                      <span>{isTr ? "Çarpışma" : "Collision"}</span>
                    </div>
                    <div className={s.buttons}>
                      <button type="button" onClick={start} className={s.primary}>{mode === "paused" ? (isTr ? "Devam et →" : "Resume →") : (isTr ? "Sahaya gir →" : "Enter the site →")}</button>
                      {mode === "paused" && <button type="button" onClick={reset} className={s.secondary}>{isTr ? "Baştan başla" : "Restart"}</button>}
                    </div>
                  </>
                )}
                <p className={s.help}>{isTr ? "Masaüstü tarayıcı önerilir. ESC ile duraklat. Fare kilidi engellenirse fareyi basılı sürükleyerek bakabilirsin." : "Desktop browser recommended. ESC to pause. If pointer lock is blocked, click and drag to look."}</p>
              </div>
            </div>
          )}
        </section>
        <div className={s.footer}>
          <div><b>{isTr ? "Paket 1 / Oynanabilir ortam" : "Package 1 / Playable environment"}</b><span>{isTr ? "Mevcut Labs, XP ve Premium altyapısı değiştirilmedi." : "Existing Labs, XP and Premium systems remain unchanged."}</span></div>
          <span className={s.footTag}>{isTr ? "Sonraki paket: uygunsuzluk motoru" : "Next package: hazard detection"}</span>
        </div>
      </div>
    </main>
  );
}
