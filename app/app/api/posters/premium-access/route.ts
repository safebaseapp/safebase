import { NextResponse } from "next/server";
import { getPosterPremiumAccess } from "@/lib/auth/poster-premium-access";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { allowed } = await getPosterPremiumAccess();
    return NextResponse.json({ premium: allowed }, { headers: { "Cache-Control": "private, no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ premium: false }, { headers: { "Cache-Control": "private, no-store, max-age=0" } });
  }
}
