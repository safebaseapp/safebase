import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import { getToolboxBySlug } from "@/lib/toolbox/toolbox-data";

type Locale = "tr" | "en";

type GeneratePremiumToolboxPdfArgs = {
  slug: string;
  locale: Locale;
  logoBytes: Uint8Array;
  logoMime: string;
};

const PAGE_W = 794;
const PAGE_H = 1123;

function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((x): x is string => typeof x === "string");
}

function cleanTitle(title: string) {
  return title
    .replace(/\s+TOOLBOX TALK$/i, "")
    .trim();
}

function wrapText(text: string, maxChars = 72): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;

    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function textLines(
  lines: string[],
  x: number,
  y: number,
  options: {
    fontSize?: number;
    lineHeight?: number;
    weight?: number;
    fill?: string;
    maxLines?: number;
  } = {},
) {
  const {
    fontSize = 17,
    lineHeight = 25,
    weight = 400,
    fill = "#24364b",
    maxLines = 20,
  } = options;

  return lines
    .slice(0, maxLines)
    .map(
      (line, index) => `
        <text
          x="${x}"
          y="${y + index * lineHeight}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="${fontSize}"
          font-weight="${weight}"
          fill="${fill}"
        >${esc(line)}</text>
      `,
    )
    .join("");
}

function paragraph(
  value: string,
  x: number,
  y: number,
  widthChars = 76,
  options: {
    fontSize?: number;
    lineHeight?: number;
    fill?: string;
    weight?: number;
    maxLines?: number;
  } = {},
) {
  return textLines(wrapText(value, widthChars), x, y, options);
}

function bulletList(
  values: string[],
  x: number,
  y: number,
  options: {
    maxChars?: number;
    fontSize?: number;
    lineHeight?: number;
    gap?: number;
    dotColor?: string;
    maxItems?: number;
  } = {},
) {
  const {
    maxChars = 66,
    fontSize = 15,
    lineHeight = 21,
    gap = 8,
    dotColor = "#10b981",
    maxItems = 20,
  } = options;

  let cursorY = y;
  let svg = "";

  for (const item of values.slice(0, maxItems)) {
    const lines = wrapText(item, maxChars);

    svg += `
      <circle cx="${x}" cy="${cursorY - 5}" r="4.5" fill="${dotColor}" />
      ${textLines(lines, x + 20, cursorY, {
        fontSize,
        lineHeight,
        fill: "#1f3147",
        maxLines: 4,
      })}
    `;

    cursorY += lines.length * lineHeight + gap;
  }

  return svg;
}

function checkboxList(
  values: string[],
  x: number,
  y: number,
  columnWidth: number,
) {
  return values
    .slice(0, 10)
    .map((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);

      const px = x + col * columnWidth;
      const py = y + row * 31;

      return `
        <rect
          x="${px}"
          y="${py - 15}"
          width="18"
          height="18"
          rx="3"
          fill="#ffffff"
          stroke="#10b981"
          stroke-width="2"
        />
        <text
          x="${px + 29}"
          y="${py}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="14"
          font-weight="500"
          fill="#24364b"
        >${esc(item)}</text>
      `;
    })
    .join("");
}

function baseSvg(inner: string) {
  return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${PAGE_W}"
    height="${PAGE_H}"
    viewBox="0 0 ${PAGE_W} ${PAGE_H}"
  >
    <defs>
      <linearGradient id="headerGrad" x1="0" x2="1">
        <stop offset="0%" stop-color="#06152b"/>
        <stop offset="60%" stop-color="#09284b"/>
        <stop offset="100%" stop-color="#064b75"/>
      </linearGradient>

      <linearGradient id="blueGrad" x1="0" x2="1">
        <stop offset="0%" stop-color="#1268e8"/>
        <stop offset="100%" stop-color="#268cff"/>
      </linearGradient>

      <linearGradient id="greenGrad" x1="0" x2="1">
        <stop offset="0%" stop-color="#04a876"/>
        <stop offset="100%" stop-color="#13c393"/>
      </linearGradient>

      <linearGradient id="orangeGrad" x1="0" x2="1">
        <stop offset="0%" stop-color="#e9570b"/>
        <stop offset="100%" stop-color="#ff8619"/>
      </linearGradient>

      <linearGradient id="slateGrad" x1="0" x2="1">
        <stop offset="0%" stop-color="#24364b"/>
        <stop offset="100%" stop-color="#475569"/>
      </linearGradient>

      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="12"
          flood-color="#0f172a"
          flood-opacity="0.10"
        />
      </filter>
    </defs>

    <rect width="${PAGE_W}" height="${PAGE_H}" fill="#f8fafc" />

    ${inner}
  </svg>
  `;
}

function header({
  logoData,
  title,
  subtitle,
  duration,
  docRef,
  revision,
}: {
  logoData: string;
  title: string;
  subtitle: string;
  duration: string;
  docRef: string;
  revision: string;
}) {
  return `
    <rect
      x="0"
      y="0"
      width="${PAGE_W}"
      height="174"
      fill="#06152b"
    />

    <rect
      x="0"
      y="0"
      width="9"
      height="174"
      fill="#1785ff"
    />

    <text
      x="54"
      y="42"
      font-family="Arial, Helvetica, sans-serif"
      font-size="12"
      font-weight="700"
      letter-spacing="4.5"
      fill="#52b8ff"
    >HSE • TOOLBOX TALK</text>

    <text
      x="54"
      y="91"
      font-family="Arial, Helvetica, sans-serif"
      font-size="${title.length > 24 ? 29 : 35}"
      font-weight="800"
      fill="#ffffff"
    >${esc(title)}</text>

    <text
      x="54"
      y="122"
      font-family="Arial, Helvetica, sans-serif"
      font-size="14"
      fill="#d6e0ea"
    >${esc(subtitle)}</text>

    <!-- DOCUMENT CONTROL -->
    <rect
      x="54"
      y="140"
      width="378"
      height="23"
      rx="6"
      fill="#0c2342"
    />

    <text
      x="68"
      y="156"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10"
      font-weight="800"
      letter-spacing="1.1"
      fill="#c0cfdf"
    >DOC REF</text>

    <text
      x="125"
      y="156"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9.5"
      font-weight="700"
      fill="#ffffff"
    >${esc(docRef)}</text>

    <line
      x1="288"
      y1="145"
      x2="288"
      y2="159"
      stroke="#38516d"
    />

    <text
      x="302"
      y="156"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9.5"
      font-weight="700"
      letter-spacing="1"
      fill="#c0cfdf"
    >REV</text>

    <text
      x="340"
      y="156"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9.5"
      font-weight="800"
      fill="#ffffff"
    >${esc(revision)}</text>

    ${
      duration
        ? `
        <rect
          x="456"
          y="131"
          width="126"
          height="32"
          rx="14"
          fill="#1476f2"
        />

        <text
          x="519"
          y="152"
          text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="11"
          font-weight="800"
          fill="#ffffff"
        >${esc(duration)}</text>
        `
        : ""
    }

    <!-- COMPANY IDENTITY -->
    <rect
      x="590"
      y="14"
      width="184"
      height="106"
      rx="11"
      fill="#ffffff"
    />

    <image
      href="${logoData}"
      x="600"
      y="23"
      width="164"
      height="88"
      preserveAspectRatio="xMidYMid meet"
    />
  `;
}

function footer({
  title,
  page,
  docRef,
  revision,
}: {
  title: string;
  page: number;
  docRef: string;
  revision: string;
}) {
  return `
    <rect
      x="0"
      y="1052"
      width="${PAGE_W}"
      height="71"
      fill="#06152b"
    />

    <text
      x="48"
      y="1082"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10.5"
      font-weight="800"
      letter-spacing="2.2"
      fill="#ffffff"
    >HSE TOOLBOX TALK</text>

    <text
      x="48"
      y="1101"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9.5"
      font-weight="700"
      fill="#d8e1eb"
    >${esc(docRef)}  •  REV ${esc(revision)}</text>

    <text
      x="397"
      y="1091"
      text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10.5"
      font-weight="700"
      fill="#d8e1eb"
    >${esc(title)}</text>

    <rect
      x="695"
      y="1070"
      width="49"
      height="29"
      rx="8"
      fill="#102b4d"
    />

    <text
      x="719"
      y="1089"
      text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif"
      font-size="11"
      font-weight="800"
      fill="#ffffff"
    >${page}/3</text>
  `;
}

function sectionTitle(
  title: string,
  x: number,
  y: number,
  width: number,
  gradient: string,
) {
  return `
    <rect
      x="${x}"
      y="${y}"
      width="${width}"
      height="48"
      rx="20"
      fill="${gradient}"
    />

    <text
      x="${x + 28}"
      y="${y + 31}"
      font-family="Arial, Helvetica, sans-serif"
      font-size="19"
      font-weight="800"
      fill="#ffffff"
    >${esc(title)}</text>
  `;
}

function pageOne(
  c: Record<string, unknown>,
  logoData: string,
  title: string,
  locale: Locale,
  docRef: string,
  revision: string,
) {
  const objective = asString(c.objective);
  const explanation = asArray(c.explanation);
  const scenario = asArray(c.scenario);
  const remember = asString(c.remember);
  const hazards = asArray(c.hazards);
  const supervisor = asString(c.supervisor_script);

  const focusTitle =
    locale === "tr"
      ? "OPERASYONEL ODAK"
      : "OPERATIONAL FOCUS";

  const briefingTitle =
    locale === "tr"
      ? "SAHA BRİFİNGİ"
      : "FIELD BRIEFING";

  const criticalTitle =
    locale === "tr"
      ? "KRİTİK KURAL"
      : "CRITICAL RULE";

  return baseSvg(`
    ${header({
      logoData,
      title,
      subtitle: asString(c.subtitle),
      duration: asString(c.duration),
      docRef,
      revision,
    })}

    <!-- OBJECTIVE -->
    <rect
      x="44"
      y="198"
      width="706"
      height="111"
      rx="16"
      fill="#ffffff"
      stroke="#d9e4ef"
      filter="url(#shadow)"
    />

    <rect
      x="44"
      y="198"
      width="7"
      height="111"
      rx="4"
      fill="#1785ff"
    />

    <text
      x="72"
      y="229"
      font-family="Arial, Helvetica, sans-serif"
      font-size="11"
      font-weight="800"
      letter-spacing="2.4"
      fill="#1785ff"
    >${esc(asString(c.objective_title, "OBJECTIVE"))}</text>

    ${paragraph(objective, 72, 261, 88, {
      fontSize: 15,
      lineHeight: 21,
      fill: "#24374d",
      maxLines: 3,
    })}

    <!-- OPERATIONAL FOCUS -->
    <text
      x="46"
      y="348"
      font-family="Arial, Helvetica, sans-serif"
      font-size="12"
      font-weight="800"
      letter-spacing="2.2"
      fill="#475569"
    >${esc(focusTitle)}</text>

    ${hazards.slice(0, 3).map((hazard, index) => {
      const x = 44 + index * 237;

      return `
        <rect
          x="${x}"
          y="365"
          width="222"
          height="94"
          rx="15"
          fill="#0b1f39"
        />

        <rect
          x="${x + 14}"
          y="380"
          width="31"
          height="31"
          rx="9"
          fill="#153a62"
        />

        <text
          x="${x + 29}"
          y="401"
          text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="12"
          font-weight="800"
          fill="#65bfff"
        >0${index + 1}</text>

        ${paragraph(hazard, x + 57, 392, 26, {
          fontSize: 11.5,
          lineHeight: 16,
          weight: 700,
          fill: "#ffffff",
          maxLines: 3,
        })}
      `;
    }).join("")}

    <!-- FIELD BRIEF -->
    <rect
      x="44"
      y="488"
      width="340"
      height="294"
      rx="18"
      fill="#ffffff"
      stroke="#dce6ef"
      filter="url(#shadow)"
    />

    <text
      x="68"
      y="522"
      font-family="Arial, Helvetica, sans-serif"
      font-size="13"
      font-weight="800"
      fill="#0f172a"
    >${esc(briefingTitle)}</text>

    <line
      x1="68"
      y1="536"
      x2="360"
      y2="536"
      stroke="#d9e3ec"
    />

    ${bulletList(explanation, 72, 561, {
      maxChars: 49,
      fontSize: 10.1,
      lineHeight: 13.2,
      gap: 3,
      dotColor: "#1785ff",
      maxItems: 3,
    })}

    <!-- REALISTIC SCENARIO -->
    <rect
      x="408"
      y="488"
      width="342"
      height="294"
      rx="18"
      fill="#fff9f3"
      stroke="#fed7aa"
      filter="url(#shadow)"
    />

    <text
      x="432"
      y="522"
      font-family="Arial, Helvetica, sans-serif"
      font-size="13"
      font-weight="800"
      fill="#c2410c"
    >${esc(asString(c.scenario_title, "SITE SCENARIO"))}</text>

    <line
      x1="432"
      y1="536"
      x2="726"
      y2="536"
      stroke="#fed7aa"
    />

    ${bulletList(scenario, 436, 563, {
      maxChars: 48,
      fontSize: 10.3,
      lineHeight: 13.7,
      gap: 3,
      dotColor: "#f97316",
      maxItems: 3,
    })}

    <!-- CRITICAL RULE -->
    <rect
      x="44"
      y="804"
      width="706"
      height="91"
      rx="17"
      fill="#111f32"
    />

    <rect
      x="44"
      y="804"
      width="7"
      height="91"
      rx="4"
      fill="#f59e0b"
    />

    <text
      x="72"
      y="834"
      font-family="Arial, Helvetica, sans-serif"
      font-size="11"
      font-weight="800"
      letter-spacing="2"
      fill="#fbbf24"
    >${esc(criticalTitle)}</text>

    ${paragraph(remember, 72, 860, 78, {
      fontSize: 12.3,
      lineHeight: 16,
      weight: 700,
      fill: "#ffffff",
      maxLines: 3,
    })}

    <!-- SUPERVISOR BRIEF -->
    <rect
      x="44"
      y="910"
      width="706"
      height="130"
      rx="17"
      fill="#eef6ff"
      stroke="#bfdbfe"
    />

    <text
      x="70"
      y="941"
      font-family="Arial, Helvetica, sans-serif"
      font-size="12"
      font-weight="800"
      letter-spacing="1.7"
      fill="#1d4ed8"
    >${esc(asString(c.supervisor_title, "SUPERVISOR BRIEF"))}</text>

    ${paragraph(supervisor, 70, 968, 103, {
      fontSize: 11.3,
      lineHeight: 14.7,
      fill: "#24364b",
      maxLines: 5,
    })}

    ${footer({
      title,
      page: 1,
      docRef,
      revision,
    })}
  `);
}

function pageTwo(
  c: Record<string, unknown>,
  logoData: string,
  title: string,
  locale: Locale,
  docRef: string,
  revision: string,
) {
  const hazards = asArray(c.hazards);
  const controls = asArray(c.controls);
  const verification = asArray(c.verification);
  const remember = asString(c.remember);

  const pageTitle =
    locale === "tr"
      ? "SAHA KONTROL FORMU"
      : "FIELD CONTROL SHEET";

  const statusLabel =
    locale === "tr"
      ? "DURUM / PARAF"
      : "STATUS / INITIAL";

  const decisionTitle =
    locale === "tr"
      ? "SAHA KARARI"
      : "FIELD DECISION";

  const decisionText =
    locale === "tr"
      ? "Gerekli kontroller uygulanmamışsa işe başlamayın. Koşullar değişirse çalışmayı durdurun ve yeniden değerlendirin."
      : "Do not start if required controls are not in place. Stop work and reassess whenever conditions change.";

  const verificationRows = verification
    .slice(0, 10)
    .map((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);

      const x = col === 0 ? 65 : 413;
      const y = 680 + row * 52;

      return `
        <rect
          x="${x}"
          y="${y}"
          width="305"
          height="40"
          rx="10"
          fill="#ffffff"
          stroke="#b7c5d3"
        />

        <rect
          x="${x + 13}"
          y="${y + 11}"
          width="17"
          height="17"
          rx="3"
          fill="#ffffff"
          stroke="#10b981"
          stroke-width="1.8"
        />

        <text
          x="${x + 42}"
          y="${y + 25}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="11.2"
          font-weight="600"
          fill="#24364b"
        >${esc(item)}</text>

        <line
          x1="${x + 246}"
          y1="${y + 28}"
          x2="${x + 290}"
          y2="${y + 28}"
          stroke="#566779"
        />
      `;
    })
    .join("");

  return baseSvg(`
    ${header({
      logoData,
      title: pageTitle,
      subtitle: title,
      duration: asString(c.duration),
      docRef,
      revision,
    })}

    <!-- HAZARD REGISTER -->
    <rect
      x="44"
      y="198"
      width="337"
      height="401"
      rx="18"
      fill="#ffffff"
      stroke="#e2e8f0"
      filter="url(#shadow)"
    />

    <rect
      x="44"
      y="198"
      width="337"
      height="51"
      rx="18"
      fill="#8b1f2d"
    />

    <text
      x="70"
      y="230"
      font-family="Arial, Helvetica, sans-serif"
      font-size="14"
      font-weight="800"
      fill="#ffffff"
    >${esc(asString(c.hazards_title, "KEY HAZARDS"))}</text>

    ${hazards.slice(0, 8).map((item, index) => {
      const y = 278 + index * 38;

      return `
        <text
          x="68"
          y="${y}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="10"
          font-weight="800"
          fill="#b91c1c"
        >${String(index + 1).padStart(2, "0")}</text>

        ${paragraph(item, 95, y, 38, {
          fontSize: 10.8,
          lineHeight: 14.5,
          fill: "#1f3147",
          maxLines: 2,
        })}

        <line
          x1="68"
          y1="${y + 19}"
          x2="356"
          y2="${y + 19}"
          stroke="#edf1f5"
        />
      `;
    }).join("")}

    <!-- REQUIRED CONTROLS -->
    <rect
      x="413"
      y="198"
      width="337"
      height="401"
      rx="18"
      fill="#ffffff"
      stroke="#e2e8f0"
      filter="url(#shadow)"
    />

    <rect
      x="413"
      y="198"
      width="337"
      height="51"
      rx="18"
      fill="#087b62"
    />

    <text
      x="439"
      y="230"
      font-family="Arial, Helvetica, sans-serif"
      font-size="14"
      font-weight="800"
      fill="#ffffff"
    >${esc(asString(c.controls_title, "REQUIRED CONTROLS"))}</text>

    ${controls.slice(0, 10).map((item, index) => {
      const y = 274 + index * 31;

      return `
        <circle
          cx="442"
          cy="${y - 4}"
          r="4"
          fill="#10b981"
        />

        ${paragraph(item, 457, y, 40, {
          fontSize: 10.4,
          lineHeight: 13.8,
          fill: "#1f3147",
          maxLines: 2,
        })}
      `;
    }).join("")}

    <!-- VERIFICATION -->
    <text
      x="45"
      y="636"
      font-family="Arial, Helvetica, sans-serif"
      font-size="13"
      font-weight="800"
      letter-spacing="1.3"
      fill="#0f172a"
    >${esc(asString(c.verification_title, "PRE-WORK VERIFICATION"))}</text>

    <text
      x="690"
      y="636"
      text-anchor="end"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9.5"
      font-weight="700"
      letter-spacing="1"
      fill="#475569"
    >${esc(statusLabel)}</text>

    ${verificationRows}

    <!-- FIELD DECISION -->
    <rect
      x="44"
      y="957"
      width="706"
      height="70"
      rx="15"
      fill="#0b1f39"
    />

    <text
      x="68"
      y="983"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10"
      font-weight="800"
      letter-spacing="2"
      fill="#fbbf24"
    >${esc(decisionTitle)}</text>

    ${paragraph(decisionText, 68, 1007, 95, {
      fontSize: 11.5,
      lineHeight: 16,
      weight: 700,
      fill: "#ffffff",
      maxLines: 2,
    })}

    ${footer({
      title,
      page: 2,
      docRef,
      revision,
    })}
  `);
}

function pageThree(
  c: Record<string, unknown>,
  logoData: string,
  title: string,
  locale: Locale,
  docRef: string,
  revision: string,
) {
  const fields = asArray(c.fields);
  const questions = asArray(c.questions);
  const headers = asArray(c.table_headers);

  const fieldLabels = [
    fields[0] ?? (locale === "tr" ? "Proje / Saha" : "Project / Site"),
    fields[1] ?? (locale === "tr" ? "Tarih" : "Date"),
    fields[2] ?? (locale === "tr" ? "Konuşmayı yapan" : "Presented by"),
    fields[3] ?? (locale === "tr" ? "Çalışma alanı" : "Work area"),
  ];

  const tableHeaders = [
    headers[0] ?? "No",
    headers[1] ?? (locale === "tr" ? "Ad Soyad" : "Full Name"),
    headers[2] ?? (locale === "tr" ? "Firma / Görev" : "Company / Role"),
    headers[3] ?? (locale === "tr" ? "İmza" : "Signature"),
  ];

  const recordTitle =
    locale === "tr"
      ? "BRİFİNG KAYDI & ONAY"
      : "BRIEFING RECORD & SIGN-OFF";

  const docControlTitle =
    locale === "tr"
      ? "DOKÜMAN KONTROLÜ"
      : "DOCUMENT CONTROL";

  const signoffTitle =
    locale === "tr"
      ? "SÜPERVİZÖR ONAYI"
      : "SUPERVISOR SIGN-OFF";

  const rows = Array.from({ length: 12 }, (_, i) => i + 1)
    .map((n, i) => {
      const y = 715 + i * 23;

      return `
        <line
          x1="50"
          y1="${y}"
          x2="744"
          y2="${y}"
          stroke="#d5dee7"
        />

        <text
          x="70"
          y="${y + 16}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="9.5"
          font-weight="700"
          fill="#24364b"
        >${n}</text>
      `;
    })
    .join("");

  return baseSvg(`
    ${header({
      logoData,
      title: recordTitle,
      subtitle: title,
      duration: "",
      docRef,
      revision,
    })}

    <!-- PROJECT METADATA -->
    <rect
      x="44"
      y="198"
      width="706"
      height="156"
      rx="17"
      fill="#ffffff"
      stroke="#dce5ee"
      filter="url(#shadow)"
    />

    ${[
      [fieldLabels[0], 68, 229, 68, 259, 330],
      [fieldLabels[1], 414, 229, 414, 259, 706],
      [fieldLabels[2], 68, 291, 68, 321, 330],
      [fieldLabels[3], 414, 291, 414, 321, 706],
    ].map(([label, tx, ty, x1, ly, x2]) => `
      <text
        x="${tx}"
        y="${ty}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="10.5"
        font-weight="800"
        letter-spacing="0.8"
        fill="#334155"
      >${esc(label)}</text>

      <line
        x1="${x1}"
        y1="${ly}"
        x2="${x2}"
        y2="${ly}"
        stroke="#7d8da0"
      />
    `).join("")}

    <!-- DOCUMENT CONTROL -->
    <rect
      x="44"
      y="379"
      width="706"
      height="73"
      rx="14"
      fill="#0b1f39"
    />

    <text
      x="68"
      y="405"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9.5"
      font-weight="800"
      letter-spacing="1.8"
      fill="#7dbfff"
    >${esc(docControlTitle)}</text>

    <text
      x="68"
      y="430"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10"
      font-weight="700"
      fill="#ffffff"
    >REF: ${esc(docRef)}</text>

    <text
      x="280"
      y="430"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10"
      font-weight="700"
      fill="#ffffff"
    >REV: ${esc(revision)}</text>

    <text
      x="410"
      y="430"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10"
      font-weight="700"
      fill="#ffffff"
    >STATUS: FIELD BRIEFING</text>

    <!-- DISCUSSION -->
    <rect
      x="44"
      y="476"
      width="706"
      height="154"
      rx="16"
      fill="#eef6ff"
      stroke="#c7dcf8"
    />

    <text
      x="68"
      y="506"
      font-family="Arial, Helvetica, sans-serif"
      font-size="12"
      font-weight="800"
      fill="#1d4ed8"
    >${esc(asString(c.questions_title, "DISCUSSION QUESTIONS"))}</text>

    ${questions.slice(0, 6).map((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);

      const x = col === 0 ? 68 : 414;
      const y = 538 + row * 34;

      return `
        <circle
          cx="${x + 4}"
          cy="${y - 4}"
          r="3.5"
          fill="#2563eb"
        />

        ${paragraph(item, x + 17, y, 40, {
          fontSize: 10.2,
          lineHeight: 13.8,
          fill: "#24364b",
          maxLines: 2,
        })}
      `;
    }).join("")}

    <!-- ATTENDANCE -->
    <text
      x="48"
      y="656"
      font-family="Arial, Helvetica, sans-serif"
      font-size="12"
      font-weight="800"
      letter-spacing="1.1"
      fill="#0f172a"
    >${esc(asString(c.attendance_title, "ATTENDANCE"))}</text>

    <rect
      x="50"
      y="676"
      width="694"
      height="309"
      fill="#ffffff"
      stroke="#cbd5e1"
    />

    <rect
      x="50"
      y="676"
      width="694"
      height="39"
      fill="#06152b"
    />

    <line x1="98" y1="676" x2="98" y2="985" stroke="#cbd5e1" />
    <line x1="388" y1="676" x2="388" y2="985" stroke="#cbd5e1" />
    <line x1="585" y1="676" x2="585" y2="985" stroke="#cbd5e1" />

    <text x="69" y="699" font-family="Arial" font-size="10" font-weight="700" fill="#ffffff">${esc(tableHeaders[0])}</text>
    <text x="184" y="699" font-family="Arial" font-size="10" font-weight="700" fill="#ffffff">${esc(tableHeaders[1])}</text>
    <text x="439" y="699" font-family="Arial" font-size="10" font-weight="700" fill="#ffffff">${esc(tableHeaders[2])}</text>
    <text x="632" y="699" font-family="Arial" font-size="10" font-weight="700" fill="#ffffff">${esc(tableHeaders[3])}</text>

    ${rows}

    <!-- SIGN OFF -->
    <rect
      x="44"
      y="996"
      width="706"
      height="40"
      rx="10"
      fill="#eef2f7"
    />

    <text
      x="62"
      y="1020"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9.5"
      font-weight="800"
      fill="#24364b"
    >${esc(signoffTitle)}</text>

    <line x1="200" y1="1018" x2="359" y2="1018" stroke="#566779" />
    <line x1="438" y1="1018" x2="572" y2="1018" stroke="#566779" />
    <line x1="633" y1="1018" x2="730" y2="1018" stroke="#566779" />

    ${footer({
      title,
      page: 3,
      docRef,
      revision,
    })}
  `);
}

async function svgToPng(svg: string) {
  return sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

export async function generatePremiumToolboxPdf({
  slug,
  locale,
  logoBytes,
  logoMime,
}: GeneratePremiumToolboxPdfArgs) {
  const record = getToolboxBySlug(slug);

  if (!record) {
    throw new Error(`Toolbox not found: ${slug}`);
  }

  const c = record[locale] as Record<string, unknown>;

  const rawTitle = asString(
    c.title,
    locale === "tr" ? "TOOLBOX TALK" : "TOOLBOX TALK",
  );

  const title = cleanTitle(rawTitle);

  const docRef =
    `HSE-TBT-${slug
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`;

  const revision = "00";

  const safeLogoMime =
    logoMime ||
    "image/png";

  const logoData =
    `data:${safeLogoMime};base64,${Buffer.from(logoBytes).toString("base64")}`;

  const svgs = [
    pageOne(
      c,
      logoData,
      title,
      locale,
      docRef,
      revision,
    ),
    pageTwo(
      c,
      logoData,
      title,
      locale,
      docRef,
      revision,
    ),
    pageThree(
      c,
      logoData,
      title,
      locale,
      docRef,
      revision,
    ),
  ];

  const pdf = await PDFDocument.create();

  for (const svg of svgs) {
    const pngBytes = await svgToPng(svg);
    const png = await pdf.embedPng(pngBytes);

    const page = pdf.addPage([PAGE_W, PAGE_H]);

    page.drawImage(png, {
      x: 0,
      y: 0,
      width: PAGE_W,
      height: PAGE_H,
    });
  }

  pdf.setTitle(`${title} - HSE Toolbox Talk`);
  pdf.setSubject("Professional HSE Toolbox Talk");
  pdf.setCreator("Professional HSE Document System");
  pdf.setProducer("Professional HSE Document System");

  return pdf.save();
}
