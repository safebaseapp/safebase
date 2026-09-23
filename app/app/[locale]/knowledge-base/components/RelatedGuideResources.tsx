import Link from "next/link";
import { posters } from "@/app/[locale]/posters/poster-data";
import { inspectionCatalog } from "@/data/checklists/registry";
import { toolboxData } from "@/lib/toolbox/toolbox-data";
import type { SafetyGuide } from "./GuideTemplate";

type Locale = "tr" | "en";

type ResourceCard = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

const stopWords = new Set([
  "and",
  "the",
  "for",
  "with",
  "safety",
  "guide",
  "inspection",
  "checklist",
  "toolbox",
  "talk",
  "rules",
  "work",
  "control",
  "controls",
  "hazard",
  "hazards",
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

export default function RelatedGuideResources({
  locale,
  guide,
}: {
  locale: Locale;
  guide: SafetyGuide;
}) {
  const isTurkish = locale === "tr";
  const seed = `${guide.slug} ${guide.title.en} ${guide.category.en}`;
  const cards: ResourceCard[] = [];

  const inspection = bestMatch(
    inspectionCatalog,
    seed,
    (entry) => `${entry.slug} ${entry.title.en} ${entry.category.en}`,
  );
  if (inspection?.score > 0) {
    cards.push({
      href: `/${locale}/checklists/${inspection.item.slug}`,
      eyebrow: isTurkish ? "Saha Denetimi" : "Field Inspection",
      title: inspection.item.title[locale],
      description: isTurkish
        ? "Rehberdeki kontrolleri sahada doğrulanabilir bir denetime dönüştürün."
        : "Turn the guide controls into a field-verifiable inspection.",
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
      eyebrow: "Toolbox Talk",
      title: toolbox.item[locale].title ?? toolbox.item.slug,
      description: isTurkish
        ? "Konuyu ekip toplantısında kullanıma hazır toolbox içeriğiyle aktarın."
        : "Brief the team with a field-ready toolbox talk on the same topic.",
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
      eyebrow: isTurkish ? "Saha Posteri" : "Field Poster",
      title: poster.item.title[locale],
      description: isTurkish
        ? "Kritik kuralları çalışma alanında görünür bir posterle destekleyin."
        : "Reinforce the critical rules with a visible field poster.",
    });
  }

  if (cards.length === 0) return null;

  return (
    <article className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.05] p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
        SERNEM Workflow
      </p>
      <h2 className="mt-3 text-3xl font-black">
        {isTurkish ? "Bu rehberi sahada kullan" : "Use this guide in the field"}
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-400">
        {isTurkish
          ? "Aynı konuya ait denetim, toolbox ve posterleri tek akışta kullanın."
          : "Continue with the matching inspection, toolbox talk and poster for the same topic."}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-white/10 bg-slate-950/45 p-5 transition hover:-translate-y-1 hover:border-cyan-300/35"
          >
            <span className="text-xs font-black uppercase tracking-[0.12em] text-cyan-300">
              {card.eyebrow}
            </span>
            <h3 className="mt-3 text-lg font-black text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{card.description}</p>
            <span className="mt-5 inline-flex font-black text-cyan-300 transition group-hover:translate-x-1">
              {isTurkish ? "Aç" : "Open"} →
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
