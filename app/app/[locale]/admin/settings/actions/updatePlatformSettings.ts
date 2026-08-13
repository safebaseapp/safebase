"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

const OWNER_EMAIL = "safebase.global@gmail.com";

type Payload = {
  site_name_tr: string;
  site_name_en: string;
  seo_title_tr: string;
  seo_title_en: string;
  seo_description_tr: string;
  seo_description_en: string;
  support_email: string;
  maintenance_mode: boolean;
};

export async function updatePlatformSettings(
  payload: Payload
) {
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
    .from("platform_settings")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/tr/admin/settings");
  revalidatePath("/en/admin/settings");
  revalidatePath("/tr");
  revalidatePath("/en");

  return { success: true };
}
