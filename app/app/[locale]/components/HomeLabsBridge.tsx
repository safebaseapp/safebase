"use client";

import Link from "next/link";
import { ArrowRight, ScanSearch } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HomeLabsBridge({ locale }: { locale: "tr" | "en" }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  if (!isHome) return null;

  const tr = locale === "tr";

  return (
    <section className="relative z-40 border-b border-cyan-300/10 bg-[#020817] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Link href={`/${locale}/labs`} className="group flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
            <ScanSearch size={18} />
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.17em] text-cyan-300">
              SERNEM Labs
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-0.5 text-[9px] tracking-[0.12em] text-emerald-200">LIVE</span>
            </span>
            <span className="mt-0.5 block truncate text-[12px] font-semibold text-slate-300 transition group-hover:text-white">
              {tr ? "Yeni: Görsel Tehlike Testi ile saha farkındalığını test et." : "New: Test field awareness with the Visual Hazard Challenge."}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 md:shrink-0">
          <Link href={`/${locale}/labs`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[11px] font-black text-slate-200 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06] hover:text-white">
            {tr ? "HSE Labs'i keşfet" : "Explore HSE Labs"}
            <ArrowRight size={14} />
          </Link>
          <Link href={`/${locale}/labs/spot-the-hazard`} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-[11px] font-black text-slate-950 transition hover:bg-cyan-200">
            {tr ? "Teste başla" : "Start test"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
