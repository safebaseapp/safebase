import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Inspector3D from "../Inspector3D";

export const metadata: Metadata = {
  title: "SERNEM SIM · Playtest",
  description: "SERNEM Labs interactive HSE refinery safety inspector playtest.",
  robots: { index: false, follow: false },
};

export default async function PlaytestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") notFound();
  return <Inspector3D locale={locale} />;
}
