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
    <section className="relative min-h-[64svh] overflow-hidden bg-[#0a0908] px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
      {/* Background Section */}
      {bgImage ? (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={bgImage}
            alt={title}
            fill
            sizes="100vw"
            className="pointer-events-none scale-[1.02] select-none object-cover opacity-42 grayscale brightness-[0.58] contrast-[1.08]"
            priority
          />
          {/* Smart responsive gradient overlay for absolute text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090806]/85 via-[#090806]/52 to-[#090806] md:bg-gradient-to-r md:from-[#090806]/95 md:via-[#090806]/62 md:to-[#090806]/20" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(184,155,94,0.12),transparent_35%),linear-gradient(135deg,rgba(11,15,20,0.65),rgba(14,42,54,0.40)_58%,rgba(8,11,16,0.65))]" />
      )}

      {/* Bottom glowing line indicator */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Reveal className="mx-auto flex min-h-[42svh] max-w-[88rem] flex-col justify-end">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-balance font-serif text-[clamp(3.4rem,7vw,7rem)] font-normal leading-[0.92] tracking-[-0.05em] text-ivory">
          {title}
        </h1>
        <p className="mt-8 max-w-3xl text-pretty text-base leading-8 text-[#d0c8bd] md:text-lg">
          {text}
        </p>
      </Reveal>
    </section>
  );
}
