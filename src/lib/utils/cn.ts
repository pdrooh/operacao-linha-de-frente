/**
 * Concatena classes condicionais. Substitui clsx para uma necessidade que o
 * projeto resolve em cinco linhas — uma dependência a menos no bundle.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
