"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  posterCategories,
  posters,
  type PosterCategory,
} from "./poster-data";

type PosterContentControl = {
  slug: string;
  published: boolean;
  visible: boolean;
  accessLevel: "free" | "premium";
  featured: boolean;
};

type Props = {
  locale: "tr" | "en";
  controls: PosterContentControl[];
};

export default function PosterLibraryClient({
  locale,
  controls,
}: Props) {
  const isTurkish = locale === "tr";

  const controlMap = useMemo(
    () =>
      new Map(
        controls.map((control) => [
          control.slug,
          control,
        ])
      ),
    [controls]
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<PosterCategory>("all");

  const filteredPosters = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase(isTurkish ? "tr-TR" : "en-US");

    return posters.filter((poster) => {
      const control = controlMap.get(poster.slug);

      const isPublished =
        control?.published ?? true;

      const isVisible =
        control?.visible ?? true;

      if (!isPublished || !isVisible) {
        return false;
      }

      const categoryMatches =
        category === "all" || poster.category === category;

      const searchableText = [
        poster.title[locale],
        poster.description[locale],
        poster.code,
      ]
        .join(" ")
        .toLocaleLowerCase(isTurkish ? "tr-TR" : "en-US");

      const queryMatches =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      return categoryMatches && queryMatches;
    });
  }, [category, controlMap, isTurkish, locale, query]);

  function getCount(categoryId: PosterCategory) {
    if (categoryId === "all") {
      return posters.length;
    }

    return posters.filter(
      (poster) => poster.category === categoryId,
    ).length;
  }

  return (
    <main className="min-h-screen bg-[#05091a] text-white">
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.26em] text-emerald-400">
                SERNEM Poster Library
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.05em] sm:text-7xl">
                {isTurkish
                  ? "Profesyonel Güvenlik Posterleri"
                  : "Professional Safety Posters"}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                {isTurkish
                  ? "Yazdırmaya hazır profesyonel HSE posterlerini A4 veya A3 formatında görüntüleyin ve PDF olarak kaydedin."
                  : "View print-ready professional HSE posters in A4 or A3 format and save them as PDF."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {["⬇ Download A4", "⬇ Download A3", "PDF Included", "TR + EN"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black text-slate-300"
                    >
                      ✓ {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-[26px] border border-emerald-400/20 bg-emerald-400/10 px-8 py-6">
              <p className="text-4xl font-black">{posters.length}</p>

              <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                {isTurkish ? "Poster Konusu" : "Poster Topics"}
              </p>
            </div>
          </div>

          <label className="relative mt-10 block">
            <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-slate-500">
              🔎
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                isTurkish
                  ? "Poster konusu, kodu veya anahtar kelime ara..."
                  : "Search poster topic, code or keyword..."
              }
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-14 pr-5 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
            />
          </label>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
            <aside className="h-fit rounded-[28px] border border-white/10 bg-[#0d1228] p-5 lg:sticky lg:top-24">
              <p className="px-3 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                {isTurkish ? "Kategoriler" : "Categories"}
              </p>

              <nav className="mt-4 space-y-2">
                {posterCategories.map((item) => {
                  const active = category === item.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-black transition ${
                        active
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                          : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span>{item.icon}</span>
                        <span>{item[locale]}</span>
                      </span>

                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px]">
                        {getCount(item.id)}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                  {filteredPosters.length}{" "}
                  {isTurkish
                    ? "poster gösteriliyor"
                    : "posters displayed"}
                </p>

                {(query || category !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setCategory("all");
                    }}
                    className="text-sm font-black text-emerald-400 hover:text-white"
                  >
                    {isTurkish
                      ? "Filtreleri Temizle"
                      : "Clear Filters"}
                  </button>
                )}
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredPosters.map((poster) => {
                  const control = controlMap.get(poster.slug);

                  const isPremium =
                    control?.accessLevel === "premium";

                  const isFeatured =
                    control?.featured ?? false;

                  const posterHref =
                    `/${locale}/posters/${poster.slug}`;

                  const premiumHref =
                    `/${locale}/upgrade?next=${encodeURIComponent(
                      posterHref
                    )}`;

                  return (
                  <article
                    key={poster.slug}
                    className={`group relative flex min-h-[830px] flex-col overflow-hidden rounded-[30px] border bg-gradient-to-b from-[#11172f] to-[#0b1024] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-2 ${
                      isPremium
                        ? "border-violet-400/35 hover:border-violet-400/65"
                        : "border-white/10 hover:border-emerald-400/35"
                    }`}
                  >
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${
                        isPremium
                          ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400"
                          : "bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-400"
                      }`}
                    />

                    <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#070b1d] overflow-visible">
                      <div className="absolute right-5 top-5 z-20">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-black backdrop-blur-md ${
                            poster.available
                              ? "border-emerald-400/30 bg-emerald-950/80 text-emerald-300"
                              : "border-amber-400/30 bg-amber-950/80 text-amber-300"
                          }`}
                        >
                          {isPremium
                            ? "👑 PREMIUM"
                            : poster.available
                              ? isTurkish
                                ? "HAZIR"
                                : "READY"
                              : isTurkish
                                ? "YAKINDA"
                                : "SOON"}
                        </span>
                      </div>

                      {poster.available ? (
                        <Link
                          href={
                            isPremium
                              ? premiumHref
                              : posterHref
                          }
                          className="group/preview relative flex h-[330px] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 to-slate-300"
                        >
                          <div className="relative h-[305px] w-[215px] overflow-hidden rounded-md bg-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition duration-300 group-hover/preview:scale-[1.025]">
                            <iframe
                              src={`/${locale}/posters/${poster.slug}?size=a3&embed=1`}
                              title={`${poster.title[locale]} preview`}
                              loading="lazy"
                              tabIndex={-1}
                              aria-hidden="true"
                              className="pointer-events-none absolute left-0 top-0 border-0"
                              style={{
                                width: "1123px",
                                height: "1588px",
                                transform: "scale(0.1915)",
                                transformOrigin: "top left",
                              }}
                            />
                          </div>

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/10" />

                          <span className="absolute bottom-4 rounded-full border border-white/20 bg-slate-950/80 px-4 py-2 text-xs font-black text-white opacity-0 backdrop-blur transition group-hover/preview:opacity-100">
                            👁 {isTurkish ? "Önizlemeyi Aç" : "Open Preview"}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex h-[330px] flex-col items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.01] text-center">
                          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05] text-5xl">
                            {poster.icon}
                          </div>

                          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                            {isTurkish
                              ? "Poster hazırlanıyor"
                              : "Poster in development"}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                        {poster.code} • REV {poster.revision}
                      </p>

                      {isPremium && (
                        <div className="mt-4 rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs font-black text-violet-300">
                          🔒{" "}
                          {isTurkish
                            ? "Premium üyelik ile erişilebilir"
                            : "Available with Premium"}
                        </div>
                      )}

                      <h2 className="mt-4 text-2xl font-black leading-tight">
                        {poster.title[locale]}
                      </h2>

                      <p className="mt-4 min-h-24 text-sm leading-7 text-slate-400">
                        {poster.description[locale]}
                      </p>
                    </div>

                    
<div className="mt-6 flex items-center gap-2 flex-nowrap">
  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
    ✓ Print Ready
  </span>

  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
    🌍 TR / EN
  </span>

  <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-bold text-violet-300">
    📄 PDF
  </span>
</div>


                    <div className="mt-auto border-t border-white/10 pt-6">
                      {poster.available ? (
                        <div className="grid grid-cols-2 gap-3 items-stretch">
                          <Link
                            href={
                              isPremium
                                ? premiumHref
                                : `/${locale}/posters/${poster.slug}?size=a4`
                            }
                            className="inline-flex items-center justify-center rounded-xl border border-blue-400/30 bg-blue-400/10 px-4 py-3 text-sm font-black text-blue-300 transition hover:-translate-y-1 hover:bg-blue-400/20"
                          >
                            {isPremium ? "🔒 A4 PDF" : "A4 PDF"}
                          </Link>

                          <Link
                            href={
                              isPremium
                                ? premiumHref
                                : `/${locale}/posters/${poster.slug}?size=a3`
                            }
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-emerald-500"
                          >
                            {isPremium ? "👑 Kilidi Aç" : "A3 PDF"}
                          </Link>

                          <Link
                            href={
                              isPremium
                                ? premiumHref
                                : posterHref
                            }
                            className="col-span-2 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-black text-white transition hover:bg-white/[0.1]"
                          >
                            {isPremium
                              ? "🔒 Premium Preview"
                              : "👁 Preview"}
                          </Link>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center text-sm font-black text-slate-600">
                          {isTurkish
                            ? "Poster hazırlanıyor"
                            : "Poster in development"}
                        </div>
                      )}
                    </div>
                  </article>
                  );
                })}
              </div>

              {filteredPosters.length === 0 && (
                <div className="mt-10 rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] px-8 py-20 text-center">
                  <p className="text-4xl">🔎</p>

                  <h2 className="mt-5 text-2xl font-black">
                    {isTurkish
                      ? "Poster bulunamadı"
                      : "No posters found"}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
