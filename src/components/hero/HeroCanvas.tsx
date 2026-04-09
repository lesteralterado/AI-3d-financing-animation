"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

interface ThemeColors {
  white: string;
  bgSurface: string;
}
function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>({
    white: "white",
    bgSurface: "black",
  });

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const white = root.getPropertyValue("--text-primary").trim() || "white";
    const bgSurface = root.getPropertyValue("--bg-surface").trim() || "black";
    setColors({ white, bgSurface });
  }, []);

  return colors;
}

function Rings({ color }: { color: THREE.ColorRepresentation }) {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const g3 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (g1.current) g1.current.rotation.z += (Math.PI * 2 * delta) / 24;
    if (g2.current) g2.current.rotation.z -= (Math.PI * 2 * delta) / 18;
    if (g3.current) g3.current.rotation.z += (Math.PI * 2 * delta) / 32;
  });

  return (
    <group>
      <group ref={g1} rotation={[0.5, 0.1, 0]}>
        <mesh>
          <torusGeometry args={[1.15, 0.03, 10, 220]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.26} />
        </mesh>
      </group>
      <group ref={g2} rotation={[1.05, -0.25, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
        </mesh>
      </group>
      <group ref={g3} rotation={[0.2, 0.9, 0]}>
        <mesh>
          <torusGeometry args={[1.55, 0.03, 10, 220]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.16} />
        </mesh>
      </group>
    </group>
  );
}

function CenterCore({ color }: { color: THREE.ColorRepresentation }) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) mat.current.emissiveIntensity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 1.3));
  });

  return (
    <mesh>
      <sphereGeometry args={[0.09, 32, 32]} />
      <meshStandardMaterial
        ref={mat}
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

function Connections({
  color,
  nodes,
}: {
  color: THREE.ColorRepresentation;
  nodes: THREE.Vector3[];
}) {
  const geom = useMemo(() => {
    const positions: number[] = [];
    for (const n of nodes) {
      positions.push(0, 0, 0, n.x, n.y, n.z);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [nodes]);

  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color={color} transparent opacity={0.14} />
    </lineSegments>
  );
}

function Nodes({ color, nodes }: { color: THREE.ColorRepresentation; nodes: THREE.Vector3[] }) {
  return (
    <group>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.2} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

export function HeroCanvas() {
  const reduceMotion = useReducedMotion();
  const colors = useThemeColors();

  const nodes = useMemo(() => {
    const r = 1.55;
    const angles = [Math.PI * 0.5, Math.PI * 0.15, -Math.PI * 0.15, -Math.PI * 0.5, -Math.PI * 0.85, Math.PI * 0.85];
    return angles.map((a) => new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.72, 0));
  }, []);

  const labelSpecs = useMemo(
    () =>
      [
        { text: "RISK ENGINE", at: nodes[1] },
        { text: "AI CORE", at: nodes[0] },
        { text: "PAYMENTS", at: nodes[2] },
      ] as const,
    [nodes]
  );

  const labelEls = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="relative h-full w-full">
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], zoom: 140 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      >
        <color attach="background" args={[colors.bgSurface]} />

        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} color={colors.white} />
        <pointLight position={[-2, 1.5, 2]} intensity={0.8} color={colors.white} distance={8} />

        <group>
          <Rings color={colors.white} />
          <Connections color={colors.white} nodes={nodes} />
          <Nodes color={colors.white} nodes={nodes} />
          <CenterCore color={colors.white} />
        </group>

        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={reduceMotion ? 0.15 : 0.25}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          enableDamping={false}
        />

        <CanvasProjector
          nodes={labelSpecs.map((l) => l.at)}
          labelEls={labelEls}
        />
      </Canvas>

      {labelSpecs.map((l, idx) => (
        <div
          key={l.text}
          ref={(el) => {
            labelEls.current[idx] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-muted"
        >
          {l.text}
        </div>
      ))}
    </div>
  );
}

export function HeroCanvasFallback() {
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" role="img" aria-label="Geometric finance diagram">
        <g fill="none" stroke="currentColor" className="text-text-primary">
          <circle cx="400" cy="300" r="88" strokeOpacity="0.22" strokeWidth="1" />
          <circle cx="400" cy="300" r="158" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="400" cy="300" r="228" strokeOpacity="0.14" strokeWidth="1" />
          <path d="M400 300L400 72" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M400 300L607 186" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M400 300L607 414" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M400 300L400 528" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M400 300L193 414" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M400 300L193 186" strokeOpacity="0.12" strokeWidth="1" />
        </g>
        <g fill="currentColor" className="text-text-primary">
          <circle cx="400" cy="300" r="7" opacity="0.9" />
          <circle cx="400" cy="72" r="4" opacity="0.65" />
          <circle cx="607" cy="186" r="4" opacity="0.65" />
          <circle cx="607" cy="414" r="4" opacity="0.65" />
          <circle cx="400" cy="528" r="4" opacity="0.65" />
          <circle cx="193" cy="414" r="4" opacity="0.65" />
          <circle cx="193" cy="186" r="4" opacity="0.65" />
        </g>
      </svg>
    </div>
  );
}

function CanvasProjector({
  nodes,
  labelEls,
}: {
  nodes: THREE.Vector3[];
  labelEls: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    for (let i = 0; i < nodes.length; i++) {
      const el = labelEls.current[i];
      if (!el) continue;
      v.copy(nodes[i]).project(camera);
      const x = (v.x * 0.5 + 0.5) * size.width;
      const y = (-v.y * 0.5 + 0.5) * size.height;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  });

  return null;
}
