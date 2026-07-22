import type { SafetyGuide } from "../components/GuideTemplate";

export const workingAtHeightGuide: SafetyGuide = {
  slug: "working-at-height",

  category: {
    en: "Work Activity",
    tr: "Çalışma Faaliyeti",
  },

  title: {
    en: "Working at Height Safety",
    tr: "Yüksekte Çalışma Güvenliği",
  },

  description: {
    en: "Essential guidance for preventing falls, providing safe access, verifying anchorage systems and preparing an effective rescue plan.",
    tr: "Düşmeleri önlemek, güvenli erişim sağlamak, ankraj sistemlerini doğrulamak ve etkili bir kurtarma planı hazırlamak için temel rehber.",
  },

  overview: {
    en: "Working at height includes any activity where a person could fall and be injured. A safe system should begin by eliminating the hazard. When elimination is not possible, collective protection and personal fall-protection controls must be selected, inspected and correctly used.",
    tr: "Yüksekte çalışma, bir kişinin düşerek yaralanabileceği her faaliyeti kapsar. Güvenli sistem öncelikle tehlikeyi ortadan kaldırmayı hedeflemelidir. Bunun mümkün olmadığı durumlarda toplu koruma ve kişisel düşüş koruma tedbirleri seçilmeli, kontrol edilmeli ve doğru kullanılmalıdır.",
  },

  readTime: 8,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Falls from unprotected edges",
      "Improper or damaged access equipment",
      "Incorrect anchorage selection",
      "Dropped objects",
      "Adverse weather conditions",
      "Fragile surfaces and openings",
      "Suspension trauma after a fall",
      "Inadequate rescue planning",
    ],
    tr: [
      "Korumasız kenarlardan düşme",
      "Uygun olmayan veya hasarlı erişim ekipmanı",
      "Yanlış ankraj noktası seçimi",
      "Düşen cisimler",
      "Olumsuz hava koşulları",
      "Kırılgan yüzeyler ve açıklıklar",
      "Düşüş sonrası askıda kalma travması",
      "Yetersiz kurtarma planı",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet with secured chin strap where required",
      "Full-body harness",
      "Compatible lanyard or self-retracting lifeline",
      "Slip-resistant safety footwear",
      "Work-positioning or restraint equipment when required",
      "Task-specific gloves and eye protection",
    ],
    tr: [
      "Gerekli durumlarda çene bantlı baret",
      "Tam vücut emniyet kemeri",
      "Uyumlu lanyard veya geri sarımlı düşüş durdurucu",
      "Kaymaz tabanlı iş ayakkabısı",
      "Gerekli durumlarda konumlandırma veya kısıtlama ekipmanı",
      "İşe uygun eldiven ve göz koruması",
    ],
  },

  controls: {
    en: [
      "Complete the risk assessment and permit process before work begins.",
      "Eliminate work at height where practical by completing the task from ground level.",
      "Prioritize collective protection such as guardrails, platforms and barriers.",
      "Inspect full-body harnesses and compatible connecting systems before use.",
      "Verify anchorage suitability, position and adequate strength.",
      "Inspect ladders, scaffolds and elevating platforms before use.",
      "Barricade the area below and control dropped-object hazards.",
      "Prepare and communicate a practical rescue plan before starting work.",
    ],
    tr: [
      "Çalışma başlamadan önce risk değerlendirmesi ve izin sürecini tamamlayın.",
      "Mümkün olduğunda işi zemin seviyesinden yaparak yüksekte çalışmayı ortadan kaldırın.",
      "Korkuluk, platform ve bariyer gibi toplu koruma önlemlerine öncelik verin.",
      "Tam vücut emniyet kemeri ve uyumlu bağlantı sistemlerini kullanım öncesinde kontrol edin.",
      "Ankraj noktasının uygunluğunu, konumunu ve yeterli dayanımını doğrulayın.",
      "Merdiven, iskele ve yükseltici platformları kullanımdan önce kontrol edin.",
      "Alt bölgeyi bariyerleyin ve düşen cisim risklerini kontrol edin.",
      "Çalışma başlamadan önce uygulanabilir kurtarma planını hazırlayın ve ekiple paylaşın.",
    ],
  },

  commonMistakes: {
    en: [
      "Connecting fall protection to handrails or unsuitable structures",
      "Using damaged or expired fall-protection equipment",
      "Working without a rescue plan",
      "Standing on improvised platforms or unsuitable objects",
      "Using ladders without securing or maintaining three-point contact",
      "Ignoring weather, wind or slippery-surface conditions",
    ],
    tr: [
      "Düşüş koruma sistemini korkuluk veya uygun olmayan yapılara bağlamak",
      "Hasarlı veya kullanım süresi geçmiş ekipman kullanmak",
      "Kurtarma planı olmadan çalışmak",
      "Uygunsuz cisimler veya geçici yükseltiler üzerinde durmak",
      "Merdiveni sabitlemeden veya üç nokta temasını korumadan kullanmak",
      "Hava, rüzgâr veya kaygan yüzey şartlarını dikkate almamak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-work Checklist",
      tr: "Çalışma Öncesi Kontrol Listesi",
    },
    en: [
      "Risk assessment and permit are approved",
      "Access equipment has been inspected",
      "Harness and connecting equipment are serviceable",
      "Anchorage points have been verified",
      "Open edges and floor openings are protected",
      "The area below has been barricaded",
      "Weather conditions are acceptable",
      "Rescue plan and rescue equipment are ready",
    ],
    tr: [
      "Risk değerlendirmesi ve izin onaylandı",
      "Erişim ekipmanları kontrol edildi",
      "Emniyet kemeri ve bağlantı ekipmanları kullanılabilir durumda",
      "Ankraj noktaları doğrulandı",
      "Açık kenarlar ve zemin boşlukları koruma altında",
      "Alt bölge bariyerlendi",
      "Hava koşulları uygun",
      "Kurtarma planı ve kurtarma ekipmanları hazır",
    ],
  },

  emergencySection: {
    title: {
      en: "Rescue Readiness",
      tr: "Kurtarma Hazırlığı",
    },
    content: {
      en: "A fallen worker suspended in a harness may require rapid rescue. The rescue method, equipment, access route, trained rescuers and communication arrangements must be confirmed before work begins. Emergency services alone should not be treated as the complete rescue plan.",
      tr: "Emniyet kemerinde askıda kalan bir çalışanın hızlı şekilde kurtarılması gerekebilir. Kurtarma yöntemi, ekipman, erişim yolu, eğitimli kurtarma personeli ve iletişim düzeni çalışma başlamadan önce doğrulanmalıdır. Yalnızca acil servislerin çağrılması tam bir kurtarma planı olarak kabul edilmemelidir.",
    },
  },

  references: [
    "OSHA 1926 Subpart M",
    "OSHA 1910.28",
    "OSHA 1910.140",
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
      slug: "scaffolding",
      icon: "🏗️",
      title: {
        en: "Scaffold Safety",
        tr: "İskele Güvenliği",
      },
    },
    {
      slug: "loto",
      icon: "🔒",
      title: {
        en: "Lockout Tagout",
        tr: "Kilitleme ve Etiketleme",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a working-at-height question and receive practical guidance based on the knowledge base.",
    tr: "Yüksekte çalışma konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};

export const confinedSpaceGuide: SafetyGuide = {
  slug: "confined-space",

  category: {
    en: "Work Activity",
    tr: "Çalışma Faaliyeti",
  },

  title: {
    en: "Confined Space Entry",
    tr: "Kapalı Alan Girişi",
  },

  description: {
    en: "Essential guidance for controlling atmospheric hazards, isolating energy, managing safe entry and preparing an effective rescue arrangement.",
    tr: "Atmosferik tehlikeleri kontrol etmek, enerjiyi izole etmek, güvenli giriş sağlamak ve etkili bir kurtarma düzeni kurmak için temel rehber.",
  },

  overview: {
    en: "Confined spaces are not designed for continuous occupancy, may have restricted entry or exit, and can contain serious atmospheric or physical hazards. Entry should take place only after hazards are evaluated, the space is isolated, acceptable atmospheric conditions are established and the permit process is completed.",
    tr: "Kapalı alanlar sürekli çalışma için tasarlanmamış, giriş veya çıkışı sınırlı olabilen ve ciddi atmosferik ya da fiziksel tehlikeler barındırabilen alanlardır. Giriş yalnızca tehlikeler değerlendirildikten, alan izole edildikten, kabul edilebilir atmosfer şartları sağlandıktan ve izin süreci tamamlandıktan sonra yapılmalıdır.",
  },

  readTime: 10,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Oxygen deficiency or oxygen enrichment",
      "Toxic or flammable atmosphere",
      "Unexpected energy or product release",
      "Moving mechanical equipment",
      "Engulfment, entrapment or crushing",
      "Restricted entry and exit",
      "Heat stress and inadequate ventilation",
      "Unprepared or delayed rescue response",
    ],
    tr: [
      "Oksijen yetersizliği veya oksijen zenginleşmesi",
      "Zehirli veya yanıcı atmosfer",
      "Beklenmeyen enerji veya ürün girişi",
      "Hareketli mekanik ekipmanlar",
      "Boğulma, gömülme veya sıkışma",
      "Yetersiz giriş ve çıkış imkânı",
      "Isı stresi ve sınırlı havalandırma",
      "Hazırlıksız veya gecikmiş kurtarma müdahalesi",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet",
      "Safety footwear",
      "Suitable gloves",
      "Eye and face protection",
      "Full-body harness where retrieval is required",
      "Respiratory protection when specified by the assessment",
    ],
    tr: [
      "Baret",
      "İş ayakkabısı",
      "Uygun eldiven",
      "Göz ve yüz koruması",
      "Geri çekme sistemi gerektiğinde tam vücut emniyet kemeri",
      "Değerlendirmede belirtilmişse solunum koruması",
    ],
  },

  controls: {
    en: [
      "Evaluate the space and determine whether it is a permit-required confined space.",
      "Prepare and authorize an approved confined-space entry permit before entry.",
      "Isolate all energy, pressure, chemical and product sources.",
      "Test the atmosphere before entry and throughout the work using suitable instruments.",
      "Provide continuous and adequate mechanical ventilation when required.",
      "Maintain a trained attendant outside the space for the duration of entry.",
      "Provide reliable and continuous communication with authorized entrants.",
      "Prepare a practical rescue plan with suitable equipment, competent personnel and response methods.",
    ],
    tr: [
      "Alanı değerlendirin ve izin gerektiren kapalı alan olup olmadığını belirleyin.",
      "Giriş öncesinde onaylı kapalı alan giriş iznini hazırlayın ve yetkilendirin.",
      "Tüm enerji, basınç, kimyasal ve ürün kaynaklarını izole edin.",
      "Atmosferi giriş öncesinde ve çalışma boyunca uygun cihazlarla ölçün.",
      "Gerekli olduğunda sürekli ve yeterli mekanik havalandırma sağlayın.",
      "Giriş süresince dışarıda eğitimli bir gözcü bulundurun.",
      "Giriş yapanlarla güvenilir ve kesintisiz iletişim sağlayın.",
      "Uygun ekipman, yetkin personel ve müdahale yöntemini içeren uygulanabilir bir kurtarma planı hazırlayın.",
    ],
  },

  commonMistakes: {
    en: [
      "Testing the atmosphere only before entry",
      "Relying only on closed valves for isolation",
      "Assigning unrelated duties to the attendant",
      "Entering without a workable rescue plan",
      "Using a gas detector without valid calibration or bump testing",
      "Failing to reassess the permit when conditions change",
    ],
    tr: [
      "Yalnızca giriş öncesinde gaz ölçümü yapmak",
      "İzolasyon için yalnızca kapalı vanalara güvenmek",
      "Gözcüye ilgisiz görevler vermek",
      "Uygulanabilir kurtarma planı olmadan giriş yapmak",
      "Geçerli kalibrasyonu veya bump testi olmayan gaz dedektörü kullanmak",
      "Koşullar değiştiğinde izni yeniden değerlendirmemek",
    ],
  },

  checklist: {
    title: {
      en: "Pre-entry Checklist",
      tr: "Giriş Öncesi Kontrol Listesi",
    },
    en: [
      "The space has been classified and hazards evaluated",
      "The entry permit is approved and available at the entry point",
      "LOTO and mechanical isolations have been verified",
      "The gas detector has been checked and readings recorded",
      "The ventilation system is operating",
      "Entrants, attendant and entry supervisor have been identified",
      "The communication method has been tested",
      "Rescue equipment and rescue personnel are ready",
    ],
    tr: [
      "Alan sınıflandırıldı ve tehlikeler değerlendirildi",
      "Giriş izni onaylandı ve giriş noktasında mevcut",
      "LOTO ve mekanik izolasyonlar doğrulandı",
      "Gaz dedektörü kontrol edildi ve ölçümler kaydedildi",
      "Havalandırma sistemi çalışıyor",
      "Giriş yapanlar, gözcü ve giriş amiri belirlendi",
      "İletişim yöntemi test edildi",
      "Kurtarma ekipmanı ve kurtarma personeli hazır",
    ],
  },

  emergencySection: {
    title: {
      en: "Rescue Readiness",
      tr: "Kurtarma Hazırlığı",
    },
    content: {
      en: "A rescue plan must be workable, not merely documented. Before entry, verify the rescue method, equipment suitability, response time, communication arrangements and the availability of retrieval systems such as a tripod or winch where required. The attendant must not enter the space to attempt an unauthorized rescue.",
      tr: "Kurtarma planı yalnızca belgelenmiş değil, uygulanabilir olmalıdır. Giriş öncesinde kurtarma yöntemi, ekipmanın uygunluğu, müdahale süresi, iletişim düzeni ve gerekli olduğunda tripod veya vinç gibi geri çekme sistemlerinin kullanılabilirliği doğrulanmalıdır. Gözcü yetkisiz kurtarma amacıyla alana girmemelidir.",
    },
  },

  references: [
    "OSHA 1910.146",
    "OSHA 1926 Subpart AA",
    "OSHA 1926.1204",
    "OSHA 1926.1211",
  ],

  relatedGuides: [
    {
      slug: "loto",
      icon: "🔒",
      title: {
        en: "Lockout Tagout",
        tr: "Kilitleme ve Etiketleme",
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
      slug: "hot-work",
      icon: "🔥",
      title: {
        en: "Hot Work Safety",
        tr: "Sıcak Çalışma Güvenliği",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a confined-space question and receive practical guidance based on the knowledge base.",
    tr: "Kapalı alan girişi konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
