import type { PosterDefinition } from "./types";

export const droppedObjectsSafetyPoster: PosterDefinition = {
  code: "SRN-DO-001",
  revision: "1.0",
  title: {
    tr: "Düşen Cisim Kritik Güvenlik Kuralları",
    en: "Dropped Objects Critical Safety Rules",
  },
  slogan: {
    tr: "SABİTLE • ALT ALANI İZOLE ET • MALZEMEYİ KORU • DÜŞME RİSKİNİ ÖNLE",
    en: "SECURE • ISOLATE BELOW • CONTROL MATERIALS • PREVENT DROPPED OBJECTS",
  },
  rules: [
    {
      number: "01",
      title: {
        tr: "Düşebilecek Her Şeyi Belirle",
        en: "Identify Drop Hazards",
      },
      items: {
        tr: ["Alet, malzeme ve gevşek parçaları işe başlamadan belirle.", "Üst seviyelerdeki açıklıkları kontrol et.", "Rüzgar ve titreşim etkisini değerlendir."],
        en: ["Identify tools, materials and loose items before starting.", "Check openings and edges at elevated levels.", "Consider wind and vibration effects."],
      },
      icon: "do-identify" as any,
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Aletleri Sabitle",
        en: "Secure Tools",
      },
      items: {
        tr: ["Uygun olduğunda onaylı tether sistemi kullan.", "Tether bağlantı noktalarını kontrol et.", "Hasarlı tether veya bağlantı kullanma."],
        en: ["Use approved tethering systems where appropriate.", "Inspect tether attachment points.", "Do not use damaged tethers or connectors."],
      },
      icon: "do-tether" as any,
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Malzemeyi Sabitle",
        en: "Secure Materials",
      },
      items: {
        tr: ["Gevşek malzemeyi kenarlardan uzak tut.", "Malzemeyi devrilmeye veya yuvarlanmaya karşı koru.", "Küçük parçaları uygun kaplarda tut."],
        en: ["Keep loose materials away from edges.", "Prevent materials from tipping or rolling.", "Store small parts in suitable containers."],
      },
      icon: "do-material" as any,
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Alt Alanı İzole Et",
        en: "Barricade the Area Below",
      },
      items: {
        tr: ["Düşme hattının altında exclusion zone oluştur.", "Bariyer ve uyarıları görünür tut.", "Yetkisiz girişe izin verme."],
        en: ["Establish an exclusion zone beneath the drop line.", "Keep barricades and warnings visible.", "Prevent unauthorized entry."],
      },
      icon: "do-barricade" as any,
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Güvenli Taşı",
        en: "Transfer Materials Safely",
      },
      items: {
        tr: ["Malzemeyi elden ele kontrolsüz atma.", "Uygun kaldırma veya taşıma yöntemi kullan.", "Yüksekten malzeme bırakma."],
        en: ["Do not throw materials between levels.", "Use suitable lifting or transfer methods.", "Never drop materials from height."],
      },
      icon: "do-transfer" as any,
      tone: "mandatory",
    },
    {
      number: "06",
      title: {
        tr: "Açıklıkları Koru",
        en: "Protect Openings",
      },
      items: {
        tr: ["Toe board, mesh veya uygun düşen cisim koruması kullan.", "Platform açıklıklarını kontrol et.", "Koruma kaldırıldıysa alanı hemen izole et."],
        en: ["Use toe boards, mesh or suitable falling-object protection.", "Control platform openings.", "Immediately isolate the area if protection is removed."],
      },
      icon: "do-toeboard" as any,
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Baş Üstü Çalışmayı Koordine Et",
        en: "Coordinate Overhead Work",
      },
      items: {
        tr: ["Üst ve alt ekipler arasında iletişim kur.", "Simultane iş risklerini değerlendir.", "Alt seviyede personel varsa çalışmayı kontrol et."],
        en: ["Maintain communication between upper and lower work teams.", "Assess simultaneous-work risks.", "Control work when personnel are below."],
      },
      icon: "do-overhead" as any,
      tone: "mandatory",
    },
    {
      number: "08",
      title: {
        tr: "İş Bitiminde Kontrol Et",
        en: "Final Area Check",
      },
      items: {
        tr: ["Platformda gevşek alet veya malzeme bırakma.", "Kullanılmayan ekipmanı aşağı indir.", "Bariyeri yalnızca risk tamamen kalkınca kaldır."],
        en: ["Do not leave loose tools or materials on platforms.", "Lower unused equipment safely.", "Remove barricades only after the hazard is fully eliminated."],
      },
      icon: "do-final" as any,
      tone: "mandatory",
    }
  ],
  never: {
    tr: ["ALT ALAN İZOLE EDİLMEDEN DÜŞEN CİSİM RİSKLİ İŞ YAPMA", "ALETLERİ VE MALZEMEYİ KENARDA KORUMASIZ BIRAKMA", "YÜKSEKTEN MALZEME ATMA", "HASARLI TETHER KULLANMA", "ALTTA PERSONEL VARKEN KONTROLSÜZ ÜST İŞ YAPMA"],
    en: ["NEVER WORK ABOVE WITHOUT CONTROLLING THE AREA BELOW", "NEVER LEAVE TOOLS OR MATERIALS UNSECURED AT EDGES", "NEVER THROW MATERIALS FROM HEIGHT", "NEVER USE DAMAGED TETHERS", "NEVER PERFORM UNCONTROLLED OVERHEAD WORK ABOVE PEOPLE"],
  },
  ppe: {
    tr: ["Çene Bağlı Baret", "Koruyucu Gözlük", "İş Eldiveni", "Emniyet Ayakkabısı", "Reflektif Yelek"],
    en: ["Chin-Strap Helmet", "Safety Glasses", "Work Gloves", "Safety Footwear", "High-Visibility Vest"],
  },
};
