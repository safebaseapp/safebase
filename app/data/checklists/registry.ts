import { confinedSpaceChecklist } from "./confined-space";
import { hotWorkChecklist } from "./hot-work";
import { liftingChecklist } from "./lifting";
import { lotoChecklist } from "./loto";
import { scaffoldingChecklist } from "./scaffolding";
import { workingAtHeightChecklist } from "./working-at-height";
import { additionalChecklists } from "./additional";
import type { ChecklistDocument } from "./hot-work";

export const allChecklists: ChecklistDocument[] = [
  workingAtHeightChecklist,
  hotWorkChecklist,
  lotoChecklist,
  scaffoldingChecklist,
  confinedSpaceChecklist,
  liftingChecklist,
  ...additionalChecklists,
];

type LocalizedSummary = { en: string; tr: string };

type LegacySummary = {
  slug: string;
  category: LocalizedSummary;
  description: LocalizedSummary;
};

const legacySummaries: Record<string, LegacySummary> = {
  "working-at-height": {
    slug: "work-at-height",
    category: { en: "High Risk Work", tr: "Yüksek Riskli İşler" },
    description: { en: "Inspect fall protection, access and rescue controls before work starts.", tr: "Çalışma başlamadan önce düşmeye karşı koruma, erişim ve kurtarma kontrollerini inceleyin." },
  },
  "hot-work": {
    slug: "hot-work",
    category: { en: "Permit to Work", tr: "Çalışma İzni" },
    description: { en: "Verify permits, fire prevention controls and gas testing before hot work.", tr: "Sıcak çalışma öncesinde izinleri, yangın önlemlerini ve gaz ölçümünü doğrulayın." },
  },
  loto: {
    slug: "loto",
    category: { en: "Energy Control", tr: "Enerji Kontrolü" },
    description: { en: "Confirm energy isolation, lock application and zero-energy verification.", tr: "Enerji izolasyonunu, kilit uygulamasını ve sıfır enerji doğrulamasını kontrol edin." },
  },
  scaffolding: {
    slug: "scaffold",
    category: { en: "Temporary Structures", tr: "Geçici Yapılar" },
    description: { en: "Check scaffold access, platforms, guardrails, tags and foundations.", tr: "İskele erişimini, platformları, korkulukları, etiketleri ve temelleri kontrol edin." },
  },
  "confined-space": {
    slug: "confined-space",
    category: { en: "High Risk Work", tr: "Yüksek Riskli İşler" },
    description: { en: "Review atmospheric testing, rescue readiness and entry controls.", tr: "Atmosfer ölçümünü, kurtarma hazırlığını ve giriş kontrollerini inceleyin." },
  },
  lifting: {
    slug: "lifting",
    category: { en: "Lifting", tr: "Kaldırma İşleri" },
    description: { en: "Inspect lifting plans, rigging, exclusion zones and crane setup.", tr: "Kaldırma planlarını, sapanları, bariyerli alanları ve vinç kurulumunu inceleyin." },
  },
};

export const inspectionCatalog = allChecklists.map((document) => {
  const fallback = legacySummaries[document.id];
  return {
    document,
    slug: document.slug ?? fallback?.slug ?? document.id,
    title: document.title,
    category: document.category ?? fallback?.category ?? { en: "Inspection", tr: "Denetim" },
    description: document.description ?? fallback?.description ?? { en: "Structured field inspection checklist.", tr: "Yapılandırılmış saha denetim kontrol listesi." },
  };
});

export const featuredChecklistSlugs = [
  "work-at-height",
  "hot-work",
  "loto",
  "scaffold",
  "confined-space",
  "lifting",
] as const;

export function getChecklistBySlug(slug: string) {
  return inspectionCatalog.find((entry) => entry.slug === slug)?.document;
}
