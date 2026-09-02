import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const bonuses = content.bonuses;

export function Bonuses() {
  return (
    <Section id="bonus" index={6} station={bonuses.station} tone="paper">
      <Reveal>
        <h2 className="t-h2 text-graphite">{bonuses.title}</h2>
      </Reveal>

      <ol className="mt-12 grid list-none gap-0 sm:mt-16">
        {bonuses.items.map((bonus, index) => (
          <Reveal as="li" key={bonus.text} delay={index * 90} className="border-t border-rule last:border-b">
            <div className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-10">
              <p className="tnum text-[clamp(2rem,1.5rem+2.2vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-brass-deep sm:w-24">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="t-h3 max-w-[34ch] text-graphite">{bonus.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
