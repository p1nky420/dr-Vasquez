import "server-only";

import { timingSafeEqual } from "node:crypto";

/**
 * Página privada del plan para el Dr. Vásquez.
 *
 * El repositorio es público, así que ni el contenido del plan ni la clave
 * viven en el código: el HTML y las respuestas están en un Blob store
 * privado y la clave en la variable PLAN_ACCESS_KEY. Sin clave válida la
 * ruta responde 404, como si no existiera.
 */
export const PLAN_PAGE_PATH = "plan/pagina.html";
export const PLAN_ANSWERS_PREFIX = "plan/respuestas/";

export const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
} as const;

export function isValidPlanKey(candidate: string | null | undefined) {
  const expected = process.env.PLAN_ACCESS_KEY;
  if (!expected || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Ids de campo del formulario: minúsculas y guion bajo. */
export function isValidFieldId(id: unknown): id is string {
  return typeof id === "string" && /^[a-z_]{2,40}$/.test(id);
}

export const MAX_ANSWER_LENGTH = 8000;
