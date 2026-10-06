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
  dashboard: "/images/sernem-hero-refinery.png",
  tools: "https://at.adobe.com/touoPJZ52AupLPrw",
  performance: "/images/sernem-hero-refinery.png",
  labs: "https://at.adobe.com/c9sal33M1qrLUMii",
  resources: "https://at.adobe.com/nlBwRu9DivTM1vUz",
  ai: "https://at.adobe.com/04ZxQ3I2rx80St46",
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
      photoTint: string;
    }
  > = {
    blue: {
      shell: "border-blue-400/25 shadow-[0_20px_55px_rgba(2,8,23,.32)]",
      activeShell: "border-blue-300/55 shadow-[0_22px_65px_rgba(37,99,235,.16)]",
      icon: "border-blue-300/28 bg-blue-500/[0.12] text-blue-100 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_30px_rgba(37,99,235,.16)]",
      activeIcon: "border-blue-200/50 bg-blue-400/[0.20] text-white",
      line: "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.75)]",
      itemActive: "border-blue-300/35 bg-blue-500/[0.14] text-white",
      photoTint: "from-blue-500/[0.20] via-blue-500/[0.06] to-transparent",
    },
    violet: {
      shell: "border-violet-400/25 shadow-[0_20px_55px_rgba(2,8,23,.32)]",
      activeShell: "border-violet-300/55 shadow-[0_22px_65px_rgba(139,92,246,.16)]",
      icon: "border-violet-300/30 bg-violet-500/[0.13] text-violet-100 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_30px_rgba(139,92,246,.16)]",
      activeIcon: "border-violet-200/50 bg-violet-400/[0.20] text-white",
      line: "bg-violet-300 shadow-[0_0_18px_rgba(196,181,253,.72)]",
      itemActive: "border-violet-300/35 bg-violet-500/[0.14] text-white",
      photoTint: "from-violet-500/[0.22] via-violet-500/[0.06] to-transparent",
    },
    emerald: {
      shell: "border-emerald-400/25 shadow-[0_20px_55px_rgba(2,8,23,.32)]",
      activeShell: "border-emerald-300/50 shadow-[0_22px_65px_rgba(16,185,129,.14)]",
      icon: "border-emerald-300/30 bg-emerald-500/[0.12] text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_30px_rgba(16,185,129,.15)]",
      activeIcon: "border-emerald-200/50 bg-emerald-400/[0.18] text-white",
      line: "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,.72)]",
      itemActive: "border-emerald-300/35 bg-emerald-500/[0.13] text-white",
      photoTint: "from-emerald-500/[0.18] via-emerald-500/[0.05] to-transparent",
    },
  };

  const HereBadge = () => (
    <span className="rounded-full border border-white/15 bg-white/[0.08] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md">
      {tr ? "BURADASIN" : "YOU'RE HERE"}
    </span>
  );

  const PhotoLayer = ({
    src,
    position = "center",
    tint = "from-cyan-500/[0.16] via-cyan-500/[0.04] to-transparent",
  }: {
    src: string;
    position?: string;
    tint?: string;
  }) => (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={src}
          alt=""
          loading="eager"
          className="h-full w-full scale-[1.02] object-cover opacity-[0.72] saturate-[0.92]"
          style={{ objectPosition: position }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/78 to-[#020817]/20" />
        <div className={`absolute inset-0 bg-gradient-to-r ${tint}`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.055),transparent_18%,transparent_76%,rgba(2,8,23,.42))]" />
      </div>
    </>
  );

  const Accordion = ({
    id,
    title,
    icon: Icon,
    items,
    accent,
    photo,
    position,
  }: {
    id: Exclude<Section, null>;
    title: string;
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
      <div className={`relative overflow-hidden rounded-[22px] border bg-[#06101e] transition duration-300 ${active ? styles.activeShell : styles.shell}`}>
        <PhotoLayer src={photo} position={position} tint={styles.photoTint} />
        <span className={`absolute bottom-3 left-0 top-3 z-10 w-[3px] rounded-r-full ${styles.line} ${active ? "opacity-100" : "opacity-70"}`} />

        <button
          type="button"
          onClick={() => setOpenSection(open ? null : id)}
          className="relative z-10 flex min-h-[82px] w-full items-center gap-3.5 px-4 pl-5 text-left"
          aria-expanded={open}
        >
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] border backdrop-blur-md transition ${active ? styles.activeIcon : styles.icon}`}>
            <Icon size={20} strokeWidth={1.9} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[16px] font-black tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.65)]">{title}</span>
            {active && <span className="mt-1.5 inline-flex"><HereBadge /></span>}
          </span>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-slate-950/45 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-md">
            <ChevronDown size={17} className={`transition duration-300 ${open ? "rotate-180" : ""}`} />
          </span>
        </button>

        {open && (
          <div className="relative z-10 grid grid-cols-2 gap-2 border-t border-white/[0.08] bg-[#020817]/85 p-2.5 backdrop-blur-xl">
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
    icon: Icon,
    photo,
    active,
    tone,
    position,
  }: {
    href: string;
    title: string;
    icon: typeof LayoutDashboard;
    photo: string;
    active: boolean;
    tone: "cyan" | "sky" | "fuchsia";
    position?: string;
  }) => {
    const style =
      tone === "fuchsia"
        ? {
            border: active ? "border-fuchsia-300/50" : "border-fuchsia-400/25",
            shadow: "shadow-[0_20px_60px_rgba(126,34,206,.14)]",
            line: "bg-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,.72)]",
            icon: "border-fuchsia-300/30 bg-fuchsia-500/[0.14] text-fuchsia-100",
            tint: "from-fuchsia-500/[0.22] via-violet-500/[0.06] to-transparent",
          }
        : tone === "sky"
          ? {
              border: active ? "border-sky-300/55" : "border-sky-400/25",
              shadow: "shadow-[0_20px_60px_rgba(14,165,233,.13)]",
              line: "bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,.72)]",
              icon: "border-sky-300/30 bg-sky-500/[0.13] text-sky-100",
              tint: "from-sky-500/[0.20] via-cyan-500/[0.05] to-transparent",
            }
          : {
              border: active ? "border-cyan-300/55" : "border-cyan-400/25",
              shadow: "shadow-[0_20px_60px_rgba(34,211,238,.12)]",
              line: "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.72)]",
              icon: "border-cyan-300/30 bg-cyan-500/[0.12] text-cyan-100",
              tint: "from-cyan-500/[0.20] via-cyan-500/[0.05] to-transparent",
            };

    return (
      <Link
        href={href}
        onClick={onClose}
        className={`relative flex min-h-[82px] items-center gap-3.5 overflow-hidden rounded-[22px] border bg-[#06101e] px-4 pl-5 transition duration-300 ${style.border} ${style.shadow}`}
      >
        <PhotoLayer src={photo} position={position} tint={style.tint} />
        <span className={`absolute bottom-3 left-0 top-3 z-10 w-[3px] rounded-r-full ${style.line} ${active ? "opacity-100" : "opacity-70"}`} />

        <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] border backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_28px_rgba(0,0,0,.22)] ${style.icon}`}>
          <Icon size={20} />
        </span>

        <span className="relative z-10 min-w-0 flex-1">
          <span className="block text-[16px] font-black tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.65)]">{title}</span>
          {active && <span className="mt-1.5 inline-flex"><HereBadge /></span>}
        </span>

        <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-slate-950/45 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-md">
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
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[315px] overflow-hidden">
        <img
          src="/images/sernem-hero-refinery.png"
          alt=""
          className="h-full w-full object-cover object-center opacity-50 saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/40 via-[#020817]/72 to-[#020817]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-transparent to-[#020817]/25" />
      </div>

      <div className="relative mx-auto w-full max-w-lg px-4 pb-10 pt-[82px]">
        <div className="mb-5 flex items-start justify-between gap-4 px-1">
          <div className="pt-2">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-sky-300">SERNEM</p>
            <h2 className="mt-2 text-[31px] font-black leading-none tracking-[-0.045em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,.45)]">
              {tr ? "Ana Menü" : "Main Menu"}
            </h2>
            <p className="mt-2 text-[12px] font-medium leading-5 text-slate-400">
              {tr ? "Platforma yapılandırılmış erişim." : "Structured access to the platform."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={tr ? "Menüyü kapat" : "Close menu"}
            className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/15 bg-slate-950/40 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_16px_38px_rgba(0,0,0,.32)] backdrop-blur-xl transition active:scale-[0.98] active:bg-white/[0.08]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2.5">
          {authenticated && (
            <DirectCard
              href="/dashboard"
              title="Dashboard"
              icon={LayoutDashboard}
              photo={PHOTO.dashboard}
              active={dashboardActive}
              tone="cyan"
              position="center 58%"
            />
          )}

          <Accordion
            id="tools"
            title={tr ? "HSE Araçları" : "HSE Tools"}
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
            icon={Sparkles}
            items={labItems}
            accent="violet"
            photo={PHOTO.labs}
            position="center 48%"
          />

          <Accordion
            id="resources"
            title={tr ? "Kaynaklar" : "Resources"}
            icon={Grid3X3}
            items={resourceItems}
            accent="emerald"
            photo={PHOTO.resources}
            position="center 52%"
          />

          <DirectCard
            href="/ai-assistant"
            title={tr ? "AI Asistan" : "AI Assistant"}
            icon={Bot}
            photo={PHOTO.ai}
            active={aiActive}
            tone="fuchsia"
            position="center 52%"
          />
        </div>
      </div>
    </div>
  );
}
