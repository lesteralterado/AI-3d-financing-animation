import * as THREE from "three";

export type BrandColor = "cyan" | "gold" | "purple";

export const brandColors: Record<BrandColor, THREE.ColorRepresentation> = {
  cyan: "#00E5FF",
  gold: "#FFD166",
  purple: "#7B61FF",
};

export function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export function makeOrbitParticles(count: number, seed: number = 7) {
  const rand = seededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const c1 = new THREE.Color(brandColors.cyan);
  const c2 = new THREE.Color(brandColors.gold);

  for (let i = 0; i < count; i++) {
    const t = rand();
    const radius = 1.2 + rand() * 2.2;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi) * 0.55;
    const z = radius * Math.sin(phi) * Math.sin(theta);

    positions[i * 3 + 0] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const c = c1.clone().lerp(c2, t);
    colors[i * 3 + 0] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return { positions, colors };
}

