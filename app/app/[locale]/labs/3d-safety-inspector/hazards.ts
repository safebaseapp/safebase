/**
 * Package 2 training findings.
 * Every target MUST have visible, corresponding geometry in world.ts.
 * These are fictional training conditions, not evidence of actual site non-compliance.
 */
export type TrainingLocale = "tr" | "en";
export type FindingText = { title: string; evidence: string; control: string; category: string };
export type SafetyHazard = {
  id: string;
  target: readonly [number, number, number];
  sector: "access" | "scaffold" | "maintenance" | "lifting" | "equipment";
  range: number;
  tr: FindingText;
  en: FindingText;
};

export const trainingHazards: readonly SafetyHazard[] = [
  {
    id: "exit-blocked", target: [1.2, 0.72, 35], sector: "access", range: 8,
    en: { title: "Obstructed emergency exit route", category: "Access & egress", evidence: "Material is stored across the marked emergency access corridor near the entry gate.", control: "Remove the stored materials and keep the designated escape route unobstructed." },
    tr: { title: "Engellenmiş acil çıkış güzergâhı", category: "Erişim ve çıkış", evidence: "Giriş kapısı yakınındaki işaretli acil erişim yoluna malzemeler bırakılmış.", control: "Malzemeleri kaldırın ve belirlenmiş kaçış güzergâhını sürekli açık tutun." },
  },
  {
    id: "trailing-cable", target: [0, 0.3, 20], sector: "access", range: 7,
    en: { title: "Trailing cable across walkway", category: "Housekeeping", evidence: "A loose dark cable crosses the walking route without suitable routing or protection.", control: "Re-route or suitably protect cables; maintain an unobstructed pedestrian pathway." },
    tr: { title: "Yürüme yolundan geçen serbest kablo", category: "Düzen ve temizlik", evidence: "Yürüyüş güzergâhında uygun şekilde yönlendirilmemiş veya korunmamış kablo bulunuyor.", control: "Kabloyu güzergâh dışına alın veya uygun şekilde koruyun; yaya geçişini açık tutun." },
  },
  {
    id: "open-excavation", target: [-19, 0.25, -28], sector: "access", range: 9,
    en: { title: "Excavation with an open approach", category: "Excavation", evidence: "The temporary pit has protective barriers on three sides; the approach side is unprotected.", control: "Install suitable edge protection and secure access; verify excavation safeguards before approach." },
    tr: { title: "Açık yaklaşım tarafı bulunan kazı", category: "Kazı güvenliği", evidence: "Geçici kazı çukurunun üç yanında bariyer var ancak yaklaşım tarafı korunmuyor.", control: "Uygun kenar koruması ve kontrollü erişim sağlayın; yaklaşmadan önce kazı güvenliğini doğrulayın." },
  },
  {
    id: "scaffold-guardrail", target: [-7, 4.35, -6], sector: "scaffold", range: 11,
    en: { title: "Missing scaffold edge guardrail", category: "Work at height", evidence: "One section of the outer upper scaffold guardrail is missing in the training scene.", control: "Suspend access to the affected platform until competent personnel restore and inspect the edge protection." },
    tr: { title: "İskelede eksik kenar korkuluğu", category: "Yüksekte çalışma", evidence: "Eğitim sahnesinde üst iskele platformunun dış kenarında korkuluk bölümü bulunmuyor.", control: "Yetkin personel kenar korumasını tamamlayıp kontrol edene kadar ilgili platforma erişimi durdurun." },
  },
  {
    id: "scaffold-loose-tools", target: [-7, 6.9, -12], sector: "scaffold", range: 12,
    en: { title: "Loose material near scaffold edge", category: "Dropped objects", evidence: "Unsecured tool boxes and small items are placed close to the elevated deck edge.", control: "Secure tools and materials using suitable containment, toe boards and exclusion arrangements as required." },
    tr: { title: "İskele kenarında sabitlenmemiş malzeme", category: "Düşen cisimler", evidence: "Yüksekteki platform kenarına yakın sabitlenmemiş alet kutuları ve parçalar var.", control: "Alet ve malzemeleri uygun şekilde sabitleyin; gerekli malzeme tutucuları, etek tahtaları ve alttaki korumaları sağlayın." },
  },
  {
    id: "cylinder-unsecured", target: [1.5, 1.2, 17.5], sector: "maintenance", range: 8,
    en: { title: "Unsecured upright gas cylinder", category: "Gas cylinder safety", evidence: "A compressed-gas cylinder is standing beside the workshop route without visible restraint.", control: "Secure cylinders upright using a suitable rack or restraint and protect valves from impact." },
    tr: { title: "Sabitlenmemiş dik gaz tüpü", category: "Gaz tüpü güvenliği", evidence: "Atölye geçişi yakınındaki basınçlı gaz tüpünde görünür bir sabitleme bulunmuyor.", control: "Tüpleri uygun taşıyıcı veya sabitlemeyle dik konumda tutun; vanaları çarpmalara karşı koruyun." },
  },
  {
    id: "hot-work-combustible", target: [-10, 0.8, 28], sector: "maintenance", range: 9,
    en: { title: "Combustibles beside hot-work point", category: "Hot work", evidence: "A cutting or grinding point is shown directly beside combustible storage on the maintenance pad.", control: "Remove or suitably protect combustibles and verify hot-work authorization and fire precautions before work." },
    tr: { title: "Sıcak iş noktasında yanıcı malzeme", category: "Sıcak iş", evidence: "Bakım alanındaki kesme veya taşlama noktasının hemen yanında yanıcı malzeme depolanmış.", control: "Yanıcıları uzaklaştırın veya uygun şekilde koruyun; işe başlamadan sıcak iş iznini ve yangın önlemlerini doğrulayın." },
  },
  {
    id: "suspended-load", target: [18, 3.1, 29], sector: "lifting", range: 12,
    en: { title: "Suspended load without exclusion zone", category: "Lifting operations", evidence: "A load is suspended in an accessible travel corridor with no suitable pedestrian exclusion barrier.", control: "Stop lifting where people can enter the load path; establish and enforce a suitable exclusion zone." },
    tr: { title: "Bariyersiz askıdaki yük", category: "Kaldırma operasyonları", evidence: "Yük, yayaların erişebildiği bir güzergâhta asılı duruyor ve uygun bir çevreleme bulunmuyor.", control: "İnsanların yükün hareket alanına girebildiği kaldırmayı durdurun; uygun yasaklı bölge kurup erişimi kontrol edin." },
  },
  {
    id: "vehicle-interface", target: [5.0, 1.05, -2.0], sector: "equipment", range: 9,
    en: { title: "Vehicle and pedestrian route conflict", category: "Vehicle movement", evidence: "A mobile plant vehicle occupies the pedestrian crossing without physical route separation.", control: "Separate plant and pedestrian movements using a suitable traffic plan and physical controls." },
    tr: { title: "Araç ve yaya güzergâhı çakışması", category: "Araç hareketleri", evidence: "İş makinesi, yaya geçiş alanında bulunuyor ve güzergâhlar fiziksel olarak ayrılmamış.", control: "Uygun trafik planı ve fiziksel önlemlerle araç ve yaya hareketlerini ayırın." },
  },
  {
    id: "electrical-panel", target: [-26, 1.45, 3.4], sector: "equipment", range: 8,
    en: { title: "Open temporary electrical cabinet", category: "Electrical safety", evidence: "A temporary electrical enclosure is visibly left open in an accessible maintenance zone.", control: "Restrict access and have authorized electrical personnel close, secure and inspect the enclosure." },
    tr: { title: "Açık bırakılmış geçici elektrik panosu", category: "Elektrik güvenliği", evidence: "Geçici elektrik panosunun kapağı erişilebilir bakım alanında açık bırakılmış.", control: "Erişimi kısıtlayın; yetkili elektrik personelinin panoyu kapatmasını, güvenliğini ve kontrolünü sağlayın." },
  },
  {
    id: "oil-spill", target: [-3, 0.1, -23], sector: "maintenance", range: 7,
    en: { title: "Oil spill left on work surface", category: "Spill control", evidence: "A dark fluid spill surrounds the pump assembly on the walking/working surface.", control: "Isolate the source, contain and clean the spill with approved materials, and prevent access until safe." },
    tr: { title: "Çalışma yüzeyinde yağ döküntüsü", category: "Döküntü kontrolü", evidence: "Pompa düzeneği çevresindeki yürüme ve çalışma yüzeyinde koyu renkli sıvı döküntüsü var.", control: "Kaynağı izole edin; döküntüyü uygun malzemeyle çevreleyip temizleyin ve güvenli hâle gelene kadar erişimi önleyin." },
  },
  {
    id: "improper-materials", target: [6.1, 0.75, -27], sector: "equipment", range: 8,
    en: { title: "Unstable materials in access route", category: "Material storage", evidence: "Pipes are stacked loosely on the access route without chocks or stable support.", control: "Move materials to an approved storage area and secure cylindrical stock against rolling." },
    tr: { title: "Geçiş yolunda uygunsuz malzeme istifi", category: "Malzeme depolama", evidence: "Borular, takoz veya güvenli destek olmadan geçiş güzergâhına gevşek biçimde istiflenmiş.", control: "Malzemeyi uygun depolama alanına taşıyın; yuvarlanabilecek silindirik malzemeleri takozlayıp sabitleyin." },
  },
];
export const HAZARD_COUNT = trainingHazards.length;
