"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimate } from "framer-motion";

/**
 * Premium Preloader Component
 *
 * Uses Framer Motion's useAnimate() for imperative, promise-based sequencing.
 * No setTimeouts - each animation step awaits the previous, ensuring perfect sync.
 *
 * Animation sequence (~1.4s total):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Pause (0.15s)     - Let user register the rocket                    │
 * │  2. Anticipate (0.18s) - Squash down (spring wind-up feel)              │
 * │  3. Shake (0.3s)      - Decelerating shake builds tension               │
 * │  4. Wind-up (0.08s)   - Quick stretch before launch                     │
 * │  5. Launch (0.5s)     - Accelerating exit with flame                    │
 * │  6. Fade (0.3s)       - Smooth overlay fade-out                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Easing curves used:
 * - ease-out-back [0.34, 1.56, 0.64, 1]: Overshoots then settles (organic feel)
 * - ease-in-expo [0.7, 0, 0.84, 0]: Slow start → fast end (acceleration)
 * - ease-out-expo [0.16, 1, 0.3, 1]: Fast start → smooth end (deceleration)
 *
 * To adjust timings: modify duration values in each phase
 * To adjust feel: modify the cubic-bezier values or keyframe amplitudes
 */

interface PreloaderProps {
  /** Called when animation completes, just before unmount */
  onDone?: () => void;
  /** Force replay even if already shown this session (default: false) */
  forceReplay?: boolean;
}

// Session key prevents replay on same-tab navigation
const PRELOADER_SHOWN_KEY = "preloader_shown_v2";

export function Preloader({ onDone, forceReplay = false }: PreloaderProps) {
  // DISABLED: Return null immediately, keeping implementation for reference
  onDone?.();
  return null;

  // eslint-disable-next-line @typescript-eslint/no-unreachable-code
  const [isVisible, setIsVisible] = useState(true);
  const [scope, animate] = useAnimate();
  const hasRun = useRef(false);
  const isMounted = useRef(true);

  // Skip preloader if already shown this session
  useEffect(() => {
    if (!forceReplay && typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem(PRELOADER_SHOWN_KEY);
      if (alreadyShown) {
        setIsVisible(false);
        onDone?.();
      }
    }
  }, [forceReplay, onDone]);

  const runSequence = useCallback(async () => {
    // Guard against double-execution and SSR
    if (hasRun.current || !scope.current) return;
    hasRun.current = true;

    // Safe state setter that respects unmount
    const safeSetVisible = (value: boolean) => {
      if (isMounted.current) setIsVisible(value);
    };

    try {
      // ═══════════════════════════════════════════════════════════════════
      // PHASE 1: Brief pause - let user see the rocket
      // ═══════════════════════════════════════════════════════════════════
      await animate("[data-rocket]", { y: 0 }, { duration: 0.15 });

      // ═══════════════════════════════════════════════════════════════════
      // PHASE 2: Anticipation - squash down like winding a spring
      // The scaleY < 1 + scaleX > 1 creates a "compression" feel
      // ease-out-back gives a tiny overshoot for organic motion
      // ═══════════════════════════════════════════════════════════════════
      await animate(
        "[data-rocket]",
        {
          y: 12,
          scaleY: 0.9,
          scaleX: 1.06,
        },
        {
          duration: 0.18,
          ease: [0.34, 1.56, 0.64, 1], // ease-out-back
        }
      );

      // ═══════════════════════════════════════════════════════════════════
      // PHASE 3: Shake with natural deceleration
      // Keyframe amplitudes decrease: 6→5→3→1.5→0 (not infinite repeat)
      // This builds tension without abrupt cutoff
      // ═══════════════════════════════════════════════════════════════════
      await animate(
        "[data-rocket]",
        {
          x: [0, -6, 6, -5, 5, -3, 3, -1.5, 1.5, 0],
          rotate: [0, -3, 3, -2.5, 2.5, -1.5, 1.5, -0.5, 0.5, 0],
        },
        {
          duration: 0.3,
          ease: "easeOut",
        }
      );

      // ═══════════════════════════════════════════════════════════════════
      // PHASE 4: Wind-up stretch + flame ignition
      // Quick upward "coil" with vertical stretch (scaleY > 1)
      // Flame fades in simultaneously (parallel, not awaited)
      // ═══════════════════════════════════════════════════════════════════
      animate(
        "[data-flame]",
        { opacity: 1, scaleY: 1 },
        { duration: 0.1, ease: "easeOut" }
      );

      await animate(
        "[data-rocket]",
        {
          y: -4,
          scaleY: 1.1,
          scaleX: 0.94,
        },
        {
          duration: 0.08,
          ease: [0.7, 0, 0.84, 0], // ease-in-expo
        }
      );

      // ═══════════════════════════════════════════════════════════════════
      // PHASE 5: LAUNCH!
      // ease-in-expo creates acceleration (slow → fast, like real thrust)
      // Flame scales up during ascent (parallel animation)
      // Reset rocket scale during flight for clean silhouette
      // ═══════════════════════════════════════════════════════════════════
      animate(
        "[data-flame]",
        {
          scaleY: [1, 1.8, 2.5],
          scaleX: [1, 1.2, 1.4],
        },
        {
          duration: 0.5,
          ease: [0.7, 0, 0.84, 0],
        }
      );

      await animate(
        "[data-rocket]",
        {
          y: "-140vh",
          scaleY: 1,
          scaleX: 1,
        },
        {
          duration: 0.5,
          ease: [0.7, 0, 0.84, 0], // ease-in-expo for acceleration
        }
      );

      // ═══════════════════════════════════════════════════════════════════
      // PHASE 6: Fade overlay
      // ease-out-expo = fast initial fade, then smooth tail
      // Feels snappy but not jarring
      // ═══════════════════════════════════════════════════════════════════
      await animate(
        scope.current,
        { opacity: 0 },
        {
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1], // ease-out-expo
        }
      );

      // Mark as shown for this session
      if (typeof window !== "undefined") {
        sessionStorage.setItem(PRELOADER_SHOWN_KEY, "true");
      }

      // Clean unmount
      safeSetVisible(false);
      onDone?.();
    } catch (e) {
      // Animation interrupted (unmount during sequence)
      // Fail gracefully
      console.error("Preloader animation error:", e);
      safeSetVisible(false);
    }
  }, [animate, scope, onDone]);

  // Kick off sequence on mount
  useEffect(() => {
    if (isVisible) {
      runSequence();
    }
    return () => {
      isMounted.current = false;
    };
  }, [isVisible, runSequence]);

  // Early return after all hooks
  if (!isVisible) return null;

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      style={{
        // Radial vignette adds depth (not flat black)
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, #151515 0%, #0a0a0a 50%, #030303 100%)",
      }}
    >
      {/* Subtle noise texture for premium feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Rocket container - GPU-accelerated transforms */}
      <motion.div
        data-rocket
        className="relative will-change-transform"
        style={{ transformOrigin: "center bottom" }}
      >
        {/* Flame effect (child of rocket so it moves with launch) */}
        <motion.div
          data-flame
          className="absolute left-1/2 -translate-x-1/2 top-full pointer-events-none"
          style={{ transformOrigin: "center top" }}
          initial={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
          aria-hidden="true"
        >
          <svg
            width="32"
            height="48"
            viewBox="0 0 32 48"
            fill="none"
            className="drop-shadow-[0_0_12px_rgba(255,150,50,0.7)]"
          >
            {/* Outer flame glow (orange → transparent) */}
            <ellipse
              cx="16"
              cy="12"
              rx="10"
              ry="20"
              fill="url(#flame-outer)"
            />
            {/* Inner flame core (white → yellow) */}
            <ellipse
              cx="16"
              cy="8"
              rx="5"
              ry="12"
              fill="url(#flame-inner)"
            />
            <defs>
              <linearGradient
                id="flame-outer"
                x1="16"
                y1="0"
                x2="16"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFA500" />
                <stop offset="40%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="flame-inner"
                x1="16"
                y1="0"
                x2="16"
                y2="20"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FFEB3B" />
                <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Rocket SVG - fetchPriority ensures no layout shift */}
        <img
          src="/rocket.svg"
          alt=""
          className="w-20 h-20 md:w-24 md:h-24 select-none"
          draggable={false}
          fetchPriority="high"
        />
      </motion.div>
    </motion.div>
  );
}
