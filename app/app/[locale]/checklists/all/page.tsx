import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import AllChecklistsClient from "./AllChecklistsClient";

type Props = { params: Promise<{ locale: string }> };

export default async function AllChecklistsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <AllChecklistsClient locale={locale === "tr" ? "tr" : "en"} />;
}
