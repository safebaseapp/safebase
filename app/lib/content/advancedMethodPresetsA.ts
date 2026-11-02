import type { AdvancedMethodPreset } from "./advancedMethodPresets";
// Specialist work methods are illustrative; valid permits, engineering and supervision are required.
export const advancedMethodPresetsA: AdvancedMethodPreset[] = [
  {
    "number": 27,
    "slug": "post-weld-heat-treatment",
    "icon": "🌡️",
    "iconBg": "bg-orange-400/10",
    "button": "bg-orange-400 hover:bg-orange-300",
    "activity": {
      "tr": "Kaynak Sonrası Isıl İşlem (PWHT)",
      "en": "Post-Weld Heat Treatment (PWHT)"
    },
    "description": {
      "tr": "PWHT öncesi elektrik/ısıtıcı izolasyonu, sıcak yüzey, termokupl, bariyer ve kontrollü soğuma için 6 adımlı metot.",
      "en": "Six-step PWHT method covering electrical heaters, hot surfaces, thermocouples, exclusion and controlled cooling."
    },
    "responsibilities": {
      "tr": "PWHT Süpervizörü: Mühendis onaylı ısıl işlem prosedürünü ve kayıtlarını yönetir.\nYetkili Elektrikçi: Güç, kablo ve topraklamayı kontrol eder.\nKalite Kontrol: Termokupl, kayıt cihazı ve kabul şartlarını doğrular.\nHSE: Yangın, sıcak yüzey ve erişim kontrollerini denetler.",
      "en": "PWHT Supervisor: Manages the engineer-approved heat-treatment procedure and logs.\nQualified Electrician: Verifies electrical distribution, leads and grounding.\nQA/QC: Confirms thermocouples, recorders and acceptance requirements.\nHSE: Reviews fire, hot-surface and access controls."
    },
    "competency": {
      "tr": "Onaylı PWHT prosedürünü bilen eğitimli ısıl işlem ekibi, yetkili elektrikçi ve kayıtların kabulünü yapabilecek kalite personeli.",
      "en": "Trained PWHT personnel familiar with the approved procedure, competent electrical personnel and QA staff able to verify recorded results."
    },
    "ppe": {
      "tr": "İşe uygun baret, gözlük, ısıya dayanımlı eldiven ve giysi, emniyet ayakkabısı; elektrik işleri için ayrı uygun koruma.",
      "en": "Task-appropriate helmet, eye protection, heat-resistant gloves and clothing and safety footwear; separate electrical protective measures where needed."
    },
    "tools": {
      "tr": "Mühendis onaylı PWHT planı, uygun ısıtıcı/izolasyon battaniyesi, termokupl, kalibre kayıt cihazı, korumalı enerji dağıtımı, bariyer ve yangın ekipmanı.",
      "en": "Engineer-approved PWHT plan, rated heating mats/insulation blankets, thermocouples, calibrated recorder, protected power distribution, barriers and fire equipment."
    },
    "permits": {
      "tr": "Onaylı PWHT/ısıtma izni, elektrik izolasyon kontrolü, sıcak çalışma koşulları ve yakın tesis SIMOPS değerlendirmesi.",
      "en": "Approved PWHT/heating authorization, electrical isolation safeguards, hot-work controls and adjacent-plant SIMOPS review."
    },
    "environment": {
      "tr": "Enerji ve ısı kayıplarını kontrol et; yalıtım atıklarını ve hasarlı termokupl kablolarını sahadan uygun ayrıştırmayla uzaklaştır.",
      "en": "Control energy and heat losses; segregate insulation waste and damaged instrument leads under site environmental rules."
    },
    "stepOwner": {
      "tr": "PWHT Süpervizörü / Yetkili Elektrikçi",
      "en": "PWHT Supervisor / Qualified Electrician"
    },
    "method": {
      "intro": {
        "tr": "Isıl işlem sıcaklığı, bekleme süresi ve soğuma hızı yalnızca onaylı mühendislik/WPS gereksinimlerinden alınır; bu şablon işlem parametresi belirlemez.",
        "en": "Heating profiles, soak times and cooling rates must come only from the approved engineering/WPS documentation; this template does not set process parameters."
      },
      "description": {
        "tr": "Kaynak sonrası ısıl işlemde elektrik, sıcak yüzey, yangın ve denetlenebilir sıcaklık kaydı için saha çalışma metodu.",
        "en": "Field work method addressing electrical, hot-surface and fire controls plus traceable temperature records during PWHT."
      },
      "steps": [
        {
          "title": {
            "tr": "Onaylı PWHT paketini doğrula",
            "en": "Verify approved PWHT work package"
          },
          "hazard": {
            "tr": "Yanlış kaynak, malzeme veya uygulanacak ısı profili",
            "en": "Wrong weld, material or heat-treatment profile"
          },
          "control": {
            "tr": "Malzeme, WPS/PWHT prosedürü, kaynak kimliği ve QA hold point kayıtlarını uzmanla eşleştir.",
            "en": "Match weld IDs, materials, approved WPS/PWHT documents and QA hold points with competent personnel."
          }
        },
        {
          "title": {
            "tr": "Saha ve yanıcı çevreyi hazırla",
            "en": "Prepare work area and fire controls"
          },
          "hazard": {
            "tr": "Yanıcı malzemeye ısı geçişi, yaya maruziyeti",
            "en": "Heat transfer to combustibles and public access"
          },
          "control": {
            "tr": "Sıcak yüzey alanını bariyerle ayır; yakın yanıcılar ve alt seviye maruziyetini değerlendir.",
            "en": "Barricade hot surfaces; review combustibles, adjacent equipment and exposure on lower levels."
          }
        },
        {
          "title": {
            "tr": "Elektrik ve ısıtıcıları kontrol et",
            "en": "Inspect power and heating equipment"
          },
          "hazard": {
            "tr": "Elektrik çarpması, kablo hasarı, hatalı topraklama",
            "en": "Electric shock, cable damage and inadequate grounding"
          },
          "control": {
            "tr": "Yetkili elektrikçi kablo, ısıtıcı, besleme ve koruyucuları prosedüre göre kontrol etsin.",
            "en": "Have a qualified electrician check leads, heating elements, supply and protective devices."
          }
        },
        {
          "title": {
            "tr": "Termokupl ve kayıtları doğrula",
            "en": "Verify instrumentation and records"
          },
          "hazard": {
            "tr": "Yanlış ölçüm konumu veya kalibrasyon",
            "en": "Incorrect measurement point or instrument calibration"
          },
          "control": {
            "tr": "QA ekibi termokupl yerleşimini ve kayıt sistemini onaylı plana göre doğrulasın.",
            "en": "Have QA verify thermocouple placement and recording setup against the approved plan."
          }
        },
        {
          "title": {
            "tr": "Isıl işlemi kontrollü izle",
            "en": "Monitor controlled heat treatment"
          },
          "hazard": {
            "tr": "Yüksek yüzey ısısı, aşırı sıcaklık, yangın",
            "en": "Hot surfaces, overheating and fire"
          },
          "control": {
            "tr": "Onaylı profile ve gözetim planına uy; anormal kayıt veya yangın halinde işlemi durdur.",
            "en": "Follow only the approved profile and supervision plan; stop for anomalies, fire or control failure."
          }
        },
        {
          "title": {
            "tr": "Soğuma ve saha teslimini tamamla",
            "en": "Complete cooling and handback"
          },
          "hazard": {
            "tr": "Erken erişim, sıcak yalıtım, enerji kalıntısı",
            "en": "Premature access, hot insulation and residual electrical energy"
          },
          "control": {
            "tr": "Onaylı soğuma ve enerjisizleştirme doğrulanana kadar bariyerleri koru; QA kabulünü kaydet.",
            "en": "Keep barriers until approved cooling and de-energization are confirmed; record QA acceptance."
          }
        }
      ],
      "checks": [
        {
          "tr": "Onaylı PWHT/WPS ve sıcaklık kayıt planı mevcut",
          "en": "Approved PWHT/WPS and temperature recording plan available"
        },
        {
          "tr": "Elektrik sistemi, termokupl ve yangın önlemleri doğrulandı",
          "en": "Electrical setup, thermocouples and fire controls verified"
        },
        {
          "tr": "Alan bariyeri ve kontrollü soğuma yöntemi hazır",
          "en": "Exclusion and controlled cooling arrangements ready"
        }
      ],
      "stop": {
        "tr": "Kablo/ısıtıcı hasarı, kontrolsüz sıcaklık, yangın, enerji koruma arızası veya yetkisiz alan erişiminde işi derhal durdur.",
        "en": "Stop for cable/heater damage, uncontrolled temperature, fire, failed electrical safeguards or unauthorized access."
      },
      "refs": [
        {
          "title": "OSHA Welding, Cutting and Brazing — 1910.252",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.252"
        },
        {
          "title": "OSHA Electrical Safety-Related Work Practices — 1910.333",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333"
        }
      ]
    }
  },
  {
    "number": 28,
    "slug": "industrial-radiography-ndt",
    "icon": "☢️",
    "iconBg": "bg-yellow-400/10",
    "button": "bg-yellow-400 hover:bg-yellow-300",
    "activity": {
      "tr": "Endüstriyel Radyografik Muayene (RT)",
      "en": "Industrial Radiographic Testing (RT)"
    },
    "description": {
      "tr": "Yetkili radyasyon ekibi, kontrollü alan, doz izleme, erişim, alarm ve kaynak güvenliği için 6 aşamalı saha planı.",
      "en": "Six-stage RT work method: licensed radiography team, controlled areas, dose monitoring, alarms and source accountability."
    },
    "responsibilities": {
      "tr": "Radyasyon Korunma Uzmanı/Görevlisi: Işınlama planı ve yasal şartları doğrular.\nLisanslı RT Operatörü: Kaynak/cihaz ve çalışma alanı kontrolünü yapar.\nTesis Yetkilisi: Erişim, SIMOPS ve işletme alanlarını koordine eder.\nHSE: Bariyer, iletişim ve acil durum düzenini destekler.",
      "en": "Radiation Protection Adviser/Officer: Verifies exposure plan and legal safeguards.\nAuthorized Radiographer: Controls source/equipment and work area.\nSite Operations: Coordinates access, SIMOPS and adjacent workplaces.\nHSE: Supports barriers, communication and emergency arrangements."
    },
    "competency": {
      "tr": "Güncel lisans/izinleri olan radyografi ekibi; dozimetre, ölçüm cihazı, radyasyon güvenliği ve acil durum eğitimi. Yetkisiz kimse kaynağa müdahale edemez.",
      "en": "Currently authorized radiography crew, trained in dosimetry, survey instruments, radiation protection and emergency response. No unauthorized source handling."
    },
    "ppe": {
      "tr": "Yasal zorunlu kişisel dozimetri, izleme cihazları ve sahaya uygun iş KKD'si; sıradan PPE iyonlaştırıcı radyasyon kontrolünün yerine geçmez.",
      "en": "Legally required personal dosimetry and monitoring instruments with site PPE; ordinary PPE does not substitute for radiation shielding, time/distance controls or exclusion."
    },
    "tools": {
      "tr": "Yetkili radyografik ekipman, kalibrasyonu uygun radyasyon survey metre, kişisel dozimetre, alarm/ikaz, bariyer, haberleşme ve kaynak envanter kaydı.",
      "en": "Authorized radiographic equipment, checked radiation survey meter, personal dosimeters, alarms, warning signs, barriers, communications and source inventory records."
    },
    "permits": {
      "tr": "İlgili radyasyon izin/lisansı, tesis radyografi izni, kontrollü alan planı ve komşu işlerin durdurulması/koordinasyonu.",
      "en": "Applicable radiation authorization/licence, site radiography permit, controlled-area plan and neighbouring work coordination."
    },
    "environment": {
      "tr": "Radyasyon kaynakları lisans koşullarına göre muhafaza ve kayıt altında tutulur; çevreye terk veya uygunsuz depolama kesinlikle yapılmaz.",
      "en": "Maintain secure custody and source accountability under the licence; never abandon or improperly store radioactive sources."
    },
    "stepOwner": {
      "tr": "Yetkili RT Operatörü / Radyasyon Görevlisi",
      "en": "Authorized Radiographer / Radiation Protection Officer"
    },
    "method": {
      "intro": {
        "tr": "Bu form yalnızca yetkilendirilmiş radyografi çalışmasının HSE koordinasyonunu destekler; kaynak faaliyetini, doz sınırını, bariyer mesafesini veya ışınlama süresini belirlemez.",
        "en": "This template supports HSE coordination of licensed radiography. It does not set source activity, dose limits, barrier distances or exposure times."
      },
      "description": {
        "tr": "Endüstriyel radyografide iyonlaştırıcı radyasyon maruziyetini ve komşu işler üzerindeki etkisini kontrol etmek için yetkili saha planı.",
        "en": "Authorized field plan for controlling ionising-radiation exposure and interface risks during industrial radiography."
      },
      "steps": [
        {
          "title": {
            "tr": "Yetkilendirme ve çekim planını incele",
            "en": "Confirm authorization and exposure plan"
          },
          "hazard": {
            "tr": "Yetkisiz çalışma, yanlış ekipman veya saha",
            "en": "Unlicensed work or incorrect equipment/location"
          },
          "control": {
            "tr": "Yetkili radyasyon ekibi lisans, muayene planı ve kaynak kaydını doğrulasın.",
            "en": "Have licensed specialists verify authorization, planned examination and source accountability."
          }
        },
        {
          "title": {
            "tr": "Kontrollü alanı önceden tasarla",
            "en": "Plan controlled area in advance"
          },
          "hazard": {
            "tr": "Komşu alan ve farklı katlardan ışınlama maruziyeti",
            "en": "Exposure of adjacent areas and different elevations"
          },
          "control": {
            "tr": "Uzman kontrol mesafelerini, ışın yolunu, yakın erişimleri ve SIMOPS etkisini hesaplasın.",
            "en": "Radiation specialists determine shielding, access limits and SIMOPS impacts using their approved assessment."
          }
        },
        {
          "title": {
            "tr": "Uyarı ve giriş kontrolünü kur",
            "en": "Establish warning and access control"
          },
          "hazard": {
            "tr": "Bariyer ihlali ve yetkisiz giriş",
            "en": "Barrier breach and unauthorized entry"
          },
          "control": {
            "tr": "Onaylı bariyerler, işaretler, uyarı sistemleri ve sorumlu gözcü görevlendirilsin.",
            "en": "Install approved barriers, warning systems and access control with clearly assigned responsibility."
          }
        },
        {
          "title": {
            "tr": "Ekipman ve izleme sistemlerini doğrula",
            "en": "Verify equipment and monitoring"
          },
          "hazard": {
            "tr": "Dozimetre arızası, kaynağın konumunun belirsizliği",
            "en": "Faulty dosimetry or uncertainty over source position"
          },
          "control": {
            "tr": "Yetkili kişi survey metre, dozimetre ve güvenlik kilitlerini prosedüre göre test etsin.",
            "en": "Authorized personnel test survey instruments, dosimetry and source safety mechanisms as required."
          }
        },
        {
          "title": {
            "tr": "Işınlamayı yalnızca yetkili ekiple yürüt",
            "en": "Carry out exposure by authorized team"
          },
          "hazard": {
            "tr": "Işınlama sırasında personelin kontrollü alana girmesi",
            "en": "Personnel entering controlled area during exposure"
          },
          "control": {
            "tr": "Sadece lisanslı RT ekibi onaylı planla çalışsın; alarm ve erişim ihlalinde işlemi durdursun.",
            "en": "Only authorized radiographers conduct exposures under the approved plan; stop for alarms or access breaches."
          }
        },
        {
          "title": {
            "tr": "Kaynak güvenliği ve alan teslimini doğrula",
            "en": "Verify source security and release"
          },
          "hazard": {
            "tr": "Geri çekilmemiş kaynak, erken bariyer kaldırma",
            "en": "Unretracted source or premature release of area"
          },
          "control": {
            "tr": "Yetkili ekip ölçüm, kaynak güvenli konum ve devir kaydını onaylamadan alanı açma.",
            "en": "Do not reopen the area until the radiography team confirms source security, survey results and handback."
          }
        }
      ],
      "checks": [
        {
          "tr": "Lisanslı RT personeli, kaynak kimliği ve onaylı plan doğrulandı",
          "en": "Licensed personnel, source identification and approved plan verified"
        },
        {
          "tr": "Kontrollü alan, uyarılar ve komşu iş koordinasyonu hazır",
          "en": "Controlled area, warnings and adjacent work coordination ready"
        },
        {
          "tr": "Survey metre, dozimetre ve acil durum planı hazır",
          "en": "Survey instrumentation, dosimetry and emergency plan ready"
        }
      ],
      "stop": {
        "tr": "Kontrollü alan ihlali, alarm, kaynak konumunun belirsizliği, ekipman arızası veya iletişim kaybında işi durdur ve radyasyon acil durum prosedürünü uygula.",
        "en": "Stop and implement the radiation emergency plan for exclusion breaches, alarms, uncertain source position, equipment failure or lost communications."
      },
      "refs": [
        {
          "title": "OSHA Ionizing Radiation — 1910.1096",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1096"
        },
        {
          "title": "HSE Ionising Radiation",
          "url": "https://www.hse.gov.uk/radiation/ionising/index.htm"
        }
      ]
    }
  },
  {
    "number": 29,
    "slug": "nitrogen-purging-inerting",
    "icon": "🌬️",
    "iconBg": "bg-teal-400/10",
    "button": "bg-teal-400 hover:bg-teal-300",
    "activity": {
      "tr": "Azotla Purge / İnertleme",
      "en": "Nitrogen Purging and Inerting"
    },
    "description": {
      "tr": "Oksijen eksikliği, kontrollü gaz boşaltımı, alan izleme, izolasyon ve kurtarma erişimi için 6 adımlı yöntem.",
      "en": "Six-stage inerting plan covering oxygen displacement, release points, access isolation, atmospheric monitoring and rescue."
    },
    "responsibilities": {
      "tr": "İşletme Yetkilisi: Purge sistemi, gaz beslemesi ve işletme sınırlarını onaylar.\nTest Süpervizörü: Alan ve basınç kontrolünü yönetir.\nYetkili Ölçümcü: Atmosfer ölçümü ve izleme planından sorumludur.\nHSE: Asfiksi, bariyer ve kurtarma hazırlığını denetler.",
      "en": "Operations Authority: Authorizes purge boundaries, nitrogen supply and equipment status.\nTest Supervisor: Directs area and pressure controls.\nCompetent Gas Tester: Verifies atmosphere and monitoring requirements.\nHSE: Reviews asphyxiation, barriers and rescue readiness."
    },
    "competency": {
      "tr": "Azot tehlikesi, oksijen yetersizliği, izole sistemler, gaz ölçümü ve acil durum konusunda eğitimli yetkili proses ve test personeli.",
      "en": "Authorized process/test personnel trained in nitrogen displacement, oxygen deficiency, isolation, atmospheric testing and emergencies."
    },
    "ppe": {
      "tr": "Temel saha PPE'si ve göreve uygun koruma; normal filtreli maske oksijen eksikliğinde koruma sağlamaz. Solunum koruması kurtarma planına göre yalnızca yetkili kişilerce kullanılır.",
      "en": "Standard site PPE as appropriate; air-purifying respirators do not protect against oxygen deficiency. Any supplied-air rescue equipment is used only under authorized arrangements."
    },
    "tools": {
      "tr": "Onaylı purge planı, sistem izometrisi, uygun gaz besleme ekipmanı, oksijen ölçüm cihazları, uzaktan izleme, bariyer ve iletişim araçları.",
      "en": "Approved purge plan, system drawings, rated gas supply equipment, oxygen monitors, remote readings, barriers and communications."
    },
    "permits": {
      "tr": "Onaylı purge/PTW, ilgili izolasyon ve gaz ölçüm izni; kapalı alan veya diğer tehlikeli saha girişleri için ayrıca yetkilendirme.",
      "en": "Approved purge/PTW, isolation and gas-monitoring arrangements; separate entry authorization for confined or hazardous spaces."
    },
    "environment": {
      "tr": "Gaz boşaltım noktalarını insanların ve çevresel sistemlerin maruziyetini önleyecek konuma göre yetkili işletme değerlendirmesiyle belirle.",
      "en": "Operations must assess nitrogen vent locations to prevent worker exposure and unintended impacts on adjacent systems."
    },
    "stepOwner": {
      "tr": "İşletme / Purge Süpervizörü",
      "en": "Operations / Purge Supervisor"
    },
    "method": {
      "intro": {
        "tr": "Azot kokusuzdur ve oksijeni uzaklaştırabilir; güvenli görünen alan ölümcül oksijen eksikliğine sahip olabilir. Oksijen limitleri ve purge parametreleri yetkili planla belirlenmelidir.",
        "en": "Nitrogen is odourless and can displace oxygen; an apparently normal area can be life-threatening. Only approved site procedures define oxygen limits and purge parameters."
      },
      "description": {
        "tr": "Azot inertleme sırasında asfiksi tehlikesi, izolasyon, havalandırma ve alan erişiminin kontrolüne odaklanan çalışma metodu.",
        "en": "Work method for oxygen-deficiency hazards, isolation, ventilation and access control during nitrogen inerting."
      },
      "steps": [
        {
          "title": {
            "tr": "Onaylı purge ve izin paketini doğrula",
            "en": "Verify purge and permit package"
          },
          "hazard": {
            "tr": "Yanlış ekipman, bilinmeyen hat bağlantısı",
            "en": "Wrong equipment or unknown pipe connections"
          },
          "control": {
            "tr": "Yetkili işletme purge sınırını, gaz kaynağını ve planlanan boşaltımı onaylasın.",
            "en": "Have operations approve gas supply, isolation limits and planned venting."
          }
        },
        {
          "title": {
            "tr": "Azot beslemesini ve izolasyonu kontrol et",
            "en": "Verify nitrogen supply and isolation"
          },
          "hazard": {
            "tr": "Beklenmeyen gaz akışı, aşırı basınç",
            "en": "Unexpected flow or overpressure"
          },
          "control": {
            "tr": "Onaylı basınç korumaları ve besleme bağlantılarını yetkin kişiler doğrulasın.",
            "en": "Competent personnel check supply connections and approved pressure protection."
          }
        },
        {
          "title": {
            "tr": "Oksijen düşüşü risk alanlarını belirle",
            "en": "Identify oxygen-deficiency zones"
          },
          "hazard": {
            "tr": "Çukurlarda, kanallarda ve komşu alanlarda oksijen eksikliği",
            "en": "Oxygen depletion in pits, trenches or adjacent areas"
          },
          "control": {
            "tr": "Boşaltım ve sızıntı noktalarını değerlendirin; erişimi sınırlandırın ve izleme noktalarını belirleyin.",
            "en": "Assess vents/leaks, limit access and establish appropriate atmosphere monitoring points."
          }
        },
        {
          "title": {
            "tr": "Bariyer, uyarı ve iletişim kur",
            "en": "Establish barriers and communications"
          },
          "hazard": {
            "tr": "Personelin sessizce oksijensiz alana girmesi",
            "en": "Unrecognized worker entry to oxygen-deficient zone"
          },
          "control": {
            "tr": "Alan işaretleri, nöbetçi ve işçi bilgilendirmesini sahadaki risk bölgelerine göre düzenle.",
            "en": "Install signs, access supervision and worker notifications based on hazard zones."
          }
        },
        {
          "title": {
            "tr": "Purge işlemini kontrollü ve uzaktan izle",
            "en": "Monitor controlled purging"
          },
          "hazard": {
            "tr": "Gaz birikmesi, ölçüm arızası, yanlış sistem durumu",
            "en": "Gas buildup, monitoring failure or wrong plant condition"
          },
          "control": {
            "tr": "Yetkili ekip ölçüm ve basınç kontrolünü planlandığı gibi izlesin; alarmda derhal durdur.",
            "en": "Authorized team monitors gas and system condition per plan; stop for alarms."
          }
        },
        {
          "title": {
            "tr": "İzole et ve güvenli alan teslimini doğrula",
            "en": "Verify isolation and safe handback"
          },
          "hazard": {
            "tr": "Kalan azot ve erken erişim izni",
            "en": "Residual nitrogen and premature access"
          },
          "control": {
            "tr": "Yeterli havalandırma ve yetkili atmosfer doğrulaması yapılmadan erişime izin verme.",
            "en": "Keep restrictions until approved ventilation and competent atmosphere verification are complete."
          }
        }
      ],
      "checks": [
        {
          "tr": "Purge devresi ve besleme/boşaltma yolu yetkili kişi tarafından onaylandı",
          "en": "Purge circuit and supply/vent paths approved"
        },
        {
          "tr": "Oksijen ölçüm ve dışlama planı uygun",
          "en": "Oxygen monitoring and exclusion arrangements verified"
        },
        {
          "tr": "Kurtarma ve iletişim planı erişilebilir ve uygulanabilir",
          "en": "Rescue and communication arrangements accessible and practical"
        }
      ],
      "stop": {
        "tr": "Oksijen alarmı, gaz kaçışı, kontrolsüz basınç, alan ihlali veya ölçüm arızası varsa işi durdur ve eğitimli kurtarma ekibini harekete geçir; korunmasız kurtarma girişimi yapma.",
        "en": "Stop for oxygen alarms, nitrogen leaks, pressure excursions, access breaches or monitor failure. Activate trained rescue; never attempt unprotected entry."
      },
      "refs": [
        {
          "title": "OSHA Permit-Required Confined Spaces — 1910.146",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146"
        },
        {
          "title": "OSHA Process Safety Management — 1910.119",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.119"
        }
      ]
    }
  },
  {
    "number": 30,
    "slug": "structural-steel-erection",
    "icon": "🏗️",
    "iconBg": "bg-blue-400/10",
    "button": "bg-blue-400 hover:bg-blue-300",
    "activity": {
      "tr": "Çelik Konstrüksiyon Montajı",
      "en": "Structural Steel Erection"
    },
    "description": {
      "tr": "Yüksek yapı stabilitesi, geçici destek, kaldırma, ankraj, düşme ve düşen cisim risklerine odaklanan 6 iş adımı.",
      "en": "Six-stage steel erection template for structural stability, temporary bracing, lift planning, fall and dropped-object exposure."
    },
    "responsibilities": {
      "tr": "Montaj Mühendisi: Erection sequence ve geçici stabiliteyi onaylar.\nKaldırma Süpervizörü: Vinç ve yük hareket planını yönetir.\nÇelik Montaj Süpervizörü: Bağlantı, erişim ve ekip çalışmasını koordine eder.\nHSE: Düşme, alt bölge ve SIMOPS önlemlerini denetler.",
      "en": "Erection Engineer: Approves sequence and temporary stability.\nLifting Supervisor: Oversees crane and load movement plan.\nSteel Supervisor: Coordinates connections, access and crew work.\nHSE: Reviews fall prevention, exclusion below and SIMOPS controls."
    },
    "competency": {
      "tr": "Çelik ereksiyon, yük kaldırma, geçici stabilite, yüksekten düşüş önleme ve bağlantı kontrolünde yetkin montaj ekibi.",
      "en": "Competent team for steel erection, lifting, temporary stability, fall prevention and connection inspection."
    },
    "ppe": {
      "tr": "Saha PPE'si, uygun düşüş önleme/durdurma sistemi ve düşen cisim önlemleri; birincil amaç mühendislik/toplu koruma olmalı.",
      "en": "Site PPE, task-rated fall protection and dropped-object safeguards; engineered and collective protection take priority."
    },
    "tools": {
      "tr": "Onaylı çelik montaj planı, geçici destek çizimleri, kaldırma planı, kontrol edilmiş sapanlar ve platformlar, bağlantı ekipmanı, ankraj ve bariyerler.",
      "en": "Approved erection plan, temporary bracing drawings, lifting plan, inspected rigging and access platforms, connection tools, anchors and barriers."
    },
    "permits": {
      "tr": "Yüksekte çalışma, kaldırma, inşaat/montaj PTW ve gerekli geçici iş mühendislik onayları.",
      "en": "Work-at-height, lifting and construction permits plus any temporary-works engineering approvals."
    },
    "environment": {
      "tr": "Metal hurdayı ayrı topla; açık yürüme yolları, keskin parçalar ve kaynaklı sıcak atıkları kontrol altında tut.",
      "en": "Segregate scrap steel and control walkways, sharp offcuts and hot-work waste."
    },
    "stepOwner": {
      "tr": "Çelik Montaj Süpervizörü / Montaj Mühendisi",
      "en": "Steel Erection Supervisor / Erection Engineer"
    },
    "method": {
      "intro": {
        "tr": "Çelik elemanlar son bağlantılar tamamlanmadan kararsız olabilir; geçici destek ve montaj sırası onaylı mühendislik planından alınmalıdır.",
        "en": "Steel members can be unstable before permanent connections. Temporary bracing and erection sequence must follow approved engineered plans."
      },
      "description": {
        "tr": "Çelik konstrüksiyon montajında geçici stabilite, güvenli kaldırma ve düşmenin önlenmesi için örnek iş metodu.",
        "en": "Example method for structural stability, safe lifting and fall prevention during structural steel erection."
      },
      "steps": [
        {
          "title": {
            "tr": "Montaj sırasını ve stabilite planını doğrula",
            "en": "Confirm sequence and stability plan"
          },
          "hazard": {
            "tr": "Geçici dengesizlik ve çökme",
            "en": "Temporary instability and collapse"
          },
          "control": {
            "tr": "Yetkili mühendis onaylı montaj/bağlama ve geçici destek planını doğrulasın.",
            "en": "Have a competent engineer verify approved assembly, connection and temporary bracing sequence."
          }
        },
        {
          "title": {
            "tr": "Zemin, erişim ve kaldırma alanını kur",
            "en": "Prepare ground, access and lifting zone"
          },
          "hazard": {
            "tr": "Zemin yetersizliği, ekipman devrilmesi, düşme",
            "en": "Inadequate bearing, equipment overturn and falls"
          },
          "control": {
            "tr": "Vinç planını, erişim platformlarını ve dışlama alanını yetkili ekiple kontrol et.",
            "en": "Verify lifting plan, access platforms and exclusion area with competent crew."
          }
        },
        {
          "title": {
            "tr": "Yük ve ankraj elemanlarını kontrol et",
            "en": "Check load and anchorage details"
          },
          "hazard": {
            "tr": "Yanlış kaldırma noktası veya eksik saplama",
            "en": "Incorrect lifting points or incomplete anchorage"
          },
          "control": {
            "tr": "Onaylı kaldırma noktaları, bağlantılar ve geçici sabitleme bileşenlerini doğrula.",
            "en": "Check approved lifting points, connections and temporary restraining parts."
          }
        },
        {
          "title": {
            "tr": "Elemanları planlı sırayla yerleştir",
            "en": "Position members in engineered order"
          },
          "hazard": {
            "tr": "Kontrolsüz salınım, çarpma veya geçici stabilite kaybı",
            "en": "Uncontrolled swing, collision or loss of temporary stability"
          },
          "control": {
            "tr": "Yetkili kaldırma ekibiyle adım adım ilerle; gerekli geçici bağlantılar olmadan yükü serbest bırakma.",
            "en": "Follow approved lift sequence; do not release the load before prescribed temporary connections are secure."
          }
        },
        {
          "title": {
            "tr": "Bağlantıları ve düşme korumasını doğrula",
            "en": "Verify connections and fall prevention"
          },
          "hazard": {
            "tr": "Açık kenar, eksik bulon ve düşen aletler",
            "en": "Unprotected edges, incomplete bolts and falling tools"
          },
          "control": {
            "tr": "Bağlantıları yetkili kişi doğrulasın; toplu koruma ve alt alan bariyerlerini sürdür.",
            "en": "Have competent personnel confirm connection integrity and maintain edge/exclusion protections."
          }
        },
        {
          "title": {
            "tr": "Geçici destek ve saha teslimini kontrol et",
            "en": "Release temporary works only after approval"
          },
          "hazard": {
            "tr": "Erken geçici destek sökümü veya kararsız yapı",
            "en": "Premature removal of bracing or unstable frame"
          },
          "control": {
            "tr": "Mühendis onayı olmadan destekleri kaldırma; QA ve saha teslim kaydı oluştur.",
            "en": "Never remove temporary bracing without engineering approval; record QA/handback."
          }
        }
      ],
      "checks": [
        {
          "tr": "Onaylı çelik montaj sırası ve geçici stabilite planı mevcut",
          "en": "Approved erection sequence and bracing plan available"
        },
        {
          "tr": "Kaldırma, düşme koruması ve alt alan bariyeri hazır",
          "en": "Lifting plan, fall protection and exclusion below ready"
        },
        {
          "tr": "Bağlantı kontrolü ve geçici destek sorumluları tanımlı",
          "en": "Connection inspection and bracing owners assigned"
        }
      ],
      "stop": {
        "tr": "Stabilite kaybı, eksik geçici destek, uygunsuz kaldırma, korunmasız açık kenar veya yetkisiz bağlantı değişikliğinde işi durdur.",
        "en": "Stop for unstable members, missing bracing, unsafe lifts, unprotected edges or unauthorized changes to connections."
      },
      "refs": [
        {
          "title": "OSHA Steel Erection — 1926.750",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.750"
        },
        {
          "title": "OSHA Structural Steel Assembly — 1926.754",
          "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.754"
        }
      ]
    }
  }
];
