import { PDFDocument, rgb } from "pdf-lib";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { getToolboxBySlug } from "@/lib/toolbox/toolbox-data";
import { generatePremiumToolboxPdf as generateLegacyPremiumToolboxPdf } from "@/lib/pdf/premium-toolbox-pdf";

type Locale = "tr" | "en";

type DocumentProfile = {
  projectName?: string;
  siteName?: string;
  workArea?: string;
  presentedBy?: string;
  revision?: string;
};

type GeneratePremiumToolboxPdfArgs = {
  slug: string;
  locale: Locale;
  logoBytes: Uint8Array;
  logoMime: string;
  documentProfile?: DocumentProfile;
};

const PAGE_W = 794;
const PAGE_H = 1123;

function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function wrap(text: string, max = 64) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function textBlock(lines: string[], x: number, y: number, size = 16, lineHeight = 22) {
  return lines
    .map(
      (line, index) => `
        <text x="${x}" y="${y + index * lineHeight}" font-size="${size}" font-weight="600" fill="#1f3147">${esc(line)}</text>
      `,
    )
    .join("");
}

async function buildFieldVisualPage({
  slug,
  locale,
  title,
  subtitle,
  hazards,
  controls,
  remember,
  logoBytes,
  logoMime,
  documentProfile,
}: {
  slug: string;
  locale: Locale;
  title: string;
  subtitle: string;
  hazards: string[];
  controls: string[];
  remember: string;
  logoBytes: Uint8Array;
  logoMime: string;
  documentProfile?: DocumentProfile;
}) {
  const siteImagePath = path.join(
    process.cwd(),
    "public",
    "images",
    "sernem-hero-refinery.png",
  );

  const siteImage = await sharp(await readFile(siteImagePath))
    .resize(706, 374, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  const logoData = `data:${logoMime || "image/png"};base64,${Buffer.from(logoBytes).toString("base64")}`;
  const siteImageData = `data:image/png;base64,${siteImage.toString("base64")}`;

  const projectSite = [
    documentProfile?.projectName?.trim(),
    documentProfile?.siteName?.trim(),
  ]
    .filter(Boolean)
    .join(" / ");

  const pageTitle = locale === "tr" ? "SAHA GÖRSELİ & UYGULAMA" : "FIELD VISUAL & APPLICATION";
  const visualLabel = locale === "tr" ? "GERÇEK SAHA GÖRSELİ" : "REAL FIELD VISUAL";
  const focusLabel = locale === "tr" ? "SAHADA ODAKLAN" : "FIELD FOCUS";
  const controlsLabel = locale === "tr" ? "KRİTİK KONTROLLER" : "CRITICAL CONTROLS";
  const ruleLabel = locale === "tr" ? "ANA KURAL" : "KEY RULE";
  const projectLabel = locale === "tr" ? "PROJE / SAHA" : "PROJECT / SITE";

  const hazardLines = hazards.slice(0, 3).flatMap((item, index) =>
    wrap(`${index + 1}. ${item}`, 48).slice(0, 2),
  );
  const controlLines = controls.slice(0, 4).flatMap((item) =>
    wrap(`• ${item}`, 47).slice(0, 2),
  );

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${PAGE_W}" height="${PAGE_H}" viewBox="0 0 ${PAGE_W} ${PAGE_H}">
      <defs>
        <style>
          text { font-family: DejaVu Sans, Arial, sans-serif; }
        </style>
        <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#06152b" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="#06152b" stop-opacity="0.48"/>
        </linearGradient>
      </defs>

      <rect width="${PAGE_W}" height="${PAGE_H}" fill="#f8fafc"/>
      <rect x="0" y="0" width="${PAGE_W}" height="174" fill="#06152b"/>
      <rect x="0" y="0" width="9" height="174" fill="#1785ff"/>

      <text x="54" y="42" font-size="12" font-weight="700" letter-spacing="4" fill="#52b8ff">HSE • TOOLBOX TALK</text>
      <text x="54" y="90" font-size="31" font-weight="800" fill="#ffffff">${esc(pageTitle)}</text>
      <text x="54" y="121" font-size="14" fill="#e8eef5">${esc(title)}</text>

      ${logoBytes.length ? `
        <rect x="590" y="14" width="184" height="106" rx="11" fill="#ffffff"/>
        <image href="${logoData}" x="600" y="23" width="164" height="88" preserveAspectRatio="xMidYMid meet"/>
      ` : ""}

      <text x="46" y="205" font-size="11" font-weight="800" letter-spacing="2" fill="#334155">${esc(visualLabel)}</text>
      <rect x="44" y="222" width="706" height="374" rx="18" fill="#dbe6ef"/>
      <clipPath id="photoClip"><rect x="44" y="222" width="706" height="374" rx="18"/></clipPath>
      <image href="${siteImageData}" x="44" y="222" width="706" height="374" preserveAspectRatio="xMidYMid slice" clip-path="url(#photoClip)"/>
      <rect x="44" y="222" width="706" height="374" rx="18" fill="url(#overlay)"/>

      <rect x="66" y="506" width="662" height="66" rx="12" fill="#06152b" fill-opacity="0.86"/>
      <text x="88" y="532" font-size="11" font-weight="800" letter-spacing="1.6" fill="#52b8ff">${esc(focusLabel)}</text>
      ${textBlock(wrap(subtitle || remember, 88).slice(0, 2), 88, 554, 12, 16).replace(/#1f3147/g, "#ffffff")}

      <rect x="44" y="624" width="338" height="314" rx="18" fill="#ffffff" stroke="#dce6ef"/>
      <rect x="412" y="624" width="338" height="314" rx="18" fill="#ffffff" stroke="#dce6ef"/>

      <text x="68" y="660" font-size="12" font-weight="800" letter-spacing="1.4" fill="#b91c1c">${esc(focusLabel)}</text>
      ${textBlock(hazardLines.slice(0, 8), 68, 692, 11.2, 22)}

      <text x="436" y="660" font-size="12" font-weight="800" letter-spacing="1.4" fill="#047857">${esc(controlsLabel)}</text>
      ${textBlock(controlLines.slice(0, 8), 436, 692, 11.2, 22)}

      <rect x="44" y="960" width="706" height="72" rx="15" fill="#0b1f39"/>
      <text x="68" y="986" font-size="10" font-weight="800" letter-spacing="2" fill="#fbbf24">${esc(ruleLabel)}</text>
      ${textBlock(wrap(remember, 92).slice(0, 2), 68, 1010, 11.2, 15).replace(/#1f3147/g, "#ffffff")}

      ${projectSite ? `<text x="48" y="1068" font-size="9" font-weight="700" fill="#64748b">${esc(projectLabel)}: ${esc(projectSite)}</text>` : ""}
      <text x="48" y="1094" font-size="9" font-weight="700" fill="#64748b">HSE-TBT-${esc(slug.toUpperCase())}</text>
    </svg>
  `;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

function rewritePageNumber(page: ReturnType<PDFDocument["getPage"]>, pageNumber: number) {
  page.drawRectangle({
    x: 686,
    y: 14,
    width: 72,
    height: 46,
    color: rgb(0.024, 0.082, 0.169),
  });

  page.drawText(`${pageNumber}/4`, {
    x: 705,
    y: 29,
    size: 12,
    color: rgb(1, 1, 1),
  });
}

export async function generatePremiumToolboxPdf(args: GeneratePremiumToolboxPdfArgs) {
  const record = getToolboxBySlug(args.slug);
  if (!record) throw new Error(`Toolbox not found: ${args.slug}`);

  const localized = record[args.locale] as Record<string, unknown>;
  const title = asString(localized.title, "TOOLBOX TALK").replace(/\s+TOOLBOX TALK$/i, "").trim();
  const subtitle = asString(localized.subtitle);
  const hazards = asArray(localized.hazards);
  const controls = asArray(localized.controls);
  const remember = asString(localized.remember);

  const legacyBytes = await generateLegacyPremiumToolboxPdf(args);
  const pdf = await PDFDocument.load(legacyBytes);

  const fieldPagePng = await buildFieldVisualPage({
    slug: args.slug,
    locale: args.locale,
    title,
    subtitle,
    hazards,
    controls,
    remember,
    logoBytes: args.logoBytes,
    logoMime: args.logoMime,
    documentProfile: args.documentProfile,
  });

  const fieldPage = pdf.insertPage(1, [PAGE_W, PAGE_H]);
  const fieldImage = await pdf.embedPng(fieldPagePng);
  fieldPage.drawImage(fieldImage, {
    x: 0,
    y: 0,
    width: PAGE_W,
    height: PAGE_H,
  });

  const pages = pdf.getPages();
  pages.forEach((page, index) => rewritePageNumber(page, index + 1));

  pdf.setTitle(`${title} - HSE Toolbox Talk`);
  pdf.setSubject("Four-page professional HSE Toolbox Talk with field visual and attendance sheet");
  pdf.setCreator("SERNEM HSE Document System");
  pdf.setProducer("SERNEM HSE Document System");

  return pdf.save();
}
