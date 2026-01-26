'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';

interface NewsletterProps {
  variant?: 'light' | 'dark';
}

export function Newsletter({ variant = 'light' }: NewsletterProps) {
  const isLight = variant === 'light';
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const inputStyles = `h-12 w-full sm:w-[240px] px-4 text-sm border transition-all duration-300 focus:outline-none ${
    isLight 
      ? 'border-[#041540]/20 bg-white text-[#041540] placeholder:text-[#041540]/40 focus:border-[#041540]' 
      : 'border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-white'
  }`;

  const underlineStyles = `absolute bottom-0 left-0 h-[2px] ${isLight ? 'bg-[#0115DF]' : 'bg-white'}`;

  return (
    <form className="flex flex-col sm:flex-row gap-3">
      <motion.div
        className="relative"
        animate={{ scale: focusedField === 'name' ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="text"
          placeholder="First Name"
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className={inputStyles}
        />
        <motion.div
          className={underlineStyles}
          initial={{ width: 0 }}
          animate={{ width: focusedField === 'name' ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <motion.div
        className="relative"
        animate={{ scale: focusedField === 'email' ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="email"
          placeholder="Email Address"
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className={inputStyles}
        />
        <motion.div
          className={underlineStyles}
          initial={{ width: 0 }}
          animate={{ width: focusedField === 'email' ? '100%' : 0 }}
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
