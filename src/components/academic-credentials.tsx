"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpenText } from "lucide-react";
import { books, researchArticle } from "@/lib/publications";
import "./academic-credentials.css";

const coip = books.find(book => book.id === "punto-inflexion")!;

const credentials = [
  {
    name: "Universidad Central del Ecuador",
    logo: { src: "/university-uce.png", width: 300, height: 300 },
    role: "Formación y publicación",
    description: "Formación en Derecho en Quito. Su obra académica incluye un artículo sobre tipicidad y culpabilidad en la Revista Ciencias Sociales de la universidad.",
    references: [
      { label: "Perfil en el repositorio UCE", url: "https://www.dspace.uce.edu.ec/bitstreams/8ba9c2fb-db79-4b23-ba76-338ddfb7fe2f/download" },
      { label: "Leer el artículo", url: researchArticle.url },
    ],
  },
  {
    name: "Universidad Técnica del Norte",
    logo: { src: "/university-utn.png", width: 152, height: 152 },
    role: "Dirección de tesis",
    description: "Dirigió una investigación de maestría en Derecho Penal sobre el azar, la imputación objetiva y la atribución de resultados.",
    references: [{ label: "Ver ficha en el repositorio UTN", url: "https://repositorio.utn.edu.ec/items/f43c4c46-a297-4fcb-b114-5c9d41106a60" }],
  },
  {
    name: "Universidad de Otavalo",
    logo: { src: "/university-otavalo.webp", width: 360, height: 283 },
    role: "Tutoría de maestría",
    description: "Fue tutor de un trabajo de maestría en Derecho Penal sobre la reparación integral en delitos de mera actividad.",
    references: [{ label: "Consultar la tesis", url: "https://lareferencia.info/vufind/Record/EC_9091b38ce2f00462cb53ae7a01cd766c" }],
  },
  {
    name: "Editorial Jurídica del Ecuador",
    role: "Obra publicada",
    description: `Publicó «${coip.title}», un estudio sobre la atribución de responsabilidad penal y el principio de confianza.`,
    references: [{ label: "Ver ficha en ISBN Ecuador", url: coip.reference.url }],
  },
];

export function AcademicCredentials({ showAcademicLink = false }: { showAcademicLink?: boolean }) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const tabId = (index: number) => `${id}-tab-${index}`;
  const panelId = (index: number) => `${id}-panel-${index}`;

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % credentials.length; break;
      case "ArrowLeft": next = (index + credentials.length - 1) % credentials.length; break;
      case "Home": next = 0; break;
      case "End": next = credentials.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    document.getElementById(tabId(next))?.focus();
  }

  return (
    <section className="fv-credentials" id="trayectoria-academica" aria-labelledby={`${id}-title`}>
      <div className="fv-credentials__inner">
        <header className="fv-credentials__intro">
          <div>
            <p className="fv-credentials__eyebrow">Trayectoria académica</p>
            <h2 id={`${id}-title`}>Formación, docencia y obra.</h2>
          </div>
          {showAcademicLink && (
            <Link className="fv-credentials__link" href="/academia#trayectoria-academica">
              Ver actividad académica <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </header>
        <div className="fv-credentials__rail" role="tablist" aria-label="Instituciones de la trayectoria académica">
          {credentials.map((credential, index) => (
            <button key={credential.name} type="button" role="tab" id={tabId(index)}
              aria-controls={panelId(index)} aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)} onKeyDown={event => onTabKeyDown(event, index)}>
              <span className="fv-credentials__mark" aria-hidden="true">
                {credential.logo ? (
                  <Image {...credential.logo} alt="" sizes="(max-width: 540px) 92px, 130px" />
                ) : (
                  <BookOpenText size={43} strokeWidth={1.15} />
                )}
              </span>
              <span className="fv-credentials__name">{credential.name}</span>
              <span className="fv-credentials__role">{credential.role}</span>
            </button>
          ))}
        </div>
        {credentials.map((credential, index) => (
          <div className="fv-credentials__details" key={credential.name} role="tabpanel"
            id={panelId(index)} aria-labelledby={tabId(index)} hidden={selected !== index}>
            <p>{credential.description}</p>
            <div>
              {credential.references.map(reference => (
                <a className="fv-credentials__link" key={reference.url} href={reference.url}>
                  {reference.label} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
