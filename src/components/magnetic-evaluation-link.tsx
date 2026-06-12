"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

export function MagneticEvaluationLink({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 170, damping: 18, mass: 0.35 });

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.16);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.16);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href="#admision"
      data-evaluation-trigger
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.a>
  );
}
