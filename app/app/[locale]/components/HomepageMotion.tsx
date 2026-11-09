"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./homepage.module.css";

export function HomepageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const manuallyPaused = useRef(false);
  const explicitPlayback = useRef(false);
  const syncRef = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = Array.from(node.querySelectorAll<HTMLVideoElement>("video"));
    const hero = node.querySelector<HTMLVideoElement>("[data-home-hero-video]");
    const visibility = new Map<HTMLVideoElement, boolean>();

    const sync = () => {
      for (const video of videos) {
        if (visibility.get(video) && !video.getAttribute("src") && video.dataset.src) {
          video.preload = "metadata";
          video.src = video.dataset.src;
          video.load();
        }

        const shouldPause =
          manuallyPaused.current ||
          (preference.matches && !explicitPlayback.current) ||
          document.hidden ||
          !visibility.get(video);

        if (shouldPause) {
          if (!video.paused) video.pause();
        } else if (video.paused) {
          // Muted inline playback is permitted on most browsers. If the browser
          // blocks autoplay, the visible VIDEO control supplies a user gesture.
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          void video.play().catch(() => {
            if (video === hero) setPlaying(false);
          });
        }
      }
    };

    syncRef.current = sync;
    const revealObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          revealObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    node.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

    const videoObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        visibility.set(entry.target as HTMLVideoElement, entry.isIntersecting);
      }
      sync();
    }, { rootMargin: "180px" });

    const onHeroPlaying = () => setPlaying(true);
    const onHeroPaused = () => setPlaying(false);
    const onHeroTimeUpdate = () => {
      if (hero && !hero.paused) setPlaying(true);
    };

    hero?.addEventListener("playing", onHeroPlaying);
    hero?.addEventListener("pause", onHeroPaused);
    hero?.addEventListener("ended", onHeroPaused);
    hero?.addEventListener("error", onHeroPaused);
    hero?.addEventListener("timeupdate", onHeroTimeUpdate);

    for (const video of videos) {
      videoObserver.observe(video);
      video.addEventListener("canplay", sync);
    }
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pageshow", sync);
    sync();

    return () => {
      syncRef.current = null;
      revealObserver.disconnect();
      videoObserver.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pageshow", sync);
      for (const video of videos) {
        video.removeEventListener("canplay", sync);
        video.pause();
      }
      hero?.removeEventListener("playing", onHeroPlaying);
      hero?.removeEventListener("pause", onHeroPaused);
      hero?.removeEventListener("ended", onHeroPaused);
      hero?.removeEventListener("error", onHeroPaused);
      hero?.removeEventListener("timeupdate", onHeroTimeUpdate);
    };
  }, []);

  const togglePlayback = () => {
    const hero = root.current?.querySelector<HTMLVideoElement>("[data-home-hero-video]");
    const isPlaying = !!hero && !hero.paused && !hero.ended;

    if (isPlaying && !manuallyPaused.current) {
      manuallyPaused.current = true;
      explicitPlayback.current = false;
      hero.pause();
      syncRef.current?.();
      return;
    }

    manuallyPaused.current = false;
    // Explicitly pressing Play overrides a reduced-motion preference; the
    // initial visit still respects that accessibility setting.
    explicitPlayback.current = true;

    if (hero) {
      hero.muted = true;
      hero.defaultMuted = true;
      hero.playsInline = true;
      // Call play synchronously *within the click* for browser user activation.
      void hero.play().catch(() => setPlaying(false));
    }
    syncRef.current?.();
  };

  const pauseLabel = "Pause background videos / Videoları duraklat";
  const playLabel = "Play background videos / Videoları oynat";
  return (
    <div ref={root} className={s.home} data-paused={manuallyPaused.current}>
      {children}
      <button
        className={s.motionControl}
        type="button"
        aria-pressed={playing}
        aria-label={playing ? pauseLabel : playLabel}
        title={playing ? pauseLabel : playLabel}
        data-hero-playback={playing ? "playing" : "paused"}
        onClick={togglePlayback}
      >
        {playing ? "Ⅱ" : "▶"}<span> VIDEO</span>
      </button>
    </div>
  );
}

export function RiskWorkflow({ tr }: { tr: boolean }) {
  const [step, setStep] = useState(0);
  const labels = tr ? ["Tehlike", "Risk", "Kontrol", "Kalan risk", "PDF / Çıktı"] : ["Hazard", "Risk", "Control", "Residual risk", "PDF / Output"];
  const titles = tr ? ["Faaliyetten başlayın.", "Başlangıç riskini değerlendirin.", "Kontrolleri tanımlayın.", "Kontrol sonrası riski inceleyin.", "Sahaya hazır HIRARC kaydı."] : ["Start with the activity.", "Evaluate the initial risk.", "Define the controls.", "Review risk after controls.", "A field-ready HIRARC register."];
  const details = tr ? ["Faaliyet kütüphanesi → Yüksekte çalışma → Açık kenarlar", "Olasılık ve şiddeti saha koşullarına göre değerlendirin.", "Mevcut ve ek kontrolleri ayrı kaydedin. Sorumluyu tanımlayın.", "Kalan olasılık ve şiddeti bağımsız olarak değerlendirin.", "Proje bilgileri, tehlikeler, kontroller ve kalan risk tek dokümanda."] : ["Activity library → Work at height → Unprotected edges", "Assess likelihood and severity against actual site conditions.", "Record existing and additional controls. Identify responsibility.", "Evaluate residual likelihood and severity independently.", "Project details, hazards, controls and residual risk in one document."];
  return <div className={s.riskFrame} data-reveal>
    <div className={s.frameBar}><b>SERNEM / HIRARC</b><span>{tr ? "ETKİLEŞİMLİ ÖNİZLEME" : "INTERACTIVE PREVIEW"}</span></div>
    <div className={s.workflowSteps} role="group" aria-label={tr ? "Risk analizi adımları" : "Risk assessment stages"}>{labels.map((label, i) => <button key={label} aria-pressed={step === i} onClick={() => setStep(i)}><span>0{i + 1}</span>{label}</button>)}</div>
    <div className={s.riskBody}>
      <div className={s.riskRegister}><span className={s.eyebrow}>SRN-HIRARC-001 / {tr ? "ÖRNEK" : "SAMPLE"}</span><h3>{tr ? "Yüksekte çalışma" : "Work at height"}</h3><div className={s.registerRow}><span>{tr ? "Tehlike" : "Hazard"}</span><b>{tr ? "Açık kenardan düşme" : "Fall from an unprotected edge"}</b></div><div className={s.registerRow}><span>{tr ? "Değerlendirme" : "Assessment"}</span><b>{tr ? "Olasılık × Şiddet" : "Likelihood × Severity"}</b></div><div className={s.riskScores}><div><small>{tr ? "BAŞLANGIÇ" : "INITIAL"}</small><strong>15</strong><span>3 × 5</span></div><span>→</span><div><small>{tr ? "KALAN" : "RESIDUAL"}</small><strong>5</strong><span>1 × 5</span></div></div><p className={s.caption}>{tr ? "Örnek puanlar. Sahaya özgü değerlendirme gereklidir." : "Illustrative scores. Site-specific assessment required."}</p></div>
      <div className={s.riskDetail} aria-live="polite" aria-atomic="true"><span className={s.bigNumber}>0{step + 1}</span><div key={step} className={s.stepCopy}><span className={s.eyebrow}>{labels[step]}</span><h3>{titles[step]}</h3><p>{details[step]}</p></div><div className={s.documentRule}/><span className={s.caption}>{tr ? "Düzenlenebilir kayıtlar / Profesyonel çıktı" : "Editable registers / Professional output"}</span></div>
    </div>
  </div>;
}
