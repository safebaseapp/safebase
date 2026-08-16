import type { PosterDefinition } from "./types";

export const manualHandlingSafetyPoster: PosterDefinition = {
  code: "SRN-MH-001",
  revision: "1.0",
  title: {
    tr: "Elle Taşıma Kritik Güvenlik Kuralları",
    en: "Manual Handling Critical Safety Rules",
  },
  slogan: {
    tr: "YÜKÜ DEĞERLENDİR • YAKIN TUT • DÖNEREK BURULMA • GEREKİRSE YARDIM AL",
    en: "ASSESS THE LOAD • KEEP IT CLOSE • DO NOT TWIST • GET HELP WHEN NEEDED",
  },
  rules: [
    {
      number: "01",
      title: {
        tr: "Yükü Önce Değerlendir",
        en: "Assess the Load First",
      },
      items: {
        tr: ["Ağırlık, boyut, tutuş ve ağırlık merkezini değerlendir.", "Yükün hareket edip etmeyeceğini kontrol et.", "Şüphedeysen yardım veya ekipman kullan."],
        en: ["Assess weight, size, grip and centre of gravity.", "Check whether the load can shift.", "Use assistance or equipment when in doubt."],
      },
      icon: "mh-assess" as any,
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Taşıma Yolunu Planla",
        en: "Plan the Route",
      },
      items: {
        tr: ["Yürüme yolunu önceden kontrol et.", "Kapı, basamak ve engelleri belirle.", "Bırakma noktasını hazırla."],
        en: ["Check the travel route before lifting.", "Identify doors, steps and obstacles.", "Prepare the set-down location."],
      },
      icon: "mh-route" as any,
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Yüke Yaklaş",
        en: "Get Close to the Load",
      },
      items: {
        tr: ["Ayaklarını dengeli konumlandır.", "Yükü vücuduna yakın tut.", "Uzanarak kaldırma yapma."],
        en: ["Use a stable foot position.", "Keep the load close to your body.", "Do not lift while overreaching."],
      },
      icon: "mh-close" as any,
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Kontrollü Kaldır",
        en: "Lift Smoothly",
      },
      items: {
        tr: ["Ani hareketten kaçın.", "Bacakları kullan ve kontrollü doğrul.", "Yükü sarsma veya fırlatma."],
        en: ["Avoid sudden movements.", "Use your legs and rise smoothly.", "Do not jerk or throw the load."],
      },
      icon: "mh-lift" as any,
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Burularak Dönme",
        en: "Do Not Twist",
      },
      items: {
        tr: ["Yük taşırken gövdeyi burma.", "Yön değiştirmek için ayaklarını hareket ettir.", "Dengesiz pozisyonda kaldırma yapma."],
        en: ["Do not twist your torso while carrying a load.", "Move your feet to change direction.", "Do not lift from an unstable posture."],
      },
      icon: "mh-twist" as any,
      tone: "mandatory",
    },
    {
      number: "06",
      title: {
        tr: "Mekanik Yardım Kullan",
        en: "Use Mechanical Assistance",
      },
      items: {
        tr: ["Uygun trolley, hoist veya taşıma ekipmanı kullan.", "Ekipmanın kapasitesini kontrol et.", "Hasarlı yardımcı ekipmanı kullanma."],
        en: ["Use a suitable trolley, hoist or handling aid.", "Check equipment capacity.", "Do not use damaged handling aids."],
      },
      icon: "mh-trolley" as any,
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Ekip Kaldırmayı Koordine Et",
        en: "Coordinate Team Lifts",
      },
      items: {
        tr: ["Tek bir kişi komut versin.", "Kaldırma ve bırakmayı birlikte yapın.", "Kişiler arasında yük dağılımını dengeli tutun."],
        en: ["Use one person to coordinate commands.", "Lift and lower together.", "Distribute the load evenly between people."],
      },
      icon: "mh-team" as any,
      tone: "mandatory",
    },
    {
      number: "08",
      title: {
        tr: "Güvenli Şekilde Bırak",
        en: "Set Down Safely",
      },
      items: {
        tr: ["Parmak ve elleri sıkışma noktalarından uzak tut.", "Yükü stabil yüzeye bırak.", "Yükü düşürme veya kontrolsüz kaydırma."],
        en: ["Keep fingers and hands away from pinch points.", "Set the load on a stable surface.", "Do not drop or slide the load uncontrolled."],
      },
      icon: "mh-setdown" as any,
      tone: "mandatory",
    }
  ],
  never: {
    tr: ["KAPASİTENİN ÜZERİNDE TEK BAŞINA KALDIRMAYA ÇALIŞMA", "BURULARAK VE UZANARAK KALDIRMA YAPMA", "GÖRÜŞÜ KAPATAN YÜKLE KONTROLSÜZ YÜRÜME", "HASARLI TAŞIMA EKİPMANI KULLANMA", "SIKIŞMA NOKTASINA ELİNİ SOKMA"],
    en: ["NEVER ATTEMPT AN UNSAFE SOLO LIFT", "NEVER LIFT WHILE TWISTING OR OVERREACHING", "NEVER WALK BLIND BEHIND A LOAD", "NEVER USE DAMAGED HANDLING EQUIPMENT", "NEVER PLACE HANDS IN PINCH POINTS"],
  },
  ppe: {
    tr: ["İş Eldiveni", "Emniyet Ayakkabısı", "İş Kıyafeti", "Reflektif Yelek", "Göreve Göre KKD"],
    en: ["Work Gloves", "Safety Footwear", "Work Clothing", "High-Visibility Vest", "Task-Specific PPE"],
  },
};
