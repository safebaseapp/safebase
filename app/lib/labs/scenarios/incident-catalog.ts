export type IncidentCatalogItem = {
  id: string;
  titleEn: string;
  titleTr: string;
  category: string;
  difficulty: "hard" | "expert";
  decisions: number;
  status: "live" | "coming";
  descEn: string;
  descTr: string;
};

export const incidentCatalog: IncidentCatalogItem[] = [
  { id: "hot-work-gas-drift", titleEn: "Hot Work: The Reading Changes", titleTr: "Sıcak Çalışma: Ölçüm Değişiyor", category: "Hot Work / Gas Testing", difficulty: "expert", decisions: 10, status: "live", descEn: "Changing gas readings, permit control, isolation, retesting and restart decisions under operational pressure.", descTr: "Değişen gaz ölçümleri, izin kontrolü, izolasyon, tekrar ölçüm ve operasyon baskısı altında yeniden başlatma kararları." },
  { id: "work-at-height-anchor", titleEn: "Work at Height: One Anchor Left", titleTr: "Yüksekte Çalışma: Tek Ankraj Kaldı", category: "Work at Height", difficulty: "expert", decisions: 10, status: "coming", descEn: "Anchor selection, access, dropped-object exposure, rescue readiness and stop-work judgment.", descTr: "Ankraj seçimi, erişim, düşen cisim riski, kurtarma hazırlığı ve işi durdurma muhakemesi." },
  { id: "confined-space-entry", titleEn: "Confined Space: Conditions Shift", titleTr: "Kapalı Alan: Koşullar Değişiyor", category: "Confined Space", difficulty: "expert", decisions: 10, status: "coming", descEn: "Atmospheric change, attendant response, ventilation, rescue and permit revalidation.", descTr: "Atmosfer değişimi, gözcü müdahalesi, havalandırma, kurtarma ve izin yeniden doğrulama." },
  { id: "loto-unexpected-energy", titleEn: "LOTO: Unexpected Energy", titleTr: "LOTO: Beklenmeyen Enerji", category: "LOTO / Isolation", difficulty: "expert", decisions: 10, status: "coming", descEn: "Zero-energy verification, stored energy, group lockout and restart pressure.", descTr: "Sıfır enerji doğrulaması, depolanmış enerji, grup kilitleme ve yeniden başlatma baskısı." },
  { id: "scaffold-status-change", titleEn: "Scaffolding: Status Changed", titleTr: "İskele: Durum Değişti", category: "Scaffolding", difficulty: "hard", decisions: 9, status: "coming", descEn: "Tag status, access, guardrails, loading and unauthorized modification decisions.", descTr: "Etiket durumu, erişim, korkuluk, yükleme ve yetkisiz değişiklik kararları." },
  { id: "excavation-water-ingress", titleEn: "Excavation: Water Is Rising", titleTr: "Kazı: Su Yükseliyor", category: "Excavation", difficulty: "expert", decisions: 10, status: "coming", descEn: "Ground stability, access, utilities, spoil placement and emergency withdrawal.", descTr: "Zemin stabilitesi, erişim, yeraltı hatları, hafriyat konumu ve acil tahliye." },
  { id: "lifting-blind-zone", titleEn: "Lifting: The Blind Zone", titleTr: "Kaldırma: Kör Nokta", category: "Lifting Operations", difficulty: "expert", decisions: 10, status: "coming", descEn: "Lift plan deviations, exclusion zone, signal conflict and suspended-load control.", descTr: "Kaldırma planı sapmaları, yasak bölge, işaretçi çatışması ve askıdaki yük kontrolü." },
  { id: "electrical-backfeed", titleEn: "Electrical: Backfeed Detected", titleTr: "Elektrik: Geri Besleme Tespit Edildi", category: "Electrical Safety", difficulty: "expert", decisions: 10, status: "coming", descEn: "Isolation boundaries, testing, induced voltage and energized-work escalation.", descTr: "İzolasyon sınırları, test, indüklenen gerilim ve enerjili çalışma eskalasyonu." },
  { id: "chemical-release-wind", titleEn: "Chemical Release: Wind Shift", titleTr: "Kimyasal Salım: Rüzgar Değişti", category: "Chemical / Process Safety", difficulty: "expert", decisions: 10, status: "coming", descEn: "Release recognition, wind direction, PPE limits, evacuation and escalation.", descTr: "Salım tespiti, rüzgar yönü, KKD sınırları, tahliye ve eskalasyon kararları." },
  { id: "mobile-equipment-reversing", titleEn: "Mobile Equipment: Reversing Conflict", titleTr: "Hareketli Ekipman: Geri Manevra Çatışması", category: "Mobile Equipment / Traffic", difficulty: "hard", decisions: 8, status: "coming", descEn: "Pedestrian segregation, spotter control, visibility and route-change decisions.", descTr: "Yaya ayrımı, işaretçi kontrolü, görüş ve güzergah değişikliği kararları." },
  { id: "fire-emergency-escalation", titleEn: "Fire & Emergency: First Five Minutes", titleTr: "Yangın ve Acil Durum: İlk Beş Dakika", category: "Emergency Response", difficulty: "expert", decisions: 10, status: "coming", descEn: "Alarm, evacuation, accountability, escalation and responder interface decisions.", descTr: "Alarm, tahliye, personel sayımı, eskalasyon ve müdahale ekibi koordinasyonu." },
  { id: "line-breaking-residual", titleEn: "Line Breaking: Residual Pressure", titleTr: "Hat Açma: Kalıntı Basınç", category: "Line Breaking", difficulty: "expert", decisions: 10, status: "coming", descEn: "Isolation, drain/vent verification, line-of-fire and process ownership decisions.", descTr: "İzolasyon, drenaj/havalandırma doğrulaması, ateş hattı ve proses sorumluluğu kararları." },
];
