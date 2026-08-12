"use client";

import { useEffect, useState } from "react";
import { Link } from "../../../i18n/navigation";
import { createClient } from "../../../utils/supabase/client";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedNavbar({ locale }: Props) {
  const isTurkish = locale === "tr";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(Boolean(user));
      setIsOwner(
        user?.email?.trim().toLowerCase() === "safebase.global@gmail.com"
      );
      setIsAuthLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
      setIsOwner(
        session?.user?.email?.trim().toLowerCase() ===
          "safebase.global@gmail.com"
      );
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    const supabase = createClient();

    await supabase.auth.signOut();

    setIsAuthenticated(false);
    setIsOwner(false);
    closeMenu();

    window.location.href = `/${locale}`;
  }

  const navigationItems = [
    {
      href: "/tools",
      label: isTurkish ? "Araçlar" : "Tools",
    },
    {
      href: "/knowledge-base",
      label: isTurkish ? "Kaynaklar" : "Resources",
    },
    {
      href: "/downloads",
      label: isTurkish ? "Keşfet" : "Explore",
    },
  ];

  return (
    <nav className="relative z-50 border-b border-white/10 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex min-w-0 shrink items-center gap-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-black text-white shadow-lg shadow-blue-950/20">
            S
          </div>

          <div className="min-w-0">
            <div className="text-lg font-black tracking-tight">
              SafeBase
            </div>

            <div className="truncate text-xs text-slate-500">
              {isTurkish
                ? "Profesyonel HSE Platform"
                : "Professional HSE Platform"}
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-300 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
              <span className="ml-1.5 text-slate-600">⌄</span>
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="transition hover:text-white"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} />

          {!isAuthLoading && (
            <>
              {isAuthenticated ? (
                <div className="hidden items-center gap-2 lg:flex">
                  {isOwner && (
                    <Link
                      href="/admin"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.10] px-5 text-sm font-bold text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/[0.16]"
                    >
                      {isTurkish ? "Admin Paneli" : "Admin Panel"}
                    </Link>
                  )}

                  <Link
                    href="/account"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500"
                  >
                    {isTurkish ? "Hesabım" : "My Account"}
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.035] px-5 text-sm font-bold text-slate-200 transition hover:border-red-400/30 hover:bg-red-500/[0.08] hover:text-red-200"
                  >
                    {isTurkish ? "Çıkış Yap" : "Sign Out"}
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-2 lg:flex">
                  <Link
                    href="/register"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500"
                  >
                    {isTurkish ? "Kayıt Ol" : "Sign Up"}
                    <span className="ml-2" aria-hidden="true">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/login"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.035] px-5 text-sm font-bold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                  >
                    {isTurkish ? "Giriş Yap" : "Sign In"}
                  </Link>
                </div>
              )}
            </>
          )}

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isTurkish
                ? isMenuOpen
                  ? "Menüyü kapat"
                  : "Menüyü aç"
                : isMenuOpen
                  ? "Close menu"
                  : "Open menu"
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-xl text-white transition hover:bg-white/10 lg:hidden"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-slate-950 px-5 pb-6 pt-3 shadow-2xl lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3.5 font-medium text-slate-200 transition hover:bg-white/[0.07] hover:text-blue-300"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                {isOwner && (
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="mt-2 rounded-xl border border-violet-400/25 bg-violet-500/[0.10] px-5 py-4 text-center font-bold text-violet-200 transition hover:bg-violet-500/[0.16]"
                  >
                    {isTurkish ? "Admin Paneli" : "Admin Panel"}
                  </Link>
                )}

                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="mt-2 rounded-xl bg-blue-600 px-5 py-4 text-center font-bold text-white transition hover:bg-blue-500"
                >
                  {isTurkish ? "Hesabım" : "My Account"}
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-xl border border-red-400/20 bg-red-500/[0.06] px-5 py-4 font-bold text-red-200 transition hover:bg-red-500/[0.1]"
                >
                  {isTurkish ? "Çıkış Yap" : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="mt-2 rounded-xl bg-blue-600 px-5 py-4 text-center font-bold text-white transition hover:bg-blue-500"
                >
                  {isTurkish ? "Kayıt Ol" : "Sign Up"} →
                </Link>

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center font-bold text-white transition hover:bg-white/[0.08]"
                >
                  {isTurkish ? "Giriş Yap" : "Sign In"}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
