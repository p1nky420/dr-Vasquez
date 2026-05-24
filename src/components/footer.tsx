import { Scale } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { contactMessage, navItems, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-[#080b10]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center border border-gold/40 text-gold">
              <Scale size={22} strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-serif text-2xl text-ivory">Fausto Vásquez Abogados</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold">
                Derecho Penal Económico & Litigio Estratégico
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-steel">
            Convertir lo complejo en una estrategia penal clara, técnica y contundente.
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gold">Navegación</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {navItems.map((item) => (
              <Link className="text-steel transition hover:text-ivory" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gold">Evaluación</p>
          <p className="mt-5 text-sm leading-7 text-steel">
            Si existe una audiencia próxima o una investigación penal activa, solicite una revisión inicial.
          </p>
          <ButtonLink
            className="mt-6"
            href={whatsappHref(contactMessage)}
            target="_blank"
          >
            Solicitar evaluación
          </ButtonLink>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-5 py-5 text-center text-xs text-steel">
        © {new Date().getFullYear()} Fausto Vásquez Abogados. Todos los derechos reservados.
      </div>
    </footer>
  );
}
