"use client";

import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { useIsMobile } from "../hooks/use-is-mobile";

interface AsciiHoverEffectProps {
  chars?: string;
  fontSize?: number;
  active?: boolean;
  className?: string;
  colors?: string;
}

interface NavigatorPerformanceInfo extends Navigator {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
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
  const isMobile = useIsMobile();
  const [isInitialized, setIsInitialized] = useState(active);
  const [isEffectEnabled, setIsEffectEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const cellsRef = useRef<AsciiCell[]>([]);
  const activeRef = useRef(active);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rippleRadiusRef = useRef(0);
  const rectRef = useRef<DOMRect | null>(null);
  const lastMoveTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const isVisibleRef = useRef(false);
  const charArray = useMemo(() => chars.split(""), [chars]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = navigator as NavigatorPerformanceInfo;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = nav.connection?.saveData ?? false;
    const cpuCores = nav.hardwareConcurrency ?? 8;
    const deviceMemory = nav.deviceMemory ?? 8;

    setIsEffectEnabled(!isMobile && !prefersReducedMotion && !saveData && cpuCores >= 6 && deviceMemory >= 4);
  }, [isMobile]);

  useEffect(() => {
    if (!isEffectEnabled) return;
    if (active && !isInitialized) {
      setIsInitialized(true);
    }
  }, [active, isInitialized, isEffectEnabled]);

  useEffect(() => {
    if (!isEffectEnabled) return;
    const wasActive = activeRef.current;
    activeRef.current = active;
    if (!wasActive && active) {
      rippleRadiusRef.current = 0;
    }
  }, [active, isEffectEnabled]);

  const updateRect = useCallback(() => {
    if (!containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
  }, []);

  useEffect(() => {
    if (!isEffectEnabled) return;
    if (!isInitialized) return;
    if (!active) return;

    let rafId: number | null = null;

    updateRect();

    const onMove = (e: MouseEvent) => {
      if (e.timeStamp - lastMoveTimeRef.current < 80) return;
      lastMoveTimeRef.current = e.timeStamp;
      const rect = rectRef.current;
      if (!rect) return;
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const scheduleRectRefresh = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateRect();
      });
    };

    const attachListeners = () => {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("resize", scheduleRectRefresh, { passive: true });
    };

    const detachListeners = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", scheduleRectRefresh);
    };

    if (isVisibleRef.current) {
      attachListeners();
    }

    return () => {
      detachListeners();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [active, isInitialized, updateRect, isEffectEnabled]);

  const initCells = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx || width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cols = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / fontSize);
    const colorArray = colors.split(",").map(c => c.trim());

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
  }, [charArray, colors, fontSize]);

  const animate = useCallback(function animateFrame(timestamp: number) {
    // Early return if not visible
    if (!isVisibleRef.current) {
      animationRef.current = null;
      return;
    }

    if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
    const elapsed = timestamp - lastFrameTimeRef.current;
    if (elapsed < 1000 / 24) {
      animationRef.current = requestAnimationFrame(animateFrame);
      return;
    }
    lastFrameTimeRef.current = timestamp;

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
    const maxDistSq = width * width + height * height;
    const rippleRadiusSq = rippleRadius * rippleRadius;

    let allIdle = true;
    
    ctx.save();
    cellsRef.current.forEach(cell => {
      const dx = cell.x - mx;
      const dy = cell.y - my;
      const distSq = dx * dx + dy * dy;

      let target = 0;
      if (isActive && distSq <= rippleRadiusSq) {
        // Only one sqrt needed for opacity calculation
        target = Math.max(0.12, 1 - Math.sqrt(distSq / maxDistSq) * 1.4);
      }

      const fadeSpeed = cell.opacity < target ? 0.07 : 0.045;
      if (cell.opacity < target - 0.005) {
        cell.opacity = Math.min(target, cell.opacity + fadeSpeed);
      } else if (cell.opacity > target + 0.005) {
        cell.opacity = Math.max(0, cell.opacity - fadeSpeed);
      }

      if (isActive && cell.opacity > 0.01 && Math.random() < 0.02) {
        cell.char = charArray[Math.floor(Math.random() * charArray.length)];
      }

      cell.draw(ctx);

      if (cell.opacity > 0.01) {
        allIdle = false;
      }
    });
    ctx.restore();

    if (!allIdle) {
      animationRef.current = requestAnimationFrame(animateFrame);
    } else {
      animationRef.current = null;
    }
  }, [charArray]);

  useEffect(() => {
    if (!isEffectEnabled) return;
    if (!isInitialized) return;
    initCells();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        
        if (entry.isIntersecting) {
          if (!wasVisible && animationRef.current === null) {
            animationRef.current = requestAnimationFrame(animate);
          }
          if (entry.boundingClientRect.width !== rectRef.current?.width ||
              entry.boundingClientRect.height !== rectRef.current?.height) {
            initCells();
            updateRect();
          }
        }
      },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [initCells, isInitialized, updateRect, animate, isEffectEnabled]);

  useEffect(() => {
    if (!isEffectEnabled) return;
    if (!isInitialized) return;
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [active, animate, isInitialized, isEffectEnabled]);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isEffectEnabled || !isInitialized) {
    return null;
  }

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
