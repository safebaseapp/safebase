import type { SafetyGuide } from "../../components/GuideTemplate";

export const grindingGuide: SafetyGuide = {
  slug: "grinding",

  category: {
    en: "Work Activity",
    tr: "Çalışma Faaliyeti",
  },

  title: {
    en: "Grinding Operations Safety",
    tr: "Taşlama Operasyonları Güvenliği",
  },

  description: {
    en: "Practical guidance for controlling sparks, flying particles, abrasive-wheel failure, noise, dust, fire and equipment hazards during grinding operations.",
    tr: "Taşlama operasyonlarında kıvılcım, fırlayan parçacıklar, aşındırıcı disk kırılması, gürültü, toz, yangın ve ekipman tehlikelerini kontrol etmek için pratik rehber.",
  },

  overview: {
    en: "Grinding operations can cause severe injuries when machines, abrasive wheels, workpieces or work areas are not properly controlled. Safe grinding requires correct wheel selection, compatible machine speed, effective guarding, pre-use inspection, secure workpieces, suitable PPE and proper control of sparks, dust and combustible materials.",
    tr: "Taşlama operasyonları; makineler, aşındırıcı diskler, iş parçaları veya çalışma alanları doğru şekilde kontrol edilmediğinde ciddi yaralanmalara neden olabilir. Güvenli taşlama; doğru disk seçimi, uyumlu makine devri, etkili koruyucu muhafaza, kullanım öncesi kontrol, iş parçasının sabitlenmesi, uygun KKD ve kıvılcım, toz ile yanıcı malzemelerin doğru kontrolünü gerektirir.",
  },

  readTime: 10,

  riskLevel: {
    en: "High Risk",
    tr: "Yüksek Risk",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Abrasive-wheel breakage and high-speed fragments",
      "Flying particles, sparks and hot metal",
      "Eye and face injuries",
      "Cuts, abrasions and hand injuries",
      "Fire caused by sparks reaching combustible materials",
      "Noise exposure and hearing damage",
      "Respiratory exposure to metal dust or hazardous coatings",
      "Entanglement with rotating parts",
      "Electric shock from damaged cables or equipment",
      "Loss of control caused by an unsecured workpiece",
    ],

    tr: [
      "Aşındırıcı diskin kırılması ve yüksek hızlı parçaların fırlaması",
      "Fırlayan parçacıklar, kıvılcımlar ve sıcak metal",
      "Göz ve yüz yaralanmaları",
      "Kesikler, sıyrıklar ve el yaralanmaları",
      "Kıvılcımların yanıcı malzemelere ulaşması sonucu yangın",
      "Gürültü maruziyeti ve işitme kaybı",
      "Metal tozu veya tehlikeli kaplamalara solunum yoluyla maruziyet",
      "Dönen parçalara kapılma",
      "Hasarlı kablo veya ekipmandan elektrik çarpması",
      "Sabitlenmemiş iş parçası nedeniyle kontrol kaybı",
    ],
  },

  requiredPPE: {
    en: [
      "Safety glasses with side protection",
      "Face shield worn over primary eye protection",
      "Suitable task-specific gloves",
      "Hearing protection",
      "Safety footwear",
      "Flame-resistant or non-melting work clothing",
      "Respiratory protection where dust exposure requires it",
      "Safety helmet where overhead hazards exist",
    ],

    tr: [
      "Yan korumalı güvenlik gözlüğü",
      "Birincil göz korumasının üzerine takılan yüz siperi",
      "İşe uygun koruyucu eldiven",
      "Kulak koruyucu",
      "İş ayakkabısı",
      "Alev geciktirici veya erimeyen iş kıyafeti",
      "Toz maruziyetinin gerekli kıldığı durumlarda solunum koruyucu",
      "Baş üstü tehlike bulunan yerlerde baret",
    ],
  },

  controls: {
    en: [
      "Select an abrasive wheel suitable for the machine, material and task.",
      "Confirm that the wheel's rated speed is equal to or greater than the grinder's maximum speed.",
      "Inspect the wheel before use for cracks, chips, contamination or other damage.",
      "Use the correct flanges, backing pads and mounting accessories.",
      "Ensure the machine guard is installed, secure and correctly positioned.",
      "Keep side handles installed and maintain firm two-handed control.",
      "Secure the workpiece using clamps, a vice or another suitable method.",
      "Allow newly mounted wheels to run at operating speed in a protected position before use.",
      "Direct sparks away from people, cables, gas cylinders and combustible materials.",
      "Remove or protect flammable materials and provide fire controls where required.",
      "Use suitable extraction or ventilation to control dust and fumes.",
      "Inspect electrical cables, plugs, switches and the grinder body before use.",
      "Disconnect the power source before changing wheels or making adjustments.",
      "Stop work immediately if excessive vibration, unusual noise or wheel damage is detected.",
    ],

    tr: [
      "Makineye, malzemeye ve işe uygun aşındırıcı disk seçin.",
      "Diskin izin verilen devrinin taşlama makinesinin maksimum devrine eşit veya daha yüksek olduğunu doğrulayın.",
      "Diski kullanmadan önce çatlak, kırık, kirlenme veya diğer hasarlar açısından kontrol edin.",
      "Doğru flanşları, destek pedlerini ve montaj aksesuarlarını kullanın.",
      "Makine koruyucusunun takılı, sağlam ve doğru konumda olduğundan emin olun.",
      "Yan tutma kolunu takılı tutun ve makineyi iki elle sıkıca kontrol edin.",
      "İş parçasını kelepçe, mengene veya başka uygun bir yöntemle sabitleyin.",
      "Yeni takılan diski kullanmadan önce korunaklı bir konumda çalışma devrinde boşta döndürün.",
      "Kıvılcımları insanlardan, kablolardan, gaz tüplerinden ve yanıcı malzemelerden uzağa yönlendirin.",
      "Yanıcı malzemeleri kaldırın veya koruyun ve gerekli yangın önlemlerini sağlayın.",
      "Toz ve dumanı kontrol etmek için uygun emiş veya havalandırma kullanın.",
      "Elektrik kablosunu, fişi, anahtarı ve taşlama makinesinin gövdesini kullanım öncesinde kontrol edin.",
      "Disk değiştirmeden veya ayar yapmadan önce enerji kaynağını kesin.",
      "Aşırı titreşim, olağandışı ses veya disk hasarı tespit edilirse çalışmayı derhal durdurun.",
    ],
  },

  commonMistakes: {
    en: [
      "Using a wheel with a lower speed rating than the grinder",
      "Removing or modifying the machine guard",
      "Using damaged, expired or incorrectly stored abrasive wheels",
      "Using cutting wheels for side grinding",
      "Operating the grinder without the side handle",
      "Holding the workpiece by hand instead of securing it",
      "Using only a face shield without safety glasses",
      "Directing sparks toward people or combustible materials",
      "Changing wheels while the grinder remains connected to power",
      "Applying excessive pressure and forcing the wheel into the material",
    ],

    tr: [
      "Taşlama makinesinden daha düşük devir sınıfına sahip disk kullanmak",
      "Makine koruyucusunu çıkarmak veya değiştirmek",
      "Hasarlı, kullanım süresi geçmiş veya yanlış depolanmış disk kullanmak",
      "Kesme diskini yan yüzeyden taşlama yapmak için kullanmak",
      "Yan tutma kolu olmadan taşlama makinesini çalıştırmak",
      "İş parçasını sabitlemek yerine elle tutmak",
      "Güvenlik gözlüğü olmadan yalnızca yüz siperi kullanmak",
      "Kıvılcımları insanlara veya yanıcı malzemelere yönlendirmek",
      "Makine enerjiye bağlıyken disk değiştirmek",
      "Aşırı baskı uygulayarak diski malzemeye zorlamak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-use Checklist",
      tr: "Kullanım Öncesi Kontrol Listesi",
    },

    en: [
      "The correct grinder and abrasive wheel have been selected",
      "The wheel speed rating is compatible with the machine",
      "The wheel has no visible cracks, chips or damage",
      "The guard is installed and correctly positioned",
      "The side handle is installed and secure",
      "The workpiece has been firmly secured",
      "Electrical cables, plugs and switches are undamaged",
      "Required eye, face, hand, hearing and respiratory protection is available",
      "Combustible materials have been removed or protected",
      "Sparks will be directed into a safe area",
      "Dust extraction or ventilation is available where required",
      "The surrounding area has been inspected and controlled",
    ],

    tr: [
      "Doğru taşlama makinesi ve aşındırıcı disk seçildi",
      "Diskin devir sınıfı makineyle uyumlu",
      "Diskte görünür çatlak, kırık veya hasar yok",
      "Koruyucu muhafaza takılı ve doğru konumda",
      "Yan tutma kolu takılı ve sağlam",
      "İş parçası sıkıca sabitlendi",
      "Elektrik kablosu, fiş ve anahtarlarda hasar yok",
      "Gerekli göz, yüz, el, işitme ve solunum koruması hazır",
      "Yanıcı malzemeler kaldırıldı veya koruma altına alındı",
      "Kıvılcımlar güvenli bir alana yönlendirilecek",
      "Gerekli durumlarda toz emişi veya havalandırma hazır",
      "Çevredeki alan kontrol edildi ve güvence altına alındı",
    ],
  },

  emergencySection: {
    title: {
      en: "Wheel Failure, Fire or Injury",
      tr: "Disk Kırılması, Yangın veya Yaralanma",
    },

    content: {
      en: "Stop the grinder immediately if the wheel breaks, excessive vibration develops, fire starts or a person is injured. Disconnect the power source, keep others away from the area, raise the alarm where required and provide first aid or firefighting response only when trained and conditions are safe.",
      tr: "Disk kırılırsa, aşırı titreşim oluşursa, yangın çıkarsa veya bir kişi yaralanırsa taşlama makinesini derhal durdurun. Enerji kaynağını kesin, diğer kişileri alandan uzak tutun, gerekli olduğunda alarm verin ve yalnızca eğitimliyseniz ve koşullar güvenliyse ilk yardım veya yangın müdahalesi yapın.",
    },
  },

  references: [
    "OSHA 1910.133",
    "OSHA 1910.215",
    "OSHA 1910.242",
    "OSHA 1926.300",
    "OSHA 1926.303",
  ],

  relatedGuides: [
    {
      slug: "ppe",
      icon: "🦺",
      title: {
        en: "Personal Protective Equipment",
        tr: "Kişisel Koruyucu Donanım",
      },
    },
    {
      slug: "hot-work",
      icon: "🔥",
      title: {
        en: "Hot Work Safety",
        tr: "Sıcak Çalışma Güvenliği",
      },
    },
    {
      slug: "loto",
      icon: "🔒",
      title: {
        en: "Lockout Tagout",
        tr: "Kilitleme ve Etiketleme",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a grinding-safety question and receive practical guidance based on the knowledge base.",
    tr: "Taşlama güvenliği konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
