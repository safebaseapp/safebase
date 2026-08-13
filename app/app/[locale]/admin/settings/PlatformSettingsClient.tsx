"use client";

import {
  FormEvent,
  useState,
  useTransition,
} from "react";

import {
  updatePlatformSettings,
} from "./actions/updatePlatformSettings";

type Settings = {
  site_name_tr: string;
  site_name_en: string;
  seo_title_tr: string;
  seo_title_en: string;
  seo_description_tr: string;
  seo_description_en: string;
  support_email: string;
  maintenance_mode: boolean;
};

type Props = {
  locale: "tr" | "en";
  initialSettings: Settings;
};

export default function PlatformSettingsClient({
  locale,
  initialSettings,
}: Props) {
  const isTurkish = locale === "tr";

  const [settings, setSettings] =
    useState<Settings>(initialSettings);

  const [message, setMessage] = useState("");
  const [isPending, startTransition] =
    useTransition();

  function updateField<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      try {
        await updatePlatformSettings(settings);

        setMessage(
          isTurkish
            ? "Platform ayarları kaydedildi."
            : "Platform settings saved."
        );
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : isTurkish
              ? "Kaydetme başarısız."
              : "Save failed."
        );
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
    >
      {message && (
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.08] px-5 py-4 text-sm font-bold text-blue-200">
          {message}
        </div>
      )}

      <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
            SITE SETTINGS
          </p>

          <h2 className="mt-3 text-2xl font-black">
            {isTurkish
              ? "Site Bilgileri"
              : "Site Information"}
          </h2>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-slate-300">
              Site Name — TR
            </span>

            <input
              value={settings.site_name_tr}
              onChange={(event) =>
                updateField(
                  "site_name_tr",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500/50"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-300">
              Site Name — EN
            </span>

            <input
              value={settings.site_name_en}
              onChange={(event) =>
                updateField(
                  "site_name_en",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500/50"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-black text-slate-300">
              Support Email
            </span>

            <input
              type="email"
              value={settings.support_email}
              onChange={(event) =>
                updateField(
                  "support_email",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500/50"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
          SEO CONTROL
        </p>

        <h2 className="mt-3 text-2xl font-black">
          {isTurkish
            ? "SEO Ayarları"
            : "SEO Settings"}
        </h2>

        <div className="mt-7 space-y-5">
          <label className="block">
            <span className="text-sm font-black text-slate-300">
              SEO Title — TR
            </span>

            <input
              value={settings.seo_title_tr}
              onChange={(event) =>
                updateField(
                  "seo_title_tr",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500/50"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-300">
              SEO Title — EN
            </span>

            <input
              value={settings.seo_title_en}
              onChange={(event) =>
                updateField(
                  "seo_title_en",
                  event.target.value
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500/50"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-300">
              SEO Description — TR
            </span>

            <textarea
              rows={4}
              value={settings.seo_description_tr}
              onChange={(event) =>
                updateField(
                  "seo_description_tr",
                  event.target.value
                )
              }
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 leading-7 text-white outline-none transition focus:border-blue-500/50"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-300">
              SEO Description — EN
            </span>

            <textarea
              rows={4}
              value={settings.seo_description_en}
              onChange={(event) =>
                updateField(
                  "seo_description_en",
                  event.target.value
                )
              }
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 leading-7 text-white outline-none transition focus:border-blue-500/50"
            />
          </label>
        </div>
      </section>

      <section
        className={`rounded-[28px] border p-6 sm:p-8 ${
          settings.maintenance_mode
            ? "border-amber-400/30 bg-amber-400/[0.06]"
            : "border-white/10 bg-white/[0.035]"
        }`}
      >
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
              MAINTENANCE CONTROL
            </p>

            <h2 className="mt-3 text-2xl font-black">
              {isTurkish
                ? "Bakım Modu"
                : "Maintenance Mode"}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              {isTurkish
                ? "Şimdilik yalnızca ayar olarak saklanır. Sonraki adımda site erişimini gerçek bakım ekranına bağlayacağız."
                : "For now this is stored as a setting. Next we can connect it to an actual maintenance screen."}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              updateField(
                "maintenance_mode",
                !settings.maintenance_mode
              )
            }
            className={`relative h-12 w-24 shrink-0 rounded-full border transition ${
              settings.maintenance_mode
                ? "border-amber-400/40 bg-amber-400/20"
                : "border-white/10 bg-slate-950"
            }`}
          >
            <span
              className={`absolute top-1.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all ${
                settings.maintenance_mode
                  ? "left-[54px] bg-amber-400 text-slate-950"
                  : "left-1.5 bg-slate-700 text-slate-300"
              }`}
            >
              {settings.maintenance_mode ? "!" : "×"}
            </span>
          </button>
        </div>
      </section>

      <div className="sticky bottom-5 z-20 rounded-2xl border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl">
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? isTurkish
              ? "Kaydediliyor..."
              : "Saving..."
            : isTurkish
              ? "Ayarları Kaydet"
              : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
