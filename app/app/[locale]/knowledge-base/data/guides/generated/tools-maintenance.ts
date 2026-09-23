import { buildGeneratedGuide, commonFamilies, type GuideBlueprint, type Pair } from "./factory";

const P = (en: string, tr: string): Pair => ({ en, tr });
const F = commonFamilies.tools;

const blueprints: GuideBlueprint[] = [
  {
    slug: "hand-tool-safety",
    title: P("Hand Tool Safety", "El Aleti Güvenliği"),
    focus: P("selection, inspection and safe use of non-powered hand tools", "enerjisiz el aletlerinin seçimi, kontrolü ve güvenli kullanımı"),
    family: F,
    osha: ["OSHA 1910.242", "OSHA 1926.301"],
    hazards: [P("Mushroomed striking heads, cracked handles or damaged jaws", "Mantarlaşmış vurma başı, çatlak sap veya hasarlı çene"), P("Using the wrong tool as a substitute for the required tool", "Gerekli alet yerine yanlış aleti kullanmak")],
    controls: [P("Inspect handles, heads, cutting edges and adjustment mechanisms before use.", "Kullanım öncesi sap, başlık, kesici kenar ve ayar mekanizmalarını kontrol edin."), P("Use the correct tool and body position so force is controlled away from the body.", "Doğru aleti ve kuvveti vücuttan uzağa yönlendiren çalışma pozisyonunu kullanın.")],
  },
  {
    slug: "power-tool-safety",
    title: P("Power Tool Safety", "Elektrikli ve Motorlu El Aletleri Güvenliği"),
    focus: P("safe inspection, guarding and operation of portable powered tools", "taşınabilir motorlu aletlerde güvenli kontrol, muhafaza ve kullanım"),
    family: F,
    osha: ["OSHA 1910.242", "OSHA 1926.302"],
    hazards: [P("Contact with rotating, reciprocating or cutting parts", "Dönen, ileri-geri hareketli veya kesici parçalarla temas"), P("Unexpected start caused by damaged triggers or unsafe connection", "Hasarlı tetik veya güvensiz bağlantı nedeniyle beklenmeyen çalışma")],
    controls: [P("Use guards, handles and safety devices exactly as intended by the tool design.", "Muhafaza, sap ve emniyet cihazlarını alet tasarımına uygun kullanın."), P("Disconnect or isolate the power source before changing accessories or clearing jams.", "Aksesuar değiştirme veya sıkışma giderme öncesi enerji kaynağını kesin veya izole edin.")],
  },
  {
    slug: "magnetic-drill-safety",
    title: P("Magnetic Drill Safety", "Manyetik Matkap Güvenliği"),
    focus: P("secure setup and controlled use of magnetic-base drilling machines", "manyetik tabanlı matkapların güvenli kurulumu ve kontrollü kullanımı"),
    family: F,
    osha: ["OSHA 1910.212", "OSHA 1910.242"],
    hazards: [P("Loss of magnetic adhesion from poor surface condition or power loss", "Kötü yüzey veya enerji kaybı nedeniyle manyetik tutunmanın kaybolması"), P("Entanglement with rotating cutter and swarf", "Dönen kesici ve talaşa dolanma")],
    controls: [P("Prepare a clean flat ferrous contact surface and use secondary restraint where falling is possible.", "Temiz, düz ferromanyetik temas yüzeyi hazırlayın; düşme ihtimalinde ikincil emniyet kullanın."), P("Keep hands, loose clothing and cables away from the rotating cutter and remove swarf safely.", "El, bol kıyafet ve kabloları dönen kesiciden uzak tutun; talaşı güvenli şekilde temizleyin.")],
  },
  {
    slug: "cutting-disc-safety",
    title: P("Cutting Disc Safety", "Kesme Diski Güvenliği"),
    focus: P("selection, mounting and use of abrasive cutting discs", "aşındırıcı kesme disklerinin seçimi, montajı ve kullanımı"),
    family: F,
    osha: ["OSHA 1910.215", "OSHA 1926.303"],
    hazards: [P("Disc burst from damage, overspeed or side loading", "Hasar, aşırı hız veya yan yükleme nedeniyle disk patlaması"), P("Sparks and fragments striking the operator or combustibles", "Kıvılcım ve parçaların operatöre veya yanıcılara çarpması")],
    controls: [P("Match disc type, diameter and speed rating to the tool and material.", "Disk tipi, çapı ve hız sınıfını alet ve malzemeye uygun seçin."), P("Use the correct guard and avoid twisting or side-loading the disc during the cut.", "Doğru muhafazayı kullanın; kesme sırasında diski bükmeyin veya yandan yüklemeyin.")],
  },
  {
    slug: "abrasive-wheel-inspection",
    title: P("Abrasive Wheel Inspection", "Aşındırıcı Disk Kontrolü"),
    focus: P("pre-use inspection, storage and mounting checks for abrasive wheels", "aşındırıcı disklerde kullanım öncesi kontrol, depolama ve montaj kontrolleri"),
    family: F,
    osha: ["OSHA 1910.215", "OSHA 1926.303"],
    hazards: [P("Cracks, moisture damage or impact damage not identified before use", "Kullanım öncesi fark edilmeyen çatlak, nem veya darbe hasarı"), P("Incorrect flange, blotter or mounting pressure", "Yanlış flanş, ara pul veya montaj basıncı")],
    controls: [P("Inspect each wheel for visible damage and verify markings before mounting.", "Her diski montajdan önce görünür hasar ve işaretleme açısından kontrol edin."), P("Store wheels to prevent impact, moisture and deformation and mount only with compatible hardware.", "Diskleri darbe, nem ve deformasyonu önleyecek şekilde saklayın; yalnız uyumlu donanımla monte edin.")],
  },
  {
    slug: "compressed-air-safety",
    title: P("Compressed Air Safety", "Basınçlı Hava Güvenliği"),
    focus: P("safe compressed-air use, hose control and cleaning practices", "basınçlı hava kullanımı, hortum kontrolü ve temizlik uygulamalarının güvenliği"),
    family: F,
    osha: ["OSHA 1910.242(b)"],
    hazards: [P("Air injection into skin or body openings", "Basınçlı havanın cilt veya vücut açıklıklarına girmesi"), P("Flying debris and uncontrolled hose movement", "Fırlayan parçacık ve kontrolsüz hortum hareketi")],
    controls: [P("Never direct compressed air at people or use it for clothing/body cleaning.", "Basınçlı havayı kişilere doğrultmayın veya kıyafet/vücut temizliği için kullanmayın."), P("Use pressure-reducing, chip-guarding and suitable nozzle controls for permitted cleaning tasks.", "İzin verilen temizlik işlerinde basınç düşürme, parçacık koruma ve uygun nozül kontrolleri kullanın.")],
  },
  {
    slug: "pressure-testing-safety",
    title: P("Pressure Testing Safety", "Basınç Testi Güvenliği"),
    focus: P("planning hydrostatic and pneumatic pressure tests with stored-energy controls", "hidrostatik ve pnömatik basınç testlerinin depolanmış enerji kontrolleriyle planlanması"),
    family: F,
    osha: ["OSHA 1910.169", "OSHA 1910.147"],
    hazards: [P("Stored-energy release from hose, fitting or component failure", "Hortum, bağlantı veya parça arızasında depolanmış enerji boşalması"), P("People entering the line of fire during pressurization", "Basınçlandırma sırasında kişilerin ateş hattına girmesi")],
    controls: [P("Use rated test equipment, calibrated instrumentation and a defined safe test pressure.", "Uygun kapasiteli test ekipmanı, kalibre enstrüman ve tanımlı güvenli test basıncı kullanın."), P("Establish an exclusion zone and pressurize in controlled stages while monitoring for abnormal conditions.", "Yasaklı bölge oluşturun ve anormal durumları izleyerek kontrollü kademelerle basınçlandırın.")],
  },
  {
    slug: "line-breaking-safety",
    title: P("Line Breaking Safety", "Hat Açma Güvenliği"),
    focus: P("safe opening of process piping and equipment that may contain pressure, temperature or hazardous material", "basınç, sıcaklık veya tehlikeli madde içerebilecek proses boru ve ekipmanlarının güvenli açılması"),
    family: F,
    osha: ["OSHA 1910.147", "OSHA 1910.119"],
    hazards: [P("Residual pressure or hazardous product trapped between isolations", "İzolasyonlar arasında kalmış basınç veya tehlikeli ürün"), P("Unexpected flow through leaking or incorrectly aligned valves", "Kaçıran veya yanlış hizalanmış vanalardan beklenmeyen akış")],
    controls: [P("Verify isolation, depressurization, draining and flushing before breaking containment.", "Kapalı sistemi açmadan izolasyon, basınç boşaltma, drenaj ve temizlemeyi doğrulayın."), P("Open connections cautiously from a protected position and control the first release point.", "Bağlantıyı korunaklı konumdan kontrollü açın ve ilk salım noktasını yönetin.")],
  },
];

export const generatedToolsMaintenanceGuides = blueprints.map(buildGeneratedGuide);
