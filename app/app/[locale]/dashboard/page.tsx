import LogoutButton from "./LogoutButton";
import CompanyBranding from "./CompanyBranding";
import RiskAssessmentActions from "./RiskAssessmentActions"; 
import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { routing } from "../../../i18n/routing";
import { createClient } from "@/utils/supabase/server";



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

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?next=/${locale}/dashboard`);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name,plan,role,status")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    redirect(`/${locale}/login`);
  }

  if (profile.status === "suspended") {
    redirect(`/${locale}/account-suspended`);
  }

  const displayName =
    profile.full_name ||
    user.email?.split("@")[0] ||
    (isTurkish ? "Kullanıcı" : "User");

  const isPremium =
    profile.plan === "premium" || profile.role === "admin";

  const { data: riskAssessments } = await supabase
    .from("risk_assessments")
    .select(
      "id,title,project_name,company_name,document_no,assessment_date,risk_items,updated_at"
    )
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(5);


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
                {displayName} 👋
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
                  {isPremium
                    ? isTurkish
                      ? "Premium"
                      : "Premium"
                    : isTurkish
                      ? "Ücretsiz"
                      : "Free"}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {isPremium
                    ? isTurkish
                      ? "Tüm premium SafeBase özelliklerine erişim"
                      : "Access to all premium SafeBase features"
                    : isTurkish
                      ? "Temel SafeBase araçlarına erişim"
                      : "Access to core SafeBase tools"}
                </p>
              </div>

              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-300">
                {isPremium ? "PREMIUM" : "FREE"}
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

        <CompanyBranding
          locale={locale}
          userId={user.id}
          isPremium={isPremium}
        />

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {isTurkish ? "Risk Analizlerim" : "My Risk Assessments"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {isTurkish
                  ? "Kaydettiğiniz profesyonel HIRARC değerlendirmelerini görüntüleyin."
                  : "View your saved professional HIRARC assessments."}
              </p>
            </div>

            <Link
              href={`/${locale}/tools/quick-risk-assessment`}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              {isTurkish ? "+ Yeni Risk Analizi" : "+ New Risk Assessment"}
            </Link>
          </div>

          {riskAssessments && riskAssessments.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {riskAssessments.map((assessment) => {
                const riskCount = Array.isArray(assessment.risk_items)
                  ? assessment.risk_items.length
                  : 0;

                return (
                  <article
                    key={assessment.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-white">
                            {assessment.title ||
                              assessment.document_no ||
                              (isTurkish ? "Risk Analizi" : "Risk Assessment")}
                          </h3>

                          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                            {riskCount} {isTurkish ? "risk" : "risks"}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
                          {assessment.project_name && (
                            <span>
                              {isTurkish ? "Proje:" : "Project:"}{" "}
                              {assessment.project_name}
                            </span>
                          )}

                          {assessment.company_name && (
                            <span>
                              {isTurkish ? "Şirket:" : "Company:"}{" "}
                              {assessment.company_name}
                            </span>
                          )}

                          {assessment.assessment_date && (
                            <span>
                              {isTurkish ? "Tarih:" : "Date:"}{" "}
                              {assessment.assessment_date}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/${locale}/tools/quick-risk-assessment?assessment=${assessment.id}`}
                          className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
                        >
                          {isTurkish ? "Analizi Aç" : "Open Assessment"}
                        </Link>

                        <RiskAssessmentActions
                          assessmentId={assessment.id}
                          locale={locale}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-6 py-10 text-center">
              <div className="text-4xl">🛡️</div>
              <h3 className="mt-4 font-semibold">
                {isTurkish
                  ? "Henüz kayıtlı risk analizi yok"
                  : "No saved risk assessments yet"}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "İlk profesyonel HIRARC değerlendirmenizi oluşturup kaydettiğinizde burada görünecek."
                  : "Your saved professional HIRARC assessments will appear here."}
              </p>
            </div>
          )}
        </section>

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
