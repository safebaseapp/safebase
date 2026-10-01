"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { LabHotspot, LabScenario, ScenarioScore } from "@/lib/labs/types";
import { scoreMultiSelectScenario } from "@/lib/labs/scoring";
import { trackUserEvent } from "@/lib/analytics/track-user-event";

type Props = {
  scenario: LabScenario;
  locale: "tr" | "en";
  index: number;
  total: number;
  nextHref?: string;
};

type AttemptResponse = {
  saved?: boolean;
  firstCompletion?: boolean;
  result?: ScenarioScore;
  progress?: {
    totalXp: number;
    level: number;
    currentStreak: number;
    longestStreak: number;
    scenarioCount: number;
  };
};

type ScenePoint = { x: number; y: number };

export default function SpotTheHazardGame({ scenario, locale, index, total, nextHref }: Props) {
  const isTr = locale === "tr";
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serverResult, setServerResult] = useState<ScenarioScore | null>(null);
  const [saved, setSaved] = useState<boolean | null>(null);
  const [firstCompletion, setFirstCompletion] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<AttemptResponse["progress"]>();
  const [imageFailed, setImageFailed] = useState(false);
  const [missPoint, setMissPoint] = useState<ScenePoint | null>(null);

  const options = scenario.options ?? [];
  const hotspots = scenario.hotspots ?? [];
  const answerIds = Array.isArray(scenario.correct_answer)
    ? scenario.correct_answer
    : ([scenario.correct_answer].filter(Boolean) as string[]);
  const result = serverResult ?? (submitted ? scoreMultiSelectScenario(scenario, selected) : null);
  const isFinalChallenge = index === total - 1;

  useEffect(() => {
    setImageFailed(false);
    setSelected([]);
    setSubmitted(false);
    setMissPoint(null);
    void trackUserEvent("lab_scenario_view", {
      scenario_id: scenario.id,
      scenario_type: scenario.type,
      category: scenario.category,
      difficulty: scenario.difficulty,
      locale,
    });
  }, [scenario.id, scenario.type, scenario.category, scenario.difficulty, locale]);

  function hotspotWasHit(hotspot: LabHotspot, point: ScenePoint, width: number, height: number) {
    const dx = ((point.x - hotspot.x) / 100) * width;
    const dy = ((point.y - hotspot.y) / 100) * height;
    const radiusPx = (hotspot.radius / 100) * Math.min(width, height);
    return Math.hypot(dx, dy) <= radiusPx;
  }

  function markScene(event: MouseEvent<HTMLButtonElement>) {
    if (submitted || selected.length >= answerIds.length) return;

    const image = event.currentTarget.querySelector("img");
    if (!image) return;

    const rect = image.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;
    if (clientX < 0 || clientY < 0 || clientX > rect.width || clientY > rect.height) return;

    const point = {
      x: (clientX / rect.width) * 100,
      y: (clientY / rect.height) * 100,
    };

    const hit = hotspots.find(
      (hotspot) =>
        answerIds.includes(hotspot.id) &&
        !selected.includes(hotspot.id) &&
        hotspotWasHit(hotspot, point, rect.width, rect.height),
    );

    if (!hit) {
      setMissPoint(point);
      return;
    }

    setMissPoint(null);
    setSelected((current) => [...current, hit.id]);
    void trackUserEvent("lab_hazard_found", {
      scenario_id: scenario.id,
      hazard_id: hit.id,
      found_count: selected.length + 1,
      locale,
    });
  }

  async function submitAttempt() {
    if (!selected.length || saving) return;

    setSubmitted(true);
    setSaving(true);
    setSaved(null);
    setServerResult(null);

    void trackUserEvent("lab_answer_submit", {
      scenario_id: scenario.id,
      scenario_type: scenario.type,
      category: scenario.category,
      difficulty: scenario.difficulty,
      selected_count: selected.length,
      locale,
    });

    try {
      const response = await fetch("/api/labs/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: scenario.id, locale, selectedAnswers: selected }),
      });
      if (!response.ok) throw new Error("attempt_save_failed");

      const payload = (await response.json()) as AttemptResponse;
      if (payload.result) setServerResult(payload.result);
      setSaved(Boolean(payload.saved));
      setFirstCompletion(payload.firstCompletion ?? null);
      setProgress(payload.progress);
    } catch {
      setSaved(false);
    } finally {
      setSaving(false);
    }
  }

  function resetAttempt() {
    setSelected([]);
    setSubmitted(false);
    setSaving(false);
    setServerResult(null);
    setSaved(null);
    setFirstCompletion(null);
    setProgress(undefined);
    setMissPoint(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <a href={`/${locale}/labs`} className="text-sm font-semibold text-cyan-300">← SERNEM Labs</a>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Challenge {index + 1}/{total}</div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
          <div className="grid lg:grid-cols-[1.35fr_.65fr]">
            <div className="border-b border-white/10 bg-black lg:border-b-0 lg:border-r">
              {!imageFailed && scenario.image ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={markScene}
                    disabled={submitted}
                    className="relative block w-full cursor-crosshair disabled:cursor-default"
                    aria-label={isTr ? "Sahnede tehlike gördüğünüz noktaya tıklayın" : "Click where you see a hazard"}
                  >
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      onError={() => setImageFailed(true)}
                      className="block h-auto max-h-[78vh] w-full object-contain [image-rendering:auto]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />

                    {selected.map((id) => {
                      const hotspot = hotspots.find((item) => item.id === id);
                      if (!hotspot) return null;
                      return (
                        <span
                          key={id}
                          className="pointer-events-none absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-300 bg-emerald-400/20 shadow-[0_0_0_6px_rgba(52,211,153,.12)]"
                          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                          aria-hidden="true"
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-emerald-200">✓</span>
                        </span>
                      );
                    })}

                    {missPoint && !submitted && (
                      <span
                        className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400 bg-rose-500/15"
                        style={{ left: `${missPoint.x}%`, top: `${missPoint.y}%` }}
                        aria-hidden="true"
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-base font-black text-rose-300">×</span>
                      </span>
                    )}
                  </button>

                  <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-[11px] font-black uppercase tracking-[.18em]">SERNEM Original Scene</div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <h2 className="text-2xl font-black drop-shadow sm:text-3xl">{scenario.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-200 drop-shadow">{scenario.scenario}</p>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[420px] items-center justify-center p-8 text-slate-400">{isTr ? "Sahne yüklenemedi." : "Scene could not be loaded."}</div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">{isTr ? "Görsel tehlike avı" : "Visual hazard hunt"}</p>
              <h1 className="mt-3 text-2xl font-black">{isTr ? "Sahneyi incele. Tehlikeleri kendin bul." : "Inspect the scene. Find the hazards yourself."}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {isTr
                  ? "Cevap ipucu vermiyoruz. Görselde müdahale gerektirdiğini düşündüğün noktaları işaretle; açıklamalar challenge sonunda açılır."
                  : "No answer clues are shown. Mark the areas you believe require intervention; explanations are revealed after the challenge."}
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-5">
                <div className="text-sm font-bold text-slate-200">{isTr ? "Tespit edilen nokta" : "Marked points"}</div>
                <div className="mt-2 text-4xl font-black text-cyan-300">
                  {selected.length}<span className="text-base text-slate-500"> / {answerIds.length}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500" aria-live="polite">
                  {missPoint
                    ? isTr
                      ? "Bu noktada tanımlı bir tehlike yok. Sahneyi tekrar incele."
                      : "No defined hazard at that point. Inspect the scene again."
                    : isTr
                      ? "Tehlikenin bulunduğu noktaya tıkla. Aynı tehlike yalnızca bir kez sayılır."
                      : "Click the location of a hazard. Each hazard can only be counted once."}
                </p>
              </div>

              {!submitted ? (
                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    disabled={!selected.length || saving}
                    onClick={submitAttempt}
                    className="w-full rounded-2xl bg-cyan-300 px-5 py-4 text-sm font-black text-slate-950 disabled:opacity-40"
                  >
                    {saving ? (isTr ? "Kontrol ediliyor..." : "Checking...") : (isTr ? "Tespitleri değerlendir" : "Evaluate findings")}
                  </button>
                  {selected.length > 0 && (
                    <button type="button" onClick={resetAttempt} className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300">
                      {isTr ? "İşaretleri sıfırla" : "Reset marks"}
                    </button>
                  )}
                </div>
              ) : result && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white/[.04] p-3 text-center"><b className="text-xl">{result.score}</b><div className="text-[10px] text-slate-500">SCORE</div></div>
                    <div className="rounded-xl bg-white/[.04] p-3 text-center"><b className="text-xl text-emerald-300">{result.correctCount}</b><div className="text-[10px] text-slate-500">{isTr ? "TESPİT" : "FOUND"}</div></div>
                    <div className="rounded-xl bg-white/[.04] p-3 text-center"><b className="text-xl text-cyan-300">+{result.xpEarned}</b><div className="text-[10px] text-slate-500">XP</div></div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
                    <div className="font-black">{isTr ? "Saha değerlendirmesi" : "Field review"}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{scenario.explanation}</p>
                    <div className="mt-4 space-y-2">
                      {options.filter((option) => answerIds.includes(option.id)).map((option) => (
                        <div key={option.id} className="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3 text-sm text-slate-200">✓ {option.label}</div>
                      ))}
                    </div>
                    {firstCompletion === false && <p className="mt-3 text-xs text-amber-200">{isTr ? "Bu challenge daha önce tamamlandı; tekrar XP verilmedi." : "This challenge was already completed; no repeat XP was awarded."}</p>}
                    {progress && <p className="mt-3 text-xs text-slate-400">Level {progress.level} · {progress.totalXp} XP · 🔥 {progress.currentStreak}</p>}
                    {saved === false && <p className="mt-3 text-xs text-slate-500">{isTr ? "Giriş yapılmadıysa ilerleme kaydedilmez." : "Progress is not stored when signed out."}</p>}
                  </div>

                  {isFinalChallenge && <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">{isTr ? `${total}/${total} challenge tamamlandı` : `${total}/${total} challenges completed`}</div>}

                  <div className="flex gap-3">
                    <button type="button" onClick={resetAttempt} className="flex-1 rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold">{isTr ? "Tekrar dene" : "Try again"}</button>
                    {nextHref ? (
                      <a href={nextHref} className="flex-1 rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950">{isTr ? "Sonraki challenge" : "Next challenge"} →</a>
                    ) : (
                      <a href={`/${locale}/labs`} className="flex-1 rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950">{isTr ? "Labs'e dön" : "Back to Labs"} →</a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
