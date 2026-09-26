import type { Metadata } from "next";
import RiskMatrix from "../../../components/RiskMatrix";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const isTurkish = rawLocale === "tr";
  const locale = isTurkish ? "tr" : "en";

  const title = isTurkish
    ? "Risk Matrisi Hesaplayıcı – 5x5 İSG Risk Matrisi | SERNEM"
    : "Risk Matrix Calculator – 5x5 HSE Risk Matrix | SERNEM";

  const description = isTurkish
    ? "5x5 risk matrisi ile faaliyet ve tehlike bağlamını tanımlayın, olasılık ve şiddeti değerlendirin, risk skorunu ve kalan risk seviyesini belirleyin."
    : "Define the activity and hazard context, then use the 5x5 risk matrix to evaluate likelihood, severity, initial risk and residual risk level.";

  const canonical = `https://www.sernem.com/${locale}/tools/risk-matrix`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://www.sernem.com/en/tools/risk-matrix",
        tr: "https://www.sernem.com/tr/tools/risk-matrix",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "website",
      locale: isTurkish ? "tr_TR" : "en_US",
    },
  };
}

export default async function RiskMatrixPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  return (
    <main className="bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950 px-6 pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {isTurkish ? "5×5 HSE RİSK DEĞERLENDİRMESİ" : "5×5 HSE RISK ASSESSMENT"}
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {isTurkish ? "5×5 İSG Risk Matrisi Hesaplayıcı" : "5×5 HSE Risk Matrix Calculator"}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
              {isTurkish
                ? "Önce değerlendirdiğiniz faaliyet ve tehlikeyi tanımlayın; ardından olasılık, şiddet, kontrol önlemleri ve kalan risk seviyesini birlikte değerlendirin."
                : "Start by defining the activity and hazard being assessed, then evaluate likelihood, severity, control measures and the residual risk level together."}
            </p>
          </div>

          <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-2 sm:p-6">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-300">
                {isTurkish ? "Faaliyet / İş Adımı" : "Activity / Task"}
              </span>
              <input
                type="text"
                name="activity-context"
                placeholder={
                  isTurkish
                    ? "Örn. İskele üzerinde bakım çalışması"
                    : "e.g. Maintenance work on scaffold"
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-300">
                {isTurkish ? "Tehlike / Risk Senaryosu" : "Hazard / Risk Scenario"}
              </span>
              <input
                type="text"
                name="hazard-context"
                placeholder={
                  isTurkish
                    ? "Örn. Yüksekten düşme"
                    : "e.g. Fall from height"
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>
          </div>
        </div>
      </section>

      <RiskMatrix locale={locale} />
    </main>
  );
}
