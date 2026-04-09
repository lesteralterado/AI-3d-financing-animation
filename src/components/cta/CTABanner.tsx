"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/motion-variants";

export function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-4, 4]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.85, 1, 0.95]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="relative bg-bg-void py-24" id="pricing" aria-label="Call to action">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={
            reduceMotion
              ? undefined
              : { rotateX, rotateY, y, opacity, transformStyle: "preserve-3d" }
          }
          className="relative overflow-hidden rounded-lg border border-hairline border-border-mid bg-bg-void p-10 sm:p-16"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,var(--ruled-line)_0px,var(--ruled-line)_0.5px,transparent_0.5px,transparent_40px)]" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between" style={reduceMotion ? undefined : { transform: "translateZ(24px)" }}>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-text-primary sm:text-4xl">
                Ready to build the future of finance?
              </h2>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.02]"
              >
                Start Free Trial
              </a>
              <div className="text-xs font-light text-text-secondary">No credit card required</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

