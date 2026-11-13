// End-to-end document-render smoke test for the 30 editorial Toolbox talks.
// Uses the existing PDF generator without opening or bypassing any HTTP download path.
// Permissions are tested separately via authenticated browser/API flows.
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(appRoot);
const require = createRequire(import.meta.url);
const previousResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) {
    request = path.join(appRoot, request.slice(2));
  }
  return previousResolve.call(this, request, ...rest);
};
require.extensions[".ts"] = (module, filename) => {
  const original = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(original, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
    fileName: filename,
  }).outputText;
  module._compile(compiled, filename);
};

const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");
const { toolboxData } = require(path.join(appRoot, "lib/toolbox/toolbox-data.ts"));
const { generatePremiumToolboxPdf } = require(path.join(appRoot, "lib/pdf/premium-toolbox-pdf-v2.ts"));

const newRecords = toolboxData.filter(
  (record) => record.sourceFile?.startsWith("editorial_20261113_"),
);
if (newRecords.length !== 30) {
  throw new Error("Expected 30 new bilingual Toolbox topics; found " + newRecords.length);
}
const logoPath = path.join(appRoot, "public", "brand", "sernem-logo.svg");
const logoBytes = await sharp(await fsp.readFile(logoPath)).png().toBuffer();
const samples = new Set([
  "hot-work-near-fuel-systems",
  "first-energisation-commissioning",
  "silica-dust-concrete-cutting",
  "eyewash-emergency-shower-readiness",
]);
const sampleDir = path.join(appRoot, "toolbox-pdf-qa-samples");
await fsp.mkdir(sampleDir, { recursive: true });

let checked = 0;
for (const record of newRecords) {
  for (const locale of ["tr", "en"]) {
    let bytes;
    try {
      bytes = await generatePremiumToolboxPdf({
        slug: record.slug,
        locale,
        logoBytes,
        logoMime: "image/png",
        documentProfile: { revision: "00" },
      });
    } catch (error) {
      throw new Error(
        "PDF generator failed for " + record.slug + "/" + locale + ": " +
        (error instanceof Error ? error.message : String(error)),
      );
    }
    const pdf = await PDFDocument.load(bytes);
    if (pdf.getPageCount() !== 4) {
      throw new Error(
        "Expected 4 pages for " + record.slug + "/" + locale +
        ", got " + pdf.getPageCount(),
      );
    }
    for (const [index, page] of pdf.getPages().entries()) {
      const { width, height } = page.getSize();
      if (Math.abs(width - 794) > 0.1 || Math.abs(height - 1123) > 0.1) {
        throw new Error(
          "Invalid PDF page dimensions: " + record.slug + "/" + locale +
          " page " + (index + 1),
        );
      }
    }
    if (samples.has(record.slug)) {
      const filename = record.slug + "-" + locale + ".pdf";
      await fsp.writeFile(path.join(sampleDir, filename), bytes);
    }
    checked += 1;
    console.log("OK " + checked + "/60: " + record.slug + "/" + locale);
  }
}
console.log("PASS: rendered " + checked + " dynamically generated bilingual PDFs, all four-page 794x1123 documents.");
console.log("LIMIT: This test does not prove page legibility, user auth, Premium access, or technical approval.");
