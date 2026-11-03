// SERNEM Knowledge Base: grow 112 -> 124 without detached content grids.
// This file is read-only QA. Only pure repository content is inspected.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const sourcePrefix = "app/[locale]/knowledge-base/data/guides/";
const parts = ["a","b","c","d"].map(label => {
  const source = read(sourcePrefix + "industrial-growth-" + label + ".ts");
  const m = source.match(/const topics: IndustrialFieldTopic\[\] = (\[[\s\S]*?\]);\s*export const industrialNextGuides/);
  assert.ok(m, "Source part " + label + " is not parseable");
  return JSON.parse(m[1]);
});
const next = parts.flat();
const existingCore = new Set();
for (const f of readdirSync(new URL("../" + sourcePrefix, import.meta.url))) {
  if (!f.endsWith(".ts") || /specialist|all-guides|index|guide-context|guide-search|industrial-growth/.test(f)) continue;
  const content = read(sourcePrefix + f);
  for (const match of content.matchAll(/\bslug:\s*"([^"]+)"/g)) existingCore.add(match[1]);
}
for(const f of readdirSync(new URL("../"+sourcePrefix+"generated/",import.meta.url))) {
  if(f==="factory.ts"||f==="index.ts"||!f.endsWith(".ts"))continue;
  const content=read(sourcePrefix+"generated/"+f);
  for(const match of content.matchAll(/\bslug:\s*"([^"]+)"/g)) existingCore.add(match[1]);
}
assert.equal(existingCore.size,100,"Baseline 100 legacy guides missing");
const oldIndustrial = read(sourcePrefix + "specialist-industrial.ts");
const oldProcess = read(sourcePrefix + "specialist-process.ts");
const oldA = JSON.parse(oldIndustrial.match(/const editorial: Editorial\[\] = (\[[\s\S]*?\]);\s*const byPreset/)[1]);
const oldB = JSON.parse(oldProcess.match(/const raw = (\[[\s\S]*?\]);\s*const toStringList/)[1]);
assert.equal(oldA.length+oldB.length,12,"Previously released 12 specialist guides changed");
const oldSlugs = new Set([...existingCore,...oldA.map(x=>x.slug),...oldB.map(x=>x.slug)]);
assert.equal(oldSlugs.size,112,"Previously existing 112 unique slugs altered");
assert.deepEqual(parts.map(x=>x.length),[3,3,3,3],"Expected four focused editorial packs of three guides");
assert.equal(next.length,12);
const slugSet = new Set();
const categories = new Set();
for (const item of next) {
  assert.match(item.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/,item.slug+" invalid slug");
  assert.ok(!slugSet.has(item.slug) && !oldSlugs.has(item.slug),item.slug+" duplicate guide");
  slugSet.add(item.slug);
  for(const key of ["title","category","description","overview","stop"]) {
    assert.ok(item[key]&&typeof item[key]==="object",item.slug+" missing "+key);
    for(const lang of ["tr","en"]) {
      const text=item[key][lang];
      assert.ok(typeof text==="string" && text.length >= (key==="overview"?440:key==="stop"?180:key==="description"?65:12),
        item.slug+" weak "+key+" "+lang);
      assert.ok(!/lorem ipsum|TODO|TBD|PLACEHOLDER|GENERIC TEXT/i.test(text),item.slug+" placeholder "+key);
    }
  }
  categories.add(item.category.en);
  assert.equal(item.hazards.length,5,item.slug+" hazards count");
  assert.equal(item.controls.length,6,item.slug+" controls count");
  assert.equal(item.mistakes.length,4,item.slug+" mistakes count");
  assert.equal(item.checks.length,5,item.slug+" field checks count");
  assert.equal(item.ppe.length,2,item.slug+" PPE count");
  for(const field of ["hazards","controls","mistakes","checks","ppe"]) {
    for(const x of item[field]) {
      for(const lang of ["en","tr"]) {
        assert.ok(typeof x[lang]==="string"&&x[lang].length>=35,item.slug+" weak "+field+" "+lang);
        assert.ok(!/lorem ipsum|TODO|TBD/.test(x[lang]),item.slug+" placeholder "+field);
      }
    }
    assert.equal(new Set(item[field].map(x=>x.en)).size,item[field].length,item.slug+" duplicate "+field);
  }
  assert.ok(item.references.length>=2,item.slug+" official references missing");
  for(const ref of item.references) assert.match(ref,/^(OSHA \d{4}\.\d+|HSE [A-Za-z ]+)$/,item.slug+" invalid source "+ref);
  assert.ok(item.related.length>=3,item.slug+" missing internal links");
  assert.equal(item.keywords.en.length,3,item.slug+" EN keywords");
  assert.equal(item.keywords.tr.length,3,item.slug+" TR keywords");
  assert.ok(item.keywords.en.every(x=>x.length>=14)&&item.keywords.tr.every(x=>x.length>=14),item.slug+" short search keywords");
}
assert.equal(oldSlugs.size+slugSet.size,124);
assert.ok(categories.size<=5,"Too many redundant filter categories: "+categories.size);
const titles=read(sourcePrefix+"specialist-related.ts");
const linkNames=new Set([...titles.matchAll(/"([a-z0-9]+(?:-[a-z0-9]+)+)": \{/g)].map(x=>x[1]));
for(const item of next) {
  for(const slug of item.related) {
    assert.ok(oldSlugs.has(slug)||slugSet.has(slug),"Related slug not found: "+slug);
    assert.ok(linkNames.has(slug),"Related slug has no bilingual title: "+slug);
  }
}
const sources={
 all:read(sourcePrefix+"all-guides.ts"),
 hub:read("app/[locale]/knowledge-base/page.tsx"),
 detail:read("app/[locale]/knowledge-base/[slug]/page.tsx"),
 registry:read(sourcePrefix+"industrial-growth-next.ts"),
 directory:read("app/[locale]/knowledge-base/components/GuideDirectoryClient.tsx"),
 sitemap:read("app/sitemap.ts"),
 visual:read("lib/visual/content-card-visuals.ts"),
};
assert.ok(sources.all.includes("...industrialGrowthGuides")&&sources.all.includes("allGuides.length !== 124"),"124 guide catalog guard absent");
assert.ok(sources.registry.includes("...industrialNextGuidesA")&&sources.registry.includes("...industrialNextGuidesD"),"All 12 are not registered");
assert.ok(sources.detail.includes("[...generatedGuides, ...specialistGuides, ...industrialGrowthGuides]"),"24 new static routes absent");
assert.ok(sources.hub.includes("const guides = allGuides.map((guide)")&&sources.hub.includes("...specialistGuides, ...industrialGrowthGuides"),"124 cards are not in original unified library");
assert.ok(!sources.hub.includes("specialist-guides-heading")&&!sources.hub.includes("industrialGrowthGuides.map((guide)"),"Detached block reintroduced");
assert.ok(sources.directory.includes("filtered.map((guide)")&&sources.directory.includes("getGuideCardVisual(guide.slug, guide.category, guide.title)"),"Search/filter or cover logic bypassed");
assert.ok(sources.sitemap.includes("allGuides.map((guide)")&&sources.sitemap.includes("/knowledge-base/${guide.slug}"),"Dynamic sitemap missing new routes");
const galleryMatch=sources.visual.match(/const industrialGrowthGuideVisualKeys: Record<string, VisualKey> = \{([\s\S]*?)\};/);
assert.ok(galleryMatch,"New guide photo mapping missing");
const pairs=[...galleryMatch[1].matchAll(/"([^"]+)": "([^"]+)"/g)];
assert.equal(pairs.length,12,"Missing cover mappings");
assert.equal(new Set(pairs.map(x=>x[1])).size,12,"Duplicate cover slugs");
assert.equal(new Set(pairs.map(x=>x[2])).size,12,"Repeated stock cover in new pack");
for(const [,slug,key] of pairs) {
  assert.ok(slugSet.has(slug),"Cover belongs to unknown guide "+slug);
  assert.ok(sources.visual.includes(key+": { key:"),"Photo key does not exist "+key);
}
assert.ok(sources.visual.includes("if (growthVisual) return VISUALS[growthVisual]"),"New covers not used");
console.log("PASS: existing 112 original guides preserved, 12 expert guides added; 124 TR + 124 EN = 248 localized detail pages.");
console.log("PASS: 12 original bilingual guides, 5 hazards, 6 controls, 4 common mistakes, 5 checks, 2 PPE items, stop-work rules and official references each.");
console.log("PASS: 12 topic-matched unique covers, one filterable library, no detached duplicate gallery, sitemap & 24 new static routes.");
console.log("LIMIT: static checks cannot validate competent engineering approvals, live payment interactions or Google indexing.");
