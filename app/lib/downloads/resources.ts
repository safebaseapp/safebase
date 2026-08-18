import { posters } from "@/app/[locale]/posters/poster-data";
import { allGuides } from "@/app/[locale]/knowledge-base/data/guides/all-guides";

export type ResourceCategory =
  | "toolbox-talks"
  | "posters"
  | "checklists"
  | "guides";

export type ResourceItem = {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  category: ResourceCategory;
  icon: string;
  format: "PDF" | "DOCX" | "PDF + DOCX" | "WEB";
  pdfUrl?: {
    tr: string;
    en: string;
  };
  docxUrl?: string;
  href?: {
    tr: string;
    en: string;
  };
  featured?: boolean;
};

export const RESOURCE_ITEMS: ResourceItem[] = [
  // TOOLBOX TALKS
  {
    id: "chemical-safety-toolbox",
    title: {
      tr: "Kimyasal Güvenliği Toolbox Talk",
      en: "Chemical Safety Toolbox Talk",
    },
    description: {
      tr: "Kimyasal maddelerin güvenli kullanımı, SDS, KKD, depolama ve dökülme kontrolleri.",
      en: "Safe chemical handling, SDS, PPE, storage and spill-control requirements.",
    },
    category: "toolbox-talks",
    icon: "🧪",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/chemical-safety-toolbox-talk-tr.pdf",
      en: "/downloads/chemical-safety-toolbox-talk-en.pdf",
    },
    featured: true,
  },
  {
    id: "confined-space-toolbox",
    title: {
      tr: "Kapalı Alan Çalışmaları Toolbox Talk",
      en: "Confined Space Toolbox Talk",
    },
    description: {
      tr: "Giriş izni, gaz ölçümü, izolasyon, havalandırma, gözcü ve kurtarma hazırlığı.",
      en: "Entry permits, gas testing, isolation, ventilation, attendants and rescue readiness.",
    },
    category: "toolbox-talks",
    icon: "🕳️",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/confined-space-toolbox-talk-tr.pdf",
      en: "/downloads/confined-space-toolbox-talk-en.pdf",
    },
    featured: true,
  },
  {
    id: "crane-banksman-toolbox",
    title: {
      tr: "Vinç ve İşaretçi Güvenliği Toolbox Talk",
      en: "Crane & Banksman Safety Toolbox Talk",
    },
    description: {
      tr: "Vinç operasyonları, işaretleşme, kör kaldırmalar ve yasaklı alan kontrolleri.",
      en: "Crane operations, signalling, blind lifts and exclusion-zone controls.",
    },
    category: "toolbox-talks",
    icon: "🏗️",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/crane-banksman-safety-toolbox-talk-tr.pdf",
      en: "/downloads/crane-banksman-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "dropped-objects-toolbox",
    title: {
      tr: "Düşen Cisimlerin Önlenmesi Toolbox Talk",
      en: "Dropped Object Prevention Toolbox Talk",
    },
    description: {
      tr: "Alet bağlama sistemleri, bariyerleme ve malzeme sabitleme kontrolleri.",
      en: "Tool tethering, exclusion zones and material-securing controls.",
    },
    category: "toolbox-talks",
    icon: "🚧",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/dropped-objects-toolbox-talk-tr.pdf",
      en: "/downloads/dropped-objects-toolbox-talk-en.pdf",
    },
  },
  {
    id: "electrical-toolbox",
    title: {
      tr: "Elektrik Güvenliği Toolbox Talk",
      en: "Electrical Safety Toolbox Talk",
    },
    description: {
      tr: "Elektrik ekipmanları, geçici enerji, RCD, izolasyon ve gerilim testleri.",
      en: "Electrical equipment, temporary power, RCDs, isolation and voltage testing.",
    },
    category: "toolbox-talks",
    icon: "⚡",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/electrical-safety-toolbox-talk-tr.pdf",
      en: "/downloads/electrical-safety-toolbox-talk-en.pdf",
    },
    featured: true,
  },
  {
    id: "excavation-toolbox",
    title: {
      tr: "Kazı Güvenliği Toolbox Talk",
      en: "Excavation Safety Toolbox Talk",
    },
    description: {
      tr: "Göçme riski, yeraltı hatları, güvenli erişim ve kazı koruma sistemleri.",
      en: "Collapse hazards, underground utilities, safe access and excavation protection.",
    },
    category: "toolbox-talks",
    icon: "🚜",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/excavation-safety-toolbox-talk-tr.pdf",
      en: "/downloads/excavation-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "fire-safety-toolbox",
    title: {
      tr: "Yangın Güvenliği Toolbox Talk",
      en: "Fire Safety Toolbox Talk",
    },
    description: {
      tr: "Yangın önleme, söndürücüler, acil durum müdahalesi ve tahliye.",
      en: "Fire prevention, extinguishers, emergency response and evacuation.",
    },
    category: "toolbox-talks",
    icon: "🔥",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/fire-safety-toolbox-talk-tr.pdf",
      en: "/downloads/fire-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "forklift-toolbox",
    title: {
      tr: "Forklift Güvenliği Toolbox Talk",
      en: "Forklift Safety Toolbox Talk",
    },
    description: {
      tr: "Operatör yetkisi, yük dengesi, kör noktalar, yaya güvenliği ve park.",
      en: "Operator authorisation, load stability, blind spots, pedestrian safety and parking.",
    },
    category: "toolbox-talks",
    icon: "🚜",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/forklift-safety-toolbox-talk-tr.pdf",
      en: "/downloads/forklift-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "hand-power-tools-toolbox",
    title: {
      tr: "El Aletleri ve Elektrikli El Aletleri Toolbox Talk",
      en: "Hand and Power Tools Toolbox Talk",
    },
    description: {
      tr: "Ekipman kontrolü, koruyucular, aksesuarlar ve doğru kullanım.",
      en: "Equipment inspections, guards, accessories and correct use.",
    },
    category: "toolbox-talks",
    icon: "🔧",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/hand-power-tools-toolbox-talk-tr.pdf",
      en: "/downloads/hand-power-tools-toolbox-talk-en.pdf",
    },
  },
  {
    id: "hot-work-toolbox",
    title: {
      tr: "Sıcak Çalışma Toolbox Talk",
      en: "Hot Work Toolbox Talk",
    },
    description: {
      tr: "Çalışma izni, gaz ölçümü, yangın gözcüsü ve yangın önleme kontrolleri.",
      en: "Work permits, gas testing, fire watch and fire-prevention controls.",
    },
    category: "toolbox-talks",
    icon: "🔥",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/hot-work-toolbox-talk-tr.pdf",
      en: "/downloads/hot-work-toolbox-talk-en.pdf",
    },
    featured: true,
  },
  {
    id: "housekeeping-toolbox",
    title: {
      tr: "Housekeeping ve Düzen Toolbox Talk",
      en: "Housekeeping Toolbox Talk",
    },
    description: {
      tr: "Geçiş yolları, döküntüler, istifleme, atık yönetimi ve çalışma alanı düzeni.",
      en: "Walkways, spills, storage, waste management and workplace organisation.",
    },
    category: "toolbox-talks",
    icon: "🧹",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/housekeeping-toolbox-talk-tr.pdf",
      en: "/downloads/housekeeping-toolbox-talk-en.pdf",
    },
  },
  {
    id: "ladder-toolbox",
    title: {
      tr: "Merdiven Güvenliği Toolbox Talk",
      en: "Ladder Safety Toolbox Talk",
    },
    description: {
      tr: "Merdiven kontrolü, 4:1 kuralı, üç temas noktası ve güvenli kurulum.",
      en: "Ladder inspection, the 4:1 rule, three-point contact and safe positioning.",
    },
    category: "toolbox-talks",
    icon: "🪜",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/ladder-safety-toolbox-talk-tr.pdf",
      en: "/downloads/ladder-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "lifting-toolbox",
    title: {
      tr: "Kaldırma Operasyonları Toolbox Talk",
      en: "Lifting Operations Toolbox Talk",
    },
    description: {
      tr: "Kaldırma planı, yük ağırlığı, aksesuarlar, işaretleşme ve yasaklı alanlar.",
      en: "Lifting plans, load weight, accessories, signalling and exclusion zones.",
    },
    category: "toolbox-talks",
    icon: "🪝",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/lifting-operations-toolbox-talk-tr.pdf",
      en: "/downloads/lifting-operations-toolbox-talk-en.pdf",
    },
  },
  {
    id: "loto-toolbox",
    title: {
      tr: "LOTO Enerji İzolasyonu Toolbox Talk",
      en: "Lockout Tagout Toolbox Talk",
    },
    description: {
      tr: "Tehlikeli enerji, izolasyon, kişisel kilit ve sıfır enerji doğrulaması.",
      en: "Hazardous energy, isolation, personal locks and zero-energy verification.",
    },
    category: "toolbox-talks",
    icon: "🔒",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/loto-toolbox-talk-tr.pdf",
      en: "/downloads/loto-toolbox-talk-en.pdf",
    },
    featured: true,
  },
  {
    id: "mobile-equipment-toolbox",
    title: {
      tr: "Mobil Ekipman Güvenliği Toolbox Talk",
      en: "Mobile Equipment Safety Toolbox Talk",
    },
    description: {
      tr: "Kör noktalar, geri manevra, spotter, yaya ayrımı ve günlük kontroller.",
      en: "Blind spots, reversing, spotters, pedestrian separation and daily inspections.",
    },
    category: "toolbox-talks",
    icon: "🚛",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/mobile-equipment-safety-toolbox-talk-tr.pdf",
      en: "/downloads/mobile-equipment-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "ppe-toolbox",
    title: {
      tr: "Kişisel Koruyucu Donanım Toolbox Talk",
      en: "Personal Protective Equipment Toolbox Talk",
    },
    description: {
      tr: "KKD seçimi, kontrolü, doğru kullanımı, bakımı ve değiştirilmesi.",
      en: "PPE selection, inspection, correct use, care and replacement.",
    },
    category: "toolbox-talks",
    icon: "🦺",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/ppe-safety-toolbox-talk-tr.pdf",
      en: "/downloads/ppe-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "safety-harness-toolbox",
    title: {
      tr: "Emniyet Kemeri Kullanımı Toolbox Talk",
      en: "Safety Harness Use Toolbox Talk",
    },
    description: {
      tr: "Kemer kontrolü, ankraj, sürekli bağlantı, düşüş mesafesi ve kurtarma.",
      en: "Harness inspection, anchorage, continuous attachment, fall clearance and rescue.",
    },
    category: "toolbox-talks",
    icon: "🪢",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/safety-harness-toolbox-talk-tr.pdf",
      en: "/downloads/safety-harness-toolbox-talk-en.pdf",
    },
  },
  {
    id: "scaffold-toolbox",
    title: {
      tr: "İskele Güvenliği Toolbox Talk",
      en: "Scaffold Safety Toolbox Talk",
    },
    description: {
      tr: "İskele etiketleri, erişim, platformlar, kenar koruması ve güvenli kullanım.",
      en: "Scaffold tags, access, platforms, edge protection and safe use.",
    },
    category: "toolbox-talks",
    icon: "🏗️",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/scaffold-safety-toolbox-talk-tr.pdf",
      en: "/downloads/scaffold-safety-toolbox-talk-en.pdf",
    },
  },
  {
    id: "working-at-height-toolbox",
    title: {
      tr: "Yüksekte Çalışma Toolbox Talk",
      en: "Working at Height Toolbox Talk",
    },
    description: {
      tr: "Düşme riskleri, ankraj, düşen cisimler ve kurtarma hazırlığı.",
      en: "Fall hazards, anchorage, dropped objects and rescue readiness.",
    },
    category: "toolbox-talks",
    icon: "🪜",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/working-at-height-toolbox-talk-tr.pdf",
      en: "/downloads/working-at-height-toolbox-talk-en.pdf",
    },
    featured: true,
  },
  {
    id: "manual-handling-toolbox",
    title: {
      tr: "Elle Taşıma Güvenliği Toolbox Talk",
      en: "Manual Handling Safety Toolbox Talk",
    },
    description: {
      tr: "Güvenli kaldırma, taşıma ve ergonomik çalışma teknikleri.",
      en: "Safe lifting, carrying and ergonomic manual handling techniques.",
    },
    category: "toolbox-talks",
    icon: "📦",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/manual-handling-toolbox-talk-tr.pdf",
      en: "/downloads/manual-handling-toolbox-talk-en.pdf",
    },
  },

  // POSTERS — live SERNEM poster library
  ...posters
    .filter((poster) => poster.available)
    .map(
      (poster): ResourceItem => ({
        id: `poster-${poster.slug}`,
        title: poster.title,
        description: poster.description,
        category: "posters",
        icon: poster.icon,
        format: "PDF",
        href: {
          tr: `/tr/posters/${poster.slug}`,
          en: `/en/posters/${poster.slug}`,
        },
      })
    ),

  // CHECKLISTS
  {
    id: "confined-space-checklist",
    title: {
      tr: "Kapalı Alan Giriş Kontrol Listesi",
      en: "Confined Space Entry Checklist",
    },
    description: {
      tr: "Kapalı alan girişinden önce temel güvenlik kontrollerini doğrulayın.",
      en: "Verify essential safety controls before confined-space entry.",
    },
    category: "checklists",
    icon: "✅",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/confined-space-entry-checklist-tr.pdf",
      en: "/downloads/confined-space-entry-checklist-en.pdf",
    },
  },
  {
    id: "hot-work-checklist",
    title: {
      tr: "Sıcak Çalışma Kontrol Listesi",
      en: "Hot Work Inspection Checklist",
    },
    description: {
      tr: "Sıcak çalışma öncesi ve sırasında gerekli kontrolleri doğrulayın.",
      en: "Verify required controls before and during hot work.",
    },
    category: "checklists",
    icon: "✅",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/hot-work-inspection-checklist-tr.pdf",
      en: "/downloads/hot-work-inspection-checklist-en.pdf",
    },
  },
  {
    id: "loto-checklist",
    title: {
      tr: "LOTO Doğrulama Kontrol Listesi",
      en: "LOTO Verification Checklist",
    },
    description: {
      tr: "Enerji izolasyonu ve sıfır enerji durumunu sistematik olarak doğrulayın.",
      en: "Systematically verify isolation and zero-energy state.",
    },
    category: "checklists",
    icon: "✅",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/loto-verification-checklist-tr.pdf",
      en: "/downloads/loto-verification-checklist-en.pdf",
    },
  },
  {
    id: "ppe-checklist",
    title: {
      tr: "KKD Kontrol Listesi",
      en: "PPE Inspection Checklist",
    },
    description: {
      tr: "KKD durumunu ve kullanıma uygunluğunu sistematik olarak kontrol edin.",
      en: "Systematically inspect PPE condition and suitability for use.",
    },
    category: "checklists",
    icon: "✅",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/ppe-inspection-checklist-tr.pdf",
      en: "/downloads/ppe-inspection-checklist-en.pdf",
    },
  },
  {
    id: "scaffold-checklist",
    title: {
      tr: "İskele Kontrol Listesi",
      en: "Scaffold Inspection Checklist",
    },
    description: {
      tr: "İskele erişimi, platformu, kenar koruması ve yapısal kontrolleri değerlendirin.",
      en: "Check scaffold access, platforms, edge protection and structural conditions.",
    },
    category: "checklists",
    icon: "✅",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/scaffold-inspection-checklist-tr.pdf",
      en: "/downloads/scaffold-inspection-checklist-en.pdf",
    },
  },
  {
    id: "working-at-height-checklist",
    title: {
      tr: "Yüksekte Çalışma Kontrol Listesi",
      en: "Working at Height Checklist",
    },
    description: {
      tr: "Yüksekte çalışma öncesi düşme önleme ve kurtarma kontrollerini değerlendirin.",
      en: "Verify fall-prevention and rescue controls before work at height.",
    },
    category: "checklists",
    icon: "✅",
    format: "PDF",
    pdfUrl: {
      tr: "/downloads/working-at-height-checklist-tr.pdf",
      en: "/downloads/working-at-height-checklist-en.pdf",
    },
  },

  // GUIDES — live SERNEM Knowledge Base
  ...allGuides.map(
    (guide): ResourceItem => ({
      id: `guide-${guide.slug}`,
      title: guide.title,
      description: guide.description,
      category: "guides",
      icon: "📘",
      format: "WEB",
      href: {
        tr: `/tr/knowledge-base/${guide.slug}`,
        en: `/en/knowledge-base/${guide.slug}`,
      },
    })
  ),

];
