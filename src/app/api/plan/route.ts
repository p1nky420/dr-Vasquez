import { get, list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import {
  isValidFieldId,
  isValidPlanKey,
  MAX_ANSWER_LENGTH,
  PLAN_ANSWERS_PREFIX,
  PRIVATE_HEADERS,
} from "@/lib/server/plan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "No encontrado." }, { status: 404, headers: PRIVATE_HEADERS });
}

/** Una respuesta por archivo, para que guardar dos campos a la vez no pise ninguno. */
export async function GET(request: NextRequest) {
  if (!isValidPlanKey(request.headers.get("x-plan-clave"))) return unauthorized();

  const { blobs } = await list({ prefix: PLAN_ANSWERS_PREFIX, limit: 200 });
  const entries = await Promise.all(
    blobs.map(async (blob) => {
      const file = await get(blob.pathname, { access: "private" });
      if (!file?.stream) return null;
      const data = JSON.parse(await new Response(file.stream).text()) as { valor?: unknown };
      const id = blob.pathname.slice(PLAN_ANSWERS_PREFIX.length).replace(/\.json$/, "");
      return typeof data.valor === "string" ? ([id, data.valor] as const) : null;
    }),
  );

  const respuestas = Object.fromEntries(entries.filter((entry) => entry !== null));
  return NextResponse.json({ respuestas }, { headers: PRIVATE_HEADERS });
}

export async function POST(request: NextRequest) {
  if (!isValidPlanKey(request.headers.get("x-plan-clave"))) return unauthorized();

  const body = (await request.json().catch(() => null)) as { id?: unknown; valor?: unknown } | null;
  if (!body || !isValidFieldId(body.id) || typeof body.valor !== "string" || body.valor.length > MAX_ANSWER_LENGTH) {
    return NextResponse.json({ error: "Respuesta no válida." }, { status: 400, headers: PRIVATE_HEADERS });
  }

  await put(
    `${PLAN_ANSWERS_PREFIX}${body.id}.json`,
    JSON.stringify({ valor: body.valor, actualizado: new Date().toISOString() }),
    { access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" },
  );

  return NextResponse.json({ ok: true }, { headers: PRIVATE_HEADERS });
}
