import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

export type ProfileRole = "user" | "admin";
export type ProfilePlan = "free" | "premium";
export type ProfileStatus = "active" | "suspended";

export type AccessProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: ProfileRole;
  plan: ProfilePlan;
  status: ProfileStatus;
};

type AccessOptions = {
  locale: string;
  nextPath: string;
};

function normalizeLocale(locale: string) {
  return locale === "tr" ? "tr" : "en";
}

export async function getCurrentAccessProfile(): Promise<{
  user: Awaited<
    ReturnType<
      Awaited<ReturnType<typeof createClient>>["auth"]["getUser"]
    >
  >["data"]["user"];
  profile: AccessProfile | null;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      profile: null,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,plan,status")
    .eq("id", user.id)
    .maybeSingle();

  return {
    user,
    profile: (profile as AccessProfile | null) ?? null,
  };
}

export async function requireActiveUser({
  locale: rawLocale,
  nextPath,
}: AccessOptions) {
  const locale = normalizeLocale(rawLocale);
  const { user, profile } = await getCurrentAccessProfile();

  if (!user) {
    redirect(
      `/${locale}/login?next=${encodeURIComponent(nextPath)}`
    );
  }

  if (!profile) {
    redirect(`/${locale}/login`);
  }

  if (profile.status === "suspended") {
    redirect(`/${locale}/account-suspended`);
  }

  return {
    user,
    profile,
  };
}

export async function requirePremiumUser({
  locale: rawLocale,
  nextPath,
}: AccessOptions) {
  const locale = normalizeLocale(rawLocale);

  const { user, profile } = await requireActiveUser({
    locale,
    nextPath,
  });

  const hasPremium =
    isAdminUser(user) ||
    profile.role === "admin" ||
    profile.plan === "premium";

  if (!hasPremium) {
    redirect(
      `/${locale}/upgrade?next=${encodeURIComponent(nextPath)}`
    );
  }

  return {
    user,
    profile,
  };
}

export async function requireAdminUser({
  locale: rawLocale,
  nextPath,
}: AccessOptions) {
  const locale = normalizeLocale(rawLocale);

  const { user, profile } = await requireActiveUser({
    locale,
    nextPath,
  });

  const hasAdminAccess =
    isAdminUser(user) || profile.role === "admin";

  if (!hasAdminAccess) {
    redirect(`/${locale}/dashboard`);
  }

  return {
    user,
    profile,
  };
}
