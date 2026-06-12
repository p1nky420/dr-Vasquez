"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const precisePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches || !precisePointer.matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
      anchors: {
        offset: -88,
      },
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
