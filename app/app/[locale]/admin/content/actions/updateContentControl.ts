"use server";

import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

const OWNER_EMAIL = "safebase.global@gmail.com";

type Payload = {
  content_key: string;
  content_type: "toolbox" | "poster" | "checklist" | "download";
  published: boolean;
  visible: boolean;
  access_level: "free" | "premium";
  featured: boolean;
};

export async function updateContentControl(payload: Payload) {
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
    .from("content_controls")
    .upsert(
      {
        ...payload,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "content_key",
      }
    );

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
