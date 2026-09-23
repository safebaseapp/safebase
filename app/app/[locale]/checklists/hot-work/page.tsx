import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import {
  buildChecklistMetadata,
  FeaturedChecklistResources,
} from "../components/FeaturedChecklistSupport";
import HotWorkChecklist from "./HotWorkChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildChecklistMetadata("hot-work", locale);
}

export default async function HotWorkChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resolvedLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      <HotWorkChecklist locale={resolvedLocale} />
      <FeaturedChecklistResources slug="hot-work" locale={resolvedLocale} />
    </>
  );
}
