import type { SafetyGuide, LocalizedText } from "../../../components/GuideTemplate";

export type Pair = LocalizedText;

export type GuideFamily = {
  category: Pair;
  baseHazards: Pair[];
  baseControls: Pair[];
  basePPE: Pair[];
  commonMistakes: Pair[];
  checklist: Pair[];
  emergencyTitle: Pair;
  emergencyText: Pair;
};

export type GuideBlueprint = {
  slug: string;
  title: Pair;
  focus: Pair;
  family: GuideFamily;
  risk?: "high" | "medium";
  readTime?: number;
  osha: string[];
  hazards: Pair[];
  controls: Pair[];
  ppe?: Pair[];
  checklist?: Pair[];
  keywords?: Pair[];
};

const mapPairList = (items: Pair[], lang: "en" | "tr") => items.map((item) => item[lang]);

export function buildGeneratedGuide(def: GuideBlueprint): SafetyGuide {
  const highRisk = def.risk !== "medium";
  const hazards = [...def.hazards, ...def.family.baseHazards].slice(0, 8);
  const controls = [...def.controls, ...def.family.baseControls].slice(0, 9);
  const ppe = [...(def.ppe ?? []), ...def.family.basePPE].slice(0, 7);
  const checklist = [...(def.checklist ?? []), ...def.family.checklist].slice(0, 8);

  return {
    slug: def.slug,
    category: def.family.category,
    title: def.title,
    description: {
      en: `Practical HSE guidance for ${def.focus.en}, with field-ready controls, verification points and stop-work triggers.`,
      tr: `${def.focus.tr} için sahada uygulanabilir kontroller, doğrulama noktaları ve işi durdurma kriterleri içeren pratik İSG rehberi.`,
    },
    overview: {
      en: `${def.title.en} should be managed through a planned system of work: identify the task-specific hazards, eliminate exposure where practical, use engineered or collective controls before relying on PPE, verify critical safeguards before starting, and stop the task when controls are missing or conditions change. This guide applies those principles specifically to ${def.focus.en}.`,
      tr: `${def.title.tr}; işe özgü tehlikelerin belirlenmesi, mümkün olduğunda maruziyetin ortadan kaldırılması, KKD'den önce mühendislik veya toplu koruma önlemlerinin kullanılması, işe başlamadan kritik kontrollerin doğrulanması ve koşullar değiştiğinde işin durdurulması esaslarıyla yönetilmelidir. Bu rehber bu yaklaşımı özellikle ${def.focus.tr} için uygular.`,
    },
    readTime: def.readTime ?? 7,
    riskLevel: highRisk
      ? { en: "High Risk", tr: "Yüksek Risk" }
      : { en: "Controlled Risk", tr: "Kontrollü Risk" },
    standard: "OSHA",
    hazards: {
      en: mapPairList(hazards, "en"),
      tr: mapPairList(hazards, "tr"),
    },
    requiredPPE: {
      en: mapPairList(ppe, "en"),
      tr: mapPairList(ppe, "tr"),
    },
    controls: {
      en: mapPairList(controls, "en"),
      tr: mapPairList(controls, "tr"),
    },
    commonMistakes: {
      en: mapPairList(def.family.commonMistakes, "en"),
      tr: mapPairList(def.family.commonMistakes, "tr"),
    },
    checklist: {
      title: { en: "Pre-work Verification", tr: "İş Öncesi Doğrulama" },
      en: mapPairList(checklist, "en"),
      tr: mapPairList(checklist, "tr"),
    },
    emergencySection: {
      title: def.family.emergencyTitle,
      content: def.family.emergencyText,
    },
    // Content follows broad international HSE practice and the hierarchy of controls.
    // Per SERNEM publishing policy, only OSHA references are exposed to end users.
    references: def.osha.filter((reference) => reference.toUpperCase().startsWith("OSHA")),
    searchKeywords: def.keywords
      ? {
          en: mapPairList(def.keywords, "en"),
          tr: mapPairList(def.keywords, "tr"),
        }
      : undefined,
    aiText: {
      en: `Ask SERNEM AI about ${def.title.en.toLowerCase()} and connect this guidance with inspections, toolbox talks and risk assessment workflows.`,
      tr: `SERNEM AI'a ${def.title.tr.toLocaleLowerCase("tr-TR")} hakkında soru sor; bu rehberi denetim, toolbox ve risk değerlendirmesi akışlarıyla birlikte kullan.`,
    },
  };
}

export const commonFamilies = {
  height: {
    category: { en: "Working at Height & Access", tr: "Yüksekte Çalışma ve Erişim" },
    baseHazards: [
      { en: "Falls to a lower level", tr: "Alt seviyeye düşme" },
      { en: "Dropped objects striking people below", tr: "Düşen cisimlerin aşağıdaki kişilere çarpması" },
      { en: "Unsafe access or unstable working position", tr: "Güvensiz erişim veya dengesiz çalışma konumu" },
    ],
    baseControls: [
      { en: "Eliminate work at height where the task can be completed from a safe level.", tr: "İş güvenli bir seviyeden yapılabiliyorsa yüksekte çalışmayı ortadan kaldırın." },
      { en: "Prioritize guardrails, platforms and other collective fall-prevention measures.", tr: "Korkuluk, platform ve diğer toplu düşme önleme tedbirlerine öncelik verin." },
      { en: "Inspect access and fall-protection equipment before use and remove defective equipment from service.", tr: "Erişim ve düşüş koruma ekipmanını kullanım öncesi kontrol edin; kusurlu ekipmanı kullanımdan çıkarın." },
      { en: "Barricade the area below and maintain a practical rescue plan.", tr: "Alt bölgeyi bariyerleyin ve uygulanabilir bir kurtarma planı bulundurun." },
    ],
    basePPE: [
      { en: "Safety helmet with secured chin strap where required", tr: "Gerekli durumlarda çene bantlı baret" },
      { en: "Slip-resistant safety footwear", tr: "Kaymaz tabanlı iş ayakkabısı" },
      { en: "Task-specific gloves and eye protection", tr: "İşe uygun eldiven ve göz koruması" },
    ],
    commonMistakes: [
      { en: "Using improvised access or standing on unsuitable objects", tr: "Geçici erişim kullanmak veya uygunsuz cisimlerin üzerinde durmak" },
      { en: "Starting before anchorage, edge protection or rescue arrangements are verified", tr: "Ankraj, kenar koruması veya kurtarma düzeni doğrulanmadan başlamak" },
      { en: "Ignoring wind, rain, ice or changing surface conditions", tr: "Rüzgâr, yağmur, buzlanma veya değişen yüzey koşullarını dikkate almamak" },
      { en: "Allowing tools or materials to remain unsecured at height", tr: "Alet veya malzemeleri yüksekte sabitlemeden bırakmak" },
    ],
    checklist: [
      { en: "Safe access and working platform are confirmed", tr: "Güvenli erişim ve çalışma platformu doğrulandı" },
      { en: "Fall-prevention or fall-arrest controls are inspected", tr: "Düşme önleme veya düşüş durdurma kontrolleri incelendi" },
      { en: "Area below is controlled and rescue arrangements are ready", tr: "Alt alan kontrol altında ve kurtarma düzeni hazır" },
    ],
    emergencyTitle: { en: "Fall & Rescue Readiness", tr: "Düşüş ve Kurtarma Hazırlığı" },
    emergencyText: { en: "Stop work after a fall, equipment failure or loss of a critical protection measure. Protect the area, summon trained responders and use the planned rescue method rather than improvising at height.", tr: "Düşüş, ekipman arızası veya kritik bir korumanın kaybı halinde işi durdurun. Alanı güvenceye alın, eğitimli müdahale ekibini çağırın ve yüksekte doğaçlama yerine planlı kurtarma yöntemini kullanın." },
  } satisfies GuideFamily,

  lifting: {
    category: { en: "Lifting, Rigging & Mobile Equipment", tr: "Kaldırma, Sapanlama ve Mobil Ekipman" },
    baseHazards: [
      { en: "Dropped or uncontrolled loads", tr: "Düşen veya kontrolsüz yükler" },
      { en: "Crushing and line-of-fire exposure", tr: "Ezilme ve ateş hattı maruziyeti" },
      { en: "Equipment instability or overload", tr: "Ekipman dengesizliği veya aşırı yükleme" },
    ],
    baseControls: [
      { en: "Confirm equipment capacity, configuration and inspection status before use.", tr: "Kullanım öncesi ekipman kapasitesini, konfigürasyonunu ve kontrol durumunu doğrulayın." },
      { en: "Use a lift plan or task plan appropriate to the complexity and risk.", tr: "Karmaşıklık ve riske uygun bir kaldırma veya görev planı kullanın." },
      { en: "Establish an exclusion zone and keep people out of the load path and pinch points.", tr: "Yasaklı bölge oluşturun; kişileri yük yolu ve sıkışma noktalarından uzak tutun." },
      { en: "Use competent operators and agreed communication signals.", tr: "Yetkin operatörler ve üzerinde anlaşılmış iletişim işaretleri kullanın." },
    ],
    basePPE: [
      { en: "Safety helmet", tr: "Baret" },
      { en: "Safety footwear", tr: "İş ayakkabısı" },
      { en: "Task-appropriate gloves and high-visibility clothing", tr: "İşe uygun eldiven ve yüksek görünürlüklü kıyafet" },
    ],
    commonMistakes: [
      { en: "Standing beneath or beside a suspended load", tr: "Askıdaki yükün altında veya yanında durmak" },
      { en: "Using damaged or unidentified rigging equipment", tr: "Hasarlı veya tanımlaması olmayan sapanlama ekipmanı kullanmak" },
      { en: "Operating without clear signals or a defined exclusion zone", tr: "Net işaretleşme veya tanımlı yasaklı bölge olmadan çalışmak" },
      { en: "Assuming ground conditions and equipment capacity without verification", tr: "Zemin koşulları ve ekipman kapasitesini doğrulamadan varsaymak" },
    ],
    checklist: [
      { en: "Equipment inspection and capacity are verified", tr: "Ekipman kontrolü ve kapasitesi doğrulandı" },
      { en: "Load, route and exclusion zone are understood", tr: "Yük, güzergâh ve yasaklı bölge anlaşıldı" },
      { en: "Operator, rigger and signal communication are confirmed", tr: "Operatör, sapancı ve işaretçi iletişimi doğrulandı" },
    ],
    emergencyTitle: { en: "Load-Control Emergency", tr: "Yük Kontrolü Acil Durumu" },
    emergencyText: { en: "If a load becomes unstable, communication is lost or equipment behaves abnormally, stop movement, keep the exclusion zone clear and stabilize the situation before any recovery attempt.", tr: "Yük dengesizleşirse, iletişim kaybolursa veya ekipman anormal davranırsa hareketi durdurun, yasaklı bölgeyi boş tutun ve herhangi bir kurtarma girişiminden önce durumu stabilize edin." },
  } satisfies GuideFamily,

  energy: {
    category: { en: "Electrical, Energy & Machinery", tr: "Elektrik, Enerji ve Makine" },
    baseHazards: [
      { en: "Unexpected energization or start-up", tr: "Beklenmeyen enerjilenme veya çalıştırma" },
      { en: "Electric shock, arc or stored-energy release", tr: "Elektrik çarpması, ark veya depolanmış enerji boşalması" },
      { en: "Contact with moving or unguarded machine parts", tr: "Hareketli veya korumasız makine parçalarıyla temas" },
    ],
    baseControls: [
      { en: "Identify every hazardous energy source before intervention.", tr: "Müdahale öncesi tüm tehlikeli enerji kaynaklarını belirleyin." },
      { en: "Isolate, lock, release stored energy and verify a safe state before work.", tr: "Çalışma öncesi izole edin, kilitleyin, depolanmış enerjiyi boşaltın ve güvenli durumu doğrulayın." },
      { en: "Keep guards and protective devices in place unless an approved safe isolation requires removal.", tr: "Onaylı güvenli izolasyon için çıkarılması gerekmedikçe muhafaza ve koruyucu cihazları yerinde tutun." },
      { en: "Use competent persons and equipment suitable for the electrical or mechanical duty.", tr: "Elektrik veya mekanik göreve uygun ekipman ve yetkin kişiler kullanın." },
    ],
    basePPE: [
      { en: "Safety footwear", tr: "İş ayakkabısı" },
      { en: "Eye and face protection appropriate to the task", tr: "İşe uygun göz ve yüz koruması" },
      { en: "Electrical or mechanical protective gloves where the risk assessment requires them", tr: "Risk değerlendirmesinin gerektirdiği yerlerde elektriksel veya mekanik koruyucu eldiven" },
    ],
    commonMistakes: [
      { en: "Relying on a stop button instead of energy isolation", tr: "Enerji izolasyonu yerine durdurma butonuna güvenmek" },
      { en: "Failing to verify zero energy before starting work", tr: "İşe başlamadan sıfır enerjiyi doğrulamamak" },
      { en: "Defeating guards, interlocks or protective devices", tr: "Muhafaza, interlock veya koruyucu cihazları devre dışı bırakmak" },
      { en: "Ignoring gravity, pressure, spring or thermal stored energy", tr: "Yerçekimi, basınç, yay veya termal depolanmış enerjiyi göz ardı etmek" },
    ],
    checklist: [
      { en: "All energy sources are identified and isolated", tr: "Tüm enerji kaynakları belirlendi ve izole edildi" },
      { en: "Stored energy is controlled and safe state is verified", tr: "Depolanmış enerji kontrol edildi ve güvenli durum doğrulandı" },
      { en: "Guards, boundaries and competent-person requirements are confirmed", tr: "Muhafaza, sınırlar ve yetkin kişi gereklilikleri doğrulandı" },
    ],
    emergencyTitle: { en: "Electrical / Energy Emergency", tr: "Elektrik / Enerji Acil Durumu" },
    emergencyText: { en: "Do not approach an energized casualty or unstable machine until the energy source is made safe. Isolate where possible, summon emergency support and protect others from secondary exposure.", tr: "Enerji kaynağı güvenli hale getirilmeden enerjili kazazedeye veya dengesiz makineye yaklaşmayın. Mümkünse izole edin, acil desteği çağırın ve diğer kişileri ikincil maruziyetten koruyun." },
  } satisfies GuideFamily,

  hotwork: {
    category: { en: "Hot Work, Fire & Explosion", tr: "Sıcak Çalışma, Yangın ve Patlama" },
    baseHazards: [
      { en: "Ignition of combustible or flammable materials", tr: "Yanıcı veya parlayıcı maddelerin tutuşması" },
      { en: "Burns from sparks, slag, flame or hot surfaces", tr: "Kıvılcım, cüruf, alev veya sıcak yüzey kaynaklı yanıklar" },
      { en: "Fire or explosion in adjacent or hidden spaces", tr: "Bitişik veya gizli alanlarda yangın ya da patlama" },
    ],
    baseControls: [
      { en: "Remove or protect combustibles and check both sides of walls, floors and penetrations.", tr: "Yanıcıları kaldırın veya koruyun; duvar, zemin ve geçişlerin her iki tarafını kontrol edin." },
      { en: "Use the required permit, gas testing and fire-watch controls before ignition sources are introduced.", tr: "Tutuşturucu kaynak kullanılmadan önce gerekli izin, gaz ölçümü ve yangın gözcüsü kontrollerini uygulayın." },
      { en: "Provide suitable fire-fighting equipment and maintain access to emergency routes.", tr: "Uygun yangın söndürme ekipmanı sağlayın ve acil çıkış güzergâhlarını açık tutun." },
      { en: "Stop work if atmospheric conditions, ventilation or fire controls become inadequate.", tr: "Atmosfer koşulları, havalandırma veya yangın kontrolleri yetersiz hale gelirse işi durdurun." },
    ],
    basePPE: [
      { en: "Flame-resistant task clothing where required", tr: "Gerekli yerlerde aleve dayanıklı iş kıyafeti" },
      { en: "Eye and face protection suitable for the process", tr: "Prosese uygun göz ve yüz koruması" },
      { en: "Heat-resistant gloves and safety footwear", tr: "Isıya dayanıklı eldiven ve iş ayakkabısı" },
    ],
    commonMistakes: [
      { en: "Treating a permit as a substitute for physical fire controls", tr: "İzni fiziksel yangın kontrollerinin yerine koymak" },
      { en: "Ignoring sparks or heat transfer to hidden spaces", tr: "Kıvılcım veya ısının gizli alanlara aktarımını göz ardı etmek" },
      { en: "Using damaged gas hoses, regulators or electrical leads", tr: "Hasarlı gaz hortumu, regülatör veya elektrik kablosu kullanmak" },
      { en: "Ending fire watch before the area is confirmed safe", tr: "Alan güvenli olduğu doğrulanmadan yangın gözcülüğünü sonlandırmak" },
    ],
    checklist: [
      { en: "Permit and atmosphere controls are valid", tr: "İzin ve atmosfer kontrolleri geçerli" },
      { en: "Combustibles are removed or protected", tr: "Yanıcılar kaldırıldı veya korundu" },
      { en: "Fire watch and suitable extinguishing equipment are ready", tr: "Yangın gözcüsü ve uygun söndürme ekipmanı hazır" },
    ],
    emergencyTitle: { en: "Fire / Explosion Response", tr: "Yangın / Patlama Müdahalesi" },
    emergencyText: { en: "Stop the work, raise the alarm and isolate energy or fuel only when it is safe to do so. Use portable extinguishers only within training and escape-route limits; otherwise evacuate and call emergency response.", tr: "İşi durdurun, alarm verin ve yalnızca güvenliyse enerji veya yakıtı izole edin. Taşınabilir söndürücüleri yalnız eğitim ve kaçış sınırları içinde kullanın; aksi halde tahliye edin ve acil müdahaleyi çağırın." },
  } satisfies GuideFamily,

  confined: {
    category: { en: "Confined Space & Atmospheric Hazards", tr: "Kapalı Alan ve Atmosfer Tehlikeleri" },
    baseHazards: [
      { en: "Oxygen deficiency or enrichment", tr: "Oksijen yetersizliği veya zenginleşmesi" },
      { en: "Toxic or flammable atmosphere", tr: "Toksik veya yanıcı atmosfer" },
      { en: "Engulfment, entrapment or difficult rescue", tr: "Gömülme, sıkışma veya zor kurtarma" },
    ],
    baseControls: [
      { en: "Identify permit-space hazards and isolate connected energy, process and material sources.", tr: "İzinli kapalı alan tehlikelerini belirleyin; bağlı enerji, proses ve malzeme kaynaklarını izole edin." },
      { en: "Test the atmosphere with suitable calibrated instruments before and during entry as required.", tr: "Giriş öncesi ve gerektiğinde giriş boyunca atmosferi uygun kalibre cihazlarla ölçün." },
      { en: "Provide ventilation, communication, attendant coverage and controlled entry authorization.", tr: "Havalandırma, iletişim, gözcü ve kontrollü giriş yetkilendirmesi sağlayın." },
      { en: "Prepare non-entry or entry rescue arrangements appropriate to the space and hazards.", tr: "Alan ve tehlikelere uygun dışarıdan veya içeriden kurtarma düzenini hazırlayın." },
    ],
    basePPE: [
      { en: "Task-specific protective clothing and gloves", tr: "İşe özel koruyucu kıyafet ve eldiven" },
      { en: "Eye and face protection", tr: "Göz ve yüz koruması" },
      { en: "Respiratory protection only when selected through the respiratory-protection program", tr: "Yalnız solunum koruma programına göre seçilmiş solunum koruyucu" },
    ],
    commonMistakes: [
      { en: "Relying on a single pre-entry gas test", tr: "Tek bir giriş öncesi gaz ölçümüne güvenmek" },
      { en: "Entering without complete isolation or rescue arrangements", tr: "Tam izolasyon veya kurtarma düzeni olmadan girmek" },
      { en: "Allowing the attendant to become distracted or leave position", tr: "Gözcünün dikkatinin dağılmasına veya yerini terk etmesine izin vermek" },
      { en: "Using ventilation without controlling the source of contamination", tr: "Kirletici kaynağını kontrol etmeden yalnız havalandırmaya güvenmek" },
    ],
    checklist: [
      { en: "Permit, isolation and atmospheric test are valid", tr: "İzin, izolasyon ve atmosfer ölçümü geçerli" },
      { en: "Ventilation, communication and attendant are ready", tr: "Havalandırma, iletişim ve gözcü hazır" },
      { en: "Rescue equipment and response method are confirmed", tr: "Kurtarma ekipmanı ve müdahale yöntemi doğrulandı" },
    ],
    emergencyTitle: { en: "Confined-Space Rescue", tr: "Kapalı Alan Kurtarma" },
    emergencyText: { en: "Do not make an unplanned rescue entry. Raise the alarm, use retrieval or non-entry rescue where designed, and deploy trained entry rescuers only with the required protective and atmospheric controls.", tr: "Plansız kurtarma girişi yapmayın. Alarm verin, tasarlandıysa geri çekme veya dışarıdan kurtarma sistemini kullanın; girişli kurtarmayı yalnız gerekli koruyucu ve atmosfer kontrolleriyle eğitimli ekip yapsın." },
  } satisfies GuideFamily,

  civil: {
    category: { en: "Excavation, Civil & Scaffolding", tr: "Kazı, İnşaat ve İskele" },
    baseHazards: [
      { en: "Collapse, falling material or structural instability", tr: "Çökme, düşen malzeme veya yapısal dengesizlik" },
      { en: "Falls, unsafe access and struck-by exposure", tr: "Düşme, güvensiz erişim ve çarpma maruziyeti" },
      { en: "Underground services or changing ground conditions", tr: "Yeraltı hatları veya değişen zemin koşulları" },
    ],
    baseControls: [
      { en: "Inspect the work area by a competent person and reassess after changing conditions.", tr: "Çalışma alanını yetkin kişiyle kontrol edin ve koşullar değiştiğinde yeniden değerlendirin." },
      { en: "Provide stable access, edge protection and physical separation from mobile equipment.", tr: "Stabil erişim, kenar koruması ve mobil ekipmandan fiziksel ayrım sağlayın." },
      { en: "Control collapse, falling-object and service-strike hazards before work starts.", tr: "İşe başlamadan çökme, düşen cisim ve hat hasarı tehlikelerini kontrol edin." },
      { en: "Stop work when weather, ground, loading or structural conditions invalidate the safe system.", tr: "Hava, zemin, yükleme veya yapısal koşullar güvenli sistemi geçersiz kıldığında işi durdurun." },
    ],
    basePPE: [
      { en: "Safety helmet", tr: "Baret" },
      { en: "Safety footwear", tr: "İş ayakkabısı" },
      { en: "High-visibility clothing and task-specific gloves", tr: "Yüksek görünürlüklü kıyafet ve işe uygun eldiven" },
    ],
    commonMistakes: [
      { en: "Working after conditions change without a new inspection", tr: "Koşullar değiştikten sonra yeni kontrol yapmadan çalışmak" },
      { en: "Blocking safe access with materials or equipment", tr: "Güvenli erişimi malzeme veya ekipmanla kapatmak" },
      { en: "Allowing loads, spoil or people into unstable zones", tr: "Yük, hafriyat veya kişileri dengesiz bölgelere sokmak" },
      { en: "Treating tags or markings as a substitute for physical verification", tr: "Etiket veya işaretlemeyi fiziksel doğrulamanın yerine koymak" },
    ],
    checklist: [
      { en: "Competent-person inspection is current", tr: "Yetkin kişi kontrolü güncel" },
      { en: "Access, barriers and exclusion zones are in place", tr: "Erişim, bariyer ve yasaklı bölgeler yerinde" },
      { en: "Ground, structure and nearby services are verified", tr: "Zemin, yapı ve yakın hatlar doğrulandı" },
    ],
    emergencyTitle: { en: "Collapse / Structural Emergency", tr: "Çökme / Yapısal Acil Durum" },
    emergencyText: { en: "Stop access to the affected area after collapse, movement or service damage. Prevent secondary exposure and use the site emergency plan and competent rescue resources before re-entry.", tr: "Çökme, hareket veya hat hasarı sonrası etkilenen alana girişi durdurun. İkincil maruziyeti önleyin ve yeniden girişten önce saha acil durum planı ile yetkin kurtarma kaynaklarını kullanın." },
  } satisfies GuideFamily,

  tools: {
    category: { en: "Tools, Workshop & Maintenance", tr: "El Aletleri, Atölye ve Bakım" },
    baseHazards: [
      { en: "Cuts, entanglement, impact or ejected material", tr: "Kesilme, dolanma, darbe veya fırlayan parça" },
      { en: "Unexpected movement or stored pressure", tr: "Beklenmeyen hareket veya depolanmış basınç" },
      { en: "Noise, vibration, sparks or airborne debris", tr: "Gürültü, titreşim, kıvılcım veya havadaki parçacıklar" },
    ],
    baseControls: [
      { en: "Use the correct tool, accessory and rated component for the task.", tr: "İş için doğru alet, aksesuar ve uygun kapasitedeki parçayı kullanın." },
      { en: "Inspect guards, handles, cables, hoses and safety devices before use.", tr: "Kullanım öncesi muhafaza, sap, kablo, hortum ve emniyet cihazlarını kontrol edin." },
      { en: "Secure the workpiece and maintain a stable body position and clear work zone.", tr: "İş parçasını sabitleyin; dengeli çalışma konumu ve temiz çalışma alanı sağlayın." },
      { en: "Isolate energy and release pressure before maintenance, adjustment or clearing jams.", tr: "Bakım, ayar veya sıkışma giderme öncesi enerjiyi izole edin ve basıncı boşaltın." },
    ],
    basePPE: [
      { en: "Safety glasses or face protection", tr: "Koruyucu gözlük veya yüz koruması" },
      { en: "Hearing protection where exposure requires it", tr: "Maruziyet gerektiriyorsa kulak koruyucu" },
      { en: "Task-specific gloves and safety footwear", tr: "İşe uygun eldiven ve iş ayakkabısı" },
    ],
    commonMistakes: [
      { en: "Using the wrong accessory, speed rating or tool for the job", tr: "İş için yanlış aksesuar, hız sınıfı veya alet kullanmak" },
      { en: "Removing guards or bypassing safety features", tr: "Muhafazaları çıkarmak veya emniyet özelliklerini devre dışı bırakmak" },
      { en: "Attempting adjustment while energy or pressure remains", tr: "Enerji veya basınç varken ayar yapmaya çalışmak" },
      { en: "Leaving damaged cables, hoses or tools in service", tr: "Hasarlı kablo, hortum veya aleti kullanımda bırakmak" },
    ],
    checklist: [
      { en: "Tool and accessory are correct and inspected", tr: "Alet ve aksesuar doğru ve kontrol edildi" },
      { en: "Workpiece, guards and work area are secure", tr: "İş parçası, muhafaza ve çalışma alanı güvenli" },
      { en: "Energy, pressure and bystander exposure are controlled", tr: "Enerji, basınç ve çevredeki kişilerin maruziyeti kontrol altında" },
    ],
    emergencyTitle: { en: "Tool / Maintenance Incident", tr: "Alet / Bakım Olayı" },
    emergencyText: { en: "Stop the equipment, isolate all energy sources and do not restart until the cause is understood and the tool or system is confirmed safe. Provide first aid and emergency response for injury or release.", tr: "Ekipmanı durdurun, tüm enerji kaynaklarını izole edin ve neden anlaşılmadan ve alet/sistem güvenli olduğu doğrulanmadan yeniden başlatmayın. Yaralanma veya kaçak için ilk yardım ve acil müdahaleyi sağlayın." },
  } satisfies GuideFamily,

  health: {
    category: { en: "Chemical, PPE & Occupational Health", tr: "Kimyasal, KKD ve Mesleki Sağlık" },
    baseHazards: [
      { en: "Inhalation, skin, eye or ingestion exposure", tr: "Soluma, cilt, göz veya yutma yoluyla maruziyet" },
      { en: "Incompatible materials or uncontrolled release", tr: "Uyumsuz maddeler veya kontrolsüz salım" },
      { en: "Incorrect PPE selection, fit or condition", tr: "Yanlış KKD seçimi, uyumu veya durumu" },
    ],
    baseControls: [
      { en: "Identify the exposure route and eliminate or substitute the hazard where practical.", tr: "Maruziyet yolunu belirleyin; mümkünse tehlikeyi ortadan kaldırın veya ikame edin." },
      { en: "Use engineering controls, containment and ventilation before relying on PPE alone.", tr: "Yalnız KKD'ye güvenmeden önce mühendislik kontrolü, kapalı sistem ve havalandırma kullanın." },
      { en: "Maintain clear labeling, information, training and emergency arrangements.", tr: "Net etiketleme, bilgi, eğitim ve acil durum düzenini sürdürün." },
      { en: "Select, inspect and maintain PPE for the actual hazard and exposure level.", tr: "KKD'yi gerçek tehlike ve maruziyet seviyesine göre seçin, kontrol edin ve bakımını yapın." },
    ],
    basePPE: [
      { en: "PPE selected from the task and exposure assessment", tr: "Görev ve maruziyet değerlendirmesine göre seçilmiş KKD" },
      { en: "Eye and face protection where splash or particle exposure exists", tr: "Sıçrama veya parçacık maruziyetinde göz ve yüz koruması" },
      { en: "Suitable gloves and protective clothing", tr: "Uygun eldiven ve koruyucu kıyafet" },
    ],
    commonMistakes: [
      { en: "Selecting PPE by habit rather than hazard assessment", tr: "KKD'yi tehlike değerlendirmesi yerine alışkanlıkla seçmek" },
      { en: "Using damaged, contaminated or poorly fitted equipment", tr: "Hasarlı, kirlenmiş veya uyumsuz ekipman kullanmak" },
      { en: "Mixing or storing incompatible chemicals together", tr: "Uyumsuz kimyasalları birlikte karıştırmak veya depolamak" },
      { en: "Relying on PPE while a feasible engineering control is missing", tr: "Uygulanabilir mühendislik kontrolü eksikken yalnız KKD'ye güvenmek" },
    ],
    checklist: [
      { en: "Hazard information and exposure route are understood", tr: "Tehlike bilgisi ve maruziyet yolu anlaşıldı" },
      { en: "Engineering controls and emergency arrangements are ready", tr: "Mühendislik kontrolleri ve acil durum düzeni hazır" },
      { en: "PPE selection, fit and condition are verified", tr: "KKD seçimi, uyumu ve durumu doğrulandı" },
    ],
    emergencyTitle: { en: "Exposure / Spill Response", tr: "Maruziyet / Dökülme Müdahalesi" },
    emergencyText: { en: "Move exposed people to a safe area without creating additional exposure, use emergency washing or first aid as applicable, isolate the source when safe and follow the product and site emergency arrangements.", tr: "Ek maruziyet yaratmadan etkilenen kişileri güvenli alana alın, uygun acil yıkama veya ilk yardımı uygulayın, güvenliyse kaynağı izole edin ve ürün/saha acil durum düzenini takip edin." },
  } satisfies GuideFamily,

  general: {
    category: { en: "General HSE Management & Emergency", tr: "Genel İSG Yönetimi ve Acil Durum" },
    baseHazards: [
      { en: "Uncontrolled changes, unclear responsibilities or missing communication", tr: "Kontrolsüz değişiklikler, belirsiz sorumluluklar veya eksik iletişim" },
      { en: "People entering hazards without adequate planning or verification", tr: "Yeterli planlama veya doğrulama olmadan kişilerin tehlikeye girmesi" },
      { en: "Delayed response to changing conditions, incidents or warning signs", tr: "Değişen koşul, olay veya uyarı işaretlerine gecikmiş müdahale" },
    ],
    baseControls: [
      { en: "Define responsibilities, critical controls and stop-work triggers before work begins.", tr: "İş başlamadan sorumlulukları, kritik kontrolleri ve işi durdurma kriterlerini belirleyin." },
      { en: "Communicate the plan in a way workers can understand and verify understanding.", tr: "Planı çalışanların anlayacağı şekilde paylaşın ve anlaşıldığını doğrulayın." },
      { en: "Use field verification, observations and supervision to confirm controls remain effective.", tr: "Kontrollerin etkili kaldığını doğrulamak için saha doğrulaması, gözlem ve gözetim kullanın." },
      { en: "Learn from deviations, near misses and incidents and close corrective actions.", tr: "Sapma, ramak kala ve olaylardan öğrenin; düzeltici faaliyetleri kapatın." },
    ],
    basePPE: [
      { en: "Site minimum PPE as required by the task and work area", tr: "Görev ve çalışma alanına göre saha asgari KKD'si" },
      { en: "High-visibility clothing where vehicle interaction exists", tr: "Araç etkileşimi olan yerlerde yüksek görünürlüklü kıyafet" },
    ],
    commonMistakes: [
      { en: "Using paperwork as proof that field controls are effective", tr: "Evrakı saha kontrollerinin etkili olduğunun kanıtı saymak" },
      { en: "Continuing after conditions change without reassessment", tr: "Koşullar değiştiğinde yeniden değerlendirmeden devam etmek" },
      { en: "Closing actions administratively without field verification", tr: "Saha doğrulaması yapmadan faaliyetleri idari olarak kapatmak" },
      { en: "Failing to involve the people who perform the work", tr: "İşi yapan kişileri sürece dahil etmemek" },
    ],
    checklist: [
      { en: "Roles, hazards and critical controls are understood", tr: "Roller, tehlikeler ve kritik kontroller anlaşıldı" },
      { en: "Worksite conditions match the approved plan", tr: "Saha koşulları onaylı planla uyumlu" },
      { en: "Stop-work and emergency communication are known", tr: "İşi durdurma ve acil durum iletişimi biliniyor" },
    ],
    emergencyTitle: { en: "Escalation & Emergency Response", tr: "Eskalasyon ve Acil Müdahale" },
    emergencyText: { en: "When critical controls fail or conditions become uncertain, stop the activity, make the area safe, notify the responsible supervisor/HSE function and restart only after reassessment and authorization.", tr: "Kritik kontroller başarısız olduğunda veya koşullar belirsizleştiğinde faaliyeti durdurun, alanı güvenli hale getirin, sorumlu amir/İSG birimini bilgilendirin ve yalnız yeniden değerlendirme ile yetkilendirme sonrası başlatın." },
  } satisfies GuideFamily,
};
