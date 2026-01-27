"use client";

import { useEffect, useRef, useCallback, useState } from "react";

class Pixel {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  size: number;
  maxSize: number;
  delay: number;
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
    this.speed = speed;
    this.randomFactor = 0.4 + Math.random() * 1.6;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    const currentSize = this.size;
    const offset = (this.maxSize - currentSize) / 2;
    this.ctx.fillRect(this.x + offset, this.y + offset, currentSize, currentSize);
  }

  update(clock: number) {
    if (clock > this.delay) {
      if (this.size < this.maxSize) {
        this.size += this.speed * 4 * this.randomFactor;
        if (this.size > this.maxSize) this.size = this.maxSize;
      }
    } else {
      if (this.size > 0) {
        this.size -= this.speed * 4 * this.randomFactor;
        if (this.size < 0) this.size = 0;
      }
    }
    
    if (this.size > 0) {
      this.draw();
      return false;
    }
    return true;
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
  gap = 12,
  speed = 0.45,
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
  const waveClock = useRef(0);
  const [maxDistance, setMaxDistance] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    let maxDist = 0;
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const dx = x - width * origin.x;
        const dy = y - height * origin.y;
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > maxDist) maxDist = distance;
        
        pxs.push(new Pixel(ctx, x, y, color, gap + 1, distance, speed));
      }
    }
    pixelsRef.current = pxs;
    setMaxDistance(maxDist);
  }, [color, gap, speed, origin.x, origin.y]);

  const animate = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    if (active) {
      waveClock.current += speed * 15;
      if (waveClock.current > maxDistance + 100) {
        waveClock.current = maxDistance + 100;
      }
    } else {
      waveClock.current -= speed * 15;
      if (waveClock.current < 0) {
        waveClock.current = 0;
      }
    }

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const isIdle = pixelsRef.current[i].update(waveClock.current);
      if (!isIdle) allIdle = false;
    }

    if (!allIdle || (active && waveClock.current < maxDistance + 100) || (!active && waveClock.current > 0)) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = null;
    }
  }, [active, maxDistance, speed]);

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

  if (!isMounted) {
    return (
      <span 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{ borderRadius, overflow: 'hidden', display: 'block' }}
      />
    );
  }

  return (
    <span 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ borderRadius, overflow: 'hidden', display: 'block' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </span>
  );
}
