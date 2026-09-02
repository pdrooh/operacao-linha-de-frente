import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";
import { TestimonialStrip } from "@/components/testimonials/TestimonialStrip";
import { testimonials } from "@/config/testimonials";

const proof = content.proof;

export function Proof() {
  return (
    <Section id="prova" index={3} station={proof.station} tone="paper-raised">
      <Reveal>
        <h2 className="t-h2 max-w-[20ch] text-graphite">{proof.title}</h2>
      </Reveal>

      <Reveal delay={120}>
        {/* Faixa rolável: profissionais reais, sem grade artificial. */}
        <TestimonialStrip />
      </Reveal>

      {/* A nota de pendência some sozinha quando todos os vídeos estiverem no ar. */}
      {testimonials.some((t) => !t.videoSrc) ? (
        <Reveal delay={80}>
          <p className="t-meta mt-6 flex max-w-[62ch] items-start gap-3 text-graphite-soft">
            <span aria-hidden="true" className="mt-2 block h-px w-6 shrink-0 bg-brass-deep" />
            {proof.pendingNote}
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}
