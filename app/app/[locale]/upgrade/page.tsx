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


function humanizeSlug(value: string) {
  return value
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase()) ?? "";
}

function resolveRequestedFeature(
  path: string,
  isTurkish: boolean
) {
  const toolboxNames: Record<string, { tr: string; en: string }> = {
    "chemical-safety": {
      tr: "Kimyasal Güvenlik Toolbox Talk",
      en: "Chemical Safety Toolbox Talk",
    },
    "fire-safety": {
      tr: "Yangın Güvenliği Toolbox Talk",
      en: "Fire Safety Toolbox Talk",
    },
    "working-at-height": {
      tr: "Yüksekte Çalışma Toolbox Talk",
      en: "Working at Height Toolbox Talk",
    },
    "housekeeping": {
      tr: "Housekeeping Toolbox Talk",
      en: "Housekeeping Toolbox Talk",
    },
    "electrical-safety": {
      tr: "Elektrik Güvenliği Toolbox Talk",
      en: "Electrical Safety Toolbox Talk",
    },
    "confined-space": {
      tr: "Kapalı Alan Çalışmaları Toolbox Talk",
      en: "Confined Space Toolbox Talk",
    },
  };

  if (path.includes("/toolbox/")) {
    const slug = path.split("/toolbox/")[1]?.split("?")[0] ?? "";
    const known = toolboxNames[slug];

    return {
      icon: "🧰",
      category: isTurkish ? "Premium Toolbox" : "Premium Toolbox",
      title:
        known?.[isTurkish ? "tr" : "en"] ??
        `${humanizeSlug(slug)} Toolbox Talk`,
      description: isTurkish
        ? "Profesyonel saha kullanımı için hazırlanmış gelişmiş Toolbox içeriğine erişmeye çalışıyorsunuz."
        : "You are trying to access advanced Toolbox content prepared for professional field use.",
    };
  }

  if (
    path.includes("/ai-assistant") ||
    path.includes("/ai/")
  ) {
    return {
      icon: "🤖",
      category: "SERNEM AI",
      title: isTurkish ? "Premium AI Asistan" : "Premium AI Assistant",
      description: isTurkish
        ? "Gelişmiş HSE yapay zekâ özelliklerine erişmeye çalışıyorsunuz."
        : "You are trying to access advanced HSE AI capabilities.",
    };
  }

  if (
    path.includes("/downloads") ||
    path.includes("/download")
  ) {
    return {
      icon: "📥",
      category: isTurkish ? "Premium İndirme" : "Premium Download",
      title: isTurkish
        ? "Profesyonel İndirilebilir Kaynak"
        : "Professional Downloadable Resource",
      description: isTurkish
        ? "Premium kullanıcılar için hazırlanan profesyonel bir kaynağa erişmeye çalışıyorsunuz."
        : "You are trying to access a professional resource prepared for Premium members.",
    };
  }

  if (
    path.includes("/template") ||
    path.includes("/templates")
  ) {
    return {
      icon: "📄",
      category: isTurkish ? "Premium Şablon" : "Premium Template",
      title: isTurkish
        ? "Gelişmiş HSE Şablonu"
        : "Advanced HSE Template",
      description: isTurkish
        ? "Düzenlenebilir profesyonel bir HSE şablonuna erişmeye çalışıyorsunuz."
        : "You are trying to access an editable professional HSE template.",
    };
  }

  if (
    path.includes("/poster") ||
    path.includes("/posters")
  ) {
    return {
      icon: "🖼️",
      category: isTurkish ? "Premium Poster" : "Premium Poster",
      title: isTurkish
        ? "Profesyonel Güvenlik Posteri"
        : "Professional Safety Poster",
      description: isTurkish
        ? "Premium güvenlik posterlerinden birine erişmeye çalışıyorsunuz."
        : "You are trying to access one of the Premium safety posters.",
    };
  }

  if (
    path.includes("/checklist") ||
    path.includes("/checklists")
  ) {
    return {
      icon: "✅",
      category: isTurkish ? "Premium Checklist" : "Premium Checklist",
      title: isTurkish
        ? "Gelişmiş Kontrol Listesi"
        : "Advanced Checklist",
      description: isTurkish
        ? "Gelişmiş saha kontrol ve denetim içeriğine erişmeye çalışıyorsunuz."
        : "You are trying to access advanced field inspection content.",
    };
  }

  return {
    icon: "👑",
    category: "SERNEM Premium",
    title: isTurkish
      ? "Premium SERNEM Özelliği"
      : "Premium SERNEM Feature",
    description: isTurkish
      ? "Premium üyelik gerektiren gelişmiş bir SERNEM özelliğine erişmeye çalışıyorsunuz."
      : "You are trying to access an advanced SERNEM feature that requires Premium membership.",
  };
}

export default async function UpgradePage({
  params,
  searchParams,
}: Props) {
  const { locale: rawLocale } = await params;
  const query = await searchParams;

  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";
  const requestedPath = query.next || `/${locale}/dashboard`;

  const requestedFeature = resolveRequestedFeature(
    requestedPath,
    isTurkish
  );

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

        {/* TOP NAV */}
        <Link
          href={`/${locale}/dashboard`}
          className="inline-flex items-center gap-2 text-sm font-black text-blue-400 transition hover:text-blue-300"
        >
          ← {isTurkish ? "Dashboard'a dön" : "Back to dashboard"}
        </Link>

        {/* REQUESTED FEATURE */}
        <section className="mt-7 overflow-hidden rounded-[28px] border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.10] via-slate-900 to-violet-500/[0.08]">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-3xl">
              {requestedFeature.icon}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">
                  🔒 {requestedFeature.category}
                </span>

                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-violet-300">
                  👑 PREMIUM
                </span>
              </div>

              <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                {isTurkish
                  ? "KİLİDİNİ AÇMAK İSTEDİĞİNİZ ÖZELLİK"
                  : "FEATURE YOU'RE TRYING TO UNLOCK"}
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                {requestedFeature.title}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {requestedFeature.description}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                {isTurkish ? "MEVCUT PLAN" : "CURRENT PLAN"}
              </p>
              <p className="mt-1 text-xl font-black text-amber-300">
                {isTurkish ? "Ücretsiz" : "Free"}
              </p>
            </div>
          </div>
        </section>

        {/* HERO */}
        <header className="mt-10 border-b border-white/10 pb-10">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-400">
              SERNEM PREMIUM
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {isTurkish
                ? "Daha güçlü HSE araçlarının kilidini açın."
                : "Unlock a more powerful HSE workspace."}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              {isTurkish
                ? "Premium; gelişmiş içerikleri, profesyonel dokümanları, AI desteğini ve yeni SERNEM özelliklerini tek üyelik altında bir araya getirir."
                : "Premium brings advanced content, professional documents, AI support and upcoming SERNEM capabilities together in one membership."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                isTurkish ? "✓ Profesyonel içerik" : "✓ Professional content",
                isTurkish ? "✓ Premium indirmeler" : "✓ Premium downloads",
                isTurkish ? "✓ AI erişimi" : "✓ AI access",
                isTurkish ? "✓ Öncelikli özellikler" : "✓ Priority features",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* BENEFITS + CTA */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

          {/* BENEFITS */}
          <div className="rounded-[28px] border border-white/10 bg-slate-900/65 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
              {isTurkish ? "PREMIUM İLE GELENLER" : "WHAT PREMIUM UNLOCKS"}
            </p>

            <h3 className="mt-3 text-2xl font-black sm:text-3xl">
              {isTurkish
                ? "Profesyonel HSE çalışma alanı"
                : "Professional HSE workspace"}
            </h3>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.en}
                  className="group rounded-2xl border border-white/[0.08] bg-slate-950/55 p-5 transition hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-slate-950/80"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl">
                      {feature.icon}
                    </span>

                    <div>
                      <p className="font-black leading-5 text-slate-100">
                        {isTurkish ? feature.tr : feature.en}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {isTurkish
                          ? "Premium üyelik kapsamında kullanılabilir."
                          : "Available as part of Premium membership."}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* PREMIUM CARD */}
          <aside className="relative overflow-hidden rounded-[28px] border border-blue-400/25 bg-gradient-to-br from-blue-500/20 via-blue-950/60 to-violet-950/40 p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
                  SERNEM PREMIUM
                </p>

                <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[10px] font-black text-amber-300">
                  👑 PREMIUM
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-black tracking-tight">
                {isTurkish
                  ? "Premium'a hazır olun."
                  : "Get ready for Premium."}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {isTurkish
                  ? "Ödeme sistemi hazırlanıyor. Premium üyelik yayına girdiğinde bu ekrandan doğrudan yükseltme yapabileceksiniz."
                  : "Payments are being prepared. Once Premium launches, you'll be able to upgrade directly from this screen."}
              </p>

              <div className="my-6 h-px bg-white/10" />

              <ul className="space-y-3 text-sm font-bold text-slate-200">
                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  {isTurkish ? "Premium AI Asistan erişimi" : "Premium AI Assistant access"}
                </li>

                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  {isTurkish ? "Gelişmiş Toolbox içerikleri" : "Advanced Toolbox content"}
                </li>

                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  {isTurkish ? "Premium doküman ve indirmeler" : "Premium documents and downloads"}
                </li>

                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  {isTurkish ? "Gelişmiş şablon ve kaynaklar" : "Advanced templates and resources"}
                </li>

                <li className="flex gap-3">
                  <span className="text-emerald-400">✓</span>
                  {isTurkish ? "Yeni özelliklere öncelikli erişim" : "Priority access to new features"}
                </li>
              </ul>

              <div className="mt-7 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">
                  {isTurkish ? "AÇILACAK ÖZELLİK" : "FEATURE TO UNLOCK"}
                </p>

                <p className="mt-2 font-black text-white">
                  {requestedFeature.icon} {requestedFeature.title}
                </p>
              </div>

              <a
              href="https://sernem.lemonsqueezy.com/checkout/buy/e6363311-0a93-433f-ba14-d2507c4a683f"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-2xl bg-blue-600 px-6 py-4 text-center font-black text-white transition hover:bg-blue-500"
            >
              {isTurkish ? "Premium’a Geç — €9.99 / ay" : "Upgrade to Premium — €9.99 / month"}
            </a>

              <Link
                href={`/${locale}/dashboard`}
                className="mt-3 block rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-center font-black text-slate-300 transition hover:bg-white/[0.08]"
              >
                {isTurkish
                  ? "Şimdilik ücretsiz plana devam et"
                  : "Continue with Free for now"}
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                {isTurkish
                  ? "Ödeme sonrası Premium erişiminiz hesabınıza otomatik tanımlanır."
                  : "You'll be able to upgrade your existing account when Premium launches."}
              </p>
            </div>
          </aside>
        </section>

        {/* TRUST STRIP */}
        <section className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: "🔐",
              tr: "Aynı hesabınızla devam edin",
              en: "Keep your existing account",
            },
            {
              icon: "⚡",
              tr: "Premium özellikler anında açılır",
              en: "Premium features unlock instantly",
            },
            {
              icon: "🌍",
              tr: "TR / EN çalışma alanı",
              en: "TR / EN workspace",
            },
          ].map((item) => (
            <div
              key={item.en}
              className="rounded-2xl border border-white/[0.07] bg-slate-900/45 p-4"
            >
              <span className="text-lg">{item.icon}</span>
              <p className="mt-2 text-sm font-bold text-slate-300">
                {isTurkish ? item.tr : item.en}
              </p>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
