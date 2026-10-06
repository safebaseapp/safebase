"use client";

import { useMemo, useState } from "react";
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

type Section = "dashboard" | "tools" | "performance" | "labs" | "resources" | "ai";

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
  const [active, setActive] = useState<Section>(authenticated ? "dashboard" : "tools");

  const sections = useMemo(
    () =>
      [
        authenticated && {
          id: "dashboard" as const,
          label: "Dashboard",
          icon: LayoutDashboard,
          tone: "cyan",
        },
        {
          id: "tools" as const,
          label: tr ? "HSE Araçları" : "HSE Tools",
          icon: Wrench,
          tone: "blue",
        },
        authenticated && {
          id: "performance" as const,
          label: tr ? "HSE Performans" : "HSE Performance",
          icon: Gauge,
          tone: "cyan",
        },
        {
          id: "labs" as const,
          label: "HSE Labs",
          icon: Sparkles,
          tone: "violet",
        },
        {
          id: "resources" as const,
          label: tr ? "Kaynaklar" : "Resources",
          icon: Grid3X3,
          tone: "emerald",
        },
        {
          id: "ai" as const,
          label: tr ? "AI Asistan" : "AI Assistant",
          icon: Bot,
          tone: "fuchsia",
        },
      ].filter(Boolean) as Array<{ id: Section; label: string; icon: typeof Wrench; tone: string }>,
    [authenticated, tr],
  );

  const data = {
    dashboard: {
      title: "Dashboard",
      eyebrow: tr ? "ÇALIŞMA ALANI" : "WORKSPACE",
      desc: tr ? "Aktivitelerini, kayıtlarını ve hızlı aksiyonlarını tek noktadan yönet." : "Manage activity, saved work and quick actions from one workspace.",
      href: "/dashboard",
      photo: PHOTO.dashboard,
      items: [] as Array<{ href: string; title: string; icon: typeof Wrench }>,
    },
    tools: {
      title: tr ? "HSE Araçları" : "HSE Tools",
      eyebrow: tr ? "ANALİZ & UYGULAMA" : "ANALYSIS & EXECUTION",
      desc: tr ? "Risk analizinden SIMOPS'a, sahada kullanılan temel HSE araçları." : "Core HSE tools from risk assessment to SIMOPS and performance calculations.",
      href: "/tools",
      photo: PHOTO.tools,
      items: [
        { href: "/tools/quick-risk-assessment", title: tr ? "Risk Analizi" : "Risk Assessment", icon: ShieldCheck },
        { href: "/tools/method-statement", title: "Method Statement", icon: FileText },
        { href: "/safety-pack", title: "Safety Pack", icon: Sparkles },
        { href: "/ppe-standards", title: tr ? "KKD Standartları" : "PPE Standards", icon: HardHat },
        { href: "/tools/simops", title: "SIMOPS", icon: Layers3 },
        { href: "/tools/risk-matrix", title: tr ? "Risk Matrisi" : "Risk Matrix", icon: Grid3X3 },
        { href: "/tools/trir", title: "TRIR", icon: Gauge },
        { href: "/tools/ltifr", title: "LTIFR", icon: Calculator },
      ],
    },
    performance: {
      title: tr ? "HSE Performans" : "HSE Performance",
      eyebrow: tr ? "KPI & GÖRÜNÜRLÜK" : "KPI & VISIBILITY",
      desc: tr ? "Gözlemleri, KPI'ları, trendleri ve raporlamayı tek performans görünümünde birleştir." : "Bring observations, KPIs, trends and reporting into one performance view.",
      href: "/hse-performance",
      photo: PHOTO.performance,
      items: [] as Array<{ href: string; title: string; icon: typeof Wrench }>,
    },
    labs: {
      title: "HSE Labs",
      eyebrow: tr ? "ETKİLEŞİMLİ EĞİTİM" : "INTERACTIVE TRAINING",
      desc: tr ? "Saha refleksini ve karar kalitesini senaryolarla test et." : "Test field awareness and decision quality with interactive scenarios.",
      href: "/labs",
      photo: PHOTO.labs,
      items: [
        { href: "/labs/spot-the-hazard", title: "Spot the Hazard", icon: TriangleAlert },
        { href: "/labs/incident-simulator", title: "Incident Simulator", icon: Activity },
      ],
    },
    resources: {
      title: tr ? "Kaynaklar" : "Resources",
      eyebrow: tr ? "SAHA KÜTÜPHANESİ" : "FIELD LIBRARY",
      desc: tr ? "Toolbox, rehber, denetim, poster ve levhalara hızlı erişim." : "Quick access to toolbox talks, guides, inspections, posters and safety signs.",
      href: "/downloads",
      photo: PHOTO.resources,
      items: [
        { href: "/checklists", title: tr ? "Denetimler" : "Inspections", icon: ClipboardCheck },
        { href: "/knowledge-base", title: tr ? "Rehberler" : "Guides", icon: FileText },
        { href: "/toolbox", title: "Toolbox Talk", icon: MessageSquareText },
        { href: "/posters", title: tr ? "Posterler" : "Posters", icon: Images },
        { href: "/safety-signs", title: tr ? "Güvenlik Levhaları" : "Safety Signs", icon: TriangleAlert },
        { href: "/downloads", title: tr ? "İndirme Merkezi" : "Download Center", icon: Wrench },
      ],
    },
    ai: {
      title: tr ? "AI Asistan" : "AI Assistant",
      eyebrow: tr ? "HSE ZEKÂSI" : "HSE INTELLIGENCE",
      desc: tr ? "Saha sorularını sor, kaynaklara ulaş ve yapılandırılmış HSE desteği al." : "Ask field questions, find relevant resources and get structured HSE support.",
      href: "/ai-assistant",
      photo: PHOTO.ai,
      items: [] as Array<{ href: string; title: string; icon: typeof Wrench }>,
    },
  }[active];

  return (
    <div className="absolute inset-x-0 top-full z-[700] hidden border-t border-white/[0.06] bg-[#020817]/98 px-6 py-5 shadow-[0_32px_90px_rgba(0,0,0,.62)] backdrop-blur-2xl xl:block">
      <div className="mx-auto grid max-w-7xl grid-cols-[250px_minmax(0,1fr)] gap-4">
        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.018] p-2">
          <div className="px-3 pb-3 pt-2">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">SERNEM</p>
            <p className="mt-1 text-[12px] text-slate-500">{tr ? "Platform menüsü" : "Platform menu"}</p>
          </div>

          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const selected = section.id === active;
              return (
                <button
                  key={section.id}
                  type="button"
                  onMouseEnter={() => setActive(section.id)}
                  onFocus={() => setActive(section.id)}
                  onClick={() => setActive(section.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                    selected
                      ? "border-sky-400/20 bg-sky-500/[0.075] text-white"
                      : "border-transparent text-slate-400 hover:border-white/[0.07] hover:bg-white/[0.025] hover:text-white"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-sky-200">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] font-black">{section.label}</span>
                  <ArrowRight size={14} className={selected ? "text-sky-300" : "text-slate-600"} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[410px] overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#07101f]">
          <img src={data.photo} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-75 saturate-[1.08]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/86 to-[#020817]/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/80 via-transparent to-[#020817]/18" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#07101f]/70 text-slate-300 backdrop-blur-xl hover:text-white"
            aria-label={tr ? "Menüyü kapat" : "Close menu"}
          >
            <X size={17} />
          </button>

          <div className="relative z-10 grid min-h-[410px] grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] gap-8 p-8">
            <div className="self-end pb-2">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-300">{data.eyebrow}</p>
              <h2 className="mt-3 text-[34px] font-black tracking-[-0.045em] text-white">{data.title}</h2>
              <p className="mt-3 max-w-md text-[13px] leading-6 text-slate-300">{data.desc}</p>
              <Link
                href={data.href}
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-sky-300/25 bg-sky-400/10 px-4 py-3 text-[12px] font-black text-sky-100 transition hover:border-sky-300/45 hover:bg-sky-400/15"
              >
                {tr ? "Bölümü aç" : "Open section"} <ArrowRight size={15} />
              </Link>
            </div>

            <div className="self-end">
              {data.items.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {data.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className="group flex min-h-[78px] items-center gap-3 rounded-2xl border border-white/[0.09] bg-[#07101f]/72 p-3 backdrop-blur-xl transition hover:border-sky-300/25 hover:bg-[#0a1627]/90"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.04] text-sky-200">
                          <Icon size={17} />
                        </span>
                        <span className="min-w-0 flex-1 text-[12px] font-black text-slate-200 transition group-hover:text-white">{item.title}</span>
                        <ArrowRight size={14} className="text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-sky-300" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-[22px] border border-white/[0.09] bg-[#07101f]/72 p-5 backdrop-blur-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{tr ? "Hızlı erişim" : "Quick access"}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/[0.08] text-sky-200">
                      {active === "dashboard" ? <LayoutDashboard size={20} /> : active === "performance" ? <Gauge size={20} /> : <Bot size={20} />}
                    </span>
                    <div>
                      <p className="text-sm font-black text-white">{data.title}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{tr ? "Tek tıkla bölüme geç." : "Open the section in one click."}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
