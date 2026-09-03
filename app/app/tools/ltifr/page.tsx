"use client";

import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import { usePathname } from "next/navigation";

function TrendIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 17l5-5 4 4 7-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7h5v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PersonShieldIcon({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6.5 19v-3a5.5 5.5 0 0111 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16.5 5.2L20 6.7v2.5c0 2.4-1.3 4.2-3.5 5.3-2.2-1.1-3.5-2.9-3.5-5.3V6.7l3.5-1.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function PeopleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 19v-2a5 5 0 0110 0v2M15 15a4 4 0 014 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClipboardIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="5"
        y="5"
        width="14"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 5V3h6v2M9 10h6M9 14h6M9 18h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 19V12M10 19V9M15 19v-5M20 19V5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 9l5-3 5 2 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex cursor-help items-center text-blue-400">
      <InfoIcon />

      <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 hidden w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-left text-[11px] font-normal leading-5 text-slate-300 shadow-2xl group-hover:block">
        {text}
      </span>
    </span>
  );
}

export default function LTIFRCalculatorPage() {
  const pathname = usePathname();
  const isTurkish = pathname?.startsWith("/tr");

  const [lostTimeInjuries, setLostTimeInjuries] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [calculated, setCalculated] = useState(false);

  const injuriesNumber = Number(lostTimeInjuries);
  const hoursNumber = Number(hoursWorked);

  const validInput =
    lostTimeInjuries !== "" &&
    hoursWorked !== "" &&
    Number.isFinite(injuriesNumber) &&
    Number.isFinite(hoursNumber) &&
    injuriesNumber >= 0 &&
    hoursNumber > 0;

  const result = useMemo(() => {
    if (!calculated || !validInput) return null;

    return (injuriesNumber * 1_000_000) / hoursNumber;
  }, [calculated, validInput, injuriesNumber, hoursNumber]);

  const calculate = () => {
    if (validInput) setCalculated(true);
  };

  const clearCalculator = () => {
    setLostTimeInjuries("");
    setHoursWorked("");
    setCalculated(false);
  };


  const downloadLTIFRPdf = async () => {
    if (result === null || !validInput) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();

    // =====================================================
    // FONT
    // =====================================================
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

    doc.addFileToVFS("SERNEM-Regular.ttf", regularFont);
    doc.addFont(
      "SERNEM-Regular.ttf",
      "SERNEMPDF",
      "normal"
    );

    doc.addFileToVFS("SERNEM-Bold.ttf", boldFont);
    doc.addFont(
      "SERNEM-Bold.ttf",
      "SERNEMPDF",
      "bold"
    );

    // =====================================================
    // COLORS
    // =====================================================
    type RGB = [number, number, number];

    const C: Record<string, RGB> = {
      bg: [2, 6, 23],
      bgSoft: [5, 12, 30],
      panel: [15, 23, 42],
      panelDark: [8, 16, 34],
      panelBlue: [9, 29, 58],
      border: [35, 52, 78],
      borderBlue: [30, 92, 170],
      white: [248, 250, 252],
      muted: [148, 163, 184],
      muted2: [100, 116, 139],
      blue: [59, 130, 246],
      blue2: [37, 99, 235],
      cyan: [34, 211, 238],
      violet: [124, 58, 237],
      green: [16, 185, 129],
      amber: [245, 158, 11],
      red: [239, 68, 68],
    };

    const setFont = (bold = false) => {
      doc.setFont(
        "SERNEMPDF",
        bold ? "bold" : "normal"
      );
    };

    const write = (
      value: string,
      x: number,
      y: number,
      size = 7,
      color: RGB = C.white,
      bold = false,
      align: "left" | "center" | "right" = "left"
    ) => {
      setFont(bold);
      doc.setFontSize(size);
      doc.setTextColor(...color);
      doc.text(value, x, y, { align });
    };

    const wrapped = (
      value: string,
      x: number,
      y: number,
      maxWidth: number,
      size = 6,
      color: RGB = C.muted,
      bold = false,
      maxLines = 4,
      lineHeight = 1.25
    ) => {
      setFont(bold);
      doc.setFontSize(size);
      doc.setTextColor(...color);

      const lines = doc
        .splitTextToSize(value, maxWidth)
        .slice(0, maxLines);

      doc.text(lines, x, y, {
        lineHeightFactor: lineHeight,
      });

      return lines.length;
    };

    const panel = (
      x: number,
      y: number,
      w: number,
      h: number,
      fill: RGB = C.panel,
      stroke: RGB = C.border,
      radius = 3
    ) => {
      doc.setFillColor(...fill);
      doc.setDrawColor(...stroke);
      doc.setLineWidth(0.35);
      doc.roundedRect(
        x,
        y,
        w,
        h,
        radius,
        radius,
        "FD"
      );
    };

    const circleBadge = (
      cx: number,
      cy: number,
      r: number,
      stroke: RGB,
      fill: RGB = C.panelDark
    ) => {
      doc.setFillColor(...fill);
      doc.setDrawColor(...stroke);
      doc.setLineWidth(0.8);
      doc.circle(cx, cy, r, "FD");
    };

    const sectionTitle = (
      value: string,
      x: number,
      y: number,
      color: RGB = C.blue
    ) => {
      write(value, x, y, 5.2, color, true);
    };

    const resultText = result.toFixed(2);

    const hoursText = hoursNumber.toLocaleString(
      isTurkish ? "tr-TR" : "en-US"
    );

    const today = new Date().toLocaleDateString(
      isTurkish ? "tr-TR" : "en-GB"
    );

    const reportId =
      "LTIFR-" +
      new Date()
        .toISOString()
        .replace(/\D/g, "")
        .slice(0, 14);

    // =====================================================
    // PAGE BACKGROUND
    // =====================================================
    doc.setFillColor(...C.bg);
    doc.rect(0, 0, W, H, "F");

    // subtle top line
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.35);
    doc.line(0, 13, W, 13);

    // =====================================================
    // HEADER
    // =====================================================
    doc.setFillColor(...C.blue2);
    doc.roundedRect(10, 5, 8, 8, 2, 2, "F");

    write("S", 14, 10.6, 5, C.white, true, "center");

    write("SERNEM", 21, 8.6, 7.4, C.white, true);
    write(
      isTurkish
        ? "Profesyonel HSE Platformu"
        : "Professional HSE Platform",
      21,
      11.3,
      3.2,
      C.muted2
    );

    write(
      isTurkish
        ? "LTIFR PROFESYONEL PERFORMANS RAPORU"
        : "LTIFR PROFESSIONAL PERFORMANCE REPORT",
      W - 10,
      8.5,
      5.2,
      C.blue,
      true,
      "right"
    );

    write(
      `${today}  •  ${reportId}`,
      W - 10,
      11.2,
      3.3,
      C.muted2,
      false,
      "right"
    );

    // =====================================================
    // TOP GRID
    // =====================================================
    const leftX = 10;
    const topY = 18;
    const gap = 5;
    const leftW = 91;
    const rightX = leftX + leftW + gap;
    const rightW = W - rightX - 10;

    // LEFT MAIN CARD
    panel(
      leftX,
      topY,
      leftW,
      103,
      C.panel,
      C.borderBlue,
      4
    );

    sectionTitle(
      isTurkish
        ? "GÜVENLİK PERFORMANS HESAPLAYICI"
        : "SAFETY PERFORMANCE CALCULATOR",
      leftX + 7,
      topY + 8
    );

    write(
      isTurkish ? "LTIFR Hesaplayıcı" : "LTIFR Calculator",
      leftX + 7,
      topY + 17,
      12.5,
      C.white,
      true
    );

    wrapped(
      isTurkish
        ? "Kayıp zamanlı yaralanma sıklık oranını, kayıp zamanlı yaralanma sayısı ve toplam çalışma saatleri üzerinden hesaplar."
        : "Calculates Lost Time Injury Frequency Rate using lost time injuries and total working hours.",
      leftX + 7,
      topY + 24,
      leftW - 14,
      4.6,
      C.muted,
      false,
      3
    );

    // trend icon box
    panel(
      leftX + leftW - 20,
      topY + 7,
      13,
      13,
      C.panelBlue,
      C.borderBlue,
      2.5
    );

    doc.setDrawColor(...C.blue);
    doc.setLineWidth(0.9);
    doc.line(
      leftX + leftW - 16.5,
      topY + 16,
      leftX + leftW - 13,
      topY + 12.5
    );
    doc.line(
      leftX + leftW - 13,
      topY + 12.5,
      leftX + leftW - 10.5,
      topY + 14.5
    );
    doc.line(
      leftX + leftW - 10.5,
      topY + 14.5,
      leftX + leftW - 8.5,
      topY + 10.5
    );

    // Input 1
    write(
      isTurkish
        ? "Kayıp zamanlı yaralanmalar (LTI)"
        : "Lost time injuries (LTI)",
      leftX + 18,
      topY + 41,
      4.6,
      C.white,
      true
    );

    circleBadge(
      leftX + 10,
      topY + 48,
      5,
      C.blue,
      C.panelBlue
    );

    write(
      "LTI",
      leftX + 10,
      topY + 49.5,
      3.5,
      C.blue,
      true,
      "center"
    );

    panel(
      leftX + 18,
      topY + 44,
      leftW - 25,
      11,
      C.bg,
      C.border,
      2
    );

    write(
      String(injuriesNumber),
      leftX + 23,
      topY + 51,
      6.3,
      C.white,
      true
    );

    write(
      isTurkish ? "Örnek: 4" : "Example: 4",
      leftX + 18,
      topY + 58,
      3.2,
      C.muted2
    );

    // Input 2
    write(
      isTurkish
        ? "Toplam çalışılan saat"
        : "Total hours worked",
      leftX + 18,
      topY + 68,
      4.6,
      C.white,
      true
    );

    circleBadge(
      leftX + 10,
      topY + 75,
      5,
      C.blue,
      C.panelBlue
    );

    write(
      "H",
      leftX + 10,
      topY + 76.5,
      4,
      C.blue,
      true,
      "center"
    );

    panel(
      leftX + 18,
      topY + 71,
      leftW - 25,
      11,
      C.bg,
      C.border,
      2
    );

    write(
      hoursText,
      leftX + 23,
      topY + 78,
      6.3,
      C.white,
      true
    );

    write(
      isTurkish
        ? "Aynı raporlama dönemine ait veri"
        : "Data from the same reporting period",
      leftX + 18,
      topY + 85,
      3.1,
      C.muted2
    );

    // Calculation bar
    doc.setFillColor(...C.blue2);
    doc.roundedRect(
      leftX + 7,
      topY + 90,
      leftW - 14,
      10,
      2,
      2,
      "F"
    );

    write(
      `${injuriesNumber} × 1.000.000 ÷ ${hoursText} = ${resultText}`,
      leftX + leftW / 2,
      topY + 96.3,
      4.3,
      C.white,
      true,
      "center"
    );

    // =====================================================
    // RIGHT RESULT CARD
    // =====================================================
    panel(
      rightX,
      topY,
      rightW,
      58,
      C.panelBlue,
      C.cyan,
      4
    );

    sectionTitle(
      isTurkish ? "LTIFR SONUCU" : "LTIFR RESULT",
      rightX + 7,
      topY + 8
    );

    // calculated chip
    doc.setFillColor(5, 53, 45);
    doc.setDrawColor(...C.green);
    doc.roundedRect(
      rightX + rightW - 25,
      topY + 5,
      18,
      7,
      2,
      2,
      "FD"
    );

    write(
      isTurkish ? "Hesaplandı" : "Calculated",
      rightX + rightW - 16,
      topY + 9.5,
      3.2,
      C.green,
      true,
      "center"
    );

    // result ring
    const ringX = rightX + 20;
    const ringY = topY + 29;

    circleBadge(
      ringX,
      ringY,
      13,
      C.blue,
      C.bg
    );

    // jsPDF does not provide arc(); use concentric circles instead.
    doc.setDrawColor(...C.violet);
    doc.setLineWidth(1.5);
    doc.circle(ringX, ringY, 10, "S");

    doc.setDrawColor(...C.blue);
    doc.setLineWidth(0.7);
    doc.circle(ringX, ringY, 8.4, "S");

    write(
      "HSE",
      ringX,
      ringY + 1.6,
      4.2,
      C.blue,
      true,
      "center"
    );

    write(
      resultText,
      rightX + 38,
      topY + 26,
      17,
      C.white,
      true
    );

    write(
      "LTIFR",
      rightX + 38,
      topY + 35,
      9,
      C.blue,
      true
    );

    wrapped(
      isTurkish
        ? "1.000.000 çalışma saati başına kayıp zamanlı yaralanma sıklığı."
        : "Lost time injury frequency per 1,000,000 hours worked.",
      rightX + 38,
      topY + 41,
      rightW - 45,
      3.7,
      C.muted,
      false,
      3
    );

    // result interpretation
    panel(
      rightX + 7,
      topY + 45,
      rightW - 14,
      10,
      C.panelDark,
      C.borderBlue,
      2
    );

    write(
      isTurkish
        ? "SONUÇ YORUMU"
        : "RESULT INTERPRETATION",
      rightX + 11,
      topY + 49.5,
      3.2,
      C.blue,
      true
    );

    wrapped(
      isTurkish
        ? `${resultText} LTIFR değerini tek başına iyi/kötü olarak yorumlamayın; trendler ve benzer operasyonlarla karşılaştırın.`
        : `Do not classify ${resultText} LTIFR in isolation; compare trends and similar operations.`,
      rightX + 11,
      topY + 53.2,
      rightW - 22,
      2.8,
      C.muted,
      false,
      2,
      1.1
    );

    // =====================================================
    // RIGHT FORMULA
    // =====================================================
    const formulaY = topY + 63;

    panel(
      rightX,
      formulaY,
      rightW,
      38,
      C.panel,
      C.border,
      4
    );

    sectionTitle(
      isTurkish ? "FORMÜL" : "FORMULA",
      rightX + 7,
      formulaY + 8
    );

    panel(
      rightX + 7,
      formulaY + 12,
      rightW - 14,
      13,
      C.bg,
      C.border,
      2
    );

    write(
      "LTIFR = (Lost Time Injuries × 1,000,000)",
      rightX + rightW / 2,
      formulaY + 18,
      4.4,
      C.white,
      true,
      "center"
    );

    write(
      "÷ Total Hours Worked",
      rightX + rightW / 2,
      formulaY + 22.5,
      4.4,
      C.white,
      true,
      "center"
    );

    wrapped(
      isTurkish
        ? "1.000.000 saatlik baz, uluslararası LTIFR raporlamasında kullanılan yaygın normalizasyon bazlarından biridir."
        : "The 1,000,000-hour base is a commonly used normalization basis for LTIFR reporting.",
      rightX + 7,
      formulaY + 30,
      rightW - 32,
      3.2,
      C.muted,
      false,
      3
    );

    panel(
      rightX + rightW - 25,
      formulaY + 27,
      18,
      8,
      C.panelBlue,
      C.borderBlue,
      2
    );

    write(
      "1,000,000",
      rightX + rightW - 16,
      formulaY + 31.2,
      3.3,
      C.blue,
      true,
      "center"
    );

    write(
      isTurkish ? "Baz" : "Base",
      rightX + rightW - 16,
      formulaY + 34,
      2.5,
      C.muted2,
      false,
      "center"
    );

    // Important
    panel(
      rightX,
      topY + 106,
      rightW,
      15,
      [31, 22, 16],
      [120, 76, 16],
      4
    );

    write(
      isTurkish ? "⚠  ÖNEMLİ" : "⚠  IMPORTANT",
      rightX + 7,
      topY + 112,
      4.2,
      C.amber,
      true
    );

    wrapped(
      isTurkish
        ? "Karşılaştırmalarda aynı LTI tanımı, çalışan kapsamı ve doğrulanmış çalışma saatleri kullanılmalıdır."
        : "Use consistent LTI definitions, workforce scope and verified working hours for comparisons.",
      rightX + 7,
      topY + 116.7,
      rightW - 14,
      3,
      C.muted,
      false,
      2
    );

    // =====================================================
    // KNOWLEDGE GUIDE
    // =====================================================
    const guideY = 126;

    panel(
      10,
      guideY,
      W - 20,
      70,
      C.panel,
      C.border,
      4
    );

    sectionTitle(
      isTurkish
        ? "LTIFR BİLGİ REHBERİ"
        : "LTIFR KNOWLEDGE GUIDE",
      16,
      guideY + 8
    );

    write(
      isTurkish
        ? "LTIFR'ı doğru okuyun ve doğru kullanın"
        : "Understand and use LTIFR correctly",
      16,
      guideY + 15,
      8.2,
      C.white,
      true
    );

    wrapped(
      isTurkish
        ? "Sonucun güvenilir olması; LTI tanımı, raporlama dönemi, çalışan kapsamı ve çalışma saatlerinin tutarlı olmasına bağlıdır."
        : "Reliable interpretation depends on consistent LTI definitions, reporting periods, workforce scope and working-hour data.",
      16,
      guideY + 20,
      W - 32,
      3.6,
      C.muted,
      false,
      2
    );

    const cardY = guideY + 27;
    const innerW = W - 32;
    const cardGap = 3;
    const cardW = (innerW - cardGap * 3) / 4;

    const cards = isTurkish
      ? [
          {
            no: "01",
            title: "LTIFR Nedir?",
            body:
              "Kayıp zamanlı yaralanma sıklığını çalışma saatlerine göre normalize eden HSE performans göstergesidir.",
            color: C.blue,
          },
          {
            no: "02",
            title: "Neden 1.000.000?",
            body:
              "Farklı büyüklükteki operasyonların yaralanma sıklığını ortak ölçekte kıyaslamayı sağlar.",
            color: C.green,
          },
          {
            no: "03",
            title: "Hangi Vakalar Sayılır?",
            body:
              "Yalnızca kuruluşunuzun veya geçerli standardın LTI olarak tanımladığı iş ilişkili vakaları dahil edin.",
            color: C.violet,
          },
          {
            no: "04",
            title: "Nasıl Yorumlanır?",
            body:
              "Tek değeri izole değerlendirmeyin. Trend, sektör verisi, benzer operasyon ve önceki dönemleri birlikte inceleyin.",
            color: C.amber,
          },
        ]
      : [
          {
            no: "01",
            title: "What is LTIFR?",
            body:
              "An HSE performance indicator that normalizes lost time injury frequency against hours worked.",
            color: C.blue,
          },
          {
            no: "02",
            title: "Why 1,000,000?",
            body:
              "It provides a common scale for comparing injury frequency across different workforce sizes.",
            color: C.green,
          },
          {
            no: "03",
            title: "Which Cases Count?",
            body:
              "Include only work-related cases classified as LTI under the applicable reporting standard.",
            color: C.violet,
          },
          {
            no: "04",
            title: "How to Interpret?",
            body:
              "Avoid isolated interpretation. Review trends, industry data, comparable operations and prior periods.",
            color: C.amber,
          },
        ];

    cards.forEach((card, index) => {
      const x = 16 + index * (cardW + cardGap);

      panel(
        x,
        cardY,
        cardW,
        35,
        C.panelDark,
        C.border,
        3
      );

      circleBadge(
        x + 7,
        cardY + 8,
        4,
        card.color,
        C.bg
      );

      write(
        card.no,
        x + cardW - 5,
        cardY + 6,
        3.2,
        card.color,
        true,
        "right"
      );

      write(
        card.title,
        x + 5,
        cardY + 17,
        4,
        card.color,
        true
      );

      wrapped(
        card.body,
        x + 5,
        cardY + 22,
        cardW - 10,
        2.9,
        C.muted,
        false,
        5,
        1.15
      );
    });

    // =====================================================
    // BEST PRACTICES + BENCHMARK
    // =====================================================
    const bottomY = 201;
    const bottomH = 54;
    const bestW = 87;
    const benchX = 10 + bestW + 5;
    const benchW = W - benchX - 10;

    panel(
      10,
      bottomY,
      bestW,
      bottomH,
      C.panel,
      C.border,
      4
    );

    sectionTitle(
      isTurkish
        ? "✓  EN İYİ UYGULAMALAR"
        : "✓  BEST PRACTICES",
      16,
      bottomY + 8
    );

    const practices = isTurkish
      ? [
          "LTI sınıflandırmasını tutarlı uygulayın.",
          "Toplam çalışma saatlerini doğrulayın.",
          "Tek değerden çok trende odaklanın.",
          "Sonucu iyileştirme faaliyetleri için kullanın.",
        ]
      : [
          "Apply consistent LTI classification.",
          "Verify total working hours.",
          "Focus on trends, not a single value.",
          "Use results to support improvement actions.",
        ];

    practices.forEach((item, index) => {
      write(
        "✓",
        16,
        bottomY + 17 + index * 7,
        4,
        C.blue,
        true
      );

      wrapped(
        item,
        21,
        bottomY + 17 + index * 7,
        bestW - 28,
        3.5,
        C.muted,
        false,
        2
      );
    });

    // benchmark card
    panel(
      benchX,
      bottomY,
      benchW,
      bottomH,
      C.panel,
      C.border,
      4
    );

    sectionTitle(
      isTurkish
        ? "☆  KIYASLAMA İPUCU"
        : "☆  BENCHMARKING TIP",
      benchX + 6,
      bottomY + 8
    );

    wrapped(
      isTurkish
        ? "LTIFR değerini benzer operasyonlar, aynı sektör, önceki dönemler ve kuruluşunuzun hedefleriyle karşılaştırın. Asıl değer tek bir rakamdan çok zaman içindeki yön ve sürekli iyileştirmedir."
        : "Compare LTIFR with similar operations, the same industry, historical periods and organizational targets. Trend direction and continuous improvement matter more than one isolated number.",
      benchX + 6,
      bottomY + 16,
      benchW - 45,
      3.3,
      C.muted,
      false,
      7,
      1.2
    );

    // mini trend chart
    const chartX = benchX + benchW - 39;
    const chartY = bottomY + 16;
    const chartW = 31;
    const chartH = 28;

    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.25);

    for (let i = 0; i <= 3; i++) {
      const gy = chartY + (chartH / 3) * i;
      doc.line(chartX, gy, chartX + chartW, gy);
    }

    const points: [number, number][] = [
      [0, 25],
      [4, 20],
      [8, 22],
      [12, 15],
      [16, 18],
      [20, 10],
      [24, 13],
      [28, 4],
      [31, 7],
    ];

    doc.setDrawColor(...C.blue2);
    doc.setLineWidth(1);

    for (let i = 0; i < points.length - 1; i++) {
      doc.line(
        chartX + points[i][0],
        chartY + points[i][1],
        chartX + points[i + 1][0],
        chartY + points[i + 1][1]
      );
    }

    points.forEach(([px, py]) => {
      doc.setFillColor(...C.blue);
      doc.circle(
        chartX + px,
        chartY + py,
        0.8,
        "F"
      );
    });

    // =====================================================
    // DISCLAIMER
    // =====================================================
    const disclaimerY = 260;

    panel(
      10,
      disclaimerY,
      W - 20,
      20,
      C.panelDark,
      C.border,
      3
    );

    write(
      isTurkish ? "BİLGİLENDİRME" : "DISCLAIMER",
      16,
      disclaimerY + 7,
      3.5,
      C.white,
      true
    );

    wrapped(
      isTurkish
        ? "Bu rapor girilen verilere dayalı otomatik LTIFR hesaplamasıdır. Kuruluşunuzun, müşterinizin veya geçerli mevzuatın kullandığı LTI tanımı ve raporlama kuralları ayrıca doğrulanmalıdır."
        : "This report is an automated LTIFR calculation based on the data entered. Verify the LTI definition and reporting requirements used by your organization, client or applicable jurisdiction.",
      16,
      disclaimerY + 12,
      W - 55,
      2.9,
      C.muted2,
      false,
      4
    );

    write(
      "SERNEM",
      W - 16,
      disclaimerY + 9,
      6,
      C.white,
      true,
      "right"
    );

    write(
      "Professional HSE Platform",
      W - 16,
      disclaimerY + 13,
      2.7,
      C.muted2,
      false,
      "right"
    );

    // =====================================================
    // FOOTER
    // =====================================================
    doc.setDrawColor(...C.border);
    doc.line(10, 285, W - 10, 285);

    write(
      isTurkish ? "SERNEM • LTIFR Hesaplayıcı" : "SERNEM • LTIFR Calculator",
      10,
      290,
      3.1,
      C.muted2
    );

    write(
      `${today} • ${reportId}`,
      W / 2,
      290,
      3.1,
      C.muted2,
      false,
      "center"
    );

    write(
      "Page 1 / 1",
      W - 10,
      290,
      3.1,
      C.muted2,
      false,
      "right"
    );

    doc.save(
      `SERNEM-LTIFR-Dashboard-${resultText.replace(".", "-")}.pdf`
    );
  };

  const displayedResult = result === null ? "--" : result.toFixed(2);

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
      style={{
        background:
          "radial-gradient(circle at 14% 8%, rgba(37,99,235,0.10), transparent 25%), radial-gradient(circle at 88% 24%, rgba(6,182,212,0.06), transparent 27%), radial-gradient(circle at 55% 86%, rgba(124,58,237,0.05), transparent 30%), #020617",
      }}
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-80 w-80 rounded-full bg-blue-600/[0.05] blur-[120px]" />
        <div className="absolute right-[7%] top-[25%] h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1380px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* BACK */}
        <Link
          href={isTurkish ? "/tr/tools" : "/en/tools"}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          <span>←</span>
          {isTurkish
            ? "Tüm Hesaplayıcılara Dön"
            : "Back to Safety Calculators"}
        </Link>

        {/* MAIN GRID */}
        <section className="mt-7 grid gap-7 xl:grid-cols-[1.02fr_0.98fr]">
          {/* LEFT */}
          <div className="relative overflow-hidden rounded-[28px] border border-blue-400/20 bg-slate-900 p-6 shadow-[0_30px_100px_rgba(0,0,0,.35),0_0_40px_rgba(37,99,235,.05)] sm:p-8 lg:p-9">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/[0.07] blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
                    {isTurkish
                      ? "GÜVENLİK PERFORMANS HESAPLAYICI"
                      : "SAFETY PERFORMANCE CALCULATOR"}
                  </p>

                  <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-[42px]">
                    {isTurkish ? "LTIFR Hesaplayıcı" : "LTIFR Calculator"}
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                    {isTurkish
                      ? "Kayıp zamanlı yaralanma sıklık oranını, kayıp zamanlı yaralanma sayısı ve toplam çalışma saatlerini kullanarak hesaplayın."
                      : "Calculate the Lost Time Injury Frequency Rate using lost time injuries and total hours worked."}
                  </p>
                </div>

                <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400 shadow-[0_0_35px_rgba(37,99,235,.15)] sm:flex">
                  <TrendIcon className="h-10 w-10" />
                </div>
              </div>

              {/* INPUTS */}
              <div className="mt-10 space-y-7">
                <div className="grid gap-4 sm:grid-cols-[72px_1fr] sm:items-center">
                  <div className="flex h-[66px] w-[66px] items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/[0.08] text-blue-400">
                    <PersonShieldIcon className="h-8 w-8" />
                  </div>

                  <label>
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                      {isTurkish
                        ? "Kayıp zamanlı yaralanmalar (LTI)"
                        : "Lost time injuries (LTI)"}

                      <InfoTooltip
                        text={
                          isTurkish
                            ? "Kuruluşunuzun kullandığı kayıt standardına göre kayıp zaman oluşturan iş ilişkili yaralanmaların sayısını girin. LTI tanımı kullanılan ülke, müşteri veya şirket standardına göre değişebilir."
                            : "Enter the number of work-related injuries classified as lost time injuries under your organization's reporting standard. LTI definitions can vary by jurisdiction or company standard."
                        }
                      />
                    </span>

                    <input
                      id="lost-time-injuries"
                      type="number"
                      min="0"
                      step="1"
                      value={lostTimeInjuries}
                      onChange={(event) => {
                        setLostTimeInjuries(event.target.value);
                        setCalculated(false);
                      }}
                      placeholder="4"
                      className="mt-3 h-14 w-full rounded-xl border border-slate-600/60 bg-slate-950 px-5 text-base font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <span className="mt-2 block text-xs text-slate-500">
                      {isTurkish
                        ? "Örnek: 4"
                        : "Example: 4"}
                    </span>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-[72px_1fr] sm:items-center">
                  <div className="flex h-[66px] w-[66px] items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/[0.08] text-blue-400">
                    <ClockIcon className="h-8 w-8" />
                  </div>

                  <label>
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                      {isTurkish
                        ? "Toplam çalışılan saat"
                        : "Total hours worked"}

                      <InfoTooltip
                        text={
                          isTurkish
                            ? "Aynı raporlama döneminde ilgili çalışan grubunun fiilen çalıştığı toplam saatleri girin. Yaralanma verisi ve çalışma saati aynı döneme ait olmalıdır."
                            : "Enter total hours actually worked by the relevant workforce during the same reporting period. Injury data and hours worked must refer to the same period."
                        }
                      />
                    </span>

                    <input
                      id="hours-worked"
                      type="number"
                      min="1"
                      step="1"
                      value={hoursWorked}
                      onChange={(event) => {
                        setHoursWorked(event.target.value);
                        setCalculated(false);
                      }}
                      placeholder="500000"
                      className="mt-3 h-14 w-full rounded-xl border border-slate-600/60 bg-slate-950 px-5 text-base font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <span className="mt-2 block text-xs text-slate-500">
                      {isTurkish
                        ? "Örnek: 500000"
                        : "Example: 500000"}
                    </span>
                  </label>
                </div>
              </div>

              {/* BUTTONS */}
              <button
                type="button"
                onClick={calculate}
                disabled={!validInput}
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 text-sm font-black text-white shadow-[0_12px_35px_rgba(37,99,235,.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="text-lg">▦</span>
                {isTurkish
                  ? "LTIFR HESAPLA"
                  : "CALCULATE LTIFR"}
              </button>

              <button
                type="button"
                onClick={clearCalculator}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/30 text-sm font-bold text-slate-300 transition hover:border-white/20 hover:bg-slate-900"
              >
                <span className="text-lg">↻</span>
                {isTurkish
                  ? "Tümünü Temizle"
                  : "Clear All"}
              </button>

              {/* TIP */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-500/25 bg-blue-500/[0.06] px-4 py-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">
                  💡
                </div>

                <p className="pt-1 text-xs leading-5 text-slate-400">
                  <strong className="text-blue-300">
                    {isTurkish ? "İpucu:" : "Tip:"}
                  </strong>{" "}
                  {isTurkish
                    ? "Doğru karşılaştırma için LTI sayısı ve toplam çalışma saati aynı raporlama dönemine ait olmalıdır."
                    : "For accurate comparison, both LTI data and total hours worked should come from the same reporting period."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {/* RESULT */}
            <section
              className="relative overflow-hidden rounded-[28px] border border-cyan-400/30 bg-slate-900 p-6 shadow-[0_30px_100px_rgba(0,0,0,.35),0_0_50px_rgba(6,182,212,.06)] sm:p-8"
              style={{
                background:
                  "radial-gradient(circle at 78% 30%, rgba(37,99,235,.12), transparent 35%), linear-gradient(135deg,#0f1c34,#071326)",
              }}
            >
              <div className="relative flex items-start justify-between">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-400">
                  {isTurkish ? "LTIFR SONUCU" : "LTIFR RESULT"}
                </p>

                <span
                  className={`rounded-lg border px-3 py-1.5 text-[11px] font-black ${
                    result === null
                      ? "border-slate-600/50 bg-slate-800/50 text-slate-400"
                      : "border-emerald-400/50 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {result === null
                    ? `◷ ${isTurkish ? "Veri Bekleniyor" : "Waiting for input"}`
                    : `✓ ${isTurkish ? "Hesaplandı" : "Calculated"}`}
                </span>
              </div>

              <div className="relative mt-7 grid gap-7 md:grid-cols-[190px_1fr] md:items-center">
                {/* RING */}
                <div className="relative mx-auto flex h-[190px] w-[190px] items-center justify-center rounded-full border border-blue-400/20 bg-slate-950 shadow-[0_0_45px_rgba(37,99,235,.12)]">
                  <div className="absolute inset-[13px] rounded-full bg-[conic-gradient(from_10deg,#168cff,#7357ff,#168cff)] p-[8px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-blue-500/[0.07] text-blue-500 shadow-[0_0_35px_rgba(37,99,235,.18)]">
                        <PersonShieldIcon className="h-14 w-14" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-6xl font-black tracking-[-0.04em] text-white sm:text-7xl">
                    {displayedResult}
                  </div>

                  <div className="mt-1 text-4xl font-black tracking-tight text-blue-500">
                    LTIFR
                  </div>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                    {isTurkish
                      ? "1.000.000 çalışma saati başına kayıp zamanlı yaralanma sıklığı."
                      : "Lost Time Injury Frequency Rate per 1,000,000 hours worked."}
                  </p>
                </div>
              </div>

              {/* INTERPRETATION */}
              <div className="relative mt-6 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-5 py-4">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-400">
                  {isTurkish
                    ? "BU SONUÇ NE ANLAMA GELİYOR?"
                    : "WHAT THIS MEANS"}
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-300">
                  {result === null
                    ? isTurkish
                      ? "LTIFR, çalışanların işten uzak kalmasına yol açan kayıp zamanlı yaralanmaların sıklığını normalize ederek gösterir. Sonucu görmek için verileri girin."
                      : "LTIFR normalizes the frequency of injuries that result in lost time from work. Enter your data to calculate the result."
                    : isTurkish
                      ? `Hesaplanan LTIFR değeri ${result.toFixed(
                          2
                        )}. Bu değeri tek başına iyi veya kötü olarak sınıflandırmak yerine önceki dönemler, benzer operasyonlar ve kuruluşunuzun kullandığı benchmarklarla karşılaştırın.`
                      : `The calculated LTIFR is ${result.toFixed(
                          2
                        )}. Rather than classifying it as good or bad in isolation, compare it with historical periods, comparable operations and your organization's benchmarks.`}
                </p>
              </div>

              {/* DATA */}
              <div className="relative mt-6 grid grid-cols-2 divide-x divide-white/10 rounded-xl border border-blue-400/20 bg-slate-950/20">
                <div className="px-5 py-4 text-center">
                  <div className="text-xs text-slate-400">
                    {isTurkish
                      ? "Kayıp Zamanlı Yaralanma"
                      : "Lost Time Injuries"}
                  </div>

                  <div className="mt-1 text-xl font-black">
                    {lostTimeInjuries || "--"}
                  </div>
                </div>

                <div className="px-5 py-4 text-center">
                  <div className="text-xs text-slate-400">
                    {isTurkish
                      ? "Toplam Çalışma Saati"
                      : "Total Hours Worked"}
                  </div>

                  <div className="mt-1 text-xl font-black">
                    {hoursNumber > 0
                      ? hoursNumber.toLocaleString(
                          isTurkish ? "tr-TR" : "en-US"
                        )
                      : "--"}
                  </div>
                </div>
              </div>
            </section>

            {/* FORMULA */}
            <section className="rounded-[24px] border border-white/10 bg-slate-900/65 p-6 sm:p-7">
              <div className="flex items-center gap-3 text-blue-400">
                <span className="text-xl">▦</span>

                <h2 className="text-sm font-black uppercase tracking-[0.16em]">
                  {isTurkish ? "FORMÜL" : "FORMULA"}
                </h2>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-slate-950 px-5 py-5 text-center font-mono text-sm font-bold leading-7 text-slate-100 sm:text-base">
                LTIFR = ({isTurkish ? "Kayıp Zamanlı Yaralanmalar" : "Lost Time Injuries"} ×{" "}
              <span className="text-blue-400">
                {isTurkish ? "1.000.000" : "1,000,000"}
              </span>
              )
              <br />
              ÷ {isTurkish ? "Toplam Çalışılan Saat" : "Total Hours Worked"}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_180px]">
                <p className="text-sm leading-6 text-slate-400">
                  {isTurkish
                    ? "1.000.000 saatlik baz, uluslararası LTIFR raporlamasında yaygın kullanılan normalizasyon yöntemlerinden biridir."
                    : "The 1,000,000-hour base is commonly used for international LTIFR reporting."}
                </p>

                <div className="rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-4 py-3">
                  <div className="text-xs font-black text-blue-300">
                    1,000,000
                  </div>

                  <div className="mt-1 text-[10px] leading-4 text-slate-500">
                    {isTurkish
                      ? "Normalize edilmiş karşılaştırma bazı"
                      : "Normalized comparison base"}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={downloadLTIFRPdf}
                disabled={result === null}
                className="mt-6 flex w-full items-center justify-between rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-violet-500/20 px-5 py-4 text-left transition hover:border-blue-400/40 hover:from-blue-600/30 hover:to-violet-500/30 disabled:cursor-not-allowed disabled:border-white/5 disabled:bg-slate-950/40 disabled:opacity-40"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-xl">
                    📄
                  </span>

                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.08em] text-white">
                      {isTurkish
                        ? "PROFESYONEL LTIFR RAPORU (PDF)"
                        : "PROFESSIONAL LTIFR REPORT (PDF)"}
                    </span>

                    <span className="mt-1 block text-[11px] text-slate-400">
                      {isTurkish
                        ? "Hesaplama • Sonuç • Metodoloji • Yorum"
                        : "Calculation • Result • Methodology • Interpretation"}
                    </span>
                  </span>
                </span>

                <span className="text-lg font-black text-blue-400">
                  ↓
                </span>
              </button>
            </section>

            {/* IMPORTANT */}
            <section className="rounded-[24px] border border-amber-500/35 bg-gradient-to-r from-amber-500/[0.09] to-orange-500/[0.04] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="text-xl text-amber-400">
                  ⚠
                </span>

                <h2 className="text-sm font-black uppercase tracking-[0.1em] text-amber-400">
                  {isTurkish ? "ÖNEMLİ" : "IMPORTANT"}
                </h2>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {isTurkish
                  ? "Dönemler veya lokasyonlar arasında kıyaslama yaparken aynı LTI tanımını, aynı çalışan kapsamını ve doğrulanmış çalışma saati verilerini kullanın."
                  : "Use consistent LTI definitions, workforce scope and verified working-hour data when comparing performance across periods or locations."}
              </p>
            </section>
          </div>
        </section>

        {/* KNOWLEDGE */}
        <section className="mt-7 rounded-[26px] border border-white/10 bg-slate-900/70 p-6 sm:p-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
              {isTurkish
                ? "LTIFR BİLGİ REHBERİ"
                : "UNDERSTAND LTIFR"}
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
              {isTurkish
                ? "LTIFR'ı doğru okuyun ve doğru kullanın"
                : "Understand and use LTIFR correctly"}
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {isTurkish
                ? "Sonucun güvenilir olması; LTI tanımının, raporlama döneminin, çalışan kapsamının ve kullanılan çalışma saatlerinin tutarlı olmasına bağlıdır."
                : "Reliable interpretation depends on consistent LTI definitions, reporting periods, workforce scope and working-hour data."}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KnowledgeCard
              number="01"
              tone="blue"
              icon={<TargetIcon />}
              title={
                isTurkish
                  ? "LTIFR Nedir?"
                  : "What is LTIFR?"
              }
              text={
                isTurkish
                  ? "LTIFR, belirli bir dönemdeki kayıp zamanlı yaralanmaların sıklığını çalışma saatlerine göre normalize eden bir HSE performans göstergesidir."
                  : "LTIFR measures the normalized frequency of lost time injuries during a defined reporting period."
              }
            />

            <KnowledgeCard
              number="02"
              tone="green"
              icon={<PeopleIcon />}
              title={
                isTurkish
                  ? "Neden 1.000.000?"
                  : "Why 1,000,000?"
              }
              text={
                isTurkish
                  ? "1.000.000 saatlik baz, farklı büyüklükteki operasyonların yaralanma sıklığını ortak bir ölçek üzerinde karşılaştırmaya yardımcı olur."
                  : "The 1,000,000-hour base allows organizations of different sizes to compare injury frequency on a common scale."
              }
            />

            <KnowledgeCard
              number="03"
              tone="purple"
              icon={<ClipboardIcon />}
              title={
                isTurkish
                  ? "Hangi Vakalar Sayılır?"
                  : "Which Cases Count?"
              }
              text={
                isTurkish
                  ? "Yalnızca kuruluşunuzun veya geçerli raporlama standardının LTI olarak tanımladığı iş ilişkili vakaları dahil edin. LTI tanımı standarda göre değişebilir."
                  : "Include only work-related cases classified as LTI under the applicable organizational or reporting standard. Definitions can vary."
              }
            />

            <KnowledgeCard
              number="04"
              tone="amber"
              icon={<ChartIcon />}
              title={
                isTurkish
                  ? "Nasıl Yorumlanır?"
                  : "How to Interpret It?"
              }
              text={
                isTurkish
                  ? "Tek bir LTIFR değerini izole yorumlamayın. Trendleri, benzer operasyonları, sektör verilerini ve önceki raporlama dönemlerini birlikte değerlendirin."
                  : "Do not interpret a single LTIFR value in isolation. Compare trends, similar operations, industry data and historical reporting periods."
              }
            />
          </div>
        </section>

        {/* BEST PRACTICE + BENCHMARK */}
        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] border border-blue-400/15 bg-slate-900/65 p-6">
            <div className="flex items-center gap-3 text-blue-400">
              <span className="text-xl">✓</span>

              <h2 className="text-sm font-black uppercase tracking-[0.14em]">
                {isTurkish
                  ? "EN İYİ UYGULAMALAR"
                  : "BEST PRACTICES"}
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {[
                isTurkish
                  ? "LTI sınıflandırmasını tutarlı uygulayın."
                  : "Apply consistent LTI classification.",
                isTurkish
                  ? "Tüm çalışan gruplarının çalışma saatlerini doğrulayın."
                  : "Verify total hours worked across workforce groups.",
                isTurkish
                  ? "Tek bir değerden çok zaman içindeki trende odaklanın."
                  : "Analyze trends over time, not just a single value.",
                isTurkish
                  ? "Sonucu düzeltici ve önleyici faaliyetleri yönlendirmek için kullanın."
                  : "Use the metric to support improvement actions.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-xs leading-5 text-slate-400"
                >
                  <span className="mt-0.5 text-blue-400">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-blue-400/15 bg-slate-900/65 p-6">
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30">
              <svg
                viewBox="0 0 400 160"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>

                <path
                  d="M10 135 L55 112 L92 122 L130 91 L165 104 L205 73 L245 88 L285 42 L325 54 L365 18"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {[["10","135"],["55","112"],["92","122"],["130","91"],["165","104"],["205","73"],["245","88"],["285","42"],["325","54"],["365","18"]].map(
                  ([cx, cy]) => (
                    <circle
                      key={`${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r="5"
                      fill="#3b82f6"
                    />
                  )
                )}
              </svg>
            </div>

            <div className="relative max-w-xl">
              <div className="flex items-center gap-3 text-blue-400">
                <span className="text-xl">☆</span>

                <h2 className="text-sm font-black uppercase tracking-[0.14em]">
                  {isTurkish
                    ? "KIYASLAMA İPUCU"
                    : "BENCHMARKING TIP"}
                </h2>
              </div>

              <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "LTIFR değerini benzer operasyonlar, aynı sektör, önceki dönemler ve kuruluşunuzun kendi hedefleriyle karşılaştırın. Asıl değer tek bir rakamdan çok zaman içindeki yön ve sürekli iyileştirmedir."
                  : "Compare LTIFR with similar operations, the same industry, historical periods and your organization's own targets. Context and trend direction matter more than a single isolated value."}
              </p>
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="mt-5 flex flex-col gap-4 rounded-[22px] border border-white/10 bg-slate-900/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-4xl">
            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">
              {isTurkish
                ? "BİLGİLENDİRME"
                : "DISCLAIMER"}
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              {isTurkish
                ? "Bu araç girilen verilere dayalı bir LTIFR hesaplaması sağlar. Kuruluşunuzun, müşterinizin veya yerel mevzuatın kullandığı LTI tanımı ve raporlama kuralları ayrıca doğrulanmalıdır."
                : "This tool calculates LTIFR from the data provided. Always verify the LTI definition and reporting requirements used by your organization, client or applicable jurisdiction."}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-lg font-black text-white">
              SERNEM
            </div>

            <div className="text-[10px] text-slate-500">
              Professional HSE Platform
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function KnowledgeCard({
  number,
  tone,
  icon,
  title,
  text,
}: {
  number: string;
  tone: "blue" | "green" | "purple" | "amber";
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  const tones = {
    blue: {
      border: "hover:border-blue-400/35",
      icon: "border-blue-400/20 bg-blue-500/10 text-blue-400",
      title: "text-blue-300",
      number: "text-blue-300",
    },
    green: {
      border: "hover:border-emerald-400/35",
      icon: "border-emerald-400/20 bg-emerald-500/10 text-emerald-400",
      title: "text-emerald-300",
      number: "text-emerald-300",
    },
    purple: {
      border: "hover:border-violet-400/35",
      icon: "border-violet-400/20 bg-violet-500/10 text-violet-400",
      title: "text-violet-300",
      number: "text-violet-300",
    },
    amber: {
      border: "hover:border-amber-400/35",
      icon: "border-amber-400/20 bg-amber-500/10 text-amber-400",
      title: "text-amber-300",
      number: "text-amber-300",
    },
  } as const;

  const style = tones[tone];

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-5 transition hover:-translate-y-0.5 hover:bg-slate-950/65 ${style.border}`}
    >
      <div className="absolute right-4 top-3 text-4xl font-black text-white/[0.03]">
        {number}
      </div>

      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${style.icon}`}
        >
          {icon}
        </div>

        <span
          className={`text-[10px] font-black tracking-[0.14em] ${style.number}`}
        >
          {number}
        </span>
      </div>

      <h3 className={`mt-4 text-sm font-black ${style.title}`}>
        {title}
      </h3>

      <p className="mt-3 text-[12px] leading-5 text-slate-400">
        {text}
      </p>
    </article>
  );
}
