import { PageHero } from "@/components/page-hero";

export default function NotFound() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Página no disponible"
        title="No encontramos esta página."
        text="Puede volver al inicio o explorar las especialidades del despacho."
        actionLabel="Volver al inicio"
        actionHref="/"
      />
    </div>
  );
}
