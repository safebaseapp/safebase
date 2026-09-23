import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideDirectoryClient from "./components/GuideDirectoryClient";
import { allGuides } from "./data/guides/all-guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "tr" ? "tr" : "en";
  const isTurkish = language === "tr";
  const canonical = `https://www.sernem.com/${language}/knowledge-base`;

  const title = isTurkish
    ? "100 İSG Rehberi | SERNEM Bilgi Merkezi"
    : "100 HSE Guides | SERNEM Knowledge Base";

  const description = isTurkish
    ? "Yüksekte çalışma, kaldırma, kapalı alan, elektrik, sıcak çalışma, kimyasal, iskele, ekipman ve genel İSG yönetimi için 100 profesyonel saha rehberi."
    : "100 professional field-ready HSE guides covering work at height, lifting, confined space, electrical, hot work, chemical, scaffolding, equipment and HSE management.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/knowledge-base",
        en: "https://www.sernem.com/en/knowledge-base",
        "x-default": "https://www.sernem.com/en/knowledge-base",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "website",
      locale: isTurkish ? "tr_TR" : "en_US",
      alternateLocale: isTurkish ? ["en_US"] : ["tr_TR"],
    },
  };
}

export default async function KnowledgeBasePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") notFound();

  const guides = allGuides.map((guide) => ({
    slug: guide.slug,
    title: guide.title[locale],
    description: guide.description[locale],
    category: guide.category[locale],
    readTime: guide.readTime,
    riskLevel: guide.riskLevel?.[locale],
  }));

  return <GuideDirectoryClient locale={locale} guides={guides} />;
}
