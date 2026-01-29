"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef } from "react";

function Scene() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} />
      <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={8} />
      
      <Float speed={3} rotationIntensity={1.5} floatIntensity={2.5}>
       
        <Sphere ref={meshRef} args={[1, 128, 128]} scale={4.0}>
          <MeshDistortMaterial
            color="#3b82f6"
            speed={4}
            distort={0.45}
            radius={1}
            emissive="#1d4ed8"
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function HeroVisual() {
  return (
   
    <div className="h-[450px] md:h-700px w-full  active:cursor-grabbing">
    
      <Canvas camera={{ position: [0, -1, 8], fov: 70 }}>
        <Scene />
      </Canvas>
    </div>
  );
}