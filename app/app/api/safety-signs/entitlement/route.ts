import { NextResponse } from "next/server";
import { isSafetySignPremiumUser } from "@/lib/safety-signs/access";

export const dynamic = "force-dynamic";

export async function GET() {
  const isPremium = await isSafetySignPremiumUser();

  return NextResponse.json(
    { isPremium },
    {
      status: 200,
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
