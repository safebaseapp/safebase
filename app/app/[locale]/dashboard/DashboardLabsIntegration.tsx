"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";

type Summary = {
  ok: boolean;
  count?: number;
  latest?: { scenarioId: string; category: string; difficulty: string; score: number; incorrectCount: number; criticalCount: number; createdAt: string } | null;
  error?: string;
};

type Progress = {
  ok: boolean;
  totalXp?: number;
  globalRank?: number | null;
  monthlyRank?: number | null;
  monthlyXp?: number | null;
  level?: number;
  levelProgress?: number;
  xpToNextLevel?: number;
  rank?: { key: string; title: string; minXp: number };
  nextRank?: { key: string; title: string; minXp: number } | null;
  xpToNextRank?: number;
  currentStreak?: number;
  longestStreak?: number;
  uniqueCompleted?: number;
  badges?: { key: string; title: string; description: string }[];
};

export default function DashboardLabsIntegration({ locale }: { locale: string }) {
  const pathname = usePathname();
  const isTr = locale === "tr";
  const isDashboardHome = pathname === `/${locale}/dashboard`;
  const [navTarget, setNavTarget] = useState<Element | null>(null);
  const [cardTarget, setCardTarget] = useState<Element | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);

  const load = useCallback(async () => {
    try {
      const [summaryResponse, progressResponse] = await Promise.all([
        fetch("/api/labs/incident-summary", { cache: "no-store" }),
        fetch("/api/labs/progress", { cache: "no-store" }),
      ]);
      setSummary((await summaryResponse.json()) as Summary);
      setProgress((await progressResponse.json()) as Progress);
    } catch {
      setSummary({ ok: false, error: "NETWORK_ERROR" });
      setProgress({ ok: false });
    }
  }, []);

  useEffect(() => {
    if (!isDashboardHome) return;
    let createdMount: HTMLElement | null = null;
    const findTargets = () => {
      setNavTarget(document.querySelector("main aside nav"));
      const contentRoot = document.querySelector("main .min-w-0.flex-1");
      const hero = contentRoot?.querySelector("section");
      if (hero && !document.getElementById("dashboard-labs-results-mount")) {
        createdMount = document.createElement("div");
        createdMount.id = "dashboard-labs-results-mount";
        hero.insertAdjacentElement("afterend", createdMount);
      }
      setCardTarget(document.getElementById("dashboard-labs-results-mount"));
    };
    findTargets();
    const timer = window.setTimeout(findTargets, 50);
    void load();
    window.addEventListener("sernem:labs-updated", load);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("sernem:labs-updated", load);
      createdMount?.remove();
    };
  }, [isDashboardHome, load]);

  if (!isDashboardHome) return null;

  const nav = navTarget ? createPortal(
    <Link href={`/${locale}/dashboard/labs`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-emerald-300 transition hover:bg-emerald-400/[0.06] hover:text-emerald-200">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-500/[0.08] text-[9px] font-black text-emerald-300">XP</span>
      <span className="min-w-0 flex-1 truncate">{isTr ? "Labs İlerlemem" : "Labs Progress"}</span>
      {progress?.ok ? <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-black text-emerald-300">L{progress.level ?? 1}</span> : null}
    </Link>, navTarget,
  ) : null;

  const latest = summary?.latest ?? null;
  const levelProgress = Math.max(0, Math.min(100, progress?.levelProgress ?? 0));
  const card = cardTarget ? createPortal(
    <section className="mt-3 overflow-hidden rounded-[24px] border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(6,32,27,.96),rgba(5,18,31,.96))] p-5 shadow-xl shadow-black/10 sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-xl">
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">SERNEM LABS / XP PROGRESS</div>
          <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">{progress?.rank?.title ?? "HSE Explorer"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{isTr ? "Tüm Labs aktivitelerin aynı XP hesabına eklenir. İlk tamamlamalar XP kazandırır; tekrarlar performans geçmişinde kalır." : "Every Labs activity contributes to one XP profile. First completions earn XP; replays remain in your performance history."}</p>
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <span>Level {progress?.level ?? 1}</span>
              <span>{progress?.xpToNextLevel ?? 0} XP {isTr ? "sonraki seviyeye" : "to next level"}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${levelProgress}%` }} /></div>
          </div>
          {(progress?.badges?.length ?? 0) > 0 ? <div className="mt-4 flex flex-wrap gap-2">{progress!.badges!.map((badge) => <span key={badge.key} title={badge.description} className="rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1 text-[10px] font-black text-amber-200">🏅 {badge.title}</span>)}</div> : null}
        </div>

        <div className="flex flex-wrap items-stretch gap-2.5">
          <Stat value={progress?.totalXp ?? 0} label="XP" />
          <Stat value={progress?.monthlyXp ?? 0} label={isTr ? "Aylık XP" : "Monthly XP"} />
          <Stat value={progress?.globalRank ? `#${progress.globalRank}` : "—"} label={isTr ? "Global Sıra" : "Global Rank"} />
          <Stat value={progress?.monthlyRank ? `#${progress.monthlyRank}` : "—"} label={isTr ? "Aylık Sıra" : "Monthly Rank"} />
          <Stat value={progress?.level ?? 1} label={isTr ? "Seviye" : "Level"} />
          <Stat value={`${progress?.currentStreak ?? 0}🔥`} label={isTr ? "Seri" : "Streak"} />
          {latest ? <Stat value={latest.score} label={isTr ? "Son Skor" : "Last Score"} /> : null}
          <Link href={`/${locale}/dashboard/labs`} className="flex min-h-[58px] items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.08] px-5 text-sm font-black text-emerald-200 transition hover:bg-emerald-400/[0.13]">{isTr ? "İlerlemeyi İncele →" : "Review Progress →"}</Link>
        </div>
      </div>
    </section>, cardTarget,
  ) : null;

  return <>{nav}{card}</>;
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return <div className="min-w-[96px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center"><b className="block text-2xl text-white">{value}</b><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span></div>;
}
