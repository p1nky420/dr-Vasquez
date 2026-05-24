import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animated";
import { representativeMatters } from "@/lib/site";

export function RepresentativeMatters() {
  return (
    <section className="section-shell bg-[#080b10] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(184,155,94,0.04),transparent_35%)] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Title and Intro */}
        <Reveal className="grid gap-8 border-b border-gold/10 pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <span className="eyebrow">Asuntos Críticos</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-ivory tracking-wide uppercase leading-none">
              Casos Relevantes
            </h2>
          </div>
          <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-steel lg:ml-auto">
            Presentación técnica de defensas procesales y litigios complejos estructurados bajo dogmática penal e imputación objetiva en el Ecuador. Por estrictas razones de secreto profesional y confidencialidad, omitimos nombres de representados e información específica de causas en curso.
          </p>
        </Reveal>

        {/* MOBILE: Tactical Swipe Carousel (flex overflow-x-auto) */}
        <div className="flex sm:hidden overflow-x-auto flex-nowrap gap-5 pt-8 pb-4 scrollbar-none snap-x snap-mandatory w-full">
          {representativeMatters.map((matter, index) => (
            <Reveal delay={index * 0.05} key={matter.title} className="shrink-0 snap-start w-[290px]">
              <article className="group h-full border border-gold/10 bg-black/35 p-6 rounded-sm transition hover:border-gold/30 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex items-center justify-between text-gold">
                    <span className="text-[0.66rem] uppercase tracking-widest font-serif font-bold">Asunto 0{index + 1}</span>
                    <span className="text-[0.55rem] uppercase tracking-[0.16em] text-steel font-bold bg-[#0b0f14] px-2 py-0.5 border border-gold/5 rounded-sm">{matter.tag}</span>
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold leading-snug text-ivory group-hover:text-gold transition duration-300">
                    {matter.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-steel group-hover:text-ivory/80 transition duration-300">
                    {matter.text}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-gold/5 flex justify-end">
                  <ArrowUpRight className="text-gold/60 group-hover:text-gold transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" size={16} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* DESKTOP: List structure (hidden on mobile, shown on sm+) */}
        <div className="hidden sm:block divide-y divide-gold/15 mt-2">
          {representativeMatters.map((matter, index) => (
            <Reveal delay={index * 0.05} key={matter.title}>
              <article className="group grid gap-5 py-8 transition md:grid-cols-[0.65fr_1fr_2fr_auto] md:items-start">
                <p className="text-xs uppercase tracking-[0.18em] text-gold font-serif font-bold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-[0.66rem] uppercase tracking-[0.16em] text-steel font-bold">
                  {matter.tag}
                </p>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-ivory group-hover:text-gold transition duration-300">
                    {matter.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-steel group-hover:text-ivory/80 transition duration-300">
                    {matter.text}
                  </p>
                </div>
                <ArrowUpRight
                  className="text-steel transition group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300"
                  size={20}
                />
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
