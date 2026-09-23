import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import {
  buildChecklistMetadata,
  FeaturedChecklistResources,
} from "../components/FeaturedChecklistSupport";
import WorkAtHeightChecklist from "./WorkAtHeightChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildChecklistMetadata("work-at-height", locale);
}

export default async function WorkAtHeightChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resolvedLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      <WorkAtHeightChecklist locale={resolvedLocale} />
      <FeaturedChecklistResources slug="work-at-height" locale={resolvedLocale} />
    </>
  );
}
