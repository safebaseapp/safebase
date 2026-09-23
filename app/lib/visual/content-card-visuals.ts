import type { CSSProperties } from "react";

type ContentVisual = {
  key: string;
  imageUrl: string;
  position: string;
  accent: string;
  accent2: string;
};

type VisualKey = keyof typeof VISUALS;

const photo = (id: number, width = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

const VISUALS = {
  height: { key: "height", imageUrl: photo(13093933), position: "center 34%", accent: "14 165 233", accent2: "103 232 249" },
  scaffold: { key: "scaffold", imageUrl: photo(33320793), position: "center 40%", accent: "6 182 212", accent2: "103 232 249" },
  ladder: { key: "ladder", imageUrl: photo(12956301), position: "center 42%", accent: "14 165 233", accent2: "125 211 252" },
  crane: { key: "crane", imageUrl: photo(4311990), position: "center 40%", accent: "99 102 241", accent2: "167 139 250" },
  rigging: { key: "rigging", imageUrl: photo(12233662), position: "center 44%", accent: "99 102 241", accent2: "196 181 253" },
  forklift: { key: "forklift", imageUrl: photo(1267324), position: "center 46%", accent: "6 182 212", accent2: "45 212 191" },
  mobilePlant: { key: "mobile-plant", imageUrl: photo(11454241), position: "center 44%", accent: "8 145 178", accent2: "45 212 191" },
  manualHandling: { key: "manual-handling", imageUrl: photo(36552175), position: "center 42%", accent: "59 130 246", accent2: "147 197 253" },
  warehouse: { key: "warehouse", imageUrl: photo(4481329), position: "center 40%", accent: "71 85 105", accent2: "148 163 184" },
  hotWork: { key: "hot-work", imageUrl: photo(35136696), position: "center 40%", accent: "249 115 22", accent2: "251 191 36" },
  fire: { key: "fire", imageUrl: photo(34206461), position: "center 42%", accent: "244 63 94", accent2: "251 113 133" },
  loto: { key: "loto", imageUrl: photo(15049671), position: "center 47%", accent: "245 158 11", accent2: "250 204 21" },
  electrical: { key: "electrical", imageUrl: photo(10871585), position: "center 35%", accent: "99 102 241", accent2: "129 140 248" },
  confined: { key: "confined", imageUrl: photo(1267312), position: "center 38%", accent: "20 184 166", accent2: "94 234 212" },
  gasCylinder: { key: "gas-cylinder", imageUrl: photo(28996859), position: "center 45%", accent: "20 184 166", accent2: "94 234 212" },
  excavation: { key: "excavation", imageUrl: photo(5579584), position: "center 42%", accent: "217 119 6", accent2: "251 191 36" },
  chemical: { key: "chemical", imageUrl: photo(20379378), position: "center 40%", accent: "16 185 129", accent2: "52 211 153" },
  respiratory: { key: "respiratory", imageUrl: photo(6474117), position: "center 38%", accent: "16 185 129", accent2: "110 231 183" },
  tools: { key: "tools", imageUrl: photo(7562955), position: "center 44%", accent: "100 116 139", accent2: "203 213 225" },
  machinery: { key: "machinery", imageUrl: photo(2995864), position: "center 45%", accent: "100 116 139", accent2: "148 163 184" },
  inspection: { key: "inspection", imageUrl: photo(8960991), position: "center 42%", accent: "139 92 246", accent2: "196 181 253" },
  factoryInspection: { key: "factory-inspection", imageUrl: photo(19895915), position: "center 42%", accent: "59 130 246", accent2: "103 232 249" },
  firstAid: { key: "first-aid", imageUrl: photo(10395785), position: "center 46%", accent: "34 197 94", accent2: "134 239 172" },
  environmental: { key: "environmental", imageUrl: photo(17166070), position: "center 42%", accent: "16 185 129", accent2: "134 239 172" },
  ppe: { key: "ppe", imageUrl: photo(17993024), position: "center 36%", accent: "34 197 94", accent2: "134 239 172" },
  safetyTeam: { key: "safety-team", imageUrl: photo(35082106), position: "center 40%", accent: "59 130 246", accent2: "103 232 249" },
} as const satisfies Record<string, ContentVisual>;

const inspectionVisualKeys: Record<string, VisualKey> = {
  "work-at-height": "height",
  "hot-work": "hotWork",
  loto: "loto",
  scaffold: "scaffold",
  "confined-space": "confined",
  lifting: "crane",
  excavation: "excavation",
  simops: "inspection",
  "electrical-safety": "electrical",
  "hand-tools": "tools",
  "power-tools": "tools",
  "mobile-equipment": "mobilePlant",
  "fire-safety": "fire",
  "temporary-power": "electrical",
  ppe: "ppe",
  housekeeping: "warehouse",
  "manual-handling": "manualHandling",
  "chemical-safety": "chemical",
  "vehicle-traffic": "forklift",
  "safety-observation": "factoryInspection",
  "emergency-preparedness": "fire",
  "first-aid": "firstAid",
  environmental: "environmental",
  welfare: "safetyTeam",
};

function normalized(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

function containsAny(value: string, needles: string[]) {
  return needles.some((needle) => value.includes(needle));
}

export function getInspectionCardVisual(slug: string): ContentVisual {
  const key = inspectionVisualKeys[slug] ?? "factoryInspection";
  return VISUALS[key];
}

export function getGuideCardVisual(slug: string, category = "", title = ""): ContentVisual {
  const value = `${normalized(slug)}-${normalized(category)}-${normalized(title)}`;

  if (containsAny(value, ["first-aid"])) return VISUALS.firstAid;
  if (containsAny(value, ["environment", "spill-response", "waste"])) return VISUALS.environmental;
  if (containsAny(value, ["respiratory", "welding-fume"])) return VISUALS.respiratory;
  if (containsAny(value, ["ppe", "personal-protective", "eye-face", "hearing-protection", "hand-protection"])) return VISUALS.ppe;
  if (containsAny(value, ["chemical", "safety-data-sheet", "sds", "ghs", "flammable-liquid", "chemical-storage"])) return VISUALS.chemical;

  if (containsAny(value, ["forklift"])) return VISUALS.forklift;
  if (containsAny(value, ["telehandler", "mobile-equipment", "traffic-management", "pedestrian-vehicle", "reversing-vehicle"])) return VISUALS.mobilePlant;
  if (containsAny(value, ["banksman", "signal-person", "signalman", "mobile-crane", "crane-safety"])) return VISUALS.crane;
  if (containsAny(value, ["rigging", "sling", "shackle", "chain-block", "hoist", "lifting-plan", "suspended-load", "lifting-operations"])) return VISUALS.rigging;

  if (containsAny(value, ["scaffold", "mobile-scaffold"])) return VISUALS.scaffold;
  if (containsAny(value, ["ladder"])) return VISUALS.ladder;
  if (containsAny(value, ["working-at-height", "fall-protection", "anchor-point", "lifeline", "harness", "lanyard", "roof-work", "fragile-roof", "edge-protection", "dropped-object", "mewp", "aerial-lift"])) return VISUALS.height;

  if (containsAny(value, ["loto", "lockout", "tagout", "zero-energy"])) return VISUALS.loto;
  if (containsAny(value, ["electrical", "arc-flash", "temporary-power", "portable-electrical", "overhead-power"])) return VISUALS.electrical;
  if (containsAny(value, ["machine-guard", "stored-energy", "hydraulic", "pneumatic", "pressure-testing", "line-breaking"])) return VISUALS.machinery;

  if (containsAny(value, ["gas-cylinder", "oxygen-fuel-gas", "compressed-gas", "nitrogen", "inert-gas"])) return VISUALS.gasCylinder;
  if (containsAny(value, ["confined-space", "oxygen-deficiency", "hydrogen-sulfide", "h2s", "lel", "explosive-atmosphere", "gas-testing", "ventilation", "attendant", "entry-supervisor"])) return VISUALS.confined;

  if (containsAny(value, ["fire-watch", "fire-extinguisher", "fire-safety", "emergency-response", "emergency-preparedness", "combustible-dust"])) return VISUALS.fire;
  if (containsAny(value, ["hot-work", "welding", "gas-cutting", "spark", "slag", "grinding", "cutting-disc", "abrasive-wheel"])) return VISUALS.hotWork;

  if (containsAny(value, ["excavation", "trench", "shoring", "shielding", "underground-service", "spoil-pile", "groundwork"])) return VISUALS.excavation;

  if (containsAny(value, ["hand-tool", "power-tool", "magnetic-drill", "compressed-air", "abrasive-blasting"])) return VISUALS.tools;
  if (containsAny(value, ["manual-handling", "lifting-carrying", "ergonomic"])) return VISUALS.manualHandling;
  if (containsAny(value, ["housekeeping", "storage", "material-storage"])) return VISUALS.warehouse;

  if (containsAny(value, ["permit-to-work", "job-safety-analysis", "jsa", "take-5", "stop-work", "simops", "safety-observation", "incident-reporting", "near-miss", "contractor-safety"])) return VISUALS.inspection;
  if (containsAny(value, ["toolbox-talk", "fatigue", "welfare", "occupational-health", "heat-stress", "cold-stress"])) return VISUALS.safetyTeam;

  if (containsAny(value, ["electrical", "energy"])) return VISUALS.electrical;
  if (containsAny(value, ["lifting", "rigging", "crane"])) return VISUALS.rigging;
  if (containsAny(value, ["fire", "emergency"])) return VISUALS.fire;
  if (containsAny(value, ["chemical", "health"])) return VISUALS.chemical;
  if (containsAny(value, ["civil", "excavation"])) return VISUALS.excavation;
  if (containsAny(value, ["height", "access"])) return VISUALS.height;

  return VISUALS.factoryInspection;
}

export function getToolboxSpotVisual(slug: string): ContentVisual | null {
  const value = normalized(slug);
  if (containsAny(value, ["line-of-fire", "pinch-point", "slips-trips", "barricading-exclusion"])) return VISUALS.factoryInspection;
  if (containsAny(value, ["vehicle-pedestrian", "reversing", "traffic"])) return VISUALS.mobilePlant;
  if (containsAny(value, ["demolition", "dismantling"])) return VISUALS.excavation;
  if (containsAny(value, ["steam-hot-surfaces"])) return VISUALS.machinery;
  if (containsAny(value, ["lightning-severe-weather"])) return VISUALS.safetyTeam;
  if (containsAny(value, ["manual-handling"])) return VISUALS.manualHandling;
  return null;
}

export function getCardVisualStyle(visual: ContentVisual): CSSProperties {
  return {
    "--svc-image": `url('${visual.imageUrl}')`,
    "--svc-position": visual.position,
    "--sv-accent": visual.accent,
    "--sv-accent-2": visual.accent2,
  } as CSSProperties;
}
