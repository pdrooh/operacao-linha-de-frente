import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import {
  IconAward,
  IconBell,
  IconChat,
  IconChecklist,
  IconDesk,
  IconStrategy,
  IconTangle,
} from "@/components/ui/Icons";
import { content } from "@/config/content";
import { cn } from "@/lib/utils/cn";

const audience = content.audience;

/* Um ícone por perfil, na ordem da copy. */
const ICONES = [IconDesk, IconBell, IconChat, IconAward, IconTangle, IconChecklist, IconStrategy];

export function Audience() {
  return (
    <Section id="para-quem" index={9} station={audience.station} tone="paper">
      <Reveal>
        <h2 className="t-h2 max-w-[18ch] text-graphite">{audience.title}</h2>
      </Reveal>

      {/*
        Sete cartões numa grade de três colunas deixariam uma última fila
        capenga. O sétimo ocupa duas colunas e fecha a composição, e é
        justamente o que resume os outros seis.
      */}
      <ul className="mt-12 grid list-none gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {audience.items.map((item, index) => {
          const Icone = ICONES[index] ?? IconStrategy;
          const ultimo = index === audience.items.length - 1;

          return (
            <Reveal
              as="li"
              key={item}
              delay={index * 65}
              className={cn(ultimo && "sm:col-span-2 lg:col-span-2")}
            >
              <article
                className={cn(
                  "group h-full rounded-md border border-rule bg-bone-raised p-6 sm:p-7",
                  "transition-[border-color,transform,box-shadow] duration-400 [transition-timing-function:var(--ease-out-quint)]",
                  "hover:-translate-y-0.5 hover:border-brass hover:shadow-[var(--shadow-lift)]",
                )}
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-rule text-brass-deep transition-colors duration-400 group-hover:border-brass">
                  <Icone />
                </span>
                <p
                  className={cn(
                    "mt-5 text-graphite",
                    ultimo
                      ? "t-h3 max-w-[30ch]"
                      : "text-[1.0625rem] leading-snug",
                  )}
                >
                  {item}
                </p>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={120}>
        <p className="mt-10 border-t-2 border-brass-deep pt-8 text-[clamp(1.35rem,1.1rem+1.2vw,2rem)] text-graphite">
          {audience.remate}
        </p>
      </Reveal>
    </Section>
  );
}
