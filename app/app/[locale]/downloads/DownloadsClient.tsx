"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  RESOURCE_ITEMS,
  type ResourceCategory,
  type ResourceItem,
} from "@/lib/downloads/resources";

type Locale = "tr" | "en";
type CategoryFilter = "all" | ResourceCategory;

const categoryMeta: Record<
  ResourceCategory,
  {
    tr: string;
    en: string;
    icon: string;
    accent: string;
  }
> = {
  "toolbox-talks": {
    tr: "Toolbox Talk",
    en: "Toolbox Talk",
    icon: "🧰",
    accent: "text-emerald-400",
  },
  posters: {
    tr: "Poster",
    en: "Poster",
    icon: "🖼️",
    accent: "text-orange-400",
  },
  checklists: {
    tr: "Kontrol Listesi",
    en: "Checklist",
    icon: "📋",
    accent: "text-cyan-400",
  },
  guides: {
    tr: "Rehber",
    en: "Guide",
    icon: "📘",
    accent: "text-blue-400",
  },
};

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m16.5 16.5 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DownloadsClient() {
  const params = useParams<{ locale: string }>();

  const locale: Locale = params.locale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("all");

  const categories = useMemo(() => {
    const definitions: Array<{
      id: CategoryFilter;
      tr: string;
      en: string;
      icon?: string;
    }> = [
      {
        id: "all",
        tr: "Tümü",
        en: "All",
      },
      {
        id: "toolbox-talks",
        tr: "Toolbox Talks",
        en: "Toolbox Talks",
        icon: "🧰",
      },
      {
        id: "posters",
        tr: "Posterler",
        en: "Posters",
        icon: "📄",
      },
      {
        id: "checklists",
        tr: "Kontrol Listeleri",
        en: "Checklists",
        icon: "📋",
      },
      {
        id: "guides",
        tr: "Rehberler",
        en: "Guides",
        icon: "🔗",
      },
    ];

    return definitions.map((category) => ({
      ...category,
      count:
        category.id === "all"
          ? RESOURCE_ITEMS.length
          : RESOURCE_ITEMS.filter(
              (item) => item.category === category.id
            ).length,
    }));
  }, []);

  const filteredResources = useMemo(() => {
    const normalized = search
      .trim()
      .toLocaleLowerCase(isTurkish ? "tr-TR" : "en-US");

    return RESOURCE_ITEMS.filter((item) => {
      const categoryMatches =
        activeCategory === "all" ||
        item.category === activeCategory;

      const searchable = [
        item.title.tr,
        item.title.en,
        item.description.tr,
        item.description.en,
      ]
        .join(" ")
        .toLocaleLowerCase(
          isTurkish ? "tr-TR" : "en-US"
        );

      return (
        categoryMatches &&
        (!normalized || searchable.includes(normalized))
      );
    });
  }, [activeCategory, isTurkish, search]);

  const featuredResources = useMemo(() => {
    const featured = RESOURCE_ITEMS.filter(
      (item) => item.featured
    );

    return featured.slice(0, 4);
  }, []);

  const featuredAccent = (item: ResourceItem) => {
    if (item.id === "chemical-safety-toolbox") {
      return {
        icon: "border-emerald-400/20 bg-emerald-500/10",
        label: "text-emerald-400",
        button: "bg-emerald-600 hover:bg-emerald-500",
      };
    }

    if (item.id === "hot-work-toolbox") {
      return {
        icon: "border-orange-400/20 bg-orange-500/10",
        label: "text-orange-400",
        button: "bg-orange-600 hover:bg-orange-500",
      };
    }

    if (item.id === "loto-toolbox") {
      return {
        icon: "border-violet-400/20 bg-violet-500/10",
        label: "text-violet-400",
        button: "bg-violet-600 hover:bg-violet-500",
      };
    }

    if (item.category === "guides") {
      return {
        icon: "border-blue-400/20 bg-blue-500/10",
        label: "text-blue-400",
        button: "bg-blue-600 hover:bg-blue-500",
      };
    }

    return {
      icon: "border-blue-400/20 bg-blue-500/10",
      label: "text-blue-400",
      button: "bg-blue-600 hover:bg-blue-500",
    };
  };

  const resourceAccent = (item: ResourceItem) => {
    switch (item.category) {
      case "checklists":
        return "bg-emerald-600 hover:bg-emerald-500";
      case "posters":
        return "bg-red-600 hover:bg-red-500";
      case "guides":
        return "bg-blue-600 hover:bg-blue-500";
      default:
        return "bg-emerald-600 hover:bg-emerald-500";
    }
  };

  const previewUrl = (item: ResourceItem) =>
    item.href?.[locale] ?? item.pdfUrl?.[locale];

  const downloadUrl = (item: ResourceItem) =>
    item.docxUrl ??
    item.pdfUrl?.[locale] ??
    item.href?.[locale];

  const downloadText = (item: ResourceItem) => {
    if (item.href && !item.pdfUrl && !item.docxUrl) {
      return isTurkish ? "Posteri Aç" : "Open Poster";
    }

    if (item.docxUrl) {
      return isTurkish ? "DOCX İndir" : "Download DOCX";
    }

    return isTurkish ? "İndir" : "Download";
  };

  return (
    <main className="min-h-screen bg-[#020712] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 -z-30 bg-[#020712]" />

        <div className="absolute left-1/2 top-[-300px] -z-20 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-blue-600/[0.18] blur-[155px]" />

        <div className="absolute bottom-[-260px] right-[-160px] -z-20 h-[520px] w-[520px] rounded-full bg-cyan-500/[0.06] blur-[150px]" />

        <div
          className="absolute inset-0 -z-10 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="mx-auto max-w-[1220px] px-6 pb-14 pt-20 lg:px-8">
          <div className="mx-auto max-w-[860px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.95)]" />
              {isTurkish
                ? "SERNEM HSE KÜTÜPHANESİ"
                : "SERNEM HSE LIBRARY"}
            </div>

            <h1 className="mt-6 text-[46px] font-black leading-[0.98] tracking-[-0.055em] sm:text-[58px] lg:text-[66px]">
              HSE{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {isTurkish ? "Kaynak" : "Resource"}
              </span>{" "}
              {isTurkish ? "Merkezi" : "Center"}
            </h1>

            <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-7 text-slate-400">
              {isTurkish
                ? "Sahada kullanılmak üzere hazırlanmış toolbox talk'lara, posterlere, kontrol listelerine, rehberlere ve profesyonel HSE şablonlarına tek merkezden erişin."
                : "Access field-ready toolbox talks, posters, checklists, guides and professional HSE templates from one central library."}
            </p>

            <div className="mx-auto mt-7 max-w-[610px]">
              <div className="flex items-center gap-3 rounded-xl border border-slate-600/60 bg-[#0b1222]/90 px-5 py-4 shadow-[0_16px_50px_rgba(0,0,0,.28)] transition focus-within:border-blue-400/50">
                <span className="text-slate-400">
                  <SearchIcon />
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder={
                    isTurkish
                      ? "Toolbox, poster, checklist veya rehber ara..."
                      : "Search toolbox talks, posters, checklists or guides..."
                  }
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* CATEGORY PILLS */}
          <div className="mx-auto mt-8 flex max-w-[1180px] flex-wrap justify-center gap-3 xl:flex-nowrap">
            {categories.map((category) => {
              const active =
                category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category.id)
                  }
                  className={`inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-black transition ${
                    active
                      ? "border-blue-400 bg-blue-600 text-white shadow-[0_10px_32px_rgba(37,99,235,.30)]"
                      : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-blue-400/30 hover:bg-white/[0.065]"
                  }`}
                >
                  {category.icon && (
                    <span className="text-sm">
                      {category.icon}
                    </span>
                  )}

                  <span>{category[locale]}</span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-white/[0.07] text-slate-400"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* STATS */}
          <div className="mx-auto mt-9 grid max-w-[1160px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07101d]/80 shadow-[0_18px_55px_rgba(0,0,0,.18)] sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 p-6 lg:border-r lg:border-white/[0.08]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                📄
              </div>
              <div>
                <p className="text-2xl font-black">
                  {RESOURCE_ITEMS.length}
                </p>
                <p className="text-xs font-bold text-slate-500">
                  {isTurkish
                    ? "Yayınlanmış Kaynak"
                    : "Published Resources"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-white/[0.08] p-6 sm:border-l sm:border-t-0 lg:border-l-0 lg:border-r">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
                📁
              </div>
              <div>
                <p className="text-2xl font-black">
                  {categories.length - 1}
                </p>
                <p className="text-xs font-bold text-slate-500">
                  {isTurkish
                    ? "Kaynak Türü"
                    : "Resource Types"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-white/[0.08] p-6 lg:border-r lg:border-t-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
                🌐
              </div>
              <div>
                <p className="text-2xl font-black">
                  2
                </p>
                <p className="text-xs font-bold text-slate-500">
                  {isTurkish ? "Dil Desteği" : "Languages"}
                </p>
                <p className="text-[10px] font-bold text-slate-600">
                  TR / EN
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-white/[0.08] p-6 sm:border-l lg:border-l-0 lg:border-t-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                ↻
              </div>
              <div>
                <p className="text-xl font-black">
                  {isTurkish ? "Sahada" : "Field"}
                </p>
                <p className="text-xs font-bold text-slate-500">
                  {isTurkish
                    ? "Kullanıma Hazır"
                    : "Ready to Use"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {activeCategory === "all" &&
        search.trim().length === 0 &&
        featuredResources.length > 0 && (
        <section className="bg-[#020712] pb-10 pt-12">
          <div className="mx-auto max-w-[1220px] px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-white">
                  <span className="text-blue-400">
                    ★
                  </span>
                  {isTurkish
                    ? "Öne Çıkan Kaynaklar"
                    : "Featured Resources"}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {isTurkish
                    ? "Hızlı erişim için seçilmiş temel HSE kaynakları"
                    : "Selected HSE resources for quick access"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveCategory("all")
                }
                className="hidden items-center gap-2 text-sm font-black text-blue-400 transition hover:text-blue-300 sm:inline-flex"
              >
                {isTurkish
                  ? "Tümünü Gör"
                  : "View All"}
                <ArrowIcon />
              </button>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredResources.map((item) => {
                const meta =
                  categoryMeta[item.category];
                const accent = featuredAccent(item);

                return (
                  <article
                    key={item.id}
                    className="group relative flex min-h-[335px] flex-col overflow-hidden rounded-[18px] border border-white/[0.09] bg-gradient-to-b from-[#091426] to-[#06101d] p-5 shadow-[0_18px_55px_rgba(0,0,0,.14)] transition duration-300 hover:-translate-y-1.5 hover:border-blue-400/30 hover:shadow-[0_22px_65px_rgba(0,0,0,.24)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${accent.icon}`}>
                        {item.icon}
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[11px] font-black text-slate-300">
                        {item.format}
                      </span>
                    </div>

                    <p
                      className={`mt-6 text-[11px] font-black uppercase tracking-[0.08em] ${accent.label}`}
                    >
                      {meta[locale]}
                    </p>

                    <h3 className="mt-3 text-lg font-black leading-snug text-white">
                      {item.title[locale]}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">
                      {item.description[locale]}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {previewUrl(item) ? (
                        <a
                          href={previewUrl(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2.5 text-xs font-black text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                        >
                          <EyeIcon />
                          {isTurkish
                            ? "Önizleme"
                            : "Preview"}
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-xs font-black text-slate-600">
                          DOCX
                        </span>
                      )}

                      {downloadUrl(item) && (
                        <a
                          href={downloadUrl(item)}
                          {...(!item.href ? { download: true } : {})}
                          className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-black text-white transition ${accent.button}`}
                        >
                          <DownloadIcon />
                          {isTurkish
                            ? "İndir"
                            : "Download"}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ALL RESOURCES */}
      <section className="bg-[#020712] pb-20 pt-7">
        <div className="mx-auto max-w-[1220px] px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-white">
                <span className="text-blue-400">
                  📁
                </span>
                {activeCategory === "all"
                  ? isTurkish
                    ? "Tüm Kaynaklar"
                    : "All Resources"
                  : categories.find(
                      (category) =>
                        category.id === activeCategory
                    )?.[locale]}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {isTurkish
                  ? "Arama, filtre veya kategori seçimi ile dilediğiniz kaynağa hızlıca ulaşın"
                  : "Quickly find resources using search and categories"}
              </p>
            </div>

            <span className="text-sm font-black text-blue-400">
              {filteredResources.length}{" "}
              {isTurkish ? "kaynak" : "resources"}
            </span>
          </div>

          {filteredResources.length > 0 ? (
            <div className="mt-7 grid gap-3 lg:grid-cols-2">
              {filteredResources.map((item) => {
                const meta =
                  categoryMeta[item.category];
                const rowAccent = resourceAccent(item);

                return (
                  <article
                    key={item.id}
                    className="group flex min-h-[82px] items-center gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-r from-[#081321] to-[#06101c] px-4 py-3 transition hover:border-blue-400/25 hover:bg-[#0a1426]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-xl">
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-white">
                          {item.title[locale]}
                        </h3>

                        <span
                          className={`text-[10px] font-black uppercase ${meta.accent}`}
                        >
                          {meta[locale]}
                        </span>
                      </div>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {item.description[locale]}
                      </p>
                    </div>

                    <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] font-black text-slate-400 sm:block">
                      {item.format}
                    </span>

                    <div className="flex shrink-0 gap-2">
                      {item.category === "guides" && item.href ? (
                        <a
                          href={item.href[locale]}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-xs font-black text-white transition hover:bg-blue-500"
                        >
                          {isTurkish ? "Rehberi Aç" : "Open Guide"}
                          <ArrowIcon />
                        </a>
                      ) : (
                        <>
                          {previewUrl(item) && (
                            <a
                              href={previewUrl(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={
                                isTurkish
                                  ? "Önizleme"
                                  : "Preview"
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-slate-400 transition hover:bg-white/[0.07] hover:text-white"
                            >
                              <EyeIcon />
                            </a>
                          )}

                          {downloadUrl(item) && (
                            <a
                              href={downloadUrl(item)}
                              {...(!item.href ? { download: true } : {})}
                              title={downloadText(item)}
                              className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-xs font-black text-white transition ${rowAccent}`}
                            >
                              <DownloadIcon />
                              <span className="hidden xl:inline">
                                {isTurkish
                                  ? "İndir"
                                  : "Download"}
                              </span>
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.025] px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500">
                <SearchIcon />
              </div>

              <h3 className="mt-5 text-xl font-black">
                {isTurkish
                  ? "Kaynak bulunamadı"
                  : "No resources found"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {isTurkish
                  ? "Arama kelimesini veya kategori seçimini değiştirmeyi deneyin."
                  : "Try changing your search term or selected category."}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-sm font-black transition hover:bg-blue-500"
              >
                {isTurkish
                  ? "Filtreleri Temizle"
                  : "Clear Filters"}
              </button>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex min-w-[270px] items-center justify-center gap-3 rounded-lg border border-blue-500/70 bg-blue-600/[0.06] px-8 py-3.5 text-sm font-black text-blue-400 shadow-[0_12px_35px_rgba(37,99,235,.08)] transition hover:bg-blue-600 hover:text-white"
            >
              {isTurkish
                ? "HSE Araçlarını Keşfet"
                : "Explore HSE Tools"}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
