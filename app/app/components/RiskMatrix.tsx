"use client";

import jsPDF from "jspdf";
import { useMemo, useState } from "react";

const likelihoodOptions = [
  { value: 1, label: "Rare" },
  { value: 2, label: "Unlikely" },
  { value: 3, label: "Possible" },
  { value: 4, label: "Likely" },
  { value: 5, label: "Almost Certain" },
];

const severityOptions = [
  { value: 1, label: "Insignificant" },
  { value: 2, label: "Minor" },
  { value: 3, label: "Moderate" },
  { value: 4, label: "Major" },
  { value: 5, label: "Catastrophic" },
];

function getRiskLevel(score: number) {
  if (score <= 4) {
    return {
      label: "Low",
      cellClass: "bg-emerald-500 text-white",
      badgeClass: "border-emerald-300 bg-emerald-100 text-emerald-800",
    };
  }

  if (score <= 9) {
    return {
      label: "Medium",
      cellClass: "bg-yellow-400 text-slate-950",
      badgeClass: "border-yellow-300 bg-yellow-100 text-yellow-800",
    };
  }

  if (score <= 16) {
    return {
      label: "High",
      cellClass: "bg-orange-500 text-white",
      badgeClass: "border-orange-300 bg-orange-100 text-orange-800",
    };
  }

  return {
    label: "Extreme",
    cellClass: "bg-red-600 text-white",
    badgeClass: "border-red-300 bg-red-100 text-red-800",
  };
}

export default function RiskMatrix() {
  const [likelihood, setLikelihood] = useState(3);
  const [severity, setSeverity] = useState(3);

  const score = likelihood * severity;
  const risk = useMemo(() => getRiskLevel(score), [score]);
 const downloadPDF = () => {
  const doc = new jsPDF();

  const likelihoodLabel =
    likelihoodOptions.find((item) => item.value === likelihood)?.label ?? "";

  const severityLabel =
    severityOptions.find((item) => item.value === severity)?.label ?? "";

  const actions =
    recommendations[risk.label as keyof typeof recommendations] ?? [];

  const today = new Date().toLocaleDateString("en-GB");

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 34, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("SAFEBASE", 18, 16);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Safety tools and resources", 18, 24);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Risk Matrix Report", 18, 48);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated: ${today}`, 18, 56);

  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(18, 66, 174, 58, 3, 3);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.text("Likelihood", 26, 78);
  doc.text("Severity", 26, 94);
  doc.text("Risk Score", 108, 78);
  doc.text("Risk Level", 108, 94);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`${likelihood} - ${likelihoodLabel}`, 26, 85);
  doc.text(`${severity} - ${severityLabel}`, 26, 101);
  doc.text(String(score), 108, 85);
  doc.text(`${risk.label} Risk`, 108, 101);

  if (risk.label === "Low") {
    doc.setFillColor(16, 185, 129);
  } else if (risk.label === "Medium") {
    doc.setFillColor(250, 204, 21);
  } else if (risk.label === "High") {
    doc.setFillColor(249, 115, 22);
  } else {
    doc.setFillColor(239, 68, 68);
  }

  doc.roundedRect(108, 106, 52, 10, 5, 5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(`${risk.label.toUpperCase()} RISK`, 134, 113, {
    align: "center",
  });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.text("Recommended Actions", 18, 142);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  actions.forEach((action, index) => {
    const y = 154 + index * 10;
    doc.setTextColor(37, 99, 235);
    doc.text("•", 20, y);
    doc.setTextColor(51, 65, 85);
    doc.text(action, 28, y);
  });

 // Risk Matrix table
doc.setTextColor(15, 23, 42);
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("Risk Matrix", 18, 194);

const matrixX = 42;
const matrixY = 202;
const cellWidth = 25;
const cellHeight = 11;

doc.setFontSize(8);

// Likelihood headers
for (let likelihoodValue = 1; likelihoodValue <= 5; likelihoodValue++) {
  const x = matrixX + likelihoodValue * cellWidth;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(x, matrixY, cellWidth - 1, cellHeight - 1, 1, 1, "F");

  doc.setTextColor(15, 23, 42);
  doc.text(`L${likelihoodValue}`, x + (cellWidth - 1) / 2, matrixY + 7, {
    align: "center",
  });
}

// Top-left header
doc.setFillColor(241, 245, 249);
doc.roundedRect(
  matrixX,
  matrixY,
  cellWidth - 1,
  cellHeight - 1,
  1,
  1,
  "F"
);

doc.setTextColor(15, 23, 42);
doc.text("S × L", matrixX + (cellWidth - 1) / 2, matrixY + 7, {
  align: "center",
});

// Matrix rows
for (let severityValue = 5; severityValue >= 1; severityValue--) {
  const rowIndex = 5 - severityValue;
  const y = matrixY + (rowIndex + 1) * cellHeight;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(
    matrixX,
    y,
    cellWidth - 1,
    cellHeight - 1,
    1,
    1,
    "F"
  );

  doc.setTextColor(15, 23, 42);
  doc.text(`S${severityValue}`, matrixX + (cellWidth - 1) / 2, y + 7, {
    align: "center",
  });

  for (let likelihoodValue = 1; likelihoodValue <= 5; likelihoodValue++) {
    const cellScore = severityValue * likelihoodValue;
    const x = matrixX + likelihoodValue * cellWidth;

    if (cellScore <= 4) {
      doc.setFillColor(16, 185, 129);
    } else if (cellScore <= 9) {
      doc.setFillColor(250, 204, 21);
    } else if (cellScore <= 16) {
      doc.setFillColor(249, 115, 22);
    } else {
      doc.setFillColor(239, 68, 68);
    }

    doc.roundedRect(
      x,
      y,
      cellWidth - 1,
      cellHeight - 1,
      1,
      1,
      "F"
    );

    if (
      likelihoodValue === likelihood &&
      severityValue === severity
    ) {
      doc.setDrawColor(37, 99, 235);
      doc.setLineWidth(1.2);
      doc.roundedRect(
        x,
        y,
        cellWidth - 1,
        cellHeight - 1,
        1,
        1,
        "S"
      );
      doc.setLineWidth(0.2);
    }

    const useDarkText = cellScore > 4 && cellScore <= 9;

    doc.setTextColor(
      useDarkText ? 15 : 255,
      useDarkText ? 23 : 255,
      useDarkText ? 42 : 255
    );

    doc.text(String(cellScore), x + (cellWidth - 1) / 2, y + 7, {
      align: "center",
    });
  }
}

// Footer
doc.setDrawColor(226, 232, 240);
doc.line(18, 276, 192, 276);

doc.setTextColor(100, 116, 139);
doc.setFont("helvetica", "normal");
doc.setFontSize(8);

doc.text(
  "This report was generated automatically by SafeBase Risk Matrix Calculator.",
  18,
  284
);

doc.text(
  "safebase-hazel.vercel.app/tools/risk-matrix",
  18,
  290
);

  doc.save(`SafeBase-Risk-Matrix-${score}.pdf`);
};
  const recommendations = {
  Low: [
    "Continue with current controls",
    "Monitor the task",
  ],
  Medium: [
    "Review existing controls",
    "Supervisor awareness required",
    "Monitor during work",],
    
   
  High: [
    "Additional control measures required",
    "Supervisor approval required",
    "Review RAMS before starting",
  ],
  Extreme: [
    "STOP WORK immediately",
    "Engineering controls required",
    "Management approval required",
    "Risk assessment must be revised",
  ],
};

  return (
    <section id="risk-matrix" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Interactive calculator
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Risk Matrix Calculator
          </h2>

          <p className="mt-5 leading-7 text-slate-400">
            Select likelihood and severity to calculate the risk score and risk
            level instantly.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.3fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="grid gap-6">
              <label>
                <span className="text-sm font-medium text-slate-300">
                  Likelihood
                </span>

                <select
                  value={likelihood}
                  onChange={(event) =>
                    setLikelihood(Number(event.target.value))
                  }
                  className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400"
                >
                  {likelihoodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value} — {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-sm font-medium text-slate-300">
                  Severity
                </span>

                <select
                  value={severity}
                  onChange={(event) =>
                    setSeverity(Number(event.target.value))
                  }
                  className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400"
                >
                  {severityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value} — {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="text-sm text-slate-400">Risk score</div>
              <div className="mt-2 text-6xl font-bold">{score}</div>

              <div
  className={`mt-5 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${risk.badgeClass}`}
>
  {risk.label} Risk
</div>

<div className="mt-6 border-t border-white/10 pt-5">
  <div className="text-sm font-semibold text-white">
    Recommended Actions
  </div>

  <ul className="mt-3 space-y-2 text-sm text-slate-300">
    <li className="flex gap-2">
      <span className="text-blue-400">✓</span>
      <span>Review existing controls</span>
    </li>

    <li className="flex gap-2">
      <span className="text-blue-400">✓</span>
      <span>Supervisor awareness required</span>
    </li>

    <li className="flex gap-2">
      <span className="text-blue-400">✓</span>
      <span>Monitor during work</span>
    </li>
  </ul>
  <button
  type="button"
  onClick={downloadPDF}
  className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
>
  📄 Download PDF
</button>
const copyResult = async () => {
  const likelihoodLabel =
    likelihoodOptions.find((item) => item.value === likelihood)?.label ?? "";

  const severityLabel =
    severityOptions.find((item) => item.value === severity)?.label ?? "";

  const actions =
    recommendations[risk.label as keyof typeof recommendations] ?? [];

  const resultText = [
    "SAFEBASE Risk Matrix",
    "",
    `Likelihood: ${likelihood} - ${likelihoodLabel}`,
    `Severity: ${severity} - ${severityLabel}`,
    `Risk Score: ${score}`,
    `Risk Level: ${risk.label} Risk`,
    "",
    "Recommended Actions:",
    ...actions.map((action) => `• ${action}`),
  ].join("\n");

  await navigator.clipboard.writeText(resultText);
  alert("Result copied to clipboard.");
};
</div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white p-4 text-slate-950">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-6 gap-1 text-center text-sm font-semibold">
                <div className="flex items-center justify-center rounded-lg bg-slate-100 p-3">
                  S × L
                </div>

                {[1, 2, 3, 4, 5].map((value) => (
                  <div
                    key={value}
                    className="flex items-center justify-center rounded-lg bg-slate-100 p-3"
                  >
                    L{value}
                  </div>
                ))}

                {[5, 4, 3, 2, 1].map((severityValue) => (
                  <div key={severityValue} className="contents">
                    <div className="flex items-center justify-center rounded-lg bg-slate-100 p-3">
                      S{severityValue}
                    </div>

                    {[1, 2, 3, 4, 5].map((likelihoodValue) => {
                      const cellScore = severityValue * likelihoodValue;
                      const cellRisk = getRiskLevel(cellScore);
                      const isSelected =
                        severityValue === severity &&
                        likelihoodValue === likelihood;

                      return (
                        <div
                          key={`${severityValue}-${likelihoodValue}`}
                          className={`flex min-h-14 items-center justify-center rounded-lg p-3 font-bold ${cellRisk.cellClass} ${
                            isSelected
                              ? "ring-4 ring-blue-500 ring-offset-2 ring-offset-white"
                              : ""
                          }`}
                        >
                          {cellScore}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}