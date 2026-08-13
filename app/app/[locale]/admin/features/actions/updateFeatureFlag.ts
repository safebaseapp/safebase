"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

const OWNER_EMAIL = "safebase.global@gmail.com";

type FeatureFlagKey =
  | "ai_assistant"
  | "premium_downloads"
  | "courses_certificates";

type Payload = {
  key: FeatureFlagKey;
  enabled: boolean;
};

export async function updateFeatureFlag(payload: Payload) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const isOwner =
    user.email?.trim().toLowerCase() === OWNER_EMAIL;

  if (!isOwner || !isAdminUser(user)) {
    throw new Error("Forbidden");
  }

  const { error } = await supabase
    .from("feature_flags")
    .update({
      enabled: payload.enabled,
      updated_at: new Date().toISOString(),
    })
    .eq("key", payload.key);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tr/admin/features");
  revalidatePath("/en/admin/features");

  return { success: true };
}
