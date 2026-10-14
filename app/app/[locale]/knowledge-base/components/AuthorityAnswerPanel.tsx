import Link from "next/link";
import type { SafetyGuide } from "./GuideTemplate";

const flagship = new Set(["confined-space", "hot-work", "working-at-height", "loto", "scaffolding"]);

export default function AuthorityAnswerPanel({ guide, locale }: { guide: SafetyGuide; locale: "tr" | "en" }) {
  if (!flagship.has(guide.slug)) return null;
  const tr = locale === "tr";
  const hazards = guide.hazards[locale];
  const controls = guide.controls[locale];
  const checklist = guide.checklist?.[locale] ?? [];
  const summary = guide.overview[locale];
  return (
    <section aria-label={tr ? "Hızlı teknik cevaplar" : "Quick technical answers"} className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.05] p-6 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
        {tr ? "SERNEM • Hızlı Teknik Referans" : "SERNEM • Quick Technical Reference"}
      </p>
      <h2 className="mt-3 text-3xl font-black text-white">
        {tr ? `${guide.title.tr}: temel bilgiler` : `${guide.title.en}: essential answers`}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
        {tr
          ? "Aşağıdaki yanıtlar bu rehberin kapsamını özetler; tek başına çalışma izni, mevzuat uygunluk kararı veya sahaya özgü risk değerlendirmesi değildir."
          : "These answers summarize this guide; they do not replace a work permit, legal compliance decision or site-specific risk assessment."}
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 md:col-span-2">
          <h3 className="text-lg font-bold text-white">{tr ? "Bu çalışma neyi kapsar?" : "What does this activity involve?"}</h3>
          <p className="mt-3 leading-7 text-slate-300">{summary}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <h3 className="text-lg font-bold text-white">{tr ? "Başlıca tehlikeler nelerdir?" : "What are the main hazards?"}</h3>
          <ul className="mt-3 space-y-2 text-slate-300">
            {hazards.slice(0, 4).map(item => <li key={item}>• {item}</li>)}
          </ul>
          <p className="mt-3 text-xs text-slate-400">{tr ? "Tam liste aşağıdaki Tehlikeler bölümündedir." : "See the full hazard list below."}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <h3 className="text-lg font-bold text-white">{tr ? "Temel kontrol önlemleri nelerdir?" : "What are the essential controls?"}</h3>
          <ul className="mt-3 space-y-2 text-slate-300">
            {controls.slice(0, 4).map(item => <li key={item}>• {item}</li>)}
          </ul>
          <p className="mt-3 text-xs text-slate-400">{tr ? "Eksiksiz kontroller aşağıda açıklanır." : "The full control measures are listed below."}</p>
        </article>
        {checklist.length > 0 ? (
          <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 md:col-span-2">
            <h3 className="text-lg font-bold text-white">{tr ? "İşe başlamadan önce ne kontrol edilmeli?" : "What should be checked before work?"}</h3>
            <ul className="mt-3 grid gap-2 text-slate-300 sm:grid-cols-2">
              {checklist.slice(0, 6).map(item => <li key={item}>✓ {item}</li>)}
            </ul>
            <p className="mt-3 text-xs text-slate-400">{tr ? "Tam kontrol listesi bu sayfanın devamındadır." : "The complete checklist appears further down this page."}</p>
          </article>
        ) : null}
      </div>
      <Link href={`/${locale}/toolbox/${guide.slug === "scaffolding" ? "scaffold-safety" : guide.slug}`} className="mt-6 inline-flex rounded-xl border border-emerald-400/30 px-5 py-3 font-bold text-emerald-300 transition hover:bg-emerald-400/10">
        {tr ? "İlgili Toolbox Talk →" : "Related Toolbox Talk →"}
      </Link>
    </section>
  );
}
