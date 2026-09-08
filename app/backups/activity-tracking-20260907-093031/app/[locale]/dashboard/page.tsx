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

const workspaceCards = [
  {
    code: "PDF",
    enTitle: "Company-branded documents",
    trTitle: "Şirket markalı dokümanlar",
    enText: "Generate professional HSE PDFs with your company identity.",
    trText: "Şirket kimliğinizle profesyonel HSE PDF'leri oluşturun.",
  },
  {
    code: "RA",
    enTitle: "Risk workspace",
    trTitle: "Risk çalışma alanı",
    enText: "Create, save and manage professional risk assessments.",
    trText: "Profesyonel risk analizleri oluşturun, kaydedin ve yönetin.",
  },
  {
    code: "FC",
    enTitle: "Field controls",
    trTitle: "Saha kontrolleri",
    enText: "Use structured inspection, verification and sign-off workflows.",
    trText: "Denetim, doğrulama ve onay süreçlerini yapılandırılmış şekilde yönetin.",
  },
  {
    code: "AI",
    enTitle: "HSE intelligence",
    trTitle: "HSE zekâ desteği",
    enText: "Use AI-assisted guidance across your HSE workflow.",
    trText: "HSE süreçlerinizde AI destekli rehberlik kullanın.",
  },
];

const quickActions = [
  {
    code: "RA",
    enTitle: "Create Risk Assessment",
    trTitle: "Risk Analizi Oluştur",
    enText: "Build and save a structured professional risk assessment.",
    trText: "Yapılandırılmış profesyonel risk analizi oluşturun ve kaydedin.",
    href: "/tools/quick-risk-assessment",
  },
  {
    code: "TB",
    enTitle: "Toolbox Talks",
    trTitle: "Toolbox Talk",
    enText: "Open field-ready toolbox talks and premium company PDFs.",
    trText: "Saha kullanımına hazır toolbox içeriklerini ve şirket PDF'lerini açın.",
    href: "/toolbox",
  },
  {
    code: "CL",
    enTitle: "Inspections",
    trTitle: "Denetimler",
    enText: "Run professional HSE checklists and field inspections.",
    trText: "Profesyonel HSE kontrol listeleri ve saha denetimleri uygulayın.",
    href: "/checklists",
  },
  {
    code: "AI",
    enTitle: "AI Assistant",
    trTitle: "AI Asistan",
    enText: "Get structured HSE guidance for practical site situations.",
    trText: "Sahadaki pratik durumlar için yapılandırılmış HSE desteği alın.",
    href: "/ai-assistant",
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
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-cyan-500/5 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  {isPremium
                    ? isTurkish
                      ? "Premium Workspace"
                      : "Premium Workspace"
                    : isTurkish
                      ? "SERNEM Workspace"
                      : "SERNEM Workspace"}
                </span>

                {isPremium && (
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {isTurkish ? "Premium aktif" : "Premium active"}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {isTurkish ? "Hoş geldin, " : "Welcome back, "}
                <span className="text-blue-400">{displayName}</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                {isPremium
                  ? isTurkish
                    ? "Risk analizleri, saha kontrolleri, şirket markalı HSE dokümanları ve AI destekli araçlar için profesyonel çalışma alanınız."
                    : "Your professional workspace for risk assessments, field controls, company-branded HSE documents and AI-assisted tools."
                  : isTurkish
                    ? "Profesyonel HSE araçlarınızı, denetimlerinizi ve dokümanlarınızı tek merkezden yönetin."
                    : "Manage your professional HSE tools, inspections and documents from one workspace."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={`/${locale}/tools/quick-risk-assessment`}
                className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                {isTurkish ? "+ Risk Analizi Oluştur" : "+ Create Risk Assessment"}
              </Link>

              <Link
                href={`/${locale}/toolbox`}
                className="inline-flex min-w-[190px] items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 font-semibold text-slate-200 transition hover:border-blue-500/50 hover:bg-slate-900"
              >
                {isTurkish ? "Toolbox Talk Aç" : "Open Toolbox Talks"}
              </Link>

              <LogoutButton locale={locale} />
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {workspaceCards.map((card) => (
            <article
              key={card.enTitle}
              className="group rounded-2xl border border-slate-800 bg-slate-900/65 p-5 transition hover:border-blue-500/40 hover:bg-slate-900"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 min-w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 text-xs font-black tracking-[0.12em] text-blue-300">
                  {card.code}
                </div>

                {isPremium && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Premium
                  </span>
                )}
              </div>

              <h2 className="font-semibold text-white">
                {isTurkish ? card.trTitle : card.enTitle}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {isTurkish ? card.trText : card.enText}
              </p>
            </article>
          ))}
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                {isTurkish ? "Çalışma merkezi" : "Control center"}
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {isTurkish ? "Hızlı işlemler" : "Quick actions"}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {isTurkish
                  ? "Sahada ve ofiste en sık kullandığınız HSE süreçlerine doğrudan erişin."
                  : "Jump directly into the HSE workflows you use most in the field and office."}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.enTitle}
                  href={`/${locale}${action.href}`}
                  className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-slate-950"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-2 text-[11px] font-black tracking-[0.1em] text-blue-300 transition group-hover:border-blue-500/40">
                      {action.code}
                    </div>

                    <span className="text-lg text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400">
                      →
                    </span>
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

          <aside className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-500/15 via-slate-900 to-slate-950 p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                {isTurkish ? "Workspace planı" : "Workspace plan"}
              </p>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {isPremium ? "Premium" : isTurkish ? "Ücretsiz" : "Free"}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {isPremium
                      ? isTurkish
                        ? "Profesyonel HSE dokümanları ve gelişmiş çalışma alanı aktif."
                        : "Professional HSE documents and advanced workspace features are active."
                      : isTurkish
                        ? "Temel SERNEM araçları aktif."
                        : "Core SERNEM tools are active."}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isPremium
                      ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                      : "border border-slate-700 bg-slate-900 text-slate-400"
                  }`}
                >
                  {isPremium ? "ACTIVE" : "FREE"}
                </span>
              </div>

              <div className="my-6 h-px bg-slate-800" />

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">✓</span>
                  <span>
                    {isTurkish
                      ? "Şirket logolu Premium PDF dokümanları"
                      : "Company-branded Premium PDF documents"}
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">✓</span>
                  <span>
                    {isTurkish
                      ? "Doküman referansı ve revizyon kontrolü"
                      : "Document reference and revision control"}
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">✓</span>
                  <span>
                    {isTurkish
                      ? "Profesyonel risk ve saha araçları"
                      : "Professional risk and field tools"}
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="font-bold text-emerald-400">✓</span>
                  <span>
                    {isTurkish
                      ? "AI destekli HSE çalışma alanı"
                      : "AI-assisted HSE workspace"}
                  </span>
                </li>
              </ul>

              {isPremium ? (
                <a
                  href="#company-branding"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 font-semibold text-blue-200 transition hover:bg-blue-500/20"
                >
                  {isTurkish
                    ? "Şirket Kimliğini Yönet"
                    : "Manage Company Branding"}
                </a>
              ) : (
                <Link
                  href={`/${locale}/upgrade`}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  {isTurkish ? "Premium'a Geç" : "Upgrade to Premium"}
                </Link>
              )}
            </div>
          </aside>
        </div>

                <div id="company-branding" className="scroll-mt-24">
          <CompanyBranding
            locale={locale}
            userId={user.id}
            isPremium={isPremium}
          />
        </div>

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
