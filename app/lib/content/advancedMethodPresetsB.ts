import type { AdvancedMethodPreset } from "./advancedMethodPresets";
// Specialist commissioning/maintenance presets: not authorization to begin work.
export const advancedMethodPresetsB: AdvancedMethodPreset[] = [
  {
    "number": 31,
    "slug": "cable-pulling-and-termination",
    "icon": "🔌",
    "iconBg": "bg-amber-400/10",
    "button": "bg-amber-400 hover:bg-amber-300",
    "activity": {
      "tr": "Endüstriyel Kablo Çekimi ve Sonlandırma",
      "en": "Industrial Cable Pulling and Termination"
    },
    "description": {
      "tr": "Kablo güzergâhı, makara yükü, elleçleme, enerjisizlik, sonlandırma ve test öncesi kontrol için 6 aşamalı metot.",
      "en": "Six-stage method for cable route, reel handling, pull tension, de-energization, termination and pretest checks."
    },
    "responsibilities": {
      "tr": "Elektrik Süpervizörü: Kablo çizimlerini, izolasyonu ve test planını doğrular.\nYetkili Elektrikçi: Sonlandırma ve enerjisizlik kontrollerinden sorumludur.\nKablo Ekibi Sorumlusu: Güzergâh, çekme ekipmanı ve iletişimi yönetir.\nHSE: Sıkışma, düşme ve elektrik erişim kontrolünü inceler.",
      "en": "Electrical Supervisor: Confirms cable drawings, isolation and test plan.\nQualified Electrician: Responsible for termination and dead-work verification.\nCable Pulling Lead: Coordinates route, equipment and communication.\nHSE: Reviews pinch points, falls and electrical access."
    },
    "competency": {
      "tr": "Elektrik güvenliği, kablo çekme ve sonlandırma talimatları, ekipman muayenesi ve enerjisizlik testinde görev bazlı yetkili kişiler.",
      "en": "Task-competent personnel in electrical safety, cable pulling and termination instructions, tool inspections and absence-of-voltage testing."
    },
    "ppe": {
      "tr": "Baş/göz/el/ayak koruması; keskin kenar veya kablo çekimi için uygun eldiven; elektrik işi için risk değerlendirmesine göre ilave özel koruma.",
      "en": "Head, eye, hand and foot protection with task-suitable gloves for sharp edges; additional electrical PPE as assessed."
    },
    "tools": {
      "tr": "Onaylı kablo/terminal çizimleri, uygun makara standı, çekme arabası ve kılavuzlar, kalibrasyonu uygun test cihazları, uygun sonlandırma aletleri.",
      "en": "Approved cable and termination drawings, rated reel stands and pullers, cable rollers/guides, suitable tested instruments and termination tools."
    },
    "permits": {
      "tr": "Elektrik PTW/LOTO, kablo güzergâhı erişim izni, yük kaldırma, gerekiyorsa yüksekte çalışma ve SIMOPS kontrolleri.",
      "en": "Electrical PTW/LOTO, route access, lifting, any work-at-height authorization and SIMOPS checks."
    },
    "environment": {
      "tr": "Kesik kablo izolasyonlarını ve makaraları ayır; korumalı geçiş bırak, kablo atıklarını uygun geri dönüşüme yönlendir.",
      "en": "Segregate insulation offcuts and reels, keep safe access and send appropriate cable waste to recycling."
    },
    "stepOwner": {
      "tr": "Elektrik Süpervizörü / Yetkili Elektrikçi",
      "en": "Electrical Supervisor / Qualified Electrician"
    },
    "method": {
      "intro": {
        "tr": "Kablo kesiti, çekme kuvveti, bükülme yarıçapı ve test gerilimi ürün/tesis tasarımına göre belirlenir; bu şablon sayısal limit vermez.",
        "en": "Cable pull force, bending radius and test voltage come from approved design and manufacturer data; this template provides no engineering values."
      },
      "description": {
        "tr": "Endüstriyel kablo güzergâhının hazırlanması, kontrollü çekim ve enerjisiz sonlandırma için çalışma metodu.",
        "en": "Method for industrial cable route preparation, controlled pulling and de-energized termination."
      },
      "steps": [
        {
          "title": {
            "tr": "Kablo ve güzergâh belgelerini kontrol et",
            "en": "Review cable and route documentation"
          },
          "hazard": {
            "tr": "Yanlış kablo, yetersiz kesit veya yanlış güzergâh",
            "en": "Wrong cable, unsuitable specification or route"
          },
          "control": {
            "tr": "Çizimleri, kablo kimliğini, uzunluğu ve terminal eşleşmesini yetkili kişiyle doğrula.",
            "en": "Verify drawings, cable identity, length and terminal schedule with qualified personnel."
          }
        },
        {
          "title": {
            "tr": "Makara ve erişim düzenini kur",
            "en": "Set up reel and access arrangements"
          },
          "hazard": {
            "tr": "Makara devrilmesi ve sıkışma",
            "en": "Reel overturn or trapping"
          },
          "control": {
            "tr": "Uygun makara standı, kaldırma planı, güvenli çalışma alanı ve roller yerleşimini doğrula.",
            "en": "Confirm rated reel stands, handling method, safe access and roller arrangement."
          }
        },
        {
          "title": {
            "tr": "Enerji ve komşu devreleri ayır",
            "en": "Isolate electrical and adjacent circuits"
          },
          "hazard": {
            "tr": "Elektrik çarpması, beklenmeyen canlı devre",
            "en": "Electric shock or unexpected energized circuits"
          },
          "control": {
            "tr": "Yetkili elektrikçi LOTO, devre kimliği ve uygun test cihazıyla enerjisizliği doğrulasın.",
            "en": "Qualified electrician identifies circuits, applies approved isolation and verifies de-energization."
          }
        },
        {
          "title": {
            "tr": "Kabloyu kontrollü çek",
            "en": "Perform controlled cable pull"
          },
          "hazard": {
            "tr": "Ani çekme, el sıkışması, kablo hasarı",
            "en": "Sudden pull, pinch points or damaged cable"
          },
          "control": {
            "tr": "Uygun çekme ekipmanı, haberleşme ve üretici bükülme/kuvvet kriterlerini uygula.",
            "en": "Use rated pull equipment, clear communication and manufacturer-defined bend/tension limits."
          }
        },
        {
          "title": {
            "tr": "Sonlandırma ve korumayı tamamla",
            "en": "Complete termination and protection"
          },
          "hazard": {
            "tr": "Hatalı bağlantı, keskin kenar, su girişi",
            "en": "Incorrect termination, sharp edges or ingress"
          },
          "control": {
            "tr": "Yetkili elektrikçi bağlantı, izolasyon, kablo rakoru ve etiketleri onaylı prosedüre göre kontrol etsin.",
            "en": "Qualified electrician checks termination, insulation, glands and labels against approved procedure."
          }
        },
        {
          "title": {
            "tr": "Test, teslim ve yeniden enerji kontrolü",
            "en": "Verify tests and return to service"
          },
          "hazard": {
            "tr": "Beklenmeyen enerji, eksik terminal kaydı",
            "en": "Unexpected energization or incomplete test records"
          },
          "control": {
            "tr": "Yetkili test/enerjilendirme prosedürünü tamamla; ekip uzak ve korumalar yerinde olmadan besleme açma.",
            "en": "Follow authorized test/energization steps; never restore supply before people are clear and guards in place."
          }
        }
      ],
      "checks": [
        {
          "tr": "Kablo çizimleri, güzergâh ve ürün kriterleri doğrulandı",
          "en": "Cable schedule, route and product specifications verified"
        },
        {
          "tr": "Makara/çekme ekipmanı ve izolasyon planı uygun",
          "en": "Reel/pulling devices and isolation plan suitable"
        },
        {
          "tr": "Sonlandırma, test ve yetkili enerji açma sorumluları belirli",
          "en": "Termination, test and re-energization responsibilities assigned"
        }
      ],
      "stop": {
        "tr": "İzolasyon belirsizliği, çekme ekipmanı arızası, kablo hasarı, makara dengesizliği veya iletişim kaybında işi durdur.",
        "en": "Stop for uncertain isolation, defective pull equipment, cable damage, unstable reels or lost communication."
      },
      "refs": [
        {
          "title": "OSHA Electrical Safety-Related Work Practices — 1910.333",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333"
        },
        {
          "title": "OSHA Control of Hazardous Energy — 1910.147",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147"
        }
      ]
    }
  },
  {
    "number": 32,
    "slug": "rotating-equipment-alignment",
    "icon": "⚙️",
    "iconBg": "bg-sky-400/10",
    "button": "bg-sky-400 hover:bg-sky-300",
    "activity": {
      "tr": "Pompa ve Döner Ekipman Hizalama",
      "en": "Pump and Rotating Equipment Alignment"
    },
    "description": {
      "tr": "Kaplin muhafazası, LOTO, şaft hareketi, lazer hizalama, sıkışma ve kontrollü devreye alma için 6 iş adımı.",
      "en": "Six-stage pump/rotating equipment alignment method covering guards, LOTO, shaft movement, laser alignment and reinstatement."
    },
    "responsibilities": {
      "tr": "Mekanik Süpervizör: Bakım kapsamı, izolasyon ve ekip iş dağılımını onaylar.\nYetkili Mekanikçi: Hizalama ve ekipman kontrolünü yapar.\nİzolasyon Yetkilisi: Enerjisizliği doğrular.\nİşletme: Devreye alma ve test yürütmesini onaylar.",
      "en": "Mechanical Supervisor: Authorizes maintenance scope, isolation and crew duties.\nCompetent Mechanic: Performs alignment and equipment checks.\nIsolation Authority: Verifies zero energy.\nOperations: Authorizes return-to-service checks."
    },
    "competency": {
      "tr": "Pompa/kaplin hizalama, LOTO, mekanik koruyucu yönetimi, ölçüm ekipmanı ve ekipmana özel üretici talimatlarında yetkin mekanik personel.",
      "en": "Competent mechanics in pump/coupling alignment, LOTO, guard management, measurement instruments and OEM instructions."
    },
    "ppe": {
      "tr": "Uygun baret, gözlük, eldiven, ayakkabı; lazer cihazı ve yağ/kimyasal maruziyetine göre gereken ilave koruma.",
      "en": "Task-suitable helmet, eye protection, gloves and footwear; supplementary laser and lubricant protection as assessed."
    },
    "tools": {
      "tr": "Onaylı bakım planı, üretici hizalama kriteri, kalibre lazer hizalama cihazı veya komparatör, uygun el aletleri, LOTO ve kaplin muhafazası.",
      "en": "Approved maintenance plan, OEM alignment criteria, suitable laser alignment or dial indicator, task-rated tools, LOTO and coupling guards."
    },
    "permits": {
      "tr": "Mekanik bakım PTW, elektrik/mekanik LOTO, gerekli kaldırma ve test çalıştırması onayları.",
      "en": "Mechanical maintenance PTW, electrical/mechanical LOTO, any lifting and test-run authorizations."
    },
    "environment": {
      "tr": "Yağ/gres döküntülerini kontrol et; bez ve temizlik atıklarını SDS ve saha prosedürüne göre topla.",
      "en": "Contain grease/oil spills and handle contaminated wipes and maintenance waste per site procedures."
    },
    "stepOwner": {
      "tr": "Mekanik Süpervizör / Yetkili Bakım Ekibi",
      "en": "Mechanical Supervisor / Competent Maintenance Team"
    },
    "method": {
      "intro": {
        "tr": "Döner ekipmanda elle şaft döndürme bile tehlike yaratabilir. Hizalama toleransı yalnızca OEM ve onaylı bakım prosedüründen alınır.",
        "en": "Even manual shaft rotation can create trapping hazards. Alignment tolerances come only from OEM instructions and approved maintenance procedures."
      },
      "description": {
        "tr": "Döner ekipmanda kontrollü enerji izolasyonu, kaplin hizalama ve güvenli bakım sonrası çalıştırma için çalışma metodu.",
        "en": "Method for rotating equipment isolation, coupling alignment and safe post-maintenance start-up."
      },
      "steps": [
        {
          "title": {
            "tr": "Ekipman kimliğini ve bakım iznini doğrula",
            "en": "Verify asset identity and maintenance permit"
          },
          "hazard": {
            "tr": "Yanlış pompa veya açıklanmamış proses sınırı",
            "en": "Wrong asset or undefined process boundary"
          },
          "control": {
            "tr": "Ekipman tag, iş emri, bağlantılı proses ve çalışma sınırlarını işletmeyle doğrula.",
            "en": "Verify asset tag, work order, connected process and work boundary with operations."
          }
        },
        {
          "title": {
            "tr": "Elektrik ve mekanik enerjiyi izole et",
            "en": "Isolate electrical and mechanical energy"
          },
          "hazard": {
            "tr": "Beklenmeyen motor startı veya şaft hareketi",
            "en": "Unexpected motor start or shaft movement"
          },
          "control": {
            "tr": "Yetkili LOTO, basınç/akış izolasyonu ve enerjisizlik testini tamamla.",
            "en": "Complete authorized LOTO, process isolation and verification of a safe state."
          }
        },
        {
          "title": {
            "tr": "Koruma ve erişimi kontrollü aç",
            "en": "Control guard removal and access"
          },
          "hazard": {
            "tr": "Açık kaplin, sıkışma noktası ve kaygan zemin",
            "en": "Exposed coupling, pinch points and slippery surfaces"
          },
          "control": {
            "tr": "Gerekli koruyucuları yetkili ekiple sök; çalışma alanını bariyer ve temizlikle güvene al.",
            "en": "Remove required guards under authorization; secure the work area and housekeeping."
          }
        },
        {
          "title": {
            "tr": "Hizalama ölçümlerini onaylı yöntemle yap",
            "en": "Perform measurements to approved method"
          },
          "hazard": {
            "tr": "Sıkışma, yanlış ayar veya cihaz arızası",
            "en": "Trapping, incorrect adjustment or instrument failure"
          },
          "control": {
            "tr": "OEM kriterlerine ve güvenli ölçüm yöntemine uy; dönüş gerektiren adımları kontrollü yap.",
            "en": "Follow OEM limits and approved safe measurement method; control any necessary shaft rotation."
          }
        },
        {
          "title": {
            "tr": "Bağlantı, cıvata ve muhafazayı tamamla",
            "en": "Complete fixings and guards"
          },
          "hazard": {
            "tr": "Gevşek bağlantı, eksik muhafaza veya yabancı parça",
            "en": "Loose bolts, missing guard or foreign material"
          },
          "control": {
            "tr": "Bağlantı kontrollerini tamamla; aletleri kaldır ve tüm korumaları yerine tak.",
            "en": "Inspect connections, remove tools and reinstate all required guards."
          }
        },
        {
          "title": {
            "tr": "Kontrollü test çalışması ve devir",
            "en": "Conduct controlled test and handback"
          },
          "hazard": {
            "tr": "Titreşim, anormal ses veya tekrar dönen parçaya erişim",
            "en": "Vibration, abnormal noise or exposure to rotating parts"
          },
          "control": {
            "tr": "İşletme onayıyla güvenli test yap; anormal sonuçta durdur ve kabul kayıtlarını tamamla.",
            "en": "Test only under operations authorization; stop for abnormal readings and record acceptance."
          }
        }
      ],
      "checks": [
        {
          "tr": "İş emri, ekipman kimliği ve LOTO güvenli",
          "en": "Work order, asset identity and LOTO verified"
        },
        {
          "tr": "OEM ölçüm yöntemi ile hizalama kabul kriteri mevcut",
          "en": "OEM measurement method and acceptance criteria available"
        },
        {
          "tr": "Koruyucuların yeniden takılması ve test onayı planlı",
          "en": "Guard reinstatement and test authorization planned"
        }
      ],
      "stop": {
        "tr": "Enerjisizlik doğrulanamıyorsa, beklenmeyen şaft hareketi varsa, koruyucu eksikse veya anormal titreşim görülürse işi durdur.",
        "en": "Stop if safe isolation is not verified, unexpected shaft movement occurs, guarding is incomplete or abnormal vibration is detected."
      },
      "refs": [
        {
          "title": "OSHA Control of Hazardous Energy — 1910.147",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147"
        },
        {
          "title": "OSHA Machine Guarding — 1910.212",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.212"
        }
      ]
    }
  },
  {
    "number": 33,
    "slug": "pressure-relief-valve-removal",
    "icon": "🛡️",
    "iconBg": "bg-emerald-400/10",
    "button": "bg-emerald-400 hover:bg-emerald-300",
    "activity": {
      "tr": "Emniyet Ventili (PSV) Sökme ve Montaj",
      "en": "Pressure Safety Valve (PSV) Removal and Reinstallation"
    },
    "description": {
      "tr": "Basınç koruması, işletme onayı, izolasyon, valf kimliği, kaldırma ve kontrollü devreye alma için 6 aşama.",
      "en": "Six-stage PSV work method for protection coverage, isolation, asset traceability, lifting and controlled reinstatement."
    },
    "responsibilities": {
      "tr": "İşletme Yetkilisi: Koruyucu cihazın devre dışı kalma riskini ve güvenli proses durumunu onaylar.\nBakım Süpervizörü: Sökme, taşıma ve montajı yönetir.\nYetkili Test/QA Personeli: PSV kimliği, mühür ve sertifika durumunu kontrol eder.\nHSE: Basınç ve ürün maruziyeti kontrolünü inceler.",
      "en": "Operations Authority: Approves plant condition and impact of unavailable overpressure protection.\nMaintenance Supervisor: Directs removal, handling and reinstallation.\nCompetent QA/Test Personnel: Checks valve identity, seal and certification.\nHSE: Reviews pressure and substance exposure controls."
    },
    "competency": {
      "tr": "Basınçlı sistem güvenliği, vana/PSV kimlik ve sertifika kontrolü, uygun izolasyon, montaj ve kalite kabul alanlarında yetkin ekip.",
      "en": "Competent team in pressure systems, PSV identification and certification, isolation, assembly and quality verification."
    },
    "ppe": {
      "tr": "Ürünün SDS ve proses tehlikelerine göre yüz/göz/el/vücut koruması; uygun baret ve ayakkabı, gerekirse diğer kimyasal/termal koruma.",
      "en": "Face/eye, hand and body protection based on substance hazards and SDS; helmet, footwear and additional chemical/thermal PPE as required."
    },
    "tools": {
      "tr": "Onaylı P&ID, koruma stratejisi/izin kaydı, izole etme ekipmanı, uygun kaldırma araçları, valf kimlik/kalibrasyon kayıtları ve montaj prosedürü.",
      "en": "Approved P&ID, protection strategy and permit, isolation equipment, suitable lifting tools, valve certification records and installation procedure."
    },
    "permits": {
      "tr": "İşletme onaylı PSV devre dışı bırakma izni ve koruma stratejisi, iş PTW, LOTO, gerekiyorsa hat açma ve test izni.",
      "en": "Operations-authorized PSV out-of-service approval and protection strategy, PTW/LOTO, any line opening and test permit."
    },
    "environment": {
      "tr": "Proses kalıntılarını kontrollü topla; sızdırmazlık parçalarını ve contaları doğru atık akışına ayır.",
      "en": "Contain process residues and segregate used gaskets, seals and contaminated parts for authorized disposal."
    },
    "stepOwner": {
      "tr": "İşletme / Bakım Süpervizörü / QA",
      "en": "Operations / Maintenance Supervisor / QA"
    },
    "method": {
      "intro": {
        "tr": "PSV'nin devre dışı bırakılması basınç sisteminin korumasını kaldırabilir. Onaylı alternatif koruma veya güvenli duruş olmadan valf sökülmez. Ayar basıncı bu şablondan belirlenmez.",
        "en": "Removing a relief valve can leave pressure equipment unprotected. Do not remove without an approved safe plant state or alternative protection strategy. No set pressures are specified here."
      },
      "description": {
        "tr": "PSV söküm ve tekrar takma işlerinde aşırı basınca karşı koruma, izolasyon, sertifika ve saha teslim kontrolü.",
        "en": "Method for PSV removal and reinstatement with overpressure protection, isolation, certification and handback controls."
      },
      "steps": [
        {
          "title": {
            "tr": "Koruyucu sistem ve ekipman kimliğini doğrula",
            "en": "Verify protective system and valve identity"
          },
          "hazard": {
            "tr": "Yanlış PSV veya korunmasız proses işletimi",
            "en": "Wrong PSV or unprotected pressurized plant"
          },
          "control": {
            "tr": "P&ID, PSV tag ve korunan ekipmanı işletmeyle eşleştir; koruma stratejisini onaylat.",
            "en": "Match valve tag and protected equipment to P&ID; have operations approve protection strategy."
          }
        },
        {
          "title": {
            "tr": "İşletme güvenli durumunu ve izinleri kur",
            "en": "Establish safe plant state and permits"
          },
          "hazard": {
            "tr": "Koruyucu valf yokken basınç yükselmesi",
            "en": "Overpressure while protection is unavailable"
          },
          "control": {
            "tr": "İşletme yetkilisi güvenli duruş/alternatif koruma ve izin koşullarını uygulamaya alsın.",
            "en": "Have operations establish required safe shutdown/approved alternative protection and permits."
          }
        },
        {
          "title": {
            "tr": "Enerji, basınç ve ürünü güvenli izole et",
            "en": "Safely isolate energy, pressure and contents"
          },
          "hazard": {
            "tr": "Kalan basınç veya tehlikeli ürün çıkışı",
            "en": "Residual pressure or hazardous substance release"
          },
          "control": {
            "tr": "İzolasyon, boşaltma ve enerjisizlik doğrulamasını yetkili ekip kayıtla onaylasın.",
            "en": "Authorized personnel verify isolation, depressurization and safe state with records."
          }
        },
        {
          "title": {
            "tr": "PSV'yi kontrollü sök ve koru",
            "en": "Remove and protect PSV"
          },
          "hazard": {
            "tr": "Ağır parça düşmesi, açık flanş veya hasar",
            "en": "Dropped heavy component, open flange or valve damage"
          },
          "control": {
            "tr": "Uygun kaldırma ve körleme/koruma yöntemiyle ekipmanı sök; kirlenmeyi önle.",
            "en": "Use suitable lifting and approved protection of exposed process openings; prevent contamination."
          }
        },
        {
          "title": {
            "tr": "Sertifikalı valfi doğru konumda tak",
            "en": "Install verified PSV correctly"
          },
          "hazard": {
            "tr": "Yanlış ayar, montaj yönü veya mühür",
            "en": "Incorrect setting, installation orientation or seal"
          },
          "control": {
            "tr": "Yetkili QA valf kimliği, sertifika, conta, montaj ve mühür durumunu prosedüre göre doğrulasın.",
            "en": "Competent QA verifies certified valve identity, seal, gasket and assembly against approved documents."
          }
        },
        {
          "title": {
            "tr": "Koruma ve işletmeye dönüşü doğrula",
            "en": "Verify protection and return to service"
          },
          "hazard": {
            "tr": "Koruma açılmadan basınçlandırma, kaçak",
            "en": "Repressurization before protection reinstatement or leak"
          },
          "control": {
            "tr": "İşletme/QA korumanın aktif olduğunu ve gerekli kontrollerin tamamlandığını kaydetmeden sistemi devreye alma.",
            "en": "Do not return to service until operations/QA verifies effective protection and required acceptance checks."
          }
        }
      ],
      "checks": [
        {
          "tr": "PSV kaldırma için işletme onaylı basınç koruma stratejisi mevcut",
          "en": "Operations-approved overpressure protection strategy exists"
        },
        {
          "tr": "İzolasyon, kimlik ve sertifika/kalibrasyon kayıtları doğrulandı",
          "en": "Isolation, ID and certification/calibration records verified"
        },
        {
          "tr": "Devreye alma onayı ve valfin korumaya dönmesi planlandı",
          "en": "Return-to-service verification and protection reinstatement planned"
        }
      ],
      "stop": {
        "tr": "Koruma stratejisi yoksa, ürün/basınç izolasyonu belirsizse, yanlış PSV/sertifika görülürse veya kaçak ortaya çıkarsa işi durdur.",
        "en": "Stop for missing protection strategy, uncertain pressure isolation, mismatched PSV/certificate or unexpected leakage."
      },
      "refs": [
        {
          "title": "OSHA Process Safety Management — 1910.119",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119"
        },
        {
          "title": "OSHA Control of Hazardous Energy — 1910.147",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147"
        }
      ]
    }
  },
  {
    "number": 34,
    "slug": "steam-blowing-commissioning",
    "icon": "♨️",
    "iconBg": "bg-rose-400/10",
    "button": "bg-rose-400 hover:bg-rose-300",
    "activity": {
      "tr": "Buhar Üfleme / Steam Blowing",
      "en": "Steam Blowing for Commissioning"
    },
    "description": {
      "tr": "Yüksek sıcaklık ve basınç, geçici boşaltım, gürültü, dışlama alanı, haberleşme ve soğuma için 6 iş adımı.",
      "en": "Six-stage steam blowing method addressing pressure/heat, temporary discharge, noise, exclusion, communication and cooldown."
    },
    "responsibilities": {
      "tr": "Devreye Alma Mühendisi: Buhar üfleme paketi, sınırlar ve onayları yönetir.\nİşletme Sorumlusu: Buhar kaynağı, izolasyon ve tesis kontrolünü sağlar.\nTest Süpervizörü: Geçici hatlar, gözcüler ve ölçümleri yönetir.\nHSE: Sıcak buhar, gürültü ve dışlama kontrollerini inceler.",
      "en": "Commissioning Engineer: Owns approved steam blowing package and acceptance basis.\nOperations Lead: Controls steam supply, isolation and plant status.\nTest Supervisor: Manages temporary lines, watches and readings.\nHSE: Reviews hot steam, noise and exclusion safeguards."
    },
    "competency": {
      "tr": "Buhar sistemleri, basınçlı hatlar, geçici test kurulumları, işletme koordinasyonu ve acil durumda enerjiyi kesme konularında yetkin ekip.",
      "en": "Competent team in steam systems, pressure circuits, temporary test setups, operations coordination and emergency shutdown."
    },
    "ppe": {
      "tr": "Yüksek sıcaklık yüzeylerinden bariyerle korunma birincil önlemdir; baret, göz/yüz, ısı ve gürültü koruması riske göre belirlenir.",
      "en": "Physical separation from hot steam is the primary control; suitable head, eye/face, heat and hearing protection are risk assessed."
    },
    "tools": {
      "tr": "Onaylı devreye alma ve üfleme planı, mühendislikçe uygun geçici borulama/nozul ve destekler, göstergeler, uzaktan izleme, bariyer ve haberleşme.",
      "en": "Approved commissioning/blow package, engineered temporary piping/discharge/supports, suitable instruments, remote indication, barriers and communications."
    },
    "permits": {
      "tr": "Devreye alma test izni, sıcak/enerjili ekipman yetkisi, izolasyon kayıtları, SIMOPS ve yakın alan kapatma onayları.",
      "en": "Commissioning test authorization, hot/energized system approval, isolation records, SIMOPS and adjacent-area closure."
    },
    "environment": {
      "tr": "Buhar deşarjının görüş, gürültü ve kondens etkilerini yetkin mühendislikle değerlendir; üçüncü kişilerin erişimini kontrol et.",
      "en": "Assess steam discharge visibility, noise and condensate effects in the approved engineering plan; protect adjacent people."
    },
    "stepOwner": {
      "tr": "Devreye Alma Mühendisi / İşletme",
      "en": "Commissioning Engineer / Operations"
    },
    "method": {
      "intro": {
        "tr": "Buhar üfleme yüksek sıcaklıkta basınç enerjisi ve ciddi gürültü yaratabilir. Basınç, debi, üfleme süresi ve kabul kriterleri sadece onaylı mühendislik paketinden alınır.",
        "en": "Steam blowing involves high-temperature pressure energy and potentially severe noise. Pressure, flow, duration and acceptance criteria come only from an approved engineered package."
      },
      "description": {
        "tr": "Devreye alma buhar üflemesinde izolasyon, geçici deşarj, gürültü, dışlama ve saha teslim metodu.",
        "en": "Commissioning method for safe steam blowing boundaries, temporary discharge, noise, exclusion and handback."
      },
      "steps": [
        {
          "title": {
            "tr": "Onaylı buhar üfleme kapsamını doğrula",
            "en": "Confirm approved steam-blow package"
          },
          "hazard": {
            "tr": "Yanlış sistem, belirsiz basınç sınırı",
            "en": "Wrong circuit or unknown pressure boundary"
          },
          "control": {
            "tr": "İşletme ve mühendis test sınırlarını, proses durumunu ve kabul planını onaylasın.",
            "en": "Operations and competent engineer approve boundaries, plant condition and acceptance plan."
          }
        },
        {
          "title": {
            "tr": "Geçici deşarj ve destekleri kontrol et",
            "en": "Inspect temporary discharge and supports"
          },
          "hazard": {
            "tr": "Geçici hat kopması, itki kuvveti ve sıcak buhar teması",
            "en": "Temporary pipe failure, reaction thrust and steam exposure"
          },
          "control": {
            "tr": "Yetkili mühendis geçici tesisat, destek, deşarj yönü ve emniyet mekanizmalarını doğrulasın.",
            "en": "Competent engineer verifies temporary pipework, supports, discharge direction and protective features."
          }
        },
        {
          "title": {
            "tr": "Alan kapatma ve gürültü önlemini kur",
            "en": "Set exclusion and noise safeguards"
          },
          "hazard": {
            "tr": "Yakıcı deşarj, yüksek ses, sınırlı görüş",
            "en": "Scalding discharge, high noise and reduced visibility"
          },
          "control": {
            "tr": "Riskle uyumlu dışlama alanı, erişim gözcüsü, haberleşme ve uyarı sistemlerini kur.",
            "en": "Install engineered exclusion, access controls, communication and warning measures."
          }
        },
        {
          "title": {
            "tr": "İzolasyon ve ölçüm düzenini doğrula",
            "en": "Verify isolation and instruments"
          },
          "hazard": {
            "tr": "Yanlış vana durumu, ölçüm arızası, yoğuşma",
            "en": "Incorrect valve status, faulty instruments, condensation"
          },
          "control": {
            "tr": "İşletme izin/izolasyon kontrolünü ve ölçüm cihazlarının uygunluğunu kayıtla doğrulasın.",
            "en": "Operations verifies permit/isolation status and instrument suitability with records."
          }
        },
        {
          "title": {
            "tr": "Buhar üflemesini onaylı sırayla yürüt",
            "en": "Execute approved steam-blow sequence"
          },
          "hazard": {
            "tr": "Basınç dalgalanması, titreşim, deşarj yönü sapması",
            "en": "Pressure excursions, vibration, discharge deviation"
          },
          "control": {
            "tr": "Yetkili ekip sadece onaylı prosedürle ilerlesin; normal dışı durumda testi durdursun.",
            "en": "Authorized crew follows approved sequence only; stop on abnormal conditions."
          }
        },
        {
          "title": {
            "tr": "Soğuma, basınçsızlaştırma ve teslim",
            "en": "Cool, depressurize and hand back"
          },
          "hazard": {
            "tr": "Artık sıcaklık ve basınç, erken bariyer kaldırma",
            "en": "Residual heat/pressure and premature access"
          },
          "control": {
            "tr": "Yetkili ekip güvenli soğuma ve basınçsızlığı doğrulamadan alanı açma; kabul kayıtlarını tamamla.",
            "en": "Keep the area restricted until competent cooldown/depressurization checks and handback are complete."
          }
        }
      ],
      "checks": [
        {
          "tr": "Onaylı mühendislik üfleme paketi ve geçici deşarj kontrolü hazır",
          "en": "Engineered blow package and temporary discharge verified"
        },
        {
          "tr": "Gürültü ve sıcak buhar dışlama alanı hazır",
          "en": "Noise and high-temperature steam exclusion established"
        },
        {
          "tr": "İşletme, test ekibi ve acil durum haberleşmesi doğrulandı",
          "en": "Operations, test crew and emergency communication verified"
        }
      ],
      "stop": {
        "tr": "Geçici hat hareketi, beklenmeyen basınç/sıcaklık, aşırı titreşim, alan ihlali veya iletişim kaybında işi ve beslemeyi yetkili prosedürle durdur.",
        "en": "Stop via authorized procedures for moving temporary pipework, unexpected pressure/heat, abnormal vibration, access breaches or lost communication."
      },
      "refs": [
        {
          "title": "OSHA Process Safety Management — 1910.119",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119"
        },
        {
          "title": "OSHA Control of Hazardous Energy — 1910.147",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147"
        }
      ]
    }
  }
];
