import { buildGeneratedGuide, commonFamilies, type GuideBlueprint, type Pair } from "./factory";

const P = (en: string, tr: string): Pair => ({ en, tr });
const F = commonFamilies.hotwork;

const blueprints: GuideBlueprint[] = [
  {
    slug: "welding-safety",
    title: P("Welding Safety", "Kaynak Güvenliği"),
    focus: P("safe welding with fire, fume, electrical and radiation controls", "yangın, duman, elektrik ve ışınım kontrolleriyle güvenli kaynak çalışması"),
    family: F,
    osha: ["OSHA 1910.252", "OSHA 1926.352"],
    hazards: [P("Welding fumes and gases", "Kaynak dumanı ve gazları"), P("Arc radiation, electric shock and hot metal", "Ark ışınımı, elektrik çarpması ve sıcak metal")],
    controls: [P("Provide local exhaust or ventilation appropriate to the welding process and location.", "Kaynak prosesi ve konuma uygun lokal emiş veya havalandırma sağlayın."), P("Inspect leads, holders, grounding and electrode equipment before use.", "Kullanım öncesi kablo, pens, topraklama ve elektrot ekipmanını kontrol edin.")],
  },
  {
    slug: "gas-cutting-safety",
    title: P("Gas Cutting Safety", "Oksi-Gaz Kesme Güvenliği"),
    focus: P("safe oxygen-fuel cutting using correct cylinders, hoses, regulators and flashback controls", "doğru tüp, hortum, regülatör ve geri tepme kontrolleriyle güvenli oksi-gaz kesme"),
    family: F,
    osha: ["OSHA 1910.253", "OSHA 1926.350"],
    hazards: [P("Flashback, hose failure or leaking connections", "Geri tepme, hortum arızası veya kaçak bağlantı"), P("Oxygen enrichment or fuel-gas accumulation", "Oksijen zenginleşmesi veya yakıt gazı birikimi")],
    controls: [P("Inspect hoses, regulators, torches and connections and leak-test before use.", "Kullanım öncesi hortum, regülatör, şaloma ve bağlantıları kontrol edin ve kaçak testi yapın."), P("Keep cylinders upright, protected and separated from ignition or incompatible storage conditions.", "Tüpleri dik, korumalı ve tutuşturucu kaynaklardan/uyumsuz depolamadan ayrı tutun.")],
  },
  {
    slug: "fire-watch-duties",
    title: P("Fire Watch Duties", "Yangın Gözcüsü Görevleri"),
    focus: P("fire-watch positioning, monitoring and response during and after hot work", "sıcak çalışma sırasında ve sonrasında yangın gözcüsünün konumlanması, izlemesi ve müdahalesi"),
    family: F,
    osha: ["OSHA 1910.252", "OSHA 1926.352"],
    hazards: [P("Delayed ignition in hidden or adjacent combustible areas", "Gizli veya bitişik yanıcı alanlarda gecikmeli tutuşma"), P("Fire watch distracted by other work or unable to see the hazard area", "Yangın gözcüsünün başka işle meşgul olması veya tehlike alanını görememesi")],
    controls: [P("Position the fire watch to observe all affected surfaces and adjacent spaces.", "Yangın gözcüsünü etkilenen yüzey ve bitişik alanları görecek şekilde konumlandırın."), P("Maintain suitable extinguishing equipment and continue monitoring for the required post-work period.", "Uygun söndürme ekipmanını hazır tutun ve iş sonrası gerekli süre boyunca izlemeyi sürdürün.")],
  },
  {
    slug: "gas-cylinder-safety",
    title: P("Compressed Gas Cylinder Safety", "Basınçlı Gaz Tüpü Güvenliği"),
    focus: P("handling, securing, transport and use of compressed-gas cylinders", "basınçlı gaz tüplerinin taşıma, sabitleme, nakil ve kullanımı"),
    family: F,
    osha: ["OSHA 1910.253", "OSHA 1926.350"],
    hazards: [P("Cylinder falling, valve damage or projectile release", "Tüp devrilmesi, vana hasarı veya füze etkisi"), P("Wrong regulator, contamination or gas incompatibility", "Yanlış regülatör, kirlenme veya gaz uyumsuzluğu")],
    controls: [P("Secure cylinders upright and protect valve assemblies during storage and movement.", "Tüpleri dik sabitleyin; depolama ve taşıma sırasında vana grubunu koruyun."), P("Use gas-specific regulators and keep oxygen fittings free from oil and grease.", "Gaza özel regülatör kullanın; oksijen bağlantılarını yağ ve gresten uzak tutun.")],
  },
  {
    slug: "oxygen-fuel-gas-storage",
    title: P("Oxygen & Fuel Gas Storage", "Oksijen ve Yakıt Gazı Depolama"),
    focus: P("separation, ventilation and protection of oxygen and fuel-gas cylinders in storage", "oksijen ve yakıt gazı tüplerinin depolamada ayrılması, havalandırılması ve korunması"),
    family: F,
    osha: ["OSHA 1910.253", "OSHA 1926.350"],
    hazards: [P("Fuel gas and oxygen stored without adequate separation", "Yakıt gazı ile oksijenin yeterli ayrım olmadan depolanması"), P("Heat, impact, poor ventilation or unauthorized access", "Isı, darbe, yetersiz havalandırma veya yetkisiz erişim")],
    controls: [P("Maintain required separation or suitable fire-resistive separation between oxygen and fuel-gas storage.", "Oksijen ve yakıt gazı depolaması arasında gerekli mesafeyi veya uygun yangına dayanımlı ayrımı sağlayın."), P("Keep storage ventilated, signed, secured and away from heat and traffic damage.", "Depolamayı havalandırılmış, işaretli, güvenli ve ısı/araç hasarından uzak tutun.")],
  },
  {
    slug: "spark-slag-control",
    title: P("Spark & Slag Control", "Kıvılcım ve Cüruf Kontrolü"),
    focus: P("containing sparks, molten metal and hot slag from hot-work activities", "sıcak çalışmalarda kıvılcım, erimiş metal ve sıcak cürufun kontrol altına alınması"),
    family: F,
    osha: ["OSHA 1910.252", "OSHA 1926.352"],
    hazards: [P("Sparks traveling through openings or onto lower levels", "Kıvılcımların açıklıklardan veya alt seviyelere geçmesi"), P("Combustibles ignited outside the operator's direct view", "Operatörün görüşü dışında yanıcıların tutuşması")],
    controls: [P("Use fire-resistant screens, blankets or containment positioned to capture the actual spark path.", "Gerçek kıvılcım yolunu yakalayacak şekilde yangına dayanıklı perde, battaniye veya tutucu kullanın."), P("Inspect below, behind and through penetrations before and during hot work.", "Sıcak çalışma öncesi ve sırasında alt, arka ve geçiş bölgelerini kontrol edin.")],
  },
  {
    slug: "flammable-liquid-safety",
    title: P("Flammable Liquid Safety", "Parlayıcı Sıvı Güvenliği"),
    focus: P("storage, transfer and ignition control for flammable and combustible liquids", "parlayıcı ve yanıcı sıvılarda depolama, transfer ve tutuşturma kontrolü"),
    family: F,
    osha: ["OSHA 1910.106"],
    hazards: [P("Vapor accumulation near ignition sources", "Tutuşturucu kaynak yakınında buhar birikmesi"), P("Spills during transfer or use of unsuitable containers", "Transfer sırasında dökülme veya uygunsuz kap kullanımı")],
    controls: [P("Use approved containers and keep quantities at the work area to the practical minimum.", "Onaylı kaplar kullanın ve çalışma alanındaki miktarı pratik minimumda tutun."), P("Control ignition sources and provide bonding/grounding where static accumulation can create a hazard.", "Tutuşturucu kaynakları kontrol edin; statik birikimin tehlike oluşturduğu yerde eşpotansiyel/topraklama sağlayın.")],
  },
  {
    slug: "combustible-dust-safety",
    title: P("Combustible Dust Safety", "Yanıcı Toz Güvenliği"),
    focus: P("preventing dust accumulation, ignition and secondary explosions in combustible-dust environments", "yanıcı toz ortamlarında birikme, tutuşma ve ikincil patlamaların önlenmesi"),
    family: F,
    osha: ["OSHA 1910.22", "OSHA 1910.307"],
    hazards: [P("Suspended combustible dust reaching an ignition source", "Havadaki yanıcı tozun tutuşturucu kaynakla buluşması"), P("Accumulated dust feeding a secondary explosion", "Birikmiş tozun ikincil patlamayı beslemesi")],
    controls: [P("Use effective dust collection and housekeeping methods that do not create airborne clouds.", "Havada toz bulutu oluşturmayan etkili toz toplama ve temizlik yöntemleri kullanın."), P("Control hot work, static, electrical and mechanical ignition sources in dust-hazard areas.", "Toz tehlikesi olan alanlarda sıcak çalışma, statik, elektriksel ve mekanik tutuşturma kaynaklarını kontrol edin.")],
  },
  {
    slug: "fire-extinguisher-selection",
    title: P("Fire Extinguisher Selection & Use", "Yangın Söndürücü Seçimi ve Kullanımı"),
    focus: P("selecting, locating and using portable fire extinguishers for expected fire hazards", "beklenen yangın tehlikelerine uygun taşınabilir söndürücü seçimi, yerleşimi ve kullanımı"),
    family: F,
    risk: "medium",
    osha: ["OSHA 1910.157"],
    hazards: [P("Wrong extinguisher type used on the fire class or energized equipment", "Yangın sınıfı veya enerjili ekipmanda yanlış söndürücü kullanımı"), P("Attempting to fight a fire without a safe escape route", "Güvenli kaçış yolu olmadan yangına müdahale etmeye çalışmak")],
    controls: [P("Match extinguisher type and rating to the credible fire hazard in the area.", "Söndürücü tip ve kapasitesini alandaki olası yangın tehlikesine göre seçin."), P("Only trained personnel should attempt incipient-stage fire fighting while maintaining an escape path.", "Yalnız eğitimli kişiler, kaçış yolunu koruyarak başlangıç aşamasındaki yangına müdahale etmelidir.")],
  },
];

export const generatedHotworkFireGuides = blueprints.map(buildGeneratedGuide);
