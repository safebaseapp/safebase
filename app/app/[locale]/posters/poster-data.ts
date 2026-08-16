export type PosterCategory =
  | "all"
  | "work-at-height"
  | "scaffolding"
  | "hot-work"
  | "confined-space"
  | "electrical"
  | "loto"
  | "fire"
  | "ppe";

export type PosterLibraryItem = {
  slug: string;
  code: string;
  icon: string;
  category: Exclude<PosterCategory, "all">;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  available: boolean;
  revision: string;
};

export const posterCategories: Array<{
  id: PosterCategory;
  icon: string;
  tr: string;
  en: string;
}> = [
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
    id: "scaffolding",
    icon: "🪜",
    tr: "İskele",
    en: "Scaffolding",
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
    id: "fire",
    icon: "🧯",
    tr: "Yangın",
    en: "Fire Safety",
  },
  {
    id: "ppe",
    icon: "🦺",
    tr: "KKD",
    en: "PPE",
  },
];

export const posters: PosterLibraryItem[] = [
  {
    slug: "working-at-height-rules",
    code: "SRN-WAH-001",
    icon: "🏗️",
    category: "work-at-height",
    title: {
      tr: "Yüksekte Çalışma Kritik Güvenlik Kuralları",
      en: "Working at Height Critical Safety Rules",
    },
    description: {
      tr: "Düşüş önleme, ankraj, güvenli erişim, düşen cisimler ve kurtarma hazırlığı.",
      en: "Fall prevention, anchorage, safe access, dropped objects and rescue readiness.",
    },
    available: true,
    revision: "2.0",
  },
  {
    slug: "scaffold-safety-rules",
    code: "SRN-SCF-001",
    icon: "🪜",
    category: "scaffolding",
    title: {
      tr: "İskele Güvenlik Kuralları",
      en: "Scaffold Safety Rules",
    },
    description: {
      tr: "Etiketleme, erişim, platform, korkuluk ve güvenli iskele kullanım kuralları.",
      en: "Tagging, access, platforms, guardrails and safe scaffold-use rules.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "hot-work-safety-rules",
    code: "SRN-HW-001",
    icon: "🔥",
    category: "hot-work",
    title: {
      tr: "Sıcak Çalışma Güvenlik Kuralları",
      en: "Hot Work Safety Rules",
    },
    description: {
      tr: "Çalışma izni, gaz ölçümü, yangın gözcüsü ve kıvılcım kontrolü.",
      en: "Work permits, gas testing, fire watch and spark-control requirements.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "confined-space-entry-rules",
    code: "SRN-CS-001",
    icon: "⚠️",
    category: "confined-space",
    title: {
      tr: "Kapalı Alan Giriş Kuralları",
      en: "Confined Space Entry Rules",
    },
    description: {
      tr: "Atmosfer testi, giriş izni, gözcü, iletişim ve kurtarma hazırlığı.",
      en: "Atmospheric testing, entry permits, attendants, communication and rescue.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "electrical-safety-rules",
    code: "SRN-EL-001",
    icon: "⚡",
    category: "electrical",
    title: {
      tr: "Elektrik Güvenliği Kuralları",
      en: "Electrical Safety Rules",
    },
    description: {
      tr: "Enerji izolasyonu, hasarlı ekipman ve yetkisiz müdahalenin önlenmesi.",
      en: "Energy isolation, damaged equipment and prevention of unauthorized work.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "loto-golden-rules",
    code: "SRN-LOTO-001",
    icon: "🔒",
    category: "loto",
    title: {
      tr: "LOTO Altın Kuralları",
      en: "LOTO Golden Rules",
    },
    description: {
      tr: "Enerji belirleme, izolasyon, kilitleme ve sıfır enerji doğrulaması.",
      en: "Energy identification, isolation, lockout and zero-energy verification.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "fire-safety-rules",
    code: "SRN-FIRE-001",
    icon: "🧯",
    category: "fire",
    title: {
      tr: "Yangın Güvenliği Kuralları",
      en: "Fire Safety Rules",
    },
    description: {
      tr: "Yangın önleme, alarm, söndürücü kullanımı ve güvenli tahliye.",
      en: "Fire prevention, alarms, extinguisher use and safe evacuation.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "mandatory-ppe",
    code: "SRN-PPE-001",
    icon: "🦺",
    category: "ppe",
    title: {
      tr: "Zorunlu KKD Kullanımı",
      en: "Mandatory PPE",
    },
    description: {
      tr: "Temel kişisel koruyucu donanımlar ve doğru kullanım gereklilikleri.",
      en: "Essential personal protective equipment and correct-use requirements.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "ladder-safety-rules",
    code: "SRN-LAD-001",
    icon: "🪜",
    category: "work-at-height",
    title: {
      tr: "Merdiven Kritik Güvenlik Kuralları",
      en: "Ladder Critical Safety Rules",
    },
    description: {
      tr: "Merdiven seçimi, kullanım öncesi kontrol, doğru konumlandırma, üç nokta teması ve güvenli kullanım kuralları.",
      en: "Ladder selection, pre-use inspection, correct positioning, three-point contact and safe-use requirements.",
    },
    available: true,
    revision: "1.0",
  },

  /* SERNEM_SERIAL_POSTERS_START */
  {
    slug: "housekeeping-safety-rules",
    code: "SRN-HSK-001",
    icon: "🧹",
    category: "general" as any,
    title: {
      tr: "Housekeeping Kritik Güvenlik Kuralları",
      en: "Housekeeping Critical Safety Rules",
    },
    description: {
      tr: "Düzen, temiz geçiş yolları, atık yönetimi, dökülmeler ve takılma risklerinin kontrolü.",
      en: "Controls order, clear access routes, waste, spills and slip-trip hazards.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "excavation-safety-rules",
    code: "SRN-EXC-001",
    icon: "🚧",
    category: "general" as any,
    title: {
      tr: "Kazı Kritik Güvenlik Kuralları",
      en: "Excavation Critical Safety Rules",
    },
    description: {
      tr: "Göçük, yeraltı hatları, güvenli erişim, spoil pile ve yetkin kişi kontrolleri.",
      en: "Controls cave-ins, underground services, access, spoil piles and competent-person inspections.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "chemical-safety-rules",
    code: "SRN-CHM-001",
    icon: "🧪",
    category: "general" as any,
    title: {
      tr: "Kimyasal Güvenlik Kritik Kuralları",
      en: "Chemical Safety Critical Rules",
    },
    description: {
      tr: "Etiket, SDS, depolama, dökülme müdahalesi, uyumsuz kimyasallar ve maruziyet kontrolü.",
      en: "Controls labels, SDS, storage, spills, incompatible chemicals and exposure.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "forklift-safety-rules",
    code: "SRN-FLT-001",
    icon: "🚜",
    category: "general" as any,
    title: {
      tr: "Forklift Kritik Güvenlik Kuralları",
      en: "Forklift Critical Safety Rules",
    },
    description: {
      tr: "Yetkilendirme, günlük kontrol, kapasite, yaya ayrımı, görüş ve güvenli park kuralları.",
      en: "Controls authorization, daily inspections, rated capacity, pedestrian separation, visibility and parking.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "manual-handling-safety-rules",
    code: "SRN-MH-001",
    icon: "📦",
    category: "general" as any,
    title: {
      tr: "Elle Taşıma Kritik Güvenlik Kuralları",
      en: "Manual Handling Critical Safety Rules",
    },
    description: {
      tr: "Yük değerlendirmesi, kaldırma tekniği, ekip kaldırma, mekanik yardım ve taşıma yolu kontrolü.",
      en: "Controls load assessment, lifting technique, team lifts, mechanical aids and travel paths.",
    },
    available: true,
    revision: "1.0",
  },
  {
    slug: "dropped-objects-safety-rules",
    code: "SRN-DO-001",
    icon: "⬇️",
    category: "general" as any,
    title: {
      tr: "Düşen Cisim Kritik Güvenlik Kuralları",
      en: "Dropped Objects Critical Safety Rules",
    },
    description: {
      tr: "Alet sabitleme, alt alan izolasyonu, malzeme depolama ve yüksekte çalışma sırasında düşen cisim kontrolü.",
      en: "Controls tool tethering, exclusion zones, material storage and falling-object hazards during work at height.",
    },
    available: true,
    revision: "1.0",
  },
  /* SERNEM_SERIAL_POSTERS_END */

];
