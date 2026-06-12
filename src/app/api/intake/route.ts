import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { validateIntakeSubmission } from "@/lib/intake";
import {
  encryptIntake,
  notifyIntake,
  persistEncryptedIntake,
  verifyTurnstile,
} from "@/lib/server/intake-security";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "Solicitud demasiado extensa." }, { status: 413 });
  }

  try {
    const validation = validateIntakeSubmission(await request.json());
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const human = await verifyTurnstile(validation.data.turnstileToken, ip);
    if (!human) {
      return NextResponse.json({ error: "No fue posible validar la solicitud." }, { status: 403 });
    }

    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const encrypted = encryptIntake(validation.data);

    await persistEncryptedIntake({
      id,
      status: "new",
      createdAt,
      retentionUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      encrypted,
    });
    await notifyIntake({ id, urgency: validation.data.urgency, createdAt });

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("Secure intake submission failed.", error);
    return NextResponse.json(
      { error: "La admisión segura aún no está configurada. Contacte por WhatsApp." },
      { status: 503 },
    );
  }
}
