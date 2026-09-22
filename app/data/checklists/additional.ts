import type { ChecklistDocument, ChecklistItem, LocalizedText } from "./hot-work";

const standards = ["ISO 45001", "Applicable local legislation and site procedures"];

const professionalControls = [
  [
    "The task-specific risk assessment and method statement are current and available.",
    "İşe özel risk değerlendirmesi ve çalışma yöntemi güncel ve erişilebilir.",
  ],
  [
    "Workers and supervisors are competent, briefed and authorized for the activity.",
    "Çalışanlar ve saha sorumluları faaliyet için yetkin, bilgilendirilmiş ve yetkilidir.",
  ],
  [
    "Required PPE and task-specific protective equipment are available and used.",
    "Gerekli KKD ve işe özel koruyucu ekipman mevcut ve kullanılıyor.",
  ],
  [
    "Emergency arrangements, contacts and access routes are known and available.",
    "Acil durum düzenlemeleri, iletişim bilgileri ve erişim yolları biliniyor ve mevcut.",
  ],
  [
    "The work area is controlled against unauthorized access and changing conditions.",
    "Çalışma alanı yetkisiz erişime ve değişen koşullara karşı kontrol ediliyor.",
  ],
  [
    "Relevant records, inspections, permits or certificates are current and traceable.",
    "İlgili kayıtlar, kontroller, izinler veya sertifikalar güncel ve izlenebilir.",
  ],
  [
    "Changes in scope, people, equipment or conditions are reviewed before work continues.",
    "Kapsam, çalışan, ekipman veya koşullardaki değişiklikler çalışma sürmeden önce gözden geçiriliyor.",
  ],
  [
    "Findings have an assigned owner, target date and closeout verification.",
    "Bulguların sorumlusu, hedef tarihi ve kapatma doğrulaması bulunuyor.",
  ],
] as const;

const turkishRequirementByEnglish: Record<string, string> = {
  "The excavation has been assessed for collapse, services and access hazards.": "Kazı; göçme, yeraltı/üstü hatlar ve erişim tehlikeleri açısından değerlendirilmiştir.",
  "A competent person has inspected the excavation before each shift.": "Yetkin bir kişi kazıyı her vardiya öncesinde kontrol etmiştir.",
  "Protective systems, benching or safe slopes are suitable for the soil and depth.": "Koruyucu sistemler, kademelendirme veya güvenli şevler zemin ve kazı derinliğine uygundur.",
  "Safe access and egress are provided within the required distance.": "Gerekli mesafe içerisinde güvenli giriş ve çıkış imkânı sağlanmıştır.",
  "Spoil, materials and equipment are kept away from the edge.": "Kazı malzemesi, ekipman ve diğer yükler kazı kenarından güvenli mesafede tutulmaktadır.",
  "Water accumulation, atmosphere and changing ground conditions are controlled.": "Su birikmesi, atmosfer koşulları ve değişen zemin şartları kontrol altındadır.",
  "Nearby traffic, plant and falling-object hazards are segregated.": "Yakındaki trafik, iş makineleri ve düşen cisim tehlikeleri ayrıştırılmıştır.",
  "The excavation is barricaded and inspected after changes or adverse weather.": "Kazı alanı bariyerlenmiş ve değişiklikler veya olumsuz hava sonrasında yeniden kontrol edilmiştir.",

  "All simultaneous operations are identified on the coordination plan.": "Tüm eş zamanlı operasyonlar koordinasyon planında tanımlanmıştır.",
  "Conflicting hazards and interfaces have assigned control owners.": "Çakışan tehlikeler ve arayüzler için kontrol sorumluları atanmıştır.",
  "Permit boundaries, isolations and work fronts are clearly communicated.": "İzin sınırları, izolasyonlar ve çalışma cepheleri açıkça paylaşılmıştır.",
  "A competent coordinator can stop conflicting work.": "Yetkin koordinatör çakışan çalışmaları durdurma yetkisine sahiptir.",
  "Emergency routes and response arrangements remain available.": "Acil durum yolları ve müdahale düzenlemeleri kullanılabilir durumdadır.",
  "Changes in sequence, scope or conditions are reviewed before work continues.": "Sıra, kapsam veya koşullardaki değişiklikler çalışmaya devam edilmeden önce gözden geçirilmektedir.",
  "Exclusion zones and communications between teams are effective.": "Yasaklı alanlar ve ekipler arası iletişim etkin şekilde uygulanmaktadır.",
  "The daily coordination briefing has been recorded.": "Günlük koordinasyon bilgilendirmesi kayıt altına alınmıştır.",

  "Electrical equipment is suitable for the voltage and environment.": "Elektrik ekipmanı gerilim seviyesi ve çalışma ortamı için uygundur.",
  "Cables, plugs, panels and enclosures show no unsafe damage.": "Kablolar, fişler, panolar ve muhafazalarda güvensiz hasar bulunmamaktadır.",
  "Protective devices and residual-current protection are available and tested.": "Koruyucu cihazlar ve kaçak akım koruması mevcut ve test edilmiştir.",
  "Isolation points are identified, accessible and correctly labelled.": "İzolasyon noktaları tanımlı, erişilebilir ve doğru şekilde etiketlenmiştir.",
  "Only authorized and competent persons perform electrical work.": "Elektrik işlerini yalnızca yetkili ve yetkin kişiler gerçekleştirmektedir.",
  "Temporary connections are protected from damage, water and trip hazards.": "Geçici bağlantılar hasar, su ve takılma tehlikelerine karşı korunmaktadır.",
  "Inspection and test records are current.": "Kontrol ve test kayıtları günceldir.",
  "Electrical work areas are controlled against unauthorized access.": "Elektrik çalışma alanları yetkisiz erişime karşı kontrol altındadır.",

  "Tools are suitable for the task and material.": "El aletleri yapılacak iş ve malzeme için uygundur.",
  "Handles, heads, guards and striking surfaces are in good condition.": "Saplar, başlıklar, koruyucular ve darbe yüzeyleri iyi durumdadır.",
  "Cutting tools are sharp, secure and stored safely.": "Kesici aletler keskin, güvenli ve uygun şekilde depolanmıştır.",
  "Damaged or modified tools are removed from service.": "Hasarlı veya değiştirilmiş el aletleri kullanım dışına alınmıştır.",
  "Workers use the tool correctly and maintain stable footing.": "Çalışanlar aleti doğru kullanmakta ve dengeli duruşu korumaktadır.",
  "Tools are transported and stored to prevent dropped-object exposure.": "Aletler düşen cisim riskini önleyecek şekilde taşınmakta ve depolanmaktadır.",
  "Insulated tools are used where electrical contact is possible.": "Elektrik teması ihtimali bulunan yerlerde yalıtımlı el aletleri kullanılmaktadır.",
  "Tool inspections are recorded according to site requirements.": "El aleti kontrolleri saha gerekliliklerine uygun şekilde kayıt altına alınmaktadır.",

  "The power tool is suitable for the task and operating environment.": "Elektrikli el aleti yapılacak iş ve çalışma ortamı için uygundur.",
  "Guards, handles, switches and trigger locks function correctly.": "Koruyucular, tutamaklar, anahtarlar ve tetik kilitleri doğru çalışmaktadır.",
  "Cables, plugs, batteries and chargers are free from unsafe damage.": "Kablolar, fişler, bataryalar ve şarj cihazlarında güvensiz hasar bulunmamaktadır.",
  "The tool is connected to the correct supply with required protection.": "Alet gerekli korumalarla doğru enerji kaynağına bağlanmıştır.",
  "Discs, blades and accessories are compatible and secured.": "Diskler, bıçaklar ve aksesuarlar uyumlu ve güvenli şekilde sabitlenmiştir.",
  "Dust, noise, vibration and ejected-material controls are in place.": "Toz, gürültü, titreşim ve fırlayan malzeme risklerine karşı kontroller uygulanmaktadır.",
  "Users are trained and wear the required PPE.": "Kullanıcılar eğitimlidir ve gerekli KKD'leri kullanmaktadır.",
  "Defective tools are isolated, labelled and reported.": "Arızalı aletler izole edilmiş, etiketlenmiş ve raporlanmıştır.",

  "The operator is authorized, competent and fit for duty.": "Operatör yetkili, yetkin ve göreve uygundur.",
  "Pre-use inspection records are complete and current.": "Kullanım öncesi kontrol kayıtları eksiksiz ve günceldir.",
  "Brakes, steering, alarms, lights and safety devices work correctly.": "Frenler, direksiyon, alarmlar, aydınlatmalar ve güvenlik cihazları doğru çalışmaktadır.",
  "Loads, attachments and rated capacity are suitable.": "Yükler, ataşmanlar ve nominal kapasite uygundur.",
  "Pedestrian routes and exclusion zones are established.": "Yaya yolları ve yasaklı alanlar oluşturulmuştur.",
  "Reversing controls, visibility and spotter arrangements are effective.": "Geri manevra kontrolleri, görüş ve işaretçi düzenlemeleri etkindir.",
  "Parking, isolation and securing procedures are followed.": "Park, izolasyon ve emniyete alma prosedürlerine uyulmaktadır.",
  "Leaks, damage and defects are reported and controlled.": "Sızıntılar, hasarlar ve arızalar raporlanmakta ve kontrol altına alınmaktadır.",

  "Fire hazards and ignition sources have been identified.": "Yangın tehlikeleri ve tutuşturucu kaynaklar belirlenmiştir.",
  "Suitable extinguishers are available, accessible and inspected.": "Uygun yangın söndürücüler mevcut, erişilebilir ve kontrol edilmiştir.",
  "Emergency exits and fire routes are clear and signed.": "Acil çıkışlar ve yangın kaçış yolları açık ve işaretlidir.",
  "Flammable liquids and gases are stored and handled correctly.": "Yanıcı sıvılar ve gazlar doğru şekilde depolanmakta ve kullanılmaktadır.",
  "Fire detection, alarm and emergency lighting are functional.": "Yangın algılama, alarm ve acil aydınlatma sistemleri çalışır durumdadır.",
  "Combustible waste is removed and housekeeping is acceptable.": "Yanıcı atıklar uzaklaştırılmış ve saha düzeni kabul edilebilir seviyededir.",
  "Workers know the alarm, evacuation and assembly arrangements.": "Çalışanlar alarm, tahliye ve toplanma düzenlemelerini bilmektedir.",
  "Hot work and temporary fire-risk controls are monitored.": "Sıcak çalışma ve geçici yangın riski kontrolleri izlenmektedir.",

  "Temporary distribution boards are rated, protected and secured.": "Geçici dağıtım panoları uygun değerlerde, korumalı ve emniyete alınmıştır.",
  "Circuits have appropriate overcurrent and residual-current protection.": "Devrelerde uygun aşırı akım ve kaçak akım koruması bulunmaktadır.",
  "Cables are routed, supported and protected from traffic and water.": "Kablolar uygun güzergâhtan geçirilmiş, desteklenmiş ve trafik ile sudan korunmuştur.",
  "Connections, plugs and sockets are enclosed and undamaged.": "Bağlantılar, fişler ve prizler muhafazalı ve hasarsızdır.",
  "Isolation and emergency shut-off points are labelled and accessible.": "İzolasyon ve acil kapatma noktaları etiketli ve erişilebilirdir.",
  "Generators are grounded, ventilated and safely refuelled.": "Jeneratörler topraklanmış, havalandırılmış ve güvenli şekilde yakıt ikmali yapılmaktadır.",
  "Only authorized persons make or modify connections.": "Bağlantıları yalnızca yetkili kişiler yapmakta veya değiştirmektedir.",
  "Periodic inspection and test records are available.": "Periyodik kontrol ve test kayıtları mevcuttur.",

  "PPE requirements are defined by the task risk assessment.": "KKD gereklilikleri işe ait risk değerlendirmesinde tanımlanmıştır.",
  "Required PPE is available in the correct type and size.": "Gerekli KKD doğru tür ve bedende mevcuttur.",
  "PPE is inspected before use and is free from unsafe damage.": "KKD kullanım öncesinde kontrol edilmiş ve güvensiz hasar bulunmamaktadır.",
  "Workers wear PPE correctly and consistently.": "Çalışanlar KKD'yi doğru ve sürekli şekilde kullanmaktadır.",
  "Eye, face, hearing, respiratory and hand protection match the hazards.": "Göz, yüz, işitme, solunum ve el koruyucuları mevcut tehlikelere uygundur.",
  "Fall protection PPE is compatible, inspected and connected correctly.": "Düşmeye karşı KKD uyumlu, kontrol edilmiş ve doğru şekilde bağlanmıştır.",
  "Contaminated or expired PPE is removed from service.": "Kirlenmiş veya kullanım süresi dolmuş KKD kullanım dışına alınmıştır.",
  "PPE training, issue and replacement records are maintained.": "KKD eğitimi, teslimi ve değişim kayıtları tutulmaktadır.",

  "Walkways, stairs and work areas are clear.": "Yürüme yolları, merdivenler ve çalışma alanları açıktır.",
  "Materials are stacked securely and do not obstruct access.": "Malzemeler güvenli şekilde istiflenmiş ve erişimi engellememektedir.",
  "Waste is segregated, contained and removed regularly.": "Atıklar ayrıştırılmış, uygun şekilde muhafaza edilmiş ve düzenli olarak uzaklaştırılmaktadır.",
  "Spills are controlled and cleaned without delay.": "Döküntüler kontrol altına alınmakta ve gecikmeden temizlenmektedir.",
  "Cables, hoses and temporary services are routed safely.": "Kablolar, hortumlar ve geçici hatlar güvenli güzergâhlardan geçirilmektedir.",
  "Openings, edges and uneven surfaces are protected.": "Açıklıklar, kenarlar ve düzensiz yüzeyler korunmuştur.",
  "Emergency equipment and exits remain accessible.": "Acil durum ekipmanları ve çıkışlar erişilebilir durumdadır.",
  "Housekeeping responsibilities and inspection frequency are defined.": "Saha düzeni sorumlulukları ve kontrol sıklığı tanımlanmıştır.",

  "The load weight, shape and route have been assessed.": "Yükün ağırlığı, şekli ve taşıma güzergâhı değerlendirilmiştir.",
  "Mechanical assistance is used where reasonably practicable.": "Makul ölçüde uygulanabilir olduğu yerlerde mekanik yardım kullanılmaktadır.",
  "The load can be gripped securely without sharp or unstable edges.": "Yük keskin veya dengesiz kenarlara maruz kalmadan güvenli şekilde kavranabilmektedir.",
  "The route is clear, level and adequately lit.": "Taşıma güzergâhı açık, düzgün ve yeterli şekilde aydınlatılmıştır.",
  "Team lifting roles and communication are agreed.": "Ekip kaldırma görevleri ve iletişim yöntemi kararlaştırılmıştır.",
  "Workers use safe posture and avoid twisting under load.": "Çalışanlar güvenli duruş kullanmakta ve yük altında dönme hareketinden kaçınmaktadır.",
  "Rest, rotation or recovery arrangements address repetitive handling.": "Dinlenme, rotasyon veya toparlanma düzenlemeleri tekrarlayan taşıma riskini azaltmaktadır.",
  "Manual handling incidents and discomfort are reported and reviewed.": "Manuel taşıma olayları ve rahatsızlık şikâyetleri raporlanmakta ve gözden geçirilmektedir.",

  "Current SDS documents are available and understood.": "Güncel SDS belgeleri mevcut ve çalışanlar tarafından anlaşılmıştır.",
  "Containers are labelled, closed and compatible with the substance.": "Kaplar etiketli, kapalı ve içerdiği maddeyle uyumludur.",
  "Chemicals are segregated and stored with suitable secondary containment.": "Kimyasallar ayrıştırılmış ve uygun ikincil muhafaza ile depolanmıştır.",
  "Ventilation and exposure controls are adequate.": "Havalandırma ve maruziyet kontrolleri yeterlidir.",
  "Required gloves, eye, face and respiratory protection are available.": "Gerekli eldiven, göz, yüz ve solunum koruması mevcuttur.",
  "Spill kits and emergency eyewash or shower facilities are accessible.": "Döküntü kitleri ile acil göz duşu veya duş imkânları erişilebilirdir.",
  "Workers are trained in handling, transfer and disposal.": "Çalışanlar kullanım, transfer ve bertaraf işlemlerinde eğitimlidir.",
  "Expired, unknown or leaking chemicals are isolated and reported.": "Süresi dolmuş, içeriği bilinmeyen veya sızıntılı kimyasallar izole edilip raporlanmıştır.",

  "The traffic management plan is current and communicated.": "Trafik yönetim planı güncel ve çalışanlara duyurulmuştur.",
  "Vehicle routes, speed limits and one-way systems are signed.": "Araç güzergâhları, hız limitleri ve tek yön uygulamaları işaretlenmiştir.",
  "Pedestrian routes are segregated from moving vehicles.": "Yaya yolları hareketli araçlardan ayrılmıştır.",
  "Vehicles are inspected and safety-critical defects are controlled.": "Araçlar kontrol edilmekte ve güvenlik açısından kritik arızalar yönetilmektedir.",
  "Reversing, parking and loading controls are established.": "Geri manevra, park ve yükleme kontrolleri oluşturulmuştur.",
  "Drivers are authorized and seat belts are used.": "Sürücüler yetkilidir ve emniyet kemeri kullanılmaktadır.",
  "Lighting, visibility and weather conditions are suitable.": "Aydınlatma, görüş ve hava koşulları güvenli çalışma için uygundur.",
  "Incidents, near misses and route changes are reviewed.": "Olaylar, ramak kala olaylar ve güzergâh değişiklikleri gözden geçirilmektedir.",

  "The observation scope, task and location are recorded.": "Gözlemin kapsamı, faaliyeti ve konumu kayıt altına alınmıştır.",
  "Critical behaviours and life-saving rules are checked.": "Kritik davranışlar ve hayat kurtaran kurallar kontrol edilmektedir.",
  "Positive safe behaviours are recognized.": "Olumlu güvenli davranışlar fark edilip desteklenmektedir.",
  "At-risk acts and conditions are described factually.": "Riskli davranış ve koşullar nesnel şekilde tanımlanmaktadır.",
  "The worker or team is engaged respectfully during feedback.": "Geri bildirim sırasında çalışan veya ekiple saygılı iletişim kurulmaktadır.",
  "Immediate controls are applied where serious risk is observed.": "Ciddi risk görüldüğünde derhal kontrol önlemleri uygulanmaktadır.",
  "Actions have an owner and target date.": "Aksiyonların sorumlusu ve hedef tarihi belirlenmiştir.",
  "Trends and repeat observations are reviewed.": "Eğilimler ve tekrarlayan gözlemler gözden geçirilmektedir.",

  "The emergency plan covers credible site scenarios.": "Acil durum planı sahadaki gerçekçi senaryoları kapsamaktadır.",
  "Roles, responsibilities and escalation contacts are current.": "Görevler, sorumluluklar ve eskalasyon iletişim bilgileri günceldir.",
  "Alarm, communication and notification systems are functional.": "Alarm, iletişim ve bildirim sistemleri çalışır durumdadır.",
  "Escape routes, exits and assembly points are clear.": "Kaçış yolları, çıkışlar ve toplanma alanları açıktır.",
  "Emergency equipment is available and inspected.": "Acil durum ekipmanları mevcut ve kontrol edilmiştir.",
  "Drills are scheduled, recorded and followed by corrective actions.": "Tatbikatlar planlanmakta, kayıt altına alınmakta ve düzeltici faaliyetlerle takip edilmektedir.",
  "Contractors and visitors receive emergency information.": "Alt yükleniciler ve ziyaretçiler acil durum bilgilerini almaktadır.",
  "Changes in site layout or work scope are reflected in the plan.": "Saha yerleşimi veya iş kapsamındaki değişiklikler plana yansıtılmaktadır.",

  "The required number of trained first aiders is available.": "Gerekli sayıda eğitimli ilk yardımcı mevcuttur.",
  "First aid kits are accessible, stocked and sealed where required.": "İlk yardım çantaları erişilebilir, eksiksiz ve gerektiğinde mühürlüdür.",
  "First aid room or treatment area is clean and suitable.": "İlk yardım odası veya müdahale alanı temiz ve uygundur.",
  "Emergency contact and location information is displayed.": "Acil durum iletişim ve konum bilgileri görünür şekilde paylaşılmıştır.",
  "First aiders know the site emergency and reporting process.": "İlk yardımcılar saha acil durum ve raporlama sürecini bilmektedir.",
  "Eye wash, burn treatment and other task-specific supplies are available.": "Göz duşu, yanık müdahale malzemeleri ve işe özel diğer malzemeler mevcuttur.",
  "Expired or used supplies are replaced promptly.": "Süresi dolmuş veya kullanılmış malzemeler gecikmeden yenilenmektedir.",
  "First aid cases and trends are reviewed for preventive action.": "İlk yardım vakaları ve eğilimler önleyici faaliyet amacıyla gözden geçirilmektedir.",

  "Relevant environmental aspects and permit conditions are identified.": "İlgili çevresel boyutlar ve izin koşulları belirlenmiştir.",
  "Waste is segregated, labelled and transferred to approved streams.": "Atıklar ayrıştırılmış, etiketlenmiş ve onaylı atık akışlarına aktarılmaktadır.",
  "Spills, leaks and contaminated materials are controlled.": "Döküntüler, sızıntılar ve kirlenmiş malzemeler kontrol altındadır.",
  "Dust, noise, emissions and discharge controls are effective.": "Toz, gürültü, emisyon ve deşarj kontrolleri etkindir.",
  "Fuel, chemicals and hazardous materials are stored securely.": "Yakıt, kimyasallar ve tehlikeli malzemeler güvenli şekilde depolanmaktadır.",
  "Water, energy and material use are monitored where required.": "Su, enerji ve malzeme kullanımı gerektiğinde izlenmektedir.",
  "Environmental incidents and complaints are reported promptly.": "Çevresel olaylar ve şikâyetler gecikmeden raporlanmaktadır.",
  "Inspection findings have owners, due dates and verification.": "Denetim bulgularının sorumluları, termin tarihleri ve doğrulama kayıtları bulunmaktadır.",

  "Toilets, washing facilities and drinking water are available.": "Tuvaletler, yıkanma imkânları ve içme suyu mevcuttur.",
  "Facilities are clean, maintained and adequately ventilated.": "Tesisler temiz, bakımlı ve yeterli şekilde havalandırılmaktadır.",
  "Rest, changing and eating areas are suitable for the workforce.": "Dinlenme, soyunma ve yemek alanları çalışanlar için uygundur.",
  "Lighting, heating and weather protection are adequate.": "Aydınlatma, ısıtma ve hava koşullarına karşı koruma yeterlidir.",
  "Facilities are accessible to all applicable workers.": "Tesisler ilgili tüm çalışanlar için erişilebilirdir.",
  "Cleaning schedules and consumable supplies are maintained.": "Temizlik planları ve sarf malzemeleri düzenli şekilde sürdürülmektedir.",
  "Pest, hygiene and waste controls are effective.": "Haşere, hijyen ve atık kontrolleri etkindir.",
  "Welfare concerns are reported, tracked and closed.": "Çalışan refahı ile ilgili sorunlar raporlanmakta, takip edilmekte ve kapatılmaktadır.",
};

function text(en: string, tr: string): LocalizedText {
  return { en, tr };
}

function item(
  id: string,
  en: string,
  tr: string,
  critical = false,
  riskLevel: ChecklistItem["riskLevel"] = critical ? "High" : "Medium",
): ChecklistItem {
  return {
    id,
    requirement: text(en, tr),
    critical,
    riskLevel,
    applicability: "required",
    guidance: text(`Verify: ${en}`, `Doğrulayın: ${tr}`),
    correctiveAction: text(`Correct this finding before work continues: ${en}`, `Çalışma devam etmeden önce bu bulguyu giderin: ${tr}`),
    references: standards,
    related: {},
  };
}

function createChecklist(
  id: string,
  slug: string,
  title: LocalizedText,
  description: LocalizedText,
  category: LocalizedText,
  sectionTitle: LocalizedText,
  items: ChecklistItem[],
): ChecklistDocument {
  return {
    id,
    slug,
    title,
    description,
    category,
    version: "1.0",
    revision: "0",
    status: "approved",
    responseOptions: ["yes", "no", "na"],
    standards,
    disclaimer: text(
      "This checklist supports field verification and does not replace legislation, risk assessments, permits or site procedures.",
      "Bu kontrol listesi saha doğrulamasını destekler; mevzuatın, risk değerlendirmelerinin, izinlerin veya saha prosedürlerinin yerine geçmez.",
    ),
    sections: [
      { id: `${slug}-controls`, title: sectionTitle, items: items.slice(0, 8) },
      {
        id: `${slug}-management`,
        title: text("Management, Emergency and Closeout", "Yönetim, Acil Durum ve Kapatma"),
        items: items.slice(8),
      },
    ],
  };
}

const definitions = [
  ["excavation", "Excavation Inspection Checklist", "Kazı Denetim Kontrol Listesi", "Critical Work", "Kritik İşler", "Excavation Controls", "Kazı Kontrolleri", "Excavation and trench work controls.", "Kazı ve hendek çalışması kontrolleri.", ["The excavation has been assessed for collapse, services and access hazards.", "A competent person has inspected the excavation before each shift.", "Protective systems, benching or safe slopes are suitable for the soil and depth.", "Safe access and egress are provided within the required distance.", "Spoil, materials and equipment are kept away from the edge.", "Water accumulation, atmosphere and changing ground conditions are controlled.", "Nearby traffic, plant and falling-object hazards are segregated.", "The excavation is barricaded and inspected after changes or adverse weather."]],
  ["simops", "SIMOPS Inspection Checklist", "SIMOPS Denetim Kontrol Listesi", "Critical Work", "Kritik İşler", "SIMOPS Coordination", "SIMOPS Koordinasyonu", "Controls for simultaneous and conflicting operations.", "Eş zamanlı ve çakışan faaliyet kontrolleri.", ["All simultaneous operations are identified on the coordination plan.", "Conflicting hazards and interfaces have assigned control owners.", "Permit boundaries, isolations and work fronts are clearly communicated.", "A competent coordinator can stop conflicting work.", "Emergency routes and response arrangements remain available.", "Changes in sequence, scope or conditions are reviewed before work continues.", "Exclusion zones and communications between teams are effective.", "The daily coordination briefing has been recorded."]],
  ["electrical-safety", "Electrical Safety Inspection Checklist", "Elektrik Güvenliği Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Electrical Controls", "Elektrik Kontrolleri", "Electrical installations, isolation and protection checks.", "Elektrik tesisatı, izolasyon ve koruma kontrolleri.", ["Electrical equipment is suitable for the voltage and environment.", "Cables, plugs, panels and enclosures show no unsafe damage.", "Protective devices and residual-current protection are available and tested.", "Isolation points are identified, accessible and correctly labelled.", "Only authorized and competent persons perform electrical work.", "Temporary connections are protected from damage, water and trip hazards.", "Inspection and test records are current.", "Electrical work areas are controlled against unauthorized access."]],
  ["hand-tools", "Hand Tools Inspection Checklist", "El Aletleri Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Hand Tool Controls", "El Aleti Kontrolleri", "Condition and safe use checks for hand tools.", "El aletlerinin durumu ve güvenli kullanım kontrolleri.", ["Tools are suitable for the task and material.", "Handles, heads, guards and striking surfaces are in good condition.", "Cutting tools are sharp, secure and stored safely.", "Damaged or modified tools are removed from service.", "Workers use the tool correctly and maintain stable footing.", "Tools are transported and stored to prevent dropped-object exposure.", "Insulated tools are used where electrical contact is possible.", "Tool inspections are recorded according to site requirements."]],
  ["power-tools", "Power Tools Inspection Checklist", "Elektrikli El Aletleri Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Power Tool Controls", "Elektrikli El Aleti Kontrolleri", "Portable powered tool safety checks.", "Taşınabilir elektrikli alet güvenliği kontrolleri.", ["The power tool is suitable for the task and operating environment.", "Guards, handles, switches and trigger locks function correctly.", "Cables, plugs, batteries and chargers are free from unsafe damage.", "The tool is connected to the correct supply with required protection.", "Discs, blades and accessories are compatible and secured.", "Dust, noise, vibration and ejected-material controls are in place.", "Users are trained and wear the required PPE.", "Defective tools are isolated, labelled and reported."]],
  ["mobile-equipment", "Mobile Equipment Inspection Checklist", "Mobil Ekipman Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Mobile Equipment Controls", "Mobil Ekipman Kontrolleri", "Pre-use checks for mobile plant and equipment.", "Mobil iş makineleri ve ekipmanları için kullanım öncesi kontroller.", ["The operator is authorized, competent and fit for duty.", "Pre-use inspection records are complete and current.", "Brakes, steering, alarms, lights and safety devices work correctly.", "Loads, attachments and rated capacity are suitable.", "Pedestrian routes and exclusion zones are established.", "Reversing controls, visibility and spotter arrangements are effective.", "Parking, isolation and securing procedures are followed.", "Leaks, damage and defects are reported and controlled."]],
  ["fire-safety", "Fire Safety Inspection Checklist", "Yangın Güvenliği Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Fire Prevention Controls", "Yangın Önleme Kontrolleri", "Workplace fire prevention and response readiness.", "İşyeri yangın önleme ve müdahale hazırlığı.", ["Fire hazards and ignition sources have been identified.", "Suitable extinguishers are available, accessible and inspected.", "Emergency exits and fire routes are clear and signed.", "Flammable liquids and gases are stored and handled correctly.", "Fire detection, alarm and emergency lighting are functional.", "Combustible waste is removed and housekeeping is acceptable.", "Workers know the alarm, evacuation and assembly arrangements.", "Hot work and temporary fire-risk controls are monitored."]],
  ["temporary-power", "Temporary Power Inspection Checklist", "Geçici Elektrik Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Temporary Power Controls", "Geçici Elektrik Kontrolleri", "Temporary distribution and site power controls.", "Geçici dağıtım ve saha elektriği kontrolleri.", ["Temporary distribution boards are rated, protected and secured.", "Circuits have appropriate overcurrent and residual-current protection.", "Cables are routed, supported and protected from traffic and water.", "Connections, plugs and sockets are enclosed and undamaged.", "Isolation and emergency shut-off points are labelled and accessible.", "Generators are grounded, ventilated and safely refuelled.", "Only authorized persons make or modify connections.", "Periodic inspection and test records are available."]],
  ["ppe", "PPE Inspection Checklist", "KKD Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "PPE Controls", "KKD Kontrolleri", "Selection, condition and use of personal protective equipment.", "Kişisel koruyucu donanımın seçimi, durumu ve kullanımı.", ["PPE requirements are defined by the task risk assessment.", "Required PPE is available in the correct type and size.", "PPE is inspected before use and is free from unsafe damage.", "Workers wear PPE correctly and consistently.", "Eye, face, hearing, respiratory and hand protection match the hazards.", "Fall protection PPE is compatible, inspected and connected correctly.", "Contaminated or expired PPE is removed from service.", "PPE training, issue and replacement records are maintained."]],
  ["housekeeping", "Housekeeping Inspection Checklist", "Saha Düzeni Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Housekeeping Controls", "Saha Düzeni Kontrolleri", "Workplace order, access and waste controls.", "İşyeri düzeni, erişim ve atık kontrolleri.", ["Walkways, stairs and work areas are clear.", "Materials are stacked securely and do not obstruct access.", "Waste is segregated, contained and removed regularly.", "Spills are controlled and cleaned without delay.", "Cables, hoses and temporary services are routed safely.", "Openings, edges and uneven surfaces are protected.", "Emergency equipment and exits remain accessible.", "Housekeeping responsibilities and inspection frequency are defined."]],
  ["manual-handling", "Manual Handling Inspection Checklist", "Manuel Taşıma Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Manual Handling Controls", "Manuel Taşıma Kontrolleri", "Ergonomic and manual load handling checks.", "Ergonomik ve manuel yük taşıma kontrolleri.", ["The load weight, shape and route have been assessed.", "Mechanical assistance is used where reasonably practicable.", "The load can be gripped securely without sharp or unstable edges.", "The route is clear, level and adequately lit.", "Team lifting roles and communication are agreed.", "Workers use safe posture and avoid twisting under load.", "Rest, rotation or recovery arrangements address repetitive handling.", "Manual handling incidents and discomfort are reported and reviewed."]],
  ["chemical-safety", "Chemical Safety Inspection Checklist", "Kimyasal Güvenlik Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Chemical Controls", "Kimyasal Kontrolleri", "Chemical storage, handling and emergency controls.", "Kimyasal depolama, kullanım ve acil durum kontrolleri.", ["Current SDS documents are available and understood.", "Containers are labelled, closed and compatible with the substance.", "Chemicals are segregated and stored with suitable secondary containment.", "Ventilation and exposure controls are adequate.", "Required gloves, eye, face and respiratory protection are available.", "Spill kits and emergency eyewash or shower facilities are accessible.", "Workers are trained in handling, transfer and disposal.", "Expired, unknown or leaking chemicals are isolated and reported."]],
  ["vehicle-traffic", "Vehicle and Traffic Safety Inspection Checklist", "Araç ve Trafik Güvenliği Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Traffic Controls", "Trafik Kontrolleri", "Site vehicle movement and pedestrian safety checks.", "Saha araç hareketleri ve yaya güvenliği kontrolleri.", ["The traffic management plan is current and communicated.", "Vehicle routes, speed limits and one-way systems are signed.", "Pedestrian routes are segregated from moving vehicles.", "Vehicles are inspected and safety-critical defects are controlled.", "Reversing, parking and loading controls are established.", "Drivers are authorized and seat belts are used.", "Lighting, visibility and weather conditions are suitable.", "Incidents, near misses and route changes are reviewed."]],
  ["safety-observation", "Safety Observation Checklist", "Güvenlik Gözlemi Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Observation Controls", "Gözlem Kontrolleri", "Structured positive and at-risk behaviour observations.", "Olumlu ve riskli davranışlar için yapılandırılmış saha gözlemi.", ["The observation scope, task and location are recorded.", "Critical behaviours and life-saving rules are checked.", "Positive safe behaviours are recognized.", "At-risk acts and conditions are described factually.", "The worker or team is engaged respectfully during feedback.", "Immediate controls are applied where serious risk is observed.", "Actions have an owner and target date.", "Trends and repeat observations are reviewed."]],
  ["emergency-preparedness", "Emergency Preparedness Inspection Checklist", "Acil Durum Hazırlık Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "Emergency Readiness", "Acil Durum Hazırlığı", "Emergency planning, communication and response readiness.", "Acil durum planlama, iletişim ve müdahale hazırlığı.", ["The emergency plan covers credible site scenarios.", "Roles, responsibilities and escalation contacts are current.", "Alarm, communication and notification systems are functional.", "Escape routes, exits and assembly points are clear.", "Emergency equipment is available and inspected.", "Drills are scheduled, recorded and followed by corrective actions.", "Contractors and visitors receive emergency information.", "Changes in site layout or work scope are reflected in the plan."]],
  ["first-aid", "First Aid Inspection Checklist", "İlk Yardım Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "First Aid Readiness", "İlk Yardım Hazırlığı", "First aid coverage, equipment and response readiness.", "İlk yardım kapsamı, ekipmanı ve müdahale hazırlığı.", ["The required number of trained first aiders is available.", "First aid kits are accessible, stocked and sealed where required.", "First aid room or treatment area is clean and suitable.", "Emergency contact and location information is displayed.", "First aiders know the site emergency and reporting process.", "Eye wash, burn treatment and other task-specific supplies are available.", "Expired or used supplies are replaced promptly.", "First aid cases and trends are reviewed for preventive action."]],
  ["environmental", "Environmental Inspection Checklist", "Çevre Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "Environmental Controls", "Çevre Kontrolleri", "Operational environmental aspect and impact checks.", "Operasyonel çevre boyut ve etki kontrolleri.", ["Relevant environmental aspects and permit conditions are identified.", "Waste is segregated, labelled and transferred to approved streams.", "Spills, leaks and contaminated materials are controlled.", "Dust, noise, emissions and discharge controls are effective.", "Fuel, chemicals and hazardous materials are stored securely.", "Water, energy and material use are monitored where required.", "Environmental incidents and complaints are reported promptly.", "Inspection findings have owners, due dates and verification."]],
  ["welfare", "Welfare Facilities Inspection Checklist", "Refah Tesisleri Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "Welfare Standards", "Refah Standartları", "Worker welfare, hygiene and accommodation facility checks.", "Çalışan refahı, hijyen ve tesis kontrolleri.", ["Toilets, washing facilities and drinking water are available.", "Facilities are clean, maintained and adequately ventilated.", "Rest, changing and eating areas are suitable for the workforce.", "Lighting, heating and weather protection are adequate.", "Facilities are accessible to all applicable workers.", "Cleaning schedules and consumable supplies are maintained.", "Pest, hygiene and waste controls are effective.", "Welfare concerns are reported, tracked and closed."]],
] as const;

export const additionalChecklists: ChecklistDocument[] = definitions.map((definition, index) => {
  const [slug, enTitle, trTitle, enCategory, trCategory, enSection, trSection, enDescription, trDescription, itemTexts] = definition;
  return createChecklist(
    `SB-CHK-${String(index + 7).padStart(2, "0")}-001`,
    slug,
    text(enTitle, trTitle),
    text(enDescription, trDescription),
    text(enCategory, trCategory),
    text(enSection, trSection),
    [...itemTexts.map((requirement) => [requirement, turkishRequirementByEnglish[requirement] ?? requirement] as const), ...professionalControls].map(([requirement, turkishRequirement], itemIndex) => item(
      `${slug.toUpperCase().replaceAll("-", "_")}-${String(itemIndex + 1).padStart(3, "0")}`,
      requirement,
      turkishRequirement,
      itemIndex < 2,
      itemIndex < 2 ? "High" : itemIndex < 5 ? "Medium" : "Low",
    )),
  );
});
