import ActivityTracker from "@/components/analytics/ActivityTracker";
import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Crown,
  Download,
  FileText,
  FolderOpen,
  Gauge,
  HardHat,
  LayoutDashboard,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { routing } from "../../../i18n/routing";
import { createClient } from "@/utils/supabase/server";
import {
  calculateLTIFR,
  calculateSeverityRate,
  calculateTRIR,
  formatHSEMetric,
} from "@/lib/hse-metrics";
import CompanyBranding from "./CompanyBranding";
import LogoutButton from "./LogoutButton";
import RiskAssessmentActions from "./RiskAssessmentActions";

type Props = {
  params: Promise<{ locale: string }>;
};

type DashboardObservation = {
  id: string;
  title: string;
  project_name: string | null;
  observation_type: string;
  risk_level: string;
  status: string;
  target_date: string | null;
  created_at: string;
};

type IncidentMetricRow = {
  project_name: string | null;
  worked_hours: number | null;
  near_miss: number | null;
  recordable_cases: number | null;
  lti: number | null;
  lost_days: number | null;
};

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

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const isTurkish = locale === "tr";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${locale}/login?next=/${locale}/dashboard`);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name,plan,role,status")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) redirect(`/${locale}/login`);
  if (profile.status === "suspended") redirect(`/${locale}/account-suspended`);

  const displayName =
    profile.full_name ||
    user.email?.split("@")[0] ||
    (isTurkish ? "Kullanıcı" : "User");

  const firstName = displayName.trim().split(/\s+/)[0] || displayName;
  const isPremium = profile.plan === "premium" || profile.role === "admin";

  const now = new Date();
  const monthKey = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const periodMonth = `${monthKey}-01`;
  const monthStartIso = `${monthKey}-01T00:00:00.000Z`;

  const [riskResult, observationResult, metricResult] = await Promise.all([
    supabase
      .from("risk_assessments")
      .select(
        "id,title,project_name,company_name,document_no,assessment_date,risk_items,updated_at",
      )
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("hse_observations")
      .select(
        "id,title,project_name,observation_type,risk_level,status,target_date,created_at",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("hse_incident_metrics")
      .select(
        "project_name,worked_hours,near_miss,recordable_cases,lti,lost_days",
      )
      .eq("user_id", user.id)
      .eq("period_month", periodMonth),
  ]);

  const riskAssessments = riskResult.data ?? [];
  const observations = (observationResult.data ?? []) as DashboardObservation[];
  const metricRows = (metricResult.data ?? []) as IncidentMetricRow[];

  const allProjectsMetric =
    metricRows.find((row) => row.project_name === "All Projects") ?? null;

  const workedHours = Number(allProjectsMetric?.worked_hours ?? 0);
  const recordableCases = Number(allProjectsMetric?.recordable_cases ?? 0);
  const lostTimeInjuries = Number(allProjectsMetric?.lti ?? 0);
  const lostDays = Number(allProjectsMetric?.lost_days ?? 0);
  const nearMiss = Number(allProjectsMetric?.near_miss ?? 0);

  const trir = calculateTRIR(recordableCases, workedHours);
  const ltifr = calculateLTIFR(lostTimeInjuries, workedHours);
  const severityRate = calculateSeverityRate(lostDays, workedHours);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const openActions = observations.filter((item) => item.status !== "closed");
  const overdueActions = openActions.filter((item) => {
    if (!item.target_date) return false;
    const target = new Date(item.target_date);
    return !Number.isNaN(target.getTime()) && target < today;
  });
  const observationsThisMonth = observations.filter(
    (item) => item.created_at >= monthStartIso,
  ).length;
  const criticalOpen = openActions.filter(
    (item) => item.risk_level === "critical",
  ).length;

  const projectHourRows = metricRows.filter(
    (row) => row.project_name && row.project_name !== "All Projects",
  );
  const projectHoursTotal = projectHourRows.reduce(
    (sum, row) => sum + Number(row.worked_hours ?? 0),
    0,
  );
  const workedHoursMismatch =
    workedHours > 0 &&
    projectHoursTotal > 0 &&
    Math.abs(workedHours - projectHoursTotal) > 0.01;

  const navItems = [
    {
      label: isTurkish ? "Dashboard" : "Dashboard",
      href: `/${locale}/dashboard`,
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: isTurkish ? "Risk Analizi" : "Risk Assessment",
      href: `/${locale}/tools/quick-risk-assessment`,
      icon: ShieldCheck,
    },
    {
      label: "Method Statement",
      href: `/${locale}/tools/method-statement`,
      icon: FileText,
    },
    {
      label: "Toolbox",
      href: `/${locale}/toolbox`,
      icon: HardHat,
    },
    {
      label: isTurkish ? "Saha Kontrolleri" : "Field Inspections",
      href: `/${locale}/checklists`,
      icon: ClipboardCheck,
    },
    {
      label: isTurkish ? "Gözlemler & Aksiyonlar" : "Observations & Actions",
      href: `/${locale}/hse-performance/observations`,
      icon: Activity,
    },
    {
      label: isTurkish ? "Olay Yönetimi" : "Incident Management",
      href: `/${locale}/hse-performance/incidents`,
      icon: AlertTriangle,
    },
    {
      label: isTurkish ? "Raporlar" : "Reports",
      href: isPremium
        ? `/${locale}/hse-performance/report`
        : `/${locale}/upgrade`,
      icon: BarChart3,
      premium: true,
    },
    {
      label: isTurkish ? "Trend Analizi" : "Trend Analysis",
      href: isPremium ? `/${locale}/hse-performance` : `/${locale}/upgrade`,
      icon: TrendingUp,
      premium: true,
    },
    {
      label: isTurkish ? "İndirmeler" : "Downloads",
      href: `/${locale}/downloads`,
      icon: Download,
    },
    {
      label: isTurkish ? "AI Asistan" : "AI Assistant",
      href: `/${locale}/ai-assistant`,
      icon: Bot,
    },
  ];

  const quickActions = [
    {
      title: isTurkish ? "Risk Analizi Oluştur" : "Create Risk Assessment",
      href: `/${locale}/tools/quick-risk-assessment`,
      icon: ShieldCheck,
      primary: true,
    },
    {
      title: "Method Statement",
      href: `/${locale}/tools/method-statement`,
      icon: FileText,
    },
    {
      title: isTurkish ? "Toolbox Aç" : "Open Toolbox",
      href: `/${locale}/toolbox`,
      icon: HardHat,
    },
    {
      title: isTurkish ? "Saha Kontrolü Başlat" : "Start Inspection",
      href: `/${locale}/checklists`,
      icon: ClipboardCheck,
    },
    {
      title: isTurkish ? "Gözlem Ekle" : "Add Observation",
      href: `/${locale}/hse-performance/observations`,
      icon: Activity,
    },
    {
      title: isTurkish ? "Olay Kaydı" : "Incident Record",
      href: `/${locale}/hse-performance/incidents`,
      icon: AlertTriangle,
    },
  ];

  const kpiCards = [
    {
      label: isTurkish ? "Çalışılan Saat" : "Worked Hours",
      value: workedHours > 0 ? formatNumber(workedHours, locale) : "—",
      meta: isTurkish ? "Bu ay · Tüm projeler" : "This month · All projects",
      icon: Clock,
    },
    {
      label: "TRIR",
      value: workedHours > 0 ? formatHSEMetric(trir) : "—",
      meta: isTurkish ? "200.000 saat bazlı" : "Per 200,000 hours",
      icon: Gauge,
    },
    {
      label: "LTIFR",
      value: workedHours > 0 ? formatHSEMetric(ltifr) : "—",
      meta: isTurkish ? "1.000.000 saat bazlı" : "Per 1,000,000 hours",
      icon: Activity,
    },
    {
      label: isTurkish ? "Severity Rate" : "Severity Rate",
      value: workedHours > 0 ? formatHSEMetric(severityRate) : "—",
      meta: isTurkish ? "Kayıp gün / 200.000 saat" : "Lost days / 200,000 hours",
      icon: TrendingUp,
    },
  ];

  const operationalCards = [
    {
      label: isTurkish ? "Açık Aksiyon" : "Open Actions",
      value: openActions.length,
      detail:
        criticalOpen > 0
          ? `${criticalOpen} ${isTurkish ? "kritik" : "critical"}`
          : isTurkish
            ? "Kritik açık yok"
            : "No critical open",
      tone: criticalOpen > 0 ? "text-red-300" : "text-emerald-300",
    },
    {
      label: isTurkish ? "Geciken Aksiyon" : "Overdue Actions",
      value: overdueActions.length,
      detail:
        overdueActions.length > 0
          ? isTurkish
            ? "Takip gerekiyor"
            : "Follow-up required"
          : isTurkish
            ? "Takvim temiz"
            : "On schedule",
      tone: overdueActions.length > 0 ? "text-amber-300" : "text-emerald-300",
    },
    {
      label: isTurkish ? "Bu Ay Gözlem" : "Observations This Month",
      value: observationsThisMonth,
      detail: isTurkish ? "Saha kayıtları" : "Field records",
      tone: "text-cyan-300",
    },
    {
      label: isTurkish ? "Ramak Kala" : "Near Miss",
      value: nearMiss,
      detail: isTurkish ? "Bu ay · Tüm projeler" : "This month · All projects",
      tone: nearMiss > 0 ? "text-amber-300" : "text-emerald-300",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020914] text-white">
      <ActivityTracker eventName="dashboard_open" />

      <div className="mx-auto flex w-full max-w-[1680px] gap-0 px-3 py-4 sm:px-5 lg:gap-5 lg:px-6 lg:py-6">
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[248px] shrink-0 flex-col rounded-[26px] border border-blue-950/80 bg-[#061221]/95 p-4 shadow-2xl shadow-black/25 lg:flex">
          <div className="px-2 pb-5 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 shadow-lg shadow-blue-500/10">
                <ShieldCheck className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <p className="text-lg font-black tracking-[0.08em]">SERNEM</p>
                <p className="text-[10px] text-slate-500">
                  {isTurkish ? "HSE Command Center" : "HSE Command Center"}
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-1 overflow-y-auto pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${
                    item.active
                      ? "border border-blue-400/30 bg-blue-600/20 text-white shadow-[inset_0_0_24px_rgba(37,99,235,.08)]"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${item.active ? "text-blue-300" : "text-slate-500 group-hover:text-blue-300"}`}
                  />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.premium && (
                    <Crown
                      className={`h-3.5 w-3.5 ${isPremium ? "text-amber-300" : "text-slate-700"}`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/45 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                {isTurkish ? "Çalışma alanı" : "Workspace"}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-200">
                  {isPremium ? "Premium" : isTurkish ? "Ücretsiz" : "Free"}
                </span>
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
            <LogoutButton locale={locale} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-[#061221]/85 px-4 py-3 shadow-xl shadow-black/10">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <span className="truncate text-sm text-slate-500">
              {isTurkish
                ? "Ara… risk analizi, toolbox, saha kontrolü, rapor"
                : "Search… risk assessment, toolbox, inspection, report"}
            </span>
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <span className="rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1 text-[10px] font-bold text-slate-500">
                {locale.toUpperCase()}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black">
                {displayName
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </div>
            </div>
          </div>

          <section className="relative overflow-hidden rounded-[28px] border border-blue-900/50 bg-gradient-to-r from-[#07172a] via-[#082044] to-[#0a3c78] p-6 shadow-2xl shadow-blue-950/20 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.45fr_.55fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  SERNEM WORKSPACE
                </div>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl xl:text-5xl">
                  {isTurkish ? "Hoş geldin, " : "Welcome, "}
                  <span className="text-blue-300">{firstName}</span>
                  <span className="ml-2">👋</span>
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-100/70 sm:text-base">
                  {isTurkish
                    ? "HSE süreçlerini tek merkezden yönet, riskleri azalt ve saha performansını gerçek verilerle takip et."
                    : "Manage HSE processes from one command center, reduce risk and track field performance with real data."}
                </p>
              </div>

              <div className="relative hidden min-h-[125px] lg:block">
                <div className="absolute right-12 top-2 h-28 w-40 rotate-6 rounded-2xl border border-blue-300/25 bg-blue-400/10 backdrop-blur-sm" />
                <div className="absolute right-6 top-7 h-28 w-40 -rotate-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] backdrop-blur-sm" />
                <div className="absolute right-20 top-10 flex h-24 w-36 items-center justify-center rounded-2xl border border-blue-300/30 bg-[#082658]/80 shadow-2xl shadow-blue-500/20">
                  <ShieldCheck className="h-12 w-12 text-blue-200" />
                </div>
              </div>
            </div>
          </section>

          {workedHoursMismatch && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-100">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <div>
                <p className="font-bold">
                  {isTurkish ? "Çalışılan saat kontrolü gerekli" : "Worked-hours review required"}
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-100/65">
                  {isTurkish
                    ? `Tüm Projeler kaydı ${formatNumber(workedHours, locale)} saat, proje kayıtlarının toplamı ${formatNumber(projectHoursTotal, locale)} saat. KPI hesaplarını doğrulamak için değerleri kontrol edin.`
                    : `All Projects records ${formatNumber(workedHours, locale)} hours while project rows total ${formatNumber(projectHoursTotal, locale)} hours. Review the values before relying on KPI calculations.`}
                </p>
              </div>
            </div>
          )}

          <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {kpiCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.label}
                  className="rounded-2xl border border-slate-800 bg-[#071422]/90 p-4 shadow-lg shadow-black/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-400">{card.label}</p>
                      <p className="mt-2 text-2xl font-black tracking-tight text-white">
                        {card.value}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/[0.09]">
                      <Icon className="h-5 w-5 text-blue-300" />
                    </div>
                  </div>
                  <p className="mt-3 text-[10px] text-slate-600">{card.meta}</p>
                </article>
              );
            })}
          </section>

          <section className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {operationalCards.map((card) => (
              <article
                key={card.label}
                className="rounded-2xl border border-slate-800/90 bg-slate-950/45 px-4 py-3.5"
              >
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500">{card.label}</p>
                    <p className="mt-1 text-2xl font-black text-slate-100">{card.value}</p>
                  </div>
                  <p className={`pb-1 text-[10px] font-bold ${card.tone}`}>{card.detail}</p>
                </div>
              </article>
            ))}
          </section>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.75fr]">
            <section className="overflow-hidden rounded-[26px] border border-slate-800 bg-[#061221]/90">
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-blue-300" />
                    <h2 className="font-black">
                      {isTurkish ? "Son Çalışmalar" : "Recent Work"}
                    </h2>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {isTurkish
                      ? "En son oluşturduğunuz HSE kayıtları"
                      : "Your latest HSE records"}
                  </p>
                </div>
                <Link
                  href={`/${locale}/tools/quick-risk-assessment`}
                  className="hidden items-center gap-1.5 rounded-xl border border-blue-500/25 bg-blue-500/[0.06] px-3 py-2 text-xs font-bold text-blue-300 transition hover:bg-blue-500/10 sm:inline-flex"
                >
                  {isTurkish ? "Tümünü gör" : "View all"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[660px] text-left">
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
                    {riskAssessments.length > 0 ? (
                      riskAssessments.map((assessment) => {
                        const riskCount = Array.isArray(assessment.risk_items)
                          ? assessment.risk_items.length
                          : 0;
                        return (
                          <tr key={assessment.id} className="transition hover:bg-white/[0.02]">
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
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                {riskCount} {isTurkish ? "risk" : "risks"}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <Link
                                href={`/${locale}/tools/quick-risk-assessment?assessment=${assessment.id}`}
                                className="text-xs font-bold text-slate-500 transition hover:text-blue-300"
                              >
                                {isTurkish ? "Aç" : "Open"} →
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <ShieldCheck className="mx-auto h-8 w-8 text-slate-700" />
                          <p className="mt-3 font-bold text-slate-300">
                            {isTurkish ? "Henüz kayıtlı çalışma yok" : "No saved work yet"}
                          </p>
                          <p className="mt-1 text-xs text-slate-600">
                            {isTurkish
                              ? "İlk risk analizinizi oluşturduğunuzda burada görünecek."
                              : "Your first risk assessment will appear here."}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-4">
              <section className="rounded-[26px] border border-slate-800 bg-[#061221]/90 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/[0.08]">
                    <Sparkles className="h-4 w-4 text-blue-300" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black">
                      {isTurkish ? "Hızlı İşlemler" : "Quick Actions"}
                    </h2>
                    <p className="text-[10px] text-slate-600">
                      {isTurkish ? "Sık kullanılan HSE araçları" : "Frequently used HSE tools"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={action.title}
                        href={action.href}
                        className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                          action.primary
                            ? "border-blue-400/30 bg-blue-600 text-white hover:bg-blue-500"
                            : "border-slate-800 bg-slate-950/40 text-slate-300 hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{action.title}</span>
                        {action.primary ? (
                          <Plus className="h-4 w-4" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-blue-300" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </section>

              <section className="relative overflow-hidden rounded-[26px] border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.09] to-[#061221] p-4">
                <div className="pointer-events-none absolute -right-8 -bottom-12 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative flex items-start gap-3">
                  <Download className="mt-0.5 h-5 w-5 text-blue-300" />
                  <div>
                    <h2 className="text-sm font-black">
                      {isTurkish ? "İndirme Merkezi" : "Download Center"}
                    </h2>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {isTurkish
                        ? "Hazır şablonlar, posterler, safety signs ve saha kaynakları."
                        : "Ready templates, posters, safety signs and field resources."}
                    </p>
                    <Link
                      href={`/${locale}/downloads`}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-300"
                    >
                      {isTurkish ? "İndirmelere git" : "Open downloads"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr_.8fr]">
            <section className="rounded-[26px] border border-slate-800 bg-[#061221]/90 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-black">
                    {isTurkish ? "Son Gözlemler" : "Recent Observations"}
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-600">
                    {isTurkish ? "Sahadan gelen son kayıtlar" : "Latest records from the field"}
                  </p>
                </div>
                <Link
                  href={`/${locale}/hse-performance/observations`}
                  className="text-xs font-bold text-blue-300"
                >
                  {isTurkish ? "Tümü" : "All"} →
                </Link>
              </div>

              <div className="mt-4 space-y-2.5">
                {observations.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/35 p-3"
                  >
                    <div
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
                      <p className="truncate text-xs font-bold text-slate-300">{item.title}</p>
                      <p className="mt-0.5 truncate text-[10px] text-slate-600">
                        {item.project_name || (isTurkish ? "Genel saha" : "General site")} · {formatDate(item.created_at, locale)}
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase ${
                        item.status === "closed" ? "text-emerald-300" : "text-amber-300"
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

                {observations.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-xs text-slate-600">
                    {isTurkish ? "Henüz saha gözlemi yok." : "No field observations yet."}
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[26px] border border-slate-800 bg-[#061221]/90 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-black">
                    {isTurkish ? "Aksiyon Takibi" : "Action Tracking"}
                  </h2>
                  <p className="mt-1 text-[11px] text-slate-600">
                    {isTurkish ? "Öncelikli açık ve geciken işler" : "Priority open and overdue actions"}
                  </p>
                </div>
                <Wrench className="h-4 w-4 text-slate-600" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-amber-400/15 bg-amber-500/[0.05] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300/70">
                    {isTurkish ? "Açık" : "Open"}
                  </p>
                  <p className="mt-1 text-3xl font-black text-amber-200">{openActions.length}</p>
                </div>
                <div className="rounded-2xl border border-red-400/15 bg-red-500/[0.05] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-300/70">
                    {isTurkish ? "Geciken" : "Overdue"}
                  </p>
                  <p className="mt-1 text-3xl font-black text-red-200">{overdueActions.length}</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/35 p-3">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    {isTurkish ? "Kritik açık aksiyon" : "Critical open action"}
                  </span>
                  <span className={`font-black ${criticalOpen > 0 ? "text-red-300" : "text-emerald-300"}`}>
                    {criticalOpen}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-[26px] border border-slate-800 bg-[#061221]/90 p-5">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-300" />
                <h2 className="font-black">
                  {isTurkish ? "Çalışma Alanı Planı" : "Workspace Plan"}
                </h2>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-2xl font-black">{isPremium ? "Premium" : "Free"}</p>
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
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {isTurkish ? "Temel KPI ve saha takibi" : "Core KPI and field tracking"}
                </div>
                <div className="flex items-center gap-2">
                  {isPremium ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Crown className="h-3.5 w-3.5 text-slate-700" />
                  )}
                  {isTurkish ? "Raporlar ve gelişmiş export" : "Reports and advanced export"}
                </div>
                <div className="flex items-center gap-2">
                  {isPremium ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Crown className="h-3.5 w-3.5 text-slate-700" />
                  )}
                  {isTurkish ? "Trend analizi" : "Trend analysis"}
                </div>
              </div>

              <Link
                href={isPremium ? `/${locale}/hse-performance` : `/${locale}/upgrade`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/[0.07] px-3 py-2.5 text-xs font-black text-blue-300 transition hover:bg-blue-500/[0.12]"
              >
                {isPremium
                  ? isTurkish
                    ? "HSE Performance'ı Aç"
                    : "Open HSE Performance"
                  : isTurkish
                    ? "Premium'u İncele"
                    : "Explore Premium"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>
          </div>

          <section className="mt-5 rounded-[26px] border border-cyan-400/15 bg-gradient-to-r from-[#061221] via-[#07182a] to-[#061221] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-cyan-300" />
                  <h2 className="font-black">HSE Performance</h2>
                </div>
                <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
                  {isTurkish
                    ? "Gözlem, aksiyon, olay yönetimi ve KPI akışını tek ekranda detaylandırın. Dashboard yalnızca gerçek kayıtlarınızı gösterir; veri yoksa değer üretmez."
                    : "Drill into observations, actions, incident management and KPI flows. The dashboard only displays your real records and does not invent values when data is missing."}
                </p>
              </div>
              <Link
                href={`/${locale}/hse-performance`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-black text-slate-950 transition hover:bg-cyan-400"
              >
                {isTurkish ? "Command Center'ı Aç" : "Open Command Center"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section className="mt-5 rounded-[26px] border border-slate-800 bg-[#061221]/90 p-5">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-blue-500"
              >
                <Plus className="h-4 w-4" />
                {isTurkish ? "Yeni Risk Analizi" : "New Risk Assessment"}
              </Link>
            </div>

            {riskAssessments.length > 0 ? (
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
                          className="rounded-lg border border-blue-500/25 bg-blue-500/[0.06] px-3 py-2 text-[10px] font-black text-blue-300 transition hover:bg-blue-500/[0.12]"
                        >
                          {isTurkish ? "Analizi Aç" : "Open"}
                        </Link>
                        <RiskAssessmentActions assessmentId={assessment.id} locale={locale} />
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-800 px-5 py-10 text-center">
                <ShieldCheck className="mx-auto h-8 w-8 text-slate-700" />
                <p className="mt-3 text-sm font-bold text-slate-400">
                  {isTurkish ? "Henüz kayıtlı risk analizi yok" : "No saved risk assessments yet"}
                </p>
              </div>
            )}
          </section>

          <div id="company-branding" className="mt-5 scroll-mt-24">
            <CompanyBranding locale={locale} userId={user.id} isPremium={isPremium} />
          </div>
        </div>
      </div>
    </main>
  );
}
