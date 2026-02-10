"use client";

import { useEffect, useRef, useCallback } from "react";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;

  if (value <= min || reducedMotion) {
    return min;
  } else if (value >= max) {
    return max * throttle;
  } else {
    return value * throttle;
  }
}

type PixelAction = "appear" | "disappear";

interface PixelHoverCanvasProps {
  colors: string;
  gap?: number;
  speed?: number;
  active?: boolean;
  className?: string;
  radius?: number;
}

export default function PixelHoverCanvas({
  colors,
  gap = 6,
  speed = 35,
  active = false,
  className = "",
  radius = 22,
}: PixelHoverCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const timePreviousRef = useRef<number>(0);

  const initPixels = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = Math.floor(containerRef.current.offsetWidth);
    const height = Math.floor(containerRef.current.offsetHeight);
    const ctx = canvasRef.current.getContext("2d");

    if (!ctx || width === 0 || height === 0) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.imageSmoothingEnabled = false;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const colorsArray = colors.split(",");
    const pxs: Pixel[] = [];
    const gapNum = Math.max(1, Math.floor(gap));
    
    for (let x = 0; x < width; x += gapNum) {
      for (let y = 0; y < height; y += gapNum) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;

        pxs.push(
          new Pixel(
            canvasRef.current,
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(speed, reducedMotion),
            delay
          )
        );
      }
    }
    pixelsRef.current = pxs;
  }, [colors, gap, speed]);

  const doAnimate = useCallback(function doAnimate(action: PixelAction) {
    animationRef.current = requestAnimationFrame(() => doAnimate(action));
    const timeNow = performance.now();
    if (timePreviousRef.current === 0) {
      timePreviousRef.current = timeNow;
    }
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i += 1) {
      const pixel = pixelsRef.current[i];
      if (action === "appear") {
        pixel.appear();
      } else {
        pixel.disappear();
      }
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    if (allIdle && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const handleAnimation = useCallback((action: PixelAction) => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    timePreviousRef.current = performance.now();
    animationRef.current = requestAnimationFrame(() => doAnimate(action));
  }, [doAnimate]);

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => {
      initPixels();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [initPixels]);

  useEffect(() => {
    if (!pixelsRef.current.length) {
      initPixels();
    }
    handleAnimation(active ? "appear" : "disappear");
  }, [active, initPixels, handleAnimation]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        borderRadius: `${radius}px`,
        overflow: "hidden"
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true" 
      />
    </div>
  );
}
