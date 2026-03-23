"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

function MorphingShape({ progress }: { progress: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const p = progress.get();

    // Rotate 
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15 + p * 2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;

    // Smooth Scale
    const s = 1.2 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        {/* Glassy, Iridescent Material for Light Theme */}
        <MeshDistortMaterial
          color="#3b82f6"
          speed={2}
          distort={0.3}
          radius={1}
          transmission={0.8}
          thickness={2}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

export function Experience3D({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={1} />
        <spotLight position={[0, 5, 0]} intensity={2} />

        <MorphingShape progress={progress} />
      </Canvas>
    </div>
  );
}
