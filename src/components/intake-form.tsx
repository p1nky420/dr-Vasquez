"use client";

import { ArrowRight, CheckCircle2, Loader, LockKeyhole, ShieldAlert, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState, type FormEvent } from "react";
import { trackEvent, trackOnce } from "@/lib/analytics";
import { intakeStages, intakeUrgencies } from "@/lib/intake";
import { whatsappHref } from "@/lib/site";

const fieldClass = "luxury-field-input";
const labelClass = "luxury-field-label";

/**
 * Full intake. Only name, phone and consent are required — everything else is
 * offered, not demanded. Nine required fields at first contact was the single
 * largest source of abandonment on this form.
 */
export function IntakeForm() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    setFallbackUrl(null);
    trackEvent("lead_attempt", { source: "home-full" });

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "home-full",
          consent: form.get("consent") === "on",
          turnstileToken: form.get("cf-turnstile-response") ?? undefined,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string; fallbackUrl?: string };
        setError(result.error ?? "No fue posible enviar la solicitud.");
        setFallbackUrl(result.fallbackUrl ?? null);
        setState("error");
        trackEvent("lead_error", { source: "home-full", status: response.status });
        return;
      }

      trackEvent("lead_submitted", { source: "home-full" });
      router.push("/gracias");
    } catch {
      setError("No hay conexión en este momento.");
      setFallbackUrl(whatsappHref("Hola, deseo solicitar una evaluación de mi caso."));
      setState("error");
      trackEvent("lead_error", { source: "home-full", status: 0 });
    }
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      ) : null}
      <form
        onFocusCapture={() => trackOnce("lead_start", { source: "home-full" })}
        onSubmit={handleSubmit}
        className="grid gap-6"
      >
        {/* Lo imprescindible para poder responder. */}
        <div className="grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Nombre completo
            <input className={fieldClass} name="name" required autoComplete="name" placeholder="Ej: Sr. Juan Pérez" />
          </label>
          <label className={labelClass}>
            Teléfono / WhatsApp
            <input className={fieldClass} name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+593 ..." />
          </label>
        </div>

        <fieldset className="grid gap-5 border-t border-[#ecc058]/18 pt-6 md:grid-cols-2">
          <legend className="px-0 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#8f877c]">
            Opcional — acelera la evaluación
          </legend>

          <label className={`${labelClass} md:col-span-2`}>
            ¿Qué ocurrió?
            <textarea
              className={`${fieldClass} min-h-28 resize-y py-3`}
              name="message"
              rows={3}
              placeholder="Ej: recibí una notificación de Fiscalía / tengo audiencia el lunes / necesito una segunda opinión"
            />
          </label>
          <label className={labelClass}>
            Correo electrónico
            <input className={fieldClass} name="email" type="email" autoComplete="email" placeholder="correo@ejemplo.com" />
          </label>
          <label className={labelClass}>
            Tipo de asunto
            <input className={fieldClass} name="matterType" placeholder="Penal, económico, constitucional..." />
          </label>
          <label className={labelClass}>
            Etapa procesal
            <select className={fieldClass} name="stage" defaultValue="">
              <option value="">Sin especificar</option>
              {intakeStages.map((stage) => <option key={stage}>{stage}</option>)}
            </select>
          </label>
          <label className={labelClass}>
            Nivel de urgencia
            <select className={fieldClass} name="urgency" defaultValue="">
              <option value="">Sin especificar</option>
              {intakeUrgencies.map((urgency) => <option key={urgency}>{urgency}</option>)}
            </select>
          </label>
          <label className={labelClass}>
            Jurisdicción
            <input className={fieldClass} name="jurisdiction" placeholder="Ciudad y país" />
          </label>
          <label className={labelClass}>
            Preferencia de contacto
            <select className={fieldClass} name="preferredContact" defaultValue="">
              <option value="">Sin preferencia</option>
              <option value="llamada-privada">Llamada telefónica privada</option>
              <option value="whatsapp-cifrado">WhatsApp</option>
              <option value="reunion-oficina">Reunión en oficina (Torre 1492, Quito)</option>
            </select>
          </label>
        </fieldset>

        <label className="flex cursor-pointer select-none items-start gap-3 text-[0.875rem] leading-6 text-[#a9a196]">
          <input className="mt-1 accent-[#ecc058]" type="checkbox" name="consent" required />
          <span>Autorizo el tratamiento inicial de estos datos para evaluar mi consulta.</span>
        </label>

        {state === "error" ? (
          <p role="alert" className="text-[0.9rem] leading-6 text-[#d6a98f]">
            {error}{" "}
            {fallbackUrl ? (
              <a className="font-semibold text-[#ecc058] underline" href={fallbackUrl} target="_blank" rel="noreferrer">
                Abrir WhatsApp
              </a>
            ) : null}
          </p>
        ) : null}

        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="dark" />
        ) : null}

        <button disabled={state === "submitting"} className="cta-premium-submit" type="submit">
          {state === "submitting" ? "Enviando solicitud..." : "Solicitar evaluación confidencial"}
          {state === "submitting" ? <Loader size={16} /> : <ArrowRight size={16} />}
        </button>

        {/* Los avisos legales van después de la decisión, no antes. */}
        <div className="grid gap-3 border-t border-[#ecc058]/20 pt-5 text-[0.8125rem] leading-6 text-[#9d958a] sm:grid-cols-2">
          <p className="flex items-center gap-3">
            <LockKeyhole size={15} className="shrink-0 text-[#ecc058]" /> Transmisión cifrada
          </p>
          <p className="flex items-center gap-3">
            <ShieldCheck size={15} className="shrink-0 text-[#ecc058]" /> Secreto profesional estricto
          </p>
          <p className="flex items-center gap-3 sm:col-span-2">
            <CheckCircle2 size={15} className="shrink-0 text-[#ecc058]" /> Respuesta el mismo día hábil
          </p>
          <p className="flex items-start gap-3 sm:col-span-2">
            <ShieldAlert size={15} className="mt-1 shrink-0 text-[#ecc058]/70" />
            No adjunte documentos en esta etapa. El envío no crea una relación abogado-cliente.
          </p>
        </div>
      </form>
    </>
  );
}
