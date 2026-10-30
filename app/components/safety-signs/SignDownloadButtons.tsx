"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { requirePrintAuth } from "@/lib/auth/require-print-auth";
import { createClient } from "@/utils/supabase/client";

import { captureSafetySign } from "@/lib/safety-signs/export";

type Props = {
  signSlug: string;
  signCode: string;
  signTitle: string;
  locale: string;
};

type DownloadAccessResponse = {
  authenticated?: boolean;
  isPremium?: boolean;
};

export default function SignDownloadButtons({
  signSlug,
  signCode,
  signTitle,
  locale,
}: Props) {
  const busy = useRef(false);
  const [loading, setLoading] = useState<string | null>(null);

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
    return captureSafetySign({ slug: signSlug, title: signTitle, locale: locale === "tr" ? "tr" : "en", clean: isPremium });
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

  async function run(type: "a4" | "a3" | "png") {
    if (busy.current) return;
    busy.current = true;
    const resolvedLocale = locale === "tr" ? "tr" : "en";
    try {
      if (!(await requirePrintAuth(resolvedLocale))) return;
      setLoading(type);

      const isPremium = await resolvePremiumDownloadAccess();

      if (type === "png") {
        await downloadPNG(isPremium);
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
      busy.current = false;
      setLoading(null);
    }
  }

  return (
    <div className="mt-7 space-y-3">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold leading-5 text-emerald-950">
        {locale === "tr"
          ? "Standart önizleme ve ücretsiz indirmeler ayrı alt bilgide SERNEM.COM etiketi ve bu levhaya özel QR içerir. İndirmek için giriş gerekir. Premium üyeler temiz, logosuz ve QR içermeyen sürümü otomatik olarak indirir."
          : "Standard previews and free downloads include SERNEM.COM and a sign-specific QR in a separate footer. Sign in to download. Premium members automatically receive the clean version without branding or QR."}
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
    </div>
  );
}
