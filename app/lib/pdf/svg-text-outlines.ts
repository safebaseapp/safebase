import { readFile } from "node:fs/promises";
import path from "node:path";

// Glyphs are drawn as vector outlines, not delegated to a server font fallback.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fontkit = require("fontkit");
type Glyph = { id: number; path: { toSVG(): string } };
type Font = { unitsPerEm: number; layout(text: string): { glyphs: Glyph[]; positions: { xAdvance: number; xOffset: number; yOffset: number }[] } };
let fontCache: Promise<{ regular: Font; bold: Font }> | undefined;
function fonts() {
  if (!fontCache) {
    fontCache = Promise.all([
      readFile(path.join(process.cwd(), "public/fonts/DejaVuSans.ttf")),
      readFile(path.join(process.cwd(), "public/fonts/DejaVuSans-Bold.ttf"))
    ]).then(([regular, bold]) => ({
      regular: fontkit.create(regular) as Font, bold: fontkit.create(bold) as Font
    }));
  }
  return fontCache;
}
function getAttr(attrs: string, name: string): string | undefined {
  const match = attrs.match(new RegExp("(?:^|\\s)" + name + "\\s*=\\s*[\"']([^\"']*)[\"']"));
  return match?.[1];
}
function getNumber(attrs: string, name: string, fallback: number): number {
  const raw = getAttr(attrs, name);
  if (raw === undefined) return fallback;
  const n = Number.parseFloat(raw);
  if (!Number.isFinite(n)) throw new Error("Invalid SVG " + name + ": " + raw);
  return n;
}
function unescapeXml(text: string): string {
  return text.replace(/&(#x[\da-fA-F]+|#\d+|amp|lt|gt|quot|apos);/g, (whole, entity: string) => {
    if (entity.startsWith("#")) {
      const n = entity[1]?.toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isInteger(n) && n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : whole;
    }
    return ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" } as Record<string,string>)[entity] ?? whole;
  });
}
function makePath(text: string, attrs: string, font: Font): string {
  const fontSize = getNumber(attrs, "font-size", 14);
  const scale = fontSize / font.unitsPerEm;
  if (!(scale > 0)) throw new Error("Invalid PDF font size");
  const spacing = getNumber(attrs, "letter-spacing", 0) / scale;
  const run = font.layout(text), parts: string[] = [];
  let advance = 0;
  for (let i = 0; i < run.glyphs.length; i++) {
    const glyph = run.glyphs[i], pos = run.positions[i];
    if (!glyph.id) throw new Error("Unrenderable PDF glyph: " + text);
    const d = glyph.path.toSVG();
    if (d) parts.push('<path d="' + d + '" transform="translate(' + (advance + pos.xOffset) + ' ' + pos.yOffset + ')"/>');
    advance += pos.xAdvance + (i < run.glyphs.length - 1 ? spacing : 0);
  }
  const anchor = getAttr(attrs, "text-anchor");
  const offset = anchor === "middle" ? 0.5 : anchor === "end" ? 1 : 0;
  const x = getNumber(attrs, "x", 0) - advance * scale * offset;
  const y = getNumber(attrs, "y", 0);
  const fill = getAttr(attrs, "fill") ?? "#000";
  const extras = ["opacity", "fill-opacity", "stroke", "stroke-width"].map(name => {
    const value = getAttr(attrs, name);
    return value === undefined ? "" : ' ' + name + '="' + value + '"';
  }).join("");
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + scale + ' ' + (-scale) + ')" fill="' + fill + '"' + extras + '>' + parts.join("") + '</g>';
}
/** Convert every SVG text node to DejaVu paths, including Turkish Unicode. */
export async function outlineToolboxSvgText(svg: string): Promise<string> {
  const loaded = await fonts();
  let count = 0;
  const output = svg.replace(/<text\b([^>]*)>([\s\S]*?)<\/text>/g, (_whole, attrs: string, raw: string) => {
    if (/<\/?[a-z][^>]*>/i.test(raw)) throw new Error("Nested SVG text is unsupported");
    const content = unescapeXml(raw).trim();
    if (!content) return "";
    const weight = getNumber(attrs, "font-weight", 400);
    count++;
    return makePath(content, attrs, weight >= 600 ? loaded.bold : loaded.regular);
  });
  if (count < 5 || /<text\b/.test(output)) throw new Error("PDF SVG text-to-path incomplete: " + count);
  return output;
}
