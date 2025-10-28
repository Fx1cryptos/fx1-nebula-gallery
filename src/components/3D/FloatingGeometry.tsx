import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Color } from 'three';

function FloatingCube({ position, scale, speed }: { position: [number, number, number], scale: number, speed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#1e3a8a" 
        emissive="#2563eb" 
        emissiveIntensity={0.4}
        transparent
        opacity={0.7}
        wireframe
      />
    </mesh>
  );
}

function FloatingSphere({ position, scale, speed }: { position: [number, number, number], scale: number, speed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.5;
      meshRef.current.rotation.z += speed;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5 + position[1]) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#0ea5e9" 
        emissive="#0284c7" 
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

export function FloatingGeometry() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ background: '#0f172a' }}
        shadows
      >
        {/* Fog for depth */}
        <fog attach="fog" args={['#0f172a', 10, 50]} />

        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[15, 10, 10]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[-15, -10, -10]} intensity={0.4} color="#06b6d4" />

        {/* Floating cubes */}
        <FloatingCube position={[-8, 2, 0]} scale={1} speed={0.01} />
        <FloatingCube position={[8, -2, -2]} scale={1.2} speed={0.008} />
        <FloatingCube position={[0, 4, -5]} scale={0.6} speed={0.012} />

        {/* Floating spheres */}
        <FloatingSphere position={[6, 3, -3]} scale={0.5} speed={0.015} />
        <FloatingSphere position={[-6, -1, -1]} scale={0.7} speed={0.01} />
        <FloatingSphere position={[2, -4, -4]} scale={0.4} speed={0.02} />
      </Canvas>
    </div>
  );
}