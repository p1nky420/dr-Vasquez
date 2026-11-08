import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import { WhatsappCta } from "@/components/whatsapp-cta";
export const metadata: Metadata = {
  title: { absolute: "Atención privada | Dr. Fausto Vásquez Cevallos" },
  robots: { index: false, follow: false },
};
export default function GraciasPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Atención privada"
        title="Gracias por contactar al despacho."
        text="Si completó el envío de su solicitud, el equipo coordinará la atención por el canal indicado. También puede continuar en una conversación privada por WhatsApp."
        photo={heroPhotos.chessRoom}
      />
      <section id="contenido" className="in-wrap in-confirmation" aria-labelledby="atencion-canales">
        <MessageCircle size={32} strokeWidth={1.3} aria-hidden="true" />
        <h2 id="atencion-canales">Continuar la conversación</h2>
        <WhatsappCta location="gracias" label="Consultar sobre mi solicitud" message="Hola, deseo consultar sobre mi solicitud de evaluación privada." />
        <Link className="ed-text-link" href="/">Volver al inicio <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
