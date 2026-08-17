"use client";

import jsPDF from "jspdf";

import { useMemo, useState } from "react";
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

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3l7 3v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12l1.6 1.6 3.7-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
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
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </svg>
  );
}

function ChartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 19V11M10 19V7M15 19v-5M20 19V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 10V7a4 4 0 018 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
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

export default function TRIRPage() {
  const pathname = usePathname();
  const isTurkish = pathname?.startsWith("/tr");

  const [cases, setCases] = useState("");
  const [hours, setHours] = useState("");
  const [calculated, setCalculated] = useState(false);

  const casesNumber = Number(cases);
  const hoursNumber = Number(hours);

  const trir = useMemo(() => {
    if (
      !calculated ||
      !Number.isFinite(casesNumber) ||
      !Number.isFinite(hoursNumber) ||
      casesNumber < 0 ||
      hoursNumber <= 0
    ) {
      return null;
    }

    return (casesNumber * 200000) / hoursNumber;
  }, [calculated, casesNumber, hoursNumber]);

  const validInput =
    cases !== "" &&
    hours !== "" &&
    Number.isFinite(casesNumber) &&
    Number.isFinite(hoursNumber) &&
    casesNumber >= 0 &&
    hoursNumber > 0;

  const calculate = () => {
    if (validInput) setCalculated(true);
  };

  const clear = () => {
    setCases("");
    setHours("");
    setCalculated(false);
  };


  const downloadTRIRPdf = async () => {
    if (trir === null || !validInput) return;

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

    type RGB = [number, number, number];

    const C: Record<string, RGB> = {
      bg: [2, 6, 23],
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

    const resultText = trir.toFixed(2);

    const hoursText = hoursNumber.toLocaleString(
      isTurkish ? "tr-TR" : "en-US"
    );

    const today = new Date().toLocaleDateString(
      isTurkish ? "tr-TR" : "en-GB"
    );

    const reportId =
      "TRIR-" +
      new Date()
        .toISOString()
        .replace(/\D/g, "")
        .slice(0, 14);

    // =====================================================
    // PAGE
    // =====================================================
    doc.setFillColor(...C.bg);
    doc.rect(0, 0, W, H, "F");

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
        ? "TRIR PROFESYONEL PERFORMANS RAPORU"
        : "TRIR PROFESSIONAL PERFORMANCE REPORT",
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

    // LEFT
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
      "TRIR Calculator",
      leftX + 7,
      topY + 17,
      12.5,
      C.white,
      true
    );

    wrapped(
      isTurkish
        ? "Toplam Kaydedilebilir Olay Oranını, kaydedilebilir vaka sayısı ve toplam çalışma saatleri üzerinden hesaplar."
        : "Calculates Total Recordable Incident Rate using recordable cases and total working hours.",
      leftX + 7,
      topY + 24,
      leftW - 14,
      4.6,
      C.muted,
      false,
      3
    );

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

    write(
      isTurkish
        ? "Toplam kaydedilebilir vaka"
        : "Total recordable cases",
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
      "REC",
      leftX + 10,
      topY + 49.4,
      3,
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
      String(casesNumber),
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
      `${casesNumber} × 200.000 ÷ ${hoursText} = ${resultText}`,
      leftX + leftW / 2,
      topY + 96.3,
      4.3,
      C.white,
      true,
      "center"
    );

    // =====================================================
    // RIGHT RESULT
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
      "TRIR RESULT",
      rightX + 7,
      topY + 8
    );

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

    const ringX = rightX + 20;
    const ringY = topY + 29;

    circleBadge(
      ringX,
      ringY,
      13,
      C.blue,
      C.bg
    );

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
      "TRIR",
      rightX + 38,
      topY + 35,
      9,
      C.blue,
      true
    );

    wrapped(
      isTurkish
        ? "200.000 çalışma saati başına toplam kaydedilebilir olay oranı."
        : "Total Recordable Incident Rate per 200,000 working hours.",
      rightX + 38,
      topY + 41,
      rightW - 45,
      3.7,
      C.muted,
      false,
      3
    );

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
        ? `${resultText} TRIR değerini tek başına iyi/kötü olarak yorumlamayın; trendler, sektör ve benzer operasyonlarla karşılaştırın.`
        : `Do not classify ${resultText} TRIR in isolation; compare trends, industry and similar operations.`,
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
    // FORMULA
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
      "TRIR = (Recordable Cases × 200,000)",
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
        ? "200.000 saatlik baz, yaklaşık 100 tam zamanlı çalışanın yıllık çalışma süresini temsil eden standart normalizasyon bazıdır."
        : "The 200,000-hour base represents the approximate annual hours of 100 full-time workers.",
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
      "200,000",
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
        ? "Karşılaştırmalarda aynı kayıt kriteri, çalışan kapsamı ve doğrulanmış çalışma saatleri kullanılmalıdır."
        : "Use consistent recordability criteria, workforce scope and verified working hours for comparisons.",
      rightX + 7,
      topY + 116.7,
      rightW - 14,
      3,
      C.muted,
      false,
      2
    );

    // =====================================================
    // KNOWLEDGE
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
        ? "TRIR BİLGİ REHBERİ"
        : "TRIR KNOWLEDGE GUIDE",
      16,
      guideY + 8
    );

    write(
      isTurkish
        ? "TRIR'ı doğru okuyun ve doğru kullanın"
        : "Understand and use TRIR correctly",
      16,
      guideY + 15,
      8.2,
      C.white,
      true
    );

    wrapped(
      isTurkish
        ? "Doğru yorumlama; kayıt kriterlerinin, raporlama döneminin, çalışan kapsamının ve 200.000 saatlik normalizasyonun tutarlı kullanılmasına bağlıdır."
        : "Reliable interpretation depends on consistent recordability criteria, reporting periods, workforce scope and 200,000-hour normalization.",
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
            title: "TRIR Nedir?",
            body:
              "Kaydedilebilir iş ilişkili vakaların sıklığını 200.000 çalışma saatine göre normalize eden HSE performans göstergesidir.",
            color: C.blue,
          },
          {
            no: "02",
            title: "Neden 200.000?",
            body:
              "Yaklaşık 100 tam zamanlı çalışanın yıllık çalışma süresini temsil eden standart karşılaştırma bazıdır.",
            color: C.green,
          },
          {
            no: "03",
            title: "Hangi Vakalar Sayılır?",
            body:
              "Geçerli kayıt standardına göre kaydedilebilir kabul edilen iş ilişkili vakaları dahil edin.",
            color: C.violet,
          },
          {
            no: "04",
            title: "Nasıl Yorumlanır?",
            body:
              "Tek değeri izole değerlendirmeyin. Trend, sektör, benzer operasyonlar ve önceki dönemlerle birlikte inceleyin.",
            color: C.amber,
          },
        ]
      : [
          {
            no: "01",
            title: "What is TRIR?",
            body:
              "An HSE performance indicator that normalizes recordable work-related cases to 200,000 working hours.",
            color: C.blue,
          },
          {
            no: "02",
            title: "Why 200,000?",
            body:
              "A standard comparison base representing approximately 100 full-time workers annually.",
            color: C.green,
          },
          {
            no: "03",
            title: "Which Cases Count?",
            body:
              "Include work-related cases classified as recordable under the applicable reporting standard.",
            color: C.violet,
          },
          {
            no: "04",
            title: "How to Interpret?",
            body:
              "Avoid isolated interpretation. Compare trends, industry, similar operations and historical periods.",
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
          "Kayıt kriterlerini tutarlı uygulayın.",
          "Çalışma saatlerini doğrulayın.",
          "Tek değerden çok trende odaklanın.",
          "Sonucu iyileştirme faaliyetlerinde kullanın.",
        ]
      : [
          "Apply consistent recordability criteria.",
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
        ? "TRIR değerini aynı sektör, benzer operasyonlar, önceki dönemler ve kuruluşunuzun kendi hedefleriyle karşılaştırın. Asıl değer tek bir rakamdan çok zaman içindeki yön ve sürekli iyileştirmedir."
        : "Compare TRIR with the same industry, similar operations, historical periods and your own targets. Trend direction and continuous improvement matter more than one isolated number.",
      benchX + 6,
      bottomY + 16,
      benchW - 45,
      3.3,
      C.muted,
      false,
      7,
      1.2
    );

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
        ? "Bu rapor girilen verilere dayalı otomatik TRIR hesaplamasıdır. Kuruluşunuzun, müşterinizin veya geçerli mevzuatın kullandığı kayıt kriterleri ve raporlama kuralları ayrıca doğrulanmalıdır."
        : "This report is an automated TRIR calculation based on the data entered. Verify the recordability criteria and reporting requirements used by your organization, client or applicable jurisdiction.",
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

    doc.setDrawColor(...C.border);
    doc.line(10, 285, W - 10, 285);

    write(
      "SERNEM • TRIR Calculator",
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
      `SERNEM-TRIR-Dashboard-${resultText.replace(".", "-")}.pdf`
    );
  };

  const displayedResult = trir !== null ? trir.toFixed(2) : "--";

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
      style={{
        background:
          "radial-gradient(circle at 15% 10%, rgba(37,99,235,0.10), transparent 28%), radial-gradient(circle at 85% 25%, rgba(6,182,212,0.06), transparent 25%), #020617",
      }}
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-10 h-[420px] w-[420px] rounded-full bg-blue-600/[0.06] blur-[120px]" />
        <div className="absolute right-[5%] top-[20%] h-[360px] w-[360px] rounded-full bg-cyan-500/[0.04] blur-[130px]" />
        <div className="absolute bottom-0 left-[45%] h-[300px] w-[500px] rounded-full bg-violet-600/[0.04] blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1380px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <a
          href={isTurkish ? "/tr/tools" : "/en/tools"}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          <span>←</span>
          {isTurkish ? "Tüm Hesaplayıcılara Dön" : "Back to Safety Calculators"}
        </a>

        <section className="mt-7 grid gap-7 xl:grid-cols-[1.03fr_0.97fr]">
          {/* LEFT */}
          <div className="relative overflow-hidden rounded-[28px] border border-blue-400/20 bg-slate-900 shadow-[0_25px_80px_rgba(2,6,23,0.55),0_0_40px_rgba(37,99,235,0.05)] p-6 shadow-[0_30px_100px_rgba(0,0,0,.35)] sm:p-8 lg:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
                    {isTurkish
                      ? "GÜVENLİK PERFORMANS HESAPLAYICI"
                      : "SAFETY PERFORMANCE CALCULATOR"}
                  </p>

                  <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-[42px]">
                    TRIR Calculator
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                    {isTurkish
                      ? "Toplam Kaydedilebilir Olay Oranını, kaydedilebilir vaka sayısı ve toplam çalışan saatlerini kullanarak profesyonel şekilde hesaplayın."
                      : "Calculate the Total Recordable Incident Rate using recordable cases and total employee hours worked."}
                  </p>
                </div>

                <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400 shadow-[0_0_35px_rgba(37,99,235,.15)] sm:flex">
                  <TrendIcon className="h-10 w-10" />
                </div>
              </div>

              <div className="mt-10 space-y-7">
                <div className="grid gap-4 sm:grid-cols-[72px_1fr] sm:items-center">
                  <div className="flex h-[66px] w-[66px] items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/[0.08] text-blue-400">
                    <ShieldIcon className="h-8 w-8" />
                  </div>

                  <label>
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-200">
                      {isTurkish
                        ? "Toplam kaydedilebilir vaka"
                        : "Total recordable cases"}
                      <InfoTooltip
                        text={
                          isTurkish
                            ? "OSHA kayıt kriterlerine göre kaydedilebilir kabul edilen iş ilişkili vakaların toplam sayısını girin. Ölüm, işten uzak kalma, kısıtlı çalışma veya görev değişikliği ve belirli tıbbi tedavi gerektiren vakalar bu kapsama girebilir."
                            : "Enter the total number of work-related cases considered recordable under OSHA recordkeeping criteria, including cases involving death, days away, restricted work or job transfer, and certain medical treatment."
                        }
                      />
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={cases}
                      onChange={(e) => {
                        setCases(e.target.value);
                        setCalculated(false);
                      }}
                      placeholder="4"
                      className="mt-3 h-14 w-full rounded-xl border border-slate-600/60 bg-slate-950 px-5 text-base font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <span className="mt-2 block text-xs text-slate-500">
                      {isTurkish ? "Örnek: 4" : "Example: 4"}
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
                            ? "Aynı raporlama döneminde çalışanların fiilen çalıştığı toplam saatleri girin. Doğru karşılaştırma için vaka sayısı ve çalışma saatleri aynı dönemden olmalıdır."
                            : "Enter the total hours actually worked by employees during the same reporting period. Cases and working hours must come from the same period for a valid rate."
                        }
                      />
                    </span>

                    <input
                      type="number"
                      min="1"
                      value={hours}
                      onChange={(e) => {
                        setHours(e.target.value);
                        setCalculated(false);
                      }}
                      placeholder="500000"
                      className="mt-3 h-14 w-full rounded-xl border border-slate-600/60 bg-slate-950 px-5 text-base font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <span className="mt-2 block text-xs text-slate-500">
                      {isTurkish ? "Örnek: 500000" : "Example: 500000"}
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={calculate}
                disabled={!validInput}
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 text-sm font-black text-white shadow-[0_12px_35px_rgba(37,99,235,.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="text-lg">▦</span>
                {isTurkish ? "TRIR HESAPLA" : "CALCULATE TRIR"}
              </button>

              <button
                type="button"
                onClick={clear}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/30 text-sm font-bold text-slate-300 transition hover:border-white/20 hover:bg-slate-900"
              >
                <span className="text-lg">↻</span>
                {isTurkish ? "Tümünü Temizle" : "Clear All"}
              </button>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-500/25 bg-blue-500/[0.06] px-4 py-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">
                  💡
                </div>
                <p className="pt-1 text-xs leading-5 text-slate-400">
                  <strong className="text-blue-300">
                    {isTurkish ? "İpucu:" : "Tip:"}
                  </strong>{" "}
                  {isTurkish
                    ? "Doğru karşılaştırma için vaka ve çalışma saati verilerinin aynı zaman dönemine ait olduğundan emin olun."
                    : "Ensure case and working-hour data are from the same time period for accurate comparisons."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <section
              className="relative overflow-hidden rounded-[28px] border border-cyan-400/30 bg-slate-900 p-6 shadow-[0_30px_100px_rgba(0,0,0,.35),0_0_50px_rgba(6,182,212,.06)] sm:p-8"
              style={{
                background:
                  "radial-gradient(circle at 78% 30%, rgba(37,99,235,.12), transparent 35%), linear-gradient(135deg,#0f1c34,#071326)",
              }}
            >
              <div className="pointer-events-none absolute right-[-8%] top-[25%] h-64 w-64 rounded-full border border-blue-500/10 opacity-30" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-80 bg-gradient-to-tl from-blue-500/[0.08] to-transparent" />

              <div className="relative flex items-start justify-between">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-400">
                  TRIR RESULT
                </p>

                {trir !== null && (
                  <span className="rounded-lg border border-emerald-400/50 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-black text-emerald-400">
                    ✓ {isTurkish ? "Hesaplandı" : "Calculated"}
                  </span>
                )}
              </div>

              <div className="relative mt-7 grid gap-7 md:grid-cols-[190px_1fr] md:items-center">
                <div className="relative mx-auto flex h-[190px] w-[190px] items-center justify-center rounded-full border border-blue-400/20 bg-slate-950 shadow-[0_0_45px_rgba(37,99,235,.12)]">
                  <div className="absolute inset-[13px] rounded-full bg-[conic-gradient(from_10deg,#168cff,#7357ff,#168cff)] p-[8px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-blue-500/[0.07] text-blue-500 shadow-[0_0_35px_rgba(37,99,235,.18)]">
                        <TrendIcon className="h-14 w-14" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-6xl font-black tracking-[-0.04em] text-white sm:text-7xl">
                    {displayedResult}
                  </div>

                  <div className="mt-1 text-4xl font-black tracking-tight text-blue-500">
                    TRIR
                  </div>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                    {isTurkish
                      ? "200.000 çalışma saati başına Toplam Kaydedilebilir Olay Oranı."
                      : "Total Recordable Incident Rate per 200,000 working hours."}
                  </p>
                </div>
              </div>

              {trir !== null && (
                <div className="relative mt-6 rounded-xl border border-blue-400/15 bg-blue-500/[0.05] px-5 py-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-400">
                    {isTurkish ? "SONUÇ YORUMU" : "RESULT INTERPRETATION"}
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-300">
                    {isTurkish
                      ? `Hesaplanan TRIR değeri ${trir.toFixed(
                          2
                        )}. Bu sonuç performans trendleri, önceki dönemler ve benzer operasyonlarla birlikte değerlendirilmelidir.`
                      : `The calculated TRIR is ${trir.toFixed(
                          2
                        )}. Evaluate this result together with historical trends, comparable operations and reporting periods.`}
                  </p>
                </div>
              )}

              <div className="relative mt-7 grid grid-cols-2 divide-x divide-white/10 rounded-xl border border-blue-400/20 bg-slate-950/20">
                <div className="px-5 py-4 text-center">
                  <div className="text-xs text-slate-400">
                    {isTurkish ? "Kaydedilebilir Vaka" : "Recordable Cases"}
                  </div>
                  <div className="mt-1 text-xl font-black">
                    {cases || "--"}
                  </div>
                </div>

                <div className="px-5 py-4 text-center">
                  <div className="text-xs text-slate-400">
                    {isTurkish ? "Toplam Çalışma Saati" : "Total Hours Worked"}
                  </div>
                  <div className="mt-1 text-xl font-black">
                    {hoursNumber > 0
                      ? hoursNumber.toLocaleString(isTurkish ? "tr-TR" : "en-US")
                      : "--"}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-slate-900/65 p-6 sm:p-7">
              <div className="flex items-center gap-3 text-blue-400">
                <span className="text-xl">⚗</span>
                <h2 className="text-sm font-black uppercase tracking-[0.16em]">
                  {isTurkish ? "FORMÜL" : "FORMULA"}
                </h2>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-slate-950 px-5 py-5 text-center font-mono text-sm font-bold leading-7 text-slate-100 sm:text-base">
                TRIR = ({isTurkish ? "Kaydedilebilir Vakalar" : "Recordable Cases"} ×{" "}
              <span className="text-blue-400">
                {isTurkish ? "200.000" : "200,000"}
              </span>
              <br />÷ {isTurkish ? "Toplam Çalışılan Saat" : "Total Hours Worked"}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "200.000 saatlik baz, haftada 40 saat ve yılda 50 hafta çalışan yaklaşık 100 tam zamanlı çalışanın yıllık çalışma süresini temsil eder."
                  : "The 200,000-hour base represents 100 full-time employees working 40 hours per week for 50 weeks."}
              </p>
            
              <button
                type="button"
                onClick={downloadTRIRPdf}
                disabled={trir === null}
                className="mt-6 flex w-full items-center justify-between rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-violet-500/20 px-5 py-4 text-left transition hover:border-blue-400/40 hover:from-blue-600/30 hover:to-violet-500/30 disabled:cursor-not-allowed disabled:border-white/5 disabled:bg-slate-950/40 disabled:opacity-40"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-xl">
                    📄
                  </span>

                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.08em] text-white">
                      {isTurkish
                        ? "PROFESYONEL TRIR RAPORU (PDF)"
                        : "PROFESSIONAL TRIR REPORT (PDF)"}
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

            <section className="rounded-[24px] border border-amber-500/35 bg-gradient-to-r from-amber-500/[0.09] to-orange-500/[0.04] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="text-xl text-amber-400">⚠</span>
                <h2 className="text-sm font-black uppercase tracking-[0.1em] text-amber-400">
                  {isTurkish ? "ÖNEMLİ" : "IMPORTANT"}
                </h2>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                {isTurkish
                  ? "Dönemler, lokasyonlar veya iş birimleri arasında performans karşılaştırması yaparken tutarlı vaka sınıflandırması ve doğrulanmış çalışma saati verileri kullanın."
                  : "Use consistent case classification and verified working-hour data when comparing performance across periods or locations."}
              </p>
            </section>
          </div>
        </section>

        {/* TRIR KNOWLEDGE */}
        <section className="mt-7 rounded-[26px] border border-white/10 bg-slate-900/70 p-6 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">
                {isTurkish ? "TRIR BİLGİ REHBERİ" : "TRIR KNOWLEDGE GUIDE"}
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                {isTurkish
                  ? "Sonucun ne anlama geldiğini bilin"
                  : "Understand what the result means"}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "TRIR yalnızca bir sayı değildir. Doğru yorumlama; kayıt kriterlerini, çalışma saatlerini, 200.000 saatlik normalizasyonu ve karşılaştırma yöntemini anlamayı gerektirir."
                  : "TRIR is more than a number. Correct interpretation requires understanding recordability, hours worked, the 200,000-hour normalization and appropriate comparison methods."}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">
              {isTurkish ? "HSE Referans Bilgisi" : "HSE Reference"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KnowledgeCard
              number="01"
              title={isTurkish ? "TRIR Nedir?" : "What is TRIR?"}
              text={
                isTurkish
                  ? "TRIR, Toplam Kaydedilebilir Olay Oranıdır. Belirli bir dönemdeki kaydedilebilir iş kazalarını 200.000 çalışma saati bazına normalize ederek güvenlik performansını karşılaştırılabilir hale getirir."
                  : "TRIR is the Total Recordable Incident Rate. It normalizes recordable work-related cases to a 200,000-hour base so safety performance can be compared consistently."
              }
            />

            <KnowledgeCard
              number="02"
              title={isTurkish ? "200.000 Neden?" : "Why 200,000?"}
              text={
                isTurkish
                  ? "200.000 saat, yaklaşık 100 tam zamanlı çalışanın yılda 2.000'er saat çalışmasına karşılık gelen standart normalizasyon bazıdır."
                  : "200,000 hours is the standard normalization base representing roughly 100 full-time employees working about 2,000 hours each per year."
              }
            />

            <KnowledgeCard
              number="03"
              title={isTurkish ? "Hangi Vakalar Dahil?" : "Which Cases Count?"}
              text={
                isTurkish
                  ? "OSHA kayıt yaklaşımında ölüm, işten uzak kalma, kısıtlı çalışma veya görev değişikliği ve belirli tıbbi tedavi gerektiren iş ilişkili vakalar kaydedilebilir olabilir."
                  : "Under OSHA recordkeeping, work-related cases involving death, days away, restricted work or job transfer, and certain medical treatment may be recordable."
              }
            />

            <KnowledgeCard
              number="04"
              title={isTurkish ? "Nasıl Yorumlanır?" : "How to Interpret It?"}
              text={
                isTurkish
                  ? "TRIR tek başına iyi veya kötü olarak yorumlanmamalıdır. Aynı sektör, lokasyon, dönem ve geçmiş performans ile birlikte değerlendirilmelidir."
                  : "TRIR should not be judged as good or bad in isolation. Compare it with the same industry, location, reporting period and historical performance."
              }
            />
          </div>
        </section>

        {/* BENEFITS */}
        <section className="mt-7 grid overflow-hidden rounded-[26px] border border-white/10 bg-slate-900 md:grid-cols-2 xl:grid-cols-4">
          <Feature
            icon={<TargetIcon />}
            tone="blue"
            title={isTurkish ? "Doğru Hesaplama" : "Accurate Calculation"}
            text={
              isTurkish
                ? "200.000 saatlik normalizasyon ile endüstride kullanılan standart TRIR formülü."
                : "Industry-standard TRIR formula with 200,000-hour normalization."
            }
          />

          <Feature
            icon={<ShieldIcon />}
            tone="green"
            title={isTurkish ? "Performans Kıyaslama" : "Benchmark Performance"}
            text={
              isTurkish
                ? "Dönem, lokasyon ve iş birimleri arasında sonuçları karşılaştırın."
                : "Compare results across periods, locations and business units."
            }
          />

          <Feature
            icon={<ChartIcon />}
            tone="purple"
            title={isTurkish ? "Veriye Dayalı İçgörü" : "Data-Driven Insights"}
            text={
              isTurkish
                ? "Güvenilir performans metrikleriyle daha güçlü HSE kararları alın."
                : "Make informed safety decisions with reliable performance metrics."
            }
          />

          <Feature
            icon={<LockIcon />}
            tone="amber"
            title={isTurkish ? "Güvenilir ve Uyumlu" : "Trusted & Compliant"}
            text={
              isTurkish
                ? "Global HSE raporlama yaklaşımına uygun, açık ve izlenebilir hesaplama."
                : "Clear and traceable calculation aligned with global HSE reporting practices."
            }
          />
        </section>

        <footer className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>◈ SERNEM TRIR Calculator</span>
          <span>© 2026 SERNEM</span>
          <span>
            {isTurkish
              ? "Güvenli • Doğru • Profesyonel"
              : "Safe • Accurate • Professional"}{" "}
            🛡
          </span>
        </footer>
      </div>
    </main>
  );
}

function KnowledgeCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-5 transition hover:-translate-y-0.5 hover:border-blue-400/25 hover:bg-slate-950/65">
      <div className="absolute right-4 top-3 text-4xl font-black text-white/[0.03]">
        {number}
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-xs font-black text-blue-300">
        {number}
      </div>

      <h3 className="mt-4 text-sm font-black text-white">
        {title}
      </h3>

      <p className="mt-3 text-[12px] leading-5 text-slate-400">
        {text}
      </p>
    </article>
  );
}

function Feature({
  icon,
  tone,
  title,
  text,
}: {
  icon: React.ReactNode;
  tone: "blue" | "green" | "purple" | "amber";
  title: string;
  text: string;
}) {
  const toneMap = {
    blue: {
      icon: "border-blue-500/30 bg-blue-500/10 text-blue-400",
      title: "text-blue-200",
    },
    green: {
      icon: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      title: "text-emerald-300",
    },
    purple: {
      icon: "border-violet-500/30 bg-violet-500/10 text-violet-400",
      title: "text-violet-300",
    },
    amber: {
      icon: "border-amber-500/30 bg-amber-500/10 text-amber-400",
      title: "text-amber-200",
    },
  } as const;

  const style = toneMap[tone];

  return (
    <article className="relative flex min-h-[205px] gap-5 border-b border-white/10 p-6 last:border-b-0 md:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border ${style.icon}`}
      >
        {icon}
      </div>

      <div>
        <h3 className={`text-base font-black leading-5 ${style.title}`}>
          {title}
        </h3>

        <p className="mt-3 text-[13px] leading-5 text-slate-400">
          {text}
        </p>
      </div>
    </article>
  );
}
