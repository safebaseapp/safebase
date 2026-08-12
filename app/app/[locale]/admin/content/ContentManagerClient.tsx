"use client";

import { useMemo, useState } from "react";
import { updateContentControl } from "./actions/updateContentControl";

export type ContentControlItem = {
  content_key: string;
  title: string;
  content_type: string;
  source: string;
  visible: boolean;
  access_level: "free" | "premium";
  published: boolean;
  featured: boolean;
};

type Props = {
  locale: "tr" | "en";
  initialItems: ContentControlItem[];
};

export default function ContentManagerClient({
  locale,
  initialItems,
}: Props) {
  const isTurkish = locale === "tr";

  const [items, setItems] = useState(initialItems);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<
    "all" | "toolbox" | "poster" | "checklist" | "download"
  >("all");

  const visibleItems = useMemo(() => {
    if (filter === "all") return items;

    return items.filter(
      (item) => item.content_type.toLowerCase() === filter
    );
  }, [filter, items]);

  async function updateItem(
    contentKey: string,
    patch: Partial<ContentControlItem>
  ) {
    const current = items.find(
      (item) => item.content_key === contentKey
    );

    if (!current) return;

    const next = {
      ...current,
      ...patch,
    };

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.content_key === contentKey ? next : item
      )
    );

    setSavingKey(contentKey);
    setMessage("");

    try {
      await updateContentControl({
        content_key: next.content_key,
        content_type: next.content_type.toLowerCase() as
          | "toolbox"
          | "poster"
          | "checklist"
          | "download",
        published: next.published,
        visible: next.visible,
        access_level: next.access_level,
        featured: next.featured,
      });

      setMessage(
        isTurkish
          ? "İçerik ayarı kaydedildi."
          : "Content setting saved."
      );
    } catch (error) {
      console.error(error);

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.content_key === contentKey ? current : item
        )
      );

      setMessage(
        error instanceof Error
          ? error.message
          : isTurkish
            ? "İçerik ayarı kaydedilemedi."
            : "Content setting could not be saved."
      );
    }

    setSavingKey(null);
  }

  const publishedCount = items.filter(
    (item) => item.published
  ).length;

  const premiumCount = items.filter(
    (item) => item.access_level === "premium"
  ).length;

  const hiddenCount = items.filter(
    (item) => !item.visible
  ).length;

  const featuredCount = items.filter(
    (item) => item.featured
  ).length;

  return (
    <>
      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: isTurkish ? "Yayında" : "Published",
            value: publishedCount,
            accent: "text-emerald-300",
          },
          {
            label: "Premium",
            value: premiumCount,
            accent: "text-violet-300",
          },
          {
            label: isTurkish ? "Gizli" : "Hidden",
            value: hiddenCount,
            accent: "text-amber-300",
          },
          {
            label: isTurkish ? "Öne Çıkan" : "Featured",
            value: featuredCount,
            accent: "text-blue-300",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
          >
            <p className={`text-3xl font-black ${stat.accent}`}>
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-7 rounded-[26px] border border-white/10 bg-slate-900/70 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
              {isTurkish ? "CMS KONTROLLERİ" : "CMS CONTROLS"}
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {isTurkish
                ? "İçerik yayın ayarları"
                : "Content publishing controls"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["all", isTurkish ? "Tümü" : "All"],
              ["toolbox", "Toolbox"],
              ["poster", "Poster"],
              ["checklist", "Checklist"],
              ["download", "Download"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setFilter(
                    value as
                      | "all"
                      | "toolbox"
                      | "poster"
                      | "checklist"
                      | "download"
                  )
                }
                className={`rounded-xl border px-3 py-2 text-xs font-black transition ${
                  filter === value
                    ? "border-blue-400/30 bg-blue-500/10 text-blue-300"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {message && (
          <div className="mt-5 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-4 py-3 text-sm text-blue-300">
            {message}
          </div>
        )}
      </section>

      <section className="mt-6 overflow-hidden rounded-[26px] border border-white/10 bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px]">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/60 text-left">
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {isTurkish ? "İçerik" : "Content"}
                </th>

                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {isTurkish ? "Tür" : "Type"}
                </th>

                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {isTurkish ? "Yayın" : "Publish"}
                </th>

                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {isTurkish ? "Görünürlük" : "Visibility"}
                </th>

                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {isTurkish ? "Erişim" : "Access"}
                </th>

                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Featured
                </th>

                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  {isTurkish ? "Durum" : "State"}
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleItems.map((item) => {
                const saving = savingKey === item.content_key;

                return (
                  <tr
                    key={item.content_key}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <p className="font-black text-white">
                        {item.title}
                      </p>

                      <p className="mt-1 max-w-[320px] truncate font-mono text-[10px] text-slate-600">
                        {item.source}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-slate-300">
                        {item.content_type}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={item.published ? "published" : "draft"}
                        disabled={saving}
                        onChange={(event) =>
                          void updateItem(item.content_key, {
                            published: event.target.value === "published",
                          })
                        }
                        className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-bold text-white outline-none"
                      >
                        <option value="published">
                          {isTurkish ? "Yayında" : "Published"}
                        </option>
                        <option value="draft">
                          {isTurkish ? "Taslak" : "Draft"}
                        </option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={item.visible ? "visible" : "hidden"}
                        disabled={saving}
                        onChange={(event) =>
                          void updateItem(item.content_key, {
                            visible: event.target.value === "visible",
                          })
                        }
                        className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-bold text-white outline-none"
                      >
                        <option value="visible">
                          {isTurkish ? "Görünür" : "Visible"}
                        </option>
                        <option value="hidden">
                          {isTurkish ? "Gizli" : "Hidden"}
                        </option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={item.access_level}
                        disabled={saving}
                        onChange={(event) =>
                          void updateItem(item.content_key, {
                            access_level: event.target.value as
                              | "free"
                              | "premium",
                          })
                        }
                        className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-bold text-white outline-none"
                      >
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                      </select>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          void updateItem(item.content_key, {
                            featured: !item.featured,
                          })
                        }
                        className={`rounded-xl border px-3 py-2 text-xs font-black transition ${
                          item.featured
                            ? "border-blue-400/25 bg-blue-500/10 text-blue-300"
                            : "border-white/10 bg-white/[0.03] text-slate-500"
                        }`}
                      >
                        {item.featured
                          ? isTurkish
                            ? "Öne Çıkan"
                            : "Featured"
                          : isTurkish
                            ? "Standart"
                            : "Standard"}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 text-xs font-black ${
                          saving
                            ? "text-amber-300"
                            : "text-emerald-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            saving
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                          }`}
                        />

                        {saving
                          ? isTurkish
                            ? "Kaydediliyor"
                            : "Saving"
                          : isTurkish
                            ? "Senkron"
                            : "Synced"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
