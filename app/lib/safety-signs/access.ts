import "server-only";

import { isAdminUser } from "@/lib/auth/access";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";

export async function getSafetySignAccess() {
  const { user, profile } = await getCurrentAccessProfile();

  const isPremium = Boolean(
    user &&
      profile?.status === "active" &&
      (isAdminUser(user) ||
        profile.role === "admin" ||
        profile.plan === "premium")
  );

  return {
    authenticated: Boolean(user),
    isPremium,
  };
}
