"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, Puzzle, ScanSearch, Sparkles, Target } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const LABS_LOGO = "/images/sernem-labs-logo.webp";

export default function HomeLabsBridge({ locale }: { locale: "tr" | "en" }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isLabs = pathname.startsWith(`/${locale}/labs`);
  const tr = locale === "tr";
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const brandLink = nav.querySelector<HTMLAnchorElement>("a");
    const brandText = brandLink
      ? Array.from(brandLink.querySelectorAll<HTMLElement>("div")).find((el) =>
          el.textContent?.includes("HSE Platform"),
        )
      : null;
    const originalBrandText = brandText?.textContent ?? null;

    if (brandText && isLabs) brandText.textContent = "HSE Labs";

    return () => {
      if (brandText && originalBrandText) brandText.textContent = originalBrandText;
    };
  }, [pathname, isLabs]);

  useEffect(() => {
    setMountNode(null);
    if (!isHome) return;

    const hero = document.querySelector("main > section:first-child");
    if (!hero?.parentElement) return;

    document.querySelector("[data-sernem-labs-showcase-host]")?.remove();
    const host = document.createElement("div");
    host.setAttribute("data-sernem-labs-showcase-host", "true");
    hero.insertAdjacentElement("afterend", host);
    setMountNode(host);

    return () => host.remove();
  }, [isHome, pathname]);

  if (!isHome || !mountNode) return null;

  return createPortal(
    <section className="relative isolate overflow-hidden border-y border-violet-400/20 bg-[#050817] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.03)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(59,130,246,.18),transparent_28%),radial-gradient(circle_at_68%_35%,rgba(139,92,246,.22),transparent_30%),radial-gradient(circle_at_93%_70%,rgba(34,211,238,.12),transparent_26%),linear-gradient(110deg,rgba(2,6,23,.98),rgba(13,18,45,.94)_46%,rgba(9,12,32,.98))]" />
      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 text-blue-400/[0.045]"><Puzzle size={300} strokeWidth={1.1} /></div>
      <div className="pointer-events-none absolute left-[57%] top-1/2 hidden -translate-y-1/2 text-violet-300/[0.075] lg:block"><FlaskConical size={250} strokeWidth={1.1} /></div>
      <div className="pointer-events-none absolute right-[21%] top-8 hidden text-cyan-300/[0.06] xl:block"><Target size={150} strokeWidth={1.1} /></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />

      <div className="relative mx-auto grid min-h-[360px] max-w-7xl items-center gap-8 px-5 py-10 sm:px-6 md:min-h-[390px] md:py-12 lg:grid-cols-[250px_minmax(0,1fr)_360px] lg:gap-12 xl:grid-cols-[270px_minmax(0,1fr)_390px]">
        <div className="flex items-center justify-center lg:justify-start">
          <div className="w-full max-w-[230px] overflow-hidden rounded-[28px] border border-white/10 bg-[#111827] shadow-[0_24px_70px_rgba(0,0,0,.24)]">
            <img src={LABS_LOGO} alt="SERNEM Labs" className="block h-auto w-full" />
          </div>
        </div>

        <div className="min-w-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-violet-200">
            <Sparkles size={12} /> {tr ? "ETKİLEŞİMLİ HSE EĞİTİMİ" : "INTERACTIVE HSE TRAINING"}
          </div>
          <h2 className="mt-5 text-[38px] font-black leading-[.98] tracking-[-0.045em] text-white sm:text-[48px] lg:text-[54px]">
            {tr ? "Gözünü eğit." : "Train your eye."}<br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {tr ? "Gerçek saha kararını test et." : "Test real field judgment."}
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-7 text-slate-300 sm:text-[15px] lg:mx-0">
            {tr
              ? "Tehlike farkındalığını, karar kalitesini ve saha refleksini geliştirmek için tasarlanmış etkileşimli HSE challenge'ları."
              : "Interactive HSE challenges designed to strengthen hazard recognition, decision quality and field awareness."}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href={`/${locale}/labs`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-5 text-[12px] font-black text-white shadow-[0_14px_35px_rgba(99,102,241,.22)] transition hover:-translate-y-0.5 hover:brightness-110">
              {tr ? "HSE Labs'i keşfet" : "Explore HSE Labs"}<ArrowRight size={15} />
            </Link>
            <Link href={`/${locale}/labs/spot-the-hazard`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-violet-300/30 bg-white/[0.025] px-5 text-[12px] font-black text-white transition hover:border-violet-300/55 hover:bg-violet-400/[0.07]">
              {tr ? "Görsel teste başla" : "Start Visual Test"}<ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[26px] border border-cyan-300/20 bg-[#07111f]/78 p-5 shadow-[0_26px_80px_rgba(0,0,0,.30)] backdrop-blur-2xl sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_5%,rgba(34,211,238,.16),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(139,92,246,.12),transparent_30%)]" />
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200"><ScanSearch size={20} /></span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">VISUAL TEST CHALLENGE</p>
                <p className="mt-1 text-[10px] text-slate-500">Spot the Hazard</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.09] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-emerald-200">LIVE</span>
          </div>
          <p className="relative z-10 mt-5 text-[13px] leading-6 text-slate-300">
            {tr ? "Gerçekçi endüstriyel sahnelerde görünür tehlikeleri bul ve saha farkındalığını test et." : "Find visible hazards in realistic industrial scenes and test your field awareness."}
          </p>
          <div className="relative z-10 mt-5 grid grid-cols-3 gap-2">
            {[["5", tr ? "SAHNE" : "SCENES"], ["100", tr ? "PUAN" : "SCORE"], ["XP", tr ? "İLERLEME" : "PROGRESS"]].map(([value,label]) => (
              <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3">
                <b className={`block text-[15px] font-black ${value === "XP" ? "text-cyan-200" : "text-white"}`}>{value}</b>
                <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.10em] text-slate-500">{label}</span>
              </div>
            ))}
          </div>
          <Link href={`/${locale}/labs/spot-the-hazard`} className="relative z-10 mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-[12px] font-black text-slate-950 shadow-[0_12px_28px_rgba(34,211,238,.16)] transition hover:bg-cyan-200">
            {tr ? "Challenge'a başla" : "Start Challenge"}<ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>,
    mountNode,
  );
}
