"use client";

import { useState } from "react";
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
import { Link } from "../../../i18n/navigation";

type Props = {
  locale: "tr" | "en";
  authenticated: boolean;
  onClose: () => void;
};

type Section = "tools" | "labs" | "resources" | null;
type Accent = "cyan" | "blue" | "violet" | "emerald" | "fuchsia";

const PHOTO = {
  dashboard: "/images/menu-dashboard.webp",
  tools: "/labs/spot-the-hazard/hot-work-final.jpg",
  performance: "/images/menu-performance.webp",
  labs: "/labs/spot-the-hazard/confined-space-final.jpg",
  resources: "/images/menu-resources.webp",
  ai: "/images/menu-ai.webp",
};

export default function DesktopMegaMenu({ locale, authenticated, onClose }: Props) {
  const tr = locale === "tr";
  const [openSection, setOpenSection] = useState<Section>(null);

  const toolItems = [
    { href: "/tools/quick-risk-assessment", title: tr ? "Risk Analizi" : "Risk Assessment", icon: ShieldCheck },
    { href: "/tools/method-statement", title: "Method Statement", icon: FileText },
    { href: "/safety-pack", title: "Safety Pack", icon: Sparkles },
    { href: "/ppe-standards", title: tr ? "KKD Standartları" : "PPE Standards", icon: HardHat },
    { href: "/tools/simops", title: "SIMOPS", icon: Layers3 },
    { href: "/tools/risk-matrix", title: tr ? "Risk Matrisi" : "Risk Matrix", icon: Grid3X3 },
    { href: "/tools/trir", title: "TRIR", icon: Gauge },
    { href: "/tools/ltifr", title: "LTIFR", icon: Calculator },
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

  const tone = (accent: Accent) => {
    const map = {
      cyan: {
        border: "border-cyan-400/30",
        glow: "shadow-[0_18px_50px_rgba(34,211,238,.10)]",
        icon: "border-cyan-300/30 bg-cyan-500/[0.13] text-cyan-100",
        line: "bg-cyan-300",
      },
      blue: {
        border: "border-blue-400/30",
        glow: "shadow-[0_18px_50px_rgba(37,99,235,.12)]",
        icon: "border-blue-300/30 bg-blue-500/[0.14] text-blue-100",
        line: "bg-blue-300",
      },
      violet: {
        border: "border-violet-400/30",
        glow: "shadow-[0_18px_50px_rgba(139,92,246,.12)]",
        icon: "border-violet-300/30 bg-violet-500/[0.14] text-violet-100",
        line: "bg-violet-300",
      },
      emerald: {
        border: "border-emerald-400/30",
        glow: "shadow-[0_18px_50px_rgba(16,185,129,.11)]",
        icon: "border-emerald-300/30 bg-emerald-500/[0.13] text-emerald-100",
        line: "bg-emerald-300",
      },
      fuchsia: {
        border: "border-fuchsia-400/30",
        glow: "shadow-[0_18px_50px_rgba(217,70,239,.10)]",
        icon: "border-fuchsia-300/30 bg-fuchsia-500/[0.14] text-fuchsia-100",
        line: "bg-fuchsia-300",
      },
    };
    return map[accent];
  };

  const PhotoPane = ({ src }: { src: string }) => (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] overflow-hidden">
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover opacity-[0.98] saturate-[1.08] contrast-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06101e] via-[#06101e]/34 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/20 via-transparent to-transparent" />
    </div>
  );

  const DirectCard = ({
    href,
    title,
    subtitle,
    icon: Icon,
    photo,
    accent,
  }: {
    href: string;
    title: string;
    subtitle: string;
    icon: typeof Wrench;
    photo: string;
    accent: Accent;
  }) => {
    const styles = tone(accent);

    return (
      <Link
        href={href}
        onClick={onClose}
        className={`group relative flex min-h-[118px] items-center gap-4 overflow-hidden rounded-[24px] border bg-[#06101e] px-5 transition duration-300 ${styles.border} ${styles.glow} hover:-translate-y-0.5`}
      >
        <PhotoPane src={photo} />
        <span className={`absolute bottom-4 left-0 top-4 z-10 w-[3px] rounded-r-full ${styles.line}`} />

        <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border backdrop-blur-md ${styles.icon}`}>
          <Icon size={20} />
        </span>

        <span className="relative z-10 min-w-0 max-w-[46%]">
          <span className="block text-[17px] font-black tracking-[-0.025em] text-white">{title}</span>
          <span className="mt-1 block text-[11px] leading-5 text-slate-300/85">{subtitle}</span>
        </span>

        <span className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#07101f]/78 text-white backdrop-blur-md transition group-hover:border-white/25">
          <ArrowRight size={17} />
        </span>
      </Link>
    );
  };

  const AccordionCard = ({
    id,
    title,
    subtitle,
    icon: Icon,
    photo,
    accent,
    items,
  }: {
    id: Exclude<Section, null>;
    title: string;
    subtitle: string;
    icon: typeof Wrench;
    photo: string;
    accent: Accent;
    items: Array<{ href: string; title: string; icon: typeof Wrench }>;
  }) => {
    const open = openSection === id;
    const styles = tone(accent);

    return (
      <div className={`relative overflow-hidden rounded-[24px] border bg-[#06101e] transition duration-300 ${styles.border} ${styles.glow}`}>
        <PhotoPane src={photo} />
        <span className={`absolute bottom-4 left-0 top-4 z-10 w-[3px] rounded-r-full ${styles.line}`} />

        <button
          type="button"
          onClick={() => setOpenSection(open ? null : id)}
          className="relative z-10 flex min-h-[118px] w-full items-center gap-4 px-5 text-left"
          aria-expanded={open}
        >
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border backdrop-blur-md ${styles.icon}`}>
            <Icon size={20} />
          </span>

          <span className="min-w-0 max-w-[46%]">
            <span className="block text-[17px] font-black tracking-[-0.025em] text-white">{title}</span>
            <span className="mt-1 block text-[11px] leading-5 text-slate-300/85">{subtitle}</span>
          </span>

          <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#07101f]/78 text-white backdrop-blur-md">
            <ChevronDown size={17} className={`transition duration-300 ${open ? "rotate-180" : ""}`} />
          </span>
        </button>

        {open && (
          <div className="relative z-20 grid grid-cols-2 gap-2 border-t border-white/[0.08] bg-[#020817]/92 p-3 backdrop-blur-xl">
            {items.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[58px] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-slate-200 transition hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-slate-300">
                    <ItemIcon size={16} />
                  </span>
                  <span className="text-[11px] font-black">{item.title}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="absolute inset-x-0 top-full z-[700] hidden max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/[0.06] bg-[#020817]/98 px-6 py-5 shadow-[0_32px_90px_rgba(0,0,0,.62)] backdrop-blur-2xl xl:block">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-start justify-between gap-6 px-1">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-300">SERNEM</p>
            <h2 className="mt-2 text-[28px] font-black tracking-[-0.045em] text-white">
              {tr ? "Platform" : "Platform"}
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              {tr ? "Tüm SERNEM bölümleri tek görünümde." : "All SERNEM sections in one view."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.025] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            aria-label={tr ? "Menüyü kapat" : "Close menu"}
          >
            <X size={17} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {authenticated && (
            <DirectCard
              href="/dashboard"
              title="Dashboard"
              subtitle={tr ? "Genel bakış, kayıtlar ve hızlı işlemler." : "Overview, saved work and quick actions."}
              icon={LayoutDashboard}
              photo={PHOTO.dashboard}
              accent="cyan"
            />
          )}

          <AccordionCard
            id="tools"
            title={tr ? "HSE Araçları" : "HSE Tools"}
            subtitle={tr ? "Risk, dokümantasyon ve saha araçları." : "Risk, documentation and field tools."}
            icon={Wrench}
            photo={PHOTO.tools}
            accent="blue"
            items={toolItems}
          />

          {authenticated && (
            <DirectCard
              href="/hse-performance"
              title={tr ? "HSE Performans" : "HSE Performance"}
              subtitle={tr ? "KPI, gözlem, trend ve raporlama." : "KPIs, observations, trends and reporting."}
              icon={Gauge}
              photo={PHOTO.performance}
              accent="cyan"
            />
          )}

          <AccordionCard
            id="labs"
            title="HSE Labs"
            subtitle={tr ? "Simülasyonlar ve etkileşimli eğitim." : "Simulations and interactive training."}
            icon={Sparkles}
            photo={PHOTO.labs}
            accent="violet"
            items={labItems}
          />

          <AccordionCard
            id="resources"
            title={tr ? "Kaynaklar" : "Resources"}
            subtitle={tr ? "Rehberler, toolbox ve saha içerikleri." : "Guides, toolbox talks and field resources."}
            icon={Grid3X3}
            photo={PHOTO.resources}
            accent="emerald"
            items={resourceItems}
          />

          <DirectCard
            href="/ai-assistant"
            title={tr ? "AI Asistan" : "AI Assistant"}
            subtitle={tr ? "Sor, öğren ve hızlı HSE desteği al." : "Ask, learn and get instant HSE support."}
            icon={Bot}
            photo={PHOTO.ai}
            accent="fuchsia"
          />
        </div>
      </div>
    </div>
  );
}
