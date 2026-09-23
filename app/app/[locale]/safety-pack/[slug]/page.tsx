import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSafetyPack, safetyPacks } from "@/lib/safety-pack/data";
import { resolveSafetyPackResources } from "@/lib/safety-pack/resolve";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

type ResourceCard = {
  step: string;
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  action: string;
};

export function generateStaticParams() {
  return (["tr", "en"] as const).flatMap((locale) =>
    safetyPacks.map((pack) => ({ locale, slug: pack.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const pack = getSafetyPack(slug);
  if (!pack) return {};

  const isTurkish = locale === "tr";
  const title = `${pack.title[locale]} Safety Pack | SERNEM`;
  const description = pack.description[locale];
  const canonical = `https://www.sernem.com/${locale}/safety-pack/${pack.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `https://www.sernem.com/tr/safety-pack/${pack.slug}`,
        en: `https://www.sernem.com/en/safety-pack/${pack.slug}`,
        "x-default": `https://www.sernem.com/en/safety-pack/${pack.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "article",
      locale: isTurkish ? "tr_TR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function SafetyPackDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (rawLocale !== "tr" && rawLocale !== "en") notFound();
  const locale = rawLocale;
  const isTurkish = locale === "tr";
  const pack = getSafetyPack(slug);
  if (!pack) notFound();

  const resources = resolveSafetyPackResources(pack);

  const cards: ResourceCard[] = [
    {
      step: "01",
      icon: "📘",
      eyebrow: isTurkish ? "Hazırlan" : "Prepare",
      title: resources.guide?.title[locale] ?? (isTurkish ? "Uygulama Rehberi" : "Practice Guide"),
      description: isTurkish
        ? "Tehlikeleri, kritik kontrolleri, KKD gerekliliklerini ve iş öncesi doğrulamaları inceleyin."
        : "Review hazards, critical controls, PPE requirements and pre-work verification.",
      href: resources.guide
        ? `/${locale}/knowledge-base/${resources.guide.slug}`
        : `/${locale}/knowledge-base`,
      action: isTurkish ? "Rehberi aç" : "Open guide",
    },
    {
      step: "02",
      icon: "🧰",
      eyebrow: isTurkish ? "Ekibi bilgilendir" : "Brief the team",
      title: resources.toolbox?.[locale].title ?? (isTurkish ? "Toolbox Talk" : "Toolbox Talk"),
      description: isTurkish
        ? "İşe başlamadan önce ekipte ortak risk farkındalığı ve kontrol doğrulaması oluşturun."
        : "Build shared risk awareness and verify controls with the team before work starts.",
      href: resources.toolbox
        ? `/${locale}/toolbox/${resources.toolbox.slug}`
        : `/${locale}/toolbox`,
      action: isTurkish ? "Toolbox'ı aç" : "Open toolbox",
    },
    {
      step: "03",
      icon: "📋",
      eyebrow: isTurkish ? "Sahada doğrula" : "Verify in field",
      title: resources.checklist?.title[locale] ?? (isTurkish ? "Denetim Kontrol Listesi" : "Inspection Checklist"),
      description: isTurkish
        ? "Kritik kontrolleri sahada madde madde doğrulayın, bulguları ve düzeltici faaliyetleri kaydedin."
        : "Verify critical controls item by item and record findings and corrective actions.",
      href: resources.checklist
        ? `/${locale}/checklists/${resources.checklist.slug}`
        : `/${locale}/checklists`,
      action: isTurkish ? "Denetimi başlat" : "Start inspection",
    },
    {
      step: "04",
      icon: "🖼️",
      eyebrow: isTurkish ? "Görünür kıl" : "Make it visible",
      title: resources.poster?.title[locale] ?? (isTurkish ? "Saha Posteri" : "Field Poster"),
      description: isTurkish
        ? "Kritik saha kurallarını A4/A3 posterle çalışma alanında görünür hale getirin."
        : "Keep critical field rules visible with an A4/A3 poster at the work area.",
      href: resources.poster
        ? `/${locale}/posters/${resources.poster.slug}`
        : `/${locale}/posters`,
      action: isTurkish ? "Posteri aç" : "Open poster",
    },
    {
      step: "05",
      icon: "⚠️",
      eyebrow: isTurkish ? "Riski değerlendir" : "Assess the risk",
      title: resources.riskAssessment?.activity[locale] ?? (isTurkish ? "Risk Analizi" : "Risk Assessment"),
      description: isTurkish
        ? "İşe özel tehlikeleri ve kontrol önlemlerini SERNEM risk analizi akışında değerlendirin."
        : "Assess task-specific hazards and controls in the SERNEM risk-assessment workflow.",
      href: resources.riskAssessment
        ? `/${locale}/risk-assessment/${resources.riskAssessment.id}`
        : `/${locale}/risk-assessment`,
      action: isTurkish ? "Risk analizini aç" : "Open risk assessment",
    },
    {
      step: "06",
      icon: "📝",
      eyebrow: isTurkish ? "Yöntemi belgele" : "Document the method",
      title: "Method Statement",
      description: isTurkish
        ? "İş sırasını, sorumlulukları, KKD'yi, izinleri ve acil durum düzenlemelerini profesyonel şablonda hazırlayın."
        : "Document the work sequence, responsibilities, PPE, permits and emergency arrangements in a professional template.",
      href: `/${locale}/tools/method-statement`,
      action: isTurkish ? "Method Statement oluştur" : "Create Method Statement",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${pack.title[locale]} Safety Pack`,
    description: pack.description[locale],
    url: `https://www.sernem.com/${locale}/safety-pack/${pack.slug}`,
    isPartOf: {
      "@type": "CollectionPage",
      name: "SERNEM Safety Packs",
      url: `https://www.sernem.com/${locale}/safety-pack`,
    },
  };

  return (
    <main className="min-h-screen bg-[#020712] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,.18),transparent_38%),radial-gradient(circle_at_85%_45%,rgba(16,185,129,.08),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Link href={`/${locale}/safety-pack`} className="text-sm font-black text-blue-400 transition hover:text-blue-300">
            ← {isTurkish ? "Tüm Safety Pack'ler" : "All Safety Packs"}
          </Link>

          <div className="mt-9 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.08] text-3xl">{pack.icon}</span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">SERNEM Safety Pack</p>
                  <p className="mt-1 text-sm font-bold text-slate-500">{isTurkish ? "Sahada kullanıma hazır iş akışı" : "Field-ready HSE workflow"}</p>
                </div>
              </div>
              <h1 className="mt-7 text-5xl font-black tracking-[-0.05em] sm:text-6xl">{pack.title[locale]}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{pack.description[locale]}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-[390px]">
              {[
                ["6", isTurkish ? "ana araç" : "core tools"],
                [String(resources.signs.length), isTurkish ? "ilgili levha" : "safety signs"],
                ["TR/EN", isTurkish ? "dil" : "languages"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <strong className="block text-xl font-black">{value}</strong>
                  <span className="mt-1 block text-[11px] font-bold text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">SERNEM Workflow</p>
          <h2 className="mt-2 text-3xl font-black">{isTurkish ? "İşi baştan sona yönetin" : "Run the task from start to finish"}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-500">
            {isTurkish
              ? "Aşağıdaki sıra bir zorunluluk değil; sahadaki hazırlık, bilgilendirme, doğrulama, risk değerlendirmesi ve dokümantasyon işini tek yerde toplamak için önerilen akıştır."
              : "The sequence below is a practical workflow for bringing preparation, briefing, verification, risk assessment and documentation into one place."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.step}
              href={card.href}
              className="group flex min-h-[330px] flex-col rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-[0_22px_65px_rgba(37,99,235,.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-2xl">{card.icon}</span>
                <span className="text-4xl font-black text-white/[0.08] transition group-hover:text-blue-400/20">{card.step}</span>
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-blue-400">{card.eyebrow}</p>
              <h3 className="mt-2 text-xl font-black leading-snug">{card.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">{card.description}</p>
              <span className="mt-6 font-black text-cyan-300 transition group-hover:translate-x-1">{card.action} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">{isTurkish ? "Saha görünürlüğü" : "Field visibility"}</p>
              <h2 className="mt-2 text-2xl font-black">{isTurkish ? "İlgili güvenlik levhaları" : "Related safety signs"}</h2>
            </div>
            <Link href={`/${locale}/safety-signs`} className="text-sm font-black text-blue-400 hover:text-blue-300">
              {isTurkish ? "Tüm levhaları gör" : "View all signs"} →
            </Link>
          </div>

          {resources.signs.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {resources.signs.map((sign) => (
                <Link
                  key={sign.slug}
                  href={`/${locale}/safety-signs/${sign.slug}`}
                  className="group flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-slate-950/55 p-5 transition hover:border-amber-300/30"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">{sign.code}</p>
                    <h3 className="mt-2 text-lg font-black">{sign.title[locale]}</h3>
                    <p className="mt-2 text-sm text-slate-500">{sign.description[locale]}</p>
                  </div>
                  <span className="text-xl text-slate-600 transition group-hover:translate-x-1 group-hover:text-amber-300">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <Link href={`/${locale}/safety-signs`} className="mt-6 inline-flex rounded-xl bg-amber-500 px-5 py-3 font-black text-slate-950">
              {isTurkish ? "Güvenlik Levhalarını Aç" : "Open Safety Signs"} →
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="rounded-[30px] border border-emerald-400/20 bg-gradient-to-r from-emerald-400/[0.08] via-blue-500/[0.06] to-transparent p-7 sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">{isTurkish ? "Tek merkez" : "One workspace"}</p>
          <h2 className="mt-3 text-3xl font-black">{isTurkish ? "Aynı konu için sekme sekme kaynak aramayın." : "Stop searching for the same task across separate libraries."}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-400">
            {isTurkish
              ? "Safety Pack, SERNEM'deki mevcut profesyonel kaynakları tek bir faaliyet etrafında toplar. Kaynakların kendisi güncellendiğinde bu paket de otomatik olarak güncel kaynağa yönlendirir."
              : "Safety Pack organizes SERNEM's existing professional resources around one activity. When an underlying resource is updated, the pack continues to point to the current source."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/${locale}/safety-pack`} className="rounded-xl bg-emerald-500 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-400">
              {isTurkish ? "Diğer Safety Pack'ler" : "More Safety Packs"} →
            </Link>
            <Link href={`/${locale}/downloads`} className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 font-black text-white transition hover:bg-white/[0.08]">
              {isTurkish ? "HSE Kaynak Merkezi" : "HSE Resource Center"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
