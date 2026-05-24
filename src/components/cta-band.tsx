import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/animated";
import { contactMessage, whatsappHref } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = "Solicite una evaluación estratégica de su caso",
  text = "La defensa penal de alto nivel no se improvisa. Se construye con estrategia, técnica y precisión desde el primer momento.",
}: CtaBandProps) {
  return (
    <section className="px-5 py-20 md:px-8">
      <Reveal>
        <div className="mx-auto grid max-w-7xl gap-8 border border-gold/30 bg-[linear-gradient(135deg,rgba(14,42,54,0.85),rgba(11,15,20,0.96))] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="eyebrow">Defensa estratégica</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-ivory md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-steel">{text}</p>
          </div>
          <ButtonLink href={whatsappHref(contactMessage)} target="_blank">
            WhatsApp <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
