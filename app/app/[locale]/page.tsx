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

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path
      d="m5 12.5 4.2 4.2L19 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
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

    knowledgeLabel: isTurkish ? "Bilgi Konuları" : "Knowledge Topics",

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

    whyEyebrow: isTurkish ? "Neden SafeBase?" : "Why SafeBase?",

    whyTitle: isTurkish
      ? "Tüm HSE araçları tek platformda"
      : "Move from fragmented safety work to one focused platform",

    whyDescription: isTurkish
      ? "SafeBase; yapay zekâyı, hesaplayıcıları, rehberleri, kontrol listelerini ve kaynakları tek çalışma alanında birleştirir."
      : "SafeBase brings AI, calculators, guidance, checklists and resources together in one focused workspace.",

    statsEyebrow: isTurkish ? "SafeBase Rakamlarla" : "SafeBase in Numbers",

    statsTitle: isTurkish
      ? "Büyümeye hazır sağlam bir temel"
      : "A continuously growing HSE platform with new tools and guides.",

    audienceEyebrow: isTurkish ? "Kimler İçin?" : "Built For",

    audienceTitle: isTurkish
      ? "Farklı sektörlerdeki güvenlik profesyonelleri"
      : "Safety professionals across multiple industries",
  };

  const advantages = [
    {
      icon: "🧩",
      title: isTurkish
        ? "Dağınık Araçlar\nTek Platform"
        : "Fragmented Tools\nOne Platform",
      description: isTurkish
        ? "Hesaplayıcılar, AI, rehberler ve kontrol listeleri tek merkezde."
        : "Use calculators, guidance, checklists and AI from one workspace instead of switching between disconnected tools.",
    },
    {
      icon: "🧠",
      title: isTurkish
        ? "Genel AI\nKaynaklı AI"
        : "Generic AI\nSource-Aware AI",
      description: isTurkish
        ? "AI cevaplarının kullandığı HSE kaynaklarını da görün."
        : "SafeBase AI uses the available HSE knowledge base and shows the sources used for its response.",
    },
    {
      icon: "⚡",
      title: isTurkish
        ? "Manuel İşlemler\nAnında Sonuç"
        : "Manual Work\nInstant Results",
      description: isTurkish
        ? "Dakikalar süren HSE işlemlerini saniyeler içinde tamamlayın."
        : "Reach essential HSE calculations, field controls and practical answers in less time.",
    },
    {
      icon: "📈",
      title: isTurkish
        ? "Statik İçerik\nSürekli Gelişen Platform"
        : "Static Content\nGrowing Platform",
      description: isTurkish
        ? "Yeni araçlar ve rehberlerle sürekli gelişen bir HSE platformu."
        : "Use an HSE workspace that continues to grow with new guides, tools and professional resources.",
    },
  ];

  const statistics = [
    {
      value: "4+",
      label: isTurkish ? "Aktif Hesaplayıcı" : "Active Calculators",
    },
    {
      value: "5+",
      label: isTurkish ? "Bilgi Konusu" : "Knowledge Topics",
    },
    {
      value: "2",
      label: isTurkish ? "Desteklenen Dil" : "Supported Languages",
    },
    {
      value: "AI",
      label: isTurkish ? "HSE Asistanı" : "HSE Assistant",
    },
  ];

  const audiences = isTurkish
    ? [
        "HSE Uzmanları",
        "İş Güvenliği Mühendisleri",
        "Saha Süpervizörleri",
        "İnşaat Projeleri",
        "Petrol ve Gaz",
        "Üretim Tesisleri",
        "Kimya Tesisleri",
        "Bakım Ekipleri",
      ]
    : [
        "HSE Officers",
        "Safety Engineers",
        "Site Supervisors",
        "Construction Projects",
        "Oil & Gas",
        "Manufacturing",
        "Chemical Plants",
        "Maintenance Teams",
      ];

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

              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    value: "AI",
                    label: isTurkish ? "Bilgi Asistanı" : "Knowledge Assistant",
                  },
                  {
                    value: "TR / EN",
                    label: isTurkish ? "Çift Dil Desteği" : "Bilingual Support",
                  },
                  {
                    value: "5+",
                    label: isTurkish ? "Profesyonel Rehber" : "Professional Guides",
                  },
                  {
                    value: "24/7",
                    label: isTurkish ? "Anında Erişim" : "Instant Access",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/[0.08]"
                  >
                    <p className="text-lg font-black text-white">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-400">
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

                  <div className="mt-5 space-y-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <span className="text-emerald-400">
                        <CheckIcon />
                      </span>
                      {isTurkish
                        ? "SafeBase bilgi tabanı"
                        : "SafeBase knowledge base"}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <span className="text-emerald-400">
                        <CheckIcon />
                      </span>
                      {isTurkish
                        ? "Kullanılan kaynakları gösterir"
                        : "Displays the sources used"}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <span className="text-emerald-400">
                        <CheckIcon />
                      </span>
                      {isTurkish
                        ? "Pratik HSE rehberliği"
                        : "Practical HSE guidance"}
                    </div>
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
                    <p className="whitespace-pre-line text-2xl font-black text-white">4+</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {content.toolsLabel}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                    <p className="whitespace-pre-line text-2xl font-black text-white">5+</p>
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

      <section className="relative border-b border-white/10 bg-slate-950 px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
              {isTurkish ? "Platform Özellikleri" : "Platform Highlights"}
            </p>

            <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              {isTurkish
                ? "HSE profesyonelleri için ihtiyacınız olan her şey"
                : "Everything HSE professionals need in one place"}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {isTurkish
                ? "Yapay zekâ, profesyonel rehberler, hesaplayıcılar, kontrol listeleri ve indirilebilir kaynaklarla günlük HSE çalışmalarınızı hızlandırın."
                : "Work faster with AI guidance, professional knowledge, calculators, inspection checklists and downloadable HSE resources."}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                icon: "🤖",
                title: isTurkish ? "Yapay Zekâ Asistanı" : "AI Assistant",
                description: isTurkish
                  ? "SafeBase bilgi tabanından beslenen pratik ve kaynaklı HSE yanıtları alın."
                  : "Get practical HSE answers backed by the SafeBase knowledge base.",
                href: `/${locale}/ai-assistant`,
              },
              {
                icon: "📚",
                title: isTurkish ? "Bilgi Merkezi" : "Knowledge Base",
                description: isTurkish
                  ? "Kritik iş güvenliği konularına yönelik profesyonel rehberlere ulaşın."
                  : "Access professional guidance for critical workplace safety topics.",
                href: `/${locale}/knowledge-base`,
              },
              {
                icon: "🧮",
                title: isTurkish ? "Hesaplayıcılar" : "Calculators",
                description: isTurkish
                  ? "TRIR, LTIFR, risk matrisi ve diğer HSE hesaplamalarını hızlıca yapın."
                  : "Calculate TRIR, LTIFR, risk scores and other HSE metrics quickly.",
                href: `/${locale}/tools`,
              },
              {
                icon: "✅",
                title: isTurkish ? "Kontrol Listeleri" : "Checklists",
                description: isTurkish
                  ? "Saha denetimleri için yapılandırılmış ve uygulanabilir kontrol listeleri kullanın."
                  : "Use structured, practical checklists for workplace inspections.",
                href: `/${locale}/checklists`,
              },
              {
                icon: "📄",
                title: isTurkish ? "Şablonlar" : "Templates",
                description: isTurkish
                  ? "Risk değerlendirmesi, toolbox ve raporlama için hazır dokümanlara ulaşın."
                  : "Access ready-to-use documents for risk, toolbox talks and reporting.",
                href: `/${locale}/downloads`,
              },
              {
                icon: "⬇️",
                title: isTurkish ? "İndirilebilir Kaynaklar" : "Downloads",
                description: isTurkish
                  ? "Profesyonel HSE dokümanlarını tek merkezden keşfedin."
                  : "Discover professional HSE resources from one central library.",
                href: `/${locale}/downloads`,
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/[0.07]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-2xl">
                    {item.icon}
                  </span>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-400">
                      {item.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-300 transition group-hover:gap-3 group-hover:text-blue-200">
                      {isTurkish ? "Keşfet" : "Explore"}
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950 py-24">
        <div className="absolute left-[-180px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute right-[-160px] top-[-100px] h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
              {content.whyEyebrow}
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {content.whyTitle}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              {content.whyDescription}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((item) => (
              <article
                key={item.title}
                className="group rounded-[26px] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.07]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-3xl shadow-lg shadow-black/20">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-400">
                {content.statsEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                {content.statsTitle}
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {statistics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-7 text-center shadow-xl shadow-black/10"
                >
                  <p className="text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                    {item.value}
                  </p>

                  <p className="mt-3 text-sm font-bold text-slate-400 sm:text-base">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-7 shadow-2xl shadow-black/20 sm:p-10">
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
                {content.audienceEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                {content.audienceTitle}
              </h2>
            </div>

            <div className="mx-auto mt-9 flex max-w-5xl flex-wrap justify-center gap-3">
              {audiences.map((audience) => (
                <span
                  key={audience}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/[0.08] hover:text-white"
                >
                  <span className="text-emerald-400">✓</span>
                  {audience}
                </span>
              ))}
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