import "server-only";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";
import { isAdminUser } from "@/lib/auth/access";
import { hasActiveReward } from "@/lib/auth/reward-access";
import { hasCurrentBillingPremium } from "@/lib/auth/billing-premium";
import { createClient } from "@/utils/supabase/server";
import { canPlayFullMission } from "./access-policy";

export async function getSim5Access() {
 if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  return { allowed: false, userId: null, reason: "unconfigured" } as const;
 try {
  const { user, profile } = await getCurrentAccessProfile();
  if (!user) return { allowed: false, userId: null, reason: "guest" } as const;
  if (!profile || profile.status !== "active") return { allowed: false, userId: user.id, reason: "inactive" } as const;
  const admin = isAdminUser(user) || profile.role === "admin";
  const db = await createClient();
  const reward = admin ? false : await hasActiveReward(db, user.id);
  // requirePremiumUser's plan check alone does not account for expired trials.
  // Reuse the existing billing verifier, failing closed on unavailable evidence.
  const billing = admin || reward ? false : await hasCurrentBillingPremium(db, user.id, profile.plan);
  const allowed = canPlayFullMission({ authenticated: true, active: true, admin, reward, billing });
  return { allowed, userId: user.id, reason: allowed ? "premium" : "free" } as const;
 } catch {
  return { allowed: false, userId: null, reason: "unavailable" } as const;
 }
}
