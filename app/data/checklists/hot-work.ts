export type LocalizedText = {
  en: string;
  tr: string;
};

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type Applicability = "required" | "conditional";

export interface ChecklistLinks {
  guide?: string;
  toolboxTalk?: string;
  template?: string;
  calculator?: string;
}

export interface ChecklistItem {
  id: string;
  requirement: LocalizedText;
  critical: boolean;
  riskLevel: RiskLevel;
  applicability: Applicability;
  guidance: LocalizedText;
  correctiveAction: LocalizedText;
  references: string[];
  related: ChecklistLinks;
}

export interface ChecklistSection {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  items: ChecklistItem[];
}

export interface ChecklistDocument {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  version: string;
  revision: string;
  status: "draft" | "review" | "approved";
  responseOptions: ["yes", "no", "na"];
  standards: string[];
  disclaimer: LocalizedText;
  sections: ChecklistSection[];
}

const hotWorkRelated: ChecklistLinks = {
  guide: "/knowledge/hot-work",
  toolboxTalk: "/toolbox-talks/hot-work",
  template: "/templates/hot-work-permit",
};

export const hotWorkChecklist: ChecklistDocument = {
  id: "SB-CHK-HW-001",
  slug: "hot-work",
  title: {
    en: "Hot Work Inspection Checklist",
    tr: "Sıcak Çalışma Denetim Kontrol Listesi",
  },
  description: {
    en: "A structured inspection checklist for welding, cutting, grinding and other activities capable of producing heat, flame or sparks.",
    tr: "Kaynak, kesme, taşlama ve ısı, alev veya kıvılcım oluşturabilen diğer faaliyetler için yapılandırılmış denetim kontrol listesi.",
  },
  category: {
    en: "Hot Work",
    tr: "Sıcak Çalışma",
  },
  version: "1.0",
  revision: "0",
  status: "draft",
  responseOptions: ["yes", "no", "na"],
  standards: [
    "OSHA 29 CFR 1910.252",
    "NFPA 51B",
    "ISO 45001",
    "Applicable local legislation and site procedures",
  ],
  disclaimer: {
    en: "This checklist supports field verification but does not replace applicable legislation, the approved risk assessment, permit-to-work requirements, manufacturer instructions or site-specific procedures.",
    tr: "Bu kontrol listesi saha doğrulamasını destekler; yürürlükteki mevzuatın, onaylı risk değerlendirmesinin, çalışma izin sistemi gerekliliklerinin, üretici talimatlarının veya sahaya özel prosedürlerin yerine geçmez.",
  },

  sections: [
    {
      id: "authorization",
      title: {
        en: "Permit and Authorization",
        tr: "İzin ve Yetkilendirme",
      },
      items: [
        {
          id: "HW-AUT-001",
          requirement: {
            en: "A valid hot work permit is available for the task and location.",
            tr: "Görev ve çalışma alanı için geçerli bir sıcak çalışma izni bulunmaktadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Confirm that the permit covers the exact activity, equipment, location and validity period.",
            tr: "İznin tam olarak faaliyeti, ekipmanı, çalışma yerini ve geçerlilik süresini kapsadığını doğrulayın.",
          },
          correctiveAction: {
            en: "Do not start work. Obtain an approved and valid hot work permit.",
            tr: "Çalışmayı başlatmayın. Onaylı ve geçerli bir sıcak çalışma izni alın.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-AUT-002",
          requirement: {
            en: "The permit is displayed or immediately available at the work location.",
            tr: "Çalışma izni çalışma alanında görünür durumdadır veya derhal erişilebilir durumdadır.",
          },
          critical: false,
          riskLevel: "Medium",
          applicability: "required",
          guidance: {
            en: "Workers and supervisors must be able to verify permit conditions during the work.",
            tr: "Çalışanlar ve amirler çalışma sırasında izin koşullarını doğrulayabilmelidir.",
          },
          correctiveAction: {
            en: "Place the permit at the designated work location or make it immediately accessible.",
            tr: "İzni belirlenen çalışma alanına yerleştirin veya derhal erişilebilir hale getirin.",
          },
          references: ["NFPA 51B", "Site PTW procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-AUT-003",
          requirement: {
            en: "Required permit approvals and signatures are complete.",
            tr: "Gerekli izin onayları ve imzaları tamamlanmıştır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Verify approval by all persons required under the site permit-to-work system.",
            tr: "Saha çalışma izin sistemine göre gerekli tüm yetkili kişilerin onayını doğrulayın.",
          },
          correctiveAction: {
            en: "Suspend the task until all required approvals and signatures are completed.",
            tr: "Gerekli tüm onaylar ve imzalar tamamlanana kadar faaliyeti durdurun.",
          },
          references: ["Site PTW procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-AUT-004",
          requirement: {
            en: "The task-specific risk assessment or JSA has been reviewed.",
            tr: "İşe özel risk değerlendirmesi veya JSA gözden geçirilmiştir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Confirm that hazards, control measures and changing site conditions are understood.",
            tr: "Tehlikelerin, kontrol önlemlerinin ve değişen saha koşullarının anlaşıldığını doğrulayın.",
          },
          correctiveAction: {
            en: "Complete or update the risk assessment/JSA and brief the work team.",
            tr: "Risk değerlendirmesini/JSA'yı tamamlayın veya güncelleyin ve çalışma ekibini bilgilendirin.",
          },
          references: ["ISO 45001", "Site risk assessment procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-AUT-005",
          requirement: {
            en: "A task-specific toolbox talk has been completed and recorded.",
            tr: "İşe özel toolbox talk yapılmış ve kayıt altına alınmıştır.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "The briefing should cover ignition hazards, fire prevention, PPE, emergency response and stop-work expectations.",
            tr: "Bilgilendirme; tutuşturma tehlikelerini, yangın önlemeyi, KKD'yi, acil durum müdahalesini ve işi durdurma beklentilerini kapsamalıdır.",
          },
          correctiveAction: {
            en: "Conduct and document a task-specific toolbox talk before work begins.",
            tr: "Çalışma başlamadan önce işe özel toolbox talk yapın ve kayıt altına alın.",
          },
          references: ["ISO 45001", "Site training procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-AUT-006",
          requirement: {
            en: "Simultaneous operations and nearby activities have been assessed.",
            tr: "Eş zamanlı operasyonlar ve yakındaki faaliyetler değerlendirilmiştir.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Check whether nearby work could introduce flammable material, gas release, restricted access or conflicting hazards.",
            tr: "Yakındaki işlerin yanıcı madde, gaz salınımı, kısıtlı erişim veya çakışan tehlikeler oluşturup oluşturmadığını kontrol edin.",
          },
          correctiveAction: {
            en: "Coordinate conflicting activities and stop or reschedule work where controls are inadequate.",
            tr: "Çakışan faaliyetleri koordine edin; kontroller yetersizse işi durdurun veya yeniden planlayın.",
          },
          references: ["ISO 45001", "Site SIMOPS procedure"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "personnel",
      title: {
        en: "Personnel and Competency",
        tr: "Personel ve Yetkinlik",
      },
      items: [
        {
          id: "HW-PER-001",
          requirement: {
            en: "Personnel performing the work are trained, competent and authorized.",
            tr: "Çalışmayı gerçekleştiren personel eğitimli, yetkin ve yetkilidir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Verify competency for the specific welding, cutting, brazing or grinding equipment being used.",
            tr: "Kullanılan kaynak, kesme, lehimleme veya taşlama ekipmanına özel yetkinliği doğrulayın.",
          },
          correctiveAction: {
            en: "Replace unauthorized personnel or provide the required training and authorization.",
            tr: "Yetkisiz personeli değiştirin veya gerekli eğitim ve yetkilendirmeyi sağlayın.",
          },
          references: ["OSHA 29 CFR 1910.252", "Site competency procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PER-002",
          requirement: {
            en: "A competent supervisor is assigned and available.",
            tr: "Yetkin bir amir görevlendirilmiş ve erişilebilir durumdadır.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "The supervisor must understand permit conditions and intervene when controls deteriorate.",
            tr: "Amir izin koşullarını anlamalı ve kontroller bozulduğunda müdahale etmelidir.",
          },
          correctiveAction: {
            en: "Assign a competent supervisor before starting the activity.",
            tr: "Faaliyete başlamadan önce yetkin bir amir görevlendirin.",
          },
          references: ["ISO 45001", "Site supervision procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PER-003",
          requirement: {
            en: "Workers understand the emergency alarm, escape route and assembly point.",
            tr: "Çalışanlar acil durum alarmını, kaçış yolunu ve toplanma noktasını bilmektedir.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Ask workers to explain the emergency response arrangements in their own words.",
            tr: "Çalışanlardan acil durum düzenlemelerini kendi ifadeleriyle açıklamalarını isteyin.",
          },
          correctiveAction: {
            en: "Stop the task briefing and explain the emergency arrangements before work begins.",
            tr: "İş başlangıç bilgilendirmesini durdurun ve çalışmadan önce acil durum düzenlemelerini açıklayın.",
          },
          references: ["ISO 45001", "Site emergency procedure"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "atmospheric-testing",
      title: {
        en: "Atmospheric Testing",
        tr: "Atmosfer Ölçümü",
      },
      description: {
        en: "Select N/A only where atmospheric testing is not required by the risk assessment, permit conditions or site procedure.",
        tr: "N/A seçeneğini yalnızca atmosfer ölçümünün risk değerlendirmesi, izin koşulları veya saha prosedürüne göre gerekli olmadığı durumlarda kullanın.",
      },
      items: [
        {
          id: "HW-GAS-001",
          requirement: {
            en: "The need for atmospheric testing has been formally assessed.",
            tr: "Atmosfer ölçümü ihtiyacı resmi olarak değerlendirilmiştir.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Consider process areas, confined spaces, drains, pits, enclosed locations and potential flammable releases.",
            tr: "Proses alanlarını, kapalı alanları, drenajları, çukurları, kapalı yerleri ve olası yanıcı salınımları dikkate alın.",
          },
          correctiveAction: {
            en: "Do not assume testing is unnecessary. Complete the assessment before authorizing work.",
            tr: "Ölçümün gereksiz olduğunu varsaymayın. Çalışmayı onaylamadan önce değerlendirmeyi tamamlayın.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B", "Site gas testing procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-GAS-002",
          requirement: {
            en: "The gas detector is suitable, within calibration and function-tested.",
            tr: "Gaz dedektörü uygun tipte, kalibrasyon süresi içinde ve fonksiyon testi yapılmış durumdadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Verify detector identification, calibration status, sensor configuration and pre-use test.",
            tr: "Dedektör kimliğini, kalibrasyon durumunu, sensör yapılandırmasını ve kullanım öncesi testini doğrulayın.",
          },
          correctiveAction: {
            en: "Remove the detector from service and obtain a suitable verified instrument.",
            tr: "Dedektörü kullanım dışı bırakın ve uygunluğu doğrulanmış bir cihaz temin edin.",
          },
          references: ["Manufacturer instructions", "Site gas testing procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-GAS-003",
          requirement: {
            en: "Oxygen concentration is within the site-approved safe range.",
            tr: "Oksijen konsantrasyonu saha tarafından onaylanan güvenli aralıktadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Record the actual reading and apply the site-approved acceptance criteria.",
            tr: "Gerçek ölçüm sonucunu kaydedin ve saha tarafından onaylanan kabul kriterlerini uygulayın.",
          },
          correctiveAction: {
            en: "Do not start or continue work. Investigate the atmosphere and restore safe conditions.",
            tr: "Çalışmayı başlatmayın veya devam ettirmeyin. Atmosferi araştırın ve güvenli koşulları sağlayın.",
          },
          references: ["Site gas testing procedure", "Applicable occupational exposure requirements"],
          related: hotWorkRelated,
        },
        {
          id: "HW-GAS-004",
          requirement: {
            en: "Flammable gas or vapour concentration is below the permitted limit.",
            tr: "Yanıcı gaz veya buhar konsantrasyonu izin verilen sınırın altındadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Record the LEL reading and follow the stricter requirement where site limits differ.",
            tr: "LEL ölçümünü kaydedin ve saha sınırları farklıysa daha katı gerekliliği uygulayın.",
          },
          correctiveAction: {
            en: "Stop work, eliminate the source, ventilate where permitted and retest before authorization.",
            tr: "İşi durdurun, kaynağı ortadan kaldırın, izin verildiği şekilde havalandırın ve onay öncesi yeniden ölçüm yapın.",
          },
          references: ["NFPA 51B", "Site gas testing procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-GAS-005",
          requirement: {
            en: "Toxic gases relevant to the area have been tested where required.",
            tr: "Alana özgü toksik gazlar gerekli olduğu durumlarda ölçülmüştür.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Select sensors based on the process, materials, location and risk assessment.",
            tr: "Sensörleri prosese, malzemelere, çalışma alanına ve risk değerlendirmesine göre seçin.",
          },
          correctiveAction: {
            en: "Complete the required toxic gas testing and apply respiratory or engineering controls as necessary.",
            tr: "Gerekli toksik gaz ölçümlerini tamamlayın ve gerektiğinde solunum veya mühendislik kontrollerini uygulayın.",
          },
          references: ["Site gas testing procedure", "Applicable exposure limits"],
          related: hotWorkRelated,
        },
        {
          id: "HW-GAS-006",
          requirement: {
            en: "Continuous or periodic atmospheric monitoring is arranged where conditions may change.",
            tr: "Koşulların değişebileceği durumlarda sürekli veya periyodik atmosfer takibi düzenlenmiştir.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Consider process changes, wind direction, enclosed areas, adjacent releases and work duration.",
            tr: "Proses değişikliklerini, rüzgâr yönünü, kapalı alanları, yakındaki salınımları ve çalışma süresini dikkate alın.",
          },
          correctiveAction: {
            en: "Provide continuous or scheduled monitoring and define stop-work alarm limits.",
            tr: "Sürekli veya planlı ölçüm sağlayın ve işi durdurma alarm sınırlarını tanımlayın.",
          },
          references: ["NFPA 51B", "Site gas testing procedure"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "fire-prevention",
      title: {
        en: "Fire Prevention and Fire Watch",
        tr: "Yangın Önleme ve Yangın Gözcüsü",
      },
      items: [
        {
          id: "HW-FIR-001",
          requirement: {
            en: "Combustible and flammable materials have been removed or effectively protected.",
            tr: "Yanıcı ve parlayıcı malzemeler uzaklaştırılmış veya etkili şekilde korunmuştur.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Inspect all sides, levels and concealed spaces that may be reached by sparks, slag or heat.",
            tr: "Kıvılcım, cüruf veya ısının ulaşabileceği tüm tarafları, seviyeleri ve gizli boşlukları kontrol edin.",
          },
          correctiveAction: {
            en: "Remove the materials or install suitable non-combustible protection before work starts.",
            tr: "Çalışma başlamadan önce malzemeleri uzaklaştırın veya uygun yanmaz koruma yerleştirin.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-FIR-002",
          requirement: {
            en: "Suitable fire extinguishing equipment is immediately available.",
            tr: "Uygun yangın söndürme ekipmanı derhal kullanılabilir durumdadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Verify quantity, type, inspection status, accessibility and suitability for the anticipated fire class.",
            tr: "Miktarı, tipi, kontrol durumunu, erişilebilirliği ve beklenen yangın sınıfına uygunluğu doğrulayın.",
          },
          correctiveAction: {
            en: "Provide inspected and suitable fire extinguishing equipment at the work area.",
            tr: "Çalışma alanında kontrol edilmiş ve uygun yangın söndürme ekipmanı sağlayın.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-FIR-003",
          requirement: {
            en: "A trained fire watch has been assigned where required.",
            tr: "Gerekli olduğu durumlarda eğitimli bir yangın gözcüsü görevlendirilmiştir.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "The fire watch must have no conflicting duty that prevents continuous observation.",
            tr: "Yangın gözcüsünün sürekli gözlemi engelleyecek çakışan başka bir görevi bulunmamalıdır.",
          },
          correctiveAction: {
            en: "Assign a trained and dedicated fire watch before starting hot work.",
            tr: "Sıcak çalışmaya başlamadan önce eğitimli ve yalnızca bu işe atanmış bir yangın gözcüsü görevlendirin.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-FIR-004",
          requirement: {
            en: "The fire watch understands alarm methods, extinguisher use and stop-work authority.",
            tr: "Yangın gözcüsü alarm yöntemlerini, söndürücü kullanımını ve işi durdurma yetkisini bilmektedir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Confirm understanding through direct questioning before the activity starts.",
            tr: "Faaliyet başlamadan önce doğrudan sorularla anlayışını doğrulayın.",
          },
          correctiveAction: {
            en: "Brief or replace the fire watch before authorizing work.",
            tr: "Çalışmayı onaylamadan önce yangın gözcüsünü bilgilendirin veya değiştirin.",
          },
          references: ["NFPA 51B", "Site fire watch procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-FIR-005",
          requirement: {
            en: "Openings, penetrations, drains and gaps are protected from sparks and slag.",
            tr: "Açıklıklar, geçişler, drenajlar ve boşluklar kıvılcım ve cürufa karşı korunmuştur.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Check whether sparks can travel to lower levels, hidden spaces or process systems.",
            tr: "Kıvılcımların alt seviyelere, gizli boşluklara veya proses sistemlerine ulaşıp ulaşamayacağını kontrol edin.",
          },
          correctiveAction: {
            en: "Install suitable covers, blankets or containment and inspect the affected levels.",
            tr: "Uygun kapak, battaniye veya muhafaza yerleştirin ve etkilenen seviyeleri kontrol edin.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-FIR-006",
          requirement: {
            en: "Spark and slag containment is effective for the work configuration.",
            tr: "Kıvılcım ve cüruf muhafazası çalışma düzenine uygun ve etkilidir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Consider wind, elevation, grinding direction and movement of hot particles.",
            tr: "Rüzgârı, yüksekliği, taşlama yönünü ve sıcak parçacıkların hareketini dikkate alın.",
          },
          correctiveAction: {
            en: "Reposition barriers or install additional fire-resistant containment.",
            tr: "Bariyerleri yeniden konumlandırın veya ek yangına dayanıklı muhafaza kurun.",
          },
          references: ["NFPA 51B", "Site hot work procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-FIR-007",
          requirement: {
            en: "Fire detection or suppression systems affected by the task are properly managed.",
            tr: "Faaliyetten etkilenen yangın algılama veya söndürme sistemleri uygun şekilde yönetilmektedir.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Any isolation, impairment or override must be formally authorized and compensated.",
            tr: "Her türlü izolasyon, devre dışı bırakma veya geçersiz kılma resmi olarak onaylanmalı ve telafi önlemleri alınmalıdır.",
          },
          correctiveAction: {
            en: "Follow the impairment procedure and establish approved temporary controls.",
            tr: "Devre dışı bırakma prosedürünü uygulayın ve onaylı geçici kontroller oluşturun.",
          },
          references: ["NFPA 51B", "Site fire system impairment procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-FIR-008",
          requirement: {
            en: "Post-work fire monitoring duration has been defined.",
            tr: "Çalışma sonrası yangın gözetim süresi belirlenmiştir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Apply the duration required by the permit, risk assessment and site procedure; extend it where hidden ignition is possible.",
            tr: "İzin, risk değerlendirmesi ve saha prosedürünün gerektirdiği süreyi uygulayın; gizli tutuşma ihtimalinde süreyi uzatın.",
          },
          correctiveAction: {
            en: "Define and record the required monitoring period before work begins.",
            tr: "Çalışmaya başlamadan önce gerekli gözetim süresini belirleyin ve kaydedin.",
          },
          references: ["NFPA 51B", "Site hot work procedure"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "equipment",
      title: {
        en: "Equipment and Gas Cylinders",
        tr: "Ekipman ve Gaz Tüpleri",
      },
      items: [
        {
          id: "HW-EQP-001",
          requirement: {
            en: "Hot work equipment has passed the required pre-use inspection.",
            tr: "Sıcak çalışma ekipmanı gerekli kullanım öncesi kontrolden geçmiştir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Inspect the machine, leads, hoses, torch, holders, guards and accessories relevant to the task.",
            tr: "Makineyi, kabloları, hortumları, torcu, tutucuları, koruyucuları ve işe uygun aksesuarları kontrol edin.",
          },
          correctiveAction: {
            en: "Remove defective equipment from service and provide inspected equipment.",
            tr: "Arızalı ekipmanı kullanım dışı bırakın ve kontrol edilmiş ekipman sağlayın.",
          },
          references: ["OSHA 29 CFR 1910.252", "Manufacturer instructions"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-002",
          requirement: {
            en: "Electrical cables, plugs, electrode holders and connections are undamaged.",
            tr: "Elektrik kabloları, fişler, elektrot tutucuları ve bağlantılar hasarsızdır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Look for exposed conductors, crushed insulation, makeshift repairs and overheating.",
            tr: "Açık iletkenleri, ezilmiş izolasyonu, geçici onarımları ve aşırı ısınmayı kontrol edin.",
          },
          correctiveAction: {
            en: "Isolate and tag defective equipment; arrange proper repair or replacement.",
            tr: "Arızalı ekipmanı izole edip etiketleyin; uygun onarım veya değişim sağlayın.",
          },
          references: ["OSHA 29 CFR 1910.252", "Manufacturer instructions"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-003",
          requirement: {
            en: "The welding return connection is secure and positioned appropriately.",
            tr: "Kaynak dönüş bağlantısı sağlamdır ve uygun şekilde konumlandırılmıştır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Keep the return path as close to the work as practicable and prevent current passing through unintended equipment.",
            tr: "Dönüş yolunu mümkün olduğunca çalışma noktasına yakın tutun ve akımın istenmeyen ekipmanlardan geçmesini önleyin.",
          },
          correctiveAction: {
            en: "Reposition and secure the return clamp before welding.",
            tr: "Kaynak öncesinde dönüş pensesini yeniden konumlandırın ve sabitleyin.",
          },
          references: ["OSHA 29 CFR 1910.252", "Manufacturer instructions"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-004",
          requirement: {
            en: "Gas cylinders are upright, secured and protected from damage.",
            tr: "Gaz tüpleri dik konumda, sabitlenmiş ve hasara karşı korunmuştur.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Secure cylinders using suitable chains or restraints and protect them from impact, heat and vehicle movement.",
            tr: "Tüpleri uygun zincir veya sabitleme sistemiyle bağlayın; darbe, ısı ve araç hareketlerinden koruyun.",
          },
          correctiveAction: {
            en: "Stop use and secure or relocate the cylinders safely.",
            tr: "Kullanımı durdurun ve tüpleri güvenli şekilde sabitleyin veya başka yere taşıyın.",
          },
          references: ["OSHA 29 CFR 1910.252", "Supplier instructions"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-005",
          requirement: {
            en: "Oxygen and fuel-gas equipment is free from oil, grease and contamination.",
            tr: "Oksijen ve yanıcı gaz ekipmanı yağ, gres ve kirlenmeden arındırılmıştır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Never allow petroleum-based products to contact oxygen valves, regulators or fittings.",
            tr: "Petrol bazlı ürünlerin oksijen vanaları, regülatörleri veya bağlantılarıyla temasına asla izin vermeyin.",
          },
          correctiveAction: {
            en: "Remove contaminated equipment from service and arrange specialist cleaning or replacement.",
            tr: "Kirlenmiş ekipmanı kullanım dışı bırakın ve uzman temizliği veya değişim sağlayın.",
          },
          references: ["OSHA 29 CFR 1910.252", "Gas supplier instructions"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-006",
          requirement: {
            en: "Hoses, regulators, valves and connections are compatible and leak-free.",
            tr: "Hortumlar, regülatörler, vanalar ve bağlantılar uyumlu ve sızdırmazdır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Use an approved leak-testing method and never test oxygen equipment with oil-based substances.",
            tr: "Onaylı sızıntı test yöntemini kullanın ve oksijen ekipmanını asla yağ bazlı maddelerle test etmeyin.",
          },
          correctiveAction: {
            en: "Close the cylinder valves, isolate the equipment and replace or repair defective components.",
            tr: "Tüp vanalarını kapatın, ekipmanı izole edin ve arızalı parçaları değiştirin veya onarın.",
          },
          references: ["OSHA 29 CFR 1910.252", "Manufacturer instructions"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-007",
          requirement: {
            en: "Required flashback arrestors and non-return valves are correctly installed.",
            tr: "Gerekli alev geri tepme emniyet tertibatları ve çek valfler doğru şekilde takılmıştır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Verify installation location, gas compatibility, flow direction and inspection condition.",
            tr: "Montaj yerini, gaz uyumluluğunu, akış yönünü ve kontrol durumunu doğrulayın.",
          },
          correctiveAction: {
            en: "Do not use the equipment until approved protective devices are correctly installed.",
            tr: "Onaylı koruyucu tertibatlar doğru şekilde takılana kadar ekipmanı kullanmayın.",
          },
          references: ["Manufacturer instructions", "Site hot work procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-008",
          requirement: {
            en: "Grinding wheels and cutting discs are suitable, undamaged and within their rated speed.",
            tr: "Taşlama taşları ve kesici diskler uygun, hasarsız ve izin verilen devir aralığındadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Verify disc type, diameter, expiry where applicable, rated RPM and compatibility with the tool.",
            tr: "Disk tipini, çapını, varsa son kullanma tarihini, izin verilen devri ve aletle uyumluluğunu doğrulayın.",
          },
          correctiveAction: {
            en: "Remove the disc from service and install a suitable undamaged disc.",
            tr: "Diski kullanım dışı bırakın ve uygun, hasarsız bir disk takın.",
          },
          references: ["OSHA machine guarding requirements", "Manufacturer instructions"],
          related: hotWorkRelated,
        },
        {
          id: "HW-EQP-009",
          requirement: {
            en: "Machine guards and handles are installed and correctly positioned.",
            tr: "Makine koruyucuları ve tutma kolları takılmış ve doğru konumlandırılmıştır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Do not allow removal or bypassing of guards provided by the manufacturer.",
            tr: "Üretici tarafından sağlanan koruyucuların çıkarılmasına veya devre dışı bırakılmasına izin vermeyin.",
          },
          correctiveAction: {
            en: "Stop work and reinstall or replace the required guard or handle.",
            tr: "İşi durdurun ve gerekli koruyucuyu veya tutma kolunu yeniden takın ya da değiştirin.",
          },
          references: ["Manufacturer instructions", "Applicable machine guarding requirements"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "ppe",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
      items: [
        {
          id: "HW-PPE-001",
          requirement: {
            en: "Eye and face protection is suitable for the hot work process.",
            tr: "Göz ve yüz koruması sıcak çalışma yöntemine uygundur.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Select the correct welding shade, safety spectacles and face protection for the task.",
            tr: "İşe uygun kaynak camı koyuluğunu, koruyucu gözlüğü ve yüz korumasını seçin.",
          },
          correctiveAction: {
            en: "Provide and correctly use suitable eye and face protection.",
            tr: "Uygun göz ve yüz korumasını sağlayın ve doğru kullanılmasını temin edin.",
          },
          references: ["OSHA 29 CFR 1910.252", "Applicable PPE requirements"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PPE-002",
          requirement: {
            en: "Flame-resistant clothing provides adequate body coverage.",
            tr: "Aleve dayanıklı giysi vücudu yeterli şekilde korumaktadır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Avoid synthetic clothing that can melt and ensure exposed skin is minimized.",
            tr: "Eriyebilen sentetik giysilerden kaçının ve açıkta kalan cilt alanını en aza indirin.",
          },
          correctiveAction: {
            en: "Replace unsuitable clothing before work begins.",
            tr: "Çalışma başlamadan önce uygun olmayan giysileri değiştirin.",
          },
          references: ["OSHA 29 CFR 1910.252", "Site PPE procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PPE-003",
          requirement: {
            en: "Gloves are suitable for heat, sparks and the task being performed.",
            tr: "Eldivenler ısıya, kıvılcıma ve yapılan işe uygundur.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Select gloves that provide protection without creating entanglement or dexterity hazards.",
            tr: "Dolanma veya el becerisi tehlikesi oluşturmadan koruma sağlayan eldivenleri seçin.",
          },
          correctiveAction: {
            en: "Provide suitable undamaged gloves before work continues.",
            tr: "Çalışmaya devam etmeden önce uygun ve hasarsız eldiven sağlayın.",
          },
          references: ["Applicable PPE requirements", "Site PPE procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PPE-004",
          requirement: {
            en: "Safety footwear is suitable and protects against hot material.",
            tr: "Emniyet ayakkabısı uygun ve sıcak malzemeye karşı koruma sağlamaktadır.",
          },
          critical: false,
          riskLevel: "Medium",
          applicability: "required",
          guidance: {
            en: "Ensure footwear is closed, in good condition and suitable for the site hazards.",
            tr: "Ayakkabının kapalı, iyi durumda ve saha tehlikelerine uygun olduğundan emin olun.",
          },
          correctiveAction: {
            en: "Replace unsuitable or damaged footwear.",
            tr: "Uygun olmayan veya hasarlı ayakkabıyı değiştirin.",
          },
          references: ["Applicable PPE requirements", "Site PPE procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PPE-005",
          requirement: {
            en: "Hearing protection is provided where noise exposure requires it.",
            tr: "Gürültü maruziyetinin gerektirdiği durumlarda işitme koruması sağlanmıştır.",
          },
          critical: false,
          riskLevel: "Medium",
          applicability: "conditional",
          guidance: {
            en: "Consider grinding, gouging, cutting and work in reflective or enclosed locations.",
            tr: "Taşlama, oluk açma, kesme ve yansıtıcı veya kapalı alanlardaki çalışmaları dikkate alın.",
          },
          correctiveAction: {
            en: "Provide suitable hearing protection and control the noise exposure.",
            tr: "Uygun işitme koruması sağlayın ve gürültü maruziyetini kontrol edin.",
          },
          references: ["Applicable occupational noise requirements", "Site PPE procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PPE-006",
          requirement: {
            en: "Respiratory protection is provided where fumes or contaminants cannot be adequately controlled otherwise.",
            tr: "Duman veya kirleticilerin başka yöntemlerle yeterince kontrol edilemediği durumlarda solunum koruması sağlanmıştır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Respirator selection must follow the exposure assessment, fit-testing and respiratory protection program.",
            tr: "Solunum koruyucu seçimi maruziyet değerlendirmesine, yüz uyum testine ve solunum koruma programına uygun olmalıdır.",
          },
          correctiveAction: {
            en: "Stop work and implement ventilation or an approved respiratory protection solution.",
            tr: "İşi durdurun ve havalandırma veya onaylı bir solunum koruma çözümü uygulayın.",
          },
          references: ["Applicable respiratory protection requirements", "Site respiratory protection program"],
          related: hotWorkRelated,
        },
        {
          id: "HW-PPE-007",
          requirement: {
            en: "Fall protection is provided where work-at-height exposure exists.",
            tr: "Yüksekte çalışma maruziyeti bulunan durumlarda düşmeye karşı koruma sağlanmıştır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "Coordinate hot work controls with anchorage, lanyard protection, rescue planning and dropped-object prevention.",
            tr: "Sıcak çalışma kontrollerini ankraj, bağlantı ekipmanı koruması, kurtarma planı ve düşen cisim önleme tedbirleriyle koordine edin.",
          },
          correctiveAction: {
            en: "Stop work and establish compliant work-at-height controls.",
            tr: "İşi durdurun ve uygun yüksekte çalışma kontrollerini oluşturun.",
          },
          references: ["Applicable fall protection requirements", "Site work-at-height procedure"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "work-area",
      title: {
        en: "Work Area and Environmental Conditions",
        tr: "Çalışma Alanı ve Çevresel Koşullar",
      },
      items: [
        {
          id: "HW-ARE-001",
          requirement: {
            en: "The work area is barricaded and warning signs are displayed.",
            tr: "Çalışma alanı bariyerle çevrilmiş ve uyarı levhaları yerleştirilmiştir.",
          },
          critical: false,
          riskLevel: "Medium",
          applicability: "required",
          guidance: {
            en: "Prevent unauthorized entry and exposure to sparks, radiation, hot material and equipment.",
            tr: "Yetkisiz girişi ve kıvılcım, ışınım, sıcak malzeme ve ekipmana maruziyeti önleyin.",
          },
          correctiveAction: {
            en: "Install suitable barricades and warning signs before starting work.",
            tr: "Çalışmaya başlamadan önce uygun bariyer ve uyarı levhalarını yerleştirin.",
          },
          references: ["Site access-control procedure", "Applicable PPE requirements"],
          related: hotWorkRelated,
        },
        {
          id: "HW-ARE-002",
          requirement: {
            en: "Ventilation is adequate for fumes, gases and heat generated by the task.",
            tr: "Havalandırma, faaliyetin oluşturduğu duman, gaz ve ısı için yeterlidir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Use local exhaust or mechanical ventilation where natural ventilation is insufficient.",
            tr: "Doğal havalandırmanın yetersiz olduğu durumlarda lokal emiş veya mekanik havalandırma kullanın.",
          },
          correctiveAction: {
            en: "Stop work and improve ventilation or revise the work method.",
            tr: "İşi durdurun ve havalandırmayı iyileştirin veya çalışma yöntemini değiştirin.",
          },
          references: ["OSHA 29 CFR 1910.252", "Applicable exposure requirements"],
          related: hotWorkRelated,
        },
        {
          id: "HW-ARE-003",
          requirement: {
            en: "Lighting is sufficient for safe work and inspection.",
            tr: "Aydınlatma güvenli çalışma ve kontrol için yeterlidir.",
          },
          critical: false,
          riskLevel: "Medium",
          applicability: "required",
          guidance: {
            en: "Ensure workers can clearly see the workpiece, equipment, escape route and surrounding hazards.",
            tr: "Çalışanların iş parçasını, ekipmanı, kaçış yolunu ve çevredeki tehlikeleri açıkça görebildiğinden emin olun.",
          },
          correctiveAction: {
            en: "Provide suitable task lighting that does not introduce additional hazards.",
            tr: "Ek tehlike oluşturmayan uygun görev aydınlatması sağlayın.",
          },
          references: ["Site lighting requirements"],
          related: hotWorkRelated,
        },
        {
          id: "HW-ARE-004",
          requirement: {
            en: "Access and emergency escape routes are clear.",
            tr: "Erişim ve acil kaçış yolları açıktır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Do not allow cables, hoses, cylinders or screens to obstruct emergency movement.",
            tr: "Kabloların, hortumların, tüplerin veya perdelerin acil hareketi engellemesine izin vermeyin.",
          },
          correctiveAction: {
            en: "Rearrange equipment and clear all access and escape routes.",
            tr: "Ekipmanı yeniden düzenleyin ve tüm erişim ile kaçış yollarını açın.",
          },
          references: ["Site emergency procedure", "Site housekeeping procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-ARE-005",
          requirement: {
            en: "Housekeeping is acceptable and trip hazards are controlled.",
            tr: "Düzen ve temizlik uygundur; takılma tehlikeleri kontrol altındadır.",
          },
          critical: false,
          riskLevel: "Medium",
          applicability: "required",
          guidance: {
            en: "Route leads and hoses safely and remove scrap, packaging and unnecessary materials.",
            tr: "Kablo ve hortumları güvenli şekilde yönlendirin; hurdaları, ambalajları ve gereksiz malzemeleri uzaklaştırın.",
          },
          correctiveAction: {
            en: "Clean and organize the work area before continuing.",
            tr: "Devam etmeden önce çalışma alanını temizleyin ve düzenleyin.",
          },
          references: ["Site housekeeping procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-ARE-006",
          requirement: {
            en: "Weather conditions are suitable for the work.",
            tr: "Hava koşulları çalışma için uygundur.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Assess wind, rain, lightning, extreme temperature and their effect on spark travel and electrical safety.",
            tr: "Rüzgârı, yağmuru, yıldırımı, aşırı sıcaklığı ve bunların kıvılcım yayılımı ile elektrik güvenliğine etkisini değerlendirin.",
          },
          correctiveAction: {
            en: "Suspend or relocate the task until acceptable conditions and controls are established.",
            tr: "Uygun koşullar ve kontroller sağlanana kadar faaliyeti durdurun veya başka yere taşıyın.",
          },
          references: ["Site adverse-weather procedure", "Risk assessment"],
          related: hotWorkRelated,
        },
        {
          id: "HW-ARE-007",
          requirement: {
            en: "Screens or barriers protect nearby personnel from arc radiation and flying particles.",
            tr: "Perde veya bariyerler yakındaki personeli ark ışınımı ve uçan parçacıklardan korumaktadır.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "conditional",
          guidance: {
            en: "Position screens without blocking ventilation, supervision or escape routes.",
            tr: "Perdeleri havalandırmayı, gözetimi veya kaçış yollarını engellemeyecek şekilde konumlandırın.",
          },
          correctiveAction: {
            en: "Install or reposition suitable welding screens and particle barriers.",
            tr: "Uygun kaynak perdeleri ve parçacık bariyerleri kurun veya yeniden konumlandırın.",
          },
          references: ["OSHA 29 CFR 1910.252", "Applicable PPE requirements"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "monitoring",
      title: {
        en: "Monitoring During Work",
        tr: "Çalışma Sırasında Gözetim",
      },
      items: [
        {
          id: "HW-MON-001",
          requirement: {
            en: "Permit conditions and control measures remain effective throughout the work.",
            tr: "İzin koşulları ve kontrol önlemleri çalışma boyunca etkili kalmaktadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Reassess after breaks, alarms, process changes, weather changes, relocation or loss of control.",
            tr: "Molalar, alarmlar, proses değişiklikleri, hava değişiklikleri, yer değişikliği veya kontrol kaybından sonra yeniden değerlendirme yapın.",
          },
          correctiveAction: {
            en: "Stop work, make the area safe and revalidate the permit and controls.",
            tr: "İşi durdurun, alanı güvenli hale getirin ve izin ile kontrolleri yeniden doğrulayın.",
          },
          references: ["NFPA 51B", "Site PTW procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-MON-002",
          requirement: {
            en: "The fire watch remains in position and continuously observes the risk area.",
            tr: "Yangın gözcüsü görev yerinde kalmakta ve risk alanını sürekli gözlemlemektedir.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "conditional",
          guidance: {
            en: "The fire watch must monitor all affected levels and hidden or adjacent spaces where practicable.",
            tr: "Yangın gözcüsü mümkün olduğu ölçüde etkilenen tüm seviyeleri ve gizli veya bitişik alanları izlemelidir.",
          },
          correctiveAction: {
            en: "Stop hot work until effective fire-watch coverage is restored.",
            tr: "Etkili yangın gözcüsü kapsamı yeniden sağlanana kadar sıcak çalışmayı durdurun.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-MON-003",
          requirement: {
            en: "Workers continue to use required PPE correctly.",
            tr: "Çalışanlar gerekli KKD'leri doğru şekilde kullanmaya devam etmektedir.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Check for removed gloves, raised welding helmets, damaged PPE and exposed skin.",
            tr: "Çıkarılmış eldivenleri, kaldırılmış kaynak başlıklarını, hasarlı KKD'leri ve açıkta kalan cildi kontrol edin.",
          },
          correctiveAction: {
            en: "Stop the affected activity and correct PPE use before continuing.",
            tr: "Etkilenen faaliyeti durdurun ve devam etmeden önce KKD kullanımını düzeltin.",
          },
          references: ["Applicable PPE requirements", "Site PPE procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-MON-004",
          requirement: {
            en: "No gas leak, unexpected odour, alarm or process release is present.",
            tr: "Gaz kaçağı, beklenmeyen koku, alarm veya proses salınımı bulunmamaktadır.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Any indication of changing atmospheric conditions requires immediate intervention.",
            tr: "Atmosfer koşullarının değiştiğine dair her belirti derhal müdahale gerektirir.",
          },
          correctiveAction: {
            en: "Stop work, eliminate ignition sources, raise the alarm where required and evacuate according to site procedure.",
            tr: "İşi durdurun, tutuşturma kaynaklarını ortadan kaldırın, gerektiğinde alarm verin ve saha prosedürüne göre tahliye edin.",
          },
          references: ["Site emergency procedure", "Site gas testing procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-MON-005",
          requirement: {
            en: "Hot slag, sparks and workpieces remain contained and controlled.",
            tr: "Sıcak cüruf, kıvılcımlar ve iş parçaları muhafaza ve kontrol altında tutulmaktadır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Monitor changes caused by wind, work position, material movement and progress of the task.",
            tr: "Rüzgâr, çalışma pozisyonu, malzeme hareketi ve işin ilerlemesinden kaynaklanan değişiklikleri izleyin.",
          },
          correctiveAction: {
            en: "Stop work and improve containment or reposition the activity.",
            tr: "İşi durdurun ve muhafazayı iyileştirin veya faaliyeti yeniden konumlandırın.",
          },
          references: ["NFPA 51B", "Site hot work procedure"],
          related: hotWorkRelated,
        },
      ],
    },

    {
      id: "completion",
      title: {
        en: "Completion and Post-Work Inspection",
        tr: "Tamamlama ve Çalışma Sonrası Kontrol",
      },
      items: [
        {
          id: "HW-COM-001",
          requirement: {
            en: "The hot work equipment has been safely shut down and isolated.",
            tr: "Sıcak çalışma ekipmanı güvenli şekilde kapatılmış ve izole edilmiştir.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Switch off electrical equipment and close, depressurize and secure gas systems as applicable.",
            tr: "Elektrikli ekipmanı kapatın; gaz sistemlerini uygun şekilde kapatın, basıncını düşürün ve güvenli hale getirin.",
          },
          correctiveAction: {
            en: "Complete safe shutdown and isolation before leaving the area.",
            tr: "Alandan ayrılmadan önce güvenli kapatma ve izolasyonu tamamlayın.",
          },
          references: ["Manufacturer instructions", "Site isolation procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-COM-002",
          requirement: {
            en: "The work area and all potentially affected levels have been inspected.",
            tr: "Çalışma alanı ve etkilenmiş olabilecek tüm seviyeler kontrol edilmiştir.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "Inspect behind, below and around the work for smoke, heat, sparks and smouldering material.",
            tr: "Çalışmanın arkasını, altını ve çevresini duman, ısı, kıvılcım ve için için yanan malzeme açısından kontrol edin.",
          },
          correctiveAction: {
            en: "Continue inspection and eliminate all signs of heat or ignition before closing the permit.",
            tr: "İzni kapatmadan önce kontrole devam edin ve tüm ısı veya tutuşma belirtilerini ortadan kaldırın.",
          },
          references: ["OSHA 29 CFR 1910.252", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-COM-003",
          requirement: {
            en: "The required post-work fire-watch period has been completed and recorded.",
            tr: "Gerekli çalışma sonrası yangın gözetim süresi tamamlanmış ve kaydedilmiştir.",
          },
          critical: true,
          riskLevel: "Critical",
          applicability: "required",
          guidance: {
            en: "The monitoring period must satisfy the permit, site procedure and conditions of the work area.",
            tr: "Gözetim süresi izni, saha prosedürünü ve çalışma alanı koşullarını karşılamalıdır.",
          },
          correctiveAction: {
            en: "Continue fire monitoring until the required duration is completed and the area is confirmed safe.",
            tr: "Gerekli süre tamamlanana ve alanın güvenli olduğu doğrulanana kadar yangın gözetimine devam edin.",
          },
          references: ["NFPA 51B", "Site hot work procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-COM-004",
          requirement: {
            en: "Hot materials, electrode stubs, slag and waste have been safely removed.",
            tr: "Sıcak malzemeler, elektrot artıkları, cüruf ve atıklar güvenli şekilde uzaklaştırılmıştır.",
          },
          critical: false,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Use suitable metal containers where hot residues may remain an ignition source.",
            tr: "Sıcak kalıntıların tutuşturma kaynağı olabileceği durumlarda uygun metal kaplar kullanın.",
          },
          correctiveAction: {
            en: "Collect and dispose of residues using the approved waste method.",
            tr: "Kalıntıları onaylı atık yöntemiyle toplayın ve bertaraf edin.",
          },
          references: ["Site waste procedure", "NFPA 51B"],
          related: hotWorkRelated,
        },
        {
          id: "HW-COM-005",
          requirement: {
            en: "Temporary barriers, covers and fire protection controls are removed only when safe.",
            tr: "Geçici bariyerler, kapaklar ve yangın koruma kontrolleri yalnızca güvenli olduğunda kaldırılmıştır.",
          },
          critical: false,
          riskLevel: "Medium",
          applicability: "conditional",
          guidance: {
            en: "Do not remove controls while residual heat, falling material or access hazards remain.",
            tr: "Artık ısı, düşen malzeme veya erişim tehlikesi devam ederken kontrolleri kaldırmayın.",
          },
          correctiveAction: {
            en: "Maintain temporary controls until the area is fully safe and restored.",
            tr: "Alan tamamen güvenli hale gelene ve eski durumuna dönene kadar geçici kontrolleri sürdürün.",
          },
          references: ["Site hot work procedure"],
          related: hotWorkRelated,
        },
        {
          id: "HW-COM-006",
          requirement: {
            en: "The permit has been formally closed by the authorized persons.",
            tr: "Çalışma izni yetkili kişiler tarafından resmi olarak kapatılmıştır.",
          },
          critical: true,
          riskLevel: "High",
          applicability: "required",
          guidance: {
            en: "Close the permit only after final inspection, fire monitoring and restoration are complete.",
            tr: "İzni yalnızca son kontrol, yangın gözetimi ve alanın eski haline getirilmesi tamamlandıktan sonra kapatın.",
          },
          correctiveAction: {
            en: "Complete all close-out requirements and obtain the required signatures.",
            tr: "Tüm kapatma gerekliliklerini tamamlayın ve gerekli imzaları alın.",
          },
          references: ["Site PTW procedure", "NFPA 51B"],
          related: hotWorkRelated,
        },
      ],
    },
  ],
};
