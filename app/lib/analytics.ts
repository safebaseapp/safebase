"use client";

type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const SERNEM_EVENTS = {
  ORGANIC_LANDING: "organic_landing",
  TOOL_OPEN: "tool_open",
  TOOL_START: "tool_start",
  TOOL_COMPLETE: "tool_complete",
  SAVE: "content_save",
  EXPORT: "content_export",
  DOWNLOAD: "content_download",
  SIGN_UP: "sign_up",
  PREMIUM_INTENT: "premium_intent",
} as const;

export type SernemEventName = typeof SERNEM_EVENTS[keyof typeof SERNEM_EVENTS];

export type JourneyStage =
  | "acquisition"
  | "activation"
  | "completion"
  | "value"
  | "conversion";

export type JourneyParams = AnalyticsParams & {
  journey_stage?: JourneyStage;
  content_type?: string;
  content_slug?: string;
  tool_name?: string;
  locale?: string;
  experiment_id?: string;
  experiment_variant?: string;
  source_page?: string;
};

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );

  window.gtag("event", eventName, cleanParams);
}

export function trackJourneyEvent(eventName: SernemEventName, params: JourneyParams = {}) {
  trackEvent(eventName, params);
}
