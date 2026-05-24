import { Reveal } from "@/components/animated";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-balance font-serif text-4xl leading-tight text-ivory md:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-pretty text-base leading-8 text-steel md:text-lg">
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}
