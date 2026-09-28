import ActivityTracker from "@/components/analytics/ActivityTracker";
import LogoutButton from "./LogoutButton";
import CompanyBranding from "./CompanyBranding";
import RiskAssessmentActions from "./RiskAssessmentActions";
import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound, redirect } from "next/navigation";
import { routing } from "../../../i18n/routing";
import { createClient } from "@/utils/supabase/server";

type Props = { params: Promise<{ locale: string }> };

type ActivityEvent = {
  id: string;
  event_name: string;
  path: string | null;
  created_at: string;
};

type RecentWorkItem = {
  id: string;
  title: string;
  type: string;
  code: string;
  date: string;
  status: string;
  statusTone: string;
  href?: string;
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
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function resourceType(path: string | null, isTurkish: boolean) {
  const value = (path || "").toLowerCase();
  if (value.includes("toolbox")) return { label: "Toolbox", code: "TB" };
  if (value.includes("poster")) return { label: isTurkish ? "Poster" : "Poster", code: "PO" };
  if (value.includes("safety-sign")) return { label: isTurkish ? "Güvenlik Levhası" : "Safety Sign", code: "SS" };
  if (value.includes("checklist")) return { label: isTurkish ? "Denetim" : "Inspection", code: "FC" };
  if (value.includes("knowledge-base") || value.includes("guide")) return { label: isTurkish ? "Rehber" : "Guide", code: "GD" };
  if (value.includes(".pdf")) return { label: "PDF", code: "PDF" };
  if (value.includes(".doc")) return { label: "DOCX", code: "DOC" };
  return { label: isTurkish ? "Kaynak" : "Resource", code: "DL" };
}

function activityLabel(eventName: string, isTurkish: boolean) {
  const [actionRaw, titleRaw] = eventName.split("|", 2);
  const action = actionRaw.replace("resource_", "");
  const title = titleRaw?.trim() || (isTurkish ? "HSE kaynağı" : "HSE resource");
  if (action === "download") return { title, status: isTurkish ? "İndirildi" : "Downloaded", tone: "text-emerald-300" };
  if (action === "preview") return { title, status: isTurkish ? "Önizlendi" : "Previewed", tone: "text-cyan-300" };
  return { title, status: isTurkish ? "Açıldı" : "Opened", tone: "text-blue-300" };
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const isTurkish = locale === "tr";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login?next=/${locale}/dashboard`);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name,plan,role,status")
    .eq("id", user.id)
    .single();
  if (profileError || !profile) redirect(`/${locale}/login`);
  if (profile.status === "suspended") redirect(`/${locale}/account-suspended`);

  const displayName = profile.full_name || user.email?.split("@")[0] || (isTurkish ? "Kullanıcı" : "User");
  const firstName = displayName.trim().split(/\s+/)[0] || displayName;
  const isPremium = profile.plan === "premium" || profile.role === "admin";

  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const periodMonth = `${year}-${month}-01`;
  const monthStartIso = `${year}-${month}-01T00:00:00.000Z`;

  const [riskResult, observationResult, metricResult, activityResult] = await Promise.all([
    supabase.from("risk_assessments")
      .select("id,title,project_name,company_name,document_no,assessment_date,risk_items,updated_at")
      .eq("user_id", user.id).order("updated_at", { ascending: false }).limit(8),
    supabase.from("hse_observations")
      .select("id,title,project_name,status,risk_level,target_date,created_at,observation_type")
      .eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("hse_incident_metrics")
      .select("project_name,worked_hours,near_miss,recordable_cases,lti,lost_days")
      .eq("user_id", user.id).eq("period_month", periodMonth),
    supabase.from("user_activity_events")
      .select("id,event_name,path,created_at")
      .eq("user_id", user.id)
      .like("event_name", "resource_%")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const riskAssessments = riskResult.data ?? [];
  const hseObservations = observationResult.data ?? [];
  const metrics = metricResult.data ?? [];
  const activityEvents = (activityResult.data ?? []) as ActivityEvent[];

  const allProjectsMetric = metrics.find((item) => item.project_name === "All Projects") ?? null;
  const workedHours = Number(allProjectsMetric?.worked_hours ?? 0);
  const recordableCases = Number(allProjectsMetric?.recordable_cases ?? 0);
  const lostTimeInjuries = Number(allProjectsMetric?.lti ?? 0);
  const lostDays = Number(allProjectsMetric?.lost_days ?? 0);
  const nearMiss = Number(allProjectsMetric?.near_miss ?? 0);
  const trir = workedHours > 0 ? (recordableCases * 200000) / workedHours : null;
  const ltifr = workedHours > 0 ? (lostTimeInjuries * 1000000) / workedHours : null;
  const severityRate = workedHours > 0 ? (lostDays * 200000) / workedHours : null;

  const hseTotal = hseObservations.length;
  const hseOpen = hseObservations.filter((item) => item.status !== "closed").length;
  const hseClosed = hseObservations.filter((item) => item.status === "closed").length;
  const hseCriticalOpen = hseObservations.filter((item) => item.status !== "closed" && item.risk_level === "critical").length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueActions = hseObservations.filter((item) => {
    if (item.status === "closed" || !item.target_date) return false;
    const targetDate = new Date(item.target_date);
    return !Number.isNaN(targetDate.getTime()) && targetDate < today;
  }).length;
  const observationsThisMonth = hseObservations.filter((item) => item.created_at && item.created_at >= monthStartIso).length;

  const projectHours = metrics.filter((item) => item.project_name && item.project_name !== "All Projects")
    .reduce((sum, item) => sum + Number(item.worked_hours ?? 0), 0);
  const hoursMismatch = workedHours > 0 && projectHours > 0 && Math.abs(workedHours - projectHours) > 0.01;

  const recentWork: RecentWorkItem[] = [
    ...riskAssessments.map((assessment) => ({
      id: `risk-${assessment.id}`,
      title: assessment.title || assessment.document_no || (isTurkish ? "Risk Analizi" : "Risk Assessment"),
      type: isTurkish ? "Risk Analizi" : "Risk Assessment",
      code: "RA",
      date: assessment.updated_at,
      status: isTurkish ? "Kaydedildi" : "Saved",
      statusTone: "text-emerald-300",
      href: `/${locale}/tools/quick-risk-assessment?assessment=${assessment.id}`,
    })),
    ...activityEvents.map((event) => {
      const detail = activityLabel(event.event_name, isTurkish);
      const type = resourceType(event.path, isTurkish);
      const href = event.path?.startsWith(`/${locale}/`) ? event.path : undefined;
      return {
        id: `activity-${event.id}`,
        title: detail.title,
        type: type.label,
        code: type.code,
        date: event.created_at,
        status: detail.status,
        statusTone: detail.tone,
        href,
      };
    }),
  ]
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const navItems = [
    ["Dashboard", `/${locale}/dashboard`, "DB"],
    [isTurkish ? "Risk Analizi" : "Risk Assessment", `/${locale}/tools/quick-risk-assessment`, "RA"],
    ["Method Statement", `/${locale}/tools/method-statement`, "MS"],
    ["Toolbox", `/${locale}/toolbox`, "TB"],
    [isTurkish ? "Saha Kontrolleri" : "Field Inspections", `/${locale}/checklists`, "FC"],
    [isTurkish ? "Gözlemler & Aksiyonlar" : "Observations & Actions", `/${locale}/hse-performance/observations`, "OA"],
    [isTurkish ? "Olay Yönetimi" : "Incident Management", `/${locale}/hse-performance/incidents`, "IM"],
    [isTurkish ? "Raporlar" : "Reports", isPremium ? `/${locale}/hse-performance/report` : `/${locale}/upgrade`, "RP"],
    [isTurkish ? "Trend Analizi" : "Trend Analysis", isPremium ? `/${locale}/hse-performance` : `/${locale}/upgrade`, "TA"],
  ];

  const quickActions = [
    [isTurkish ? "Risk Analizi" : "Risk Assessment", `/${locale}/tools/quick-risk-assessment`, "RA"],
    ["Method Statement", `/${locale}/tools/method-statement`, "MS"],
    ["Toolbox", `/${locale}/toolbox`, "TB"],
    [isTurkish ? "Saha Kontrolü" : "Inspection", `/${locale}/checklists`, "FC"],
    [isTurkish ? "Gözlem" : "Observation", `/${locale}/hse-performance/observations`, "OA"],
    [isTurkish ? "Olay Kaydı" : "Incident", `/${locale}/hse-performance/incidents`, "IM"],
  ];

  const kpiCards = [
    [isTurkish ? "Çalışılan Saat" : "Worked Hours", workedHours > 0 ? formatNumber(workedHours, locale) : "—", "WH", isTurkish ? "Bu ay" : "This month"],
    ["TRIR", formatMetric(trir), "TR", isTurkish ? "200K saat" : "200K hours"],
    ["LTIFR", formatMetric(ltifr), "LT", isTurkish ? "1M saat" : "1M hours"],
    ["Severity", formatMetric(severityRate), "SR", isTurkish ? "200K saat" : "200K hours"],
  ];

  const operationCards = [
    [isTurkish ? "Açık Aksiyon" : "Open Actions", hseOpen, hseCriticalOpen > 0 ? `${hseCriticalOpen} ${isTurkish ? "kritik" : "critical"}` : isTurkish ? "Kritik yok" : "No critical", hseCriticalOpen > 0 ? "text-red-300" : "text-emerald-300"],
    [isTurkish ? "Geciken" : "Overdue", overdueActions, overdueActions > 0 ? isTurkish ? "Takip gerekli" : "Follow up" : isTurkish ? "Takvim temiz" : "On schedule", overdueActions > 0 ? "text-amber-300" : "text-emerald-300"],
    [isTurkish ? "Bu Ay Gözlem" : "Observations", observationsThisMonth, isTurkish ? "Saha kayıtları" : "Field records", "text-cyan-300"],
    [isTurkish ? "Ramak Kala" : "Near Miss", nearMiss, isTurkish ? "Bu ay" : "This month", nearMiss > 0 ? "text-amber-300" : "text-emerald-300"],
  ];

  return (
    <main className="min-h-screen bg-[#020814] text-white">
      <ActivityTracker eventName="dashboard_open" />
      <div className="mx-auto flex w-full max-w-[1660px] gap-5 px-3 py-3 sm:px-6 sm:py-5 lg:px-8">
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[250px] shrink-0 flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#071423] p-4 shadow-2xl shadow-black/20 lg:flex">
          <div className="border-b border-slate-800 px-2 pb-5 pt-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-sm font-black text-blue-300">S</div>
              <div><p className="font-black tracking-[0.12em]">SERNEM</p><p className="mt-0.5 text-[10px] text-slate-500">HSE Command Center</p></div>
            </div>
          </div>
          <nav className="mt-4 space-y-1 overflow-y-auto pr-1">
            {navItems.map(([label, href, code], index) => (
              <Link key={String(label)} href={String(href)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${index === 0 ? "border border-blue-500/30 bg-blue-600/20 text-white" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg border text-[9px] font-black ${index === 0 ? "border-blue-400/30 bg-blue-500/15 text-blue-200" : "border-slate-800 bg-slate-950/60 text-slate-600"}`}>{code}</span>
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {(code === "RP" || code === "TA") && <span className="text-[9px] text-amber-300">PRO</span>}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-3 pt-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-600">PLAN</p><p className="mt-1 text-sm font-black">{isPremium ? "Premium" : "Free"}</p></div><span className={`rounded-full px-2 py-1 text-[9px] font-black ${isPremium ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300" : "text-slate-500"}`}>{isPremium ? "ACTIVE" : "FREE"}</span></div>
            </div>
            <Link href={`/${locale}/downloads`} className="flex h-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/[0.07] text-xs font-black text-blue-200">Download Center</Link>
            <LogoutButton locale={locale} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 hidden items-center rounded-2xl border border-slate-800 bg-[#071423] px-4 py-3 sm:flex"><span className="mr-3 text-slate-600">⌕</span><span className="truncate text-sm text-slate-500">{isTurkish ? "Ara… doküman, araç, şablon veya HSE kaydı" : "Search… document, tool, template or HSE record"}</span><span className="ml-auto rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1 text-[10px] font-black text-slate-500">{locale.toUpperCase()}</span></div>

          <section className="relative overflow-hidden rounded-[24px] border border-blue-900/60 bg-gradient-to-r from-[#08172a] via-[#0b2244] to-[#0d3971] p-5 shadow-2xl shadow-blue-950/20 sm:rounded-[30px] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[1.5fr_.5fr] lg:items-center"><div><div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.20em] text-cyan-200">SERNEM WORKSPACE</div><h1 className="mt-3 text-[28px] font-black leading-tight tracking-tight sm:text-4xl xl:text-5xl">{isTurkish ? "Hoş geldin, " : "Welcome, "}<span className="text-blue-300">{firstName}</span><span className="ml-2">👋</span></h1><p className="mt-3 max-w-3xl text-[13px] leading-5 text-blue-100/65 sm:text-base">{isTurkish ? "HSE süreçlerini tek merkezden yönet, riskleri azalt ve saha performansını gerçek verilerle takip et." : "Manage HSE processes from one command center, reduce risk and track field performance with real data."}</p></div><div className="hidden lg:flex justify-center text-6xl font-black text-blue-200/80">S</div></div>
          </section>

          {hoursMismatch && <div className="mt-3 rounded-2xl border border-amber-400/20 bg-amber-500/[0.06] px-4 py-3 text-xs text-amber-100">⚠ {isTurkish ? `Çalışılan saatleri kontrol edin: Tüm Projeler ${formatNumber(workedHours, locale)}, proje toplamı ${formatNumber(projectHours, locale)}.` : `Review worked hours: All Projects ${formatNumber(workedHours, locale)}, project total ${formatNumber(projectHours, locale)}.`}</div>}

          <section className="mt-3 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {kpiCards.map(([label, value, code, meta]) => <article key={String(label)} className="rounded-2xl border border-slate-800 bg-[#071423] p-3.5 sm:p-4"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-semibold text-slate-400 sm:text-xs">{label}</p><p className="mt-1.5 text-xl font-black sm:text-2xl">{value}</p></div><span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/[0.08] text-[9px] font-black text-blue-300 sm:h-10 sm:w-10">{code}</span></div><p className="mt-2 text-[9px] text-slate-600">{meta}</p></article>)}
          </section>
          <section className="mt-2.5 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {operationCards.map(([label, value, detail, tone]) => <article key={String(label)} className="rounded-2xl border border-slate-800 bg-slate-950/45 px-3.5 py-3"><p className="text-[10px] font-semibold text-slate-500">{label}</p><div className="mt-1 flex items-end justify-between gap-2"><p className="text-xl font-black sm:text-2xl">{value}</p><p className={`text-[9px] font-bold ${tone}`}>{detail}</p></div></article>)}
          </section>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_.75fr]">
            <section className="overflow-hidden rounded-[24px] border border-slate-800 bg-[#071423] sm:rounded-[28px]">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3.5"><div><h2 className="font-black">{isTurkish ? "Son Çalışmalar" : "Recent Work"}</h2><p className="mt-0.5 text-[10px] text-slate-500">{isTurkish ? "Oluşturduğunuz ve kullandığınız son HSE içerikleri" : "Your latest created and used HSE content"}</p></div><span className="rounded-full border border-emerald-400/15 bg-emerald-500/[0.06] px-2 py-1 text-[9px] font-black text-emerald-300">LIVE</span></div>
              {recentWork.length > 0 ? (
                <div className="divide-y divide-slate-800/80">
                  {recentWork.map((item) => {
                    const content = <><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/[0.07] text-[9px] font-black text-blue-300">{item.code}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-black text-slate-200 sm:text-sm">{item.title}</p><p className="mt-0.5 text-[9px] text-slate-600">{item.type} · {formatDate(item.date, locale)}</p></div><span className={`shrink-0 text-[9px] font-black uppercase ${item.statusTone}`}>{item.status}</span></>;
                    return item.href ? <Link key={item.id} href={item.href} className="flex items-center gap-3 px-4 py-3 transition hover:bg-white/[0.025]">{content}</Link> : <div key={item.id} className="flex items-center gap-3 px-4 py-3">{content}</div>;
                  })}
                </div>
              ) : <div className="px-5 py-10 text-center"><p className="text-sm font-bold text-slate-500">{isTurkish ? "Henüz kayıtlı çalışma yok" : "No recent work yet"}</p><p className="mt-1 text-[10px] text-slate-700">{isTurkish ? "İndirdiğiniz veya oluşturduğunuz içerikler burada görünecek." : "Downloads and created content will appear here."}</p></div>}
            </section>

            <section className="rounded-[24px] border border-slate-800 bg-[#071423] p-3.5 sm:rounded-[28px] sm:p-4"><h2 className="text-sm font-black">{isTurkish ? "Hızlı İşlemler" : "Quick Actions"}</h2><p className="mt-0.5 text-[10px] text-slate-600">{isTurkish ? "Sık kullanılan araçlar" : "Frequently used tools"}</p><div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-1">{quickActions.map(([label, href, code], index) => <Link key={String(label)} href={String(href)} className={`flex items-center gap-2 rounded-xl border px-2.5 py-2.5 text-[10px] font-bold transition sm:text-xs ${index === 0 ? "border-blue-400/30 bg-blue-600 text-white" : "border-slate-800 bg-slate-950/40 text-slate-300"}`}><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[8px] font-black">{code}</span><span className="min-w-0 flex-1 truncate">{label}</span><span>→</span></Link>)}</div></section>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr_.8fr]">
            <section className="rounded-[24px] border border-slate-800 bg-[#071423] p-4"><div className="flex items-center justify-between"><div><h2 className="font-black">{isTurkish ? "Son Gözlemler" : "Recent Observations"}</h2><p className="text-[10px] text-slate-600">{isTurkish ? "Sahadan son kayıtlar" : "Latest field records"}</p></div><Link href={`/${locale}/hse-performance/observations`} className="text-xs font-bold text-blue-300">{isTurkish ? "Tümü →" : "All →"}</Link></div><div className="mt-3 space-y-2">{hseObservations.slice(0, 4).map((item) => <div key={item.id} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/35 p-3"><span className={`h-2.5 w-2.5 rounded-full ${item.risk_level === "critical" ? "bg-red-400" : item.risk_level === "high" ? "bg-amber-400" : "bg-blue-400"}`} /><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-300">{item.title || (isTurkish ? "Saha gözlemi" : "Field observation")}</p><p className="text-[9px] text-slate-600">{formatDate(item.created_at, locale)}</p></div><span className={`text-[9px] font-black ${item.status === "closed" ? "text-emerald-300" : "text-amber-300"}`}>{item.status === "closed" ? (isTurkish ? "KAPALI" : "CLOSED") : (isTurkish ? "AÇIK" : "OPEN")}</span></div>)}</div></section>
            <section className="rounded-[24px] border border-slate-800 bg-[#071423] p-4"><h2 className="font-black">{isTurkish ? "Aksiyon Takibi" : "Action Tracking"}</h2><p className="text-[10px] text-slate-600">{isTurkish ? "Öncelikli açık ve geciken işler" : "Priority open and overdue actions"}</p><div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-2xl border border-amber-400/15 bg-amber-500/[0.05] p-3"><p className="text-[9px] font-black text-amber-300">{isTurkish ? "AÇIK" : "OPEN"}</p><p className="mt-1 text-2xl font-black text-amber-200">{hseOpen}</p></div><div className="rounded-2xl border border-red-400/15 bg-red-500/[0.05] p-3"><p className="text-[9px] font-black text-red-300">{isTurkish ? "GECİKEN" : "OVERDUE"}</p><p className="mt-1 text-2xl font-black text-red-200">{overdueActions}</p></div></div><div className="mt-2 rounded-xl border border-slate-800 bg-slate-950/35 p-3 text-xs"><div className="flex justify-between"><span className="text-slate-500">{isTurkish ? "Kritik açık" : "Critical open"}</span><span className={hseCriticalOpen > 0 ? "font-black text-red-300" : "font-black text-emerald-300"}>{hseCriticalOpen}</span></div></div></section>
            <section className="rounded-[24px] border border-slate-800 bg-[#071423] p-4"><div className="flex items-center justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-300">WORKSPACE PLAN</p><p className="mt-1 text-xl font-black">{isPremium ? "Premium" : "Free"}</p></div><span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[9px] font-black text-emerald-300">{isPremium ? "ACTIVE" : "FREE"}</span></div><div className="mt-3 space-y-1 text-[10px] text-slate-400"><p>✓ {isTurkish ? "Temel KPI ve saha takibi" : "Core KPI and field tracking"}</p><p>✓ {isTurkish ? "Raporlar ve gelişmiş export" : "Reports and advanced export"}</p><p>✓ {isTurkish ? "Trend analizi" : "Trend analysis"}</p></div><Link href={`/${locale}/hse-performance`} className="mt-3 flex h-10 items-center justify-center rounded-xl border border-blue-500/25 bg-blue-500/[0.07] text-xs font-black text-blue-300">HSE Performance →</Link></section>
          </div>

          <section className="mt-4 rounded-[24px] border border-cyan-400/15 bg-gradient-to-r from-[#071423] via-[#081a2c] to-[#071423] p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">LIVE HSE</p><h2 className="mt-1 font-black">HSE Performance</h2><p className="mt-1 text-[10px] text-slate-500">{isTurkish ? `${hseTotal} saha kaydı · ${hseClosed} kapalı · ${hseOpen} açık` : `${hseTotal} field records · ${hseClosed} closed · ${hseOpen} open`}</p></div><Link href={`/${locale}/hse-performance`} className="shrink-0 rounded-xl bg-cyan-500 px-3 py-2 text-[10px] font-black text-slate-950">{isTurkish ? "Command Center →" : "Command Center →"}</Link></div></section>

          <section className="mt-4 rounded-[24px] border border-slate-800 bg-[#071423] p-4"><div className="flex items-center justify-between gap-3"><div><h2 className="font-black">{isTurkish ? "Risk Analizlerim" : "My Risk Assessments"}</h2><p className="text-[10px] text-slate-600">{isTurkish ? "Kaydettiğiniz profesyonel risk değerlendirmeleri" : "Saved professional risk assessments"}</p></div><Link href={`/${locale}/tools/quick-risk-assessment`} className="rounded-xl bg-blue-600 px-3 py-2 text-[10px] font-black text-white">+ {isTurkish ? "Yeni" : "New"}</Link></div>{riskAssessments.length > 0 ? <div className="mt-3 grid gap-2 md:grid-cols-2">{riskAssessments.map((assessment) => { const riskCount = Array.isArray(assessment.risk_items) ? assessment.risk_items.length : 0; return <article key={assessment.id} className="rounded-2xl border border-slate-800 bg-slate-950/35 p-3"><div className="flex justify-between gap-3"><div className="min-w-0"><p className="truncate text-xs font-black text-slate-200">{assessment.title || assessment.document_no || (isTurkish ? "Risk Analizi" : "Risk Assessment")}</p><p className="mt-0.5 truncate text-[9px] text-slate-600">{assessment.project_name || (isTurkish ? "Proje belirtilmedi" : "No project")}</p></div><span className="text-[9px] font-black text-emerald-300">{riskCount} risk</span></div><div className="mt-3 flex flex-wrap gap-2"><Link href={`/${locale}/tools/quick-risk-assessment?assessment=${assessment.id}`} className="rounded-lg border border-blue-500/25 bg-blue-500/[0.06] px-2.5 py-1.5 text-[9px] font-black text-blue-300">{isTurkish ? "Aç" : "Open"}</Link><RiskAssessmentActions assessmentId={assessment.id} locale={locale} /></div></article>; })}</div> : <div className="mt-3 rounded-xl border border-dashed border-slate-800 px-4 py-5 text-center text-xs font-bold text-slate-600">{isTurkish ? "Henüz kayıtlı risk analizi yok" : "No saved risk assessments yet"}</div>}</section>

          <details id="company-branding" className="mt-4 rounded-[24px] border border-slate-800 bg-[#071423] lg:open"><summary className="cursor-pointer list-none px-4 py-3 text-xs font-black text-slate-300 lg:hidden">{isTurkish ? "Şirket Kimliği" : "Company Branding"} <span className="float-right text-blue-300">+</span></summary><div className="border-t border-slate-800 lg:border-0"><CompanyBranding locale={locale} userId={user.id} isPremium={isPremium} /></div></details>
        </div>
      </div>
    </main>
  );
}
