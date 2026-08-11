export type RiskLibraryText = {
  tr: string;
  en: string;
};

export type RiskLibraryItem = {
  hazard: RiskLibraryText;
  consequence: RiskLibraryText;
  personsAtRisk: RiskLibraryText;
  existingControls: RiskLibraryText;
  additionalControls: RiskLibraryText;
};

export type RiskLibraryActivity = {
  id: string;
  category: RiskLibraryText;
  activity: RiskLibraryText;
  items: RiskLibraryItem[];
};

export const riskLibraryPack01: RiskLibraryActivity[] = [
  {
    id: "working-at-height",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Yüksekte Çalışma", en: "Working at Height" },
    items: [
      {
        hazard: { tr: "Yüksekten düşme", en: "Fall from height" },
        consequence: { tr: "Ciddi yaralanma, kalıcı sakatlık veya ölüm", en: "Serious injury, permanent disability or fatality" },
        personsAtRisk: { tr: "Çalışanlar ve alt yükleniciler", en: "Workers and contractors" },
        existingControls: { tr: "Güvenli platform, korkuluk, uygun erişim, eğitimli personel ve gerekli olduğunda düşüş koruma sistemi", en: "Safe platform, guardrails, suitable access, trained personnel and fall protection where required" },
        additionalControls: { tr: "Kurtarma planını doğrula, gözetim sağla ve değişen saha koşullarını yeniden değerlendir", en: "Verify rescue arrangements, provide supervision and reassess changing site conditions" },
      },
      {
        hazard: { tr: "Düşen cisimler", en: "Dropped objects" },
        consequence: { tr: "Baş yaralanması, ciddi yaralanma veya ölüm", en: "Head injury, serious injury or fatality" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Personnel working below" },
        existingControls: { tr: "Toe board, malzeme sabitleme, alet sabitleme ve alt alan kontrolü", en: "Toe boards, material securing, tool tethering and controlled area below" },
        additionalControls: { tr: "Dışlama alanını güçlendir ve simultane işleri koordine et", en: "Strengthen the exclusion zone and coordinate simultaneous work" },
      },
      {
        hazard: { tr: "Açık kenar veya zemin açıklığı", en: "Open edge or floor opening" },
        consequence: { tr: "Düşme sonucu ciddi yaralanma veya ölüm", en: "Serious injury or fatality following a fall" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site personnel" },
        existingControls: { tr: "Korkuluk, güvenli kapak, bariyer ve uyarı işaretleri", en: "Guardrails, secure covers, barricades and warning signs" },
        additionalControls: { tr: "Koruyucuların vardiya boyunca yerinde olduğunu doğrula", en: "Verify protection remains secure throughout the shift" },
      },
    ],
  },

  {
    id: "scaffold-erection",
    category: { tr: "İskele", en: "Scaffolding" },
    activity: { tr: "İskele Kurulumu", en: "Scaffold Erection" },
    items: [
      {
        hazard: { tr: "Kurulum sırasında düşme", en: "Fall during erection" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "İskele kurulum ekibi", en: "Scaffold erection crew" },
        existingControls: { tr: "Yetkin personel, güvenli kurulum sırası, uygun erişim ve düşüş koruması", en: "Competent personnel, safe erection sequence, suitable access and fall protection" },
        additionalControls: { tr: "Kurulum planını ve gözetimi işe başlamadan doğrula", en: "Verify erection plan and supervision before starting work" },
      },
      {
        hazard: { tr: "İskele parçası düşmesi", en: "Falling scaffold components" },
        consequence: { tr: "Ezilme veya baş yaralanması", en: "Crushing or head injury" },
        personsAtRisk: { tr: "Kurulum ekibi ve alt seviyedeki çalışanlar", en: "Erection crew and workers below" },
        existingControls: { tr: "Alt alan izolasyonu ve kontrollü malzeme aktarımı", en: "Exclusion zone below and controlled material transfer" },
        additionalControls: { tr: "Malzemeleri sabitle ve simultane işleri sınırla", en: "Secure materials and restrict simultaneous work" },
      },
      {
        hazard: { tr: "Yetersiz temel veya brace/tie", en: "Inadequate foundation, bracing or ties" },
        consequence: { tr: "İskele dengesizliği veya çökmesi", en: "Scaffold instability or collapse" },
        personsAtRisk: { tr: "İskele çalışanları ve kullanıcıları", en: "Scaffold workers and users" },
        existingControls: { tr: "Zemin kontrolü, base plate, sole board, brace ve tie sistemi", en: "Ground assessment, base plates, sole boards, bracing and ties" },
        additionalControls: { tr: "Teslim öncesi yetkin kişi kontrolü yap", en: "Complete competent-person inspection before handover" },
      },
    ],
  },

  {
    id: "scaffold-inspection",
    category: { tr: "İskele", en: "Scaffolding" },
    activity: { tr: "İskele Kontrolü", en: "Scaffold Inspection" },
    items: [
      {
        hazard: { tr: "Eksik veya hasarlı iskele bileşeni", en: "Missing or damaged scaffold component" },
        consequence: { tr: "Düşme veya yapısal arıza", en: "Fall or structural failure" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Yetkin kişi kontrolü ve etiketleme sistemi", en: "Competent-person inspection and tagging system" },
        additionalControls: { tr: "Uygunsuz iskeleyi kullanıma kapat", en: "Remove non-compliant scaffold from service" },
      },
      {
        hazard: { tr: "Değiştirilmiş veya izinsiz modifiye edilmiş iskele", en: "Unauthorized scaffold modification" },
        consequence: { tr: "Stabilite kaybı ve düşme", en: "Loss of stability and falls" },
        personsAtRisk: { tr: "Tüm iskele kullanıcıları", en: "All scaffold users" },
        existingControls: { tr: "Yetkisiz değişiklik yasağı ve düzenli saha kontrolü", en: "Prohibition of unauthorized changes and regular inspections" },
        additionalControls: { tr: "Değişiklik sonrası yeniden resmi kontrol uygula", en: "Require formal reinspection after modification" },
      },
      {
        hazard: { tr: "Eksik erişim veya açık trapdoor", en: "Unsafe access or open trapdoor" },
        consequence: { tr: "Düşme", en: "Fall" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Güvenli erişim merdiveni ve trapdoor kontrolü", en: "Safe access ladder and trapdoor control" },
        additionalControls: { tr: "Erişim noktalarını günlük saha turunda kontrol et", en: "Verify access points during daily site inspections" },
      },
    ],
  },

  {
    id: "hot-work",
    category: { tr: "Sıcak Çalışma", en: "Hot Work" },
    activity: { tr: "Sıcak Çalışma", en: "Hot Work" },
    items: [
      {
        hazard: { tr: "Yangın", en: "Fire" },
        consequence: { tr: "Yanık, ekipman hasarı veya ölüm", en: "Burns, equipment damage or fatality" },
        personsAtRisk: { tr: "Operatör ve yakın çevredeki personel", en: "Operator and nearby personnel" },
        existingControls: { tr: "Sıcak çalışma izni, yanıcıların kontrolü, yangın söndürücü ve fire watch", en: "Hot-work permit, combustible control, extinguisher and fire watch" },
        additionalControls: { tr: "Kıvılcım yayılım alanını ve alt seviyeleri tekrar kontrol et", en: "Recheck spark travel paths and lower levels" },
      },
      {
        hazard: { tr: "Yanıcı veya patlayıcı atmosfer", en: "Flammable or explosive atmosphere" },
        consequence: { tr: "Patlama ve ölüm", en: "Explosion and fatality" },
        personsAtRisk: { tr: "Sıcak çalışma ekibi ve çevredeki çalışanlar", en: "Hot-work crew and nearby workers" },
        existingControls: { tr: "Gaz ölçümü, proses izolasyonu ve havalandırma", en: "Gas testing, process isolation and ventilation" },
        additionalControls: { tr: "Koşullar değişirse gaz ölçümünü tekrarla", en: "Repeat gas testing if conditions change" },
      },
      {
        hazard: { tr: "Kaynak dumanı", en: "Welding fumes" },
        consequence: { tr: "Solunum yolu etkileri", en: "Respiratory effects" },
        personsAtRisk: { tr: "Kaynakçı ve yakın çalışanlar", en: "Welder and nearby workers" },
        existingControls: { tr: "Uygun havalandırma ve maruziyet kontrolü", en: "Suitable ventilation and exposure controls" },
        additionalControls: { tr: "Gerekirse lokal emiş veya uygun solunum koruması uygula", en: "Use local extraction or suitable respiratory protection where required" },
      },
    ],
  },

  {
    id: "confined-space",
    category: { tr: "Kapalı Alan", en: "Confined Space" },
    activity: { tr: "Kapalı Alan Girişi", en: "Confined Space Entry" },
    items: [
      {
        hazard: { tr: "Oksijen yetersizliği", en: "Oxygen deficiency" },
        consequence: { tr: "Bilinç kaybı veya ölüm", en: "Loss of consciousness or fatality" },
        personsAtRisk: { tr: "Kapalı alana giren çalışanlar", en: "Confined-space entrants" },
        existingControls: { tr: "Atmosfer ölçümü, havalandırma ve giriş izni", en: "Atmospheric testing, ventilation and entry permit" },
        additionalControls: { tr: "Gerekli durumlarda sürekli gaz ölçümü uygula", en: "Use continuous gas monitoring where required" },
      },
      {
        hazard: { tr: "Toksik veya yanıcı gaz", en: "Toxic or flammable gas" },
        consequence: { tr: "Zehirlenme, yangın veya patlama", en: "Poisoning, fire or explosion" },
        personsAtRisk: { tr: "Giriş yapanlar ve kurtarma ekibi", en: "Entrants and rescue team" },
        existingControls: { tr: "Gaz ölçümü, izolasyon ve havalandırma", en: "Gas testing, isolation and ventilation" },
        additionalControls: { tr: "Atmosfer değişimini çalışma boyunca takip et", en: "Monitor atmospheric changes throughout the task" },
      },
      {
        hazard: { tr: "Yetersiz kurtarma hazırlığı", en: "Inadequate rescue preparation" },
        consequence: { tr: "Gecikmiş müdahale ve ölüm", en: "Delayed response and fatality" },
        personsAtRisk: { tr: "Giriş yapan çalışanlar", en: "Entrants" },
        existingControls: { tr: "Kurtarma planı, gözcü ve uygun kurtarma ekipmanı", en: "Rescue plan, attendant and suitable rescue equipment" },
        additionalControls: { tr: "İşe özel kurtarma yöntemini giriş öncesi doğrula", en: "Verify the task-specific rescue method before entry" },
      },
    ],
  },

  {
    id: "excavation",
    category: { tr: "Kazı", en: "Excavation" },
    activity: { tr: "Kazı Çalışması", en: "Excavation" },
    items: [
      {
        hazard: { tr: "Kazı göçmesi", en: "Excavation collapse" },
        consequence: { tr: "Ezilme, boğulma veya ölüm", en: "Crushing, suffocation or fatality" },
        personsAtRisk: { tr: "Kazı içindeki çalışanlar", en: "Workers inside excavation" },
        existingControls: { tr: "Uygun şev, iksa veya koruyucu sistem ve yetkin kişi kontrolü", en: "Suitable sloping, shoring or protective system and competent-person inspection" },
        additionalControls: { tr: "Yağış ve zemin değişimi sonrası yeniden kontrol et", en: "Reinspect after rain or ground-condition changes" },
      },
      {
        hazard: { tr: "Yeraltı hattına temas", en: "Contact with underground services" },
        consequence: { tr: "Elektrik çarpması, yangın veya proses kaçağı", en: "Electric shock, fire or process release" },
        personsAtRisk: { tr: "Kazı ekibi", en: "Excavation crew" },
        existingControls: { tr: "Çizim, hat tespiti, izin ve kontrollü kazı", en: "Drawings, utility locating, permit and controlled excavation" },
        additionalControls: { tr: "Şüpheli bölgelerde kontrollü elle açma uygula", en: "Use controlled hand digging in uncertain areas" },
      },
      {
        hazard: { tr: "Kazıya düşme", en: "Fall into excavation" },
        consequence: { tr: "Kırık veya ciddi yaralanma", en: "Fracture or serious injury" },
        personsAtRisk: { tr: "Yayalar ve çalışanlar", en: "Pedestrians and workers" },
        existingControls: { tr: "Bariyer, güvenli geçiş ve aydınlatma", en: "Barricades, safe crossings and lighting" },
        additionalControls: { tr: "Yoğun alanlarda sağlam fiziksel koruma kullan", en: "Use robust physical protection in high-traffic areas" },
      },
    ],
  },

  {
    id: "electrical-maintenance",
    category: { tr: "Elektrik", en: "Electrical" },
    activity: { tr: "Elektrik Bakımı", en: "Electrical Maintenance" },
    items: [
      {
        hazard: { tr: "Elektrik çarpması", en: "Electric shock" },
        consequence: { tr: "Yanık, ciddi yaralanma veya ölüm", en: "Burns, serious injury or fatality" },
        personsAtRisk: { tr: "Elektrik bakım personeli", en: "Electrical maintenance personnel" },
        existingControls: { tr: "Yetkili personel, izolasyon, test ve güvenli çalışma prosedürü", en: "Authorized personnel, isolation, testing and safe-work procedure" },
        additionalControls: { tr: "Enerjisiz çalışmayı önceliklendir ve sıfır enerjiyi doğrula", en: "Prioritize de-energized work and verify zero energy" },
      },
      {
        hazard: { tr: "Arc flash / arc blast", en: "Arc flash / arc blast" },
        consequence: { tr: "Ciddi yanık ve basınç etkisi", en: "Severe burns and blast effects" },
        personsAtRisk: { tr: "Elektrik personeli", en: "Electrical personnel" },
        existingControls: { tr: "Enerji değerlendirmesi, sınırlar ve uygun koruyucu ekipman", en: "Energy assessment, boundaries and suitable protective equipment" },
        additionalControls: { tr: "Canlı çalışma gerekiyorsa özel yetkilendirme uygula", en: "Use specific authorization where energized work is necessary" },
      },
      {
        hazard: { tr: "Hasarlı elektrik ekipmanı", en: "Damaged electrical equipment" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Ekipman kullanıcıları", en: "Equipment users" },
        existingControls: { tr: "Kullanım öncesi kontrol ve kusurlu ekipmanı hizmet dışı bırakma", en: "Pre-use inspection and removal of defective equipment from service" },
        additionalControls: { tr: "Geçici onarım kullanımını engelle", en: "Prevent use of temporary repairs" },
      },
    ],
  },

  {
    id: "loto",
    category: { tr: "Enerji İzolasyonu", en: "Energy Isolation" },
    activity: { tr: "LOTO / Enerji İzolasyonu", en: "LOTO / Energy Isolation" },
    items: [
      {
        hazard: { tr: "Beklenmeyen enerjilenme", en: "Unexpected energization" },
        consequence: { tr: "Ezilme, elektrik çarpması veya ölüm", en: "Crushing, electric shock or fatality" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Kilitleme, etiketleme ve doğrulanmış izolasyon", en: "Lockout, tagout and verified isolation" },
        additionalControls: { tr: "İşe başlamadan önce sıfır enerji kontrolü yap", en: "Verify zero-energy state before work" },
      },
      {
        hazard: { tr: "Depolanmış enerji", en: "Stored energy" },
        consequence: { tr: "Ani hareket veya basınç boşalması", en: "Unexpected movement or pressure release" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Basınç boşaltma, bloklama ve enerji salımı", en: "Pressure relief, blocking and energy dissipation" },
        additionalControls: { tr: "Tüm enerji kaynaklarını izolasyon listesinde doğrula", en: "Verify all energy sources on the isolation list" },
      },
      {
        hazard: { tr: "Yanlış izolasyon noktası", en: "Incorrect isolation point" },
        consequence: { tr: "Canlı enerji veya proses maruziyeti", en: "Exposure to live energy or process" },
        personsAtRisk: { tr: "Bakım ve operasyon personeli", en: "Maintenance and operations personnel" },
        existingControls: { tr: "Ekipman kimliği, çizim ve saha doğrulaması", en: "Equipment identification, drawings and field verification" },
        additionalControls: { tr: "Kritik izolasyonda bağımsız ikinci kontrol uygula", en: "Use independent second verification for critical isolations" },
      },
    ],
  },

  {
    id: "forklift-operation",
    category: { tr: "Mobil Ekipman", en: "Mobile Equipment" },
    activity: { tr: "Forklift Operasyonu", en: "Forklift Operation" },
    items: [
      {
        hazard: { tr: "Yaya ile çarpışma", en: "Collision with pedestrian" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Yayalar ve saha çalışanları", en: "Pedestrians and site workers" },
        existingControls: { tr: "Araç-yaya ayrımı, yetkili operatör ve belirlenmiş trafik yolu", en: "Vehicle-pedestrian separation, authorized operator and designated traffic route" },
        additionalControls: { tr: "Kör noktalarda spotter veya fiziksel ayrım uygula", en: "Use spotters or physical separation in blind areas" },
      },
      {
        hazard: { tr: "Forklift devrilmesi", en: "Forklift overturn" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Uygun hız, kapasite kontrolü, emniyet kemeri ve güvenli zemin", en: "Suitable speed, capacity control, seat belt and safe ground" },
        additionalControls: { tr: "Eğim ve dönüş alanlarını önceden değerlendir", en: "Assess slopes and turning areas beforehand" },
      },
      {
        hazard: { tr: "Yük düşmesi", en: "Falling load" },
        consequence: { tr: "Ezilme veya malzeme hasarı", en: "Crushing or material damage" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Dengeli yük, kapasite kontrolü ve güvenli taşıma yüksekliği", en: "Stable load, capacity verification and safe travel height" },
        additionalControls: { tr: "Dengesiz yükü taşımaya başlama", en: "Do not move unstable loads" },
      },
    ],
  },

  {
    id: "mobile-crane",
    category: { tr: "Kaldırma", en: "Lifting" },
    activity: { tr: "Mobil Vinç Operasyonu", en: "Mobile Crane Operation" },
    items: [
      {
        hazard: { tr: "Vinç devrilmesi", en: "Crane overturn" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Operatör ve kaldırma ekibi", en: "Operator and lifting team" },
        existingControls: { tr: "Zemin değerlendirmesi, outrigger kurulumu ve kapasite sınırları", en: "Ground assessment, outrigger setup and capacity limits" },
        additionalControls: { tr: "Kurulum koşulları değişirse operasyonu yeniden doğrula", en: "Revalidate operation if setup conditions change" },
      },
      {
        hazard: { tr: "Askıdaki yük düşmesi", en: "Suspended load drop" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Kaldırma ekibi", en: "Lifting team" },
        existingControls: { tr: "Kaldırma planı, uygun rigging ve dışlama alanı", en: "Lift plan, suitable rigging and exclusion zone" },
        additionalControls: { tr: "Yük altında personel bulunmasını engelle", en: "Prevent personnel from being under suspended loads" },
      },
      {
        hazard: { tr: "Enerji hattına yaklaşma", en: "Approach to overhead power lines" },
        consequence: { tr: "Elektrik çarpması veya ölüm", en: "Electric shock or fatality" },
        personsAtRisk: { tr: "Operatör ve kaldırma ekibi", en: "Operator and lifting team" },
        existingControls: { tr: "Hat tespiti, mesafe kontrolü ve işaretçi", en: "Power-line identification, clearance control and signal person" },
        additionalControls: { tr: "Güvenli yaklaşma mesafesini saha planında doğrula", en: "Verify safe clearance in the site lift plan" },
      },
    ],
  },

  {
    id: "lifting-operations",
    category: { tr: "Kaldırma", en: "Lifting" },
    activity: { tr: "Kaldırma Operasyonları", en: "Lifting Operations" },
    items: [
      {
        hazard: { tr: "Rigging ekipmanı arızası", en: "Rigging equipment failure" },
        consequence: { tr: "Yük düşmesi ve ciddi yaralanma", en: "Dropped load and serious injury" },
        personsAtRisk: { tr: "Rigging ekibi", en: "Rigging crew" },
        existingControls: { tr: "Sapan, mapa, kanca kontrolü ve WLL doğrulaması", en: "Inspection of slings, shackles and hooks with WLL verification" },
        additionalControls: { tr: "Kimliği veya kapasitesi okunmayan ekipmanı kullanma", en: "Do not use equipment with unreadable identification or capacity" },
      },
      {
        hazard: { tr: "Kontrolsüz yük salınımı", en: "Uncontrolled load swing" },
        consequence: { tr: "Çarpma veya sıkışma", en: "Impact or crushing" },
        personsAtRisk: { tr: "Rigging ekibi ve yakın çalışanlar", en: "Rigging crew and nearby workers" },
        existingControls: { tr: "Kontrollü kaldırma yolu ve gerektiğinde tag line", en: "Controlled lift path and tag line where required" },
        additionalControls: { tr: "Rüzgar koşullarını operasyon boyunca izle", en: "Monitor wind conditions throughout the operation" },
      },
      {
        hazard: { tr: "Kapasite aşımı", en: "Overloading" },
        consequence: { tr: "Ekipman arızası veya yük düşmesi", en: "Equipment failure or dropped load" },
        personsAtRisk: { tr: "Kaldırma ekibi", en: "Lifting team" },
        existingControls: { tr: "Yük ağırlığı ve tüm kaldırma bileşenlerinin kapasite doğrulaması", en: "Verification of load weight and all lifting-component capacities" },
        additionalControls: { tr: "Şüpheli ağırlıkları kaldırma öncesi doğrula", en: "Verify uncertain load weights before lifting" },
      },
    ],
  },

  {
    id: "banksman",
    category: { tr: "Kaldırma / Trafik", en: "Lifting / Traffic" },
    activity: { tr: "İşaretçi / Banksman Operasyonu", en: "Banksman / Signal Person Operation" },
    items: [
      {
        hazard: { tr: "Yanlış veya belirsiz sinyal", en: "Incorrect or unclear signal" },
        consequence: { tr: "Kontrolsüz araç veya yük hareketi", en: "Uncontrolled vehicle or load movement" },
        personsAtRisk: { tr: "Operatör, işaretçi ve çevredeki çalışanlar", en: "Operator, signal person and nearby workers" },
        existingControls: { tr: "Yetkin işaretçi ve standart sinyal yöntemi", en: "Qualified signal person and standard signalling method" },
        additionalControls: { tr: "Sinyal belirsizse hareketi durdur", en: "Stop movement if signals are unclear" },
      },
      {
        hazard: { tr: "İşaretçinin kör noktada kalması", en: "Signal person entering a blind spot" },
        consequence: { tr: "Çarpılma veya ezilme", en: "Struck-by or crushing injury" },
        personsAtRisk: { tr: "İşaretçi", en: "Signal person" },
        existingControls: { tr: "Görüş hattı ve güvenli pozisyon", en: "Line of sight and safe positioning" },
        additionalControls: { tr: "Görüş kaybolursa operasyonu durdur", en: "Stop operation if visual contact is lost" },
      },
      {
        hazard: { tr: "Dönüş alanında bulunma", en: "Presence in swing radius" },
        consequence: { tr: "Sıkışma veya ezilme", en: "Crushing or pinch injury" },
        personsAtRisk: { tr: "İşaretçi ve diğer çalışanlar", en: "Signal person and other workers" },
        existingControls: { tr: "Dönüş alanı kontrolü ve bariyerleme", en: "Swing-radius control and barricading" },
        additionalControls: { tr: "İşaretçi pozisyonunu hareket öncesi doğrula", en: "Verify signal-person position before movement" },
      },
    ],
  },

  {
    id: "grinding",
    category: { tr: "El Aletleri", en: "Power Tools" },
    activity: { tr: "Taşlama", en: "Grinding" },
    items: [
      {
        hazard: { tr: "Disk kırılması", en: "Disc failure" },
        consequence: { tr: "Kesilme veya ciddi yaralanma", en: "Laceration or serious injury" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Uygun disk, koruyucu muhafaza ve kullanım öncesi kontrol", en: "Correct disc, guard and pre-use inspection" },
        additionalControls: { tr: "Hasarlı veya uyumsuz diski kullanma", en: "Do not use damaged or incompatible discs" },
      },
      {
        hazard: { tr: "Kıvılcım ve sıcak parçacık", en: "Sparks and hot particles" },
        consequence: { tr: "Göz yaralanması, yanık veya yangın", en: "Eye injury, burns or fire" },
        personsAtRisk: { tr: "Operatör ve çevredeki çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Göz/yüz koruması ve çalışma alanı kontrolü", en: "Eye/face protection and work-area control" },
        additionalControls: { tr: "Yanıcı malzemeleri kıvılcım alanından uzaklaştır", en: "Remove combustibles from the spark travel area" },
      },
      {
        hazard: { tr: "Gürültü ve titreşim", en: "Noise and vibration" },
        consequence: { tr: "İşitme etkisi veya el-kol rahatsızlığı", en: "Hearing effects or hand-arm disorders" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Uygun ekipman, maruziyet kontrolü ve işitme koruması", en: "Suitable equipment, exposure control and hearing protection" },
        additionalControls: { tr: "Uzun süreli maruziyeti sınırla", en: "Limit prolonged exposure" },
      },
    ],
  },

  {
    id: "welding",
    category: { tr: "Sıcak Çalışma", en: "Hot Work" },
    activity: { tr: "Kaynak", en: "Welding" },
    items: [
      {
        hazard: { tr: "Ark radyasyonu", en: "Arc radiation" },
        consequence: { tr: "Göz ve cilt hasarı", en: "Eye and skin injury" },
        personsAtRisk: { tr: "Kaynakçı ve yakın çalışanlar", en: "Welder and nearby workers" },
        existingControls: { tr: "Uygun kaynak maskesi ve ekranlama", en: "Suitable welding helmet and screening" },
        additionalControls: { tr: "Yakın çalışma alanlarını ışın maruziyetinden koru", en: "Protect adjacent work areas from arc exposure" },
      },
      {
        hazard: { tr: "Kaynak dumanı", en: "Welding fumes" },
        consequence: { tr: "Solunum yolu rahatsızlığı", en: "Respiratory illness" },
        personsAtRisk: { tr: "Kaynakçı", en: "Welder" },
        existingControls: { tr: "Havalandırma ve maruziyet kontrolü", en: "Ventilation and exposure controls" },
        additionalControls: { tr: "Gerekirse lokal emiş sistemi kullan", en: "Use local exhaust ventilation where required" },
      },
      {
        hazard: { tr: "Yangın", en: "Fire" },
        consequence: { tr: "Yanık veya ekipman hasarı", en: "Burns or equipment damage" },
        personsAtRisk: { tr: "Çalışma alanındaki personel", en: "Personnel in work area" },
        existingControls: { tr: "Sıcak çalışma izni ve fire watch", en: "Hot-work permit and fire watch" },
        additionalControls: { tr: "İş sonrası yangın gözetimini saha kuralına göre sürdür", en: "Continue post-work fire watch according to site requirements" },
      },
    ],
  },

  {
    id: "manual-handling",
    category: { tr: "Ergonomi", en: "Ergonomics" },
    activity: { tr: "Elle Taşıma", en: "Manual Handling" },
    items: [
      {
        hazard: { tr: "Ağır veya uygunsuz yük", en: "Heavy or awkward load" },
        consequence: { tr: "Bel ve kas-iskelet yaralanması", en: "Back and musculoskeletal injury" },
        personsAtRisk: { tr: "Yükü taşıyan çalışanlar", en: "Workers handling the load" },
        existingControls: { tr: "Yük değerlendirmesi, doğru kaldırma tekniği ve yardım", en: "Load assessment, correct lifting technique and assistance" },
        additionalControls: { tr: "Mekanik yardım veya ekip kaldırmayı önceliklendir", en: "Prioritize mechanical aids or team lifting" },
      },
      {
        hazard: { tr: "Burularak kaldırma", en: "Twisting while lifting" },
        consequence: { tr: "Bel veya kas zorlanması", en: "Back or muscle strain" },
        personsAtRisk: { tr: "Taşıma yapan çalışanlar", en: "Workers performing handling" },
        existingControls: { tr: "Yüke yakın duruş ve ayaklarla yön değiştirme", en: "Close positioning and turning with the feet" },
        additionalControls: { tr: "Çalışma yüksekliğini ergonomik hale getir", en: "Improve working height and ergonomics" },
      },
      {
        hazard: { tr: "Yükün el veya ayağa düşmesi", en: "Load dropped onto hands or feet" },
        consequence: { tr: "Ezilme veya kırık", en: "Crushing or fracture" },
        personsAtRisk: { tr: "Taşıma yapan çalışanlar", en: "Workers handling the load" },
        existingControls: { tr: "Güvenli kavrama ve uygun taşıma yöntemi", en: "Secure grip and suitable handling method" },
        additionalControls: { tr: "Dengesiz yüklerde taşıma yardım ekipmanı kullan", en: "Use handling aids for unstable loads" },
      },
    ],
  },

  {
    id: "chemical-handling",
    category: { tr: "Kimyasal", en: "Chemical" },
    activity: { tr: "Kimyasal Elleçleme", en: "Chemical Handling" },
    items: [
      {
        hazard: { tr: "Cilt veya göz teması", en: "Skin or eye contact" },
        consequence: { tr: "Tahriş, kimyasal yanık veya göz hasarı", en: "Irritation, chemical burns or eye injury" },
        personsAtRisk: { tr: "Kimyasal kullanan çalışanlar", en: "Workers handling chemicals" },
        existingControls: { tr: "SDS, uygun kap, etiketleme ve uygun KKD", en: "SDS, suitable containers, labeling and appropriate PPE" },
        additionalControls: { tr: "Göz duşu ve acil yıkama imkanını doğrula", en: "Verify eyewash and emergency washing facilities" },
      },
      {
        hazard: { tr: "Kimyasal buhar solunması", en: "Inhalation of chemical vapour" },
        consequence: { tr: "Solunum etkisi veya zehirlenme", en: "Respiratory effects or poisoning" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Havalandırma ve maruziyet kontrolü", en: "Ventilation and exposure control" },
        additionalControls: { tr: "Gerekirse uygun solunum koruması ve ölçüm uygula", en: "Use suitable respiratory protection and monitoring where required" },
      },
      {
        hazard: { tr: "Kimyasal dökülme", en: "Chemical spill" },
        consequence: { tr: "Maruziyet, çevresel zarar veya kayma", en: "Exposure, environmental harm or slip hazard" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site workers" },
        existingControls: { tr: "Spill kit, ikincil muhafaza ve acil durum prosedürü", en: "Spill kit, secondary containment and emergency procedure" },
        additionalControls: { tr: "Dökülme müdahale ekipmanını çalışma noktasında doğrula", en: "Verify spill-response equipment at the work location" },
      },
    ],
  },

  {
    id: "pressure-testing",
    category: { tr: "Basınçlı Sistem", en: "Pressure Systems" },
    activity: { tr: "Basınç Testi", en: "Pressure Testing" },
    items: [
      {
        hazard: { tr: "Basınçlı ekipman veya bağlantı arızası", en: "Failure of pressurized equipment or connection" },
        consequence: { tr: "Fırlayan parça, ciddi yaralanma veya ölüm", en: "Projectile, serious injury or fatality" },
        personsAtRisk: { tr: "Test ekibi ve yakın çalışanlar", en: "Test team and nearby workers" },
        existingControls: { tr: "Test prosedürü, uygun ekipman ve dışlama alanı", en: "Test procedure, suitable equipment and exclusion zone" },
        additionalControls: { tr: "Test öncesi bağlantı ve körlemeleri bağımsız kontrol et", en: "Independently verify connections and blinds before testing" },
      },
      {
        hazard: { tr: "Kontrolsüz basınç boşalması", en: "Uncontrolled pressure release" },
        consequence: { tr: "Çarpma veya enjeksiyon yaralanması", en: "Impact or injection injury" },
        personsAtRisk: { tr: "Test personeli", en: "Test personnel" },
        existingControls: { tr: "Kontrollü basınçlandırma ve güvenli boşaltma yöntemi", en: "Controlled pressurization and safe depressurization method" },
        additionalControls: { tr: "Basınç sıfırlanmadan bağlantı açma", en: "Do not open connections until pressure is confirmed at zero" },
      },
      {
        hazard: { tr: "Dışlama alanına izinsiz giriş", en: "Unauthorized entry into exclusion zone" },
        consequence: { tr: "Yüksek enerjili salıma maruz kalma", en: "Exposure to high-energy release" },
        personsAtRisk: { tr: "Diğer saha çalışanları", en: "Other site personnel" },
        existingControls: { tr: "Bariyer, tabela ve kontrollü erişim", en: "Barricades, signs and controlled access" },
        additionalControls: { tr: "Test boyunca erişim kontrolünü aktif tut", en: "Maintain active access control throughout the test" },
      },
    ],
  },

  {
    id: "housekeeping",
    category: { tr: "Genel", en: "General" },
    activity: { tr: "Housekeeping", en: "Housekeeping" },
    items: [
      {
        hazard: { tr: "Yürüyüş yolunda malzeme", en: "Materials obstructing walkways" },
        consequence: { tr: "Takılma ve düşme", en: "Trip and fall" },
        personsAtRisk: { tr: "Tüm saha personeli", en: "All site personnel" },
        existingControls: { tr: "Belirlenmiş depolama alanları ve düzenli temizlik", en: "Designated storage areas and routine housekeeping" },
        additionalControls: { tr: "Kaçış ve yürüyüş yollarını sürekli açık tut", en: "Keep escape and pedestrian routes continuously clear" },
      },
      {
        hazard: { tr: "Yağ veya sıvı döküntüsü", en: "Oil or liquid spill" },
        consequence: { tr: "Kayma ve düşme", en: "Slip and fall" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site workers" },
        existingControls: { tr: "Dökülme temizliği ve uyarı sistemi", en: "Spill cleanup and warning controls" },
        additionalControls: { tr: "Tekrarlayan dökülmelerin kaynağını gider", en: "Eliminate sources of recurring spills" },
      },
      {
        hazard: { tr: "Uygunsuz atık birikimi", en: "Improper waste accumulation" },
        consequence: { tr: "Yangın, kesilme veya erişim engeli", en: "Fire, cuts or blocked access" },
        personsAtRisk: { tr: "Tüm saha personeli", en: "All site personnel" },
        existingControls: { tr: "Ayrılmış atık kutuları ve düzenli toplama", en: "Segregated waste containers and routine collection" },
        additionalControls: { tr: "Atık toplama sıklığını iş yoğunluğuna göre artır", en: "Increase collection frequency according to work intensity" },
      },
    ],
  },

  {
    id: "office-work",
    category: { tr: "Ofis", en: "Office" },
    activity: { tr: "Ofis Çalışması", en: "Office Work" },
    items: [
      {
        hazard: { tr: "Uygunsuz ergonomi", en: "Poor ergonomics" },
        consequence: { tr: "Boyun, sırt veya üst ekstremite rahatsızlığı", en: "Neck, back or upper-limb discomfort" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Ayarlanabilir sandalye ve uygun ekran yerleşimi", en: "Adjustable seating and suitable screen positioning" },
        additionalControls: { tr: "Çalışma istasyonunu kullanıcıya göre ayarla", en: "Adjust workstation to the individual user" },
      },
      {
        hazard: { tr: "Kablo veya eşya nedeniyle takılma", en: "Trips from cables or objects" },
        consequence: { tr: "Düşme ve yaralanma", en: "Fall and injury" },
        personsAtRisk: { tr: "Çalışanlar ve ziyaretçiler", en: "Workers and visitors" },
        existingControls: { tr: "Kablo yönetimi ve temiz yürüyüş yolları", en: "Cable management and clear walkways" },
        additionalControls: { tr: "Geçici kablo geçişlerini ortadan kaldır", en: "Eliminate temporary cable crossings" },
      },
      {
        hazard: { tr: "Elektrikli ofis ekipmanı", en: "Electrical office equipment" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Uygun ekipman ve hasar kontrolü", en: "Suitable equipment and damage checks" },
        additionalControls: { tr: "Hasarlı kablo veya prizleri kullanım dışı bırak", en: "Remove damaged cables or outlets from use" },
      },
    ],
  },

  {
    id: "traffic-management",
    category: { tr: "Trafik", en: "Traffic" },
    activity: { tr: "Saha Trafik Yönetimi", en: "Site Traffic Management" },
    items: [
      {
        hazard: { tr: "Araç-yaya çarpışması", en: "Vehicle-pedestrian collision" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Yayalar ve sürücüler", en: "Pedestrians and drivers" },
        existingControls: { tr: "Ayrılmış yollar, bariyer, hız limiti ve tabela", en: "Segregated routes, barriers, speed limits and signage" },
        additionalControls: { tr: "Kritik kesişimlerde fiziksel ayrım veya spotter kullan", en: "Use physical segregation or spotters at critical crossings" },
      },
      {
        hazard: { tr: "Geri manevra", en: "Reversing vehicle" },
        consequence: { tr: "Ezilme veya çarpışma", en: "Crushing or collision" },
        personsAtRisk: { tr: "Yayalar ve diğer sürücüler", en: "Pedestrians and other drivers" },
        existingControls: { tr: "Geri vites alarmı, kamera ve gerektiğinde spotter", en: "Reversing alarm, camera and spotter where required" },
        additionalControls: { tr: "Geri manevrayı mümkün olduğunca azaltacak trafik düzeni kur", en: "Design traffic flow to minimize reversing where practicable" },
      },
      {
        hazard: { tr: "Kör kavşak veya görüş engeli", en: "Blind intersection or restricted visibility" },
        consequence: { tr: "Araç çarpışması", en: "Vehicle collision" },
        personsAtRisk: { tr: "Sürücüler ve yayalar", en: "Drivers and pedestrians" },
        existingControls: { tr: "Ayna, tabela, hız kontrolü ve korna kullanımı", en: "Mirrors, signage, speed control and horn use" },
        additionalControls: { tr: "Görüş engellerini kaldır veya kavşağı yeniden düzenle", en: "Remove visibility obstructions or redesign the intersection" },
      },
    ],
  },

  {
    id: "roof-work",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Çatı Çalışması", en: "Roof Work" },
    items: [
      {
        hazard: { tr: "Çatı kenarından düşme", en: "Fall from roof edge" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kenar koruması, güvenli erişim ve uygun düşüş koruması", en: "Edge protection, safe access and suitable fall protection" },
        additionalControls: { tr: "Çalışma alanını başlamadan önce kenar ve açıklıklar açısından kontrol et", en: "Inspect edges and openings before work begins" },
      },
      {
        hazard: { tr: "Kırılgan çatı yüzeyi", en: "Fragile roof surface" },
        consequence: { tr: "Çatıdan geçerek düşme", en: "Fall through roof surface" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kırılgan alan tespiti ve güvenli yürüyüş platformu", en: "Identification of fragile areas and safe working platforms" },
        additionalControls: { tr: "Kırılgan bölgeleri fiziksel olarak işaretle ve erişimi kısıtla", en: "Physically mark fragile areas and restrict access" },
      },
      {
        hazard: { tr: "Rüzgar ve hava koşulları", en: "Wind and adverse weather" },
        consequence: { tr: "Denge kaybı veya malzeme düşmesi", en: "Loss of balance or dropped materials" },
        personsAtRisk: { tr: "Çatı ve alt seviyedeki çalışanlar", en: "Roof workers and personnel below" },
        existingControls: { tr: "Hava takibi ve güvenli çalışma limitleri", en: "Weather monitoring and safe work limits" },
        additionalControls: { tr: "Güvensiz hava koşullarında çalışmayı durdur", en: "Stop work during unsafe weather conditions" },
      },
    ],
  },

  {
    id: "meWP",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "MEWP / Personel Yükseltici Platform", en: "MEWP Operation" },
    items: [
      {
        hazard: { tr: "Platformdan düşme", en: "Fall from platform" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Platform operatörü ve kullanıcılar", en: "Platform operator and occupants" },
        existingControls: { tr: "Yetkili operatör, korkuluk sistemi ve üretici talimatları", en: "Authorized operator, guardrails and manufacturer instructions" },
        additionalControls: { tr: "Gerekli bağlanma yöntemini ekipman üreticisine göre doğrula", en: "Verify required restraint/fall-protection method according to manufacturer instructions" },
      },
      {
        hazard: { tr: "Platform devrilmesi", en: "MEWP overturn" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Platform kullanıcıları ve yakın çalışanlar", en: "Occupants and nearby workers" },
        existingControls: { tr: "Zemin değerlendirmesi, kapasite limiti ve güvenli kurulum", en: "Ground assessment, capacity limits and safe setup" },
        additionalControls: { tr: "Çukur, kenar ve zayıf zeminleri çalışma öncesi belirle", en: "Identify holes, edges and weak ground before operation" },
      },
      {
        hazard: { tr: "Üstte sıkışma", en: "Overhead entrapment" },
        consequence: { tr: "Ezilme veya ciddi yaralanma", en: "Crushing or serious injury" },
        personsAtRisk: { tr: "Platformdaki çalışanlar", en: "Platform occupants" },
        existingControls: { tr: "Üst engel kontrolü ve kontrollü hareket", en: "Overhead-obstruction checks and controlled movement" },
        additionalControls: { tr: "Dar alanlarda hareket hızını azalt ve spotter kullan", en: "Reduce movement speed and use a spotter in restricted areas" },
      },
    ],
  },
];
