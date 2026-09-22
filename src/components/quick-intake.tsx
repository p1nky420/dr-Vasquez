"use client";

import { ArrowRight, CheckCircle2, Loader, LockKeyhole, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { trackEvent, trackOnce } from "@/lib/analytics";
import { whatsappHref } from "@/lib/site";

/**
 * Low-friction capture placed high on the page: two required fields and one
 * optional line. Everything else is asked on the call.
 *
 * Confirms in place rather than redirecting — the visitor sees the result
 * without losing their position on the page.
 */
export function QuickIntake({ source = "home-quick" }: { source?: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    setFallbackUrl(null);
    trackEvent("quick_lead_attempt", { source });

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          message: form.get("message"),
          source,
          consent: form.get("consent") === "on",
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string; fallbackUrl?: string };
        setError(result.error ?? "No fue posible enviar la solicitud.");
        setFallbackUrl(result.fallbackUrl ?? null);
        setState("error");
        trackEvent("quick_lead_error", { source, status: response.status });
        return;
      }

      trackEvent("quick_lead_submitted", { source });
      setState("done");
    } catch {
      setError("No hay conexión en este momento.");
      setFallbackUrl(whatsappHref("Hola, deseo solicitar una evaluación de mi caso."));
      setState("error");
      trackEvent("quick_lead_error", { source, status: 0 });
    }
  }

  if (state === "done") {
    return (
      <div className="quick-intake quick-intake--done" role="status">
        <CheckCircle2 className="shrink-0 text-[#ecc058]" size={30} strokeWidth={1.4} />
        <div>
          <p className="font-serif text-2xl leading-tight text-[#f3eee4]">
            Solicitud recibida.
          </p>
          <p className="mt-2 text-[0.95rem] leading-[1.7] text-[#c2baae]">
            El Dr. Vásquez o su equipo le contactarán al número indicado. Si su
            situación es urgente, escríbanos ahora y priorizamos su caso.
          </p>
          <a
            className="quick-intake__whatsapp"
            href={whatsappHref(
              "Hola, acabo de enviar una solicitud de evaluación desde la web y mi caso es urgente.",
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> Escribir por WhatsApp ahora
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="quick-intake"
      onSubmit={handleSubmit}
      onFocusCapture={() => trackOnce("quick_lead_start", { source })}
    >
      <div className="quick-intake__fields">
        <label className="quick-intake__label">
          Nombre
          <input
            className="quick-intake__input"
            name="name"
            required
            autoComplete="name"
            placeholder="Su nombre"
          />
        </label>
        <label className="quick-intake__label">
          Teléfono / WhatsApp
          <input
            className="quick-intake__input"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+593 ..."
          />
        </label>
        <label className="quick-intake__label quick-intake__label--wide">
          ¿Qué ocurrió? <span className="quick-intake__optional">Opcional</span>
          <input
            className="quick-intake__input"
            name="message"
            placeholder="Ej: recibí una notificación de Fiscalía / tengo audiencia el lunes"
          />
        </label>
      </div>

      <button className="quick-intake__submit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? (
          <>
            Enviando… <Loader size={16} />
          </>
        ) : (
          <>
            Solicitar evaluación <ArrowRight size={16} />
          </>
        )}
      </button>

      <label className="quick-intake__consent">
        <input type="checkbox" name="consent" required />
        <span>
          Autorizo el tratamiento de estos datos para evaluar mi consulta. Sin costo
          y sin compromiso: el envío no crea una relación abogado-cliente.
        </span>
      </label>

      {state === "error" ? (
        <p role="alert" className="quick-intake__error">
          {error}{" "}
          {fallbackUrl ? (
            <a href={fallbackUrl} target="_blank" rel="noreferrer">
              Abrir WhatsApp
            </a>
          ) : null}
        </p>
      ) : null}

      <p className="quick-intake__seal">
        <LockKeyhole size={13} /> Confidencial y amparado por secreto profesional ·
        Respuesta el mismo día hábil
      </p>
    </form>
  );
}
