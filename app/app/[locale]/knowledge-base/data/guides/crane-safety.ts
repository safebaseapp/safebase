import type { SafetyGuide } from "../../components/GuideTemplate";

export const craneSafetyGuide: SafetyGuide = {
  slug: "crane-safety",

  category: {
    en: "Lifting Operations",
    tr: "Kaldırma Operasyonları",
  },

  title: {
    en: "Crane & Lifting Safety",
    tr: "Vinç ve Kaldırma Güvenliği",
  },

  description: {
    en: "Professional guidance for planning, controlling and performing crane and lifting operations safely.",
    tr: "Vinç ve kaldırma operasyonlarının güvenli şekilde planlanması, kontrol edilmesi ve gerçekleştirilmesi için profesyonel rehber.",
  },

  overview: {
    en: "Crane and lifting operations can expose workers to suspended loads, equipment overturning, dropped objects, crushing hazards and contact with structures or electrical lines. Every lift should be properly planned, supervised and performed by trained personnel using certified equipment. Critical lifts require additional engineering review, communication and control measures.",
    tr: "Vinç ve kaldırma operasyonları çalışanları askıdaki yükler, ekipmanın devrilmesi, düşen cisimler, sıkışma tehlikeleri ve yapı ya da elektrik hatlarıyla temas risklerine maruz bırakabilir. Her kaldırma işi uygun şekilde planlanmalı, denetlenmeli ve sertifikalı ekipman kullanan eğitimli personel tarafından gerçekleştirilmelidir. Kritik kaldırmalar ek mühendislik değerlendirmesi, iletişim ve kontrol önlemleri gerektirir.",
  },

  readTime: 10,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Dropped or uncontrolled suspended loads",
      "Crane overturning due to unstable ground or incorrect outrigger setup",
      "Workers entering the suspended-load exclusion zone",
      "Crushing and trapping between the load and fixed structures",
      "Failure of slings, shackles, hooks or lifting accessories",
      "Overloading the crane or lifting equipment",
      "Incorrect load weight or center-of-gravity assessment",
      "Contact with overhead electrical lines",
      "Poor communication between the operator, rigger and signal person",
      "High winds, poor visibility or adverse weather",
      "Unexpected load movement, rotation or snagging",
      "Unauthorized personnel entering the lifting area",
    ],
    tr: [
      "Yükün düşmesi veya kontrolsüz hareket etmesi",
      "Dengesiz zemin veya hatalı ayak kurulumu nedeniyle vincin devrilmesi",
      "Çalışanların askıdaki yükün yasak bölgesine girmesi",
      "Yük ile sabit yapılar arasında ezilme veya sıkışma",
      "Sapan, mapa, kanca veya kaldırma aksesuarlarının arızalanması",
      "Vinç veya kaldırma ekipmanının aşırı yüklenmesi",
      "Yük ağırlığının veya ağırlık merkezinin yanlış değerlendirilmesi",
      "Havai elektrik hatlarıyla temas",
      "Operatör, sapancı ve işaretçi arasındaki yetersiz iletişim",
      "Kuvvetli rüzgâr, düşük görüş veya olumsuz hava koşulları",
      "Yükün beklenmeyen şekilde hareket etmesi, dönmesi veya takılması",
      "Yetkisiz kişilerin kaldırma alanına girmesi",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet with secured chin strap where required",
      "Safety footwear with toe protection",
      "High-visibility clothing",
      "Suitable work gloves",
      "Safety glasses where flying-particle hazards exist",
      "Fall-protection equipment when working at height",
      "Hearing protection where noise exposure requires it",
    ],
    tr: [
      "Gerekli olduğunda çene bağı sabitlenmiş baret",
      "Burun korumalı iş güvenliği ayakkabısı",
      "Yüksek görünürlüklü kıyafet",
      "Uygun iş eldiveni",
      "Uçuşan parçacık riski varsa koruyucu gözlük",
      "Yüksekte çalışmada düşmeye karşı koruyucu ekipman",
      "Gürültü maruziyeti gerektiriyorsa kulak koruyucu",
    ],
  },

  controls: {
    en: [
      "Prepare an approved lifting plan before the operation begins.",
      "Confirm the load weight, dimensions, center of gravity and lifting points.",
      "Use a crane with sufficient rated capacity for the planned radius and configuration.",
      "Verify that the crane, slings, shackles, hooks and lifting accessories have valid inspection certification.",
      "Inspect all lifting equipment before use and remove damaged items from service.",
      "Assess ground-bearing capacity and provide suitable outrigger mats or supporting materials.",
      "Fully deploy outriggers as required by the manufacturer and lifting plan.",
      "Establish and barricade an exclusion zone around the lifting operation.",
      "Never allow personnel to stand or pass beneath a suspended load.",
      "Assign trained and authorized operators, riggers and signal persons.",
      "Use one designated signal person and agreed standard hand signals or radio communication.",
      "Use tag lines where they can safely control load rotation and movement.",
      "Maintain safe clearance from overhead electrical lines.",
      "Monitor wind speed and stop lifting when limits are exceeded.",
      "Perform a trial lift to confirm balance, rigging security and crane stability.",
      "Stop the operation immediately if communication is lost or unsafe conditions develop.",
    ],
    tr: [
      "Operasyon başlamadan önce onaylı bir kaldırma planı hazırlayın.",
      "Yükün ağırlığını, boyutlarını, ağırlık merkezini ve kaldırma noktalarını doğrulayın.",
      "Planlanan yarıçap ve konfigürasyon için yeterli kapasiteye sahip vinç kullanın.",
      "Vinç, sapan, mapa, kanca ve kaldırma aksesuarlarının geçerli kontrol sertifikalarına sahip olduğunu doğrulayın.",
      "Tüm kaldırma ekipmanlarını kullanımdan önce kontrol edin ve hasarlı ekipmanları kullanımdan çıkarın.",
      "Zemin taşıma kapasitesini değerlendirin ve uygun ayak altlıkları veya destek malzemeleri sağlayın.",
      "Üretici talimatları ve kaldırma planına uygun şekilde vinç ayaklarını tamamen açın.",
      "Kaldırma operasyonu çevresinde bariyerli yasak bölge oluşturun.",
      "Personelin askıdaki yükün altında durmasına veya geçmesine asla izin vermeyin.",
      "Eğitimli ve yetkili operatör, sapancı ve işaretçi görevlendirin.",
      "Tek bir belirlenmiş işaretçi ve kararlaştırılmış el işaretleri veya telsiz iletişimi kullanın.",
      "Yükün dönmesini ve hareketini güvenli şekilde kontrol etmek için gerektiğinde yönlendirme halatı kullanın.",
      "Havai elektrik hatlarından güvenli mesafeyi koruyun.",
      "Rüzgâr hızını takip edin ve limitler aşıldığında kaldırmayı durdurun.",
      "Dengeyi, sapan güvenliğini ve vinç stabilitesini doğrulamak için deneme kaldırması yapın.",
      "İletişim kesilirse veya güvensiz koşullar oluşursa operasyonu derhal durdurun.",
    ],
  },

  commonMistakes: {
    en: [
      "Starting a lift without an approved lifting plan",
      "Guessing the load weight",
      "Using uncertified or damaged lifting accessories",
      "Standing or walking beneath a suspended load",
      "Allowing multiple people to give signals to the crane operator",
      "Using the crane outside its rated capacity",
      "Failing to establish an exclusion zone",
      "Using incorrect sling angles or rigging configurations",
      "Dragging or side-loading the lifting equipment",
      "Operating on unstable ground without proper support",
      "Continuing the lift during excessive wind or poor visibility",
      "Leaving a suspended load unattended",
    ],
    tr: [
      "Onaylı kaldırma planı olmadan işe başlamak",
      "Yük ağırlığını tahmin etmek",
      "Sertifikasız veya hasarlı kaldırma aksesuarı kullanmak",
      "Askıdaki yükün altında durmak veya yürümek",
      "Birden fazla kişinin vinç operatörüne işaret vermesine izin vermek",
      "Vinci kapasite sınırlarının dışında kullanmak",
      "Yasak bölge oluşturmamak",
      "Yanlış sapan açıları veya uygunsuz bağlama düzeni kullanmak",
      "Kaldırma ekipmanını sürüklemek veya yana doğru yüklemek",
      "Uygun destek olmadan dengesiz zeminde çalışmak",
      "Aşırı rüzgâr veya düşük görüş koşullarında kaldırmaya devam etmek",
      "Askıdaki yükü gözetimsiz bırakmak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-lift Safety Checklist",
      tr: "Kaldırma Öncesi Güvenlik Kontrol Listesi",
    },
    en: [
      "An approved lifting plan is available",
      "The load weight and center of gravity are confirmed",
      "The crane capacity is adequate for the planned radius",
      "The operator, rigger and signal person are authorized",
      "Crane and lifting-equipment certificates are valid",
      "Slings, shackles, hooks and accessories are inspected",
      "Ground conditions and outrigger supports are suitable",
      "The exclusion zone is established and barricaded",
      "Overhead electrical-line clearance is adequate",
      "Weather and wind conditions are acceptable",
      "Communication method and hand signals are agreed",
      "The lifting route and landing area are clear",
      "Tag lines are available where required",
      "No unauthorized person is inside the lifting zone",
      "Emergency stop arrangements are understood",
    ],
    tr: [
      "Onaylı kaldırma planı mevcut",
      "Yük ağırlığı ve ağırlık merkezi doğrulandı",
      "Vinç kapasitesi planlanan yarıçap için yeterli",
      "Operatör, sapancı ve işaretçi yetkili",
      "Vinç ve kaldırma ekipmanı sertifikaları geçerli",
      "Sapan, mapa, kanca ve aksesuarlar kontrol edildi",
      "Zemin koşulları ve ayak destekleri uygun",
      "Yasak bölge oluşturuldu ve bariyerlendi",
      "Havai elektrik hatlarına güvenli mesafe yeterli",
      "Hava ve rüzgâr koşulları uygun",
      "İletişim yöntemi ve el işaretleri kararlaştırıldı",
      "Kaldırma güzergâhı ve indirme alanı açık",
      "Gerektiğinde yönlendirme halatları hazır",
      "Kaldırma bölgesinde yetkisiz kişi yok",
      "Acil durdurma düzenlemeleri anlaşıldı",
    ],
  },

  emergencySection: {
    title: {
      en: "Lifting Emergency Response",
      tr: "Kaldırma Operasyonu Acil Durum Müdahalesi",
    },
    content: {
      en: "Stop the operation immediately if the load becomes unstable, lifting equipment fails, communication is lost, the crane moves unexpectedly or any person enters the exclusion zone. If safe, lower the load to a secure position. Isolate the area, notify the lifting supervisor and prevent further use of the equipment. Do not approach a fallen load, damaged crane or energized equipment until the area has been assessed and declared safe by competent personnel.",
      tr: "Yük dengesiz hale gelirse, kaldırma ekipmanı arızalanırsa, iletişim kesilirse, vinç beklenmedik şekilde hareket ederse veya herhangi bir kişi yasak bölgeye girerse operasyonu derhal durdurun. Güvenliyse yükü emniyetli bir konuma indirin. Alanı izole edin, kaldırma sorumlusuna haber verin ve ekipmanın tekrar kullanılmasını engelleyin. Düşmüş yüke, hasarlı vince veya enerjili ekipmana, yetkin personel alanı değerlendirip güvenli ilan etmeden yaklaşmayın.",
    },
  },

  references: [
    "OSHA 1926 Subpart CC",
    "OSHA 1926.1400",
    "OSHA 1926.1412",
    "OSHA 1926.1417",
    "OSHA 1926.1425",
    "OSHA 1926.1428",
  ],

  relatedGuides: [
    {
      slug: "working-at-height",
      icon: "🪜",
      title: {
        en: "Working at Height",
        tr: "Yüksekte Çalışma",
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
      slug: "ppe",
      icon: "🦺",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a crane or lifting-safety question and receive practical guidance based on the knowledge base.",
    tr: "Vinç veya kaldırma güvenliği konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
