"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GuideCard = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  riskLevel?: string;
};

type Props = {
  locale: "tr" | "en";
  guides: GuideCard[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function GuideDirectoryClient({ locale, guides }: Props) {
  const isTurkish = locale === "tr";
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(guides.map((guide) => guide.category))).sort(),
    [guides],
  );

  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    return guides.filter((guide) => {
      const categoryMatch = category === "all" || guide.category === category;
      const text = normalize(`${guide.title} ${guide.description} ${guide.category}`);
      return categoryMatch && (!term || text.includes(term));
    });
  }, [category, guides, search]);

  const highRiskCount = guides.filter((guide) =>
    normalize(guide.riskLevel ?? "").includes(normalize(isTurkish ? "yüksek" : "high")),
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,.22),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,.12),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
            SERNEM • 100 HSE Guides
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.05em] sm:text-6xl">
            {isTurkish ? "100 Profesyonel İSG Rehberi" : "100 Professional HSE Guides"}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {isTurkish
              ? "Sahadaki gerçek işlere göre hazırlanmış; tehlikeler, kritik kontroller, KKD, iş öncesi doğrulama ve yalnızca görünür OSHA referanslarıyla sunulan rehber kütüphanesi."
              : "Field-ready guidance covering hazards, critical controls, PPE and pre-work verification, with only OSHA references displayed publicly."}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"><p className="text-sm text-slate-500">{isTurkish ? "Toplam Rehber" : "Total Guides"}</p><strong className="mt-2 block text-3xl">{guides.length}</strong></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"><p className="text-sm text-slate-500">{isTurkish ? "Konu Grubu" : "Topic Groups"}</p><strong className="mt-2 block text-3xl">{categories.length}</strong></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"><p className="text-sm text-slate-500">{isTurkish ? "Yüksek Risk Odaklı" : "High-Risk Focus"}</p><strong className="mt-2 block text-3xl">{highRiskCount}</strong></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={isTurkish ? "Örn: forklift, gaz ölçümü, iskele..." : "Try: forklift, gas testing, scaffold..."}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50"
            />
            <div className="text-sm font-bold text-slate-400">
              {filtered.length} {isTurkish ? "rehber gösteriliyor" : "guides shown"}
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold ${category === "all" ? "border-blue-400 bg-blue-600 text-white" : "border-white/10 bg-slate-900 text-slate-400"}`}
            >
              {isTurkish ? "Tümü" : "All"}
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold ${category === item ? "border-blue-400 bg-blue-600 text-white" : "border-white/10 bg-slate-900 text-slate-400"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${locale}/knowledge-base/${guide.slug}`}
              className="group flex min-h-[285px] flex-col rounded-[26px] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.065] hover:shadow-2xl hover:shadow-blue-950/20"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">OSHA</span>
                <span className="text-xs font-bold text-slate-500">{guide.readTime} {isTurkish ? "dk" : "min"}</span>
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-blue-400">{guide.category}</p>
              <h2 className="mt-3 text-2xl font-black leading-tight text-white group-hover:text-blue-100">{guide.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">{guide.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-bold">
                <span className="text-slate-500">{guide.riskLevel ?? (isTurkish ? "Saha Rehberi" : "Field Guide")}</span>
                <span className="text-blue-300 transition group-hover:translate-x-1">{isTurkish ? "Aç" : "Open"} →</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-white/10 p-12 text-center text-slate-500">
            {isTurkish ? "Bu aramayla eşleşen rehber bulunamadı." : "No guide matches this search."}
          </div>
        ) : null}
      </section>
    </main>
  );
}
