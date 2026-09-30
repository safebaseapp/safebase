"use client";

import { useMemo, useState } from "react";
import type { LabScenario } from "@/lib/labs/types";
import { scoreMultiSelectScenario } from "@/lib/labs/scoring";

type Props = {
  scenario: LabScenario;
  locale: "tr" | "en";
  index: number;
  total: number;
  nextHref?: string;
};

export default function SpotTheHazardGame({ scenario, locale, index, total, nextHref }: Props) {
  const isTr = locale === "tr";
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const correctIds = useMemo(
    () => new Set(Array.isArray(scenario.correct_answer) ? scenario.correct_answer : [scenario.correct_answer].filter(Boolean) as string[]),
    [scenario.correct_answer],
  );

  const result = submitted ? scoreMultiSelectScenario(scenario, selected) : null;

  function toggle(id: string) {
    if (submitted) return;
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <a href={`/${locale}/labs`} className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            ← SERNEM Labs
          </a>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {isTr ? "Challenge" : "Challenge"} {index + 1}/{total}
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-950/20">
          <div className="grid lg:grid-cols-[1.08fr_.92fr]">
            <div className="relative min-h-[360px] border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,.16),_transparent_34%),linear-gradient(145deg,#0f172a,#111827_55%,#172033)] p-6 lg:min-h-[620px] lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
              <div className="relative flex h-full min-h-[310px] flex-col justify-between rounded-2xl border border-white/10 bg-black/10 p-6 backdrop-blur-sm lg:min-h-[568px]">
                <div>
                  <div className="mb-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-cyan-200">
                    SERNEM Original Scene
                  </div>
                  <h2 className="max-w-xl text-3xl font-black tracking-tight sm:text-4xl">{scenario.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">{scenario.scenario}</p>
                </div>

                <div className="mt-10 rounded-2xl border border-dashed border-cyan-300/25 bg-slate-950/45 p-6">
                  <div className="text-sm font-bold text-slate-200">{isTr ? "Sahne görsel alanı" : "Scene visual slot"}</div>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
                    {isTr
                      ? "Bu alan SERNEM için özel üretilecek gerçekçi endüstriyel sahneyle değiştirilecek. Oyun motoru görselden bağımsız olarak çalışıyor."
                      : "This slot will be replaced by a SERNEM-original realistic industrial scene. The game engine already works independently from the artwork."}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-400">
                  <span className="rounded-full bg-white/5 px-3 py-2">{scenario.category.replaceAll("_", " ")}</span>
                  <span className="rounded-full bg-white/5 px-3 py-2">{scenario.difficulty}</span>
                  <span className="rounded-full bg-white/5 px-3 py-2">+{scenario.xp} XP</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-cyan-300">
                {isTr ? "Tehlikeleri seç" : "Select the hazards"}
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight">
                {isTr ? "Hangileri güvensiz durum?" : "Which conditions are unsafe?"}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {isTr ? "Birden fazla seçenek doğru olabilir." : "More than one option may be correct."}
              </p>

              <div className="mt-6 space-y-3">
                {(scenario.options ?? []).map((option) => {
                  const active = selected.includes(option.id);
                  const isCorrect = submitted && correctIds.has(option.id);
                  const isWrongSelection = submitted && active && !correctIds.has(option.id);
                  const border = submitted
                    ? isCorrect ? "border-emerald-400/60 bg-emerald-400/10" : isWrongSelection ? "border-red-400/60 bg-red-400/10" : "border-white/10 bg-white/[.03]"
                    : active ? "border-cyan-400/70 bg-cyan-400/10" : "border-white/10 bg-white/[.03] hover:border-white/20";

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggle(option.id)}
                      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${border}`}
                    >
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-black ${active ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/20 text-transparent"}`}>
                        ✓
                      </span>
                      <span className="text-sm font-semibold leading-6 text-slate-100">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              {!submitted ? (
                <button
                  type="button"
                  disabled={selected.length === 0}
                  onClick={() => setSubmitted(true)}
                  className="mt-6 w-full rounded-2xl bg-cyan-300 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isTr ? "Cevabı kontrol et" : "Check answer"}
                </button>
              ) : result ? (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-center">
                      <div className="text-2xl font-black">{result.score}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">Score</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-center">
                      <div className="text-2xl font-black text-emerald-300">{result.correctCount}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">{isTr ? "Doğru" : "Found"}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-center">
                      <div className="text-2xl font-black text-cyan-300">+{result.xpEarned}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">XP</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
                    <div className="font-black">{result.perfect ? (isTr ? "Mükemmel tespit" : "Perfect identification") : (isTr ? "Öğrenme notu" : "Learning note")}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{scenario.explanation}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setSelected([]); setSubmitted(false); }}
                      className="flex-1 rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/5"
                    >
                      {isTr ? "Tekrar dene" : "Try again"}
                    </button>
                    {nextHref && (
                      <a href={nextHref} className="flex-1 rounded-2xl bg-cyan-300 px-4 py-3 text-center text-sm font-black text-slate-950 hover:bg-cyan-200">
                        {isTr ? "Sonraki challenge" : "Next challenge"} →
                      </a>
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
