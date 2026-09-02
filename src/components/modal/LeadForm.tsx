"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";

import { content } from "@/config/content";
import { site } from "@/config/site";
import { analytics } from "@/lib/analytics";
import { startCheckout } from "@/lib/leads/lead-service";
import { cn } from "@/lib/utils/cn";
import { maskPhone } from "@/lib/utils/phone";
import { collectFieldErrors, LeadSchema, type FieldErrors } from "@/lib/validation/lead";

const copy = content.modal;

type Status = "idle" | "loading" | "pending" | "error";

type FormState = {
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  marketingConsent: boolean;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  email: "",
  consent: false,
  marketingConsent: false,
};

export function LeadForm({ source, onClose }: { source: string; onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const titleId = useId();
  const descriptionId = useId();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!startedRef.current) {
      startedRef.current = true;
      analytics.track("lead_form_start", { source });
    }
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key as keyof FieldErrors];
      return next;
    });
  };

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const order: Array<keyof FieldErrors> = ["name", "phone", "email", "consent"];
    const first = order.find((key) => fieldErrors[key]);
    if (!first) return;
    const element = formRef.current?.elements.namedItem(first);
    if (element instanceof HTMLElement) element.focus();
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const parsed = LeadSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = collectFieldErrors(parsed.error);
      setErrors(fieldErrors);
      analytics.track("lead_form_invalid", { fields: Object.keys(fieldErrors).join(",") });
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    analytics.track("lead_form_submit", { source });

    const result = await startCheckout(parsed.data);

    if (result.status === "redirect") {
      analytics.track("checkout_redirect", {});
      window.location.assign(result.url);
      return;
    }

    setStatus(result.status === "pending_integration" ? "pending" : "error");
  }

  if (status === "pending") {
    return <PendingIntegrationPanel titleId={titleId} descriptionId={descriptionId} onClose={onClose} />;
  }

  const isLoading = status === "loading";

  return (
    <>
      <p className="t-label text-brass-deep">Operação Linha de Frente</p>
      <h2 id={titleId} className="t-h3 mt-3 text-graphite">
        {copy.title}
      </h2>
      <p id={descriptionId} className="t-meta mt-2 text-graphite-soft">
        {copy.lead}
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5">
        <Field
          name="name"
          label={copy.fields.name.label}
          placeholder={copy.fields.name.placeholder}
          value={form.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => update("name", value)}
        />

        <Field
          name="phone"
          label={copy.fields.phone.label}
          placeholder={copy.fields.phone.placeholder}
          value={form.phone}
          error={errors.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          onChange={(value) => update("phone", maskPhone(value))}
        />

        <Field
          name="email"
          label={copy.fields.email.label}
          placeholder={copy.fields.email.placeholder}
          value={form.email}
          error={errors.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          onChange={(value) => update("email", value)}
        />

        <div className="grid gap-3">
          <Checkbox
            name="consent"
            checked={form.consent}
            error={errors.consent}
            onChange={(value) => update("consent", value)}
          >
            {copy.consentPrefix}
            <Link
              href={site.legal.privacy}
              className="underline decoration-brass decoration-1 underline-offset-2 hover:text-brass-deep"
            >
              {copy.consentLinkLabel}
            </Link>
            .
          </Checkbox>

          <Checkbox
            name="marketingConsent"
            checked={form.marketingConsent}
            onChange={(value) => update("marketingConsent", value)}
          >
            {copy.marketing}
          </Checkbox>
        </div>

        <div aria-live="polite">
          {status === "error" ? (
            <p className="t-meta rounded-sm border border-[color-mix(in_oklab,var(--color-alert)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-alert)_7%,transparent)] px-3 py-2.5 text-[color-mix(in_oklab,var(--color-alert)_88%,black)]">
              {copy.genericError}
            </p>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner />
              {copy.submitting}
            </>
          ) : (
            copy.submit
          )}
        </button>
      </form>
    </>
  );
}

/* ------------------------------------------------------------------------- */

type FieldProps = {
  name: keyof FormState;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  onChange: (value: string) => void;
};

function Field({
  name,
  label,
  placeholder,
  value,
  error,
  type = "text",
  inputMode,
  autoComplete,
  onChange,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.8125rem] font-semibold tracking-[-0.005em] text-graphite">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field"
      />
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="t-meta mt-2 text-[color-mix(in_oklab,var(--color-alert)_88%,black)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

type CheckboxProps = {
  name: keyof FormState;
  checked: boolean;
  error?: string;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
};

function Checkbox({ name, checked, error, onChange, children }: CheckboxProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-xs border bg-bone",
            "checked:border-brass-deep checked:bg-brass-deep",
            "bg-[length:11px_11px] bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M2%206.5L4.8%209.2L10%203.4%22%20stroke%3D%22%23fbfaf9%22%20stroke-width%3D%221.9%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]",
            error ? "border-alert" : "border-rule",
          )}
        />
        <label htmlFor={id} className="t-meta cursor-pointer text-graphite-soft">
          {children}
        </label>
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="t-meta mt-1.5 pl-[30px] text-[color-mix(in_oklab,var(--color-alert)_88%,black)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="animate-spin"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PendingIntegrationPanel({
  titleId,
  descriptionId,
  onClose,
}: {
  titleId: string;
  descriptionId: string;
  onClose: () => void;
}) {
  return (
    <div className="py-2">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-brass bg-[color-mix(in_oklab,var(--color-brass)_12%,transparent)]">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
          <path
            d="M3 8.8L6.7 12.5L14 4.5"
            stroke="var(--color-brass-deep)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h2 id={titleId} className="t-h3 mt-5 text-graphite">
        Dados validados.
      </h2>
      <p id={descriptionId} className="t-meta mt-3 max-w-[46ch] text-graphite-soft">
        A etapa de pagamento ainda não está conectada neste ambiente. Nenhum dado foi
        enviado. Assim que a integração com o Stripe entrar no ar, este mesmo formulário
        segue direto para o checkout.
      </p>

      <button type="button" onClick={onClose} className="btn btn-ghost mt-7 w-full text-graphite">
        Fechar
      </button>
    </div>
  );
}
