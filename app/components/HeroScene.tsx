"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Bounds } from "@react-three/drei";
import { useEffect, useMemo, useState, useRef } from "react";


// Mac model with video texture - always shows video
function MacModel({ 
  videoEl, 
  onLoaded,
}: { 
  videoEl: HTMLVideoElement | null; 
  onLoaded: () => void;
}) {
  const { scene } = useGLTF("/mac_edited.glb");
  const hasCalledOnLoaded = useRef(false);
  const modelScale = 0.3;
  const videoCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoCanvasTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const videoRafRef = useRef<number | null>(null);

  // Create video texture - just rotate 90 degrees CCW (no mirror)
  const videoTexture = useMemo(() => {
    if (videoEl) {
      const t = new THREE.VideoTexture(videoEl);
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      
      t.center.set(0.5, 0.5);
      t.rotation = Math.PI / 2;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.repeat.set(1, 1);
      t.offset.set(0, 0);
      
      return t;
    }
    
    // Fallback gradient if no video
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 512, 320);
      gradient.addColorStop(0, "#0115DF");
      gradient.addColorStop(1, "#041540");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 320);
    }
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [videoEl]);

  useEffect(() => {
    // Apply video texture to screen mesh
    let bestMesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | null = null;
    let bestArea = 0;
    let bestPriority = -1;

    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
        const name = mesh.name.toLowerCase();
        
        // Try to find screen by common names
        if (
          name.includes("screen") ||
          name.includes("display") ||
          name.includes("monitor") ||
          name.includes("glass")
        ) {
          const geometry = mesh.geometry;
          geometry.computeBoundingBox();
          const bounds = geometry.boundingBox;
          const size = new THREE.Vector3();

          if (bounds) {
            bounds.getSize(size);
            const dims = [size.x, size.y, size.z].sort((a, b) => b - a);
            const area = dims[0] * dims[1];
            const isGlass = name.includes("glass");
            const priority = isGlass ? 0 : 1;

            if (priority > bestPriority || (priority === bestPriority && area > bestArea)) {
              bestPriority = priority;
              bestArea = area;
              bestMesh = mesh;
            }
          }
        }
      }
    });

    if (bestMesh) {
      const geometry = (bestMesh as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>).geometry;
      geometry.computeBoundingBox();
      const bounds = geometry.boundingBox;
      const size = new THREE.Vector3();

      if (bounds) {
        bounds.getSize(size);
      }

      const videoWidth = videoEl?.videoWidth ?? 0;
      const videoHeight = videoEl?.videoHeight ?? 0;
      const uv = geometry.attributes.uv;

      if (videoWidth > 0 && videoHeight > 0 && uv && uv.count > 0) {
        let uMin = Infinity;
        let uMax = -Infinity;
        let vMin = Infinity;
        let vMax = -Infinity;

        for (let i = 0; i < uv.count; i += 1) {
          const u = uv.getX(i);
          const v = uv.getY(i);
          if (u < uMin) uMin = u;
          if (u > uMax) uMax = u;
          if (v < vMin) vMin = v;
          if (v > vMax) vMax = v;
        }

        const uRange = uMax - uMin;
        const vRange = vMax - vMin;
        if (uRange > 0 && vRange > 0) {
          const centerU = uMin + uRange / 2;
          const centerV = vMin + vRange / 2;
          const screenAspect = uRange / vRange;

          const canvas = videoCanvasRef.current ?? document.createElement("canvas");
          videoCanvasRef.current = canvas;
          const canvasWidth = 2048;
          const canvasHeight = Math.max(2, Math.round(canvasWidth / screenAspect));
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          let canvasTexture = videoCanvasTextureRef.current;
          if (!canvasTexture) {
            canvasTexture = new THREE.CanvasTexture(canvas);
            canvasTexture.colorSpace = THREE.SRGBColorSpace;
            canvasTexture.wrapS = THREE.ClampToEdgeWrapping;
            canvasTexture.wrapT = THREE.ClampToEdgeWrapping;
            canvasTexture.minFilter = THREE.LinearFilter;
            canvasTexture.magFilter = THREE.LinearFilter;
            videoCanvasTextureRef.current = canvasTexture;
          }

          canvasTexture.center.set(centerU, centerV);
          canvasTexture.rotation = videoTexture.rotation;
          const offsetU = -uMin / uRange + 0.05;
          const offsetV = -vMin / vRange;
          canvasTexture.repeat.set(1 / uRange, 1 / vRange);
          canvasTexture.offset.set(offsetU, offsetV);

          const ctx = canvas.getContext("2d");
          if (ctx) {
            const activeVideo = videoEl;
            if (!activeVideo) {
              return;
            }

            const renderFrame = () => {
              ctx.setTransform(1, 0, 0, 1, 0, 0);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.fillStyle = "#000";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.imageSmoothingEnabled = true;

              const videoAspect = videoWidth / videoHeight;
              const padX = canvas.width * 0.18;
              const innerW = Math.max(2, canvas.width - padX * 2);
              const innerH = canvas.height;
              let drawW = innerW;
              let drawH = innerH;
              if (videoAspect > screenAspect) {
                drawW = innerW;
                drawH = innerW / videoAspect;
              } else {
                drawH = innerH;
                drawW = innerH * videoAspect;
              }

              const maxScale = Math.min(2, canvas.width / drawW, canvas.height / drawH);
              drawW *= maxScale;
              drawH *= maxScale;

              const shiftX = canvas.width * 0.30;
              let dx = padX - shiftX + (innerW - drawW) / 2;
              let dy = (innerH - drawH) / 2;
              dx = Math.max(0, Math.min(dx, canvas.width - drawW));
              dy = Math.max(0, Math.min(dy, canvas.height - drawH));
              ctx.save();
              ctx.beginPath();
              ctx.rect(0, 0, canvas.width, canvas.height);
              ctx.clip();
              ctx.drawImage(activeVideo, dx, dy, drawW, drawH);
              ctx.restore();
              canvasTexture.needsUpdate = true;
              videoRafRef.current = requestAnimationFrame(renderFrame);
            };

            if (videoRafRef.current === null) {
              videoRafRef.current = requestAnimationFrame(renderFrame);
            }
          }

          (bestMesh as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>).material = new THREE.MeshBasicMaterial({
            map: canvasTexture,
            toneMapped: false,
          });
        }
      }

      if (!videoCanvasTextureRef.current) {
        (bestMesh as THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>).material = new THREE.MeshBasicMaterial({
          map: videoTexture,
          toneMapped: false,
        });
      }
    }

    if (!hasCalledOnLoaded.current) {
      hasCalledOnLoaded.current = true;
      setTimeout(() => onLoaded(), 100);
    }
  }, [scene, videoTexture, onLoaded]);

  useEffect(() => () => {
    if (videoRafRef.current !== null) {
      cancelAnimationFrame(videoRafRef.current);
      videoRafRef.current = null;
    }
  }, []);

  // Center the model based on its bounding box
  const centerOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    const yOffset = size.y * modelScale * 0.04;
    return [
      -center.x * modelScale,
      -center.y * modelScale - yOffset,
      -center.z * modelScale,
    ] as [number, number, number];
  }, [scene, modelScale]);

  return (
    <group position={centerOffset} scale={modelScale} rotation={[0.1, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/mac_edited.glb");

export function HeroScene() {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [modelReady, setModelReady] = useState(false);

  // Load video and start playing immediately
  useEffect(() => {
    const v = document.createElement("video");
    v.src = "/eeg-crt.mp4";
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.crossOrigin = "anonymous";
    
    v.addEventListener("canplaythrough", () => {
      v.play().catch(console.error);
      setVideoEl(v);
    });

    v.addEventListener("error", () => {
      console.log("Video error, continuing without");
      setVideoEl(null);
    });

    v.load();

    return () => {
      v.pause();
      v.src = "";
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Loading state */}
      {!modelReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-40">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-[#041540]/20 border-t-[#041540]/60 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* 3D Canvas with Mac */}
      <Canvas
        camera={{ position: [0, 0.2, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[0, 5, 3]} intensity={0.5} angle={0.5} penumbra={1} />
        <pointLight position={[-3, 2, 2]} intensity={0.3} color="#0115DF" />
        
        {/* Mac Model */}
        <Bounds fit clip observe margin={1.08}>
          <MacModel 
            videoEl={videoEl} 
            onLoaded={() => setModelReady(true)} 
          />
        </Bounds>
        
        {/* Soft blob shadow underneath Mac */}
        <ContactShadows 
          position={[0, -2.2, 0]} 
          opacity={0.2} 
          scale={5} 
          blur={2} 
          far={3}
        />
        
        {/* Environment */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export default HeroScene;
