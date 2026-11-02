// Structural and editorial guard for growth field forms; no external requests or user data.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) => readFileSync(new URL("../" + relative, import.meta.url), "utf8");
const growth = read("lib/content/growthFieldForms.ts");
const registry = read("lib/content/fieldForms.ts");
const sitemap = read("app/sitemap.ts");
const hub = read("app/[locale]/field-forms/page.tsx");
const detail = read("app/[locale]/field-forms/[slug]/page.tsx");
const knowledge = read("app/[locale]/knowledge-base/page.tsx");
const match = growth.match(/growthFieldForms: FieldForm\[\] = (\[[\s\S]*\]);\s*$/);
assert.ok(match, "Growth data must be a readable JSON-compatible typed array");
const forms = JSON.parse(match[1]);
assert.equal(forms.length, 7, "Expected seven new high-value worksheets");
const existing = [...registry.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
assert.equal(existing.length, 3, "Do not silently alter the three established worksheets");
assert.ok(registry.includes("...growthFieldForms"), "Growth forms must be registered in live forms");
const slugs = new Set(existing);
for (const f of forms) {
  assert.match(f.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(!slugs.has(f.slug), "Duplicate field form slug: " + f.slug);
  slugs.add(f.slug);
  for (const locale of ["tr", "en"]) {
    for (const key of ["title", "description", "summary", "example", "note"]) {
      assert.ok(typeof f[key]?.[locale] === "string" && f[key][locale].length > 30, f.slug + " missing " + locale + "." + key);
    }
    assert.ok(f.steps[locale].length >= 5, f.slug + " needs at least five practical steps for " + locale);
    for (const step of f.steps[locale]) assert.ok(step.length >= 25, f.slug + " vague step " + locale);
    for (const section of f.sections) {
      assert.ok(section.title[locale]?.length >= 5, f.slug + " missing section heading");
      assert.ok(section.fields.length >= 4, f.slug + " incomplete section");
      for (const field of section.fields) assert.ok(field.label[locale]?.length >= 6, f.slug + " missing field label");
    }
    assert.ok(f.table.columns.every(col=>col[locale]?.length>4), f.slug + " incomplete table " + locale);
    assert.ok(f.faq.length >= 2 && f.faq.every(x => x.question[locale]?.length >= 8 && x.answer[locale]?.length >= 25), f.slug + " incomplete FAQ");
  }
  assert.ok(f.references.length > 0 && f.references.every(r => /^https:\/\/(www\.)?(osha\.gov|hse\.gov\.uk)\//.test(r.url)), f.slug + " lacks trusted official reference");
  assert.ok(f.related.length >= 2 && f.related.every(r => r.path.startsWith("/")), f.slug + " missing related resources");
  assert.ok(f.table.rows >= 3 && f.table.rows <= 8, f.slug + " table row count");
}
assert.equal(slugs.size, 10, "Expected ten distinct worksheets in combined registry");
assert.ok(sitemap.includes('import { fieldForms }') && sitemap.includes('fieldForms.map((form)'), "Sitemap does not dynamically publish localized forms");
assert.ok(hub.includes('fieldForms.map(') && knowledge.includes('/field-forms'), "Form pages must be linked in public hubs");
assert.ok(detail.includes('generateStaticParams') && detail.includes('canonical: url') && detail.includes('locale === "tr" ? " | Ücretsiz'), "Localized metadata missing");
console.log("PASS: 7 new bilingual forms / 14 localized pages; 10 unique forms total; practical steps, editable fields, FAQs, official references, canonical/links/sitemap verified.");
console.log("LIMIT: source-level checks; interactive input, printed PDF layout, and search indexing must be tested separately.");
