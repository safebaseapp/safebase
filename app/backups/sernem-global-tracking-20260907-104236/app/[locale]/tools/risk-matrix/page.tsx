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
    ? "5x5 risk matrisi ile olasılık ve şiddeti değerlendirin, risk skorunu hesaplayın ve risk seviyesini belirleyin. Profesyonel İSG risk değerlendirme aracı."
    : "Calculate risk scores using a 5x5 risk matrix. Evaluate likelihood and severity, determine risk levels and support professional HSE risk assessments.";

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

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  return <RiskMatrix locale={locale} />;
}