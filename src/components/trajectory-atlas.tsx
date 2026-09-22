"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export type TrajectoryNode = {
  number: string;
  country: string;
  institution: string;
  title: string;
  description: string;
  logo?: string;
  image?: string;
};

/**
 * La trayectoria ocupaba cinco pantallas completas apiladas — 4.209 px de
 * scroll para cinco datos. Aquí es una sola pieza: un expediente de cinco
 * pestañas que el visitante recorre.
 *
 * Accesible por teclado (flechas y Home/End) y navegable con roles de tablist,
 * porque una pieza interactiva que solo funciona con ratón no es una pieza
 * terminada.
 */
export function TrajectoryAtlas({ nodes }: { nodes: TrajectoryNode[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const select = useCallback(
    (index: number, viaKeyboard = false) => {
      const next = (index + nodes.length) % nodes.length;
      setActive(next);
      if (viaKeyboard) tabsRef.current[next]?.focus();
      trackEvent("trajectory_open", { node: nodes[next].country });
    },
    [nodes],
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(active + 1, true);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(active - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(nodes.length - 1, true);
    }
  };

  // Precarga los logos para que el cambio de pestaña no parpadee.
  useEffect(() => {
    nodes.forEach((node) => {
      if (!node.logo) return;
      const img = new window.Image();
      img.src = node.logo;
    });
  }, [nodes]);

  const node = nodes[active];

  return (
    <div className="atlas">
      {/* Riel de pestañas: el índice del expediente */}
      <div
        className="atlas__rail"
        role="tablist"
        aria-label="Etapas de la trayectoria"
        onKeyDown={handleKeyDown}
      >
        {nodes.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.number}
              ref={(element) => {
                tabsRef.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`atlas-tab-${index}`}
              aria-selected={isActive}
              aria-controls="atlas-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              className={`atlas__tab${isActive ? " atlas__tab--active" : ""}`}
            >
              <span className="atlas__tab-num">{item.number}</span>
              <span className="atlas__tab-country">{item.country}</span>
              {isActive && !reduce ? (
                <motion.span layoutId="atlas-marker" className="atlas__marker" />
              ) : null}
              {isActive && reduce ? <span className="atlas__marker" /> : null}
            </button>
          );
        })}
      </div>

      {/* Panel: la página del expediente */}
      <div
        className="atlas__panel"
        id="atlas-panel"
        role="tabpanel"
        aria-labelledby={`atlas-tab-${active}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={node.number}
            className="atlas__page"
            initial={reduce ? undefined : { opacity: 0, x: 18 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -10, transition: { duration: 0.16 } }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="atlas__meta">
              {node.logo ? (
                <div className="atlas__logo">
                  <Image
                    src={node.logo}
                    alt={node.institution}
                    fill
                    sizes="180px"
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <span className="atlas__monogram">FV</span>
              )}
              <div>
                <p className="atlas__institution">{node.institution}</p>
                <p className="atlas__country">{node.country}</p>
              </div>
            </div>

            <h3 className="atlas__title">{node.title}</h3>
            <p className="atlas__text">{node.description}</p>

            <p className="atlas__index" aria-hidden="true">
              {node.number} <span>/ {nodes[nodes.length - 1].number}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Numeral gigante de fondo: la marca de agua del expediente */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`watermark-${node.number}`}
            aria-hidden="true"
            className="atlas__watermark"
            initial={reduce ? undefined : { opacity: 0, scale: 1.08 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {node.number}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
