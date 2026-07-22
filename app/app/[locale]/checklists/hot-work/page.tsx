import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import HotWorkChecklist from "./HotWorkChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HotWorkChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <HotWorkChecklist locale={locale === "tr" ? "tr" : "en"} />;
}
