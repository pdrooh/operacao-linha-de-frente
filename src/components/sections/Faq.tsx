import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

import { FaqItem } from "./FaqItem";

const faq = content.faq;

export function Faq() {
  return (
    <Section id="faq" index={11} station={faq.station} tone="paper">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="t-h2 text-graphite">{faq.title}</h2>
        </Reveal>

        <div className="lg:col-span-8">
          {faq.items.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <FaqItem question={item.q} answer={item.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
