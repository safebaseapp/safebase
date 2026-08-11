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
      // SERIAL_PACK02::scaffold-dismantling
      {
        hazard: { tr: "Yetkisiz söküm sırası", en: "Unauthorized dismantling sequence" },
        consequence: { tr: "İskele stabilitesinin kaybı veya çökme", en: "Loss of scaffold stability or collapse" },
        personsAtRisk: { tr: "İskele söküm ekibi", en: "Scaffold dismantling crew" },
        existingControls: { tr: "Onaylı söküm sırası ve yetkin personel", en: "Approved dismantling sequence and competent personnel" },
        additionalControls: { tr: "Tie ve brace elemanlarını yalnızca güvenli sıraya göre sök", en: "Remove ties and braces only in the approved safe sequence" },
      },
      {
        hazard: { tr: "Sökülen malzemenin kontrolsüz indirilmesi", en: "Uncontrolled lowering of dismantled materials" },
        consequence: { tr: "Düşen cisim veya ezilme", en: "Falling-object or crushing injury" },
        personsAtRisk: { tr: "Söküm ekibi ve alt seviyedeki çalışanlar", en: "Dismantling crew and personnel below" },
        existingControls: { tr: "Kontrollü malzeme indirme yöntemi", en: "Controlled material-lowering method" },
        additionalControls: { tr: "Parçaların aşağı atılmasını engelle ve mekanik indirme kullan", en: "Prevent dropping components and use controlled lowering" },
      },
      {
        hazard: { tr: "Söküm sırasında güvenli erişimin kaybedilmesi", en: "Loss of safe access during dismantling" },
        consequence: { tr: "Yüksekten düşme", en: "Fall from height" },
        personsAtRisk: { tr: "Söküm personeli", en: "Dismantling personnel" },
        existingControls: { tr: "Planlı erişim ve düşüş koruması", en: "Planned access and fall protection" },
        additionalControls: { tr: "Söküm ilerledikçe güvenli erişim güzergahını yeniden doğrula", en: "Reverify safe access as dismantling progresses" },
      }
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
      // SAFEBASE_PACK02::ladder-work
      {
        hazard: { tr: "Merdiven üzerinde aşırı uzanma", en: "Overreaching from ladder" },
        consequence: { tr: "Denge kaybı ve düşme", en: "Loss of balance and fall" },
        personsAtRisk: { tr: "Merdiven kullanıcısı", en: "Ladder user" },
        existingControls: { tr: "Üç nokta temas ve doğru merdiven konumlandırması", en: "Three-point contact and correct ladder positioning" },
        additionalControls: { tr: "Merdiveni yeniden konumlandır ve yana aşırı uzanmayı engelle", en: "Reposition the ladder and prevent excessive sideways reach" },
      },
      {
        hazard: { tr: "Merdivenin üst basamaklarında çalışma", en: "Working from prohibited top ladder steps" },
        consequence: { tr: "Stabilite kaybı ve düşme", en: "Loss of stability and fall" },
        personsAtRisk: { tr: "Merdiven kullanıcısı", en: "Ladder user" },
        existingControls: { tr: "Üretici kullanım talimatı", en: "Manufacturer instructions" },
        additionalControls: { tr: "Üreticinin yasakladığı üst basamaklarda durmayı engelle", en: "Prevent standing on manufacturer-prohibited top steps" },
      },
      {
        hazard: { tr: "Merdivenin uygunsuz amaçla kullanılması", en: "Using ladder for an unintended purpose" },
        consequence: { tr: "Yapısal arıza veya düşme", en: "Structural failure or fall" },
        personsAtRisk: { tr: "Merdiven kullanıcıları", en: "Ladder users" },
        existingControls: { tr: "İşe uygun merdiven seçimi", en: "Task-appropriate ladder selection" },
        additionalControls: { tr: "Merdiveni platform, köprü veya yatay çalışma yüzeyi olarak kullanma", en: "Do not use ladders as platforms, bridges or horizontal work surfaces" },
      }
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
      // SAFEBASE_PACK02::steel-erection
      {
        hazard: { tr: "Bağlantı tamamlanmadan yükün vinçten ayrılması", en: "Releasing the load before connections are complete" },
        consequence: { tr: "Çelik elemanın devrilmesi veya düşmesi", en: "Steel member collapse or fall" },
        personsAtRisk: { tr: "Montaj ve rigging ekibi", en: "Erection and rigging crew" },
        existingControls: { tr: "Montaj sırası ve bağlantı kontrolü", en: "Erection sequence and connection verification" },
        additionalControls: { tr: "Stabil bağlantılar tamamlanmadan rigging ekipmanını ayırma", en: "Do not release rigging until stable connections are complete" },
      },
      {
        hazard: { tr: "Sıkışma ve pinch point", en: "Crush and pinch points" },
        consequence: { tr: "El veya uzuv yaralanması", en: "Hand or limb injury" },
        personsAtRisk: { tr: "Montaj çalışanları", en: "Erection workers" },
        existingControls: { tr: "Tag line ve kontrollü konumlandırma", en: "Tag lines and controlled positioning" },
        additionalControls: { tr: "Ellerin bağlantı ve oturma noktalarında bulunmasını engelle", en: "Keep hands clear of connection and landing points" },
      },
      {
        hazard: { tr: "Rüzgarda geniş yüzeyli çelik eleman kaldırılması", en: "Lifting large steel members in wind" },
        consequence: { tr: "Kontrolsüz yük hareketi veya çarpışma", en: "Uncontrolled load movement or collision" },
        personsAtRisk: { tr: "Montaj ve kaldırma ekibi", en: "Erection and lifting team" },
        existingControls: { tr: "Rüzgar takibi ve kaldırma planı", en: "Wind monitoring and lift plan" },
        additionalControls: { tr: "Yük geometrisine göre uygun rüzgar kriteri uygula", en: "Apply suitable wind criteria based on load geometry" },
      }
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
      // SAFEBASE_PACK02::trenching
      {
        hazard: { tr: "Hendek kenarında kazı malzemesi", en: "Spoil pile too close to trench edge" },
        consequence: { tr: "Kenar göçmesi veya malzemenin hendeğe düşmesi", en: "Edge collapse or material falling into trench" },
        personsAtRisk: { tr: "Hendek içindeki çalışanlar", en: "Workers inside trench" },
        existingControls: { tr: "Güvenli malzeme mesafesi ve alan kontrolü", en: "Safe spoil setback and area control" },
        additionalControls: { tr: "Kazı malzemesini hendek kenarından güvenli mesafede tut", en: "Maintain excavated material at a safe distance from the trench edge" },
      },
      {
        hazard: { tr: "Hendekte su birikmesi", en: "Water accumulation in trench" },
        consequence: { tr: "Zemin stabilitesinin bozulması veya boğulma", en: "Ground instability or drowning" },
        personsAtRisk: { tr: "Hendek çalışanları", en: "Trench workers" },
        existingControls: { tr: "Drenaj ve pompalama", en: "Drainage and pumping" },
        additionalControls: { tr: "Kontrolsüz su girişi varsa çalışmayı durdur ve yeniden değerlendir", en: "Stop work and reassess if uncontrolled water enters" },
      },
      {
        hazard: { tr: "Hendek yakınında ağır ekipman yükü", en: "Heavy equipment loading near trench" },
        consequence: { tr: "Hendek duvarında göçme", en: "Trench wall collapse" },
        personsAtRisk: { tr: "Hendek içindeki çalışanlar", en: "Workers inside trench" },
        existingControls: { tr: "Araç yaklaşma sınırı ve trafik kontrolü", en: "Vehicle stand-off distance and traffic control" },
        additionalControls: { tr: "Ağır ekipmanın kenar yükünü zemin koşullarına göre değerlendir", en: "Assess surcharge loading from heavy equipment against ground conditions" },
      }
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
      // SAFEBASE_PACK02::flange-breaking
      {
        hazard: { tr: "Yanlış flanşın açılması", en: "Opening the wrong flange" },
        consequence: { tr: "Beklenmeyen proses salımı", en: "Unexpected process release" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Hat kimliği, çizim ve saha doğrulaması", en: "Line identification, drawings and field verification" },
        additionalControls: { tr: "Flanşı açmadan önce hat kimliğini ikinci kez doğrula", en: "Perform a second verification of line identity before opening" },
      },
      {
        hazard: { tr: "Flanş açılırken line-of-fire maruziyeti", en: "Line-of-fire exposure during flange opening" },
        consequence: { tr: "Basınçlı sıvı veya gazla yaralanma", en: "Injury from pressurized liquid or gas" },
        personsAtRisk: { tr: "Flanşı açan çalışanlar", en: "Personnel opening the flange" },
        existingControls: { tr: "Kontrollü cıvata gevşetme yöntemi", en: "Controlled bolt-loosening method" },
        additionalControls: { tr: "İlk açıklığı potansiyel salım hattı dışında oluştur", en: "Create the initial opening from outside the potential release path" },
      },
      {
        hazard: { tr: "Flanş bağlantısında mekanik gerilim", en: "Mechanical strain in flange connection" },
        consequence: { tr: "Ani hareket, sıkışma veya çarpma", en: "Sudden movement, pinch or impact injury" },
        personsAtRisk: { tr: "Bakım ve rigging personeli", en: "Maintenance and rigging personnel" },
        existingControls: { tr: "Hat desteği ve kontrollü söküm", en: "Line support and controlled dismantling" },
        additionalControls: { tr: "Cıvataları tamamen çıkarmadan önce boru gerilimini değerlendir", en: "Assess pipe strain before fully removing bolts" },
      }
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
      // SAFEBASE_PACK02::hydrostatic-testing
      {
        hazard: { tr: "Test alanına yetkisiz giriş", en: "Unauthorized entry into hydrotest area" },
        consequence: { tr: "Basınçlı sistem arızasına maruziyet", en: "Exposure to pressurized system failure" },
        personsAtRisk: { tr: "Diğer saha çalışanları", en: "Other site personnel" },
        existingControls: { tr: "Bariyer ve uyarı işaretleri", en: "Barricades and warning signs" },
        additionalControls: { tr: "Test boyunca kontrollü erişim sağla", en: "Maintain controlled access throughout testing" },
      },
      {
        hazard: { tr: "Hasarlı veya uygun olmayan manometre", en: "Damaged or unsuitable pressure gauge" },
        consequence: { tr: "Yanlış basınç okuması ve aşırı basınçlandırma", en: "Incorrect pressure reading and over-pressurization" },
        personsAtRisk: { tr: "Test ekibi", en: "Test team" },
        existingControls: { tr: "Kalibre edilmiş uygun manometre", en: "Suitable calibrated pressure gauge" },
        additionalControls: { tr: "Test öncesi sertifika, aralık ve fiziksel durumu doğrula", en: "Verify certification, range and physical condition before testing" },
      },
      {
        hazard: { tr: "Test sonrası kontrolsüz su tahliyesi", en: "Uncontrolled water discharge after testing" },
        consequence: { tr: "Kayma veya çevresel salım", en: "Slip hazard or environmental release" },
        personsAtRisk: { tr: "Test ekibi ve çevre personeli", en: "Test team and nearby personnel" },
        existingControls: { tr: "Planlı drenaj noktası", en: "Planned drainage point" },
        additionalControls: { tr: "Tahliye güzergahını ve drenaj kapasitesini önceden doğrula", en: "Verify discharge route and drainage capacity in advance" },
      }
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
      // SAFEBASE_PACK02::pneumatic-testing
      {
        hazard: { tr: "Hortum veya geçici bağlantı kopması", en: "Hose or temporary connection failure" },
        consequence: { tr: "Hortum savrulması veya yüksek enerjili çarpma", en: "Hose whip or high-energy impact" },
        personsAtRisk: { tr: "Test ekibi", en: "Test team" },
        existingControls: { tr: "Uygun bağlantılar ve güvenli sabitleme", en: "Suitable connections and secure restraint" },
        additionalControls: { tr: "Geçici bağlantılarda uygun restraint kullan", en: "Use suitable restraints on temporary connections" },
      },
      {
        hazard: { tr: "Basınç göstergesinin tehlikeli konumlandırılması", en: "Unsafe pressure-gauge positioning" },
        consequence: { tr: "Arıza halinde projectile etkisi", en: "Projectile exposure in the event of failure" },
        personsAtRisk: { tr: "Test personeli", en: "Test personnel" },
        existingControls: { tr: "Uzaktan izleme ve güvenli pozisyon", en: "Remote monitoring and safe positioning" },
        additionalControls: { tr: "Basınç göstergelerini line-of-fire dışında konumlandır", en: "Position pressure gauges outside line-of-fire areas" },
      },
      {
        hazard: { tr: "Hızlı basınç boşaltılması", en: "Rapid depressurization" },
        consequence: { tr: "Gürültü veya kontrolsüz salım", en: "Noise or uncontrolled release" },
        personsAtRisk: { tr: "Test ve çevre personeli", en: "Test and nearby personnel" },
        existingControls: { tr: "Kontrollü basınç boşaltma prosedürü", en: "Controlled depressurization procedure" },
        additionalControls: { tr: "Basıncı belirlenen hızda güvenli discharge noktasından boşalt", en: "Release pressure at the specified rate through a safe discharge point" },
      }
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
      // SAFEBASE_PACK02::air-blowing
      {
        hazard: { tr: "Discharge bölgesine kontrolsüz erişim", en: "Uncontrolled access to discharge zone" },
        consequence: { tr: "Yüksek basınçlı hava veya partiküle maruziyet", en: "Exposure to high-pressure air or debris" },
        personsAtRisk: { tr: "Diğer saha personeli", en: "Other site personnel" },
        existingControls: { tr: "Dışlama alanı ve bariyerleme", en: "Exclusion zone and barricading" },
        additionalControls: { tr: "İş boyunca kontrollü erişim uygula", en: "Maintain controlled access throughout the operation" },
      },
      {
        hazard: { tr: "Geçici bağlantının ayrılması", en: "Failure of temporary connection" },
        consequence: { tr: "Hortum savrulması veya projectile yaralanması", en: "Hose whip or projectile injury" },
        personsAtRisk: { tr: "Air blowing ekibi", en: "Air-blowing team" },
        existingControls: { tr: "Bağlantı kontrolü ve mekanik sabitleme", en: "Connection inspection and mechanical restraint" },
        additionalControls: { tr: "Basınçlandırma öncesi tüm geçici bağlantıları bağımsız kontrol et", en: "Independently inspect all temporary connections before pressurization" },
      },
      {
        hazard: { tr: "Toz veya proses kalıntısının yayılması", en: "Release of dust or process residue" },
        consequence: { tr: "Solunum veya göz maruziyeti", en: "Respiratory or eye exposure" },
        personsAtRisk: { tr: "Air blowing ekibi ve yakın personel", en: "Air-blowing team and nearby personnel" },
        existingControls: { tr: "Discharge yönü kontrolü ve uygun KKD", en: "Controlled discharge direction and suitable PPE" },
        additionalControls: { tr: "Potansiyel toz ve kalıntı içeriğini işlem öncesi değerlendir", en: "Assess potential dust and residue content before the operation" },
      }
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
      // SAFEBASE_PACK02::painting
      {
        hazard: { tr: "Solvent buharına maruziyet", en: "Exposure to solvent vapors" },
        consequence: { tr: "Baş dönmesi, solunum etkisi veya zehirlenme", en: "Dizziness, respiratory effects or poisoning" },
        personsAtRisk: { tr: "Boya uygulayıcıları ve yakın çalışanlar", en: "Painters and nearby workers" },
        existingControls: { tr: "Havalandırma, SDS ve uygun solunum koruması", en: "Ventilation, SDS and suitable respiratory protection" },
        additionalControls: { tr: "Kapalı alanlarda maruziyet seviyesini değerlendir", en: "Assess exposure levels in enclosed areas" },
      },
      {
        hazard: { tr: "Yanıcı boya veya solventin tutuşması", en: "Ignition of flammable paint or solvent" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Boya ekibi ve çevre personeli", en: "Painting crew and nearby personnel" },
        existingControls: { tr: "Ateş kaynaklarının kontrolü ve uygun depolama", en: "Ignition-source control and suitable storage" },
        additionalControls: { tr: "Boya alanındaki ateş kaynaklarını fiziksel olarak kontrol et", en: "Physically control ignition sources around the painting area" },
      },
      {
        hazard: { tr: "Boya ile göz veya cilt teması", en: "Paint contact with eyes or skin" },
        consequence: { tr: "Tahriş veya kimyasal yaralanma", en: "Irritation or chemical injury" },
        personsAtRisk: { tr: "Boya uygulayıcıları", en: "Painters" },
        existingControls: { tr: "Kimyasala uygun eldiven, gözlük ve koruyucu kıyafet", en: "Chemical-resistant gloves, eye protection and protective clothing" },
        additionalControls: { tr: "KKD seçimini kullanılan ürünün SDS bilgisine göre doğrula", en: "Verify PPE selection against the product SDS" },
      }
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
      // SERIAL_PACK02::spray-painting
      {
        hazard: { tr: "Boya sisi solunması", en: "Inhalation of paint mist" },
        consequence: { tr: "Solunum yolu etkisi veya zehirlenme", en: "Respiratory effects or poisoning" },
        personsAtRisk: { tr: "Boya uygulayıcıları", en: "Spray painters" },
        existingControls: { tr: "Havalandırma ve uygun solunum koruması", en: "Ventilation and suitable respiratory protection" },
        additionalControls: { tr: "Ürün SDS bilgisine göre filtre ve RPE seçimini doğrula", en: "Verify filter and RPE selection against the product SDS" },
      },
      {
        hazard: { tr: "Statik elektrik veya ateş kaynağı", en: "Static electricity or ignition source" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Boya ekibi ve yakın personel", en: "Painting crew and nearby personnel" },
        existingControls: { tr: "Ateş kaynağı kontrolü ve uygun ekipman", en: "Ignition-source control and suitable equipment" },
        additionalControls: { tr: "Yanıcı atmosfer oluşabilecek alanlarda bonding/grounding gereksinimini doğrula", en: "Verify bonding and grounding requirements where flammable atmospheres may form" },
      },
      {
        hazard: { tr: "Yetersiz alan izolasyonu", en: "Inadequate work-area isolation" },
        consequence: { tr: "Diğer çalışanların boya sisine maruziyeti", en: "Exposure of other workers to paint mist" },
        personsAtRisk: { tr: "Yakındaki saha çalışanları", en: "Nearby site personnel" },
        existingControls: { tr: "Bariyer ve uyarı işaretleri", en: "Barricades and warning signs" },
        additionalControls: { tr: "Sprey boya alanını fiziksel olarak ayır ve gereksiz erişimi engelle", en: "Physically segregate the spray-painting area and restrict unnecessary access" },
      }
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
      // SERIAL_PACK02::abrasive-blasting
      {
        hazard: { tr: "Yüksek hızlı abrasif partiküller", en: "High-velocity abrasive particles" },
        consequence: { tr: "Göz, yüz veya cilt yaralanması", en: "Eye, face or skin injury" },
        personsAtRisk: { tr: "Kumlama operatörü ve yakın çalışanlar", en: "Blasting operator and nearby workers" },
        existingControls: { tr: "Blasting PPE ve alan izolasyonu", en: "Blasting PPE and area isolation" },
        additionalControls: { tr: "Nozul yönünü ve dışlama alanını çalışma boyunca kontrol et", en: "Control nozzle direction and exclusion zone throughout the task" },
      },
      {
        hazard: { tr: "Silika veya tehlikeli toz maruziyeti", en: "Silica or hazardous dust exposure" },
        consequence: { tr: "Mesleki solunum hastalığı", en: "Occupational respiratory disease" },
        personsAtRisk: { tr: "Kumlama personeli", en: "Blasting personnel" },
        existingControls: { tr: "Toz kontrolü ve uygun solunum koruması", en: "Dust control and suitable respiratory protection" },
        additionalControls: { tr: "Abrasif malzemenin içeriğini ve gerekli RPE seviyesini önceden doğrula", en: "Verify abrasive composition and required RPE level before work" },
      },
      {
        hazard: { tr: "Basınçlı hortum arızası", en: "Pressurized hose failure" },
        consequence: { tr: "Hortum savrulması veya çarpma", en: "Hose whip or impact injury" },
        personsAtRisk: { tr: "Kumlama ekibi", en: "Blasting crew" },
        existingControls: { tr: "Hortum kontrolü ve uygun bağlantılar", en: "Hose inspection and suitable connections" },
        additionalControls: { tr: "Hortum, coupling ve dead-man sistemini kullanım öncesi kontrol et", en: "Inspect hose, couplings and dead-man control before use" },
      }
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
      // SERIAL_PACK02::concrete-pouring
      {
        hazard: { tr: "Beton pompa hortumunun kontrolsüz hareketi", en: "Uncontrolled concrete pump hose movement" },
        consequence: { tr: "Çarpma veya ezilme", en: "Impact or crushing injury" },
        personsAtRisk: { tr: "Beton ekibi", en: "Concrete crew" },
        existingControls: { tr: "Hortum kontrolü ve eğitimli personel", en: "Hose control and trained personnel" },
        additionalControls: { tr: "Hortum ucunda yeterli personel ve güvenli pozisyon sağla", en: "Provide sufficient personnel and safe positioning at the hose end" },
      },
      {
        hazard: { tr: "Islak betonla cilt teması", en: "Skin contact with wet concrete" },
        consequence: { tr: "Kimyasal yanık veya dermatit", en: "Chemical burn or dermatitis" },
        personsAtRisk: { tr: "Beton çalışanları", en: "Concrete workers" },
        existingControls: { tr: "Su geçirmez eldiven, bot ve uygun kıyafet", en: "Waterproof gloves, boots and suitable clothing" },
        additionalControls: { tr: "Betonun bot veya kıyafet içine girmesini önle ve temas halinde hemen temizle", en: "Prevent concrete entering boots or clothing and wash immediately after contact" },
      },
      {
        hazard: { tr: "Döküm sırasında kalıp arızası", en: "Formwork failure during pouring" },
        consequence: { tr: "Çökme, ezilme veya ciddi yaralanma", en: "Collapse, crushing or serious injury" },
        personsAtRisk: { tr: "Beton ve kalıp ekipleri", en: "Concrete and formwork crews" },
        existingControls: { tr: "Onaylı kalıp sistemi ve döküm kontrolü", en: "Approved formwork system and pour control" },
        additionalControls: { tr: "Döküm hızını tasarım limitinde tut ve deformasyonu sürekli izle", en: "Maintain pour rate within design limits and monitor deformation" },
      }
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
      // SERIAL_PACK02::formwork
      {
        hazard: { tr: "Kalıp elemanlarının devrilmesi", en: "Formwork components overturning" },
        consequence: { tr: "Ezilme veya ciddi yaralanma", en: "Crushing or serious injury" },
        personsAtRisk: { tr: "Kalıp ekibi", en: "Formwork crew" },
        existingControls: { tr: "Geçici destek ve kontrollü montaj", en: "Temporary support and controlled erection" },
        additionalControls: { tr: "Kalıp stabil hale gelmeden geçici destekleri kaldırma", en: "Do not remove temporary supports until the formwork is stable" },
      },
      {
        hazard: { tr: "Çivi veya keskin kenar teması", en: "Contact with nails or sharp edges" },
        consequence: { tr: "Kesik veya delinme yaralanması", en: "Cut or puncture injury" },
        personsAtRisk: { tr: "Kalıp çalışanları", en: "Formwork workers" },
        existingControls: { tr: "Housekeeping ve uygun eldiven", en: "Housekeeping and suitable gloves" },
        additionalControls: { tr: "Çıkıntılı çivileri sök veya bük ve atıkları kontrollü topla", en: "Remove or bend protruding nails and collect waste in a controlled manner" },
      },
      {
        hazard: { tr: "Kalıp sökümünde beklenmeyen yük boşalması", en: "Unexpected load release during stripping" },
        consequence: { tr: "Malzeme düşmesi veya ezilme", en: "Falling material or crushing" },
        personsAtRisk: { tr: "Kalıp söküm ekibi", en: "Formwork stripping crew" },
        existingControls: { tr: "Planlı söküm sırası", en: "Planned stripping sequence" },
        additionalControls: { tr: "Beton dayanımı ve söküm onayını doğrulamadan taşıyıcı elemanları sökme", en: "Do not remove load-bearing elements before verifying concrete strength and stripping approval" },
      }
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
      // SERIAL_PACK02::rebar-work
      {
        hazard: { tr: "Açıkta kalan donatı uçları", en: "Exposed rebar ends" },
        consequence: { tr: "Saplanma veya ciddi yaralanma", en: "Impalement or serious injury" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site personnel" },
        existingControls: { tr: "Koruyucu kapak ve bariyer", en: "Protective caps and barricading" },
        additionalControls: { tr: "Düşme ihtimali bulunan bölgelerde uygun impalement protection kullan", en: "Use suitable impalement protection where fall exposure exists" },
      },
      {
        hazard: { tr: "Donatı demetinin kontrolsüz hareketi", en: "Uncontrolled movement of rebar bundle" },
        consequence: { tr: "Ezilme veya sıkışma", en: "Crushing or pinch injury" },
        personsAtRisk: { tr: "Donatı ve rigging ekibi", en: "Rebar and rigging crew" },
        existingControls: { tr: "Uygun rigging ve kontrollü kaldırma", en: "Suitable rigging and controlled lifting" },
        additionalControls: { tr: "Demet stabilitesini ve bağlama noktalarını kaldırma öncesi doğrula", en: "Verify bundle stability and attachment points before lifting" },
      },
      {
        hazard: { tr: "Donatı bağlama sırasında ergonomik yük", en: "Ergonomic strain during rebar tying" },
        consequence: { tr: "Kas-iskelet yaralanması", en: "Musculoskeletal injury" },
        personsAtRisk: { tr: "Donatı çalışanları", en: "Rebar workers" },
        existingControls: { tr: "Uygun çalışma pozisyonu ve ekipman", en: "Suitable working posture and equipment" },
        additionalControls: { tr: "Uzun süreli eğilme ve tekrarlı hareketleri mola ve rotasyonla azalt", en: "Reduce prolonged bending and repetitive motion through breaks and rotation" },
      }
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
      // SERIAL_PACK02::demolition
      {
        hazard: { tr: "Kontrolsüz yapısal çökme", en: "Uncontrolled structural collapse" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Yıkım ekibi ve çevre personeli", en: "Demolition crew and nearby personnel" },
        existingControls: { tr: "Mühendislik yıkım planı ve dışlama alanı", en: "Engineered demolition plan and exclusion zone" },
        additionalControls: { tr: "Yıkım sırasını değiştirmeden önce yetkili teknik onay al", en: "Obtain authorized technical approval before changing the demolition sequence" },
      },
      {
        hazard: { tr: "Gizli enerji veya tesisat hattı", en: "Hidden energy or utility service" },
        consequence: { tr: "Elektrik çarpması, gaz kaçağı veya yangın", en: "Electric shock, gas release or fire" },
        personsAtRisk: { tr: "Yıkım çalışanları", en: "Demolition workers" },
        existingControls: { tr: "Servis tespiti ve izolasyon", en: "Service identification and isolation" },
        additionalControls: { tr: "Yıkım öncesi elektrik, gaz ve proses hatlarını fiziksel olarak doğrula", en: "Physically verify electrical, gas and process isolations before demolition" },
      },
      {
        hazard: { tr: "Yıkım tozu ve partikülleri", en: "Demolition dust and debris" },
        consequence: { tr: "Solunum veya göz yaralanması", en: "Respiratory or eye injury" },
        personsAtRisk: { tr: "Yıkım çalışanları ve yakın personel", en: "Demolition workers and nearby personnel" },
        existingControls: { tr: "Toz bastırma ve uygun KKD", en: "Dust suppression and suitable PPE" },
        additionalControls: { tr: "Malzeme içeriğine göre asbest/silika gibi özel tehlikeleri önceden değerlendir", en: "Assess specific hazards such as asbestos or silica based on material composition" },
      }
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
      // SERIAL_PACK02::cable-pulling
      {
        hazard: { tr: "Kablo çekme hattında sıkışma noktaları", en: "Pinch points along cable-pulling route" },
        consequence: { tr: "El veya uzuv yaralanması", en: "Hand or limb injury" },
        personsAtRisk: { tr: "Kablo ekibi", en: "Cable-pulling crew" },
        existingControls: { tr: "Kontrollü çekme yöntemi ve iletişim", en: "Controlled pulling method and communication" },
        additionalControls: { tr: "Personeli roller, drum ve yön değiştirme noktalarındaki pinch pointlerden uzak tut", en: "Keep personnel clear of pinch points at rollers, drums and direction changes" },
      },
      {
        hazard: { tr: "Kablo tamburunun kontrolsüz dönmesi", en: "Uncontrolled cable-drum rotation" },
        consequence: { tr: "Ezilme veya çarpma", en: "Crushing or impact injury" },
        personsAtRisk: { tr: "Kablo çalışanları", en: "Cable workers" },
        existingControls: { tr: "Tambur sehpası ve fren sistemi", en: "Drum stand and braking system" },
        additionalControls: { tr: "Tambur standının kapasite ve stabilitesini kullanım öncesi doğrula", en: "Verify drum-stand capacity and stability before use" },
      },
      {
        hazard: { tr: "Çekme halatı veya kablonun kopması", en: "Failure of pulling rope or cable" },
        consequence: { tr: "Whiplash veya projectile yaralanması", en: "Whiplash or projectile injury" },
        personsAtRisk: { tr: "Kablo ekibi", en: "Cable-pulling crew" },
        existingControls: { tr: "Uygun çekme ekipmanı ve SWL kontrolü", en: "Suitable pulling equipment and SWL verification" },
        additionalControls: { tr: "Personeli potansiyel snap-back hattından uzak tut", en: "Keep personnel outside the potential snap-back zone" },
      }
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
      // SERIAL_PACK02::temporary-electrical-supply
      {
        hazard: { tr: "Hasarlı geçici elektrik kablosu", en: "Damaged temporary electrical cable" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site personnel" },
        existingControls: { tr: "Periyodik kontrol ve uygun kablo koruması", en: "Periodic inspection and suitable cable protection" },
        additionalControls: { tr: "Hasarlı kabloyu derhal enerjisiz bırak ve kullanım dışına al", en: "Immediately de-energize and remove damaged cable from service" },
      },
      {
        hazard: { tr: "Uygun olmayan topraklama veya RCD", en: "Inadequate grounding or RCD protection" },
        consequence: { tr: "Ölümcül elektrik çarpması", en: "Fatal electric shock" },
        personsAtRisk: { tr: "Elektrikli ekipman kullanıcıları", en: "Electrical equipment users" },
        existingControls: { tr: "Topraklama ve kaçak akım koruması", en: "Grounding and residual-current protection" },
        additionalControls: { tr: "RCD fonksiyonunu ve dağıtım panosu korumalarını düzenli test et", en: "Regularly test RCD function and distribution-board protection" },
      },
      {
        hazard: { tr: "Kabloların araç veya yaya yolunda korunmasız olması", en: "Unprotected cables in vehicle or pedestrian routes" },
        consequence: { tr: "Kablo hasarı, takılma veya elektrik riski", en: "Cable damage, trip or electrical hazard" },
        personsAtRisk: { tr: "Yayalar ve ekipman operatörleri", en: "Pedestrians and equipment operators" },
        existingControls: { tr: "Kablo köprüsü veya yükseltilmiş güzergah", en: "Cable ramps or elevated routing" },
        additionalControls: { tr: "Kablo güzergahını trafik ve mekanik hasardan fiziksel olarak koru", en: "Physically protect cable routes from traffic and mechanical damage" },
      }
    ],
  },
];
