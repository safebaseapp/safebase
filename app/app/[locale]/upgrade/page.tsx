import ActivityTracker from "@/components/analytics/ActivityTracker";
import TrackedCheckoutLink from "@/components/analytics/TrackedCheckoutLink";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{ locale: string }>;
};

type Benefit = {
  eyebrow: string;
  title: string;
  text: string;
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

  const benefits: Benefit[] = isTurkish
    ? [
        {
          eyebrow: "01",
          title: "Daha kapsamlı HSE analizi",
          text: "Saha sorularını risk, kontrol, KKD ve izin tarafıyla birlikte değerlendiren Premium AI desteği.",
        },
        {
          eyebrow: "02",
          title: "Profesyonel doküman çıktıları",
          text: "Risk analizi, Toolbox ve uygun HSE modüllerinde daha düzenli, sunuma hazır çıktılar.",
        },
        {
          eyebrow: "03",
          title: "Gelişmiş Toolbox içerikleri",
          text: "Sahaya hazır TR / EN Toolbox materyalleri ve daha güçlü Premium içerik deneyimi.",
        },
        {
          eyebrow: "04",
          title: "Tek çalışma akışı",
          text: "Araçlarınızı, kayıtlarınızı ve profesyonel HSE kaynaklarını aynı akış içinde kullanın.",
        },
      ]
    : [
        {
          eyebrow: "01",
          title: "Deeper HSE analysis",
          text: "Premium AI support that reviews field questions together with risks, controls, PPE and permits.",
        },
        {
          eyebrow: "02",
          title: "Professional document outputs",
          text: "Cleaner, presentation-ready outputs across Risk Assessment, Toolbox and supported HSE modules.",
        },
        {
          eyebrow: "03",
          title: "Advanced Toolbox content",
          text: "Field-ready TR / EN Toolbox materials and a stronger Premium content experience.",
        },
        {
          eyebrow: "04",
          title: "One connected workflow",
          text: "Use your tools, records and professional HSE resources in one connected flow.",
        },
      ];

  const comparison = isTurkish
    ? [
        ["Temel HSE kaynakları", "Dahil", "Dahil"],
        ["Risk / Toolbox çalışma akışı", "Standart", "Gelişmiş"],
        ["Premium AI desteği", "—", "Dahil"],
        ["Premium doküman deneyimi", "—", "Dahil"],
        ["Premium içerik ve kaynaklar", "—", "Dahil"],
      ]
    : [
        ["Core HSE resources", "Included", "Included"],
        ["Risk / Toolbox workflow", "Standard", "Advanced"],
        ["Premium AI support", "—", "Included"],
        ["Premium document experience", "—", "Included"],
        ["Premium content and resources", "—", "Included"],
      ];

  return (
    <main className="min-h-screen bg-[#05080d] text-white">
      <ActivityTracker eventName="premium_view" />

      <section className="relative isolate min-h-[720px] overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/sernem-hero-refinery.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(4,8,14,.96)_0%,rgba(4,8,14,.88)_42%,rgba(4,8,14,.54)_72%,rgba(4,8,14,.64)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,7,13,.14)_0%,rgba(3,7,13,.12)_60%,rgba(3,7,13,.86)_100%)]" />

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-white"
          >
            <span className="text-amber-300">←</span> {backLabel}
          </Link>

          <div className="grid gap-12 pb-16 pt-16 lg:grid-cols-[1.08fr_.72fr] lg:items-end lg:gap-20 lg:pb-20 lg:pt-24">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-amber-300">
                SERNEM / PREMIUM
              </p>

              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[82px]">
                {isTurkish ? (
                  <>
                    Daha az hazırlık.
                    <span className="mt-2 block text-[#f4bd62]">Daha profesyonel çıktı.</span>
                  </>
                ) : (
                  <>
                    Less preparation.
                    <span className="mt-2 block text-[#f4bd62]">More professional output.</span>
                  </>
                )}
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                {isTurkish
                  ? "Risk analizi, Toolbox, AI desteği ve profesyonel HSE kaynaklarını tek akışta birleştirin. Sahada daha hızlı hazırlanın, daha düzenli üretin ve daha güçlü sunun."
                  : "Bring Risk Assessment, Toolbox, AI support and professional HSE resources into one working flow. Prepare faster in the field, work cleaner and present with more confidence."}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
                <span>{isTurkish ? "SAHA ODAKLI" : "FIELD FOCUSED"}</span>
                <span>{isTurkish ? "TR / EN" : "TR / EN"}</span>
                <span>{isTurkish ? "PROFESYONEL ÇIKTI" : "PROFESSIONAL OUTPUT"}</span>
              </div>
            </div>

            <aside className="rounded-[26px] border border-white/14 bg-[#08111c]/82 p-6 shadow-[0_26px_80px_rgba(0,0,0,.42)] backdrop-blur-md sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                {isTurkish ? "PREMIUM ÜYELİK" : "PREMIUM MEMBERSHIP"}
              </p>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">€9.99</span>
                <span className="pb-2 text-sm text-white/45">/ {isTurkish ? "ay" : "month"}</span>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/65">
                {isTurkish
                  ? "Tek üyelik. Premium araçlar, içerikler ve profesyonel çıktılar. Ödeme sonrası erişim hesabınıza otomatik tanımlanır."
                  : "One membership. Premium tools, content and professional outputs. Access is activated automatically after payment."}
              </p>

              <TrackedCheckoutLink
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-between rounded-xl bg-[#f4bd62] px-5 py-4 text-sm font-black text-[#101216] transition hover:bg-[#ffd07f]"
              >
                <span>{isTurkish ? "Premium’a Geç" : "Upgrade to Premium"}</span>
                <span>→</span>
              </TrackedCheckoutLink>

              {!user && (
                <p className="mt-4 text-xs text-white/42">
                  {isTurkish ? "Hesabınız yok mu?" : "No account yet?"}{" "}
                  <Link
                    href={`/${locale}/register`}
                    className="font-bold text-white/75 underline decoration-white/25 underline-offset-4 transition hover:text-white"
                  >
                    {isTurkish ? "Ücretsiz hesap oluştur" : "Create a free account"}
                  </Link>
                </p>
              )}

              <div className="mt-7 grid grid-cols-3 border-t border-white/10 pt-5 text-[10px] text-white/45">
                <span>{isTurkish ? "Anında erişim" : "Instant access"}</span>
                <span className="text-center">{isTurkish ? "Otomatik aktivasyon" : "Auto activation"}</span>
                <span className="text-right">{isTurkish ? "Premium araçlar" : "Premium tools"}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#080c12]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
                {isTurkish ? "PREMIUM DENEYİM" : "PREMIUM EXPERIENCE"}
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                {isTurkish ? "Daha fazla özellik değil. Daha iyi bir çalışma biçimi." : "Not more features. A better way to work."}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                {isTurkish
                  ? "Premium, sahadaki işi daha hızlı hazırlamak ve ortaya çıkan dokümanı daha profesyonel sunmak için tasarlandı. Gereksiz gösteriş yerine kullanışlılık, düzen ve güvenilirlik."
                  : "Premium is built to help you prepare field work faster and present the result more professionally. Less noise, more usefulness, structure and reliability."}
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {benefits.map((item) => (
                <article key={item.title} className="grid gap-3 py-6 sm:grid-cols-[54px_220px_1fr] sm:items-start sm:gap-6">
                  <span className="text-xs font-black tracking-[0.18em] text-amber-300">{item.eyebrow}</span>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-6 text-white/50">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-[#05080d]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">
                FREE / PREMIUM
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {isTurkish ? "İhtiyacınız olduğunda daha ileri gidin." : "Go further when the work requires it."}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">
                {isTurkish
                  ? "Temel SERNEM kaynakları kullanılmaya devam eder. Premium, profesyonel çıktı ve gelişmiş çalışma akışını açar."
                  : "Core SERNEM resources remain available. Premium unlocks professional outputs and a more advanced workflow."}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="grid grid-cols-[1fr_82px_94px] border-b border-white/10 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                <span>{isTurkish ? "Özellik" : "Feature"}</span>
                <span className="text-center">FREE</span>
                <span className="text-center text-amber-300">PREMIUM</span>
              </div>
              {comparison.map(([feature, free, premium]) => (
                <div
                  key={feature}
                  className="grid grid-cols-[1fr_82px_94px] items-center border-b border-white/[0.07] px-5 py-4 text-xs last:border-b-0"
                >
                  <span className="font-medium text-white/70">{feature}</span>
                  <span className="text-center text-white/35">{free}</span>
                  <span className="text-center font-bold text-[#f4bd62]">{premium}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {isTurkish ? "Sahadaki işi daha güçlü sunun." : "Present field work with more confidence."}
              </p>
              <p className="mt-1 text-sm text-white/40">
                {isTurkish ? "Premium erişim ödeme sonrası otomatik tanımlanır." : "Premium access is activated automatically after payment."}
              </p>
            </div>
            <TrackedCheckoutLink
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-10 rounded-xl border border-amber-300/35 px-5 py-3.5 text-sm font-bold text-amber-200 transition hover:bg-amber-300/10"
            >
              <span>{isTurkish ? "Premium’a Geç" : "Upgrade to Premium"}</span>
              <span>→</span>
            </TrackedCheckoutLink>
          </div>
        </div>
      </section>
    </main>
  );
}
