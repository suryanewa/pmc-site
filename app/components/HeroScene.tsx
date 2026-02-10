"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      isInitialized?: boolean;
    };
  }
}

const UNICORN_SDK_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.4/dist/unicornStudio.umd.js";

const UNICORN_PROJECT_ID = "iqmKJVFD9SyCutTNbiGK";

export function HeroScene() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [sceneScale, setSceneScale] = useState(1);

  useEffect(() => {
    let scriptEl: HTMLScriptElement | null = document.querySelector(
      `script[src="${UNICORN_SDK_SRC}"]`,
    );

    const initScene = () => {
      if (!window.UnicornStudio?.init) return;
      window.UnicornStudio.init();
    };

    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.src = UNICORN_SDK_SRC;
      scriptEl.async = true;
      scriptEl.onload = initScene;
      document.head.appendChild(scriptEl);
    } else if (window.UnicornStudio) {
      initScene();
    } else {
      scriptEl.addEventListener("load", initScene, { once: true });
    }

    return () => {
      scriptEl?.removeEventListener("load", initScene);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.min(width / 1440, height / 900) * 1.5;
      setSceneScale(scale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full flex items-center justify-center overflow-visible"
    >
      <div
        data-us-project={UNICORN_PROJECT_ID}
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
    </div>
  );
}

export default HeroScene;
