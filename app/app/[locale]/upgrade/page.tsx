import ActivityTracker from "@/components/analytics/ActivityTracker";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import TrackedCheckoutLink from "@/components/analytics/TrackedCheckoutLink";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function UpgradePage({ params }: Props) {
  const { locale } = await params;
  const isTurkish = locale === "tr";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: {
    role: string | null;
    plan: string | null;
    status: string | null;
  } | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role,plan,status")
      .eq("id", user.id)
      .single();

    profile = data;

    if (profile?.status === "suspended") {
      redirect(`/${locale}/account-suspended`);
    }

    if (profile?.plan === "premium" || profile?.role === "admin") {
      redirect(`/${locale}/dashboard`);
    }
  }

  const backHref = user ? `/${locale}/dashboard` : `/${locale}`;
  const backLabel = user
    ? isTurkish
      ? "Dashboard'a Dön"
      : "Back to Dashboard"
    : isTurkish
      ? "Ana Sayfaya Dön"
      : "Back to Home";

  const checkoutUrl =
    "https://sernem.lemonsqueezy.com/checkout/buy/e6363311-0a93-433f-ba14-d2507c4a683f";

  const premiumBenefits = isTurkish
    ? [
        "SERNEM AI özellikleri",
        "Şirket logolu / markalı PDF çıktıları",
        "Premium rapor ve profesyonel doküman çıktıları",
        "Yeni Premium özelliklere öncelikli erişim",
      ]
    : [
        "SERNEM AI features",
        "Company-branded PDF outputs",
        "Premium reports and professional document outputs",
        "Priority access to new Premium features",
      ];

  const rows = isTurkish
    ? [
        ["İçerik önizlemeleri", "Açık", "Açık"],
        ["Standart PDF indirme", "Ücretsiz hesap ile", "Dahil"],
        ["Toolbox / poster / rehber erişimi", "Dahil", "Dahil"],
        ["Şirket logolu PDF", "—", "Dahil"],
        ["SERNEM AI", "—", "Dahil"],
        ["Premium raporlar ve çıktılar", "—", "Dahil"],
      ]
    : [
        ["Content previews", "Open", "Open"],
        ["Standard PDF downloads", "With free account", "Included"],
        ["Toolbox / posters / guides", "Included", "Included"],
        ["Company-branded PDF", "—", "Included"],
        ["SERNEM AI", "—", "Included"],
        ["Premium reports and outputs", "—", "Included"],
      ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8 sm:py-12">
      <ActivityTracker eventName="premium_view" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center text-sm font-bold text-blue-400 transition hover:text-blue-300"
          >
            ← {backLabel}
          </Link>
          <Link
            href={`/${locale}/how-it-works`}
            className="text-sm font-bold text-slate-400 transition hover:text-white"
          >
            {isTurkish ? "Nasıl çalışır?" : "How it works"} →
          </Link>
        </div>

        <section className="mt-7 overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/70">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
            <div className="p-5 sm:p-10 lg:p-12">
              <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-1 text-xs font-black tracking-[0.18em] text-amber-300">
                SERNEM PREMIUM
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {isTurkish
                  ? "Ne ücretsiz, ne Premium? Hepsi açıkça burada."
                  : "What is free and what is Premium? Clearly explained."}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {isTurkish
                  ? "SERNEM’de içerikleri incelemek ücretsizdir. Standart PDF indirmek için ücretsiz hesap gerekir. Şirket logolu çıktılar ve AI özellikleri Premium’da açılır."
                  : "Browsing SERNEM content is free. Standard PDF downloads require a free account. Company-branded outputs and AI features are unlocked with Premium."}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {premiumBenefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/[0.07] bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-emerald-400">✓</div>
                      <p className="text-sm font-bold leading-6 text-slate-200">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-white/[0.08] bg-gradient-to-b from-blue-950/60 to-slate-950 p-5 sm:p-10 lg:border-l lg:border-t-0">
              <div className="lg:sticky lg:top-8">
                <p className="text-xs font-black tracking-[0.2em] text-blue-300">
                  {isTurkish ? "PREMIUM ÜYELİK" : "PREMIUM MEMBERSHIP"}
                </p>

                <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-2">
                  <span className="pb-1 text-xl font-bold text-slate-500 line-through">€14.99</span>
                  <span className="text-5xl font-black">€9.99</span>
                  <span className="pb-1 text-slate-400">
                    / {isTurkish ? "ay" : "month"}
                  </span>
                </div>

                <div className="mt-3 inline-flex rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-3 py-1 text-[11px] font-black tracking-[0.08em] text-amber-200">
                  {isTurkish ? "LANSMANA ÖZEL FİYAT" : "LAUNCH OFFER"}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {isTurkish
                    ? "Lansman döneminde Premium erişim €9.99 / ay. Dahil olan özellikleri satın almadan önce açıkça görebilirsiniz."
                    : "Premium is €9.99 / month during the launch period. You can see exactly what is included before purchasing."}
                </p>

                <TrackedCheckoutLink
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-center text-base font-black text-white transition hover:bg-blue-500"
                >
                  {isTurkish
                    ? "Premium’a Geç — €9.99 / ay"
                    : "Upgrade to Premium — €9.99 / month"}
                </TrackedCheckoutLink>

                {!user && (
                  <Link
                    href={`/${locale}/register`}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-white/[0.10] px-6 py-4 text-sm font-bold text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {isTurkish
                      ? "Ücretsiz hesap oluştur"
                      : "Create a free account"}
                  </Link>
                )}

                <div className="mt-7 space-y-3 border-t border-white/[0.08] pt-6 text-sm text-slate-400">
                  <p>✓ {isTurkish ? "Güvenli ödeme" : "Secure payment"}</p>
                  <p>✓ {isTurkish ? "Otomatik Premium aktivasyonu" : "Automatic Premium activation"}</p>
                  <p>✓ {isTurkish ? "Tek üyelik, tüm Premium erişim" : "One membership, full Premium access"}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/[0.08] bg-slate-900/50 p-4 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black tracking-[0.2em] text-emerald-300">
              {isTurkish ? "ŞEFFAF KARŞILAŞTIRMA" : "CLEAR COMPARISON"}
            </p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              {isTurkish ? "Ücretsiz hesap vs Premium" : "Free account vs Premium"}
            </h2>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="min-w-[620px] w-full border-collapse text-left text-sm">
              <thead className="bg-slate-950/80 text-slate-200">
                <tr>
                  <th className="px-4 py-4 font-black">{isTurkish ? "Özellik" : "Feature"}</th>
                  <th className="px-4 py-4 font-black">{isTurkish ? "Ücretsiz" : "Free"}</th>
                  <th className="px-4 py-4 font-black text-blue-300">Premium</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([feature, free, premium]) => (
                  <tr key={feature} className="border-t border-white/[0.06]">
                    <td className="px-4 py-4 font-bold text-white">{feature}</td>
                    <td className="px-4 py-4 text-slate-300">{free}</td>
                    <td className="px-4 py-4 font-bold text-emerald-300">{premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            {isTurkish
              ? "Önizleme için hesap gerekmez. Standart PDF indirmelerinde ücretsiz üyelik yeterlidir; Premium yalnızca Premium özellikleri açar."
              : "No account is required for previews. A free account is enough for standard PDF downloads; Premium only unlocks Premium features."}
          </p>
        </section>
      </div>
    </main>
  );
}
