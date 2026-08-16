import type {
  SafetySign,
  SignCategory,
} from "./types";

export const signCategories: Array<{
  id: "all" | SignCategory;
  tr: string;
  en: string;
}> = [
  { id: "all", tr: "Tüm Levhalar", en: "All Signs" },
  { id: "mandatory", tr: "Zorunluluk", en: "Mandatory" },
  { id: "prohibition", tr: "Yasaklama", en: "Prohibition" },
  { id: "warning", tr: "Uyarı", en: "Warning" },
  { id: "emergency", tr: "Acil Durum", en: "Emergency" },
  { id: "fire", tr: "Yangın", en: "Fire Equipment" },
  { id: "information", tr: "Bilgilendirme", en: "Information" },
];

export const safetySigns: SafetySign[] = [
  {
    slug: "safety-helmet-must-be-worn",
    code: "SRN-M-001",
    category: "mandatory",
    icon: "helmet",
    title: {
      tr: "Baret Takmak Zorunludur",
      en: "Safety Helmet Must Be Worn",
    },
    description: {
      tr: "Baret kullanımının zorunlu olduğu alanlar için.",
      en: "For areas where safety helmets are mandatory.",
    },
  },
  {
    slug: "eye-protection-must-be-worn",
    code: "SRN-M-002",
    category: "mandatory",
    icon: "glasses",
    title: {
      tr: "Koruyucu Gözlük Takmak Zorunludur",
      en: "Eye Protection Must Be Worn",
    },
    description: {
      tr: "Göz koruması gereken çalışma alanları için.",
      en: "For work areas requiring eye protection.",
    },
  },
  {
    slug: "protective-gloves-must-be-worn",
    code: "SRN-M-003",
    category: "mandatory",
    icon: "gloves",
    title: {
      tr: "Koruyucu Eldiven Kullanmak Zorunludur",
      en: "Protective Gloves Must Be Worn",
    },
    description: {
      tr: "Göreve uygun koruyucu eldiven kullanımı için.",
      en: "For task-appropriate protective glove requirements.",
    },
  },
  {
    slug: "safety-footwear-must-be-worn",
    code: "SRN-M-004",
    category: "mandatory",
    icon: "footwear",
    title: {
      tr: "Güvenlik Ayakkabısı Giymek Zorunludur",
      en: "Safety Footwear Must Be Worn",
    },
    description: {
      tr: "Koruyucu iş ayakkabısı gereken alanlar için.",
      en: "For areas requiring protective safety footwear.",
    },
  },
  {
    slug: "hearing-protection-must-be-worn",
    code: "SRN-M-005",
    category: "mandatory",
    icon: "hearing",
    title: {
      tr: "Kulak Koruyucu Kullanmak Zorunludur",
      en: "Hearing Protection Must Be Worn",
    },
    description: {
      tr: "Gürültülü çalışma alanları için.",
      en: "For high-noise work areas.",
    },
  },
  {
    slug: "no-smoking",
    code: "SRN-P-001",
    category: "prohibition",
    icon: "no-smoking",
    title: {
      tr: "Sigara İçilmez",
      en: "No Smoking",
    },
    description: {
      tr: "Sigara içmenin yasak olduğu alanlar için.",
      en: "For areas where smoking is prohibited.",
    },
  },
  {
    slug: "no-unauthorized-entry",
    code: "SRN-P-002",
    category: "prohibition",
    icon: "no-entry",
    title: {
      tr: "Yetkisiz Giriş Yasaktır",
      en: "No Unauthorized Entry",
    },
    description: {
      tr: "Kontrollü ve kısıtlı erişim alanları için.",
      en: "For controlled and restricted-access areas.",
    },
  },
  {
    slug: "no-open-flame",
    code: "SRN-P-003",
    category: "prohibition",
    icon: "no-flame",
    title: {
      tr: "Açık Alev Yasaktır",
      en: "No Open Flame",
    },
    description: {
      tr: "Yanıcı veya patlayıcı tehlike bulunan alanlar için.",
      en: "For areas containing flammable or explosive hazards.",
    },
  },
  {
    slug: "warning-high-voltage",
    code: "SRN-W-001",
    category: "warning",
    icon: "high-voltage",
    title: {
      tr: "Dikkat! Yüksek Gerilim",
      en: "Warning! High Voltage",
    },
    description: {
      tr: "Elektrik çarpması ve yüksek gerilim tehlikesi için.",
      en: "For electrical shock and high-voltage hazards.",
    },
  },
  {
    slug: "warning-forklift-traffic",
    code: "SRN-W-002",
    category: "warning",
    icon: "forklift",
    title: {
      tr: "Dikkat! Forklift Trafiği",
      en: "Warning! Forklift Traffic",
    },
    description: {
      tr: "Forklift ve yaya yollarının kesiştiği alanlar için.",
      en: "For areas where forklifts and pedestrians interact.",
    },
  },
  {
    slug: "warning-falling-objects",
    code: "SRN-W-003",
    category: "warning",
    icon: "falling-objects",
    title: {
      tr: "Dikkat! Düşen Cisimler",
      en: "Warning! Falling Objects",
    },
    description: {
      tr: "Yukarıdan malzeme düşme riski bulunan alanlar için.",
      en: "For areas exposed to falling-object hazards.",
    },
  },
  {
    slug: "warning-slippery-surface",
    code: "SRN-W-004",
    category: "warning",
    icon: "slippery",
    title: {
      tr: "Dikkat! Kaygan Zemin",
      en: "Warning! Slippery Surface",
    },
    description: {
      tr: "Kayma riski bulunan zeminler için.",
      en: "For floors presenting a slip hazard.",
    },
  },
  {
    slug: "first-aid",
    code: "SRN-E-001",
    category: "emergency",
    icon: "first-aid",
    title: {
      tr: "İlk Yardım",
      en: "First Aid",
    },
    description: {
      tr: "İlk yardım ekipmanı veya istasyonunu göstermek için.",
      en: "Identifies first-aid equipment or stations.",
    },
  },
  {
    slug: "emergency-exit",
    code: "SRN-E-002",
    category: "emergency",
    icon: "emergency-exit",
    title: {
      tr: "Acil Çıkış",
      en: "Emergency Exit",
    },
    description: {
      tr: "Acil tahliye çıkışlarını göstermek için.",
      en: "Identifies emergency evacuation exits.",
    },
  },
  {
    slug: "assembly-point",
    code: "SRN-E-003",
    category: "emergency",
    icon: "assembly-point",
    title: {
      tr: "Acil Toplanma Noktası",
      en: "Emergency Assembly Point",
    },
    description: {
      tr: "Tahliye sonrası toplanma alanlarını göstermek için.",
      en: "Identifies emergency assembly locations.",
    },
  },
  {
    slug: "fire-extinguisher",
    code: "SRN-F-001",
    category: "fire",
    icon: "fire-extinguisher",
    title: {
      tr: "Yangın Söndürücü",
      en: "Fire Extinguisher",
    },
    description: {
      tr: "Yangın söndürücü konumunu göstermek için.",
      en: "Identifies the location of a fire extinguisher.",
    },
  },

  {
    slug: "general-mandatory-action",
    code: "SRN-M-001",
    category: "mandatory",
    icon: "M001",
    title: {
      tr: "Genel Zorunluluk",
      en: "General Mandatory Action",
    },
    description: {
      tr: "Belirtilen zorunlu güvenlik talimatına uyulması gereken alanlar için.",
      en: "For areas requiring compliance with a specified mandatory safety action.",
    },
  },
  {
    slug: "refer-to-instruction-manual",
    code: "SRN-M-002",
    category: "mandatory",
    icon: "M002",
    title: {
      tr: "Talimatları Okuyun",
      en: "Refer to Instruction Manual",
    },
    description: {
      tr: "İşleme başlamadan önce kullanım talimatlarının okunması gereken ekipmanlar için.",
      en: "For equipment requiring the instruction manual to be read before use.",
    },
  },
  {
    slug: "protective-clothing-must-be-worn",
    code: "SRN-M-010",
    category: "mandatory",
    icon: "M010",
    title: {
      tr: "Koruyucu Giysi Kullanmak Zorunludur",
      en: "Protective Clothing Must Be Worn",
    },
    description: {
      tr: "Vücut koruması gerektiren tehlikeli çalışma alanları için.",
      en: "For hazardous work areas requiring protective clothing.",
    },
  },
  {
    slug: "wash-your-hands",
    code: "SRN-M-011",
    category: "mandatory",
    icon: "M011",
    title: {
      tr: "Ellerinizi Yıkayın",
      en: "Wash Your Hands",
    },
    description: {
      tr: "Hijyen kontrolü gerektiren çalışma ve geçiş alanları için.",
      en: "For work and transition areas requiring hand hygiene.",
    },
  },
  {
    slug: "use-handrail",
    code: "SRN-M-012",
    category: "mandatory",
    icon: "M012",
    title: {
      tr: "Korkuluğu Kullanın",
      en: "Use Handrail",
    },
    description: {
      tr: "Merdiven ve geçişlerde korkuluk kullanımının zorunlu olduğu alanlar için.",
      en: "For stairs and access routes where handrail use is mandatory.",
    },
  },
  {
    slug: "face-shield-must-be-worn",
    code: "SRN-M-013",
    category: "mandatory",
    icon: "M013",
    title: {
      tr: "Yüz Siperi Kullanmak Zorunludur",
      en: "Face Shield Must Be Worn",
    },
    description: {
      tr: "Yüz ve gözlerin sıçrama veya parçacıklardan korunması gereken işler için.",
      en: "For tasks requiring face and eye protection from splashes or particles.",
    },
  },
  {
    slug: "high-visibility-clothing-must-be-worn",
    code: "SRN-M-015",
    category: "mandatory",
    icon: "M015",
    title: {
      tr: "Yüksek Görünürlüklü Giysi Zorunludur",
      en: "High-Visibility Clothing Must Be Worn",
    },
    description: {
      tr: "Araç ve iş makinesi trafiği bulunan çalışma alanları için.",
      en: "For work areas containing vehicle and mobile-equipment traffic.",
    },
  },
  {
    slug: "respiratory-protection-must-be-worn",
    code: "SRN-M-017",
    category: "mandatory",
    icon: "M017",
    title: {
      tr: "Solunum Koruyucu Kullanmak Zorunludur",
      en: "Respiratory Protection Must Be Worn",
    },
    description: {
      tr: "Toz, duman, buhar veya zararlı gaz maruziyeti bulunan işler için.",
      en: "For tasks involving exposure to dust, fumes, vapours or hazardous gases.",
    },
  },
  {
    slug: "safety-harness-must-be-worn",
    code: "SRN-M-018",
    category: "mandatory",
    icon: "M018",
    title: {
      tr: "Emniyet Kemeri Kullanmak Zorunludur",
      en: "Safety Harness Must Be Worn",
    },
    description: {
      tr: "Düşme riski bulunan yüksekte çalışma alanları için.",
      en: "For work-at-height areas presenting a fall hazard.",
    },
  },
  {
    slug: "not-drinking-water",
    code: "SRN-P-005",
    category: "prohibition",
    icon: "P005",
    title: {
      tr: "İçilmez Su",
      en: "Not Drinking Water",
    },
    description: {
      tr: "İnsan tüketimine uygun olmayan su kaynaklarını belirtmek için.",
      en: "Identifies water sources that are not suitable for human consumption.",
    },
  },
  {
    slug: "no-access-for-forklifts",
    code: "SRN-P-006",
    category: "prohibition",
    icon: "P006",
    title: {
      tr: "Forklift Girişi Yasaktır",
      en: "No Access for Forklifts",
    },
    description: {
      tr: "Forklift ve endüstriyel araç girişinin yasak olduğu alanlar için.",
      en: "For areas where forklifts and industrial vehicles are prohibited.",
    },
  },
  {
    slug: "do-not-touch",
    code: "SRN-P-010",
    category: "prohibition",
    icon: "P010",
    title: {
      tr: "Dokunmak Yasaktır",
      en: "Do Not Touch",
    },
    description: {
      tr: "Temas edilmesi tehlikeli veya yasak olan ekipman ve yüzeyler için.",
      en: "For equipment and surfaces that must not be touched.",
    },
  },
  {
    slug: "no-activated-mobile-phone",
    code: "SRN-P-013",
    category: "prohibition",
    icon: "P013",
    title: {
      tr: "Cep Telefonu Kullanmak Yasaktır",
      en: "No Activated Mobile Phone",
    },
    description: {
      tr: "Cep telefonu kullanımının güvenlik veya proses riski oluşturduğu alanlar için.",
      en: "For areas where mobile-phone use creates a safety or process risk.",
    },
  },
  {
    slug: "general-warning",
    code: "SRN-W-001",
    category: "warning",
    icon: "W001",
    title: {
      tr: "Dikkat! Genel Tehlike",
      en: "Warning! General Hazard",
    },
    description: {
      tr: "Özel bir sembolle tanımlanmayan genel tehlikeleri belirtmek için.",
      en: "Indicates a general hazard not represented by a more specific symbol.",
    },
  },
  {
    slug: "warning-overhead-load",
    code: "SRN-W-015",
    category: "warning",
    icon: "W015",
    title: {
      tr: "Dikkat! Asılı Yük",
      en: "Warning! Overhead Load",
    },
    description: {
      tr: "Vinç operasyonu ve asılı yük tehlikesi bulunan alanlar için.",
      en: "For areas containing crane operations and suspended-load hazards.",
    },
  },
  {
    slug: "warning-toxic-material",
    code: "SRN-W-016",
    category: "warning",
    icon: "W016",
    title: {
      tr: "Dikkat! Zehirli Madde",
      en: "Warning! Toxic Material",
    },
    description: {
      tr: "Zehirli madde veya akut toksisite riski bulunan alanlar için.",
      en: "For areas containing toxic substances or acute toxicity hazards.",
    },
  },
  {
    slug: "warning-hot-surface",
    code: "SRN-W-017",
    category: "warning",
    icon: "W017",
    title: {
      tr: "Dikkat! Sıcak Yüzey",
      en: "Warning! Hot Surface",
    },
    description: {
      tr: "Temas halinde yanık oluşturabilecek sıcak yüzeyler için.",
      en: "For hot surfaces capable of causing contact burns.",
    },
  },
  {
    slug: "warning-flammable-material",
    code: "SRN-W-021",
    category: "warning",
    icon: "W021",
    title: {
      tr: "Dikkat! Yanıcı Madde",
      en: "Warning! Flammable Material",
    },
    description: {
      tr: "Yanıcı madde, gaz, sıvı veya buhar bulunan alanlar için.",
      en: "For areas containing flammable substances, gases, liquids or vapours.",
    },
  },
  {
    slug: "warning-corrosive-substance",
    code: "SRN-W-023",
    category: "warning",
    icon: "W023",
    title: {
      tr: "Dikkat! Aşındırıcı Madde",
      en: "Warning! Corrosive Substance",
    },
    description: {
      tr: "Cilt, göz veya metallere zarar verebilen aşındırıcı maddeler için.",
      en: "For corrosive substances capable of damaging skin, eyes or metals.",
    },
  },
  {
    slug: "warning-crushing-of-hands",
    code: "SRN-W-024",
    category: "warning",
    icon: "W024",
    title: {
      tr: "Dikkat! El Sıkışma Tehlikesi",
      en: "Warning! Crushing of Hands",
    },
    description: {
      tr: "El sıkışması veya ezilmesi riski bulunan hareketli ekipmanlar için.",
      en: "For moving equipment presenting hand crushing or trapping hazards.",
    },
  }
];

export function getSafetySign(slug: string) {
  return safetySigns.find((sign) => sign.slug === slug);
}
