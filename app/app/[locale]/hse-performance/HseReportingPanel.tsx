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

type Props = {
  locale: Locale;
  observations: Observation[];
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
}: Props) {
  const isTurkish = locale === "tr";

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
    const XLSX = await import("xlsx");

    const rows = reportData.map(
      (item, index) => ({
        No: index + 1,
        Date: item.observation_date,
        Project:
          item.project_name ?? "",
        Company:
          item.company_name ?? "",
        Location:
          item.location ?? "",
        Type:
          item.observation_type,
        Category: item.category,
        Risk: item.risk_level,
        Title: item.title,
        Description:
          item.description,
        Corrective_Action:
          item.corrective_action ?? "",
        Responsible:
          item.responsible_person ?? "",
        Target_Date:
          item.target_date ?? "",
        Status: item.status,
        Overdue: isOverdue(item)
          ? "YES"
          : "NO",
      }),
    );

    const summaryRows = [
      ["SERNEM HSE REPORT"],
      [],
      ["Period", `${startDate} - ${endDate}`],
      ["Total Observations", stats.total],
      ["Positive", stats.positive],
      ["Unsafe Acts", stats.unsafeAct],
      [
        "Unsafe Conditions",
        stats.unsafeCondition,
      ],
      ["Open Actions", stats.open],
      ["Overdue Actions", stats.overdue],
      ["Closed Actions", stats.closed],
      [
        "Closure Rate",
        `${stats.closureRate}%`,
      ],
      [
        "Open Critical",
        stats.critical,
      ],
      ["Open High", stats.high],
      [],
      ["Management Summary"],
      [managementSummary],
    ];

    const wb =
      XLSX.utils.book_new();

    const summarySheet =
      XLSX.utils.aoa_to_sheet(
        summaryRows,
      );

    const dataSheet =
      XLSX.utils.json_to_sheet(rows);

    const categorySheet =
      XLSX.utils.json_to_sheet(
        categories.map((x) => ({
          Category: x.name,
          Count: x.count,
          Percentage: `${x.pct}%`,
        })),
      );

    XLSX.utils.book_append_sheet(
      wb,
      summarySheet,
      "Summary",
    );

    XLSX.utils.book_append_sheet(
      wb,
      dataSheet,
      "Observations",
    );

    XLSX.utils.book_append_sheet(
      wb,
      categorySheet,
      "Categories",
    );

    XLSX.writeFile(
      wb,
      `SERNEM-HSE-Report-${startDate}-${endDate}.xlsx`,
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
              onClick={downloadPdf}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500"
            >
              PDF Report
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
