"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, ShieldAlert, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { intakeStages, intakeUrgencies } from "@/lib/intake";

const fieldClass = "luxury-field-input";
const labelClass = "luxury-field-label";

export function IntakeForm() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    trackEvent("evaluation_form_submit");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...payload,
        consent: form.get("consent") === "on",
        turnstileToken: form.get("cf-turnstile-response") ?? undefined,
      }),
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "No fue posible enviar la solicitud.");
      setState("error");
      return;
    }

    router.push("/gracias");
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      ) : null}
      <form
        onFocusCapture={() => trackEvent("evaluation_form_start")}
        onSubmit={handleSubmit}
        className="grid gap-6"
      >
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Nombre completo
          <input className={fieldClass} name="name" required autoComplete="name" placeholder="Ej: Dr./Ab./Sr. Juan Pérez" />
        </label>
        <label className={labelClass}>
          Teléfono / WhatsApp
          <input className={fieldClass} name="phone" required autoComplete="tel" placeholder="+593 ..." />
        </label>
        <label className={labelClass}>
          Correo electrónico
          <input className={fieldClass} name="email" type="email" required autoComplete="email" placeholder="correo@ejemplo.com" />
        </label>
        <label className={labelClass}>
          Tipo de asunto
          <input className={fieldClass} name="matterType" required placeholder="Penal, económico, constitucional..." />
        </label>
        <label className={labelClass}>
          Etapa procesal
          <select className={fieldClass} name="stage" required defaultValue="">
            <option value="" disabled>Seleccione una etapa</option>
            {intakeStages.map((stage) => <option key={stage}>{stage}</option>)}
          </select>
        </label>
        <label className={labelClass}>
          Nivel de urgencia
          <select className={fieldClass} name="urgency" required defaultValue="">
            <option value="" disabled>Seleccione la urgencia</option>
            {intakeUrgencies.map((urgency) => <option key={urgency}>{urgency}</option>)}
          </select>
        </label>
        <label className={labelClass}>
          Jurisdicción
          <input className={fieldClass} name="jurisdiction" required placeholder="Ciudad y país" />
        </label>
        <label className={labelClass}>
          Partes para verificar conflicto
          <input className={fieldClass} name="conflictParties" required placeholder="Nombres o entidades involucradas" />
        </label>
        
        {/* Opción de agendar una llamada privada */}
        <label className={`${labelClass} md:col-span-2`}>
          Preferencia de contacto / Agendar llamada privada
          <select className={fieldClass} name="preferredContact" required defaultValue="">
            <option value="" disabled>Seleccione su canal preferido</option>
            <option value="llamada-privada">Agendar llamada telefónica privada de evaluación (Dr. Fausto Vásquez)</option>
            <option value="whatsapp-cifrado">Comunicación vía WhatsApp cifrado de extremo a extremo</option>
            <option value="reunion-oficina">Reunión física confidencial (Torre 1492, Quito)</option>
          </select>
        </label>
      </div>

      <div className="border-y border-[#c9ad78]/25 py-5 text-xs leading-6 text-[#a9a196]">
        <p className="flex items-start gap-3">
          <ShieldAlert className="mt-1 shrink-0 text-[#c9ad78]" size={17} />
          No incluya hechos especialmente sensibles ni adjunte documentos en esta etapa. El envío no crea una relación abogado-cliente.
        </p>
        <label className="mt-4 flex cursor-pointer items-start gap-3 select-none">
          <input className="mt-1 accent-[#c9ad78]" type="checkbox" name="consent" required />
          <span>Confirmo que comprendo el proceso de admisión selectiva y autorizo el tratamiento inicial de estos datos.</span>
        </label>
      </div>

      {state === "error" ? (
        <p role="alert" className="text-sm text-[#d6a98f]">{error}</p>
      ) : null}

      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          data-theme="dark"
        />
      ) : null}

      <button
        disabled={state === "submitting"}
        className="cta-premium-submit"
        type="submit"
      >
        {state === "submitting" ? "Enviando solicitud..." : "Solicitar evaluación confidencial"}
        {state === "submitting" ? <LockKeyhole size={16} /> : <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />}
      </button>

      <div className="grid gap-3 border-t border-[#c9ad78]/20 pt-5 text-[0.64rem] uppercase leading-5 tracking-[0.13em] text-[#9d958a] sm:grid-cols-2">
        <p className="flex items-center gap-3">
          <LockKeyhole size={15} className="shrink-0 text-[#c9ad78]" />
          Transmisión cifrada
        </p>
        <p className="flex items-center gap-3">
          <ShieldCheck size={15} className="shrink-0 text-[#c9ad78]" />
          Amparado bajo secreto profesional estricto
        </p>
        <p className="flex items-center gap-3 sm:col-span-2">
          <CheckCircle2 size={15} className="shrink-0 text-[#c9ad78]" />
          Revisión inicial por el equipo jurídico
        </p>
      </div>
      </form>
    </>
  );
}
