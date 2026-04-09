"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];

const preLoaderVariants: Variants = {
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  hidden: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

const logoVariants: Variants = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

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

export function PreLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const hasVisited = sessionStorage.getItem("nexusfi-visited");
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    // Auto-hide after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("nexusfi-visited", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="preloader"
        variants={preLoaderVariants}
        initial="visible"
        exit="hidden"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-void"
        style={{
          background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
        }}
      >
        <motion.div
          variants={logoVariants}
          initial="visible"
          animate="pulse"
          exit="exit"
        >
          <HexLogoMark className="h-28 w-28 text-text-primary" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
