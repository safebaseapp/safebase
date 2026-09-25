"use client";

import { useState } from "react";
import { Link } from "../../../i18n/navigation";
import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  HardHat,
  Images,
  LayoutDashboard,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  X,
} from "lucide-react";

type Props = {
  locale: "tr" | "en";
  onClose: () => void;
};

type Accent = "blue" | "violet" | "emerald" | "cyan";
type ProductId =
  | "risk"
  | "method"
  | "simops"
  | "ai"
  | "dashboard"
  | "inspection"
  | "toolbox"
  | "posters"
  | "ppe"
  | "signs"
  | "calculators"
  | "knowledge"
  | "performance"
  | "safetyPack";

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
  accent: Accent;
  stats: [string, string, string, string];
  featuresTr: string[];
  featuresEn: string[];
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
    descriptionTr: "Hazır faaliyet ve risk kütüphanesiyle profesyonel HIRARC değerlendirmeleri oluşturun.",
    descriptionEn: "Build professional HIRARC assessments with a structured activity and risk library.",
    href: "/tools/quick-risk-assessment",
    icon: ShieldCheck,
    status: "LIVE",
    accent: "blue",
    stats: ["100", "900", "HIRARC", "PDF"],
    featuresTr: ["Tehlike tanımlama", "Risk seviyelendirme", "Kontroller ve önlemler", "Profesyonel PDF çıktısı"],
    featuresEn: ["Hazard identification", "Risk scoring", "Controls and measures", "Professional PDF output"],
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
    descriptionTr: "Çalışma yöntemlerini proje bilgileriyle özelleştirin ve sahaya hazır Method Statement çıktısı oluşturun.",
    descriptionEn: "Customize work methods with project information and generate field-ready Method Statements.",
    href: "/tools/method-statement",
    icon: FileText,
    status: "LIVE",
    accent: "violet",
    stats: ["20", "PDF", "REV", "HSE"],
    featuresTr: ["Hazır çalışma yöntemleri", "Proje özelleştirme", "HSE kontrol adımları", "Revizyon yapısı"],
    featuresEn: ["Ready work methods", "Project customization", "HSE control steps", "Revision structure"],
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
    descriptionTr: "Eş zamanlı operasyonları, çalışma çakışmalarını ve kritik saha kontrollerini tek görünümde yönetin.",
    descriptionEn: "Manage simultaneous operations, work conflicts and critical field controls in one view.",
    href: "/tools/simops",
    icon: Layers3,
    status: "LIVE",
    accent: "violet",
    stats: ["SIMOPS", "LIVE", "HSE", "GRID"],
    featuresTr: ["Eş zamanlı işler", "Çakışma görünümü", "Kritik riskler", "Saha koordinasyonu"],
    featuresEn: ["Simultaneous activities", "Conflict view", "Critical risks", "Field coordination"],
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
    descriptionTr: "Saha sorularını risk, kritik kontrol, KKD, izin ve ilgili HSE kaynakları açısından analiz edin.",
    descriptionEn: "Analyze field questions across risk, critical controls, PPE, permits and relevant HSE resources.",
    href: "/ai-assistant",
    icon: Bot,
    status: "BETA",
    accent: "emerald",
    stats: ["AI", "SRC", "PPE", "CTRL"],
    featuresTr: ["Risk özeti", "Kritik kontroller", "KKD ve izinler", "İlgili kaynaklar"],
    featuresEn: ["Risk summary", "Critical controls", "PPE and permits", "Relevant sources"],
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
    descriptionTr: "Analizlerinizi, kayıtlarınızı, indirmelerinizi ve HSE çalışmalarınızı tek çalışma alanında yönetin.",
    descriptionEn: "Manage assessments, records, downloads and HSE activity from one connected workspace.",
    href: "/dashboard",
    icon: LayoutDashboard,
    status: "LIVE",
    accent: "cyan",
    stats: ["360°", "DATA", "HSE", "FAST"],
    featuresTr: ["Tek çalışma alanı", "Kayıtlı çalışmalar", "Aktivite görünümü", "Hızlı erişim"],
    featuresEn: ["One workspace", "Saved work", "Activity overview", "Quick access"],
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
    descriptionTr: "Yapılandırılmış kontrol listeleriyle saha denetimlerini daha hızlı, tutarlı ve izlenebilir yürütün.",
    descriptionEn: "Run field inspections faster and more consistently with structured checklists.",
    href: "/checklists",
    icon: ClipboardCheck,
    status: "LIVE",
    accent: "emerald",
    stats: ["FIELD", "LIST", "%", "HSE"],
    featuresTr: ["Hazır checklistler", "Saha doğrulaması", "İlerleme takibi", "Uygunluk kontrolü"],
    featuresEn: ["Ready checklists", "Field verification", "Progress tracking", "Compliance checks"],
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
    descriptionTr: "Sahaya hazır TR / EN Toolbox Talk içerikleriyle günlük ekip bilgilendirmelerini profesyonelleştirin.",
    descriptionEn: "Run professional daily briefings with field-ready TR / EN Toolbox Talk content.",
    href: "/toolbox",
    icon: MessageSquareText,
    status: "LIVE",
    accent: "violet",
    stats: ["TBM", "TR/EN", "READY", "PDF"],
    featuresTr: ["Sahaya hazır içerik", "TR / EN dil desteği", "Konu bazlı yapı", "Profesyonel çıktı"],
    featuresEn: ["Field-ready content", "TR / EN support", "Topic-based structure", "Professional output"],
  },
  {
    id: "posters",
    number: "08",
    titleTr: "Posterler",
    titleEn: "Posters",
    subtitleTr: "Saha Görselleri · Güvenlik",
    subtitleEn: "Field Visuals · Safety",
    eyebrowTr: "GÖRSEL GÜVENLİK",
    eyebrowEn: "VISUAL SAFETY",
    descriptionTr: "Kritik HSE mesajlarını profesyonel ve yazdırılabilir saha posterleriyle görünür hale getirin.",
    descriptionEn: "Make critical HSE messages visible with professional, printable field posters.",
    href: "/posters",
    icon: Images,
    status: "LIVE",
    accent: "emerald",
    stats: ["HSE", "PRINT", "A4", "READY"],
    featuresTr: ["Profesyonel posterler", "Yazdırılabilir tasarım", "Saha farkındalığı", "TR / EN içerik"],
    featuresEn: ["Professional posters", "Printable design", "Field awareness", "TR / EN content"],
  },
  {
    id: "ppe",
    number: "09",
    titleTr: "KKD Standartları",
    titleEn: "PPE Standards",
    subtitleTr: "EN / EN ISO · Saha Kontrolü",
    subtitleEn: "EN / EN ISO · Field Checks",
    eyebrowTr: "KKD STANDARTLARI",
    eyebrowEn: "PPE STANDARDS",
    descriptionTr: "KKD ürünlerini ilgili EN / EN ISO kodları, sınıflar ve saha kontrolleriyle birlikte inceleyin.",
    descriptionEn: "Review PPE products together with relevant EN / EN ISO codes, classes and field checks.",
    href: "/ppe-standards",
    icon: HardHat,
    status: "LIVE",
    accent: "blue",
    stats: ["EN", "ISO", "PPE", "FIELD"],
    featuresTr: ["Standart kodları", "Ürün sınıfları", "Saha kontrolleri", "Pratik referans"],
    featuresEn: ["Standard codes", "Product classes", "Field checks", "Practical reference"],
  },
  {
    id: "signs",
    number: "10",
    titleTr: "Güvenlik Levhaları",
    titleEn: "Safety Signs",
    subtitleTr: "A4 · A3 · PNG",
    subtitleEn: "A4 · A3 · PNG",
    eyebrowTr: "SAHA İŞARETLEMESİ",
    eyebrowEn: "FIELD SIGNAGE",
    descriptionTr: "Saha kullanımına hazır güvenlik levhalarını uygun formatlarda görüntüleyin ve kullanın.",
    descriptionEn: "Access field-ready safety signs in practical formats for site use.",
    href: "/safety-signs",
    icon: TriangleAlert,
    status: "LIVE",
    accent: "cyan",
    stats: ["A4", "A3", "PNG", "SIGN"],
    featuresTr: ["Saha levhaları", "A4 / A3 format", "PNG desteği", "Hızlı kullanım"],
    featuresEn: ["Field signage", "A4 / A3 format", "PNG support", "Quick use"],
  },
  {
    id: "calculators",
    number: "11",
    titleTr: "HSE Hesaplayıcılar",
    titleEn: "HSE Calculators",
    subtitleTr: "TRIR · LTIFR · Risk",
    subtitleEn: "TRIR · LTIFR · Risk",
    eyebrowTr: "HSE METRİKLERİ",
    eyebrowEn: "HSE METRICS",
    descriptionTr: "Risk Matrisi, TRIR, LTIFR ve Severity Rate gibi temel HSE hesaplarını tek merkezden kullanın.",
    descriptionEn: "Use core HSE calculations such as Risk Matrix, TRIR, LTIFR and Severity Rate from one place.",
    href: "/tools",
    icon: Calculator,
    status: "LIVE",
    accent: "blue",
    stats: ["TRIR", "LTIFR", "RISK", "SR"],
    featuresTr: ["Risk Matrisi", "TRIR hesabı", "LTIFR hesabı", "Severity Rate"],
    featuresEn: ["Risk Matrix", "TRIR calculation", "LTIFR calculation", "Severity Rate"],
  },
  {
    id: "knowledge",
    number: "12",
    titleTr: "Knowledge Base",
    titleEn: "Knowledge Base",
    subtitleTr: "HSE Rehberleri · Saha Bilgisi",
    subtitleEn: "HSE Guides · Field Knowledge",
    eyebrowTr: "BİLGİ MERKEZİ",
    eyebrowEn: "KNOWLEDGE HUB",
    descriptionTr: "Temel HSE konularını saha odaklı rehberler ve yapılandırılmış bilgi sayfalarıyla keşfedin.",
    descriptionEn: "Explore core HSE topics through field-focused guides and structured knowledge pages.",
    href: "/knowledge-base",
    icon: BookOpen,
    status: "LIVE",
    accent: "violet",
    stats: ["GUIDE", "HSE", "TR/EN", "FIELD"],
    featuresTr: ["Konu bazlı rehberler", "Saha odaklı içerik", "TR / EN yapı", "İlgili kaynaklar"],
    featuresEn: ["Topic-based guides", "Field-focused content", "TR / EN structure", "Related resources"],
  },
  {
    id: "performance",
    number: "13",
    titleTr: "HSE Performans",
    titleEn: "HSE Performance",
    subtitleTr: "KPI · Gözlem · Takip",
    subtitleEn: "KPI · Observation · Tracking",
    eyebrowTr: "PERFORMANS TAKİBİ",
    eyebrowEn: "PERFORMANCE TRACKING",
    descriptionTr: "HSE performansınızı, kayıtlarınızı ve saha göstergelerini tek bir yönetim görünümünde takip edin.",
    descriptionEn: "Track HSE performance, records and field indicators in one management view.",
    href: "/hse-performance",
    icon: Gauge,
    status: "LIVE",
    accent: "cyan",
    stats: ["KPI", "HSE", "DATA", "TREND"],
    featuresTr: ["KPI görünümü", "Saha kayıtları", "Performans takibi", "Trend odaklı yapı"],
    featuresEn: ["KPI overview", "Field records", "Performance tracking", "Trend-focused structure"],
  },
  {
    id: "safetyPack",
    number: "14",
    titleTr: "Safety Pack",
    titleEn: "Safety Pack",
    subtitleTr: "Tek İş · Bağlantılı HSE Kaynakları",
    subtitleEn: "One Job · Connected HSE Resources",
    eyebrowTr: "BAĞLANTILI İŞ AKIŞI",
    eyebrowEn: "CONNECTED WORKFLOW",
    descriptionTr: "Bir iş için gerekli rehber, Toolbox, denetim ve HSE araçlarını tek saha paketi içinde bir araya getirin.",
    descriptionEn: "Bring guides, Toolbox, inspections and HSE tools for one job together in a single field pack.",
    href: "/safety-pack",
    icon: PackageCheck,
    status: "LIVE",
    accent: "emerald",
    stats: ["PACK", "HSE", "FIELD", "1×"],
    featuresTr: ["Tek iş akışı", "Bağlantılı kaynaklar", "Saha odaklı yapı", "Hızlı erişim"],
    featuresEn: ["One job workflow", "Connected resources", "Field-focused structure", "Quick access"],
  },
];

const accentMap: Record<Accent, { active: string; icon: string; glow: string; text: string; dot: string }> = {
  blue: {
    active: "border-blue-400/55 bg-blue-500/[0.11] shadow-[0_0_0_1px_rgba(59,130,246,.18),0_12px_35px_rgba(37,99,235,.14)]",
    icon: "border-blue-400/25 bg-blue-500/10 text-blue-300",
    glow: "bg-blue-500/20",
    text: "text-blue-300",
    dot: "bg-blue-400",
  },
  violet: {
    active: "border-violet-400/45 bg-violet-500/[0.09] shadow-[0_0_0_1px_rgba(139,92,246,.15),0_12px_35px_rgba(109,40,217,.12)]",
    icon: "border-violet-400/25 bg-violet-500/10 text-violet-300",
    glow: "bg-violet-500/20",
    text: "text-violet-300",
    dot: "bg-violet-400",
  },
  emerald: {
    active: "border-emerald-400/40 bg-emerald-500/[0.08] shadow-[0_0_0_1px_rgba(52,211,153,.12),0_12px_35px_rgba(5,150,105,.10)]",
    icon: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
    glow: "bg-emerald-500/20",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },
  cyan: {
    active: "border-cyan-400/40 bg-cyan-500/[0.08] shadow-[0_0_0_1px_rgba(34,211,238,.12),0_12px_35px_rgba(8,145,178,.10)]",
    icon: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",
    glow: "bg-cyan-500/20",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
  },
};

export default function ProductExplorer({ locale, onClose }: Props) {
  const isTurkish = locale === "tr";
  const [activeId, setActiveId] = useState<ProductId>("risk");
  const active = products.find((product) => product.id === activeId) ?? products[0];
  const styles = accentMap[active.accent];
  const ActiveIcon = active.icon;

  return (
    <div id="sernem-navigation" className="fixed inset-0 z-[9999] overflow-y-auto bg-[#020817]/[0.99] text-white shadow-[0_45px_140px_rgba(0,0,0,.72)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-240px] h-[520px] w-[520px] rounded-full bg-blue-600/[0.11] blur-[150px]" />
        <div className="absolute right-[-100px] top-[30%] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.06] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-8 pt-24 sm:px-7 lg:px-8">
        <button type="button" onClick={onClose} aria-label={isTurkish ? "Keşfet menüsünü kapat" : "Close explorer"} className="absolute right-8 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-500 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
          <X size={18} />
        </button>

        <div className="grid gap-5 lg:grid-cols-[390px_1fr]">
          <aside className="min-w-0">
            <div className="pr-12">
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-400">
                <Sparkles size={14} /> SERNEM PRODUCT SUITE
              </div>
              <h2 className="mt-3 text-[34px] font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-[38px]">
                {isTurkish ? "Bağlantılı HSE" : "Connected HSE"}
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  {isTurkish ? "çalışma sistemi" : "work system"}
                </span>
              </h2>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-slate-300">
                <span className="text-emerald-300">{products.length}+</span>
                {isTurkish ? "profesyonel modül" : "professional modules"}
              </div>
              <p className="mt-4 max-w-sm text-sm font-medium leading-6 text-slate-300">
                {isTurkish ? "Risk yönetiminden saha iletişimine, KPI takibinden Safety Pack'e kadar HSE iş akışınızı tek platformda yönetin." : "Manage your HSE workflow from risk and field communication to KPI tracking and Safety Packs in one platform."}
              </p>
            </div>

            <div className="mt-5 max-h-[620px] overflow-y-auto rounded-[22px] border border-white/[0.08] bg-slate-950/45 p-1.5 [scrollbar-width:thin]">
              {products.map((product) => {
                const Icon = product.icon;
                const isActive = product.id === activeId;
                const productStyles = accentMap[product.accent];
                return (
                  <button key={product.id} type="button" onMouseEnter={() => setActiveId(product.id)} onFocus={() => setActiveId(product.id)} onClick={() => setActiveId(product.id)} className={`group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${isActive ? productStyles.active : "border-transparent hover:bg-white/[0.035]"}`}>
                    <span className={`w-7 shrink-0 text-[10px] font-black ${isActive ? productStyles.text : "text-slate-600"}`}>{product.number}</span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${productStyles.icon}`}><Icon size={17} strokeWidth={1.8} /></span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[13px] font-black ${isActive ? "text-white" : "text-slate-200"}`}>{isTurkish ? product.titleTr : product.titleEn}</span>
                      <span className="mt-0.5 block truncate text-[10px] font-medium text-slate-500">{isTurkish ? product.subtitleTr : product.subtitleEn}</span>
                    </span>
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? productStyles.dot : "bg-slate-700"}`} />
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
              {active.stats.map((value, index) => {
                const labelsTr = ["Kapasite", "İçerik", "Sistem", "Çıktı"];
                const labelsEn = ["Capacity", "Content", "System", "Output"];
                const icons = [<Activity key="a" size={20} />, <ShieldCheck key="s" size={20} />, <BarChart3 key="b" size={20} />, <FileText key="f" size={20} />];
                return (
                  <div key={`${active.id}-${value}-${index}`} className="flex min-h-[88px] items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.028] px-4 py-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${styles.icon}`}>{icons[index]}</span>
                    <div className="min-w-0">
                      <div className="truncate text-lg font-black tracking-[-0.03em] text-white">{value}</div>
                      <div className="text-[10px] font-bold text-slate-400">{isTurkish ? labelsTr[index] : labelsEn[index]}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-3 overflow-hidden rounded-[26px] border border-blue-400/30 bg-gradient-to-br from-blue-600/[0.10] via-slate-950 to-slate-950 shadow-[0_0_0_1px_rgba(59,130,246,.08),0_0_50px_rgba(37,99,235,.10)]">
              <div className={`pointer-events-none absolute right-[-100px] top-[-160px] h-[420px] w-[420px] rounded-full blur-[130px] ${styles.glow}`} />
              <div className="relative grid min-h-[540px] lg:grid-cols-[0.82fr_1.18fr]">
                <div className="flex flex-col justify-between border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div>
                    <div className={`inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.17em] ${styles.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                      {isTurkish ? active.eyebrowTr : active.eyebrowEn}
                    </div>
                    <h3 className="mt-5 text-3xl font-black tracking-[-0.045em] text-white xl:text-[42px]">{isTurkish ? active.titleTr : active.titleEn}</h3>
                    <p className="mt-4 max-w-md text-sm font-medium leading-7 text-slate-300">{isTurkish ? active.descriptionTr : active.descriptionEn}</p>
                    <div className="mt-6 space-y-2.5">
                      {(isTurkish ? active.featuresTr : active.featuresEn).map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="shrink-0 text-emerald-400" /> {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href={active.href} onClick={onClose} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-500">
                      {isTurkish ? "Modülü Aç" : "Open Module"} <span>→</span>
                    </Link>
                    <p className="mt-4 text-[11px] font-semibold text-blue-300">{isTurkish ? `${active.titleTr} SERNEM çalışma alanının bir parçasıdır.` : `${active.titleEn} is part of the SERNEM workspace.`}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center p-5 sm:p-7">
                  <div key={active.id} className="w-full animate-[sernemPreview_.25s_ease-out]">
                    <div className="mx-auto w-full max-w-[680px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#091225]/95 shadow-[0_30px_70px_rgba(0,0,0,.40)]">
                      <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles.icon}`}><ActiveIcon size={19} /></span>
                          <div>
                            <div className="text-sm font-black text-white">{isTurkish ? active.titleTr : active.titleEn}</div>
                            <div className="mt-0.5 text-[10px] text-slate-500">SERNEM / {active.number}</div>
                          </div>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-[8px] font-black tracking-[0.12em] ${active.status === "BETA" ? "border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-300" : "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"}`}>{active.status}</span>
                      </div>

                      <div className="p-5">
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">{isTurkish ? "AKTİF MODÜL" : "ACTIVE MODULE"}</div>
                              <div className="mt-1 text-lg font-black text-white">{isTurkish ? active.subtitleTr : active.subtitleEn}</div>
                            </div>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${styles.icon}`}><ActiveIcon size={22} /></div>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2.5">
                          {active.stats.map((stat, index) => (
                            <div key={`${stat}-preview-${index}`} className="rounded-xl border border-white/[0.07] bg-slate-950/40 p-3">
                              <div className={`text-lg font-black ${styles.text}`}>{stat}</div>
                              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.05]"><div className={`h-full rounded-full ${styles.dot}`} style={{ width: `${55 + index * 10}%` }} /></div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                            <span>{isTurkish ? "İŞ AKIŞI" : "WORKFLOW"}</span>
                            <span className="text-emerald-300">CONNECTED</span>
                          </div>
                          <div className="mt-3 space-y-2">
                            {(isTurkish ? active.featuresTr : active.featuresEn).slice(0, 3).map((feature, index) => (
                              <div key={feature} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                                <span className={`flex h-6 w-6 items-center justify-center rounded-lg border text-[9px] font-black ${styles.icon}`}>0{index + 1}</span>
                                <span className="text-[11px] font-bold text-slate-300">{feature}</span>
                                <CheckCircle2 size={13} className="ml-auto text-emerald-400" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-4 grid gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2 sm:grid-cols-2 xl:grid-cols-4">
          <TrustItem icon={<LockKeyhole size={18} />} title={isTurkish ? "Güvenli Çalışma Alanı" : "Secure Workspace"} text={isTurkish ? "Kullanıcı odaklı erişim" : "User-focused access"} />
          <TrustItem icon={<LayoutDashboard size={18} />} title={isTurkish ? "14+ Bağlantılı Modül" : "14+ Connected Modules"} text={isTurkish ? "Tek platform deneyimi" : "One platform experience"} />
          <TrustItem icon={<ShieldCheck size={18} />} title={isTurkish ? "HSE Odaklı" : "HSE Focused"} text={isTurkish ? "Saha ihtiyaçları için" : "Built for field needs"} />
          <TrustItem icon={<Sparkles size={18} />} title={isTurkish ? "Sürekli Gelişen" : "Continuously Growing"} text={isTurkish ? "Yeni araç ve içerikler" : "New tools and resources"} />
        </div>

        <style jsx>{`
          @keyframes sernemPreview {
            from { opacity: 0; transform: translateY(8px) scale(.992); filter: blur(3px); }
            to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.06] text-blue-300">{icon}</span>
      <div>
        <div className="text-[11px] font-black text-slate-200">{title}</div>
        <div className="mt-0.5 text-[9px] font-medium text-slate-500">{text}</div>
      </div>
    </div>
  );
}
