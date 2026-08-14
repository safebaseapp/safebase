"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SignRenderer from "@/components/safety-signs/SignRenderer";
import {
  safetySigns,
  signCategories,
} from "@/lib/safety-signs/data";
import type {
  SignCategory,
  SignLocale,
} from "@/lib/safety-signs/types";

type Props = {
  locale: SignLocale;
};

export default function SafetySignsClient({
  locale,
}: Props) {
  const isTurkish = locale === "tr";

  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<"all" | SignCategory>("all");

  const filteredSigns = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase(
        isTurkish ? "tr-TR" : "en-US",
      );

    return safetySigns.filter((sign) => {
      const categoryMatches =
        category === "all" ||
        sign.category === category;

      const searchableText = [
        sign.code,
        sign.title[locale],
        sign.description[locale],
      ]
        .join(" ")
        .toLocaleLowerCase(
          isTurkish ? "tr-TR" : "en-US",
        );

      return (
        categoryMatches &&
        (!normalizedQuery ||
          searchableText.includes(normalizedQuery))
      );
    });
  }, [category, isTurkish, locale, query]);

  return (
    <main className="min-h-screen bg-[#05091a] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-400">
          Sernem Safety Sign Engine V1
        </p>

        <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-[-0.05em] sm:text-7xl">
          {isTurkish
            ? "Profesyonel Güvenlik Levhaları"
            : "Professional Safety Signs"}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          {isTurkish
            ? "İş yerleri ve endüstriyel sahalar için yazdırmaya hazır güvenlik levhaları."
            : "Print-ready safety signs for workplaces and industrial sites."}
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder={
              isTurkish
                ? "Levha adı, kodu veya anahtar kelime ara..."
                : "Search sign name, code or keyword..."
            }
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
          />

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-4">
            <strong className="text-2xl">
              {safetySigns.length}
            </strong>

            <span className="ml-3 text-xs font-black uppercase tracking-[0.15em] text-emerald-300">
              {isTurkish ? "Levha" : "Signs"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {signCategories.map((item) => {
            const active = category === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() =>
                  setCategory(item.id)
                }
                className={`rounded-full border px-5 py-2.5 text-sm font-black transition ${
                  active
                    ? "border-emerald-500 bg-emerald-600 text-white"
                    : "border-white/10 bg-white/[0.04] text-slate-400 hover:text-white"
                }`}
              >
                {item[locale]}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredSigns.map((sign) => (
            <article
              key={sign.slug}
              className="group overflow-hidden rounded-[30px] border border-white/10 bg-[#0d1228] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-2 hover:border-emerald-400/40"
            >
              <Link
                href={`/${locale}/safety-signs/${sign.slug}`}
                className="block h-[500px] overflow-hidden rounded-[20px]"
              >
                <SignRenderer
                  sign={sign}
                  locale={locale}
                  compact
                />
              </Link>

              <div className="px-2 pb-2 pt-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
                    {sign.code}
                  </p>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase text-emerald-300">
                    {isTurkish ? "Hazır" : "Ready"}
                  </span>
                </div>

                <h2 className="mt-4 min-h-[58px] text-2xl font-black leading-tight text-white">
                  {sign.title[locale]}
                </h2>

                <p className="mt-3 min-h-[52px] text-sm leading-6 text-slate-400">
                  {sign.description[locale]}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-2 text-center text-[10px] font-black text-blue-300">
                    A4 PDF
                  </span>

                  <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-2 text-center text-[10px] font-black text-violet-300">
                    A3 PDF
                  </span>

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-2 text-center text-[10px] font-black text-cyan-300">
                    TR / EN
                  </span>
                </div>

                <Link
                  href={`/${locale}/safety-signs/${sign.slug}`}
                  className="mt-5 flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-4 text-sm font-black text-white transition group-hover:bg-emerald-500"
                >
                  👁 {isTurkish ? "Önizle ve İndir" : "Preview & Download"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
