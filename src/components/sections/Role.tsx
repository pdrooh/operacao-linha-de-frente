import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const role = content.role;

export function Role() {
  return (
    <Section id="seu-papel" index={2} station={role.station} tone="paper-raised">
      <Reveal>
        <h2 className="t-h2 max-w-[16ch] text-graphite">{role.title}</h2>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          {role.paragraphs.map((paragrafo, index) => (
            <Reveal key={paragrafo} delay={index * 90}>
              <p className="t-body mt-6 text-graphite-soft first:mt-0">{paragrafo}</p>
            </Reveal>
          ))}
        </div>

        {/* Improviso × método: o contraste central da página. */}
        <Reveal delay={140} className="lg:col-span-6">
          <div className="grid gap-0">
            <div className="border-t-2 border-dashed border-[color-mix(in_oklab,var(--color-graphite)_22%,transparent)] pt-5">
              <p className="t-label text-graphite-soft">No improviso</p>
              <p className="t-body mt-3 max-w-none text-graphite-soft">{role.shift.from}</p>
            </div>
            <div className="mt-8 border-t-2 border-brass-deep pt-5">
              <p className="t-label text-brass-deep">Com método</p>
              <p className="t-body mt-3 max-w-none font-medium text-graphite">{role.shift.to}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
