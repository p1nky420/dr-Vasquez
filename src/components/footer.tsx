import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#080706] pb-20 text-[#f3eee4] md:pb-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[8%] opacity-[0.12]">
        <div className="relative w-[35%] aspect-[826/644] md:w-[25%]">
          <Image src="/logoFV-solo.png" alt="" fill className="object-contain" sizes="300px" />
        </div>
      </div>
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.7fr_0.8fr_0.8fr] md:px-8 md:py-20">
        <div>
          <p className="font-serif text-4xl tracking-[-0.04em]">Fausto Vásquez</p>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#ecc058]">Abogados · Derecho penal estratégico</p>
          <p className="mt-7 max-w-md text-[0.95rem] leading-7 text-[#b8b0a5]">
            Defensa penal, pensamiento jurídico y dirección estratégica para asuntos de alta complejidad.
          </p>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#ecc058]">Institución</p>
          <nav className="mt-6 grid gap-3 text-[0.95rem] text-[#b8b0a5]">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-[#f3eee4]">{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#ecc058]">Biblioteca</p>
          <nav className="mt-6 grid gap-3 text-[0.95rem] text-[#b8b0a5]">
            <Link href="/academia" className="transition-colors hover:text-[#f3eee4]">Academia</Link>
            <Link href="/blog" className="transition-colors hover:text-[#f3eee4]">Publicaciones</Link>
            <Link href="/eventos" className="transition-colors hover:text-[#f3eee4]">Conferencias</Link>
            <Link href="/blog" className="transition-colors hover:text-[#f3eee4]">Investigación</Link>
          </nav>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#ecc058]">Contacto</p>
          <div className="mt-6 space-y-3 text-[0.95rem] leading-6 text-[#b8b0a5]">
            <p><a className="hover:text-[#f3eee4]" href="tel:+593983076881">+593 98 307 6881</a></p>
            <p><a className="hover:text-[#f3eee4]" href="mailto:contacto@faustovasquezabogados.com">contacto@faustovasquezabogados.com</a></p>
            <p>Oficinas en Quito y Guayaquil<br />Atención con cita previa</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-[0.66rem] uppercase tracking-[0.13em] text-[#948c81] sm:text-[0.72rem]">
        © {new Date().getFullYear()} Fausto Vásquez Abogados · La información publicada no constituye asesoría jurídica.
      </div>
      <div className="border-t border-white/5 px-5 py-4 text-center text-[0.6rem] uppercase tracking-[0.2em] text-[#6d655b] sm:text-[0.65rem]">
        Diseñado y desarrollado por <a href="https://mateoguerrero.lat" target="_blank" rel="noreferrer" className="text-[#ecc058] hover:text-[#f3eee4] transition-colors">MG Web Studio</a>
      </div>
    </footer>
  );
}
