import type { RiskLibraryActivity } from "./pack-01";

export const riskLibraryPack05: RiskLibraryActivity[] = [
  {
    id: "hand-power-tools",
    category: { tr: "El Aletleri", en: "Hand & Power Tools" },
    activity: { tr: "El ve Elektrikli El Aletleri Kullanımı", en: "Hand & Power Tool Use" },
    items: [
      {
        hazard: { tr: "Dönen veya hareketli parçaya temas", en: "Contact with moving or rotating parts" },
        consequence: { tr: "Kesilme, sıkışma veya amputasyon", en: "Laceration, entanglement or amputation" },
        personsAtRisk: { tr: "Alet kullanıcıları", en: "Tool users" },
        existingControls: { tr: "Uygun alet seçimi, muhafaza ve eğitim", en: "Correct tool selection, guarding and training" },
        additionalControls: { tr: "Muhafazası sökülmüş ekipmanı kullanma", en: "Do not use equipment with guards removed" },
      },
      {
        hazard: { tr: "Hasarlı kablo veya ekipman", en: "Damaged cable or equipment" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Operatörler", en: "Operators" },
        existingControls: { tr: "Pre-use kontrol ve arızalı ekipmanın hizmet dışı bırakılması", en: "Pre-use inspection and removal of defective equipment from service" },
        additionalControls: { tr: "Geçici onarımları kabul etme", en: "Do not accept temporary repairs" },
      },
      {
        hazard: { tr: "Fırlayan parçacık", en: "Flying particles" },
        consequence: { tr: "Göz veya yüz yaralanması", en: "Eye or facial injury" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Uygun göz/yüz koruması", en: "Suitable eye and face protection" },
        additionalControls: { tr: "Yakın çalışanları kıvılcım ve parçacık hattından uzaklaştır", en: "Keep nearby workers clear of sparks and flying debris" },
      },
    ],
  },

  {
    id: "drilling",
    category: { tr: "El Aletleri", en: "Power Tools" },
    activity: { tr: "Delme Çalışması", en: "Drilling" },
    items: [
      {
        hazard: { tr: "Gizli elektrik veya proses hattına temas", en: "Contact with hidden electrical or process service" },
        consequence: { tr: "Elektrik çarpması, gaz veya su salımı", en: "Electric shock or gas/water release" },
        personsAtRisk: { tr: "Delme operatörü", en: "Drilling operator" },
        existingControls: { tr: "Çizim kontrolü ve servis taraması", en: "Drawing review and service scanning" },
        additionalControls: { tr: "Delme noktasını yetkili kişiyle sahada doğrula", en: "Field-verify drilling location with an authorized person" },
      },
      {
        hazard: { tr: "Dönen matkap ucuna temas", en: "Contact with rotating drill bit" },
        consequence: { tr: "Kesilme veya sıkışma", en: "Laceration or entanglement" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Uygun ekipman ve çalışma yöntemi", en: "Suitable equipment and safe work method" },
        additionalControls: { tr: "Bol kıyafet ve gevşek malzemeleri uzak tut", en: "Keep loose clothing and materials away" },
      },
      {
        hazard: { tr: "Toz", en: "Dust" },
        consequence: { tr: "Göz veya solunum maruziyeti", en: "Eye or respiratory exposure" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Toz kontrolü ve uygun KKD", en: "Dust control and suitable PPE" },
        additionalControls: { tr: "Malzeme türüne göre özel maruziyet riskini değerlendir", en: "Assess specific exposure risks based on material type" },
      },
    ],
  },

  {
    id: "roofing",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Çatı Kaplama Çalışması", en: "Roofing Work" },
    items: [
      {
        hazard: { tr: "Çatı kenarından düşme", en: "Fall from roof edge" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kenar koruması, güvenli erişim ve uygun düşüş koruması", en: "Edge protection, safe access and suitable fall protection" },
        additionalControls: { tr: "Açık kenar ve açıklıkları vardiya öncesi doğrula", en: "Verify open edges and openings before each shift" },
      },
      {
        hazard: { tr: "Malzeme düşmesi", en: "Falling roofing materials" },
        consequence: { tr: "Çarpma veya ciddi yaralanma", en: "Struck-by or serious injury" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Workers below" },
        existingControls: { tr: "Malzeme sabitleme ve alt alan izolasyonu", en: "Material securing and exclusion zone below" },
        additionalControls: { tr: "Hafif malzemeleri rüzgara karşı ayrıca sabitle", en: "Secure lightweight materials against wind" },
      },
      {
        hazard: { tr: "Sıcak yüzey veya bitüm", en: "Hot surface or bitumen" },
        consequence: { tr: "Yanık", en: "Burn injury" },
        personsAtRisk: { tr: "Çatı kaplama çalışanları", en: "Roofing workers" },
        existingControls: { tr: "Uygun ekipman ve termal koruma", en: "Suitable equipment and thermal protection" },
        additionalControls: { tr: "Sıcak malzeme taşıma ve dökme alanını kontrol et", en: "Control hot-material handling and pouring areas" },
      },
    ],
  },

  {
    id: "temporary-platform",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Geçici Platform Kullanımı", en: "Temporary Platform Work" },
    items: [
      {
        hazard: { tr: "Platformdan düşme", en: "Fall from platform" },
        consequence: { tr: "Ciddi yaralanma", en: "Serious injury" },
        personsAtRisk: { tr: "Platform kullanıcıları", en: "Platform users" },
        existingControls: { tr: "Korkuluk, güvenli erişim ve sağlam çalışma yüzeyi", en: "Guardrails, safe access and stable work surface" },
        additionalControls: { tr: "Kullanım öncesi platform kontrolü yap", en: "Inspect platform before use" },
      },
      {
        hazard: { tr: "Platform stabilite kaybı", en: "Platform instability" },
        consequence: { tr: "Devrilme veya çökme", en: "Overturn or collapse" },
        personsAtRisk: { tr: "Platform kullanıcıları", en: "Platform users" },
        existingControls: { tr: "Uygun temel ve destek", en: "Suitable base and supports" },
        additionalControls: { tr: "Geçici platformu doğaçlama malzemelerle yükseltme", en: "Do not raise platforms using improvised materials" },
      },
      {
        hazard: { tr: "Aşırı yükleme", en: "Overloading" },
        consequence: { tr: "Platform arızası", en: "Platform failure" },
        personsAtRisk: { tr: "Platform kullanıcıları", en: "Platform users" },
        existingControls: { tr: "Kapasite limiti", en: "Load-capacity limit" },
        additionalControls: { tr: "Personel ve malzeme toplam yükünü kontrol et", en: "Control total personnel and material load" },
      },
    ],
  },

  {
    id: "suspended-basket",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Askılı Sepet / Man Basket Çalışması", en: "Suspended Basket / Man Basket Work" },
    items: [
      {
        hazard: { tr: "Sepetin düşmesi", en: "Basket drop" },
        consequence: { tr: "Ölümcül düşme", en: "Fatal fall" },
        personsAtRisk: { tr: "Sepet içindeki çalışanlar", en: "Personnel in basket" },
        existingControls: { tr: "Onaylı ekipman, rigging ve kaldırma planı", en: "Approved equipment, rigging and lift plan" },
        additionalControls: { tr: "Personel kaldırma için özel ekipman ve prosedür uygunluğunu doğrula", en: "Verify equipment and procedure are suitable for personnel lifting" },
      },
      {
        hazard: { tr: "Sepetin yapıya çarpması", en: "Basket striking structure" },
        consequence: { tr: "Sıkışma veya düşme", en: "Crushing or fall" },
        personsAtRisk: { tr: "Sepet kullanıcıları", en: "Basket occupants" },
        existingControls: { tr: "Kontrollü kaldırma ve işaretçi", en: "Controlled lifting and signal person" },
        additionalControls: { tr: "Dar alanlarda hareket hızını azalt", en: "Reduce movement speed in restricted areas" },
      },
      {
        hazard: { tr: "Kurtarma zorluğu", en: "Rescue difficulty" },
        consequence: { tr: "Acil durumda gecikmiş kurtarma", en: "Delayed emergency rescue" },
        personsAtRisk: { tr: "Sepet kullanıcıları", en: "Basket occupants" },
        existingControls: { tr: "Kurtarma planı", en: "Rescue plan" },
        additionalControls: { tr: "Alternatif indirme/kurtarma yöntemini işe başlamadan doğrula", en: "Verify alternative lowering/rescue method before work" },
      },
    ],
  },

  {
    id: "open-edge-work",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Açık Kenar Yakınında Çalışma", en: "Work Near Open Edges" },
    items: [
      {
        hazard: { tr: "Açık kenardan düşme", en: "Fall from open edge" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Açık kenar yakınındaki çalışanlar", en: "Workers near open edges" },
        existingControls: { tr: "Korkuluk veya uygun düşüş koruması", en: "Guardrails or suitable fall protection" },
        additionalControls: { tr: "Kenar koruması yoksa çalışma alanını yeniden planla", en: "Re-plan work if edge protection is unavailable" },
      },
      {
        hazard: { tr: "Malzeme düşmesi", en: "Dropped material" },
        consequence: { tr: "Alt seviyede çarpma", en: "Struck-by injury below" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Workers below" },
        existingControls: { tr: "Toe board ve malzeme kontrolü", en: "Toe boards and material control" },
        additionalControls: { tr: "Alt alanı dışlama bölgesi olarak kullan", en: "Use an exclusion zone below" },
      },
      {
        hazard: { tr: "Kaygan veya düzensiz kenar yüzeyi", en: "Slippery or uneven edge surface" },
        consequence: { tr: "Denge kaybı", en: "Loss of balance" },
        personsAtRisk: { tr: "Çalışanlar", en: "Workers" },
        existingControls: { tr: "Housekeeping ve uygun ayakkabı", en: "Housekeeping and suitable footwear" },
        additionalControls: { tr: "Çalışma alanını temiz ve kuru tut", en: "Keep the work area clean and dry" },
      },
    ],
  },

  {
    id: "mechanical-material-handling",
    category: { tr: "Malzeme Elleçleme", en: "Material Handling" },
    activity: { tr: "Mekanik Malzeme Elleçleme", en: "Mechanical Material Handling" },
    items: [
      {
        hazard: { tr: "Yük düşmesi", en: "Dropped load" },
        consequence: { tr: "Ezilme veya ciddi yaralanma", en: "Crushing or serious injury" },
        personsAtRisk: { tr: "Elleçleme ekibi", en: "Handling crew" },
        existingControls: { tr: "Uygun kaldırma ekipmanı ve kapasite kontrolü", en: "Suitable lifting equipment and capacity verification" },
        additionalControls: { tr: "Yük hareket hattından personeli uzak tut", en: "Keep personnel clear of load path" },
      },
      {
        hazard: { tr: "Sıkışma noktası", en: "Pinch point" },
        consequence: { tr: "El veya parmak yaralanması", en: "Hand or finger injury" },
        personsAtRisk: { tr: "Elleçleme çalışanları", en: "Handling workers" },
        existingControls: { tr: "Kontrollü yönlendirme", en: "Controlled positioning" },
        additionalControls: { tr: "Hands-free veya uygun yardımcı yöntemleri kullan", en: "Use hands-free or suitable handling aids where possible" },
      },
      {
        hazard: { tr: "Ekipman kapasitesinin aşılması", en: "Equipment overload" },
        consequence: { tr: "Ekipman arızası", en: "Equipment failure" },
        personsAtRisk: { tr: "Elleçleme ekibi", en: "Handling crew" },
        existingControls: { tr: "WLL ve yük ağırlığı kontrolü", en: "WLL and load-weight verification" },
        additionalControls: { tr: "Belirsiz yük ağırlığını tahminle kaldırma", en: "Do not lift loads with unknown weight by estimation" },
      },
    ],
  },

  {
    id: "pipe-handling",
    category: { tr: "Malzeme Elleçleme", en: "Material Handling" },
    activity: { tr: "Boru Elleçleme", en: "Pipe Handling" },
    items: [
      {
        hazard: { tr: "Borunun yuvarlanması", en: "Pipe rolling" },
        consequence: { tr: "Ezilme veya sıkışma", en: "Crushing or pinch injury" },
        personsAtRisk: { tr: "Malzeme çalışanları", en: "Material handlers" },
        existingControls: { tr: "Chock ve uygun depolama", en: "Chocks and suitable storage" },
        additionalControls: { tr: "Boru demetlerini güvenli şekilde sabitle", en: "Secure pipe bundles safely" },
      },
      {
        hazard: { tr: "Boru düşmesi", en: "Dropped pipe" },
        consequence: { tr: "Ciddi yaralanma", en: "Serious injury" },
        personsAtRisk: { tr: "Rigging ve malzeme ekibi", en: "Rigging and material crew" },
        existingControls: { tr: "Uygun lifting yöntemi", en: "Suitable lifting method" },
        additionalControls: { tr: "Yuvarlak yükler için uygun sling düzeni kullan", en: "Use rigging suitable for cylindrical loads" },
      },
      {
        hazard: { tr: "Keskin boru uçları", en: "Sharp pipe ends" },
        consequence: { tr: "Kesilme", en: "Laceration" },
        personsAtRisk: { tr: "Elleçleme çalışanları", en: "Handling workers" },
        existingControls: { tr: "El koruması ve kontrollü elleçleme", en: "Hand protection and controlled handling" },
        additionalControls: { tr: "Keskin uçları koruyucu ile kapat", en: "Protect sharp pipe ends where practicable" },
      },
    ],
  },

  {
    id: "fuel-storage",
    category: { tr: "Kimyasal", en: "Chemical" },
    activity: { tr: "Yakıt Depolama", en: "Fuel Storage" },
    items: [
      {
        hazard: { tr: "Yakıt sızıntısı", en: "Fuel leak" },
        consequence: { tr: "Yangın veya çevresel zarar", en: "Fire or environmental damage" },
        personsAtRisk: { tr: "Depo ve saha personeli", en: "Storage and site personnel" },
        existingControls: { tr: "İkincil muhafaza ve düzenli kontrol", en: "Secondary containment and routine inspection" },
        additionalControls: { tr: "Aktif sızıntıları derhal izole et", en: "Immediately isolate active leaks" },
      },
      {
        hazard: { tr: "Ateşleme kaynağı", en: "Ignition source" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Depo çevresindeki çalışanlar", en: "Personnel near storage area" },
        existingControls: { tr: "No-smoking ve ateşleme kaynağı kontrolü", en: "No-smoking and ignition-source control" },
        additionalControls: { tr: "Sıcak çalışma faaliyetlerini depolama alanından ayır", en: "Segregate hot work from fuel storage areas" },
      },
      {
        hazard: { tr: "Uygunsuz kap veya tank", en: "Unsuitable container or tank" },
        consequence: { tr: "Sızıntı veya ürün kaybı", en: "Leak or product loss" },
        personsAtRisk: { tr: "Depo personeli", en: "Storage personnel" },
        existingControls: { tr: "Onaylı depolama ekipmanı", en: "Approved storage equipment" },
        additionalControls: { tr: "Kapların etiket ve bütünlüğünü düzenli kontrol et", en: "Inspect container integrity and labeling regularly" },
      },
    ],
  },

  {
    id: "chemical-storage",
    category: { tr: "Kimyasal", en: "Chemical" },
    activity: { tr: "Kimyasal Depolama", en: "Chemical Storage" },
    items: [
      {
        hazard: { tr: "Uyumsuz kimyasalların birlikte depolanması", en: "Incompatible chemicals stored together" },
        consequence: { tr: "Reaksiyon, yangın veya toksik gaz", en: "Reaction, fire or toxic gas" },
        personsAtRisk: { tr: "Depo çalışanları", en: "Storage workers" },
        existingControls: { tr: "Kimyasal uyumluluk ayrımı ve SDS", en: "Chemical compatibility segregation and SDS" },
        additionalControls: { tr: "Depolama planını uyumluluk matrisine göre doğrula", en: "Verify storage layout against compatibility matrix" },
      },
      {
        hazard: { tr: "Kimyasal sızıntı", en: "Chemical leak" },
        consequence: { tr: "Maruziyet veya çevre zararı", en: "Exposure or environmental harm" },
        personsAtRisk: { tr: "Depo çalışanları", en: "Storage workers" },
        existingControls: { tr: "İkincil muhafaza ve spill kit", en: "Secondary containment and spill kits" },
        additionalControls: { tr: "Dökülme müdahale ekipmanını kolay erişilebilir tut", en: "Keep spill-response equipment readily accessible" },
      },
      {
        hazard: { tr: "Yanlış veya eksik etiketleme", en: "Incorrect or missing labeling" },
        consequence: { tr: "Yanlış kullanım veya tehlikeli karışım", en: "Incorrect use or hazardous mixing" },
        personsAtRisk: { tr: "Depo ve kullanıcı personel", en: "Storage and user personnel" },
        existingControls: { tr: "Etiket ve SDS sistemi", en: "Labeling and SDS system" },
        additionalControls: { tr: "Etiketsiz kabı kullanma veya depolama", en: "Do not use or store unidentified containers" },
      },
    ],
  },

  {
    id: "surface-grinding",
    category: { tr: "Yüzey Hazırlama", en: "Surface Preparation" },
    activity: { tr: "Yüzey Taşlama", en: "Surface Grinding" },
    items: [
      {
        hazard: { tr: "Disk kırılması", en: "Grinding-disc failure" },
        consequence: { tr: "Ciddi kesilme veya çarpma", en: "Serious laceration or impact injury" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Doğru disk, guard ve pre-use kontrol", en: "Correct disc, guard and pre-use inspection" },
        additionalControls: { tr: "Disk hız sınıfının ekipmanla uyumunu kontrol et", en: "Verify disc speed rating is compatible with the tool" },
      },
      {
        hazard: { tr: "Kıvılcım", en: "Sparks" },
        consequence: { tr: "Yangın veya göz yaralanması", en: "Fire or eye injury" },
        personsAtRisk: { tr: "Çalışma alanındaki personel", en: "Personnel in work area" },
        existingControls: { tr: "Alan kontrolü ve göz/yüz koruması", en: "Area control and eye/face protection" },
        additionalControls: { tr: "Yanıcıları kıvılcım hattından uzaklaştır", en: "Remove combustibles from spark path" },
      },
      {
        hazard: { tr: "Toz", en: "Dust" },
        consequence: { tr: "Solunum etkisi", en: "Respiratory effects" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Toz kontrolü", en: "Dust control" },
        additionalControls: { tr: "Malzeme türüne göre uygun maruziyet kontrolü uygula", en: "Apply exposure controls suitable for the material" },
      },
    ],
  },

  {
    id: "leak-repair",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Kaçak Onarımı", en: "Leak Repair" },
    items: [
      {
        hazard: { tr: "Tehlikeli akışkan maruziyeti", en: "Exposure to hazardous fluid" },
        consequence: { tr: "Kimyasal yanık, zehirlenme veya yaralanma", en: "Chemical burns, poisoning or injury" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "İzolasyon ve ürün bilgisi", en: "Isolation and product information" },
        additionalControls: { tr: "Canlı sistem kaçağında işe başlamadan mühendislik çözümü değerlendir", en: "Evaluate engineered controls before work on live leaks" },
      },
      {
        hazard: { tr: "Basınçlı salım", en: "Pressurized release" },
        consequence: { tr: "Enjeksiyon veya çarpma yaralanması", en: "Injection or impact injury" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Depressurization ve dışlama alanı", en: "Depressurization and exclusion zone" },
        additionalControls: { tr: "Basınç sıfırlanmadan bağlantıya müdahale etme", en: "Do not intervene until pressure is confirmed at zero" },
      },
      {
        hazard: { tr: "Kaygan zemin", en: "Slippery surface" },
        consequence: { tr: "Kayma ve düşme", en: "Slip and fall" },
        personsAtRisk: { tr: "Bakım ve saha personeli", en: "Maintenance and site personnel" },
        existingControls: { tr: "Spill control ve housekeeping", en: "Spill control and housekeeping" },
        additionalControls: { tr: "Sızıntı alanını hızlı şekilde temizle ve işaretle", en: "Promptly clean and mark the leak area" },
      },
    ],
  },

  {
    id: "general-maintenance",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Genel Bakım Çalışması", en: "General Maintenance Work" },
    items: [
      {
        hazard: { tr: "Beklenmeyen enerji", en: "Unexpected energy" },
        consequence: { tr: "Elektrik, mekanik veya proses yaralanması", en: "Electrical, mechanical or process injury" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "LOTO ve işe özel izolasyon", en: "LOTO and task-specific isolation" },
        additionalControls: { tr: "İşe başlamadan tüm enerji kaynaklarını doğrula", en: "Verify all energy sources before work" },
      },
      {
        hazard: { tr: "El aletleri", en: "Hand tools" },
        consequence: { tr: "Kesilme veya el yaralanması", en: "Cuts or hand injury" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Doğru alet ve pre-use kontrol", en: "Correct tool and pre-use inspection" },
        additionalControls: { tr: "Doğaçlama alet kullanımını engelle", en: "Prevent improvised tool use" },
      },
      {
        hazard: { tr: "Housekeeping eksikliği", en: "Poor housekeeping" },
        consequence: { tr: "Takılma veya erişim problemi", en: "Trip or access obstruction" },
        personsAtRisk: { tr: "Bakım ve saha çalışanları", en: "Maintenance and site workers" },
        existingControls: { tr: "Düzenli çalışma alanı", en: "Organized work area" },
        additionalControls: { tr: "İş boyunca ve iş bitiminde temizlik yap", en: "Maintain housekeeping throughout and after the task" },
      },
    ],
  },

  {
    id: "valve-removal",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Vana Sökümü", en: "Valve Removal" },
    items: [
      {
        hazard: { tr: "Kalıntı basınç", en: "Residual pressure" },
        consequence: { tr: "Proses salımı ve yaralanma", en: "Process release and injury" },
        personsAtRisk: { tr: "Bakım ekibi", en: "Maintenance crew" },
        existingControls: { tr: "İzolasyon ve depressurization", en: "Isolation and depressurization" },
        additionalControls: { tr: "Sıfır basıncı sahada doğrula", en: "Field-verify zero pressure" },
      },
      {
        hazard: { tr: "Ağır vana düşmesi", en: "Heavy valve drop" },
        consequence: { tr: "Ezilme", en: "Crushing injury" },
        personsAtRisk: { tr: "Bakım ve rigging personeli", en: "Maintenance and rigging personnel" },
        existingControls: { tr: "Uygun lifting yöntemi", en: "Suitable lifting method" },
        additionalControls: { tr: "Son bağlantı açılmadan vanayı destekle", en: "Support the valve before final connection is released" },
      },
      {
        hazard: { tr: "Sıkışma noktaları", en: "Pinch points" },
        consequence: { tr: "El ve parmak yaralanması", en: "Hand and finger injury" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Kontrollü söküm", en: "Controlled removal" },
        additionalControls: { tr: "Hands-free yönlendirme yöntemlerini kullan", en: "Use hands-free positioning methods where possible" },
      },
    ],
  },

  {
    id: "pump-alignment",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Pompa Alignment", en: "Pump Alignment" },
    items: [
      {
        hazard: { tr: "Beklenmeyen ekipman hareketi", en: "Unexpected equipment movement" },
        consequence: { tr: "Sıkışma", en: "Pinch or crush injury" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "LOTO", en: "LOTO" },
        additionalControls: { tr: "Alignment tamamlanmadan test çalıştırması yapma", en: "Do not test-run before alignment work is complete" },
      },
      {
        hazard: { tr: "Coupling bölgesinde el sıkışması", en: "Hand pinch at coupling" },
        consequence: { tr: "El yaralanması", en: "Hand injury" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Güvenli el pozisyonu", en: "Safe hand positioning" },
        additionalControls: { tr: "Coupling üzerinde kontrollü ayar yöntemi kullan", en: "Use controlled adjustment methods at coupling" },
      },
      {
        hazard: { tr: "Ağır motor veya pompa hareketi", en: "Movement of heavy motor or pump" },
        consequence: { tr: "Ezilme", en: "Crushing injury" },
        personsAtRisk: { tr: "Bakım ekibi", en: "Maintenance crew" },
        existingControls: { tr: "Jacking veya uygun kaldırma ekipmanı", en: "Jacking or suitable lifting equipment" },
        additionalControls: { tr: "Ekipmanı desteklemeden shim veya altına el sokma", en: "Do not place hands beneath equipment without secure support" },
      },
    ],
  },

  {
    id: "compressor-startup",
    category: { tr: "Devreye Alma", en: "Commissioning" },
    activity: { tr: "Kompresör Start-up", en: "Compressor Start-up" },
    items: [
      {
        hazard: { tr: "Beklenmeyen yüksek basınç", en: "Unexpected high pressure" },
        consequence: { tr: "Ekipman arızası veya proses salımı", en: "Equipment failure or process release" },
        personsAtRisk: { tr: "Operasyon ve devreye alma ekibi", en: "Operations and commissioning teams" },
        existingControls: { tr: "Start-up prosedürü ve pressure monitoring", en: "Startup procedure and pressure monitoring" },
        additionalControls: { tr: "Alarm ve trip setpointlerini start öncesi doğrula", en: "Verify alarm and trip setpoints before startup" },
      },
      {
        hazard: { tr: "Dönen ekipman", en: "Rotating equipment" },
        consequence: { tr: "Sıkışma veya mekanik yaralanma", en: "Entanglement or mechanical injury" },
        personsAtRisk: { tr: "Yakındaki çalışanlar", en: "Nearby personnel" },
        existingControls: { tr: "Muhafazalar ve kontrollü alan", en: "Guards and controlled area" },
        additionalControls: { tr: "Start sırasında gereksiz personeli ekipmandan uzak tut", en: "Keep non-essential personnel clear during startup" },
      },
      {
        hazard: { tr: "Anormal titreşim veya ses", en: "Abnormal vibration or noise" },
        consequence: { tr: "Mekanik arıza", en: "Mechanical failure" },
        personsAtRisk: { tr: "Operasyon personeli", en: "Operations personnel" },
        existingControls: { tr: "Start-up monitoring", en: "Startup monitoring" },
        additionalControls: { tr: "Anormallikte ekipmanı prosedüre göre durdur", en: "Shut down according to procedure if abnormal conditions occur" },
      },
    ],
  },

  {
    id: "barricading",
    category: { tr: "Genel Güvenlik", en: "General Safety" },
    activity: { tr: "Bariyerleme / Dışlama Alanı Kurulumu", en: "Barricading / Exclusion Zone Setup" },
    items: [
      {
        hazard: { tr: "Yetersiz bariyerleme", en: "Inadequate barricading" },
        consequence: { tr: "Tehlikeli alana izinsiz giriş", en: "Unauthorized entry into hazard area" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site personnel" },
        existingControls: { tr: "Uygun bariyer ve uyarı tabelası", en: "Suitable barricades and warning signs" },
        additionalControls: { tr: "Risk seviyesine göre fiziksel bariyer türünü belirle", en: "Select barrier type according to hazard level" },
      },
      {
        hazard: { tr: "Bariyerin yürüyüş yolunu kapatması", en: "Barricade blocking access route" },
        consequence: { tr: "Takılma veya kaçış yolunun engellenmesi", en: "Trip or blocked escape route" },
        personsAtRisk: { tr: "Tüm çalışanlar", en: "All workers" },
        existingControls: { tr: "Alternatif güvenli geçiş", en: "Alternative safe access" },
        additionalControls: { tr: "Acil kaçış yollarını hiçbir zaman kapatma", en: "Never block emergency escape routes" },
      },
      {
        hazard: { tr: "Bariyerin görünür olmaması", en: "Poor barricade visibility" },
        consequence: { tr: "Bariyere çarpma veya alana yanlışlıkla giriş", en: "Collision with barrier or accidental entry" },
        personsAtRisk: { tr: "Yayalar ve araçlar", en: "Pedestrians and vehicles" },
        existingControls: { tr: "Yüksek görünürlüklü bariyer", en: "High-visibility barricade" },
        additionalControls: { tr: "Gece çalışmalarında aydınlatma veya reflektif işaret kullan", en: "Use lighting or reflective markings for night work" },
      },
    ],
  },

  {
    id: "dropped-object-prevention",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Düşen Cisim Önleme", en: "Dropped Object Prevention" },
    items: [
      {
        hazard: { tr: "El aletinin düşmesi", en: "Dropped hand tool" },
        consequence: { tr: "Baş yaralanması veya ölüm", en: "Head injury or fatality" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Workers below" },
        existingControls: { tr: "Tool lanyard ve alt alan izolasyonu", en: "Tool lanyards and exclusion zone below" },
        additionalControls: { tr: "Yüksekte kullanılan küçük aletleri tether et", en: "Tether small tools used at height" },
      },
      {
        hazard: { tr: "Gevşek malzeme düşmesi", en: "Loose material falling" },
        consequence: { tr: "Çarpma yaralanması", en: "Struck-by injury" },
        personsAtRisk: { tr: "Alt seviyedeki personel", en: "Personnel below" },
        existingControls: { tr: "Toe board ve düzenli housekeeping", en: "Toe boards and housekeeping" },
        additionalControls: { tr: "Yüksek platformlarda gevşek malzeme bırakma", en: "Do not leave loose materials on elevated platforms" },
      },
      {
        hazard: { tr: "Yüksekten malzeme aktarımı", en: "Material transfer from height" },
        consequence: { tr: "Kontrolsüz düşme", en: "Uncontrolled drop" },
        personsAtRisk: { tr: "Rigging ve alt alan personeli", en: "Rigging crew and personnel below" },
        existingControls: { tr: "Kontrollü kaldırma/indirme yöntemi", en: "Controlled lifting/lowering method" },
        additionalControls: { tr: "Malzemeyi aşağı atmayı yasakla", en: "Prohibit throwing materials down" },
      },
    ],
  },

  {
    id: "cold-weather-work",
    category: { tr: "Çalışma Koşulları", en: "Work Conditions" },
    activity: { tr: "Soğuk Hava Koşullarında Çalışma", en: "Cold Weather Work" },
    items: [
      {
        hazard: { tr: "Soğuk stresi", en: "Cold stress" },
        consequence: { tr: "Hipotermi veya el becerisinde azalma", en: "Hypothermia or reduced dexterity" },
        personsAtRisk: { tr: "Açık alanda çalışan personel", en: "Outdoor workers" },
        existingControls: { tr: "Uygun kıyafet ve ısınma molaları", en: "Suitable clothing and warm-up breaks" },
        additionalControls: { tr: "Sıcaklık ve rüzgara göre iş/mola düzenini ayarla", en: "Adjust work/rest arrangements according to temperature and wind" },
      },
      {
        hazard: { tr: "Buzlu yüzey", en: "Icy surface" },
        consequence: { tr: "Kayma ve düşme", en: "Slip and fall" },
        personsAtRisk: { tr: "Tüm saha çalışanları", en: "All site workers" },
        existingControls: { tr: "Buz temizleme ve uygun ayakkabı", en: "Ice removal and suitable footwear" },
        additionalControls: { tr: "Kritik yürüyüş yollarını düzenli kontrol et", en: "Regularly inspect critical walkways" },
      },
      {
        hazard: { tr: "Ekipman veya malzemede donma etkisi", en: "Freezing effects on equipment or material" },
        consequence: { tr: "Ekipman arızası veya kontrol kaybı", en: "Equipment failure or loss of control" },
        personsAtRisk: { tr: "Operatörler", en: "Operators" },
        existingControls: { tr: "Kış şartlarına uygun ekipman kontrolü", en: "Cold-weather equipment checks" },
        additionalControls: { tr: "Kritik sistemleri kullanım öncesi işlevsel test et", en: "Function-test critical systems before use" },
      },
    ],
  },

  {
    id: "emergency-evacuation",
    category: { tr: "Acil Durum", en: "Emergency" },
    activity: { tr: "Acil Tahliye", en: "Emergency Evacuation" },
    items: [
      {
        hazard: { tr: "Kaçış yolunun kapanması", en: "Blocked escape route" },
        consequence: { tr: "Tahliyenin gecikmesi", en: "Delayed evacuation" },
        personsAtRisk: { tr: "Tüm saha personeli", en: "All site personnel" },
        existingControls: { tr: "Belirlenmiş ve işaretli kaçış yolları", en: "Designated and marked escape routes" },
        additionalControls: { tr: "Kaçış yollarını günlük kontrollerde doğrula", en: "Verify escape routes during daily inspections" },
      },
      {
        hazard: { tr: "Toplanma alanında eksik sayım", en: "Incomplete accountability at muster point" },
        consequence: { tr: "Kayıp personelin fark edilmemesi", en: "Failure to identify missing personnel" },
        personsAtRisk: { tr: "Tüm çalışanlar ve ziyaretçiler", en: "All workers and visitors" },
        existingControls: { tr: "Muster list ve yoklama sistemi", en: "Muster list and accountability system" },
        additionalControls: { tr: "Ziyaretçi ve alt yüklenici kayıtlarını sisteme dahil et", en: "Include visitors and contractors in accountability system" },
      },
      {
        hazard: { tr: "Panik veya ters yönde hareket", en: "Panic or movement against evacuation flow" },
        consequence: { tr: "Düşme, sıkışma veya tahliye gecikmesi", en: "Falls, congestion or delayed evacuation" },
        personsAtRisk: { tr: "Tahliye edilen personel", en: "Evacuating personnel" },
        existingControls: { tr: "Tatbikat ve yönlendirme", en: "Drills and clear direction" },
        additionalControls: { tr: "Tahliye liderlerini ve alternatif rotaları belirle", en: "Assign evacuation wardens and alternative routes" },
      },
    ],
  },
];
