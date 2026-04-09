"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Code2, Shield, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

const pillars = [
  {
    icon: Shield,
    title: "Security by default",
    description: "Guardrails for identity, data access, and operational safety—built into every flow.",
  },
  {
    icon: Activity,
    title: "Real‑time signals",
    description: "Stream market + portfolio telemetry into a single dashboard with instant insights.",
  },
  {
    icon: Code2,
    title: "Developer-first APIs",
    description: "Clean primitives for accounts, ledgers, risk, and payments—ready for your stack.",
  },
  {
    icon: Sparkles,
    title: "Automations that compound",
    description: "Policies, triggers, and approvals that reduce manual work while staying auditable.",
  },
] as const;

const stats = [
  { label: "Faster onboarding", value: "3×" },
  { label: "Lower ops load", value: "40%" },
  { label: "Latency budget", value: "<120ms" },
  { label: "Uptime target", value: "99.9%" },
] as const;

export function PlatformSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="platform" className="relative bg-bg-void py-24" aria-label="Platform">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,var(--ruled-line)_0px,var(--ruled-line)_0.5px,transparent_0.5px,transparent_44px)] opacity-70" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-2xl"
        >
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Platform</div>
          <h2 className="mt-4 font-display text-[2.4rem] font-bold tracking-[-0.03em] text-text-primary">
            A modern operating system for financial products.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            NexusFi unifies portfolios, payments, and risk into a single set of primitives—so teams ship faster without
            losing control.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            variants={staggerContainer(0.08)}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-4 lg:col-span-7 sm:grid-cols-2"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="relative overflow-hidden rounded-xl border border-hairline border-border-dim bg-bg-surface p-6"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
                  <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                </div>
                <div className="relative flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hairline border-border-dim bg-bg-lifted text-text-primary">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-text-primary">{p.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.aside
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-hairline border-border-mid bg-bg-void p-7">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Why teams choose NexusFi</div>
              <div className="mt-4 text-sm leading-relaxed text-text-secondary">
                Designed for the reality of finance: approvals, audits, and production safety—without slowing down
                product velocity.
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-lg border border-hairline border-border-dim bg-bg-surface p-4">
                    <div className="font-display text-2xl font-extrabold tracking-[-0.03em] text-text-primary">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs font-light text-text-muted">{s.label}</div>
                  </div>
                ))}
              </div>

              <a
                href="#get-started"
                className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-hairline border-border-mid bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.01]"
              >
                Explore the platform
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

