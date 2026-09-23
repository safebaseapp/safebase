"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { inspectionCatalog } from "../../../data/checklists/registry";
import type { Locale } from "./hot-work/types";
import { getCardVisualStyle, getInspectionCardVisual } from "@/lib/visual/content-card-visuals";

type ContentControl = {
  accessLevel: "free" | "premium";
  featured: boolean;
};

const inspectionIcons: Record<string, string> = {
  "work-at-height": "🧗",
  "hot-work": "🔥",
  loto: "🔒",
  scaffold: "🏗️",
  "confined-space": "🕳️",
  lifting: "🏋️",
  excavation: "⛏️",
  simops: "🔄",
  "electrical-safety": "⚡",
  "hand-tools": "🛠️",
  "power-tools": "🔧",
  "mobile-equipment": "🚜",
  "fire-safety": "🧯",
  "temporary-power": "🔌",
  ppe: "🥽",
  housekeeping: "🧹",
  "manual-handling": "📦",
  "chemical-safety": "⚗️",
  "vehicle-traffic": "🚚",
  "safety-observation": "👁️",
  "emergency-preparedness": "🚨",
  "first-aid": "🩹",
  environmental: "🌿",
  welfare: "🚿",
};

function getDuration(itemCount: number, locale: Locale) {
  const lower = Math.max(6, Math.round(itemCount * 0.55));
  const upper = Math.max(lower + 3, Math.round(itemCount * 0.8));
  return locale === "tr" ? `${lower}–${upper} dakika` : `${lower}–${upper} min`;
}

export default function InspectionLibraryClient({
  locale,
  inspections,
  controls,
}: {
  locale: Locale;
  inspections: typeof inspectionCatalog;
  controls: Record<string, ContentControl>;
}) {
  const isTurkish = locale === "tr";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const visibleInspections = inspections;
  const categories = useMemo(
    () => [...new Set(visibleInspections.map((inspection) => inspection.category[locale]))],
    [locale, visibleInspections],
  );
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return visibleInspections.filter((inspection) => {
      const matchesCategory = category === "all" || inspection.category[locale] === category;
      const haystack = `${inspection.title[locale]} ${inspection.description[locale]} ${inspection.category[locale]}`.toLowerCase();
      return matchesCategory && haystack.includes(normalizedQuery);
    });
  }, [category, locale, query, visibleInspections]);
  const grouped = useMemo(() => {
    return categories
      .map((categoryName) => ({
        category: categoryName,
        inspections: filtered.filter((inspection) => inspection.category[locale] === categoryName),
      }))
      .filter((group) => group.inspections.length > 0);
  }, [categories, filtered, locale]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-slate-800 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">{isTurkish ? "SERNEM Saha Araçları" : "SERNEM Field Tools"}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{isTurkish ? "İş Güvenliği Denetim Kontrol Listeleri" : "Safety Inspection Checklists"}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-400">{isTurkish ? "HSE profesyonelleri için yapılandırılmış, hızlı ve yönetilebilir saha denetim araçları." : "Structured, fast and management-ready field inspection tools for HSE professionals."}</p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2">{visibleInspections.length} {isTurkish ? "denetim" : "inspections"}</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2">{isTurkish ? "Mobil uyumlu" : "Mobile responsive"}</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2">TR / EN</span>
          </div>
        </header>

        <section className="mt-8 grid gap-3 md:grid-cols-[1fr_280px]">
          <label className="sr-only" htmlFor="inspection-search">{isTurkish ? "Denetim ara" : "Search inspections"}</label>
          <input id="inspection-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isTurkish ? "Denetim ara..." : "Search inspections..."} className="min-h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none focus:border-blue-500" />
          <label className="sr-only" htmlFor="inspection-category">{isTurkish ? "Kategori seç" : "Filter by category"}</label>
          <select id="inspection-category" value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none focus:border-blue-500">
            <option value="all">{isTurkish ? "Tüm kategoriler" : "All categories"}</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </section>
        <p className="mt-4 text-sm text-slate-500">{filtered.length} {isTurkish ? "denetim gösteriliyor" : "inspections shown"}</p>

        <div className="mt-8 space-y-12">
          {grouped.map((group) => (
            <section key={group.category}>
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-800 pb-3">
                <h2 className="text-2xl font-bold">{group.category}</h2>
                <span className="text-sm text-slate-500">{group.inspections.length}</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.inspections.map((inspection) => {
                  const control = controls[inspection.slug];
                  const isPremium = control?.accessLevel === "premium";
                  const inspectionHref = `/${locale}/checklists/${inspection.slug}`;
                  const href = isPremium ? `/${locale}/upgrade?next=${encodeURIComponent(inspectionHref)}` : inspectionHref;
                  const visual = getInspectionCardVisual(inspection.slug);
                  return (
                    <Link
                      key={inspection.slug}
                      href={href}
                      style={getCardVisualStyle(visual)}
                      data-visual-key={visual.key}
                      className="group flex min-h-64 flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-950/20"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl" aria-hidden="true">{inspectionIcons[inspection.slug] ?? "◈"}</span>
                        {isPremium && <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-1 text-[10px] font-bold uppercase text-violet-300">Premium</span>}
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">{inspection.category[locale]}</p>
                      <h3 className="mt-2 text-xl font-bold leading-tight">{inspection.title[locale]}</h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{inspection.description[locale]}</p>
                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4 text-xs">
                        <div><p className="text-slate-500">{isTurkish ? "Referans" : "Reference"}</p><p className="mt-1 truncate font-medium text-slate-300">{inspection.document.standards?.[0] ?? (isTurkish ? "Saha prosedürü" : "Site procedure")}</p></div>
                        <div><p className="text-slate-500">{isTurkish ? "Süre" : "Duration"}</p><p className="mt-1 font-medium text-slate-300">{getDuration(inspection.document.sections.flatMap((section) => section.items).length, locale)}</p></div>
                      </div>
                      <span className="mt-5 font-semibold text-blue-400 transition group-hover:translate-x-1">{isPremium ? (isTurkish ? "Premium ile aç →" : "Unlock with Premium →") : (isTurkish ? "Denetimi başlat →" : "Start inspection →")}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
