"use client";

import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { createClient } from "../../utils/supabase/client";

type Locale = "tr" | "en";
type Level = "low" | "medium" | "high" | "extreme";

type Activity = {
  id: string;
  icon: string;
  tr: string;
  en: string;
};

type Interaction = {
  level: Level;
  initialRisk: number;
  residualRisk: number;
  hazardsTr: string[];
  hazardsEn: string[];
  controlsTr: string[];
  controlsEn: string[];
};

type Props = {
  locale: Locale;
};

const activities: Activity[] = [
  { id: "hot-work", icon: "🔥", tr: "Sıcak Çalışma", en: "Hot Work" },
  { id: "lifting", icon: "🏗️", tr: "Kaldırma Operasyonu", en: "Lifting Operation" },
  { id: "work-at-height", icon: "🦺", tr: "Yüksekte Çalışma", en: "Work at Height" },
  { id: "confined-space", icon: "⚠️", tr: "Kapalı Alan Çalışması", en: "Confined Space Entry" },
  { id: "excavation", icon: "🚧", tr: "Kazı Çalışması", en: "Excavation" },
  { id: "electrical", icon: "⚡", tr: "Elektrik Çalışması", en: "Electrical Work" },
  { id: "chemical", icon: "🧪", tr: "Kimyasal Çalışma", en: "Chemical Handling" },
  { id: "air-blowing", icon: "💨", tr: "Air Blowing / Basınç Testi", en: "Air Blowing / Pressure Testing" },
];

const levelMeta: Record<
  Level,
  {
    tr: string;
    en: string;
    badge: string;
    dot: string;
    scoreClass: string;
  }
> = {
  low: {
    tr: "Düşük",
    en: "Low",
    badge: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
    dot: "bg-emerald-400",
    scoreClass: "text-emerald-400",
  },
  medium: {
    tr: "Orta",
    en: "Medium",
    badge: "border-yellow-400/20 bg-yellow-500/10 text-yellow-300",
    dot: "bg-yellow-400",
    scoreClass: "text-yellow-400",
  },
  high: {
    tr: "Yüksek",
    en: "High",
    badge: "border-orange-400/20 bg-orange-500/10 text-orange-300",
    dot: "bg-orange-500",
    scoreClass: "text-orange-400",
  },
  extreme: {
    tr: "Çok Yüksek",
    en: "Extreme",
    badge: "border-red-400/20 bg-red-500/10 text-red-300",
    dot: "bg-red-500",
    scoreClass: "text-red-400",
  },
};

function makeInteraction(
  level: Level,
  initialRisk: number,
  residualRisk: number,
  hazardsTr: string[],
  hazardsEn: string[],
  controlsTr: string[],
  controlsEn: string[]
): Interaction {
  return {
    level,
    initialRisk,
    residualRisk,
    hazardsTr,
    hazardsEn,
    controlsTr,
    controlsEn,
  };
}

const defaultHazardsTr = [
  "Çalışma alanlarının birbirini etkilemesi",
  "Personel ve ekipman güzergâhlarının çakışması",
  "İletişim ve koordinasyon eksikliği",
];

const defaultHazardsEn = [
  "Interaction between work areas",
  "Conflicting personnel and equipment routes",
  "Communication and coordination failure",
];

const defaultControlsTr = [
  "PTW koordinasyonu sağlayın",
  "Çalışma alanlarını ayırın ve erişimi kontrol edin",
  "Sorumlu supervisorlar arasında sürekli iletişim sağlayın",
  "SIMOPS öncesi ortak toolbox meeting gerçekleştirin",
];

const defaultControlsEn = [
  "Coordinate permits to work",
  "Segregate work areas and control access",
  "Maintain communication between responsible supervisors",
  "Conduct a joint SIMOPS toolbox meeting before work starts",
];

const specificInteractions: Record<string, Interaction> = {

  "air-blowing|chemical": makeInteraction(
    "high", 12, 6,
    [
      "Basınçlı hava akışının kimyasal madde veya buharları yayması",
      "Kimyasal sıçrama ve aerosol oluşumu",
      "Personelin eş zamanlı basınç ve kimyasal maruziyeti",
    ],
    [
      "Compressed air dispersing chemicals or vapors",
      "Chemical splash and aerosol generation",
      "Combined personnel exposure to pressure and chemicals",
    ],
    [
      "Kimyasal alan ile air blowing alanını fiziksel olarak ayırın",
      "SDS ve gerekli PPE gerekliliklerini doğrulayın",
      "Basınç tahliye yönünü güvenli bölgeye çevirin",
      "Gereksiz personelin alana girişini engelleyin",
    ],
    [
      "Physically segregate chemical and air-blowing areas",
      "Verify SDS and required PPE",
      "Direct pressure release toward a safe area",
      "Prevent unnecessary personnel access",
    ]
  ),

  "air-blowing|confined-space": makeInteraction(
    "extreme", 20, 8,
    [
      "Kapalı alanda ani basınç veya hava hareketi",
      "Toz, tortu veya kontaminantların atmosfere yayılması",
      "Oksijen ve atmosfer koşullarının hızla değişmesi",
      "Tahliye yolunun hortum veya ekipmanla engellenmesi",
    ],
    [
      "Sudden pressure or airflow inside confined space",
      "Release of dust, debris or contaminants",
      "Rapid change in oxygen or atmospheric conditions",
      "Escape route obstruction by hoses or equipment",
    ],
    [
      "Kapalı alan girişini air blowing süresince durdurmayı değerlendirin",
      "Sürekli atmosfer ölçümü sağlayın",
      "Basınç ve enerji izolasyonunu doğrulayın",
      "Tahliye yollarını tamamen açık tutun",
      "Dedicated attendant ve SIMOPS koordinatörü görevlendirin",
    ],
    [
      "Consider suspending confined-space entry during air blowing",
      "Provide continuous atmospheric monitoring",
      "Verify pressure and energy isolation",
      "Keep escape routes completely clear",
      "Assign a dedicated attendant and SIMOPS coordinator",
    ]
  ),

  "air-blowing|electrical": makeInteraction(
    "high", 15, 6,
    [
      "Basınçlı hava veya partiküllerin elektrik ekipmanını etkilemesi",
      "Geçici kabloların hortum güzergâhıyla çakışması",
      "Nem veya kontaminantın elektrik ekipmanına taşınması",
    ],
    [
      "Compressed air or particles affecting electrical equipment",
      "Temporary cables conflicting with hose routes",
      "Moisture or contaminants reaching electrical equipment",
    ],
    [
      "Elektrik ekipmanını mümkünse enerjisiz bırakın",
      "Hortum ve kablo güzergâhlarını ayırın",
      "Elektrik panolarını ve bağlantıları koruyun",
      "Yetkili elektrik personeli ile koordinasyon sağlayın",
    ],
    [
      "De-energize electrical equipment where possible",
      "Separate hose and cable routes",
      "Protect electrical panels and connections",
      "Coordinate with authorized electrical personnel",
    ]
  ),

  "air-blowing|excavation": makeInteraction(
    "high", 12, 6,
    [
      "Hortumların kazı kenarı ve geçiş yollarıyla çakışması",
      "Basınçlı hava nedeniyle toz ve görüş kaybı",
      "Kazı stabilitesinin titreşim veya ekipman hareketinden etkilenmesi",
    ],
    [
      "Hoses conflicting with excavation edges and access routes",
      "Dust and reduced visibility from compressed air",
      "Excavation stability affected by vibration or equipment movement",
    ],
    [
      "Kazı kenarından güvenli mesafe bırakın",
      "Hortum güzergâhını bariyerlerle belirleyin",
      "Toz kontrolü ve göz koruması uygulayın",
      "Kazı erişim yollarını açık tutun",
    ],
    [
      "Maintain safe distance from excavation edges",
      "Define hose routes with barriers",
      "Apply dust control and eye protection",
      "Keep excavation access routes clear",
    ]
  ),

  "air-blowing|hot-work": makeInteraction(
    "high", 15, 6,
    [
      "Basınçlı havanın kıvılcım ve sıcak partikülleri yayması",
      "Yanıcı gaz veya buharların sıcak çalışma alanına taşınması",
      "Hortumların sıcak yüzey veya kaynak ekipmanıyla teması",
    ],
    [
      "Compressed air spreading sparks and hot particles",
      "Flammable gases or vapors being carried into the hot-work area",
      "Hoses contacting hot surfaces or welding equipment",
    ],
    [
      "Faaliyet alanlarını fiziksel olarak ayırın",
      "Gaz ölçümü ve fire watch sağlayın",
      "Hortumları sıcak yüzeylerden uzak tutun",
      "İki PTW arasındaki SIMOPS koordinasyonunu doğrulayın",
    ],
    [
      "Physically segregate the activities",
      "Provide gas testing and fire watch",
      "Keep hoses away from hot surfaces",
      "Verify SIMOPS coordination between both permits",
    ]
  ),

  "air-blowing|lifting": makeInteraction(
    "medium", 8, 4,
    [
      "Hortumların kaldırma güzergâhında takılma yaratması",
      "Askıdaki yükün air blowing ekipmanına çarpması",
      "Gürültü nedeniyle işaretçi iletişiminin etkilenmesi",
    ],
    [
      "Hoses creating trip hazards in the lifting route",
      "Suspended loads striking air-blowing equipment",
      "Noise affecting banksman communication",
    ],
    [
      "Kaldırma rotasını hortumlardan ayırın",
      "Exclusion zone uygulayın",
      "Radyo veya belirlenmiş el işaretlerini kullanın",
      "Air blowing ekipmanını sabitleyin",
    ],
    [
      "Separate the lifting route from hoses",
      "Apply an exclusion zone",
      "Use radios or agreed hand signals",
      "Secure air-blowing equipment",
    ]
  ),

  "air-blowing|work-at-height": makeInteraction(
    "medium", 6, 3,
    [
      "Basınçlı hava nedeniyle yüksekte denge kaybı",
      "Hortum hareketinin platform veya iskele erişimini etkilemesi",
      "Partiküllerin yüksekte çalışan personele ulaşması",
    ],
    [
      "Loss of balance at height due to compressed air",
      "Hose movement affecting platform or scaffold access",
      "Particles reaching personnel working at height",
    ],
    [
      "Air blowing yönünü WAH alanından uzaklaştırın",
      "Hortumları sabitleyin",
      "Göz/yüz koruması sağlayın",
      "İskele ve erişim yollarını açık tutun",
    ],
    [
      "Direct air blowing away from the WAH area",
      "Secure hoses",
      "Provide eye and face protection",
      "Keep scaffold and access routes clear",
    ]
  ),

  "chemical|confined-space": makeInteraction(
    "extreme", 25, 10,
    [
      "Toksik veya yanıcı kimyasal buharların kapalı alanda birikmesi",
      "Oksijen seviyesinin etkilenmesi",
      "Kimyasal temas halinde tahliyenin zorlaşması",
      "Kurtarma ekibinin ikincil maruziyet riski",
    ],
    [
      "Accumulation of toxic or flammable chemical vapors",
      "Impact on oxygen concentration",
      "Difficult evacuation following chemical exposure",
      "Secondary exposure risk to rescue personnel",
    ],
    [
      "Kimyasal kullanımını mümkünse kapalı alan çalışmasından ayırın",
      "Sürekli gaz ölçümü uygulayın",
      "SDS bazlı PPE ve solunum koruması belirleyin",
      "Mekanik havalandırma sağlayın",
      "Hazır kurtarma planı ve ekipmanı bulundurun",
    ],
    [
      "Separate chemical use from confined-space work where possible",
      "Apply continuous gas monitoring",
      "Specify SDS-based PPE and respiratory protection",
      "Provide mechanical ventilation",
      "Maintain a ready rescue plan and equipment",
    ]
  ),

  "chemical|electrical": makeInteraction(
    "high", 15, 6,
    [
      "İletken veya aşındırıcı kimyasalın elektrik ekipmanına ulaşması",
      "Kimyasal döküntü nedeniyle kısa devre veya ark riski",
      "Elektrik kaynağı yakınında yanıcı kimyasal bulunması",
    ],
    [
      "Conductive or corrosive chemicals reaching electrical equipment",
      "Short circuit or arc risk from chemical spills",
      "Flammable chemicals near electrical sources",
    ],
    [
      "Elektrik kaynaklarını kimyasal alandan ayırın",
      "Uygun spill containment uygulayın",
      "LOTO gerekliliğini değerlendirin",
      "Kimyasal ve elektrik PTW sorumluları arasında koordinasyon sağlayın",
    ],
    [
      "Segregate electrical sources from chemical areas",
      "Apply suitable spill containment",
      "Assess LOTO requirements",
      "Coordinate chemical and electrical permit holders",
    ]
  ),

  "chemical|excavation": makeInteraction(
    "high", 12, 6,
    [
      "Kimyasalın toprağa veya drenaja yayılması",
      "Kazıda bilinmeyen kontamine hat veya ekipmanla temas",
      "Döküntünün kazı içinde birikmesi",
    ],
    [
      "Chemical release into soil or drainage",
      "Contact with unknown contaminated services or equipment",
      "Spill accumulation inside excavation",
    ],
    [
      "Döküntü bariyerleri ve absorbent malzeme sağlayın",
      "Yeraltı hatlarını doğrulayın",
      "Kimyasal depolamayı kazı kenarından uzak tutun",
      "Çevresel acil durum planını hazır bulundurun",
    ],
    [
      "Provide spill barriers and absorbent material",
      "Verify underground services",
      "Keep chemical storage away from excavation edges",
      "Maintain an environmental emergency plan",
    ]
  ),

  "chemical|hot-work": makeInteraction(
    "extreme", 20, 8,
    [
      "Yanıcı kimyasal veya buharın sıcak çalışma ile tutuşması",
      "Kimyasal kapların ısıya maruz kalması",
      "Toksik bozunma ürünleri oluşması",
    ],
    [
      "Ignition of flammable chemicals or vapors by hot work",
      "Chemical containers exposed to heat",
      "Generation of toxic decomposition products",
    ],
    [
      "Yanıcı kimyasalları sıcak çalışma alanından uzaklaştırın",
      "Gaz ölçümü ve fire watch sağlayın",
      "SDS uyumluluğunu doğrulayın",
      "Yangın söndürme ekipmanını hazır tutun",
      "Gerekirse faaliyetleri farklı zamanlara planlayın",
    ],
    [
      "Remove flammable chemicals from the hot-work area",
      "Provide gas testing and fire watch",
      "Verify SDS compatibility",
      "Keep firefighting equipment ready",
      "Reschedule the activities if necessary",
    ]
  ),

  "chemical|lifting": makeInteraction(
    "high", 12, 6,
    [
      "Askıdaki yükün kimyasal kap veya boru hattına çarpması",
      "Kaldırma sırasında kimyasal dökülmesi",
      "Yük rotasının kimyasal depolama alanıyla çakışması",
    ],
    [
      "Suspended load striking chemical containers or piping",
      "Chemical spill during lifting",
      "Lifting route conflicting with chemical storage",
    ],
    [
      "Kaldırma rotasını kimyasal depolamadan ayırın",
      "Kimyasal kapları sabitleyin",
      "Spill kit hazır bulundurun",
      "Exclusion zone ve banksman uygulayın",
    ],
    [
      "Separate the lifting route from chemical storage",
      "Secure chemical containers",
      "Keep a spill kit available",
      "Apply an exclusion zone and banksman",
    ]
  ),

  "chemical|work-at-height": makeInteraction(
    "high", 12, 6,
    [
      "Kimyasalın aşağıdaki veya yukarıdaki personele sıçraması",
      "Kimyasal nedeniyle kaygan yüzey oluşması",
      "PPE kullanımının hareket ve görüşü kısıtlaması",
    ],
    [
      "Chemical splash affecting personnel above or below",
      "Slippery surfaces caused by chemicals",
      "PPE restricting movement or visibility",
    ],
    [
      "Alt alanı bariyerlerle izole edin",
      "Kimyasal kapları yüksekte güvenli şekilde sabitleyin",
      "Dökülme kontrolü sağlayın",
      "WAH ve kimyasal PPE uyumluluğunu doğrulayın",
    ],
    [
      "Barricade the area below",
      "Secure chemical containers at height",
      "Provide spill control",
      "Verify compatibility of WAH and chemical PPE",
    ]
  ),

  "confined-space|electrical": makeInteraction(
    "extreme", 20, 8,
    [
      "Kapalı alanda elektrik çarpması ve sınırlı kaçış imkânı",
      "Ark flash nedeniyle yangın veya atmosfer bozulması",
      "Geçici kabloların giriş/çıkış yolunu engellemesi",
    ],
    [
      "Electric shock with limited escape inside confined space",
      "Arc flash causing fire or atmospheric deterioration",
      "Temporary cables obstructing entry or escape routes",
    ],
    [
      "LOTO ve düşük voltaj gerekliliklerini uygulayın",
      "Kaçak akım koruması sağlayın",
      "Kabloları tahliye yolundan uzak tutun",
      "Sürekli atmosfer takibi yapın",
      "Yetkili elektrikçi ve confined-space attendant koordinasyonu sağlayın",
    ],
    [
      "Apply LOTO and low-voltage requirements",
      "Provide residual-current protection",
      "Keep cables clear of escape routes",
      "Maintain continuous atmospheric monitoring",
      "Coordinate authorized electrician and confined-space attendant",
    ]
  ),

  "confined-space|excavation": makeInteraction(
    "high", 16, 8,
    [
      "Kazı içindeki kapalı alana erişim ve kurtarma zorluğu",
      "Toprak veya su girişinin kapalı alanı etkilemesi",
      "Araç ve kazı ekipmanlarının giriş noktasını engellemesi",
    ],
    [
      "Difficult access and rescue to confined spaces within excavation",
      "Soil or water ingress affecting the confined space",
      "Vehicles or excavation equipment obstructing the entry point",
    ],
    [
      "Kazı ve confined-space kurtarma planlarını birleştirin",
      "Giriş noktasını ekipmandan uzak tutun",
      "Su/toprak girişini kontrol edin",
      "Bariyer ve erişim kontrolü uygulayın",
    ],
    [
      "Integrate excavation and confined-space rescue plans",
      "Keep the entry point clear of equipment",
      "Control water and soil ingress",
      "Apply barricading and access control",
    ]
  ),

  "confined-space|hot-work": makeInteraction(
    "extreme", 20, 8,
    [
      "Kapalı alanda yanıcı buharların tutuşması",
      "Sıcak çalışma dumanlarının kapalı alana girmesi",
      "Atmosferin bozulması / oksijen seviyesinin etkilenmesi",
      "Acil durum ve tahliye faaliyetlerinin çakışması",
    ],
    [
      "Ignition of flammable vapors inside confined space",
      "Hot work fumes entering confined space",
      "Atmosphere deterioration / oxygen displacement",
      "Emergency response and evacuation conflicts",
    ],
    [
      "Her iki faaliyet için geçerli PTW doğrulaması",
      "Sürekli gaz ölçümü ve atmosfer takibi",
      "Etkili mekanik havalandırma",
      "Fire watch görevlendirilmesi",
      "Alan izolasyonu ve erişim kontrolü",
      "Supervisorlar arası doğrudan iletişim",
      "Acil durum düzenlemelerini doğrulayın",
      "Gerekirse faaliyetlerden birini yeniden planlayın",
    ],
    [
      "Valid PTW for both activities",
      "Continuous gas testing and atmosphere monitoring",
      "Effective mechanical ventilation",
      "Dedicated fire watch",
      "Area segregation and access control",
      "Direct communication between supervisors",
      "Confirm emergency arrangements",
      "Consider rescheduling one of the activities",
    ]
  ),

  "confined-space|lifting": makeInteraction(
    "extreme", 20, 8,
    [
      "Askıdaki yükün giriş/çıkış noktasını engellemesi",
      "Yük düşmesi halinde içerideki personelin tahliye edilememesi",
      "Vinç operasyonunun confined-space kurtarma ekipmanını etkilemesi",
    ],
    [
      "Suspended load blocking the entry or exit point",
      "Personnel unable to evacuate following a dropped load",
      "Crane operation interfering with confined-space rescue equipment",
    ],
    [
      "Confined-space girişinin üzerinde yük taşımayın",
      "Lifting exclusion zone oluşturun",
      "Kurtarma ekipmanını kaldırma operasyonundan ayırın",
      "Tek SIMOPS koordinatörü atayın",
      "Gerekirse operasyonları farklı zamanlarda gerçekleştirin",
    ],
    [
      "Do not move suspended loads above confined-space access",
      "Establish a lifting exclusion zone",
      "Segregate rescue equipment from lifting operations",
      "Assign one SIMOPS coordinator",
      "Perform the activities at different times if necessary",
    ]
  ),

  "confined-space|work-at-height": makeInteraction(
    "high", 12, 6,
    [
      "Yüksekte çalışmadan düşen cismin giriş noktasını etkilemesi",
      "Kapalı alan girişinin iskele veya platformla engellenmesi",
      "Acil tahliye ve yüksekte kurtarma faaliyetlerinin çakışması",
    ],
    [
      "Dropped objects affecting the confined-space entry",
      "Scaffold or platform obstructing the entry point",
      "Conflict between confined-space and height rescue activities",
    ],
    [
      "Giriş noktası üzerinde çalışma yapmayın",
      "Dropped-object prevention uygulayın",
      "Her iki kurtarma planını koordine edin",
      "Erişim ve tahliye yollarını açık tutun",
    ],
    [
      "Do not work directly above the entry point",
      "Apply dropped-object prevention controls",
      "Coordinate both rescue plans",
      "Keep access and escape routes clear",
    ]
  ),

  "electrical|excavation": makeInteraction(
    "extreme", 20, 8,
    [
      "Yeraltı elektrik kablolarına temas veya hasar",
      "Kazı ekipmanının enerji hattına yaklaşması",
      "Hasarlı kablodan ark veya elektrik çarpması",
    ],
    [
      "Contact with or damage to underground electrical cables",
      "Excavation equipment approaching energized services",
      "Arc or electric shock from damaged cables",
    ],
    [
      "Utility drawing ve cable locating işlemini doğrulayın",
      "Permit to dig uygulayın",
      "Gerekli yerlerde kabloları enerjisiz bırakın",
      "Trial pit / hand digging kullanın",
      "Yetkili elektrik personeli gözetimi sağlayın",
    ],
    [
      "Verify utility drawings and cable locating",
      "Apply a permit-to-dig system",
      "De-energize cables where required",
      "Use trial pits or hand digging",
      "Provide supervision by authorized electrical personnel",
    ]
  ),

  "electrical|hot-work": makeInteraction(
    "extreme", 20, 8,
    [
      "Enerjili ekipman yakınında sıcak çalışma",
      "Ark / kıvılcım kaynaklı ek tutuşma riski",
      "Kablo ve elektrik ekipmanlarının sıcak çalışma nedeniyle zarar görmesi",
    ],
    [
      "Hot work near energized equipment",
      "Additional ignition risk from arcs and sparks",
      "Damage to cables and electrical equipment from hot work",
    ],
    [
      "LOTO ve izolasyon durumunu doğrulayın",
      "Enerji kaynaklarını mümkünse devre dışı bırakın",
      "Yangın önleme tedbirlerini artırın",
      "Yetkili elektrik personeli ile koordinasyon sağlayın",
      "Fire watch görevlendirin",
    ],
    [
      "Verify LOTO and isolation status",
      "De-energize sources where possible",
      "Increase fire prevention controls",
      "Coordinate with authorized electrical personnel",
      "Assign a fire watch",
    ]
  ),

  "electrical|lifting": makeInteraction(
    "high", 15, 6,
    [
      "Vinç veya yükün enerji hattına yaklaşması",
      "Kaldırılan yükün elektrik ekipmanına çarpması",
      "Lifting ekipmanının geçici kabloları hasarlaması",
    ],
    [
      "Crane or load approaching electrical lines",
      "Suspended load striking electrical equipment",
      "Lifting equipment damaging temporary cables",
    ],
    [
      "Elektrik hatlarına güvenli yaklaşma mesafesi belirleyin",
      "Enerjiyi mümkünse kesin",
      "Dedicated banksman kullanın",
      "Kaldırma güzergâhını kablo ve panolardan ayırın",
    ],
    [
      "Define safe approach distances to electrical lines",
      "De-energize where possible",
      "Use a dedicated banksman",
      "Separate the lifting route from cables and panels",
    ]
  ),

  "electrical|work-at-height": makeInteraction(
    "high", 16, 6,
    [
      "Yüksekte çalışan personelin enerjili ekipmana yaklaşması",
      "Metal iskele veya ekipmanın elektrik kaynağıyla teması",
      "Geçici kabloların platform erişimini etkilemesi",
    ],
    [
      "Personnel at height approaching energized equipment",
      "Metal scaffold or equipment contacting electrical sources",
      "Temporary cables affecting platform access",
    ],
    [
      "Enerjiyi mümkünse izole edin",
      "Elektrik yaklaşma mesafelerini uygulayın",
      "İskele topraklama gereksinimini değerlendirin",
      "Kabloları güvenli güzergâhtan geçirin",
    ],
    [
      "Isolate power where possible",
      "Apply electrical approach distances",
      "Assess scaffold grounding requirements",
      "Route cables through safe paths",
    ]
  ),

  "excavation|hot-work": makeInteraction(
    "high", 15, 6,
    [
      "Kazıda yanıcı gaz veya hat bulunması",
      "Kıvılcımların kazı içine düşmesi",
      "Gaz birikiminin tutuşması",
    ],
    [
      "Flammable gas or services present in excavation",
      "Sparks falling into the excavation",
      "Ignition of accumulated gas",
    ],
    [
      "Kazı atmosferini kontrol edin",
      "Yeraltı hatlarını doğrulayın",
      "Fire watch ve söndürme ekipmanı sağlayın",
      "Yanıcı malzemeleri alandan uzaklaştırın",
    ],
    [
      "Check the excavation atmosphere",
      "Verify underground services",
      "Provide fire watch and firefighting equipment",
      "Remove flammable materials from the area",
    ]
  ),

  "excavation|lifting": makeInteraction(
    "high", 16, 8,
    [
      "Vinç outriggerlarının kazı kenarına yük bindirmesi",
      "Askıdaki yükün kazı içine düşmesi",
      "Kazı duvarının ekipman yükü nedeniyle çökmesi",
    ],
    [
      "Crane outriggers loading the excavation edge",
      "Suspended loads falling into the excavation",
      "Excavation wall collapse due to equipment loading",
    ],
    [
      "Crane/outrigger mesafesini geoteknik koşullara göre belirleyin",
      "Kazı çevresinde exclusion zone oluşturun",
      "Yükü kazı içindeki personelin üzerinden taşımayın",
      "Kazı stabilitesini operasyon öncesi kontrol edin",
    ],
    [
      "Set crane/outrigger distance based on ground conditions",
      "Establish an exclusion zone around the excavation",
      "Do not move loads above personnel in the excavation",
      "Check excavation stability before lifting",
    ]
  ),

  "excavation|work-at-height": makeInteraction(
    "high", 12, 6,
    [
      "Kazı kenarında yüksekte çalışma nedeniyle düşme riski",
      "Yukarıdan kazı içine cisim düşmesi",
      "İskele ayağının kazı stabilitesini etkilemesi",
    ],
    [
      "Fall risk from work at height near excavation edges",
      "Objects falling into the excavation",
      "Scaffold loading affecting excavation stability",
    ],
    [
      "Kazı kenarında uygun edge protection sağlayın",
      "Dropped-object control uygulayın",
      "İskele temelini kazıdan güvenli mesafede kurun",
      "Alt alanı bariyerlerle kapatın",
    ],
    [
      "Provide suitable edge protection at excavation boundaries",
      "Apply dropped-object controls",
      "Position scaffold foundations a safe distance from the excavation",
      "Barricade the area below",
    ]
  ),

  "hot-work|lifting": makeInteraction(
    "high", 15, 6,
    [
      "Kaldırılan yükün sıcak çalışma alanına girmesi",
      "Kıvılcım ve sıcak parçacıkların lifting ekibini etkilemesi",
      "Vinç hareketleri ile çalışma alanı erişiminin çakışması",
    ],
    [
      "Suspended load entering the hot-work area",
      "Sparks and hot particles affecting the lifting team",
      "Crane movements conflicting with work-area access",
    ],
    [
      "Exclusion zone oluşturun",
      "Kaldırma rotasını sıcak çalışma alanından ayırın",
      "Banksman ve fire watch iletişimini sağlayın",
      "Eş zamanlı operasyonu supervisor onayına bağlayın",
    ],
    [
      "Establish an exclusion zone",
      "Separate the lifting route from the hot-work area",
      "Maintain communication between banksman and fire watch",
      "Require supervisor approval for simultaneous operation",
    ]
  ),

  "hot-work|work-at-height": makeInteraction(
    "high", 16, 6,
    [
      "Kaynak kıvılcımlarının alt seviyelere düşmesi",
      "Yanıcı malzemelerin aşağıda tutuşması",
      "Kaynak kablolarının platform erişimini engellemesi",
    ],
    [
      "Welding sparks falling to lower levels",
      "Ignition of combustible materials below",
      "Welding cables obstructing platform access",
    ],
    [
      "Alt alanı izole edin",
      "Fire blanket ve spark containment kullanın",
      "Fire watch görevlendirin",
      "Kabloları güvenli şekilde sabitleyin",
      "Platformdaki yanıcı malzemeleri kaldırın",
    ],
    [
      "Isolate the area below",
      "Use fire blankets and spark containment",
      "Assign a fire watch",
      "Secure cables safely",
      "Remove combustible materials from the platform",
    ]
  ),

  "lifting|work-at-height": makeInteraction(
    "high", 16, 6,
    [
      "Askıdaki yükün yüksekte çalışan personeli etkilemesi",
      "Düşen cisim ve kaldırılan yük risklerinin birleşmesi",
      "İskele veya platform erişiminin vinç operasyonu ile kesişmesi",
    ],
    [
      "Suspended load affecting personnel working at height",
      "Combined dropped-object and suspended-load hazards",
      "Scaffold or platform access conflicting with crane operation",
    ],
    [
      "Yük altında personel bulunmasını engelleyin",
      "Kaldırma exclusion zone uygulayın",
      "WAH alanını fiziksel olarak ayırın",
      "Tek bir koordinatör üzerinden iletişim sağlayın",
      "Yük rotasını önceden belirleyin",
    ],
    [
      "Prevent personnel from entering below suspended loads",
      "Apply lifting exclusion zones",
      "Physically segregate the work-at-height area",
      "Coordinate both activities through one responsible person",
      "Define the load route in advance",
    ]
  ),
};

function interactionKey(a: string, b: string) {
  return [a, b].sort().join("|");
}

function pseudoInteraction(a: string, b: string): Interaction {
  const key = interactionKey(a, b);

  if (specificInteractions[key]) {
    return specificInteractions[key];
  }

  const source = `${a}:${b}`;
  let hash = 0;

  for (let i = 0; i < source.length; i++) {
    hash += source.charCodeAt(i);
  }

  const bucket = hash % 4;

  if (bucket === 0) {
    return makeInteraction(
      "medium",
      8,
      4,
      defaultHazardsTr,
      defaultHazardsEn,
      defaultControlsTr,
      defaultControlsEn
    );
  }

  if (bucket === 1) {
    return makeInteraction(
      "high",
      12,
      6,
      defaultHazardsTr,
      defaultHazardsEn,
      defaultControlsTr,
      defaultControlsEn
    );
  }

  if (bucket === 2) {
    return makeInteraction(
      "medium",
      6,
      3,
      defaultHazardsTr,
      defaultHazardsEn,
      defaultControlsTr,
      defaultControlsEn
    );
  }

  return makeInteraction(
    "high",
    15,
    8,
    defaultHazardsTr,
    defaultHazardsEn,
    defaultControlsTr,
    defaultControlsEn
  );
}


type SimopsSavedRecord = {
  id: string;
  project_name: string | null;
  area_unit: string | null;
  work_date: string | null;
  interaction_level: Level;
  initial_risk: number;
  residual_risk: number;
  decision: "proceed" | "controls" | "reschedule" | "stop" | null;
  action_status: "open" | "in-progress" | "completed" | null;
  payload: {
    selected?: string[];
    activePair?: [string, string];
    projectName?: string;
    areaUnit?: string;
    contractor?: string;
    workDate?: string;
    shift?: "day" | "night";
    ptwNumbers?: string;
    coordinator?: string;
    responsiblePerson?: string;
    additionalControls?: string;
    actionStatus?: "open" | "in-progress" | "completed";
    hseApproved?: boolean;
    areaSupervisorApproved?: boolean;
    decision?: "proceed" | "controls" | "reschedule" | "stop";
  } | null;
  created_at: string;
  updated_at: string;
};

export default function SimopsPlanner({ locale }: Props) {
  const isTurkish = locale === "tr";

  const [selected, setSelected] = useState<string[]>([
    "hot-work",
    "lifting",
    "work-at-height",
  ]);

  const [search, setSearch] = useState("");
  const [activePair, setActivePair] = useState<[string, string]>([
    "hot-work",
    "confined-space",
  ]);

  const [decision, setDecision] = useState<
    "proceed" | "controls" | "reschedule" | "stop"
  >("controls");

  const [selectedOnly, setSelectedOnly] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  const [currentRecordId, setCurrentRecordId] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [savedRecords, setSavedRecords] = useState<SimopsSavedRecord[]>([]);
  const [saveMessage, setSaveMessage] = useState("");


  // SIMOPS plan information
  const [projectName, setProjectName] = useState("");
  const [areaUnit, setAreaUnit] = useState("");
  const [contractor, setContractor] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [shift, setShift] = useState<"day" | "night">("day");
  const [ptwNumbers, setPtwNumbers] = useState("");
  const [coordinator, setCoordinator] = useState("Sercan Aslan");
  const [responsiblePerson, setResponsiblePerson] = useState("");

  // Additional SIMOPS controls / action tracking
  const [additionalControls, setAdditionalControls] = useState("");
  const [actionStatus, setActionStatus] = useState<
    "open" | "in-progress" | "completed"
  >("open");

  // Review / approval
  const [hseApproved, setHseApproved] = useState(false);
  const [areaSupervisorApproved, setAreaSupervisorApproved] = useState(false);


  const filteredActivities = activities.filter((activity) => {
    const label = isTurkish ? activity.tr : activity.en;
    return label.toLowerCase().includes(search.toLowerCase());
  });

  const activeInteraction = pseudoInteraction(activePair[0], activePair[1]);

  const selectedInteractions = useMemo(() => {
    const result: Interaction[] = [];

    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        result.push(pseudoInteraction(selected[i], selected[j]));
      }
    }

    return result;
  }, [selected]);

  const maxInitial =
    selectedInteractions.length > 0
      ? Math.max(...selectedInteractions.map((x) => x.initialRisk))
      : 0;

  const maxResidual =
    selectedInteractions.length > 0
      ? Math.max(...selectedInteractions.map((x) => x.residualRisk))
      : 0;

  const highestLevel: Level =
    selectedInteractions.some((x) => x.level === "extreme")
      ? "extreme"
      : selectedInteractions.some((x) => x.level === "high")
        ? "high"
        : selectedInteractions.some((x) => x.level === "medium")
          ? "medium"
          : "low";

  const activityById = (id: string) =>
    activities.find((activity) => activity.id === id);

  const activityName = (id: string) => {
    const activity = activityById(id);
    if (!activity) return id;
    return isTurkish ? activity.tr : activity.en;
  };

  const toggleActivity = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const riskLevelFromScore = (score: number): Level => {
    if (score <= 4) return "low";
    if (score <= 9) return "medium";
    if (score <= 16) return "high";
    return "extreme";
  };

  const initialLevel = riskLevelFromScore(maxInitial);
  const residualLevel = riskLevelFromScore(maxResidual);

  const hasEnoughActivities = selected.length >= 2;

  const riskReduction =
    maxInitial > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(((maxInitial - maxResidual) / maxInitial) * 100)
          )
        )
      : 0;

  const recommendationDecision:
    | "proceed"
    | "controls"
    | "reschedule"
    | "stop" =
    maxResidual <= 4
      ? "proceed"
      : maxResidual <= 9
        ? "controls"
        : maxResidual <= 16
          ? "reschedule"
          : "stop";

  const minimumDecisionRank =
    recommendationDecision === "proceed"
      ? 0
      : recommendationDecision === "controls"
        ? 1
        : recommendationDecision === "reschedule"
          ? 2
          : 3;

  const interactionCounts = useMemo(() => {
    return selectedInteractions.reduce(
      (acc, interaction) => {
        acc[interaction.level] += 1;
        return acc;
      },
      {
        low: 0,
        medium: 0,
        high: 0,
        extreme: 0,
      } as Record<Level, number>
    );
  }, [selectedInteractions]);

  const matrixActivities = selectedOnly
    ? activities.filter((activity) => selected.includes(activity.id))
    : activities;

  useEffect(() => {
    if (!hasEnoughActivities) {
      setDecision("controls");
      return;
    }

    setDecision(recommendationDecision);
  }, [hasEnoughActivities, recommendationDecision]);

  const decisions = [
    {
      id: "proceed" as const,
      tr: "Devam Et",
      en: "Proceed",
      trSub: "Riskler kabul edilebilir",
      enSub: "Risks are acceptable",
      className:
        "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
    },
    {
      id: "controls" as const,
      tr: "Ek Kontrollerle Devam Et",
      en: "Proceed with Additional Controls",
      trSub: "Ek koruyucu tedbirler uygula",
      enSub: "Implement extra safeguards",
      className:
        "border-yellow-400/40 bg-yellow-500/10 text-yellow-300",
    },
    {
      id: "reschedule" as const,
      tr: "Faaliyetleri Yeniden Planla",
      en: "Reschedule Activities",
      trSub: "Etkileşimi azalt",
      enSub: "Reduce interaction",
      className:
        "border-orange-400/40 bg-orange-500/10 text-orange-300",
    },
    {
      id: "stop" as const,
      tr: "Devam Etme",
      en: "Do Not Proceed",
      trSub: "Risk seviyesi çok yüksek",
      enSub: "Risk level too high",
      className: "border-red-400/40 bg-red-500/10 text-red-300",
    },
  ];


  async function saveSimopsAssessment() {
    if (selected.length < 2) {
      setSaveMessage(
        isTurkish
          ? "En az 2 faaliyet seçmelisiniz."
          : "Select at least 2 activities."
      );
      return;
    }

    setSaveLoading(true);
    setSaveMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          isTurkish
            ? "Kayıt için giriş yapmalısınız."
            : "You must be signed in to save."
        );
      }

      const payload = {
        selected,
        activePair,
        projectName,
        areaUnit,
        contractor,
        workDate,
        shift,
        ptwNumbers,
        coordinator,
        responsiblePerson,
        additionalControls,
        actionStatus,
        hseApproved,
        areaSupervisorApproved,
        decision,
      };

      const row = {
        user_id: user.id,
        project_name: projectName.trim() || null,
        area_unit: areaUnit.trim() || null,
        work_date: workDate || null,
        interaction_level: highestLevel,
        initial_risk: maxInitial,
        residual_risk: maxResidual,
        decision,
        action_status: actionStatus,
        payload,
        updated_at: new Date().toISOString(),
      };

      if (currentRecordId) {
        const { error } = await supabase
          .from("simops_assessments")
          .update(row)
          .eq("id", currentRecordId);

        if (error) throw error;

        setSaveMessage(
          isTurkish
            ? "✓ SIMOPS kaydı güncellendi."
            : "✓ SIMOPS record updated."
        );
      } else {
        const { data, error } = await supabase
          .from("simops_assessments")
          .insert(row)
          .select("id")
          .single();

        if (error) throw error;

        setCurrentRecordId(data.id);

        setSaveMessage(
          isTurkish
            ? "✓ SIMOPS kaydı oluşturuldu."
            : "✓ SIMOPS record saved."
        );
      }
    } catch (error: unknown) {
      const err = error as {
        message?: string;
        code?: string;
        details?: string;
        hint?: string;
      };

      console.error("SIMOPS SAVE ERROR DETAILS:", {
        message: err?.message,
        code: err?.code,
        details: err?.details,
        hint: err?.hint,
        raw: error,
      });

      const readableError =
        [
          err?.message,
          err?.code ? `Code: ${err.code}` : "",
          err?.details,
          err?.hint,
        ]
          .filter(Boolean)
          .join(" | ") ||
        (isTurkish
          ? "Kayıt sırasında bilinmeyen hata oluştu."
          : "An unknown error occurred while saving.");

      setSaveMessage(`❌ ${readableError}`);
    } finally {
      setSaveLoading(false);
    }
  }

  async function loadSimopsHistory() {
    setHistoryOpen(true);
    setHistoryLoading(true);

    try {
      const { data, error } = await supabase
        .from("simops_assessments")
        .select(
          "id, project_name, area_unit, work_date, interaction_level, initial_risk, residual_risk, decision, action_status, payload, created_at, updated_at"
        )
        .order("updated_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      setSavedRecords((data ?? []) as SimopsSavedRecord[]);
    } catch (error) {
      console.error("SIMOPS history error:", error);
      setSavedRecords([]);
    } finally {
      setHistoryLoading(false);
    }
  }

  function openSavedAssessment(record: SimopsSavedRecord) {
    const payload = record.payload ?? {};

    setCurrentRecordId(record.id);

    if (payload.selected?.length) {
      setSelected(payload.selected);
    }

    if (
      Array.isArray(payload.activePair) &&
      payload.activePair.length === 2
    ) {
      setActivePair(payload.activePair);
    }

    setProjectName(payload.projectName ?? record.project_name ?? "");
    setAreaUnit(payload.areaUnit ?? record.area_unit ?? "");
    setContractor(payload.contractor ?? "");
    setWorkDate(payload.workDate ?? record.work_date ?? "");
    setShift(payload.shift ?? "day");
    setPtwNumbers(payload.ptwNumbers ?? "");
    setCoordinator(payload.coordinator ?? "Sercan Aslan");
    setResponsiblePerson(payload.responsiblePerson ?? "");
    setAdditionalControls(payload.additionalControls ?? "");
    setActionStatus(payload.actionStatus ?? record.action_status ?? "open");
    setHseApproved(Boolean(payload.hseApproved));
    setAreaSupervisorApproved(Boolean(payload.areaSupervisorApproved));

    if (payload.decision ?? record.decision) {
      setDecision(
        (payload.decision ?? record.decision) as
          | "proceed"
          | "controls"
          | "reschedule"
          | "stop"
      );
    }

    setHistoryOpen(false);

    setSaveMessage(
      isTurkish
        ? "Kayıt düzenleme için açıldı."
        : "Record opened for editing."
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteSavedAssessment(id: string) {
    const confirmed = window.confirm(
      isTurkish
        ? "Bu SIMOPS kaydını silmek istediğinize emin misiniz?"
        : "Are you sure you want to delete this SIMOPS record?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("simops_assessments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setSavedRecords((records) =>
      records.filter((record) => record.id !== id)
    );

    if (currentRecordId === id) {
      setCurrentRecordId(null);
    }
  }

  function startNewAssessment() {
    setCurrentRecordId(null);
    setSaveMessage("");

    setProjectName("");
    setAreaUnit("");
    setContractor("");
    setWorkDate("");
    setShift("day");
    setPtwNumbers("");
    setResponsiblePerson("");
    setAdditionalControls("");
    setActionStatus("open");
    setHseApproved(false);
    setAreaSupervisorApproved(false);

    setSelected([
      "hot-work",
      "lifting",
      "work-at-height",
    ]);

    setActivePair(["hot-work", "confined-space"]);
    setDecision("controls");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const downloadSimopsPdf = () => {
    if (selected.length < 2) {
      alert(
        isTurkish
          ? "SIMOPS raporu oluşturmak için en az 2 faaliyet seçmelisiniz."
          : "Select at least 2 activities to generate a SIMOPS report."
      );
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    const C = {
      page: [2, 6, 23] as [number, number, number],
      panel: [15, 23, 42] as [number, number, number],
      panel2: [17, 28, 51] as [number, number, number],
      line: [44, 56, 78] as [number, number, number],
      white: [248, 250, 252] as [number, number, number],
      muted: [148, 163, 184] as [number, number, number],
      blue: [59, 130, 246] as [number, number, number],
      green: [16, 185, 129] as [number, number, number],
      yellow: [250, 204, 21] as [number, number, number],
      orange: [249, 115, 22] as [number, number, number],
      red: [239, 68, 68] as [number, number, number],
    };

    const safe = (value: string) =>
      value
        .replace(/İ/g, "I")
        .replace(/ı/g, "i")
        .replace(/Ş/g, "S")
        .replace(/ş/g, "s")
        .replace(/Ğ/g, "G")
        .replace(/ğ/g, "g")
        .replace(/Ü/g, "U")
        .replace(/ü/g, "u")
        .replace(/Ö/g, "O")
        .replace(/ö/g, "o")
        .replace(/Ç/g, "C")
        .replace(/ç/g, "c");

    const fillPage = () => {
      doc.setFillColor(...C.page);
      doc.rect(0, 0, W, H, "F");
    };

    const panel = (
      x: number,
      y: number,
      w: number,
      h: number,
      fill = C.panel
    ) => {
      doc.setFillColor(...fill);
      doc.setDrawColor(...C.line);
      doc.roundedRect(x, y, w, h, 3, 3, "FD");
    };

    const txt = (
      text: string,
      x: number,
      y: number,
      size = 8,
      color = C.white,
      style: "normal" | "bold" = "normal"
    ) => {
      doc.setFont("helvetica", style);
      doc.setFontSize(size);
      doc.setTextColor(...color);
      doc.text(safe(text), x, y);
    };

    const levelColor = (level: Level) => {
      if (level === "low") return C.green;
      if (level === "medium") return C.yellow;
      if (level === "high") return C.orange;
      return C.red;
    };

    const scoreLevel = (score: number): Level => {
      if (score <= 4) return "low";
      if (score <= 9) return "medium";
      if (score <= 16) return "high";
      return "extreme";
    };

    const levelName = (level: Level) =>
      isTurkish ? levelMeta[level].tr : levelMeta[level].en;

    const recommendationText =
      recommendationDecision === "proceed"
        ? isTurkish ? "Devam Et" : "Proceed"
        : recommendationDecision === "controls"
          ? isTurkish ? "Ek Kontrollerle Devam Et" : "Proceed with Additional Controls"
          : recommendationDecision === "reschedule"
            ? isTurkish ? "Faaliyetleri Yeniden Planla" : "Reschedule Activities"
            : isTurkish ? "Devam Etme" : "Do Not Proceed";

    const decisionText =
      decision === "proceed"
        ? isTurkish ? "Devam Et" : "Proceed"
        : decision === "controls"
          ? isTurkish ? "Ek Kontrollerle Devam Et" : "Proceed with Additional Controls"
          : decision === "reschedule"
            ? isTurkish ? "Faaliyetleri Yeniden Planla" : "Reschedule Activities"
            : isTurkish ? "Devam Etme" : "Do Not Proceed";

    const selectedPairs: Array<{
      a: string;
      b: string;
      interaction: Interaction;
    }> = [];

    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        selectedPairs.push({
          a: selected[i],
          b: selected[j],
          interaction: pseudoInteraction(selected[i], selected[j]),
        });
      }
    }

    const criticalPair = [...selectedPairs].sort(
      (a, b) => b.interaction.initialRisk - a.interaction.initialRisk
    )[0];

    // =========================================================
    // PAGE 1 — DASHBOARD
    // =========================================================
    fillPage();

    txt("SafeBase", 12, 13, 17, C.white, "bold");
    txt(
      isTurkish ? "Profesyonel HSE Platformu" : "Professional HSE Platform",
      12,
      18,
      6.5,
      C.muted
    );

    txt("SIMOPS PLANNER", 12, 30, 18, C.white, "bold");
    txt(
      isTurkish
        ? "Es zamanli operasyon risk degerlendirme raporu"
        : "Simultaneous Operations Risk Assessment Report",
      12,
      36,
      8,
      C.muted
    );

    txt(
      `${isTurkish ? "Tarih" : "Date"}: ${workDate || "-"}`,
      W - 70,
      13,
      7,
      C.muted
    );

    txt(
      `${isTurkish ? "Vardiya" : "Shift"}: ${
        shift === "day"
          ? isTurkish ? "Gunduz" : "Day"
          : isTurkish ? "Gece" : "Night"
      }`,
      W - 70,
      18,
      7,
      C.muted
    );

    // KPI STRIP
    const kpiY = 43;
    const kpiGap = 3;
    const kpiW = (W - 24 - kpiGap * 4) / 5;
    const kpiH = 23;

    const kpis = [
      {
        title: isTurkish ? "SECILI FAALIYETLER" : "SELECTED ACTIVITIES",
        value: String(selected.length),
        sub: `${isTurkish ? "toplam" : "of"} ${activities.length}`,
        color: C.white,
      },
      {
        title: isTurkish ? "ETKILESIM SEVIYESI" : "INTERACTION LEVEL",
        value: levelName(highestLevel),
        sub: isTurkish ? "Inceleme gerekli" : "Review required",
        color: levelColor(highestLevel),
      },
      {
        title: isTurkish ? "ILK RISK (MAKS.)" : "INITIAL RISK (MAX)",
        value: String(maxInitial),
        sub: levelName(initialLevel),
        color: levelColor(initialLevel),
      },
      {
        title: isTurkish ? "KALAN RISK (MAKS.)" : "RESIDUAL RISK (MAX)",
        value: String(maxResidual),
        sub: levelName(residualLevel),
        color: levelColor(residualLevel),
      },
      {
        title: isTurkish ? "RISK AZALTIMI" : "RISK REDUCTION",
        value: `%${riskReduction}`,
        sub: isTurkish ? "Kontrol sonrasi" : "After controls",
        color: C.green,
      },
    ];

    kpis.forEach((kpi, index) => {
      const x = 12 + index * (kpiW + kpiGap);

      panel(x, kpiY, kpiW, kpiH);

      txt(kpi.title, x + 4, kpiY + 6, 5.8, C.muted, "bold");
      txt(kpi.value, x + 4, kpiY + 14, 12, kpi.color, "bold");
      txt(kpi.sub, x + 4, kpiY + 19, 5.8, C.muted);
    });

    // PLAN INFORMATION
    const infoY = 70;
    panel(12, infoY, W - 24, 31);

    txt(
      isTurkish ? "SIMOPS PLAN BILGILERI" : "SIMOPS PLAN INFORMATION",
      17,
      infoY + 7,
      8,
      C.white,
      "bold"
    );

    const info = [
      [isTurkish ? "Proje" : "Project", projectName || "-"],
      [isTurkish ? "Alan / Unite" : "Area / Unit", areaUnit || "-"],
      [isTurkish ? "Yuklenici" : "Contractor", contractor || "-"],
      ["PTW", ptwNumbers || "-"],
      [isTurkish ? "Koordinator" : "Coordinator", coordinator || "-"],
      [isTurkish ? "Sorumlu Kisi" : "Responsible Person", responsiblePerson || "-"],
    ];

    const infoColW = (W - 34) / 3;

    info.forEach((item, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      const x = 17 + col * infoColW;
      const y = infoY + 14 + row * 10;

      txt(item[0], x, y, 5.5, C.muted, "bold");
      txt(item[1], x, y + 4, 7, C.white, "bold");
    });

    // MATRIX
    const matrixY = 106;
    panel(12, matrixY, W - 24, 91);

    txt(
      isTurkish ? "SIMOPS ETKILESIM MATRISI" : "SIMOPS INTERACTION MATRIX",
      17,
      matrixY + 8,
      9,
      C.white,
      "bold"
    );

    const matrixActivities = activities;

    const startX = 17;
    const startY = matrixY + 15;
    const rowHeaderW = 34;
    const cellW = (W - 34 - rowHeaderW) / matrixActivities.length;
    const cellH = 6.7;

    matrixActivities.forEach((activity, colIndex) => {
      const x = startX + rowHeaderW + colIndex * cellW;

      doc.setFillColor(...C.panel2);
      doc.setDrawColor(...C.line);
      doc.rect(x, startY, cellW, cellH, "FD");

      const label = safe(activityName(activity.id));
      const lines = doc.splitTextToSize(label, cellW - 2);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(4.8);
      doc.setTextColor(...C.white);
      doc.text(lines, x + cellW / 2, startY + 3.2, {
        align: "center",
      });
    });

    matrixActivities.forEach((rowActivity, rowIndex) => {
      const y = startY + cellH + rowIndex * cellH;

      doc.setFillColor(...C.panel2);
      doc.setDrawColor(...C.line);
      doc.rect(startX, y, rowHeaderW, cellH, "FD");

      txt(
        activityName(rowActivity.id),
        startX + 2,
        y + 4.8,
        4.8,
        C.white,
        "bold"
      );

      matrixActivities.forEach((colActivity, colIndex) => {
        const x = startX + rowHeaderW + colIndex * cellW;

        if (rowActivity.id === colActivity.id) {
          doc.setFillColor(10, 16, 31);
          doc.setDrawColor(...C.line);
          doc.rect(x, y, cellW, cellH, "FD");

          txt("-", x + cellW / 2, y + 4.8, 6, C.muted);
          return;
        }

        const interaction = pseudoInteraction(
          rowActivity.id,
          colActivity.id
        );

        const color = levelColor(interaction.level);

        doc.setFillColor(
          Math.round(color[0] * 0.16),
          Math.round(color[1] * 0.16),
          Math.round(color[2] * 0.16)
        );

        doc.setDrawColor(
          Math.round(color[0] * 0.7),
          Math.round(color[1] * 0.7),
          Math.round(color[2] * 0.7)
        );

        doc.rect(x, y, cellW, cellH, "FD");

        doc.setFillColor(...color);
        doc.circle(x + 2.5, y + 3.8, 0.8, "F");

        txt(
          levelName(interaction.level),
          x + 4.5,
          y + 4.8,
          4.5,
          C.white,
          "bold"
        );
      });
    });

    // Legend
    let legendX = 18;
    const matrixBottom =
      startY + cellH * (matrixActivities.length + 1);
    const legendY = matrixBottom + 5;

    (["low", "medium", "high", "extreme"] as Level[]).forEach((level) => {
      const color = levelColor(level);

      doc.setFillColor(...color);
      doc.circle(legendX, legendY - 1, 1, "F");

      txt(levelName(level), legendX + 3, legendY, 5.2, C.muted);

      legendX += 35;
    });

    // =========================================================
    // PAGE 2 — DETAIL
    // =========================================================
    doc.addPage();
    fillPage();

    txt("SafeBase", 12, 13, 15, C.white, "bold");
    txt(
      isTurkish ? "SIMOPS DETAY VE KARAR" : "SIMOPS DETAIL & DECISION",
      12,
      25,
      16,
      C.white,
      "bold"
    );

    // Critical interaction
    panel(12, 33, W - 24, 16);

    txt(
      isTurkish ? "EN KRITIK ETKILESIM" : "CRITICAL INTERACTION",
      17,
      39,
      6,
      C.muted,
      "bold"
    );

    if (criticalPair) {
      txt(
        `${activityName(criticalPair.a)} + ${activityName(criticalPair.b)}`,
        17,
        45,
        10,
        C.white,
        "bold"
      );

      txt(
        `${isTurkish ? "Ilk Risk" : "Initial Risk"} ${criticalPair.interaction.initialRisk}`,
        W - 80,
        42,
        9,
        levelColor(scoreLevel(criticalPair.interaction.initialRisk)),
        "bold"
      );

      txt(
        `${isTurkish ? "Kalan Risk" : "Residual Risk"} ${criticalPair.interaction.residualRisk}`,
        W - 45,
        42,
        9,
        levelColor(scoreLevel(criticalPair.interaction.residualRisk)),
        "bold"
      );
    }

    // Hazards + controls
    const detailY = 54;
    const leftW = 82;
    const controlsW = W - 24 - leftW - 3;

    panel(12, detailY, leftW, 73);
    panel(97, detailY, controlsW, 73);

    txt(
      isTurkish ? "POTANSIYEL ETKILESIM TEHLIKELERI" : "POTENTIAL INTERACTION HAZARDS",
      17,
      detailY + 8,
      7,
      C.white,
      "bold"
    );

    if (criticalPair) {
      const hazards = isTurkish
        ? criticalPair.interaction.hazardsTr
        : criticalPair.interaction.hazardsEn;

      let hy = detailY + 17;

      hazards.forEach((hazard) => {
        const lines = doc.splitTextToSize(safe(hazard), leftW - 12);

        doc.setFillColor(...C.red);
        doc.circle(18, hy - 1, 0.8, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(...C.white);
        doc.text(lines, 22, hy);

        hy += lines.length * 3.4 + 3;
      });
    }

    txt(
      isTurkish ? "GEREKLI KONTROLLER" : "REQUIRED CONTROLS",
      102,
      detailY + 8,
      7,
      C.white,
      "bold"
    );

    if (criticalPair) {
      const controls = isTurkish
        ? criticalPair.interaction.controlsTr
        : criticalPair.interaction.controlsEn;

      const half = Math.ceil(controls.length / 2);

      controls.forEach((control, index) => {
        const col = index >= half ? 1 : 0;
        const localIndex = col ? index - half : index;

        const x = 103 + col * (controlsW / 2);
        const y = detailY + 17 + localIndex * 11;

        doc.setFillColor(...C.green);
        doc.circle(x, y - 1, 1.4, "F");

        txt("✓", x - 0.9, y + 0.5, 5, C.white, "bold");

        const lines = doc.splitTextToSize(
          safe(control),
          controlsW / 2 - 12
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.2);
        doc.setTextColor(...C.white);
        doc.text(lines, x + 4, y);
      });
    }

    // Additional controls
    panel(12, 129, W - 24, 25);

    txt(
      isTurkish ? "EK KONTROLLER VE AKSIYON TAKIBI" : "ADDITIONAL CONTROLS & ACTION TRACKING",
      17,
      136,
      7,
      C.white,
      "bold"
    );

    const actionText =
      additionalControls ||
      (isTurkish ? "Ek kontrol girilmedi." : "No additional controls entered.");

    const actionLines = doc.splitTextToSize(safe(actionText), W - 65);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(...C.muted);
    doc.text(actionLines, 17, 144);

    txt(
      `${isTurkish ? "Durum" : "Status"}: ${
        actionStatus === "completed"
          ? isTurkish ? "Tamamlandi" : "Completed"
          : actionStatus === "in-progress"
            ? isTurkish ? "Devam Ediyor" : "In Progress"
            : isTurkish ? "Acik" : "Open"
      }`,
      W - 62,
      144,
      7,
      actionStatus === "completed"
        ? C.green
        : actionStatus === "in-progress"
          ? C.yellow
          : C.red,
      "bold"
    );

    // Decision
    panel(12, 158, W - 24, 22);

    txt(
      isTurkish ? "KOORDINASYON VE KARAR" : "COORDINATION & DECISION",
      17,
      165,
      7,
      C.white,
      "bold"
    );

    txt(
      `${isTurkish ? "Sistem Onerisi" : "System Recommendation"}: ${recommendationText}`,
      17,
      172,
      8,
      C.yellow,
      "bold"
    );

    txt(
      `${isTurkish ? "Secilen Karar" : "Selected Decision"}: ${decisionText}`,
      17,
      177,
      8,
      C.white,
      "bold"
    );

    txt(
      `${maxInitial}  ->  ${maxResidual}  |  -${riskReduction}%`,
      W - 70,
      173,
      11,
      C.green,
      "bold"
    );

    // Approval cards
    const approvalY = 184;

    const approvalW = (W - 30) / 3;

    const approvals = [
      {
        title: "SIMOPS COORDINATOR",
        name: coordinator || "-",
        status: true,
      },
      {
        title: "HSE REVIEW",
        name: hseApproved
          ? isTurkish ? "ONAYLANDI" : "APPROVED"
          : isTurkish ? "BEKLIYOR" : "PENDING",
        status: hseApproved,
      },
      {
        title: "AREA SUPERVISOR",
        name: areaSupervisorApproved
          ? isTurkish ? "ONAYLANDI" : "APPROVED"
          : isTurkish ? "BEKLIYOR" : "PENDING",
        status: areaSupervisorApproved,
      },
    ];

    approvals.forEach((item, index) => {
      const x = 12 + index * (approvalW + 3);

      panel(x, approvalY, approvalW, 15);

      txt(item.title, x + 4, approvalY + 6, 5.5, C.muted, "bold");

      txt(
        item.name,
        x + 4,
        approvalY + 13,
        7,
        item.status ? C.green : C.yellow,
        "bold"
      );
    });

    // Footer
    const totalPages = doc.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      txt(
        "SafeBase • Control of Work • SIMOPS",
        12,
        H - 5,
        5.5,
        C.muted
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.5);
      doc.setTextColor(...C.muted);
      doc.text(`${i} / ${totalPages}`, W - 12, H - 5, {
        align: "right",
      });
    }

    const safeProject =
      projectName.trim().replace(/[^a-zA-Z0-9-_]+/g, "-") || "SIMOPS";

    doc.save(
      `SafeBase-SIMOPS-${safeProject}-${workDate || "Assessment"}.pdf`
    );
  };

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1680px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
              SAFEBASE CONTROL OF WORK
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight">
              SIMOPS Planner
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {isTurkish
                ? "Eş zamanlı faaliyetleri planlayın, etkileşimleri belirleyin ve gerekli kontrol önlemlerini yönetin."
                : "Plan and manage simultaneous operations to identify interactions and control risks."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={startNewAssessment}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-xs font-bold text-slate-300 transition hover:bg-slate-800"
            >
              ＋ {isTurkish ? "Yeni" : "New"}
            </button>

            <button
              type="button"
              onClick={loadSimopsHistory}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              ◷ {isTurkish ? "Geçmiş" : "History"}
            </button>

            <button
              type="button"
              disabled={saveLoading}
              onClick={saveSimopsAssessment}
              className="rounded-xl border border-blue-400/20 bg-blue-600 px-4 py-3 text-xs font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saveLoading
                ? isTurkish
                  ? "Kaydediliyor..."
                  : "Saving..."
                : currentRecordId
                  ? isTurkish
                    ? "💾 Güncelle"
                    : "💾 Update"
                  : isTurkish
                    ? "💾 Kaydet"
                    : "💾 Save"}
            </button>

            <button
              onClick={downloadSimopsPdf}
              type="button"
              className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              📄 {isTurkish ? "SIMOPS Raporu (PDF)" : "Download Report (PDF)"}
            </button>
          </div>
        </div>

        {saveMessage && (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-xs font-bold ${
              saveMessage.startsWith("✓")
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                : "border-red-400/20 bg-red-500/10 text-red-300"
            }`}
          >
            {saveMessage}
          </div>
        )}

        {/* SUMMARY */}
        <div className="mt-7 grid overflow-hidden rounded-2xl border border-white/10 bg-slate-900/65 shadow-2xl shadow-black/20 md:grid-cols-2 xl:grid-cols-5">
          <SummaryItem
            title={isTurkish ? "Seçili Faaliyetler" : "Selected Activities"}
            value={String(selected.length)}
            sub={`${isTurkish ? "toplam" : "of"} ${activities.length}`}
            accent="text-white"
          />

          <SummaryItem
            title={isTurkish ? "Etkileşim Seviyesi" : "Interaction Level"}
            value={isTurkish ? levelMeta[highestLevel].tr : levelMeta[highestLevel].en}
            sub={isTurkish ? "İnceleme gerekli" : "Review required"}
            accent={levelMeta[highestLevel].scoreClass}
          />

          <SummaryItem
            title={isTurkish ? "İlk Risk (Maks.)" : "Initial Risk (Max)"}
            value={String(maxInitial)}
            sub={isTurkish ? levelMeta[initialLevel].tr : levelMeta[initialLevel].en}
            accent={levelMeta[initialLevel].scoreClass}
          />

          <SummaryItem
            title={isTurkish ? "Kalan Risk (Maks.)" : "Residual Risk (Max)"}
            value={String(maxResidual)}
            sub={isTurkish ? levelMeta[residualLevel].tr : levelMeta[residualLevel].en}
            accent={levelMeta[residualLevel].scoreClass}
          />

          <SummaryItem
            title={isTurkish ? "Durum" : "Status"}
            value={isTurkish ? "Aktif" : "Active"}
            sub={isTurkish ? "SIMOPS planı" : "SIMOPS plan"}
            accent="text-blue-400"
          />
        </div>

        {/* SIMOPS PLAN INFORMATION */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/55 p-5 shadow-xl shadow-black/10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-black text-white">
                {isTurkish ? "SIMOPS Plan Bilgileri" : "SIMOPS Plan Information"}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {isTurkish
                  ? "Saha, izin ve koordinasyon bilgilerini tamamlayın."
                  : "Complete site, permit and coordination information."}
              </p>
            </div>

            <div className="rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-blue-300">
              {isTurkish ? "Control of Work" : "Control of Work"}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {isTurkish ? "Proje" : "Project"}
              </span>
              <input
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder={isTurkish ? "Proje adı..." : "Project name..."}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {isTurkish ? "Alan / Ünite" : "Area / Unit"}
              </span>
              <input
                value={areaUnit}
                onChange={(event) => setAreaUnit(event.target.value)}
                placeholder={isTurkish ? "OCU / Unit 01..." : "OCU / Unit 01..."}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {isTurkish ? "Yüklenici" : "Contractor"}
              </span>
              <input
                value={contractor}
                onChange={(event) => setContractor(event.target.value)}
                placeholder={isTurkish ? "Firma..." : "Company..."}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                PTW
              </span>
              <input
                value={ptwNumbers}
                onChange={(event) => setPtwNumbers(event.target.value)}
                placeholder="PTW-001, PTW-002..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {isTurkish ? "Tarih" : "Date"}
              </span>
              <input
                type="date"
                value={workDate}
                onChange={(event) => setWorkDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </label>

            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {isTurkish ? "Vardiya" : "Shift"}
              </span>
              <select
                value={shift}
                onChange={(event) =>
                  setShift(event.target.value as "day" | "night")
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              >
                <option value="day">
                  {isTurkish ? "Gündüz" : "Day"}
                </option>
                <option value="night">
                  {isTurkish ? "Gece" : "Night"}
                </option>
              </select>
            </label>

            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {isTurkish ? "SIMOPS Koordinatörü" : "SIMOPS Coordinator"}
              </span>
              <input
                value={coordinator}
                onChange={(event) => setCoordinator(event.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </label>

            <label>
              <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {isTurkish ? "Sorumlu Kişi" : "Responsible Person"}
              </span>
              <input
                value={responsiblePerson}
                onChange={(event) => setResponsiblePerson(event.target.value)}
                placeholder={
                  isTurkish ? "Supervisor / Engineer..." : "Supervisor / Engineer..."
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>
          </div>
        </div>

        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[360px_minmax(0,1fr)] 2xl:grid-cols-[380px_minmax(0,1fr)]">
          {/* ACTIVITIES */}
          <aside className="rounded-2xl border border-white/10 bg-slate-900/65 p-5 shadow-xl shadow-black/20 xl:sticky xl:top-6">
            <h2 className="text-base font-black">
              1. {isTurkish ? "Faaliyetleri Seçin" : "Select Activities"}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {isTurkish
                ? "Aynı zamanda gerçekleştirilecek faaliyetleri seçin."
                : "Choose activities that will occur simultaneously."}
            </p>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={isTurkish ? "Faaliyet ara..." : "Search activity..."}
              className="mt-4 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />

            <div className="mt-3 space-y-2">
              {filteredActivities.map((activity) => {
                const active = selected.includes(activity.id);

                return (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => toggleActivity(activity.id)}
                    className={`flex min-h-[50px] w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition ${
                      active
                        ? "border-blue-500/60 bg-blue-500/15 text-white"
                        : "border-white/10 bg-slate-950/35 text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded border text-[11px] ${
                        active
                          ? "border-blue-400 bg-blue-500 text-white"
                          : "border-slate-600"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </span>

                    <span>{activity.icon}</span>

                    <span className="font-semibold">
                      {isTurkish ? activity.tr : activity.en}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setSelected([])}
                className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs font-bold text-slate-300"
              >
                🗑 {isTurkish ? "Temizle" : "Clear All"}
              </button>

              <span className="text-xs font-bold text-blue-400">
                {selected.length} {isTurkish ? "seçili" : "selected"}
              </span>
            </div>
          </aside>

          {/* MATRIX AREA */}
          <div className="min-w-0 space-y-5">
            <div className="min-w-0 rounded-2xl border border-white/10 bg-slate-900/65 p-6 shadow-xl shadow-black/20">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-base font-black">
                    2. {isTurkish ? "SIMOPS Etkileşim Matrisi" : "SIMOPS Interaction Matrix"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {isTurkish
                      ? "Etkileşim detaylarını ve gerekli kontrolleri görmek için hücreye tıklayın."
                      : "Click any cell to view interaction details, hazards and required controls."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  {(["low", "medium", "high", "extreme"] as Level[]).map((level) => (
                    <div key={level} className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${levelMeta[level].dot}`} />
                      <span className="text-slate-300">
                        {isTurkish ? levelMeta[level].tr : levelMeta[level].en}
                      </span>

                      {hasEnoughActivities && (
                        <span className="font-black text-slate-500">
                          {interactionCounts[level]}
                        </span>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    disabled={!hasEnoughActivities}
                    onClick={() => setSelectedOnly((value) => !value)}
                    className={`ml-1 rounded-lg border px-3 py-2 text-[11px] font-black transition ${
                      selectedOnly
                        ? "border-blue-400/40 bg-blue-500/15 text-blue-300"
                        : "border-white/10 bg-slate-950/50 text-slate-300"
                    } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {selectedOnly
                      ? isTurkish
                        ? "✓ SADECE SEÇİLENLER"
                        : "✓ SELECTED ONLY"
                      : isTurkish
                        ? "SADECE SEÇİLENLER"
                        : "SELECTED ONLY"}
                  </button>
                </div>
              </div>

              <div className="mt-5 w-full overflow-x-auto pb-2">
                <div className="min-w-[1050px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/20 xl:min-w-[1120px]">
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: `165px repeat(${matrixActivities.length}, minmax(118px, 1fr))`,
                    }}
                  >
                    <div className="border-b border-r border-white/10 bg-slate-950/60 p-3" />

                    {matrixActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex min-h-[64px] items-center justify-center border-b border-r border-white/10 px-2.5 text-center text-xs font-black leading-4 last:border-r-0 ${
                          selected.includes(activity.id)
                            ? "bg-blue-500/10 text-blue-200"
                            : "bg-slate-950/60 text-slate-300"
                        }`}
                      >
                        {isTurkish ? activity.tr : activity.en}
                      </div>
                    ))}

                    {matrixActivities.map((row) => (
                      <div key={`row-${row.id}`} className="contents">
                        <div
                          className={`flex min-h-[60px] items-center border-b border-r border-white/10 px-3.5 text-xs font-black ${
                            selected.includes(row.id)
                              ? "bg-blue-500/10 text-blue-200"
                              : "bg-slate-950/60 text-slate-300"
                          }`}
                        >
                          {isTurkish ? row.tr : row.en}
                        </div>

                        {matrixActivities.map((column) => {
                          const same = row.id === column.id;

                          if (same) {
                            return (
                              <div
                                key={`${row.id}-${column.id}`}
                                className="flex min-h-[60px] items-center justify-center border-b border-r border-white/10 bg-slate-950/30 text-slate-600"
                              >
                                —
                              </div>
                            );
                          }

                          const interaction = pseudoInteraction(row.id, column.id);
                          const active =
                            interactionKey(row.id, column.id) ===
                            interactionKey(activePair[0], activePair[1]);

                          return (
                            <button
                              key={`${row.id}-${column.id}`}
                              type="button"
                              onClick={() => setActivePair([row.id, column.id])}
                              className={`flex min-h-[60px] items-center justify-center border-b border-r border-white/10 px-2 transition ${
                                selected.includes(row.id) && selected.includes(column.id)
                                  ? "bg-white/[0.025]"
                                  : ""
                              } ${
                                active
                                  ? "relative z-10 bg-blue-500/15 ring-2 ring-inset ring-blue-400 shadow-[inset_0_0_24px_rgba(59,130,246,0.08)]"
                                  : "hover:bg-white/5"
                              }`}
                            >
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black shadow-sm ${levelMeta[interaction.level].badge}`}
                              >
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${levelMeta[interaction.level].dot}`}
                                />
                                {isTurkish
                                  ? levelMeta[interaction.level].tr
                                  : levelMeta[interaction.level].en}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DETAIL */}
              <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-slate-950/40 shadow-inner">
                <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3">
                  <span className="font-black">
                    {activityName(activePair[0])}
                  </span>

                  <span className="text-slate-500">+</span>

                  <span className="font-black">
                    {activityName(activePair[1])}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${levelMeta[activeInteraction.level].badge}`}
                  >
                    {isTurkish
                      ? levelMeta[activeInteraction.level].tr
                      : levelMeta[activeInteraction.level].en}
                  </span>
                </div>

                <div className="grid lg:grid-cols-[1fr_1.7fr_180px]">
                  <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
                    <h3 className="text-xs font-black uppercase tracking-wide text-slate-300">
                      {isTurkish
                        ? "Potansiyel Etkileşim Tehlikeleri"
                        : "Potential Interaction Hazards"}
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {(isTurkish
                        ? activeInteraction.hazardsTr
                        : activeInteraction.hazardsEn
                      ).map((hazard) => (
                        <li
                          key={hazard}
                          className="flex gap-2 text-xs leading-5 text-slate-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          <span>{hazard}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
                    <h3 className="text-xs font-black uppercase tracking-wide text-slate-300">
                      {isTurkish ? "Gerekli Kontroller" : "Required Controls"}
                    </h3>

                    <div className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                      {(isTurkish
                        ? activeInteraction.controlsTr
                        : activeInteraction.controlsEn
                      ).map((control) => (
                        <div
                          key={control}
                          className="flex gap-2 text-xs leading-5 text-slate-300"
                        >
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[9px] font-black text-emerald-400">
                            ✓
                          </span>
                          <span>{control}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="border-b border-white/10 p-4">
                      <div className="text-[11px] font-bold uppercase text-slate-400">
                        {isTurkish ? "İlk Risk" : "Initial Risk"}
                      </div>

                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-black text-red-400">
                          {activeInteraction.initialRisk}
                        </span>
                        <span className="pb-1 text-xs font-bold text-red-300">
                          {isTurkish
                            ? levelMeta[riskLevelFromScore(activeInteraction.initialRisk)].tr
                            : levelMeta[riskLevelFromScore(activeInteraction.initialRisk)].en}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-[11px] font-bold uppercase text-slate-400">
                        {isTurkish ? "Kalan Risk" : "Residual Risk"}
                      </div>

                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-black text-yellow-400">
                          {activeInteraction.residualRisk}
                        </span>
                        <span className="pb-1 text-xs font-bold text-yellow-300">
                          {isTurkish
                            ? levelMeta[riskLevelFromScore(activeInteraction.residualRisk)].tr
                            : levelMeta[riskLevelFromScore(activeInteraction.residualRisk)].en}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIMOPS ACTION CONTROL */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-5 shadow-xl shadow-black/10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-black text-white">
                    {isTurkish
                      ? "Ek Kontroller ve Aksiyon Takibi"
                      : "Additional Controls & Action Tracking"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    {isTurkish
                      ? "Standart SIMOPS kontrollerine ek saha tedbirlerini kaydedin."
                      : "Record additional site controls beyond the standard SIMOPS controls."}
                  </p>
                </div>

                <select
                  value={actionStatus}
                  onChange={(event) =>
                    setActionStatus(
                      event.target.value as
                        | "open"
                        | "in-progress"
                        | "completed"
                    )
                  }
                  className={`rounded-lg border px-3 py-2 text-xs font-black outline-none ${
                    actionStatus === "completed"
                      ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                      : actionStatus === "in-progress"
                        ? "border-yellow-400/25 bg-yellow-500/10 text-yellow-300"
                        : "border-red-400/20 bg-red-500/10 text-red-300"
                  }`}
                >
                  <option value="open">
                    {isTurkish ? "Açık" : "Open"}
                  </option>
                  <option value="in-progress">
                    {isTurkish ? "Devam Ediyor" : "In Progress"}
                  </option>
                  <option value="completed">
                    {isTurkish ? "Tamamlandı" : "Completed"}
                  </option>
                </select>
              </div>

              <textarea
                value={additionalControls}
                onChange={(event) => setAdditionalControls(event.target.value)}
                rows={4}
                maxLength={1500}
                placeholder={
                  isTurkish
                    ? "Ek kontrol önlemleri, saha kısıtlamaları, özel talimatlar..."
                    : "Additional controls, site restrictions, special instructions..."
                }
                className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-xs leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

              <div className="mt-1 text-right text-[10px] text-slate-600">
                {additionalControls.length} / 1500
              </div>
            </div>

            {/* DECISION */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-5 shadow-xl shadow-black/10">
              <h2 className="text-base font-black">
                3. {isTurkish ? "Koordinasyon ve Karar" : "Coordination & Decision"}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {isTurkish
                  ? "Özet değerlendirmeyi inceleyin ve nasıl ilerleyeceğinize karar verin."
                  : "Review the summary and decide how to proceed."}
              </p>

              <div
                className={`mt-4 rounded-xl border p-4 ${
                  !hasEnoughActivities
                    ? "border-blue-400/20 bg-blue-500/[0.06]"
                    : recommendationDecision === "proceed"
                      ? "border-emerald-400/20 bg-emerald-500/[0.06]"
                      : recommendationDecision === "controls"
                        ? "border-yellow-400/20 bg-yellow-500/[0.06]"
                        : recommendationDecision === "reschedule"
                          ? "border-orange-400/20 bg-orange-500/[0.06]"
                          : "border-red-400/25 bg-red-500/[0.07]"
                }`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
                      {isTurkish ? "SİSTEM ÖNERİSİ" : "SYSTEM RECOMMENDATION"}
                    </div>

                    <div className="mt-2 text-base font-black text-white">
                      {!hasEnoughActivities
                        ? isTurkish
                          ? "Değerlendirme için en az 2 faaliyet seçin"
                          : "Select at least 2 activities for assessment"
                        : recommendationDecision === "proceed"
                          ? isTurkish
                            ? "Devam Et"
                            : "Proceed"
                          : recommendationDecision === "controls"
                            ? isTurkish
                              ? "Ek Kontrollerle Devam Et"
                              : "Proceed with Additional Controls"
                            : recommendationDecision === "reschedule"
                              ? isTurkish
                                ? "Faaliyetleri Yeniden Planla"
                                : "Reschedule Activities"
                              : isTurkish
                                ? "Devam Etme"
                                : "Do Not Proceed"}
                    </div>

                    <div className="mt-1 text-xs leading-5 text-slate-400">
                      {!hasEnoughActivities
                        ? isTurkish
                          ? "SIMOPS etkileşimi hesaplanabilmesi için en az iki eş zamanlı faaliyet gereklidir."
                          : "At least two simultaneous activities are required to calculate a SIMOPS interaction."
                        : isTurkish
                          ? `Maksimum kalan risk ${maxResidual}. Sistem daha düşük güvenlik seviyesindeki kararları kilitler.`
                          : `Maximum residual risk is ${maxResidual}. Less conservative decisions are locked.`}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-6">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-500">
                        {isTurkish ? "İlk Risk" : "Initial"}
                      </div>
                      <div className={`mt-1 text-2xl font-black ${levelMeta[initialLevel].scoreClass}`}>
                        {maxInitial}
                      </div>
                    </div>

                    <div className="text-xl text-slate-600">→</div>

                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-500">
                        {isTurkish ? "Kalan Risk" : "Residual"}
                      </div>
                      <div className={`mt-1 text-2xl font-black ${levelMeta[residualLevel].scoreClass}`}>
                        {maxResidual}
                      </div>
                    </div>

                    <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-black text-emerald-300">
                      ↓ %{riskReduction}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {decisions.map((item, index) => {
                  const locked =
                    !hasEnoughActivities || index < minimumDecisionRank;

                  const recommended =
                    hasEnoughActivities &&
                    item.id === recommendationDecision;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={locked}
                      onClick={() => setDecision(item.id)}
                      className={`relative rounded-xl border p-4 text-left transition ${
                        locked
                          ? "cursor-not-allowed border-white/5 bg-slate-950/20 text-slate-600 opacity-45"
                          : decision === item.id
                            ? `${item.className} ring-2 ring-white/10`
                            : "border-white/10 bg-slate-950/35 text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {recommended && (
                        <span className="absolute right-3 top-3 rounded-full bg-blue-500/15 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-blue-300">
                          {isTurkish ? "ÖNERİLEN" : "RECOMMENDED"}
                        </span>
                      )}

                      <div className="pr-16 text-sm font-black">
                        {isTurkish ? item.tr : item.en}
                      </div>

                      <div className="mt-1 text-xs opacity-75">
                        {isTurkish ? item.trSub : item.enSub}
                      </div>

                      {locked && hasEnoughActivities && (
                        <div className="mt-2 text-[10px] font-bold text-red-400/80">
                          🔒 {isTurkish ? "Risk seviyesi için uygun değil" : "Not allowed for this risk level"}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* SIMOPS REVIEW APPROVAL */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setHseApproved((value) => !value)}
                  className={`rounded-xl border p-4 text-left transition ${
                    hseApproved
                      ? "border-emerald-400/30 bg-emerald-500/10"
                      : "border-white/10 bg-slate-950/35"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wide text-slate-500">
                        HSE REVIEW
                      </div>

                      <div className="mt-1 text-sm font-black text-white">
                        {isTurkish ? "HSE Onayı" : "HSE Approval"}
                      </div>
                    </div>

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-black ${
                        hseApproved
                          ? "border-emerald-400 bg-emerald-500 text-white"
                          : "border-slate-600 text-slate-600"
                      }`}
                    >
                      {hseApproved ? "✓" : ""}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAreaSupervisorApproved((value) => !value)
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    areaSupervisorApproved
                      ? "border-emerald-400/30 bg-emerald-500/10"
                      : "border-white/10 bg-slate-950/35"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wide text-slate-500">
                        AREA REVIEW
                      </div>

                      <div className="mt-1 text-sm font-black text-white">
                        {isTurkish
                          ? "Alan Supervisor Onayı"
                          : "Area Supervisor Approval"}
                      </div>
                    </div>

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-black ${
                        areaSupervisorApproved
                          ? "border-emerald-400 bg-emerald-500 text-white"
                          : "border-slate-600 text-slate-600"
                      }`}
                    >
                      {areaSupervisorApproved ? "✓" : ""}
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-blue-400/15 bg-gradient-to-r from-blue-500/[0.06] to-slate-950/40 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    {isTurkish ? "SIMOPS Koordinatörü" : "SIMOPS Coordinator"}
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-800 text-sm font-black text-white">
                      SA
                    </div>

                    <div>
                      <div className="font-black text-white">
                        Sercan Aslan
                      </div>
                      <div className="text-xs text-slate-400">
                        HSE Supervisor
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-500">
                    {isTurkish
                      ? "SIMOPS koordinasyonu ve son karar sorumluluğu"
                      : "Responsible for SIMOPS coordination and final decision"}
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-200"
                >
                  {isTurkish ? "Değiştir" : "Change"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* SIMOPS HISTORY MODAL */}
      {historyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-lg font-black text-white">
                  {isTurkish ? "SIMOPS Geçmiş Kayıtları" : "SIMOPS History"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {isTurkish
                    ? "Kaydı açın, düzenleyin, yeniden PDF oluşturun veya silin."
                    : "Open, edit, regenerate the PDF or delete a saved assessment."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setHistoryOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-lg text-slate-300 hover:bg-slate-800"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {historyLoading ? (
                <div className="py-16 text-center text-sm text-slate-400">
                  {isTurkish ? "Kayıtlar yükleniyor..." : "Loading records..."}
                </div>
              ) : savedRecords.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
                  <div className="text-sm font-bold text-slate-300">
                    {isTurkish
                      ? "Henüz kayıtlı SIMOPS değerlendirmesi yok."
                      : "No saved SIMOPS assessments yet."}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedRecords.map((record) => (
                    <div
                      key={record.id}
                      className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-blue-400/20 md:grid-cols-[1fr_auto]"
                    >
                      <button
                        type="button"
                        onClick={() => openSavedAssessment(record)}
                        className="text-left"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-sm font-black text-white">
                            {record.project_name ||
                              (isTurkish
                                ? "İsimsiz SIMOPS Planı"
                                : "Untitled SIMOPS Plan")}
                          </div>

                          <span
                            className={`rounded-full border px-2 py-1 text-[9px] font-black ${
                              levelMeta[record.interaction_level].badge
                            }`}
                          >
                            {isTurkish
                              ? levelMeta[record.interaction_level].tr
                              : levelMeta[record.interaction_level].en}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate-400">
                          <span>
                            {isTurkish ? "Alan" : "Area"}:{" "}
                            {record.area_unit || "-"}
                          </span>

                          <span>
                            {isTurkish ? "Tarih" : "Date"}:{" "}
                            {record.work_date || "-"}
                          </span>

                          <span>
                            {isTurkish ? "Risk" : "Risk"}:{" "}
                            {record.initial_risk} → {record.residual_risk}
                          </span>

                          <span>
                            {new Date(record.updated_at).toLocaleString(
                              isTurkish ? "tr-TR" : "en-GB"
                            )}
                          </span>
                        </div>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openSavedAssessment(record)}
                          className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-[10px] font-black text-blue-300 hover:bg-blue-500/20"
                        >
                          {isTurkish ? "Aç / Düzenle" : "Open / Edit"}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteSavedAssessment(record.id)}
                          className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-[10px] font-black text-red-300 hover:bg-red-500/20"
                        >
                          {isTurkish ? "Sil" : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

</section>
  );
}

function SummaryItem({
  title,
  value,
  sub,
  accent,
}: {
  title: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="min-h-[104px] border-b border-white/10 p-5 last:border-b-0 md:border-r md:last:border-r-0 xl:border-b-0">
      <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">{title}</div>

      <div className={`mt-2 text-3xl font-black tracking-tight ${accent}`}>
        {value}
      </div>

      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
