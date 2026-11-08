import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { PageHero } from "@/components/page-hero";

export function LegalPage({ eyebrow, title, updated, intro, children }: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  const headings: { id: string; label: string }[] = [];
  const content = Children.map(children, child => {
    if (!isValidElement<{ id?: string; children?: ReactNode }>(child) ||
      child.type !== "h2" || typeof child.props.children !== "string") return child;

    const label = child.props.children;
    const id = child.props.id ?? label.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    headings.push({ id, label });
    return cloneElement(child, { id });
  });

  return (
    <article className="ed-page ed-legal">
      <PageHero eyebrow={eyebrow} title={title} text={intro} actionLabel="Leer el documento" />
      <section id="contenido" className="in-wrap in-document">
        {headings.length > 0 && (
          <nav aria-label="Contenido del documento">
            <p className="ed-kicker">En este documento</p>
            {headings.map(heading => <a key={heading.id} href={`#${heading.id}`}>{heading.label}</a>)}
          </nav>
        )}
        <div>
          <p className="ed-kicker">Última actualización · {updated}</p>
          <div className="legal">{content}</div>
        </div>
      </section>
    </article>
  );
}
