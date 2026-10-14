import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "../../../../i18n/routing";
import Inspector3D from "./Inspector3D";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  return {
    title: tr ? "3D Safety Inspector | SERNEM Labs (Prototip)" : "3D Safety Inspector | SERNEM Labs (Prototype)",
    description: tr
      ? "SERNEM Labs 3D Safety Inspector: gezilebilir endüstriyel eğitim ortamı, saha keşfi ve ilk prototip."
      : "SERNEM Labs 3D Safety Inspector: explorable industrial training site and first-person field walkthrough prototype.",
    robots: { index: false, follow: false },
  };
}
export default async function SafetyInspectorPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <Inspector3D locale={locale === "tr" ? "tr" : "en"} />;
}
