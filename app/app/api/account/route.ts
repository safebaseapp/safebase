import { NextRequest, NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { cancelLemonSubscription, resumeLemonSubscription } from "@/lib/lemonsqueezy";

const OWNER_EMAIL = "safebase.global@gmail.com";

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase admin environment is not configured");
  return createAdminClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  if (body?.confirmation !== user.email) {
    return NextResponse.json({ error: "Email confirmation does not match" }, { status: 400 });
  }

  const admin = adminClient();
  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("role,lemon_subscription_id,subscription_status,subscription_cancelled")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) return NextResponse.json({ error: "Unable to verify account" }, { status: 500 });
  if (profile?.role === "admin" || user.email?.toLowerCase() === OWNER_EMAIL) {
    return NextResponse.json({ error: "Owner/admin accounts cannot be deleted here" }, { status: 403 });
  }

  let cancelledForDeletion = false;
  const subscriptionId = profile?.lemon_subscription_id as string | null | undefined;

  try {
    if (subscriptionId && profile?.subscription_status !== "expired" && !profile?.subscription_cancelled) {
      await cancelLemonSubscription(subscriptionId);
      cancelledForDeletion = true;
    }

    const userTables = [
      "hse_observation_photos",
      "hse_observations",
      "hse_incident_metrics",
      "lab_attempts",
      "lab_user_progress",
      "risk_assessments",
      "simops_assessments",
      "user_activity_events",
    ];

    for (const table of userTables) {
      const { error } = await admin.from(table).delete().eq("user_id", user.id);
      if (error) throw new Error(`${table}: ${error.message}`);
    }

    await admin.storage.from("avatars").remove([`${user.id}/profile-avatar`]);

    if (user.email) {
      const { error } = await admin
        .from("pending_premium_entitlements")
        .delete()
        .ilike("email", user.email.trim().toLowerCase());
      if (error) throw error;
    }

    const { error: profileDeleteError } = await admin.from("profiles").delete().eq("id", user.id);
    if (profileDeleteError) throw profileDeleteError;

    const { error: authDeleteError } = await admin.auth.admin.deleteUser(user.id);
    if (authDeleteError) throw authDeleteError;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Account deletion failed", error);
    if (cancelledForDeletion && subscriptionId) {
      try {
        await resumeLemonSubscription(subscriptionId);
      } catch (resumeError) {
        console.error("Failed to roll back Lemon cancellation after delete failure", resumeError);
      }
    }
    return NextResponse.json({ error: "Account could not be deleted safely" }, { status: 500 });
  }
}
