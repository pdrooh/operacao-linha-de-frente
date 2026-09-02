import { z } from "zod";

import { normalizeEmail } from "@/lib/utils/email";
import { isPlausibleName, normalizeName } from "@/lib/utils/name";
import { isValidBrazilianPhone, toE164 } from "@/lib/utils/phone";

/**
 * Schemas compartilhados entre browser e servidor.
 *
 * O mesmo módulo será importado pela futura rota `POST /api/checkout`: o
 * frontend valida para dar feedback rápido, o servidor valida de novo porque
 * nunca confia no cliente.
 */

export const UTMSchema = z.object({
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(160).optional(),
  utm_content: z.string().max(160).optional(),
  utm_term: z.string().max(160).optional(),
  gclid: z.string().max(200).optional(),
  fbclid: z.string().max(200).optional(),
  ttclid: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  landing_path: z.string().max(300).optional(),
});

export type UTMPayload = z.infer<typeof UTMSchema>;

export const LeadSchema = z.object({
  name: z
    .string()
    .transform(normalizeName)
    .refine((v) => v.length > 0, { message: "Informe seu nome." })
    .refine(isPlausibleName, { message: "Informe seu nome completo." }),

  phone: z
    .string()
    .refine((v) => v.trim().length > 0, { message: "Informe seu WhatsApp." })
    .refine(isValidBrazilianPhone, { message: "WhatsApp inválido. Use DDD + número." })
    .transform((v) => toE164(v) as string),

  email: z
    .string()
    .transform(normalizeEmail)
    .refine((v) => v.length > 0, { message: "Informe seu e-mail." })
    .pipe(z.email({ message: "E-mail inválido." })),

  consent: z.literal(true, { message: "É preciso autorizar o uso dos dados para continuar." }),

  marketingConsent: z.boolean().default(false),
});

export type LeadInput = z.input<typeof LeadSchema>;
export type LeadPayload = z.infer<typeof LeadSchema>;

export const CheckoutSchema = LeadSchema.extend({
  utm: UTMSchema.default({}),
});

export type CheckoutPayload = z.infer<typeof CheckoutSchema>;

/** Campo -> primeira mensagem de erro. Usado para renderizar erros inline. */
export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

export function collectFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      errors[key as keyof LeadPayload] = issue.message;
    }
  }
  return errors;
}
