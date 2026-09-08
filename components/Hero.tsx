"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/dictionaries";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="container-content grid items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            custom={0}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mb-5 text-sm text-gold"
          >
            {dict.hero.kicker}
          </motion.p>

          <motion.h1
            custom={1}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-paper md:text-5xl lg:text-[3.4rem]"
          >
            {dict.hero.headline}
          </motion.h1>

          <motion.p
            custom={2}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md text-base leading-relaxed text-paper-dim md:text-lg"
          >
            {dict.hero.subtext}
          </motion.p>

          <motion.div
            custom={3}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#lead-form"
              className="rounded bg-gold px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-gold-bright"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href="#process"
              className="rounded border border-line-strong px-6 py-3.5 text-sm font-medium text-paper transition-colors duration-150 hover:border-paper-dim"
            >
              {dict.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.p
            custom={4}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-8 text-sm text-paper-faint"
          >
            {dict.hero.proofLine}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-sm md:block"
          aria-hidden="true"
        >
          <svg viewBox="0 0 320 320" className="h-full w-full">
            <polygon points="20,60 160,220 300,60 300,110 160,270 20,110" fill="#F5F4EF" />
            <polygon points="160,220 300,60 300,110 160,270" fill="#C9A227" opacity="0.9" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
