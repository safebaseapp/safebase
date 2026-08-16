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
      icon: "exc-service" as any,
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
      icon: "exc-inspect" as any,
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Göçüğe Karşı Koru",
        en: "Protect Against Cave-In",
      },
      items: {
        tr: ["Toprak sınıfına ve derinliğe uygun koruma kullan.", "Şev, iksa veya koruyucu sistemleri projeye uygun uygula.", "Koruma sistemi dışında çalışma yapma."],
        en: ["Use protection appropriate to soil conditions and depth.", "Apply sloping, shoring or shielding as designed.", "Do not work outside the protective system."],
      },
      icon: "exc-shield" as any,
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Spoil Pile Mesafesini Koru",
        en: "Control Spoil Piles",
      },
      items: {
        tr: ["Kazı malzemesini kenardan güvenli mesafede tut.", "Malzemenin kazıya geri düşmesini önle.", "Ekipman yüklerini kazı kenarından uzak tut."],
        en: ["Keep excavated material a safe distance from the edge.", "Prevent material from falling back into the excavation.", "Keep equipment loads away from excavation edges."],
      },
      icon: "exc-spoil" as any,
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Güvenli Erişim Sağla",
        en: "Provide Safe Access",
      },
      items: {
        tr: ["Gerekli derinlikte merdiven, rampa veya güvenli erişim sağla.", "Erişimi çalışma noktasına yakın konumlandır.", "Hasarlı erişim ekipmanı kullanma."],
        en: ["Provide a ladder, ramp or safe means of access where required.", "Position access close to the work location.", "Do not use damaged access equipment."],
      },
      icon: "exc-access" as any,
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
      icon: "exc-water" as any,
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
      icon: "exc-barrier" as any,
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
      icon: "exc-atmosphere" as any,
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
