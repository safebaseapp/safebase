import { hasActiveReward } from "@/lib/auth/reward-access";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth/access";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, profile } = await getCurrentAccessProfile();

  if (!user) {
    return NextResponse.json(
      {
        authenticated: false,
        isPremium: false,
      },
      {
        status: 401,
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  }

  const giftPremium = await hasActiveReward(await (await import("@/utils/supabase/server")).createClient(), user.id);
  const isPremium = Boolean(
    profile?.status === "active" &&
      (isAdminUser(user) ||
        profile.role === "admin" ||
        profile.plan === "premium" || giftPremium)
  );

  return NextResponse.json(
    {
      authenticated: true,
      isPremium,
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    }
  );
}
