"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Props = {
  eventName: string;
};

export default function ActivityTracker({ eventName }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    const key = `sernem-event:${eventName}:${pathname}`;

    if (sessionStorage.getItem(key)) {
      return;
    }

    // Duplicate mount gelmeden önce kilitle
    sessionStorage.setItem(key, "pending");

    async function track() {
      try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          sessionStorage.removeItem(key);
          return;
        }

        const { error } = await supabase
          .from("user_activity_events")
          .insert({
            user_id: user.id,
            event_name: eventName,
            path: pathname,
          });

        if (error) {
          sessionStorage.removeItem(key);
          console.error("SERNEM activity tracking error:", error);
          return;
        }

        sessionStorage.setItem(key, "recorded");
      } catch (error) {
        sessionStorage.removeItem(key);
        console.error("SERNEM activity tracking error:", error);
      }
    }

    track();
  }, [eventName, pathname]);

  return null;
}
