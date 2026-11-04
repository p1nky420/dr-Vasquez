"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "Leer el expediente antes que nadie",
    text: "Cada hoja, cada pericia, cada fecha. La defensa empieza por conocer el caso mejor que quien acusa.",
  },
  {
    title: "Anticipar la jugada de la acusación",
    text: "Identificar qué intentará probar Fiscalía y en qué etapa, para llegar preparados a cada decisión.",
  },
  {
    title: "Construir la defensa pieza por pieza",
    text: "Teoría del caso, prueba, peritos y argumentos dogmáticos, ordenados en una sola estrategia.",
  },
  {
    title: "Dirigir personalmente cada audiencia",
    text: "Los momentos decisivos los conduce el Dr. Vásquez. No se delegan.",
  },
];

/**
 * El único momento de ajedrez de la portada. La pieza se abre y gira a
 * medida que se avanza en el método; si el dispositivo no tiene WebGL,
 * pidió ahorrar datos o prefiere menos movimiento, queda el texto solo.
 */
export function MethodChess() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scene, setScene] = useState(false);

  useEffect(() => {
    const host = stage.current;
    const root = section.current;
    if (!host || !root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const canvas = document.createElement("canvas");
    const webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    if (reduce || saveData || !webgl) return;

    let api: { update: (p: number, x?: number, y?: number) => void; destroy: () => void } | null = null;
    let cancelled = false;
    let pointerX = 0;
    let pointerY = 0;

    const progress = () => {
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      return total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
    };
    const onScroll = () => api?.update(progress() * 0.38, pointerX, pointerY);
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      onScroll();
    };

    import("./chess-scene").then(({ mountChessScene }) => {
      if (cancelled) return;
      api = mountChessScene(host, "story");
      setScene(true);
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      api?.destroy();
    };
  }, []);

  useEffect(() => {
    const items = section.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-step")));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={section} id="metodo" className="fx-method" aria-labelledby="metodo-titulo">
      <div className="fx-method__stage" aria-hidden="true">
        <div ref={stage} className="fx-method__canvas" data-scene={scene ? "on" : "off"} />
        <div className="fx-method__count">
          <span>{["I", "II", "III", "IV"][active]}</span>
          <span>/ IV</span>
        </div>
      </div>
      <div className="fx-method__text">
        <header className="fx-method__head">
          <p className="fx-eyebrow">El método</p>
          <h2 id="metodo-titulo" className="fx-h2">
            Una defensa se gana <em>antes</em> de la audiencia.
          </h2>
        </header>
        <ol className="fx-method__steps">
          {steps.map((step, index) => (
            <li key={step.title} data-step={index} data-active={active === index}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
