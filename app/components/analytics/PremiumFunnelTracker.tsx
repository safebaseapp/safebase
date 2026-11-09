"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";

// GA4's gtag.js processes queued dataLayer commands after it loads.
// Only generic funnel events are sent; never send identity or HSE document data.
function trackPremiumFunnel(eventName: string) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  // Use Google's supported gtag event API when the tag has initialized.
  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", eventName, { funnel: "premium" });
    return;
  }
  // The Google tag snippet is afterInteractive, so early clicks may precede it.
  // Keep the command in the same dataLayer queue that gtag.js will initialize.
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push(["event", eventName, { funnel: "premium" }]);
}

export default function PremiumFunnelTracker() {
  useEffect(() => {
    trackPremiumFunnel("premium_view");
  }, []);
  return null;
}

type GrowthLinkProps = {
  href: string;
  eventName: "premium_free_example_click" | "premium_team_pilot_click" | "premium_tools_cta_click" | "premium_toolbox_cta_click" | "premium_method_cta_click" | "premium_ppe_cta_click" | "premium_sign_cta_click" | "premium_home_cta_click";
  className: string;
  children: ReactNode;
};

export function PremiumGrowthLink({ href, eventName, className, children }: GrowthLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackPremiumFunnel(eventName)}
    >
      {children}
    </Link>
  );
}
