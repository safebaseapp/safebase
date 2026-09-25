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
          eyebrow: "AI",
          title: "Daha kapsamlı HSE analizi",
          text: "Saha sorularında risk, kontrol, KKD ve izin tarafını daha derin değerlendiren Premium AI desteği.",
        },
        {
          eyebrow: "PDF",
          title: "Profesyonel doküman çıktıları",
          text: "Risk analizi, Toolbox ve diğer uygun modüllerde daha profesyonel, paylaşılabilir Premium çıktılar.",
        },
        {
          eyebrow: "TBM",
          title: "Gelişmiş Toolbox içerikleri",
          text: "Sahaya hazır TR / EN Toolbox materyallerine ve Premium içerik deneyimine erişim.",
        },
        {
          eyebrow: "HSE",
          title: "Bağlantılı çalışma alanı",
          text: "SERNEM'in Premium araçlarını, kayıtlarını ve profesyonel kaynaklarını tek çalışma akışında kullanın.",
        },
      ]
    : [
        {
          eyebrow: "AI",
          title: "Deeper HSE analysis",
          text: "Premium AI support for more detailed field-focused review of risks, controls, PPE and permits.",
        },
        {
          eyebrow: "PDF",
          title: "Professional document outputs",
          text: "More professional, shareable Premium outputs across supported Risk Assessment, Toolbox and HSE modules.",
        },
        {
          eyebrow: "TBM",
          title: "Advanced Toolbox content",
          text: "Access field-ready TR / EN Toolbox materials and the Premium content experience.",
        },
        {
          eyebrow: "HSE",
          title: "Connected workspace",
          text: "Use SERNEM Premium tools, records and professional resources in one connected workflow.",
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
    <main className="min-h-screen overflow-hidden bg-[#020817] px-5 py-8 text-white sm:px-8 sm:py-12">
      <ActivityTracker eventName="premium_view" />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[8%] top-[-180px] h-[480px] w-[480px] rounded-full bg-blue-600/[0.13] blur-[150px]" />
        <div className="absolute right-[-80px] top-[28%] h-[420px] w-[420px] rounded-full bg-amber-400/[0.05] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"
        >
          <span className="text-blue-400">←</span> {backLabel}
        </Link>

        <section className="mt-7 overflow-hidden rounded-[30px] border border-white/[0.09] bg-slate-950/55 shadow-[0_35px_100px_rgba(0,0,0,.42)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-10 lg:p-12 xl:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-200">
                <span className="text-amber-300">✦</span> SERNEM PREMIUM
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.96] tracking-[-0.045em] sm:text-5xl xl:text-[64px]">
                {isTurkish ? (
                  <>
                    Daha az hazırlık.
                    <span className="mt-2 block bg-gradient-to-r from-blue-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                      Daha profesyonel çıktı.
                    </span>
                  </>
                ) : (
                  <>
                    Less preparation.
                    <span className="mt-2 block bg-gradient-to-r from-blue-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                      More professional output.
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-300 sm:text-lg">
                {isTurkish
                  ? "Risk analizi, Toolbox, AI desteği ve profesyonel HSE kaynaklarını tek üyelikte birleştirin. Daha hızlı hazırlayın, daha güçlü sunun."
                  : "Bring Risk Assessment, Toolbox, AI support and professional HSE resources into one membership. Prepare faster and present your work better."}
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {benefits.map((item) => (
                  <article
                    key={item.title}
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-blue-400/20 hover:bg-blue-500/[0.04]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/[0.07] text-[10px] font-black tracking-[0.12em] text-blue-300">
                        {item.eyebrow}
                      </span>
                      <div>
                        <h2 className="text-sm font-black text-white sm:text-base">{item.title}</h2>
                        <p className="mt-1.5 text-sm leading-6 text-slate-400">{item.text}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07101f]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">
                      {isTurkish ? "PREMIUM ÇIKTI" : "PREMIUM OUTPUT"}
                    </p>
                    <p className="mt-1 text-sm font-black text-white">
                      {isTurkish ? "Saha dokümanından profesyonel rapora" : "From field document to professional report"}
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-1 text-[9px] font-black text-emerald-300">READY</span>
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-3">
                  {[isTurkish ? "Düzenli yapı" : "Structured layout", isTurkish ? "Paylaşılabilir çıktı" : "Shareable output", isTurkish ? "HSE odaklı içerik" : "HSE-focused content"].map((label, index) => (
                    <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                      <div className="text-xl font-black text-blue-300">0{index + 1}</div>
                      <div className="mt-2 text-xs font-bold text-slate-300">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="border-t border-white/[0.08] bg-gradient-to-b from-blue-950/55 via-slate-950/70 to-slate-950 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
              <div className="lg:sticky lg:top-8">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-300">
                  {isTurkish ? "PREMIUM ÜYELİK" : "PREMIUM MEMBERSHIP"}
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-black tracking-[-0.05em] sm:text-6xl">€9.99</span>
                  <span className="pb-2 text-sm font-semibold text-slate-400">
                    / {isTurkish ? "ay" : "month"}
                  </span>
                </div>

                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                  {isTurkish
                    ? "Tek üyelikle SERNEM'in Premium deneyimine erişin. Ödeme sonrası erişim hesabınıza otomatik tanımlanır."
                    : "Access the SERNEM Premium experience with one membership. Access is activated automatically after payment."}
                </p>

                <TrackedCheckoutLink
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-center text-base font-black text-white shadow-[0_18px_45px_rgba(37,99,235,.28)] transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500"
                >
                  {isTurkish ? "Premium’a Geç" : "Upgrade to Premium"}
                  <span>→</span>
                </TrackedCheckoutLink>

                {!user && (
                  <p className="mt-4 text-center text-xs font-medium text-slate-500">
                    {isTurkish ? "Hesabınız yok mu?" : "No account yet?"}{" "}
                    <Link href={`/${locale}/register`} className="font-bold text-slate-300 underline decoration-slate-700 underline-offset-4 hover:text-white">
                      {isTurkish ? "Ücretsiz hesap oluştur" : "Create a free account"}
                    </Link>
                  </p>
                )}

                <div className="mt-7 grid grid-cols-3 gap-2">
                  {[
                    ["⚡", isTurkish ? "Anında erişim" : "Instant access"],
                    ["✓", isTurkish ? "Otomatik aktivasyon" : "Auto activation"],
                    ["∞", isTurkish ? "Premium araçlar" : "Premium tools"],
                  ].map(([icon, label]) => (
                    <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-2 py-3 text-center">
                      <div className="text-sm font-black text-emerald-300">{icon}</div>
                      <div className="mt-1 text-[9px] font-bold leading-4 text-slate-400">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/10">
                  <div className="grid grid-cols-[1fr_68px_82px] border-b border-white/[0.07] px-4 py-3 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                    <span>{isTurkish ? "Özellik" : "Feature"}</span>
                    <span className="text-center">FREE</span>
                    <span className="text-center text-blue-300">PREMIUM</span>
                  </div>
                  {comparison.map(([feature, free, premium]) => (
                    <div key={feature} className="grid grid-cols-[1fr_68px_82px] items-center border-b border-white/[0.055] px-4 py-3 text-[11px] last:border-b-0">
                      <span className="font-semibold text-slate-300">{feature}</span>
                      <span className="text-center text-slate-500">{free}</span>
                      <span className="text-center font-black text-emerald-300">{premium}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <p className="mt-5 text-center text-[11px] font-medium text-slate-600">
          {isTurkish
            ? "SERNEM Premium profesyonel HSE çalışma akışınızı hızlandırmak için tasarlanmıştır."
            : "SERNEM Premium is designed to accelerate your professional HSE workflow."}
        </p>
      </div>
    </main>
  );
}
