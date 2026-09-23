"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { isAdminUser } from "@/lib/auth/access";
import { requirePrintAuth } from "@/lib/auth/require-print-auth";

type Props = {
  locale: "tr" | "en";
};

type PremiumState = "loading" | "premium" | "free";

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

export default function PosterFormatToolbar({ locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isTurkish = locale === "tr";
  const selectedSize = searchParams.get("size") === "a4" ? "a4" : "a3";
  const brandedPoster = searchParams.get("brand") === "1";
  const [premiumState, setPremiumState] = useState<PremiumState>("loading");

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

  function selectSize(size: "a4" | "a3") {
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

  async function printPoster(size: "a4" | "a3") {
    if (!(await requirePrintAuth(locale))) return;

    selectSize(size);
    await sleep(450);
    await waitForPosterAssets();
    window.print();
  }

  async function printCurrentPoster() {
    if (!(await requirePrintAuth(locale))) return;

    await waitForPosterAssets();
    window.print();
  }

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
        onClick={() => void printPoster("a4")}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
      >
        ↓ {isTurkish ? "A4 PDF Kaydet" : "Save A4 PDF"}
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
        onClick={() => void printPoster("a3")}
        className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        ↓ {isTurkish ? "A3 PDF Kaydet" : "Save A3 PDF"}
      </button>

      <button
        type="button"
        onClick={toggleBranding}
        disabled={premiumState === "loading"}
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
        className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-blue-400 hover:text-blue-600"
      >
        🖨 {isTurkish ? "Yazdır" : "Print"}
      </button>
    </div>
  );
}
