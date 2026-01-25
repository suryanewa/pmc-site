"use client";

import { useEffect, useRef } from "react";

export function HeroWarpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let center: { x: number; y: number };
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
    let timeout: ReturnType<typeof setTimeout> | null = null;

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

    const warp = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = cols * rows; i >= 0; i--) {
        const pattern =
          dither[
            Math.abs(
              step +
                center.y *
                  Math.hypot(
                    (i % cols - center.x) / center.y,
                    (((i / cols) | 0) - center.y) / center.y
                  ) |
                0
            ) % length
          ];
        const row = Math.floor(i / cols);
        const col = i % cols;
        draw(pattern, col * size, row * size);
      }

      if (expands) {
        step--;
      } else {
        step++;
      }

      const speed = Math.round((mx / canvas.width) * 28) + 2;
      timeout = setTimeout(warp, 1000 / speed);
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

      center = {
        x: cols / 2,
        y: rows / 2,
      };

      createDither();
      warp();
    };

    const invert = () => {
      expands = !expands;
    };

    const mousemove = (event: MouseEvent) => {
      mx = event.clientX + 1;
    };

    const touchmove = (event: TouchEvent) => {
      if (!event.targetTouches.length) return;
      mx = event.targetTouches[0].clientX + 1;
    };

    const handleResize = () => {
      if (timeout) clearTimeout(timeout);
      init();
    };

    init();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", invert);
    window.addEventListener("mouseup", invert);
    window.addEventListener("touchstart", invert, { passive: true });
    window.addEventListener("touchend", invert, { passive: true });
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("touchmove", touchmove, { passive: true });

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", invert);
      window.removeEventListener("mouseup", invert);
      window.removeEventListener("touchstart", invert);
      window.removeEventListener("touchend", invert);
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("touchmove", touchmove);
    };
  }, []);

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
