import Link from "next/link";
import { allGuides } from "@/app/[locale]/knowledge-base/data/guides/all-guides";
import { posters } from "@/app/[locale]/posters/poster-data";
import type { ChecklistDocument } from "@/data/checklists/hot-work";
import { findSafetyPackForText } from "@/lib/safety-pack/data";
import { toolboxData } from "@/lib/toolbox/toolbox-data";

type Locale = "tr" | "en";

type Candidate = {
  href: string;
  title: string;
  label: string;
  text: string;
};

const stopWords = new Set([
  "and",
  "the",
  "for",
  "with",
  "safety",
  "inspection",
  "checklist",
  "guide",
  "toolbox",
  "talk",
  "rules",
  "work",
  "control",
  "controls",
]);

function tokens(value: string) {
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .split(/\s+/)
        .filter((token) => token.length > 2 && !stopWords.has(token)),
    ),
  );
}

function score(seed: string, candidate: string) {
  const seedTokens = tokens(seed);
  const candidateTokens = new Set(tokens(candidate));
  return seedTokens.reduce(
    (total, token) => total + (candidateTokens.has(token) ? 1 : 0),
    0,
  );
}

function bestMatch<T>(items: T[], seed: string, text: (item: T) => string) {
  return items
    .map((item) => ({ item, score: score(seed, text(item)) }))
    .sort((a, b) => b.score - a.score)[0];
}

export default function RelatedInspectionResources({
  locale,
  checklist,
}: {
  locale: Locale;
  checklist: ChecklistDocument;
}) {
  const isTurkish = locale === "tr";
  const seed = [
    checklist.slug,
    checklist.title?.en,
    checklist.category?.en,
    checklist.description?.en,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  if (!seed.trim()) return null;

  const safetyPack = findSafetyPackForText(seed);
  const cards: Candidate[] = [];

  const guide = bestMatch(
    allGuides,
    seed,
    (item) => `${item.slug} ${item.title.en} ${item.category.en}`,
  );
  if (guide?.score > 0) {
    cards.push({
      href: `/${locale}/knowledge-base/${guide.item.slug}`,
      title: guide.item.title[locale],
      label: isTurkish ? "İlgili Rehber" : "Related Guide",
      text: isTurkish
        ? "Kontrol maddelerinin arkasındaki tehlike ve kontrol yaklaşımını inceleyin."
        : "Review the hazards and control approach behind the inspection items.",
    });
  }

  const toolbox = bestMatch(
    toolboxData,
    seed,
    (item) => `${item.slug} ${item.en.title ?? ""}`,
  );
  if (toolbox?.score > 0) {
    cards.push({
      href: `/${locale}/toolbox/${toolbox.item.slug}`,
      title: toolbox.item[locale].title ?? toolbox.item.slug,
      label: "Toolbox Talk",
      text: isTurkish
        ? "Denetim öncesi ekiple kısa saha bilgilendirmesi yapın."
        : "Brief the team with a field-ready toolbox talk before the inspection.",
    });
  }

  const poster = bestMatch(
    posters.filter((item) => item.available),
    seed,
    (item) => `${item.slug} ${item.title.en} ${item.category}`,
  );
  if (poster?.score > 0) {
    cards.push({
      href: `/${locale}/posters/${poster.item.slug}`,
      title: poster.item.title[locale],
      label: isTurkish ? "İlgili Poster" : "Related Poster",
      text: isTurkish
        ? "Kritik kuralları çalışma alanında görünür hale getirin."
        : "Make the critical rules visible at the work area.",
    });
  }

  if (cards.length === 0 && !safetyPack) return null;

  return (
    <section className="sernem-related-resources bg-slate-950 px-6 pb-20 pt-4 text-white print:hidden">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
          SERNEM Workflow
        </p>
        <h2 className="mt-3 text-2xl font-black sm:text-3xl">
          {isTurkish
            ? "Bu denetimle bağlantılı HSE kaynakları"
            : "HSE resources connected to this inspection"}
        </h2>

        {safetyPack ? (
          <Link
            href={`/${locale}/safety-pack/${safetyPack.slug}`}
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.08] p-5 transition hover:border-emerald-300/45 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="text-xs font-black uppercase tracking-[0.13em] text-emerald-300">
                Safety Pack
              </span>
              <h3 className="mt-2 text-xl font-black text-white">
                {safetyPack.icon} {safetyPack.title[locale]}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "Bu denetimi rehber, toolbox, poster, risk analizi, Method Statement ve levhalarla tamamlayın."
                  : "Complete this inspection with the matching guide, toolbox, poster, risk assessment, Method Statement and signs."}
              </p>
            </div>
            <span className="shrink-0 font-black text-emerald-300">
              {isTurkish ? "Tam paketi aç" : "Open full pack"} →
            </span>
          </Link>
        ) : null}

        {cards.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-blue-400/35 hover:bg-slate-900"
              >
                <span className="text-xs font-black uppercase tracking-[0.12em] text-blue-300">
                  {card.label}
                </span>
                <h3 className="mt-3 text-lg font-black text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
                <span className="mt-5 inline-flex font-black text-blue-300 transition group-hover:translate-x-1">
                  {isTurkish ? "Aç" : "Open"} →
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
