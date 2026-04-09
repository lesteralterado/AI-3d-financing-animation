"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";

const links = [
  { href: "#solutions", label: "Solutions" },
  { href: "#platform", label: "Platform" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
] as const;

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer id="about" className="bg-bg-void">
      <div className="border-t border-hairline border-border-dim">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
        >
          <div className="text-[0.75rem] font-light text-text-secondary">
            © {new Date().getFullYear()} NexusFi. All rights reserved.
          </div>
          <nav className="flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.75rem] font-light text-text-muted transition-colors hover:text-text-secondary"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}

