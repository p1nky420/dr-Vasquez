"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import type { mountChessScene } from "./chess-scene";

/** A reversible, scroll-directed title sequence. All narrative text is SSR content. */
export function FilmOpening() {
  const section = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [still, setStill] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stillRef = useRef(false);
  const scene = useRef<ReturnType<typeof mountChessScene> | null>(null);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      setReduced(query.matches);
      stillRef.current = query.matches || still;
    };
    queueMicrotask(change);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, [still]);

  useEffect(() => {
    const el = section.current,
      canvas = host.current;
    if (!el || !canvas) return;
    let disposed = false,
      frame = 0,
      entrance = 0;
    let start = performance.now(),
      visible = true;
    const blocks = Array.from(
      el.querySelectorAll<HTMLElement>("[data-film-shot]"),
    );
    const clamp = (x: number) => Math.max(0, Math.min(1, x));
    const paint = () => {
      frame = 0;
      if (disposed || document.hidden || !visible) return;
      const scroll = clamp(
        -el.getBoundingClientRect().top / (el.offsetHeight - innerHeight),
      );
      const time = clamp((performance.now() - start) / 5200);
      entrance = Math.max(entrance, time);
      el.style.setProperty("--film-progress", String(scroll));
      el.style.setProperty(
        "--film-entrance",
        String(stillRef.current ? 1 : entrance),
      );
      blocks.forEach((block, i) => {
        const center = [0, 0.47, 0.91][i];
        const opacity = clamp(
          ((i === 0 ? 0.29 : 0.28) - Math.abs(scroll - center)) / 0.12,
        );
        block.style.opacity = String(opacity);
        block.style.visibility = opacity < 0.015 ? "hidden" : "visible";
        block.style.transform = stillRef.current
          ? "none"
          : `translateY(${(center - scroll) * 90}px) scale(${1 + (scroll - center) * 0.12})`;
        block.inert = opacity < 0.2;
      });
      scene.current?.update(
        stillRef.current ? 0.65 : 0.13 * entrance + 0.87 * scroll,
        0,
        0,
        stillRef.current,
      );
      if (time < 1 && !stillRef.current) frame = requestAnimationFrame(paint);
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(paint);
    };
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (!connection?.saveData)
      import("./chess-scene")
        .then(({ mountChessScene }) => {
          if (disposed) return;
          try {
            scene.current = mountChessScene(canvas, "film");
            start = performance.now();
            schedule();
          } catch {
            canvas.dataset.ready = "false";
          }
        })
        .catch(() => {
          canvas.dataset.ready = "false";
        });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("film-motion-change", schedule);
    document.addEventListener("visibilitychange", schedule);
    el.dataset.enhanced = "true";
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      scene.current?.destroy();
      scene.current = null;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("film-motion-change", schedule);
      document.removeEventListener("visibilitychange", schedule);
      delete el.dataset.enhanced;
    };
  }, []);

  useEffect(() => {
    stillRef.current = still || reduced;
    window.dispatchEvent(new Event("film-motion-change"));
  }, [still, reduced]);

  return (
    <section
      ref={section}
      className={`film-opening ${still || reduced ? "film-still" : ""}`}
      aria-label="Prólogo: el arte de anticiparse"
    >
      <div className="film-screen">
        <div className="film-image" aria-hidden="true">
          <div className="film-halo" />
          <div ref={host} className="film-canvas">
            <span className="film-fallback">♚</span>
          </div>
          <div className="film-atmosphere" />
          <div className="film-beam" />
          <div className="film-edge" />
        </div>
        <div className="film-top">
          <span>
            <b>FV</b> ESTUDIO JURÍDICO
          </span>
          <a href="#vision">
            Ir al estudio <ArrowUpRight size={13} />
          </a>
        </div>
        <div className="film-shot film-shot-one" data-film-shot>
          <p className="film-credit">Fausto Vásquez presenta</p>
          <p className="film-title">
            El arte de
            <br />
            <em>anticiparse.</em>
          </p>
          <p className="film-subtitle">
            Toda defensa comienza antes del primer movimiento.
          </p>
        </div>
        <div className="film-shot film-shot-two" data-film-shot>
          <p className="film-credit">Cuando cada decisión importa</p>
          <p className="film-line">
            No basta con
            <br />
            ver la jugada.
            <br />
            <em>Hay que ver más allá.</em>
          </p>
          <span className="film-divider" />
          <p className="film-subtitle">
            Leer los hechos. Comprender la prueba.
            <br />
            Anticipar la estrategia.
          </p>
        </div>
        <div className="film-shot film-shot-three" data-film-shot>
          <p className="film-credit">Rigor · Estrategia · Reserva</p>
          <p className="film-name">
            Fausto
            <br />
            <em>Vásquez.</em>
          </p>
          <p className="film-name-caption">ESTUDIO JURÍDICO / ECUADOR</p>
          <a className="film-enter" href="#vision">
            Conozca nuestra defensa <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="film-bottom">
          <span className="film-reel">
            <i /> UNA HISTORIA DE ESTRATEGIA
          </span>
          <a
            href="#film-next"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const el = section.current;
              if (el) {
                const current =
                  -el.getBoundingClientRect().top /
                  (el.offsetHeight - innerHeight);
                const next =
                  current < 0.3 ? 0.47 : current < 0.75 ? 0.91 : 1.15;
                window.scrollTo({
                  top: el.offsetTop + (el.offsetHeight - innerHeight) * next,
                  behavior: still || reduced ? "instant" : "smooth",
                });
              }
            }}
            className="film-scroll"
          >
            Deslice para continuar <ArrowDown size={14} />
          </a>
          <button
            aria-label={
              still || reduced
                ? "Activar movimiento de apertura"
                : "Pausar movimiento de apertura"
            }
            aria-pressed={still || reduced}
            disabled={reduced}
            onClick={() => setStill(!still)}
          >
            {still || reduced ? <Play size={13} /> : <Pause size={13} />}
          </button>
        </div>
        <div className="film-timeline" aria-hidden="true">
          <span />
        </div>
      </div>
      <span id="film-next" className="film-next-anchor" aria-hidden="true" />
    </section>
  );
}
