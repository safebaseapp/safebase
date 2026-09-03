import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import LocalizedFooter from "./components/LocalizedFooter";
import {

  
  ShieldCheck,
  FileText,
  Bot,
  ClipboardCheck,
  BookOpen,
  Calculator,
  Download,
  BriefcaseBusiness,
  Boxes,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import ProductShowcase from "./components/ProductShowcase";
import SernemLogo from "./components/SernemLogo";

type Props = {
  params: Promise<{ locale: string }>;
};


export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  const safeLocale = locale === "tr" ? "tr" : "en";
  const isTurkish = safeLocale === "tr";

  const canonicalUrl = `https://www.sernem.com/${safeLocale}`;

  const title = isTurkish
    ? "SERNEM | Profesyonel İSG ve HSE Araçları"
    : "SERNEM | Professional HSE Tools & Safety Resources";

  const description = isTurkish
    ? "Risk analizi, Method Statement, İSG hesaplayıcıları, HSE rehberleri, kontrol listeleri ve saha güvenliği kaynaklarını tek platformda kullanın."
    : "Use professional risk assessments, Method Statements, HSE calculators, safety guides, checklists and field-ready HSE resources from one platform.";

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: "https://www.sernem.com/tr",
        en: "https://www.sernem.com/en",
        "x-default": "https://www.sernem.com/en",
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "SERNEM",
      locale: isTurkish ? "tr_TR" : "en_US",
      alternateLocale: isTurkish ? ["en_US"] : ["tr_TR"],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}


const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3.5 12h17M12 3c2.3 2.4 3.5 5.4 3.5 9S14.3 18.6 12 21c-2.3-2.4-3.5-5.4-3.5-9S9.7 5.4 12 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="M12 2.5 13.8 8l5.7 1.8-5.7 1.8L12 17l-1.8-5.4-5.7-1.8L10.2 8 12 2.5Z"
      fill="currentColor"
    />
    <path
      d="m18.5 15 .9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z"
      fill="currentColor"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="m5 12.5 4.2 4.2L19 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const safeLocale = locale as "tr" | "en";
  const isTurkish = safeLocale === "tr";

  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  });

  const content = {
    badge: isTurkish
      ? "Global HSE bilgi ve araç platformu"
      : "Global HSE knowledge and tools platform",

    slogan: isTurkish
      ? "Sınırların Ötesinde Güvenlik"
      : "Safety Without Borders",

    description: isTurkish
      ? "HSE profesyonelleri için hesaplama araçları, yapay zekâ destekli rehberlik, güvenlik bilgileri ve kullanıma hazır kaynaklar."
      : "Calculators, AI-powered guidance, safety knowledge and ready-to-use resources built for HSE professionals.",

    exploreTools: isTurkish ? "Araçları Keşfet" : "Explore Tools",

    askAi: isTurkish ? "SERNEM AI'a Sor" : "Ask SERNEM AI",

    platformLabel: isTurkish
      ? "HSE profesyonelleri için geliştirildi"
      : "Built for HSE professionals",

    toolsLabel: isTurkish ? "Profesyonel Araçlar" : "Professional Tools",

    knowledgeLabel: isTurkish ? "Bilgi Konuları" : "Knowledge Topics",

    aiLabel: isTurkish ? "Yapay Zekâ Asistanı" : "AI Assistant",

    aiCardTitle: isTurkish
      ? "Sahadaki sorularına hızlı yanıt al"
      : "Get fast answers to real safety questions",

    aiCardDescription: isTurkish
      ? "KKD, sıcak çalışma, kapalı alan, LOTO ve daha fazla HSE konusu hakkında SERNEM AI'a soru sor."
      : "Ask SERNEM AI about PPE, hot work, confined space, LOTO and more HSE topics.",

    aiCardButton: isTurkish ? "AI Asistanını Aç" : "Open AI Assistant",

    trustedText: isTurkish
      ? "Tek platform. Daha güvenli işyerleri."
      : "One platform. Safer workplaces.",

    whyEyebrow: isTurkish ? "Neden SERNEM?" : "Why SERNEM?",

    whyTitle: isTurkish
      ? "Tüm HSE araçları tek platformda"
      : "Move from fragmented safety work to one focused platform",

    whyDescription: isTurkish
      ? "SERNEM; yapay zekâyı, hesaplayıcıları, rehberleri, kontrol listelerini ve kaynakları tek çalışma alanında birleştirir."
      : "SERNEM brings AI, calculators, guidance, checklists and resources together in one focused workspace.",

    statsEyebrow: isTurkish ? "SERNEM Rakamlarla" : "SERNEM in Numbers",

    statsTitle: isTurkish
      ? "Büyümeye hazır sağlam bir temel"
      : "A continuously growing HSE platform with new tools and guides.",

    audienceEyebrow: isTurkish ? "Kimler İçin?" : "Built For",

    audienceTitle: isTurkish
      ? "Farklı sektörlerdeki güvenlik profesyonelleri"
      : "Safety professionals across multiple industries",
  };

  const advantages = [
    {
      icon: "🧩",
      title: isTurkish
        ? "Dağınık Araçlar\nTek Platform"
        : "Fragmented Tools\nOne Platform",
      description: isTurkish
        ? "Hesaplayıcılar, AI, rehberler ve kontrol listeleri tek merkezde."
        : "Use calculators, guidance, checklists and AI from one workspace instead of switching between disconnected tools.",
    },
    {
      icon: "🧠",
      title: isTurkish
        ? "Genel AI\nKaynaklı AI"
        : "Generic AI\nSource-Aware AI",
      description: isTurkish
        ? "AI cevaplarının kullandığı HSE kaynaklarını da görün."
        : "SERNEM AI uses the available HSE knowledge base and shows the sources used for its response.",
    },
    {
      icon: "⚡",
      title: isTurkish
        ? "Manuel İşlemler\nAnında Sonuç"
        : "Manual Work\nInstant Results",
      description: isTurkish
        ? "Dakikalar süren HSE işlemlerini saniyeler içinde tamamlayın."
        : "Reach essential HSE calculations, field controls and practical answers in less time.",
    },
    {
      icon: "📈",
      title: isTurkish
        ? "Statik İçerik\nSürekli Gelişen Platform"
        : "Static Content\nGrowing Platform",
      description: isTurkish
        ? "Yeni araçlar ve rehberlerle sürekli gelişen bir HSE platformu."
        : "Use an HSE workspace that continues to grow with new guides, tools and professional resources.",
    },
  ];

  const statistics = [
    {
      value: "4+",
      label: isTurkish ? "Aktif Hesaplayıcı" : "Active Calculators",
    },
    {
      value: "5+",
      label: isTurkish ? "Bilgi Konusu" : "Knowledge Topics",
    },
    {
      value: "2",
      label: isTurkish ? "Desteklenen Dil" : "Supported Languages",
    },
    {
      value: "AI",
      label: isTurkish ? "HSE Asistanı" : "HSE Assistant",
    },
  ];

  const audiences = isTurkish
    ? [
        "HSE Uzmanları",
        "İş Güvenliği Mühendisleri",
        "Saha Süpervizörleri",
        "İnşaat Projeleri",
        "Petrol ve Gaz",
        "Üretim Tesisleri",
        "Kimya Tesisleri",
        "Bakım Ekipleri",
      ]
    : [
        "HSE Officers",
        "Safety Engineers",
        "Site Supervisors",
        "Construction Projects",
        "Oil & Gas",
        "Manufacturing",
        "Chemical Plants",
        "Maintenance Teams",
      ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <style>{`
        @media (min-width: 1024px) {
          .safebase-home-scale {
            zoom: 0.90;
          }
        }
      `}</style>
      <div className="safebase-home-scale">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#020817]">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/sernem-hero-refinery.webp')",
          }}
        />

        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,8,23,0.98)_0%,rgba(2,8,23,0.91)_35%,rgba(2,8,23,0.68)_65%,rgba(2,8,23,0.72)_100%)]" />

        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#020817]/25 via-transparent to-[#020817]/90" />

        <div className="absolute left-[-180px] top-[-180px] -z-20 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute right-[-120px] top-[-120px] -z-20 h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-[180px]" />

        <div
          className="absolute inset-0 -z-10 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        <div className="mx-auto max-w-[1440px] px-6 pb-7 pt-9 lg:px-8 lg:pb-8 lg:pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-[0.98fr_1.02fr] xl:gap-12">
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-400 sm:text-sm">
                {isTurkish
                  ? "DAHA AKILLI HSE. DAHA GÜVENLİ YARIN."
                  : "SMARTER HSE. SAFER TOMORROW."}
              </p>

              <h1 className="mt-5 max-w-[720px] text-[40px] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[49px] lg:text-[51px] xl:text-[56px]">
                {isTurkish ? (
                  <>
                    HSE çalışmalarınızı
                    <span className="block text-blue-400">
                      tek platformda yönetin.
                    </span>
                  </>
                ) : (
                  <>
                    Run your HSE work
                    <span className="block text-blue-400">
                      from one platform.
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-6 max-w-[610px] text-[15px] font-medium leading-7 text-slate-300 sm:text-[17px]">
                {isTurkish
                  ? "Risk analizleri, Method Statement'lar, toolbox talk içerikleri, kontrol listeleri, AI rehberliği ve sahaya hazır HSE kaynakları."
                  : "Risk assessments, Method Statements, toolbox talks, checklists, AI guidance and field-ready HSE resources."}
              </p>

              <div className="mt-7 grid max-w-[650px] grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                {[
                  {
                    icon: "◷",
                    title: isTurkish ? "Zaman Kazanın" : "Save Time",
                    text: isTurkish ? "Daha hızlı çalışın." : "Work smarter.",
                  },
                  {
                    icon: "◇",
                    title: isTurkish ? "Riski Azaltın" : "Reduce Risk",
                    text: isTurkish ? "Tehlikeleri belirleyin." : "Identify hazards.",
                  },
                  {
                    icon: "♙",
                    title: isTurkish ? "Sahayı Destekleyin" : "Field Ready",
                    text: isTurkish ? "Pratik HSE araçları." : "Practical HSE tools.",
                  },
                  {
                    icon: "▣",
                    title: isTurkish ? "Profesyonel Çıktı" : "Professional",
                    text: isTurkish ? "PDF ve dokümanlar." : "Documents & PDFs.",
                  },
                ].map((item) => (
                  <div key={item.title} className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.08] text-base text-blue-400">
                        {item.icon}
                      </span>
                      <p className="text-xs font-black text-white sm:text-[13px]">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-2 pl-10 text-[11px] leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
                <Link
                  href={`/${locale}/tools`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
                >
                  {isTurkish ? "Araçları Keşfet" : "Explore Tools"}
                  <ArrowIcon />
                </Link>

                <Link
                  href={`/${locale}/upgrade`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] px-5 py-3.5 text-sm font-black text-amber-300 transition hover:-translate-y-1 hover:bg-amber-400/[0.1]"
                >
                  👑 Premium
                </Link>

                <Link
                  href={`/${locale}/tools/quick-risk-assessment`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-sm font-black text-white transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <ShieldCheck size={18} />
                  {isTurkish ? "Risk Analizi Oluştur" : "Build Risk Assessment"}
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  isTurkish ? "✦ AI destekli" : "✦ AI-powered",
                  "◎ TR / EN",
                  isTurkish ? "✓ Sahaya hazır" : "✓ Field-ready",
                  isTurkish ? "✓ Profesyonel dokümanlar" : "✓ Professional documents",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-[10px] font-bold text-slate-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[700px] lg:-translate-y-2">
              <div className="absolute inset-x-[12%] bottom-[-30px] h-[140px] rounded-full bg-blue-500/20 blur-[80px]" />

              <div className="relative">
                <div className="absolute -right-5 top-[17%] hidden h-[68%] w-[18px] rounded-r-[14px] border border-white/10 bg-slate-900 shadow-2xl lg:block" />

                <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-[#07111f] p-2 shadow-[0_40px_100px_rgba(0,0,0,.6)]">
                  <div className="overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#050c18]">
                    <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <SernemLogo className="h-7 w-7 rounded-lg" />
                        <div>
                          <p className="text-xs font-black tracking-wide text-white">
                            SERNEM
                          </p>
                          <p className="text-[8px] text-slate-500">
                            Professional HSE Platform
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-[8px] text-slate-600 sm:block">
                          {isTurkish ? "HSE araçlarında ara..." : "Search HSE tools..."}
                        </span>
                        <span className="h-7 w-7 rounded-full border border-white/10 bg-gradient-to-br from-blue-500/20 to-emerald-500/10" />
                      </div>
                    </div>

                    <div className="grid min-h-[385px] grid-cols-[112px_1fr] sm:grid-cols-[138px_1fr]">
                      <aside className="border-r border-white/[0.07] bg-black/10 p-3">
                        <p className="px-2 pb-2 text-[8px] font-black uppercase tracking-[0.18em] text-slate-600">
                          Workspace
                        </p>

                        {[
                          ["▣", isTurkish ? "Risk Analizi" : "Risk Assessment"],
                          ["≡", "Method Statement"],
                          ["◈", "Toolbox Talks"],
                          ["✓", isTurkish ? "Kontrol Listeleri" : "Checklists"],
                          ["⌁", isTurkish ? "Hesaplayıcılar" : "Calculators"],
                          ["✦", "SERNEM AI"],
                          ["↓", isTurkish ? "Kaynaklar" : "Downloads"],
                        ].map(([icon, label], index) => (
                          <div
                            key={label}
                            className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-2 text-[9px] font-bold ${
                              index === 0
                                ? "bg-blue-500/[0.12] text-blue-300"
                                : "text-slate-500"
                            }`}
                          >
                            <span className="w-3 text-center text-blue-400">
                              {icon}
                            </span>
                            <span className="truncate">{label}</span>
                          </div>
                        ))}
                      </aside>

                      <div className="p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-400">
                              {isTurkish ? "Risk Analizi" : "Risk Assessment"}
                            </p>
                            <h2 className="mt-1 text-lg font-black text-white sm:text-xl">
                              {isTurkish
                                ? "Profesyonel HIRARC çalışma alanı"
                                : "Professional HIRARC workspace"}
                            </h2>
                          </div>

                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1 text-[9px] font-black text-emerald-300">
                            LIVE
                          </span>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {[
                            ["100", isTurkish ? "Faaliyet" : "Activities"],
                            ["900", isTurkish ? "Hazır Risk" : "Ready Risks"],
                            ["20", "Methods"],
                            ["TR / EN", isTurkish ? "Dil" : "Languages"],
                          ].map(([value, label]) => (
                            <div
                              key={label}
                              className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"
                            >
                              <p className="text-lg font-black tracking-tight text-white">
                                {value}
                              </p>
                              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-slate-500">
                                {label}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-[1.25fr_.75fr]">
                          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] font-black text-white">
                                {isTurkish
                                  ? "Risk değerlendirme kütüphanesi"
                                  : "Risk assessment library"}
                              </p>
                              <span className="text-[8px] text-blue-400">
                                {isTurkish ? "Görüntüle →" : "View →"}
                              </span>
                            </div>

                            <div className="mt-4 space-y-2">
                              {[
                                [isTurkish ? "Sıcak Çalışma" : "Hot Work", "HIGH"],
                                [isTurkish ? "Kapalı Alan" : "Confined Space", "HIGH"],
                                [isTurkish ? "İskele Çalışması" : "Scaffolding", "MED"],
                                [isTurkish ? "Elektrik İşleri" : "Electrical Work", "MED"],
                              ].map(([name, risk], index) => (
                                <div
                                  key={name}
                                  className="grid grid-cols-[1fr_46px] items-center gap-2 rounded-lg border border-white/[0.045] bg-black/10 px-3 py-2"
                                >
                                  <div>
                                    <p className="truncate text-[9px] font-bold text-slate-300">
                                      {name}
                                    </p>
                                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                                      <div
                                        className={`h-full rounded-full ${
                                          index < 2
                                            ? "w-[80%] bg-red-500/70"
                                            : "w-[55%] bg-amber-400/70"
                                        }`}
                                      />
                                    </div>
                                  </div>
                                  <span
                                    className={`text-right text-[7px] font-black ${
                                      index < 2
                                        ? "text-red-400"
                                        : "text-amber-300"
                                    }`}
                                  >
                                    {risk}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="rounded-2xl border border-blue-400/10 bg-blue-500/[0.045] p-4">
                              <div className="flex items-center gap-2">
                                <Bot size={16} className="text-blue-400" />
                                <p className="text-[10px] font-black text-white">
                                  SERNEM AI
                                </p>
                              </div>
                              <p className="mt-3 text-[9px] leading-5 text-slate-400">
                                {isTurkish
                                  ? "HSE sorularınızı kaynaklı bilgi tabanıyla analiz edin."
                                  : "Analyze HSE questions with source-aware guidance."}
                              </p>
                              <Link
                                href={`/${locale}/ai-assistant`}
                                className="mt-3 inline-flex text-[9px] font-black text-blue-300"
                              >
                                {isTurkish ? "AI'ı Aç →" : "Open AI →"}
                              </Link>
                            </div>

                            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500">
                                {isTurkish ? "Hızlı Erişim" : "Quick Access"}
                              </p>
                              <div className="mt-3 space-y-2">
                                {[
                                  ["Method Statement", "20"],
                                  ["Toolbox Talks", "20"],
                                  [isTurkish ? "Kontrol Listeleri" : "Checklists", "6"],
                                  [isTurkish ? "Hesaplayıcılar" : "Calculators", "4"],
                                ].map(([label, count]) => (
                                  <div
                                    key={label}
                                    className="flex items-center justify-between text-[8px]"
                                  >
                                    <span className="text-slate-400">{label}</span>
                                    <span className="font-black text-slate-200">{count}</span>
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

                <div className="mx-auto h-3 w-[84%] rounded-b-[26px] bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#030b16]/95">
          <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8">
            <div className="text-center">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-400">
                {isTurkish
                  ? "TAM HSE İŞ AKIŞI"
                  : "THE COMPLETE HSE WORKFLOW"}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
                {isTurkish
                  ? "Tehlikeden sahaya hazır dokümana."
                  : "From hazard to field-ready document."}
              </h2>
            </div>

            <div className="mt-8 grid gap-3 lg:grid-cols-5">
              {[
                {
                  step: "1",
                  icon: ShieldCheck,
                  title: isTurkish ? "Risk Analizi" : "Risk Assessment",
                  text: isTurkish
                    ? "Tehlikeleri belirleyin ve riski değerlendirin."
                    : "Identify hazards and evaluate risk.",
                  href: `/${locale}/tools/quick-risk-assessment`,
                },
                {
                  step: "2",
                  icon: FileText,
                  title: "Method Statement",
                  text: isTurkish
                    ? "Güvenli çalışma adımlarını oluşturun."
                    : "Define safe work steps and controls.",
                  href: `/${locale}/tools/method-statement`,
                },
                {
                  step: "3",
                  icon: BriefcaseBusiness,
                  title: "Toolbox Talk",
                  text: isTurkish
                    ? "Ekibinizi saha öncesi bilgilendirin."
                    : "Communicate and engage your team.",
                  href: `/${locale}/toolbox`,
                },
                {
                  step: "4",
                  icon: ClipboardCheck,
                  title: isTurkish ? "Kontrol Listesi" : "Checklist",
                  text: isTurkish
                    ? "Saha kontrollerini doğrulayın."
                    : "Inspect and verify in the field.",
                  href: `/${locale}/checklists`,
                },
                {
                  step: "5",
                  icon: Download,
                  title: "PDF",
                  text: isTurkish
                    ? "Profesyonel çıktıyı oluşturun."
                    : "Generate professional output.",
                  href: `/${locale}/downloads`,
                },
              ].map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:-translate-y-1 hover:border-blue-400/25 hover:bg-blue-500/[0.05]"
                >
                  {index < 4 && (
                    <span className="absolute -right-[12px] top-1/2 z-10 hidden -translate-y-1/2 text-xl text-slate-700 lg:block">
                      →
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.07] text-blue-300">
                      <item.icon size={18} />
                    </span>
                    <span className="text-[10px] font-black text-slate-600">
                      0{item.step}
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-black text-white">
                    {item.title}
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-slate-500">
                    {item.text}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-3 border-t border-white/[0.08] pt-7 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: ShieldCheck,
                  title: isTurkish
                    ? "HSE Profesyonelleri İçin"
                    : "Built for HSE Professionals",
                  text: isTurkish
                    ? "Gerçek saha ihtiyaçlarına odaklı."
                    : "Focused on real field needs.",
                },
                {
                  icon: GlobeIcon,
                  title: isTurkish
                    ? "Global HSE Yaklaşımı"
                    : "Global HSE Approach",
                  text: "OSHA • NEBOSH • IOSH",
                },
                {
                  icon: Zap,
                  title: isTurkish ? "Kolay Kullanım" : "Easy to Use",
                  text: isTurkish
                    ? "Hızlı ve sade çalışma alanı."
                    : "Fast, focused workspace.",
                },
                {
                  icon: ShieldCheck,
                  title: isTurkish
                    ? "Profesyonel Dokümanlar"
                    : "Professional Outputs",
                  text: isTurkish
                    ? "Sahaya hazır içerik ve PDF."
                    : "Field-ready content and PDFs.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl px-2 py-2"
                >
                  <span className="mt-0.5 text-blue-400">
                    <item.icon />
                  </span>
                  <div>
                    <p className="text-xs font-black text-slate-200">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-slate-950 px-6 py-14 lg:px-8 lg:py-14 lg:py-18">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-950/20 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.26em] text-emerald-400">
                {isTurkish ? "Platform Özellikleri" : "Platform Highlights"}
              </p>

              <h2 className="mt-4 max-w-2xl text-3xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl">
                {isTurkish ? (
                  <>
                    Günlük HSE işlerinizi
                    <span className="block">daha hızlı tamamlayın.</span>
                  </>
                ) : (
                  <>
                    Complete everyday HSE work
                    <span className="block">faster.</span>
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-xl pb-1 text-[15px] leading-7 text-slate-400 sm:text-base sm:leading-7">
              {isTurkish
                ? "Analizden dokümantasyona, saha kontrollerinden profesyonel rehberliğe kadar SERNEM'in temel araçlarına tek çalışma alanından ulaşın."
                : "From assessments and documentation to field controls and professional guidance, access the core SERNEM toolkit from one connected workspace."}
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: isTurkish
                  ? "Profesyonel Risk Analizi"
                  : "Professional Risk Assessment",
                description: isTurkish
                  ? "100 faaliyet ve 900 hazır risk ile kapsamlı HIRARC değerlendirmeleri oluşturun."
                  : "Build comprehensive HIRARC assessments with 100 activities and 900 ready-to-use risks.",
                href: `/${locale}/tools/quick-risk-assessment`,
                badge: isTurkish ? "100 FAALİYET" : "100 ACTIVITIES",
              },
              {
                icon: FileText,
                title: "Method Statement",
                description: isTurkish
                  ? "20 hazır çalışma yöntemini proje bilgilerinize göre özelleştirin ve PDF oluşturun."
                  : "Customize 20 ready work methods for your project and generate professional PDFs.",
                href: `/${locale}/tools/method-statement`,
                badge: isTurkish ? "20 HAZIR METHOD" : "20 READY METHODS",
              },
              {
                icon: Bot,
                title: isTurkish ? "SERNEM AI" : "SERNEM AI",
                description: isTurkish
                  ? "Saha sorularınızı HSE odaklı bilgi tabanıyla analiz edin ve ilgili kaynaklara ulaşın."
                  : "Analyze field questions with an HSE-focused knowledge base and access relevant sources.",
                href: `/${locale}/ai-assistant`,
                badge: "AI",
              },
              {
                icon: BookOpen,
                title: isTurkish ? "Bilgi Merkezi" : "Knowledge Base",
                description: isTurkish
                  ? "Kritik iş güvenliği konuları için anlaşılır, profesyonel ve pratik rehberlere ulaşın."
                  : "Access clear, professional and practical guidance for critical workplace safety topics.",
                href: `/${locale}/knowledge-base`,
                badge: isTurkish ? "Rehberler" : "Guides",
              },
              {
                icon: ClipboardCheck,
                title: isTurkish ? "Kontrol Listeleri" : "Checklists",
                description: isTurkish
                  ? "Saha kontrolleri ve denetimleri için yapılandırılmış kontrol listelerini kullanın."
                  : "Use structured checklists for field controls and workplace inspections.",
                href: `/${locale}/checklists`,
                badge: isTurkish ? "Saha" : "Field",
              },
              {
                icon: BriefcaseBusiness,
                title: isTurkish ? "Toolbox Kütüphanesi" : "Toolbox Library",
                description: isTurkish
                  ? "Profesyonel Toolbox Talk içerikleriyle günlük saha bilgilendirmelerini hızlandırın."
                  : "Speed up daily field briefings with professional Toolbox Talk resources.",
                href: `/${locale}/toolbox`,
                badge: "Toolbox",
              },
              {
                icon: Calculator,
                title: isTurkish ? "HSE Hesaplayıcıları" : "HSE Calculators",
                description: isTurkish
                  ? "Risk matrisi, TRIR, LTIFR ve Severity Rate hesaplamalarını saniyeler içinde yapın."
                  : "Calculate Risk Matrix, TRIR, LTIFR and Severity Rate in seconds.",
                href: `/${locale}/tools`,
                badge: isTurkish ? "Ücretsiz" : "Free",
              },
              {
                icon: Download,
                title: isTurkish ? "Profesyonel Kaynaklar" : "Professional Resources",
                description: isTurkish
                  ? "Şablonlar, posterler, güvenlik levhaları ve indirilebilir HSE dokümanlarını keşfedin."
                  : "Discover templates, posters, safety signs and downloadable professional HSE documents.",
                href: `/${locale}/downloads`,
                badge: isTurkish ? "Kaynaklar" : "Resources",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-4.5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/[0.065] hover:shadow-2xl hover:shadow-blue-950/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-blue-300 transition group-hover:border-blue-400/30 group-hover:bg-blue-500/[0.08] group-hover:text-blue-200">
                    <item.icon
                      size={22}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-[17px] font-black tracking-[-0.02em] text-white">
                  {item.title}
                </h3>

                <p className="mt-2 flex-1 text-[13px] leading-6 text-slate-400">
                  {item.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-300 transition group-hover:gap-3 group-hover:text-blue-200">
                  {isTurkish ? "Keşfet" : "Explore"}
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950 py-14 lg:py-18 lg:py-14 lg:py-18">
        <div className="absolute left-[-200px] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="absolute right-[-180px] top-[-120px] h-[460px] w-[460px] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
              {isTurkish ? "Neden SERNEM?" : "Why SERNEM?"}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {isTurkish
                ? "HSE işlerinizi tek bir çalışma sistemine dönüştürün."
                : "Turn fragmented HSE work into one connected workflow."}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              {isTurkish
                ? "Farklı dosyalar, araçlar ve kaynaklar arasında kaybolmak yerine günlük HSE çalışmalarınızı tek platformdan yönetin."
                : "Instead of jumping between disconnected files, tools and resources, manage everyday HSE work from one professional platform."}
            </p>
          </div>

          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Boxes,
                title: isTurkish ? "Tek Platform" : "One Platform",
                description: isTurkish
                  ? "Analizler, dokümanlar, rehberler ve saha kaynakları tek merkezde."
                  : "Assessments, documents, guidance and field resources in one place.",
              },
              {
                icon: Zap,
                title: isTurkish ? "Daha Hızlı İş Akışı" : "Faster Workflow",
                description: isTurkish
                  ? "Tekrarlayan HSE işlerini hazır içerik ve profesyonel araçlarla hızlandırın."
                  : "Speed up repetitive HSE tasks using ready content and professional tools.",
              },
              {
                icon: Target,
                title: isTurkish ? "Sahaya Odaklı" : "Field Focused",
                description: isTurkish
                  ? "Teorik içerikten öte, gerçek saha ihtiyaçlarına göre hazırlanmış araçları kullanın."
                  : "Use tools built around real field requirements, not generic theory.",
              },
              {
                icon: TrendingUp,
                title: isTurkish ? "Sürekli Gelişen" : "Continuously Growing",
                description: isTurkish
                  ? "Yeni araçlar, şablonlar ve profesyonel kaynaklarla büyüyen bir platform."
                  : "A platform that keeps expanding with new tools, templates and professional resources.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-blue-300">
                  <item.icon
                    size={22}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 text-lg font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.065] via-white/[0.035] to-blue-500/[0.035] shadow-2xl shadow-black/20">
            <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r">
                <div className="absolute left-[-90px] top-[-90px] h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-400">
                    {isTurkish ? "Kimler İçin?" : "Built For"}
                  </p>

                  <h3 className="mt-4 max-w-md text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                    {isTurkish
                      ? "Sahada güvenliği yöneten profesyoneller için."
                      : "Built for professionals responsible for safety in the field."}
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-[15px]">
                    {isTurkish
                      ? "SERNEM; günlük saha çalışmalarında hız, tutarlılık ve profesyonel çıktı isteyen HSE ekipleri için tasarlandı."
                      : "SERNEM is designed for HSE teams that need faster workflows, consistent processes and professional field-ready outputs."}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-7 sm:p-9">
                <div className="grid w-full gap-3 sm:grid-cols-2">
                  {(isTurkish
                    ? [
                        "HSE Uzmanları",
                        "İş Güvenliği Mühendisleri",
                        "Saha Süpervizörleri",
                        "İnşaat Projeleri",
                        "Petrol ve Gaz",
                        "Üretim Tesisleri",
                        "Kimya Tesisleri",
                        "Bakım Ekipleri",
                      ]
                    : [
                        "HSE Officers",
                        "Safety Engineers",
                        "Site Supervisors",
                        "Construction Projects",
                        "Oil & Gas",
                        "Manufacturing",
                        "Chemical Plants",
                        "Maintenance Teams",
                      ]
                  ).map((item) => (
                    <div
                      key={item}
                      className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-slate-950/35 px-4 py-3.5 text-sm font-bold text-slate-300 transition duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-[11px] text-emerald-400">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase locale={safeLocale} />

      <LocalizedFooter locale={safeLocale} />
          </div>
    </main>
  );
}
