import type { PosterDefinition } from "./types";

export const housekeepingSafetyPoster: PosterDefinition = {
  code: "SRN-HSK-001",
  revision: "1.0",
  title: {
    tr: "Housekeeping Kritik Güvenlik Kuralları",
    en: "Housekeeping Critical Safety Rules",
  },
  slogan: {
    tr: "TEMİZLE • DÜZENLE • GEÇİŞİ AÇIK TUT • RİSKİ HEMEN GİDER",
    en: "CLEAN • ORGANIZE • KEEP ACCESS CLEAR • REMOVE HAZARDS",
  },
  rules: [
    {
      number: "01",
      title: {
        tr: "Alanı Düzenli Tut",
        en: "Keep the Area Orderly",
      },
      items: {
        tr: ["Malzeme ve ekipmanı belirlenmiş yerlerde tut.", "Geçiş yollarında gereksiz malzeme bırakma.", "İş bitiminde alanı düzenle."],
        en: ["Store materials and equipment in designated locations.", "Keep unnecessary materials out of access routes.", "Restore the work area after the task."],
      },
      icon: "hsk-clean" as any,
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Geçiş Yollarını Açık Tut",
        en: "Keep Access Routes Clear",
      },
      items: {
        tr: ["Yürüme yollarını, kapıları ve acil çıkışları açık tut.", "Kablo ve hortumları geçiş yollarından kaldır veya koru.", "Erişimi hiçbir zaman depolama alanı olarak kullanma."],
        en: ["Keep walkways, doors and emergency exits clear.", "Route or protect cables and hoses crossing access ways.", "Never use access routes as storage areas."],
      },
      icon: "hsk-walkway" as any,
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Dökülmeleri Hemen Temizle",
        en: "Clean Spills Immediately",
      },
      items: {
        tr: ["Yağ, su ve kimyasal dökülmelerini gecikmeden kontrol altına al.", "Alanı temizlenene kadar işaretle veya bariyerle.", "Uygun absorban ve atık yöntemini kullan."],
        en: ["Control oil, water and chemical spills without delay.", "Mark or barricade the area until it is safe.", "Use suitable absorbents and disposal methods."],
      },
      icon: "hsk-spill" as any,
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Atıkları Doğru Yönet",
        en: "Manage Waste Correctly",
      },
      items: {
        tr: ["Atıkları uygun ve etiketli kaplara koy.", "Yanıcı ve tehlikeli atıkları ayrı yönet.", "Kutuların taşmasını önle."],
        en: ["Place waste in suitable labelled containers.", "Segregate flammable and hazardous waste.", "Prevent waste containers from overflowing."],
      },
      icon: "hsk-bin" as any,
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Takılma Risklerini Kaldır",
        en: "Remove Trip Hazards",
      },
      items: {
        tr: ["Kablo, hortum, ambalaj ve parçaları zeminde bırakma.", "Bozuk zemin ve seviye farklarını bildir.", "Geçici riskleri görünür şekilde işaretle."],
        en: ["Do not leave cables, hoses, packaging or parts on the floor.", "Report damaged floors and level changes.", "Clearly mark temporary hazards."],
      },
      icon: "hsk-trip" as any,
      tone: "mandatory",
    },
    {
      number: "06",
      title: {
        tr: "Malzemeyi Güvenli İstifle",
        en: "Stack Materials Safely",
      },
      items: {
        tr: ["İstifleri dengeli ve devrilmeyecek şekilde kur.", "Ağır malzemeyi mümkün olduğunca alt seviyede tut.", "İstif yüksekliği ve kapasite kurallarına uy."],
        en: ["Build stable stacks that cannot collapse.", "Keep heavier materials at lower levels where practicable.", "Follow stacking-height and capacity requirements."],
      },
      icon: "hsk-stack" as any,
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Acil Ekipmanı Kapatma",
        en: "Keep Emergency Equipment Clear",
      },
      items: {
        tr: ["Yangın ekipmanı ve ilk yardım erişimini engelleme.", "Elektrik panoları ve izolasyon noktalarının önünü açık tut.", "Acil ekipman çevresinde malzeme depolama."],
        en: ["Do not obstruct fire or first-aid equipment.", "Keep electrical panels and isolation points accessible.", "Do not store materials around emergency equipment."],
      },
      icon: "hsk-emergency" as any,
      tone: "mandatory",
    },
    {
      number: "08",
      title: {
        tr: "Güvensiz Alanı Düzelt",
        en: "Correct Unsafe Conditions",
      },
      items: {
        tr: ["Gördüğün housekeeping riskini mümkünse hemen gider.", "Gideremiyorsan alanı koru ve bildir.", "Aynı uygunsuzluğun tekrarını önle."],
        en: ["Correct housekeeping hazards immediately where possible.", "If you cannot correct the hazard, protect the area and report it.", "Prevent recurrence of the same condition."],
      },
      icon: "hsk-stop" as any,
      tone: "mandatory",
    }
  ],
  never: {
    tr: ["ACİL ÇIKIŞLARI VE GEÇİŞ YOLLARINI KAPATMA", "DÖKÜLMEYİ KORUMASIZ BIRAKMA", "GELİŞİGÜZEL MALZEME VE ATIK İSTİFLEME", "YANGIN VE ACİL EKİPMAN ERİŞİMİNİ ENGELLEME", "TAKILMA RİSKİNİ GÖRMEZDEN GELME"],
    en: ["NEVER BLOCK EMERGENCY EXITS OR ACCESS ROUTES", "NEVER LEAVE A SPILL UNCONTROLLED", "NEVER STORE MATERIALS OR WASTE RANDOMLY", "NEVER OBSTRUCT FIRE OR EMERGENCY EQUIPMENT", "NEVER IGNORE A TRIP HAZARD"],
  },
  ppe: {
    tr: ["Baret", "Koruyucu Gözlük", "İş Eldiveni", "Kaymaz İş Ayakkabısı", "Reflektif Yelek"],
    en: ["Safety Helmet", "Safety Glasses", "Work Gloves", "Slip-Resistant Safety Footwear", "High-Visibility Vest"],
  },
};
