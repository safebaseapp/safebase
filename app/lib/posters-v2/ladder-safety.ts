import type { PosterDefinition } from "./types";

export const ladderSafetyPoster: PosterDefinition = {
  code: "SRN-LAD-001",
  revision: "2.0",

  title: {
    tr: "Merdiven Kritik Güvenlik Kuralları",
    en: "Ladder Critical Safety Rules",
  },

  slogan: {
    tr: "DOĞRU SEÇ • KONTROL ET • SABİTLE • 3 NOKTA TEMASINI KORU",
    en: "SELECT • INSPECT • SECURE • MAINTAIN 3-POINT CONTACT",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Kullanım Öncesi Kontrol",
        en: "Pre-Use Inspection",
      },
      items: {
        tr: [
          "Basamakları, yan kolları, ayakları ve bağlantıları kontrol et.",
          "Çatlak, eğilmiş, gevşek veya eksik parça varsa kullanma.",
          "Hasarlı merdiveni hemen kullanım dışı bırak.",
        ],
        en: [
          "Inspect rungs, side rails, feet and connections before use.",
          "Do not use ladders with cracks, bends, loose or missing parts.",
          "Immediately remove damaged ladders from service.",
        ],
      },
      icon: "ladder-inspection",
      tone: "mandatory",
      application: {"kind": "required-control"},
    },
    {
      number: "02",
      title: {
        tr: "Doğru Merdiveni Seç",
        en: "Select the Correct Ladder",
      },
      items: {
        tr: [
          "İşe uygun tipte ve yeterli uzunlukta merdiven kullan.",
          "Merdivenin taşıma kapasitesini aşma.",
          "Elektrik tehlikesi bulunan alanlarda metal merdiven kullanma.",
        ],
        en: [
          "Use the correct ladder type and sufficient length for the task.",
          "Never exceed the ladder load rating.",
          "Do not use metal ladders where electrical hazards are present.",
        ],
      },
      icon: "ladder-select",
      tone: "mandatory",
      application: {"kind": "required-control"},
    },
    {
      number: "03",
      title: {
        tr: "Sağlam Zemine Yerleştir",
        en: "Use Stable Ground",
      },
      items: {
        tr: [
          "Merdiveni düz, sağlam ve kaymaz zemine kur.",
          "Kutu, palet veya geçici yükselti üzerine merdiven koyma.",
          "Ayakların kaymasını veya batmasını önle.",
        ],
        en: [
          "Place the ladder on firm, level and non-slip ground.",
          "Never place ladders on boxes, pallets or temporary platforms.",
          "Prevent the ladder feet from slipping or sinking.",
        ],
      },
      icon: "ladder-ground",
      tone: "mandatory",
      application: {"kind": "required-control"},
    },
    {
      number: "04",
      title: {
        tr: "Doğru Açı ve Sabitleme",
        en: "Correct Angle and Securing",
      },
      items: {
        tr: [
          "OSHA genel dayamalı merdiven: yatay açıklık yaklaşık çalışma uzunluğunun dörtte biri; özel tipleri doğrula.",
          "Üst seviyeye erişimde yan kollar ≥3 ft (0,9 m) uzansın; merdiven uzunluğu yetmiyorsa rijit desteğe üstten sabitle VE tutamak sağla.",
          "Merdivenin kaymasını ve hareketini önle; üretici kurulum talimatını uygula.",
        ],
        en: [
          "OSHA general non-self-supporting ladder setup: horizontal setback about one-quarter of working length; check special types.",
          "Landing access: rails extend ≥3 ft (0.9 m); if ladder length prevents this, secure the top to rigid support AND provide a grasping device.",
          "Prevent slipping or displacement; follow manufacturer setup instructions.",
        ],
      },
      icon: "ladder-angle",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Dayamalı merdiven/üst seviyeye erişimde", "en": "Using a leaning ladder or accessing a landing"}},
    },
    {
      number: "05",
      title: {
        tr: "3 Nokta Temasını Koru",
        en: "Maintain 3-Point Contact",
      },
      items: {
        tr: [
          "Çıkarken ve inerken merdivene dönük ol.",
          "Tırmanırken üç nokta temasını koru.",
          "Elleri serbest bırakmak için alet çantası veya uygun taşıma yöntemi kullan.",
        ],
        en: [
          "Face the ladder while ascending and descending.",
          "Maintain three points of contact when climbing.",
          "Use a tool belt or suitable method to keep hands free while climbing.",
        ],
      },
      icon: "ladder-contact",
      tone: "mandatory",
      application: {"kind": "required-control"},
    },
    {
      number: "06",
      title: {
        tr: "Aşırı Uzanma Yapma",
        en: "Do Not Overreach",
      },
      items: {
        tr: [
          "Vücudunu merdivenin yan kolları arasında tut.",
          "Güvenli şekilde ulaşamıyorsan aşağı in.",
          "Merdiveni yeniden konumlandır ve işe devam et.",
        ],
        en: [
          "Keep your body between the ladder side rails.",
          "Climb down if the work cannot be reached safely.",
          "Reposition the ladder before continuing the task.",
        ],
      },
      icon: "ladder-overreach",
      tone: "warning",
      application: {"kind": "hazard-warning"},
    },
    {
      number: "07",
      title: {
        tr: "Çalışma Alanını Koru",
        en: "Protect the Work Area",
      },
      items: {
        tr: [
          "Kapı, araç veya yaya trafiği olan bölgelerde alanı bariyerle.",
          "Kapıları kilitle veya kontrol altına al.",
          "Merdivenin çarpılmasını veya yerinden oynamasını önle.",
        ],
        en: [
          "Barricade areas exposed to doors, vehicles or pedestrian traffic.",
          "Lock or control doors where necessary.",
          "Prevent the ladder from being struck or displaced.",
        ],
      },
      icon: "ladder-barricade",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Kapı, araç veya yaya trafiği varsa", "en": "Doors, vehicles or pedestrians can affect the ladder"}},
    },
    {
      number: "08",
      title: {
        tr: "Güvensizse İşi Durdur",
        en: "Stop When Unsafe",
      },
      items: {
        tr: [
          "Kaygan yüzey, kuvvetli rüzgar veya kötü hava koşullarında kullanma.",
          "Merdiven güvenli şekilde sabitlenemiyorsa işi durdur.",
          "Gerekirse iskele veya uygun erişim ekipmanı kullan.",
        ],
        en: [
          "Do not use ladders on slippery surfaces, in strong winds or unsafe weather.",
          "Stop work if the ladder cannot be secured safely.",
          "Use a scaffold or suitable access equipment when required.",
        ],
      },
      icon: "ladder-stop",
      tone: "warning",
      application: {"kind": "hazard-warning"},
    },
  ],

  never: {
    tr: [
      "Hasarlı veya etiketsiz merdiven kullanma",
      "Merdiveni kutu, palet veya geçici yükselti üzerine koyma",
      "Merdiven üzerinde aşırı yana uzanma",
      "Elektrik tehlikesi yakınında metal merdiven kullanma",
      "Merdiven güvenli şekilde konumlandırılamıyorsa işe devam etme",
    ],
    en: [
      "Never use a damaged or unidentified ladder",
      "Never place a ladder on boxes, pallets or temporary platforms",
      "Never overreach sideways while on a ladder",
      "Never use a metal ladder near electrical hazards",
      "Never continue when the ladder cannot be positioned safely",
    ],
  },

  ppe: {
    tr: [
      "Baret",
      "Koruyucu Gözlük",
      "İş Eldiveni",
      "Kaymaz İş Ayakkabısı",
      "Tam Vücut Emniyet Kemeri*",
    ],
    en: [
      "Safety Helmet",
      "Safety Glasses",
      "Work Gloves",
      "Slip-Resistant Safety Footwear",
      "Full Body Harness*",
    ],
  },
};
