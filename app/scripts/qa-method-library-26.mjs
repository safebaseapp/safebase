// Additive source guard: the original twenty loaders must remain intact while
// six complete bilingual field method presets populate the existing editor.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const presetSource=read("lib/content/growthMethodPresets.ts");
const baseSource=read("lib/content/methodExamples.ts");
const page=read("app/[locale]/tools/method-statement/page.tsx");
const m=presetSource.match(/export const growthMethodPresets: GrowthMethodPreset\[\] = (\[[\s\S]*?\]);\s*export function getGrowthMethodExample/);
assert.ok(m,"Unable to parse six growth presets");
const presets=JSON.parse(m[1]);
const n=baseSource.match(/export const methodExamples: MethodExample\[\] = (\[[\s\S]*?\]);\s*export const getMethodExample/);
assert.ok(n,"Unable to parse method examples");
const examples=JSON.parse(n[1]);
assert.equal(presets.length,6,"Need exactly six additional templates");
assert.equal(examples.length,6,"Method guides and new templates must stay aligned");
const original=[...page.matchAll(/const (load\w+Template) = \(\) =>/g)].map(x=>x[1]);
assert.equal(original.length,20,"Existing 20 legacy loading functions must not be removed");
assert.equal(new Set(original).size,20,"Old loader duplication");
assert.ok(page.includes("{20 + growthMethodPresets.length}"),"Library total should show 26");
assert.ok(page.includes("growthMethodPresets.map((preset)"),"New presets must appear in original card grid");
assert.ok(page.includes("showLoadedButtonFeedback(buttonId)"),"New buttons need loaded state feedback");
assert.ok(page.includes("setLocalizedTemplateName(preset.activity.en, preset.activity.tr)"),"Active template feedback missing");
assert.ok(page.includes("loadGrowthMethodTemplate(preset.slug)"),"Card button not wired to the loader");
assert.ok(page.includes("method-statement-editor-target")&&page.includes("scrollIntoView"),"Editor navigation missing");
assert.ok(page.includes("<MethodStatementPrint"),"Existing print flow must remain");
assert.ok(page.includes("requirePrintAuth(locale)"),"Existing PDF authentication protection must remain");
assert.ok(page.includes('source: "ready_template"'),"New templates need analytics tracking");
const requiredSetters=["setActivity","setDocumentNo","setScope","setResponsibilities","setCompetency","setPpe","setToolsEquipment","setPermits","setPreWorkRequirements","setEmergencyArrangements","setEnvironmentalControls","setReferences","setMethodSteps"];
const loader=page.slice(page.indexOf("const loadGrowthMethodTemplate = "),page.indexOf("  return (\n    <main"));
assert.ok(loader.length>800 && loader.length<9000,"Growth loader bounds");
for(const setter of requiredSetters)assert.ok(loader.includes(setter+"("),setter+" not populated in new loader");
const nums=presets.map(x=>x.number).sort((a,b)=>a-b);
assert.deepEqual(nums,[21,22,23,24,25,26]);
const slugs=new Set(), known=new Set(examples.map(x=>x.slug));
for(const p of presets){
 assert.ok(known.has(p.slug),"No technical method source for "+p.slug);
 assert.ok(!slugs.has(p.slug),"Duplicate preset slug");
 slugs.add(p.slug);
 assert.ok(p.icon.length>0&&p.iconBg.startsWith("bg-")&&p.button.startsWith("bg-"),"Invalid card style");
 for(const key of ["activity","description","responsibilities","competency","ppe","tools","permits","environment","stepOwner"]){
  for(const locale of ["tr","en"]){
   assert.ok(typeof p[key][locale]==="string"&&p[key][locale].length>=16,p.slug+" "+key+" "+locale);
  }
 }
 const example=examples.find(x=>x.slug===p.slug);
 assert.equal(example.steps.length,5,p.slug+" work-step count");
 assert.ok(example.steps.every(s=>s.title.tr&&s.title.en&&s.hazard.tr&&s.hazard.en&&s.control.tr&&s.control.en),p.slug+" incomplete bilingual steps");
}
console.log("PASS: all 20 original loaders remain; 6 unique, fully localized method templates (numbers 21-26) appear in same library.");
console.log("PASS: new loader fills 13 editor fields, working steps, active-card feedback, analytics, scroll, and preserves authenticated PDF printing.");
console.log("LIMIT: source guard is not an interactive browser, print-layout, or actual permit/engineering approval test.");
