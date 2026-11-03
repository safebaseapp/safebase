import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };

async function authenticated() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return { supabase, user: error ? null : user };
}

export async function GET() {
  const { supabase, user } = await authenticated();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401, headers });
  const { data, error } = await supabase.from("user_communication_preferences")
    .select("marketing_email_opt_in,marketing_email_changed_at")
    .eq("user_id", user.id).maybeSingle();
  if (error) {
    console.error("Marketing preference read failed", error);
    return NextResponse.json({ error: "Unable to read preferences" }, { status: 503, headers });
  }
  // No row means no permission for promotional communications.
  return NextResponse.json({
    marketingEmailOptIn: data?.marketing_email_opt_in === true,
    changedAt: data?.marketing_email_changed_at ?? null,
  }, { headers });
}

export async function PUT(request: NextRequest) {
  const { supabase, user } = await authenticated();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401, headers });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.marketingEmailOptIn !== "boolean") {
    return NextResponse.json({ error: "A marketing preference boolean is required" }, { status: 400, headers });
  }
  const changedAt = new Date().toISOString();
  const { data, error } = await supabase.from("user_communication_preferences")
    .upsert({
      user_id: user.id,
      marketing_email_opt_in: body.marketingEmailOptIn,
      marketing_email_changed_at: changedAt,
    }, { onConflict: "user_id" })
    .select("marketing_email_opt_in,marketing_email_changed_at").single();
  if (error) {
    console.error("Marketing preference update failed", error);
    return NextResponse.json({ error: "Unable to save preferences" }, { status: 503, headers });
  }
  return NextResponse.json({
    ok: true,
    marketingEmailOptIn: data.marketing_email_opt_in,
    changedAt: data.marketing_email_changed_at,
  }, { headers });
}
