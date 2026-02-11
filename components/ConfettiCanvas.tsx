"use client";

import React, { useEffect, useRef, useCallback } from 'react';

const confettiCount = 40;
const sequinCount = 20;
const gravityConfetti = 0.3;
const gravitySequins = 0.55;
const dragConfetti = 0.075;
const dragSequins = 0.02;
const terminalVelocity = 3;

const colors = [
  { front: '#41C9C1', back: '#5076DD' }, // Cyan to Blue
  { front: '#5076DD', back: '#6966E3' }, // Blue to Indigo
  { front: '#6966E3', back: '#41C9C1' }, // Indigo to Cyan
  { front: '#DBDBDB', back: '#3F3F3F' }, // Neutral
];

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

const initConfettoVelocity = (xRange: [number, number], yRange: [number, number]) => {
  const x = randomRange(xRange[0], xRange[1]);
  const range = yRange[1] - yRange[0] + 1;
  let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
  if (y >= yRange[1] - 1) {
    y += (Math.random() < 0.25) ? randomRange(1, 3) : 0;
  }
  return { x: x, y: -y };
};

class Confetto {
  randomModifier: number;
  color: { front: string; back: string };
  dimensions: { x: number; y: number };
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  velocity: { x: number; y: number };

  constructor(canvasWidth: number, canvasHeight: number, startX: number, startY: number) {
    this.randomModifier = randomRange(0, 99);
    this.color = colors[Math.floor(randomRange(0, colors.length))];
    this.dimensions = {
      x: randomRange(5, 9),
      y: randomRange(8, 15),
    };
    this.position = {
      x: randomRange(startX - 100, startX + 100),
      y: randomRange(startY - 20, startY + 20),
    };
    this.rotation = randomRange(0, 2 * Math.PI);
    this.scale = { x: 1, y: 1 };
    this.velocity = initConfettoVelocity([-12, 12], [8, 18]);
  }

  update() {
    this.velocity.x -= this.velocity.x * dragConfetti;
    this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity);
    this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
  }
}

class Sequin {
  color: string;
  radius: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };

  constructor(canvasWidth: number, canvasHeight: number, startX: number, startY: number) {
    this.color = colors[Math.floor(randomRange(0, colors.length))].back;
    this.radius = randomRange(1, 2);
    this.position = {
      x: randomRange(startX - 80, startX + 80),
      y: randomRange(startY - 20, startY + 20),
    };
    this.velocity = {
      x: randomRange(-10, 10),
      y: randomRange(-10, -20),
    };
  }

  update() {
    this.velocity.x -= this.velocity.x * dragSequins;
    this.velocity.y = this.velocity.y + gravitySequins;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export interface ConfettiCanvasHandle {
  burst: (x: number, y: number) => void;
}

interface ConfettiCanvasProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

const ConfettiCanvas = React.forwardRef<ConfettiCanvasHandle, ConfettiCanvasProps>(({ containerRef }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<Confetto[]>([]);
  const sequinsRef = useRef<Sequin[]>([]);
  const requestRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  const render = useCallback(function render() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiRef.current.forEach((confetto, index) => {
      const width = confetto.dimensions.x * confetto.scale.x;
      const height = confetto.dimensions.y * confetto.scale.y;

      ctx.save();
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);
      confetto.update();
      ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
      ctx.fillRect(-width / 2, -height / 2, width, height);
      ctx.restore();

      if (confetto.position.y >= canvas.height) {
        confettiRef.current.splice(index, 1);
      }
    });

    sequinsRef.current.forEach((sequin, index) => {
      ctx.save();
      ctx.translate(sequin.position.x, sequin.position.y);
      sequin.update();
      ctx.fillStyle = sequin.color;
      ctx.beginPath();
      ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      if (sequin.position.y >= canvas.height) {
        sequinsRef.current.splice(index, 1);
      }
    });

    if (confettiRef.current.length > 0 || sequinsRef.current.length > 0) {
      requestRef.current = requestAnimationFrame(render);
      return;
    }

    isAnimatingRef.current = false;
    requestRef.current = 0;
  }, []);

  const startRenderLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    requestRef.current = requestAnimationFrame(render);
  }, [render]);

  const burst = useCallback((x: number, y: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const containerRect = containerRef?.current?.getBoundingClientRect();
    const relativeX = containerRect ? x - containerRect.left : x;
    const relativeY = containerRect ? y - containerRect.top : y;

    for (let i = 0; i < confettiCount; i++) {
      confettiRef.current.push(new Confetto(canvas.width, canvas.height, relativeX, relativeY));
    }
    for (let i = 0; i < sequinCount; i++) {
      sequinsRef.current.push(new Sequin(canvas.width, canvas.height, relativeX, relativeY));
    }
    startRenderLoop();
  }, [containerRef, startRenderLoop]);

  React.useImperativeHandle(ref, () => ({
    burst,
  }));

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      } else {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      isAnimatingRef.current = false;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [containerRef]);

  const isContained = !!containerRef;

  return (
    <canvas
      ref={canvasRef}
      className={isContained 
        ? "absolute inset-0 pointer-events-none z-[100]" 
        : "fixed inset-0 pointer-events-none z-[100]"
      }
      style={isContained ? undefined : { width: '100vw', height: '100vh' }}
    />
  );
});

ConfettiCanvas.displayName = 'ConfettiCanvas';

export default ConfettiCanvas;
