"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const DOWNLOAD_EXTENSIONS = [".pdf", ".docx", ".doc", ".xlsx", ".xls", ".png", ".jpg", ".jpeg", ".zip"];
const RESOURCE_PATHS = ["/downloads", "/toolbox", "/posters", "/safety-signs", "/checklists", "/knowledge-base"];
const GENERIC_ACTION = /^(↓|→|download|indir|indirilen|aç|open|önizle|preview|pdf|docx|poster|toolbox|denetim|checklist|rehber|guide)(\s|$)/i;

function cleanLabel(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 100);
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

function resourceFormat(anchor: HTMLAnchorElement) {
  const href = (anchor.getAttribute("href") || "").toLocaleLowerCase();
  if (href.includes(".pdf")) return "PDF";
  if (href.includes(".docx") || href.includes(".doc")) return "DOCX";
  if (href.includes(".xlsx") || href.includes(".xls")) return "XLSX";
  if (href.includes(".png")) return "PNG";
  if (href.includes(".jpg") || href.includes(".jpeg")) return "JPG";
  if (href.includes(".zip")) return "ZIP";
  return "WEB";
}

function meaningfulText(value: string | null | undefined) {
  const text = cleanLabel(value || "");
  if (!text || GENERIC_ACTION.test(text)) return "";
  return text;
}

function resolveResourceTitle(anchor: HTMLAnchorElement) {
  const directDataTitle = meaningfulText(anchor.dataset.resourceTitle);
  if (directDataTitle) return directDataTitle;

  const dataTitleHost = anchor.closest<HTMLElement>("[data-resource-title]");
  const hostTitle = meaningfulText(dataTitleHost?.dataset.resourceTitle);
  if (hostTitle) return hostTitle;

  const article = anchor.closest("article");
  const articleHeading = article?.querySelector<HTMLElement>("h1, h2, h3, h4");
  const articleTitle = meaningfulText(articleHeading?.textContent);
  if (articleTitle) return articleTitle;

  const row = anchor.closest("tr");
  if (row) {
    const rowHeading = row.querySelector<HTMLElement>("h1, h2, h3, h4, td:first-child");
    const rowTitle = meaningfulText(rowHeading?.textContent);
    if (rowTitle) return rowTitle;
  }

  const card = anchor.closest<HTMLElement>("[data-title], [data-name], li, section");
  const cardHeading = card?.querySelector<HTMLElement>("h1, h2, h3, h4");
  const cardTitle = meaningfulText(cardHeading?.textContent);
  if (cardTitle) return cardTitle;

  const ariaTitle = meaningfulText(anchor.getAttribute("aria-label"));
  if (ariaTitle) return ariaTitle;

  const titleAttribute = meaningfulText(anchor.getAttribute("title"));
  if (titleAttribute) return titleAttribute;

  const ownText = meaningfulText(anchor.textContent);
  if (ownText) return ownText;

  return "HSE Resource";
}

export default function UserActivityCapture() {
  const pathname = usePathname();

  useEffect(() => {
    async function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || !shouldTrack(anchor, pathname || "")) return;

      const label = resolveResourceTitle(anchor);
      const action = actionType(anchor);
      const format = resourceFormat(anchor);
      const href = (anchor.getAttribute("href") || "").slice(0, 300);

      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase.from("user_activity_events").insert({
          user_id: user.id,
          event_name: `resource_${action}|${label}|${format}`.slice(0, 180),
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
