import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { safeNextPath } from "@/lib/auth/next-path";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const locale = query.get("locale") === "tr" ? "tr" : "en";
  const next = safeNextPath(query.get("next"), locale);
  const destination = new URL(next, request.url);
  const code = query.get("code");
  const tokenHash = query.get("token_hash");
  const type = query.get("type");
  try {
    const supabase = await createClient();
    const result = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : tokenHash && (type === "signup" || type === "recovery" || type === "email")
        ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
        : null;
    if (result && !result.error) return NextResponse.redirect(destination);
  } catch { /* Do not log auth link credentials or provider details. */ }
  const retry = new URL(`/${locale}/login`, request.url);
  retry.searchParams.set("error", "confirmation_failed");
  retry.searchParams.set("next", next);
  return NextResponse.redirect(retry);
}
