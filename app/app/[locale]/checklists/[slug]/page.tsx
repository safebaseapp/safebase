import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import { getChecklistBySlug } from "../../../../data/checklists/registry";
import ProfessionalInspectionChecklist from "../components/ProfessionalInspectionChecklist";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function GenericChecklistPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const checklist = getChecklistBySlug(slug);
  if (!checklist || ["work-at-height", "hot-work", "loto", "scaffold", "confined-space", "lifting"].includes(slug)) notFound();
  return <ProfessionalInspectionChecklist checklistDocument={checklist} locale={locale === "tr" ? "tr" : "en"} />;
}
