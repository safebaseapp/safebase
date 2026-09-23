import { buildGeneratedGuide, commonFamilies, type GuideBlueprint, type Pair } from "./factory";

const P = (en: string, tr: string): Pair => ({ en, tr });
const F = commonFamilies.civil;

const blueprints: GuideBlueprint[] = [
  {
    slug: "trench-safety",
    title: P("Trench Safety", "Hendek Güvenliği"),
    focus: P("preventing cave-in, access and struck-by hazards in trench work", "hendek çalışmalarında göçük, erişim ve çarpma tehlikelerinin önlenmesi"),
    family: F,
    osha: ["OSHA 1926 Subpart P", "OSHA 1926.651", "OSHA 1926.652"],
    hazards: [P("Cave-in and soil collapse onto workers", "Toprak göçmesi ve çalışanların gömülmesi"), P("Unsafe access, water accumulation or falling material", "Güvensiz erişim, su birikmesi veya düşen malzeme")],
    controls: [P("Use the protective system required for soil and excavation conditions.", "Zemin ve kazı koşullarına uygun koruyucu sistemi kullanın."), P("Provide safe access and inspect the trench after rain, vibration or other changing conditions.", "Güvenli erişim sağlayın; yağış, titreşim veya değişen koşullar sonrası hendeği yeniden kontrol edin.")],
  },
  {
    slug: "shoring-shielding",
    title: P("Shoring & Shielding", "İksa ve Kalkanlama"),
    focus: P("selection, installation and inspection of excavation support and shielding systems", "kazı destek ve kalkan sistemlerinin seçimi, kurulumu ve kontrolü"),
    family: F,
    osha: ["OSHA 1926.652"],
    hazards: [P("Incorrect protective-system selection for soil or depth", "Zemin veya derinliğe uygun olmayan koruma sistemi seçimi"), P("Workers exposed while installing or removing support systems", "Destek sistemi kurulup sökülürken çalışan maruziyeti")],
    controls: [P("Use engineered or tabulated protective systems suitable for the excavation conditions.", "Kazı koşullarına uygun mühendislik veya tablolu koruyucu sistem kullanın."), P("Install and remove support systems in a sequence that minimizes worker exposure.", "Destek sistemlerini çalışan maruziyetini en aza indirecek sırayla kurun ve sökün.")],
  },
  {
    slug: "excavation-access-egress",
    title: P("Excavation Access & Egress", "Kazıda Güvenli Giriş ve Çıkış"),
    focus: P("safe ladders, ramps and routes for entering and leaving excavations", "kazılara giriş ve çıkışta güvenli merdiven, rampa ve güzergâh kullanımı"),
    family: F,
    osha: ["OSHA 1926.651(c)"],
    hazards: [P("Climbing unstable faces or improvised access points", "Dengesiz yüzeylerden veya uygunsuz noktalardan giriş çıkış"), P("Access blocked by spoil, equipment or water", "Giriş yolunun hafriyat, ekipman veya suyla kapanması")],
    controls: [P("Provide a stable, unobstructed means of access appropriate to the excavation.", "Kazıya uygun, sağlam ve engelsiz bir giriş-çıkış yöntemi sağlayın."), P("Keep access points protected from equipment movement and falling material.", "Giriş noktalarını ekipman hareketi ve düşen malzemeden koruyun.")],
  },
  {
    slug: "underground-services-detection",
    title: P("Underground Services Detection", "Yeraltı Hatlarının Tespiti"),
    focus: P("locating and protecting buried electrical, gas, water and process services before excavation", "kazı öncesi gömülü elektrik, gaz, su ve proses hatlarının tespit ve korunması"),
    family: F,
    osha: ["OSHA 1926.651(b)"],
    hazards: [P("Striking energized electrical cables or pressurized lines", "Enerjili kablo veya basınçlı hatta zarar verme"), P("Outdated drawings or incorrect service marking", "Güncel olmayan çizimler veya yanlış hat işaretlemesi")],
    controls: [P("Review available records and use suitable locating methods before mechanical excavation.", "Mekanik kazı öncesi mevcut kayıtları inceleyin ve uygun tespit yöntemleri kullanın."), P("Expose uncertain services cautiously and maintain required clearances and protection.", "Şüpheli hatları kontrollü şekilde açığa çıkarın; gerekli mesafe ve korumayı sürdürün.")],
  },
  {
    slug: "spoil-pile-management",
    title: P("Spoil Pile Management", "Hafriyat Yığını Yönetimi"),
    focus: P("controlling excavated material, surcharge loads and falling material near excavation edges", "kazı kenarlarında hafriyat malzemesi, ek yük ve düşen malzeme kontrolü"),
    family: F,
    osha: ["OSHA 1926.651(j)"],
    hazards: [P("Spoil surcharge increasing collapse pressure", "Hafriyat ek yükünün göçme basıncını artırması"), P("Material rolling or falling back into the excavation", "Malzemenin kazı içine yuvarlanması veya düşmesi")],
    controls: [P("Keep spoil and equipment back from the excavation edge or use retaining controls.", "Hafriyat ve ekipmanı kazı kenarından uzakta tutun veya tutucu önlem kullanın."), P("Maintain stable pile geometry and clear access/egress routes.", "Hafriyat yığınını stabil tutun ve giriş-çıkış yollarını açık bırakın.")],
  },
  {
    slug: "scaffold-inspection",
    title: P("Scaffold Inspection", "İskele Kontrolü"),
    focus: P("competent-person inspection of scaffold foundations, structure, access and fall protection", "iskele temel, yapı, erişim ve düşme korumasının yetkin kişi tarafından kontrolü"),
    family: F,
    osha: ["OSHA 1926.451", "OSHA 1926.454"],
    hazards: [P("Missing braces, guardrails, planks or access components", "Eksik çapraz, korkuluk, platform veya erişim elemanları"), P("Settlement, unauthorized alteration or overloading", "Oturma, yetkisiz değişiklik veya aşırı yükleme")],
    controls: [P("Inspect before each work shift and after events that could affect structural integrity.", "Her vardiya öncesi ve yapısal bütünlüğü etkileyebilecek olaylardan sonra kontrol edin."), P("Remove access when critical defects, incomplete erection or unauthorized changes are found.", "Kritik kusur, tamamlanmamış kurulum veya yetkisiz değişiklik tespitinde erişimi kapatın.")],
  },
  {
    slug: "scaffold-tagging-systems",
    title: P("Scaffold Tagging Systems", "İskele Etiketleme Sistemleri"),
    focus: P("using scaffold status tags as communication without replacing physical inspection", "iskele durum etiketlerinin fiziksel kontrolün yerine geçmeden iletişim aracı olarak kullanılması"),
    family: F,
    osha: ["OSHA 1926.451", "OSHA 1926.454"],
    hazards: [P("Workers treating an old tag as proof the scaffold is still safe", "Çalışanların eski etiketi iskelenin hâlâ güvenli olduğunun kanıtı sayması"), P("Tag status not matching actual scaffold condition", "Etiket durumunun gerçek iskele koşuluyla uyuşmaması")],
    controls: [P("Use tags only after the required competent-person inspection and keep status current.", "Etiketi yalnız gerekli yetkin kişi kontrolünden sonra kullanın ve durumu güncel tutun."), P("Physically prevent use when the scaffold is incomplete, unsafe or under modification.", "İskele eksik, güvensiz veya değişiklik altındaysa kullanımı fiziksel olarak engelleyin.")],
  },
  {
    slug: "mobile-scaffold-towers",
    title: P("Mobile Scaffold Tower Safety", "Mobil İskele Kulesi Güvenliği"),
    focus: P("setup, locking, access and movement control for mobile scaffold towers", "mobil iskele kulelerinde kurulum, kilitleme, erişim ve hareket kontrolü"),
    family: F,
    osha: ["OSHA 1926.452(w)"],
    hazards: [P("Tower movement while occupied or with unlocked casters", "Kule üzerinde kişi varken hareket veya teker kilitlerinin açık olması"), P("Instability from height, slope or missing bracing", "Yükseklik, eğim veya eksik çapraz nedeniyle dengesizlik")],
    controls: [P("Use level firm surfaces, required bracing and locked casters during work.", "Çalışma sırasında düz ve sağlam zemin, gerekli çaprazlar ve kilitli tekerler kullanın."), P("Move the tower only under the approved method and keep people/material controlled during relocation.", "Kuleyi yalnız onaylı yöntemle taşıyın; taşıma sırasında kişi ve malzemeyi kontrol altında tutun.")],
  },
];

export const generatedCivilScaffoldGuides = blueprints.map(buildGeneratedGuide);
