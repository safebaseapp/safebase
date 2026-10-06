"use client";

import {
  Activity,
  ArrowRight,
  Bot,
  Calculator,
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

type MenuItem = {
  href: string;
  title: string;
  icon: typeof Wrench;
};

type Card = {
  key: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  icon: typeof Wrench;
  accent: string;
  items: MenuItem[];
};

const PHOTO = {
  dashboard: "/images/menu-dashboard.webp",
  tools: "/images/menu-tools.webp",
  performance: "/images/menu-performance.webp",
  labs: "/images/menu-labs.webp",
  resources: "/images/menu-resources.webp",
  ai: "/images/menu-ai.webp",
};

export default function DesktopMegaMenu({ locale, authenticated, onClose }: Props) {
  const tr = locale === "tr";

  const cards: Card[] = [
    ...(authenticated
      ? [{
          key: "dashboard",
          title: "Dashboard",
          eyebrow: tr ? "ÇALIŞMA ALANI" : "WORKSPACE",
          description: tr ? "Genel bakış, kayıtlar ve hızlı aksiyonlar." : "Overview, saved work and quick actions.",
          href: "/dashboard",
          image: PHOTO.dashboard,
          icon: LayoutDashboard,
          accent: "cyan",
          items: [],
        } satisfies Card]
      : []),
    {
      key: "tools",
      title: tr ? "HSE Araçları" : "HSE Tools",
      eyebrow: tr ? "ANALİZ & UYGULAMA" : "ANALYSIS & EXECUTION",
      description: tr ? "Risk, dokümantasyon ve operasyon araçları." : "Risk, documentation and operational tools.",
      href: "/tools",
      image: PHOTO.tools,
      icon: Wrench,
      accent: "blue",
      items: [
        { href: "/tools/quick-risk-assessment", title: tr ? "Risk Analizi" : "Risk Assessment", icon: ShieldCheck },
        { href: "/tools/method-statement", title: "Method Statement", icon: FileText },
        { href: "/tools/simops", title: "SIMOPS", icon: Layers3 },
        { href: "/tools/risk-matrix", title: tr ? "Risk Matrisi" : "Risk Matrix", icon: Grid3X3 },
      ],
    },
    ...(authenticated
      ? [{
          key: "performance",
          title: tr ? "HSE Performans" : "HSE Performance",
          eyebrow: tr ? "KPI & GÖRÜNÜRLÜK" : "KPI & VISIBILITY",
          description: tr ? "KPI, gözlem, trend ve raporlama." : "KPIs, observations, trends and reporting.",
          href: "/hse-performance",
          image: PHOTO.performance,
          icon: Gauge,
          accent: "cyan",
          items: [
            { href: "/tools/trir", title: "TRIR", icon: Gauge },
            { href: "/tools/ltifr", title: "LTIFR", icon: Calculator },
          ],
        } satisfies Card]
      : []),
    {
      key: "labs",
      title: "HSE Labs",
      eyebrow: tr ? "ETKİLEŞİMLİ EĞİTİM" : "INTERACTIVE TRAINING",
      description: tr ? "Saha refleksini senaryolarla test et." : "Test field judgment with interactive scenarios.",
      href: "/labs",
      image: PHOTO.labs,
      icon: Sparkles,
      accent: "violet",
      items: [
        { href: "/labs/spot-the-hazard", title: "Spot the Hazard", icon: TriangleAlert },
        { href: "/labs/incident-simulator", title: "Incident Simulator", icon: Activity },
      ],
    },
    {
      key: "resources",
      title: tr ? "Kaynaklar" : "Resources",
      eyebrow: tr ? "SAHA KÜTÜPHANESİ" : "FIELD LIBRARY",
      description: tr ? "Toolbox, rehber, poster ve levhalar." : "Toolbox talks, guides, posters and safety signs.",
      href: "/downloads",
      image: PHOTO.resources,
      icon: Grid3X3,
      accent: "emerald",
      items: [
        { href: "/toolbox", title: "Toolbox Talk", icon: MessageSquareText },
        { href: "/knowledge-base", title: tr ? "Rehberler" : "Guides", icon: FileText },
        { href: "/checklists", title: tr ? "Denetimler" : "Inspections", icon: ClipboardCheck },
        { href: "/safety-signs", title: tr ? "Levhalar" : "Safety Signs", icon: Images },
      ],
    },
    {
      key: "ai",
      title: tr ? "AI Asistan" : "AI Assistant",
      eyebrow: tr ? "HSE ZEKÂSI" : "HSE INTELLIGENCE",
      description: tr ? "Sor, öğren ve hızlı HSE desteği al." : "Ask, learn and get instant HSE support.",
      href: "/ai-assistant",
      image: PHOTO.ai,
      icon: Bot,
      accent: "fuchsia",
      items: [],
    },
  ];

  const tone = (accent: string) => {
    if (accent === "violet") return {
      line: "bg-violet-300",
      icon: "border-violet-300/30 bg-violet-500/[0.15] text-violet-100",
      hover: "hover:border-violet-300/35 hover:shadow-[0_20px_60px_rgba(139,92,246,.14)]",
      tag: "text-violet-200",
    };
    if (accent === "emerald") return {
      line: "bg-emerald-300",
      icon: "border-emerald-300/30 bg-emerald-500/[0.13] text-emerald-100",
      hover: "hover:border-emerald-300/35 hover:shadow-[0_20px_60px_rgba(16,185,129,.12)]",
      tag: "text-emerald-200",
    };
    if (accent === "fuchsia") return {
      line: "bg-fuchsia-300",
      icon: "border-fuchsia-300/30 bg-fuchsia-500/[0.14] text-fuchsia-100",
      hover: "hover:border-fuchsia-300/35 hover:shadow-[0_20px_60px_rgba(217,70,239,.12)]",
      tag: "text-fuchsia-200",
    };
    if (accent === "blue") return {
      line: "bg-blue-300",
      icon: "border-blue-300/30 bg-blue-500/[0.14] text-blue-100",
      hover: "hover:border-blue-300/35 hover:shadow-[0_20px_60px_rgba(37,99,235,.14)]",
      tag: "text-blue-200",
    };
    return {
      line: "bg-cyan-300",
      icon: "border-cyan-300/30 bg-cyan-500/[0.13] text-cyan-100",
      hover: "hover:border-cyan-300/35 hover:shadow-[0_20px_60px_rgba(34,211,238,.12)]",
      tag: "text-cyan-200",
    };
  };

  return (
    <div className="absolute inset-x-0 top-full z-[700] hidden border-t border-white/[0.06] bg-[#020817]/98 px-6 py-5 shadow-[0_32px_90px_rgba(0,0,0,.62)] backdrop-blur-2xl xl:block">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between gap-6 px-1">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.20em] text-sky-300">SERNEM PLATFORM</p>
            <h2 className="mt-2 text-[25px] font-black tracking-[-0.04em] text-white">
              {tr ? "İhtiyacın olan bölüme doğrudan geç." : "Go straight to what you need."}
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              {tr ? "Araçlar, performans, eğitim ve kaynaklar tek görünümde." : "Tools, performance, training and resources in one view."}
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

        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const styles = tone(card.accent);

            return (
              <article
                key={card.key}
                className={`group relative min-h-[222px] overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#07101f] transition duration-300 ${styles.hover}`}
              >
                <img
                  src={card.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.92] saturate-[1.08] contrast-[1.06] transition duration-500 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/78 to-[#020817]/16" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/88 via-transparent to-[#020817]/12" />
                <span className={`absolute bottom-4 left-0 top-4 w-[3px] rounded-r-full ${styles.line}`} />

                <div className="relative z-10 flex min-h-[222px] flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-[15px] border backdrop-blur-md ${styles.icon}`}>
                      <Icon size={18} />
                    </span>

                    <Link
                      href={card.href}
                      onClick={onClose}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#07101f]/72 text-white backdrop-blur-md transition group-hover:border-white/25 group-hover:bg-[#0b1728]/90"
                      aria-label={card.title}
                    >
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                  <div className="mt-auto max-w-[78%]">
                    <p className={`text-[9px] font-black uppercase tracking-[0.16em] ${styles.tag}`}>{card.eyebrow}</p>
                    <Link href={card.href} onClick={onClose} className="mt-1.5 block text-[20px] font-black tracking-[-0.035em] text-white">
                      {card.title}
                    </Link>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-300">{card.description}</p>
                  </div>

                  {card.items.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {card.items.slice(0, 4).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="rounded-lg border border-white/[0.10] bg-[#07101f]/72 px-2.5 py-1.5 text-[9px] font-black text-slate-300 backdrop-blur-md transition hover:border-sky-300/25 hover:text-white"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
