import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import ScaffoldChecklist from "./ScaffoldChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ScaffoldChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <ScaffoldChecklist locale={locale === "tr" ? "tr" : "en"} />;
}
