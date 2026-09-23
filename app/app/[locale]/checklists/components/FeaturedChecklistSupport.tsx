import type { Metadata } from "next";
import { getChecklistEntryBySlug } from "@/data/checklists/registry";
import RelatedInspectionResources from "./RelatedInspectionResources";

type Locale = "tr" | "en";

export function buildChecklistMetadata(
  slug: string,
  rawLocale: string,
): Metadata {
  const locale: Locale = rawLocale === "tr" ? "tr" : "en";
  const entry = getChecklistEntryBySlug(slug);

  if (!entry) return {};

  const title = `${entry.title[locale]} | SERNEM`;
  const description = entry.description[locale];
  const canonical = `https://www.sernem.com/${locale}/checklists/${entry.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `https://www.sernem.com/tr/checklists/${entry.slug}`,
        en: `https://www.sernem.com/en/checklists/${entry.slug}`,
        "x-default": `https://www.sernem.com/en/checklists/${entry.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "article",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function FeaturedChecklistResources({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const entry = getChecklistEntryBySlug(slug);
  if (!entry) return null;

  return (
    <RelatedInspectionResources
      locale={locale}
      checklist={entry.document}
    />
  );
}
