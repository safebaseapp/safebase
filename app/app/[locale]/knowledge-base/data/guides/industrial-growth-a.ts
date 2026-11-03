import { industrialFieldGuides, type IndustrialFieldTopic } from "./industrial-growth-factory";
const topics: IndustrialFieldTopic[] = [
  {
    "slug": "flange-gasket-bolting-integrity",
    "title": {
      "en": "Flange Gasket and Bolting Integrity: Joint Assembly Safety",
      "tr": "Flanş Conta ve Civata Bütünlüğü: Güvenli Montaj Kontrolleri"
    },
    "category": {
      "en": "Pressure Systems & Mechanical Integrity",
      "tr": "Basınçlı Sistemler ve Mekanik Bütünlük"
    },
    "description": {
      "en": "Flange opening, gasket selection, controlled bolt tightening and leak-free handback checks for industrial piping.",
      "tr": "Endüstriyel borulamada flanş açma, conta seçimi, kontrollü sıkma ve sızdırmaz teslim kontrolleri."
    },
    "overview": {
      "en": "A bolted flange is a pressure boundary, not simply a collection of fasteners. Poor gasket identification, dirty sealing faces, uneven bolt load or premature repressurization can cause release of hot, toxic or flammable media. Before work starts, the authorized team must establish isolation and zero-energy verification, compare the joint tag against approved drawings, inspect flange faces and confirm the specified gasket, studs and calibrated tools. Tightening sequence and target load come only from the approved joint-management procedure. A completed bolt-up record does not replace the required pressure-integrity acceptance and operations handback.",
      "tr": "Cıvatalı flanş yalnız bağlantı elemanları topluluğu değil, basınç sınırıdır. Yanlış conta tanımlaması, kirli sızdırmazlık yüzeyi, düzensiz civata yükü veya erken basınçlandırma; sıcak, toksik ya da yanıcı akışkan sızıntısına neden olabilir. Çalışma öncesinde yetkili ekip izolasyon ve sıfır enerji doğrulamasını yapmalı, bağlantı tag numarasını onaylı çizimle karşılaştırmalı, flanş yüzeyini incelemeli ve belirtilen conta, saplama ile kalibrasyonlu aleti doğrulamalıdır. Sıkma sırası ve hedef yük yalnız onaylı bağlantı yönetim prosedüründen alınır. Civata sıkma kaydı, gerekli sızdırmazlık kabulünün ve işletmeye teslimin yerine geçmez."
    },
    "hazards": [
      {
        "en": "Residual trapped pressure or hazardous product behind a supposedly isolated flange",
        "tr": "İzole edildiği düşünülen flanş gerisinde kalan basınç veya tehlikeli proses akışkanı"
      },
      {
        "en": "Pinch and line-of-fire hazards when separating a flange or positioning a gasket",
        "tr": "Flanşı ayırma veya conta yerleştirme sırasında sıkışma ve darbe hattı riski"
      },
      {
        "en": "Gasket extrusion, joint failure or leakage caused by incorrect materials or uneven loading",
        "tr": "Yanlış malzeme veya düzensiz yükleme nedeniyle conta fırlaması, bağlantı arızası veya sızıntı"
      },
      {
        "en": "Dropped tools or heavy flange parts during elevated or restricted-access assembly",
        "tr": "Yüksekte veya dar alanda ağır flanş parçalarının ve aletlerin düşmesi"
      },
      {
        "en": "Unexpected restart or movement from adjacent lines during joint work",
        "tr": "Bağlantı çalışırken komşu hatların beklenmeyen devreye alınması veya hareketi"
      }
    ],
    "controls": [
      {
        "en": "Verify the permit, marked joint, fluid hazard, depressurization, drains and positive isolation before disturbing bolts.",
        "tr": "Civatalara müdahale etmeden iş iznini, işaretli bağlantıyı, akışkan tehlikesini, basınçsızlaştırmayı, drenajı ve pozitif izolasyonu doğrulayın."
      },
      {
        "en": "Use a qualified joint assembler and compare gasket type, rating, flange face and bolt specification with the approved package.",
        "tr": "Yetkin bağlantı montajcısı kullanın; conta türü, sınıfı, flanş yüzeyi ve civata şartını onaylı paketle karşılaştırın."
      },
      {
        "en": "Inspect flange faces and damaged threads; reject unapproved repairs or improvised sealants.",
        "tr": "Flanş yüzeylerini ve hasarlı dişleri inceleyin; onaysız onarım veya doğaçlama sızdırmazlık malzemesini reddedin."
      },
      {
        "en": "Use calibrated equipment and the engineering-approved tightening pattern, stages and hold points.",
        "tr": "Kalibrasyonlu ekipman ve mühendislikçe onaylı sıkma düzeni, kademeleri ve durdurma noktalarını uygulayın."
      },
      {
        "en": "Control hand positions, support loose components and barricade areas exposed to released material.",
        "tr": "El pozisyonlarını kontrol edin, serbest parçaları destekleyin ve düşebilecek malzeme bölgesini bariyerleyin."
      },
      {
        "en": "Record joint identity, equipment, torque/tension evidence and independent acceptance before authorized pressure restoration.",
        "tr": "Yetkili basınçlandırma öncesi bağlantı kimliği, ekipman, sıkma/germe kanıtı ve bağımsız kabulü kaydedin."
      }
    ],
    "mistakes": [
      {
        "en": "Reusing a gasket without explicit manufacturer and engineering approval.",
        "tr": "Üretici ve mühendislik onayı olmadan contayı yeniden kullanmak."
      },
      {
        "en": "Using generic torque values from another size or gasket material.",
        "tr": "Başka çap veya conta malzemesinin genel tork değerini kullanmak."
      },
      {
        "en": "Opening the final bolts without proving zero pressure and safe fluid removal.",
        "tr": "Sıfır basınç ve güvenli akışkan tahliyesi kanıtlanmadan son civataları açmak."
      },
      {
        "en": "Treating a visual bolt check as complete leak integrity verification.",
        "tr": "Görsel civata kontrolünü eksiksiz sızdırmazlık doğrulaması saymak."
      }
    ],
    "checks": [
      {
        "en": "Joint identity, approved gasket and bolt grades match the engineering package",
        "tr": "Bağlantı kimliği, onaylı conta ve civata sınıfı mühendislik paketiyle uyumlu"
      },
      {
        "en": "Permit, positive isolation, drainage and zero pressure are documented",
        "tr": "İş izni, pozitif izolasyon, drenaj ve sıfır basınç belgelendi"
      },
      {
        "en": "Calibrated tightening equipment and qualified assembler are available",
        "tr": "Kalibrasyonlu sıkma ekipmanı ve yetkin montajcı hazır"
      },
      {
        "en": "Tightening stages and independent QA hold points are assigned",
        "tr": "Sıkma kademeleri ve bağımsız kalite durdurma noktaları belirlendi"
      },
      {
        "en": "Operations handback and leak test acceptance are recorded",
        "tr": "İşletmeye teslim ve kaçak testi kabulü kayıt altına alındı"
      }
    ],
    "ppe": [
      {
        "en": "Eye and face protection suitable for the identified fluid and mechanical exposure",
        "tr": "Tanımlanan akışkan ve mekanik maruziyete uygun göz/yüz koruması"
      },
      {
        "en": "Task-specific gloves, protective clothing and safety footwear for joint handling",
        "tr": "Bağlantı elleçleme için işe uygun eldiven, koruyucu giysi ve iş ayakkabısı"
      }
    ],
    "stop": {
      "en": "Stop immediately for unexpected fluid, pressure indication, incorrect gasket identity, cracked flange, unavailable joint procedure or a failed leak test. Re-establish isolation, reassess and obtain engineering/operations authorization before proceeding.",
      "tr": "Beklenmeyen akışkan, basınç belirtisi, hatalı conta kimliği, çatlak flanş, eksik bağlantı prosedürü veya başarısız kaçak testi görülürse işi hemen durdurun. Devam etmeden izolasyonu yeniden doğrulayın, riski değerlendirin ve mühendislik/işletme onayı alın."
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1910.147"
    ],
    "related": [
      "line-breaking-safety",
      "pressure-testing-safety",
      "stored-energy-hazards"
    ],
    "keywords": {
      "en": [
        "flange gasket installation safety",
        "flange bolt torque inspection",
        "bolted joint integrity checklist"
      ],
      "tr": [
        "flanş conta montaj güvenliği",
        "flanş civata tork kontrolü",
        "flanş bağlantı sızdırmazlık kontrol listesi"
      ]
    }
  },
  {
    "slug": "hydraulic-bolt-tensioning-safety",
    "title": {
      "en": "Hydraulic Bolt Tensioning Safety: Stored Pressure and Line of Fire",
      "tr": "Hidrolik Civata Germe Güvenliği: Depolanmış Basınç ve Tehlike Hattı"
    },
    "category": {
      "en": "Pressure Systems & Mechanical Integrity",
      "tr": "Basınçlı Sistemler ve Mekanik Bütünlük"
    },
    "description": {
      "en": "Control high-pressure hydraulic hoses, tensioning jacks, pressure release, exclusion zones and handback.",
      "tr": "Yüksek basınçlı hidrolik hortum, gerdirme krikosu, basınç tahliyesi, dışlama alanı ve teslim kontrolleri."
    },
    "overview": {
      "en": "Hydraulic bolt tensioning applies large forces through high-pressure fluid and specialized jacks. A line rupture, incorrectly seated bridge or sudden nut release can eject parts or inject hydraulic fluid into the body. Equipment selection, working pressure, sequencing and bolt extension belong to the approved manufacturer and engineering instructions—not generic numbers from a toolbox talk. The qualified team must inspect pump, gauges and hose ratings, prevent personnel from standing in line with pressurized fittings, and establish a verified zero-pressure condition before repositioning or disconnecting hoses.",
      "tr": "Hidrolik civata germe işlemi yüksek basınçlı sıvı ve özel krikolarla büyük kuvvetler uygular. Hortum kopması, yanlış yerleşmiş köprü veya somunun ani serbest kalması parça fırlamasına ya da sıvının doku içine enjekte olmasına yol açabilir. Ekipman seçimi, çalışma basıncı, germe sırası ve cıvata uzaması genel toolbox rakamlarına değil, onaylı üretici ve mühendislik talimatlarına bağlıdır. Yetkin ekip pompa, manometre ve hortum sınıflarını kontrol etmeli, kişilerin basınçlı bağlantı doğrultusunda durmasını engellemeli ve hortum sökme/yeniden yerleştirme öncesi sıfır basıncı doğrulamalıdır."
    },
    "hazards": [
      {
        "en": "High-pressure hydraulic fluid injection from a pinhole or failed fitting",
        "tr": "Delik veya bağlantı arızasından yüksek basınçlı sıvının vücuda enjekte olması"
      },
      {
        "en": "Ejection of tensioner bridge, stud, nut or adapter under stored load",
        "tr": "Depolanmış yük altında germe köprüsü, saplama, somun veya adaptörün fırlaması"
      },
      {
        "en": "Uncontrolled jack movement or loss of seat on an uneven flange",
        "tr": "Düzensiz flanş yüzeyinde krikonun kontrolsüz hareketi veya yerinden çıkması"
      },
      {
        "en": "Slip and manual-handling hazards from heavy tensioning units and leaked oil",
        "tr": "Ağır germe ekipmanı ve yağ sızıntısından kaynaklanan kayma ve elle taşıma tehlikesi"
      },
      {
        "en": "Unexpected simultaneous pressure applied to incorrectly connected tensioners",
        "tr": "Yanlış bağlanmış gerdiricilere beklenmeyen eşzamanlı basınç verilmesi"
      }
    ],
    "controls": [
      {
        "en": "Verify bolt, flange and approved tensioning tool compatibility before connecting any hydraulic lines.",
        "tr": "Herhangi bir hidrolik hat bağlamadan civata, flanş ve onaylı germe ekipmanı uyumunu doğrulayın."
      },
      {
        "en": "Inspect hose certificates, couplers, calibrated gauge, pressure controls and pump condition.",
        "tr": "Hortum sertifikalarını, kaplinleri, kalibrasyonlu manometreyi, basınç kontrolünü ve pompayı inceleyin."
      },
      {
        "en": "Establish a controlled exclusion area around both jacks and pressurized hoses; stand clear of the line of fire.",
        "tr": "Krikolar ve basınçlı hortumlar çevresinde kontrollü alan oluşturup fırlama hattından uzak durun."
      },
      {
        "en": "Apply the documented tensioning pattern under one authorized pressure-control operator.",
        "tr": "Belgelenmiş germe sırasını tek bir yetkili basınç operatörü denetiminde uygulayın."
      },
      {
        "en": "Release residual pressure and verify gauges before touching, repositioning or disconnecting a hose.",
        "tr": "Hortuma dokunma, yeniden yerleştirme veya sökme öncesi kalıntı basıncı tahliye edip manometreyi doğrulayın."
      },
      {
        "en": "Investigate every leak without hands near the jet; treat suspected injection as an immediate medical emergency.",
        "tr": "Her kaçağı eli akışa yaklaştırmadan inceleyin; enjeksiyon şüphesini acil tıbbi durum kabul edin."
      }
    ],
    "mistakes": [
      {
        "en": "Testing an oil leak with a bare or gloved hand.",
        "tr": "Yağ sızıntısını çıplak veya eldivenli elle kontrol etmek."
      },
      {
        "en": "Disconnecting couplers after switching off the pump but before draining stored pressure.",
        "tr": "Pompayı durdurduktan sonra kalıntı basıncı boşaltmadan kaplinleri ayırmak."
      },
      {
        "en": "Setting pressure from another job instead of the approved load calculation.",
        "tr": "Onaylı yük hesabı yerine başka işin basınç değerini kullanmak."
      },
      {
        "en": "Entering the tensioner line of fire during the pressurization stage.",
        "tr": "Basınçlandırma aşamasında gerdirici fırlama hattına girmek."
      }
    ],
    "checks": [
      {
        "en": "Authorized method, stud geometry and specified load are verified",
        "tr": "Yetkili yöntem, saplama geometrisi ve belirlenen yük doğrulandı"
      },
      {
        "en": "Hydraulic pump, hose and gauge condition and ratings are checked",
        "tr": "Hidrolik pompa, hortum ve manometre durumu/sınıfı kontrol edildi"
      },
      {
        "en": "Dedicated pressure operator and exclusion area are designated",
        "tr": "Tek yetkili basınç operatörü ve dışlama alanı belirlendi"
      },
      {
        "en": "Pressure-release and zero-pressure method is demonstrated",
        "tr": "Basınç tahliye ve sıfır basınç yöntemi gösterildi"
      },
      {
        "en": "Bolt tension records and final joint handback are approved",
        "tr": "Civata germe kayıtları ve son bağlantı teslimi onaylandı"
      }
    ],
    "ppe": [
      {
        "en": "Oil-resistant gloves and eye/face protection chosen for the assessed exposure",
        "tr": "Değerlendirilen maruziyete uygun yağ dayanımlı eldiven ve göz/yüz koruması"
      },
      {
        "en": "Safety footwear and suitable clothing; PPE does not prevent injection injury",
        "tr": "İş ayakkabısı ve uygun giysi; KKD enjeksiyon yaralanmasını önlemez"
      }
    ],
    "stop": {
      "en": "Stop pressurization if a hose blisters, gauge responds abnormally, seating shifts, oil sprays or communication fails. Release stored pressure remotely as designed, secure the area and refer suspected hydraulic injection for immediate emergency medical assessment.",
      "tr": "Hortum şişerse, manometre olağan dışı tepki verirse, oturma konumu değişirse, yağ püskürürse veya iletişim kesilirse basınçlandırmayı durdurun. Tasarlanan yöntemle güvenli noktadan basıncı boşaltın, alanı kapatın ve hidrolik enjeksiyon şüphesinde acil sağlık değerlendirmesi sağlayın."
    },
    "references": [
      "OSHA 1910.147",
      "OSHA 1910.119"
    ],
    "related": [
      "stored-energy-hazards",
      "rigging-safety",
      "zero-energy-verification"
    ],
    "keywords": {
      "en": [
        "hydraulic bolt tensioning safety",
        "hydraulic tensioner hose inspection",
        "high pressure bolt tightening hazards"
      ],
      "tr": [
        "hidrolik civata germe güvenliği",
        "hidrolik germe hortum kontrolü",
        "yüksek basınç civata germe riskleri"
      ]
    }
  },
  {
    "slug": "temporary-pipe-support-load-transfer",
    "title": {
      "en": "Temporary Pipe Supports and Load Transfer: Rigging Hold Points",
      "tr": "Geçici Boru Mesnetleri ve Yük Aktarımı: Kaldırma Kontrol Noktaları"
    },
    "category": {
      "en": "Pressure Systems & Mechanical Integrity",
      "tr": "Basınçlı Sistemler ve Mekanik Bütünlük"
    },
    "description": {
      "en": "Check temporary steel supports, engineered load paths, pipe rack access and controlled transfer of piping weight.",
      "tr": "Geçici çelik mesnetler, mühendislik yük yolu, pipe rack erişimi ve boru ağırlığının kontrollü aktarımı."
    },
    "overview": {
      "en": "During spool replacement or piping modification, a temporary support may carry loads previously distributed among permanent hangers and guides. An unapproved jack, chain hoist or welded bracket can create unintended restraint, overturn or local overload. Temporary support design and lifting plans must be approved by competent engineering personnel and account for contents, thermal effects, adjacent pipe loads and structural capacity. Site crews verify identification, installation, exclusion boundaries and the sequence for transferring load to permanent supports; visual appearance alone cannot prove structural adequacy.",
      "tr": "Spool değişimi veya borulama revizyonunda geçici mesnet, daha önce kalıcı askı ve kılavuzlarca paylaşılan yükleri taşıyabilir. Onaysız kriko, trifor veya kaynaklı konsol; istenmeyen kısıt, devrilme ya da lokal aşırı yüke neden olabilir. Geçici mesnet tasarımı ve kaldırma planı yetkin mühendislerce onaylanmalı; iç akışkan, ısıl etkiler, komşu hat yükleri ve yapı kapasitesi dikkate alınmalıdır. Saha ekipleri tanımlamayı, montajı, dışlama sınırlarını ve yükün kalıcı mesnetlere aktarılma sırasını doğrular; yalnız görünüş yapısal yeterliliği kanıtlamaz."
    },
    "hazards": [
      {
        "en": "Unverified temporary support capacity under spool and retained product load",
        "tr": "Spool ve hatta kalan akışkan yükü altında doğrulanmamış geçici mesnet kapasitesi"
      },
      {
        "en": "Sudden pipe movement when bolts or hangers are released",
        "tr": "Civata veya askı gevşetildiğinde borunun ani hareketi"
      },
      {
        "en": "Local pipe-rack overstress from improvised clamp or welded attachment",
        "tr": "Doğaçlama kelepçe veya kaynaklı bağlantı nedeniyle pipe rack üzerinde bölgesel aşırı gerilme"
      },
      {
        "en": "Dropped spool, tools or chain blocks above live pedestrian areas",
        "tr": "Aktif yaya geçişi üzerinde spool, alet veya trifor düşmesi"
      },
      {
        "en": "Conflict with nearby energization, hot work or crane operations",
        "tr": "Yakındaki enerji verme, sıcak çalışma veya vinç operasyonlarıyla çakışma"
      }
    ],
    "controls": [
      {
        "en": "Require engineered drawings and load-path acceptance for every load-bearing temporary support.",
        "tr": "Yük taşıyan her geçici mesnet için mühendislik çizimi ve yük yolu kabulü isteyin."
      },
      {
        "en": "Identify actual pipe contents, isolation state, mechanical restraints and permanent hanger status.",
        "tr": "Gerçek boru içeriğini, izolasyon durumunu, mekanik kısıtları ve kalıcı askı durumunu belirleyin."
      },
      {
        "en": "Inspect support feet, anchors, connections, stability and protection against uncontrolled sliding.",
        "tr": "Mesnet ayaklarını, ankrajları, bağlantıları, stabiliteyi ve kontrolsüz kayma korumasını inceleyin."
      },
      {
        "en": "Establish drop-zone restrictions and independent access routes before moving or unloading piping.",
        "tr": "Boru hareketinden veya yük boşaltmadan önce düşme alanını kapatıp bağımsız erişim yolu oluşturun."
      },
      {
        "en": "Transfer loads in the approved stepwise sequence with an assigned lift supervisor and defined hold points.",
        "tr": "Yükü onaylı aşamalı sırayla, belirlenmiş kaldırma sorumlusu ve durdurma noktalarıyla aktarın."
      },
      {
        "en": "Release temporary supports only after permanent restraints are completed and engineering acceptance is recorded.",
        "tr": "Geçici mesnetleri ancak kalıcı kısıtlar tamamlanıp mühendislik kabulü kayda geçtikten sonra sökün."
      }
    ],
    "mistakes": [
      {
        "en": "Using scaffold tubes as structural supports without a design.",
        "tr": "Tasarımı olmadan iskele borularını taşıyıcı mesnet olarak kullanmak."
      },
      {
        "en": "Assuming an empty pipe always has negligible residual liquid weight.",
        "tr": "Boş sanılan hatta kalan sıvı ağırlığını göz ardı etmek."
      },
      {
        "en": "Releasing a chain block as soon as the pipe appears aligned.",
        "tr": "Boru hizalı görününce triforu hemen serbest bırakmak."
      },
      {
        "en": "Welding a temporary bracket to live equipment without an approved review.",
        "tr": "Canlı ekipmana onaylı inceleme olmadan geçici konsol kaynatmak."
      }
    ],
    "checks": [
      {
        "en": "Temporary support design and rack capacity are independently authorized",
        "tr": "Geçici mesnet tasarımı ve rack kapasitesi bağımsız yetkili tarafından onaylandı"
      },
      {
        "en": "Pipe state, residual contents and existing restraints are verified",
        "tr": "Boru durumu, kalıntı içerik ve mevcut kısıtlar doğrulandı"
      },
      {
        "en": "Lift/exclusion plan and support installation are inspected",
        "tr": "Kaldırma/dışlama planı ve mesnet montajı kontrol edildi"
      },
      {
        "en": "A stepwise load-transfer hold point is assigned",
        "tr": "Aşamalı yük aktarımı için durdurma noktası atandı"
      },
      {
        "en": "Permanent support acceptance precedes temporary support removal",
        "tr": "Geçici mesnet sökümünden önce kalıcı mesnet kabulü yapıldı"
      }
    ],
    "ppe": [
      {
        "en": "Hard hat, approved safety footwear and task-specific hand protection",
        "tr": "Baret, onaylı iş ayakkabısı ve işe özgü el koruması"
      },
      {
        "en": "Fall protection as required for approved elevated access; never attach to an unverified temporary support",
        "tr": "Onaylı yüksekte erişimde gerekli düşme koruması; doğrulanmamış geçici mesnete ankraj yapılmaz"
      }
    ],
    "stop": {
      "en": "Stop whenever a support deflects unexpectedly, a hanger moves, the loading plan differs from the field condition or adjacent teams enter the drop zone. Do not reapply force or release temporary works without engineering re-assessment.",
      "tr": "Mesnet beklenmeyen şekilde sehim yaparsa, askı hareket ederse, yük planı sahayla uyuşmazsa veya komşu ekipler düşme bölgesine girerse işi durdurun. Mühendislik yeniden değerlendirmesi olmadan kuvvet uygulamayın veya geçici işleri serbest bırakmayın."
    },
    "references": [
      "OSHA 1926.251",
      "OSHA 1926.501"
    ],
    "related": [
      "rigging-safety",
      "dropped-object-prevention",
      "simops-safety"
    ],
    "keywords": {
      "en": [
        "temporary pipe support safety",
        "piping load transfer method",
        "pipe rack support inspection checklist"
      ],
      "tr": [
        "geçici boru mesnet güvenliği",
        "boru yük aktarımı yöntemi",
        "pipe rack mesnet kontrol listesi"
      ]
    }
  }
];
export const industrialNextGuidesA = industrialFieldGuides(topics);
