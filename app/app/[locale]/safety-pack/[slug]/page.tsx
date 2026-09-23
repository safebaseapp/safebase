import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ClipboardCheck,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getSafetyPack, safetyPacks } from "@/lib/safety-pack/data";
import { resolveSafetyPackResources } from "@/lib/safety-pack/resolve";
import SafetyPackIcon from "@/components/safety-pack/SafetyPackIcon";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

type ResourceCard = {
  step: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
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
      images: [{ url: pack.imageUrl }],
    },
    twitter: { card: "summary_large_image", title, description, images: [pack.imageUrl] },
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
      icon: ShieldCheck,
      eyebrow: isTurkish ? "Hazırlan" : "Prepare",
      title: resources.guide?.title[locale] ?? (isTurkish ? "Uygulama Rehberi" : "Practice Guide"),
      description: isTurkish
        ? "Tehlikeleri, kritik kontrolleri, KKD gerekliliklerini ve iş öncesi doğrulamaları inceleyin."
        : "Review hazards, critical controls, PPE requirements and pre-work verification.",
      href: resources.guide ? `/${locale}/knowledge-base/${resources.guide.slug}` : `/${locale}/knowledge-base`,
      action: isTurkish ? "Rehberi aç" : "Open guide",
    },
    {
      step: "02",
      icon: Users,
      eyebrow: isTurkish ? "Ekibi bilgilendir" : "Brief the team",
      title: resources.toolbox?.[locale].title ?? "Toolbox Talk",
      description: isTurkish
        ? "İşe başlamadan önce ekipte ortak risk farkındalığı ve kontrol doğrulaması oluşturun."
        : "Build shared risk awareness and verify controls with the team before work starts.",
      href: resources.toolbox ? `/${locale}/toolbox/${resources.toolbox.slug}` : `/${locale}/toolbox`,
      action: isTurkish ? "Toolbox'ı aç" : "Open toolbox",
    },
    {
      step: "03",
      icon: ClipboardCheck,
      eyebrow: isTurkish ? "Sahada doğrula" : "Verify in field",
      title: resources.checklist?.title[locale] ?? (isTurkish ? "Denetim Kontrol Listesi" : "Inspection Checklist"),
      description: isTurkish
        ? "Kritik kontrolleri sahada madde madde doğrulayın, bulguları ve düzeltici faaliyetleri kaydedin."
        : "Verify critical controls item by item and record findings and corrective actions.",
      href: resources.checklist ? `/${locale}/checklists/${resources.checklist.slug}` : `/${locale}/checklists`,
      action: isTurkish ? "Denetimi başlat" : "Start inspection",
    },
    {
      step: "04",
      icon: ImageIcon,
      eyebrow: isTurkish ? "Görünür kıl" : "Make it visible",
      title: resources.poster?.title[locale] ?? (isTurkish ? "Saha Posteri" : "Field Poster"),
      description: isTurkish
        ? "Kritik saha kurallarını A4/A3 posterle çalışma alanında görünür hale getirin."
        : "Keep critical field rules visible with an A4/A3 poster at the work area.",
      href: resources.poster ? `/${locale}/posters/${resources.poster.slug}` : `/${locale}/posters`,
      action: isTurkish ? "Posteri aç" : "Open poster",
    },
    {
      step: "05",
      icon: BarChart3,
      eyebrow: isTurkish ? "Riski değerlendir" : "Assess the risk",
      title: resources.riskAssessment?.activity[locale] ?? (isTurkish ? "Risk Analizi" : "Risk Assessment"),
      description: isTurkish
        ? "İşe özel tehlikeleri ve kontrol önlemlerini SERNEM risk analizi akışında değerlendirin."
        : "Assess task-specific hazards and controls in the SERNEM risk-assessment workflow.",
      href: resources.riskAssessment ? `/${locale}/risk-assessment/${resources.riskAssessment.id}` : `/${locale}/tools/quick-risk-assessment`,
      action: isTurkish ? "Risk analizini aç" : "Open risk assessment",
    },
    {
      step: "06",
      icon: FileText,
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
    primaryImageOfPage: { "@type": "ImageObject", contentUrl: pack.imageUrl },
    isPartOf: {
      "@type": "CollectionPage",
      name: "SERNEM Safety Packs",
      url: `https://www.sernem.com/${locale}/safety-pack`,
    },
  };

  return (
    <main className="min-h-screen bg-[#020712] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section
        className="relative min-h-[590px] overflow-hidden border-b border-white/[0.08] bg-cover bg-center"
        style={{ backgroundImage: `url(${pack.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,18,.98)_0%,rgba(2,7,18,.88)_45%,rgba(2,7,18,.40)_78%,rgba(2,7,18,.52)_100%)]" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 18% 22%, ${pack.accent}32, transparent 36%), linear-gradient(180deg, transparent 62%, #020712 100%)` }} />

        <div className="relative mx-auto flex min-h-[590px] max-w-7xl items-center px-6 py-16 lg:px-8">
          <div className="max-w-4xl">
            <Link href={`/${locale}/safety-pack`} className="text-sm font-black text-blue-300 transition hover:text-white">
              ← {isTurkish ? "Tüm Safety Pack'ler" : "All Safety Packs"}
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/55 backdrop-blur-xl" style={{ color: pack.accent }}>
                <SafetyPackIcon slug={pack.slug} size={31} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: pack.accent }}>SERNEM Safety Pack</p>
                <p className="mt-1 text-sm font-bold text-slate-400">{isTurkish ? "Sahada kullanıma hazır HSE iş akışı" : "Field-ready HSE workflow"}</p>
              </div>
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">{pack.title[locale]}</h1>
            <p className="mt-4 text-xl font-black" style={{ color: pack.accent }}>{pack.tagline[locale]}</p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{pack.description[locale]}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#workflow" className="inline-flex items-center gap-2 rounded-2xl px-6 py-4 font-black text-slate-950 transition hover:-translate-y-0.5" style={{ backgroundColor: pack.accent }}>
                {isTurkish ? "Paketi Başlat" : "Start the Pack"} <ArrowRight size={18} />
              </a>
              <Link href={`/${locale}/tools/quick-risk-assessment`} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/50 px-6 py-4 font-black text-white backdrop-blur-xl transition hover:border-white/30">
                {isTurkish ? "Risk Analizi Oluştur" : "Build Risk Assessment"} <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["6", isTurkish ? "ana adım" : "core steps"],
                [String(resources.signs.length), isTurkish ? "ilgili levha" : "safety signs"],
                ["TR/EN", isTurkish ? "iki dil" : "two languages"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 backdrop-blur-xl">
                  <strong className="block text-xl font-black">{value}</strong>
                  <span className="mt-1 block text-[11px] font-bold text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-18">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: pack.accent }}>SERNEM Workflow</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">{isTurkish ? "İşi baştan sona yönetin" : "Run the task from start to finish"}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-500">
            {isTurkish
              ? "Hazırlık, ekip bilgilendirmesi, saha doğrulaması, görünürlük, risk değerlendirmesi ve dokümantasyonu aynı akışta yönetin."
              : "Manage preparation, team briefing, field verification, visibility, risk assessment and documentation in one workflow."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.step}
                href={card.href}
                className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_75px_rgba(0,0,0,.28)]"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: pack.accent }} />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/65" style={{ color: pack.accent }}><Icon size={23} strokeWidth={1.8} /></span>
                  <span className="text-4xl font-black text-white/[0.07] transition group-hover:text-white/[0.12]">{card.step}</span>
                </div>
                <p className="relative mt-6 text-xs font-black uppercase tracking-[0.14em]" style={{ color: pack.accent }}>{card.eyebrow}</p>
                <h3 className="relative mt-2 text-xl font-black leading-snug">{card.title}</h3>
                <p className="relative mt-4 flex-1 text-sm leading-7 text-slate-400">{card.description}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 font-black transition group-hover:translate-x-1" style={{ color: pack.accent }}>{card.action} <ArrowRight size={16} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">{isTurkish ? "SERNEM Araçları" : "SERNEM Tools"}</p>
              <h2 className="mt-2 text-3xl font-black">{isTurkish ? "Paketten doğrudan aksiyona geçin" : "Move directly from the pack to action"}</h2>
            </div>
            <Link href={`/${locale}/tools`} className="text-sm font-black text-blue-400 hover:text-blue-300">{isTurkish ? "Tüm araçları aç" : "Open all tools"} →</Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { icon: BarChart3, href: resources.riskAssessment ? `/${locale}/risk-assessment/${resources.riskAssessment.id}` : `/${locale}/tools/quick-risk-assessment`, title: isTurkish ? "Risk Analizi" : "Risk Assessment", text: isTurkish ? "Bu işe özel tehlikeleri ve kontrolleri değerlendirin." : "Assess hazards and controls specific to this task." },
              { icon: FileText, href: `/${locale}/tools/method-statement`, title: "Method Statement", text: isTurkish ? "İş yöntemini, sorumlulukları ve saha kontrollerini belgeleyin." : "Document the work method, responsibilities and field controls." },
              { icon: Bot, href: `/${locale}/ai-assistant`, title: "SERNEM AI", text: isTurkish ? "Paketle ilgili HSE sorularınızı analiz edin ve doğru kaynaklara ulaşın." : "Analyze HSE questions about the pack and reach the right resources." },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-white/10 bg-slate-950/60 p-5 transition hover:-translate-y-1 hover:border-blue-400/30">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.06] text-blue-300"><Icon size={22} /></span>
                    <div><h3 className="font-black">{tool.title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{tool.text}</p></div>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-400 transition group-hover:translate-x-1">{isTurkish ? "Aracı aç" : "Open tool"} <ArrowRight size={15} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">{isTurkish ? "Saha görünürlüğü" : "Field visibility"}</p>
            <h2 className="mt-2 text-2xl font-black">{isTurkish ? "İlgili güvenlik levhaları" : "Related safety signs"}</h2>
          </div>
          <Link href={`/${locale}/safety-signs`} className="text-sm font-black text-blue-400 hover:text-blue-300">{isTurkish ? "Tüm levhaları gör" : "View all signs"} →</Link>
        </div>

        {resources.signs.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {resources.signs.map((sign) => (
              <Link key={sign.slug} href={`/${locale}/safety-signs/${sign.slug}`} className="group flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-slate-950/55 p-5 transition hover:border-amber-300/30">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-300">{sign.code}</p>
                  <h3 className="mt-2 text-lg font-black">{sign.title[locale]}</h3>
                  <p className="mt-2 text-sm text-slate-500">{sign.description[locale]}</p>
                </div>
                <ArrowRight className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-amber-300" size={20} />
              </Link>
            ))}
          </div>
        ) : (
          <Link href={`/${locale}/safety-signs`} className="mt-6 inline-flex rounded-xl bg-amber-500 px-5 py-3 font-black text-slate-950">{isTurkish ? "Güvenlik Levhalarını Aç" : "Open Safety Signs"} →</Link>
        )}
      </section>

      <section className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 p-8 sm:p-10">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${pack.imageUrl})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020712] via-[#020712]/95 to-[#020712]/60" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2" style={{ color: pack.accent }}><ShieldCheck size={19} /><span className="text-xs font-black uppercase tracking-[0.17em]">SERNEM Safety Pack</span></div>
                <h2 className="mt-4 text-3xl font-black sm:text-4xl">{isTurkish ? `${pack.title.tr} işini tek akışta yönetin.` : `Run ${pack.title.en.toLowerCase()} in one connected workflow.`}</h2>
                <p className="mt-4 leading-7 text-slate-400">{isTurkish ? "İçerikleri tek tek aramak yerine doğru rehber, toolbox, denetim ve araçlara bu paketten ulaşın." : "Instead of searching resources one by one, reach the right guide, toolbox, inspection and tools from this pack."}</p>
              </div>
              <a href="#workflow" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-4 font-black text-slate-950 transition hover:-translate-y-0.5" style={{ backgroundColor: pack.accent }}>{isTurkish ? "Paketi Başlat" : "Start Pack"} <ArrowRight size={18} /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
