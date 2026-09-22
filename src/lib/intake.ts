export const intakeStages = [
  "Investigación previa",
  "Formulación de cargos",
  "Instrucción fiscal",
  "Audiencia o juicio",
  "Apelación, casación o revisión",
  "Consulta preventiva",
] as const;

export const intakeUrgencies = [
  "Atención inmediata: existe audiencia o detención",
  "Durante las próximas 24–72 horas",
  "Durante los próximos 7 días",
  "Evaluación preventiva sin urgencia inmediata",
] as const;

export type IntakeSubmission = {
  /** Required: the minimum needed to call someone back. */
  name: string;
  phone: string;
  /** Everything below is optional — asked, not demanded. */
  email?: string;
  message?: string;
  matterType?: string;
  stage?: string;
  urgency?: string;
  jurisdiction?: string;
  conflictParties?: string;
  preferredContact?: string;
  /** Where on the site the lead came from, for attribution. */
  source?: string;
  consent: boolean;
  turnstileToken?: string;
};

const OPTIONAL_TEXT = [
  "email",
  "message",
  "matterType",
  "stage",
  "urgency",
  "jurisdiction",
  "conflictParties",
  "preferredContact",
  "source",
] as const;

function readText(value: unknown, max = 2000) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

export function validateIntakeSubmission(input: unknown) {
  if (!input || typeof input !== "object") {
    return { ok: false as const, error: "Solicitud inválida." };
  }

  const value = input as Record<string, unknown>;

  const name = readText(value.name, 160);
  if (!name || name.length < 2) {
    return { ok: false as const, error: "Indique su nombre para poder responderle." };
  }

  const phone = readText(value.phone, 40);
  if (!phone || phone.replace(/\D/g, "").length < 7) {
    return {
      ok: false as const,
      error: "Indique un teléfono válido: es la vía más rápida de respuesta.",
    };
  }

  const email = readText(value.email, 180);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: "El correo electrónico no parece válido." };
  }

  if (value.consent !== true) {
    return { ok: false as const, error: "Debe aceptar el aviso de admisión." };
  }

  const data: IntakeSubmission = { name, phone, consent: true };

  for (const field of OPTIONAL_TEXT) {
    const parsed = readText(value[field], field === "message" ? 2000 : 300);
    if (parsed) data[field] = parsed;
  }
  if (email) data.email = email;

  const turnstileToken = readText(value.turnstileToken, 3000);
  if (turnstileToken) data.turnstileToken = turnstileToken;

  return { ok: true as const, data };
}

/** Short, scannable summary used in the notification that reaches the firm. */
export function summarizeIntake(data: IntakeSubmission) {
  const lines = [
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    data.email ? `Correo: ${data.email}` : null,
    data.urgency ? `Urgencia: ${data.urgency}` : null,
    data.stage ? `Etapa: ${data.stage}` : null,
    data.matterType ? `Asunto: ${data.matterType}` : null,
    data.jurisdiction ? `Jurisdicción: ${data.jurisdiction}` : null,
    data.preferredContact ? `Contacto preferido: ${data.preferredContact}` : null,
    data.conflictParties ? `Partes: ${data.conflictParties}` : null,
    data.message ? `Mensaje: ${data.message}` : null,
    data.source ? `Origen: ${data.source}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

/** Leads that should interrupt whatever the firm is doing. */
export function isUrgentIntake(data: IntakeSubmission) {
  return Boolean(data.urgency?.startsWith("Atención inmediata"));
}
