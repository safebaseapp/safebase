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
          className="absolute inset-0 -z-30 bg-cover bg-[center_52%] bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/sernem-hse-hero.png')",
          }}
        />

        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,8,23,0.88)_0%,rgba(2,8,23,0.72)_30%,rgba(2,8,23,0.30)_52%,rgba(2,8,23,0.08)_72%,rgba(2,8,23,0.10)_100%)]" />

        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(2,8,23,0.05)_0%,rgba(2,8,23,0.01)_68%,rgba(2,8,23,0.30)_100%)]" />

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
          <div className="grid items-center gap-8 lg:grid-cols-1 xl:gap-12">
            <div className="relative z-10 max-w-[720px]">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-300 sm:text-sm">
                {isTurkish
                  ? "DAHA AKILLI HSE. DAHA GÜVENLİ YARIN."
                  : "SMARTER HSE. SAFER TOMORROW."}
              </p>

              <h1 className="mt-5 max-w-[720px] text-[40px] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[49px] lg:text-[51px] xl:text-[56px]">
                {isTurkish ? (
                  <>
                    HSE çalışmalarınızı
                    <span className="block text-blue-300">
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
                    <p className="mt-2 pl-10 text-[11px] leading-5 text-slate-400">
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

            <div className="relative mx-auto w-full max-w-[670px] lg:-translate-y-2">
              <div className="absolute inset-x-[12%] bottom-[-30px] h-[140px] rounded-full bg-blue-500/20 blur-[80px]" />

              <div className="relative">
                <div className="absolute -right-5 top-[17%] hidden h-[68%] w-[18px] rounded-r-[14px] border border-white/10 bg-slate-900 shadow-2xl lg:block" />

                

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

            <div className="relative mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
  {[
    {
      no: "01",
      short: locale === "tr" ? "RA" : "RA",
      title: locale === "tr" ? "Risk Analizi" : "Risk Assessment",
      desc:
        locale === "tr"
          ? "Tehlikeleri belirleyin, risk seviyesini değerlendirin."
          : "Identify hazards and evaluate the level of risk.",
      type: "risk",
      dot: "bg-red-500",
      text: "text-red-400",
    },
    {
      no: "02",
      short: locale === "tr" ? "ÇY" : "MS",
      title: locale === "tr" ? "Çalışma Yöntemi" : "Method Statement",
      desc:
        locale === "tr"
          ? "Güvenli çalışma adımlarını ve kontrol tedbirlerini tanımlayın."
          : "Define safe work steps and control measures.",
      type: "method",
      dot: "bg-blue-500",
      text: "text-blue-400",
    },
    {
      no: "03",
      short: locale === "tr" ? "TK" : "TB",
      title: locale === "tr" ? locale === "tr" ? "Toolbox Konuşması" : "Toolbox Talk" : locale === "tr" ? "Toolbox Konuşması" : "Toolbox Talk",
      desc:
        locale === "tr"
          ? "Ekibinizi işe özel riskler ve kontroller hakkında bilgilendirin."
          : "Brief your team on task-specific risks and controls.",
      type: "toolbox",
      dot: "bg-amber-400",
      text: "text-amber-400",
    },
    {
      no: "04",
      short: locale === "tr" ? "KL" : "CL",
      title: locale === "tr" ? "Kontrol Listesi" : "Checklist",
      desc:
        locale === "tr"
          ? "Kontrollerin sahada uygulandığını doğrulayın."
          : "Inspect and verify controls directly in the field.",
      type: "checklist",
      dot: "bg-emerald-400",
      text: "text-emerald-400",
    },
    {
      no: "05",
      short: "PDF",
      title: "PDF",
      desc:
        locale === "tr"
          ? "Profesyonel dokümanınızı oluşturun ve paylaşın."
          : "Generate and share professional documentation.",
      type: "pdf",
      dot: "bg-violet-400",
      text: "text-violet-400",
    },
  ].map((step, index) => (
    <div
      key={step.no}
      className="group relative overflow-visible rounded-2xl border border-white/10 bg-[#07111f]/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#091625]"
    >
      {index < 4 && (
        <div className="absolute -right-[18px] top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500/35 bg-[#020817] text-lg font-bold text-blue-400 shadow-[0_0_24px_rgba(59,130,246,0.15)] xl:flex">
          →
        </div>
      )}

      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 min-w-11 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/10 px-2 text-[11px] font-black tracking-wide ${step.text}`}
        >
          {step.short}
        </div>

        <span className="text-[11px] font-black tracking-[0.22em] text-slate-600">
          {step.no}
        </span>
      </div>

      <div className="mt-5 min-h-[104px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#030b16] p-4 shadow-inner">
        {step.type === "risk" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                {locale === "tr" ? "Risk Matrisi" : "Risk Matrix"}
              </span>
              <span className="rounded bg-red-500/10 px-2 py-0.5 text-[9px] font-bold text-red-400">
                HIGH
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {[
                "bg-emerald-500/70",
                "bg-emerald-500/70",
                "bg-amber-400/75",
                "bg-orange-500/75",
                "bg-red-500/75",
                "bg-emerald-500/70",
                "bg-amber-400/75",
                "bg-amber-400/75",
                "bg-orange-500/75",
                "bg-red-500/75",
                "bg-amber-400/75",
                "bg-amber-400/75",
                "bg-orange-500/75",
                "bg-red-500/75",
                "bg-red-500/75",
              ].map((color, i) => (
                <div key={i} className={`h-3 rounded-[3px] ${color}`} />
              ))}
            </div>
          </div>
        )}

        {step.type === "method" && (
          <div>
            <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {locale === "tr" ? "Çalışma Adımları" : "Work Steps"}
            </div>

            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-blue-400/25 bg-blue-500/10 text-[8px] font-black text-blue-400">
                    {i}
                  </div>
                  <div className="h-1.5 flex-1 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        )}

        {step.type === "toolbox" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                {locale === "tr" ? "Ekip Bilgilendirme" : "Team Briefing"}
              </span>
              <span className="text-[9px] font-bold text-amber-400">
                8 MIN
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#030b16] bg-amber-400/10 text-[8px] font-black text-amber-300"
                  >
                    HSE
                  </div>
                ))}
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-1.5 w-full rounded-full bg-amber-400/25" />
                <div className="h-1.5 w-[72%] rounded-full bg-white/10" />
                <div className="h-1.5 w-[52%] rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        )}

        {step.type === "checklist" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                {locale === "tr" ? "Saha Kontrolü" : "Field Check"}
              </span>
              <span className="text-[9px] font-bold text-emerald-400">
                3 / 3
              </span>
            </div>

            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-emerald-400/40 bg-emerald-500/10 text-[9px] text-emerald-300">
                    ✓
                  </div>
                  <div className="h-1.5 flex-1 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        )}

        {step.type === "pdf" && (
          <div>
            <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {locale === "tr" ? "Profesyonel Çıktı" : "Professional Output"}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                <span className="text-[9px] font-black text-red-400">PDF</span>
                <div className="absolute right-0 top-0 h-3 w-3 border-b border-l border-white/10 bg-[#07111f]" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-1.5 w-full rounded-full bg-white/10" />
                <div className="h-1.5 w-[82%] rounded-full bg-white/10" />
                <div className="h-1.5 w-[62%] rounded-full bg-violet-400/25" />
                <div className="mt-2 h-1 w-[44%] rounded-full bg-blue-500/35" />
              </div>
            </div>
          </div>
        )}
      </div>

      <h3 className="mt-5 text-lg font-black text-white">
        {step.title}
      </h3>

      <p className="mt-2 min-h-[52px] text-sm leading-6 text-slate-400">
        {step.desc}
      </p>

      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
          <span className={`h-1.5 w-1.5 rounded-full ${step.dot}`} />
          SERNEM Workflow
        </div>
      </div>
    </div>
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
                    <p className="mt-1 text-[10px] leading-5 text-slate-400">
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
                    Saha işlerinden profesyonel çıktıya,
                    <span className="block">her şey tek yerde.</span>
                  </>
                ) : (
                  <>
                    From field work to professional output,
                    <span className="block">everything in one place.</span>
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-xl pb-1 text-[15px] leading-7 text-slate-400 sm:text-base sm:leading-7">
              {isTurkish
                ? "Risk analizinden saha kontrollerine, hesaplayıcılardan AI rehberliğine kadar SERNEM'in temel HSE araçlarına tek çalışma alanından ulaşın."
                : "From assessments and documentation to field controls and professional guidance, access the core SERNEM toolkit from one connected workspace."}
            </p>
          </div>

          <div className="
  mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-6

  [&>*]:relative
  [&>*]:overflow-hidden
  [&>*]:!rounded-2xl
  [&>*]:transition-all
  [&>*]:duration-300
  [&>*]:hover:-translate-y-1
  [&>*]:hover:!border-blue-500/30
  [&>*]:hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)]

  [&>*:nth-child(1)]:xl:order-1
  [&>*:nth-child(3)]:xl:order-2

  [&>*:nth-child(1)]:xl:col-span-3
  [&>*:nth-child(3)]:xl:col-span-3

  [&>*:nth-child(2)]:xl:order-3
  [&>*:nth-child(4)]:xl:order-4
  [&>*:nth-child(5)]:xl:order-5
  [&>*:nth-child(6)]:xl:order-6
  [&>*:nth-child(7)]:xl:order-7
  [&>*:nth-child(8)]:xl:order-8

  [&>*:nth-child(2)]:xl:col-span-2
  [&>*:nth-child(4)]:xl:col-span-2
  [&>*:nth-child(5)]:xl:col-span-2
  [&>*:nth-child(6)]:xl:col-span-2
  [&>*:nth-child(7)]:xl:col-span-2
  [&>*:nth-child(8)]:xl:col-span-2

  [&>*:nth-child(1)]:xl:min-h-[300px]
  [&>*:nth-child(3)]:xl:min-h-[300px]

  [&>*:nth-child(1)]:!border-blue-500/30 [&>*:nth-child(1)]:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_28px_80px_rgba(0,0,0,0.30)]
  [&>*:nth-child(3)]:!border-emerald-500/25 [&>*:nth-child(3)]:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_28px_80px_rgba(0,0,0,0.30)]

  [&>*:nth-child(1)]:!bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.16),transparent_42%),#07111f]
  [&>*:nth-child(3)]:!bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.12),transparent_42%),#07111f]

  [&>*:nth-child(1)_h3]:xl:text-2xl
  [&>*:nth-child(3)_h3]:xl:text-2xl

  [&>*:nth-child(1)_p]:xl:max-w-xl
  [&>*:nth-child(3)_p]:xl:max-w-xl

  [&>*:nth-child(1)]:xl:p-7
  [&>*:nth-child(3)]:xl:p-7
">
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
