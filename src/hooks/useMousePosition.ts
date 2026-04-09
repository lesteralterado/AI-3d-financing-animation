import { useEffect, useState } from "react";

export interface NormalizedMousePosition {
  x: number;
  y: number;
}

/**
 * Normalized mouse position in viewport space.
 * x: 0..1 (left -> right), y: 0..1 (top -> bottom)
 */
export function useMousePosition(): NormalizedMousePosition {
  const [pos, setPos] = useState<NormalizedMousePosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      setPos({
        x: Math.min(1, Math.max(0, e.clientX / w)),
        y: Math.min(1, Math.max(0, e.clientY / h)),
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return pos;
}

