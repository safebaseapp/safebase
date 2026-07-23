import type { SafetyGuide } from "../../components/GuideTemplate";

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
