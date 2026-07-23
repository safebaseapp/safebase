import type { SafetyGuide } from "../../components/GuideTemplate";

export const excavationGuide: SafetyGuide = {
  slug: "excavation",

  category: {
    en: "Work Activity",
    tr: "Çalışma Faaliyeti",
  },

  title: {
    en: "Excavation and Trenching",
    tr: "Kazı ve Hendek Çalışmaları",
  },

  description: {
    en: "Essential guidance for controlling ground collapse, underground-service strikes, unsafe access, water accumulation and mobile-equipment hazards.",
    tr: "Zemin çökmesi, yeraltı hatlarına zarar verme, güvensiz erişim, su birikmesi ve hareketli ekipman tehlikelerini kontrol etmek için temel rehber.",
  },

  overview: {
    en: "Excavation and trenching work can expose workers to sudden ground collapse, falling materials, hazardous atmospheres, underground utilities and moving equipment. Work should begin only after the excavation has been assessed by a competent person, underground services have been identified and suitable protective, access and inspection arrangements have been established.",
    tr: "Kazı ve hendek çalışmaları çalışanları ani zemin çökmesi, düşen malzemeler, tehlikeli atmosfer, yeraltı hatları ve hareketli ekipman risklerine maruz bırakabilir. Çalışma yalnızca kazı yetkin bir kişi tarafından değerlendirildikten, yeraltı hatları belirlendikten ve uygun koruma, erişim ve kontrol düzenlemeleri oluşturulduktan sonra başlamalıdır.",
  },

  readTime: 8,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Cave-in or sudden ground collapse",
      "Workers or equipment falling into the excavation",
      "Falling spoil, tools or materials",
      "Contact with underground electrical, gas or process lines",
      "Unsafe entry and exit",
      "Water accumulation or flooding",
      "Hazardous or oxygen-deficient atmosphere",
      "Mobile equipment operating near the edge",
    ],
    tr: [
      "Göçük veya ani zemin çökmesi",
      "Çalışanların veya ekipmanın kazıya düşmesi",
      "Hafriyatın, aletlerin veya malzemelerin düşmesi",
      "Yeraltı elektrik, gaz veya proses hatlarına temas",
      "Güvensiz giriş ve çıkış",
      "Su birikmesi veya su baskını",
      "Tehlikeli veya oksijeni yetersiz atmosfer",
      "Kazı kenarında çalışan hareketli ekipmanlar",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet",
      "Safety footwear",
      "High-visibility clothing",
      "Suitable work gloves",
      "Eye protection where flying particles are present",
      "Respiratory protection when required by the assessment",
    ],
    tr: [
      "Baret",
      "İş ayakkabısı",
      "Yüksek görünürlüklü kıyafet",
      "Uygun iş eldiveni",
      "Uçuşan parçacık riski varsa göz koruması",
      "Değerlendirmede gerekli görülürse solunum koruması",
    ],
  },

  controls: {
    en: [
      "Identify and mark underground utilities before excavation begins.",
      "Have a competent person assess soil conditions, excavation depth and protective-system requirements.",
      "Use suitable sloping, benching, shoring or shielding where required.",
      "Provide safe access and egress, such as ladders, stairs or ramps.",
      "Keep spoil piles, materials and equipment at least 0.6 metres from the excavation edge.",
      "Use barriers, guardrails or warning systems around exposed edges.",
      "Inspect the excavation daily and after rain, vibration, nearby loading or any condition change.",
      "Control water accumulation with drainage, pumps or other suitable measures.",
      "Keep mobile equipment away from unsupported edges and use a spotter where visibility is restricted.",
      "Test the atmosphere where hazardous gases, vapours or oxygen deficiency may be present.",
    ],
    tr: [
      "Kazı başlamadan önce yeraltı hatlarını belirleyin ve işaretleyin.",
      "Yetkin bir kişinin zemin şartlarını, kazı derinliğini ve koruyucu sistem gerekliliklerini değerlendirmesini sağlayın.",
      "Gerekli olduğunda uygun şevlendirme, basamaklandırma, iksa veya kalkan sistemi kullanın.",
      "Merdiven, basamak veya rampa gibi güvenli giriş ve çıkış sağlayın.",
      "Hafriyat yığınlarını, malzemeleri ve ekipmanı kazı kenarından en az 0,6 metre uzakta tutun.",
      "Açık kenarlarda bariyer, korkuluk veya uyarı sistemi kullanın.",
      "Kazıyı her gün ve yağmur, titreşim, yakın yükleme veya koşul değişikliğinden sonra kontrol edin.",
      "Su birikmesini drenaj, pompa veya diğer uygun yöntemlerle kontrol edin.",
      "Hareketli ekipmanı desteklenmemiş kenarlardan uzak tutun ve görüş kısıtlıysa işaretçi kullanın.",
      "Tehlikeli gaz, buhar veya oksijen yetersizliği ihtimali varsa atmosfer ölçümü yapın.",
    ],
  },

  commonMistakes: {
    en: [
      "Allowing workers into an excavation before inspection",
      "Placing spoil directly at the excavation edge",
      "Using an unsecured ladder for access",
      "Failing to identify underground services",
      "Working beneath suspended loads",
      "Ignoring cracks, bulging soil or water seepage",
      "Operating heavy equipment too close to the edge",
    ],
    tr: [
      "Kontrol yapılmadan çalışanların kazıya girmesine izin vermek",
      "Hafriyatı doğrudan kazı kenarına yığmak",
      "Erişim için sabitlenmemiş merdiven kullanmak",
      "Yeraltı hatlarını belirlememek",
      "Asılı yüklerin altında çalışmak",
      "Çatlakları, zemin şişmesini veya su sızıntısını dikkate almamak",
      "Ağır ekipmanı kazı kenarına çok yakın çalıştırmak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-work Checklist",
      tr: "Çalışma Öncesi Kontrol Listesi",
    },
    en: [
      "Underground utilities have been identified and marked",
      "The excavation has been inspected by a competent person",
      "Soil and ground conditions have been assessed",
      "A suitable protective system is installed where required",
      "Safe access and egress are available",
      "Spoil and materials are kept away from the edge",
      "Barriers and warning signs are in place",
      "Water accumulation is controlled",
      "Mobile equipment movements are controlled",
      "Atmospheric testing has been completed where necessary",
    ],
    tr: [
      "Yeraltı hatları belirlendi ve işaretlendi",
      "Kazı yetkin bir kişi tarafından kontrol edildi",
      "Zemin ve toprak şartları değerlendirildi",
      "Gerekli olduğunda uygun koruyucu sistem kuruldu",
      "Güvenli giriş ve çıkış mevcut",
      "Hafriyat ve malzemeler kenardan uzak tutuluyor",
      "Bariyerler ve uyarı levhaları yerinde",
      "Su birikmesi kontrol altında",
      "Hareketli ekipman trafiği kontrol ediliyor",
      "Gerekli olduğunda atmosfer ölçümü tamamlandı",
    ],
  },

  emergencySection: {
    title: {
      en: "Collapse and Emergency Response",
      tr: "Göçük ve Acil Durum Müdahalesi",
    },
    content: {
      en: "If cracks, soil movement, water ingress, protective-system damage or any sign of instability is observed, stop work immediately and evacuate the excavation. Do not enter a collapsed or unstable excavation to attempt an unplanned rescue. Isolate the area, call the emergency response team and allow only trained rescue personnel with suitable shoring and retrieval equipment to enter.",
      tr: "Çatlak, zemin hareketi, su girişi, koruyucu sistem hasarı veya herhangi bir dengesizlik belirtisi görülürse çalışmayı derhal durdurun ve kazıyı tahliye edin. Plansız kurtarma amacıyla çökmüş veya dengesiz kazıya girmeyin. Alanı izole edin, acil müdahale ekibini çağırın ve yalnızca uygun iksa ve kurtarma ekipmanına sahip eğitimli kurtarma personelinin giriş yapmasına izin verin.",
    },
  },

  references: [
    "OSHA 1926 Subpart P",
    "OSHA 1926.651",
    "OSHA 1926.652",
    "OSHA Appendix A to Subpart P",
  ],

  relatedGuides: [
    {
      slug: "ppe",
      icon: "🦺",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
    },
    {
      slug: "confined-space",
      icon: "🕳️",
      title: {
        en: "Confined Space Entry",
        tr: "Kapalı Alan Girişi",
      },
    },
    {
      slug: "working-at-height",
      icon: "🪜",
      title: {
        en: "Working at Height Safety",
        tr: "Yüksekte Çalışma Güvenliği",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI an excavation or trenching question and receive practical guidance based on the knowledge base.",
    tr: "Kazı veya hendek çalışmaları konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
