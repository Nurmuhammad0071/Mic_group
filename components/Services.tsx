import type { Dictionary } from "@/lib/dictionaries";

export default function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="border-b border-line py-20 md:py-28">
      <div className="container-content">
        <div className="max-w-xl">
          <p className="mb-4 text-sm text-gold">{dict.services.kicker}</p>
          <h2 className="text-3xl font-bold tracking-tight text-paper md:text-4xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper-dim">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2">
          {dict.services.items.map((item, i) => (
            <div
              key={item.title}
              className={`border-b border-line px-0 py-8 sm:px-8 sm:py-10 ${
                i % 2 === 0 ? "sm:border-r" : ""
              }`}
            >
              <h3 className="text-lg font-semibold text-paper">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
