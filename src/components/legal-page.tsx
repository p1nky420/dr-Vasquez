import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Envoltorio compartido para las páginas legales. Registro sobrio y legible:
 * son textos que se consultan, no que se recorren.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-[#0a0908] text-[#f3eee4]">
      <section className="px-5 pb-10 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-[48rem]">
          <nav aria-label="Ruta de navegación" className="text-[0.8125rem] text-[#9a9287]">
            <Link href="/" className="inline-flex min-h-6 items-center hover:text-[#ecc058]">
              Inicio
            </Link>
          </nav>
          <p className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-[#ecc058]">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.08] tracking-[-0.025em] text-[#fffaf0]">
            {title}
          </h1>
          <p className="mt-6 text-[1rem] leading-[1.85] text-[#c2baae]">{intro}</p>
          <p className="mt-6 text-[0.8125rem] uppercase tracking-[0.14em] text-[#8f877c]">
            Última actualización: {updated}
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="legal mx-auto max-w-[48rem] border-t border-[#ecc058]/20 pt-10">
          {children}
        </div>
      </section>
    </article>
  );
}
