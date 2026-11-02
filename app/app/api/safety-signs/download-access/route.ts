import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";
import { isAdminUser } from "@/lib/auth/access";
import { hasActiveReward } from "@/lib/auth/reward-access";
import { hasCurrentBillingPremium } from "@/lib/auth/billing-premium";

export const dynamic = "force-dynamic";

const privateNoStore = { "Cache-Control": "private, no-store" } as const;

/**
 * Clean Safety Sign exports use the same current billing/reward/admin decision
 * as the poster Premium gate. A stale profiles.plan alone does not grant a
 * clean export when a trial reservation has expired.
 *
 * This route only reports entitlement; it never modifies subscriptions.
 */
export async function GET() {
  try {
    const { user, profile } = await getCurrentAccessProfile();

    if (!user) {
      return NextResponse.json(
        { authenticated: false, isPremium: false },
        { status: 401, headers: privateNoStore },
      );
    }

    if (!profile || profile.status !== "active") {
      return NextResponse.json(
        { authenticated: true, isPremium: false },
        { headers: privateNoStore },
      );
    }

    const supabase = await createClient();
    const admin = isAdminUser(user) || profile.role === "admin";
    // Admin users do not depend on billing or reward provider availability.
    const reward = admin ? false : await hasActiveReward(supabase, user.id);
    const billing = admin || reward
      ? false
      : await hasCurrentBillingPremium(supabase, user.id, profile.plan);

    return NextResponse.json(
      { authenticated: true, isPremium: admin || reward || billing },
      { headers: privateNoStore },
    );
  } catch (error) {
    console.error("Safety sign entitlement verification failed", error);
    // Client treats non-2xx as standard (branded) only. Never return clean access.
    return NextResponse.json(
      { authenticated: false, isPremium: false },
      { status: 503, headers: privateNoStore },
    );
  }
}
