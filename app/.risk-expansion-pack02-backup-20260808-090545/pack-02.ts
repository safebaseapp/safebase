import type { RiskLibraryActivity } from "./pack-01";

export const riskLibraryPack02: RiskLibraryActivity[] = [
  {
    id: "scaffold-dismantling",
    category: { tr: "İskele", en: "Scaffolding" },
    activity: { tr: "İskele Sökümü", en: "Scaffold Dismantling" },
    items: [
      {
        hazard: { tr: "Söküm sırasında yüksekten düşme", en: "Fall during dismantling" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "İskele söküm ekibi", en: "Scaffold dismantling crew" },
        existingControls: { tr: "Yetkin personel, kontrollü söküm sırası, güvenli erişim ve uygun düşüş koruması", en: "Competent personnel, controlled dismantling sequence, safe access and suitable fall protection" },
        additionalControls: { tr: "Söküm planını işe başlamadan doğrula ve sürekli gözetim sağla", en: "Verify the dismantling plan before work and maintain supervision" },
      },
      {
        hazard: { tr: "Sökülen parçaların düşmesi", en: "Falling dismantled components" },
        consequence: { tr: "Ezilme, baş yaralanması veya ölüm", en: "Crushing, head injury or fatality" },
        personsAtRisk: { tr: "Söküm ekibi ve alt seviyedeki personel", en: "Dismantling crew and personnel below" },
        existingControls: { tr: "Alt alan izolasyonu ve kontrollü malzeme indirme", en: "Exclusion zone below and controlled lowering of materials" },
        additionalControls: { tr: "Parçaların aşağı atılmasını yasakla ve uygun indirme yöntemi kullan", en: "Prohibit dropping components and use a suitable lowering method" },
      },
      {
        hazard: { tr: "Söküm sırasının yapısal stabiliteyi bozması", en: "Loss of structural stability during dismantling" },
        consequence: { tr: "Kısmi veya tam iskele çökmesi", en: "Partial or complete scaffold collapse" },
        personsAtRisk: { tr: "Söküm ekibi ve yakın çalışanlar", en: "Dismantling crew and nearby workers" },
        existingControls: { tr: "Brace ve tie elemanlarının kontrollü sırayla sökülmesi", en: "Controlled removal sequence for braces and ties" },
        additionalControls: { tr: "Stabiliteyi etkileyen elemanları sökmeden önce yetkin kişi onayı al", en: "Obtain competent-person approval before removing stability-critical members" },
      },
    ],
  },

  {
    id: "ladder-work",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Merdiven ile Çalışma", en: "Ladder Work" },
    items: [
      {
        hazard: { tr: "Merdivenden düşme", en: "Fall from ladder" },
        consequence: { tr: "Kırık, ciddi yaralanma veya ölüm", en: "Fracture, serious injury or fatality" },
        personsAtRisk: { tr: "Merdiven kullanıcıları", en: "Ladder users" },
        existingControls: { tr: "Uygun merdiven seçimi, 3 nokta teması, stabil zemin ve güvenli konumlandırma", en: "Correct ladder selection, three-point contact, stable ground and safe positioning" },
        additionalControls: { tr: "Uzun süreli veya iki elle çalışma gerektiren işlerde uygun platform kullan", en: "Use a suitable platform for prolonged work or tasks requiring both hands" },
      },
      {
        hazard: { tr: "Merdivenin kayması veya devrilmesi", en: "Ladder slipping or overturning" },
        consequence: { tr: "Düşme ve yaralanma", en: "Fall and injury" },
        personsAtRisk: { tr: "Merdiven kullanıcısı ve yakın personel", en: "Ladder user and nearby personnel" },
        existingControls: { tr: "Kaymaz ayaklar, uygun açı ve gerektiğinde üst/alt sabitleme", en: "Non-slip feet, correct angle and top/bottom securing where required" },
        additionalControls: { tr: "Kapı, araç veya yaya trafiği olan bölgelerde alanı kontrol altına al", en: "Control areas exposed to doors, vehicles or pedestrian traffic" },
      },
      {
        hazard: { tr: "Hasarlı veya uygunsuz merdiven", en: "Damaged or unsuitable ladder" },
        consequence: { tr: "Yapısal arıza ve düşme", en: "Structural failure and fall" },
        personsAtRisk: { tr: "Merdiven kullanıcısı", en: "Ladder user" },
        existingControls: { tr: "Kullanım öncesi kontrol ve taşıma kapasitesinin doğrulanması", en: "Pre-use inspection and verification of load rating" },
        additionalControls: { tr: "Hasarlı veya etiketsiz merdiveni derhal kullanım dışı bırak", en: "Immediately remove damaged or unidentified ladders from service" },
      },
    ],
  },

  {
    id: "steel-erection",
    category: { tr: "Çelik Montaj", en: "Steel Erection" },
    activity: { tr: "Çelik Konstrüksiyon Montajı", en: "Steel Structure Erection" },
    items: [
      {
        hazard: { tr: "Çelik elemanın düşmesi veya kontrolsüz hareketi", en: "Falling or uncontrolled steel member" },
        consequence: { tr: "Ezilme, ciddi yaralanma veya ölüm", en: "Crushing, serious injury or fatality" },
        personsAtRisk: { tr: "Montaj ve rigging ekibi", en: "Erection and rigging crew" },
        existingControls: { tr: "Kaldırma planı, uygun rigging, dışlama alanı ve kontrollü yönlendirme", en: "Lift plan, suitable rigging, exclusion zone and controlled positioning" },
        additionalControls: { tr: "Yük hareket hattında personel bulunmasını engelle", en: "Keep personnel clear of the load path" },
      },
      {
        hazard: { tr: "Yüksekten düşme", en: "Fall from height" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Montaj personeli", en: "Erection personnel" },
        existingControls: { tr: "Güvenli erişim, platform, kenar koruması ve gerektiğinde düşüş koruma sistemi", en: "Safe access, work platforms, edge protection and fall protection where required" },
        additionalControls: { tr: "Bağlantı ve çalışma pozisyonlarını montaj sırasına göre önceden planla", en: "Pre-plan connection and work positions according to erection sequence" },
      },
      {
        hazard: { tr: "Geçici stabilite kaybı", en: "Loss of temporary stability" },
        consequence: { tr: "Yapısal çökme", en: "Structural collapse" },
        personsAtRisk: { tr: "Montaj ekibi ve çevredeki çalışanlar", en: "Erection crew and nearby workers" },
        existingControls: { tr: "Geçici bracing ve mühendislik montaj sırası", en: "Temporary bracing and engineered erection sequence" },
        additionalControls: { tr: "Kalıcı bağlantılar tamamlanmadan geçici destekleri kaldırma", en: "Do not remove temporary supports before permanent connections are complete" },
      },
    ],
  },

  {
    id: "trenching",
    category: { tr: "Kazı", en: "Excavation" },
    activity: { tr: "Kanal / Hendek Kazısı", en: "Trenching" },
    items: [
      {
        hazard: { tr: "Hendek duvarının göçmesi", en: "Trench wall collapse" },
        consequence: { tr: "Ezilme, boğulma veya ölüm", en: "Crushing, suffocation or fatality" },
        personsAtRisk: { tr: "Hendek içindeki çalışanlar", en: "Workers inside the trench" },
        existingControls: { tr: "Uygun şev, iksa veya trench box ve yetkin kişi kontrolü", en: "Suitable sloping, shoring or trench box and competent-person inspection" },
        additionalControls: { tr: "Toprak, su ve titreşim koşulları değiştiğinde yeniden değerlendir", en: "Reassess when soil, water or vibration conditions change" },
      },
      {
        hazard: { tr: "Yeraltı tesisatına temas", en: "Contact with underground utilities" },
        consequence: { tr: "Elektrik çarpması, yangın, gaz veya su kaçağı", en: "Electric shock, fire, gas or water release" },
        personsAtRisk: { tr: "Kazı ekibi", en: "Excavation crew" },
        existingControls: { tr: "Hat tespiti, çizimler ve kontrollü kazı yöntemi", en: "Utility locating, drawings and controlled excavation method" },
        additionalControls: { tr: "Kritik hat yakınında mekanik kazıyı sınırla", en: "Restrict mechanical excavation near critical services" },
      },
      {
        hazard: { tr: "Güvensiz giriş ve çıkış", en: "Unsafe access and egress" },
        consequence: { tr: "Düşme veya acil tahliyenin gecikmesi", en: "Fall or delayed emergency evacuation" },
        personsAtRisk: { tr: "Hendek içindeki çalışanlar", en: "Workers inside the trench" },
        existingControls: { tr: "Uygun merdiven veya tasarlanmış erişim noktası", en: "Suitable ladder or designed access point" },
        additionalControls: { tr: "Çalışma ilerledikçe erişim noktasının uygunluğunu kontrol et", en: "Check access suitability as work progresses" },
      },
    ],
  },

  {
    id: "line-breaking",
    category: { tr: "Proses İzolasyonu", en: "Process Isolation" },
    activity: { tr: "Hat Açma / Line Breaking", en: "Line Breaking" },
    items: [
      {
        hazard: { tr: "Basınçlı veya tehlikeli akışkan salımı", en: "Release of pressurized or hazardous process fluid" },
        consequence: { tr: "Kimyasal maruziyet, yanık veya ciddi yaralanma", en: "Chemical exposure, burns or serious injury" },
        personsAtRisk: { tr: "Bakım ve operasyon çalışanları", en: "Maintenance and operations personnel" },
        existingControls: { tr: "İzolasyon, basınç boşaltma, drenaj ve hat açma izni", en: "Isolation, depressurization, draining and line-breaking permit" },
        additionalControls: { tr: "Sıfır enerji ve boş hat durumunu fiziksel olarak doğrula", en: "Physically verify zero-energy and empty-line condition" },
      },
      {
        hazard: { tr: "Kalıntı kimyasal veya proses ürünü", en: "Residual chemical or process material" },
        consequence: { tr: "Cilt, göz veya solunum maruziyeti", en: "Skin, eye or respiratory exposure" },
        personsAtRisk: { tr: "Hattı açan çalışanlar", en: "Personnel opening the line" },
        existingControls: { tr: "SDS bilgisi, drenaj/yıkama ve uygun KKD", en: "SDS information, draining/flushing and suitable PPE" },
        additionalControls: { tr: "İlk açmayı kontrollü pozisyondan ve sıçrama hattı dışında yap", en: "Make the initial opening from a controlled position outside the line of fire" },
      },
      {
        hazard: { tr: "Yanlış izolasyon", en: "Incorrect isolation" },
        consequence: { tr: "Beklenmeyen proses salımı", en: "Unexpected process release" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "İzolasyon listesi ve saha doğrulaması", en: "Isolation list and field verification" },
        additionalControls: { tr: "Kritik izolasyonlarda ikinci bağımsız doğrulama uygula", en: "Use independent second verification for critical isolations" },
      },
      // EXPANSION::line-breaking
{
        hazard: { tr: "Yüksek sıcaklıklı proses ürünü", en: "High-temperature process fluid" },
        consequence: { tr: "Termal yanık", en: "Thermal burns" },
        personsAtRisk: { tr: "Hattı açan çalışanlar", en: "Personnel opening the line" },
        existingControls: { tr: "Soğutma ve sıcaklık doğrulaması", en: "Cooling and temperature verification" },
        additionalControls: { tr: "Hat yüzey ve proses sıcaklığının güvenli seviyede olduğunu doğrula", en: "Verify line and process temperature are at a safe level" },
      },
      {
        hazard: { tr: "Line-of-fire pozisyonunda çalışma", en: "Working in the line of fire" },
        consequence: { tr: "Basınçlı akışkan veya parçaya maruziyet", en: "Exposure to pressurized fluid or components" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Kontrollü açma yöntemi", en: "Controlled opening method" },
        additionalControls: { tr: "İlk açmayı vücudu potansiyel salım hattından uzak tutarak yap", en: "Make the initial break with the body positioned outside the potential release path" },
      },
      {
        hazard: { tr: "Dökülme ve çevresel salım", en: "Spill and environmental release" },
        consequence: { tr: "Çevre kirliliği veya kayma riski", en: "Environmental contamination or slip hazard" },
        personsAtRisk: { tr: "Saha personeli", en: "Site personnel" },
        existingControls: { tr: "Toplama kabı ve spill kit", en: "Catch trays and spill kits" },
        additionalControls: { tr: "Beklenen kalıntı hacmine uygun containment hazırla", en: "Provide containment suitable for the expected residual volume" },
      }

    ],
  },

  {
    id: "flange-breaking",
    category: { tr: "Proses İzolasyonu", en: "Process Isolation" },
    activity: { tr: "Flanş Açma", en: "Flange Breaking" },
    items: [
      {
        hazard: { tr: "Flanş içinde hapsolmuş basınç", en: "Trapped pressure inside flange" },
        consequence: { tr: "Yüksek basınçlı salım ve ciddi yaralanma", en: "High-pressure release and serious injury" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Basınç boşaltma ve izolasyon doğrulaması", en: "Depressurization and isolation verification" },
        additionalControls: { tr: "Cıvataları kontrollü sırayla ve güvenli pozisyondan gevşet", en: "Loosen bolts in a controlled sequence from a safe position" },
      },
      {
        hazard: { tr: "Kimyasal kalıntı", en: "Chemical residue" },
        consequence: { tr: "Yanık, zehirlenme veya göz yaralanması", en: "Burns, poisoning or eye injury" },
        personsAtRisk: { tr: "Flanşı açan personel", en: "Personnel opening the flange" },
        existingControls: { tr: "Hat yıkama/drenaj ve uygun kimyasal KKD", en: "Line flushing/draining and suitable chemical PPE" },
        additionalControls: { tr: "Sıçrama yönünde personel bulunmasını engelle", en: "Keep personnel clear of the potential spray direction" },
      },
      {
        hazard: { tr: "Ağır flanş veya spool hareketi", en: "Movement of heavy flange or spool" },
        consequence: { tr: "Sıkışma veya ezilme", en: "Pinch or crush injury" },
        personsAtRisk: { tr: "Bakım ve rigging personeli", en: "Maintenance and rigging personnel" },
        existingControls: { tr: "Uygun destek ve kaldırma ekipmanı", en: "Suitable supports and lifting equipment" },
        additionalControls: { tr: "Bağlantı tamamen açılmadan yükü destekle", en: "Support the load before the connection is fully released" },
      },
    ],
  },

  {
    id: "hydrostatic-testing",
    category: { tr: "Basınçlı Sistem", en: "Pressure Systems" },
    activity: { tr: "Hidrostatik Test", en: "Hydrostatic Testing" },
    items: [
      {
        hazard: { tr: "Basınçlı sistem arızası", en: "Pressurized system failure" },
        consequence: { tr: "Fırlayan parça veya yüksek enerjili su salımı", en: "Projectile or high-energy water release" },
        personsAtRisk: { tr: "Test ekibi ve yakın çalışanlar", en: "Test team and nearby workers" },
        existingControls: { tr: "Onaylı test prosedürü, kalibre ekipman ve dışlama alanı", en: "Approved test procedure, calibrated equipment and exclusion zone" },
        additionalControls: { tr: "Basınçlandırma öncesi bağlantıları bağımsız kontrol et", en: "Independently verify connections before pressurization" },
      },
      {
        hazard: { tr: "Kontrolsüz basınç yükselmesi", en: "Uncontrolled pressure increase" },
        consequence: { tr: "Ekipman hasarı veya rupture", en: "Equipment damage or rupture" },
        personsAtRisk: { tr: "Test personeli", en: "Test personnel" },
        existingControls: { tr: "Kontrollü pompalama ve basınç göstergesi", en: "Controlled pumping and pressure indication" },
        additionalControls: { tr: "Belirlenen test basıncını aşmayı engelleyecek limit uygula", en: "Use controls to prevent exceeding the specified test pressure" },
      },
      {
        hazard: { tr: "Test sonrası basıncın boşaltılmaması", en: "Residual pressure after testing" },
        consequence: { tr: "Bağlantı açılırken ani salım", en: "Sudden release during disconnection" },
        personsAtRisk: { tr: "Test ve bakım personeli", en: "Test and maintenance personnel" },
        existingControls: { tr: "Kontrollü depressurization ve sıfır basınç doğrulaması", en: "Controlled depressurization and zero-pressure verification" },
        additionalControls: { tr: "Sıfır basınç teyidi olmadan sistem açma", en: "Do not open the system without confirmed zero pressure" },
      },
    ],
  },

  {
    id: "pneumatic-testing",
    category: { tr: "Basınçlı Sistem", en: "Pressure Systems" },
    activity: { tr: "Pnömatik Test", en: "Pneumatic Testing" },
    items: [
      {
        hazard: { tr: "Yüksek depolanmış enerji", en: "High stored energy" },
        consequence: { tr: "Patlayıcı rupture, ciddi yaralanma veya ölüm", en: "Explosive rupture, serious injury or fatality" },
        personsAtRisk: { tr: "Test ekibi ve çevredeki personel", en: "Test team and surrounding personnel" },
        existingControls: { tr: "Özel test prosedürü, kontrollü basınçlandırma ve geniş dışlama alanı", en: "Specific test procedure, controlled pressurization and extended exclusion zone" },
        additionalControls: { tr: "Pnömatik testi yalnızca teknik olarak gerekli olduğunda kullan", en: "Use pneumatic testing only where technically justified" },
      },
      {
        hazard: { tr: "Bağlantı veya ekipman kopması", en: "Connection or equipment failure" },
        consequence: { tr: "Yüksek hızlı fırlayan parça", en: "High-velocity projectile" },
        personsAtRisk: { tr: "Test personeli", en: "Test personnel" },
        existingControls: { tr: "Bağlantı kontrolü ve alan izolasyonu", en: "Connection verification and area isolation" },
        additionalControls: { tr: "Line-of-fire alanlarından personeli tamamen uzaklaştır", en: "Completely remove personnel from line-of-fire areas" },
      },
      {
        hazard: { tr: "İzinsiz bölgeye giriş", en: "Unauthorized entry into test zone" },
        consequence: { tr: "Yüksek enerji salımına maruziyet", en: "Exposure to high-energy release" },
        personsAtRisk: { tr: "Diğer saha personeli", en: "Other site personnel" },
        existingControls: { tr: "Bariyer ve kontrollü erişim", en: "Barricading and controlled access" },
        additionalControls: { tr: "Test süresince dedicated access controller kullan", en: "Use dedicated access control throughout the test" },
      },
    ],
  },

  {
    id: "air-blowing",
    category: { tr: "Devreye Alma", en: "Commissioning" },
    activity: { tr: "Air Blowing", en: "Air Blowing" },
    items: [
      {
        hazard: { tr: "Yüksek basınçlı hava çıkışı", en: "High-pressure air discharge" },
        consequence: { tr: "Çarpma, göz veya işitme yaralanması", en: "Impact, eye or hearing injury" },
        personsAtRisk: { tr: "Operasyon ekibi ve yakın personel", en: "Operations team and nearby personnel" },
        existingControls: { tr: "Onaylı prosedür, dışlama alanı ve kontrollü discharge noktası", en: "Approved procedure, exclusion zone and controlled discharge point" },
        additionalControls: { tr: "Discharge yönünü insanların ve ekipmanın olmadığı güvenli alana ver", en: "Direct discharge toward a safe area clear of personnel and equipment" },
      },
      {
        hazard: { tr: "Hat içinden fırlayan partikül", en: "Debris expelled from line" },
        consequence: { tr: "Yüksek hızlı projectile yaralanması", en: "High-velocity projectile injury" },
        personsAtRisk: { tr: "Yakın saha çalışanları", en: "Nearby site personnel" },
        existingControls: { tr: "Discharge alanı izolasyonu ve uygun bariyerleme", en: "Discharge-zone isolation and suitable barricading" },
        additionalControls: { tr: "Potansiyel projectile hattını fiziksel olarak kontrol et", en: "Physically control the potential projectile path" },
      },
      {
        hazard: { tr: "Yüksek gürültü", en: "High noise" },
        consequence: { tr: "İşitme hasarı", en: "Hearing damage" },
        personsAtRisk: { tr: "Air blowing ekibi ve çevre personeli", en: "Air-blowing team and surrounding personnel" },
        existingControls: { tr: "Gürültü alanı kontrolü ve uygun işitme koruması", en: "Noise-area control and suitable hearing protection" },
        additionalControls: { tr: "Gereksiz personeli yüksek gürültü alanından uzaklaştır", en: "Keep non-essential personnel outside the high-noise area" },
      },
    ],
  },

  {
    id: "painting",
    category: { tr: "Boya", en: "Painting" },
    activity: { tr: "Boya Uygulaması", en: "Painting" },
    items: [
      {
        hazard: { tr: "Boya veya solvent ile cilt/göz teması", en: "Skin or eye contact with paint or solvent" },
        consequence: { tr: "Tahriş veya kimyasal etki", en: "Irritation or chemical injury" },
        personsAtRisk: { tr: "Boya çalışanları", en: "Painting personnel" },
        existingControls: { tr: "SDS, uygun eldiven, göz koruması ve hijyen", en: "SDS, suitable gloves, eye protection and hygiene" },
        additionalControls: { tr: "Kimyasal türüne göre KKD uygunluğunu doğrula", en: "Verify PPE compatibility with the specific chemical" },
      },
      {
        hazard: { tr: "Solvent buharı", en: "Solvent vapour" },
        consequence: { tr: "Baş dönmesi veya solunum etkisi", en: "Dizziness or respiratory effects" },
        personsAtRisk: { tr: "Boya ekibi ve yakın çalışanlar", en: "Painting crew and nearby workers" },
        existingControls: { tr: "Havalandırma ve maruziyet kontrolü", en: "Ventilation and exposure control" },
        additionalControls: { tr: "Kapalı alanlarda atmosfer ve solunum koruması ihtiyacını ayrıca değerlendir", en: "Separately assess atmosphere and respiratory protection needs in enclosed areas" },
      },
      {
        hazard: { tr: "Yanıcı solventler", en: "Flammable solvents" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Çalışma alanındaki personel", en: "Personnel in work area" },
        existingControls: { tr: "Ateşleme kaynaklarının kontrolü ve uygun depolama", en: "Ignition-source control and suitable storage" },
        additionalControls: { tr: "Yanıcı malzeme miktarını çalışma alanında minimumda tut", en: "Keep quantities of flammable material at the work area to a minimum" },
      },
    ],
  },

  {
    id: "spray-painting",
    category: { tr: "Boya", en: "Painting" },
    activity: { tr: "Sprey Boya", en: "Spray Painting" },
    items: [
      {
        hazard: { tr: "Boya aerosolünün solunması", en: "Inhalation of paint aerosol" },
        consequence: { tr: "Solunum sistemi etkileri", en: "Respiratory effects" },
        personsAtRisk: { tr: "Sprey boya operatörü", en: "Spray-painting operator" },
        existingControls: { tr: "Havalandırma, uygun solunum koruması ve SDS", en: "Ventilation, suitable respiratory protection and SDS" },
        additionalControls: { tr: "Maruziyeti alan ve ürün özelliklerine göre değerlendir", en: "Assess exposure according to area and product characteristics" },
      },
      {
        hazard: { tr: "Yanıcı aerosol bulutu", en: "Flammable aerosol cloud" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Boya çalışanları ve yakın personel", en: "Painting personnel and nearby workers" },
        existingControls: { tr: "Ateşleme kaynağı kontrolü, havalandırma ve alan izolasyonu", en: "Ignition-source control, ventilation and area isolation" },
        additionalControls: { tr: "Elektrikli ekipmanın alan sınıflandırmasına uygunluğunu doğrula", en: "Verify electrical equipment suitability for the area classification" },
      },
      {
        hazard: { tr: "Basınçlı boya ekipmanı", en: "Pressurized spray equipment" },
        consequence: { tr: "Enjeksiyon yaralanması veya hortum savrulması", en: "Injection injury or hose whipping" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Ekipman kontrolü ve üretici talimatları", en: "Equipment inspection and manufacturer instructions" },
        additionalControls: { tr: "Basıncı boşaltmadan nozül veya hortuma müdahale etme", en: "Do not service nozzles or hoses before pressure is released" },
      },
    ],
  },

  {
    id: "abrasive-blasting",
    category: { tr: "Yüzey Hazırlama", en: "Surface Preparation" },
    activity: { tr: "Kumlama / Abrasive Blasting", en: "Abrasive Blasting" },
    items: [
      {
        hazard: { tr: "Toz ve partikül maruziyeti", en: "Dust and particulate exposure" },
        consequence: { tr: "Solunum yolu hastalığı", en: "Respiratory illness" },
        personsAtRisk: { tr: "Kumlama operatörü ve yakın çalışanlar", en: "Blasting operator and nearby workers" },
        existingControls: { tr: "Alan izolasyonu, uygun solunum koruması ve havalandırma", en: "Area isolation, suitable respiratory protection and ventilation" },
        additionalControls: { tr: "Abrasive malzemenin sağlık risklerini SDS/ürün bilgisine göre değerlendir", en: "Assess abrasive health hazards using SDS/product information" },
      },
      {
        hazard: { tr: "Yüksek basınçlı blasting hortumu", en: "High-pressure blasting hose" },
        consequence: { tr: "Çarpma veya ciddi yaralanma", en: "Impact or serious injury" },
        personsAtRisk: { tr: "Operatör ve yardımcı personel", en: "Operator and assistants" },
        existingControls: { tr: "Hortum/bağlantı kontrolü ve deadman kontrol sistemi", en: "Hose/connection inspection and deadman control system" },
        additionalControls: { tr: "Hortum bağlantılarında uygun safety restraint kullan", en: "Use suitable safety restraints on hose connections" },
      },
      {
        hazard: { tr: "Yüksek gürültü", en: "High noise" },
        consequence: { tr: "İşitme kaybı", en: "Hearing loss" },
        personsAtRisk: { tr: "Operatör ve yakın personel", en: "Operator and nearby personnel" },
        existingControls: { tr: "İşitme koruması ve alan kontrolü", en: "Hearing protection and area control" },
        additionalControls: { tr: "Gereksiz personelin blasting alanına girişini sınırla", en: "Restrict non-essential access to the blasting area" },
      },
    ],
  },

  {
    id: "concrete-pouring",
    category: { tr: "İnşaat", en: "Construction" },
    activity: { tr: "Beton Dökümü", en: "Concrete Pouring" },
    items: [
      {
        hazard: { tr: "Islak betonla temas", en: "Contact with wet concrete" },
        consequence: { tr: "Cilt tahrişi veya kimyasal yanık", en: "Skin irritation or chemical burns" },
        personsAtRisk: { tr: "Beton çalışanları", en: "Concrete workers" },
        existingControls: { tr: "Uygun eldiven, çizme ve cilt koruması", en: "Suitable gloves, boots and skin protection" },
        additionalControls: { tr: "Kirlenmiş giysileri hızlı şekilde değiştir ve yıkama imkanı sağla", en: "Provide prompt removal of contaminated clothing and washing facilities" },
      },
      {
        hazard: { tr: "Beton pompa hortumunun kontrolsüz hareketi", en: "Uncontrolled concrete pump hose movement" },
        consequence: { tr: "Çarpma veya sıkışma", en: "Impact or crushing injury" },
        personsAtRisk: { tr: "Beton ekibi", en: "Concrete crew" },
        existingControls: { tr: "Kontrollü hortum yönetimi ve eğitimli ekip", en: "Controlled hose handling and trained crew" },
        additionalControls: { tr: "Hortum uç bölgesindeki personel sayısını minimumda tut", en: "Minimize personnel around the hose-end area" },
      },
      {
        hazard: { tr: "Geçici kalıp veya platform arızası", en: "Temporary formwork or platform failure" },
        consequence: { tr: "Çökme veya düşme", en: "Collapse or fall" },
        personsAtRisk: { tr: "Beton ve kalıp çalışanları", en: "Concrete and formwork workers" },
        existingControls: { tr: "Onaylı kalıp sistemi ve döküm öncesi kontrol", en: "Approved formwork system and pre-pour inspection" },
        additionalControls: { tr: "Döküm hızını ve yük dağılımını tasarıma uygun tut", en: "Maintain pour rate and load distribution according to design" },
      },
    ],
  },

  {
    id: "formwork",
    category: { tr: "İnşaat", en: "Construction" },
    activity: { tr: "Kalıp Kurulum / Söküm", en: "Formwork Installation / Removal" },
    items: [
      {
        hazard: { tr: "Kalıp çökmesi", en: "Formwork collapse" },
        consequence: { tr: "Ezilme, ciddi yaralanma veya ölüm", en: "Crushing, serious injury or fatality" },
        personsAtRisk: { tr: "Kalıp ve beton çalışanları", en: "Formwork and concrete workers" },
        existingControls: { tr: "Onaylı tasarım, uygun destek ve yetkin kontrol", en: "Approved design, suitable supports and competent inspection" },
        additionalControls: { tr: "Beton yükü uygulanmadan önce pre-pour kontrolü yap", en: "Complete pre-pour inspection before concrete loading" },
      },
      {
        hazard: { tr: "Yüksekten düşme", en: "Fall from height" },
        consequence: { tr: "Ciddi yaralanma", en: "Serious injury" },
        personsAtRisk: { tr: "Kalıp çalışanları", en: "Formwork workers" },
        existingControls: { tr: "Güvenli platform, erişim ve kenar koruması", en: "Safe platforms, access and edge protection" },
        additionalControls: { tr: "Geçici çalışma yüzeylerini kullanımdan önce kontrol et", en: "Inspect temporary work surfaces before use" },
      },
      {
        hazard: { tr: "Söküm sırasında düşen malzeme", en: "Falling material during stripping" },
        consequence: { tr: "Çarpma veya ezilme", en: "Struck-by or crushing injury" },
        personsAtRisk: { tr: "Söküm ekibi ve alt seviyedeki çalışanlar", en: "Stripping crew and workers below" },
        existingControls: { tr: "Dışlama alanı ve kontrollü söküm yöntemi", en: "Exclusion zone and controlled dismantling method" },
        additionalControls: { tr: "Malzemelerin kontrolsüz düşürülmesini engelle", en: "Prevent uncontrolled dropping of materials" },
      },
    ],
  },

  {
    id: "rebar-work",
    category: { tr: "İnşaat", en: "Construction" },
    activity: { tr: "Donatı / Rebar Çalışması", en: "Rebar Work" },
    items: [
      {
        hazard: { tr: "Açık rebar uçları", en: "Exposed rebar ends" },
        consequence: { tr: "Kesilme veya saplanma yaralanması", en: "Laceration or impalement injury" },
        personsAtRisk: { tr: "İnşaat çalışanları", en: "Construction workers" },
        existingControls: { tr: "Uygun rebar cap veya fiziksel koruma", en: "Suitable rebar caps or physical protection" },
        additionalControls: { tr: "Yürüyüş ve çalışma alanındaki açık uçları günlük kontrol et", en: "Inspect exposed ends in work and access areas daily" },
      },
      {
        hazard: { tr: "Ağır donatı elleçleme", en: "Manual handling of heavy reinforcement" },
        consequence: { tr: "Kas-iskelet yaralanması veya sıkışma", en: "Musculoskeletal or pinch injury" },
        personsAtRisk: { tr: "Rebar çalışanları", en: "Rebar workers" },
        existingControls: { tr: "Ekip kaldırma ve mekanik yardım", en: "Team lifting and mechanical aids" },
        additionalControls: { tr: "Uzun/ağır demirlerde mekanik taşıma yöntemini önceliklendir", en: "Prioritize mechanical handling for long or heavy bars" },
      },
      {
        hazard: { tr: "Kesme/bükme makinesi", en: "Rebar cutting or bending machine" },
        consequence: { tr: "Kesilme, sıkışma veya amputasyon", en: "Laceration, crushing or amputation" },
        personsAtRisk: { tr: "Makine operatörü", en: "Machine operator" },
        existingControls: { tr: "Muhafaza, yetkili operatör ve güvenli çalışma prosedürü", en: "Guards, authorized operator and safe-work procedure" },
        additionalControls: { tr: "Bakım ve sıkışma giderme öncesi enerjiyi izole et", en: "Isolate energy before maintenance or clearing jams" },
      },
    ],
  },

  {
    id: "demolition",
    category: { tr: "Yıkım", en: "Demolition" },
    activity: { tr: "Yıkım Çalışması", en: "Demolition" },
    items: [
      {
        hazard: { tr: "Kontrolsüz yapısal çökme", en: "Uncontrolled structural collapse" },
        consequence: { tr: "Ezilme, ciddi yaralanma veya ölüm", en: "Crushing, serious injury or fatality" },
        personsAtRisk: { tr: "Yıkım ekibi ve çevredeki personel", en: "Demolition crew and nearby personnel" },
        existingControls: { tr: "Yıkım planı, yapısal değerlendirme ve kontrollü sıra", en: "Demolition plan, structural assessment and controlled sequence" },
        additionalControls: { tr: "Taşıyıcı elemanlara müdahaleyi mühendislik planına göre yürüt", en: "Control removal of structural members according to the engineering plan" },
      },
      {
        hazard: { tr: "Düşen moloz", en: "Falling debris" },
        consequence: { tr: "Çarpma, ezilme veya ölüm", en: "Impact, crushing or fatality" },
        personsAtRisk: { tr: "Yıkım ve yakın saha çalışanları", en: "Demolition and nearby site workers" },
        existingControls: { tr: "Dışlama alanı ve kontrollü debris yönetimi", en: "Exclusion zone and controlled debris management" },
        additionalControls: { tr: "Alt seviyelerde eş zamanlı çalışmayı engelle", en: "Prevent simultaneous work on lower levels" },
      },
      {
        hazard: { tr: "Gizli elektrik, gaz veya proses hattı", en: "Hidden electrical, gas or process service" },
        consequence: { tr: "Elektrik çarpması, yangın veya patlama", en: "Electric shock, fire or explosion" },
        personsAtRisk: { tr: "Yıkım ekibi", en: "Demolition crew" },
        existingControls: { tr: "Servis tespiti ve izolasyon doğrulaması", en: "Service identification and isolation verification" },
        additionalControls: { tr: "Yıkım öncesi tüm enerji ve servislerin kapatıldığını saha kontrolüyle doğrula", en: "Field-verify all utilities and energy sources are isolated before demolition" },
      },
    ],
  },

  {
    id: "cable-pulling",
    category: { tr: "Elektrik", en: "Electrical" },
    activity: { tr: "Kablo Çekme", en: "Cable Pulling" },
    items: [
      {
        hazard: { tr: "Kablo ile sıkışma veya ezilme", en: "Pinch or crush injury from cable" },
        consequence: { tr: "El, parmak veya vücut yaralanması", en: "Hand, finger or body injury" },
        personsAtRisk: { tr: "Kablo çekme ekibi", en: "Cable-pulling crew" },
        existingControls: { tr: "Koordineli çalışma, uygun el pozisyonu ve kontrollü çekme", en: "Coordinated work, safe hand positioning and controlled pulling" },
        additionalControls: { tr: "Kablo ile sabit yüzey arasındaki sıkışma noktalarını önceden belirle", en: "Identify pinch points between the cable and fixed surfaces in advance" },
      },
      {
        hazard: { tr: "Çekme halatı veya winch arızası", en: "Pulling rope or winch failure" },
        consequence: { tr: "Snap-back veya çarpma yaralanması", en: "Snap-back or struck-by injury" },
        personsAtRisk: { tr: "Kablo ekibi", en: "Cable crew" },
        existingControls: { tr: "Ekipman kapasite ve kullanım öncesi kontrolü", en: "Equipment capacity verification and pre-use inspection" },
        additionalControls: { tr: "Çekme hattı ve snap-back bölgelerinden personeli uzak tut", en: "Keep personnel clear of the pulling line and snap-back zones" },
      },
      {
        hazard: { tr: "Elle taşıma ve uygunsuz duruş", en: "Manual handling and awkward posture" },
        consequence: { tr: "Kas-iskelet yaralanması", en: "Musculoskeletal injury" },
        personsAtRisk: { tr: "Kablo çalışanları", en: "Cable workers" },
        existingControls: { tr: "Yeterli personel ve mekanik yardım", en: "Adequate manpower and mechanical aids" },
        additionalControls: { tr: "Uzun kablo güzergahlarında roller ve çekme ekipmanını optimize et", en: "Optimize rollers and pulling equipment on long cable routes" },
      },
    ],
  },

  {
    id: "temporary-electrical-supply",
    category: { tr: "Elektrik", en: "Electrical" },
    activity: { tr: "Geçici Elektrik Beslemesi", en: "Temporary Electrical Supply" },
    items: [
      {
        hazard: { tr: "Hasarlı kablo veya bağlantı", en: "Damaged cable or connection" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Tüm saha kullanıcıları", en: "All site users" },
        existingControls: { tr: "Uygun endüstriyel ekipman, düzenli kontrol ve hasarlı ekipmanın hizmet dışı bırakılması", en: "Suitable industrial equipment, regular inspection and removal of damaged equipment from service" },
        additionalControls: { tr: "Geçici ek ve uygunsuz onarımları yasakla", en: "Prohibit temporary joints and unsuitable repairs" },
      },
      {
        hazard: { tr: "Islak ortam veya su teması", en: "Wet conditions or water contact" },
        consequence: { tr: "Elektrik çarpması", en: "Electric shock" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site workers" },
        existingControls: { tr: "Uygun IP koruması ve kaçak akım koruması", en: "Suitable IP protection and residual-current protection" },
        additionalControls: { tr: "Priz ve dağıtım panolarını su birikiminden uzak konumlandır", en: "Position outlets and distribution boards away from water accumulation" },
      },
      {
        hazard: { tr: "Kabloların geçiş yollarında olması", en: "Cables routed across access ways" },
        consequence: { tr: "Takılma, kablo hasarı veya elektrik riski", en: "Trip, cable damage or electrical hazard" },
        personsAtRisk: { tr: "Yayalar ve araç kullanıcıları", en: "Pedestrians and vehicle users" },
        existingControls: { tr: "Kablo askısı veya koruyucu kablo geçiş sistemi", en: "Cable supports or protective cable-crossing systems" },
        additionalControls: { tr: "Kabloları mümkün olduğunca geçiş yollarından tamamen kaldır", en: "Route cables away from access ways wherever practicable" },
      },
    ],
  },
];
