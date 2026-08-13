import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import DownloadsClient from "./DownloadsClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function DownloadsPage({
  params,
}: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const { data: featureFlag, error } = await supabase
    .from("feature_flags")
    .select("enabled")
    .eq("key", "premium_downloads")
    .maybeSingle();

  if (error) {
    console.error(
      "Premium Downloads feature flag could not be read:",
      error.message
    );
  }

  // Fail-safe:
  // DB veya kayıt problemi olursa çalışan Downloads
  // sistemini yanlışlıkla kapatmıyoruz.
  const downloadsEnabled =
    featureFlag?.enabled ?? true;

  if (!downloadsEnabled) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/${locale}`}
            className="text-sm font-black text-blue-400 transition hover:text-blue-300"
          >
            ←{" "}
            {isTurkish
              ? "Ana sayfaya dön"
              : "Back to home"}
          </Link>

          <section className="mt-10 overflow-hidden rounded-[32px] border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-white/[0.035] to-transparent p-8 sm:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-3xl">
              📥
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-amber-300">
              SAFEBASE FEATURE CONTROL
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              {isTurkish
                ? "İndirme Merkezi şu anda kullanılamıyor"
                : "Download Center is currently unavailable"}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              {isTurkish
                ? "SafeBase indirilebilir kaynakları geçici olarak devre dışı bırakılmıştır. Özellik yeniden etkinleştirildiğinde HSE belgelerine ve kaynaklarına tekrar erişebilirsiniz."
                : "SafeBase downloadable resources have been temporarily disabled. You will be able to access HSE documents and resources again when the feature is enabled."}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-black text-amber-300">
              ●{" "}
              {isTurkish
                ? "İndirmeler geçici olarak kapalı"
                : "Downloads temporarily disabled"}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <Link
                href={`/${locale}`}
                className="inline-flex rounded-2xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
              >
                {isTurkish
                  ? "Ana Sayfaya Dön →"
                  : "Return Home →"}
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return <DownloadsClient />;
}
