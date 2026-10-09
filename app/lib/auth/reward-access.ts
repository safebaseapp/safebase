import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Prize access is independent of Lemon Squeezy and expires automatically at the database boundary. */
export async function hasActiveReward(supabase: SupabaseClient, userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_active_premium_reward", { p_user_id: userId });
  if (error) {
    console.error("Reward entitlement read failed", error);
    return false;
  }
  return data === true;
}
