"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface RocketProps {
  isHovered: boolean;
}

function Rocket({ isHovered }: RocketProps) {
  const { scene } = useGLTF("/models/rocket.gltf");
  const rocketRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const currentSpeedRef = useRef(0.001);
  const currentBounceRef = useRef(10);

  useFrame((state) => {
    if (rocketRef.current) {
      const targetSpeed = isHovered ? 0.1 : 0.001;
      const targetBounce = isHovered ? 40 : 10;
      
      currentSpeedRef.current = THREE.MathUtils.lerp(currentSpeedRef.current, targetSpeed, 0.05);
      currentBounceRef.current = THREE.MathUtils.lerp(currentBounceRef.current, targetBounce, 0.05);
      
      rocketRef.current.rotation.y += currentSpeedRef.current;
      const t = (state.clock.elapsedTime % 2) / 2;
      rocketRef.current.position.y = currentBounceRef.current * Math.sin(Math.PI * 2 * t);
    }

    materialsRef.current.forEach((material) => {
      const matName = material.name || '';
      if (matName === 'Material.003') return;
      const targetSaturation = isHovered ? 1 : 0.02;
      const currentColor = material.color.getHSL({ h: 0, s: 0, l: 0 });
      const newSaturation = THREE.MathUtils.lerp(currentColor.s, targetSaturation, 0.1);
      material.color.setHSL(currentColor.h, newSaturation, currentColor.l);
    });
  });

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    materialsRef.current = [];
    
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          const material = mat as THREE.MeshStandardMaterial;
          const matName = material.name || '';
          
          if (matName === 'Material.003') {
            material.color.setHex(0x4A90D9);
          } else if (matName === 'Material.001' || matName === 'Material.002') {
            material.color.setHex(0xF0C75B);
          }
          
          if (matName === 'Material.001' || matName === 'Material.002' || matName === 'Material.003') {
            materialsRef.current.push(material);
          }
        });
      }
    });
    
    return cloned;
  }, [scene]);

  return (
    <primitive
      ref={rocketRef}
      object={clonedScene}
      scale={1}
      position={[0, 0, 0]}
    />
  );
}

interface LightsProps {
  isHovered: boolean;
}

function Lights({ isHovered }: LightsProps) {
  const pointLightRef = useRef<THREE.PointLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (pointLightRef.current) {
      const targetIntensity = isHovered ? 2 : 0.2;
      pointLightRef.current.intensity = THREE.MathUtils.lerp(
        pointLightRef.current.intensity,
        targetIntensity,
        0.1
      );
    }
    if (dirLightRef.current) {
      const targetIntensity = isHovered ? 1.2 : 0.2;
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        targetIntensity,
        0.1
      );
    }
  });

  return (
    <>
      <hemisphereLight color={0xF0C75B} groundColor={0x8B7355} intensity={0.8} />
      <directionalLight
        ref={dirLightRef}
        color={0xFFF8E7}
        intensity={0.4}
        position={[-300, 0, 600]}
      />
      <pointLight
        ref={pointLightRef}
        color={0xF0C75B}
        intensity={0.5}
        distance={1000}
        decay={2}
        position={[200, -100, 50]}
      />
    </>
  );
}

interface RocketSceneProps {
  className?: string;
  isHovered?: boolean;
}

export default function RocketScene({ className = "", isHovered = false }: RocketSceneProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ transform: 'translateY(27.5%)' }}>
        <Canvas
          camera={{
            fov: 60,
            near: 1,
            far: 10000,
            position: [0, -10, 500],
          }}
          gl={{ alpha: true, antialias: true }}
          shadows
          className="!absolute inset-0"
        >
          <Lights isHovered={isHovered} />
          <Suspense fallback={null}>
            <Rocket isHovered={isHovered} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
