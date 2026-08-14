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
  // RISK MATRIX PDF V3 FINAL
  const downloadPDF = async () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    // Sernem PDF Unicode fonts
    const fontToBase64 = async (url: string) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`PDF font could not be loaded: ${url}`);
      }

      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      let binary = "";
      const chunkSize = 0x8000;

      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(
          ...bytes.subarray(i, i + chunkSize)
        );
      }

      return btoa(binary);
    };

    const [regularFont, boldFont] = await Promise.all([
      fontToBase64("/fonts/DejaVuSans.ttf"),
      fontToBase64("/fonts/DejaVuSans-Bold.ttf"),
    ]);

    doc.addFileToVFS("Sernem-Regular.ttf", regularFont);
    doc.addFont(
      "Sernem-Regular.ttf",
      "SernemPDF",
      "normal"
    );

    doc.addFileToVFS("Sernem-Bold.ttf", boldFont);
    doc.addFont(
      "Sernem-Bold.ttf",
      "SernemPDF",
      "bold"
    );

    const C = {
      bg: [2, 6, 23] as [number, number, number],
      panel: [15, 23, 42] as [number, number, number],
      border: [51, 65, 85] as [number, number, number],
      white: [248, 250, 252] as [number, number, number],
      muted: [148, 163, 184] as [number, number, number],
      blue: [59, 130, 246] as [number, number, number],
      green: [16, 185, 129] as [number, number, number],
      yellow: [250, 204, 21] as [number, number, number],
      orange: [249, 115, 22] as [number, number, number],
      red: [239, 68, 68] as [number, number, number],
    };

    const safe = (value: string) => value;


    const colorFor = (value: number) => {
      if (value <= 4) return C.green;
      if (value <= 9) return C.yellow;
      if (value <= 16) return C.orange;
      return C.red;
    };

    const text = (
      value: string,
      x: number,
      y: number,
      size = 8,
      color = C.white,
      bold = false,
      align: "left" | "center" | "right" = "left"
    ) => {
      doc.setFont("SernemPDF", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(...color);
      doc.text(safe(value), x, y, { align });
    };

    const box = (x: number, y: number, w: number, h: number) => {
      doc.setFillColor(...C.panel);
      doc.setDrawColor(...C.border);
      doc.roundedRect(x, y, w, h, 3, 3, "FD");
    };

    const likelihoodLabel =
      currentLikelihoodOptions.find((x) => x.value === likelihood)?.label ?? "";

    const severityLabel =
      currentSeverityOptions.find((x) => x.value === severity)?.label ?? "";

    const residualLikelihoodLabel =
      currentLikelihoodOptions.find((x) => x.value === residualLikelihood)?.label ?? "";

    const residualSeverityLabel =
      currentSeverityOptions.find((x) => x.value === residualSeverity)?.label ?? "";

    const actions =
      locale === "tr"
        ? recommendations.tr[risk.label as keyof typeof recommendations.tr] ?? []
        : recommendations.en[risk.label as keyof typeof recommendations.en] ?? [];

    const reduction =
      score > 0
        ? Math.max(0, Math.round(((score - residualScore) / score) * 100))
        : 0;

    const today = new Date().toLocaleDateString(
      isTurkish ? "tr-TR" : "en-GB"
    );

    // Background
    doc.setFillColor(...C.bg);
    doc.rect(0, 0, W, H, "F");

    // Header
    text("SERNEM", 14, 14, 17, C.white, true);
    text(
      isTurkish ? "Profesyonel HSE Platformu" : "Professional HSE Platform",
      14,
      20,
      6.5,
      C.muted
    );

    text(
      isTurkish ? "RİSK MATRİSİ RAPORU" : "RISK MATRIX REPORT",
      14,
      34,
      17,
      C.white,
      true
    );

    text(
      `${isTurkish ? "Tarih" : "Date"}: ${today}`,
      W - 14,
      14,
      7,
      C.muted,
      false,
      "right"
    );

    // Summary
    const y1 = 44;
    const gap = 3;
    const cardW = (182 - gap * 2) / 3;

    box(14, y1, cardW, 28);
    box(14 + cardW + gap, y1, cardW, 28);
    box(14 + (cardW + gap) * 2, y1, cardW, 28);

    const initialColor = colorFor(score);
    const residualColor = colorFor(residualScore);

    text(isTurkish ? "İLK RİSK" : "INITIAL RISK", 18, y1 + 7, 6, C.muted, true);
    text(String(score), 18, y1 + 20, 15, initialColor, true);
    text(`${safe(risk.label)} Risk`, 34, y1 + 19, 7, initialColor, true);
    text(`${likelihood} x ${severity}`, 18, y1 + 25, 6, C.muted);

    const x2 = 14 + cardW + gap;
    text(isTurkish ? "KALAN RİSK" : "RESIDUAL RISK", x2 + 4, y1 + 7, 6, C.muted, true);
    text(String(residualScore), x2 + 4, y1 + 20, 15, residualColor, true);
    text(`${safe(residualRisk.label)} Risk`, x2 + 20, y1 + 19, 7, residualColor, true);
    text(`${residualLikelihood} x ${residualSeverity}`, x2 + 4, y1 + 25, 6, C.muted);

    const x3 = 14 + (cardW + gap) * 2;
    text(isTurkish ? "RİSK AZALTIMI" : "RISK REDUCTION", x3 + 4, y1 + 7, 6, C.muted, true);
    text(`${reduction}%`, x3 + 4, y1 + 20, 15, C.green, true);
    text(isTurkish ? "Kontrol sonrası" : "After controls", x3 + 4, y1 + 25, 6, C.muted);

    // Selected values
    box(14, 77, 182, 30);
    text(isTurkish ? "SEÇİLİ DEĞERLER" : "SELECTED VALUES", 19, 85, 7, C.white, true);

    const values = [
      [isTurkish ? "İlk Olasılık" : "Initial Likelihood", `${likelihood} - ${likelihoodLabel}`],
      [isTurkish ? "İlk Şiddet" : "Initial Severity", `${severity} - ${severityLabel}`],
      [isTurkish ? "Kalan Olasılık" : "Residual Likelihood", `${residualLikelihood} - ${residualLikelihoodLabel}`],
      [isTurkish ? "Kalan Şiddet" : "Residual Severity", `${residualSeverity} - ${residualSeverityLabel}`],
    ];

    values.forEach(([label, value], i) => {
      const x = 19 + i * 45;
      text(label, x, 94, 5.2, C.muted, true);
      text(value, x, 101, 6.4, C.white, true);
    });

    // Controls
    box(14, 112, 182, 31);
    text(isTurkish ? "KONTROL ÖNLEMLERİ" : "CONTROL MEASURES", 19, 120, 7, C.white, true);

    const controls =
      controlMeasures.trim() ||
      (isTurkish ? "Kontrol önlemi girilmedi." : "No control measures entered.");

    const controlLines = doc.splitTextToSize(safe(controls), 170);

    doc.setFont("SernemPDF", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(...C.muted);
    doc.text(controlLines.slice(0, 3), 19, 129);

    // Matrix panel
    box(14, 148, 182, 87);
    text(isTurkish ? "5 × 5 RİSK MATRİSİ" : "5 x 5 RISK MATRIX", 19, 156, 8, C.white, true);

    text(
      isTurkish ? "Mavi: İlk Risk  |  Yeşil: Kalan Risk" : "Blue: Initial Risk  |  Green: Residual Risk",
      191,
      156,
      5.4,
      C.muted,
      false,
      "right"
    );

    const matrixX = 19;
    const matrixY = 163;
    const headerW = 20;
    const cellW = 31;
    const cellH = 10.5;

    // Headers
    doc.setFillColor(30, 41, 59);
    doc.setDrawColor(...C.border);
    doc.roundedRect(matrixX, matrixY, headerW - 1, cellH - 1, 1, 1, "FD");
    text("S x L", matrixX + 9.5, matrixY + 6.5, 6, C.white, true, "center");

    for (let l = 1; l <= 5; l++) {
      const x = matrixX + headerW + (l - 1) * cellW;

      doc.setFillColor(30, 41, 59);
      doc.roundedRect(x, matrixY, cellW - 1, cellH - 1, 1, 1, "FD");
      text(`L${l}`, x + 15, matrixY + 6.5, 6, C.white, true, "center");
    }

    for (let sValue = 5; sValue >= 1; sValue--) {
      const row = 5 - sValue;
      const y = matrixY + (row + 1) * cellH;

      doc.setFillColor(30, 41, 59);
      doc.roundedRect(matrixX, y, headerW - 1, cellH - 1, 1, 1, "FD");
      text(`S${sValue}`, matrixX + 9.5, y + 6.5, 6, C.white, true, "center");

      for (let lValue = 1; lValue <= 5; lValue++) {
        const value = sValue * lValue;
        const x = matrixX + headerW + (lValue - 1) * cellW;
        const color = colorFor(value);

        doc.setFillColor(...color);
        doc.roundedRect(x, y, cellW - 1, cellH - 1, 1, 1, "F");

        const initial =
          lValue === likelihood && sValue === severity;

        const residual =
          lValue === residualLikelihood && sValue === residualSeverity;

        if (initial) {
          doc.setDrawColor(...C.blue);
          doc.setLineWidth(1.3);
          doc.roundedRect(x, y, cellW - 1, cellH - 1, 1, 1, "S");
        }

        if (residual) {
          doc.setDrawColor(...C.green);
          doc.setLineWidth(1.2);
          doc.roundedRect(x + 1, y + 1, cellW - 3, cellH - 3, 1, 1, "S");
        }

        doc.setLineWidth(0.2);

        const dark = value >= 5 && value <= 9;
        text(
          String(value),
          x + 15,
          y + 6.5,
          7,
          dark ? C.bg : C.white,
          true,
          "center"
        );

        if (initial) {
          text(isTurkish ? "İLK" : "INITIAL", x + 28, y + 2.5, 3.5, C.white, true, "right");
        }

        if (residual) {
          text(isTurkish ? "KALAN" : "RESIDUAL", x + 2, y + 9, 3.5, C.white, true);
        }
      }
    }

    // Legend
    const legendY = 228;
    const legend = [
      [isTurkish ? "Düşük 1-4" : "Low 1-4", C.green],
      [isTurkish ? "Orta 5-9" : "Medium 5-9", C.yellow],
      [isTurkish ? "Yüksek 10-16" : "High 10-16", C.orange],
      [isTurkish ? "Çok Yüksek 17-25" : "Extreme 17-25", C.red],
    ] as const;

    legend.forEach(([label, color], i) => {
      const x = 22 + i * 43;
      doc.setFillColor(...color);
      doc.circle(x, legendY - 1, 1.1, "F");
      text(label, x + 4, legendY, 5, C.muted, true);
    });

    // Actions
    box(14, 240, 182, 31);
    text(isTurkish ? "ÖNERİLEN AKSİYONLAR" : "RECOMMENDED ACTIONS", 19, 248, 7, C.white, true);

    let ay = 256;

    actions.slice(0, 3).forEach((action) => {
      doc.setFillColor(...C.blue);
      doc.circle(20, ay - 1, 0.8, "F");
      text(action, 24, ay, 6.2, C.muted);
      ay += 6;
    });

    // Footer
    doc.setDrawColor(...C.border);
    doc.line(14, H - 14, 196, H - 14);

    text("Sernem | Professional HSE Platform | Risk Matrix", 14, H - 8, 5.5, C.muted);
    text("Page 1 / 1", 196, H - 8, 5.5, C.muted, false, "right");

    doc.save(`Sernem-Risk-Matrix-${score}-to-${residualScore}.pdf`);
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