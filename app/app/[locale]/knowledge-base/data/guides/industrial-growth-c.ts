import { industrialFieldGuides, type IndustrialFieldTopic } from "./industrial-growth-factory";
const topics: IndustrialFieldTopic[] = [
  {
    "slug": "instrument-loop-checking-commissioning",
    "title": {
      "en": "Instrument Loop Checking: Safe Functional Testing and Permit Boundaries",
      "tr": "Enstrüman Loop Check: Güvenli Fonksiyon Testi ve İş İzni Sınırları"
    },
    "category": {
      "en": "Industrial Electrical Installation",
      "tr": "Endüstriyel Elektrik Montajı"
    },
    "description": {
      "en": "Test instrument wiring, field signals and control loops without unexpected valve movement or inadvertent trips.",
      "tr": "Enstrüman kablolarını, saha sinyallerini ve kontrol döngülerini beklenmedik vana hareketi veya trip olmadan test edin."
    },
    "overview": {
      "en": "Loop checks verify that a field instrument, its wiring, controller configuration and displayed response agree with the approved logic. They are not harmless paperwork: simulated inputs may move final elements, trigger a shutdown, start equipment or mask a real alarm. A competent commissioning team must establish test permits, energy states, logic-change controls, the tested system boundary and two-way communication with operations. Any temporary forces or bypasses require authorization, logging and independent reinstatement. This guide addresses HSE coordination; it does not supply control logic, trip set points or a software override procedure.",
      "tr": "Loop check; saha enstrümanı, kablolama, kontrol sistemi yapılandırması ve gösterilen cevabın onaylı mantıkla uyumunu doğrular. Bu işlem zararsız evrak kontrolü değildir: simüle edilen girişler son elemanları hareket ettirebilir, trip oluşturabilir, ekipmanı başlatabilir veya gerçek alarmı maskeleyebilir. Yetkin devreye alma ekibi test iznini, enerji durumunu, mantık değişim kontrolünü, test sınırını ve işletmeyle çift yönlü iletişimi oluşturmalıdır. Geçici force ve bypass işlemleri için onay, kayıt ve bağımsız eski hâle getirme gerekir. Bu rehber HSE koordinasyonunu açıklar; kontrol mantığı, trip set değeri veya yazılım bypass yöntemi vermez."
    },
    "hazards": [
      {
        "en": "Unexpected actuator or valve motion caused by a simulated instrument signal",
        "tr": "Simüle edilmiş enstrüman sinyali nedeniyle aktüatör veya vananın beklenmeyen hareketi"
      },
      {
        "en": "Unintended pump or motor start during distributed control system testing",
        "tr": "Dağıtık kontrol sistemi testinde pompa veya motorun istenmeyen çalışması"
      },
      {
        "en": "Temporary forced signals leaving a protective interlock bypassed after the test",
        "tr": "Geçici force sinyallerinin test sonrasında koruyucu interlock'u bypass durumda bırakması"
      },
      {
        "en": "Electrical contact from panel terminals that are not confirmed de-energized",
        "tr": "Enerjisizliği doğrulanmamış pano terminallerine elektriksel temas"
      },
      {
        "en": "Concurrent mechanical or confined-space work affected by a functional test",
        "tr": "Fonksiyon testinden etkilenen eşzamanlı mekanik veya kapalı alan işi"
      }
    ],
    "controls": [
      {
        "en": "Identify every tested instrument tag, control cabinet, output action and affected equipment on the permit.",
        "tr": "İzinde her test enstrüman tagini, kontrol panosunu, çıkış eylemini ve etkilenen ekipmanı tanımlayın."
      },
      {
        "en": "Agree with operations on the exact testing boundary, isolation state and process condition.",
        "tr": "İşletmeyle kesin test sınırı, izolasyon durumu ve proses koşulunda mutabık kalın."
      },
      {
        "en": "Use a controlled test script and competent I&C personnel; do not improvise signal simulations.",
        "tr": "Kontrollü test adımları ve yetkin E&I personeli kullanın; sinyal simülasyonunu doğaçlama yapmayın."
      },
      {
        "en": "Record every bypass, force, override and temporary jumper with approval, duration and restoration owner.",
        "tr": "Her bypass, force, override ve geçici köprüyü onay, süre ve geri alma sorumlusu ile kaydedin."
      },
      {
        "en": "Check that moving machinery, valves and adjacent contractors are clear before test activation.",
        "tr": "Test tetiklemeden önce hareketli ekipman, vanalar ve komşu yüklenicilerin güvenliğini doğrulayın."
      },
      {
        "en": "Verify all forces are removed and the approved final functional state is signed off at handback.",
        "tr": "Teslimde tüm force'ların kaldırıldığını ve onaylı son fonksiyon durumunun imzalandığını doğrulayın."
      }
    ],
    "mistakes": [
      {
        "en": "Triggering a field output before warning the mechanical maintenance team.",
        "tr": "Mekanik bakım ekibini uyarmadan saha çıkışını tetiklemek."
      },
      {
        "en": "Treating software bypass as a safe alternative to documented isolation.",
        "tr": "Yazılım bypass'ını belgeli izolasyonun güvenli alternatifi saymak."
      },
      {
        "en": "Leaving force bits or temporary jumpers after the last loop test.",
        "tr": "Son loop testinden sonra force bitlerini veya geçici köprüleri bırakmak."
      },
      {
        "en": "Signing the loop sheet without validating final equipment condition.",
        "tr": "Son ekipman durumunu doğrulamadan loop formunu imzalamak."
      }
    ],
    "checks": [
      {
        "en": "Approved loop sheet lists instrument, controller and final element identity",
        "tr": "Onaylı loop formunda enstrüman, kontrolör ve son eleman kimliği var"
      },
      {
        "en": "Operations authorized process state and test scope",
        "tr": "İşletme proses durumu ve test kapsamını onayladı"
      },
      {
        "en": "Mechanical crews and affected permits are coordinated before activation",
        "tr": "Tetikleme öncesi mekanik ekipler ve etkilenen izinler koordine edildi"
      },
      {
        "en": "All temporary bypasses and forces have accountable owners",
        "tr": "Tüm geçici bypass ve force'ların sorumlusu belirlendi"
      },
      {
        "en": "Restore-to-normal verification and independent sign-off are complete",
        "tr": "Normal duruma dönüş doğrulaması ve bağımsız imza tamamlandı"
      }
    ],
    "ppe": [
      {
        "en": "Electrical PPE appropriate to the verified work state and authorized equipment assessment",
        "tr": "Doğrulanmış çalışma ve ekipman değerlendirmesine uygun elektriksel KKD"
      },
      {
        "en": "Task PPE for personnel in field test areas; guarding is required before proximity to moving actuators",
        "tr": "Saha test personeli için işe uygun KKD; hareketli aktüatöre yaklaşmadan muhafaza gereklidir"
      }
    ],
    "stop": {
      "en": "Stop any loop test if equipment moves unexpectedly, a live process alarm is hidden, communication is lost or a forced signal cannot be reconciled. Secure the system and obtain operations/control-system authority before re-energization or restarting tests.",
      "tr": "Ekipman beklenmeyen hareket ederse, gerçek proses alarmı gizlenirse, iletişim kesilirse veya force sinyali eşleştirilemezse loop testini durdurun. Enerji verme veya testi başlatma öncesi sistemi emniyete alıp işletme/kontrol sistemi onayı alın."
    },
    "references": [
      "OSHA 1910.333",
      "OSHA 1910.119"
    ],
    "related": [
      "electrical-isolation-verification",
      "zero-energy-verification",
      "pre-startup-safety-review-pssr"
    ],
    "keywords": {
      "en": [
        "instrument loop checking safety",
        "loop check commissioning permit",
        "DCS functional testing hazards"
      ],
      "tr": [
        "enstrüman loop check güvenliği",
        "loop testi iş izni",
        "DCS fonksiyon test riskleri"
      ]
    }
  },
  {
    "slug": "electric-heat-tracing-energization",
    "title": {
      "en": "Electric Heat Tracing: Installation Checks and Safe Energization",
      "tr": "Elektrikli Heat Tracing: Montaj Kontrolleri ve Güvenli Enerji Verme"
    },
    "category": {
      "en": "Industrial Electrical Installation",
      "tr": "Endüstriyel Elektrik Montajı"
    },
    "description": {
      "en": "Verify electrical heating cables, insulation, thermostats, fault protection and permit coordination before energization.",
      "tr": "Elektrikli ısıtma kablosu, izolasyon, termostat, arıza koruması ve enerji verme öncesi izin koordinasyonu."
    },
    "overview": {
      "en": "Electric heat tracing keeps process piping within controlled temperature limits but introduces electrical faults and localized overheating around insulation and cable terminations. Design temperature, cable type, circuit loading, circuit protection and compatibility with the pipe environment must follow approved engineering and manufacturer instructions. Electrical installers must verify circuit identity, equipment ratings, moisture barriers, insulation coordination and tests by qualified persons before power is applied. After energization, access restrictions remain until inspection and controlled handback. This is not a cable installation specification or an authorization for energized work.",
      "tr": "Elektrikli heat tracing proses borusunun sıcaklığını kontrollü aralıkta tutar; ancak kablo sonlandırmaları ve izolasyon çevresinde elektrik arızası veya bölgesel aşırı ısınma tehlikeleri oluşturur. Tasarım sıcaklığı, kablo türü, devre yükü, devre koruması ve boru ortamıyla uyumluluk onaylı mühendislik/üretici talimatlarına uymalıdır. Elektrik montaj ekibi enerji vermeden önce devre kimliğini, ekipman sınıfını, nem bariyerini, izolasyon koordinasyonunu ve yetkili kişilerce yapılan testleri doğrulamalıdır. Enerji verildikten sonra muayene ve kontrollü teslim tamamlanana kadar erişim sınırları sürer. Bu rehber kablo montaj şartnamesi veya enerjili çalışma izni değildir."
    },
    "hazards": [
      {
        "en": "Damaged heat-trace cable causing short circuit or electric shock under insulation",
        "tr": "İzolasyon altındaki hasarlı heat-trace kablonun kısa devre veya elektrik çarpması oluşturması"
      },
      {
        "en": "Local overheating where cable overlaps, wrong termination or inappropriate insulation is installed",
        "tr": "Kablo üst üste gelmesi, hatalı sonlandırma veya uygunsuz izolasyonda bölgesel aşırı ısınma"
      },
      {
        "en": "Water ingress into junction boxes during wet construction work",
        "tr": "Islak inşaat işlerinde buatlara su girmesi"
      },
      {
        "en": "Unexpected energization while technicians are installing cladding or repairing the cable",
        "tr": "Teknisyenler kaplama montajı veya kablo onarımı yaparken beklenmeyen enerji verilmesi"
      },
      {
        "en": "Uncoordinated hot work or maintenance near trace-heated piping",
        "tr": "Heat tracing'li boru yakınında koordinesiz sıcak iş veya bakım"
      }
    ],
    "controls": [
      {
        "en": "Check the design schedule, pipe tag, cable type, area classification and electrical circuit assignment.",
        "tr": "Tasarım çizelgesini, boru tagini, kablo tipini, alan sınıflandırmasını ve elektrik devresi atamasını kontrol edin."
      },
      {
        "en": "Confirm isolation and lockout before cable repair, insulation removal or terminal work.",
        "tr": "Kablo onarımı, izolasyon sökme veya terminal işi öncesi enerji izolasyonu ve kilitlemeyi doğrulayın."
      },
      {
        "en": "Inspect heat tracing terminations, earthing/bonding, moisture sealing and the protective device selection.",
        "tr": "Heat tracing sonlandırmasını, topraklama/bonding, nem sızdırmazlığı ve koruyucu cihaz seçimini inceleyin."
      },
      {
        "en": "Perform the manufacturer-required electrical integrity tests with qualified personnel and recorded results.",
        "tr": "Üreticinin öngördüğü elektriksel bütünlük testlerini yetkili personel ve kayıtlı sonuçlarla gerçekleştirin."
      },
      {
        "en": "Coordinate cladding work and temporary construction power to prevent premature or accidental energization.",
        "tr": "Kaplama çalışması ve geçici şantiye enerjisini erken veya kazara enerjilenmeyi önleyecek şekilde koordine edin."
      },
      {
        "en": "Authorize energization only after the I&C/electrical and operations acceptance of the as-built circuit.",
        "tr": "Enerjiyi yalnız E&I/elektrik ve işletmenin as-built devre kabulünden sonra verin."
      }
    ],
    "mistakes": [
      {
        "en": "Hiding damaged cable under insulation before required electrical test.",
        "tr": "Gerekli elektrik testi yapılmadan hasarlı kabloyu izolasyon altında kapatmak."
      },
      {
        "en": "Applying generic cable spacing or wattage instead of the designed heat-trace configuration.",
        "tr": "Tasarım heat trace yerleşimi yerine genel kablo aralığı veya güç değeri uygulamak."
      },
      {
        "en": "Assuming an isolated panel means the field junction box is also confirmed dead.",
        "tr": "İzole panoya bakarak saha buatının da enerjisiz olduğunu varsaymak."
      },
      {
        "en": "Energizing before verifying moisture protection and approved termination.",
        "tr": "Nem koruması ve onaylı sonlandırma doğrulanmadan enerji vermek."
      }
    ],
    "checks": [
      {
        "en": "Approved trace layout and electrical circuit identification match the as-built installation",
        "tr": "Onaylı trace yerleşimi ve elektrik devresi kimliği as-built montajla uyumlu"
      },
      {
        "en": "Isolation/LOTO and competent testing authorization are in place",
        "tr": "Enerji izolasyonu/LOTO ve yetkili test izni hazır"
      },
      {
        "en": "Cable condition, termination and ingress protection passed inspection",
        "tr": "Kablo durumu, sonlandırma ve sızdırmazlık muayeneden geçti"
      },
      {
        "en": "Required electrical test records and protective devices are accepted",
        "tr": "Gerekli elektrik test kayıtları ve koruma cihazları kabul edildi"
      },
      {
        "en": "Operations approved controlled first energization and monitoring",
        "tr": "İşletme kontrollü ilk enerji verme ve izlemeyi onayladı"
      }
    ],
    "ppe": [
      {
        "en": "Qualified electrical PPE selected for the specific energized-work exposure assessment",
        "tr": "İşe özgü enerjili çalışma maruziyet değerlendirmesine göre seçilmiş elektriksel KKD"
      },
      {
        "en": "Suitable cut-resistant and eye protection for cladding work where specified",
        "tr": "Belirtildiği yerlerde kaplama işi için uygun kesilme ve göz koruması"
      }
    ],
    "stop": {
      "en": "Stop for a failed electrical integrity test, moisture entry, unapproved cable modification, hot spots or unexpected live circuit. Isolate, prevent access and obtain a competent electrical assessment before any restart.",
      "tr": "Elektrik bütünlük testi başarısızsa, nem girişi, onaysız kablo değişikliği, sıcak nokta veya beklenmeyen enerjili devre varsa işi durdurun. İzole edin, erişimi kapatın ve yeniden başlatmadan yetkili elektrik değerlendirmesi alın."
    },
    "references": [
      "OSHA 1910.333",
      "OSHA 1910.303"
    ],
    "related": [
      "temporary-electrical-installations",
      "electrical-isolation-verification",
      "fire-watch-duties"
    ],
    "keywords": {
      "en": [
        "electric heat tracing installation safety",
        "heat tracing energization checklist",
        "industrial trace heating electrical risk"
      ],
      "tr": [
        "elektrikli heat tracing güvenliği",
        "heat tracing enerji verme kontrolü",
        "boru ısıtma kablosu elektrik tehlikesi"
      ]
    }
  },
  {
    "slug": "firewater-system-flushing-handover",
    "title": {
      "en": "Firewater Line Flushing and Commissioning: System Readiness",
      "tr": "Yangın Suyu Hattı Flushing ve Devreye Alma: Sistem Hazırlığı"
    },
    "category": {
      "en": "Process Safety & Commissioning",
      "tr": "Proses Güvenliği ve Devreye Alma"
    },
    "description": {
      "en": "Manage temporary impairment, line flushing, discharge controls and formal return of firewater protection.",
      "tr": "Geçici yangın koruması kaybı, hat flushing, deşarj kontrolleri ve yangın suyu sisteminin resmî devreye dönüşü."
    },
    "overview": {
      "en": "Firewater piping is a safety-critical protection service. Flushing and testing can temporarily impair hydrants, sprinklers or other firefighting supplies while producing high-energy water discharge and slippery access routes. The site fire protection authority must approve any impairment, compensating measures, notifications and restoration sequence before isolation. Engineering specifies flushing method, permitted pressure/flow and acceptance criteria; this guide does not supply them. After completion, crews must prove correct valve alignment, system availability and documented handover to the fire protection owner.",
      "tr": "Yangın suyu borulaması güvenlik açısından kritik bir koruma hizmetidir. Flushing ve test; hidrant, sprinkler veya diğer yangınla mücadele beslemelerini geçici olarak devre dışı bırakabilir ve yüksek enerjili su deşarjı ile kaygan erişim yolları oluşturabilir. İzolasyon öncesi tesis yangın koruma yetkilisi; hizmet dışı bırakma, telafi tedbirleri, bildirimler ve geri dönüş sırasını onaylamalıdır. Flushing yöntemi, izin verilen basınç/debi ve kabul kriterini mühendislik belirler; bu rehber belirlemez. Tamamlama sonrası doğru vana dizilimi, sistem kullanılabilirliği ve yangın koruma sorumlusuna kayıtlı teslim kanıtlanmalıdır."
    },
    "hazards": [
      {
        "en": "Temporary loss of firewater protection while adjacent hot work or startup remains active",
        "tr": "Komşu sıcak iş veya devreye alma sürerken yangın suyu korumasının geçici kaybı"
      },
      {
        "en": "Hose or temporary discharge pipe movement from water pressure and reaction force",
        "tr": "Su basıncı ve itki kuvveti nedeniyle hortum veya geçici deşarj hattı hareketi"
      },
      {
        "en": "Uncontrolled water runoff causing slips, traffic conflict and electrical contact",
        "tr": "Kontrolsüz su akışının kayma, araç geçişi çakışması veya elektrik teması oluşturması"
      },
      {
        "en": "Incomplete valve restoration leaving a hydrant, branch or protection zone isolated",
        "tr": "Eksik vana geri açma nedeniyle hidrant, branş veya koruma bölgesinin izole kalması"
      },
      {
        "en": "High-noise, debris or water jet exposure at unprotected flushing outlets",
        "tr": "Korumasız flushing çıkışında yüksek gürültü, döküntü veya su jeti maruziyeti"
      }
    ],
    "controls": [
      {
        "en": "Request firewater impairment authorization and document compensating fire precautions and affected areas.",
        "tr": "Yangın suyu hizmet dışı bırakma onayı alın; telafi yangın tedbirleri ve etkilenen alanları kaydedin."
      },
      {
        "en": "Review the approved flushing plan, isolation boundary, temporary discharge supports and drainage acceptance.",
        "tr": "Onaylı flushing planını, izolasyon sınırını, geçici deşarj mesnetlerini ve drenaj kabulünü inceleyin."
      },
      {
        "en": "Coordinate any hot work and shutdown constraints with operations and emergency response teams.",
        "tr": "Sıcak işleri ve durdurma kısıtlarını işletme/acil müdahale ekipleriyle koordine edin."
      },
      {
        "en": "Secure discharge routes and protect walkways, traffic corridors, electrical equipment and public access.",
        "tr": "Deşarj güzergâhını güvene alın; yaya yollarını, trafik alanlarını, elektrik ekipmanını ve genel erişimi koruyun."
      },
      {
        "en": "Assign a named operator to verify valves and emergency shutdown at each flushing stage.",
        "tr": "Her flushing aşamasında vana ve acil durdurmayı doğrulayacak belirli operatör atayın."
      },
      {
        "en": "Record flushing completion, valve lineup and firewater availability acceptance before closing impairment.",
        "tr": "Hizmet dışı durum kapatılmadan flushing tamamlanması, vana dizilimi ve yangın suyu kullanılabilirlik kabulünü kaydedin."
      }
    ],
    "mistakes": [
      {
        "en": "Disabling a firewater branch without notifying the site fire protection owner.",
        "tr": "Yangın suyu branşını tesis yangın koruma sorumlusuna bildirmeden kapatmak."
      },
      {
        "en": "Routing discharge across an active electrical workshop or occupied access route.",
        "tr": "Deşarjı aktif elektrik atölyesi veya kullanılan erişim yolundan geçirmek."
      },
      {
        "en": "Closing a test permit before confirming hydrants and isolation valves are restored.",
        "tr": "Hidrant ve izolasyon vanalarının dönüşü doğrulanmadan test iznini kapatmak."
      },
      {
        "en": "Assuming visible water flow proves all safety-critical firewater functions are operational.",
        "tr": "Görünen su akışını tüm kritik yangın suyu fonksiyonlarının çalıştığı kanıtı saymak."
      }
    ],
    "checks": [
      {
        "en": "Firewater system impairment and compensating measures are approved",
        "tr": "Yangın suyu hizmet dışı durum ve telafi tedbirleri onaylandı"
      },
      {
        "en": "Flushing pressure boundary, supports and discharge routing are inspected",
        "tr": "Flushing basınç sınırı, mesnetler ve deşarj güzergâhı kontrol edildi"
      },
      {
        "en": "Operations, hot work teams and emergency responders received notification",
        "tr": "İşletme, sıcak iş ekipleri ve acil müdahale bilgilendirildi"
      },
      {
        "en": "Walkways, drainage and electrical exposure are controlled",
        "tr": "Yürüyüş yolları, drenaj ve elektrik maruziyeti kontrol edildi"
      },
      {
        "en": "Valve lineup and firewater system restoration are independently signed",
        "tr": "Vana dizilimi ve yangın suyu sistemi dönüşü bağımsız imzalandı"
      }
    ],
    "ppe": [
      {
        "en": "Eye, hand, hearing and slip-resistant foot protection selected for authorized flushing staff",
        "tr": "Yetkili flushing personeli için uygun göz, el, işitme ve kaymaz ayak koruması"
      },
      {
        "en": "PPE supplements water-jet exclusion; it does not make standing in the discharge safe",
        "tr": "KKD su jeti dışlamasına ek önlemdir; deşarj içinde durmayı güvenli kılmaz"
      }
    ],
    "stop": {
      "en": "Stop if firewater protection becomes unavailable beyond the authorized area, a valve cannot be restored, discharge leaves its controlled route or equipment integrity is uncertain. Maintain the impairment notification and escalate to the facility fire protection authority until full service is verified.",
      "tr": "Yangın suyu koruması izinli alan dışında devre dışı kalırsa, vana geri açılamazsa, deşarj kontrollü güzergâhtan çıkarsa veya ekipman bütünlüğü belirsizse durdurun. Tam hizmet doğrulanana kadar hizmet dışı bildirimini sürdürüp tesis yangın koruma yetkilisine iletin."
    },
    "references": [
      "OSHA 1910.159",
      "OSHA 1910.147"
    ],
    "related": [
      "pressure-testing-safety",
      "simops-safety",
      "pre-startup-safety-review-pssr"
    ],
    "keywords": {
      "en": [
        "firewater line flushing safety",
        "firewater impairment permit checklist",
        "hydrant commissioning handover"
      ],
      "tr": [
        "yangın suyu flushing güvenliği",
        "yangın hattı devre dışı bırakma izni",
        "hidrant devreye alma kontrolü"
      ]
    }
  }
];
export const industrialNextGuidesC = industrialFieldGuides(topics);
