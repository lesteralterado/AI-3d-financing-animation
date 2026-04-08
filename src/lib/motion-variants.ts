import type { Variants } from "framer-motion";

export const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_SMOOTH } },
};

export const fadeDown: Variants = {
  hidden: { y: -24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_SMOOTH } },
};

export function staggerContainer(stagger: number = 0.08): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
}

