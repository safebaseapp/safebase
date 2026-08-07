import type { PosterDefinition } from "./types";

export const ladderSafetyPoster: PosterDefinition = {
  code: "SB-LAD-001",
  revision: "1.0",

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
      icon: "ladder-inspection" as any,
      tone: "mandatory",
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
      icon: "ladder-select" as any,
      tone: "mandatory",
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
      icon: "ladder-ground" as any,
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Doğru Açı ve Sabitleme",
        en: "Correct Angle and Securing",
      },
      items: {
        tr: [
          "Dayamalı merdivenlerde yaklaşık 4:1 yerleşim oranını uygula.",
          "Üst ve alt noktayı mümkün olduğunda sabitle.",
          "Merdivenin hareket etmeyeceğinden emin ol.",
        ],
        en: [
          "Use approximately a 4:1 setup ratio for leaning ladders.",
          "Secure the top and bottom whenever practicable.",
          "Ensure the ladder cannot move during use.",
        ],
      },
      icon: "ladder-angle" as any,
      tone: "mandatory",
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
          "Her zaman üç nokta temasını koru.",
          "Elleri serbest bırakmak için alet çantası veya uygun taşıma yöntemi kullan.",
        ],
        en: [
          "Face the ladder while ascending and descending.",
          "Maintain three points of contact at all times.",
          "Use a tool belt or suitable method to keep hands free while climbing.",
        ],
      },
      icon: "ladder-contact" as any,
      tone: "mandatory",
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
      icon: "ladder-overreach" as any,
      tone: "mandatory",
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
      icon: "ladder-barricade" as any,
      tone: "mandatory",
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
      icon: "ladder-stop" as any,
      tone: "mandatory",
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
