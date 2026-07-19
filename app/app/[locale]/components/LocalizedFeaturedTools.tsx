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
      icon: "🧮",
      label: isTurkish ? "Popüler" : "Popular",
      accent: "blue",
    },
    {
      title: "TRIR Calculator",
      description: isTurkish
        ? "Toplam Kaydedilebilir Olay Oranını hesaplayın."
        : "Calculate Total Recordable Incident Rate.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/trir",
      available: true,
      icon: "📊",
      label: isTurkish ? "Ücretsiz" : "Free",
      accent: "emerald",
    },
    {
      title: "LTIFR Calculator",
      description: isTurkish
        ? "Kayıp Zamanlı Yaralanma Sıklık Oranını hesaplayın."
        : "Calculate Lost Time Injury Frequency Rate.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/ltifr",
      available: true,
      icon: "📈",
      label: isTurkish ? "Önerilen" : "Recommended",
      accent: "violet",
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
      icon: "📉",
      label: isTurkish ? "Ücretsiz" : "Free",
      accent: "cyan",
    },
    {
      title: isTurkish ? "İskele Denetimi" : "Scaffold Inspection",
      description: isTurkish
        ? "Yapılandırılmış bir iskele güvenliği denetimi gerçekleştirin."
        : "Complete a structured scaffold safety inspection.",
      type: isTurkish ? "Kontrol Listesi" : "Checklist",
      href: "#",
      available: false,
      icon: "🏗️",
      label: isTurkish ? "Geliştiriliyor" : "In Development",
      accent: "amber",
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
      icon: "🔥",
      label: isTurkish ? "Geliştiriliyor" : "In Development",
      accent: "rose",
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
      icon: "📄",
      label: isTurkish ? "Planlandı" : "Planned",
      accent: "slate",
    },
  ];

  const accentStyles = {
    blue: {
      icon: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
      line: "from-blue-600 to-cyan-400",
      shadow: "hover:shadow-blue-500/10",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
      line: "from-emerald-500 to-teal-400",
      shadow: "hover:shadow-emerald-500/10",
    },
    violet: {
      icon: "bg-violet-500/10 text-violet-600 ring-violet-500/20",
      line: "from-violet-500 to-fuchsia-400",
      shadow: "hover:shadow-violet-500/10",
    },
    cyan: {
      icon: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20",
      line: "from-cyan-500 to-blue-400",
      shadow: "hover:shadow-cyan-500/10",
    },
    amber: {
      icon: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
      line: "from-amber-500 to-orange-400",
      shadow: "",
    },
    rose: {
      icon: "bg-rose-500/10 text-rose-600 ring-rose-500/20",
      line: "from-rose-500 to-orange-400",
      shadow: "",
    },
    slate: {
      icon: "bg-slate-500/10 text-slate-600 ring-slate-500/20",
      line: "from-slate-500 to-slate-300",
      shadow: "",
    },
  } as const;

  return (
    <section
      id="tools"
      className="relative overflow-hidden bg-white px-6 py-24"
    >
      <div className="pointer-events-none absolute right-[-180px] top-[-100px] h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              {isTurkish ? "Öne Çıkan Araçlar" : "Featured Tools"}
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-5xl">
              {isTurkish
                ? "En kullanışlı iş güvenliği araçlarıyla başlayın"
                : "Start with the most useful safety tools"}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {isTurkish
                ? "Günlük HSE çalışmaları için geliştirilmiş hızlı, ücretsiz ve pratik araçlar."
                : "Fast, free and practical tools built for everyday HSE work."}
            </p>
          </div>

          <Link
            href={`/${locale}/tools`}
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
          >
            {isTurkish ? "Tüm araçları görüntüle" : "View all tools"}
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const styles =
              accentStyles[tool.accent as keyof typeof accentStyles];

            const cardContent = (
              <article
                className={`group relative h-full overflow-hidden rounded-[28px] border bg-slate-50 p-7 transition duration-300 ${
                  tool.available
                    ? `border-slate-200 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-2xl ${styles.shadow}`
                    : "border-slate-200 opacity-75"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.line} ${
                    tool.available
                      ? "opacity-0 transition group-hover:opacity-100"
                      : "opacity-30"
                  }`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ring-1 transition duration-300 ${
                      styles.icon
                    } ${tool.available ? "group-hover:scale-110" : ""}`}
                  >
                    {tool.icon}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      tool.available
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {tool.label}
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                    {tool.type}
                  </span>

                  <span
                    className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider ${
                      tool.available ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        tool.available
                          ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                          : "bg-slate-300"
                      }`}
                    />

                    {tool.available
                      ? isTurkish
                        ? "Aktif"
                        : "Live"
                      : isTurkish
                        ? "Yakında"
                        : "Coming Soon"}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
                  {tool.title}
                </h3>

                <p className="mt-4 min-h-[52px] text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>

                <div className="mt-8 border-t border-slate-200 pt-5">
                  <span
                    className={`inline-flex items-center gap-2 font-black transition ${
                      tool.available
                        ? "text-blue-600 group-hover:gap-3"
                        : "text-slate-400"
                    }`}
                  >
                    {tool.available
                      ? isTurkish
                        ? "Aracı aç"
                        : "Open tool"
                      : isTurkish
                        ? "Yakında kullanıma açılacak"
                        : "Available soon"}

                    <span aria-hidden="true">→</span>
                  </span>
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
                className="block h-full"
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