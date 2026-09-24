"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { isAdminUser } from "@/lib/auth/access";
import { requirePrintAuth } from "@/lib/auth/require-print-auth";

type Props = {
  locale: "tr" | "en";
};

type PremiumState = "loading" | "premium" | "free";
type PosterSize = "a4" | "a3";

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function waitForPosterAssets() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const pendingBranding = document.querySelector(
      '[data-poster-branding-ready="false"]',
    );
    if (!pendingBranding) break;
    await sleep(100);
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
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

  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
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

    setIsSwitchingMode(true);
    replaceQuery({ brand: "1" });

    try {
      for (let attempt = 0; attempt < 50; attempt += 1) {
        await sleep(100);
        const brandingRoot = document.querySelector(
          "[data-poster-branding-ready]",
        );
        if (brandingRoot?.getAttribute("data-poster-branding-ready") !== "true") {
          continue;
        }

        const hasCompanyLogo =
          brandingRoot.getAttribute("data-poster-company-logo") === "true";

        if (!hasCompanyLogo) {
          setBrandingNotice(
            isTurkish
              ? "Şirket logolu sürüm için önce Dashboard'dan logonuzu yükleyin."
              : "Upload your company logo in the Dashboard before using company branding.",
          );

          const params = new URLSearchParams(window.location.search);
          params.delete("brand");
          const query = params.toString();
          router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
          });
        }
        break;
      }
    } finally {
      setIsSwitchingMode(false);
    }
  }

  async function printCurrentPoster() {
    if (isSwitchingMode) return;
    if (!(await requirePrintAuth(locale))) return;

    await waitForPosterAssets();

    if (
      brandedPoster &&
      !document.querySelector('[data-poster-company-logo="true"]')
    ) {
      setBrandingNotice(
        isTurkish
          ? "Şirket logolu sürüm için önce Dashboard'dan logonuzu yükleyin."
          : "Upload your company logo in the Dashboard before printing the company-branded version.",
      );
      return;
    }

    window.print();
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
              disabled={isSwitchingMode}
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
          disabled={isSwitchingMode}
          aria-pressed={!brandedPoster}
          className={`rounded-xl px-5 py-3 text-sm font-black transition disabled:cursor-wait disabled:opacity-60 ${
            !brandedPoster
              ? "bg-blue-600 text-white shadow-sm"
              : "border border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          PDF
        </button>

        <button
          type="button"
          onClick={() => void selectPosterMode(true)}
          disabled={premiumState === "loading" || isSwitchingMode}
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
          disabled={isSwitchingMode}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600 disabled:cursor-wait disabled:opacity-60"
        >
          🖨 {isTurkish ? "Yazdır" : "Print"} · {selectedSize.toUpperCase()}
        </button>
      </div>

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
