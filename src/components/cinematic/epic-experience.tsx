"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Pause,
  Play,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { faqs, serviceCategories } from "@/lib/home-content";
import {
  contactMessage,
  phoneDisplay,
  phoneHref,
  whatsappHref,
} from "@/lib/site";
import { trackCta, trackEvent } from "@/lib/analytics";
import type { mountChessScene } from "./chess-scene";
import "./epic-experience.css";

const widePortrait = getImageProps({
  src: "/fausto-plan-despacho.jpg",
  alt: "",
  fill: true,
  sizes: "100vw",
}).props;
const tallPortrait = getImageProps({
  src: "/fausto-plan-retrato.jpg",
  alt: "",
  fill: true,
  sizes: "100vw",
}).props;

const acts = [
  { id: "vision", label: "El primer movimiento" },
  { id: "estrategia", label: "El método" },
  { id: "penal-economico", label: "Penal económico" },
  { id: "defensa-penal", label: "Defensa estratégica" },
  { id: "consultoria", label: "Prevención" },
  { id: "constitucional", label: "Las garantías" },
  { id: "el-estudio", label: "El jurista" },
  { id: "conocimiento", label: "El conocimiento" },
  { id: "faq", label: "La claridad" },
  { id: "consulta-rapida", label: "Su siguiente movimiento" },
];
const serviceScenes = [
  {
    source: 1,
    title: (
      <>
        Donde el patrimonio
        <br />
        exige <em>perspectiva.</em>
      </>
    ),
    route: "/derecho-penal-economico",
    visual: "economic",
    note: "Empresa · Patrimonio · Reputación",
    principle: "Comprender el escenario",
  },
  {
    source: 0,
    title: (
      <>
        Cada pieza cuenta.
        <br />
        <em>Cada decisión, también.</em>
      </>
    ),
    route: "/areas-de-practica/litigio-penal-estrategico",
    visual: "defense",
    note: "Hechos · Prueba · Teoría del caso",
    principle: "Construir una posición de defensa",
  },
  {
    source: 2,
    title: (
      <>
        La mejor perspectiva
        <br />
        empieza <em>antes.</em>
      </>
    ),
    route: "/areas-de-practica",
    visual: "prevention",
    note: "Anticipación · Análisis · Criterio",
    principle: "Trazar la ruta antes de avanzar",
  },
  {
    source: 3,
    title: (
      <>
        Hay principios
        <br />
        que no se <em>negocian.</em>
      </>
    ),
    route: "/areas-de-practica/constitucional-penal",
    visual: "rights",
    note: "Libertad · Debido proceso · Garantías",
    principle: "Preservar el equilibrio",
  },
];

export function EpicExperience() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const scene = useRef<ReturnType<typeof mountChessScene> | null>(null);
  const current = useRef(0);
  const motionOff = useRef(false);
  const cameraProgress = useRef(0);
  const finaleProgress = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const contact = whatsappHref(contactMessage);

  const go = useCallback((index: number, instant = false) => {
    const el = root.current;
    if (!el) return;
    const target = (document.getElementById(acts[index].id)?.getBoundingClientRect().top ?? 0) + scrollY - 80;
    window.scrollTo({
      top: target,
      behavior: instant || motionOff.current ? "instant" : "smooth",
    });
    history.replaceState(null, "", `#${acts[index].id}`);
    setMenu(false);
  }, []);
  const navigate =
    (index: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      event.stopPropagation();
      go(index);
    };

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => {
      setReduced(query.matches);
      motionOff.current = query.matches || paused;
      window.dispatchEvent(new Event("epic-motion"));
    };
    queueMicrotask(changed);
    query.addEventListener("change", changed);
    return () => query.removeEventListener("change", changed);
  }, [paused]);
  useEffect(() => {
    if (!menu) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [menu]);

  useEffect(() => {
    const el = root.current,
      host = canvas.current;
    if (!el || !host) return;
    let disposed = false,
      frame = 0,
      visible = true,
      entrance = 0;
    let started = performance.now();
    let cursorX = 0, cursorY = 0, contactHover = 0;
    const finale = el.querySelector<HTMLElement>(".epic-endgame");
    const sections = Array.from(el.querySelectorAll<HTMLElement>(".epic-act"));
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const render = () => {
      frame = 0;
      if (disposed || document.hidden || !visible) return;
      // Interpolate camera positions from the actual document sections, including
      // expanded FAQ content; the page itself remains in normal scroll flow.
      const anchor = 80;
      const tops = sections.map(section => section.getBoundingClientRect().top);
      let index = 0;
      while (index < tops.length - 1 && tops[index + 1] <= anchor) index++;
      const span = index < tops.length - 1 ? tops[index + 1] - tops[index] : innerHeight;
      const position = Math.min(acts.length - 1, index + clamp((anchor - tops[index]) / span));
      const raw = position / (acts.length - 1);
      const next = Math.round(position);
      if (next !== current.current) {
        current.current = next;
        setActive(next);
      }
      entrance = Math.max(
        entrance,
        clamp((performance.now() - started) / 4500),
      );
      el.style.setProperty("--epic-progress", String(raw));
      el.style.setProperty(
        "--portrait-presence",
        String(clamp(1 - Math.abs(position - 6) * 1.5)),
      );
      el.style.setProperty(
        "--book-presence",
        String(clamp(1 - Math.abs(position - 7) * 1.6)),
      );
      el.style.setProperty("--book-turn", `${-22 + (position - 7) * 28}deg`);
      el.style.setProperty(
        "--reading-shade",
        String(
          Math.max(
            clamp(1 - Math.abs(position - 8) * 1.8),
            clamp(1 - Math.abs(position - 7) * 1.7) * 0.45,
          ),
        ),
      );
      el.style.setProperty(
        "--photo-zoom",
        String(motionOff.current ? 1 : 1.06 + (position - 6) * 0.07),
      );
      el.dataset.act = String(next);
      if (!motionOff.current)
        cameraProgress.current = Math.min(1, raw + entrance * 0.009);
      const finish = finale ? clamp((innerHeight - finale.getBoundingClientRect().top) / finale.offsetHeight) : 0;
      if (!motionOff.current) finaleProgress.current = finish;
      el.style.setProperty("--finale-reveal", String(motionOff.current ? 1 : clamp((finish - 0.42) / 0.3)));
      scene.current?.update(cameraProgress.current, motionOff.current ? 0 : cursorX, motionOff.current ? 0 : cursorY, motionOff.current, finaleProgress.current, contactHover);
      if (entrance < 1 && !motionOff.current && raw < 0.02)
        frame = requestAnimationFrame(render);
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(render);
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || motionOff.current) return;
      cursorX = event.clientX / innerWidth * 2 - 1;
      cursorY = event.clientY / innerHeight * 2 - 1;
      contactHover = event.target instanceof Element && event.target.closest(".epic-final-cta") ? 1 : 0;
      schedule();
    };
    const resetPointer = () => { cursorX = 0; cursorY = 0; contactHover = 0; schedule(); };
    window.addEventListener("pointermove", pointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    el.dataset.enhanced = "true";
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (!connection?.saveData)
      import("./chess-scene")
        .then(({ mountChessScene }) => {
          if (disposed) return;
          try {
            scene.current = mountChessScene(host, "epic");
            started = performance.now();
            schedule();
          } catch {
            host.dataset.ready = "false";
          }
        })
        .catch(() => {
          host.dataset.ready = "false";
        });
    const hash = () => {
      const alias =
        location.hash === "#especialidades"
          ? 2
          : acts.findIndex((act) => `#${act.id}` === location.hash);
      if (alias >= 0) go(alias, true);
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(el);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", hash);
    window.addEventListener("epic-motion", schedule);
    document.addEventListener("visibilitychange", schedule);
    hash();
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
      observer.disconnect();
      resizeObserver.disconnect();
      scene.current?.destroy();
      scene.current = null;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", hash);
      window.removeEventListener("epic-motion", schedule);
      document.removeEventListener("visibilitychange", schedule);
      delete el.dataset.enhanced;
    };
  }, [go]);
  const track = () => {
    trackCta("epic_finale", "whatsapp");
    trackEvent("whatsapp_click", { location: "epic_finale" });
  };

  return (
    <div
      ref={root}
      className={`epic-site epic-flow ${paused || reduced ? "epic-still" : ""}`}
    >
      <div className="epic-screen">
        <div className="epic-world" aria-hidden="true">
          <div ref={canvas} className="epic-canvas">
            <span className="epic-fallback">♚</span>
          </div>
          <div className="epic-vignette" />
          <div className="epic-reading-shade" />
          <div className="epic-horizon" />
        </div>
        <header className="epic-header">
          <a
            href="#vision"
            onClick={navigate(0)}
            className="epic-logo"
            aria-label="Fausto Vásquez, primer movimiento"
          >
            <b>FV</b>
            <span>
              FAUSTO VÁSQUEZ<small>ESTUDIO JURÍDICO</small>
            </span>
          </a>
          <nav className="epic-primary-nav" aria-label="Navegación principal">
            <a href="#penal-economico" onClick={navigate(2)}>Especialidades</a>
            <a href="#el-estudio" onClick={navigate(6)}>El estudio</a>
            <Link href="/publicaciones">Publicaciones</Link>
          </nav>
          <div>
            <a
              className="epic-contact-shortcut"
              href="#consulta-rapida"
              onClick={navigate(9)}
            >
              Consulta reservada <ArrowUpRight size={14} />
            </a>
            <button
              ref={menuButton}
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-controls="epic-index"
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            >
              {menu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </header>
        {menu && (
          <nav
            id="epic-index"
            data-lenis-prevent
            className="epic-index"
            aria-label="Navegación del sitio"
          >
            {acts.map((act, i) => (
              <a
                key={act.id}
                href={`#${act.id}`}
                onClick={navigate(i)}
                aria-current={active === i ? "step" : undefined}
              >
                <small>{String(i + 1).padStart(2, "0")}</small>
                {act.label}
                <ArrowUpRight size={17} />
              </a>
            ))}
          </nav>
        )}
        <div className="epic-acts">
          <section
            id="vision"
            className="epic-act epic-intro"
            aria-label="El primer movimiento"
          >
            <div className="epic-copy">
              <p className="epic-kicker">Estrategia penal · Quito, Ecuador</p>
              <h1>
                El arte de
                <br />
                <em>anticiparse.</em>
              </h1>
              <p className="epic-description">
                Toda defensa comienza antes
                <br />
                del primer movimiento.
              </p>
              <div className="epic-hero-actions">
                <a className="epic-link" href="#consulta-rapida" onClick={navigate(9)}>Consultar mi caso <ArrowUpRight size={18} /></a>
                <a className="epic-scroll-link" href="#estrategia" onClick={navigate(1)}>Descubrir el estudio <ArrowDown size={16} /></a>
              </div>
            </div>
          </section>
          <section id="estrategia" className="epic-act epic-center">
            <div className="epic-copy">
              <p className="epic-kicker">I / Ver más allá</p>
              <h2>
                Una defensa
                <br />
                no se improvisa.
                <br />
                <em>Se construye.</em>
              </h2>
              <p className="epic-description">
                Leer los hechos. Comprender la prueba.
                <br />
                Dar sentido a cada pieza.
              </p>
              <div className="epic-method">
                <span>
                  <small>01</small>Expediente
                </span>
                <span>
                  <small>02</small>Estrategia
                </span>
                <span>
                  <small>03</small>Audiencia
                </span>
              </div>
            </div>
          </section>
          <div className="epic-practice-heading">
            <p className="epic-kicker">Áreas de práctica</p>
            <h2>Una mirada integral.<br /><em>Una estrategia propia.</em></h2>
            <p>Cada asunto exige una lectura distinta. Explore cómo abordamos el suyo.</p>
          </div>
          {serviceScenes.map((item, index) => {
            const service = serviceCategories[item.source];
            return (
              <section
                id={service.id}
                className={`epic-act epic-service epic-service-${item.visual} ${index % 2 === 0 ? "epic-align-right" : ""}`}
                key={service.id}
              >
                <span className="epic-ghost-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="epic-copy">
                  <p className="epic-kicker">II / {service.title}</p>
                  <h2>{item.title}</h2>
                  <p className="epic-description">{service.description}</p>
                  <p className="epic-practice-note">{item.note}</p>
                  <p className="epic-principle"><span aria-hidden="true" />{item.principle}</p>
                  <Link className="epic-link" href={item.route}>
                    Explorar esta especialidad <ArrowUpRight size={17} />
                  </Link>
                  {index === 1 && (
                    <Link
                      className="epic-sub-link"
                      href="/areas-de-practica/lavado-de-activos"
                    >
                      Lavado de activos y delitos financieros{" "}
                      <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
              </section>
            );
          })}
          <section
            id="el-estudio"
            className="epic-act epic-jurist epic-align-right"
          >
          <div className="epic-portrait">
            <picture>
              <source
                media="(max-width: 760px)"
                srcSet={tallPortrait.srcSet}
                sizes={tallPortrait.sizes}
              />
              <img {...widePortrait} alt="" />
            </picture>
            <div />
          </div>

            <div className="epic-copy">
              <p className="epic-kicker">
                III / El criterio detrás de la defensa
              </p>
              <h2>
                Fausto
                <br />
                <em>Vásquez.</em>
              </h2>
              <p className="epic-description">
                El rigor se estudia.
                <br />
                La confianza se construye.
              </p>
              <p className="epic-support">
                Defensa penal, docencia y pensamiento jurídico. Una práctica que
                reúne análisis de la prueba, preparación del litigio y atención
                personal.
              </p>
              <div className="epic-jurist-fields" aria-label="Práctica profesional">
                <span>Defensa penal</span><span>Docencia</span><span>Pensamiento jurídico</span>
              </div>
              <Link className="epic-link" href="/firma">
                Conocer su trayectoria <ArrowUpRight size={17} />
              </Link>
            </div>
            <span className="epic-photo-credit">
              EN SU DESPACHO / QUITO, ECUADOR
            </span>
          </section>
          <section
            id="conocimiento"
            className="epic-act epic-align-right epic-knowledge"
          >
          <div className="epic-library" aria-hidden="true">
            <div className="epic-volume">
              <span>FV</span>
              <small>
                DOGMÁTICA
                <br />
                PENAL
              </small>
              <i>Pensamiento jurídico</i>
              <b>Fausto Vásquez</b>
            </div>
            <div className="epic-volume epic-volume-back" />
            <div className="epic-volume epic-volume-last" />
          </div>

            <div className="epic-copy">
              <p className="epic-kicker">IV / El conocimiento deja huella</p>
              <h2>
                Las ideas
                <br />
                también mueven
                <br />
                <em>el tablero.</em>
              </h2>
              <p className="epic-description">
                Estudiar. Escribir. Enseñar.
                <br />
                El pensamiento jurídico como fundamento de la estrategia.
              </p>
              <div className="epic-knowledge-links">
                <Link className="epic-link" href="/publicaciones">
                  Biblioteca jurídica <ArrowUpRight size={17} />
                </Link>
                <Link className="epic-link" href="/academia">
                  Academia y formación <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </section>
          <section id="faq" className="epic-act epic-clarity">
            <div className="epic-copy">
              <p className="epic-kicker">
                V / La serenidad empieza con claridad
              </p>
              <h2>
                Antes de actuar,
                <br />
                <em>comprender.</em>
              </h2>
              <p className="epic-description">
                Preguntas que merecen una respuesta.
                <br />
                El primer paso también es parte de la estrategia.
              </p>
            </div>
            <div
              className="epic-questions"
              role="region"
              aria-label="Preguntas frecuentes"
            >
              {faqs.slice(0, 6).map((faq, i) => (
                <details key={faq.question}>
                  <summary>
                    <span>
                      <small>{String(i + 1).padStart(2, "0")}</small>
                      {faq.question}
                    </span>
                    <Plus size={16} />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
              <details className="epic-more-questions">
                <summary>Ver todas las preguntas <Plus size={16} /></summary>
                <div>              {faqs.slice(6).map((faq, i) => (
                <details key={faq.question}>
                  <summary>
                    <span>
                      <small>{String(i + 7).padStart(2, "0")}</small>
                      {faq.question}
                    </span>
                    <Plus size={16} />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}</div>
              </details>
            </div>
          </section>
          <section id="ultima-jugada" className="epic-endgame" aria-label="La última jugada">
            <div className="epic-endgame-stage">
              <p className="epic-kicker">Toda estrategia tiene un propósito</p>
              <h2>Hacer que cada<br /><em>movimiento cuente.</em></h2>
              <div className="epic-endgame-caption"><span>Anticipar.</span><span>Proteger.</span><span>Actuar.</span></div>
              <a href="#consulta-rapida" onClick={navigate(9)} className="epic-endgame-skip">Ir a la consulta <ArrowDown size={15} /></a>
            </div>
          </section>
          <section
            id="consulta-rapida"
            className="epic-act epic-finale epic-center"
          >
            <div className="epic-copy">
              <p className="epic-kicker">Conversemos. En absoluta reserva.</p>
              <h2>
                Su siguiente
                <br />
                <em>movimiento.</em>
              </h2>
              <p className="epic-description">
                Su caso merece rigor, criterio y serenidad.
                <br />
                La estrategia comienza aquí.
              </p>
              <a
                className="epic-final-cta"
                href={contact}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track}
              >
                Solicitar evaluación reservada{" "}
                <span>
                  <ArrowUpRight size={26} />
                </span>
              </a>
              <div className="epic-final-options">
                <Link href="/contacto">
                  Prefiero el formulario <ArrowRight size={13} />
                </Link>
                <a href={phoneHref}>{phoneDisplay}</a>
              </div>
              <p className="epic-confidential">
                Primer contacto sin documentos confidenciales.
              </p>
            </div>
            <footer className="epic-credits">
              <span>
                FAUSTO VÁSQUEZ · ESTUDIO JURÍDICO
                <br />
                <small>
                  Excelencia académica. Litigio con propósito. Defensa con
                  estrategia.
                </small>
              </span>
              <nav aria-label="Información legal">
                <Link href="/privacidad">Privacidad</Link>
                <Link href="/aviso-legal">Aviso legal</Link>
                <Link href="/contacto">Contacto</Link>
              </nav>
              <p>
                Contenido informativo. No sustituye asesoría jurídica ni
                constituye patrocinio.
              </p>
            </footer>
          </section>
        </div>
        <div className="epic-motion-toggle">
          <button
            className="epic-pause"
            onClick={() => setPaused(!paused)}
            disabled={reduced}
            aria-pressed={paused || reduced}
            aria-label={
              paused || reduced ? "Activar movimiento" : "Pausar movimiento"
            }
          >
            {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
}
