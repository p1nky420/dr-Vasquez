"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function EditorialReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    // Solo desplazamiento, sin opacity:0. El HTML servido llevaba secciones
    // enteras invisibles, que los rastreadores de IA sin JS no pueden leer.
    <motion.div
      className={className}
      initial={reduce ? false : { y: 26 }}
      whileInView={reduce ? undefined : { y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [coarsePointer, setCoarsePointer] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce || coarsePointer ? 0 : 180]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarsePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <motion.div className={className} style={{ y }}>{children}</motion.div>;
}

export function MaskReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // El texto arranca visible y solo se desplaza: es el elemento LCP y estaba
  // oculto hasta que React hidrataba, dejando el hero en negro varios segundos.
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: "22%" }}
        animate={reduce ? undefined : { y: 0 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
