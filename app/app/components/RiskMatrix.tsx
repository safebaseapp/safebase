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

  doc.setFontSize(22);
  doc.text("SAFEBASE", 20, 20);

  doc.setFontSize(16);
  doc.text("Risk Matrix Report", 20, 35);

  doc.setFontSize(12);
  doc.text(`Likelihood: ${likelihood}`, 20, 55);
  doc.text(`Severity: ${severity}`, 20, 65);
  doc.text(`Risk Score: ${score}`, 20, 75);
  doc.text(`Risk Level: ${risk.label}`, 20, 85);

  doc.save("RiskMatrixReport.pdf");
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