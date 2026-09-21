import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { getCurrentAccessProfile } from "@/lib/auth/server-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

function getLocale(request: NextRequest, relativePath: string): "tr" | "en" {
  const requested = request.nextUrl.searchParams.get("locale");

  if (requested === "tr") return "tr";
  if (requested === "en") return "en";

  const localeMatch = relativePath.match(/(?:-|_)(tr|en)(?=(?:-|_|\.)[^/]*\.pdf$|\.pdf$)/i);
  return localeMatch?.[1]?.toLowerCase() === "tr" ? "tr" : "en";
}

function isSafeSegment(segment: string) {
  return (
    segment.length > 0 &&
    segment !== "." &&
    segment !== ".." &&
    !segment.includes("/") &&
    !segment.includes("\\") &&
    !segment.includes("\0")
  );
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const resolvedParams = await params;
    const segments = Array.isArray(resolvedParams.path)
      ? resolvedParams.path
      : [];

    if (segments.length === 0 || !segments.every(isSafeSegment)) {
      return new Response("Invalid download path.", {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const relativePath = segments.join("/");

    if (!relativePath.toLowerCase().endsWith(".pdf")) {
      return new Response("Only PDF downloads are supported.", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const locale = getLocale(request, relativePath);
    const { user, profile } = await getCurrentAccessProfile();
    const originalDownloadPath = `/downloads/${segments
      .map((segment) => encodeURIComponent(segment))
      .join("/")}`;

    if (!user || !profile) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set("next", originalDownloadPath);
      return Response.redirect(loginUrl, 307);
    }

    if (profile.status === "suspended") {
      return Response.redirect(
        new URL(`/${locale}/account-suspended`, request.url),
        307,
      );
    }

    const downloadsRoot = path.resolve(
      process.cwd(),
      "public",
      "downloads",
    );

    const absolutePath = path.resolve(
      downloadsRoot,
      ...segments,
    );

    if (!absolutePath.startsWith(`${downloadsRoot}${path.sep}`)) {
      return new Response("Invalid download path.", {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      });
    }

    let pdfBytes: Buffer;

    try {
      pdfBytes = await readFile(absolutePath);
    } catch (error) {
      const code =
        error && typeof error === "object" && "code" in error
          ? String(error.code)
          : "";

      if (code === "ENOENT" || code === "EISDIR") {
        return new Response("PDF not found.", {
          status: 404,
          headers: { "Cache-Control": "no-store" },
        });
      }

      throw error;
    }

    const fileName = path.basename(absolutePath).replace(/[\r\n"]/g, "");

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store, max-age=0",
        Pragma: "no-cache",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch (error) {
    console.error("PROTECTED PDF DOWNLOAD ERROR:", error);

    return new Response("PDF download failed.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}
