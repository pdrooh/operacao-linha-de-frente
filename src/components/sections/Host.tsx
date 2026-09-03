import Image from "next/image";

import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { content } from "@/config/content";

const host = content.host;

export function Host() {
  return (
    <Section id="thiago-moura" index={8} station={host.station} tone="paper-raised">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure className="m-0 overflow-hidden rounded-md bg-ink">
            <Image
              src="/thiago/thiago-retrato.jpg"
              alt="Retrato de Thiago Moura"
              width={900}
              height={1124}
              loading="lazy"
              sizes="(max-width: 1024px) 90vw, 420px"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="t-h2 text-graphite">{host.title}</h2>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-4 text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] font-semibold tracking-[-0.03em] text-brass-deep">
              {host.name}
            </p>
          </Reveal>

          <ul className="mt-8 grid list-none gap-0">
            {host.credentials.map((item, index) => (
              <Reveal as="li" key={item} delay={140 + index * 80} className="border-t border-rule last:border-b">
                <p className="t-body max-w-none py-4 text-graphite">{item}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={400}>
            <p className="t-body mt-8 text-graphite-soft">{host.remate}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
