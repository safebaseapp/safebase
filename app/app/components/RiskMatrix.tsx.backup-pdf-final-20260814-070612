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
    downloadPdf: isTurkish ? "📄 PDF İndir" : "📄 Download PDF",
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
  `This report was generated automatically by SafeBase ${t.title}.`,
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


  const riskReduction =
    score > 0
      ? Math.max(0, Math.round(((score - residualScore) / score) * 100))
      : 0;

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

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.88fr_1.45fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/55 p-6 shadow-2xl shadow-black/25">

            {/* STEP 1 */}
            <section className="relative border-b border-white/10 pb-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                  1
                </div>

                <div>
                  <h3 className="text-sm font-black tracking-wide text-white">
                    {isTurkish ? "İLK RİSKİ BELİRLEYİN" : "DEFINE INITIAL RISK"}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {isTurkish
                      ? "Mevcut durumdaki olasılık ve şiddeti seçin."
                      : "Select likelihood and severity for the current situation."}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-300">
                    {t.likelihood}
                  </span>

                  <select
                    value={likelihood}
                    onChange={(event) =>
                      setLikelihood(Number(event.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-blue-500"
                  >
                    {currentLikelihoodOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} – {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-300">
                    {t.severity}
                  </span>

                  <select
                    value={severity}
                    onChange={(event) =>
                      setSeverity(Number(event.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-blue-500"
                  >
                    {currentSeverityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} – {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[130px_1fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    {t.riskScore}
                  </div>

                  <div className="mt-2 text-4xl font-black text-white">
                    {score}
                  </div>

                  <div
                    className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${risk.badgeClass}`}
                  >
                    {risk.label} {t.riskSuffix}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-300">
                    {t.recommendedActions}
                  </div>

                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-300">
                    {currentRecommendations.map((action) => (
                      <li key={action} className="flex gap-2">
                        <span className="font-black text-blue-400">✓</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* STEP 2 */}
            <section className="border-b border-white/10 py-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                  2
                </div>

                <div>
                  <h3 className="text-sm font-black tracking-wide text-white">
                    {isTurkish
                      ? "KONTROL ÖNLEMLERİNİ BELİRTİN"
                      : "DEFINE CONTROL MEASURES"}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {isTurkish
                      ? "Uygulanacak veya mevcut kontrol önlemlerini yazın."
                      : "Describe existing or planned control measures."}
                  </p>
                </div>
              </div>

              <textarea
                value={controlMeasures}
                onChange={(event) => setControlMeasures(event.target.value)}
                placeholder={
                  isTurkish
                    ? "Kontrol önlemlerini detaylı olarak yazın..."
                    : "Describe the control measures in detail..."
                }
                maxLength={1000}
                rows={5}
                className="mt-5 w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

              <div className="mt-1 text-right text-[11px] text-slate-600">
                {controlMeasures.length} / 1000
              </div>
            </section>

            {/* STEP 3 */}
            <section className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                  3
                </div>

                <div>
                  <h3 className="text-sm font-black tracking-wide text-white">
                    {isTurkish
                      ? "KALAN RİSKİ HESAPLAYIN"
                      : "CALCULATE RESIDUAL RISK"}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {isTurkish
                      ? "Kontroller sonrası olasılık ve şiddeti değerlendirin."
                      : "Evaluate likelihood and severity after controls."}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-300">
                    {t.residualLikelihood}
                  </span>

                  <select
                    value={residualLikelihood}
                    onChange={(event) =>
                      setResidualLikelihood(Number(event.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
                  >
                    {currentLikelihoodOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} – {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-300">
                    {t.residualSeverity}
                  </span>

                  <select
                    value={residualSeverity}
                    onChange={(event) =>
                      setResidualSeverity(Number(event.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
                  >
                    {currentSeverityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value} – {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[135px_1fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    {isTurkish ? "Kalan Risk Puanı" : "Residual Risk Score"}
                  </div>

                  <div className="mt-2 text-4xl font-black text-white">
                    {residualScore}
                  </div>

                  <div
                    className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${residualRisk.badgeClass}`}
                  >
                    {residualRisk.label} {t.riskSuffix}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.05] p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-300">
                    ✓ {isTurkish ? "RİSK YORUMU" : "RISK INTERPRETATION"}
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-300">
                    {residualScore <= 4
                      ? isTurkish
                        ? "Kontroller sonrası risk kabul edilebilir seviyededir."
                        : "Residual risk is at an acceptable level after controls."
                      : isTurkish
                        ? "Kalan risk için ek kontrol önlemleri değerlendirilmelidir."
                        : "Additional controls should be considered for the residual risk."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={downloadPDF}
                className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-black tracking-wide text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
              >
                📄{" "}
                {isTurkish
                  ? "PROFESYONEL RİSK RAPORU (PDF)"
                  : "PROFESSIONAL RISK REPORT (PDF)"}
              </button>

              <div className="mt-2 text-center text-[11px] text-slate-500">
                {isTurkish
                  ? "Detaylı risk raporunu oluştur ve indir."
                  : "Generate and download the detailed risk report."}
              </div>
            </section>
          </div>

          <div className="space-y-5">
            {/* INITIAL / RESIDUAL SUMMARY */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-2xl shadow-black/30">
              <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-lg text-amber-300">
                    ◈
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {isTurkish ? "İLK RİSK (MEVCUT DURUM)" : "INITIAL RISK"}
                    </div>

                    <div className="mt-1 flex items-end gap-3">
                      <span className="text-4xl font-black leading-none text-amber-400">
                        {score}
                      </span>

                      <span className="pb-0.5 text-sm font-bold text-amber-300">
                        {risk.label} {t.riskSuffix}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-400">
                      {t.likelihood}: <span className="font-bold text-slate-200">{likelihood}</span>
                      <span className="mx-2">×</span>
                      {t.severity}: <span className="font-bold text-slate-200">{severity}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden text-3xl text-slate-600 md:block">
                  →
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 text-lg text-emerald-300">
                    ◇
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {isTurkish ? "KONTROL SONRASI (KALAN RİSK)" : "RESIDUAL RISK"}
                    </div>

                    <div className="mt-1 flex items-end gap-3">
                      <span className="text-4xl font-black leading-none text-emerald-400">
                        {residualScore}
                      </span>

                      <span className="pb-0.5 text-sm font-bold text-emerald-300">
                        {residualRisk.label} {t.riskSuffix}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-400">
                      {t.likelihood}: <span className="font-bold text-slate-200">{residualLikelihood}</span>
                      <span className="mx-2">×</span>
                      {t.severity}: <span className="font-bold text-slate-200">{residualSeverity}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden text-3xl text-slate-600 md:block">
                  →
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[7px] border-emerald-500/20">
                    <div className="absolute inset-[-7px] rounded-full border-[7px] border-transparent border-t-emerald-400 border-r-emerald-400" />
                    <span className="text-sm font-black text-white">
                      {riskReduction}%
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {isTurkish ? "RİSK AZALTIMI" : "RISK REDUCTION"}
                    </div>

                    <p className="mt-2 text-sm leading-5 text-slate-300">
                      {isTurkish ? (
                        <>
                          Riskte{" "}
                          <span className="font-black text-emerald-400">
                            %{riskReduction}
                          </span>{" "}
                          azalma sağlandı.
                        </>
                      ) : (
                        <>
                          Risk reduced by{" "}
                          <span className="font-black text-emerald-400">
                            {riskReduction}%
                          </span>
                          .
                        </>
                      )}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          <div className="self-start overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="border-b border-white/10 bg-slate-950/35 px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                    {isTurkish ? "5 × 5 RİSK MATRİSİ" : "5 × 5 RISK MATRIX"}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {isTurkish ? "Risk Seviyesi Görünümü" : "Risk Level Overview"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {isTurkish
                      ? "Seçilen olasılık ve şiddet değerinin matristeki konumunu görüntüleyin."
                      : "View the selected likelihood and severity position on the matrix."}
                  </p>
                </div>

                <div className={`rounded-2xl border px-5 py-3 ${risk.badgeClass}`}>
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    {t.riskScore}
                  </div>
                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-3xl font-black leading-none">{score}</span>
                    <span className="text-sm font-bold">
                      {risk.label} {t.riskSuffix}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="overflow-x-auto">
                <div className="min-w-[620px] rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-inner">
                  <div className="grid grid-cols-6 gap-1.5 text-center text-sm font-semibold text-white">
                    <div className="flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-200">
                      S × L
                    </div>

                    {[1, 2, 3, 4, 5].map((value) => (
                      <div
                        key={value}
                        className="flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-200"
                      >
                        L{value}
                      </div>
                    ))}

                    {[5, 4, 3, 2, 1].map((severityValue) => (
                      <div key={severityValue} className="contents">
                        <div className="flex min-h-14 items-center justify-center rounded-xl border border-white/10 bg-slate-800 font-bold text-slate-200">
                          S{severityValue}
                        </div>

                        {[1, 2, 3, 4, 5].map((likelihoodValue) => {
                          const cellScore = severityValue * likelihoodValue;
                          const cellRisk = getRiskLevel(cellScore, locale);
                          const isInitialRisk =
                            severityValue === severity &&
                            likelihoodValue === likelihood;

                          const isResidualRisk =
                            severityValue === residualSeverity &&
                            likelihoodValue === residualLikelihood;

                          const isSameRisk = isInitialRisk && isResidualRisk;

                          return (
                            <div
                              key={`${severityValue}-${likelihoodValue}`}
                              className={`relative flex min-h-14 items-center justify-center rounded-xl text-base font-black transition-all ${cellRisk.cellClass} ${
                                isInitialRisk
                                  ? "z-10 scale-[1.045] ring-[3px] ring-blue-400 ring-offset-2 ring-offset-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_22px_rgba(59,130,246,0.35)]"
                                  : isResidualRisk
                                    ? "z-10 scale-[1.045] ring-[3px] ring-emerald-300 ring-offset-2 ring-offset-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_22px_rgba(52,211,153,0.30)]"
                                    : ""
                              }`}
                            >
                              <span className="text-base font-black">{cellScore}</span>

                              {isInitialRisk && (
                                <span className="absolute right-1 top-1 rounded-md border border-white/30 bg-blue-600 px-2 py-1 text-[9px] font-black leading-none text-white shadow-md">
                                  {isTurkish ? "İlk Risk" : "Initial Risk"}
                                </span>
                              )}

                              {isResidualRisk && (
                                <span
                                  className={`absolute ${
                                    isSameRisk ? "left-1 bottom-1" : "left-1 top-1"
                                  } rounded-md border border-white/30 bg-emerald-600 px-2 py-1 text-[9px] font-black leading-none text-white shadow-md`}
                                >
                                  {isTurkish ? "Kalan Risk" : "Residual Risk"}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3">
                  <div className="text-xs font-semibold text-emerald-300">
                    {isTurkish ? "DÜŞÜK" : "LOW"}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">1 – 4</div>
                </div>

                <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-3">
                  <div className="text-xs font-semibold text-yellow-300">
                    {isTurkish ? "ORTA" : "MEDIUM"}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">5 – 9</div>
                </div>

                <div className="rounded-xl border border-orange-400/20 bg-orange-500/10 p-3">
                  <div className="text-xs font-semibold text-orange-300">
                    {isTurkish ? "YÜKSEK" : "HIGH"}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">10 – 16</div>
                </div>

                <div className="rounded-xl border border-red-400/20 bg-red-500/10 p-3">
                  <div className="text-xs font-semibold text-red-300">
                    {isTurkish ? "ÇOK YÜKSEK" : "EXTREME"}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">17 – 25</div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {isTurkish ? "SEÇİLİ DEĞERLER" : "SELECTED VALUES"}
                    </div>

                    <div className="mt-2 text-sm text-slate-300">
                      {t.likelihood}: <strong className="text-white">{likelihood}</strong>
                      <span className="mx-3 text-slate-600">•</span>
                      {t.severity}: <strong className="text-white">{severity}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-500">
                      {isTurkish ? "Hesaplama" : "Calculation"}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {likelihood} × {severity} = {score}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}