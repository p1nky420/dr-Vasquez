import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function EditorialRows({
  items,
}: {
  items: Array<{ title: string; text: string; href?: string; action?: string }>;
}) {
  return (
    <div className="ed-rows">
      {items.map((item) => (
        <article key={item.title}>
          <h3>{item.title}</h3>
          <div>
            <p>{item.text}</p>
            {item.href && (
              <Link href={item.href} className="ed-text-link">
                {item.action ?? "Explorar"}
                <ArrowUpRight size={18} />
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
export function EditorialSection({
  eyebrow,
  title,
  children,
  tone = "paper",
  id,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tone?: "paper" | "dark";
  id?: string;
}) {
  return (
    <section id={id} className={`ed-section ed-section--${tone}`}>
      <header className="ed-section__head">
        <p className="ed-kicker">{eyebrow}</p>
        <h2>{title}</h2>
      </header>
      <div className="ed-section__body">{children}</div>
    </section>
  );
}
