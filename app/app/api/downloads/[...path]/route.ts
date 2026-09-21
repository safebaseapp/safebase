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
  const { path: segments } = await params;

  if (
    !Array.isArray(segments) ||
    segments.length === 0 ||
    !segments.every(isSafeSegment)
  ) {
    return new Response("Invalid download path.", {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const relativePath = segments.join("/");

  if (!relativePath.toLowerCase().endsWith(".pdf")) {
    return new Response("PDF not found.", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const locale: "tr" | "en" =
    request.nextUrl.searchParams.get("locale") === "tr"
      ? "tr"
      : "en";

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
  const absolutePath = path.resolve(downloadsRoot, ...segments);

  if (!absolutePath.startsWith(`${downloadsRoot}${path.sep}`)) {
    return new Response("Invalid download path.", {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  let pdfBytes: Uint8Array;

  try {
    const fileBuffer = await readFile(absolutePath);
    pdfBytes = new Uint8Array(fileBuffer);
  } catch {
    return new Response("PDF not found.", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
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
}
