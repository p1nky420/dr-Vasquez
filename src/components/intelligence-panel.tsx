import { ArrowUpRight, FileCheck2, Fingerprint, Landmark, ScanLine } from "lucide-react";
import { Reveal } from "@/components/animated";

const items = [
  {
    label: "Lectura probatoria",
    text: "Hechos, documentos, trazabilidad y contradicciones de acusación.",
    icon: ScanLine,
  },
  {
    label: "Mapa de riesgo",
    text: "Libertad, patrimonio, reputación, empresa y exposición pública.",
    icon: Fingerprint,
  },
  {
    label: "Control constitucional",
    text: "Debido proceso, garantías, recursos y tutela judicial efectiva.",
    icon: Landmark,
  },
  {
    label: "Teoría del caso",
    text: "Hipótesis defensiva clara, verificable y litigable.",
    icon: FileCheck2,
  },
];

export function IntelligencePanel() {
  return (
    <section className="section-shell relative overflow-hidden border-y border-ivory/10 bg-[#070a0e]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(184,155,94,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(245,242,234,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <Reveal>
          <p className="eyebrow">Sala de estrategia</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-ivory md:text-6xl">
            Cada caso se ordena como una arquitectura de defensa.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-steel">
            La defensa penal premium no depende de volumen ni ruido. Depende de una lectura superior del expediente, del poder institucional y de la prueba.
          </p>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal delay={index * 0.06} key={item.label}>
                <article className="group relative min-h-56 overflow-hidden border border-ivory/10 bg-graphite/88 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/50">
                  <div className="absolute right-5 top-5 text-steel transition group-hover:text-gold">
                    <ArrowUpRight size={18} />
                  </div>
                  <Icon className="text-gold" size={26} strokeWidth={1.45} />
                  <h3 className="mt-9 font-serif text-2xl text-ivory">{item.label}</h3>
                  <p className="mt-4 text-sm leading-7 text-steel">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
