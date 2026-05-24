import { Reveal } from "@/components/animated";
import { practiceAreas } from "@/lib/site";

export function PracticeGrid() {
  return (
    <div className="flex overflow-x-auto flex-nowrap gap-5 pb-6 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-5 w-full">
      {practiceAreas.map((area, index) => {
        const Icon = area.icon;
        return (
          <Reveal delay={index * 0.06} key={area.title} className="shrink-0 snap-start w-[290px] sm:w-auto">
            <article className="group h-full border border-gold/10 bg-black/35 p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/30 rounded-sm">
              <div className="mb-7 grid size-12 place-items-center border border-gold/25 bg-gold/5 text-gold transition group-hover:border-gold/50 rounded-full">
                <Icon size={21} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl leading-tight text-ivory tracking-wide group-hover:text-gold transition duration-300">
                {area.title}
              </h3>
              <p className="mt-4 text-xs leading-relaxed text-steel group-hover:text-ivory/80 transition duration-300">
                {area.description}
              </p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
