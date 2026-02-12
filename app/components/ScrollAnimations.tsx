'use client';

import { motion, HTMLMotionProps, useReducedMotion } from 'motion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useIsMobile } from '../../hooks/use-is-mobile';

interface AnimationProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function useShouldReduceMotion() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  return isMobile || reducedMotion;
}

// Fade in from below
export function FadeUp({ children, className = '', delay = 0, ...props }: AnimationProps) {
  const shouldReduceMotion = useShouldReduceMotion();
  if (shouldReduceMotion) {
    const divProps = props as HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Fade in from left
export function FadeLeft({ children, className = '', delay = 0, ...props }: AnimationProps) {
  const shouldReduceMotion = useShouldReduceMotion();
  if (shouldReduceMotion) {
    const divProps = props as HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Fade in from right
export function FadeRight({ children, className = '', delay = 0, ...props }: AnimationProps) {
  const shouldReduceMotion = useShouldReduceMotion();
  if (shouldReduceMotion) {
    const divProps = props as HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Simple fade in
export function FadeIn({ children, className = '', delay = 0, ...props }: AnimationProps) {
  const shouldReduceMotion = useShouldReduceMotion();
  if (shouldReduceMotion) {
    const divProps = props as HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px', amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Scale up fade in
export function ScaleUp({ children, className = '', delay = 0, ...props }: AnimationProps) {
  const shouldReduceMotion = useShouldReduceMotion();
  if (shouldReduceMotion) {
    const divProps = props as HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px', amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation container
interface StaggerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1, ...props }: StaggerProps) {
  const shouldReduceMotion = useShouldReduceMotion();
  if (shouldReduceMotion) {
    const divProps = props as HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Child item for stagger container
export function StaggerItem({ children, className = '', ...props }: Omit<AnimationProps, 'delay'>) {
  const shouldReduceMotion = useShouldReduceMotion();
  if (shouldReduceMotion) {
    const divProps = props as HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
