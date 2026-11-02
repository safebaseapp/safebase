// Read-only integrity check: every published QR asset must match its audited checksum
// and point to that sign's canonical TR/EN detail page. No network or user data.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const report = JSON.parse(await readFile(resolve(root,"docs/safety-signs-pack/evidence/qr-assets.json"),"utf8"));
assert.equal(report.results.length,72,"expected 36 existing signs x two locales");
const seen = new Set(), languageSlugs = { tr:new Set(), en:new Set() };
for (const row of report.results) {
  assert.ok(row.locale==="tr" || row.locale==="en","unknown locale");
  assert.match(row.slug,/^[a-z0-9-]+$/,"unsafe slug");
  const key = row.locale + "/" + row.slug;
  assert.ok(!seen.has(key),"duplicate QR " + key);
  seen.add(key);
  languageSlugs[row.locale].add(row.slug);
  assert.equal(row.target,`https://www.sernem.com/${row.locale}/safety-signs/${row.slug}`,"QR target mismatch: " + key);
  assert.equal(row.result,"PASS","historical QA report is not PASS: " + key);
  const file = resolve(root,"app/public/safety-signs/qr",row.locale,row.slug+".png");
  const bytes = await readFile(file);
  assert.equal(bytes.subarray(0,8).toString("hex"),"89504e470d0a1a0a","not a PNG: " + key);
  assert.ok(bytes.readUInt32BE(16) >= 256 && bytes.readUInt32BE(20) >= 256,"QR image too small: "+key);
  assert.equal(createHash("sha256").update(bytes).digest("hex"),row.sha256,"QR checksum mismatch: " + key);
}
assert.equal(languageSlugs.tr.size,36);
assert.equal(languageSlugs.en.size,36);
assert.deepEqual([...languageSlugs.tr].sort(),[...languageSlugs.en].sort(),"TR/EN sign catalogs differ");
console.log("PASS: 72 unique QR PNGs, SHA256 evidence, safe slugs, canonical TR/EN destinations and equal catalogs");
console.log("NOTE: checksum evidence is not a substitute for live camera scan or testing destination HTTP responses.");
