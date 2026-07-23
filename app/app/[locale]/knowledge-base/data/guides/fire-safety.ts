import type { SafetyGuide } from "../../components/GuideTemplate";

export const fireSafetyGuide: SafetyGuide = {
  slug: "fire-safety",

  category: {
    en: "Emergency Safety",
    tr: "Acil Durum Güvenliği",
  },

  title: {
    en: "Fire Safety",
    tr: "Yangın Güvenliği",
  },

  description: {
    en: "Professional guidance for preventing workplace fires, controlling ignition sources, maintaining fire protection systems and responding safely during emergencies.",
    tr: "İş yeri yangınlarını önleme, ateşleme kaynaklarını kontrol etme, yangından korunma sistemlerini hazır tutma ve acil durumlarda güvenli müdahale için profesyonel rehber.",
  },

  overview: {
    en: "Workplace fires can develop rapidly and may cause fatalities, severe burns, smoke inhalation, structural damage and major business interruption. Effective fire safety depends on controlling fuel and ignition sources, maintaining detection and suppression systems, keeping escape routes clear and ensuring that workers understand alarm, evacuation and emergency procedures.",
    tr: "İş yeri yangınları hızla gelişebilir ve can kaybı, ciddi yanıklar, dumandan etkilenme, yapısal hasar ve büyük iş kesintilerine neden olabilir. Etkili yangın güvenliği; yanıcı maddelerin ve ateşleme kaynaklarının kontrol edilmesine, algılama ve söndürme sistemlerinin hazır tutulmasına, kaçış yollarının açık bırakılmasına ve çalışanların alarm, tahliye ve acil durum prosedürlerini bilmesine bağlıdır.",
  },

  readTime: 9,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA / NFPA",

  hazards: {
    en: [
      "Combustible and flammable materials stored near ignition sources",
      "Hot work sparks, flames and heated surfaces",
      "Electrical faults, overloaded circuits and damaged cables",
      "Gas, vapor or dust accumulation",
      "Blocked emergency exits and escape routes",
      "Missing, discharged or inaccessible fire extinguishers",
      "Poor housekeeping and accumulation of combustible waste",
      "Smoking outside designated areas",
      "Inadequate separation of incompatible chemicals",
      "Delayed alarm activation or evacuation",
    ],
    tr: [
      "Yanıcı ve parlayıcı maddelerin ateşleme kaynakları yakınında depolanması",
      "Sıcak çalışma kıvılcımları, açık alevler ve sıcak yüzeyler",
      "Elektrik arızaları, aşırı yüklenmiş devreler ve hasarlı kablolar",
      "Gaz, buhar veya toz birikmesi",
      "Engellenmiş acil çıkışlar ve kaçış yolları",
      "Eksik, boşalmış veya erişilemeyen yangın söndürücüler",
      "Yetersiz düzen ve yanıcı atık birikmesi",
      "Belirlenmiş alanlar dışında sigara içilmesi",
      "Uyumsuz kimyasalların yetersiz ayrılması",
      "Alarmın veya tahliyenin gecikmesi",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet",
      "Safety footwear",
      "Suitable work gloves",
      "Flame-resistant clothing where fire exposure may exist",
      "Eye and face protection for hot work or firefighting support activities",
      "Respiratory protection only where selected through a formal assessment",
    ],
    tr: [
      "Baret",
      "İş güvenliği ayakkabısı",
      "Uygun iş eldiveni",
      "Yangın maruziyeti ihtimali bulunan işlerde alev geciktirici kıyafet",
      "Sıcak çalışma veya yangınla mücadele destek faaliyetlerinde göz ve yüz koruması",
      "Yalnızca resmi risk değerlendirmesiyle seçilmiş solunum koruyucu",
    ],
  },

  controls: {
    en: [
      "Complete a fire-risk assessment for the workplace and review it after significant changes.",
      "Control ignition sources, including hot work, smoking, electrical equipment and open flames.",
      "Use a permit-to-work system for hot work and provide suitable fire watch arrangements.",
      "Store flammable liquids in approved containers and designated cabinets or storage areas.",
      "Separate incompatible chemicals and maintain correct labeling.",
      "Keep emergency exits, corridors, doors and assembly routes clear at all times.",
      "Provide suitable fire extinguishers for the expected fire classes.",
      "Inspect extinguishers, hose reels, alarms and detection systems at required intervals.",
      "Maintain good housekeeping and remove combustible waste regularly.",
      "Ensure fire doors remain closed and are not wedged open.",
      "Provide clear emergency signage and visible evacuation plans.",
      "Train workers in alarm response, evacuation routes, assembly points and extinguisher limitations.",
    ],
    tr: [
      "İş yeri için yangın risk değerlendirmesi yapın ve önemli değişikliklerden sonra gözden geçirin.",
      "Sıcak çalışma, sigara, elektrikli ekipman ve açık alev dahil ateşleme kaynaklarını kontrol edin.",
      "Sıcak çalışmalar için çalışma izin sistemi uygulayın ve uygun yangın gözcüsü sağlayın.",
      "Yanıcı sıvıları onaylı kaplarda ve belirlenmiş dolap veya depolama alanlarında saklayın.",
      "Uyumsuz kimyasalları ayırın ve doğru etiketlemeyi sağlayın.",
      "Acil çıkışları, koridorları, kapıları ve toplanma yollarını her zaman açık tutun.",
      "Beklenen yangın sınıflarına uygun yangın söndürücüler sağlayın.",
      "Söndürücüleri, yangın dolaplarını, alarmları ve algılama sistemlerini gerekli aralıklarla kontrol edin.",
      "İyi saha düzeni sağlayın ve yanıcı atıkları düzenli olarak uzaklaştırın.",
      "Yangın kapılarının kapalı kalmasını ve açık şekilde sabitlenmemesini sağlayın.",
      "Açık acil durum işaretleri ve görünür tahliye planları sağlayın.",
      "Çalışanları alarm tepkisi, tahliye yolları, toplanma noktaları ve söndürücü kullanım sınırları konusunda eğitin.",
    ],
  },

  commonMistakes: {
    en: [
      "Blocking fire extinguishers or emergency exits",
      "Using the wrong extinguisher type",
      "Continuing hot work without a fire watch",
      "Leaving combustible waste near hot surfaces",
      "Wedging fire doors open",
      "Ignoring damaged electrical cables",
      "Storing gas cylinders or flammable liquids incorrectly",
      "Attempting to fight a growing fire instead of evacuating",
      "Returning to the building before authorization",
    ],
    tr: [
      "Yangın söndürücülerin veya acil çıkışların önünü kapatmak",
      "Yanlış tip yangın söndürücü kullanmak",
      "Yangın gözcüsü olmadan sıcak çalışmaya devam etmek",
      "Yanıcı atıkları sıcak yüzeylerin yakınında bırakmak",
      "Yangın kapılarını açık şekilde sabitlemek",
      "Hasarlı elektrik kablolarını görmezden gelmek",
      "Gaz tüplerini veya yanıcı sıvıları yanlış depolamak",
      "Büyüyen yangını söndürmeye çalışmak yerine tahliye etmemek",
      "Yetki verilmeden binaya geri dönmek",
    ],
  },

  checklist: {
    title: {
      en: "Fire Safety Inspection Checklist",
      tr: "Yangın Güvenliği Kontrol Listesi",
    },
    en: [
      "Emergency exits and escape routes are clear",
      "Fire doors are closed and unobstructed",
      "Fire extinguishers are present, accessible and in service",
      "Alarm and detection systems show no visible defect",
      "Flammable materials are stored correctly",
      "Combustible waste has been removed",
      "Hot work controls and fire watch are in place",
      "Electrical equipment and cables show no visible damage",
      "Emergency signage is visible",
      "Workers know the assembly point",
      "Access for emergency vehicles is clear",
      "No unauthorized smoking or open flame is present",
    ],
    tr: [
      "Acil çıkışlar ve kaçış yolları açık",
      "Yangın kapıları kapalı ve engelsiz",
      "Yangın söndürücüler mevcut, erişilebilir ve kullanıma hazır",
      "Alarm ve algılama sistemlerinde görünür kusur yok",
      "Yanıcı maddeler doğru şekilde depolanmış",
      "Yanıcı atıklar uzaklaştırılmış",
      "Sıcak çalışma kontrolleri ve yangın gözcüsü mevcut",
      "Elektrikli ekipman ve kablolarda görünür hasar yok",
      "Acil durum işaretleri görünür",
      "Çalışanlar toplanma noktasını biliyor",
      "Acil durum araçlarının erişimi açık",
      "Yetkisiz sigara veya açık alev bulunmuyor",
    ],
  },

  emergencySection: {
    title: {
      en: "Fire Emergency Response",
      tr: "Yangın Acil Durum Müdahalesi",
    },
    content: {
      en: "Raise the alarm immediately, notify emergency services and begin evacuation using the nearest safe route. Do not use elevators unless specifically approved by the emergency plan. Only attempt to use a fire extinguisher if the fire is small, you are trained, the correct extinguisher is available and a safe escape route remains behind you. Proceed to the assembly point, report to the responsible person and do not re-enter until authorized.",
      tr: "Derhal alarmı verin, acil durum ekiplerine haber verin ve en yakın güvenli güzergâhtan tahliyeye başlayın. Acil durum planında özel olarak izin verilmedikçe asansör kullanmayın. Yangına yalnızca küçükse, eğitimliyseniz, doğru söndürücü mevcutsa ve arkanızda güvenli kaçış yolu bulunuyorsa müdahale edin. Toplanma noktasına gidin, sorumlu kişiye bildirim yapın ve izin verilmeden tekrar içeri girmeyin.",
    },
  },

  references: [
    "OSHA 1910.38",
    "OSHA 1910.39",
    "OSHA 1910.157",
    "NFPA 10",
    "NFPA 101",
  ],

  relatedGuides: [
    {
      slug: "hot-work",
      icon: "🔥",
      title: {
        en: "Hot Work Safety",
        tr: "Sıcak Çalışma Güvenliği",
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
    {
      slug: "chemical-safety",
      icon: "🧪",
      title: {
        en: "Chemical Safety",
        tr: "Kimyasal Güvenliği",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a workplace fire-safety question and receive practical guidance based on the knowledge base.",
    tr: "İş yeri yangın güvenliği konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
