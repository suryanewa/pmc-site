"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "motion/react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { TextAnimate } from '@/components/ui/text-animate';

const ANIMATION_DURATION = 15;
const STAGGER_DELAY = 0.1;
const HOVER_SCALE = 1.2;
const HOVER_ROTATE = 5;
const SPRING_STIFFNESS = 300;

type LogoCloudAnimatedProps = {
  title?: string;
  description?: string;
  logos?: Array<{
    name: string;
    src: string;
    url?: string;
    className?: string;
  }>;
};

const defaultLogos = [
  { name: "Lux Capital", src: "/companies/lux.svg", url: "https://luxcapital.com" },
  { name: "a16z", src: "/companies/a16z.jpg", url: "https://a16z.com" },
  {
    name: "Figma",
    src: "/companies/figma.svg",
    url: "https://figma.com",
    className: "h-[72px] max-w-[220px]",
  },
  { name: "Venmo", src: "/companies/venmo.png", url: "https://venmo.com" },
  { name: "Anthropic", src: "/companies/anthropic.svg", url: "https://anthropic.com" },
  { name: "USV", src: "/companies/usv.svg", url: "https://usv.com" },
  { name: "Bessemer", src: "/companies/bessemer.png", url: "https://bvp.com" },
  { name: "Meta", src: "/companies/meta.png", url: "https://meta.com" },
  { name: "CLEAR", src: "/companies/clear.png", url: "https://clearme.com" },
  { name: "Clay", src: "/companies/clay.png", url: "https://clay.com" },
  { name: "Mine", src: "/companies/mine.svg", url: "https://usemine.com" },
];

export function LogoCloudAnimated({
  title = "Trusted by the world's most innovative teams",
  description = "Join thousands of developers and designers who are already building with Smoothui",
  logos = defaultLogos,
}: LogoCloudAnimatedProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (!trackRef.current) return;
      setTrackWidth(trackRef.current.scrollWidth / 2);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth, { passive: true });

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const baseSpeed = useMemo(() => {
    if (!trackWidth) return 0;
    return trackWidth / ANIMATION_DURATION;
  }, [trackWidth]);

  const speed = useSpring(baseSpeed, { stiffness: 120, damping: 20 });

  useEffect(() => {
    speed.set(baseSpeed);
  }, [baseSpeed, speed]);

  useAnimationFrame((_, delta) => {
    if (!trackWidth) return;
    const moveBy = (speed.get() * delta) / 1000;
    const next = x.get() - moveBy;
    x.set(next <= -trackWidth ? 0 : next);
  });

  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 font-bold text-2xl text-current lg:text-3xl">
            {title === "Our Network" ? (
              <>
                <span className="text-[#41C9C1]">/</span>
                <TextAnimate
                  as="span"
                  animation="slideLeft"
                  by="character"
                  className="inline-block"
                >
                  network
                </TextAnimate>
              </>
            ) : (
              <TextAnimate as="span" animation="slideLeft" by="character">
                {title}
              </TextAnimate>
            )}
          </div>
          {description && <p className="text-foreground/70 text-lg">{description}</p>}
        </motion.div>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0))",
            WebkitMaskImage:
              "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0))",
          }}
        >
          <motion.div
            className="flex w-max shrink-0 items-center"
            onHoverEnd={() => speed.set(baseSpeed)}
            onHoverStart={() => speed.set(0)}
            ref={trackRef}
            style={{ x }}
          >
            <div className="flex shrink-0 items-center gap-12 pr-12">
              {logos.map((logo, index) => (
                <motion.a
                  animate={{ opacity: 1, scale: 1 }}
                  className="group flex shrink-0 flex-col items-center justify-center p-4 transition-all hover:scale-105"
                  href={logo.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  key={`first-${logo.name}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  transition={{
                    duration: 0.4,
                    delay: index * STAGGER_DELAY,
                  }}
                >
                  <motion.div
                    className="mb-2 flex items-center justify-center"
                    transition={{ type: "spring", stiffness: SPRING_STIFFNESS }}
                    whileHover={{ scale: HOVER_SCALE, rotate: HOVER_ROTATE }}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={40}
                      className={`h-10 w-auto object-contain max-w-[120px] ${logo.className ?? ""}`}
                      unoptimized
                    />
                  </motion.div>
                </motion.a>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-12 pr-12">
              {logos.map((logo, index) => (
                <motion.a
                  animate={{ opacity: 1, scale: 1 }}
                  className="group flex shrink-0 flex-col items-center justify-center p-4 transition-all hover:scale-105"
                  href={logo.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  key={`second-${logo.name}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  transition={{
                    duration: 0.4,
                    delay: index * STAGGER_DELAY,
                  }}
                >
                  <motion.div
                    className="mb-2 flex items-center justify-center"
                    transition={{ type: "spring", stiffness: SPRING_STIFFNESS }}
                    whileHover={{ scale: HOVER_SCALE, rotate: HOVER_ROTATE }}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={40}
                      className={`h-10 w-auto object-contain max-w-[120px] ${logo.className ?? ""}`}
                      unoptimized
                    />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LogoCloudAnimated;
