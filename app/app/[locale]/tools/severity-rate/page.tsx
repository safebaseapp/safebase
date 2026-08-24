import type { Metadata } from "next";
import SeverityRatePage from "../../../tools/severity-rate/page";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const title = isTurkish
    ? "Severity Rate Hesaplayıcı – İş Kazası Şiddet Oranı | SERNEM"
    : "Severity Rate Calculator – Injury Severity Rate | SERNEM";

  const description = isTurkish
    ? "İş kazası şiddet oranını kayıp iş günü ve toplam çalışma saatlerine göre hesaplayın. Formül, açıklama ve profesyonel HSE performans değerlendirmesi."
    : "Calculate injury severity rate using lost workdays and total hours worked. Includes formula, interpretation guidance and professional HSE performance analysis.";

  const canonical = `https://www.sernem.com/${locale}/tools/severity-rate`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://www.sernem.com/en/tools/severity-rate",
        tr: "https://www.sernem.com/tr/tools/severity-rate",
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

export default function Page() {
  return <SeverityRatePage />;
}