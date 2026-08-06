import type { PosterDefinition } from "./types";

export const electricalPoster: PosterDefinition = {
  code: "SB-EL-001",
  revision: "1.0",

  title: {
    tr: "Elektrik Kritik Güvenlik Kuralları",
    en: "Electrical Critical Safety Rules",
  },

  slogan: {
    tr: "Enerjiyi Kes • Kilitle • Gerilimsizliği Doğrula",
    en: "De-Energize • Lock Out • Verify Absence of Voltage",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Enerjiyi Kes",
        en: "De-Energize",
      },
      items: {
        tr: [
          "Çalışmadan önce tüm elektrik kaynaklarını belirle.",
          "Mümkün olan her durumda ekipmanı enerjisiz bırak.",
          "Kumanda düğmesini enerji izolasyonu olarak kabul etme.",
        ],
        en: [
          "Identify every electrical energy source before work.",
          "De-energize equipment whenever work can be performed safely without power.",
          "Never treat a control switch as an energy-isolating device.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "LOTO Uygula",
        en: "Apply LOTO",
      },
      items: {
        tr: [
          "Ayırma cihazlarını kilitle ve etiketle.",
          "Her çalışan kendi kişisel kilidini uygulasın.",
          "Yeniden enerjilenmeyi prosedüre göre kontrol et.",
        ],
        en: [
          "Lock and tag all electrical isolating devices.",
          "Each authorized worker must apply a personal lock.",
          "Control re-energization in accordance with the approved procedure.",
        ],
      },
      icon: "anchor",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Gerilimsizliği Doğrula",
        en: "Verify De-Energization",
      },
      items: {
        tr: [
          "Uygun ve çalışır durumdaki ölçü cihazını kullan.",
          "Ölçü cihazını test öncesi ve sonrası bilinen kaynakta doğrula.",
          "Tüm fazlar ve iletkenlerde gerilim olmadığını kontrol et.",
        ],
        en: [
          "Use a suitable and properly functioning test instrument.",
          "Verify the tester on a known source before and after testing.",
          "Confirm absence of voltage on every phase and conductor.",
        ],
      },
      icon: "weather",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Yetkili Personel",
        en: "Qualified Persons Only",
      },
      items: {
        tr: [
          "Elektrik işi yalnızca eğitimli ve yetkili personelce yapılsın.",
          "Gerilimli devrelerde test ve çalışma yetkisiz kişilere yasaktır.",
          "Görev, ekipman ve tehlikeye uygun yeterliliği doğrula.",
        ],
        en: [
          "Electrical work must be performed by trained and qualified persons.",
          "Only qualified persons may test or work on exposed energized parts.",
          "Verify competence for the task, equipment and hazards involved.",
        ],
      },
      icon: "training",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Ekipmanı Kontrol Et",
        en: "Inspect Equipment",
      },
      items: {
        tr: [
          "Kablo, fiş, priz, pano ve el aletlerini kullanmadan önce kontrol et.",
          "Hasarlı izolasyon veya açık iletken bulunan ekipmanı kullanma.",
          "Arızalı ekipmanı etiketle ve derhal hizmet dışı bırak.",
        ],
        en: [
          "Inspect cords, plugs, receptacles, panels and tools before use.",
          "Never use equipment with damaged insulation or exposed conductors.",
          "Tag defective equipment and remove it from service immediately.",
        ],
      },
      icon: "equipment",
      tone: "warning",
    },
    {
      number: "06",
      title: {
        tr: "Kaçak Akım Koruması",
        en: "Ground-Fault Protection",
      },
      items: {
        tr: [
          "Gerekli alanlarda uygun GFCI veya RCD koruması kullan.",
          "Topraklama iletkeni ve koruma cihazlarını kontrol et.",
          "Koruma cihazlarını devre dışı bırakma veya köprüleme.",
        ],
        en: [
          "Use suitable GFCI or RCD protection where required.",
          "Verify grounding conductors and protective devices.",
          "Never bypass or defeat electrical protective devices.",
        ],
      },
      icon: "guardrail",
      tone: "warning",
    },
    {
      number: "07",
      title: {
        tr: "Alanı Koru",
        en: "Control the Work Area",
      },
      items: {
        tr: [
          "Açık pano ve elektrik tehlikelerini bariyerle.",
          "Yetkisiz kişileri yaklaşma sınırlarının dışında tut.",
          "Çalışma alanını kuru, düzenli ve yeterli aydınlatılmış tut.",
        ],
        en: [
          "Barricade open panels and exposed electrical hazards.",
          "Keep unauthorized persons outside established approach boundaries.",
          "Maintain a dry, orderly and adequately illuminated work area.",
        ],
      },
      icon: "guardrail",
      tone: "warning",
    },
    {
      number: "08",
      title: {
        tr: "Enerjili Çalışma Kontrolü",
        en: "Energized Work Controls",
      },
      items: {
        tr: [
          "Enerjili çalışmayı yalnızca teknik olarak zorunluysa değerlendir.",
          "Onay, risk değerlendirmesi ve uygun iş yöntemini doğrula.",
          "Ark parlaması ve elektrik çarpmasına uygun KKD ve ekipman kullan.",
        ],
        en: [
          "Consider energized work only when technically justified.",
          "Verify authorization, risk assessment and an approved work method.",
          "Use PPE and equipment suitable for shock and arc-flash hazards.",
        ],
      },
      icon: "fall",
      tone: "information",
    },
  ],

  never: {
    tr: [
      "Enerji izolasyonu ve LOTO uygulanmadıysa işi hemen durdur",
      "Gerilimsizlik uygun cihazla doğrulanmadıysa işi durdur",
      "Açık gerilimli bölümler korunmamış veya bariyerlenmemişse işi durdur",
      "Kablo, fiş, pano veya ekipman hasarlıysa işi durdur",
      "Yetkili personel, uygun iş yöntemi veya gerekli KKD yoksa işi durdur",
    ],
    en: [
      "Stop work immediately if electrical isolation and LOTO are not applied",
      "Stop work if absence of voltage has not been properly verified",
      "Stop work if exposed energized parts are not guarded or barricaded",
      "Stop work if cords, plugs, panels or equipment are damaged",
      "Stop work if qualified personnel, an approved method or required PPE are unavailable",
    ],
  },

  ppe: {
    tr: [
      "Baret",
      "Koruyucu Gözlük",
      "Yalıtkan Eldiven",
      "Güvenlik Ayakkabısı",
      "Ark Korumalı Giysi",
    ],
    en: [
      "Safety Helmet",
      "Safety Glasses",
      "Voltage-Rated Gloves",
      "Safety Footwear",
      "Arc-Rated Clothing",
    ],
  },
};
