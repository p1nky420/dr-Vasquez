import Link from "next/link";
import { navItems, socialLinks } from "@/lib/site";
import { Seal } from "@/components/fusion/seal";

export function Footer() {
  return (
    <footer className="relative border-t border-[#76572f]/20 bg-[#f6f2eb] pb-24 text-[#24211e] md:pb-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[8%] opacity-[0.07]">
        <Seal className="w-[45%] text-[#76572f] md:w-[22%]" title="" />
      </div>
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.7fr_0.8fr_0.8fr] md:px-8 md:py-20">
        <div>
          <p className="font-serif text-4xl tracking-[-0.04em]">Fausto Vásquez Cevallos</p>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#76572f]">Estudio Jurídico · Derecho penal estratégico</p>
          <p className="mt-7 max-w-md text-[0.95rem] leading-7 text-[#594f46]">
            Defensa penal, pensamiento jurídico y dirección estratégica para asuntos de alta complejidad.
          </p>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#76572f]">Institución</p>
          <nav className="mt-6 grid gap-3 text-[0.95rem] text-[#594f46]">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-[#24211e]">{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#76572f]">Biblioteca</p>
          <nav className="mt-6 grid gap-3 text-[0.95rem] text-[#594f46]">
            <Link href="/academia" className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-[#24211e]">Academia</Link>
            <Link href="/publicaciones" className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-[#24211e]">Publicaciones</Link>
            <Link href="/eventos" className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-[#24211e]">Conferencias</Link>
            <Link href="/preguntas-frecuentes" className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-[#24211e]">Preguntas frecuentes</Link>
          </nav>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#76572f]">Contacto</p>
          <div className="mt-6 space-y-3 text-[0.95rem] leading-6 text-[#594f46]">
            <p><a className="inline-flex min-h-6 items-center py-0.5 hover:text-[#24211e]" href="tel:+593983076881">+593 98 307 6881</a></p>

            <p>Quito · Atención en Ecuador, previa evaluación<br />Atención con cita previa</p>
            <p className="flex gap-5 pt-2">{socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center py-0.5 text-[#76572f] underline-offset-4 transition-colors hover:text-[#24211e] hover:underline">{link.label}</a>)}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#76572f]/20 px-5 py-5 text-center text-[0.66rem] uppercase tracking-[0.13em] text-[#64584d] sm:text-[0.72rem]">
        <p>© {new Date().getFullYear()} Dr. Fausto Vásquez Cevallos — Estudio Jurídico · La información publicada no constituye asesoría jurídica.</p>
        <nav aria-label="Información legal" className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <Link href="/aviso-legal" className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-[#76572f]">
            Aviso legal
          </Link>
          <Link href="/privacidad" className="inline-flex min-h-6 items-center py-0.5 transition-colors hover:text-[#76572f]">
            Política de privacidad
          </Link>
        </nav>
      </div>
      <div className="border-t border-[#76572f]/15 px-5 py-4 text-center text-[0.6rem] uppercase tracking-[0.2em] text-[#64584d] sm:text-[0.65rem]">
        Diseñado y desarrollado por <a href="https://mateoguerrero.lat" target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center py-0.5 text-[#76572f] hover:text-[#24211e] transition-colors">MG Web Studio</a>
      </div>
    </footer>
  );
}
