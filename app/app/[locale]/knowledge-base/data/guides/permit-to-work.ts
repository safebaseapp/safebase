import type { SafetyGuide } from "../../components/GuideTemplate";

export const permitToWorkGuide: SafetyGuide = {
  slug: "permit-to-work",

  category: {
    en: "Work Control",
    tr: "İş Kontrolü",
  },

  title: {
    en: "Permit to Work",
    tr: "Çalışma İzni Sistemi",
  },

  description: {
    en: "Professional guidance for planning, authorizing, controlling, suspending and closing high-risk work activities.",
    tr: "Yüksek riskli işlerin planlanması, yetkilendirilmesi, kontrol edilmesi, askıya alınması ve kapatılması için profesyonel rehber.",
  },

  overview: {
    en: "A Permit to Work (PTW) is a formal authorization and communication system used to control high-risk work. It confirms that the work scope, hazards, risk controls, isolations, responsible persons and emergency arrangements have been reviewed before work begins. A permit does not replace a risk assessment, job safety analysis, competent supervision or safe work procedure. It brings these controls together and authorizes the work for a defined location, activity and period.",
    tr: "Çalışma İzni (Permit to Work - PTW), yüksek riskli işleri kontrol etmek için kullanılan resmi bir yetkilendirme ve iletişim sistemidir. İş başlamadan önce iş kapsamının, tehlikelerin, risk kontrol önlemlerinin, izolasyonların, sorumlu kişilerin ve acil durum düzenlemelerinin değerlendirildiğini doğrular. Çalışma izni; risk değerlendirmesinin, iş güvenliği analizinin, yetkin gözetimin veya güvenli çalışma prosedürünün yerine geçmez. Bu kontrolleri bir araya getirir ve işi belirli bir alan, faaliyet ve süre için yetkilendirir.",
  },

  readTime: 12,

  riskLevel: {
    en: "Critical Control",
    tr: "Kritik Kontrol",
  },

  standard: "OSHA / Site PTW Procedure",

  hazards: {
    en: [
      "Work starting without authorization",
      "Incorrect or incomplete work scope",
      "Failure to identify simultaneous operations",
      "Unexpected energization or release of stored energy",
      "Fire and explosion",
      "Toxic, flammable or oxygen-deficient atmospheres",
      "Opening pressurized equipment or process lines",
      "Electrical contact and arc-flash exposure",
      "Falls from height and falling objects",
      "Confined-space entry hazards",
      "Interaction with vehicles or mobile equipment",
      "Uncontrolled changes in site conditions",
      "Poor shift handover or permit transfer",
      "Expired, suspended or incorrectly closed permits",
      "Communication failure between work groups",
    ],

    tr: [
      "İşe yetki alınmadan başlanması",
      "Yanlış veya eksik tanımlanmış iş kapsamı",
      "Eş zamanlı operasyonların belirlenmemesi",
      "Beklenmeyen enerjilenme veya depolanmış enerjinin boşalması",
      "Yangın ve patlama",
      "Zehirli, yanıcı veya oksijeni yetersiz atmosfer",
      "Basınçlı ekipman veya proses hatlarının açılması",
      "Elektrik teması ve ark parlaması maruziyeti",
      "Yüksekten düşme ve düşen cisimler",
      "Kapalı alana giriş tehlikeleri",
      "Araçlar veya hareketli ekipmanlarla etkileşim",
      "Saha koşullarındaki kontrolsüz değişiklikler",
      "Yetersiz vardiya teslimi veya izin devri",
      "Süresi dolmuş, askıya alınmış veya yanlış kapatılmış izinler",
      "Çalışma grupları arasındaki iletişim eksikliği",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet",
      "Safety glasses",
      "Safety footwear",
      "Suitable work clothing",
      "Task-specific gloves",
      "Hearing protection where required",
      "Respiratory protection where required",
      "Fall-protection equipment where required",
      "Additional PPE specified by the risk assessment and permit",
    ],

    tr: [
      "Koruyucu baret",
      "Güvenlik gözlüğü",
      "İş güvenliği ayakkabısı",
      "Uygun iş kıyafeti",
      "İşe uygun eldiven",
      "Gerekli durumlarda kulak koruyucu",
      "Gerekli durumlarda solunum koruyucu",
      "Gerekli durumlarda düşüş durdurma ekipmanı",
      "Risk değerlendirmesi ve çalışma izninde belirtilen ilave KKD",
    ],
  },

  controls: {
    en: [
      "Define the exact work scope, location, equipment and expected duration.",
      "Select the correct permit type for the planned activity.",
      "Complete a task-specific risk assessment or JSA before authorization.",
      "Identify simultaneous operations and possible conflicts with nearby work.",
      "Confirm that personnel are trained, competent and medically fit where required.",
      "Identify all electrical, mechanical, hydraulic, pneumatic, chemical, thermal and pressure energy sources.",
      "Apply the required isolation and lockout/tagout controls.",
      "Verify isolation effectiveness before work starts.",
      "Complete atmospheric testing when flammable, toxic or oxygen-related hazards may exist.",
      "Record gas-test results, test time and tester details on the permit.",
      "Provide the required PPE, tools, barriers and emergency equipment.",
      "Inspect the worksite jointly before issuing and accepting the permit.",
      "Ensure the permit issuer and permit receiver understand the work and controls.",
      "Conduct a toolbox talk with everyone involved in the task.",
      "Display or keep the approved permit at the work location.",
      "Monitor site conditions and compliance throughout the work.",
      "Stop and suspend work when conditions, personnel, equipment or work scope change.",
      "Revalidate or issue a new permit before restarting suspended or changed work.",
      "Conduct a formal shift handover when work continues across shifts.",
      "Inspect the worksite after completion and confirm it is left in a safe condition.",
      "Remove isolations only through the approved authorization process.",
      "Close and archive the permit according to the site procedure.",
    ],

    tr: [
      "İşin tam kapsamını, yerini, ekipmanını ve beklenen süresini tanımlayın.",
      "Planlanan faaliyet için doğru çalışma izni türünü seçin.",
      "Yetkilendirme öncesinde işe özel risk değerlendirmesi veya JSA hazırlayın.",
      "Eş zamanlı operasyonları ve yakındaki işlerle oluşabilecek çakışmaları belirleyin.",
      "Personelin gerekli eğitim, yetkinlik ve sağlık şartlarını karşıladığını doğrulayın.",
      "Tüm elektriksel, mekanik, hidrolik, pnömatik, kimyasal, termal ve basınç enerjilerini belirleyin.",
      "Gerekli izolasyon ve kilitleme-etiketleme önlemlerini uygulayın.",
      "İşe başlamadan önce izolasyonun etkinliğini doğrulayın.",
      "Yanıcı, zehirli veya oksijenle ilgili tehlike ihtimalinde atmosfer ölçümü yapın.",
      "Gaz ölçüm sonuçlarını, ölçüm saatini ve ölçümü yapan kişiyi izne kaydedin.",
      "Gerekli KKD, ekipman, bariyer ve acil durum malzemelerini sağlayın.",
      "İzin verilmeden önce çalışma alanını birlikte kontrol edin.",
      "İzin veren ve izin alan kişilerin işi ve kontrolleri anladığından emin olun.",
      "İşe katılan tüm personelle toolbox toplantısı yapın.",
      "Onaylı çalışma iznini iş alanında bulundurun.",
      "Çalışma boyunca saha koşullarını ve kurallara uyumu takip edin.",
      "Koşullar, personel, ekipman veya iş kapsamı değiştiğinde işi durdurun ve izni askıya alın.",
      "Askıya alınmış veya değişmiş işe başlamadan önce izni yeniden doğrulayın veya yeni izin düzenleyin.",
      "İş vardiyalar arasında devam ediyorsa resmi vardiya teslimi yapın.",
      "İş tamamlandığında alanı kontrol edin ve güvenli bırakıldığını doğrulayın.",
      "İzolasyonları yalnızca onaylı yetkilendirme süreciyle kaldırın.",
      "İzni saha prosedürüne uygun şekilde kapatın ve arşivleyin.",
    ],
  },

  commonMistakes: {
    en: [
      "Treating the permit as paperwork instead of a risk-control process",
      "Starting work before all required signatures are completed",
      "Using a permit that does not match the actual task or location",
      "Copying controls from an old permit without inspecting current conditions",
      "Failing to verify isolation and zero-energy condition",
      "Not identifying nearby or simultaneous work",
      "Changing the work scope without suspending the permit",
      "Continuing work after a gas alarm, emergency alarm or unsafe change",
      "Allowing unlisted personnel to join the work",
      "Using an expired permit",
      "Incomplete shift handover",
      "Closing the permit without inspecting the worksite",
      "Removing locks or isolations before authorization",
      "Leaving the permit at an office instead of the work area",
    ],

    tr: [
      "Çalışma iznini risk kontrol süreci yerine yalnızca evrak olarak görmek",
      "Gerekli imzalar tamamlanmadan işe başlamak",
      "Gerçek iş veya çalışma alanıyla uyuşmayan izin kullanmak",
      "Güncel koşulları kontrol etmeden eski bir izindeki önlemleri kopyalamak",
      "İzolasyonu ve sıfır enerji durumunu doğrulamamak",
      "Yakındaki veya eş zamanlı işleri belirlememek",
      "İş kapsamı değiştiği hâlde izni askıya almamak",
      "Gaz alarmı, acil durum alarmı veya güvensiz değişiklik sonrasında çalışmaya devam etmek",
      "Listede bulunmayan personelin işe katılmasına izin vermek",
      "Süresi dolmuş izin kullanmak",
      "Eksik vardiya teslimi yapmak",
      "Çalışma alanını kontrol etmeden izni kapatmak",
      "Yetki alınmadan kilit veya izolasyonları kaldırmak",
      "İzni çalışma alanı yerine ofiste bırakmak",
    ],
  },

  checklist: {
    title: {
      en: "Permit-to-Work Checklist",
      tr: "Çalışma İzni Kontrol Listesi",
    },

    en: [
      "The work scope and exact location are clearly defined",
      "The correct permit type has been selected",
      "Risk assessment or JSA has been completed",
      "Competent and authorized personnel have been identified",
      "Simultaneous operations have been reviewed",
      "Required isolations and LOTO controls are applied",
      "Isolation effectiveness has been verified",
      "Gas testing has been completed where required",
      "Required PPE and emergency equipment are available",
      "The worksite has been inspected",
      "The permit issuer and permit receiver have signed",
      "A toolbox talk has been completed",
      "The permit validity period is understood",
      "Stop-work and suspension conditions are understood",
      "The permit is available at the worksite",
    ],

    tr: [
      "İş kapsamı ve tam çalışma alanı açıkça tanımlandı",
      "Doğru çalışma izni türü seçildi",
      "Risk değerlendirmesi veya JSA tamamlandı",
      "Yetkin ve yetkilendirilmiş personel belirlendi",
      "Eş zamanlı operasyonlar değerlendirildi",
      "Gerekli izolasyonlar ve LOTO önlemleri uygulandı",
      "İzolasyonun etkinliği doğrulandı",
      "Gerekli durumlarda gaz ölçümü tamamlandı",
      "Gerekli KKD ve acil durum ekipmanı hazır",
      "Çalışma alanı kontrol edildi",
      "İzin veren ve izin alan kişi imzaladı",
      "Toolbox toplantısı tamamlandı",
      "İznin geçerlilik süresi anlaşıldı",
      "İşi durdurma ve izni askıya alma şartları anlaşıldı",
      "Çalışma izni iş alanında mevcut",
    ],
  },

  emergencySection: {
    title: {
      en: "Stop Work, Suspension and Emergency Response",
      tr: "İşi Durdurma, İzni Askıya Alma ve Acil Durum",
    },

    content: {
      en: "Stop work immediately if an alarm activates, gas-test limits are exceeded, an isolation fails, weather conditions become unsafe, the work scope changes, an emergency occurs or any permit control becomes ineffective. Make the worksite safe, warn affected personnel, inform the permit issuer and follow the site emergency procedure. Work must not restart until conditions have been reassessed and the permit has been formally revalidated or replaced.",
      tr: "Alarm devreye girerse, gaz ölçüm limitleri aşılırsa, izolasyon başarısız olursa, hava koşulları güvensiz hâle gelirse, iş kapsamı değişirse, acil durum oluşursa veya izin üzerindeki herhangi bir kontrol etkisiz kalırsa işi derhal durdurun. Çalışma alanını güvenli hâle getirin, etkilenen personeli uyarın, izin verene bilgi verin ve saha acil durum prosedürünü uygulayın. Koşullar yeniden değerlendirilmeden ve izin resmi olarak tekrar doğrulanmadan veya yenilenmeden işe başlanmamalıdır.",
    },
  },

  references: [
    "OSHA 29 CFR 1910.146 — Permit-Required Confined Spaces",
    "OSHA 29 CFR 1910.147 — Control of Hazardous Energy",
    "OSHA 29 CFR 1910.252 — Welding, Cutting and Brazing",
    "OSHA 29 CFR 1926 Subpart V — Power Transmission and Distribution",
    "Applicable site Permit-to-Work procedure",
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
      slug: "working-at-height",
      icon: "🪜",
      title: {
        en: "Working at Height",
        tr: "Yüksekte Çalışma",
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
      slug: "excavation",
      icon: "🚧",
      title: {
        en: "Excavation Safety",
        tr: "Kazı Güvenliği",
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
    en: "Ask SERNEM AI about permit selection, authorization, isolations, gas testing, simultaneous operations, permit suspension, shift handover or permit closure.",
    tr: "İzin türü seçimi, yetkilendirme, izolasyonlar, gaz ölçümü, eş zamanlı operasyonlar, izin askıya alma, vardiya teslimi veya izin kapatma hakkında SERNEM AI'a soru sor.",
  },
};
