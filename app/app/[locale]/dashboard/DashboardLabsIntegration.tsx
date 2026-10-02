"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";

type Summary = {
  ok: boolean;
  count?: number;
  latest?: {
    scenarioId: string;
    category: string;
    difficulty: string;
    score: number;
    incorrectCount: number;
    criticalCount: number;
    createdAt: string;
  } | null;
  error?: string;
};

export default function DashboardLabsIntegration({ locale }: { locale: string }) {
  const pathname = usePathname();
  const isTr = locale === "tr";
  const isDashboardHome = pathname === `/${locale}/dashboard`;
  const [navTarget, setNavTarget] = useState<Element | null>(null);
  const [cardTarget, setCardTarget] = useState<Element | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/labs/incident-summary", { cache: "no-store" });
      const data = (await response.json()) as Summary;
      setSummary(data);
    } catch {
      setSummary({ ok: false, error: "NETWORK_ERROR" });
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
    <Link
      href={`/${locale}/dashboard/labs`}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-emerald-300 transition hover:bg-emerald-400/[0.06] hover:text-emerald-200"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-500/[0.08] text-[9px] font-black text-emerald-300">LR</span>
      <span className="min-w-0 flex-1 truncate">{isTr ? "Labs Sonuçlarım" : "Labs Results"}</span>
      {summary?.ok && (summary.count ?? 0) > 0 ? <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-black text-emerald-300">{summary.count}</span> : null}
    </Link>,
    navTarget,
  ) : null;

  const latest = summary?.latest ?? null;
  const card = cardTarget ? createPortal(
    <section className="mt-3 overflow-hidden rounded-[24px] border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(6,32,27,.96),rgba(5,18,31,.96))] p-5 shadow-xl shadow-black/10 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">SERNEM LABS / INCIDENT SIMULATOR</div>
          <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">{isTr ? "Karar performansın" : "Your decision performance"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {summary?.ok
              ? latest
                ? (isTr ? "Son denemeni, puan kaybettiğin kararları ve kritik seçimleri HSE Command Center içinden incele." : "Review your latest attempt, lost points and critical choices directly from HSE Command Center.")
                : (isTr ? "Incident Simulator denemelerin burada özetlenecek. İlk senaryonu tamamladığında sonuç kartın otomatik güncellenecek." : "Your Incident Simulator attempts will be summarized here after your first completed scenario.")
              : (isTr ? "Labs sonuç servisine şu anda ulaşılamıyor. Deneme kaydın korunur; bağlantı geldiğinde tekrar aktarılır." : "Labs results service is temporarily unavailable. Your attempt is retained and will retry when the service is available.")}
          </p>
        </div>

        <div className="flex flex-wrap items-stretch gap-2.5">
          {latest ? (
            <>
              <div className="min-w-[96px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center"><b className="block text-2xl text-white">{latest.score}</b><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">{isTr ? "Son Skor" : "Last Score"}</span></div>
              <div className="min-w-[96px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center"><b className="block text-2xl text-white">{latest.criticalCount}</b><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">{isTr ? "Kritik" : "Critical"}</span></div>
              <div className="min-w-[96px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center"><b className="block text-2xl text-white">{summary?.count ?? 0}</b><span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">{isTr ? "Deneme" : "Attempts"}</span></div>
            </>
          ) : null}
          <Link href={`/${locale}/dashboard/labs`} className="flex min-h-[58px] items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.08] px-5 text-sm font-black text-emerald-200 transition hover:bg-emerald-400/[0.13]">
            {isTr ? "Sonuçları İncele →" : "Review Results →"}
          </Link>
        </div>
      </div>
    </section>,
    cardTarget,
  ) : null;

  return <>{nav}{card}</>;
}
