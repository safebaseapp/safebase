"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { SERNEM_EVENTS, trackJourneyEvent } from "@/lib/analytics";

const DOWNLOAD_EXTENSIONS = [".pdf", ".docx", ".doc", ".xlsx", ".xls", ".png", ".jpg", ".jpeg", ".zip"];
const RESOURCE_PATHS = ["/downloads", "/toolbox", "/posters", "/safety-signs", "/checklists", "/knowledge-base", "/risk-assessment"];
const ACTION_WORDS = /(indir|download|yazdır|print|pdf|png|docx|önizle|preview)/i;
const PREMIUM_WORDS = /(premium|logolu|branded|company logo|firma logo)/i;
const GENERIC_ACTION = /^(↓|→|download|indir|indirilen|aç|open|önizle|preview|pdf|png|docx|poster|toolbox|denetim|checklist|rehber|guide|yazdır|print)(\s|$)/i;

type AccessState = { ready: boolean; userId: string | null; premium: boolean };

function cleanLabel(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 100);
}

function stripLanguageSuffix(value: string) {
  return cleanLabel(value).replace(/\s+(tr|en)$/i, "").trim();
}

function hrefOf(element: HTMLElement) {
  return element instanceof HTMLAnchorElement ? element.getAttribute("href") || "" : "";
}

function elementText(element: HTMLElement) {
  return cleanLabel(element.textContent || element.getAttribute("aria-label") || element.getAttribute("title") || "");
}

function isProtectedResourceAction(element: HTMLElement, pathname: string) {
  const href = hrefOf(element).toLowerCase();
  const text = elementText(element).toLowerCase();
  const isFile = DOWNLOAD_EXTENSIONS.some((extension) => href.includes(extension));
  const hasDownloadAttribute = element instanceof HTMLAnchorElement && element.hasAttribute("download");
  const isResourcePage = RESOURCE_PATHS.some((segment) => pathname.includes(segment));
  const explicitGate = element.dataset.authGate === "true" || element.dataset.resourceAction === "true";
  const actionButton = element instanceof HTMLButtonElement && isResourcePage && ACTION_WORDS.test(text);
  const actionAnchor = element instanceof HTMLAnchorElement && isResourcePage && ACTION_WORDS.test(text);
  return explicitGate || hasDownloadAttribute || isFile || actionButton || actionAnchor;
}

function requiresPremium(element: HTMLElement) {
  if (element.dataset.premium === "true" || element.dataset.access === "premium") return true;
  const context = cleanLabel(element.closest("article, tr, li, section, [data-resource-title]")?.textContent || elementText(element));
  return PREMIUM_WORDS.test(context) && ACTION_WORDS.test(elementText(element));
}

function actionType(element: HTMLElement) {
  const href = hrefOf(element).toLowerCase();
  const text = elementText(element).toLowerCase();
  if (/(yazdır|print)/i.test(text)) return "print";
  if (/(önizle|preview)/i.test(text)) return "preview";
  if ((element instanceof HTMLAnchorElement && element.hasAttribute("download")) || DOWNLOAD_EXTENSIONS.some((extension) => href.includes(extension)) || /(indir|download|pdf|png|docx)/i.test(text)) return "download";
  return "open";
}

function resourceFormat(element: HTMLElement) {
  const href = hrefOf(element).toLowerCase();
  const text = elementText(element).toLowerCase();
  if (href.includes(".pdf") || /\bpdf\b/i.test(text)) return "PDF";
  if (href.includes(".docx") || href.includes(".doc") || /\bdocx\b/i.test(text)) return "DOCX";
  if (href.includes(".xlsx") || href.includes(".xls")) return "XLSX";
  if (href.includes(".png") || /\bpng\b/i.test(text)) return "PNG";
  if (href.includes(".jpg") || href.includes(".jpeg")) return "JPG";
  if (href.includes(".zip")) return "ZIP";
  if (/(yazdır|print)/i.test(text)) return "PRINT";
  return "WEB";
}

function resourceLanguage(element: HTMLElement) {
  const text = cleanLabel(element.closest("article, tr, li, section")?.textContent || elementText(element));
  const href = hrefOf(element).toLowerCase();
  if (/\btr\b/i.test(text) || /(?:^|[-_/])tr(?:[-_/\.]|$)/i.test(href)) return "TR";
  if (/\ben\b/i.test(text) || /(?:^|[-_/])en(?:[-_/\.]|$)/i.test(href)) return "EN";
  return "";
}

function meaningfulText(value: string | null | undefined) {
  const text = cleanLabel(value || "");
  if (!text || GENERIC_ACTION.test(text)) return "";
  return text;
}

function resolveResourceTitle(element: HTMLElement) {
  const directDataTitle = meaningfulText(element.dataset.resourceTitle);
  if (directDataTitle) return stripLanguageSuffix(directDataTitle);
  const host = element.closest<HTMLElement>("[data-resource-title]");
  const hostTitle = meaningfulText(host?.dataset.resourceTitle);
  if (hostTitle) return stripLanguageSuffix(hostTitle);
  const article = element.closest("article, tr, li, section");
  const heading = article?.querySelector<HTMLElement>("h1, h2, h3, h4, td:first-child");
  const headingTitle = meaningfulText(heading?.textContent);
  if (headingTitle) return stripLanguageSuffix(headingTitle);
  const ariaTitle = meaningfulText(element.getAttribute("aria-label"));
  if (ariaTitle) return stripLanguageSuffix(ariaTitle);
  const titleAttribute = meaningfulText(element.getAttribute("title"));
  if (titleAttribute) return stripLanguageSuffix(titleAttribute);
  const ownText = meaningfulText(element.textContent);
  if (ownText) return stripLanguageSuffix(ownText);
  return "HSE Resource";
}

export default function UserActivityCapture() {
  const pathname = usePathname();
  const access = useRef<AccessState>({ ready: false, userId: null, premium: false });

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    void (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!active) return;
        if (!user) {
          access.current = { ready: true, userId: null, premium: false };
          return;
        }
        const { data: profile } = await supabase.from("profiles").select("plan,role").eq("id", user.id).maybeSingle();
        if (!active) return;
        access.current = {
          ready: true,
          userId: user.id,
          premium: profile?.plan === "premium" || profile?.role === "admin",
        };
      } catch {
        if (active) access.current = { ready: true, userId: null, premium: false };
      }
    })();
    return () => { active = false; };
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const element = target?.closest<HTMLElement>("a, button, [data-auth-gate='true'], [data-resource-action='true']");
      if (!element || !isProtectedResourceAction(element, pathname || "")) return;

      const state = access.current;
      const locale = pathname?.startsWith("/tr") ? "tr" : "en";
      const current = `${window.location.pathname}${window.location.search}`;

      if (!state.ready || !state.userId) {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(`/${locale}/login?next=${encodeURIComponent(current)}`);
        return;
      }

      if (requiresPremium(element) && !state.premium) {
        trackJourneyEvent(SERNEM_EVENTS.PREMIUM_INTENT, {
          journey_stage: "conversion",
          content_type: "resource",
          content_slug: resolveResourceTitle(element),
          locale,
          source_page: pathname || "/",
          format: resourceFormat(element),
        });
        event.preventDefault();
        event.stopPropagation();
        void createClient().from("user_activity_events").insert({
          user_id: state.userId,
          event_name: `resource_attempt|${resolveResourceTitle(element)}|${resourceFormat(element)}|${resourceLanguage(element)}`.slice(0, 180),
          path: (hrefOf(element) || pathname || "/").slice(0, 300),
        });
        window.location.assign(`/${locale}/upgrade?next=${encodeURIComponent(current)}`);
        return;
      }

      const label = resolveResourceTitle(element);
      const action = actionType(element);
      const format = resourceFormat(element);
      const language = resourceLanguage(element);
      const href = (hrefOf(element) || pathname || "/").slice(0, 300);

      const journeyEvent =
        action === "download" ? SERNEM_EVENTS.DOWNLOAD :
        action === "open" || action === "preview" ? SERNEM_EVENTS.TOOL_OPEN :
        SERNEM_EVENTS.EXPORT;
      trackJourneyEvent(journeyEvent, {
        journey_stage: action === "download" ? "value" : "activation",
        content_type: "resource",
        content_slug: label,
        locale,
        source_page: pathname || "/",
        format,
        action,
      });

      void createClient().from("user_activity_events").insert({
        user_id: state.userId,
        event_name: `resource_${action}|${label}|${format}|${language}`.slice(0, 180),
        path: href,
      }).then(({ error }) => {
        if (error) console.error("SERNEM resource activity tracking error:", error);
      });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname]);

  return null;
}
