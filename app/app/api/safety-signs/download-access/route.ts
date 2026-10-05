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

  const isPremium = Boolean(
    profile?.status === "active" &&
      (isAdminUser(user) ||
        profile.role === "admin" ||
        profile.plan === "premium")
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
