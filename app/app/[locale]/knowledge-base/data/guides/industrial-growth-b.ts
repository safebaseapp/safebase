import { industrialFieldGuides, type IndustrialFieldTopic } from "./industrial-growth-factory";
const topics: IndustrialFieldTopic[] = [
  {
    "slug": "positive-isolation-spades-blinds",
    "title": {
      "en": "Positive Isolation with Spades and Blinds: Verification and Handover",
      "tr": "Spade ve Körleme ile Pozitif İzolasyon: Doğrulama ve Teslim"
    },
    "category": {
      "en": "Process Safety & Commissioning",
      "tr": "Proses Güvenliği ve Devreye Alma"
    },
    "description": {
      "en": "Plan and confirm positive process isolation, blind lists, line breaks and reinstatement without losing boundary control.",
      "tr": "Pozitif proses izolasyonu, körleme listesi, hat açma ve eski hâline getirme sınır kontrolünü planlayın."
    },
    "overview": {
      "en": "A valve showing closed is not always a sufficient barrier for intrusive work. Where the facility's risk assessment requires a positive isolation, authorized operations personnel must select and verify the approved spade, blind or physical disconnection arrangement. Blind installation itself can expose crews to trapped fluid, pressure and incompatible line conditions. The approved isolation certificate and P&IDs must identify each isolation point, pressure boundary, vent, drain, tagging method and restoration authority. This guide explains verification and accountability; it does not authorize live-line blinding, bypassing protection or substituting a generic blind thickness for engineering design.",
      "tr": "Kapalı görünen vana, müdahaleli çalışmada her zaman yeterli bariyer değildir. Tesis risk değerlendirmesinin pozitif izolasyon gerektirdiği durumlarda yetkili işletme personeli onaylı spade, körleme veya fiziksel ayırma düzenini seçip doğrulamalıdır. Körleme montajı da hapsolmuş akışkan, basınç ve uyumsuz hat koşullarına maruziyet yaratabilir. Onaylı izolasyon sertifikası ve P&ID; her izolasyon noktasını, basınç sınırını, vent/drenajı, etiketleme yöntemini ve geri alma yetkisini tanımlamalıdır. Bu rehber doğrulama ve sorumluluğu açıklar; enerjili hat körlemesine, korumayı bypass etmeye veya mühendislik yerine genel körleme kalınlığı seçmeye izin vermez."
    },
    "hazards": [
      {
        "en": "Residual pressure or trapped chemical released when the flange is opened",
        "tr": "Flanş açıldığında kalan basınç veya hapsolmuş kimyasalın dışarı çıkması"
      },
      {
        "en": "Incorrect blind installed at a similarly tagged adjacent line",
        "tr": "Benzer etiketli komşu hatta yanlış körleme uygulanması"
      },
      {
        "en": "Blind material, rating or size incompatible with the intended process boundary",
        "tr": "Körleme malzemesi, sınıfı veya çapının hedef proses sınırına uymaması"
      },
      {
        "en": "Uncontrolled removal of a blind during overlapping maintenance and commissioning",
        "tr": "Çakışan bakım ve devreye alma çalışmalarında körlemenin kontrolsüz kaldırılması"
      },
      {
        "en": "Lost isolation traceability after shift or contractor handover",
        "tr": "Vardiya veya yüklenici devrinde izolasyon izlenebilirliğinin kaybolması"
      }
    ],
    "controls": [
      {
        "en": "Approve the positive-isolation plan with equipment tags, process fluid, location and isolation owner.",
        "tr": "Pozitif izolasyon planını ekipman tagleri, proses akışkanı, konum ve izolasyon sorumlusuyla onaylayın."
      },
      {
        "en": "Depressurize, drain, purge and test as the authorized procedure requires before breaking a line.",
        "tr": "Hat açmadan önce yetkili prosedüre göre basınçsızlaştırma, drenaj, purge ve test uygulayın."
      },
      {
        "en": "Verify each spade or blind's identification and engineered suitability before installation.",
        "tr": "Her spade/körlemenin kimliğini ve mühendislik uygunluğunu montajdan önce doğrulayın."
      },
      {
        "en": "Use an independent witness where the site's critical isolation rules require one; update the blind register immediately.",
        "tr": "Tesisin kritik izolasyon kuralı gerektiriyorsa bağımsız şahit kullanın; körleme listesini derhal güncelleyin."
      },
      {
        "en": "Protect the opened joint, avoid the line of fire and use chemical-specific emergency precautions.",
        "tr": "Açılan bağlantıyı koruyun, akış yönündeki tehlike hattından uzak durun ve kimyasala uygun acil tedbirleri uygulayın."
      },
      {
        "en": "Reconcile every installed and removed blind against the register before authorized system reinstatement.",
        "tr": "Yetkili sisteme dönüş öncesi takılıp çıkarılmış her körlemeyi kayıt listesiyle eşleştirin."
      }
    ],
    "mistakes": [
      {
        "en": "Relying on a closed valve indication as proof of positive isolation.",
        "tr": "Kapalı vana işaretini pozitif izolasyon kanıtı kabul etmek."
      },
      {
        "en": "Using an unmarked plate or an improvised gasket as a line blank.",
        "tr": "İşaretsiz sac veya doğaçlama contayı hat körlemesi yapmak."
      },
      {
        "en": "Taking off a spade during a night shift without changing the isolation certificate.",
        "tr": "Gece vardiyasında izolasyon sertifikasını güncellemeden spade sökmek."
      },
      {
        "en": "Treating a blank installed in one branch as isolating connected branches.",
        "tr": "Bir branştaki körlemeyi bağlı diğer branşları da izole ediyor sanmak."
      }
    ],
    "checks": [
      {
        "en": "Isolation certificate and approved P&ID agree on every boundary point",
        "tr": "İzolasyon sertifikası ve P&ID her sınır noktasında uyuşuyor"
      },
      {
        "en": "Energy and residual fluid conditions are independently verified",
        "tr": "Enerji ve kalıntı akışkan durumu bağımsız doğrulandı"
      },
      {
        "en": "Blind specifications, labels and witness requirements are satisfied",
        "tr": "Körleme özellikleri, etiketler ve şahit şartları sağlandı"
      },
      {
        "en": "Isolation register and permit are reconciled at shift handover",
        "tr": "İzolasyon listesi ve iş izni vardiya devrinde eşleştirildi"
      },
      {
        "en": "Restoration requires fresh operations sign-off and line-up review",
        "tr": "Eski hâle dönüş için yeni işletme onayı ve hat dizilimi incelemesi gerekli"
      }
    ],
    "ppe": [
      {
        "en": "Chemical-rated eye, hand and body protection selected from the line-specific SDS and risk assessment",
        "tr": "Hatta özgü SDS/risk değerlendirmesine göre kimyasal dayanımlı göz, el ve vücut koruması"
      },
      {
        "en": "Suitable respiratory and rescue arrangements only where the assessment requires them",
        "tr": "Değerlendirme gerektiriyorsa uygun solunum ve kurtarma düzeni"
      }
    ],
    "stop": {
      "en": "Stop for unknown line identity, unexpected pressure, evidence of chemical, incorrect blind rating or a missing isolation witness. Secure the line, revalidate the isolation certificate and resume only after operations authorization.",
      "tr": "Hat kimliği bilinmiyorsa, basınç veya kimyasal belirtisi varsa, körleme sınıfı yanlışsa ya da gerekli şahit yoksa durdurun. Hattı güvenceye alın, izolasyon sertifikasını yeniden doğrulayın ve yalnız işletme onayıyla devam edin."
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1910.147"
    ],
    "related": [
      "line-breaking-safety",
      "zero-energy-verification",
      "permit-to-work"
    ],
    "keywords": {
      "en": [
        "positive isolation spade blind checklist",
        "piping blind list management",
        "spade installation safety"
      ],
      "tr": [
        "pozitif izolasyon spade körleme",
        "körleme listesi kontrolü",
        "boru körleme iş güvenliği"
      ]
    }
  },
  {
    "slug": "process-piping-chemical-cleaning",
    "title": {
      "en": "Chemical Cleaning of Process Piping: Compatibility and Waste Control",
      "tr": "Proses Borulaması Kimyasal Temizliği: Uyumluluk ve Atık Kontrolü"
    },
    "category": {
      "en": "Process Safety & Commissioning",
      "tr": "Proses Güvenliği ve Devreye Alma"
    },
    "description": {
      "en": "Control chemical circulation, incompatibility, hose failure, ventilation and effluent during industrial pipe cleaning.",
      "tr": "Endüstriyel boru temizliğinde kimyasal sirkülasyon, uyumsuzluk, hortum arızası, havalandırma ve atık yönetimi."
    },
    "overview": {
      "en": "Commissioning chemical cleaning removes construction residues and deposits but can introduce chemical burns, reaction gases, overpressure and harmful effluent. The cleaning chemistry, concentration, system compatibility, circulation temperature and waste treatment must come from approved engineering and chemical-supplier instructions. Before transfer or circulation, verify positive isolation, material compatibility, containment, pump and hose integrity, eyewash access and disposal route. The safety team must establish who controls emergency shutdown, gas monitoring and spill response. Never mix unknown residues or assume a drain is authorized to receive spent cleaning fluid.",
      "tr": "Devreye alma öncesi kimyasal temizleme, inşaat kalıntılarını ve birikintileri giderir ancak kimyasal yanık, reaksiyon gazı, aşırı basınç ve zararlı atık tehlikeleri oluşturabilir. Kimyasal bileşim, derişim, sistem uyumluluğu, sirkülasyon sıcaklığı ve atık işlemi onaylı mühendislik ve kimyasal tedarikçi talimatlarından alınmalıdır. Transfer veya sirkülasyon öncesi pozitif izolasyon, malzeme uyumluluğu, ikincil sızdırmazlık, pompa/hortum bütünlüğü, göz duşuna erişim ve atık yolu doğrulanmalıdır. Güvenlik ekibi acil durdurma, gaz izleme ve dökülme müdahalesi sorumlularını belirlemelidir. Bilinmeyen kalıntıları asla karıştırmayın; bir drenajın atık kabul ettiğini varsaymayın."
    },
    "hazards": [
      {
        "en": "Exothermic reaction or toxic vapours when cleaning chemicals contact incompatible residues",
        "tr": "Temizleme kimyasalı uyumsuz kalıntıyla temas ettiğinde ısı açığa çıkması veya toksik buhar"
      },
      {
        "en": "Corrosion, seal damage or hose degradation from incorrect chemical compatibility",
        "tr": "Yanlış kimyasal uyumluluğu nedeniyle korozyon, conta hasarı veya hortum bozulması"
      },
      {
        "en": "Spray or splash during transfer, sampling or unexpected pump discharge",
        "tr": "Transfer, numune veya beklenmeyen pompa deşarjında sıçrama/püskürme"
      },
      {
        "en": "Off-gas or oxygen displacement in poorly ventilated pits and enclosed sections",
        "tr": "Yetersiz havalandırmalı çukur veya kapalı bölümlerde gaz çıkışı/oksijen yer değiştirmesi"
      },
      {
        "en": "Uncontrolled release of hazardous spent cleaning solution into stormwater",
        "tr": "Tehlikeli atık temizleme çözeltisinin yağmur suyu sistemine kontrolsüz deşarjı"
      }
    ],
    "controls": [
      {
        "en": "Obtain approved cleaning procedure, SDS, compatibility assessment and site chemical inventory.",
        "tr": "Onaylı temizlik prosedürü, SDS, uyumluluk değerlendirmesi ve saha kimyasal listesini alın."
      },
      {
        "en": "Verify the process boundary, isolation register, vent/relief path and circulation equipment rating.",
        "tr": "Proses sınırını, izolasyon listesini, vent/tahliye yolunu ve sirkülasyon ekipmanı sınıfını doğrulayın."
      },
      {
        "en": "Test containment, hose connections, bunding, eyewash and emergency shower readiness before chemical charging.",
        "tr": "Kimyasal doldurmadan önce sızdırmazlık, hortum bağlantısı, ikincil kap, göz duşu ve acil duş hazırlığını test edin."
      },
      {
        "en": "Assign competent chemical handling personnel and monitor the process using the approved technical limits.",
        "tr": "Yetkin kimyasal elleçleme personeli atayın ve süreci onaylı teknik sınırlara göre izleyin."
      },
      {
        "en": "Provide ventilation and gas monitoring where hazard analysis identifies harmful vapours or oxygen deficiency.",
        "tr": "Tehlike analizi zararlı buhar veya oksijen eksikliği belirliyorsa havalandırma ve gaz izlemesi sağlayın."
      },
      {
        "en": "Segregate, label and transfer spent chemicals only to the authorized disposal or treatment route.",
        "tr": "Atık kimyasalları ayırın, etiketleyin ve yalnız yetkili bertaraf/arıtma yoluna aktarın."
      }
    ],
    "mistakes": [
      {
        "en": "Mixing two cleaners or neutralizers without chemical-specific compatibility approval.",
        "tr": "Kimyasala özgü uyumluluk onayı olmadan iki temizlik maddesini veya nötralizanı karıştırmak."
      },
      {
        "en": "Routing chemical discharge into a rainwater drain as if it were ordinary flushing water.",
        "tr": "Kimyasal deşarjı sıradan yıkama suyu sanıp yağmur drenajına vermek."
      },
      {
        "en": "Using the same gloves for every chemical without checking their breakthrough limits.",
        "tr": "Kimyasal geçirgenlik sınırlarını kontrol etmeden her kimyasalda aynı eldiveni kullanmak."
      },
      {
        "en": "Leaving a cleaning circulation loop running through an unmonitored shift handover.",
        "tr": "Temizlik sirkülasyonunu vardiya devrinde gözetimsiz çalışır bırakmak."
      }
    ],
    "checks": [
      {
        "en": "Signed chemical cleaning method and SDS are available at point of use",
        "tr": "İmzalı kimyasal temizlik yöntemi ve SDS kullanım noktasında mevcut"
      },
      {
        "en": "Compatibility, pressure integrity and isolation boundary are approved",
        "tr": "Uyumluluk, basınç bütünlüğü ve izolasyon sınırı onaylandı"
      },
      {
        "en": "Spill containment, emergency wash and ventilation are inspected",
        "tr": "Dökülme kontrolü, acil yıkama ve havalandırma kontrol edildi"
      },
      {
        "en": "Discharge routing and waste acceptance are documented",
        "tr": "Deşarj güzergâhı ve atık kabulü belgelendi"
      },
      {
        "en": "Operations handback confirms residues and temporary lines were removed",
        "tr": "İşletmeye teslim kalıntı ve geçici hatların kaldırıldığını doğruluyor"
      }
    ],
    "ppe": [
      {
        "en": "Chemical-resistant face shield, splash goggles, gloves and suit chosen for the actual substance",
        "tr": "Gerçek kimyasala göre seçilmiş dayanımlı yüz siperi, sıçrama gözlüğü, eldiven ve tulum"
      },
      {
        "en": "Respiratory protection only under an assessed, fit-tested and approved protection program",
        "tr": "Solunum koruması yalnız değerlendirilmiş, fit testli ve onaylı koruma programıyla"
      }
    ],
    "stop": {
      "en": "Stop circulation for unexpected temperature rise, pressure change, gas alarm, leak, skin exposure or unidentified discharge. Isolate as designed, evacuate affected persons, use the SDS emergency actions and notify the site's competent environmental and operations team.",
      "tr": "Beklenmeyen sıcaklık yükselmesi, basınç değişimi, gaz alarmı, kaçak, cilt teması veya belirsiz deşarjda sirkülasyonu durdurun. Tasarlanan şekilde izole edin, etkilenen kişileri uzaklaştırın, SDS acil tedbirlerini uygulayın ve yetkin çevre/işletme ekibini bilgilendirin."
    },
    "references": [
      "OSHA 1910.1200",
      "OSHA 1910.119"
    ],
    "related": [
      "line-breaking-safety",
      "stored-energy-hazards",
      "emergency-response-planning"
    ],
    "keywords": {
      "en": [
        "chemical cleaning piping safety",
        "pipeline chemical flushing checklist",
        "industrial chemical cleaning hazards"
      ],
      "tr": [
        "boru kimyasal temizleme güvenliği",
        "endüstriyel kimyasal flushing kontrol listesi",
        "kimyasal sirkülasyon tehlikeleri"
      ]
    }
  },
  {
    "slug": "compressed-air-blowing-exclusion-zone",
    "title": {
      "en": "Compressed Air Blowing: Discharge Zones, Hose Integrity and Noise",
      "tr": "Basınçlı Hava Üfleme: Deşarj Alanı, Hortum ve Gürültü Güvenliği"
    },
    "category": {
      "en": "Process Safety & Commissioning",
      "tr": "Proses Güvenliği ve Devreye Alma"
    },
    "description": {
      "en": "Air-blow commissioning safeguards for stored pressure, pipe restraints, projectiles and high-noise discharge areas.",
      "tr": "Air blowing devreye alma çalışmalarında hapsolmuş basınç, boru mesnetleri, fırlayan parçalar ve yüksek gürültü önlemleri."
    },
    "overview": {
      "en": "Compressed-air blowing is a high-energy cleaning activity. Temporary lines, hoses and discharge arrangements can fail under pressure, while debris and high noise can injure people well beyond the workfront. Engineers must validate the test boundary, rated components, restraints, air supply, relief protection and discharge direction. The approved blow procedure sets maximum permitted pressure, staging and acceptance criteria; this page does not supply operating values. Before start, coordinate the exclusion area with adjacent contractors, confirm communications and protect access routes from projectiles and noise.",
      "tr": "Basınçlı hava üfleme yüksek enerjili bir temizleme faaliyetidir. Geçici hatlar, hortumlar ve deşarj düzeni basınç altında arızalanabilir; döküntü parçaları ve yüksek gürültü çalışma alanının çok ötesindeki kişileri yaralayabilir. Mühendisler test sınırını, uygun sınıfta elemanları, sabitlemeleri, hava kaynağını, tahliye korumasını ve deşarj yönünü doğrulamalıdır. Onaylı blow prosedürü izin verilen azami basıncı, aşamaları ve kabul kriterini belirler; bu sayfa işletme rakamı vermez. Başlamadan dışlama alanını komşu yüklenicilerle koordine edin, haberleşmeyi doğrulayın ve erişim yollarını fırlayan parça/gürültüden koruyun."
    },
    "hazards": [
      {
        "en": "Stored compressed air releasing through a failed hose or unsupported temporary connection",
        "tr": "Arızalı hortum veya desteksiz geçici bağlantıdan depolanmış basınçlı havanın boşalması"
      },
      {
        "en": "Loose weld slag and construction debris becoming high-speed projectiles at the outlet",
        "tr": "Kaynak cürufu ve inşaat kalıntılarının çıkışta yüksek hızlı fırlayan parçaya dönüşmesi"
      },
      {
        "en": "Extreme impulse and sustained noise exposure around blow discharge zones",
        "tr": "Blow deşarj bölgesinde ani darbeli ve sürekli aşırı gürültü maruziyeti"
      },
      {
        "en": "Unexpected reaction force and movement of poorly restrained spools or bends",
        "tr": "Yetersiz sabitlenmiş spool/dirseklerde ani itki ve hareket"
      },
      {
        "en": "SIMOPS conflict with walking routes and nearby commissioning or lifting teams",
        "tr": "Yaya yolları ile yakındaki devreye alma/kaldırma ekipleri arasında SIMOPS çakışması"
      }
    ],
    "controls": [
      {
        "en": "Require an engineered air-blow plan covering rated pressure boundaries, temporary supports and outlet geometry.",
        "tr": "Basınç sınırlı hat sınırı, geçici mesnet ve çıkış geometrisi içeren mühendislik air-blow planı isteyin."
      },
      {
        "en": "Inspect compressor and receiver protection, temporary hoses, couplings, restraints and instrumentation.",
        "tr": "Kompresör ve hava tankı korumasını, geçici hortumları, kaplinleri, sabitlemeleri ve ölçüm cihazlarını inceleyin."
      },
      {
        "en": "Establish documented discharge, debris and noise exclusion areas with personnel accountability.",
        "tr": "Deşarj, döküntü ve gürültü dışlama alanlarını personel kontrolüyle birlikte belgeleyin."
      },
      {
        "en": "Use radio communication and a named operator with clear stop-work authority before any air admission.",
        "tr": "Hava vermeden önce telsiz iletişimi ve açık durdurma yetkisi olan belirli operatör atayın."
      },
      {
        "en": "Confirm permits, neighbouring activity shutdown and barriers remain valid at each blow sequence.",
        "tr": "Her blow sekansında izin, komşu iş durdurma ve bariyerlerin geçerliliğini doğrulayın."
      },
      {
        "en": "Depressurize and cool/inspect the system as relevant before removing temporary discharge restraints.",
        "tr": "Geçici deşarj sabitlemelerini sökmeden önce uygun şekilde basınçsızlaştırıp sistemi inceleyin."
      }
    ],
    "mistakes": [
      {
        "en": "Using ordinary workshop air hoses without verifying pressure and connection rating.",
        "tr": "Basınç ve bağlantı sınıfı doğrulanmadan sıradan atölye hava hortumu kullanmak."
      },
      {
        "en": "Standing in front of the discharge to watch cleaning progress.",
        "tr": "Temizlik ilerlemesini görmek için deşarj önünde durmak."
      },
      {
        "en": "Leaving a public walkway open behind a temporary line or blow outlet.",
        "tr": "Geçici hat veya blow çıkışı arkasındaki yaya yolunu açık bırakmak."
      },
      {
        "en": "Assuming hearing protection alone replaces an engineered exclusion zone.",
        "tr": "Kulak koruyucuyu mühendislik dışlama alanının yerine geçer saymak."
      }
    ],
    "checks": [
      {
        "en": "Air-blow engineering procedure, scope and stopping criteria are approved",
        "tr": "Air-blow mühendislik prosedürü, kapsamı ve durdurma kriterleri onaylı"
      },
      {
        "en": "Air pressure protection, temporary supports and hoses are inspected",
        "tr": "Hava basınç koruması, geçici mesnetler ve hortumlar kontrol edildi"
      },
      {
        "en": "Outlet, projectile and noise exclusion boundaries are secured",
        "tr": "Çıkış, fırlayan parça ve gürültü dışlama sınırları güvene alındı"
      },
      {
        "en": "Affected contractors received a coordinated SIMOPS notification",
        "tr": "Etkilenen yüklenicilere koordineli SIMOPS bildirimi yapıldı"
      },
      {
        "en": "Named operator has radio contact and a verified shutdown action",
        "tr": "Belirli operatörün telsiz bağlantısı ve doğrulanmış durdurma eylemi var"
      }
    ],
    "ppe": [
      {
        "en": "Hearing protection selected from a noise assessment; it is supplementary to area exclusion",
        "tr": "Gürültü değerlendirmesinden seçilen işitme koruması; alan dışlamasına ek önlemdir"
      },
      {
        "en": "Eye/face and head protection for authorized personnel outside the defined discharge line of fire",
        "tr": "Tanımlı deşarj tehlike hattı dışında görevli yetkili personel için göz/yüz ve baş koruması"
      }
    ],
    "stop": {
      "en": "Stop immediately for hose motion, loss of restraint, uncontrolled debris, increased noise, barrier breach or interrupted communications. Shut off the air supply using the approved procedure; do not approach temporary joints until zero pressure is verified.",
      "tr": "Hortum hareketi, sabitleme kaybı, kontrolsüz döküntü, artan gürültü, bariyer ihlali veya iletişim kesilmesinde hemen durdurun. Hava beslemesini onaylı prosedürle kapatın; sıfır basınç doğrulanmadan geçici bağlantılara yaklaşmayın."
    },
    "references": [
      "OSHA 1910.169",
      "OSHA 1910.95"
    ],
    "related": [
      "pressure-testing-safety",
      "stored-energy-hazards",
      "simops-safety"
    ],
    "keywords": {
      "en": [
        "compressed air blowing safety",
        "air blowing exclusion zone",
        "industrial air blow discharge risk"
      ],
      "tr": [
        "basınçlı hava üfleme güvenliği",
        "air blowing dışlama alanı",
        "hava üfleme deşarj riski"
      ]
    }
  }
];
export const industrialNextGuidesB = industrialFieldGuides(topics);
