"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Bloques que entran con un desplazamiento lento al aparecer en pantalla.
const targets = [
  ".fv-authority__facts li",
  ".fv-authority__press",
  ".fv-credentials__intro",
  ".fv-credentials__rail",
  ".sv-section-heading",
  ".sv-explorer",
  ".fv-method__head",
  ".fv-method__steps li",
  ".fv-city__copy",
  ".sv-jurist__frame",
  ".sv-jurist__body",
  ".sv-contact__intro",
  ".fv-contact-card",
  ".sv-faq details",
  ".sv-close__copy",
  ".sv-close__portrait",
  ".in-heading",
  ".in-wrap > :not(.in-heading)",
].join(",");

/**
 * El contenido llega visible en el HTML del servidor (lo leen los rastreadores
 * sin JS). Solo al hidratar se ocultan los bloques que aún están fuera de la
 * pantalla, para que entren al hacer scroll. Lo que ya se ve no se toca.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(targets))
      .filter(element => element.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (!elements.length) return;

    const siblingIndex = new Map<Element, number>();
    for (const element of elements) {
      const parent = element.parentElement;
      const index = parent ? siblingIndex.get(parent) ?? 0 : 0;
      if (parent) siblingIndex.set(parent, index + 1);
      element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 90}ms`);
      element.dataset.reveal = "";
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-reveal", "in");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    elements.forEach(element => observer.observe(element));

    return () => {
      observer.disconnect();
      elements.forEach(element => {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
