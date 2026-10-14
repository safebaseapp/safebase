// SERNEM static TR/EN integrity checks. This catches missing or broken content,
// not semantic translation quality; technical review remains required.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (p) => fs.readFileSync(path.join(root, p), "utf8");
const errors = [];
const check = (condition, description) => { if (!condition) errors.push(description); };
const forbidden = [/İSPAN/i, /AMUÇ/i, /alet kutusu konuşması/i, /Housekeeping Kritik Güvenlik Kuralları/i, /Spoil Pile Mesafesini Koru/i, /Bu Method Statement;/];
const badText = (text, file) => {
  check(!text.includes("\uFFFD"), `${file}: Unicode replacement character detected`);
  for (const pattern of forbidden) check(!pattern.test(text), `${file}: suspect literal ${pattern}`);
};

const toolboxText = load("lib/toolbox/toolbox-data.ts");
const match = toolboxText.match(/export const toolboxData = ([\s\S]*?)\s+as ToolboxRecord\[\];/);
check(Boolean(match), "Toolbox JSON data declaration not found");
let toolbox = [];
if (match) {
  try { toolbox = JSON.parse(match[1]); }
  catch (e) { errors.push("Toolbox data JSON could not be parsed: " + e.message); }
}
check(toolbox.length >= 70, `Toolbox item count regressed: ${toolbox.length}`);
const ids = new Set();
for (const item of toolbox) {
  check(!ids.has(item.slug), `Duplicate toolbox slug: ${item.slug}`);
  ids.add(item.slug);
  for (const locale of ["tr", "en"]) {
    check(Boolean(item[locale]?.title?.trim()), `${item.slug}: missing ${locale} title`);
    check(Boolean(item[locale]?.objective_title?.trim()), `${item.slug}: missing ${locale} objective heading`);
    check(Boolean(item[locale]?.controls_title?.trim()), `${item.slug}: missing ${locale} controls heading`);
    badText(JSON.stringify(item[locale] ?? {}), `toolbox ${item.slug} (${locale})`);
  }
}

function flattenKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k,v]) => v && typeof v === "object" && !Array.isArray(v)
    ? flattenKeys(v, prefix + k + ".") : [prefix + k]);
}
const trMessages = flattenKeys(JSON.parse(load("messages/tr.json")));
const enMessages = flattenKeys(JSON.parse(load("messages/en.json")));
check(trMessages.length === enMessages.length &&
  trMessages.every(key => enMessages.includes(key)), "Central TR/EN message keys do not match");

const sections = ["scaffold", "work-at-height", "hot-work", "loto", "confined-space", "lifting"];
for (const sec of sections) {
  const file = `app/[locale]/checklists/${sec}/labels.ts`;
  const src = load(file);
  const divider = src.indexOf("\n  tr: {");
  const english = src.slice(0, divider);
  const turkish = src.slice(divider);
  const keys = txt => [...txt.matchAll(/^    ([A-Za-z][\w]*):\s*/gm)].map(x => x[1]);
  const en = keys(english), tr = keys(turkish);
  check(divider > 0 && en.length > 0 && en.length === tr.length &&
    en.every(key => tr.includes(key)), `Checklist label mismatch: ${sec}`);
  badText(src, file);
  const data = load(`app/[locale]/checklists/${sec}/checklistData.ts`);
  if (sec === "hot-work") {
    check(data.includes('createChecklistItems("en")') &&
      data.includes('createChecklistItems("tr")'), "Hot work locale factory mismatch");
  } else {
    const trStart = data.indexOf("\n  tr: [");
    const itemIds = part => [...part.matchAll(/^\s+id:\s*["']([^"']+)["']/gm)].map(m => m[1]);
    const enIds = itemIds(data.slice(0, trStart));
    const trIds = itemIds(data.slice(trStart));
    check(trStart > 0 && enIds.length > 0 && enIds.length === trIds.length &&
      enIds.every((id, i) => id === trIds[i]), `Checklist item ID mismatch: ${sec}`);
  }
}

const posterFiles = [
  "chemical-safety", "confined-space", "dropped-objects-safety", "electrical",
  "excavation-safety", "fire", "forklift-safety", "hot-work", "housekeeping-safety",
  "ladder-safety", "loto", "manual-handling-safety", "ppe", "scaffold", "working-at-height"
];
for (const name of posterFiles) {
  const file = `lib/posters-v2/${name}.ts`;
  const src = load(file);
  const count = lang => [...src.matchAll(new RegExp(`\\b${lang}:\\s*"`, "g"))].length;
  check(count("tr") >= 9 && count("tr") === count("en"), `Poster locale pairing mismatch: ${name}`);
  badText(src, file);
}

const signs = load("lib/safety-signs/data.ts");
const countSign = lang => [...signs.matchAll(new RegExp(`\\b${lang}:\\s*"`, "g"))].length;
check(countSign("tr") === countSign("en"), "Safety signs locale pairing mismatch");
badText(signs, "lib/safety-signs/data.ts");
const method = load("app/[locale]/tools/method-statement/page.tsx");
badText(method, "Method Statement templates");

if (errors.length) {
  for (const error of errors) console.error("FAIL", error);
  console.error(`SERNEM i18n integrity check failed: ${errors.length} finding(s)`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${toolbox.length} toolbox topics, ${sections.length} inspection libraries, ${posterFiles.length} posters, safety signs, TR/EN messages, method templates.`);
  console.log("Note: textual parity is not proof of technical accuracy or rendered PDF quality.");
}
