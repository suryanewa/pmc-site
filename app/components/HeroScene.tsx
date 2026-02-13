"use client";

import { useEffect, useRef, useState } from "react";
import { initializeUnicornStudio } from "@/lib/unicorn-loader";

const UNICORN_PROJECT_ID = "iqmKJVFD9SyCutTNbiGK";

export function HeroScene() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [sceneScale, setSceneScale] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [hasInitializedScene, setHasInitializedScene] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasInitializedScene) {
          setHasInitializedScene(true);
          void initializeUnicornStudio();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [hasInitializedScene]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId: number | null = null;
    let lastScale = -1;

    const updateScale = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.min(width / 1440, height / 900) * 1.5;
      if (scale === lastScale) return;
      lastScale = scale;
      setSceneScale(scale);
    };

    const scheduleScaleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateScale();
      });
    };

    updateScale();
    const observer = new ResizeObserver(scheduleScaleUpdate);
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const shouldRender = isVisible && isPageVisible && hasInitializedScene;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full flex items-center justify-center overflow-visible"
    >
      {shouldRender && (
        <div
          data-us-project={UNICORN_PROJECT_ID}
          data-us-production="true"
          className="unicorn-hero-scene"
          style={{
            width: 1440,
            height: 900,
            transform: `translate(-50%, -50%) scale(${sceneScale * 0.9})`,
            transformOrigin: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        />
      )}
    </div>
  );
}

export default HeroScene;
