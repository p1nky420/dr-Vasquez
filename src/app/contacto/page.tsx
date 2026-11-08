import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, LockKeyhole, MapPin } from "lucide-react";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import { ConsultationActions } from "@/components/consultation-actions";

export const metadata: Metadata = {
  title: { absolute: "Evaluación privada | Dr. Fausto Vásquez Cevallos" },
  description: "Coordine una evaluación privada con el Dr. Fausto Vásquez Cevallos. Atención en Quito, con cita previa.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Contacto"
        title="El primer paso es conversar."
        text="Coordine una evaluación privada con el despacho del Dr. Fausto Vásquez Cevallos."
        photo={heroPhotos.reception}
        actionLabel="Ver opciones de contacto"
      />
      <section id="contenido" className="in-wrap in-contact ed-contact" aria-labelledby="contacto-canales">
        <div id="consulta-form" className="in-contact__channels">
          <p className="ed-kicker">Canales de atención</p>
          <h2 id="contacto-canales">Coordine su consulta</h2>
          <p>Comparta solo sus datos de contacto en el primer mensaje.</p>
          <ConsultationActions source="contacto" message="Hola, deseo coordinar una evaluación privada con el Dr. Fausto Vásquez Cevallos." />
          <dl className="in-contact__facts">
            <div><dt><MapPin size={17} aria-hidden="true" />Ubicación</dt><dd>Quito, con cita previa</dd></div>
            <div><dt><Clock3 size={17} aria-hidden="true" />Horario</dt><dd>9:30 a 19:00</dd></div>
          </dl>
        </div>
        <aside className="in-contact__process">
          <LockKeyhole size={24} strokeWidth={1.4} aria-hidden="true" />
          <h3>Qué ocurre después</h3>
          <ol>
            <li>El despacho confirma disponibilidad.</li>
            <li>Revisa posibles conflictos de interés antes de recibir documentos.</li>
            <li>Coordina la fecha y el formato de la reunión.</li>
          </ol>
          <Link href="/privacidad" className="ed-text-link">Cómo se tratan sus datos <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </aside>
      </section>
    </div>
  );
}
