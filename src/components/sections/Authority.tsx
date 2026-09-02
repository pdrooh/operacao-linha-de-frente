import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { Logo } from "@/components/ui/Logo";
import { content } from "@/config/content";

const authority = content.authority;

export function Authority() {
  return (
    <Section id="docfounder" index={7} station={authority.station} tone="deep">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <Logo tone="light" width={190} />
          <p className="t-label mt-4 text-bone/62">Gestão de Clínicas Médicas</p>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-8">
          <p className="text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)] font-semibold leading-[1.18] tracking-[-0.03em] text-bone">
            {authority.title}{" "}
            <span className="text-bone/55">{authority.titleRest}</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
