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
  name: string;
  phone: string;
  email: string;
  matterType: string;
  stage: string;
  urgency: string;
  jurisdiction: string;
  conflictParties: string;
  consent: boolean;
  turnstileToken?: string;
};

export function validateIntakeSubmission(input: unknown) {
  if (!input || typeof input !== "object") {
    return { ok: false as const, error: "Solicitud inválida." };
  }

  const value = input as Partial<IntakeSubmission>;
  const requiredText: Array<keyof IntakeSubmission> = [
    "name",
    "phone",
    "email",
    "matterType",
    "stage",
    "urgency",
    "jurisdiction",
    "conflictParties",
  ];

  for (const field of requiredText) {
    const fieldValue = value[field];
    if (typeof fieldValue !== "string" || fieldValue.trim().length < 2) {
      return { ok: false as const, error: `Campo inválido: ${field}.` };
    }
    if (fieldValue.length > 300) {
      return { ok: false as const, error: `Campo demasiado extenso: ${field}.` };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email ?? "")) {
    return { ok: false as const, error: "Correo electrónico inválido." };
  }

  if (value.consent !== true) {
    return { ok: false as const, error: "Debe aceptar el aviso de admisión." };
  }

  return {
    ok: true as const,
    data: {
      name: value.name!.trim(),
      phone: value.phone!.trim(),
      email: value.email!.trim().toLowerCase(),
      matterType: value.matterType!.trim(),
      stage: value.stage!.trim(),
      urgency: value.urgency!.trim(),
      jurisdiction: value.jurisdiction!.trim(),
      conflictParties: value.conflictParties!.trim(),
      consent: true,
      turnstileToken:
        typeof value.turnstileToken === "string" ? value.turnstileToken : undefined,
    } satisfies IntakeSubmission,
  };
}
