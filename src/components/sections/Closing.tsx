import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { content } from "@/config/content";

const closing = content.closing;

export function Closing() {
  return (
    <Section id="decisao" index={13} station={closing.station} tone="deep">
      <div className="max-w-[52ch]">
        <Reveal>
          <h2 className="t-h2 text-bone/55">{closing.title}</h2>
        </Reveal>

        <Reveal delay={110}>
          <p className="t-h2 mt-4 text-bone">{closing.subtitle}</p>
        </Reveal>

        <Reveal delay={200}>
          <p className="t-body mt-10 text-bone/72">{closing.paragraph}</p>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-8 border-t border-brass pt-8 text-[clamp(1.35rem,1.1rem+1.2vw,2rem)] font-semibold tracking-[-0.028em] text-brass">
            {closing.remate}
          </p>
        </Reveal>

        <Reveal delay={340}>
          <CtaButton location="closing" className="mt-10 w-full sm:w-auto">
            {closing.cta}
          </CtaButton>
        </Reveal>
      </div>
    </Section>
  );
}
