import { buildGeneratedGuide, commonFamilies, type GuideBlueprint, type Pair } from "./factory";

const P = (en: string, tr: string): Pair => ({ en, tr });
const F = commonFamilies.lifting;

const blueprints: GuideBlueprint[] = [
  {
    slug: "rigging-safety",
    title: P("Rigging Safety", "Sapanlama Güvenliği"),
    focus: P("selecting, inspecting and using rigging equipment for lifting operations", "kaldırma operasyonlarında sapanlama ekipmanının seçimi, kontrolü ve kullanımı"),
    family: F,
    osha: ["OSHA 1926.251", "OSHA 1926 Subpart CC"],
    hazards: [P("Incorrect sling angle or load distribution", "Yanlış sapan açısı veya yük dağılımı"), P("Uncontrolled movement caused by poor rigging geometry", "Hatalı sapanlama geometrisine bağlı kontrolsüz hareket")],
    controls: [P("Identify load weight, center of gravity and lifting points before rigging.", "Sapanlama öncesi yük ağırlığı, ağırlık merkezi ve kaldırma noktalarını belirleyin."), P("Protect rigging from sharp edges and avoid side loading or knotting.", "Sapanları keskin kenarlardan koruyun; yan yükleme veya düğümlemeyi önleyin.")],
  },
  {
    slug: "sling-inspection",
    title: P("Sling Inspection", "Sapan Kontrolü"),
    focus: P("pre-use inspection and rejection criteria for synthetic, wire-rope and chain slings", "sentetik, çelik halat ve zincir sapanlarda kullanım öncesi kontrol ve red kriterleri"),
    family: F,
    osha: ["OSHA 1926.251"],
    hazards: [P("Cuts, broken wires, stretched links or heat damage", "Kesik, kırık tel, uzamış bakla veya ısı hasarı"), P("Missing or unreadable identification and capacity marking", "Eksik veya okunamayan tanımlama ve kapasite etiketi")],
    controls: [P("Inspect each sling before use and remove defective rigging from service immediately.", "Her sapanı kullanım öncesi kontrol edin ve kusurlu ekipmanı derhal kullanımdan çıkarın."), P("Confirm leg configuration and working load limit are suitable for the planned lift.", "Sapan kolu konfigürasyonu ve güvenli çalışma yükünün planlanan kaldırmaya uygunluğunu doğrulayın.")],
  },
  {
    slug: "shackle-safety",
    title: P("Shackle Safety", "Kilit / Şakıl Güvenliği"),
    focus: P("selection, inspection and correct loading of shackles in rigging systems", "sapanlama sistemlerinde kilit/şakıl seçimi, kontrolü ve doğru yüklenmesi"),
    family: F,
    osha: ["OSHA 1926.251"],
    hazards: [P("Side loading, wrong pin type or cross-loading", "Yan yükleme, yanlış pim tipi veya çapraz yükleme"), P("Deformed body, damaged threads or incorrect capacity", "Deforme gövde, hasarlı diş veya yanlış kapasite")],
    controls: [P("Use a shackle with adequate marked capacity and correct pin arrangement for the connection.", "Bağlantı için yeterli işaretli kapasiteye ve doğru pim düzenine sahip kilit kullanın."), P("Align the load with the shackle body and avoid force on the pin that can unscrew or distort it.", "Yükü kilit gövdesiyle hizalayın; pimi gevşetebilecek veya deforme edebilecek yüklemeyi önleyin.")],
  },
  {
    slug: "chain-block-hoist-safety",
    title: P("Chain Block & Hoist Safety", "Caraskal ve Ceraskal Güvenliği"),
    focus: P("safe setup and use of manual chain blocks, lever hoists and similar lifting devices", "manuel caraskal, levyeli ceraskal ve benzeri kaldırma cihazlarının güvenli kurulumu ve kullanımı"),
    family: F,
    osha: ["OSHA 1910.179", "OSHA 1926.554"],
    hazards: [P("Suspension from an unsuitable support point", "Uygun olmayan taşıyıcı noktadan askıya alma"), P("Overloading, side pulling or damaged load chain", "Aşırı yükleme, yandan çekme veya hasarlı yük zinciri")],
    controls: [P("Verify the support structure and attachment point are suitable for the hoist and load.", "Taşıyıcı yapı ve bağlantı noktasının ceraskal ve yük için uygunluğunu doğrulayın."), P("Keep the load line straight, avoid side pulls and inspect hooks, chain and brake function before use.", "Yük hattını düz tutun, yandan çekmeyi önleyin; kullanım öncesi kanca, zincir ve fren fonksiyonunu kontrol edin.")],
  },
  {
    slug: "forklift-safety",
    title: P("Forklift Safety", "Forklift Güvenliği"),
    focus: P("safe operation of powered industrial trucks around pedestrians, loads and work areas", "yaya, yük ve çalışma alanları çevresinde motorlu endüstriyel araçların güvenli işletilmesi"),
    family: F,
    osha: ["OSHA 1910.178"],
    hazards: [P("Pedestrian struck-by and reversing collisions", "Yayaya çarpma ve geri manevra kazaları"), P("Tip-over from speed, turning, slope or elevated loads", "Hız, dönüş, eğim veya yükseltilmiş yük nedeniyle devrilme")],
    controls: [P("Use trained authorized operators and complete pre-use vehicle inspection.", "Eğitimli yetkili operatör kullanın ve kullanım öncesi araç kontrolünü tamamlayın."), P("Maintain clear travel routes, safe speed, visibility and pedestrian segregation.", "Açık güzergâh, güvenli hız, görüş ve yaya ayrımını koruyun.")],
  },
  {
    slug: "telehandler-safety",
    title: P("Telehandler Safety", "Telehandler Güvenliği"),
    focus: P("safe use of telescopic material handlers with changing reach, load and ground conditions", "değişen erişim, yük ve zemin koşullarında teleskopik yükleyicilerin güvenli kullanımı"),
    family: F,
    osha: ["OSHA 1926.602", "OSHA 1910.178"],
    hazards: [P("Reduced capacity as boom reach increases", "Bom erişimi arttıkça kapasitenin azalması"), P("Tip-over from uneven ground, slope or poor stabilizer setup", "Düzensiz zemin, eğim veya hatalı denge ayağı kurulumu nedeniyle devrilme")],
    controls: [P("Use the correct load chart for the machine configuration and attachment.", "Makine konfigürasyonu ve ataşman için doğru yük tablosunu kullanın."), P("Assess ground conditions, level the machine as required and keep people clear of the boom and load.", "Zemin koşullarını değerlendirin, gerektiğinde makineyi terazileyin ve kişileri bom/yükten uzak tutun.")],
  },
  {
    slug: "mobile-crane-setup",
    title: P("Mobile Crane Setup", "Mobil Vinç Kurulumu"),
    focus: P("ground bearing, outrigger setup, clearance and configuration before mobile-crane lifts", "mobil vinç kaldırmaları öncesi zemin taşıma, denge ayağı kurulumu, mesafe ve konfigürasyon"),
    family: F,
    osha: ["OSHA 1926 Subpart CC", "OSHA 1926.1402", "OSHA 1926.1404"],
    hazards: [P("Ground failure beneath outriggers or crawler tracks", "Denge ayağı veya palet altında zemin göçmesi"), P("Contact with power lines or nearby structures", "Enerji hattı veya yakın yapılara temas")],
    controls: [P("Evaluate setup area, ground support and underground conditions before positioning the crane.", "Vinci konumlandırmadan önce kurulum alanı, zemin desteği ve yeraltı koşullarını değerlendirin."), P("Set barricades, verify clearances and configure outriggers/boom exactly for the planned load chart.", "Bariyerleri kurun, açıklıkları doğrulayın ve denge ayağı/bomu planlanan yük tablosuna göre ayarlayın.")],
  },
  {
    slug: "lifting-plan-basics",
    title: P("Lifting Plan Basics", "Kaldırma Planı Temelleri"),
    focus: P("defining load, equipment, rigging, route, roles and controls before lifting", "kaldırma öncesi yük, ekipman, sapanlama, güzergâh, roller ve kontrollerin tanımlanması"),
    family: F,
    osha: ["OSHA 1926 Subpart CC", "OSHA 1926.251"],
    hazards: [P("Mismatch between actual load and planned equipment capacity", "Gerçek yük ile planlanan ekipman kapasitesinin uyuşmaması"), P("Unplanned obstacles, blind areas or changing lift path", "Plansız engel, kör alan veya değişen kaldırma güzergâhı")],
    controls: [P("Document load data, lift path, equipment configuration and rigging arrangement before execution.", "Uygulama öncesi yük bilgisi, güzergâh, ekipman konfigürasyonu ve sapanlama düzenini kayıt altına alın."), P("Brief roles, communication, exclusion zones and hold points with the lifting team.", "Kaldırma ekibiyle roller, iletişim, yasaklı bölgeler ve durdurma noktalarını paylaşın.")],
  },
  {
    slug: "banksman-signalman-safety",
    title: P("Banksman & Signal Person Safety", "İşaretçi ve Manevracı Güvenliği"),
    focus: P("clear signaling, positioning and line-of-fire control during lifting and vehicle movements", "kaldırma ve araç hareketlerinde net işaretleşme, doğru konumlanma ve ateş hattı kontrolü"),
    family: F,
    osha: ["OSHA 1926.1414", "OSHA 1926.1428"],
    hazards: [P("Conflicting signals or loss of visual/radio communication", "Çelişkili işaretler veya görsel/telsiz iletişimin kaybı"), P("Signal person positioned in the vehicle or load path", "İşaretçinin araç veya yük güzergâhında konumlanması")],
    controls: [P("Use one clearly designated qualified signal person and agreed signals.", "Net şekilde belirlenmiş yetkin tek işaretçi ve üzerinde anlaşılmış işaretleri kullanın."), P("Maintain a safe visible position outside the travel/load path and stop movement when communication is lost.", "Hareket/yük güzergâhı dışında güvenli ve görünür konumu koruyun; iletişim kaybolursa hareketi durdurun.")],
  },
  {
    slug: "suspended-load-exclusion-zones",
    title: P("Suspended Load Exclusion Zones", "Askıdaki Yük Yasaklı Bölgeleri"),
    focus: P("preventing people from entering suspended-load and lifting-equipment danger zones", "kişilerin askıdaki yük ve kaldırma ekipmanı tehlike bölgelerine girmesinin önlenmesi"),
    family: F,
    osha: ["OSHA 1926.1425", "OSHA 1926.1417"],
    hazards: [P("People passing beneath or beside suspended loads", "Kişilerin askıdaki yükün altından veya yanından geçmesi"), P("Unexpected load swing, rotation or rigging failure", "Beklenmeyen yük salınımı, dönmesi veya sapanlama arızası")],
    controls: [P("Define and physically mark the exclusion zone before lifting starts.", "Kaldırma başlamadan yasaklı bölgeyi tanımlayın ve fiziksel olarak işaretleyin."), P("Control access continuously and suspend the lift if unauthorized people enter the zone.", "Erişimi sürekli kontrol edin ve yetkisiz kişi bölgeye girerse kaldırmayı durdurun.")],
  },
];

export const generatedLiftingRiggingGuides = blueprints.map(buildGeneratedGuide);
