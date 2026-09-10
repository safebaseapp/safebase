"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  calculateDART,
  calculateLTIFR,
  calculateSeverityRate,
  calculateTRIR,
} from "@/lib/hse-metrics";
import HseReportingPanel from "./HseReportingPanel";


type Locale = "tr" | "en";

type Observation = {
  id: string;
  user_id: string;
  observation_date: string;
  project_name: string | null;
  location: string | null;
  company_name: string | null;

  observation_type:
    | "positive"
    | "unsafe_act"
    | "unsafe_condition";

  category: string;

  risk_level:
    | "low"
    | "medium"
    | "high"
    | "critical";

  title: string;
  description: string;

  corrective_action: string | null;
  responsible_person: string | null;
  target_date: string | null;

  status:
    | "open"
    | "in_progress"
    | "closed";

  created_at: string;
  closed_at?: string | null;
};


type IncidentMetrics = {
  worked_hours: number;
  near_miss: number;
  first_aid: number;
  medical_treatment: number;
  recordable_cases: number;
  lti: number;
  lost_days: number;
  dart_cases: number;
  inspection_count: number;
  toolbox_talk_count: number;
  training_hours: number;
  management_walkdown_count: number;
};

type KpiTrendPoint = {
  key: string;
  label: string;
  workedHours: number;
  trir: number;
  dart: number;
  ltifr: number;
  severity: number;
  hasData: boolean;
};

type Props = {
  locale: Locale;
  userId: string;
  initialObservations: Observation[];
};

const categories = [
  "Working at Height",
  "Hot Work",
  "PPE",
  "Housekeeping",
  "Scaffolding",
  "Lifting",
  "Electrical",
  "Excavation",
  "Confined Space",
  "Mobile Equipment",
  "Chemical Safety",
  "Other",
];

function unique(values: Array<string | null>) {
  return Array.from(
    new Set(
      values
        .filter((x): x is string => Boolean(x))
        .map((x) => x.trim())
        .filter(Boolean),
    ),
  ).sort();
}

function startOfToday() {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
}

function isOverdue(item: Observation) {
  if (
    item.status === "closed" ||
    !item.target_date
  ) {
    return false;
  }

  return new Date(item.target_date) < startOfToday();
}

function monthKey(date: string) {
  const d = new Date(date);

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1,
  ).padStart(2, "0")}`;
}

function monthLabel(key: string, locale: Locale) {
  const [year, month] = key.split("-").map(Number);

  return new Intl.DateTimeFormat(
    locale === "tr" ? "tr-TR" : "en-US",
    {
      month: "short",
    },
  ).format(new Date(year, month - 1, 1));
}

export default function HsePerformanceClient({
  locale,
  userId,
  initialObservations,
}: Props) {
  const isTurkish = locale === "tr";

  const [observations, setObservations] =
    useState<Observation[]>(initialObservations);

  const [saving, setSaving] = useState(false);
  const [closingId, setClosingId] =
    useState<string | null>(null);

  const [message, setMessage] = useState("");

  const [selectedMonth, setSelectedMonth] = useState(
    () => new Date().toISOString().slice(0, 7),
  );

  const [filters, setFilters] = useState({
    project: "all",
    company: "all",
    type: "all",
    risk: "all",
  });


  const [incidentMetrics, setIncidentMetrics] =
    useState<IncidentMetrics | null>(null);

  const [kpiTrend, setKpiTrend] =
    useState<KpiTrendPoint[]>([]);

  const [kpiTrendLoading, setKpiTrendLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadIncidentMetrics() {
      const supabase = createClient();

      const periodMonth = `${selectedMonth}-01`;

      let query = supabase
        .from("hse_incident_metrics")
        .select(`
          worked_hours,
          near_miss,
          first_aid,
          medical_treatment,
          recordable_cases,
          lti,
          lost_days,
          dart_cases,
          inspection_count,
          toolbox_talk_count,
          training_hours,
          management_walkdown_count
        `)
        .eq("user_id", userId)
        .eq("period_month", periodMonth);

      if (filters.project === "all") {
        query = query.eq("project_name", "All Projects");
      } else {
        query = query.eq("project_name", filters.project);
      }

      const { data, error } = await query.maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("HSE incident metrics load error:", error);
        setIncidentMetrics(null);
        return;
      }

      setIncidentMetrics(
        data
          ? {
              worked_hours: Number(data.worked_hours ?? 0),
              near_miss: Number(data.near_miss ?? 0),
              first_aid: Number(data.first_aid ?? 0),
              medical_treatment: Number(data.medical_treatment ?? 0),
              recordable_cases: Number(data.recordable_cases ?? 0),
              lti: Number(data.lti ?? 0),
              lost_days: Number(data.lost_days ?? 0),
              dart_cases: Number(data.dart_cases ?? 0),
              inspection_count: Number(data.inspection_count ?? 0),
              toolbox_talk_count: Number(data.toolbox_talk_count ?? 0),
              training_hours: Number(data.training_hours ?? 0),
              management_walkdown_count: Number(data.management_walkdown_count ?? 0),
            }
          : null,
      );
    }

    void loadIncidentMetrics();

    return () => {
      cancelled = true;
    };
  }, [userId, filters.project, selectedMonth]);

  useEffect(() => {
    let cancelled = false;

    async function loadKpiTrend() {
      setKpiTrendLoading(true);

      const supabase = createClient();

      const [year, month] =
        selectedMonth.split("-").map(Number);

      const end = new Date(year, month - 1, 1);
      const start = new Date(year, month - 12, 1);

      const startDate =
        `${start.getFullYear()}-${String(
          start.getMonth() + 1,
        ).padStart(2, "0")}-01`;

      const endDate =
        `${end.getFullYear()}-${String(
          end.getMonth() + 1,
        ).padStart(2, "0")}-01`;

      let query = supabase
        .from("hse_incident_metrics")
        .select(`
          period_month,
          project_name,
          worked_hours,
          recordable_cases,
          lti,
          lost_days,
          dart_cases
        `)
        .eq("user_id", userId)
        .gte("period_month", startDate)
        .lte("period_month", endDate)
        .order("period_month", {
          ascending: true,
        });

      if (filters.project === "all") {
        query = query.eq(
          "project_name",
          "All Projects",
        );
      } else {
        query = query.eq(
          "project_name",
          filters.project,
        );
      }

      const { data, error } = await query;

      if (cancelled) return;

      if (error) {
        console.error(
          "HSE KPI trend load error:",
          error,
        );
        setKpiTrend([]);
        setKpiTrendLoading(false);
        return;
      }

      const rows = data ?? [];

      const points: KpiTrendPoint[] = [];

      for (let i = 11; i >= 0; i--) {
        const d = new Date(
          year,
          month - 1 - i,
          1,
        );

        const key =
          `${d.getFullYear()}-${String(
            d.getMonth() + 1,
          ).padStart(2, "0")}`;

        const row = rows.find(
          (item) =>
            String(item.period_month).slice(0, 7) ===
            key,
        );

        const workedHours =
          Number(row?.worked_hours ?? 0);

        points.push({
          key,
          label: monthLabel(key, locale),

          workedHours,

          trir: row
            ? calculateTRIR(
                Number(row.recordable_cases ?? 0),
                workedHours,
              )
            : 0,

          dart: row
            ? calculateDART(
                Number(row.dart_cases ?? 0),
                workedHours,
              )
            : 0,

          ltifr: row
            ? calculateLTIFR(
                Number(row.lti ?? 0),
                workedHours,
              )
            : 0,

          severity: row
            ? calculateSeverityRate(
                Number(row.lost_days ?? 0),
                workedHours,
              )
            : 0,

          hasData: Boolean(row),
        });
      }

      setKpiTrend(points);
      setKpiTrendLoading(false);
    }

    void loadKpiTrend();

    return () => {
      cancelled = true;
    };
  }, [
    userId,
    filters.project,
    selectedMonth,
    locale,
  ]);

  const kpiTrendMax = Math.max(
    1,
    ...kpiTrend.flatMap((item) => [
      item.trir,
      item.dart,
      item.ltifr,
      item.severity,
    ]),
  );

  function kpiTrendPoints(
    metric:
      | "trir"
      | "dart"
      | "ltifr"
      | "severity",
  ) {
    return kpiTrend
      .map((item, index) => {
        const x =
          40 +
          index *
            (720 /
              Math.max(
                1,
                kpiTrend.length - 1,
              ));

        const y =
          205 -
          (item[metric] / kpiTrendMax) * 155;

        return `${x},${y}`;
      })
      .join(" ");
  }

  const [showObservationForm, setShowObservationForm] =
    useState(false);

  const [actionTab, setActionTab] =
    useState<"open" | "overdue" | "closed">(
      "open",
    );

  const [form, setForm] = useState({
    observation_date:
      new Date().toISOString().slice(0, 10),

    project_name: "",
    location: "",
    company_name: "",

    observation_type: "unsafe_condition",
    category: "Working at Height",
    risk_level: "medium",

    title: "",
    description: "",

    corrective_action: "",
    responsible_person: "",
    target_date: "",
  });

  const trir = incidentMetrics
    ? calculateTRIR(
        incidentMetrics.recordable_cases,
        incidentMetrics.worked_hours,
      )
    : null;

  const dart = incidentMetrics
    ? calculateDART(
        incidentMetrics.dart_cases,
        incidentMetrics.worked_hours,
      )
    : null;

  const ltifr = incidentMetrics
    ? calculateLTIFR(
        incidentMetrics.lti,
        incidentMetrics.worked_hours,
      )
    : null;

  const severityRate = incidentMetrics
    ? calculateSeverityRate(
        incidentMetrics.lost_days,
        incidentMetrics.worked_hours,
      )
    : null;

  const projectOptions = useMemo(
    () =>
      unique(
        observations.map(
          (x) => x.project_name,
        ),
      ),
    [observations],
  );

  const companyOptions = useMemo(
    () =>
      unique(
        observations.map(
          (x) => x.company_name,
        ),
      ),
    [observations],
  );

  const filteredObservations =
    useMemo(() => {
      return observations.filter((item) => {
        if (monthKey(item.observation_date) !== selectedMonth) {
          return false;
        }

        if (
          filters.project !== "all" &&
          item.project_name !== filters.project
        ) {
          return false;
        }

        if (
          filters.company !== "all" &&
          item.company_name !== filters.company
        ) {
          return false;
        }

        if (
          filters.type !== "all" &&
          item.observation_type !== filters.type
        ) {
          return false;
        }

        if (
          filters.risk !== "all" &&
          item.risk_level !== filters.risk
        ) {
          return false;
        }

        return true;
      });
    }, [observations, filters, selectedMonth]);

  const stats = useMemo(() => {
    const total =
      filteredObservations.length;

    const positive =
      filteredObservations.filter(
        (x) =>
          x.observation_type ===
          "positive",
      ).length;

    const unsafeAct =
      filteredObservations.filter(
        (x) =>
          x.observation_type ===
          "unsafe_act",
      ).length;

    const unsafeCondition =
      filteredObservations.filter(
        (x) =>
          x.observation_type ===
          "unsafe_condition",
      ).length;

    const open =
      filteredObservations.filter(
        (x) => x.status !== "closed",
      );

    const closed =
      filteredObservations.filter(
        (x) => x.status === "closed",
      );

    const overdue =
      filteredObservations.filter(
        isOverdue,
      );

    const criticalOpen = open.filter(
      (x) =>
        x.risk_level === "critical",
    ).length;

    const highOpen = open.filter(
      (x) => x.risk_level === "high",
    ).length;

    const closureRate =
      open.length + closed.length === 0
        ? 0
        : Math.round(
            (closed.length /
              (open.length +
                closed.length)) *
              100,
          );

    const positiveRate =
      total === 0
        ? 0
        : Math.round(
            (positive / total) * 100,
          );

    return {
      total,
      positive,
      unsafeAct,
      unsafeCondition,

      open: open.length,
      closed: closed.length,
      overdue: overdue.length,

      closureRate,
      positiveRate,

      criticalOpen,
      highOpen,
    };
  }, [filteredObservations]);

  const periodComparison = useMemo(() => {
    const [selectedYear, selectedMonthNumber] =
      selectedMonth.split("-").map(Number);

    const currentStart = new Date(
      selectedYear,
      selectedMonthNumber - 1,
      1,
    );

    const nextStart = new Date(
      selectedYear,
      selectedMonthNumber,
      1,
    );

    const previousStart = new Date(
      selectedYear,
      selectedMonthNumber - 2,
      1,
    );

    function inRange(
      date: string,
      start: Date,
      end: Date,
    ) {
      const value = new Date(date);
      return value >= start && value < end;
    }

    function buildPeriod(start: Date, end: Date) {
      const items = filteredObservations.filter(
        (item) =>
          inRange(
            item.observation_date,
            start,
            end,
          ),
      );

      const positive = items.filter(
        (item) =>
          item.observation_type === "positive",
      ).length;

      const open = items.filter(
        (item) => item.status !== "closed",
      ).length;

      const closed = items.filter(
        (item) => item.status === "closed",
      ).length;

      const criticalOpen = items.filter(
        (item) =>
          item.status !== "closed" &&
          item.risk_level === "critical",
      ).length;

      const closureRate =
        open + closed === 0
          ? 0
          : Math.round(
              (closed / (open + closed)) * 100,
            );

      return {
        total: items.length,
        positive,
        open,
        criticalOpen,
        closureRate,
      };
    }

    const current = buildPeriod(
      currentStart,
      nextStart,
    );

    const previous = buildPeriod(
      previousStart,
      currentStart,
    );

    function change(
      currentValue: number,
      previousValue: number,
    ) {
      if (previousValue === 0) {
        return currentValue === 0 ? 0 : 100;
      }

      return Math.round(
        ((currentValue - previousValue) /
          previousValue) *
          100,
      );
    }

    return {
      total: change(
        current.total,
        previous.total,
      ),
      positive: change(
        current.positive,
        previous.positive,
      ),
      open: change(
        current.open,
        previous.open,
      ),
      closure: change(
        current.closureRate,
        previous.closureRate,
      ),
    };
  }, [filteredObservations, selectedMonth]);

  const categoryData =
    useMemo(() => {
      const counts = new Map<
        string,
        number
      >();

      for (const item of filteredObservations) {
        counts.set(
          item.category,
          (counts.get(item.category) ?? 0) +
            1,
        );
      }

      return Array.from(counts.entries())
        .map(([name, count]) => ({
          name,
          count,
          percentage:
            stats.total === 0
              ? 0
              : Math.round(
                  (count / stats.total) *
                    100,
                ),
        }))
        .sort(
          (a, b) =>
            b.count - a.count,
        )
        .slice(0, 6);
    }, [
      filteredObservations,
      stats.total,
    ]);

  const monthlyTrend =
    useMemo(() => {
      const months: string[] = [];

      const [selectedYear, selectedMonthNumber] =
        selectedMonth.split("-").map(Number);

      for (let i = 5; i >= 0; i--) {
        const d = new Date(
          selectedYear,
          selectedMonthNumber - 1 - i,
          1,
        );

        months.push(
          `${d.getFullYear()}-${String(
            d.getMonth() + 1,
          ).padStart(2, "0")}`,
        );
      }

      return months.map((key) => {
        const items =
          filteredObservations.filter(
            (x) =>
              monthKey(
                x.observation_date,
              ) === key,
          );

        return {
          key,
          label: monthLabel(key, locale),

          total: items.length,

          positive:
            items.filter(
              (x) =>
                x.observation_type ===
                "positive",
            ).length,

          unsafe:
            items.filter(
              (x) =>
                x.observation_type !==
                "positive",
            ).length,
        };
      });
    }, [
      observations,
      filters,
      locale,
      selectedMonth,
    ]);

  const maxTrend = Math.max(
    1,
    ...monthlyTrend.map((x) => x.total),
  );

  const donut = useMemo(() => {
    if (stats.total === 0) {
      return {
        positiveDeg: 0,
        actDeg: 0,
      };
    }

    const positiveDeg =
      (stats.positive /
        stats.total) *
      360;

    const actDeg =
      positiveDeg +
      (stats.unsafeAct /
        stats.total) *
        360;

    return {
      positiveDeg,
      actDeg,
    };
  }, [stats]);

  const visibleActions =
    useMemo(() => {
      return filteredObservations
        .filter((item) => {
          if (actionTab === "closed") {
            return (
              item.status === "closed"
            );
          }

          if (actionTab === "overdue") {
            return isOverdue(item);
          }

          return (
            item.status !== "closed"
          );
        })
        .sort((a, b) => {
          const riskWeight = {
            critical: 4,
            high: 3,
            medium: 2,
            low: 1,
          };

          return (
            riskWeight[b.risk_level] -
            riskWeight[a.risk_level]
          );
        });
    }, [
      filteredObservations,
      actionTab,
    ]);

  async function saveObservation() {
    if (
      !form.title.trim() ||
      !form.description.trim()
    ) {
      setMessage(
        isTurkish
          ? "Başlık ve açıklama zorunludur."
          : "Title and description are required.",
      );

      return;
    }

    setSaving(true);
    setMessage("");

    const supabase = createClient();

    const payload = {
      user_id: userId,

      observation_date:
        form.observation_date,

      project_name:
        form.project_name.trim() ||
        null,

      location:
        form.location.trim() ||
        null,

      company_name:
        form.company_name.trim() ||
        null,

      observation_type:
        form.observation_type,

      category: form.category,

      risk_level:
        form.risk_level,

      title: form.title.trim(),

      description:
        form.description.trim(),

      corrective_action:
        form.corrective_action.trim() ||
        null,

      responsible_person:
        form.responsible_person.trim() ||
        null,

      target_date:
        form.target_date || null,

      status: "open",
    };

    const { data, error } =
      await supabase
        .from("hse_observations")
        .insert(payload)
        .select("*")
        .single();

    if (error || !data) {
      setMessage(
        isTurkish
          ? `Kayıt başarısız: ${
              error?.message ?? ""
            }`
          : `Save failed: ${
              error?.message ?? ""
            }`,
      );

      setSaving(false);
      return;
    }

    setObservations((current) => [
      data as Observation,
      ...current,
    ]);

    setForm((current) => ({
      ...current,
      title: "",
      description: "",
      corrective_action: "",
      responsible_person: "",
      target_date: "",
    }));

    setMessage(
      isTurkish
        ? "Gözlem kaydedildi."
        : "Observation saved.",
    );

    setSaving(false);
  }

  async function closeAction(
    item: Observation,
  ) {
    if (item.status === "closed") {
      return;
    }

    setClosingId(item.id);

    const supabase = createClient();

    const now =
      new Date().toISOString();

    const { error } = await supabase
      .from("hse_observations")
      .update({
        status: "closed",
        closed_at: now,
        updated_at: now,
      })
      .eq("id", item.id)
      .eq("user_id", userId);

    if (error) {
      setMessage(
        isTurkish
          ? `Aksiyon kapatılamadı: ${error.message}`
          : `Action could not be closed: ${error.message}`,
      );

      setClosingId(null);
      return;
    }

    setObservations((current) =>
      current.map((x) =>
        x.id === item.id
          ? {
              ...x,
              status: "closed",
              closed_at: now,
            }
          : x,
      ),
    );

    setMessage(
      isTurkish
        ? "Aksiyon kapatıldı."
        : "Action closed.",
    );

    setClosingId(null);
  }



  return (
    <main className="min-h-screen bg-[#020817] text-white">

      <div className="mx-auto w-full max-w-[1920px] xl:flex">

        {/* =====================================================
            LEFT HSE NAVIGATION
        ===================================================== */}
        <aside className="hidden min-h-screen w-[235px] shrink-0 border-r border-slate-800/80 bg-[#04101d] xl:block">
          <div className="sticky top-0 flex h-screen flex-col px-3 py-6">

            <p className="px-3 text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">
              HSE PERFORMANCE
            </p>

            <nav className="mt-4 space-y-1">
              <a
                href={`/${locale}/hse-performance`}
                className="flex items-center gap-3 rounded-xl border border-blue-500/15 bg-blue-500/15 px-3 py-3 text-sm font-black text-white"
              >
                <span className="text-blue-300">▦</span>
                {isTurkish ? "Genel Bakış" : "Overview"}
              </a>

              <a
                href="#kpi"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <span>◔</span>
                KPI Dashboard
              </a>

              <a
                href={`/${locale}/hse-performance/observations`}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <span>◉</span>
                {isTurkish ? "Gözlem Takibi" : "Observation Follow-up"}
              </a>

              <a
                href="#actions"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <span>◷</span>
                {isTurkish ? "Aksiyon Takibi" : "Action Tracking"}
              </a>

              <a
                href={`/${locale}/hse-performance/incidents`}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <span>▤</span>
                {isTurkish ? "Olay Yönetimi" : "Incident Management"}
              </a>

              <a
                href="#reports"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <span>▧</span>
                {isTurkish ? "Raporlar" : "Reports"}
              </a>

              <a
                href="#trend"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <span>↗</span>
                {isTurkish ? "Trend Analizi" : "Trend Analysis"}
              </a>

              <a
                href="#settings"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <span>⚙</span>
                {isTurkish ? "Ayarlar" : "Settings"}
              </a>
            </nav>

            <div className="mt-auto rounded-2xl border border-slate-800 bg-[#061524] p-4">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">
                {isTurkish ? "Standartlar & Referans" : "Standards & Reference"}
              </p>

              <div className="mt-5 space-y-4 text-xs text-slate-400">
                <p><span className="mr-2 text-emerald-400">✓</span>ISO 45001</p>
                <p><span className="mr-2 text-emerald-400">✓</span>ISO 45004</p>
                <p><span className="mr-2 text-emerald-400">✓</span>OSHA Metrics</p>
                <p><span className="mr-2 text-emerald-400">✓</span>NEBOSH Principles</p>
              </div>
            </div>

            <p className="mt-5 px-2 text-[10px] italic leading-5 text-slate-600">
              “Safer People.
              <br />
              Stronger Businesses.”
            </p>

            <p className="mt-3 px-2 text-xs font-black text-blue-300">
              ◈ SERNEM
            </p>
          </div>
        </aside>

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <div className="min-w-0 flex-1 px-5 py-6 sm:px-7 lg:px-8">

          {/* HEADER */}
          <header className="mb-4">
            <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-start 2xl:justify-between">

              <div>
                <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-[42px]">
                  HSE Performance
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  {isTurkish
                    ? "Gözlemle. Önle. Geliştir. Daha Güvenli Yarınlar."
                    : "Observe. Prevent. Improve. Build Safer Tomorrows."}
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

                <div className="hidden px-4 text-center text-xs italic leading-5 text-slate-500 2xl:block">
                  “Measure today.
                  <br />
                  A safer tomorrow.”
                  <div className="text-[9px] not-italic">
                    — SERNEM
                  </div>
                </div>

                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-[#07111f] px-4 py-3 text-xs font-bold text-slate-300"
                  aria-label={isTurkish ? "Dönem seç" : "Select period"}
                />

                <select
                  value={filters.project}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      project: e.target.value,
                    })
                  }
                  className="rounded-xl border border-slate-700 bg-[#07111f] px-4 py-3 text-xs font-bold text-slate-300"
                >
                  <option value="all">
                    {isTurkish ? "Tüm Projeler" : "All Projects"}
                  </option>

                  {projectOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <div
                  className={`rounded-xl border px-4 py-3 ${
                    stats.criticalOpen > 0
                      ? "border-amber-400/35 bg-amber-500/[0.10]"
                      : "border-emerald-400/30 bg-emerald-500/[0.08]"
                  }`}
                >
                  <div className="flex min-w-[235px] items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-black ${
                        stats.criticalOpen > 0
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {stats.criticalOpen > 0 ? "!" : "✓"}
                    </div>

                    <div>
                      <p
                        className={`text-xs font-black uppercase ${
                          stats.criticalOpen > 0
                            ? "text-amber-300"
                            : "text-emerald-300"
                        }`}
                      >
                        {stats.criticalOpen > 0
                          ? isTurkish
                            ? "Dikkat Gerekli"
                            : "Attention Required"
                          : isTurkish
                            ? "Kontrol Altında"
                            : "Under Control"}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {stats.criticalOpen > 0
                          ? isTurkish
                            ? `${stats.criticalOpen} kritik aksiyon halen açık.`
                            : `${stats.criticalOpen} critical action remains open.`
                          : isTurkish
                            ? "Açık kritik aksiyon yok."
                            : "No open critical actions."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* TOP KPI */}
          <section
            id="kpi"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
          >
            {[
              {
                title: isTurkish ? "Toplam Gözlem" : "Total Observations",
                value: stats.total,
                icon: "◉",
                delta: periodComparison.total,
                tone: "blue",
              },
              {
                title: isTurkish ? "Pozitif Gözlem" : "Positive Observation",
                value: stats.positive,
                icon: "✓",
                delta: periodComparison.positive,
                tone: "green",
              },
              {
                title: isTurkish ? "Açık Aksiyon" : "Open Actions",
                value: stats.open,
                icon: "!",
                delta: periodComparison.open,
                invertDelta: true,
                tone: "orange",
              },
              {
                title: isTurkish ? "Kritik Açık" : "Critical Open",
                value: stats.criticalOpen,
                icon: "!",
                delta: null,
                tone: "red",
              },
              {
                title: isTurkish ? "Kapanış Oranı" : "Closure Rate",
                value: `${stats.closureRate}%`,
                icon: "◔",
                delta: periodComparison.closure,
                tone: "cyan",
              },
            ].map((card) => {
              const style =
                card.tone === "green"
                  ? "border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.10] to-[#061524]"
                  : card.tone === "orange"
                    ? "border-orange-500/25 bg-gradient-to-br from-orange-500/[0.10] to-[#061524]"
                    : card.tone === "red"
                      ? "border-red-500/25 bg-gradient-to-br from-red-500/[0.10] to-[#061524]"
                      : card.tone === "cyan"
                        ? "border-cyan-500/25 bg-gradient-to-br from-cyan-500/[0.10] to-[#061524]"
                        : "border-blue-500/25 bg-gradient-to-br from-blue-500/[0.10] to-[#061524]";

              const deltaGood =
                card.delta !== null &&
                (card.invertDelta
                  ? card.delta <= 0
                  : card.delta >= 0);

              return (
                <article
                  key={card.title}
                  className={`min-h-[132px] rounded-[18px] border p-4 shadow-[0_18px_50px_rgba(0,0,0,.16)] ${style}`}
                >
                  <div className="flex h-full items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.06] text-2xl font-black text-blue-300">
                      {card.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] text-slate-300">
                        {card.title}
                      </p>

                      <div className="mt-1 flex items-end justify-between gap-2">
                        <p className="text-[34px] font-black leading-none">
                          {card.value}
                        </p>

                        {card.delta !== null && (
                          <span
                            className={`text-[11px] font-black ${
                              deltaGood
                                ? "text-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {card.delta >= 0 ? "↑" : "↓"}{" "}
                            {Math.abs(card.delta)}%
                          </span>
                        )}
                      </div>

                      <p
                        className={`mt-2 text-[10px] ${
                          card.tone === "red" &&
                          stats.criticalOpen > 0
                            ? "font-bold text-red-400"
                            : "text-slate-500"
                        }`}
                      >
                        {card.tone === "red" &&
                        stats.criticalOpen > 0
                          ? isTurkish
                            ? "Acil aksiyon gerekli"
                            : "Urgent action required"
                          : isTurkish
                            ? "Önceki aya göre"
                            : "Compared with previous month"}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* MAIN 4-COLUMN KPI GRID */}
          <section className="mt-5 grid gap-5 2xl:grid-cols-4">

            {/* LEADING */}
            <article className="rounded-[20px] border border-emerald-500/20 bg-[#061524] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-black">
                    Leading Indicators
                  </h2>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {isTurkish
                      ? "Önleyici göstergeler"
                      : "Preventive Indicators"}
                  </p>
                </div>

                <span className="rounded-lg border border-blue-500/20 bg-blue-500/[0.08] px-2 py-1 text-[9px] font-black text-blue-300">
                  {isTurkish ? "BU AY" : "THIS MONTH"}
                </span>
              </div>

              <div className="mt-5 space-y-2.5">
                {[
                  {
                    icon: "▣",
                    label: isTurkish ? "Gözlem Sayısı" : "Observations",
                    value: stats.total,
                    width: Math.min(100, stats.total * 8),
                    color: "bg-blue-500",
                  },
                  {
                    icon: "◉",
                    label: isTurkish ? "Pozitif Gözlem %" : "Positive Observation %",
                    value: `${stats.positiveRate}%`,
                    width: stats.positiveRate,
                    color: "bg-emerald-500",
                  },
                  {
                    icon: "◈",
                    label: isTurkish ? "Yapılan İnceleme" : "Inspections Completed",
                    value: incidentMetrics ? incidentMetrics.inspection_count : "—",
                    width: incidentMetrics
                      ? Math.min(100, incidentMetrics.inspection_count * 8)
                      : 0,
                    color: "bg-violet-500",
                  },
                  {
                    icon: "◷",
                    label: "Toolbox Talk",
                    value: incidentMetrics ? incidentMetrics.toolbox_talk_count : "—",
                    width: incidentMetrics
                      ? Math.min(100, incidentMetrics.toolbox_talk_count * 8)
                      : 0,
                    color: "bg-amber-400",
                  },
                  {
                    icon: "▤",
                    label: isTurkish ? "Eğitim Saati" : "Training Hours",
                    value: incidentMetrics ? incidentMetrics.training_hours : "—",
                    width: incidentMetrics
                      ? Math.min(100, Number(incidentMetrics.training_hours) * 4)
                      : 0,
                    color: "bg-emerald-400",
                  },
                  {
                    icon: "♟",
                    label: isTurkish ? "Yönetim Walkdown" : "Management Walkdown",
                    value: incidentMetrics ? incidentMetrics.management_walkdown_count : "—",
                    width: incidentMetrics
                      ? Math.min(100, incidentMetrics.management_walkdown_count * 10)
                      : 0,
                    color: "bg-blue-400",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-800 bg-slate-950/30 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-300">
                        {item.icon}
                      </span>

                      <span className="min-w-0 flex-1 truncate text-slate-300">
                        {item.label}
                      </span>

                      <b>{item.value}</b>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{
                          width: `${item.width}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* LAGGING */}
            <article
              id="lagging"
              className="rounded-[20px] border border-blue-500/20 bg-[#061524] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-black">
                    Lagging Indicators
                  </h2>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {isTurkish
                      ? "Sonuç göstergeleri"
                      : "Outcome Indicators"}
                  </p>
                </div>

                <span className="rounded-lg border border-blue-500/20 bg-blue-500/[0.07] px-2 py-1 text-[9px] font-black text-blue-300">
                  OSHA
                </span>
              </div>

              <div className="mt-4 divide-y divide-slate-800">
                {[
                  ["TRIR", trir === null ? "—" : trir.toFixed(2)],
                  ["DART", dart === null ? "—" : dart.toFixed(2)],
                  ["LTIFR", ltifr === null ? "—" : ltifr.toFixed(2)],
                  [
                    isTurkish ? "Şiddet Oranı" : "Severity Rate",
                    severityRate === null ? "—" : severityRate.toFixed(2),
                  ],
                  ["LTI", incidentMetrics ? incidentMetrics.lti : "—"],
                  [
                    isTurkish ? "Kayıt Edilebilir Vaka" : "Recordable Cases",
                    incidentMetrics ? incidentMetrics.recordable_cases : "—",
                  ],
                  [
                    isTurkish ? "İlk Yardım Vakası" : "First Aid Cases",
                    incidentMetrics ? incidentMetrics.first_aid : "—",
                  ],
                  [
                    isTurkish ? "Kayıp Gün" : "Lost Days",
                    incidentMetrics ? incidentMetrics.lost_days : "—",
                  ],
                  ["MTC", incidentMetrics ? incidentMetrics.medical_treatment : "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2.5"
                  >
                    <span className="text-xs text-slate-400">
                      {label}
                    </span>

                    <b className="text-sm">
                      {value}
                    </b>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[9px] leading-4 text-slate-600">
                {isTurkish
                  ? "OSHA oranları çalışma saati ve olay verisi girildiğinde otomatik hesaplanacaktır."
                  : "OSHA rates will calculate automatically once worked-hours and incident data are available."}
              </p>
            </article>

            {/* ACTION STATUS */}
            <article
              id="actions"
              className="rounded-[20px] border border-blue-500/20 bg-[#061524] p-5"
            >
              <h2 className="text-lg font-black">
                {isTurkish ? "Aksiyon Durumu" : "Action Status"}
              </h2>

              <p className="mt-1 text-[11px] text-slate-500">
                {isTurkish ? "Tüm aksiyonlar" : "All Corrective Actions"}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div
                  className="relative h-40 w-40 shrink-0 rounded-full"
                  style={{
                    background:
                      stats.open + stats.closed === 0
                        ? "#1e293b"
                        : `conic-gradient(
                            #10b981 0deg ${(stats.closed / Math.max(1, stats.open + stats.closed)) * 360}deg,
                            #2563eb ${(stats.closed / Math.max(1, stats.open + stats.closed)) * 360}deg 360deg
                          )`,
                  }}
                >
                  <div className="absolute inset-[21px] flex flex-col items-center justify-center rounded-full bg-[#07111f]">
                    <b className="text-2xl">
                      {stats.open + stats.closed}
                    </b>

                    <span className="text-[8px] uppercase text-slate-600">
                      {isTurkish ? "Toplam" : "Total"}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-emerald-300">
                      ● {isTurkish ? "Kapalı" : "Closed"}
                    </span>
                    <b>{stats.closed}</b>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-blue-300">
                      ● {isTurkish ? "Açık" : "Open"}
                    </span>
                    <b>{stats.open}</b>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-amber-300">
                      ● {isTurkish ? "Gecikmiş" : "Overdue"}
                    </span>
                    <b>{stats.overdue}</b>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-red-300">
                      ● {isTurkish ? "Kritik" : "Critical"}
                    </span>
                    <b>{stats.criticalOpen}</b>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
                <p className="text-[9px] uppercase tracking-wider text-slate-500">
                  {isTurkish ? "Kapanış Oranı" : "Closure Rate"}
                </p>

                <div className="mt-1 flex items-end justify-between">
                  <p className="text-2xl font-black text-emerald-300">
                    {stats.closureRate}%
                  </p>

                  <span className="text-[11px] text-slate-500">
                    {stats.closed}/{stats.open + stats.closed}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {visibleActions.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-[10px] font-bold text-slate-300">
                        {item.corrective_action || item.title}
                      </p>

                      <span
                        className={`text-[8px] font-black uppercase ${
                          item.risk_level === "critical"
                            ? "text-red-300"
                            : item.risk_level === "high"
                              ? "text-orange-300"
                              : "text-slate-400"
                        }`}
                      >
                        {item.risk_level}
                      </span>
                    </div>

                    {item.status !== "closed" && (
                      <button
                        type="button"
                        disabled={closingId === item.id}
                        onClick={() => closeAction(item)}
                        className="mt-2 text-[9px] font-black text-emerald-300"
                      >
                        {closingId === item.id
                          ? "..."
                          : isTurkish
                            ? "Aksiyonu Kapat →"
                            : "Close Action →"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </article>

            {/* INCIDENT */}
            <article className="rounded-[20px] border border-orange-500/20 bg-[#061524] p-5">
              <h2 className="text-lg font-black">
                {isTurkish ? "Olay İstatistikleri" : "Incident Statistics"}
              </h2>

              <p className="mt-1 text-[11px] text-slate-500">
                {isTurkish
                  ? "Aylık KPI veri modülü"
                  : "Monthly KPI Data Module"}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Near Miss", incidentMetrics ? incidentMetrics.near_miss : "—"],
                  ["LTI", incidentMetrics ? incidentMetrics.lti : "—"],
                  ["Recordable", incidentMetrics ? incidentMetrics.recordable_cases : "—"],
                  ["First Aid", incidentMetrics ? incidentMetrics.first_aid : "—"],
                  ["Lost Days", incidentMetrics ? incidentMetrics.lost_days : "—"],
                  ["MTC", incidentMetrics ? incidentMetrics.medical_treatment : "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5"
                  >
                    <p className="text-[11px] text-slate-500">
                      {label}
                    </p>

                    <p className="mt-1 text-xl font-black">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-orange-400/15 bg-orange-500/[0.04] p-3">
                <p className="text-[9px] leading-4 text-orange-200/70">
                  {isTurkish
                    ? "Aylık olay verileri Olay Yönetimi modülünden otomatik alınır."
                    : "Monthly incident data is loaded automatically from Incident Management."}
                </p>
              </div>
            </article>
          </section>

          {/* KPI PERFORMANCE TREND */}
          <section
            id="kpi-trend"
            className="mt-5 overflow-hidden rounded-[22px] border border-blue-500/20 bg-[#061524] p-5 sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-400">
                  SERNEM HSE ANALYTICS
                </p>

                <h2 className="mt-2 text-xl font-black">
                  {isTurkish
                    ? "HSE Performance Trendi"
                    : "HSE Performance Trend"}
                </h2>

                <p className="mt-1 text-[11px] text-slate-500">
                  {isTurkish
                    ? "TRIR, DART, LTIFR ve Şiddet Oranı — son 12 aylık gerçek KPI kayıtları"
                    : "TRIR, DART, LTIFR and Severity Rate — actual KPI records for the last 12 months"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-1.5 text-[9px] font-black text-slate-400">
                  {isTurkish
                    ? "SON 12 AY"
                    : "LAST 12 MONTHS"}
                </span>

                <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-[9px] font-black text-emerald-300">
                  {filters.project === "all"
                    ? isTurkish
                      ? "TÜM PROJELER"
                      : "ALL PROJECTS"
                    : filters.project}
                </span>
              </div>
            </div>

            {kpiTrendLoading ? (
              <div className="mt-6 flex h-[260px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/20 text-xs font-bold text-slate-500">
                {isTurkish
                  ? "KPI trendi yükleniyor..."
                  : "Loading KPI trend..."}
              </div>
            ) : (
              <>
                <div className="mt-6 overflow-x-auto">
                  <svg
                    viewBox="0 0 800 260"
                    className="h-[260px] min-w-[760px] w-full"
                    role="img"
                    aria-label="HSE KPI performance trend"
                  >
                    {[50, 90, 130, 170, 205].map(
                      (y) => (
                        <line
                          key={y}
                          x1="40"
                          y1={y}
                          x2="760"
                          y2={y}
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                      ),
                    )}

                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={kpiTrendPoints("trir")}
                    />

                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={kpiTrendPoints("dart")}
                    />

                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={kpiTrendPoints("ltifr")}
                    />

                    <polyline
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={kpiTrendPoints("severity")}
                    />

                    {kpiTrend.map(
                      (item, index) => {
                        const x =
                          40 +
                          index *
                            (720 /
                              Math.max(
                                1,
                                kpiTrend.length - 1,
                              ));

                        return (
                          <g key={item.key}>
                            <text
                              x={x}
                              y="238"
                              textAnchor="middle"
                              fill="#64748b"
                              fontSize="10"
                            >
                              {item.label}
                            </text>

                            <circle
                              cx={x}
                              cy={
                                205 -
                                (item.trir /
                                  kpiTrendMax) *
                                  155
                              }
                              r="4"
                              fill="#3b82f6"
                            />

                            <circle
                              cx={x}
                              cy={
                                205 -
                                (item.dart /
                                  kpiTrendMax) *
                                  155
                              }
                              r="3"
                              fill="#f59e0b"
                            />

                            <circle
                              cx={x}
                              cy={
                                205 -
                                (item.ltifr /
                                  kpiTrendMax) *
                                  155
                              }
                              r="3"
                              fill="#10b981"
                            />

                            <circle
                              cx={x}
                              cy={
                                205 -
                                (item.severity /
                                  kpiTrendMax) *
                                  155
                              }
                              r="3"
                              fill="#a855f7"
                            />
                          </g>
                        );
                      },
                    )}
                  </svg>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-800 pt-4 text-[10px] font-bold text-slate-400">
                  <span>
                    <b className="text-blue-400">●</b>{" "}
                    TRIR
                  </span>

                  <span>
                    <b className="text-amber-400">●</b>{" "}
                    DART
                  </span>

                  <span>
                    <b className="text-emerald-400">●</b>{" "}
                    LTIFR
                  </span>

                  <span>
                    <b className="text-purple-400">●</b>{" "}
                    {isTurkish
                      ? "Şiddet Oranı"
                      : "Severity Rate"}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      label: "TRIR",
                      value:
                        kpiTrend.at(-1)?.trir ?? 0,
                    },
                    {
                      label: "DART",
                      value:
                        kpiTrend.at(-1)?.dart ?? 0,
                    },
                    {
                      label: "LTIFR",
                      value:
                        kpiTrend.at(-1)?.ltifr ?? 0,
                    },
                    {
                      label: isTurkish
                        ? "Şiddet Oranı"
                        : "Severity Rate",
                      value:
                        kpiTrend.at(-1)?.severity ??
                        0,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-800 bg-slate-950/35 px-4 py-3"
                    >
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {item.value.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* SECONDARY */}
          <section
            id="trend"
            className="mt-5 grid gap-5 2xl:grid-cols-[1.15fr_.95fr_1fr]"
          >

            {/* TREND */}
            <article className="rounded-[20px] border border-blue-500/20 bg-[#061524] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black">
                    {isTurkish ? "Aylık Trend" : "Monthly Trend"}
                  </h2>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {isTurkish
                      ? "Gözlem ve aksiyon trendleri"
                      : "Observation and Action Trends"}
                  </p>
                </div>

                <span className="rounded-lg border border-slate-700 px-2 py-1 text-[9px] text-slate-400">
                  {isTurkish ? "Son 6 Ay" : "Last 6 Months"}
                </span>
              </div>

              <div className="mt-5">
                <svg
                  viewBox="0 0 600 230"
                  className="h-[230px] w-full"
                  role="img"
                  aria-label="Monthly HSE trend"
                >
                  {[40, 80, 120, 160, 200].map((y) => (
                    <line
                      key={y}
                      x1="20"
                      y1={y}
                      x2="580"
                      y2={y}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                  ))}

                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={monthlyTrend
                      .map((item, index) => {
                        const x =
                          35 +
                          index *
                            (530 /
                              Math.max(
                                1,
                                monthlyTrend.length - 1,
                              ));

                        const y =
                          200 -
                          (item.total /
                            Math.max(1, maxTrend)) *
                            145;

                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={monthlyTrend
                      .map((item, index) => {
                        const x =
                          35 +
                          index *
                            (530 /
                              Math.max(
                                1,
                                monthlyTrend.length - 1,
                              ));

                        const y =
                          200 -
                          (item.positive /
                            Math.max(1, maxTrend)) *
                            145;

                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={monthlyTrend
                      .map((item, index) => {
                        const x =
                          35 +
                          index *
                            (530 /
                              Math.max(
                                1,
                                monthlyTrend.length - 1,
                              ));

                        const y =
                          200 -
                          (item.unsafe /
                            Math.max(1, maxTrend)) *
                            145;

                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {monthlyTrend.map((item, index) => {
                    const x =
                      35 +
                      index *
                        (530 /
                          Math.max(
                            1,
                            monthlyTrend.length - 1,
                          ));

                    return (
                      <text
                        key={item.key}
                        x={x}
                        y="224"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="11"
                      >
                        {item.label}
                      </text>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-2 flex flex-wrap gap-4 text-[9px] text-slate-400">
                <span>
                  <b className="text-blue-400">●</b>{" "}
                  {isTurkish ? "Toplam Gözlem" : "Total"}
                </span>

                <span>
                  <b className="text-emerald-400">●</b>{" "}
                  {isTurkish ? "Pozitif Gözlem" : "Positive"}
                </span>

                <span>
                  <b className="text-amber-400">●</b>{" "}
                  {isTurkish ? "Güvensiz" : "Unsafe"}
                </span>
              </div>
            </article>

            {/* CATEGORY */}
            <article className="rounded-[20px] border border-blue-500/20 bg-[#061524] p-5">
              <h2 className="text-lg font-black">
                {isTurkish ? "Kategori Dağılımı" : "Category Distribution"}
              </h2>

              <p className="mt-1 text-[11px] text-slate-500">
                {isTurkish ? "Gözlem kategorileri" : "Observation Categories"}
              </p>

              <div className="mt-5 flex items-center gap-5">
                <div
                  className="relative h-40 w-40 shrink-0 rounded-full"
                  style={{
                    background:
                      stats.total === 0
                        ? "#1e293b"
                        : `conic-gradient(
                            #ef4444 0deg ${donut.actDeg}deg,
                            #10b981 ${donut.actDeg}deg 360deg
                          )`,
                  }}
                >
                  <div className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-[#07111f]">
                    <b className="text-2xl">
                      {stats.total}
                    </b>

                    <span className="text-[8px] uppercase text-slate-600">
                      {isTurkish ? "Gözlem" : "Observations"}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  {categoryData.slice(0, 5).map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 text-[10px]"
                    >
                      <span className="truncate text-slate-400">
                        <b
                          className={
                            index === 0
                              ? "text-red-400"
                              : index === 1
                                ? "text-blue-400"
                                : index === 2
                                  ? "text-amber-400"
                                  : "text-emerald-400"
                          }
                        >
                          ●
                        </b>{" "}
                        {item.name}
                      </span>

                      <b>{item.percentage}%</b>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* ACTIVITY */}
            <article className="rounded-[20px] border border-blue-500/20 bg-[#061524] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black">
                    {isTurkish ? "Son Aktiviteler" : "Recent Activity"}
                  </h2>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {isTurkish ? "Son saha kayıtları" : "Latest Field Records"}
                  </p>
                </div>

                <a
                  href={`/${locale}/hse-performance/observations`}
                  className="text-[10px] font-bold text-blue-300"
                >
                  {isTurkish ? "Tümünü Gör →" : "View All →"}
                </a>
              </div>

              <div className="mt-4 divide-y divide-slate-800">
                {filteredObservations.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/50 text-blue-300">
                      ◉
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-bold text-slate-300">
                        {item.title}
                      </p>

                      <p className="mt-1 truncate text-[9px] text-slate-600">
                        {item.category} • {item.company_name || "—"}
                      </p>
                    </div>

                    <span
                      className={`text-[8px] font-black uppercase ${
                        item.risk_level === "critical"
                          ? "text-red-300"
                          : item.risk_level === "high"
                            ? "text-orange-300"
                            : item.risk_level === "medium"
                              ? "text-amber-300"
                              : "text-emerald-300"
                      }`}
                    >
                      {item.risk_level}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          {/* OBJECTIVE BAR */}
          <section
            id="settings"
            className="mt-4 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-[#061524] via-[#071525] to-[#061524] p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-sm font-black">
                  {isTurkish ? "Hedeflerimiz" : "Our Objectives"}
                </h2>

                <p className="mt-1 text-[11px] text-slate-500">
                  {isTurkish
                    ? "Daha güvenli çalışma ortamları, sıfır önlenebilir olay ve sürdürülebilir gelişim."
                    : "Safer workplaces, zero preventable incidents and sustainable improvement."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowObservationForm(true)}
                className="rounded-xl bg-blue-600 px-5 py-3 text-xs font-black transition hover:bg-blue-500"
              >
                + {isTurkish ? "Yeni Gözlem" : "New Observation"}
              </button>
            </div>
          </section>

          {/* REPORT */}
          <div id="reports" className="mt-5">
            <HseReportingPanel
                locale={locale}
                observations={filteredObservations}
                incidentMetrics={incidentMetrics}
                selectedMonth={selectedMonth}
                selectedProject={filters.project}
                kpiValues={{
                  trir,
                  dart,
                  ltifr,
                  severityRate,
                }}
                kpiTrend={kpiTrend}
              />
          </div>
        </div>
      </div>

      {/* =====================================================
          OBSERVATION MODAL
      ===================================================== */}
      {showObservationForm && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[26px] border border-blue-400/20 bg-[#08111f] shadow-2xl shadow-black/60">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-[#08111f]/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-blue-400">
                  SERNEM HSE
                </p>

                <h2 className="mt-1 text-xl font-black">
                  {isTurkish ? "Yeni Gözlem Ekle" : "Add Observation"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowObservationForm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <input
                type="date"
                value={form.observation_date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    observation_date: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />

              <select
                value={form.risk_level}
                onChange={(e) =>
                  setForm({
                    ...form,
                    risk_level: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              >
                <option value="low">
                  {isTurkish ? "Düşük" : "Low"}
                </option>

                <option value="medium">
                  {isTurkish ? "Orta" : "Medium"}
                </option>

                <option value="high">
                  {isTurkish ? "Yüksek" : "High"}
                </option>

                <option value="critical">
                  {isTurkish ? "Kritik" : "Critical"}
                </option>
              </select>

              <input
                placeholder={isTurkish ? "Proje" : "Project"}
                value={form.project_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    project_name: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />

              <input
                placeholder={isTurkish ? "Firma" : "Company"}
                value={form.company_name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    company_name: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />

              <input
                placeholder={isTurkish ? "Lokasyon" : "Location"}
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />

              <select
                value={form.observation_type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    observation_type: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              >
                <option value="positive">
                  {isTurkish ? "Pozitif Gözlem" : "Positive"}
                </option>

                <option value="unsafe_act">
                  {isTurkish ? "Güvensiz Davranış" : "Unsafe Act"}
                </option>

                <option value="unsafe_condition">
                  {isTurkish ? "Güvensiz Durum" : "Unsafe Condition"}
                </option>
              </select>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm sm:col-span-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <input
                placeholder={isTurkish ? "Gözlem başlığı" : "Observation title"}
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm sm:col-span-2"
              />

              <textarea
                rows={3}
                placeholder={isTurkish ? "Açıklama" : "Description"}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm sm:col-span-2"
              />

              <textarea
                rows={2}
                placeholder={isTurkish ? "Alınacak aksiyon" : "Corrective action"}
                value={form.corrective_action}
                onChange={(e) =>
                  setForm({
                    ...form,
                    corrective_action: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm sm:col-span-2"
              />

              <input
                placeholder={isTurkish ? "Sorumlu kişi" : "Responsible person"}
                value={form.responsible_person}
                onChange={(e) =>
                  setForm({
                    ...form,
                    responsible_person: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />

              <input
                type="date"
                value={form.target_date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    target_date: e.target.value,
                  })
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />

              {message && (
                <p className="text-[13px] text-slate-400 sm:col-span-2">
                  {message}
                </p>
              )}

              <button
                type="button"
                onClick={saveObservation}
                disabled={saving}
                className="rounded-xl bg-blue-600 px-4 py-3 font-black transition hover:bg-blue-500 disabled:opacity-50 sm:col-span-2"
              >
                {saving
                  ? isTurkish
                    ? "Kaydediliyor..."
                    : "Saving..."
                  : isTurkish
                    ? "Gözlemi Kaydet"
                    : "Save Observation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
