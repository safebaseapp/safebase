"use client";

import { jsPDF } from "jspdf";

type PosterPdfSize = "a4" | "a3";

const XHTML_NS = "http://www.w3.org/1999/xhtml";

function dataUrlFromBlob(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function inlineImage(image: HTMLImageElement) {
  const source = image.currentSrc || image.src;
  if (!source || source.startsWith("data:")) return source;

  try {
    const response = await fetch(source, { credentials: "include" });
    if (!response.ok) return source;
    return await dataUrlFromBlob(await response.blob());
  } catch {
    return source;
  }
}

function copyComputedStyle(source: Element, target: Element) {
  if (!(source instanceof HTMLElement || source instanceof SVGElement)) return;
  if (!(target instanceof HTMLElement || target instanceof SVGElement)) return;

  const computed = window.getComputedStyle(source);
  for (let index = 0; index < computed.length; index += 1) {
    const property = computed.item(index);
    if (!property) continue;
    target.style.setProperty(
      property,
      computed.getPropertyValue(property),
      computed.getPropertyPriority(property),
    );
  }
}

async function buildStandaloneClone(source: HTMLElement) {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.setAttribute("xmlns", XHTML_NS);

  const sourceNodes = [source, ...Array.from(source.querySelectorAll("*"))];
  const cloneNodes = [clone, ...Array.from(clone.querySelectorAll("*"))];

  sourceNodes.forEach((node, index) => {
    const clonedNode = cloneNodes[index];
    if (clonedNode) copyComputedStyle(node, clonedNode);
  });

  const sourceImages = Array.from(source.querySelectorAll<HTMLImageElement>("img"));
  const cloneImages = Array.from(clone.querySelectorAll<HTMLImageElement>("img"));

  await Promise.all(
    sourceImages.map(async (image, index) => {
      const clonedImage = cloneImages[index];
      if (!clonedImage) return;
      const inlined = await inlineImage(image);
      if (inlined) clonedImage.src = inlined;
      clonedImage.removeAttribute("srcset");
      clonedImage.removeAttribute("sizes");
    }),
  );

  clone.style.margin = "0";
  clone.style.boxShadow = "none";
  clone.style.transform = "none";

  return clone;
}

async function renderPosterToJpeg(element: HTMLElement) {
  const width = Math.max(1, Math.round(element.getBoundingClientRect().width));
  const height = Math.max(1, Math.round(element.getBoundingClientRect().height));
  const clone = await buildStandaloneClone(element);

  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.overflow = "hidden";

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject x="0" y="0" width="100%" height="100%">${serialized}</foreignObject></svg>`;
  const objectUrl = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const rendered = new Image();
      rendered.decoding = "async";
      rendered.onload = () => resolve(rendered);
      rendered.onerror = () => reject(new Error("Poster snapshot could not be rendered."));
      rendered.src = objectUrl;
    });

    const pixelRatio = Math.min(2, Math.max(1.5, window.devicePixelRatio || 1));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Poster PDF canvas is unavailable.");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.scale(pixelRatio, pixelRatio);
    context.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg", 0.96);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function safeFilename(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "") || "sernem-poster";
}

export async function exportPosterPdf({
  element,
  size,
  filename,
}: {
  element: HTMLElement;
  size: PosterPdfSize;
  filename: string;
}) {
  const image = await renderPosterToJpeg(element);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: size,
    compress: true,
    putOnlyUsedFonts: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(image, "JPEG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
  pdf.setProperties({
    title: filename,
    subject: "SERNEM HSE Poster",
    creator: "SERNEM",
    author: "SERNEM",
  });
  pdf.save(`${safeFilename(filename)}-${size}.pdf`);
}
