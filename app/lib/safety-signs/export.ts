import type { SignLocale } from "./types";
import { signQrAsset } from "./qr";

export const SIGN_CANVAS = { width: 2480, height: 3508, iconRatio: 0.72, footerHeight: 400 };

async function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Sign asset timed out")), 10000);
    image.onload = () => { window.clearTimeout(timer); resolve(); };
    image.onerror = () => { window.clearTimeout(timer); reject(new Error("Sign asset could not be loaded")); };
    image.src = src;
  });
  if (!image.naturalWidth || !image.naturalHeight) throw new Error("Empty sign asset");
  return image;
}

export function wrapSignTitle(ctx: CanvasRenderingContext2D, title: string, maxWidth: number) {
  const words = title.split(/\s+/), lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Composes the original SVG unchanged. Only the separate standard footer contains QR. */
export async function captureSafetySign({ slug, title, locale, clean }: {
  slug: string; title: string; locale: SignLocale; clean: boolean;
}) {
  const element = document.querySelector("[data-safety-sign-renderer]");
  if (!(element instanceof HTMLElement) || element.dataset.signSlug !== slug) throw new Error("Sign renderer mismatch");
  const svg = element.querySelector<HTMLImageElement>("[data-sign-symbol] img");
  const titleArea = element.querySelector<HTMLElement>("[data-sign-title]");
  if (!svg || !titleArea) throw new Error("Sign areas missing");
  await document.fonts.ready;
  const response = await fetch(svg.src, { credentials: "same-origin" });
  if (!response.ok) throw new Error("Sign SVG unavailable");
  const blobUrl = URL.createObjectURL(await response.blob());
  try {
    const image = await loadImage(blobUrl);
    // A clean premium export never fetches, paints or embeds the branded QR.
    const qr = clean ? null : await loadImage(signQrAsset(slug, locale));
    const { width, height, iconRatio, footerHeight } = SIGN_CANVAS;
    const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("Canvas unavailable");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, width, height);
    const iconHeight = Math.round(height * iconRatio), footer = clean ? 0 : footerHeight;
    const titleHeight = height - iconHeight - footer;
    const px = width * .08, py = iconHeight * .07;
    const scale = Math.min((width - px * 2) / image.naturalWidth, (iconHeight - py * 2) / image.naturalHeight);
    const dw = image.naturalWidth * scale, dh = image.naturalHeight * scale;
    ctx.drawImage(image, (width - dw) / 2, py + (iconHeight - py * 2 - dh) / 2, dw, dh);
    const styles = getComputedStyle(titleArea);
    ctx.fillStyle = styles.backgroundColor; ctx.fillRect(0, iconHeight, width, titleHeight);
    ctx.fillStyle = styles.color; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const text = title.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US");
    let font = 125, lines: string[] = [];
    for (; font >= 65; font -= 2) {
      ctx.font = `900 ${font}px Arial, Helvetica, sans-serif`;
      lines = wrapSignTitle(ctx, text, width * .84);
      if (lines.length * font * 1.15 <= titleHeight * .84 && lines.every(line => ctx.measureText(line).width <= width * .84)) break;
    }
    if (font < 65) throw new Error("Sign title cannot fit legibly");
    const lineHeight = font * 1.15, start = iconHeight + titleHeight / 2 - (lines.length - 1) * lineHeight / 2;
    lines.forEach((line, n) => ctx.fillText(line, width / 2, start + n * lineHeight));
    if (qr) {
      const top = height - footer;
      ctx.fillStyle = "#fff"; ctx.fillRect(0, top, width, footer);
      ctx.strokeStyle = "#0f172a"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, top + 2.5); ctx.lineTo(width, top + 2.5); ctx.stroke();
      ctx.fillStyle = "#0f172a"; ctx.textAlign = "left";
      ctx.font = "900 66px Arial, Helvetica, sans-serif"; ctx.fillText("SERNEM.COM", 120, top + 145);
      ctx.font = "500 44px Arial, Helvetica, sans-serif";
      ctx.fillText(locale === "tr" ? "Bu levhanın bilgi sayfası" : "This sign’s information page", 120, top + 225);
      ctx.font = "500 36px Arial, Helvetica, sans-serif"; ctx.fillText(`sernem.com/${locale}/safety-signs`, 120, top + 290);
      ctx.imageSmoothingEnabled = false; ctx.drawImage(qr, width - 360, top + 40, 320, 320);
    }
    return canvas;
  } finally { URL.revokeObjectURL(blobUrl); }
}
