import type { LabLocale, LabScenario } from "../types";

const scenarios: LabScenario[] = [
  {
    id: "sth-wah-piperack-01-en",
    type: "spot_hazard",
    category: "working_at_height",
    difficulty: "medium",
    language: "en",
    title: "Pipe Rack Maintenance",
    scenario:
      "A technician is working from an elevated pipe-rack platform. Select only the unsafe conditions you can actually see in the scene.",
    options: [
      { id: "no-tieoff", label: "The worker at height is not connected to an approved anchor point" },
      { id: "loose-tools", label: "Loose hand tools are left where they could fall to a lower level" },
      { id: "open-edge", label: "The work position includes an exposed edge without collective fall protection" },
      { id: "access", label: "The leaning access ladder is not safely set for the platform" },
    ],
    correct_answer: ["no-tieoff", "loose-tools", "open-edge", "access"],
    explanation:
      "All four findings are visible in the image: the worker is not tied off, loose tools can fall, the work position has an exposed edge, and the leaning ladder does not provide safe access to the platform.",
    xp: 20,
    premium: false,
  },
  {
    id: "sth-hotwork-refinery-01-en",
    type: "spot_hazard",
    category: "hot_work",
    difficulty: "medium",
    language: "en",
    title: "Refinery Hot Work",
    scenario:
      "A worker is grinding in an operating industrial area. Select only the unsafe conditions that are visible in the scene.",
    options: [
      { id: "combustibles", label: "Combustible material is within the spark travel area" },
      { id: "cylinder", label: "Gas cylinders are standing unsecured beside the work table" },
      { id: "trip", label: "A lead or hose around the work area creates a trip hazard" },
      { id: "segregation", label: "The hot-work area is not clearly segregated from the adjacent access route" },
    ],
    correct_answer: ["combustibles", "cylinder", "trip", "segregation"],
    explanation:
      "The image shows four visible issues: combustibles are exposed to sparks, cylinders are unsecured, a lead or hose creates a trip hazard, and the task is not clearly separated from the nearby access route.",
    xp: 20,
    premium: false,
  },
  {
    id: "sth-scaffold-platform-01-en",
    type: "spot_hazard",
    category: "scaffolding",
    difficulty: "hard",
    language: "en",
    title: "Incomplete Scaffold Platform",
    scenario:
      "A scaffold is being used during maintenance work. Select only the unsafe conditions that are clearly visible in the image.",
    options: [
      { id: "gap", label: "The working platform contains a dangerous opening / gap" },
      { id: "toe", label: "Toe-board protection is missing where objects could fall" },
      { id: "material", label: "Loose materials are stored close to the platform edge" },
    ],
    correct_answer: ["gap", "toe", "material"],
    explanation:
      "This scene has three unambiguous visual findings: a dangerous platform gap, missing toe-board protection and loose materials stored close to the edge. The previous scaffold-tag finding was removed because the tag status cannot be verified reliably from the image.",
    xp: 30,
    premium: false,
  },
  {
    id: "sth-lifting-load-01-en",
    type: "spot_hazard",
    category: "lifting",
    difficulty: "hard",
    language: "en",
    title: "Suspended Load Zone",
    scenario:
      "A load is being moved by crane near an active work area. Select the unsafe conditions that can be seen in the image.",
    options: [
      { id: "underload", label: "A worker is inside the suspended-load line-of-fire zone" },
      { id: "barricade", label: "The lifting area is only partly coned off and not effectively segregated" },
      { id: "hands", label: "A worker is trying to guide the suspended load directly by hand" },
      { id: "sling", label: "The lifting sling / connection is bearing against the load edge without visible protection" },
    ],
    correct_answer: ["underload", "barricade", "hands", "sling"],
    explanation:
      "The scene shows a worker inside the load line of fire, incomplete exclusion-zone control, direct hand contact with the load, and an unprotected lifting connection at the load edge.",
    xp: 30,
    premium: false,
  },
  {
    id: "sth-confined-entry-01-en",
    type: "spot_hazard",
    category: "confined_space",
    difficulty: "hard",
    language: "en",
    title: "Confined Space Entry Setup",
    scenario:
      "A team is preparing for vessel entry. Select the unsafe conditions that are directly visible around the manway.",
    options: [
      { id: "manway", label: "The open manway is not locally barricaded or protected" },
      { id: "retrieval", label: "The entrant's harness is not connected to the visible retrieval line" },
      { id: "tools", label: "Loose hand tools are left on or immediately beside the manway flange" },
      { id: "trip", label: "A cable or hose crosses the access area and creates a trip hazard" },
    ],
    correct_answer: ["manway", "retrieval", "tools", "trip"],
    explanation:
      "All four findings can be identified visually: the open manway is unprotected, the entrant is not connected to the retrieval line, loose tools are positioned at the opening, and a cable or hose creates a trip hazard in the access area.",
    xp: 30,
    premium: false,
  },
  {
    id: "sth-wah-piperack-01-tr",
    type: "spot_hazard",
    category: "working_at_height",
    difficulty: "medium",
    language: "tr",
    title: "Pipe Rack Bakım Çalışması",
    scenario:
      "Bir teknisyen yükseltilmiş pipe-rack platformunda çalışıyor. Yalnızca görselde gerçekten gördüğün güvensiz durumları seç.",
    options: [
      { id: "no-tieoff", label: "Yüksekte çalışan kişi uygun ankraj noktasına bağlı değil" },
      { id: "loose-tools", label: "El aletleri alt seviyeye düşebilecek şekilde bırakılmış" },
      { id: "open-edge", label: "Çalışma noktasında toplu düşme koruması olmayan açık kenar var" },
      { id: "access", label: "Dayalı erişim merdiveni platform için güvenli şekilde kurulmamış" },
    ],
    correct_answer: ["no-tieoff", "loose-tools", "open-edge", "access"],
    explanation:
      "Dört tespit de görselde doğrudan okunabiliyor: çalışan bağlı değil, gevşek el aletleri düşebilir, çalışma noktasında açık kenar var ve dayalı merdiven platforma güvenli erişim sağlamıyor.",
    xp: 20,
    premium: false,
  },
  {
    id: "sth-hotwork-refinery-01-tr",
    type: "spot_hazard",
    category: "hot_work",
    difficulty: "medium",
    language: "tr",
    title: "Rafineri Sıcak Çalışması",
    scenario:
      "Bir çalışan endüstriyel sahada taşlama yapıyor. Yalnızca görselde doğrudan görülen güvensiz durumları seç.",
    options: [
      { id: "combustibles", label: "Kıvılcım sıçrama alanında yanıcı malzeme bulunuyor" },
      { id: "cylinder", label: "Gaz tüpleri çalışma masası yanında sabitlenmeden duruyor" },
      { id: "trip", label: "Çalışma çevresindeki kablo veya hortum takılma riski oluşturuyor" },
      { id: "segregation", label: "Sıcak çalışma alanı yanındaki geçiş yolundan net şekilde ayrılmamış" },
    ],
    correct_answer: ["combustibles", "cylinder", "trip", "segregation"],
    explanation:
      "Görselde dört tespit net: yanıcı malzeme kıvılcım alanında, tüpler sabitlenmemiş, kablo veya hortum takılma riski yaratıyor ve çalışma alanı yanındaki geçiş yolundan yeterince ayrılmamış.",
    xp: 20,
    premium: false,
  },
  {
    id: "sth-scaffold-platform-01-tr",
    type: "spot_hazard",
    category: "scaffolding",
    difficulty: "hard",
    language: "tr",
    title: "Eksik İskele Platformu",
    scenario:
      "Bakım işinde kullanılan iskelede yalnızca görselde açıkça görülen güvensiz durumları seç.",
    options: [
      { id: "gap", label: "Çalışma platformunda tehlikeli açıklık / boşluk var" },
      { id: "toe", label: "Cisim düşebilecek bölgede topuk tahtası koruması eksik" },
      { id: "material", label: "Gevşek malzemeler platform kenarına yakın tutuluyor" },
    ],
    correct_answer: ["gap", "toe", "material"],
    explanation:
      "Bu görselde üç tartışmasız tespit var: tehlikeli platform boşluğu, eksik topuk tahtası koruması ve kenara yakın gevşek malzemeler. Önceki iskele kartı maddesi, kartın statüsü fotoğraftan güvenilir şekilde okunamadığı için kaldırıldı.",
    xp: 30,
    premium: false,
  },
  {
    id: "sth-lifting-load-01-tr",
    type: "spot_hazard",
    category: "lifting",
    difficulty: "hard",
    language: "tr",
    title: "Askıdaki Yük Alanı",
    scenario:
      "Vinçle taşınan bir yük aktif çalışma alanının yakınından geçiyor. Görselde gerçekten görülen güvensiz durumları seç.",
    options: [
      { id: "underload", label: "Bir çalışan askıdaki yükün line-of-fire / tehlike alanında duruyor" },
      { id: "barricade", label: "Kaldırma alanı yalnızca kısmen konilerle çevrilmiş ve etkili şekilde izole edilmemiş" },
      { id: "hands", label: "Bir çalışan askıdaki yüke doğrudan eliyle yön vermeye çalışıyor" },
      { id: "sling", label: "Kaldırma sapanı / bağlantısı yük kenarına görünür koruma olmadan temas ediyor" },
    ],
    correct_answer: ["underload", "barricade", "hands", "sling"],
    explanation:
      "Görselde bir çalışan yükün line-of-fire alanında, kaldırma alanı eksik izole edilmiş, başka bir çalışan yüke eliyle müdahale ediyor ve kaldırma bağlantısı yük kenarında korumasız görünüyor.",
    xp: 30,
    premium: false,
  },
  {
    id: "sth-confined-entry-01-tr",
    type: "spot_hazard",
    category: "confined_space",
    difficulty: "hard",
    language: "tr",
    title: "Kapalı Alan Giriş Hazırlığı",
    scenario:
      "Bir ekip vessel girişine hazırlanıyor. Manway çevresinde yalnızca görselde doğrudan görülen güvensiz durumları seç.",
    options: [
      { id: "manway", label: "Açık manway çevresinde yerel bariyer veya koruma yok" },
      { id: "retrieval", label: "Giriş yapacak çalışanın harness'i görünür retrieval hattına bağlı değil" },
      { id: "tools", label: "Gevşek el aletleri manway flanşı üzerinde veya hemen yanında bırakılmış" },
      { id: "trip", label: "Kablo veya hortum giriş yolunu keserek takılma riski oluşturuyor" },
    ],
    correct_answer: ["manway", "retrieval", "tools", "trip"],
    explanation:
      "Dört tespit de görselde doğrudan seçilebilir: açık manway korunmuyor, çalışan retrieval hattına bağlı değil, gevşek aletler açıklık çevresinde ve kablo veya hortum giriş yolunda takılma riski yaratıyor.",
    xp: 30,
    premium: false,
  },
];

export function getSpotTheHazardScenarios(locale: LabLocale) {
  return scenarios.filter((scenario) => scenario.language === locale);
}

export function getSpotTheHazardScenario(id: string, locale: LabLocale) {
  return scenarios.find((scenario) => scenario.id === id && scenario.language === locale) ?? null;
}
