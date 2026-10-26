/** Topic-specific publication data. Reference targets are not certifications or a claim of legal compliance.
 * No expert approval/date is inferred. Sources blocked in this review remain explicitly unverified.
 * Unknown codes fail visibly; never inherit working-at-height requirements. */
export type Bilingual = {tr:string;en:string};
export type TechnicalReference = {label:string;jurisdiction:'US-construction'|'US-general-industry'|'US-general-industry-and-construction'|'GB-guidance';url:string;verification:'not-verified-in-session'};
export type PosterTechnicalProfile = {reference:keyof typeof technicalReferences;preJob:Bilingual[];controls:{value:Bilingual;label:Bilingual}[];ppeSelection:Bilingual[];ppeIcons:string[];ppeNote:Bilingual;reviewStatus:'site-validation-required'};
export const technicalReferences = {
  "height": {
    "label": "OSHA 1926.501 / 1926.502",
    "jurisdiction": "US-construction",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.502",
    "verification": "not-verified-in-session"
  },
  "ladder": {
    "label": "OSHA 1926.1053",
    "jurisdiction": "US-construction",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.1053",
    "verification": "not-verified-in-session"
  },
  "housekeeping": {
    "label": "OSHA 1910.22 / 1926.25",
    "jurisdiction": "US-general-industry-and-construction",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22",
    "verification": "not-verified-in-session"
  },
  "excavation": {
    "label": "OSHA 1926.651 / 1926.652",
    "jurisdiction": "US-construction",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.651",
    "verification": "not-verified-in-session"
  },
  "chemical": {
    "label": "OSHA 1910.1200",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200",
    "verification": "not-verified-in-session"
  },
  "forklift": {
    "label": "OSHA 1910.178",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178",
    "verification": "not-verified-in-session"
  },
  "manual": {
    "label": "HSE — Manual handling",
    "jurisdiction": "GB-guidance",
    "url": "https://www.hse.gov.uk/msd/manual-handling/index.htm",
    "verification": "not-verified-in-session"
  },
  "dropped": {
    "label": "OSHA 1926.501(c) / 1926.502(j)",
    "jurisdiction": "US-construction",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.502",
    "verification": "not-verified-in-session"
  },
  "scaffold": {
    "label": "OSHA 1926.451",
    "jurisdiction": "US-construction",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.451",
    "verification": "not-verified-in-session"
  },
  "hotwork": {
    "label": "OSHA 1910.252",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.252",
    "verification": "not-verified-in-session"
  },
  "confined": {
    "label": "OSHA 1910.146",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146",
    "verification": "not-verified-in-session"
  },
  "electrical": {
    "label": "OSHA 1910.333 / 1910.334",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.333",
    "verification": "not-verified-in-session"
  },
  "loto": {
    "label": "OSHA 1910.147",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147",
    "verification": "not-verified-in-session"
  },
  "fire": {
    "label": "OSHA 1910.38 / .39 / .157",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.157",
    "verification": "not-verified-in-session"
  },
  "ppe": {
    "label": "OSHA 1910.132",
    "jurisdiction": "US-general-industry",
    "url": "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.132",
    "verification": "not-verified-in-session"
  }
} as const satisfies Record<string,TechnicalReference>;

export const posterTechnicalProfiles = {
  "SRN-WAH-001": {
    "reference": "height",
    "preJob": [
      {
        "tr": "İş izni",
        "en": "Work permit"
      },
      {
        "tr": "Risk değerlendirmesi",
        "en": "Risk assessment"
      },
      {
        "tr": "Toplu koruma",
        "en": "Collective protection"
      },
      {
        "tr": "Onaylı ankraj",
        "en": "Approved anchorage"
      },
      {
        "tr": "Düşüş açıklığı",
        "en": "Fall clearance"
      },
      {
        "tr": "Kurtarma planı",
        "en": "Rescue plan"
      },
      {
        "tr": "Hava ve alt alan",
        "en": "Weather and drop zone"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "TOPLU",
          "en": "COLLECTIVE"
        },
        "label": {
          "tr": "Önce korkuluk ve platform",
          "en": "Guardrails and platforms first"
        }
      },
      {
        "value": {
          "tr": "ANKRAJ",
          "en": "ANCHOR"
        },
        "label": {
          "tr": "Yetkin tasarım ve uyum",
          "en": "Competent design and compatibility"
        }
      },
      {
        "value": {
          "tr": "AÇIKLIK",
          "en": "CLEARANCE"
        },
        "label": {
          "tr": "Alt seviyeye çarpmayı önle",
          "en": "Prevent lower-level contact"
        }
      },
      {
        "value": {
          "tr": "KURTARMA",
          "en": "RESCUE"
        },
        "label": {
          "tr": "İşe başlamadan hazırla",
          "en": "Prepare before work"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş ve çene bağı uyumu",
        "en": "Head and chin-strap fit"
      },
      {
        "tr": "Göze parçacık riski",
        "en": "Eye particle hazard"
      },
      {
        "tr": "Kavrama ve mekanik risk",
        "en": "Grip and mechanical risk"
      },
      {
        "tr": "Kaymaz taban",
        "en": "Slip-resistant sole"
      },
      {
        "tr": "Uyumlu düşüş sistemi",
        "en": "Compatible fall system"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🪢"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-LAD-001": {
    "reference": "ladder",
    "preJob": [
      {
        "tr": "Merdiven tipi",
        "en": "Ladder type"
      },
      {
        "tr": "Üretici kapasitesi",
        "en": "Manufacturer rating"
      },
      {
        "tr": "Basamak ve ayaklar",
        "en": "Rungs and feet"
      },
      {
        "tr": "Zemin ve açı",
        "en": "Ground and angle"
      },
      {
        "tr": "Kaymaya karşı sabitleme",
        "en": "Secure against movement"
      },
      {
        "tr": "Güvenli erişim",
        "en": "Safe access"
      },
      {
        "tr": "Elektrik ve trafik",
        "en": "Electricity and traffic"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "AÇI",
          "en": "ANGLE"
        },
        "label": {
          "tr": "Üretici kurulum talimatı",
          "en": "Manufacturer setup instructions"
        }
      },
      {
        "value": {
          "tr": "ERİŞİM",
          "en": "ACCESS"
        },
        "label": {
          "tr": "Üst seviyeye güvenli geçiş",
          "en": "Safe transition to landing"
        }
      },
      {
        "value": {
          "tr": "TEMAS",
          "en": "CONTACT"
        },
        "label": {
          "tr": "Tırmanırken üç nokta",
          "en": "Three points when climbing"
        }
      },
      {
        "value": {
          "tr": "KAPASİTE",
          "en": "CAPACITY"
        },
        "label": {
          "tr": "Üretici yük sınırını aşma",
          "en": "Do not exceed rated load"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş darbesi riski",
        "en": "Head-impact risk"
      },
      {
        "tr": "Göze parçacık riski",
        "en": "Eye particle hazard"
      },
      {
        "tr": "Kavrama ve mekanik risk",
        "en": "Grip and mechanical risk"
      },
      {
        "tr": "Kaymaz taban",
        "en": "Slip-resistant sole"
      },
      {
        "tr": "Yalnız uygun sistemle*",
        "en": "Only with suitable system*"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🪢"
    ],
    "ppeNote": {
      "tr": "*Kemer yalnız uygun ankraj ve tasarlanmış sistemle; merdiveni bağlamak düşüş koruması değildir.",
      "en": "*Harness only with suitable anchorage and designed system; securing a ladder is not fall protection."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-HSK-001": {
    "reference": "housekeeping",
    "preJob": [
      {
        "tr": "Açık geçişler",
        "en": "Clear walkways"
      },
      {
        "tr": "Acil ekipman erişimi",
        "en": "Emergency equipment access"
      },
      {
        "tr": "Dökülme türü",
        "en": "Spill identification"
      },
      {
        "tr": "Atık ayrımı",
        "en": "Waste segregation"
      },
      {
        "tr": "Kablo ve hortumlar",
        "en": "Cables and hoses"
      },
      {
        "tr": "İstif stabilitesi",
        "en": "Stack stability"
      },
      {
        "tr": "Temizlik ekipmanı",
        "en": "Cleaning equipment"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "TEMİZ",
          "en": "CLEAN"
        },
        "label": {
          "tr": "Dökülmeyi güvenle kontrol et",
          "en": "Control spills safely"
        }
      },
      {
        "value": {
          "tr": "AÇIK",
          "en": "CLEAR"
        },
        "label": {
          "tr": "Çıkışları ve yolları kapatma",
          "en": "Keep exits and routes open"
        }
      },
      {
        "value": {
          "tr": "DÜZEN",
          "en": "ORDER"
        },
        "label": {
          "tr": "Malzemeyi güvenli istifle",
          "en": "Stack materials securely"
        }
      },
      {
        "value": {
          "tr": "BİLDİR",
          "en": "REPORT"
        },
        "label": {
          "tr": "Giderilemeyen riski izole et",
          "en": "Isolate unresolved hazards"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş darbesi riski",
        "en": "Head-impact risk"
      },
      {
        "tr": "Göze sıçrama veya parçacık",
        "en": "Splash or particle risk"
      },
      {
        "tr": "Göreve uygun eldiven",
        "en": "Task-matched gloves"
      },
      {
        "tr": "Zemin ve ayak riski",
        "en": "Ground and foot hazards"
      },
      {
        "tr": "Trafik ve görünürlük",
        "en": "Traffic and visibility"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🦺"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-EXC-001": {
    "reference": "excavation",
    "preJob": [
      {
        "tr": "Yeraltı hatları",
        "en": "Underground services"
      },
      {
        "tr": "Kazı izni",
        "en": "Excavation permit"
      },
      {
        "tr": "Zemin ve koruma",
        "en": "Soil and protection"
      },
      {
        "tr": "Kenar yükleri",
        "en": "Edge loads"
      },
      {
        "tr": "Güvenli erişim",
        "en": "Safe access"
      },
      {
        "tr": "Su ve atmosfer",
        "en": "Water and atmosphere"
      },
      {
        "tr": "Yetkin kişi kontrolü",
        "en": "Competent inspection"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "ERİŞİM",
          "en": "ACCESS"
        },
        "label": {
          "tr": "Güvenli giriş ve çıkış",
          "en": "Safe entry and exit"
        }
      },
      {
        "value": {
          "tr": "KENAR",
          "en": "EDGE"
        },
        "label": {
          "tr": "Malzeme ve yükleri kontrol et",
          "en": "Control spoil and surcharge loads"
        }
      },
      {
        "value": {
          "tr": "KORUMA",
          "en": "PROTECT"
        },
        "label": {
          "tr": "Zemine uygun iksa veya şev",
          "en": "Soil-appropriate shoring or slopes"
        }
      },
      {
        "value": {
          "tr": "KONTROL",
          "en": "INSPECT"
        },
        "label": {
          "tr": "Koşul değişiminde tekrar incele",
          "en": "Reassess when conditions change"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş darbesi riski",
        "en": "Head-impact risk"
      },
      {
        "tr": "Göze sıçrama veya parçacık",
        "en": "Splash or particle risk"
      },
      {
        "tr": "Göreve uygun eldiven",
        "en": "Task-matched gloves"
      },
      {
        "tr": "Zemin ve ayak riski",
        "en": "Ground and foot hazards"
      },
      {
        "tr": "Trafik ve görünürlük",
        "en": "Traffic and visibility"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🦺"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-CHM-001": {
    "reference": "chemical",
    "preJob": [
      {
        "tr": "Kimlik ve etiket",
        "en": "Identity and label"
      },
      {
        "tr": "Güncel SDS",
        "en": "Current SDS"
      },
      {
        "tr": "Kimyasal uyumluluk",
        "en": "Chemical compatibility"
      },
      {
        "tr": "Havalandırma",
        "en": "Ventilation"
      },
      {
        "tr": "Uygun KKD",
        "en": "Suitable PPE"
      },
      {
        "tr": "Dökülme hazırlığı",
        "en": "Spill readiness"
      },
      {
        "tr": "Acil duş ve göz yıkama",
        "en": "Shower and eyewash"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "ETİKET",
          "en": "LABEL"
        },
        "label": {
          "tr": "İçeriği ve tehlikeyi doğrula",
          "en": "Verify identity and hazards"
        }
      },
      {
        "value": {
          "tr": "SDS",
          "en": "SDS"
        },
        "label": {
          "tr": "Maddeye özel önlemler",
          "en": "Substance-specific controls"
        }
      },
      {
        "value": {
          "tr": "AYIR",
          "en": "SEGREGATE"
        },
        "label": {
          "tr": "Uyumsuz kimyasalları ayır",
          "en": "Separate incompatible chemicals"
        }
      },
      {
        "value": {
          "tr": "KORU",
          "en": "CONTROL"
        },
        "label": {
          "tr": "Maruziyeti kaynağında azalt",
          "en": "Reduce exposure at source"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Sıçrama ve göz sızdırmazlığı",
        "en": "Splash seal and eye coverage"
      },
      {
        "tr": "Madde ve geçirgenlik süresi",
        "en": "Substance and breakthrough time"
      },
      {
        "tr": "Kimyasal direnç",
        "en": "Chemical resistance"
      },
      {
        "tr": "Maddeye uygun ayakkabı",
        "en": "Substance-matched footwear"
      },
      {
        "tr": "Yetkili seçim ve uyum testi*",
        "en": "Approved selection and fit test*"
      }
    ],
    "ppeIcons": [
      "🥽",
      "🧤",
      "🥼",
      "🥾",
      "😷"
    ],
    "ppeNote": {
      "tr": "*Solunum koruması gerekiyorsa yetkili seçim, sağlık değerlendirmesi ve uygun uyum testi gerekir.",
      "en": "*When required, respiratory protection needs competent selection, medical assessment and suitable fit testing."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-FLT-001": {
    "reference": "forklift",
    "preJob": [
      {
        "tr": "Yetkili operatör",
        "en": "Authorized operator"
      },
      {
        "tr": "Vardiya kontrolü",
        "en": "Pre-shift inspection"
      },
      {
        "tr": "Kapasite plakası",
        "en": "Capacity plate"
      },
      {
        "tr": "Yük merkezi",
        "en": "Load centre"
      },
      {
        "tr": "Yaya ayrımı",
        "en": "Pedestrian separation"
      },
      {
        "tr": "Görüş ve güzergâh",
        "en": "Visibility and route"
      },
      {
        "tr": "Fren ve emniyet kemeri",
        "en": "Brakes and seat belt"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "YETKİ",
          "en": "AUTHORIZE"
        },
        "label": {
          "tr": "Uygun eğitim ve ekipman",
          "en": "Suitable training and equipment"
        }
      },
      {
        "value": {
          "tr": "KONTROL",
          "en": "INSPECT"
        },
        "label": {
          "tr": "Emniyetsiz aracı kullanma",
          "en": "Do not use an unsafe truck"
        }
      },
      {
        "value": {
          "tr": "KAPASİTE",
          "en": "CAPACITY"
        },
        "label": {
          "tr": "Yük merkezi ve ataşmanı dikkate al",
          "en": "Account for load centre and attachments"
        }
      },
      {
        "value": {
          "tr": "YAYA",
          "en": "PEOPLE"
        },
        "label": {
          "tr": "Ayrım ve görüş sağla",
          "en": "Maintain separation and visibility"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş darbesi riski",
        "en": "Head-impact risk"
      },
      {
        "tr": "Göze sıçrama veya parçacık",
        "en": "Splash or particle risk"
      },
      {
        "tr": "Göreve uygun eldiven",
        "en": "Task-matched gloves"
      },
      {
        "tr": "Zemin ve ayak riski",
        "en": "Ground and foot hazards"
      },
      {
        "tr": "Trafik ve görünürlük",
        "en": "Traffic and visibility"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🦺"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-MH-001": {
    "reference": "manual",
    "preJob": [
      {
        "tr": "Yük ağırlığı ve şekli",
        "en": "Load weight and shape"
      },
      {
        "tr": "Kavrama ve ağırlık merkezi",
        "en": "Grip and centre of gravity"
      },
      {
        "tr": "Taşıma yolu",
        "en": "Travel route"
      },
      {
        "tr": "Bırakma noktası",
        "en": "Set-down point"
      },
      {
        "tr": "Mekanik yardım",
        "en": "Mechanical assistance"
      },
      {
        "tr": "Ekip iletişimi",
        "en": "Team communication"
      },
      {
        "tr": "Kişisel yeterlilik",
        "en": "Individual capability"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "PLANLA",
          "en": "PLAN"
        },
        "label": {
          "tr": "Yükü ve yolu değerlendir",
          "en": "Assess the load and route"
        }
      },
      {
        "value": {
          "tr": "YAKIN",
          "en": "CLOSE"
        },
        "label": {
          "tr": "Yükü vücuda yakın tut",
          "en": "Keep the load close to the body"
        }
      },
      {
        "value": {
          "tr": "YARDIM",
          "en": "ASSIST"
        },
        "label": {
          "tr": "Önce mekanik yardım düşün",
          "en": "Consider mechanical aids first"
        }
      },
      {
        "value": {
          "tr": "DÖN",
          "en": "TURN"
        },
        "label": {
          "tr": "Belini değil ayaklarını çevir",
          "en": "Move feet instead of twisting"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Kavrama ve mekanik risk",
        "en": "Grip and mechanical risk"
      },
      {
        "tr": "Yük ve zemin riski",
        "en": "Load and ground hazards"
      },
      {
        "tr": "Hareket serbestliği",
        "en": "Freedom of movement"
      },
      {
        "tr": "Trafik varsa görünürlük",
        "en": "Visibility around traffic"
      },
      {
        "tr": "Değerlendirmeye göre",
        "en": "Based on assessment"
      }
    ],
    "ppeIcons": [
      "🧤",
      "🥾",
      "👕",
      "🦺",
      "🛡️"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-DO-001": {
    "reference": "dropped",
    "preJob": [
      {
        "tr": "Gevşek aletler",
        "en": "Loose tools"
      },
      {
        "tr": "Uygun alet bağlantısı",
        "en": "Suitable tool tether"
      },
      {
        "tr": "Malzeme sabitleme",
        "en": "Secured materials"
      },
      {
        "tr": "Tekmelik ve ağlar",
        "en": "Toe boards and screens"
      },
      {
        "tr": "Alt alan izolasyonu",
        "en": "Drop-zone isolation"
      },
      {
        "tr": "Ekipler arası iletişim",
        "en": "Team communication"
      },
      {
        "tr": "İş sonu kontrolü",
        "en": "Final area check"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "SABİTLE",
          "en": "SECURE"
        },
        "label": {
          "tr": "Alet ve malzemeyi koru",
          "en": "Control tools and materials"
        }
      },
      {
        "value": {
          "tr": "BAĞLANTI",
          "en": "TETHER"
        },
        "label": {
          "tr": "Yük ve kullanıma uygun sistem",
          "en": "Match the load and application"
        }
      },
      {
        "value": {
          "tr": "BARİYER",
          "en": "BARRIER"
        },
        "label": {
          "tr": "Düşme hattını izole et",
          "en": "Isolate the drop zone"
        }
      },
      {
        "value": {
          "tr": "KONTROL",
          "en": "CHECK"
        },
        "label": {
          "tr": "Gevşek parça bırakma",
          "en": "Leave no loose items"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş darbesi riski",
        "en": "Head-impact risk"
      },
      {
        "tr": "Göze sıçrama veya parçacık",
        "en": "Splash or particle risk"
      },
      {
        "tr": "Göreve uygun eldiven",
        "en": "Task-matched gloves"
      },
      {
        "tr": "Zemin ve ayak riski",
        "en": "Ground and foot hazards"
      },
      {
        "tr": "Trafik ve görünürlük",
        "en": "Traffic and visibility"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🦺"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-SCF-001": {
    "reference": "scaffold",
    "preJob": [
      {
        "tr": "Kontrol durumu",
        "en": "Inspection status"
      },
      {
        "tr": "Yetkin kişi",
        "en": "Competent person"
      },
      {
        "tr": "Temel ve altlık",
        "en": "Foundation and base"
      },
      {
        "tr": "Bağlantı ve çaprazlar",
        "en": "Ties and braces"
      },
      {
        "tr": "Tam platform",
        "en": "Full platform"
      },
      {
        "tr": "Güvenli erişim",
        "en": "Safe access"
      },
      {
        "tr": "Alt alan izolasyonu",
        "en": "Area below isolated"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "YÜK",
          "en": "LOAD"
        },
        "label": {
          "tr": "Onaylı kullanım kapasitesini aşma",
          "en": "Do not exceed approved working load"
        }
      },
      {
        "value": {
          "tr": "PLATFORM",
          "en": "PLATFORM"
        },
        "label": {
          "tr": "Tehlikeli boşluk bırakma",
          "en": "No hazardous gaps"
        }
      },
      {
        "value": {
          "tr": "ERİŞİM",
          "en": "ACCESS"
        },
        "label": {
          "tr": "Çaprazlara tırmanma",
          "en": "Never climb cross-braces"
        }
      },
      {
        "value": {
          "tr": "KONTROL",
          "en": "INSPECT"
        },
        "label": {
          "tr": "Vardiya ve değişiklik sonrası",
          "en": "Before shifts and after changes"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş ve çene bağı uyumu",
        "en": "Head and chin-strap fit"
      },
      {
        "tr": "Göze parçacık riski",
        "en": "Eye particle hazard"
      },
      {
        "tr": "Mekanik risk",
        "en": "Mechanical hazards"
      },
      {
        "tr": "Kaymaz taban",
        "en": "Slip-resistant sole"
      },
      {
        "tr": "Yalnız tasarlanmış sistemle*",
        "en": "Designed fall system only*"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🪢"
    ],
    "ppeNote": {
      "tr": "*Kişisel düşüş koruması yalnız uygun sistemle; önce platform ve toplu korumayı doğrula.",
      "en": "*Personal fall protection requires a suitable system; verify decking and collective protection first."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-HW-001": {
    "reference": "hotwork",
    "preJob": [
      {
        "tr": "Sıcak çalışma izni",
        "en": "Hot work permit"
      },
      {
        "tr": "Gerekli gaz ölçümü",
        "en": "Required gas testing"
      },
      {
        "tr": "Yanıcı kontrolü",
        "en": "Combustible control"
      },
      {
        "tr": "Yangın gözcüsü",
        "en": "Fire watch"
      },
      {
        "tr": "Uygun söndürücü",
        "en": "Suitable extinguisher"
      },
      {
        "tr": "Kıvılcım bariyeri",
        "en": "Spark barriers"
      },
      {
        "tr": "İş sonrası gözetim",
        "en": "Post-work watch"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "YANICI",
          "en": "COMBUSTIBLES"
        },
        "label": {
          "tr": "Uzaklaştır veya etkin koru",
          "en": "Remove or protect effectively"
        }
      },
      {
        "value": {
          "tr": "SÜRE",
          "en": "DURATION"
        },
        "label": {
          "tr": "İzin ve risk esaslı gözetim",
          "en": "Permit and risk-based fire watch"
        }
      },
      {
        "value": {
          "tr": "İZİN",
          "en": "PERMIT"
        },
        "label": {
          "tr": "Kapsam ve koşulları doğrula",
          "en": "Verify scope and conditions"
        }
      },
      {
        "value": {
          "tr": "GÖZCÜ",
          "en": "WATCH"
        },
        "label": {
          "tr": "Eğitimli ve hazır olmalı",
          "en": "Trained and ready"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Prosese uygun filtre",
        "en": "Process-matched filter"
      },
      {
        "tr": "Başlık altında göz koruması",
        "en": "Eye protection under helmet"
      },
      {
        "tr": "Isı ve sıçrama",
        "en": "Heat and spatter"
      },
      {
        "tr": "Sıcak metal ve kıvılcım",
        "en": "Hot metal and sparks"
      },
      {
        "tr": "Prosese uygun alev koruması",
        "en": "Process-matched flame protection"
      }
    ],
    "ppeIcons": [
      "🥽",
      "👓",
      "🧤",
      "🥾",
      "🧥"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-CS-001": {
    "reference": "confined",
    "preJob": [
      {
        "tr": "Giriş izni",
        "en": "Entry permit"
      },
      {
        "tr": "Atmosfer ve alarm sınırları",
        "en": "Atmosphere and alarm limits"
      },
      {
        "tr": "Enerji ve akış izolasyonu",
        "en": "Energy and flow isolation"
      },
      {
        "tr": "Eğitimli gözcü",
        "en": "Trained attendant"
      },
      {
        "tr": "Havalandırma",
        "en": "Ventilation"
      },
      {
        "tr": "İletişim testi",
        "en": "Communication test"
      },
      {
        "tr": "Uygulanabilir kurtarma",
        "en": "Workable rescue"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "OKSİJEN",
          "en": "OXYGEN"
        },
        "label": {
          "tr": "İzin sınırlarını ölç ve doğrula",
          "en": "Measure and verify permit limits"
        }
      },
      {
        "value": {
          "tr": "YANICI",
          "en": "FLAMMABLE"
        },
        "label": {
          "tr": "LEL/LFL alarmını doğrula",
          "en": "Verify LEL/LFL alarms"
        }
      },
      {
        "value": {
          "tr": "TOKSİK",
          "en": "TOXIC"
        },
        "label": {
          "tr": "Maddeye özel sınır ve ölçüm",
          "en": "Substance-specific limits and testing"
        }
      },
      {
        "value": {
          "tr": "İZLE",
          "en": "MONITOR"
        },
        "label": {
          "tr": "İzin planına göre ölçüm yap",
          "en": "Follow the entry monitoring plan"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş darbesi riski",
        "en": "Head-impact risk"
      },
      {
        "tr": "Maddeye uygun gözlük",
        "en": "Substance-matched eyewear"
      },
      {
        "tr": "Madde ve göreve uygun",
        "en": "Substance and task-matched"
      },
      {
        "tr": "Zemin ve ayak riski",
        "en": "Ground and foot hazards"
      },
      {
        "tr": "Kurtarma sistemine uygun",
        "en": "Match the retrieval system"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🪢"
    ],
    "ppeNote": {
      "tr": "Atmosfer için ayrıca uygun solunum korumasını değerlendir; kurtarma kemeri her girişte tek başına yeterli değildir.",
      "en": "Assess suitable respiratory protection for the atmosphere; a retrieval harness alone does not make entry safe."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-EL-001": {
    "reference": "electrical",
    "preJob": [
      {
        "tr": "İzin ve risk analizi",
        "en": "Permit and risk assessment"
      },
      {
        "tr": "Tüm enerji kaynakları",
        "en": "All energy sources"
      },
      {
        "tr": "LOTO",
        "en": "LOTO"
      },
      {
        "tr": "Gerilimsizlik testi",
        "en": "Absence-of-voltage test"
      },
      {
        "tr": "Yetkin personel",
        "en": "Qualified person"
      },
      {
        "tr": "Gerekli RCD koruması",
        "en": "Required ground-fault protection"
      },
      {
        "tr": "Bariyer ve uygun KKD",
        "en": "Barriers and suitable PPE"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "GERİLİM",
          "en": "VOLTAGE"
        },
        "label": {
          "tr": "Uygun cihazla yokluğunu doğrula",
          "en": "Verify absence with suitable tester"
        }
      },
      {
        "value": {
          "tr": "LOTO",
          "en": "LOTO"
        },
        "label": {
          "tr": "İzole et ve kilitle",
          "en": "Isolate and lock out"
        }
      },
      {
        "value": {
          "tr": "KORUMA",
          "en": "PROTECTION"
        },
        "label": {
          "tr": "Topraklama ve kaçak akım",
          "en": "Grounding and ground-fault control"
        }
      },
      {
        "value": {
          "tr": "YETKİ",
          "en": "QUALIFIED"
        },
        "label": {
          "tr": "İş ve test için yeterlilik",
          "en": "Competence for work and testing"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Elektrik riskine uygun",
        "en": "Match electrical hazards"
      },
      {
        "tr": "Darbe ve ark değerlendirmesi",
        "en": "Impact and arc assessment"
      },
      {
        "tr": "Gerilim sınıfı ve test",
        "en": "Voltage class and testing"
      },
      {
        "tr": "Elektrik riskine uygun",
        "en": "Match electrical hazards"
      },
      {
        "tr": "Ark enerji değerlendirmesi",
        "en": "Arc energy assessment"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🧥"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-LOTO-001": {
    "reference": "loto",
    "preJob": [
      {
        "tr": "Enerji prosedürü",
        "en": "Energy procedure"
      },
      {
        "tr": "Tüm enerji kaynakları",
        "en": "All energy sources"
      },
      {
        "tr": "Etkilenen çalışanlar",
        "en": "Affected employees"
      },
      {
        "tr": "Kişisel kilitler",
        "en": "Personal locks"
      },
      {
        "tr": "Depolanmış enerji",
        "en": "Stored energy"
      },
      {
        "tr": "İzolasyon doğrulaması",
        "en": "Isolation verification"
      },
      {
        "tr": "Güvenli devreye alma",
        "en": "Safe restoration"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "TÜMÜ",
          "en": "ALL"
        },
        "label": {
          "tr": "Tehlikeli enerji kaynaklarını belirle",
          "en": "Identify hazardous energy sources"
        }
      },
      {
        "value": {
          "tr": "DOĞRULA",
          "en": "VERIFY"
        },
        "label": {
          "tr": "İzolasyonu test et",
          "en": "Test isolation"
        }
      },
      {
        "value": {
          "tr": "KİŞİSEL",
          "en": "PERSONAL"
        },
        "label": {
          "tr": "Yetkili çalışan kilidi",
          "en": "Authorized employee lock"
        }
      },
      {
        "value": {
          "tr": "DENETİM",
          "en": "REVIEW"
        },
        "label": {
          "tr": "Prosedüre göre planlı kontrol",
          "en": "Scheduled procedure inspection"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Görevdeki baş riski",
        "en": "Task-specific head risk"
      },
      {
        "tr": "Göreve uygun gözlük",
        "en": "Task-matched eyewear"
      },
      {
        "tr": "Enerji türüne uygun",
        "en": "Match the energy hazard"
      },
      {
        "tr": "Göreve uygun taban",
        "en": "Task-matched sole"
      },
      {
        "tr": "Kalan risklere göre",
        "en": "Based on residual hazards"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🧥"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-FIRE-001": {
    "reference": "fire",
    "preJob": [
      {
        "tr": "Alarm ve iletişim",
        "en": "Alarm and communication"
      },
      {
        "tr": "Acil çıkışlar",
        "en": "Emergency exits"
      },
      {
        "tr": "Toplanma noktası",
        "en": "Assembly point"
      },
      {
        "tr": "Söndürücü erişimi",
        "en": "Extinguisher access"
      },
      {
        "tr": "Maddeye uygun söndürücü",
        "en": "Fuel-appropriate extinguisher"
      },
      {
        "tr": "Eğitim ve yetki",
        "en": "Training and authorization"
      },
      {
        "tr": "Yakıt ve tutuşturma",
        "en": "Fuel and ignition"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "KAÇIŞ",
          "en": "ESCAPE"
        },
        "label": {
          "tr": "Güvenli kaçış yolu açık olmalı",
          "en": "Keep a safe exit available"
        }
      },
      {
        "value": {
          "tr": "SEÇİM",
          "en": "SELECT"
        },
        "label": {
          "tr": "Yakıt ve elektrik riskine uygun",
          "en": "Match fuel and electrical hazards"
        }
      },
      {
        "value": {
          "tr": "KONTROL",
          "en": "INSPECT"
        },
        "label": {
          "tr": "Planlı kontrol ve bakım",
          "en": "Scheduled checks and maintenance"
        }
      },
      {
        "value": {
          "tr": "GERİ ÇEKİL",
          "en": "WITHDRAW"
        },
        "label": {
          "tr": "Duman veya büyüyen yangın",
          "en": "Smoke or growing fire"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Göreve uygun baş koruması",
        "en": "Task-matched head protection"
      },
      {
        "tr": "Göreve uygun gözlük",
        "en": "Task-matched eyewear"
      },
      {
        "tr": "Temasa uygun ısı koruması",
        "en": "Heat protection for contact"
      },
      {
        "tr": "Zemin ve ayak riski",
        "en": "Ground and foot hazards"
      },
      {
        "tr": "Göreve uygun alev koruması",
        "en": "Task-matched flame protection"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🧥"
    ],
    "ppeNote": {
      "tr": "Yalnız eğitimli, yetkili kişi başlangıç yangınına müdahale eder; KKD dumanlı alana giriş izni değildir.",
      "en": "Only trained, authorized personnel tackle incipient fires; PPE does not authorize entry into smoke."
    },
    "reviewStatus": "site-validation-required"
  },
  "SRN-PPE-001": {
    "reference": "ppe",
    "preJob": [
      {
        "tr": "Risk değerlendirmesi",
        "en": "Risk assessment"
      },
      {
        "tr": "Alan işaretleri",
        "en": "Area signs"
      },
      {
        "tr": "Doğru KKD seçimi",
        "en": "Correct PPE selection"
      },
      {
        "tr": "Beden ve uyumluluk",
        "en": "Fit and compatibility"
      },
      {
        "tr": "Kullanım öncesi kontrol",
        "en": "Pre-use inspection"
      },
      {
        "tr": "Eğitim ve talimat",
        "en": "Training and instructions"
      },
      {
        "tr": "Temizlik ve saklama",
        "en": "Cleaning and storage"
      }
    ],
    "controls": [
      {
        "value": {
          "tr": "RİSK",
          "en": "RISK"
        },
        "label": {
          "tr": "Tehlikeye uygun koruma",
          "en": "Protection matched to hazards"
        }
      },
      {
        "value": {
          "tr": "UYUM",
          "en": "FIT"
        },
        "label": {
          "tr": "Beden ve birlikte kullanım",
          "en": "Sizing and compatibility"
        }
      },
      {
        "value": {
          "tr": "KONTROL",
          "en": "INSPECT"
        },
        "label": {
          "tr": "Her kullanım öncesi",
          "en": "Before each use"
        }
      },
      {
        "value": {
          "tr": "DEĞİŞTİR",
          "en": "REPLACE"
        },
        "label": {
          "tr": "Hasarlı KKD kullanma",
          "en": "Never use defective PPE"
        }
      }
    ],
    "ppeSelection": [
      {
        "tr": "Baş darbesi riski",
        "en": "Head-impact risk"
      },
      {
        "tr": "Göze sıçrama veya parçacık",
        "en": "Splash or particle risk"
      },
      {
        "tr": "Göreve uygun eldiven",
        "en": "Task-matched gloves"
      },
      {
        "tr": "Zemin ve ayak riski",
        "en": "Ground and foot hazards"
      },
      {
        "tr": "Trafik ve görünürlük",
        "en": "Traffic and visibility"
      }
    ],
    "ppeIcons": [
      "⛑️",
      "🥽",
      "🧤",
      "🥾",
      "🦺"
    ],
    "ppeNote": {
      "tr": "KKD’yi risk, üretici ve saha prosedürüne göre seç; bu liste her işte zorunluluk değildir.",
      "en": "Select PPE by risk, manufacturer and site procedure; this list is not mandatory for every task."
    },
    "reviewStatus": "site-validation-required"
  }
} as const satisfies Record<string,PosterTechnicalProfile>;

export function getPosterTechnicalProfile(code:string):PosterTechnicalProfile | undefined {
 return Object.hasOwn(posterTechnicalProfiles,code)?posterTechnicalProfiles[code as keyof typeof posterTechnicalProfiles]:undefined;
}
