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
      "A technician is working from an elevated pipe-rack platform. Select the visible unsafe conditions that should be corrected before work continues.",
    options: [
      { id: "no-tieoff", label: "The worker at height is not connected to an approved anchor point" },
      { id: "loose-tools", label: "Loose hand tools are left where they could fall to a lower level" },
      { id: "open-edge", label: "The work position includes an exposed edge without collective fall protection" },
      { id: "proper-ppe", label: "The worker is wearing normal site PPE" },
      { id: "access", label: "The access ladder is improvised and not safely set for the platform" },
    ],
    correct_answer: ["no-tieoff", "loose-tools", "open-edge", "access"],
    explanation:
      "The scene should be read visually: the unprotected edge, the unsecured access ladder, the dropped-object exposure and the lack of tie-off all need action before work continues.",
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
      "A worker is grinding in an operating industrial area. Select the visible unsafe conditions in the scene.",
    options: [
      { id: "combustibles", label: "Combustible materials remain inside the spark travel area" },
      { id: "cylinder", label: "Gas cylinders are standing unsecured beside the work table" },
      { id: "trip", label: "A power lead or hose is creating a trip hazard around the task" },
      { id: "shield", label: "The worker is using suitable face and eye protection" },
      { id: "segregation", label: "The hot-work area is not screened or effectively segregated from nearby traffic" },
    ],
    correct_answer: ["combustibles", "cylinder", "trip", "segregation"],
    explanation:
      "This challenge is visual: sparks can reach combustibles, cylinders are unsecured, the lead around the task creates trip exposure, and the work area is not clearly segregated from surrounding traffic.",
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
      "A scaffold is being used during maintenance work. Select the visible conditions that require action.",
    options: [
      { id: "tag", label: "The scaffold status tag at the access point is blank or not clearly displayed" },
      { id: "gap", label: "The working platform contains an unsafe gap" },
      { id: "toe", label: "Toe-board protection is missing where materials could fall" },
      { id: "ladder", label: "The internal access ladder is properly secured" },
      { id: "material", label: "Loose materials are stored at the platform edge" },
    ],
    correct_answer: ["tag", "gap", "toe", "material"],
    explanation:
      "The visible issues are the unsafe platform gap, the incomplete edge protection for dropped objects, loose materials at the edge and the unclear scaffold status tag at the access point.",
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
      "A load is being moved by crane near an active work area. Select the visible unsafe conditions.",
    options: [
      { id: "underload", label: "A worker is standing inside the suspended-load danger zone" },
      { id: "tagline", label: "The load is being controlled from a safe position with a proper tag line" },
      { id: "barricade", label: "The lifting area is only partly coned off and not effectively segregated" },
      { id: "hands", label: "A worker is trying to guide the load directly by hand" },
      { id: "sling", label: "A sling is bearing against a sharp edge without visible protection" },
    ],
    correct_answer: ["underload", "barricade", "hands", "sling"],
    explanation:
      "The danger is visible in the scene: one worker is in the load path, the exclusion zone is incomplete, one worker is hand-guiding the load, and the sling contacts a sharp edge without protection.",
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
      "A team is preparing for vessel entry. Select the four visible unsafe conditions around the manway and access route.",
    options: [
      { id: "manway", label: "The open manway is not locally barricaded or protected against a fall into the opening" },
      { id: "retrieval", label: "The entrant is wearing a harness but the retrieval line is visibly not connected" },
      { id: "tools", label: "Loose hand tools are placed on the manway flange where they could fall into the vessel" },
      { id: "attendant", label: "A second worker is positioned outside the opening" },
      { id: "trip", label: "An extension lead or hose crosses the access walkway and creates a trip hazard" },
    ],
    correct_answer: ["manway", "retrieval", "tools", "trip"],
    explanation:
      "This scene is intentionally visual: the unprotected manway, disconnected retrieval line, loose tools on the flange and the cable or hose across the access route are all visible hazards that require action before entry.",
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
      "Bir teknisyen yükseltilmiş pipe-rack platformunda çalışıyor. Görselde doğrudan görülen ve çalışma devam etmeden önce düzeltilmesi gereken güvensiz durumları seç.",
    options: [
      { id: "no-tieoff", label: "Yüksekte çalışan kişi uygun ankraj noktasına bağlı değil" },
      { id: "loose-tools", label: "El aletleri alt seviyeye düşebilecek şekilde bırakılmış" },
      { id: "open-edge", label: "Çalışma noktasında toplu düşme koruması olmayan açık kenar var" },
      { id: "proper-ppe", label: "Çalışan temel saha PPE'sini doğru kullanıyor" },
      { id: "access", label: "Erişim merdiveni doğaçlama kurulmuş ve platform için güvenli değil" },
    ],
    correct_answer: ["no-tieoff", "loose-tools", "open-edge", "access"],
    explanation:
      "Bu sahnede tehlikeler görsel olarak okunmalı: açık kenar, kontrolsüz erişim merdiveni, düşebilecek el aletleri ve bağlantısız yüksekte çalışma aynı anda aksiyon gerektirir.",
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
      "Bir çalışan endüstriyel sahada taşlama yapıyor. Görselde doğrudan görülen güvensiz durumları seç.",
    options: [
      { id: "combustibles", label: "Kıvılcım sıçrama alanında yanıcı malzemeler duruyor" },
      { id: "cylinder", label: "Gaz tüpleri çalışma masası yanında sabitlenmeden duruyor" },
      { id: "trip", label: "Elektrik kablosu veya hortum çalışma çevresinde takılma riski oluşturuyor" },
      { id: "shield", label: "Çalışan uygun yüz ve göz koruması kullanıyor" },
      { id: "segregation", label: "Sıcak çalışma alanı çevredeki geçişlerden yeterince ayrılmamış" },
    ],
    correct_answer: ["combustibles", "cylinder", "trip", "segregation"],
    explanation:
      "Bu görev görsel okumaya dayanıyor: yanıcı malzeme kıvılcım alanında, tüpler sabitlenmemiş, kablo veya hortum takılma riski yaratıyor ve sıcak çalışma alanı çevreden net şekilde ayrılmamış.",
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
      "Bakım işinde kullanılan iskelede, görselde doğrudan görülen ve aksiyon gerektiren durumları seç.",
    options: [
      { id: "tag", label: "Erişim noktasındaki iskele kartı/statüsü boş veya net görünmüyor" },
      { id: "gap", label: "Çalışma platformunda tehlikeli boşluk var" },
      { id: "toe", label: "Malzeme düşebilecek bölgede topuk tahtası eksik" },
      { id: "ladder", label: "İç erişim merdiveni uygun şekilde sabitlenmiş" },
      { id: "material", label: "Gevşek malzemeler platform kenarında tutuluyor" },
    ],
    correct_answer: ["tag", "gap", "toe", "material"],
    explanation:
      "Bu sahnede görülen eksikler; tehlikeli platform boşluğu, düşen cisim riskine karşı eksik kenar koruması, kenarda tutulan gevşek malzemeler ve erişim noktasında net olmayan iskele statüsüdür.",
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
      "Vinçle taşınan bir yük aktif çalışma alanının yakınından geçiyor. Görselde doğrudan görülen güvensiz durumları seç.",
    options: [
      { id: "underload", label: "Bir çalışan askıdaki yükün tehlike alanında duruyor" },
      { id: "tagline", label: "Yük güvenli mesafeden uygun tag line ile kontrol ediliyor" },
      { id: "barricade", label: "Kaldırma alanı sadece kısmen konilerle çevrilmiş ve etkili biçimde izole edilmemiş" },
      { id: "hands", label: "Bir çalışan yüke doğrudan eliyle yön vermeye çalışıyor" },
      { id: "sling", label: "Bir sapan keskin kenara korumasız temas ediyor" },
    ],
    correct_answer: ["underload", "barricade", "hands", "sling"],
    explanation:
      "Görselde tehlikeler net: bir çalışan yük yolunda duruyor, kaldırma alanı eksik izole edilmiş, biri yükü eliyle yönlendiriyor ve sapan korumasız şekilde keskin kenara temas ediyor.",
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
      "Bir ekip vessel girişine hazırlanıyor. Manway ve erişim yolunda görselde doğrudan görülen dört güvensiz durumu seç.",
    options: [
      { id: "manway", label: "Açık manway etrafında düşmeyi önleyecek yerel bariyer veya koruma yok" },
      { id: "retrieval", label: "Giriş yapacak çalışan harness giyiyor ancak retrieval hattı görünür şekilde bağlı değil" },
      { id: "tools", label: "El aletleri manway flanşı üzerinde bırakılmış ve vessel içine düşebilir" },
      { id: "attendant", label: "Açıklığın dışında ikinci bir çalışan görev yapıyor" },
      { id: "trip", label: "Elektrik kablosu veya hortum erişim yolunu keserek takılma riski oluşturuyor" },
    ],
    correct_answer: ["manway", "retrieval", "tools", "trip"],
    explanation:
      "Bu görev tamamen görsel okunabilir: korunmayan manway açıklığı, bağlı olmayan retrieval hattı, flanş üzerindeki gevşek el aletleri ve erişim yolunu kesen kablo veya hortum girişten önce düzeltilmelidir.",
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
