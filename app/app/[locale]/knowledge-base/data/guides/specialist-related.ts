import type { RelatedGuide } from "../../components/GuideTemplate";
const titles: Record<string, {en:string;tr:string}> = {
  "respiratory-protection": { "en": "Respiratory Protection", "tr": "Solunum Koruması" },
  "welding-safety": {
    "en": "Welding Safety",
    "tr": "Kaynak Güvenliği"
  },
  "stored-energy-hazards": {
    "en": "Stored Energy Hazards",
    "tr": "Depolanmış Enerji Tehlikeleri"
  },
  "fire-watch-duties": {
    "en": "Fire Watch Duties",
    "tr": "Yangın Gözcüsünün Görevleri"
  },
  "safety-observation-programs": {
    "en": "Safety Observation Programs",
    "tr": "Güvenlik Gözlemleri"
  },
  "simops-safety": {
    "en": "SIMOPS Safety",
    "tr": "Eşzamanlı Çalışma Güvenliği"
  },
  "emergency-response-planning": {
    "en": "Emergency Response Planning",
    "tr": "Acil Durum Planlaması"
  },
  "oxygen-deficiency-hazards": {
    "en": "Oxygen Deficiency Hazards",
    "tr": "Oksijen Eksikliği Tehlikeleri"
  },
  "confined-space-gas-testing": {
    "en": "Confined Space Gas Testing",
    "tr": "Kapalı Alan Gaz Ölçümü"
  },
  "confined-space-rescue": {
    "en": "Confined Space Rescue",
    "tr": "Kapalı Alan Kurtarma"
  },
  "rigging-safety": {
    "en": "Rigging Safety",
    "tr": "Sapanlama Güvenliği"
  },
  "edge-protection-guardrails": {
    "en": "Edge Protection and Guardrails",
    "tr": "Kenar Koruması ve Korkuluklar"
  },
  "dropped-object-prevention": {
    "en": "Dropped Object Prevention",
    "tr": "Düşen Malzemenin Önlenmesi"
  },
  "temporary-electrical-installations": {
    "en": "Temporary Electrical Installations",
    "tr": "Geçici Elektrik Tesisatları"
  },
  "electrical-isolation-verification": {
    "en": "Electrical Isolation Verification",
    "tr": "Elektrik İzolasyonu Doğrulama"
  },
  "manual-handling": {
    "en": "Manual Handling Safety",
    "tr": "Elle Taşıma Güvenliği"
  },
  "machine-guarding": {
    "en": "Machine Guarding",
    "tr": "Makine Muhafazaları"
  },
  "zero-energy-verification": {
    "en": "Zero Energy Verification",
    "tr": "Sıfır Enerji Doğrulaması"
  },
  "pressure-testing-safety": {
    "en": "Pressure Testing Safety",
    "tr": "Basınç Testi Güvenliği"
  },
  "line-breaking-safety": {
    "en": "Line Breaking Safety",
    "tr": "Proses Hattı Açma Güvenliği"
  },
  "pre-startup-safety-review-pssr": {
    "en": "Pre-Startup Safety Review (PSSR)",
    "tr": "İşletmeye Alma Öncesi Güvenlik İncelemesi (PSSR)"
  },
  "management-of-change-moc": {
    "en": "Management of Change (MOC)",
    "tr": "Değişiklik Yönetimi (MOC)"
  },
  "mechanical-completion-punch-list": {
    "en": "Mechanical Completion and Punch List",
    "tr": "Mekanik Tamamlanma ve Punch List"
  },
  "contractor-safety-management": {
    "en": "Contractor Safety Management",
    "tr": "Yüklenici İSG Yönetimi"
  },
  "permit-to-work": {
    "en": "Permit to Work",
    "tr": "Çalışma İzin Sistemi"
  }
};
export function specialistRelatedGuide(slug: string): RelatedGuide {
  const title = titles[slug];
  if (!title) throw new Error(`Missing specialist related guide title for ${slug}`);
  return { slug, title, icon: "↗" };
}
