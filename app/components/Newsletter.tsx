'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';

interface NewsletterProps {
  variant?: 'light' | 'dark';
}

export function Newsletter({ variant = 'light' }: NewsletterProps) {
  const isLight = variant === 'light';
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <form className="flex flex-col sm:flex-row gap-3">
      <motion.div
        className="relative"
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`h-12 w-full sm:w-[280px] px-4 text-sm border transition-all duration-300 focus:outline-none ${
            isLight 
              ? 'border-[#041540]/20 bg-white text-[#041540] placeholder:text-[#041540]/40 focus:border-[#041540]' 
              : 'border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-white'
          }`}
        />
        {/* Focus underline animation */}
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] ${isLight ? 'bg-[#0115DF]' : 'bg-white'}`}
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      
      <Button
        type="submit"
        className={`h-12 text-sm !px-8 ${!isLight ? '!bg-white !text-[#041540]' : ''}`}
      >
        Subscribe
      </Button>
    </form>
  );
}
