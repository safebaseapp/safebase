import Link from "next/link";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedFeaturedTools({ locale }: Props) {
  const isTurkish = locale === "tr";

  const tools = [
    {
      title: isTurkish
        ? "Risk Matrisi Hesaplayıcı"
        : "Risk Matrix Calculator",
      description: isTurkish
        ? "İşyeri risklerini olasılık ve şiddet değerlerine göre değerlendirin."
        : "Evaluate and classify workplace risks quickly.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/risk-matrix",
      available: true,
    },
    {
      title: "TRIR Calculator",
      description: isTurkish
        ? "Toplam Kaydedilebilir Olay Oranını hesaplayın."
        : "Calculate Total Recordable Incident Rate.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/trir",
      available: true,
    },
    {
      title: "LTIFR Calculator",
      description: isTurkish
        ? "Kayıp Zamanlı Yaralanma Sıklık Oranını hesaplayın."
        : "Calculate Lost Time Injury Frequency Rate.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/ltifr",
      available: true,
    },
    {
      title: isTurkish
        ? "Şiddet Oranı Hesaplayıcı"
        : "Severity Rate Calculator",
      description: isTurkish
        ? "Kayıp iş günü verilerini kullanarak yaralanma şiddetini ölçün."
        : "Measure injury severity using lost workdays.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/severity-rate",
      available: true,
    },
    {
      title: isTurkish ? "İskele Denetimi" : "Scaffold Inspection",
      description: isTurkish
        ? "Yapılandırılmış bir iskele güvenliği denetimi gerçekleştirin."
        : "Complete a structured scaffold safety inspection.",
      type: isTurkish ? "Kontrol Listesi" : "Checklist",
      href: "#",
      available: false,
    },
    {
      title: isTurkish
        ? "Sıcak İş Kontrol Listesi"
        : "Hot Work Checklist",
      description: isTurkish
        ? "Sıcak işe başlamadan önce kritik kontrolleri doğrulayın."
        : "Verify critical controls before hot work starts.",
      type: isTurkish ? "Kontrol Listesi" : "Checklist",
      href: "#",
      available: false,
    },
    {
      title: isTurkish
        ? "Toolbox Talk Şablonu"
        : "Toolbox Talk Template",
      description: isTurkish
        ? "Açık, düzenli ve pratik toolbox talk dokümanları hazırlayın."
        : "Create clear and practical toolbox talk documents.",
      type: isTurkish ? "Şablon" : "Template",
      href: "#",
      available: false,
    },
  ];

  return (
    <section id="tools" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              {isTurkish ? "Öne Çıkan Araçlar" : "Featured Tools"}
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {isTurkish
                ? "En kullanışlı iş güvenliği araçlarıyla başlayın"
                : "Start with the most useful safety tools"}
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              {isTurkish
                ? "Günlük HSE çalışmaları için tasarlanmış pratik araçlar."
                : "Practical tools designed for everyday HSE work."}
            </p>
          </div>

          <Link
            href={`/${locale}/tools`}
            className="w-fit rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {isTurkish ? "Tüm araçları görüntüle" : "View all tools"}
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const cardContent = (
              <article
                className={`h-full rounded-3xl border bg-slate-50 p-7 transition ${
                  tool.available
                    ? "border-slate-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                    : "border-slate-200 opacity-75"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {tool.type}
                  </span>

                  <span
                    className={`text-sm font-medium ${
                      tool.available
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  >
                    {tool.available
                      ? isTurkish
                        ? "Kullanılabilir"
                        : "Available"
                      : isTurkish
                        ? "Yakında"
                        : "Coming soon"}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-950">
                  {tool.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>

                <div
                  className={`mt-6 font-semibold ${
                    tool.available ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  {tool.available
                    ? isTurkish
                      ? "Aracı aç →"
                      : "Open tool →"
                    : isTurkish
                      ? "Yakında kullanılabilir"
                      : "Available soon"}
                </div>
              </article>
            );

            if (!tool.available) {
              return <div key={tool.title}>{cardContent}</div>;
            }

            return (
              <Link
                key={tool.title}
                href={`/${locale}${tool.href}`}
                className="block"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
