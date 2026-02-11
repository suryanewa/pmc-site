"use client";

import { useEffect, useRef, useCallback } from "react";

interface AsciiHoverEffectProps {
  chars?: string;
  fontSize?: number;
  active?: boolean;
  className?: string;
  colors?: string;
}

class AsciiCell {
  x: number;
  y: number;
  char: string;
  color: string;
  opacity: number;

  constructor(x: number, y: number, char: string, color: string) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.color = color;
    this.opacity = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0.01) return;
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillText(this.char, this.x, this.y);
    ctx.globalAlpha = 1;
  }
}

export default function AsciiHoverEffect({
  chars = ".:-=+*#%@",
  fontSize = 14,
  active = false,
  className = "",
  colors = "#ffffff",
}: AsciiHoverEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const cellsRef = useRef<AsciiCell[]>([]);
  const activeRef = useRef(active);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rippleRadiusRef = useRef(0);

  useEffect(() => {
    const wasActive = activeRef.current;
    activeRef.current = active;
    if (!wasActive && active) {
      rippleRadiusRef.current = 0;
    }
  }, [active]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const initCells = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx || width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;

    ctx.scale(dpr, dpr);
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cols = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / fontSize);
    const colorArray = colors.split(",").map(c => c.trim());
    const charArray = chars.split("");

    const newCells: AsciiCell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * fontSize + fontSize / 2;
        const y = r * fontSize + fontSize / 2;
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];
        newCells.push(new AsciiCell(x, y, char, color));
      }
    }
    cellsRef.current = newCells;
  }, [colors, chars, fontSize]);

  const animate = useCallback(function animateFrame() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvasRef.current.width / dpr;
    const height = canvasRef.current.height / dpr;
    const isActive = activeRef.current;
    const { x: mx, y: my } = mouseRef.current;

    ctx.clearRect(0, 0, width, height);

    if (isActive) {
      rippleRadiusRef.current += 10;
    }
    const rippleRadius = rippleRadiusRef.current;
    const maxDist = Math.sqrt(width * width + height * height);

    let allIdle = true;
    const charArray = chars.split("");

    cellsRef.current.forEach(cell => {
      const dx = cell.x - mx;
      const dy = cell.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let target = 0;
      if (isActive && dist <= rippleRadius) {
        target = Math.max(0.12, 1 - (dist / maxDist) * 1.4);
      }

      const fadeSpeed = cell.opacity < target ? 0.07 : 0.045;
      if (cell.opacity < target - 0.005) {
        cell.opacity = Math.min(target, cell.opacity + fadeSpeed);
      } else if (cell.opacity > target + 0.005) {
        cell.opacity = Math.max(0, cell.opacity - fadeSpeed);
      }

      if (isActive && cell.opacity > 0.01 && Math.random() < 0.05) {
        cell.char = charArray[Math.floor(Math.random() * charArray.length)];
      }

      cell.draw(ctx);

      if (cell.opacity > 0.01) {
        allIdle = false;
      }
    });

    if (!allIdle) {
      animationRef.current = requestAnimationFrame(animateFrame);
    } else {
      animationRef.current = null;
    }
  }, [chars]);

  useEffect(() => {
    initCells();
    const observer = new ResizeObserver(() => initCells());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [initCells]);

  useEffect(() => {
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [active, animate]);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
