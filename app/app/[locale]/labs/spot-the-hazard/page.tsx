import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import { getSpotTheHazardScenarios } from "@/lib/labs/scenarios/spot-the-hazard";

type Props = { params: Promise<{ locale: string }> };

export default async function SpotTheHazardPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const labLocale = locale === "tr" ? "tr" : "en";
  const scenarios = getSpotTheHazardScenarios(labLocale);
  const first = scenarios[0];
  if (!first) notFound();
  redirect(`/${locale}/labs/spot-the-hazard/${first.id}`);
}
