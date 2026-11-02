// Read-only source integrity checks for bilingual task-specific method examples.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read=(p)=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const data=read("lib/content/methodExamples.ts"),hub=read("app/[locale]/method-statements/page.tsx"),
 detail=read("app/[locale]/method-statements/[slug]/page.tsx"),
 sitemap=read("app/sitemap.ts"),tools=read("app/[locale]/tools/page.tsx");
const matched=data.match(/export const methodExamples: MethodExample\[\] = (\[[\s\S]*\]);\s*export const getMethodExample/);
assert.ok(matched,"Missing parseable MethodExample array");
const examples=JSON.parse(matched[1]);
assert.equal(examples.length,6,"Expected 6 new distinct method examples");
const slugs=new Set();
for(const x of examples){
 assert.match(x.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
 assert.ok(!slugs.has(x.slug),"Duplicate slug: "+x.slug);
 slugs.add(x.slug);
 assert.equal(x.steps.length,5,x.slug+": work sequence length");
 assert.equal(x.checks.length,3,x.slug+": pre-start checks");
 assert.ok(x.refs.length>=1 && x.faq.length>=2 && x.related.length>=2,x.slug+": references, FAQ, links");
 for(const locale of ["tr","en"]){
  for(const key of ["title","description","intro","stop","category"])
   assert.ok(typeof x[key][locale]==="string"&&x[key][locale].length>=10,x.slug+" missing "+key+" "+locale);
  for(const s of x.steps)for(const key of ["title","hazard","control"])
   assert.ok(s[key][locale].length>=12,x.slug+" insufficient "+key+" "+locale);
  for(const item of x.faq)assert.ok(item.q[locale].length>=10&&item.a[locale].length>=20,"Short FAQ");
  for(const item of x.related)assert.ok(item.url.startsWith("/")&&item.title[locale].length>5,"Invalid internal link");
 }
 for(const s of x.refs)assert.match(s.url,/^https:\/\/(www\.)?(hse\.gov\.uk|osha\.gov)\//,"Unreviewed authority domain");
}
assert.ok(hub.includes("methodExamples.map(")&&hub.includes("/tools/method-statement"),"Public hub needs linked detail cards and generator");
assert.ok(detail.includes("generateStaticParams")&&detail.includes("getMethodExample")&&detail.includes("canonical")&&detail.includes("TechArticle"),"Technical metadata missing");
assert.ok(detail.includes("stop-work")||detail.includes("Stop-work"),"Stop criteria missing");
assert.ok(sitemap.includes("/method-statements")&&sitemap.includes("methodExamples.map("),"Bilingual sitemap missing");
assert.ok(tools.includes('/method-statements'),"HSE tools hub discovery link missing");
console.log("PASS: 6 task-specific method examples / 12 translated detail URLs + 2 hubs; correct structures, hazard controls, stop points, FAQ, official source domains, sitemap and internal links.");
console.log("LIMIT: This does not verify live crawling, print output, permit suitability, engineering details or current indexing.");
