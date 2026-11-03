// Source-level release gate for 12 original bilingual industrial HSE guides.
// No network calls, external data, credentials or live database writes.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const sourcePrefix = "app/[locale]/knowledge-base/data/guides/";
const sourceA = read(sourcePrefix + "specialist-industrial.ts");
const sourceB = read(sourcePrefix + "specialist-process.ts");
const sourceAll = read(sourcePrefix + "all-guides.ts");
const sourceHub = read("app/[locale]/knowledge-base/page.tsx");
const sourceClient = read("app/[locale]/knowledge-base/components/GuideDirectoryClient.tsx");
const sourceDetail = read("app/[locale]/knowledge-base/[slug]/page.tsx");
const sitemap = read("app/sitemap.ts");
const registry = read(sourcePrefix + "specialist-guides.ts");
const links = read(sourcePrefix + "specialist-related.ts");
const a = sourceA.match(/const editorial: Editorial\[\] = (\[[\s\S]*?\]);\s*const byPreset/);
const b = sourceB.match(/const raw = (\[[\s\S]*?\]);\s*const toStringList/);
const l = links.match(/const titles: Record<string, \{en:string;tr:string\}> = (\{[\s\S]*?\});\s*export function/);
assert.ok(a && b && l, "Source catalogs must remain independently QA-parseable");
const specialistA = JSON.parse(a[1]), specialistB = JSON.parse(b[1]), linked = JSON.parse(l[1]);
assert.equal(specialistA.length, 8, "Missing industrial specialist guide");
assert.equal(specialistB.length, 4, "Missing process safety guide");
const combined = [...specialistA,...specialistB];
const slugs = new Set();
const current = new Set();
const root = new URL("../" + sourcePrefix, import.meta.url);
for (const f of readdirSync(root)) {
  if (!f.endsWith(".ts") || /specialist|all-guides|index|guide-context|guide-search/.test(f)) continue;
  const t = read(sourcePrefix + f);
  for (const m of t.matchAll(/\bslug:\s*"([^"]+)"/g)) current.add(m[1]);
}
for (const f of readdirSync(new URL("../" + sourcePrefix + "generated/", import.meta.url))) {
  if (f === "factory.ts" || f === "index.ts" || !f.endsWith(".ts")) continue;
  const t = read(sourcePrefix + "generated/" + f);
  for (const m of t.matchAll(/\bslug:\s*"([^"]+)"/g)) current.add(m[1]);
}
assert.equal(current.size, 100, "Core/generated 100-guide baseline differs");
for (const x of combined) {
  assert.match(x.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(!slugs.has(x.slug),"Duplicated specialist slug: "+x.slug);
  assert.ok(!current.has(x.slug),"Reused existing guide slug: "+x.slug);
  slugs.add(x.slug);
  for (const key of ["title","category","overview"]) {
    for (const lang of ["en","tr"]) {
      const v = x[key][lang];
      assert.ok(typeof v==="string"&&v.length>(key==="overview"?200:15),x.slug+": missing "+key+" "+lang);
    }
  }
  assert.ok(x.references.length>=2,"Missing citations: "+x.slug);
  assert.ok(x.references.some(ref=>ref.startsWith("OSHA ")),x.slug+": no primary OSHA reference");
  for(const ref of x.references){
    assert.match(ref,/^(OSHA \d{4}\.\d+|HSE [A-Za-z ]+)$/,x.slug+": non-official reference");
  }
  assert.ok(x.related.length>=3,x.slug+": no crosslinks");
  for(const name of x.related) {
    assert.ok(linked[name],"No bilingual title for link: "+name);
    assert.ok(current.has(name)||slugs.has(name)||combined.some(z=>z.slug===name),
      "Broken related link slug: "+name);
  }
}
const methodA = JSON.parse(read("lib/content/advancedMethodPresetsA.ts").match(/advancedMethodPresetsA: AdvancedMethodPreset\[\] = (\[[\s\S]*\]);\s*$/)[1]);
const methodB = JSON.parse(read("lib/content/advancedMethodPresetsB.ts").match(/advancedMethodPresetsB: AdvancedMethodPreset\[\] = (\[[\s\S]*\]);\s*$/)[1]);
const methods = new Map([...methodA,...methodB].map(x=>[x.slug,x]));
for (const g of specialistA) {
  const preset = methods.get(g.preset);
  assert.ok(preset,"Missing integrated Method Statement source "+g.slug);
  assert.equal(preset.method.steps.length,6,g.slug+": incomplete work method");
  assert.equal(preset.method.checks.length,3,g.slug+": missing pre-start checks");
  for (const lang of ["en","tr"]){
    assert.equal(g.mistakes[lang].length,3,g.slug+": duplicate/missing mistakes");
    assert.equal(g.extraControls[lang].length,2,g.slug+": insufficient specific safeguards");
  }
  assert.ok(g.keywords.en.length===3&&g.keywords.tr.length===3&&g.keywords.en.every(x=>x.length>=8)&&g.keywords.tr.every(x=>x.length>=8),g.slug+": weak search-keyword coverage");
}
for(const x of specialistB) {
  assert.equal(x.hazards.length,6,x.slug+" hazard list");
  assert.equal(x.controls.length,7,x.slug+" controls");
  assert.equal(x.mistakes.length,4,x.slug+" common mistakes");
  assert.equal(x.checks.length,5,x.slug+" pre-start holdpoints");
  assert.ok(x.stop.en.length>75&&x.stop.tr.length>75,x.slug+" stop work content");
  for (const field of ["hazards","controls","mistakes","checks"]) {
    for(const item of x[field]) assert.ok(item.en.length>35&&item.tr.length>35,x.slug+" weak bilingual "+field);
  }
}
assert.equal(current.size+slugs.size,112);
assert.ok(sourceAll.includes("...specialistGuides")&&sourceAll.includes("allGuides.length !== 112"),"Total guide catalog not expanded");
assert.ok(sourceDetail.includes("[...generatedGuides, ...specialistGuides]"),"New TR/EN static routes missing");
// All new topics must be inside the ORIGINAL filterable 112-card directory,
// not repeated as a second 12-card block with the generic fallback photo.
assert.ok(sourceHub.includes("const guides = allGuides.map((guide)")&&sourceHub.includes("allGuides.length"),"Unified guide data source missing");
assert.ok(sourceHub.includes("isSpecialist: specialistSlugs.has(guide.slug)"),"New guide markers not included within unified source");
assert.ok(!sourceHub.includes('specialist-guides-heading')&&!sourceHub.includes("specialistGuides.map((guide) => (\n"),"Detached specialist block must not return");
assert.ok(sourceClient.includes("filtered.map((guide)"),"Guide cards no longer use search and category filters");
assert.ok(sourceClient.includes("getGuideCardVisual(guide.slug, guide.category, guide.title)"),"Unified cards not using topic-specific visuals");
assert.ok(sourceClient.includes("guide.isSpecialist") && sourceClient.includes('isTurkish ? "Yeni" : "New"'),"New guides not labeled inside original cards");
const visualSource = read("lib/visual/content-card-visuals.ts");
const photoMap = visualSource.match(/const specialistGuideVisualKeys: Record<string, VisualKey> = \{([\s\S]*?)\};/);
assert.ok(photoMap,"Explicit specialist cover photo map missing");
const imageAssignments = [...photoMap[1].matchAll(/"([^"]+)": "([^"]+)"/g)];
assert.equal(imageAssignments.length,12,"Exactly twelve specialist cover assignments required");
assert.equal(new Set(imageAssignments.map(x=>x[1])).size,12,"Duplicate image keys for the specialist guide map");
assert.equal(new Set(imageAssignments.map(x=>x[2])).size,12,"Specialist guide covers should not repeat images");
for(const [_,slug,key] of imageAssignments) {
  assert.ok(slugs.has(slug),"Photo assigned to non-specialist guide: "+slug);
  assert.ok(visualSource.includes(key+": { key:"),"Photo key does not exist in verified gallery: "+key);
}
assert.ok(visualSource.includes('const specialist = specialistGuideVisualKeys[slug]')&&
  visualSource.includes('if (specialist) return VISUALS[specialist]'),"Cover selection not slug-specific");
console.log("PASS: all twelve specialist guides are inside the searchable/filtered 112-card grid, with 12 varied cover images.");

assert.ok(sourceClient.includes("{guides.length} HSE Guides")&&sourceClient.includes("${guides.length} Profesyonel İSG"),"Hero guide counter stale");
assert.ok(sitemap.includes("allGuides.map((guide)")&&sitemap.includes("/knowledge-base/${guide.slug}"),"Sitemap guide expansion missing");
assert.ok(registry.includes("...specialistIndustrialGuides")&&registry.includes("...specialistProcessGuides"),"Specialist registry missing");
console.log("PASS: baseline 100 guides preserved, 12 original specialist topics appended (112 total, 224 TR/EN detail URLs).");
console.log("PASS: all 12 bilingual entries have content depth, official references, correct related links and valid static metadata/sitemap.");
console.log("PASS: 8 specialist articles track six-step verified methods; 4 process-safety guides add unique hazards, safeguards and holdpoints.");
console.log("LIMIT: Static checks do not prove Google indexing or physical onsite applicability.");
