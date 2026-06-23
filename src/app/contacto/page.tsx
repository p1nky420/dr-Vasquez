import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/animated";
import { contactMessage, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consulta privada | Abogado Penalista Quito",
  description:
    "Solicite una evaluación confidencial con el Dr. Fausto Vásquez para asuntos penales complejos, empresariales y patrimoniales en Quito.",
  alternates: {
    canonical: "https://faustovasquezabogados.com/contacto",
  },
};

const contactChannels = [
  {
    label: "Línea privada",
    value: "+593 98 307 6881",
    href: "tel:+593983076881",
    icon: Phone,
  },
  {
    label: "Correo",
    value: "contacto@faustovasquezabogados.com",
    href: "mailto:contacto@faustovasquezabogados.com",
    icon: Mail,
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="relative min-h-[72svh] overflow-hidden bg-[#0a0908] px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <Image
          src="/real-office-view.jpg"
          alt="Vista desde la oficina de Fausto Vásquez Abogados en Quito"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,.98)_0%,rgba(8,7,6,.84)_45%,rgba(8,7,6,.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,7,6,.92)_0%,transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[52svh] max-w-[88rem] items-end">
          <Reveal className="max-w-4xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#c9ad78]">
              Admisión confidencial
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.055em] text-[#fffaf0]">
              Una conversación privada. Una estrategia clara.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#c9c1b5] md:text-lg">
              El primer contacto se limita a la información necesaria para evaluar disponibilidad, urgencia y posibles conflictos de interés.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#eae3d8] px-5 py-24 text-[#171410] md:px-8 md:py-36">
        <div className="mx-auto grid max-w-[88rem] gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#7e5e38]">
                Contacto directo
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.035em] md:text-6xl">
                Atención personal en Quito y Guayaquil.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-[#554f47]">
                Para proteger la confidencialidad, evite enviar expedientes o documentación sensible antes de que la firma confirme la admisión.
              </p>
            </Reveal>

            <div className="mt-12 border-t border-[#171410]/18">
              {contactChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <Reveal key={channel.label} delay={index * 0.05}>
                    <a
                      href={channel.href}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[#171410]/18 py-6"
                    >
                      <Icon size={19} strokeWidth={1.5} className="text-[#8a6941]" />
                      <span>
                        <small className="block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#7b7369]">
                          {channel.label}
                        </small>
                        <strong className="mt-1 block break-all font-serif text-lg font-normal md:text-xl">
                          {channel.value}
                        </strong>
                      </span>
                      <ArrowUpRight className="text-[#8a6941] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.12} className="mt-10">
              <a
                href={whatsappHref(contactMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center gap-3 bg-[#171410] px-6 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#f5efe4] transition-colors hover:bg-[#8a6941]"
              >
                <MessageCircle size={18} /> Conversación privada por WhatsApp
              </a>
            </Reveal>

            <div className="mt-14 grid gap-5">
              <Reveal delay={0.16} className="overflow-hidden bg-[#171410] text-[#f4eee3]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/real-office-entrance.jpg"
                    alt="Ingreso a las oficinas de Fausto Vásquez Abogados en Quito"
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#c9ad78]">
                    Oficina Quito
                  </p>
                </div>
                <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] md:p-8">
                  <div className="flex gap-3">
                    <MapPin className="mt-1 shrink-0 text-[#c9ad78]" size={18} />
                    <p className="text-sm leading-6 text-[#c9c1b5]">
                      Av. 12 de Octubre N26-97 y Lincoln<br />
                      Torre 1492 · Piso 8 · Oficina 802<br />
                      Quito, Ecuador
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Av.+12+de+Octubre+N26-97+y+Lincoln,+Torre+1492,+Quito,+Ecuador"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#c9ad78] hover:text-[#f4eee3]"
                  >
                    Ver mapa ↗
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="overflow-hidden bg-[#171410] text-[#f4eee3]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/guayaquil_night.png"
                    alt="Sede de atención de Fausto Vásquez Abogados en Guayaquil"
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-6 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#c9ad78]">
                    Oficina Guayaquil
                  </p>
                </div>
                <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] md:p-8">
                  <div className="flex gap-3">
                    <MapPin className="mt-1 shrink-0 text-[#c9ad78]" size={18} />
                    <p className="text-sm leading-6 text-[#c9c1b5]">
                      Av. Malecón Simón Bolívar y Loja<br />
                      Edificio The Point · Piso 12 · Oficina 1203<br />
                      Puerto Santa Ana, Guayaquil
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Edificio+The+Point,+Puerto+Santa+Ana,+Guayaquil,+Ecuador"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-[#c9ad78] hover:text-[#f4eee3]"
                  >
                    Ver mapa ↗
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.24} className="flex gap-3 border border-[#171410]/18 p-5">
                <Clock3 className="mt-1 shrink-0 text-[#8a6941]" size={18} />
                <p className="text-sm leading-6 text-[#5c554c]">
                  Atención en ambas oficinas con cita previa. Las consultas urgentes están sujetas a disponibilidad.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="sticky top-28 bg-[#12100d] p-6 text-[#f4eee3] shadow-[0_35px_90px_rgba(44,34,22,.2)] md:p-10">
              <div className="flex items-start justify-between gap-5 border-b border-[#c9ad78]/20 pb-7">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#c9ad78]">
                    Solicitud de evaluación
                  </p>
                  <h2 className="mt-3 font-serif text-3xl md:text-4xl">Sala de admisión privada</h2>
                </div>
                <ShieldCheck className="shrink-0 text-[#c9ad78]" size={26} strokeWidth={1.3} />
              </div>
              <p className="my-7 text-sm leading-7 text-[#bdb5aa]">
                La solicitud no crea una relación abogado-cliente. La firma confirmará disponibilidad antes de recibir información sensible.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
