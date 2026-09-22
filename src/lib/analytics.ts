"use client";

import { track as vercelTrack } from "@vercel/analytics";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Conversion events that matter commercially. Anything tracked with a name from
 * this list is also mirrored into GA4 as a `generate_lead`-style conversion.
 */
export const CONVERSION_EVENTS = [
  "lead_submitted",
  "quick_lead_submitted",
  "whatsapp_click",
  "phone_click",
] as const;

function isConversion(name: string) {
  return (CONVERSION_EVENTS as readonly string[]).includes(name);
}

/** Vercel Analytics rejects nested/undefined values; flatten to primitives. */
function clean(payload: AnalyticsPayload) {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    out[key] = typeof value === "string" ? value.slice(0, 120) : value;
  }
  return out;
}

/**
 * Sends an event to every measurement surface that is actually available.
 *
 * Vercel Analytics is loaded unconditionally and is cookieless, so it is the
 * one channel guaranteed to record the event regardless of consent state.
 * GA4 / Meta only receive it once the visitor has opted in.
 */
export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const properties = clean(payload);

  try {
    vercelTrack(name, properties);
  } catch {
    // Analytics must never break the page it measures.
  }

  window.dataLayer?.push({ event: name, ...properties });
  window.gtag?.("event", name, properties);

  if (isConversion(name)) {
    window.gtag?.("event", "generate_lead", { ...properties, lead_source: name });
    window.fbq?.("track", "Lead", properties);
  } else {
    window.fbq?.("trackCustom", name, properties);
  }
}

/**
 * Fires `name` at most once per page view. Used for scroll milestones and
 * section impressions, which would otherwise fire on every scroll frame.
 */
const fired = new Set<string>();

export function trackOnce(name: string, payload: AnalyticsPayload = {}) {
  if (fired.has(name)) return;
  fired.add(name);
  trackEvent(name, payload);
}

/** Where on the page a CTA was clicked, so we can rank CTA placements. */
export function trackCta(location: string, label: string) {
  trackEvent("cta_click", { location, label });
}
