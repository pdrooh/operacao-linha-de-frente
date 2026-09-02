import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";
import { offer } from "@/config/offer";

const program = content.program;

export function Program() {
  /* Itens cuja alegação depende de validação do cliente ficam fora do ar até lá. */
  const items = program.items.filter(
    (item) => !("claim" in item) || offer.claims[item.claim],
  );

  return (
    <Section id="programa" index={5} station={program.station} tone="paper-raised">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="t-h2 text-graphite">{program.title}</h2>
        </Reveal>

        <dl className="m-0 grid gap-0 lg:col-span-8">
          {items.map((item, index) => (
            <Reveal key={item.label} delay={index * 70} className="border-t border-rule first:border-t-0 lg:first:border-t">
              <div className="flex items-start gap-5 py-6 sm:gap-7">
                <span aria-hidden="true" className="mt-2.5 block h-px w-6 shrink-0 bg-brass-deep sm:w-9" />
                <div>
                  <dt className="t-h3 text-graphite">{item.label}</dt>
                  <dd className="t-meta m-0 mt-2 max-w-[52ch] text-graphite-soft">{item.detail}</dd>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
