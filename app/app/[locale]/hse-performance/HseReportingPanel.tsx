"use client";

import { useMemo, useState } from "react";

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

type KpiValues = {
  trir: number | null;
  dart: number | null;
  ltifr: number | null;
  severityRate: number | null;
};

type Props = {
  locale: Locale;
  observations: Observation[];
  incidentMetrics: IncidentMetrics | null;
  selectedMonth: string;
  selectedProject: string;
  kpiValues: KpiValues;
  kpiTrend: KpiTrendPoint[];
};

function startOfToday() {
  const d = new Date();
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
  );
}

function isOverdue(item: Observation) {
  if (
    item.status === "closed" ||
    !item.target_date
  ) {
    return false;
  }

  return (
    new Date(item.target_date) <
    startOfToday()
  );
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export default function HseReportingPanel({
  locale,
  observations,
  incidentMetrics,
  selectedMonth,
  selectedProject,
  kpiValues,
  kpiTrend,
}: Props) {
  const isTurkish = locale === "tr";

  const [reportCompany, setReportCompany] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [reviewedBy, setReviewedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [reportRevision, setReportRevision] = useState("00");

  const today = new Date();

  const weekStart = new Date(today);
  weekStart.setDate(
    today.getDate() -
      ((today.getDay() + 6) % 7),
  );

  const monthStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  );

  const [reportType, setReportType] =
    useState<
      "weekly" | "monthly" | "custom"
    >("weekly");

  const [startDate, setStartDate] =
    useState(isoDate(weekStart));

  const [endDate, setEndDate] =
    useState(isoDate(today));

  function chooseReportType(
    type: "weekly" | "monthly" | "custom",
  ) {
    setReportType(type);

    if (type === "weekly") {
      setStartDate(isoDate(weekStart));
      setEndDate(isoDate(today));
    }

    if (type === "monthly") {
      setStartDate(isoDate(monthStart));
      setEndDate(isoDate(today));
    }
  }

  const reportData = useMemo(() => {
    return observations.filter((item) => {
      const date = item.observation_date;

      return (
        date >= startDate &&
        date <= endDate
      );
    });
  }, [
    observations,
    startDate,
    endDate,
  ]);

  const stats = useMemo(() => {
    const total = reportData.length;

    const positive = reportData.filter(
      (x) =>
        x.observation_type === "positive",
    ).length;

    const unsafeAct = reportData.filter(
      (x) =>
        x.observation_type === "unsafe_act",
    ).length;

    const unsafeCondition =
      reportData.filter(
        (x) =>
          x.observation_type ===
          "unsafe_condition",
      ).length;

    const open = reportData.filter(
      (x) => x.status !== "closed",
    );

    const closed = reportData.filter(
      (x) => x.status === "closed",
    );

    const overdue = reportData.filter(
      isOverdue,
    );

    const critical = open.filter(
      (x) =>
        x.risk_level === "critical",
    );

    const high = open.filter(
      (x) => x.risk_level === "high",
    );

    const closureRate =
      open.length + closed.length === 0
        ? 0
        : Math.round(
            (closed.length /
              (open.length +
                closed.length)) *
              100,
          );

    return {
      total,
      positive,
      unsafeAct,
      unsafeCondition,
      open: open.length,
      closed: closed.length,
      overdue: overdue.length,
      critical: critical.length,
      high: high.length,
      closureRate,
    };
  }, [reportData]);

  const categories = useMemo(() => {
    const map = new Map<
      string,
      number
    >();

    for (const item of reportData) {
      map.set(
        item.category,
        (map.get(item.category) ?? 0) + 1,
      );
    }

    return Array.from(map.entries())
      .map(([name, count]) => ({
        name,
        count,
        pct:
          stats.total === 0
            ? 0
            : Math.round(
                (count / stats.total) *
                  100,
              ),
      }))
      .sort(
        (a, b) => b.count - a.count,
      );
  }, [reportData, stats.total]);

  const managementSummary =
    useMemo(() => {
      if (stats.total === 0) {
        return isTurkish
          ? "Seçilen dönem için kayıtlı saha gözlemi bulunmamaktadır."
          : "No field observations were recorded for the selected reporting period.";
      }

      const unsafe =
        stats.unsafeAct +
        stats.unsafeCondition;

      if (stats.critical > 0) {
        return isTurkish
          ? `Seçilen dönemde ${stats.total} gözlem kaydedildi. ${stats.critical} açık kritik bulgu bulunuyor. Kritik aksiyonların öncelikli olarak kapatılması ve saha kontrollerinin artırılması önerilir.`
          : `${stats.total} observations were recorded. ${stats.critical} critical finding remains open. Immediate closure of critical actions and increased field verification are recommended.`;
      }

      if (stats.overdue > 0) {
        return isTurkish
          ? `Seçilen dönemde ${stats.total} gözlem kaydedildi. ${unsafe} güvensiz bulgu ve ${stats.overdue} gecikmiş aksiyon bulunmaktadır. Aksiyon kapanış performansının geliştirilmesi önerilir.`
          : `${stats.total} observations were recorded, including ${unsafe} unsafe findings and ${stats.overdue} overdue actions. Improvement in action closure performance is recommended.`;
      }

      return isTurkish
        ? `Seçilen dönemde ${stats.total} gözlem kaydedildi. Aksiyon kapanma oranı %${stats.closureRate}. Mevcut performansın korunması ve pozitif gözlem oranının artırılması önerilir.`
        : `${stats.total} observations were recorded. Action closure rate is ${stats.closureRate}%. Maintain current performance and continue increasing positive observations.`;
    }, [stats, isTurkish]);

  async function exportExcel() {
    const ExcelJSImport = await import("exceljs");

    const ExcelJS: any =
      (ExcelJSImport as any).default ?? ExcelJSImport;

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "SERNEM HSE Management Platform";
    workbook.company = "SERNEM";
    workbook.subject = "HSE Performance Report";
    workbook.title = "SERNEM HSE Performance Report";
    workbook.created = new Date();

    /* ========================================================
       DESIGN TOKENS
    ======================================================== */

    const C = {
      navy: "071A33",
      navy2: "0B2444",
      blue: "2563EB",
      blueSoft: "DBEAFE",
      cyan: "0EA5E9",
      green: "059669",
      greenSoft: "D1FAE5",
      red: "DC2626",
      redSoft: "FEE2E2",
      amber: "D97706",
      amberSoft: "FEF3C7",
      purple: "7C3AED",
      purpleSoft: "EDE9FE",
      slate: "475569",
      slateDark: "0F172A",
      slateSoft: "F1F5F9",
      gray: "64748B",
      light: "F8FAFC",
      white: "FFFFFF",
      border: "D8E2EC",
      borderDark: "CBD5E1",
    };

    const fill = (color: string) => ({
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: `FF${color}` },
    });

    const border = {
      top: {
        style: "thin",
        color: { argb: `FF${C.border}` },
      },
      left: {
        style: "thin",
        color: { argb: `FF${C.border}` },
      },
      bottom: {
        style: "thin",
        color: { argb: `FF${C.border}` },
      },
      right: {
        style: "thin",
        color: { argb: `FF${C.border}` },
      },
    };

    const center = {
      horizontal: "center",
      vertical: "middle",
    };

    const periodLabel = `${startDate} — ${endDate}`;

    const projectLabel =
      selectedProject === "all"
        ? isTurkish
          ? "Tüm Projeler"
          : "All Projects"
        : selectedProject;

    const fmt = (value: number | null | undefined) =>
      Number(value ?? 0).toLocaleString(
        isTurkish ? "tr-TR" : "en-US",
      );

    const rate = (value: number | null | undefined) =>
      value == null ? "—" : Number(value).toFixed(2);

    const totalObs = reportData.length;

    const openActions = reportData.filter(
      (x) => x.status !== "closed",
    ).length;

    const closedActions = reportData.filter(
      (x) => x.status === "closed",
    ).length;

    const overdueActions = reportData.filter(isOverdue).length;

    const highCritical = reportData.filter(
      (x) =>
        x.status !== "closed" &&
        (x.risk_level === "high" ||
          x.risk_level === "critical"),
    ).length;

    const closureRate =
      openActions + closedActions === 0
        ? 0
        : Math.round(
            (closedActions /
              (openActions + closedActions)) *
              100,
          );

    const groupData = (
      resolver: (item: Observation) => string,
    ) => {
      const map = new Map<string, number>();

      reportData.forEach((item) => {
        const key = resolver(item) || "—";
        map.set(key, (map.get(key) ?? 0) + 1);
      });

      return Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    };

    const categoryData = groupData(
      (x) => x.category || "—",
    );

    const companyData = groupData(
      (x) =>
        x.company_name?.trim() ||
        (isTurkish ? "Belirtilmemiş" : "Not specified"),
    );

    const locationData = groupData(
      (x) =>
        x.location?.trim() ||
        (isTurkish ? "Belirtilmemiş" : "Not specified"),
    );

    const responsibleData = groupData(
      (x) =>
        x.responsible_person?.trim() ||
        (isTurkish ? "Atanmamış" : "Unassigned"),
    );

    const riskCounts = {
      critical: reportData.filter(
        (x) => x.risk_level === "critical",
      ).length,
      high: reportData.filter(
        (x) => x.risk_level === "high",
      ).length,
      medium: reportData.filter(
        (x) => x.risk_level === "medium",
      ).length,
      low: reportData.filter(
        (x) => x.risk_level === "low",
      ).length,
    };

    const generatedAt =
      new Intl.DateTimeFormat(
        isTurkish ? "tr-TR" : "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      ).format(new Date());

    const escapeXml = (value: unknown) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

    const svgToPngBase64 = async (
      svg: string,
      width: number,
      height: number,
    ) => {
      const svgBlob = new Blob([svg], {
        type: "image/svg+xml;charset=utf-8",
      });

      const svgUrl = URL.createObjectURL(svgBlob);

      try {
        const image = new Image();

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () =>
            reject(new Error("Chart rendering failed."));
          image.src = svgUrl;
        });

        const scale = 2;

        const canvas =
          document.createElement("canvas");

        canvas.width = width * scale;
        canvas.height = height * scale;

        const ctx =
          canvas.getContext("2d");

        if (!ctx) {
          throw new Error(
            "Canvas context is unavailable.",
          );
        }

        ctx.scale(scale, scale);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(
          image,
          0,
          0,
          width,
          height,
        );

        return canvas.toDataURL("image/png");
      } finally {
        URL.revokeObjectURL(svgUrl);
      }
    };

    const makeTrendChartSvg = () => {
      const width = 900;
      const height = 350;

      const left = 58;
      const right = 28;
      const top = 38;
      const bottom = 62;

      const chartWidth =
        width - left - right;

      const chartHeight =
        height - top - bottom;

      const points =
        kpiTrend.slice(-12);

      const maxValue = Math.max(
        1,
        ...points.flatMap((x) => [
          x.trir,
          x.dart,
          x.ltifr,
          x.severity,
        ]),
      );

      const xAt = (index: number) =>
        left +
        (index *
          chartWidth) /
          Math.max(1, points.length - 1);

      const yAt = (value: number) =>
        top +
        chartHeight -
        (Number(value || 0) / maxValue) *
          chartHeight;

      const polyline = (
        key:
          | "trir"
          | "dart"
          | "ltifr"
          | "severity",
        color: string,
      ) => {
        const pts = points
          .map(
            (item, index) =>
              `${xAt(index).toFixed(1)},${yAt(
                item[key],
              ).toFixed(1)}`,
          )
          .join(" ");

        const dots = points
          .map(
            (item, index) => `
              <circle
                cx="${xAt(index)}"
                cy="${yAt(item[key])}"
                r="3.2"
                fill="${color}"
                stroke="#ffffff"
                stroke-width="1.5"
              />
            `,
          )
          .join("");

        return `
          <polyline
            points="${pts}"
            fill="none"
            stroke="${color}"
            stroke-width="3"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          ${dots}
        `;
      };

      const grid = [0, 0.25, 0.5, 0.75, 1]
        .map((ratio) => {
          const y =
            top +
            chartHeight -
            ratio * chartHeight;

          const value =
            maxValue * ratio;

          return `
            <line
              x1="${left}"
              y1="${y}"
              x2="${width - right}"
              y2="${y}"
              stroke="#e2e8f0"
              stroke-width="1"
            />
            <text
              x="${left - 10}"
              y="${y + 4}"
              text-anchor="end"
              font-family="Arial, sans-serif"
              font-size="11"
              fill="#94a3b8"
            >${value.toFixed(1)}</text>
          `;
        })
        .join("");

      const labels = points
        .map(
          (item, index) => `
            <text
              x="${xAt(index)}"
              y="${height - 32}"
              text-anchor="middle"
              font-family="Arial, sans-serif"
              font-size="10"
              font-weight="600"
              fill="#64748b"
            >${escapeXml(item.label)}</text>
          `,
        )
        .join("");

      return `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="${width}"
          height="${height}"
          viewBox="0 0 ${width} ${height}"
        >
          <rect
            width="100%"
            height="100%"
            rx="12"
            fill="#ffffff"
          />

          ${grid}

          ${polyline("trir", "#2563eb")}
          ${polyline("dart", "#f59e0b")}
          ${polyline("ltifr", "#10b981")}
          ${polyline("severity", "#7c3aed")}

          ${labels}

          <g
            font-family="Arial, sans-serif"
            font-size="11"
            font-weight="700"
          >
            <circle cx="280" cy="18" r="5" fill="#2563eb"/>
            <text x="291" y="22" fill="#475569">TRIR</text>

            <circle cx="370" cy="18" r="5" fill="#f59e0b"/>
            <text x="381" y="22" fill="#475569">DART</text>

            <circle cx="465" cy="18" r="5" fill="#10b981"/>
            <text x="476" y="22" fill="#475569">LTIFR</text>

            <circle cx="565" cy="18" r="5" fill="#7c3aed"/>
            <text x="576" y="22" fill="#475569">
              ${isTurkish ? "Şiddet" : "Severity"}
            </text>
          </g>
        </svg>
      `;
    };

    const makeDualDonutSvg = () => {
      const width = 430;
      const height = 350;

      const donut = (
        cx: number,
        cy: number,
        parts: Array<{
          value: number;
          color: string;
        }>,
        centerValue: string,
        centerLabel: string,
      ) => {
        const total =
          parts.reduce(
            (sum, item) =>
              sum + item.value,
            0,
          ) || 1;

        let offset = 0;

        const rings = parts
          .map((part) => {
            const pct =
              (part.value / total) * 100;

            const svg = `
              <circle
                cx="${cx}"
                cy="${cy}"
                r="66"
                fill="none"
                stroke="${part.color}"
                stroke-width="22"
                stroke-dasharray="${pct} ${100 - pct}"
                stroke-dashoffset="${-offset}"
                pathLength="100"
                transform="rotate(-90 ${cx} ${cy})"
              />
            `;

            offset += pct;

            return svg;
          })
          .join("");

        return `
          <circle
            cx="${cx}"
            cy="${cy}"
            r="66"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="22"
          />

          ${rings}

          <text
            x="${cx}"
            y="${cy - 1}"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="29"
            font-weight="800"
            fill="#0f172a"
          >${centerValue}</text>

          <text
            x="${cx}"
            y="${cy + 21}"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="10"
            font-weight="700"
            fill="#64748b"
          >${centerLabel}</text>
        `;
      };

      return `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="${width}"
          height="${height}"
          viewBox="0 0 ${width} ${height}"
        >
          <rect
            width="100%"
            height="100%"
            rx="12"
            fill="#ffffff"
          />

          <text
            x="108"
            y="34"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="12"
            font-weight="800"
            fill="#0f172a"
          >
            ${isTurkish ? "GÖZLEM TİPİ" : "OBSERVATION TYPE"}
          </text>

          <text
            x="322"
            y="34"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="12"
            font-weight="800"
            fill="#0f172a"
          >
            ${isTurkish ? "AKSİYON DURUMU" : "ACTION STATUS"}
          </text>

          ${donut(
            108,
            140,
            [
              {
                value: stats.positive,
                color: "#10b981",
              },
              {
                value: stats.unsafeAct,
                color: "#f59e0b",
              },
              {
                value: stats.unsafeCondition,
                color: "#ef4444",
              },
            ],
            String(totalObs),
            "OBS",
          )}

          ${donut(
            322,
            140,
            [
              {
                value: closedActions,
                color: "#10b981",
              },
              {
                value: openActions,
                color: "#ef4444",
              },
            ],
            String(
              openActions + closedActions,
            ),
            "TOTAL",
          )}

          <g
            font-family="Arial, sans-serif"
            font-size="10"
            font-weight="700"
          >
            <circle cx="28" cy="255" r="5" fill="#10b981"/>
            <text x="40" y="259" fill="#475569">
              Positive ${stats.positive}
            </text>

            <circle cx="28" cy="278" r="5" fill="#f59e0b"/>
            <text x="40" y="282" fill="#475569">
              Unsafe Act ${stats.unsafeAct}
            </text>

            <circle cx="28" cy="301" r="5" fill="#ef4444"/>
            <text x="40" y="305" fill="#475569">
              Unsafe Condition ${stats.unsafeCondition}
            </text>

            <circle cx="245" cy="255" r="5" fill="#10b981"/>
            <text x="257" y="259" fill="#475569">
              ${isTurkish ? "Kapalı" : "Closed"} ${closedActions}
            </text>

            <circle cx="245" cy="278" r="5" fill="#ef4444"/>
            <text x="257" y="282" fill="#475569">
              ${isTurkish ? "Açık" : "Open"} ${openActions}
            </text>

            <text
              x="245"
              y="305"
              fill="#059669"
              font-size="11"
            >
              ${isTurkish ? "Kapanma" : "Closure"} ${closureRate}%
            </text>
          </g>
        </svg>
      `;
    };

    /* ========================================================
       SHEET 01 — HSE DASHBOARD
    ======================================================== */

    const dash = workbook.addWorksheet(
      isTurkish ? "HSE Dashboard" : "HSE Dashboard",
      {
        views: [
          {
            showGridLines: false,
            zoomScale: 85,
          },
        ],
        pageSetup: {
          paperSize: 9,
          orientation: "landscape",
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 2,
          margins: {
            left: 0.25,
            right: 0.25,
            top: 0.3,
            bottom: 0.3,
            header: 0.1,
            footer: 0.1,
          },
        },
      },
    );

    dash.properties.defaultRowHeight = 19;

    dash.columns = [
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
      { width: 17 },
    ];

    /* BRAND HEADER */

    dash.mergeCells("A1:H2");
    const brand = dash.getCell("A1");

    brand.value = "SERNEM";
    brand.font = {
      size: 26,
      bold: true,
      color: { argb: `FF${C.white}` },
    };
    brand.fill = fill(C.navy);
    brand.alignment = {
      vertical: "middle",
      horizontal: "left",
      indent: 1,
    };

    dash.mergeCells("I1:L2");
    const reportHead = dash.getCell("I1");

    reportHead.value =
      isTurkish
        ? "HSE PERFORMANS RAPORU"
        : "HSE PERFORMANCE REPORT";

    reportHead.font = {
      size: 12,
      bold: true,
      color: { argb: `FF${C.white}` },
    };
    reportHead.fill = fill(C.navy2);
    reportHead.alignment = {
      vertical: "middle",
      horizontal: "right",
      indent: 1,
    };

    dash.mergeCells("A3:L3");
    const accent = dash.getCell("A3");

    accent.value =
      isTurkish
        ? "YÖNETİM DASHBOARD • KPI • SAHA GÖZLEM • AKSİYON TAKİBİ"
        : "MANAGEMENT DASHBOARD • KPI • FIELD OBSERVATION • ACTION TRACKING";

    accent.font = {
      size: 8,
      bold: true,
      color: { argb: `FF${C.blueSoft}` },
    };
    accent.fill = fill(C.navy);
    accent.alignment = {
      vertical: "middle",
      horizontal: "left",
      indent: 2,
    };

    dash.getRow(1).height = 24;
    dash.getRow(2).height = 24;
    dash.getRow(3).height = 20;

    /* REPORT INFO */

    const infoLabels = [
      [
        "A5",
        isTurkish ? "RAPORLAMA DÖNEMİ" : "REPORTING PERIOD",
        "B5:D5",
        periodLabel,
      ],
      [
        "E5",
        isTurkish ? "PROJE / KAPSAM" : "PROJECT / SCOPE",
        "F5:H5",
        projectLabel,
      ],
      [
        "I5",
        isTurkish ? "ŞİRKET" : "COMPANY",
        "J5:L5",
        reportCompany.trim() || "—",
      ],
    ] as const;

    infoLabels.forEach(
      ([labelCell, label, valueRange, value]) => {
        const valueStart = valueRange.split(":")[0];

        dash.getCell(labelCell).value = label;
        dash.getCell(labelCell).font = {
          size: 7,
          bold: true,
          color: { argb: `FF${C.gray}` },
        };
        dash.getCell(labelCell).fill = fill(C.slateSoft);
        dash.getCell(labelCell).border = border;
        dash.getCell(labelCell).alignment = center;

        dash.mergeCells(valueRange);

        dash.getCell(valueStart).value = value;
        dash.getCell(valueStart).font = {
          size: 9,
          bold: true,
          color: { argb: `FF${C.slateDark}` },
        };
        dash.getCell(valueStart).fill = fill(C.white);
        dash.getCell(valueStart).border = border;
        dash.getCell(valueStart).alignment = center;
      },
    );

    /* KPI BAND */

    const dashboardCriticalOpen =
      reportData.filter(
        (x) =>
          x.status !== "closed" &&
          x.risk_level === "critical",
      ).length;

    const dashboardPositivePct =
      totalObs === 0
        ? 0
        : Math.round(
            (stats.positive / totalObs) *
              100,
          );

    const topKpiCards = [
      {
        range: "A7:B9",
        label:
          isTurkish
            ? "TOPLAM GÖZLEM"
            : "TOTAL OBSERVATIONS",
        value: totalObs,
        color: C.blue,
      },
      {
        range: "C7:D9",
        label:
          isTurkish
            ? "POZİTİF GÖZLEM"
            : "POSITIVE OBSERVATION",
        value: stats.positive,
        color: C.green,
      },
      {
        range: "E7:F9",
        label:
          isTurkish
            ? "AÇIK AKSİYON"
            : "OPEN ACTIONS",
        value: openActions,
        color: C.amber,
      },
      {
        range: "G7:H9",
        label:
          isTurkish
            ? "AÇIK KRİTİK"
            : "CRITICAL OPEN",
        value: dashboardCriticalOpen,
        color: C.red,
      },
      {
        range: "I7:L9",
        label:
          isTurkish
            ? "KAPANMA ORANI"
            : "CLOSURE RATE",
        value: `${closureRate}%`,
        color: C.green,
      },
    ];

    topKpiCards.forEach((card) => {
      dash.mergeCells(card.range);

      const cell =
        dash.getCell(
          card.range.split(":")[0],
        );

      cell.value = {
        richText: [
          {
            text: `${card.label}\n`,
            font: {
              size: 7,
              bold: true,
              color: {
                argb: `FF${C.gray}`,
              },
            },
          },
          {
            text: String(card.value),
            font: {
              size: 19,
              bold: true,
              color: {
                argb: `FF${card.color}`,
              },
            },
          },
        ],
      };

      cell.fill = fill(C.light);
      cell.border = border;

      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
    });

    dash.getRow(7).height = 23;
    dash.getRow(8).height = 23;
    dash.getRow(9).height = 23;

    /* SECTION HELPER */

    const sectionTitle = (
      range: string,
      text: string,
    ) => {
      dash.mergeCells(range);
      const cell =
        dash.getCell(range.split(":")[0]);

      cell.value = text;
      cell.font = {
        size: 8,
        bold: true,
        color: { argb: `FF${C.white}` },
      };
      cell.fill = fill(C.navy);
      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
        indent: 1,
      };
    };

    /* ========================================================
       WEB-STYLE HSE OVERVIEW
    ======================================================== */

    sectionTitle(
      "A11:C11",
      isTurkish
        ? "ÖNCÜ GÖSTERGELER"
        : "LEADING INDICATORS",
    );

    sectionTitle(
      "D11:F11",
      isTurkish
        ? "GECİKMELİ GÖSTERGELER"
        : "LAGGING INDICATORS",
    );

    sectionTitle(
      "G11:I11",
      isTurkish
        ? "AKSİYON DURUMU"
        : "ACTION STATUS",
    );

    sectionTitle(
      "J11:L11",
      isTurkish
        ? "OLAY İSTATİSTİKLERİ"
        : "INCIDENT STATISTICS",
    );

    /* ---------------- LEADING ---------------- */

    const dashboardLeading = [
      [
        isTurkish
          ? "Gözlemler"
          : "Observations",
        totalObs,
      ],
      [
        isTurkish
          ? "Pozitif Gözlem %"
          : "Positive Observation %",
        dashboardPositivePct / 100,
      ],
      [
        isTurkish
          ? "Tamamlanan İnceleme"
          : "Inspections Completed",
        incidentMetrics?.inspection_count ?? 0,
      ],
      [
        "Toolbox Talk",
        incidentMetrics?.toolbox_talk_count ?? 0,
      ],
      [
        isTurkish
          ? "Eğitim Saati"
          : "Training Hours",
        incidentMetrics?.training_hours ?? 0,
      ],
      [
        isTurkish
          ? "Yönetim Walkdown"
          : "Management Walkdown",
        incidentMetrics?.management_walkdown_count ??
          0,
      ],
    ];

    dashboardLeading.forEach(
      ([label, value], index) => {
        const row = 12 + index;

        dash.mergeCells(
          `A${row}:B${row}`,
        );

        const labelCell =
          dash.getCell(`A${row}`);

        labelCell.value = label;

        labelCell.font = {
          size: 7.2,
          color: {
            argb: `FF${C.slate}`,
          },
        };

        labelCell.fill = fill(
          index % 2 === 0
            ? C.light
            : C.white,
        );

        labelCell.border = border;

        labelCell.alignment = {
          vertical: "middle",
          horizontal: "left",
          indent: 1,
        };

        const valueCell =
          dash.getCell(`C${row}`);

        valueCell.value = value;

        valueCell.font = {
          size: 9,
          bold: true,
          color: {
            argb: `FF${C.slateDark}`,
          },
        };

        valueCell.fill = fill(
          index % 2 === 0
            ? C.light
            : C.white,
        );

        valueCell.border = border;
        valueCell.alignment = center;

        if (index === 1) {
          valueCell.numFmt = "0%";
        }

        dash.getRow(row).height = 23;
      },
    );

    /* ---------------- LAGGING ---------------- */

    const dashboardLagging = [
      ["TRIR", rate(kpiValues.trir)],
      ["DART", rate(kpiValues.dart)],
      ["LTIFR", rate(kpiValues.ltifr)],
      [
        isTurkish
          ? "Şiddet Oranı"
          : "Severity Rate",
        rate(kpiValues.severityRate),
      ],
      [
        "LTI",
        incidentMetrics?.lti ?? 0,
      ],
      [
        "Recordable Cases",
        incidentMetrics?.recordable_cases ??
          0,
      ],
    ];

    dashboardLagging.forEach(
      ([label, value], index) => {
        const row = 12 + index;

        dash.mergeCells(
          `D${row}:E${row}`,
        );

        const labelCell =
          dash.getCell(`D${row}`);

        labelCell.value = label;

        labelCell.font = {
          size: 7.2,
          color: {
            argb: `FF${C.slate}`,
          },
        };

        labelCell.fill = fill(
          index % 2 === 0
            ? C.light
            : C.white,
        );

        labelCell.border = border;

        labelCell.alignment = {
          vertical: "middle",
          horizontal: "left",
          indent: 1,
        };

        const valueCell =
          dash.getCell(`F${row}`);

        valueCell.value = value;

        valueCell.font = {
          size: 9,
          bold: true,
          color: {
            argb: `FF${
              index === 0
                ? C.blue
                : index === 1
                  ? C.amber
                  : index === 2
                    ? C.green
                    : index === 3
                      ? C.purple
                      : C.slateDark
            }`,
          },
        };

        valueCell.fill = fill(
          index % 2 === 0
            ? C.light
            : C.white,
        );

        valueCell.border = border;
        valueCell.alignment = center;
      },
    );

    /* ---------------- ACTION STATUS ---------------- */

    dash.mergeCells("G12:I14");

    const actionTotalCell =
      dash.getCell("G12");

    actionTotalCell.value = {
      richText: [
        {
          text:
            `${
              openActions +
              closedActions
            }\n`,
          font: {
            size: 23,
            bold: true,
            color: {
              argb:
                `FF${C.slateDark}`,
            },
          },
        },
        {
          text: "TOTAL",
          font: {
            size: 7,
            bold: true,
            color: {
              argb:
                `FF${C.gray}`,
            },
          },
        },
      ],
    };

    actionTotalCell.fill =
      fill(C.light);

    actionTotalCell.border = border;

    actionTotalCell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };

    const dashboardActions = [
      [
        isTurkish
          ? "Kapalı"
          : "Closed",
        closedActions,
        C.green,
      ],
      [
        isTurkish
          ? "Açık"
          : "Open",
        openActions,
        C.blue,
      ],
      [
        isTurkish
          ? "Gecikmiş"
          : "Overdue",
        overdueActions,
        C.amber,
      ],
      [
        isTurkish
          ? "Kritik"
          : "Critical",
        dashboardCriticalOpen,
        C.red,
      ],
    ] as const;

    dashboardActions.forEach(
      ([label, value, color], index) => {
        const row = 15 + index;

        dash.mergeCells(
          `G${row}:H${row}`,
        );

        const labelCell =
          dash.getCell(`G${row}`);

        labelCell.value =
          `● ${label}`;

        labelCell.font = {
          size: 7,
          bold: true,
          color: {
            argb: `FF${color}`,
          },
        };

        labelCell.fill =
          fill(C.white);

        labelCell.border = border;

        labelCell.alignment = {
          vertical: "middle",
          horizontal: "left",
          indent: 1,
        };

        const valueCell =
          dash.getCell(`I${row}`);

        valueCell.value = value;

        valueCell.font = {
          size: 8.5,
          bold: true,
          color: {
            argb:
              `FF${C.slateDark}`,
          },
        };

        valueCell.fill =
          fill(C.white);

        valueCell.border = border;
        valueCell.alignment = center;
      },
    );

    dash.mergeCells("G19:I20");

    const closureCell =
      dash.getCell("G19");

    closureCell.value = {
      richText: [
        {
          text:
            `${
              isTurkish
                ? "KAPANMA ORANI"
                : "CLOSURE RATE"
            }\n`,
          font: {
            size: 6.5,
            bold: true,
            color: {
              argb:
                `FF${C.gray}`,
            },
          },
        },
        {
          text:
            `${closureRate}%`,
          font: {
            size: 18,
            bold: true,
            color: {
              argb:
                `FF${C.green}`,
            },
          },
        },
      ],
    };

    closureCell.fill =
      fill(C.greenSoft);

    closureCell.border = border;

    closureCell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };

    /* ---------------- INCIDENTS ---------------- */

    const dashboardIncidents = [
      [
        "Near Miss",
        incidentMetrics?.near_miss ??
          0,
      ],
      [
        "LTI",
        incidentMetrics?.lti ?? 0,
      ],
      [
        "Recordable",
        incidentMetrics?.recordable_cases ??
          0,
      ],
      [
        "First Aid",
        incidentMetrics?.first_aid ??
          0,
      ],
      [
        isTurkish
          ? "Kayıp Gün"
          : "Lost Days",
        incidentMetrics?.lost_days ??
          0,
      ],
      [
        "MTC",
        incidentMetrics?.medical_treatment ??
          0,
      ],
    ];

    dashboardIncidents.forEach(
      ([label, value], index) => {
        const pairRow =
          12 +
          Math.floor(index / 2) * 3;

        const leftSide =
          index % 2 === 0;

        const range =
          leftSide
            ? `J${pairRow}:K${pairRow + 1}`
            : `L${pairRow}:L${pairRow + 1}`;

        dash.mergeCells(range);

        const cell =
          dash.getCell(
            leftSide
              ? `J${pairRow}`
              : `L${pairRow}`,
          );

        cell.value = {
          richText: [
            {
              text:
                `${label}\n`,
              font: {
                size: 6.5,
                color: {
                  argb:
                    `FF${C.gray}`,
                },
              },
            },
            {
              text:
                String(value),
              font: {
                size: 14,
                bold: true,
                color: {
                  argb:
                    `FF${C.slateDark}`,
                },
              },
            },
          ],
        };

        cell.fill = fill(C.light);
        cell.border = border;

        cell.alignment = {
          horizontal: "left",
          vertical: "middle",
          wrapText: true,
          indent: 1,
        };
      },
    );

    /* ========================================================
       VISUAL KPI ANALYTICS
    ======================================================== */

    sectionTitle(
      "A22:H22",
      isTurkish
        ? "12 AYLIK KPI TRENDİ"
        : "12 MONTH KPI TREND",
    );

    sectionTitle(
      "I22:L22",
      isTurkish
        ? "GÖZLEM & AKSİYON PROFİLİ"
        : "OBSERVATION & ACTION PROFILE",
    );

    const trendChartPng =
      await svgToPngBase64(
        makeTrendChartSvg(),
        900,
        350,
      );

    const trendImageId =
      workbook.addImage({
        base64: trendChartPng,
        extension: "png",
      });

    dash.addImage(
      trendImageId,
      {
        tl: {
          col: 0.15,
          row: 22.2,
        },
        br: {
          col: 8,
          row: 36.5,
        },
        editAs: "oneCell",
      },
    );

    const donutChartPng =
      await svgToPngBase64(
        makeDualDonutSvg(),
        430,
        350,
      );

    const donutImageId =
      workbook.addImage({
        base64: donutChartPng,
        extension: "png",
      });

    dash.addImage(
      donutImageId,
      {
        tl: {
          col: 8.15,
          row: 22.2,
        },
        br: {
          col: 12,
          row: 36.5,
        },
        editAs: "oneCell",
      },
    );

    for (let row = 23; row <= 37; row++) {
      dash.getRow(row).height = 20;
    }

    const summaryRow = 39;



    sectionTitle(
      `A${summaryRow}:L${summaryRow}`,
      isTurkish
        ? "YÖNETİM DEĞERLENDİRMESİ"
        : "MANAGEMENT REVIEW",
    );

    dash.mergeCells(
      `A${summaryRow + 1}:L${summaryRow + 3}`,
    );

    const management =
      dash.getCell(`A${summaryRow + 1}`);

    management.value = managementSummary;
    management.font = {
      size: 8,
      color: { argb: `FF${C.slate}` },
    };
    management.fill = fill(C.light);
    management.border = border;
    management.alignment = {
      vertical: "middle",
      horizontal: "left",
      wrapText: true,
      indent: 1,
    };

    /* SIGN-OFF */

    const signRow = summaryRow + 5;

    const signBlocks = [
      ["A", "C", isTurkish ? "HAZIRLAYAN" : "PREPARED BY", preparedBy.trim() || "—"],
      ["D", "F", isTurkish ? "KONTROL EDEN" : "REVIEWED BY", reviewedBy.trim() || "—"],
      ["G", "I", isTurkish ? "ONAYLAYAN" : "APPROVED BY", approvedBy.trim() || "—"],
      ["J", "L", "REV.", reportRevision.trim() || "00"],
    ];

    signBlocks.forEach(
      ([startCol, endCol, label, value]) => {
        dash.mergeCells(
          `${startCol}${signRow}:${endCol}${signRow}`,
        );
        dash.mergeCells(
          `${startCol}${signRow + 1}:${endCol}${signRow + 2}`,
        );

        const h =
          dash.getCell(`${startCol}${signRow}`);

        h.value = label;
        h.font = {
          size: 6,
          bold: true,
          color: { argb: `FF${C.gray}` },
        };
        h.fill = fill(C.slateSoft);
        h.border = border;
        h.alignment = center;

        const v =
          dash.getCell(
            `${startCol}${signRow + 1}`,
          );

        v.value = value;
        v.font = {
          size: 8,
          bold: true,
          color: {
            argb: `FF${C.slateDark}`,
          },
        };
        v.border = border;
        v.alignment = center;
      },
    );

    dash.mergeCells(
      `A${signRow + 4}:L${signRow + 4}`,
    );

    const footer =
      dash.getCell(`A${signRow + 4}`);

    footer.value =
      `SERNEM  •  www.sernem.com  •  ${generatedAt}`;

    footer.font = {
      size: 6,
      bold: true,
      color: { argb: `FF${C.gray}` },
    };

    footer.alignment = {
      horizontal: "right",
      vertical: "middle",
    };

    dash.pageSetup.printArea =
      `A1:L${signRow + 4}`;

    dash.headerFooter.oddFooter =
      "&LSERNEM HSE MANAGEMENT SYSTEM" +
      "&RPage &P of &N";

    /* ========================================================
       SHEET 02 — OBSERVATIONS
    ======================================================== */

    const obsSheet = workbook.addWorksheet(
      isTurkish ? "Gözlemler" : "Observations",
      {
        views: [
          {
            state: "frozen",
            ySplit: 4,
            showGridLines: false,
          },
        ],
        pageSetup: {
          orientation: "landscape",
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
        },
      },
    );

    obsSheet.mergeCells("A1:O2");

    const obsTitle = obsSheet.getCell("A1");

    obsTitle.value =
      isTurkish
        ? "SERNEM  |  DETAYLI SAHA GÖZLEMLERİ"
        : "SERNEM  |  DETAILED FIELD OBSERVATIONS";

    obsTitle.font = {
      size: 18,
      bold: true,
      color: { argb: `FF${C.white}` },
    };
    obsTitle.fill = fill(C.navy);
    obsTitle.alignment = {
      vertical: "middle",
      horizontal: "left",
      indent: 1,
    };

    obsSheet.mergeCells("A3:O3");

    const obsSub = obsSheet.getCell("A3");
    obsSub.value =
      `${periodLabel}  •  ${projectLabel}`;
    obsSub.font = {
      size: 8,
      bold: true,
      color: { argb: `FF${C.blue}` },
    };
    obsSub.fill = fill(C.slateSoft);
    obsSub.alignment = {
      vertical: "middle",
      horizontal: "left",
      indent: 1,
    };

    const observationHeaders = [
      "No",
      isTurkish ? "Tarih" : "Date",
      isTurkish ? "Proje" : "Project",
      isTurkish ? "Şirket" : "Company",
      isTurkish ? "Lokasyon" : "Location",
      isTurkish ? "Gözlem Tipi" : "Type",
      isTurkish ? "Kategori" : "Category",
      isTurkish ? "Risk" : "Risk",
      isTurkish ? "Başlık" : "Title",
      isTurkish ? "Açıklama" : "Description",
      isTurkish ? "Düzeltici Aksiyon" : "Corrective Action",
      isTurkish ? "Sorumlu" : "Responsible",
      isTurkish ? "Hedef Tarih" : "Target Date",
      isTurkish ? "Durum" : "Status",
      isTurkish ? "Gecikmiş" : "Overdue",
    ];

    obsSheet.addRow(observationHeaders);

    obsSheet.getRow(4).eachCell(
      (cell: any) => {
        cell.font = {
          bold: true,
          color: { argb: `FF${C.white}` },
        };
        cell.fill = fill(C.navy2);
        cell.alignment = center;
        cell.border = border;
      },
    );

    obsSheet.getRow(4).height = 28;

    obsSheet.columns = [
      { width: 6 },
      { width: 13 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 22 },
      { width: 12 },
      { width: 27 },
      { width: 38 },
      { width: 38 },
      { width: 22 },
      { width: 15 },
      { width: 15 },
      { width: 12 },
    ];

    reportData.forEach(
      (item, index) => {
        const row = obsSheet.addRow([
          index + 1,
          item.observation_date,
          item.project_name ?? "",
          item.company_name ?? "",
          item.location ?? "",
          item.observation_type,
          item.category,
          item.risk_level,
          item.title,
          item.description,
          item.corrective_action ?? "",
          item.responsible_person ?? "",
          item.target_date ?? "",
          item.status,
          isOverdue(item)
            ? isTurkish
              ? "EVET"
              : "YES"
            : isTurkish
              ? "HAYIR"
              : "NO",
        ]);

        row.alignment = {
          vertical: "top",
          wrapText: true,
        };

        row.eachCell((cell: any) => {
          cell.border = border;
          cell.fill = fill(
            index % 2 === 0
              ? C.white
              : C.light,
          );
        });

        const riskCell = row.getCell(8);
        const risk =
          String(riskCell.value ?? "").toLowerCase();

        riskCell.font = {
          bold: true,
          color: {
            argb: `FF${
              risk === "critical"
                ? C.red
                : risk === "high"
                  ? "EA580C"
                  : risk === "medium"
                    ? C.amber
                    : C.green
            }`,
          },
        };

        const statusCell = row.getCell(14);
        const status =
          String(statusCell.value ?? "").toLowerCase();

        statusCell.font = {
          bold: true,
          color: {
            argb: `FF${
              status === "closed"
                ? C.green
                : C.red
            }`,
          },
        };

        if (isOverdue(item)) {
          row.getCell(15).font = {
            bold: true,
            color: { argb: `FF${C.red}` },
          };
          row.getCell(15).fill =
            fill(C.redSoft);
        }
      },
    );

    obsSheet.autoFilter = {
      from: "A4",
      to: "O4",
    };

    /* ========================================================
       SHEET 03 — ACTION TRACKER
    ======================================================== */

    const actionSheet = workbook.addWorksheet(
      isTurkish
        ? "Aksiyon Takibi"
        : "Action Tracker",
      {
        views: [
          {
            state: "frozen",
            ySplit: 4,
            showGridLines: false,
          },
        ],
        pageSetup: {
          orientation: "landscape",
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
        },
      },
    );

    actionSheet.mergeCells("A1:J2");

    const actionTitle =
      actionSheet.getCell("A1");

    actionTitle.value =
      isTurkish
        ? "SERNEM  |  AKSİYON TAKİP RAPORU"
        : "SERNEM  |  ACTION TRACKING REPORT";

    actionTitle.font = {
      size: 18,
      bold: true,
      color: { argb: `FF${C.white}` },
    };
    actionTitle.fill = fill(C.navy);
    actionTitle.alignment = {
      vertical: "middle",
      horizontal: "left",
      indent: 1,
    };

    actionSheet.mergeCells("A3:J3");

    const actionSub =
      actionSheet.getCell("A3");

    actionSub.value =
      `${periodLabel}  •  ${projectLabel}  •  ` +
      `${isTurkish ? "Açık" : "Open"} ${openActions}  •  ` +
      `${isTurkish ? "Gecikmiş" : "Overdue"} ${overdueActions}  •  ` +
      `${isTurkish ? "Kapanma" : "Closure"} ${closureRate}%`;

    actionSub.font = {
      size: 8,
      bold: true,
      color: { argb: `FF${C.blue}` },
    };
    actionSub.fill = fill(C.slateSoft);
    actionSub.alignment = {
      vertical: "middle",
      horizontal: "left",
      indent: 1,
    };

    const actionHeaders = [
      "No",
      isTurkish ? "Bulgu" : "Finding",
      "Risk",
      isTurkish
        ? "Düzeltici Aksiyon"
        : "Corrective Action",
      isTurkish ? "Sorumlu" : "Responsible",
      isTurkish ? "Şirket" : "Company",
      isTurkish ? "Lokasyon" : "Location",
      isTurkish ? "Hedef Tarih" : "Target Date",
      isTurkish ? "Durum" : "Status",
      isTurkish ? "Gecikmiş" : "Overdue",
    ];

    actionSheet.addRow(actionHeaders);

    actionSheet.getRow(4).eachCell(
      (cell: any) => {
        cell.font = {
          bold: true,
          color: { argb: `FF${C.white}` },
        };
        cell.fill = fill(C.navy2);
        cell.alignment = center;
        cell.border = border;
      },
    );

    actionSheet.columns = [
      { width: 6 },
      { width: 35 },
      { width: 12 },
      { width: 42 },
      { width: 22 },
      { width: 20 },
      { width: 20 },
      { width: 15 },
      { width: 15 },
      { width: 12 },
    ];

    reportData
      .filter(
        (item) =>
          item.corrective_action ||
          item.status !== "closed",
      )
      .forEach((item, index) => {
        const overdue = isOverdue(item);

        const row =
          actionSheet.addRow([
            index + 1,
            item.title,
            item.risk_level,
            item.corrective_action ?? "",
            item.responsible_person ?? "",
            item.company_name ?? "",
            item.location ?? "",
            item.target_date ?? "",
            item.status,
            overdue
              ? isTurkish
                ? "EVET"
                : "YES"
              : isTurkish
                ? "HAYIR"
                : "NO",
          ]);

        row.alignment = {
          vertical: "top",
          wrapText: true,
        };

        row.eachCell((cell: any) => {
          cell.border = border;
          cell.fill = fill(
            index % 2 === 0
              ? C.white
              : C.light,
          );
        });

        const risk =
          String(
            row.getCell(3).value ?? "",
          ).toLowerCase();

        row.getCell(3).font = {
          bold: true,
          color: {
            argb: `FF${
              risk === "critical"
                ? C.red
                : risk === "high"
                  ? "EA580C"
                  : risk === "medium"
                    ? C.amber
                    : C.green
            }`,
          },
        };

        const status =
          String(
            row.getCell(9).value ?? "",
          ).toLowerCase();

        row.getCell(9).font = {
          bold: true,
          color: {
            argb: `FF${
              status === "closed"
                ? C.green
                : C.red
            }`,
          },
        };

        if (overdue) {
          row.getCell(10).font = {
            bold: true,
            color: { argb: `FF${C.red}` },
          };
          row.getCell(10).fill =
            fill(C.redSoft);
        }
      });

    actionSheet.autoFilter = {
      from: "A4",
      to: "J4",
    };

    /* ========================================================
       SHEET 04 — KPI DATA
    ======================================================== */

    const kpiSheet =
      workbook.addWorksheet(
        "KPI Data",
        {
          views: [
            {
              showGridLines: false,
            },
          ],
        },
      );

    kpiSheet.columns = [
      { width: 28 },
      { width: 20 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
    ];

    kpiSheet.mergeCells("A1:F2");

    const rawTitle =
      kpiSheet.getCell("A1");

    rawTitle.value =
      "SERNEM  |  HSE KPI DATA";

    rawTitle.font = {
      size: 18,
      bold: true,
      color: { argb: `FF${C.white}` },
    };
    rawTitle.fill = fill(C.navy);
    rawTitle.alignment = {
      vertical: "middle",
      horizontal: "left",
      indent: 1,
    };

    const metricRows = [
      ["Reporting Period", periodLabel],
      ["Selected Month", selectedMonth],
      ["Project", projectLabel],
      ["Company", reportCompany.trim() || "—"],
      ["Worked Hours", incidentMetrics?.worked_hours ?? 0],
      ["Recordable Cases", incidentMetrics?.recordable_cases ?? 0],
      ["TRIR", kpiValues.trir ?? 0],
      ["LTIFR", kpiValues.ltifr ?? 0],
      ["DART", kpiValues.dart ?? 0],
      ["Severity Rate", kpiValues.severityRate ?? 0],
      ["LTI", incidentMetrics?.lti ?? 0],
      ["Medical Treatment", incidentMetrics?.medical_treatment ?? 0],
      ["First Aid", incidentMetrics?.first_aid ?? 0],
      ["Near Miss", incidentMetrics?.near_miss ?? 0],
      ["Lost Days", incidentMetrics?.lost_days ?? 0],
      ["Inspections", incidentMetrics?.inspection_count ?? 0],
      ["Toolbox Talks", incidentMetrics?.toolbox_talk_count ?? 0],
      ["Training Hours", incidentMetrics?.training_hours ?? 0],
      ["Management Walkdowns", incidentMetrics?.management_walkdown_count ?? 0],
      ["Total Observations", totalObs],
      ["Positive Observations", stats.positive],
      ["Unsafe Acts", stats.unsafeAct],
      ["Unsafe Conditions", stats.unsafeCondition],
      ["Open Actions", openActions],
      ["Closed Actions", closedActions],
      ["Overdue Actions", overdueActions],
      ["Closure Rate", closureRate / 100],
    ];

    metricRows.forEach(
      ([label, value], index) => {
        const rowNumber = index + 4;

        kpiSheet.getCell(
          `A${rowNumber}`,
        ).value = label;

        kpiSheet.getCell(
          `A${rowNumber}`,
        ).font = {
          bold: true,
          color: { argb: `FF${C.slate}` },
        };

        kpiSheet.getCell(
          `B${rowNumber}`,
        ).value = value;

        kpiSheet.getCell(
          `B${rowNumber}`,
        ).font = {
          bold: true,
          color: {
            argb: `FF${C.slateDark}`,
          },
        };

        ["A", "B"].forEach((col) => {
          const c =
            kpiSheet.getCell(
              `${col}${rowNumber}`,
            );

          c.border = border;
          c.fill = fill(
            index % 2 === 0
              ? C.light
              : C.white,
          );
        });
      },
    );

    kpiSheet.getCell("B30").numFmt = "0%";

    const trendStart =
      metricRows.length + 6;

    kpiSheet.mergeCells(
      `A${trendStart}:F${trendStart}`,
    );

    const trendTitle =
      kpiSheet.getCell(
        `A${trendStart}`,
      );

    trendTitle.value =
      "12 MONTH KPI TREND";

    trendTitle.font = {
      bold: true,
      color: { argb: `FF${C.white}` },
    };
    trendTitle.fill = fill(C.navy2);

    const rawHeaders = [
      "Period",
      "Worked Hours",
      "TRIR",
      "DART",
      "LTIFR",
      "Severity",
    ];

    rawHeaders.forEach(
      (header, index) => {
        const c =
          kpiSheet.getCell(
            trendStart + 1,
            index + 1,
          );

        c.value = header;
        c.font = {
          bold: true,
          color: { argb: `FF${C.white}` },
        };
        c.fill = fill(C.navy);
        c.border = border;
        c.alignment = center;
      },
    );

    kpiTrend.forEach(
      (item, index) => {
        const row = trendStart + 2 + index;

        const values = [
          item.label,
          item.workedHours,
          item.trir,
          item.dart,
          item.ltifr,
          item.severity,
        ];

        values.forEach(
          (value, colIndex) => {
            const c =
              kpiSheet.getCell(
                row,
                colIndex + 1,
              );

            c.value = value;
            c.border = border;
            c.fill = fill(
              index % 2 === 0
                ? C.light
                : C.white,
            );

            if (colIndex > 1) {
              c.numFmt = "0.00";
            }

            if (colIndex === 1) {
              c.numFmt = "#,##0";
            }
          },
        );
      },
    );

    /* ========================================================
       DOWNLOAD
    ======================================================== */

    workbook.worksheets.forEach(
      (sheet: any) => {
        sheet.eachRow(
          (row: any) => {
            row.eachCell(
              { includeEmpty: true },
              (cell: any) => {
                if (!cell.alignment) {
                  cell.alignment = {
                    vertical: "middle",
                  };
                }
              },
            );
          },
        );
      },
    );

    const buffer =
      await workbook.xlsx.writeBuffer();

    const blob = new Blob(
      [buffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      `SERNEM-HSE-Performance-${startDate}-${endDate}.xlsx`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }


  async function downloadKpiPdf() {
    const pdfMakeModule = await import("pdfmake/build/pdfmake");
    const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

    const pdfMake: any =
      (pdfMakeModule as any).default ?? pdfMakeModule;

    const pdfFonts: any =
      (pdfFontsModule as any).default ?? pdfFontsModule;

    pdfMake.vfs =
      pdfFonts.pdfMake?.vfs ??
      pdfFonts.vfs ??
      pdfFonts;

    if (!incidentMetrics) {
      window.alert(
        isTurkish
          ? "Seçilen dönem için HSE Performance verisi bulunmuyor."
          : "No HSE Performance data is available for the selected period.",
      );
      return;
    }

    const monthDate = new Date(
      `${selectedMonth}-01T00:00:00`,
    );

    const periodLabel =
      new Intl.DateTimeFormat(
        isTurkish ? "tr-TR" : "en-US",
        {
          month: "long",
          year: "numeric",
        },
      ).format(monthDate);

    const projectLabel =
      selectedProject === "all"
        ? isTurkish
          ? "Tüm Projeler"
          : "All Projects"
        : selectedProject;

    const companyLabel =
      reportCompany.trim() || "—";

    const preparedLabel =
      preparedBy.trim() || "—";

    const reviewedLabel =
      reviewedBy.trim() || "—";

    const approvedLabel =
      approvedBy.trim() || "—";

    const revisionLabel =
      reportRevision.trim() || "00";

    const generatedDate =
      new Intl.DateTimeFormat(
        isTurkish ? "tr-TR" : "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
      ).format(new Date());

    const reportId =
      `SHP-${selectedMonth.replace("-", "")}-${Date.now()
        .toString()
        .slice(-5)}`;

    const fmt = (value: number) =>
      Number(value || 0).toLocaleString(
        isTurkish ? "tr-TR" : "en-US",
      );

    const rate = (value: number | null) =>
      value === null
        ? "—"
        : Number(value).toFixed(2);

    const totalObs = observations.length;

    const positive =
      observations.filter(
        (x) =>
          x.observation_type === "positive",
      ).length;

    const unsafeAct =
      observations.filter(
        (x) =>
          x.observation_type === "unsafe_act",
      ).length;

    const unsafeCondition =
      observations.filter(
        (x) =>
          x.observation_type ===
          "unsafe_condition",
      ).length;

    const openActions =
      observations.filter(
        (x) =>
          x.status !== "closed",
      ).length;

    const closedActions =
      observations.filter(
        (x) =>
          x.status === "closed",
      ).length;

    const overdueActions =
      observations.filter(isOverdue).length;

    const closureRate =
      openActions + closedActions === 0
        ? 0
        : Math.round(
            (closedActions /
              (openActions +
                closedActions)) *
              100,
          );

    const riskCounts = {
      critical: observations.filter(
        (x) =>
          x.status !== "closed" &&
          x.risk_level === "critical",
      ).length,

      high: observations.filter(
        (x) =>
          x.status !== "closed" &&
          x.risk_level === "high",
      ).length,

      medium: observations.filter(
        (x) =>
          x.status !== "closed" &&
          x.risk_level === "medium",
      ).length,

      low: observations.filter(
        (x) =>
          x.status !== "closed" &&
          x.risk_level === "low",
      ).length,
    };

    const byCategory = new Map<string, number>();

    for (const item of observations) {
      byCategory.set(
        item.category,
        (byCategory.get(
          item.category,
        ) ?? 0) + 1,
      );
    }

    const categoryData =
      Array.from(
        byCategory.entries(),
      )
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort(
          (a, b) =>
            b.count - a.count,
        )
        .slice(0, 8);

    const negativeCategoryMap =
      new Map<string, number>();

    for (const item of observations) {
      if (
        item.observation_type !==
        "positive"
      ) {
        negativeCategoryMap.set(
          item.category,
          (negativeCategoryMap.get(
            item.category,
          ) ?? 0) + 1,
        );
      }
    }

    const negativeCategories =
      Array.from(
        negativeCategoryMap.entries(),
      )
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort(
          (a, b) =>
            b.count - a.count,
        )
        .slice(0, 7);

    const locationMap =
      new Map<string, number>();

    for (const item of observations) {
      const location =
        item.location?.trim() ||
        (isTurkish
          ? "Belirtilmemiş"
          : "Not specified");

      locationMap.set(
        location,
        (locationMap.get(location) ?? 0) + 1,
      );
    }

    const locationData =
      Array.from(locationMap.entries())
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort(
          (a, b) =>
            b.count - a.count,
        )
        .slice(0, 7);

    const companyMap =
      new Map<string, number>();

    for (const item of observations) {
      const company =
        item.company_name?.trim() ||
        (isTurkish
          ? "Belirtilmemiş"
          : "Not specified");

      companyMap.set(
        company,
        (companyMap.get(company) ?? 0) + 1,
      );
    }

    const companyData =
      Array.from(companyMap.entries())
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort(
          (a, b) =>
            b.count - a.count,
        )
        .slice(0, 7);

    const responsibleMap =
      new Map<string, number>();

    for (const item of observations) {
      const name =
        item.responsible_person?.trim() ||
        (isTurkish
          ? "Atanmamış"
          : "Unassigned");

      responsibleMap.set(
        name,
        (responsibleMap.get(name) ?? 0) + 1,
      );
    }

    const responsibleData =
      Array.from(
        responsibleMap.entries(),
      )
        .map(([name, count]) => ({
          name,
          count,
        }))
        .sort(
          (a, b) =>
            b.count - a.count,
        )
        .slice(0, 10);

    const topFindings =
      observations
        .filter(
          (x) =>
            x.status !== "closed",
        )
        .sort((a, b) => {
          const rank = {
            critical: 4,
            high: 3,
            medium: 2,
            low: 1,
          };

          return (
            rank[b.risk_level] -
            rank[a.risk_level]
          );
        })
        .slice(0, 8);

    const maxCategory = Math.max(
      1,
      ...categoryData.map(
        (x) => x.count,
      ),
    );

    const maxNegative = Math.max(
      1,
      ...negativeCategories.map(
        (x) => x.count,
      ),
    );

    const maxResponsible = Math.max(
      1,
      ...responsibleData.map(
        (x) => x.count,
      ),
    );

    const maxLocation = Math.max(
      1,
      ...locationData.map(
        (x) => x.count,
      ),
    );

    const maxCompany = Math.max(
      1,
      ...companyData.map(
        (x) => x.count,
      ),
    );

    const makeDonut = (
      parts: Array<{
        value: number;
        color: string;
      }>,
      center: string,
      subtitle: string,
    ) => {
      const total =
        parts.reduce(
          (sum, x) =>
            sum + x.value,
          0,
        ) || 1;

      let offset = 0;

      const rings = parts
        .map((part) => {
          const pct =
            (part.value / total) *
            100;

          const ring = `
            <circle
              cx="75"
              cy="75"
              r="47"
              fill="none"
              stroke="${part.color}"
              stroke-width="20"
              stroke-dasharray="${pct} ${100 - pct}"
              stroke-dashoffset="${-offset}"
              pathLength="100"
              transform="rotate(-90 75 75)"
            />
          `;

          offset += pct;
          return ring;
        })
        .join("");

      return `
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="75"
            cy="75"
            r="47"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="20"
          />
          ${rings}
          <text
            x="75"
            y="72"
            text-anchor="middle"
            font-size="25"
            font-weight="700"
            fill="#0f172a"
          >${center}</text>
          <text
            x="75"
            y="88"
            text-anchor="middle"
            font-size="7"
            font-weight="700"
            fill="#64748b"
          >${subtitle}</text>
        </svg>
      `;
    };

    const actionDonut = makeDonut(
      [
        {
          value: closedActions,
          color: "#10b981",
        },
        {
          value: openActions,
          color: "#ef4444",
        },
      ],
      String(
        openActions + closedActions,
      ),
      "TOTAL",
    );

    const observationDonut =
      makeDonut(
        [
          {
            value: positive,
            color: "#10b981",
          },
          {
            value: unsafeAct,
            color: "#f59e0b",
          },
          {
            value: unsafeCondition,
            color: "#ef4444",
          },
        ],
        String(totalObs),
        "OBS",
      );

    const horizontalBars = (
      data: Array<{
        name: string;
        count: number;
      }>,
      max: number,
      color: string,
      width: number,
      rowHeight: number,
    ) => `
      <svg
        width="${width}"
        height="${Math.max(
          80,
          data.length *
            rowHeight +
            14,
        )}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${data
          .map((item, index) => {
            const y =
              7 +
              index *
                rowHeight;

            const barWidth =
              (item.count / max) *
              (width - 190);

            return `
              <text
                x="0"
                y="${y + 10}"
                font-size="7"
                fill="#334155"
              >${item.name.slice(0, 30)}</text>

              <rect
                x="145"
                y="${y}"
                width="${width - 175}"
                height="13"
                rx="2"
                fill="#e2e8f0"
              />

              <rect
                x="145"
                y="${y}"
                width="${barWidth}"
                height="13"
                rx="2"
                fill="${color}"
              />

              <text
                x="${width - 17}"
                y="${y + 10}"
                text-anchor="end"
                font-size="7"
                font-weight="700"
                fill="#0f172a"
              >${item.count}</text>
            `;
          })
          .join("")}
      </svg>
    `;

    const categorySvg =
      horizontalBars(
        categoryData,
        maxCategory,
        "#2563eb",
        350,
        22,
      );

    const responsibleSvg =
      horizontalBars(
        responsibleData,
        maxResponsible,
        "#10b981",
        650,
        20,
      );

    const negativeSvg =
      horizontalBars(
        negativeCategories,
        maxNegative,
        "#ef4444",
        350,
        22,
      );

    const locationSvg =
      horizontalBars(
        locationData,
        maxLocation,
        "#2563eb",
        330,
        22,
      );

    const companySvg =
      horizontalBars(
        companyData,
        maxCompany,
        "#7c3aed",
        330,
        22,
      );

    const trendMax = Math.max(
      1,
      ...kpiTrend.flatMap(
        (x) => [
          x.trir,
          x.dart,
          x.ltifr,
          x.severity,
        ],
      ),
    );

    const trendPoints = (
      metric:
        | "trir"
        | "dart"
        | "ltifr"
        | "severity",
    ) =>
      kpiTrend
        .map((item, index) => {
          const x =
            40 +
            index *
              (590 /
                Math.max(
                  1,
                  kpiTrend.length -
                    1,
                ));

          const y =
            135 -
            (item[metric] /
              trendMax) *
              100;

          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");

    const trendLabels =
      kpiTrend
        .map((item, index) => {
          const x =
            40 +
            index *
              (590 /
                Math.max(
                  1,
                  kpiTrend.length -
                    1,
                ));

          return `
            <text
              x="${x}"
              y="158"
              text-anchor="middle"
              font-size="6"
              fill="#64748b"
            >${item.label}</text>
          `;
        })
        .join("");

    const trendSvg = `
      <svg
        width="670"
        height="168"
        viewBox="0 0 670 168"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="670"
          height="168"
          fill="#ffffff"
        />

        <line
          x1="40"
          y1="35"
          x2="630"
          y2="35"
          stroke="#e2e8f0"
        />
        <line
          x1="40"
          y1="68"
          x2="630"
          y2="68"
          stroke="#e2e8f0"
        />
        <line
          x1="40"
          y1="101"
          x2="630"
          y2="101"
          stroke="#e2e8f0"
        />
        <line
          x1="40"
          y1="135"
          x2="630"
          y2="135"
          stroke="#cbd5e1"
        />

        <polyline
          points="${trendPoints("trir")}"
          fill="none"
          stroke="#2563eb"
          stroke-width="3"
          stroke-linejoin="round"
          stroke-linecap="round"
        />

        <polyline
          points="${trendPoints("dart")}"
          fill="none"
          stroke="#f59e0b"
          stroke-width="2.3"
          stroke-linejoin="round"
          stroke-linecap="round"
        />

        <polyline
          points="${trendPoints("ltifr")}"
          fill="none"
          stroke="#10b981"
          stroke-width="2.3"
          stroke-linejoin="round"
          stroke-linecap="round"
        />

        <polyline
          points="${trendPoints("severity")}"
          fill="none"
          stroke="#7c3aed"
          stroke-width="2.3"
          stroke-linejoin="round"
          stroke-linecap="round"
        />

        ${trendLabels}
      </svg>
    `;

    const pyramidRows = [
      {
        label: "FATALITY",
        value: 0,
        color: "#dc2626",
        width: 82,
      },
      {
        label: "LTI",
        value:
          incidentMetrics.lti,
        color: "#f97316",
        width: 112,
      },
      {
        label: "MTC",
        value:
          incidentMetrics.medical_treatment,
        color: "#f59e0b",
        width: 142,
      },
      {
        label: "FIRST AID",
        value:
          incidentMetrics.first_aid,
        color: "#eab308",
        width: 172,
      },
      {
        label: "NEAR MISS",
        value:
          incidentMetrics.near_miss,
        color: "#22c55e",
        width: 205,
      },
      {
        label:
          "UNSAFE CONDITIONS",
        value: unsafeCondition,
        color: "#10b981",
        width: 238,
      },
      {
        label: "UNSAFE ACTS",
        value: unsafeAct,
        color: "#34d399",
        width: 270,
      },
    ];

    const pyramidSvg = `
      <svg
        width="290"
        height="195"
        viewBox="0 0 290 195"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pyramidRows
          .map((row, index) => {
            const x =
              (290 -
                row.width) /
              2;

            const y =
              6 +
              index * 27;

            return `
              <rect
                x="${x}"
                y="${y}"
                width="${row.width}"
                height="22"
                rx="2"
                fill="${row.color}"
              />

              <text
                x="145"
                y="${y + 9}"
                text-anchor="middle"
                font-size="6"
                font-weight="700"
                fill="#ffffff"
              >${row.label}</text>

              <text
                x="145"
                y="${y + 18}"
                text-anchor="middle"
                font-size="7"
                font-weight="700"
                fill="#ffffff"
              >${row.value}</text>
            `;
          })
          .join("")}
      </svg>
    `;

    const docDefinition: any = {
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [
        20,
        18,
        20,
        22,
      ],

      defaultStyle: {
        font: "Roboto",
        fontSize: 7.2,
        color: "#334155",
      },

      footer: (
        currentPage: number,
        pageCount: number,
      ) => ({
        margin: [
          20,
          0,
          20,
          7,
        ],

        columns: [
          {
            text:
              "SERNEM  |  HSE MANAGEMENT SYSTEM",
            fontSize: 5.8,
            bold: true,
            color: "#64748b",
          },

          {
            text:
              `${reportId}   •   ${currentPage}/${pageCount}`,
            alignment:
              "right",
            fontSize: 5.8,
            color: "#94a3b8",
          },
        ],
      }),

      content: [
        /* =====================================================
           PAGE 1 HEADER
        ===================================================== */

        {
          table: {
            widths: [
              "*",
              260,
            ],

            body: [[
              {
                border: [
                  false,
                  false,
                  false,
                  false,
                ],
                fillColor:
                  "#071a33",

                margin: [
                  16,
                  9,
                  12,
                  9,
                ],

                stack: [
                  {
                    text: "SERNEM",
                    fontSize: 20,
                    bold: true,
                    color: "#ffffff",
                    characterSpacing: 2,
                  },

                  {
                    text:
                      isTurkish
                        ? "HSE YÖNETİM DASHBOARD"
                        : "HSE MANAGEMENT DASHBOARD",
                    fontSize: 8.5,
                    bold: true,
                    color: "#60a5fa",
                    margin: [
                      0,
                      3,
                      0,
                      0,
                    ],
                  },
                ],
              },

              {
                border: [
                  false,
                  false,
                  false,
                  false,
                ],
                fillColor:
                  "#0b2444",

                margin: [
                  12,
                  8,
                  14,
                  8,
                ],

                stack: [
                  {
                    text:
                      periodLabel.toUpperCase(),
                    fontSize: 10,
                    bold: true,
                    color: "#ffffff",
                    alignment:
                      "right",
                  },

                  {
                    text:
                      `${companyLabel}  •  ${projectLabel}`,
                    fontSize: 7,
                    bold: true,
                    color: "#bfdbfe",
                    alignment:
                      "right",
                    margin: [
                      0,
                      3,
                      0,
                      0,
                    ],
                  },

                  {
                    text:
                      `${reportId}  |  ${generatedDate}`,
                    fontSize: 5.8,
                    color: "#94a3b8",
                    alignment:
                      "right",
                    margin: [
                      0,
                      4,
                      0,
                      0,
                    ],
                  },
                ],
              },
            ]],
          },

          layout: "noBorders",
        },

        /* KPI BAND */

        {
          margin: [
            0,
            7,
            0,
            0,
          ],

          table: {
            widths: [
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
            ],

            body: [[
              {
                stack: [
                  {
                    text:
                      isTurkish
                        ? "ÇALIŞMA SAATİ"
                        : "WORKED HOURS",
                    style:
                      "miniLabel",
                  },
                  {
                    text:
                      fmt(
                        incidentMetrics.worked_hours,
                      ),
                    style:
                      "kpiDark",
                  },
                ],
              },

              {
                stack: [
                  {
                    text:
                      "RECORDABLE",
                    style:
                      "miniLabel",
                  },
                  {
                    text:
                      String(
                        incidentMetrics.recordable_cases,
                      ),
                    style:
                      "kpiDark",
                  },
                ],
              },

              {
                stack: [
                  {
                    text: "TRIR",
                    style:
                      "miniLabel",
                  },
                  {
                    text:
                      rate(
                        kpiValues.trir,
                      ),
                    style:
                      "kpiBlue",
                  },
                ],
              },

              {
                stack: [
                  {
                    text: "LTIFR",
                    style:
                      "miniLabel",
                  },
                  {
                    text:
                      rate(
                        kpiValues.ltifr,
                      ),
                    style:
                      "kpiGreen",
                  },
                ],
              },

              {
                stack: [
                  {
                    text: "DART",
                    style:
                      "miniLabel",
                  },
                  {
                    text:
                      rate(
                        kpiValues.dart,
                      ),
                    style:
                      "kpiAmber",
                  },
                ],
              },

              {
                stack: [
                  {
                    text:
                      isTurkish
                        ? "ŞİDDET"
                        : "SEVERITY",
                    style:
                      "miniLabel",
                  },
                  {
                    text:
                      rate(
                        kpiValues.severityRate,
                      ),
                    style:
                      "kpiPurple",
                  },
                ],
              },
            ]],
          },

          layout: {
            fillColor:
              "#f8fafc",
            hLineColor:
              "#d8e2ec",
            vLineColor:
              "#d8e2ec",

            paddingTop:
              () => 6,
            paddingBottom:
              () => 6,
          },
        },

        /* PAGE 1 TOP GRID */

        {
          margin: [
            0,
            8,
            0,
            0,
          ],

          columns: [
            {
              width: 175,

              stack: [
                {
                  text:
                    isTurkish
                      ? "AKSİYON DURUMU"
                      : "ACTION STATUS",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    actionDonut,
                  width: 128,
                  alignment:
                    "center",
                },

                {
                  columns: [
                    {
                      text:
                        `● ${isTurkish ? "Kapalı" : "Closed"} ${closedActions}`,
                      fontSize: 6,
                      color:
                        "#10b981",
                    },
                    {
                      text:
                        `● ${isTurkish ? "Açık" : "Open"} ${openActions}`,
                      fontSize: 6,
                      color:
                        "#ef4444",
                      alignment:
                        "right",
                    },
                  ],
                },

                {
                  margin: [
                    0,
                    5,
                    0,
                    0,
                  ],

                  table: {
                    widths: [
                      "*",
                      "*",
                    ],

                    body: [
                      [
                        {
                          text:
                            isTurkish
                              ? "Gecikmiş"
                              : "Overdue",
                          style:
                            "tinyLabel",
                        },
                        {
                          text:
                            isTurkish
                              ? "Kapanma"
                              : "Closure",
                          style:
                            "tinyLabel",
                        },
                      ],

                      [
                        {
                          text:
                            String(
                              overdueActions,
                            ),
                          style:
                            "redStat",
                        },
                        {
                          text:
                            `${closureRate}%`,
                          style:
                            "greenStat",
                        },
                      ],
                    ],
                  },

                  layout: {
                    fillColor:
                      "#f8fafc",
                    hLineColor:
                      "#e2e8f0",
                    vLineColor:
                      "#e2e8f0",
                  },
                },
              ],
            },

            {
              width: "*",

              stack: [
                {
                  text:
                    isTurkish
                      ? "12 AYLIK KPI TRENDİ"
                      : "12-MONTH KPI TREND",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    trendSvg,
                  width: 420,
                  alignment:
                    "center",
                },

                {
                  columns: [
                    {
                      text:
                        "● TRIR",
                      color:
                        "#2563eb",
                    },
                    {
                      text:
                        "● DART",
                      color:
                        "#f59e0b",
                    },
                    {
                      text:
                        "● LTIFR",
                      color:
                        "#10b981",
                    },
                    {
                      text:
                        isTurkish
                          ? "● Şiddet"
                          : "● Severity",
                      color:
                        "#7c3aed",
                    },
                  ],

                  fontSize: 6,
                  bold: true,
                  margin: [
                    25,
                    0,
                    25,
                    0,
                  ],
                },
              ],
            },

            {
              width: 220,

              stack: [
                {
                  text:
                    isTurkish
                      ? "OLAY PİRAMİDİ"
                      : "INCIDENT PYRAMID",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    pyramidSvg,
                  width: 205,
                  alignment:
                    "center",
                },
              ],
            },
          ],

          columnGap: 10,
        },

        /* PAGE 1 LOWER GRID */

        {
          margin: [
            0,
            7,
            0,
            0,
          ],

          columns: [
            {
              width: "*",

              stack: [
                {
                  text:
                    isTurkish
                      ? "KATEGORİ DAĞILIMI"
                      : "CATEGORY BREAKDOWN",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    categorySvg,
                  width: 310,
                },
              ],
            },

            {
              width: 190,

              stack: [
                {
                  text:
                    isTurkish
                      ? "GÖZLEM TİPİ"
                      : "OBSERVATION TYPE",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    observationDonut,
                  width: 118,
                  alignment:
                    "center",
                },

                {
                  text:
                    `${isTurkish ? "Pozitif" : "Positive"} ${positive}  •  UA ${unsafeAct}  •  UC ${unsafeCondition}`,
                  fontSize: 5.8,
                  color: "#64748b",
                  alignment:
                    "center",
                },
              ],
            },

            {
              width: 240,

              stack: [
                {
                  text:
                    isTurkish
                      ? "ÖNCÜ GÖSTERGELER"
                      : "LEADING INDICATORS",
                  style:
                    "panelTitle",
                },

                {
                  table: {
                    widths: [
                      "*",
                      55,
                    ],

                    body: [
                      [
                        isTurkish
                          ? "İnceleme"
                          : "Inspections",
                        {
                          text:
                            fmt(
                              incidentMetrics.inspection_count,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],

                      [
                        "Toolbox Talk",
                        {
                          text:
                            fmt(
                              incidentMetrics.toolbox_talk_count,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],

                      [
                        isTurkish
                          ? "Eğitim Saati"
                          : "Training Hours",
                        {
                          text:
                            fmt(
                              incidentMetrics.training_hours,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],

                      [
                        isTurkish
                          ? "Yönetim Walkdown"
                          : "Management Walkdown",
                        {
                          text:
                            fmt(
                              incidentMetrics.management_walkdown_count,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],
                    ],
                  },

                  layout: {
                    fillColor: (
                      row: number,
                    ) =>
                      row % 2 === 0
                        ? "#f8fafc"
                        : "#ffffff",

                    hLineColor:
                      "#dbe5ef",
                    vLineColor:
                      "#dbe5ef",

                    paddingTop:
                      () => 5,
                    paddingBottom:
                      () => 5,
                  },
                },

                {
                  margin: [
                    0,
                    6,
                    0,
                    0,
                  ],

                  table: {
                    widths: [
                      "*",
                      "*",
                      "*",
                      "*",
                    ],

                    body: [[
                      {
                        stack: [
                          {
                            text:
                              isTurkish ? "AÇIK KRİTİK" : "OPEN CRIT",
                            style:
                              "tinyLabel",
                          },
                          {
                            text:
                              String(
                                riskCounts.critical,
                              ),
                            style:
                              "redStat",
                          },
                        ],
                      },

                      {
                        stack: [
                          {
                            text:
                              isTurkish ? "AÇIK YÜKSEK" : "OPEN HIGH",
                            style:
                              "tinyLabel",
                          },
                          {
                            text:
                              String(
                                riskCounts.high,
                              ),
                            style:
                              "amberStat",
                          },
                        ],
                      },

                      {
                        stack: [
                          {
                            text:
                              "MED",
                            style:
                              "tinyLabel",
                          },
                          {
                            text:
                              String(
                                riskCounts.medium,
                              ),
                            style:
                              "blueStat",
                          },
                        ],
                      },

                      {
                        stack: [
                          {
                            text:
                              "LOW",
                            style:
                              "tinyLabel",
                          },
                          {
                            text:
                              String(
                                riskCounts.low,
                              ),
                            style:
                              "greenStat",
                          },
                        ],
                      },
                    ]],
                  },

                  layout: {
                    fillColor:
                      "#f8fafc",
                    hLineColor:
                      "#dbe5ef",
                    vLineColor:
                      "#dbe5ef",
                  },
                },
              ],
            },
          ],

          columnGap: 10,
        },

        /* =====================================================
           PAGE 2
        ===================================================== */

        {
          text: "",
          pageBreak:
            "before",
        },

        {
          table: {
            widths: [
              "*",
              260,
            ],

            body: [[
              {
                border: [
                  false,
                  false,
                  false,
                  false,
                ],
                fillColor:
                  "#071a33",

                margin: [
                  16,
                  9,
                  12,
                  9,
                ],

                stack: [
                  {
                    text:
                      "SERNEM",
                    fontSize: 20,
                    bold: true,
                    color: "#ffffff",
                    characterSpacing: 2,
                  },

                  {
                    text:
                      isTurkish
                        ? "AKSİYON & GÖZLEM ANALİTİĞİ"
                        : "ACTION & OBSERVATION ANALYTICS",
                    fontSize: 8.5,
                    bold: true,
                    color: "#60a5fa",
                    margin: [
                      0,
                      3,
                      0,
                      0,
                    ],
                  },
                ],
              },

              {
                border: [
                  false,
                  false,
                  false,
                  false,
                ],
                fillColor:
                  "#0b2444",

                margin: [
                  12,
                  8,
                  14,
                  8,
                ],

                stack: [
                  {
                    text:
                      periodLabel.toUpperCase(),
                    fontSize: 10,
                    bold: true,
                    color: "#ffffff",
                    alignment:
                      "right",
                  },

                  {
                    text:
                      `${companyLabel}  •  ${projectLabel}`,
                    fontSize: 7,
                    color: "#bfdbfe",
                    alignment:
                      "right",
                    margin: [
                      0,
                      3,
                      0,
                      0,
                    ],
                  },
                ],
              },
            ]],
          },

          layout:
            "noBorders",
        },

        /* PAGE 2 TOP */

        {
          margin: [
            0,
            8,
            0,
            0,
          ],

          columns: [
            {
              width: "*",

              stack: [
                {
                  text:
                    isTurkish
                      ? "AKSİYON SORUMLUSU DAĞILIMI"
                      : "ACTION RESPONSIBLE BREAKDOWN",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    responsibleSvg,
                  width: 555,
                },
              ],
            },

            {
              width: 250,

              stack: [
                {
                  text:
                    isTurkish
                      ? "AÇIK RİSK DAĞILIMI"
                      : "OPEN RISK BREAKDOWN",
                  style:
                    "panelTitle",
                },

                {
                  table: {
                    widths: [
                      "*",
                      50,
                    ],

                    body: [
                      [
                        {
                          text:
                            "Critical",
                          color:
                            "#dc2626",
                          bold: true,
                        },
                        {
                          text:
                            String(
                              riskCounts.critical,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],
                      [
                        {
                          text:
                            "High",
                          color:
                            "#ea580c",
                          bold: true,
                        },
                        {
                          text:
                            String(
                              riskCounts.high,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],
                      [
                        {
                          text:
                            "Medium",
                          color:
                            "#d97706",
                          bold: true,
                        },
                        {
                          text:
                            String(
                              riskCounts.medium,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],
                      [
                        {
                          text:
                            "Low",
                          color:
                            "#059669",
                          bold: true,
                        },
                        {
                          text:
                            String(
                              riskCounts.low,
                            ),
                          bold: true,
                          alignment:
                            "right",
                        },
                      ],
                    ],
                  },

                  layout: {
                    fillColor: (
                      row: number,
                    ) =>
                      row % 2 === 0
                        ? "#f8fafc"
                        : "#ffffff",

                    hLineColor:
                      "#dbe5ef",
                    vLineColor:
                      "#dbe5ef",
                  },
                },

                {
                  text:
                    isTurkish
                      ? "AKSİYON KAPANIŞI"
                      : "ACTION CLOSURE",
                  style:
                    "panelTitle",
                  margin: [
                    0,
                    10,
                    0,
                    4,
                  ],
                },

                {
                  table: {
                    widths: [
                      "*",
                      "*",
                      "*",
                    ],

                    body: [[
                      {
                        stack: [
                          {
                            text:
                              isTurkish
                                ? "AÇIK"
                                : "OPEN",
                            style:
                              "tinyLabel",
                          },
                          {
                            text:
                              String(
                                openActions,
                              ),
                            style:
                              "redStat",
                          },
                        ],
                      },

                      {
                        stack: [
                          {
                            text:
                              isTurkish
                                ? "GECİKMİŞ"
                                : "OVERDUE",
                            style:
                              "tinyLabel",
                          },
                          {
                            text:
                              String(
                                overdueActions,
                              ),
                            style:
                              "amberStat",
                          },
                        ],
                      },

                      {
                        stack: [
                          {
                            text:
                              isTurkish
                                ? "KAPALI"
                                : "CLOSED",
                            style:
                              "tinyLabel",
                          },
                          {
                            text:
                              String(
                                closedActions,
                              ),
                            style:
                              "greenStat",
                          },
                        ],
                      },
                    ]],
                  },

                  layout: {
                    fillColor:
                      "#f8fafc",
                    hLineColor:
                      "#dbe5ef",
                    vLineColor:
                      "#dbe5ef",
                  },
                },
              ],
            },
          ],

          columnGap: 12,
        },

        /* PAGE 2 ANALYTICS GRID */

        {
          margin: [
            0,
            10,
            0,
            0,
          ],

          columns: [
            {
              width: "*",

              stack: [
                {
                  text:
                    isTurkish
                      ? "NEGATİF GÖZLEM KIRILIMI"
                      : "NEGATIVE OBSERVATION BREAKDOWN",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    negativeSvg,
                  width: 325,
                },
              ],
            },

            {
              width: "*",

              stack: [
                {
                  text:
                    isTurkish
                      ? "LOKASYON DAĞILIMI"
                      : "LOCATION BREAKDOWN",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    locationSvg,
                  width: 305,
                },
              ],
            },

            {
              width: "*",

              stack: [
                {
                  text:
                    isTurkish
                      ? "ŞİRKET DAĞILIMI"
                      : "COMPANY BREAKDOWN",
                  style:
                    "panelTitle",
                },

                {
                  svg:
                    companySvg,
                  width: 305,
                },
              ],
            },
          ],

          columnGap: 12,
        },

        /* INCIDENT EXECUTIVE BAND */

        {
          text:
            isTurkish
              ? "OLAY PERFORMANSI"
              : "INCIDENT PERFORMANCE",
          style:
            "panelTitle",
          margin: [
            0,
            11,
            0,
            5,
          ],
        },

        {
          table: {
            widths: [
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
            ],

            body: [[
              {
                stack: [
                  {
                    text:
                      "RECORDABLE",
                    style:
                      "tinyLabel",
                  },

                  {
                    text:
                      String(
                        incidentMetrics.recordable_cases,
                      ),
                    style:
                      "blueStat",
                  },
                ],
              },

              {
                stack: [
                  {
                    text:
                      "LTI",
                    style:
                      "tinyLabel",
                  },

                  {
                    text:
                      String(
                        incidentMetrics.lti,
                      ),
                    style:
                      "redStat",
                  },
                ],
              },

              {
                stack: [
                  {
                    text:
                      isTurkish
                        ? "KAYIP GÜN"
                        : "LOST DAYS",
                    style:
                      "tinyLabel",
                  },

                  {
                    text:
                      String(
                        incidentMetrics.lost_days,
                      ),
                    style:
                      "amberStat",
                  },
                ],
              },

              {
                stack: [
                  {
                    text:
                      "FIRST AID",
                    style:
                      "tinyLabel",
                  },

                  {
                    text:
                      String(
                        incidentMetrics.first_aid,
                      ),
                    style:
                      "greenStat",
                  },
                ],
              },

              {
                stack: [
                  {
                    text:
                      "NEAR MISS",
                    style:
                      "tinyLabel",
                  },

                  {
                    text:
                      String(
                        incidentMetrics.near_miss,
                      ),
                    style:
                      "greenStat",
                  },
                ],
              },

              {
                stack: [
                  {
                    text:
                      "MTC",
                    style:
                      "tinyLabel",
                  },

                  {
                    text:
                      String(
                        incidentMetrics.medical_treatment,
                      ),
                    style:
                      "blueStat",
                  },
                ],
              },
            ]],
          },

          layout: {
            fillColor:
              "#f8fafc",

            hLineColor:
              "#dbe5ef",

            vLineColor:
              "#dbe5ef",

            paddingTop:
              () => 7,

            paddingBottom:
              () => 7,
          },
        },

        /* PAGE 2 LOWER */

        {
          margin: [
            0,
            10,
            0,
            0,
          ],

          columns: [
            {
              width: "*",

              stack: [
                {
                  text:
                    isTurkish
                      ? "ÖNCELİKLİ AÇIK AKSİYONLAR"
                      : "PRIORITY OPEN ACTIONS",
                  style:
                    "panelTitle",
                },

                {
                  table: {
                    headerRows: 1,

                    widths: [
                      "*",
                      62,
                      120,
                      82,
                    ],

                    body: [
                      [
                        {
                          text:
                            isTurkish
                              ? "Bulgu"
                              : "Finding",
                          style:
                            "tableHead",
                        },

                        {
                          text:
                            "Risk",
                          style:
                            "tableHead",
                        },

                        {
                          text:
                            isTurkish
                              ? "Sorumlu"
                              : "Responsible",
                          style:
                            "tableHead",
                        },

                        {
                          text:
                            isTurkish
                              ? "Hedef"
                              : "Due",
                          style:
                            "tableHead",
                        },
                      ],

                      ...(
                        topFindings.length
                          ? topFindings.map(
                              (x) => [
                                x.title,
                                x.risk_level.toUpperCase(),
                                x.responsible_person ??
                                  "—",
                                x.target_date ??
                                  "—",
                              ],
                            )
                          : [[
                              isTurkish
                                ? "Açık bulgu bulunmuyor."
                                : "No open findings.",
                              "—",
                              "—",
                              "—",
                            ]]
                      ),
                    ],
                  },

                  layout: {
                    fillColor: (
                      row: number,
                    ) =>
                      row === 0
                        ? "#0f2746"
                        : row % 2 === 0
                          ? "#f8fafc"
                          : "#ffffff",

                    hLineColor:
                      "#dbe5ef",
                    vLineColor:
                      "#dbe5ef",

                    paddingLeft:
                      () => 6,
                    paddingRight:
                      () => 6,
                    paddingTop:
                      () => 5,
                    paddingBottom:
                      () => 5,
                  },
                },
              ],
            },
          ],
        },

        {
          text:
            isTurkish
              ? "DOKÜMAN KONTROLÜ"
              : "DOCUMENT CONTROL",
          style:
            "panelTitle",
          margin: [
            0,
            10,
            0,
            4,
          ],
        },

        /* DOCUMENT CONTROL */

        {
          margin: [
            0,
            10,
            0,
            0,
          ],

          table: {
            widths: [
              "*",
              "*",
              "*",
              55,
            ],

            body: [
              [
                {
                  text:
                    isTurkish
                      ? "Hazırlayan"
                      : "Prepared by",
                  style:
                    "docHead",
                },

                {
                  text:
                    isTurkish
                      ? "Kontrol Eden"
                      : "Reviewed by",
                  style:
                    "docHead",
                },

                {
                  text:
                    isTurkish
                      ? "Onaylayan"
                      : "Approved by",
                  style:
                    "docHead",
                },

                {
                  text:
                    "Rev.",
                  style:
                    "docHead",
                  alignment:
                    "center",
                },
              ],

              [
                preparedLabel,
                reviewedLabel,
                approvedLabel,
                {
                  text:
                    revisionLabel,
                  bold: true,
                  alignment:
                    "center",
                },
              ],
            ],
          },

          layout: {
            fillColor: (
              row: number,
            ) =>
              row === 0
                ? "#eaf1f8"
                : "#ffffff",

            hLineColor:
              "#cbd5e1",
            vLineColor:
              "#cbd5e1",

            paddingTop:
              () => 5,
            paddingBottom:
              () => 5,
          },
        },
      ],

      styles: {
        panelTitle: {
          fontSize: 7.8,
          bold: true,
          color: "#0f2746",
          characterSpacing: 0.4,
          margin: [
            0,
            0,
            0,
            4,
          ],
        },

        miniLabel: {
          fontSize: 5.2,
          bold: true,
          color: "#64748b",
          alignment:
            "center",
        },

        tinyLabel: {
          fontSize: 5.2,
          bold: true,
          color: "#64748b",
          alignment:
            "center",
        },

        kpiDark: {
          fontSize: 16,
          bold: true,
          color: "#0f172a",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        kpiBlue: {
          fontSize: 16,
          bold: true,
          color: "#2563eb",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        kpiGreen: {
          fontSize: 16,
          bold: true,
          color: "#059669",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        kpiAmber: {
          fontSize: 16,
          bold: true,
          color: "#d97706",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        kpiPurple: {
          fontSize: 16,
          bold: true,
          color: "#7c3aed",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        redStat: {
          fontSize: 13,
          bold: true,
          color: "#dc2626",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        amberStat: {
          fontSize: 13,
          bold: true,
          color: "#d97706",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        greenStat: {
          fontSize: 13,
          bold: true,
          color: "#059669",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        blueStat: {
          fontSize: 13,
          bold: true,
          color: "#2563eb",
          alignment:
            "center",
          margin: [
            0,
            2,
            0,
            0,
          ],
        },

        tableHead: {
          fontSize: 6,
          bold: true,
          color: "#ffffff",
        },

        docHead: {
          fontSize: 5.5,
          bold: true,
          color: "#475569",
        },
      },
    };

    pdfMake
      .createPdf(
        docDefinition,
      )
      .download(
        `SERNEM-HSE-Dashboard-${selectedMonth}-${projectLabel
          .replace(
            /[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ]+/g,
            "-",
          )
          .replace(
            /^-+|-+$/g,
            "",
          )}.pdf`,
      );
  }


  async function downloadPdf() {
    const pdfMakeModule = await import("pdfmake/build/pdfmake");
    const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

    const pdfMake: any =
      (pdfMakeModule as any).default ?? pdfMakeModule;

    const pdfFonts: any =
      (pdfFontsModule as any).default ?? pdfFontsModule;

    pdfMake.vfs =
      pdfFonts.pdfMake?.vfs ??
      pdfFonts.vfs ??
      pdfFonts;

    const priorityFindings = reportData
      .filter(
        (x) =>
          x.status !== "closed" &&
          (x.risk_level === "critical" ||
            x.risk_level === "high"),
      )
      .slice(0, 10);

    const categoryRows = categories
      .slice(0, 8)
      .map((item) => [
        item.name,
        String(item.count),
        `${item.pct}%`,
      ]);

    const findingRows = priorityFindings.map(
      (item) => [
        item.title,
        item.risk_level.toUpperCase(),
        item.responsible_person ?? "—",
        item.target_date ?? "—",
      ],
    );

    const docDefinition: any = {
      pageSize: "A4",
      pageMargins: [38, 42, 38, 42],

      defaultStyle: {
        font: "Roboto",
        fontSize: 9,
        color: "#24374d",
      },

      content: [
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  stack: [
                    {
                      text: "SERNEM",
                      fontSize: 24,
                      bold: true,
                      color: "#ffffff",
                      characterSpacing: 2,
                    },
                    {
                      text: "HSE PERFORMANCE REPORT",
                      fontSize: 10,
                      bold: true,
                      color: "#67b7ff",
                      margin: [0, 5, 0, 0],
                    },
                    {
                      text: `${startDate} — ${endDate}`,
                      fontSize: 9,
                      color: "#c5d4e5",
                      margin: [0, 15, 0, 0],
                    },
                  ],
                  fillColor: "#06152b",
                  margin: [18, 16, 18, 16],
                },
              ],
            ],
          },
          layout: "noBorders",
        },

        {
          columns: [
            {
              width: "*",
              stack: [
                {
                  text: isTurkish
                    ? "TOPLAM GÖZLEM"
                    : "TOTAL OBSERVATIONS",
                  style: "kpiLabel",
                },
                {
                  text: String(stats.total),
                  style: "kpiValueBlue",
                },
              ],
            },
            {
              width: "*",
              stack: [
                {
                  text: "POSITIVE",
                  style: "kpiLabel",
                },
                {
                  text: String(stats.positive),
                  style: "kpiValueGreen",
                },
              ],
            },
            {
              width: "*",
              stack: [
                {
                  text: isTurkish
                    ? "GÜVENSİZ"
                    : "UNSAFE",
                  style: "kpiLabel",
                },
                {
                  text: String(
                    stats.unsafeAct +
                      stats.unsafeCondition,
                  ),
                  style: "kpiValueRed",
                },
              ],
            },
            {
              width: "*",
              stack: [
                {
                  text: isTurkish
                    ? "KAPANMA"
                    : "CLOSURE",
                  style: "kpiLabel",
                },
                {
                  text: `${stats.closureRate}%`,
                  style: "kpiValueGreen",
                },
              ],
            },
          ],
          columnGap: 10,
          margin: [0, 20, 0, 0],
        },

        {
          text: isTurkish
            ? "Yönetici Özeti"
            : "Management Summary",
          style: "sectionTitle",
        },

        {
          text: managementSummary,
          margin: [12, 10, 12, 10],
          fillColor: "#eef6ff",
          color: "#24374d",
          lineHeight: 1.35,
        },

        {
          text: isTurkish
            ? "Aksiyon Performansı"
            : "Action Performance",
          style: "sectionTitle",
        },

        {
          table: {
            widths: ["*", "*", "*", "*"],
            body: [
              [
                isTurkish ? "Açık" : "Open",
                isTurkish ? "Gecikmiş" : "Overdue",
                isTurkish ? "Kapalı" : "Closed",
                "Critical",
              ],
              [
                stats.open,
                stats.overdue,
                stats.closed,
                stats.critical,
              ],
            ],
          },
          layout: {
            fillColor: (rowIndex: number) =>
              rowIndex === 0 ? "#06152b" : "#f8fafc",
            hLineColor: "#dce5ee",
            vLineColor: "#dce5ee",
          },
        },

        {
          text: isTurkish
            ? "Kategori Dağılımı"
            : "Category Distribution",
          style: "sectionTitle",
        },

        {
          table: {
            headerRows: 1,
            widths: ["*", 70, 70],
            body: [
              [
                isTurkish ? "Kategori" : "Category",
                isTurkish ? "Adet" : "Count",
                "%",
              ],
              ...(categoryRows.length
                ? categoryRows
                : [["—", "0", "0%"]]),
            ],
          },
          layout: "lightHorizontalLines",
        },

        {
          text: isTurkish
            ? "Öncelikli Bulgular"
            : "Priority Findings",
          style: "sectionTitle",
        },

        {
          table: {
            headerRows: 1,
            widths: ["*", 65, 95, 70],
            body: [
              [
                isTurkish ? "Bulgu" : "Finding",
                "Risk",
                isTurkish ? "Sorumlu" : "Responsible",
                isTurkish ? "Hedef" : "Due",
              ],
              ...(findingRows.length
                ? findingRows
                : [
                    [
                      isTurkish
                        ? "Açık High / Critical bulgu yok"
                        : "No open High / Critical findings",
                      "—",
                      "—",
                      "—",
                    ],
                  ]),
            ],
          },
          layout: "lightHorizontalLines",
        },

        {
          text:
            "Generated by SERNEM HSE Management Platform",
          fontSize: 7,
          color: "#64748b",
          margin: [0, 30, 0, 0],
        },
      ],

      styles: {
        sectionTitle: {
          fontSize: 13,
          bold: true,
          color: "#0f172a",
          margin: [0, 22, 0, 9],
        },

        kpiLabel: {
          fontSize: 7,
          bold: true,
          color: "#64748b",
        },

        kpiValueBlue: {
          fontSize: 23,
          bold: true,
          color: "#2563eb",
          margin: [0, 5, 0, 0],
        },

        kpiValueGreen: {
          fontSize: 23,
          bold: true,
          color: "#059669",
          margin: [0, 5, 0, 0],
        },

        kpiValueRed: {
          fontSize: 23,
          bold: true,
          color: "#dc2626",
          margin: [0, 5, 0, 0],
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(
        `SERNEM-HSE-Report-${startDate}-${endDate}.pdf`,
      );
  }

  return (
    <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/80">
      <div className="border-b border-slate-800 bg-gradient-to-r from-[#07182d] to-[#0a2948] p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
          04 • REPORTING
        </p>

        <div className="mt-2 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-2xl font-black">
              {isTurkish
                ? "Otomatik HSE Raporlama"
                : "Automated HSE Reporting"}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {isTurkish
                ? "Haftalık veya aylık performans raporlarını gerçek saha verilerinden oluşturun."
                : "Generate weekly or monthly performance reports from live field data."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const query = new URLSearchParams({
                  month: selectedMonth,
                  project: selectedProject,
                });

                window.location.href =
                  `/${locale}/hse-performance/report?${query.toString()}`;
              }}
              disabled={!incidentMetrics}
              className="rounded-xl border border-cyan-400/30 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-[0_10px_30px_rgba(37,99,235,.22)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isTurkish
                ? "HSE Performance PDF"
                : "HSE Performance PDF"}
            </button>

            <button
              type="button"
              onClick={() => {
                const query =
                  new URLSearchParams({
                    start: startDate,
                    end: endDate,
                    company: reportCompany,
                    preparedBy,
                  });

                window.location.href =
                  `/${locale}/hse-performance/field-report?${query.toString()}`;
              }}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500"
            >
              {isTurkish ? "Saha Raporu PDF" : "Field Report PDF"}
            </button>

            <button
              type="button"
              onClick={exportExcel}
              className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-5 py-3 text-sm font-black text-emerald-300 transition hover:bg-emerald-500/20"
            >
              Excel .xlsx
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-800 bg-[#061524] px-6 py-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-400">
              {isTurkish ? "Doküman Kontrolü" : "Document Control"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {isTurkish
                ? "Kurumsal PDF raporunda gösterilecek bilgiler."
                : "Information shown in the corporate PDF report."}
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input
            value={reportCompany}
            onChange={(e) => setReportCompany(e.target.value)}
            placeholder={isTurkish ? "Şirket" : "Company"}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-xs text-white outline-none focus:border-blue-500"
          />

          <input
            value={preparedBy}
            onChange={(e) => setPreparedBy(e.target.value)}
            placeholder={isTurkish ? "Hazırlayan" : "Prepared by"}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-xs text-white outline-none focus:border-blue-500"
          />

          <input
            value={reviewedBy}
            onChange={(e) => setReviewedBy(e.target.value)}
            placeholder={isTurkish ? "Kontrol Eden" : "Reviewed by"}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-xs text-white outline-none focus:border-blue-500"
          />

          <input
            value={approvedBy}
            onChange={(e) => setApprovedBy(e.target.value)}
            placeholder={isTurkish ? "Onaylayan" : "Approved by"}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-xs text-white outline-none focus:border-blue-500"
          />

          <input
            value={reportRevision}
            onChange={(e) => setReportRevision(e.target.value)}
            placeholder="Rev. 00"
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-xs text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-5 p-6 xl:grid-cols-[0.75fr_1.25fr]">

        <div>
          <div className="grid grid-cols-3 gap-2">
            {[
              [
                "weekly",
                isTurkish
                  ? "Haftalık"
                  : "Weekly",
              ],
              [
                "monthly",
                isTurkish
                  ? "Aylık"
                  : "Monthly",
              ],
              [
                "custom",
                isTurkish
                  ? "Özel"
                  : "Custom",
              ],
            ].map(([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  chooseReportType(
                    type as
                      | "weekly"
                      | "monthly"
                      | "custom",
                  )
                }
                className={`rounded-xl px-3 py-3 text-xs font-black ${
                  reportType === type
                    ? "bg-blue-600 text-white"
                    : "border border-slate-700 bg-slate-950/60 text-slate-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                {isTurkish
                  ? "Başlangıç"
                  : "Start"}
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setReportType("custom");
                  setStartDate(
                    e.target.value,
                  );
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                {isTurkish
                  ? "Bitiş"
                  : "End"}
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setReportType("custom");
                  setEndDate(
                    e.target.value,
                  );
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm"
              />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-400">
              {isTurkish
                ? "Yönetici Özeti"
                : "Management Summary"}
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              {managementSummary}
            </p>
          </div>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [
                isTurkish
                  ? "Toplam"
                  : "Total",
                stats.total,
                "text-blue-300",
              ],
              [
                "Positive",
                stats.positive,
                "text-emerald-300",
              ],
              [
                isTurkish
                  ? "Açık"
                  : "Open",
                stats.open,
                "text-orange-300",
              ],
              [
                isTurkish
                  ? "Kapanma"
                  : "Closure",
                `${stats.closureRate}%`,
                "text-emerald-300",
              ],
            ].map(
              ([label, value, color]) => (
                <div
                  key={String(label)}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>

                  <p
                    className={`mt-2 text-3xl font-black ${color}`}
                  >
                    {value}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-sm font-black">
                {isTurkish
                  ? "Kategori Dağılımı"
                  : "Category Distribution"}
              </p>

              <div className="mt-4 space-y-3">
                {categories
                  .slice(0, 6)
                  .map((item) => (
                    <div
                      key={item.name}
                    >
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">
                          {item.name}
                        </span>

                        <b>
                          {item.count} •{" "}
                          {item.pct}%
                        </b>
                      </div>

                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{
                            width: `${item.pct}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-sm font-black">
                {isTurkish
                  ? "Öncelikli Bulgular"
                  : "Priority Findings"}
              </p>

              <div className="mt-4 space-y-3">
                {reportData
                  .filter(
                    (x) =>
                      x.status !==
                        "closed" &&
                      (x.risk_level ===
                        "critical" ||
                        x.risk_level ===
                          "high"),
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-red-500/15 bg-red-500/[0.04] p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-bold">
                          {item.title}
                        </p>

                        <span className="rounded-full bg-red-500/15 px-2 py-1 text-[9px] font-black uppercase text-red-300">
                          {item.risk_level}
                        </span>
                      </div>
                    </div>
                  ))}

                {stats.high +
                  stats.critical ===
                  0 && (
                  <p className="py-8 text-center text-xs text-slate-500">
                    {isTurkish
                      ? "Açık High / Critical bulgu yok."
                      : "No open High / Critical findings."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
