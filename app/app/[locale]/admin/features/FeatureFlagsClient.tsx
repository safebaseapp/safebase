"use client";

import { useState, useTransition } from "react";
import { updateFeatureFlag } from "./actions/updateFeatureFlag";

type FeatureFlagKey =
  | "ai_assistant"
  | "premium_downloads"
  | "courses_certificates";

type FeatureFlag = {
  key: FeatureFlagKey;
  enabled: boolean;
  label_tr: string;
  label_en: string;
  description_tr: string | null;
  description_en: string | null;
};

type Props = {
  locale: "tr" | "en";
  initialFlags: FeatureFlag[];
};

const icons: Record<FeatureFlagKey, string> = {
  ai_assistant: "🤖",
  premium_downloads: "📥",
  courses_certificates: "🎓",
};

export default function FeatureFlagsClient({
  locale,
  initialFlags,
}: Props) {
  const isTurkish = locale === "tr";

  const [flags, setFlags] = useState(initialFlags);
  const [savingKey, setSavingKey] =
    useState<FeatureFlagKey | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function toggleFlag(flag: FeatureFlag) {
    const nextEnabled = !flag.enabled;

    setSavingKey(flag.key);
    setMessage("");

    startTransition(async () => {
      try {
        await updateFeatureFlag({
          key: flag.key,
          enabled: nextEnabled,
        });

        setFlags((current) =>
          current.map((item) =>
            item.key === flag.key
              ? { ...item, enabled: nextEnabled }
              : item
          )
        );

        setMessage(
          isTurkish
            ? "Özellik bayrağı güncellendi."
            : "Feature flag updated."
        );
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : isTurkish
              ? "Güncelleme başarısız."
              : "Update failed."
        );
      } finally {
        setSavingKey(null);
      }
    });
  }

  const enabledCount = flags.filter(
    (flag) => flag.enabled
  ).length;

  return (
    <>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            {isTurkish ? "Toplam özellik" : "Total features"}
          </p>
          <p className="mt-3 text-3xl font-black">
            {flags.length}
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
            {isTurkish ? "Aktif" : "Enabled"}
          </p>
          <p className="mt-3 text-3xl font-black text-emerald-300">
            {enabledCount}
          </p>
        </article>

        <article className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-400">
            {isTurkish ? "Kapalı" : "Disabled"}
          </p>
          <p className="mt-3 text-3xl font-black text-amber-300">
            {flags.length - enabledCount}
          </p>
        </article>
      </section>

      {message && (
        <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-500/[0.08] px-5 py-4 text-sm font-bold text-blue-200">
          {message}
        </div>
      )}

      <section className="mt-8 space-y-4">
        {flags.map((flag) => {
          const busy =
            isPending && savingKey === flag.key;

          return (
            <article
              key={flag.key}
              className={`rounded-[26px] border p-6 transition ${
                flag.enabled
                  ? "border-emerald-400/20 bg-emerald-400/[0.045]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950 text-2xl">
                    {icons[flag.key]}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-black">
                        {isTurkish
                          ? flag.label_tr
                          : flag.label_en}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${
                          flag.enabled
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-slate-700/50 text-slate-400"
                        }`}
                      >
                        {flag.enabled
                          ? isTurkish
                            ? "AÇIK"
                            : "ON"
                          : isTurkish
                            ? "KAPALI"
                            : "OFF"}
                      </span>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? flag.description_tr
                        : flag.description_en}
                    </p>

                    <p className="mt-3 font-mono text-xs text-slate-600">
                      {flag.key}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={busy}
                  onClick={() => toggleFlag(flag)}
                  className={`relative h-12 w-24 shrink-0 rounded-full border transition ${
                    flag.enabled
                      ? "border-emerald-400/30 bg-emerald-500/20"
                      : "border-white/10 bg-slate-950"
                  } ${busy ? "opacity-50" : ""}`}
                  aria-label={
                    isTurkish
                      ? "Özelliği aç veya kapat"
                      : "Toggle feature"
                  }
                >
                  <span
                    className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all ${
                      flag.enabled
                        ? "left-[54px] bg-emerald-400 text-slate-950"
                        : "left-1.5 bg-slate-700 text-slate-300"
                    }`}
                  >
                    {busy
                      ? "…"
                      : flag.enabled
                        ? "✓"
                        : "×"}
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-[26px] border border-violet-400/15 bg-violet-500/[0.05] p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
          {isTurkish
            ? "NASIL ÇALIŞIR?"
            : "HOW IT WORKS"}
        </p>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
          {isTurkish
            ? "Buradaki anahtarlar Supabase üzerinde saklanır. Sonraki aşamada AI Asistan, Premium indirmeler ve kurs modülü bu değerleri okuyacak. Böylece yeni deploy yapmadan bir özelliği açıp kapatabileceksiniz."
            : "These switches are stored in Supabase. Next, the AI Assistant, Premium downloads and courses module will read these values, allowing features to be enabled or disabled without a new deployment."}
        </p>
      </section>
    </>
  );
}
