import type { LabLocale, LabScenario } from "../types";

const scenarios: LabScenario[] = [
  {
    id: "sth-wah-piperack-01-en",
    type: "spot_hazard",
    category: "working_at_height",
    difficulty: "medium",
    language: "en",
    title: "Pipe Rack Maintenance",
    scenario: "A maintenance crew is working from an elevated pipe rack. Select every unsafe condition that should be addressed before work continues.",
    image: "/labs/spot-the-hazard/piperack-320-q30.jpg",
    options: [
      { id: "no-tieoff", label: "One worker is not connected to an approved anchor point" },
      { id: "loose-tools", label: "Loose hand tools are positioned where they can fall to a lower level" },
      { id: "open-edge", label: "The work position has an exposed edge without collective fall protection" },
      { id: "proper-helmet", label: "A second worker is wearing a chin-strap safety helmet correctly" },
      { id: "access", label: "Access to the elevated work position is improvised and not clearly controlled" }
    ],
    correct_answer: ["no-tieoff", "loose-tools", "open-edge", "access"],
    hazards: [
      { id: "no-tieoff", label: "Unprotected work at height", explanation: "A fall-arrest system only protects the worker when it is connected to a suitable anchor.", severity: "critical" },
      { id: "loose-tools", label: "Dropped-object exposure", explanation: "Unsecured tools can strike workers below. Tool retention or exclusion controls are required.", severity: "high" },
      { id: "open-edge", label: "Open-edge exposure", explanation: "Where practicable, guardrails or another collective control should protect the exposed edge.", severity: "critical" },
      { id: "access", label: "Unsafe access", explanation: "Access must be planned and suitable for the work position rather than improvised on site.", severity: "high" }
    ],
    explanation: "The scene contains four hazards. Correct PPE alone does not make the work position safe.",
    xp: 20,
    premium: false
  },
  {
    id: "sth-hotwork-refinery-01-en",
    type: "spot_hazard",
    category: "hot_work",
    difficulty: "medium",
    language: "en",
    title: "Refinery Cutting Operation",
    scenario: "A worker is carrying out cutting work in an operating industrial area. Identify the unsafe conditions.",
    options: [
      { id: "combustibles", label: "Combustible material remains inside the spark travel area" },
      { id: "firewatch", label: "No dedicated fire watch is visible for the task" },
      { id: "cylinder", label: "Gas cylinders are unsecured beside the work area" },
      { id: "shield", label: "The worker is using appropriate face and eye protection" },
      { id: "barrier", label: "The hot-work boundary is not clearly controlled from passers-by" }
    ],
    correct_answer: ["combustibles", "firewatch", "cylinder", "barrier"],
    explanation: "Hot work needs more than PPE: ignition sources, combustibles, cylinder control, fire watch and area segregation must all be managed.",
    xp: 20,
    premium: false
  },
  {
    id: "sth-scaffold-platform-01-en",
    type: "spot_hazard",
    category: "scaffolding",
    difficulty: "hard",
    language: "en",
    title: "Incomplete Working Platform",
    scenario: "A scaffold is being used during maintenance work. Select the conditions that require action.",
    options: [
      { id: "tag", label: "The scaffold status/tag is missing or not visible at the access point" },
      { id: "gap", label: "The working platform has an unsafe gap" },
      { id: "toe", label: "Toe-board protection is incomplete where materials could fall" },
      { id: "ladder", label: "The internal access ladder is properly secured" },
      { id: "material", label: "Loose materials are stored at the platform edge" }
    ],
    correct_answer: ["tag", "gap", "toe", "material"],
    explanation: "Scaffold condition, access status and dropped-object controls need to be checked together before use.",
    xp: 30,
    premium: false
  },
  {
    id: "sth-lifting-load-01-en",
    type: "spot_hazard",
    category: "lifting",
    difficulty: "hard",
    language: "en",
    title: "Suspended Load Zone",
    scenario: "A load is being moved by crane near an active work area. Identify the unsafe conditions.",
    options: [
      { id: "underload", label: "A worker is standing inside the suspended-load danger zone" },
      { id: "tagline", label: "The load is being controlled with a suitable tag line from a safe position" },
      { id: "barricade", label: "The lifting area is not effectively segregated" },
      { id: "hands", label: "A worker is trying to guide the load directly by hand" },
      { id: "sling", label: "One sling is bearing against a sharp edge without visible protection" }
    ],
    correct_answer: ["underload", "barricade", "hands", "sling"],
    explanation: "Line-of-fire control is central to lifting safety. People should remain outside the load path and rigging must be protected from damage.",
    xp: 30,
    premium: false
  },
  {
    id: "sth-confined-entry-01-en",
    type: "spot_hazard",
    category: "confined_space",
    difficulty: "hard",
    language: "en",
    title: "Vessel Entry Preparation",
    scenario: "A team is preparing to enter a vessel. Select the conditions that would prevent a safe entry.",
    options: [
      { id: "gas", label: "No current atmospheric test result is available at the entry point" },
      { id: "attendant", label: "A trained attendant is positioned outside the opening" },
      { id: "isolation", label: "An energy line connected to the vessel is not positively isolated" },
      { id: "rescue", label: "The rescue arrangement has not been confirmed before entry" },
      { id: "permit", label: "The entry permit is incomplete for the planned work" }
    ],
    correct_answer: ["gas", "isolation", "rescue", "permit"],
    explanation: "Atmospheric testing, isolation, permit control and rescue readiness are critical entry controls. An attendant alone is not enough.",
    xp: 30,
    premium: false
  },
  {
    id: "sth-wah-piperack-01-tr",
    type: "spot_hazard",
    category: "working_at_height",
    difficulty: "medium",
    language: "tr",
    title: "Pipe Rack Bakım Çalışması",
    scenario: "Bir bakım ekibi yükseltilmiş pipe rack üzerinde çalışıyor. Çalışma devam etmeden önce düzeltilmesi gereken tüm güvensiz durumları seç.",
    image: "/labs/spot-the-hazard/piperack-320-q30.jpg",
    options: [
      { id: "no-tieoff", label: "Bir çalışan uygun ankraj noktasına bağlı değil" },
      { id: "loose-tools", label: "El aletleri alt seviyeye düşebilecek şekilde bırakılmış" },
      { id: "open-edge", label: "Çalışma noktasında toplu düşme koruması olmayan açık kenar var" },
      { id: "proper-helmet", label: "İkinci çalışan çene bağlı baretini doğru kullanıyor" },
      { id: "access", label: "Yüksek çalışma alanına erişim doğaçlama ve kontrolsüz" }
    ],
    correct_answer: ["no-tieoff", "loose-tools", "open-edge", "access"],
    explanation: "Sahnede dört tehlike var. Doğru PPE kullanımı tek başına çalışma alanını güvenli hale getirmez.",
    xp: 20,
    premium: false
  },
  {
    id: "sth-hotwork-refinery-01-tr",
    type: "spot_hazard",
    category: "hot_work",
    difficulty: "medium",
    language: "tr",
    title: "Rafineri Sıcak Çalışması",
    scenario: "Bir çalışan işletmedeki endüstriyel alanda kesme işi yapıyor. Güvensiz durumları seç.",
    options: [
      { id: "combustibles", label: "Kıvılcım alanında yanıcı malzeme bulunuyor" },
      { id: "firewatch", label: "Görev için atanmış yangın gözcüsü görünmüyor" },
      { id: "cylinder", label: "Gaz tüpleri çalışma alanı yanında sabitlenmeden duruyor" },
      { id: "shield", label: "Çalışan uygun yüz ve göz koruması kullanıyor" },
      { id: "barrier", label: "Sıcak çalışma alanı diğer kişilerden yeterince ayrılmamış" }
    ],
    correct_answer: ["combustibles", "firewatch", "cylinder", "barrier"],
    explanation: "Sıcak çalışma yalnızca PPE değildir; yanıcılar, tüpler, yangın gözcüsü ve alan kontrolü birlikte yönetilmelidir.",
    xp: 20,
    premium: false
  },
  {
    id: "sth-scaffold-platform-01-tr",
    type: "spot_hazard",
    category: "scaffolding",
    difficulty: "hard",
    language: "tr",
    title: "Eksik İskele Platformu",
    scenario: "Bakım işinde kullanılan iskelede aksiyon gerektiren durumları seç.",
    options: [
      { id: "tag", label: "Erişim noktasında iskele kartı/statüsü görünmüyor" },
      { id: "gap", label: "Çalışma platformunda tehlikeli boşluk var" },
      { id: "toe", label: "Malzeme düşebilecek bölgede topuk tahtası eksik" },
      { id: "ladder", label: "İç erişim merdiveni uygun şekilde sabitlenmiş" },
      { id: "material", label: "Gevşek malzemeler platform kenarında tutuluyor" }
    ],
    correct_answer: ["tag", "gap", "toe", "material"],
    explanation: "İskele güvenliği; statü, platform bütünlüğü, erişim ve düşen cisim kontrollerinin birlikte doğrulanmasını gerektirir.",
    xp: 30,
    premium: false
  },
  {
    id: "sth-lifting-load-01-tr",
    type: "spot_hazard",
    category: "lifting",
    difficulty: "hard",
    language: "tr",
    title: "Askıdaki Yük Alanı",
    scenario: "Vinçle taşınan bir yük aktif çalışma alanının yakınından geçiyor. Güvensiz durumları seç.",
    options: [
      { id: "underload", label: "Bir çalışan askıdaki yükün tehlike alanında duruyor" },
      { id: "tagline", label: "Yük güvenli mesafeden uygun tag line ile kontrol ediliyor" },
      { id: "barricade", label: "Kaldırma alanı etkili şekilde izole edilmemiş" },
      { id: "hands", label: "Bir çalışan yüke doğrudan eliyle yön vermeye çalışıyor" },
      { id: "sling", label: "Bir sapan keskin kenara korumasız temas ediyor" }
    ],
    correct_answer: ["underload", "barricade", "hands", "sling"],
    explanation: "Kaldırma operasyonunda line-of-fire kontrolü esastır. Çalışanlar yük yolundan uzak tutulmalı ve sapanlar hasara karşı korunmalıdır.",
    xp: 30,
    premium: false
  },
  {
    id: "sth-confined-entry-01-tr",
    type: "spot_hazard",
    category: "confined_space",
    difficulty: "hard",
    language: "tr",
    title: "Kapalı Alan Giriş Hazırlığı",
    scenario: "Bir ekip vessel içine giriş hazırlığı yapıyor. Güvenli girişi engelleyen durumları seç.",
    options: [
      { id: "gas", label: "Giriş noktasında güncel gaz ölçüm sonucu yok" },
      { id: "attendant", label: "Eğitimli gözcü giriş dışında görev yapıyor" },
      { id: "isolation", label: "Vessel'a bağlı enerji hattı pozitif olarak izole edilmemiş" },
      { id: "rescue", label: "Giriş öncesi kurtarma düzeni doğrulanmamış" },
      { id: "permit", label: "Giriş izni planlanan iş için eksik" }
    ],
    correct_answer: ["gas", "isolation", "rescue", "permit"],
    explanation: "Gaz ölçümü, izolasyon, permit ve kurtarma hazırlığı kritik giriş kontrolleridir. Sadece gözcü bulunması yeterli değildir.",
    xp: 30,
    premium: false
  }
];

export function getSpotTheHazardScenarios(locale: LabLocale) {
  return scenarios.filter((scenario) => scenario.language === locale);
}

export function getSpotTheHazardScenario(id: string, locale: LabLocale) {
  return scenarios.find((scenario) => scenario.id === id && scenario.language === locale) ?? null;
}
