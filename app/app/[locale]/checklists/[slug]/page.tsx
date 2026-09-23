import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import {
  featuredChecklistSlugs,
  getChecklistBySlug,
  getChecklistEntryBySlug,
  inspectionCatalog,
} from "../../../../data/checklists/registry";
import ProfessionalInspectionChecklist from "../components/ProfessionalInspectionChecklist";
import RelatedInspectionResources from "../components/RelatedInspectionResources";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const featured = new Set<string>(featuredChecklistSlugs);
  return routing.locales.flatMap((locale) =>
    inspectionCatalog
      .filter((entry) => !featured.has(entry.slug))
      .map((entry) => ({ locale, slug: entry.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
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

export default async function GenericChecklistPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const checklist = getChecklistBySlug(slug);
  if (!checklist || (featuredChecklistSlugs as readonly string[]).includes(slug)) {
    notFound();
  }

  const resolvedLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      <ProfessionalInspectionChecklist
        checklistDocument={checklist}
        locale={resolvedLocale}
      />
      <RelatedInspectionResources
        locale={resolvedLocale}
        checklist={checklist}
      />
    </>
  );
}
