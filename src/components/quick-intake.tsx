"use client";

import { ArrowRight, CheckCircle2, Loader, LockKeyhole, MessageCircle } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackEvent, trackOnce } from "@/lib/analytics";
import { whatsappHref } from "@/lib/site";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
type TurnstileWindow = Window & { turnstile?: {
  render: (target: HTMLElement, options: { sitekey: string; theme: string; size: string }) => string;
  reset: (widget: string) => void;
  remove: (widget: string) => void;
} };

/**
 * Low-friction capture placed high on the page: two required fields and one
 * optional line. Everything else is asked on the call.
 *
 * Confirms in place rather than redirecting — the visitor sees the result
 * without losing their position on the page.
 */
export function QuickIntake({ source = "home-quick", deliveryConfirmed = false }: { source?: string; deliveryConfirmed?: boolean }) {
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error" | "whatsapp">("idle");
  const [draft, setDraft] = useState({ name: "", phone: "", message: "", consent: false });
  const [error, setError] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [challengeReady, setChallengeReady] = useState(false);
  const challenge = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  const [deliveryAvailable, setDeliveryAvailable] = useState<boolean | null>(deliveryConfirmed ? true : null);
  useEffect(() => {
    if (deliveryConfirmed) return;
    const controller = new AbortController();
    fetch("/api/intake", { signal: controller.signal, cache: "no-store" })
      .then(response => response.ok ? response.json() : null)
      .then(result => { if (typeof result?.deliveryAvailable === "boolean") setDeliveryAvailable(result.deliveryAvailable); })
      .catch(() => {});
    return () => controller.abort();
  }, [deliveryConfirmed]);

  const showChallenge = Boolean(turnstileSiteKey && deliveryAvailable !== false && state !== "whatsapp" && state !== "done");
  useEffect(() => {
    const turnstile = (window as TurnstileWindow).turnstile;
    if (!turnstile || !challenge.current || !turnstileSiteKey || !showChallenge || !challengeReady) return;
    const id = turnstile.render(challenge.current, { sitekey: turnstileSiteKey, theme: "dark", size: "compact" });
    widget.current = id;
    return () => { turnstile.remove(id); widget.current = null; };
  }, [challengeReady, showChallenge]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    setFallbackUrl(null);
    trackEvent("quick_lead_attempt", { source });

    const form = new FormData(event.currentTarget);
    setDraft({ name: String(form.get("name") ?? ""), phone: String(form.get("phone") ?? ""), message: String(form.get("message") ?? ""), consent: form.get("consent") === "on" });

    const whatsappDraft = whatsappHref(`Hola, soy ${String(form.get("name") ?? "").trim()}. Deseo coordinar una evaluación privada. Mi teléfono de contacto es ${String(form.get("phone") ?? "").trim()}.`);
    if (deliveryAvailable === false) {
      setFallbackUrl(whatsappDraft);
      setState("whatsapp");
      trackEvent("whatsapp_draft_ready", { source });
      return;
    }
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
          turnstileToken: form.get("cf-turnstile-response") ?? undefined,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string; fallbackUrl?: string };
        setError(result.error ?? "No fue posible enviar la solicitud.");
        setFallbackUrl(result.fallbackUrl || response.status === 403 ? whatsappDraft : null);
        setState("error");
        trackEvent("quick_lead_error", { source, status: response.status });
        return;
      }

      trackEvent("quick_lead_submitted", { source });
      setState("done");
    } catch {
      setError("No hay conexión en este momento.");
      setFallbackUrl(whatsappDraft);
      setState("error");
      trackEvent("quick_lead_error", { source, status: 0 });
    } finally {
      if (widget.current !== null) (window as TurnstileWindow).turnstile?.reset(widget.current);
    }
  }

  if (state === "whatsapp") {
    return <div className="quick-intake" role="status"><MessageCircle size={28} className="text-[#c9a96a]" /><p className="mt-4 font-serif text-2xl text-[#f3eee4]">Continúe en una conversación privada.</p><p className="mt-4 text-sm leading-7 text-[#c2baae]">Su solicitud aún no se ha enviado. Abriremos WhatsApp con sus datos de contacto; podrá revisar el mensaje antes de enviarlo.</p><a href={fallbackUrl ?? whatsappHref("Hola, deseo coordinar una evaluación privada.")} target="_blank" rel="noreferrer" className="quick-intake__whatsapp" onClick={() => trackEvent("whatsapp_click", { source })}>Abrir WhatsApp <ArrowRight size={16} /></a><button type="button" className="mt-5 block text-sm text-[#c9a96a] underline underline-offset-4" onClick={() => setState("idle")}>Volver al formulario</button></div>;
  }

  if (state === "done") {
    return (
      <div className="quick-intake quick-intake--done" role="status">
        <CheckCircle2 className="shrink-0 text-[#c9a96a]" size={30} strokeWidth={1.4} />
        <div>
          <p className="font-serif text-2xl leading-tight text-[#f3eee4]">
            Solicitud recibida.
          </p>
          <p className="mt-2 text-[0.95rem] leading-[1.7] text-[#c2baae]">
            El Dr. Fausto Vásquez Cevallos o su equipo le contactarán al número indicado. Puede también escribirnos por WhatsApp para coordinar la atención.
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
            defaultValue={draft.name}
            maxLength={120}
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
            defaultValue={draft.phone}
            maxLength={40}
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+593 ..."
          />
        </label>
        <label className="quick-intake__label quick-intake__label--wide">
          Motivo de contacto <span className="quick-intake__optional">Opcional</span>
          <select className="quick-intake__input" name="message" defaultValue={draft.message}>
            <option value="">Conversarlo en privado</option>
            <option>Administración pública</option><option>Derecho penal económico</option>
            <option>Garantías y recursos</option><option>Segunda opinión</option><option>Otro asunto penal</option>
          </select>
        </label>
      </div>

      <label className="quick-intake__consent">
        <input type="checkbox" name="consent" defaultChecked={draft.consent} required />
        <span>
          Autorizo el tratamiento de estos datos para evaluar mi consulta. Sin
          compromiso: el envío no crea una relación abogado-cliente.
        </span>
      </label>

      {showChallenge && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setChallengeReady(true)} />
          <div ref={challenge} />
        </>
      )}
      <button className="quick-intake__submit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? (
          <>
            Enviando… <Loader size={16} />
          </>
        ) : (
          <>
            {deliveryAvailable === false ? "Continuar por WhatsApp" : "Solicitar evaluación"} <ArrowRight size={16} />
          </>
        )}
      </button>


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

      {deliveryAvailable === false && <p className="mt-4 text-xs leading-6 text-[#c2baae]">Continuará en WhatsApp. Podrá revisar el mensaje antes de enviarlo.</p>}
      <p className="quick-intake__seal">
        <LockKeyhole size={13} /> Confidencial y amparado por secreto profesional ·
        Atención con cita previa
      </p>
    </form>
  );
}
