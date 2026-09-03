import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRiskActivities } from "@/lib/risk-library/all-activities";
import PrintButton from "./PrintButton";

type Locale = "tr" | "en";

type PageProps = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

const baseUrl = "https://www.sernem.com";

function getActivity(slug: string) {
  return allRiskActivities.find((item) => item.id === slug);
}

export function generateStaticParams() {
  return allRiskActivities.map((activity) => ({
    slug: activity.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const activity = getActivity(slug);

  if (!activity) return {};

  const name = activity.activity[locale];
  const hazardCount = activity.items.length;

  const title =
    locale === "tr"
      ? `${name} Risk Değerlendirmesi | SERNEM`
      : `${name} Risk Assessment | SERNEM`;

  const description =
    locale === "tr"
      ? `${name} için ${hazardCount} hazır tehlike, sonuç ve kontrol önlemini inceleyin. SERNEM ile profesyonel risk değerlendirmesi hazırlayın.`
      : `Review ${hazardCount} hazards, consequences and control measures for ${name}. Build a professional HSE risk assessment with SERNEM.`;

  const canonical = `${baseUrl}/${locale}/risk-assessment/${activity.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/risk-assessment/${activity.id}`,
        tr: `${baseUrl}/tr/risk-assessment/${activity.id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "SERNEM",
    },
  };
}

export default async function RiskAssessmentActivityPage({
  params,
}: PageProps) {
  const { locale, slug } = await params;

  if (locale !== "tr" && locale !== "en") notFound();

  const activity = getActivity(slug);
  if (!activity) notFound();

  const isTr = locale === "tr";
  const activityName = activity.activity[locale];
  const categoryName = activity.category[locale];
  const hazardCount = activity.items.length;

  return (
    <>
      <style>{`
        .sernem-print {
          display: none;
        }

        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          html,
          body {
            background: #fff !important;
            color: #111827 !important;
          }

          .sernem-screen {
            display: none !important;
          }

          .sernem-print {
            display: block !important;
            background: #fff !important;
            color: #111827 !important;
            font-family: Arial, Helvetica, sans-serif;
          }

          .print-risk-row {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .print-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }

          .print-table th,
          .print-table td {
            border: 1px solid #cbd5e1;
            padding: 6px 7px;
            vertical-align: top;
            font-size: 9px;
            line-height: 1.35;
          }

          .print-table th {
            background: #eaf2ff !important;
            color: #0f172a !important;
            font-weight: 700;
          }

          .print-head {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }

          .print-footer {
            margin-top: 12px;
            padding-top: 8px;
            border-top: 1px solid #cbd5e1;
            font-size: 8px;
            color: #64748b;
          }
        }
      `}</style>

      {/* PREMIUM WEB VIEW */}
      <main className="sernem-screen min-h-screen bg-[#020617] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.15),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
            <Link
              href={`/${locale}/tools/quick-risk-assessment`}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              ← {isTr ? "Risk Değerlendirme Aracı" : "Risk Assessment Generator"}
            </Link>

            <div className="mt-8 max-w-5xl">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-300">
                  {isTr ? "Hazır Risk Değerlendirmesi" : "Ready Risk Assessment"}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-slate-300">
                  {categoryName}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-slate-300">
                  {hazardCount} {isTr ? "Tehlike" : "Hazards"}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {activityName}{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {isTr ? "Risk Değerlendirmesi" : "Risk Assessment"}
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {isTr
                  ? `${activityName} faaliyeti için kritik tehlikeleri, olası sonuçları, risk altındaki kişileri ve önerilen kontrol önlemlerini tek profesyonel HSE görünümünde inceleyin.`
                  : `Review the critical hazards, potential consequences, persons at risk and recommended control measures for ${activityName} in one professional HSE workspace.`}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/tools/quick-risk-assessment`}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  {isTr
                    ? "SERNEM'de Risk Analizi Oluştur"
                    : "Build This Risk Assessment in SERNEM"}
                </Link>

                <PrintButton
                  label={isTr ? "PDF İndir / Yazdır" : "Download PDF / Print"}
                />

                <Link
                  href={`/${locale}/tools/risk-matrix`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {isTr ? "5×5 Risk Matrisini Aç" : "Open 5×5 Risk Matrix"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                value: hazardCount,
                title: isTr ? "Hazır Tehlike" : "Ready Hazards",
                text: isTr
                  ? "Faaliyete özel hazır risk kütüphanesi"
                  : "Activity-specific HSE risk library",
              },
              {
                value: "5×5",
                title: isTr ? "Risk Matrisi" : "Risk Matrix",
                text: isTr
                  ? "Profesyonel risk değerlendirmesine hazır"
                  : "Ready for professional risk evaluation",
              },
              {
                value: "TR / EN",
                title: isTr ? "Çift Dil" : "Bilingual",
                text: isTr
                  ? "Türkçe ve İngilizce HSE içeriği"
                  : "Turkish and English HSE content",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.025] p-6 shadow-2xl shadow-black/10"
              >
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="mt-2 font-semibold text-white">{stat.title}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                {isTr ? "HSE Risk Kütüphanesi" : "HSE Risk Library"}
              </div>

              <h2 className="mt-3 text-3xl font-black">
                {isTr
                  ? `${activityName} Tehlikeleri ve Kontrolleri`
                  : `${activityName} Hazards & Controls`}
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                {isTr
                  ? `${activityName} faaliyetindeki temel tehlikeleri, sonuçları ve kontrol tedbirlerini yapılandırılmış profesyonel HSE formatında inceleyin.`
                  : `Review the key hazards, consequences and control measures for ${activityName} in a structured professional HSE format.`}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {activity.items.map((item, index) => (
                <article
                  key={`${activity.id}-${index}`}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#07101f] shadow-xl shadow-black/10 transition hover:border-blue-400/20"
                >
                  <div className="flex items-start gap-4 border-b border-white/10 bg-gradient-to-r from-blue-500/[0.08] to-transparent px-6 py-5">
                    <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-blue-500/15 font-bold text-blue-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300/70">
                        {isTr ? "Tehlike" : "Hazard"}
                      </div>
                      <h3 className="mt-1 text-xl font-bold">
                        {item.hazard[locale]}
                      </h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2">
                    <InfoBlock
                      title={isTr ? "Olası Sonuç" : "Potential Consequence"}
                      text={item.consequence[locale]}
                    />

                    <InfoBlock
                      title={isTr ? "Risk Altındaki Kişiler" : "Persons at Risk"}
                      text={item.personsAtRisk[locale]}
                    />

                    <InfoBlock
                      title={isTr ? "Mevcut Kontroller" : "Existing Controls"}
                      text={item.existingControls[locale]}
                      accent
                    />

                    <InfoBlock
                      title={isTr ? "İlave Kontroller" : "Additional Controls"}
                      text={item.additionalControls[locale]}
                      accent
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-blue-500/[0.06] to-transparent p-8 sm:p-10">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                SERNEM
              </div>

              <h2 className="mt-3 text-3xl font-black">
                {isTr
                  ? "Bu risk değerlendirmesini projenize uyarlayın"
                  : "Turn this into your project risk assessment"}
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                {isTr
                  ? "Hazır riskleri seçin, kontrol önlemlerini düzenleyin, risk seviyelerini belirleyin ve profesyonel proje çıktınızı SERNEM'de oluşturun."
                  : "Use these ready hazards as your starting point, customize controls, evaluate risk levels and prepare your project-specific assessment in SERNEM."}
              </p>

              <Link
                href={`/${locale}/tools/quick-risk-assessment`}
                className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                {isTr
                  ? "Risk Değerlendirmesini Başlat"
                  : "Start Risk Assessment"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* CLEAN A4 PDF VIEW */}
      <section className="sernem-print">
        <div className="print-head">
          <div style={{ fontSize: 10, fontWeight: 700, color: "#2563eb" }}>
            SERNEM • PROFESSIONAL HSE PLATFORM
          </div>

          <h1
            style={{
              fontSize: 22,
              lineHeight: 1.2,
              margin: "5px 0 3px",
              fontWeight: 800,
            }}
          >
            {activityName}{" "}
            {isTr ? "Risk Değerlendirmesi" : "Risk Assessment"}
          </h1>

          <div style={{ fontSize: 9, color: "#475569" }}>
            {isTr ? "Kategori" : "Category"}: {categoryName}
            {"  •  "}
            {isTr ? "Toplam Tehlike" : "Total Hazards"}: {hazardCount}
            {"  •  "}
            SERNEM
          </div>
        </div>

        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: "4%" }}>#</th>
              <th style={{ width: "17%" }}>
                {isTr ? "Tehlike" : "Hazard"}
              </th>
              <th style={{ width: "17%" }}>
                {isTr ? "Olası Sonuç" : "Consequence"}
              </th>
              <th style={{ width: "15%" }}>
                {isTr ? "Risk Altındaki Kişiler" : "Persons at Risk"}
              </th>
              <th style={{ width: "23%" }}>
                {isTr ? "Mevcut Kontroller" : "Existing Controls"}
              </th>
              <th style={{ width: "24%" }}>
                {isTr ? "İlave Kontroller" : "Additional Controls"}
              </th>
            </tr>
          </thead>

          <tbody>
            {activity.items.map((item, index) => (
              <tr
                key={`print-${activity.id}-${index}`}
                className="print-risk-row"
              >
                <td>{index + 1}</td>
                <td>
                  <strong>{item.hazard[locale]}</strong>
                </td>
                <td>{item.consequence[locale]}</td>
                <td>{item.personsAtRisk[locale]}</td>
                <td>{item.existingControls[locale]}</td>
                <td>{item.additionalControls[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="print-footer">
          {isTr
            ? "Bu hazır içerik profesyonel bir başlangıç noktasıdır. Nihai risk değerlendirmesi gerçek saha koşulları, yürürlükteki gereklilikler, şirket prosedürleri ve yetkin kişi değerlendirmesine göre doğrulanmalıdır."
            : "This ready-made content is a professional starting point. The final risk assessment must be validated against actual site conditions, applicable requirements, company procedures and competent-person judgement."}
        </div>
      </section>
    </>
  );
}

function InfoBlock({
  title,
  text,
  accent = false,
}: {
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div className="border-b border-white/10 p-6 md:border-r">
      <div
        className={`text-xs font-bold uppercase tracking-[0.14em] ${
          accent ? "text-blue-300/70" : "text-slate-500"
        }`}
      >
        {title}
      </div>

      <p className="mt-3 leading-7 text-slate-200">{text}</p>
    </div>
  );
}
