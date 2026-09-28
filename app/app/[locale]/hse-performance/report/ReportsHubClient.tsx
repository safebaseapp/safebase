"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  calculateLTIFR,
  calculateSeverityRate,
  calculateTRIR,
} from "@/lib/hse-metrics";

type Locale = "tr" | "en";
type Props = { locale: Locale; userId: string };
type RangeKey = "month" | "30d" | "3m" | "year" | "custom";

type MetricRow = {
  period_month: string;
  project_name: string | null;
  worked_hours: number | null;
  near_miss: number | null;
  first_aid: number | null;
  medical_treatment: number | null;
  recordable_cases: number | null;
  lti: number | null;
  lost_days: number | null;
};

type ObservationRow = {
  id: string;
  observation_date: string;
  project_name: string | null;
  status: string;
  risk_level: string;
  title: string;
};

function iso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function rangeDates(range: RangeKey, customStart: string, customEnd: string) {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let start = new Date(end);

  if (range === "month") start = new Date(now.getFullYear(), now.getMonth(), 1);
  if (range === "30d") start.setDate(start.getDate() - 29);
  if (range === "3m") start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  if (range === "year") start = new Date(now.getFullYear(), 0, 1);
  if (range === "custom") {
    return {
      start: customStart || iso(new Date(now.getFullYear(), now.getMonth(), 1)),
      end: customEnd || iso(end),
    };
  }
  return { start: iso(start), end: iso(end) };
}

function formatMetric(value: number) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

export default function ReportsHubClient({ locale, userId }: Props) {
  const isTurkish = locale === "tr";
  const [range, setRange] = useState<RangeKey>("month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [project, setProject] = useState("all");
  const [projectOptions, setProjectOptions] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<MetricRow[]>([]);
  const [observations, setObservations] = useState<ObservationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const dates = useMemo(() => rangeDates(range, customStart, customEnd), [range, customStart, customEnd]);

  useEffect(() => {
    let cancelled = false;
    async function loadProjects() {
      const supabase = createClient();
      const [{ data: metricProjects }, { data: observationProjects }] = await Promise.all([
        supabase.from("hse_incident_metrics").select("project_name").eq("user_id", userId),
        supabase.from("hse_observations").select("project_name").eq("user_id", userId),
      ]);
      if (cancelled) return;
      const values = [...(metricProjects ?? []), ...(observationProjects ?? [])]
        .map((item) => item.project_name?.trim())
        .filter((value): value is string => Boolean(value) && value !== "All Projects");
      setProjectOptions(Array.from(new Set(values)).sort());
    }
    void loadProjects();
    return () => { cancelled = true; };
  }, [userId]);

  useEffect(() => {
    let cancelled = false;
    async function loadReport() {
      setLoading(true);
      const supabase = createClient();
      const startMonth = `${dates.start.slice(0, 7)}-01`;
      const endMonth = `${dates.end.slice(0, 7)}-01`;

      let metricsQuery = supabase
        .from("hse_incident_metrics")
        .select("period_month,project_name,worked_hours,near_miss,first_aid,medical_treatment,recordable_cases,lti,lost_days")
        .eq("user_id", userId)
        .gte("period_month", startMonth)
        .lte("period_month", endMonth)
        .order("period_month", { ascending: true });

      metricsQuery = project === "all"
        ? metricsQuery.eq("project_name", "All Projects")
        : metricsQuery.eq("project_name", project);

      let observationQuery = supabase
        .from("hse_observations")
        .select("id,observation_date,project_name,status,risk_level,title")
        .eq("user_id", userId)
        .gte("observation_date", dates.start)
        .lte("observation_date", dates.end)
        .order("observation_date", { ascending: false });

      if (project !== "all") observationQuery = observationQuery.eq("project_name", project);

      const [{ data: metricData }, { data: observationData }] = await Promise.all([metricsQuery, observationQuery]);
      if (cancelled) return;
      setMetrics((metricData ?? []) as MetricRow[]);
      setObservations((observationData ?? []) as ObservationRow[]);
      setLoading(false);
    }
    void loadReport();
    return () => { cancelled = true; };
  }, [userId, project, dates.start, dates.end]);

  const totals = useMemo(() => {
    return metrics.reduce(
      (acc, item) => ({
        workedHours: acc.workedHours + Number(item.worked_hours ?? 0),
        nearMiss: acc.nearMiss + Number(item.near_miss ?? 0),
        firstAid: acc.firstAid + Number(item.first_aid ?? 0),
        medicalTreatment: acc.medicalTreatment + Number(item.medical_treatment ?? 0),
        recordable: acc.recordable + Number(item.recordable_cases ?? 0),
        lti: acc.lti + Number(item.lti ?? 0),
        lostDays: acc.lostDays + Number(item.lost_days ?? 0),
      }),
      { workedHours: 0, nearMiss: 0, firstAid: 0, medicalTreatment: 0, recordable: 0, lti: 0, lostDays: 0 },
    );
  }, [metrics]);

  const openActions = observations.filter((item) => item.status !== "closed").length;
  const closedActions = observations.filter((item) => item.status === "closed").length;
  const criticalOpen = observations.filter((item) => item.status !== "closed" && item.risk_level === "critical").length;
  const closureRate = observations.length ? Math.round((closedActions / observations.length) * 100) : 0;
  const trir = calculateTRIR(totals.recordable, totals.workedHours);
  const ltifr = calculateLTIFR(totals.lti, totals.workedHours);
  const severity = calculateSeverityRate(totals.lostDays, totals.workedHours);

  function exportCsv() {
    const rows = [
      ["Metric", "Value"],
      ["Period Start", dates.start],
      ["Period End", dates.end],
      ["Project", project === "all" ? "All Projects" : project],
      ["Worked Hours", totals.workedHours],
      ["TRIR", formatMetric(trir)],
      ["LTIFR", formatMetric(ltifr)],
      ["Severity Rate", formatMetric(severity)],
      ["Near Miss", totals.nearMiss],
      ["Recordable", totals.recordable],
      ["LTI", totals.lti],
      ["Lost Days", totals.lostDays],
      ["Observations", observations.length],
      ["Open Actions", openActions],
      ["Closed Actions", closedActions],
      ["Critical Open", criticalOpen],
      ["Closure Rate", `${closureRate}%`],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `sernem-hse-report-${dates.start}-${dates.end}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const presets: Array<[RangeKey, string]> = [
    ["month", isTurkish ? "Bu Ay" : "This Month"],
    ["30d", isTurkish ? "Son 30 Gün" : "Last 30 Days"],
    ["3m", isTurkish ? "Son 3 Ay" : "Last 3 Months"],
    ["year", isTurkish ? "Bu Yıl" : "This Year"],
    ["custom", isTurkish ? "Özel Tarih" : "Custom"],
  ];

  return (
    <main className="min-h-screen bg-[#020817] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">SERNEM REPORTING</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{isTurkish ? "HSE Raporları" : "HSE Reports"}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">{isTurkish ? "Dönem ve proje seçin; KPI, saha aksiyonları ve olay verilerini tek raporda inceleyin." : "Choose a period and project to review KPI, field actions and incident data in one report."}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportCsv} className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-2.5 text-xs font-black text-emerald-300">{isTurkish ? "Excel / CSV İndir" : "Export Excel / CSV"}</button>
            <Link href={`/${locale}/hse-performance/report/print?start=${dates.start}&end=${dates.end}&project=${encodeURIComponent(project)}`} className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-black text-white">{isTurkish ? "PDF Raporu Aç" : "Open PDF Report"}</Link>
          </div>
        </div>

        <section className="mt-6 rounded-[24px] border border-slate-800 bg-[#071423] p-4">
          <div className="flex flex-wrap items-center gap-2">
            {presets.map(([key, label]) => (
              <button key={key} onClick={() => setRange(key)} className={`rounded-xl border px-3 py-2 text-xs font-black transition ${range === key ? "border-blue-400/30 bg-blue-600 text-white" : "border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white"}`}>{label}</button>
            ))}
            <select value={project} onChange={(event) => setProject(event.target.value)} className="ml-0 min-w-[180px] rounded-xl border border-slate-700 bg-[#07111f] px-3 py-2 text-xs font-black text-slate-200 outline-none sm:ml-auto">
              <option value="all">{isTurkish ? "Tüm Projeler" : "All Projects"}</option>
              {projectOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          {range === "custom" && (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <input type="date" value={customStart} onChange={(event) => setCustomStart(event.target.value)} className="rounded-xl border border-slate-700 bg-[#07111f] px-3 py-2.5 text-xs font-bold text-slate-200" />
              <input type="date" value={customEnd} onChange={(event) => setCustomEnd(event.target.value)} className="rounded-xl border border-slate-700 bg-[#07111f] px-3 py-2.5 text-xs font-bold text-slate-200" />
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold text-slate-500">
            <span className="rounded-full border border-slate-800 bg-slate-950/40 px-2.5 py-1">{dates.start} → {dates.end}</span>
            <span className="rounded-full border border-slate-800 bg-slate-950/40 px-2.5 py-1">{project === "all" ? (isTurkish ? "Tüm Projeler" : "All Projects") : project}</span>
          </div>
        </section>

        {loading ? (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-[#071423] p-10 text-center text-sm text-slate-500">{isTurkish ? "Rapor hazırlanıyor…" : "Preparing report…"}</div>
        ) : (
          <>
            <section className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {[
                [isTurkish ? "Çalışılan Saat" : "Worked Hours", new Intl.NumberFormat(isTurkish ? "tr-TR" : "en-GB").format(totals.workedHours), "WH"],
                ["TRIR", formatMetric(trir), "TR"],
                ["LTIFR", formatMetric(ltifr), "LT"],
                ["Severity", formatMetric(severity), "SR"],
              ].map(([label, value, code]) => (
                <article key={label} className="rounded-2xl border border-slate-800 bg-[#071423] p-4">
                  <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold text-slate-500">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div><span className="rounded-lg border border-blue-500/20 bg-blue-500/[0.08] px-2 py-1.5 text-[9px] font-black text-blue-300">{code}</span></div>
                </article>
              ))}
            </section>

            <section className="mt-4 grid gap-4 lg:grid-cols-2">
              <article className="rounded-[24px] border border-slate-800 bg-[#071423] p-5">
                <h2 className="font-black">{isTurkish ? "Aksiyon Özeti" : "Action Summary"}</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-amber-400/15 bg-amber-500/[0.05] p-4"><p className="text-[10px] text-slate-500">{isTurkish ? "Açık" : "Open"}</p><p className="mt-1 text-3xl font-black text-amber-200">{openActions}</p></div>
                  <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.05] p-4"><p className="text-[10px] text-slate-500">{isTurkish ? "Kapalı" : "Closed"}</p><p className="mt-1 text-3xl font-black text-emerald-200">{closedActions}</p></div>
                  <div className="rounded-2xl border border-red-400/15 bg-red-500/[0.05] p-4"><p className="text-[10px] text-slate-500">{isTurkish ? "Kritik Açık" : "Critical Open"}</p><p className="mt-1 text-3xl font-black text-red-200">{criticalOpen}</p></div>
                  <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/[0.05] p-4"><p className="text-[10px] text-slate-500">{isTurkish ? "Kapanış Oranı" : "Closure Rate"}</p><p className="mt-1 text-3xl font-black text-cyan-200">{closureRate}%</p></div>
                </div>
              </article>

              <article className="rounded-[24px] border border-slate-800 bg-[#071423] p-5">
                <h2 className="font-black">{isTurkish ? "Olay İstatistikleri" : "Incident Statistics"}</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Near Miss", totals.nearMiss],
                    ["LTI", totals.lti],
                    ["Recordable", totals.recordable],
                    ["First Aid", totals.firstAid],
                    ["Lost Days", totals.lostDays],
                    ["MTC", totals.medicalTreatment],
                  ].map(([label, value]) => <div key={String(label)} className="rounded-xl border border-slate-800 bg-slate-950/35 p-3"><p className="text-[10px] text-slate-500">{label}</p><p className="mt-1 text-xl font-black">{value}</p></div>)}
                </div>
              </article>
            </section>

            <section className="mt-4 rounded-[24px] border border-slate-800 bg-[#071423] p-5">
              <div className="flex items-center justify-between"><div><h2 className="font-black">{isTurkish ? "Son Saha Kayıtları" : "Recent Field Records"}</h2><p className="text-[10px] text-slate-600">{observations.length} {isTurkish ? "kayıt" : "records"}</p></div></div>
              <div className="mt-3 divide-y divide-slate-800/80">
                {observations.slice(0, 8).map((item) => <div key={item.id} className="flex items-center gap-3 py-3"><span className={`h-2.5 w-2.5 rounded-full ${item.risk_level === "critical" ? "bg-red-400" : item.risk_level === "high" ? "bg-amber-400" : "bg-blue-400"}`} /><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-300">{item.title}</p><p className="text-[9px] text-slate-600">{item.project_name || (isTurkish ? "Genel" : "General")} · {item.observation_date}</p></div><span className={`text-[9px] font-black ${item.status === "closed" ? "text-emerald-300" : "text-amber-300"}`}>{item.status === "closed" ? (isTurkish ? "KAPALI" : "CLOSED") : (isTurkish ? "AÇIK" : "OPEN")}</span></div>)}
                {!observations.length && <p className="py-8 text-center text-xs text-slate-600">{isTurkish ? "Bu filtrelerde saha kaydı yok." : "No field records for these filters."}</p>}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
