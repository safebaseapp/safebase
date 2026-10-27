import type { PosterDefinition } from "./types";

export const hotWorkPoster: PosterDefinition = {
  code: "SRN-HW-001",
  revision: "2.0",

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
          "İzin sistemi gerektiriyorsa geçerli sıcak çalışma iznini doğrula.",
          "Çalışma alanı ve kapsamın izinle uyumlu olduğunu kontrol et.",
          "Koşullar değişirse işi durdur ve izni yeniden değerlendir.",
        ],
        en: [
          "Verify a valid hot-work permit where the permit system requires one.",
          "Confirm the work area and scope match the authorization.",
          "Stop work and reassess the permit if conditions change.",
        ],
      },
      icon: "hw-permit",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "İzin sistemi gerektiriyorsa", "en": "A permit system requires it"}},
    },
    {
      number: "02",
      title: {
        tr: "Alanı Hazırla",
        en: "Prepare the Work Area",
      },
      items: {
        tr: [
          "Yanıcıları kontrol et; varsa taşı, taşınamayanı yangına dayanıklı örtüyle koru.",
          "Zemin, açıklık ve karşı yüzlerde kıvılcım/ısı riskini kontrol et.",
          "Metal dumanı maruziyetini değerlendir; prosese uygun havalandırma/lokal emiş sağla.",
        ],
        en: [
          "Check combustibles; remove them or protect fixed items with fire-resistant covers.",
          "Check floors, openings and opposite surfaces for sparks/heat.",
          "Assess metal-fume exposure; provide process-matched ventilation/local exhaust.",
        ],
      },
      icon: "hw-combustibles",
      tone: "mandatory",
      application: {"kind": "required-control"},
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
          "Oksijen/yanıcı/toksik gazları ölç; gaz dedektörü duman kontrolünün yerini tutmaz.",
          "Koşullar değişebilecekse sürekli veya periyodik ölçüm yap.",
        ],
        en: [
          "Test the atmosphere before work where required.",
          "Check oxygen/flammable/toxic gases; a gas detector does not replace fume control.",
          "Use continuous or periodic monitoring when conditions may change.",
        ],
      },
      icon: "hw-gas-test",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Atmosfer tehlikesi veya izin şartı varsa", "en": "Atmospheric hazards or permit conditions require testing"}},
    },
    {
      number: "04",
      title: {
        tr: "Yangın Gözcüsü",
        en: "Fire Watch",
      },
      items: {
        tr: [
          "OSHA gözcü ölçütü veya saha riski varsa eğitimli, çelişen görevi olmayan gözcü görevlendir.",
          "Gözcünün tüm riskli alanları görebilmesini sağla.",
          "Gözcüye işi durdurma ve alarm verme yetkisi ver.",
        ],
        en: [
          "Where OSHA watch criteria or site risk applies, assign a trained fire watch with no conflicting duties.",
          "Ensure all exposed areas remain visible and accessible.",
          "Authorize the fire watch to stop work and raise the alarm.",
        ],
      },
      icon: "hw-fire-watch",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "OSHA gözcü ölçütü veya saha riski varsa", "en": "OSHA fire-watch criteria or site risk applies"}},
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
      icon: "hw-extinguisher",
      tone: "mandatory",
      application: {"kind": "required-control"},
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
          "Çevredekileri ark ışını ve sıçramadan uygun perdeyle koru.",
          "Duvar, boru ve metal yüzeylerden ısı iletimini değerlendir.",
        ],
        en: [
          "Confine sparks, slag and hot fragments.",
          "Screen nearby workers from arc radiation and spatter.",
          "Assess heat conduction through walls, pipes and metal surfaces.",
        ],
      },
      icon: "hw-spark-barrier",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Kıvılcım/ısı yayılma riski varsa", "en": "Sparks or heat can affect nearby people or materials"}},
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
      icon: "hw-cylinders",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Tüp ve gaz hortumu kullanılıyorsa", "en": "Cylinders and gas hoses are used"}},
    },
    {
      number: "08",
      title: {
        tr: "İş Sonrası Kontrol",
        en: "Post-Work Fire Watch",
      },
      items: {
        tr: [
          "ABD genel endüstri: gözcü gereken kaynak/kesme sonrası en az 30 dakika gözetim yap.",
          "Daha uzun yerel/risk süresinde uzat; uygulanabilir OSHA asgarisini kısaltma.",
          "Gizli/korlu yangını kontrol et. İnşaat 1926.352(e): yangın ihtimali kalmayana dek sürdür; sabit 30 dk demez.",
        ],
        en: [
          "US general industry: at least 30 minutes after welding/cutting requiring a watch.",
          "Extend for stricter local rules, permits or risk; do not shorten the applicable OSHA minimum.",
          "Construction 1926.352(e): watch until no fire risk; no fixed 30 min. Check concealed/smouldering fires.",
        ],
      },
      icon: "hw-post-watch",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Yangın gözcüsü gereken işten sonra", "en": "After work requiring a fire watch"}},
    },
  ],

  never: {
    tr: [
      "Gerekli sıcak çalışma izni yoksa işi hemen durdur",
      "Yanıcı veya patlayıcı atmosfer riski kontrol edilmediyse işi durdur",
      "Yanıcı malzemeler uzaklaştırılmamış veya korunmamışsa işi durdur",
      "Gereken gözcü yoksa veya uygun söndürme ekipmanı hazır değilse işi durdur",
      "Kıvılcım ve sıcak parçalar kontrol edilemiyorsa işi durdur",
    ],
    en: [
      "Stop work immediately if a required hot-work permit is missing",
      "Stop work if flammable or explosive atmospheric hazards are uncontrolled",
      "Stop work if combustibles are not removed or protected",
      "Stop work if a required fire watch is missing or suitable extinguishing equipment is unavailable",
      "Stop work if sparks and hot fragments cannot be contained",
    ],
  },

  ppe: {
    tr: [
      "Yüz/Göz Koruması",
      "Koruyucu Gözlük",
      "Isı Eldiveni",
      "İş Güvenliği Ayakkabısı",
      "Alev Geciktirici Giysi",
    ],
    en: [
      "Face/Eye Protection",
      "Safety Glasses",
      "Heat-Resistant Gloves",
      "Safety Footwear",
      "Flame-Resistant Clothing",
    ],
  },
};
