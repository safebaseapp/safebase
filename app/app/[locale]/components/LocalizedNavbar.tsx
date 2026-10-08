"use client";

import { useEffect, useState } from "react";
import { LogOut, PanelsTopLeft, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "../../../i18n/navigation";
import { createClient } from "../../../utils/supabase/client";
import LanguageSwitcher from "./LanguageSwitcher";
import ProductExplorer from "./ProductExplorer";
import SernemLogo from "./SernemLogo";
import GlobalSearch from "./GlobalSearch";
import MobileMainMenu from "./MobileMainMenu";
import DesktopMegaMenu from "./DesktopMegaMenu";

const OWNER_EMAIL = "safebase.global@gmail.com";

function isOwnerUser(user: { email?: string | null } | null | undefined) {
  return user?.email?.trim().toLowerCase() === OWNER_EMAIL;
}

type Props = {
  locale: "tr" | "en";
  initialIsAuthenticated?: boolean;
  initialIsOwner?: boolean;
};

export default function LocalizedNavbar({ locale, initialIsAuthenticated = false, initialIsOwner = false }: Props) {
  const isTurkish = locale === "tr";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMainNavOpen, setIsMainNavOpen] = useState(false);
  const [isDesktopNavOpen, setIsDesktopNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [isOwner, setIsOwner] = useState(initialIsOwner);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const closeDropdowns = () => {
    setIsToolsOpen(false);
    setIsResourcesOpen(false);
  };

  const closeAccount = () => {
    setIsAccountOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMainNavOpen(false);
    setIsDesktopNavOpen(false);
    closeDropdowns();
    closeAccount();
  };

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const sessionUser = session?.user ?? null;
      setIsAuthenticated(Boolean(sessionUser));
      setIsOwner(isOwnerUser(sessionUser));

      if (sessionUser) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // Mobile Safari can transiently return no user while a valid local
        // session is already available. Never erase a confirmed owner session.
        if (user) {
          setIsAuthenticated(true);
          setIsOwner(isOwnerUser(user));
        }
      }

      setIsAuthLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
      setIsOwner(isOwnerUser(session?.user));
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
      description: isTurkish ? "Profesyonel HIRARC risk değerlendirmesi oluşturun." : "Build professional HIRARC risk assessments.",
    },
    {
      href: "/tools/method-statement",
      icon: "▤",
      title: "Method Statement",
      description: isTurkish ? "Profesyonel çalışma yöntemi dokümanları oluşturun." : "Create professional work method documents.",
    },
    {
      href: "/safety-pack",
      icon: "◆",
      title: "Safety Packs",
      description: isTurkish ? "Rehber, toolbox, denetim ve araçları tek saha akışında birleştirin." : "Connect guides, toolbox talks, inspections and tools in one field workflow.",
    },
    {
      href: "/ppe-standards",
      icon: "◈",
      title: isTurkish ? "KKD Standartları" : "PPE Standards",
      description: isTurkish ? "EN/EN ISO kodlarını, sınıfları ve saha kontrollerini ürün üzerinden okuyun." : "Read EN/EN ISO codes, classes and field checks directly from PPE products.",
    },
    {
      href: "/tools/risk-matrix",
      icon: "▦",
      title: isTurkish ? "Risk Matrisi" : "Risk Matrix",
      description: isTurkish ? "Olasılık ve şiddet ile risk seviyesini hesaplayın." : "Calculate risk level using likelihood and severity.",
    },
    {
      href: "/tools/trir",
      icon: "↗",
      title: "TRIR",
      description: isTurkish ? "Toplam Kaydedilebilir Olay Oranını hesaplayın." : "Calculate Total Recordable Incident Rate.",
    },
    {
      href: "/tools/ltifr",
      icon: "⌁",
      title: "LTIFR",
      description: isTurkish ? "Kayıp zamanlı yaralanma sıklık oranını hesaplayın." : "Calculate Lost Time Injury Frequency Rate.",
    },
    {
      href: "/tools/severity-rate",
      icon: "⚡",
      title: isTurkish ? "Şiddet Oranı" : "Severity Rate",
      description: isTurkish ? "Kayıp iş günlerinin şiddet etkisini ölçün." : "Measure the severity impact of lost workdays.",
    },
    {
      href: "/tools/simops",
      icon: "◎",
      title: "SIMOPS",
      description: isTurkish ? "Eş zamanlı operasyonları ve çalışma çakışmalarını yönetin." : "Manage simultaneous operations and work conflicts.",
    },
  ];

  const resourceItems = [
    {
      href: "/safety-pack",
      icon: "◆",
      title: "Safety Packs",
      description: isTurkish ? "Bir iş için gerekli HSE kaynaklarını tek pakette açın." : "Open the HSE resources for one task in a single pack.",
    },
    {
      href: "/checklists",
      icon: "✓",
      title: isTurkish ? "Denetimler" : "Inspections",
      description: isTurkish ? "Saha kontrolleri ve yapılandırılmış checklistler." : "Field controls and structured checklists.",
    },
    {
      href: "/knowledge-base",
      icon: "◇",
      title: isTurkish ? "Rehberler" : "Guides",
      description: isTurkish ? "Profesyonel HSE bilgi ve saha rehberleri." : "Professional HSE knowledge and field guides.",
    },
    {
      href: "/toolbox",
      icon: "▣",
      title: "Toolbox Talk",
      description: isTurkish ? "Sahaya hazır TR / EN konuşma içerikleri." : "Field-ready TR / EN toolbox talks.",
    },
    {
      href: "/posters",
      icon: "▧",
      title: isTurkish ? "Posterler" : "Posters",
      description: isTurkish ? "Profesyonel ve yazdırılabilir HSE saha posterleri." : "Professional printable HSE field posters.",
    },
    {
      href: "/safety-signs",
      icon: "!",
      title: isTurkish ? "Güvenlik Levhaları" : "Safety Signs",
      description: isTurkish ? "A4, A3 ve PNG formatlarında güvenlik levhaları." : "Safety signs available in A4, A3 and PNG formats.",
    },
    {
      href: "/downloads",
      icon: "↓",
      title: isTurkish ? "İndirme Merkezi" : "Download Center",
      description: isTurkish ? "Kullanıma hazır profesyonel HSE dokümanlarını indirin." : "Download ready-to-use professional HSE documents.",
    },
  ];

  return (
    <nav className="relative z-50 border-b border-blue-400/[0.10] bg-[#020817] text-white shadow-[0_8px_35px_rgba(0,0,0,.28)]">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3.5 sm:px-6">
        <Link href="/" onClick={closeMenu} className="-ml-3 sm:ml-0 group flex min-w-0 shrink items-center gap-3.5 pr-5 xl:border-r xl:border-white/[0.08]">
          <SernemLogo />
          <div className="min-w-0">
            <div className="text-[19px] font-black tracking-[-0.02em] text-white transition group-hover:text-blue-50">SERNEM</div>
            <div className="hidden sm:block mt-0.5 truncate text-[11px] font-medium tracking-wide text-slate-500">
              {isTurkish ? "Profesyonel HSE Platform" : "Professional HSE Platform"}
            </div>
          </div>
        </Link>

        <div className="hidden items-center xl:flex">
          <button
            type="button"
            onClick={() => {
              setIsDesktopNavOpen((current) => !current);
              setIsMenuOpen(false);
              closeDropdowns();
              closeAccount();
            }}
            aria-expanded={isDesktopNavOpen}
            className={`inline-flex h-11 items-center gap-2.5 rounded-xl border px-4 text-[13px] font-black transition ${
              isDesktopNavOpen
                ? "border-sky-400/30 bg-sky-500/[0.10] text-white shadow-[0_10px_28px_rgba(14,165,233,.12)]"
                : "border-white/[0.10] bg-white/[0.025] text-slate-300 hover:border-sky-400/20 hover:bg-sky-500/[0.05] hover:text-white"
            }`}
          >
            <PanelsTopLeft size={17} />
            {isTurkish ? "Platform" : "Platform"}
            <span className={`text-[9px] text-slate-500 transition ${isDesktopNavOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
        </div>

        <div className="ml-auto hidden min-w-[320px] flex-1 justify-end px-3 xl:flex 2xl:min-w-[420px]">
          <div className="w-full max-w-[440px]">
            <GlobalSearch locale={locale} />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 border-l border-white/[0.08] pl-4 sm:gap-2.5">
          <div className="xl:hidden">
            <GlobalSearch locale={locale} compact />
          </div>

          <LanguageSwitcher locale={locale} />

          <Link
            href="/upgrade"
            onClick={closeDropdowns}
            className="hidden h-11 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-300/[0.035] px-3.5 text-[12px] font-bold text-amber-100/90 transition hover:border-amber-300/25 hover:bg-amber-300/[0.07] hover:text-amber-50 lg:inline-flex"
          >
            <span className="mr-1.5 text-[11px] text-amber-300">✦</span>
            Premium
          </Link>

          {!isAuthLoading && (
            <>
              {isAuthenticated ? (
                <div className="hidden items-center gap-2 lg:flex">
                  {isOwner && (
                    <Link href="/admin" onClick={closeDropdowns} className="inline-flex h-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.08] px-4 text-[13px] font-black text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,.03)] transition hover:border-violet-400/40 hover:bg-violet-500/[0.14]">Admin</Link>
                  )}
                  <Link href="/account" onClick={closeDropdowns} className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-b from-blue-500 to-blue-600 px-5 text-[13px] font-black text-white shadow-[0_8px_25px_rgba(37,99,235,.22)] transition hover:-translate-y-px hover:from-blue-400 hover:to-blue-600">{isTurkish ? "Hesap" : "Account"}</Link>
                </div>
              ) : (
                <div className="hidden items-center gap-2 lg:flex">
                  <Link href="/register" onClick={closeDropdowns} className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-b from-blue-500 to-blue-600 px-5 text-[13px] font-black text-white shadow-[0_8px_25px_rgba(37,99,235,.22)] transition hover:-translate-y-px hover:from-blue-400 hover:to-blue-600">
                    {isTurkish ? "Kayıt Ol" : "Sign Up"}<span className="ml-2">→</span>
                  </Link>
                  <Link href="/login" onClick={closeDropdowns} className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.025] px-5 text-[13px] font-black text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white">{isTurkish ? "Giriş Yap" : "Sign In"}</Link>
                </div>
              )}
            </>
          )}

          {isAuthenticated ? (
            <div className="relative lg:hidden">
              <button
                type="button"
                onClick={() => {
                  closeDropdowns();
                  setIsMenuOpen(false);
                  setIsMainNavOpen(false);
                  setIsAccountOpen((current) => !current);
                }}
                aria-expanded={isAccountOpen}
                aria-label={isTurkish ? "Hesap menüsü" : "Account menu"}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition duration-200 ${isAccountOpen ? "border-blue-400/35 bg-blue-500/[0.14] text-white shadow-[0_8px_24px_rgba(37,99,235,.14)]" : "border-white/[0.12] bg-white/[0.025] text-slate-300 hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white"}`}
              >
                <UserRound size={18} strokeWidth={2} />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-[500] w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#07101f]/[0.99] p-2 shadow-[0_24px_70px_rgba(0,0,0,.62)] backdrop-blur-2xl">
                  <div className="px-3 pb-2 pt-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      {isTurkish ? "Hesap" : "Account"}
                    </div>
                  </div>

                  <Link
                    href="/account"
                    onClick={closeAccount}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-black text-slate-200 transition hover:bg-blue-500/[0.07] hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.07] text-blue-300">
                      <UserRound size={16} />
                    </span>
                    {isTurkish ? "Hesabım" : "My Account"}
                  </Link>

                  {isOwner && (
                    <Link
                      href="/admin"
                      onClick={closeAccount}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-black text-slate-200 transition hover:bg-violet-500/[0.08] hover:text-white"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.07] text-violet-300">
                        <ShieldCheck size={16} />
                      </span>
                      {isTurkish ? "Yönetim" : "Admin"}
                    </Link>
                  )}

                  <div className="my-1 border-t border-white/[0.07]" />

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-black text-red-200 transition hover:bg-red-500/[0.07]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/15 bg-red-500/[0.06] text-red-300">
                      <LogOut size={16} />
                    </span>
                    {isTurkish ? "Çıkış Yap" : "Sign Out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" onClick={closeDropdowns} className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.025] px-3 text-[12px] font-black text-slate-200 transition hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white lg:hidden">{isTurkish ? "Giriş" : "Sign In"}</Link>
          )}

          {isOwner && (
            <Link
              href="/admin"
              onClick={closeMenu}
              aria-label={isTurkish ? "Yönetim" : "Admin"}
              title={isTurkish ? "Yönetim" : "Admin"}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.08] px-3 text-[11px] font-black text-violet-200 transition duration-200 hover:border-violet-400/40 hover:bg-violet-500/[0.14] hover:text-white lg:hidden"
            >
              Admin
            </Link>
          )}

          <button
            type="button"
            onClick={() => {
              closeDropdowns();
              closeAccount();
              setIsMenuOpen(false);
              setIsMainNavOpen((current) => !current);
            }}
            aria-expanded={isMainNavOpen}
            aria-controls="sernem-main-navigation"
            aria-label={isTurkish ? "Ana menü" : "Main menu"}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition duration-200 lg:hidden ${isMainNavOpen ? "border-cyan-400/35 bg-cyan-500/[0.12] text-white shadow-[0_8px_24px_rgba(8,145,178,.14)]" : "border-white/[0.12] bg-white/[0.025] text-slate-300 hover:border-cyan-400/20 hover:bg-cyan-500/[0.05] hover:text-white"}`}
          >
            <PanelsTopLeft size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => {
              closeDropdowns();
              closeAccount();
              setIsMainNavOpen(false);
              setIsMenuOpen((current) => !current);
            }}
            aria-expanded={isMenuOpen}
            aria-controls="sernem-navigation"
            className={`inline-flex h-11 items-center justify-center gap-2.5 rounded-xl border px-4 text-[13px] font-black transition duration-200 ${isMenuOpen ? "border-blue-400/40 bg-blue-600 text-white shadow-[0_8px_24px_rgba(37,99,235,.18)]" : "border-white/[0.12] bg-white/[0.025] text-slate-300 hover:border-blue-400/20 hover:bg-blue-500/[0.05] hover:text-white"}`}
          >
            <span className="text-xl leading-none">{isMenuOpen ? "×" : "☰"}</span>
            <span className="hidden sm:inline">{isTurkish ? "Keşfet" : "Explore"}</span>
          </button>
        </div>
      </div>

      {isDesktopNavOpen && (
        <DesktopMegaMenu
          locale={locale}
          authenticated={isAuthenticated}
          onClose={() => setIsDesktopNavOpen(false)}
        />
      )}

      {isMainNavOpen && (
        <div id="sernem-main-navigation">
          <MobileMainMenu
            locale={locale}
            authenticated={isAuthenticated}
            owner={isOwner && isAuthenticated}
            onClose={() => setIsMainNavOpen(false)}
          />
        </div>
      )}

      {isMenuOpen && <ProductExplorer locale={locale} onClose={closeMenu} />}
    </nav>
  );
}
