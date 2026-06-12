"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldAlert, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { intakeStages, intakeUrgencies } from "@/lib/intake";

type VaultData = {
  stage: string;
  urgency: string;
  matterType: string;
  jurisdiction: string;
  conflictParties: string;
  name: string;
  phone: string;
  email: string;
};

const initialData: VaultData = {
  stage: "",
  urgency: "",
  matterType: "",
  jurisdiction: "",
  conflictParties: "",
  name: "",
  phone: "",
  email: "",
};

const textSteps: Array<{
  field: keyof VaultData;
  eyebrow: string;
  question: string;
  placeholder: string;
  type?: "email" | "tel";
}> = [
  {
    field: "matterType",
    eyebrow: "Naturaleza del asunto",
    question: "¿Qué tipo de contingencia requiere evaluación?",
    placeholder: "Penal económico, investigación activa, recurso...",
  },
  {
    field: "jurisdiction",
    eyebrow: "Jurisdicción",
    question: "¿Dónde se encuentra actualmente el asunto?",
    placeholder: "Quito, Guayaquil u otra jurisdicción",
  },
  {
    field: "conflictParties",
    eyebrow: "Control de conflicto",
    question: "¿Qué personas o entidades deben verificarse?",
    placeholder: "Indique nombres o escriba “No aplica”",
  },
  {
    field: "name",
    eyebrow: "Identificación",
    question: "¿A nombre de quién debemos registrar la solicitud?",
    placeholder: "Nombre completo",
  },
  {
    field: "phone",
    eyebrow: "Canal directo",
    question: "¿A qué teléfono podemos contactarle?",
    placeholder: "+593...",
    type: "tel",
  },
  {
    field: "email",
    eyebrow: "Confirmación",
    question: "¿Qué correo debemos utilizar para la respuesta inicial?",
    placeholder: "correo@empresa.com",
    type: "email",
  },
];

export function EvaluationVault() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const closeButton = useRef<HTMLButtonElement>(null);
  const turnstileTarget = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<VaultData>(initialData);
  const [consent, setConsent] = useState(false);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const finalStep = 8;

  useEffect(() => {
    function handleTrigger(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLAnchorElement>('a[href="#admision"], [data-evaluation-trigger]');
      if (!trigger) {
        return;
      }

      event.preventDefault();
      setOpen(true);
      trackEvent("evaluation_form_start", { location: "vault" });
    }

    document.addEventListener("click", handleTrigger);
    return () => document.removeEventListener("click", handleTrigger);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("vault-open");
      return;
    }

    document.body.classList.add("vault-open");
    closeButton.current?.focus();

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.classList.remove("vault-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!open || step !== finalStep || !turnstileReady || !turnstileTarget.current || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      return;
    }

    const turnstile = (
      window as Window & {
        turnstile?: {
          render: (
            target: HTMLElement,
            options: { sitekey: string; theme: string; callback: (token: string) => void },
          ) => string;
        };
      }
    ).turnstile;

    if (!turnstile || turnstileTarget.current.childElementCount > 0) {
      return;
    }

    turnstile.render(turnstileTarget.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      theme: "dark",
      callback: setTurnstileToken,
    });
  }, [finalStep, open, step, turnstileReady]);

  function update(field: keyof VaultData, value: string) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function canContinue() {
    if (step === 0) return data.stage.length > 1;
    if (step === 1) return data.urgency.length > 1;
    if (step >= 2 && step <= 7) {
      const field = textSteps[step - 2].field;
      const value = data[field].trim();
      if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return value.length > 1;
    }
    return consent;
  }

  function advance() {
    if (canContinue()) {
      setStep((current) => Math.min(current + 1, finalStep));
    }
  }

  function choose(field: "stage" | "urgency", value: string) {
    update(field, value);
    window.setTimeout(() => setStep((current) => Math.min(current + 1, finalStep)), 180);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;

    setState("submitting");
    setError("");
    trackEvent("evaluation_form_submit", { location: "vault" });

    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...data,
        consent,
        turnstileToken: turnstileToken || undefined,
      }),
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "No fue posible enviar la solicitud.");
      setState("error");
      return;
    }

    setOpen(false);
    router.push("/gracias");
  }

  const progress = ((step + 1) / (finalStep + 1)) * 100;
  const textStep = step >= 2 && step <= 7 ? textSteps[step - 2] : null;

  return (
    <>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => setTurnstileReady(true)}
        />
      ) : null}
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Evaluación confidencial"
            className="fixed inset-0 z-[120] overflow-y-auto bg-[#070706]/92 text-[#f4efe5] backdrop-blur-3xl"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="fixed inset-x-0 top-0 z-10 h-px bg-[#c7a86a]/30">
              <motion.div className="h-full bg-[#c7a86a]" animate={{ width: `${progress}%` }} />
            </div>
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(154,79,18,0.2),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(197,160,89,0.07),transparent_30%)]" />
            <button
              ref={closeButton}
              type="button"
              aria-label="Cerrar evaluación"
              onClick={() => setOpen(false)}
              className="fixed right-5 top-5 z-20 grid size-12 place-items-center border border-white/15 bg-black/25 text-[#c7a86a] transition-colors hover:border-[#c7a86a] hover:bg-[#c7a86a] hover:text-[#11100e] md:right-8 md:top-8"
            >
              <X size={19} />
            </button>

            <form onSubmit={submit} className="relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-5 py-24 md:px-10">
              <div className="mb-10 flex items-center justify-between gap-5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c7a86a]">
                  Bóveda de admisión · Paso {String(step + 1).padStart(2, "0")}
                </p>
                <LockKeyhole size={17} className="text-[#c7a86a]" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -25 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[24rem]"
                >
                  {step === 0 ? (
                    <VaultOptions
                      eyebrow="Etapa procesal"
                      question="¿En qué fase procesal se encuentra la contingencia?"
                      options={intakeStages}
                      value={data.stage}
                      onChoose={(value) => choose("stage", value)}
                    />
                  ) : null}
                  {step === 1 ? (
                    <VaultOptions
                      eyebrow="Nivel de urgencia"
                      question="¿Qué tan inmediata es la intervención requerida?"
                      options={intakeUrgencies}
                      value={data.urgency}
                      onChoose={(value) => choose("urgency", value)}
                    />
                  ) : null}
                  {textStep ? (
                    <div>
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c7a86a]">{textStep.eyebrow}</p>
                      <label className="mt-6 block">
                        <span className="block max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-0.035em] md:text-6xl">{textStep.question}</span>
                        <input
                          autoFocus
                          type={textStep.type ?? "text"}
                          value={data[textStep.field]}
                          onChange={(event) => update(textStep.field, event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              advance();
                            }
                          }}
                          placeholder={textStep.placeholder}
                          className="mt-14 min-h-16 w-full border-b border-white/20 bg-transparent py-4 text-xl text-[#f4efe5] outline-none transition-colors placeholder:text-[#8f887d] focus:border-[#c7a86a] md:text-2xl"
                        />
                      </label>
                    </div>
                  ) : null}
                  {step === finalStep ? (
                    <div>
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c7a86a]">Revisión final</p>
                      <h2 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-0.035em] md:text-6xl">
                        Su solicitud será revisada bajo confidencialidad estricta.
                      </h2>
                      <div className="mt-10 border-y border-white/10 py-6 text-sm leading-7 text-[#aaa298]">
                        <p className="flex items-start gap-3">
                          <ShieldAlert className="mt-1 shrink-0 text-[#c7a86a]" size={17} />
                          No incluya hechos sensibles ni documentos. El envío no crea una relación abogado-cliente.
                        </p>
                        <label className="mt-5 flex cursor-pointer items-start gap-3 text-[#d4ccc0]">
                          <input checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-[#c7a86a]" type="checkbox" />
                          Confirmo que comprendo el proceso de admisión selectiva y autorizo el tratamiento inicial de estos datos.
                        </label>
                      </div>
                      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <div ref={turnstileTarget} className="mt-6" /> : null}
                      {state === "error" ? <p role="alert" className="mt-5 text-sm text-[#d6a98f]">{error}</p> : null}
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((current) => Math.max(0, current - 1))}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#aaa298] transition-colors hover:text-[#f4efe5] disabled:invisible sm:w-auto sm:justify-start"
                >
                  <ArrowLeft size={14} /> Anterior
                </button>
                {step < finalStep ? (
                  <button
                    type="button"
                    disabled={!canContinue()}
                    onClick={advance}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-3 border border-[#9a6b3d] bg-[#9a6b3d] px-6 text-center text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#b08b4f] disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto"
                  >
                    Continuar <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!consent || state === "submitting"}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-3 border border-[#9a6b3d] bg-gradient-to-r from-[#9a4f12] to-[#b08b4f] px-5 text-center text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto sm:px-6 sm:text-[0.62rem] sm:tracking-[0.18em]"
                  >
                    {state === "submitting" ? "Enviando..." : "Solicitar evaluación confidencial"} <LockKeyhole size={14} />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function VaultOptions({
  eyebrow,
  question,
  options,
  value,
  onChoose,
}: {
  eyebrow: string;
  question: string;
  options: readonly string[];
  value: string;
  onChoose: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c7a86a]">{eyebrow}</p>
      <h2 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-0.035em] md:text-6xl">{question}</h2>
      <div className="mt-10 grid gap-2 md:grid-cols-2">
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => onChoose(option)}
            className={`group flex min-h-20 items-center gap-4 border p-5 text-left text-sm leading-6 transition-all ${
              value === option
                ? "border-[#c7a86a] bg-[#c7a86a]/10 text-[#f4efe5]"
                : "border-white/10 bg-white/[0.025] text-[#aaa298] hover:border-[#c7a86a]/55 hover:bg-white/[0.05] hover:text-[#f4efe5]"
            }`}
          >
            <span className="font-serif text-2xl text-[#c7a86a]">{String(index + 1).padStart(2, "0")}</span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
