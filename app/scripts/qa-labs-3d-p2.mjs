// Static checks only; interactive browser acceptance is a separate QA step.
import { readFileSync } from "node:fs";
const read=(name)=>readFileSync(new URL("../"+name,import.meta.url),"utf8");
const world=read("app/[locale]/labs/3d-safety-inspector/world.ts");
const client=read("app/[locale]/labs/3d-safety-inspector/Inspector3D.tsx");
const hazards=read("app/[locale]/labs/3d-safety-inspector/hazards.ts");
const route=read("app/[locale]/labs/3d-safety-inspector/page.tsx");
const checks=[
  ["12 scenario identifiers", (hazards.match(/\bid: "/g)||[]).length===12],
  ["every training entry has TR/EN evidence and corrective controls",
    (hazards.match(/\ben: \{/g)||[]).length===12 &&
    (hazards.match(/\btr: \{/g)||[]).length===12 &&
    (hazards.match(/\bevidence: "/g)||[]).length===24 &&
    (hazards.match(/\bcontrol: "/g)||[]).length===24],
  ["scene props represent all 12 training scenarios",
    world.includes("addTrainingFindings(m);") &&
    world.includes("emergency access route") &&
    world.includes("excavation inset") &&
    world.includes("unrestrained cylinder") &&
    world.includes("suspended load") &&
    world.includes("stacked without chocks")],
  ["missing scaffold guardrail deliberately visible",
    world.includes("if (y===3.3 && z===-6)")],
  ["gaze plus proximity rather than arbitrary click",
    world.includes("pickHazard(completed: ReadonlySet<string>)") &&
    world.includes("distance > hazard.range") &&
    world.includes("alignment>best")],
  ["detection controls and modal",client.includes('event.code === "KeyE"') &&
    client.includes("setMode(\"inspecting\")") &&
    client.includes("inspection[locale].evidence") &&
    client.includes("saveFinding")],
  ["reports are stored only in local mission state",client.includes("confirmed.current.add(inspection.id)") &&
    client.includes("setFound([...confirmed.current])")],
  ["no XP or Premium integration",!client.includes("getCurrentAccessProfile") &&
    !client.includes("supabase") &&
    !client.includes("awardXp") &&
    !client.includes("PremiumUser")],
  ["isolated beta route stays noindex",route.includes("index: false")],
  ["pre-existing Spot the Hazard imagery excluded",!world.includes("scene-hot-work-2k") && !client.includes("scene-confined-space-2k")],
];
let errors=0;
for(const [label,passed] of checks){console.log(`${passed ? "PASS" : "FAIL"} ${label}`);if(!passed)errors++;}
if(errors)process.exitCode=1;
