import type { Metadata } from "next";
import Link from "next/link";
import AIAssistantV3 from "./AIAssistantV3";
import AIAccountSync from "./AIAccountSync";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";
import { isAdminUser } from "@/lib/auth/access";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{ locale: string }>;
};

type UsageMetadata = {
  date?: unknown;
  count?: unknown;
};

function cleanAssistantName(value: unknown) {
  if (typeof value !== "string") return "SERNEM AI";
  return value.trim().replace(/\s+/g, " ").slice(0, 32) || "SERNEM AI";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";
  const canonical = `https://www.sernem.com/${locale}/ai-assistant`;
  const socialImage = "https://www.sernem.com/images/sernem-hse-professional.webp";

  const title = isTurkish
    ? "SERNEM AI Asistanı | Yapay Zekâ Destekli İSG ve HSE Rehberliği"
    : "SERNEM AI Assistant | AI-Powered HSE & Safety Guidance";

  const description = isTurkish
    ? "SERNEM AI ile sıcak iş, kapalı alan, LOTO, KKD, yüksekte çalışma ve diğer İSG konularında kaynaklı rehberlik alın; ilgili Toolbox, risk analizi, Method Statement, poster ve güvenlik levhalarına geçin."
    : "Use SERNEM AI for source-based HSE guidance across hot work, confined space, LOTO, PPE, working at height and more, with related Toolbox Talks, risk assessments, Method Statements, posters and safety signs.";

  return {
    title,
    description,
    keywords: isTurkish
      ? ["HSE AI", "İSG yapay zeka", "iş güvenliği asistanı", "risk analizi", "toolbox", "LOTO", "sıcak iş", "kapalı alan"]
      : ["HSE AI", "safety AI assistant", "risk assessment", "toolbox talk", "LOTO", "hot work", "confined space", "PPE"],
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
      images: [
        {
          url: socialImage,
          width: 1600,
          height: 667,
          alt: isTurkish
            ? "SERNEM AI profesyonel HSE asistanı"
            : "SERNEM AI professional HSE assistant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function AIAssistantPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: "tr" | "en" = rawLocale === "tr" ? "tr" : "en";
  const tr = locale === "tr";

  const supabase = await createClient();
  const { data: featureFlag, error } = await supabase
    .from("feature_flags")
    .select("enabled")
    .eq("key", "ai_assistant")
    .maybeSingle();

  if (error) {
    console.error("AI Assistant feature flag could not be read:", error.message);
  }

  if (!(featureFlag?.enabled ?? true)) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href={`/${locale}`} className="text-sm font-black text-blue-400 transition hover:text-blue-300">
            ← {tr ? "Ana sayfaya dön" : "Back to home"}
          </Link>
          <section className="mt-10 overflow-hidden rounded-[32px] border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-white/[0.035] to-transparent p-8 sm:p-12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">SERNEM FEATURE CONTROL</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              {tr ? "AI Asistan şu anda kullanılamıyor" : "AI Assistant is currently unavailable"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              {tr ? "SERNEM AI Asistan özelliği geçici olarak devre dışı bırakılmıştır." : "The SERNEM AI Assistant has been temporarily disabled."}
            </p>
          </section>
        </div>
      </main>
    );
  }

  const { user, profile } = await getCurrentAccessProfile();

  if (user && profile?.status === "suspended") {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-red-400/20 bg-red-500/[0.06] p-8 sm:p-12">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">SERNEM ACCOUNT</p>
          <h1 className="mt-4 text-3xl font-black">{tr ? "Hesap erişimi askıya alınmış" : "Account access is suspended"}</h1>
          <p className="mt-4 leading-7 text-slate-400">{tr ? "AI kullanımı için hesap durumunuzu kontrol edin." : "Review your account status before using AI."}</p>
          <Link href={`/${locale}/account-suspended`} className="mt-6 inline-flex rounded-xl bg-red-500 px-5 py-3 font-black">{tr ? "Hesap durumunu görüntüle" : "View account status"}</Link>
        </div>
      </main>
    );
  }

  const premium =
    !!user &&
    !!profile &&
    profile.status === "active" &&
    (isAdminUser(user) || profile.role === "admin" || profile.plan === "premium");

  const access: "guest" | "free" | "premium" = !user
    ? "guest"
    : premium
      ? "premium"
      : "free";

  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const initialName = cleanAssistantName(metadata.sernem_ai_name);
  const usageMetadata = metadata.sernem_ai_usage as UsageMetadata | undefined;
  const today = new Date().toISOString().slice(0, 10);
  const rawCount = usageMetadata?.date === today ? Number(usageMetadata.count ?? 0) : 0;
  const initialUsage = Number.isFinite(rawCount) ? Math.max(0, Math.floor(rawCount)) : 0;
  const usageKey = `sernem-ai-usage:${access}:${today}`;

  const bootstrap = JSON.stringify({ access, initialName, initialUsage, usageKey }).replace(/</g, "\\u003c");
  const bootstrapScript = `try{const s=${bootstrap};if(s.access!=="guest"){localStorage.setItem(s.usageKey,String(s.initialUsage));localStorage.setItem("sernem-ai-custom-name",s.initialName)}}catch(e){}`;

  return (
    <div className="sernem-ai-route">
      <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      <AIAccountSync
        access={access}
        initialName={initialName}
        initialUsage={initialUsage}
      />
      <AIAssistantV3 locale={locale} access={access} />
    </div>
  );
}
