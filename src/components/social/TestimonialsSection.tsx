"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

const quotes = [
  {
    quote:
      "NexusFi gave us a single place to reason about risk, portfolios, and payments—without stitching together five different tools.",
    name: "Ari S.",
    role: "Head of Product, FinTech",
  },
  {
    quote:
      "The API primitives are clean and predictable. We moved from prototype to production workflows faster than expected.",
    name: "Mina R.",
    role: "Staff Engineer",
  },
  {
    quote:
      "Auditability was the surprise win—approvals, policies, and telemetry are first-class, which made compliance reviews smoother.",
    name: "Jordan K.",
    role: "Risk & Compliance",
  },
] as const;

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-bg-void py-24" aria-label="Testimonials">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-2xl"
        >
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Trusted by builders</div>
          <h2 className="mt-4 font-display text-[2.4rem] font-bold tracking-[-0.03em] text-text-primary">
            Built with teams who ship.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            Early partners use NexusFi to launch financial products faster—while keeping guardrails in place.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          {quotes.map((q) => (
            <motion.figure
              key={q.name}
              variants={fadeUp}
              className="relative overflow-hidden rounded-xl border border-hairline border-border-dim bg-bg-surface p-7"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -left-14 -bottom-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
              </div>

              <blockquote className="relative text-sm leading-relaxed text-text-secondary">
                <span className="text-text-primary">“</span>
                {q.quote}
                <span className="text-text-primary">”</span>
              </blockquote>
              <figcaption className="relative mt-6">
                <div className="text-sm font-medium text-text-primary">{q.name}</div>
                <div className="mt-1 text-xs font-light text-text-muted">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

