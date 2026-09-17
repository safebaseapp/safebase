"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  calculateDART,
  calculateLTIFR,
  calculateSeverityRate,
  calculateTRIR,
} from "@/lib/hse-metrics";

import { createClient } from "@/utils/supabase/client";

type Locale = "tr" | "en";

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

type Observation = {
  id: string;
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
  corrective_action: string | null;
  responsible_person: string | null;
  target_date: string | null;
  status:
    | "open"
    | "in_progress"
    | "closed";
};

type TrendPoint = {
  key: string;
  label: string;
  trir: number;
  dart: number;
  ltifr: number;
  severity: number;
  hasData: boolean;
};

function getQuery() {
  const params =
    new URLSearchParams(
      window.location.search,
    );

  return {
    month:
      params.get("month") ||
      new Date()
        .toISOString()
        .slice(0, 7),

    project:
      params.get("project") ||
      "all",
  };
}

function monthLabel(
  key: string,
  locale: Locale,
) {
  const [year, month] =
    key.split("-").map(Number);

  return new Intl.DateTimeFormat(
    locale === "tr"
      ? "tr-TR"
      : "en-US",
    {
      month: "short",
    },
  ).format(
    new Date(
      year,
      month - 1,
      1,
    ),
  );
}

function pct(
  value: number,
  max: number,
) {
  if (!max) return 0;

  return Math.max(
    4,
    Math.min(
      100,
      (value / max) * 100,
    ),
  );
}

export default function HseDashboardPrintClient({
  locale,
}: {
  locale: Locale;
}) {
  const isTurkish =
    locale === "tr";

  const [loading, setLoading] =
    useState(true);

  const [month, setMonth] =
    useState("");

  const [project, setProject] =
    useState("all");

  const [metrics, setMetrics] =
    useState<IncidentMetrics | null>(
      null,
    );

  const [observations, setObservations] =
    useState<Observation[]>([]);

  const [trend, setTrend] =
    useState<TrendPoint[]>([]);

  const [autoPrintDone, setAutoPrintDone] =
    useState(false);

  useEffect(() => {
    const query = getQuery();

    setMonth(query.month);
    setProject(query.project);
  }, []);

  useEffect(() => {
    if (!month) return;

    let cancelled = false;

    async function load() {
      setLoading(true);

      const supabase =
        createClient();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const periodMonth =
        `${month}-01`;

      let metricQuery =
        supabase
          .from(
            "hse_incident_metrics",
          )
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
          .eq(
            "user_id",
            user.id,
          )
          .eq(
            "period_month",
            periodMonth,
          );

      if (project === "all") {
        metricQuery =
          metricQuery.eq(
            "project_name",
            "All Projects",
          );
      } else {
        metricQuery =
          metricQuery.eq(
            "project_name",
            project,
          );
      }

      const metricResult =
        await metricQuery.maybeSingle();

      const [year, monthNo] =
        month
          .split("-")
          .map(Number);

      const startDate =
        `${month}-01`;

      const nextMonth =
        new Date(
          year,
          monthNo,
          1,
        );

      const endDate =
        `${nextMonth.getFullYear()}-${String(
          nextMonth.getMonth() + 1,
        ).padStart(2, "0")}-01`;

      let obsQuery =
        supabase
          .from(
            "hse_observations",
          )
          .select(`
            id,
            observation_date,
            project_name,
            location,
            company_name,
            observation_type,
            category,
            risk_level,
            title,
            corrective_action,
            responsible_person,
            target_date,
            status
          `)
          .eq(
            "user_id",
            user.id,
          )
          .gte(
            "observation_date",
            startDate,
          )
          .lt(
            "observation_date",
            endDate,
          );

      if (project !== "all") {
        obsQuery =
          obsQuery.eq(
            "project_name",
            project,
          );
      }

      const obsResult =
        await obsQuery
          .order(
            "observation_date",
            {
              ascending: false,
            },
          );

      const trendStart =
        new Date(
          year,
          monthNo - 12,
          1,
        );

      const trendStartDate =
        `${trendStart.getFullYear()}-${String(
          trendStart.getMonth() + 1,
        ).padStart(2, "0")}-01`;

      let trendQuery =
        supabase
          .from(
            "hse_incident_metrics",
          )
          .select(`
            period_month,
            worked_hours,
            recordable_cases,
            dart_cases,
            lti,
            lost_days
          `)
          .eq(
            "user_id",
            user.id,
          )
          .gte(
            "period_month",
            trendStartDate,
          )
          .lte(
            "period_month",
            periodMonth,
          )
          .order(
            "period_month",
          );

      if (project === "all") {
        trendQuery =
          trendQuery.eq(
            "project_name",
            "All Projects",
          );
      } else {
        trendQuery =
          trendQuery.eq(
            "project_name",
            project,
          );
      }

      const trendResult =
        await trendQuery;

      if (cancelled) return;

      const m =
        metricResult.data;

      setMetrics(
        m
          ? {
              worked_hours:
                Number(
                  m.worked_hours ??
                    0,
                ),

              near_miss:
                Number(
                  m.near_miss ??
                    0,
                ),

              first_aid:
                Number(
                  m.first_aid ??
                    0,
                ),

              medical_treatment:
                Number(
                  m.medical_treatment ??
                    0,
                ),

              recordable_cases:
                Number(
                  m.recordable_cases ??
                    0,
                ),

              lti:
                Number(
                  m.lti ?? 0,
                ),

              lost_days:
                Number(
                  m.lost_days ??
                    0,
                ),

              dart_cases:
                Number(
                  m.dart_cases ??
                    0,
                ),

              inspection_count:
                Number(
                  m.inspection_count ??
                    0,
                ),

              toolbox_talk_count:
                Number(
                  m.toolbox_talk_count ??
                    0,
                ),

              training_hours:
                Number(
                  m.training_hours ??
                    0,
                ),

              management_walkdown_count:
                Number(
                  m.management_walkdown_count ??
                    0,
                ),
            }
          : null,
      );

      setObservations(
        (obsResult.data ??
          []) as Observation[],
      );

      const rows =
        trendResult.data ??
        [];

      const points: TrendPoint[] =
        [];

      for (
        let i = 11;
        i >= 0;
        i--
      ) {
        const d =
          new Date(
            year,
            monthNo - 1 - i,
            1,
          );

        const key =
          `${d.getFullYear()}-${String(
            d.getMonth() + 1,
          ).padStart(2, "0")}`;

        const row =
          rows.find(
            (item) =>
              String(
                item.period_month,
              ).slice(0, 7) ===
              key,
          );

        const workedHours =
          Number(
            row?.worked_hours ??
              0,
          );

        points.push({
          key,

          label:
            monthLabel(
              key,
              locale,
            ),

          trir: row
            ? calculateTRIR(
                Number(
                  row.recordable_cases ??
                    0,
                ),
                workedHours,
              )
            : 0,

          dart: row
            ? calculateDART(
                Number(
                  row.dart_cases ??
                    0,
                ),
                workedHours,
              )
            : 0,

          ltifr: row
            ? calculateLTIFR(
                Number(
                  row.lti ?? 0,
                ),
                workedHours,
              )
            : 0,

          severity: row
            ? calculateSeverityRate(
                Number(
                  row.lost_days ??
                    0,
                ),
                workedHours,
              )
            : 0,

          hasData:
            Boolean(row),
        });
      }

      setTrend(points);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [
    locale,
    month,
    project,
  ]);

  useEffect(() => {
    if (
      loading ||
      !metrics ||
      autoPrintDone
    ) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setAutoPrintDone(true);
        window.print();
      }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    loading,
    metrics,
    autoPrintDone,
  ]);

  const stats =
    useMemo(() => {
      const positive =
        observations.filter(
          (x) =>
            x.observation_type ===
            "positive",
        ).length;

      const unsafeAct =
        observations.filter(
          (x) =>
            x.observation_type ===
            "unsafe_act",
        ).length;

      const unsafeCondition =
        observations.filter(
          (x) =>
            x.observation_type ===
            "unsafe_condition",
        ).length;

      const open =
        observations.filter(
          (x) =>
            x.status !==
            "closed",
        );

      const closed =
        observations.filter(
          (x) =>
            x.status ===
            "closed",
        );

      const overdue =
        open.filter(
          (x) =>
            x.target_date &&
            new Date(
              x.target_date,
            ) <
              new Date(),
        );

      const category =
        new Map<
          string,
          number
        >();

      const responsible =
        new Map<
          string,
          number
        >();

      const location =
        new Map<
          string,
          number
        >();

      const company =
        new Map<
          string,
          number
        >();

      for (
        const item of
        observations
      ) {
        category.set(
          item.category,
          (category.get(
            item.category,
          ) ?? 0) + 1,
        );

        const resp =
          item.responsible_person?.trim() ||
          (isTurkish
            ? "Atanmamış"
            : "Unassigned");

        responsible.set(
          resp,
          (responsible.get(
            resp,
          ) ?? 0) + 1,
        );

        const loc =
          item.location?.trim() ||
          "—";

        location.set(
          loc,
          (location.get(
            loc,
          ) ?? 0) + 1,
        );

        const comp =
          item.company_name?.trim() ||
          "—";

        company.set(
          comp,
          (company.get(
            comp,
          ) ?? 0) + 1,
        );
      }

      const sort =
        (
          map: Map<
            string,
            number
          >,
        ) =>
          Array.from(
            map.entries(),
          )
            .map(
              ([
                name,
                value,
              ]) => ({
                name,
                value,
              }),
            )
            .sort(
              (a, b) =>
                b.value -
                a.value,
            );

      return {
        positive,
        unsafeAct,
        unsafeCondition,

        open:
          open.length,

        closed:
          closed.length,

        overdue:
          overdue.length,

        closure:
          open.length +
            closed.length ===
          0
            ? 0
            : Math.round(
                (closed.length /
                  (open.length +
                    closed.length)) *
                  100,
              ),

        openCritical:
          open.filter(
            (x) =>
              x.risk_level ===
              "critical",
          ).length,

        openHigh:
          open.filter(
            (x) =>
              x.risk_level ===
              "high",
          ).length,

        category:
          sort(category),

        responsible:
          sort(responsible),

        location:
          sort(location),

        company:
          sort(company),

        priority:
          open
            .sort(
              (a, b) => {
                const r = {
                  critical: 4,
                  high: 3,
                  medium: 2,
                  low: 1,
                };

                return (
                  r[
                    b.risk_level
                  ] -
                  r[
                    a.risk_level
                  ]
                );
              },
            )
            .slice(0, 7),
      };
    }, [
      observations,
      isTurkish,
    ]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 font-sans">
        <div className="rounded-2xl border bg-white px-8 py-6 shadow-sm">
          <p className="text-sm font-black text-slate-900">
            SERNEM
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {isTurkish
              ? "HSE dashboard hazırlanıyor..."
              : "Preparing HSE dashboard..."}
          </p>
        </div>
      </main>
    );
  }

  if (!metrics) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl border bg-white p-8">
          {isTurkish
            ? "Seçilen dönem için KPI kaydı bulunmuyor."
            : "No KPI record exists for the selected period."}
        </div>
      </main>
    );
  }

  const trir =
    calculateTRIR(
      metrics.recordable_cases,
      metrics.worked_hours,
    );

  const dart =
    calculateDART(
      metrics.dart_cases,
      metrics.worked_hours,
    );

  const ltifr =
    calculateLTIFR(
      metrics.lti,
      metrics.worked_hours,
    );

  const severity =
    calculateSeverityRate(
      metrics.lost_days,
      metrics.worked_hours,
    );

  const maxTrend =
    Math.max(
      1,
      ...trend.flatMap(
        (x) => [
          x.trir,
          x.dart,
          x.ltifr,
          x.severity,
        ],
      ),
    );

  function points(
    metric:
      | "trir"
      | "dart"
      | "ltifr"
      | "severity",
  ) {
    return trend
      .map(
        (
          item,
          index,
        ) => {
          const x =
            35 +
            index *
              (665 /
                Math.max(
                  1,
                  trend.length -
                    1,
                ));

          const y =
            165 -
            (item[metric] /
              maxTrend) *
              125;

          return `${x},${y}`;
        },
      )
      .join(" ");
  }

  const period =
    new Intl.DateTimeFormat(
      isTurkish
        ? "tr-TR"
        : "en-US",
      {
        month: "long",
        year: "numeric",
      },
    ).format(
      new Date(
        `${month}-01T00:00:00`,
      ),
    );

  const projectLabel =
    project === "all"
      ? isTurkish
        ? "Tüm Projeler"
        : "All Projects"
      : project;

  return (
    <main className="report-root bg-[#e9edf2] py-6 text-[#172033]">
      <div className="no-print mx-auto mb-4 flex w-[1120px] items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm">
        <div>
          <div className="text-sm font-black text-slate-900">
            SERNEM HSE Dashboard Report
          </div>

          <div className="mt-1 text-xs text-slate-500">
            {isTurkish
              ? "Yazdırma penceresi otomatik açılır. PDF olarak kaydedebilirsiniz."
              : "The print dialog opens automatically. Save as PDF when ready."}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              window.history.back()
            }
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800"
          >
            ←{" "}
            {isTurkish
              ? "Dashboard'a Dön"
              : "Back to Dashboard"}
          </button>

          <button
            type="button"
            onClick={() =>
              window.print()
            }
            className="rounded-xl bg-[#0b4ea2] px-6 py-3 text-sm font-black text-white"
          >
            {isTurkish
              ? "PDF'yi Tekrar Aç"
              : "Open PDF Again"}
          </button>
        </div>
      </div>

      {/* =====================================================
          PAGE 1
      ===================================================== */}

      <section className="print-page mx-auto flex h-[793px] w-[1120px] flex-col overflow-hidden bg-white shadow-2xl">
        <header className="flex h-[82px] shrink-0 items-center justify-between bg-[#071a33] px-8 text-white">
          <div>
            <div className="text-[30px] font-black tracking-[0.18em]">
              SERNEM
            </div>

            <div className="mt-1 text-[12px] font-black tracking-[0.12em] text-[#5ba9ff]">
              HSE MANAGEMENT DASHBOARD
            </div>
          </div>

          <div className="text-right">
            <div className="text-[15px] font-black uppercase">
              {period}
            </div>

            <div className="mt-1 text-[10px] text-slate-300">
              {projectLabel}
            </div>
          </div>
        </header>

        <div className="grid shrink-0 grid-cols-6 border-b border-slate-200">
          {[
            [
              isTurkish
                ? "ÇALIŞMA SAATİ"
                : "WORKED HOURS",
              metrics.worked_hours.toLocaleString(),
              "",
            ],
            [
              "RECORDABLE",
              metrics.recordable_cases,
              "",
            ],
            [
              "TRIR",
              trir.toFixed(2),
              "text-blue-600",
            ],
            [
              "LTIFR",
              ltifr.toFixed(2),
              "text-emerald-600",
            ],
            [
              "DART",
              dart.toFixed(2),
              "text-amber-600",
            ],
            [
              isTurkish
                ? "ŞİDDET"
                : "SEVERITY",
              severity.toFixed(2),
              "text-violet-600",
            ],
          ].map(
            ([
              label,
              value,
              tone,
            ]) => (
              <div
                key={String(
                  label,
                )}
                className="border-r border-slate-200 px-3 py-3 text-center last:border-r-0"
              >
                <div className="text-[8px] font-black tracking-wider text-slate-500">
                  {label}
                </div>

                <div
                  className={`mt-1 text-[24px] font-black ${tone}`}
                >
                  {value}
                </div>
              </div>
            ),
          )}
        </div>

        <div className="grid flex-1 grid-cols-[245px_1fr_290px] gap-3 p-4 pb-2">
          {/* ACTION STATUS */}

          <article className="dashboard-panel">
            <h2 className="panel-heading">
              {isTurkish
                ? "AKSİYON DURUMU"
                : "ACTION STATUS"}
            </h2>

            <div className="flex h-[180px] items-center justify-center">
              <div
                className="relative h-[150px] w-[150px] rounded-full"
                style={{
                  background:
                    stats.open +
                      stats.closed ===
                    0
                      ? "#e2e8f0"
                      : `conic-gradient(
                          #10b981 0deg ${
                            (stats.closed /
                              Math.max(
                                1,
                                stats.open +
                                  stats.closed,
                              )) *
                            360
                          }deg,
                          #ef4444 ${
                            (stats.closed /
                              Math.max(
                                1,
                                stats.open +
                                  stats.closed,
                              )) *
                            360
                          }deg 360deg
                        )`,
                }}
              >
                <div className="absolute inset-[24px] flex flex-col items-center justify-center rounded-full bg-white">
                  <b className="text-[34px]">
                    {stats.open +
                      stats.closed}
                  </b>

                  <span className="text-[8px] font-black text-slate-400">
                    TOTAL
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="status-chip text-emerald-700">
                ●{" "}
                {isTurkish
                  ? "Kapalı"
                  : "Closed"}{" "}
                {stats.closed}
              </div>

              <div className="status-chip text-red-600">
                ●{" "}
                {isTurkish
                  ? "Açık"
                  : "Open"}{" "}
                {stats.open}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 border border-slate-200">
              <div className="p-3 text-center">
                <div className="tiny-label">
                  {isTurkish
                    ? "GECİKMİŞ"
                    : "OVERDUE"}
                </div>

                <b className="mt-1 block text-[22px] text-red-600">
                  {stats.overdue}
                </b>
              </div>

              <div className="border-l border-slate-200 p-3 text-center">
                <div className="tiny-label">
                  {isTurkish
                    ? "KAPANMA"
                    : "CLOSURE"}
                </div>

                <b className="mt-1 block text-[22px] text-emerald-600">
                  {stats.closure}%
                </b>
              </div>
            </div>
          </article>

          {/* TREND */}

          <article className="dashboard-panel">
            <h2 className="panel-heading">
              {isTurkish
                ? "12 AYLIK KPI TRENDİ"
                : "12-MONTH KPI TREND"}
            </h2>

            <svg
              viewBox="0 0 735 205"
              className="mt-2 h-[205px] w-full"
            >
              {[40, 80, 120, 165].map(
                (y) => (
                  <line
                    key={y}
                    x1="35"
                    y1={y}
                    x2="700"
                    y2={y}
                    stroke="#e2e8f0"
                  />
                ),
              )}

              <polyline
                points={points(
                  "trir",
                )}
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
              />

              <polyline
                points={points(
                  "dart",
                )}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              <polyline
                points={points(
                  "ltifr",
                )}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
              />

              <polyline
                points={points(
                  "severity",
                )}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="3"
              />

              {trend.map(
                (
                  item,
                  index,
                ) => {
                  const x =
                    35 +
                    index *
                      (665 /
                        Math.max(
                          1,
                          trend.length -
                            1,
                        ));

                  return (
                    <text
                      key={
                        item.key
                      }
                      x={x}
                      y="193"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#64748b"
                    >
                      {
                        item.label
                      }
                    </text>
                  );
                },
              )}
            </svg>

            <div className="mt-1 flex justify-center gap-7 text-[9px] font-black">
              <span className="text-blue-600">
                ● TRIR
              </span>

              <span className="text-amber-600">
                ● DART
              </span>

              <span className="text-emerald-600">
                ● LTIFR
              </span>

              <span className="text-violet-600">
                ●{" "}
                {isTurkish
                  ? "Şiddet"
                  : "Severity"}
              </span>
            </div>
          </article>

          {/* PYRAMID */}

          <article className="dashboard-panel">
            <h2 className="panel-heading">
              {isTurkish
                ? "OLAY PİRAMİDİ"
                : "INCIDENT PYRAMID"}
            </h2>

            <div className="mt-3 flex flex-col items-center gap-[4px]">
              {[
                [
                  "FATALITY",
                  0,
                  "bg-red-600",
                  "w-[92px]",
                ],

                [
                  "LTI",
                  metrics.lti,
                  "bg-orange-600",
                  "w-[120px]",
                ],

                [
                  "MTC",
                  metrics.medical_treatment,
                  "bg-amber-500",
                  "w-[150px]",
                ],

                [
                  "FIRST AID",
                  metrics.first_aid,
                  "bg-yellow-500",
                  "w-[180px]",
                ],

                [
                  "NEAR MISS",
                  metrics.near_miss,
                  "bg-green-500",
                  "w-[210px]",
                ],

                [
                  "UNSAFE CONDITIONS",
                  stats.unsafeCondition,
                  "bg-emerald-600",
                  "w-[240px]",
                ],

                [
                  "UNSAFE ACTS",
                  stats.unsafeAct,
                  "bg-emerald-400",
                  "w-[268px]",
                ],
              ].map(
                ([
                  label,
                  value,
                  bg,
                  width,
                ]) => (
                  <div
                    key={String(
                      label,
                    )}
                    className={`${bg} ${width} flex h-[31px] items-center justify-between px-4 text-[9px] font-black text-white shadow-sm`}
                  >
                    <span>
                      {label}
                    </span>

                    <span>
                      {value}
                    </span>
                  </div>
                ),
              )}
            </div>
          </article>
        </div>

        <div className="grid h-[275px] shrink-0 grid-cols-[1.1fr_.8fr_1fr] gap-3 px-4 pb-4">
          <BreakdownPanel
            title={
              isTurkish
                ? "KATEGORİ DAĞILIMI"
                : "CATEGORY BREAKDOWN"
            }
            data={stats.category.slice(
              0,
              6,
            )}
            tone="blue"
          />

          <article className="dashboard-panel">
            <h2 className="panel-heading">
              {isTurkish
                ? "GÖZLEM TİPİ"
                : "OBSERVATION TYPE"}
            </h2>

            <div className="mt-4 flex items-center justify-center">
              <div
                className="relative h-[150px] w-[150px] rounded-full"
                style={{
                  background: `conic-gradient(
                    #10b981 0deg ${
                      observations.length
                        ? (stats.positive /
                            observations.length) *
                          360
                        : 0
                    }deg,
                    #f59e0b ${
                      observations.length
                        ? (stats.positive /
                            observations.length) *
                          360
                        : 0
                    }deg ${
                      observations.length
                        ? ((stats.positive +
                            stats.unsafeAct) /
                            observations.length) *
                          360
                        : 0
                    }deg,
                    #ef4444 ${
                      observations.length
                        ? ((stats.positive +
                            stats.unsafeAct) /
                            observations.length) *
                          360
                        : 0
                    }deg 360deg
                  )`,
                }}
              >
                <div className="absolute inset-[25px] flex flex-col items-center justify-center rounded-full bg-white">
                  <b className="text-[32px]">
                    {
                      observations.length
                    }
                  </b>

                  <span className="tiny-label">
                    OBS
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4 text-[8px] font-black">
              <span className="text-emerald-600">
                ● P{" "}
                {stats.positive}
              </span>

              <span className="text-amber-600">
                ● UA{" "}
                {stats.unsafeAct}
              </span>

              <span className="text-red-600">
                ● UC{" "}
                {
                  stats.unsafeCondition
                }
              </span>
            </div>
          </article>

          <article className="dashboard-panel">
            <h2 className="panel-heading">
              {isTurkish
                ? "ÖNCÜ GÖSTERGELER"
                : "LEADING INDICATORS"}
            </h2>

            <div className="mt-3 divide-y divide-slate-200 border border-slate-200">
              {[
                [
                  isTurkish
                    ? "İnceleme"
                    : "Inspections",
                  metrics.inspection_count,
                ],

                [
                  "Toolbox Talk",
                  metrics.toolbox_talk_count,
                ],

                [
                  isTurkish
                    ? "Eğitim Saati"
                    : "Training Hours",
                  metrics.training_hours,
                ],

                [
                  isTurkish
                    ? "Yönetim Walkdown"
                    : "Management Walkdown",
                  metrics.management_walkdown_count,
                ],
              ].map(
                ([
                  label,
                  value,
                ]) => (
                  <div
                    key={String(
                      label,
                    )}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-[10px] text-slate-600">
                      {label}
                    </span>

                    <b className="text-[16px]">
                      {value}
                    </b>
                  </div>
                ),
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <StatusBox
                label={
                  isTurkish
                    ? "AÇIK KRİTİK"
                    : "OPEN CRITICAL"
                }
                value={
                  stats.openCritical
                }
                tone="red"
              />

              <StatusBox
                label={
                  isTurkish
                    ? "AÇIK YÜKSEK"
                    : "OPEN HIGH"
                }
                value={
                  stats.openHigh
                }
                tone="amber"
              />
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          PAGE 2
      ===================================================== */}

      <section className="print-page mx-auto mt-6 flex h-[793px] w-[1120px] flex-col overflow-hidden bg-white shadow-2xl">
        <header className="flex h-[82px] shrink-0 items-center justify-between bg-[#071a33] px-8 text-white">
          <div>
            <div className="text-[30px] font-black tracking-[0.18em]">
              SERNEM
            </div>

            <div className="mt-1 text-[12px] font-black tracking-[0.12em] text-[#5ba9ff]">
              ACTION & OBSERVATION ANALYTICS
            </div>
          </div>

          <div className="text-right">
            <div className="text-[15px] font-black uppercase">
              {period}
            </div>

            <div className="mt-1 text-[10px] text-slate-300">
              {projectLabel}
            </div>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-2 gap-3 p-4">
          <BreakdownPanel
            title={
              isTurkish
                ? "AKSİYON SORUMLUSU DAĞILIMI"
                : "ACTION RESPONSIBLE BREAKDOWN"
            }
            data={stats.responsible.slice(
              0,
              8,
            )}
            tone="green"
            large
          />

          <div className="grid grid-cols-2 gap-3">
            <BreakdownPanel
              title={
                isTurkish
                  ? "LOKASYON DAĞILIMI"
                  : "LOCATION BREAKDOWN"
              }
              data={stats.location.slice(
                0,
                6,
              )}
              tone="blue"
            />

            <BreakdownPanel
              title={
                isTurkish
                  ? "ŞİRKET DAĞILIMI"
                  : "COMPANY BREAKDOWN"
              }
              data={stats.company.slice(
                0,
                6,
              )}
              tone="violet"
            />

            <article className="dashboard-panel">
              <h2 className="panel-heading">
                {isTurkish
                  ? "AKSİYON KAPANIŞI"
                  : "ACTION CLOSURE"}
              </h2>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <StatusBox
                  label={
                    isTurkish
                      ? "AÇIK"
                      : "OPEN"
                  }
                  value={
                    stats.open
                  }
                  tone="red"
                />

                <StatusBox
                  label={
                    isTurkish
                      ? "GECİKMİŞ"
                      : "OVERDUE"
                  }
                  value={
                    stats.overdue
                  }
                  tone="amber"
                />

                <StatusBox
                  label={
                    isTurkish
                      ? "KAPALI"
                      : "CLOSED"
                  }
                  value={
                    stats.closed
                  }
                  tone="green"
                />
              </div>
            </article>

            <article className="dashboard-panel">
              <h2 className="panel-heading">
                {isTurkish
                  ? "OLAY İSTATİSTİKLERİ"
                  : "INCIDENT STATISTICS"}
              </h2>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  [
                    "Recordable",
                    metrics.recordable_cases,
                  ],
                  [
                    "LTI",
                    metrics.lti,
                  ],
                  [
                    "Lost Days",
                    metrics.lost_days,
                  ],
                  [
                    "Near Miss",
                    metrics.near_miss,
                  ],
                  [
                    "First Aid",
                    metrics.first_aid,
                  ],
                  [
                    "MTC",
                    metrics.medical_treatment,
                  ],
                ].map(
                  ([
                    label,
                    value,
                  ]) => (
                    <div
                      key={String(
                        label,
                      )}
                      className="border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <div className="tiny-label">
                        {label}
                      </div>

                      <b className="mt-1 block text-center text-[20px]">
                        {value}
                      </b>
                    </div>
                  ),
                )}
              </div>
            </article>
          </div>

          <BreakdownPanel
            title={
              isTurkish
                ? "NEGATİF GÖZLEM KIRILIMI"
                : "NEGATIVE OBSERVATION BREAKDOWN"
            }
            data={stats.category
              .filter(
                (category) =>
                  observations.some(
                    (x) =>
                      x.category ===
                        category.name &&
                      x.observation_type !==
                        "positive",
                  ),
              )
              .slice(0, 7)}
            tone="red"
          />

          <article className="dashboard-panel">
            <h2 className="panel-heading">
              {isTurkish
                ? "ÖNCELİKLİ AÇIK AKSİYONLAR"
                : "PRIORITY OPEN ACTIONS"}
            </h2>

            <div className="mt-3 overflow-hidden border border-slate-200">
              <div className="grid grid-cols-[1fr_80px_150px_100px] bg-[#0f2746] px-3 py-2 text-[8px] font-black text-white">
                <span>
                  {isTurkish
                    ? "Bulgu"
                    : "Finding"}
                </span>

                <span>
                  Risk
                </span>

                <span>
                  {isTurkish
                    ? "Sorumlu"
                    : "Responsible"}
                </span>

                <span>
                  {isTurkish
                    ? "Hedef"
                    : "Due"}
                </span>
              </div>

              {stats.priority.length ? (
                stats.priority.map(
                  (
                    item,
                    index,
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className={`grid grid-cols-[1fr_80px_150px_100px] px-3 py-2 text-[9px] ${
                        index % 2
                          ? "bg-slate-50"
                          : "bg-white"
                      }`}
                    >
                      <span className="truncate font-bold">
                        {
                          item.title
                        }
                      </span>

                      <span className="uppercase">
                        {
                          item.risk_level
                        }
                      </span>

                      <span className="truncate">
                        {item.responsible_person ||
                          "—"}
                      </span>

                      <span>
                        {item.target_date ||
                          "—"}
                      </span>
                    </div>
                  ),
                )
              ) : (
                <div className="p-5 text-center text-[10px] text-slate-500">
                  {isTurkish
                    ? "Açık aksiyon bulunmuyor."
                    : "No open actions."}
                </div>
              )}
            </div>
          </article>
        </div>

        <footer className="grid shrink-0 grid-cols-4 border-t border-slate-300 bg-slate-50 text-[8px]">
          {[
            [
              isTurkish
                ? "HAZIRLAYAN"
                : "PREPARED BY",
              "—",
            ],

            [
              isTurkish
                ? "KONTROL EDEN"
                : "REVIEWED BY",
              "—",
            ],

            [
              isTurkish
                ? "ONAYLAYAN"
                : "APPROVED BY",
              "—",
            ],

            [
              "REV.",
              "00",
            ],
          ].map(
            ([
              label,
              value,
            ]) => (
              <div
                key={label}
                className="border-r border-slate-300 px-4 py-3 last:border-r-0"
              >
                <div className="font-black text-slate-500">
                  {label}
                </div>

                <div className="mt-1 font-bold">
                  {value}
                </div>
              </div>
            ),
          )}
        </footer>
      </section>

      <style jsx global>{`
        .dashboard-panel {
          border: 1px solid #dbe4ed;
          background: #ffffff;
          padding: 14px;
          overflow: hidden;
        }

        .panel-heading {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #172b45;
        }

        .tiny-label {
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #64748b;
          text-align: center;
        }

        .status-chip {
          border: 1px solid #e2e8f0;
          padding: 8px 10px;
          text-align: center;
          font-weight: 800;
        }

        @page {
          size: A4 landscape;
          margin: 0;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .report-root {
            background: white !important;
            padding: 0 !important;
          }

          .print-page {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            page-break-after: always;
            break-after: page;
          }

          .print-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }
        }
      `}</style>
    </main>
  );
}

function StatusBox({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone:
    | "red"
    | "amber"
    | "green";
}) {
  const toneClass =
    tone === "red"
      ? "text-red-600"
      : tone === "amber"
        ? "text-amber-600"
        : "text-emerald-600";

  return (
    <div className="border border-slate-200 bg-slate-50 px-3 py-3 text-center">
      <div className="tiny-label">
        {label}
      </div>

      <b
        className={`mt-1 block text-[24px] ${toneClass}`}
      >
        {value}
      </b>
    </div>
  );
}

function BreakdownPanel({
  title,
  data,
  tone,
  large = false,
}: {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  tone:
    | "blue"
    | "green"
    | "red"
    | "violet";
  large?: boolean;
}) {
  const max =
    Math.max(
      1,
      ...data.map(
        (x) => x.value,
      ),
    );

  const toneClass =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "red"
        ? "bg-red-500"
        : tone === "violet"
          ? "bg-violet-500"
          : "bg-blue-600";

  return (
    <article className="dashboard-panel">
      <h2 className="panel-heading">
        {title}
      </h2>

      <div
        className={`mt-4 ${
          large
            ? "space-y-4"
            : "space-y-3"
        }`}
      >
        {data.length ? (
          data.map(
            (item) => (
              <div
                key={
                  item.name
                }
                className="grid grid-cols-[125px_1fr_28px] items-center gap-2"
              >
                <div className="truncate text-[9px] font-bold text-slate-600">
                  {item.name}
                </div>

                <div className="h-[13px] overflow-hidden bg-slate-200">
                  <div
                    className={`h-full ${toneClass}`}
                    style={{
                      width:
                        `${pct(
                          item.value,
                          max,
                        )}%`,
                    }}
                  />
                </div>

                <b className="text-right text-[9px]">
                  {item.value}
                </b>
              </div>
            ),
          )
        ) : (
          <div className="py-8 text-center text-[9px] text-slate-400">
            —
          </div>
        )}
      </div>
    </article>
  );
}
