import {
  IconAudience,
  IconCalendar,
  IconPrice,
  IconSeats,
} from "@/components/ui/Icons";
import { formatPrice, offer } from "@/config/offer";
import { cn } from "@/lib/utils/cn";

/**
 * Faixa de fatos entre o hero e a narrativa.
 *
 * Repete de propósito o que o hero já diz. Quem chega por anúncio decide por
 * quatro dados — formato, vagas, preço e para quem é —, e a faixa os mantém a
 * uma rolagem curta de distância sem obrigar a voltar ao topo.
 */
export function FactBar() {
  const { event, seats } = offer;

  const fatos = [
    {
      Icone: IconCalendar,
      rotulo: "Imersão presencial",
      valor: `${event.dateLabel}, ${event.timeLabel.toLowerCase()}`,
    },
    { Icone: IconSeats, rotulo: `${seats} vagas`, valor: "Turma fechada, para troca real entre as participantes." },
    { Icone: IconPrice, rotulo: "Investimento", valor: `${formatPrice()}, sem bônus de antecipação nesta turma.` },
    { Icone: IconAudience, rotulo: "Para a linha de frente", valor: "Secretárias e profissionais da recepção." },
  ];

  return (
    <section aria-label="Resumo da imersão" className="surface-deep grain relative border-y border-[color-mix(in_oklab,var(--color-brass)_22%,transparent)]">
      <div className="shell relative">
        <ul className="grid list-none gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {fatos.map(({ Icone, rotulo, valor }, index) => (
            <li
              key={rotulo}
              className={cn(
                "flex items-start gap-4 py-7 sm:py-8",
                // Régua de 1px separando as colunas, só onde elas ficam lado a lado.
                "border-b border-[color-mix(in_oklab,var(--color-brass)_14%,transparent)] last:border-b-0",
                "sm:border-b-0 lg:pr-8",
                index > 0 &&
                  "lg:border-l lg:border-[color-mix(in_oklab,var(--color-brass)_14%,transparent)] lg:pl-6",
              )}
            >
              <Icone className="mt-0.5 shrink-0 text-brass" />
              <div>
                <p className="t-label text-bone">{rotulo}</p>
                <p className="t-meta mt-2 max-w-[26ch] text-bone/62">{valor}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
