"use client";

import { useEffect } from "react";

export function HapticFeedback() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        ".premium-button, .contact-line a, .premium-button--ghost"
      );
      if (target && "vibrate" in navigator) {
        navigator.vibrate(6);
      }
    };
    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
