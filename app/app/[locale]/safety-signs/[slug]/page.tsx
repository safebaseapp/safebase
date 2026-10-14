import type { Metadata } from "next";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import Link from "next/link";
import { notFound } from "next/navigation";
import SignRenderer from "@/components/safety-signs/SignRenderer";
import SignDownloadButtons from "@/components/safety-signs/SignDownloadButtons";
import { getSafetySign } from "@/lib/safety-signs/data";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};


const SITE_URL = "https://www.sernem.com";

// Search results should describe the actual sign and gated download formats.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "tr" && locale !== "en") return {};
  const sign = getSafetySign(slug);
  if (!sign) return {};

  const isTr = locale === "tr";
  const title = slug === "no-smoking"
    ? (isTr ? "Sigara İçilmez A4 PDF Levhası | SERNEM" : "No Smoking Sign A4 PDF & A3 | SERNEM")
    : sign.title[locale] + (isTr ? " | A4/A3 PDF ve PNG Levha" : " | A4/A3 PDF & PNG Sign");
  const description = slug === "no-smoking"
    ? (isTr
      ? "Sigara İçilmez güvenlik levhasını görüntüleyin. Giriş yaparak A4/A3 PDF veya PNG formatında, SERNEM etiketli indirin; logosuz sürüm Premium üyeler içindir."
      : "Preview the No Smoking safety sign. Sign in for A4/A3 PDF or PNG downloads with SERNEM branding; logo-free versions require Premium.")
    : sign.description[locale] + (isTr
      ? " A4/A3 PDF veya PNG önizleyin; indirmek için giriş gerekir. Logosuz sürüm Premium içindir."
      : " Preview A4/A3 PDF or PNG formats; sign-in is needed to download. Logo-free versions require Premium.");
  const url = SITE_URL + "/" + locale + "/safety-signs/" + slug;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: SITE_URL + "/tr/safety-signs/" + slug,
        en: SITE_URL + "/en/safety-signs/" + slug,
        "x-default": SITE_URL + "/en/safety-signs/" + slug,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "SERNEM",
      locale: isTr ? "tr_TR" : "en_US",
    },
  };
}

export default async function SafetySignDetailPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  const sign = getSafetySign(slug);

  if (!sign) {
    notFound();
  }

  const isTurkish = locale === "tr";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: isTurkish ? "Güvenlik Levhaları" : "Safety Signs",
                item: SITE_URL + "/" + locale + "/safety-signs",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: sign.title[locale],
                item: SITE_URL + "/" + locale + "/safety-signs/" + sign.slug,
              },
            ],
          }),
        }}
      />
      <ActivityTracker eventName="safety_sign_detail_open" />
    <main className="min-h-screen bg-slate-200 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/${locale}/safety-signs`}
          className="font-black text-blue-700"
        >
          ←{" "}
          {isTurkish
            ? "Güvenlik Levhaları"
            : "Safety Signs"}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="mx-auto h-[900px] w-[650px] max-w-full">
            <SignRenderer
              sign={sign}
              locale={locale}
            />
          </div>

          <aside className="h-fit rounded-[28px] bg-white p-7 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
              {sign.code}
            </p>

            <h1 className="mt-4 text-3xl font-black text-slate-950">
              {sign.title[locale]}
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              {sign.description[locale]}
            </p>

            <SignDownloadButtons
              signCode={sign.code}
              signTitle={sign.title[locale]}
              locale={locale}
            />

            <p className="mt-6 text-xs font-semibold leading-5 text-slate-500">
              {isTurkish
                ? "Profesyonel kullanıma uygun A4, A3 ve PNG formatlarında indirin."
                : "Download in A4, A3 or PNG format for professional use."}
            </p>
          </aside>
        </div>
      </div>
    </main>
    </>
  );
}
