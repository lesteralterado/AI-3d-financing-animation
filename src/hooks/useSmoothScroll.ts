"use client";

import { useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useSmoothScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return {
    scrollYProgress,
    containerRef,
  };
}