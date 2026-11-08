"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type FaqItem = { question: string; answer: string; topic?: string };

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function FaqExplorer({ items, showSearch = true }: { items: FaqItem[]; showSearch?: boolean }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const topics = [...new Set(items.flatMap(item => item.topic ? [item.topic] : []))];
  const search = normalize(query.trim());
  const filtered = items.filter(item =>
    (!topic || item.topic === topic) &&
    (!search || normalize(`${item.question} ${item.answer}`).includes(search)),
  );

  return (
    <div className="ed-faq-explorer">
      {showSearch && (
        <label className="ed-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Buscar una pregunta</span>
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar por tema o pregunta" />
        </label>
      )}
      {topics.length > 0 && (
        <div className="in-faq-filters" role="group" aria-label="Filtrar preguntas por tema">
          <button type="button" aria-pressed={topic === ""} onClick={() => setTopic("")}>Todas</button>
          {topics.map(label => (
            <button key={label} type="button" aria-pressed={topic === label} onClick={() => setTopic(label)}>{label}</button>
          ))}
        </div>
      )}
      <div className="ed-faq-list">
        {filtered.map(item => (
          <details key={item.question}>
            <summary>{item.question}<span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
        {!filtered.length && (
          <div className="in-faq-empty">
            <p role="status">No encontramos preguntas con esos filtros.</p>
            <button type="button" className="ed-text-link" onClick={() => { setQuery(""); setTopic(""); }}>Ver todas las preguntas</button>
          </div>
        )}
      </div>
    </div>
  );
}
