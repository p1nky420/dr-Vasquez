"use client";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Eventos que cuentan como conversión comercial. Se envían a GA4 además como
 * `generate_lead`, que es el nombre que GA4 reconoce para marcarlos como
 * conversión en la interfaz y para importarlos a Google Ads.
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

function clean(payload: AnalyticsPayload) {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    out[key] = typeof value === "string" ? value.slice(0, 120) : value;
  }
  return out;
}

/**
 * Canal único de medición: GA4.
 *
 * `gtag` se carga siempre, en estado Consent Mode «denied», y solo se otorgan
 * los permisos tras aceptar el banner. Con analytics_storage denegado GA4 sigue
 * recibiendo pings sin cookies que usa para modelar el comportamiento de quien
 * rechaza, así que el evento no se pierde: se estima.
 *
 * La conversión de lead se registra además en el servidor (Measurement
 * Protocol) desde /api/intake, que es la única cifra que debe ser exacta.
 */
export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const properties = clean(payload);

  window.gtag?.("event", name, properties);
  window.dataLayer?.push({ event: name, ...properties });

  if (isConversion(name)) {
    window.gtag?.("event", "generate_lead", { ...properties, lead_source: name });
    window.fbq?.("track", "Lead", properties);
  } else {
    window.fbq?.("trackCustom", name, properties);
  }
}

/** Dispara `name` una sola vez por vista de página. */
const fired = new Set<string>();

export function trackOnce(name: string, payload: AnalyticsPayload = {}) {
  if (fired.has(name)) return;
  fired.add(name);
  trackEvent(name, payload);
}

/** Desde dónde se pulsó un CTA, para poder rankear ubicaciones. */
export function trackCta(location: string, label: string) {
  trackEvent("cta_click", { location, label });
}
