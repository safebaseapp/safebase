import { allGuides } from "@/app/[locale]/knowledge-base/data/guides/all-guides";
import { posters } from "@/app/[locale]/posters/poster-data";
import { inspectionCatalog } from "@/data/checklists/registry";
import { allRiskActivities } from "@/lib/risk-library/all-activities";
import { safetySigns } from "@/lib/safety-signs/data";
import { toolboxData } from "@/lib/toolbox/toolbox-data";
import type { SafetyPackDefinition } from "./data";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function scoreText(seed: string[], candidate: string) {
  const normalized = normalize(candidate);
  return seed.reduce((score, keyword) => {
    const term = normalize(keyword);
    return score + (term && normalized.includes(term) ? term.split(" ").length : 0);
  }, 0);
}

function bestByKeywords<T>(items: T[], keywords: string[], text: (item: T) => string) {
  const ranked = items
    .map((item) => ({ item, score: scoreText(keywords, text(item)) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.score > 0 ? ranked[0].item : undefined;
}

export function resolveSafetyPackResources(pack: SafetyPackDefinition) {
  const guide = allGuides.find((item) => item.slug === pack.guideSlug);
  const checklist = inspectionCatalog.find((item) => item.slug === pack.checklistSlug);

  const toolbox =
    toolboxData.find((item) => item.slug === pack.toolboxSlug) ??
    bestByKeywords(
      toolboxData,
      pack.keywords,
      (item) => `${item.slug} ${item.en.title ?? ""} ${item.tr.title ?? ""}`,
    );

  const poster =
    posters.find((item) => item.slug === pack.posterSlug && item.available) ??
    bestByKeywords(
      posters.filter((item) => item.available),
      pack.keywords,
      (item) => `${item.slug} ${item.title.en} ${item.title.tr} ${item.category}`,
    );

  const riskAssessment =
    allRiskActivities.find((item) => pack.riskActivityCandidates.includes(item.id)) ??
    bestByKeywords(
      allRiskActivities,
      pack.keywords,
      (item) => `${item.id} ${item.activity.en} ${item.activity.tr} ${item.category.en} ${item.category.tr}`,
    );

  const signs = pack.safetySignSlugs
    .map((slug) => safetySigns.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return {
    guide,
    checklist,
    toolbox,
    poster,
    riskAssessment,
    signs,
  };
}
