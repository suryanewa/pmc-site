# Performance Optimization

This document describes the performance baseline and optimization workflow for the PMC redesign.

## Quick Start

### Run Performance Baseline

```bash
# 1. Start dev server
npm run dev

# 2. Run baseline (in another terminal)
npm run perf:baseline
```

This captures automated performance measurements for 4 key scenarios and generates a Lighthouse mobile audit.

## Current Status (2026-02-12)

**Performance Score**: 52/100 ⚠️

### Critical Issues
- **LCP**: 11.3s (target: <2.5s) 🔴
- **INP**: 10.4s (target: <200ms) 🔴

### See Full Analysis
- **Baseline Report**: `.sisyphus/notepads/performance-optimization/task-1.md`
- **Evidence**: `.sisyphus/evidence/` (gitignored, regeneratable)

## Measured Scenarios

1. **Home Page Full Scroll** - Top to bottom scroll performance
2. **Navbar Scroll Interaction** - Navbar state transitions during scroll
3. **Timeline Scroll Interaction** - Timeline component scroll performance
4. **Polaroid Hover Interactions** - 3D tilt animation responsiveness

## Architecture

### Scripts
- `e2e/performance-baseline.spec.ts` - Playwright test scenarios
- `scripts/lighthouse-audit.ts` - Lighthouse CLI wrapper
- `scripts/run-baseline.sh` - Master execution script

### Evidence Files
Generated files are stored in `.sisyphus/evidence/` (gitignored):
- Performance traces (`.json`)
- Screenshots (`.png`)
- Lighthouse reports (`.html`, `.json`)
- Execution logs

### Notepads
Analysis and learnings are stored in `.sisyphus/notepads/performance-optimization/`:
- `task-1.md` - Baseline establishment findings
- Additional task findings as optimization progresses

## Re-running After Changes

Always re-run baseline after performance optimizations:

```bash
npm run perf:baseline
```

Compare new metrics against baseline to validate improvements.

## Next Steps

Based on the baseline, priority optimizations:

1. **Fix LCP (11.3s → <2.5s)**
   - Investigate 3D canvas blocking on HomeHeroSection
   - Consider lazy loading Three.js after LCP

2. **Reduce Main Thread Blocking (INP 10.4s → <200ms)**
   - Profile GSAP ScrollTrigger
   - Optimize Motion animations
   - Review Lenis smooth scroll overhead

3. **Improve TBT (842ms → <200ms)**
   - Code-split animation libraries
   - Defer non-critical JavaScript

4. **Optimize FCP (1929ms → <1800ms)**
   - Inline critical CSS
   - Preload hero fonts

See `.sisyphus/notepads/performance-optimization/task-1.md` for detailed analysis.
