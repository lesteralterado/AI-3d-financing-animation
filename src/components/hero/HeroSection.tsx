"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroText } from "@/components/hero/HeroText";
import { useEffect, useRef, useState } from "react";
import { HeroCanvasFallback } from "@/components/hero/HeroCanvas";

const HeroCanvas = dynamic(() => import("./HeroCanvas").then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full border-l border-hairline border-border-dim bg-bg-surface" />
  ),
});

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Targeted scroll progress for the hero panel (keeps your existing panel animation behavior).
  const { scrollYProgress: panelScrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  const panelY = useTransform(panelScrollYProgress, [0, 1], [18, -18]);
  const panelOpacity = useTransform(panelScrollYProgress, [0, 0.25, 1], [0.85, 1, 0.92]);

  // Targeted scroll progress for the whole hero section (drives background parallax).
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax backgrounds driven by the same targeted scroll progress.
  const bgFarY = useTransform(heroScrollYProgress, [0, 1], [-26, 26]);
  const bgMidY = useTransform(heroScrollYProgress, [0, 1], [-44, 44]);
  const bgNearY = useTransform(heroScrollYProgress, [0, 1], [22, -22]);

  const bgFarOpacity = useTransform(heroScrollYProgress, [0, 0.35, 1], [0.28, 0.18, 0]);
  const bgMidOpacity = useTransform(heroScrollYProgress, [0, 0.35, 1], [0.22, 0.14, 0]);
  const bgNearOpacity = useTransform(heroScrollYProgress, [0, 0.35, 1], [0.18, 0.12, 0]);

  const bgFarScale = useTransform(heroScrollYProgress, [0, 1], [1.04, 1.08]);
  const bgMidScale = useTransform(heroScrollYProgress, [0, 1], [1.02, 1.06]);
  const bgNearScale = useTransform(heroScrollYProgress, [0, 1], [0.98, 1.04]);

  return (
    <section
      id="get-started"
      className="relative bg-bg-void overflow-hidden"
      ref={sectionRef}
      aria-label="NexusFi Hero"
    >
      {/* Background parallax layers (behind text + canvas) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-[-160px] -translate-x-1/2">
          <motion.div
            className="h-[560px] w-[560px] bg-no-repeat opacity-20 [mask-image:radial-gradient(circle_at_center,white,transparent_65%)]"
            style={
              reduceMotion
                ? {
                    backgroundImage: "url(/globe.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    opacity: 0.18,
                    transform: "none",
                  }
                : {
                    backgroundImage: "url(/globe.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    y: bgFarY,
                    opacity: bgFarOpacity,
                    scale: bgFarScale,
                  }
            }
          />
        </div>

        <div className="absolute right-[-120px] top-[-60px]">
          <motion.div
            className="h-[420px] w-[420px] bg-no-repeat opacity-20 [mask-image:radial-gradient(circle_at_center,white,transparent_65%)]"
            style={
              reduceMotion
                ? {
                    backgroundImage: "url(/window.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    opacity: 0.14,
                    transform: "none",
                  }
                : {
                    backgroundImage: "url(/window.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    y: bgMidY,
                    opacity: bgMidOpacity,
                    scale: bgMidScale,
                  }
            }
          />
        </div>

        <div className="absolute bottom-[-140px] left-[10%]">
          <motion.div
            className="h-[460px] w-[460px] bg-no-repeat opacity-20 [mask-image:radial-gradient(circle_at_center,white,transparent_65%)]"
            style={
              reduceMotion
                ? {
                    backgroundImage: "url(/file.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    opacity: 0.12,
                    transform: "none",
                  }
                : {
                    backgroundImage: "url(/file.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    y: bgNearY,
                    opacity: bgNearOpacity,
                    scale: bgNearScale,
                  }
            }
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100vh] w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-20 pt-14 sm:px-6 md:pt-16 lg:grid-cols-2 lg:px-8">
        <div className="lg:pr-10">
          <HeroText />
        </div>

        <motion.div
          ref={panelRef}
          style={reduceMotion ? undefined : { y: panelY, opacity: panelOpacity }}
          className="relative h-[520px] w-full overflow-hidden border-l border-hairline border-border-dim bg-bg-surface md:h-[560px] lg:h-[620px]"
        >
          {isMobile ? (
            <HeroCanvasFallback />
          ) : reduceMotion ? (
            <HeroCanvasFallback />
          ) : (
            <HeroCanvas />
          )}
        </motion.div>
      </div>
    </section>
  );
}
