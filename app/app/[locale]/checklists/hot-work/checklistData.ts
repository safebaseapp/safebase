import type { ChecklistItem, Locale } from "./types";

export const checklistItems: Record<Locale, ChecklistItem[]> = {
  en: [
    // PERMIT AND AUTHORIZATION
    {
      id: "permit-valid",
      section: "Permit and Authorization",
      text: "A valid hot work permit has been issued for the exact work area, activity and time period.",
      critical: true,
    },
    {
      id: "permit-scope",
      section: "Permit and Authorization",
      text: "The work scope, equipment and hot work method match the approved permit.",
      critical: true,
    },
    {
      id: "permit-signatures",
      section: "Permit and Authorization",
      text: "All required permit approvals and signatures have been completed.",
      critical: true,
    },
    {
      id: "permit-conditions",
      section: "Permit and Authorization",
      text: "All precautions stated on the permit have been implemented.",
      critical: true,
    },
    {
      id: "permit-simops",
      section: "Permit and Authorization",
      text: "Simultaneous operations and nearby activities have been reviewed and coordinated.",
      critical: true,
    },

    // WORK AREA PREPARATION
    {
      id: "area-barricaded",
      section: "Work Area Preparation",
      text: "The hot work area is clearly identified, barricaded and access is controlled.",
    },
    {
      id: "area-combustibles-removed",
      section: "Work Area Preparation",
      text: "Combustible and flammable materials have been removed from the spark and heat exposure area.",
      critical: true,
    },
    {
      id: "area-openings-protected",
      section: "Work Area Preparation",
      text: "Floor openings, drains, wall penetrations and gaps are covered or protected against sparks.",
      critical: true,
    },
    {
      id: "area-levels-checked",
      section: "Work Area Preparation",
      text: "Areas above, below and behind the hot work location have been inspected.",
      critical: true,
    },
    {
      id: "area-fire-blankets",
      section: "Work Area Preparation",
      text: "Suitable fire-resistant blankets or screens are installed where sparks or molten metal may travel.",
      critical: true,
    },
    {
      id: "area-housekeeping",
      section: "Work Area Preparation",
      text: "The work area is clean and free from waste, oily rags and unnecessary materials.",
    },

    // GAS TESTING
    {
      id: "gas-test-required",
      section: "Atmospheric and Gas Testing",
      text: "Atmospheric testing requirements have been identified before work begins.",
      critical: true,
    },
    {
      id: "gas-test-device",
      section: "Atmospheric and Gas Testing",
      text: "The gas detector is suitable, functional and within its calibration period.",
      critical: true,
    },
    {
      id: "gas-test-oxygen",
      section: "Atmospheric and Gas Testing",
      text: "Oxygen concentration is within the site-approved safe range.",
      critical: true,
    },
    {
      id: "gas-test-lel",
      section: "Atmospheric and Gas Testing",
      text: "Flammable gas or vapor concentration is within the permitted hot work limit.",
      critical: true,
    },
    {
      id: "gas-test-toxic",
      section: "Atmospheric and Gas Testing",
      text: "Relevant toxic gases and vapors have been tested where exposure may occur.",
      critical: true,
    },
    {
      id: "gas-test-continuous",
      section: "Atmospheric and Gas Testing",
      text: "Continuous gas monitoring is provided where required by the permit or risk assessment.",
      critical: true,
    },
    {
      id: "gas-test-recorded",
      section: "Atmospheric and Gas Testing",
      text: "Gas test results, time and tester information are recorded on the permit.",
      critical: true,
    },

    // PROCESS ISOLATION
    {
      id: "isolation-equipment",
      section: "Process Isolation",
      text: "Equipment, piping and vessels affected by the work have been safely isolated.",
      critical: true,
    },
    {
      id: "isolation-loto",
      section: "Process Isolation",
      text: "Required lockout and tagout controls are applied and verified.",
      critical: true,
    },
    {
      id: "isolation-drained",
      section: "Process Isolation",
      text: "Residual pressure, liquids, gases and hazardous materials have been removed.",
      critical: true,
    },
    {
      id: "isolation-cleaned",
      section: "Process Isolation",
      text: "Containers, pipes or equipment previously holding flammable materials have been cleaned and tested.",
      critical: true,
    },
    {
      id: "isolation-drains",
      section: "Process Isolation",
      text: "Nearby drains and openings that may contain flammable vapors are sealed or controlled.",
      critical: true,
    },

    // FIRE PREVENTION
    {
      id: "fire-extinguisher",
      section: "Fire Prevention and Emergency Readiness",
      text: "Suitable and inspected fire extinguishers are immediately available.",
      critical: true,
    },
    {
      id: "fire-hose",
      section: "Fire Prevention and Emergency Readiness",
      text: "A charged fire hose or additional firefighting equipment is available where required.",
    },
    {
      id: "fire-alarm",
      section: "Fire Prevention and Emergency Readiness",
      text: "The method for raising an alarm and contacting emergency response is understood.",
      critical: true,
    },
    {
      id: "fire-access",
      section: "Fire Prevention and Emergency Readiness",
      text: "Emergency access routes and firefighting equipment remain unobstructed.",
      critical: true,
    },
    {
      id: "fire-escape",
      section: "Fire Prevention and Emergency Readiness",
      text: "Workers have a clear and safe escape route from the work area.",
      critical: true,
    },

    // FIRE WATCH
    {
      id: "watch-assigned",
      section: "Fire Watch",
      text: "A trained and authorized fire watch has been assigned where required.",
      critical: true,
    },
    {
      id: "watch-position",
      section: "Fire Watch",
      text: "The fire watch is positioned to observe the work area and all spark exposure locations.",
      critical: true,
    },
    {
      id: "watch-extinguisher",
      section: "Fire Watch",
      text: "The fire watch has immediate access to suitable firefighting equipment.",
      critical: true,
    },
    {
      id: "watch-no-other-duty",
      section: "Fire Watch",
      text: "The fire watch is not assigned duties that interfere with continuous observation.",
      critical: true,
    },
    {
      id: "watch-post-work",
      section: "Fire Watch",
      text: "Post-work fire monitoring duration has been defined according to site requirements.",
      critical: true,
    },

    // WELDING AND CUTTING EQUIPMENT
    {
      id: "equipment-inspected",
      section: "Welding and Cutting Equipment",
      text: "Welding, cutting and heating equipment has been visually inspected before use.",
      critical: true,
    },
    {
      id: "equipment-cables",
      section: "Welding and Cutting Equipment",
      text: "Welding leads, electrode holders and electrical cables are undamaged and properly insulated.",
      critical: true,
    },
    {
      id: "equipment-grounding",
      section: "Welding and Cutting Equipment",
      text: "The welding return connection is secure and positioned as close as practicable to the work.",
      critical: true,
    },
    {
      id: "equipment-machine",
      section: "Welding and Cutting Equipment",
      text: "The welding machine is correctly positioned, protected and connected to a suitable power supply.",
    },
    {
      id: "equipment-hoses",
      section: "Welding and Cutting Equipment",
      text: "Gas hoses are undamaged, correctly connected and protected from heat, sparks and traffic.",
      critical: true,
    },
    {
      id: "equipment-regulators",
      section: "Welding and Cutting Equipment",
      text: "Gas regulators, gauges and flashback arrestors are suitable and in good condition.",
      critical: true,
    },
    {
      id: "equipment-leak-test",
      section: "Welding and Cutting Equipment",
      text: "Gas connections have been checked for leakage using an approved method.",
      critical: true,
    },

    // GAS CYLINDERS
    {
      id: "cylinder-upright",
      section: "Compressed Gas Cylinders",
      text: "Gas cylinders are upright and securely restrained against falling.",
      critical: true,
    },
    {
      id: "cylinder-condition",
      section: "Compressed Gas Cylinders",
      text: "Cylinders, valves and identification markings are in acceptable condition.",
      critical: true,
    },
    {
      id: "cylinder-separation",
      section: "Compressed Gas Cylinders",
      text: "Oxygen and fuel gas cylinders are separated or protected as required.",
      critical: true,
    },
    {
      id: "cylinder-heat",
      section: "Compressed Gas Cylinders",
      text: "Cylinders are protected from flames, sparks, excessive heat and physical damage.",
      critical: true,
    },
    {
      id: "cylinder-key",
      section: "Compressed Gas Cylinders",
      text: "The cylinder valve key or closing tool is immediately available where applicable.",
    },
    {
      id: "cylinder-not-in-use",
      section: "Compressed Gas Cylinders",
      text: "Cylinder valves are closed when equipment is not in use.",
      critical: true,
    },

    // GRINDING
    {
      id: "grinding-disc",
      section: "Grinding and Spark-Producing Tools",
      text: "Grinding discs are suitable for the machine, material and maximum operating speed.",
      critical: true,
    },
    {
      id: "grinding-guard",
      section: "Grinding and Spark-Producing Tools",
      text: "The grinder guard is correctly installed and adjusted.",
      critical: true,
    },
    {
      id: "grinding-handle",
      section: "Grinding and Spark-Producing Tools",
      text: "The auxiliary handle is installed and used where designed.",
    },
    {
      id: "grinding-condition",
      section: "Grinding and Spark-Producing Tools",
      text: "The grinder, switch, cable and plug are free from visible damage.",
      critical: true,
    },
    {
      id: "grinding-direction",
      section: "Grinding and Spark-Producing Tools",
      text: "Sparks are directed away from people, equipment, cables and combustible materials.",
      critical: true,
    },

    // PPE
    {
      id: "ppe-face",
      section: "Personal Protective Equipment",
      text: "Suitable welding helmet, face shield or eye protection is being used.",
      critical: true,
    },
    {
      id: "ppe-clothing",
      section: "Personal Protective Equipment",
      text: "Flame-resistant clothing fully covers exposed skin and is free from oil contamination.",
      critical: true,
    },
    {
      id: "ppe-gloves",
      section: "Personal Protective Equipment",
      text: "Suitable heat-resistant welding or work gloves are worn.",
      critical: true,
    },
    {
      id: "ppe-footwear",
      section: "Personal Protective Equipment",
      text: "Safety footwear provides suitable protection against sparks and molten metal.",
    },
    {
      id: "ppe-hearing",
      section: "Personal Protective Equipment",
      text: "Hearing protection is used where noise exposure requires it.",
    },
    {
      id: "ppe-respiratory",
      section: "Personal Protective Equipment",
      text: "Appropriate respiratory protection is used where ventilation cannot adequately control fumes.",
      critical: true,
    },

    // VENTILATION
    {
      id: "ventilation-adequate",
      section: "Ventilation and Fume Control",
      text: "Natural or mechanical ventilation is adequate to control welding fumes and gases.",
      critical: true,
    },
    {
      id: "ventilation-extraction",
      section: "Ventilation and Fume Control",
      text: "Local exhaust ventilation is positioned effectively without disturbing shielding gas.",
    },
    {
      id: "ventilation-intake",
      section: "Ventilation and Fume Control",
      text: "Fumes are not directed toward air intakes, occupied areas or other workers.",
      critical: true,
    },

    // SPECIAL CONDITIONS
    {
      id: "special-confined-space",
      section: "Special Work Conditions",
      text: "Confined-space requirements are implemented where hot work is performed inside an enclosed space.",
      critical: true,
    },
    {
      id: "special-height",
      section: "Special Work Conditions",
      text: "Fall protection and dropped-object controls are implemented where hot work is performed at height.",
      critical: true,
    },
    {
      id: "special-weather",
      section: "Special Work Conditions",
      text: "Weather conditions do not create additional electrical, fire or exposure risks.",
    },
    {
      id: "special-coatings",
      section: "Special Work Conditions",
      text: "Paints, coatings, insulation and surface contaminants have been assessed for toxic or flammable emissions.",
      critical: true,
    },

    // FINAL AUTHORIZATION
    {
      id: "final-briefing",
      section: "Final Authorization",
      text: "The work team has received a task-specific toolbox talk and understands the controls.",
      critical: true,
    },
    {
      id: "final-communication",
      section: "Final Authorization",
      text: "Communication between the worker, fire watch, permit issuer and area operator is established.",
      critical: true,
    },
    {
      id: "final-stop-work",
      section: "Final Authorization",
      text: "Workers understand the conditions that require immediate suspension of hot work.",
      critical: true,
    },
    {
      id: "final-ready",
      section: "Final Authorization",
      text: "All critical controls are verified and the hot work area is ready for authorization.",
      critical: true,
    },
  ],

  tr: [
    // İZİN VE YETKİLENDİRME
    {
      id: "permit-valid",
      section: "İzin ve Yetkilendirme",
      text: "Tam çalışma alanı, faaliyet ve süre için geçerli bir sıcak çalışma izni düzenlenmiş.",
      critical: true,
    },
    {
      id: "permit-scope",
      section: "İzin ve Yetkilendirme",
      text: "İş kapsamı, ekipman ve sıcak çalışma yöntemi onaylı izinle uyumlu.",
      critical: true,
    },
    {
      id: "permit-signatures",
      section: "İzin ve Yetkilendirme",
      text: "Gerekli tüm izin onayları ve imzalar tamamlanmış.",
      critical: true,
    },
    {
      id: "permit-conditions",
      section: "İzin ve Yetkilendirme",
      text: "İzin üzerinde belirtilen tüm önlemler uygulanmış.",
      critical: true,
    },
    {
      id: "permit-simops",
      section: "İzin ve Yetkilendirme",
      text: "Eş zamanlı operasyonlar ve yakındaki faaliyetler değerlendirilmiş ve koordine edilmiş.",
      critical: true,
    },

    // ÇALIŞMA ALANI HAZIRLIĞI
    {
      id: "area-barricaded",
      section: "Çalışma Alanı Hazırlığı",
      text: "Sıcak çalışma alanı açıkça belirlenmiş, bariyerlenmiş ve erişim kontrol altında.",
    },
    {
      id: "area-combustibles-removed",
      section: "Çalışma Alanı Hazırlığı",
      text: "Yanıcı ve parlayıcı malzemeler kıvılcım ve ısı etki alanından uzaklaştırılmış.",
      critical: true,
    },
    {
      id: "area-openings-protected",
      section: "Çalışma Alanı Hazırlığı",
      text: "Zemin açıklıkları, drenajlar, duvar geçişleri ve boşluklar kıvılcımlara karşı kapatılmış veya korunmuş.",
      critical: true,
    },
    {
      id: "area-levels-checked",
      section: "Çalışma Alanı Hazırlığı",
      text: "Sıcak çalışma noktasının üstü, altı ve arka tarafı kontrol edilmiş.",
      critical: true,
    },
    {
      id: "area-fire-blankets",
      section: "Çalışma Alanı Hazırlığı",
      text: "Kıvılcım veya erimiş metalin ulaşabileceği alanlarda uygun yangın battaniyesi veya perde kurulmuş.",
      critical: true,
    },
    {
      id: "area-housekeeping",
      section: "Çalışma Alanı Hazırlığı",
      text: "Çalışma alanı temiz; atık, yağlı bez ve gereksiz malzemelerden arındırılmış.",
    },

    // GAZ ÖLÇÜMÜ
    {
      id: "gas-test-required",
      section: "Atmosfer ve Gaz Ölçümü",
      text: "Çalışma başlamadan önce gerekli atmosfer ölçümleri belirlenmiş.",
      critical: true,
    },
    {
      id: "gas-test-device",
      section: "Atmosfer ve Gaz Ölçümü",
      text: "Gaz dedektörü uygun, çalışır durumda ve kalibrasyon süresi geçerli.",
      critical: true,
    },
    {
      id: "gas-test-oxygen",
      section: "Atmosfer ve Gaz Ölçümü",
      text: "Oksijen seviyesi saha tarafından onaylanan güvenli sınırlar içinde.",
      critical: true,
    },
    {
      id: "gas-test-lel",
      section: "Atmosfer ve Gaz Ölçümü",
      text: "Yanıcı gaz veya buhar seviyesi izin verilen sıcak çalışma sınırları içinde.",
      critical: true,
    },
    {
      id: "gas-test-toxic",
      section: "Atmosfer ve Gaz Ölçümü",
      text: "Maruziyet ihtimali bulunan ilgili toksik gaz ve buharlar ölçülmüş.",
      critical: true,
    },
    {
      id: "gas-test-continuous",
      section: "Atmosfer ve Gaz Ölçümü",
      text: "İzin veya risk değerlendirmesinin gerektirdiği durumlarda sürekli gaz ölçümü sağlanmış.",
      critical: true,
    },
    {
      id: "gas-test-recorded",
      section: "Atmosfer ve Gaz Ölçümü",
      text: "Gaz ölçüm sonuçları, ölçüm saati ve ölçümü yapan kişi izin üzerine kaydedilmiş.",
      critical: true,
    },

    // PROSES İZOLASYONU
    {
      id: "isolation-equipment",
      section: "Proses İzolasyonu",
      text: "Çalışmadan etkilenen ekipman, boru ve kaplar güvenli şekilde izole edilmiş.",
      critical: true,
    },
    {
      id: "isolation-loto",
      section: "Proses İzolasyonu",
      text: "Gerekli kilitleme ve etiketleme kontrolleri uygulanmış ve doğrulanmış.",
      critical: true,
    },
    {
      id: "isolation-drained",
      section: "Proses İzolasyonu",
      text: "Kalan basınç, sıvı, gaz ve tehlikeli maddeler uzaklaştırılmış.",
      critical: true,
    },
    {
      id: "isolation-cleaned",
      section: "Proses İzolasyonu",
      text: "Daha önce yanıcı madde içeren kap, boru veya ekipman temizlenmiş ve test edilmiş.",
      critical: true,
    },
    {
      id: "isolation-drains",
      section: "Proses İzolasyonu",
      text: "Yanıcı buhar içerebilecek yakındaki drenaj ve açıklıklar kapatılmış veya kontrol altına alınmış.",
      critical: true,
    },

    // YANGIN ÖNLEMLERİ
    {
      id: "fire-extinguisher",
      section: "Yangın Önleme ve Acil Durum",
      text: "Uygun ve kontrol edilmiş yangın söndürücüler hemen erişilebilir durumda.",
      critical: true,
    },
    {
      id: "fire-hose",
      section: "Yangın Önleme ve Acil Durum",
      text: "Gerekli durumlarda basınçlı yangın hortumu veya ilave yangın ekipmanı hazır.",
    },
    {
      id: "fire-alarm",
      section: "Yangın Önleme ve Acil Durum",
      text: "Alarm verme ve acil durum ekibiyle iletişim yöntemi biliniyor.",
      critical: true,
    },
    {
      id: "fire-access",
      section: "Yangın Önleme ve Acil Durum",
      text: "Acil erişim yolları ve yangın ekipmanlarının önü açık.",
      critical: true,
    },
    {
      id: "fire-escape",
      section: "Yangın Önleme ve Acil Durum",
      text: "Çalışanların alandan güvenli şekilde uzaklaşabileceği açık bir kaçış yolu bulunuyor.",
      critical: true,
    },

    // YANGIN GÖZCÜSÜ
    {
      id: "watch-assigned",
      section: "Yangın Gözcüsü",
      text: "Gerekli durumlarda eğitimli ve yetkilendirilmiş yangın gözcüsü atanmış.",
      critical: true,
    },
    {
      id: "watch-position",
      section: "Yangın Gözcüsü",
      text: "Yangın gözcüsü çalışma alanını ve kıvılcımların ulaşabileceği tüm noktaları görebilecek konumda.",
      critical: true,
    },
    {
      id: "watch-extinguisher",
      section: "Yangın Gözcüsü",
      text: "Yangın gözcüsünün uygun yangın söndürme ekipmanına doğrudan erişimi var.",
      critical: true,
    },
    {
      id: "watch-no-other-duty",
      section: "Yangın Gözcüsü",
      text: "Yangın gözcüsüne sürekli gözlemi engelleyecek başka bir görev verilmemiş.",
      critical: true,
    },
    {
      id: "watch-post-work",
      section: "Yangın Gözcüsü",
      text: "Çalışma sonrası yangın gözetim süresi saha gerekliliklerine göre belirlenmiş.",
      critical: true,
    },

    // KAYNAK VE KESME EKİPMANI
    {
      id: "equipment-inspected",
      section: "Kaynak ve Kesme Ekipmanı",
      text: "Kaynak, kesme ve ısıtma ekipmanları kullanımdan önce görsel olarak kontrol edilmiş.",
      critical: true,
    },
    {
      id: "equipment-cables",
      section: "Kaynak ve Kesme Ekipmanı",
      text: "Kaynak kabloları, elektrot pensesi ve elektrik kabloları hasarsız ve uygun şekilde yalıtılmış.",
      critical: true,
    },
    {
      id: "equipment-grounding",
      section: "Kaynak ve Kesme Ekipmanı",
      text: "Kaynak dönüş bağlantısı sağlam ve çalışma noktasına mümkün olduğunca yakın konumlandırılmış.",
      critical: true,
    },
    {
      id: "equipment-machine",
      section: "Kaynak ve Kesme Ekipmanı",
      text: "Kaynak makinesi doğru konumlandırılmış, korunmuş ve uygun enerji kaynağına bağlanmış.",
    },
    {
      id: "equipment-hoses",
      section: "Kaynak ve Kesme Ekipmanı",
      text: "Gaz hortumları hasarsız, doğru bağlanmış; ısı, kıvılcım ve araç trafiğine karşı korunmuş.",
      critical: true,
    },
    {
      id: "equipment-regulators",
      section: "Kaynak ve Kesme Ekipmanı",
      text: "Gaz regülatörleri, göstergeler ve alev geri tepme emniyetleri uygun ve iyi durumda.",
      critical: true,
    },
    {
      id: "equipment-leak-test",
      section: "Kaynak ve Kesme Ekipmanı",
      text: "Gaz bağlantıları onaylı bir yöntemle kaçak açısından kontrol edilmiş.",
      critical: true,
    },

    // GAZ TÜPLERİ
    {
      id: "cylinder-upright",
      section: "Basınçlı Gaz Tüpleri",
      text: "Gaz tüpleri dik konumda ve devrilmeye karşı güvenli şekilde sabitlenmiş.",
      critical: true,
    },
    {
      id: "cylinder-condition",
      section: "Basınçlı Gaz Tüpleri",
      text: "Tüpler, vanalar ve tanımlama işaretleri kabul edilebilir durumda.",
      critical: true,
    },
    {
      id: "cylinder-separation",
      section: "Basınçlı Gaz Tüpleri",
      text: "Oksijen ve yanıcı gaz tüpleri gerektiği şekilde ayrılmış veya korunmuş.",
      critical: true,
    },
    {
      id: "cylinder-heat",
      section: "Basınçlı Gaz Tüpleri",
      text: "Tüpler alev, kıvılcım, aşırı sıcaklık ve fiziksel hasara karşı korunmuş.",
      critical: true,
    },
    {
      id: "cylinder-key",
      section: "Basınçlı Gaz Tüpleri",
      text: "Gerekli durumlarda tüp vana anahtarı veya kapatma ekipmanı hemen erişilebilir.",
    },
    {
      id: "cylinder-not-in-use",
      section: "Basınçlı Gaz Tüpleri",
      text: "Ekipman kullanılmadığında tüp vanaları kapalı.",
      critical: true,
    },

    // TAŞLAMA
    {
      id: "grinding-disc",
      section: "Taşlama ve Kıvılcım Üreten Aletler",
      text: "Taşlama diskleri makineye, malzemeye ve azami çalışma hızına uygun.",
      critical: true,
    },
    {
      id: "grinding-guard",
      section: "Taşlama ve Kıvılcım Üreten Aletler",
      text: "Taşlama makinesi koruyucusu doğru şekilde takılmış ve ayarlanmış.",
      critical: true,
    },
    {
      id: "grinding-handle",
      section: "Taşlama ve Kıvılcım Üreten Aletler",
      text: "Tasarım gerektiriyorsa yardımcı tutma kolu takılmış ve kullanılıyor.",
    },
    {
      id: "grinding-condition",
      section: "Taşlama ve Kıvılcım Üreten Aletler",
      text: "Taşlama makinesi, anahtar, kablo ve fiş görünür hasardan arındırılmış.",
      critical: true,
    },
    {
      id: "grinding-direction",
      section: "Taşlama ve Kıvılcım Üreten Aletler",
      text: "Kıvılcımlar insanlardan, ekipmandan, kablolardan ve yanıcı malzemelerden uzağa yönlendirilmiş.",
      critical: true,
    },

    // KKD
    {
      id: "ppe-face",
      section: "Kişisel Koruyucu Donanım",
      text: "Uygun kaynak maskesi, yüz siperi veya göz koruyucu kullanılıyor.",
      critical: true,
    },
    {
      id: "ppe-clothing",
      section: "Kişisel Koruyucu Donanım",
      text: "Aleve dayanıklı kıyafetler açıkta kalan cildi tamamen kapatıyor ve yağla kirlenmemiş.",
      critical: true,
    },
    {
      id: "ppe-gloves",
      section: "Kişisel Koruyucu Donanım",
      text: "Uygun ısıya dayanıklı kaynak veya iş eldivenleri kullanılıyor.",
      critical: true,
    },
    {
      id: "ppe-footwear",
      section: "Kişisel Koruyucu Donanım",
      text: "İş ayakkabıları kıvılcım ve erimiş metale karşı uygun koruma sağlıyor.",
    },
    {
      id: "ppe-hearing",
      section: "Kişisel Koruyucu Donanım",
      text: "Gürültü maruziyetinin gerektirdiği durumlarda kulak koruyucu kullanılıyor.",
    },
    {
      id: "ppe-respiratory",
      section: "Kişisel Koruyucu Donanım",
      text: "Havalandırmanın dumanları yeterince kontrol edemediği durumlarda uygun solunum koruyucu kullanılıyor.",
      critical: true,
    },

    // HAVALANDIRMA
    {
      id: "ventilation-adequate",
      section: "Havalandırma ve Duman Kontrolü",
      text: "Doğal veya mekanik havalandırma kaynak dumanı ve gazları kontrol etmek için yeterli.",
      critical: true,
    },
    {
      id: "ventilation-extraction",
      section: "Havalandırma ve Duman Kontrolü",
      text: "Lokal emiş sistemi koruyucu gazı bozmadan etkili bir konumda bulunuyor.",
    },
    {
      id: "ventilation-intake",
      section: "Havalandırma ve Duman Kontrolü",
      text: "Dumanlar hava emişlerine, kullanılan alanlara veya diğer çalışanlara yönelmiyor.",
      critical: true,
    },

    // ÖZEL KOŞULLAR
    {
      id: "special-confined-space",
      section: "Özel Çalışma Koşulları",
      text: "Kapalı alan içinde sıcak çalışma yapılıyorsa kapalı alan gereklilikleri uygulanmış.",
      critical: true,
    },
    {
      id: "special-height",
      section: "Özel Çalışma Koşulları",
      text: "Yüksekte sıcak çalışma yapılıyorsa düşmeye ve düşen cisimlere karşı kontroller uygulanmış.",
      critical: true,
    },
    {
      id: "special-weather",
      section: "Özel Çalışma Koşulları",
      text: "Hava koşulları ilave elektrik, yangın veya maruziyet riski oluşturmuyor.",
    },
    {
      id: "special-coatings",
      section: "Özel Çalışma Koşulları",
      text: "Boya, kaplama, izolasyon ve yüzey kirleticileri toksik veya yanıcı emisyon açısından değerlendirilmiş.",
      critical: true,
    },

    // SON YETKİLENDİRME
    {
      id: "final-briefing",
      section: "Son Yetkilendirme",
      text: "Çalışma ekibine işe özel toolbox konuşması yapılmış ve kontroller anlaşılmış.",
      critical: true,
    },
    {
      id: "final-communication",
      section: "Son Yetkilendirme",
      text: "Çalışan, yangın gözcüsü, izin düzenleyen ve saha operatörü arasında iletişim sağlanmış.",
      critical: true,
    },
    {
      id: "final-stop-work",
      section: "Son Yetkilendirme",
      text: "Çalışanlar sıcak çalışmanın derhal durdurulmasını gerektiren koşulları biliyor.",
      critical: true,
    },
    {
      id: "final-ready",
      section: "Son Yetkilendirme",
      text: "Tüm kritik kontroller doğrulanmış ve sıcak çalışma alanı yetkilendirmeye hazır.",
      critical: true,
    },
  ],
};
