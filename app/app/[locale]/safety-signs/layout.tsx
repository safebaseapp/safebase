import type { Metadata } from "next";
import type { ReactNode } from "react";
import ActivityTracker from "@/components/analytics/ActivityTracker";

type Props = {
  children: ReactNode;
};

export default function ActivityTrackingLayout({ children }: Props) {
  return (
    <>
      <ActivityTracker eventName="safety_signs_open" />
      {children}
    </>
  );
}

// Page-level metadata from PR #128 can override these scoped defaults without a conflict.
export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") return {};
  const title = locale === "tr" ? "İş Yeri Güvenlik Levhaları | SERNEM" : "Workplace Safety Signs | SERNEM";
  const description = locale === "tr"
    ? "Zorunluluk, yasaklama, uyarı, acil durum ve yangın levhalarını arayın. Türkçe ve İngilizce önizleme, levhaya özel QR ve giriş gerektiren PDF/PNG indirmeleri."
    : "Search mandatory, prohibition, warning, emergency and fire equipment signs. TR/EN previews, sign-specific QR and sign-in required PDF/PNG downloads.";
  const url = `https://www.sernem.com/${locale}/safety-signs`;
  return {
    title, description,
    alternates: { canonical: url, languages: {
      tr: "https://www.sernem.com/tr/safety-signs", en: "https://www.sernem.com/en/safety-signs",
      "x-default": "https://www.sernem.com/en/safety-signs",
    } },
    openGraph: { title, description, url, type: "website", siteName: "SERNEM", locale: locale === "tr" ? "tr_TR" : "en_US" },
  };
}
