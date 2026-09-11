"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./homepage.module.css";

export function HomepageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const videos = Array.from(node.querySelectorAll("video"));
    const visibility = new Map<HTMLVideoElement, boolean>();
    const sync = () => videos.forEach(video => {
      if (visibility.get(video) && !video.getAttribute("src") && video.dataset.src) {
        video.preload = "metadata";
        video.src = video.dataset.src;
        video.load();
      }
      if (paused || preference.matches || document.hidden || !visibility.get(video)) video.pause();
      else void video.play().catch(() => {});
    });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.setAttribute("data-visible", "true"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    node.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => visibility.set(entry.target as HTMLVideoElement, entry.isIntersecting)); sync();
    }, { rootMargin: "180px" });
    videos.forEach(video => videoObserver.observe(video));
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); videoObserver.disconnect(); preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); videos.forEach(video => video.pause()); };
  }, [paused]);
  return <div ref={root} className={s.home} data-paused={paused}>{children}<button className={s.motionControl} type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} aria-label={paused ? "Play background videos / Videoları oynat" : "Pause background videos / Videoları duraklat"}>{paused ? "▶" : "Ⅱ"}<span> VIDEO</span></button></div>;
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
