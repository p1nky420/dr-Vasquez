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
  },
];

export function EpicExperience() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const scene = useRef<ReturnType<typeof mountChessScene> | null>(null);
  const current = useRef(0);
  const motionOff = useRef(false);
  const cameraProgress = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const contact = whatsappHref(contactMessage);

  const go = useCallback((index: number, instant = false) => {
    const el = root.current;
    if (!el) return;
    const position = el.getBoundingClientRect().top + scrollY;
    const height = el.offsetHeight - innerHeight;
    const target =
      el.dataset.enhanced === "true"
        ? position + (height * index) / (acts.length - 1)
        : (document.getElementById(acts[index].id)?.offsetTop ?? position);
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
    const sections = Array.from(el.querySelectorAll<HTMLElement>(".epic-act"));
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const render = () => {
      frame = 0;
      if (disposed || document.hidden || !visible) return;
      const raw = clamp(
        -el.getBoundingClientRect().top / (el.offsetHeight - innerHeight),
      );
      const position = raw * (acts.length - 1);
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
      sections.forEach((section, i) => {
        const distance = position - i;
        const opacity = clamp((0.52 - Math.abs(distance)) / 0.16);
        section.style.opacity = String(opacity);
        section.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        section.style.transform = motionOff.current
          ? "none"
          : `translate3d(0,${-distance * 42}px,0)`;
        section.inert = i !== next;
        section.setAttribute("aria-hidden", i !== next ? "true" : "false");
      });
      if (!motionOff.current)
        cameraProgress.current = Math.min(1, raw + entrance * 0.009);
      scene.current?.update(cameraProgress.current, 0, 0, motionOff.current);
      if (entrance < 1 && !motionOff.current && raw < 0.02)
        frame = requestAnimationFrame(render);
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(render);
    };
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
      observer.disconnect();
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
      className={`epic-site ${paused || reduced ? "epic-still" : ""}`}
    >
      <div className="epic-screen">
        <div className="epic-world" aria-hidden="true">
          <div ref={canvas} className="epic-canvas">
            <span className="epic-fallback">♚</span>
          </div>
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
          <div className="epic-library">
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
              aria-label={menu ? "Cerrar capítulos" : "Explorar capítulos"}
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
            aria-label="Capítulos de la experiencia"
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
              <p className="epic-kicker">Fausto Vásquez presenta</p>
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
              <p className="epic-location">
                ABOGADO PENALISTA · QUITO, ECUADOR
              </p>
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
              data-lenis-prevent
              tabIndex={0}
              role="region"
              aria-label="Preguntas frecuentes; desplácese para ver todas"
            >
              {faqs.map((faq, i) => (
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
            </div>
          </section>
          <section
            id="consulta-rapida"
            className="epic-act epic-finale epic-center"
          >
            <div className="epic-copy">
              <p className="epic-kicker">El siguiente movimiento es suyo</p>
              <h2>
                Conversemos.
                <br />
                <em>En absoluta reserva.</em>
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
        <div className="epic-controls">
          <span className="epic-act-count">
            <b>{String(active + 1).padStart(2, "0")}</b>
            <i>/ 10</i>
            <span>{acts[active].label}</span>
          </span>
          <nav aria-label="Recorrido cinematográfico">
            {acts.map((act, i) => (
              <a
                key={act.id}
                href={`#${act.id}`}
                onClick={navigate(i)}
                aria-label={`Escena ${i + 1}: ${act.label}`}
                aria-current={active === i ? "step" : undefined}
              >
                <span />
              </a>
            ))}
          </nav>
          <button
            className="epic-next"
            onClick={() => go(active === 9 ? 0 : active + 1)}
            aria-label={
              active === 9 ? "Volver al comienzo" : "Siguiente escena"
            }
          >
            {active === 9 ? "Volver al comienzo" : "Continúe la historia"}
            <ArrowDown size={15} />
          </button>
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
