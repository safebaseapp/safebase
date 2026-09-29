export type RecommendationType =
  | "knowledge"
  | "checklist"
  | "toolbox"
  | "risk-assessment"
  | "method-statement"
  | "poster"
  | "safety-sign"
  | "safety-pack";

export type Recommendation = {
  id: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  href: string;
  type: RecommendationType;
  icon: string;
  contextReason?: { tr: string; en: string };
};

type RecommendationGroup = {
  id: string;
  label: { tr: string; en: string };
  keywords: string[];
  recommendations: Recommendation[];
};

const workflowAssets = (
  topic: string,
  trTitle: string,
  enTitle: string,
): Recommendation[] => [
  {
    id: `${topic}-risk-assessment`,
    title: { tr: `${trTitle} Risk Analizi`, en: `${enTitle} Risk Assessment` },
    description: {
      tr: "Bu iş için HIRARC risk analizi oluşturun veya mevcut kontrolleri düzenleyin.",
      en: "Build a HIRARC risk assessment for this activity and refine the controls.",
    },
    href: "/tools/quick-risk-assessment",
    type: "risk-assessment",
    icon: "◇",
  },
  {
    id: `${topic}-method-statement`,
    title: { tr: `${trTitle} Method Statement`, en: `${enTitle} Method Statement` },
    description: {
      tr: "İş sırası, ekipman, sorumluluklar ve kontrol önlemleri için profesyonel çalışma yöntemi hazırlayın.",
      en: "Prepare a professional work method covering sequence, equipment, responsibilities and controls.",
    },
    href: "/tools/method-statement",
    type: "method-statement",
    icon: "▤",
  },
  {
    id: `${topic}-poster`,
    title: { tr: `${trTitle} Posterleri`, en: `${enTitle} Posters` },
    description: {
      tr: "Saha farkındalığı için ilgili profesyonel posterleri açın.",
      en: "Open related professional posters for field awareness.",
    },
    href: "/posters",
    type: "poster",
    icon: "▧",
  },
  {
    id: `${topic}-sign`,
    title: { tr: `${trTitle} Güvenlik Levhaları`, en: `${enTitle} Safety Signs` },
    description: {
      tr: "Çalışma alanı için uygun zorunluluk, uyarı ve yasak levhalarını bulun.",
      en: "Find suitable mandatory, warning and prohibition signs for the work area.",
    },
    href: "/safety-signs",
    type: "safety-sign",
    icon: "!",
  },
];

const groups: RecommendationGroup[] = [
  {
    id: "hot-work",
    label: { tr: "sıcak iş", en: "hot work" },
    keywords: ["hot work", "hotwork", "sıcak iş", "kaynak", "welding", "cutting", "grinding", "taşlama", "fire watch"],
    recommendations: [
      { id: "hot-work-guide", title: { tr: "Sıcak İş Rehberi", en: "Hot Work Guide" }, description: { tr: "İzin, yangın önleme, gaz ölçümü ve kritik saha kontrollerini inceleyin.", en: "Review permits, fire prevention, gas testing and critical field controls." }, href: "/knowledge-base/hot-work", type: "knowledge", icon: "📚" },
      { id: "hot-work-checklist", title: { tr: "Sıcak İş Denetimi", en: "Hot Work Inspection" }, description: { tr: "İşe başlamadan önce saha koşullarını yapılandırılmış checklist ile doğrulayın.", en: "Verify site conditions with a structured checklist before work starts." }, href: "/checklists/hot-work", type: "checklist", icon: "✓" },
      { id: "hot-work-toolbox", title: { tr: "Sıcak İş Toolbox", en: "Hot Work Toolbox Talk" }, description: { tr: "Ekip için saha öncesi sıcak iş bilgilendirmesini açın.", en: "Open a field-ready hot work briefing for the crew." }, href: "/toolbox/hot-work", type: "toolbox", icon: "🧰" },
      ...workflowAssets("hot-work", "Sıcak İş", "Hot Work"),
    ],
  },
  {
    id: "confined-space",
    label: { tr: "kapalı alan", en: "confined space" },
    keywords: ["confined space", "kapalı alan", "tank entry", "vessel entry", "manhole", "gas test", "attendant"],
    recommendations: [
      { id: "confined-space-guide", title: { tr: "Kapalı Alan Rehberi", en: "Confined Space Guide" }, description: { tr: "Giriş izni, atmosfer, izolasyon, gözcü ve kurtarma gerekliliklerini inceleyin.", en: "Review entry permits, atmosphere, isolation, attendant and rescue requirements." }, href: "/knowledge-base/confined-space", type: "knowledge", icon: "📚" },
      { id: "confined-space-checklist", title: { tr: "Kapalı Alan Denetimi", en: "Confined Space Inspection" }, description: { tr: "Gaz testi, havalandırma, erişim ve kurtarma kontrollerini tamamlayın.", en: "Complete gas testing, ventilation, access and rescue checks." }, href: "/checklists/confined-space", type: "checklist", icon: "✓" },
      { id: "confined-space-toolbox", title: { tr: "Kapalı Alan Toolbox", en: "Confined Space Toolbox Talk" }, description: { tr: "Giriş öncesi ekip bilgilendirmesini açın.", en: "Open the pre-entry crew briefing." }, href: "/toolbox/confined-space", type: "toolbox", icon: "🧰" },
      ...workflowAssets("confined-space", "Kapalı Alan", "Confined Space"),
    ],
  },
  {
    id: "loto",
    label: { tr: "enerji izolasyonu", en: "energy isolation" },
    keywords: ["loto", "lockout", "tagout", "energy isolation", "enerji izolasyonu", "kilitleme", "zero energy"],
    recommendations: [
      { id: "loto-guide", title: { tr: "LOTO Rehberi", en: "LOTO Guide" }, description: { tr: "Enerji kaynakları, kilitleme ve sıfır enerji doğrulamasını inceleyin.", en: "Review energy sources, lockout and zero-energy verification." }, href: "/knowledge-base/loto", type: "knowledge", icon: "📚" },
      { id: "loto-checklist", title: { tr: "LOTO Denetimi", en: "LOTO Inspection" }, description: { tr: "İzolasyon noktaları ve doğrulama adımlarını kontrol edin.", en: "Check isolation points and verification steps." }, href: "/checklists/loto", type: "checklist", icon: "✓" },
      { id: "loto-toolbox", title: { tr: "LOTO Toolbox", en: "LOTO Toolbox Talk" }, description: { tr: "Enerji izolasyonu için ekip bilgilendirmesini açın.", en: "Open a team briefing for energy isolation." }, href: "/toolbox/loto", type: "toolbox", icon: "🧰" },
      ...workflowAssets("loto", "LOTO", "LOTO"),
    ],
  },
  {
    id: "working-at-height",
    label: { tr: "yüksekte çalışma", en: "working at height" },
    keywords: ["working at height", "work at height", "yüksekte çalışma", "yükseklik", "metre yükseklik", "fall protection", "düşme", "emniyet kemeri", "harness", "lanyard", "anchor"],
    recommendations: [
      { id: "working-at-height-guide", title: { tr: "Yüksekte Çalışma Rehberi", en: "Working at Height Guide" }, description: { tr: "Düşme önleme, ankraj, erişim ve kurtarma kontrollerini inceleyin.", en: "Review fall prevention, anchorage, access and rescue controls." }, href: "/knowledge-base/working-at-height", type: "knowledge", icon: "📚" },
      { id: "working-at-height-checklist", title: { tr: "Yüksekte Çalışma Denetimi", en: "Working at Height Inspection" }, description: { tr: "Erişim ekipmanı, korkuluk, ankraj ve alan kontrolünü doğrulayın.", en: "Verify access equipment, guardrails, anchorage and area control." }, href: "/checklists/working-at-height", type: "checklist", icon: "✓" },
      { id: "working-at-height-toolbox", title: { tr: "Yüksekte Çalışma Toolbox", en: "Working at Height Toolbox Talk" }, description: { tr: "Düşme riskleri ve kritik kontroller için saha konuşmasını açın.", en: "Open a field briefing on fall hazards and critical controls." }, href: "/toolbox/working-at-height", type: "toolbox", icon: "🧰" },
      ...workflowAssets("working-at-height", "Yüksekte Çalışma", "Working at Height"),
    ],
  },
  {
    id: "scaffolding",
    label: { tr: "iskele", en: "scaffolding" },
    keywords: ["scaffold", "scaffolding", "iskele", "iskele sök", "iskele kur", "trapdoor", "platform", "scaffold tag", "sarı kart", "kırmızı kart", "yeşil kart"],
    recommendations: [
      { id: "scaffolding-guide", title: { tr: "İskele Güvenliği Rehberi", en: "Scaffolding Safety Guide" }, description: { tr: "Etiketleme, erişim, platform ve kenar koruma şartlarını inceleyin.", en: "Review tagging, access, platforms and edge-protection requirements." }, href: "/knowledge-base/scaffolding", type: "knowledge", icon: "📚" },
      { id: "scaffolding-checklist", title: { tr: "İskele Denetimi", en: "Scaffold Inspection" }, description: { tr: "İskeleyi kullanım öncesinde yapılandırılmış checklist ile kontrol edin.", en: "Inspect the scaffold with a structured pre-use checklist." }, href: "/checklists/scaffolding", type: "checklist", icon: "✓" },
      { id: "scaffolding-toolbox", title: { tr: "İskele Toolbox", en: "Scaffolding Toolbox Talk" }, description: { tr: "Güvenli iskele kullanımı için ekip konuşmasını açın.", en: "Open the crew briefing for safe scaffold use." }, href: "/toolbox/scaffolding", type: "toolbox", icon: "🧰" },
      ...workflowAssets("scaffolding", "İskele", "Scaffolding"),
    ],
  },
  {
    id: "ppe",
    label: { tr: "KKD", en: "PPE" },
    keywords: ["ppe", "kkd", "personal protective", "grinding", "taşlama", "face shield", "gözlük", "helmet", "hard hat", "baret", "emniyet kemeri"],
    recommendations: [
      { id: "ppe-guide", title: { tr: "KKD Rehberi", en: "PPE Guide" }, description: { tr: "Göreve uygun KKD seçimi ve kullanım prensiplerini inceleyin.", en: "Review task-specific PPE selection and use principles." }, href: "/knowledge-base/ppe", type: "knowledge", icon: "📚" },
      { id: "ppe-standards", title: { tr: "KKD Standartları", en: "PPE Standards" }, description: { tr: "EN / EN ISO standartlarını ürün ve kullanım alanına göre inceleyin.", en: "Browse EN / EN ISO standards by PPE product and use case." }, href: "/ppe-standards", type: "knowledge", icon: "⛑️" },
      { id: "ppe-signs", title: { tr: "Zorunlu KKD Levhaları", en: "Mandatory PPE Signs" }, description: { tr: "Saha girişleri ve çalışma alanları için zorunlu KKD levhalarını açın.", en: "Open mandatory PPE signs for site entrances and work areas." }, href: "/safety-signs", type: "safety-sign", icon: "!" },
      ...workflowAssets("ppe", "KKD", "PPE"),
    ],
  },
  {
    id: "excavation",
    label: { tr: "kazı", en: "excavation" },
    keywords: ["excavation", "trench", "kazı", "hendek", "shoring", "slope", "yeraltı hattı", "underground service"],
    recommendations: [
      { id: "excavation-guide", title: { tr: "Kazı Güvenliği Rehberi", en: "Excavation Safety Guide" }, description: { tr: "Göçük, erişim, yeraltı hatları ve çevre kontrolünü inceleyin.", en: "Review collapse, access, underground services and area controls." }, href: "/knowledge-base/excavation", type: "knowledge", icon: "📚" },
      { id: "excavation-checklist", title: { tr: "Kazı Denetimi", en: "Excavation Inspection" }, description: { tr: "Kazı öncesi ve günlük saha kontrollerini tamamlayın.", en: "Complete pre-start and daily excavation checks." }, href: "/checklists/excavation", type: "checklist", icon: "✓" },
      ...workflowAssets("excavation", "Kazı", "Excavation"),
    ],
  },
  {
    id: "electrical",
    label: { tr: "elektrik", en: "electrical" },
    keywords: ["electrical", "electric", "elektrik", "enerji hattı", "power line", "overhead line", "havai hat", "shock", "arc flash", "elektroküt", "voltaj"],
    recommendations: [
      { id: "electrical-guide", title: { tr: "Elektrik Güvenliği Rehberi", en: "Electrical Safety Guide" }, description: { tr: "Elektrik tehlikeleri, izolasyon ve güvenli çalışma kontrollerini inceleyin.", en: "Review electrical hazards, isolation and safe-work controls." }, href: "/knowledge-base/electrical", type: "knowledge", icon: "📚" },
      ...workflowAssets("electrical", "Elektrik Güvenliği", "Electrical Safety"),
    ],
  },
];

const typePriority: Record<RecommendationType, number> = {
  checklist: 7,
  knowledge: 6,
  "risk-assessment": 5,
  toolbox: 4,
  "method-statement": 3,
  "safety-sign": 2,
  poster: 1,
  "safety-pack": 0,
};

function scoreGroup(input: string, group: RecommendationGroup) {
  return group.keywords.reduce((score, keyword) => {
    if (!input.includes(keyword)) return score;
    return score + (keyword.includes(" ") ? 3 : 1);
  }, 0);
}

function rankedRecommendations(group: RecommendationGroup) {
  return [...group.recommendations].sort(
    (a, b) => typePriority[b.type] - typePriority[a.type],
  );
}

export function getRecommendations(input: string, limit = 7): Recommendation[] {
  const normalizedInput = input.trim().toLowerCase();
  if (!normalizedInput) return [];

  const matches = groups
    .map((group) => ({ group, score: scoreGroup(normalizedInput, group) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!matches.length) return [];

  const seen = new Set<string>();
  const results: Recommendation[] = [];
  const ranked = matches.map((entry) => ({
    ...entry,
    items: rankedRecommendations(entry.group),
  }));

  const perGroupCap = matches.length > 1 ? 3 : limit;
  let round = 0;

  while (results.length < limit) {
    let added = false;

    for (const match of ranked) {
      if (round >= perGroupCap) continue;
      const recommendation = match.items[round];
      if (!recommendation || seen.has(recommendation.id)) continue;

      seen.add(recommendation.id);
      results.push({
        ...recommendation,
        contextReason: {
          tr: `Bu senaryodaki ${match.group.label.tr} riskiyle eşleşiyor.`,
          en: `Matched to the ${match.group.label.en} risk in this scenario.`,
        },
      });
      added = true;
      if (results.length >= limit) return results;
    }

    if (!added) break;
    round += 1;
  }

  if (results.length < limit) {
    for (const match of ranked) {
      for (const recommendation of match.items) {
        if (seen.has(recommendation.id)) continue;
        seen.add(recommendation.id);
        results.push({
          ...recommendation,
          contextReason: {
            tr: `Bu senaryodaki ${match.group.label.tr} riskiyle eşleşiyor.`,
            en: `Matched to the ${match.group.label.en} risk in this scenario.`,
          },
        });
        if (results.length >= limit) return results;
      }
    }
  }

  return results;
}
