import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import DailySafetyBrain from "./DailySafetyBrain";

export default async function DailySafetyBrainPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <DailySafetyBrain locale={locale === "tr" ? "tr" : "en"} />;
}
