import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { TestimonialStrip } from "@/components/testimonials/TestimonialStrip";
import { content } from "@/config/content";

const proof = content.proof;

export function Proof() {
  return (
    <Section id="prova" index={6} station={proof.station} tone="paper">
      <Reveal>
        <h2 className="t-h2 max-w-[20ch] text-graphite">{proof.title}</h2>
      </Reveal>

      <Reveal delay={120}>
        <TestimonialStrip />
      </Reveal>
    </Section>
  );
}
