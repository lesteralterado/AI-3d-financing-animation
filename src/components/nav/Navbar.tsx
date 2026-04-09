"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { fadeDown } from "@/lib/motion-variants";

function HexLogoMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M32 4 54.8 16.8v30.4L32 60 9.2 47.2V16.8L32 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.95"
      />
      <path
        d="M21 23.5 32 17l11 6.5v17L32 47l-11-6.5v-17Z"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.55"
      />
    </svg>
  );
}

const links = [
  { href: "#solutions", label: "Solutions" },
  { href: "#platform", label: "Platform" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
] as const;

export function Navbar() {
  const { isScrolled } = useScrollProgress(10);
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      variants={fadeDown}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      className="sticky top-0 z-50"
    >
      <div className="bg-bg-void/85 backdrop-blur-xl">
        <div
          className={[
            "border-b border-hairline transition-colors duration-300",
            isScrolled ? "border-border-dim" : "border-transparent",
          ].join(" ")}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-hairline border-border-dim bg-bg-surface">
                <HexLogoMark className="h-6 w-6 text-text-primary" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-text-primary">
                NexusFi
              </span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-text-secondary opacity-[0.45] transition-opacity hover:opacity-100"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#get-started"
                className={[
                  "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
                  "border border-hairline border-border-mid text-text-primary",
                  "transition-colors duration-200 hover:bg-white hover:text-black",
                ].join(" ")}
              >
                Get Started <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

