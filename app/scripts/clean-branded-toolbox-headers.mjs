import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const downloadsDir = path.resolve(__dirname, "../public/downloads");

const WHITE = rgb(1, 1, 1);
const PALE_SLATE = rgb(0.945, 0.961, 0.976);
const SLATE = rgb(0.278, 0.333, 0.412);

function isToolboxPdf(name) {
  return /-toolbox-talk-(tr|en)(-branded-base)?\.pdf$/i.test(name);
}

function isBrandedBase(name) {
  return name.endsWith("-branded-base.pdf");
}

async function cleanToolboxPdf(filePath, fileName) {
  const source = await readFile(filePath);
  const pdf = await PDFDocument.load(source);
  const pages = pdf.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();

    if (isBrandedBase(fileName)) {
      // Company-branded master: keep the reserved logo area and title, but
      // remove document-control metadata from the top-right corner.
      page.drawRectangle({
        x: width - 205,
        y: height - 68,
        width: 190,
        height: 58,
        color: WHITE,
        borderWidth: 0,
      });
    }

    // All premium masters: remove repeated document no / revision from the
    // footer so the title can never collide with document-control text.
    page.drawRectangle({
      x: width / 2 - 90,
      y: 12,
      width: 190,
      height: 22,
      color: WHITE,
      borderWidth: 0,
    });
  }

  // Known EN language leak in Mobile Equipment page 2. Correct it at build
  // time without touching the rest of the four-page master layout.
  if (fileName === "mobile-equipment-safety-toolbox-talk-en.pdf" && pages[1]) {
    const page = pages[1];
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);

    page.drawRectangle({
      x: 319,
      y: 541,
      width: 145,
      height: 13,
      color: PALE_SLATE,
      borderWidth: 0,
    });

    page.drawText("MANUFACTURER INSTRUCTIONS", {
      x: 320,
      y: 545,
      size: 6.1,
      font,
      color: SLATE,
    });
  }

  const cleaned = await pdf.save();
  await writeFile(filePath, cleaned);
}

async function main() {
  const entries = await readdir(downloadsDir, { withFileTypes: true });
  const toolboxFiles = entries
    .filter((entry) => entry.isFile() && isToolboxPdf(entry.name))
    .map((entry) => entry.name)
    .sort();

  if (toolboxFiles.length === 0) {
    console.log("[toolbox-pdf] No toolbox PDFs found; nothing to clean.");
    return;
  }

  let brandedCount = 0;

  for (const fileName of toolboxFiles) {
    if (isBrandedBase(fileName)) brandedCount += 1;
    await cleanToolboxPdf(path.join(downloadsDir, fileName), fileName);
  }

  console.log(
    `[toolbox-pdf] Cleaned footer metadata in ${toolboxFiles.length} PDFs; cleaned header metadata in ${brandedCount} branded masters.`,
  );
}

main().catch((error) => {
  console.error("[toolbox-pdf] Toolbox PDF cleanup failed:", error);
  process.exitCode = 1;
});
