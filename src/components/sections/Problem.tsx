import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const problem = content.problem;

export function Problem() {
  return (
    <Section id="problema" index={1} station={problem.station} tone="paper">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="t-h2 max-w-[18ch] text-graphite">{problem.title}</h2>
        </Reveal>

        <div className="lg:col-span-6 lg:pt-2">
          {/* As quatro falhas, uma por linha: a repetição é o argumento. */}
          <ul className="grid list-none gap-0">
            {problem.falhas.map((falha, index) => (
              <Reveal as="li" key={falha} delay={index * 80} className="border-t border-rule last:border-b">
                <p className="t-body max-w-none py-4 text-graphite">{falha}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={340}>
            <p className="t-label mt-6 text-brass-deep">{problem.remate}</p>
          </Reveal>

          {problem.paragraphs.map((paragrafo, index) => (
            <Reveal key={paragrafo} delay={400 + index * 80}>
              <p className="t-body mt-6 text-graphite-soft">{paragrafo}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
