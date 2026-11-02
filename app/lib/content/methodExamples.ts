export type MethodLocale = "tr" | "en";
export type BiText = Record<MethodLocale, string>;
export type WorkStep = { title: BiText; hazard: BiText; control: BiText };
export type MethodExample = {
 slug: string; category: BiText; title: BiText; description: BiText; intro: BiText;
 steps: WorkStep[]; checks: BiText[]; stop: BiText;
 faq: { q: BiText; a: BiText }[];
 refs: {title:string;url:string}[];
 related: {url:string;title:BiText}[];
};
// These editorial examples are not engineered plans, permits, or executable procedures.
// No pressure, torque or lifting capacity can be determined from these pages.
export const methodExamples: MethodExample[] = [
  {
    "slug": "process-line-breaking",
    "category": {
      "tr": "Proses ve mekanik",
      "en": "Process and mechanical"
    },
    "title": {
      "tr": "Proses Hattı Açma Çalışma Metodu Örneği",
      "en": "Process Line Breaking Method Statement Example"
    },
    "description": {
      "tr": "Proses boru hattı açma işleri için izolasyon, basınçsızlık, kimyasal kalıntı, PTW ve SIMOPS risklerini içeren saha uygulama örneği.",
      "en": "Practical process line-breaking method statement example: isolations, residual pressure, trapped fluids, permit coordination and SIMOPS safeguards."
    },
    "intro": {
      "tr": "Flanş veya kör tapa açılmadan önce tesis işletmesiyle onaylı sınırlar, izolasyon kayıtları ve sahada doğrulanabilir sıfır enerji durumu belirlenmelidir.",
      "en": "Before loosening a flange or blind, agree verified work boundaries, isolations and release-of-energy checks with the operating authority."
    },
    "steps": [
      {
        "title": {
          "tr": "İş kapsamını ve hat kimliğini doğrula",
          "en": "Verify line identity and scope"
        },
        "hazard": {
          "tr": "Yanlış hat, bilinmeyen ürün veya eksik değişiklik kaydı",
          "en": "Wrong line, unknown substance or unrecorded change"
        },
        "control": {
          "tr": "Onaylı P&ID ve saha etiketini birlikte karşılaştır; tesis sorumlusu iş sınırlarını onaylasın.",
          "en": "Cross-check approved P&IDs and physical tags; obtain operations approval of the exact work boundary."
        }
      },
      {
        "title": {
          "tr": "İzolasyon ve ürün kontrolünü tamamla",
          "en": "Complete isolation and substance controls"
        },
        "hazard": {
          "tr": "Kalan basınç, geri besleme, tehlikeli sıvı veya gaz",
          "en": "Residual pressure, backfeed, hazardous liquid or gas"
        },
        "control": {
          "tr": "Onaylı izolasyon planı, kilitleme ve uygun boşaltma/temizleme kayıtlarını yetkili kişi doğrulasın.",
          "en": "Have authorized personnel verify the approved isolation plan, lockout and applicable draining or cleaning evidence."
        }
      },
      {
        "title": {
          "tr": "Çalışma alanını güvene al",
          "en": "Prepare the controlled work area"
        },
        "hazard": {
          "tr": "Püskürme, döküntü, tutuşma, üçüncü kişilerin maruziyeti",
          "en": "Spray, spill, ignition and bystander exposure"
        },
        "control": {
          "tr": "Sızdırmazlık/atık toplama düzeni, uygun PPE, dışlama alanı ve acil durum hazırlığı oluştur.",
          "en": "Set up suitable containment, PPE, controlled exclusion and emergency arrangements."
        }
      },
      {
        "title": {
          "tr": "Bağlantıyı onaylı prosedürle sök",
          "en": "Open connection under approved procedure"
        },
        "hazard": {
          "tr": "Beklenmeyen ürün çıkışı ve mekanik hareket",
          "en": "Unexpected release and mechanical movement"
        },
        "control": {
          "tr": "Sorumlu gözetim altında yalnızca ekipmana özel onaylı söküm yöntemi uygulanır; koşul değişiminde iş durur.",
          "en": "Under competent supervision use only the equipment-specific approved opening method; stop on unexpected conditions."
        }
      },
      {
        "title": {
          "tr": "Güvenli kapanış ve teslimi doğrula",
          "en": "Verify reinstatement and handback"
        },
        "hazard": {
          "tr": "Eksik sızdırmazlık, açık izolasyon kaydı, hatalı devreye alma",
          "en": "Incomplete sealing, unresolved isolation records, unsafe restart"
        },
        "control": {
          "tr": "Bağlantı kontrolü, gerekli testler, izin kapama ve işletmeye teslim adımlarını belgeli şekilde tamamla.",
          "en": "Record joint inspection, required tests, permit closure and controlled operations handback."
        }
      }
    ],
    "checks": [
      {
        "tr": "P&ID, hat etiketi ve ürün bilgisi tutarlı",
        "en": "P&ID, line tag and process contents match"
      },
      {
        "tr": "İzolasyon ve sıfır enerji kanıtı yetkili kişiyle doğrulandı",
        "en": "Isolation and zero-energy evidence verified by an authorized person"
      },
      {
        "tr": "Döküntü / maruziyet / acil durum hazırlığı hazır",
        "en": "Containment, exposure and emergency arrangements are ready"
      }
    ],
    "stop": {
      "tr": "Beklenmeyen basınç veya ürün, tanımlanmamış izolasyon, gaz alarmı, izin değişikliği veya kontrolsüz üçüncü kişi erişiminde işi durdur.",
      "en": "Stop for unexpected pressure or substance, uncertain isolation, a gas alarm, altered permits or uncontrolled access."
    },
    "faq": [
      {
        "q": {
          "tr": "Bir flanşı gevşetmek sıfır enerji testi sayılır mı?",
          "en": "Is loosening a flange a valid zero-energy test?"
        },
        "a": {
          "tr": "Hayır. Onaylı yöntemde güvenli izolasyon ve basınçsızlık doğrulaması ayrı, önceden planlanmış kontrol olmalıdır.",
          "en": "No. Safe isolation and absence of pressure require a planned, approved verification before opening."
        }
      },
      {
        "q": {
          "tr": "Hangi izinler gerekir?",
          "en": "Which permits are needed?"
        },
        "a": {
          "tr": "İzin sınıfları tesis kurallarına, ürün tehlikelerine ve eşzamanlı işlere göre belirlenir.",
          "en": "Permit categories depend on the site system, process hazards and interacting work."
        }
      }
    ],
    "refs": [
      {
        "title": "OSHA PSM — safe work practices and opening process equipment",
        "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119"
      },
      {
        "title": "OSHA control of hazardous energy",
        "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147"
      }
    ],
    "related": [
      {
        "url": "/knowledge-base/line-breaking-safety",
        "title": {
          "tr": "Hat açma riskleri rehberi",
          "en": "Line breaking safety guide"
        }
      },
      {
        "url": "/field-forms/loto-isolation-verification",
        "title": {
          "tr": "LOTO doğrulama formu",
          "en": "LOTO verification form"
        }
      }
    ]
  },
  {
    "slug": "pneumatic-pressure-testing",
    "category": {
      "tr": "Test ve devreye alma",
      "en": "Testing and commissioning"
    },
    "title": {
      "tr": "Pnömatik Basınç Testi Metot Örneği",
      "en": "Pneumatic Pressure Testing Method Statement Example"
    },
    "description": {
      "tr": "Pnömatik test için tasarım onayı, depolanmış enerji, uzaktan izleme, bariyer, tahliye ve test sonrası kontrol noktalarını ele alan teknik çalışma metodu.",
      "en": "Pneumatic pressure testing method statement example addressing engineering approval, stored energy, remote monitoring, exclusion zones and safe depressurization."
    },
    "intro": {
      "tr": "Sıkıştırılmış gazla test yüksek miktarda depolanmış enerji yaratabilir. Test ortamı, sınırlar ve basınç değerleri ancak yetkili mühendis tarafından onaylanmış prosedürle belirlenir.",
      "en": "Compressed gas can store considerable energy. Test medium, limits and pressures must be defined only in an approved engineered test procedure."
    },
    "steps": [
      {
        "title": {
          "tr": "Test gerekçesini ve mühendislik onayını incele",
          "en": "Review test basis and engineering approval"
        },
        "hazard": {
          "tr": "Uygunsuz test ortamı veya aşırı enerji",
          "en": "Unsuitable medium or excessive stored energy"
        },
        "control": {
          "tr": "Yetkili mühendis test planı, ekipman tasarım sınırları ve daha düşük riskli seçenekleri değerlendirsin.",
          "en": "A competent engineer confirms test plan, design limits and whether a lower-risk alternative is possible."
        }
      },
      {
        "title": {
          "tr": "Sınırları ve geçici bağlantıları doğrula",
          "en": "Verify boundaries and temporary connections"
        },
        "hazard": {
          "tr": "Yetersiz basınç sınıfı, kontrolsüz açıklık",
          "en": "Inadequate pressure rating or uncontrolled openings"
        },
        "control": {
          "tr": "Onaylı test sınırı, izole ekipmanlar, körleme, geçici bağlantı ve kontrol cihazlarını belgeyle eşleştir.",
          "en": "Match boundary, isolation, temporary connections and instruments to the approved test package."
        }
      },
      {
        "title": {
          "tr": "Bariyer, iletişim ve izleme kur",
          "en": "Establish exclusion, communication and monitoring"
        },
        "hazard": {
          "tr": "Yırtılma, savrulan parçalar ve yakın alanda personel",
          "en": "Rupture, projectiles and personnel nearby"
        },
        "control": {
          "tr": "Test enerjisine göre mühendislikçe değerlendirilmiş dışlama alanı, uzaktan okuma, acil müdahale ve tahliye planı uygula.",
          "en": "Implement an engineered exclusion zone, remote readings and emergency/evacuation arrangements."
        }
      },
      {
        "title": {
          "tr": "Testi kontrollü yürüt",
          "en": "Conduct test under controlled supervision"
        },
        "hazard": {
          "tr": "Ani enerji açığa çıkması veya sızıntı",
          "en": "Sudden energy release or leakage"
        },
        "control": {
          "tr": "Yalnızca onaylı prosedür, belirlenmiş rol ve limitlerle ilerle; arıza şüphesinde testi durdur.",
          "en": "Follow only approved procedure, roles and limits; halt for indications of failure."
        }
      },
      {
        "title": {
          "tr": "Basınçsızlaştırma ve teslim",
          "en": "Depressurize and hand back"
        },
        "hazard": {
          "tr": "İçeride kalan basınç ve erken bariyer kaldırma",
          "en": "Trapped pressure and premature barrier removal"
        },
        "control": {
          "tr": "Yetkili ekip basınçsızlığı güvenli yöntemle doğrulayıp test kayıtları ve saha teslimini tamamlasın.",
          "en": "Authorized personnel confirm safe depressurization, test records and formal handback."
        }
      }
    ],
    "checks": [
      {
        "tr": "Onaylı test paketi ve yetkili mühendis mevcut",
        "en": "Approved engineered test package and competent engineer confirmed"
      },
      {
        "tr": "Test devresinin bütün bileşenlerinin uygunluğu doğrulandı",
        "en": "Test circuit component ratings and suitability verified"
      },
      {
        "tr": "Dışlama alanı, uzaktan gözlem ve acil durum yöntemi hazır",
        "en": "Engineered exclusion, remote observation and emergency plan ready"
      }
    ],
    "stop": {
      "tr": "Onaylanmamış basınç değişikliği, arızalı manometre, sızıntı, personelin dışlama alanına girmesi veya beklenmeyen ses ve deformasyonda testi durdur.",
      "en": "Stop for unapproved pressure changes, instrument faults, leakage, exclusion breaches, abnormal sound or deformation."
    },
    "faq": [
      {
        "q": {
          "tr": "Test basıncı bu sayfadan belirlenir mi?",
          "en": "Does this page specify a test pressure?"
        },
        "a": {
          "tr": "Hayır. Test basıncı ve kabul kriterleri tasarım kodu ve yetkili mühendis tarafından belirlenir.",
          "en": "No. Test pressure and acceptance criteria must be established by the governing design code and competent engineer."
        }
      },
      {
        "q": {
          "tr": "Hidrostatik test yerine pnömatik test seçmek güvenli mi?",
          "en": "Is pneumatic testing as safe as hydrostatic testing?"
        },
        "a": {
          "tr": "Genellikle daha yüksek depolanmış enerji riski oluşturabilir; test yönteminin gerekçesi mühendislik değerlendirmesi gerektirir.",
          "en": "Pneumatic tests can carry significantly greater stored-energy hazards; the choice requires engineering justification."
        }
      }
    ],
    "refs": [
      {
        "title": "HSE — Pressure testing and non-destructive testing",
        "url": "https://www.hse.gov.uk/comah/sragtech/techmeasndt.htm"
      },
      {
        "title": "HSE — Storage of flammable liquids and pressure testing",
        "url": "https://www.hse.gov.uk/pubns/priced/hsg176.pdf"
      }
    ],
    "related": [
      {
        "url": "/knowledge-base/stored-energy-hazards",
        "title": {
          "tr": "Depolanmış enerji",
          "en": "Stored-energy hazards"
        }
      },
      {
        "url": "/field-forms/ptw-shift-handover",
        "title": {
          "tr": "PTW vardiya devri",
          "en": "PTW shift handover"
        }
      }
    ]
  },
  {
    "slug": "grating-installation",
    "category": {
      "tr": "Yüksekte çalışma",
      "en": "Work at height"
    },
    "title": {
      "tr": "Izgara (Grating) Montajı ve Açıklık Kontrol Metodu",
      "en": "Grating Installation and Floor Opening Method Statement"
    },
    "description": {
      "tr": "Grating sökme ve montaj işlerinde açık döşeme, düşen malzeme, güvenli erişim, kaldırma, bariyer ve yeniden açılış kontrolleri.",
      "en": "Grating installation method statement example covering floor openings, dropped materials, edge protection, safe access, lifting and reopening checks."
    },
    "intro": {
      "tr": "Izgaranın çıkarılması veya değiştirilmesi çalışma alanında anında düşme tehlikesi yaratabilir; bariyer ve alternatif geçiş yöntemi önceden hazırlanmalıdır.",
      "en": "Removing or replacing floor grating can immediately create a fall hazard. Secure barriers and an alternative access route before work starts."
    },
    "steps": [
      {
        "title": {
          "tr": "Açıklık ve erişimi önceden planla",
          "en": "Plan openings and access"
        },
        "hazard": {
          "tr": "Beklenmeyen boşluk ve geçiş ihtiyacı",
          "en": "Unexpected opening and access demand"
        },
        "control": {
          "tr": "Montaj çizimini, izin sınırını ve alternatif yaya yolunu yetkili ekiple kontrol et.",
          "en": "Confirm installation drawings, permit boundaries and alternative pedestrian routes."
        }
      },
      {
        "title": {
          "tr": "Toplu koruma önlemlerini kur",
          "en": "Install collective protection"
        },
        "hazard": {
          "tr": "Kenar veya açıklıktan düşme",
          "en": "Falls through edges or floor openings"
        },
        "control": {
          "tr": "Mühendislikçe uygun sabit bariyer, geçici kapak veya erişim platformunu sökümden önce hazırla.",
          "en": "Provide suitable engineered edge protection, secure covers or platforms before removal."
        }
      },
      {
        "title": {
          "tr": "Yükü ve düşen cisim riskini yönet",
          "en": "Manage handling and falling objects"
        },
        "hazard": {
          "tr": "Izgara düşmesi, el sıkışması ve aşağıdaki kişilere çarpma",
          "en": "Dropped grating, hand injuries and persons below"
        },
        "control": {
          "tr": "Yetkin ekip ve uygun kaldırma yöntemi ile alt bölge dışlama alanı, sabitleme ve haberleşme uygula.",
          "en": "Use competent personnel, suitable handling equipment, exclusion below and clear communications."
        }
      },
      {
        "title": {
          "tr": "Montaj ve bağlantıları doğrula",
          "en": "Install and verify fixings"
        },
        "hazard": {
          "tr": "Yerinden oynayan ızgara, erken üzerine basma",
          "en": "Displaced panels or premature loading"
        },
        "control": {
          "tr": "İmalatçı/tasarım gerekliliklerine göre bağlantıları ve taşıyıcılığı yetkili kişi kontrol etsin.",
          "en": "Have a competent person verify supports and fixings against drawings and manufacturer requirements."
        }
      },
      {
        "title": {
          "tr": "Yürüyüş yolunu yeniden aç",
          "en": "Reopen walkway after acceptance"
        },
        "hazard": {
          "tr": "Eksik bağlantı veya kontrolsüz erişim",
          "en": "Missing fasteners or uncontrolled access"
        },
        "control": {
          "tr": "Saha teslimi, açıklık kontrolü ve yük taşıma uygunluğu doğrulanana kadar bariyeri kaldırma.",
          "en": "Keep the area restricted until acceptance, opening checks and load suitability are verified."
        }
      }
    ],
    "checks": [
      {
        "tr": "Açıklık öncesi alternatif geçiş ve bariyer planlandı",
        "en": "Alternative route and barriers ready before opening"
      },
      {
        "tr": "Alt bölge erişimi kapatıldı ve malzeme sabitlendi",
        "en": "Lower-level access excluded and materials secured"
      },
      {
        "tr": "Montaj bağlantıları yetkili kabulünden geçti",
        "en": "Fixings accepted by a competent person"
      }
    ],
    "stop": {
      "tr": "Korumasız açıklık, kontrolsüz düşen cisim, uygunsuz platform veya eksik bağlantı tespitinde işi durdur.",
      "en": "Stop for unprotected openings, uncontrolled dropped-object exposure, unsuitable platforms or missing fixings."
    },
    "faq": [
      {
        "q": {
          "tr": "Montaj bitince bariyer hemen kaldırılabilir mi?",
          "en": "Can barriers be removed as soon as panels are placed?"
        },
        "a": {
          "tr": "Hayır. Uygun bağlantı ve taşıma kapasitesi doğrulanmadan yürüyüş yoluna izin verilmemelidir.",
          "en": "No. Access should remain restricted until supports, fixings and suitability are verified."
        }
      },
      {
        "q": {
          "tr": "Sadece uyarı bandı yeterli mi?",
          "en": "Is warning tape always adequate?"
        },
        "a": {
          "tr": "Düşme tehlikesini fiziksel olarak önlemeyen bant tek başına yeterli koruma sayılmamalıdır; uygun toplu koruma seçilmelidir.",
          "en": "Tape alone should not be treated as effective fall prevention where a physical barrier or cover is required."
        }
      }
    ],
    "refs": [
      {
        "title": "HSE — Work at height in construction",
        "url": "https://www.hse.gov.uk/construction/faq-height.htm"
      },
      {
        "title": "HSE — Fragile surfaces and fall prevention",
        "url": "https://www.hse.gov.uk/construction/safetytopics/fragile.htm"
      }
    ],
    "related": [
      {
        "url": "/knowledge-base/working-at-height",
        "title": {
          "tr": "Yüksekte çalışma",
          "en": "Work at height"
        }
      },
      {
        "url": "/field-forms/job-safety-analysis",
        "title": {
          "tr": "JSA formu",
          "en": "JSA worksheet"
        }
      }
    ]
  },
  {
    "slug": "chain-block-lifting",
    "category": {
      "tr": "Kaldırma ve taşıma",
      "en": "Lifting and handling"
    },
    "title": {
      "tr": "Trifor / Zincirli Ceraskal ile Yük Kaldırma Metodu",
      "en": "Chain Hoist and Tirfor Lifting Method Statement Example"
    },
    "description": {
      "tr": "Trifor ve zincirli ceraskal ile kaldırma işlerinde ankraj, yük sınırı, sapan, erişim, düşen yük ve iletişim kontrollerini içeren saha metodu.",
      "en": "Chain hoist and tirfor method statement example covering approved anchor points, rated equipment, rigging, exclusion and supervised load movement."
    },
    "intro": {
      "tr": "Trifor veya ceraskal kullanımı basit görünse de yanlış ankraj, beklenmeyen yük hareketi ve kapasite aşımı ciddi tehlikelerdir. Plan ve ekipman seçimi yetkin kişiye aittir.",
      "en": "Manual lifting devices still require competent planning: anchor strength, load paths, rated capacity and unintended movement must be controlled."
    },
    "steps": [
      {
        "title": {
          "tr": "Yük ve kaldırma planını doğrula",
          "en": "Confirm load and lift plan"
        },
        "hazard": {
          "tr": "Bilinmeyen ağırlık merkezi ve yük karakteri",
          "en": "Unknown centre of gravity and load characteristics"
        },
        "control": {
          "tr": "Yetkin kişi yük verisini, kaldırma yönünü ve iş planını doğrulasın.",
          "en": "Have a competent person verify load information, lifting direction and planned sequence."
        }
      },
      {
        "title": {
          "tr": "Ankraj ve ekipmanı kontrol et",
          "en": "Verify anchors and equipment"
        },
        "hazard": {
          "tr": "Uygunsuz bağlantı, kapasite aşımı ve arıza",
          "en": "Unsuitable anchors, overload or equipment failure"
        },
        "control": {
          "tr": "Onaylı kapasitedeki ankraj, ekipman kimliği ve muayene kayıtlarını karşılaştır.",
          "en": "Match approved anchor capacity, device identification and inspection records."
        }
      },
      {
        "title": {
          "tr": "Dışlama bölgesi ve iletişim oluştur",
          "en": "Establish exclusion and communication"
        },
        "hazard": {
          "tr": "Yük altında çalışma, sıkışma ve salınım",
          "en": "Working below load, trapping and load swing"
        },
        "control": {
          "tr": "Yük rotasını bariyerle sınırla; operatör, işaretçi ve gözcü rolleri net olsun.",
          "en": "Protect the load route, exclude bystanders and confirm operator/signaler roles."
        }
      },
      {
        "title": {
          "tr": "Yük hareketini yetkin gözetimle yap",
          "en": "Move load under competent supervision"
        },
        "hazard": {
          "tr": "Ani yük kayması veya kontrol kaybı",
          "en": "Sudden load movement or loss of control"
        },
        "control": {
          "tr": "Onaylı ekipman talimatına uy; uygunsuz ses, deformasyon veya sürtünmede hareketi durdur.",
          "en": "Follow approved equipment instructions and halt for deformation, abnormal sound or loss of control."
        }
      },
      {
        "title": {
          "tr": "Yükü emniyete al ve düzeni kaldır",
          "en": "Secure load and demobilize"
        },
        "hazard": {
          "tr": "Desteksiz yük ve kontrolsüz söküm",
          "en": "Unsupported load and uncontrolled removal"
        },
        "control": {
          "tr": "Yükün bağımsız güvenli desteğini doğruladıktan sonra düzeni kontrollü çöz.",
          "en": "Confirm the load is safely supported independently before releasing rigging."
        }
      }
    ],
    "checks": [
      {
        "tr": "Yük ağırlığı, ağırlık merkezi ve ankraj onaylı",
        "en": "Load, centre of gravity and anchor verified"
      },
      {
        "tr": "Trifor/ceraskal ve sapan muayene kayıtları uygun",
        "en": "Hoist and rigging inspection records valid"
      },
      {
        "tr": "Yük altında insan bulunmuyor",
        "en": "Nobody is positioned under the suspended load"
      }
    ],
    "stop": {
      "tr": "Ankraj belirsizliği, etiketlenmemiş ekipman, aşırı yük şüphesi, personelin yük altında bulunması veya kontrolsüz hareket halinde durdur.",
      "en": "Stop for unknown anchor strength, unverified equipment ratings, suspected overload, persons below the load or uncontrolled movement."
    },
    "faq": [
      {
        "q": {
          "tr": "İskeleye ceraskal bağlanabilir mi?",
          "en": "Can a chain hoist be attached to a scaffold?"
        },
        "a": {
          "tr": "Yalnızca tasarlanmış ve yetkili mühendis/üretici tarafından bu yük için doğrulanmış ankraj noktalarında; genel iskele elemanı otomatik olarak uygun ankraj değildir.",
          "en": "Only where a purpose-designed attachment is verified for the loads by competent designers or manufacturer instructions; ordinary scaffold tubes are not automatically suitable anchors."
        }
      },
      {
        "q": {
          "tr": "Elle çekilen ekipman da kaldırma planı gerektirir mi?",
          "en": "Does hand-operated lifting require planning?"
        },
        "a": {
          "tr": "Evet. Mekanik veya manuel güç fark etmeksizin yük kaldırma riskleri uygun yetkinlikle planlanmalıdır.",
          "en": "Yes. Both powered and manually operated hoists require risk-appropriate competent planning."
        }
      }
    ],
    "refs": [
      {
        "title": "HSE — Lifting operations",
        "url": "https://www.hse.gov.uk/construction/safetytopics/lifting-operations.htm"
      },
      {
        "title": "HSE — LOLER overview",
        "url": "https://www.hse.gov.uk/work-equipment-machinery/loler-overview.htm"
      }
    ],
    "related": [
      {
        "url": "/tools/sling-tension",
        "title": {
          "tr": "Sapan kuvvet aracı",
          "en": "Sling tension tool"
        }
      },
      {
        "url": "/field-forms/lifting-operation-plan-review",
        "title": {
          "tr": "Kaldırma plan kontrol formu",
          "en": "Lifting-plan review worksheet"
        }
      }
    ]
  },
  {
    "slug": "welding-near-operating-plant",
    "category": {
      "tr": "Sıcak çalışma ve SIMOPS",
      "en": "Hot work and SIMOPS"
    },
    "title": {
      "tr": "Çalışan Tesiste Kaynak İşinin Güvenli Metodu",
      "en": "Welding Near Operating Plant Method Statement Example"
    },
    "description": {
      "tr": "İşletmedeki tesiste kaynak işleri için sıcak çalışma izni, gaz tehlikeleri, kıvılcım, kaynak dumanı, SIMOPS ve yangın gözcüsü kontrol dizisi.",
      "en": "Work method example for welding near operating plant with hot-work permits, ignition sources, fume extraction, nearby operations and fire watch checks."
    },
    "intro": {
      "tr": "İşletmede proses devam ederken kaynak çalışması; yangın, patlama, duman ve diğer ekiplerin maruziyetini aynı anda yönetmeyi gerektirir.",
      "en": "Welding in or near an operating process area requires coordinated controls for ignition, exposure to fumes and impacts on neighbouring work."
    },
    "steps": [
      {
        "title": {
          "tr": "İş yeri ve eşzamanlı faaliyetleri değerlendir",
          "en": "Review process area and SIMOPS"
        },
        "hazard": {
          "tr": "Yakındaki yanıcı proses, hat açma veya transfer",
          "en": "Nearby flammable process, line breaking or transfers"
        },
        "control": {
          "tr": "İşletme ve PTW yetkilileri ortak saha kontrolüyle izin, alan ve çatışan işleri doğrulasın.",
          "en": "Coordinate work boundaries, permits and conflicting operations with the site operations and PTW authorities."
        }
      },
      {
        "title": {
          "tr": "Yanıcıları ve kıvılcım yolunu kontrol et",
          "en": "Control combustibles and sparks"
        },
        "hazard": {
          "tr": "Düşen kıvılcım, açık geçiş, gizli yanıcı malzeme",
          "en": "Spark travel, penetrations and concealed combustibles"
        },
        "control": {
          "tr": "Alt katlar, açıklıklar, yanıcı birikimi ve koruma yöntemlerini saha bazında değerlendir.",
          "en": "Assess lower levels, openings, combustible deposits and site-specific protections."
        }
      },
      {
        "title": {
          "tr": "Maruziyet ve ekipman kontrollerini hazırla",
          "en": "Prepare exposure and equipment safeguards"
        },
        "hazard": {
          "tr": "Kaynak dumanı, UV, yangın ve elektrik",
          "en": "Welding fume, UV exposure, fire and electricity"
        },
        "control": {
          "tr": "Havalandırma/duman emişi ve uygun solunum/göz korumasını iş değerlendirmesine göre sağla.",
          "en": "Use risk-appropriate fume extraction/ventilation and respiratory and eye protection."
        }
      },
      {
        "title": {
          "tr": "Kaynağı kontrollü yürüt",
          "en": "Carry out supervised welding"
        },
        "hazard": {
          "tr": "Atmosfer değişimi ve gözcüsüz ateşleme",
          "en": "Changing atmosphere and unmonitored ignition"
        },
        "control": {
          "tr": "İzin koşullarına, gerekli atmosfer ölçümü ve yangın gözcüsü görevine uy; değişimde işi durdur.",
          "en": "Follow permit conditions, applicable gas monitoring and fire watch duties; stop on change."
        }
      },
      {
        "title": {
          "tr": "Yangın gözlemi ve izin kapanışı",
          "en": "Fire checks and permit closure"
        },
        "hazard": {
          "tr": "Sönmemiş sıcak nokta, geç tutuşma, eksik teslim",
          "en": "Residual hot spots, delayed ignition, missed handback"
        },
        "control": {
          "tr": "İşyerinin belirlediği yangın gözcülüğü ve izin kapama kontrolünü belgeleyerek bitir.",
          "en": "Record the site-required post-work fire watch and formal permit close-out."
        }
      }
    ],
    "checks": [
      {
        "tr": "Sıcak çalışma izni ve komşu faaliyet analizi onaylı",
        "en": "Hot work permit and adjacent operations reviewed"
      },
      {
        "tr": "Yanıcılar ve kıvılcım yolu kontrol edildi",
        "en": "Combustibles and spark travel controlled"
      },
      {
        "tr": "Duman maruziyeti, gözcü ve yangın müdahalesi hazır",
        "en": "Fume exposure, fire watch and firefighting readiness confirmed"
      }
    ],
    "stop": {
      "tr": "Gaz alarmı, yeni proses kaçağı, kaybolan duman emişi, engellenen yangın gözcüsü veya izin şartlarında değişiklikte dur.",
      "en": "Stop for gas alarms, new process leaks, failed fume extraction, unavailable fire watch or changed permit conditions."
    },
    "faq": [
      {
        "q": {
          "tr": "Kaynak dumanı yalnızca kapalı alanda mı tehlikeli?",
          "en": "Are welding fumes only a concern indoors?"
        },
        "a": {
          "tr": "Hayır. Açık alanlarda da maruziyet değerlendirilmeli, görev ve koşula uygun koruma uygulanmalıdır.",
          "en": "No. Exposure must be assessed outdoors too, with task-appropriate controls."
        }
      },
      {
        "q": {
          "tr": "Sıcak çalışma izni bu örnekten oluşturulur mu?",
          "en": "Does this example generate a hot-work permit?"
        },
        "a": {
          "tr": "Hayır. Resmî izin tesisin PTW sisteminden ve yetkili kişilerce düzenlenmelidir.",
          "en": "No. The operating site's authorized PTW system governs permit issue."
        }
      }
    ],
    "refs": [
      {
        "title": "HSE — Control welding fumes",
        "url": "https://www.hse.gov.uk/welding/protect-your-workers/avoid-reduce-exposure.htm"
      },
      {
        "title": "OSHA — Process safety management coordination",
        "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119"
      }
    ],
    "related": [
      {
        "url": "/field-forms/hot-work-prestart-review",
        "title": {
          "tr": "Sıcak çalışma kontrol formu",
          "en": "Hot work pre-start checklist"
        }
      },
      {
        "url": "/tools/simops",
        "title": {
          "tr": "SIMOPS planlama aracı",
          "en": "SIMOPS planning tool"
        }
      }
    ]
  },
  {
    "slug": "flange-assembly-and-bolt-up",
    "category": {
      "tr": "Proses ve mekanik",
      "en": "Process and mechanical"
    },
    "title": {
      "tr": "Flanş Montajı ve Kontrollü Civata Sıkma Metodu",
      "en": "Flange Assembly and Controlled Bolt-Up Method Statement"
    },
    "description": {
      "tr": "Flanş bağlantısı montajında doğru conta, cıvata malzemesi, tasarım prosedürü, hizalama, tork kayıtları ve sızdırmazlık kontrolü için metot örneği.",
      "en": "Flange assembly and controlled bolt-up method example covering correct components, alignment, approved tightening procedure, quality records and controlled leak checks."
    },
    "intro": {
      "tr": "Flanş cıvatasının sıkılması tek başına sızdırmazlık garantisi değildir. Conta seçimi, bağlantı yüzeyi ve sıkma yöntemi onaylı mühendislik dokümanlarına dayanmalıdır.",
      "en": "Tightening bolts alone does not prove a leak-tight joint. Component selection, flange faces and tightening procedures must follow approved engineering documentation."
    },
    "steps": [
      {
        "title": {
          "tr": "Bağlantıyı ve teknik şartnameyi doğrula",
          "en": "Identify joint and specification"
        },
        "hazard": {
          "tr": "Yanlış flanş sınıfı, conta veya malzeme",
          "en": "Wrong flange class, gasket or material"
        },
        "control": {
          "tr": "Onaylı izometrik, malzeme listesi ve conta/cıvata gerekliliklerini karşılaştır.",
          "en": "Match approved isometric, material records and gasket/fastener requirements."
        }
      },
      {
        "title": {
          "tr": "İzolasyon ve çalışma sınırını doğrula",
          "en": "Verify isolation and boundaries"
        },
        "hazard": {
          "tr": "Basınç veya ürün kalıntısı, yanlış ekipman",
          "en": "Pressure, residual product or wrong equipment"
        },
        "control": {
          "tr": "Yetkili operasyon görevlisi iş izni, izolasyon ve güvenli erişim şartlarını doğrulasın.",
          "en": "Have operations verify work permit, isolation status and safe access."
        }
      },
      {
        "title": {
          "tr": "Yüzey ve ekipmanı kontrol et",
          "en": "Inspect joint surfaces and tools"
        },
        "hazard": {
          "tr": "Bozuk sızdırmazlık yüzeyi, uygunsuz aparat",
          "en": "Damaged sealing face or unsuitable equipment"
        },
        "control": {
          "tr": "Yetkili ekip yüzey durumunu, ekipman kontrolünü ve üretici talimatlarını doğrulasın.",
          "en": "Have competent personnel confirm sealing faces, tool condition and equipment instructions."
        }
      },
      {
        "title": {
          "tr": "Onaylı cıvata sıkma dizisini uygula",
          "en": "Apply approved bolt tightening sequence"
        },
        "hazard": {
          "tr": "Düzensiz yük dağılımı, sıkışma ve aşırı kuvvet",
          "en": "Uneven loading, pinch points and excessive force"
        },
        "control": {
          "tr": "Tork değerleri ve sıra yalnızca onaylı mühendislik prosedüründen alınır, kayıt altına alınır.",
          "en": "Take torque values and tightening sequence only from the approved engineering procedure and record completion."
        }
      },
      {
        "title": {
          "tr": "Kalite kontrol ve yeniden devreye alma",
          "en": "Quality checks and reinstatement"
        },
        "hazard": {
          "tr": "Kaçak veya yanlış devreye alma",
          "en": "Leakage or unsafe restart"
        },
        "control": {
          "tr": "Muayene, gerektiği durumda onaylı sızdırmazlık testleri ve işletmeye teslim kontrolü yap.",
          "en": "Perform inspections, any specified approved leak checks and controlled operations handover."
        }
      }
    ],
    "checks": [
      {
        "tr": "Doğru malzeme, conta ve tasarım referansı hazır",
        "en": "Correct materials, gasket and design reference confirmed"
      },
      {
        "tr": "İzolasyon ve mekanik tamamlanma kayıtları mevcut",
        "en": "Isolation and mechanical-completion records available"
      },
      {
        "tr": "Sıkma prosedürü ve kalite kabul kriteri onaylı",
        "en": "Approved bolt-up process and acceptance criteria available"
      }
    ],
    "stop": {
      "tr": "Eksik conta malzemesi, hasarlı yüzey, belirsiz tork referansı veya izolasyon şüphesinde işi durdur.",
      "en": "Stop for incorrect gaskets, damaged faces, missing approved torque references or uncertain isolation."
    },
    "faq": [
      {
        "q": {
          "tr": "Burada standart tork değeri var mı?",
          "en": "Does this page provide standard torque values?"
        },
        "a": {
          "tr": "Hayır. Tork ve sıkma dizisi bağlantının tasarımına göre yetkili mühendislik prosedüründe belirlenir.",
          "en": "No. Values and sequence are engineering-specific and must come from an approved work pack."
        }
      },
      {
        "q": {
          "tr": "İş bitince hat hemen basınçlandırılır mı?",
          "en": "Can the line be pressurized immediately after assembly?"
        },
        "a": {
          "tr": "İşletme onayı, mekanik tamamlanma ve gerekli kontroller tamamlanmadan basınçlandırma yapılmamalıdır.",
          "en": "Only after operations authorization, mechanical completion and any required examinations."
        }
      }
    ],
    "refs": [
      {
        "title": "OSHA PSM — mechanical integrity, work practices",
        "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119"
      },
      {
        "title": "HSE — Pressure systems integrity and examinations",
        "url": "https://www.hse.gov.uk/comah/sragtech/techmeasndt.htm"
      }
    ],
    "related": [
      {
        "url": "/knowledge-base/line-breaking-safety",
        "title": {
          "tr": "Hat açma güvenliği",
          "en": "Line breaking safety"
        }
      },
      {
        "url": "/field-forms/job-safety-analysis",
        "title": {
          "tr": "JSA saha formu",
          "en": "JSA worksheet"
        }
      }
    ]
  }
];
export const getMethodExample = (slug:string) => methodExamples.find(e => e.slug===slug);
