"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";

export type Service = {
  icon: "portfolio" | "api" | "risk" | "payments" | "banking" | "compliance";
  title: string;
  description: string;
};

function ServiceIcon({ name }: { name: Service["icon"] }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "portfolio":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4.5 9.5h15" opacity="0.7" />
          <path d="M7.5 7.5V6.3c0-.9.7-1.6 1.6-1.6h5.8c.9 0 1.6.7 1.6 1.6v1.2" opacity="0.7" />
          <path d="M5.6 9.5v9.1c0 .9.7 1.6 1.6 1.6h9.6c.9 0 1.6-.7 1.6-1.6V9.5" />
          <path d="M9 14.2h6" opacity="0.7" />
        </svg>
      );
    case "api":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M8 8.5 5 12l3 3.5" />
          <path d="M16 8.5 19 12l-3 3.5" />
          <path d="M10.5 17.5 13.5 6.5" opacity="0.7" />
        </svg>
      );
    case "risk":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3.8 20 7.6v5.8c0 4.1-3.1 7.8-8 8.8-4.9-1-8-4.7-8-8.8V7.6L12 3.8Z" />
          <path d="M9.2 12.6 11 14.4 14.8 10.6" opacity="0.7" />
        </svg>
      );
    case "payments":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4.5 8.5h15" opacity="0.7" />
          <path d="M6.2 6.8h11.6c.9 0 1.7.8 1.7 1.7v7c0 .9-.8 1.7-1.7 1.7H6.2c-.9 0-1.7-.8-1.7-1.7v-7c0-.9.8-1.7 1.7-1.7Z" />
          <path d="M7.5 14h4" opacity="0.7" />
        </svg>
      );
    case "banking":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4.5 10.2 12 6.2l7.5 4" />
          <path d="M6.2 10.2v8.5" opacity="0.7" />
          <path d="M9.2 10.2v8.5" opacity="0.7" />
          <path d="M12 10.2v8.5" opacity="0.7" />
          <path d="M14.8 10.2v8.5" opacity="0.7" />
          <path d="M17.8 10.2v8.5" opacity="0.7" />
          <path d="M5.2 18.7h13.6" />
        </svg>
      );
    case "compliance":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M7.2 6.8h6.6c.9 0 1.7.8 1.7 1.7v10c0 .9-.8 1.7-1.7 1.7H7.2c-.9 0-1.7-.8-1.7-1.7v-10c0-.9.8-1.7 1.7-1.7Z" />
          <path d="M9 6.8V5.7c0-.9.7-1.6 1.6-1.6h1.8c.9 0 1.6.7 1.6 1.6v1.1" opacity="0.7" />
          <path d="M8.6 12.1h6.2" opacity="0.7" />
          <path d="M8.6 15.1h4.2" opacity="0.7" />
        </svg>
      );
  }
}

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="group relative border-b border-r border-hairline border-border-dim bg-bg-void p-8 transition-colors duration-200 hover:bg-white/[0.04]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border-strong opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">{String(index + 1).padStart(2, "0")}</div>
      <div className="mt-5 text-text-primary/80">
        <ServiceIcon name={service.icon} />
      </div>
      <div className="mt-5 font-display text-[0.95rem] font-bold tracking-[-0.02em] text-text-primary">{service.title}</div>
      <p className="mt-2 text-[0.8rem] font-light leading-[1.65] text-text-secondary">{service.description}</p>
    </motion.div>
  );
}

