import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import ConfinedSpaceChecklist from "./ConfinedSpaceChecklist";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ConfinedSpaceChecklistPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ConfinedSpaceChecklist locale={locale === "tr" ? "tr" : "en"} />
  );
}