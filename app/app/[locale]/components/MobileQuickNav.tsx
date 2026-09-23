"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bot,
  Calculator,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gauge,
  Grid3X3,
  Images,
  Layers3,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

type Props = {
  locale: "tr" | "en";
};

type Panel = "tools" | "resources" | null;

export default function MobileQuickNav({ locale }: Props) {
  const isTurkish = locale === "tr";
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<Panel>(null);

  useEffect(() => {
    setOpenPanel(null);
  }, [pathname]);

  if (pathname?.includes("/login") || pathname?.includes("/register")) {
    return null;
  }

  const tools = [
    {
      href: `/${locale}/tools/quick-risk-assessment`,
      icon: ShieldCheck,
      title: isTurkish ? "Risk Analizi" : "Risk Assessment",
    },
    {
      href: `/${locale}/tools/method-statement`,
      icon: FileText,
      title: "Method Statement",
    },
    {
      href: `/${locale}/tools/simops`,
      icon: Layers3,
      title: "SIMOPS",
    },
    {
      href: `/${locale}/tools/risk-matrix`,
      icon: Grid3X3,
      title: isTurkish ? "Risk Matrisi" : "Risk Matrix",
    },
    {
      href: `/${locale}/tools/trir`,
      icon: Gauge,
      title: "TRIR",
    },
    {
      href: `/${locale}/tools/ltifr`,
      icon: Calculator,
      title: "LTIFR",
    },
  ];

  const resources = [
    {
      href: `/${locale}/safety-pack`,
      icon: Sparkles,
      title: "Safety Packs",
    },
    {
      href: `/${locale}/checklists`,
      icon: ClipboardCheck,
      title: isTurkish ? "Denetimler" : "Inspections",
    },
    {
      href: `/${locale}/knowledge-base`,
      icon: FileText,
      title: isTurkish ? "Rehberler" : "Guides",
    },
    {
      href: `/${locale}/toolbox`,
      icon: MessageSquareText,
      title: "Toolbox Talk",
    },
    {
      href: `/${locale}/posters`,
      icon: Images,
      title: isTurkish ? "Posterler" : "Posters",
    },
    {
      href: `/${locale}/downloads`,
      icon: Wrench,
      title: isTurkish ? "İndirme Merkezi" : "Download Center",
    },
  ];

  return (
    <div className="relative z-40 border-b border-white/[0.07] bg-[#020817] xl:hidden print:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setOpenPanel((current) => (current === "tools" ? null : "tools"))}
          className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3.5 text-xs font-black transition ${
            openPanel === "tools"
              ? "border-blue-400/35 bg-blue-500/[0.14] text-white"
              : "border-blue-400/15 bg-blue-500/[0.06] text-blue-100"
          }`}
          aria-expanded={openPanel === "tools"}
        >
          <Wrench size={15} />
          {isTurkish ? "HSE Araçları" : "HSE Tools"}
          <ChevronDown size={13} className={`transition ${openPanel === "tools" ? "rotate-180" : ""}`} />
        </button>

        <button
          type="button"
          onClick={() => setOpenPanel((current) => (current === "resources" ? null : "resources"))}
          className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border px-3.5 text-xs font-black transition ${
            openPanel === "resources"
              ? "border-emerald-400/30 bg-emerald-500/[0.12] text-white"
              : "border-emerald-400/15 bg-emerald-500/[0.05] text-emerald-100"
          }`}
          aria-expanded={openPanel === "resources"}
        >
          <Grid3X3 size={15} />
          {isTurkish ? "Kaynaklar" : "Resources"}
          <ChevronDown size={13} className={`transition ${openPanel === "resources" ? "rotate-180" : ""}`} />
        </button>

        <Link
          href={`/${locale}/safety-pack`}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/[0.07] px-3.5 text-xs font-black text-cyan-100"
        >
          <Sparkles size={15} />
          Safety Packs
        </Link>

        <Link
          href={`/${locale}/ai-assistant`}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/[0.07] px-3.5 text-xs font-black text-violet-100"
        >
          <Bot size={15} />
          {isTurkish ? "AI Asistan" : "AI Assistant"}
        </Link>
      </div>

      {openPanel && (
        <div className="absolute inset-x-0 top-full z-[120] border-y border-white/[0.08] bg-[#030a18]/[0.985] px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,.55)] backdrop-blur-2xl">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
            {(openPanel === "tools" ? tools : resources).map((item) => {
              const Icon = item.icon;
              const isTools = openPanel === "tools";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenPanel(null)}
                  className={`flex min-h-[76px] items-center gap-3 rounded-2xl border p-3 transition ${
                    isTools
                      ? "border-blue-400/10 bg-blue-500/[0.04] active:bg-blue-500/[0.10]"
                      : "border-emerald-400/10 bg-emerald-500/[0.035] active:bg-emerald-500/[0.09]"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                      isTools
                        ? "border-blue-400/15 bg-blue-500/[0.08] text-blue-300"
                        : "border-emerald-400/15 bg-emerald-500/[0.07] text-emerald-300"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="text-[12px] font-black leading-4 text-slate-100">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
