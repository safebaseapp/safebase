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
      icon: "📊",
      title: isTurkish ? "Risk Matrisi" : "Risk Matrix",
      description: isTurkish
        ? "İşyeri risklerini olasılık ve şiddet değerlerini kullanarak değerlendirin."
        : "Evaluate risk levels using likelihood and severity values.",
      href: "/tools/risk-matrix",
    },
    {
      icon: "📈",
      title: "TRIR Calculator",
      description: isTurkish
        ? "Kaydedilebilir vakalar ve toplam çalışma saatlerini kullanarak Toplam Kaydedilebilir Olay Oranını hesaplayın."
        : "Calculate the Total Recordable Incident Rate using recordable cases and total hours worked.",
      href: "/tools/trir",
    },
    {
      icon: "🦺",
      title: "LTIFR Calculator",
      description: isTurkish
        ? "Kayıp zamanlı yaralanmalar ve toplam çalışma saatlerini kullanarak Kayıp Zamanlı Yaralanma Sıklık Oranını hesaplayın."
        : "Calculate the Lost Time Injury Frequency Rate using lost time injuries and total hours worked.",
      href: "/tools/ltifr",
    },
    {
      icon: "📉",
      title: isTurkish
        ? "Şiddet Oranı Hesaplayıcı"
        : "Severity Rate Calculator",
      description: isTurkish
        ? "Kayıp iş günü ve toplam çalışma saati verilerini kullanarak yaralanma şiddet oranını hesaplayın."
        : "Calculate injury severity using lost workdays and total hours worked.",
      href: "/tools/severity-rate",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
            {isTurkish ? "SafeBase Araçları" : "SafeBase Tools"}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {isTurkish
              ? "İş Güvenliği Hesaplayıcıları"
              : "Safety Calculators"}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            {isTurkish
              ? "Güvenlik analizlerini daha hızlı, anlaşılır ve tutarlı hale getiren pratik HSE hesaplayıcıları."
              : "Practical HSE calculators designed to make safety analysis faster, clearer and more consistent."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={`/${locale}${tool.href}`}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
                  {tool.icon}
                </div>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {isTurkish ? "Kullanılabilir" : "Available"}
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                {tool.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                {tool.description}
              </p>

              <div className="mt-6 font-semibold text-blue-400 transition group-hover:translate-x-1">
                {isTurkish
                  ? "Hesaplayıcıyı Aç →"
                  : "Open Calculator →"}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
