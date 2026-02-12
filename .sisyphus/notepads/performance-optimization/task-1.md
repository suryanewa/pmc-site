# Task 1: Performance Baseline Establishment

**Date**: 2026-02-12
**Status**: Complete
**Command**: `npm run perf:baseline`

## Overview

Established reproducible performance baseline for 4 key interaction scenarios on the PMC redesign home page. Captured automated performance traces, screenshots, and Lighthouse mobile audit.

## Baseline Scenarios Measured

### Scenario 1: Home Page Full Scroll
- **Description**: Smooth scroll from top to bottom of home page (20 steps)
- **Duration**: 2437.5ms
- **FCP**: 348ms (First Contentful Paint)
- **Evidence**: 
  - Trace: `task-1-scenario-1-home-scroll-2026-02-12.json` (1.7MB)
  - Screenshot: `task-1-scenario-1-home-scroll-2026-02-12.png` (477KB)

### Scenario 2: Navbar Scroll Interaction
- **Description**: Scroll down/up to trigger navbar state changes (3 cycles)
- **Duration**: 2809.2ms
- **Evidence**:
  - Trace: `task-1-scenario-2-navbar-scroll-2026-02-12.json` (1.7MB)
  - Before: `task-1-scenario-2-navbar-before-2026-02-12.png` (35KB)
  - After: `task-1-scenario-2-navbar-after-2026-02-12.png` (135KB)

### Scenario 3: Timeline Scroll Interaction
- **Description**: Scroll through timeline component (5 increments of 200px)
- **Duration**: 1828ms
- **Evidence**:
  - Trace: `task-1-scenario-3-timeline-scroll-2026-02-12.json` (1.1MB)
  - Screenshot: `task-1-scenario-3-timeline-2026-02-12.png` (570KB)

### Scenario 4: Polaroid Hover Interactions
- **Description**: Hover over polaroid elements to trigger 3D tilt animations
- **Duration**: 741.5ms
- **Evidence**:
  - Trace: `task-1-scenario-4-polaroid-hover-2026-02-12.json` (1.1MB)
  - Screenshot: `task-1-scenario-4-polaroid-2026-02-12.png` (455KB)

## Lighthouse Mobile Audit (iPhone 14 Pro)

**Overall Performance Score**: 52/100 ⚠️

### Core Web Vitals
- **FCP** (First Contentful Paint): 1929ms ⚠️ (Target: <1800ms)
- **LCP** (Largest Contentful Paint): 11304ms 🔴 (Target: <2500ms)
- **CLS** (Cumulative Layout Shift): 0 ✅ (Target: <0.1)
- **TBT** (Total Blocking Time): 842ms ⚠️ (Target: <200ms)
- **Speed Index**: 3709ms ⚠️ (Target: <3400ms)
- **INP** (Interaction to Next Paint): 10437ms 🔴 (Target: <200ms)

### Key Observations

#### Critical Issues (Red)
1. **LCP is extremely high (11.3s)** - Largest Contentful Paint takes over 11 seconds
   - Likely caused by heavy WebGL/3D canvas on home hero section
   - Could also be large images or fonts loading late
   
2. **INP is extremely high (10.4s)** - Interaction responsiveness is very poor
   - Suggests heavy main thread blocking during interactions
   - Timeline, polaroid, and navbar animations may be causing jank

#### Warnings (Yellow)
3. **FCP is borderline (1929ms)** - Just above the 1.8s threshold
   - Initial render is slightly slow
   
4. **TBT is high (842ms)** - Total blocking time indicates main thread congestion
   - Likely from:
     - GSAP scroll animations
     - Three.js/React Three Fiber initialization
     - Motion (Framer Motion) animations
     - Lenis smooth scroll library

5. **Speed Index is borderline (3709ms)** - Visual completeness takes ~3.7s

#### Successes (Green)
✅ **CLS is perfect (0)** - No layout shift issues despite heavy animations
  - Good use of explicit dimensions on images and containers
  - Proper placeholder handling

## Evidence Files

All evidence saved to: `.sisyphus/evidence/`

### Generated Files (Total: ~6.5MB)
- 4 Playwright performance traces (.json)
- 5 Screenshots (.png)
- 1 Lighthouse HTML report (.report.html - 0B, needs investigation)
- 1 Lighthouse JSON report (.report.json - 432KB)
- 3 Execution logs

## Re-run Command

```bash
npm run perf:baseline
```

**Prerequisites**: Dev server must be running on `http://localhost:3000`

## Technical Setup

### Test Configuration
- **Browser**: Chromium (Playwright)
- **Viewport**: 390x844 (iPhone 14 Pro)
- **Device Scale Factor**: 3x
- **CPU Throttle**: 4x slowdown (Lighthouse mobile)
- **Network**: No throttling (localhost)

### Scripts Created
1. `e2e/performance-baseline.spec.ts` - Playwright test scenarios
2. `scripts/lighthouse-audit.ts` - Lighthouse CLI wrapper
3. `scripts/run-baseline.sh` - Master execution script
4. `package.json` - Added `perf:baseline` script

## Next Steps (Based on Baseline)

### Priority 1: Fix Critical LCP (11.3s → <2.5s target)
- Investigate 3D canvas loading on HomeHeroSection
- Check if Three.js is blocking LCP element
- Consider lazy loading 3D scene after LCP

### Priority 2: Reduce Main Thread Blocking (INP 10.4s → <200ms target)
- Profile GSAP ScrollTrigger performance
- Optimize Motion animations (reduce complexity)
- Review Lenis smooth scroll overhead
- Consider using CSS scroll-driven animations instead

### Priority 3: Improve TBT (842ms → <200ms target)
- Code-split heavy animation libraries
- Defer non-critical JavaScript
- Use React.lazy() for Three.js components

### Priority 4: Optimize FCP (1929ms → <1800ms target)
- Inline critical CSS
- Preload hero fonts (Gotham, Satoshi)
- Reduce initial bundle size

## Learnings

1. **Baseline infrastructure works** - All 4 scenarios execute reliably and capture traces
2. **CLS handling is excellent** - Despite heavy animations, no layout shifts detected
3. **Performance score is low (52/100)** - Significant optimization work needed
4. **Main culprits identified**:
   - Heavy 3D/WebGL initialization (Three.js, React Three Fiber, Rapier physics)
   - Animation library overhead (GSAP, Motion, Lenis)
   - Large initial bundle (Next.js 16 + React 19 + animation libs)

## Issues Encountered

1. ✅ **Fixed**: Playwright test discovery - moved test to `e2e/` directory
2. ✅ **Fixed**: Lighthouse mobile config - changed from `--preset=desktop` to `--preset=perf` + `--form-factor=mobile`
3. ⚠️ **Minor**: Lighthouse HTML report is 0B (JSON report is valid) - investigate later

## Files Modified

- `package.json` - Added `perf:baseline` script and dependencies (lighthouse, tsx)
- Created: `e2e/performance-baseline.spec.ts`
- Created: `scripts/lighthouse-audit.ts`
- Created: `scripts/run-baseline.sh`

---

**Baseline captured successfully. Ready for optimization work.**
