import Link from "next/link";
import { navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080706] pb-20 text-[#f3eee4] md:pb-0">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 md:grid-cols-[1.35fr_0.65fr_0.8fr] md:px-8 md:py-20">
        <div>
          <p className="font-serif text-4xl tracking-[-0.04em]">Fausto Vásquez</p>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#c9ad78]">Abogados · Derecho penal estratégico</p>
          <p className="mt-7 max-w-md text-[0.95rem] leading-7 text-[#b8b0a5]">
            Defensa penal, pensamiento jurídico y dirección estratégica para asuntos de alta complejidad.
          </p>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9ad78]">Institución</p>
          <nav className="mt-6 grid gap-3 text-[0.95rem] text-[#b8b0a5]">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-[#f3eee4]">{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9ad78]">Contacto</p>
          <div className="mt-6 space-y-3 text-[0.95rem] leading-6 text-[#b8b0a5]">
            <p><a className="hover:text-[#f3eee4]" href="tel:+593983076881">+593 98 307 6881</a></p>
            <p><a className="hover:text-[#f3eee4]" href="mailto:contacto@faustovasquezabogados.com">contacto@faustovasquezabogados.com</a></p>
            <p>Oficinas en Quito y Guayaquil<br />Atención con cita previa</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-[0.66rem] uppercase tracking-[0.13em] text-[#948c81]">
        © {new Date().getFullYear()} Fausto Vásquez Abogados · La información publicada no constituye asesoría jurídica.
      </div>
    </footer>
  );
}
