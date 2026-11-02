import "server-only";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";
import { hasActiveReward } from "@/lib/auth/reward-access";
import { hasCurrentBillingPremium } from "@/lib/auth/billing-premium";

/** Single fail-closed poster entitlement decision for UI, branding and PDF. */
export async function getPosterPremiumAccess() {
  const db = await createClient();
  const { data: { user }, error: authError } = await db.auth.getUser();
  if (authError || !user) return { user: null, allowed: false, reason: "guest" } as const;
  const { data: profile, error } = await db.from("profiles")
    .select("plan,role,status").eq("id", user.id).maybeSingle();
  if (error || !profile || profile.status !== "active")
    return { user, allowed: false, reason: "inactive" } as const;
  if (isAdminUser(user) || profile.role === "admin")
    return { user, allowed: true, reason: "admin" } as const;
  const reward = await hasActiveReward(db, user.id);
  if (reward) return { user, allowed: true, reason: "reward" } as const;
  const billing = await hasCurrentBillingPremium(db, user.id, profile.plan);
  return { user, allowed: billing, reason: billing ? "billing" : "free" } as const;
}
