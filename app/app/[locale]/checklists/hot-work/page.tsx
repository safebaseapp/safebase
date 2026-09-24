import "../sernem-report-v2.css";
import type { Metadata } from "next";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import { getChecklistEntryBySlug } from "@/data/checklists/registry";
import ProfessionalInspectionChecklist from "../components/ProfessionalInspectionChecklist";
import {
  buildChecklistMetadata,
  FeaturedChecklistResources,
} from "../components/FeaturedChecklistSupport";

type Props = { params: Promise<{ locale: string }> };
const SLUG = "hot-work";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildChecklistMetadata(SLUG, locale);
}

export default async function HotWorkChecklistPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const entry = getChecklistEntryBySlug(SLUG);
  if (!entry) notFound();
  const resolvedLocale = locale === "tr" ? "tr" : "en";

  return (
    <>
      <ActivityTracker eventName="checklist_detail_open" />
      <ProfessionalInspectionChecklist
        checklistDocument={entry.document}
        locale={resolvedLocale}
      />
      <FeaturedChecklistResources slug={SLUG} locale={resolvedLocale} />
    </>
  );
}
