"use client";

import Image from "next/image";
import { BlogCards } from "@/components/blog-cards";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/animated";
import { blogCategories } from "@/lib/site";

export default function BlogPage() {
  return (
    <>
      {/* 1. Immersive Hero Background using the gorgeous Quito night image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-5 pt-36 pb-12 bg-marble-dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="/quito_night.png"
            alt="Quito de Noche"
            fill
            className="object-cover opacity-45 filter grayscale brightness-[0.6] contrast-[1.1] scale-102 transition-transform duration-[12s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 led-strip-gold" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow tracking-[0.24em] text-gold">Centro de Pensamiento Penal</span>
            <h1 className="mt-6 font-serif text-5xl font-normal leading-[0.95] tracking-[-0.045em] text-[#fffaf0] sm:text-7xl">
              Pensamiento y análisis jurídico
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#c9c1b5] sm:text-lg">
              Un espacio para desarrollar doctrina y posicionar el análisis técnico serio sobre derecho penal económico y litigio constitucional complejo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Blog Cards Grid over dark background */}
      <section className="section-shell bg-[#06080b]/35 backdrop-blur-md relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <BlogCards />
        </div>
      </section>

      {/* 3. Categories strip inside glass beveled boxes */}
      <section className="section-shell border-y border-gold/15 bg-marble-dark overflow-hidden">
        <div className="absolute top-0 inset-x-0 led-strip-gold animate-pulse-soft" />
        <div className="mx-auto max-w-5xl relative z-10">
          <Reveal className="text-center">
            <span className="eyebrow">Líneas de Análisis</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-ivory tracking-wide uppercase">
              Áreas Editoriales
            </h2>
            <div className="h-px w-20 bg-gold mx-auto mt-4 mb-8" />
          </Reveal>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {blogCategories.map((category, index) => (
              <Reveal delay={index * 0.04} key={category}>
                <span className="inline-flex items-center border border-gold/15 bg-black/45 hover:border-gold/45 px-5 py-3 text-xs uppercase tracking-widest text-ivory font-semibold transition duration-300 rounded-sm shadow-glow-gold">
                  {category}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
