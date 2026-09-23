export type GrowthLocale = "tr" | "en";

export type GrowthTopic = {
  key: string;
  labels: Record<GrowthLocale, string>;
  keywords: string[];
  posterSlug?: string;
  checklistSlug?: string;
  toolboxSlug?: string;
  guideSlug?: string;
  riskSlug?: string;
};

export const growthTopics: GrowthTopic[] = [
  {
    key: "working-at-height",
    labels: { tr: "Yüksekte Çalışma", en: "Working at Height" },
    keywords: ["working-at-height", "work-at-height", "height", "fall-protection"],
    posterSlug: "working-at-height-rules",
    checklistSlug: "work-at-height",
    guideSlug: "working-at-height",
  },
  {
    key: "hot-work",
    labels: { tr: "Sıcak Çalışma", en: "Hot Work" },
    keywords: ["hot-work", "welding", "cutting", "grinding"],
    posterSlug: "hot-work-safety-rules",
    checklistSlug: "hot-work",
    guideSlug: "hot-work",
  },
  {
    key: "confined-space",
    labels: { tr: "Kapalı Alan", en: "Confined Space" },
    keywords: ["confined-space", "confined", "permit-space"],
    posterSlug: "confined-space-entry-rules",
    checklistSlug: "confined-space",
    guideSlug: "confined-space",
  },
  {
    key: "loto",
    labels: { tr: "LOTO", en: "LOTO" },
    keywords: ["loto", "lockout", "tagout", "hazardous-energy"],
    posterSlug: "loto-golden-rules",
    checklistSlug: "loto",
    guideSlug: "loto",
  },
  {
    key: "scaffolding",
    labels: { tr: "İskele", en: "Scaffolding" },
    keywords: ["scaffold", "scaffolding"],
    posterSlug: "scaffold-safety-rules",
    checklistSlug: "scaffold",
    guideSlug: "scaffolding",
  },
  {
    key: "electrical",
    labels: { tr: "Elektrik Güvenliği", en: "Electrical Safety" },
    keywords: ["electrical", "electric", "arc-flash"],
    posterSlug: "electrical-safety-rules",
    guideSlug: "electrical",
  },
  {
    key: "excavation",
    labels: { tr: "Kazı", en: "Excavation" },
    keywords: ["excavation", "trench", "trenching"],
    posterSlug: "excavation-safety-rules",
    guideSlug: "excavation",
  },
  {
    key: "ppe",
    labels: { tr: "KKD", en: "PPE" },
    keywords: ["ppe", "personal-protective-equipment"],
    posterSlug: "mandatory-ppe",
    guideSlug: "ppe",
  },
];

export function resolveGrowthTopic(value: string) {
  const normalized = value.toLowerCase();
  return growthTopics.find((topic) =>
    topic.keywords.some((keyword) => normalized.includes(keyword)),
  );
}
