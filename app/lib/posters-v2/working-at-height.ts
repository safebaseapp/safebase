import type { PosterDefinition } from "./types";

export const workingAtHeightPoster: PosterDefinition = {
  code: "SB-WAH-001",
  revision: "1.0",

  title: {
    tr: "Yüksekte Çalışma Güvenlik Kuralları",
    en: "Working at Height Safety Rules",
  },

  slogan: {
    tr: "Planla • Koru • Düşmeyi Önle",
    en: "Plan • Protect • Prevent Falls",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Güvenli Erişim",
        en: "Safe Access",
      },
      items: {
        tr: [
          "Onaylı erişim ekipmanı kullan.",
          "Ekipmanı doğru ve sabit şekilde kur.",
          "Kullanmadan önce kontrol et.",
        ],
        en: [
          "Use approved access equipment.",
          "Install equipment securely.",
          "Inspect it before use.",
        ],
      },
      icon: "ladder",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Tam Vücut Kemeri",
        en: "Full Body Harness",
      },
      items: {
        tr: [
          "Her kullanımdan önce kontrol et.",
          "Doğru şekilde giy ve ayarla.",
          "Hasarlı kemeri kullanma.",
        ],
        en: [
          "Inspect before every use.",
          "Wear and adjust it correctly.",
          "Never use a damaged harness.",
        ],
      },
      icon: "harness",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Onaylı Ankraj",
        en: "Approved Anchorage",
      },
      items: {
        tr: [
          "Yalnızca onaylı noktaya bağlan.",
          "Taşıma kapasitesini doğrula.",
          "Ankrajı kullanmadan önce kontrol et.",
        ],
        en: [
          "Connect only to approved points.",
          "Verify the load capacity.",
          "Inspect the anchorage before use.",
        ],
      },
      icon: "anchor",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Korkuluk Sistemi",
        en: "Guardrail System",
      },
      items: {
        tr: [
          "Korkuluğa çıkma veya oturma.",
          "Korkulukları izinsiz sökme.",
          "Eksik veya hasarlıysa bildir.",
        ],
        en: [
          "Never climb or sit on guardrails.",
          "Do not remove guardrails.",
          "Report missing or damaged sections.",
        ],
      },
      icon: "guardrail",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Düşme Tehlikeleri",
        en: "Fall Hazards",
      },
      items: {
        tr: [
          "Korumasız kenarlardan uzak dur.",
          "Boşlukları kapat veya bariyerle.",
          "Alet ve malzemeleri sabitle.",
        ],
        en: [
          "Stay away from unprotected edges.",
          "Cover or barricade openings.",
          "Secure tools and materials.",
        ],
      },
      icon: "fall",
      tone: "warning",
    },
    {
      number: "06",
      title: {
        tr: "Hava Koşulları",
        en: "Weather Conditions",
      },
      items: {
        tr: [
          "Güçlü rüzgârda işi durdur.",
          "Yağmur, kar ve buzda önlem al.",
          "Görüş mesafesini kontrol et.",
        ],
        en: [
          "Stop work in strong winds.",
          "Take precautions in rain, snow and ice.",
          "Check visibility.",
        ],
      },
      icon: "weather",
      tone: "warning",
    },
    {
      number: "07",
      title: {
        tr: "Ekipman Kontrolü",
        en: "Equipment Inspection",
      },
      items: {
        tr: [
          "İşe başlamadan önce kontrol et.",
          "Hasarlı ekipman kullanma.",
          "Göreve uygun ekipman seç.",
        ],
        en: [
          "Inspect equipment before work.",
          "Do not use damaged equipment.",
          "Select equipment suitable for the task.",
        ],
      },
      icon: "equipment",
      tone: "warning",
    },
    {
      number: "08",
      title: {
        tr: "Eğitim ve Yetki",
        en: "Training and Authorization",
      },
      items: {
        tr: [
          "Eğitimsiz çalışma yapma.",
          "Yalnızca yetkili personel çalışsın.",
          "Talimatları anla ve uygula.",
        ],
        en: [
          "Do not work without training.",
          "Only authorized personnel may work.",
          "Understand and follow instructions.",
        ],
      },
      icon: "training",
      tone: "information",
    },
  ],

  never: {
    tr: [
      "Düşüş korumasız çalışma",
      "Hasarlı ekipman kullanma",
      "Korkuluğa tırmanma",
      "Güvensiz havada çalışma",
    ],
    en: [
      "Work without fall protection",
      "Use damaged equipment",
      "Climb guardrails",
      "Work in unsafe weather",
    ],
  },

  ppe: {
    tr: ["Baret", "Gözlük", "Eldiven", "Ayakkabı", "Emniyet Kemeri"],
    en: ["Helmet", "Glasses", "Gloves", "Footwear", "Harness"],
  },
};
