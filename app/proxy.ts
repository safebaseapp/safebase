import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/proxy";

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

  const firstSegment = pathname.split("/")[1];
  const locale = firstSegment === "tr" ? "tr" : "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-sernem-locale", locale);

  return updateSession(request, requestHeaders);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
