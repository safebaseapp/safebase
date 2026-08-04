import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    next?: string;
  }>;
};

const features = [
  {
    icon: "🤖",
    tr: "Premium AI Asistan erişimi",
    en: "Premium AI Assistant access",
  },
  {
    icon: "🧰",
    tr: "Gelişmiş Toolbox içerikleri",
    en: "Advanced Toolbox content",
  },
  {
    icon: "📄",
    tr: "Premium şablonlar ve dokümanlar",
    en: "Premium templates and documents",
  },
  {
    icon: "📥",
    tr: "Özel indirmeler ve kaynaklar",
    en: "Exclusive downloads and resources",
  },
  {
    icon: "📚",
    tr: "Gelişmiş bilgi merkezi içerikleri",
    en: "Advanced Knowledge Base content",
  },
  {
    icon: "⚡",
    tr: "Yeni özelliklere öncelikli erişim",
    en: "Priority access to new features",
  },
];

export default async function UpgradePage({
  params,
  searchParams,
}: Props) {
  const { locale: rawLocale } = await params;
  const query = await searchParams;

  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";
  const requestedPath = query.next || `/${locale}/dashboard`;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/${locale}/login?next=${encodeURIComponent(
        `/${locale}/upgrade?next=${encodeURIComponent(requestedPath)}`
      )}`
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,role,plan,status")
    .eq("id", user.id)
    .single();

  if (profile?.status === "suspended") {
    redirect(`/${locale}/account-suspended`);
  }

  const alreadyPremium =
    profile?.plan === "premium" || profile?.role === "admin";

  if (alreadyPremium) {
    redirect(requestedPath);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div>
            <Link
              href={`/${locale}/dashboard`}
              className="text-sm font-black text-blue-400 transition hover:text-blue-300"
            >
              ← {isTurkish ? "Dashboard'a dön" : "Back to dashboard"}
            </Link>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
              SafeBase Premium
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">
              {isTurkish
                ? "SafeBase'in tüm gücünü açın"
                : "Unlock the full power of SafeBase"}
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              {isTurkish
                ? "Premium plan ile gelişmiş HSE araçlarına, AI desteğine ve profesyonel kaynaklara sınırsız erişim kazanın."
                : "Get unlimited access to advanced HSE tools, AI support and professional resources with Premium."}
            </p>
          </div>

          <div className="w-fit rounded-3xl border border-amber-400/20 bg-amber-400/10 px-6 py-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">
              {isTurkish ? "Mevcut plan" : "Current plan"}
            </p>
            <p className="mt-2 text-2xl font-black">
              {isTurkish ? "Ücretsiz" : "Free"}
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-9">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-400">
              {isTurkish ? "Premium özellikler" : "Premium features"}
            </p>

            <h2 className="mt-3 text-3xl font-black">
              {isTurkish
                ? "Profesyonel HSE çalışma alanı"
                : "Professional HSE workspace"}
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.en}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-5"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <p className="mt-4 font-black text-slate-200">
                    {isTurkish ? feature.tr : feature.en}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-blue-400/25 bg-gradient-to-b from-blue-500/20 to-slate-900 p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                  SafeBase Premium
                </p>
                <h2 className="mt-3 text-4xl font-black">
                  {isTurkish ? "Çok yakında" : "Coming soon"}
                </h2>
              </div>

              <span className="rounded-full bg-amber-400/15 px-4 py-2 text-xs font-black text-amber-300">
                👑 PREMIUM
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-300">
              {isTurkish
                ? "Ödeme sistemi hazırlanıyor. Premium plan yayınlandığında bu ekrandan doğrudan yükseltme yapabileceksiniz."
                : "The payment system is being prepared. You will be able to upgrade directly from this page when Premium launches."}
            </p>

            <div className="my-7 h-px bg-white/10" />

            <ul className="space-y-4 text-sm font-bold text-slate-200">
              <li>✓ {isTurkish ? "AI Asistan erişimi" : "AI Assistant access"}</li>
              <li>✓ {isTurkish ? "Premium indirmeler" : "Premium downloads"}</li>
              <li>✓ {isTurkish ? "Gelişmiş şablonlar" : "Advanced templates"}</li>
              <li>✓ {isTurkish ? "Öncelikli özellikler" : "Priority features"}</li>
            </ul>

            <button
              type="button"
              disabled
              className="mt-8 w-full cursor-not-allowed rounded-2xl bg-blue-600 px-6 py-4 font-black text-white opacity-70"
            >
              {isTurkish
                ? "Premium yükseltme yakında"
                : "Premium upgrade coming soon"}
            </button>

            <Link
              href={`/${locale}/dashboard`}
              className="mt-3 block rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center font-black text-slate-300 transition hover:bg-white/[0.08]"
            >
              {isTurkish ? "Ücretsiz plana devam et" : "Continue with Free"}
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
