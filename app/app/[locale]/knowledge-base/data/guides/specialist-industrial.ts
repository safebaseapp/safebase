import type { SafetyGuide, LocalizedText } from "../../components/GuideTemplate";
import { specialistRelatedGuide } from "./specialist-related";
import { advancedMethodPresets } from "@/lib/content/advancedMethodPresets";

type Pair = LocalizedText;
type Editorial = {
  slug: string; preset: string; title: Pair; category: Pair; overview: Pair;
  mistakes: {en:string[];tr:string[]}; extraControls:{en:string[];tr:string[]};
  references:string[];related:string[];keywords:{en:string[];tr:string[]};
};
const editorial: Editorial[] = [
  {
    "slug": "pwht-heat-treatment-safety",
    "preset": "post-weld-heat-treatment",
    "title": {
      "en": "Post-Weld Heat Treatment (PWHT): Field Safety and Inspection Checks",
      "tr": "Kaynak Sonrası Isıl İşlem (PWHT): Saha Güvenliği ve Kontroller"
    },
    "category": {
      "en": "Welding & Thermal Process Safety",
      "tr": "Kaynak ve Isıl İşlem Güvenliği"
    },
    "overview": {
      "en": "Post-weld heat treatment exposes crews to electrical heater circuits, insulated hot surfaces and prolonged unattended energy. Before energization, the approved WPS/PWHT package must identify welds, material, instrument locations, equipment ratings and quality hold points. Supervisors should coordinate the exclusion zone with adjacent trades, verify fire protection, and record the complete heating and cooling cycle. This guide is for HSE planning: it does not set heat treatment temperatures, dwell times or cooling rates.",
      "tr": "Kaynak sonrası ısıl işlem; elektrikli ısıtıcı devreleri, yalıtılmış sıcak yüzeyler ve uzun süreli enerji uygulaması nedeniyle özel kontrol gerektirir. Enerji verilmeden önce onaylı WPS/PWHT paketinde kaynak kimliği, malzeme, ölçüm noktaları, ekipman uygunluğu ve kalite kontrol aşamaları tanımlanmalıdır. Süpervizör çevredeki işleri dışlama alanıyla koordine etmeli, yangın önlemlerini doğrulamalı ve ısıtma-soğuma çevriminin tamamını kayıt altına almalıdır. Bu rehber işlem sıcaklığı, bekletme süresi veya soğuma hızı belirlemez."
    },
    "mistakes": {
      "en": [
        "Applying generic heating settings without the approved WPS or engineering instruction.",
        "Allowing other trades to work against insulation or energized heating cables.",
        "Removing barriers immediately after power isolation while the metal remains dangerously hot."
      ],
      "tr": [
        "Onaylı WPS veya mühendislik talimatı olmadan genel ısıtma değerleri kullanmak.",
        "Diğer ekiplerin yalıtıma veya enerjili ısıtıcı kablolarına temas eden iş yapmasına izin vermek.",
        "Enerji kesildi diye metal hâlâ sıcakken bariyeri kaldırmak."
      ]
    },
    "extraControls": {
      "en": [
        "Record responsible electrical isolation owner, calibrated logger ID and the weld identification before energizing.",
        "Define a documented fire-watch and cooling handover so access remains restricted until verified safe."
      ],
      "tr": [
        "Enerji vermeden önce izolasyon sorumlusunu, kalibre kayıt cihazının kimliğini ve kaynak numarasını kaydedin.",
        "Alan ancak güvenli soğuma doğrulanınca açılacak şekilde yangın gözcüsü ve teslim düzenini belgeleyin."
      ]
    },
    "references": [
      "OSHA 1910.252",
      "OSHA 1910.333"
    ],
    "related": [
      "welding-safety",
      "stored-energy-hazards",
      "fire-watch-duties"
    ],
    "keywords": {
      "en": [
        "post weld heat treatment safety",
        "PWHT safety checklist",
        "PWHT fire watch"
      ],
      "tr": [
        "PWHT güvenlik kontrol listesi",
        "kaynak sonrası ısıl işlem tehlikeleri",
        "PWHT elektrik güvenliği"
      ]
    }
  },
  {
    "slug": "industrial-radiography-controlled-area",
    "preset": "industrial-radiography-ndt",
    "title": {
      "en": "Industrial Radiography Safety: Controlled Area, Dosimetry and Source Security",
      "tr": "Endüstriyel Radyografi Güvenliği: Kontrollü Alan ve Dozimetri"
    },
    "category": {
      "en": "Radiation & Specialist Inspection",
      "tr": "Radyasyon ve Özel Muayene"
    },
    "overview": {
      "en": "Industrial radiographic testing introduces ionizing radiation hazards that cannot be controlled by ordinary construction PPE. Only legally authorized radiography personnel may plan exposures, set controlled-area boundaries, use survey instruments and verify that the source has returned to its secured state. A coordinated site exclusion plan must consider floors above and below, walkways, neighbouring units, access control, warning signals and emergency roles. This field guide does not authorize source use or specify exposure times, dose limits or barrier distances.",
      "tr": "Endüstriyel radyografik muayenede sıradan inşaat KKD'siyle kontrol edilemeyen iyonlaştırıcı radyasyon tehlikesi vardır. Işınlama planını oluşturma, kontrollü alan sınırlarını belirleme, ölçüm cihazı kullanma ve kaynağın güvenli duruma dönüşünü doğrulama işleri yalnızca yasal olarak yetkili radyografi personeline aittir. Saha planında alt-üst katlar, yaya güzergâhları, komşu tesisler, giriş kontrolü, ikazlar ve acil müdahale görevleri birlikte değerlendirilmelidir. Bu rehber ışınlama süresi, doz limiti veya bariyer mesafesi belirlemez."
    },
    "mistakes": {
      "en": [
        "Assuming a single floor-level tape line is an adequate radiation exclusion zone.",
        "Using routine gas monitors instead of approved radiation survey and dosimetry instruments.",
        "Reopening the area before the authorized operator confirms secured source and acceptable surveys."
      ],
      "tr": [
        "Tek kat seviyesinde çekilen uyarı bandını radyasyon dışlama alanı için yeterli görmek.",
        "Onaylı radyasyon ölçüm ve dozimetri cihazları yerine sıradan gaz ölçüm cihazı kullanmak.",
        "Yetkili operatör kaynağın güvenli konumunu ve ölçüm sonucunu doğrulamadan alanı açmak."
      ]
    },
    "extraControls": {
      "en": [
        "Document the legally responsible radiation protection officer and the emergency contact chain.",
        "Include neighbouring units and elevated platforms in controlled-area access sweeps before exposure."
      ],
      "tr": [
        "Yasal sorumluluğu bulunan radyasyon koruma görevlisini ve acil iletişim zincirini kaydedin.",
        "Işınlama öncesi kontrollü alan taramasına komşu tesisleri ve yüksek platformları dahil edin."
      ]
    },
    "references": [
      "OSHA 1910.1096",
      "HSE Ionising Radiation Guidance"
    ],
    "related": [
      "safety-observation-programs",
      "simops-safety",
      "emergency-response-planning"
    ],
    "keywords": {
      "en": [
        "industrial radiography exclusion zone",
        "radiography safety permit",
        "radiation source security"
      ],
      "tr": [
        "radyografi dışlama alanı",
        "endüstriyel RT güvenliği",
        "radyasyon gözcüsü"
      ]
    }
  },
  {
    "slug": "nitrogen-purging-oxygen-deficiency",
    "preset": "nitrogen-purging-inerting",
    "title": {
      "en": "Nitrogen Purging: Oxygen Deficiency, Inerting and Safe Access",
      "tr": "Azotla Purge ve İnertleme: Oksijen Eksikliği ve Güvenli Erişim"
    },
    "category": {
      "en": "Process Gas & Atmospheric Hazards",
      "tr": "Proses Gazı ve Atmosferik Tehlikeler"
    },
    "overview": {
      "en": "Nitrogen purging can displace breathable oxygen without detectable odour. Release locations and confined, recessed or low-ventilation areas require competent engineering evaluation and appropriate oxygen monitoring. Operations must verify circuit boundaries, pressure protection, vent routing, exclusion zones and emergency response before introducing nitrogen. A rescue plan must prohibit unprotected entry. This guide is a hazard-control reference and does not provide purge flow rates, acceptable oxygen endpoints or vessel-entry authorization.",
      "tr": "Azotla purge uygulaması, kokusuz biçimde solunabilir oksijeni uzaklaştırabilir. Deşarj noktaları ile kapalı, çukur veya yetersiz havalandırılan alanlar yetkin mühendislik değerlendirmesi ve uygun oksijen izleme planı gerektirir. İşletme, azot beslemesi başlamadan önce devre sınırını, basınç korumasını, deşarj güzergâhını, dışlama alanını ve acil müdahaleyi doğrulamalıdır. Kurtarma planı korumasız girişimi yasaklamalıdır. Bu rehber purge debisi, oksijen bitiş kriteri veya kapalı alan giriş izni vermez."
    },
    "mistakes": {
      "en": [
        "Assuming nitrogen release outdoors is harmless near pits, trenches or low-ventilation pockets.",
        "Relying on smell or a flammable-gas alarm to detect oxygen depletion.",
        "Attempting a rescue without supplied-air training and a dedicated rescue plan."
      ],
      "tr": [
        "Açık havadaki azot tahliyesinin çukur, kanal ve durgun bölgelerde güvenli olduğunu varsaymak.",
        "Oksijen düşüşünü tespit etmek için kokuya veya yalnız yanıcı gaz alarmına güvenmek.",
        "Eğitimli kurtarma ekibi ve uygun solunum koruması olmadan kurtarma girişiminde bulunmak."
      ]
    },
    "extraControls": {
      "en": [
        "Identify all probable gas discharge and leak points on an annotated site map before purging.",
        "Assign oxygen-monitor placement and responder responsibilities to authorized operations personnel."
      ],
      "tr": [
        "Purge başlamadan olası deşarj ve kaçak noktalarını işaretli saha planında belirleyin.",
        "Oksijen izleme yerlerini ve müdahale sorumlularını yetkili işletme personeliyle atayın."
      ]
    },
    "references": [
      "OSHA 1910.146",
      "OSHA 1910.119"
    ],
    "related": [
      "oxygen-deficiency-hazards",
      "confined-space-gas-testing",
      "confined-space-rescue"
    ],
    "keywords": {
      "en": [
        "nitrogen purging safety checklist",
        "oxygen deficiency nitrogen",
        "inerting asphyxiation risk"
      ],
      "tr": [
        "azotla purge tehlikeleri",
        "azot oksijen eksikliği",
        "inertleme İSG kontrol listesi"
      ]
    }
  },
  {
    "slug": "structural-steel-temporary-stability",
    "preset": "structural-steel-erection",
    "title": {
      "en": "Structural Steel Erection: Temporary Stability and Connection Hold Points",
      "tr": "Çelik Konstrüksiyon Montajı: Geçici Stabilite ve Bağlantı Kontrolleri"
    },
    "category": {
      "en": "Steel Erection & Work at Height",
      "tr": "Çelik Montaj ve Yüksekte Çalışma"
    },
    "overview": {
      "en": "Steel erection requires an engineered sequence because a partially connected member can fail before its permanent load path exists. The erection team must verify temporary bracing, ground support, lifting and rigging arrangements, fall prevention, and the interface between site work and lower-level pedestrian access. Release of lifting equipment and removal of temporary works require explicit technical authorization. This guide cannot determine structural capacity, connection design or load limits.",
      "tr": "Çelik konstrüksiyon montajı, kalıcı yük yolu henüz oluşmadan kısmen bağlanmış elemanların devrilebilmesi nedeniyle mühendislikçe hazırlanmış bir sıra gerektirir. Montaj ekibi geçici çaprazları, zemin taşıma durumunu, kaldırma/sapan düzenini, düşme korumasını ve alt seviyedeki yaya erişimini doğrulamalıdır. Yük kaldırma ekipmanının serbest bırakılması veya geçici desteklerin sökülmesi açık teknik onay gerektirir. Bu rehber taşıyıcı kapasite, bağlantı tasarımı veya yük limiti hesaplamaz."
    },
    "mistakes": {
      "en": [
        "Releasing a suspended member before approved temporary or permanent restraint is in place.",
        "Removing braces based on visual appearance rather than engineered authorization.",
        "Using open steel framing as an unapproved working platform or fall-arrest anchor."
      ],
      "tr": [
        "Onaylı geçici/kalıcı sabitleme tamamlanmadan askıdaki çelik elemanı serbest bırakmak.",
        "Geçici destekleri mühendislik onayı yerine görsel kanaatle sökmek.",
        "Açık çelik karkası onaysız çalışma platformu veya düşüş durdurma ankrajı gibi kullanmak."
      ]
    },
    "extraControls": {
      "en": [
        "Set connection inspection and bracing-release hold points on the lift/erection plan.",
        "Exclude the entire drop zone, including levels below and adjacent access routes, until assembly acceptance."
      ],
      "tr": [
        "Kaldırma/montaj planında bağlantı muayenesi ve geçici destek kaldırma hold point'lerini tanımlayın.",
        "Montaj kabulüne kadar alt katlar ve komşu erişimler dahil düşme bölgesini kullanıma kapatın."
      ]
    },
    "references": [
      "OSHA 1926.750",
      "OSHA 1926.754"
    ],
    "related": [
      "rigging-safety",
      "edge-protection-guardrails",
      "dropped-object-prevention"
    ],
    "keywords": {
      "en": [
        "steel erection temporary bracing",
        "structural steel lift plan",
        "steel connection hold point"
      ],
      "tr": [
        "çelik konstrüksiyon geçici destek",
        "çelik montaj kaldırma planı",
        "çelik bağlantı kontrolü"
      ]
    }
  },
  {
    "slug": "industrial-cable-pulling-safety",
    "preset": "cable-pulling-and-termination",
    "title": {
      "en": "Industrial Cable Pulling and Termination: Electrical Isolation and Handling",
      "tr": "Endüstriyel Kablo Çekimi ve Sonlandırma: İzolasyon ve Elleçleme"
    },
    "category": {
      "en": "Industrial Electrical Installation",
      "tr": "Endüstriyel Elektrik Montajı"
    },
    "overview": {
      "en": "Cable installation combines heavy reel and mechanical pulling hazards with exposure to adjacent energized electrical circuits. Before pulling, verify approved route drawings, reel support, pulling tools, roller positions, cable bend and pull limits, and communication between end stations. Electrical termination must follow authorized isolation, qualified-person testing and equipment specifications. This guide sets no cable tension, bend radius or electrical test voltage.",
      "tr": "Endüstriyel kablo montajı, ağır makara ve mekanik çekim risklerini yakın enerjili elektrik devrelerine maruziyetle birleştirir. Çekime başlamadan onaylı güzergâh çizimleri, makara desteği, çekme ekipmanı, makara/kılavuz konumu, kablo bükülme/çekim limitleri ve iki uç arasındaki haberleşme doğrulanmalıdır. Kablo sonlandırma ise yetkili enerji izolasyonu, kalifiye personel testleri ve üretici şartlarına uymalıdır. Bu rehber çekme kuvveti, bükülme yarıçapı veya test gerilimi belirlemez."
    },
    "mistakes": {
      "en": [
        "Allowing personnel inside the line of pull or directly alongside tensioned cable.",
        "Using an unstable reel stand or improvised handling for large cable drums.",
        "Starting termination based on a breaker label without an approved isolation and dead-test procedure."
      ],
      "tr": [
        "Personelin kablonun çekme hattı üzerinde veya gerilmiş kabloya bitişik çalışmasına izin vermek.",
        "Büyük kablo makaralarında dengesiz sehpa veya doğaçlama taşıma yöntemi kullanmak.",
        "Onaylı izolasyon ve enerjisizlik testi olmadan yalnız şalter etiketine güvenerek sonlandırmaya başlamak."
      ]
    },
    "extraControls": {
      "en": [
        "Define cable drum loading and personnel exclusion before the pull begins.",
        "Make the qualified electrician sign off the circuit identity and isolation boundary before any termination."
      ],
      "tr": [
        "Çekim başlamadan makara yükleme şeklini ve personel dışlama alanını tanımlayın.",
        "Her sonlandırmadan önce devre kimliği ve izolasyon sınırının yetkili elektrikçi tarafından doğrulandığını kaydedin."
      ]
    },
    "references": [
      "OSHA 1910.333",
      "OSHA 1910.147"
    ],
    "related": [
      "temporary-electrical-installations",
      "electrical-isolation-verification",
      "manual-handling"
    ],
    "keywords": {
      "en": [
        "cable pulling safety method",
        "cable reel handling safety",
        "electrical termination LOTO"
      ],
      "tr": [
        "kablo çekimi İSG önlemleri",
        "kablo makarası güvenliği",
        "kablo sonlandırma LOTO"
      ]
    }
  },
  {
    "slug": "rotating-equipment-alignment-guards",
    "preset": "rotating-equipment-alignment",
    "title": {
      "en": "Rotating Equipment Alignment: Coupling Guard, Isolation and Test Run",
      "tr": "Döner Ekipman Hizalama: Kaplin Muhafazası, İzolasyon ve Test"
    },
    "category": {
      "en": "Mechanical Maintenance & Machinery",
      "tr": "Mekanik Bakım ve Makine Güvenliği"
    },
    "overview": {
      "en": "Pump and motor alignment may expose the crew to unexpected shaft movement, pinch points and mechanical stored energy even when a drive appears stopped. A qualified maintenance team must verify all relevant electrical and process isolations before removing coupling guards. OEM-defined measurement tolerances, safe shaft handling, tool accountability and guard reinstatement are mandatory prior to operational test run. This guidance does not provide alignment tolerances or authorize energized adjustment.",
      "tr": "Pompa ve motor hizalama çalışmaları, tahrik durmuş görünse bile beklenmedik şaft hareketi, sıkışma noktası ve mekanik depolanmış enerji riski oluşturabilir. Yetkili bakım ekibi kaplin muhafazasını sökmeden önce ilgili elektrik ve proses izolasyonlarının tamamını doğrulamalıdır. Üretici tarafından belirlenmiş hizalama toleransları, güvenli şaft hareketi, alet kontrolü ve muhafazaların yeniden takılması operasyonel testten önce tamamlanmalıdır. Bu rehber hizalama toleransı vermez veya enerjili ayara izin oluşturmaz."
    },
    "mistakes": {
      "en": [
        "Relying solely on a stopped motor instead of authorized lockout and zero-energy verification.",
        "Allowing hands near coupling pinch points during manual rotation.",
        "Performing a test run before all guards and foreign-object checks are complete."
      ],
      "tr": [
        "Motor duruyor diye yetkili LOTO ve enerjisizlik doğrulaması yapmamak.",
        "Manuel döndürmede elleri kaplin sıkışma noktalarında tutmak.",
        "Muhafaza ve yabancı cisim kontrolleri tamamlanmadan test çalıştırması yapmak."
      ]
    },
    "extraControls": {
      "en": [
        "Record the exact equipment tag, isolation owners and alignment instrument calibration.",
        "Require a separate test-run handback with personnel cleared from rotating parts."
      ],
      "tr": [
        "Ekipman tag numarasını, izolasyon sorumlularını ve hizalama cihazının kalibrasyonunu kaydedin.",
        "Dönen bölge personelden arındırılarak ayrı bir test çalıştırma teslim onayı alın."
      ]
    },
    "references": [
      "OSHA 1910.147",
      "OSHA 1910.212"
    ],
    "related": [
      "machine-guarding",
      "zero-energy-verification",
      "stored-energy-hazards"
    ],
    "keywords": {
      "en": [
        "pump alignment safety checklist",
        "coupling guard removal LOTO",
        "rotating machinery alignment hazard"
      ],
      "tr": [
        "pompa hizalama güvenliği",
        "kaplin muhafazası LOTO",
        "döner ekipman bakım riski"
      ]
    }
  },
  {
    "slug": "pressure-safety-valve-psv-maintenance",
    "preset": "pressure-relief-valve-removal",
    "title": {
      "en": "Pressure Safety Valve (PSV) Maintenance: Isolation and Overpressure Protection",
      "tr": "Emniyet Ventili (PSV) Bakımı: İzolasyon ve Aşırı Basınç Koruması"
    },
    "category": {
      "en": "Pressure Systems & Mechanical Integrity",
      "tr": "Basınçlı Sistemler ve Mekanik Bütünlük"
    },
    "overview": {
      "en": "Removing a pressure safety valve may temporarily disable a process unit's overpressure protection. The job must start with operations and engineering authorization of the plant's safe state or formally approved alternative safeguard, followed by isolation and zero-pressure verification. Matching valve tag, certification, set point and installation orientation are quality hold points before return to service. This reference never recommends operating a protected system without an adequate relief strategy or setting relief pressures from an example.",
      "tr": "Emniyet ventilinin sökülmesi proses ünitesinin aşırı basınç korumasını geçici olarak devre dışı bırakabilir. Çalışma; işletme ve mühendislik tarafından tesisin güvenli durumunun veya resmen onaylanmış alternatif korumanın belirlenmesiyle başlamalı, ardından izolasyon ve sıfır basınç doğrulanmalıdır. Valf etiketi, sertifika, ayar basıncı ve montaj yönünün eşleştirilmesi devreye alma öncesi kalite hold point'leridir. Bu kaynak uygun koruma olmadan sistemi işletmeyi veya örnekten PSV ayar basıncı belirlemeyi önermez."
    },
    "mistakes": {
      "en": [
        "Treating the removal of a safety valve like an ordinary maintenance isolation without checking plant protection coverage.",
        "Installing a serviced valve based only on size instead of the exact tag and certification.",
        "Repressurizing before relief protection and required inspection records are formally accepted."
      ],
      "tr": [
        "PSV sökümünü, tesisin aşırı basınç korumasını değerlendirmeden sıradan izolasyon işi gibi görmek.",
        "Bakımı yapılan valfi yalnız boyutuna göre takıp tag ve sertifika eşleşmesini kontrol etmemek.",
        "Koruma ve muayene kayıtları kabul edilmeden hattı yeniden basınçlandırmak."
      ]
    },
    "extraControls": {
      "en": [
        "Document who accepts the temporary protection plan and when normal protection must be reinstated.",
        "Hold restart until the certified replacement valve and process relief path have been confirmed."
      ],
      "tr": [
        "Geçici koruma planını kimin onayladığını ve normal korumanın ne zaman döndürüleceğini belgeleyin.",
        "Sertifikalı valf ve tahliye yolunun uygunluğu doğrulanana kadar yeniden devreye almayı bekletin."
      ]
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1910.147"
    ],
    "related": [
      "pressure-testing-safety",
      "stored-energy-hazards",
      "line-breaking-safety"
    ],
    "keywords": {
      "en": [
        "PSV removal method statement",
        "pressure relief valve isolation checklist",
        "PSV reinstatement safety"
      ],
      "tr": [
        "PSV sökme montaj emniyeti",
        "emniyet ventili kontrol listesi",
        "basınç emniyet ventili izolasyonu"
      ]
    }
  },
  {
    "slug": "steam-blowing-commissioning-exclusion",
    "preset": "steam-blowing-commissioning",
    "title": {
      "en": "Steam Blowing Safety: Temporary Piping, Discharge and Exclusion Zones",
      "tr": "Buhar Üfleme Güvenliği: Geçici Hat, Deşarj ve Dışlama Alanı"
    },
    "category": {
      "en": "Commissioning & High-Energy Testing",
      "tr": "Devreye Alma ve Yüksek Enerjili Testler"
    },
    "overview": {
      "en": "Steam blowing combines high-temperature and pressure energy with transient reaction forces, extreme noise, hot condensate and poor visibility around discharge points. Operations and commissioning engineers must approve temporary piping, restraints, discharge direction, exclusion boundaries, instruments, shutdown communication and cooldown before the first steam admission. Watch personnel need clear authority to stop work when conditions change. This reference never supplies a blowing pressure, duration, flow or acceptance criterion.",
      "tr": "Buhar üfleme; yüksek sıcaklık ve basınç enerjisini ani itki kuvveti, şiddetli gürültü, sıcak kondens ve deşarj bölgesinde görüş azalmasıyla birleştirir. İşletme ve devreye alma mühendisleri ilk buhar verilmeden önce geçici borulama, mesnetler, deşarj yönü, dışlama alanı, ölçüm cihazları, durdurma iletişimi ve soğuma sürecini onaylamalıdır. Gözcülerin değişen koşullarda işi durdurma yetkisi açık olmalıdır. Bu rehber üfleme basıncı, süresi, debisi veya kabul kriteri vermez."
    },
    "mistakes": {
      "en": [
        "Assuming temporary steam discharge piping is safe without engineered anchorage and reaction force review.",
        "Positioning observers within the discharge plume or uncontrolled noise zone.",
        "Removing hot-work barriers based on the stop of visible steam rather than verified cooling and depressurization."
      ],
      "tr": [
        "Geçici buhar deşarj hattının mühendislik ankrajı ve itki hesabı olmadan güvenli olduğunu varsaymak.",
        "Gözcüleri deşarj bulutu veya kontrolsüz yüksek gürültü bölgesine yerleştirmek.",
        "Görünür buhar durdu diye soğuma ve basınçsızlık doğrulanmadan bariyerleri kaldırmak."
      ]
    },
    "extraControls": {
      "en": [
        "Use an approved map of discharge plume, noise exposure and traffic diversion areas.",
        "Keep an accountable log of isolation state and sign-off at cooldown, not only at first steam admission."
      ],
      "tr": [
        "Buhar bulutu, gürültü maruziyeti ve alternatif geçiş yollarının gösterildiği onaylı plan kullanın.",
        "Yalnız ilk buhar verilişinde değil, soğuma sonundaki izolasyon ve teslim durumunu da kayıt altına alın."
      ]
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1910.147"
    ],
    "related": [
      "pressure-testing-safety",
      "stored-energy-hazards",
      "simops-safety"
    ],
    "keywords": {
      "en": [
        "steam blowing exclusion zone",
        "steam blowing safety checklist",
        "commissioning steam blow temporary piping"
      ],
      "tr": [
        "buhar üfleme dışlama alanı",
        "steam blowing İSG",
        "buhar üfleme geçici hat güvenliği"
      ]
    }
  }
];

const byPreset = new Map(advancedMethodPresets.map(preset => [preset.slug,preset]));
export const specialistIndustrialGuides: SafetyGuide[] = editorial.map(item => {
  const preset = byPreset.get(item.preset);
  if (!preset) throw new Error(`Unknown SERNEM specialist preset: ${item.preset}`);
  const method = preset.method;
  const pick = (language: "tr"|"en",field:"hazard"|"control") =>
    method.steps.map(step => step[field][language]);
  const localized = (field:"hazard"|"control") => ({
    tr: pick("tr",field), en: pick("en",field),
  });
  const hazards = localized("hazard");
  const controls = localized("control");
  return {
    slug: item.slug,
    category:item.category,
    title:item.title,
    description:{
      en: `${item.title.en}. Practical critical safeguards, pre-start hold points and stop-work triggers for the field.`,
      tr: `${item.title.tr}. Sahadaki kritik kontrol önlemleri, iş öncesi doğrulamalar ve işi durdurma kriterleri.`,
    },
    overview:item.overview,
    readTime:8,
    riskLevel:{en:"High Risk",tr:"Yüksek Risk"},
    standard:"OSHA",
    hazards,
    controls:{
      en:[...controls.en,...item.extraControls.en],
      tr:[...controls.tr,...item.extraControls.tr],
    },
    requiredPPE:{
      en:[preset.ppe.en,"Task-specific PPE must be selected against the risk assessment and must never replace isolation or engineering safeguards."],
      tr:[preset.ppe.tr,"İşe özgü KKD risk değerlendirmesine göre seçilmeli ve enerji izolasyonu veya mühendislik kontrollerinin yerine geçmemelidir."],
    },
    commonMistakes:item.mistakes,
    checklist:{
      title:{en:"Pre-start and handback verification",tr:"İş öncesi ve teslim doğrulaması"},
      en:[...method.checks.map(x=>x.en),"Stop-work criteria and emergency communication were reviewed with affected crews.","The approved work permit, authorized procedure and competency requirements are verified."],
      tr:[...method.checks.map(x=>x.tr),"İşi durdurma ve acil iletişim koşulları ilgili ekiplerle gözden geçirildi.","Onaylı iş izni, yetkili prosedür ve çalışan yetkinliği doğrulandı."],
    },
    emergencySection:{
      title:{en:"Stop-work and emergency response",tr:"İşi durdurma ve acil müdahale"},
      content:{en:`${method.stop.en} Apply the site emergency plan, make the work area safe and restart only after competent authorization.`,
       tr:`${method.stop.tr} Tesis acil durum planını uygula, alanı emniyete al ve yalnız yetkili onayından sonra yeniden başlat.`},
    },
    references:item.references,
    relatedGuides:item.related.map(specialistRelatedGuide),
    searchKeywords:item.keywords,
    aiText:{
      en:`Compare this ${item.title.en.toLowerCase()} guide with the SERNEM Method Statement generator, the task permit and the approved engineering procedure. Ask SERNEM AI for a site-specific hazard review.`,
      tr:`Bu ${item.title.tr.toLocaleLowerCase("tr-TR")} rehberini SERNEM Method Statement oluşturucusu, iş izni ve onaylı mühendislik prosedürüyle birlikte değerlendir. Sahaya özgü tehlike incelemesi için SERNEM AI'a sor.`,
    },
  } satisfies SafetyGuide;
});
