import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Mesh } from 'three';

function FloatingLogo({ textureUrl, position, scale, speed }: { textureUrl: string; position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, textureUrl);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
      meshRef.current.rotation.x += speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

export function FX1FloatingScene() {
  const cid = 'bafybeibpsr6kiklsxtxhapi2hcadvstgtdhmpc3acq77ndi7wdcymyqxni'; // Your FX1 logo NFT
  const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#0f172a" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#1e3a8a" />

        <Suspense fallback={null}>
          <FloatingLogo textureUrl={url} position={[0, 0, 0]} scale={2} speed={0.01} />
          <FloatingLogo textureUrl={url} position={[-4, 2, -2]} scale={1.5} speed={0.015} />
          <FloatingLogo textureUrl={url} position={[4, -2, -1]} scale={1.2} speed={0.012} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Export alias for backward compatibility
export { FX1FloatingScene as FloatingGeometry };