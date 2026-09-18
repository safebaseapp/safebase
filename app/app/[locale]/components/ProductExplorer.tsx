"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "../../../i18n/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  ClipboardCheck,
  Download,
  FileText,
  Gauge,
  Images,
  LayoutDashboard,
  Layers3,
  MessageSquareText,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Props = {
  locale: "tr" | "en";
  onClose: () => void;
};

type Product = {
  id: string;
  number: string;
  titleTr: string;
  titleEn: string;
  subtitleTr: string;
  subtitleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  href: string;
  icon: LucideIcon;
  status: "LIVE" | "BETA";
  accent: "blue" | "violet" | "emerald" | "cyan" | "amber";
  flowTr: [string, string, string];
  flowEn: [string, string, string];
};

const products: Product[] = [
  {
    id: "risk",
    number: "01",
    titleTr: "Risk Analizi",
    titleEn: "Risk Assessment",
    subtitleTr: "HIRARC · Risk Yönetimi",
    subtitleEn: "HIRARC · Risk Management",
    descriptionTr: "Faaliyeti seçin, tehlikeleri belirleyin, kontrolleri tanımlayın ve kalan riski tek kayıt üzerinde yönetin.",
    descriptionEn: "Choose the activity, identify hazards, define controls and manage residual risk in one structured record.",
    href: "/tools/quick-risk-assessment",
    icon: ShieldCheck,
    status: "LIVE",
    accent: "blue",
    flowTr: ["Faaliyeti ve tehlikeleri seçin", "Risk puanlarını ve kontrolleri düzenleyin", "HIRARC kaydını tamamlayın"],
    flowEn: ["Choose activity and hazards", "Edit risk scores and controls", "Complete the HIRARC record"],
  },
  {
    id: "method",
    number: "02",
    titleTr: "Method Statement",
    titleEn: "Method Statement",
    subtitleTr: "Çalışma Yöntemi · Dokümantasyon",
    subtitleEn: "Work Method · Documentation",
    descriptionTr: "Hazır çalışma yöntemlerini proje bilgileriyle özelleştirin; sorumluluk, ekipman, kontrol ve iş adımlarını profesyonel dokümana dönüştürün.",
    descriptionEn: "Customize ready work methods with project information and turn responsibilities, equipment, controls and work steps into a professional document.",
    href: "/tools/method-statement",
    icon: FileText,
    status: "LIVE",
    accent: "violet",
    flowTr: ["Hazır yöntemi seçin veya sıfırdan başlayın", "Proje ve saha bilgilerini özelleştirin", "İş adımlarını ve kontrolleri dokümante edin"],
    flowEn: ["Choose a ready method or start from scratch", "Customize project and site information", "Document work steps and controls"],
  },
  {
    id: "simops",
    number: "03",
    titleTr: "SIMOPS Planner",
    titleEn: "SIMOPS Planner",
    subtitleTr: "Operasyon · Çakışma Kontrolü",
    subtitleEn: "Operations · Conflict Control",
    descriptionTr: "Eş zamanlı işleri aynı görünümde karşılaştırın, operasyon çakışmalarını belirleyin ve kritik kontrolleri planlayın.",
    descriptionEn: "Compare simultaneous work in one view, identify operational conflicts and plan critical controls.",
    href: "/tools/simops",
    icon: Layers3,
    status: "LIVE",
    accent: "violet",
    flowTr: ["Eş zamanlı işleri ekleyin", "Çakışmaları değerlendirin", "Kontrol ve koordinasyon planını netleştirin"],
    flowEn: ["Add simultaneous activities", "Evaluate conflicts", "Define controls and coordination"],
  },
  {
    id: "ai",
    number: "04",
    titleTr: "SERNEM AI",
    titleEn: "SERNEM AI",
    subtitleTr: "HSE Rehberliği · Kaynaklı",
    subtitleEn: "HSE Guidance · Source-backed",
    descriptionTr: "Saha sorularını risk, kritik kontrol, KKD, izin ve ilgili HSE kaynaklarıyla yapılandırılmış biçimde değerlendirin.",
    descriptionEn: "Review field questions with structured risk, critical-control, PPE, permit and HSE-source guidance.",
    href: "/ai-assistant",
    icon: Bot,
    status: "BETA",
    accent: "emerald",
    flowTr: ["Saha sorusunu girin", "Yapılandırılmış HSE analizini inceleyin", "Kaynak ve önerileri saha koşullarıyla doğrulayın"],
    flowEn: ["Enter the field question", "Review the structured HSE analysis", "Verify sources and recommendations against site conditions"],
  },
  {
    id: "dashboard",
    number: "05",
    titleTr: "Dashboard",
    titleEn: "Dashboard",
    subtitleTr: "Workspace · Çalışma Alanı",
    subtitleEn: "Workspace · Activity",
    descriptionTr: "Kayıtlarınıza, araçlarınıza ve kişisel SERNEM çalışma alanınıza tek merkezden ulaşın.",
    descriptionEn: "Access your records, tools and personal SERNEM workspace from one place.",
    href: "/dashboard",
    icon: LayoutDashboard,
    status: "LIVE",
    accent: "cyan",
    flowTr: ["Hesabınıza giriş yapın", "Çalışmalarınızı tek ekranda görün", "İlgili modüle hızlıca devam edin"],
    flowEn: ["Sign in to your account", "See your work in one place", "Continue directly to the relevant module"],
  },
  {
    id: "inspection",
    number: "06",
    titleTr: "Denetimler",
    titleEn: "Inspections",
    subtitleTr: "Saha Kontrolü · Checklist",
    subtitleEn: "Field Control · Checklists",
    descriptionTr: "Yapılandırılmış kontrol listeleri ile saha koşullarını doğrulayın, bulguları görünür hale getirin ve aksiyonları takip edin.",
    descriptionEn: "Verify field conditions with structured checklists, surface findings and follow corrective actions.",
    href: "/checklists",
    icon: ClipboardCheck,
    status: "LIVE",
    accent: "emerald",
    flowTr: ["Denetim türünü seçin", "Saha maddelerini doğrulayın", "Bulguları ve aksiyonları kaydedin"],
    flowEn: ["Choose the inspection type", "Verify field items", "Record findings and actions"],
  },
  {
    id: "toolbox",
    number: "07",
    titleTr: "Toolbox Talk",
    titleEn: "Toolbox Talk",
    subtitleTr: "Saha Konuşmaları · TR / EN",
    subtitleEn: "Field Talks · TR / EN",
    descriptionTr: "Sahaya hazır Toolbox içeriklerini açık önizleme ile inceleyin; ücretsiz hesabınızla standart PDF çıktısını kullanın.",
    descriptionEn: "Preview field-ready Toolbox content openly and use standard PDF downloads with a free account.",
    href: "/toolbox",
    icon: MessageSquareText,
    status: "LIVE",
    accent: "violet",
    flowTr: ["Konuyu seçip açık önizlemeyi okuyun", "Ücretsiz hesabınızla giriş yapın", "Standart PDF'i indirip sahada kullanın"],
    flowEn: ["Choose a topic and read the open preview", "Sign in with a free account", "Download the standard PDF for field use"],
  },
  {
    id: "posters",
    number: "08",
    titleTr: "Poster & Levhalar",
    titleEn: "Posters & Signs",
    subtitleTr: "Görsel Güvenlik · Saha İletişimi",
    subtitleEn: "Visual Safety · Field Communication",
    descriptionTr: "Güvenlik posterleri ve levhalarla kritik HSE mesajlarını sahada hızlı ve anlaşılır biçimde görünür kılın.",
    descriptionEn: "Make critical HSE messages visible in the field with professional posters and safety signs.",
    href: "/posters",
    icon: Images,
    status: "LIVE",
    accent: "emerald",
    flowTr: ["Konuyu veya kategoriyi seçin", "Görseli önizleyin", "Saha iletişiminde kullanın"],
    flowEn: ["Choose a topic or category", "Preview the visual", "Use it for field communication"],
  },
  {
    id: "performance",
    number: "09",
    titleTr: "HSE Performance",
    titleEn: "HSE Performance",
    subtitleTr: "KPI · Olay · Gözlem",
    subtitleEn: "KPI · Incidents · Observations",
    descriptionTr: "TRIR, LTIFR, olay kayıtları, saha gözlemleri ve aylık HSE verilerini tek performans görünümünde yönetin.",
    descriptionEn: "Manage TRIR, LTIFR, incident records, field observations and monthly HSE data in one performance view.",
    href: "/hse-performance",
    icon: Gauge,
    status: "LIVE",
    accent: "cyan",
    flowTr: ["Aylık HSE verilerini girin", "KPI ve saha kayıtlarını izleyin", "Trend ve rapor görünümünü kullanın"],
    flowEn: ["Enter monthly HSE data", "Track KPIs and field records", "Use trend and report views"],
  },
  {
    id: "downloads",
    number: "10",
    titleTr: "İndirme Merkezi",
    titleEn: "Download Center",
    subtitleTr: "Doküman · Şablon · Kaynak",
    subtitleEn: "Documents · Templates · Resources",
    descriptionTr: "Poster, levha, şablon ve profesyonel HSE kaynaklarını tek indirme merkezinden keşfedin.",
    descriptionEn: "Discover posters, signs, templates and professional HSE resources from one download center.",
    href: "/downloads",
    icon: Download,
    status: "LIVE",
    accent: "blue",
    flowTr: ["Kaynak kategorisini seçin", "Dosyayı ve formatı inceleyin", "Uygun erişim seviyesinde kullanın"],
    flowEn: ["Choose a resource category", "Review the file and format", "Use it at the appropriate access level"],
  },
  {
    id: "knowledge",
    number: "11",
    titleTr: "Bilgi Merkezi",
    titleEn: "Knowledge Base",
    subtitleTr: "Rehber · Standart · Saha Bilgisi",
    subtitleEn: "Guides · Standards · Field Knowledge",
    descriptionTr: "Hot Work, LOTO, kapalı alan, yüksekte çalışma ve diğer HSE konularında yapılandırılmış rehberlere ulaşın.",
    descriptionEn: "Access structured guidance for Hot Work, LOTO, confined space, work at height and other HSE topics.",
    href: "/knowledge-base",
    icon: BookOpen,
    status: "LIVE",
    accent: "amber",
    flowTr: ["HSE konusunu seçin", "Kritik gereklilikleri inceleyin", "İlgili saha aracına geçin"],
    flowEn: ["Choose an HSE topic", "Review critical requirements", "Continue to the relevant field tool"],
  },
  {
    id: "calculators",
    number: "12",
    titleTr: "HSE Hesaplayıcıları",
    titleEn: "HSE Calculators",
    subtitleTr: "TRIR · LTIFR · Risk Matrix",
    subtitleEn: "TRIR · LTIFR · Risk Matrix",
    descriptionTr: "Risk Matrix, TRIR, LTIFR ve Severity Rate gibi temel HSE hesaplamalarını hızlı şekilde yapın.",
    descriptionEn: "Run core HSE calculations such as Risk Matrix, TRIR, LTIFR and Severity Rate quickly.",
    href: "/tools",
    icon: BarChart3,
    status: "LIVE",
    accent: "blue",
    flowTr: ["Hesaplayıcıyı seçin", "Saha veya dönem verilerini girin", "Sonucu yorumlayıp kaydınıza aktarın"],
    flowEn: ["Choose the calculator", "Enter field or period data", "Interpret the result and use it in your records"],
  },
];

const accents = {
  blue: {
    icon: "border-blue-400/30 bg-blue-500/10 text-blue-300",
    active: "border-blue-400/50 bg-blue-500/10",
    line: "bg-blue-400",
  },
  violet: {
    icon: "border-violet-400/30 bg-violet-500/10 text-violet-300",
    active: "border-violet-400/50 bg-violet-500/10",
    line: "bg-violet-400",
  },
  emerald: {
    icon: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
    active: "border-emerald-400/50 bg-emerald-500/10",
    line: "bg-emerald-400",
  },
  cyan: {
    icon: "border-cyan-400/30 bg-cyan-500/10 text-cyan-300",
    active: "border-cyan-400/50 bg-cyan-500/10",
    line: "bg-cyan-400",
  },
  amber: {
    icon: "border-amber-400/30 bg-amber-500/10 text-amber-300",
    active: "border-amber-400/50 bg-amber-500/10",
    line: "bg-amber-400",
  },
};

export default function ProductExplorer({ locale, onClose }: Props) {
  const isTurkish = locale === "tr";
  const [activeId, setActiveId] = useState("risk");

  const active = useMemo(
    () => products.find((product) => product.id === activeId) ?? products[0],
    [activeId],
  );

  const activeAccent = accents[active.accent];
  const ActiveIcon = active.icon;
  const activeFlow = isTurkish ? active.flowTr : active.flowEn;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const scrollToHowItWorks = () => {
    document
      .getElementById("sernem-product-how-it-works")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-[#020817] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,.09),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,.10),transparent_32%)]" />

      <div className="relative mx-auto min-h-screen max-w-[1500px] px-4 pb-16 pt-5 sm:px-6 lg:px-10 lg:pt-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.22em] text-emerald-300 sm:text-xs">
              <Sparkles size={16} /> SERNEM PRODUCT SUITE
            </div>
            <h2 className="mt-3 text-3xl font-black leading-none tracking-[-0.045em] sm:text-5xl">
              <span>12 {isTurkish ? "bağlantılı" : "connected"}</span>{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {isTurkish ? "HSE modülü" : "HSE modules"}
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              {isTurkish
                ? "Risk yönetiminden saha denetimine, Toolbox'tan KPI takibine kadar çalışan SERNEM modüllerini tek yerden keşfedin."
                : "Explore working SERNEM modules from risk management and field inspections to Toolbox content and KPI tracking."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isTurkish ? "Keşfet ekranını kapat" : "Close product explorer"}
            className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:bg-white/[0.08] hover:text-white sm:h-14 sm:w-14"
          >
            <X size={26} />
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[430px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white/10 bg-[#061022]/85 p-2 shadow-2xl backdrop-blur-xl sm:p-3 xl:sticky xl:top-6 xl:self-start">
            <div className="max-h-none overflow-visible xl:max-h-[calc(100vh-150px)] xl:overflow-y-auto xl:pr-1">
              {products.map((product) => {
                const ProductIcon = product.icon;
                const selected = product.id === active.id;
                const accent = accents[product.accent];

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setActiveId(product.id)}
                    className={`relative flex w-full items-center gap-3 border-b border-white/[0.07] px-3 py-4 text-left transition last:border-b-0 sm:gap-4 sm:px-4 ${
                      selected ? accent.active : "hover:bg-white/[0.035]"
                    }`}
                  >
                    {selected && (
                      <span className={`absolute bottom-0 left-0 top-0 w-1 ${accent.line}`} />
                    )}
                    <span className="w-8 shrink-0 text-sm font-black text-slate-500">
                      {product.number}
                    </span>
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${accent.icon}`}>
                      <ProductIcon size={23} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-black text-white sm:text-lg">
                        {isTurkish ? product.titleTr : product.titleEn}
                      </span>
                      <span className="mt-1 block truncate text-xs text-slate-500 sm:text-sm">
                        {isTurkish ? product.subtitleTr : product.subtitleEn}
                      </span>
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[9px] font-black tracking-[0.14em] ${
                        product.status === "BETA"
                          ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
                          : "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                      }`}
                    >
                      {product.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[#071226]/90 shadow-2xl backdrop-blur-xl">
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${activeAccent.icon}`}>
                    <ActiveIcon size={30} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-[0.2em] text-slate-500">
                      {active.number} / 12 · SERNEM
                    </div>
                    <h3 className="mt-1 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                      {isTurkish ? active.titleTr : active.titleEn}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {isTurkish ? active.subtitleTr : active.subtitleEn}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-black tracking-[0.16em] ${
                    active.status === "BETA"
                      ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
                      : "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                  }`}
                >
                  {active.status}
                </span>
              </div>

              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                  {isTurkish ? active.descriptionTr : active.descriptionEn}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={active.href}
                    onClick={onClose}
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-500 sm:min-w-44"
                  >
                    {isTurkish ? "Ürünü Aç" : "Open Product"}
                    <ArrowRight size={18} />
                  </Link>
                  <button
                    type="button"
                    onClick={scrollToHowItWorks}
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.035] px-6 py-3 text-sm font-black text-slate-200 transition hover:bg-white/[0.07] hover:text-white sm:min-w-44"
                  >
                    <Play size={17} />
                    {isTurkish ? "Nasıl çalışır?" : "How it works"}
                  </button>
                </div>
              </div>
            </div>

            <div
              id="sernem-product-how-it-works"
              className="scroll-mt-5 border-t border-white/10 bg-[#040c1b] p-5 sm:p-8 lg:p-10"
            >
              <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-300">
                <Activity size={15} />
                {isTurkish ? "NASIL ÇALIŞIR?" : "HOW IT WORKS"}
              </div>
              <h4 className="mt-3 text-2xl font-black sm:text-3xl">
                {isTurkish
                  ? `${active.titleTr} akışı`
                  : `${active.titleEn} workflow`}
              </h4>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {activeFlow.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5"
                  >
                    <span className="text-xs font-black text-blue-300">0{index + 1}</span>
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-200">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm leading-6 text-slate-500">
                  {isTurkish
                    ? "Modüller birbirinden kopuk tanıtım kartları değil; SERNEM içindeki gerçek çalışma yollarına bağlıdır."
                    : "These are not disconnected marketing cards; every module links to a real SERNEM working path."}
                </p>
                <Link
                  href="/how-it-works"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-sm font-black text-blue-300 hover:text-blue-200"
                >
                  {isTurkish ? "Tüm SERNEM akışını gör" : "See the full SERNEM workflow"}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
