import Image from "next/image";

const steps = [
  {
    id: "expediente",
    label: "Expediente",
    title: "Reconstruir lo que ocurrió.",
    text: "Ordenar fechas, informes y decisiones. Una cronología permite separar lo que consta en el expediente de lo que todavía debe comprobarse.",
  },
  {
    id: "contraste",
    label: "Contraste",
    title: "Poner a prueba la imputación.",
    text: "Contrastar la hipótesis de Fiscalía con documentos, testimonios y pericias para identificar qué hechos están en disputa.",
  },
  {
    id: "estrategia",
    label: "Estrategia",
    title: "Decidir qué debe demostrar la defensa.",
    text: "Definir la teoría del caso, seleccionar la prueba que la sostiene y evaluar qué actuaciones requieren prioridad.",
  },
  {
    id: "audiencia",
    label: "Audiencia",
    title: "Preparar el momento de intervenir.",
    text: "Ordenar los argumentos, preparar las preguntas y revisar qué opciones procesales quedan abiertas en cada etapa.",
  },
];

export function MethodChess() {
  return (
    <section id="metodo" className="fv-method" aria-labelledby="metodo-titulo">
      <header className="fv-method__head">
        <p className="sv-kicker">El método de defensa</p>
        <h2 id="metodo-titulo">Anticipar.<br /><em>Antes de actuar.</em></h2>
        <p>Del expediente a la audiencia. Cada movimiento parte de una decisión.</p>
      </header>
      <div className="fv-method__grid">
        <div className="fv-method__stage">
          <figure className="fv-method__figure fv-method__figure--portrait">
            <Image src="/estudio/retrato-tablero.webp" alt="El Dr. Fausto Vásquez Cevallos frente al mueble ajedrezado de su despacho, con Quito al fondo" fill sizes="(max-width: 760px) 90vw, 45vw" />
          </figure>
        </div>
        <ol className="fv-method__steps">
          {steps.map(step => (
            <li key={step.id} id={`metodo-${step.id}`}>
              <p className="sv-kicker">{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
