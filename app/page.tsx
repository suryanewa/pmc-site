'use client';

import { motion, useInView, animate, useMotionValue, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from './components/Button';
import { Newsletter } from './components/Newsletter';
import { FadeUp, FadeIn } from './components/ScrollAnimations';
import { Polaroid } from './components/Polaroid';
import { HeroWarpCanvas } from './components/HeroWarpCanvas';
import Link from "next/link";
import { LogoCloudAnimated } from "@/components/smoothui/logo-cloud-1";
import TiltedCard from "@/components/TiltedCard";
import TextType from '@/components/TextType';
import ConfettiCanvas, { ConfettiCanvasHandle } from '@/components/ConfettiCanvas';

const HeroScene = dynamic(
  () => import('./components/HeroScene').then((mod) => ({ default: mod.HeroScene })),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

const RocketScene = dynamic(
  () => import('@/components/RocketScene'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

const Lanyard = dynamic(
  () => import('./components/Lanyard'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

const PlantsScene = dynamic(
  () => import('@/components/PlantsScene'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

const CandleScene = dynamic(
  () => import('@/components/CandleScene'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" />,
  }
);

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="size-9 flex items-center justify-center text-[#041540]/60 hover:text-[#041540] transition-colors duration-300"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

// Programs data
const programs = [
  {
    id: 'startup',
    title: '/startup',
    description: 'A 9-week, build-from-zero accelerator. You\'ll interview users to validate a real market gap, design and ship a product, and ultimately take it to market.',
    color: '#AD1DE0',
    href: '/programs/startup',
  },
  {
    id: 'investing',
    title: '/investing',
    description: 'An intensive 9-week program focused on how real investors evaluate startups. Break down deals, analyze companies, and build investment theses.',
    color: '#2DB67D',
    href: '/programs/investing',
  },
  {
    id: 'eir',
    title: '/eir',
    description: 'A selective program for NYU founders who are actively building. Get 1-on-1 mentorship and direct access to venture capitalists.',
    color: '#F0C75B',
    href: '/programs/eir',
  },
];

// Animated counter component
function AnimatedStat({ 
  number, 
  label, 
  active, 
  onComplete 
}: { 
  number: string; 
  label: string; 
  active: boolean; 
  onComplete: () => void 
}) {
  const [showLabel, setShowLabel] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));
  
  const numericValue = parseInt(number.replace(/\D/g, ''));
  const suffix = number.replace(/\d/g, '');

  useEffect(() => {
    if (active) {
      animate(count, numericValue, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => {
          setShowLabel(true);
        }
      });
    }
  }, [active, numericValue, count]);

  return (
    <div className="flex flex-col">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl md:text-5xl font-medium text-[#041540] tracking-tight"
        whileHover={{ scale: 1.05 }}
      >
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <div className="min-h-[1.5rem]">
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={onComplete}
              className="text-sm text-[#041540]/50 mt-1"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatsGrid() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const confettiRef = useRef<ConfettiCanvasHandle>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5, margin: "-100px" });

  useEffect(() => {
    if (isInView && activeIndex === -1) {
      setActiveIndex(0);
    }
  }, [isInView, activeIndex]);

  const handleFinalComplete = () => {
    if (containerRef.current && confettiRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      confettiRef.current.burst(x, y);
    }
  };

  return (
    <>
      <ConfettiCanvas ref={confettiRef} />
      <div ref={containerRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-[#041540]/10">
        <AnimatedStat 
          number="20+" 
          label="Years Active" 
          active={activeIndex >= 0} 
          onComplete={() => setActiveIndex(prev => prev === 0 ? 1 : prev)} 
        />
        <AnimatedStat 
          number="100+" 
          label="Alumni Network" 
          active={activeIndex >= 1} 
          onComplete={() => setActiveIndex(prev => prev === 1 ? 2 : prev)} 
        />
        <AnimatedStat 
          number="250+" 
          label="Speaker Events" 
          active={activeIndex >= 2} 
          onComplete={handleFinalComplete} 
        />
      </div>
    </>
  );
}

function PushPin({ color = "#0115DF", active = false, size = 14 }: { color?: string; active?: boolean; size?: number }) {
  const displayColor = active ? color : "#A0A0A0";
  
  return (
    <div 
      className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      style={{ top: size === 14 ? "2px" : "0px" }}
    >
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
        <defs>
          <radialGradient id={`pinGradient-${size}`} cx="40%" cy="40%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id={`topSurface-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} />
          </radialGradient>
        </defs>
        
        <motion.circle 
          cx="14" cy="16" r="7" 
          animate={{ fill: displayColor }}
          fillOpacity="0.8" 
          transition={{ duration: 0.3 }}
        />
        <circle cx="14" cy="16" r="7" fill={`url(#pinGradient-${size})`} />
        
        <motion.circle 
          cx="14" cy="12" r="10" 
          animate={{ fill: displayColor }}
          transition={{ duration: 0.3 }}
        />
        <circle cx="14" cy="12" r="10" fill={`url(#pinGradient-${size})`} />
        
        <circle cx="11" cy="9" r="2.5" fill="white" fillOpacity="0.35" />
      </svg>
    </div>
  );
}

function SpeakerPolaroidItem({ 
  p, 
  topIndex, 
  setTopIndex,
  onSelect 
}: { 
  p: any; 
  topIndex: number | null; 
  setTopIndex: (id: number) => void;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const rotateY = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const scale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });
  const imgScale = useSpring(1, { damping: 30, stiffness: 100, mass: 2 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      scale.set(1.1);
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

  const entryVariants = {
    hidden: { 
      x: p.left ? "120%" : p.right ? "-120%" : 0, 
      y: p.top ? "120%" : p.bottom ? "-120%" : 0,
      rotate: 0,
      opacity: 0,
      scale: 0.5
    },
    visible: { 
      x: 0, 
      y: 0, 
      rotate: p.rotate,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 80,
        delay: p.delay + 0.5,
        duration: 1.2
      }
    }
  };

  return (
    <div
      data-gsap="parallax"
      data-speed={p.speed}
      className="absolute"
      style={{
        left: p.left,
        top: p.top,
        right: p.right,
        bottom: p.bottom,
        zIndex: topIndex === p.id ? 100 : 10 + p.id,
      }}
    >
      <motion.div
        ref={ref}
        drag
        dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
        dragTransition={{ power: 0.005, timeConstant: 50 }}
        onDragStart={() => {
          setTopIndex(p.id);
          setIsDragging(true);
          scale.set(1.2);
          rotateX.set(0);
          rotateY.set(0);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          scale.set(1.1);
        }}
        onTap={() => {
          if (!isDragging) onSelect();
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variants={entryVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-[240px] md:w-[280px] cursor-pointer select-none [perspective:800px] will-change-transform"
        style={{
          rotateX,
          rotateY,
          scale
        }}
      >
        <div className={`bg-white p-2.5 transition-shadow duration-300 ${
          isDragging 
            ? "shadow-[0_30px_60px_rgba(0,0,0,0.15)]" 
            : "shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        } [transform-style:preserve-3d] relative will-change-transform`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 [transform:translateZ(40px)]">
            <PushPin active={isHovered || isDragging} />
          </div>
          <div 
            className="w-full aspect-[4/3] overflow-hidden bg-[#F7F3EE]"
            onMouseEnter={() => !isDragging && imgScale.set(1.08)}
            onMouseLeave={() => !isDragging && imgScale.set(1)}
          >
            <motion.img
              src={p.src}
              alt={p.alt}
              draggable={false}
              className="w-full h-full object-cover select-none"
              style={{ scale: imgScale }}
            />
          </div>
          <p className="mt-2 text-center text-xs tracking-wide text-[#041540]/50 font-mono pointer-events-none">
            {p.caption}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function SpeakerPolaroids() {
  const [topIndex, setTopIndex] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const polaroids = [
    { id: 0, src: "/lux.jpeg", alt: "Lux Capital", caption: "eeg/lux-capital", left: "0%", top: "0%", rotate: -3, speed: "0.08", delay: 0.2 },
    { id: 1, src: "/zfellows.jpeg", alt: "Zfellows", caption: "eeg/zfellows", right: "5%", top: "8%", rotate: 2, speed: "0.14", delay: 0.35 },
    { id: 2, src: "/beli.png", alt: "Beli", caption: "eeg/beli", left: "15%", top: "40%", rotate: 4, speed: "0.1", delay: 0.5 },
    { id: 3, src: "/varun-rana.png", alt: "Varun Rana", caption: "eeg/varun-rana", right: "0%", bottom: "5%", rotate: -2, speed: "0.06", delay: 0.65 },
  ];

  const selectedPolaroid = polaroids.find(p => p.id === selectedId);

  return (
    <div className="relative min-h-[500px] lg:min-h-[600px]">
      {polaroids.map((p) => (
        <SpeakerPolaroidItem 
          key={p.id} 
          p={p} 
          topIndex={topIndex} 
          setTopIndex={setTopIndex} 
          onSelect={() => setSelectedId(p.id)}
        />
      ))}

      <AnimatePresence>
        {selectedId !== null && selectedPolaroid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              pointerEvents: 'none',
              transition: { duration: 0.2 } 
            }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#041540]/90 backdrop-blur-sm cursor-zoom-out p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, rotate: selectedPolaroid.rotate }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 20, rotate: selectedPolaroid.rotate }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white p-4 md:p-8 shadow-2xl w-full max-w-[700px] flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-[#F7F3EE]">
                <img
                  src={selectedPolaroid.src}
                  alt={selectedPolaroid.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-center text-base md:text-lg tracking-widest text-[#041540]/70 font-mono">
                {selectedPolaroid.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const programsTopRef = useRef<HTMLDivElement | null>(null);
  const eventsTopRef = useRef<HTMLDivElement | null>(null);
  const [isProgramsDark, setIsProgramsDark] = useState(false);
  const isProgramsDarkRef = useRef(false);
  const themeTransition = "transition-colors duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  useEffect(() => {
    isProgramsDarkRef.current = isProgramsDark;
  }, [isProgramsDark]);

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("[data-navbar]");
    let ticking = false;
    let lastValue = isProgramsDarkRef.current;

    const update = () => {
      ticking = false;
      const programsTop = programsTopRef.current;
      const eventsTop = eventsTopRef.current;
      if (navbar && programsTop && eventsTop) {
        const navBottom = navbar.getBoundingClientRect().bottom;
        const programsTopPos = programsTop.getBoundingClientRect().top;
        const eventsTopPos = eventsTop.getBoundingClientRect().top;
        const nextValue = programsTopPos <= navBottom && eventsTopPos > navBottom;

        if (nextValue !== lastValue) {
          lastValue = nextValue;
          isProgramsDarkRef.current = nextValue;
          setIsProgramsDark(nextValue);
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    const resizeObserver = navbar ? new ResizeObserver(onScroll) : null;
    resizeObserver?.observe(navbar as Element);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--scroll-background",
      isProgramsDark ? "#041540" : "#F7F3EE"
    );

    return () => {
      root.style.setProperty("--scroll-background", "#F7F3EE");
    };
  }, [isProgramsDark]);

  return (
    <div className="min-h-screen relative">
      <main>
        {/* Hero Section - Clean text-based */}
        <section className="min-h-screen flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 bg-[#F7F3EE] py-24 relative overflow-hidden">
          <HeroWarpCanvas />
          <div className="w-full max-w-[1400px] mx-auto relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
            <div className="max-w-[1000px] text-left">
            {/* Subtitle */}
            <motion.p
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center border border-[#041540]/40 bg-[#F7F3EE] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#041540]/70 opacity-70 hover:opacity-100 hover:bg-[#041540] hover:text-white transition-all duration-300">
                  NYU&apos;s Premier Entrepreneurship Club
                </span>
                <span className="inline-flex items-center border border-[#041540]/40 bg-[#F7F3EE] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#041540]/70 opacity-70 hover:opacity-100 hover:bg-[#041540] hover:text-white transition-all duration-300">
                  Est. 2003
                </span>
              </span>
            </motion.p>

            {/* Main Headline */}
            <motion.div
              className="text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#041540] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <TextType
                text={['The Home of NYU\nFounders & Investors']}
                typingSpeed={50}
                initialDelay={500}
                loop={false}
                showCursor={true}
                hideCursorOnComplete={true}
                cursorCharacter="|"
                className="block"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-[#041540]/60 leading-relaxed max-w-2xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Guiding the next generation of founders and investors through hands-on programs to build startups, develop venture fundamentals, and accelerate proven teams with direct access to industry leaders.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="#programs"
                  className="px-8 py-4"
                >
                  Explore Our Programs
                </Button>
                <Button
                  href="#"
                  borderColor="#041540"
                  textColor="#041540"
                  className="px-8 py-4"
                >
                  Coffee Chat Leadership
                </Button>
              </div>
            </motion.div>

            </div>
            <div
              className="relative w-full h-[360px] md:h-[460px] lg:h-[600px]"
              data-gsap="parallax"
              data-speed="0.12"
            >
              <Suspense fallback={<div className="w-full h-full" />}>
                <HeroScene />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F3EE] text-[#041540]">
          <LogoCloudAnimated title="Our Network" description="" />
        </section>

        {/* Programs Section */}
        <section
          className={`relative py-32 px-6 md:px-16 lg:px-24 ${themeTransition} ${
            isProgramsDark ? "text-[#F7F3EE]" : "text-[#041540]"
          }`}
        >
          <div
            ref={programsTopRef}
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="grid lg:grid-cols-2 gap-8 mb-20">
              <FadeUp>
                <div
                  className={`text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] ${themeTransition} ${
                    isProgramsDark ? "text-[#F7F3EE]" : "text-[#041540]"
                  }`}
                >
                  <span className="text-[#0115DF]">/</span>
                  <TextType
                    text="programs"
                    typingSpeed={50}
                    initialDelay={100}
                    loop={false}
                    showCursor={true}
                    hideCursorOnComplete={true}
                    cursorCharacter="|"
                    className="inline-block"
                    startOnVisible={true}
                  />
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p
                  className={`text-lg leading-relaxed lg:pt-4 ${themeTransition} ${
                    isProgramsDark ? "text-[#F7F3EE]/70" : "text-[#041540]/60"
                  }`}
                >
                  Whether you&apos;re interested in startups, investing, or are already building, our semester-long programs bring students into NYU&apos;s startup, tech, and venture capital ecosystem.
                </p>
              </FadeUp>
            </div>

            {/* Programs Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <FadeUp key={program.id} delay={0.1 * index}>
                  <Link href={program.href} className="block">
                    <TiltedCard
                      altText={`EEG ${program.title} program`}
                      captionText={program.title}
                      containerHeight="540px"
                      containerWidth="100%"
                      imageHeight="540px"
                      imageWidth="100%"
                      rotateAmplitude={10}
                      scaleOnHover={1.04}
                      showMobileWarning={false}
                      showTooltip={false}
                      borderRadius={0}
                      backgroundColor={`${program.color}20`}
                      backgroundContent={
                        program.id === 'eir' 
                          ? (isHovered: boolean) => <RocketScene isHovered={isHovered} /> 
                          : program.id === 'startup'
                            ? (isHovered: boolean) => <PlantsScene isHovered={isHovered} />
                            : program.id === 'investing'
                              ? (isHovered: boolean) => <CandleScene isHovered={isHovered} />
                              : undefined
                      }
                      pixelEffect={{
                        colors: isProgramsDark
                          ? `${program.color},rgba(247,243,238,0.85),rgba(4,21,64,0.55)`
                          : `${program.color},rgba(4,21,64,0.6),rgba(247,243,238,0.7)`,
                        gap: 6,
                        speed: 30,
                        className: isProgramsDark
                          ? "opacity-40 mix-blend-screen"
                          : "opacity-35 mix-blend-multiply",
                      }}
                      displayOverlayContent
                      overlayContent={
                        <div
                          className={`flex flex-col justify-start items-center text-center h-full w-full p-6 ${themeTransition} ${
                            isProgramsDark
                              ? "text-[#F7F3EE]"
                              : "text-[#041540]"
                          }`}
                          style={{ paddingTop: '12%' }}
                        >
                          <h3
                            className="text-2xl font-medium tracking-[-0.02em]"
                            style={{ fontFamily: 'var(--font-gotham-medium)' }}
                          >
                            <span
                              className={`${themeTransition} ${
                                isProgramsDark ? "text-white" : "text-[#041540]"
                              }`}
                            >
                              eeg
                            </span>
                            <span style={{ color: program.color }}>{program.title}</span>
                          </h3>
                          <p
                            className={`mt-3 text-sm leading-relaxed ${themeTransition} ${
                              isProgramsDark ? "text-[#F7F3EE]/70" : "text-[#041540]/60"
                            }`}
                          >
                            {program.description}
                          </p>
                          <Button
                            className="mt-5 !px-4 !py-2 text-xs uppercase tracking-[0.2em] !h-auto"
                            borderColor={program.color}
                            rippleColor={program.color}
                            fillColor="transparent"
                            textColor={isProgramsDark ? "white" : "#041540"}
                          >
                            Explore Program
                            <span aria-hidden="true" className="ml-2">↗</span>
                          </Button>
                        </div>
                      }
                    />
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-32 px-6 md:px-16 lg:px-24 bg-white relative z-10">
          <div
            ref={eventsTopRef}
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left - Content */}
              <div>
                <FadeUp>
                  <div className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#041540] mb-8">
                    <span className="text-[#0115DF]">/</span>
                    <TextType
                      text="events"
                      typingSpeed={50}
                      initialDelay={100}
                      loop={false}
                      showCursor={true}
                      hideCursorOnComplete={true}
                      cursorCharacter="|"
                      className="inline-block"
                      startOnVisible={true}
                    />
                  </div>
                  <div className="mb-4 font-bold text-2xl text-[#041540] lg:text-3xl text-center md:text-left">
                    <span className="text-[#0115DF]">/</span>
                    <TextType
                      text="speakers"
                      typingSpeed={50}
                      initialDelay={300}
                      loop={false}
                      showCursor={true}
                      hideCursorOnComplete={true}
                      cursorCharacter="|"
                      className="inline-block"
                      startOnVisible={true}
                    />
                  </div>
                </FadeUp>

                
                <FadeUp delay={0.1}>
                  <div className="space-y-6 mb-12">
                    <p className="text-lg text-[#041540]/70 leading-relaxed">
                      We host our weekly speaker series on <span className="text-[#041540] font-medium">Thursdays @ 12:30 pm</span>. All members of the NYU community are welcome.
                    </p>
                    <p className="text-lg text-[#041540]/70 leading-relaxed">
                      So far, we&apos;ve hosted over <span className="text-[#041540] font-medium">250 conversations</span> with founders, operators and investors—the best in their fields.
                    </p>
                  </div>
                </FadeUp>

                {/* Stats */}
                <StatsGrid />
              </div>

              <SpeakerPolaroids />
            </div>
          </div>
        </section>

        {/* CTA Section - Minimal Dark */}
        <section className="py-32 px-6 md:px-16 lg:px-24 bg-[#041540] relative z-10 overflow-hidden">
          {/* Subtle animated gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, #0115DF20 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, #0115DF20 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, #0115DF20 0%, transparent 50%)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-3xl">
                <FadeUp>
                  <div className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-8">
                    <span className="text-[#0115DF]">/</span>
                    <TextType
                      text="join-us"
                      typingSpeed={50}
                      initialDelay={100}
                      loop={false}
                      showCursor={true}
                      hideCursorOnComplete={true}
                      cursorCharacter="|"
                      className="inline-block"
                      startOnVisible={true}
                    />
                  </div>
                </FadeUp>
                
                <FadeUp delay={0.1}>
                  <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-xl">
                    Get access to exclusive events, mentorship, and a network of ambitious students and industry leaders.
                  </p>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <Newsletter variant="dark" />
                </FadeUp>
              </div>

              <div className="hidden lg:block h-[600px] relative">
                <Suspense fallback={null}>
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
