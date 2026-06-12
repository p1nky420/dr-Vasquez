"use client";

import { ArrowRight, CheckCircle2, LockKeyhole, ShieldAlert, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { intakeStages, intakeUrgencies } from "@/lib/intake";

const fieldClass =
  "min-h-12 w-full rounded-none border border-white/10 bg-white/[0.045] px-4 py-3 text-base text-[#f4efe5] outline-none [color-scheme:dark] transition-all duration-300 placeholder:text-[#8f887d] hover:border-white/20 hover:bg-white/[0.06] focus:border-[#C5A059] focus:bg-white/[0.07] focus:ring-1 focus:ring-[#C5A059] md:text-sm";

const labelClass =
  "grid gap-2 text-[0.68rem] font-medium uppercase tracking-widest text-gray-300";

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
          <input className={fieldClass} name="name" required autoComplete="name" />
        </label>
        <label className={labelClass}>
          Teléfono / WhatsApp
          <input className={fieldClass} name="phone" required autoComplete="tel" />
        </label>
        <label className={labelClass}>
          Correo electrónico
          <input className={fieldClass} name="email" type="email" required autoComplete="email" />
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
      </div>

      <div className="border-y border-[#9a835b]/25 py-5 text-xs leading-6 text-[#a9a196]">
        <p className="flex items-start gap-3">
          <ShieldAlert className="mt-1 shrink-0 text-[#c7a86a]" size={17} />
          No incluya hechos especialmente sensibles ni adjunte documentos en esta etapa. El envío no crea una relación abogado-cliente.
        </p>
        <label className="mt-4 flex cursor-pointer items-start gap-3">
          <input className="mt-1 accent-[#c7a86a]" type="checkbox" name="consent" required />
          Confirmo que comprendo el proceso de admisión selectiva y autorizo el tratamiento inicial de estos datos.
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
        className="group inline-flex min-h-14 touch-manipulation items-center justify-center gap-3 border border-[#7f552f] bg-gradient-to-r from-[#9a4f12] to-[#b08b4f] px-5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-60 sm:px-7 sm:text-xs sm:tracking-[0.18em]"
        type="submit"
      >
        {state === "submitting" ? "Enviando solicitud..." : "Solicitar evaluación confidencial"}
        {state === "submitting" ? <LockKeyhole size={16} /> : <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />}
      </button>

      <div className="grid gap-3 border-t border-[#9a835b]/20 pt-5 text-[0.64rem] uppercase leading-5 tracking-[0.13em] text-[#9d958a] sm:grid-cols-2">
        <p className="flex items-center gap-3">
          <LockKeyhole size={15} className="shrink-0 text-[#c7a86a]" />
          Transmisión cifrada
        </p>
        <p className="flex items-center gap-3">
          <ShieldCheck size={15} className="shrink-0 text-[#c7a86a]" />
          Amparado bajo secreto profesional estricto
        </p>
        <p className="flex items-center gap-3 sm:col-span-2">
          <CheckCircle2 size={15} className="shrink-0 text-[#c7a86a]" />
          Revisión inicial por el equipo jurídico
        </p>
      </div>
      </form>
    </>
  );
}
