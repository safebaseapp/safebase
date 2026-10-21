import type { SafetyGuide } from "@/app/[locale]/knowledge-base/components/GuideTemplate";
import { officialOshaReference } from "./hse-sources";
export function guideSchema(guide: SafetyGuide, language: "tr" | "en") {
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
    citation: guide.references.map(name => {
      const sourceUrl = officialOshaReference(name);
      return sourceUrl ? { "@type": "CreativeWork", name, url: sourceUrl } : name;
    }),
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

  return [article, breadcrumbs];
}
