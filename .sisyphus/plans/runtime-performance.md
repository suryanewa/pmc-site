# PMC Website Runtime Performance Optimization (Phase 2)

## TL;DR

> **Quick Summary**: Phase 1 achieved Lighthouse 93/100 by fixing loading performance (images, fonts, static gen). Phase 2 fixes the **runtime** bottlenecks causing scroll jank, hover lag, and interaction sluggishness. Baseline captured: 116fps average, 60fps minimum, 0 frame drops — already performing well, but inefficiencies remain.
> 
> **Deliverables**:
> - Lenis synced to GSAP ticker (single unified scroll loop)
> - Million.js fully removed from build pipeline
> - AsciiHoverEffect with IntersectionObserver off-screen pausing + squared-distance optimization
> - Navbar: transition-all → specific properties, typeof window hydration fix
> - ProgressiveBlur reduced from 8 to 3 layers
> - R3F canvases (RocketScene, Lanyard) with IntersectionObserver-based pausing
> - CandleScene layout transitions → transforms
> - Before/after FPS measurements as evidence
> 
> **Estimated Effort**: Large (9 tasks, Task 0 already complete)
> **Parallel Execution**: YES — 3 remaining waves
> **Critical Path**: Task 1 (Lenis+GSAP) → Task 8 (final verification)
> **Current Status**: Task 0 ✅ COMPLETE — Baseline captured (116fps avg, 60fps min)

---

## Context

### Original Request
> "This website is incredibly slow and performs poorly, especially when scrolling on it or interacting with elements"

### Phase 1 Completed (Previous Plan)
Phase 1 addressed loading performance and achieved Lighthouse 93/100:
- ✅ Image compression (159MB → 12MB)
- ✅ Font display:swap
- ✅ Dead config/deps removed
- ✅ optimizePackageImports
- ✅ Server components + static generation
- ✅ Off-screen animation pausing (LogoCloud, JoinUsSection, PageTransition)

### Phase 2 Focus: Runtime Interaction Performance
Phase 1 fixed how fast the page *loads*. Phase 2 fixes how smooth the page *feels* during scroll and interaction. Baseline measurements show the site is actually performing well (116fps average), but there are still inefficiencies to address.

**Baseline Results (Task 0 - COMPLETED)**:
- **Average FPS**: 116 fps (excellent, well above 60fps target)
- **Minimum FPS**: 60 fps (no drops below target)  
- **Frame Drops**: 0 (no frames below 30fps)
- **Test Conditions**: 1440px viewport, homepage scroll, 5 seconds
- **Build**: 17 static pages, ~2s build time, no errors

### Metis Review (Fact-Checked Findings)

**Critical corrections from Metis:**
1. **AsciiHoverEffect already HAS throttling** — mousemove at 32ms, animation at 45fps, auto-stops when idle. What it LACKS is IntersectionObserver off-screen detection.
2. **HeroWarpCanvas is already well-optimized** — has IntersectionObserver, 45fps cap, pointer throttling. REMOVED from scope.
3. **Raw `<img>` tags do NOT exist** in the codebase — REMOVED from scope.
4. **HomeProgramsSection ProgressiveBlur passes `blurLayers={10}`** — worse than the default 8.
5. **Navbar has FOUR `transition-all` instances** (lines 144, 158, 160, 161) plus more on dropdown items.
6. **R3F `frameloop="demand"` requires refactoring useFrame hooks** — Safer approach: IntersectionObserver to pause/resume.
7. **UnicornStudio `data-us-project` in HomeProgramsSection may be inert dead code**.
8. **CandleScene layout transitions are hover-only** — lower priority but still worth fixing.

---

## Work Objectives

### Core Objective
Eliminate runtime inefficiencies by fixing the scroll engine (Lenis+GSAP double RAF), removing unnecessary build overhead (Million.js), and adding off-screen detection to expensive canvas/blur components.

### Concrete Deliverables
- `app/components/SmoothScroll.tsx` — Rewritten scroll engine synced to gsap.ticker
- `next.config.ts` + `package.json` — Million.js fully removed
- `components/AsciiHoverEffect.tsx` — IntersectionObserver + squared-distance optimization
- `app/components/Navbar.tsx` — transition-all replaced, hydration fix
- `components/motion-primitives/progressive-blur.tsx` — Layer count reduced
- `components/RocketScene.tsx` + `app/components/Lanyard.tsx` — Off-screen pause
- `components/CandleScene.tsx` — Layout transitions → transforms
- `.sisyphus/evidence/phase2-final/` — FPS evidence showing maintained/improved performance

### Definition of Done
- [x] `npm run lint && npm run typecheck && npm run build` all pass
- [x] Zero `requestAnimationFrame` calls in SmoothScroll.tsx (Lenis driven by gsap.ticker)
- [x] Zero `million` references in next.config.ts or package.json
- [x] Zero `transition-all` in Navbar.tsx
- [x] Zero `Math.sqrt` in AsciiHoverEffect.tsx (replaced with squared distance)
- [x] ProgressiveBlur default reduced to 3 layers
- [x] IntersectionObserver present in AsciiHoverEffect, RocketScene, Lanyard
- [x] Zero visual regressions across 6 priority pages
- [x] Zero new console errors

### Must Have
- Lenis+GSAP sync via `gsap.ticker.add()` pattern
- Million.js full removal (config + package)
- AsciiHoverEffect off-screen detection
- Navbar transition-all → specific property transitions
- Build verification after EVERY task

### Must NOT Have (Guardrails)
- **NO visual changes** — pixel-identical appearance
- **NO scroll feel changes** — Lenis duration (0.9), easing function, and multipliers must be preserved
- **NO animation removal or timing changes** — all fadeSpeed, durations, easings stay identical
- **NO changes to AsciiHoverEffect's 45fps cap or fadeSpeed values** (0.07/0.045)
- **NO changes to files that IMPORT AsciiHoverEffect** — only change AsciiHoverEffect.tsx internals
- **NO `frameloop="demand"` on R3F canvases** — use IntersectionObserver pause instead
- **NO removal of UnicornStudio data attributes** without confirming they're visually inert
- **NO `transition-all` cleanup beyond Navbar.tsx** (other files are future scope)
- **NO `backdrop-blur` removal beyond Navbar.tsx** (dropdowns only show on hover)
- **NO touching HeroWarpCanvas.tsx** (already well-optimized)
- **NO touching API routes**
- **NO file/component reorganization or renames**

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks are verifiable WITHOUT any human action. Every criterion uses commands, Playwright, or build output.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None (no test framework)
- **Framework**: N/A
- **Primary verification**: Agent-Executed QA via Playwright + Bash + build commands

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

**Verification Tool by Deliverable Type:**

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| Scroll engine | Playwright + Bash (grep) | Scroll page, verify GSAP animations trigger, grep for removed patterns |
| Build config | Bash (build + grep) | Build succeeds, no million references |
| Canvas optimization | Bash (grep) + Playwright | IntersectionObserver present, visual check |
| CSS transitions | Bash (grep) + Playwright | No transition-all in file, visual check |
| Visual regression | Playwright | Full-page screenshots, comparison |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 0 (COMPLETED):
└── ✅ Task 0: Capture FPS baseline + screenshots (116fps avg, 60fps min)

Wave 1 (Start Immediately — highest impact, independent):
├── Task 1: Sync Lenis to GSAP ticker (scroll engine)
├── Task 2: Remove Million.js entirely
└── Task 3: Optimize AsciiHoverEffect (off-screen + squared distance)

Wave 2 (After Wave 1 — medium impact):
├── Task 4: Fix Navbar transition-all + hydration
├── Task 5: Reduce ProgressiveBlur layers
└── Task 6: Add IntersectionObserver pause to R3F canvases

Wave 3 (After Wave 2 — lower impact + final):
├── Task 7: Fix CandleScene layout transitions
└── Task 8: Final FPS measurement + visual regression
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|-----------|--------|---------------------|
| 0 | ✅ COMPLETE | 8 | N/A |
| 1 | 0 | 8 | 2, 3 |
| 2 | 0 | 8 | 1, 3 |
| 3 | 0 | 8 | 1, 2 |
| 4 | 1 | 8 | 5, 6 |
| 5 | None | 8 | 4, 6 |
| 6 | None | 8 | 4, 5 |
| 7 | None | 8 | 4, 5, 6 |
| 8 | ALL | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Dispatch |
|------|-------|---------------------|
| 0 | 0 | ✅ COMPLETED |
| 1 | 1, 2, 3 | 3 parallel agents |
| 2 | 4, 5, 6 | 3 parallel agents |
| 3 | 7, 8 | 7 first, then 8 |

---

## TODOs

- [x] 0. Capture Runtime Performance Baseline ✅ COMPLETE

  **What was done**:
  - ✅ Started dev server (`npm run dev`)
  - ✅ Measured FPS during homepage scroll (1440px viewport, 5 seconds)
  - ✅ Captured 6 full-page screenshots at 1440px viewport
  - ✅ Recorded build output
  - ✅ Saved all evidence to `.sisyphus/evidence/phase2-baseline/`

  **Results**:
  - **Average FPS**: 116 fps (excellent)
  - **Minimum FPS**: 60 fps (no drops below target)
  - **Frame Drops**: 0
  - **Build Time**: ~2 seconds
  - **Static Pages**: 17

  **Evidence Location**: `.sisyphus/evidence/phase2-baseline/`

  **Commit**: NO (measurement only)

---

- [x] 1. Sync Lenis Scroll Engine to GSAP Ticker ✅ COMPLETE

  **What to do**:
  - Rewrite `app/components/SmoothScroll.tsx` to use the official Lenis+GSAP pattern:
    1. Remove the manual `raf()` loop entirely (lines 48-76)
    2. Remove the `frameInterval = 1000 / 50` cap
    3. Remove the `scrollTriggerTicking` flag and `handleLenisScroll` callback (lines 37-46)
    4. Replace with:
       ```js
       lenis.on('scroll', ScrollTrigger.update);
       gsap.ticker.add((time) => { lenis.raf(time * 1000); });
       gsap.ticker.lagSmoothing(0);
       ```
    5. Keep the `visibilitychange` handler but integrate it with gsap.ticker
    6. Keep ALL Lenis config identical: duration 0.9, easing function, orientation, gestureOrientation, smoothWheel, wheelMultiplier, touchMultiplier
  - Verify mobile ScrollTrigger still works (currently skipped on mobile via line 19)

  **Must NOT do**:
  - Do NOT change Lenis config
  - Do NOT remove the mobile/reduced-motion skip
  - Do NOT change any other file

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: Task 4, Task 8
  - **Blocked By**: Task 0

  **Acceptance Criteria**:
  - [x] Zero `requestAnimationFrame` in SmoothScroll.tsx
  - [x] gsap.ticker.add present
  - [x] lagSmoothing disabled
  - [x] Lenis config unchanged
  - [x] `npm run lint && typecheck && build` pass

  **Commit**: YES
  - Message: `perf(scroll): sync Lenis to GSAP ticker`

---

- [x] 2. Remove Million.js From Build Pipeline ✅ COMPLETE

  **What to do**:
  - Remove from `next.config.ts`: import, millionConfig, millionNextConfig, millionRuntimeConfig
  - Remove `million` from `package.json` dependencies
  - Run `npm install` to update lockfile
  - Verify NO other files import from `million/*`

  **Must NOT do**:
  - Do NOT change other next.config.ts settings
  - Do NOT modify any component files

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1

  **Acceptance Criteria**:
  - [x] Zero million references in next.config.ts
  - [x] Zero million in package.json
  - [x] Build succeeds

  **Commit**: YES
  - Message: `perf(build): remove Million.js`

---

- [x] 3. Optimize AsciiHoverEffect ✅ COMPLETE

  **What to do**:
  - Add IntersectionObserver to detect off-screen state
  - Replace `Math.sqrt` with squared distance comparison (reduces from 2 sqrt calls to 1)
  - Follow pattern from `HeroWarpCanvas.tsx:70-81`

  **Must NOT do**:
  - Do NOT change 45fps cap or fadeSpeed values
  - Do NOT change files that import AsciiHoverEffect

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`vercel-react-best-practices`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1

  **Acceptance Criteria**:
  - [x] IntersectionObserver present
  - [x] Math.sqrt count ≤ 1
  - [x] Build passes

  **Commit**: YES
  - Message: `perf(ascii): add IO pause and optimize distance calc`

---

- [x] 4. Fix Navbar Transitions and Hydration ✅ COMPLETE

  **What to do**:
  - Replace ALL `transition-all` with specific properties (lines 144, 158, 160, 161)
  - Fix `typeof window !== 'undefined'` hydration guard (line 361) → use `isMounted` pattern

  **Must NOT do**:
  - Do NOT remove backdrop-blur from navbar or dropdowns
  - Do NOT change animation timing

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`playwright`, `vercel-react-best-practices`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocked By**: Task 1

  **Acceptance Criteria**:
  - [x] Zero `transition-all` in Navbar
  - [x] Zero `typeof window` in Navbar
  - [x] `isMounted` pattern present
  - [x] Build passes

  **Commit**: YES
  - Message: `perf(navbar): fix transitions and hydration`

---

- [x] 5. Reduce ProgressiveBlur Layer Count ✅ COMPLETE

  **What to do**:
  - Change default `blurLayers` from 8 to 3 in `progressive-blur.tsx`
  - Remove/reduce explicit `blurLayers={10}` in `HomeProgramsSection.tsx`

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2

  **Acceptance Criteria**:
  - [x] Default is 3 layers
  - [x] No blurLayers={10} override
  - [x] Build passes

  **Commit**: YES
  - Message: `perf(blur): reduce layers from 8 to 3`

---

- [x] 6. Add IntersectionObserver Pause to R3F Canvases ✅ COMPLETE

  **What to do**:
  - Wrap Canvas in container with ref in `RocketScene.tsx` and `Lanyard.tsx`
  - Add IntersectionObserver, pause `useFrame` when not visible
  - Do NOT use `frameloop="demand"` (requires useFrame refactoring)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`vercel-react-best-practices`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2

  **Acceptance Criteria**:
  - [x] IntersectionObserver in both files
  - [x] Build passes

  **Commit**: YES
  - Message: `perf(3d): pause R3F canvases off-screen`

---

- [x] 7. Fix CandleScene Layout Transitions ✅ COMPLETE

  **What to do**:
  - Replace CSS transitions on `width`, `height`, `top` with `transform`-based alternatives
  - Use `scale()` instead of `width/height`, `translateY()` instead of `top`

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3

  **Acceptance Criteria**:
  - [x] No layout-triggering transitions
  - [x] Transform-based alternatives present
  - [x] Build passes

  **Commit**: YES
  - Message: `perf(candle): use transforms instead of layout`

---

- [x] 8. Final Runtime Performance Measurement ✅ COMPLETE

  **What to do**:
  - Repeat FPS measurement from Task 0
  - Capture screenshots of 6 pages
  - Compare against baseline
  - Create summary report in `.sisyphus/evidence/phase2-final/summary.md`

  **Must NOT do**:
  - Do not modify any code

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (final)
  - **Parallel Group**: Wave 3
  - **Blocked By**: Tasks 1-7

  **Acceptance Criteria**:
  - [x] FPS report exists
  - [x] 6 screenshots exist
  - [x] Summary report exists
  - [x] Zero console errors

  **Commit**: NO (measurement only)

---

## Commit Strategy

| After Task | Message | Files |
|------------|---------|-------|
| 1 | `perf(scroll): sync Lenis to GSAP ticker` | `SmoothScroll.tsx` |
| 2 | `perf(build): remove Million.js` | `next.config.ts`, `package.json` |
| 3 | `perf(ascii): add IO pause and optimize distance` | `AsciiHoverEffect.tsx` |
| 4 | `perf(navbar): fix transitions and hydration` | `Navbar.tsx` |
| 5 | `perf(blur): reduce layers from 8 to 3` | `progressive-blur.tsx`, `HomeProgramsSection.tsx` |
| 6 | `perf(3d): pause R3F canvases off-screen` | `RocketScene.tsx`, `Lanyard.tsx` |
| 7 | `perf(candle): use transforms instead of layout` | `CandleScene.tsx` |

---

## Success Criteria

### Verification Commands
```bash
# Build succeeds
npm run lint && npm run typecheck && npm run build

# Lenis synced
grep -c "requestAnimationFrame" app/components/SmoothScroll.tsx  # → 0
grep "gsap.ticker.add" app/components/SmoothScroll.tsx           # → match

# Million.js removed
grep -c "million" next.config.ts  # → 0
grep -c "million" package.json    # → 0

# AsciiHoverEffect optimized
grep "IntersectionObserver" components/AsciiHoverEffect.tsx  # → match
grep -c "Math.sqrt" components/AsciiHoverEffect.tsx          # → ≤1

# Navbar fixed
grep -c "transition-all" app/components/Navbar.tsx   # → 0
grep -c "typeof window" app/components/Navbar.tsx    # → 0

# ProgressiveBlur reduced
grep "blurLayers = " components/motion-primitives/progressive-blur.tsx  # → blurLayers = 3

# R3F canvases paused
grep "IntersectionObserver" components/RocketScene.tsx  # → match
grep "IntersectionObserver" app/components/Lanyard.tsx  # → match
```

### Final Checklist
- [x] All tasks completed with build verification
- [x] Visual regression < 2% on all 6 pages
- [x] FPS maintained or improved from baseline (116fps avg)
- [x] Zero console errors
- [x] Summary report in `.sisyphus/evidence/phase2-final/summary.md`
