import type { PosterDefinition } from "./types";

export const chemicalSafetyPoster: PosterDefinition = {
  code: "SB-CHM-001",
  revision: "1.0",
  title: {
    tr: "Kimyasal Güvenlik Kritik Kuralları",
    en: "Chemical Safety Critical Rules",
  },
  slogan: {
    tr: "ETİKETİ OKU • SDS'Yİ KONTROL ET • UYUMSUZLARI AYIR • MARUZİYETİ ÖNLE",
    en: "READ THE LABEL • CHECK THE SDS • SEGREGATE INCOMPATIBLES • PREVENT EXPOSURE",
  },
  rules: [
    {
      number: "01",
      title: {
        tr: "Etiketi Kontrol Et",
        en: "Check the Label",
      },
      items: {
        tr: ["Kimyasalı kullanmadan önce etiketi oku.", "İçeriği bilinmeyen kabı kullanma.", "İkincil kapları uygun şekilde etiketle."],
        en: ["Read the label before using a chemical.", "Do not use unidentified containers.", "Label secondary containers appropriately."],
      },
      icon: "chm-label" as any,
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "SDS'yi İncele",
        en: "Review the SDS",
      },
      items: {
        tr: ["Tehlikeleri ve ilk yardım bilgisini kontrol et.", "Gerekli KKD ve depolama şartlarını doğrula.", "Acil durum bilgisinin erişilebilir olduğundan emin ol."],
        en: ["Review hazards and first-aid information.", "Confirm required PPE and storage conditions.", "Ensure emergency information is accessible."],
      },
      icon: "chm-sds" as any,
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Uyumsuzları Ayır",
        en: "Segregate Incompatibles",
      },
      items: {
        tr: ["Asit, baz, oksitleyici ve yanıcıları uyumluluğa göre ayır.", "Kimyasalı uygun dolap veya alanda depola.", "Gelişigüzel birlikte depolama yapma."],
        en: ["Separate acids, bases, oxidizers and flammables by compatibility.", "Store chemicals in suitable cabinets or areas.", "Do not store incompatible chemicals together."],
      },
      icon: "chm-storage" as any,
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Maruziyeti Kontrol Et",
        en: "Control Exposure",
      },
      items: {
        tr: ["Önce kapalı sistem ve havalandırma gibi mühendislik kontrollerini kullan.", "Gerekli KKD'yi risk değerlendirmesine göre seç.", "Maruziyet sınırlarını aşma."],
        en: ["Use engineering controls such as enclosure and ventilation first.", "Select PPE based on the risk assessment.", "Do not exceed applicable exposure limits."],
      },
      icon: "chm-vent" as any,
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Dökülmeye Hazır Ol",
        en: "Prepare for Spills",
      },
      items: {
        tr: ["Uygun spill kit ve absorban bulundur.", "Dökülmede alanı izole et.", "Yetkin olmadığın kimyasal dökülmeye müdahale etme."],
        en: ["Provide a suitable spill kit and absorbents.", "Isolate the area following a spill.", "Do not respond to chemical spills beyond your training."],
      },
      icon: "chm-spill" as any,
      tone: "mandatory",
    },
    {
      number: "06",
      title: {
        tr: "Doğru Aktarım Yap",
        en: "Transfer Safely",
      },
      items: {
        tr: ["Uygun pompa ve aktarım ekipmanı kullan.", "Sıçrama ve statik elektrik risklerini kontrol et.", "Açık kapta kontrolsüz aktarım yapma."],
        en: ["Use suitable pumps and transfer equipment.", "Control splash and static-electricity hazards.", "Do not perform uncontrolled open-container transfer."],
      },
      icon: "chm-transfer" as any,
      tone: "mandatory",
    },
    {
      number: "07",
      title: {
        tr: "Hijyeni Koru",
        en: "Maintain Hygiene",
      },
      items: {
        tr: ["Kimyasal çalışma alanında yemek veya içmekten kaçın.", "Eldiven çıkarıldıktan sonra elleri yıka.", "Kirlenmiş KKD'yi kontrollü şekilde çıkar."],
        en: ["Do not eat or drink in chemical work areas.", "Wash hands after removing gloves.", "Remove contaminated PPE in a controlled manner."],
      },
      icon: "chm-hygiene" as any,
      tone: "mandatory",
    },
    {
      number: "08",
      title: {
        tr: "Acil Durumda Doğru Hareket Et",
        en: "Respond Correctly",
      },
      items: {
        tr: ["Göz veya cilt temasında SDS talimatlarını uygula.", "Gerekli acil duş/göz yıkama ekipmanına erişimi açık tut.", "Maruziyeti derhal bildir."],
        en: ["Follow SDS instructions after eye or skin contact.", "Keep required emergency shower/eyewash equipment accessible.", "Report exposure immediately."],
      },
      icon: "chm-emergency" as any,
      tone: "mandatory",
    }
  ],
  never: {
    tr: ["ETİKETSİZ KİMYASAL KULLANMA", "SDS BİLGİSİ OLMADAN İŞE BAŞLAMA", "UYUMSUZ KİMYASALLARI BİRLİKTE DEPOLAMA", "BİLİNMEYEN DÖKÜLMEYE KORUMASIZ MÜDAHALE ETME", "KİMYASAL MARUZİYETİNİ GÖRMEZDEN GELME"],
    en: ["NEVER USE AN UNLABELLED CHEMICAL", "NEVER START WITHOUT SDS INFORMATION", "NEVER STORE INCOMPATIBLE CHEMICALS TOGETHER", "NEVER RESPOND UNPROTECTED TO AN UNKNOWN SPILL", "NEVER IGNORE A CHEMICAL EXPOSURE"],
  },
  ppe: {
    tr: ["Kimyasal Gözlük", "Kimyasal Eldiven", "Koruyucu Giysi", "Emniyet Ayakkabısı", "Solunum Koruması*"],
    en: ["Chemical Goggles", "Chemical Gloves", "Protective Clothing", "Safety Footwear", "Respiratory Protection*"],
  },
};
