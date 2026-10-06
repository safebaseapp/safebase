"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SERNEM_EVENTS, trackJourneyEvent } from "@/lib/analytics";

const SEARCH_HOSTS = [
  "google.",
  "bing.com",
  "search.yahoo.",
  "duckduckgo.com",
  "ecosia.org",
  "yandex.",
  "baidu.com",
];

function searchEngine(hostname: string) {
  const host = hostname.toLowerCase();
  if (host.includes("google.")) return "google";
  if (host.includes("bing.com")) return "bing";
  if (host.includes("search.yahoo.")) return "yahoo";
  if (host.includes("duckduckgo.com")) return "duckduckgo";
  if (host.includes("ecosia.org")) return "ecosia";
  if (host.includes("yandex.")) return "yandex";
  if (host.includes("baidu.com")) return "baidu";
  return "organic_search";
}

export default function OrganicLandingCapture({ locale }: { locale: "tr" | "en" }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    let referrer: URL | null = null;
    try {
      referrer = document.referrer ? new URL(document.referrer) : null;
    } catch {
      referrer = null;
    }

    const host = referrer?.hostname ?? "";
    if (!host || !SEARCH_HOSTS.some((candidate) => host.includes(candidate))) return;

    const key = `sernem-organic-landing:${window.location.href}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    trackJourneyEvent(SERNEM_EVENTS.ORGANIC_LANDING, {
      journey_stage: "acquisition",
      content_type: "landing_page",
      content_slug: pathname,
      locale,
      source_page: pathname,
      search_engine: searchEngine(host),
      referrer_host: host,
    });
  }, [locale, pathname]);

  return null;
}
