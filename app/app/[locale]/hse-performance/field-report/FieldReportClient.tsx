"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { createClient } from "@/utils/supabase/client";

type Locale = "tr" | "en";

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
  description: string | null;
  corrective_action: string | null;
  responsible_person: string | null;
  target_date: string | null;

  status:
    | "open"
    | "in_progress"
    | "closed";
};

function safe(value: string | null | undefined) {
  return value?.trim() || "—";
}

function pct(value: number, max: number) {
  if (!max) return 0;

  return Math.max(
    5,
    Math.min(
      100,
      (value / max) * 100,
    ),
  );
}

export default function FieldReportClient({
  locale,
}: {
  locale: Locale;
}) {
  const isTurkish = locale === "tr";

  const [loading, setLoading] =
    useState(true);

  const [observations, setObservations] =
    useState<Observation[]>([]);

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [reportCompany, setReportCompany] =
    useState("");

  const [preparedBy, setPreparedBy] =
    useState("");

  const [reviewedBy, setReviewedBy] =
    useState("");

  const [approvedBy, setApprovedBy] =
    useState("");

  const [revision, setRevision] =
    useState("00");

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search,
      );

    setStartDate(
      params.get("start") || "",
    );

    setEndDate(
      params.get("end") || "",
    );

    setReportCompany(
      params.get("company") || "",
    );

    setPreparedBy(
      params.get("preparedBy") || "",
    );

    setReviewedBy(
      params.get("reviewedBy") || "",
    );

    setApprovedBy(
      params.get("approvedBy") || "",
    );

    setRevision(
      params.get("revision") || "00",
    );
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);

      const supabase = createClient();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const result =
        await supabase
          .from("hse_observations")
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
            description,
            corrective_action,
            responsible_person,
            target_date,
            status
          `)
          .eq("user_id", user.id)
          .gte(
            "observation_date",
            startDate,
          )
          .lte(
            "observation_date",
            endDate,
          )
          .order(
            "observation_date",
            {
              ascending: false,
            },
          );

      if (cancelled) return;

      setObservations(
        (result.data ??
          []) as Observation[],
      );

      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [startDate, endDate]);

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

      const openItems =
        observations.filter(
          (x) =>
            x.status !== "closed",
        );

      const closed =
        observations.filter(
          (x) =>
            x.status === "closed",
        ).length;

      const overdue =
        openItems.filter(
          (x) =>
            x.target_date &&
            new Date(x.target_date) <
              new Date(),
        ).length;

      const closure =
        observations.length === 0
          ? 0
          : Math.round(
              (closed /
                observations.length) *
                100,
            );

      const totalRisk = {
        critical:
          observations.filter(
            (x) =>
              x.risk_level ===
              "critical",
          ).length,

        high:
          observations.filter(
            (x) =>
              x.risk_level ===
              "high",
          ).length,

        medium:
          observations.filter(
            (x) =>
              x.risk_level ===
              "medium",
          ).length,

        low:
          observations.filter(
            (x) =>
              x.risk_level ===
              "low",
          ).length,
      };

      const openCritical =
        openItems.filter(
          (x) =>
            x.risk_level ===
            "critical",
        ).length;

      const openHigh =
        openItems.filter(
          (x) =>
            x.risk_level ===
            "high",
        ).length;

      const categoryMap =
        new Map<string, number>();

      const companyMap =
        new Map<string, number>();

      const locationMap =
        new Map<string, number>();

      for (const item of observations) {
        categoryMap.set(
          item.category,
          (categoryMap.get(
            item.category,
          ) ?? 0) + 1,
        );

        const company =
          safe(item.company_name);

        companyMap.set(
          company,
          (companyMap.get(
            company,
          ) ?? 0) + 1,
        );

        const location =
          safe(item.location);

        locationMap.set(
          location,
          (locationMap.get(
            location,
          ) ?? 0) + 1,
        );
      }

      const sortMap = (
        map: Map<string, number>,
      ) =>
        Array.from(map.entries())
          .map(
            ([name, value]) => ({
              name,
              value,
            }),
          )
          .sort(
            (a, b) =>
              b.value - a.value,
          );

      const attention =
        openItems
          .filter(
            (x) =>
              x.risk_level ===
                "critical" ||
              x.risk_level ===
                "high",
          )
          .sort((a, b) => {
            const rank = {
              critical: 2,
              high: 1,
              medium: 0,
              low: 0,
            };

            return (
              rank[b.risk_level] -
              rank[a.risk_level]
            );
          });

      return {
        positive,
        unsafeAct,
        unsafeCondition,
        open:
          openItems.length,
        closed,
        overdue,
        closure,
        totalRisk,
        openCritical,
        openHigh,
        categories:
          sortMap(categoryMap),
        companies:
          sortMap(companyMap),
        locations:
          sortMap(locationMap),
        attention,
      };
    }, [observations]);

  const primaryProject =
    useMemo(() => {
      const map =
        new Map<string, number>();

      for (const item of observations) {
        const project =
          safe(item.project_name);

        map.set(
          project,
          (map.get(project) ?? 0) + 1,
        );
      }

      return (
        Array.from(map.entries())
          .sort(
            (a, b) =>
              b[1] - a[1],
          )[0]?.[0] ?? "—"
      );
    }, [observations]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl border bg-white px-8 py-6 shadow-sm">
          <b>SERNEM</b>
          <p className="mt-2 text-xs text-slate-500">
            {isTurkish
              ? "Saha raporu hazırlanıyor..."
              : "Preparing field report..."}
          </p>
        </div>
      </main>
    );
  }

  const categoryMax =
    stats.categories[0]?.value || 1;

  const companyMax =
    stats.companies[0]?.value || 1;

  const locationMax =
    stats.locations[0]?.value || 1;

  return (
    <main className="field-root bg-[#e8edf3] py-6 text-[#172033]">
      <div className="no-print mx-auto mb-4 flex w-[1120px] justify-end gap-2">
        <button
          type="button"
          onClick={() =>
            window.history.back()
          }
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black"
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
          PDF / Print
        </button>
      </div>

      {/* =====================================================
          PAGE 1 — MANAGEMENT OVERVIEW
      ===================================================== */}

      <section className="field-page mx-auto bg-white shadow-xl">
        <ReportHeader
          title={
            isTurkish
              ? "SAHA GÖZLEM & AKSİYON RAPORU"
              : "FIELD OBSERVATION & ACTION REPORT"
          }
          period={`${startDate} — ${endDate}`}
          company={
            reportCompany || "—"
          }
          project={primaryProject}
        />

        <div className="report-meta-grid">
          <MetaBox
            label={
              isTurkish
                ? "ŞİRKET"
                : "COMPANY"
            }
            value={
              reportCompany || "—"
            }
          />

          <MetaBox
            label={
              isTurkish
                ? "PROJE / KAPSAM"
                : "PROJECT / SCOPE"
            }
            value={primaryProject}
          />

          <MetaBox
            label={
              isTurkish
                ? "RAPORLAMA DÖNEMİ"
                : "REPORTING PERIOD"
            }
            value={`${startDate} — ${endDate}`}
          />

          <MetaBox
            label={
              isTurkish
                ? "TOPLAM KAYIT"
                : "TOTAL RECORDS"
            }
            value={String(
              observations.length,
            )}
          />
        </div>

        <div className="executive-strip">
          <Metric
            label={
              isTurkish
                ? "TOPLAM GÖZLEM"
                : "TOTAL OBSERVATIONS"
            }
            value={
              observations.length
            }
          />

          <Metric
            label="POSITIVE"
            value={stats.positive}
            tone="green"
          />

          <Metric
            label="UNSAFE ACT"
            value={stats.unsafeAct}
            tone="amber"
          />

          <Metric
            label="UNSAFE CONDITION"
            value={
              stats.unsafeCondition
            }
            tone="red"
          />

          <Metric
            label={
              isTurkish
                ? "AÇIK AKSİYON"
                : "OPEN ACTIONS"
            }
            value={stats.open}
          />

          <Metric
            label={
              isTurkish
                ? "GECİKMİŞ"
                : "OVERDUE"
            }
            value={stats.overdue}
            tone="red"
          />

          <Metric
            label={
              isTurkish
                ? "AÇIK HIGH+"
                : "OPEN HIGH+"
            }
            value={
              stats.openCritical +
              stats.openHigh
            }
            tone="amber"
          />

          <Metric
            label={
              isTurkish
                ? "KAPANMA"
                : "CLOSURE"
            }
            value={`${stats.closure}%`}
            tone="green"
          />
        </div>

        <div className="overview-grid">
          <Panel
            title={
              isTurkish
                ? "GÖZLEM TİPİ"
                : "OBSERVATION MIX"
            }
          >
            <div className="donut-wrap">
              <div
                className="donut"
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
                <div className="donut-hole">
                  <b>
                    {
                      observations.length
                    }
                  </b>

                  <span>
                    OBS
                  </span>
                </div>
              </div>
            </div>

            <div className="legend-grid">
              <span className="text-emerald-700">
                ● Positive{" "}
                {stats.positive}
              </span>

              <span className="text-amber-700">
                ● Unsafe Act{" "}
                {stats.unsafeAct}
              </span>

              <span className="text-red-700">
                ● Unsafe Condition{" "}
                {
                  stats.unsafeCondition
                }
              </span>
            </div>
          </Panel>

          <Panel
            title={
              isTurkish
                ? "RİSK PROFİLİ"
                : "RISK PROFILE"
            }
          >
            <div className="risk-grid">
              <RiskBox
                label="CRITICAL"
                value={
                  stats.totalRisk
                    .critical
                }
                tone="red"
              />

              <RiskBox
                label="HIGH"
                value={
                  stats.totalRisk.high
                }
                tone="orange"
              />

              <RiskBox
                label="MEDIUM"
                value={
                  stats.totalRisk.medium
                }
                tone="amber"
              />

              <RiskBox
                label="LOW"
                value={
                  stats.totalRisk.low
                }
                tone="green"
              />
            </div>

            <div className="attention-band">
              <div>
                <span>
                  {isTurkish
                    ? "Açık Kritik"
                    : "Open Critical"}
                </span>

                <b className="text-red-600">
                  {
                    stats.openCritical
                  }
                </b>
              </div>

              <div>
                <span>
                  {isTurkish
                    ? "Açık Yüksek"
                    : "Open High"}
                </span>

                <b className="text-orange-600">
                  {stats.openHigh}
                </b>
              </div>
            </div>
          </Panel>

          <Panel
            title={
              isTurkish
                ? "AKSİYON PERFORMANSI"
                : "ACTION PERFORMANCE"
            }
          >
            <div className="action-big">
              <div>
                <span>
                  {isTurkish
                    ? "Açık"
                    : "Open"}
                </span>

                <b className="text-red-600">
                  {stats.open}
                </b>
              </div>

              <div>
                <span>
                  {isTurkish
                    ? "Gecikmiş"
                    : "Overdue"}
                </span>

                <b className="text-amber-600">
                  {stats.overdue}
                </b>
              </div>

              <div>
                <span>
                  {isTurkish
                    ? "Kapalı"
                    : "Closed"}
                </span>

                <b className="text-emerald-600">
                  {stats.closed}
                </b>
              </div>
            </div>

            <div className="closure-box">
              <div>
                {isTurkish
                  ? "AKSİYON KAPANMA ORANI"
                  : "ACTION CLOSURE RATE"}
              </div>

              <b>
                {stats.closure}%
              </b>
            </div>
          </Panel>
        </div>

        <div className="breakdown-grid">
          <BarPanel
            title={
              isTurkish
                ? "KATEGORİ DAĞILIMI"
                : "CATEGORY BREAKDOWN"
            }
            data={stats.categories.slice(
              0,
              6,
            )}
            max={categoryMax}
            tone="blue"
          />

          <BarPanel
            title={
              isTurkish
                ? "ŞİRKET DAĞILIMI"
                : "COMPANY BREAKDOWN"
            }
            data={stats.companies.slice(
              0,
              6,
            )}
            max={companyMax}
            tone="violet"
          />

          <BarPanel
            title={
              isTurkish
                ? "LOKASYON DAĞILIMI"
                : "LOCATION BREAKDOWN"
            }
            data={stats.locations.slice(
              0,
              6,
            )}
            max={locationMax}
            tone="green"
          />
        </div>

        <div className="management-attention">
          <div className="management-title">
            {isTurkish
              ? "YÖNETİM DİKKATİ — AÇIK HIGH / CRITICAL AKSİYONLAR"
              : "MANAGEMENT ATTENTION — OPEN HIGH / CRITICAL ACTIONS"}
          </div>

          {stats.attention.length ? (
            <div>
              <div className="attention-header">
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

                <span>
                  {isTurkish
                    ? "Durum"
                    : "Status"}
                </span>
              </div>

              {stats.attention
                .slice(0, 5)
                .map(
                  (item) => (
                    <div
                      key={
                        item.id
                      }
                      className="attention-row"
                    >
                      <span className="font-bold">
                        {
                          item.title
                        }
                      </span>

                      <span className="uppercase">
                        {
                          item.risk_level
                        }
                      </span>

                      <span>
                        {safe(
                          item.responsible_person,
                        )}
                      </span>

                      <span>
                        {safe(
                          item.target_date,
                        )}
                      </span>

                      <span className="uppercase">
                        {
                          item.status
                        }
                      </span>
                    </div>
                  ),
                )}
            </div>
          ) : (
            <div className="no-attention">
              ✓{" "}
              {isTurkish
                ? "Açık High / Critical aksiyon bulunmuyor."
                : "No open High / Critical actions."}
            </div>
          )}
        </div>

        <DocumentFooter
          preparedBy={preparedBy}
          reviewedBy={reviewedBy}
          approvedBy={approvedBy}
          revision={revision}
          isTurkish={isTurkish}
        />
      </section>

      {/* =====================================================
          PAGE 2 — FIELD REGISTER
      ===================================================== */}

      <section className="field-page mx-auto mt-6 bg-white shadow-xl">
        <ReportHeader
          title={
            isTurkish
              ? "DETAYLI SAHA KAYITLARI"
              : "DETAILED FIELD REGISTER"
          }
          period={`${startDate} — ${endDate}`}
          company={
            reportCompany || "—"
          }
          project={primaryProject}
        />

        <div className="register-summary">
          <div>
            <span>
              {isTurkish
                ? "Kayıt Sayısı"
                : "Records"}
            </span>

            <b>
              {
                observations.length
              }
            </b>
          </div>

          <div>
            <span>
              High / Critical
            </span>

            <b>
              {stats.totalRisk.high +
                stats.totalRisk
                  .critical}
            </b>
          </div>

          <div>
            <span>
              {isTurkish
                ? "Açık Aksiyon"
                : "Open Actions"}
            </span>

            <b>
              {stats.open}
            </b>
          </div>

          <div>
            <span>
              {isTurkish
                ? "Gecikmiş"
                : "Overdue"}
            </span>

            <b>
              {stats.overdue}
            </b>
          </div>
        </div>

        <div className="register-wrap">
          <div className="register-head">
            <span>No</span>
            <span>Date</span>
            <span>
              {isTurkish
                ? "Proje / Lokasyon"
                : "Project / Location"}
            </span>
            <span>
              {isTurkish
                ? "Bulgu & Açıklama"
                : "Finding & Description"}
            </span>
            <span>
              {isTurkish
                ? "Düzeltici Aksiyon"
                : "Corrective Action"}
            </span>
            <span>
              {isTurkish
                ? "Sorumlu / Hedef"
                : "Responsible / Due"}
            </span>
            <span>
              Risk
            </span>
            <span>
              Status
            </span>
          </div>

          {observations
            .slice(0, 10)
            .map(
              (
                item,
                index,
              ) => (
                <div
                  key={item.id}
                  className="register-row"
                >
                  <span className="row-no">
                    {index + 1}
                  </span>

                  <span>
                    {
                      item.observation_date
                    }
                  </span>

                  <span>
                    <b>
                      {safe(
                        item.project_name,
                      )}
                    </b>

                    <small>
                      {safe(
                        item.company_name,
                      )}{" "}
                      •{" "}
                      {safe(
                        item.location,
                      )}
                    </small>
                  </span>

                  <span>
                    <b>
                      {
                        item.title
                      }
                    </b>

                    <small>
                      {safe(
                        item.description,
                      )}
                    </small>

                    <em>
                      {
                        item.category
                      }
                    </em>
                  </span>

                  <span>
                    {safe(
                      item.corrective_action,
                    )}
                  </span>

                  <span>
                    <b>
                      {safe(
                        item.responsible_person,
                      )}
                    </b>

                    <small>
                      {safe(
                        item.target_date,
                      )}
                    </small>
                  </span>

                  <span>
                    <RiskBadge
                      risk={
                        item.risk_level
                      }
                    />
                  </span>

                  <span>
                    <StatusBadge
                      status={
                        item.status
                      }
                    />
                  </span>
                </div>
              ),
            )}
        </div>

        {observations.length > 10 && (
          <div className="continued-note">
            +{" "}
            {observations.length -
              10}{" "}
            {isTurkish
              ? "ek kayıt Excel raporunda yer almaktadır."
              : "additional records are included in the Excel report."}
          </div>
        )}

        <DocumentFooter
          preparedBy={preparedBy}
          reviewedBy={reviewedBy}
          approvedBy={approvedBy}
          revision={revision}
          isTurkish={isTurkish}
        />
      </section>

      <style jsx global>{`
        @page {
          size: A4 landscape;
          margin: 0;
        }

        .field-page {
          width: 1120px;
          height: 793px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #ffffff;
        }

        .report-header {
          height: 82px;
          min-height: 82px;
          flex-shrink: 0;
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          background: #071a33 !important;
          color: #ffffff !important;
          position: relative;
          z-index: 5;
        }

        .report-header::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            #2563eb 0%,
            #0ea5e9 55%,
            #22c55e 100%
          );
        }

        .report-meta-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          border-bottom:
            1px solid #dbe4ed;
        }

        .meta-box {
          padding: 10px 14px;
          border-right:
            1px solid #dbe4ed;
          background: #f8fafc;
        }

        .meta-box:last-child {
          border-right: none;
        }

        .meta-label,
        .tiny-label {
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #64748b;
        }

        .meta-value {
          margin-top: 3px;
          font-size: 11px;
          font-weight: 900;
          color: #172033;
        }

        .executive-strip {
          display: grid;
          grid-template-columns:
            repeat(8, 1fr);
          border-bottom:
            1px solid #dbe4ed;
        }

        .metric-box {
          padding: 9px 5px;
          text-align: center;
          border-right:
            1px solid #dbe4ed;
        }

        .metric-box:last-child {
          border-right: none;
        }

        .metric-box strong {
          display: block;
          margin-top: 3px;
          font-size: 20px;
          line-height: 1;
        }

        .overview-grid {
          display: grid;
          grid-template-columns:
            1fr 1fr 1fr;
          gap: 10px;
          padding: 10px 12px 0;
        }

        .report-panel {
          border: 1px solid #dbe4ed;
          background: white;
          padding: 10px;
          min-height: 188px;
        }

        .panel-heading {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.07em;
          color: #172b45;
        }

        .donut-wrap {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        .donut {
          width: 104px;
          height: 104px;
          border-radius: 9999px;
          position: relative;
        }

        .donut-hole {
          position: absolute;
          inset: 18px;
          background: white;
          border-radius: 9999px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .donut-hole b {
          font-size: 24px;
        }

        .donut-hole span {
          font-size: 7px;
          color: #64748b;
          font-weight: 900;
        }

        .legend-grid {
          margin-top: 8px;
          display: flex;
          justify-content: center;
          gap: 12px;
          font-size: 7px;
          font-weight: 900;
        }

        .risk-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 6px;
          margin-top: 18px;
        }

        .risk-box {
          border: 1px solid #dbe4ed;
          padding: 12px 4px;
          text-align: center;
        }

        .risk-box span {
          font-size: 7px;
          font-weight: 900;
        }

        .risk-box b {
          display: block;
          margin-top: 4px;
          font-size: 22px;
        }

        .attention-band {
          margin-top: 13px;
          display: grid;
          grid-template-columns:
            1fr 1fr;
          border: 1px solid #dbe4ed;
        }

        .attention-band > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 10px;
          font-size: 8px;
          font-weight: 900;
        }

        .attention-band > div:first-child {
          border-right:
            1px solid #dbe4ed;
        }

        .attention-band b {
          font-size: 17px;
        }

        .action-big {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 7px;
          margin-top: 18px;
        }

        .action-big > div {
          border: 1px solid #dbe4ed;
          text-align: center;
          padding: 10px 4px;
        }

        .action-big span {
          display: block;
          font-size: 7px;
          font-weight: 900;
          color: #64748b;
        }

        .action-big b {
          display: block;
          margin-top: 3px;
          font-size: 22px;
        }

        .closure-box {
          margin-top: 12px;
          padding: 10px;
          background: #effcf6;
          border: 1px solid #bbf7d0;
          text-align: center;
        }

        .closure-box div {
          font-size: 7px;
          font-weight: 900;
          color: #047857;
        }

        .closure-box b {
          display: block;
          margin-top: 2px;
          font-size: 24px;
          color: #059669;
        }

        .breakdown-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 10px;
          padding: 10px 12px 0;
        }

        .bar-panel {
          border: 1px solid #dbe4ed;
          padding: 10px;
          height: 152px;
        }

        .bar-row {
          display: grid;
          grid-template-columns:
            105px 1fr 22px;
          gap: 7px;
          align-items: center;
          margin-top: 7px;
        }

        .bar-name {
          font-size: 7px;
          font-weight: 800;
          color: #475569;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .bar-track {
          height: 8px;
          background: #e2e8f0;
        }

        .bar-value {
          font-size: 7px;
          text-align: right;
          font-weight: 900;
        }

        .management-attention {
          margin: 10px 12px 0;
          border: 1px solid #dbe4ed;
          min-height: 84px;
          background: #ffffff;
        }

        .management-title {
          background: #0f2746;
          color: white;
          padding: 7px 10px;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.06em;
        }

        .attention-header,
        .attention-row {
          display: grid;
          grid-template-columns:
            1fr 70px 130px 95px 85px;
          gap: 7px;
          align-items: center;
        }

        .attention-header {
          padding: 6px 9px;
          background: #eef4fa;
          font-size: 7px;
          font-weight: 900;
          color: #475569;
        }

        .attention-row {
          padding: 6px 9px;
          border-top: 1px solid #e2e8f0;
          font-size: 7px;
        }

        .no-attention {
          padding: 12px;
          font-size: 9px;
          font-weight: 800;
          color: #047857;
        }

        .register-summary {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          border-bottom:
            1px solid #dbe4ed;
        }

        .register-summary > div {
          padding: 10px;
          text-align: center;
          border-right:
            1px solid #dbe4ed;
        }

        .register-summary span {
          font-size: 7px;
          font-weight: 900;
          color: #64748b;
        }

        .register-summary b {
          display: block;
          margin-top: 2px;
          font-size: 18px;
        }

        .register-wrap {
          margin: 12px;
          border: 1px solid #dbe4ed;
        }

        .register-head,
        .register-row {
          display: grid;
          grid-template-columns:
            28px
            72px
            120px
            1.5fr
            1.4fr
            115px
            72px
            72px;
        }

        .register-head {
          background: #071a33;
          color: white;
          font-size: 7px;
          font-weight: 900;
        }

        .register-head span {
          padding: 7px 6px;
        }

        .register-row {
          min-height: 66px;
          border-top:
            1px solid #e2e8f0;
          font-size: 8px;
          line-height: 1.3;
        }

        .register-row:nth-child(odd) {
          background: #f8fafc;
        }

        .register-row > span {
          padding: 6px;
          border-right:
            1px solid #edf1f5;
          overflow: hidden;
        }

        .register-row small,
        .register-row em {
          display: block;
          margin-top: 3px;
          font-size: 7px;
          color: #64748b;
          font-style: normal;
          line-height: 1.35;
        }

        .row-no {
          font-weight: 900;
          text-align: center;
        }

        .risk-badge,
        .status-badge {
          display: inline-block;
          padding: 3px 5px;
          border-radius: 3px;
          font-size: 6px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .document-footer {
          margin-top: auto;
          display: grid;
          grid-template-columns:
            1fr 1fr 1fr 70px 150px;
          border-top:
            1px solid #cbd5e1;
          background: #f8fafc;
        }

        .document-footer > div {
          padding: 8px 10px;
          border-right:
            1px solid #cbd5e1;
          font-size: 7px;
        }

        .document-footer b {
          display: block;
          margin-top: 2px;
        }

        .continued-note {
          margin: 0 12px 10px;
          font-size: 7px;
          color: #64748b;
          font-weight: 700;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .field-root {
            padding: 0 !important;
            background: #fff !important;
          }

          .report-header {
            display: flex !important;
            visibility: visible !important;
            height: 21.7mm !important;
            min-height: 21.7mm !important;
            padding: 0 7.5mm !important;
            background: #071a33 !important;
            color: #ffffff !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .report-header * {
            visibility: visible !important;
          }

          .field-page {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            break-after: page !important;
            page-break-after: always !important;
          }

          .field-page:last-child {
            break-after: auto !important;
            page-break-after: auto !important;
          }

          .report-panel,
          .bar-panel,
          .management-attention,
          .register-summary,
          .document-footer {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .register-head,
          .register-row {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </main>
  );
}

function ReportHeader({
  title,
  period,
  company,
  project,
}: {
  title: string;
  period: string;
  company: string;
  project: string;
}) {
  return (
    <div className="report-header">
      <div>
        <div className="text-[27px] font-black tracking-[0.18em]">
          SERNEM
        </div>

        <div className="mt-1 text-[10px] font-black tracking-[0.1em] text-[#5ba9ff]">
          {title}
        </div>
      </div>

      <div className="text-right">
        <b className="text-[11px]">
          {period}
        </b>

        <div className="mt-2 text-[7px] text-slate-300">
          {company} • {project}
        </div>
      </div>
    </div>
  );
}

function MetaBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="meta-box">
      <div className="meta-label">
        {label}
      </div>

      <div className="meta-value">
        {value}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  tone = "dark",
}: {
  label: string;
  value: string | number;
  tone?:
    | "dark"
    | "green"
    | "amber"
    | "red";
}) {
  const toneClass =
    tone === "green"
      ? "text-emerald-600"
      : tone === "amber"
        ? "text-amber-600"
        : tone === "red"
          ? "text-red-600"
          : "text-slate-900";

  return (
    <div className="metric-box">
      <div className="tiny-label">
        {label}
      </div>

      <strong className={toneClass}>
        {value}
      </strong>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="report-panel">
      <h2 className="panel-heading">
        {title}
      </h2>

      {children}
    </article>
  );
}

function RiskBox({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone:
    | "red"
    | "orange"
    | "amber"
    | "green";
}) {
  const toneClass =
    tone === "red"
      ? "text-red-600"
      : tone === "orange"
        ? "text-orange-600"
        : tone === "amber"
          ? "text-amber-600"
          : "text-emerald-600";

  return (
    <div className="risk-box">
      <span>
        {label}
      </span>

      <b className={toneClass}>
        {value}
      </b>
    </div>
  );
}

function BarPanel({
  title,
  data,
  max,
  tone,
}: {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  max: number;
  tone:
    | "blue"
    | "violet"
    | "green";
}) {
  const toneClass =
    tone === "violet"
      ? "bg-violet-600"
      : tone === "green"
        ? "bg-emerald-500"
        : "bg-blue-600";

  return (
    <article className="bar-panel">
      <h2 className="panel-heading">
        {title}
      </h2>

      {data.length ? (
        data.map((item) => (
          <div
            key={item.name}
            className="bar-row"
          >
            <span className="bar-name">
              {item.name}
            </span>

            <div className="bar-track">
              <div
                className={`h-full ${toneClass}`}
                style={{
                  width: `${pct(
                    item.value,
                    max,
                  )}%`,
                }}
              />
            </div>

            <span className="bar-value">
              {item.value}
            </span>
          </div>
        ))
      ) : (
        <div className="mt-5 text-center text-[8px] text-slate-400">
          —
        </div>
      )}
    </article>
  );
}

function RiskBadge({
  risk,
}: {
  risk: Observation["risk_level"];
}) {
  const style =
    risk === "critical"
      ? "bg-red-100 text-red-700"
      : risk === "high"
        ? "bg-orange-100 text-orange-700"
        : risk === "medium"
          ? "bg-amber-100 text-amber-700"
          : "bg-emerald-100 text-emerald-700";

  return (
    <span className={`risk-badge ${style}`}>
      {risk}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: Observation["status"];
}) {
  const style =
    status === "closed"
      ? "bg-emerald-100 text-emerald-700"
      : status === "in_progress"
        ? "bg-blue-100 text-blue-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`status-badge ${style}`}>
      {status}
    </span>
  );
}

function DocumentFooter({
  preparedBy,
  reviewedBy,
  approvedBy,
  revision,
  isTurkish,
}: {
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  revision: string;
  isTurkish: boolean;
}) {
  return (
    <footer className="document-footer">
      <div>
        <span>
          {isTurkish
            ? "HAZIRLAYAN"
            : "PREPARED BY"}
        </span>
        <b>
          {preparedBy || "—"}
        </b>
      </div>

      <div>
        <span>
          {isTurkish
            ? "KONTROL EDEN"
            : "REVIEWED BY"}
        </span>
        <b>
          {reviewedBy || "—"}
        </b>
      </div>

      <div>
        <span>
          {isTurkish
            ? "ONAYLAYAN"
            : "APPROVED BY"}
        </span>
        <b>
          {approvedBy || "—"}
        </b>
      </div>

      <div>
        <span>REV.</span>
        <b>
          {revision}
        </b>
      </div>

      <div>
        <span>SERNEM</span>
        <b>www.sernem.com</b>
      </div>
    </footer>
  );
}
