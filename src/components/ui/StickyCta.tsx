"use client";

import { useEffect, useState } from "react";

import { useLeadModal } from "@/components/modal/LeadModalContext";
import { content } from "@/config/content";
import { analytics } from "@/lib/analytics";
import { offer, formatPrice } from "@/config/offer";

/**
 * CTA fixo no mobile. Aparece só depois que o visitante passa do hero — antes
 * disso o CTA principal já está em tela e a barra seria ruído. Some enquanto o
 * modal está aberto.
 */
export function StickyCta() {
  const { open, isOpen } = useLeadModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.9);
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

  const shown = visible && !isOpen;

  return (
    <div
      className="safe-b fixed inset-x-0 bottom-0 z-40 border-t border-[color-mix(in_oklab,var(--color-brass)_22%,transparent)] bg-[color-mix(in_oklab,var(--color-ink)_94%,transparent)] px-4 pt-3 backdrop-blur-md transition-transform duration-400 [transition-timing-function:var(--ease-out-quint)] lg:hidden"
      style={{ transform: shown ? "translateY(0)" : "translateY(110%)" }}
      inert={!shown}
    >
      <div className="flex items-center gap-3">
        <p className="tnum shrink-0 whitespace-nowrap text-[0.9375rem] leading-tight text-bone/70">
          <span className="block font-semibold text-bone">{formatPrice()}</span>
          <span>{offer.seats} vagas</span>
        </p>
        <button
          type="button"
          className="btn btn-primary min-h-[52px] flex-1 px-4 text-[0.9375rem]"
          onClick={() => {
            analytics.track("cta_click", { location: "sticky" });
            open("sticky");
          }}
        >
          {content.stickyCta.label}
        </button>
      </div>
    </div>
  );
}
