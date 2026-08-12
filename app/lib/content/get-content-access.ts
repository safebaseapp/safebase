import { createClient } from "@/utils/supabase/server";

type ContentAccessResult = {
  published: boolean;
  visible: boolean;
  accessLevel: "free" | "premium";
  canAccess: boolean;
  isAuthenticated: boolean;
  isSuspended: boolean;
};

export async function getContentAccess(
  contentKey: string
): Promise<ContentAccessResult> {
  const supabase = await createClient();

  const { data: control } = await supabase
    .from("content_controls")
    .select("published,visible,access_level")
    .eq("content_key", contentKey)
    .maybeSingle();

  const published = control?.published ?? true;
  const visible = control?.visible ?? true;
  const accessLevel =
    control?.access_level === "premium" ? "premium" : "free";

  if (accessLevel === "free") {
    return {
      published,
      visible,
      accessLevel,
      canAccess: true,
      isAuthenticated: false,
      isSuspended: false,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      published,
      visible,
      accessLevel,
      canAccess: false,
      isAuthenticated: false,
      isSuspended: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan,role,status")
    .eq("id", user.id)
    .maybeSingle();

  const isSuspended =
    profile?.status?.toLowerCase() === "suspended";

  const canAccess =
    !isSuspended &&
    (
      profile?.plan?.toLowerCase() === "premium" ||
      profile?.role?.toLowerCase() === "admin"
    );

  return {
    published,
    visible,
    accessLevel,
    canAccess,
    isAuthenticated: true,
    isSuspended,
  };
}
