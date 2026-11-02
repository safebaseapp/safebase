import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../../i18n/routing";
import DailySafetyBrain from "./DailySafetyBrain";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const title = locale === "tr" ? "Günlük İSG Bilgi Testi | Daily Safety Brain | SERNEM" : "Daily Safety Brain | Daily HSE Knowledge Quiz | SERNEM";
  const description = locale === "tr" ? "Daily Safety Brain ile günlük iş güvenliği sorularını çözün; saha bilgisi ve tehlike farkındalığınızı kısa testlerle geliştirin." : "Take daily HSE quizzes with Daily Safety Brain to practice site knowledge and hazard awareness in short challenges.";
  const canonical = `https://www.sernem.com/${locale}/labs/daily-safety-brain`;
  return {
    title, description,
    openGraph: { title, description, url: canonical, siteName: "SERNEM", type: "website", locale: locale === "tr" ? "tr_TR" : "en_US" },
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/labs/daily-safety-brain",
        en: "https://www.sernem.com/en/labs/daily-safety-brain",
        "x-default": "https://www.sernem.com/en/labs/daily-safety-brain"
      }
    }
  };
}

export default async function DailySafetyBrainPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <DailySafetyBrain locale={locale === "tr" ? "tr" : "en"} />;
}
