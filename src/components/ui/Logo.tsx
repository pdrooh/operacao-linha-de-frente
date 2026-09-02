import Image from "next/image";

import logo from "@/../public/brand/docfounder-logo.png";
import { cn } from "@/lib/utils/cn";

/**
 * Marca oficial DocFounder. O arquivo original é tinta escura sobre
 * transparência; sobre superfícies profundas ele é invertido para branco em vez
 * de recolorido, preservando as proporções do logotipo.
 */
export function Logo({
  tone = "dark",
  width = 122,
  className,
  priority = false,
}: {
  tone?: "dark" | "light";
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt="DocFounder"
      width={width}
      height={Math.round((width * 50) / 250)}
      priority={priority}
      className={cn(tone === "light" && "brightness-0 invert", className)}
    />
  );
}
