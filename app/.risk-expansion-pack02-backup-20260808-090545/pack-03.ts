import type { RiskLibraryActivity } from "./pack-01";

export const riskLibraryPack03: RiskLibraryActivity[] = [
  {
    id: "pipe-installation",
    category: { tr: "Mekanik", en: "Mechanical" },
    activity: { tr: "Boru Montajı", en: "Pipe Installation" },
    items: [
      {
        hazard: { tr: "Boru veya spool düşmesi", en: "Dropped pipe or spool" },
        consequence: { tr: "Ezilme veya ciddi yaralanma", en: "Crushing or serious injury" },
        personsAtRisk: { tr: "Montaj ve rigging ekibi", en: "Installation and rigging crew" },
        existingControls: { tr: "Uygun kaldırma planı, rigging ekipmanı ve dışlama alanı", en: "Suitable lift plan, rigging equipment and exclusion zone" },
        additionalControls: { tr: "Yük hareket hattında personel bulunmasını engelle", en: "Keep personnel out of the load path" },
      },
      {
        hazard: { tr: "Boru ile yapı arasında sıkışma", en: "Pinch point between pipe and structure" },
        consequence: { tr: "El veya vücut yaralanması", en: "Hand or body injury" },
        personsAtRisk: { tr: "Montaj personeli", en: "Installation personnel" },
        existingControls: { tr: "Kontrollü yönlendirme ve uygun el pozisyonu", en: "Controlled positioning and safe hand placement" },
        additionalControls: { tr: "Sıkışma noktalarını montaj öncesi belirle", en: "Identify pinch points before installation" },
      },
      {
        hazard: { tr: "Geçici destek yetersizliği", en: "Inadequate temporary support" },
        consequence: { tr: "Boru hareketi veya düşmesi", en: "Pipe movement or collapse" },
        personsAtRisk: { tr: "Montaj ekibi", en: "Installation crew" },
        existingControls: { tr: "Geçici destek ve stabilite kontrolü", en: "Temporary supports and stability checks" },
        additionalControls: { tr: "Kalıcı bağlantı tamamlanmadan desteği kaldırma", en: "Do not remove support before permanent connection is complete" },
      },
    ],
  },

  {
    id: "pipe-support-installation",
    category: { tr: "Mekanik", en: "Mechanical" },
    activity: { tr: "Boru Support Montajı", en: "Pipe Support Installation" },
    items: [
      {
        hazard: { tr: "Support veya malzeme düşmesi", en: "Falling support or material" },
        consequence: { tr: "Çarpma veya ezilme", en: "Struck-by or crushing injury" },
        personsAtRisk: { tr: "Montaj ekibi ve alt seviyedeki çalışanlar", en: "Installation crew and workers below" },
        existingControls: { tr: "Malzeme sabitleme ve alt alan izolasyonu", en: "Material securing and exclusion zone below" },
        additionalControls: { tr: "Yüksekte küçük parçaları tether et", en: "Tether small components at height" },
      },
      {
        hazard: { tr: "Yüksekte çalışma", en: "Work at height" },
        consequence: { tr: "Düşme ve ciddi yaralanma", en: "Fall and serious injury" },
        personsAtRisk: { tr: "Montaj personeli", en: "Installation personnel" },
        existingControls: { tr: "Güvenli erişim ve uygun platform", en: "Safe access and suitable work platform" },
        additionalControls: { tr: "Uygun kenar korumasını doğrula", en: "Verify suitable edge protection" },
      },
      {
        hazard: { tr: "Delme / ankraj sırasında el yaralanması", en: "Hand injury during drilling or anchoring" },
        consequence: { tr: "Kesilme veya sıkışma", en: "Laceration or pinch injury" },
        personsAtRisk: { tr: "Montaj çalışanları", en: "Installation workers" },
        existingControls: { tr: "Uygun el aleti ve KKD", en: "Suitable tools and PPE" },
        additionalControls: { tr: "Delme bölgesindeki gizli servisleri kontrol et", en: "Check for hidden services before drilling" },
      },
    ],
  },

  {
    id: "valve-maintenance",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Vana Bakımı", en: "Valve Maintenance" },
    items: [
      {
        hazard: { tr: "Kalıntı basınç veya proses ürünü", en: "Residual pressure or process material" },
        consequence: { tr: "Kimyasal maruziyet veya ciddi yaralanma", en: "Chemical exposure or serious injury" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "İzolasyon, depressurization ve drenaj", en: "Isolation, depressurization and draining" },
        additionalControls: { tr: "Sıfır enerji durumunu fiziksel doğrula", en: "Physically verify zero-energy condition" },
      },
      {
        hazard: { tr: "Ağır vana parçası", en: "Heavy valve component" },
        consequence: { tr: "Sıkışma veya kas-iskelet yaralanması", en: "Pinch or musculoskeletal injury" },
        personsAtRisk: { tr: "Bakım ekibi", en: "Maintenance team" },
        existingControls: { tr: "Kaldırma yardım ekipmanı", en: "Mechanical lifting aids" },
        additionalControls: { tr: "Ağır parçalar için planlı kaldırma yöntemi kullan", en: "Use a planned lifting method for heavy parts" },
      },
      {
        hazard: { tr: "Beklenmeyen vana hareketi", en: "Unexpected valve movement" },
        consequence: { tr: "Sıkışma veya proses salımı", en: "Pinch injury or process release" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "LOTO ve mekanik izolasyon", en: "LOTO and mechanical isolation" },
        additionalControls: { tr: "Aktüatör enerjisini ayrıca izole et", en: "Separately isolate actuator energy" },
      },
    ],
  },

  {
    id: "pump-maintenance",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Pompa Bakımı", en: "Pump Maintenance" },
    items: [
      {
        hazard: { tr: "Beklenmeyen pompa çalışması", en: "Unexpected pump startup" },
        consequence: { tr: "Ezilme veya ciddi yaralanma", en: "Crushing or serious injury" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "LOTO ve sıfır enerji doğrulaması", en: "LOTO and zero-energy verification" },
        additionalControls: { tr: "Tüm enerji kaynaklarını checklist ile doğrula", en: "Verify all energy sources using a checklist" },
      },
      {
        hazard: { tr: "Proses sıvısı salımı", en: "Process fluid release" },
        consequence: { tr: "Kimyasal maruziyet veya kayma", en: "Chemical exposure or slip hazard" },
        personsAtRisk: { tr: "Bakım ekibi", en: "Maintenance crew" },
        existingControls: { tr: "İzolasyon ve drenaj", en: "Isolation and draining" },
        additionalControls: { tr: "Toplama kabı ve spill kit hazır bulundur", en: "Provide catch trays and spill kit" },
      },
      {
        hazard: { tr: "Ağır pompa parçalarının elleçlenmesi", en: "Handling heavy pump components" },
        consequence: { tr: "Ezilme veya kas-iskelet yaralanması", en: "Crushing or musculoskeletal injury" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance personnel" },
        existingControls: { tr: "Kaldırma ekipmanı ve uygun rigging", en: "Lifting equipment and suitable rigging" },
        additionalControls: { tr: "Parça ağırlığını kaldırma öncesi doğrula", en: "Verify component weight before lifting" },
      },
    ],
  },

  {
    id: "compressor-maintenance",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Kompresör Bakımı", en: "Compressor Maintenance" },
    items: [
      {
        hazard: { tr: "Depolanmış basınç", en: "Stored pressure" },
        consequence: { tr: "Yüksek enerjili salım", en: "High-energy release" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Basınç boşaltma ve izolasyon", en: "Depressurization and isolation" },
        additionalControls: { tr: "Basınç göstergesini sıfırda doğrula", en: "Verify pressure indication at zero" },
      },
      {
        hazard: { tr: "Dönen parçalara temas", en: "Contact with rotating parts" },
        consequence: { tr: "Sıkışma veya amputasyon", en: "Entanglement or amputation" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Enerji izolasyonu ve muhafaza", en: "Energy isolation and guarding" },
        additionalControls: { tr: "Muhafaza sökülüyse yeniden enerjilendirmeyi engelle", en: "Prevent re-energization while guards are removed" },
      },
      {
        hazard: { tr: "Yağ veya proses ürünü sızıntısı", en: "Oil or process leakage" },
        consequence: { tr: "Kayma, yangın veya maruziyet", en: "Slip, fire or exposure" },
        personsAtRisk: { tr: "Bakım ve çevre personeli", en: "Maintenance and nearby personnel" },
        existingControls: { tr: "Drenaj ve spill control", en: "Draining and spill control" },
        additionalControls: { tr: "Sızıntı kaynağını bakım sonunda doğrula", en: "Verify leak source is eliminated after maintenance" },
      },
    ],
  },

  {
    id: "rotating-equipment-maintenance",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Döner Ekipman Bakımı", en: "Rotating Equipment Maintenance" },
    items: [
      {
        hazard: { tr: "Beklenmeyen ekipman dönüşü", en: "Unexpected rotation" },
        consequence: { tr: "Sıkışma veya amputasyon", en: "Entanglement or amputation" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "LOTO ve mekanik bloklama", en: "LOTO and mechanical blocking" },
        additionalControls: { tr: "Mekanik enerjiyi sıfır durumda doğrula", en: "Verify mechanical energy at zero" },
      },
      {
        hazard: { tr: "Muhafaza sökülmesi", en: "Guard removal" },
        consequence: { tr: "Dönen parçaya maruziyet", en: "Exposure to moving parts" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Enerji izolasyonu", en: "Energy isolation" },
        additionalControls: { tr: "Muhafaza geri takılmadan test çalıştırması yapma", en: "Do not test-run before guards are reinstalled" },
      },
      {
        hazard: { tr: "Ağır rotor veya coupling elleçleme", en: "Handling heavy rotor or coupling" },
        consequence: { tr: "Ezilme veya kas yaralanması", en: "Crushing or muscle injury" },
        personsAtRisk: { tr: "Bakım ekibi", en: "Maintenance team" },
        existingControls: { tr: "Uygun kaldırma ekipmanı", en: "Suitable lifting equipment" },
        additionalControls: { tr: "Parça ağırlık merkezi ve ağırlığını doğrula", en: "Verify component center of gravity and weight" },
      },
    ],
  },

  {
    id: "heat-exchanger-maintenance",
    category: { tr: "Bakım", en: "Maintenance" },
    activity: { tr: "Eşanjör Bakımı", en: "Heat Exchanger Maintenance" },
    items: [
      {
        hazard: { tr: "Proses kalıntısı", en: "Residual process material" },
        consequence: { tr: "Kimyasal maruziyet veya yanık", en: "Chemical exposure or burns" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "İzolasyon, drenaj, yıkama ve gaz ölçümü gerektiğinde", en: "Isolation, draining, flushing and gas testing where required" },
        additionalControls: { tr: "Açmadan önce sistemin güvenli olduğunu doğrula", en: "Verify the system is safe before opening" },
      },
      {
        hazard: { tr: "Bundle çekme sırasında ağır yük hareketi", en: "Heavy load movement during bundle pulling" },
        consequence: { tr: "Ezilme veya ekipman hasarı", en: "Crushing or equipment damage" },
        personsAtRisk: { tr: "Bakım ve rigging ekibi", en: "Maintenance and rigging crew" },
        existingControls: { tr: "Onaylı kaldırma/çekme yöntemi", en: "Approved lifting/pulling method" },
        additionalControls: { tr: "Line-of-fire bölgesinden personeli uzaklaştır", en: "Keep personnel out of the line of fire" },
      },
      {
        hazard: { tr: "Keskin yüzey ve conta parçaları", en: "Sharp surfaces and gasket remnants" },
        consequence: { tr: "Kesilme", en: "Laceration" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Uygun el koruması", en: "Suitable hand protection" },
        additionalControls: { tr: "Keskin yüzeyleri kontrollü temizle", en: "Control and clean sharp surfaces safely" },
      },
    ],
  },

  {
    id: "tank-maintenance",
    category: { tr: "Tank", en: "Tank" },
    activity: { tr: "Tank Bakımı", en: "Tank Maintenance" },
    items: [
      {
        hazard: { tr: "Tank içi tehlikeli atmosfer", en: "Hazardous tank atmosphere" },
        consequence: { tr: "Zehirlenme veya ölüm", en: "Poisoning or fatality" },
        personsAtRisk: { tr: "Tank içine giren personel", en: "Tank entrants" },
        existingControls: { tr: "Kapalı alan izni, gaz ölçümü ve havalandırma", en: "Confined-space permit, gas testing and ventilation" },
        additionalControls: { tr: "Sürekli atmosfer takibini değerlendir", en: "Consider continuous atmosphere monitoring" },
      },
      {
        hazard: { tr: "Proses kalıntısı", en: "Process residue" },
        consequence: { tr: "Kimyasal maruziyet", en: "Chemical exposure" },
        personsAtRisk: { tr: "Bakım ekibi", en: "Maintenance crew" },
        existingControls: { tr: "Temizlik, izolasyon ve SDS kontrolü", en: "Cleaning, isolation and SDS review" },
        additionalControls: { tr: "Kalıntının tipine göre özel KKD belirle", en: "Select task-specific PPE based on residue type" },
      },
      {
        hazard: { tr: "Yetersiz kurtarma erişimi", en: "Inadequate rescue access" },
        consequence: { tr: "Gecikmiş acil müdahale", en: "Delayed emergency response" },
        personsAtRisk: { tr: "Tank içi çalışanlar", en: "Tank-entry workers" },
        existingControls: { tr: "Kurtarma planı ve ekipman", en: "Rescue plan and equipment" },
        additionalControls: { tr: "Kurtarma yöntemini işe başlamadan sahada test et", en: "Field-test the rescue method before work" },
      },
    ],
  },

  {
    id: "tank-cleaning",
    category: { tr: "Tank", en: "Tank" },
    activity: { tr: "Tank Temizliği", en: "Tank Cleaning" },
    items: [
      {
        hazard: { tr: "Toksik kalıntı", en: "Toxic residue" },
        consequence: { tr: "Zehirlenme veya cilt maruziyeti", en: "Poisoning or skin exposure" },
        personsAtRisk: { tr: "Temizlik çalışanları", en: "Cleaning workers" },
        existingControls: { tr: "Gaz ölçümü, havalandırma ve kimyasal KKD", en: "Gas testing, ventilation and chemical PPE" },
        additionalControls: { tr: "Temizlik ajanı ve kalıntı etkileşimini kontrol et", en: "Check compatibility between cleaning agent and residue" },
      },
      {
        hazard: { tr: "Kaygan yüzey", en: "Slippery surface" },
        consequence: { tr: "Kayma ve düşme", en: "Slip and fall" },
        personsAtRisk: { tr: "Tank içi çalışanlar", en: "Tank-entry workers" },
        existingControls: { tr: "Uygun ayakkabı ve düzenli sıvı uzaklaştırma", en: "Suitable footwear and regular removal of liquids" },
        additionalControls: { tr: "Çalışma yüzeyini mümkün olduğunca kuru tut", en: "Keep work surfaces as dry as practicable" },
      },
      {
        hazard: { tr: "Yüksek basınçlı temizleme ekipmanı", en: "High-pressure cleaning equipment" },
        consequence: { tr: "Enjeksiyon veya kesilme yaralanması", en: "Injection or laceration injury" },
        personsAtRisk: { tr: "Temizlik operatörü", en: "Cleaning operator" },
        existingControls: { tr: "Eğitimli operatör ve uygun ekipman", en: "Trained operator and suitable equipment" },
        additionalControls: { tr: "Nozul yönünü insanlardan uzak tut", en: "Keep nozzle direction away from personnel" },
      },
    ],
  },

  {
    id: "fuel-transfer",
    category: { tr: "Kimyasal", en: "Chemical" },
    activity: { tr: "Yakıt Transferi", en: "Fuel Transfer" },
    items: [
      {
        hazard: { tr: "Yakıt dökülmesi", en: "Fuel spill" },
        consequence: { tr: "Yangın, çevre kirliliği veya kayma", en: "Fire, environmental contamination or slip hazard" },
        personsAtRisk: { tr: "Transfer ekibi ve çevre personeli", en: "Transfer crew and nearby personnel" },
        existingControls: { tr: "Spill kit, ikincil muhafaza ve kontrollü bağlantı", en: "Spill kit, secondary containment and controlled connections" },
        additionalControls: { tr: "Transfer boyunca bağlantıları gözetim altında tut", en: "Maintain supervision of connections throughout transfer" },
      },
      {
        hazard: { tr: "Yanıcı buhar", en: "Flammable vapour" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Transfer alanındaki personel", en: "Personnel in transfer area" },
        existingControls: { tr: "Ateşleme kaynağı kontrolü ve uygun topraklama/bonding", en: "Ignition-source control and suitable grounding/bonding" },
        additionalControls: { tr: "Statik elektrik kontrolünü transfer öncesi doğrula", en: "Verify static-control measures before transfer" },
      },
      {
        hazard: { tr: "Yanlış ürün veya bağlantı", en: "Incorrect product or connection" },
        consequence: { tr: "Taşma, reaksiyon veya ekipman hasarı", en: "Overflow, reaction or equipment damage" },
        personsAtRisk: { tr: "Transfer operatörü", en: "Transfer operator" },
        existingControls: { tr: "Hat/ürün doğrulama ve etiketleme", en: "Line/product verification and labeling" },
        additionalControls: { tr: "Transfer öncesi iki noktalı doğrulama uygula", en: "Use two-point verification before transfer" },
      },
    ],
  },

  {
    id: "gas-cylinder-handling",
    category: { tr: "Gaz Tüpleri", en: "Gas Cylinders" },
    activity: { tr: "Gaz Tüpü Elleçleme", en: "Gas Cylinder Handling" },
    items: [
      {
        hazard: { tr: "Tüpün düşmesi veya devrilmesi", en: "Cylinder falling or tipping" },
        consequence: { tr: "Ezilme veya vana hasarı", en: "Crushing or valve damage" },
        personsAtRisk: { tr: "Tüp taşıyan çalışanlar", en: "Workers handling cylinders" },
        existingControls: { tr: "Uygun tüp arabası ve sabitleme", en: "Suitable cylinder trolley and securing" },
        additionalControls: { tr: "Tüpü valfinden veya regülatörden taşıma", en: "Do not handle cylinders by valve or regulator" },
      },
      {
        hazard: { tr: "Vana kırılması", en: "Valve breakage" },
        consequence: { tr: "Kontrolsüz yüksek basınçlı gaz salımı", en: "Uncontrolled high-pressure gas release" },
        personsAtRisk: { tr: "Çalışanlar", en: "Workers" },
        existingControls: { tr: "Vana koruma kapağı ve güvenli taşıma", en: "Valve-protection cap and safe handling" },
        additionalControls: { tr: "Hasarlı tüpü kullanıma alma", en: "Do not use damaged cylinders" },
      },
      {
        hazard: { tr: "Yanlış tüp tanımlaması", en: "Incorrect cylinder identification" },
        consequence: { tr: "Yanlış gaz kullanımı ve tehlikeli reaksiyon", en: "Incorrect gas use and hazardous reaction" },
        personsAtRisk: { tr: "Operatörler", en: "Operators" },
        existingControls: { tr: "Etiket ve gaz tipi kontrolü", en: "Label and gas-type verification" },
        additionalControls: { tr: "Renk koduna tek başına güvenme", en: "Do not rely on color coding alone" },
      },
    ],
  },

  {
    id: "gas-cylinder-storage",
    category: { tr: "Gaz Tüpleri", en: "Gas Cylinders" },
    activity: { tr: "Gaz Tüpü Depolama", en: "Gas Cylinder Storage" },
    items: [
      {
        hazard: { tr: "Tüplerin devrilmesi", en: "Cylinder tipping" },
        consequence: { tr: "Vana kırılması ve gaz salımı", en: "Valve breakage and gas release" },
        personsAtRisk: { tr: "Depo ve saha çalışanları", en: "Storage and site personnel" },
        existingControls: { tr: "Dikey depolama ve zincir/sabitleme", en: "Vertical storage and securing chains" },
        additionalControls: { tr: "Depolama raf ve sabitlemelerini periyodik kontrol et", en: "Periodically inspect storage racks and restraints" },
      },
      {
        hazard: { tr: "Uyumsuz gazların birlikte depolanması", en: "Incompatible gases stored together" },
        consequence: { tr: "Yangın veya reaksiyon riski", en: "Fire or reaction risk" },
        personsAtRisk: { tr: "Depo çalışanları", en: "Storage personnel" },
        existingControls: { tr: "Gaz türüne göre ayrılmış depolama", en: "Segregated storage by gas type" },
        additionalControls: { tr: "Uyumluluk ve ayırma gerekliliklerini kontrol et", en: "Verify compatibility and separation requirements" },
      },
      {
        hazard: { tr: "Isı kaynağına maruziyet", en: "Exposure to heat source" },
        consequence: { tr: "Basınç artışı ve tüp arızası", en: "Pressure increase and cylinder failure" },
        personsAtRisk: { tr: "Saha personeli", en: "Site personnel" },
        existingControls: { tr: "Serin, havalandırılmış ve korumalı depolama alanı", en: "Cool, ventilated and protected storage area" },
        additionalControls: { tr: "Tüpleri doğrudan güneş ve sıcak ekipmandan uzak tut", en: "Keep cylinders away from direct sun and hot equipment" },
      },
    ],
  },

  {
    id: "mechanical-isolation",
    category: { tr: "Enerji İzolasyonu", en: "Energy Isolation" },
    activity: { tr: "Mekanik İzolasyon", en: "Mechanical Isolation" },
    items: [
      {
        hazard: { tr: "Yetersiz izolasyon", en: "Inadequate isolation" },
        consequence: { tr: "Beklenmeyen proses veya enerji salımı", en: "Unexpected process or energy release" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "İzolasyon listesi ve saha doğrulaması", en: "Isolation list and field verification" },
        additionalControls: { tr: "Kritik izolasyonda bağımsız ikinci kontrol uygula", en: "Use independent second verification for critical isolation" },
      },
      {
        hazard: { tr: "Körleme veya spool sökümünde ağır parça", en: "Heavy blind or spool handling" },
        consequence: { tr: "Ezilme veya sıkışma", en: "Crushing or pinch injury" },
        personsAtRisk: { tr: "Bakım ve rigging ekibi", en: "Maintenance and rigging crew" },
        existingControls: { tr: "Uygun kaldırma ekipmanı", en: "Suitable lifting equipment" },
        additionalControls: { tr: "Bağlantıyı tamamen açmadan parçayı destekle", en: "Support component before fully releasing connection" },
      },
      {
        hazard: { tr: "Yanlış ekipman üzerinde izolasyon", en: "Isolation on incorrect equipment" },
        consequence: { tr: "Canlı sisteme maruziyet", en: "Exposure to live system" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Ekipman kimliği ve P&ID doğrulaması", en: "Equipment identification and P&ID verification" },
        additionalControls: { tr: "Saha etiketi ile dokümanı eşleştir", en: "Cross-check field tag with documentation" },
      },
    ],
  },

  {
    id: "commissioning",
    category: { tr: "Devreye Alma", en: "Commissioning" },
    activity: { tr: "Ekipman Devreye Alma", en: "Equipment Commissioning" },
    items: [
      {
        hazard: { tr: "Beklenmeyen ekipman hareketi", en: "Unexpected equipment movement" },
        consequence: { tr: "Ezilme veya çarpma", en: "Crushing or impact injury" },
        personsAtRisk: { tr: "Devreye alma ve bakım ekibi", en: "Commissioning and maintenance teams" },
        existingControls: { tr: "Devreye alma prosedürü ve kontrollü alan", en: "Commissioning procedure and controlled area" },
        additionalControls: { tr: "Start-up öncesi personel clear kontrolü yap", en: "Confirm personnel clear before startup" },
      },
      {
        hazard: { tr: "Geçici bağlantı veya bypass", en: "Temporary connection or bypass" },
        consequence: { tr: "Kontrolsüz proses veya ekipman davranışı", en: "Uncontrolled process or equipment behavior" },
        personsAtRisk: { tr: "Operasyon personeli", en: "Operations personnel" },
        existingControls: { tr: "Geçici değişiklik kayıt ve kontrolü", en: "Temporary modification control and tracking" },
        additionalControls: { tr: "Devreye alma sonunda bypass ve temporary bağlantıları kapat", en: "Close out bypasses and temporary connections after commissioning" },
      },
      {
        hazard: { tr: "İletişim eksikliği", en: "Communication failure" },
        consequence: { tr: "Yanlış zamanda enerjilendirme veya proses başlatma", en: "Incorrect timing of energization or process startup" },
        personsAtRisk: { tr: "Tüm ilgili ekipler", en: "All involved teams" },
        existingControls: { tr: "Tek komuta noktası ve iletişim planı", en: "Single point of command and communication plan" },
        additionalControls: { tr: "Kritik adımlarda stop/check noktaları kullan", en: "Use stop/check points at critical steps" },
      },
    ],
  },

  {
    id: "startup-activities",
    category: { tr: "Devreye Alma", en: "Commissioning" },
    activity: { tr: "Start-up Faaliyetleri", en: "Startup Activities" },
    items: [
      {
        hazard: { tr: "Beklenmeyen proses salımı", en: "Unexpected process release" },
        consequence: { tr: "Kimyasal maruziyet veya yangın", en: "Chemical exposure or fire" },
        personsAtRisk: { tr: "Operasyon ve devreye alma ekibi", en: "Operations and commissioning teams" },
        existingControls: { tr: "Start-up prosedürü ve checklist", en: "Startup procedure and checklist" },
        additionalControls: { tr: "Kritik vanaları ve ekipman durumunu saha turuyla doğrula", en: "Field-verify critical valves and equipment status" },
      },
      {
        hazard: { tr: "Ekipmanın beklenmeyen hareketi", en: "Unexpected equipment movement" },
        consequence: { tr: "Çarpma veya sıkışma", en: "Impact or pinch injury" },
        personsAtRisk: { tr: "Yakın saha çalışanları", en: "Nearby site workers" },
        existingControls: { tr: "Alan kontrolü ve uyarı", en: "Area control and warning" },
        additionalControls: { tr: "Start-up sırasında gereksiz personeli alandan çıkar", en: "Remove non-essential personnel during startup" },
      },
      {
        hazard: { tr: "Alarm veya interlock çalışmaması", en: "Alarm or interlock failure" },
        consequence: { tr: "Proses kontrol kaybı", en: "Loss of process control" },
        personsAtRisk: { tr: "Operasyon personeli", en: "Operations personnel" },
        existingControls: { tr: "Pre-startup function testleri", en: "Pre-startup functional testing" },
        additionalControls: { tr: "Kritik koruma sistemlerini start-up öncesi doğrula", en: "Verify critical protective systems before startup" },
      },
    ],
  },

  {
    id: "shutdown-activities",
    category: { tr: "Shutdown", en: "Shutdown" },
    activity: { tr: "Shutdown Faaliyetleri", en: "Shutdown Activities" },
    items: [
      {
        hazard: { tr: "Prosesin tam olarak izole edilmemesi", en: "Incomplete process isolation" },
        consequence: { tr: "Beklenmeyen proses salımı", en: "Unexpected process release" },
        personsAtRisk: { tr: "Bakım ve operasyon ekipleri", en: "Maintenance and operations teams" },
        existingControls: { tr: "Shutdown ve izolasyon planı", en: "Shutdown and isolation plan" },
        additionalControls: { tr: "İzolasyonların tamamlandığını ortak saha doğrulamasıyla teyit et", en: "Jointly field-verify completion of isolations" },
      },
      {
        hazard: { tr: "Simultane işler", en: "Simultaneous operations" },
        consequence: { tr: "İşlerin birbirini tehlikeye sokması", en: "Conflicting work activities" },
        personsAtRisk: { tr: "Tüm shutdown personeli", en: "All shutdown personnel" },
        existingControls: { tr: "SIMOPS koordinasyonu ve günlük planlama", en: "SIMOPS coordination and daily planning" },
        additionalControls: { tr: "Çakışan işlerde alan ve zaman ayrımı uygula", en: "Apply spatial or time separation for conflicting work" },
      },
      {
        hazard: { tr: "Yoğun personel ve trafik", en: "High workforce and traffic density" },
        consequence: { tr: "Çarpışma, sıkışma veya gecikmiş tahliye", en: "Collision, congestion or delayed evacuation" },
        personsAtRisk: { tr: "Saha personeli", en: "Site personnel" },
        existingControls: { tr: "Trafik planı ve kontrollü erişim", en: "Traffic plan and controlled access" },
        additionalControls: { tr: "Kritik yoğunluk saatlerinde ekstra trafik kontrolü uygula", en: "Apply additional traffic control during peak periods" },
      },
    ],
  },

  {
    id: "waste-handling",
    category: { tr: "Atık", en: "Waste" },
    activity: { tr: "Atık Elleçleme", en: "Waste Handling" },
    items: [
      {
        hazard: { tr: "Keskin atık", en: "Sharp waste" },
        consequence: { tr: "Kesilme veya delinme", en: "Cuts or puncture injury" },
        personsAtRisk: { tr: "Atık toplayan çalışanlar", en: "Waste-handling workers" },
        existingControls: { tr: "Uygun atık kabı ve el koruması", en: "Suitable waste containers and hand protection" },
        additionalControls: { tr: "Keskin atıkları ayrı ve delinmeye dayanıklı kapta tut", en: "Segregate sharps into puncture-resistant containers" },
      },
      {
        hazard: { tr: "Tehlikeli atık ile temas", en: "Contact with hazardous waste" },
        consequence: { tr: "Kimyasal veya biyolojik maruziyet", en: "Chemical or biological exposure" },
        personsAtRisk: { tr: "Atık çalışanları", en: "Waste workers" },
        existingControls: { tr: "Etiketleme, ayrıştırma ve uygun KKD", en: "Labeling, segregation and suitable PPE" },
        additionalControls: { tr: "Atığın içeriği bilinmiyorsa tehlikeli kabul et", en: "Treat unknown waste as hazardous until identified" },
      },
      {
        hazard: { tr: "Ağır atık elleçleme", en: "Handling heavy waste" },
        consequence: { tr: "Kas-iskelet yaralanması", en: "Musculoskeletal injury" },
        personsAtRisk: { tr: "Atık taşıyan çalışanlar", en: "Waste-handling workers" },
        existingControls: { tr: "Mekanik yardım ve ekip kaldırma", en: "Mechanical aids and team lifting" },
        additionalControls: { tr: "Ağır konteynerleri manuel taşımayı sınırla", en: "Limit manual handling of heavy containers" },
      },
    ],
  },

  {
    id: "night-work",
    category: { tr: "Çalışma Koşulları", en: "Work Conditions" },
    activity: { tr: "Gece Çalışması", en: "Night Work" },
    items: [
      {
        hazard: { tr: "Yetersiz aydınlatma", en: "Insufficient lighting" },
        consequence: { tr: "Takılma, düşme veya operasyon hatası", en: "Trips, falls or operational errors" },
        personsAtRisk: { tr: "Gece vardiyası çalışanları", en: "Night-shift workers" },
        existingControls: { tr: "Sabit ve geçici aydınlatma", en: "Permanent and temporary lighting" },
        additionalControls: { tr: "Kritik iş alanlarında lux yeterliliğini doğrula", en: "Verify adequate lighting levels in critical work areas" },
      },
      {
        hazard: { tr: "Yorgunluk", en: "Fatigue" },
        consequence: { tr: "Dikkat azalması ve hata riski", en: "Reduced attention and increased error risk" },
        personsAtRisk: { tr: "Gece vardiyası çalışanları", en: "Night-shift workers" },
        existingControls: { tr: "Vardiya ve dinlenme düzeni", en: "Shift and rest arrangements" },
        additionalControls: { tr: "Kritik işlerde yorgunluk değerlendirmesi yap", en: "Assess fatigue for safety-critical tasks" },
      },
      {
        hazard: { tr: "Azalan gözetim ve destek", en: "Reduced supervision and support" },
        consequence: { tr: "Acil durumda gecikmiş müdahale", en: "Delayed emergency response" },
        personsAtRisk: { tr: "Gece personeli", en: "Night personnel" },
        existingControls: { tr: "Belirlenmiş sorumlu ve iletişim kanalı", en: "Designated supervision and communication channels" },
        additionalControls: { tr: "Acil durum desteğinin gece vardiyasında mevcut olduğunu doğrula", en: "Verify emergency support is available during night shift" },
      },
    ],
  },

  {
    id: "extreme-heat-work",
    category: { tr: "Çalışma Koşulları", en: "Work Conditions" },
    activity: { tr: "Aşırı Sıcakta Çalışma", en: "Work in Extreme Heat" },
    items: [
      {
        hazard: { tr: "Isı stresi", en: "Heat stress" },
        consequence: { tr: "Baş dönmesi, sıcak bitkinliği veya sıcak çarpması", en: "Dizziness, heat exhaustion or heat stroke" },
        personsAtRisk: { tr: "Açık alanda çalışan personel", en: "Outdoor workers" },
        existingControls: { tr: "Su, gölge, dinlenme ve uygun iş planı", en: "Water, shade, rest and suitable work planning" },
        additionalControls: { tr: "Sıcaklık ve iş yüküne göre work/rest rejimi uygula", en: "Apply work/rest schedules based on heat and workload" },
      },
      {
        hazard: { tr: "Dehidrasyon", en: "Dehydration" },
        consequence: { tr: "Performans düşüşü veya sağlık etkisi", en: "Reduced performance or health effects" },
        personsAtRisk: { tr: "Sıcak ortam çalışanları", en: "Workers in hot environments" },
        existingControls: { tr: "Düzenli su erişimi", en: "Regular access to drinking water" },
        additionalControls: { tr: "Ağır terlemede uygun elektrolit desteğini saha prosedürüne göre değerlendir", en: "Consider suitable electrolyte replacement according to site procedure during heavy sweating" },
      },
      {
        hazard: { tr: "Isı nedeniyle dikkat kaybı", en: "Heat-related loss of concentration" },
        consequence: { tr: "İş kazası riskinin artması", en: "Increased accident risk" },
        personsAtRisk: { tr: "Tüm sıcak ortam çalışanları", en: "All workers in hot conditions" },
        existingControls: { tr: "Dinlenme periyotları ve gözetim", en: "Rest breaks and supervision" },
        additionalControls: { tr: "Kritik görevleri günün daha serin saatlerine planla", en: "Schedule critical tasks during cooler periods where practicable" },
      },
    ],
  },

  {
    id: "fire-watch",
    category: { tr: "Yangın Güvenliği", en: "Fire Safety" },
    activity: { tr: "Fire Watch Görevi", en: "Fire Watch Activities" },
    items: [
      {
        hazard: { tr: "Gizli yangın başlangıcının fark edilmemesi", en: "Failure to detect developing fire" },
        consequence: { tr: "Yangının yayılması", en: "Fire escalation" },
        personsAtRisk: { tr: "Çalışma alanındaki personel", en: "Personnel in work area" },
        existingControls: { tr: "Dedicated fire watch ve uygun yangın söndürme ekipmanı", en: "Dedicated fire watch and suitable firefighting equipment" },
        additionalControls: { tr: "Fire watch'ın görüş alanını ve kaçış yolunu açık tut", en: "Maintain clear visibility and escape route for fire watch" },
      },
      {
        hazard: { tr: "Uygun olmayan yangın söndürme ekipmanı", en: "Unsuitable firefighting equipment" },
        consequence: { tr: "Yangına etkisiz müdahale", en: "Ineffective fire response" },
        personsAtRisk: { tr: "Fire watch ve çalışanlar", en: "Fire watch and workers" },
        existingControls: { tr: "İşe uygun extinguisher seçimi ve kontrolü", en: "Selection and inspection of task-appropriate extinguishers" },
        additionalControls: { tr: "Ekipman tipini beklenen yangın sınıfına göre doğrula", en: "Verify equipment type against expected fire class" },
      },
      {
        hazard: { tr: "İş sonrası gözetimin erken bırakılması", en: "Fire watch ending too early after work" },
        consequence: { tr: "Gecikmiş yangın başlangıcı", en: "Delayed fire ignition" },
        personsAtRisk: { tr: "Saha personeli ve tesis", en: "Site personnel and facility" },
        existingControls: { tr: "Saha prosedürüne uygun post-work fire watch", en: "Post-work fire watch according to site procedure" },
        additionalControls: { tr: "Sıcak yüzey ve kıvılcım geçiş alanlarını final kontrol et", en: "Complete final inspection of hot surfaces and spark-travel areas" },
      },
    ],
  },
];
