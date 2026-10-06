import Link from "next/link";
import { allGuides } from "../data/guides/all-guides";
import RelatedGuideResources from "./RelatedGuideResources";

export type LocalizedText = {
  en: string;
  tr: string;
};

export type RelatedGuide = {
  slug: string;
  title: LocalizedText;
  icon?: string;
};

export type SafetyGuide = {
  slug: string;
  category: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  overview: LocalizedText;
  readTime: number;
  riskLevel?: LocalizedText;
  standard?: string;
  hazards: {
    en: string[];
    tr: string[];
  };
  requiredPPE?: {
    en: string[];
    tr: string[];
  };
  controls: {
    en: string[];
    tr: string[];
  };
  commonMistakes?: {
    en: string[];
    tr: string[];
  };
  checklist?: {
    title: LocalizedText;
    en: string[];
    tr: string[];
  };
  emergencySection?: {
    title: LocalizedText;
    content: LocalizedText;
  };
  references: string[];
  relatedGuides?: RelatedGuide[];

  searchKeywords?: {
    en: string[];
    tr: string[];
  };

  aiText: LocalizedText;
};

type GuideTemplateProps = {
  locale: string;
  guide: SafetyGuide;
};

export default function GuideTemplate({
  locale,
  guide,
}: GuideTemplateProps) {
  const language = locale === "tr" ? "tr" : "en";
  const isTurkish = language === "tr";

  const hazards = guide.hazards[language];
  const controls = guide.controls[language];
  const requiredPPE = guide.requiredPPE?.[language] ?? [];
  const commonMistakes = guide.commonMistakes?.[language] ?? [];
  const checklist = guide.checklist?.[language] ?? [];
  const visibleReferences = guide.references.filter((reference) =>
    reference.trim().toUpperCase().startsWith("OSHA"),
  );

  const relatedGuides: RelatedGuide[] =
    guide.relatedGuides && guide.relatedGuides.length > 0
      ? guide.relatedGuides
      : allGuides
          .filter(
            (candidate) =>
              candidate.slug !== guide.slug &&
              candidate.category.en === guide.category.en,
          )
          .slice(0, 3)
          .map((candidate) => ({
            slug: candidate.slug,
            title: candidate.title,
            icon: "↗",
          }));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-blue-950/40 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <Link
            href={`/${language}/knowledge-base`}
            className="text-sm font-bold text-blue-400 transition hover:text-blue-300"
          >
            ← {isTurkish ? "Bilgi Merkezine Dön" : "Back to Knowledge Base"}
          </Link>

          <p className="mt-10 text-sm font-black uppercase tracking-[0.22em] text-emerald-400">
            {guide.category[language]}
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
            {guide.title[language]}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {guide.description[language]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
              OSHA
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
              {guide.readTime} {isTurkish ? "dk okuma" : "min read"}
            </span>

            {guide.riskLevel ? (
              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300">
                {guide.riskLevel[language]}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-16 lg:px-8">
        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Genel Bakış" : "Overview"}
          </h2>
          <p className="mt-5 leading-8 text-slate-400">{guide.overview[language]}</p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Başlıca Tehlikeler" : "Main Hazards"}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {hazards.map((hazard) => (
              <li key={hazard} className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-300">• {hazard}</li>
            ))}
          </ul>
        </article>

        {requiredPPE.length > 0 ? (
          <article className="rounded-3xl border border-violet-400/20 bg-violet-400/5 p-8">
            <h2 className="text-3xl font-black">{isTurkish ? "Gerekli KKD" : "Required PPE"}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {requiredPPE.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-violet-400/15 bg-slate-950/40 px-4 py-4 text-slate-300">
                  <span className="font-black text-violet-300">✓</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">{isTurkish ? "Temel Kontroller" : "Essential Controls"}</h2>
          <ol className="mt-6 space-y-4">
            {controls.map((control, index) => (
              <li key={control} className="flex gap-4 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black">{index + 1}</span>
                <span className="pt-1 text-slate-300">{control}</span>
              </li>
            ))}
          </ol>
        </article>

        {commonMistakes.length > 0 ? (
          <article className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8">
            <h2 className="text-3xl font-black">{isTurkish ? "Yaygın Hatalar" : "Common Mistakes"}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {commonMistakes.map((mistake) => (
                <li key={mistake} className="flex items-start gap-3 rounded-xl border border-amber-400/15 bg-slate-950/40 px-4 py-4 text-slate-300">
                  <span className="font-black text-amber-400">×</span><span>{mistake}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        {guide.checklist && checklist.length > 0 ? (
          <article className="rounded-3xl border border-blue-400/20 bg-blue-500/5 p-8">
            <h2 className="text-3xl font-black">{guide.checklist.title[language]}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-blue-400/15 bg-slate-950/40 px-4 py-4 text-slate-300">
                  <span className="font-black text-emerald-400">✓</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        {guide.emergencySection ? (
          <article className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-8">
            <h2 className="text-3xl font-black">{guide.emergencySection.title[language]}</h2>
            <p className="mt-5 leading-8 text-slate-400">{guide.emergencySection.content[language]}</p>
          </article>
        ) : null}

        {visibleReferences.length > 0 ? (
          <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8">
            <h2 className="text-3xl font-black">{isTurkish ? "OSHA Referansları" : "OSHA References"}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {visibleReferences.map((reference) => (
                <span key={reference} className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">{reference}</span>
              ))}
            </div>
          </article>
        ) : null}

        {relatedGuides.length > 0 ? (
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-3xl font-black">{isTurkish ? "İlgili Rehberler" : "Related Guides"}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/${language}/knowledge-base/${relatedGuide.slug}`}
                  className="group rounded-xl border border-white/10 bg-slate-900/60 px-5 py-4 font-bold text-slate-300 transition hover:-translate-y-1 hover:border-blue-400/30 hover:text-white"
                >
                  <span className="mr-2">{relatedGuide.icon}</span>
                  {relatedGuide.title[language]}
                  <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </article>
        ) : null}

        {guide.slug === "confined-space-attendant-duties" ? (
          <article className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.07] p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">{isTurkish ? "REHBERDEN SAHA AKIŞINA" : "FROM GUIDE TO FIELD WORKFLOW"}</p>
            <h2 className="mt-3 text-3xl font-black">{isTurkish ? "Gözcü görevlerini sahada uygula" : "Put attendant duties into the field workflow"}</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-400">{isTurkish ? "Rehberi okumakla kalmayın: kapalı alan risklerini açın, giriş öncesi kontrol listesini tamamlayın ve ekiple toolbox talk yapın." : "Move beyond the guide: review confined-space hazards, complete the pre-entry checklist and brief the team with the toolbox talk."}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link href={`/${language}/risk-assessment/confined-space`} className="rounded-xl bg-emerald-500 px-5 py-4 font-black text-slate-950 transition hover:bg-emerald-400">{isTurkish ? "Risk değerlendirmesini aç" : "Open risk assessment"} →</Link>
              <Link href={`/${language}/checklists/confined-space`} className="rounded-xl border border-white/15 bg-white/[0.05] px-5 py-4 font-black text-white transition hover:bg-white/10">{isTurkish ? "Giriş checklisti" : "Entry checklist"} →</Link>
              <Link href={`/${language}/toolbox/confined-space`} className="rounded-xl border border-white/15 bg-white/[0.05] px-5 py-4 font-black text-white transition hover:bg-white/10">{isTurkish ? "Toolbox Talk" : "Toolbox Talk"} →</Link>
            </div>
          </article>
        ) : null}

        <RelatedGuideResources locale={language} guide={guide} />

        <article className="rounded-3xl border border-blue-400/20 bg-blue-600/10 p-8">
          <h2 className="text-3xl font-black">{isTurkish ? "Daha Fazla Rehberlik mi Gerekiyor?" : "Need More Guidance?"}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">{guide.aiText[language]}</p>
          <Link
            href={`/${language}/ai-assistant?topic=${encodeURIComponent(guide.title.en)}`}
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
          >
            {isTurkish ? "SERNEM AI'a Sor" : "Ask SERNEM AI"} →
          </Link>
        </article>
      </section>
    </main>
  );
}
