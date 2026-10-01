"use client";

import Link from "next/link";
import { ArrowRight, ScanSearch, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HomeLabsBridge({ locale }: { locale: "tr" | "en" }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  if (!isHome) return null;

  const tr = locale === "tr";

  return (
    <aside className="pointer-events-none absolute right-[clamp(28px,5vw,88px)] top-[clamp(132px,12vw,188px)] z-[45] hidden w-[min(360px,28vw)] xl:block">
      <div className="pointer-events-auto relative overflow-hidden rounded-[26px] border border-cyan-300/20 bg-[#07111f]/74 p-5 shadow-[0_26px_80px_rgba(0,0,0,.34)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_5%,rgba(34,211,238,.18),transparent_34%)]" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
              <ScanSearch size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">
                SERNEM LABS
                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.09] px-2 py-1 text-[8px] tracking-[0.13em] text-emerald-200">LIVE</span>
              </div>
              <p className="mt-1 text-[11px] font-semibold text-slate-400">VISUAL HAZARD RECOGNITION</p>
            </div>
          </div>
          <Sparkles size={16} className="mt-1 shrink-0 text-amber-300/80" />
        </div>

        <div className="relative z-10 mt-5">
          <h2 className="text-[25px] font-black leading-[1.02] tracking-[-0.035em] text-white">
            {tr ? "Gözünü eğit.\nSaha kararını güçlendir." : "Train your eye.\nStrengthen field judgment."}
          </h2>
          <p className="mt-3 text-[12px] leading-5 text-slate-300/80">
            {tr
              ? "Gerçek endüstriyel sahnelerde görünür tehlikeleri bul ve saha farkındalığını test et."
              : "Find visible hazards in realistic industrial scenes and test field awareness."}
          </p>
        </div>

        <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
            <b className="block text-sm font-black text-white">5</b>
            <span className="text-[8px] font-bold uppercase tracking-[0.11em] text-slate-500">Scenes</span>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
            <b className="block text-sm font-black text-white">100</b>
            <span className="text-[8px] font-bold uppercase tracking-[0.11em] text-slate-500">Score</span>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
            <b className="block text-sm font-black text-cyan-200">XP</b>
            <span className="text-[8px] font-bold uppercase tracking-[0.11em] text-slate-500">Progress</span>
          </div>
        </div>

        <div className="relative z-10 mt-5 flex items-center gap-2">
          <Link
            href={`/${locale}/labs`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-[11px] font-black text-white transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06]"
          >
            {tr ? "HSE Labs'i aç" : "Open HSE Labs"}
            <ArrowRight size={14} />
          </Link>
          <Link
            href={`/${locale}/labs/spot-the-hazard`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-[11px] font-black text-slate-950 shadow-[0_10px_28px_rgba(34,211,238,.16)] transition hover:bg-cyan-200"
          >
            {tr ? "Başla" : "Start"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
