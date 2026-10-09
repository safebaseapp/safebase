import Link from "next/link";
import { safetySigns } from "@/lib/safety-signs/data";
import { notFound } from "next/navigation";
import SafetySignsClient from "./SafetySignsClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

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
