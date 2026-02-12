'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial, type MeshLineMaterialParameters } from 'meshline';
import * as THREE from 'three';

const cardGLB = '/assets/lanyard/card.glb';
const lanyardPng = '/assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: LanyardProps) {
  const [isHovered, setIsHovered] = useState(false);
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
    <div
      ref={containerRef}
      className={`relative z-0 w-full h-full flex justify-center items-center transform scale-100 origin-center min-h-[500px] ${
        isHovered ? 'lanyard-hovered' : ''
      }`}
    >
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band onHover={setIsHovered} isVisible={isVisible} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="#DBDBDB"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#DBDBDB"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#DBDBDB"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="#DBDBDB"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 10,
  onHover,
  isVisible
}: {
  maxSpeed?: number;
  minSpeed?: number;
  onHover?: (hovered: boolean) => void;
  isVisible: boolean;
}) {
  const { size } = useThree();
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial> | null>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const pointerDownTime = useRef(0);
  const shouldFlip = useRef(false);
  const lerpedPositions = useRef(new WeakMap<RapierRigidBody, THREE.Vector3>());

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const euler = new THREE.Euler();

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2
  };

  const { nodes, materials } = useGLTF(cardGLB) as unknown as {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial>;
  };
  const texture = useTexture(lanyardPng);
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  if (curveRef.current == null) {
    const initialCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ]);
    initialCurve.curveType = 'chordal';
    curveRef.current = initialCurve;
  }
  const curve = curveRef.current;
  const lanyardTexture = useMemo(() => {
    // Don't mutate the hook-returned texture; clone and configure instead.
    const clonedTexture = texture.clone();
    clonedTexture.wrapS = THREE.RepeatWrapping;
    clonedTexture.wrapT = THREE.RepeatWrapping;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [texture]);
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  const customGrabCursor = "url('/cursors/move.webp') 23 23, grab";
  const customGrabbingCursor = "url('/cursors/move.webp') 23 23, grabbing";

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? customGrabbingCursor : customGrabCursor;
      return () => {
        document.body.style.cursor = '';
      };
    }
  }, [hovered, dragged]);

  useEffect(() => {
    onHover?.(hovered);
  }, [hovered, onHover]);

  useFrame((state, delta) => {
    if (!isVisible) return;
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (shouldFlip.current && !dragged) {
      shouldFlip.current = false;
      card.current?.setAngvel({ x: 0, y: 10, z: 0 }, true);
      card.current?.applyImpulse({ x: 0, y: 0.2, z: 0 }, true);
    }

    if (fixed.current && j1.current && j2.current && j3.current && band.current) {
      [j1, j2, j3].forEach(ref => {
        const body = ref.current;
        if (!body) return;
        const current = body.translation();
        const prev = lerpedPositions.current.get(body) ?? new THREE.Vector3().copy(current);
        const clampedDistance = Math.max(0.1, Math.min(1, prev.distanceTo(current)));
        prev.lerp(current, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
        lerpedPositions.current.set(body, prev);
      });

      curve.points[0].copy(lerpedPositions.current.get(j3.current) ?? j3.current.translation());
      curve.points[1].copy(lerpedPositions.current.get(j2.current) ?? j2.current.translation());
      curve.points[2].copy(lerpedPositions.current.get(j1.current) ?? j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      
      band.current.geometry.setPoints(curve.getPoints(32));
      
      ang.copy(card.current.angvel());
      const curRot = card.current.rotation();
      q.set(curRot.x, curRot.y, curRot.z, curRot.w);
      euler.setFromQuaternion(q);
      const targetY = Math.round(euler.y / Math.PI) * Math.PI;
      card.current.setAngvel({ x: ang.x, y: ang.y - (euler.y - targetY) * 0.25, z: ang.z }, true);
    }
  });

  const meshLineGeom = useMemo(() => new MeshLineGeometry(), []);
  const meshLineMat = useMemo(() => {
    const params: MeshLineMaterialParameters = {
      color: '#DBDBDB',
      resolution: new THREE.Vector2(size.width, size.height),
      useMap: 1,
      map: lanyardTexture,
      repeat: new THREE.Vector2(-4, 1),
      lineWidth: 1
    };
    const material = new MeshLineMaterial(params);
    material.depthTest = true;
    return material;
  }, [lanyardTexture, size.height, size.width]);

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              const target = e.target as unknown as {
                releasePointerCapture: (pointerId: number) => void;
              };
              target.releasePointerCapture(e.pointerId);
              drag(false);
              if (Date.now() - pointerDownTime.current < 200) {
                shouldFlip.current = true;
              }
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              const target = e.target as unknown as {
                setPointerCapture: (pointerId: number) => void;
              };
              target.setPointerCapture(e.pointerId);
              pointerDownTime.current = Date.now();
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} geometry={meshLineGeom} material={meshLineMat} />
    </>
  );
}
