"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, LockKeyhole } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AcademicCredentials } from "@/components/academic-credentials";
import { PanoramicHero } from "@/components/panoramic-hero";
import { heroPhotos } from "@/lib/hero-photos";
import { ConsultationActions } from "@/components/consultation-actions";
import { books } from "@/lib/publications";
import { faqs } from "@/lib/home-content";
import { MethodChess } from "./method-chess";
import "./fusion.css";
import "./signature.css";

const practices = [
  { title: "Administración pública", label: "La responsabilidad no se presume por el cargo.", text: "Peculado, cohecho, concusión y enriquecimiento ilícito. Defensa de funcionarios, exfuncionarios y contratistas. Representación de instituciones, previa revisión de conflictos de interés.", href: "/areas-de-practica/delitos-administracion-publica", image: "/estudio/preparacion-expediente.webp", tags: "Peculado · Cohecho · Concusión" },
  { title: "Penal económico", label: "Leer más allá de los números.", text: "Defensa ante investigaciones que involucran decisiones empresariales, documentación, operaciones comerciales y patrimonio.", href: "/derecho-penal-economico", image: "/estudio/laptop-quito.webp", tags: "Empresa · Patrimonio · Prueba" },
  { title: "Delitos financieros", label: "Cada operación necesita contexto.", text: "Análisis de origen de fondos, trazabilidad patrimonial y prueba financiera en investigaciones por lavado de activos.", href: "/areas-de-practica/lavado-de-activos", image: "/estudio/firmando.webp", tags: "Origen de fondos · Pericias" },
  { title: "Garantías y litigio", label: "La estrategia también está en los límites.", text: "Debido proceso, garantías constitucionales, audiencias y recursos. Segunda opinión técnica sobre asuntos penales complejos.", href: "/areas-de-practica/litigio-penal-estrategico", image: "/estudio/mesa-litigio.webp", tags: "Libertad · Debido proceso · Recursos" },
];
const featured = faqs.filter(f => ["¿Qué debo hacer si recibo una notificación de Fiscalía?", "¿El Dr. Fausto Vásquez Cevallos atiende personalmente?", "¿La información del cliente es confidencial?", "¿Atienden casos de funcionarios públicos?"].includes(f.question));
const ease = [0.22, 1, 0.36, 1] as const;

function Hero() {
  return (
    <PanoramicHero photo={heroPhotos.home} variant="home" titleId="sv-title">
      <p className="sv-kicker">Quito, Ecuador · Ejercicio desde 2000</p>
      <h1 id="sv-title">Fausto <span>Vásquez Cevallos<span className="fv-cover__point">.</span></span></h1>
      <p className="fv-cover__line">El arte de <em>anticiparse.</em></p>
      <p className="fv-cover__lead">Defensa penal en Quito. Delitos contra la administración pública y derecho penal económico.</p>
      <Link className="fv-cover__action" href="#consulta-form">
        Solicitar evaluación privada <ArrowUpRight size={19} aria-hidden="true" />
      </Link>
    </PanoramicHero>
  );
}

function PracticeExplorer() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const p = practices[active];
  return <section id="especialidades" className="sv-practice">
    <div className="sv-section-heading"><p className="sv-kicker">El ámbito de la defensa</p><h2>Ámbitos de<br /><em>defensa.</em></h2><p>Libertad. Patrimonio. Reputación.<br />Cada asunto exige una lectura propia.</p></div>
    <div className="sv-explorer"><div className="sv-explorer__tabs" role="tablist" aria-label="Especialidades">{practices.map((item,index) => <button key={item.title} type="button" role="tab" id={`practice-tab-${index}`} aria-selected={active===index} aria-controls={`practice-panel-${index}`} tabIndex={active===index ? 0 : -1} onClick={()=>setActive(index)} onKeyDown={e=>{if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?practices.length-1:(index+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+practices.length)%practices.length;setActive(n);document.getElementById(`practice-tab-${n}`)?.focus();}}}><span>{item.title}</span><ArrowUpRight size={24}/></button>)}</div>
    <div className="sv-explorer__visual"><AnimatePresence mode="wait"><motion.div key={p.title} role="tabpanel" id={`practice-panel-${active}`} aria-labelledby={`practice-tab-${active}`} className="sv-practice-panel" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2, ease }}><Image src={p.image} alt="Detalle del trabajo y despacho del Dr. Fausto Vásquez Cevallos" width={960} height={1280} sizes="(max-width:760px) 88vw, 32vw"/><div className="sv-practice-panel__body"><p className="sv-kicker">{p.tags}</p><h3>{p.label}</h3><p>{p.text}</p><Link href={p.href} className="sv-link">Explorar esta especialidad <ArrowUpRight size={20}/></Link></div></motion.div></AnimatePresence></div></div>
    <Link href="/areas-de-practica" className="sv-all-practices">Todas las áreas de práctica <ArrowRight size={18}/></Link>
  </section>;
}

function JuristPortrait() {
  const [selected, setSelected] = useState("litigio");
  const views = [
    {id:"litigio", name:"El litigante", title:"La práctica afina el criterio.", text:"Ejercicio profesional desde el año 2000. Lectura del expediente, análisis de la prueba y estrategia para asuntos penales de alta complejidad.", href:"/firma", link:"Conocer su trayectoria"},
    {id:"docencia", name:"El profesor", title:"Enseñar también es profundizar.", text:"La docencia en derecho penal complementa el ejercicio profesional: examinar los fundamentos, discutir los argumentos y transmitir el conocimiento jurídico.", href:"/academia", link:"Explorar la actividad académica"},
    {id:"obra", name:"El autor", title:"El pensamiento queda escrito.", text:"Obras dedicadas al derecho penal, la prueba documental y el proceso. Una biblioteca que prolonga la conversación entre teoría y práctica.", href:"/publicaciones", link:"Consultar publicaciones"},
  ];
  const current = views.find(view=>view.id===selected)!;
  return <section id="jurista" className="sv-jurist sv-jurist--curated"><figure className="sv-jurist__frame"><Image src="/estudio/fausto-trayectoria.webp" alt="Fausto Vásquez Cevallos sentado junto a los diplomas de su despacho" fill sizes="(max-width:760px) 100vw, 48vw"/><figcaption><span>Fausto Vásquez Cevallos</span><small>Jurista penalista · Quito</small></figcaption></figure><div className="sv-jurist__body"><p className="sv-kicker">El criterio tiene autor</p><h2>Litigante, profesor<br /><em>y autor.</em></h2><div className="sv-jurist__tabs" aria-label="Perspectivas del jurista">{views.map(view=><button type="button" key={view.id} aria-pressed={selected===view.id} onClick={()=>setSelected(view.id)}>{view.name}</button>)}</div><div className="sv-jurist__perspective" aria-live="polite"><h3>{current.title}</h3><p>{current.text}</p><Link className="sv-link" href={current.href}>{current.link}<ArrowUpRight size={18}/></Link></div><div className="sv-books"><p className="sv-kicker">Obra jurídica</p>{books.map(book=><Link href={`/publicaciones#${book.id}`} key={book.id}><span>{book.title}</span><ArrowUpRight size={18}/></Link>)}</div></div></section>;
}

export function FusionHome() {
  return <div className="sv"><Hero/><AcademicCredentials showAcademicLink/><PracticeExplorer/>
    <MethodChess/>
    <JuristPortrait/>
    <section id="consulta-rapida" className="sv-contact" aria-labelledby="sv-contact-title">
      <div className="sv-contact__intro">
        <p className="sv-kicker"><LockKeyhole size={13} aria-hidden="true" /> Admisión confidencial</p>
        <h2 id="sv-contact-title">Evaluación <em>privada.</em></h2>
        <p>Revisamos disponibilidad y posibles conflictos de interés antes de coordinar una reunión privada.</p>
      </div>
      <div className="fv-contact-card" id="consulta-form">
        <p className="sv-kicker">Quito · Con cita previa</p>
        <h3>Coordine su consulta.</h3>
        <p>Atención de 9:30 a 19:00. Comparta solo sus datos de contacto en el primer mensaje.</p>
        <ConsultationActions source="home-signature" message="Hola, deseo coordinar una evaluación privada con el Dr. Fausto Vásquez Cevallos." />
      </div>
    </section>
    <section className="sv-faq" id="faq"><p className="sv-kicker">Antes de conversar</p><div>{featured.map(faq=><details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
    <section className="sv-close" id="perspectiva"><div className="sv-close__copy"><p className="sv-kicker">Fausto Vásquez Cevallos · Estudio Jurídico</p><p>El arte de<br /><em>anticiparse.</em></p><Link className="sv-link" href="#consulta-form">Solicitar evaluación privada <ArrowUpRight size={20}/></Link></div><figure className="sv-close__portrait"><Image src="/estudio/ventana-quito.webp" alt="El Dr. Fausto Vásquez Cevallos junto al ventanal del despacho, con el rostro y la ciudad de Quito a la vista" fill sizes="(max-width:760px) 88vw, 40vw"/></figure></section>
  </div>;
}
