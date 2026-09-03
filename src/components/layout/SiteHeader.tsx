"use client";

import { useEffect, useState } from "react";

import { CtaButton } from "@/components/ui/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { content } from "@/config/content";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: "#mecanismo", rotulo: "Método" },
  { href: "#transformacao", rotulo: "O que muda" },
  { href: "#prova", rotulo: "Depoimentos" },
  { href: "#thiago-moura", rotulo: "Quem conduz" },
  { href: "#detalhes", rotulo: "Detalhes" },
];

export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setCondensed(window.scrollY > 24);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
        condensed
          ? "border-b border-[color-mix(in_oklab,var(--color-brass)_18%,transparent)] bg-[color-mix(in_oklab,var(--color-ink)_88%,transparent)] backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="#topo" className="-my-2 flex min-h-[44px] items-center py-2" aria-label="Início">
            <Logo tone="light" width={116} priority />
          </a>
        </div>

        {/* Âncoras para as seções que decidem: método, prova, quem conduz, preço. */}
        <nav aria-label="Seções da página" className="hidden xl:block">
          <ul className="flex list-none items-center gap-7">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="t-label text-bone/60 transition-colors hover:text-brass"
                >
                  {link.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <CtaButton
          location="header"
          variant="ghost"
          className="hidden min-h-[44px] px-5 text-[0.6875rem] tracking-[0.12em] text-bone lg:inline-flex"
        >
          {content.hero.cta}
        </CtaButton>
      </div>
    </header>
  );
}
