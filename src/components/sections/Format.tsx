import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const format = content.format;

export function Format() {
  return (
    <Section id="formato" index={5} station={format.station} tone="paper-raised">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="t-h2 text-graphite">{format.title}</h2>
        </Reveal>

        <div className="lg:col-span-7">
          {format.paragraphs.map((paragrafo, index) => (
            <Reveal key={paragrafo} delay={index * 90}>
              <p className="t-body mt-5 text-graphite-soft first:mt-0">{paragrafo}</p>
            </Reveal>
          ))}

          <Reveal delay={180}>
            <p className="t-label mt-10 text-brass-deep">{format.listLabel}</p>
          </Reveal>

          <ul className="mt-4 grid list-none gap-0">
            {format.items.map((item, index) => (
              <Reveal as="li" key={item} delay={220 + index * 70} className="border-t border-rule last:border-b">
                <div className="flex items-center gap-4 py-4">
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M1 5.2L4.6 8.8L12 1.2" stroke="var(--color-brass-deep)" strokeWidth="1.6" />
                  </svg>
                  <span className="text-[1.0625rem] text-graphite">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={420}>
            <p className="mt-10 text-[clamp(1.25rem,1.05rem+1vw,1.75rem)] font-semibold leading-snug tracking-[-0.025em] text-graphite">
              {format.remate}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
