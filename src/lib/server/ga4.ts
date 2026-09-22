import "server-only";

import { createHash } from "node:crypto";

const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";

/**
 * Envía la conversión de lead a GA4 por Measurement Protocol, desde el
 * servidor.
 *
 * Es la única cifra del sitio que debe ser exacta: el conteo de leads no puede
 * depender de que el visitante acepte un banner, ni de que su bloqueador deje
 * pasar gtag. El evento del navegador sigue existiendo para atribución
 * (campaña, origen, dispositivo); este es el contador de verdad.
 *
 * No se envía ningún dato personal: el client_id es un hash del identificador
 * interno del lead, sin nombre, teléfono ni correo.
 */
export async function reportLeadToGa4(params: {
  leadId: string;
  source?: string;
  urgent: boolean;
}) {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return false;

  // GA4 exige un client_id estable; se deriva del id del lead, no de la persona.
  const clientId = createHash("sha256")
    .update(params.leadId)
    .digest("hex")
    .slice(0, 16)
    .replace(/(.{8})(.{8})/, "$1.$2");

  const url = `${GA4_ENDPOINT}?measurement_id=${encodeURIComponent(
    measurementId,
  )}&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        non_personalized_ads: true,
        events: [
          {
            name: "generate_lead",
            params: {
              lead_source: params.source ?? "web",
              urgent: params.urgent,
              engagement_time_msec: 1,
            },
          },
        ],
      }),
      cache: "no-store",
    });
    return response.ok;
  } catch (error) {
    // La medición nunca debe hacer fallar la entrega del lead.
    console.warn("[ga4] no se pudo reportar la conversión", error);
    return false;
  }
}
