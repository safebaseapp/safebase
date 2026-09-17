import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRiskActivities } from "@/lib/risk-library/all-activities";

type Locale = "tr" | "en";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

const baseUrl = "https://www.sernem.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "Risk Değerlendirme Kütüphanesi | SERNEM"
    : "Risk Assessment Library | SERNEM";

  const description = isTr
    ? "Faaliyete özel hazır tehlikeler, sonuçlar ve kontrol önlemleri içeren profesyonel SERNEM Risk Değerlendirme Kütüphanesini keşfedin."
    : "Explore the SERNEM Risk Assessment Library with activity-specific hazards, consequences and practical HSE control measures.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/risk-assessment`,
      languages: {
        tr: `${baseUrl}/tr/risk-assessment`,
        en: `${baseUrl}/en/risk-assessment`,
      },
    },
  };
}

export default async function RiskAssessmentLibraryPage({
  params,
}: PageProps) {
  const { locale } = await params;

  if (locale !== "tr" && locale !== "en") notFound();

  const isTr = locale === "tr";

  const categories = Array.from(
    new Set(allRiskActivities.map((item) => item.category[locale])),
  ).sort((a, b) => a.localeCompare(b));

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(37,99,235,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
              SERNEM HSE Risk Library
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {isTr ? (
                <>
                  Risk Değerlendirme{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Kütüphanesi
                  </span>
                </>
              ) : (
                <>
                  Risk Assessment{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Library
                  </span>
                </>
              )}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {isTr
                ? "Saha faaliyetlerine özel hazırlanmış tehlikeleri, sonuçları, risk altındaki kişileri ve kontrol önlemlerini tek bir profesyonel HSE kütüphanesinde inceleyin."
                : "Explore activity-specific hazards, consequences, persons at risk and control measures in one professional HSE risk library."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/tools/quick-risk-assessment`}
                className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                {isTr
                  ? "Risk Değerlendirmesi Oluştur"
                  : "Build Risk Assessment"}
              </Link>

              <Link
                href={`/${locale}/tools/risk-matrix`}
                className="rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-bold transition hover:bg-white/10"
              >
                {isTr ? "5×5 Risk Matrisi" : "5×5 Risk Matrix"}
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-3xl font-black">{allRiskActivities.length}</div>
              <div className="mt-2 text-sm text-slate-400">
                {isTr ? "Hazır faaliyet" : "Ready activities"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-3xl font-black">{categories.length}</div>
              <div className="mt-2 text-sm text-slate-400">
                {isTr ? "HSE kategorisi" : "HSE categories"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-3xl font-black">
                {allRiskActivities.reduce(
                  (total, activity) => total + activity.items.length,
                  0,
                )}
              </div>
              <div className="mt-2 text-sm text-slate-400">
                {isTr ? "Hazır tehlike kaydı" : "Ready hazard records"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="space-y-14">
          {categories.map((category) => {
            const activities = allRiskActivities.filter(
              (item) => item.category[locale] === category,
            );

            return (
              <section key={category}>
                <div className="flex items-end justify-between gap-5 border-b border-white/10 pb-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-400">
                      HSE Category
                    </div>
                    <h2 className="mt-2 text-2xl font-black">{category}</h2>
                  </div>

                  <div className="text-sm text-slate-500">
                    {activities.length} {isTr ? "faaliyet" : "activities"}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {activities.map((activity) => (
                    <Link
                      key={activity.id}
                      href={`/${locale}/risk-assessment/${activity.id}`}
                      className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-blue-300">
                          {category}
                        </span>

                        <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-300">
                          →
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-bold">
                        {activity.activity[locale]}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {activity.items.length}{" "}
                        {isTr
                          ? "hazır tehlike ve kontrol önlemi"
                          : "ready hazards and control measures"}
                      </p>

                      <div className="mt-5 text-sm font-bold text-blue-300">
                        {isTr
                          ? "Risk değerlendirmesini aç"
                          : "Open risk assessment"}{" "}
                        →
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
