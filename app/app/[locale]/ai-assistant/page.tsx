import Link from "next/link";
import AIAssistant from "./AIAssistant";
import { requirePremiumUser } from "@/lib/auth/server-access";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AIAssistantPage({
  params,
}: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  const isTurkish = locale === "tr";

  /*
   * Premium/auth kontrolünü koruyoruz.
   * Kullanıcı AI sayfasına erişebilecek hesapta mı?
   */
  await requirePremiumUser({
    locale,
    nextPath: `/${locale}/ai-assistant`,
  });

  /*
   * Feature Flag
   */
  const supabase = await createClient();

  const { data: featureFlag, error } = await supabase
    .from("feature_flags")
    .select("enabled")
    .eq("key", "ai_assistant")
    .maybeSingle();

  if (error) {
    console.error(
      "AI Assistant feature flag could not be read:",
      error.message
    );
  }

  /*
   * Fail-safe:
   * Kayıt bulunamazsa veya DB hatası olursa
   * mevcut çalışan AI sistemini yanlışlıkla kapatmıyoruz.
   */
  const aiEnabled =
    featureFlag?.enabled ?? true;

  if (!aiEnabled) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/${locale}/dashboard`}
            className="text-sm font-black text-blue-400 transition hover:text-blue-300"
          >
            ←{" "}
            {isTurkish
              ? "Dashboard'a dön"
              : "Back to dashboard"}
          </Link>

          <section className="mt-10 overflow-hidden rounded-[32px] border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-white/[0.035] to-transparent p-8 sm:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-3xl">
              🤖
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-amber-300">
              SAFEBASE FEATURE CONTROL
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              {isTurkish
                ? "AI Asistan şu anda kullanılamıyor"
                : "AI Assistant is currently unavailable"}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              {isTurkish
                ? "SafeBase AI Asistan özelliği geçici olarak devre dışı bırakılmıştır. Özellik yeniden etkinleştirildiğinde mevcut hesabınızla kullanmaya devam edebilirsiniz."
                : "The SafeBase AI Assistant has been temporarily disabled. You can continue using it with your existing account when the feature is enabled again."}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-black text-amber-300">
              ●{" "}
              {isTurkish
                ? "Özellik geçici olarak kapalı"
                : "Feature temporarily disabled"}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <Link
                href={`/${locale}/dashboard`}
                className="inline-flex rounded-2xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
              >
                {isTurkish
                  ? "Dashboard'a Dön →"
                  : "Return to Dashboard →"}
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return <AIAssistant />;
}
