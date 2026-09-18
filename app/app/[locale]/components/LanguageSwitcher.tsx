"use client";

import {useTransition} from "react";
import {Link, usePathname, useRouter} from "../../../i18n/navigation";

type Props = {
  locale: "tr" | "en";
};

export default function LanguageSwitcher({locale}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: "tr" | "en") {
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-xl border border-white/15 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => changeLocale("tr")}
          disabled={isPending}
          className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition sm:px-3 sm:py-2 sm:text-sm ${
            locale === "tr"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          aria-label="Türkçe"
        >
          TR
        </button>

        <button
          type="button"
          onClick={() => changeLocale("en")}
          disabled={isPending}
          className={`rounded-lg px-2 py-1.5 text-xs font-semibold transition sm:px-3 sm:py-2 sm:text-sm ${
            locale === "en"
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          }`}
          aria-label="English"
        >
          EN
        </button>
      </div>

      <Link
        href="/upgrade"
        className="hidden h-11 items-center gap-2 rounded-xl border border-amber-400/25 bg-[#07101d] px-4 text-[12px] font-black text-amber-200 shadow-[0_8px_24px_rgba(0,0,0,.22)] transition hover:border-amber-300/40 hover:bg-amber-400/[0.10] xl:inline-flex"
      >
        <span>★</span>
        <span>Premium</span>
        <span className="text-amber-300">€9.99</span>
      </Link>
    </div>
  );
}
