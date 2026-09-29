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
};

type RecommendationGroup = {
  keywords: string[];
  recommendations: Recommendation[];
};

const commonWorkflow = (topic: string, trTitle: string, enTitle: string): Recommendation[] => [
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
    keywords: ["hot work", "hotwork", "sıcak iş", "kaynak", "welding", "cutting", "grinding", "taşlama", "fire watch"],
    recommendations: [
      {
        id: "hot-work-guide",
        title: { tr: "Sıcak İş Rehberi", en: "Hot Work Guide" },
        description: { tr: "İzin, yangın önleme, gaz ölçümü ve kritik saha kontrollerini inceleyin.", en: "Review permits, fire prevention, gas testing and critical field controls." },
        href: "/knowledge-base/hot-work",
        type: "knowledge",
        icon: "📚",
      },
      {
        id: "hot-work-checklist",
        title: { tr: "Sıcak İş Denetimi", en: "Hot Work Inspection" },
        description: { tr: "İşe başlamadan önce saha koşullarını yapılandırılmış checklist ile doğrulayın.", en: "Verify site conditions with a structured checklist before work starts." },
        href: "/checklists/hot-work",
        type: "checklist",
        icon: "✓",
      },
      {
        id: "hot-work-toolbox",
        title: { tr: "Sıcak İş Toolbox", en: "Hot Work Toolbox Talk" },
        description: { tr: "Ekip için saha öncesi sıcak iş bilgilendirmesini açın.", en: "Open a field-ready hot work briefing for the crew." },
        href: "/toolbox/hot-work",
        type: "toolbox",
        icon: "🧰",
      },
      ...commonWorkflow("hot-work", "Sıcak İş", "Hot Work"),
    ],
  },
  {
    keywords: ["confined space", "kapalı alan", "tank entry", "vessel entry", "manhole", "gas test", "attendant"],
    recommendations: [
      {
        id: "confined-space-guide",
        title: { tr: "Kapalı Alan Rehberi", en: "Confined Space Guide" },
        description: { tr: "Giriş izni, atmosfer, izolasyon, gözcü ve kurtarma gerekliliklerini inceleyin.", en: "Review entry permits, atmosphere, isolation, attendant and rescue requirements." },
        href: "/knowledge-base/confined-space",
        type: "knowledge",
        icon: "📚",
      },
      {
        id: "confined-space-checklist",
        title: { tr: "Kapalı Alan Denetimi", en: "Confined Space Inspection" },
        description: { tr: "Gaz testi, havalandırma, erişim ve kurtarma kontrollerini tamamlayın.", en: "Complete gas testing, ventilation, access and rescue checks." },
        href: "/checklists/confined-space",
        type: "checklist",
        icon: "✓",
      },
      {
        id: "confined-space-toolbox",
        title: { tr: "Kapalı Alan Toolbox", en: "Confined Space Toolbox Talk" },
        description: { tr: "Giriş öncesi ekip bilgilendirmesini açın.", en: "Open the pre-entry crew briefing." },
        href: "/toolbox/confined-space",
        type: "toolbox",
        icon: "🧰",
      },
      ...commonWorkflow("confined-space", "Kapalı Alan", "Confined Space"),
    ],
  },
  {
    keywords: ["loto", "lockout", "tagout", "energy isolation", "enerji izolasyonu", "kilitleme", "zero energy"],
    recommendations: [
      {
        id: "loto-guide",
        title: { tr: "LOTO Rehberi", en: "LOTO Guide" },
        description: { tr: "Enerji kaynakları, kilitleme ve sıfır enerji doğrulamasını inceleyin.", en: "Review energy sources, lockout and zero-energy verification." },
        href: "/knowledge-base/loto",
        type: "knowledge",
        icon: "📚",
      },
      {
        id: "loto-checklist",
        title: { tr: "LOTO Denetimi", en: "LOTO Inspection" },
        description: { tr: "İzolasyon noktaları ve doğrulama adımlarını kontrol edin.", en: "Check isolation points and verification steps." },
        href: "/checklists/loto",
        type: "checklist",
        icon: "✓",
      },
      {
        id: "loto-toolbox",
        title: { tr: "LOTO Toolbox", en: "LOTO Toolbox Talk" },
        description: { tr: "Enerji izolasyonu için ekip bilgilendirmesini açın.", en: "Open a team briefing for energy isolation." },
        href: "/toolbox/loto",
        type: "toolbox",
        icon: "🧰",
      },
      ...commonWorkflow("loto", "LOTO", "LOTO"),
    ],
  },
  {
    keywords: ["working at height", "work at height", "yüksekte çalışma", "fall protection", "emniyet kemeri", "harness", "lanyard", "anchor"],
    recommendations: [
      {
        id: "working-at-height-guide",
        title: { tr: "Yüksekte Çalışma Rehberi", en: "Working at Height Guide" },
        description: { tr: "Düşme önleme, ankraj, erişim ve kurtarma kontrollerini inceleyin.", en: "Review fall prevention, anchorage, access and rescue controls." },
        href: "/knowledge-base/working-at-height",
        type: "knowledge",
        icon: "📚",
      },
      {
        id: "working-at-height-checklist",
        title: { tr: "Yüksekte Çalışma Denetimi", en: "Working at Height Inspection" },
        description: { tr: "Erişim ekipmanı, korkuluk, ankraj ve alan kontrolünü doğrulayın.", en: "Verify access equipment, guardrails, anchorage and area control." },
        href: "/checklists/working-at-height",
        type: "checklist",
        icon: "✓",
      },
      {
        id: "working-at-height-toolbox",
        title: { tr: "Yüksekte Çalışma Toolbox", en: "Working at Height Toolbox Talk" },
        description: { tr: "Düşme riskleri ve kritik kontroller için saha konuşmasını açın.", en: "Open a field briefing on fall hazards and critical controls." },
        href: "/toolbox/working-at-height",
        type: "toolbox",
        icon: "🧰",
      },
      ...commonWorkflow("working-at-height", "Yüksekte Çalışma", "Working at Height"),
    ],
  },
  {
    keywords: ["scaffold", "scaffolding", "iskele", "trapdoor", "platform", "scaffold tag"],
    recommendations: [
      {
        id: "scaffolding-guide",
        title: { tr: "İskele Güvenliği Rehberi", en: "Scaffolding Safety Guide" },
        description: { tr: "Etiketleme, erişim, platform ve kenar koruma şartlarını inceleyin.", en: "Review tagging, access, platforms and edge-protection requirements." },
        href: "/knowledge-base/scaffolding",
        type: "knowledge",
        icon: "📚",
      },
      {
        id: "scaffolding-checklist",
        title: { tr: "İskele Denetimi", en: "Scaffold Inspection" },
        description: { tr: "İskeleyi kullanım öncesinde yapılandırılmış checklist ile kontrol edin.", en: "Inspect the scaffold with a structured pre-use checklist." },
        href: "/checklists/scaffolding",
        type: "checklist",
        icon: "✓",
      },
      {
        id: "scaffolding-toolbox",
        title: { tr: "İskele Toolbox", en: "Scaffolding Toolbox Talk" },
        description: { tr: "Güvenli iskele kullanımı için ekip konuşmasını açın.", en: "Open the crew briefing for safe scaffold use." },
        href: "/toolbox/scaffolding",
        type: "toolbox",
        icon: "🧰",
      },
      ...commonWorkflow("scaffolding", "İskele", "Scaffolding"),
    ],
  },
  {
    keywords: ["ppe", "kkd", "personal protective", "grinding", "taşlama", "face shield", "gözlük", "helmet", "hard hat"],
    recommendations: [
      {
        id: "ppe-guide",
        title: { tr: "KKD Rehberi", en: "PPE Guide" },
        description: { tr: "Göreve uygun KKD seçimi ve kullanım prensiplerini inceleyin.", en: "Review task-specific PPE selection and use principles." },
        href: "/knowledge-base/ppe",
        type: "knowledge",
        icon: "📚",
      },
      {
        id: "ppe-standards",
        title: { tr: "KKD Standartları", en: "PPE Standards" },
        description: { tr: "EN / EN ISO standartlarını ürün ve kullanım alanına göre inceleyin.", en: "Browse EN / EN ISO standards by PPE product and use case." },
        href: "/ppe-standards",
        type: "knowledge",
        icon: "⛑️",
      },
      {
        id: "ppe-signs",
        title: { tr: "Zorunlu KKD Levhaları", en: "Mandatory PPE Signs" },
        description: { tr: "Saha girişleri ve çalışma alanları için zorunlu KKD levhalarını açın.", en: "Open mandatory PPE signs for site entrances and work areas." },
        href: "/safety-signs",
        type: "safety-sign",
        icon: "!",
      },
      ...commonWorkflow("ppe", "KKD", "PPE"),
    ],
  },
  {
    keywords: ["excavation", "trench", "kazı", "hendek", "shoring", "slope"],
    recommendations: [
      {
        id: "excavation-guide",
        title: { tr: "Kazı Güvenliği Rehberi", en: "Excavation Safety Guide" },
        description: { tr: "Göçük, erişim, yeraltı hatları ve çevre kontrolünü inceleyin.", en: "Review collapse, access, underground services and area controls." },
        href: "/knowledge-base/excavation",
        type: "knowledge",
        icon: "📚",
      },
      {
        id: "excavation-checklist",
        title: { tr: "Kazı Denetimi", en: "Excavation Inspection" },
        description: { tr: "Kazı öncesi ve günlük saha kontrollerini tamamlayın.", en: "Complete pre-start and daily excavation checks." },
        href: "/checklists/excavation",
        type: "checklist",
        icon: "✓",
      },
      ...commonWorkflow("excavation", "Kazı", "Excavation"),
    ],
  },
  {
    keywords: ["electrical", "electric", "elektrik", "shock", "arc flash", "enerji"],
    recommendations: [
      {
        id: "electrical-guide",
        title: { tr: "Elektrik Güvenliği Rehberi", en: "Electrical Safety Guide" },
        description: { tr: "Elektrik tehlikeleri, izolasyon ve güvenli çalışma kontrollerini inceleyin.", en: "Review electrical hazards, isolation and safe-work controls." },
        href: "/knowledge-base/electrical",
        type: "knowledge",
        icon: "📚",
      },
      ...commonWorkflow("electrical", "Elektrik Güvenliği", "Electrical Safety"),
    ],
  },
];

export function getRecommendations(input: string, limit = 7): Recommendation[] {
  const normalizedInput = input.trim().toLowerCase();
  if (!normalizedInput) return [];

  const matches = groups
    .map((group) => ({
      score: group.keywords.reduce((score, keyword) => score + (normalizedInput.includes(keyword) ? 1 : 0), 0),
      recommendations: group.recommendations,
    }))
    .filter((group) => group.score > 0)
    .sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const results: Recommendation[] = [];

  for (const match of matches) {
    for (const recommendation of match.recommendations) {
      if (seen.has(recommendation.id)) continue;
      seen.add(recommendation.id);
      results.push(recommendation);
      if (results.length >= limit) return results;
    }
  }

  return results;
}
