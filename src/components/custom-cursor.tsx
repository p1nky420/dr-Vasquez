"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
  'a, button, input, select, textarea, [role="button"], .practice-catalogue__card, details summary';

/**
 * A gold ring that trails the native cursor. It augments the pointer rather
 * than replacing it: the CSS that hid the native cursor left the page with no
 * pointer at all until the first mousemove.
 *
 * Hover state uses a single delegated listener — the previous implementation
 * re-attached two listeners to every interactive element every 1.5s, forever.
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const finePointer =
      window.matchMedia("(pointer: fine)").matches && navigator.maxTouchPoints === 0;
    setIsTouchDevice(!finePointer);
    if (!finePointer) return;

    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
      setIsHovered(Boolean((event.target as Element | null)?.closest?.(INTERACTIVE)));
    };

    const hide = () => setIsVisible(false);
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 border border-[#ecc058] rounded-full pointer-events-none z-[99999] origin-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.6 : isClicking ? 0.8 : 1,
          opacity: 0.85,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#ecc058] rounded-full pointer-events-none z-[99999] origin-center -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY, scale: isHovered ? 0.5 : 1, opacity: 0.9 }}
      />
    </>
  );
}
