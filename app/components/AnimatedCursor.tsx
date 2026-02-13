'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CursorProvider,
  Cursor,
} from '@/components/animate-ui/primitives/animate/cursor';
import { ArrowRight } from 'lucide-react';

const INTERACTIVE_SELECTOR =
  'a,button,[role="button"],input,textarea,select,label,summary,[type="checkbox"],[type="radio"],[type="range"],.cursor-pointer';

const PROGRAM_CARD_SELECTOR = '[data-program-card]';

export function AnimatedCursor() {
  const [hasPointer, setHasPointer] = React.useState(false);
  const [cursorMode, setCursorMode] = React.useState<'default' | 'interactive' | 'program'>('default');
  const modeRef = React.useRef<'default' | 'interactive' | 'program'>('default');
  const rafIdRef = React.useRef<number | null>(null);
  const pendingModeRef = React.useRef<'default' | 'interactive' | 'program' | null>(null);

  const updateCursorMode = React.useCallback((next: 'default' | 'interactive' | 'program') => {
    if (modeRef.current === next) return;
    
    // Store pending mode and schedule update via RAF
    pendingModeRef.current = next;
    
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (pendingModeRef.current !== null && modeRef.current !== pendingModeRef.current) {
          modeRef.current = pendingModeRef.current;
          setCursorMode(pendingModeRef.current);
        }
        rafIdRef.current = null;
      });
    }
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => {
      const cpuCores = navigator.hardwareConcurrency ?? 8;
      setHasPointer(mq.matches && cpuCores >= 6);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  React.useEffect(() => {
    if (!hasPointer) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(PROGRAM_CARD_SELECTOR)) {
        updateCursorMode('program');
      } else if (target?.closest(INTERACTIVE_SELECTOR)) {
        updateCursorMode('interactive');
      } else {
        updateCursorMode('default');
      }
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (related?.closest(PROGRAM_CARD_SELECTOR)) {
        updateCursorMode('program');
      } else if (related?.closest(INTERACTIVE_SELECTOR)) {
        updateCursorMode('interactive');
      } else {
        updateCursorMode('default');
      }
    };

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      // Clean up pending RAF on unmount
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [hasPointer, updateCursorMode]);

  if (!hasPointer) return null;

  return (
    <CursorProvider global>
      <Cursor>
        <AnimatePresence mode="wait" initial={false}>
          {cursorMode === 'program' ? (
            <motion.div
              key="program-arrow"
              className="relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full p-[1.5px]"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#41C9C1_0%,#5076DD_50%,#41C9C1_100%)]" aria-hidden="true" />
              <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-white backdrop-blur-3xl">
                <ArrowRight className="size-4" />
              </span>
            </motion.div>
          ) : cursorMode === 'interactive' ? (
            <motion.div
              key="dot"
              className="rounded-full"
              style={{ width: 10, height: 10, backgroundColor: '#41C9C1' }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          ) : (
            <motion.svg
              key="arrow"
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <path
                fill="#41C9C1"
                d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </Cursor>
    </CursorProvider>
  );
}
