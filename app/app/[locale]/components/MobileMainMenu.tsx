"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
type Accent = "blue" | "violet" | "emerald";

export default function MobileMainMenu({ locale, authenticated, onClose }: Props) {
  const tr = locale === "tr";
  const pathname = usePathname();
  const relativePath = pathname?.replace(/^\/(tr|en)/, "") || "/";

  const routeSection: Section =
    relativePath.startsWith("/labs")
      ? "labs"
      : (
          relativePath.startsWith("/checklists") ||
          relativePath.startsWith("/knowledge-base") ||
          relativePath.startsWith("/toolbox") ||
          relativePath.startsWith("/posters") ||
          relativePath.startsWith("/safety-signs") ||
          relativePath.startsWith("/downloads")
        )
        ? "resources"
        : (
            relativePath.startsWith("/tools") ||
            relativePath.startsWith("/safety-pack") ||
            relativePath.startsWith("/ppe-standards")
          )
          ? "tools"
          : null;

  const [openSection, setOpenSection] = useState<Section>(routeSection ?? "tools");

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

  const isRouteActive = (href: string) => {
    if (href === "/labs") return relativePath === "/labs";
    return relativePath === href || relativePath.startsWith(`${href}/`);
  };

  const accordionStyles: Record<
    Accent,
    {
      shell: string;
      activeShell: string;
      icon: string;
      activeIcon: string;
      line: string;
      itemActive: string;
    }
  > = {
    blue: {
      shell: "border-blue-400/20 bg-gradient-to-r from-blue-500/[0.08] via-blue-500/[0.035] to-transparent",
      activeShell: "border-blue-300/55 bg-gradient-to-r from-blue-500/[0.22] via-blue-500/[0.10] to-transparent shadow-[0_0_32px_rgba(59,130,246,.14)]",
      icon: "border-blue-400/25 bg-blue-500/[0.10] text-blue-200",
      activeIcon: "border-blue-300/45 bg-blue-400/[0.18] text-blue-100",
      line: "bg-blue-400",
      itemActive: "border-blue-300/35 bg-blue-500/[0.14] text-white",
    },
    violet: {
      shell: "border-violet-400/20 bg-gradient-to-r from-violet-500/[0.08] via-violet-500/[0.035] to-transparent",
      activeShell: "border-violet-300/55 bg-gradient-to-r from-violet-500/[0.22] via-violet-500/[0.10] to-transparent shadow-[0_0_32px_rgba(139,92,246,.14)]",
      icon: "border-violet-400/25 bg-violet-500/[0.10] text-violet-200",
      activeIcon: "border-violet-300/45 bg-violet-400/[0.18] text-violet-100",
      line: "bg-violet-400",
      itemActive: "border-violet-300/35 bg-violet-500/[0.14] text-white",
    },
    emerald: {
      shell: "border-emerald-400/20 bg-gradient-to-r from-emerald-500/[0.075] via-emerald-500/[0.03] to-transparent",
      activeShell: "border-emerald-300/50 bg-gradient-to-r from-emerald-500/[0.20] via-emerald-500/[0.09] to-transparent shadow-[0_0_32px_rgba(16,185,129,.12)]",
      icon: "border-emerald-400/25 bg-emerald-500/[0.09] text-emerald-200",
      activeIcon: "border-emerald-300/45 bg-emerald-400/[0.16] text-emerald-100",
      line: "bg-emerald-400",
      itemActive: "border-emerald-300/35 bg-emerald-500/[0.13] text-white",
    },
  };

  const HereBadge = () => (
    <span className="rounded-full border border-white/15 bg-white/[0.07] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white">
      {tr ? "BURADASIN" : "YOU'RE HERE"}
    </span>
  );

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
    accent: Accent;
  }) => {
    const open = openSection === id;
    const active = routeSection === id;
    const styles = accordionStyles[accent];

    return (
      <div className={`relative overflow-hidden rounded-2xl border transition ${active ? styles.activeShell : styles.shell}`}>
        <span className={`absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full ${styles.line} ${active ? "opacity-100" : "opacity-45"}`} />
        <button
          type="button"
          onClick={() => setOpenSection(open ? null : id)}
          className="flex min-h-[68px] w-full items-center gap-3 px-4 pl-5 text-left"
          aria-expanded={open}
        >
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${active ? styles.activeIcon : styles.icon}`}>
            <Icon size={19} strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-black tracking-[-0.01em] text-white">{title}</span>
            {active && <span className="mt-1 inline-flex"><HereBadge /></span>}
          </span>
          <ChevronDown size={17} className={`text-slate-400 transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="grid grid-cols-2 gap-2 border-t border-white/[0.08] p-2.5">
            {items.map((item) => {
              const ItemIcon = item.icon;
              const itemActive = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex min-h-[74px] items-center gap-2.5 rounded-xl border p-3 transition ${itemActive ? styles.itemActive : "border-white/[0.07] bg-slate-950/38 text-slate-200 active:bg-white/[0.05]"}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${itemActive ? styles.activeIcon : "border-white/[0.08] bg-white/[0.025] text-slate-300"}`}>
                    <ItemIcon size={16} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-black leading-4">{item.title}</span>
                    {itemActive && (
                      <span className="mt-1 block text-[7px] font-black uppercase tracking-[0.10em] text-white/65">
                        {tr ? "AÇIK SAYFA" : "CURRENT"}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const dashboardActive = relativePath.startsWith("/dashboard");
  const performanceActive = relativePath.startsWith("/hse-performance");
  const aiActive = relativePath.startsWith("/ai-assistant");

  return (
    <div className="fixed inset-0 z-[9998] overflow-y-auto bg-[#020817]/[0.995] px-4 pb-8 pt-[92px] text-white backdrop-blur-2xl lg:hidden">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-4 flex items-start justify-between gap-4 px-1">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-400">SERNEM</p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.035em] text-white">
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-slate-400 transition active:bg-white/[0.07]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2.5">
          {authenticated && (
            <Link
              href="/dashboard"
              onClick={onClose}
              className={`relative flex min-h-[68px] items-center gap-3 overflow-hidden rounded-2xl border px-4 pl-5 transition ${dashboardActive ? "border-cyan-300/55 bg-gradient-to-r from-cyan-500/[0.22] via-cyan-500/[0.09] to-transparent shadow-[0_0_32px_rgba(34,211,238,.12)]" : "border-cyan-400/20 bg-gradient-to-r from-cyan-500/[0.08] via-cyan-500/[0.03] to-transparent"}`}
            >
              <span className={`absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-cyan-400 ${dashboardActive ? "opacity-100" : "opacity-45"}`} />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/[0.10] text-cyan-100">
                <LayoutDashboard size={19} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-black text-white">Dashboard</span>
                {dashboardActive && <span className="mt-1 inline-flex"><HereBadge /></span>}
              </span>
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
              className={`relative flex min-h-[68px] items-center gap-3 overflow-hidden rounded-2xl border px-4 pl-5 transition ${performanceActive ? "border-sky-300/55 bg-gradient-to-r from-sky-500/[0.22] via-cyan-500/[0.09] to-transparent shadow-[0_0_32px_rgba(14,165,233,.12)]" : "border-sky-400/20 bg-gradient-to-r from-sky-500/[0.08] via-cyan-500/[0.03] to-transparent"}`}
            >
              <span className={`absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-sky-400 ${performanceActive ? "opacity-100" : "opacity-45"}`} />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-500/[0.10] text-sky-100">
                <Gauge size={19} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-black text-white">{tr ? "HSE Performans" : "HSE Performance"}</span>
                {performanceActive && <span className="mt-1 inline-flex"><HereBadge /></span>}
              </span>
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
            className={`relative flex min-h-[68px] items-center gap-3 overflow-hidden rounded-2xl border px-4 pl-5 transition ${aiActive ? "border-fuchsia-300/50 bg-gradient-to-r from-fuchsia-500/[0.18] via-violet-500/[0.09] to-transparent shadow-[0_0_32px_rgba(217,70,239,.10)]" : "border-fuchsia-400/18 bg-gradient-to-r from-fuchsia-500/[0.07] via-violet-500/[0.03] to-transparent"}`}
          >
            <span className={`absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-fuchsia-400 ${aiActive ? "opacity-100" : "opacity-45"}`} />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/[0.08] text-fuchsia-100">
              <Bot size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-black text-white">{tr ? "AI Asistan" : "AI Assistant"}</span>
              {aiActive && <span className="mt-1 inline-flex"><HereBadge /></span>}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
