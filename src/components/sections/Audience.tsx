import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const audience = content.audience;

export function Audience() {
  return (
    <Section id="para-quem" index={9} station={audience.station} tone="paper">
      <Reveal>
        <h2 className="t-h2 max-w-[18ch] text-graphite">{audience.title}</h2>
      </Reveal>

      <ul className="mt-12 grid list-none gap-0 lg:grid-cols-2 lg:gap-x-16">
        {audience.items.map((item, index) => (
          <Reveal as="li" key={item} delay={index * 60} className="border-t border-rule">
            <div className="flex items-center gap-4 py-5">
              <span aria-hidden="true" className="block h-px w-6 shrink-0 bg-brass-deep" />
              <span className="text-[1.0625rem] leading-snug text-graphite">{item}</span>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120}>
        <p className="mt-12 border-t-2 border-brass-deep pt-8 text-[clamp(1.35rem,1.1rem+1.2vw,2rem)] font-semibold leading-snug tracking-[-0.028em] text-graphite">
          {audience.remate}
        </p>
      </Reveal>
    </Section>
  );
}
