import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/proxy";

function resolveLocale(request: NextRequest): "tr" | "en" {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (firstSegment === "tr" || firstSegment === "en") {
    return firstSegment;
  }

  const filenameLocale = pathname.match(/(?:-|_)(tr|en)(?=\.pdf$)/i)?.[1];
  if (filenameLocale?.toLowerCase() === "tr") return "tr";
  if (filenameLocale?.toLowerCase() === "en") return "en";

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const refererPath = new URL(referer).pathname;
      const refererLocale = refererPath.split("/")[1];
      if (refererLocale === "tr" || refererLocale === "en") {
        return refererLocale;
      }
    } catch {
      // Ignore malformed referrers and use the default locale.
    }
  }

  return "en";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const toolboxPdfMatch = pathname.match(
    /^\/downloads\/(.+)-toolbox-talk-(tr|en)\.pdf$/i,
  );

  if (toolboxPdfMatch) {
    const [, slug, fileLocale] = toolboxPdfMatch;
    const protectedUrl = request.nextUrl.clone();

    protectedUrl.pathname = `/api/toolbox/${encodeURIComponent(slug)}/pdf`;
    protectedUrl.search = "";
    protectedUrl.searchParams.set("locale", fileLocale.toLowerCase());

    return NextResponse.redirect(protectedUrl, 307);
  }

  const locale = resolveLocale(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-sernem-locale", locale);

  const { response, isAuthenticated } = await updateSession(
    request,
    requestHeaders,
  );

  const isStaticPdf =
    pathname.startsWith("/downloads/") && pathname.toLowerCase().endsWith(".pdf");

  if (isStaticPdf && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    loginUrl.search = "";
    loginUrl.searchParams.set(
      "next",
      `${pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl, 307);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
