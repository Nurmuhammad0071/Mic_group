import type { Dictionary } from "@/lib/dictionaries";

export default function WhyMicGroup({ dict }: { dict: Dictionary }) {
  return (
    <section id="why" className="border-b border-line bg-ink-raised py-20 md:py-28">
      <div className="container-content grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p className="mb-4 text-sm text-gold">{dict.why.kicker}</p>
          <h2 className="text-3xl font-bold tracking-tight text-paper md:text-4xl">
            {dict.why.title}
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {dict.why.items.map((item) => (
            <div
              key={item.title}
              className="border-l-2 border-gold pl-6"
              style={{ borderRadius: 0 }}
            >
              <h3 className="text-base font-semibold text-paper">
                {item.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-paper-dim">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
