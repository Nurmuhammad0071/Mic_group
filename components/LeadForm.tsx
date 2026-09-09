"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";

type FormState = "idle" | "submitting" | "success" | "error";

const PHONE_PREFIX = "+998";

function localPhoneDigits(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  return digits.slice(0, 9);
}

function formatUzPhone(value: string) {
  const d = localPhoneDigits(value);
  let formatted = PHONE_PREFIX;
  if (d.length === 0) return `${formatted} `;
  formatted += ` ${d.slice(0, 2)}`;
  if (d.length > 2) formatted += ` ${d.slice(2, 5)}`;
  if (d.length > 5) formatted += `-${d.slice(5, 7)}`;
  if (d.length > 7) formatted += `-${d.slice(7, 9)}`;
  return formatted;
}

function buildSchema(dict: Dictionary) {
  return z.object({
    name: z.string().trim().min(2, dict.form.errors.name),
    phone: z
      .string()
      .trim()
      .refine((value) => localPhoneDigits(value).length === 9, dict.form.errors.phone),
    company: z.string().trim().optional(),
    industry: z.string().min(1, dict.form.errors.industry),
    message: z.string().trim().optional(),
  });
}

type FormValues = {
  name: string;
  phone: string;
  company?: string;
  industry: string;
  message?: string;
};

export default function LeadForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [state, setState] = useState<FormState>("idle");
  const schema = buildSchema(dict);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "+998 ", company: "", industry: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setState("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      const event_id = crypto.randomUUID();
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {}, { eventID: event_id });
      }
      void fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id,
          event_source_url: window.location.href,
          phone: values.phone,
        }),
      }).catch(() => {});
      setState("success");
      reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-ink-raised p-8 md:p-10">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink">
          <Check size={20} strokeWidth={2.5} />
        </span>
        <h3 className="text-xl font-semibold text-paper">
          {dict.form.successTitle}
        </h3>
        <p className="text-sm leading-relaxed text-paper-dim">
          {dict.form.successText}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-lg border border-line bg-ink-raised p-6 md:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-paper-dim">
            {dict.form.labels.name}
          </label>
          <input
            id="name"
            type="text"
            placeholder={dict.form.placeholders.name}
            {...register("name")}
            aria-invalid={!!errors.name}
            className="rounded border border-line-strong bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-gold"
          />
          {errors.name && (
            <span className="text-xs text-red-400">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-paper-dim">
            {dict.form.labels.phone}
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={17}
            placeholder={dict.form.placeholders.phone}
            {...register("phone", {
              onChange: (event) => {
                event.target.value = formatUzPhone(event.target.value);
              },
            })}
            onKeyDown={(event) => {
              const start = event.currentTarget.selectionStart ?? 0;
              const end = event.currentTarget.selectionEnd ?? 0;
              if (
                (event.key === "Backspace" || event.key === "Delete") &&
                start <= 5 &&
                end <= 5 &&
                localPhoneDigits(event.currentTarget.value).length === 0
              ) {
                event.preventDefault();
              }
            }}
            aria-invalid={!!errors.phone}
            className="rounded border border-line-strong bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-gold"
          />
          {errors.phone && (
            <span className="text-xs text-red-400">{errors.phone.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm text-paper-dim">
            {dict.form.labels.company}
          </label>
          <input
            id="company"
            type="text"
            placeholder={dict.form.placeholders.company}
            {...register("company")}
            className="rounded border border-line-strong bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-gold"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="industry" className="text-sm text-paper-dim">
            {dict.form.labels.industry}
          </label>
          <select
            id="industry"
            defaultValue=""
            {...register("industry")}
            aria-invalid={!!errors.industry}
            className="rounded border border-line-strong bg-ink px-4 py-3 text-sm text-paper focus:border-gold"
          >
            <option value="" disabled>
              {dict.form.industryPlaceholder}
            </option>
            {dict.form.industryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.industry && (
            <span className="text-xs text-red-400">
              {errors.industry.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="text-sm text-paper-dim">
            {dict.form.labels.message}
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder={dict.form.placeholders.message}
            {...register("message")}
            className="resize-none rounded border border-line-strong bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-gold"
          />
        </div>
      </div>

      {state === "error" && (
        <div className="mt-6 flex items-start gap-3 rounded border border-red-900 bg-red-950/40 px-4 py-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
          <div>
            <p className="text-sm font-medium text-red-300">
              {dict.form.errorTitle}
            </p>
            <p className="mt-0.5 text-sm text-red-400/80">
              {dict.form.errorText}
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded bg-gold px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-gold-bright disabled:opacity-70 sm:w-auto"
      >
        {state === "submitting" && (
          <Loader2 size={16} className="animate-spin" />
        )}
        {state === "submitting" ? dict.form.submitting : dict.form.submit}
      </button>
    </form>
  );
}
