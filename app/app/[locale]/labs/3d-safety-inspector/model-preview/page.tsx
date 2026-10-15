import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ModelPreview from "./ModelPreview";

export const metadata: Metadata = {
  title: "SERNEM SIM | Industrial Model Test",
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") notFound();
  return <ModelPreview locale={locale} />;
}
