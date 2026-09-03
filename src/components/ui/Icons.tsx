/**
 * Conjunto próprio de ícones de traço, desenhado para esta página.
 *
 * Uma biblioteca de ícones traria centenas de formas e um peso que não se
 * justifica pelas poucas que a página usa. Todos partilham a mesma grade de 24, traço de 1.5 e junções
 * arredondadas, e herdam a cor do texto — é o que os faz parecer uma família.
 */

type IconProps = {
  size?: number;
  className?: string;
};

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
}

/** Data e horário. */
export function IconCalendar({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

/** Turma, vagas, grupo. */
export function IconSeats({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2" />
      <path d="M16.5 6.2a3.2 3.2 0 0 1 0 6.1M18 20c0-2.6-1-4.3-2.6-5.2" />
    </svg>
  );
}

/** Investimento. */
export function IconPrice({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M20.6 12.9 12.9 20.6a2 2 0 0 1-2.8 0L3 13.5V4.5A1.5 1.5 0 0 1 4.5 3h9l7.1 7.1a2 2 0 0 1 0 2.8Z" />
      <circle cx="8" cy="8" r="1.4" />
    </svg>
  );
}

/** Local, endereço. */
export function IconPlace({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 21s7-5.4 7-10.6A7 7 0 0 0 5 10.4C5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.6" />
    </svg>
  );
}

/** Público a que se destina. */
export function IconAudience({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="7.5" r="3.4" />
      <path d="M5 20.5c0-3.6 3.1-6.1 7-6.1 1.4 0 2.7.3 3.8.9" />
      <path d="m16.4 19.2 1.7 1.7 3.4-3.6" />
    </svg>
  );
}

/** Duração, um dia inteiro. */
export function IconClock({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" />
    </svg>
  );
}

/* --- Perfis da imersão ---------------------------------------------------- */

/** Trabalho na secretaria da clínica. */
export function IconDesk({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3 12h18M4.5 12V7.5A1.5 1.5 0 0 1 6 6h12a1.5 1.5 0 0 1 1.5 1.5V12" />
      <path d="M5 12v6M19 12v6M9 9h6" />
    </svg>
  );
}

/** Recepção, primeiro contato presencial. */
export function IconBell({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 17h16M6 17a6 6 0 0 1 12 0" />
      <path d="M12 5.5V7" />
      <circle cx="12" cy="4.4" r="1.1" />
      <path d="M3 20.5h18" />
    </svg>
  );
}

/** Comunicação com segurança. */
export function IconChat({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M20.5 12.4c0 3.9-3.8 7-8.5 7-1 0-2-.14-2.9-.4L4 20.5l1.6-3.7A6.6 6.6 0 0 1 3.5 12.4c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7Z" />
      <path d="M9 11.5h6M9 14h3.5" />
    </svg>
  );
}

/** Profissional preparada e valorizada. */
export function IconAward({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="9" r="5.2" />
      <path d="m8.6 13.6-1.3 6.9 4.7-2.6 4.7 2.6-1.3-6.9" />
    </svg>
  );
}

/** Objeções, agendas cheias, nós a desatar. */
export function IconTangle({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 6c5 0 5 12 10 12 3 0 4-2 4-4" />
      <path d="M20 8c-5 0-5 10-10 10" />
      <circle cx="4" cy="6" r="1.4" />
      <circle cx="20" cy="8" r="1.4" />
    </svg>
  );
}

/** Rotina organizada. */
export function IconChecklist({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M10 7h10M10 12h10M10 17h6" />
      <path d="m4 6.6 1.3 1.3L7.6 5.4M4 11.6l1.3 1.3 2.3-2.5M4 16.6l1.3 1.3 2.3-2.5" />
    </svg>
  );
}

/** Atendimento como estratégia. */
export function IconStrategy({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 3.6V7M12 17v3.4M3.6 12H7M17 12h3.4" />
    </svg>
  );
}
