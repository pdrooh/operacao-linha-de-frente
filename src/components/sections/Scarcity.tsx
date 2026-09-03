import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { content } from "@/config/content";
import { offer } from "@/config/offer";

const scarcity = content.scarcity;

export function Scarcity() {
  return (
    <Section id="vagas" index={12} station={scarcity.station} tone="paper-raised">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          {/* O número é o argumento: escassez real, declarada pelo cliente. */}
          <p className="tnum text-[clamp(4.5rem,3rem+7vw,9rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-brass-deep">
            {offer.seats}
          </p>
          <h2 className="t-h3 mt-4 text-graphite">{scarcity.title}</h2>
        </Reveal>

        <div className="lg:col-span-7">
          {scarcity.paragraphs.map((paragrafo, index) => (
            <Reveal key={paragrafo} delay={index * 90}>
              <p className="t-body mt-5 text-graphite-soft first:mt-0">{paragrafo}</p>
            </Reveal>
          ))}

          <Reveal delay={200}>
            <CtaButton location="scarcity" className="mt-9 w-full sm:w-auto">
              {scarcity.cta}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
