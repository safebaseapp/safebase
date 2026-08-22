import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/proxy";

export async function proxy(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/")[1];
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
