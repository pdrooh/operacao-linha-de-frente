"use client";

import { useLeadModal } from "@/components/modal/LeadModalContext";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils/cn";

/**
 * Todo CTA principal da página abre o mesmo `LeadCaptureModal`. `location`
 * identifica a origem do clique nos relatórios.
 */
export function CtaButton({
  location,
  children,
  className,
  variant = "primary",
}: {
  location: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const { open } = useLeadModal();

  return (
    <button
      type="button"
      className={cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)}
      onClick={() => {
        analytics.track("cta_click", { location });
        open(location);
      }}
    >
      {children}
      {variant === "primary" ? (
        <svg width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true">
          <path d="M0 5h13M9.4 1L13.5 5l-4.1 4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : null}
    </button>
  );
}
