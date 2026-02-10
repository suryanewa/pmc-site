'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

interface NewsletterProps {
  variant?: 'light' | 'dark';
  source?: string;
  accentColor?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const DEFAULT_ACCENT = '#41C9C1';
const UNICORN_SDK_SRC =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js';
const UNICORN_PROJECT_ID = 'Tad6hhK5mrDEPGmXIum8';

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      isInitialized?: boolean;
    };
  }
}

export function Newsletter({ source = 'website', accentColor }: NewsletterProps) {
  const accent = accentColor ?? DEFAULT_ACCENT;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sceneScale, setSceneScale] = useState(1);

  useEffect(() => {
    let scriptEl: HTMLScriptElement | null = document.querySelector(
      `script[src="${UNICORN_SDK_SRC}"]`,
    );

    const initScene = () => {
      if (!window.UnicornStudio?.init) return;
      window.UnicornStudio.init();
    };

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.src = UNICORN_SDK_SRC;
      scriptEl.async = true;
      scriptEl.onload = initScene;
      document.head.appendChild(scriptEl);
    } else if (window.UnicornStudio) {
      initScene();
    } else {
      scriptEl.addEventListener('load', initScene, { once: true });
    }

    return () => {
      scriptEl?.removeEventListener('load', initScene);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (!width || !height) return;
      const scaleX = width / 1440;
      const scaleY = height / 900;
      const scale = Math.max(scaleX, scaleY);
      setSceneScale(scale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);

    return () => observer.disconnect();
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
          <div className="relative rounded-2xl p-[1.5px] overflow-hidden">
            <span
              className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#41C9C1_0%,#5076DD_50%,#41C9C1_100%)]"
              aria-hidden="true"
            />
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
              className="flex-1 bg-transparent px-8 py-5 text-white placeholder:text-white/20 outline-none w-full text-lg"
            />

            <div className="h-8 w-px bg-white/10" />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="relative flex items-center gap-3 px-10 py-5 bg-transparent group/btn transition-all"
            >
              <div className="absolute inset-0 bg-[#41C9C1]/0 group-hover/btn:bg-[#41C9C1]/5 transition-colors duration-300" />

              <span className="relative z-10 text-white font-medium group-hover/btn:text-[#41C9C1] transition-colors text-lg">
                {status === 'loading' ? '...' : 'Subscribe'}
              </span>
              <ArrowRight
                className={`relative z-10 size-5 text-white group-hover/btn:text-[#41C9C1] transition-all duration-300 ${status === 'loading' ? 'opacity-0' : 'group-hover/btn:translate-x-1'}`}
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
