import type { Metadata } from "next";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solicitud recibida",
  description:
    "Confirmación confidencial de recepción de solicitud para Dr. Fausto Vásquez — Estudio Jurídico.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GraciasPage() {
  return (
    <section className="flex min-h-screen items-center bg-slate-50 px-5 py-32 text-slate-950 dark:bg-[#0A1128] dark:text-[#F4F4F6] md:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-sm border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-[#050D1F] md:p-12">
        <div className="mx-auto grid size-14 place-items-center rounded-sm border border-[#C5A059]/50 text-[#C5A059]">
          <CheckCircle2 size={26} strokeWidth={1.5} />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A059]">
          Recepción confidencial confirmada
        </p>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl">
          Gracias por confiar su caso.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#9CA3AF]">
          Su información ha sido recibida para una evaluación inicial bajo
          estricto secreto profesional. El equipo se comunicará por el canal
          indicado.
        </p>
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#C5A059]">
          <Lock size={14} />
          Secreto Profesional
        </div>
        <Link
          href="/"
          className="mt-9 inline-flex rounded-sm border border-[#C5A059] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#C5A059] transition-colors hover:bg-[#C5A059] hover:text-[#0A1128]"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
