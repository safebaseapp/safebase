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

export const hotWorkGuide: SafetyGuide = {
  slug: "hot-work",

  category: {
    en: "Work Activity",
    tr: "Çalışma Faaliyeti",
  },

  title: {
    en: "Hot Work Safety",
    tr: "Sıcak Çalışma Güvenliği",
  },

  description: {
    en: "Essential guidance for welding, cutting, grinding and other operations that can generate heat, sparks or open flames.",
    tr: "Kaynak, kesme, taşlama ve ısı, kıvılcım veya açık alev oluşturabilecek diğer işler için temel güvenlik rehberi.",
  },

  overview: {
    en: "Hot work can cause fire, explosion, burns and harmful fume exposure. Work should begin only after the permit, area inspection, isolation, fire-prevention controls and emergency arrangements have been verified.",
    tr: "Sıcak çalışma; yangın, patlama, yanık ve zararlı dumana maruz kalma riski oluşturabilir. İzin, alan kontrolü, izolasyon, yangın önlemleri ve acil durum düzeni doğrulanmadan çalışmaya başlanmamalıdır.",
  },

  readTime: 8,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Fire and explosion",
      "Flying sparks and molten metal",
      "Hot surfaces and burns",
      "Toxic welding fumes and gases",
      "Oxygen enrichment or fuel-gas leakage",
      "Ignition of hidden combustible materials",
      "Arc radiation and eye injury",
      "Fire spreading to adjacent levels or areas",
    ],
    tr: [
      "Yangın ve patlama",
      "Uçuşan kıvılcımlar ve erimiş metal",
      "Sıcak yüzeyler ve yanıklar",
      "Zehirli kaynak dumanları ve gazlar",
      "Oksijen zenginleşmesi veya yanıcı gaz kaçağı",
      "Gizli yanıcı malzemelerin tutuşması",
      "Ark ışını ve göz yaralanması",
      "Yangının bitişik katlara veya alanlara yayılması",
    ],
  },

  requiredPPE: {
    en: [
      "Safety glasses with side protection",
      "Suitable welding helmet or face shield",
      "Flame-resistant clothing",
      "Heat-resistant welding gloves",
      "Safety footwear",
      "Hearing protection where required",
      "Respiratory protection where ventilation is insufficient",
    ],
    tr: [
      "Yan korumalı güvenlik gözlüğü",
      "Uygun kaynak başlığı veya yüz siperi",
      "Alev geciktirici kıyafet",
      "Isıya dayanıklı kaynak eldiveni",
      "İş ayakkabısı",
      "Gerekli durumlarda kulak koruyucu",
      "Havalandırmanın yetersiz olduğu durumlarda solunum koruyucu",
    ],
  },

  controls: {
    en: [
      "Obtain and display an approved hot-work permit before starting.",
      "Inspect the work area and remove or protect combustible materials.",
      "Test the atmosphere where flammable gases or vapours may be present.",
      "Isolate nearby process equipment, lines and energy sources as required.",
      "Provide suitable fire extinguishers and fire blankets at the work area.",
      "Assign a competent fire watch with no conflicting duties.",
      "Control sparks, slag and hot material from reaching lower or adjacent areas.",
      "Inspect welding leads, hoses, regulators and equipment before use.",
      "Maintain adequate ventilation and control welding fumes.",
      "Continue fire watch and inspect the area after work is completed.",
    ],
    tr: [
      "Çalışmaya başlamadan önce onaylı sıcak çalışma iznini alın ve alanda bulundurun.",
      "Çalışma alanını kontrol edin; yanıcı malzemeleri kaldırın veya koruma altına alın.",
      "Yanıcı gaz veya buhar ihtimali bulunan yerlerde atmosfer ölçümü yapın.",
      "Gerekli durumlarda yakındaki proses ekipmanlarını, hatları ve enerji kaynaklarını izole edin.",
      "Çalışma alanında uygun yangın söndürücü ve yangın örtüsü bulundurun.",
      "Başka görevi olmayan yetkin bir yangın gözcüsü görevlendirin.",
      "Kıvılcım, cüruf ve sıcak malzemenin alt veya bitişik alanlara ulaşmasını önleyin.",
      "Kaynak kablolarını, hortumları, regülatörleri ve ekipmanları kullanım öncesinde kontrol edin.",
      "Yeterli havalandırma sağlayın ve kaynak dumanlarını kontrol edin.",
      "Çalışma sonrasında yangın gözetimini sürdürün ve alanı tekrar kontrol edin.",
    ],
  },

  commonMistakes: {
    en: [
      "Starting work before the permit is approved",
      "Using a fire watch who is distracted by other duties",
      "Leaving combustible materials below or behind the work area",
      "Using damaged welding leads, hoses or regulators",
      "Failing to test the atmosphere where required",
      "Allowing oxygen cylinders or hoses to leak into enclosed areas",
      "Stopping fire watch immediately when welding ends",
      "Using unsuitable screens or blankets that do not contain sparks",
    ],
    tr: [
      "İzin onaylanmadan çalışmaya başlamak",
      "Yangın gözcüsüne başka görevler vermek",
      "Çalışma alanının altında veya arkasında yanıcı malzeme bırakmak",
      "Hasarlı kaynak kablosu, hortum veya regülatör kullanmak",
      "Gerekli olduğu hâlde atmosfer ölçümü yapmamak",
      "Oksijen tüpü veya hortumundan kapalı alana kaçak oluşmasına izin vermek",
      "Kaynak biter bitmez yangın gözetimini sonlandırmak",
      "Kıvılcımları tutmayan uygunsuz perde veya örtü kullanmak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-work Checklist",
      tr: "Çalışma Öncesi Kontrol Listesi",
    },

    en: [
      "Hot-work permit is approved and available",
      "The work area and adjacent levels have been inspected",
      "Combustible materials have been removed or protected",
      "Gas testing has been completed where required",
      "Fire extinguishers and fire blankets are ready",
      "A competent fire watch has been assigned",
      "Welding equipment, leads and hoses are in good condition",
      "Ventilation is adequate",
      "The area below has been barricaded where necessary",
      "Post-work fire-watch duration has been confirmed",
    ],

    tr: [
      "Sıcak çalışma izni onaylandı ve alanda mevcut",
      "Çalışma alanı ve bitişik katlar kontrol edildi",
      "Yanıcı malzemeler kaldırıldı veya koruma altına alındı",
      "Gerekli durumlarda gaz ölçümü tamamlandı",
      "Yangın söndürücü ve yangın örtüleri hazır",
      "Yetkin yangın gözcüsü görevlendirildi",
      "Kaynak ekipmanı, kablolar ve hortumlar iyi durumda",
      "Havalandırma yeterli",
      "Gerekli yerlerde alt alan bariyerlendi",
      "Çalışma sonrası yangın gözetim süresi belirlendi",
    ],
  },

  emergencySection: {
    title: {
      en: "Emergency Response",
      tr: "Acil Durum Müdahalesi",
    },

    content: {
      en: "Stop work immediately if fire, gas release, equipment failure or unsafe conditions develop. Raise the alarm, isolate energy or gas supplies when safe, evacuate the area and use firefighting equipment only if trained and conditions allow.",
      tr: "Yangın, gaz kaçağı, ekipman arızası veya güvensiz durum oluşursa çalışmayı derhal durdurun. Alarm verin, güvenliyse enerji veya gaz kaynaklarını izole edin, alanı tahliye edin ve yalnızca eğitimliyseniz ve şartlar uygunsa yangın söndürme ekipmanını kullanın.",
    },
  },

  references: [
    "OSHA 1910.252",
    "OSHA 1926 Subpart J",
    "OSHA 1926.352",
    "NFPA 51B",
  ],

  relatedGuides: [
    {
      slug: "confined-space",
      icon: "🛢️",
      title: {
        en: "Confined Space Entry",
        tr: "Kapalı Alan Girişi",
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
    {
      slug: "ppe",
      icon: "🦺",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a hot-work safety question and receive practical guidance based on the knowledge base.",
    tr: "Sıcak çalışma güvenliği konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};

export const lotoGuide: SafetyGuide = {
  slug: "loto",

  category: {
    en: "Hazard Control",
    tr: "Tehlike Kontrolü",
  },

  title: {
    en: "Lockout Tagout Safety",
    tr: "Kilitleme ve Etiketleme Güvenliği",
  },

  description: {
    en: "Essential guidance for controlling hazardous energy during servicing, maintenance, inspection and equipment intervention.",
    tr: "Bakım, onarım, kontrol ve ekipmana müdahale sırasında tehlikeli enerjinin kontrolü için temel rehber.",
  },

  overview: {
    en: "Lockout Tagout protects workers from unexpected startup, energization or release of stored energy. Every hazardous energy source must be identified, isolated, locked, tagged, released and verified before work begins.",
    tr: "Kilitleme ve Etiketleme, çalışanları beklenmeyen çalıştırma, enerjilenme veya depolanmış enerjinin serbest kalmasına karşı korur. Çalışma başlamadan önce tüm tehlikeli enerji kaynakları belirlenmeli, izole edilmeli, kilitlenmeli, etiketlenmeli, boşaltılmalı ve doğrulanmalıdır.",
  },

  readTime: 10,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Unexpected equipment startup",
      "Electrical shock or arc flash",
      "Release of hydraulic or pneumatic pressure",
      "Movement caused by gravity",
      "Release of stored mechanical energy",
      "Thermal energy and hot surfaces",
      "Chemical or process product release",
      "Incorrect or incomplete isolation",
    ],
    tr: [
      "Ekipmanın beklenmedik şekilde çalışması",
      "Elektrik çarpması veya ark parlaması",
      "Hidrolik veya pnömatik basıncın serbest kalması",
      "Yer çekimi nedeniyle hareket",
      "Depolanmış mekanik enerjinin açığa çıkması",
      "Termal enerji ve sıcak yüzeyler",
      "Kimyasal veya proses ürünü salınımı",
      "Yanlış veya eksik izolasyon",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet",
      "Safety glasses",
      "Task-specific gloves",
      "Safety footwear",
      "Arc-rated PPE where electrical risk exists",
      "Face protection where pressure release is possible",
    ],
    tr: [
      "Baret",
      "Koruyucu gözlük",
      "İşe uygun eldiven",
      "İş ayakkabısı",
      "Elektrik riski varsa ark korumalı KKD",
      "Basınç boşalması ihtimali varsa yüz koruması",
    ],
  },

  controls: {
    en: [
      "Identify every hazardous energy source before shutdown.",
      "Notify affected employees before applying lockout.",
      "Shut down equipment using the normal stopping procedure.",
      "Isolate electrical, mechanical, hydraulic, pneumatic, thermal, chemical and gravitational energy sources.",
      "Apply personal locks and identification tags to each isolation point.",
      "Release, block or restrain all stored and residual energy.",
      "Verify zero-energy condition using appropriate testing methods.",
      "Attempt a controlled start or try-out where safe and applicable.",
      "Use group lockout procedures when multiple workers are involved.",
      "Remove locks only under an approved and controlled removal procedure.",
    ],
    tr: [
      "Durdurma öncesinde tüm tehlikeli enerji kaynaklarını belirleyin.",
      "Kilitleme uygulanmadan önce etkilenen çalışanları bilgilendirin.",
      "Ekipmanı normal durdurma prosedürünü kullanarak kapatın.",
      "Elektrik, mekanik, hidrolik, pnömatik, termal, kimyasal ve yer çekimi kaynaklı enerjileri izole edin.",
      "Her izolasyon noktasına kişisel kilit ve kimlik etiketi uygulayın.",
      "Tüm depolanmış ve artık enerjiyi boşaltın, bloke edin veya sabitleyin.",
      "Uygun test yöntemleriyle sıfır enerji durumunu doğrulayın.",
      "Güvenli ve uygulanabilir olduğunda kontrollü çalıştırma denemesi yapın.",
      "Birden fazla çalışan varsa grup LOTO prosedürünü uygulayın.",
      "Kilitleri yalnızca onaylı ve kontrollü kilit kaldırma prosedürüyle çıkarın.",
    ],
  },

  commonMistakes: {
    en: [
      "Locking only the main electrical switch",
      "Failing to identify stored or residual energy",
      "Using another worker's lock",
      "Relying only on stop buttons or control circuits",
      "Skipping zero-energy verification",
      "Removing a lock without authorization",
      "Using one lock for multiple workers",
      "Starting work before all isolation points are secured",
    ],
    tr: [
      "Yalnızca ana elektrik şalterini kilitlemek",
      "Depolanmış veya artık enerjiyi belirlememek",
      "Başka bir çalışanın kilidini kullanmak",
      "Yalnızca stop butonu veya kontrol devresine güvenmek",
      "Sıfır enerji doğrulamasını atlamak",
      "Yetkisiz şekilde kilit çıkarmak",
      "Birden fazla çalışan için tek kilit kullanmak",
      "Tüm izolasyon noktaları güvence altına alınmadan işe başlamak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-work Checklist",
      tr: "Çalışma Öncesi Kontrol Listesi",
    },

    en: [
      "The equipment and scope of work are clearly identified",
      "All hazardous energy sources have been listed",
      "Affected employees have been notified",
      "The equipment has been shut down normally",
      "All isolation points have been locked and tagged",
      "Stored energy has been released or restrained",
      "Zero-energy condition has been verified",
      "Group lockout controls are in place where required",
      "The work area is safe to enter",
      "Restart authorization responsibilities are understood",
    ],

    tr: [
      "Ekipman ve çalışma kapsamı açıkça belirlendi",
      "Tüm tehlikeli enerji kaynakları listelendi",
      "Etkilenen çalışanlar bilgilendirildi",
      "Ekipman normal prosedürle durduruldu",
      "Tüm izolasyon noktaları kilitlendi ve etiketlendi",
      "Depolanmış enerji boşaltıldı veya sabitlendi",
      "Sıfır enerji durumu doğrulandı",
      "Gerekli yerlerde grup LOTO kontrolleri uygulandı",
      "Çalışma alanına güvenli giriş sağlandı",
      "Yeniden çalıştırma sorumlulukları anlaşıldı",
    ],
  },

  emergencySection: {
    title: {
      en: "Unexpected Energy or Lock Removal",
      tr: "Beklenmeyen Enerji veya Kilit Kaldırma",
    },

    content: {
      en: "Stop work immediately if an unidentified energy source, pressure, movement or unsafe condition is discovered. Do not remove another person's lock unless the formal lock-removal procedure is authorized, documented and fully controlled.",
      tr: "Tanımlanmamış enerji kaynağı, basınç, hareket veya güvensiz durum tespit edilirse çalışmayı derhal durdurun. Başka bir kişinin kilidini yalnızca resmi kilit kaldırma prosedürü yetkilendirilmiş, belgelenmiş ve tamamen kontrol altındaysa çıkarın.",
    },
  },

  references: [
    "OSHA 1910.147",
    "OSHA 1910.333",
    "OSHA 1926.417",
  ],

  relatedGuides: [
    {
      slug: "confined-space",
      icon: "🛢️",
      title: {
        en: "Confined Space Entry",
        tr: "Kapalı Alan Girişi",
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
    {
      slug: "ppe",
      icon: "🦺",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a Lockout Tagout question and receive practical guidance based on the knowledge base.",
    tr: "Kilitleme ve Etiketleme konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};

export const ppeGuide: SafetyGuide = {
  slug: "ppe",

  category: {
    en: "Hazard Control",
    tr: "Tehlike Kontrolü",
  },

  title: {
    en: "Personal Protective Equipment",
    tr: "Kişisel Koruyucu Donanım",
  },

  description: {
    en: "Practical guidance for selecting, inspecting, using and maintaining personal protective equipment for workplace hazards.",
    tr: "İş yeri tehlikelerine uygun kişisel koruyucu donanımın seçimi, kontrolü, kullanımı ve bakımı için pratik rehber.",
  },

  overview: {
    en: "Personal Protective Equipment is the final layer of protection after hazards have been eliminated, substituted or controlled through engineering and administrative measures. PPE must be selected according to the hazard, fit the user correctly and remain in serviceable condition.",
    tr: "Kişisel Koruyucu Donanım, tehlikeler ortadan kaldırıldıktan, ikame edildikten veya mühendislik ve idari kontrollerle azaltıldıktan sonra kullanılan son koruma katmanıdır. KKD, tehlikeye uygun seçilmeli, kullanıcıya doğru oturmalı ve kullanılabilir durumda tutulmalıdır.",
  },

  readTime: 9,

  riskLevel: {
    en: "Essential Control",
    tr: "Temel Kontrol",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Eye and face injuries",
      "Head injuries from impact or falling objects",
      "Hearing damage from excessive noise",
      "Hand injuries from cuts, chemicals or heat",
      "Foot injuries from crushing or puncture hazards",
      "Respiratory exposure to dust, fumes, vapours or gases",
      "Skin exposure to chemicals or hot materials",
      "Incorrect PPE selection or poor fit",
    ],
    tr: [
      "Göz ve yüz yaralanmaları",
      "Darbe veya düşen cisimlerden kaynaklanan baş yaralanmaları",
      "Aşırı gürültü nedeniyle işitme kaybı",
      "Kesilme, kimyasal veya ısı kaynaklı el yaralanmaları",
      "Ezilme veya delinme tehlikesinden kaynaklanan ayak yaralanmaları",
      "Toz, duman, buhar veya gazlara solunum yoluyla maruziyet",
      "Kimyasallara veya sıcak malzemelere cilt maruziyeti",
      "Yanlış KKD seçimi veya uygun olmayan beden",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet where head hazards exist",
      "Safety glasses or goggles",
      "Face shield for splash, impact or heat hazards",
      "Task-specific protective gloves",
      "Safety footwear",
      "Hearing protection where exposure limits may be exceeded",
      "Protective clothing suitable for the hazard",
      "Respiratory protection where required by assessment",
    ],
    tr: [
      "Baş tehlikesi bulunan alanlarda baret",
      "Güvenlik gözlüğü veya kapalı tip gözlük",
      "Sıçrama, darbe veya ısı tehlikesinde yüz siperi",
      "İşe uygun koruyucu eldiven",
      "İş ayakkabısı",
      "Maruziyet sınırlarının aşılabileceği yerlerde kulak koruyucu",
      "Tehlikeye uygun koruyucu kıyafet",
      "Değerlendirmede gerekli görülen solunum koruyucu",
    ],
  },

  controls: {
    en: [
      "Complete a hazard assessment before selecting PPE.",
      "Use engineering and administrative controls before relying on PPE.",
      "Select equipment suitable for the specific hazard and exposure level.",
      "Ensure PPE fits the worker correctly and does not create additional hazards.",
      "Inspect PPE before each use for damage, contamination or wear.",
      "Train workers on correct use, limitations, maintenance and storage.",
      "Replace damaged, expired or contaminated PPE immediately.",
      "Prevent incompatible PPE combinations from reducing protection.",
      "Maintain hygiene and avoid sharing personal equipment where contamination may occur.",
      "Review PPE requirements whenever the task or conditions change.",
    ],
    tr: [
      "KKD seçmeden önce tehlike değerlendirmesini tamamlayın.",
      "KKD'ye güvenmeden önce mühendislik ve idari kontrolleri uygulayın.",
      "Belirli tehlikeye ve maruziyet seviyesine uygun ekipman seçin.",
      "KKD'nin çalışana doğru oturduğunu ve ek tehlike oluşturmadığını doğrulayın.",
      "Her kullanımdan önce hasar, kirlenme ve aşınma kontrolü yapın.",
      "Çalışanları doğru kullanım, sınırlamalar, bakım ve depolama konusunda eğitin.",
      "Hasarlı, süresi geçmiş veya kirlenmiş KKD'yi hemen değiştirin.",
      "Uyumsuz KKD kombinasyonlarının korumayı azaltmasını önleyin.",
      "Hijyeni sağlayın ve kirlenme riski bulunan kişisel ekipmanları ortak kullanmayın.",
      "İş veya koşullar değiştiğinde KKD gereksinimlerini yeniden değerlendirin.",
    ],
  },

  commonMistakes: {
    en: [
      "Treating PPE as the first and only control",
      "Using safety glasses when sealed goggles are required",
      "Wearing damaged helmets or scratched eye protection",
      "Using the wrong glove for the chemical or task",
      "Wearing loose or poorly fitted respiratory protection",
      "Using a face shield without primary eye protection",
      "Failing to replace contaminated PPE",
      "Combining equipment that interferes with fit or protection",
    ],
    tr: [
      "KKD'yi ilk ve tek kontrol yöntemi olarak görmek",
      "Kapalı gözlük gerekirken güvenlik gözlüğü kullanmak",
      "Hasarlı baret veya çizilmiş göz koruyucu kullanmak",
      "Kimyasala veya işe uygun olmayan eldiven seçmek",
      "Gevşek veya yüze oturmayan solunum koruyucu kullanmak",
      "Birincil göz koruması olmadan yalnızca yüz siperi kullanmak",
      "Kirlenmiş KKD'yi değiştirmemek",
      "Birbirinin uyumunu veya korumasını bozan ekipmanları birlikte kullanmak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-use Checklist",
      tr: "Kullanım Öncesi Kontrol Listesi",
    },

    en: [
      "The task hazards have been assessed",
      "Required PPE has been clearly identified",
      "The equipment is the correct type and rating",
      "The size and fit are suitable for the user",
      "The PPE has no visible damage or contamination",
      "Compatibility with other PPE has been checked",
      "The user understands correct use and limitations",
      "Cleaning and storage arrangements are available",
      "Replacement equipment is available where needed",
      "Respiratory equipment requirements have been verified where applicable",
    ],

    tr: [
      "İş tehlikeleri değerlendirildi",
      "Gerekli KKD açıkça belirlendi",
      "Ekipman doğru tip ve koruma sınıfında",
      "Beden ve uyum kullanıcı için uygun",
      "KKD'de görünür hasar veya kirlenme yok",
      "Diğer KKD'lerle uyumu kontrol edildi",
      "Kullanıcı doğru kullanım ve sınırlamaları biliyor",
      "Temizlik ve depolama düzeni mevcut",
      "Gerekli durumlarda yedek ekipman hazır",
      "Uygulanabilir durumlarda solunum koruması gereklilikleri doğrulandı",
    ],
  },

  emergencySection: {
    title: {
      en: "PPE Failure or Exposure",
      tr: "KKD Arızası veya Maruziyet",
    },

    content: {
      en: "Stop the task immediately if PPE fails, becomes damaged, contaminated or unsuitable for changing conditions. Leave the hazard area safely, obtain replacement equipment and report any suspected exposure or injury for assessment.",
      tr: "KKD arızalanır, hasar görür, kirlenir veya değişen koşullara uygun olmaktan çıkarsa işi derhal durdurun. Tehlikeli alandan güvenli şekilde ayrılın, uygun yedek ekipman alın ve şüpheli maruziyet veya yaralanmayı değerlendirme için bildirin.",
    },
  },

  references: [
    "OSHA 1910.132",
    "OSHA 1910.133",
    "OSHA 1910.134",
    "OSHA 1910.135",
    "OSHA 1910.136",
    "OSHA 1910.138",
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
      slug: "working-at-height",
      icon: "🪜",
      title: {
        en: "Working at Height",
        tr: "Yüksekte Çalışma",
      },
    },
    {
      slug: "grinding",
      icon: "⚙️",
      title: {
        en: "Grinding Safety",
        tr: "Taşlama Güvenliği",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a personal protective equipment question and receive practical guidance based on the knowledge base.",
    tr: "Kişisel koruyucu donanım konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};

export const grindingGuide: SafetyGuide = {
  slug: "grinding",

  category: {
    en: "Work Activity",
    tr: "Çalışma Faaliyeti",
  },

  title: {
    en: "Grinding Operations Safety",
    tr: "Taşlama Operasyonları Güvenliği",
  },

  description: {
    en: "Practical guidance for controlling sparks, flying particles, abrasive-wheel failure, noise, dust, fire and equipment hazards during grinding operations.",
    tr: "Taşlama operasyonlarında kıvılcım, fırlayan parçacıklar, aşındırıcı disk kırılması, gürültü, toz, yangın ve ekipman tehlikelerini kontrol etmek için pratik rehber.",
  },

  overview: {
    en: "Grinding operations can cause severe injuries when machines, abrasive wheels, workpieces or work areas are not properly controlled. Safe grinding requires correct wheel selection, compatible machine speed, effective guarding, pre-use inspection, secure workpieces, suitable PPE and proper control of sparks, dust and combustible materials.",
    tr: "Taşlama operasyonları; makineler, aşındırıcı diskler, iş parçaları veya çalışma alanları doğru şekilde kontrol edilmediğinde ciddi yaralanmalara neden olabilir. Güvenli taşlama; doğru disk seçimi, uyumlu makine devri, etkili koruyucu muhafaza, kullanım öncesi kontrol, iş parçasının sabitlenmesi, uygun KKD ve kıvılcım, toz ile yanıcı malzemelerin doğru kontrolünü gerektirir.",
  },

  readTime: 10,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Abrasive-wheel breakage and high-speed fragments",
      "Flying particles, sparks and hot metal",
      "Eye and face injuries",
      "Cuts, abrasions and hand injuries",
      "Fire caused by sparks reaching combustible materials",
      "Noise exposure and hearing damage",
      "Respiratory exposure to metal dust or hazardous coatings",
      "Entanglement with rotating parts",
      "Electric shock from damaged cables or equipment",
      "Loss of control caused by an unsecured workpiece",
    ],

    tr: [
      "Aşındırıcı diskin kırılması ve yüksek hızlı parçaların fırlaması",
      "Fırlayan parçacıklar, kıvılcımlar ve sıcak metal",
      "Göz ve yüz yaralanmaları",
      "Kesikler, sıyrıklar ve el yaralanmaları",
      "Kıvılcımların yanıcı malzemelere ulaşması sonucu yangın",
      "Gürültü maruziyeti ve işitme kaybı",
      "Metal tozu veya tehlikeli kaplamalara solunum yoluyla maruziyet",
      "Dönen parçalara kapılma",
      "Hasarlı kablo veya ekipmandan elektrik çarpması",
      "Sabitlenmemiş iş parçası nedeniyle kontrol kaybı",
    ],
  },

  requiredPPE: {
    en: [
      "Safety glasses with side protection",
      "Face shield worn over primary eye protection",
      "Suitable task-specific gloves",
      "Hearing protection",
      "Safety footwear",
      "Flame-resistant or non-melting work clothing",
      "Respiratory protection where dust exposure requires it",
      "Safety helmet where overhead hazards exist",
    ],

    tr: [
      "Yan korumalı güvenlik gözlüğü",
      "Birincil göz korumasının üzerine takılan yüz siperi",
      "İşe uygun koruyucu eldiven",
      "Kulak koruyucu",
      "İş ayakkabısı",
      "Alev geciktirici veya erimeyen iş kıyafeti",
      "Toz maruziyetinin gerekli kıldığı durumlarda solunum koruyucu",
      "Baş üstü tehlike bulunan yerlerde baret",
    ],
  },

  controls: {
    en: [
      "Select an abrasive wheel suitable for the machine, material and task.",
      "Confirm that the wheel's rated speed is equal to or greater than the grinder's maximum speed.",
      "Inspect the wheel before use for cracks, chips, contamination or other damage.",
      "Use the correct flanges, backing pads and mounting accessories.",
      "Ensure the machine guard is installed, secure and correctly positioned.",
      "Keep side handles installed and maintain firm two-handed control.",
      "Secure the workpiece using clamps, a vice or another suitable method.",
      "Allow newly mounted wheels to run at operating speed in a protected position before use.",
      "Direct sparks away from people, cables, gas cylinders and combustible materials.",
      "Remove or protect flammable materials and provide fire controls where required.",
      "Use suitable extraction or ventilation to control dust and fumes.",
      "Inspect electrical cables, plugs, switches and the grinder body before use.",
      "Disconnect the power source before changing wheels or making adjustments.",
      "Stop work immediately if excessive vibration, unusual noise or wheel damage is detected.",
    ],

    tr: [
      "Makineye, malzemeye ve işe uygun aşındırıcı disk seçin.",
      "Diskin izin verilen devrinin taşlama makinesinin maksimum devrine eşit veya daha yüksek olduğunu doğrulayın.",
      "Diski kullanmadan önce çatlak, kırık, kirlenme veya diğer hasarlar açısından kontrol edin.",
      "Doğru flanşları, destek pedlerini ve montaj aksesuarlarını kullanın.",
      "Makine koruyucusunun takılı, sağlam ve doğru konumda olduğundan emin olun.",
      "Yan tutma kolunu takılı tutun ve makineyi iki elle sıkıca kontrol edin.",
      "İş parçasını kelepçe, mengene veya başka uygun bir yöntemle sabitleyin.",
      "Yeni takılan diski kullanmadan önce korunaklı bir konumda çalışma devrinde boşta döndürün.",
      "Kıvılcımları insanlardan, kablolardan, gaz tüplerinden ve yanıcı malzemelerden uzağa yönlendirin.",
      "Yanıcı malzemeleri kaldırın veya koruyun ve gerekli yangın önlemlerini sağlayın.",
      "Toz ve dumanı kontrol etmek için uygun emiş veya havalandırma kullanın.",
      "Elektrik kablosunu, fişi, anahtarı ve taşlama makinesinin gövdesini kullanım öncesinde kontrol edin.",
      "Disk değiştirmeden veya ayar yapmadan önce enerji kaynağını kesin.",
      "Aşırı titreşim, olağandışı ses veya disk hasarı tespit edilirse çalışmayı derhal durdurun.",
    ],
  },

  commonMistakes: {
    en: [
      "Using a wheel with a lower speed rating than the grinder",
      "Removing or modifying the machine guard",
      "Using damaged, expired or incorrectly stored abrasive wheels",
      "Using cutting wheels for side grinding",
      "Operating the grinder without the side handle",
      "Holding the workpiece by hand instead of securing it",
      "Using only a face shield without safety glasses",
      "Directing sparks toward people or combustible materials",
      "Changing wheels while the grinder remains connected to power",
      "Applying excessive pressure and forcing the wheel into the material",
    ],

    tr: [
      "Taşlama makinesinden daha düşük devir sınıfına sahip disk kullanmak",
      "Makine koruyucusunu çıkarmak veya değiştirmek",
      "Hasarlı, kullanım süresi geçmiş veya yanlış depolanmış disk kullanmak",
      "Kesme diskini yan yüzeyden taşlama yapmak için kullanmak",
      "Yan tutma kolu olmadan taşlama makinesini çalıştırmak",
      "İş parçasını sabitlemek yerine elle tutmak",
      "Güvenlik gözlüğü olmadan yalnızca yüz siperi kullanmak",
      "Kıvılcımları insanlara veya yanıcı malzemelere yönlendirmek",
      "Makine enerjiye bağlıyken disk değiştirmek",
      "Aşırı baskı uygulayarak diski malzemeye zorlamak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-use Checklist",
      tr: "Kullanım Öncesi Kontrol Listesi",
    },

    en: [
      "The correct grinder and abrasive wheel have been selected",
      "The wheel speed rating is compatible with the machine",
      "The wheel has no visible cracks, chips or damage",
      "The guard is installed and correctly positioned",
      "The side handle is installed and secure",
      "The workpiece has been firmly secured",
      "Electrical cables, plugs and switches are undamaged",
      "Required eye, face, hand, hearing and respiratory protection is available",
      "Combustible materials have been removed or protected",
      "Sparks will be directed into a safe area",
      "Dust extraction or ventilation is available where required",
      "The surrounding area has been inspected and controlled",
    ],

    tr: [
      "Doğru taşlama makinesi ve aşındırıcı disk seçildi",
      "Diskin devir sınıfı makineyle uyumlu",
      "Diskte görünür çatlak, kırık veya hasar yok",
      "Koruyucu muhafaza takılı ve doğru konumda",
      "Yan tutma kolu takılı ve sağlam",
      "İş parçası sıkıca sabitlendi",
      "Elektrik kablosu, fiş ve anahtarlarda hasar yok",
      "Gerekli göz, yüz, el, işitme ve solunum koruması hazır",
      "Yanıcı malzemeler kaldırıldı veya koruma altına alındı",
      "Kıvılcımlar güvenli bir alana yönlendirilecek",
      "Gerekli durumlarda toz emişi veya havalandırma hazır",
      "Çevredeki alan kontrol edildi ve güvence altına alındı",
    ],
  },

  emergencySection: {
    title: {
      en: "Wheel Failure, Fire or Injury",
      tr: "Disk Kırılması, Yangın veya Yaralanma",
    },

    content: {
      en: "Stop the grinder immediately if the wheel breaks, excessive vibration develops, fire starts or a person is injured. Disconnect the power source, keep others away from the area, raise the alarm where required and provide first aid or firefighting response only when trained and conditions are safe.",
      tr: "Disk kırılırsa, aşırı titreşim oluşursa, yangın çıkarsa veya bir kişi yaralanırsa taşlama makinesini derhal durdurun. Enerji kaynağını kesin, diğer kişileri alandan uzak tutun, gerekli olduğunda alarm verin ve yalnızca eğitimliyseniz ve koşullar güvenliyse ilk yardım veya yangın müdahalesi yapın.",
    },
  },

  references: [
    "OSHA 1910.133",
    "OSHA 1910.215",
    "OSHA 1910.242",
    "OSHA 1926.300",
    "OSHA 1926.303",
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
      slug: "hot-work",
      icon: "🔥",
      title: {
        en: "Hot Work Safety",
        tr: "Sıcak Çalışma Güvenliği",
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
    en: "Ask SafeBase AI a grinding-safety question and receive practical guidance based on the knowledge base.",
    tr: "Taşlama güvenliği konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
