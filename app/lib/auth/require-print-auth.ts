import { createClient } from "@/utils/supabase/client";

export async function requirePrintAuth(locale?: "tr" | "en") {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return true;

  const pathLocale = window.location.pathname.split("/")[1];
  const loginLocale = locale ?? (pathLocale === "tr" ? "tr" : "en");
  const loginUrl = new URL(`/${loginLocale}/login`, window.location.origin);
  loginUrl.searchParams.set(
    "next",
    `${window.location.pathname}${window.location.search}`,
  );
  window.location.assign(loginUrl.toString());
  return false;
}