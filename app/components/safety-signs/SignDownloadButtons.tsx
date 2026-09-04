"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

type Props = {
  signCode: string;
  signTitle: string;
  locale: string;
};

export default function SignDownloadButtons({
  signCode,
  signTitle,
  locale,
}: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  const safeName = `${signCode}-${signTitle}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  async function captureSign() {
    const element = document.querySelector(
      "[data-safety-sign-renderer]"
    ) as HTMLElement | null;

    if (!element) {
      throw new Error("Safety sign renderer not found.");
    }

    const svgImage = element.querySelector("img") as HTMLImageElement | null;

    if (!svgImage) {
      throw new Error("Safety sign SVG not found.");
    }

    if (!svgImage.complete) {
      await new Promise<void>((resolve, reject) => {
        svgImage.onload = () => resolve();
        svgImage.onerror = () => reject(new Error("SVG could not be loaded."));
      });
    }

    const width = 2480;
    const height = 3508;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas is unavailable.");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    /*
      SignRenderer oranı:
      üst ikon alanı %72
      alt başlık alanı %28
    */
    const iconAreaHeight = Math.round(height * 0.72);
    const titleAreaHeight = height - iconAreaHeight;

    /*
      SVG'yi fetch edip Image olarak canvas'a çiziyoruz.
      Böylece public/ altındaki mevcut ISO levhasının aynısı kullanılır.
    */
    const response = await fetch(svgImage.src);

    if (!response.ok) {
      throw new Error("Safety sign SVG could not be fetched.");
    }

    const svgBlob = await response.blob();
    const svgUrl = URL.createObjectURL(svgBlob);

    try {
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Safety sign image could not be rendered."));
        img.src = svgUrl;
      });

      const paddingX = width * 0.08;
      const paddingY = iconAreaHeight * 0.07;

      const availableWidth = width - paddingX * 2;
      const availableHeight = iconAreaHeight - paddingY * 2;

      const scale = Math.min(
        availableWidth / img.naturalWidth,
        availableHeight / img.naturalHeight
      );

      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;

      ctx.drawImage(
        img,
        (width - drawWidth) / 2,
        paddingY + (availableHeight - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    } finally {
      URL.revokeObjectURL(svgUrl);
    }

    /*
      Alt başlık alanının rengini mevcut DOM'dan alıyoruz.
      Böylece prohibition / warning / mandatory vb.
      SignRenderer görünümüyle aynı kalır.
    */
    const titleContainer = element.children[1] as HTMLElement | undefined;

    if (!titleContainer) {
      throw new Error("Safety sign title area not found.");
    }

    const styles = window.getComputedStyle(titleContainer);

    ctx.fillStyle = styles.backgroundColor || "#ffffff";
    ctx.fillRect(0, iconAreaHeight, width, titleAreaHeight);

    ctx.fillStyle = styles.color || "#020617";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 125px Arial, Helvetica, sans-serif";

    const maxTextWidth = width * 0.84;
    let fontSize = 125;

    while (fontSize > 55) {
      ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;

      if (ctx.measureText(signTitle.toUpperCase()).width <= maxTextWidth) {
        break;
      }

      fontSize -= 4;
    }

    ctx.fillText(
      signTitle.toUpperCase(),
      width / 2,
      iconAreaHeight + titleAreaHeight / 2,
      maxTextWidth
    );

    return canvas;
  }

  async function downloadPNG() {
    const canvas = await captureSign();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png", 1)
    );

    if (!blob) {
      throw new Error("PNG could not be generated.");
    }

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${safeName}.png`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function downloadPDF(size: "a4" | "a3") {
    const canvas = await captureSign();

    const dimensions =
      size === "a4"
        ? { width: 210, height: 297 }
        : { width: 297, height: 420 };

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: size,
      compress: true,
    });

    const imageData = canvas.toDataURL("image/png", 1);

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      dimensions.width,
      dimensions.height,
      undefined,
      "FAST"
    );

    pdf.save(`${safeName}-${size}.pdf`);
  }

  async function run(type: "a4" | "a3" | "png") {
    try {
      setLoading(type);

      if (type === "png") {
        await downloadPNG();
      } else {
        await downloadPDF(type);
      }
    } catch (error) {
      console.error(error);

      window.alert(
        locale === "tr"
          ? "Dosya oluşturulamadı. Lütfen tekrar deneyin."
          : "The file could not be generated. Please try again."
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-7 space-y-3">
      <button
        type="button"
        disabled={loading !== null}
        onClick={() => run("a4")}
        className="w-full rounded-xl bg-blue-600 px-5 py-4 font-black text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
      >
        {loading === "a4" ? "PDF..." : "A4 PDF"}
      </button>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => run("a3")}
        className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-black text-white transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60"
      >
        {loading === "a3" ? "PDF..." : "A3 PDF"}
      </button>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => run("png")}
        className="w-full rounded-xl border border-slate-300 px-5 py-4 font-black text-slate-900 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
      >
        {loading === "png" ? "PNG..." : "PNG"}
      </button>
    </div>
  );
}
