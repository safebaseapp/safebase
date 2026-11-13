// SERNEM Toolbox catalogue quality gate.
// Static coverage is automated; technical/medical/legal guidance still requires HSE review.
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataSource = await readFile(path.join(appRoot, "lib/toolbox/toolbox-data.ts"), "utf8");
const masterSource = await readFile(path.join(appRoot, "lib/toolbox/premium-master-slugs.ts"), "utf8");
const pdfRouter = await readFile(path.join(appRoot, "lib/toolbox/standard-pdf.ts"), "utf8");
const library = await readFile(path.join(appRoot, "app/[locale]/toolbox/ToolboxLibraryClient.tsx"), "utf8");
const renderer = await readFile(path.join(appRoot, "lib/pdf/premium-toolbox-pdf-v2.ts"), "utf8");
const errors = [];
const marker = "export const toolboxData = ";
const start = dataSource.indexOf(marker);
const end = dataSource.lastIndexOf(" as ToolboxRecord[];");
if (start < 0 || end < 0) throw new Error("Toolbox data marker missing");
const records = JSON.parse(dataSource.slice(start + marker.length, end).trim());
const match = masterSource.match(/premiumMasterSlugs\s*=\s*\[([\s\S]*?)\]\s*as const/);
if (!match) throw new Error("Premium master list not found");
const masters = [...match[1].matchAll(/"([^"]+)"/g)].map((hit) => hit[1]);
const names = new Set();
const titles = { tr: new Set(), en: new Set() };
const keyFields = ["title","objective","explanation","scenario","remember","hazards","controls","supervisor_script","questions","verification","fields","table_headers","footer"];
const listMinimums = { scenario: 2, hazards: 3, controls: 5, questions: 3, verification: 5 };
const isBlank = (value) => value == null || (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);
const toText = (value) => (Array.isArray(value) ? value.join(" ") : String(value ?? ""));
for (const record of records) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)) errors.push(`Invalid slug: ${record.slug}`);
  if (names.has(record.slug)) errors.push(`Duplicate slug: ${record.slug}`);
  names.add(record.slug);
  for (const locale of ["tr", "en"]) {
    const content = record[locale];
    if (!content || typeof content !== "object") { errors.push(`${record.slug}: ${locale} missing`); continue; }
    for (const field of keyFields) {
      if (isBlank(content[field])) errors.push(`${record.slug}/${locale}: empty ${field}`);
      if (["objective","remember","supervisor_script"].includes(field) && toText(content[field]).trim().length < 25)
        errors.push(`${record.slug}/${locale}: insufficient ${field}`);
    }
    for (const [field, minimum] of Object.entries(listMinimums)) {
      if (!Array.isArray(content[field]) || content[field].length < minimum)
        errors.push(`${record.slug}/${locale}: ${field} needs at least ${minimum} items`);
    }
    const key = toText(content.title).trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    if (titles[locale].has(key)) errors.push(`${record.slug}/${locale}: repeated title ${key}`);
    titles[locale].add(key);
    for (const field of ["scenario","hazards","controls","questions","verification"]) {
      if (!Array.isArray(content[field])) continue;
      const seen = new Set();
      for (const sentence of content[field]) {
        if (typeof sentence !== "string" || sentence.trim().length < 8)
          errors.push(`${record.slug}/${locale}: short/non-string ${field}`);
        const normalized = String(sentence).trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
        if (seen.has(normalized)) errors.push(`${record.slug}/${locale}: duplicate ${field}`);
        seen.add(normalized);
      }
    }
    if (/\b(?:TODO|TBD|PLACEHOLDER|Lorem ipsum)\b/i.test(JSON.stringify(content)))
      errors.push(`${record.slug}/${locale}: draft placeholder found`);
  }
}
if (records.length < 70) errors.push(`Catalogue unexpectedly shrank to ${records.length}`);
if (masters.length !== new Set(masters).size) errors.push("Duplicate premium master slug");
for (const slug of masters) {
  if (!names.has(slug)) errors.push(`Master PDF has no corresponding content: ${slug}`);
  for (const locale of ["tr","en"]) {
    for (const ending of [`-${locale}.pdf`, `-${locale}-branded-base.pdf`]) {
      const filename = path.join(appRoot,"public/downloads",`${slug}-toolbox-talk${ending}`);
      try { if (!(await stat(filename)).isFile()) errors.push(`Not a file: ${filename}`); }
      catch { errors.push(`Missing master PDF: ${filename}`); }
    }
  }
}
if (!/return `\/api\/toolbox\/\$\{slug\}\/pdf\?locale=\$\{locale\}`/.test(pdfRouter))
  errors.push("Dynamic standard PDF fallback missing for non-master content");
if (!library.includes("getAutoCategory(item.slug)"))
  errors.push("Base Toolbox categories must use the shared classification");
if (!/ILLUSTRATIVE SITE IMAGE/.test(renderer) || !/TEMSİLİ SAHA GÖRSELİ/.test(renderer))
  errors.push("Generic refinery photo must be identified as illustrative");
console.log(`Toolbox structural QA: ${records.length} bilingual topics; ${masters.length} static PDF masters; ${errors.length} issues`);
if (errors.length) {
  for (const issue of errors) console.error("FAIL:", issue);
  process.exit(1);
}
console.log("PASS: catalogue structure, locale coverage, master PDF paths and output routing.");
console.log("Note: human technical review and rendered PDF visual inspection are separate approval gates.");
