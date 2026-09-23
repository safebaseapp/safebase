import { buildGeneratedGuide, commonFamilies, type GuideBlueprint, type Pair } from "./factory";

const P = (en: string, tr: string): Pair => ({ en, tr });
const F = commonFamilies.confined;

const blueprints: GuideBlueprint[] = [
  {
    slug: "confined-space-gas-testing",
    title: P("Confined Space Gas Testing", "Kapalı Alan Gaz Ölçümü"),
    focus: P("atmospheric testing before and during confined-space entry", "kapalı alan girişinden önce ve giriş boyunca atmosfer ölçümü"),
    family: F,
    osha: ["OSHA 1910.146", "OSHA 1926 Subpart AA"],
    hazards: [P("Testing at only one level despite gas stratification", "Gaz tabakalaşmasına rağmen yalnız tek seviyeden ölçüm yapmak"), P("Using an overdue, damaged or incorrectly configured detector", "Süresi geçmiş, hasarlı veya yanlış ayarlı dedektör kullanmak")],
    controls: [P("Test oxygen, flammability and relevant toxic contaminants with a suitable calibrated instrument.", "Oksijen, yanıcılık ve ilgili toksik kirleticileri uygun kalibre cihazla ölçün."), P("Sample representative levels and continue monitoring whenever conditions can change.", "Temsil edici seviyelerden numune alın ve koşullar değişebilecekse sürekli izleme yapın.")],
  },
  {
    slug: "confined-space-ventilation",
    title: P("Confined Space Ventilation", "Kapalı Alan Havalandırması"),
    focus: P("using mechanical ventilation to control atmospheric hazards during confined-space work", "kapalı alan çalışmalarında atmosfer tehlikelerini kontrol etmek için mekanik havalandırma kullanımı"),
    family: F,
    osha: ["OSHA 1910.146", "OSHA 1926.57"],
    hazards: [P("Dead zones where fresh air does not reach", "Temiz havanın ulaşmadığı ölü bölgeler"), P("Recirculation of exhaust or introduction of contaminated air", "Egzozun geri dolaşımı veya kirli havanın içeri verilmesi")],
    controls: [P("Position supply and exhaust to move fresh air through the actual breathing and work zones.", "Temiz havayı gerçek solunum ve çalışma bölgelerinden geçirecek şekilde besleme/egzoz konumlandırın."), P("Keep ventilation operating as required and verify effectiveness with atmospheric monitoring.", "Gerektiği sürece havalandırmayı çalıştırın ve etkinliğini atmosfer ölçümüyle doğrulayın.")],
  },
  {
    slug: "confined-space-rescue",
    title: P("Confined Space Rescue", "Kapalı Alan Kurtarma"),
    focus: P("planned non-entry and entry rescue for confined-space emergencies", "kapalı alan acil durumları için planlı dışarıdan ve içeriden kurtarma"),
    family: F,
    osha: ["OSHA 1910.146(k)", "OSHA 1926 Subpart AA"],
    hazards: [P("Unplanned rescue creating additional casualties", "Plansız kurtarmanın ek kazazedeler oluşturması"), P("Rescue delay caused by unsuitable access or missing equipment", "Uygunsuz erişim veya eksik ekipman nedeniyle kurtarma gecikmesi")],
    controls: [P("Select the rescue method before entry and stage retrieval/rescue equipment at the point of use.", "Giriş öncesi kurtarma yöntemini seçin ve geri çekme/kurtarma ekipmanını kullanım noktasında hazır tutun."), P("Use trained rescuers who understand the space, atmosphere, communications and protective equipment.", "Alanı, atmosferi, iletişimi ve koruyucu ekipmanı bilen eğitimli kurtarıcılar kullanın.")],
  },
  {
    slug: "confined-space-attendant-duties",
    title: P("Confined Space Attendant Duties", "Kapalı Alan Gözcüsü Görevleri"),
    focus: P("attendant monitoring, communication and emergency responsibilities outside permit spaces", "izinli kapalı alan dışında gözcünün izleme, iletişim ve acil durum sorumlulukları"),
    family: F,
    osha: ["OSHA 1910.146(i)", "OSHA 1926.953"],
    hazards: [P("Loss of entrant contact or unrecognized behavioral changes", "Giriş yapanla iletişimin kaybı veya davranış değişikliklerinin fark edilmemesi"), P("Attendant distracted by unrelated duties", "Gözcünün alakasız görevlerle dikkatinin dağılması")],
    controls: [P("Maintain continuous awareness of authorized entrants and conditions affecting the space.", "Yetkili giriş yapanları ve alanı etkileyen koşulları sürekli izleyin."), P("Do not perform duties that interfere with monitoring, communication or emergency response.", "İzleme, iletişim veya acil müdahaleyi engelleyen başka görev yapmayın.")],
  },
  {
    slug: "confined-space-entry-supervisor",
    title: P("Confined Space Entry Supervisor Duties", "Kapalı Alan Giriş Sorumlusu Görevleri"),
    focus: P("entry authorization, hazard verification and permit closure responsibilities", "giriş yetkilendirmesi, tehlike doğrulaması ve izin kapatma sorumlulukları"),
    family: F,
    osha: ["OSHA 1910.146(j)"],
    hazards: [P("Authorizing entry with incomplete isolation or invalid testing", "Eksik izolasyon veya geçersiz ölçümle girişe izin vermek"), P("Permit remaining active after conditions or personnel change", "Koşullar veya personel değiştiği halde iznin aktif kalması")],
    controls: [P("Verify required tests, isolations, equipment and rescue arrangements before authorizing entry.", "Girişi onaylamadan gerekli test, izolasyon, ekipman ve kurtarma düzenini doğrulayın."), P("Cancel or suspend entry when prohibited conditions occur and close the permit when work ends.", "Yasaklı koşul oluştuğunda girişi iptal/askıya alın ve iş bitince izni kapatın.")],
  },
  {
    slug: "oxygen-deficiency-hazards",
    title: P("Oxygen Deficiency Hazards", "Oksijen Yetersizliği Tehlikeleri"),
    focus: P("recognizing and controlling oxygen-deficient or oxygen-enriched atmospheres", "oksijen yetersiz veya oksijen zengin atmosferlerin tanınması ve kontrolü"),
    family: F,
    osha: ["OSHA 1910.146", "OSHA 1910.134"],
    hazards: [P("Rapid impairment without reliable warning symptoms", "Güvenilir uyarı belirtisi olmadan hızlı etkilenme"), P("Oxygen enrichment increasing combustion severity", "Oksijen zenginleşmesinin yanma şiddetini artırması")],
    controls: [P("Measure oxygen concentration before relying on entry or respiratory-control decisions.", "Giriş veya solunum koruma kararından önce oksijen konsantrasyonunu ölçün."), P("Identify displacement, oxidation, purge or process sources that can change oxygen levels.", "Oksijen seviyesini değiştirebilecek yer değiştirme, oksidasyon, purge veya proses kaynaklarını belirleyin.")],
  },
  {
    slug: "hydrogen-sulfide-safety",
    title: P("Hydrogen Sulfide Safety", "Hidrojen Sülfür Güvenliği"),
    focus: P("detecting and controlling hydrogen sulfide exposure in process, sewer and confined environments", "proses, kanalizasyon ve kapalı alanlarda hidrojen sülfür maruziyetinin tespiti ve kontrolü"),
    family: F,
    osha: ["OSHA 1910.1000", "OSHA 1910.146", "OSHA 1910.134"],
    hazards: [P("Toxic exposure at concentrations that can rapidly incapacitate", "Hızla etkisiz hale getirebilen konsantrasyonlarda toksik maruziyet"), P("Reliance on odor despite olfactory fatigue", "Koku duyusunun körelmesine rağmen kokuya güvenmek")],
    controls: [P("Use direct-reading monitoring where H2S can be present and establish alarm/action levels.", "H2S bulunabilecek yerlerde doğrudan okuyan cihaz kullanın ve alarm/aksiyon seviyeleri belirleyin."), P("Control the source, ventilate and use respiratory protection only under a compliant program.", "Kaynağı kontrol edin, havalandırın ve solunum koruyucuyu yalnız uygun program kapsamında kullanın.")],
  },
  {
    slug: "lel-explosive-atmospheres",
    title: P("LEL & Explosive Atmospheres", "LEL ve Patlayıcı Atmosferler"),
    focus: P("monitoring and controlling flammable atmospheres before introducing ignition sources", "tutuşturucu kaynak kullanılmadan önce yanıcı atmosferlerin izlenmesi ve kontrolü"),
    family: F,
    osha: ["OSHA 1910.146", "OSHA 1910.307", "OSHA 1910.252"],
    hazards: [P("Flammable vapor or gas concentration entering an ignitable range", "Yanıcı buhar veya gaz konsantrasyonunun tutuşabilir aralığa girmesi"), P("Detector limitations, sensor poisoning or wrong calibration gas", "Dedektör sınırlamaları, sensör zehirlenmesi veya yanlış kalibrasyon gazı")],
    controls: [P("Confirm the monitor is suitable for the expected gas/vapor and environmental conditions.", "Dedektörün beklenen gaz/buhar ve çevre koşullarına uygunluğunu doğrulayın."), P("Stop ignition-source work whenever readings exceed the approved limit or trend upward unexpectedly.", "Ölçüm onaylı limiti aşarsa veya beklenmedik şekilde yükselirse tutuşturucu kaynaklı işi durdurun.")],
  },
];

export const generatedConfinedAtmosphericGuides = blueprints.map(buildGeneratedGuide);
