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
      className={`bg-white p-3 pb-3 shadow-lg cursor-grab ${className}`}
      initial={{ rotate: rotation }}
      whileHover={{ scale: 1.05, zIndex: 50, rotate: rotation }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <p className="mt-2 text-center text-base tracking-wide text-gray-1000 font-gotham">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
