import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import LotoChecklist from "./LotoChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LotoChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <LotoChecklist locale={locale === "tr" ? "tr" : "en"} />
  );
}