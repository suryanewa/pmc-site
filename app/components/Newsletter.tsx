'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import { initializeUnicornStudio } from '@/lib/unicorn-loader';

interface NewsletterProps {
  variant?: 'light' | 'dark';
  source?: string;
  accentColor?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const DEFAULT_ACCENT = '#41C9C1';
const UNICORN_PROJECT_ID = 'Tad6hhK5mrDEPGmXIum8';

export function Newsletter({ source = 'website', accentColor }: NewsletterProps) {
  const accent = accentColor ?? DEFAULT_ACCENT;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sceneScale, setSceneScale] = useState(1);
  const hasInitializedSceneRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasInitializedSceneRef.current) return;
        hasInitializedSceneRef.current = true;
        void initializeUnicornStudio();
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: '200px' },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let rafId: number | null = null;
    let lastScale = -1;

    const updateScale = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (!width || !height) return;
      const scaleX = width / 1440;
      const scaleY = height / 900;
      const scale = Math.max(scaleX, scaleY);
      if (scale === lastScale) return;
      lastScale = scale;
      setSceneScale(scale);
    };

    const scheduleScaleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateScale();
      });
    };

    updateScale();
    const observer = new ResizeObserver(scheduleScaleUpdate);
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (!response.ok) throw new Error();

      setStatus('success');
      setEmail('');
      toast.success('Welcome to the community!');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      toast.error('Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-48 px-8">
      <div
        className="absolute -inset-x-96 -inset-y-32 z-0 overflow-hidden rounded-[2rem]"
        ref={wrapperRef}
      >
        <div
          data-us-project={UNICORN_PROJECT_ID}
          data-us-production="true"
          className="unicorn-newsletter-scene"
          style={{
            width: 1440,
            height: 900,
            transform: `translate(-50%, -50%) scale(${sceneScale})`,
            transformOrigin: 'center',
            position: 'absolute',
            left: '50%',
            top: '50%',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Subscribe to our newsletter
        </motion.h2>

        <motion.p
          className="text-[#DBDBDB]/60 text-base md:text-lg mb-12 max-w-lg font-light"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Stay updated with the latest news, events, and resources.
        </motion.p>

        <form onSubmit={handleSubmit} className="relative w-full max-w-xl group/form">
          <div className="conic-gradient-button relative rounded-2xl p-[1.5px] overflow-hidden">
            <div
              className={`
              relative flex items-center rounded-2xl bg-black/80 backdrop-blur-md overflow-hidden
              ${isFocused ? 'shadow-[0_0_30px_rgba(65,201,193,0.2)]' : ''}
            `}
            >
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={status === 'loading'}
              className="flex-1 bg-transparent px-6 py-3.5 text-white placeholder:text-white/30 group-hover/form:placeholder:text-white/60 outline-none w-full text-base transition-colors duration-300"
            />

            <div className={`h-8 w-px bg-white/10 transition-opacity duration-300 group-hover/form:opacity-0 ${isFocused ? 'opacity-0' : ''}`} />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="relative flex items-center gap-2.5 px-7 py-3.5 bg-transparent group/btn transition-all"
            >
              <div className="absolute inset-0 bg-[#41C9C1]/0 group-hover/form:bg-[#41C9C1]/5 transition-colors duration-300" />

              <span className="relative z-10 text-white/40 font-medium group-hover/form:text-white transition-colors duration-300 text-base">
                {status === 'loading' ? '...' : 'Subscribe'}
              </span>
              <ArrowRight
                className={`relative z-10 size-4 text-white/40 group-hover/form:text-white transition-all duration-300 ${status === 'loading' ? 'opacity-0' : 'group-hover/form:translate-x-1'}`}
              />
            </button>
            </div>
          </div>
        </form>

        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-16 text-[#41C9C1] text-sm"
            >
              Successfully subscribed!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
