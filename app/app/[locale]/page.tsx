import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import CinematicHome from "./components/CinematicHome";

type Props = {
  params: Promise<{ locale: string }>;
};


export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  const safeLocale = locale === "tr" ? "tr" : "en";
  const isTurkish = safeLocale === "tr";

  const canonicalUrl = `https://www.sernem.com/${safeLocale}`;

  const title = isTurkish
    ? "SERNEM | Profesyonel İSG ve HSE Araçları"
    : "SERNEM | Professional HSE Tools & Safety Resources";

  const description = isTurkish
    ? "Risk analizi, Method Statement, İSG hesaplayıcıları, HSE rehberleri, kontrol listeleri ve saha güvenliği kaynaklarını tek platformda kullanın."
    : "Use professional risk assessments, Method Statements, HSE calculators, safety guides, checklists and field-ready HSE resources from one platform.";

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: "https://www.sernem.com/tr",
        en: "https://www.sernem.com/en",
        "x-default": "https://www.sernem.com/en",
      },
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "SERNEM",
      locale: isTurkish ? "tr_TR" : "en_US",
      alternateLocale: isTurkish ? ["en_US"] : ["tr_TR"],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}


export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <CinematicHome locale={locale as "tr" | "en"} />;
}
