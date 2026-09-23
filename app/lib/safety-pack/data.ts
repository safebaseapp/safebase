export type SafetyPackLocale = "tr" | "en";

export type LocalizedText = {
  tr: string;
  en: string;
};

export type SafetyPackDefinition = {
  slug: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  keywords: string[];
  guideSlug: string;
  checklistSlug: string;
  toolboxSlug: string;
  posterSlug: string;
  riskActivityCandidates: string[];
  safetySignSlugs: string[];
};

export const safetyPacks: SafetyPackDefinition[] = [
  {
    slug: "working-at-height",
    icon: "🧗",
    title: { tr: "Yüksekte Çalışma", en: "Working at Height" },
    description: {
      tr: "Düşme, ankraj, erişim, düşen cisim ve kurtarma kontrollerini tek saha akışında yönetin.",
      en: "Manage fall prevention, anchorage, access, dropped objects and rescue controls in one field workflow.",
    },
    keywords: ["working at height", "work at height", "fall", "harness", "ladder"],
    guideSlug: "working-at-height",
    checklistSlug: "work-at-height",
    toolboxSlug: "working-at-height",
    posterSlug: "working-at-height-rules",
    riskActivityCandidates: ["working-at-height", "ladder-work"],
    safetySignSlugs: ["safety-harness-must-be-worn", "warning-falling-objects"],
  },
  {
    slug: "confined-space",
    icon: "🕳️",
    title: { tr: "Kapalı Alan", en: "Confined Space" },
    description: {
      tr: "Giriş izni, atmosfer testi, izolasyon, gözcü ve kurtarma hazırlığını birlikte yönetin.",
      en: "Bring entry permits, atmospheric testing, isolation, attendants and rescue readiness together.",
    },
    keywords: ["confined space", "gas testing", "oxygen deficiency", "attendant"],
    guideSlug: "confined-space",
    checklistSlug: "confined-space",
    toolboxSlug: "confined-space",
    posterSlug: "confined-space-entry-rules",
    riskActivityCandidates: ["confined-space", "confined-space-entry"],
    safetySignSlugs: ["no-unauthorized-entry", "respiratory-protection-must-be-worn"],
  },
  {
    slug: "hot-work",
    icon: "🔥",
    title: { tr: "Sıcak Çalışma", en: "Hot Work" },
    description: {
      tr: "Çalışma izni, yangın gözcüsü, gaz ölçümü ve kıvılcım kontrolü için tam saha paketi.",
      en: "A complete field pack for permits, fire watch, gas testing and spark control.",
    },
    keywords: ["hot work", "welding", "gas cutting", "fire watch", "spark"],
    guideSlug: "hot-work",
    checklistSlug: "hot-work",
    toolboxSlug: "hot-work",
    posterSlug: "hot-work-safety-rules",
    riskActivityCandidates: ["hot-work", "welding", "gas-cutting"],
    safetySignSlugs: ["no-open-flame", "fire-extinguisher"],
  },
  {
    slug: "loto",
    icon: "🔒",
    title: { tr: "LOTO / Enerji İzolasyonu", en: "LOTO / Energy Isolation" },
    description: {
      tr: "Enerji belirleme, izolasyon, kilitleme ve sıfır enerji doğrulamasını tek akışta yönetin.",
      en: "Manage energy identification, isolation, lockout and zero-energy verification in one workflow.",
    },
    keywords: ["loto", "lockout", "tagout", "energy isolation", "zero energy"],
    guideSlug: "loto",
    checklistSlug: "loto",
    toolboxSlug: "loto",
    posterSlug: "loto-golden-rules",
    riskActivityCandidates: ["lockout-tagout", "loto", "energy-isolation"],
    safetySignSlugs: ["do-not-touch", "no-unauthorized-entry"],
  },
  {
    slug: "excavation",
    icon: "🚧",
    title: { tr: "Kazı Çalışmaları", en: "Excavation Work" },
    description: {
      tr: "Göçük, yeraltı hatları, erişim, bariyerleme ve değişen zemin koşullarını birlikte kontrol edin.",
      en: "Control cave-ins, underground services, access, barricading and changing ground conditions together.",
    },
    keywords: ["excavation", "trench", "shoring", "underground services", "spoil"],
    guideSlug: "excavation",
    checklistSlug: "excavation",
    toolboxSlug: "excavation",
    posterSlug: "excavation-safety-rules",
    riskActivityCandidates: ["excavation", "trenching"],
    safetySignSlugs: ["safety-helmet-must-be-worn", "no-unauthorized-entry"],
  },
  {
    slug: "scaffolding",
    icon: "🏗️",
    title: { tr: "İskele", en: "Scaffolding" },
    description: {
      tr: "Kurulum, etiketleme, platform, erişim ve düşmeye karşı koruma gerekliliklerini bir araya getirin.",
      en: "Bring erection, tagging, platforms, access and fall-protection requirements into one pack.",
    },
    keywords: ["scaffold", "scaffolding", "scaffold inspection", "scaffold tag"],
    guideSlug: "scaffolding",
    checklistSlug: "scaffold",
    toolboxSlug: "scaffold-safety",
    posterSlug: "scaffold-safety-rules",
    riskActivityCandidates: ["scaffold-erection", "scaffold-dismantling"],
    safetySignSlugs: ["safety-harness-must-be-worn", "warning-falling-objects"],
  },
  {
    slug: "electrical",
    icon: "⚡",
    title: { tr: "Elektrik Güvenliği", en: "Electrical Safety" },
    description: {
      tr: "Elektrik tehlikeleri, izolasyon, yetkilendirme ve geçici enerji kontrollerini tek yerde yönetin.",
      en: "Manage electrical hazards, isolation, authorization and temporary-power controls in one place.",
    },
    keywords: ["electrical", "electric shock", "high voltage", "arc flash", "temporary power"],
    guideSlug: "electrical-safety",
    checklistSlug: "electrical-safety",
    toolboxSlug: "electrical-safety",
    posterSlug: "electrical-safety-rules",
    riskActivityCandidates: ["electrical-work", "electrical", "temporary-power"],
    safetySignSlugs: ["warning-high-voltage", "do-not-touch"],
  },
  {
    slug: "fire",
    icon: "🧯",
    title: { tr: "Yangın Güvenliği", en: "Fire Safety" },
    description: {
      tr: "Tutuşma kaynakları, yanıcı maddeler, söndürücüler, alarm ve tahliye hazırlığını birleştirin.",
      en: "Combine ignition control, flammables, extinguishers, alarms and evacuation readiness.",
    },
    keywords: ["fire safety", "fire extinguisher", "flammable", "evacuation", "fire watch"],
    guideSlug: "fire-safety",
    checklistSlug: "fire-safety",
    toolboxSlug: "fire-safety",
    posterSlug: "fire-safety-rules",
    riskActivityCandidates: ["fire-safety", "fire-prevention"],
    safetySignSlugs: ["fire-extinguisher", "emergency-exit"],
  },
  {
    slug: "chemical",
    icon: "🧪",
    title: { tr: "Kimyasal Güvenliği", en: "Chemical Safety" },
    description: {
      tr: "SDS, etiketleme, KKD, depolama, maruziyet ve dökülme müdahalesini tek pakette yönetin.",
      en: "Manage SDS, labelling, PPE, storage, exposure and spill response in one field pack.",
    },
    keywords: ["chemical", "sds", "ghs", "spill", "chemical handling"],
    guideSlug: "chemical-safety",
    checklistSlug: "chemical-safety",
    toolboxSlug: "chemical-safety",
    posterSlug: "chemical-safety-rules",
    riskActivityCandidates: ["chemical-handling", "chemical-safety", "chemical-use"],
    safetySignSlugs: ["protective-gloves-must-be-worn", "respiratory-protection-must-be-worn"],
  },
];

if (new Set(safetyPacks.map((pack) => pack.slug)).size !== safetyPacks.length) {
  throw new Error("SERNEM Safety Packs contain duplicate slugs.");
}

export function getSafetyPack(slug: string) {
  return safetyPacks.find((pack) => pack.slug === slug);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function findSafetyPackForText(value: string) {
  const normalized = normalize(value);
  return safetyPacks.find((pack) => {
    const exactFields = [pack.slug, pack.guideSlug, pack.checklistSlug, pack.toolboxSlug, pack.posterSlug]
      .map(normalize);
    return exactFields.some((field) => field === normalized) ||
      pack.keywords.some((keyword) => normalized.includes(normalize(keyword)));
  });
}
