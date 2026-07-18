"use client";

import {useTransition} from "react";
import {usePathname, useRouter} from "../../../i18n/navigation";

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
    <div className="flex items-center rounded-xl border border-white/15 bg-white/5 p-1">
      <button
        type="button"
        onClick={() => changeLocale("tr")}
        disabled={isPending}
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
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
        className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
          locale === "en"
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
