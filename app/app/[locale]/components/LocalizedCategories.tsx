import Link from "next/link";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedCategories({ locale }: Props) {
  const isTurkish = locale === "tr";

  const categories = [
    {
      icon: "🧮",
      title: isTurkish ? "İş Güvenliği Hesaplayıcıları" : "Safety Calculators",
      description: isTurkish
        ? "Risk matrisi, TRIR, LTIFR ve diğer pratik HSE hesaplamaları."
        : "Risk matrix, TRIR, LTIFR and other practical HSE calculations.",
      href: "/tools",
      comingSoon: false,
      badge: isTurkish ? "Aktif" : "Available",
      accent: "blue",
    },
    {
      icon: "✅",
      title: isTurkish ? "Denetim Kontrol Listeleri" : "Inspection Checklists",
      description: isTurkish
        ? "Kritik saha faaliyetleri için yapılandırılmış denetim kontrol listeleri."
        : "Structured field inspection checklists for critical site activities.",
      href: "/checklists",
      comingSoon: false,
      badge: isTurkish ? "Aktif" : "Available",
      accent: "emerald",
    },
    {
      icon: "📄",
      title: isTurkish ? "HSE Şablonları" : "HSE Templates",
      description: isTurkish
        ? "Kullanıma hazır formlar, raporlar, izinler ve iş güvenliği dokümanları."
        : "Ready-to-use forms, reports, permits and safety documentation.",
      href: "/templates",
      comingSoon: true,
      badge: isTurkish ? "Geliştiriliyor" : "In Development",
      accent: "violet",
    },
    {
      icon: "📚",
      title: isTurkish ? "Bilgi Merkezi" : "Knowledge Base",
      description: isTurkish
        ? "HSE profesyonelleri için anlaşılır ve pratik iş güvenliği rehberleri."
        : "Clear and practical safety guidance for HSE professionals.",
      href: "/knowledge",
      comingSoon: true,
      badge: isTurkish ? "Geliştiriliyor" : "In Development",
      accent: "cyan",
    },
  ];

  const accentStyles = {
    blue: {
      icon: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
      glow: "group-hover:shadow-blue-500/10",
      line: "from-blue-500 to-cyan-400",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
      glow: "group-hover:shadow-emerald-500/10",
      line: "from-emerald-500 to-teal-400",
    },
    violet: {
      icon: "bg-violet-500/10 text-violet-600 ring-violet-500/20",
      glow: "group-hover:shadow-violet-500/10",
      line: "from-violet-500 to-fuchsia-400",
    },
    cyan: {
      icon: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20",
      glow: "group-hover:shadow-cyan-500/10",
      line: "from-cyan-500 to-blue-400",
    },
  } as const;

  return (
    <section
      id="categories"
      className="relative overflow-hidden border-y border-slate-200 bg-slate-50 px-6 py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[900px] -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              {isTurkish ? "SafeBase'i Keşfet" : "Explore SafeBase"}
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-5xl">
              {isTurkish
                ? "Pratik iş güvenliği çalışmaları için ihtiyacınız olan her şey"
                : "Everything you need for practical safety work"}
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {isTurkish
                ? "Günlük HSE çalışmalarını daha hızlı, anlaşılır ve tutarlı hale getirmek için tasarlanmış profesyonel araçları ve kaynakları kullanın."
                : "Use professional tools and resources designed to make daily HSE work faster, clearer and more consistent."}
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🛡️
            </span>

            <div>
              <p className="text-sm font-bold text-slate-950">
                {isTurkish ? "Tek platform" : "One platform"}
              </p>
              <p className="text-sm text-slate-500">
                {isTurkish
                  ? "Araçlar, bilgi ve rehberlik"
                  : "Tools, knowledge and guidance"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const styles =
              accentStyles[category.accent as keyof typeof accentStyles];

            const card = (
              <article
                className={`group relative h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 ${
                  category.comingSoon
                    ? "opacity-80"
                    : `hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl ${styles.glow}`
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.line} ${
                    category.comingSoon
                      ? "opacity-30"
                      : "opacity-0 transition group-hover:opacity-100"
                  }`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ring-1 ${styles.icon}`}
                  >
                    {category.icon}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      category.comingSoon
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {category.badge}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-black tracking-tight text-slate-950">
                  {category.title}
                </h3>

                <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <span
                    className={`inline-flex items-center gap-2 font-black transition ${
                      category.comingSoon
                        ? "text-slate-400"
                        : "text-blue-600 group-hover:gap-3"
                    }`}
                  >
                    {category.comingSoon
                      ? isTurkish
                        ? "Yakında kullanıma açılacak"
                        : "Available soon"
                      : isTurkish
                        ? "Keşfet"
                        : "Explore"}

                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            );

            if (category.comingSoon) {
              return <div key={category.title}>{card}</div>;
            }

            return (
              <Link
                key={category.title}
                href={`/${locale}${category.href}`}
                className="block h-full"
              >
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
