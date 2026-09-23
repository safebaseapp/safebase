import { buildGeneratedGuide, commonFamilies, type GuideBlueprint, type Pair } from "./factory";

const P = (en: string, tr: string): Pair => ({ en, tr });
const F = commonFamilies.energy;

const blueprints: GuideBlueprint[] = [
  {
    slug: "arc-flash-safety",
    title: P("Arc Flash Safety", "Ark Parlaması Güvenliği"),
    focus: P("controlling arc-flash and shock exposure around energized electrical equipment", "enerjili elektrik ekipmanı çevresinde ark parlaması ve elektrik çarpması maruziyetinin kontrolü"),
    family: F,
    osha: ["OSHA 1910 Subpart S", "OSHA 1910.335"],
    hazards: [P("Thermal energy, pressure wave and molten metal from an arc event", "Ark olayında termal enerji, basınç dalgası ve erimiş metal"), P("Approach to exposed energized parts without adequate boundaries or protection", "Yeterli sınır veya koruma olmadan açık enerjili parçalara yaklaşma")],
    controls: [P("De-energize electrical equipment whenever feasible before work begins.", "Mümkün olduğunda çalışmadan önce elektrik ekipmanının enerjisini kesin."), P("Where energized work is justified, establish boundaries, competent-person controls and suitable protective equipment.", "Enerjili çalışma gerekliyse sınırlar, yetkin kişi kontrolleri ve uygun koruyucu ekipman belirleyin.")],
  },
  {
    slug: "portable-electrical-tools",
    title: P("Portable Electrical Tool Safety", "Taşınabilir Elektrikli El Aletleri Güvenliği"),
    focus: P("inspection and safe use of portable electrical tools and leads", "taşınabilir elektrikli el aletleri ve kabloların kontrolü ve güvenli kullanımı"),
    family: F,
    osha: ["OSHA 1926 Subpart K", "OSHA 1910.334"],
    hazards: [P("Damaged insulation, plugs or extension leads", "Hasarlı izolasyon, fiş veya uzatma kablosu"), P("Use in wet, conductive or damaged environments", "Islak, iletken veya hasarlı ortamlarda kullanım")],
    controls: [P("Inspect tool body, cable, plug and protective devices before use.", "Kullanım öncesi alet gövdesi, kablo, fiş ve koruyucu cihazları kontrol edin."), P("Keep electrical connections dry, protected and suitable for the environment and supply.", "Elektrik bağlantılarını kuru, korumalı ve ortam/beslemeye uygun tutun.")],
  },
  {
    slug: "temporary-electrical-installations",
    title: P("Temporary Electrical Installation Safety", "Geçici Elektrik Tesisatı Güvenliği"),
    focus: P("safe temporary power distribution, cabling and protective devices on worksites", "şantiyelerde geçici enerji dağıtımı, kablolama ve koruyucu cihazların güvenli yönetimi"),
    family: F,
    osha: ["OSHA 1926 Subpart K", "OSHA 1910 Subpart S"],
    hazards: [P("Exposed live parts or improvised distribution boards", "Açık enerjili parçalar veya uygunsuz geçici panolar"), P("Cables damaged by traffic, water, sharp edges or poor routing", "Trafik, su, keskin kenar veya kötü güzergâh nedeniyle hasarlı kablolar")],
    controls: [P("Use protected distribution equipment and suitable overcurrent/ground-fault protection.", "Korumalı dağıtım ekipmanı ve uygun aşırı akım/toprak kaçağı koruması kullanın."), P("Route and protect temporary cables to prevent mechanical damage and trip hazards.", "Geçici kabloları mekanik hasar ve takılma riskini önleyecek şekilde güzergâhlayın ve koruyun.")],
  },
  {
    slug: "electrical-isolation-verification",
    title: P("Electrical Isolation Verification", "Elektrik İzolasyonu Doğrulaması"),
    focus: P("proving electrical isolation and absence of hazardous voltage before work", "çalışma öncesi elektrik izolasyonunun ve tehlikeli gerilim yokluğunun doğrulanması"),
    family: F,
    osha: ["OSHA 1910.147", "OSHA 1910.333"],
    hazards: [P("Backfeed, multiple supplies or incorrectly identified circuits", "Geri besleme, çoklu kaynak veya yanlış tanımlanmış devreler"), P("Assuming isolation without testing for absence of voltage", "Gerilim yokluğunu ölçmeden izolasyon varsaymak")],
    controls: [P("Identify every supply and isolate using the approved energy-control procedure.", "Tüm beslemeleri belirleyin ve onaylı enerji kontrol prosedürüyle izole edin."), P("Verify the test instrument, prove absence of voltage, then re-prove the instrument as required by the safe method.", "Test cihazını doğrulayın, gerilim yokluğunu ölçün ve güvenli yönteme göre cihazı tekrar doğrulayın.")],
  },
  {
    slug: "zero-energy-verification",
    title: P("Zero-Energy Verification", "Sıfır Enerji Doğrulaması"),
    focus: P("confirming electrical, mechanical, hydraulic, pneumatic and other energy is controlled before maintenance", "bakım öncesi elektrik, mekanik, hidrolik, pnömatik ve diğer enerjilerin kontrol edildiğinin doğrulanması"),
    family: F,
    osha: ["OSHA 1910.147"],
    hazards: [P("Residual pressure, gravity or spring force after isolation", "İzolasyon sonrası kalan basınç, yerçekimi veya yay kuvveti"), P("Unexpected restart from remote, automatic or secondary energy sources", "Uzak, otomatik veya ikincil enerji kaynaklarından beklenmeyen yeniden çalışma")],
    controls: [P("Dissipate, block or restrain stored energy after isolation.", "İzolasyon sonrası depolanmış enerjiyi boşaltın, bloke edin veya sınırlandırın."), P("Attempt safe start/test or otherwise verify the equipment cannot energize before work begins.", "İş başlamadan ekipmanın enerjilenemediğini güvenli başlatma/test veya uygun doğrulama ile teyit edin.")],
  },
  {
    slug: "machine-guarding",
    title: P("Machine Guarding", "Makine Koruyucuları"),
    focus: P("preventing contact with points of operation, rotating parts and in-running nip points", "operasyon noktası, dönen parçalar ve sıkıştırma noktalarıyla teması önleme"),
    family: F,
    osha: ["OSHA 1910.212"],
    hazards: [P("Exposure to rotating shafts, belts, gears or cutting points", "Dönen mil, kayış, dişli veya kesme noktalarına maruziyet"), P("Ejected chips or material from the point of operation", "Operasyon noktasından fırlayan talaş veya malzeme")],
    controls: [P("Keep fixed and interlocked guards installed and effective during operation.", "Çalışma sırasında sabit ve interlocklu muhafazaları yerinde ve etkili tutun."), P("Isolate the machine before removing guards, clearing jams or entering the danger zone.", "Muhafaza çıkarma, sıkışma giderme veya tehlikeli alana giriş öncesi makineyi izole edin.")],
  },
  {
    slug: "stored-energy-hazards",
    title: P("Stored Energy Hazards", "Depolanmış Enerji Tehlikeleri"),
    focus: P("recognizing and controlling pressure, gravity, spring, thermal and mechanical stored energy", "basınç, yerçekimi, yay, termal ve mekanik depolanmış enerjinin tanınması ve kontrolü"),
    family: F,
    osha: ["OSHA 1910.147"],
    hazards: [P("Pressure trapped behind valves, pistons or accumulators", "Vana, piston veya akümülatör arkasında hapsolmuş basınç"), P("Raised, suspended or spring-loaded components moving unexpectedly", "Yükseltilmiş, askıdaki veya yay yüklü parçaların beklenmedik hareketi")],
    controls: [P("Identify stored-energy points during task planning and isolation design.", "Görev planlama ve izolasyon tasarımında depolanmış enerji noktalarını belirleyin."), P("Bleed, discharge, lower, block, restrain or otherwise neutralize stored energy before exposure.", "Maruziyet öncesi depolanmış enerjiyi boşaltın, indirin, bloke edin, sınırlandırın veya nötralize edin.")],
  },
  {
    slug: "pneumatic-tool-safety",
    title: P("Pneumatic Tool Safety", "Pnömatik Alet Güvenliği"),
    focus: P("safe hoses, couplings, pressure control and operation of pneumatic tools", "pnömatik aletlerde güvenli hortum, kuplaj, basınç kontrolü ve kullanım"),
    family: F,
    osha: ["OSHA 1926.302(b)", "OSHA 1910.242"],
    hazards: [P("Hose whip or coupling separation", "Hortum savrulması veya kuplaj ayrılması"), P("High-velocity particles, noise and unintended tool activation", "Yüksek hızlı parçacık, gürültü ve istem dışı alet çalışması")],
    controls: [P("Inspect hoses, couplings and retaining devices before pressurizing.", "Basınç vermeden önce hortum, kuplaj ve emniyet bağlantılarını kontrol edin."), P("Depressurize before disconnection, adjustment or maintenance.", "Sökme, ayar veya bakım öncesi basıncı boşaltın.")],
  },
  {
    slug: "hydraulic-system-safety",
    title: P("Hydraulic System Safety", "Hidrolik Sistem Güvenliği"),
    focus: P("controlling high-pressure fluid, stored energy and component movement in hydraulic systems", "hidrolik sistemlerde yüksek basınçlı akışkan, depolanmış enerji ve parça hareketinin kontrolü"),
    family: F,
    osha: ["OSHA 1910.147", "OSHA 1910.169"],
    hazards: [P("High-pressure fluid injection through damaged hoses or fittings", "Hasarlı hortum veya bağlantıdan yüksek basınçlı sıvı enjeksiyonu"), P("Unexpected movement when pressure is released or reapplied", "Basınç boşalırken veya yeniden uygulanırken beklenmeyen hareket")],
    controls: [P("Never use hands to search for hydraulic leaks; use safe detection methods.", "Hidrolik kaçağı elle aramayın; güvenli tespit yöntemi kullanın."), P("Isolate, depressurize and mechanically support raised components before maintenance.", "Bakım öncesi izole edin, basıncı boşaltın ve yükseltilmiş parçaları mekanik olarak destekleyin.")],
  },
];

export const generatedEnergyMachineryGuides = blueprints.map(buildGeneratedGuide);
