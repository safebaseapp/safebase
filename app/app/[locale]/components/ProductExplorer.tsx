"use client";

import { useState } from "react";
import { Link } from "../../../i18n/navigation";
import {
  Activity,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Grid3X3,
  LayoutDashboard,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Images,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Props = {
  locale: "tr" | "en";
  onClose: () => void;
};

type ProductId =
  | "risk"
  | "method"
  | "simops"
  | "ai"
  | "dashboard"
  | "inspection"
  | "toolbox"
  | "posters";

type Product = {
  id: ProductId;
  number: string;
  titleTr: string;
  titleEn: string;
  subtitleTr: string;
  subtitleEn: string;
  eyebrowTr: string;
  eyebrowEn: string;
  descriptionTr: string;
  descriptionEn: string;
  href: string;
  icon: typeof ShieldCheck;
  status: "LIVE" | "BETA";
  accent: "blue" | "violet" | "emerald" | "cyan";
  stats: {
    value: string;
    labelTr: string;
    labelEn: string;
    detailTr: string;
    detailEn: string;
  }[];
};

const products: Product[] = [
  {
    id: "risk",
    number: "01",
    titleTr: "Risk Analizi",
    titleEn: "Risk Assessment",
    subtitleTr: "HIRARC · Risk Yönetimi",
    subtitleEn: "HIRARC · Risk Management",
    eyebrowTr: "RİSK YÖNETİMİ",
    eyebrowEn: "RISK MANAGEMENT",
    descriptionTr:
      "100 faaliyet ve 900 hazır risk ile profesyonel HIRARC değerlendirmeleri oluşturun.",
    descriptionEn:
      "Build professional HIRARC assessments using 100 activities and 900 ready risks.",
    href: "/tools/quick-risk-assessment",
    icon: ShieldCheck,
    status: "LIVE",
    accent: "blue",
    stats: [
      {
        value: "100",
        labelTr: "Faaliyet",
        labelEn: "Activities",
        detailTr: "Hazır faaliyet kütüphanesi",
        detailEn: "Ready activity library",
      },
      {
        value: "900",
        labelTr: "Hazır Risk",
        labelEn: "Ready Risks",
        detailTr: "Yapılandırılmış risk içeriği",
        detailEn: "Structured risk content",
      },
      {
        value: "HIRARC",
        labelTr: "Metodoloji",
        labelEn: "Methodology",
        detailTr: "Risk değerlendirme sistemi",
        detailEn: "Risk assessment system",
      },
      {
        value: "PDF",
        labelTr: "Çıktı",
        labelEn: "Export",
        detailTr: "Profesyonel raporlama",
        detailEn: "Professional reporting",
      },
    ],
  },
  {
    id: "method",
    number: "02",
    titleTr: "Method Statement",
    titleEn: "Method Statement",
    subtitleTr: "Çalışma Yöntemi · PDF",
    subtitleEn: "Work Method · PDF",
    eyebrowTr: "DOKÜMANTASYON",
    eyebrowEn: "DOCUMENTATION",
    descriptionTr:
      "Hazır çalışma yöntemlerini proje bilgilerinizle özelleştirin ve profesyonel Method Statement çıktısı oluşturun.",
    descriptionEn:
      "Customize ready work methods with project information and create professional Method Statement outputs.",
    href: "/tools/method-statement",
    icon: FileText,
    status: "LIVE",
    accent: "violet",
    stats: [
      {
        value: "20",
        labelTr: "Hazır Method",
        labelEn: "Ready Methods",
        detailTr: "Çalışma yöntemi kütüphanesi",
        detailEn: "Work method library",
      },
      {
        value: "PDF",
        labelTr: "Profesyonel Çıktı",
        labelEn: "Professional Export",
        detailTr: "Sahaya hazır doküman",
        detailEn: "Field-ready document",
      },
      {
        value: "REV",
        labelTr: "Revizyon",
        labelEn: "Revision",
        detailTr: "Doküman kontrol yapısı",
        detailEn: "Document control structure",
      },
      {
        value: "HSE",
        labelTr: "Kontroller",
        labelEn: "Controls",
        detailTr: "İş güvenliği adımları",
        detailEn: "Safety work controls",
      },
    ],
  },
  {
    id: "simops",
    number: "03",
    titleTr: "SIMOPS Planner",
    titleEn: "SIMOPS Planner",
    subtitleTr: "Operasyon · Çakışma Kontrolü",
    subtitleEn: "Operations · Conflict Control",
    eyebrowTr: "OPERASYON PLANLAMA",
    eyebrowEn: "OPERATION PLANNING",
    descriptionTr:
      "Eş zamanlı operasyonları görün, çalışma çakışmalarını değerlendirin ve kritik faaliyetleri tek ekranda yönetin.",
    descriptionEn:
      "Visualize simultaneous operations, assess conflicts and manage critical activities from one screen.",
    href: "/tools",
    icon: Layers3,
    status: "LIVE",
    accent: "violet",
    stats: [
      {
        value: "SIMOPS",
        labelTr: "Planlama",
        labelEn: "Planning",
        detailTr: "Eş zamanlı işler",
        detailEn: "Simultaneous operations",
      },
      {
        value: "LIVE",
        labelTr: "Çakışmalar",
        labelEn: "Conflicts",
        detailTr: "Operasyon görünümü",
        detailEn: "Operation overview",
      },
      {
        value: "HSE",
        labelTr: "Kontroller",
        labelEn: "Controls",
        detailTr: "Kritik tedbirler",
        detailEn: "Critical measures",
      },
      {
        value: "GRID",
        labelTr: "Görünüm",
        labelEn: "View",
        detailTr: "Operasyon matrisi",
        detailEn: "Operation matrix",
      },
    ],
  },
  {
    id: "ai",
    number: "04",
    titleTr: "SERNEM AI",
    titleEn: "SERNEM AI",
    subtitleTr: "HSE Rehberliği · Kaynaklı",
    subtitleEn: "HSE Guidance · Source-backed",
    eyebrowTr: "HSE REHBERLİĞİ",
    eyebrowEn: "HSE GUIDANCE",
    descriptionTr:
      "Saha sorularını analiz edin; risk özeti, kritik kontroller, KKD, izinler ve ilgili HSE kaynaklarını tek cevapta görün.",
    descriptionEn:
      "Analyze field questions and receive risk summaries, controls, PPE, permits and relevant HSE sources.",
    href: "/ai-assistant",
    icon: Bot,
    status: "BETA",
    accent: "emerald",
    stats: [
      {
        value: "AI",
        labelTr: "HSE Asistan",
        labelEn: "HSE Assistant",
        detailTr: "Saha odaklı rehberlik",
        detailEn: "Field-focused guidance",
      },
      {
        value: "SRC",
        labelTr: "Kaynaklı",
        labelEn: "Sources",
        detailTr: "İlgili kaynak gösterimi",
        detailEn: "Relevant source display",
      },
      {
        value: "PPE",
        labelTr: "KKD",
        labelEn: "PPE",
        detailTr: "KKD değerlendirmesi",
        detailEn: "PPE guidance",
      },
      {
        value: "CTRL",
        labelTr: "Kontroller",
        labelEn: "Controls",
        detailTr: "Kritik saha tedbirleri",
        detailEn: "Critical field controls",
      },
    ],
  },
  {
    id: "dashboard",
    number: "05",
    titleTr: "Dashboard",
    titleEn: "Dashboard",
    subtitleTr: "Workspace · Analytics",
    subtitleEn: "Workspace · Analytics",
    eyebrowTr: "ÇALIŞMA ALANI",
    eyebrowEn: "WORKSPACE",
    descriptionTr:
      "Analizlerinizi, kayıtlarınızı, indirmelerinizi ve HSE çalışmalarınızı tek merkezden yönetin.",
    descriptionEn:
      "Manage assessments, records, downloads and HSE activity from one central workspace.",
    href: "/dashboard",
    icon: LayoutDashboard,
    status: "LIVE",
    accent: "cyan",
    stats: [
      {
        value: "360°",
        labelTr: "Workspace",
        labelEn: "Workspace",
        detailTr: "Tek çalışma alanı",
        detailEn: "One connected workspace",
      },
      {
        value: "DATA",
        labelTr: "Aktivite",
        labelEn: "Activity",
        detailTr: "Kullanıcı işlemleri",
        detailEn: "User activity",
      },
      {
        value: "HSE",
        labelTr: "Kayıtlar",
        labelEn: "Records",
        detailTr: "Çalışmalarınız",
        detailEn: "Your HSE work",
      },
      {
        value: "FAST",
        labelTr: "Erişim",
        labelEn: "Access",
        detailTr: "Hızlı navigasyon",
        detailEn: "Fast navigation",
      },
    ],
  },
  {
    id: "inspection",
    number: "06",
    titleTr: "Denetimler",
    titleEn: "Inspections",
    subtitleTr: "Saha Kontrolü · Checklist",
    subtitleEn: "Field Control · Checklists",
    eyebrowTr: "SAHA KONTROLÜ",
    eyebrowEn: "FIELD CONTROL",
    descriptionTr:
      "Yapılandırılmış kontrol listeleri ile saha denetimlerini daha hızlı ve tutarlı yürütün.",
    descriptionEn:
      "Run field inspections faster and more consistently using structured checklists.",
    href: "/checklists",
    icon: ClipboardCheck,
    status: "LIVE",
    accent: "emerald",
    stats: [
      {
        value: "FIELD",
        labelTr: "Saha",
        labelEn: "Field",
        detailTr: "Operasyon kontrolleri",
        detailEn: "Operational controls",
      },
      {
        value: "LIST",
        labelTr: "Checklist",
        labelEn: "Checklist",
        detailTr: "Yapılandırılmış kontrol",
        detailEn: "Structured inspection",
      },
      {
        value: "%",
        labelTr: "İlerleme",
        labelEn: "Progress",
        detailTr: "Tamamlama görünümü",
        detailEn: "Completion overview",
      },
      {
        value: "HSE",
        labelTr: "Uygunluk",
        labelEn: "Compliance",
        detailTr: "Saha doğrulaması",
        detailEn: "Field verification",
      },
    ],
  },
  {
    id: "toolbox",
    number: "07",
    titleTr: "Toolbox Talk",
    titleEn: "Toolbox Talk",
    subtitleTr: "Saha Konuşmaları · TR / EN",
    subtitleEn: "Field Talks · TR / EN",
    eyebrowTr: "SAHA KONUŞMALARI",
    eyebrowEn: "FIELD BRIEFINGS",
    descriptionTr:
      "Sahaya hazır, kısa ve etkili Toolbox Talk içerikleriyle günlük ekip bilgilendirmelerini daha profesyonel yürütün.",
    descriptionEn:
      "Run professional daily field briefings with ready-to-use Toolbox Talk content.",
    href: "/toolbox",
    icon: MessageSquareText,
    status: "LIVE",
    accent: "violet",
    stats: [
      {
        value: "TBM",
        labelTr: "Toolbox",
        labelEn: "Toolbox",
        detailTr: "Saha konuşmaları",
        detailEn: "Field briefings",
      },
      {
        value: "TR/EN",
        labelTr: "Çift Dil",
        labelEn: "Bilingual",
        detailTr: "Türkçe ve İngilizce",
        detailEn: "Turkish and English",
      },
      {
        value: "READY",
        labelTr: "Hazır İçerik",
        labelEn: "Ready Content",
        detailTr: "Sahaya hazır format",
        detailEn: "Field-ready format",
      },
      {
        value: "PDF",
        labelTr: "Paylaşım",
        labelEn: "Sharing",
        detailTr: "Profesyonel çıktı",
        detailEn: "Professional output",
      },
    ],
  },
  {
    id: "posters",
    number: "08",
    titleTr: "Poster & Levhalar",
    titleEn: "Posters & Signs",
    subtitleTr: "Saha Görselleri · Güvenlik",
    subtitleEn: "Field Visuals · Safety",
    eyebrowTr: "GÖRSEL GÜVENLİK",
    eyebrowEn: "VISUAL SAFETY",
    descriptionTr:
      "Profesyonel güvenlik posterleri ve saha levhalarıyla kritik HSE mesajlarını hızlı ve anlaşılır şekilde görünür hale getirin.",
    descriptionEn:
      "Make critical HSE messages visible with professional safety posters and field signs.",
    href: "/posters",
    icon: Images,
    status: "LIVE",
    accent: "emerald",
    stats: [
      {
        value: "POSTER",
        labelTr: "Görseller",
        labelEn: "Visuals",
        detailTr: "Profesyonel HSE posterleri",
        detailEn: "Professional HSE posters",
      },
      {
        value: "SIGN",
        labelTr: "Levhalar",
        labelEn: "Signs",
        detailTr: "Saha güvenlik levhaları",
        detailEn: "Field safety signs",
      },
      {
        value: "PRINT",
        labelTr: "Yazdırılabilir",
        labelEn: "Printable",
        detailTr: "Sahaya hazır çıktı",
        detailEn: "Field-ready output",
      },
      {
        value: "HSE",
        labelTr: "Farkındalık",
        labelEn: "Awareness",
        detailTr: "Görsel güvenlik iletişimi",
        detailEn: "Visual safety communication",
      },
    ],
  },

];

const accentMap = {
  blue: {
    active:
      "border-blue-400/60 bg-blue-500/[0.12] shadow-[0_0_0_1px_rgba(59,130,246,.22),0_12px_35px_rgba(37,99,235,.18)]",
    icon: "border-blue-400/25 bg-blue-500/10 text-blue-300",
    glow: "bg-blue-500/20",
    text: "text-blue-300",
    dot: "bg-blue-400",
  },
  violet: {
    active:
      "border-violet-400/50 bg-violet-500/[0.10] shadow-[0_0_0_1px_rgba(139,92,246,.18),0_12px_35px_rgba(109,40,217,.15)]",
    icon: "border-violet-400/25 bg-violet-500/10 text-violet-300",
    glow: "bg-violet-500/20",
    text: "text-violet-300",
    dot: "bg-violet-400",
  },
  emerald: {
    active:
      "border-emerald-400/45 bg-emerald-500/[0.08] shadow-[0_0_0_1px_rgba(52,211,153,.14),0_12px_35px_rgba(5,150,105,.12)]",
    icon: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
    glow: "bg-emerald-500/20",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  cyan: {
    active:
      "border-cyan-400/45 bg-cyan-500/[0.08] shadow-[0_0_0_1px_rgba(34,211,238,.14),0_12px_35px_rgba(8,145,178,.12)]",
    icon: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",
    glow: "bg-cyan-500/20",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
  },
};

export default function ProductExplorer({ locale, onClose }: Props) {
  const isTurkish = locale === "tr";
  const [activeId, setActiveId] = useState<ProductId>("risk");

  const active =
    products.find((product) => product.id === activeId) ?? products[0];

  const styles = accentMap[active.accent];

  return (
    <div
      id="sernem-navigation"
      className="fixed inset-0 z-[9999] overflow-y-auto bg-[#020817]/[0.985] shadow-[0_45px_140px_rgba(0,0,0,.72)] backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[-240px] h-[520px] w-[520px] rounded-full bg-blue-600/[0.11] blur-[150px]" />
        <div className="absolute right-[-100px] top-[30%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.06] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1480px] px-5 pb-6 pt-24 sm:px-7 lg:px-8 lg:pb-8 lg:pt-24">
        <button
          type="button"
          onClick={onClose}
          aria-label={isTurkish ? "Keşfet menüsünü kapat" : "Close explorer"}
          className="absolute right-8 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-500 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* LEFT RAIL */}
          <aside className="flex min-h-0 min-w-0 flex-col">
            <div className="pr-12">
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-400">
                <Sparkles size={14} />
                SERNEM PRODUCT SUITE
              </div>

              <h2 className="mt-3 text-[36px] font-black leading-[0.98] tracking-[-0.045em] text-white">
                <span className="block">
                  08 {isTurkish ? "bağlantılı" : "connected"}
                </span>
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  {isTurkish ? "HSE modülü" : "HSE modules"}
                </span>
              </h2>

              <p className="mt-4 max-w-sm text-sm font-medium leading-6 text-slate-300">
                {isTurkish
                  ? "Risk yönetiminden saha denetimine kadar tüm HSE iş akışınızı tek platformda yönetin."
                  : "Manage your connected HSE workflow from risk management to field inspections."}
              </p>
            </div>

            <div className="mt-5 overflow-hidden rounded-[22px] border border-white/[0.08] bg-slate-950/40">
              {products.map((product) => {
                const Icon = product.icon;
                const isActive = product.id === activeId;
                const productStyles = accentMap[product.accent];

                return (
                  <button
                    key={product.id}
                    type="button"
                    onMouseEnter={() => setActiveId(product.id)}
                    onFocus={() => setActiveId(product.id)}
                    onClick={() => setActiveId(product.id)}
                    className={`group relative flex w-full items-center gap-3 border-b border-white/[0.065] px-4 py-3 text-left transition-all duration-300 last:border-b-0 ${
                      isActive
                        ? productStyles.active
                        : "border-transparent bg-transparent hover:bg-white/[0.035]"
                    }`}
                  >
                    {isActive && (
                      <div
                        className={`absolute bottom-2 left-0 top-2 w-[2px] rounded-full ${productStyles.dot}`}
                      />
                    )}

                    <span
                      className={`w-7 shrink-0 text-xs font-black ${
                        isActive ? productStyles.text : "text-slate-500"
                      }`}
                    >
                      {product.number}
                    </span>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${productStyles.icon}`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-sm font-black ${
                          isActive ? "text-white" : "text-slate-200"
                        }`}
                      >
                        {isTurkish ? product.titleTr : product.titleEn}
                      </span>

                      <span className="mt-1 block truncate text-[11px] font-medium text-slate-400">
                        {isTurkish ? product.subtitleTr : product.subtitleEn}
                      </span>
                    </span>

                    <span
                      className={`rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] ${
                        product.status === "BETA"
                          ? "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300"
                          : "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                      }`}
                    >
                      {product.status}
                    </span>

                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        isActive ? productStyles.dot : "bg-slate-700"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-4 py-3 text-[11px] font-medium text-slate-400">
              <Sparkles size={14} className="shrink-0 text-amber-300" />
              {isTurkish
                ? "Tüm modüller SERNEM çalışma alanınızla bağlantılıdır."
                : "All modules connect to your SERNEM workspace."}
            </div>
          </aside>

          {/* RIGHT PRODUCT AREA */}
          <section className="min-w-0">
            {/* KPI STRIP */}
            <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
              {active.stats.map((stat, index) => {
                const icons = [
                  <Activity key="activity" size={22} />,
                  <ShieldCheck key="shield" size={22} />,
                  <Grid3X3 key="grid" size={22} />,
                  <FileText key="file" size={22} />,
                ];

                return (
                  <div
                    key={`${active.id}-${stat.labelEn}`}
                    className="flex min-h-[92px] items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.028] px-4 py-3 transition hover:border-white/[0.14] hover:bg-white/[0.04]"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${styles.icon}`}
                    >
                      {icons[index]}
                    </span>

                    <div className="min-w-0">
                      <div className="text-xl font-black tracking-[-0.03em] text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs font-bold text-slate-300">
                        {isTurkish ? stat.labelTr : stat.labelEn}
                      </div>
                      <div className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                        {isTurkish ? stat.detailTr : stat.detailEn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MAIN SHOWCASE */}
            <div className="relative mt-3 overflow-hidden rounded-[25px] border border-blue-400/35 bg-gradient-to-br from-blue-600/[0.11] via-slate-950 to-slate-950 shadow-[0_0_0_1px_rgba(59,130,246,.10),0_0_50px_rgba(37,99,235,.12)]">
              <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/80 to-transparent" />
              <div
                className={`pointer-events-none absolute right-[-100px] top-[-160px] h-[420px] w-[420px] rounded-full blur-[130px] ${styles.glow}`}
              />

              <div className="relative grid min-h-[500px] lg:grid-cols-[0.72fr_1.28fr]">
                {/* PRODUCT COPY */}
                <div className="flex flex-col justify-between border-b border-white/[0.08] p-7 lg:border-b-0 lg:border-r lg:p-8">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.17em] ${styles.text}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                      />
                      {isTurkish ? active.eyebrowTr : active.eyebrowEn}
                    </div>

                    <h3 className="mt-5 text-3xl font-black tracking-[-0.045em] text-white xl:text-[38px]">
                      {isTurkish ? active.titleTr : active.titleEn}
                    </h3>

                    <p className="mt-4 max-w-sm text-sm font-medium leading-7 text-slate-300">
                      {isTurkish
                        ? active.descriptionTr
                        : active.descriptionEn}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      {getFeatures(active.id, isTurkish).map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2.5 text-xs text-slate-300"
                        >
                          <CheckCircle2
                            size={14}
                            className="shrink-0 text-blue-400"
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={active.href}
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
                      >
                        {isTurkish ? "Ürünü Aç" : "Open Product"}
                        <span>→</span>
                      </Link>

                      <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/[0.06] text-blue-300">
                          ▶
                        </span>
                        {isTurkish ? "Nasıl çalışır?" : "How it works"}
                      </span>
                    </div>

                    <p className="mt-4 text-[11px] font-semibold text-blue-300">
                      {isTurkish
                        ? `${active.titleTr} modülünü keşfedin.`
                        : `Explore the ${active.titleEn} module.`}
                    </p>
                  </div>
                </div>

                {/* PREVIEW */}
                <div className="flex items-center justify-center p-5 lg:p-7">
                  <div
                    key={active.id}
                    className="w-full animate-[sernemPreview_.28s_ease-out]"
                  >
                    {active.id === "risk" && <RiskPreview tr={isTurkish} />}
                    {active.id === "method" && <MethodPreview tr={isTurkish} />}
                    {active.id === "simops" && <SimopsPreview tr={isTurkish} />}
                    {active.id === "ai" && <AiPreview tr={isTurkish} />}
                    {active.id === "dashboard" && <DashboardPreview tr={isTurkish} />}
                    {active.id === "inspection" && <InspectionPreview tr={isTurkish} />}
                    {active.id === "toolbox" && <ToolboxPreview tr={isTurkish} />}
                    {active.id === "posters" && <PostersPreview tr={isTurkish} />}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* TRUST / PLATFORM STRIP */}
        <div className="mt-4 grid gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2 sm:grid-cols-2 xl:grid-cols-4">
          <TrustItem
            icon={<LockKeyhole size={19} />}
            title={isTurkish ? "Güvenli Çalışma Alanı" : "Secure Workspace"}
            text={isTurkish ? "Kullanıcı odaklı erişim" : "User-focused access"}
          />
          <TrustItem
            icon={<LayoutDashboard size={19} />}
            title={isTurkish ? "Bağlantılı Modüller" : "Connected Modules"}
            text={isTurkish ? "Tek platform deneyimi" : "One platform experience"}
          />
          <TrustItem
            icon={<ShieldCheck size={19} />}
            title={isTurkish ? "HSE Odaklı" : "HSE Focused"}
            text={isTurkish ? "Saha ihtiyaçları için" : "Built for field needs"}
          />
          <TrustItem
            icon={<BarChart3 size={19} />}
            title={isTurkish ? "Sürekli Gelişen" : "Continuously Growing"}
            text={isTurkish ? "Yeni araç ve içerikler" : "New tools and resources"}
          />
        </div>

        <style jsx>{`
          @keyframes sernemPreview {
            from {
              opacity: 0;
              transform: translateY(8px) scale(0.992);
              filter: blur(3px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

function getFeatures(id: ProductId, tr: boolean) {
  const features: Record<ProductId, string[]> = {
    risk: tr
      ? [
          "Tehlike tanımlama",
          "Risk değerlendirme",
          "Kontroller ve önlemler",
          "Risk seviyelendirme",
          "PDF raporlama",
        ]
      : [
          "Hazard identification",
          "Risk evaluation",
          "Controls and measures",
          "Risk scoring",
          "PDF reporting",
        ],
    method: tr
      ? [
          "Hazır çalışma yöntemleri",
          "Proje bilgisi özelleştirme",
          "HSE kontrol adımları",
          "Revizyon yapısı",
          "PDF çıktısı",
        ]
      : [
          "Ready work methods",
          "Project customization",
          "HSE control steps",
          "Revision structure",
          "PDF export",
        ],
    simops: tr
      ? [
          "Eş zamanlı işler",
          "Operasyon çakışmaları",
          "Kritik risk görünümü",
          "Kontrol planlaması",
          "Saha koordinasyonu",
        ]
      : [
          "Simultaneous activities",
          "Operation conflicts",
          "Critical risk overview",
          "Control planning",
          "Field coordination",
        ],
    ai: tr
      ? [
          "Risk özeti",
          "Kritik kontroller",
          "KKD ve izinler",
          "İlgili kaynaklar",
          "HSE odaklı analiz",
        ]
      : [
          "Risk summary",
          "Critical controls",
          "PPE and permits",
          "Relevant sources",
          "HSE-focused analysis",
        ],
    dashboard: tr
      ? [
          "Tek çalışma alanı",
          "Kullanıcı aktiviteleri",
          "Kayıtlı çalışmalar",
          "Hızlı erişim",
          "Kişisel HSE alanı",
        ]
      : [
          "One workspace",
          "User activity",
          "Saved work",
          "Quick access",
          "Personal HSE area",
        ],
    inspection: tr
      ? [
          "Hazır kontrol listeleri",
          "Saha doğrulaması",
          "İlerleme takibi",
          "Uygunluk kontrolü",
          "Yapılandırılmış denetim",
        ]
      : [
          "Ready checklists",
          "Field verification",
          "Progress tracking",
          "Compliance checks",
          "Structured inspections",
        ],
    toolbox: tr
      ? [
          "Sahaya hazır konuşmalar",
          "TR / EN içerik",
          "Konu bazlı yapı",
          "Ekip bilgilendirmesi",
          "Profesyonel çıktı",
        ]
      : [
          "Field-ready talks",
          "TR / EN content",
          "Topic-based structure",
          "Team briefings",
          "Professional output",
        ],
    posters: tr
      ? [
          "Profesyonel HSE posterleri",
          "Güvenlik levhaları",
          "Yazdırılabilir tasarım",
          "Saha farkındalığı",
          "Görsel güvenlik iletişimi",
        ]
      : [
          "Professional HSE posters",
          "Safety signs",
          "Printable design",
          "Field awareness",
          "Visual safety communication",
        ],
  };

  return features[id];
}

function PreviewShell({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[650px] overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#091225]/95 shadow-[0_30px_70px_rgba(0,0,0,.40)]">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.08] text-blue-300">
            {icon}
          </span>

          <div>
            <div className="text-sm font-black text-white">{title}</div>
            <div className="mt-0.5 text-[10px] text-slate-500">
              {subtitle}
            </div>
          </div>
        </div>

        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[8px] font-black tracking-[0.12em] text-emerald-300">
          LIVE
        </span>
      </div>

      <div className="p-5">{children}</div>
    </div>
  );
}

function RiskPreview({ tr }: { tr: boolean }) {
  return (
    <PreviewShell
      title={tr ? "Risk Değerlendirmesi" : "Risk Assessment"}
      subtitle={tr ? "Proje / Yüksekte Çalışma" : "Project / Working at Height"}
      icon={<ShieldCheck size={18} />}
    >
      <div className="grid gap-3">
        <div className="grid gap-2 sm:grid-cols-[1fr_145px]">
          <DataBox label={tr ? "Faaliyet" : "Activity"} value={tr ? "Yüksekte Çalışma" : "Working at Height"} />
          <DataBox label={tr ? "Risk Seviyesi" : "Risk Level"} value={tr ? "YÜKSEK" : "HIGH"} danger />
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_145px]">
          <DataBox label={tr ? "Tehlike" : "Hazard"} value={tr ? "Yüksekten Düşme" : "Fall from Height"} />
          <DataBox label={tr ? "Risk Puanı" : "Risk Score"} value="16 · 4 × 4" />
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_1.25fr_.72fr]">
          <RiskMatrix tr={tr} />

          <div className="rounded-xl border border-white/[0.07] bg-slate-950/55 p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-white">
              {tr ? "Kritik Kontroller" : "Critical Controls"}
            </div>

            <div className="mt-3 space-y-2 text-[11px] text-slate-400">
              {[
                tr ? "Onaylı erişim sistemi" : "Approved access system",
                tr ? "Tam vücut emniyet kemeri" : "Full body harness",
                tr ? "Ankraj noktası doğrulaması" : "Anchor point verification",
                tr ? "Çalışma öncesi kontrol" : "Pre-work inspection",
                tr ? "Hava koşullarının takibi" : "Weather monitoring",
              ].map((item) => (
                <div key={item} className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-slate-950/55 p-4">
            <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
              {tr ? "Kalan Risk" : "Residual Risk"}
            </div>
            <div className="mt-4 text-xs text-slate-500">{tr ? "Olasılık" : "Likelihood"}</div>
            <div className="text-lg font-black text-emerald-400">2</div>
            <div className="mt-3 text-xs text-slate-500">{tr ? "Şiddet" : "Severity"}</div>
            <div className="text-lg font-black text-red-400">3</div>
            <div className="mt-3 text-xs text-slate-500">{tr ? "Kalan Risk" : "Residual"}</div>
            <div className="text-lg font-black text-amber-400">6</div>
            <div className="text-[10px] font-black text-amber-400">{tr ? "ORTA" : "MEDIUM"}</div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function RiskMatrix({ tr }: { tr: boolean }) {
  const cells = [
    "bg-emerald-500/70",
    "bg-emerald-500/70",
    "bg-amber-400/70",
    "bg-amber-400/80",
    "bg-red-500/80",
    "bg-emerald-500/70",
    "bg-amber-400/70",
    "bg-amber-400/80",
    "bg-red-500/75",
    "bg-red-500/85",
    "bg-amber-400/70",
    "bg-amber-400/80",
    "bg-red-500/75",
    "bg-red-500/85",
    "bg-red-600/90",
    "bg-amber-400/70",
    "bg-red-500/75",
    "bg-red-500/80",
    "bg-red-600/90",
    "bg-red-600",
    "bg-red-500/75",
    "bg-red-500/80",
    "bg-red-600/90",
    "bg-red-600",
    "bg-red-700",
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-slate-950/55 p-4">
      <div className="text-[10px] font-black text-white">{tr ? "Risk Matrisi" : "Risk Matrix"}</div>
      <div className="mt-3 grid grid-cols-5 gap-[2px]">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`aspect-square rounded-[2px] ${cell} ${
              index === 13 ? "ring-2 ring-white" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MethodPreview({ tr }: { tr: boolean }) {
  return (
    <PreviewShell
      title="Method Statement"
      subtitle={tr ? "Profesyonel HSE Dokümanı" : "Professional HSE Document"}
      icon={<FileText size={18} />}
    >
      <div className="rounded-xl bg-slate-100 p-5 text-slate-950">
        <div className="flex justify-between">
          <div>
            <div className="text-[10px] font-black text-emerald-600">SERNEM</div>
            <div className="mt-1 text-xl font-black">METHOD STATEMENT</div>
          </div>
          <div className="text-right text-[9px] font-bold text-slate-500">
            SRN-MS-001
            <br />
            REV 1.0
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          {(tr
            ? [
                "Proje Bilgileri",
                "İşin Kapsamı",
                "Sorumluluklar",
                "Çalışma Sırası",
                "HSE Kontrolleri",
              ]
            : [
                "Project Information",
                "Scope of Work",
                "Responsibilities",
                "Work Sequence",
                "HSE Controls",
              ]
          ).map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
            >
              <span className="text-[10px] font-black text-slate-400">
                0{index + 1}
              </span>
              <span className="text-xs font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}

function SimopsPreview({ tr }: { tr: boolean }) {
  return (
    <PreviewShell
      title="SIMOPS Planner"
      subtitle={tr ? "Eş Zamanlı Operasyonlar" : "Simultaneous Operations"}
      icon={<Layers3 size={18} />}
    >
      <div className="grid gap-3">
        {(tr
          ? [
              ["Sıcak Çalışma", "Alan A", "YÜKSEK"],
              ["Kaldırma Operasyonu", "Alan A", "ORTA"],
              ["İskele Çalışması", "Alan B", "DÜŞÜK"],
              ["Kapalı Alan", "Alan C", "YÜKSEK"],
            ]
          : [
              ["Hot Work", "Area A", "HIGH"],
              ["Lifting Operation", "Area A", "MEDIUM"],
              ["Scaffolding", "Area B", "LOW"],
              ["Confined Space", "Area C", "HIGH"],
            ]
        ).map(([activity, area, level]) => (
          <div
            key={activity}
            className="grid grid-cols-[1fr_90px_80px] items-center gap-3 rounded-xl border border-white/[0.07] bg-slate-950/55 px-4 py-3"
          >
            <div className="text-xs font-black text-white">{activity}</div>
            <div className="text-[10px] text-slate-500">{area}</div>
            <div
              className={`text-right text-[9px] font-black ${
                level === "HIGH" || level === "YÜKSEK"
                  ? "text-red-400"
                  : level === "MEDIUM" || level === "ORTA"
                    ? "text-amber-400"
                    : "text-emerald-400"
              }`}
            >
              {level}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 rounded-xl border border-violet-400/15 bg-violet-500/[0.06] p-4">
          <Activity size={18} className="text-violet-300" />
          <div>
            <div className="text-xs font-black text-violet-200">
              {tr ? "2 Operasyon Çakışması" : "2 Operation Conflicts"}
            </div>
            <div className="mt-1 text-[10px] text-slate-500">
              {tr
                ? "Eş zamanlı çalışma kontrollerinin gözden geçirilmesi gerekiyor."
                : "Simultaneous work controls require review."}
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function AiPreview({ tr }: { tr: boolean }) {
  return (
    <PreviewShell
      title="SERNEM AI"
      subtitle={tr ? "HSE Bilgi Asistanı" : "HSE Knowledge Assistant"}
      icon={<Bot size={18} />}
    >
      <div className="rounded-xl border border-white/[0.07] bg-slate-950/70 px-4 py-4 text-sm font-bold text-white">
        {tr
          ? "Kapalı alana giriş öncesinde hangi kontroller yapılmalıdır?"
          : "What controls are required before confined space entry?"}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {(tr
          ? ["Risk Özeti", "Kritik Kontroller", "KKD ve İzinler", "İlgili Kaynaklar"]
          : ["Risk Summary", "Critical Controls", "PPE & Permits", "Related Sources"]
        ).map((item) => (
          <div
            key={item}
            className="rounded-xl border border-emerald-400/15 bg-emerald-500/[0.05] px-4 py-3 text-xs font-bold text-slate-200"
          >
            <span className="mr-2 text-emerald-400">✓</span>
            {item}
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-[10px] text-slate-500">
        <span>{tr ? "SERNEM bilgi tabanı" : "SERNEM Knowledge Base"}</span>
        <span className="font-bold text-blue-300">{tr ? "Kaynaklı yanıt" : "Source-backed"}</span>
      </div>
    </PreviewShell>
  );
}

function DashboardPreview({ tr }: { tr: boolean }) {
  return (
    <PreviewShell
      title="SERNEM Dashboard"
      subtitle={tr ? "Kişisel HSE Çalışma Alanı" : "Personal HSE Workspace"}
      icon={<LayoutDashboard size={18} />}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(tr
          ? [
              ["12", "Risk Analizleri"],
              ["28", "Denetimler"],
              ["46", "İndirmeler"],
              ["AI", "Asistan"],
            ]
          : [
              ["12", "Assessments"],
              ["28", "Inspections"],
              ["46", "Downloads"],
              ["AI", "Assistant"],
            ]
        ).map(([value, label]) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.07] bg-slate-950/55 p-3"
          >
            <div className="text-xl font-black text-white">{value}</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.1em] text-slate-500">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-white/[0.07] bg-slate-950/55 p-4">
        <div className="flex justify-between text-xs font-black text-white">
          <span>{tr ? "Çalışma Alanı Aktivitesi" : "Workspace Activity"}</span>
          <BarChart3 size={16} className="text-blue-300" />
        </div>

        <div className="mt-4 flex h-28 items-end gap-2">
          {[38, 52, 44, 71, 59, 84, 72, 94, 78, 88].map(
            (height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600/40 to-blue-400/80"
                style={{ height: `${height}%` }}
              />
            )
          )}
        </div>
      </div>
    </PreviewShell>
  );
}

function InspectionPreview({ tr }: { tr: boolean }) {
  return (
    <PreviewShell
      title={tr ? "Saha Denetimi" : "Field Inspection"}
      subtitle={tr ? "Yapılandırılmış HSE Kontrol Listesi" : "Structured HSE Checklist"}
      icon={<ClipboardCheck size={18} />}
    >
      <div className="space-y-2">
        {(tr
          ? [
              ["Erişim & Bariyerler", true],
              ["KKD Uygunluğu", true],
              ["Düzen & Temizlik", true],
              ["İzin Doğrulaması", false],
            ]
          : [
              ["Access & Barricades", true],
              ["PPE Compliance", true],
              ["Housekeeping", true],
              ["Permit Verification", false],
            ]
        ).map(([label, done]) => (
          <div
            key={String(label)}
            className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-slate-950/55 px-4 py-3"
          >
            <span className="text-xs font-bold text-slate-200">
              {String(label)}
            </span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                done
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {done ? "✓" : "!"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-300">
            {tr ? "Denetim İlerlemesi" : "Inspection Progress"}
          </span>
          <span className="text-xl font-black text-white">75%</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-3/4 rounded-full bg-blue-500" />
        </div>
      </div>
    </PreviewShell>
  );
}


function ToolboxPreview({ tr }: { tr: boolean }) {
  const topics = tr
    ? [
        "Yüksekte Çalışma",
        "KKD Kullanımı",
        "Sıkışma & Ezilme",
        "El Aletleri Güvenliği",
      ]
    : [
        "Working at Height",
        "PPE Use",
        "Pinch Points",
        "Hand Tool Safety",
      ];

  return (
    <PreviewShell
      title="Toolbox Talk"
      subtitle={tr ? "Sahaya Hazır Ekip Konuşması" : "Field-Ready Team Briefing"}
      icon={<MessageSquareText size={18} />}
    >
      <div className="grid gap-3 lg:grid-cols-[150px_1fr]">
        <div className="space-y-2">
          {topics.map((topic, index) => (
            <div
              key={topic}
              className={`rounded-xl border px-3 py-3 text-[10px] font-bold ${
                index === 0
                  ? "border-amber-400/30 bg-amber-500/[0.08] text-amber-200"
                  : "border-white/[0.07] bg-slate-950/55 text-slate-400"
              }`}
            >
              {topic}
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-slate-100 p-5 text-slate-950">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="text-[9px] font-black text-slate-400">TR</div>
              <div className="mt-1 text-sm font-black">
                YÜKSEKTE ÇALIŞMA
              </div>

              <ul className="mt-4 space-y-2 text-[10px] leading-5">
                <li>• Çalışmadan önce riskleri belirleyin.</li>
                <li>• Doğru KKD kullanın.</li>
                <li>• Onaylı iskele ve platform kullanın.</li>
                <li>• Düşmeye karşı koruma sağlayın.</li>
              </ul>
            </div>

            <div>
              <div className="text-[9px] font-black text-emerald-600">EN</div>
              <div className="mt-1 text-sm font-black">
                WORKING AT HEIGHT
              </div>

              <ul className="mt-4 space-y-2 text-[10px] leading-5">
                <li>• Identify the risks before starting.</li>
                <li>• Use the correct PPE.</li>
                <li>• Use approved access equipment.</li>
                <li>• Ensure fall protection.</li>
              </ul>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-[9px] font-bold text-slate-500">
              {tr ? "5 Dakika · Tüm Ekip" : "5 Minutes · Full Team"}
            </span>

            <span className="rounded-lg bg-amber-100 px-3 py-2 text-[9px] font-black text-amber-700">
              PDF
            </span>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function PostersPreview({ tr }: { tr: boolean }) {
  return (
    <PreviewShell
      title={tr ? "Poster & Levhalar" : "Posters & Signs"}
      subtitle={tr ? "Profesyonel Saha Görselleri" : "Professional Field Visuals"}
      icon={<Images size={18} />}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <PosterCard
          title={tr ? "Yüksekte Çalışma" : "Working at Height"}
          code="WAH"
          icon="⚠"
        />
        <PosterCard
          title={tr ? "KKD Kullanımı" : "PPE Required"}
          code="PPE"
          icon="⛑"
        />
        <PosterCard
          title={tr ? "Sıcak Çalışma" : "Hot Work"}
          code="HOT"
          icon="🔥"
        />
        <PosterCard
          title={tr ? "Kapalı Alan" : "Confined Space"}
          code="CS"
          icon="◉"
        />
        <PosterCard
          title={tr ? "Kaldırma İşleri" : "Lifting Operations"}
          code="LIFT"
          icon="↑"
        />
        <PosterCard
          title={tr ? "Elektrik Güvenliği" : "Electrical Safety"}
          code="ELEC"
          icon="⚡"
        />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-400/15 bg-emerald-500/[0.05] px-4 py-3">
        <span className="text-[10px] font-bold text-slate-400">
          {tr
            ? "Yazdırılabilir · Sahaya Hazır · Profesyonel Tasarım"
            : "Printable · Field-Ready · Professional Design"}
        </span>

        <span className="text-[10px] font-black text-emerald-300">
          {tr ? "KÜTÜPHANEYİ AÇ →" : "OPEN LIBRARY →"}
        </span>
      </div>
    </PreviewShell>
  );
}

function PosterCard({
  title,
  code,
  icon,
}: {
  title: string;
  code: string;
  icon: string;
}) {
  return (
    <div className="relative min-h-[125px] overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-slate-900 to-slate-950 p-4">
      <div className="absolute right-[-20px] top-[-20px] h-20 w-20 rounded-full bg-blue-500/[0.08] blur-2xl" />

      <div className="relative">
        <div className="text-2xl">{icon}</div>

        <div className="mt-4 text-[11px] font-black leading-4 text-white">
          {title}
        </div>

        <div className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-slate-600">
          SRN · {code}
        </div>
      </div>
    </div>
  );
}

function DataBox({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-slate-950/55 px-4 py-3">
      <span className="text-[9px] text-slate-500">{label}</span>
      <span
        className={`text-xs font-black ${
          danger ? "text-red-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/[0.05] text-blue-300">
        {icon}
      </span>
      <div>
        <div className="text-xs font-black text-slate-200">{title}</div>
        <div className="mt-0.5 text-[10px] font-medium text-slate-400">{text}</div>
      </div>
    </div>
  );
}
