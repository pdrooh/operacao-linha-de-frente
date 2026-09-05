import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const mechanism = content.mechanism;

export function Journey() {
  return (
    <Section id="mecanismo" index={3} station={mechanism.station} tone="deep">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="t-h2 max-w-[15ch] text-bone">{mechanism.title}</h2>
        </Reveal>

        <div className="lg:col-span-6 lg:pt-3">
          <Reveal delay={120}>
            <p className="t-body text-bone/72">{mechanism.lead}</p>
          </Reveal>
          <Reveal delay={200}>
            <p className="t-body mt-6 text-bone/72">{mechanism.remate}</p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={80}>
        <p className="t-label mt-20 flex items-start gap-3 leading-[1.5] text-bone/62 sm:mt-28">
          <span aria-hidden="true" className="mt-[0.42em] h-px w-7 shrink-0 bg-brass" />
          {mechanism.stagesLabel}
        </p>

        <ol className="journey mt-10 lg:mt-4">
          {mechanism.stages.map((stage, index) => (
            <li
              key={stage.id}
              className="journey-step"
              style={{ "--node-delay": `${index * 110}ms` } as React.CSSProperties}
            >
              <span aria-hidden="true" className="journey-dot" />
              <div className="journey-body">
                <h3 className="t-label text-brass">{stage.name}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-bone/65">{stage.caption}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
