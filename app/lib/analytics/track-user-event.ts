import { createClient } from "@/utils/supabase/client";

export async function trackUserEvent(
  eventName: string,
  metadata: Record<string, unknown> = {},
  path?: string,
) {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("user_activity_events")
      .insert({
        user_id: user.id,
        event_name: eventName,
        path:
          path ??
          (typeof window !== "undefined"
            ? window.location.pathname
            : null),
        metadata,
      });

    if (error) {
      console.error("SERNEM user event tracking error:", error);
    }
  } catch (error) {
    console.error("SERNEM user event tracking error:", error);
  }
}
