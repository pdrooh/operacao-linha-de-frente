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
                  "group relative h-full overflow-hidden rounded-md bg-bone-raised p-6 sm:p-7",
                  "border transition-[border-color,transform,box-shadow] duration-400 [transition-timing-function:var(--ease-out-quint)]",
                  "hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
                  // O sétimo resume os outros seis, então já vem com a borda em latão.
                  ultimo ? "border-[color-mix(in_oklab,var(--color-brass)_55%,transparent)]" : "border-rule hover:border-brass",
                )}
              >
                {/* Fio de latão no topo, o mesmo do painel de investimento. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px opacity-70 transition-opacity duration-400 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--color-brass), transparent)",
                  }}
                />

                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full text-brass-deep",
                    "border border-[color-mix(in_oklab,var(--color-brass)_45%,transparent)]",
                    "bg-[color-mix(in_oklab,var(--color-brass)_13%,transparent)]",
                    "transition-colors duration-400 group-hover:border-brass group-hover:bg-[color-mix(in_oklab,var(--color-brass)_22%,transparent)]",
                  )}
                >
                  <Icone />
                </span>
                <p
                  className={cn(
                    "mt-5 text-graphite",
                    ultimo
                      ? "t-h3 max-w-[30ch]"
                      : "text-[1.125rem] leading-snug",
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
