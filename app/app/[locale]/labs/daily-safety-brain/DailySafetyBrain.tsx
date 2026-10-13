"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react";
import { dailyQuestions, dayId } from "@/lib/labs/daily-brain-bank";
type Locale = "tr" | "en";
type Saved = { day: number; answers: number[] };

export default function DailySafetyBrain({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  const [day, setDay] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [xpByDay, setXpByDay] = useState<Record<string, number>>({});
  const [serverAward, setServerAward] = useState<number | null>(null);
  const [syncStatus, setSyncStatus] = useState<"pending" | "saved" | "guest" | "error" | null>(null);
  useEffect(() => {
    const currentDay = dayId(new Date());
    setDay(currentDay);
    try { const xp = JSON.parse(window.localStorage.getItem("sernem_daily_brain_xp_v1") || "{}"); if (xp && typeof xp === "object" && !Array.isArray(xp)) setXpByDay(xp); } catch { /* storage optional */ }
    try {
      const saved = JSON.parse(window.localStorage.getItem("sernem_daily_brain_v1") || "null") as Saved | null;
      if (saved?.day === currentDay && Array.isArray(saved.answers)) {
        setAnswers(saved.answers.filter((x) => Number.isInteger(x) && x >= 0 && x <= 2).slice(0, 5));
      }
    } catch { /* private browsing may disable storage */ }
    const timer = window.setInterval(() => {
      const nextDay = dayId(new Date());
      setDay((previous) => {
        if (previous === nextDay) return previous;
        setAnswers([]);
        setServerAward(null);
        setSyncStatus(null);
        try {
          const latest = JSON.parse(window.localStorage.getItem("sernem_daily_brain_v1") || "null") as Saved | null;
          if (latest?.day === nextDay && Array.isArray(latest.answers)) setAnswers(latest.answers.filter((x) => Number.isInteger(x) && x >= 0 && x <= 2).slice(0, 5));
        } catch { /* optional */ }
        return nextDay;
      });
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);
  const questions = useMemo(() => day === null ? [] : dailyQuestions(day), [day]);
  const currentIndex = answers.length;
  const complete = questions.length > 0 && currentIndex === questions.length;
  const score = questions.reduce((total, q, index) => total + (answers[index] === q.correct ? 1 : 0), 0);
  const totalXp = Object.values(xpByDay).reduce((total, value) => total + (typeof value === "number" && Number.isFinite(value) ? value : 0), 0);
  const earnedToday = day === null ? 0 : xpByDay[String(day)] ?? 0;
  async function saveCompletedAttempt(currentDay: number, selectedAnswers: number[]) {
    setSyncStatus("pending");
    try {
      const response = await fetch("/api/labs/daily-brain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: currentDay, answers: selectedAnswers, locale }),
      });
      if (response.status === 401) {
        setSyncStatus("guest");
        return;
      }
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setSyncStatus("error");
        return;
      }
      setServerAward(Number(result.awardedXp ?? 0));
      setSyncStatus("saved");
    } catch {
      setSyncStatus("error");
    }
  }
  function answer(index: number) {
    if (day === null || currentIndex >= questions.length) return;
    const next = [...answers, index];
    setAnswers(next);
    try { window.localStorage.setItem("sernem_daily_brain_v1", JSON.stringify({ day, answers: next })); } catch { /* optional local history */ }
    if (next.length === questions.length && xpByDay[String(day)] === undefined) {
      const correctCount = questions.reduce((sum, q, questionIndex) => sum + (next[questionIndex] === q.correct ? 1 : 0), 0);
      const awarded = 10 + correctCount * 10;
      const updated = { ...xpByDay, [String(day)]: awarded };
      setXpByDay(updated);
      try { window.localStorage.setItem("sernem_daily_brain_xp_v1", JSON.stringify(updated)); } catch { /* local XP */ }
    }
    if (next.length === questions.length) void saveCompletedAttempt(day, next);
  }
  function reset() {
    setAnswers([]);
    setServerAward(null);
    setSyncStatus(null);
    try { window.localStorage.removeItem("sernem_daily_brain_v1"); } catch { /* optional */ }
  }
  return (
    <main className="min-h-screen bg-[#030b19] px-4 py-12 text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link href={`/${locale}/labs`} className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300"><ArrowLeft size={17} /> HSE Labs</Link>
        <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#112849] to-[#071323] p-6 shadow-2xl sm:p-10">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-300"><ShieldCheck size={18} /> DAILY SAFETY BRAIN</div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{tr ? "Bugünün güvenlik meydan okuması" : "Today's safety challenge"}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">{tr ? "Profesyonel saha senaryolarından her gün otomatik seçilen 5 soru. Set her gün UTC 00:00 itibarıyla yenilenir." : "Five questions selected automatically from a professional scenario library. The set refreshes daily at 00:00 UTC."}</p>
          {day === null ? <p className="mt-8 text-slate-300">{tr ? "Hazırlanıyor..." : "Preparing..."}</p> : (
            <>
              <div className="mt-8 flex items-center justify-between gap-3 text-xs font-bold text-slate-400">
                <span>{complete ? (tr ? "Tamamlandı" : "Completed") : `${Math.min(currentIndex + 1, 5)} / 5`}</span>
                <span>{tr ? "Doğru" : "Correct"}: {score} / 5</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${currentIndex * 20}%` }} /></div>
              {complete ? (
                <div className="mt-9 text-center">
                  <CheckCircle2 className="mx-auto text-emerald-300" size={42} />
                  <p className="mt-3 text-5xl font-black">{score} / 5</p>
                  <h2 className="mt-3 text-2xl font-bold">{tr ? "Günlük testi bitirdin!" : "Daily challenge complete!"}</h2>
                  <p className="mt-3 text-slate-300">
                    {syncStatus === "saved"
                      ? (tr ? `Labs hesabına kaydedildi · Bu denemeden kazanılan XP: ${serverAward}. Aynı gün tekrar oynamak ek XP vermez.` : `Saved to your Labs account · XP awarded for this attempt: ${serverAward}. Replays today do not earn additional XP.`)
                      : syncStatus === "pending"
                        ? (tr ? "Sonucun Labs hesabına kaydediliyor…" : "Saving your result to your Labs account…")
                        : syncStatus === "error"
                          ? (tr ? "Sonuç sunucuya kaydedilemedi. Bu deneme için XP doğrulanmadı." : "Result could not be saved. XP has not been confirmed.")
                          : (tr ? `Yerel pratik puanı: ${earnedToday} XP. Global sıralama için giriş yap.` : `Local practice score: ${earnedToday} XP. Sign in for global ranking.`)}
                  </p>
                  <button onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-bold"><RotateCcw size={17} />{tr ? "Tekrar çöz" : "Try again"}</button>
                </div>
              ) : (
                <div className="mt-8">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">{questions[currentIndex]?.topic[locale]}</span>
                  <h2 className="mt-5 text-xl font-black leading-snug sm:text-2xl">{questions[currentIndex]?.question[locale]}</h2>
                  <div className="mt-6 grid gap-3">{questions[currentIndex]?.answers.map((option, index) => (
                    <button key={index} type="button" onClick={() => answer(index)} className="min-h-14 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-4 text-left text-sm font-semibold transition hover:border-cyan-400/60 hover:bg-cyan-400/10">
                      <span className="mr-3 text-cyan-300">{String.fromCharCode(65 + index)}.</span>{option[locale]}
                    </button>
                  ))}</div>
                  {currentIndex > 0 && <div className="mt-7 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"><p className="font-bold text-white">{answers[currentIndex - 1] === questions[currentIndex - 1].correct ? (tr ? "Önceki cevap doğru" : "Previous answer correct") : (tr ? "Önceki cevap yanlış" : "Previous answer incorrect")}</p><p className="mt-2 leading-6">{questions[currentIndex - 1].explanation[locale]}</p></div>}
                </div>
              )}
            </>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">{tr ? "Bu bilgi testi saha izinlerinin veya yerel güvenlik prosedürlerinin yerine geçmez." : "This knowledge challenge does not replace site permits or local safety procedures."}</p>
        <Link href={`/${locale}/labs`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">{tr ? "Diğer Labs modülleri" : "Explore other Labs"} <ArrowRight size={15} /></Link>
      </div>
    </main>
  );
}
