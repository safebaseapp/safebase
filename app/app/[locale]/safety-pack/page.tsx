import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  ClipboardCheck,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Users,
} from "lucide-react";
import { safetyPacks } from "@/lib/safety-pack/data";
import SafetyPackIcon from "@/components/safety-pack/SafetyPackIcon";

type Props = {
  params: Promise<{ locale: string }>;
};

const heroImage =
  "https://images.pexels.com/photos/7739856/pexels-photo-7739856.jpeg?auto=compress&cs=tinysrgb&w=2200";

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
    openGraph: { title, description, url: canonical, siteName: "SERNEM", type: "website", locale: isTurkish ? "tr_TR" : "en_US" },
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

  const workflow = [
    { icon: BookOpen, no: "01", tr: "Hazırlan", en: "Prepare", trText: "Rehberi açın, kritik tehlikeleri ve kontrolleri anlayın.", enText: "Open the guide and understand the critical hazards and controls." },
    { icon: Users, no: "02", tr: "Ekibi bilgilendir", en: "Brief the team", trText: "Toolbox talk ile ekipte ortak risk farkındalığı oluşturun.", enText: "Create shared risk awareness with the toolbox talk." },
    { icon: ClipboardCheck, no: "03", tr: "Sahada doğrula", en: "Verify in field", trText: "Kontrol listesini kullanın, bulguları ve aksiyonları kaydedin.", enText: "Use the checklist and capture findings and actions." },
    { icon: ImageIcon, no: "04", tr: "Görünür kıl", en: "Make it visible", trText: "Poster ve levhalarla kritik kuralları sahada görünür tutun.", enText: "Keep critical rules visible with posters and safety signs." },
    { icon: BarChart3, no: "05", tr: "Riski değerlendir", en: "Assess the risk", trText: "İşe özel risk analizini oluşturun ve kontrolleri netleştirin.", enText: "Build the task-specific risk assessment and clarify the controls." },
    { icon: FileText, no: "06", tr: "Yöntemi belgele", en: "Document the method", trText: "Method Statement ile işi profesyonel biçimde dokümante edin.", enText: "Document the work professionally with a Method Statement." },
  ];

  return (
    <main className="min-h-screen bg-[#020712] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section
        className="relative min-h-[650px] overflow-hidden border-b border-white/[0.08] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,18,.98)_0%,rgba(2,7,18,.88)_42%,rgba(2,7,18,.34)_72%,rgba(2,7,18,.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,.23),transparent_35%),linear-gradient(180deg,transparent_55%,#020712_100%)]" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <Link href={`/${locale}/downloads`} className="text-sm font-black text-cyan-300 transition hover:text-cyan-200">
              ← {isTurkish ? "HSE Kaynak Merkezi" : "HSE Resource Center"}
            </Link>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.10] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.95)]" />
              SERNEM Safety Packs
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-[-0.06em] sm:text-6xl lg:text-[78px] lg:leading-[.98]">
              {isTurkish ? (
                <>Bir iş. Tek tam <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">HSE paketi.</span></>
              ) : (
                <>One task. One complete <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">HSE pack.</span></>
              )}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {isTurkish
                ? "Sahadaki kritik işlerde ihtiyacınız olan rehber, toolbox, denetim, poster, risk analizi, Method Statement ve levhaları tek akışta kullanın."
                : "Use the guide, toolbox talk, inspection, poster, risk assessment, Method Statement and safety signs you need for critical field work in one workflow."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#packs" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-black text-white shadow-[0_14px_45px_rgba(37,99,235,.32)] transition hover:-translate-y-0.5 hover:bg-blue-500">
                {isTurkish ? "Tüm Paketleri Keşfet" : "Explore All Packs"} <ArrowRight size={18} />
              </a>
              <a href="#workflow" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/55 px-6 py-4 font-black text-slate-200 backdrop-blur-xl transition hover:border-white/30 hover:text-white">
                {isTurkish ? "Nasıl çalışır?" : "How it works"}
              </a>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["9", isTurkish ? "yüksek risk paketi" : "high-risk packs"],
                ["7", isTurkish ? "kaynak türü" : "resource types"],
                ["TR / EN", isTurkish ? "iki dil" : "two languages"],
                ["1", isTurkish ? "saha akışı" : "field workflow"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 backdrop-blur-xl">
                  <strong className="text-2xl font-black">{value}</strong>
                  <p className="mt-1 text-xs font-bold text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="packs" className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.20em] text-cyan-300">{isTurkish ? "Safety Pack kategorileri" : "Safety Pack categories"}</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">{isTurkish ? "Sahadaki kritik işler için hazır paketler" : "Ready packs for critical field work"}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            {isTurkish
              ? "Her paket, mevcut SERNEM içerik ve araçlarını kopyalamadan doğru sırada birbirine bağlar."
              : "Each pack connects existing SERNEM content and tools in the right order without duplicating the source material."}
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {safetyPacks.map((pack, index) => (
            <Link
              key={pack.slug}
              href={`/${locale}/safety-pack/${pack.slug}`}
              className="group relative min-h-[340px] overflow-hidden rounded-[30px] border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_26px_85px_rgba(0,0,0,.35)]"
            >
              <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${pack.imageUrl})` }} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,7,18,.18)_0%,rgba(2,7,18,.60)_45%,rgba(2,7,18,.98)_100%)]" />
              <div className="absolute inset-0 opacity-45" style={{ background: `radial-gradient(circle at 18% 15%, ${pack.accent}66, transparent 34%)` }} />
              <div className="relative flex h-full min-h-[340px] flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/55 backdrop-blur-xl" style={{ color: pack.accent }}>
                    <SafetyPackIcon slug={pack.slug} size={28} />
                  </span>
                  <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-black text-slate-300 backdrop-blur-xl">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-auto pt-16">
                  <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: pack.accent }}>Safety Pack</p>
                  <h3 className="mt-2 text-2xl font-black">{pack.title[locale]}</h3>
                  <p className="mt-2 text-sm font-black text-white/80">{pack.tagline[locale]}</p>
                  <p className="mt-3 line-clamp-2 leading-6 text-slate-300">{pack.description[locale]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-black transition group-hover:translate-x-1" style={{ color: pack.accent }}>
                    {isTurkish ? "Tam paketi aç" : "Open complete pack"} <ArrowRight size={17} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="workflow" className="border-y border-white/[0.07] bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.20em] text-cyan-300">SERNEM Workflow</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">{isTurkish ? "İşi baştan sona yönetin" : "Run the task from start to finish"}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-500">
            {isTurkish ? "Tüm kaynakları tek iş akışında. Daha hızlı, daha kolay, daha kontrollü." : "All resources in one workflow. Faster, clearer and easier to control."}
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.no} className="relative rounded-[26px] border border-white/10 bg-slate-950/65 p-6">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300"><Icon size={22} /></span>
                    <span className="text-4xl font-black text-white/[0.07]">{item.no}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black">{isTurkish ? item.tr : item.en}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{isTurkish ? item.trText : item.enText}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.20em] text-blue-400">{isTurkish ? "Araçlarla entegre" : "Integrated with tools"}</p>
            <h2 className="mt-3 text-3xl font-black">{isTurkish ? "Paketten doğrudan işe geçin" : "Move directly from pack to action"}</h2>
          </div>
          <Link href={`/${locale}/tools`} className="hidden text-sm font-black text-blue-400 hover:text-blue-300 sm:inline-flex">{isTurkish ? "HSE Araçlarını Keşfet" : "Explore HSE Tools"} →</Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: BarChart3, href: "/tools/quick-risk-assessment", tr: "Risk Analizi", en: "Risk Assessment", trText: "Aktiviteyi seçin, riski değerlendirin ve ilgili Safety Pack'e dönün.", enText: "Select the activity, assess the risk and return to the related Safety Pack." },
            { icon: FileText, href: "/tools/method-statement", tr: "Method Statement", en: "Method Statement", trText: "Çalışma yöntemini hazırlayın ve pack kaynaklarıyla destekleyin.", enText: "Prepare the work method and support it with pack resources." },
            { icon: ClipboardCheck, href: "/checklists", tr: "Denetimler", en: "Inspections", trText: "Kritik kontrolleri sahada doğrulayın ve bulguları kaydedin.", enText: "Verify critical controls in the field and capture findings." },
            { icon: Bot, href: "/ai-assistant", tr: "AI Asistan", en: "AI Assistant", trText: "Sorun, analiz edin ve doğru HSE kaynağına hızlı ulaşın.", enText: "Ask, analyze and reach the right HSE resource quickly." },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={`/${locale}${tool.href}`} className="group rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.045] to-transparent p-6 transition hover:-translate-y-1 hover:border-blue-400/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.07] text-blue-300"><Icon size={22} /></span>
                <h3 className="mt-5 text-xl font-black">{isTurkish ? tool.tr : tool.en}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{isTurkish ? tool.trText : tool.enText}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-black text-blue-400 transition group-hover:translate-x-1">{isTurkish ? "Aç" : "Open"} <ArrowRight size={16} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[linear-gradient(90deg,rgba(37,99,235,.10),transparent_50%,rgba(6,182,212,.08))]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-300"><ShieldCheck size={19} /><span className="text-xs font-black uppercase tracking-[0.16em]">SERNEM Safety Packs</span></div>
            <h2 className="mt-3 text-3xl font-black">{isTurkish ? "Daha güvenli bir iş için doğru kaynakları birlikte kullanın." : "Use the right resources together for safer work."}</h2>
          </div>
          <a href="#packs" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-black transition hover:bg-blue-500">{isTurkish ? "Paketleri Gör" : "View Packs"} <ArrowRight size={18} /></a>
        </div>
      </section>
    </main>
  );
}
