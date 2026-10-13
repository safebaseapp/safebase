"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  locale: "tr" | "en";
  userId: string;
  createdAt: string;
};

export default function FirstVisitWelcome({ locale, userId, createdAt }: Props) {
  const [visible, setVisible] = useState(false);
  const isTr = locale === "tr";

  useEffect(() => {
    const created = new Date(createdAt).getTime();
    if (!Number.isFinite(created) || Date.now() - created > 7 * 86400000) return;
    try {
      setVisible(localStorage.getItem(`sernem-welcome-v1:${userId}`) !== "seen");
    } catch {
      setVisible(true);
    }
  }, [createdAt, userId]);

  function dismiss() {
    try {
      localStorage.setItem(`sernem-welcome-v1:${userId}`, "seen");
    } catch {
      // The dismiss action should still work if storage is unavailable.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section aria-label={isTr ? "SERNEM başlangıç rehberi" : "SERNEM getting started"} className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-[#0a2944] via-[#101f42] to-[#081524] p-5 shadow-xl sm:p-7">
      <button type="button" onClick={dismiss} aria-label={isTr ? "Karşılama kartını kapat" : "Dismiss welcome card"} className="absolute right-3 top-3 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10">
        {isTr ? "Kapat ×" : "Dismiss ×"}
      </button>
      <p className="pr-20 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">SERNEM LABS · {isTr ? "BAŞLANGIÇ" : "GET STARTED"}</p>
      <h2 className="mt-3 pr-6 text-2xl font-black text-white sm:text-3xl">
        {isTr ? "SERNEM'e hoş geldin! İlk challenge seni bekliyor." : "Welcome to SERNEM! Your first challenge awaits."}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
        {isTr
          ? "Gerçekçi İSG senaryolarında bilgini test et, XP kazan, rozetlerini keşfet ve aylık liderlik tablosunda yerini al. Düzenli olarak yeni challenge'lar ekleniyor."
          : "Test your knowledge with realistic HSE scenarios, earn XP, discover achievement badges and join the monthly leaderboard. New challenges are added regularly."}
      </p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100">
        <span className="rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-2">{isTr ? "⚡ Challenge'lar" : "⚡ Challenges"}</span>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-2">🎯 XP</span>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-2">{isTr ? "🏅 Rozetler" : "🏅 Badges"}</span>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-2">{isTr ? "🏆 Aylık sıralama" : "🏆 Monthly leaderboard"}</span>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href={`/${locale}/labs/incident-simulator`} onClick={dismiss} className="inline-flex rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">
          {isTr ? "İlk challenge'a başla →" : "Start your first challenge →"}
        </Link>
        <button type="button" onClick={dismiss} className="rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10">
          {isTr ? "Şimdilik Dashboard'da kal" : "Explore dashboard first"}
        </button>
      </div>
    </section>
  );
}
