"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ScrollAnalytics() {
  useEffect(() => {
    let tracked = false;

    function handleScroll() {
      if (tracked) return;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available > 0 && window.scrollY / available >= 0.75) {
        tracked = true;
        trackEvent("scroll_75");
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
