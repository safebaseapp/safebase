import type { PosterDefinition } from "./types";

export const hotWorkPoster: PosterDefinition = {
  code: "SRN-HW-001",
  revision: "1.0",

  title: {
    tr: "Sıcak Çalışma Kritik Güvenlik Kuralları",
    en: "Hot Work Critical Safety Rules",
  },

  slogan: {
    tr: "İzin Al • Yanıcıları Kontrol Et • Yangını Önle",
    en: "Authorize • Control Combustibles • Prevent Fire",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Çalışma İzni",
        en: "Hot Work Permit",
      },
      items: {
        tr: [
          "Geçerli sıcak çalışma iznini doğrula.",
          "Çalışma alanı ve kapsamın izinle uyumlu olduğunu kontrol et.",
          "Koşullar değişirse işi durdur ve izni yeniden değerlendir.",
        ],
        en: [
          "Verify a valid hot work permit.",
          "Confirm the work area and scope match the authorization.",
          "Stop work and reassess the permit if conditions change.",
        ],
      },
      icon: "training",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Yanıcıları Uzaklaştır",
        en: "Remove Combustibles",
      },
      items: {
        tr: [
          "Yanıcı malzemeleri güvenli mesafeye taşı.",
          "Taşınamayan malzemeleri yangına dayanıklı örtüyle koru.",
          "Zemin, boşluk ve karşı yüzleri kıvılcıma karşı kontrol et.",
        ],
        en: [
          "Move combustible materials to a safe distance.",
          "Protect immovable materials with fire-resistant covers.",
          "Check floors, openings and opposite surfaces for spark exposure.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Gaz Ölçümü",
        en: "Atmospheric Testing",
      },
      items: {
        tr: [
          "Gerekli alanlarda atmosferi işe başlamadan önce ölç.",
          "Oksijen, yanıcı gaz ve toksik riskleri doğrula.",
          "Koşullar değişebilecekse sürekli veya periyodik ölçüm yap.",
        ],
        en: [
          "Test the atmosphere before work where required.",
          "Verify oxygen, flammable-gas and toxic hazards.",
          "Use continuous or periodic monitoring when conditions may change.",
        ],
      },
      icon: "weather",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Yangın Gözcüsü",
        en: "Fire Watch",
      },
      items: {
        tr: [
          "Eğitimli ve başka görev verilmeyen gözcü görevlendir.",
          "Gözcünün tüm riskli alanları görebilmesini sağla.",
          "Gözcüye işi durdurma ve alarm verme yetkisi ver.",
        ],
        en: [
          "Assign a trained fire watch with no conflicting duties.",
          "Ensure all exposed areas remain visible and accessible.",
          "Authorize the fire watch to stop work and raise the alarm.",
        ],
      },
      icon: "training",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Söndürme Ekipmanı",
        en: "Firefighting Equipment",
      },
      items: {
        tr: [
          "Uygun söndürücüyü hemen erişilebilir konumda tut.",
          "Ekipmanın kontrol edilmiş ve kullanıma hazır olduğunu doğrula.",
          "Alarm ve acil iletişim yöntemini önceden belirle.",
        ],
        en: [
          "Keep suitable extinguishing equipment immediately available.",
          "Verify equipment is inspected and ready for use.",
          "Confirm alarm and emergency communication arrangements.",
        ],
      },
      icon: "equipment",
      tone: "warning",
    },
    {
      number: "06",
      title: {
        tr: "Kıvılcım ve Isı Kontrolü",
        en: "Control Sparks and Heat",
      },
      items: {
        tr: [
          "Kıvılcım, cüruf ve sıcak parçaların yayılmasını sınırla.",
          "Yangın perdesi veya uygun bariyer kullan.",
          "Duvar, boru ve metal yüzeylerden ısı iletimini değerlendir.",
        ],
        en: [
          "Confine sparks, slag and hot fragments.",
          "Use fire curtains or suitable barriers.",
          "Assess heat conduction through walls, pipes and metal surfaces.",
        ],
      },
      icon: "fall",
      tone: "warning",
    },
    {
      number: "07",
      title: {
        tr: "Tüp ve Hortum Güvenliği",
        en: "Cylinder and Hose Safety",
      },
      items: {
        tr: [
          "Tüpleri dik, sabitlenmiş ve ısıdan uzakta tut.",
          "Hortum, regülatör ve bağlantıları kullanmadan önce kontrol et.",
          "Oksijen ekipmanını yağ ve gresten uzak tut.",
        ],
        en: [
          "Keep cylinders upright, secured and away from heat.",
          "Inspect hoses, regulators and connections before use.",
          "Keep oxygen equipment free from oil and grease.",
        ],
      },
      icon: "anchor",
      tone: "warning",
    },
    {
      number: "08",
      title: {
        tr: "İş Sonrası Kontrol",
        en: "Post-Work Fire Watch",
      },
      items: {
        tr: [
          "İş bitiminden sonra alanı en az 30 dakika gözetle.",
          "Gizli boşlukları ve için için yanma ihtimalini kontrol et.",
          "Alan güvenli doğrulanmadan gözetimi sonlandırma.",
        ],
        en: [
          "Monitor the area for at least 30 minutes after completion.",
          "Check concealed spaces and possible smouldering fires.",
          "Do not end the watch until the area is confirmed safe.",
        ],
      },
      icon: "weather",
      tone: "information",
    },
  ],

  never: {
    tr: [
      "Geçerli sıcak çalışma izni yoksa işi hemen durdur",
      "Yanıcı veya patlayıcı atmosfer riski kontrol edilmediyse işi durdur",
      "Yanıcı malzemeler uzaklaştırılmamış veya korunmamışsa işi durdur",
      "Yangın gözcüsü veya uygun söndürme ekipmanı yoksa işi durdur",
      "Kıvılcım ve sıcak parçalar kontrol edilemiyorsa işi durdur",
    ],
    en: [
      "Stop work immediately if there is no valid hot work permit",
      "Stop work if flammable or explosive atmospheric hazards are uncontrolled",
      "Stop work if combustibles are not removed or protected",
      "Stop work if there is no fire watch or suitable extinguishing equipment",
      "Stop work if sparks and hot fragments cannot be contained",
    ],
  },

  ppe: {
    tr: [
      "Kaynak Başlığı",
      "Koruyucu Gözlük",
      "Isı Eldiveni",
      "Deri Ayakkabı",
      "Alev Geciktirici Giysi",
    ],
    en: [
      "Welding Helmet",
      "Safety Glasses",
      "Heat-Resistant Gloves",
      "Leather Footwear",
      "Flame-Resistant Clothing",
    ],
  },
};
