import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import {
  buildChecklistMetadata,
  FeaturedChecklistResources,
} from "../components/FeaturedChecklistSupport";
import ScaffoldChecklist from "./ScaffoldChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildChecklistMetadata("scaffold", locale);
}

export default async function ScaffoldChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resolvedLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      <ScaffoldChecklist locale={resolvedLocale} />
      <FeaturedChecklistResources slug="scaffold" locale={resolvedLocale} />
    </>
  );
}
