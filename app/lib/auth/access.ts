import type { User } from "@supabase/supabase-js";

export type SERNEMRole = "free" | "premium" | "admin";

function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() ?? "";
}

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean);
}

export function isAdminUser(user: User | null | undefined): boolean {
  const email = normalizeEmail(user?.email);

  if (!email) {
    return false;
  }

  const adminEmails = new Set([
    ...getAdminEmails(),
    "safebase.global@gmail.com",
  ]);

  return adminEmails.has(email);
}

export function getUserRole(user: User | null | undefined): SERNEMRole {
  if (isAdminUser(user)) {
    return "admin";
  }

  const metadataRole = user?.app_metadata?.role;

  if (metadataRole === "premium") {
    return "premium";
  }

  return "free";
}

export function hasPremiumAccess(user: User | null | undefined): boolean {
  const role = getUserRole(user);

  return role === "admin" || role === "premium";
}
