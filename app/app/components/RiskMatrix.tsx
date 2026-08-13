"use client";

import jsPDF from "jspdf";
import { useMemo, useState } from "react";

const likelihoodOptions = {
  tr: [
    { value: 1, label: "Nadir" },
    { value: 2, label: "Düşük Olasılık" },
    { value: 3, label: "Olası" },
    { value: 4, label: "Muhtemel" },
    { value: 5, label: "Neredeyse Kesin" },
  ],
  en: [
    { value: 1, label: "Rare" },
    { value: 2, label: "Unlikely" },
    { value: 3, label: "Possible" },
    { value: 4, label: "Likely" },
    { value: 5, label: "Almost Certain" },
  ],
};

const severityOptions = {
  tr: [
    { value: 1, label: "Önemsiz" },
    { value: 2, label: "Hafif" },
    { value: 3, label: "Orta" },
    { value: 4, label: "Ciddi" },
    { value: 5, label: "Felaket" },
  ],
  en: [
    { value: 1, label: "Insignificant" },
    { value: 2, label: "Minor" },
    { value: 3, label: "Moderate" },
    { value: 4, label: "Major" },
    { value: 5, label: "Catastrophic" },
  ],
};

function getRiskLevel(score: number, locale: "tr" | "en") {
  if (score <= 4) {
    return {
      label: locale === "tr" ? "Düşük" : "Low",
      cellClass: "bg-emerald-500 text-white",
      badgeClass: "border-emerald-300 bg-emerald-100 text-emerald-800",
    };
  }

  if (score <= 9) {
    return {
      label: locale === "tr" ? "Orta" : "Medium",
      cellClass: "bg-yellow-400 text-slate-950",
      badgeClass: "border-yellow-300 bg-yellow-100 text-yellow-800",
    };
  }

  if (score <= 16) {
    return {
      label: locale === "tr" ? "Yüksek" : "High",
      cellClass: "bg-orange-500 text-white",
      badgeClass: "border-orange-300 bg-orange-100 text-orange-800",
    };
  }

  return {
    label: locale === "tr" ? "Çok Yüksek" : "Extreme",
    cellClass: "bg-red-600 text-white",
    badgeClass: "border-red-300 bg-red-100 text-red-800",
  };
}

type RiskMatrixProps = {
  locale: "tr" | "en";
};

export default function RiskMatrix({ locale }: RiskMatrixProps) {
  const isTurkish = locale === "tr";
  const currentLikelihoodOptions = likelihoodOptions[locale];
  const currentSeverityOptions = severityOptions[locale];

  const t = {
    eyebrow: isTurkish ? "ETKİLEŞİMLİ HESAPLAYICI" : "INTERACTIVE CALCULATOR",
    title: isTurkish ? "Risk Matrisi Hesaplayıcı" : "Risk Matrix Calculator",
    description: isTurkish
      ? "Risk puanını ve risk seviyesini anında hesaplamak için olasılık ve şiddet değerlerini seçin."
      : "Select likelihood and severity to calculate the risk score and risk level instantly.",
    likelihood: isTurkish ? "Olasılık" : "Likelihood",
    severity: isTurkish ? "Şiddet" : "Severity",
    riskScore: isTurkish ? "Risk Puanı" : "Risk Score",
    recommendedActions: isTurkish ? "Önerilen Aksiyonlar" : "Recommended Actions",
    downloadPdf: isTurkish ? "📄 PDF İndir" : "{t.downloadPdf}",
    riskSuffix: isTurkish ? "Risk" : "Risk",
    controlMeasures: isTurkish ? "Kontrol Önlemleri" : "Control Measures",
    controlPlaceholder: isTurkish
      ? "Uygulanacak kontrol önlemlerini yazın..."
      : "Enter the control measures to be implemented...",
    residualRisk: isTurkish ? "Kalan Risk" : "Residual Risk",
    residualLikelihood: isTurkish ? "Kalan Olasılık" : "Residual Likelihood",
    residualSeverity: isTurkish ? "Kalan Şiddet" : "Residual Severity",
  };

  const [likelihood, setLikelihood] = useState(3);
  const [severity, setSeverity] = useState(3);

  // Residual risk values after control measures
  const [residualLikelihood, setResidualLikelihood] = useState(2);
  const [residualSeverity, setResidualSeverity] = useState(2);
  const [controlMeasures, setControlMeasures] = useState("");

  const score = likelihood * severity;
  const risk = useMemo(() => getRiskLevel(score, locale), [score, locale]);

  const residualScore = residualLikelihood * residualSeverity;
  const residualRisk = useMemo(
    () => getRiskLevel(residualScore, locale),
    [residualScore, locale]
  );
 const downloadPDF = () => {
  const doc = new jsPDF();

  const likelihoodLabel =
    currentLikelihoodOptions.find((item) => item.value === likelihood)?.label ?? "";

  const severityLabel =
    currentSeverityOptions.find((item) => item.value === severity)?.label ?? "";

  const actions: string[] =
    locale === "tr"
      ? recommendations.tr[
          risk.label as keyof typeof recommendations.tr
        ] ?? []
      : recommendations.en[
          risk.label as keyof typeof recommendations.en
        ] ?? [];

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
  "This report was generated automatically by SafeBase {t.title}.",
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
    tr: {
      "Düşük": [
        "Mevcut kontrol önlemlerine devam edin.",
        "Çalışmayı izlemeye devam edin.",
      ],
      "Orta": [
        "Mevcut kontrol önlemlerini gözden geçirin.",
        "Saha sorumlusunu bilgilendirin.",
        "Çalışma süresince riski izleyin.",
      ],
      "Yüksek": [
        "Ek kontrol önlemleri uygulayın.",
        "Saha sorumlusu onayı alın.",
        "Çalışmaya başlamadan önce risk değerlendirmesini gözden geçirin.",
      ],
      "Çok Yüksek": [
        "ÇALIŞMAYI DERHAL DURDURUN.",
        "Mühendislik kontrolleri uygulayın.",
        "Yönetim onayı alın.",
        "Risk değerlendirmesini revize edin.",
      ],
    },
    en: {
      Low: [
        "Continue with current controls.",
        "Continue monitoring the task.",
      ],
      Medium: [
        "Review existing control measures.",
        "Inform the site supervisor.",
        "Monitor the risk during the work.",
      ],
      High: [
        "Implement additional control measures.",
        "Obtain supervisor approval.",
        "Review the risk assessment before starting work.",
      ],
      Extreme: [
        "STOP WORK immediately.",
        "Implement engineering controls.",
        "Obtain management approval.",
        "Revise the risk assessment.",
      ],
    },
  };

  const currentRecommendations: string[] =
    locale === "tr"
      ? recommendations.tr[
          risk.label as keyof typeof recommendations.tr
        ] ?? []
      : recommendations.en[
          risk.label as keyof typeof recommendations.en
        ] ?? [];


  return (
    <section id="risk-matrix" className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            {t.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              {t.title}
          </h2>

          <p className="mt-5 leading-7 text-slate-400">
              {t.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.3fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="grid gap-6">
              <label>
                <span className="text-sm font-medium text-slate-300">
                  {t.likelihood}
                </span>

                <select
                  value={likelihood}
                  onChange={(event) =>
                    setLikelihood(Number(event.target.value))
                  }
                  className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400"
                >
                  {currentLikelihoodOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value} — {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-sm font-medium text-slate-300">
                  {t.severity}
                </span>

                <select
                  value={severity}
                  onChange={(event) =>
                    setSeverity(Number(event.target.value))
                  }
                  className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-400"
                >
                  {currentSeverityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value} — {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="text-sm text-slate-400">{t.riskScore}</div>
              <div className="mt-2 text-6xl font-bold">{score}</div>

              <div
  className={`mt-5 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${risk.badgeClass}`}
>
  {risk.label} {t.riskSuffix}
</div>

<div className="mt-6 border-t border-white/10 pt-5">
  <div className="text-sm font-semibold text-white">
    {t.recommendedActions}
  </div>

  <ul className="mt-3 space-y-2 text-sm text-slate-300">
    {currentRecommendations.map((action) => (
      <li key={action} className="flex gap-2">
        <span className="text-blue-400">✓</span>
        <span>{action}</span>
      </li>
    ))}
  </ul>
  <div className="mt-6 border-t border-white/10 pt-6">
  <div className="text-sm font-semibold text-white">
    {t.controlMeasures}
  </div>

  <textarea
    value={controlMeasures}
    onChange={(event) => setControlMeasures(event.target.value)}
    placeholder={t.controlPlaceholder}
    rows={4}
    className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
  />

  <div className="mt-6 text-sm font-semibold text-white">
    {t.residualRisk}
  </div>

  <div className="mt-3 grid gap-4 sm:grid-cols-2">
    <label>
      <span className="text-sm font-medium text-slate-300">
        {t.residualLikelihood}
      </span>

      <select
        value={residualLikelihood}
        onChange={(event) =>
          setResidualLikelihood(Number(event.target.value))
        }
        className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400"
      >
        {currentLikelihoodOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value} – {option.label}
          </option>
        ))}
      </select>
    </label>

    <label>
      <span className="text-sm font-medium text-slate-300">
        {t.residualSeverity}
      </span>

      <select
        value={residualSeverity}
        onChange={(event) =>
          setResidualSeverity(Number(event.target.value))
        }
        className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400"
      >
        {currentSeverityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value} – {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>

  <div className="mt-4 rounded-xl border border-white/10 bg-slate-950 p-4">
    <div className="text-sm text-slate-400">
      {t.residualRisk}
    </div>

    <div className="mt-2 flex items-center justify-between gap-4">
      <div className="text-4xl font-bold text-white">
        {residualScore}
      </div>

      <div
        className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${residualRisk.badgeClass}`}
      >
        {residualRisk.label} {t.riskSuffix}
      </div>
    </div>
  </div>
</div>

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
                      const cellRisk = getRiskLevel(cellScore, locale);
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