import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

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
        color="#3b82f6" 
        emissive="#1e40af" 
        emissiveIntensity={0.2}
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
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color="#06b6d4" 
        emissive="#0891b2" 
        emissiveIntensity={0.3}
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
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
        
        {/* Floating cubes */}
        <FloatingCube position={[-8, 2, 0]} scale={0.8} speed={0.01} />
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