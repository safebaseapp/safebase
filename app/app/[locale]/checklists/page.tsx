import Link from "next/link";
import {hasLocale} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "../../../i18n/routing";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function LocalizedChecklistsPage({params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isTurkish = locale === "tr";

  const checklists = [
    {
      icon: "🦺",
      title: isTurkish
        ? "Yüksekte Çalışma Kontrolü"
        : "Work at Height Inspection",
      description: isTurkish
        ? "Çalışma başlamadan önce merdivenleri, iskeleleri, ankraj noktalarını, erişim yollarını ve düşmeye karşı koruma sistemlerini kontrol edin."
        : "Inspect ladders, scaffolds, anchor points, access routes and fall protection systems before work starts.",
      category: isTurkish ? "Yüksek Riskli İşler" : "High Risk Work",
      standard: "OSHA 1926 Subpart M",
      duration: isTurkish ? "5–8 dakika" : "5–8 min",
      href: "/checklists/work-at-height",
      available: true,
    },
    {
      icon: "🔥",
      title: isTurkish
        ? "Sıcak Çalışma Kontrolü"
        : "Hot Work Inspection",
      description: isTurkish
        ? "Sıcak çalışma öncesinde izinleri, yangın önlemlerini, gaz ölçümünü, yangın gözcüsünü ve saha düzenini doğrulayın."
        : "Verify permits, fire prevention controls, gas testing, fire watch and housekeeping before hot work.",
      category: isTurkish ? "Çalışma İzni" : "Permit to Work",
      standard: "OSHA 1910.252",
      duration: isTurkish ? "5–7 dakika" : "5–7 min",
      href: "/checklists/hot-work",
      available: false,
    },
    {
      icon: "🔒",
      title: isTurkish
        ? "Kilitleme ve Etiketleme Kontrolü"
        : "Lockout / Tagout Inspection",
      description: isTurkish
        ? "Enerji izolasyonunu, kilit uygulamalarını, sıfır enerji doğrulamasını ve yetkili kişi kontrollerini inceleyin."
        : "Confirm energy isolation, lock application, zero-energy verification and authorized-person controls.",
      category: isTurkish ? "Enerji Kontrolü" : "Energy Control",
      standard: "OSHA 1910.147",
      duration: isTurkish ? "6–10 dakika" : "6–10 min",
      href: "/checklists/loto",
      available: false,
    },
    {
      icon: "🏗️",
      title: isTurkish
        ? "İskele Güvenlik Kontrolü"
        : "Scaffolding Inspection",
      description: isTurkish
        ? "Erişimi, platformları, korkulukları, etiketleri, temelleri, çapraz bağlantıları ve düşen cisim kontrollerini inceleyin."
        : "Check access, platforms, guardrails, tags, foundations, bracing and dropped-object controls.",
      category: isTurkish
        ? "Geçici Yapılar"
        : "Temporary Structures",
      standard: "OSHA 1926 Subpart L",
      duration: isTurkish ? "8–12 dakika" : "8–12 min",
      href: "/checklists/scaffolding",
      available: true,
    },
    {
      icon: "🕳️",
      title: isTurkish
        ? "Kapalı Alan Giriş Kontrolü"
        : "Confined Space Inspection",
      description: isTurkish
        ? "Atmosfer ölçümünü, kurtarma hazırlığını, iletişimi, gözcü kontrolünü ve giriş gerekliliklerini inceleyin."
        : "Review atmospheric testing, rescue readiness, communication, attendant controls and entry requirements.",
      category: isTurkish ? "Yüksek Riskli İşler" : "High Risk Work",
      standard: "OSHA 1910.146",
      duration: isTurkish ? "8–12 dakika" : "8–12 min",
      href: "/checklists/confined-space",
      available: false,
    },
    {
      icon: "🏗️",
      title: isTurkish
        ? "Kaldırma Operasyonu Kontrolü"
        : "Lifting Operations Inspection",
      description: isTurkish
        ? "Kaldırma planını, ekipmanları, sapanları, bariyerli alanı, iletişimi ve vinç kurulumunu kontrol edin."
        : "Inspect lifting plans, equipment, rigging, exclusion zones, communication and crane setup.",
      category: isTurkish ? "Kaldırma İşleri" : "Lifting",
      standard: "OSHA 1926 Subpart CC",
      duration: isTurkish ? "10–15 dakika" : "10–15 min",
      href: "/checklists/lifting-operations",
      available: false,
    },
  ];

  const availableCount = checklists.filter(
    (checklist) => checklist.available,
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
              {isTurkish
                ? "SafeBase Saha Araçları"
                : "SafeBase Field Tools"}
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {isTurkish
                ? "İş Güvenliği Denetim Kontrol Listeleri"
                : "Safety Inspection Checklists"}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              {isTurkish
                ? "HSE profesyonellerinin çalışma başlamadan önce kritik eksiklikleri belirlemesine yardımcı olmak için hazırlanmış yapılandırılmış saha kontrol araçları."
                : "Structured field inspection tools designed to help HSE professionals identify critical gaps before work begins."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300">
                {isTurkish ? "Pratik saha kullanımı" : "Practical field use"}
              </span>

              <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300">
                {isTurkish ? "OSHA referansları" : "OSHA references"}
              </span>

              <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300">
                {isTurkish ? "Mobil uyumlu" : "Mobile friendly"}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-blue-950/20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              {isTurkish ? "Kontrol listesi arşivi" : "Checklist library"}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <p className="text-4xl font-bold">{checklists.length}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {isTurkish ? "Toplam liste" : "Total checklists"}
                </p>
              </div>

              <div>
                <p className="text-4xl font-bold">{availableCount}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {isTurkish ? "Şu an kullanılabilir" : "Available now"}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <p className="text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "SafeBase denetim arşivi geliştikçe yeni kontrol listeleri düzenli olarak eklenecektir."
                  : "New checklists will be added regularly as the SafeBase inspection library expands."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="border-b border-slate-800 pb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              {isTurkish ? "Denetim arşivi" : "Inspection library"}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              {isTurkish ? "Bir denetim seçin" : "Choose an inspection"}
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              {isTurkish
                ? "İhtiyacınız olan saha kontrol listesini seçerek denetime başlayın."
                : "Select the field checklist you need and begin your inspection."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {checklists.map((checklist) => {
              const card = (
                <article
                  className={`group flex h-full flex-col rounded-3xl border bg-slate-900 p-7 transition duration-300 ${
                    checklist.available
                      ? "border-slate-800 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
                      : "border-slate-800 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
                      {checklist.icon}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        checklist.available
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border border-amber-500/20 bg-amber-500/10 text-amber-300"
                      }`}
                    >
                      {checklist.available
                        ? isTurkish
                          ? "Kullanılabilir"
                          : "Available"
                        : isTurkish
                          ? "Geliştiriliyor"
                          : "In Development"}
                    </span>
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                    {checklist.category}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight">
                    {checklist.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">
                    {checklist.description}
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-800 pt-6 text-sm">
                    <div>
                      <p className="text-slate-500">
                        {isTurkish ? "Referans" : "Reference"}
                      </p>
                      <p className="mt-1 font-medium text-slate-300">
                        {checklist.standard}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        {isTurkish ? "Tahmini süre" : "Estimated time"}
                      </p>
                      <p className="mt-1 font-medium text-slate-300">
                        {checklist.duration}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 font-semibold text-blue-400 transition group-hover:translate-x-1">
                    {checklist.available
                      ? isTurkish
                        ? "Denetimi Başlat →"
                        : "Start Inspection →"
                      : isTurkish
                        ? "Yakında kullanılabilir"
                        : "Available Soon"}
                  </div>
                </article>
              );

              if (!checklist.available) {
                return <div key={checklist.href}>{card}</div>;
              }

              return (
                <Link
                  key={checklist.href}
                  href={`/${locale}${checklist.href}`}
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
