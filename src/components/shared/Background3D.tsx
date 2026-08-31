"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork(): React.JSX.Element {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const groupRef = useRef<THREE.Group>(null!);

  const count = 100;
  const maxDistance = 1.2;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { particles, lines } = useMemo(() => {
    const tempParticles = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      tempParticles[i * 3] = (Math.random() - 0.5) * 5;
      tempParticles[i * 3 + 1] = (Math.random() - 0.5) * 5;
      tempParticles[i * 3 + 2] = (Math.random() - 0.5) * 2;

      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return {
      particles: tempParticles,
      velocities,
      lines: new THREE.BufferGeometry()
    };
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;
    const { clock } = state;
    const time = clock.getElapsedTime();

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePos = [];

    // Subtle parallax
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.current.x * 0.2, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.current.y * 0.2, 0.05);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating motion
      pos[i3] += Math.sin(time * 0.5 + i) * 0.001;
      pos[i3 + 1] += Math.cos(time * 0.4 + i) * 0.001;

      // Check distances for lines
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePos.push(pos[i3], pos[i3 + 1], pos[i3 + 2]);
          linePos.push(pos[j3], pos[j3 + 1], pos[j3 + 2]);
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  });

  const color = "#e4c9a0";

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function Background3D(): React.JSX.Element {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}