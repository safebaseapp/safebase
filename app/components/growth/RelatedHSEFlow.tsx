import Link from "next/link";
import type { GrowthLocale } from "@/lib/growth/relatedTopics";
import { resolveGrowthTopic } from "@/lib/growth/relatedTopics";

type Props = {
  locale: GrowthLocale;
  topicHint: string;
  className?: string;
};

export default function RelatedHSEFlow({ locale, topicHint, className = "" }: Props) {
  const topic = resolveGrowthTopic(topicHint);
  if (!topic) return null;

  const isTurkish = locale === "tr";
  const links = [
    topic.posterSlug && {
      href: `/${locale}/posters/${topic.posterSlug}`,
      eyebrow: isTurkish ? "Görsel kaynak" : "Visual resource",
      title: isTurkish ? "Güvenlik Posterini Aç" : "Open Safety Poster",
    },
    topic.checklistSlug && {
      href: `/${locale}/checklists/${topic.checklistSlug}`,
      eyebrow: isTurkish ? "Saha doğrulama" : "Field verification",
      title: isTurkish ? "Denetimi Başlat" : "Start Inspection",
    },
    topic.guideSlug && {
      href: `/${locale}/knowledge-base/${topic.guideSlug}`,
      eyebrow: isTurkish ? "Rehber" : "Guide",
      title: isTurkish ? "Uygulama Rehberini Oku" : "Read Practice Guide",
    },
  ].filter(Boolean) as { href: string; eyebrow: string; title: string }[];

  if (links.length < 2) return null;

  return (
    <section className={`rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-white sm:p-8 ${className}`}>
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
          {isTurkish ? "SERNEM İş Akışı" : "SERNEM Workflow"}
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-3xl">
          {topic.labels[locale]} — {isTurkish ? "tek sayfada kalma, işi tamamla" : "don’t stop at one page, finish the job"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          {isTurkish
            ? "Aynı faaliyet için ilgili poster, saha denetimi ve uygulama rehberine devam edin."
            : "Continue with the matching poster, field inspection and practical guide for the same activity."}
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-slate-900/80"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 group-hover:text-emerald-400">
              {link.eyebrow}
            </p>
            <p className="mt-2 font-black text-slate-100">{link.title} →</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-800 pt-5">
        <Link
          href={`/${locale}/safety-pack?topic=${topic.key}`}
          className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400"
        >
          {isTurkish ? "Safety Pack Akışını Aç" : "Open Safety Pack Flow"}
        </Link>
        <span className="text-xs font-semibold text-slate-500">
          {isTurkish ? "Poster + Denetim + Rehber tek akışta" : "Poster + Inspection + Guide in one flow"}
        </span>
      </div>
    </section>
  );
}
