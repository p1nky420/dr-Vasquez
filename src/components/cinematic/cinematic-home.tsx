"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Menu,
  X,
  Pause,
  Play,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { faqs, serviceCategories } from "@/lib/home-content";
import {
  contactMessage,
  phoneDisplay,
  phoneHref,
  whatsappHref,
} from "@/lib/site";
import { trackCta, trackEvent } from "@/lib/analytics";
import type { mountChessScene } from "./chess-scene";
import { FilmOpening } from "./film-opening";
import "./cinematic.css";

const chapters = ["La decisión", "La lectura", "La estrategia", "Su defensa"];
const chapterIds = ["vision", "lectura", "estrategia", "defensa"];
const serviceLinks = [
  "/areas-de-practica/litigio-penal-estrategico",
  "/derecho-penal-economico",
  "/areas-de-practica",
  "/areas-de-practica/constitucional-penal",
];

function Monogram() {
  return (
    <span className="cine-monogram" aria-hidden="true">
      <span>FV</span>
      <small>◆ ◆ ◆</small>
    </span>
  );
}

function ChessFallback() {
  return (
    <svg
      className="cine-chess-fallback"
      viewBox="0 0 500 600"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="chess-metal"
          x1="160"
          y1="150"
          x2="360"
          y2="350"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e0c48a" />
          <stop offset=".26" stopColor="#8c703f" />
          <stop offset=".55" stopColor="#24303b" />
          <stop offset=".8" stopColor="#8b774e" />
          <stop offset="1" stopColor="#dec691" />
        </linearGradient>
        <linearGradient
          id="chess-body"
          x1="150"
          y1="0"
          x2="320"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0f1821" />
          <stop offset=".35" stopColor="#51606a" />
          <stop offset=".55" stopColor="#1a2530" />
          <stop offset="1" stopColor="#090c12" />
        </linearGradient>
      </defs>
      <ellipse
        cx="250"
        cy="300"
        rx="209"
        ry="225"
        stroke="#c8a45d"
        strokeOpacity=".25"
        transform="rotate(-25 250 300)"
      />
      <path
        d="M100 510 250 460 420 510 250 565Z"
        fill="#151d28"
        stroke="#c8a45d"
        strokeOpacity=".5"
      />
      <path
        d="M174 490Q162 470 180 447L195 431Q220 385 222 306L206 285V267H292V285L276 306Q280 385 305 431L320 447Q338 470 326 490Z"
        fill="url(#chess-body)"
        stroke="#8c7549"
      />
      <path
        d="M198 261 212 230 206 205H292L286 230 301 261Z M240 205V149H223V133H240V113H258V133H276V149H258V205Z"
        fill="url(#chess-metal)"
      />
      <path
        d="M177 466H323M190 442H310M208 277H291"
        stroke="#c8a45d"
        strokeWidth="3"
      />
    </svg>
  );
}

export function CinematicHome() {
  const root = useRef<HTMLDivElement>(null);
  const journey = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const scene = useRef<ReturnType<typeof mountChessScene> | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    queueMicrotask(change);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [menuOpen]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    element
      .querySelectorAll("[data-reveal]")
      .forEach((node) => observer.observe(node));
    element.classList.add("is-enhanced");
    return () => {
      observer.disconnect();
      element.classList.remove("is-enhanced");
    };
  }, []);

  useEffect(() => {
    const host = canvas.current;
    if (!host) return;
    let disposed = false;
    // Respect data-saving clients and keep the server-rendered artwork as fallback.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;
    import("./chess-scene")
      .then(({ mountChessScene }) => {
        if (disposed) return;
        try {
          scene.current = mountChessScene(host);
          window.dispatchEvent(new Event("cinematic-scene-ready"));
        } catch {
          host.dataset.ready = "false";
        }
      })
      .catch(() => {
        host.dataset.ready = "false";
      });
    return () => {
      disposed = true;
      scene.current?.destroy();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let lastChapter = -1;
    let px = 0,
      py = 0;
    const update = () => {
      frame = 0;
      if (!journey.current) return;
      const rect = journey.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (journey.current.offsetHeight - innerHeight)),
      );
      const chapter = Math.min(3, Math.round(progress * 3));
      if (chapter !== lastChapter) {
        lastChapter = chapter;
        setActive(chapter);
      }
      journey.current.style.setProperty("--story-progress", String(progress));
      journey.current.style.setProperty(
        "--copy-shade",
        String(Math.max(0, 1 - Math.abs(progress - 0.64) / 0.23)),
      );
      root.current?.setAttribute(
        "data-past-hero",
        String(-rect.top > innerHeight * 0.7),
      );
      scene.current?.update(
        paused || reduced ? 0 : progress,
        paused || reduced ? 0 : px,
        paused || reduced ? 0 : py,
        paused || reduced,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      px = event.clientX / innerWidth - 0.5;
      py = event.clientY / innerHeight - 0.5;
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("cinematic-scene-ready", schedule);
    if (!paused && !reduced)
      window.addEventListener("pointermove", pointer, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("cinematic-scene-ready", schedule);
      window.removeEventListener("pointermove", pointer);
    };
  }, [paused, reduced]);

  const contact = whatsappHref(contactMessage);
  const track = (placement: string) => {
    trackCta(placement, "whatsapp");
    trackEvent("whatsapp_click", { location: placement });
  };

  return (
    <div
      ref={root}
      className={`cinema ${paused || reduced ? "cinema-still" : ""}`}
    >
      <FilmOpening />
      <header className="cine-header">
        <Link
          className="cine-brand"
          href="/"
          aria-label="Fausto Vásquez, inicio"
        >
          <Monogram />
          <span>
            Fausto Vásquez<small>Estudio Jurídico</small>
          </span>
        </Link>
        <nav className="cine-desktop-nav" aria-label="Navegación principal">
          <a href="#estrategia">El método</a>
          <a href="#especialidades">Especialidades</a>
          <a href="#el-estudio">El estudio</a>
        </nav>
        <a className="cine-header-cta" href="#consulta-rapida">
          Consulta reservada <ArrowUpRight size={15} />
        </a>
        <button
          ref={menuButton}
          type="button"
          className="cine-menu-button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="cine-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav
            id="cine-mobile-menu"
            className="cine-mobile-menu"
            aria-label="Navegación móvil"
          >
            {[
              ["El método", "#estrategia"],
              ["Especialidades", "#especialidades"],
              ["El estudio", "#el-estudio"],
              ["Academia", "/academia"],
              ["Publicaciones", "/publicaciones"],
              ["Consulta reservada", "#consulta-rapida"],
            ].map(([name, href], i) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                <small>0{i + 1}</small>
                {name}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </nav>
        )}
      </header>

      <section
        ref={journey}
        className="cine-journey"
        aria-label="Una defensa construida con estrategia"
      >
        <div className="cine-stage-shell" aria-hidden="true">
          <div className="cine-stage">
            <div className="cine-aura" />
            <div ref={canvas} className="cine-canvas">
              <ChessFallback />
            </div>
            <div className="cine-stage-shade" />
            <div className="cine-copy-shade" />
            <span className="cine-object-label">
              ESTRATEGIA, EN CADA MOVIMIENTO.
            </span>
            <span className="cine-coordinates">
              QUITO · ECUADOR
              <br />
              00° 12′ S / 78° 29′ O
            </span>
          </div>
        </div>
        <div className="cine-chapters">
          <section id="vision" className="cine-chapter cine-hero">
            <div className="cine-chapter-copy">
              <p className="cine-eyebrow">
                <span /> Abogado penalista · Quito, Ecuador
              </p>
              <h1>
                La estrategia
                <br />
                <em>cambia</em>
                <br />
                el rumbo.
              </h1>
              <p className="cine-lede">
                Criterio para entender la complejidad.
                <br />
                Estrategia para defender lo esencial.
              </p>
              <a className="cine-button" href="#consulta-rapida">
                Solicitar evaluación reservada <ArrowUpRight size={18} />
              </a>
              <a className="cine-scroll-cue" href="#lectura">
                <span>
                  <ArrowDown size={15} />
                </span>
                Una defensa empieza aquí
              </a>
            </div>
            <span className="cine-hero-side">RIGOR. ESTRATEGIA. RESERVA.</span>
          </section>
          <section id="lectura" className="cine-chapter">
            <div className="cine-chapter-copy" data-reveal>
              <p className="cine-eyebrow">01 / Comprender antes de actuar</p>
              <h2>
                Un caso complejo
                <br />
                no se improvisa.
                <br />
                <em>Se estudia.</em>
              </h2>
              <p className="cine-lede">
                Detrás de cada investigación hay hechos, decisiones y
                documentos. La primera tarea es leerlos con rigor.
              </p>
              <div className="cine-inline-points">
                <span>Los hechos</span>
                <span>La prueba</span>
                <span>El contexto</span>
              </div>
            </div>
          </section>
          <section id="estrategia" className="cine-chapter cine-chapter-right">
            <div className="cine-chapter-copy" data-reveal>
              <p className="cine-eyebrow">02 / Dar sentido a cada pieza</p>
              <h2>
                Ver el conjunto.
                <br />
                <em>Anticipar</em>
                <br />
                el movimiento.
              </h2>
              <p className="cine-lede">
                Dogmática penal, análisis probatorio y preparación procesal.
                Cada decisión responde a una teoría de defensa.
              </p>
              <ol className="cine-method">
                <li>
                  <span>01</span>Lectura del expediente
                </li>
                <li>
                  <span>02</span>Construcción de la estrategia
                </li>
                <li>
                  <span>03</span>Preparación de cada audiencia
                </li>
              </ol>
            </div>
          </section>
          <section id="defensa" className="cine-chapter">
            <div className="cine-chapter-copy" data-reveal>
              <p className="cine-eyebrow">03 / Defender lo esencial</p>
              <h2>
                Su libertad.
                <br />
                Su patrimonio.
                <br />
                <em>Su futuro.</em>
              </h2>
              <p className="cine-lede">
                Una defensa técnica, serena y reservada para asuntos que merecen
                toda nuestra atención.
              </p>
              <a href="#especialidades" className="cine-text-link">
                Conozca nuestras especialidades <ArrowDown size={17} />
              </a>
            </div>
          </section>
        </div>
        <div className="cine-story-controls">
          <nav aria-label="Capítulos de la historia">
            {chapters.map((label, i) => (
              <a
                key={label}
                href={`#${chapterIds[i]}`}
                className={active === i ? "is-active" : ""}
                aria-current={active === i ? "step" : undefined}
              >
                <span>0{i + 1}</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused || reduced}
            disabled={reduced}
            aria-label={
              paused || reduced ? "Activar movimiento" : "Pausar movimiento"
            }
          >
            {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
            <span>
              {paused || reduced ? "Sin movimiento" : "Pausar movimiento"}
            </span>
          </button>
        </div>
      </section>

      <div className="cine-manifesto">
        <span>Excelencia académica.</span>
        <i>◆</i>
        <span>Litigio con propósito.</span>
        <i>◆</i>
        <span>Defensa con estrategia.</span>
      </div>

      <section id="especialidades" className="cine-services cine-section">
        <div className="cine-section-top" data-reveal>
          <p className="cine-eyebrow">01 — Áreas de práctica</p>
          <span>Especialización que da perspectiva.</span>
        </div>
        <div className="cine-services-heading" data-reveal>
          <h2>
            La complejidad exige
            <br />
            <em>criterio.</em>
          </h2>
          <p>
            Defensa penal en Quito y Ecuador para empresarios, directivos,
            funcionarios y personas que enfrentan investigaciones de alta
            complejidad.
          </p>
        </div>
        <div className="cine-service-list">
          {serviceCategories.slice(0, 4).map((service, i) => (
            <Link
              id={service.id}
              href={serviceLinks[i]}
              className="cine-service"
              key={service.id}
              data-reveal
            >
              <span className="cine-service-number">0{i + 1}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="cine-service-tags">
                  {service.services.slice(0, 2).join(" · ")}
                </span>
              </div>
              <span className="cine-service-arrow">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
        <Link
          className="cine-text-link"
          href="/areas-de-practica/lavado-de-activos"
        >
          Defensa en lavado de activos y delitos financieros{" "}
          <ArrowUpRight size={18} />
        </Link>
      </section>

      <section id="el-estudio" className="cine-profile cine-section">
        <div className="cine-portrait" data-reveal>
          <Image
            src="/fausto-plan-retrato.jpg"
            alt="Dr. Fausto Vásquez trabajando en su despacho de Quito"
            width={864}
            height={1240}
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <div className="cine-portrait-caption">
            <span>Dr. Fausto Vásquez</span>
            <small>Criterio. Método. Reserva.</small>
          </div>
          <span className="cine-photo-corner" />
        </div>
        <div className="cine-profile-copy" data-reveal>
          <p className="cine-eyebrow">
            02 — El criterio detrás de la estrategia
          </p>
          <h2>
            El rigor se estudia.
            <br />
            La confianza
            <br />
            <em>se construye.</em>
          </h2>
          <p>
            El Dr. Fausto Vásquez ejerce la defensa penal desde el análisis
            jurídico, la docencia y el estudio de la prueba. Su práctica reúne
            pensamiento académico y preparación para el litigio.
          </p>
          <p>
            Una relación profesional directa, con atención al contexto de cada
            persona y al cuidado de su información.
          </p>
          <div className="cine-profile-values">
            <div>
              <span>I.</span>
              <h3>Rigor técnico</h3>
              <p>Dogmática aplicada a los hechos.</p>
            </div>
            <div>
              <span>II.</span>
              <h3>Reserva</h3>
              <p>Discreción en cada conversación.</p>
            </div>
          </div>
          <Link className="cine-text-link" href="/firma">
            Conocer al Dr. Fausto Vásquez <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="cine-knowledge cine-section">
        <div className="cine-section-top" data-reveal>
          <p className="cine-eyebrow">03 — Pensamiento jurídico</p>
          <span>Compartir conocimiento también es ejercer.</span>
        </div>
        <h2 data-reveal>
          La autoridad comienza
          <br />
          con el <em>conocimiento.</em>
        </h2>
        <div className="cine-knowledge-grid">
          <Link
            href="/publicaciones"
            className="cine-knowledge-card"
            data-reveal
          >
            <span className="cine-card-kicker">Biblioteca jurídica / 01</span>
            <div className="cine-book-art" aria-hidden="true">
              <span>
                FV
                <br />
                <small>
                  DOGMÁTICA
                  <br />
                  PENAL
                </small>
                <i>Fausto Vásquez</i>
              </span>
              <span />
              <span />
            </div>
            <h3>Ideas que construyen criterio.</h3>
            <p>
              Obras y publicaciones sobre dogmática penal, prueba y litigación
              estratégica.
            </p>
            <span className="cine-text-link">
              Explorar publicaciones <ArrowUpRight size={18} />
            </span>
          </Link>
          <Link
            href="/academia"
            className="cine-knowledge-card cine-academy"
            data-reveal
          >
            <span className="cine-card-kicker">Formación / 02</span>
            <div className="cine-academy-art" aria-hidden="true">
              <span>FV</span>
              <i />
              <i />
              <i />
            </div>
            <h3>Aprender a mirar más lejos.</h3>
            <p>
              Formación jurídica para quienes buscan profundizar en el derecho
              penal y la práctica del litigio.
            </p>
            <span className="cine-text-link">
              Conocer la Academia <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>
      </section>

      <section id="faq" className="cine-faq cine-section">
        <div data-reveal>
          <p className="cine-eyebrow">04 — Antes de conversar</p>
          <h2>
            Claridad desde
            <br />
            el <em>primer paso.</em>
          </h2>
          <p>
            Respuestas para iniciar una consulta con información y tranquilidad.
          </p>
        </div>
        <div className="cine-faq-list" data-reveal>
          {faqs.map((faq, i) => (
            <details key={faq.question}>
              <summary>
                <span>
                  <small>0{i + 1}</small>
                  {faq.question}
                </span>
                <Plus className="cine-faq-plus" size={18} />
                <Minus className="cine-faq-minus" size={18} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="consulta-rapida" className="cine-contact cine-section">
        <div className="cine-contact-orbit" aria-hidden="true" />
        <p className="cine-eyebrow" data-reveal>
          Su siguiente movimiento
        </p>
        <h2 data-reveal>
          Hay conversaciones
          <br />
          que merecen
          <br />
          <em>absoluta reserva.</em>
        </h2>
        <p data-reveal>
          Estudiemos su caso con rigor, criterio y serenidad.
          <br />
          La estrategia comienza con una conversación.
        </p>
        <div className="cine-contact-actions" data-reveal>
          <a
            className="cine-button"
            href={contact}
            onClick={() => track("cinematic_contact")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar evaluación reservada <ArrowUpRight size={19} />
          </a>
          <Link className="cine-text-link" href="/contacto">
            Prefiero el formulario <ArrowRight size={17} />
          </Link>
        </div>
        <small className="cine-contact-note">
          <ShieldCheck size={15} /> Primer contacto sin documentos
          confidenciales.
        </small>
      </section>

      <footer className="cine-footer">
        <div className="cine-footer-main">
          <Link
            className="cine-brand"
            href="/"
            aria-label="Fausto Vásquez, inicio"
          >
            <Monogram />
            <span>
              Fausto Vásquez<small>Estudio Jurídico</small>
            </span>
          </Link>
          <p>
            Defensa penal estratégica
            <br />
            para casos complejos.
          </p>
          <div>
            <span>Quito · Guayaquil</span>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
          <a
            href="#vision"
            className="cine-back-top"
            aria-label="Volver al inicio"
          >
            <ArrowUpRight size={23} />
          </a>
        </div>
        <div className="cine-footer-bottom">
          <span>
            © {new Date().getFullYear()} Fausto Vásquez — Estudio Jurídico.
          </span>
          <nav aria-label="Información legal">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/aviso-legal">Aviso legal</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
        <p className="cine-legal-note">
          Contenido informativo. No sustituye asesoría jurídica ni constituye
          patrocinio. Cada asunto requiere una evaluación individual.
        </p>
      </footer>
      <a
        className="cine-mobile-contact"
        href={contact}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("cinematic_mobile")}
      >
        <span>
          <i /> Consulta reservada
        </span>
        <ArrowUpRight size={17} />
      </a>
    </div>
  );
}
