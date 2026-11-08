import { WhatsappCta } from "@/components/whatsapp-cta";
export function CtaBand({
  title = "Una conversación privada. Un punto de partida claro.",
  text = "Revisamos disponibilidad y posibles conflictos antes de coordinar una reunión. Comparta solo sus datos de contacto.",
  message = "Hola, deseo coordinar una evaluación privada.",
  label,
  id,
}: {
  title?: string;
  text?: string;
  message?: string;
  label?: string;
  id?: string;
}) {
  return (
    <section className="ed-cta" id={id}>
      <div>
        <p className="ed-kicker">El siguiente paso</p>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{text}</p>
        <WhatsappCta location="interior-cierre" message={message} label={label} />
      </div>
    </section>
  );
}
