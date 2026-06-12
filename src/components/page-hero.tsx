import Image from "next/image";
import { Reveal } from "@/components/animated";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  bgImage?: string;
};

export function PageHero({ eyebrow, title, text, bgImage }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-36 md:px-8 md:pb-24 md:pt-44 backdrop-blur-sm">
      {/* Background Section */}
      {bgImage ? (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover opacity-45 filter grayscale brightness-[0.55] contrast-[1.1] scale-102 transition-transform duration-[15s] select-none pointer-events-none"
            priority
          />
          {/* Smart responsive gradient overlay for absolute text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14]/80 via-[#0b0f14]/40 to-[#0b0f14] md:bg-gradient-to-r md:from-[#0b0f14]/85 md:via-[#0b0f14]/40 md:to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(184,155,94,0.12),transparent_35%),linear-gradient(135deg,rgba(11,15,20,0.65),rgba(14,42,54,0.40)_58%,rgba(8,11,16,0.65))]" />
      )}

      {/* Bottom glowing line indicator */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Reveal className="mx-auto max-w-5xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-balance font-serif text-5xl leading-[0.95] text-ivory md:text-7xl font-light">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-[#eae5d9] bg-black/35 md:bg-transparent p-4 md:p-0 rounded-sm backdrop-blur-sm md:backdrop-blur-none border-l border-gold/20 md:border-none">
          {text}
        </p>
      </Reveal>
    </section>
  );
}
