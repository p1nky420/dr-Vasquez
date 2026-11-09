"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { academyPrivacy } from "@/lib/academia-interest";
import { trackAcademyEvent } from "./metrics";

type Option = { slug: string; code: string; label: string };
type Challenge = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};

export function AcademyInterestForm({ options, selected, whatsapp, siteKey }: {
  options: Option[];
  selected?: string;
  whatsapp: Record<string, string>;
  siteKey?: string;
}) {
  const [program, setProgram] = useState(selected ?? "general");
  const [channel, setChannel] = useState("whatsapp");
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const target = useRef<HTMLDivElement>(null);
  const challenge = useRef<{ api: Challenge; id: string } | null>(null);

  const submitted = status === "success";

  useEffect(() => {
    const api = (window as Window & { turnstile?: Challenge }).turnstile;
    if (!siteKey || !ready || !api || !target.current || submitted) return;
    const id = api.render(target.current, {
      sitekey: siteKey, action: "academia_interes", size: "flexible", theme: "light",
      callback: setToken, "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
    challenge.current = { api, id };
    return () => { api.remove(id); challenge.current = null; };
  }, [ready, siteKey, submitted]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || status !== "idle") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");

    const fallback = "No pudimos registrar su interés. Puede continuar por WhatsApp.";
    try {
      const response = await fetch("/api/academia/interes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), contact: data.get("contact"), channel,
          program, consent: data.get("consent") === "on", token,
        }),
      }).catch(() => null);
      if (!response) throw new Error(fallback);
      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(result?.error ?? fallback);
      }
      setStatus("success");
      if (response.status === 201) trackAcademyEvent("lista_interes_enviada", options.find((option) => option.slug === program)?.code);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : fallback);
      setToken("");
      setStatus("idle");
      if (challenge.current) challenge.current.api.reset(challenge.current.id);
    }
  }

  const programPicker = (
    <label>
      Programa de interés
      <select name="program" value={program} onChange={(event) => setProgram(event.target.value)}>
        <option value="general">Quiero conocer las próximas convocatorias</option>
        {options.map((option) => <option key={option.slug} value={option.slug}>{option.label}</option>)}
      </select>
    </label>
  );
  const whatsappLink = (
    <a className="ed-text-link" href={whatsapp[program]} target="_blank" rel="noreferrer"
      onClick={() => trackAcademyEvent("academia_whatsapp_clic", options.find((option) => option.slug === program)?.code)}>
      Solicitar aviso por WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );

  if (status === "success") return <p className="academy-interest__confirmation" role="status">Recibimos su solicitud. Le avisaremos por el canal que eligió.</p>;

  if (!siteKey) return <div className="academy-interest__fields">{programPicker}{whatsappLink}</div>;

  return (
    <form className="academy-interest__fields" onSubmit={submit} aria-label="Lista de interés" aria-busy={status === "sending"}>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} />
      {programPicker}
      <label>Nombre <input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
      <label>¿Cómo prefiere recibir el aviso?
        <select value={channel} onChange={(event) => setChannel(event.target.value)}>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Correo electrónico</option>
        </select>
      </label>
      <label>{channel === "email" ? "Correo electrónico" : "Número de WhatsApp"}
        <input key={channel} name="contact" type={channel === "email" ? "email" : "tel"} autoComplete={channel === "email" ? "email" : "tel"} maxLength={254} required />
      </label>
      <label className="academy-consent"><input type="checkbox" name="consent" required /><span>{academyPrivacy.label} <Link href="/privacidad#privacidad-academia">Política de privacidad</Link>.</span></label>
      <div ref={target} className="academy-challenge" />
      <button className="academy-submit" disabled={!token || status === "sending"}>{status === "sending" ? "Registrando…" : "Registrar mi interés"}</button>
      {error && <p role="alert">{error}</p>}
      {whatsappLink}
    </form>
  );
}
