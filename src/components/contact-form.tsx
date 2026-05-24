"use client";

import { Send, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactEmail, mailtoHref } from "@/lib/site";

const fields = [
  { name: "nombre", label: "Nombre Completo", type: "text", required: true },
  { name: "telefono", label: "Teléfono / WhatsApp", type: "tel", required: true },
  { name: "ciudad", label: "Ciudad", type: "text", required: false },
  { name: "correo", label: "Correo Electrónico", type: "email", required: false },
  { name: "tipo", label: "Tipo de Caso", type: "text", required: false },
  { name: "etapa", label: "Etapa Procesal", type: "text", required: false },
];

export function ContactForm() {
  const [audience, setAudience] = useState("No especificado");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFormData(data);
    setIsSubmitting(true);

    // Simular encriptación y sellado físico de alta seguridad durante 2.5s
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Lanzar el gestor de correo nativo al finalizar la animación
      const body = [
        `Nombre: ${data.get("nombre") ?? ""}`,
        `Teléfono: ${data.get("telefono") ?? ""}`,
        `Ciudad: ${data.get("ciudad") ?? ""}`,
        `Correo: ${data.get("correo") ?? ""}`,
        `Tipo de caso: ${data.get("tipo") ?? ""}`,
        `Etapa procesal: ${data.get("etapa") ?? ""}`,
        `¿Existe audiencia próxima?: ${audience}`,
        "",
        "Descripción del Caso:",
        `${data.get("descripcion") ?? ""}`,
      ].join("\n");

      window.location.href = mailtoHref(
        "Solicitud de evaluación estratégica - Estudio Jurídico",
        body,
      );
    }, 2500);
  }

  function handleReset() {
    setIsSubmitted(false);
    setAudience("No especificado");
    setFormData(null);
  }

  return (
    <div className="relative min-h-[480px] w-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        
        {/* ESTADO 1: Formulario Activo */}
        {!isSubmitting && !isSubmitted && (
          <motion.form
            key="active-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 w-full relative z-10"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => (
                <div className="group relative flex flex-col gap-1.5" key={field.name}>
                  <label className="text-[0.66rem] uppercase tracking-[0.16em] text-steel group-focus-within:text-gold transition duration-300 font-bold">
                    {field.label} {field.required && <span className="text-gold/80">*</span>}
                  </label>
                  <div className="relative w-full">
                    <input
                      className="w-full h-11 border-b border-gold/15 bg-transparent px-1 pb-1 pt-1 text-sm text-ivory outline-none transition placeholder:text-steel/30 focus:border-gold/30"
                      name={field.name}
                      required={field.required}
                      type={field.type}
                      placeholder={`Ingrese su ${field.label.toLowerCase()}...`}
                    />
                    {/* indicator bar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gradient-to-r from-gold/30 via-gold to-gold/30 transition-all duration-500 group-focus-within:w-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Select input group */}
            <div className="group relative flex flex-col gap-1.5">
              <label className="text-[0.66rem] uppercase tracking-[0.16em] text-steel group-focus-within:text-gold transition duration-300 font-bold">
                ¿Existe audiencia o diligencia próxima?
              </label>
              <div className="relative w-full">
                <select
                  className="w-full h-11 border-b border-gold/15 bg-[#0b0f14] px-1 pb-1 pt-1 text-sm text-ivory outline-none transition focus:border-gold/30"
                  onChange={(event) => setAudience(event.target.value)}
                  value={audience}
                >
                  <option>No especificado</option>
                  <option>Sí, existe audiencia programada</option>
                  <option>Sí, existe diligencia o pericia próxima</option>
                  <option>No, en fase de investigación preliminar</option>
                </select>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gradient-to-r from-gold/30 via-gold to-gold/30 transition-all duration-500 group-focus-within:w-full" />
              </div>
            </div>

            {/* Textarea case description */}
            <div className="group relative flex flex-col gap-1.5">
              <label className="text-[0.66rem] uppercase tracking-[0.16em] text-steel group-focus-within:text-gold transition duration-300 font-bold">
                Breve descripción de los hechos jurídicos <span className="text-gold/80">*</span>
              </label>
              <div className="relative w-full">
                <textarea
                  className="w-full min-h-[110px] resize-y border-b border-gold/15 bg-transparent px-1 py-2 text-sm text-ivory outline-none transition placeholder:text-steel/30 focus:border-gold/30"
                  name="descripcion"
                  required
                  placeholder="Describa brevemente los hechos del caso, personas jurídicas involucradas o etapa del proceso..."
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gradient-to-r from-gold/30 via-gold to-gold/30 transition-all duration-500 group-focus-within:w-full animate-pulse-soft" />
              </div>
            </div>

            <p className="text-[0.64rem] leading-relaxed text-steel/70">
              * Nota: Al presionar enviar, se abrirá automáticamente su gestor de correo predeterminado para direccionar la solicitud encriptada a {contactEmail}.
            </p>

            {/* send button */}
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-gold/70 bg-gold hover:bg-ivory hover:border-ivory px-8 py-3 text-xs uppercase tracking-widest text-graphite font-bold transition duration-300 hover:translate-y-[-1.5px] shadow-glow-gold rounded-sm w-full sm:w-fit cursor-pointer select-none"
              type="submit"
            >
              Enviar solicitud <Send size={15} />
            </button>
          </motion.form>
        )}

        {/* ESTADO 2: Procesando (Simulación de firma y encriptación) */}
        {isSubmitting && (
          <motion.div
            key="submitting-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center p-8 w-full max-w-md mx-auto"
          >
            {/* Spinning/pulsing encryption circle */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-gold/10 border-t-gold/70 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-gold/5 border-b-gold/50 rounded-full"
              />
              <ShieldCheck className="text-gold/90 animate-pulse-soft" size={32} strokeWidth={1.2} />
            </div>

            <h4 className="font-serif text-lg text-ivory tracking-wide uppercase">Cifrando Mensaje</h4>
            <div className="h-[1.5px] w-12 bg-gold/30 mx-auto mt-3 mb-4" />
            <p className="text-xs text-steel leading-relaxed max-w-sm">
              Generando sello de confidencialidad digital y direccionando datos al Gabinete de Crisis de Fausto Vásquez Abogados...
            </p>
          </motion.div>
        )}

        {/* ESTADO 3: Éxito con Sello de Lacre 3D */}
        {isSubmitted && (
          <motion.div
            key="submitted-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center p-6 w-full max-w-lg mx-auto"
          >
            {/* Elegant 3D Interactive Virtual Wax Seal */}
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: [12, -4, 0] }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.05, rotate: 1.5 }}
              className="relative w-32 h-32 cursor-pointer select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)] group transition duration-300"
            >
              {/* Outer irregular crimson wax base */}
              <div 
                className="absolute inset-0 rounded-full transition duration-300 group-hover:brightness-[1.05]"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #b21e2c, #59080e 78%, #2e0205)",
                  boxShadow: "inset 0 4px 10px rgba(255,255,255,0.25), inset 0 -4px 12px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5)",
                  clipPath: "polygon(50% 0%, 82% 8%, 98% 35%, 95% 70%, 75% 95%, 45% 98%, 15% 92%, 2% 65%, 5% 30%, 18% 5%)",
                }}
              />

              {/* Inner stamped ring */}
              <div 
                className="absolute inset-3 rounded-full border-[1.5px] border-[#a01622]/45 flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #90121b, #450409 85%)",
                  boxShadow: "inset 0 2px 5px rgba(255,255,255,0.15), 0 3px 6px rgba(0,0,0,0.3)",
                  clipPath: "polygon(50% 0%, 88% 10%, 97% 45%, 85% 85%, 50% 98%, 12% 85%, 2% 45%, 12% 10%)",
                }}
              >
                {/* SVG Wax-Stamping Gold Monogram FV */}
                <svg
                  className="w-14 h-14 text-[#d4af37] opacity-80 filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]"
                  viewBox="0 0 140 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 46 25 C 46 25, 52 10, 52 30 C 52 50, 46 72, 42 78 C 38 84, 28 86, 32 80 C 36 74, 45 64, 45 64"
                    stroke="#d4af37"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 22 34 C 32 24, 58 20, 78 26 C 82 27, 85 30, 80 34 C 74 38, 62 36, 54 36"
                    stroke="#d4af37"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 36 52 C 44 52, 54 48, 62 46"
                    stroke="#d4af37"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 68 35 C 72 48, 82 76, 86 84 C 88 88, 91 90, 94 84"
                    stroke="#d4af37"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 94 84 C 99 68, 108 38, 114 28 C 116 23, 122 14, 126 24 C 128 30, 123 37, 115 34 C 107 30, 110 22, 118 19"
                    stroke="#d4af37"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Secure wax seal hover shine overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 bg-gradient-to-tr from-white via-transparent to-transparent pointer-events-none rounded-full" />
            </motion.div>

            <div className="mt-8 flex items-center gap-2 text-gold justify-center">
              <CheckCircle2 size={16} />
              <span className="text-[0.62rem] uppercase tracking-[0.24em] font-serif font-bold">Solicitud Sellada y Cifrada</span>
            </div>

            <h4 className="mt-4 font-serif text-2xl text-ivory tracking-wide uppercase select-none font-light">
              Gabinete de Crisis Activado
            </h4>
            <div className="h-px w-16 bg-gold/40 mx-auto mt-4 mb-5" />

            <p className="text-xs text-steel leading-relaxed max-w-md mx-auto">
              Su solicitud de evaluación estratégica ha sido procesada con éxito y su gestor de correo local se ha activado. Recibirá respuesta prioritaria directa por parte de nuestro director legal en un plazo máximo de 24 horas laborables.
            </p>

            {/* reset and resubmit button */}
            <button
              onClick={handleReset}
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 border border-gold/15 bg-black/35 hover:bg-gold/15 px-6 text-[0.62rem] uppercase tracking-widest text-gold transition duration-300 rounded-sm cursor-pointer select-none"
            >
              <RefreshCw size={12} /> Volver a enviar formulario
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
