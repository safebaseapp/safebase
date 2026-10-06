"use client";

import { useState } from "react";
import { Link } from "../../../i18n/navigation";
import {
  Activity,
  Bot,
  Calculator,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gauge,
  Grid3X3,
  HardHat,
  Images,
  Layers3,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Wrench,
  X,
} from "lucide-react";

type Props = {
  locale: "tr" | "en";
  authenticated: boolean;
  onClose: () => void;
};

type Section = "tools" | "labs" | "resources" | null;

export default function MobileMainMenu({ locale, authenticated, onClose }: Props) {
  const tr = locale === "tr";
  const [openSection, setOpenSection] = useState<Section>("tools");

  const toolItems = [
    { href: "/tools/quick-risk-assessment", title: tr ? "Risk Analizi" : "Risk Assessment", icon: ShieldCheck },
    { href: "/tools/method-statement", title: "Method Statement", icon: FileText },
    { href: "/safety-pack", title: "Safety Pack", icon: Sparkles },
    { href: "/ppe-standards", title: tr ? "KKD Standartları" : "PPE Standards", icon: HardHat },
    { href: "/tools/simops", title: "SIMOPS", icon: Layers3 },
    { href: "/tools/risk-matrix", title: tr ? "Risk Matrisi" : "Risk Matrix", icon: Grid3X3 },
    { href: "/tools/trir", title: "TRIR", icon: Gauge },
    { href: "/tools/ltifr", title: "LTIFR", icon: Calculator },
    { href: "/tools/severity-rate", title: tr ? "Şiddet Oranı" : "Severity Rate", icon: Activity },
  ];

  const labItems = [
    { href: "/labs", title: "HSE Labs", icon: Sparkles },
    { href: "/labs/spot-the-hazard", title: "Spot the Hazard", icon: TriangleAlert },
    { href: "/labs/incident-simulator", title: "Incident Simulator", icon: Activity },
  ];

  const resourceItems = [
    { href: "/checklists", title: tr ? "Denetimler" : "Inspections", icon: ClipboardCheck },
    { href: "/knowledge-base", title: tr ? "Rehberler" : "Guides", icon: FileText },
    { href: "/toolbox", title: "Toolbox Talk", icon: MessageSquareText },
    { href: "/posters", title: tr ? "Posterler" : "Posters", icon: Images },
    { href: "/safety-signs", title: tr ? "Güvenlik Levhaları" : "Safety Signs", icon: TriangleAlert },
    { href: "/downloads", title: tr ? "İndirme Merkezi" : "Download Center", icon: Wrench },
  ];

  const Accordion = ({
    id,
    title,
    icon: Icon,
    items,
    accent,
  }: {
    id: Exclude<Section, null>;
    title: string;
    icon: typeof Wrench;
    items: { href: string; title: string; icon: typeof Wrench }[];
    accent: "blue" | "violet" | "emerald";
  }) => {
    const open = openSection === id;
    const tone =
      accent === "blue"
        ? "border-blue-400/15 bg-blue-500/[0.055] text-blue-200"
        : accent === "violet"
          ? "border-violet-400/15 bg-violet-500/[0.055] text-violet-200"
          : "border-emerald-400/15 bg-emerald-500/[0.05] text-emerald-200";

    return (
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.018]">
        <button
          type="button"
          onClick={() => setOpenSection(open ? null : id)}
          className="flex min-h-14 w-full items-center gap-3 px-4 text-left"
          aria-expanded={open}
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${tone}`}>
            <Icon size={17} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 flex-1 text-sm font-black text-slate-100">{title}</span>
          <ChevronDown size={16} className={`text-slate-500 transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="grid grid-cols-2 gap-2 border-t border-white/[0.07] p-2">
            {items.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[72px] items-center gap-2.5 rounded-xl border border-white/[0.06] bg-slate-950/35 p-3 transition active:bg-white/[0.05]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-slate-300">
                    <ItemIcon size={16} strokeWidth={1.9} />
                  </span>
                  <span className="text-[11px] font-black leading-4 text-slate-200">{item.title}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[9998] overflow-y-auto bg-[#020817]/[0.995] px-4 pb-8 pt-[92px] text-white backdrop-blur-2xl lg:hidden">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-4 flex items-start justify-between gap-4 px-1">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.20em] text-blue-400">SERNEM</p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-white">
              {tr ? "Ana Menü" : "Main Menu"}
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {tr ? "Platform bölümlerine düzenli erişim." : "Structured access to the platform."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={tr ? "Menüyü kapat" : "Close menu"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-slate-400"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-2">
          {authenticated && (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.018] px-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-500/[0.055] text-cyan-200">
                <LayoutDashboard size={17} />
              </span>
              <span className="text-sm font-black text-slate-100">Dashboard</span>
            </Link>
          )}

          <Accordion
            id="tools"
            title={tr ? "HSE Araçları" : "HSE Tools"}
            icon={Wrench}
            items={toolItems}
            accent="blue"
          />

          {authenticated && (
            <Link
              href="/hse-performance"
              onClick={onClose}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.018] px-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-500/[0.055] text-cyan-200">
                <Gauge size={17} />
              </span>
              <span className="text-sm font-black text-slate-100">{tr ? "HSE Performans" : "HSE Performance"}</span>
            </Link>
          )}

          <Accordion
            id="labs"
            title="HSE Labs"
            icon={Sparkles}
            items={labItems}
            accent="violet"
          />

          <Accordion
            id="resources"
            title={tr ? "Kaynaklar" : "Resources"}
            icon={Grid3X3}
            items={resourceItems}
            accent="emerald"
          />

          <Link
            href="/ai-assistant"
            onClick={onClose}
            className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.018] px-4"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.055] text-violet-200">
              <Bot size={17} />
            </span>
            <span className="text-sm font-black text-slate-100">{tr ? "AI Asistan" : "AI Assistant"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
