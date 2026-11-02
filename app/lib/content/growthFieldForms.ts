// New bilingual, field-ready HSE worksheets. Content reviewed against listed official
// references. These are working aids, NOT authorizations, permits or competence certificates.
import type { FieldForm } from "./fieldForms";

export const growthFieldForms: FieldForm[] = [
  {
    "slug": "loto-isolation-verification",
    "title": {
      "tr": "LOTO Enerji İzolasyonu Doğrulama Formu",
      "en": "LOTO Energy Isolation Verification Checklist"
    },
    "description": {
      "tr": "Ücretsiz LOTO kontrol formu: enerji kaynakları, kilit ve etiketler, depolanmış enerji ve sıfır enerji testi için yazdırılabilir saha şablonu.",
      "en": "Free editable LOTO checklist template for identifying energy sources, lock and tag controls, residual energy and verified isolation before maintenance."
    },
    "summary": {
      "tr": "Bakım öncesi yalnızca ana şalterin kapatılması yeterli değildir. Tüm enerji türlerini, yetkili kişileri, kilitleri ve sahada doğrulanan sıfır enerji durumunu bu çalışma sayfasında gözden geçirin.",
      "en": "Before servicing, document each energy source, the authorized person's isolation method, lock and tag accountability, stored-energy controls and proof of zero energy."
    },
    "steps": {
      "tr": [
        "Makineyi ve yapılacak müdahaleyi tanımlayın; etkilenen çalışanları bilgilendirin.",
        "Elektrik, basınç, mekanik, hidrolik, pnömatik ve yerçekimi gibi tüm enerji kaynaklarını belirleyin.",
        "Yetkili kişiler onaylı prosedüre göre durdurma, fiziksel izolasyon ve kişisel kilit/etiket adımlarını uygulasın.",
        "Artık enerjiyi boşaltın veya kontrol altına alın; tehlikesiz şartlarda uygun testle izolasyonu doğrulayın.",
        "Vardiya, ekip veya iş kapsamı değişirse yetkilendirilmiş LOTO devri ve kontrollü yeniden enerjilendirme prosedürünü takip edin."
      ],
      "en": [
        "Identify the exact machine, maintenance task and affected workers.",
        "Map electrical, pressure, mechanical, hydraulic, pneumatic, gravity and other energy sources.",
        "Have authorized personnel follow the approved shutdown, physical isolation and personal lock/tag procedure.",
        "Relieve or restrain stored energy and verify isolation through an appropriate safe test before work.",
        "Follow the employer's controlled lock transfer, shift handover and return-to-service procedure when circumstances change."
      ]
    },
    "example": {
      "tr": "Örnek — Pompa onarımı: Motor beslemesi izole edilip kilitlenir, hattaki basınç boşaltılır, rotor hareketi önlenir ve yetkili çalışan enerjisizliği doğrular. Kontrol tamamlanmadan iş başlatılmaz.",
      "en": "Example — Pump repair: Isolate and lock the motor supply, depressurize the line, prevent rotor movement, and have an authorized worker verify the de-energized state before service."
    },
    "sections": [
      {
        "title": {
          "tr": "Ekipman ve sorumlular",
          "en": "Equipment and responsibilities"
        },
        "fields": [
          {
            "id": "equipment",
            "label": {
              "tr": "Ekipman / ekipman numarası",
              "en": "Equipment / asset ID"
            }
          },
          {
            "id": "area",
            "label": {
              "tr": "Saha / lokasyon",
              "en": "Area / location"
            }
          },
          {
            "id": "date",
            "label": {
              "tr": "Tarih ve vardiya",
              "en": "Date and shift"
            }
          },
          {
            "id": "permit",
            "label": {
              "tr": "İş izni / çalışma emri",
              "en": "Permit / work order reference"
            }
          },
          {
            "id": "authorized",
            "label": {
              "tr": "Yetkili izolasyon personeli",
              "en": "Authorized isolating person"
            }
          }
        ]
      },
      {
        "title": {
          "tr": "Doğrulama ve devreye alma",
          "en": "Verification and release"
        },
        "fields": [
          {
            "id": "tryout",
            "label": {
              "tr": "Sıfır enerji doğrulama yöntemi / sonucu",
              "en": "Zero-energy verification method / result"
            },
            "multiline": true
          },
          {
            "id": "stored",
            "label": {
              "tr": "Artık veya yeniden birikebilen enerji kontrolü",
              "en": "Stored or reaccumulating energy control"
            },
            "multiline": true
          },
          {
            "id": "handover",
            "label": {
              "tr": "Kilit yönetimi / vardiya devri notu",
              "en": "Lock accountability / shift handover"
            },
            "multiline": true
          },
          {
            "id": "restore",
            "label": {
              "tr": "Kontrollü devreye alma ve çalışan bildirimi",
              "en": "Controlled restoration and employee notification"
            },
            "multiline": true
          }
        ]
      }
    ],
    "table": {
      "title": {
        "tr": "Enerji izolasyon noktaları",
        "en": "Energy isolation point register"
      },
      "columns": [
        {
          "tr": "Enerji kaynağı / nokta",
          "en": "Energy source / point"
        },
        {
          "tr": "İzolasyon ve kilit yöntemi",
          "en": "Isolation and lock method"
        },
        {
          "tr": "Doğrulama / sonuç",
          "en": "Verification / result"
        },
        {
          "tr": "Yetkili kişi",
          "en": "Authorized person"
        }
      ],
      "rows": 5
    },
    "note": {
      "tr": "Bu form kilit takma işlemini, enerji izolasyon prosedürünü veya yetkili kişi onayını otomatik olarak gerçekleştirmez. Uygulanabilir LOTO mevzuatı ve işverenin yazılı prosedürü esastır.",
      "en": "This worksheet does not perform an isolation, prove a safe state, or authorize work. Follow the applicable energy-control standard and your employer's written procedure."
    },
    "faq": [
      {
        "question": {
          "tr": "Etiket tek başına yeterli mi?",
          "en": "Is a tag alone enough?"
        },
        "answer": {
          "tr": "Etiket, kilitlenebilir bir enerji kesme cihazında kilidin eşdeğeri kabul edilmez; ilgili mevzuatın özel koşulları ve ek önlemler doğrulanmalıdır.",
          "en": "A tag is not automatically equivalent to a lock on a lockable isolator; verify the applicable legal criteria and supplementary protection."
        }
      },
      {
        "question": {
          "tr": "Test ne zaman yapılır?",
          "en": "When is isolation verified?"
        },
        "answer": {
          "tr": "Yetkili çalışan gerekli izolasyon, boşaltma ve emniyete alma adımlarından sonra işe başlamadan önce uygun doğrulamayı yapar.",
          "en": "An authorized worker verifies effective isolation after applying controls and before servicing starts."
        }
      }
    ],
    "related": [
      {
        "path": "/knowledge-base/loto",
        "label": {
          "tr": "LOTO teknik rehberi",
          "en": "LOTO technical guide"
        }
      },
      {
        "path": "/knowledge-base/stored-energy-hazards",
        "label": {
          "tr": "Depolanmış enerji riskleri",
          "en": "Stored energy hazards"
        }
      },
      {
        "path": "/tools/quick-risk-assessment",
        "label": {
          "tr": "Hızlı risk değerlendirmesi",
          "en": "Quick risk assessment"
        }
      }
    ],
    "references": [
      {
        "label": "OSHA 29 CFR 1910.147 — Control of Hazardous Energy",
        "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147"
      }
    ]
  },
  {
    "slug": "hot-work-prestart-review",
    "title": {
      "tr": "Sıcak Çalışma İş Öncesi Güvenlik Kontrol Formu",
      "en": "Hot Work Pre-Start Safety Checklist"
    },
    "description": {
      "tr": "Kaynak, kesme ve taşlama öncesi yanıcı malzemeler, yangın gözcüsü, kıvılcım kontrolü, atmosfer testi ve izin durumunu kontrol eden ücretsiz form.",
      "en": "Free hot work pre-start checklist for welding, cutting and grinding: combustibles, fire watch, spark containment, atmosphere testing and permit coordination."
    },
    "summary": {
      "tr": "Sıcak çalışma başlamadan önce yangın kaynaklarını ve çevredeki eşzamanlı işleri sorgulayın. Bu kontrol formu resmî sıcak çalışma izni değildir; saha onaylarını ayrıca doğrulayın.",
      "en": "Review ignition hazards, adjacent activities and emergency readiness before welding or cutting. This is a preparation worksheet, not a hot-work permit or authorization."
    },
    "steps": {
      "tr": [
        "Sıcak çalışmanın tam konumunu, türünü, ekipmanını ve mevcut iş iznini doğrulayın.",
        "Yanıcıları uzaklaştırın veya uygun biçimde koruyun; kıvılcımların alt katlara ve gizli boşluklara ulaşabileceğini değerlendirin.",
        "Gerekliyse yetkili gaz ölçümü, havalandırma, yangın gözcüsü ve söndürme ekipmanının uygunluğunu doğrulayın.",
        "Yakındaki kapalı alan, proses hattı ve eşzamanlı faaliyetlerle karşılıklı riskleri değerlendirin.",
        "Çalışma süresince ve bitiminde kurum prosedüründeki yangın gözcülüğü ve saha teslimini takip edin."
      ],
      "en": [
        "Confirm the precise work location, task, equipment and approved permit status.",
        "Remove or protect combustibles; check sparks that may travel to lower levels or concealed cavities.",
        "Verify required atmospheric testing, ventilation, fire-watch competence and extinguishing equipment.",
        "Review nearby process lines, confined spaces and simultaneous operations.",
        "Apply the site-defined fire-watch and close-out requirements during and after work."
      ]
    },
    "example": {
      "tr": "Örnek — Boru askısı kaynağı: Alt kattaki yanıcı örtü kaldırılır, açıklıklar kapatılır, uygun söndürücü yerleştirilir ve yangın gözcüsü görevlendirilir. İş izni doğrulanmadan ark başlatılmaz.",
      "en": "Example — Welding a pipe support: Remove combustibles below, protect penetrations, position suitable extinguishing equipment and assign a fire watch. Do not strike an arc before permit checks."
    },
    "sections": [
      {
        "title": {
          "tr": "Sıcak çalışma bilgileri",
          "en": "Hot work details"
        },
        "fields": [
          {
            "id": "site",
            "label": {
              "tr": "Saha / seviye / ekipman",
              "en": "Area / level / equipment"
            }
          },
          {
            "id": "activity",
            "label": {
              "tr": "Kaynak / kesme / taşlama yöntemi",
              "en": "Welding / cutting / grinding method"
            }
          },
          {
            "id": "date",
            "label": {
              "tr": "Tarih / vardiya",
              "en": "Date / shift"
            }
          },
          {
            "id": "permit",
            "label": {
              "tr": "Onaylı sıcak çalışma izni numarası",
              "en": "Approved hot-work permit reference"
            }
          },
          {
            "id": "supervisor",
            "label": {
              "tr": "Sorumlu / yangın gözcüsü",
              "en": "Supervisor / fire watch"
            }
          }
        ]
      },
      {
        "title": {
          "tr": "Yangın kontrolü ve kapanış",
          "en": "Fire control and close-out"
        },
        "fields": [
          {
            "id": "combustibles",
            "label": {
              "tr": "Yanıcılar, alt kat ve gizli boşluk kontrolleri",
              "en": "Combustibles, lower levels and cavities"
            },
            "multiline": true
          },
          {
            "id": "gas",
            "label": {
              "tr": "Gerekli atmosfer testi ve izleme planı",
              "en": "Required gas testing and monitoring plan"
            },
            "multiline": true
          },
          {
            "id": "fire",
            "label": {
              "tr": "Söndürücü, gözcü ve haberleşme düzeni",
              "en": "Extinguishing equipment, watch and communications"
            },
            "multiline": true
          },
          {
            "id": "close",
            "label": {
              "tr": "İş sonrası yangın kontrolü ve saha teslimi",
              "en": "Post-work fire checks and area handback"
            },
            "multiline": true
          }
        ]
      }
    ],
    "table": {
      "title": {
        "tr": "Kontrol noktaları ve önlemler",
        "en": "Pre-start safeguards and owners"
      },
      "columns": [
        {
          "tr": "Tehlike / bölge",
          "en": "Hazard / area"
        },
        {
          "tr": "Gerekli önlem",
          "en": "Required control"
        },
        {
          "tr": "Doğrulama",
          "en": "Verification"
        },
        {
          "tr": "Sorumlu",
          "en": "Owner"
        }
      ],
      "rows": 5
    },
    "note": {
      "tr": "Yazdırılan form bir sıcak çalışma izni, gazdan arındırma sertifikası veya yanıcı atmosfer için çalışmaya başlama yetkisi değildir. Prosedür ve yerel mevzuat uygulanmalıdır.",
      "en": "This is not a hot-work authorization, gas-free certificate or permission to work in a hazardous atmosphere. Follow the applicable permit, fire protection and local legal requirements."
    },
    "faq": [
      {
        "question": {
          "tr": "Yangın gözcüsü ne kadar süre kalır?",
          "en": "How long must the fire watch remain?"
        },
        "answer": {
          "tr": "Uygulanacak süre ilgili mevzuat ve işyerinin prosedürüne göre belirlenir; tek bir süre bütün sektörler ve ülkeler için geçerli değildir.",
          "en": "Apply the period required by the relevant standard and site permit; one duration cannot be assumed across all industries and jurisdictions."
        }
      },
      {
        "question": {
          "tr": "Kapalı alan yakınında ek kontrol gerekir mi?",
          "en": "Are extra controls needed near a confined space?"
        },
        "answer": {
          "tr": "Evet. Kıvılcım yayılımı, gazlar, havalandırma ve eşzamanlı işler ayrı ayrı değerlendirilmelidir.",
          "en": "Yes. Assess spark travel, gases, ventilation and interacting jobs under the appropriate permits."
        }
      }
    ],
    "related": [
      {
        "path": "/knowledge-base/hot-work",
        "label": {
          "tr": "Sıcak çalışma rehberi",
          "en": "Hot work guide"
        }
      },
      {
        "path": "/knowledge-base/fire-safety",
        "label": {
          "tr": "Yangın güvenliği rehberi",
          "en": "Fire safety guide"
        }
      },
      {
        "path": "/field-forms/job-safety-analysis",
        "label": {
          "tr": "JSA çalışma formu",
          "en": "JSA worksheet"
        }
      }
    ],
    "references": [
      {
        "label": "OSHA 29 CFR 1910.252 — Welding and Cutting Fire Precautions",
        "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.252"
      }
    ]
  },
  {
    "slug": "confined-space-entry-readiness",
    "title": {
      "tr": "Kapalı Alan Giriş Öncesi Hazırlık Kontrol Formu",
      "en": "Confined Space Entry Readiness Checklist"
    },
    "description": {
      "tr": "Kapalı alan ön kontrol şablonu: izin, izolasyon, atmosfer testi, gözcü, kurtarma, havalandırma ve girişçi iletişimi için yazdırılabilir form.",
      "en": "Confined space pre-entry readiness worksheet for permits, isolation, atmosphere testing, attendants, rescue, ventilation and entrant communications."
    },
    "summary": {
      "tr": "Kapalı alan girişinden önce hangi tedbirlerin doğrulanması gerektiğini yazılı olarak değerlendirin. Form izinli giriş sisteminin veya yetkili giriş amirinin yerini tutmaz.",
      "en": "Assess pre-entry controls before a vessel, tank or pit entry. This checklist supports the approved confined-space permit process; it does not grant entry."
    },
    "steps": {
      "tr": [
        "Alanı ve giriş nedeni ile birlikte kapalı alanın tehlike sınıflandırmasını belirleyin.",
        "Gerekli izin, enerji ve hat izolasyonları, güvenli erişim ve koruma bariyerlerini doğrulayın.",
        "Yetkili kişi gerekli gaz ölçümlerini, cihaz durumunu ve sürekli/tekrarlı izleme planını kontrol etsin.",
        "Gözcü ve girişçilerin görevlerini, iletişimi, kişi sayısını ve kurtarma hizmetinin erişilebilirliğini doğrulayın.",
        "Koşullar değişir, alarm çalar veya iletişim koparsa işi durdurup çıkış ve yeniden değerlendirme prosedürünü uygulayın."
      ],
      "en": [
        "Identify the space, reason for entry and its hazard/permit classification.",
        "Verify required entry permit, energy/process isolation, access and external barriers.",
        "Have a competent person confirm gas testing, instrument condition and ongoing monitoring requirements.",
        "Confirm attendant/entrant duties, communication, entrant tracking and practical rescue availability.",
        "On changing conditions, alarms or lost communication, stop and evacuate under the approved procedure."
      ]
    },
    "example": {
      "tr": "Örnek — Tank içi muayene: Hat körleme ve LOTO kayıtları kontrol edilir; giriş öncesi atmosfer ölçümü belgelenir; gözcü, iletişim ve kurtarma düzeni doğrulanmadan giriş yapılmaz.",
      "en": "Example — Tank inspection: Check line blinds and LOTO records, document pre-entry atmosphere measurements and confirm attendant, communications and rescue arrangements before entry."
    },
    "sections": [
      {
        "title": {
          "tr": "Alan ve giriş organizasyonu",
          "en": "Space and entry arrangements"
        },
        "fields": [
          {
            "id": "space",
            "label": {
              "tr": "Alan / ekipman / giriş noktası",
              "en": "Space / asset / entry point"
            }
          },
          {
            "id": "purpose",
            "label": {
              "tr": "İşin amacı",
              "en": "Purpose of entry"
            }
          },
          {
            "id": "shift",
            "label": {
              "tr": "Tarih / vardiya",
              "en": "Date / shift"
            }
          },
          {
            "id": "permit",
            "label": {
              "tr": "Geçerli kapalı alan giriş izni",
              "en": "Valid confined-space entry permit"
            }
          },
          {
            "id": "roles",
            "label": {
              "tr": "Girişçi / gözcü / giriş amiri",
              "en": "Entrants / attendant / entry supervisor"
            }
          }
        ]
      },
      {
        "title": {
          "tr": "İzleme, acil durum ve yeniden kontrol",
          "en": "Monitoring, emergency and revalidation"
        },
        "fields": [
          {
            "id": "test",
            "label": {
              "tr": "Gaz testleri: ölçüm türü, zaman, ölçen kişi",
              "en": "Atmospheric tests: type, time, tester"
            },
            "multiline": true
          },
          {
            "id": "monitor",
            "label": {
              "tr": "Havalandırma ve sürekli izleme düzeni",
              "en": "Ventilation and continued monitoring"
            },
            "multiline": true
          },
          {
            "id": "rescue",
            "label": {
              "tr": "Kurtarma servisi / çağrı yöntemi",
              "en": "Rescue service and activation method"
            },
            "multiline": true
          },
          {
            "id": "stop",
            "label": {
              "tr": "Tahliye ve durdurma kriterleri",
              "en": "Evacuation and stop-work triggers"
            },
            "multiline": true
          }
        ]
      }
    ],
    "table": {
      "title": {
        "tr": "Giriş öncesi kontrol matrisi",
        "en": "Pre-entry verification matrix"
      },
      "columns": [
        {
          "tr": "Kontrol konusu",
          "en": "Control point"
        },
        {
          "tr": "Kanıt / ölçüm",
          "en": "Evidence / reading"
        },
        {
          "tr": "Sonuç / eksik",
          "en": "Result / gap"
        },
        {
          "tr": "Doğrulayan",
          "en": "Verified by"
        }
      ],
      "rows": 5
    },
    "note": {
      "tr": "Bu kontrol formu mevzuattaki giriş izin belgesinin, yetkili amir onayının, geçerli atmosfer testinin veya kurtarma planının yerine geçmez. ABD 1910.146 yalnızca ilgili kapsamdaki işyerleri için kaynaktır.",
      "en": "This worksheet is not a statutory entry permit, atmosphere certificate, supervisor authorization or rescue plan. OSHA 1910.146 is a US regulation with defined scope; verify local requirements."
    },
    "faq": [
      {
        "question": {
          "tr": "Ölçümü bir kez yapmak yeterli midir?",
          "en": "Is one gas test enough?"
        },
        "answer": {
          "tr": "Hayır. Tehlikeye ve izin koşullarına göre çalışma boyunca izleme veya tekrar test gerekebilir.",
          "en": "Not necessarily. Continue monitoring or retesting as required by the hazards and approved permit."
        }
      },
      {
        "question": {
          "tr": "Gözcü yerine çalışanlardan biri bakabilir mi?",
          "en": "Can any worker act as attendant?"
        },
        "answer": {
          "tr": "Gözcünün görevleri, yetkinliği ve dışarıda kalma sorumluluğu giriş programına uygun olmalıdır; gelişigüzel görevlendirme uygun değildir.",
          "en": "Attendants must meet the entry program's role and competency requirements and remain outside as required."
        }
      }
    ],
    "related": [
      {
        "path": "/knowledge-base/confined-space",
        "label": {
          "tr": "Kapalı alan güvenliği rehberi",
          "en": "Confined-space safety guide"
        }
      },
      {
        "path": "/knowledge-base/confined-space-attendant-duties",
        "label": {
          "tr": "Gözcünün görevleri",
          "en": "Attendant duties"
        }
      },
      {
        "path": "/field-forms/loto-isolation-verification",
        "label": {
          "tr": "LOTO doğrulama formu",
          "en": "LOTO verification form"
        }
      }
    ],
    "references": [
      {
        "label": "OSHA 29 CFR 1910.146 — Permit-Required Confined Spaces",
        "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146"
      }
    ]
  },
  {
    "slug": "lifting-operation-plan-review",
    "title": {
      "tr": "Kaldırma Operasyonu Planı Kontrol Formu",
      "en": "Lifting Operation Plan Review Template"
    },
    "description": {
      "tr": "Vinç ve sapanlama öncesi yük bilgisi, kapasite, yarıçap, zemin, kaldırma ekipmanı, işaretçi ve yasaklı bölge kontrolü için ücretsiz form.",
      "en": "Free lifting plan review worksheet covering load data, crane capacity, radius, ground conditions, rigging equipment, banksman communications and exclusion zones."
    },
    "summary": {
      "tr": "Yetkin kaldırma planlayıcısının hazırladığı plana karşı kritik saha koşullarını gözden geçirin. Bu form mühendislik hesabı, rigging tasarımı veya yetkin kişiden onay yerine kullanılamaz.",
      "en": "Use this worksheet to review site conditions against a lift plan prepared by competent personnel. It does not calculate sling loads, approve crane configuration or replace an engineered lift plan."
    },
    "steps": {
      "tr": [
        "Yük ağırlığı, ağırlık merkezi, kaldırma noktaları ve işin kapsamını doğrulayın.",
        "Seçilen vinç/ekipmanın çalışma yarıçapını, konfigürasyonunu, kapasite çizelgesini ve zemin desteğini yetkin kişiyle doğrulayın.",
        "Sapanlar, bağlantı elemanları ve kancalar için kimlik, kontrol ve uygunluk kayıtlarını inceleyin.",
        "Yük hareket güzergâhını, enerji hatlarını, rüzgârı, yasaklı alanı ve personel konumlarını gözden geçirin.",
        "İşaretçi, operatör, sapancı ve kaldırma sorumlusu arasında iletişim ve durdurma kriterlerini belirleyin."
      ],
      "en": [
        "Verify load mass, centre of gravity, lift points and scope.",
        "Have competent personnel confirm crane configuration, operating radius, load chart and ground support.",
        "Review identification, inspection and suitability of slings, shackles, hooks and other accessories.",
        "Check load travel, overhead lines, wind, exclusion zones and personnel positions.",
        "Confirm signaler/operator/rigger communications, roles and stop-work triggers."
      ]
    },
    "example": {
      "tr": "Örnek — Ekipman skid kaldırması: Doğrulanmış yük kütlesi ve ağırlık merkezi kaldırma planına işlenir; vinç konumu ve zemin kontrol edilir, yük altında personel bulunmasına izin verilmez.",
      "en": "Example — Lifting an equipment skid: Verify mass and centre of gravity in the approved plan, assess crane positioning and ground support, and keep personnel out of the suspended-load area."
    },
    "sections": [
      {
        "title": {
          "tr": "Operasyon ve yük bilgileri",
          "en": "Lift and load details"
        },
        "fields": [
          {
            "id": "location",
            "label": {
              "tr": "Lokasyon / yükün güzergâhı",
              "en": "Location / load path"
            }
          },
          {
            "id": "load",
            "label": {
              "tr": "Yük tanımı / doğrulanmış ağırlık",
              "en": "Load description / verified mass"
            }
          },
          {
            "id": "equipment",
            "label": {
              "tr": "Vinç / ekipman kimliği",
              "en": "Crane / lifting equipment ID"
            }
          },
          {
            "id": "plan",
            "label": {
              "tr": "Onaylı kaldırma planı referansı",
              "en": "Approved lifting-plan reference"
            }
          },
          {
            "id": "lead",
            "label": {
              "tr": "Kaldırma sorumlusu / işaretçi",
              "en": "Lift supervisor / signaler"
            }
          }
        ]
      },
      {
        "title": {
          "tr": "Kritik kısıtlar ve onaylanmamış koşullar",
          "en": "Critical constraints and unresolved issues"
        },
        "fields": [
          {
            "id": "capacity",
            "label": {
              "tr": "Yarıçap, konfigürasyon ve kapasite referansı",
              "en": "Radius, configuration and load-chart reference"
            },
            "multiline": true
          },
          {
            "id": "ground",
            "label": {
              "tr": "Zemin, oturma ayakları ve yaklaşma mesafeleri",
              "en": "Ground, outriggers and clearances"
            },
            "multiline": true
          },
          {
            "id": "weather",
            "label": {
              "tr": "Rüzgâr ve durdurma koşulları",
              "en": "Weather and stop criteria"
            },
            "multiline": true
          },
          {
            "id": "change",
            "label": {
              "tr": "Plana aykırılık / yetkin kişi tekrar incelemesi",
              "en": "Deviations requiring competent re-review"
            },
            "multiline": true
          }
        ]
      }
    ],
    "table": {
      "title": {
        "tr": "Ekipman ve saha kontrol kayıtları",
        "en": "Rigging and site controls"
      },
      "columns": [
        {
          "tr": "Kontrol / ekipman",
          "en": "Check / equipment"
        },
        {
          "tr": "Gerekli kriter",
          "en": "Acceptance basis"
        },
        {
          "tr": "Sahada doğrulama",
          "en": "Field verification"
        },
        {
          "tr": "Sorumlu",
          "en": "Responsible"
        }
      ],
      "rows": 5
    },
    "note": {
      "tr": "Bu şablon vinç kapasitesi, sapan gerilmesi, yük stabilitesi veya zemin dayanımı hesabı yapmaz. Kaldırma faaliyetini yalnızca yetkin kişiler planlamalı, denetlemeli ve uygun yöntemle gerçekleştirmelidir.",
      "en": "This template does not calculate crane capacity, sling tension, load stability or bearing pressure. Competent persons must plan, supervise and conduct lifting operations under the applicable rules."
    },
    "faq": [
      {
        "question": {
          "tr": "Kaldırma planı her işte aynı ayrıntıda mı olmalı?",
          "en": "Does every lift need the same level of plan?"
        },
        "answer": {
          "tr": "Hayır. Planlama ayrıntısı operasyonun karmaşıklığına ve riskine göre yetkin kişi tarafından belirlenmelidir.",
          "en": "No. The level of planning and documentation should reflect the lift's complexity and risk, as determined by competent people."
        }
      },
      {
        "question": {
          "tr": "Bu form yük hesabı yapar mı?",
          "en": "Does this form calculate rigging forces?"
        },
        "answer": {
          "tr": "Hayır. Gerekli tüm mühendislik hesapları yetkin kişi ve uygun araçlarla ayrı yapılmalıdır.",
          "en": "No. Engineering calculations and load-chart decisions must be completed separately by competent personnel."
        }
      }
    ],
    "related": [
      {
        "path": "/knowledge-base/crane-safety",
        "label": {
          "tr": "Vinç güvenliği rehberi",
          "en": "Crane safety guide"
        }
      },
      {
        "path": "/knowledge-base/suspended-load-exclusion-zones",
        "label": {
          "tr": "Askıdaki yük yasaklı bölgeleri",
          "en": "Suspended-load exclusion zones"
        }
      },
      {
        "path": "/tools/sling-tension",
        "label": {
          "tr": "Sapan kuvvet aracı",
          "en": "Sling tension tool"
        }
      }
    ],
    "references": [
      {
        "label": "HSE UK — Planning and Organising Lifting Operations",
        "url": "https://www.hse.gov.uk/work-equipment-machinery/planning-organising-lifting-operations.htm"
      }
    ]
  },
  {
    "slug": "ptw-shift-handover",
    "title": {
      "tr": "İş İzni (PTW) Vardiya Devir Formu",
      "en": "Permit to Work (PTW) Shift Handover Checklist"
    },
    "description": {
      "tr": "PTW vardiya değişiminde açık işler, izolasyonlar, SIMOPS, izin durumu, tehlikeler ve yeniden onay ihtiyacını kaydetmek için saha formu.",
      "en": "Free permit-to-work shift handover checklist for open permits, isolations, SIMOPS, plant state, outstanding hazards and required reauthorization."
    },
    "summary": {
      "tr": "Vardiya değişiminde işin güvenli durumu kadar devredilmemiş tehlikeleri ve açık izinleri de aktarın. Devralan ekip izin geçerliliğini sahada yeniden doğrulamalıdır.",
      "en": "Communicate outstanding permit jobs, equipment status, isolations and interacting activities across shifts. The incoming team must independently verify required revalidation."
    },
    "steps": {
      "tr": [
        "Açık, askıya alınmış veya kapanmış izinleri numara ve durumlarıyla çıkarın.",
        "İş sahasının bırakıldığı fiziksel durumu, açık ekipmanları, izolasyonları ve bariyerleri sahada kontrol edin.",
        "Kesişen faaliyetleri, değişen şartları, gerekli gaz testlerini ve kontrol eksiklerini aktarın.",
        "Devreden ve devralan yetkililer görev, iletişim ve eksik aksiyonları gözden geçirsin.",
        "İzin uzatma ve yeniden onay için işletme prosedürü tamamlanmadan işe devam edilmesin."
      ],
      "en": [
        "List open, suspended and closed permits with current status and identifiers.",
        "Walk down actual plant condition, open equipment, isolations and barricades.",
        "Communicate overlapping work, changing conditions, necessary gas tests and outstanding safeguards.",
        "Have outgoing and incoming responsible persons review responsibilities, communication and actions.",
        "Do not resume work until the employer's permit revalidation or reissue process is satisfied."
      ]
    },
    "example": {
      "tr": "Örnek — Basınç testi sonrası devir: Hattın boşaltma durumu, izole valfler, kapalı yürüyüş yolu, açık izin numarası ve devralan ekibin doğrulaması kayda geçirilir.",
      "en": "Example — Handover after a pressure test: Record line depressurization status, isolated valves, blocked access, open permit ID and incoming shift verification."
    },
    "sections": [
      {
        "title": {
          "tr": "Vardiya ve izin kimliği",
          "en": "Shift and permit identification"
        },
        "fields": [
          {
            "id": "site",
            "label": {
              "tr": "Saha / ekipman",
              "en": "Area / equipment"
            }
          },
          {
            "id": "outgoing",
            "label": {
              "tr": "Devreden vardiya / sorumlu",
              "en": "Outgoing shift / responsible person"
            }
          },
          {
            "id": "incoming",
            "label": {
              "tr": "Devralan vardiya / sorumlu",
              "en": "Incoming shift / responsible person"
            }
          },
          {
            "id": "date",
            "label": {
              "tr": "Devir tarihi / saati",
              "en": "Handover date / time"
            }
          },
          {
            "id": "permit",
            "label": {
              "tr": "Açık iş izinleri / numaralar",
              "en": "Open permit references"
            }
          }
        ]
      },
      {
        "title": {
          "tr": "Durum, kontrol ve yeniden doğrulama",
          "en": "Status, controls and revalidation"
        },
        "fields": [
          {
            "id": "plant",
            "label": {
              "tr": "Ekipman ve izolasyonların bırakıldığı durum",
              "en": "Plant and isolation status"
            },
            "multiline": true
          },
          {
            "id": "simops",
            "label": {
              "tr": "SIMOPS / bitişik alan faaliyetleri",
              "en": "SIMOPS / adjacent activities"
            },
            "multiline": true
          },
          {
            "id": "outstanding",
            "label": {
              "tr": "Kalan tehlikeler ve açık aksiyonlar",
              "en": "Outstanding hazards and actions"
            },
            "multiline": true
          },
          {
            "id": "revalidate",
            "label": {
              "tr": "Devralan yetkili doğrulaması / yeniden izin",
              "en": "Incoming authority verification / reauthorization"
            },
            "multiline": true
          }
        ]
      }
    ],
    "table": {
      "title": {
        "tr": "Açık izinler ve kontrol devir kayıtları",
        "en": "Open permits and handover controls"
      },
      "columns": [
        {
          "tr": "İzin / iş",
          "en": "Permit / task"
        },
        {
          "tr": "Mevcut durum",
          "en": "Current state"
        },
        {
          "tr": "Kalan kontrol / aksiyon",
          "en": "Remaining control / action"
        },
        {
          "tr": "Devralan",
          "en": "Incoming owner"
        }
      ],
      "rows": 5
    },
    "note": {
      "tr": "Bu form bir izni devretme, yenileme veya uzatma yetkisi sağlamaz. Kurumun PTW sistemi, izolasyon sertifikaları ve karşılıklı saha doğrulaması zorunludur.",
      "en": "This worksheet does not transfer, extend or reissue a permit. Follow the site's PTW authority, isolation certificates and required field revalidation."
    },
    "faq": [
      {
        "question": {
          "tr": "İş izni vardiya değişiminde otomatik devam eder mi?",
          "en": "Does a permit automatically carry over to the next shift?"
        },
        "answer": {
          "tr": "Hayır. Geçerlilik ve devralma koşulları onaylı PTW prosedürüne göre doğrulanmalıdır.",
          "en": "No. Verify validity and handover requirements against the site's approved PTW procedure."
        }
      },
      {
        "question": {
          "tr": "SIMOPS neden devredilir?",
          "en": "Why must SIMOPS be included?"
        },
        "answer": {
          "tr": "Bir işin kontrolü diğer işi etkileyebilir; eşzamanlı faaliyetlerin karşılıklı tehlikeleri devralan ekibe bildirilmelidir.",
          "en": "One job can create a hazard for another, so interacting work and safeguards must be communicated."
        }
      }
    ],
    "related": [
      {
        "path": "/knowledge-base/permit-to-work",
        "label": {
          "tr": "İş izni rehberi",
          "en": "Permit-to-work guide"
        }
      },
      {
        "path": "/tools/simops",
        "label": {
          "tr": "SIMOPS planlayıcı",
          "en": "SIMOPS planner"
        }
      },
      {
        "path": "/field-forms/hot-work-prestart-review",
        "label": {
          "tr": "Sıcak çalışma kontrolü",
          "en": "Hot work pre-start review"
        }
      }
    ],
    "references": [
      {
        "label": "HSE UK — Permit to Work Systems",
        "url": "https://www.hse.gov.uk/humanfactors/topics/ptw.htm"
      }
    ]
  },
  {
    "slug": "toolbox-talk-attendance",
    "title": {
      "tr": "Toolbox Talk Katılım ve Aksiyon Takip Formu",
      "en": "Toolbox Talk Attendance and Action Record"
    },
    "description": {
      "tr": "Toolbox talk kayıt şablonu: günlük konu, saha tehlikeleri, katılımcı bilgileri, çalışan soruları ve kapanacak aksiyonlar için ücretsiz form.",
      "en": "Free toolbox talk attendance template with topic, hazards discussed, participant acknowledgement, worker questions and follow-up safety actions."
    },
    "summary": {
      "tr": "Günlük emniyet konuşmasını yalnızca imza toplamaya indirgemeyin. İşe özel riskleri, çalışanların sorularını ve uygulanması gereken aksiyonları kayıt altına alın.",
      "en": "Go beyond an attendance signature: record the actual worksite hazards, worker questions, understanding checks and actions requiring follow-up."
    },
    "steps": {
      "tr": [
        "O günkü iş ve saha koşullarına uygun tek bir konu seçin.",
        "Riskleri, beklenen kontrolleri ve işi durdurma koşullarını çalışanların anlayacağı dilde anlatın.",
        "Çalışanlardan örnek ve soru isteyin; anlaşılmayan noktaları yeniden açıklayın.",
        "Katılımı ve gerekli saha uygulaması veya düzeltici faaliyetleri kayıt altına alın.",
        "Belirlenen aksiyonların uygulanmasını ve etkisini sonraki saha kontrolünde doğrulayın."
      ],
      "en": [
        "Choose a topic relevant to the day's tasks and actual site conditions.",
        "Explain hazards, required safeguards and stop-work triggers in a language the crew understands.",
        "Ask workers for examples or questions and clarify any misunderstanding.",
        "Record attendance and follow-up controls or corrective actions.",
        "Verify that agreed actions were implemented and remain effective in the field."
      ]
    },
    "example": {
      "tr": "Örnek — Düşen cisimler: Ekip, yüksekteki alet sabitleme ve alt bölge kapatma örneklerini tartışır; eksik bariyer için sorumlu ve tamamlanma saati belirlenir.",
      "en": "Example — Dropped objects: The crew discusses tool tethering and exclusion zones; an owner and due time are assigned to a missing barrier."
    },
    "sections": [
      {
        "title": {
          "tr": "Günlük brifing bilgileri",
          "en": "Daily briefing details"
        },
        "fields": [
          {
            "id": "topic",
            "label": {
              "tr": "Konuşmanın konusu / görev",
              "en": "Toolbox topic / task"
            }
          },
          {
            "id": "area",
            "label": {
              "tr": "Saha / ekip",
              "en": "Area / crew"
            }
          },
          {
            "id": "date",
            "label": {
              "tr": "Tarih / saat / vardiya",
              "en": "Date / time / shift"
            }
          },
          {
            "id": "leader",
            "label": {
              "tr": "Konuşmayı yöneten kişi",
              "en": "Talk leader"
            }
          },
          {
            "id": "language",
            "label": {
              "tr": "Kullanılan dil / tercüme ihtiyacı",
              "en": "Language / interpretation needs"
            }
          }
        ]
      },
      {
        "title": {
          "tr": "Katılım, anlayış ve aksiyonlar",
          "en": "Participation, understanding and actions"
        },
        "fields": [
          {
            "id": "hazards",
            "label": {
              "tr": "Tartışılan kritik saha tehlikeleri",
              "en": "Critical hazards discussed"
            },
            "multiline": true
          },
          {
            "id": "feedback",
            "label": {
              "tr": "Çalışan soruları / geri bildirimleri",
              "en": "Worker questions / feedback"
            },
            "multiline": true
          },
          {
            "id": "demonstration",
            "label": {
              "tr": "Anlayış kontrolü / saha gösterimi",
              "en": "Understanding check / field demonstration"
            },
            "multiline": true
          },
          {
            "id": "followup",
            "label": {
              "tr": "Açık aksiyon ve kontrol planı",
              "en": "Open actions and verification plan"
            },
            "multiline": true
          }
        ]
      }
    ],
    "table": {
      "title": {
        "tr": "Katılımcı teyidi ve aksiyonlar",
        "en": "Attendee acknowledgement and actions"
      },
      "columns": [
        {
          "tr": "Katılımcı / ekip",
          "en": "Participant / crew"
        },
        {
          "tr": "Katılım / teyit",
          "en": "Attendance / acknowledgement"
        },
        {
          "tr": "Aksiyon / soru",
          "en": "Action / question"
        },
        {
          "tr": "Sorumlu / tarih",
          "en": "Owner / due date"
        }
      ],
      "rows": 6
    },
    "note": {
      "tr": "Katılım kaydı, yetkinlik değerlendirmesi veya mevzuatın gerektirdiği özel eğitimin tamamlandığına tek başına kanıt değildir. Kişisel bilgileri işveren prosedürüne ve veri koruma kurallarına uygun yönetin.",
      "en": "Attendance alone does not establish competence or completion of legally required task-specific training. Handle personal data according to your employer's policy and privacy rules."
    },
    "faq": [
      {
        "question": {
          "tr": "Toolbox Talk kaç dakika olmalı?",
          "en": "How long should a toolbox talk last?"
        },
        "answer": {
          "tr": "Süre sabit bir rakam değil; konunun riski, çalışanların anlama düzeyi ve sorularına göre yeterli olmalıdır.",
          "en": "Duration should be appropriate to the hazard, task complexity and workers' understanding, rather than an arbitrary fixed number."
        }
      },
      {
        "question": {
          "tr": "İmza eğitim yeterliliğini kanıtlar mı?",
          "en": "Does a signature prove competence?"
        },
        "answer": {
          "tr": "Hayır. Yeterlilik, gerekli eğitimin niteliği ve uygulamalı doğrulama ayrı değerlendirilmelidir.",
          "en": "No. Competence and required training must be established through the appropriate methods and evidence."
        }
      }
    ],
    "related": [
      {
        "path": "/toolbox",
        "label": {
          "tr": "Toolbox konuşmaları kütüphanesi",
          "en": "Toolbox talk library"
        }
      },
      {
        "path": "/knowledge-base/working-at-height",
        "label": {
          "tr": "Yüksekte çalışma rehberi",
          "en": "Working at height guide"
        }
      },
      {
        "path": "/field-forms/safety-observation-action-log",
        "label": {
          "tr": "Aksiyon takip formu",
          "en": "Safety action tracker"
        }
      }
    ],
    "references": [
      {
        "label": "OSHA — Safety and Health Education and Training",
        "url": "https://www.osha.gov/safety-management/education-training"
      },
      {
        "label": "OSHA — Worker Participation",
        "url": "https://www.osha.gov/safety-management/worker-participation"
      }
    ]
  },
  {
    "slug": "safety-observation-action-log",
    "title": {
      "tr": "İSG Saha Gözlem ve Düzeltici Aksiyon Formu",
      "en": "Safety Observation and Corrective Action Log"
    },
    "description": {
      "tr": "Güvenli/güvensiz saha gözlemleri, tehlikelerin kontrolü, aksiyon sorumlusu, hedef tarih ve etkinlik doğrulaması için ücretsiz İSG formu.",
      "en": "Free safety observation and corrective action log for positive findings, hazards, interim controls, action owners, due dates and verification of effectiveness."
    },
    "summary": {
      "tr": "Güvenli davranışları görünür kılın, tehlikeleri nesnel anlatın ve aksiyonları gerçek saha kontrolüyle kapatın. Çalışanları suçlamak yerine kontrol sisteminin nasıl iyileştirileceğine odaklanın.",
      "en": "Document positive practices and unsafe conditions objectively, assign practical safeguards and verify closure in the field rather than treating a completed checkbox as proof of risk reduction."
    },
    "steps": {
      "tr": [
        "Gözlemi tarih, faaliyet ve yer bilgisiyle olgusal olarak tanımlayın.",
        "Güvenli uygulama mı yoksa risk oluşturan koşul mu olduğunu belirleyin; olası zararı değerlendirin.",
        "Acil risk varsa çalışmayı durdurun, alanı güvene alın ve yetkilileri bilgilendirin.",
        "Kalıcı kontrolü, sorumlu kişiyi ve hedef tarihi belirleyin.",
        "Aksiyonun uygulandığını ve tehlikeyi etkili biçimde kontrol ettiğini yerinde doğrulayın."
      ],
      "en": [
        "Capture the observed work, date and area in factual terms.",
        "Distinguish positive practice from a hazardous condition and assess credible harm.",
        "For immediate danger, stop work, make the area safe and notify responsible people.",
        "Assign a durable control, owner and due date.",
        "Verify in the field that the control was implemented and is effective."
      ]
    },
    "example": {
      "tr": "Örnek — İskele altında korumasız yürüyüş yolu: Alan geçici olarak kapatılır; uygun düşen cisim bariyeri kurulur. Aksiyon, bariyer yerinde görülmeden kapatılmaz.",
      "en": "Example — Unprotected walkway below scaffolding: Restrict access, install a suitable dropped-object barrier and only close the action after the safeguard is verified on site."
    },
    "sections": [
      {
        "title": {
          "tr": "Gözlem bilgileri",
          "en": "Observation details"
        },
        "fields": [
          {
            "id": "area",
            "label": {
              "tr": "Alan / ekipman",
              "en": "Area / equipment"
            }
          },
          {
            "id": "date",
            "label": {
              "tr": "Tarih ve saat",
              "en": "Date and time"
            }
          },
          {
            "id": "activity",
            "label": {
              "tr": "İş / faaliyet",
              "en": "Task / activity"
            }
          },
          {
            "id": "type",
            "label": {
              "tr": "Pozitif / güvensiz durum / davranış",
              "en": "Positive / unsafe condition / behavior"
            }
          },
          {
            "id": "observer",
            "label": {
              "tr": "Gözlemci (gerekliyse)",
              "en": "Observer (if required)"
            }
          }
        ]
      },
      {
        "title": {
          "tr": "Kontroller ve etkinlik",
          "en": "Controls and effectiveness"
        },
        "fields": [
          {
            "id": "description",
            "label": {
              "tr": "Olgusal gözlem ve olası sonuç",
              "en": "Factual observation and credible outcome"
            },
            "multiline": true
          },
          {
            "id": "immediate",
            "label": {
              "tr": "Alınan geçici güvenlik önlemi",
              "en": "Immediate interim safeguard"
            },
            "multiline": true
          },
          {
            "id": "lasting",
            "label": {
              "tr": "Kalıcı kontrol ve gerekli kaynak",
              "en": "Long-term control and resources"
            },
            "multiline": true
          },
          {
            "id": "verify",
            "label": {
              "tr": "Saha doğrulama / kapanış kanıtı",
              "en": "Field verification / close-out evidence"
            },
            "multiline": true
          }
        ]
      }
    ],
    "table": {
      "title": {
        "tr": "Aksiyon takip tablosu",
        "en": "Corrective action tracker"
      },
      "columns": [
        {
          "tr": "Tehlike / iyi uygulama",
          "en": "Hazard / positive practice"
        },
        {
          "tr": "Kontrol / faaliyet",
          "en": "Control / action"
        },
        {
          "tr": "Sorumlu / hedef tarih",
          "en": "Owner / due date"
        },
        {
          "tr": "Doğrulama / durum",
          "en": "Verification / status"
        }
      ],
      "rows": 5
    },
    "note": {
      "tr": "Bu şablon resmî olay bildirim, disiplin veya iş durdurma prosedürünün yerine geçmez. Hassas kişisel bilgileri gereksiz yere kaydetmeyin ve çalışan katılımını caydırıcı puanlamadan kaçının.",
      "en": "This log does not replace incident reporting or emergency stop-work procedures. Avoid unnecessary personal data and reporting incentives that discourage workers from speaking up."
    },
    "faq": [
      {
        "question": {
          "tr": "Pozitif gözlem kaydedilmeli mi?",
          "en": "Should positive observations be recorded?"
        },
        "answer": {
          "tr": "Evet, etkili kontrolleri ve güvenli saha uygulamalarını görünür kılmak öğrenmeyi destekler.",
          "en": "Yes. Recognising effective controls helps reinforce and share good practices."
        }
      },
      {
        "question": {
          "tr": "Aksiyon yalnızca tamamlandığında kapanır mı?",
          "en": "Is completion enough to close an action?"
        },
        "answer": {
          "tr": "Hayır. Yetkili kişi alınan önlemin sahada etkili olduğunu ayrıca doğrulamalıdır.",
          "en": "No. A responsible person should verify that the implemented control actually works in the field."
        }
      }
    ],
    "related": [
      {
        "path": "/knowledge-base/incident-reporting",
        "label": {
          "tr": "Olay bildirim rehberi",
          "en": "Incident reporting guide"
        }
      },
      {
        "path": "/field-forms/near-miss-report",
        "label": {
          "tr": "Ramak kala formu",
          "en": "Near miss form"
        }
      },
      {
        "path": "/checklists",
        "label": {
          "tr": "Saha kontrol listeleri",
          "en": "Inspection checklists"
        }
      }
    ],
    "references": [
      {
        "label": "OSHA — Hazard Identification and Assessment",
        "url": "https://www.osha.gov/safety-management/hazard-identification"
      },
      {
        "label": "OSHA — Worker Participation",
        "url": "https://www.osha.gov/safety-management/worker-participation"
      }
    ]
  }
];
