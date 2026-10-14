import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideTemplate from "../components/GuideTemplate";
import { getGuideBySlug } from "../data/guides/all-guides";
import { generatedGuides } from "../data/guides/generated";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    generatedGuides.map((guide) => ({ locale, slug: guide.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const language = locale === "tr" ? "tr" : "en";
  const guide = getGuideBySlug(slug);

  if (!guide) return {};

  const canonical = `https://www.sernem.com/${language}/knowledge-base/${guide.slug}`;
  const alternateLocale = language === "tr" ? "en" : "tr";

  const ctr =
    guide.slug === "confined-space-attendant-duties"
      ? {
          title:
            language === "tr"
              ? "Kapalı Alan Gözcüsü Görevleri: Kontrol Listesi ve Saha Rehberi"
              : "Confined Space Attendant Duties: Checklist & Field Guide",
          description:
            language === "tr"
              ? "Kapalı alan gözcüsünün görevleri, giriş takibi, iletişim, atmosferik riskler, acil durum ve stop-work kontrolleri. Risk değerlendirmesi ve saha araçlarına geçin."
              : "Confined space attendant duties for entry monitoring, communication, atmospheric hazards, emergencies and stop-work decisions, with field-ready HSE tools.",
        }
      : null;

  return {
    title: ctr?.title ?? `${guide.title[language]} | SERNEM HSE Guide`,
    description: ctr?.description ?? guide.description[language],
    alternates: {
      canonical,
      languages: {
        tr: `https://www.sernem.com/tr/knowledge-base/${guide.slug}`,
        en: `https://www.sernem.com/en/knowledge-base/${guide.slug}`,
        "x-default": `https://www.sernem.com/en/knowledge-base/${guide.slug}`,
      },
    },
    openGraph: {
      title: guide.title[language],
      description: guide.description[language],
      url: canonical,
      siteName: "SERNEM",
      type: "article",
      locale: language === "tr" ? "tr_TR" : "en_US",
      alternateLocale: [alternateLocale === "tr" ? "tr_TR" : "en_US"],
    },
  };
}

export default async function KnowledgeGuidePage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "tr" && locale !== "en") notFound();

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const language = locale === "tr" ? "tr" : "en";
  const url = `https://www.sernem.com/${language}/knowledge-base/${guide.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title[language],
    description: guide.description[language],
    url,
    mainEntityOfPage: url,
    inLanguage: language,
    publisher: {
      "@type": "Organization",
      name: "SERNEM",
      url: "https://www.sernem.com",
    },
    about: guide.category[language],
    educationalUse: "Professional workplace safety training",
    isAccessibleForFree: true,
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "SERNEM",
        item: `https://www.sernem.com/${language}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "tr" ? "Bilgi Bankası" : "Knowledge Base",
        item: `https://www.sernem.com/${language}/knowledge-base`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title[language],
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([article, breadcrumbs]).replace(/</g, "\\u003c"),
        }}
      />
      <GuideTemplate locale={locale} guide={guide} />
    </>
  );
}
