"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  calculateDART,
  calculateLTIFR,
  calculateSeverityRate,
  calculateTRIR,
} from "@/lib/hse-metrics";

type MetricKey =
  | "near_miss"
  | "first_aid"
  | "medical_treatment"
  | "recordable_cases"
  | "lti"
  | "lost_days"
  | "dart_cases"
  | "inspection_count"
  | "toolbox_talk_count"
  | "training_hours"
  | "management_walkdown_count";

type FormState = {
  period_month: string;
  project_name: string;
  worked_hours: string;
  near_miss: string;
  first_aid: string;
  medical_treatment: string;
  recordable_cases: string;
  lti: string;
  lost_days: string;
  dart_cases: string;
  inspection_count: string;
  toolbox_talk_count: string;
  training_hours: string;
  management_walkdown_count: string;
};

const zeroForm = (period: string, project = "All Projects"): FormState => ({
  period_month: period,
  project_name: project,
  worked_hours: "0",
  near_miss: "0",
  first_aid: "0",
  medical_treatment: "0",
  recordable_cases: "0",
  lti: "0",
  lost_days: "0",
  dart_cases: "0",
  inspection_count: "0",
  toolbox_talk_count: "0",
  training_hours: "0",
  management_walkdown_count: "0",
});

const monthNames = {
  tr: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

function safeNumber(value: string | number) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function MetricStepper({
  label,
  value,
  onChange,
  icon,
  subtitle,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: string;
  subtitle?: string;
}) {
  const numericValue = safeNumber(value);

  function change(delta: number) {
    onChange(String(Math.max(0, numericValue + delta)));
  }

  return (
    <div className="group rounded-2xl border border-slate-800 bg-[#04101d] p-4 transition hover:border-blue-500/35 hover:bg-[#061524]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/15 bg-blue-500/[0.07] text-sm text-blue-300">
              {icon}
            </span>
            <p className="text-[11px] font-bold text-slate-300">{label}</p>
          </div>

          {subtitle && (
            <p className="mt-2 text-[9px] text-slate-600">{subtitle}</p>
          )}
        </div>

        <span className="rounded-full border border-slate-800 bg-slate-950/50 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-slate-500">
          KPI
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => change(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-lg font-black text-slate-300 transition hover:border-blue-500/50 hover:text-white"
        >
          −
        </button>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(String(Math.max(0, safeNumber(e.target.value))))}
          className="min-w-0 flex-1 appearance-none bg-transparent text-center text-3xl font-black tracking-tight text-white outline-none"
        />

        <button
          type="button"
          onClick={() => change(1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/[0.10] text-lg font-black text-blue-300 transition hover:bg-blue-500/20 hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function IncidentManagementPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const initialPeriod = new Date().toISOString().slice(0, 7);

  const [form, setForm] = useState<FormState>(() => zeroForm(initialPeriod));
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const selectedYear = Number(form.period_month.slice(0, 4));
  const selectedMonth = Number(form.period_month.slice(5, 7));

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 9 }, (_, index) => current - 4 + index);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
    setDirty(true);
    setMessage("");
  }

  function updateMetric(key: MetricKey, value: string) {
    update(key, String(Math.max(0, safeNumber(value))));
  }

  function setPeriod(month: number, year: number) {
    const next = `${year}-${String(month).padStart(2, "0")}`;
    update("period_month", next);
  }

  async function loadMonth(period: string, project: string) {
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setMessage(
        isTurkish
          ? "Oturum bulunamadı."
          : "No authenticated session found.",
      );
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("hse_incident_metrics")
      .select("*")
      .eq("user_id", user.id)
      .eq("period_month", `${period}-01`)
      .eq("project_name", project)
      .maybeSingle();

    if (error) {
      setMessage(
        isTurkish
          ? `Veri okunamadı: ${error.message}`
          : `Data could not be loaded: ${error.message}`,
      );
      setLoading(false);
      return;
    }

    if (!data) {
      setForm(zeroForm(period, project));
      setLastSaved(null);
      setDirty(false);
      setLoading(false);
      return;
    }

    setForm({
      period_month: period,
      project_name: data.project_name ?? project,
      worked_hours: String(data.worked_hours ?? 0),
      near_miss: String(data.near_miss ?? 0),
      first_aid: String(data.first_aid ?? 0),
      medical_treatment: String(data.medical_treatment ?? 0),
      recordable_cases: String(data.recordable_cases ?? 0),
      lti: String(data.lti ?? 0),
      lost_days: String(data.lost_days ?? 0),
      dart_cases: String(data.dart_cases ?? 0),
      inspection_count: String(data.inspection_count ?? 0),
      toolbox_talk_count: String(data.toolbox_talk_count ?? 0),
      training_hours: String(data.training_hours ?? 0),
      management_walkdown_count: String(
        data.management_walkdown_count ?? 0,
      ),
    });

    setLastSaved(data.updated_at ?? data.created_at ?? null);
    setDirty(false);
    setLoading(false);
  }

  useEffect(() => {
    void loadMonth(form.period_month, form.project_name);
    // period/project değişince o dönemin gerçek kaydını getir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.period_month, form.project_name]);

  const workedHours = safeNumber(form.worked_hours);
  const recordable = safeNumber(form.recordable_cases);
  const dartCases = safeNumber(form.dart_cases);
  const lti = safeNumber(form.lti);
  const lostDays = safeNumber(form.lost_days);

  const preview = {
    trir: calculateTRIR(recordable, workedHours),
    dart: calculateDART(dartCases, workedHours),
    ltifr: calculateLTIFR(lti, workedHours),
    severity: calculateSeverityRate(lostDays, workedHours),
  };

  const periodLabel = `${monthNames[locale][selectedMonth - 1]} ${selectedYear}`;

  async function saveMetrics() {
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setMessage(
        isTurkish
          ? "Kayıt için oturum açmanız gerekiyor."
          : "You must be signed in to save.",
      );
      setSaving(false);
      return;
    }

    const payload = {
      user_id: user.id,
      period_month: `${form.period_month}-01`,
      project_name: form.project_name.trim() || "All Projects",
      worked_hours: safeNumber(form.worked_hours),
      near_miss: safeNumber(form.near_miss),
      first_aid: safeNumber(form.first_aid),
      medical_treatment: safeNumber(form.medical_treatment),
      recordable_cases: safeNumber(form.recordable_cases),
      lti: safeNumber(form.lti),
      lost_days: safeNumber(form.lost_days),
      dart_cases: safeNumber(form.dart_cases),
      inspection_count: safeNumber(form.inspection_count),
      toolbox_talk_count: safeNumber(form.toolbox_talk_count),
      training_hours: safeNumber(form.training_hours),
      management_walkdown_count: safeNumber(
        form.management_walkdown_count,
      ),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("hse_incident_metrics")
      .upsert(payload, {
        onConflict: "user_id,period_month,project_name",
      });

    if (error) {
      setMessage(
        isTurkish
          ? `Kayıt başarısız: ${error.message}`
          : `Save failed: ${error.message}`,
      );
      setSaving(false);
      return;
    }

    const now = new Date().toISOString();
    setLastSaved(now);
    setDirty(false);

    setMessage(
      isTurkish
        ? `${periodLabel} HSE performans verisi kaydedildi.`
        : `${periodLabel} HSE performance data saved.`,
    );

    setSaving(false);
  }

  const incidentCards: Array<{
    key: MetricKey;
    label: string;
    icon: string;
    subtitle?: string;
  }> = [
    {
      key: "near_miss",
      label: "Near Miss",
      icon: "◉",
      subtitle: isTurkish ? "Ramak kala" : "Near-miss event",
    },
    {
      key: "first_aid",
      label: isTurkish ? "İlk Yardım" : "First Aid",
      icon: "+",
    },
    {
      key: "medical_treatment",
      label: "MTC",
      icon: "✚",
      subtitle: "Medical Treatment Case",
    },
    {
      key: "recordable_cases",
      label: "Recordable Cases",
      icon: "▤",
      subtitle: "OSHA Recordable",
    },
    {
      key: "lti",
      label: "LTI",
      icon: "!",
      subtitle: "Lost Time Injury",
    },
    {
      key: "lost_days",
      label: isTurkish ? "Kayıp Gün" : "Lost Days",
      icon: "◷",
    },
    {
      key: "dart_cases",
      label: "DART Cases",
      icon: "↗",
    },
  ];

  const leadingCards: Array<{
    key: MetricKey;
    label: string;
    icon: string;
  }> = [
    {
      key: "inspection_count",
      label: isTurkish ? "Yapılan İnceleme" : "Inspections Completed",
      icon: "◈",
    },
    {
      key: "toolbox_talk_count",
      label: "Toolbox Talk",
      icon: "◷",
    },
    {
      key: "training_hours",
      label: isTurkish ? "Eğitim Saati" : "Training Hours",
      icon: "▤",
    },
    {
      key: "management_walkdown_count",
      label: isTurkish ? "Yönetim Walkdown" : "Management Walkdown",
      icon: "♟",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto max-w-[1540px] px-5 py-8 lg:px-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-400">
              SERNEM HSE PERFORMANCE
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              {isTurkish ? "Olay Yönetimi" : "Incident Management"}
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-slate-400">
              {isTurkish
                ? "Aylık çalışma saati, olay ve önleyici performans verilerini yönetin. Tüm OSHA oranları canlı hesaplanır."
                : "Manage monthly worked hours, incidents and preventive performance data. OSHA rates are calculated live."}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <a
              href={`/${locale}/hse-performance`}
              className="rounded-xl border border-slate-700 bg-[#07111f] px-4 py-3 text-xs font-bold text-slate-300 transition hover:border-blue-500/40 hover:text-white"
            >
              ← {isTurkish ? "Genel Bakış" : "Overview"}
            </a>

            <button
              type="button"
              onClick={saveMetrics}
              disabled={saving || loading}
              className="min-w-[250px] rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-black text-white shadow-[0_12px_40px_rgba(37,99,235,.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? isTurkish
                  ? "Kaydediliyor..."
                  : "Saving..."
                : `✓ ${
                    isTurkish
                      ? "Aylık Performansı Kaydet"
                      : "Save Monthly Performance"
                  }`}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] px-4 py-3">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                dirty
                  ? "bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,.8)]"
                  : "bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.7)]"
              }`}
            />

            <span className="font-bold text-slate-300">
              {dirty
                ? isTurkish
                  ? "Kaydedilmemiş değişiklikler var"
                  : "Unsaved changes"
                : isTurkish
                  ? "Veriler güncel"
                  : "Data up to date"}
            </span>
          </div>

          <p className="text-[10px] text-slate-500">
            {lastSaved
              ? `${
                  isTurkish ? "Son kayıt" : "Last saved"
                }: ${new Intl.DateTimeFormat(
                  isTurkish ? "tr-TR" : "en-US",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  },
                ).format(new Date(lastSaved))}`
              : isTurkish
                ? "Bu dönem için kayıt bulunmuyor."
                : "No saved data for this period."}
          </p>
        </div>

        <section className="mt-5 grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-[20px] border border-blue-500/20 bg-[#061524] p-5">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-400">
              {isTurkish ? "Dönem" : "Period"}
            </p>

            <div className="mt-3 grid grid-cols-[1fr_120px] gap-3">
              <select
                value={selectedMonth}
                onChange={(e) =>
                  setPeriod(Number(e.target.value), selectedYear)
                }
                className="rounded-xl border border-slate-700 bg-[#020817] px-4 py-3 text-sm font-bold text-white outline-none focus:border-blue-500"
              >
                {monthNames[locale].map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) =>
                  setPeriod(selectedMonth, Number(e.target.value))
                }
                className="rounded-xl border border-slate-700 bg-[#020817] px-4 py-3 text-sm font-bold text-white outline-none focus:border-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-[20px] border border-blue-500/20 bg-[#061524] p-5">
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-blue-400">
              {isTurkish ? "Proje" : "Project"}
            </p>

            <input
              value={form.project_name}
              onChange={(e) => update("project_name", e.target.value)}
              onBlur={() => {
                if (!form.project_name.trim()) {
                  update("project_name", "All Projects");
                }
              }}
              className="mt-3 w-full rounded-xl border border-slate-700 bg-[#020817] px-4 py-3 text-sm font-bold text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="rounded-[20px] border border-cyan-500/25 bg-gradient-to-br from-cyan-500/[0.08] to-[#061524] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-300">
                {isTurkish ? "Toplam Çalışma Saati" : "Total Worked Hours"}
              </p>
              <span className="text-cyan-300">◷</span>
            </div>

            <div className="mt-3 flex items-end gap-3">
              <input
                type="number"
                min="0"
                value={form.worked_hours}
                onChange={(e) =>
                  update(
                    "worked_hours",
                    String(Math.max(0, safeNumber(e.target.value))),
                  )
                }
                className="min-w-0 flex-1 bg-transparent text-3xl font-black text-white outline-none"
              />

              <span className="pb-1 text-[10px] font-bold text-slate-500">
                employee-hours
              </span>
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                style={{
                  width: `${Math.min(100, workedHours / 1500)}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[2.15fr_1fr]">
          <article className="rounded-[20px] border border-orange-500/20 bg-[#061524] p-5">
            <div>
              <h2 className="text-xl font-black">
                {isTurkish ? "Olay Verileri" : "Incident Data"}
              </h2>
              <p className="mt-1 text-[11px] text-slate-500">
                OSHA lagging indicators
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {incidentCards.map((card) => (
                <MetricStepper
                  key={card.key}
                  label={card.label}
                  icon={card.icon}
                  subtitle={card.subtitle}
                  value={form[card.key]}
                  onChange={(value) =>
                    updateMetric(card.key, value)
                  }
                />
              ))}
            </div>
          </article>

          <article className="rounded-[20px] border border-blue-500/25 bg-gradient-to-b from-[#07182b] to-[#061524] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-400">
                  {isTurkish ? "Canlı Ön İzleme" : "Live Preview"}
                </p>
                <h2 className="mt-2 text-xl font-black">
                  OSHA Metrics
                </h2>
                <p className="mt-1 text-[10px] text-slate-500">
                  {workedHours.toLocaleString(
                    isTurkish ? "tr-TR" : "en-US",
                  )}{" "}
                  employee-hours
                </p>
              </div>

              <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-1 text-[9px] font-black text-emerald-300">
                LIVE
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                {
                  label: "TRIR",
                  value: preview.trir,
                  tone: "text-blue-300",
                },
                {
                  label: "DART",
                  value: preview.dart,
                  tone: "text-violet-300",
                },
                {
                  label: "LTIFR",
                  value: preview.ltifr,
                  tone: "text-amber-300",
                },
                {
                  label: isTurkish
                    ? "Şiddet Oranı"
                    : "Severity Rate",
                  value: preview.severity,
                  tone: "text-emerald-300",
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-slate-700/70 bg-slate-950/35 p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {metric.label}
                  </p>

                  <p
                    className={`mt-2 text-3xl font-black tabular-nums transition-all duration-300 ${metric.tone}`}
                  >
                    {metric.value.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-blue-500/15 bg-blue-500/[0.05] p-3">
              <p className="text-[9px] leading-4 text-slate-500">
                {isTurkish
                  ? "Değerleri değiştirdiğiniz anda KPI ön izlemesi güncellenir. Kaydetme işlemi verileri aylık performans kaydına yazar."
                  : "KPI preview updates instantly as values change. Saving writes the values to the monthly performance record."}
              </p>
            </div>
          </article>
        </section>

        <section className="mt-5 rounded-[20px] border border-emerald-500/20 bg-[#061524] p-5">
          <div>
            <h2 className="text-xl font-black">Leading Indicators</h2>
            <p className="mt-1 text-[11px] text-slate-500">
              {isTurkish
                ? "Aylık önleyici faaliyet verileri"
                : "Monthly preventive activity data"}
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {leadingCards.map((card) => (
              <MetricStepper
                key={card.key}
                label={card.label}
                icon={card.icon}
                value={form[card.key]}
                onChange={(value) =>
                  updateMetric(card.key, value)
                }
              />
            ))}
          </div>
        </section>

        {message && (
          <div
            className={`mt-5 rounded-xl border px-4 py-3 text-xs font-bold ${
              message.includes("başarısız") ||
              message.includes("could not") ||
              message.includes("failed")
                ? "border-red-500/25 bg-red-500/[0.06] text-red-300"
                : "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </main>
  );
}
