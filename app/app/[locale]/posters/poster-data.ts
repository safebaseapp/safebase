export type PosterCategory =
  | "work-at-height"
  | "hot-work"
  | "confined-space"
  | "electrical"
  | "fire"
  | "loto"
  | "ppe"
  | "emergency";

export type PosterItem = {
  slug: string;
  icon: string;
  category: PosterCategory;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  pdf: {
    tr: string;
    en: string;
  };
};

export const posterCategories = [
  {
    id: "all",
    icon: "▦",
    tr: "Tüm Posterler",
    en: "All Posters",
  },
  {
    id: "work-at-height",
    icon: "🏗️",
    tr: "Yüksekte Çalışma",
    en: "Working at Height",
  },
  {
    id: "hot-work",
    icon: "🔥",
    tr: "Sıcak İş",
    en: "Hot Work",
  },
  {
    id: "confined-space",
    icon: "⚠️",
    tr: "Kapalı Alan",
    en: "Confined Space",
  },
  {
    id: "electrical",
    icon: "⚡",
    tr: "Elektrik",
    en: "Electrical",
  },
  {
    id: "fire",
    icon: "🧯",
    tr: "Yangın Güvenliği",
    en: "Fire Safety",
  },
  {
    id: "loto",
    icon: "🔒",
    tr: "LOTO",
    en: "LOTO",
  },
  {
    id: "ppe",
    icon: "🦺",
    tr: "KKD",
    en: "PPE",
  },
  {
    id: "emergency",
    icon: "🚨",
    tr: "Acil Durum",
    en: "Emergency",
  },
] as const;

export const posters: PosterItem[] = [
  {
    slug: "working-at-height-rules",
    icon: "🏗️",
    category: "work-at-height",
    title: {
      tr: "Yüksekte Çalışma Güvenlik Kuralları",
      en: "Working at Height Safety Rules",
    },
    description: {
      tr: "Düşme önleme, güvenli erişim, ankraj, düşen cisimler ve kurtarma planı kontrolleri.",
      en: "Covers fall prevention, safe access, anchorage, dropped objects and rescue planning.",
    },
    pdf: {
      tr: "/downloads/working-at-height-rules-poster-tr.pdf",
      en: "/downloads/working-at-height-rules-poster-en.pdf",
    },
  },
  {
    slug: "scaffold-safety-rules",
    icon: "🪜",
    category: "work-at-height",
    title: {
      tr: "İskele Güvenlik Kuralları",
      en: "Scaffold Safety Rules",
    },
    description: {
      tr: "İskele erişimi, platform, korkuluk, etiketleme ve güvenli kullanım gereklilikleri.",
      en: "Covers scaffold access, platforms, guardrails, tagging and safe use.",
    },
    pdf: {
      tr: "/downloads/scaffold-safety-rules-poster-tr.pdf",
      en: "/downloads/scaffold-safety-rules-poster-en.pdf",
    },
  },
  {
    slug: "hot-work-safety-rules",
    icon: "🔥",
    category: "hot-work",
    title: {
      tr: "Sıcak Çalışma Güvenlik Kuralları",
      en: "Hot Work Safety Rules",
    },
    description: {
      tr: "Çalışma izni, yanıcı maddeler, gaz ölçümü, yangın gözcüsü ve iş sonrası kontroller.",
      en: "Covers permits, combustibles, gas testing, fire watch and post-work checks.",
    },
    pdf: {
      tr: "/downloads/hot-work-safety-rules-poster-tr.pdf",
      en: "/downloads/hot-work-safety-rules-poster-en.pdf",
    },
  },
  {
    slug: "confined-space-entry-rules",
    icon: "⚠️",
    category: "confined-space",
    title: {
      tr: "Kapalı Alan Giriş Kuralları",
      en: "Confined Space Entry Rules",
    },
    description: {
      tr: "Atmosfer ölçümü, giriş izni, gözcü, iletişim ve kurtarma hazırlığı gereklilikleri.",
      en: "Covers atmospheric testing, permits, attendants, communication and rescue readiness.",
    },
    pdf: {
      tr: "/downloads/confined-space-entry-rules-poster-tr.pdf",
      en: "/downloads/confined-space-entry-rules-poster-en.pdf",
    },
  },
  {
    slug: "electrical-safety-rules",
    icon: "⚡",
    category: "electrical",
    title: {
      tr: "Elektrik Güvenliği Kuralları",
      en: "Electrical Safety Rules",
    },
    description: {
      tr: "Enerji izolasyonu, hasarlı ekipman, yetkisiz müdahale ve güvenli elektrik çalışması.",
      en: "Covers energy isolation, damaged equipment, unauthorised work and electrical safety.",
    },
    pdf: {
      tr: "/downloads/electrical-safety-rules-poster-tr.pdf",
      en: "/downloads/electrical-safety-rules-poster-en.pdf",
    },
  },
  {
    slug: "fire-extinguisher-selection",
    icon: "🧯",
    category: "fire",
    title: {
      tr: "Yangın Söndürücü Seçimi",
      en: "Fire Extinguisher Selection",
    },
    description: {
      tr: "Yangın sınıfına göre doğru söndürücünün seçilmesini ve güvenli müdahaleyi destekler.",
      en: "Supports correct extinguisher selection and safe response for different fire classes.",
    },
    pdf: {
      tr: "/downloads/fire-extinguisher-selection-poster-tr.pdf",
      en: "/downloads/fire-extinguisher-selection-poster-en.pdf",
    },
  },
  {
    slug: "emergency-response",
    icon: "🚨",
    category: "emergency",
    title: {
      tr: "Acil Durum Müdahale Kuralları",
      en: "Emergency Response Rules",
    },
    description: {
      tr: "Alarm verme, tahliye, toplanma alanı, iletişim ve acil durum sorumlulukları.",
      en: "Covers alarms, evacuation, assembly points, communication and emergency responsibilities.",
    },
    pdf: {
      tr: "/downloads/emergency-response-poster-tr.pdf",
      en: "/downloads/emergency-response-poster-en.pdf",
    },
  },
  {
    slug: "mandatory-ppe",
    icon: "🦺",
    category: "ppe",
    title: {
      tr: "Zorunlu KKD Kullanımı",
      en: "Mandatory PPE",
    },
    description: {
      tr: "Çalışma alanlarında kullanılması gereken temel kişisel koruyucu donanımları hatırlatır.",
      en: "Highlights the essential personal protective equipment required in work areas.",
    },
    pdf: {
      tr: "/downloads/mandatory-ppe-poster-tr.pdf",
      en: "/downloads/mandatory-ppe-poster-en.pdf",
    },
  },
  {
    slug: "loto-golden-rules",
    icon: "🔒",
    category: "loto",
    title: {
      tr: "LOTO Altın Kuralları",
      en: "LOTO Golden Rules",
    },
    description: {
      tr: "Enerji kaynaklarını belirleme, izolasyon, kilitleme, etiketleme ve sıfır enerji doğrulaması.",
      en: "Covers energy identification, isolation, locking, tagging and zero-energy verification.",
    },
    pdf: {
      tr: "/downloads/loto-golden-rules-poster-tr.pdf",
      en: "/downloads/loto-golden-rules-poster-en.pdf",
    },
  },
];
