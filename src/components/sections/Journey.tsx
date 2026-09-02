import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const journey = content.journey;

export function Journey() {
  return (
    <Section id="mecanismo" index={2} station={journey.station} tone="deep">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="t-h2 max-w-[15ch] text-bone">{journey.title}</h2>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:pt-3">
          <p className="t-body text-bone/70">{journey.lead}</p>
        </Reveal>
      </div>

      {/* O deslocamento: pontilhado que não sustenta nada → linha contínua */}
      <Reveal delay={120}>
        <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2 sm:gap-10">
          <ShiftState label={journey.shiftFrom} state="from" />
          <ShiftState label={journey.shiftTo} state="to" />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <p className="t-label mt-20 flex items-start gap-3 leading-[1.5] text-bone/62 sm:mt-28">
          <span aria-hidden="true" className="mt-[0.42em] h-px w-7 shrink-0 bg-brass" />
          {journey.stagesLabel}
        </p>

        <ol className="journey mt-10 lg:mt-4">
          {journey.stages.map((stage, index) => (
            <li
              key={stage.id}
              className="journey-step"
              style={{ "--node-delay": `${index * 110}ms` } as React.CSSProperties}
            >
              <span aria-hidden="true" className="journey-dot" />
              <div className="journey-body">
                <h3 className="t-label text-brass">{stage.name}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-bone/60">{stage.caption}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

function ShiftState({ label, state }: { label: string; state: "from" | "to" }) {
  const isFrom = state === "from";

  return (
    <p className="flex flex-col gap-4">
      <span
        className={
          isFrom
            ? "text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] font-semibold tracking-[-0.03em] text-bone/40"
            : "text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] font-semibold tracking-[-0.03em] text-bone"
        }
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={
          isFrom
            ? "block h-px w-full bg-[repeating-linear-gradient(to_right,color-mix(in_oklab,var(--color-bone)_28%,transparent)_0_5px,transparent_5px_11px)]"
            : "block h-px w-full bg-brass"
        }
      />
    </p>
  );
}
