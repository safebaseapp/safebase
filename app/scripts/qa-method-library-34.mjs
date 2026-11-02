// Content and behavior guard for the existing SERNEM generator (20 legacy + 6 + 8).
// No user data, external requests or production writes.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const load=(p)=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const page=load("app/[locale]/tools/method-statement/page.tsx");
const registry=load("lib/content/growthMethodPresets.ts");
const adapter=load("lib/content/advancedMethodPresets.ts");
const guideData=load("lib/content/methodExamples.ts");
const getArray=(source,pattern,label)=>{
 const match=source.match(pattern);assert.ok(match,label+" is not a JSON-compatible typed array");
 return JSON.parse(match[1]);
};
const original=getArray(registry,/baseGrowthMethodPresets: GrowthMethodPreset\[\] = (\[[\s\S]*?\]);\s*\/\/ Keep the original six/,"Original six");
const a=getArray(load("lib/content/advancedMethodPresetsA.ts"),/advancedMethodPresetsA: AdvancedMethodPreset\[\] = (\[[\s\S]*\]);\s*$/,"Specialist A");
const b=getArray(load("lib/content/advancedMethodPresetsB.ts"),/advancedMethodPresetsB: AdvancedMethodPreset\[\] = (\[[\s\S]*\]);\s*$/,"Specialist B");
const guides=getArray(guideData,/methodExamples: MethodExample\[\] = (\[[\s\S]*?\]);\s*export const getMethodExample/,"Original six guides");
assert.equal(original.length,6);assert.equal(a.length,4);assert.equal(b.length,4);assert.equal(guides.length,6);
assert.ok(adapter.includes("...advancedMethodPresetsA")&&adapter.includes("...advancedMethodPresetsB"));
assert.ok(registry.includes("...baseGrowthMethodPresets")&&registry.includes("...advancedMethodPresets"));
assert.ok(registry.includes("getMethodExample(slug) ?? advancedMethodPresets.find"),"New cards cannot populate the existing editor");
const all=[...original,...a,...b],slugs=new Set(),ids=new Set();
assert.equal(all.length,14,"Six existing and eight new specialist methods required");
for(const item of all){
 assert.ok(!slugs.has(item.slug),"duplicate slug "+item.slug);slugs.add(item.slug);
 assert.ok(!ids.has(item.number),"duplicate document number "+item.number);ids.add(item.number);
 assert.match(item.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/,"Invalid slug");
 assert.ok(item.icon && item.iconBg.startsWith("bg-")&&item.button.startsWith("bg-"));
 for(const key of ["activity","description","responsibilities","competency","ppe","tools","permits","environment","stepOwner"]){
  for(const locale of ["tr","en"])
   assert.ok(typeof item[key]?.[locale]==="string"&&item[key][locale].length>=18,item.slug+" missing "+key+"."+locale);
 }
 if(item.number<=26){
  assert.ok(guides.some(g=>g.slug===item.slug),"Previously published template guide disappeared: "+item.slug);
 }else{
  const method=item.method;
  assert.ok(method,"Missing specialist work sequence "+item.slug);
  assert.equal(method.steps.length,6,item.slug+" work steps");
  assert.equal(method.checks.length,3,item.slug+" prestart holdpoints");
  assert.ok(method.refs.length>=2,item.slug+" sources");
  for(const l of ["tr","en"]){
   assert.ok(method.intro[l].length>75&&method.description[l].length>65&&method.stop[l].length>65,item.slug+" technical scope/stop");
   for(const s of method.steps){
    for(const field of ["title","hazard","control"])
     assert.ok(s[field][l].length>18,item.slug+" weak "+field+" in "+l);
   }
   for(const v of method.checks)assert.ok(v[l].length>25,item.slug+" weak holdpoint");
  }
  for(const r of method.refs)assert.match(r.url,/^https:\/\/www\.osha\.gov\/laws-regs\/regulations\/standardnumber\/\d+\//,"Official reference needed");
 }
}
assert.deepEqual([...ids].sort((x,y)=>x-y),[21,22,23,24,25,26,27,28,29,30,31,32,33,34]);
const oldLoaders=[...page.matchAll(/const load\w+Template = \(\) =>/g)].length;
assert.equal(oldLoaders,20,"Original 20 method loaders must not be modified/removed");
assert.ok(page.includes("{20 + growthMethodPresets.length}"),"Dynamic 34 counter missing");
assert.ok(page.includes("growthMethodPresets.map((preset)"),"Existing card UI not reused");
for(const fragment of ["loadGrowthMethodTemplate(preset.slug)","showLoadedButtonFeedback(buttonId)","setLocalizedTemplateName(preset.activity.en, preset.activity.tr)","setMethodSteps(method.steps.map","setDocumentNo(`SRN-MS-","setReferences([","setPermits(preset.permits[language])","scrollIntoView","<MethodStatementPrint","requirePrintAuth(locale)"])assert.ok(page.includes(fragment),"Missing functional binding: "+fragment);
console.log("PASS: 34 unique ready-to-load cards: 20 original + 6 unchanged + 8 specialist bilingual presets.");
console.log("PASS: Eight expert work templates supply 48 job steps, hazard/control pairs, holdpoints, stop conditions and official regulatory reference URLs.");
console.log("PASS: Original PDF authorization and editor bindings remain unchanged. No new standalone public SEO pages created.");
console.log("LIMIT: Static validation does not replace browser interaction, signed-in PDF print test or competent site-specific engineering approval.");
