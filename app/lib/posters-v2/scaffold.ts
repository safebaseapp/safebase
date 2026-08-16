import type { PosterDefinition } from "./types";

export const scaffoldPoster: PosterDefinition = {
  code: "SRN-SCF-001",
  revision: "1.0",

  title: {
    tr: "İskele Kritik Güvenlik Kuralları",
    en: "Scaffold Critical Safety Rules",
  },

  slogan: {
    tr: "Kontrol Et • Etiketi Doğrula • Güvenle Kullan",
    en: "Inspect • Verify Status • Use Safely",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Yetkin Kişi Kontrolü",
        en: "Competent Person Inspection",
      },
      items: {
        tr: [
          "Her vardiya öncesi görünür kusurları kontrol ettir.",
          "Değişiklik veya olay sonrası yeniden kontrol yaptır.",
          "Kontrol edilmemiş iskeleyi kullanma.",
        ],
        en: [
          "Arrange a visible-defect inspection before each shift.",
          "Reinspect after alterations or events affecting integrity.",
          "Never use an uninspected scaffold.",
        ],
      },
      icon: "training",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Etiket ve Kullanım Durumu",
        en: "Tag and Use Status",
      },
      items: {
        tr: [
          "Geçerli kontrol etiketini veya kullanım durumunu doğrula.",
          "Kısıtlamaları ve özel önlemleri oku.",
          "Kullanıma kapalı iskeleye çıkma.",
        ],
        en: [
          "Verify the current inspection tag or use status.",
          "Read all restrictions and special precautions.",
          "Do not access a scaffold marked out of service.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Temel ve Stabilite",
        en: "Foundation and Stability",
      },
      items: {
        tr: [
          "Taban plakası ve sağlam altlık kullanıldığını doğrula.",
          "Bağlantı, çapraz ve sabitlemeleri kontrol et.",
          "Çökme, eğilme veya oynama varsa işi durdur.",
        ],
        en: [
          "Verify base plates and firm supporting foundations.",
          "Check ties, braces and stabilizing components.",
          "Stop work if settlement, leaning or movement is found.",
        ],
      },
      icon: "anchor",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Tam Platform",
        en: "Fully Decked Platform",
      },
      items: {
        tr: [
          "Çalışma platformunun mümkün olduğunca tam döşeli olmasını sağla.",
          "Gevşek, çatlak veya hasarlı platform kullanma.",
          "Tehlikeli açıklıkları kapat veya kullanımı durdur.",
        ],
        en: [
          "Ensure working levels are fully planked or decked.",
          "Do not use loose, cracked or damaged platform units.",
          "Close hazardous gaps or stop scaffold use.",
        ],
      },
      icon: "guardrail",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Korkuluk Sistemi",
        en: "Guardrail System",
      },
      items: {
        tr: [
          "Üst korkuluk ve ara korkuluğun eksiksiz olduğunu doğrula.",
          "Açık kenar ve uçları koruma altına al.",
          "Korkulukları izinsiz sökme veya değiştirme.",
        ],
        en: [
          "Verify toprails and midrails are complete.",
          "Protect all exposed sides and ends.",
          "Never remove or modify guardrails without authorization.",
        ],
      },
      icon: "guardrail",
      tone: "warning",
    },
    {
      number: "06",
      title: {
        tr: "Güvenli Erişim",
        en: "Safe Access",
      },
      items: {
        tr: [
          "Onaylı merdiven, merdiven kulesi veya erişim kullan.",
          "Çapraz bağlantıları erişim amacıyla kullanma.",
          "Kapakları geçişten sonra kapalı tut.",
        ],
        en: [
          "Use an approved ladder, stair tower or access system.",
          "Never climb scaffold cross-braces for access.",
          "Keep access trapdoors closed after passing.",
        ],
      },
      icon: "ladder",
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Yük ve Malzeme Kontrolü",
        en: "Load and Material Control",
      },
      items: {
        tr: [
          "İzin verilen yük kapasitesini aşma.",
          "Malzemeleri dengeli ve güvenli şekilde yerleştir.",
          "Geçiş yollarını ve erişim noktalarını açık tut.",
        ],
        en: [
          "Never exceed the permitted scaffold load.",
          "Distribute and secure materials safely.",
          "Keep walkways and access points clear.",
        ],
      },
      icon: "equipment",
      tone: "warning",
    },
    {
      number: "08",
      title: {
        tr: "Düşen Cisimleri Önle",
        en: "Prevent Dropped Objects",
      },
      items: {
        tr: [
          "Tekmelik, ağ veya uygun düşen cisim kontrolü kullan.",
          "Alet ve malzemeleri kenarlardan uzak tut.",
          "Alt alanı bariyerle ve yetkisiz girişi önle.",
        ],
        en: [
          "Use toe boards, screens or suitable falling-object protection.",
          "Keep tools and materials away from platform edges.",
          "Barricade the area below and prevent unauthorized entry.",
        ],
      },
      icon: "fall",
      tone: "information",
    },
  ],

  never: {
    tr: [
      "Geçerli kontrol durumu veya kullanım onayı yoksa",
      "Eksik platform, eksik korkuluk veya güvensiz erişim varsa işi hemen durdur",
      "İskele eğilmiş, çökmüş veya stabil değilse",
      "Hasarlı bileşen veya gevşek bağlantı varsa",
      "Aşırı yükleme veya güvensiz malzeme istifi varsa",
    ],
    en: [
      "There is no valid inspection status or approval for use",
      "Stop work immediately if platforms or guardrails are incomplete, or access is unsafe",
      "The scaffold is leaning, settled or unstable",
      "Components are damaged or connections are loose",
      "The scaffold is overloaded or materials are stored unsafely",
    ],
  },

  ppe: {
    tr: [
      "Çene Bağlı Baret",
      "Koruyucu Gözlük",
      "İş Eldiveni",
      "Kaymaz Ayakkabı",
      "Emniyet Kemeri",
    ],
    en: [
      "Chin-Strap Helmet",
      "Safety Glasses",
      "Work Gloves",
      "Slip-Resistant Footwear",
      "Safety Harness",
    ],
  },
};
