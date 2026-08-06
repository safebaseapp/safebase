import type { PosterDefinition } from "./types";

export const ppePoster: PosterDefinition = {
  code: "SB-PPE-001",
  revision: "1.0",

  title: {
    tr: "Zorunlu KKD Kritik Güvenlik Kuralları",
    en: "Mandatory PPE Critical Safety Rules",
  },

  slogan: {
    tr: "Tehlikeyi Değerlendir • Doğru KKD'yi Seç • Her Zaman Kullan",
    en: "Assess the Hazard • Select Correct PPE • Wear It Every Time",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Tehlikeleri Değerlendir",
        en: "Assess the Hazards",
      },
      items: {
        tr: [
          "İşe başlamadan önce tehlike ve maruziyetleri belirle.",
          "KKD seçimini risk değerlendirmesine göre yap.",
          "Koşullar değişirse KKD gerekliliklerini yeniden değerlendir.",
        ],
        en: [
          "Identify hazards and exposures before starting work.",
          "Select PPE according to the risk assessment.",
          "Reassess PPE requirements whenever conditions change.",
        ],
      },
      icon: "training",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Zorunlu Alan İşaretlerini Takip Et",
        en: "Follow Mandatory PPE Signs",
      },
      items: {
        tr: [
          "Çalışma alanındaki zorunlu KKD levhalarını kontrol et.",
          "Belirlenen KKD olmadan kontrollü alana girme.",
          "Saha ve müşteri kurallarındaki ek gereklilikleri uygula.",
        ],
        en: [
          "Check mandatory PPE signs at the work area.",
          "Do not enter controlled areas without designated PPE.",
          "Follow additional site and client requirements.",
        ],
      },
      icon: "guardrail",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Doğru KKD'yi Seç",
        en: "Select the Correct PPE",
      },
      items: {
        tr: [
          "KKD'nin tehlikeye ve yapılan işe uygun olduğunu doğrula.",
          "Ürün standardını, koruma sınıfını ve kullanım sınırlarını kontrol et.",
          "Birlikte kullanılan KKD'lerin birbiriyle uyumlu olmasını sağla.",
        ],
        en: [
          "Verify that PPE is suitable for the hazard and task.",
          "Check the product standard, protection class and limitations.",
          "Ensure multiple PPE items remain compatible when worn together.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Doğru Beden ve Ayar",
        en: "Correct Fit and Adjustment",
      },
      items: {
        tr: [
          "KKD'nin kullanıcıya uygun beden ve ölçüde olmasını sağla.",
          "Kayış, toka ve ayar noktalarını doğru şekilde ayarla.",
          "Gevşek, aşırı sıkı veya korumayı bozan KKD kullanma.",
        ],
        en: [
          "Ensure PPE is the correct size for the user.",
          "Adjust straps, buckles and fitting points correctly.",
          "Do not use loose, excessively tight or ineffective PPE.",
        ],
      },
      icon: "harness",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Kullanmadan Önce Kontrol Et",
        en: "Inspect Before Use",
      },
      items: {
        tr: [
          "Her kullanımdan önce çatlak, yırtık, deformasyon ve aşınmayı kontrol et.",
          "Etiket, son kullanım tarihi ve kontrol durumunu doğrula.",
          "Hasarlı veya koruma özelliği şüpheli KKD'yi kullanma.",
        ],
        en: [
          "Check for cracks, tears, deformation and wear before every use.",
          "Verify labels, expiry dates and inspection status.",
          "Do not use damaged PPE or equipment with doubtful protection.",
        ],
      },
      icon: "equipment",
      tone: "warning",
    },
    {
      number: "06",
      title: {
        tr: "Doğru Şekilde Kullan",
        en: "Wear PPE Correctly",
      },
      items: {
        tr: [
          "KKD'yi üretici talimatına ve eğitime uygun şekilde kullan.",
          "Koruyucu parçaları çıkarma, değiştirme veya devre dışı bırakma.",
          "Tehlikeli alanda KKD'yi izinsiz çıkarma.",
        ],
        en: [
          "Use PPE according to training and manufacturer instructions.",
          "Do not remove, modify or defeat protective components.",
          "Do not remove required PPE inside hazardous areas.",
        ],
      },
      icon: "training",
      tone: "warning",
    },
    {
      number: "07",
      title: {
        tr: "Temizle ve Güvenli Sakla",
        en: "Clean and Store Safely",
      },
      items: {
        tr: [
          "KKD'yi kullanım sonrası uygun yöntemle temizle.",
          "Güneş, ısı, kimyasal ve fiziksel hasardan koruyarak sakla.",
          "Ortak kullanılan KKD'yi hijyenik şekilde dezenfekte et.",
        ],
        en: [
          "Clean PPE using an approved method after use.",
          "Store it away from sunlight, heat, chemicals and physical damage.",
          "Disinfect shared PPE using a hygienic procedure.",
        ],
      },
      icon: "weather",
      tone: "warning",
    },
    {
      number: "08",
      title: {
        tr: "Hasarlı KKD'yi Değiştir",
        en: "Replace Defective PPE",
      },
      items: {
        tr: [
          "Hasarlı veya kullanım ömrü dolmuş KKD'yi derhal hizmet dışı bırak.",
          "Darbe, kimyasal temas veya olay sonrası yeniden değerlendir.",
          "Yetkisiz tamir veya geçici çözüm uygulama.",
        ],
        en: [
          "Remove damaged or expired PPE from service immediately.",
          "Reassess PPE after impact, chemical contact or an incident.",
          "Do not perform unauthorized repairs or temporary fixes.",
        ],
      },
      icon: "fall",
      tone: "information",
    },
  ],

  never: {
    tr: [
      "Risk değerlendirmesinde belirlenen zorunlu KKD mevcut değilse işi hemen durdur",
      "KKD hasarlı, uyumsuz veya göreve uygun değilse işi durdur",
      "Zorunlu KKD olmadan kontrollü veya tehlikeli alana girme",
      "KKD'nin koruyucu parçalarını çıkarma, değiştirme veya devre dışı bırakma",
      "Eğitim, uygun beden veya gerekli özel test tamamlanmamışsa KKD'yi kullanma",
    ],
    en: [
      "Stop work immediately if required PPE identified by the risk assessment is unavailable",
      "Stop work if PPE is damaged, incompatible or unsuitable for the task",
      "Do not enter controlled or hazardous areas without mandatory PPE",
      "Never remove, modify or defeat protective PPE components",
      "Do not use PPE without training, correct fitting or required specialist testing",
    ],
  },

  ppe: {
    tr: [
      "Baret",
      "Koruyucu Gözlük",
      "İş Eldiveni",
      "Güvenlik Ayakkabısı",
      "Yüksek Görünürlüklü Giysi",
    ],
    en: [
      "Safety Helmet",
      "Safety Glasses",
      "Work Gloves",
      "Safety Footwear",
      "High-Visibility Clothing",
    ],
  },
};
