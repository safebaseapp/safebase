import type { SafetyGuide } from "../../components/GuideTemplate";

export const chemicalSafetyGuide: SafetyGuide = {
  slug: "chemical-safety",

  category: {
    en: "Chemical Safety",
    tr: "Kimyasal Güvenliği",
  },

  title: {
    en: "Chemical Safety",
    tr: "Kimyasal Güvenliği",
  },

  description: {
    en: "Professional guidance for the safe handling, storage, transportation and emergency response of hazardous chemicals.",
    tr: "Tehlikeli kimyasalların güvenli kullanımı, depolanması, taşınması ve acil durum müdahalesi için profesyonel rehber.",
  },

  overview: {
    en: "Hazardous chemicals may cause poisoning, burns, respiratory illness, fire, explosion and environmental contamination. Every chemical must be identified, risk assessed and handled according to its Safety Data Sheet (SDS), labeling requirements and workplace procedures.",
    tr: "Tehlikeli kimyasallar zehirlenme, yanık, solunum hastalıkları, yangın, patlama ve çevre kirliliğine neden olabilir. Her kimyasal tanımlanmalı, risk değerlendirmesi yapılmalı ve Güvenlik Bilgi Formu (SDS), etiketleme kuralları ve iş yeri prosedürlerine uygun olarak kullanılmalıdır.",
  },

  readTime: 10,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA / GHS",

  hazards: {
    en: [
      "Toxic exposure",
      "Chemical burns",
      "Skin and eye irritation",
      "Respiratory hazards",
      "Fire and explosion",
      "Chemical reactions",
      "Environmental contamination",
      "Incorrect storage of incompatible chemicals",
      "Chemical spills",
      "Pressurized containers",
    ],
    tr: [
      "Zehirli maruziyet",
      "Kimyasal yanıklar",
      "Cilt ve göz tahrişi",
      "Solunum tehlikeleri",
      "Yangın ve patlama",
      "Kimyasal reaksiyonlar",
      "Çevre kirliliği",
      "Uyumsuz kimyasalların birlikte depolanması",
      "Kimyasal dökülmeleri",
      "Basınçlı kaplar",
    ],
  },

  requiredPPE: {
    en: [
      "Chemical-resistant gloves",
      "Chemical splash goggles",
      "Face shield where required",
      "Chemical-resistant clothing",
      "Safety footwear",
      "Respiratory protection when required by the risk assessment",
    ],
    tr: [
      "Kimyasala dayanıklı eldiven",
      "Kimyasal sıçramaya dayanıklı gözlük",
      "Gerekli durumlarda yüz siperi",
      "Kimyasala dayanıklı koruyucu kıyafet",
      "İş güvenliği ayakkabısı",
      "Risk değerlendirmesi gerektiriyorsa solunum koruyucu",
    ],
  },

  controls: {
    en: [
      "Read the Safety Data Sheet before using any chemical.",
      "Ensure all containers are correctly labeled.",
      "Store incompatible chemicals separately.",
      "Use approved storage cabinets for flammable substances.",
      "Provide adequate ventilation.",
      "Inspect containers for leaks or damage.",
      "Use secondary containment where required.",
      "Never mix chemicals unless authorized.",
      "Maintain emergency showers and eyewash stations.",
      "Dispose of chemical waste according to regulations.",
      "Train employees on chemical hazards and emergency procedures.",
      "Report spills immediately.",
    ],
    tr: [
      "Herhangi bir kimyasalı kullanmadan önce Güvenlik Bilgi Formunu (SDS) okuyun.",
      "Tüm kapların doğru şekilde etiketlendiğinden emin olun.",
      "Uyumsuz kimyasalları ayrı depolayın.",
      "Yanıcı maddeleri onaylı dolaplarda saklayın.",
      "Yeterli havalandırma sağlayın.",
      "Kapları sızıntı ve hasar açısından kontrol edin.",
      "Gerekli durumlarda ikincil sızıntı koruması kullanın.",
      "Yetki olmadan kimyasalları karıştırmayın.",
      "Acil duş ve göz yıkama istasyonlarını hazır bulundurun.",
      "Kimyasal atıkları mevzuata uygun şekilde bertaraf edin.",
      "Çalışanlara kimyasal tehlikeleri ve acil durum prosedürleri konusunda eğitim verin.",
      "Dökülmeleri derhal bildirin.",
    ],
  },

  commonMistakes: {
    en: [
      "Using chemicals without reading the SDS",
      "Removing labels from containers",
      "Mixing incompatible chemicals",
      "Improper storage",
      "Ignoring PPE requirements",
      "Using damaged containers",
      "Poor housekeeping",
      "Blocking emergency showers or eyewash stations",
      "Improper waste disposal",
      "Failing to report spills",
    ],
    tr: [
      "SDS okumadan kimyasal kullanmak",
      "Kap etiketlerini çıkarmak",
      "Uyumsuz kimyasalları karıştırmak",
      "Yanlış depolama yapmak",
      "KKD gerekliliklerini dikkate almamak",
      "Hasarlı kap kullanmak",
      "Yetersiz düzen ve temizlik",
      "Acil duş veya göz yıkama istasyonlarını engellemek",
      "Yanlış atık bertarafı",
      "Dökülmeleri bildirmemek",
    ],
  },

  checklist: {
    title: {
      en: "Chemical Safety Checklist",
      tr: "Kimyasal Güvenliği Kontrol Listesi",
    },
    en: [
      "SDS available",
      "Containers labeled",
      "Correct PPE worn",
      "Ventilation adequate",
      "Emergency shower accessible",
      "Eyewash station operational",
      "No leaks detected",
      "Chemicals stored correctly",
      "Waste containers available",
      "Spill kit ready",
      "Workers trained",
      "Emergency contacts displayed",
    ],
    tr: [
      "SDS mevcut",
      "Kaplar etiketli",
      "Doğru KKD kullanılıyor",
      "Havalandırma yeterli",
      "Acil duş erişilebilir",
      "Göz yıkama istasyonu çalışır durumda",
      "Sızıntı yok",
      "Kimyasallar doğru depolanmış",
      "Atık kapları hazır",
      "Dökülme kiti mevcut",
      "Çalışanlar eğitimli",
      "Acil durum iletişim bilgileri görünür",
    ],
  },

  emergencySection: {
    title: {
      en: "Chemical Emergency Response",
      tr: "Kimyasal Acil Durum Müdahalesi",
    },
    content: {
      en: "Stop the work immediately if a chemical leak, spill or uncontrolled reaction occurs. Isolate the area, notify emergency personnel and follow the SDS instructions. Use the appropriate spill kit and PPE. Flush exposed skin or eyes with clean water for at least 15 minutes unless the SDS specifies otherwise, and seek medical attention when necessary.",
      tr: "Kimyasal sızıntı, dökülme veya kontrolsüz reaksiyon meydana gelirse çalışmayı derhal durdurun. Alanı izole edin, acil durum ekiplerine haber verin ve SDS talimatlarını uygulayın. Uygun dökülme kitini ve KKD'yi kullanın. SDS'de aksi belirtilmedikçe maruz kalan cildi veya gözü en az 15 dakika temiz suyla yıkayın ve gerektiğinde tıbbi yardım alın.",
    },
  },

  references: [
    "OSHA 1910.1200",
    "OSHA Hazard Communication Standard",
    "Globally Harmonized System (GHS)",
  ],

  relatedGuides: [
    {
      slug: "fire-safety",
      icon: "🔥",
      title: {
        en: "Fire Safety",
        tr: "Yangın Güvenliği",
      },
    },
    {
      slug: "ppe",
      icon: "🦺",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
    },
    {
      slug: "electrical-safety",
      icon: "⚡",
      title: {
        en: "Electrical Safety",
        tr: "Elektrik Güvenliği",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI any chemical safety question and receive guidance based on OSHA and GHS best practices.",
    tr: "Kimyasal güvenliği hakkında SafeBase AI'a soru sorarak OSHA ve GHS uygulamalarına dayalı rehberlik alın.",
  },
};
