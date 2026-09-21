import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const downloadsDir = path.resolve(__dirname, "../public/downloads");
const remaining26Path = path.resolve(__dirname, "premium-toolbox-remaining-26.json");

const WHITE = rgb(1, 1, 1);
const NAVY = rgb(11 / 255, 27 / 255, 51 / 255);
const PALE_BLUE = rgb(239 / 255, 246 / 255, 255 / 255);
const SLATE = rgb(71 / 255, 85 / 255, 105 / 255);

function getPdfInfo(fileName) {
  const match = fileName.match(
    /^(.*)-toolbox-talk-(tr|en)(-branded-base)?\.pdf$/,
  );

  if (!match) return null;

  return {
    slug: match[1],
    locale: match[2],
    branded: Boolean(match[3]),
  };
}

function coverRepeatedFooter(page) {
  const { width } = page.getSize();

  // Remove the repeated document number / revision from the centre of the
  // footer. The left SERNEM label and the page number remain untouched.
  page.drawRectangle({
    x: width / 2 - 105,
    y: 12,
    width: 210,
    height: 21,
    color: WHITE,
    borderWidth: 0,
  });
}

function cleanBrandedHeader(page) {
  const { width, height } = page.getSize();

  // Branded masters reserve the left side for the company logo. Remove the
  // document-control table from the right without touching the title/logo.
  page.drawRectangle({
    x: width - 205,
    y: height - 68,
    width: 190,
    height: 58,
    color: WHITE,
    borderWidth: 0,
  });
}

function normalizeStandardIssueDate(page, locale, regularFont) {
  const { height } = page.getSize();
  const label = locale === "tr" ? "17.09.2026" : "17 Sep 2026";

  // All current premium masters were issued on 17 Sep 2026. Repaint only the
  // value cell so EN/TR use one consistent locale-aware format.
  page.drawRectangle({
    x: 496,
    y: height - 58.5,
    width: 58,
    height: 12.5,
    color: NAVY,
    borderWidth: 0,
  });

  page.drawText(label, {
    x: locale === "tr" ? 507 : 502,
    y: height - 54.5,
    size: 7.4,
    font: regularFont,
    color: WHITE,
  });
}

function removeGenericVerificationLabels(page) {
  // New batch masters already contain the useful field value directly below
  // these generic labels. Removing only "FIELD VERIFICATION 1/2/3/4" makes
  // the cards cleaner without changing any technical content.
  const boxes = [
    { x: 60, y: 607, width: 112, height: 13 },
    { x: 318, y: 607, width: 112, height: 13 },
    { x: 60, y: 545, width: 112, height: 13 },
    { x: 318, y: 545, width: 112, height: 13 },
  ];

  for (const box of boxes) {
    page.drawRectangle({ ...box, color: PALE_BLUE, borderWidth: 0 });
  }
}

function fixMobileEquipmentEnglishLeak(page, boldFont) {
  // The EN Mobile Equipment master had one Turkish heading left in the fourth
  // standards card. Replace only that heading; body text remains untouched.
  page.drawRectangle({
    x: 318,
    y: 536,
    width: 110,
    height: 18,
    color: WHITE,
    borderWidth: 0,
  });

  page.drawText("MANUFACTURER INSTRUCTIONS", {
    x: 320,
    y: 543,
    size: 6.2,
    font: boldFont,
    color: SLATE,
  });
}

async function polishPdf(filePath, info, remaining26) {
  const source = await readFile(filePath);
  const pdf = await PDFDocument.load(source);
  const regularFont = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();

  pages.forEach((page) => {
    coverRepeatedFooter(page);

    if (info.branded) {
      cleanBrandedHeader(page);
    } else {
      normalizeStandardIssueDate(page, info.locale, regularFont);
    }
  });

  if (remaining26.has(info.slug) && pages[1]) {
    removeGenericVerificationLabels(pages[1]);
  }

  if (
    info.slug === "mobile-equipment-safety" &&
    info.locale === "en" &&
    !info.branded &&
    pages[1]
  ) {
    fixMobileEquipmentEnglishLeak(pages[1], boldFont);
  }

  const polished = await pdf.save();
  await writeFile(filePath, polished);
}

async function main() {
  const remaining26Data = JSON.parse(await readFile(remaining26Path, "utf8"));
  const remaining26 = new Set(Object.keys(remaining26Data));

  const entries = await readdir(downloadsDir, { withFileTypes: true });
  const targets = entries
    .filter((entry) => entry.isFile())
    .map((entry) => ({ fileName: entry.name, info: getPdfInfo(entry.name) }))
    .filter((entry) => entry.info)
    .sort((a, b) => a.fileName.localeCompare(b.fileName));

  for (const target of targets) {
    await polishPdf(
      path.join(downloadsDir, target.fileName),
      target.info,
      remaining26,
    );
  }

  console.log(
    `[toolbox-pdf] Polished ${targets.length} toolbox PDFs: branded metadata, footer spacing, dates and known EN/batch text issues.`,
  );
}

main().catch((error) => {
  console.error("[toolbox-pdf] PDF polish failed:", error);
  process.exitCode = 1;
});
