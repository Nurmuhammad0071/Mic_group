import type { Dictionary } from "@/lib/dictionaries";

export default function HowWeWork({ dict }: { dict: Dictionary }) {
  return (
    <section id="process" className="border-b border-line py-20 md:py-28">
      <div className="container-content">
        <div className="max-w-xl">
          <p className="mb-4 text-sm text-gold">{dict.process.kicker}</p>
          <h2 className="text-3xl font-bold tracking-tight text-paper md:text-4xl">
            {dict.process.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper-dim">
            {dict.process.subtitle}
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <li key={step.title} className="relative pt-8">
              <span className="absolute left-0 top-0 block h-px w-10 bg-gold" />
              <span className="mb-3 block font-display text-sm text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-paper">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
