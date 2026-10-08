"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { requirePrintAuth } from "@/lib/auth/require-print-auth";
import { createClient } from "@/utils/supabase/client";

type Props = {
  signCode: string;
  signTitle: string;
  locale: string;
};

type DownloadAccessResponse = {
  authenticated?: boolean;
  isPremium?: boolean;
};

type ExportType = "a4" | "a3" | "png" | "print";

export default function SignDownloadButtons({
  signCode,
  signTitle,
  locale,
}: Props) {
  const [loading, setLoading] = useState<ExportType | null>(null);

  const safeName = `${signCode}-${signTitle}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  async function resolvePremiumDownloadAccess() {
    try {
      const response = await fetch("/api/safety-signs/download-access", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      if (!response.ok) {
        return false;
      }

      const data = (await response.json()) as DownloadAccessResponse;
      return data.authenticated === true && data.isPremium === true;
    } catch (error) {
      console.error("Safety sign entitlement check failed:", error);
      return false;
    }
  }

  async function captureSign(isPremium: boolean) {
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

    const iconAreaHeight = Math.round(height * 0.72);
    const brandAreaHeight = isPremium ? 0 : Math.round(height * 0.045);
    const titleAreaHeight = height - iconAreaHeight - brandAreaHeight;

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

    if (!isPremium) {
      const brandTop = height - brandAreaHeight;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, brandTop, width, brandAreaHeight);

      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, brandTop + 2.5);
      ctx.lineTo(width, brandTop + 2.5);
      ctx.stroke();

      ctx.fillStyle = "#0f172a";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "900 54px Arial, Helvetica, sans-serif";
      ctx.fillText(
        "SERNEM.COM",
        width / 2,
        brandTop + brandAreaHeight / 2
      );
    }

    return canvas;
  }

  async function downloadPNG(isPremium: boolean) {
    const canvas = await captureSign(isPremium);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png", 1)
    );

    if (!blob) {
      throw new Error("PNG could not be generated.");
    }

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const outputName = isPremium ? safeName : `${safeName}-sernem`;

    anchor.href = url;
    anchor.download = `${outputName}.png`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function downloadPDF(size: "a4" | "a3", isPremium: boolean) {
    const canvas = await captureSign(isPremium);

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
    const outputName = isPremium ? safeName : `${safeName}-sernem`;

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

    pdf.save(`${outputName}-${size}.pdf`);
  }

  async function printSign(isPremium: boolean) {
    const canvas = await captureSign(isPremium);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png", 1)
    );

    if (!blob) {
      throw new Error("Print image could not be generated.");
    }

    const imageUrl = URL.createObjectURL(blob);
    const iframe = document.createElement("iframe");

    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const printDocument = iframe.contentDocument;

    if (!printDocument) {
      URL.revokeObjectURL(imageUrl);
      iframe.remove();
      throw new Error("Print document could not be created.");
    }

    printDocument.open();
    printDocument.write(`<!doctype html>
<html>
<head>
  <style>
    @page { size: A4 portrait; margin: 0; }
    html, body { margin: 0; width: 210mm; height: 297mm; overflow: hidden; }
    img { display: block; width: 210mm; height: 297mm; object-fit: fill; }
  </style>
</head>
<body>
  <img id="safety-sign-print-image" src="${imageUrl}" alt="" />
</body>
</html>`);
    printDocument.close();

    const printImage = printDocument.getElementById(
      "safety-sign-print-image"
    ) as HTMLImageElement | null;

    if (!printImage) {
      URL.revokeObjectURL(imageUrl);
      iframe.remove();
      throw new Error("Print image could not be created.");
    }

    if (!printImage.complete) {
      await new Promise<void>((resolve, reject) => {
        printImage.onload = () => resolve();
        printImage.onerror = () => reject(new Error("Print image could not be loaded."));
      });
    }

    const printWindow = iframe.contentWindow;

    if (!printWindow) {
      URL.revokeObjectURL(imageUrl);
      iframe.remove();
      throw new Error("Print window is unavailable.");
    }

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      URL.revokeObjectURL(imageUrl);
      iframe.remove();
    };

    printWindow.addEventListener("afterprint", cleanup, { once: true });
    printWindow.focus();
    printWindow.print();

    setTimeout(cleanup, 60_000);
  }

  async function run(type: ExportType) {
    const resolvedLocale = locale === "tr" ? "tr" : "en";
    if (!(await requirePrintAuth(resolvedLocale))) return;

    try {
      setLoading(type);

      const isPremium = await resolvePremiumDownloadAccess();

      if (type === "png") {
        await downloadPNG(isPremium);
      } else if (type === "print") {
        await printSign(isPremium);
      } else {
        await downloadPDF(type, isPremium);
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: activityError } = await supabase
          .from("user_activity_events")
          .insert({
            user_id: user.id,
            event_name: `resource_download|${signTitle}|${type.toUpperCase()}`,
            path: window.location.href,
            metadata: {
              resource_type: "safety_sign",
              sign_code: signCode,
              locale: resolvedLocale,
              format: type,
              access_tier: isPremium ? "premium" : "free",
              download_variant: isPremium ? "clean" : "sernem_branded",
            },
          });
        if (activityError) {
          console.error("Safety sign activity tracking error:", activityError);
        }
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
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold leading-5 text-emerald-950">
        {locale === "tr"
          ? "Ücretsiz önizleme, indirme ve yazdırma çıktıları SERNEM.COM etiketi içerir. Premium üyeler temiz, logosuz sürümü kullanır."
          : "Free preview, download and print outputs include a SERNEM.COM label. Premium members receive the clean, unbranded version."}
      </div>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => void run("a4")}
        className="w-full rounded-xl bg-blue-600 px-5 py-4 font-black text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
      >
        {loading === "a4" ? "PDF..." : "A4 PDF"}
      </button>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => void run("a3")}
        className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-black text-white transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60"
      >
        {loading === "a3" ? "PDF..." : "A3 PDF"}
      </button>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => void run("png")}
        className="w-full rounded-xl border border-slate-300 px-5 py-4 font-black text-slate-900 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
      >
        {loading === "png" ? "PNG..." : "PNG"}
      </button>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => void run("print")}
        className="w-full rounded-xl border border-slate-950 bg-slate-950 px-5 py-4 font-black text-white transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
      >
        {loading === "print"
          ? locale === "tr" ? "Yazdırma..." : "Print..."
          : locale === "tr" ? "Yazdır" : "Print"}
      </button>
    </div>
  );
}
