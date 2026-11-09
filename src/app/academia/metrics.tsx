"use client";

import { useEffect } from "react";

export function trackAcademyEvent(event: string, program?: string) {
  if (window.localStorage.getItem("analytics-consent") !== "accepted") return;
  window.gtag?.("event", event, {
    page_path: window.location.pathname,
    ...(program ? { program } : {}),
  });
}

export function AcademyMetrics({ program }: { program?: string }) {
  useEffect(() => {
    trackAcademyEvent(program ? "programa_abierto" : "academia_vista", program);
    if (!program) return;

    function measureModule(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open || !target.dataset.module) return;
      if (window.localStorage.getItem("analytics-consent") !== "accepted") return;
      window.gtag?.("event", "temario_expandido", { program, modulo: Number(target.dataset.module) });
    }

    document.addEventListener("toggle", measureModule, true);
    return () => document.removeEventListener("toggle", measureModule, true);
  }, [program]);

  return null;
}
