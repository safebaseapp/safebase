import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import {
  buildChecklistMetadata,
  FeaturedChecklistResources,
} from "../components/FeaturedChecklistSupport";
import LiftingChecklist from "./LiftingChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildChecklistMetadata("lifting", locale);
}

export default async function LiftingChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resolvedLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      <LiftingChecklist locale={resolvedLocale} />
      <FeaturedChecklistResources slug="lifting" locale={resolvedLocale} />
    </>
  );
}
