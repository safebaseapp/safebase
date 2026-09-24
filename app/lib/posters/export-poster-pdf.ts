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

  const resolved = new URL(source, window.location.href);
  const response = await fetch(resolved.toString(), {
    credentials:
      resolved.origin === window.location.origin ? "same-origin" : "omit",
    mode: "cors",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Poster image could not be loaded (${response.status}).`);
  }

  return dataUrlFromBlob(await response.blob());
}

function copyComputedStyle(source: Element, target: Element) {
  if (!(source instanceof HTMLElement || source instanceof SVGElement)) return;
  if (!(target instanceof HTMLElement || target instanceof SVGElement)) return;

  const computed = window.getComputedStyle(source);
  for (let index = 0; index < computed.length; index += 1) {
    const property = computed.item(index);
    if (!property || property.startsWith("--")) continue;

    target.style.setProperty(
      property,
      computed.getPropertyValue(property),
      computed.getPropertyPriority(property),
    );
  }
}

async function buildStandaloneClone(source: HTMLElement) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const clone = source.cloneNode(true) as HTMLElement;
  clone.setAttribute("xmlns", XHTML_NS);

  const sourceNodes = [source, ...Array.from(source.querySelectorAll("*"))];
  const cloneNodes = [clone, ...Array.from(clone.querySelectorAll("*"))];

  sourceNodes.forEach((node, index) => {
    const clonedNode = cloneNodes[index];
    if (clonedNode) copyComputedStyle(node, clonedNode);
  });

  const sourceImages = Array.from(
    source.querySelectorAll<HTMLImageElement>("img"),
  );
  const cloneImages = Array.from(
    clone.querySelectorAll<HTMLImageElement>("img"),
  );

  await Promise.all(
    sourceImages.map(async (image, index) => {
      const clonedImage = cloneImages[index];
      if (!clonedImage) return;

      const inlined = await inlineImage(image);
      if (inlined) clonedImage.src = inlined;
      clonedImage.removeAttribute("srcset");
      clonedImage.removeAttribute("sizes");
      clonedImage.removeAttribute("crossorigin");
    }),
  );

  clone.style.margin = "0";
  clone.style.boxShadow = "none";
  clone.style.transform = "none";

  return clone;
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const rendered = new Image();
    rendered.decoding = "async";
    rendered.onload = () => resolve(rendered);
    rendered.onerror = () =>
      reject(new Error("Poster snapshot could not be rendered."));
    rendered.src = source;
  });
}

async function renderSvgSnapshot(svg: string) {
  const blobUrl = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );

  try {
    try {
      return await loadImage(blobUrl);
    } catch (blobError) {
      console.warn("Poster blob snapshot failed; retrying as data URL.", blobError);
      return await loadImage(
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      );
    }
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

async function renderPosterToJpeg(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  if (width < 100 || height < 100) {
    throw new Error("Poster layout is not ready for PDF export.");
  }

  const clone = await buildStandaloneClone(element);

  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.overflow = "hidden";

  const serialized = new XMLSerializer().serializeToString(clone);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject x="0" y="0" width="100%" height="100%">${serialized}</foreignObject></svg>`;
  const image = await renderSvgSnapshot(svg);

  const pixelRatio = Math.min(
    2,
    Math.max(1.5, window.devicePixelRatio || 1),
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Poster PDF canvas is unavailable.");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.scale(pixelRatio, pixelRatio);
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.94);
}

function safeFilename(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "sernem-poster"
  );
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

  pdf.addImage(
    image,
    "JPEG",
    0,
    0,
    pageWidth,
    pageHeight,
    undefined,
    "FAST",
  );
  pdf.setProperties({
    title: filename,
    subject: "SERNEM HSE Poster",
    creator: "SERNEM",
    author: "SERNEM",
  });
  pdf.save(`${safeFilename(filename)}-${size}.pdf`);
}
