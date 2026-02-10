'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CursorProvider,
  Cursor,
} from '@/components/animate-ui/primitives/animate/cursor';

const INTERACTIVE_SELECTOR =
  'a,button,[role="button"],input,textarea,select,label,summary,[type="checkbox"],[type="radio"],[type="range"],.cursor-pointer';

export function AnimatedCursor() {
  const [hasPointer, setHasPointer] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setHasPointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  React.useEffect(() => {
    if (!hasPointer) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  return (
    <CursorProvider global>
      <Cursor>
        <AnimatePresence mode="wait" initial={false}>
          {isHovering ? (
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
