import type { Metadata } from "next";
import Link from "next/link";
import AIAssistant from "./AIAssistant";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";
  const canonical = `https://www.sernem.com/${locale}/ai-assistant`;

  const title = isTurkish
    ? "SERNEM AI Asistanı | Yapay Zekâ Destekli İSG ve HSE Rehberliği"
    : "SERNEM AI Assistant | AI-Powered HSE & Safety Guidance";

  const description = isTurkish
    ? "KKD, sıcak çalışma, kapalı alan, LOTO, yüksekte çalışma ve diğer İSG konularında SERNEM bilgi tabanına dayalı yapay zekâ destekli HSE rehberliğini keşfedin."
    : "Explore AI-powered HSE guidance based on the SERNEM knowledge base for PPE, hot work, confined space, LOTO, working at height and other safety topics.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/ai-assistant",
        en: "https://www.sernem.com/en/ai-assistant",
        "x-default": "https://www.sernem.com/en/ai-assistant",
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "SERNEM",
      title,
      description,
      locale: isTurkish ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function PublicAIPreview({
  locale,
  access,
}: {
  locale: "tr" | "en";
  access: "guest" | "free" | "suspended";
}) {
  const isTurkish = locale === "tr";
  const nextPath = `/${locale}/ai-assistant`;

  const href =
    access === "guest"
      ? `/${locale}/login?next=${encodeURIComponent(nextPath)}`
      : access === "suspended"
        ? `/${locale}/account-suspended`
        : `/${locale}/upgrade?next=${encodeURIComponent(nextPath)}`;

  const buttonLabel =
    access === "guest"
      ? isTurkish
        ? "Üye ol / Giriş yap"
        : "Sign up / Log in"
      : access === "suspended"
        ? isTurkish
          ? "Hesap durumunu görüntüle"
          : "View account status"
        : isTurkish
          ? "Premium ile AI'ı kullan"
          : "Use AI with Premium";

  const topicCards = isTurkish
    ? [
        ["Kapalı Alan", "Giriş öncesi kontroller ve kritik tehlikeler"],
        ["Sıcak Çalışma", "Yangın önleme, izin ve saha kontrolleri"],
        ["LOTO", "Enerji izolasyonu ve doğrulama adımları"],
        ["KKD", "Göreve göre uygun kişisel koruyucu donanım"],
      ]
    : [
        ["Confined Space", "Pre-entry checks and critical hazards"],
        ["Hot Work", "Fire prevention, permits and site controls"],
        ["LOTO", "Energy isolation and verification steps"],
        ["PPE", "Task-specific personal protective equipment"],
      ];

  return (
    <main className="min-h-[calc(100vh-88px)] bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[32px] border border-blue-400/20 bg-[#020817] px-6 py-12 shadow-[0_30px_90px_rgba(0,0,0,.42)] sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(37,99,235,.24),transparent_34%),radial-gradient(circle_at_20%_0%,rgba(14,165,233,.08),transparent_30%)]" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-400">
              SERNEM AI
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {isTurkish
                ? "HSE sorularınız için kaynaklı yapay zekâ rehberliği"
                : "Source-based AI guidance for your HSE questions"}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              {isTurkish
                ? "SERNEM AI; KKD, sıcak çalışma, kapalı alan, LOTO, yüksekte çalışma, iskele, elektrik ve diğer iş güvenliği konularında SERNEM bilgi tabanına dayalı pratik rehberlik sunar."
                : "SERNEM AI provides practical guidance based on the SERNEM knowledge base across PPE, hot work, confined space, LOTO, working at height, scaffolding, electrical safety and more."}
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:flex sm:items-center sm:gap-3">
              <div className="min-h-[52px] flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-slate-500">
                {isTurkish
                  ? "Örn: Sıcak çalışmaya başlamadan önce hangi kritik kontroller gerekir?"
                  : "Example: What critical controls are required before hot work begins?"}
              </div>

              <Link
                href={href}
                className="mt-3 inline-flex min-h-[52px] items-center justify-center rounded-xl bg-blue-600 px-6 font-black text-white transition hover:bg-blue-500 sm:mt-0"
              >
                {buttonLabel} →
              </Link>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              {access === "guest"
                ? isTurkish
                  ? "AI arayüzünü inceleyebilirsiniz. Soru göndermek için ücretsiz hesapla giriş yapmanız, tam AI kullanımı için Premium erişiminiz olması gerekir."
                  : "You can explore the AI interface. Sending questions requires an account, and full AI access requires Premium."
                : access === "free"
                  ? isTurkish
                    ? "AI arayüzü herkese açıktır. Soru gönderme ve yanıt alma Premium erişimle kullanılabilir."
                    : "The AI interface is public. Sending questions and receiving responses is available with Premium access."
                  : isTurkish
                    ? "Hesabınızın mevcut durumu nedeniyle AI kullanımı kapalıdır."
                    : "AI usage is unavailable because of the current account status."}
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topicCards.map(([title, description]) => (
            <Link
              key={title}
              href={href}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
            >
              <h2 className="font-black text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              <span className="mt-4 inline-block text-sm font-black text-blue-400">
                {isTurkish ? "AI ile sor →" : "Ask AI →"}
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <h2 className="text-xl font-black">
            {isTurkish ? "SERNEM AI nasıl çalışır?" : "How SERNEM AI works"}
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400 sm:text-base">
            {isTurkish
              ? "Asistan, SERNEM'in HSE bilgi tabanındaki rehberleri ve konu kaynaklarını kullanarak tehlikeler, kritik kontroller, gerekli KKD, izinler, çalışma öncesi kontroller ve uygulanabilir standartlar hakkında yapılandırılmış yanıtlar üretir. AI çıktıları profesyonel saha değerlendirmesinin yerine geçmez; karar verirken proje prosedürleri ve yürürlükteki mevzuat ayrıca doğrulanmalıdır."
              : "The assistant uses SERNEM's HSE knowledge base and topic resources to generate structured guidance on hazards, critical controls, required PPE, permits, pre-work checks and applicable standards. AI output does not replace professional site assessment; project procedures and applicable regulations should also be verified."}
          </p>
        </section>
      </div>
    </main>
  );
}

export default async function AIAssistantPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: "tr" | "en" = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const supabase = await createClient();
  const { data: featureFlag, error } = await supabase
    .from("feature_flags")
    .select("enabled")
    .eq("key", "ai_assistant")
    .maybeSingle();

  if (error) {
    console.error("AI Assistant feature flag could not be read:", error.message);
  }

  const aiEnabled = featureFlag?.enabled ?? true;

  if (!aiEnabled) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/${locale}`}
            className="text-sm font-black text-blue-400 transition hover:text-blue-300"
          >
            ← {isTurkish ? "Ana sayfaya dön" : "Back to home"}
          </Link>

          <section className="mt-10 overflow-hidden rounded-[32px] border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-white/[0.035] to-transparent p-8 sm:p-12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
              SERNEM FEATURE CONTROL
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              {isTurkish
                ? "AI Asistan şu anda kullanılamıyor"
                : "AI Assistant is currently unavailable"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              {isTurkish
                ? "SERNEM AI Asistan özelliği geçici olarak devre dışı bırakılmıştır."
                : "The SERNEM AI Assistant has been temporarily disabled."}
            </p>
          </section>
        </div>
      </main>
    );
  }

  const { user, profile } = await getCurrentAccessProfile();
  const hasPremium =
    !!user &&
    !!profile &&
    profile.status === "active" &&
    (profile.role === "admin" || profile.plan === "premium");

  if (hasPremium) {
    return <AIAssistant />;
  }

  const access = !user
    ? "guest"
    : profile?.status === "suspended"
      ? "suspended"
      : "free";

  return <PublicAIPreview locale={locale} access={access} />;
}
