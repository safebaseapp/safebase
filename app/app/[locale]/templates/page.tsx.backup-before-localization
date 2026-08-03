"use client";

import { useMemo, useState } from "react";

const templates = [
  {
    icon: "📋",
    title: "Risk Assessment Template",
    description: "Professional workplace risk assessment template.",
    category: "Risk",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🛠️",
    title: "Job Safety Analysis (JSA)",
    description: "Step-by-step job safety analysis form.",
    category: "JSA",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🗣️",
    title: "Toolbox Talk Template",
    description: "Daily toolbox talk meeting record.",
    category: "Meetings",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "⚠️",
    title: "Incident Report",
    description: "Incident and accident reporting template.",
    category: "Reports",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🟡",
    title: "Near Miss Report",
    description: "Record and investigate near miss events.",
    category: "Reports",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🚧",
    title: "Permit to Work",
    description: "General permit to work template.",
    category: "Permits",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "⚡",
    title: "LOTO Permit",
    description: "Lockout/Tagout isolation permit template.",
    category: "Permits",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🔥",
    title: "Hot Work Permit",
    description: "Hot work authorization and fire watch form.",
    category: "Permits",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🕳️",
    title: "Confined Space Entry Permit",
    description: "Confined space entry authorization template.",
    category: "Permits",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🏗️",
    title: "Scaffold Inspection Checklist",
    description: "Scaffold inspection and handover checklist.",
    category: "Inspection",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🪜",
    title: "Work at Height Checklist",
    description: "Working at height safety inspection template.",
    category: "Inspection",
    formats: ["DOCX", "PDF"],
  },
  {
    icon: "🦺",
    title: "PPE Inspection Checklist",
    description: "Personal protective equipment inspection form.",
    category: "Inspection",
    formats: ["DOCX", "PDF"],
  },
];

const categories = [
  "All",
  "Risk",
  "JSA",
  "Meetings",
  "Reports",
  "Permits",
  "Inspection",
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesCategory =
        selectedCategory === "All" ||
        template.category === selectedCategory;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        template.title.toLowerCase().includes(normalizedSearch) ||
        template.description.toLowerCase().includes(normalizedSearch) ||
        template.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Professional HSE Resources
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-950">
          HSE Templates
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Explore professional HSE templates for risk assessments,
          inspections, reports, permits and daily safety management.
        </p>
      </section>

      <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <label
          htmlFor="template-search"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Search templates
        </label>

        <input
          id="template-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search risk assessment, permit, inspection..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-600">
          {filteredTemplates.length} template
          {filteredTemplates.length === 1 ? "" : "s"} found
        </p>

        {(searchQuery || selectedCategory !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredTemplates.length > 0 ? (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <article
              key={template.title}
              className="flex min-h-[290px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl"
                >
                  {template.icon}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {template.category}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-950">
                {template.title}
              </h2>

              <p className="mt-3 flex-1 leading-7 text-slate-600">
                {template.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {template.formats.map((format) => (
                  <span
                    key={format}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600"
                  >
                    {format}
                  </span>
                ))}
              </div>

              <button
                type="button"
                disabled
                className="mt-5 w-full cursor-not-allowed rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-500"
              >
                In Development
              </button>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <div className="text-4xl" aria-hidden="true">
            🔍
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            No templates found
          </h2>

          <p className="mt-2 text-slate-600">
            Try another search term or clear the selected category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Clear filters
          </button>
        </section>
      )}
    </main>
  );
}