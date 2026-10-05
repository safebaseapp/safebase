import "server-only";
import { createClient } from "@/utils/supabase/server";

/**
 * Safety-sign entitlement is resolved on the server so the normal UI cannot
 * grant a clean (unbranded) sign only from client-side state.
 *
 * Anonymous, free, invalid and suspended accounts are treated as branded.
 * Premium members and admins receive clean safety-sign renders/downloads.
 */
export async function isSafetySignPremiumUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("plan,role,status")
    .eq("id", user.id)
    .single();

  if (error || !profile || profile.status === "suspended") {
    return false;
  }

  return profile.plan === "premium" || profile.role === "admin";
}
