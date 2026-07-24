import type { SafetyGuide } from "../../components/GuideTemplate";

export const scaffoldingGuide: SafetyGuide = {
  slug: "scaffolding",

  category: {
    en: "Equipment Safety",
    tr: "Ekipman Güvenliği",
  },

  title: {
    en: "Scaffold Safety",
    tr: "İskele Güvenliği",
  },

  description: {
    en: "Essential guidance for scaffold erection, inspection, access, platform integrity, fall prevention and safe use.",
    tr: "İskele kurulumu, kontrolü, erişim, platform bütünlüğü, düşmenin önlenmesi ve güvenli kullanım için temel rehber.",
  },

  overview: {
    en: "Scaffolds provide temporary access and working platforms but can create severe fall, collapse and falling-object hazards when incorrectly erected, modified or used. Scaffolds should be designed, erected, altered and dismantled by competent persons, inspected before use and maintained in a safe condition throughout the work.",
    tr: "İskeleler geçici erişim ve çalışma platformu sağlar; ancak yanlış kurulduklarında, değiştirildiklerinde veya kullanıldıklarında ciddi düşme, çökme ve düşen cisim tehlikeleri oluşturabilir. İskeleler yetkin kişiler tarafından tasarlanmalı, kurulmalı, değiştirilip sökülmeli, kullanım öncesinde kontrol edilmeli ve çalışma boyunca güvenli durumda tutulmalıdır.",
  },

  readTime: 9,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Falls from open sides, ends or incomplete platforms",
      "Scaffold collapse caused by poor foundations, missing ties or overloading",
      "Falling tools, materials or scaffold components",
      "Unsafe or obstructed access",
      "Missing guardrails, midrails or toe boards",
      "Platform gaps, loose boards or insufficient decking",
      "Contact with overhead electrical lines",
      "Unauthorized alteration or removal of scaffold components",
      "Adverse weather, high winds or slippery platforms",
    ],
    tr: [
      "Açık kenarlardan, uçlardan veya eksik platformlardan düşme",
      "Uygunsuz temel, eksik bağlantılar veya aşırı yükleme nedeniyle iskele çökmesi",
      "Aletlerin, malzemelerin veya iskele parçalarının düşmesi",
      "Güvensiz veya engellenmiş erişim",
      "Eksik korkuluk, ara korkuluk veya topuk levhası",
      "Platform boşlukları, gevşek kalaslar veya yetersiz döşeme",
      "Havai elektrik hatlarıyla temas",
      "Yetkisiz değişiklik veya iskele parçalarının sökülmesi",
      "Olumsuz hava, kuvvetli rüzgâr veya kaygan platformlar",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet with secured chin strap where required",
      "Safety footwear with slip-resistant soles",
      "Suitable work gloves",
      "High-visibility clothing",
      "Full-body harness and approved fall-arrest system when collective protection is incomplete or required by the assessment",
      "Eye protection where work creates flying particles",
    ],
    tr: [
      "Gerekli olduğunda çene bağı sabitlenmiş baret",
      "Kaymaz tabanlı iş ayakkabısı",
      "Uygun iş eldiveni",
      "Yüksek görünürlüklü kıyafet",
      "Toplu koruma tamamlanmamışsa veya değerlendirme gerektiriyorsa tam vücut emniyet kemeri ve onaylı düşüş durdurma sistemi",
      "Çalışma uçuşan parçacık oluşturuyorsa göz koruması",
    ],
  },

  controls: {
    en: [
      "Ensure the scaffold is designed, erected, altered and dismantled by trained and competent persons.",
      "Provide stable foundations using suitable base plates, sole boards and level supporting surfaces.",
      "Install all required ties, braces and stabilizers in accordance with the scaffold design.",
      "Fully deck working platforms and control gaps between boards and structural members.",
      "Provide complete top rails, midrails and toe boards on exposed sides and ends.",
      "Provide safe access using secured ladders, stair towers or purpose-designed access systems.",
      "Display a clear scaffold-status tag and prevent use when the scaffold is incomplete or unsafe.",
      "Inspect the scaffold before first use, after alteration, after severe weather and at required intervals.",
      "Keep platforms free from loose materials, waste, ice, oil and trip hazards.",
      "Respect the scaffold load rating and distribute materials evenly.",
      "Maintain safe clearance from overhead electrical lines.",
      "Prevent unauthorized removal or movement of guardrails, boards, ties and other components.",
    ],
    tr: [
      "İskelenin eğitimli ve yetkin kişiler tarafından tasarlanmasını, kurulmasını, değiştirilmesini ve sökülmesini sağlayın.",
      "Uygun taban plakaları, altlıklar ve düz taşıyıcı yüzeyler kullanarak sağlam temel oluşturun.",
      "Tasarım gerekliliklerine uygun tüm bağlantıları, çaprazları ve dengeleyicileri kurun.",
      "Çalışma platformlarını tamamen döşeyin ve kalaslar ile yapı elemanları arasındaki boşlukları kontrol edin.",
      "Açık kenar ve uçlarda tam üst korkuluk, ara korkuluk ve topuk levhası sağlayın.",
      "Sabitlenmiş merdiven, merdiven kulesi veya amaca uygun erişim sistemi kullanın.",
      "İskele durum etiketini açık şekilde gösterin ve eksik ya da güvensiz iskele kullanımını engelleyin.",
      "İskeleyi ilk kullanımdan önce, değişiklikten sonra, şiddetli hava sonrası ve gerekli aralıklarla kontrol edin.",
      "Platformları gevşek malzeme, atık, buz, yağ ve takılma tehlikelerinden temiz tutun.",
      "İskele yük kapasitesine uyun ve malzemeleri dengeli dağıtın.",
      "Havai elektrik hatlarından güvenli mesafeyi koruyun.",
      "Korkulukların, kalasların, bağlantıların ve diğer parçaların yetkisiz sökülmesini veya yer değiştirmesini önleyin.",
    ],
  },

  commonMistakes: {
    en: [
      "Using a scaffold before inspection or without a valid status tag",
      "Climbing scaffold frames instead of using designated access",
      "Working from incomplete or partially decked platforms",
      "Removing guardrails or boards to create temporary access",
      "Overloading platforms with materials and equipment",
      "Leaving loose tools or materials near platform edges",
      "Using damaged, bent or incompatible scaffold components",
      "Moving a mobile scaffold while workers remain on the platform",
      "Continuing work during high winds or severe weather",
    ],
    tr: [
      "Kontrol yapılmadan veya geçerli durum etiketi olmadan iskeleyi kullanmak",
      "Belirlenmiş erişim yerine iskele çerçevelerine tırmanmak",
      "Eksik veya kısmen döşenmiş platformlarda çalışmak",
      "Geçici erişim oluşturmak için korkuluk veya kalas sökmek",
      "Platformları malzeme ve ekipmanla aşırı yüklemek",
      "Gevşek alet veya malzemeleri platform kenarlarında bırakmak",
      "Hasarlı, eğilmiş veya uyumsuz iskele parçaları kullanmak",
      "Çalışanlar platformdayken mobil iskeleyi hareket ettirmek",
      "Kuvvetli rüzgâr veya şiddetli hava koşullarında çalışmaya devam etmek",
    ],
  },

  checklist: {
    title: {
      en: "Pre-use Scaffold Checklist",
      tr: "Kullanım Öncesi İskele Kontrol Listesi",
    },
    en: [
      "The scaffold has been inspected by a competent person",
      "A valid scaffold-status tag is displayed",
      "Foundations, base plates and sole boards are stable",
      "Ties, braces and stabilizers are installed",
      "Platforms are fully decked and boards are secured",
      "Top rails, midrails and toe boards are complete",
      "Safe and unobstructed access is available",
      "The scaffold is free from visible damage or unauthorized alteration",
      "Platforms are clean and free from loose materials",
      "The intended load is within the scaffold capacity",
      "Electrical-line clearance is adequate",
      "Weather conditions are suitable for safe use",
    ],
    tr: [
      "İskele yetkin bir kişi tarafından kontrol edildi",
      "Geçerli iskele durum etiketi görünür durumda",
      "Temeller, taban plakaları ve altlıklar sağlam",
      "Bağlantılar, çaprazlar ve dengeleyiciler kurulu",
      "Platformlar tamamen döşenmiş ve kalaslar sabitlenmiş",
      "Üst korkuluk, ara korkuluk ve topuk levhaları eksiksiz",
      "Güvenli ve engelsiz erişim mevcut",
      "İskelede görünür hasar veya yetkisiz değişiklik yok",
      "Platformlar temiz ve gevşek malzemelerden arındırılmış",
      "Planlanan yük iskele kapasitesi içinde",
      "Elektrik hatlarına güvenli mesafe yeterli",
      "Hava koşulları güvenli kullanım için uygun",
    ],
  },

  emergencySection: {
    title: {
      en: "Unsafe Scaffold and Emergency Response",
      tr: "Güvensiz İskele ve Acil Durum Müdahalesi",
    },
    content: {
      en: "Stop work immediately if the scaffold moves, leans, settles, becomes damaged, loses ties or guardrails, or shows any sign of instability. Evacuate the platform using the safest available route, isolate the area below and prevent further use. Do not attempt unauthorized repairs. A competent scaffold person must inspect the structure and approve any corrective action before the scaffold is returned to service.",
      tr: "İskele hareket eder, eğilir, çöker, hasar görür, bağlantı veya korkuluk kaybeder ya da herhangi bir dengesizlik belirtisi gösterirse çalışmayı derhal durdurun. Platformu en güvenli mevcut güzergâhtan tahliye edin, alt bölgeyi izole edin ve kullanımını engelleyin. Yetkisiz onarım yapmayın. İskele yeniden kullanıma alınmadan önce yetkin bir iskele personeli yapıyı kontrol etmeli ve düzeltici işlemleri onaylamalıdır.",
    },
  },

  references: [
    "OSHA 1926.450",
    "OSHA 1926.451",
    "OSHA 1926.452",
    "OSHA 1926.454",
  ],

  relatedGuides: [
    {
      slug: "working-at-height",
      icon: "🪜",
      title: {
        en: "Working at Height Safety",
        tr: "Yüksekte Çalışma Güvenliği",
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
      slug: "excavation",
      icon: "🚧",
      title: {
        en: "Excavation and Trenching",
        tr: "Kazı ve Hendek Çalışmaları",
      },
    },
  ],

  searchKeywords: {
    en: [
      "scaffold",
      "scaffolding",
      "scaffold safety",
      "scaffold work",
      "working on scaffold",
      "mobile scaffold",
      "steel scaffold",
      "working platform",
      "temporary platform",
      "scaffold inspection",
      "scaffold tag",
      "scaffold access",
      "scaffold guardrail",
      "scaffold collapse",
      "scaffold erection",
      "scaffold dismantling",
      "scaffold platform",
    ],
    tr: [
      "iskele",
      "iskelede",
      "iskeleyi",
      "iskeleye",
      "iskeleden",
      "iskelede çalışma",
      "iskele güvenliği",
      "iskele önlemleri",
      "iskele kontrolü",
      "iskele denetimi",
      "iskele kurulumu",
      "iskele sökümü",
      "mobil iskele",
      "çelik iskele",
      "çalışma platformu",
      "geçici platform",
      "iskele etiketi",
      "iskele kartı",
      "iskele erişimi",
      "iskele korkuluğu",
      "iskele çökmesi",
      "platform güvenliği",
      "iskelede alınacak önlemler",
    ],
  },

  aiText: {
    en: "Ask SafeBase AI a scaffold-safety question and receive practical guidance based on the knowledge base.",
    tr: "İskele güvenliği konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
