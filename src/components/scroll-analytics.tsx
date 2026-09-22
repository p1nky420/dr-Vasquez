"use client";

import { useEffect } from "react";
import { trackEvent, trackOnce } from "@/lib/analytics";

const DEPTH_MILESTONES = [10, 25, 50, 75, 90, 100] as const;

/**
 * Measures how far people actually get down the page, which sections they
 * reach, and every outbound contact click — the inputs a heatmap needs.
 *
 * Runs on every page and reports through `trackEvent`, so it works even when
 * GA4 has not been granted consent (Vercel Analytics still records it).
 */
export function ScrollAnalytics() {
  useEffect(() => {
    let maxDepth = 0;
    let ticking = false;

    const readDepth = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return 100;
      return Math.min(100, Math.round((window.scrollY / available) * 100));
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const depth = readDepth();
        if (depth <= maxDepth) return;
        maxDepth = depth;
        for (const milestone of DEPTH_MILESTONES) {
          if (depth >= milestone) {
            trackOnce(`scroll_${milestone}`, { path: window.location.pathname });
          }
        }
      });
    };

    // Which sections were actually seen, and in what order.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          trackOnce(`section_view:${entry.target.id}`, {
            section: entry.target.id,
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    sections.forEach((section) => observer.observe(section));

    // Every contact intent, wherever it is clicked from.
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const location =
        link.closest<HTMLElement>("section[id]")?.id ??
        (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "floating");

      if (href.startsWith("https://wa.me/")) {
        trackEvent("whatsapp_click", { location, depth: readDepth() });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { location, depth: readDepth() });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { location });
      }
    };

    // Exit depth: the single most useful number for deciding what to cut.
    const handleExit = () => {
      trackEvent("page_exit", {
        depth: maxDepth,
        path: window.location.pathname,
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    window.addEventListener("pagehide", handleExit, { once: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("pagehide", handleExit);
      observer.disconnect();
    };
  }, []);

  return null;
}
