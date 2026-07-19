import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import LocalizedCategories from "./components/LocalizedCategories";
import LocalizedFeaturedTools from "./components/LocalizedFeaturedTools";
import LocalizedFooter from "./components/LocalizedFooter";

type Props = {
  params: Promise<{ locale: string }>;
};

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M3.5 12h17M12 3c2.3 2.4 3.5 5.4 3.5 9S14.3 18.6 12 21c-2.3-2.4-3.5-5.4-3.5-9S9.7 5.4 12 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="M12 2.5 13.8 8l5.7 1.8-5.7 1.8L12 17l-1.8-5.4-5.7-1.8L10.2 8 12 2.5Z"
      fill="currentColor"
    />
    <path
      d="m18.5 15 .9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z"
      fill="currentColor"
    />
  </svg>
);

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const safeLocale = locale as "tr" | "en";
  const isTurkish = safeLocale === "tr";

  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  });

  const content = {
    badge: isTurkish
      ? "Global HSE bilgi ve araç platformu"
      : "Global HSE knowledge and tools platform",

    slogan: isTurkish
      ? "Sınırların Ötesinde Güvenlik"
      : "Safety Without Borders",

    description: isTurkish
      ? "HSE profesyonelleri için hesaplama araçları, yapay zekâ destekli rehberlik, güvenlik bilgileri ve kullanıma hazır kaynaklar."
      : "Calculators, AI-powered guidance, safety knowledge and ready-to-use resources built for HSE professionals.",

    exploreTools: isTurkish ? "Araçları Keşfet" : "Explore Tools",

    askAi: isTurkish ? "SafeBase AI'a Sor" : "Ask SafeBase AI",

    platformLabel: isTurkish
      ? "HSE profesyonelleri için geliştirildi"
      : "Built for HSE professionals",

    toolsLabel: isTurkish ? "Profesyonel Araçlar" : "Professional Tools",

    knowledgeLabel: isTurkish ? "Güvenlik Bilgileri" : "Safety Knowledge",

    aiLabel: isTurkish ? "Yapay Zekâ Asistanı" : "AI Assistant",

    aiCardTitle: isTurkish
      ? "Sahadaki sorularına hızlı yanıt al"
      : "Get fast answers to real safety questions",

    aiCardDescription: isTurkish
      ? "KKD, sıcak çalışma, kapalı alan, LOTO ve daha fazla HSE konusu hakkında SafeBase AI'a soru sor."
      : "Ask SafeBase AI about PPE, hot work, confined space, LOTO and more HSE topics.",

    aiCardButton: isTurkish ? "AI Asistanını Aç" : "Open AI Assistant",

    trustedText: isTurkish
      ? "Tek platform. Daha güvenli işyerleri."
      : "One platform. Safer workplaces.",
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative isolate min-h-[720px] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-30 bg-slate-950" />

        <div className="absolute left-1/2 top-[-240px] -z-20 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px]" />

        <div className="absolute bottom-[-260px] right-[-140px] -z-20 h-[620px] w-[620px] rounded-full bg-emerald-500/10 blur-[150px]" />

        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-16 pb-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <GlobeIcon />
                {content.badge}
              </div>

              <p className="mt-7 text-sm font-black uppercase tracking-[0.28em] text-emerald-400">
                {content.slogan}
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[76px]">
                {t("title")}
              </h1>

              <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-slate-300 sm:text-2xl">
                {t("subtitle")}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                {content.description}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/tools`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-2xl shadow-blue-600/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-500"
                >
                  {content.exploreTools}
                  <ArrowIcon />
                </Link>

                <Link
                  href={`/${locale}/ai-assistant`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-base font-black text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
                >
                  <SparkIcon />
                  {content.askAi}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
                  {content.platformLabel}
                </span>

                <span>{content.trustedText}</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-0 rounded-[40px] bg-blue-600/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/brand/safebase-mark.svg"
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12"
                    />

                    <div>
                      <p className="font-black text-white">SafeBase AI</p>
                      <p className="text-sm text-slate-400">
                        {isTurkish
                          ? "HSE bilgi asistanı"
                          : "HSE knowledge assistant"}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                    ONLINE
                  </span>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm font-semibold text-blue-300">
                    {content.aiLabel}
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight text-white">
                    {content.aiCardTitle}
                  </h2>

                  <p className="mt-4 leading-7 text-slate-400">
                    {content.aiCardDescription}
                  </p>

                  <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-slate-300">
                    “
                    {isTurkish
                      ? "Kapalı alana giriş öncesinde hangi kontroller yapılmalıdır?"
                      : "What checks are required before confined-space entry?"}
                    ”
                  </div>

                  <Link
                    href={`/${locale}/ai-assistant`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-black text-white transition hover:bg-blue-500"
                  >
                    <SparkIcon />
                    {content.aiCardButton}
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                    <p className="text-2xl font-black text-white">4+</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {content.toolsLabel}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                    <p className="text-2xl font-black text-white">5+</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {content.knowledgeLabel}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                    <p className="text-2xl font-black text-emerald-400">AI</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {content.aiLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white text-slate-950">
        <LocalizedCategories locale={safeLocale} />
        <LocalizedFeaturedTools locale={safeLocale} />
        <LocalizedFooter locale={safeLocale} />
      </div>
    </main>
  );
}