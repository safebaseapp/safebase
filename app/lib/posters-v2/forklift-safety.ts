import type { PosterDefinition } from "./types";

export const forkliftSafetyPoster: PosterDefinition = {
  code: "SRN-FLT-001",
  revision: "1.0",
  title: {
    tr: "Forklift Kritik Güvenlik Kuralları",
    en: "Forklift Critical Safety Rules",
  },
  slogan: {
    tr: "YETKİLİ OPERATÖR • KONTROL ET • KAPASİTEYİ AŞMA • YAYAYI KORU",
    en: "AUTHORIZED OPERATOR • INSPECT • RESPECT CAPACITY • PROTECT PEDESTRIANS",
  },
  rules: [
    {
      number: "01",
      title: {
        tr: "Yetkili Operatör Kullanır",
        en: "Authorized Operators Only",
      },
      items: {
        tr: ["Forklifti yalnızca eğitimli ve yetkili personel kullansın.", "Yetkilendirme kapsamına uygun ekipman kullan.", "Yetkisiz kullanıma izin verme."],
        en: ["Only trained and authorized personnel may operate the forklift.", "Operate equipment within the scope of authorization.", "Prevent unauthorized use."],
      },
      icon: "flt-operator" as any,
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Günlük Kontrol Yap",
        en: "Inspect Before Use",
      },
      items: {
        tr: ["Vardiya öncesi forklift kontrolünü tamamla.", "Fren, direksiyon, korna, lastik ve çatalları kontrol et.", "Emniyetsiz ekipmanı hizmet dışı bırak."],
        en: ["Complete the pre-shift forklift inspection.", "Check brakes, steering, horn, tyres and forks.", "Remove unsafe equipment from service."],
      },
      icon: "flt-inspect" as any,
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Kapasiteyi Aşma",
        en: "Respect Rated Capacity",
      },
      items: {
        tr: ["Yük kapasite plakasını kontrol et.", "Yük merkezi ve ataşman etkisini dikkate al.", "Aşırı veya dengesiz yük taşıma."],
        en: ["Check the capacity plate.", "Consider load centre and attachment effects.", "Do not carry overloaded or unstable loads."],
      },
      icon: "flt-load" as any,
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Yükü Stabil Tut",
        en: "Keep the Load Stable",
      },
      items: {
        tr: ["Yükü çatallara dengeli yerleştir.", "Seyir sırasında yükü mümkün olduğunca düşük tut.", "Gevşek malzemeyi emniyete al."],
        en: ["Centre the load on the forks.", "Keep the load as low as practicable while travelling.", "Secure loose materials."],
      },
      icon: "flt-stable" as any,
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Yayaları Ayır",
        en: "Separate Pedestrians",
      },
      items: {
        tr: ["Yaya yollarına öncelik ver.", "Kör nokta ve kapılarda korna kullan.", "İnsanların yükseltilmiş yük altına girmesine izin verme."],
        en: ["Respect pedestrian routes.", "Use the horn at blind spots and doorways.", "Never allow people beneath elevated loads."],
      },
      icon: "flt-pedestrian" as any,
      tone: "mandatory",
    },
    {
      number: "06",
      title: {
        tr: "Görüşü Koru",
        en: "Maintain Visibility",
      },
      items: {
        tr: ["Görüş engelliyse güvenli yönde seyret veya spotter kullan.", "Kavşaklarda yavaşla.", "Hızını saha koşullarına göre ayarla."],
        en: ["Travel in a safe direction or use a spotter when the load blocks visibility.", "Slow down at intersections.", "Adjust speed to site conditions."],
      },
      icon: "flt-visibility" as any,
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Eğimlerde Kontrollü Ol",
        en: "Control Travel on Slopes",
      },
      items: {
        tr: ["Rampalarda ani dönüş yapma.", "Yük yönünü güvenli konumda tut.", "Kaygan ve bozuk zeminde hızını azalt."],
        en: ["Do not make sudden turns on ramps.", "Keep the load oriented safely on grades.", "Reduce speed on slippery or damaged surfaces."],
      },
      icon: "flt-slope" as any,
      tone: "mandatory",
    },
    {
      number: "08",
      title: {
        tr: "Güvenli Park Et",
        en: "Park Safely",
      },
      items: {
        tr: ["Çatalları tamamen indir.", "Kontrolleri nötrle ve park frenini uygula.", "Yetkisiz çalıştırmaya karşı anahtarı kontrol et."],
        en: ["Fully lower the forks.", "Neutralize controls and apply the parking brake.", "Control the key against unauthorized operation."],
      },
      icon: "flt-park" as any,
      tone: "mandatory",
    }
  ],
  never: {
    tr: ["YETKİSİZ FORKLİFT KULLANMA", "KAPASİTE PLAKASINI AŞMA", "YÜK ALTINDA İNSAN BULUNDURMA", "GÖRÜŞ OLMADAN KONTROLSÜZ SEYRETME", "ÇATALLAR YUKARIDAYKEN FORKLİFTİ TERK ETME"],
    en: ["NEVER OPERATE A FORKLIFT WITHOUT AUTHORIZATION", "NEVER EXCEED THE RATED CAPACITY", "NEVER ALLOW PEOPLE BENEATH A LOAD", "NEVER TRAVEL BLIND WITHOUT CONTROLS", "NEVER LEAVE A FORKLIFT WITH FORKS RAISED"],
  },
  ppe: {
    tr: ["Baret", "Koruyucu Gözlük", "İş Eldiveni", "Emniyet Ayakkabısı", "Reflektif Yelek"],
    en: ["Safety Helmet", "Safety Glasses", "Work Gloves", "Safety Footwear", "High-Visibility Vest"],
  },
};
