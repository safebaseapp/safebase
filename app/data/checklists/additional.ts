import type { ChecklistDocument, ChecklistItem, LocalizedText } from "./hot-work";

const standards = ["ISO 45001", "Applicable local legislation and site procedures"];

function text(en: string, tr: string): LocalizedText {
  return { en, tr };
}

function item(
  id: string,
  en: string,
  tr: string,
  critical = false,
  riskLevel: ChecklistItem["riskLevel"] = critical ? "High" : "Medium",
): ChecklistItem {
  return {
    id,
    requirement: text(en, tr),
    critical,
    riskLevel,
    applicability: "required",
    guidance: text(`Verify: ${en}`, `Doğrulayın: ${tr}`),
    correctiveAction: text(`Correct this finding before work continues: ${en}`, `Çalışma devam etmeden önce bu bulguyu giderin: ${tr}`),
    references: standards,
    related: {},
  };
}

function createChecklist(
  id: string,
  slug: string,
  title: LocalizedText,
  description: LocalizedText,
  category: LocalizedText,
  sectionTitle: LocalizedText,
  items: ChecklistItem[],
): ChecklistDocument {
  return {
    id,
    slug,
    title,
    description,
    category,
    version: "1.0",
    revision: "0",
    status: "approved",
    responseOptions: ["yes", "no", "na"],
    standards,
    disclaimer: text(
      "This checklist supports field verification and does not replace legislation, risk assessments, permits or site procedures.",
      "Bu kontrol listesi saha doğrulamasını destekler; mevzuatın, risk değerlendirmelerinin, izinlerin veya saha prosedürlerinin yerine geçmez.",
    ),
    sections: [{ id: `${slug}-controls`, title: sectionTitle, items }],
  };
}

const definitions = [
  ["excavation", "Excavation Inspection Checklist", "Kazı Denetim Kontrol Listesi", "Critical Work", "Kritik İşler", "Excavation Controls", "Kazı Kontrolleri", "Excavation and trench work controls.", "Kazı ve hendek çalışması kontrolleri.", ["The excavation has been assessed for collapse, services and access hazards.", "A competent person has inspected the excavation before each shift.", "Protective systems, benching or safe slopes are suitable for the soil and depth.", "Safe access and egress are provided within the required distance.", "Spoil, materials and equipment are kept away from the edge.", "Water accumulation, atmosphere and changing ground conditions are controlled.", "Nearby traffic, plant and falling-object hazards are segregated.", "The excavation is barricaded and inspected after changes or adverse weather."]],
  ["simops", "SIMOPS Inspection Checklist", "SIMOPS Denetim Kontrol Listesi", "Critical Work", "Kritik İşler", "SIMOPS Coordination", "SIMOPS Koordinasyonu", "Controls for simultaneous and conflicting operations.", "Eş zamanlı ve çakışan faaliyet kontrolleri.", ["All simultaneous operations are identified on the coordination plan.", "Conflicting hazards and interfaces have assigned control owners.", "Permit boundaries, isolations and work fronts are clearly communicated.", "A competent coordinator can stop conflicting work.", "Emergency routes and response arrangements remain available.", "Changes in sequence, scope or conditions are reviewed before work continues.", "Exclusion zones and communications between teams are effective.", "The daily coordination briefing has been recorded."]],
  ["electrical-safety", "Electrical Safety Inspection Checklist", "Elektrik Güvenliği Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Electrical Controls", "Elektrik Kontrolleri", "Electrical installations, isolation and protection checks.", "Elektrik tesisatı, izolasyon ve koruma kontrolleri.", ["Electrical equipment is suitable for the voltage and environment.", "Cables, plugs, panels and enclosures show no unsafe damage.", "Protective devices and residual-current protection are available and tested.", "Isolation points are identified, accessible and correctly labelled.", "Only authorized and competent persons perform electrical work.", "Temporary connections are protected from damage, water and trip hazards.", "Inspection and test records are current.", "Electrical work areas are controlled against unauthorized access."]],
  ["hand-tools", "Hand Tools Inspection Checklist", "El Aletleri Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Hand Tool Controls", "El Aleti Kontrolleri", "Condition and safe use checks for hand tools.", "El aletlerinin durumu ve güvenli kullanım kontrolleri.", ["Tools are suitable for the task and material.", "Handles, heads, guards and striking surfaces are in good condition.", "Cutting tools are sharp, secure and stored safely.", "Damaged or modified tools are removed from service.", "Workers use the tool correctly and maintain stable footing.", "Tools are transported and stored to prevent dropped-object exposure.", "Insulated tools are used where electrical contact is possible.", "Tool inspections are recorded according to site requirements."]],
  ["power-tools", "Power Tools Inspection Checklist", "Elektrikli El Aletleri Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Power Tool Controls", "Elektrikli El Aleti Kontrolleri", "Portable powered tool safety checks.", "Taşınabilir elektrikli alet güvenliği kontrolleri.", ["The power tool is suitable for the task and operating environment.", "Guards, handles, switches and trigger locks function correctly.", "Cables, plugs, batteries and chargers are free from unsafe damage.", "The tool is connected to the correct supply with required protection.", "Discs, blades and accessories are compatible and secured.", "Dust, noise, vibration and ejected-material controls are in place.", "Users are trained and wear the required PPE.", "Defective tools are isolated, labelled and reported."]],
  ["mobile-equipment", "Mobile Equipment Inspection Checklist", "Mobil Ekipman Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Mobile Equipment Controls", "Mobil Ekipman Kontrolleri", "Pre-use checks for mobile plant and equipment.", "Mobil iş makineleri ve ekipmanları için kullanım öncesi kontroller.", ["The operator is authorized, competent and fit for duty.", "Pre-use inspection records are complete and current.", "Brakes, steering, alarms, lights and safety devices work correctly.", "Loads, attachments and rated capacity are suitable.", "Pedestrian routes and exclusion zones are established.", "Reversing controls, visibility and spotter arrangements are effective.", "Parking, isolation and securing procedures are followed.", "Leaks, damage and defects are reported and controlled."]],
  ["fire-safety", "Fire Safety Inspection Checklist", "Yangın Güvenliği Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Fire Prevention Controls", "Yangın Önleme Kontrolleri", "Workplace fire prevention and response readiness.", "İşyeri yangın önleme ve müdahale hazırlığı.", ["Fire hazards and ignition sources have been identified.", "Suitable extinguishers are available, accessible and inspected.", "Emergency exits and fire routes are clear and signed.", "Flammable liquids and gases are stored and handled correctly.", "Fire detection, alarm and emergency lighting are functional.", "Combustible waste is removed and housekeeping is acceptable.", "Workers know the alarm, evacuation and assembly arrangements.", "Hot work and temporary fire-risk controls are monitored."]],
  ["temporary-power", "Temporary Power Inspection Checklist", "Geçici Elektrik Denetim Kontrol Listesi", "Equipment & Electrical", "Ekipman ve Elektrik", "Temporary Power Controls", "Geçici Elektrik Kontrolleri", "Temporary distribution and site power controls.", "Geçici dağıtım ve saha elektriği kontrolleri.", ["Temporary distribution boards are rated, protected and secured.", "Circuits have appropriate overcurrent and residual-current protection.", "Cables are routed, supported and protected from traffic and water.", "Connections, plugs and sockets are enclosed and undamaged.", "Isolation and emergency shut-off points are labelled and accessible.", "Generators are grounded, ventilated and safely refuelled.", "Only authorized persons make or modify connections.", "Periodic inspection and test records are available."]],
  ["ppe", "PPE Inspection Checklist", "KKD Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "PPE Controls", "KKD Kontrolleri", "Selection, condition and use of personal protective equipment.", "Kişisel koruyucu donanımın seçimi, durumu ve kullanımı.", ["PPE requirements are defined by the task risk assessment.", "Required PPE is available in the correct type and size.", "PPE is inspected before use and is free from unsafe damage.", "Workers wear PPE correctly and consistently.", "Eye, face, hearing, respiratory and hand protection match the hazards.", "Fall protection PPE is compatible, inspected and connected correctly.", "Contaminated or expired PPE is removed from service.", "PPE training, issue and replacement records are maintained."]],
  ["housekeeping", "Housekeeping Inspection Checklist", "Saha Düzeni Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Housekeeping Controls", "Saha Düzeni Kontrolleri", "Workplace order, access and waste controls.", "İşyeri düzeni, erişim ve atık kontrolleri.", ["Walkways, stairs and work areas are clear.", "Materials are stacked securely and do not obstruct access.", "Waste is segregated, contained and removed regularly.", "Spills are controlled and cleaned without delay.", "Cables, hoses and temporary services are routed safely.", "Openings, edges and uneven surfaces are protected.", "Emergency equipment and exits remain accessible.", "Housekeeping responsibilities and inspection frequency are defined."]],
  ["manual-handling", "Manual Handling Inspection Checklist", "Manuel Taşıma Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Manual Handling Controls", "Manuel Taşıma Kontrolleri", "Ergonomic and manual load handling checks.", "Ergonomik ve manuel yük taşıma kontrolleri.", ["The load weight, shape and route have been assessed.", "Mechanical assistance is used where reasonably practicable.", "The load can be gripped securely without sharp or unstable edges.", "The route is clear, level and adequately lit.", "Team lifting roles and communication are agreed.", "Workers use safe posture and avoid twisting under load.", "Rest, rotation or recovery arrangements address repetitive handling.", "Manual handling incidents and discomfort are reported and reviewed."]],
  ["chemical-safety", "Chemical Safety Inspection Checklist", "Kimyasal Güvenlik Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Chemical Controls", "Kimyasal Kontrolleri", "Chemical storage, handling and emergency controls.", "Kimyasal depolama, kullanım ve acil durum kontrolleri.", ["Current SDS documents are available and understood.", "Containers are labelled, closed and compatible with the substance.", "Chemicals are segregated and stored with suitable secondary containment.", "Ventilation and exposure controls are adequate.", "Required gloves, eye, face and respiratory protection are available.", "Spill kits and emergency eyewash or shower facilities are accessible.", "Workers are trained in handling, transfer and disposal.", "Expired, unknown or leaking chemicals are isolated and reported."]],
  ["vehicle-traffic", "Vehicle and Traffic Safety Inspection Checklist", "Araç ve Trafik Güvenliği Denetim Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Traffic Controls", "Trafik Kontrolleri", "Site vehicle movement and pedestrian safety checks.", "Saha araç hareketleri ve yaya güvenliği kontrolleri.", ["The traffic management plan is current and communicated.", "Vehicle routes, speed limits and one-way systems are signed.", "Pedestrian routes are segregated from moving vehicles.", "Vehicles are inspected and safety-critical defects are controlled.", "Reversing, parking and loading controls are established.", "Drivers are authorized and seat belts are used.", "Lighting, visibility and weather conditions are suitable.", "Incidents, near misses and route changes are reviewed."]],
  ["safety-observation", "Safety Observation Checklist", "Güvenlik Gözlemi Kontrol Listesi", "Field & Behaviour", "Saha ve Davranış", "Observation Controls", "Gözlem Kontrolleri", "Structured positive and at-risk behaviour observations.", "Olumlu ve riskli davranışlar için yapılandırılmış saha gözlemi.", ["The observation scope, task and location are recorded.", "Critical behaviours and life-saving rules are checked.", "Positive safe behaviours are recognized.", "At-risk acts and conditions are described factually.", "The worker or team is engaged respectfully during feedback.", "Immediate controls are applied where serious risk is observed.", "Actions have an owner and target date.", "Trends and repeat observations are reviewed."]],
  ["emergency-preparedness", "Emergency Preparedness Inspection Checklist", "Acil Durum Hazırlık Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "Emergency Readiness", "Acil Durum Hazırlığı", "Emergency planning, communication and response readiness.", "Acil durum planlama, iletişim ve müdahale hazırlığı.", ["The emergency plan covers credible site scenarios.", "Roles, responsibilities and escalation contacts are current.", "Alarm, communication and notification systems are functional.", "Escape routes, exits and assembly points are clear.", "Emergency equipment is available and inspected.", "Drills are scheduled, recorded and followed by corrective actions.", "Contractors and visitors receive emergency information.", "Changes in site layout or work scope are reflected in the plan."]],
  ["first-aid", "First Aid Inspection Checklist", "İlk Yardım Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "First Aid Readiness", "İlk Yardım Hazırlığı", "First aid coverage, equipment and response readiness.", "İlk yardım kapsamı, ekipmanı ve müdahale hazırlığı.", ["The required number of trained first aiders is available.", "First aid kits are accessible, stocked and sealed where required.", "First aid room or treatment area is clean and suitable.", "Emergency contact and location information is displayed.", "First aiders know the site emergency and reporting process.", "Eye wash, burn treatment and other task-specific supplies are available.", "Expired or used supplies are replaced promptly.", "First aid cases and trends are reviewed for preventive action."]],
  ["environmental", "Environmental Inspection Checklist", "Çevre Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "Environmental Controls", "Çevre Kontrolleri", "Operational environmental aspect and impact checks.", "Operasyonel çevre boyut ve etki kontrolleri.", ["Relevant environmental aspects and permit conditions are identified.", "Waste is segregated, labelled and transferred to approved streams.", "Spills, leaks and contaminated materials are controlled.", "Dust, noise, emissions and discharge controls are effective.", "Fuel, chemicals and hazardous materials are stored securely.", "Water, energy and material use are monitored where required.", "Environmental incidents and complaints are reported promptly.", "Inspection findings have owners, due dates and verification."]],
  ["welfare", "Welfare Facilities Inspection Checklist", "Refah Tesisleri Denetim Kontrol Listesi", "Management & Emergency", "Yönetim ve Acil Durum", "Welfare Standards", "Refah Standartları", "Worker welfare, hygiene and accommodation facility checks.", "Çalışan refahı, hijyen ve tesis kontrolleri.", ["Toilets, washing facilities and drinking water are available.", "Facilities are clean, maintained and adequately ventilated.", "Rest, changing and eating areas are suitable for the workforce.", "Lighting, heating and weather protection are adequate.", "Facilities are accessible to all applicable workers.", "Cleaning schedules and consumable supplies are maintained.", "Pest, hygiene and waste controls are effective.", "Welfare concerns are reported, tracked and closed."]],
] as const;

export const additionalChecklists: ChecklistDocument[] = definitions.map((definition, index) => {
  const [slug, enTitle, trTitle, enCategory, trCategory, enSection, trSection, enDescription, trDescription, itemTexts] = definition;
  return createChecklist(
    `SB-CHK-${String(index + 7).padStart(2, "0")}-001`,
    slug,
    text(enTitle, trTitle),
    text(enDescription, trDescription),
    text(enCategory, trCategory),
    text(enSection, trSection),
    itemTexts.map((requirement, itemIndex) => item(
      `${slug.toUpperCase().replaceAll("-", "_")}-${String(itemIndex + 1).padStart(3, "0")}`,
      requirement,
      requirement,
      itemIndex < 2,
      itemIndex < 2 ? "High" : itemIndex < 5 ? "Medium" : "Low",
    )),
  );
});
