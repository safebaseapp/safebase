export type RiskLibraryText = {
  tr: string;
  en: string;
};

export type RiskLibraryItem = {
  hazard: RiskLibraryText;
  consequence: RiskLibraryText;
  personsAtRisk: RiskLibraryText;
  existingControls: RiskLibraryText;
  additionalControls: RiskLibraryText;
};

export type RiskLibraryActivity = {
  id: string;
  category: RiskLibraryText;
  activity: RiskLibraryText;
  items: RiskLibraryItem[];
};

export const riskLibraryPack01: RiskLibraryActivity[] = [
  {
    id: "working-at-height",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Yüksekte Çalışma", en: "Working at Height" },
    items: [
      {
        hazard: { tr: "Yüksekten düşme", en: "Fall from height" },
        consequence: { tr: "Ciddi yaralanma, kalıcı sakatlık veya ölüm", en: "Serious injury, permanent disability or fatality" },
        personsAtRisk: { tr: "Çalışanlar ve alt yükleniciler", en: "Workers and contractors" },
        existingControls: { tr: "Güvenli platform, korkuluk, uygun erişim, eğitimli personel ve gerekli olduğunda düşüş koruma sistemi", en: "Safe platform, guardrails, suitable access, trained personnel and fall protection where required" },
        additionalControls: { tr: "Kurtarma planını doğrula, gözetim sağla ve değişen saha koşullarını yeniden değerlendir", en: "Verify rescue arrangements, provide supervision and reassess changing site conditions" },
      },
      {
        hazard: { tr: "Düşen cisimler", en: "Dropped objects" },
        consequence: { tr: "Baş yaralanması, ciddi yaralanma veya ölüm", en: "Head injury, serious injury or fatality" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Personnel working below" },
        existingControls: { tr: "Toe board, malzeme sabitleme, alet sabitleme ve alt alan kontrolü", en: "Toe boards, material securing, tool tethering and controlled area below" },
        additionalControls: { tr: "Dışlama alanını güçlendir ve simultane işleri koordine et", en: "Strengthen the exclusion zone and coordinate simultaneous work" },
      },
      {
        hazard: { tr: "Açık kenar veya zemin açıklığı", en: "Open edge or floor opening" },
        consequence: { tr: "Düşme sonucu ciddi yaralanma veya ölüm", en: "Serious injury or fatality following a fall" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site personnel" },
        existingControls: { tr: "Korkuluk, güvenli kapak, bariyer ve uyarı işaretleri", en: "Guardrails, secure covers, barricades and warning signs" },
        additionalControls: { tr: "Koruyucuların vardiya boyunca yerinde olduğunu doğrula", en: "Verify protection remains secure throughout the shift" },
      },
      // EXPANSION::working-at-height
{
        hazard: { tr: "Uygun olmayan ankraj noktası", en: "Unsuitable anchorage point" },
        consequence: { tr: "Düşüş koruma sisteminin başarısız olması ve ölüm", en: "Failure of fall-protection system and fatality" },
        personsAtRisk: { tr: "Yüksekte çalışan personel", en: "Personnel working at height" },
        existingControls: { tr: "Onaylı ankraj noktası ve uygun bağlantı sistemi", en: "Approved anchorage and suitable connection system" },
        additionalControls: { tr: "Ankraj kapasitesini ve uygunluğunu işe başlamadan doğrula", en: "Verify anchorage suitability and capacity before work" },
      },
      {
        hazard: { tr: "Askıda kalma travması", en: "Suspension trauma" },
        consequence: { tr: "Bilinç kaybı, ciddi sağlık etkisi veya ölüm", en: "Loss of consciousness, serious health effects or fatality" },
        personsAtRisk: { tr: "Düşüş durdurma sisteminde askıda kalan çalışan", en: "Worker suspended in a fall-arrest system" },
        existingControls: { tr: "Kurtarma planı ve uygun kurtarma ekipmanı", en: "Rescue plan and suitable rescue equipment" },
        additionalControls: { tr: "Kurtarma süresini azaltmak için işe özel plan ve tatbikat uygula", en: "Use a task-specific rescue plan and drills to minimize rescue time" },
      },
      {
        hazard: { tr: "Yetersiz aydınlatma", en: "Insufficient lighting" },
        consequence: { tr: "Yanlış adım, denge kaybı ve düşme", en: "Misstep, loss of balance and fall" },
        personsAtRisk: { tr: "Yüksekte çalışanlar", en: "Workers at height" },
        existingControls: { tr: "Uygun sabit veya geçici aydınlatma", en: "Suitable permanent or temporary lighting" },
        additionalControls: { tr: "Çalışma ve erişim yollarının yeterli aydınlatıldığını doğrula", en: "Verify adequate lighting of work and access routes" },
      },

          {
        hazard: { tr: "Düşüş koruma ekipmanının keskin kenarla teması", en: "Fall-protection equipment contacting a sharp edge" },
        consequence: { tr: "Lanyard veya yaşam hattının hasar görmesi sonucu düşme", en: "Damage to lanyard or lifeline resulting in a fall" },
        personsAtRisk: { tr: "Yüksekte çalışan personel", en: "Personnel working at height" },
        existingControls: { tr: "Uygun düşüş koruma ekipmanı ve çalışma öncesi kontrol", en: "Suitable fall-protection equipment and pre-use inspection" },
        additionalControls: { tr: "Keskin kenarları koru ve kenar kullanımına uygun ekipman seç", en: "Protect sharp edges and use equipment rated for edge exposure" },
      },
      {
        hazard: { tr: "Aynı seviyede takılma veya kayma", en: "Slip or trip at elevated work level" },
        consequence: { tr: "Denge kaybı ve yüksekten düşme", en: "Loss of balance and fall from height" },
        personsAtRisk: { tr: "Yüksekte çalışan personel", en: "Personnel working at height" },
        existingControls: { tr: "Düzenli çalışma platformu ve uygun erişim", en: "Orderly work platform and suitable access" },
        additionalControls: { tr: "Geçiş yollarını açık tut ve gevşek malzemeleri kaldır", en: "Keep access routes clear and remove loose materials" },
      },
      {
        hazard: { tr: "Düşüş koruma sisteminde yetersiz açıklık mesafesi", en: "Insufficient fall-clearance distance" },
        consequence: { tr: "Düşüş sırasında alt seviyeye veya yapıya çarpma", en: "Impact with a lower level or structure during a fall" },
        personsAtRisk: { tr: "Düşüş durdurma sistemi kullanan çalışanlar", en: "Workers using fall-arrest systems" },
        existingControls: { tr: "Onaylı ankraj ve uygun bağlantı ekipmanı", en: "Approved anchorage and suitable connecting equipment" },
        additionalControls: { tr: "Çalışma öncesi gerekli düşüş açıklığını hesapla ve uygun sistemi seç", en: "Calculate required fall clearance before work and select a suitable system" },
      },
],
  },

  {
    id: "scaffold-erection",
    category: { tr: "İskele", en: "Scaffolding" },
    activity: { tr: "İskele Kurulumu", en: "Scaffold Erection" },
    items: [
      {
        hazard: { tr: "Kurulum sırasında düşme", en: "Fall during erection" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "İskele kurulum ekibi", en: "Scaffold erection crew" },
        existingControls: { tr: "Yetkin personel, güvenli kurulum sırası, uygun erişim ve düşüş koruması", en: "Competent personnel, safe erection sequence, suitable access and fall protection" },
        additionalControls: { tr: "Kurulum planını ve gözetimi işe başlamadan doğrula", en: "Verify erection plan and supervision before starting work" },
      },
      {
        hazard: { tr: "İskele parçası düşmesi", en: "Falling scaffold components" },
        consequence: { tr: "Ezilme veya baş yaralanması", en: "Crushing or head injury" },
        personsAtRisk: { tr: "Kurulum ekibi ve alt seviyedeki çalışanlar", en: "Erection crew and workers below" },
        existingControls: { tr: "Alt alan izolasyonu ve kontrollü malzeme aktarımı", en: "Exclusion zone below and controlled material transfer" },
        additionalControls: { tr: "Malzemeleri sabitle ve simultane işleri sınırla", en: "Secure materials and restrict simultaneous work" },
      },
      {
        hazard: { tr: "Yetersiz temel veya brace/tie", en: "Inadequate foundation, bracing or ties" },
        consequence: { tr: "İskele dengesizliği veya çökmesi", en: "Scaffold instability or collapse" },
        personsAtRisk: { tr: "İskele çalışanları ve kullanıcıları", en: "Scaffold workers and users" },
        existingControls: { tr: "Zemin kontrolü, base plate, sole board, brace ve tie sistemi", en: "Ground assessment, base plates, sole boards, bracing and ties" },
        additionalControls: { tr: "Teslim öncesi yetkin kişi kontrolü yap", en: "Complete competent-person inspection before handover" },
      },
      // EXPANSION::scaffold-erection
{
        hazard: { tr: "Elektrik hattına yakın iskele kurulumu", en: "Scaffold erection near electrical lines" },
        consequence: { tr: "Elektrik çarpması veya ölüm", en: "Electric shock or fatality" },
        personsAtRisk: { tr: "İskele kurulum ekibi", en: "Scaffold erection crew" },
        existingControls: { tr: "Enerji hattı tespiti ve güvenli yaklaşma mesafesi", en: "Power-line identification and safe clearance" },
        additionalControls: { tr: "Kurulum başlamadan elektrik tehlikesini plan üzerinde doğrula", en: "Verify electrical hazards in the erection plan before starting" },
      },
      {
        hazard: { tr: "Elle ağır iskele parçası taşıma", en: "Manual handling of heavy scaffold components" },
        consequence: { tr: "Kas-iskelet yaralanması", en: "Musculoskeletal injury" },
        personsAtRisk: { tr: "İskele çalışanları", en: "Scaffold workers" },
        existingControls: { tr: "Ekip kaldırma ve uygun taşıma yöntemi", en: "Team lifting and suitable handling method" },
        additionalControls: { tr: "Ağır veya uzun parçalar için mekanik yardım kullan", en: "Use mechanical assistance for heavy or long components" },
      },
      {
        hazard: { tr: "Kurulum alanında trafik veya mobil ekipman", en: "Vehicle or mobile-equipment movement in erection area" },
        consequence: { tr: "Çarpışma veya iskele stabilitesinin bozulması", en: "Collision or scaffold instability" },
        personsAtRisk: { tr: "İskele ekibi ve araç operatörleri", en: "Scaffold crew and vehicle operators" },
        existingControls: { tr: "Bariyer ve trafik ayrımı", en: "Barricading and traffic segregation" },
        additionalControls: { tr: "Kurulum süresince araç yaklaşmasını fiziksel olarak sınırla", en: "Physically restrict vehicle approach during erection" },
      },

          {
        hazard: { tr: "Kurulum sırasında iskelenin kararsız hale gelmesi", en: "Scaffold instability during erection" },
        consequence: { tr: "İskelenin kısmen veya tamamen çökmesi", en: "Partial or complete scaffold collapse" },
        personsAtRisk: { tr: "İskele kurucuları ve yakındaki çalışanlar", en: "Scaffold erectors and nearby workers" },
        existingControls: { tr: "Yetkin iskele ekibi ve onaylı kurulum yöntemi", en: "Competent scaffold team and approved erection method" },
        additionalControls: { tr: "Bağlantı ve çaprazları kurulum sırasına uygun tamamla", en: "Install ties and bracing in the required erection sequence" },
      },
      {
        hazard: { tr: "İskele parçalarının elle taşınması", en: "Manual handling of scaffold components" },
        consequence: { tr: "Kas-iskelet yaralanması veya el sıkışması", en: "Musculoskeletal injury or hand entrapment" },
        personsAtRisk: { tr: "İskele kurucuları", en: "Scaffold erectors" },
        existingControls: { tr: "Ekip çalışması ve uygun taşıma yöntemi", en: "Team handling and suitable handling method" },
        additionalControls: { tr: "Ağır veya uzun parçalar için mekanik yardım kullan", en: "Use mechanical assistance for heavy or long components" },
      },
      {
        hazard: { tr: "Kurulum alanına yetkisiz giriş", en: "Unauthorized entry into scaffold erection area" },
        consequence: { tr: "Düşen parçaların personele çarpması", en: "Personnel struck by falling components" },
        personsAtRisk: { tr: "Yakındaki çalışanlar ve ziyaretçiler", en: "Nearby workers and visitors" },
        existingControls: { tr: "Bariyer ve uyarı işaretleri", en: "Barriers and warning signs" },
        additionalControls: { tr: "Kurulum alanını fiziksel olarak ayır ve erişimi gözetim altında tut", en: "Physically segregate the erection area and control access under supervision" },
      },
],
  },

  {
    id: "scaffold-inspection",
    category: { tr: "İskele", en: "Scaffolding" },
    activity: { tr: "İskele Kontrolü", en: "Scaffold Inspection" },
    items: [
      {
        hazard: { tr: "Eksik veya hasarlı iskele bileşeni", en: "Missing or damaged scaffold component" },
        consequence: { tr: "Düşme veya yapısal arıza", en: "Fall or structural failure" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Yetkin kişi kontrolü ve etiketleme sistemi", en: "Competent-person inspection and tagging system" },
        additionalControls: { tr: "Uygunsuz iskeleyi kullanıma kapat", en: "Remove non-compliant scaffold from service" },
      },
      {
        hazard: { tr: "Değiştirilmiş veya izinsiz modifiye edilmiş iskele", en: "Unauthorized scaffold modification" },
        consequence: { tr: "Stabilite kaybı ve düşme", en: "Loss of stability and falls" },
        personsAtRisk: { tr: "Tüm iskele kullanıcıları", en: "All scaffold users" },
        existingControls: { tr: "Yetkisiz değişiklik yasağı ve düzenli saha kontrolü", en: "Prohibition of unauthorized changes and regular inspections" },
        additionalControls: { tr: "Değişiklik sonrası yeniden resmi kontrol uygula", en: "Require formal reinspection after modification" },
      },
      {
        hazard: { tr: "Eksik erişim veya açık trapdoor", en: "Unsafe access or open trapdoor" },
        consequence: { tr: "Düşme", en: "Fall" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Güvenli erişim merdiveni ve trapdoor kontrolü", en: "Safe access ladder and trapdoor control" },
        additionalControls: { tr: "Erişim noktalarını günlük saha turunda kontrol et", en: "Verify access points during daily site inspections" },
      },
      // SAFEBASE_PACK02::scaffold-inspection
      {
        hazard: { tr: "İskele etiketinin yanlış veya güncel olmaması", en: "Incorrect or outdated scaffold tag" },
        consequence: { tr: "Güvensiz iskelenin kullanılması ve düşme", en: "Use of unsafe scaffold and potential fall" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Etiketleme sistemi ve yetkin kişi kontrolü", en: "Tagging system and competent-person inspection" },
        additionalControls: { tr: "Etiket tarihini ve iskele durumunu kullanım öncesi doğrula", en: "Verify tag date and scaffold status before use" },
      },
      {
        hazard: { tr: "Platformda aşırı yükleme", en: "Scaffold platform overloading" },
        consequence: { tr: "Platform arızası veya iskele stabilitesinin kaybı", en: "Platform failure or loss of scaffold stability" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Yük sınıfı ve kapasite kontrolü", en: "Load-class and capacity control" },
        additionalControls: { tr: "Malzeme istifini ve çalışan sayısını tasarım kapasitesine göre kontrol et", en: "Control stored materials and personnel against design capacity" },
      },
      {
        hazard: { tr: "Eksik toe board veya düşen cisim koruması", en: "Missing toe board or falling-object protection" },
        consequence: { tr: "Alt seviyedeki personelin düşen cisimle yaralanması", en: "Injury to personnel below from falling objects" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Personnel below" },
        existingControls: { tr: "Toe board, bariyer ve alt alan kontrolü", en: "Toe boards, barricades and area-below control" },
        additionalControls: { tr: "Düşen cisim riskinin olduğu seviyelerde korumaları tamamla", en: "Complete falling-object protection where exposure exists" },
      },
          {
        hazard: { tr: "Eksik veya gevşek iskele bağlantılarının fark edilmemesi", en: "Failure to identify missing or loose scaffold ties" },
        consequence: { tr: "İskele stabilitesinin kaybı veya çökme", en: "Loss of scaffold stability or collapse" },
        personsAtRisk: { tr: "İskele kullanıcıları ve çevredeki personel", en: "Scaffold users and surrounding personnel" },
        existingControls: { tr: "Yetkin kişi tarafından periyodik kontrol", en: "Periodic inspection by a competent person" },
        additionalControls: { tr: "Bağlantı noktalarını kontrol listesiyle tek tek doğrula", en: "Verify scaffold ties individually using the inspection checklist" },
      },
      {
        hazard: { tr: "Hasarlı platform elemanlarının gözden kaçması", en: "Damaged platform components not identified" },
        consequence: { tr: "Platform kırılması veya çalışanın düşmesi", en: "Platform failure or worker fall" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Görsel kontrol ve scaffold tagging sistemi", en: "Visual inspection and scaffold tagging system" },
        additionalControls: { tr: "Hasarlı deck ve platformları derhal kullanım dışı bırak", en: "Immediately remove damaged decks and platforms from service" },
      },
      {
        hazard: { tr: "İskelede yetkisiz değişiklik yapılması", en: "Unauthorized scaffold modification" },
        consequence: { tr: "Koruma sisteminin veya stabilitenin bozulması", en: "Compromised protection system or stability" },
        personsAtRisk: { tr: "İskele kullanıcıları", en: "Scaffold users" },
        existingControls: { tr: "Yetkili iskele ekibi ve etiket sistemi", en: "Authorized scaffold team and tagging system" },
        additionalControls: { tr: "Değişiklik sonrası yeniden kontrol ve etiketleme zorunluluğu uygula", en: "Require reinspection and retagging after any modification" },
      },
],
  },

  {
    id: "hot-work",
    category: { tr: "Sıcak Çalışma", en: "Hot Work" },
    activity: { tr: "Sıcak Çalışma", en: "Hot Work" },
    items: [
      {
        hazard: { tr: "Yangın", en: "Fire" },
        consequence: { tr: "Yanık, ekipman hasarı veya ölüm", en: "Burns, equipment damage or fatality" },
        personsAtRisk: { tr: "Operatör ve yakın çevredeki personel", en: "Operator and nearby personnel" },
        existingControls: { tr: "Sıcak çalışma izni, yanıcıların kontrolü, yangın söndürücü ve fire watch", en: "Hot-work permit, combustible control, extinguisher and fire watch" },
        additionalControls: { tr: "Kıvılcım yayılım alanını ve alt seviyeleri tekrar kontrol et", en: "Recheck spark travel paths and lower levels" },
      },
      {
        hazard: { tr: "Yanıcı veya patlayıcı atmosfer", en: "Flammable or explosive atmosphere" },
        consequence: { tr: "Patlama ve ölüm", en: "Explosion and fatality" },
        personsAtRisk: { tr: "Sıcak çalışma ekibi ve çevredeki çalışanlar", en: "Hot-work crew and nearby workers" },
        existingControls: { tr: "Gaz ölçümü, proses izolasyonu ve havalandırma", en: "Gas testing, process isolation and ventilation" },
        additionalControls: { tr: "Koşullar değişirse gaz ölçümünü tekrarla", en: "Repeat gas testing if conditions change" },
      },
      {
        hazard: { tr: "Kaynak dumanı", en: "Welding fumes" },
        consequence: { tr: "Solunum yolu etkileri", en: "Respiratory effects" },
        personsAtRisk: { tr: "Kaynakçı ve yakın çalışanlar", en: "Welder and nearby workers" },
        existingControls: { tr: "Uygun havalandırma ve maruziyet kontrolü", en: "Suitable ventilation and exposure controls" },
        additionalControls: { tr: "Gerekirse lokal emiş veya uygun solunum koruması uygula", en: "Use local extraction or suitable respiratory protection where required" },
      },
      // EXPANSION::hot-work
{
        hazard: { tr: "Yakındaki kapalı hacimlere kıvılcım geçişi", en: "Spark travel into adjacent enclosed areas" },
        consequence: { tr: "Gizli yangın veya patlama", en: "Hidden fire or explosion" },
        personsAtRisk: { tr: "Yakın alan çalışanları", en: "Nearby personnel" },
        existingControls: { tr: "Kıvılcım yollarının kontrolü ve fire watch", en: "Spark-path control and fire watch" },
        additionalControls: { tr: "Duvar, açıklık ve alt seviyelerde gizli kıvılcım geçişini kontrol et", en: "Check hidden spark paths through openings, walls and lower levels" },
      },
      {
        hazard: { tr: "Sıcak yüzey teması", en: "Contact with hot surfaces" },
        consequence: { tr: "Cilt yanıkları", en: "Skin burns" },
        personsAtRisk: { tr: "Sıcak çalışma ekibi", en: "Hot-work crew" },
        existingControls: { tr: "Uygun eldiven ve sıcak yüzey kontrolü", en: "Suitable gloves and hot-surface control" },
        additionalControls: { tr: "Sıcak parçaları işaretle veya güvenli alanda soğumaya bırak", en: "Mark hot components or allow them to cool in a controlled area" },
      },
      {
        hazard: { tr: "Yangın söndürme ekipmanının yetersizliği", en: "Inadequate firefighting equipment" },
        consequence: { tr: "Yangının kontrol altına alınamaması", en: "Failure to control a developing fire" },
        personsAtRisk: { tr: "Çalışma alanındaki tüm personel", en: "All personnel in work area" },
        existingControls: { tr: "Uygun tipte yangın söndürücü", en: "Suitable type of fire extinguisher" },
        additionalControls: { tr: "İşe başlamadan önce söndürücü tipini, durumunu ve erişilebilirliğini doğrula", en: "Verify extinguisher type, condition and accessibility before work" },
      },

          {
        hazard: { tr: "Sıcak metal veya cürufla temas", en: "Contact with hot metal or slag" },
        consequence: { tr: "Cilt yanığı veya göz yaralanması", en: "Skin burn or eye injury" },
        personsAtRisk: { tr: "Sıcak çalışma yapan ve yakındaki personel", en: "Hot-work personnel and nearby workers" },
        existingControls: { tr: "Uygun PPE ve kaynak perdesi", en: "Suitable PPE and welding screens" },
        additionalControls: { tr: "Sıcak parçaları işaretle ve güvenli soğuma alanı oluştur", en: "Mark hot components and establish a safe cooling area" },
      },
      {
        hazard: { tr: "Kıvılcımların gizli yanıcı alana ulaşması", en: "Sparks reaching concealed combustible materials" },
        consequence: { tr: "Gecikmeli yangın", en: "Delayed fire" },
        personsAtRisk: { tr: "Çalışanlar ve tesis personeli", en: "Workers and facility personnel" },
        existingControls: { tr: "Hot-work permit ve yanıcı madde kontrolü", en: "Hot-work permit and combustible-material checks" },
        additionalControls: { tr: "Açıklıkları kapat ve çalışma sonrası yangın gözetimini sürdür", en: "Cover openings and maintain fire watch after completion" },
      },
      {
        hazard: { tr: "Gaz hortumu veya bağlantısından kaçak", en: "Leak from gas hose or connection" },
        consequence: { tr: "Yangın, patlama veya yanık", en: "Fire, explosion or burns" },
        personsAtRisk: { tr: "Sıcak çalışma personeli", en: "Hot-work personnel" },
        existingControls: { tr: "Onaylı hortum, regülatör ve geri tepme ventili", en: "Approved hoses, regulators and flashback arrestors" },
        additionalControls: { tr: "Kullanım öncesi kaçak testi yap ve hasarlı ekipmanı değiştir", en: "Perform a leak test before use and replace damaged equipment" },
      },
],
  },

  {
    id: "confined-space",
    category: { tr: "Kapalı Alan", en: "Confined Space" },
    activity: { tr: "Kapalı Alan Girişi", en: "Confined Space Entry" },
    items: [
      {
        hazard: { tr: "Oksijen yetersizliği", en: "Oxygen deficiency" },
        consequence: { tr: "Bilinç kaybı veya ölüm", en: "Loss of consciousness or fatality" },
        personsAtRisk: { tr: "Kapalı alana giren çalışanlar", en: "Confined-space entrants" },
        existingControls: { tr: "Atmosfer ölçümü, havalandırma ve giriş izni", en: "Atmospheric testing, ventilation and entry permit" },
        additionalControls: { tr: "Gerekli durumlarda sürekli gaz ölçümü uygula", en: "Use continuous gas monitoring where required" },
      },
      {
        hazard: { tr: "Toksik veya yanıcı gaz", en: "Toxic or flammable gas" },
        consequence: { tr: "Zehirlenme, yangın veya patlama", en: "Poisoning, fire or explosion" },
        personsAtRisk: { tr: "Giriş yapanlar ve kurtarma ekibi", en: "Entrants and rescue team" },
        existingControls: { tr: "Gaz ölçümü, izolasyon ve havalandırma", en: "Gas testing, isolation and ventilation" },
        additionalControls: { tr: "Atmosfer değişimini çalışma boyunca takip et", en: "Monitor atmospheric changes throughout the task" },
      },
      {
        hazard: { tr: "Yetersiz kurtarma hazırlığı", en: "Inadequate rescue preparation" },
        consequence: { tr: "Gecikmiş müdahale ve ölüm", en: "Delayed response and fatality" },
        personsAtRisk: { tr: "Giriş yapan çalışanlar", en: "Entrants" },
        existingControls: { tr: "Kurtarma planı, gözcü ve uygun kurtarma ekipmanı", en: "Rescue plan, attendant and suitable rescue equipment" },
        additionalControls: { tr: "İşe özel kurtarma yöntemini giriş öncesi doğrula", en: "Verify the task-specific rescue method before entry" },
      },
      // EXPANSION::confined-space
{
        hazard: { tr: "Sıvı veya katı malzeme ile boğulma", en: "Engulfment by liquid or solid material" },
        consequence: { tr: "Boğulma veya ölüm", en: "Suffocation or fatality" },
        personsAtRisk: { tr: "Kapalı alan çalışanları", en: "Confined-space workers" },
        existingControls: { tr: "Pozitif proses izolasyonu", en: "Positive process isolation" },
        additionalControls: { tr: "Giriş öncesi tüm giriş hatlarını fiziksel olarak doğrula", en: "Physically verify all incoming lines before entry" },
      },
      {
        hazard: { tr: "Aşırı sıcaklık", en: "Extreme temperature" },
        consequence: { tr: "Isı stresi, bilinç kaybı", en: "Heat stress or loss of consciousness" },
        personsAtRisk: { tr: "Kapalı alan giriş personeli", en: "Confined-space entrants" },
        existingControls: { tr: "Havalandırma ve çalışma süresi kontrolü", en: "Ventilation and work-duration control" },
        additionalControls: { tr: "Sıcaklık ve iş yüküne göre çalışma/mola düzeni belirle", en: "Set work/rest arrangements based on temperature and workload" },
      },
      {
        hazard: { tr: "Yetersiz iç aydınlatma", en: "Inadequate internal lighting" },
        consequence: { tr: "Takılma, düşme veya iş hatası", en: "Trips, falls or task errors" },
        personsAtRisk: { tr: "Kapalı alan çalışanları", en: "Confined-space workers" },
        existingControls: { tr: "Uygun düşük voltajlı veya alan sınıfına uygun aydınlatma", en: "Suitable low-voltage or area-rated lighting" },
        additionalControls: { tr: "Aydınlatma ekipmanının alan koşullarına uygunluğunu doğrula", en: "Verify lighting is suitable for the area conditions" },
      },

          {
        hazard: { tr: "Kapalı alanda ani proses akışı", en: "Unexpected process ingress into confined space" },
        consequence: { tr: "Boğulma, zehirlenme veya boğulma sonucu ölüm", en: "Asphyxiation, poisoning or fatal engulfment" },
        personsAtRisk: { tr: "Kapalı alan içerisindeki çalışanlar", en: "Confined-space entrants" },
        existingControls: { tr: "İzolasyon ve LOTO uygulaması", en: "Isolation and LOTO controls" },
        additionalControls: { tr: "Tüm giriş hatlarında pozitif izolasyonu doğrula", en: "Verify positive isolation on all incoming process lines" },
      },
      {
        hazard: { tr: "Kapalı alanda ısı stresi", en: "Heat stress inside confined space" },
        consequence: { tr: "Bayılma, sıcak bitkinliği veya ciddi sağlık etkisi", en: "Fainting, heat exhaustion or serious health effects" },
        personsAtRisk: { tr: "Kapalı alan içerisindeki çalışanlar", en: "Confined-space entrants" },
        existingControls: { tr: "Havalandırma ve çalışma süresi kontrolü", en: "Ventilation and work-duration controls" },
        additionalControls: { tr: "Sıcaklığı izle ve çalışma-dinlenme programı uygula", en: "Monitor temperature and implement a work-rest regime" },
      },
      {
        hazard: { tr: "Kurtarma sırasında ikincil maruziyet", en: "Secondary exposure during confined-space rescue" },
        consequence: { tr: "Kurtarıcıların da etkilenmesi veya ölüm", en: "Rescuers also becoming affected or killed" },
        personsAtRisk: { tr: "Kurtarma ekibi", en: "Rescue team" },
        existingControls: { tr: "Kurtarma planı ve hazır kurtarma ekipmanı", en: "Rescue plan and ready rescue equipment" },
        additionalControls: { tr: "Girişsiz kurtarmayı önceliklendir ve kurtarma ekibinin hazırlığını doğrula", en: "Prioritize non-entry rescue and verify rescue-team readiness" },
      },
],
  },

  {
    id: "excavation",
    category: { tr: "Kazı", en: "Excavation" },
    activity: { tr: "Kazı Çalışması", en: "Excavation" },
    items: [
      {
        hazard: { tr: "Kazı göçmesi", en: "Excavation collapse" },
        consequence: { tr: "Ezilme, boğulma veya ölüm", en: "Crushing, suffocation or fatality" },
        personsAtRisk: { tr: "Kazı içindeki çalışanlar", en: "Workers inside excavation" },
        existingControls: { tr: "Uygun şev, iksa veya koruyucu sistem ve yetkin kişi kontrolü", en: "Suitable sloping, shoring or protective system and competent-person inspection" },
        additionalControls: { tr: "Yağış ve zemin değişimi sonrası yeniden kontrol et", en: "Reinspect after rain or ground-condition changes" },
      },
      {
        hazard: { tr: "Yeraltı hattına temas", en: "Contact with underground services" },
        consequence: { tr: "Elektrik çarpması, yangın veya proses kaçağı", en: "Electric shock, fire or process release" },
        personsAtRisk: { tr: "Kazı ekibi", en: "Excavation crew" },
        existingControls: { tr: "Çizim, hat tespiti, izin ve kontrollü kazı", en: "Drawings, utility locating, permit and controlled excavation" },
        additionalControls: { tr: "Şüpheli bölgelerde kontrollü elle açma uygula", en: "Use controlled hand digging in uncertain areas" },
      },
      {
        hazard: { tr: "Kazıya düşme", en: "Fall into excavation" },
        consequence: { tr: "Kırık veya ciddi yaralanma", en: "Fracture or serious injury" },
        personsAtRisk: { tr: "Yayalar ve çalışanlar", en: "Pedestrians and workers" },
        existingControls: { tr: "Bariyer, güvenli geçiş ve aydınlatma", en: "Barricades, safe crossings and lighting" },
        additionalControls: { tr: "Yoğun alanlarda sağlam fiziksel koruma kullan", en: "Use robust physical protection in high-traffic areas" },
      },
      // EXPANSION::excavation
{
        hazard: { tr: "Kazıda su birikmesi", en: "Water accumulation in excavation" },
        consequence: { tr: "Göçme, kayma veya boğulma", en: "Collapse, slip or drowning" },
        personsAtRisk: { tr: "Kazı içindeki çalışanlar", en: "Workers inside excavation" },
        existingControls: { tr: "Su kontrolü ve pompalama", en: "Water control and pumping" },
        additionalControls: { tr: "Su girişi devam ediyorsa işi durdur ve stabiliteyi yeniden değerlendir", en: "Stop work and reassess stability if water ingress continues" },
      },
      {
        hazard: { tr: "Araçların kazı kenarına yaklaşması", en: "Vehicles approaching excavation edge" },
        consequence: { tr: "Kenar çökmesi veya aracın kazıya düşmesi", en: "Edge collapse or vehicle falling into excavation" },
        personsAtRisk: { tr: "Operatörler ve kazı çalışanları", en: "Operators and excavation workers" },
        existingControls: { tr: "Araç bariyeri ve güvenli mesafe", en: "Vehicle barriers and safe stand-off distance" },
        additionalControls: { tr: "Ağır araç yaklaşma sınırını saha planında işaretle", en: "Mark heavy-vehicle approach limits in the site plan" },
      },
      {
        hazard: { tr: "Kazı atmosferinde tehlikeli gaz", en: "Hazardous atmosphere in excavation" },
        consequence: { tr: "Zehirlenme veya oksijen yetersizliği", en: "Poisoning or oxygen deficiency" },
        personsAtRisk: { tr: "Derin veya kapalı karakterli kazıda çalışanlar", en: "Workers in deep or enclosed excavations" },
        existingControls: { tr: "Gerekli durumlarda gaz ölçümü", en: "Gas testing where required" },
        additionalControls: { tr: "Proses hattı veya gaz riski bulunan alanlarda atmosfer ölçüm kriteri belirle", en: "Define atmospheric-testing criteria where process or gas hazards may exist" },
      },

          {
        hazard: { tr: "Kazı kenarında aşırı yükleme", en: "Excessive surcharge load at excavation edge" },
        consequence: { tr: "Kazı duvarının çökmesi", en: "Excavation wall collapse" },
        personsAtRisk: { tr: "Kazı içerisindeki çalışanlar", en: "Workers inside excavation" },
        existingControls: { tr: "Kazı kenarı yük kontrolü ve bariyer", en: "Edge-load control and barriers" },
        additionalControls: { tr: "Malzeme ve ekipmanı güvenli geri çekilme mesafesinde tut", en: "Keep materials and equipment at a safe setback distance" },
      },
      {
        hazard: { tr: "Kazıya su girişi", en: "Water ingress into excavation" },
        consequence: { tr: "Zemin stabilitesinin kaybı, kayma veya çökme", en: "Loss of ground stability, slips or collapse" },
        personsAtRisk: { tr: "Kazı çalışanları", en: "Excavation workers" },
        existingControls: { tr: "Kazı kontrolü ve drenaj", en: "Excavation inspection and drainage" },
        additionalControls: { tr: "Su birikimini sürekli izle ve uygun pompalama sistemi sağla", en: "Continuously monitor water accumulation and provide suitable dewatering" },
      },
      {
        hazard: { tr: "Kazı içerisindeki tehlikeli atmosfer", en: "Hazardous atmosphere inside excavation" },
        consequence: { tr: "Zehirlenme, oksijen yetersizliği veya bilinç kaybı", en: "Poisoning, oxygen deficiency or loss of consciousness" },
        personsAtRisk: { tr: "Derin kazıda çalışan personel", en: "Personnel working in deep excavations" },
        existingControls: { tr: "Risk değerlendirmesi ve gerekli durumlarda gaz ölçümü", en: "Risk assessment and gas testing where required" },
        additionalControls: { tr: "Atmosfer riski bulunan kazılarda sürekli veya periyodik ölçüm uygula", en: "Use continuous or periodic atmospheric monitoring where a hazard may exist" },
      },
],
  },

  {
    id: "electrical-maintenance",
    category: { tr: "Elektrik", en: "Electrical" },
    activity: { tr: "Elektrik Bakımı", en: "Electrical Maintenance" },
    items: [
      {
        hazard: { tr: "Elektrik çarpması", en: "Electric shock" },
        consequence: { tr: "Yanık, ciddi yaralanma veya ölüm", en: "Burns, serious injury or fatality" },
        personsAtRisk: { tr: "Elektrik bakım personeli", en: "Electrical maintenance personnel" },
        existingControls: { tr: "Yetkili personel, izolasyon, test ve güvenli çalışma prosedürü", en: "Authorized personnel, isolation, testing and safe-work procedure" },
        additionalControls: { tr: "Enerjisiz çalışmayı önceliklendir ve sıfır enerjiyi doğrula", en: "Prioritize de-energized work and verify zero energy" },
      },
      {
        hazard: { tr: "Arc flash / arc blast", en: "Arc flash / arc blast" },
        consequence: { tr: "Ciddi yanık ve basınç etkisi", en: "Severe burns and blast effects" },
        personsAtRisk: { tr: "Elektrik personeli", en: "Electrical personnel" },
        existingControls: { tr: "Enerji değerlendirmesi, sınırlar ve uygun koruyucu ekipman", en: "Energy assessment, boundaries and suitable protective equipment" },
        additionalControls: { tr: "Canlı çalışma gerekiyorsa özel yetkilendirme uygula", en: "Use specific authorization where energized work is necessary" },
      },
      {
        hazard: { tr: "Hasarlı elektrik ekipmanı", en: "Damaged electrical equipment" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Ekipman kullanıcıları", en: "Equipment users" },
        existingControls: { tr: "Kullanım öncesi kontrol ve kusurlu ekipmanı hizmet dışı bırakma", en: "Pre-use inspection and removal of defective equipment from service" },
        additionalControls: { tr: "Geçici onarım kullanımını engelle", en: "Prevent use of temporary repairs" },
      },
      // EXPANSION::electrical-maintenance
{
        hazard: { tr: "Yanlış devre üzerinde çalışma", en: "Working on the wrong circuit" },
        consequence: { tr: "Elektrik çarpması veya arc flash", en: "Electric shock or arc flash" },
        personsAtRisk: { tr: "Elektrik personeli", en: "Electrical personnel" },
        existingControls: { tr: "Devre kimliği ve çizim kontrolü", en: "Circuit identification and drawing verification" },
        additionalControls: { tr: "Test-before-touch yöntemiyle doğru devre ve enerjisizliği doğrula", en: "Verify correct circuit and de-energized condition using test-before-touch" },
      },
      {
        hazard: { tr: "Uygun olmayan test cihazı", en: "Unsuitable test instrument" },
        consequence: { tr: "Yanlış ölçüm veya elektrik yaralanması", en: "Incorrect reading or electrical injury" },
        personsAtRisk: { tr: "Elektrik çalışanları", en: "Electrical workers" },
        existingControls: { tr: "Göreve uygun ve kontrol edilmiş ölçüm cihazı", en: "Task-appropriate and inspected test instrument" },
        additionalControls: { tr: "Cihaz kategori ve voltaj sınıfını devreye göre doğrula", en: "Verify meter category and voltage rating against the circuit" },
      },
      {
        hazard: { tr: "Elektrik panosu önünde yetersiz çalışma alanı", en: "Insufficient working clearance at electrical panel" },
        consequence: { tr: "Kaçışın zorlaşması veya elektrik temas riski", en: "Restricted escape or increased electrical-contact risk" },
        personsAtRisk: { tr: "Elektrik personeli", en: "Electrical personnel" },
        existingControls: { tr: "Panel önünün açık tutulması", en: "Maintaining clear panel access" },
        additionalControls: { tr: "Çalışma öncesi güvenli yaklaşma ve kaçış alanını doğrula", en: "Verify safe approach and escape clearance before work" },
      },

          {
        hazard: { tr: "Depolanmış elektrik enerjisi", en: "Stored electrical energy" },
        consequence: { tr: "Elektrik çarpması veya ark oluşumu", en: "Electric shock or arc event" },
        personsAtRisk: { tr: "Elektrik bakım personeli", en: "Electrical maintenance personnel" },
        existingControls: { tr: "Enerji izolasyonu ve gerilim kontrolü", en: "Energy isolation and voltage verification" },
        additionalControls: { tr: "Kondansatörleri boşalt ve depolanmış enerjinin sıfırlandığını doğrula", en: "Discharge capacitors and verify stored energy has been eliminated" },
      },
      {
        hazard: { tr: "Canlı bölümlere yakın çalışma sırasında yaklaşma mesafesinin ihlali", en: "Violation of safe approach distance near energized parts" },
        consequence: { tr: "Elektrik çarpması, ark parlaması veya ciddi yanık", en: "Electric shock, arc flash or severe burns" },
        personsAtRisk: { tr: "Elektrik bakım personeli", en: "Electrical maintenance personnel" },
        existingControls: { tr: "Bariyerleme, yaklaşma mesafesi kontrolü ve yetkili elektrik personeli", en: "Barricading, approach-distance control and authorized electrical personnel" },
        additionalControls: { tr: "Canlı bölümler çevresinde uygun sınırları belirle ve yetkisiz yaklaşmayı engelle", en: "Establish suitable boundaries around energized parts and prevent unauthorized approach" },
      },
      {
        hazard: { tr: "Hasarlı yalıtımlı el aleti kullanımı", en: "Use of damaged insulated tools" },
        consequence: { tr: "Elektrik çarpması veya kısa devre", en: "Electric shock or short circuit" },
        personsAtRisk: { tr: "Elektrik bakım personeli", en: "Electrical maintenance personnel" },
        existingControls: { tr: "Onaylı yalıtımlı aletler ve kullanım öncesi kontrol", en: "Approved insulated tools and pre-use inspection" },
        additionalControls: { tr: "Hasarlı yalıtımlı aletleri karantinaya al ve periyodik kontrol uygula", en: "Quarantine damaged insulated tools and implement periodic inspection" },
      },
],
  },

  {
    id: "loto",
    category: { tr: "Enerji İzolasyonu", en: "Energy Isolation" },
    activity: { tr: "LOTO / Enerji İzolasyonu", en: "LOTO / Energy Isolation" },
    items: [
      {
        hazard: { tr: "Beklenmeyen enerjilenme", en: "Unexpected energization" },
        consequence: { tr: "Ezilme, elektrik çarpması veya ölüm", en: "Crushing, electric shock or fatality" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Kilitleme, etiketleme ve doğrulanmış izolasyon", en: "Lockout, tagout and verified isolation" },
        additionalControls: { tr: "İşe başlamadan önce sıfır enerji kontrolü yap", en: "Verify zero-energy state before work" },
      },
      {
        hazard: { tr: "Depolanmış enerji", en: "Stored energy" },
        consequence: { tr: "Ani hareket veya basınç boşalması", en: "Unexpected movement or pressure release" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Basınç boşaltma, bloklama ve enerji salımı", en: "Pressure relief, blocking and energy dissipation" },
        additionalControls: { tr: "Tüm enerji kaynaklarını izolasyon listesinde doğrula", en: "Verify all energy sources on the isolation list" },
      },
      {
        hazard: { tr: "Yanlış izolasyon noktası", en: "Incorrect isolation point" },
        consequence: { tr: "Canlı enerji veya proses maruziyeti", en: "Exposure to live energy or process" },
        personsAtRisk: { tr: "Bakım ve operasyon personeli", en: "Maintenance and operations personnel" },
        existingControls: { tr: "Ekipman kimliği, çizim ve saha doğrulaması", en: "Equipment identification, drawings and field verification" },
        additionalControls: { tr: "Kritik izolasyonda bağımsız ikinci kontrol uygula", en: "Use independent second verification for critical isolations" },
      },
      // EXPANSION::loto
{
        hazard: { tr: "Vardiya değişiminde kilit transfer hatası", en: "Lock-transfer failure during shift change" },
        consequence: { tr: "Yetkisiz enerjilendirme", en: "Unauthorized re-energization" },
        personsAtRisk: { tr: "İzolasyon altında çalışan personel", en: "Personnel working under isolation" },
        existingControls: { tr: "Vardiya değişim prosedürü", en: "Shift-change procedure" },
        additionalControls: { tr: "Kilit devrini yazılı ve yüz yüze doğrulamayla yönet", en: "Manage lock transfer through documented and face-to-face verification" },
      },
      {
        hazard: { tr: "Birden fazla ekip için grup izolasyon hatası", en: "Group-isolation failure for multiple crews" },
        consequence: { tr: "Ekiplerden biri çalışırken sistemin enerjilenmesi", en: "System energization while another crew is still working" },
        personsAtRisk: { tr: "Tüm bakım ekipleri", en: "All maintenance crews" },
        existingControls: { tr: "Group lockbox sistemi", en: "Group lockbox system" },
        additionalControls: { tr: "Her çalışanın kişisel kilidinin grup izolasyonunda mevcut olduğunu doğrula", en: "Verify every worker's personal lock is applied to the group isolation" },
      },
      {
        hazard: { tr: "Kontrol enerjisinin izole edilmemesi", en: "Failure to isolate control energy" },
        consequence: { tr: "Beklenmeyen ekipman aktivasyonu", en: "Unexpected equipment activation" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "Elektrik, pnömatik, hidrolik ve mekanik enerji kontrolü", en: "Control of electrical, pneumatic, hydraulic and mechanical energy" },
        additionalControls: { tr: "Ana enerji dışında tüm yardımcı ve kontrol enerjilerini checklist ile doğrula", en: "Verify all auxiliary and control energies using a checklist" },
      },

          {
        hazard: { tr: "Yanlış enerji izolasyon noktasının kilitlenmesi", en: "Lockout of incorrect energy-isolation point" },
        consequence: { tr: "Tehlikeli enerjinin sistemde kalması", en: "Hazardous energy remaining in the system" },
        personsAtRisk: { tr: "Bakım ve operasyon personeli", en: "Maintenance and operations personnel" },
        existingControls: { tr: "LOTO prosedürü ve izolasyon listesi", en: "LOTO procedure and isolation list" },
        additionalControls: { tr: "İzolasyon noktalarını saha üzerinde bağımsız olarak doğrula", en: "Independently verify isolation points in the field" },
      },
      {
        hazard: { tr: "Vardiya değişiminde kilit kontrolünün kaybolması", en: "Loss of lock control during shift change" },
        consequence: { tr: "Beklenmedik enerjilenme ve ciddi yaralanma", en: "Unexpected energization and serious injury" },
        personsAtRisk: { tr: "Bakım personeli", en: "Maintenance personnel" },
        existingControls: { tr: "Kişisel kilit ve vardiya devir prosedürü", en: "Personal locks and shift-handover procedure" },
        additionalControls: { tr: "Vardiya değişiminde kilit transferini kayıtlı ve kontrollü gerçekleştir", en: "Perform documented and controlled lock transfer during shift change" },
      },
      {
        hazard: { tr: "İzolasyon sonrası sıfır enerji doğrulamasının yapılmaması", en: "Failure to verify zero energy after isolation" },
        consequence: { tr: "Beklenmedik hareket, basınç boşalması veya elektrik çarpması", en: "Unexpected movement, pressure release or electric shock" },
        personsAtRisk: { tr: "Bakım çalışanları", en: "Maintenance workers" },
        existingControls: { tr: "LOTO ve test-before-work uygulaması", en: "LOTO and test-before-work practice" },
        additionalControls: { tr: "İşe başlamadan önce tüm enerji türlerinde sıfır enerji durumunu test et", en: "Test zero-energy state for all energy sources before starting work" },
      },
],
  },

  {
    id: "forklift-operation",
    category: { tr: "Mobil Ekipman", en: "Mobile Equipment" },
    activity: { tr: "Forklift Operasyonu", en: "Forklift Operation" },
    items: [
      {
        hazard: { tr: "Yaya ile çarpışma", en: "Collision with pedestrian" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Yayalar ve saha çalışanları", en: "Pedestrians and site workers" },
        existingControls: { tr: "Araç-yaya ayrımı, yetkili operatör ve belirlenmiş trafik yolu", en: "Vehicle-pedestrian separation, authorized operator and designated traffic route" },
        additionalControls: { tr: "Kör noktalarda spotter veya fiziksel ayrım uygula", en: "Use spotters or physical separation in blind areas" },
      },
      {
        hazard: { tr: "Forklift devrilmesi", en: "Forklift overturn" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Uygun hız, kapasite kontrolü, emniyet kemeri ve güvenli zemin", en: "Suitable speed, capacity control, seat belt and safe ground" },
        additionalControls: { tr: "Eğim ve dönüş alanlarını önceden değerlendir", en: "Assess slopes and turning areas beforehand" },
      },
      {
        hazard: { tr: "Yük düşmesi", en: "Falling load" },
        consequence: { tr: "Ezilme veya malzeme hasarı", en: "Crushing or material damage" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Dengeli yük, kapasite kontrolü ve güvenli taşıma yüksekliği", en: "Stable load, capacity verification and safe travel height" },
        additionalControls: { tr: "Dengesiz yükü taşımaya başlama", en: "Do not move unstable loads" },
      },
      // SAFEBASE_PACK02::forklift-operation
      {
        hazard: { tr: "Kör noktada görüş kaybı", en: "Restricted visibility at blind spots" },
        consequence: { tr: "Yaya veya ekipmanla çarpışma", en: "Collision with pedestrians or equipment" },
        personsAtRisk: { tr: "Yayalar ve operatör", en: "Pedestrians and operator" },
        existingControls: { tr: "Korna, hız kontrolü ve belirlenmiş trafik yolları", en: "Horn, speed control and designated traffic routes" },
        additionalControls: { tr: "Kritik kör noktalarda ayna, spotter veya fiziksel ayrım kullan", en: "Use mirrors, spotters or physical separation at critical blind spots" },
      },
      {
        hazard: { tr: "Forkların yüksek konumda taşınması", en: "Travelling with forks elevated" },
        consequence: { tr: "Devrilme veya personele çarpma", en: "Overturn or impact with personnel" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby personnel" },
        existingControls: { tr: "Güvenli seyir yüksekliği ve operatör eğitimi", en: "Safe travelling height and operator training" },
        additionalControls: { tr: "Seyir sırasında forkları üreticiye uygun düşük konumda tut", en: "Keep forks in the manufacturer-recommended low travel position" },
      },
      {
        hazard: { tr: "Şarj veya yakıt ikmali sırasında yangın", en: "Fire during charging or refueling" },
        consequence: { tr: "Yanık, yangın veya ekipman hasarı", en: "Burns, fire or equipment damage" },
        personsAtRisk: { tr: "Operatör ve bakım personeli", en: "Operator and maintenance personnel" },
        existingControls: { tr: "Belirlenmiş şarj veya yakıt ikmal alanı", en: "Designated charging or refueling area" },
        additionalControls: { tr: "Ateş kaynaklarını uzaklaştır ve uygun havalandırmayı doğrula", en: "Remove ignition sources and verify suitable ventilation" },
      },
          {
        hazard: { tr: "Forklift çatallarından yük düşmesi", en: "Load falling from forklift forks" },
        consequence: { tr: "Ezilme, çarpma veya ölüm", en: "Crushing, impact or fatality" },
        personsAtRisk: { tr: "Forklift çevresindeki çalışanlar", en: "Personnel around the forklift" },
        existingControls: { tr: "Yük kapasitesi kontrolü ve uygun yükleme", en: "Load-capacity checks and proper loading" },
        additionalControls: { tr: "Dengesiz yükleri sabitle ve yükle seyir sırasında çatalları düşük tut", en: "Secure unstable loads and keep forks low while travelling" },
      },
      {
        hazard: { tr: "Forkliftin yaya ile çarpışması", en: "Forklift collision with pedestrian" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Yayalar ve forklift operatörü", en: "Pedestrians and forklift operator" },
        existingControls: { tr: "Belirlenmiş trafik yolları ve eğitimli operatör", en: "Designated traffic routes and trained operator" },
        additionalControls: { tr: "Yaya ve forklift güzergahlarını fiziksel olarak ayır", en: "Physically segregate pedestrian and forklift routes" },
      },
      {
        hazard: { tr: "Rampa veya eğimde forklift kontrolünün kaybı", en: "Loss of forklift control on ramp or slope" },
        consequence: { tr: "Devrilme, çarpışma veya yük kaybı", en: "Overturn, collision or dropped load" },
        personsAtRisk: { tr: "Forklift operatörü ve yakındaki personel", en: "Forklift operator and nearby personnel" },
        existingControls: { tr: "Hız limiti ve uygun sürüş prosedürü", en: "Speed limits and proper driving procedure" },
        additionalControls: { tr: "Eğimlerde dönüş yapmayı sınırla ve üretici talimatına uygun seyret", en: "Restrict turning on slopes and travel according to manufacturer instructions" },
      },
],
  },

  {
    id: "mobile-crane",
    category: { tr: "Kaldırma", en: "Lifting" },
    activity: { tr: "Mobil Vinç Operasyonu", en: "Mobile Crane Operation" },
    items: [
      {
        hazard: { tr: "Vinç devrilmesi", en: "Crane overturn" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Operatör ve kaldırma ekibi", en: "Operator and lifting team" },
        existingControls: { tr: "Zemin değerlendirmesi, outrigger kurulumu ve kapasite sınırları", en: "Ground assessment, outrigger setup and capacity limits" },
        additionalControls: { tr: "Kurulum koşulları değişirse operasyonu yeniden doğrula", en: "Revalidate operation if setup conditions change" },
      },
      {
        hazard: { tr: "Askıdaki yük düşmesi", en: "Suspended load drop" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Kaldırma ekibi", en: "Lifting team" },
        existingControls: { tr: "Kaldırma planı, uygun rigging ve dışlama alanı", en: "Lift plan, suitable rigging and exclusion zone" },
        additionalControls: { tr: "Yük altında personel bulunmasını engelle", en: "Prevent personnel from being under suspended loads" },
      },
      {
        hazard: { tr: "Enerji hattına yaklaşma", en: "Approach to overhead power lines" },
        consequence: { tr: "Elektrik çarpması veya ölüm", en: "Electric shock or fatality" },
        personsAtRisk: { tr: "Operatör ve kaldırma ekibi", en: "Operator and lifting team" },
        existingControls: { tr: "Hat tespiti, mesafe kontrolü ve işaretçi", en: "Power-line identification, clearance control and signal person" },
        additionalControls: { tr: "Güvenli yaklaşma mesafesini saha planında doğrula", en: "Verify safe clearance in the site lift plan" },
      },
      // EXPANSION::mobile-crane
{
        hazard: { tr: "Rüzgar nedeniyle yük kontrolünün kaybı", en: "Loss of load control due to wind" },
        consequence: { tr: "Yük salınımı, çarpma veya devrilme", en: "Load swing, impact or overturn" },
        personsAtRisk: { tr: "Kaldırma ekibi ve çevre personeli", en: "Lifting team and nearby personnel" },
        existingControls: { tr: "Rüzgar takibi ve üretici limitleri", en: "Wind monitoring and manufacturer limits" },
        additionalControls: { tr: "Rüzgar limiti aşıldığında kaldırmayı durdur", en: "Stop lifting when wind limits are exceeded" },
      },
      {
        hazard: { tr: "Outrigger altında zemin çökmesi", en: "Ground failure beneath outrigger" },
        consequence: { tr: "Vinç devrilmesi", en: "Crane overturn" },
        personsAtRisk: { tr: "Operatör ve kaldırma ekibi", en: "Operator and lifting team" },
        existingControls: { tr: "Zemin değerlendirmesi ve uygun outrigger mat", en: "Ground assessment and suitable outrigger mats" },
        additionalControls: { tr: "Yeraltı boşlukları ve zemin taşıma kapasitesini kritik kaldırmalarda doğrula", en: "Verify underground voids and ground-bearing capacity for critical lifts" },
      },
      {
        hazard: { tr: "İletişim kaybı", en: "Communication failure" },
        consequence: { tr: "Kontrolsüz vinç veya yük hareketi", en: "Uncontrolled crane or load movement" },
        personsAtRisk: { tr: "Kaldırma ekibi", en: "Lifting team" },
        existingControls: { tr: "Belirlenmiş işaretçi ve radyo iletişimi gerektiğinde", en: "Designated signal person and radio communication where required" },
        additionalControls: { tr: "İletişim belirsiz veya kesilmişse tüm hareketi durdur", en: "Stop all movement if communication is unclear or lost" },
      },

          {
        hazard: { tr: "Vinç bomunun enerji hattına yaklaşması", en: "Crane boom approaching overhead power lines" },
        consequence: { tr: "Elektrik çarpması veya ölüm", en: "Electric shock or fatality" },
        personsAtRisk: { tr: "Vinç ekibi ve çevredeki personel", en: "Crane crew and surrounding personnel" },
        existingControls: { tr: "Kaldırma planı ve saha tehlike kontrolü", en: "Lift plan and work-area hazard assessment" },
        additionalControls: { tr: "Enerji hatlarına güvenli yaklaşma mesafesini belirle ve gerektiğinde spotter kullan", en: "Establish safe clearance from power lines and use a spotter where required" },
      },
      {
        hazard: { tr: "Outrigger altında zemin göçmesi", en: "Ground failure beneath crane outrigger" },
        consequence: { tr: "Vinç devrilmesi ve ölümcül yaralanma", en: "Crane overturn and fatal injury" },
        personsAtRisk: { tr: "Vinç operatörü ve kaldırma alanındaki personel", en: "Crane operator and personnel in the lifting area" },
        existingControls: { tr: "Zemin değerlendirmesi ve uygun outrigger padleri", en: "Ground assessment and suitable outrigger pads" },
        additionalControls: { tr: "Zemin taşıma kapasitesini doğrula ve yük dağıtımını hesapla", en: "Verify ground-bearing capacity and calculate load distribution" },
      },
      {
        hazard: { tr: "Kaldırma sırasında iletişim kaybı", en: "Loss of communication during lifting operation" },
        consequence: { tr: "Kontrolsüz yük hareketi veya çarpışma", en: "Uncontrolled load movement or collision" },
        personsAtRisk: { tr: "Vinç operatörü, banksman ve rigging ekibi", en: "Crane operator, banksman and rigging crew" },
        existingControls: { tr: "Standart el işaretleri ve belirlenmiş banksman", en: "Standard hand signals and designated banksman" },
        additionalControls: { tr: "Görüş kaybında telsiz iletişimi kullan ve iletişim kesilirse kaldırmayı durdur", en: "Use radio communication when visibility is lost and stop the lift if communication fails" },
      },
],
  },

  {
    id: "lifting-operations",
    category: { tr: "Kaldırma", en: "Lifting" },
    activity: { tr: "Kaldırma Operasyonları", en: "Lifting Operations" },
    items: [
      {
        hazard: { tr: "Rigging ekipmanı arızası", en: "Rigging equipment failure" },
        consequence: { tr: "Yük düşmesi ve ciddi yaralanma", en: "Dropped load and serious injury" },
        personsAtRisk: { tr: "Rigging ekibi", en: "Rigging crew" },
        existingControls: { tr: "Sapan, mapa, kanca kontrolü ve WLL doğrulaması", en: "Inspection of slings, shackles and hooks with WLL verification" },
        additionalControls: { tr: "Kimliği veya kapasitesi okunmayan ekipmanı kullanma", en: "Do not use equipment with unreadable identification or capacity" },
      },
      {
        hazard: { tr: "Kontrolsüz yük salınımı", en: "Uncontrolled load swing" },
        consequence: { tr: "Çarpma veya sıkışma", en: "Impact or crushing" },
        personsAtRisk: { tr: "Rigging ekibi ve yakın çalışanlar", en: "Rigging crew and nearby workers" },
        existingControls: { tr: "Kontrollü kaldırma yolu ve gerektiğinde tag line", en: "Controlled lift path and tag line where required" },
        additionalControls: { tr: "Rüzgar koşullarını operasyon boyunca izle", en: "Monitor wind conditions throughout the operation" },
      },
      {
        hazard: { tr: "Kapasite aşımı", en: "Overloading" },
        consequence: { tr: "Ekipman arızası veya yük düşmesi", en: "Equipment failure or dropped load" },
        personsAtRisk: { tr: "Kaldırma ekibi", en: "Lifting team" },
        existingControls: { tr: "Yük ağırlığı ve tüm kaldırma bileşenlerinin kapasite doğrulaması", en: "Verification of load weight and all lifting-component capacities" },
        additionalControls: { tr: "Şüpheli ağırlıkları kaldırma öncesi doğrula", en: "Verify uncertain load weights before lifting" },
      },
      // PACK01_BATCH::lifting-operations
      {
        hazard: { tr: "Askı ekipmanının yanlış seçilmesi", en: "Incorrect selection of lifting accessory" },
        consequence: { tr: "Askı ekipmanı arızası ve yük düşmesi", en: "Lifting accessory failure and dropped load" },
        personsAtRisk: { tr: "Kaldırma ekibi ve çevredeki çalışanlar", en: "Lifting team and nearby personnel" },
        existingControls: { tr: "Yüke uygun sapan, mapa ve aksesuar seçimi", en: "Selection of slings, shackles and accessories suitable for the load" },
        additionalControls: { tr: "SWL/WLL, açı ve yük geometrisini kaldırma öncesi doğrula", en: "Verify SWL/WLL, sling angles and load geometry before lifting" },
      },
      {
        hazard: { tr: "Personelin askıdaki yük altında bulunması", en: "Personnel beneath suspended load" },
        consequence: { tr: "Ezilme, ciddi yaralanma veya ölüm", en: "Crushing, serious injury or fatality" },
        personsAtRisk: { tr: "Tüm saha personeli", en: "All site personnel" },
        existingControls: { tr: "Dışlama alanı ve kaldırma gözetimi", en: "Exclusion zone and lifting supervision" },
        additionalControls: { tr: "Askıdaki yük altında ve yük hareket hattında personel bulunmasını engelle", en: "Prevent personnel from entering beneath suspended loads or the load path" },
      },
      {
        hazard: { tr: "Tag line kontrolünün kaybedilmesi", en: "Loss of tag-line control" },
        consequence: { tr: "Yükün dönmesi veya personele çarpması", en: "Load rotation or impact with personnel" },
        personsAtRisk: { tr: "Rigging ekibi", en: "Rigging crew" },
        existingControls: { tr: "Uygun tag line ve kontrollü yönlendirme", en: "Suitable tag lines and controlled load guidance" },
        additionalControls: { tr: "Tag line kullanımının ek risk oluşturduğu durumları kaldırma öncesi değerlendir", en: "Assess whether tag-line use introduces additional hazards before lifting" },
      },
      {
        hazard: { tr: "Kaldırma sırasında yükün kontrolsüz dönmesi", en: "Uncontrolled load rotation during lifting" },
        consequence: { tr: "Yükün personele veya ekipmana çarpması", en: "Load striking personnel or equipment" },
        personsAtRisk: { tr: "Rigging ekibi ve çevredeki çalışanlar", en: "Rigging crew and nearby personnel" },
        existingControls: { tr: "Tag line, kontrollü kaldırma ve yetkin rigger", en: "Tag lines, controlled lifting and competent riggers" },
        additionalControls: { tr: "Yük geometrisini değerlendir ve dönme riskine karşı uygun yönlendirme yöntemi kullan", en: "Assess load geometry and use a suitable method to control rotation" },
      },
      {
        hazard: { tr: "Askı ekipmanında görünmeyen hasar", en: "Hidden damage in lifting accessories" },
        consequence: { tr: "Askı ekipmanı arızası ve yük düşmesi", en: "Lifting-accessory failure and dropped load" },
        personsAtRisk: { tr: "Kaldırma ekibi ve çevredeki çalışanlar", en: "Lifting team and nearby personnel" },
        existingControls: { tr: "Sertifikalı lifting accessories ve pre-use inspection", en: "Certified lifting accessories and pre-use inspection" },
        additionalControls: { tr: "Periyodik detaylı muayene kayıtlarını doğrula ve şüpheli ekipmanı karantinaya al", en: "Verify periodic thorough-inspection records and quarantine suspect equipment" },
      },
      {
        hazard: { tr: "Yük merkezinin yanlış değerlendirilmesi", en: "Incorrect assessment of load center of gravity" },
        consequence: { tr: "Yükün ani kayması veya kontrolsüz eğilmesi", en: "Sudden load shift or uncontrolled tilting" },
        personsAtRisk: { tr: "Rigging ekibi", en: "Rigging crew" },
        existingControls: { tr: "Lift plan ve uygun sling arrangement", en: "Lift plan and suitable sling arrangement" },
        additionalControls: { tr: "Kaldırma öncesi ağırlık merkezi ve trial lift ile stabiliteyi doğrula", en: "Verify center of gravity and stability with a trial lift before the main lift" },
      }
    ],
  },

  {
    id: "banksman",
    category: { tr: "Kaldırma / Trafik", en: "Lifting / Traffic" },
    activity: { tr: "İşaretçi / Banksman Operasyonu", en: "Banksman / Signal Person Operation" },
    items: [
      {
        hazard: { tr: "Yanlış veya belirsiz sinyal", en: "Incorrect or unclear signal" },
        consequence: { tr: "Kontrolsüz araç veya yük hareketi", en: "Uncontrolled vehicle or load movement" },
        personsAtRisk: { tr: "Operatör, işaretçi ve çevredeki çalışanlar", en: "Operator, signal person and nearby workers" },
        existingControls: { tr: "Yetkin işaretçi ve standart sinyal yöntemi", en: "Qualified signal person and standard signalling method" },
        additionalControls: { tr: "Sinyal belirsizse hareketi durdur", en: "Stop movement if signals are unclear" },
      },
      {
        hazard: { tr: "İşaretçinin kör noktada kalması", en: "Signal person entering a blind spot" },
        consequence: { tr: "Çarpılma veya ezilme", en: "Struck-by or crushing injury" },
        personsAtRisk: { tr: "İşaretçi", en: "Signal person" },
        existingControls: { tr: "Görüş hattı ve güvenli pozisyon", en: "Line of sight and safe positioning" },
        additionalControls: { tr: "Görüş kaybolursa operasyonu durdur", en: "Stop operation if visual contact is lost" },
      },
      {
        hazard: { tr: "Dönüş alanında bulunma", en: "Presence in swing radius" },
        consequence: { tr: "Sıkışma veya ezilme", en: "Crushing or pinch injury" },
        personsAtRisk: { tr: "İşaretçi ve diğer çalışanlar", en: "Signal person and other workers" },
        existingControls: { tr: "Dönüş alanı kontrolü ve bariyerleme", en: "Swing-radius control and barricading" },
        additionalControls: { tr: "İşaretçi pozisyonunu hareket öncesi doğrula", en: "Verify signal-person position before movement" },
      },
      // PACK01_BATCH::banksman
      {
        hazard: { tr: "Operatör ile banksman arasında iletişim kaybı", en: "Loss of communication between operator and banksman" },
        consequence: { tr: "Kontrolsüz araç hareketi veya çarpışma", en: "Uncontrolled vehicle movement or collision" },
        personsAtRisk: { tr: "Banksman, operatör ve yayalar", en: "Banksman, operator and pedestrians" },
        existingControls: { tr: "Standart el işaretleri ve gerektiğinde radyo", en: "Standard hand signals and radio where required" },
        additionalControls: { tr: "İletişim kaybolduğunda tüm araç hareketini durdur", en: "Stop all vehicle movement when communication is lost" },
      },
      {
        hazard: { tr: "Banksman'ın aracın kör noktasında bulunması", en: "Banksman positioned in vehicle blind spot" },
        consequence: { tr: "Ezilme veya ciddi yaralanma", en: "Crushing or serious injury" },
        personsAtRisk: { tr: "Banksman", en: "Banksman" },
        existingControls: { tr: "Güvenli görüş pozisyonu ve araç-yaya ayrımı", en: "Safe visible position and vehicle-pedestrian segregation" },
        additionalControls: { tr: "Banksman'ın operatör tarafından sürekli görülebileceği pozisyonu koru", en: "Maintain a position where the banksman remains continuously visible to the operator" },
      },
      {
        hazard: { tr: "Yetkisiz kişinin yönlendirmeye müdahale etmesi", en: "Unauthorized person interfering with signaling" },
        consequence: { tr: "Yanlış manevra ve çarpışma", en: "Incorrect maneuver and collision" },
        personsAtRisk: { tr: "Operatör ve saha çalışanları", en: "Operator and site personnel" },
        existingControls: { tr: "Tek yetkili banksman belirlenmesi", en: "Designation of a single authorized banksman" },
        additionalControls: { tr: "Operatörün yalnızca belirlenmiş banksman talimatlarını takip etmesini sağla", en: "Ensure the operator follows instructions only from the designated banksman" },
      },
      {
        hazard: { tr: "Banksman'ın line-of-fire alanında durması", en: "Banksman standing in the line of fire" },
        consequence: { tr: "Araç veya ekipman tarafından ezilme", en: "Crushing by vehicle or equipment" },
        personsAtRisk: { tr: "Banksman", en: "Banksman" },
        existingControls: { tr: "Belirlenmiş güvenli pozisyon ve görünürlük", en: "Designated safe position and visibility" },
        additionalControls: { tr: "Banksman için kaçış yolu bırak ve hareket hattı dışında konumlanmasını sağla", en: "Maintain an escape route and position the banksman outside the movement path" },
      },
      {
        hazard: { tr: "Birden fazla kişinin aynı anda işaret vermesi", en: "Multiple persons giving signals simultaneously" },
        consequence: { tr: "Operatörün yanlış manevra yapması", en: "Operator performing an incorrect maneuver" },
        personsAtRisk: { tr: "Operatör, banksman ve saha çalışanları", en: "Operator, banksman and site personnel" },
        existingControls: { tr: "Tek yetkili banksman sistemi", en: "Single designated banksman system" },
        additionalControls: { tr: "Operatöre yalnızca belirlenmiş banksman talimatlarını takip etmesi gerektiğini teyit et", en: "Confirm the operator follows instructions only from the designated banksman" },
      },
      {
        hazard: { tr: "Düşük görüş koşullarında yönlendirme", en: "Guiding operations in poor visibility" },
        consequence: { tr: "Araç çarpışması veya yaya ezilmesi", en: "Vehicle collision or pedestrian crushing" },
        personsAtRisk: { tr: "Banksman ve saha personeli", en: "Banksman and site personnel" },
        existingControls: { tr: "Reflektif PPE ve uygun saha aydınlatması", en: "Reflective PPE and suitable site lighting" },
        additionalControls: { tr: "Gece veya düşük görüşte ek aydınlatma ve gerektiğinde radyo iletişimi kullan", en: "Use additional lighting and radio communication where required in poor visibility" },
      }
    ],
  },

  {
    id: "grinding",
    category: { tr: "El Aletleri", en: "Power Tools" },
    activity: { tr: "Taşlama", en: "Grinding" },
    items: [
      {
        hazard: { tr: "Disk kırılması", en: "Disc failure" },
        consequence: { tr: "Kesilme veya ciddi yaralanma", en: "Laceration or serious injury" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Uygun disk, koruyucu muhafaza ve kullanım öncesi kontrol", en: "Correct disc, guard and pre-use inspection" },
        additionalControls: { tr: "Hasarlı veya uyumsuz diski kullanma", en: "Do not use damaged or incompatible discs" },
      },
      {
        hazard: { tr: "Kıvılcım ve sıcak parçacık", en: "Sparks and hot particles" },
        consequence: { tr: "Göz yaralanması, yanık veya yangın", en: "Eye injury, burns or fire" },
        personsAtRisk: { tr: "Operatör ve çevredeki çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Göz/yüz koruması ve çalışma alanı kontrolü", en: "Eye/face protection and work-area control" },
        additionalControls: { tr: "Yanıcı malzemeleri kıvılcım alanından uzaklaştır", en: "Remove combustibles from the spark travel area" },
      },
      {
        hazard: { tr: "Gürültü ve titreşim", en: "Noise and vibration" },
        consequence: { tr: "İşitme etkisi veya el-kol rahatsızlığı", en: "Hearing effects or hand-arm disorders" },
        personsAtRisk: { tr: "Operatör", en: "Operator" },
        existingControls: { tr: "Uygun ekipman, maruziyet kontrolü ve işitme koruması", en: "Suitable equipment, exposure control and hearing protection" },
        additionalControls: { tr: "Uzun süreli maruziyeti sınırla", en: "Limit prolonged exposure" },
      },
      // PACK01_BATCH::grinding
      {
        hazard: { tr: "Taşlama diskinin parçalanması", en: "Grinding disc rupture" },
        consequence: { tr: "Kesik, göz yaralanması veya ciddi travma", en: "Cut, eye injury or serious trauma" },
        personsAtRisk: { tr: "Taşlama operatörü ve yakın çalışanlar", en: "Grinding operator and nearby personnel" },
        existingControls: { tr: "Uygun disk seçimi, guard ve kullanım öncesi kontrol", en: "Correct disc selection, guard and pre-use inspection" },
        additionalControls: { tr: "Disk RPM değerinin makine hızına uygunluğunu doğrula", en: "Verify the disc RPM rating is suitable for the grinder speed" },
      },
      {
        hazard: { tr: "Kıvılcımın yanıcı malzemelere ulaşması", en: "Grinding sparks reaching combustible materials" },
        consequence: { tr: "Yangın veya patlama", en: "Fire or explosion" },
        personsAtRisk: { tr: "Operatör ve çevredeki çalışanlar", en: "Operator and nearby personnel" },
        existingControls: { tr: "Yanıcıların kaldırılması ve sıcak çalışma kontrolü", en: "Removal of combustibles and hot-work controls" },
        additionalControls: { tr: "Kıvılcım yönünü, alt seviyeleri ve gizli boşlukları kontrol et", en: "Control spark direction, lower levels and hidden openings" },
      },
      {
        hazard: { tr: "Yüksek gürültü ve titreşim", en: "High noise and vibration" },
        consequence: { tr: "İşitme kaybı veya el-kol titreşim etkisi", en: "Hearing loss or hand-arm vibration effects" },
        personsAtRisk: { tr: "Taşlama operatörü", en: "Grinding operator" },
        existingControls: { tr: "İşitme koruması ve uygun ekipman", en: "Hearing protection and suitable equipment" },
        additionalControls: { tr: "Maruziyet süresini ve ekipmanın titreşim durumunu kontrol et", en: "Control exposure duration and equipment vibration condition" },
      },
      {
        hazard: { tr: "Taşlama makinesinde guard bulunmaması", en: "Missing grinder guard" },
        consequence: { tr: "Disk parçalarının operatöre çarpması", en: "Disc fragments striking the operator" },
        personsAtRisk: { tr: "Taşlama operatörü", en: "Grinding operator" },
        existingControls: { tr: "Makine guardı ve kullanım öncesi kontrol", en: "Machine guard and pre-use inspection" },
        additionalControls: { tr: "Guardı eksik veya uygun pozisyonda olmayan taşlama makinesini kullanım dışı bırak", en: "Remove grinders with missing or improperly positioned guards from service" },
      },
      {
        hazard: { tr: "Kesilen veya taşlanan parçanın sabitlenmemesi", en: "Workpiece not securely restrained" },
        consequence: { tr: "Parçanın hareket etmesi veya fırlaması", en: "Workpiece movement or ejection" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby personnel" },
        existingControls: { tr: "Mengene veya uygun workpiece securing", en: "Vice or suitable workpiece securing" },
        additionalControls: { tr: "Taşlama başlamadan parçayı mekanik olarak sabitle", en: "Mechanically secure the workpiece before grinding" },
      },
      {
        hazard: { tr: "Kablo veya uzatma hattının hasar görmesi", en: "Damage to grinder cable or extension lead" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Taşlama operatörü", en: "Grinding operator" },
        existingControls: { tr: "Elektrik kablosu kontrolü ve uygun RCD", en: "Cable inspection and suitable RCD protection" },
        additionalControls: { tr: "Kabloları kıvılcım, keskin kenar ve araç trafiğinden koru", en: "Protect cables from sparks, sharp edges and vehicle traffic" },
      }
    ],
  },

  {
    id: "welding",
    category: { tr: "Sıcak Çalışma", en: "Hot Work" },
    activity: { tr: "Kaynak", en: "Welding" },
    items: [
      {
        hazard: { tr: "Ark radyasyonu", en: "Arc radiation" },
        consequence: { tr: "Göz ve cilt hasarı", en: "Eye and skin injury" },
        personsAtRisk: { tr: "Kaynakçı ve yakın çalışanlar", en: "Welder and nearby workers" },
        existingControls: { tr: "Uygun kaynak maskesi ve ekranlama", en: "Suitable welding helmet and screening" },
        additionalControls: { tr: "Yakın çalışma alanlarını ışın maruziyetinden koru", en: "Protect adjacent work areas from arc exposure" },
      },
      {
        hazard: { tr: "Kaynak dumanı", en: "Welding fumes" },
        consequence: { tr: "Solunum yolu rahatsızlığı", en: "Respiratory illness" },
        personsAtRisk: { tr: "Kaynakçı", en: "Welder" },
        existingControls: { tr: "Havalandırma ve maruziyet kontrolü", en: "Ventilation and exposure controls" },
        additionalControls: { tr: "Gerekirse lokal emiş sistemi kullan", en: "Use local exhaust ventilation where required" },
      },
      {
        hazard: { tr: "Yangın", en: "Fire" },
        consequence: { tr: "Yanık veya ekipman hasarı", en: "Burns or equipment damage" },
        personsAtRisk: { tr: "Çalışma alanındaki personel", en: "Personnel in work area" },
        existingControls: { tr: "Sıcak çalışma izni ve fire watch", en: "Hot-work permit and fire watch" },
        additionalControls: { tr: "İş sonrası yangın gözetimini saha kuralına göre sürdür", en: "Continue post-work fire watch according to site requirements" },
      },
      // PACK01_BATCH::welding
      {
        hazard: { tr: "Kaynak ark ışınına maruziyet", en: "Exposure to welding arc radiation" },
        consequence: { tr: "Göz hasarı veya cilt yanığı", en: "Eye damage or skin burns" },
        personsAtRisk: { tr: "Kaynakçı ve yakın çalışanlar", en: "Welder and nearby personnel" },
        existingControls: { tr: "Kaynak maskesi, uygun filtre ve kaynak perdesi", en: "Welding helmet, suitable filter and welding screens" },
        additionalControls: { tr: "Yakın çalışanları ark ışınından fiziksel perde ile koru", en: "Protect nearby personnel from arc radiation using physical screens" },
      },
      {
        hazard: { tr: "Kaynak dumanının birikmesi", en: "Accumulation of welding fumes" },
        consequence: { tr: "Solunum sistemi etkileri veya zehirlenme", en: "Respiratory effects or poisoning" },
        personsAtRisk: { tr: "Kaynakçı ve çevre personeli", en: "Welder and surrounding personnel" },
        existingControls: { tr: "Doğal veya mekanik havalandırma", en: "Natural or mechanical ventilation" },
        additionalControls: { tr: "Gerekli olduğunda lokal emiş veya uygun solunum koruması kullan", en: "Use local extraction or suitable respiratory protection where required" },
      },
      {
        hazard: { tr: "Kaynak kablosu veya elektrot tutucunun hasarlı olması", en: "Damaged welding cable or electrode holder" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Kaynakçı", en: "Welder" },
        existingControls: { tr: "Kullanım öncesi elektrik ekipmanı kontrolü", en: "Pre-use inspection of electrical welding equipment" },
        additionalControls: { tr: "Hasarlı kablo, bağlantı veya holder ekipmanını derhal kullanım dışı bırak", en: "Immediately remove damaged cables, connections or holders from service" },
      },
      {
        hazard: { tr: "Kaynak yapılan yüzeyde yanıcı kaplama bulunması", en: "Flammable coating on welding surface" },
        consequence: { tr: "Yangın veya toksik duman oluşumu", en: "Fire or toxic-fume generation" },
        personsAtRisk: { tr: "Kaynakçı ve çevredeki çalışanlar", en: "Welder and nearby personnel" },
        existingControls: { tr: "Hot-work permit ve yüzey kontrolü", en: "Hot-work permit and surface inspection" },
        additionalControls: { tr: "Kaynak öncesi boya, solvent veya yanıcı kaplamayı uygun şekilde uzaklaştır", en: "Remove paint, solvent or flammable coating appropriately before welding" },
      },
      {
        hazard: { tr: "Islak ortamda kaynak yapılması", en: "Welding in wet conditions" },
        consequence: { tr: "Elektrik çarpması", en: "Electric shock" },
        personsAtRisk: { tr: "Kaynakçı", en: "Welder" },
        existingControls: { tr: "Uygun kaynak ekipmanı ve kuru çalışma alanı", en: "Suitable welding equipment and dry work area" },
        additionalControls: { tr: "Islak yüzeyleri ortadan kaldır ve kaynakçıyı elektriksel olarak izole edilmiş kuru konumda tut", en: "Eliminate wet conditions and keep the welder in a dry electrically isolated position" },
      },
      {
        hazard: { tr: "Kaynak tüplerinin yanlış konumlandırılması", en: "Improper positioning of welding gas cylinders" },
        consequence: { tr: "Tüp devrilmesi, yangın veya hasar", en: "Cylinder fall, fire or damage" },
        personsAtRisk: { tr: "Kaynakçı ve çevredeki personel", en: "Welder and nearby personnel" },
        existingControls: { tr: "Tüp sabitleme ve gaz segregasyonu", en: "Cylinder securing and gas segregation" },
        additionalControls: { tr: "Tüpleri dik sabitle ve sıcak yüzeylerden ve kaynak kıvılcımlarından uzak tut", en: "Secure cylinders upright and keep them away from hot surfaces and welding sparks" },
      }
    ],
  },

  {
    id: "manual-handling",
    category: { tr: "Ergonomi", en: "Ergonomics" },
    activity: { tr: "Elle Taşıma", en: "Manual Handling" },
    items: [
      {
        hazard: { tr: "Ağır veya uygunsuz yük", en: "Heavy or awkward load" },
        consequence: { tr: "Bel ve kas-iskelet yaralanması", en: "Back and musculoskeletal injury" },
        personsAtRisk: { tr: "Yükü taşıyan çalışanlar", en: "Workers handling the load" },
        existingControls: { tr: "Yük değerlendirmesi, doğru kaldırma tekniği ve yardım", en: "Load assessment, correct lifting technique and assistance" },
        additionalControls: { tr: "Mekanik yardım veya ekip kaldırmayı önceliklendir", en: "Prioritize mechanical aids or team lifting" },
      },
      {
        hazard: { tr: "Burularak kaldırma", en: "Twisting while lifting" },
        consequence: { tr: "Bel veya kas zorlanması", en: "Back or muscle strain" },
        personsAtRisk: { tr: "Taşıma yapan çalışanlar", en: "Workers performing handling" },
        existingControls: { tr: "Yüke yakın duruş ve ayaklarla yön değiştirme", en: "Close positioning and turning with the feet" },
        additionalControls: { tr: "Çalışma yüksekliğini ergonomik hale getir", en: "Improve working height and ergonomics" },
      },
      {
        hazard: { tr: "Yükün el veya ayağa düşmesi", en: "Load dropped onto hands or feet" },
        consequence: { tr: "Ezilme veya kırık", en: "Crushing or fracture" },
        personsAtRisk: { tr: "Taşıma yapan çalışanlar", en: "Workers handling the load" },
        existingControls: { tr: "Güvenli kavrama ve uygun taşıma yöntemi", en: "Secure grip and suitable handling method" },
        additionalControls: { tr: "Dengesiz yüklerde taşıma yardım ekipmanı kullan", en: "Use handling aids for unstable loads" },
      },
      // PACK01_BATCH::manual-handling
      {
        hazard: { tr: "Aşırı ağır yükün elle kaldırılması", en: "Manual lifting of excessive load" },
        consequence: { tr: "Bel, omuz veya kas-iskelet yaralanması", en: "Back, shoulder or musculoskeletal injury" },
        personsAtRisk: { tr: "Malzeme taşıyan çalışanlar", en: "Personnel handling materials" },
        existingControls: { tr: "Yük değerlendirmesi ve ekip kaldırma", en: "Load assessment and team lifting" },
        additionalControls: { tr: "Uygun olduğunda mekanik kaldırma veya taşıma ekipmanı kullan", en: "Use mechanical lifting or handling equipment where practicable" },
      },
      {
        hazard: { tr: "Yük taşırken görüşün kapanması", en: "Obstructed vision while carrying a load" },
        consequence: { tr: "Takılma, düşme veya çarpışma", en: "Trip, fall or collision" },
        personsAtRisk: { tr: "Malzeme taşıyan çalışanlar", en: "Personnel handling materials" },
        existingControls: { tr: "Güvenli taşıma güzergahı", en: "Safe handling route" },
        additionalControls: { tr: "Görüşü kapatan yüklerde ikinci kişi veya taşıma ekipmanı kullan", en: "Use a second person or handling equipment where the load obstructs vision" },
      },
      {
        hazard: { tr: "Yükün keskin veya sıcak yüzeye sahip olması", en: "Load with sharp or hot surfaces" },
        consequence: { tr: "Kesik veya yanık", en: "Cut or burn injury" },
        personsAtRisk: { tr: "Malzeme taşıyan çalışanlar", en: "Personnel handling materials" },
        existingControls: { tr: "Uygun eldiven ve yük kontrolü", en: "Suitable gloves and load inspection" },
        additionalControls: { tr: "Taşıma öncesi yükün yüzey ve sıcaklık tehlikelerini değerlendir", en: "Assess surface and temperature hazards before handling" },
      },
      {
        hazard: { tr: "Yük kaldırırken gövdenin dönmesi", en: "Twisting the torso while lifting" },
        consequence: { tr: "Bel ve kas-iskelet yaralanması", en: "Back and musculoskeletal injury" },
        personsAtRisk: { tr: "Elle taşıma yapan çalışanlar", en: "Manual-handling workers" },
        existingControls: { tr: "Doğru kaldırma tekniği eğitimi", en: "Manual-handling technique training" },
        additionalControls: { tr: "Yükü vücuda yakın tut ve yön değiştirmek için ayaklarla dön", en: "Keep the load close to the body and turn with the feet rather than twisting" },
      },
      {
        hazard: { tr: "Tekrarlı elle taşıma", en: "Repetitive manual handling" },
        consequence: { tr: "Kümülatif kas-iskelet rahatsızlığı", en: "Cumulative musculoskeletal disorder" },
        personsAtRisk: { tr: "Elle taşıma yapan çalışanlar", en: "Manual-handling workers" },
        existingControls: { tr: "İş rotasyonu ve uygun çalışma organizasyonu", en: "Job rotation and suitable work organization" },
        additionalControls: { tr: "Tekrarlı hareket sıklığını azalt ve mekanik yardım kullanımını artır", en: "Reduce repetitive handling frequency and increase use of mechanical assistance" },
      },
      {
        hazard: { tr: "Dengesiz veya kaygan yük taşıma", en: "Handling unstable or slippery loads" },
        consequence: { tr: "Yük düşmesi veya el-ayak yaralanması", en: "Dropped load or hand-foot injury" },
        personsAtRisk: { tr: "Malzeme taşıyan çalışanlar", en: "Personnel handling materials" },
        existingControls: { tr: "Yük kontrolü ve uygun eldiven", en: "Load inspection and suitable gloves" },
        additionalControls: { tr: "Yükü kaldırmadan önce kavrama noktalarını ve stabilitesini değerlendir", en: "Assess gripping points and load stability before lifting" },
      }
    ],
  },

  {
    id: "chemical-handling",
    category: { tr: "Kimyasal", en: "Chemical" },
    activity: { tr: "Kimyasal Elleçleme", en: "Chemical Handling" },
    items: [
      {
        hazard: { tr: "Cilt veya göz teması", en: "Skin or eye contact" },
        consequence: { tr: "Tahriş, kimyasal yanık veya göz hasarı", en: "Irritation, chemical burns or eye injury" },
        personsAtRisk: { tr: "Kimyasal kullanan çalışanlar", en: "Workers handling chemicals" },
        existingControls: { tr: "SDS, uygun kap, etiketleme ve uygun KKD", en: "SDS, suitable containers, labeling and appropriate PPE" },
        additionalControls: { tr: "Göz duşu ve acil yıkama imkanını doğrula", en: "Verify eyewash and emergency washing facilities" },
      },
      {
        hazard: { tr: "Kimyasal buhar solunması", en: "Inhalation of chemical vapour" },
        consequence: { tr: "Solunum etkisi veya zehirlenme", en: "Respiratory effects or poisoning" },
        personsAtRisk: { tr: "Operatör ve yakın çalışanlar", en: "Operator and nearby workers" },
        existingControls: { tr: "Havalandırma ve maruziyet kontrolü", en: "Ventilation and exposure control" },
        additionalControls: { tr: "Gerekirse uygun solunum koruması ve ölçüm uygula", en: "Use suitable respiratory protection and monitoring where required" },
      },
      {
        hazard: { tr: "Kimyasal dökülme", en: "Chemical spill" },
        consequence: { tr: "Maruziyet, çevresel zarar veya kayma", en: "Exposure, environmental harm or slip hazard" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site workers" },
        existingControls: { tr: "Spill kit, ikincil muhafaza ve acil durum prosedürü", en: "Spill kit, secondary containment and emergency procedure" },
        additionalControls: { tr: "Dökülme müdahale ekipmanını çalışma noktasında doğrula", en: "Verify spill-response equipment at the work location" },
      },
      // PACK01_BATCH::chemical-handling
      {
        hazard: { tr: "Kimyasal sıçraması", en: "Chemical splash" },
        consequence: { tr: "Göz veya cilt yaralanması", en: "Eye or skin injury" },
        personsAtRisk: { tr: "Kimyasal kullanan çalışanlar", en: "Personnel handling chemicals" },
        existingControls: { tr: "Kimyasal gözlük, eldiven ve koruyucu kıyafet", en: "Chemical goggles, gloves and protective clothing" },
        additionalControls: { tr: "KKD seçimini SDS ve kimyasal özelliklerine göre doğrula", en: "Verify PPE selection against the SDS and chemical properties" },
      },
      {
        hazard: { tr: "Uyumsuz kimyasalların karıştırılması", en: "Mixing incompatible chemicals" },
        consequence: { tr: "Toksik gaz, yangın veya şiddetli reaksiyon", en: "Toxic gas, fire or violent reaction" },
        personsAtRisk: { tr: "Kimyasal çalışanları ve çevre personeli", en: "Chemical handlers and nearby personnel" },
        existingControls: { tr: "Etiketleme, SDS ve segregasyon", en: "Labeling, SDS and segregation" },
        additionalControls: { tr: "Karıştırma veya transfer öncesi kimyasal uyumluluğunu doğrula", en: "Verify chemical compatibility before mixing or transfer" },
      },
      {
        hazard: { tr: "Kimyasal kabının yanlış etiketlenmesi", en: "Incorrectly labeled chemical container" },
        consequence: { tr: "Yanlış kullanım veya tehlikeli maruziyet", en: "Incorrect use or hazardous exposure" },
        personsAtRisk: { tr: "Tüm kimyasal kullanıcıları", en: "All chemical users" },
        existingControls: { tr: "Etiketleme ve kapalı kap sistemi", en: "Labeling and closed-container system" },
        additionalControls: { tr: "Etiketsiz veya içeriği belirsiz kapların kullanımını yasakla", en: "Prohibit use of unlabeled or unidentified containers" },
      },
      {
        hazard: { tr: "Kimyasal transfer hortumunun ayrılması", en: "Chemical transfer hose disconnection" },
        consequence: { tr: "Kimyasal sıçraması veya büyük dökülme", en: "Chemical splash or major spill" },
        personsAtRisk: { tr: "Kimyasal transfer personeli", en: "Chemical-transfer personnel" },
        existingControls: { tr: "Uygun hose, coupling ve transfer prosedürü", en: "Suitable hoses, couplings and transfer procedure" },
        additionalControls: { tr: "Transfer öncesi coupling kilidini ve hortum bütünlüğünü doğrula", en: "Verify coupling lock and hose integrity before transfer" },
      },
      {
        hazard: { tr: "Kimyasal buharının kapalı alanda birikmesi", en: "Chemical vapor accumulation in enclosed area" },
        consequence: { tr: "Solunum etkisi, zehirlenme veya bilinç kaybı", en: "Respiratory effects, poisoning or loss of consciousness" },
        personsAtRisk: { tr: "Kimyasal kullanan çalışanlar", en: "Personnel handling chemicals" },
        existingControls: { tr: "Havalandırma ve SDS değerlendirmesi", en: "Ventilation and SDS assessment" },
        additionalControls: { tr: "Uçucu kimyasallarda lokal havalandırma veya atmosfer ölçümü uygula", en: "Use local ventilation or atmospheric monitoring for volatile chemicals" },
      },
      {
        hazard: { tr: "Acil göz duşu veya duş erişiminin yetersiz olması", en: "Inadequate access to emergency eyewash or shower" },
        consequence: { tr: "Kimyasal maruziyetin etkisinin artması", en: "Increased severity of chemical exposure" },
        personsAtRisk: { tr: "Kimyasal kullanan çalışanlar", en: "Chemical-handling personnel" },
        existingControls: { tr: "Acil duş ve eyewash sistemi", en: "Emergency shower and eyewash system" },
        additionalControls: { tr: "Acil ekipmanın erişilebilir, test edilmiş ve önünün açık olduğunu doğrula", en: "Verify emergency equipment is accessible, tested and unobstructed" },
      }
    ],
  },

  {
    id: "pressure-testing",
    category: { tr: "Basınçlı Sistem", en: "Pressure Systems" },
    activity: { tr: "Basınç Testi", en: "Pressure Testing" },
    items: [
      {
        hazard: { tr: "Basınçlı ekipman veya bağlantı arızası", en: "Failure of pressurized equipment or connection" },
        consequence: { tr: "Fırlayan parça, ciddi yaralanma veya ölüm", en: "Projectile, serious injury or fatality" },
        personsAtRisk: { tr: "Test ekibi ve yakın çalışanlar", en: "Test team and nearby workers" },
        existingControls: { tr: "Test prosedürü, uygun ekipman ve dışlama alanı", en: "Test procedure, suitable equipment and exclusion zone" },
        additionalControls: { tr: "Test öncesi bağlantı ve körlemeleri bağımsız kontrol et", en: "Independently verify connections and blinds before testing" },
      },
      {
        hazard: { tr: "Kontrolsüz basınç boşalması", en: "Uncontrolled pressure release" },
        consequence: { tr: "Çarpma veya enjeksiyon yaralanması", en: "Impact or injection injury" },
        personsAtRisk: { tr: "Test personeli", en: "Test personnel" },
        existingControls: { tr: "Kontrollü basınçlandırma ve güvenli boşaltma yöntemi", en: "Controlled pressurization and safe depressurization method" },
        additionalControls: { tr: "Basınç sıfırlanmadan bağlantı açma", en: "Do not open connections until pressure is confirmed at zero" },
      },
      {
        hazard: { tr: "Dışlama alanına izinsiz giriş", en: "Unauthorized entry into exclusion zone" },
        consequence: { tr: "Yüksek enerjili salıma maruz kalma", en: "Exposure to high-energy release" },
        personsAtRisk: { tr: "Diğer saha çalışanları", en: "Other site personnel" },
        existingControls: { tr: "Bariyer, tabela ve kontrollü erişim", en: "Barricades, signs and controlled access" },
        additionalControls: { tr: "Test boyunca erişim kontrolünü aktif tut", en: "Maintain active access control throughout the test" },
      },
      // PACK01_BATCH::pressure-testing
      {
        hazard: { tr: "Test basıncının aşılması", en: "Exceeding test pressure" },
        consequence: { tr: "Sistem arızası veya yüksek enerjili salım", en: "System failure or high-energy release" },
        personsAtRisk: { tr: "Test ekibi ve çevredeki çalışanlar", en: "Test team and nearby personnel" },
        existingControls: { tr: "Onaylı prosedür ve kalibre manometre", en: "Approved procedure and calibrated pressure gauge" },
        additionalControls: { tr: "Belirlenen maksimum test basıncını aşmayı önleyecek kontrol uygula", en: "Apply controls to prevent exceeding the specified maximum test pressure" },
      },
      {
        hazard: { tr: "Test alanına yetkisiz giriş", en: "Unauthorized entry into pressure-test area" },
        consequence: { tr: "Basınçlı sistem arızasına maruziyet", en: "Exposure to pressure-system failure" },
        personsAtRisk: { tr: "Diğer saha çalışanları", en: "Other site personnel" },
        existingControls: { tr: "Dışlama alanı ve bariyerleme", en: "Exclusion zone and barricading" },
        additionalControls: { tr: "Test boyunca kontrollü erişim sağla", en: "Maintain controlled access throughout the test" },
      },
      {
        hazard: { tr: "Test sonrası sistemde artık basınç kalması", en: "Residual pressure remaining after test" },
        consequence: { tr: "Bağlantı açılırken ani basınç salımı", en: "Sudden pressure release during disconnection" },
        personsAtRisk: { tr: "Test ve bakım personeli", en: "Test and maintenance personnel" },
        existingControls: { tr: "Kontrollü depressurization", en: "Controlled depressurization" },
        additionalControls: { tr: "Sistem açılmadan önce sıfır basıncı fiziksel olarak doğrula", en: "Physically verify zero pressure before opening the system" },
      },
      {
        hazard: { tr: "Test bağlantısının yetersiz sabitlenmesi", en: "Inadequate restraint of test connection" },
        consequence: { tr: "Hortum veya fitting savrulması", en: "Hose or fitting whip" },
        personsAtRisk: { tr: "Test ekibi", en: "Test team" },
        existingControls: { tr: "Uygun test ekipmanı ve restraint", en: "Suitable test equipment and restraint" },
        additionalControls: { tr: "Geçici bağlantıları mekanik restraint ile emniyete al", en: "Secure temporary connections with mechanical restraints" },
      },
      {
        hazard: { tr: "Basınçlandırma hızının çok yüksek olması", en: "Excessive pressurization rate" },
        consequence: { tr: "Ani ekipman arızası veya kontrol kaybı", en: "Sudden equipment failure or loss of control" },
        personsAtRisk: { tr: "Test personeli", en: "Test personnel" },
        existingControls: { tr: "Onaylı test prosedürü", en: "Approved test procedure" },
        additionalControls: { tr: "Basıncı prosedürde belirtilen kademelerde kontrollü olarak yükselt", en: "Increase pressure gradually in accordance with the approved procedure" },
      },
      {
        hazard: { tr: "Test alanında uygun olmayan ekipmanın bulunması", en: "Unnecessary equipment inside test exclusion zone" },
        consequence: { tr: "Arıza halinde projectile veya ikincil hasar", en: "Projectile or secondary damage during failure" },
        personsAtRisk: { tr: "Test personeli ve çevredeki çalışanlar", en: "Test personnel and nearby workers" },
        existingControls: { tr: "Exclusion zone ve alan kontrolü", en: "Exclusion zone and area control" },
        additionalControls: { tr: "Test başlamadan alanı gereksiz ekipman ve personelden temizle", en: "Clear unnecessary equipment and personnel from the test area before pressurization" },
      }
    ],
  },

  {
    id: "housekeeping",
    category: { tr: "Genel", en: "General" },
    activity: { tr: "Housekeeping", en: "Housekeeping" },
    items: [
      {
        hazard: { tr: "Yürüyüş yolunda malzeme", en: "Materials obstructing walkways" },
        consequence: { tr: "Takılma ve düşme", en: "Trip and fall" },
        personsAtRisk: { tr: "Tüm saha personeli", en: "All site personnel" },
        existingControls: { tr: "Belirlenmiş depolama alanları ve düzenli temizlik", en: "Designated storage areas and routine housekeeping" },
        additionalControls: { tr: "Kaçış ve yürüyüş yollarını sürekli açık tut", en: "Keep escape and pedestrian routes continuously clear" },
      },
      {
        hazard: { tr: "Yağ veya sıvı döküntüsü", en: "Oil or liquid spill" },
        consequence: { tr: "Kayma ve düşme", en: "Slip and fall" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site workers" },
        existingControls: { tr: "Dökülme temizliği ve uyarı sistemi", en: "Spill cleanup and warning controls" },
        additionalControls: { tr: "Tekrarlayan dökülmelerin kaynağını gider", en: "Eliminate sources of recurring spills" },
      },
      {
        hazard: { tr: "Uygunsuz atık birikimi", en: "Improper waste accumulation" },
        consequence: { tr: "Yangın, kesilme veya erişim engeli", en: "Fire, cuts or blocked access" },
        personsAtRisk: { tr: "Tüm saha personeli", en: "All site personnel" },
        existingControls: { tr: "Ayrılmış atık kutuları ve düzenli toplama", en: "Segregated waste containers and routine collection" },
        additionalControls: { tr: "Atık toplama sıklığını iş yoğunluğuna göre artır", en: "Increase collection frequency according to work intensity" },
      },
      // PACK01_BATCH::housekeeping
      {
        hazard: { tr: "Yürüme yollarında malzeme birikmesi", en: "Materials obstructing walkways" },
        consequence: { tr: "Takılma veya düşme", en: "Trip or fall" },
        personsAtRisk: { tr: "Tüm saha çalışanları", en: "All site personnel" },
        existingControls: { tr: "Belirlenmiş yürüme yolları ve düzenli temizlik", en: "Designated walkways and regular housekeeping" },
        additionalControls: { tr: "Kaçış ve yürüme yollarını vardiya boyunca açık tut", en: "Keep escape and pedestrian routes clear throughout the shift" },
      },
      {
        hazard: { tr: "Dökülen yağ veya sıvı", en: "Oil or liquid spill" },
        consequence: { tr: "Kayma veya düşme", en: "Slip or fall" },
        personsAtRisk: { tr: "Tüm saha personeli", en: "All site personnel" },
        existingControls: { tr: "Spill kit ve temizlik prosedürü", en: "Spill kits and cleaning procedure" },
        additionalControls: { tr: "Dökülmeyi derhal izole et, temizle ve kaynağını ortadan kaldır", en: "Immediately isolate and clean the spill and eliminate its source" },
      },
      {
        hazard: { tr: "Atıkların uygunsuz depolanması", en: "Improper waste storage" },
        consequence: { tr: "Yangın, kesik veya çevresel risk", en: "Fire, cuts or environmental hazard" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site personnel" },
        existingControls: { tr: "Belirlenmiş atık konteynerleri", en: "Designated waste containers" },
        additionalControls: { tr: "Atıkları türüne göre ayır ve konteynerlerin taşmasını önle", en: "Segregate waste by type and prevent containers from overflowing" },
      },
      {
        hazard: { tr: "Acil ekipmana erişimin engellenmesi", en: "Blocked access to emergency equipment" },
        consequence: { tr: "Acil müdahalenin gecikmesi", en: "Delayed emergency response" },
        personsAtRisk: { tr: "Tüm saha çalışanları", en: "All site personnel" },
        existingControls: { tr: "Housekeeping kontrolleri ve belirlenmiş erişim alanı", en: "Housekeeping checks and designated access areas" },
        additionalControls: { tr: "Yangın söndürücü, eyewash, alarm ve acil ekipman önlerini boş tut", en: "Keep access to extinguishers, eyewash stations, alarms and emergency equipment clear" },
      },
      {
        hazard: { tr: "Malzemenin yüksekten düşebilecek şekilde istiflenmesi", en: "Materials stored where they can fall from height" },
        consequence: { tr: "Düşen cisim yaralanması", en: "Dropped-object injury" },
        personsAtRisk: { tr: "Saha çalışanları", en: "Site personnel" },
        existingControls: { tr: "Düzenli ve güvenli depolama", en: "Orderly and secure storage" },
        additionalControls: { tr: "Yüksek seviyedeki gevşek malzemeleri sabitle veya daha düşük seviyeye indir", en: "Secure loose materials at height or move them to lower levels" },
      },
      {
        hazard: { tr: "Atıkta keskin veya sivri parça bulunması", en: "Sharp objects in waste" },
        consequence: { tr: "Kesik veya delinme yaralanması", en: "Cut or puncture injury" },
        personsAtRisk: { tr: "Temizlik ve saha çalışanları", en: "Cleaning and site personnel" },
        existingControls: { tr: "Atık segregasyonu ve uygun konteynerler", en: "Waste segregation and suitable containers" },
        additionalControls: { tr: "Keskin atıkları ayrı, dayanıklı ve işaretli konteynerlerde topla", en: "Collect sharp waste in separate durable and labeled containers" },
      }
    ],
  },

  {
    id: "office-work",
    category: { tr: "Ofis", en: "Office" },
    activity: { tr: "Ofis Çalışması", en: "Office Work" },
    items: [
      {
        hazard: { tr: "Uygunsuz ergonomi", en: "Poor ergonomics" },
        consequence: { tr: "Boyun, sırt veya üst ekstremite rahatsızlığı", en: "Neck, back or upper-limb discomfort" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Ayarlanabilir sandalye ve uygun ekran yerleşimi", en: "Adjustable seating and suitable screen positioning" },
        additionalControls: { tr: "Çalışma istasyonunu kullanıcıya göre ayarla", en: "Adjust workstation to the individual user" },
      },
      {
        hazard: { tr: "Kablo veya eşya nedeniyle takılma", en: "Trips from cables or objects" },
        consequence: { tr: "Düşme ve yaralanma", en: "Fall and injury" },
        personsAtRisk: { tr: "Çalışanlar ve ziyaretçiler", en: "Workers and visitors" },
        existingControls: { tr: "Kablo yönetimi ve temiz yürüyüş yolları", en: "Cable management and clear walkways" },
        additionalControls: { tr: "Geçici kablo geçişlerini ortadan kaldır", en: "Eliminate temporary cable crossings" },
      },
      {
        hazard: { tr: "Elektrikli ofis ekipmanı", en: "Electrical office equipment" },
        consequence: { tr: "Elektrik çarpması veya yangın", en: "Electric shock or fire" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Uygun ekipman ve hasar kontrolü", en: "Suitable equipment and damage checks" },
        additionalControls: { tr: "Hasarlı kablo veya prizleri kullanım dışı bırak", en: "Remove damaged cables or outlets from use" },
      },
      // PACK01_BATCH::office-work
      {
        hazard: { tr: "Uzun süreli uygunsuz oturma pozisyonu", en: "Prolonged poor sitting posture" },
        consequence: { tr: "Boyun, sırt veya kas-iskelet rahatsızlığı", en: "Neck, back or musculoskeletal discomfort" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Uygun masa, sandalye ve ekran düzeni", en: "Suitable desk, chair and screen arrangement" },
        additionalControls: { tr: "Çalışma istasyonunu ergonomik olarak ayarla ve düzenli hareket molası ver", en: "Adjust the workstation ergonomically and take regular movement breaks" },
      },
      {
        hazard: { tr: "Elektrik kablolarının geçiş yolunda bulunması", en: "Electrical cables across walkways" },
        consequence: { tr: "Takılma veya elektrik riski", en: "Trip or electrical hazard" },
        personsAtRisk: { tr: "Ofis çalışanları ve ziyaretçiler", en: "Office workers and visitors" },
        existingControls: { tr: "Kablo yönetimi ve düzenli housekeeping", en: "Cable management and good housekeeping" },
        additionalControls: { tr: "Kabloları geçiş yollarından kaldır veya uygun kablo koruyucu kullan", en: "Remove cables from walkways or use suitable cable protection" },
      },
      {
        hazard: { tr: "Acil çıkış yolunun engellenmesi", en: "Obstructed emergency exit route" },
        consequence: { tr: "Acil tahliyenin gecikmesi", en: "Delayed emergency evacuation" },
        personsAtRisk: { tr: "Ofiste bulunan herkes", en: "All office occupants" },
        existingControls: { tr: "Belirlenmiş acil çıkış ve yönlendirme", en: "Designated emergency exits and signage" },
        additionalControls: { tr: "Kaçış yollarını ve acil çıkış kapılarını sürekli açık tut", en: "Keep escape routes and emergency exit doors continuously clear" },
      },
      {
        hazard: { tr: "Ekran yansıması ve yetersiz görsel ergonomi", en: "Screen glare and poor visual ergonomics" },
        consequence: { tr: "Göz yorgunluğu ve baş ağrısı", en: "Eye strain and headache" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Uygun ekran konumu ve ofis aydınlatması", en: "Suitable screen position and office lighting" },
        additionalControls: { tr: "Ekran parlaklığını, mesafeyi ve yansıma açısını ergonomik şekilde ayarla", en: "Adjust screen brightness, viewing distance and glare angle ergonomically" },
      },
      {
        hazard: { tr: "Uzun süre hareketsiz çalışma", en: "Prolonged sedentary work" },
        consequence: { tr: "Kas-iskelet rahatsızlığı ve dolaşım sorunları", en: "Musculoskeletal discomfort and circulation problems" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Ergonomik çalışma istasyonu", en: "Ergonomic workstation" },
        additionalControls: { tr: "Düzenli kısa hareket molaları ve pozisyon değişikliği uygula", en: "Take regular short movement breaks and change posture" },
      },
      {
        hazard: { tr: "Elektrikli ofis ekipmanının aşırı yüklenmesi", en: "Overloading office electrical equipment" },
        consequence: { tr: "Elektrik yangını veya elektrik çarpması", en: "Electrical fire or electric shock" },
        personsAtRisk: { tr: "Ofis çalışanları", en: "Office workers" },
        existingControls: { tr: "Uygun priz ve elektrik tesisatı", en: "Suitable outlets and electrical installation" },
        additionalControls: { tr: "Çoklu prizleri zincirleme bağlama ve aşırı yüklemeyi engelle", en: "Prevent daisy-chaining and overloading of power strips" },
      }
    ],
  },

  {
    id: "traffic-management",
    category: { tr: "Trafik", en: "Traffic" },
    activity: { tr: "Saha Trafik Yönetimi", en: "Site Traffic Management" },
    items: [
      {
        hazard: { tr: "Araç-yaya çarpışması", en: "Vehicle-pedestrian collision" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Yayalar ve sürücüler", en: "Pedestrians and drivers" },
        existingControls: { tr: "Ayrılmış yollar, bariyer, hız limiti ve tabela", en: "Segregated routes, barriers, speed limits and signage" },
        additionalControls: { tr: "Kritik kesişimlerde fiziksel ayrım veya spotter kullan", en: "Use physical segregation or spotters at critical crossings" },
      },
      {
        hazard: { tr: "Geri manevra", en: "Reversing vehicle" },
        consequence: { tr: "Ezilme veya çarpışma", en: "Crushing or collision" },
        personsAtRisk: { tr: "Yayalar ve diğer sürücüler", en: "Pedestrians and other drivers" },
        existingControls: { tr: "Geri vites alarmı, kamera ve gerektiğinde spotter", en: "Reversing alarm, camera and spotter where required" },
        additionalControls: { tr: "Geri manevrayı mümkün olduğunca azaltacak trafik düzeni kur", en: "Design traffic flow to minimize reversing where practicable" },
      },
      {
        hazard: { tr: "Kör kavşak veya görüş engeli", en: "Blind intersection or restricted visibility" },
        consequence: { tr: "Araç çarpışması", en: "Vehicle collision" },
        personsAtRisk: { tr: "Sürücüler ve yayalar", en: "Drivers and pedestrians" },
        existingControls: { tr: "Ayna, tabela, hız kontrolü ve korna kullanımı", en: "Mirrors, signage, speed control and horn use" },
        additionalControls: { tr: "Görüş engellerini kaldır veya kavşağı yeniden düzenle", en: "Remove visibility obstructions or redesign the intersection" },
      },
      // PACK01_BATCH::traffic-management
      {
        hazard: { tr: "Araç ve yaya yollarının kesişmesi", en: "Vehicle and pedestrian routes crossing" },
        consequence: { tr: "Çarpışma, ezilme veya ölüm", en: "Collision, crushing or fatality" },
        personsAtRisk: { tr: "Yayalar ve araç operatörleri", en: "Pedestrians and vehicle operators" },
        existingControls: { tr: "Araç-yaya ayrımı ve belirlenmiş yollar", en: "Vehicle-pedestrian segregation and designated routes" },
        additionalControls: { tr: "Kritik kesişim noktalarında fiziksel ayrım veya kontrollü geçiş uygula", en: "Use physical segregation or controlled crossings at critical intersections" },
      },
      {
        hazard: { tr: "Kör noktalarda araç hareketi", en: "Vehicle movement at blind spots" },
        consequence: { tr: "Yaya veya araçla çarpışma", en: "Collision with pedestrians or vehicles" },
        personsAtRisk: { tr: "Saha personeli ve sürücüler", en: "Site personnel and drivers" },
        existingControls: { tr: "Hız limiti, uyarı işaretleri ve korna", en: "Speed limits, warning signs and horn" },
        additionalControls: { tr: "Kritik kör noktalarda ayna veya banksman kullan", en: "Use mirrors or a banksman at critical blind spots" },
      },
      {
        hazard: { tr: "Geri manevra sırasında kontrol kaybı", en: "Loss of control during reversing" },
        consequence: { tr: "Çarpışma veya ezilme", en: "Collision or crushing" },
        personsAtRisk: { tr: "Operatör, banksman ve yayalar", en: "Operator, banksman and pedestrians" },
        existingControls: { tr: "Geri vites alarmı ve banksman desteği", en: "Reverse alarm and banksman support" },
        additionalControls: { tr: "Mümkün olduğunda geri manevrayı azaltacak trafik düzeni oluştur", en: "Design traffic flow to minimize reversing wherever practicable" },
      },
      {
        hazard: { tr: "Araç hız limitinin aşılması", en: "Vehicle exceeding site speed limit" },
        consequence: { tr: "Çarpışma, ezilme veya ciddi yaralanma", en: "Collision, crushing or serious injury" },
        personsAtRisk: { tr: "Sürücüler ve yayalar", en: "Drivers and pedestrians" },
        existingControls: { tr: "Saha hız limitleri ve trafik işaretleri", en: "Site speed limits and traffic signage" },
        additionalControls: { tr: "Hız kontrolü, radar veya supervisor gözlemleriyle uyumu takip et", en: "Monitor compliance through speed controls, radar or supervisor observations" },
      },
      {
        hazard: { tr: "Park edilmiş araçların görüşü engellemesi", en: "Parked vehicles obstructing visibility" },
        consequence: { tr: "Kör noktada araç-yaya çarpışması", en: "Vehicle-pedestrian collision at blind spot" },
        personsAtRisk: { tr: "Yayalar ve araç operatörleri", en: "Pedestrians and vehicle operators" },
        existingControls: { tr: "Belirlenmiş park alanları", en: "Designated parking areas" },
        additionalControls: { tr: "Kavşak, yaya geçidi ve kör nokta yakınında park etmeyi engelle", en: "Prevent parking near intersections, pedestrian crossings and blind spots" },
      },
      {
        hazard: { tr: "Geçici trafik düzeninin yetersiz işaretlenmesi", en: "Poorly marked temporary traffic arrangement" },
        consequence: { tr: "Yanlış güzergah, çarpışma veya yaya maruziyeti", en: "Wrong routing, collision or pedestrian exposure" },
        personsAtRisk: { tr: "Saha çalışanları ve sürücüler", en: "Site personnel and drivers" },
        existingControls: { tr: "Geçici trafik planı ve signage", en: "Temporary traffic plan and signage" },
        additionalControls: { tr: "Değişen trafik güzergahlarını güncel bariyer, yönlendirme ve aydınlatmayla belirt", en: "Mark changing traffic routes with current barriers, directional signs and lighting" },
      }
    ],
  },

  {
    id: "roof-work",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "Çatı Çalışması", en: "Roof Work" },
    items: [
      {
        hazard: { tr: "Çatı kenarından düşme", en: "Fall from roof edge" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kenar koruması, güvenli erişim ve uygun düşüş koruması", en: "Edge protection, safe access and suitable fall protection" },
        additionalControls: { tr: "Çalışma alanını başlamadan önce kenar ve açıklıklar açısından kontrol et", en: "Inspect edges and openings before work begins" },
      },
      {
        hazard: { tr: "Kırılgan çatı yüzeyi", en: "Fragile roof surface" },
        consequence: { tr: "Çatıdan geçerek düşme", en: "Fall through roof surface" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kırılgan alan tespiti ve güvenli yürüyüş platformu", en: "Identification of fragile areas and safe working platforms" },
        additionalControls: { tr: "Kırılgan bölgeleri fiziksel olarak işaretle ve erişimi kısıtla", en: "Physically mark fragile areas and restrict access" },
      },
      {
        hazard: { tr: "Rüzgar ve hava koşulları", en: "Wind and adverse weather" },
        consequence: { tr: "Denge kaybı veya malzeme düşmesi", en: "Loss of balance or dropped materials" },
        personsAtRisk: { tr: "Çatı ve alt seviyedeki çalışanlar", en: "Roof workers and personnel below" },
        existingControls: { tr: "Hava takibi ve güvenli çalışma limitleri", en: "Weather monitoring and safe work limits" },
        additionalControls: { tr: "Güvensiz hava koşullarında çalışmayı durdur", en: "Stop work during unsafe weather conditions" },
      },
      // PACK01_BATCH::roof-work
      {
        hazard: { tr: "Kırılgan çatı yüzeyi", en: "Fragile roof surface" },
        consequence: { tr: "Çatıdan düşme ve ölüm", en: "Fall through roof and fatality" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kırılgan alan tespiti, platform ve düşüş koruması", en: "Fragile-area identification, platforms and fall protection" },
        additionalControls: { tr: "Kırılgan yüzeyleri açıkça işaretle ve doğrudan üzerine basılmasını engelle", en: "Clearly mark fragile surfaces and prevent direct access onto them" },
      },
      {
        hazard: { tr: "Çatı kenarında düşme", en: "Fall from roof edge" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Çatı çalışanları", en: "Roof workers" },
        existingControls: { tr: "Kenar koruması veya uygun düşüş koruma sistemi", en: "Edge protection or suitable fall-protection system" },
        additionalControls: { tr: "Çalışma başlamadan tüm açık kenarları ve geçiş noktalarını kontrol et", en: "Inspect all open edges and access points before work starts" },
      },
      {
        hazard: { tr: "Çatıdan malzeme veya alet düşmesi", en: "Materials or tools falling from roof" },
        consequence: { tr: "Alt seviyedeki personelin yaralanması", en: "Injury to personnel below" },
        personsAtRisk: { tr: "Alt seviyedeki çalışanlar", en: "Personnel below" },
        existingControls: { tr: "Malzeme sabitleme ve alt alan izolasyonu", en: "Material securing and exclusion zone below" },
        additionalControls: { tr: "Alet tethering kullan ve çatı altındaki dışlama alanını koru", en: "Use tool tethering and maintain the exclusion zone below" },
      }
    ],
  },

  {
    id: "meWP",
    category: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    activity: { tr: "MEWP / Personel Yükseltici Platform", en: "MEWP / Mobile Elevating Work Platform" },
    items: [
      {
        hazard: { tr: "Platformdan düşme", en: "Fall from platform" },
        consequence: { tr: "Ciddi yaralanma veya ölüm", en: "Serious injury or fatality" },
        personsAtRisk: { tr: "Platform operatörü ve kullanıcılar", en: "Platform operator and occupants" },
        existingControls: { tr: "Yetkili operatör, korkuluk sistemi ve üretici talimatları", en: "Authorized operator, guardrails and manufacturer instructions" },
        additionalControls: { tr: "Gerekli bağlanma yöntemini ekipman üreticisine göre doğrula", en: "Verify required restraint/fall-protection method according to manufacturer instructions" },
      },
      {
        hazard: { tr: "Platform devrilmesi", en: "MEWP overturn" },
        consequence: { tr: "Ezilme veya ölüm", en: "Crushing or fatality" },
        personsAtRisk: { tr: "Platform kullanıcıları ve yakın çalışanlar", en: "Occupants and nearby workers" },
        existingControls: { tr: "Zemin değerlendirmesi, kapasite limiti ve güvenli kurulum", en: "Ground assessment, capacity limits and safe setup" },
        additionalControls: { tr: "Çukur, kenar ve zayıf zeminleri çalışma öncesi belirle", en: "Identify holes, edges and weak ground before operation" },
      },
      {
        hazard: { tr: "Üstte sıkışma", en: "Overhead entrapment" },
        consequence: { tr: "Ezilme veya ciddi yaralanma", en: "Crushing or serious injury" },
        personsAtRisk: { tr: "Platformdaki çalışanlar", en: "Platform occupants" },
        existingControls: { tr: "Üst engel kontrolü ve kontrollü hareket", en: "Overhead-obstruction checks and controlled movement" },
        additionalControls: { tr: "Dar alanlarda hareket hızını azalt ve spotter kullan", en: "Reduce movement speed and use a spotter in restricted areas" },
      },
      {
        hazard: { tr: "MEWP'nin enerji hattına yaklaşması", en: "MEWP approaching overhead power lines" },
        consequence: { tr: "Elektrik çarpması veya ölüm", en: "Electric shock or fatality" },
        personsAtRisk: { tr: "MEWP operatörü, platform çalışanları ve yakındaki personel", en: "MEWP operator, platform occupants and nearby personnel" },
        existingControls: { tr: "Enerji hatlarından güvenli yaklaşma mesafesi ve saha kontrolü", en: "Safe clearance from power lines and work-area checks" },
        additionalControls: { tr: "Enerji hatlarını çalışma öncesi belirle ve gerekli güvenli yaklaşma mesafesini koru", en: "Identify power lines before work and maintain the required safe clearance" },
      },
      {
        hazard: { tr: "MEWP hareketi sırasında çarpışma", en: "Collision during MEWP movement" },
        consequence: { tr: "Ezilme, çarpma veya ciddi yaralanma", en: "Crushing, impact or serious injury" },
        personsAtRisk: { tr: "MEWP operatörü, platform çalışanları ve çevredeki personel", en: "MEWP operator, platform occupants and surrounding personnel" },
        existingControls: { tr: "Kontrollü sürüş, güzergah kontrolü ve eğitimli operatör", en: "Controlled driving, route checks and trained operator" },
        additionalControls: { tr: "Kör noktalarda gözcü kullan ve yaya erişimini hareket güzergahından ayır", en: "Use a spotter at blind spots and segregate pedestrians from the travel route" },
      },
      {
        hazard: { tr: "Platformdan alet veya malzeme düşmesi", en: "Dropped tools or materials from MEWP platform" },
        consequence: { tr: "Aşağıdaki personelin ciddi şekilde yaralanması", en: "Serious injury to personnel below" },
        personsAtRisk: { tr: "MEWP altında veya çevresinde bulunan çalışanlar", en: "Personnel below or around the MEWP" },
        existingControls: { tr: "Platform düzeni ve malzemelerin güvenli yerleştirilmesi", en: "Platform housekeeping and secure placement of materials" },
        additionalControls: { tr: "Aletleri sabitle ve platform altında kontrollü dışlama alanı oluştur", en: "Secure tools and establish a controlled exclusion zone below the platform" },
      },
    ],
  },
];
