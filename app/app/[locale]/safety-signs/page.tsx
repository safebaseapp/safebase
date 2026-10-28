import type { Metadata } from "next";
import Link from "next/link";
import { safetySigns } from "@/lib/safety-signs/data";
import { notFound } from "next/navigation";
import SafetySignsClient from "./SafetySignsClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const title = locale === "tr" ? "ISO Güvenlik İşaretleri ve Levhaları | SERNEM" : "ISO Safety Signs & Workplace Symbols | SERNEM";
  const description = locale === "tr" ? "İş yerinde kullanılan uyarı, yasak, zorunluluk ve acil durum güvenlik levhalarını Türkçe açıklamalarla keşfedin." : "Explore workplace warning, prohibition, mandatory and emergency safety signs with clear English explanations.";
  const canonical = `https://www.sernem.com/${locale}/safety-signs`;
  return {
    title, description,
    openGraph: { title, description, url: canonical, siteName: "SERNEM", type: "website", locale: locale === "tr" ? "tr_TR" : "en_US" },
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/safety-signs",
        en: "https://www.sernem.com/en/safety-signs",
        "x-default": "https://www.sernem.com/en/safety-signs",
      },
    },
  };
}


export default async function SafetySignsPage({
  params,
}: Props) {
  const { locale } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  return (
    <>
      <SafetySignsClient locale={locale} />
      <nav aria-label={locale === "tr" ? "Güvenlik levhaları dizini" : "Safety signs directory"} className="mx-auto max-w-6xl px-5 pb-12">
        <details className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900">
          <summary className="cursor-pointer font-semibold">{locale === "tr" ? "Tüm güvenlik levhalarına göz at" : "Browse every safety sign"}</summary>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {safetySigns.map(sign => (
              <Link key={sign.slug} href={`/${locale}/safety-signs/${sign.slug}`} className="rounded-lg px-2 py-1 text-sm text-blue-700 hover:underline">{sign.title[locale]}</Link>
            ))}
          </div>
        </details>
      </nav>
    </>
  );
}
