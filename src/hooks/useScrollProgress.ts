import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export interface ScrollProgressState {
  progress: number;
  isScrolled: boolean;
}

export function useScrollProgress(thresholdPx: number = 12): ScrollProgressState {
  const { scrollY, scrollYProgress } = useScroll();
  const [state, setState] = useState<ScrollProgressState>({ progress: 0, isScrolled: false });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const nextProgress = Math.min(1, Math.max(0, v));
    setState((s) => (s.progress === nextProgress ? s : { ...s, progress: nextProgress }));
  });

  useMotionValueEvent(scrollY, "change", (v) => {
    const nextIsScrolled = v > thresholdPx;
    setState((s) => (s.isScrolled === nextIsScrolled ? s : { ...s, isScrolled: nextIsScrolled }));
  });

  return state;
}

