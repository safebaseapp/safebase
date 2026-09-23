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

  return {
    title: `${guide.title[language]} | SERNEM HSE Guide`,
    description: guide.description[language],
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

  return <GuideTemplate locale={locale} guide={guide} />;
}
