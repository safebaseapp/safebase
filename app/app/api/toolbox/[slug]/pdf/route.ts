import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { getToolboxBySlug } from "@/lib/toolbox/toolbox-data";
import { generatePremiumToolboxPdf } from "@/lib/pdf/premium-toolbox-pdf";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;

    const locale: "tr" | "en" =
      request.nextUrl.searchParams.get("locale") === "tr"
        ? "tr"
        : "en";

    const { user, profile } = await getCurrentAccessProfile();
    const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

    if (!user || !profile) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set("next", nextPath);
      return Response.redirect(loginUrl, 307);
    }

    if (profile.status === "suspended") {
      return Response.redirect(
        new URL(`/${locale}/account-suspended`, request.url),
        307,
      );
    }

    const toolbox = getToolboxBySlug(slug);

    if (!toolbox) {
      return new Response("Toolbox not found.", {
        status: 404,
      });
    }

    const logoPath = path.join(
      process.cwd(),
      "public",
      "brand",
      "sernem-logo.svg",
    );

    const svg = await readFile(logoPath);

    const sernemLogo = await sharp(svg)
      .png()
      .toBuffer();

    const pdfBytes = await generatePremiumToolboxPdf({
      slug,
      locale,
      logoBytes: sernemLogo,
      logoMime: "image/png",
      documentProfile: {
        revision: "00",
      },
    });

    const localized =
      locale === "tr"
        ? toolbox.tr
        : toolbox.en;

    const safeTitle = String(
      localized.title || slug,
    )
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `attachment; filename="${safeTitle}-${locale}.pdf"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(
      "STANDARD TOOLBOX PDF ERROR:",
      error,
    );

    return new Response(
      error instanceof Error
        ? `PDF generation failed: ${error.message}`
        : "PDF generation failed.",
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
