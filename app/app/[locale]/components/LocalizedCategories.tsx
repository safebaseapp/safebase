import Link from "next/link";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedCategories({ locale }: Props) {
  const isTurkish = locale === "tr";

  const categories = [
    {
      icon: "🧮",
      title: isTurkish
        ? "İş Güvenliği Hesaplayıcıları"
        : "Safety Calculators",
      description: isTurkish
        ? "Risk matrisi, TRIR, LTIFR ve diğer pratik HSE hesaplamaları."
        : "Risk matrix, TRIR, LTIFR and other practical HSE calculations.",
      href: "/tools",
      comingSoon: false,
    },
    {
      icon: "✅",
      title: isTurkish
        ? "Denetim Kontrol Listeleri"
        : "Inspection Checklists",
      description: isTurkish
        ? "Kritik saha faaliyetleri için yapılandırılmış denetim kontrol listeleri."
        : "Structured field inspection checklists for critical site activities.",
      href: "/checklists",
      comingSoon: true,
    },
    {
      icon: "📄",
      title: isTurkish ? "HSE Şablonları" : "HSE Templates",
      description: isTurkish
        ? "Kullanıma hazır formlar, raporlar, izinler ve iş güvenliği dokümanları."
        : "Ready-to-use forms, reports, permits and safety documentation.",
      href: "/templates",
      comingSoon: true,
    },
    {
      icon: "📚",
      title: isTurkish ? "Bilgi Merkezi" : "Knowledge Base",
      description: isTurkish
        ? "HSE profesyonelleri için anlaşılır ve pratik iş güvenliği rehberleri."
        : "Clear and practical safety guidance for HSE professionals.",
      href: "/knowledge",
      comingSoon: true,
    },
  ];

  return (
    <section
      id="categories"
      className="border-y border-slate-200 bg-slate-50 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            {isTurkish ? "SafeBase'i Keşfet" : "Explore SafeBase"}
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {isTurkish
              ? "Pratik iş güvenliği çalışmaları için ihtiyacınız olan her şey"
              : "Everything you need for practical safety work"}
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            {isTurkish
              ? "Günlük HSE çalışmalarını daha hızlı, anlaşılır ve tutarlı hale getirmek için tasarlanmış profesyonel araçları ve kaynakları kullanın."
              : "Use professional tools and resources designed to make daily HSE work faster, clearer and more consistent."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const card = (
              <div
                className={`group relative h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 ${
                  category.comingSoon
                    ? "opacity-75"
                    : "hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                {category.comingSoon && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    {isTurkish ? "Yakında" : "Coming Soon"}
                  </span>
                )}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  {category.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-950">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>

                <div className="mt-6 font-semibold text-blue-600 transition group-hover:translate-x-1">
                  {category.comingSoon
                    ? isTurkish
                      ? "Yakında Kullanılabilir"
                      : "Available Soon"
                    : isTurkish
                      ? "Keşfet →"
                      : "Explore →"}
                </div>
              </div>
            );

            if (category.comingSoon) {
              return <div key={category.title}>{card}</div>;
            }

            return (
              <Link
                key={category.title}
                href={`/${locale}${category.href}`}
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
