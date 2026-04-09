"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp } from "@/lib/motion-variants";

const faqs = [
  {
    q: "Is NexusFi a bank or a broker?",
    a: "No. NexusFi is a software platform that helps teams build and operate financial workflows using APIs, dashboards, and policy-driven automation.",
  },
  {
    q: "Can I use this without a full engineering team?",
    a: "Yes. The platform is designed for quick starts with sensible defaults, while still supporting deeper customization as your product grows.",
  },
  {
    q: "How do you handle compliance and audits?",
    a: "You can define policies, approvals, and access controls, and keep an audit trail of key actions. This keeps compliance reviewable without blocking iteration.",
  },
  {
    q: "Do you support real-time data?",
    a: "Yes. NexusFi is built around streaming telemetry for markets and portfolios, so your views stay current without manual refresh loops.",
  },
] as const;

export function FAQSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-bg-void py-24" aria-label="Frequently asked questions">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-2xl"
        >
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">FAQ</div>
          <h2 className="mt-4 font-display text-[2.4rem] font-bold tracking-[-0.03em] text-text-primary">
            Answers, upfront.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            A few quick details to help you evaluate whether NexusFi fits your product and your team.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-hairline border-border-dim bg-bg-surface px-6 py-5 open:border-border-mid"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-medium text-text-primary">{f.q}</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline border-border-dim bg-bg-lifted text-text-primary transition-transform group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div className="mt-4 text-sm leading-relaxed text-text-secondary">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

