"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { RefineryWorld } from "./world";
import { trainingHazards, HAZARD_COUNT, type SafetyHazard } from "./hazards";
import { assessments, MAX_MISSION_SCORE, pointsForDecision } from "./assessment";
import s from "./inspector.module.css";

type Mode = "ready" | "running" | "paused" | "inspecting" | "unsupported";
type Props = { locale: "tr" | "en" };
type Position = { x: number; z: number };

export default function Inspector3D({ locale }: Props) {
  const isTr = locale === "tr";
  const canvas = useRef<HTMLCanvasElement>(null);
  const world = useRef<RefineryWorld | null>(null);
  const active = useRef(false);
  const keys = useRef(new Set<string>());
  const touchMove = useRef({ forward: 0, side: 0 });
  const joystickPointer = useRef<number | null>(null);
  const [stick, setStick] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<Mode>("ready");
  const [error, setError] = useState("");
  const [position, setPosition] = useState<Position>({ x: 0, z: 30 });
  const confirmed = useRef(new Set<string>());
  const [found, setFound] = useState<string[]>([]);
  const [focus, setFocus] = useState<SafetyHazard | null>(null);
  const [inspection, setInspection] = useState<SafetyHazard | null>(null);
  const [hint, setHint] = useState("");
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [points, setPoints] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState(0);
  const timeRef = useRef(0);
  const missionScore = Object.values(points).reduce((sum, item) => sum + item, 0);

  const pause = useCallback(() => {
    active.current = false;
    keys.current.clear();
    touchMove.current = { forward: 0, side: 0 };
    joystickPointer.current = null;
    setStick({ x: 0, y: 0 });
    if (document.pointerLockElement === canvas.current) document.exitPointerLock();
    setMode((old) => old === "running" ? "paused" : old);
  }, []);

  const inspect = useCallback(() => {
    if (!active.current || !world.current) return;
    const match = world.current.pickHazard(confirmed.current);
    if (!match) {
      setHint(isTr
        ? "Bir bulguyu incelemek için nişangâhı görünen uygunsuzluğa çevir ve yaklaş."
        : "Aim the crosshair at visible unsafe equipment or conditions and move closer.");
      return;
    }
    active.current = false;
    keys.current.clear();
    setFocus(null);
    setHint("");
    setInspection(match);
    setPicked(null);
    setWrongAttempts(0);
    setResolved(false);
    setMode("inspecting");
    if (document.pointerLockElement === canvas.current) document.exitPointerLock();
  }, [isTr]);

  const chooseDecision = (choice: number) => {
    if (!inspection || resolved) return;
    setPicked(choice);
    if (choice === assessments[inspection.id].correct) {
      setResolved(true);
    } else {
      setWrongAttempts(old => old + 1);
    }
  };

  const saveFinding = () => {
    if (!inspection || !resolved) return;
    confirmed.current.add(inspection.id);
    setPoints(old => ({ ...old, [inspection.id]: pointsForDecision(wrongAttempts) }));
    setFound([...confirmed.current]);
    setInspection(null);
    setMode("paused");
  };

  const cancelInspection = () => {
    setInspection(null);
    setMode("paused");
  };

  const moveStick = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const range = Math.max(30, Math.min(rect.width, rect.height) * 0.34);
    let x = event.clientX - (rect.left + rect.width / 2);
    let y = event.clientY - (rect.top + rect.height / 2);
    const length = Math.hypot(x, y);
    if (length > range) { x *= range / length; y *= range / length; }
    setStick({ x, y });
    // Forward is positive when the thumb travels upward.
    touchMove.current = {
      forward: Math.abs(y) < 5 ? 0 : -y / range,
      side: Math.abs(x) < 5 ? 0 : x / range,
    };
  };

  const releaseStick = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (joystickPointer.current !== event.pointerId) return;
    joystickPointer.current = null;
    touchMove.current = { forward: 0, side: 0 };
    setStick({ x: 0, y: 0 });
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

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
    let frame = 0, previous = performance.now(), lastPosition = previous, lastAim = previous;
    let dragX = 0, dragY = 0, dragging = false;
    let lookTouch: number | null = null;
    let lastTouchX = 0, lastTouchY = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (active.current) {
        timeRef.current += dt;
        const secondsElapsed = Math.floor(timeRef.current);
        if (secondsElapsed !== Math.floor(timeRef.current - dt)) setSeconds(secondsElapsed);
        const pressed = keys.current;
        const f = Number(pressed.has("KeyW") || pressed.has("ArrowUp")) - Number(pressed.has("KeyS") || pressed.has("ArrowDown"));
        const side = Number(pressed.has("KeyD") || pressed.has("ArrowRight")) - Number(pressed.has("KeyA") || pressed.has("ArrowLeft"));
        engine.walk(f + touchMove.current.forward, side + touchMove.current.side, dt, pressed.has("ShiftLeft") || pressed.has("ShiftRight"));
      }
      // Render even when paused so the user sees the environment before entering.
      if (!document.hidden) engine.render();
      if (now - lastPosition > 420) {
        lastPosition = now;
        setPosition({ x: engine.state.x, z: engine.state.z });
      }
      if (active.current && now - lastAim > 150) {
        lastAim = now;
        const target = engine.pickHazard(confirmed.current);
        setFocus(current => current?.id === target?.id ? current : target);
      }
    };
    frame = requestAnimationFrame(tick);
    const onKeyDown = (event: KeyboardEvent) => {
      if (!active.current) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
      if (event.code === "Escape") { pause(); return; }
      if (event.code === "KeyE") { event.preventDefault(); inspect(); return; }
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
      if (event.button !== 0 || !active.current) return;
      if (document.pointerLockElement === target) { inspect(); return; }
      dragging = true; dragX = event.clientX; dragY = event.clientY;
    };
    const onMouseUp = () => { dragging = false; };
    // On touchscreens the right-hand play area rotates the first-person camera.
    // A distinct pointer ID makes the camera compatible with the joystick being held.
    const onTouchDown = (event: PointerEvent) => {
      if (!active.current || event.pointerType !== "touch" || lookTouch !== null) return;
      event.preventDefault();
      lookTouch = event.pointerId;
      lastTouchX = event.clientX;
      lastTouchY = event.clientY;
      target.setPointerCapture(event.pointerId);
    };
    const onTouchMove = (event: PointerEvent) => {
      if (!active.current || event.pointerType !== "touch" || event.pointerId !== lookTouch) return;
      event.preventDefault();
      engine.look((event.clientX - lastTouchX) * 1.35, (event.clientY - lastTouchY) * 1.35);
      lastTouchX = event.clientX;
      lastTouchY = event.clientY;
    };
    const onTouchEnd = (event: PointerEvent) => {
      if (event.pointerId !== lookTouch) return;
      lookTouch = null;
      if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
    };
    const onContext = (event: MouseEvent) => event.preventDefault();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("pointerlockchange", onPointer);
    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("pointerdown", onTouchDown);
    target.addEventListener("pointermove", onTouchMove);
    target.addEventListener("pointerup", onTouchEnd);
    target.addEventListener("pointercancel", onTouchEnd);
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
      target.removeEventListener("pointerdown", onTouchDown);
      target.removeEventListener("pointermove", onTouchMove);
      target.removeEventListener("pointerup", onTouchEnd);
      target.removeEventListener("pointercancel", onTouchEnd);
      target.removeEventListener("contextmenu", onContext);
      engine.dispose();
      world.current = null;
    };
  }, [pause, inspect]);

  const start = () => {
    if (!world.current) return;
    active.current = true;
    setHint("");
    setInspection(null);
    setMode("running");
    try {
      // Pointer lock is requested only from this direct user click.
      const isTouchscreen = window.matchMedia("(pointer: coarse)").matches;
      const result = isTouchscreen ? undefined : canvas.current?.requestPointerLock();
      if (result && typeof result.catch === "function") {
        void result.catch(() => { /* drag-look remains available as a fallback */ });
      }
    } catch {
      // Keyboard navigation + mouse drag remains functional when lock is denied.
    }
  };
  const reset = () => {
    world.current?.reset();
    confirmed.current.clear();
    setFound([]);
    setPoints({});
    setPicked(null);
    setWrongAttempts(0);
    setResolved(false);
    timeRef.current = 0;
    setSeconds(0);
    setFocus(null);
    setInspection(null);
    setHint("");
    setPosition({ x: 0, z: 30 });
    touchMove.current = { forward: 0, side: 0 };
    setStick({ x: 0, y: 0 });
    pause();
    setMode("ready");
  };

  return (
    <main className={s.page}>
      <div className={s.shell}>
        <div className={s.nav}>
          <Link href={`/${locale}/labs`} className={s.back}>← {isTr ? "SERNEM Labs'e dön" : "Back to SERNEM Labs"}</Link>
          <span className={s.kicker}>SERNEM LABS / 3D SAFETY INSPECTOR / PACKAGE 03</span>
          <span className={s.status}>{isTr ? "GÖREV BETA" : "MISSION BETA"}</span>
        </div>
        <div className={s.heading}>
          <div>
            <p className={s.eyebrow}>FIELD WALKTHROUGH · REFINERY MAINTENANCE ZONE</p>
            <h1>{isTr ? "Sahaya gir. Uygunsuzlukları tespit et." : "Enter the site. Find the hazards."}</h1>
            <p>{isTr ? "Üçüncü paket: 3D sahada 12 uygunsuzluğu bul, müdahale kararını ver ve görevi puanla." : "Package three: discover 12 hazards in the 3D site, choose safe interventions and earn mission points."}</p>
          </div>
          <div className={s.build}>ALPHA / P3 <span>●</span> WEBGL2</div>
        </div>

        <section className={s.viewport} aria-label={isTr ? "Gezilebilir 3D rafineri sahası" : "Explorable 3D refinery field"}>
          <canvas
            ref={canvas}
            className={s.canvas}
            aria-label={isTr ? "3D eğitim sahası. Başlat düğmesini seçin." : "3D training field. Choose Start to begin."}
          />
          <div className={s.topHud}>
            <div className={s.hudLabel}><b>MISSION 01</b><span>{isTr ? "SAHA DENETİMİ" : "SITE INSPECTION"}</span></div>
            <div className={s.hudRight}><span className={s.dot} /> {isTr ? "BULGULAR" : "FINDINGS"} <b>{found.length}/{HAZARD_COUNT}</b><span className={s.hudScore}>{missionScore}/{MAX_MISSION_SCORE} {isTr ? "PUAN" : "PTS"}</span></div>
          </div>
          {mode === "running" && (
            <>
              <div className={s.crosshair} aria-hidden="true"><span /><span /></div>
              <div className={s.aim}>
                {focus
                  ? <button type="button" className={s.inspectAction} onClick={inspect}>
                      <b className={s.keyboardHint}>[E]</b> {isTr ? "Uygunsuzluğu incele" : "Inspect finding"}
                    </button>
                  : <span><span className={s.desktopPrompt}>{isTr ? "Sahadaki riskleri incele • E ile işaretle" : "Survey site conditions • Press E to mark"}</span><span className={s.mobilePrompt}>{isTr ? "Etrafına bak • Uygunsuzluğu hedefle ve İncele’ye dokun" : "Look around • Aim at a hazard and tap Inspect"}</span></span>}
              </div>
              {hint && <div role="status" className={s.hint}>{hint}</div>}
              <div className={s.mobileControls}>
                <div className={s.joystickRegion}>
                  <div
                    role="group"
                    aria-label={isTr ? "Yürüme joystick'i" : "Movement joystick"}
                    className={s.joystickPad}
                    onPointerDown={(event) => {
                      if (!active.current || joystickPointer.current !== null) return;
                      event.preventDefault();
                      joystickPointer.current = event.pointerId;
                      event.currentTarget.setPointerCapture(event.pointerId);
                      moveStick(event);
                    }}
                    onPointerMove={(event) => {
                      if (joystickPointer.current !== event.pointerId) return;
                      event.preventDefault();
                      moveStick(event);
                    }}
                    onPointerUp={releaseStick}
                    onPointerCancel={releaseStick}
                    onLostPointerCapture={releaseStick}
                  >
                    <div className={s.joystickRing} />
                    <div className={s.joystickThumb} style={{ transform: `translate(${stick.x}px, ${stick.y}px)` }} />
                  </div>
                  <span className={s.touchCaption}>{isTr ? "YÜRÜ" : "MOVE"}</span>
                </div>
                <div className={s.touchActions}>
                  <button type="button" className={s.touchInspect} onClick={inspect}>
                    <span aria-hidden="true">◎</span>{isTr ? "İNCELE" : "INSPECT"}
                  </button>
                  <button type="button" className={s.touchPause} onClick={pause}>
                    {isTr ? "Duraklat" : "Pause"} <span aria-hidden="true">Ⅱ</span>
                  </button>
                </div>
              </div>
              <div className={s.bottomHud}>
                <div className={s.controls}><b>W A S D</b><span>{isTr ? "Hareket" : "Move"}</span><b>{isTr ? "FARE" : "MOUSE"}</b><span>{isTr ? "Bakış" : "Look"}</span><b>SHIFT</b><span>{isTr ? "Hızlı yürü" : "Sprint"}</span><b>E</b><span>{isTr ? "İncele" : "Inspect"}</span></div>
                <button className={s.pause} type="button" onClick={pause}>{isTr ? "Duraklat" : "Pause"} <span>ESC</span></button>
              </div>
              <div className={s.coords}>X {position.x.toFixed(1)} &nbsp; | &nbsp; Z {position.z.toFixed(1)}</div>
            </>
          )}
          {mode === "inspecting" && inspection && (
            <div className={s.overlay}>
              <div className={s.modal} role="dialog" aria-modal="true" aria-labelledby="finding-title">
                <p className={s.eyebrow}>SITE OBSERVATION · {inspection.id.toUpperCase().replaceAll("-", " ")}</p>
                <h2 id="finding-title">{inspection[locale].title}</h2>
                <p className={s.findingCategory}>{inspection[locale].category}</p>
                <div className={s.findingBlock}>
                  <strong>{isTr ? "Sahada görülen uygunsuzluk" : "Visible evidence"}</strong>
                  <p>{inspection[locale].evidence}</p>
                </div>
                <div className={s.decisionPanel}>
                  <p className={s.decisionTitle}>{isTr ? "HSE KARARI · İlk doğru müdahale nedir?" : "HSE JUDGMENT · What is the safest immediate action?"}</p>
                  <div className={s.decisionChoices} role="group" aria-label={isTr ? "Müdahale seçenekleri" : "Response options"}>
                    {assessments[inspection.id][locale].map((label, index) => (
                      <button
                        type="button"
                        key={index}
                        disabled={resolved}
                        className={`${s.decisionOption} ${picked === index ? (resolved ? s.isCorrect : s.isWrong) : ""}`}
                        onClick={() => chooseDecision(index)}
                      >
                        <span>{String.fromCharCode(65 + index)}</span>{label}
                      </button>
                    ))}
                  </div>
                  {picked !== null && !resolved && <p className={s.decisionWrong} role="status">
                    {isTr ? "Bu önlem riski yeterince kontrol etmiyor. Daha güvenli müdahaleyi seç." : "This option does not adequately control the hazard. Choose a safer intervention."}
                  </p>}
                  {resolved && <p className={s.decisionSuccess} role="status">
                    {isTr ? `Doğru müdahale! Bu bulgudan ${pointsForDecision(wrongAttempts)} / 20 puan kazanacaksın.` : `Correct intervention! This finding earns ${pointsForDecision(wrongAttempts)} / 20 mission points.`}
                  </p>}
                </div>
                {resolved && (
                  <div className={s.findingBlock}>
                    <strong>{isTr ? "Önerilen kontrol önlemi" : "Recommended control"}</strong>
                    <p>{inspection[locale].control}</p>
                    <p className={s.priorityLabel}>{isTr ? "Eğitim önceliği" : "Training priority"}: {assessments[inspection.id].priority === "critical" ? (isTr ? "Acil müdahale" : "Immediate action") : (isTr ? "Yüksek" : "High")}</p>
                  </div>
                )}
                <p className={s.trainingNotice}>{isTr
                  ? "Bu kurgusal bir eğitim sahnesidir. Gerçek sahada yerel mevzuatı ve izin prosedürlerini doğrulayın."
                  : "This is a fictional training scene. Verify local rules and permits for real workplaces."}</p>
                <div className={s.buttons}>
                  <button type="button" className={s.primary} disabled={!resolved} onClick={saveFinding}>{isTr ? "Kararı ve bulguyu kaydet ✓" : "Record decision & finding ✓"}</button>
                  <button type="button" className={s.secondary} onClick={cancelInspection}>{isTr ? "Geri dön" : "Go back"}</button>
                </div>
              </div>
            </div>
          )}
          {mode !== "running" && mode !== "inspecting" && (
            <div className={s.overlay}>
              <div className={s.modal}>
                <p className={s.eyebrow}>SERNEM FIELD TRAINING · 3D EXPERIENCE</p>
                <h2>{mode === "unsupported" ? (isTr ? "3D motor kullanılamıyor" : "3D engine unavailable") : mode === "paused" ? (isTr ? "Saha incelemesi duraklatıldı" : "Field walkthrough paused") : (isTr ? "Rafineri eğitim sahası" : "Refinery training environment")}</h2>
                <p>{mode === "unsupported" ? error : isTr ? "Sahada uygunsuzlukları bul. Telefonda sol joystick ile yürü, ekranda parmağını sürükleyerek bak ve İncele düğmesine bas. Bilgisayarda WASD / fare / E kullanılabilir. Görev puanı vardır; XP verilmez." : "Find unsafe conditions. On mobile, walk with the left joystick, drag the scene to look, then tap Inspect. Desktop: WASD / mouse / E. Mission points are separate from XP."}</p>
                {mode !== "unsupported" && (
                  <>
                    <div className={s.features}>
                      <span>{isTr ? "3D saha" : "3D world"}</span>
                      <span>{isTr ? "Telefon: joystick + dokunmatik" : "Mobile: joystick + touch"}</span>
                      <span>{isTr ? "Çarpışma" : "Collision"}</span>
                      <span>{isTr ? `12 eğitim tehlikesi` : `12 training hazards`}</span>
                    </div>
                    <div className={s.buttons}>
                      <button type="button" onClick={start} className={s.primary}>{mode === "paused" ? (isTr ? "Devam et →" : "Resume →") : (isTr ? "Sahaya gir →" : "Enter the site →")}</button>
                      {mode === "paused" && <button type="button" onClick={reset} className={s.secondary}>{isTr ? "Baştan başla" : "Restart"}</button>}
                    </div>
                  </>
                )}
                <p className={s.help}>{isTr ? "Telefonda sol joystick ile hareket et; 3D görüntü üzerinde sürükleyerek etrafa bak. İncele ve Duraklat butonları sağda." : "On mobile use the left joystick to move; drag across the 3D scene to look. Inspect and Pause are on the right."}</p>
              </div>
            </div>
          )}
        </section>
        <section className={s.findingSummary} aria-label={isTr ? "Tespit edilen uygunsuzluklar" : "Recorded findings"}>
          <div className={s.summaryTitle}>
            <div>
              <span className={s.eyebrow}>TRAINING OBSERVATIONS</span>
              <h2>{isTr ? "Saha tespitleri" : "Site findings"} <strong>{found.length}/{HAZARD_COUNT}</strong></h2>
              <p className={s.scoreLine}>{isTr ? "Görev puanı" : "Mission score"}: <strong>{missionScore}/{MAX_MISSION_SCORE}</strong> · {isTr ? "Aktif saha süresi" : "Active field time"}: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</p>
            </div>
            <button className={s.secondary} type="button" onClick={reset}>{isTr ? "Görevi sıfırla" : "Reset mission"}</button>
          </div>
          {found.length === 0 ? (
            <p className={s.summaryEmpty}>{isTr
              ? "Henüz bulgu kaydedilmedi. Tehlikeli koşullara yaklaş, hedefle; telefonda İncele düğmesine bas."
              : "No findings recorded. Explore the field, aim at visibly unsafe conditions, then press E."}</p>
          ) : (
            <ul className={s.findingList}>
              {trainingHazards.filter(item => found.includes(item.id)).map(item => (
                <li key={item.id}><span>✓</span>{item[locale].title}</li>
              ))}
            </ul>
          )}
          {found.length === HAZARD_COUNT && <p role="status" className={s.completed}>
            {isTr ? `Görev tamamlandı! 12/12 bulgu ve HSE kararları kaydedildi. Puanın: ${missionScore}/${MAX_MISSION_SCORE} (XP değil).` : `Mission completed! All 12 HSE decisions recorded. Score: ${missionScore}/${MAX_MISSION_SCORE} (not XP).`}
          </p>}
        </section>

        <div className={s.footer}>
          <div><b>{isTr ? "Paket 3 / Risk kararı ve görev puanı" : "Package 3 / HSE judgment and mission score"}</b><span>{isTr ? "Mevcut Labs, XP ve Premium altyapısı değiştirilmedi." : "Existing Labs, XP and Premium systems remain unchanged."}</span></div>
          <span className={s.footTag}>{isTr ? "Sonraki paket: ilerleme kaydı ve XP entegrasyon testleri" : "Next package: progress persistence and XP integration QA"}</span>
        </div>
      </div>
    </main>
  );
}
