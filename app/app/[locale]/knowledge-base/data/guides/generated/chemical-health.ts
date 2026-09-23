import { buildGeneratedGuide, commonFamilies, type GuideBlueprint, type Pair } from "./factory";

const P = (en: string, tr: string): Pair => ({ en, tr });
const F = commonFamilies.health;

const blueprints: GuideBlueprint[] = [
  {
    slug: "safety-data-sheets",
    title: P("Safety Data Sheets (SDS)", "Güvenlik Bilgi Formları (SDS)"),
    focus: P("using safety data sheets to understand chemical hazards, controls and emergency actions", "kimyasal tehlike, kontrol ve acil durum aksiyonlarını anlamak için güvenlik bilgi formlarının kullanımı"),
    family: F,
    risk: "medium",
    osha: ["OSHA 1910.1200"],
    hazards: [P("Workers using a chemical without understanding its exposure and incompatibility hazards", "Çalışanların maruziyet ve uyumsuzluk tehlikelerini bilmeden kimyasal kullanması"), P("Outdated or inaccessible SDS information during an emergency", "Acil durumda güncel olmayan veya erişilemeyen SDS bilgisi")],
    controls: [P("Ensure the current SDS is readily accessible to workers who use or may be exposed to the chemical.", "Güncel SDS'nin kimyasalı kullanan veya maruz kalabilecek çalışanlar için kolay erişilebilir olmasını sağlayın."), P("Use SDS information together with task risk assessment to select controls, PPE, storage and emergency response.", "Kontrol, KKD, depolama ve acil müdahaleyi seçmek için SDS bilgisini görev risk değerlendirmesiyle birlikte kullanın.")],
  },
  {
    slug: "chemical-labeling-ghs",
    title: P("Chemical Labeling & GHS", "Kimyasal Etiketleme ve GHS"),
    focus: P("clear chemical identification, pictograms, signal words and workplace labeling", "kimyasal tanımlama, piktogram, uyarı kelimesi ve işyeri etiketlemesinin doğru kullanımı"),
    family: F,
    risk: "medium",
    osha: ["OSHA 1910.1200"],
    hazards: [P("Unlabeled or incorrectly relabeled secondary containers", "Etiketsiz veya yanlış yeniden etiketlenmiş ikincil kaplar"), P("Workers misunderstanding pictograms, signal words or hazard statements", "Çalışanların piktogram, uyarı kelimesi veya tehlike ifadelerini yanlış anlaması")],
    controls: [P("Keep product identifiers and hazard information legible on workplace containers.", "İşyeri kaplarında ürün tanımı ve tehlike bilgisini okunaklı tutun."), P("Train workers to connect label information with the SDS and required task controls.", "Çalışanları etiket bilgisini SDS ve gerekli görev kontrolleriyle ilişkilendirecek şekilde eğitin.")],
  },
  {
    slug: "chemical-storage-compatibility",
    title: P("Chemical Storage Compatibility", "Kimyasal Depolama Uyumluluğu"),
    focus: P("segregating incompatible chemicals and controlling storage conditions", "uyumsuz kimyasalların ayrılması ve depolama koşullarının kontrolü"),
    family: F,
    osha: ["OSHA 1910.1200", "OSHA 1910.106"],
    hazards: [P("Reactive chemicals stored together or above incompatible materials", "Reaktif kimyasalların birlikte veya uyumsuz maddelerin üzerinde depolanması"), P("Leaks entering drains or mixing in shared containment", "Kaçakların drenaja gitmesi veya ortak ikincil kapta karışması")],
    controls: [P("Segregate chemical classes according to compatibility and credible reaction hazards.", "Kimyasal sınıfları uyumluluk ve olası reaksiyon tehlikesine göre ayırın."), P("Use suitable secondary containment, ventilation and storage temperature controls.", "Uygun ikincil kap, havalandırma ve depolama sıcaklığı kontrolleri kullanın.")],
  },
  {
    slug: "spill-response",
    title: P("Chemical Spill Response", "Kimyasal Dökülme Müdahalesi"),
    focus: P("initial actions, isolation, containment and escalation for chemical spills", "kimyasal dökülmelerde ilk aksiyon, izolasyon, yayılmayı önleme ve eskalasyon"),
    family: F,
    osha: ["OSHA 1910.120", "OSHA 1910.1200"],
    hazards: [P("Untrained personnel entering the spill area", "Eğitimsiz personelin dökülme alanına girmesi"), P("Wrong absorbent or response method reacting with the product", "Yanlış emici veya müdahale yönteminin ürünle reaksiyona girmesi")],
    controls: [P("Identify the substance, isolate the area and escalate when the release exceeds trained response capability.", "Maddeyi belirleyin, alanı izole edin ve dökülme eğitimli müdahale kapasitesini aşarsa eskale edin."), P("Use compatible containment and cleanup materials and prevent migration to drains or occupied areas when safe.", "Uyumlu tutma/temizleme malzemesi kullanın ve güvenliyse yayılımı drenaj veya kullanılan alanlara gitmeden durdurun.")],
  },
  {
    slug: "respiratory-protection",
    title: P("Respiratory Protection", "Solunum Koruyucu Güvenliği"),
    focus: P("hazard evaluation, respirator selection, fit and program controls", "tehlike değerlendirmesi, respiratör seçimi, uyum ve program kontrolleri"),
    family: F,
    osha: ["OSHA 1910.134"],
    hazards: [P("Wrong cartridge, filter or respirator type for the contaminant", "Kirletici için yanlış kartuş, filtre veya respiratör tipi"), P("Poor face seal caused by fit, facial hair or damaged equipment", "Uyum, sakal veya hasarlı ekipman nedeniyle zayıf yüz sızdırmazlığı")],
    controls: [P("Use respiratory protection only within a managed program based on the actual contaminant and exposure.", "Solunum koruyucuyu gerçek kirletici ve maruziyete dayalı yönetilen program içinde kullanın."), P("Complete required medical evaluation, fit testing, user checks, cleaning and cartridge/change controls.", "Gerekli sağlık değerlendirmesi, fit test, kullanıcı kontrolü, temizlik ve kartuş değişim kontrollerini uygulayın.")],
    ppe: [P("Respirator selected for the identified contaminant and exposure", "Belirlenen kirletici ve maruziyete uygun seçilmiş respiratör")],
  },
  {
    slug: "hearing-protection",
    title: P("Hearing Protection", "İşitme Koruması"),
    focus: P("noise exposure control and correct selection and use of hearing protection", "gürültü maruziyetinin kontrolü ve işitme koruyucunun doğru seçimi/kullanımı"),
    family: F,
    risk: "medium",
    osha: ["OSHA 1910.95"],
    hazards: [P("Long-duration noise exposure causing permanent hearing loss", "Uzun süreli gürültü maruziyetinin kalıcı işitme kaybına yol açması"), P("Hearing protection worn incorrectly or removed in high-noise zones", "Kulak koruyucunun yanlış takılması veya yüksek gürültü alanında çıkarılması")],
    controls: [P("Reduce noise at the source or by engineering controls before relying on hearing protection alone.", "Yalnız kulak koruyucuya güvenmeden önce gürültüyü kaynağında veya mühendislik kontrolleriyle azaltın."), P("Select protection for the measured exposure and train users in correct fit and continuous use.", "Ölçülen maruziyete uygun koruma seçin ve kullanıcıları doğru takma/sürekli kullanım konusunda eğitin.")],
  },
  {
    slug: "eye-face-protection",
    title: P("Eye & Face Protection", "Göz ve Yüz Koruması"),
    focus: P("selecting eye and face protection for impact, splash, dust, radiation and hot-work hazards", "darbe, sıçrama, toz, ışınım ve sıcak çalışma tehlikelerine göre göz/yüz koruma seçimi"),
    family: F,
    risk: "medium",
    osha: ["OSHA 1910.133"],
    hazards: [P("High-velocity particles or chemical splash bypassing inadequate protection", "Yetersiz korumayı aşan yüksek hızlı parçacık veya kimyasal sıçrama"), P("Using tinted or shaded lenses inappropriate for the optical hazard", "Optik tehlikeye uygun olmayan renkli/gölgeli lens kullanımı")],
    controls: [P("Match safety glasses, goggles, face shields or welding protection to the actual hazard route.", "Koruyucu gözlük, kapalı gözlük, yüz siperi veya kaynak korumasını gerçek tehlike yoluna göre seçin."), P("Use face shields with primary eye protection when impact or splash can reach around the shield.", "Darbe veya sıçrama siperin arkasına geçebilecekse yüz siperiyle birlikte temel göz koruması kullanın.")],
  },
  {
    slug: "heat-stress-prevention",
    title: P("Heat Stress Prevention", "Sıcak Stresi Önleme"),
    focus: P("planning work, hydration, acclimatization and response during high-heat conditions", "yüksek sıcaklık koşullarında çalışma planı, hidrasyon, alışma ve müdahale"),
    family: F,
    risk: "medium",
    osha: ["OSHA General Duty Clause, Section 5(a)(1)", "OSHA 1910.132"],
    hazards: [P("Heat exhaustion, heat stroke and impaired decision-making", "Sıcak bitkinliği, sıcak çarpması ve karar verme bozukluğu"), P("Heavy PPE, direct sun or workload increasing metabolic heat", "Ağır KKD, doğrudan güneş veya iş yükünün metabolik ısıyı artırması")],
    controls: [P("Plan work/rest cycles, shade, hydration and acclimatization for the actual heat load.", "Gerçek ısı yüküne göre çalışma/dinlenme döngüsü, gölge, hidrasyon ve alışma planlayın."), P("Use buddy monitoring and stop work immediately for confusion, collapse or suspected heat stroke.", "Eşli izleme kullanın; bilinç bulanıklığı, çökme veya sıcak çarpması şüphesinde işi derhal durdurun.")],
  },
];

export const generatedChemicalHealthGuides = blueprints.map(buildGeneratedGuide);
