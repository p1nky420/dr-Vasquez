"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 420;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const b = Math.sin(i * 78.233) * 24634.6345;
      const c = Math.sin(i * 39.425) * 12515.8732;
      data[i * 3] = ((a - Math.floor(a)) - 0.5) * 8;
      data[i * 3 + 1] = ((b - Math.floor(b)) - 0.5) * 5;
      data[i * 3 + 2] = ((c - Math.floor(c)) - 0.5) * 5;
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.025;
      points.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.04;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#B89B5E"
        size={0.018}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function StrategicSeal() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.12 + pointer.x * 0.12;
    group.current.rotation.x = -0.18 + pointer.y * 0.08;
  });

  return (
    <group ref={group} position={[1.15, -0.12, 0]} rotation={[-0.18, 0.15, 0]}>
      <mesh>
        <torusGeometry args={[1.16, 0.01, 16, 150]} />
        <meshStandardMaterial color="#B89B5E" emissive="#35260e" roughness={0.32} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.76, 0.008, 16, 140]} />
        <meshStandardMaterial color="#F5F2EA" emissive="#1f1d18" roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[1.5, 0.025, 0.025]} />
        <meshStandardMaterial color="#B89B5E" emissive="#261b09" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 1.85, 16]} />
        <meshStandardMaterial color="#B89B5E" emissive="#261b09" />
      </mesh>
      <mesh position={[0, 0.98, 0]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshStandardMaterial color="#F5F2EA" emissive="#342b18" />
      </mesh>
      {[-0.48, 0.48].map((x) => (
        <group key={x} position={[x, 0.24, 0]}>
          <mesh>
            <boxGeometry args={[0.55, 0.014, 0.014]} />
            <meshStandardMaterial color="#B89B5E" emissive="#261b09" />
          </mesh>
          <mesh position={[0, -0.33, 0]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.18, 0.006, 10, 64]} />
            <meshStandardMaterial color="#B89B5E" transparent opacity={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function DepthPlanes() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.z = Math.sin(clock.elapsedTime * 0.22) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0.65, 0, -1.2]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[i * 0.18, -0.2 + i * 0.12, -i * 0.3]}
          rotation={[0.15, -0.55, -0.1]}
        >
          <planeGeometry args={[2.2 - i * 0.2, 1.55 - i * 0.16]} />
          <meshBasicMaterial
            color={i % 2 ? "#0E2A36" : "#111821"}
            transparent
            opacity={0.16 - i * 0.02}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={["#070a0e"]} />
      <fog attach="fog" args={["#070a0e", 4, 9]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 3]} intensity={2.4} color="#f2d391" />
      <pointLight position={[-2, -1, 2]} intensity={1.1} color="#0e718a" />
      <DepthPlanes />
      <StrategicSeal />
      <ParticleField />
    </>
  );
}

export function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="hero-static absolute inset-0" />
      {!reduce ? (
        <div className="hidden size-full min-[520px]:block">
        <Canvas
          className="opacity-90"
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <SceneContent />
        </Canvas>
        </div>
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(184,155,94,0.18),transparent_28%),linear-gradient(90deg,#0B0F14_0%,rgba(11,15,20,0.94)_36%,rgba(11,15,20,0.36)_100%)]" />
    </div>
  );
}
