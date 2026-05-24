import { Search, Columns, Gavel, Scale, Lock, ShieldCheck, Award, Compass, BookOpen } from "lucide-react";
import { Reveal } from "@/components/animated";
import { processSteps } from "@/lib/site";

const iconMap: Record<string, any> = {
  Search,
  Columns,
  Gavel,
  Scale,
  Lock,
};

const pillars = [
  { label: "Confidencialidad", icon: ShieldCheck },
  { label: "Excelencia", icon: Award },
  { label: "Estrategia", icon: Compass },
  { label: "Resultados", icon: BookOpen },
];

export function ProcessTimeline() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 md:px-0 z-10 w-full">
      
      {/* 5-Step Clean Grid (Mobile swipeable carousel enabled) */}
      <div className="flex overflow-x-auto flex-nowrap gap-5 pb-6 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-5 w-full relative z-10">
        {processSteps.map((step, index) => {
          const Icon = iconMap[step.iconName ?? "Search"] ?? Search;
          return (
            <Reveal delay={index * 0.08} key={step.title} className="shrink-0 snap-start w-[290px] sm:w-auto">
              <article className="group relative flex h-full min-h-[290px] flex-col border border-gold/10 bg-[#0b0f14]/40 p-6 backdrop-blur-md rounded-sm transition duration-300 hover:-translate-y-1 hover:border-gold/30">
                
                {/* Fine header with step number and small gold icon */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-gold text-xs tracking-widest font-bold">
                    PASO 0{index + 1}
                  </span>
                  <span className="text-gold/60 group-hover:text-gold transition duration-300">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-8 font-serif text-lg leading-snug text-ivory tracking-wide group-hover:text-gold transition duration-300">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-steel group-hover:text-ivory/80 transition duration-300">
                  {step.text}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Bottom Pillars Strip */}
      <Reveal delay={0.4} className="mt-12 border-t border-gold/10 pt-8 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[0.66rem] uppercase tracking-[0.2em] text-steel">
          <span className="text-gold/90 font-serif lowercase italic text-xs normal-case tracking-normal">
            Excelencia en Derecho Penal Económico, Constitucional, Político y Financiero.
          </span>
          <div className="hidden h-4 w-px bg-gold/10 lg:block" />
          <div className="flex flex-wrap items-center justify-center gap-8">
            {pillars.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <div className="flex items-center gap-2 hover:text-gold transition duration-300" key={pillar.label}>
                  <PillarIcon className="text-gold" size={14} strokeWidth={1.5} />
                  <span>{pillar.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
