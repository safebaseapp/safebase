import type { PosterDefinition } from "./types";

export const excavationSafetyPoster: PosterDefinition = {
  code: "SRN-EXC-001",
  revision: "1.0",
  title: {
    tr: "Kazı Kritik Güvenlik Kuralları",
    en: "Excavation Critical Safety Rules",
  },
  slogan: {
    tr: "HATLARI BELİRLE • KAZIYI KORU • GÜVENLİ ERİŞİM SAĞLA • HER GÜN KONTROL ET",
    en: "LOCATE SERVICES • PROTECT THE EXCAVATION • PROVIDE SAFE ACCESS • INSPECT DAILY",
  },
  rules: [
    {
      number: "01",
      title: {
        tr: "Yeraltı Hatlarını Belirle",
        en: "Locate Underground Services",
      },
      items: {
        tr: ["Kazıdan önce mevcut yeraltı hatlarını belirle.", "Gerekli izin ve çizimleri doğrula.", "Şüpheli bölgelerde kontrollü kazı yöntemi kullan."],
        en: ["Locate existing underground services before excavation.", "Verify required permits and drawings.", "Use controlled excavation methods in uncertain areas."],
      },
      icon: "exc-service",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Yetkin Kişi Kontrolü",
        en: "Competent-Person Inspection",
      },
      items: {
        tr: ["Kazıyı işe başlamadan önce kontrol ettir.", "Yağmur, titreşim veya koşul değişiminden sonra tekrar kontrol et.", "Tehlikeli koşul varsa girişe izin verme."],
        en: ["Inspect the excavation before work starts.", "Reinspect after rain, vibration or changing conditions.", "Do not permit entry when hazardous conditions exist."],
      },
      icon: "exc-inspect",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Göçüğe Karşı Koru",
        en: "Protect Against Cave-In",
      },
      items: {
        tr: [
          "OSHA: kazı çalışanını göçükten koru. İstisna: tamamen stabil kaya veya aşağıdaki koşul.",
          "Derinlik <5 ft (1,52 m) ise korumasızlık ancak yetkin kişi incelemesinde göçük belirtisi yoksa mümkündür.",
          "Toprak ve derinliğe uygun şev, iksa veya kalkan kullan; koruma sistemi dışında çalışma.",
        ],
        en: [
          "OSHA: protect excavation workers from cave-ins, except excavations entirely in stable rock or the condition below.",
          "At <5 ft (1.52 m), protection may be omitted only if a competent person finds no indication of a potential cave-in.",
          "Use soil/depth-appropriate sloping, shoring or shielding; do not work outside the protective system.",
        ],
      },
      icon: "exc-shield",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Kazı Malzemesini Güvenli Mesafede Tut",
        en: "Control Spoil Piles",
      },
      items: {
        tr: [
          "OSHA: kazı malzemesi ve düşebilecek ekipmanı kenardan en az 2 ft (0,61 m) uzak tut.",
          "Alternatif olarak yeterli tutucu düzenekle kazıya düşme veya yuvarlanmayı önle; gerekirse ikisini uygula.",
          "Ekipman sürşarj yüklerini değerlendir; yalnız mesafe bırakmak göçük riskini ortadan kaldırmaz.",
        ],
        en: [
          "OSHA: keep spoil and equipment that could fall at least 2 ft (0.61 m) from the edge.",
          "Alternatively use adequate retaining devices to prevent falling or rolling in, or use both measures.",
          "Assess equipment surcharge loads; setback alone does not eliminate cave-in hazards.",
        ],
      },
      icon: "exc-spoil",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Güvenli Erişim Sağla",
        en: "Provide Safe Access",
      },
      items: {
        tr: [
          "OSHA hendek derinliği ≥4 ft (1,22 m): merdiven, basamaklı geçiş, rampa veya güvenli çıkış sağla.",
          "Çıkışa ulaşmak için yatay hareket mesafesi en fazla 25 ft (7,62 m) olsun.",
          "Erişimi açık tut; hasarlı erişim ekipmanı kullanma.",
        ],
        en: [
          "OSHA trenches ≥4 ft (1.22 m) deep require stairs, ladders, ramps or another safe means of egress.",
          "Locate egress so workers need no more than 25 ft (7.62 m) of lateral travel.",
          "Keep access clear; do not use damaged access equipment.",
        ],
      },
      icon: "exc-access",
      tone: "mandatory",
    },
    {
      number: "06",
      title: {
        tr: "Su Birikmesini Kontrol Et",
        en: "Control Water Accumulation",
      },
      items: {
        tr: ["Su bulunan kazıya kontrolsüz giriş yapma.", "Pompalama ve drenaj yöntemlerini güvenli uygula.", "Yağış sonrası koşulları yeniden değerlendir."],
        en: ["Do not enter excavations with uncontrolled water accumulation.", "Use pumping and drainage methods safely.", "Reassess conditions after rainfall."],
      },
      icon: "exc-water",
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Kenarları ve Trafiği Koru",
        en: "Protect Edges and Traffic",
      },
      items: {
        tr: ["Araç ve yaya trafiğine açık alanları bariyerle.", "Gerekli yerlerde stop block veya uyarı sistemi kullan.", "Gece görünürlüğünü sağla."],
        en: ["Barricade excavations exposed to vehicle or pedestrian traffic.", "Use stop blocks or warning systems where required.", "Maintain visibility during night work."],
      },
      icon: "exc-barrier",
      tone: "mandatory",
    },
    {
      number: "08",
      title: {
        tr: "Atmosfer Riskini Değerlendir",
        en: "Assess Atmospheric Hazards",
      },
      items: {
        tr: ["Tehlikeli atmosfer ihtimali varsa test yap.", "Gerekirse havalandırma ve kurtarma tedbirleri uygula.", "Alarm veya tehlike halinde kazıyı tahliye et."],
        en: ["Test where a hazardous atmosphere could reasonably exist.", "Provide ventilation and rescue controls when required.", "Evacuate the excavation if alarms or hazardous conditions occur."],
      },
      icon: "exc-atmosphere",
      tone: "mandatory",
    }
  ],
  never: {
    tr: ["KORUMASIZ GÖÇÜK RİSKİ OLAN KAZIYA GİRME", "YERALTI HATLARINI DOĞRULAMADAN KAZIYA BAŞLAMA", "KAZI KENARINDA KONTROLSÜZ MALZEME BIRAKMA", "GÜVENSİZ ERİŞİMLE KAZIYA GİRME", "YETKİN KİŞİ ONAYI OLMADAN TEHLİKELİ KAZIDA ÇALIŞMA"],
    en: ["NEVER ENTER AN UNPROTECTED CAVE-IN HAZARD", "NEVER EXCAVATE BEFORE VERIFYING UNDERGROUND SERVICES", "NEVER LEAVE UNCONTROLLED MATERIAL AT THE EDGE", "NEVER ENTER USING UNSAFE ACCESS", "NEVER WORK IN A HAZARDOUS EXCAVATION WITHOUT COMPETENT-PERSON APPROVAL"],
  },
  ppe: {
    tr: ["Baret", "Koruyucu Gözlük", "İş Eldiveni", "Emniyet Ayakkabısı", "Reflektif Yelek"],
    en: ["Safety Helmet", "Safety Glasses", "Work Gloves", "Safety Footwear", "High-Visibility Vest"],
  },
};
