import { Scale, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { BlogCards } from "@/components/blog-cards";
import { Reveal } from "@/components/animated";
import Link from "next/link";

export function EditorialInsights() {
  return (
    <section className="section-shell border-y border-gold/15 bg-marble-dark text-ivory relative overflow-hidden">
      
      {/* Laser line border and background subtle glows */}
      <div className="absolute top-0 inset-x-0 led-strip-gold" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(184,155,94,0.06),transparent_35%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Block */}
        <Reveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <span className="eyebrow">Pensamiento Jurídico</span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-wider text-gold-metallic animate-text-shine uppercase">
              ANÁLISIS Y LIBROS
            </h2>
            <div className="h-px w-20 bg-gold mt-4" />
          </div>
          <div>
            <p className="max-w-2xl text-base leading-relaxed text-steel">
              Publicaciones, análisis y reflexiones sobre temas fundamentales del Derecho Penal, Derecho Penal Económico y Constitucional, con rigor dogmático y sentido práctico.
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 border-b border-gold/30 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold hover:border-gold hover:text-ivory transition duration-300"
              href="/blog"
            >
              Explorar Publicaciones <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Main interactive books & cards display */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_1.9fr] lg:items-start">
          
          {/* Left Side: 3D interactive Book Showcase */}
          <Reveal delay={0.12} className="flex flex-col items-center lg:items-start">
            <div className="relative group p-8 border border-gold/15 bg-black/45 backdrop-blur-md rounded-sm w-full max-w-[460px] shadow-glow-gold transition-all duration-500 hover:border-gold/30">
              
              <p className="text-[0.66rem] uppercase tracking-[0.2em] text-gold/80 font-bold mb-6 flex items-center gap-2">
                <BookOpen size={13} /> Publicación Destacada
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                
                {/* 3D BOOK CONTAINER WITH PERSPECTIVE & SHADOW */}
                <div className="perspective-[1000px] w-[150px] h-[220px] relative shrink-0">
                  
                  {/* Real volumetric shadow on the floor */}
                  <div className="absolute top-[102%] left-2 right-2 h-3 bg-black/85 blur-md rounded-full transform rotate-x-[85deg] transition-all duration-500 group-hover:scale-95 group-hover:blur-lg opacity-85 z-0 pointer-events-none" />

                  <div className="relative w-full h-full transform-style-3d duration-700 group-hover:rotate-y-[-24deg] group-hover:translate-z-[10px] shadow-2xl">
                    
                    {/* Spine of the book (3D depth side) */}
                    <div className="absolute top-0 bottom-0 left-0 w-3 origin-left bg-gradient-to-r from-blue-950 to-blue-900 border-r border-gold/30 transform -rotate-y-90 pointer-events-none" />
                    
                    {/* Pages block (white paper edge on the right) */}
                    <div className="absolute top-[2px] bottom-[2px] right-[-3px] w-[6px] bg-[#f5f2ea] border-y border-r border-gold/20 rounded-r-sm transform translate-z-[-2px] pointer-events-none shadow-md" />

                    {/* Book Cover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 border-r border-gold/40 text-ivory p-3.5 flex flex-col justify-between shadow-2xl rounded-r-md rounded-l-sm border-l-4 border-l-blue-950 select-none">
                      
                      <div>
                        {/* Golden publisher brand */}
                        <div className="flex justify-between items-center text-[0.45rem] tracking-widest text-gold/70 font-semibold uppercase">
                          <span>Estudio Jurídico</span>
                          <span>ergo</span>
                        </div>
                        
                        {/* Title text */}
                        <h4 className="mt-4 font-serif text-[0.72rem] font-bold leading-normal tracking-wide text-gold">
                          PUNTO DE INFLEXIÓN DE LA IMPUTACIÓN OBJETIVA
                        </h4>
                        <p className="mt-1 text-[0.45rem] text-steel tracking-wide leading-tight">
                          EN EL CÓDIGO ORGÁNICO INTEGRAL PENAL
                        </p>
                      </div>

                      {/* Author & Editorial */}
                      <div className="border-t border-gold/15 pt-2 flex flex-col text-[0.4rem] text-gold/80 tracking-widest uppercase">
                        <span className="font-serif font-bold text-[0.45rem]">Fausto Ramiro Vásquez Cevallos</span>
                        <span className="mt-1 text-steel/60">ergo editores</span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex flex-col">
                  <h3 className="font-serif text-lg leading-snug text-ivory group-hover:text-gold transition duration-300">
                    Punto de Inflexión de la Imputación Objetiva en el COIP
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-steel">
                    Un estudio dogmático profundo sobre la evolución de la imputación objetiva y su aplicación práctica bajo el Código Orgánico Integral Penal en el sistema judicial ecuatoriano.
                  </p>
                  <div className="mt-5">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-widest text-gold border-b border-gold/30 hover:border-gold pb-0.5 transition duration-300 font-semibold"
                    >
                      Conocer más <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

              </div>

              {/* Decorative visual border accent */}
              <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-gold/20 group-hover:border-gold/50 transition duration-300" />
            </div>
          </Reveal>

          {/* Right Side: Grid of academic papers / publications */}
          <Reveal delay={0.24}>
            <div className="text-ivory">
              <BlogCards />
            </div>
          </Reveal>

        </div>

        {/* Dynamic quote footer */}
        <Reveal delay={0.3} className="mt-20 border-t border-gold/15 pt-8 text-center">
          <p className="font-serif text-lg sm:text-xl italic text-gold/90 text-gold-metallic animate-text-shine">
            "El Derecho Penal no es solo norma, es reflexión, técnica y compromiso absoluto con la justicia."
          </p>
          <p className="mt-2 text-[0.66rem] uppercase tracking-[0.28em] text-steel">
            Dr. Fausto Ramiro Vásquez Cevallos
          </p>
        </Reveal>

      </div>
    </section>
  );
}
