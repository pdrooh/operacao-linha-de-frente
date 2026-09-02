import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const transformation = content.transformation;

export function Transformation() {
  return (
    <Section id="transformacao" index={4} station={transformation.station} tone="paper">
      <Reveal>
        <h2 className="t-h2 max-w-[16ch] text-graphite">{transformation.title}</h2>
      </Reveal>

      <ol className="mt-14 grid list-none gap-0 sm:mt-16 lg:grid-cols-2 lg:gap-x-16">
        {transformation.items.map((item, index) => (
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
        <p className="mt-14 border-t-2 border-brass-deep pt-8 text-[clamp(1.5rem,1.1rem+1.7vw,2.4rem)] font-semibold tracking-[-0.03em] text-graphite sm:mt-16">
          {transformation.closing}
        </p>
      </Reveal>
    </Section>
  );
}
