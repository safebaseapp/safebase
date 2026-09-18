import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/proxy";

function toolboxPdfLocale(pathname: string): "tr" | "en" {
  return pathname.toLowerCase().endsWith("-tr.pdf") ? "tr" : "en";
}

export async function proxy(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/")[1];
  const locale = firstSegment === "tr" ? "tr" : "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-sernem-locale", locale);

  const sessionResponse = await updateSession(request, requestHeaders);

  const pathname = request.nextUrl.pathname;
  const normalizedPath = pathname.toLowerCase();
  const isLegacyToolboxPdf =
    normalizedPath.startsWith("/downloads/") &&
    normalizedPath.includes("-toolbox-talk-") &&
    normalizedPath.endsWith(".pdf");

  if (!isLegacyToolboxPdf) {
    return sessionResponse;
  }

  // Some Toolbox library cards still point directly to static PDFs under
  // /public/downloads. Protect that path here as well as the generated PDF API,
  // otherwise a direct/static URL can bypass the account requirement.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Session refresh is already handled by updateSession above.
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pdfLocale = toolboxPdfLocale(pathname);
  const nextPath = `${pathname}${request.nextUrl.search}`;

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${pdfLocale}/login`;
    loginUrl.search = "";
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl, 307);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("status")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${pdfLocale}/login`;
    loginUrl.search = "";
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl, 307);
  }

  if (profile.status === "suspended") {
    const suspendedUrl = request.nextUrl.clone();
    suspendedUrl.pathname = `/${pdfLocale}/account-suspended`;
    suspendedUrl.search = "";
    return NextResponse.redirect(suspendedUrl, 307);
  }

  return sessionResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
