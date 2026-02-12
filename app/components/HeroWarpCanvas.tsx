"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "../../hooks/use-is-mobile";

export function HeroWarpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentCenter: { x: number; y: number };
    let targetCenter: { x: number; y: number };
    let cols = 0;
    let rows = 0;
    let dither: ImageData[] = [];
    let expands = true;
    let length = 0;
    let mx = 0;
    let pixel: ImageData;
    let scale = 0;
    let size = 0;
    let step = 0;
    let rafId: number | null = null;
    let lastTime = 0;
    let lastPointerEventTime = 0;
    let heroRect: DOMRect | null = null;
    let canvasRect: DOMRect | null = null;

    const colour = "rgba(4, 21, 64, 0.25)";

    const draw = (img: ImageData, x: number, y: number) => {
      ctx.putImageData(img, x, y);
    };

    const createDither = () => {
      const sequence = [0, 10, 2, 8, 5, 15, 7, 13, 1, 11, 3, 9, 4, 14, 6, 12];
      const sq = sequence.length / 4;

      for (let repeat = Math.ceil(Math.random() * 8); repeat >= 0; repeat--) {
        dither.push(ctx.getImageData(0, 0, size, size));
      }

      for (const num of sequence) {
        const row = Math.floor(num / sq);
        const col = num % sq;
        draw(pixel, col * scale, row * scale);
        const pattern = ctx.getImageData(0, 0, size, size);
        for (let repeat = Math.ceil(Math.random() * 4); repeat >= 0; repeat--) {
          dither.push(pattern);
          dither.unshift(pattern);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      length = dither.length;
    };

    const stepRate = 10;
    const pointerEase = 0.08;
    const frameInterval = 1000 / 45;
    const pointerThrottleMs = 32;
    let smoothedMx = 0;

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && rafId === null) {
          lastTime = 0;
          rafId = requestAnimationFrame(warp);
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    const warp = (time: number) => {
      if (!isVisible) {
        rafId = null;
        return;
      }
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;
      if (elapsed < frameInterval) {
        rafId = requestAnimationFrame(warp);
        return;
      }
      const delta = Math.min(0.05, elapsed / 1000);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      smoothedMx += (mx - smoothedMx) * pointerEase;

      const ease = 0.1;
      currentCenter.x += (targetCenter.x - currentCenter.x) * ease;
      currentCenter.y += (targetCenter.y - currentCenter.y) * ease;

      for (let i = cols * rows; i >= 0; i--) {
        const pattern =
          dither[
            Math.abs(
              step +
                currentCenter.y *
                  Math.hypot(
                    (i % cols - currentCenter.x) / currentCenter.y,
                    (((i / cols) | 0) - currentCenter.y) / currentCenter.y
                  ) |
                0
            ) % length
          ];
        const row = Math.floor(i / cols);
        const col = i % cols;
        draw(pattern, col * size, row * size);
      }

      const direction = expands ? -1 : 1;
      step += direction * stepRate * delta;

      rafId = requestAnimationFrame(warp);
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = false;

      scale = Math.round(Math.min(canvas.width, canvas.height) * 0.0025) + 4;
      size = scale * 4;
      step = 0;
      dither = [];
      expands = true;
      mx = canvas.width / 2;

      ctx.fillStyle = colour;
      ctx.fillRect(0, 0, scale, scale);
      pixel = ctx.getImageData(0, 0, scale, scale);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cols = Math.ceil(canvas.width / size);
      rows = Math.ceil(canvas.height / size);

      currentCenter = {
        x: cols / 2,
        y: rows / 2,
      };
      targetCenter = { ...currentCenter };

      smoothedMx = mx;
      updateRects();
      createDither();
      rafId = requestAnimationFrame(warp);
    };

    const invert = () => {
      expands = !expands;
    };

    const hero = canvas.closest("section");
    if (!hero) return;

    const updateRects = () => {
      heroRect = hero.getBoundingClientRect();
      canvasRect = canvas.getBoundingClientRect();
    };

    const updateTarget = (clientX: number, clientY: number) => {
      if (!heroRect || !canvasRect || canvasRect.width === 0 || canvasRect.height === 0) {
        return;
      }

      const scaleX = canvas.width / canvasRect.width;
      const scaleY = canvas.height / canvasRect.height;

      const x = (clientX - canvasRect.left) * scaleX;
      const y = (clientY - canvasRect.top) * scaleY;

      const clampedX = Math.max(heroRect.left, Math.min(clientX, heroRect.right));
      const clampedY = Math.max(heroRect.top, Math.min(clientY, heroRect.bottom));

      if (clientX !== clampedX || clientY !== clampedY) {
        targetCenter.x = cols / 2;
        targetCenter.y = rows / 2;
        return;
      }

      targetCenter.x = x / size;
      targetCenter.y = y / size;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.timeStamp - lastPointerEventTime < pointerThrottleMs) return;
      lastPointerEventTime = event.timeStamp;
      mx = event.clientX + 1;
      updateTarget(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      targetCenter.x = cols / 2;
      targetCenter.y = rows / 2;
    };

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      init();
    };

    init();

    window.addEventListener("resize", handleResize, { passive: true });
    if (!isMobile) {
      hero.addEventListener("pointerdown", invert, { passive: true });
      hero.addEventListener("pointerup", invert, { passive: true });
      hero.addEventListener("pointerenter", handlePointerMove, { passive: true });
      hero.addEventListener("pointermove", handlePointerMove, { passive: true });
      hero.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      visibilityObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        hero.removeEventListener("pointerdown", invert);
        hero.removeEventListener("pointerup", invert);
        hero.removeEventListener("pointerenter", handlePointerMove);
        hero.removeEventListener("pointermove", handlePointerMove);
        hero.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, [isMobile]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full opacity-40 mix-blend-multiply"
      />
    </div>
  );
}
