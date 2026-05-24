import { Shield, Award, Compass, MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/animated";
import { contactMessage, pageDescriptions, whatsappHref } from "@/lib/site";

export const metadata = {
  title: "Contacto",
  description: pageDescriptions.contacto,
};

const pillars = [
  { label: "Excelencia Jurídica", icon: Award },
  { label: "Confidencialidad", icon: Shield },
  { label: "Resultados", icon: Compass },
  { label: "Experiencia", icon: Award },
];

export default function ContactoPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden px-5 pt-36 pb-12 bg-marble-dark">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/reception_marble.png"
            alt="Mármol Negro"
            fill
            className="object-cover opacity-10 filter grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 led-strip-gold" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow tracking-[0.24em] text-gold">Contacto y Canales Directos</span>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl text-gold-metallic animate-text-shine tracking-tight leading-none uppercase select-none font-light">
              Contacto y Oficinas
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-steel leading-relaxed">
              Estamos aquí para escucharlo, asesorarlo y defender sus intereses con excelencia y compromiso.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={whatsappHref(contactMessage)}
                target="_blank"
                className="inline-flex h-12 items-center gap-2 border border-gold/30 bg-gold/10 hover:bg-gold/20 px-6 text-xs uppercase tracking-widest text-gold transition duration-300 shadow-glow-gold rounded-sm"
              >
                <MessageCircle size={15} />
                Escríbanos por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Grid of Locations and Contact Card */}
      <section className="section-shell bg-[#06080b]/35 backdrop-blur-md relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            
            {/* Left Column: Quito & Guayaquil Location Cards */}
            <div className="grid gap-8">
              <Reveal>
                <h2 className="font-serif text-2xl text-ivory uppercase tracking-wider font-light">
                  Nuestras Oficinas
                </h2>
                <div className="h-px w-14 bg-gold mt-4" />
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2">
                
                {/* Quito Office */}
                <Reveal delay={0.06}>
                  <div className="group relative overflow-hidden border border-gold/10 bg-black/25 rounded-sm transition duration-300 hover:border-gold/30">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src="/quito_night.png"
                        alt="Oficinas en Quito"
                        fill
                        className="object-cover transition-all duration-700 saturate-0 brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-gold/15 mix-blend-color transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-gold tracking-wide">QUITO</h3>
                      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-steel">
                        <MapPin className="text-gold shrink-0 mt-0.5" size={13} />
                        <span>Av. 12 de Octubre N26-97 y Lincoln, Edificio Torre 1492, Piso 8, Oficina 802. La Carolina, Quito 170522, Ecuador</span>
                      </p>
                      <div className="mt-6">
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          className="inline-block text-[0.6rem] uppercase tracking-widest text-gold border-b border-gold/20 hover:border-gold pb-0.5 transition duration-300 font-semibold"
                        >
                          Ver en Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Guayaquil Office */}
                <Reveal delay={0.12}>
                  <div className="group relative overflow-hidden border border-gold/10 bg-black/25 rounded-sm transition duration-300 hover:border-gold/30">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src="/guayaquil_night.png"
                        alt="Oficinas en Guayaquil"
                        fill
                        className="object-cover transition-all duration-700 saturate-0 brightness-75 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-102"
                      />
                      <div className="absolute inset-0 bg-gold/15 mix-blend-color transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-gold tracking-wide">GUAYAQUIL</h3>
                      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-steel">
                        <MapPin className="text-gold shrink-0 mt-0.5" size={13} />
                        <span>Av. Malecón Simón Bolívar y Loja, Edificio The Point, Piso 12, Oficina 1203. Puerto Santa Ana, Guayaquil 090150, Ecuador</span>
                      </p>
                      <div className="mt-6">
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          className="inline-block text-[0.6rem] uppercase tracking-widest text-gold border-b border-gold/20 hover:border-gold pb-0.5 transition duration-300 font-semibold"
                        >
                          Ver en Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>

              </div>

              {/* Direct Info List */}
              <Reveal delay={0.18} className="border-t border-gold/10 pt-8 mt-4">
                <div className="grid gap-6 sm:grid-cols-2 text-[0.66rem] uppercase tracking-widest text-steel">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center border border-gold/20 rounded-full text-gold bg-gold/5">
                      <Phone size={13} />
                    </div>
                    <div>
                      <p className="text-[0.55rem] text-gold/60">Llámenos</p>
                      <p className="mt-0.5 text-ivory text-xs font-semibold">(+593) 98 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center border border-gold/20 rounded-full text-gold bg-gold/5">
                      <Mail size={13} />
                    </div>
                    <div>
                      <p className="text-[0.55rem] text-gold/60">Escríbanos</p>
                      <p className="mt-0.5 text-ivory text-xs font-semibold tracking-normal lowercase">info@faustovasquezabogados.com</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Contact Form */}
            <Reveal delay={0.24}>
              <div className="case-plaque relative overflow-hidden border border-gold/20 bg-black/45 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.65)] rounded-sm">
                <h3 className="font-serif text-xl text-ivory tracking-wide uppercase font-light">
                  Envíenos un mensaje
                </h3>
                <div className="h-px w-10 bg-gold mt-3 mb-6" />
                
                <ContactForm />
              </div>
            </Reveal>

          </div>

          {/* Bottom Pillars Strip */}
          <Reveal delay={0.3} className="mt-20 border-t border-gold/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[0.62rem] uppercase tracking-[0.24em] text-steel">
              {pillars.map((pillar, index) => {
                const PillarIcon = pillar.icon;
                return (
                  <div className="flex items-center gap-2 hover:text-gold transition duration-300" key={index}>
                    <PillarIcon className="text-gold" size={14} strokeWidth={1.5} />
                    <span>{pillar.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
