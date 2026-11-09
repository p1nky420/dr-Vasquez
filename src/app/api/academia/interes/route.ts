import { createHmac } from "node:crypto";
import { head, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { academyPrograms } from "@/lib/academia";
import { academyPrivacy } from "@/lib/academia-interest";
import { academyInterestSiteKey } from "@/lib/server/academy-interest";
import { verifyTurnstile } from "@/lib/server/intake-security";

export const runtime = "nodejs";

function reply(body: { ok: true } | { error: string }, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function validate(input: unknown) {
  if (!input || typeof input !== "object") return null;
  const { name, contact, channel, program, consent, token } = input as Record<string, unknown>;
  if (typeof name !== "string" || typeof contact !== "string" ||
      typeof token !== "string" || !token || token.length > 2048 || consent !== true ||
      (channel !== "email" && channel !== "whatsapp") ||
      (program !== "general" && !academyPrograms.some((entry) => entry.slug === program))) return null;

  const fullName = name.trim().replace(/\s+/g, " ");
  const trimmedContact = contact.trim();
  if (fullName.length < 2 || fullName.length > 100 || trimmedContact.length > 254) return null;
  if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact)) return null;
  if (channel === "whatsapp" && (!/^\+?[\d ().-]+$/.test(trimmedContact) || !/^\d{7,15}$/.test(trimmedContact.replace(/\D/g, "")))) return null;

  return { fullName, contact: channel === "email" ? trimmedContact.toLowerCase() : trimmedContact, channel, program, token };
}

export async function POST(request: NextRequest) {
  const blobToken = process.env.ACADEMIA_INTEREST_BLOB_TOKEN;
  if (!blobToken || !academyInterestSiteKey()) {
    return reply({ error: "El formulario no está disponible. Puede solicitar un aviso por WhatsApp." }, 503);
  }
  if (request.headers.get("sec-fetch-site") === "cross-site" || !request.headers.get("content-type")?.startsWith("application/json")) {
    return reply({ error: "Solicitud no válida." }, 415);
  }
  if (Number(request.headers.get("content-length")) > 8192) {
    return reply({ error: "Solicitud demasiado extensa." }, 413);
  }

  const data = validate(await request.json().catch(() => null));
  if (!data) return reply({ error: "Revise su nombre, el contacto y la autorización." }, 400);

  const { token, ...lead } = data;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!await verifyTurnstile(token, ip, "academia_interes")) {
    return reply({ error: "No pudimos verificar el formulario. Intente de nuevo o continúe por WhatsApp." }, 403);
  }

  const contactKey = lead.channel === "whatsapp" ? lead.contact.replace(/\D/g, "") : lead.contact;
  const id = createHmac("sha256", blobToken)
    .update(JSON.stringify([academyPrivacy.version, lead.program, lead.channel, contactKey]))
    .digest("hex");
  const path = `academia/interes/${id}.json`;

  try {
    await put(path, JSON.stringify({
      ...lead,
      consentVersion: academyPrivacy.version,
      consentAt: new Date().toISOString(),
    }), { access: "private", token: blobToken, contentType: "application/json", addRandomSuffix: false, allowOverwrite: false });
  } catch {
    // Una solicitud que ya se guardó también puede llegar por un reintento.
    const existing = await head(path, { token: blobToken }).catch(() => null);
    if (existing) return reply({ ok: true }, 200);
    console.error("No se pudo guardar un registro de la lista de la Academia.");
    return reply({ error: "No pudimos registrar su interés. Puede continuar por WhatsApp." }, 503);
  }

  return reply({ ok: true }, 201);
}
