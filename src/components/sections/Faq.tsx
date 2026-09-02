import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";
import { offer } from "@/config/offer";
import { site } from "@/config/site";

import { FaqItem } from "./FaqItem";

const faq = content.faq;

export function Faq() {
  /* Perguntas cuja resposta depende de validação pendente não são publicadas. */
  const items = faq.items.filter((item) => !("claim" in item) || offer.claims[item.claim]);

  return (
    <Section id="faq" index={9} station={faq.station} tone="paper">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="t-h2 text-graphite">{faq.title}</h2>
        </Reveal>

        <div className="lg:col-span-8">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <FaqItem question={item.q} answer={item.a}>
                {"whatsappCta" in item && site.whatsappUrl ? (
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost mt-5 min-h-[46px] text-graphite"
                  >
                    {item.whatsappCta}
                  </a>
                ) : null}
              </FaqItem>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
