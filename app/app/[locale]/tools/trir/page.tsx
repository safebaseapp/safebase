import type { Metadata } from "next";
import TRIRPage from "../../../tools/trir/page";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const title = isTurkish
    ? "TRIR Hesaplayıcı – Toplam Kaydedilebilir Olay Oranı | SERNEM"
    : "TRIR Calculator – Total Recordable Incident Rate | SERNEM";

  const description = isTurkish
    ? "TRIR değerini kaydedilebilir vaka sayısı ve toplam çalışma saatlerine göre hesaplayın. Formül, açıklama, yorumlama rehberi ve profesyonel PDF raporu."
    : "Calculate Total Recordable Incident Rate using recordable cases and total hours worked. Includes formula, interpretation guidance and professional PDF reporting.";

  const canonical = `https://www.sernem.com/${locale}/tools/trir`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://www.sernem.com/en/tools/trir",
        tr: "https://www.sernem.com/tr/tools/trir",
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
  return <TRIRPage />;
}