import type { PosterDefinition } from "./types";

export const firePoster: PosterDefinition = {
  code: "SRN-FIRE-001",
  revision: "1.0",

  title: {
    tr: "Yangın Kritik Güvenlik Kuralları",
    en: "Fire Safety Critical Rules",
  },

  slogan: {
    tr: "Alarm Ver • Güvenle Tahliye Et • Yalnızca Eğitimliysen Müdahale Et",
    en: "Raise the Alarm • Evacuate Safely • Fight Only If Trained",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Alarm Ver ve Bildir",
        en: "Raise the Alarm",
      },
      items: {
        tr: [
          "Yangını gördüğünde alarmı derhal etkinleştir.",
          "Acil durum numarasını veya saha kontrol merkezini ara.",
          "Yangının yeri, türü ve bilinen riskleri açıkça bildir.",
        ],
        en: [
          "Activate the fire alarm immediately after discovering a fire.",
          "Call the emergency number or site control centre.",
          "Clearly report the location, fire type and known hazards.",
        ],
      },
      icon: "training",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Yangın belirtisi veya alarm durumunda", "en": "Fire is discovered or an alarm condition occurs"}},
    },
    {
      number: "02",
      title: {
        tr: "Tahliyeyi Başlat",
        en: "Evacuate Safely",
      },
      items: {
        tr: [
          "En yakın güvenli acil çıkışı kullan.",
          "Asansör kullanma ve kişisel eşya almak için geri dönme.",
          "Belirlenen toplanma noktasına git ve sayıma katıl.",
        ],
        en: [
          "Use the nearest safe emergency exit.",
          "Do not use lifts or return for personal belongings.",
          "Proceed to the assembly point and report for accountability.",
        ],
      },
      icon: "ladder",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Tahliye gerektiğinde", "en": "Evacuation is required"}},
    },
    {
      number: "03",
      title: {
        tr: "Söndürücüyü Doğru Seç",
        en: "Select the Correct Extinguisher",
      },
      items: {
        tr: [
          "Söndürücüyü yangın sınıfına ve yakıta göre seç.",
          "Elektrik tehlikesinde iletken söndürme maddesi kullanma.",
          "OSHA mesafe kartları yalnız 1910.157(d) uygulanıyorsa geçerlidir; tahliye planı istisnalarını doğrula.",
        ],
        en: [
          "Select the extinguisher for the fire class and fuel involved.",
          "Do not use conductive extinguishing agents on electrical hazards.",
          "OSHA distance cards apply only where 1910.157(d) applies; check evacuation-plan exemptions.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Yetkili söndürücü kullanımında", "en": "Authorized extinguisher use"}},
    },
    {
      number: "04",
      title: {
        tr: "Yalnızca Başlangıç Yangınına Müdahale Et",
        en: "Fight Incipient Fires Only",
      },
      items: {
        tr: [
          "Yalnızca küçük ve başlangıç aşamasındaki yangına müdahale et.",
          "OSHA çalışan kullanımı: başlangıçta ve en az yılda bir eğitim; yalnız eğitimli ve yetkili kişi müdahale etsin.",
          "Her zaman arkanda açık ve güvenli kaçış yolu bulundur.",
        ],
        en: [
          "Attempt only small, incipient-stage fires.",
          "OSHA employee use: initial and at least annual education/training; only trained, authorized personnel may intervene.",
          "Always maintain a clear and safe escape route behind you.",
        ],
      },
      icon: "training",
      tone: "mandatory",
      application: {"kind": "conditional-control", "when": {"tr": "Başlangıç yangınına müdahale edilecekse", "en": "An incipient fire is to be tackled"}},
    },
    {
      number: "05",
      title: {
        tr: "Söndürücüyü Kontrol Et",
        en: "Inspect the Extinguisher",
      },
      items: {
        tr: [
          "Söndürücünün yerinde, erişilebilir ve görünür olduğunu doğrula.",
          "Pim, mühür, hortum, basınç göstergesi ve gövdeyi kontrol et.",
          "Hasarlı, boşalmış veya süresi geçmiş ekipmanı kullanma.",
        ],
        en: [
          "Verify the extinguisher is in place, visible and accessible.",
          "Check the pin, seal, hose, pressure indicator and cylinder.",
          "Do not use damaged, discharged or overdue equipment.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
      application: {"kind": "required-control"},
    },
    {
      number: "06",
      title: {
        tr: "Yakıt ve Tutuşturma Kaynaklarını Kontrol Et",
        en: "Control Fuel and Ignition Sources",
      },
      items: {
        tr: [
          "Yanıcı atık ve gereksiz malzeme birikimini önle.",
          "Yanıcı sıvıları onaylı kaplarda ve uygun alanlarda sakla.",
          "Isı, kıvılcım ve açık alev kaynaklarını kontrol altında tut.",
        ],
        en: [
          "Prevent accumulation of combustible waste and unnecessary materials.",
          "Store flammable liquids in approved containers and areas.",
          "Control heat, sparks and open-flame ignition sources.",
        ],
      },
      icon: "weather",
      tone: "mandatory",
      application: {"kind": "required-control"},
    },
    {
      number: "07",
      title: {
        tr: "Çıkışları ve Yangın Ekipmanını Açık Tut",
        en: "Keep Exits and Equipment Clear",
      },
      items: {
        tr: [
          "Acil çıkış, kaçış yolu ve yangın kapılarını engelleme.",
          "Söndürücü, hidrant ve alarm butonlarının önünü açık tut.",
          "Yangın kapılarını izinsiz açık sabitleme veya devre dışı bırakma.",
        ],
        en: [
          "Do not obstruct exits, escape routes or fire doors.",
          "Keep extinguishers, hydrants and alarm points unobstructed.",
          "Never wedge open or disable fire doors without authorization.",
        ],
      },
      icon: "guardrail",
      tone: "mandatory",
      application: {"kind": "required-control"},
    },
    {
      number: "08",
      title: {
        tr: "Müdahaleyi Bırak ve Geri Çekil",
        en: "Withdraw When Conditions Escalate",
      },
      items: {
        tr: [
          "Yangın büyüyor, duman artıyor veya görüş kayboluyorsa geri çekil.",
          "Söndürücü boşalmasına rağmen yangın kontrol altına alınmadıysa tahliye et.",
          "Kapalı kap, basınçlı tüp veya patlama riski bulunan alana yaklaşma.",
        ],
        en: [
          "Withdraw if the fire grows, smoke increases or visibility is lost.",
          "Evacuate if the fire remains uncontrolled after extinguisher discharge.",
          "Do not approach sealed vessels, cylinders or explosion hazards.",
        ],
      },
      icon: "fall",
      tone: "warning",
      application: {"kind": "hazard-warning"},
    },
  ],

  never: {
    tr: [
      "Alarm çalışmıyor veya acil durum iletişimi kurulamıyorsa işi hemen durdur",
      "Acil çıkış, kaçış yolu veya yangın ekipmanı engelliyse işi durdur",
      "Söndürücü hasarlı, boş, erişilemez veya yangın sınıfına uygun değilse müdahale etme",
      "Yangın büyüyor, yoğun duman oluşuyor veya güvenli kaçış yolu kalmıyorsa derhal tahliye et",
      "Eğitimin, yetkin veya güvenli müdahale imkânın yoksa yangınla mücadele etme",
    ],
    en: [
      "Stop work immediately if alarms or emergency communication are unavailable",
      "Stop work if exits, escape routes or firefighting equipment are obstructed",
      "Do not intervene if the extinguisher is damaged, empty, inaccessible or unsuitable",
      "Evacuate immediately if the fire grows, smoke intensifies or the escape route is threatened",
      "Do not fight the fire unless trained, authorized and able to do so safely",
    ],
  },

  ppe: {
    tr: [
      "Baret",
      "Koruyucu Gözlük",
      "Isıya Uygun Eldiven",
      "Güvenlik Ayakkabısı",
      "Aleve Dayanıklı Giysi",
    ],
    en: [
      "Safety Helmet",
      "Safety Glasses",
      "Heat-Resistant Gloves",
      "Safety Footwear",
      "Flame-Resistant Clothing",
    ],
  },
};
