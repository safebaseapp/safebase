import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "user" | "admin";
  plan: "free" | "premium";
  status: "active" | "suspended";
  created_at: string;
  updated_at: string;
};

type ActivityEvent = {
  id: number;
  event_name: string;
  path: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

type RiskAssessment = {
  id: string;
  title: string | null;
  project_name: string | null;
  company_name: string | null;
  document_no: string | null;
  assessment_date: string | null;
  updated_at: string;
};

function formatDateTime(value: string | null, locale: string) {
  if (!value) return "—";

  return new Intl.DateTimeFormat(
    locale === "tr" ? "tr-TR" : "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(value));
}

function getActivityLabel(
  eventName: string,
  isTurkish: boolean
) {
  const labels: Record<string, [string, string, string]> = {
    dashboard_open: ["🏠", "Dashboard açıldı", "Dashboard opened"],
  risk_assessment_saved: [
    "💾",
    "Risk Assessment kaydedildi",
    "Risk Assessment saved",
  ],
  risk_assessment_updated: [
    "🔄",
    "Risk Assessment güncellendi",
    "Risk Assessment updated",
  ],
  risk_assessment_calculated: [
    "🧠",
    "Risk Assessment hesaplandı",
    "Risk Assessment calculated",
  ],
  checkout_start: [
    "💳",
    "Premium ödeme işlemi başlatıldı",
    "Premium checkout started",
  ],
  trir_open: ["📊", "TRIR Hesaplayıcı açıldı", "TRIR Calculator opened"],
  ltifr_open: ["📈", "LTIFR Hesaplayıcı açıldı", "LTIFR Calculator opened"],
  severity_rate_open: ["⚖️", "Severity Rate açıldı", "Severity Rate opened"],
  risk_matrix_open: ["🧮", "Risk Matrix açıldı", "Risk Matrix opened"],
  simops_open: ["🔄", "SIMOPS aracı açıldı", "SIMOPS tool opened"],
  downloads_open: ["📥", "Kaynak Merkezi açıldı", "Resource Center opened"],
  safety_signs_open: ["🚸", "Safety Signs açıldı", "Safety Signs opened"],
  checklist_detail_open: ["✅", "Checklist görüntülendi", "Checklist viewed"],
    risk_assessment_open: [
      "⚠️",
      "Risk Assessment açıldı",
      "Risk Assessment opened",
    ],
    method_statement_open: [
      "📋",
      "Method Statement açıldı",
      "Method Statement opened",
    ],
    toolbox_open: ["🗣️", "Toolbox açıldı", "Toolbox opened"],
    premium_view: [
      "👑",
      "Premium ekranı görüntülendi",
      "Premium viewed",
    ],
    pdf_download: ["📄", "PDF indirildi", "PDF downloaded"],
  };

  const value = labels[eventName];

  if (!value) {
    return {
      icon: "•",
      label: eventName,
    };
  }

  return {
    icon: value[0],
    label: isTurkish ? value[1] : value[2],
  };
}

export default async function AdminUserDetailsPage({ params }: Props) {
  const { locale: rawLocale, id } = await params;

  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user: adminUser },
  } = await supabase.auth.getUser();

  if (!adminUser) {
    redirect(
      `/${locale}/login?next=/${locale}/admin/users/${encodeURIComponent(id)}`
    );
  }

  if (!isAdminUser(adminUser)) {
    redirect(`/${locale}/dashboard`);
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select(
      "id,email,full_name,role,plan,status,created_at,updated_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (profileError) {
    console.error(
      "Admin user details profile error:",
      profileError
    );
  }

  if (!profileData) {
    notFound();
  }

  const profile = profileData as Profile;

  const { data: riskAssessmentData, error: riskAssessmentError } =
    await supabase
      .from("risk_assessments")
      .select(
        "id,title,project_name,company_name,document_no,assessment_date,updated_at"
      )
      .eq("user_id", id)
      .order("updated_at", { ascending: false })
      .limit(20);

  if (riskAssessmentError) {
    console.error(
      "Admin user risk assessments error:",
      riskAssessmentError
    );
  }

  const riskAssessments =
    (riskAssessmentData ?? []) as RiskAssessment[];

  const { data: activityData, error: activityError } =
    await supabase
      .from("user_activity_events")
      .select("id,event_name,path,metadata,created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(100);

  if (activityError) {
    console.error(
      "Admin user activity error:",
      activityError
    );
  }

  const activityEvents =
    (activityData ?? []) as ActivityEvent[];

  const displayName =
    profile.full_name ||
    profile.email?.split("@")[0] ||
    (isTurkish ? "SERNEM Kullanıcısı" : "SERNEM User");

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">

        <header className="border-b border-white/10 pb-7">
          <Link
            href={`/${locale}/admin/users`}
            className="text-sm font-black text-blue-400 transition hover:text-blue-300"
          >
            ← {isTurkish ? "Kullanıcılara dön" : "Back to users"}
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
                SERNEM USER INTELLIGENCE
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                {displayName}
              </h1>

              <p className="mt-2 text-slate-400">
                {profile.email ?? "—"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-4 py-2 text-xs font-black ${
                  profile.plan === "premium"
                    ? "bg-amber-400/15 text-amber-300"
                    : "bg-emerald-400/15 text-emerald-300"
                }`}
              >
                {profile.plan === "premium"
                  ? "👑 PREMIUM"
                  : "🌍 FREE"}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-xs font-black ${
                  profile.status === "active"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-red-400/15 text-red-300"
                }`}
              >
                {profile.status === "active"
                  ? isTurkish
                    ? "HESAP AKTİF"
                    : "ACCOUNT ACTIVE"
                  : isTurkish
                    ? "HESAP ASKIDA"
                    : "ACCOUNT SUSPENDED"}
              </span>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              {isTurkish ? "Plan" : "Plan"}
            </p>
            <p className="mt-3 text-2xl font-black">
              {profile.plan === "premium" ? "Premium" : "Free"}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              {isTurkish ? "Rol" : "Role"}
            </p>
            <p className="mt-3 text-2xl font-black">
              {profile.role === "admin" ? "Admin" : "User"}
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              {isTurkish ? "Kayıt Tarihi" : "Registered"}
            </p>
            <p className="mt-3 text-lg font-black">
              {formatDateTime(profile.created_at, locale)}
            </p>
          </article>

          <article className="rounded-3xl border border-blue-400/20 bg-blue-400/[0.07] p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-300">
              {isTurkish ? "Risk Analizleri" : "Risk Assessments"}
            </p>
            <p className="mt-3 text-4xl font-black">
              {riskAssessments.length}
            </p>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">

          <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
              {isTurkish ? "Hesap Bilgileri" : "Account Details"}
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {isTurkish ? "Kullanıcı Profili" : "User Profile"}
            </h2>

            <dl className="mt-6 space-y-5">
              {[
                ["User ID", profile.id],
                ["Email", profile.email ?? "—"],
                [
                  isTurkish ? "Tam Ad" : "Full Name",
                  profile.full_name ?? "—",
                ],
                [
                  isTurkish ? "Hesap Durumu" : "Account Status",
                  profile.status,
                ],
                ["Plan", profile.plan],
                [isTurkish ? "Rol" : "Role", profile.role],
                [
                  isTurkish ? "Kayıt Tarihi" : "Registered",
                  formatDateTime(profile.created_at, locale),
                ],
                [
                  isTurkish
                    ? "Profil Güncelleme"
                    : "Profile Updated",
                  formatDateTime(profile.updated_at, locale),
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-b border-white/10 pb-4 last:border-0"
                >
                  <dt className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </dt>
                  <dd className="mt-2 break-all text-sm font-bold text-slate-200">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
            <div className="border-b border-white/10 p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">
                    SERNEM ACTIVITY
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {isTurkish
                      ? "Kullanıcı Aktivitesi"
                      : "User Activity"}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {isTurkish
                      ? "SERNEM içinde kaydedilen gerçek ürün hareketleri."
                      : "Recorded product activity inside SERNEM."}
                  </p>
                </div>

                <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300">
                  {activityEvents.length} EVENTS
                </div>
              </div>
            </div>

            <div className="p-6">
              {activityEvents.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-center">
                  <p className="text-3xl">📭</p>

                  <p className="mt-3 font-black">
                    {isTurkish
                      ? "Henüz kayıtlı aktivite yok"
                      : "No recorded activity yet"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {isTurkish
                      ? "Activity Tracking kurulduktan sonraki kullanıcı hareketleri burada görünecek."
                      : "User activity recorded after Activity Tracking was enabled will appear here."}
                  </p>
                </div>
              ) : (
                <div className="relative space-y-3">
                  {activityEvents.map((event) => {
                    const activity = getActivityLabel(
                      event.event_name,
                      isTurkish
                    );

                    return (
                      <div
                        key={event.id}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-lg">
                          {activity.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row">
                            <p className="font-black text-white">
                              {activity.label}
                            </p>

                            <p className="text-xs font-bold text-slate-500">
                              {formatDateTime(
                                event.created_at,
                                locale
                              )}
                            </p>
                          </div>

                          {event.path ? (
                            <p className="mt-2 break-all text-xs text-slate-500">
                              {event.path}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-400">
                  {isTurkish
                    ? "Kaydedilmiş İçerik"
                    : "Saved Content"}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {isTurkish
                    ? `${riskAssessments.length} kayıtlı risk analizi`
                    : `${riskAssessments.length} saved risk assessments`}
                </p>
              </div>
            </div>
          </article>
        </section>



      </div>
    </main>
  );
}
