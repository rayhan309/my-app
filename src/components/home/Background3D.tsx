"use client";

import React, { useRef, useMemo, JSX } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";

function Particles(): JSX.Element {
  const ref = useRef<THREE.Points>(null!);
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sphere = useMemo(() => {
    const positions = new Float32Array(8000 * 3);
    for (let i = 0; i < 8000; i++) {
      const r = 1.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  if (!mounted) return <group />;

  // theme matching colors
  const particleColor = theme === "dark" ? "#93c5fd" : "#2563eb";

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={theme === "dark" ? 0.3 : 0.4}
        />
      </Points>
    </group>
  );
}

export default function Background3D(): JSX.Element {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-500">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
