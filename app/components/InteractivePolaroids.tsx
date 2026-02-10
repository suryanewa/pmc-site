'use client';

import { AnimatePresence, motion, useReducedMotion, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useIsMobile } from '../../hooks/use-is-mobile';

type PolaroidPosition = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

export type InteractivePolaroid = PolaroidPosition & {
  id: number;
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  speed?: string;
  delay?: number;
};

function PushPin({
  color = '#41C9C1',
  active,
  size = 14,
}: {
  color?: string;
  active: boolean;
  size?: number;
}) {
  const displayColor = active ? color : '#3F3F3F';

  // Match the original /events polaroid pushpin sizing
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]"
    >
      <defs>
        <radialGradient id={`pinGradient-${size}`} cx="40%" cy="40%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#DBDBDB" stopOpacity="0.4" />
          <stop offset="100%" stopColor="black" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id={`topSurface-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBDBDB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#DBDBDB" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle
        cx="14"
        cy="16"
        r="7"
        animate={{ fill: displayColor }}
        fillOpacity="0.8"
        transition={{ duration: 0.3 }}
      />
      <circle cx="14" cy="16" r="7" fill={`url(#pinGradient-${size})`} />

      <motion.circle
        cx="14"
        cy="12"
        r="10"
        animate={{ fill: displayColor }}
        transition={{ duration: 0.3 }}
      />
      <circle cx="14" cy="12" r="10" fill={`url(#pinGradient-${size})`} />
      <circle cx="14" cy="12" r="9" fill={`url(#topSurface-${size})`} />

      <circle cx="11" cy="9" r="2.5" fill="#DBDBDB" fillOpacity="0.35" />
    </svg>
  );
}

function PolaroidCard({
  p,
  className,
  disableDrag = false,
  onSelect,
  setTopIndex,
}: {
  p: InteractivePolaroid;
  className: string;
  disableDrag?: boolean;
  onSelect?: () => void;
  setTopIndex: (id: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const rotateY = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const scale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });
  const imgScale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = isMobile || prefersReducedMotion || disableDrag;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isDragging) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -25);
    rotateY.set((offsetX / (rect.width / 2)) * 25);
  };

  const handleMouseEnter = () => {
    if (!isDragging) {
      scale.set(1.08);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      scale.set(1);
      imgScale.set(1);
      rotateX.set(0);
      rotateY.set(0);
      setIsHovered(false);
    }
  };

  const entryVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: {
          x: p.left ? '120%' : p.right ? '-120%' : 0,
          y: p.top ? '120%' : p.bottom ? '-120%' : 0,
          rotate: 0,
          opacity: 0,
          scale: 0.5,
        },
        visible: {
          x: 0,
          y: 0,
          rotate: p.rotate,
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring' as const,
            damping: 20,
            stiffness: 80,
            delay: (p.delay ?? 0) + 0.2,
            duration: 1.2,
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      drag={!disableDrag}
      dragConstraints={disableDrag ? undefined : { left: -300, right: 300, top: -300, bottom: 300 }}
      dragTransition={disableDrag ? undefined : { power: 0.005, timeConstant: 50 }}
      onDragStart={() => {
        if (disableDrag) return;
        setTopIndex(p.id);
        setIsDragging(true);
        scale.set(1.14);
        rotateX.set(0);
        rotateY.set(0);
      }}
      onDragEnd={() => {
        if (disableDrag) return;
        setIsDragging(false);
        scale.set(1.08);
      }}
      onTap={() => {
        if (!isDragging) onSelect?.();
      }}
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      onMouseEnter={shouldReduceMotion ? undefined : handleMouseEnter}
      onMouseLeave={shouldReduceMotion ? undefined : handleMouseLeave}
      variants={entryVariants}
      initial={entryVariants ? "hidden" : false}
      whileInView={entryVariants ? "visible" : undefined}
      viewport={{ once: true, margin: '-50px' }}
      className={`${className} cursor-pointer select-none [perspective:800px] will-change-transform`}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        scale: shouldReduceMotion ? 1 : scale,
      }}
    >
      <div
        className={`bg-[#3F3F3F] p-2.5 transition-shadow duration-300 ${
          isDragging ? 'shadow-[0_30px_60px_rgba(0,0,0,0.15)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
        } [transform-style:preserve-3d] relative will-change-transform`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[5%] [transform:translateZ(40px)]">
          <PushPin active={isMobile || isHovered || isDragging} />
        </div>

        <div
          className="relative w-full aspect-[4/3] overflow-hidden bg-[#3F3F3F]"
          onMouseEnter={() => {
            if (!isDragging && !shouldReduceMotion) imgScale.set(1.08);
          }}
          onMouseLeave={() => {
            if (!isDragging && !shouldReduceMotion) imgScale.set(1);
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: shouldReduceMotion ? 1 : imgScale }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 50vw, 280px"
              draggable={false}
              className="object-cover select-none"
            />
          </motion.div>
        </div>

        <p className="mt-2 text-center text-xs tracking-wide text-[#DBDBDB]/60 font-mono pointer-events-none">
          {p.caption}
        </p>
      </div>
    </motion.div>
  );
}

export function InteractivePolaroids({
  polaroids,
  className = '',
  minHeightClassName = 'min-h-[700px] lg:min-h-[900px]',
}: {
  polaroids: InteractivePolaroid[];
  className?: string;
  minHeightClassName?: string;
}) {
  const [topIndex, setTopIndex] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedPolaroid = polaroids.find((p) => p.id === selectedId);

  return (
    <>
      {/* Mobile grid */}
      <div className={`grid grid-cols-2 gap-4 md:hidden ${className}`}>
        {polaroids.map((p) => (
          <PolaroidCard
            key={p.id}
            p={p}
            className="w-full"
            disableDrag
            onSelect={() => setSelectedId(p.id)}
            setTopIndex={() => undefined}
          />
        ))}
      </div>

      {/* Desktop scattered layout */}
      <div className={`relative hidden md:block ${minHeightClassName} ${className}`}>
        {polaroids.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: p.left,
              top: p.top,
              right: p.right,
              bottom: p.bottom,
              zIndex: topIndex === p.id ? 100 : 10 + p.id,
            }}
            data-gsap="parallax"
            data-speed={p.speed}
          >
            <PolaroidCard
              p={p}
              className="w-[240px] md:w-[280px]"
              onSelect={() => setSelectedId(p.id)}
              setTopIndex={setTopIndex}
            />
          </div>
        ))}

        <AnimatePresence>
          {selectedId !== null && selectedPolaroid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                pointerEvents: 'none',
                transition: { duration: 0.2 },
              }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out p-6"
            >
              <motion.div
                initial={{ scale: 0.8, y: 20, rotate: selectedPolaroid.rotate }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.8, y: 20, rotate: selectedPolaroid.rotate }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-[#3F3F3F] p-4 md:p-8 shadow-2xl w-full max-w-[700px] flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#3F3F3F]">
                  <Image
                    src={selectedPolaroid.src}
                    alt={selectedPolaroid.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 700px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-base md:text-lg tracking-widest text-[#DBDBDB]/70 font-mono">
                  {selectedPolaroid.caption}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
