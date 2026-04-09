import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-void": "#000000",
        "bg-surface": "#0A0A0A",
        "bg-lifted": "#111111",
        "border-dim": "rgba(255,255,255,0.08)",
        "border-mid": "rgba(255,255,255,0.18)",
        "border-strong": "rgba(255,255,255,0.50)",
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255,255,255,0.50)",
        "text-muted": "rgba(255,255,255,0.25)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      keyframes: {
        ringSlow: { to: { transform: "rotate(360deg)" } },
        ringReverse: { to: { transform: "rotate(-360deg)" } },
        corePulse: { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "1" } },
      },
      animation: {
        ringSlow: "ringSlow 24s linear infinite",
        ringReverse: "ringReverse 18s linear infinite",
        ringSlower: "ringSlow 32s linear infinite",
        corePulse: "corePulse 2.8s ease-in-out infinite",
      },
      letterSpacing: {
        widePlus: "0.06em",
      },
      borderWidth: {
        hairline: "0.5px",
      },
    },
  },
  plugins: [],
} satisfies Config;

