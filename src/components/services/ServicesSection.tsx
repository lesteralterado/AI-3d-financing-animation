"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ServiceCard, type Service } from "./ServiceCard";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

const services: Service[] = [
  {
    icon: "portfolio",
    title: "AI Portfolio Management",
    description: "Autonomous rebalancing with predictive ML models",
  },
  {
    icon: "api",
    title: "FinTech API Suite",
    description: "RESTful + GraphQL APIs connecting your app to real-time markets",
  },
  {
    icon: "risk",
    title: "Risk Intelligence Engine",
    description: "Deep learning models that quantify and hedge exposure",
  },
  {
    icon: "payments",
    title: "Embedded Payments",
    description: "Instant settlement infrastructure for any financial product",
  },
  {
    icon: "banking",
    title: "Core Banking Software",
    description: "Cloud-native ledger and account management platform",
  },
  {
    icon: "compliance",
    title: "Compliance Automation",
    description: "AI-driven KYC, AML, and regulatory reporting at scale",
  },
];

export function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="solutions" className="relative bg-bg-void py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-2xl"
        >
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">What We Provide</div>
          <h2 className="mt-4 font-display text-[2.4rem] font-bold tracking-[-0.03em] text-text-primary">
            Financial intelligence, built for scale.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 border border-hairline border-border-dim md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

