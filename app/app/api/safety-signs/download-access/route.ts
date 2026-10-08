import { NextResponse } from "next/server";
import { getSafetySignAccess } from "@/lib/safety-signs/access";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await getSafetySignAccess();

  if (!access.authenticated) {
    return NextResponse.json(
      access,
      {
        status: 401,
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  }

  return NextResponse.json(
    access,
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    }
  );
}
