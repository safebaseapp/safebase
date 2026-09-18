"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  locale: "tr" | "en";
};

export default function MobileAuthBar({ locale }: Props) {
  const isTurkish = locale === "tr";
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const syncUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(Boolean(user));
      setIsOwner(
        user?.email?.trim().toLowerCase() === "safebase.global@gmail.com"
      );
      setIsLoading(false);
    };

    syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setIsAuthenticated(Boolean(user));
      setIsOwner(
        user?.email?.trim().toLowerCase() === "safebase.global@gmail.com"
      );
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setIsOwner(false);
    router.push(`/${locale}`);
    router.refresh();
  }

  if (pathname?.includes("/login") || pathname?.includes("/register")) {
    return null;
  }

  return (
    <div className="border-b border-white/[0.07] bg-[#020817] px-4 py-2 lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-2">
        {isLoading ? (
          <div className="h-9 w-28 animate-pulse rounded-xl bg-white/[0.05]" />
        ) : isAuthenticated ? (
          <>
            {isOwner && (
              <Link
                href={`/${locale}/admin`}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/[0.08] px-3 text-xs font-black text-violet-200"
              >
                Admin
              </Link>
            )}

            <Link
              href={`/${locale}/account`}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.08] px-3 text-xs font-black text-blue-100"
            >
              {isTurkish ? "Hesabım" : "Account"}
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-red-400/15 bg-red-500/[0.06] px-3 text-xs font-black text-red-200"
            >
              {isTurkish ? "Çıkış" : "Sign out"}
            </button>
          </>
        ) : (
          <>
            <Link
              href={`/${locale}/login`}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-600 px-4 text-xs font-black text-white shadow-[0_8px_22px_rgba(37,99,235,.18)]"
            >
              {isTurkish ? "Giriş Yap" : "Sign in"}
            </Link>

            <Link
              href={`/${locale}/register`}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 text-xs font-black text-slate-200"
            >
              {isTurkish ? "Kayıt Ol" : "Sign up"}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
