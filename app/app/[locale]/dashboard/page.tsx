import ActivityTracker from "@/components/analytics/ActivityTracker";
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

function formatMetric(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return value.toFixed(2);
}

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string | null | undefined, locale: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

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

  const firstName = displayName.trim().split(/\s+/)[0] || displayName;
  const isPremium = profile.plan === "premium" || profile.role === "admin";

  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const periodMonth = `${year}-${month}-01`;
  const monthStartIso = `${year}-${month}-01T00:00:00.000Z`;

  const { data: riskAssessments } = await supabase
    .from("risk_assessments")
    .select(
      "id,title,project_name,company_name,document_no,assessment_date,risk_items,updated_at",
    )
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(5);

  const { data: hseDashboardObservations } = await supabase
    .from("hse_observations")
    .select(
      "id,title,project_name,status,risk_level,target_date,created_at,observation_type",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: incidentMetricRows } = await supabase
    .from("hse_incident_metrics")
    .select(
      "project_name,worked_hours,near_miss,recordable_cases,lti,lost_days",
    )
    .eq("user_id", user.id)
    .eq("period_month", periodMonth);

  const hseObservations = hseDashboardObservations ?? [];
  const metrics = incidentMetricRows ?? [];

  const allProjectsMetric =
    metrics.find((item) => item.project_name === "All Projects") ?? null;

  const workedHours = Number(allProjectsMetric?.worked_hours ?? 0);
  const recordableCases = Number(allProjectsMetric?.recordable_cases ?? 0);
  const lostTimeInjuries = Number(allProjectsMetric?.lti ?? 0);
  const lostDays = Number(allProjectsMetric?.lost_days ?? 0);
  const nearMiss = Number(allProjectsMetric?.near_miss ?? 0);

  const trir =
    workedHours > 0 ? (recordableCases * 200000) / workedHours : null;
  const ltifr =
    workedHours > 0 ? (lostTimeInjuries * 1000000) / workedHours : null;
  const severityRate =
    workedHours > 0 ? (lostDays * 200000) / workedHours : null;

  const hseTotal = hseObservations.length;
  const hseOpen = hseObservations.filter(
    (item) => item.status !== "closed",
  ).length;
  const hseClosed = hseObservations.filter(
    (item) => item.status === "closed",
  ).length;
  const hseCriticalOpen = hseObservations.filter(
    (item) => item.status !== "closed" && item.risk_level === "critical",
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueActions = hseObservations.filter((item) => {
    if (item.status === "closed" || !item.target_date) return false;
    const targetDate = new Date(item.target_date);
    return !Number.isNaN(targetDate.getTime()) && targetDate < today;
  }).length;

  const observationsThisMonth = hseObservations.filter(
    (item) => item.created_at && item.created_at >= monthStartIso,
  ).length;

  const projectHours = metrics
    .filter((item) => item.project_name && item.project_name !== "All Projects")
    .reduce((sum, item) => sum + Number(item.worked_hours ?? 0), 0);

  const hoursMismatch =
    workedHours > 0 &&
    projectHours > 0 &&
    Math.abs(workedHours - projectHours) > 0.01;

  const navItems = [
    [isTurkish ? "Dashboard" : "Dashboard", `/${locale}/dashboard`, "DB"],
    [
      isTurkish ? "Risk Analizi" : "Risk Assessment",
      `/${locale}/tools/quick-risk-assessment`,
      "RA",
    ],
    ["Method Statement", `/${locale}/tools/method-statement`, "MS"],
    ["Toolbox", `/${locale}/toolbox`, "TB"],
    [
      isTurkish ? "Saha Kontrolleri" : "Field Inspections",
      `/${locale}/checklists`,
      "FC",
    ],
    [
      isTurkish ? "Gözlemler & Aksiyonlar" : "Observations & Actions",
      `/${locale}/hse-performance/observations`,
      "OA",
    ],
    [
      isTurkish ? "Olay Yönetimi" : "Incident Management",
      `/${locale}/hse-performance/incidents`,
      "IM",
    ],
    [
      isTurkish ? "Raporlar" : "Reports",
      isPremium ? `/${locale}/hse-performance/report` : `/${locale}/upgrade`,
      "RP",
    ],
    [
      isTurkish ? "Trend Analizi" : "Trend Analysis",
      isPremium ? `/${locale}/hse-performance` : `/${locale}/upgrade`,
      "TA",
    ],
    [isTurkish ? "İndirmeler" : "Downloads", `/${locale}/downloads`, "DL"],
    [isTurkish ? "AI Asistan" : "AI Assistant", `/${locale}/ai-assistant`, "AI"],
  ];

  const quickActions = [
    [
      isTurkish ? "Risk Analizi Oluştur" : "Create Risk Assessment",
      `/${locale}/tools/quick-risk-assessment`,
      "RA",
    ],
    ["Method Statement", `/${locale}/tools/method-statement`, "MS"],
    [isTurkish ? "Toolbox Aç" : "Open Toolbox", `/${locale}/toolbox`, "TB"],
    [
      isTurkish ? "Saha Kontrolü Başlat" : "Start Inspection",
      `/${locale}/checklists`,
      "FC",
    ],
    [
      isTurkish ? "Gözlem Ekle" : "Add Observation",
      `/${locale}/hse-performance/observations`,
      "OA",
    ],
    [
      isTurkish ? "Olay Kaydı" : "Incident Record",
      `/${locale}/hse-performance/incidents`,
      "IM",
    ],
  ];

  return (
    <main className="min-h-screen bg-[#020814] text-white">
      <ActivityTracker eventName="dashboard_open" />

      <div className="mx-auto flex w-full max-w-[1660px] gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[250px] shrink-0 flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#071423] p-4 shadow-2xl shadow-black/20 lg:flex">
          <div className="border-b border-slate-800 px-2 pb-5 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-sm font-black text-blue-300">
                S
              </div>
              <div>
                <p className="font-black tracking-[0.12em]">SERNEM</p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  HSE Command Center
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-4 space-y-1 overflow-y-auto pr-1">
            {navItems.map(([label, href, code], index) => (
              <Link
                key={String(label)}
                href={String(href)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${
                  index === 0
                    ? "border border-blue-500/30 bg-blue-600/20 text-white"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border text-[9px] font-black ${
                    index === 0
                      ? "border-blue-400/30 bg-blue-500/15 text-blue-200"
                      : "border-slate-800 bg-slate-950/60 text-slate-600"
                  }`}
                >
                  {code}
                </span>
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {(code === "RP" || code === "TA") && (
                  <span className="text-[9px] text-amber-300">PRO</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-600">
                    {isTurkish ? "Plan" : "Plan"}
                  </p>
                  <p className="mt-1 text-sm font-black">
                    {isPremium ? "Premium" : "Free"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[9px] font-black ${
                    isPremium
                      ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                      : "border border-slate-700 bg-slate-900 text-slate-500"
                  }`}
                >
                  {isPremium ? "ACTIVE" : "FREE"}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <LogoutButton locale={locale} />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center rounded-2xl border border-slate-800 bg-[#071423] px-4 py-3 shadow-lg shadow-black/10">
            <span className="mr-3 text-slate-600">⌕</span>
            <span className="truncate text-sm text-slate-500">
              {isTurkish
                ? "Ara… doküman, araç, şablon veya HSE kaydı"
                : "Search… document, tool, template or HSE record"}
            </span>
            <span className="ml-auto rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1 text-[10px] font-black text-slate-500">
              {locale.toUpperCase()}
            </span>
          </div>

          <section className="relative overflow-hidden rounded-[30px] border border-blue-900/60 bg-gradient-to-r from-[#08172a] via-[#0b2244] to-[#0d3971] p-6 shadow-2xl shadow-blue-950/20 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[1.5fr_.5fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.20em] text-cyan-200">
                  SERNEM WORKSPACE
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl xl:text-5xl">
                  {isTurkish ? "Hoş geldin, " : "Welcome, "}
                  <span className="text-blue-300">{firstName}</span>
                  <span className="ml-2">👋</span>
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100/65 sm:text-base">
                  {isTurkish
                    ? "HSE süreçlerini tek merkezden yönet, riskleri azalt ve saha performansını gerçek verilerle takip et."
                    : "Manage HSE processes from one command center, reduce risk and track field performance with real data."}
                </p>
              </div>

              <div className="hidden lg:block">
                <div className="relative mx-auto h-32 w-44">
                  <div className="absolute right-8 top-0 h-24 w-32 rotate-6 rounded-2xl border border-blue-300/20 bg-blue-400/10" />
                  <div className="absolute right-0 top-6 h-24 w-32 -rotate-3 rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06]" />
                  <div className="absolute right-12 top-8 flex h-24 w-32 items-center justify-center rounded-2xl border border-blue-300/30 bg-[#0b2c5d]/90 text-4xl font-black text-blue-200 shadow-2xl shadow-blue-500/20">
                    S
                  </div>
                </div>
              </div>
            </div>
          </section>

          {hoursMismatch && (
            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] px-4 py-3">
              <p className="text-sm font-black text-amber-200">
                ⚠ {isTurkish ? "Çalışılan saat kontrolü gerekli" : "Worked-hours review required"}
              </p>
              <p className="mt-1 text-xs leading-5 text-amber-100/60">
                {isTurkish
                  ? `Tüm Projeler kaydı ${formatNumber(workedHours, locale)} saat; proje kayıtlarının toplamı ${formatNumber(projectHours, locale)} saat.`
                  : `All Projects records ${formatNumber(workedHours, locale)} hours; project rows total ${formatNumber(projectHours, locale)} hours.`}
              </p>
            </div>
          )}

          <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [
                isTurkish ? "Çalışılan Saat" : "Worked Hours",
                workedHours > 0 ? formatNumber(workedHours, locale) : "—",
                isTurkish ? "Bu ay · Tüm projeler" : "This month · All projects",
                "WH",
              ],
              ["TRIR", formatMetric(trir), isTurkish ? "200.000 saat bazlı" : "Per 200,000 hours", "TR"],
              ["LTIFR", formatMetric(ltifr), isTurkish ? "1.000.000 saat bazlı" : "Per 1,000,000 hours", "LT"],
              ["Severity Rate", formatMetric(severityRate), isTurkish ? "Kayıp gün / 200.000 saat" : "Lost days / 200,000 hours", "SR"],
            ].map(([label, value, meta, code]) => (
              <article
                key={String(label)}
                className="rounded-2xl border border-slate-800 bg-[#071423] p-4 shadow-lg shadow-black/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl font-black tracking-tight text-white">
                      {value}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/[0.08] text-[10px] font-black text-blue-300">
                    {code}
                  </span>
                </div>
                <p className="mt-3 text-[10px] text-slate-600">{meta}</p>
              </article>
            ))}
          </section>

          <section className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [isTurkish ? "Açık Aksiyon" : "Open Actions", hseOpen, hseCriticalOpen > 0 ? `${hseCriticalOpen} ${isTurkish ? "kritik" : "critical"}` : isTurkish ? "Kritik açık yok" : "No critical open", hseCriticalOpen > 0 ? "text-red-300" : "text-emerald-300"],
              [isTurkish ? "Geciken Aksiyon" : "Overdue Actions", overdueActions, overdueActions > 0 ? isTurkish ? "Takip gerekiyor" : "Follow-up required" : isTurkish ? "Takvim temiz" : "On schedule", overdueActions > 0 ? "text-amber-300" : "text-emerald-300"],
              [isTurkish ? "Bu Ay Gözlem" : "Observations This Month", observationsThisMonth, isTurkish ? "Saha kayıtları" : "Field records", "text-cyan-300"],
              [isTurkish ? "Ramak Kala" : "Near Miss", nearMiss, isTurkish ? "Bu ay · Tüm projeler" : "This month · All projects", nearMiss > 0 ? "text-amber-300" : "text-emerald-300"],
            ].map(([label, value, detail, tone]) => (
              <article
                key={String(label)}
                className="rounded-2xl border border-slate-800 bg-slate-950/45 px-4 py-3.5"
              >
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500">{label}</p>
                    <p className="mt-1 text-2xl font-black text-slate-100">{value}</p>
                  </div>
                  <p className={`pb-1 text-[10px] font-bold ${tone}`}>{detail}</p>
                </div>
              </article>
            ))}
          </section>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.75fr]">
            <section className="overflow-hidden rounded-[28px] border border-slate-800 bg-[#071423]">
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
                <div>
                  <h2 className="font-black">
                    {isTurkish ? "Son Çalışmalar" : "Recent Work"}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {isTurkish
                      ? "En son oluşturduğunuz HSE kayıtları"
                      : "Your latest HSE records"}
                  </p>
                </div>
                <Link
                  href={`/${locale}/tools/quick-risk-assessment`}
                  className="hidden rounded-xl border border-blue-500/25 bg-blue-500/[0.06] px-3 py-2 text-xs font-bold text-blue-300 sm:inline-flex"
                >
                  {isTurkish ? "Tümünü gör →" : "View all →"}
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead className="bg-slate-950/45 text-[9px] font-black uppercase tracking-[0.16em] text-slate-600">
                    <tr>
                      <th className="px-5 py-3">{isTurkish ? "Kayıt" : "Record"}</th>
                      <th className="px-4 py-3">{isTurkish ? "Tür" : "Type"}</th>
                      <th className="px-4 py-3">{isTurkish ? "Tarih" : "Date"}</th>
                      <th className="px-4 py-3">{isTurkish ? "Durum" : "Status"}</th>
                      <th className="px-5 py-3 text-right"> </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-sm">
                    {riskAssessments && riskAssessments.length > 0 ? (
                      riskAssessments.map((assessment) => {
                        const riskCount = Array.isArray(assessment.risk_items)
                          ? assessment.risk_items.length
                          : 0;

                        return (
                          <tr key={assessment.id} className="hover:bg-white/[0.02]">
                            <td className="px-5 py-3.5">
                              <p className="font-bold text-slate-200">
                                {assessment.title ||
                                  assessment.document_no ||
                                  (isTurkish ? "Risk Analizi" : "Risk Assessment")}
                              </p>
                              <p className="mt-0.5 text-[10px] text-slate-600">
                                {assessment.project_name ||
                                  (isTurkish ? "Proje belirtilmedi" : "No project")}
                              </p>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-2.5 py-1 text-[10px] font-bold text-blue-300">
                                {isTurkish ? "Risk Analizi" : "Risk Assessment"}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-slate-500">
                              {formatDate(assessment.updated_at, locale)}
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-[10px] font-bold text-emerald-300">
                                ✓ {riskCount} {isTurkish ? "risk" : "risks"}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <Link
                                href={`/${locale}/tools/quick-risk-assessment?assessment=${assessment.id}`}
                                className="text-xs font-bold text-slate-500 hover:text-blue-300"
                              >
                                {isTurkish ? "Aç →" : "Open →"}
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <p className="font-bold text-slate-400">
                            {isTurkish
                              ? "Henüz kayıtlı çalışma yok"
                              : "No saved work yet"}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-4">
              <section className="rounded-[28px] border border-slate-800 bg-[#071423] p-4">
                <div className="mb-3">
                  <h2 className="text-sm font-black">
                    {isTurkish ? "Hızlı İşlemler" : "Quick Actions"}
                  </h2>
                  <p className="mt-1 text-[10px] text-slate-600">
                    {isTurkish
                      ? "Sık kullanılan HSE araçları"
                      : "Frequently used HSE tools"}
                  </p>
                </div>

                <div className="space-y-2">
                  {quickActions.map(([label, href, code], index) => (
                    <Link
                      key={String(label)}
                      href={String(href)}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                        index === 0
                          ? "border-blue-400/30 bg-blue-600 text-white hover:bg-blue-500"
                          : "border-slate-800 bg-slate-950/40 text-slate-300 hover:border-blue-500/30"
                      }`}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/10 text-[9px] font-black">
                        {code}
                      </span>
                      <span className="flex-1">{label}</span>
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-[28px] border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.09] to-[#071423] p-4">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-300">
                  DOWNLOAD CENTER
                </p>
                <h2 className="mt-2 text-sm font-black">
                  {isTurkish ? "İndirme Merkezi" : "Download Center"}
                </h2>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                  {isTurkish
                    ? "Hazır şablonlar, posterler, safety signs ve saha kaynakları."
                    : "Ready templates, posters, safety signs and field resources."}
                </p>
                <Link
                  href={`/${locale}/downloads`}
                  className="mt-3 inline-flex text-xs font-bold text-blue-300"
                >
                  {isTurkish ? "İndirmelere git →" : "Open downloads →"}
                </Link>
              </section>
            </aside>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr_.8fr]">
            <section className="rounded-[28px] border border-slate-800 bg-[#071423] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-black">
                    {isTurkish ? "Son Gözlemler" : "Recent Observations"}
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-600">
                    {isTurkish
                      ? "Sahadan gelen son kayıtlar"
                      : "Latest records from the field"}
                  </p>
                </div>
                <Link
                  href={`/${locale}/hse-performance/observations`}
                  className="text-xs font-bold text-blue-300"
                >
                  {isTurkish ? "Tümü →" : "All →"}
                </Link>
              </div>

              <div className="mt-4 space-y-2.5">
                {hseObservations.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/35 p-3"
                  >
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        item.risk_level === "critical"
                          ? "bg-red-400"
                          : item.risk_level === "high"
                            ? "bg-amber-400"
                            : item.risk_level === "medium"
                              ? "bg-blue-400"
                              : "bg-emerald-400"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-300">
                        {item.title ||
                          (isTurkish ? "Saha gözlemi" : "Field observation")}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-slate-600">
                        {item.project_name ||
                          (isTurkish ? "Genel saha" : "General site")}
                        {" · "}
                        {formatDate(item.created_at, locale)}
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase ${
                        item.status === "closed"
                          ? "text-emerald-300"
                          : "text-amber-300"
                      }`}
                    >
                      {item.status === "closed"
                        ? isTurkish
                          ? "Kapalı"
                          : "Closed"
                        : isTurkish
                          ? "Açık"
                          : "Open"}
                    </span>
                  </div>
                ))}

                {hseObservations.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-xs text-slate-600">
                    {isTurkish
                      ? "Henüz saha gözlemi yok."
                      : "No field observations yet."}
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-800 bg-[#071423] p-5">
              <h2 className="font-black">
                {isTurkish ? "Aksiyon Takibi" : "Action Tracking"}
              </h2>
              <p className="mt-1 text-[11px] text-slate-600">
                {isTurkish
                  ? "Öncelikli açık ve geciken işler"
                  : "Priority open and overdue actions"}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-amber-400/15 bg-amber-500/[0.05] p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-300/70">
                    {isTurkish ? "Açık" : "Open"}
                  </p>
                  <p className="mt-1 text-3xl font-black text-amber-200">
                    {hseOpen}
                  </p>
                </div>
                <div className="rounded-2xl border border-red-400/15 bg-red-500/[0.05] p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-red-300/70">
                    {isTurkish ? "Geciken" : "Overdue"}
                  </p>
                  <p className="mt-1 text-3xl font-black text-red-200">
                    {overdueActions}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/35 p-3 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">
                    {isTurkish ? "Kritik açık aksiyon" : "Critical open action"}
                  </span>
                  <span
                    className={`font-black ${
                      hseCriticalOpen > 0 ? "text-red-300" : "text-emerald-300"
                    }`}
                  >
                    {hseCriticalOpen}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-800 bg-[#071423] p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-300">
                WORKSPACE PLAN
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-2xl font-black">
                    {isPremium ? "Premium" : "Free"}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-600">
                    {isPremium
                      ? isTurkish
                        ? "Gelişmiş analizler aktif"
                        : "Advanced analytics active"
                      : isTurkish
                        ? "Temel HSE araçları aktif"
                        : "Core HSE tools active"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                    isPremium
                      ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                      : "border border-slate-700 bg-slate-950 text-slate-500"
                  }`}
                >
                  {isPremium ? "PREMIUM ACTIVE" : "FREE"}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-[11px] text-slate-400">
                <p>✓ {isTurkish ? "Temel KPI ve saha takibi" : "Core KPI and field tracking"}</p>
                <p>
                  {isPremium ? "✓" : "◇"} {isTurkish ? "Raporlar ve gelişmiş export" : "Reports and advanced export"}
                </p>
                <p>
                  {isPremium ? "✓" : "◇"} {isTurkish ? "Trend analizi" : "Trend analysis"}
                </p>
              </div>

              <Link
                href={isPremium ? `/${locale}/hse-performance` : `/${locale}/upgrade`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/[0.07] px-3 py-2.5 text-xs font-black text-blue-300"
              >
                {isPremium
                  ? isTurkish
                    ? "HSE Performance'ı Aç →"
                    : "Open HSE Performance →"
                  : isTurkish
                    ? "Premium'u İncele →"
                    : "Explore Premium →"}
              </Link>
            </section>
          </div>

          <section className="mt-5 rounded-[28px] border border-cyan-400/15 bg-gradient-to-r from-[#071423] via-[#081a2c] to-[#071423] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                  LIVE HSE
                </p>
                <h2 className="mt-2 font-black">HSE Performance</h2>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
                  {isTurkish
                    ? `Toplam ${hseTotal} saha kaydı; ${hseClosed} kapalı, ${hseOpen} açık. Gözlem, aksiyon, olay ve KPI akışını detaylı ekranda yönetin.`
                    : `${hseTotal} field records in total; ${hseClosed} closed and ${hseOpen} open. Manage observations, actions, incidents and KPI flows in detail.`}
                </p>
              </div>
              <Link
                href={`/${locale}/hse-performance`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-black text-slate-950 hover:bg-cyan-400"
              >
                {isTurkish ? "Command Center'ı Aç →" : "Open Command Center →"}
              </Link>
            </div>
          </section>

          <section className="mt-5 rounded-[28px] border border-slate-800 bg-[#071423] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-black">
                  {isTurkish ? "Risk Analizlerim" : "My Risk Assessments"}
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  {isTurkish
                    ? "Kaydettiğiniz profesyonel risk değerlendirmeleri"
                    : "Your saved professional risk assessments"}
                </p>
              </div>
              <Link
                href={`/${locale}/tools/quick-risk-assessment`}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white hover:bg-blue-500"
              >
                + {isTurkish ? "Yeni Risk Analizi" : "New Risk Assessment"}
              </Link>
            </div>

            {riskAssessments && riskAssessments.length > 0 ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {riskAssessments.map((assessment) => {
                  const riskCount = Array.isArray(assessment.risk_items)
                    ? assessment.risk_items.length
                    : 0;

                  return (
                    <article
                      key={assessment.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950/35 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-slate-200">
                            {assessment.title ||
                              assessment.document_no ||
                              (isTurkish ? "Risk Analizi" : "Risk Assessment")}
                          </p>
                          <p className="mt-1 truncate text-[10px] text-slate-600">
                            {assessment.project_name ||
                              (isTurkish ? "Proje belirtilmedi" : "No project")}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-emerald-400/15 bg-emerald-500/[0.06] px-2 py-1 text-[9px] font-black text-emerald-300">
                          {riskCount} {isTurkish ? "risk" : "risks"}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/${locale}/tools/quick-risk-assessment?assessment=${assessment.id}`}
                          className="rounded-lg border border-blue-500/25 bg-blue-500/[0.06] px-3 py-2 text-[10px] font-black text-blue-300"
                        >
                          {isTurkish ? "Analizi Aç" : "Open"}
                        </Link>
                        <RiskAssessmentActions
                          assessmentId={assessment.id}
                          locale={locale}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-800 px-5 py-10 text-center text-sm font-bold text-slate-500">
                {isTurkish
                  ? "Henüz kayıtlı risk analizi yok"
                  : "No saved risk assessments yet"}
              </div>
            )}
          </section>

          <div id="company-branding" className="mt-5 scroll-mt-24">
            <CompanyBranding
              locale={locale}
              userId={user.id}
              isPremium={isPremium}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
