"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { isAdminUser } from "@/lib/auth/access";
import { requirePrintAuth } from "@/lib/auth/require-print-auth";
import { exportPosterPdf } from "@/lib/posters/export-poster-pdf";

type Props = {
  locale: "tr" | "en";
};

type PremiumState = "loading" | "premium" | "free";
type PosterSize = "a4" | "a3";

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function waitForPosterAssets() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const pendingBranding = document.querySelector(
      '[data-poster-branding-ready="false"]',
    );

    if (!pendingBranding) break;
    await sleep(100);
  }

  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>("#poster-print-area img"),
  );

  await Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          const done = () => resolve();
          image.addEventListener("load", done, { once: true });
          image.addEventListener("error", done, { once: true });
        }),
    ),
  );
}

async function waitForPosterLayout(size: PosterSize) {
  const expectedWidth = size === "a4" ? 794 : 1123;

  for (let attempt = 0; attempt < 30; attempt += 1) {
    const poster = document.getElementById("poster-print-area");
    if (poster && Math.abs(poster.clientWidth - expectedWidth) <= 3) {
      return poster;
    }
    await sleep(100);
  }

  return document.getElementById("poster-print-area");
}

export default function PosterFormatToolbar({ locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isTurkish = locale === "tr";
  const selectedSize = searchParams.get("size") === "a4" ? "a4" : "a3";
  const brandedPoster = searchParams.get("brand") === "1";
  const [premiumState, setPremiumState] = useState<PremiumState>("loading");
  const [isExporting, setIsExporting] = useState<PosterSize | null>(null);

  useEffect(() => {
    let active = true;

    async function resolvePremium() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (active) setPremiumState("free");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan, role, status")
          .eq("id", user.id)
          .maybeSingle();

        const premium = Boolean(
          isAdminUser(user) ||
            (profile?.status !== "suspended" &&
              (profile?.plan === "premium" || profile?.role === "admin")),
        );

        if (active) setPremiumState(premium ? "premium" : "free");
      } catch (error) {
        console.error("Poster premium access check failed:", error);
        if (active) setPremiumState("free");
      }
    }

    void resolvePremium();

    return () => {
      active = false;
    };
  }, []);

  function updateQuery(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function selectSize(size: PosterSize) {
    updateQuery({ size });
  }

  function toggleBranding() {
    if (premiumState === "loading") return;

    if (premiumState !== "premium") {
      router.push(`/${locale}/upgrade`);
      return;
    }

    updateQuery({ brand: brandedPoster ? null : "1" });
  }

  async function savePosterPdf(size: PosterSize) {
    if (isExporting) return;
    if (!(await requirePrintAuth(locale))) return;

    setIsExporting(size);

    try {
      if (selectedSize !== size) {
        selectSize(size);
      }

      const poster = await waitForPosterLayout(size);
      await waitForPosterAssets();
      await sleep(100);

      if (!poster) {
        throw new Error("Poster export area was not found.");
      }

      const slug = pathname.split("/").filter(Boolean).at(-1) ?? "sernem-poster";
      await exportPosterPdf({
        element: poster,
        size,
        filename: `sernem-${slug}`,
      });
    } catch (error) {
      console.error("Poster PDF export failed:", error);
      window.alert(
        isTurkish
          ? "PDF oluşturulamadı. Lütfen sayfayı yenileyip tekrar deneyin."
          : "The PDF could not be created. Please refresh the page and try again.",
      );
    } finally {
      setIsExporting(null);
    }
  }

  async function printCurrentPoster() {
    if (!(await requirePrintAuth(locale))) return;

    await waitForPosterAssets();
    window.print();
  }

  const exportLabel = (size: PosterSize) => {
    if (isExporting === size) {
      return isTurkish ? "PDF hazırlanıyor..." : "Preparing PDF...";
    }
    return isTurkish ? `${size.toUpperCase()} PDF Kaydet` : `Save ${size.toUpperCase()} PDF`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => selectSize("a4")}
        className={`rounded-xl border px-5 py-3 text-sm font-black transition ${
          selectedSize === "a4"
            ? "border-blue-500 bg-blue-600 text-white"
            : "border-slate-300 bg-white text-slate-800 hover:border-blue-400"
        }`}
      >
        A4 {isTurkish ? "Önizleme" : "Preview"}
      </button>

      <button
        type="button"
        onClick={() => void savePosterPdf("a4")}
        disabled={Boolean(isExporting)}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"
      >
        ↓ {exportLabel("a4")}
      </button>

      <button
        type="button"
        onClick={() => selectSize("a3")}
        className={`rounded-xl border px-5 py-3 text-sm font-black transition ${
          selectedSize === "a3"
            ? "border-emerald-500 bg-emerald-600 text-white"
            : "border-slate-300 bg-white text-slate-800 hover:border-emerald-400"
        }`}
      >
        A3 {isTurkish ? "Önizleme" : "Preview"}
      </button>

      <button
        type="button"
        onClick={() => void savePosterPdf("a3")}
        disabled={Boolean(isExporting)}
        className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
      >
        ↓ {exportLabel("a3")}
      </button>

      <button
        type="button"
        onClick={toggleBranding}
        disabled={premiumState === "loading" || Boolean(isExporting)}
        className={`rounded-xl border px-5 py-3 text-sm font-black transition disabled:cursor-wait disabled:opacity-60 ${
          brandedPoster && premiumState === "premium"
            ? "border-amber-400 bg-amber-400 text-slate-950"
            : "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
        }`}
      >
        {premiumState === "premium"
          ? brandedPoster
            ? `✓ ${isTurkish ? "Logolu Poster" : "Branded Poster"}`
            : `🏢 ${isTurkish ? "Şirket Logosu Ekle" : "Add Company Logo"}`
          : premiumState === "loading"
            ? isTurkish
              ? "Logo kontrol ediliyor..."
              : "Checking branding..."
            : `🔒 ${isTurkish ? "Logolu Poster · Premium" : "Branded Poster · Premium"}`}
      </button>

      <button
        type="button"
        onClick={() => void printCurrentPoster()}
        disabled={Boolean(isExporting)}
        className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60"
      >
        🖨 {isTurkish ? "Yazdır" : "Print"}
      </button>
    </div>
  );
}
