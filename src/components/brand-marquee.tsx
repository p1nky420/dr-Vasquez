const phrases = [
  "Libertad",
  "Patrimonio",
  "Empresa",
  "Reputación",
  "Poder",
  "Prueba",
  "Estrategia",
  "Litigio",
];

export function BrandMarquee() {
  return (
    <div className="overflow-hidden border-y border-gold/20 bg-[#06080c] py-4">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap">
        {[...phrases, ...phrases, ...phrases].map((phrase, index) => (
          <span
            className="font-serif text-2xl text-ivory/70 md:text-3xl"
            key={`${phrase}-${index}`}
          >
            {phrase}
            <span className="ml-10 text-gold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
