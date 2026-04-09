"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

const headline = ["The", "Intelligence", "Behind", "Smarter", "Money."];
const stats = [
  { value: "$4.2B+", label: "Assets Managed" },
  { value: "98.7%", label: "Uptime SLA" },
  { value: "230+", label: "API Integrations" },
] as const;

export function HeroText() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 max-w-xl">
      <motion.div
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="flex items-center gap-4"
      >
        <span aria-hidden="true" className="h-px w-6 bg-text-primary" />
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
          AI · Finance · Software
        </span>
      </motion.div>

      <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[1.03] tracking-[-0.03em] text-text-primary sm:text-[56px] lg:text-[76px]">
        <motion.span variants={staggerContainer(0.08)} initial={reduceMotion ? false : "hidden"} animate="show" className="block">
          {headline.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              variants={fadeUp}
              className="inline-block pr-3"
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </h1>

      <motion.p
        variants={fadeUp}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="mt-6 max-w-[420px] text-[0.95rem] font-light leading-[1.75] text-text-secondary"
      >
        AI-powered financial software that automates capital, scales investments, and connects your money to the future.
      </motion.p>

      <motion.div variants={fadeUp} initial={reduceMotion ? false : "hidden"} animate="show" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="#get-started"
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
        >
          Start Free Trial
        </a>
        <a
          href="#demo"
          className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-text-secondary transition-opacity hover:opacity-100"
          style={{ opacity: 0.85 }}
          aria-label="Watch demo"
        >
          <span aria-hidden="true">▷</span> Watch Demo
        </a>
      </motion.div>

      <div className="mt-10 border-t border-hairline border-border-dim pt-6">
        <div className="grid grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-xl font-bold tracking-[-0.02em] text-text-primary sm:text-2xl">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

