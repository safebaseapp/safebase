import type { Metadata } from "next";
import LTIFRPage from "../../../tools/ltifr/page";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const title = isTurkish
    ? "LTIFR Hesaplayıcı – Kayıp Zamanlı Yaralanma Sıklık Oranı | SERNEM"
    : "LTIFR Calculator – Lost Time Injury Frequency Rate | SERNEM";

  const description = isTurkish
    ? "LTIFR değerini kayıp zamanlı yaralanma sayısı ve toplam çalışma saatlerine göre hesaplayın. Formül, açıklama, yorumlama rehberi ve profesyonel PDF raporu."
    : "Calculate Lost Time Injury Frequency Rate using lost time injuries and total hours worked. Includes formula, interpretation guidance and professional PDF reporting.";

  const canonical = `https://www.sernem.com/${locale}/tools/ltifr`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://www.sernem.com/en/tools/ltifr",
        tr: "https://www.sernem.com/tr/tools/ltifr",
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
  return <LTIFRPage />;
}