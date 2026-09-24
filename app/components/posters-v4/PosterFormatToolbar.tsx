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
type ExportMode = "standard" | "branded" | null;

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
  const selectedSize: PosterSize = searchParams.get("size") === "a3" ? "a3" : "a4";
  const brandedPoster = searchParams.get("brand") === "1";
  const [premiumState, setPremiumState] = useState<PremiumState>("loading");
  const [exportMode, setExportMode] = useState<ExportMode>(null);

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

  async function waitForQueryState(size: PosterSize, branded: boolean) {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const current = new URLSearchParams(window.location.search);
      const sizeReady = current.get("size") === size;
      const brandReady = branded
        ? current.get("brand") === "1"
        : current.get("brand") !== "1";

      if (sizeReady && brandReady) break;
      await sleep(50);
    }

    // Give React one paint cycle after the URL state changes so the poster
    // renderer and optional branding layer are synchronized before capture.
    await sleep(150);
  }

  async function savePosterPdf(size: PosterSize, branded: boolean) {
    if (exportMode) return;
    if (!(await requirePrintAuth(locale))) return;

    if (branded && premiumState !== "premium") {
      if (premiumState !== "loading") {
        router.push(`/${locale}/upgrade`);
      }
      return;
    }

    setExportMode(branded ? "branded" : "standard");

    try {
      updateQuery({ size, brand: branded ? "1" : null });
      await waitForQueryState(size, branded);

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
        filename: branded ? `sernem-${slug}-branded` : `sernem-${slug}`,
      });
    } catch (error) {
      console.error("Poster PDF export failed:", error);
      window.alert(
        isTurkish
          ? "PDF oluşturulamadı. Lütfen sayfayı yenileyip tekrar deneyin."
          : "The PDF could not be created. Please refresh the page and try again.",
      );
    } finally {
      setExportMode(null);
    }
  }

  async function printCurrentPoster() {
    if (exportMode) return;
    if (!(await requirePrintAuth(locale))) return;

    updateQuery({ size: selectedSize });
    await waitForQueryState(selectedSize, brandedPoster);
    await waitForPosterAssets();
    window.print();
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div
        className="inline-flex rounded-xl border border-slate-300 bg-white p-1"
        aria-label={isTurkish ? "Poster boyutu" : "Poster size"}
      >
        {(["a4", "a3"] as const).map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => selectSize(size)}
            disabled={Boolean(exportMode)}
            className={`rounded-lg px-4 py-2 text-sm font-black transition disabled:cursor-wait disabled:opacity-60 ${
              selectedSize === size
                ? "bg-slate-950 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => void savePosterPdf(selectedSize, false)}
        disabled={Boolean(exportMode)}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60"
      >
        ↓ {exportMode === "standard"
          ? isTurkish
            ? "PDF hazırlanıyor..."
            : "Preparing PDF..."
          : isTurkish
            ? "PDF İndir"
            : "Download PDF"}
      </button>

      <button
        type="button"
        onClick={() => void savePosterPdf(selectedSize, true)}
        disabled={premiumState === "loading" || Boolean(exportMode)}
        className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-black text-amber-900 transition hover:-translate-y-0.5 hover:bg-amber-100 disabled:cursor-wait disabled:opacity-60"
      >
        {premiumState === "premium"
          ? exportMode === "branded"
            ? isTurkish
              ? "Logolu PDF hazırlanıyor..."
              : "Preparing branded PDF..."
            : `🏢 ${isTurkish ? "Logolu İndir" : "Download Branded"}`
          : premiumState === "loading"
            ? isTurkish
              ? "Premium kontrol ediliyor..."
              : "Checking Premium..."
            : `🔒 ${isTurkish ? "Logolu İndir · Premium" : "Branded Download · Premium"}`}
      </button>

      <button
        type="button"
        onClick={() => void printCurrentPoster()}
        disabled={Boolean(exportMode)}
        className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60"
      >
        🖨 {isTurkish ? "Yazdır" : "Print"} · {selectedSize.toUpperCase()}
      </button>
    </div>
  );
}
