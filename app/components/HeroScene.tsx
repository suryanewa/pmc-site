"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useState, useRef } from "react";

interface HeroSceneProps {
  scrollProgress?: number; // 0 to 1, where 0 = top, 1 = scrolled past hero
}

// Mac model with video texture - always shows video
function MacModel({ 
  videoEl, 
  onLoaded
}: { 
  videoEl: HTMLVideoElement | null; 
  onLoaded: () => void;
}) {
  const { scene } = useGLTF("/mac_edited.glb");
  const hasCalledOnLoaded = useRef(false);

  // Create video texture - just rotate 90 degrees CCW (no mirror)
  const videoTexture = useMemo(() => {
    if (videoEl) {
      const t = new THREE.VideoTexture(videoEl);
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      // Rotate 90 degrees counter-clockwise only
      t.center.set(0.5, 0.5);
      t.rotation = Math.PI / 2;
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
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const name = mesh.name.toLowerCase();
        
        // Try to find screen by common names
        if (
          name.includes("screen") ||
          name.includes("display") ||
          name.includes("monitor") ||
          name.includes("glass")
        ) {
          mesh.material = new THREE.MeshBasicMaterial({
            map: videoTexture,
            toneMapped: false,
          });
        }
      }
    });

    if (!hasCalledOnLoaded.current) {
      hasCalledOnLoaded.current = true;
      setTimeout(() => onLoaded(), 100);
    }
  }, [scene, videoTexture, onLoaded]);

  // Center the model based on its bounding box
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={0.05} 
      position={[0, -0.5, 0]} 
      rotation={[0.1, 0, 0]} 
    />
  );
}

// Camera animation controller based on scroll - zooms OUT then pans RIGHT
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const currentProgress = useRef(0);

  useFrame((_, delta) => {
    // Smooth interpolation towards target scroll progress
    currentProgress.current += (scrollProgress - currentProgress.current) * delta * 5;
    
    // Animation completes at 50% scroll, leaving rest for static view with text
    const animProgress = Math.min(currentProgress.current / 0.5, 1); // Full animation in first 50% of scroll
    
    // Phase 1 (0-25% scroll): Zoom out from screen to full Mac view
    // Phase 2 (25-50% scroll): Pan camera RIGHT so Mac appears on the RIGHT side of screen
    
    const zoomProgress = Math.min(animProgress * 2, 1); // 0-1 during first half of animation
    const panProgress = Math.max((animProgress - 0.5) * 2, 0); // 0-1 during second half of animation
    
    // Zoom: start at screen level, end at good viewing distance
    const startZ = 0.0;  // At screen level - fills viewport
    const endZ = 6;      // Shows full Mac nicely
    const z = startZ + (endZ - startZ) * zoomProgress;
    
    // Pan: move camera LEFT so Mac appears on RIGHT side of screen (no rotation)
    const startX = 0;
    const endX = -2;  // Camera moves left, Mac appears on right
    const x = startX + (endX - startX) * panProgress;
    
    // Y position: lower to reduce space at top
    const startY = 0.2;
    const endY = 0;
    const y = startY + (endY - startY) * zoomProgress;
    
    camera.position.set(x, y, z);
    
    // Look slightly down to frame Mac better
    camera.lookAt(0, -0.5, 0);
  });

  return null;
}

useGLTF.preload("/mac_edited.glb");

export function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [modelReady, setModelReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load video and start playing immediately
  useEffect(() => {
    const v = document.createElement("video");
    v.src = "/140912-776415326_small.mp4";
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

  // Sync the overlay video with the texture video
  useEffect(() => {
    if (videoEl && videoRef.current) {
      const syncVideos = () => {
        if (videoRef.current && videoEl) {
          videoRef.current.currentTime = videoEl.currentTime;
        }
      };
      // Sync on timeupdate
      videoEl.addEventListener('timeupdate', syncVideos);
      return () => videoEl.removeEventListener('timeupdate', syncVideos);
    }
  }, [videoEl]);

  // Sudden cut - overlay disappears completely after 15% scroll (no fade/blur)
  const showOverlay = scrollProgress < 0.15;

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Loading state */}
      {!modelReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F7F3EE] z-40">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-[#041540]/20 border-t-[#041540]/60 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* 3D Canvas with Mac */}
      <Canvas
        camera={{ position: [0, 0.2, 0.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor('#F7F3EE', 1);
        }}
        style={{ background: "#F7F3EE" }}
      >
        <CameraController scrollProgress={scrollProgress} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[0, 5, 3]} intensity={0.5} angle={0.5} penumbra={1} />
        <pointLight position={[-3, 2, 2]} intensity={0.3} color="#0115DF" />
        
        {/* Mac Model */}
        <MacModel 
          videoEl={videoEl} 
          onLoaded={() => setModelReady(true)} 
        />
        
        {/* Soft blob shadow underneath Mac */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.15} 
          scale={4} 
          blur={2.5} 
          far={2}
        />
        
        {/* Environment */}
        <Environment preset="city" />
      </Canvas>

      {/* Fullscreen video overlay - sudden cut to reveal Mac */}
      {showOverlay && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <video
            ref={videoRef}
            src="/140912-776415326_small.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      )}
    </div>
  );
}

export default HeroScene;
