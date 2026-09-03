import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { content } from "@/config/content";

const outcomes = content.outcomes;

export function Outcomes() {
  return (
    <Section id="transformacao" index={4} station={outcomes.station} tone="paper">
      <Reveal>
        <h2 className="t-h2 max-w-[18ch] text-graphite">{outcomes.title}</h2>
      </Reveal>

      <Reveal delay={90}>
        <p className="t-label mt-6 text-brass-deep">{outcomes.lead}</p>
      </Reveal>

      <ol className="mt-10 grid list-none gap-0 lg:grid-cols-2 lg:gap-x-16">
        {outcomes.items.map((item, index) => (
          <Reveal as="li" key={item} delay={index * 60} className="border-t border-rule">
            <div className="flex items-baseline gap-5 py-6 sm:gap-7 sm:py-7">
              <span className="t-label tnum shrink-0 text-brass-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="t-body max-w-none text-graphite">{item}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <CtaButton location="outcomes" className="mt-12 w-full sm:w-auto">
          {outcomes.cta}
        </CtaButton>
      </Reveal>
    </Section>
  );
}
