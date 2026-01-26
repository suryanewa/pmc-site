"use client";

import { useEffect, useRef, useCallback } from "react";

class Pixel {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  size: number;
  maxSize: number;
  delay: number;
  counter: number;
  isIdle: boolean;
  speed: number;
  randomFactor: number;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    maxSize: number,
    delay: number,
    speed: number
  ) {
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 0;
    this.maxSize = maxSize;
    this.delay = delay;
    this.counter = 0;
    this.isIdle = false;
    this.speed = speed;
    this.randomFactor = 0.5 + Math.random() * 1.5;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter < this.delay) {
      this.counter += this.speed * 5;
      return;
    }
    if (this.size < this.maxSize) {
      this.size += this.speed * this.randomFactor;
      if (this.size > this.maxSize) this.size = this.maxSize;
    }
    this.draw();
  }

  disappear() {
    if (this.size <= 0) {
      this.isIdle = true;
      this.size = 0;
      this.counter = 0;
      return;
    }
    this.size -= this.speed * this.randomFactor * 1.5;
    if (this.size < 0) this.size = 0;
    this.draw();
  }
}

interface PixelFillCanvasProps {
  color: string;
  gap?: number;
  speed?: number;
  active?: boolean;
  origin?: { x: number; y: number };
  className?: string;
  borderRadius?: number | string;
}

export default function PixelFillCanvas({
  color,
  gap = 8,
  speed = 1.5,
  active = false,
  origin = { x: 0.5, y: 0.5 },
  className = "",
  borderRadius = 0,
}: PixelFillCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastActiveRef = useRef(active);

  const initPixels = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx || width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const pxs: Pixel[] = [];
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const dx = x - width * origin.x;
        const dy = y - height * origin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        pxs.push(new Pixel(ctx, x, y, color, gap + 1, distance, speed));
      }
    }
    pixelsRef.current = pxs;
  }, [color, gap, speed, origin.x, origin.y]);

  const animate = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    let allIdle = true;
    const action = active ? "appear" : "disappear";
    
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      if (action === "appear") {
        pixel.appear();
        if (pixel.size < pixel.maxSize) allIdle = false;
      } else {
        pixel.disappear();
        if (pixel.size > 0) allIdle = false;
      }
    }

    if (!allIdle) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = null;
    }
  }, [active]);

  useEffect(() => {
    if (active && !lastActiveRef.current) {
      initPixels();
    }
    lastActiveRef.current = active;
  }, [active, initPixels]);

  useEffect(() => {
    initPixels();
    
    const handleResize = () => initPixels();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initPixels]);

  useEffect(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [active, animate]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ borderRadius, overflow: 'hidden' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
