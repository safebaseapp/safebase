import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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

  const benefits = isTurkish
    ? [
        {
          title: "Premium AI Asistan",
          text: "Gelişmiş HSE sorularında daha kapsamlı destek.",
        },
        {
          title: "Profesyonel Dokümanlar",
          text: "Premium şablonlar, raporlar ve indirilebilir kaynaklar.",
        },
        {
          title: "Gelişmiş Toolbox İçerikleri",
          text: "Sahaya hazır, profesyonel toolbox materyalleri.",
        },
        {
          title: "Yeni Özelliklere Öncelikli Erişim",
          text: "Yeni SERNEM özelliklerini daha erken kullanın.",
        },
      ]
    : [
        {
          title: "Premium AI Assistant",
          text: "More advanced support for professional HSE questions.",
        },
        {
          title: "Professional Documents",
          text: "Premium templates, reports and downloadable resources.",
        },
        {
          title: "Advanced Toolbox Content",
          text: "Professional, field-ready toolbox materials.",
        },
        {
          title: "Priority Access",
          text: "Get earlier access to new SERNEM features.",
        },
      ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href={backHref}
          className="inline-flex items-center text-sm font-bold text-blue-400 transition hover:text-blue-300"
        >
          ← {backLabel}
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/70">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-1 text-xs font-black tracking-[0.18em] text-amber-300">
                SERNEM PREMIUM
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {isTurkish
                  ? "SERNEM Premium ile daha fazlasını aç."
                  : "Unlock more with SERNEM Premium."}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {isTurkish
                  ? "Profesyonel HSE araçlarına, gelişmiş içeriklere ve Premium kaynaklara tek üyelikle erişin."
                  : "Access professional HSE tools, advanced content and premium resources with one membership."}
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {benefits.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/[0.07] bg-slate-950/40 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-lg text-emerald-400">✓</div>
                      <div>
                        <h2 className="font-black text-white">{item.title}</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-white/[0.08] bg-gradient-to-b from-blue-950/60 to-slate-950 p-6 sm:p-10 lg:border-l lg:border-t-0">
              <div className="lg:sticky lg:top-8">
                <p className="text-xs font-black tracking-[0.2em] text-blue-300">
                  {isTurkish ? "PREMIUM ÜYELİK" : "PREMIUM MEMBERSHIP"}
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-black">€9.99</span>
                  <span className="pb-1 text-slate-400">
                    / {isTurkish ? "ay" : "month"}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {isTurkish
                    ? "Ödeme sonrası Premium erişiminiz otomatik olarak hesabınıza tanımlanır."
                    : "Your Premium access is activated automatically after payment."}
                </p>

                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-center text-base font-black text-white transition hover:bg-blue-500"
                >
                  {isTurkish
                    ? "Premium’a Geç — €9.99 / ay"
                    : "Upgrade to Premium — €9.99 / month"}
                </a>

                {!user && (
                  <Link
                    href={`/${locale}/register`}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-white/[0.10] px-6 py-4 text-sm font-bold text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {isTurkish
                      ? "Önce ücretsiz hesap oluştur"
                      : "Create a free account first"}
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
      </div>
    </main>
  );
}
