import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isUrgentIntake, validateIntakeSubmission } from "@/lib/intake";
import { deliverIntake, verifyTurnstile } from "@/lib/server/intake-security";
import { reportLeadToGa4 } from "@/lib/server/ga4";

export const runtime = "nodejs";

const WHATSAPP_FALLBACK = "https://wa.me/593983076881";

/** Only readiness is exposed; recipients, keys and storage locations stay private. */
export async function GET() {
  const email = Boolean(process.env.RESEND_API_KEY && process.env.INTAKE_NOTIFICATION_EMAIL && process.env.INTAKE_NOTIFICATION_FROM);
  const webhook = Boolean(process.env.INTAKE_NOTIFICATION_WEBHOOK_URL);
  const storage = Boolean(process.env.INTAKE_STORAGE_URL && process.env.INTAKE_STORAGE_TOKEN && process.env.INTAKE_ENCRYPTION_KEY);
  const canVerify = !process.env.TURNSTILE_SECRET_KEY || Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  return NextResponse.json({ deliveryAvailable: canVerify && (email || webhook || storage) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "Solicitud demasiado extensa." }, { status: 413 });
  }

  const id = randomUUID();

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
            "No pudimos registrar su solicitud automáticamente. Puede continuar por WhatsApp para coordinar la atención.",
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
