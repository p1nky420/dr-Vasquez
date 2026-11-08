import type { Metadata } from "next";
import { GraduationCap, MessagesSquare, Mic2 } from "lucide-react";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import { WhatsappCta } from "@/components/whatsapp-cta";

export const metadata: Metadata = {
  title: "Conferencias y encuentros jurídicos",
  description: "Conferencias, seminarios y conversaciones académicas sobre derecho penal con el Dr. Fausto Vásquez Cevallos.",
  alternates: { canonical: "/eventos" },
};

const formats = [
  { name: "Conferencias", icon: Mic2, description: "Exposición y conversación sobre un tema de derecho penal, prueba o proceso." },
  { name: "Seminarios", icon: MessagesSquare, description: "Discusión jurídica con profundidad técnica y participación de los asistentes." },
  { name: "Sesiones de formación", icon: GraduationCap, description: "Encuentros para profesionales e instituciones con alcance y formato acordados previamente." },
];

export default function EventosPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Encuentros"
        title="El derecho se enriquece en conversación."
        text="Conferencias, seminarios y espacios de discusión técnica. Una oportunidad para conectar el estudio del derecho con los desafíos de la práctica."
        photo={heroPhotos.meetings}
        actionLabel="Ver formatos de encuentro"
      />
      <section id="contenido" className="in-wrap in-events" aria-labelledby="encuentros-formatos">
        <div>
          <header className="in-heading">
            <p className="ed-kicker">Formatos académicos</p>
            <h2 id="encuentros-formatos">Cómo podemos colaborar</h2>
          </header>
          <ul className="in-events__formats">
            {formats.map(({ name, icon: Icon, description }) => (
              <li key={name}><Icon size={24} strokeWidth={1.35} aria-hidden="true" /><div><h3>{name}</h3><p>{description}</p></div></li>
            ))}
          </ul>
        </div>
        <aside className="in-events__invitation" aria-labelledby="encuentros-propuesta">
          <p className="ed-kicker">Para instituciones</p>
          <h2 id="encuentros-propuesta">Proponga un encuentro</h2>
          <p>Incluya en su mensaje los datos que nos permitan revisar la invitación.</p>
          <ul className="in-checklist">
            <li>Institución organizadora</li>
            <li>Tema y público al que se dirige</li>
            <li>Fechas tentativas y formato</li>
          </ul>
          <WhatsappCta location="interior-cierre" label="Proponer un encuentro" message="Hola, deseo consultar disponibilidad del Dr. Fausto Vásquez Cevallos para una conferencia o encuentro jurídico." />
        </aside>
      </section>
    </div>
  );
}
