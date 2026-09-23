import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { safetyPacks } from "@/lib/safety-pack/data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";
  const canonical = `https://www.sernem.com/${locale}/safety-pack`;
  const title = isTurkish ? "HSE Safety Pack'leri | SERNEM" : "HSE Safety Packs | SERNEM";
  const description = isTurkish
    ? "Yüksek riskli işler için rehber, toolbox, denetim, poster, risk analizi, Method Statement ve güvenlik levhalarını tek saha paketinde kullanın."
    : "Use guides, toolbox talks, inspections, posters, risk assessments, Method Statements and safety signs in one field pack for high-risk work.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/safety-pack",
        en: "https://www.sernem.com/en/safety-pack",
        "x-default": "https://www.sernem.com/en/safety-pack",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "website",
      locale: isTurkish ? "tr_TR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function SafetyPackLandingPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "tr" && rawLocale !== "en") notFound();
  const locale = rawLocale;
  const isTurkish = locale === "tr";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isTurkish ? "SERNEM HSE Safety Pack'leri" : "SERNEM HSE Safety Packs",
    url: `https://www.sernem.com/${locale}/safety-pack`,
    hasPart: safetyPacks.map((pack) => ({
      "@type": "WebPage",
      name: pack.title[locale],
      url: `https://www.sernem.com/${locale}/safety-pack/${pack.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-[#020712] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_10%,rgba(37,99,235,.20),transparent_38%),radial-gradient(circle_at_80%_35%,rgba(6,182,212,.10),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <Link href={`/${locale}/downloads`} className="text-sm font-black text-blue-400 transition hover:text-blue-300">
            ← {isTurkish ? "HSE Kaynak Merkezi" : "HSE Resource Center"}
          </Link>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)]" />
            SERNEM Safety Packs
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            {isTurkish ? "Bir iş. Tek tam HSE paketi." : "One task. One complete HSE pack."}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {isTurkish
              ? "Sahadaki kritik bir işi seçin. SERNEM ilgili rehberi, toolbox talk'ı, denetimi, posteri, risk analizini, Method Statement aracını ve güvenlik levhalarını tek iş akışında birleştirsin."
              : "Choose a critical field activity. SERNEM brings the related guide, toolbox talk, inspection, poster, risk assessment, Method Statement tool and safety signs into one workflow."}
          </p>

          <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-4">
            {[
              ["9", isTurkish ? "yüksek risk paketi" : "high-risk packs"],
              ["7", isTurkish ? "kaynak türü" : "resource types"],
              ["TR / EN", isTurkish ? "iki dil" : "two languages"],
              ["1", isTurkish ? "saha akışı" : "field workflow"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <strong className="text-2xl font-black">{value}</strong>
                <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              {isTurkish ? "Saha paketleri" : "Field-ready packs"}
            </p>
            <h2 className="mt-2 text-3xl font-black">{isTurkish ? "İşinizi seçin" : "Choose the activity"}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            {isTurkish
              ? "Her paket mevcut SERNEM kaynaklarını tekrar kopyalamadan doğru sırada birbirine bağlar."
              : "Each pack connects existing SERNEM resources in the right order without duplicating the source content."}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {safetyPacks.map((pack, index) => (
            <Link
              key={pack.slug}
              href={`/${locale}/safety-pack/${pack.slug}`}
              className="group flex min-h-[300px] flex-col rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_24px_70px_rgba(8,145,178,.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.08] text-2xl">{pack.icon}</span>
                <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-black text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Safety Pack</p>
              <h3 className="mt-2 text-2xl font-black">{pack.title[locale]}</h3>
              <p className="mt-4 flex-1 leading-7 text-slate-400">{pack.description[locale]}</p>
              <span className="mt-6 inline-flex font-black text-blue-400 transition group-hover:translate-x-1 group-hover:text-cyan-300">
                {isTurkish ? "Tam paketi aç" : "Open complete pack"} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-14 lg:grid-cols-3 lg:px-8">
          {[
            ["01", isTurkish ? "Hazırlan" : "Prepare", isTurkish ? "Rehberi okuyun ve risk analizini açın." : "Review the guide and open the risk assessment."],
            ["02", isTurkish ? "Ekibi hazırla" : "Brief the team", isTurkish ? "Toolbox talk ve saha posterini kullanın." : "Use the toolbox talk and field poster."],
            ["03", isTurkish ? "Doğrula ve belgele" : "Verify & document", isTurkish ? "Denetimi tamamlayın ve Method Statement'ı hazırlayın." : "Complete the inspection and prepare the Method Statement."],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <span className="text-sm font-black text-cyan-300">{number}</span>
              <h3 className="mt-3 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
