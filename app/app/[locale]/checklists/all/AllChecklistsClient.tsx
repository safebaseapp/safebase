"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { inspectionCatalog } from "../../../../data/checklists/registry";
import type { Locale } from "../hot-work/types";

export default function AllChecklistsClient({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(
    () => [...new Set(inspectionCatalog.map((checklist) => checklist.category[locale]))],
    [locale],
  );
  const filtered = inspectionCatalog.filter((checklist) => {
    const matchesCategory = category === "all" || checklist.category[locale] === category;
    const haystack = `${checklist.title[locale]} ${checklist.description[locale]}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  });
  const isTurkish = locale === "tr";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          {isTurkish ? "Denetim arşivi" : "Inspection library"}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          {isTurkish ? "Tüm Denetimler" : "All Inspections"}
        </h1>
        <div className="mt-8 grid gap-3 md:grid-cols-[1fr_280px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={isTurkish ? "Denetim ara..." : "Search inspections..."}
            className="min-h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none focus:border-blue-500"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none focus:border-blue-500"
          >
            <option value="all">{isTurkish ? "Tüm kategoriler" : "All categories"}</option>
            {categories.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <p className="mt-5 text-sm text-slate-500">
          {filtered.length} {isTurkish ? "denetim gösteriliyor" : "inspections shown"}
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((checklist) => (
            <Link
              key={checklist.slug}
              href={`/${locale}/checklists/${checklist.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">{checklist.category[locale]}</p>
              <h2 className="mt-3 text-xl font-bold">{checklist.title[locale]}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{checklist.description[locale]}</p>
              <span className="mt-6 block font-semibold text-blue-400">{isTurkish ? "Denetimi Başlat →" : "Start Inspection →"}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
