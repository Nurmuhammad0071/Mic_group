import type { Dictionary } from "@/lib/dictionaries";

export default function CtaSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-line bg-ink-raised py-20 md:py-24">
      <div className="container-content flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold tracking-tight text-paper md:text-3xl">
            {dict.cta.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-paper-dim">
            {dict.cta.text}
          </p>
        </div>
        <a
          href="#lead-form"
          className="shrink-0 rounded bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-gold-bright"
        >
          {dict.cta.button}
        </a>
      </div>
    </section>
  );
}
