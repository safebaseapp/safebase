"use client";

import { useEffect, useState } from "react";
import { Link } from "../../../i18n/navigation";
import { createClient } from "../../../utils/supabase/client";
import LanguageSwitcher from "./LanguageSwitcher";
import ProductExplorer from "./ProductExplorer";
import SernemLogo from "./SernemLogo";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedNavbar({ locale }: Props) {
  const isTurkish = locale === "tr";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const closeDropdowns = () => {
    setIsToolsOpen(false);
    setIsResourcesOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    closeDropdowns();
  };

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

  const toolItems = [
    {
      href: "/tools/quick-risk-assessment",
      icon: "◇",
      title: isTurkish ? "Risk Analizi" : "Risk Assessment",
      description: isTurkish
        ? "Profesyonel HIRARC risk değerlendirmesi oluşturun."
        : "Build professional HIRARC risk assessments.",
    },
    {
      href: "/tools/method-statement",
      icon: "▤",
      title: "Method Statement",
      description: isTurkish
        ? "Profesyonel çalışma yöntemi dokümanları oluşturun."
        : "Create professional work method documents.",
    },
    {
      href: "/tools/risk-matrix",
      icon: "▦",
      title: isTurkish ? "Risk Matrisi" : "Risk Matrix",
      description: isTurkish
        ? "Olasılık ve şiddet ile risk seviyesini hesaplayın."
        : "Calculate risk level using likelihood and severity.",
    },
    {
      href: "/tools/trir",
      icon: "↗",
      title: "TRIR",
      description: isTurkish
        ? "Toplam Kaydedilebilir Olay Oranını hesaplayın."
        : "Calculate Total Recordable Incident Rate.",
    },
    {
      href: "/tools/ltifr",
      icon: "⌁",
      title: "LTIFR",
      description: isTurkish
        ? "Kayıp zamanlı yaralanma sıklık oranını hesaplayın."
        : "Calculate Lost Time Injury Frequency Rate.",
    },
    {
      href: "/tools/severity-rate",
      icon: "⚡",
      title: isTurkish ? "Şiddet Oranı" : "Severity Rate",
      description: isTurkish
        ? "Kayıp iş günlerinin şiddet etkisini ölçün."
        : "Measure the severity impact of lost workdays.",
    },
    {
      href: "/tools/simops",
      icon: "◎",
      title: "SIMOPS",
      description: isTurkish
        ? "Eş zamanlı operasyonları ve çalışma çakışmalarını yönetin."
        : "Manage simultaneous operations and work conflicts.",
    },
  ];

  const resourceItems = [
    {
      href: "/checklists",
      icon: "✓",
      title: isTurkish ? "Denetimler" : "Inspections",
      description: isTurkish
        ? "Saha kontrolleri ve yapılandırılmış checklistler."
        : "Field controls and structured checklists.",
    },
    {
      href: "/knowledge-base",
      icon: "◇",
      title: isTurkish ? "Rehberler" : "Guides",
      description: isTurkish
        ? "Profesyonel HSE bilgi ve saha rehberleri."
        : "Professional HSE knowledge and field guides.",
    },
    {
      href: "/toolbox",
      icon: "▣",
      title: "Toolbox Talk",
      description: isTurkish
        ? "Sahaya hazır TR / EN konuşma içerikleri."
        : "Field-ready TR / EN toolbox talks.",
    },
    {
      href: "/posters",
      icon: "▧",
      title: isTurkish ? "Poster & Levhalar" : "Posters & Signs",
      description: isTurkish
        ? "Profesyonel saha posterleri ve güvenlik levhaları."
        : "Professional field posters and safety signs.",
    },
  ];

  return (
    <nav className="relative z-50 border-b border-blue-400/[0.10] bg-[#020817] text-white shadow-[0_8px_35px_rgba(0,0,0,.28)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3.5 sm:px-6">
        {/* BRAND */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex min-w-0 shrink items-center gap-3.5 pr-5 xl:border-r xl:border-white/[0.08]"
        >
          <SernemLogo />

          <div className="min-w-0">
            <div className="text-[19px] font-black tracking-[-0.02em] text-white transition group-hover:text-blue-50">SERNEM</div>

            <div className="mt-0.5 truncate text-[11px] font-medium tracking-wide text-slate-500">
              {isTurkish
                ? "Profesyonel HSE Platform"
                : "Professional HSE Platform"}
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-1.5 xl:flex">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              onClick={closeDropdowns}
              className="relative rounded-xl px-4 py-2.5 text-[13px] font-bold text-slate-300 transition duration-200 hover:bg-blue-500/[0.07] hover:text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:scale-x-0 after:bg-blue-400 after:transition-transform hover:after:scale-x-100"
            >
              Dashboard
            </Link>
          )}

          {/* HSE TOOLS */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsToolsOpen((current) => !current);
                setIsResourcesOpen(false);
              }}
              className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-[13px] font-bold transition duration-200 ${
                isToolsOpen
                  ? "border-blue-400/25 bg-blue-500/[0.10] text-white shadow-[0_0_22px_rgba(37,99,235,.08)]"
                  : "border-transparent text-slate-300 hover:border-blue-400/10 hover:bg-blue-500/[0.06] hover:text-white"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-blue-400/15 bg-blue-500/[0.06] text-[12px] font-black text-blue-300">▦</span>
              {isTurkish ? "HSE Araçları" : "HSE Tools"}
              <span
                className={`text-[9px] text-slate-500 transition ${
                  isToolsOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isToolsOpen && (
              <div
                className="absolute left-1/2 top-[calc(100%+14px)] z-[300] -translate-x-1/2 overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/95 p-2 shadow-[0_25px_70px_rgba(0,0,0,.65)] backdrop-blur-2xl"
                style={{
                  width: "560px",
                  maxWidth: "calc(100vw - 32px)",
                }}
              >
                <div className="px-3 pb-2 pt-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.20em] text-blue-400">
                    {isTurkish ? "HSE Araçları" : "HSE Tools"}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    {isTurkish
                      ? "Analiz, dokümantasyon ve performans araçları."
                      : "Analysis, documentation and performance tools."}
                  </p>
                </div>

                <div className="mt-1 border-t border-white/[0.06] pt-2">
                  <div className="grid grid-cols-2 gap-1">
                    {toolItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={closeDropdowns}
                        className="group rounded-xl border border-transparent p-3 transition hover:border-blue-400/15 hover:bg-blue-500/[0.05]"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.06] text-base font-black text-blue-300">
                          {item.icon}
                        </span>

                        <span className="mt-3 block text-sm font-black text-slate-200 transition group-hover:text-white">
                          {item.title}
                        </span>

                        <span className="mt-1 block text-[11px] leading-5 text-slate-400">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RESOURCES */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsResourcesOpen((current) => !current);
                setIsToolsOpen(false);
              }}
              className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-[13px] font-bold transition duration-200 ${
                isResourcesOpen
                  ? "border-emerald-400/20 bg-emerald-500/[0.07] text-white"
                  : "border-transparent text-slate-300 hover:border-emerald-400/10 hover:bg-emerald-500/[0.05] hover:text-white"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-emerald-400/15 bg-emerald-500/[0.05] text-[12px] font-black text-emerald-300">▤</span>
              {isTurkish ? "Kaynaklar" : "Resources"}
              <span
                className={`text-[9px] text-slate-500 transition ${
                  isResourcesOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isResourcesOpen && (
              <div className="absolute left-1/2 top-[calc(100%+14px)] z-[300] w-[410px] -translate-x-1/2 overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/95 p-2 shadow-[0_25px_70px_rgba(0,0,0,.65)] backdrop-blur-2xl">
                <div className="px-3 pb-2 pt-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.20em] text-emerald-400">
                    {isTurkish ? "Saha Kaynakları" : "Field Resources"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={closeDropdowns}
                      className="group rounded-xl border border-transparent p-3 transition hover:border-emerald-400/15 hover:bg-emerald-500/[0.05]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/[0.06] text-base font-black text-emerald-300">
                        {item.icon}
                      </span>

                      <span className="mt-3 block text-sm font-black text-slate-200 transition group-hover:text-white">
                        {item.title}
                      </span>

                      <span className="mt-1 block text-[11px] leading-5 text-slate-400">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/ai-assistant"
            onClick={closeDropdowns}
            className="relative rounded-xl px-4 py-2.5 text-[13px] font-bold text-slate-300 transition duration-200 hover:bg-blue-500/[0.07] hover:text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:scale-x-0 after:bg-blue-400 after:transition-transform hover:after:scale-x-100"
          >
            <span className="text-violet-300 transition group-hover:text-violet-200">✦</span>{isTurkish ? "AI Asistan" : "AI Assistant"}
          </Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex shrink-0 items-center gap-2 border-l border-white/[0.08] pl-4 sm:gap-2.5">
          <LanguageSwitcher locale={locale} />

          {!isAuthLoading && (
            <>
              {isAuthenticated ? (
                <div className="hidden items-center gap-2 lg:flex">
                  {isOwner && (
                    <Link
                      href="/admin"
                      onClick={closeDropdowns}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.08] px-4 text-[13px] font-black text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,.03)] transition hover:border-violet-400/40 hover:bg-violet-500/[0.14]"
                    >
                      Admin
                    </Link>
                  )}

                  <Link
                    href="/account"
                    onClick={closeDropdowns}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-b from-blue-500 to-blue-600 px-5 text-[13px] font-black text-white shadow-[0_8px_25px_rgba(37,99,235,.22)] transition hover:-translate-y-px hover:from-blue-400 hover:to-blue-600"
                  >
                    {isTurkish ? "Hesabım" : "Account"}
                  </Link>
                </div>
              ) : (
                <div className="hidden items-center gap-2 lg:flex">
                  <Link
                    href="/register"
                    onClick={closeDropdowns}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-b from-blue-500 to-blue-600 px-5 text-[13px] font-black text-white shadow-[0_8px_25px_rgba(37,99,235,.22)] transition hover:-translate-y-px hover:from-blue-400 hover:to-blue-600"
                  >
                    {isTurkish ? "Kayıt Ol" : "Sign Up"}
                    <span className="ml-2">→</span>
                  </Link>

                  <Link
                    href="/login"
                    onClick={closeDropdowns}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.025] px-5 text-[13px] font-black text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white"
                  >
                    {isTurkish ? "Giriş Yap" : "Sign In"}
                  </Link>
                </div>
              )}
            </>
          )}

          {!isAuthenticated && (
            <Link
              href="/login"
              onClick={closeDropdowns}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.025] px-3 text-[12px] font-black text-slate-200 transition hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white lg:hidden"
            >
              {isTurkish ? "Giriş" : "Sign In"}
            </Link>
          )}

          {/* PRODUCT EXPLORER */}
          <button
            type="button"
            onClick={() => {
              closeDropdowns();
              setIsMenuOpen((current) => !current);
            }}
            aria-expanded={isMenuOpen}
            aria-controls="sernem-navigation"
            className={`inline-flex h-11 items-center justify-center gap-2.5 rounded-xl border px-4 text-[13px] font-black transition duration-200 ${
              isMenuOpen
                ? "border-blue-400/40 bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,.18)]"
                : "border-white/[0.12] bg-white/[0.025] text-slate-300 hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white"
            }`}
          >
            <span className="text-xl leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>

            <span className="hidden sm:inline">
              {isTurkish ? "Keşfet" : "Explore"}
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <ProductExplorer locale={locale} onClose={closeMenu} />
      )}
    </nav>
  );
}
