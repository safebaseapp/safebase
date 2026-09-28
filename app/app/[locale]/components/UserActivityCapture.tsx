"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const DOWNLOAD_EXTENSIONS = [".pdf", ".docx", ".doc", ".xlsx", ".xls", ".png", ".jpg", ".jpeg", ".zip"];
const RESOURCE_PATHS = ["/downloads", "/toolbox", "/posters", "/safety-signs", "/checklists", "/knowledge-base"];

function cleanLabel(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 90);
}

function shouldTrack(anchor: HTMLAnchorElement, pathname: string) {
  const href = anchor.getAttribute("href") || "";
  const text = cleanLabel(anchor.textContent || "").toLocaleLowerCase();
  const loweredHref = href.toLocaleLowerCase();
  const isFile = DOWNLOAD_EXTENSIONS.some((extension) => loweredHref.includes(extension));
  const hasDownloadAttribute = anchor.hasAttribute("download");
  const isResourcePage = RESOURCE_PATHS.some((segment) => pathname.includes(segment));
  const looksLikeResourceAction = /(indir|download|aç|open|önizle|preview|pdf|docx|poster|toolbox|denetim|checklist|rehber|guide)/i.test(text);
  return hasDownloadAttribute || isFile || (isResourcePage && looksLikeResourceAction);
}

function actionType(anchor: HTMLAnchorElement) {
  const href = (anchor.getAttribute("href") || "").toLocaleLowerCase();
  const text = cleanLabel(anchor.textContent || "").toLocaleLowerCase();
  if (anchor.hasAttribute("download") || DOWNLOAD_EXTENSIONS.some((extension) => href.includes(extension))) return "download";
  if (/(önizle|preview)/i.test(text)) return "preview";
  return "open";
}

export default function UserActivityCapture() {
  const pathname = usePathname();

  useEffect(() => {
    async function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || !shouldTrack(anchor, pathname || "")) return;

      const label = cleanLabel(anchor.textContent || anchor.getAttribute("title") || "Resource");
      const action = actionType(anchor);
      const href = (anchor.getAttribute("href") || "").slice(0, 300);

      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.from("user_activity_events").insert({
          user_id: user.id,
          event_name: `resource_${action}|${label || "Resource"}`.slice(0, 180),
          path: href || pathname || "/",
        });
      } catch (error) {
        console.error("SERNEM resource activity tracking error:", error);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
