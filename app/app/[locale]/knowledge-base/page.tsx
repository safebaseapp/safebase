import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideDirectoryClient from "./components/GuideDirectoryClient";
import { allGuides } from "./data/guides/all-guides";
import { fieldForms } from "@/lib/content/fieldForms";
import { specialistGuides } from "./data/guides/specialist-guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const language = locale === "tr" ? "tr" : "en";
  const isTurkish = language === "tr";
  const canonical = `https://www.sernem.com/${language}/knowledge-base`;

  const title = isTurkish
    ? `${allGuides.length} İSG Rehberi | SERNEM Bilgi Merkezi`
    : `${allGuides.length} HSE Guides | SERNEM Knowledge Base`;

  const description = isTurkish
    ? `Yüksekte çalışma, proses güvenliği, devreye alma, kaldırma, kapalı alan, elektrik, sıcak çalışma ve ekipman için ${allGuides.length} profesyonel saha rehberi.`
    : `${allGuides.length} field-ready HSE guides on process safety, commissioning, work at height, lifting, confined space, electrical, hot work and industrial equipment.`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/knowledge-base",
        en: "https://www.sernem.com/en/knowledge-base",
        "x-default": "https://www.sernem.com/en/knowledge-base",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "website",
      locale: isTurkish ? "tr_TR" : "en_US",
      alternateLocale: isTurkish ? ["en_US"] : ["tr_TR"],
    },
  };
}

export default async function KnowledgeBasePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") notFound();

  const guides = allGuides.map((guide) => ({
    slug: guide.slug,
    title: guide.title[locale],
    description: guide.description[locale],
    category: guide.category[locale],
    readTime: guide.readTime,
    riskLevel: guide.riskLevel?.[locale],
  }));

  // Give priority, public HSE references direct crawlable internal links.
  // A visible link list is more dependable than links hidden in interactive filtering.
  const prioritySlugs = [
    "dropped-object-prevention",
    "confined-space-attendant-duties",
    "stored-energy-hazards",
    "hydraulic-system-safety",
    "scaffold-tagging-systems",
    "line-breaking-safety",
    "suspended-load-exclusion-zones",
    "confined-space",
    "hot-work",
    "working-at-height",
  ];
  const priorityGuides = prioritySlugs
    .map((slug) => guides.find((item) => item.slug === slug))
    .filter((item): item is (typeof guides)[number] => Boolean(item));

  return (
    <>
      <GuideDirectoryClient locale={locale} guides={guides} />

      <section aria-labelledby="specialist-guides-heading" className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-2xl border border-emerald-400/20 bg-slate-900 p-6 text-white">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
            {locale === "tr" ? "YENİ • UZMANLIK REHBERLERİ" : "NEW • SPECIALIST GUIDES"}
          </p>
          <h2 id="specialist-guides-heading" className="mt-3 text-2xl font-extrabold">
            {locale === "tr" ? "12 yeni endüstriyel HSE saha rehberi" : "12 new industrial HSE field guides"}
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
            {locale === "tr"
              ? "Isıl işlem, radyografi, azotla inertleme, PSV, buhar üfleme, PSSR ve değişiklik yönetimi dahil uzmanlık konularında kontrol önlemleri, iş öncesi doğrulamalar ve durdurma kriterleri."
              : "Specialist safeguards, pre-start checks and stop-work triggers for PWHT, radiography, inerting, PSV, steam blowing, PSSR and change management."}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {specialistGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${locale}/knowledge-base/${guide.slug}`}
                className="flex min-h-20 items-center rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-sky-200 transition hover:border-sky-400/45 hover:bg-white/[0.08]"
              >
                {guide.title[locale]} <span aria-hidden="true" className="ml-auto pl-3">↗</span>
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/tools/method-statement`}
            className="mt-7 inline-flex min-h-11 items-center text-sm font-bold text-emerald-300 underline underline-offset-4"
          >
            {locale === "tr" ? "İşe özel Method Statement oluşturucusunu aç" : "Open the task-specific Method Statement generator"} →
          </Link>
        </div>
      </section>
      <aside className="mx-auto max-w-6xl px-5 pb-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold">
              {locale === "tr" ? `${fieldForms.length} ücretsiz düzenlenebilir İSG saha formu` : `${fieldForms.length} free editable HSE field forms`}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
              {locale === "tr"
                ? "JSA, LOTO, sıcak çalışma, kapalı alan, kaldırma planı, PTW devir ve toolbox dahil saha formlarını doldurup yazdırın."
                : "Use free printable JSA, LOTO, hot work, confined space, lifting, PTW and toolbox forms, with action tracking."}
            </p>
          </div>
          <Link href={"/" + locale + "/field-forms"} className="shrink-0 rounded-xl bg-emerald-700 px-5 py-3 text-center font-bold text-white hover:bg-emerald-600">
            {locale === "tr" ? "Saha formlarını aç" : "Explore field forms"} →
          </Link>
        </div>
      </aside>
      <aside className="mx-auto max-w-6xl px-5 pb-10">
        <div className="flex flex-col gap-4 rounded-2xl border border-sky-200 bg-sky-50 p-6 text-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">{locale === "tr" ? "Yeni: İşe özel çalışma metodu örnekleri" : "New: Task-specific method statement examples"}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-700">{locale === "tr" ? "Proses hattı açma, pnömatik test, grating, trifor, kaynak ve flanş işleri için tehlike ve kontrol adımlarını inceleyin." : "Explore safe-work examples for line breaking, pneumatic testing, grating, chain hoists, welding and flange assembly."}</p>
          </div>
          <Link href={`/${locale}/method-statements`} className="shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-center font-bold text-white hover:bg-sky-600">{locale === "tr" ? "Metot örneklerini aç" : "Read method examples"} →</Link>
        </div>
      </aside>
      <nav aria-label={locale === "tr" ? "Öncelikli teknik rehberler" : "Featured technical safety guides"} className="mx-auto max-w-6xl px-5 pb-10">
        <div className="rounded-2xl border border-blue-200 bg-white p-6 text-slate-900">
          <h2 className="text-xl font-extrabold">
            {locale === "tr" ? "Öne çıkan teknik saha rehberleri" : "Featured technical field guides"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {locale === "tr"
              ? "Saha kontrolleri, iş izinleri ve kritik tehlikeler için doğrudan teknik kaynaklara geçin."
              : "Open focused references on field controls, work permits and critical hazards."}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {priorityGuides.map((item) => (
              <Link key={item.slug} href={`/${locale}/knowledge-base/${item.slug}`} className="rounded-xl border border-slate-200 px-4 py-3 font-semibold text-blue-800 transition hover:border-blue-400 hover:bg-blue-50">
                {item.title} <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <nav aria-label={locale === "tr" ? "Bilgi merkezi rehber dizini" : "Knowledge base guide directory"} className="mx-auto max-w-6xl px-5 pb-12">
        <details className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900">
          <summary className="cursor-pointer font-semibold">{locale === "tr" ? `${allGuides.length} İSG rehberinin tamamı` : `Browse all ${allGuides.length} HSE guides`}</summary>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{guides.map(item=><Link key={item.slug} href={`/${locale}/knowledge-base/${item.slug}`} className="rounded-lg px-2 py-1 text-sm text-blue-700 hover:underline">{item.title}</Link>)}</div>
        </details>
      </nav>
    </>
  );
}
