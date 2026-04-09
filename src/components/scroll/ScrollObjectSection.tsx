"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const LABELS = [
  { text: "Analyzing Markets", range: [0, 0.25] as [number, number] },
  { text: "Processing Data", range: [0.25, 0.5] as [number, number] },
  { text: "Generating Insights", range: [0.5, 0.75] as [number, number] },
  { text: "Deployed", range: [0.75, 1] as [number, number] },
];

function HexagonSVG() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.3); }
            }
            .pulse-dot {
              animation: pulse 2s ease-in-out infinite;
              transform-origin: center;
            }
          `}
        </style>
      </defs>

      <line x1="110" y1="110" x2="110" y2="21" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="110" y1="110" x2="196" y2="66" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="110" y1="110" x2="196" y2="154" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="110" y1="110" x2="110" y2="199" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="110" y1="110" x2="24" y2="154" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="110" y1="110" x2="24" y2="66" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      <polygon
        points="110,21 196,66 196,154 110,199 24,154 24,66"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />

      <motion.rect
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        x="60"
        y="60"
        width="100"
        height="100"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        style={{ transformOrigin: "110px 110px" }}
      />

      <circle cx="110" cy="110" r="5" fill="white" className="pulse-dot" />

      <circle cx="110" cy="21" r="2.5" fill="white" />
      <circle cx="196" cy="66" r="2.5" fill="white" />
      <circle cx="196" cy="154" r="2.5" fill="white" />
      <circle cx="110" cy="199" r="2.5" fill="white" />
      <circle cx="24" cy="154" r="2.5" fill="white" />
      <circle cx="24" cy="66" r="2.5" fill="white" />
    </svg>
  );
}

export function ScrollObjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [-120, 0, 180, 0]);
  const y = useTransform(scrollYProgress, [0.75, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.6, 1, 1, 1.35, 1.6]);
  const rotation = useTransform(scrollYProgress, [0.25, 0.5], [0, 45]);

  const label1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const label2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const label3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const label4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 47px,
                rgba(255,255,255,0.02) 48px
              ),
              radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)
            `,
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{
              opacity,
              x,
              y,
              scale,
              rotate: rotation,
            }}
            className="w-[220px] h-[220px] sm:w-[220px] sm:h-[220px]"
          >
            <HexagonSVG />
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute text-center">
            <motion.span
              style={{ opacity: label1Opacity }}
              className="absolute font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-text-primary whitespace-nowrap"
            >
              Analyzing Markets
            </motion.span>
            <motion.span
              style={{ opacity: label2Opacity }}
              className="absolute font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-text-primary whitespace-nowrap"
            >
              Processing Data
            </motion.span>
            <motion.span
              style={{ opacity: label3Opacity }}
              className="absolute font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-text-primary whitespace-nowrap"
            >
              Generating Insights
            </motion.span>
            <motion.span
              style={{ opacity: label4Opacity }}
              className="absolute font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-text-primary whitespace-nowrap"
            >
              Deployed
            </motion.span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}