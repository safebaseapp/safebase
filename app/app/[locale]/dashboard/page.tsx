import LogoutButton from "./LogoutButton"; 
import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";



type Props = {
  params: Promise<{ locale: string }>;
};

const statCards = [
  {
    icon: "✅",
    value: "0",
    en: "Completed inspections",
    tr: "Tamamlanan denetimler",
  },
  {
    icon: "🤖",
    value: "0",
    en: "AI assessments",
    tr: "AI değerlendirmeleri",
  },
  {
    icon: "📚",
    value: "0",
    en: "Saved resources",
    tr: "Kaydedilen kaynaklar",
  },
  {
    icon: "📥",
    value: "0",
    en: "Downloads",
    tr: "İndirmeler",
  },
];

const quickActions = [
  {
    icon: "📝",
    enTitle: "Start an inspection",
    trTitle: "Denetim başlat",
    enText: "Open a professional HSE checklist.",
    trText: "Profesyonel bir HSE kontrol listesi aç.",
    href: "/checklists",
  },
  {
    icon: "🤖",
    enTitle: "Ask AI Assistant",
    trTitle: "AI asistana sor",
    enText: "Get structured HSE guidance.",
    trText: "Yapılandırılmış HSE desteği al.",
    href: "/ai-assistant",
  },
  {
    icon: "📚",
    enTitle: "Knowledge Base",
    trTitle: "Bilgi merkezi",
    enText: "Browse practical safety guides.",
    trText: "Pratik güvenlik rehberlerini incele.",
    href: "/knowledge",
  },
  {
    icon: "📄",
    enTitle: "Download resources",
    trTitle: "Kaynak indir",
    enText: "Access templates and documents.",
    trText: "Şablonlara ve dokümanlara ulaş.",
    href: "/templates",
  },
];

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const isTurkish = locale === "tr";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
              {isTurkish ? "SafeBase çalışma alanı" : "SafeBase workspace"}
            </p>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {isTurkish ? "Tekrar hoş geldin," : "Welcome back,"}
              </h1>

              <p className="mt-2 text-2xl font-semibold text-blue-400">
                Sercan 👋
              </p>
            </div>

            <p className="mt-3 max-w-2xl text-slate-400">
              {isTurkish
                ? "Denetimlerini, AI değerlendirmelerini ve profesyonel HSE kaynaklarını tek merkezden yönet."
                : "Manage your inspections, AI assessments and professional HSE resources from one workspace."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
          <Link
         href={`/${locale}/checklists`}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
          {isTurkish ? "+ Yeni denetim" : "+ New inspection"}
         </Link>

         <LogoutButton locale={locale} />
         </div>
         </div>

         <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article
              key={card.en}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/10"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-2xl">{card.icon}</span>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-semibold text-slate-400">
                  {isTurkish ? "Toplam" : "Total"}
                </span>
              </div>

              <p className="text-3xl font-bold">{card.value}</p>

              <p className="mt-2 text-sm text-slate-400">
                {isTurkish ? card.tr : card.en}
              </p>
            </article>
          ))}
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {isTurkish ? "Hızlı işlemler" : "Quick actions"}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {isTurkish
                    ? "En çok kullanılan SafeBase araçlarına ulaş."
                    : "Access your most-used SafeBase tools."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.enTitle}
                  href={`/${locale}${action.href}`}
                  className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-blue-500/60 hover:bg-slate-900"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                    {action.icon}
                  </div>

                  <h3 className="font-semibold text-white transition group-hover:text-blue-300">
                    {isTurkish ? action.trTitle : action.enTitle}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {isTurkish ? action.trText : action.enText}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-500/15 to-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              {isTurkish ? "Mevcut plan" : "Current plan"}
            </p>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {isTurkish ? "Ücretsiz" : "Free"}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {isTurkish
                    ? "Temel SafeBase araçlarına erişim"
                    : "Access to core SafeBase tools"}
                </p>
              </div>

              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-300">
                FREE
              </span>
            </div>

            <div className="my-6 h-px bg-slate-800" />

            <ul className="space-y-3 text-sm text-slate-300">
              <li>✓ {isTurkish ? "HSE hesaplayıcıları" : "HSE calculators"}</li>
              <li>
                ✓ {isTurkish ? "Temel kontrol listeleri" : "Core checklists"}
              </li>
              <li>
                ✓{" "}
                {isTurkish ? "Bilgi merkezi erişimi" : "Knowledge Base access"}
              </li>
            </ul>

            <button
              type="button"
              className="mt-7 w-full rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-3 font-semibold text-blue-200 transition hover:bg-blue-500/20"
            >
              {isTurkish ? "PRO özelliklerini keşfet" : "Explore PRO features"}
            </button>
          </aside>
        </div>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {isTurkish ? "Son aktiviteler" : "Recent activity"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {isTurkish
                  ? "Tamamlanan denetimler ve AI analizleri burada görünecek."
                  : "Completed inspections and AI analyses will appear here."}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-6 py-12 text-center">
            <div className="text-4xl">📋</div>

            <h3 className="mt-4 font-semibold">
              {isTurkish ? "Henüz aktivite yok" : "No activity yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              {isTurkish
                ? "İlk denetimini tamamladığında sonuçların ve güvenlik skorun burada listelenecek."
                : "When you complete your first inspection, its results and safety score will be listed here."}
            </p>

            <Link
              href={`/${locale}/checklists`}
              className="mt-5 inline-flex rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-700"
            >
              {isTurkish ? "Kontrol listelerini aç" : "Open checklists"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
