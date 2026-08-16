import type { PosterDefinition } from "./types";

export const workingAtHeightPoster: PosterDefinition = {
  code: "SRN-WAH-001",
  revision: "2.0",

  title: {
    tr: "Yüksekte Çalışma Kritik Güvenlik Kuralları",
    en: "Working at Height Critical Safety Rules",
  },

  slogan: {
    tr: "Planla • Toplu Korumayı Önceliklendir • Düşmeyi Önle",
    en: "Plan • Prioritize Collective Protection • Prevent Falls",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "İş Öncesi Planlama",
        en: "Pre-Work Planning",
      },
      items: {
        tr: [
          "Risk değerlendirmesi ve çalışma iznini doğrula.",
          "Güvenli erişim ve çalışma yöntemini belirle.",
          "Alt alanı bariyerle ve yetkisiz erişimi önle.",
        ],
        en: [
          "Verify the risk assessment and work permit.",
          "Define the safe access and work method.",
          "Barricade the area below and prevent unauthorized access.",
        ],
      },
      icon: "training",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Toplu Korumayı Kullan",
        en: "Use Collective Protection",
      },
      items: {
        tr: [
          "Önce korkuluk, platform veya uygun iskele kullan.",
          "Açıklıkları sağlam kapak veya bariyerle koru.",
          "Eksik koruma varsa çalışmaya başlama.",
        ],
        en: [
          "Use guardrails, platforms or suitable scaffolds first.",
          "Protect openings with secure covers or barriers.",
          "Do not start if collective protection is incomplete.",
        ],
      },
      icon: "guardrail",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Tam Vücut Kemeri",
        en: "Full Body Harness",
      },
      items: {
        tr: [
          "Her kullanımdan önce kayış, dikiş ve etiketi kontrol et.",
          "Kemeri doğru giy, tokaları kapat ve ayarla.",
          "Hasarlı veya düşüş yaşamış ekipmanı kullanım dışı bırak.",
        ],
        en: [
          "Inspect webbing, stitching and labels before every use.",
          "Wear, fasten and adjust the harness correctly.",
          "Remove damaged or fall-arrested equipment from service.",
        ],
      },
      icon: "harness",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Onaylı Ankraj",
        en: "Approved Anchorage",
      },
      items: {
        tr: [
          "Yalnızca belirlenmiş ve onaylanmış ankraja bağlan.",
          "Kapasitenin kişi başına 22,2 kN olduğunu doğrula.",
          "Ankrajı mümkün olduğunca baş seviyesinin üzerinde seç.",
        ],
        en: [
          "Connect only to a designated and approved anchorage.",
          "Verify a capacity of 22.2 kN per attached worker.",
          "Select an anchorage above head level whenever possible.",
        ],
      },
      icon: "anchor",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Düşüş Mesafesi",
        en: "Fall Clearance",
      },
      items: {
        tr: [
          "Serbest düşüşü ve toplam düşüş açıklığını hesapla.",
          "Alt seviyeye veya engele çarpma riskini önle.",
          "Sallanarak düşme riskini en aza indir.",
        ],
        en: [
          "Calculate free-fall and total clearance distance.",
          "Prevent contact with lower levels or obstructions.",
          "Minimize the risk of a swing fall.",
        ],
      },
      icon: "fall",
      tone: "warning",
    },
    {
      number: "06",
      title: {
        tr: "Güvenli Erişim",
        en: "Safe Access",
      },
      items: {
        tr: [
          "Göreve uygun ve kontrol edilmiş erişim ekipmanı kullan.",
          "Merdivende üç nokta temasını koru.",
          "Erişim yolunu temiz, sabit ve engelsiz tut.",
        ],
        en: [
          "Use inspected access equipment suitable for the task.",
          "Maintain three-point contact on ladders.",
          "Keep access routes clear, stable and unobstructed.",
        ],
      },
      icon: "ladder",
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Düşen Cisimleri Önle",
        en: "Prevent Dropped Objects",
      },
      items: {
        tr: [
          "Aletleri uygun sabitleme sistemiyle emniyete al.",
          "Malzemeleri kenarlardan uzakta ve güvenli istifle.",
          "Alt çalışma alanını izole et ve girişleri kontrol et.",
        ],
        en: [
          "Secure tools using a suitable tethering system.",
          "Store materials safely away from edges.",
          "Isolate the area below and control access.",
        ],
      },
      icon: "equipment",
      tone: "warning",
    },
    {
      number: "08",
      title: {
        tr: "Kurtarma Hazırlığı",
        en: "Rescue Readiness",
      },
      items: {
        tr: [
          "İşe başlamadan önce uygulanabilir kurtarma planı hazırla.",
          "Kurtarma ekipmanı ve eğitimli personeli hazır bulundur.",
          "Acil iletişim ve müdahale yöntemini doğrula.",
        ],
        en: [
          "Prepare a workable rescue plan before starting.",
          "Ensure rescue equipment and trained personnel are available.",
          "Verify emergency communication and response arrangements.",
        ],
      },
      icon: "training",
      tone: "information",
    },
  ],

  never: {
    tr: [
      "Onaylı ankraj veya düşüş koruması yoksa",
      "Kemer, lanyard veya bağlantı ekipmanı hasarlıysa",
      "Korumasız kenar veya açık boşluk varsa",
      "Kurtarma planı ve müdahale imkânı yoksa",
      "Rüzgâr, buzlanma veya görüş koşulları güvenli değilse",
    ],
    en: [
      "There is no approved anchorage or fall protection",
      "The harness, lanyard or connector is damaged",
      "An unprotected edge or open hole is present",
      "No rescue plan or response capability is available",
      "Wind, ice or visibility conditions are unsafe",
    ],
  },

  ppe: {
    tr: [
      "Çene Bağlı Baret",
      "Koruyucu Gözlük",
      "İş Eldiveni",
      "Kaymaz Ayakkabı",
      "Tam Vücut Kemeri",
    ],
    en: [
      "Chin-Strap Helmet",
      "Safety Glasses",
      "Work Gloves",
      "Slip-Resistant Footwear",
      "Full Body Harness",
    ],
  },
};
