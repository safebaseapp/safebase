"use client";

import { useState } from "react";
import { Link } from "../../../i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedNavbar({ locale }: Props) {
  const isTurkish = locale === "tr";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navigationItems = [
    {
      href: "/dashboard",
      label: "📊 Dashboard",
      highlighted: true,
    },
    {
      href: "/tools",
      label: isTurkish ? "Araçlar" : "Tools",
    },
    {
      href: "/ai-assistant",
      label: `🤖 ${isTurkish ? "Yapay Zekâ Asistanı" : "AI Assistant"}`,
      highlighted: true,
    },
    {
      href: "/knowledge-base",
      label: `📚 ${isTurkish ? "Bilgi Merkezi" : "Knowledge Base"}`,
    },
    {
      href: "/downloads",
      label: `⬇️ ${isTurkish ? "İndirmeler" : "Downloads"}`,
    },
    {
      href: "/#about",
      label: isTurkish ? "Hakkımızda" : "About",
    },
    {
      href: "/#contact",
      label: isTurkish ? "İletişim" : "Contact",
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
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 font-bold text-white sm:h-10 sm:w-10">
            S
          </div>

          <div className="min-w-0">
            <div className="text-lg font-bold tracking-tight">SafeBase</div>
            <div className="truncate text-xs text-slate-400">
              {isTurkish
                ? "İş güvenliği araçları ve kaynakları"
                : "Safety tools and resources"}
            </div>
          </div>
        </Link>

        {/* Masaüstü menü */}
        <div className="hidden items-center gap-8 text-slate-300 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.highlighted
                  ? "font-semibold text-blue-400 transition hover:text-blue-300"
                  : "transition hover:text-blue-400"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} />

          <Link
            href="/tools"
            className="hidden rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
          >
            {isTurkish ? "Keşfet" : "Explore"}
          </Link>

          {/* Mobil hamburger */}
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-2xl text-white transition hover:bg-white/10 lg:hidden"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobil açılır menü */}
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
                className={
                  item.highlighted
                    ? "rounded-xl border border-blue-400/15 bg-blue-500/[0.08] px-4 py-3.5 font-semibold text-blue-300 transition hover:bg-blue-500/[0.14]"
                    : "rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3.5 font-medium text-slate-200 transition hover:bg-white/[0.07] hover:text-blue-300"
                }
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/tools"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-500"
            >
              {isTurkish ? "Araçları Keşfet" : "Explore Tools"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
