'use client';

import { motion } from 'framer-motion';

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  className?: string;
}

export function Polaroid({
  src,
  alt,
  caption,
  rotation = 0,
  className = '',
}: PolaroidProps) {
  return (
    <motion.div
      className={`bg-white p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${className}`}
      initial={{ rotate: rotation }}
      whileHover={{ scale: 1.02, zIndex: 50, rotate: rotation * 0.5 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="w-full aspect-[4/3] overflow-hidden bg-[#F7F3EE]">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
      </div>
      {caption && (
        <p className="mt-2 text-center text-xs tracking-wide text-[#041540]/50 font-mono">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
