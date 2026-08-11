import type { RiskLibraryActivity } from "./pack-01";

export const riskLibraryPack04: RiskLibraryActivity[] = [
  {
    id: "roof-maintenance",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Çatı Bakımı", en: "Roof Maintenance" },
    items: [
      {
        hazard: { tr: "Çatı kenarından düşme", en: "Fall from roof edge" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Kenar koruması, güvenli erişim ve uygun düşüş koruması", en: "Edge protection, safe access and suitable fall protection" },
        additionalControls: { tr: "İşe başlamadan önce çatı açıklıklarını ve kırılgan alanları kontrol et", en: "Inspect roof openings and fragile areas before work begins" },
      },
      {
        hazard: { tr: "Kırılgan çatı yüzeyi", en: "Fragile roof surface" },
        consequence: { tr: "Çatıdan geçerek düşme", en: "Fall through roof surface" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kırılgan alan işaretleme ve güvenli yürüyüş platformu", en: "Fragile-area identification and safe walkways" },
        additionalControls: { tr: "Kırılgan yüzeylere doğrudan basılmasını fiziksel olarak engelle", en: "Physically prevent direct access onto fragile surfaces" },
      },
      {
        hazard: { tr: "Olumsuz hava koşulları", en: "Adverse weather" },
        consequence: { tr: "Denge kaybı veya malzeme düşmesi", en: "Loss of balance or dropped material" },
        personsAtRisk: { tr: "Çatı çalışanları ve alt seviyedeki personel", en: "Roof workers and personnel below" },
        existingControls: { tr: "Hava ve rüzgar takibi", en: "Weather and wind monitoring" },
        additionalControls: { tr: "Güvensiz koşullarda çalışmayı durdur", en: "Stop work in unsafe conditions" },
      },
    ],
  },

  {
    id: "mewp-inspection",
    category: { tr: "Mobil Ekipman", en: "Mobile Equipment" },
    activity: { tr: "MEWP Kontrolü", en: "MEWP Inspection" },
    items: [
      {
        hazard: { tr: "Arızalı güvenlik sistemi", en: "Defective safety system" },
        consequence: { tr: "Kontrol kaybı veya düşme", en: "Loss of control or fall" },
        personsAtRisk: { tr: "Operatör ve kullanıcılar", en: "Operator and occupants" },
        existingControls: { tr: "Pre-use kontrol ve üretici checklisti", en: "Pre-use inspection and manufacturer checklist" },
        additionalControls: { tr: "Güvenliği etkileyen arızalarda ekipmanı kullanım dışı bırak", en: "Remove equipment from service for safety-critical defects" },
      },
      {
        hazard: { tr: "Hasarlı korkuluk veya giriş kapısı", en: "Damaged guardrail or gate" },
        consequence: { tr: "Platformdan düşme", en: "Fall from platform" },
        personsAtRisk: { tr: "Platform kullanıcıları", en: "Platform occupants" },
        existingControls: { tr: "Korkuluk ve gate kontrolü", en: "Guardrail and gate inspection" },
        additionalControls: { tr: "Hasarlı koruma sistemiyle kullanım yapılmasını engelle", en: "Prevent use with damaged protective systems" },
      },
      {
        hazard: { tr: "Lastik, stabilizer veya zemin temas problemi", en: "Tyre, stabilizer or ground-contact defect" },
        consequence: { tr: "Devrilme", en: "Overturn" },
        personsAtRisk: { tr: "Operatör ve çevredeki personel", en: "Operator and nearby personnel" },
        existingControls: { tr: "Görsel kontrol ve zemin değerlendirmesi", en: "Visual inspection and ground assessment" },
        additionalControls: { tr: "Kullanım öncesi tüm stabilite bileşenlerini doğrula", en: "Verify all stability components before use" },
      },
    ],
  },

  {
    id: "mobile-equipment-inspection",
    category: { tr: "Mobil Ekipman", en: "Mobile Equipment" },
    activity: { tr: "Mobil Ekipman Günlük Kontrolü", en: "Mobile Equipment Daily Inspection" },
    items: [
      {
        hazard: { tr: "Fren veya direksiyon arızası", en: "Brake or steering defect" },
        consequence: { tr: "Kontrol kaybı ve çarpışma", en: "Loss of control and collision" },
        personsAtRisk: { tr: "Operatörler ve çevredeki çalışanlar", en: "Operators and nearby workers" },
        existingControls: { tr: "Pre-start checklist", en: "Pre-start checklist" },
        additionalControls: { tr: "Güvenlik kritik arızalarda ekipmanı izole et", en: "Isolate equipment for safety-critical defects" },
      },
      {
        hazard: { tr: "Alarm veya ışıkların çalışmaması", en: "Alarm or lighting failure" },
        consequence: { tr: "Çarpışma veya yaya riski", en: "Collision or pedestrian risk" },
        personsAtRisk: { tr: "Yayalar ve operatörler", en: "Pedestrians and operators" },
        existingControls: { tr: "Geri vites alarmı ve ışık kontrolü", en: "Reverse alarm and lighting inspection" },
        additionalControls: { tr: "Arızalı ikaz sistemleriyle çalışmayı engelle", en: "Prevent operation with defective warning systems" },
      },
      {
        hazard: { tr: "Sızıntı veya mekanik hasar", en: "Leak or mechanical damage" },
        consequence: { tr: "Yangın, kayma veya ekipman arızası", en: "Fire, slip or equipment failure" },
        personsAtRisk: { tr: "Operatör ve saha çalışanları", en: "Operator and site workers" },
        existingControls: { tr: "Görsel kontrol ve bakım bildirim sistemi", en: "Visual inspection and maintenance reporting" },
        additionalControls: { tr: "Aktif sızıntı veya ciddi mekanik hasarda kullanım yapma", en: "Do not operate with active leaks or serious mechanical damage" },
      },
    ],
  },

  {
    id: "excavator-operation",
    category: { tr: "Mobil Ekipman", en: "Mobile Equipment" },
    activity: { tr: "Ekskavatör Operasyonu", en: "Excavator Operation" },
    items: [
      {
        hazard: { tr: "Dönüş yarıçapında personel", en: "Personnel in swing radius" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Yayalar ve saha çalışanları", en: "Pedestrians and site workers" },
        existingControls: { tr: "Dışlama alanı, spotter ve kontrollü hareket", en: "Exclusion zone, spotter and controlled movement" },
        additionalControls: { tr: "Dönüş alanına izinsiz girişleri fiziksel olarak engelle", en: "Physically prevent unauthorized entry into the swing radius" },
      },
      {
        hazard: { tr: "Kazı kenarında devrilme", en: "Overturn near excavation edge" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Operatör ve yakın personel", en: "Operator and nearby personnel" },
        existingControls: { tr: "Güvenli mesafe ve zemin değerlendirmesi", en: "Safe distance and ground assessment" },
        additionalControls: { tr: "Kazı kenarına yaklaşma sınırını saha planında belirt", en: "Define approach limits to excavation edges in the site plan" },
      },
      {
        hazard: { tr: "Yeraltı hattına hasar", en: "Damage to underground service" },
        consequence: { tr: "Elektrik çarpması, yangın veya gaz kaçağı", en: "Electric shock, fire or gas release" },
        personsAtRisk: { tr: "Operatör ve kazı ekibi", en: "Operator and excavation crew" },
        existingControls: { tr: "Utility survey ve permit", en: "Utility survey and permit" },
        additionalControls: { tr: "Kritik hat yakınında spotter ve kontrollü kazı uygula", en: "Use a spotter and controlled excavation near critical utilities" },
      },
    ],
  },

  {
    id: "loader-operation",
    category: { tr: "Mobil Ekipman", en: "Mobile Equipment" },
    activity: { tr: "Loader Operasyonu", en: "Loader Operation" },
    items: [
      {
        hazard: { tr: "Yaya ile çarpışma", en: "Pedestrian collision" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Yayalar", en: "Pedestrians" },
        existingControls: { tr: "Trafik yolları, korna ve spotter gerektiğinde", en: "Traffic routes, horn and spotter where required" },
        additionalControls: { tr: "Kör noktaları azaltacak çalışma düzeni kur", en: "Arrange work to minimize blind spots" },
      },
      {
        hazard: { tr: "Yüksek kaldırılmış bucket ile seyir", en: "Travel with raised bucket" },
        consequence: { tr: "Devrilme veya görüş kaybı", en: "Overturn or loss of visibility" },
        personsAtRisk: { tr: "Operatör ve çevredeki personel", en: "Operator and nearby personnel" },
        existingControls: { tr: "Düşük taşıma yüksekliği", en: "Low travel position" },
        additionalControls: { tr: "Seyir sırasında bucket'ı güvenli seviyede tut", en: "Keep bucket at a safe travel height" },
      },
      {
        hazard: { tr: "Yığının çökmesi", en: "Material pile collapse" },
        consequence: { tr: "Ekipman gömülmesi veya devrilme", en: "Equipment engulfment or overturn" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Güvenli yükleme yöntemi", en: "Safe loading method" },
        additionalControls: { tr: "Dengesiz yığın yüzeylerinden uzak dur", en: "Avoid unstable pile faces" },
      },
    ],
  },

  {
    id: "telehandler-operation",
    category: { tr: "Mobil Ekipman", en: "Mobile Equipment" },
    activity: { tr: "Telehandler Operasyonu", en: "Telehandler Operation" },
    items: [
      {
        hazard: { tr: "Yük dengesizliği", en: "Unstable load" },
        consequence: { tr: "Yük düşmesi veya devrilme", en: "Dropped load or overturn" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Load chart ve uygun attachment", en: "Load chart and suitable attachment" },
        additionalControls: { tr: "Yük merkezi ve boom uzamasını kapasiteye göre doğrula", en: "Verify load center and boom extension against capacity" },
      },
      {
        hazard: { tr: "Yaya ile çarpışma", en: "Pedestrian collision" },
        consequence: { tr: "Ezilme", en: "Crushing injury" },
        personsAtRisk: { tr: "Yayalar", en: "Pedestrians" },
        existingControls: { tr: "Ayrılmış trafik rotası ve spotter gerektiğinde", en: "Segregated routes and spotter where required" },
        additionalControls: { tr: "Kör noktalarda ekstra kontrol uygula", en: "Apply extra controls in blind areas" },
      },
      {
        hazard: { tr: "Eğimli zeminde devrilme", en: "Overturn on slope" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Eğim limitleri ve güvenli seyir", en: "Slope limits and safe travel" },
        additionalControls: { tr: "Üretici eğim limitlerini aşma", en: "Do not exceed manufacturer slope limits" },
      },
    ],
  },

  {
    id: "vehicle-reversing",
    category: { tr: "Trafik", en: "Traffic" },
    activity: { tr: "Araç Geri Manevrası", en: "Vehicle Reversing" },
    items: [
      {
        hazard: { tr: "Yayaya çarpma", en: "Striking pedestrian" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Yayalar", en: "Pedestrians" },
        existingControls: { tr: "Alarm, kamera ve spotter gerektiğinde", en: "Alarm, camera and spotter where required" },
        additionalControls: { tr: "Geri manevrayı mümkün olduğunca ortadan kaldır", en: "Eliminate reversing where practicable" },
      },
      {
        hazard: { tr: "Kör nokta", en: "Blind spot" },
        consequence: { tr: "Çarpışma", en: "Collision" },
        personsAtRisk: { tr: "Sürücüler ve yayalar", en: "Drivers and pedestrians" },
        existingControls: { tr: "Ayna ve kamera", en: "Mirrors and cameras" },
        additionalControls: { tr: "Görüş yoksa hareketi durdur", en: "Stop movement if visibility is inadequate" },
      },
      {
        hazard: { tr: "Spotter ile iletişim kaybı", en: "Loss of spotter communication" },
        consequence: { tr: "Kontrolsüz araç hareketi", en: "Uncontrolled vehicle movement" },
        personsAtRisk: { tr: "Spotter ve çevredeki çalışanlar", en: "Spotter and nearby workers" },
        existingControls: { tr: "Standart sinyal sistemi", en: "Standard signalling system" },
        additionalControls: { tr: "İletişim kesilirse aracı durdur", en: "Stop the vehicle if communication is lost" },
      },
    ],
  },

  {
    id: "loading-unloading",
    category: { tr: "Lojistik", en: "Logistics" },
    activity: { tr: "Yükleme / Boşaltma", en: "Loading / Unloading" },
    items: [
      {
        hazard: { tr: "Yükün düşmesi", en: "Falling load" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Yükleme ekibi", en: "Loading crew" },
        existingControls: { tr: "Uygun rigging ve dışlama alanı", en: "Suitable rigging and exclusion zone" },
        additionalControls: { tr: "Yük altında personel bulunmasını engelle", en: "Keep personnel clear of suspended loads" },
      },
      {
        hazard: { tr: "Araç hareketi", en: "Vehicle movement" },
        consequence: { tr: "Çarpışma veya ezilme", en: "Collision or crushing" },
        personsAtRisk: { tr: "Yükleme çalışanları", en: "Loading personnel" },
        existingControls: { tr: "Teker takozu ve araç park kontrolü", en: "Wheel chocks and vehicle parking control" },
        additionalControls: { tr: "Yükleme sırasında aracın hareket etmesini engelle", en: "Prevent vehicle movement during loading" },
      },
      {
        hazard: { tr: "Dengesiz yük istifi", en: "Unstable load stack" },
        consequence: { tr: "Malzeme devrilmesi", en: "Material collapse" },
        personsAtRisk: { tr: "Lojistik çalışanları", en: "Logistics workers" },
        existingControls: { tr: "Güvenli istif yöntemi", en: "Safe stacking method" },
        additionalControls: { tr: "Yük bağlarını serbest bırakmadan önce stabiliteyi doğrula", en: "Verify stability before releasing load restraints" },
      },
    ],
  },

  {
    id: "material-storage",
    category: { tr: "Lojistik", en: "Logistics" },
    activity: { tr: "Malzeme Depolama", en: "Material Storage" },
    items: [
      {
        hazard: { tr: "İstif devrilmesi", en: "Stack collapse" },
        consequence: { tr: "Ezilme veya malzeme hasarı", en: "Crushing or material damage" },
        personsAtRisk: { tr: "Depo ve saha çalışanları", en: "Warehouse and site workers" },
        existingControls: { tr: "Uygun istif yüksekliği ve stabil zemin", en: "Suitable stack height and stable ground" },
        additionalControls: { tr: "Uzun veya düzensiz malzemeleri ayrıca sabitle", en: "Secure long or irregular materials separately" },
      },
      {
        hazard: { tr: "Geçiş yollarının kapanması", en: "Blocked access routes" },
        consequence: { tr: "Takılma veya acil kaçışın engellenmesi", en: "Trip or blocked emergency escape" },
        personsAtRisk: { tr: "Tüm çalışanlar", en: "All workers" },
        existingControls: { tr: "Belirlenmiş depolama alanları", en: "Designated storage areas" },
        additionalControls: { tr: "Kaçış ve yaya yollarını daima açık tut", en: "Keep emergency and pedestrian routes clear" },
      },
      {
        hazard: { tr: "Ağır malzemenin elle alınması", en: "Manual handling of heavy material" },
        consequence: { tr: "Kas-iskelet yaralanması", en: "Musculoskeletal injury" },
        personsAtRisk: { tr: "Depo çalışanları", en: "Warehouse workers" },
        existingControls: { tr: "Mekanik taşıma ekipmanı", en: "Mechanical handling equipment" },
        additionalControls: { tr: "Ağır ürünleri ergonomik erişim seviyesinde depola", en: "Store heavy items at ergonomic handling heights" },
      },
    ],
  },

  {
    id: "steel-plate-handling",
    category: { tr: "Malzeme Elleçleme", en: "Material Handling" },
    activity: { tr: "Çelik Plaka Elleçleme", en: "Steel Plate Handling" },
    items: [
      {
        hazard: { tr: "Plakanın düşmesi", en: "Dropped steel plate" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Rigging ve montaj ekibi", en: "Rigging and installation crew" },
        existingControls: { tr: "Uygun lifting clamp veya rigging yöntemi", en: "Suitable lifting clamps or rigging method" },
        additionalControls: { tr: "Plaka ağırlığını ve lifting point uygunluğunu doğrula", en: "Verify plate weight and lifting-point suitability" },
      },
      {
        hazard: { tr: "Keskin kenarlar", en: "Sharp edges" },
        consequence: { tr: "Kesilme", en: "Laceration" },
        personsAtRisk: { tr: "Malzeme çalışanları", en: "Material handlers" },
        existingControls: { tr: "Uygun el koruması", en: "Suitable hand protection" },
        additionalControls: { tr: "Keskin kenarları güvenli elleçleme yönüne göre planla", en: "Plan handling to control sharp edges" },
      },
      {
        hazard: { tr: "Dikey plakanın devrilmesi", en: "Vertical plate tipping" },
        consequence: { tr: "Ezilme", en: "Crushing injury" },
        personsAtRisk: { tr: "Yakın çalışanlar", en: "Nearby workers" },
        existingControls: { tr: "Uygun rack veya destek", en: "Suitable racks or supports" },
        additionalControls: { tr: "Desteksiz plaka bırakma", en: "Do not leave plates unsupported" },
      },
    ],
  },

  {
    id: "cylinder-loading-unloading",
    category: { tr: "Gaz Tüpleri", en: "Gas Cylinders" },
    activity: { tr: "Gaz Tüpü Yükleme / Boşaltma", en: "Cylinder Loading / Unloading" },
    items: [
      {
        hazard: { tr: "Tüp düşmesi", en: "Cylinder drop" },
        consequence: { tr: "Ezilme veya vana hasarı", en: "Crushing or valve damage" },
        personsAtRisk: { tr: "Lojistik çalışanları", en: "Logistics workers" },
        existingControls: { tr: "Kontrollü elleçleme ve tüp arabası", en: "Controlled handling and cylinder trolley" },
        additionalControls: { tr: "Tüpleri atma veya yuvarlama", en: "Do not throw or roll cylinders" },
      },
      {
        hazard: { tr: "Tüplerin araçta sabitlenmemesi", en: "Unsecured cylinders on vehicle" },
        consequence: { tr: "Devrilme veya yüksek basınçlı salım", en: "Tipping or high-pressure release" },
        personsAtRisk: { tr: "Sürücü ve yükleme ekibi", en: "Driver and loading crew" },
        existingControls: { tr: "Uygun restraint sistemi", en: "Suitable restraint system" },
        additionalControls: { tr: "Taşıma öncesi tüm tüplerin sabitliğini kontrol et", en: "Verify all cylinders are secured before transport" },
      },
      {
        hazard: { tr: "Yanlış gazların birlikte taşınması", en: "Incompatible gases transported together" },
        consequence: { tr: "Yangın veya reaksiyon", en: "Fire or reaction" },
        personsAtRisk: { tr: "Lojistik çalışanları", en: "Logistics workers" },
        existingControls: { tr: "Gaz sınıfına göre ayırma", en: "Segregation by gas type" },
        additionalControls: { tr: "Uyumluluk gerekliliklerini yükleme öncesi kontrol et", en: "Verify compatibility requirements before loading" },
      },
    ],
  },

  {
    id: "core-drilling",
    category: { tr: "İnşaat", en: "Construction" },
    activity: { tr: "Core Drilling", en: "Core Drilling" },
    items: [
      {
        hazard: { tr: "Gizli elektrik veya proses hattına temas", en: "Contact with hidden electrical or process service" },
        consequence: { tr: "Elektrik çarpması veya proses salımı", en: "Electric shock or process release" },
        personsAtRisk: { tr: "Drilling operatörü", en: "Drilling operator" },
        existingControls: { tr: "Çizim ve servis taraması", en: "Drawing review and service scanning" },
        additionalControls: { tr: "Delme noktası için resmi clearance doğrula", en: "Verify formal clearance for the drilling location" },
      },
      {
        hazard: { tr: "Dönen ekipmana temas", en: "Contact with rotating equipment" },
        consequence: { tr: "Sıkışma veya kesilme", en: "Entanglement or laceration" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Uygun ekipman ve güvenli çalışma yöntemi", en: "Suitable equipment and safe-work method" },
        additionalControls: { tr: "Bol kıyafet ve gevşek malzemeleri uzak tut", en: "Keep loose clothing and materials away" },
      },
      {
        hazard: { tr: "Core parçasının alt seviyeye düşmesi", en: "Core dropping to lower level" },
        consequence: { tr: "Çarpma veya yaralanma", en: "Struck-by injury" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Workers below" },
        existingControls: { tr: "Alt alan izolasyonu", en: "Exclusion zone below" },
        additionalControls: { tr: "Core parçasını kontrollü şekilde yakala veya destekle", en: "Capture or support the core in a controlled manner" },
      },
    ],
  },

  {
    id: "concrete-cutting",
    category: { tr: "İnşaat", en: "Construction" },
    activity: { tr: "Beton Kesme", en: "Concrete Cutting" },
    items: [
      {
        hazard: { tr: "Silika içeren toz", en: "Silica-containing dust" },
        consequence: { tr: "Ciddi solunum sistemi etkileri", en: "Serious respiratory effects" },
        personsAtRisk: { tr: "Kesim operatörü ve yakın çalışanlar", en: "Cutting operator and nearby workers" },
        existingControls: { tr: "Islak kesim veya uygun toz kontrolü", en: "Wet cutting or suitable dust control" },
        additionalControls: { tr: "Maruziyet yöntemini kullanılan malzemeye göre doğrula", en: "Verify exposure controls according to material and method" },
      },
      {
        hazard: { tr: "Kesici disk ile temas", en: "Contact with cutting blade" },
        consequence: { tr: "Ciddi kesilme", en: "Severe laceration" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Muhafaza ve eğitimli operatör", en: "Guarding and trained operator" },
        additionalControls: { tr: "Ekipman tamamen durmadan müdahale etme", en: "Do not intervene until equipment has fully stopped" },
      },
      {
        hazard: { tr: "Gizli hat veya donatı", en: "Hidden services or reinforcement" },
        consequence: { tr: "Elektrik/proses riski veya ekipman kickback", en: "Electrical/process hazard or tool kickback" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Tarama ve çizim kontrolü", en: "Scanning and drawing review" },
        additionalControls: { tr: "Kesim hattını iş başlamadan doğrula", en: "Verify the cutting line before work" },
      },
    ],
  },

  {
    id: "wall-floor-penetration",
    category: { tr: "İnşaat", en: "Construction" },
    activity: { tr: "Duvar / Zemin Penetrasyonu", en: "Wall / Floor Penetration" },
    items: [
      {
        hazard: { tr: "Gizli servis hattına temas", en: "Contact with hidden service" },
        consequence: { tr: "Elektrik çarpması, su/gaz/proses salımı", en: "Electric shock or water/gas/process release" },
        personsAtRisk: { tr: "Çalışma ekibi", en: "Work crew" },
        existingControls: { tr: "Çizim, tarama ve permit", en: "Drawings, scanning and permit" },
        additionalControls: { tr: "Penetrasyon noktasını yetkili kişi ile sahada doğrula", en: "Field-verify penetration point with an authorized person" },
      },
      {
        hazard: { tr: "Alt seviyeye parça düşmesi", en: "Debris falling to lower level" },
        consequence: { tr: "Çarpma yaralanması", en: "Struck-by injury" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Workers below" },
        existingControls: { tr: "Alt alan bariyeri", en: "Exclusion zone below" },
        additionalControls: { tr: "Kesilen parçaları kontrollü şekilde destekle", en: "Support cut sections in a controlled manner" },
      },
      {
        hazard: { tr: "Yeni açıklıktan düşme", en: "Fall through new opening" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site workers" },
        existingControls: { tr: "Açıklık koruma planı", en: "Opening-protection plan" },
        additionalControls: { tr: "Penetrasyon oluşur oluşmaz uygun korkuluk veya kapak tak", en: "Install suitable guardrails or covers immediately after opening is created" },
      },
    ],
  },

  {
    id: "surface-preparation",
    category: { tr: "Yüzey Hazırlama", en: "Surface Preparation" },
    activity: { tr: "Yüzey Hazırlama", en: "Surface Preparation" },
    items: [
      {
        hazard: { tr: "Toz ve partikül", en: "Dust and particulates" },
        consequence: { tr: "Göz veya solunum maruziyeti", en: "Eye or respiratory exposure" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Toz kontrolü ve uygun KKD", en: "Dust control and suitable PPE" },
        additionalControls: { tr: "Malzeme türüne göre maruziyet riskini değerlendir", en: "Assess exposure risk according to material type" },
      },
      {
        hazard: { tr: "Keskin yüzey", en: "Sharp surface" },
        consequence: { tr: "Kesilme", en: "Laceration" },
        personsAtRisk: { tr: "Yüzey hazırlama çalışanları", en: "Surface-preparation workers" },
        existingControls: { tr: "Uygun eldiven", en: "Suitable gloves" },
        additionalControls: { tr: "Keskin kenarları kontrollü yöntemle gider", en: "Remove sharp edges using a controlled method" },
      },
      {
        hazard: { tr: "Gürültü", en: "Noise" },
        consequence: { tr: "İşitme hasarı", en: "Hearing damage" },
        personsAtRisk: { tr: "Operatör ve çevre çalışanları", en: "Operator and nearby workers" },
        existingControls: { tr: "İşitme koruması", en: "Hearing protection" },
        additionalControls: { tr: "Gürültülü alanı sınırla ve gereksiz personeli uzaklaştır", en: "Restrict noisy areas and remove non-essential personnel" },
      },
    ],
  },

  {
    id: "solvent-cleaning",
    category: { tr: "Kimyasal", en: "Chemical" },
    activity: { tr: "Solvent ile Temizlik", en: "Solvent Cleaning" },
    items: [
      {
        hazard: { tr: "Solvent buharı", en: "Solvent vapour" },
        consequence: { tr: "Baş dönmesi veya solunum etkisi", en: "Dizziness or respiratory effects" },
        personsAtRisk: { tr: "Temizlik çalışanları", en: "Cleaning workers" },
        existingControls: { tr: "Havalandırma ve SDS", en: "Ventilation and SDS" },
        additionalControls: { tr: "Kapalı alanlarda özel atmosfer değerlendirmesi yap", en: "Conduct specific atmosphere assessment in enclosed areas" },
      },
      {
        hazard: { tr: "Cilt teması", en: "Skin contact" },
        consequence: { tr: "Tahriş veya dermatit", en: "Irritation or dermatitis" },
        personsAtRisk: { tr: "Temizlik personeli", en: "Cleaning personnel" },
        existingControls: { tr: "Kimyasala uygun eldiven", en: "Chemical-compatible gloves" },
        additionalControls: { tr: "Eldiven materyal uyumluluğunu ürüne göre doğrula", en: "Verify glove compatibility with the product" },
      },
      {
        hazard: { tr: "Yanıcılık", en: "Flammability" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Çalışma alanındaki personel", en: "Personnel in work area" },
        existingControls: { tr: "Ateşleme kaynaklarının kontrolü", en: "Ignition-source control" },
        additionalControls: { tr: "Çalışma alanındaki solvent miktarını minimumda tut", en: "Minimize solvent quantity in the work area" },
      },
    ],
  },

  {
    id: "leak-testing",
    category: { tr: "Basınçlı Sistem", en: "Pressure Systems" },
    activity: { tr: "Kaçak Testi", en: "Leak Testing" },
    items: [
      {
        hazard: { tr: "Basınçlı akışkan salımı", en: "Pressurized fluid release" },
        consequence: { tr: "Çarpma veya enjeksiyon yaralanması", en: "Impact or injection injury" },
        personsAtRisk: { tr: "Test ekibi", en: "Test team" },
        existingControls: { tr: "Kontrollü test basıncı ve dışlama alanı", en: "Controlled test pressure and exclusion zone" },
        additionalControls: { tr: "Kaçak aramak için el veya vücut kullanma", en: "Never use hands or body to locate a leak" },
      },
      {
        hazard: { tr: "Tehlikeli test gazı veya akışkan", en: "Hazardous test gas or fluid" },
        consequence: { tr: "Maruziyet veya boğulma", en: "Exposure or asphyxiation" },
        personsAtRisk: { tr: "Test personeli", en: "Test personnel" },
        existingControls: { tr: "Uygun test medyası ve havalandırma", en: "Suitable test medium and ventilation" },
        additionalControls: { tr: "Kapalı alanda test medyasının atmosfer etkisini değerlendir", en: "Assess atmospheric effects of test medium in enclosed areas" },
      },
      {
        hazard: { tr: "Bağlantı arızası", en: "Connection failure" },
        consequence: { tr: "Hortum savrulması veya parça fırlaması", en: "Hose whip or projectile" },
        personsAtRisk: { tr: "Test ekibi", en: "Test team" },
        existingControls: { tr: "Bağlantı kontrolü", en: "Connection inspection" },
        additionalControls: { tr: "Gerekli yerlerde safety restraint kullan", en: "Use safety restraints where required" },
      },
    ],
  },

  {
    id: "steam-blowing",
    category: { tr: "Devreye Alma", en: "Commissioning" },
    activity: { tr: "Steam Blowing", en: "Steam Blowing" },
    items: [
      {
        hazard: { tr: "Yüksek sıcaklıklı buhar salımı", en: "High-temperature steam release" },
        consequence: { tr: "Ciddi yanık veya ölüm", en: "Severe burns or fatality" },
        personsAtRisk: { tr: "Devreye alma ekibi ve yakın personel", en: "Commissioning team and nearby personnel" },
        existingControls: { tr: "Onaylı prosedür, dışlama alanı ve kontrollü discharge", en: "Approved procedure, exclusion zone and controlled discharge" },
        additionalControls: { tr: "Discharge hattını güvenli ve erişilemez bölgeye yönlendir", en: "Direct discharge toward a safe inaccessible area" },
      },
      {
        hazard: { tr: "Fırlayan debris", en: "Expelled debris" },
        consequence: { tr: "Projectile yaralanması", en: "Projectile injury" },
        personsAtRisk: { tr: "Yakındaki saha çalışanları", en: "Nearby site workers" },
        existingControls: { tr: "Discharge alanı izolasyonu", en: "Discharge-zone isolation" },
        additionalControls: { tr: "Projectile hattında yapı veya personel olmadığını doğrula", en: "Verify no personnel or vulnerable equipment are in the projectile path" },
      },
      {
        hazard: { tr: "Yüksek gürültü", en: "Extreme noise" },
        consequence: { tr: "İşitme hasarı", en: "Hearing damage" },
        personsAtRisk: { tr: "Devreye alma personeli", en: "Commissioning personnel" },
        existingControls: { tr: "Gürültü alanı izolasyonu ve uygun işitme koruması", en: "Noise-area isolation and suitable hearing protection" },
        additionalControls: { tr: "Gereksiz personeli alandan uzaklaştır", en: "Remove non-essential personnel from the area" },
      },
    ],
  },

  {
    id: "emergency-response",
    category: { tr: "Acil Durum", en: "Emergency" },
    activity: { tr: "Acil Durum Müdahalesi", en: "Emergency Response Activities" },
    items: [
      {
        hazard: { tr: "Tehlike alanına kontrolsüz giriş", en: "Uncontrolled entry into hazard area" },
        consequence: { tr: "İkincil yaralanma veya can kaybı", en: "Secondary injury or fatality" },
        personsAtRisk: { tr: "Müdahale ekibi", en: "Emergency responders" },
        existingControls: { tr: "Incident command ve alan kontrolü", en: "Incident command and scene control" },
        additionalControls: { tr: "Müdahale öncesi tehlikeleri hızlı şekilde değerlendir", en: "Perform rapid hazard assessment before entry" },
      },
      {
        hazard: { tr: "Yetersiz iletişim", en: "Communication failure" },
        consequence: { tr: "Müdahale koordinasyonunun kaybı", en: "Loss of response coordination" },
        personsAtRisk: { tr: "Tüm acil durum ekibi", en: "All emergency-response personnel" },
        existingControls: { tr: "Belirlenmiş iletişim kanalı", en: "Designated communication channel" },
        additionalControls: { tr: "Yedek iletişim yöntemini hazır tut", en: "Maintain backup communication methods" },
      },
      {
        hazard: { tr: "Uygun olmayan KKD", en: "Inadequate PPE" },
        consequence: { tr: "Kimyasal, termal veya fiziksel maruziyet", en: "Chemical, thermal or physical exposure" },
        personsAtRisk: { tr: "Müdahale personeli", en: "Responders" },
        existingControls: { tr: "Olay tipine uygun acil durum KKD'si", en: "Emergency PPE suitable for incident type" },
        additionalControls: { tr: "Olay koşulları değişirse KKD seçimini yeniden değerlendir", en: "Reassess PPE selection if incident conditions change" },
      },
    ],
  },

  {
    id: "lone-working",
    category: { tr: "Çalışma Koşulları", en: "Work Conditions" },
    activity: { tr: "Yalnız Çalışma", en: "Lone Working" },
    items: [
      {
        hazard: { tr: "Acil durumda yardımın gecikmesi", en: "Delayed assistance during emergency" },
        consequence: { tr: "Yaralanmanın ağırlaşması", en: "Worsening of injury" },
        personsAtRisk: { tr: "Yalnız çalışan personel", en: "Lone worker" },
        existingControls: { tr: "Check-in sistemi ve iletişim cihazı", en: "Check-in system and communication device" },
        additionalControls: { tr: "Yüksek riskli işleri yalnız çalışmaya uygun kabul etme", en: "Do not permit high-risk tasks as lone work" },
      },
      {
        hazard: { tr: "İletişim kaybı", en: "Loss of communication" },
        consequence: { tr: "Acil durumda bulunamama", en: "Failure to locate worker during emergency" },
        personsAtRisk: { tr: "Yalnız çalışan", en: "Lone worker" },
        existingControls: { tr: "Telefon veya telsiz", en: "Phone or radio" },
        additionalControls: { tr: "Sinyal olmayan alanlarda alternatif yöntem belirle", en: "Provide alternative arrangements in areas without signal" },
      },
      {
        hazard: { tr: "Beklenmeyen sağlık veya güvenlik olayı", en: "Unexpected health or safety incident" },
        consequence: { tr: "Müdahalenin gecikmesi", en: "Delayed response" },
        personsAtRisk: { tr: "Yalnız çalışan personel", en: "Lone worker" },
        existingControls: { tr: "Risk bazlı yalnız çalışma değerlendirmesi", en: "Risk-based lone-working assessment" },
        additionalControls: { tr: "Görev ve bölge için maksimum check-in aralığı belirle", en: "Define maximum check-in interval for the task and location" },
      },
    ],
  },
];
