"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { requirePrintAuth } from "@/lib/auth/require-print-auth";

type Props = {
  locale: "tr" | "en";
};

type PremiumState = "loading" | "premium" | "free";
type PosterSize = "a4" | "a3";

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

const POSTER_ASSET_TIMEOUT_MS = 8000;

async function waitForPosterAssets(): Promise<boolean> {
  const deadline = Date.now() + POSTER_ASSET_TIMEOUT_MS;
  const remaining = () => Math.max(0, deadline - Date.now());

  while (document.querySelector('[data-poster-branding-ready="false"]') && remaining() > 0) {
    await sleep(Math.min(100, remaining()));
  }
  if (document.querySelector('[data-poster-branding-ready="false"]')) return false;

  // An unresponsive font or image must not disable the print button indefinitely.
  if (document.fonts?.status === "loading") {
    const fontsReady = await Promise.race([
      document.fonts.ready.then(() => true, () => false),
      sleep(remaining()).then(() => false),
    ]);
    if (!fontsReady) return false;
  }

  const images = Array.from(document.querySelectorAll<HTMLImageElement>("#poster-print-area img"));
  await Promise.all(images.map((image) => {
    if (image.complete) return Promise.resolve();
    return new Promise<void>((resolve) => {
      let settled = false;
      let timeoutId: number;
      const finish = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);
        resolve();
      };
      timeoutId = window.setTimeout(finish, remaining());
      image.addEventListener("load", finish);
      image.addEventListener("error", finish);
      if (image.complete) finish();
    });
  }));

  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
  });

  return document.fonts?.status !== "loading" &&
    !document.querySelector('[data-poster-branding-ready="false"]') &&
    images.every((image) => image.complete && image.naturalWidth > 0);
}

export default function PosterFormatToolbar({ locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTurkish = locale === "tr";
  const selectedSize: PosterSize =
    searchParams.get("size") === "a3" ? "a3" : "a4";
  const brandedPoster = searchParams.get("brand") === "1";

  const [premiumState, setPremiumState] = useState<PremiumState>("loading");
  const [isSwitchingMode, setIsSwitchingMode] = useState(false);
  const [brandingNotice, setBrandingNotice] = useState<string | null>(null);
  const [printNotice, setPrintNotice] = useState<string | null>(null);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  useEffect(() => {
    let active = true;

    async function resolvePremium() {
      try {
        const response = await fetch("/api/posters/premium-access", { cache: "no-store", credentials: "same-origin" });
        const data = response.ok ? await response.json() as { premium?: boolean } : null;
        if (active) setPremiumState(data?.premium === true ? "premium" : "free");
      } catch {
        if (active) setPremiumState("free");
      }
    }

    void resolvePremium();
    return () => {
      active = false;
    };
  }, []);

  function replaceQuery(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function selectSize(size: PosterSize) {
    if (isSwitchingMode) return;
    replaceQuery({ size });
  }

  async function selectPosterMode(branded: boolean) {
    if (isSwitchingMode) return;
    if (!(await requirePrintAuth(locale))) return;

    setBrandingNotice(null);

    if (!branded) {
      replaceQuery({ brand: null });
      return;
    }

    if (premiumState !== "premium") {
      if (premiumState !== "loading") {
        router.push(`/${locale}/upgrade?next=${encodeURIComponent(pathname)}`);
      }
      return;
    }

    // Recheck at action time: a subscription can expire after page load.
    try {
      const response = await fetch("/api/posters/premium-access", { cache: "no-store", credentials: "same-origin" });
      const data = response.ok ? await response.json() as { premium?: boolean } : null;
      if (data?.premium !== true) {
        setPremiumState("free");
        router.push(`/${locale}/upgrade?next=${encodeURIComponent(pathname)}`);
        return;
      }
    } catch {
      setPremiumState("free");
      return;
    }

    setIsSwitchingMode(true);
    replaceQuery({ brand: "1" });

    try {
      let brandedRootReady = false;

      for (let attempt = 0; attempt < 50; attempt += 1) {
        await sleep(100);

        // Important: wait for the NEW branded server render. The previous
        // standard poster is already marked ready=true and must not be used
        // to decide whether a company logo exists.
        const brandingRoot = document.querySelector(
          '[data-poster-branding-mode="branded"]',
        );

        if (!brandingRoot) {
          continue;
        }

        if (brandingRoot.getAttribute("data-poster-branding-ready") !== "true") {
          continue;
        }

        brandedRootReady = true;

        const hasCompanyLogo =
          brandingRoot.getAttribute("data-poster-company-logo") === "true";

        if (!hasCompanyLogo) {
          setBrandingNotice(
            isTurkish
              ? "Şirket logolu sürüm için Dashboard'daki kayıtlı logo yüklenemedi. Logo ayarlarını kontrol edip tekrar deneyin."
              : "The saved company logo could not be loaded for the branded version. Check branding settings and try again.",
          );
        }
        break;
      }

      if (!brandedRootReady) {
        setBrandingNotice(
          isTurkish
            ? "Logolu poster hazırlanamadı. Lütfen tekrar deneyin."
            : "The branded poster could not be prepared. Please try again.",
        );
      }
    } finally {
      setIsSwitchingMode(false);
    }
  }

  async function printCurrentPoster() {
    if (isSwitchingMode || isPreparingPrint) return;
    if (!(await requirePrintAuth(locale))) return;

    setPrintNotice(null);
    setIsPreparingPrint(true);
    try {
      const assetsReady = await waitForPosterAssets();
      if (!assetsReady) {
        setPrintNotice(isTurkish
          ? "Poster görselleri veya logo hazır değil. Lütfen tekrar deneyin."
          : "Poster images or branding are not ready. Please try again.");
        return;
      }

      if (brandedPoster) {
        const response = await fetch("/api/posters/premium-access", { cache: "no-store", credentials: "same-origin" });
        const data = response.ok ? await response.json() as { premium?: boolean } : null;
        if (data?.premium !== true) {
          setPremiumState("free");
          setPrintNotice(isTurkish ? "Premium erişiminiz aktif değil." : "Your Premium access is not active.");
          return;
        }
        const brandedRoot = document.querySelector(
          '[data-poster-branding-mode="branded"][data-poster-branding-ready="true"]',
        );
        if (!brandedRoot ||
          brandedRoot.getAttribute("data-poster-company-logo") !== "true") {
          setBrandingNotice(isTurkish
            ? "Kayıtlı şirket logosu logolu postere yüklenemedi. Logo ayarlarını kontrol edip tekrar deneyin."
            : "The saved company logo could not be loaded into the branded poster. Check branding settings and try again.");
          return;
        }
      }

      // A print-dialog request is not proof of a downloaded or saved PDF.
      // Client-side GA4 intent does not contain identifiers, URLs, or tokens.
      try {
        const gtag = (window as Window & {
          gtag?: (command: string, event: string, params: Record<string, string>) => void;
        }).gtag;
        gtag?.("event", "poster_print_requested", {
          locale,
          size: selectedSize,
          mode: brandedPoster ? "branded" : "standard",
        });
      } catch (error) {
        console.warn("Poster print intent measurement unavailable:", error);
      }

      window.print();
    } catch (error) {
      console.error("Poster print preparation failed:", error);
      setPrintNotice(isTurkish
        ? "Yazdırma penceresi açılamadı. Tekrar deneyin."
        : "Could not open the print dialog. Please try again.");
    } finally {
      setIsPreparingPrint(false);
    }
  }

  return (
    <div className="space-y-3">
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
              aria-pressed={selectedSize === size}
              disabled={isSwitchingMode || isPreparingPrint}
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
          onClick={() => void selectPosterMode(false)}
          disabled={isSwitchingMode || isPreparingPrint}
          aria-pressed={!brandedPoster}
          className={`rounded-xl px-5 py-3 text-sm font-black transition disabled:cursor-wait disabled:opacity-60 ${
            !brandedPoster
              ? "bg-blue-600 text-white shadow-sm"
              : "border border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          {isTurkish ? "Standart" : "Standard"}
        </button>

        <button
          type="button"
          onClick={() => void selectPosterMode(true)}
          disabled={premiumState === "loading" || isSwitchingMode || isPreparingPrint}
          aria-pressed={brandedPoster}
          className={`rounded-xl border px-5 py-3 text-sm font-black transition disabled:cursor-wait disabled:opacity-60 ${
            brandedPoster
              ? "border-amber-400 bg-amber-400 text-slate-950 shadow-sm"
              : "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
          }`}
        >
          {premiumState === "premium"
            ? `🏢 ${isTurkish ? "Logolu · Premium" : "Branded · Premium"}`
            : premiumState === "loading"
              ? isTurkish
                ? "Premium kontrol ediliyor..."
                : "Checking Premium..."
              : `🔒 ${isTurkish ? "Logolu · Premium" : "Branded · Premium"}`}
        </button>

        <button
          type="button"
          onClick={() => void printCurrentPoster()}
          aria-busy={isPreparingPrint}
          disabled={isSwitchingMode || isPreparingPrint}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60"
        >
          🖨 {isPreparingPrint
             ? (isTurkish ? "Poster hazırlanıyor..." : "Preparing poster...")
             : (isTurkish ? "Yazdır / PDF olarak kaydet" : "Print / Save as PDF")} · {selectedSize.toUpperCase()}
        </button>
      </div>

      <p className="text-center text-xs text-slate-600">
        {isTurkish
          ? 'Yazdırma penceresinde "PDF olarak kaydet" seçeneğini kullanabilirsiniz. İndirme otomatik başlamaz.'
          : 'Use "Save as PDF" in the print dialog. No file downloads automatically.'}
      </p>
      {printNotice ? <p role="alert" className="text-center text-sm font-semibold text-red-700">{printNotice}</p> : null}

      {brandingNotice ? (
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-950 sm:flex-row">
          <span>{brandingNotice}</span>
          <Link
            href={`/${locale}/dashboard`}
            className="font-black text-blue-700 underline underline-offset-2"
          >
            {isTurkish ? "Logo ayarlarını aç" : "Open branding settings"}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
