import type { SafetyGuide } from "../../components/GuideTemplate";
import { allGuides } from "./all-guides";

export type GuideSearchResult = {
  guide: SafetyGuide;
  score: number;
  matchedTerms: string[];
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "can",
  "do",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "should",
  "the",
  "to",
  "what",
  "when",
  "where",
  "which",
  "with",
  "you",

  "bir",
  "bu",
  "da",
  "de",
  "için",
  "ile",
  "mi",
  "mı",
  "mu",
  "mü",
  "nasıl",
  "ne",
  "nedir",
  "olan",
  "olarak",
  "ve",
  "veya",
  "hangi",
  "ilk",
  "karşı",
  "gerekir",
  "gereklidir",
  "yapılmalıdır",
  "uygulanmalıdır",
]);

function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9çğıöşü\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return Array.from(
    new Set(
      normalizeText(value)
        .split(/[\s-]+/)
        .map((term) => term.trim())
        .filter((term) => term.length >= 3 && !STOP_WORDS.has(term)),
    ),
  );
}

function localizedValues(value?: { en: string; tr: string }): string[] {
  if (!value) {
    return [];
  }

  return [value.en, value.tr];
}

function createSearchSections(guide: SafetyGuide) {
  return {
    priority: [
      guide.slug.replace(/-/g, " "),
      ...localizedValues(guide.title),
      ...localizedValues(guide.category),
    ],

    summary: [
      ...localizedValues(guide.description),
      ...localizedValues(guide.overview),
      guide.standard ?? "",
      guide.riskLevel?.en ?? "",
      guide.riskLevel?.tr ?? "",
    ],

    content: [
      ...guide.hazards.en,
      ...guide.hazards.tr,
      ...(guide.requiredPPE?.en ?? []),
      ...(guide.requiredPPE?.tr ?? []),
      ...guide.controls.en,
      ...guide.controls.tr,
      ...(guide.commonMistakes?.en ?? []),
      ...(guide.commonMistakes?.tr ?? []),
      ...(guide.checklist?.en ?? []),
      ...(guide.checklist?.tr ?? []),
      guide.checklist?.title.en ?? "",
      guide.checklist?.title.tr ?? "",
      guide.emergencySection?.title.en ?? "",
      guide.emergencySection?.title.tr ?? "",
      guide.emergencySection?.content.en ?? "",
      guide.emergencySection?.content.tr ?? "",
      ...(guide.references ?? []),
      guide.aiText.en,
      guide.aiText.tr,
    ],
  };
}

function calculateGuideScore(
  guide: SafetyGuide,
  normalizedQuery: string,
  queryTerms: string[],
): GuideSearchResult {
  const sections = createSearchSections(guide);

  const priorityText = normalizeText(sections.priority.join(" "));
  const summaryText = normalizeText(sections.summary.join(" "));
  const contentText = normalizeText(sections.content.join(" "));

  let score = 0;
  const matchedTerms = new Set<string>();

  if (
    normalizedQuery.length >= 3 &&
    priorityText.includes(normalizedQuery)
  ) {
    score += 60;
  }

  if (
    normalizedQuery.length >= 3 &&
    summaryText.includes(normalizedQuery)
  ) {
    score += 25;
  }

  for (const term of queryTerms) {
    if (priorityText.includes(term)) {
      score += 18;
      matchedTerms.add(term);
      continue;
    }

    if (summaryText.includes(term)) {
      score += 7;
      matchedTerms.add(term);
      continue;
    }

    if (contentText.includes(term)) {
      score += 2;
      matchedTerms.add(term);
    }
  }

  const slugWords = tokenize(guide.slug.replace(/-/g, " "));

  for (const slugWord of slugWords) {
    if (normalizedQuery.includes(slugWord)) {
      score += 15;
      matchedTerms.add(slugWord);
    }
  }

  return {
    guide,
    score,
    matchedTerms: Array.from(matchedTerms),
  };
}

export function searchGuides(
  query: string,
  limit = 3,
): GuideSearchResult[] {
  const normalizedQuery = normalizeText(query);
  const queryTerms = tokenize(query);

  if (!normalizedQuery || queryTerms.length === 0) {
    return [];
  }

  const rankedResults = allGuides
    .map((guide) =>
      calculateGuideScore(guide, normalizedQuery, queryTerms),
    )
    .filter((result) => result.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.guide.title.en.localeCompare(b.guide.title.en);
    });

  const bestScore = rankedResults[0]?.score ?? 0;

  if (bestScore === 0) {
    return [];
  }

  const minimumRelevantScore = Math.max(
    6,
    Math.floor(bestScore * 0.35),
  );

  return rankedResults
    .filter((result) => result.score >= minimumRelevantScore)
    .slice(0, Math.max(1, limit));
}
