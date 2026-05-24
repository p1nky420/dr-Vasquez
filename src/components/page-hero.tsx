import { Reveal } from "@/components/animated";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export function PageHero({ eyebrow, title, text }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44 backdrop-blur-sm">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(184,155,94,0.12),transparent_35%),linear-gradient(135deg,rgba(11,15,20,0.65),rgba(14,42,54,0.40)_58%,rgba(8,11,16,0.65))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <Reveal className="mx-auto max-w-5xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-balance font-serif text-5xl leading-[0.95] text-ivory md:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-steel md:text-xl">
          {text}
        </p>
      </Reveal>
    </section>
  );
}
