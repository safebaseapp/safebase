import type { SafetyGuide } from "../../components/GuideTemplate";

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
