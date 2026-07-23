import type { SafetyGuide } from "../../components/GuideTemplate";

export const electricalSafetyGuide: SafetyGuide = {
  slug: "electrical-safety",

  category: {
    en: "Electrical Safety",
    tr: "Elektrik Güvenliği",
  },

  title: {
    en: "Electrical Safety",
    tr: "Elektrik Güvenliği",
  },

  description: {
    en: "Professional guidance for preventing electric shock, arc flash, arc blast and other electrical hazards in the workplace.",
    tr: "İş yerinde elektrik çarpması, ark flaşı, ark patlaması ve diğer elektrik tehlikelerinin önlenmesine yönelik profesyonel rehber.",
  },

  overview: {
    en: "Electrical energy is one of the most serious workplace hazards. Contact with energized equipment may result in fatal electric shock, severe burns, arc flash or arc blast injuries. Safe work practices, isolation procedures, competent personnel and proper PPE are essential for preventing incidents.",
    tr: "Elektrik enerjisi iş yerindeki en ciddi tehlikelerden biridir. Enerjili ekipmanlarla temas ölümcül elektrik çarpmasına, ciddi yanıklara, ark flaşına veya ark patlamasına neden olabilir. Güvenli çalışma yöntemleri, enerji izolasyonu, yetkin personel ve uygun KKD kazaların önlenmesi için kritik öneme sahiptir.",
  },

  readTime: 9,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA / NFPA 70E",

  hazards: {
    en: [
      "Electric shock",
      "Arc flash",
      "Arc blast",
      "Burn injuries",
      "Damaged electrical cables",
      "Exposed live conductors",
      "Improper grounding",
      "Overloaded circuits",
      "Wet working conditions",
    ],
    tr: [
      "Elektrik çarpması",
      "Ark flaşı",
      "Ark patlaması",
      "Yanık yaralanmaları",
      "Hasarlı elektrik kabloları",
      "Açıkta kalan enerjili iletkenler",
      "Yetersiz topraklama",
      "Aşırı yüklenmiş devreler",
      "Islak çalışma ortamı",
    ],
  },

  requiredPPE: {
    en: [
      "Electrical-rated gloves",
      "Arc-rated clothing",
      "Safety helmet",
      "Safety glasses",
      "Face shield for arc flash work",
      "Dielectric safety footwear",
    ],
    tr: [
      "Elektrik sınıfı yalıtkan eldiven",
      "Ark dayanımlı iş kıyafeti",
      "Baret",
      "Koruyucu gözlük",
      "Ark flaşı yüz siperi",
      "Dielektrik iş ayakkabısı",
    ],
  },

  controls: {
    en: [
      "Apply Lockout/Tagout before maintenance.",
      "Verify zero energy before starting work.",
      "Only qualified personnel may perform electrical work.",
      "Inspect cables and equipment before use.",
      "Use GFCI/RCD protection where required.",
      "Maintain safe clearance from energized equipment.",
      "Use insulated tools.",
      "Keep electrical panels accessible.",
      "Do not bypass safety devices.",
      "Replace damaged cables immediately.",
      "Protect cables from mechanical damage.",
      "Follow NFPA 70E safe work practices.",
    ],
    tr: [
      "Bakım öncesinde LOTO uygulayın.",
      "Çalışmaya başlamadan önce enerjinin kesildiğini doğrulayın.",
      "Elektrik işleri yalnızca yetkili kişiler tarafından yapılmalıdır.",
      "Kablo ve ekipmanları kullanım öncesi kontrol edin.",
      "Gerekli yerlerde kaçak akım koruması kullanın.",
      "Enerjili ekipmanlardan güvenli mesafe bırakın.",
      "Yalıtımlı el aletleri kullanın.",
      "Elektrik panolarının önünü kapatmayın.",
      "Güvenlik sistemlerini devre dışı bırakmayın.",
      "Hasarlı kabloları hemen değiştirin.",
      "Kabloları mekanik hasardan koruyun.",
      "NFPA 70E güvenli çalışma kurallarına uyun.",
    ],
  },

  commonMistakes: {
    en: [
      "Working on energized equipment without authorization",
      "Ignoring Lockout/Tagout",
      "Using damaged extension cords",
      "Improper grounding",
      "Overloading outlets",
      "Removing electrical covers",
      "Working with wet hands",
      "Using incorrect PPE",
    ],
    tr: [
      "Yetkisiz şekilde enerjili ekipmanda çalışmak",
      "LOTO prosedürünü uygulamamak",
      "Hasarlı uzatma kablosu kullanmak",
      "Yetersiz topraklama",
      "Prizleri aşırı yüklemek",
      "Elektrik kapaklarını sökmek",
      "Islak elle çalışmak",
      "Yanlış KKD kullanmak",
    ],
  },

  checklist: {
    title: {
      en: "Electrical Safety Checklist",
      tr: "Elektrik Güvenliği Kontrol Listesi",
    },
    en: [
      "Equipment inspected",
      "Cables undamaged",
      "Grounding verified",
      "LOTO applied",
      "Zero energy confirmed",
      "Correct PPE worn",
      "Area dry and clean",
      "Panel access unobstructed",
      "Qualified personnel assigned",
      "Emergency equipment available",
    ],
    tr: [
      "Ekipman kontrol edildi",
      "Kablolar sağlam",
      "Topraklama doğrulandı",
      "LOTO uygulandı",
      "Enerji sıfırlandı",
      "Doğru KKD kullanılıyor",
      "Alan kuru ve temiz",
      "Pano önü açık",
      "Yetkili personel görevli",
      "Acil durum ekipmanı hazır",
    ],
  },

  emergencySection: {
    title: {
      en: "Electrical Emergency Response",
      tr: "Elektrik Acil Durum Müdahalesi",
    },
    content: {
      en: "Never touch a victim until electrical power has been isolated. Disconnect the power source, call emergency services immediately, begin CPR only if trained and safe to do so, and treat burns after the hazard has been eliminated.",
      tr: "Elektrik enerjisi kesilmeden yaralıya kesinlikle dokunmayın. Enerjiyi kesin, acil yardım çağırın, yalnızca eğitimliyseniz CPR uygulayın ve tehlike ortadan kalktıktan sonra yanıkları tedavi edin.",
    },
  },

  references: [
    "OSHA 1910.303",
    "OSHA 1910.333",
    "OSHA 1910.335",
    "NFPA 70E",
  ],

  relatedGuides: [
    {
      slug: "loto",
      icon: "🔒",
      title: {
        en: "Lockout / Tagout",
        tr: "Kilitleme / Etiketleme",
      },
    },
    {
      slug: "ppe",
      icon: "🦺",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
    },
    {
      slug: "working-at-height",
      icon: "🪜",
      title: {
        en: "Working at Height",
        tr: "Yüksekte Çalışma",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI any electrical safety question and receive guidance based on OSHA and NFPA best practices.",
    tr: "Elektrik güvenliği hakkında SafeBase AI'a soru sorarak OSHA ve NFPA uygulamalarına dayalı rehberlik alın.",
  },
};
