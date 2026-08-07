export type PosterCategory =
  | "work-at-height"
  | "hot-work"
  | "confined-space"
  | "electrical"
  | "loto"
  | "ppe"
  | "general";

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
    id: "work-at-height",
    icon: "🏗️",
    tr: "Yüksekte Çalışma",
    en: "Working at Height",
  },
  {
    id: "hot-work",
    icon: "🔥",
    tr: "Sıcak Çalışma",
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
    id: "general",
    icon: "📌",
    tr: "Genel",
    en: "General",
  },
] as const;

export const posters: PosterItem[] = [
  {
    slug: "confined-space-entry-rules",
    icon: "⚠️",
    category: "confined-space",
    title: {
      tr: "Confined Space Entry Rules",
      en: "Confined Space Entry Rules",
    },
    description: {
      tr: "Profesyonel HSE güvenlik posteri.",
      en: "Professional HSE safety poster.",
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
      tr: "Electrical Safety Rules",
      en: "Electrical Safety Rules",
    },
    description: {
      tr: "Profesyonel HSE güvenlik posteri.",
      en: "Professional HSE safety poster.",
    },
    pdf: {
      tr: "/downloads/electrical-safety-rules-poster-tr.pdf",
      en: "/downloads/electrical-safety-rules-poster-en.pdf",
    },
  },
  {
    slug: "hot-work-safety-rules",
    icon: "🔥",
    category: "hot-work",
    title: {
      tr: "Hot Work Safety Rules",
      en: "Hot Work Safety Rules",
    },
    description: {
      tr: "Profesyonel HSE güvenlik posteri.",
      en: "Professional HSE safety poster.",
    },
    pdf: {
      tr: "/downloads/hot-work-safety-rules-poster-tr.pdf",
      en: "/downloads/hot-work-safety-rules-poster-en.pdf",
    },
  },
  {
    slug: "loto-golden-rules",
    icon: "🔒",
    category: "loto",
    title: {
      tr: "Loto Golden Rules",
      en: "Loto Golden Rules",
    },
    description: {
      tr: "Profesyonel HSE güvenlik posteri.",
      en: "Professional HSE safety poster.",
    },
    pdf: {
      tr: "/downloads/loto-golden-rules-poster-tr.pdf",
      en: "/downloads/loto-golden-rules-poster-en.pdf",
    },
  },
  {
    slug: "mandatory-ppe",
    icon: "🦺",
    category: "ppe",
    title: {
      tr: "Mandatory Ppe",
      en: "Mandatory Ppe",
    },
    description: {
      tr: "Profesyonel HSE güvenlik posteri.",
      en: "Professional HSE safety poster.",
    },
    pdf: {
      tr: "/downloads/mandatory-ppe-poster-tr.pdf",
      en: "/downloads/mandatory-ppe-poster-en.pdf",
    },
  },
  {
    slug: "scaffold-safety-rules",
    icon: "🪜",
    category: "work-at-height",
    title: {
      tr: "Scaffold Safety Rules",
      en: "Scaffold Safety Rules",
    },
    description: {
      tr: "Profesyonel HSE güvenlik posteri.",
      en: "Professional HSE safety poster.",
    },
    pdf: {
      tr: "/downloads/scaffold-safety-rules-poster-tr.pdf",
      en: "/downloads/scaffold-safety-rules-poster-en.pdf",
    },
  },
  {
    slug: "working-at-height-rules",
    icon: "🏗️",
    category: "work-at-height",
    title: {
      tr: "Working At Height Rules",
      en: "Working At Height Rules",
    },
    description: {
      tr: "Profesyonel HSE güvenlik posteri.",
      en: "Professional HSE safety poster.",
    },
    pdf: {
      tr: "/downloads/working-at-height-rules-poster-tr.pdf",
      en: "/downloads/working-at-height-rules-poster-en.pdf",
    },
  }
];
