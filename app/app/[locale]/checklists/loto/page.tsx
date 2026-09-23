import type { Metadata } from "next";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import {
  buildChecklistMetadata,
  FeaturedChecklistResources,
} from "../components/FeaturedChecklistSupport";
import LotoChecklist from "./LotoChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildChecklistMetadata("loto", locale);
}

export default async function LotoChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const resolvedLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      <ActivityTracker eventName="checklist_detail_open" />
      <LotoChecklist locale={resolvedLocale} />
      <FeaturedChecklistResources slug="loto" locale={resolvedLocale} />
    </>
  );
}
