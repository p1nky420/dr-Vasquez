import { Reveal } from "@/components/animated";
import { credentials } from "@/lib/site";

export function CredentialsStrip() {
  return (
    <section className="border-y border-ivory/10 bg-[#f5f2ea] text-graphite">
      <div className="mx-auto grid max-w-7xl divide-y divide-graphite/15 px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
        {credentials.map((item, index) => (
          <Reveal delay={index * 0.05} key={item.value}>
            <div className="py-8 md:px-8">
              <p className="font-serif text-3xl leading-tight">{item.value}</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-graphite/70">
                {item.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
