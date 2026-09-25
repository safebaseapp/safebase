import ActivityTracker from "@/components/analytics/ActivityTracker";
import SafetyPackPromo from "@/components/safety-pack/SafetyPackPromo";
import {riskActivityCount, riskHazardCount} from "@/lib/risk-library/all-activities";
import Link from "next/link";
import {hasLocale} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "../../../i18n/routing";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function LocalizedToolsPage({params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isTurkish = locale === "tr";

  const tools = [
    {
      icon: "◇",
      title: isTurkish ? "Risk Analizi" : "Risk Assessment",
      description: isTurkish
        ? `${riskActivityCount} faaliyet ve ${riskHazardCount} hazır tehlike kaydıyla profesyonel HIRARC risk değerlendirmesi oluşturun.`
        : `Build professional HIRARC risk assessments with ${riskActivityCount} activities and ${riskHazardCount} ready-to-use hazard records.`,
      href: "/tools/quick-risk-assessment",
    },
    {
      icon: "▤",
      title: isTurkish ? "Çalışma Yöntemi" : "Method Statement",
      description: isTurkish
        ? "Hazır profesyonel şablonları düzenleyin ve sahaya uygun çalışma yöntemi dokümanları oluşturun."
        : "Customize professional templates and generate field-ready method statement documents.",
      href: "/tools/method-statement",
    },
    {
      icon: "◆",
      title: isTurkish ? "Saha Güvenlik Paketleri" : "Safety Packs",
      description: isTurkish
        ? "Rehber, toolbox, denetim ve araçları tek saha akışında bir araya getirin."
        : "Connect guides, toolbox talks, inspections and tools in one field workflow.",
      href: "/safety-pack",
    },
    {
      icon: "◈",
      title: isTurkish ? "KKD Standartları" : "PPE Standards",
      description: isTurkish
        ? "EN ve EN ISO kodlarını, ürün sınıflarını ve saha kontrol noktalarını inceleyin."
        : "Review EN and EN ISO codes, product classes and practical field checks.",
      href: "/ppe-standards",
    },
    {
      icon: "▦",
      title: isTurkish ? "Risk Matrisi" : "Risk Matrix",
      description: isTurkish
        ? "Olasılık ve şiddet değerlerini kullanarak risk seviyesini hesaplayın."
        : "Calculate risk levels using likelihood and severity values.",
      href: "/tools/risk-matrix",
    },
    {
      icon: "↗",
      title: "TRIR",
      description: isTurkish
        ? "Toplam Kaydedilebilir Olay Oranını çalışma saatleri ve kaydedilebilir vakalarla hesaplayın."
        : "Calculate Total Recordable Incident Rate from recordable cases and hours worked.",
      href: "/tools/trir",
    },
    {
      icon: "⌁",
      title: "LTIFR",
      description: isTurkish
        ? "Kayıp zamanlı yaralanma sıklık oranını toplam çalışma saatleriyle hesaplayın."
        : "Calculate Lost Time Injury Frequency Rate from lost-time injuries and hours worked.",
      href: "/tools/ltifr",
    },
    {
      icon: "⚡",
      title: isTurkish ? "Şiddet Oranı" : "Severity Rate",
      description: isTurkish
        ? "Kayıp iş günlerinin iş kazası performansına etkisini ölçün."
        : "Measure the severity impact of lost workdays on safety performance.",
      href: "/tools/severity-rate",
    },
    {
      icon: "◎",
      title: "SIMOPS",
      description: isTurkish
        ? "Eş zamanlı operasyonları, arayüzleri ve çalışma çakışmalarını yönetin."
        : "Manage simultaneous operations, interfaces and work conflicts.",
      href: "/tools/simops",
    },
  ];

  return (
    <>
      <ActivityTracker eventName="tools_open" />
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
              {isTurkish ? "SERNEM Araçları" : "SERNEM Tools"}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {isTurkish ? "İş Güvenliği Araçları" : "HSE Tools"}
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              {isTurkish
                ? "Risk değerlendirmesi, dokümantasyon, standartlar ve HSE performansı için dokuz saha aracı."
                : "Nine field-ready tools for risk assessment, documentation, standards and HSE performance."}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={`/${locale}${tool.href}`}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">{tool.icon}</div>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {isTurkish ? "Kullanılabilir" : "Available"}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold text-white">{tool.title}</h2>
                <p className="mt-3 leading-7 text-slate-400">{tool.description}</p>

                <div className="mt-6 font-semibold text-blue-400 transition group-hover:translate-x-1">
                  {isTurkish ? "Aracı Aç →" : "Open Tool →"}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SafetyPackPromo locale={locale as "tr" | "en"} />
    </>
  );
}
