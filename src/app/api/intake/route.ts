import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isUrgentIntake, validateIntakeSubmission } from "@/lib/intake";
import { deliverIntake, verifyTurnstile } from "@/lib/server/intake-security";
import { reportLeadToGa4 } from "@/lib/server/ga4";

export const runtime = "nodejs";

const WHATSAPP_FALLBACK = "https://wa.me/593983076881";

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "Solicitud demasiado extensa." }, { status: 413 });
  }

  let id = randomUUID();

  try {
    const validation = validateIntakeSubmission(await request.json());
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    const human = await verifyTurnstile(validation.data.turnstileToken, ip);
    if (!human) {
      return NextResponse.json(
        { error: "No fue posible validar la solicitud. Intente de nuevo." },
        { status: 403 },
      );
    }

    const createdAt = new Date().toISOString();
    const result = await deliverIntake(validation.data, { id, createdAt, ip });

    if (!result.delivered) {
      // Nothing is configured, or every channel failed. The lead is in the
      // server log; give the visitor a path that works right now.
      console.error(`[intake] ${id} NO DELIVERY CHANNEL SUCCEEDED`, result.failures);
      return NextResponse.json(
        {
          error:
            "No pudimos registrar su solicitud automáticamente. Escríbanos por WhatsApp y le responderemos de inmediato.",
          fallbackUrl: WHATSAPP_FALLBACK,
        },
        { status: 503 },
      );
    }

    const urgent = isUrgentIntake(validation.data);

    // Contador exacto de conversiones, independiente del consentimiento.
    await reportLeadToGa4({ leadId: id, source: validation.data.source, urgent });

    return NextResponse.json({ ok: true, id, urgent }, { status: 201 });
  } catch (error) {
    console.error(`[intake] ${id} unexpected failure`, error);
    return NextResponse.json(
      {
        error:
          "Ocurrió un problema al enviar la solicitud. Escríbanos por WhatsApp y le atenderemos directamente.",
        fallbackUrl: WHATSAPP_FALLBACK,
      },
      { status: 500 },
    );
  }
}
