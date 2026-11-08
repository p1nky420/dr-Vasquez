import { useId } from "react";

/**
 * Sello circular FV, la opción que eligió el Dr. Fausto Vásquez Cevallos entre las
 * propuestas de logotipo. Dibujado en SVG para que se mantenga nítido en
 * cualquier tamaño y tome el color del contexto (currentColor).
 */
export function Seal({
  className = "",
  title = "Fausto Vásquez Cevallos · Estudio Jurídico",
  showRing = true,
}: {
  className?: string;
  title?: string;
  showRing?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const ring = `seal-ring-${id}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <defs>
        <path id={ring} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      {showRing ? (
        <>
          <text
            fill="currentColor"
            fontFamily="var(--font-text), ui-sans-serif, system-ui"
            fontSize="10.4"
            fontWeight="600"
            letterSpacing="2.5"
          >
            <textPath href={`#${ring}`} startOffset="0">
              FAUSTO VÁSQUEZ CEVALLOS · ESTUDIO JURÍDICO · QUITO ·
            </textPath>
          </text>
          <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.85" />
        </>
      ) : null}
      <text
        x="100"
        y="119"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize={showRing ? 52 : 74}
        fontWeight="400"
        letterSpacing="-1"
      >
        F<tspan dx="-6" dy="7" fontStyle="italic">V</tspan>
      </text>
    </svg>
  );
}
