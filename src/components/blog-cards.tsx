import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animated";
import { CardSpotlight } from "@/components/card-spotlight";
import { featuredPosts } from "@/lib/site";

export function BlogCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {featuredPosts.map((post, index) => {
        const Icon = post.icon;
        return (
          <Reveal delay={index * 0.06} key={post.title} className="h-full">
            <CardSpotlight className="h-full">
              <article className="relative flex h-full min-h-[160px] flex-col bg-black/35 p-6 rounded-sm transition duration-300 hover:bg-black/15">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center border border-gold/20 bg-gold/5 text-gold/80 group-hover:text-gold transition">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <ArrowUpRight className="text-steel/50 transition group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" size={16} />
                </div>
                <p className="mt-5 text-[0.58rem] uppercase tracking-[0.18em] text-gold/80 font-bold">{post.category}</p>
                <h3 className="mt-2 font-serif text-base font-bold leading-snug text-ivory group-hover:text-gold transition duration-300">{post.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-steel group-hover:text-ivory/80 transition duration-300">{post.summary}</p>
              </article>
            </CardSpotlight>
          </Reveal>
        );
      })}
    </div>
  );
}
