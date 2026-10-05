import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const downloadsDir = path.join(appRoot, "public", "downloads");
const slugSourcePath = path.join(
  appRoot,
  "lib",
  "toolbox",
  "premium-master-slugs.ts",
);

const EXPECTED_PAGE_COUNT = 4;
const MIN_BRANDED_BYTES = 20_000;

function parseMasterSlugs(source) {
  const match = source.match(/premiumMasterSlugs\s*=\s*\[([\s\S]*?)\]\s*as const/);

  if (!match) {
    throw new Error("Could not parse premiumMasterSlugs from premium-master-slugs.ts");
  }

  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]);
}

async function fileExists(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile();
  } catch {
    return false;
  }
}

async function inspectPdf(filePath) {
  const bytes = await readFile(filePath);
  const pdf = await PDFDocument.load(bytes, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  return {
    bytes: bytes.byteLength,
    pages: pdf.getPageCount(),
  };
}

const slugSource = await readFile(slugSourcePath, "utf8");
const slugs = parseMasterSlugs(slugSource);

const errors = [];
const warnings = [];
let brandedChecked = 0;
let standardPresenceChecked = 0;

for (const slug of slugs) {
  for (const locale of ["en", "tr"]) {
    const standardName = `${slug}-toolbox-talk-${locale}.pdf`;
    const brandedName = `${slug}-toolbox-talk-${locale}-branded-base.pdf`;
    const standardPath = path.join(downloadsDir, standardName);
    const brandedPath = path.join(downloadsDir, brandedName);

    if (!(await fileExists(standardPath))) {
      errors.push(`Missing standard PDF: ${standardName}`);
    } else {
      standardPresenceChecked += 1;
    }

    if (!(await fileExists(brandedPath))) {
      errors.push(`Missing branded-base PDF: ${brandedName}`);
      continue;
    }

    try {
      const result = await inspectPdf(brandedPath);
      brandedChecked += 1;

      if (result.pages !== EXPECTED_PAGE_COUNT) {
        errors.push(
          `Wrong page count: ${brandedName} has ${result.pages}, expected ${EXPECTED_PAGE_COUNT}`,
        );
      }

      if (result.bytes < MIN_BRANDED_BYTES) {
        warnings.push(
          `Suspiciously small branded-base PDF: ${brandedName} (${result.bytes} bytes)`,
        );
      }
    } catch (error) {
      errors.push(
        `Unreadable branded-base PDF: ${brandedName} (${error instanceof Error ? error.message : String(error)})`,
      );
    }
  }
}

const expectedLocaleFiles = slugs.length * 2;

console.log("\nSERNEM Toolbox PDF QA");
console.log("---------------------");
console.log(`Master slugs: ${slugs.length}`);
console.log(`Standard TR/EN files present: ${standardPresenceChecked}/${expectedLocaleFiles}`);
console.log(`Branded-base PDFs inspected: ${brandedChecked}/${expectedLocaleFiles}`);
console.log(`Required branded-base page count: ${EXPECTED_PAGE_COUNT}`);

if (warnings.length > 0) {
  console.warn(`\nWarnings (${warnings.length}):`);
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error(`\nFAILED (${errors.length} issue${errors.length === 1 ? "" : "s"}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("\nPASS: all 70 Toolbox topics have TR/EN standard files and 4-page branded-base PDFs.");
