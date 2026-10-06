"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "../../../i18n/navigation";
import {
  Activity,
  ArrowRight,
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

const PHOTO = {
  dashboard: "/images/sernem-hse-professional.webp",
  tools: "/images/sernem-hse-hero.png",
  performance: "/images/sernem-hero-refinery.png",
  labs: "/images/sernem-hse-hero-final.png",
  resources: "/images/sernem-hse-professional.webp",
  ai: "/images/sernem-ai-human-avatar.jpg",
};

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

  const [openSection, setOpenSection] = useState<Section>(routeSection ?? null);

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
      title: string;
    }
  > = {
    blue: {
      shell: "border-blue-400/30 shadow-[0_18px_45px_rgba(15,23,42,.35)]",
      activeShell: "border-blue-300/65 shadow-[0_20px_58px_rgba(37,99,235,.18)]",
      icon: "border-blue-300/35 bg-blue-500/[0.14] text-blue-100",
      activeIcon: "border-blue-200/55 bg-blue-400/[0.22] text-white",
      line: "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.72)]",
      itemActive: "border-blue-300/40 bg-blue-500/[0.16] text-white",
      title: "text-blue-50",
    },
    violet: {
      shell: "border-violet-400/30 shadow-[0_18px_45px_rgba(15,23,42,.35)]",
      activeShell: "border-violet-300/65 shadow-[0_20px_58px_rgba(139,92,246,.18)]",
      icon: "border-violet-300/35 bg-violet-500/[0.14] text-violet-100",
      activeIcon: "border-violet-200/55 bg-violet-400/[0.22] text-white",
      line: "bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,.72)]",
      itemActive: "border-violet-300/40 bg-violet-500/[0.16] text-white",
      title: "text-violet-50",
    },
    emerald: {
      shell: "border-emerald-400/30 shadow-[0_18px_45px_rgba(15,23,42,.35)]",
      activeShell: "border-emerald-300/60 shadow-[0_20px_58px_rgba(16,185,129,.16)]",
      icon: "border-emerald-300/35 bg-emerald-500/[0.13] text-emerald-100",
      activeIcon: "border-emerald-200/55 bg-emerald-400/[0.20] text-white",
      line: "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,.72)]",
      itemActive: "border-emerald-300/40 bg-emerald-500/[0.15] text-white",
      title: "text-emerald-50",
    },
  };

  const HereBadge = () => (
    <span className="rounded-full border border-white/15 bg-white/[0.08] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md">
      {tr ? "BURADASIN" : "YOU'RE HERE"}
    </span>
  );

  const PhotoPane = ({
    src,
    position = "center",
  }: {
    src: string;
    position?: string;
  }) => (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] overflow-hidden">
      <img
        src={src}
        alt=""
        loading="eager"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
        className="h-full w-full object-cover opacity-95 saturate-[1.04] contrast-[1.04]"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06101e] via-[#06101e]/55 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#020817]/20 to-transparent" />
    </div>
  );

  const Accordion = ({
    id,
    title,
    description,
    icon: Icon,
    items,
    accent,
    photo,
    position,
  }: {
    id: Exclude<Section, null>;
    title: string;
    description: string;
    icon: typeof Wrench;
    items: { href: string; title: string; icon: typeof Wrench }[];
    accent: Accent;
    photo: string;
    position?: string;
  }) => {
    const open = openSection === id;
    const active = routeSection === id;
    const styles = accordionStyles[accent];

    return (
      <div className={`relative overflow-hidden rounded-[24px] border bg-[#06101e] transition duration-300 ${active ? styles.activeShell : styles.shell}`}>
        <PhotoPane src={photo} position={position} />
        <span className={`absolute bottom-3 left-0 top-3 z-10 w-[3px] rounded-r-full ${styles.line} ${active ? "opacity-100" : "opacity-80"}`} />

        <button
          type="button"
          onClick={() => setOpenSection(open ? null : id)}
          className="relative z-10 flex min-h-[102px] w-full items-center gap-3 px-4 pl-5 text-left"
          aria-expanded={open}
        >
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_28px_rgba(0,0,0,.22)] backdrop-blur-md transition ${active ? styles.activeIcon : styles.icon}`}>
            <Icon size={20} strokeWidth={1.9} />
          </span>

          <span className="min-w-0 max-w-[48%]">
            <span className={`block text-[16px] font-black tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,.8)] ${styles.title}`}>
              {title}
            </span>
            <span className="mt-1 block text-[10px] font-medium leading-[1.35] text-slate-300/85">
              {description}
            </span>
            {active && <span className="mt-1.5 inline-flex"><HereBadge /></span>}
          </span>

          <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#07101f]/75 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_20px_rgba(0,0,0,.25)] backdrop-blur-md">
            <ChevronDown size={17} className={`transition duration-300 ${open ? "rotate-180" : ""}`} />
          </span>
        </button>

        {open && (
          <div className="relative z-20 grid grid-cols-2 gap-2 border-t border-white/[0.08] bg-[#020817]/92 p-2.5 backdrop-blur-xl">
            {items.map((item) => {
              const ItemIcon = item.icon;
              const itemActive = isRouteActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex min-h-[74px] items-center gap-2.5 rounded-xl border p-3 transition ${itemActive ? styles.itemActive : "border-white/[0.07] bg-white/[0.025] text-slate-200 active:bg-white/[0.06]"}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${itemActive ? styles.activeIcon : "border-white/[0.09] bg-white/[0.035] text-slate-300"}`}>
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

  const DirectCard = ({
    href,
    title,
    description,
    icon: Icon,
    photo,
    active,
    tone,
    position,
  }: {
    href: string;
    title: string;
    description: string;
    icon: typeof LayoutDashboard;
    photo: string;
    active: boolean;
    tone: "cyan" | "sky" | "fuchsia";
    position?: string;
  }) => {
    const style =
      tone === "fuchsia"
        ? {
            border: active ? "border-fuchsia-300/55" : "border-fuchsia-400/30",
            shadow: "shadow-[0_20px_58px_rgba(126,34,206,.16)]",
            line: "bg-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,.72)]",
            icon: "border-fuchsia-300/35 bg-fuchsia-500/[0.15] text-fuchsia-100",
            title: "text-fuchsia-50",
          }
        : tone === "sky"
          ? {
              border: active ? "border-sky-300/60" : "border-sky-400/30",
              shadow: "shadow-[0_20px_58px_rgba(14,165,233,.15)]",
              line: "bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,.72)]",
              icon: "border-sky-300/35 bg-sky-500/[0.14] text-sky-100",
              title: "text-sky-50",
            }
          : {
              border: active ? "border-cyan-300/60" : "border-cyan-400/30",
              shadow: "shadow-[0_20px_58px_rgba(34,211,238,.14)]",
              line: "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.72)]",
              icon: "border-cyan-300/35 bg-cyan-500/[0.14] text-cyan-100",
              title: "text-cyan-50",
            };

    return (
      <Link
        href={href}
        onClick={onClose}
        className={`relative flex min-h-[102px] items-center gap-3 overflow-hidden rounded-[24px] border bg-[#06101e] px-4 pl-5 transition duration-300 ${style.border} ${style.shadow}`}
      >
        <PhotoPane src={photo} position={position} />
        <span className={`absolute bottom-3 left-0 top-3 z-10 w-[3px] rounded-r-full ${style.line} ${active ? "opacity-100" : "opacity-80"}`} />

        <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_28px_rgba(0,0,0,.22)] backdrop-blur-md ${style.icon}`}>
          <Icon size={20} />
        </span>

        <span className="relative z-10 min-w-0 max-w-[48%]">
          <span className={`block text-[16px] font-black tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,.8)] ${style.title}`}>
            {title}
          </span>
          <span className="mt-1 block text-[10px] font-medium leading-[1.35] text-slate-300/85">
            {description}
          </span>
          {active && <span className="mt-1.5 inline-flex"><HereBadge /></span>}
        </span>

        <span className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#07101f]/75 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_20px_rgba(0,0,0,.25)] backdrop-blur-md">
          <ArrowRight size={17} />
        </span>
      </Link>
    );
  };

  const dashboardActive = relativePath.startsWith("/dashboard");
  const performanceActive = relativePath.startsWith("/hse-performance");
  const aiActive = relativePath.startsWith("/ai-assistant");

  return (
    <div className="fixed inset-0 z-[9998] overflow-y-auto bg-[#020817] text-white lg:hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[355px] overflow-hidden">
        <img
          src="/images/sernem-hero-refinery.png"
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.72] saturate-[1.02] contrast-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/20 via-[#020817]/48 to-[#020817]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/85 via-[#020817]/15 to-[#020817]/15" />
      </div>

      <div className="relative mx-auto w-full max-w-lg px-4 pb-10 pt-[82px]">
        <div className="mb-5 flex items-start justify-between gap-4 px-1">
          <div className="pt-2">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-300">SERNEM</p>
            <h2 className="mt-2 text-[32px] font-black leading-none tracking-[-0.05em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,.55)]">
              {tr ? "Ana Menü" : "Main Menu"}
            </h2>
            <p className="mt-2 text-[12px] font-medium leading-5 text-slate-300/80">
              {tr ? "Platforma yapılandırılmış erişim." : "Structured access to the platform."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={tr ? "Menüyü kapat" : "Close menu"}
            className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] border border-white/18 bg-[#07101f]/70 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_16px_38px_rgba(0,0,0,.32)] backdrop-blur-xl transition active:scale-[0.98] active:bg-white/[0.08]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2.5">
          {authenticated && (
            <DirectCard
              href="/dashboard"
              title="Dashboard"
              description={tr ? "Genel bakış, içgörüler ve hızlı işlemler." : "Overview, insights and quick actions."}
              icon={LayoutDashboard}
              photo={PHOTO.dashboard}
              active={dashboardActive}
              tone="cyan"
              position="center 50%"
            />
          )}

          <Accordion
            id="tools"
            title={tr ? "HSE Araçları" : "HSE Tools"}
            description={tr ? "Şablonlar, hesaplayıcılar ve saha araçları." : "Templates, calculators and practical tools."}
            icon={Wrench}
            items={toolItems}
            accent="blue"
            photo={PHOTO.tools}
            position="center 54%"
          />

          {authenticated && (
            <DirectCard
              href="/hse-performance"
              title={tr ? "HSE Performans" : "HSE Performance"}
              description={tr ? "KPI, raporlar ve güvenlik analitiği." : "KPIs, reports and safety analytics."}
              icon={Gauge}
              photo={PHOTO.performance}
              active={performanceActive}
              tone="sky"
              position="center 62%"
            />
          )}

          <Accordion
            id="labs"
            title="HSE Labs"
            description={tr ? "Simülasyonlar, senaryolar ve etkileşimli öğrenme." : "Simulations, scenarios and interactive learning."}
            icon={Sparkles}
            items={labItems}
            accent="violet"
            photo={PHOTO.labs}
            position="center 48%"
          />

          <Accordion
            id="resources"
            title={tr ? "Kaynaklar" : "Resources"}
            description={tr ? "Rehberler, dokümanlar ve saha içerikleri." : "Guides, documents and field resources."}
            icon={Grid3X3}
            items={resourceItems}
            accent="emerald"
            photo={PHOTO.resources}
            position="center 52%"
          />

          <DirectCard
            href="/ai-assistant"
            title={tr ? "AI Asistan" : "AI Assistant"}
            description={tr ? "Sor, öğren ve hızlı HSE desteği al." : "Ask, learn and get instant HSE support."}
            icon={Bot}
            photo={PHOTO.ai}
            active={aiActive}
            tone="fuchsia"
            position="center 42%"
          />
        </div>
      </div>
    </div>
  );
}
