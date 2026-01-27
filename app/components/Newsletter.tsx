'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';

interface NewsletterProps {
  variant?: 'light' | 'dark';
  source?: string; // Track where the signup came from (e.g., 'footer', 'hero', 'program-page')
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function Newsletter({ variant = 'light', source = 'website' }: NewsletterProps) {
  const isLight = variant === 'light';
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to subscribe');
        return;
      }

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Show success message
  if (status === 'success') {
    return (
      <div className={`text-sm ${isLight ? 'text-[#041540]' : 'text-white'}`}>
        Thanks for subscribing! We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.div
          className="relative"
          animate={{ scale: isFocused ? 1.01 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={status === 'loading'}
            className={`h-12 w-full sm:w-[280px] px-4 text-sm border transition-all duration-300 focus:outline-none disabled:opacity-50 ${
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

        <motion.button
          type="submit"
          disabled={status === 'loading'}
          className={`h-12 px-8 text-sm font-medium transition-all duration-300 relative overflow-hidden disabled:opacity-50 ${
            isLight
              ? 'bg-[#041540] text-white'
              : 'bg-white text-[#041540]'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
        >
          {/* Hover background animation */}
          <motion.div
            className={`absolute inset-0 ${isLight ? 'bg-[#0115DF]' : 'bg-white/90'}`}
            initial={{ x: '-100%' }}
            animate={{ x: isHovered && status !== 'loading' ? 0 : '-100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="relative z-10">
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </span>
        </motion.button>
      </div>

      {/* Error message */}
      {status === 'error' && errorMessage && (
        <p className={`text-sm ${isLight ? 'text-red-600' : 'text-red-400'}`}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
