"use client";

import { useRef, Suspense, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface RocketProps {
  isHovered: boolean;
  isActive: boolean;
  isVisible: boolean;
}

function Rocket({ isHovered, isActive, isVisible }: RocketProps) {
  const { scene } = useGLTF("/models/rocket.gltf");
  const rocketRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const currentSpeedRef = useRef(0.001);
  const currentBounceRef = useRef(10);
  const isHoveredRef = useRef(isHovered);
  const isActiveRef = useRef(isActive);
  const lastHoverRef = useRef(isHovered);
  const idleStartRef = useRef<number | null>(null);
  const basePositionRef = useRef<THREE.Vector3 | null>(null);
  const introStartRef = useRef<number | null>(null);
  const hasEnteredRef = useRef(false);
  const introDuration = 5.5;

  useEffect(() => {
    if (!isActive) return;
    introStartRef.current = null;
    hasEnteredRef.current = false;
  }, [isActive]);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useFrame((state) => {
    if (!isVisible) return;
    if (rocketRef.current) {
      if (isActiveRef.current && !hasEnteredRef.current) {
        if (introStartRef.current === null) {
          introStartRef.current = state.clock.elapsedTime;
        }
        const progress = Math.min(
          (state.clock.elapsedTime - introStartRef.current) / introDuration,
          1
        );
        const eased = 1 - Math.pow(1 - progress, 3);
        const wobble = 1 - eased;
        const x = THREE.MathUtils.lerp(-240, 0, eased) + Math.sin(eased * Math.PI * 6) * 40 * wobble;
        const y = THREE.MathUtils.lerp(-180, 0, eased) + Math.cos(eased * Math.PI * 4) * 25 * wobble;
        const z = THREE.MathUtils.lerp(200, 0, eased);

        rocketRef.current.position.set(x, y, z);
        rocketRef.current.rotation.z = Math.sin(eased * Math.PI * 6) * 0.2 * wobble;

        if (progress >= 1) {
          hasEnteredRef.current = true;
          idleStartRef.current = state.clock.elapsedTime;
          basePositionRef.current = rocketRef.current.position.clone();
          const hoveredAtFinish = isHoveredRef.current;
          currentSpeedRef.current = hoveredAtFinish ? 0.1 : 0.005;
          currentBounceRef.current = hoveredAtFinish ? 40 : 0;
          lastHoverRef.current = hoveredAtFinish;
        }
      } else if (!hasEnteredRef.current) {
        rocketRef.current.position.set(-240, -180, 200);
      }

      if (hasEnteredRef.current) {
        const isHoveredNow = isHoveredRef.current;
        const targetSpeed = isHoveredNow ? 0.1 : 0.005;
        const targetBounce = isHoveredNow ? 40 : 0;
        const hoverChanged = isHoveredNow !== lastHoverRef.current;
        lastHoverRef.current = isHoveredNow;

        if (hoverChanged && isHoveredNow) {
          currentSpeedRef.current = targetSpeed;
          currentBounceRef.current = targetBounce;
        } else {
          const lerpFactor = isHoveredNow ? 0.12 : 0.06;
          currentSpeedRef.current = THREE.MathUtils.lerp(currentSpeedRef.current, targetSpeed, lerpFactor);
          currentBounceRef.current = THREE.MathUtils.lerp(currentBounceRef.current, targetBounce, lerpFactor);
        }

        rocketRef.current.rotation.y += currentSpeedRef.current;
        const idleStart = idleStartRef.current ?? state.clock.elapsedTime;
        const t = ((state.clock.elapsedTime - idleStart) % 2) / 2;
        const baseY = basePositionRef.current?.y ?? 0;
        rocketRef.current.position.y = baseY + currentBounceRef.current * Math.sin(Math.PI * 2 * t);
      }
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

  const { clonedScene, materials } = useMemo(() => {
    const cloned = scene.clone();
    const foundMaterials: THREE.MeshStandardMaterial[] = [];
    
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const childMaterials = Array.isArray(child.material) ? child.material : [child.material];
        childMaterials.forEach((mat) => {
          const material = mat as THREE.MeshStandardMaterial;
          const matName = material.name || '';
          
          if (matName === 'Material.003') {
            material.color.setHex(0x4A90D9);
          } else if (matName === 'Material.001' || matName === 'Material.002') {
            material.color.setHex(0xF0C75B);
          }
          
          if (matName === 'Material.001' || matName === 'Material.002' || matName === 'Material.003') {
            foundMaterials.push(material);
          }
        });
      }
    });
    
    return { clonedScene: cloned, materials: foundMaterials };
  }, [scene]);

  useEffect(() => {
    materialsRef.current = materials;
    return () => {
      materialsRef.current = [];
    };
  }, [materials]);

  return (
    <primitive
      ref={rocketRef}
      object={clonedScene}
      scale={[1.2, 1.4, 1.2]}
      position={[0, 0, 0]}
    />
  );
}

interface LightsProps {
  isHovered: boolean;
  isVisible: boolean;
}

function Lights({ isHovered, isVisible }: LightsProps) {
  const pointLightRef = useRef<THREE.PointLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (!isVisible) return;
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
  isActive?: boolean;
}

export default function RocketScene({ className = "", isHovered = false, isActive = false }: RocketSceneProps) {
  const fadeDuration = 5.5;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          transform: 'translateY(40%)',
          opacity: isActive ? 1 : 0,
          animation: isActive ? `rocket-fade ${fadeDuration}s ease-out both` : 'none',
        }}
      >
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
          <Lights isHovered={isHovered} isVisible={isVisible} />
          <Suspense fallback={null}>
            <Rocket isHovered={isHovered} isActive={isActive} isVisible={isVisible} />
          </Suspense>
        </Canvas>
      </div>

      <style jsx>{`
        @keyframes rocket-fade {
          0% {
            opacity: 0;
          }
          60% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

useGLTF.preload("/models/rocket.gltf");
