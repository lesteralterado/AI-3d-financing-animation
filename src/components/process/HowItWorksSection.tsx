"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

const steps = [
  {
    k: "01",
    title: "Connect your data",
    description: "Link accounts, ledgers, and market feeds. Normalize everything into a single model.",
  },
  {
    k: "02",
    title: "Define policies",
    description: "Set risk limits, approvals, and automations. Keep every decision explainable and auditable.",
  },
  {
    k: "03",
    title: "Ship workflows",
    description: "Compose APIs + dashboards into production flows for investing, lending, or payments.",
  },
] as const;

export function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-bg-void py-24" aria-label="How it works">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-2xl"
        >
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">How it works</div>
          <h2 className="mt-4 font-display text-[2.4rem] font-bold tracking-[-0.03em] text-text-primary">
            From idea to execution in days, not quarters.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            A simple path: integrate, set guardrails, then ship repeatable workflows your team can trust.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.div
              key={s.k}
              variants={fadeUp}
              className="relative overflow-hidden rounded-xl border border-hairline border-border-dim bg-bg-surface p-7"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
              </div>
              <div className="relative">
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-text-muted">{s.k}</div>
                <div className="mt-3 text-lg font-semibold tracking-[-0.02em] text-text-primary">{s.title}</div>
                <div className="mt-3 text-sm leading-relaxed text-text-secondary">{s.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

