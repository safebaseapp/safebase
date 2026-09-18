"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
  printLabel: string;
  libraryLabel: string;
  libraryHref: string;
  pdfHref: string;
};

export default function ToolboxActions({
  printLabel,
  libraryLabel,
  libraryHref,
  pdfHref,
}: Props) {
  const locale: "tr" | "en" = libraryHref.startsWith("/tr/") ? "tr" : "en";
  const isTurkish = locale === "tr";
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHref = useMemo(
    () => `/${locale}/login?next=${encodeURIComponent(pdfHref)}`,
    [locale, pdfHref],
  );

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const syncUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
    };

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setIsAuthenticated(Boolean(session?.user));
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="print:hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {isLoading ? (
          <div className="inline-flex min-h-12 w-full animate-pulse items-center justify-center rounded-xl bg-slate-700 px-5 py-3 text-sm font-black text-slate-300 sm:w-auto">
            {isTurkish ? "Hesap kontrol ediliyor…" : "Checking account…"}
          </div>
        ) : isAuthenticated ? (
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-500 sm:w-auto"
          >
            📄 {printLabel}
          </a>
        ) : (
          <Link
            href={loginHref}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-500 sm:w-auto"
          >
            🔒 {isTurkish ? "PDF için ücretsiz giriş yap" : "Sign in free for PDF"}
          </Link>
        )}

        <Link
          href={libraryHref}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
        >
          ← {libraryLabel}
        </Link>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {isTurkish
          ? "Önizleme herkese açık. Standart PDF indirmek için ücretsiz SERNEM hesabı gerekir."
          : "Preview is public. A free SERNEM account is required to download the standard PDF."}
      </p>
    </div>
  );
}
