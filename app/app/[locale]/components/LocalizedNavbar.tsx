"use client";

import { useEffect, useState } from "react";
import { Link } from "../../../i18n/navigation";
import { createClient } from "../../../utils/supabase/client";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: "tr" | "en";
};

type MenuItem = {
  href: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  icon: string;
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

  const workspaceItems: MenuItem[] = [
    {
      href: "/dashboard",
      titleTr: "Dashboard",
      titleEn: "Dashboard",
      descriptionTr: "Tüm HSE çalışmalarınızı tek merkezden yönetin.",
      descriptionEn: "Manage your HSE workspace from one place.",
      icon: "▦",
    },
    {
      href: "/checklists",
      titleTr: "Denetimler",
      titleEn: "Inspections",
      descriptionTr: "Saha kontrolleri ve hazır denetim listeleri.",
      descriptionEn: "Field inspections and ready-to-use checklists.",
      icon: "✓",
    },
    {
      href: "/tools/quick-risk-assessment",
      titleTr: "Risk Analizi",
      titleEn: "Risk Assessment",
      descriptionTr: "Hazır risk kütüphanesi ile analiz oluşturun.",
      descriptionEn: "Create assessments using the risk library.",
      icon: "◇",
    },
    {
      href: "/tools/method-statement",
      titleTr: "Method Statement",
      titleEn: "Method Statement",
      descriptionTr: "Profesyonel çalışma yöntemi dokümanları.",
      descriptionEn: "Professional work method documents.",
      icon: "▤",
    },
  ];

  const toolItems: MenuItem[] = [
    {
      href: "/tools",
      titleTr: "Hesaplayıcılar",
      titleEn: "Calculators",
      descriptionTr: "TRIR, LTIFR, Risk Matrix ve diğer HSE araçları.",
      descriptionEn: "TRIR, LTIFR, Risk Matrix and other HSE tools.",
      icon: "∑",
    },
    {
      href: "/toolbox",
      titleTr: "Toolbox Talk",
      titleEn: "Toolbox Talk",
      descriptionTr: "Sahaya hazır TR / EN toolbox içerikleri.",
      descriptionEn: "Field-ready TR / EN toolbox talks.",
      icon: "◫",
    },
    {
      href: "/checklists",
      titleTr: "Checklistler",
      titleEn: "Checklists",
      descriptionTr: "İş öncesi ve saha kontrol listeleri.",
      descriptionEn: "Pre-job and field safety checklists.",
      icon: "☑",
    },
    {
      href: "/tools",
      titleTr: "SIMOPS Planner",
      titleEn: "SIMOPS Planner",
      descriptionTr: "Eş zamanlı operasyonları planlayın.",
      descriptionEn: "Plan simultaneous operations.",
      icon: "◎",
    },
  ];

  const resourceItems: MenuItem[] = [
    {
      href: "/knowledge-base",
      titleTr: "Rehberler",
      titleEn: "Guides",
      descriptionTr: "Pratik HSE bilgi ve saha rehberleri.",
      descriptionEn: "Practical HSE knowledge and field guides.",
      icon: "◈",
    },
    {
      href: "/posters",
      titleTr: "Poster & Levhalar",
      titleEn: "Posters & Signs",
      descriptionTr: "Profesyonel saha posterleri ve güvenlik levhaları.",
      descriptionEn: "Professional field posters and safety signs.",
      icon: "▣",
    },
    {
      href: "/downloads",
      titleTr: "İndirmeler",
      titleEn: "Downloads",
      descriptionTr: "Hazır doküman ve indirilebilir kaynaklar.",
      descriptionEn: "Ready documents and downloadable resources.",
      icon: "↓",
    },
  ];

  return (
    <nav className="relative z-50 border-b border-white/10 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        {/* BRAND */}
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
              SERNEM
            </div>

            <div className="truncate text-xs text-slate-500">
              {isTurkish
                ? "Profesyonel HSE Platform"
                : "Professional HSE Platform"}
            </div>
          </div>
        </Link>

        {/* DESKTOP QUICK NAV */}
        <div className="hidden items-center gap-1 xl:flex">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/tools/quick-risk-assessment"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
          >
            {isTurkish ? "Risk Analizi" : "Risk Assessment"}
          </Link>

          <Link
            href="/toolbox"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
          >
            Toolbox
          </Link>

          <Link
            href="/ai-assistant"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
          >
            {isTurkish ? "AI Asistan" : "AI Assistant"}
          </Link>
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
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.10] px-4 text-sm font-bold text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/[0.16]"
                    >
                      {isTurkish ? "Admin" : "Admin"}
                    </Link>
                  )}

                  <Link
                    href="/account"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500"
                  >
                    {isTurkish ? "Hesabım" : "Account"}
                  </Link>
                </div>
              ) : (
                <div className="hidden items-center gap-2 lg:flex">
                  <Link
                    href="/register"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-500"
                  >
                    {isTurkish ? "Kayıt Ol" : "Sign Up"}
                    <span className="ml-2">→</span>
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

          {/* GLOBAL MENU BUTTON */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="sernem-navigation"
            aria-label={
              isTurkish
                ? isMenuOpen
                  ? "Menüyü kapat"
                  : "Menüyü aç"
                : isMenuOpen
                  ? "Close menu"
                  : "Open menu"
            }
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-3.5 text-sm font-bold transition ${
              isMenuOpen
                ? "border-blue-400/40 bg-blue-600 text-white"
                : "border-white/15 bg-white/[0.05] text-slate-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="text-xl leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>

            <span className="hidden sm:inline">
              {isTurkish ? "Menü" : "Menu"}
            </span>
          </button>
        </div>
      </div>

      {/* MEGA MENU */}
      {isMenuOpen && (
        <div
          id="sernem-navigation"
          className="absolute left-0 right-0 top-full border-t border-white/10 bg-slate-950/98 shadow-[0_30px_80px_rgba(2,6,23,0.65)] backdrop-blur-xl"
        >
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:py-8">
            <div className="mb-6 flex items-center justify-between border-b border-white/[0.07] pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
                  SERNEM Workspace
                </p>

                <h2 className="mt-1 text-xl font-black text-white">
                  {isTurkish
                    ? "HSE çalışma alanınıza hızlı erişim"
                    : "Quick access to your HSE workspace"}
                </h2>
              </div>

              <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1 text-xs font-bold text-emerald-300 sm:block">
                ● LIVE
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* WORKSPACE */}
              <section>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {isTurkish ? "Çalışma Alanı" : "Workspace"}
                </p>

                <div className="grid gap-2">
                  {workspaceItems.map((item) => (
                    <Link
                      key={`${item.href}-${item.titleEn}`}
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5 transition hover:border-blue-400/20 hover:bg-blue-500/[0.07]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/[0.08] text-lg font-black text-blue-300">
                        {item.icon}
                      </div>

                      <div>
                        <div className="font-bold text-slate-100 transition group-hover:text-white">
                          {isTurkish ? item.titleTr : item.titleEn}
                        </div>

                        <div className="mt-0.5 text-xs leading-5 text-slate-500">
                          {isTurkish
                            ? item.descriptionTr
                            : item.descriptionEn}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* TOOLS */}
              <section>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {isTurkish ? "HSE Araçları" : "HSE Tools"}
                </p>

                <div className="grid gap-2">
                  {toolItems.map((item) => (
                    <Link
                      key={`${item.href}-${item.titleEn}`}
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5 transition hover:border-emerald-400/20 hover:bg-emerald-500/[0.06]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-500/[0.07] text-lg font-black text-emerald-300">
                        {item.icon}
                      </div>

                      <div>
                        <div className="font-bold text-slate-100 transition group-hover:text-white">
                          {isTurkish ? item.titleTr : item.titleEn}
                        </div>

                        <div className="mt-0.5 text-xs leading-5 text-slate-500">
                          {isTurkish
                            ? item.descriptionTr
                            : item.descriptionEn}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* RESOURCES / AI */}
              <section>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {isTurkish ? "Kaynaklar" : "Resources"}
                </p>

                <div className="grid gap-2">
                  {resourceItems.map((item) => (
                    <Link
                      key={`${item.href}-${item.titleEn}`}
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5 transition hover:border-violet-400/20 hover:bg-violet-500/[0.06]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/[0.07] text-lg font-black text-violet-300">
                        {item.icon}
                      </div>

                      <div>
                        <div className="font-bold text-slate-100 transition group-hover:text-white">
                          {isTurkish ? item.titleTr : item.titleEn}
                        </div>

                        <div className="mt-0.5 text-xs leading-5 text-slate-500">
                          {isTurkish
                            ? item.descriptionTr
                            : item.descriptionEn}
                        </div>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/ai-assistant"
                    onClick={closeMenu}
                    className="group mt-2 rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.08] to-blue-600/[0.08] p-4 transition hover:border-cyan-300/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">
                          SERNEM AI
                        </div>

                        <div className="mt-1 font-black text-white">
                          {isTurkish ? "AI Asistan" : "AI Assistant"}
                        </div>

                        <div className="mt-1 text-xs leading-5 text-slate-400">
                          {isTurkish
                            ? "Kaynaklı HSE rehberliği ve saha desteği."
                            : "Source-backed HSE guidance and field support."}
                        </div>
                      </div>

                      <span className="text-xl text-cyan-300 transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                </div>
              </section>
            </div>

            {/* MOBILE / ACCOUNT FOOTER */}
            <div className="mt-7 flex flex-col gap-2 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/account"
                      onClick={closeMenu}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/[0.08] hover:text-white"
                    >
                      {isTurkish ? "Hesabım" : "My Account"}
                    </Link>

                    {isOwner && (
                      <Link
                        href="/admin"
                        onClick={closeMenu}
                        className="rounded-lg border border-violet-400/20 bg-violet-500/[0.08] px-4 py-2.5 text-sm font-bold text-violet-200 transition hover:bg-violet-500/[0.14]"
                      >
                        {isTurkish ? "Admin Paneli" : "Admin Panel"}
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500"
                    >
                      {isTurkish ? "Kayıt Ol" : "Sign Up"}
                    </Link>

                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/[0.08] hover:text-white"
                    >
                      {isTurkish ? "Giriş Yap" : "Sign In"}
                    </Link>
                  </>
                )}
              </div>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg border border-red-400/15 bg-red-500/[0.05] px-4 py-2.5 text-sm font-bold text-red-200 transition hover:bg-red-500/[0.1]"
                >
                  {isTurkish ? "Çıkış Yap" : "Sign Out"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
