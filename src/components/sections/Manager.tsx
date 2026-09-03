import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { content } from "@/config/content";

const manager = content.manager;

/**
 * Única seção endereçada ao médico ou gestor. O resto da página fala com a
 * secretária, então o registro escuro marca a troca de interlocutor.
 */
export function Manager() {
  return (
    <Section id="gestao" index={7} station={manager.station} tone="deep">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="t-h2 max-w-[14ch] text-bone">{manager.title}</h2>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <p className="t-body text-bone/72">{manager.lead}</p>
          </Reveal>

          <ul className="mt-8 grid list-none gap-0">
            {manager.items.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={160 + index * 80}
                className="border-t border-[color-mix(in_oklab,var(--color-brass)_20%,transparent)] last:border-b"
              >
                <p className="t-body max-w-none py-5 text-bone/85">{item}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={420}>
            <p className="mt-10 max-w-[46ch] text-[clamp(1.15rem,1rem+0.8vw,1.6rem)] font-semibold leading-snug tracking-[-0.025em] text-bone">
              {manager.remate}
            </p>
          </Reveal>

          <Reveal delay={480}>
            <CtaButton location="manager" className="mt-9 w-full sm:w-auto">
              {manager.cta}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
