"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useState, useRef } from "react";


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

// Static camera - Mac positioned on right side of screen
function CameraController() {
  const { camera } = useThree();

  useFrame(() => {
    // Camera positioned to put Mac on far right, slight angle
    camera.position.set(3.5, 0.3, 5);
    camera.lookAt(1, -0.2, 0);
  });

  return null;
}

useGLTF.preload("/mac_edited.glb");

export function HeroScene() {
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [modelReady, setModelReady] = useState(false);

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
        camera={{ position: [0, 0.2, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor('#F7F3EE', 1);
        }}
        style={{ background: "#F7F3EE" }}
      >
        <CameraController />
        
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
