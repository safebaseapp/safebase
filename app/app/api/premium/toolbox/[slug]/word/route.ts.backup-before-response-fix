import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import * as toolboxModule from "@/lib/toolbox/toolbox-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

type UnknownRecord = Record<string, unknown>;

const BUCKET_NAME = "company-assets";

function getLocale(request: Request): "tr" | "en" {
  const url = new URL(request.url);
  return url.searchParams.get("locale") === "tr" ? "tr" : "en";
}

function createSafeUrl(request: Request, pathname: string) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const requestHost = request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  let host = forwardedHost || requestHost || "localhost:3000";
  const protocol = forwardedProto || "http";

  if (
    host.startsWith("0.0.0.0") ||
    host.startsWith("[::]") ||
    host.startsWith("::")
  ) {
    const port = host.includes(":") ? host.split(":").pop() : "3000";
    host = `localhost:${port}`;
  }

  return new URL(pathname, `${protocol}://${host}`);
}

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function findToolboxBySlug(
  value: unknown,
  slug: string,
  visited = new Set<unknown>(),
): UnknownRecord | null {
  if (!value || typeof value !== "object" || visited.has(value)) {
    return null;
  }

  visited.add(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      const result = findToolboxBySlug(item, slug, visited);
      if (result) return result;
    }

    return null;
  }

  const record = value as UnknownRecord;

  if (record.slug === slug) {
    return record;
  }

  for (const nestedValue of Object.values(record)) {
    const result = findToolboxBySlug(nestedValue, slug, visited);
    if (result) return result;
  }

  return null;
}

function stringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim()
    ? value.trim()
    : fallback;
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function getLocalizedContent(
  toolbox: UnknownRecord,
  locale: "tr" | "en",
): UnknownRecord {
  const localized = toolbox[locale];

  if (isRecord(localized)) {
    return localized;
  }

  return toolbox;
}

function sectionHeading(title: string, color = "2563EB") {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: {
      before: 320,
      after: 140,
    },
    shading: {
      type: ShadingType.CLEAR,
      fill: color,
    },
    border: {
      bottom: {
        color,
        style: BorderStyle.SINGLE,
        size: 10,
      },
    },
    children: [
      new TextRun({
        text: title,
        bold: true,
        color: "FFFFFF",
        size: 26,
      }),
    ],
  });
}

function bodyParagraph(text: string) {
  return new Paragraph({
    spacing: {
      after: 120,
      line: 340,
    },
    children: [
      new TextRun({
        text,
        size: 22,
        color: "334155",
      }),
    ],
  });
}

function bulletParagraph(text: string, color = "0F766E") {
  return new Paragraph({
    bullet: {
      level: 0,
    },
    spacing: {
      after: 80,
      line: 320,
    },
    children: [
      new TextRun({
        text,
        size: 21,
        color,
      }),
    ],
  });
}

function metadataCell(label: string, value = "") {
  return new TableCell({
    width: {
      size: 50,
      type: WidthType.PERCENTAGE,
    },
    margins: {
      top: 130,
      bottom: 130,
      left: 150,
      right: 150,
    },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: label,
            bold: true,
            size: 19,
            color: "475569",
          }),
        ],
      }),
      new Paragraph({
        spacing: {
          before: 120,
        },
        border: {
          bottom: {
            color: "94A3B8",
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        children: [
          new TextRun({
            text: value || " ",
            size: 21,
            color: "0F172A",
          }),
        ],
      }),
    ],
  });
}

function createAttendanceTable(locale: "tr" | "en") {
  const headers =
    locale === "tr"
      ? ["No", "Ad Soyad", "Firma / Görev", "İmza"]
      : ["No", "Full Name", "Company / Role", "Signature"];

  const rows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: headers.map(
        (header) =>
          new TableCell({
            shading: {
              type: ShadingType.CLEAR,
              fill: "07142E",
            },
            margins: {
              top: 120,
              bottom: 120,
              left: 90,
              right: 90,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: header,
                    bold: true,
                    color: "FFFFFF",
                    size: 18,
                  }),
                ],
              }),
            ],
          }),
      ),
    }),
  ];

  for (let index = 1; index <= 14; index += 1) {
    rows.push(
      new TableRow({
        height: {
          value: 520,
          rule: "atLeast",
        },
        children: [
          new TableCell({
            width: {
              size: 8,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun(String(index))],
              }),
            ],
          }),
          new TableCell({
            width: {
              size: 37,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(" ")],
          }),
          new TableCell({
            width: {
              size: 30,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(" ")],
          }),
          new TableCell({
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(" ")],
          }),
        ],
      }),
    );
  }

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows,
  });
}

async function getLogo(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
) {
  const { data: files } = await supabase.storage
    .from(BUCKET_NAME)
    .list(userId, {
      limit: 20,
    });

  const logoFile = files?.find((file) =>
    /^logo\.(png|jpg|jpeg)$/i.test(file.name),
  );

  if (!logoFile) {
    return null;
  }

  const { data: logoBlob, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(`${userId}/${logoFile.name}`);

  if (error || !logoBlob) {
    console.error("Word logo download error:", error);
    return null;
  }

  const extension = logoFile.name.split(".").pop()?.toLowerCase();
  const type = extension === "png" ? "png" : "jpg";

  return {
    bytes: new Uint8Array(await logoBlob.arrayBuffer()),
    type,
  } as const;
}

export async function GET(request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const locale = getLocale(request);
  const isTurkish = locale === "tr";

  const toolbox = findToolboxBySlug(toolboxModule, slug);

  if (!toolbox) {
    return NextResponse.json(
      {
        error: isTurkish
          ? "Toolbox içeriği bulunamadı."
          : "Toolbox content could not be found.",
      },
      { status: 404 },
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      createSafeUrl(
        request,
        `/${locale}/login?next=/${locale}/toolbox`,
      ),
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan,role,status")
    .eq("id", user.id)
    .single();

  if (
    profileError ||
    !profile ||
    profile.status === "suspended"
  ) {
    return NextResponse.redirect(
      createSafeUrl(request, `/${locale}/dashboard`),
    );
  }

  const isPremium =
    profile.plan === "premium" || profile.role === "admin";

  if (!isPremium) {
    return NextResponse.redirect(
      createSafeUrl(request, `/${locale}/upgrade`),
    );
  }

  const content = getLocalizedContent(toolbox, locale);
  const logo = await getLogo(supabase, user.id);

  const title = stringValue(
    content.title,
    isTurkish ? "TOOLBOX TALK" : "TOOLBOX TALK",
  );

  const subtitle = stringValue(content.subtitle);
  const applicationSubtitle = stringValue(
    content.application_subtitle,
  );
  const duration = stringValue(
    content.duration,
    isTurkish ? "5–10 DAKİKA" : "5–10 MINUTES",
  );

  const objectiveTitle = stringValue(
    content.objective_title,
    isTurkish ? "AMAÇ" : "OBJECTIVE",
  );
  const objective = stringArray(content.objective);

  const explanationTitle = stringValue(
    content.explanation_title,
    isTurkish ? "KONU ANLATIMI" : "TOPIC EXPLANATION",
  );
  const explanation = stringArray(content.explanation);

  const scenarioTitle = stringValue(
    content.scenario_title,
    isTurkish ? "GERÇEKÇİ SAHA SENARYOSU" : "REALISTIC SITE SCENARIO",
  );
  const scenario = stringArray(content.scenario);

  const rememberTitle = stringValue(
    content.remember_title,
    isTurkish ? "UNUTMAYIN" : "REMEMBER",
  );
  const remember = stringArray(content.remember);

  const hazardsTitle = stringValue(
    content.hazards_title,
    isTurkish ? "ANA TEHLİKELER" : "KEY HAZARDS",
  );
  const hazards = stringArray(content.hazards);

  const controlsTitle = stringValue(
    content.controls_title,
    isTurkish ? "KONTROL ÖNLEMLERİ" : "CONTROL MEASURES",
  );
  const controls = stringArray(content.controls);

  const supervisorTitle = stringValue(
    content.supervisor_title,
    isTurkish
      ? "SUPERVISOR KONUŞMA METNİ"
      : "SUPERVISOR TALKING SCRIPT",
  );
  const supervisorScript = stringArray(content.supervisor_script);

  const questionsTitle = stringValue(
    content.questions_title,
    isTurkish ? "TARTIŞMA SORULARI" : "DISCUSSION QUESTIONS",
  );
  const questions = stringArray(content.questions);

  const verificationTitle = stringValue(
    content.verification_title,
    isTurkish
      ? "BUGÜN BAŞLAMADAN ÖNCE DOĞRULAYIN"
      : "VERIFY BEFORE STARTING TODAY",
  );
  const verification = stringArray(content.verification);

  const footerText = stringValue(
    content.footer,
    isTurkish
      ? "SafeBase HSE Kaynağı — İzin koşulları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
      : "SafeBase HSE Resource — Permit conditions, risk assessments and site procedures take priority.",
  );

  const coverChildren: Array<Paragraph | Table> = [];

  if (logo) {
    coverChildren.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: {
          after: 120,
        },
        children: [
          new ImageRun({
            data: logo.bytes,
            type: logo.type,
            transformation: {
              width: 220,
              height: 62,
            },
          }),
        ],
      }),
    );
  }

  coverChildren.push(
    new Paragraph({
      spacing: {
        after: 110,
      },
      children: [
        new TextRun({
          text: "SAFEBASE TOOLBOX TALK",
          bold: true,
          color: "10B981",
          size: 24,
        }),
      ],
    }),
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: {
        after: 160,
      },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: "07142E",
          size: 40,
        }),
      ],
    }),
  );

  if (subtitle) {
    coverChildren.push(bodyParagraph(subtitle));
  }

  if (applicationSubtitle) {
    coverChildren.push(
      new Paragraph({
        spacing: {
          after: 180,
        },
        children: [
          new TextRun({
            text: applicationSubtitle,
            bold: true,
            color: "2563EB",
            size: 20,
          }),
        ],
      }),
    );
  }

  coverChildren.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: {
        after: 240,
      },
      children: [
        new TextRun({
          text: duration,
          bold: true,
          color: "FFFFFF",
          size: 23,
          shading: {
            type: ShadingType.CLEAR,
            fill: "2563EB",
          },
        }),
      ],
    }),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            metadataCell(isTurkish ? "PROJE / SAHA" : "PROJECT / SITE"),
            metadataCell(isTurkish ? "TARİH" : "DATE"),
          ],
        }),
        new TableRow({
          children: [
            metadataCell(isTurkish ? "SUNAN KİŞİ" : "PRESENTED BY"),
            metadataCell(isTurkish ? "ÇALIŞMA ALANI" : "WORK AREA"),
          ],
        }),
      ],
    }),
  );

  if (objective.length) {
    coverChildren.push(sectionHeading(objectiveTitle));
    coverChildren.push(...objective.map(bodyParagraph));
  }

  if (explanation.length) {
    coverChildren.push(sectionHeading(explanationTitle, "10B981"));
    coverChildren.push(...explanation.map((item) => bulletParagraph(item)));
  }

  if (scenario.length) {
    coverChildren.push(sectionHeading(scenarioTitle, "EA580C"));
    coverChildren.push(...scenario.map((item) => bulletParagraph(item)));
  }

  if (remember.length) {
    coverChildren.push(sectionHeading(rememberTitle, "2563EB"));
    coverChildren.push(...remember.map(bodyParagraph));
  }

  coverChildren.push(
    new Paragraph({
      children: [new PageBreak()],
    }),
  );

  if (hazards.length) {
    coverChildren.push(sectionHeading(hazardsTitle, "DC2626"));
    coverChildren.push(
      ...hazards.map((item) => bulletParagraph(item, "7F1D1D")),
    );
  }

  if (controls.length) {
    coverChildren.push(sectionHeading(controlsTitle, "10B981"));
    coverChildren.push(...controls.map((item) => bulletParagraph(item)));
  }

  if (supervisorScript.length) {
    coverChildren.push(sectionHeading(supervisorTitle, "2563EB"));
    coverChildren.push(...supervisorScript.map(bodyParagraph));
  }

  if (questions.length) {
    coverChildren.push(sectionHeading(questionsTitle, "2563EB"));
    coverChildren.push(...questions.map((item) => bulletParagraph(item)));
  }

  if (verification.length) {
    coverChildren.push(sectionHeading(verificationTitle, "10B981"));
    coverChildren.push(
      ...verification.map(
        (item) =>
          new Paragraph({
            spacing: {
              after: 90,
            },
            children: [
              new TextRun({
                text: `☐ ${item}`,
                size: 21,
                color: "065F46",
              }),
            ],
          }),
      ),
    );
  }

  coverChildren.push(
    new Paragraph({
      children: [new PageBreak()],
    }),
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: {
        after: 100,
      },
      children: [
        new TextRun({
          text: isTurkish
            ? "KATILIM VE ONAY"
            : "ATTENDANCE AND APPROVAL",
          bold: true,
          color: "07142E",
          size: 38,
        }),
      ],
    }),
    new Paragraph({
      spacing: {
        after: 220,
      },
      children: [
        new TextRun({
          text: title,
          color: "475569",
          size: 22,
        }),
      ],
    }),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            metadataCell(isTurkish ? "PROJE / SAHA" : "PROJECT / SITE"),
            metadataCell(isTurkish ? "TARİH" : "DATE"),
          ],
        }),
        new TableRow({
          children: [
            metadataCell(isTurkish ? "SUNAN KİŞİ" : "PRESENTED BY"),
            metadataCell(isTurkish ? "ÇALIŞMA ALANI" : "WORK AREA"),
          ],
        }),
      ],
    }),
    new Paragraph({
      spacing: {
        before: 260,
        after: 120,
      },
      children: [
        new TextRun({
          text: isTurkish ? "KATILIMCI LİSTESİ" : "ATTENDANCE LIST",
          bold: true,
          size: 24,
          color: "07142E",
        }),
      ],
    }),
    createAttendanceTable(locale),
    new Paragraph({
      spacing: {
        before: 220,
        after: 80,
      },
      children: [
        new TextRun({
          text: isTurkish
            ? "Supervisor notları / ek saha talimatları"
            : "Supervisor notes / additional site instructions",
          bold: true,
          size: 21,
          color: "07142E",
        }),
      ],
    }),
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          height: {
            value: 1100,
            rule: "atLeast",
          },
          children: [
            new TableCell({
              children: [new Paragraph(" ")],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        before: 220,
      },
      children: [
        new TextRun({
          text: footerText,
          italics: true,
          color: "64748B",
          size: 17,
        }),
      ],
    }),
  );

  const document = new Document({
    creator: "SafeBase",
    title,
    description: subtitle,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 850,
              right: 850,
              bottom: 850,
              left: 850,
            },
          },
        },
        children: coverChildren,
      },
    ],
  });

  const buffer = await Packer.toBuffer(document);
  const filename = `${slug}-toolbox-talk-${locale}-premium.docx`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store, max-age=0",
    },
  });
}
