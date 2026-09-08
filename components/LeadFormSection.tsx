import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n-config";
import LeadForm from "./LeadForm";

export default function LeadFormSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section id="lead-form" className="border-b border-line py-20 md:py-28">
      <div className="container-content grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <p className="mb-4 text-sm text-gold">{dict.form.kicker}</p>
          <h2 className="text-3xl font-bold tracking-tight text-paper md:text-4xl">
            {dict.form.title}
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-paper-dim">
            {dict.form.subtitle}
          </p>
        </div>

        <LeadForm dict={dict} locale={locale} />
      </div>
    </section>
  );
}
