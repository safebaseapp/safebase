import type { SafetyGuide } from "../../components/GuideTemplate";

export const manualHandlingGuide: SafetyGuide = {
  slug: "manual-handling",

  category: {
    en: "Work Activity",
    tr: "Çalışma Faaliyeti",
  },

  title: {
    en: "Manual Handling Safety",
    tr: "Elle Taşıma Güvenliği",
  },

  description: {
    en: "Practical guidance for planning and performing lifting, carrying, pushing and pulling tasks while reducing musculoskeletal injury risks.",
    tr: "Kaldırma, taşıma, itme ve çekme işlerinin planlanması ve kas-iskelet sistemi yaralanma risklerinin azaltılması için pratik rehber.",
  },

  overview: {
    en: "Manual handling injuries commonly result from excessive load weight, awkward posture, repetitive movement, poor grip or unsuitable working conditions. Every task should be assessed before work begins, and mechanical assistance should be used whenever reasonably practicable.",
    tr: "Elle taşıma yaralanmaları genellikle aşırı yük ağırlığı, uygunsuz duruş, tekrarlanan hareketler, yetersiz kavrama veya uygun olmayan çalışma koşullarından kaynaklanır. Her iş başlamadan önce değerlendirilmeli ve makul ölçüde uygulanabildiği durumlarda mekanik yardım kullanılmalıdır.",
  },

  readTime: 9,

  riskLevel: {
    en: "Medium Risk",
    tr: "Orta Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Back, shoulder and neck injuries",
      "Muscle strains and ligament sprains",
      "Crushed fingers, hands or feet",
      "Loss of balance while carrying a load",
      "Dropped or uncontrolled loads",
      "Awkward bending, twisting or reaching",
      "Repetitive movement and cumulative strain",
      "Poor visibility while carrying large objects",
      "Slips and trips along the transport route",
      "Unexpected movement of unstable contents",
    ],
    tr: [
      "Bel, omuz ve boyun yaralanmaları",
      "Kas zorlanmaları ve bağ incinmeleri",
      "Parmak, el veya ayakların ezilmesi",
      "Yük taşırken dengenin kaybedilmesi",
      "Yükün düşmesi veya kontrolsüz hareket etmesi",
      "Uygunsuz eğilme, dönme veya uzanma hareketleri",
      "Tekrarlanan hareketler ve birikimli zorlanma",
      "Büyük cisimleri taşırken görüşün kapanması",
      "Taşıma güzergâhındaki kayma ve takılma tehlikeleri",
      "Dengesiz içeriğin beklenmedik şekilde hareket etmesi",
    ],
  },

  requiredPPE: {
    en: [
      "Safety footwear with suitable toe protection",
      "Task-appropriate protective gloves",
      "Safety helmet where overhead hazards exist",
      "High-visibility clothing in vehicle or mobile-equipment areas",
      "Additional PPE identified by the task risk assessment",
    ],
    tr: [
      "Uygun burun korumasına sahip iş ayakkabısı",
      "İşe uygun koruyucu eldiven",
      "Üstten gelebilecek tehlikelerin bulunduğu alanlarda baret",
      "Araç veya hareketli ekipman alanlarında yüksek görünürlüklü kıyafet",
      "İş risk değerlendirmesinde belirlenen ilave KKD'ler",
    ],
  },

  controls: {
    en: [
      "Assess the load, individual capability, task and working environment before handling begins.",
      "Eliminate unnecessary manual handling by changing the work method or delivery location.",
      "Use cranes, hoists, forklifts, pallet trucks, trolleys or lifting aids where practicable.",
      "Check the load weight, size, stability, sharp edges, temperature and available handholds.",
      "Plan the route and remove obstacles, slippery materials and trip hazards.",
      "Position the body close to the load and establish a stable stance before lifting.",
      "Bend the knees and hips while maintaining a natural and controlled back position.",
      "Avoid twisting the torso; turn by moving the feet.",
      "Keep the load close to the body and between approximately knee and shoulder height.",
      "Use team lifting only when the task is coordinated and one person controls the movement.",
      "Separate large or heavy loads into smaller units whenever possible.",
      "Take suitable recovery breaks during repetitive or prolonged handling work.",
      "Stop the task if the load shifts, visibility is blocked or control cannot be maintained.",
      "Provide training and practical instruction appropriate to the actual handling tasks.",
    ],
    tr: [
      "Taşımaya başlamadan önce yükü, kişinin kapasitesini, işi ve çalışma ortamını değerlendirin.",
      "Çalışma yöntemini veya teslimat konumunu değiştirerek gereksiz elle taşımayı ortadan kaldırın.",
      "Uygulanabildiği durumlarda vinç, caraskal, forklift, transpalet, taşıma arabası veya kaldırma yardımcısı kullanın.",
      "Yükün ağırlığını, boyutunu, dengesini, keskin kenarlarını, sıcaklığını ve kavrama noktalarını kontrol edin.",
      "Güzergâhı planlayın; engelleri, kaygan maddeleri ve takılma tehlikelerini kaldırın.",
      "Kaldırmadan önce vücudu yüke yaklaştırın ve dengeli bir duruş oluşturun.",
      "Sırtı doğal ve kontrollü konumda tutarak dizlerden ve kalçadan bükülün.",
      "Gövdeyi döndürmekten kaçının; ayakları hareket ettirerek yön değiştirin.",
      "Yükü vücuda yakın ve mümkün olduğunca diz ile omuz yüksekliği arasında tutun.",
      "Ekip halinde kaldırmayı yalnızca iş koordine edildiğinde ve hareketi bir kişi yönettiğinde uygulayın.",
      "Mümkün olduğunda büyük veya ağır yükleri daha küçük parçalara ayırın.",
      "Tekrarlanan veya uzun süreli taşıma işlerinde uygun dinlenme araları verin.",
      "Yük kayarsa, görüş kapanırsa veya kontrol sürdürülemezse işi durdurun.",
      "Gerçek taşıma işlerine uygun eğitim ve uygulamalı talimat sağlayın.",
    ],
  },

  commonMistakes: {
    en: [
      "Attempting to lift a load without checking its weight",
      "Lifting while the feet are unstable or too close together",
      "Holding the load away from the body",
      "Twisting the back while carrying or placing the load",
      "Carrying an object that blocks forward visibility",
      "Using team lifting without clear communication",
      "Assuming gloves or a lifting belt remove the handling risk",
      "Ignoring poor access, stairs or slippery surfaces",
      "Continuing after pain, numbness or loss of control develops",
      "Using manual effort when suitable mechanical equipment is available",
    ],
    tr: [
      "Ağırlığı kontrol etmeden yükü kaldırmaya çalışmak",
      "Ayaklar dengesiz veya birbirine çok yakınken kaldırmak",
      "Yükü vücuttan uzakta tutmak",
      "Yükü taşırken veya bırakırken beli döndürmek",
      "İleri görüşü kapatan bir cismi taşımak",
      "Net iletişim kurmadan ekip halinde kaldırma yapmak",
      "Eldivenin veya bel kemerinin taşıma riskini ortadan kaldırdığını düşünmek",
      "Uygun olmayan erişimi, merdivenleri veya kaygan yüzeyleri göz ardı etmek",
      "Ağrı, uyuşma veya kontrol kaybı oluşmasına rağmen devam etmek",
      "Uygun mekanik ekipman mevcutken yalnızca insan gücü kullanmak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-task Checklist",
      tr: "İş Öncesi Kontrol Listesi",
    },

    en: [
      "The handling task and route have been assessed",
      "The load weight and stability are known",
      "Mechanical assistance has been considered",
      "The load has suitable and secure handholds",
      "The route is clear, illuminated and free from slip or trip hazards",
      "The destination area is ready to receive the load",
      "The worker can maintain clear visibility",
      "Team members understand the lifting command and sequence",
      "Required PPE is available and suitable",
      "The task can be stopped safely if control is lost",
    ],

    tr: [
      "Taşıma işi ve güzergâh değerlendirildi",
      "Yükün ağırlığı ve dengesi biliniyor",
      "Mekanik yardım kullanımı değerlendirildi",
      "Yükün uygun ve güvenli kavrama noktaları bulunuyor",
      "Güzergâh açık, aydınlatılmış ve kayma veya takılma tehlikelerinden arındırılmış",
      "Yükün bırakılacağı alan hazır",
      "Çalışan görüşünü açık şekilde sürdürebiliyor",
      "Ekip üyeleri kaldırma komutunu ve sırasını biliyor",
      "Gerekli KKD'ler mevcut ve uygun",
      "Kontrol kaybedilirse iş güvenli şekilde durdurulabiliyor",
    ],
  },

  emergencySection: {
    title: {
      en: "Injury or Dropped Load",
      tr: "Yaralanma veya Yükün Düşmesi",
    },

    content: {
      en: "Stop work immediately if a person experiences sudden pain, numbness, loss of strength or if a load becomes unstable or falls. Secure the area, do not attempt an uncontrolled recovery lift, provide first aid and obtain medical assessment when required.",
      tr: "Bir kişide ani ağrı, uyuşma veya güç kaybı oluşursa ya da yük dengesizleşir veya düşerse işi derhal durdurun. Alanı güvence altına alın, kontrolsüz bir kurtarma kaldırması yapmayın, ilk yardım sağlayın ve gerekli olduğunda tıbbi değerlendirme alın.",
    },
  },

  references: [
    "OSHA 29 CFR 1910.176",
    "OSHA 29 CFR 1910 Subpart N",
    "OSHA Ergonomics – Guidelines for Manual Material Handling",
    "NIOSH 94-110 – Applications Manual for the Revised NIOSH Lifting Equation",
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
      slug: "crane-safety",
      icon: "🏗️",
      title: {
        en: "Crane and Lifting Safety",
        tr: "Vinç ve Kaldırma Güvenliği",
      },
    },
    {
      slug: "permit-to-work",
      icon: "📋",
      title: {
        en: "Permit to Work",
        tr: "Çalışma İzni Sistemi",
      },
    },
  ],

  aiText: {
    en: "Ask Sernem AI a manual-handling question and receive practical guidance based on the knowledge base.",
    tr: "Elle taşıma konusunda Sernem AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
