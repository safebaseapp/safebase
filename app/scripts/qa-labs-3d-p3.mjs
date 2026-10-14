// Package 3: standalone static contract checks; interactive mobile QA runs separately.
import { readFileSync } from "node:fs";
const read = name => readFileSync(new URL("../" + name, import.meta.url), "utf8");
const client = read("app/[locale]/labs/3d-safety-inspector/Inspector3D.tsx");
const assessment = read("app/[locale]/labs/3d-safety-inspector/assessment.ts");
const hazards = read("app/[locale]/labs/3d-safety-inspector/hazards.ts");
const keys = [...assessment.matchAll(/^  "([a-z-]+)": \{/gm)].map(match => match[1]);
const hazardKeys = [...hazards.matchAll(/^    id: "([a-z-]+)"/gm)].map(match => match[1]);
const checks = [
  ["12 hazard decisions exactly match visible finding IDs", keys.length === 12 &&
    new Set(keys).size === 12 && keys.every(k => hazardKeys.includes(k)) && hazardKeys.every(k => keys.includes(k))],
  ["all scenarios have three bilingual choices",
    (assessment.match(/    tr: \[/g) || []).length === 12 &&
    (assessment.match(/    en: \[/g) || []).length === 12],
  ["one valid correct choice per scenario", (assessment.match(/    correct: [012], priority:/g) || []).length === 12],
  ["critical/high site training priority for every scenario", (assessment.match(/^    correct: [012], priority: "(?:high|critical)"/gm) || []).length === 12],
  ["correct intervention required before recording", client.includes("if (!inspection || !resolved) return;")],
  ["corrective action hidden until a correct choice", client.includes("{resolved && (") &&
    client.includes("inspection[locale].control")],
  ["mistakes reduce local mission score", client.includes("pointsForDecision(wrongAttempts)") &&
    assessment.includes("wrongAttempts === 0 ? 20 : wrongAttempts === 1 ? 10 : 0")],
  ["no external XP write from judgment flow", !client.includes("awardXp") &&
    !client.includes("supabase") && !client.includes("updateUserXp")],
  ["mobile and desktop controls preserved", client.includes("className={s.mobileControls}") &&
    client.includes("requestPointerLock()")],
  ["active field clock only increments in running mode", client.includes("if (active.current) {\n        timeRef.current += dt;")],
  ["score, question, completion present in both languages", client.includes("MISSION SCORE") ||
    (client.includes("Görev puanı") && client.includes("Mission score") && client.includes("Müdahale seçenekleri"))],
];
let failed = 0;
for(const [label,pass] of checks) {
  console.log((pass ? "PASS " : "FAIL ") + label);
  if(!pass) failed++;
}
if(failed) process.exitCode = 1;
