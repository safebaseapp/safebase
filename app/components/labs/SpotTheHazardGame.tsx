"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
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

type Marker = {
  id: string;
  x: number;
  y: number;
  kind: "found" | "miss";
};

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
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const options = scenario.options ?? [];
  const hotspots = scenario.hotspots ?? [];
  const answerIds = useMemo(
    () =>
      Array.isArray(scenario.correct_answer)
        ? scenario.correct_answer
        : ([scenario.correct_answer].filter(Boolean) as string[]),
    [scenario.correct_answer],
  );
  const reviewOptions = useMemo(
    () => options.filter((option) => answerIds.includes(option.id)),
    [options, answerIds],
  );
  const result = serverResult ?? (submitted ? scoreMultiSelectScenario(scenario, selected) : null);
  const isFinalChallenge = index === total - 1;

  useEffect(() => {
    setImageFailed(false);
    setSelected([]);
    setSubmitted(false);
    setSaving(false);
    setServerResult(null);
    setSaved(null);
    setFirstCompletion(null);
    setProgress(undefined);
    setMarkers([]);
    setFeedback(null);

    void trackUserEvent("lab_scenario_view", {
      scenario_id: scenario.id,
      scenario_type: scenario.type,
      category: scenario.category,
      difficulty: scenario.difficulty,
      locale,
    });
  }, [scenario.id, scenario.type, scenario.category, scenario.difficulty, locale]);

  function findHitHotspot(x: number, y: number) {
    let best: (LabHotspot & { distance: number }) | null = null;
    for (const hotspot of hotspots) {
      const distance = Math.hypot(hotspot.x - x, hotspot.y - y);
      if (distance <= hotspot.radius && (!best || distance < best.distance)) {
        best = { ...hotspot, distance };
      }
    }
    return best;
  }

  function markScene(event: MouseEvent<HTMLButtonElement>) {
    if (submitted) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const hit = findHitHotspot(x, y);

    if (!hit) {
      setMarkers((current) => [
        ...current,
        { id: `miss-${Date.now()}-${current.length}`, x, y, kind: "miss" },
      ]);
      setFeedback(
        isTr
          ? "Bu noktada tanımlı bir tehlike yok. Görseli tekrar incele."
          : "No defined hazard at that point. Inspect the image again.",
      );
      return;
    }

    if (selected.includes(hit.id)) {
      setFeedback(isTr ? "Bu tehlike zaten işaretlendi." : "That hazard has already been marked.");
      return;
    }

    setSelected((current) => [...current, hit.id]);
    setMarkers((current) => [
      ...current,
      { id: `found-${hit.id}`, x: hit.x, y: hit.y, kind: "found" },
    ]);
    setFeedback(isTr ? "Tehlike işaretlendi." : "Hazard marked.");

    void trackUserEvent("lab_hazard_found", {
      scenario_id: scenario.id,
      hazard_id: hit.id,
      category: scenario.category,
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

      if (payload.result) {
        void trackUserEvent("lab_scenario_complete", {
          scenario_id: scenario.id,
          scenario_type: scenario.type,
          category: scenario.category,
          difficulty: scenario.difficulty,
          score: payload.result.score,
          correct_count: payload.result.correctCount,
          missed_count: payload.result.missedCount,
          incorrect_count: payload.result.incorrectCount,
          xp_earned: payload.result.xpEarned,
          first_completion: payload.firstCompletion ?? false,
          locale,
        });
      }
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
    setMarkers([]);
    setFeedback(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <a href={`/${locale}/labs`} className="text-sm font-semibold text-cyan-300">← SERNEM Labs</a>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {isTr ? `Görev ${index + 1}/${total}` : `Challenge ${index + 1}/${total}`}
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
          <div className="grid items-start lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
            <div className="min-w-0 border-b border-white/10 lg:border-b-0 lg:border-r">
              <div className="p-4 sm:p-5 lg:p-6">
                {!imageFailed && scenario.image ? (
                  <>
                    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black">
                      <div className="relative mx-auto aspect-[7/4] w-full max-w-[1120px] bg-black">
                        <button
                          type="button"
                          onClick={markScene}
                          disabled={submitted}
                          className="relative block h-full w-full cursor-crosshair disabled:cursor-default"
                          aria-label={isTr ? "Tehlike gördüğünüz noktaya tıklayın" : "Click where you see a hazard"}
                        >
                          <img
                            src={scenario.image}
                            alt={scenario.title}
                            onError={() => setImageFailed(true)}
                            className="block h-full w-full object-contain [image-rendering:auto]"
                          />

                          {markers.map((marker) => (
                            <span
                              key={marker.id}
                              className={`pointer-events-none absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xl font-black shadow-lg ${marker.kind === "found" ? "border-emerald-300 bg-emerald-400/20 text-emerald-200" : "border-rose-400 bg-rose-500/15 text-rose-300"}`}
                              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                            >
                              {marker.kind === "found" ? "✓" : "×"}
                            </span>
                          ))}
                        </button>

                        <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-[11px] font-black uppercase tracking-[.18em]">SERNEM ORIGINAL SCENE</div>
                      </div>
                    </div>

                    <div className="px-1 pt-5 sm:px-2">
                      <h2 className="text-2xl font-black text-white sm:text-3xl">{scenario.title}</h2>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{scenario.scenario}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[420px] items-center justify-center rounded-[28px] border border-white/10 bg-black p-8 text-slate-400">
                    {isTr ? "Görsel yüklenemedi." : "The image could not be loaded."}
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">{isTr ? "Görsel tehlike avı" : "Visual hazard hunt"}</p>
              <h1 className="mt-3 text-2xl font-black sm:text-[2rem] sm:leading-tight">{isTr ? "Sahneyi incele. Tehlikeleri kendin bul." : "Inspect the scene. Find the hazards yourself."}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {isTr
                  ? "İpucu vermiyoruz. Görselde aksiyon gerektirdiğini düşündüğün noktaları işaretle; değerlendirme sonrasında hangi noktaları bulduğun ve hangilerini kaçırdığın gösterilir."
                  : "No answer clues are shown. Mark the locations you believe need action; after evaluation you'll see what you found and what you missed."}
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-5">
                <div className="text-sm font-bold text-slate-200">{isTr ? "İşaretlenen nokta" : "Marked points"}</div>
                {!submitted ? (
                  <div className="mt-2 flex items-end gap-2">
                    <div className="text-4xl font-black text-cyan-300">{selected.length}</div>
                    <div className="pb-1 text-sm text-slate-400">{isTr ? "işaretlendi" : "marked"}</div>
                  </div>
                ) : (
                  <div className="mt-2 text-4xl font-black text-cyan-300">
                    {result?.correctCount ?? selected.length}<span className="text-base text-slate-500"> / {answerIds.length}</span>
                  </div>
                )}
                <p className="mt-2 text-xs leading-5 text-slate-500">{isTr ? "Her tehlike yalnızca bir kez sayılır. Yanlış tıklamalar puan kazandırmaz." : "Each hazard can only be counted once. Wrong clicks do not earn points."}</p>
                {feedback && <div className="mt-4 rounded-xl border border-white/10 bg-white/[.03] px-3 py-2 text-sm text-slate-300">{feedback}</div>}
              </div>

              {!submitted ? (
                <div className="mt-6 space-y-3">
                  <button type="button" disabled={!selected.length || saving} onClick={submitAttempt} className="w-full rounded-2xl bg-cyan-300 px-5 py-4 text-sm font-black text-slate-950 disabled:opacity-40">
                    {saving ? (isTr ? "Kontrol ediliyor..." : "Checking...") : (isTr ? "Tespitleri değerlendir" : "Evaluate findings")}
                  </button>
                  {markers.length > 0 && (
                    <button type="button" onClick={resetAttempt} className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300">
                      {isTr ? "İşaretleri sıfırla" : "Reset marks"}
                    </button>
                  )}
                </div>
              ) : result ? (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/[.04] p-3 text-center"><b className="text-xl">{result.score}</b><div className="text-[10px] text-slate-500">{isTr ? "PUAN" : "SCORE"}</div></div>
                    <div className="rounded-xl bg-white/[.04] p-3 text-center"><b className="text-xl text-emerald-300">{result.correctCount}</b><div className="text-[10px] text-slate-500">{isTr ? "TESPİT" : "FOUND"}</div></div>
                    <div className="rounded-xl bg-white/[.04] p-3 text-center"><b className="text-xl text-cyan-300">+{result.xpEarned}</b><div className="text-[10px] text-slate-500">XP</div></div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
                    <div className="font-black">{isTr ? "Saha değerlendirmesi" : "Field review"}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{scenario.explanation}</p>
                    <div className="mt-4 space-y-2">
                      {reviewOptions.map((option) => {
                        const found = selected.includes(option.id);
                        return (
                          <div key={option.id} className={found ? "flex items-start justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm text-slate-200" : "flex items-start justify-between gap-3 rounded-xl border border-rose-400/20 bg-rose-400/5 p-3 text-sm text-slate-200"}>
                            <span>{found ? "✓" : "✕"} {option.label}</span>
                            <span className={found ? "shrink-0 text-[10px] font-black uppercase tracking-wider text-emerald-300" : "shrink-0 text-[10px] font-black uppercase tracking-wider text-rose-300"}>
                              {found ? (isTr ? "Bulundu" : "Found") : (isTr ? "Kaçırıldı" : "Missed")}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {firstCompletion === false && <p className="mt-3 text-xs text-amber-200">{isTr ? "Bu görev daha önce tamamlandı; tekrar XP verilmedi." : "This challenge was already completed; no repeat XP was awarded."}</p>}
                    {progress && <p className="mt-3 text-xs text-slate-400">Level {progress.level} · {progress.totalXp} XP · 🔥 {progress.currentStreak}</p>}
                    {saved === false && <p className="mt-3 text-xs text-slate-500">{isTr ? "Giriş yapılmadıysa ilerleme kaydedilmez." : "Progress is not stored when signed out."}</p>}
                  </div>

                  {isFinalChallenge && <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">{isTr ? `${total}/${total} görev tamamlandı` : `${total}/${total} challenges completed`}</div>}

                  <div className="flex gap-3">
                    <button type="button" onClick={resetAttempt} className="flex-1 rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold">{isTr ? "Tekrar dene" : "Try again"}</button>
                    {nextHref ? (
                      <a href={nextHref} className="flex-1 rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950">{isTr ? "Sonraki görev" : "Next challenge"} →</a>
                    ) : (
                      <a href={`/${locale}/labs`} className="flex-1 rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950">{isTr ? "Labs'e dön" : "Back to Labs"} →</a>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
