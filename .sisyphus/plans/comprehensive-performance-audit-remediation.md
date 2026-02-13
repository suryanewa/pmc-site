# Comprehensive Performance Audit Remediation

## TL;DR

> **Quick Summary**: Run a Phase-4, delta-focused performance remediation that targets residual runtime lag (scroll + interactions) without changing functionality or interactivity.
>
> **Deliverables**:
> - Fresh delta diagnostics (trace + interaction metrics) for hotspot routes
> - Residual-gap fixes (UnicornStudio lifecycle, preloader overlap, cursor/event pressure, compositing hotspots, dead asset cleanup)
> - Before/after evidence with hard gates (INP, long tasks, frame-time)
>
> **Estimated Effort**: Medium-Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 0 -> Task 1 -> Task 2 -> Task 7

---

## Context

### Original Request
Comprehensive audit and optimization for laggy scrolling/interactions, with no functionality or interactivity loss.

### Interview Summary
- Exhaustive research completed: multiple explore/librarian/oracle agents + direct repository scans.
- Prior plans show major optimization phases already completed; this plan avoids duplicate work and focuses on residual issues/regressions.
- Current code still includes many concurrent runtime systems (Lenis/GSAP/Motion/canvas/R3F) and paint-heavy effects.

### Research Findings
- Global runtime wrappers in `app/layout.tsx` load interactive systems app-wide (`Providers`, `Preloader`, `SmoothScroll`, `RootNavbar`, `PageTransition`).
- Confirmed heavy runtime hotspots:
  - `app/components/SmoothScroll.tsx`
  - `app/components/HeroWarpCanvas.tsx`
  - `components/AsciiHoverEffect.tsx`
  - `app/components/Navbar.tsx`
  - `app/components/InteractivePolaroids.tsx`
  - `components/ui/timeline.tsx`
  - `app/components/Lanyard.tsx`
  - `components/RocketScene.tsx`
  - `components/smoothui/logo-cloud-1/index.tsx`
- Asset hotspot remains: `public/grad-bootcamp/` is still large (~16MB).
- Build is healthy; most routes are static.

### Metis Review
Addressed gaps:
- Do not repeat already completed optimizations; start with delta diagnostics.
- Explicitly cover residual high-likelihood lag sources: UnicornStudio lifecycle, preloader-overlap wasted work, global cursor event pressure, blend/compositing hotspots, dead asset residue.
- Add strict anti-regression gates and route-scoped verification.

---

## Work Objectives

### Core Objective
Reduce real-world scroll and interaction lag by eliminating unnecessary active work, reducing paint/compositing contention, and validating improvements with trace-based evidence.

### Concrete Deliverables
- Diagnostic evidence: `.sisyphus/evidence/phase4-diagnostic/`
- Remediation changes across targeted residual hotspots
- Final comparison report: `.sisyphus/evidence/phase4-final/summary.md`

### Definition of Done
- [ ] `npm run lint && npm run typecheck && npm run build` pass
- [ ] Trace-based frame metrics improve or remain non-regressive on target routes
- [ ] Interaction latency metrics improve or remain non-regressive
- [ ] No functionality/interactivity regressions on audited flows

### Must Have
- Delta diagnostic before code changes
- Route-level, evidence-backed optimizations
- No feature removal
- Objective gate checks on every wave

### Must NOT Have (Guardrails)
- No library replacement/removal (Lenis, GSAP, Motion, Three.js/R3F, UnicornStudio)
- No backend/API changes
- No visual redesign
- No repeating prior-completed tasks unless regression is proven
- No Gotham OTF->WOFF2 conversion without explicit license confirmation

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> All verification is agent-executed via Playwright/Bash traces and command assertions.

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: YES (tests-after strategy)
- **Framework**: Vitest + Playwright

### Agent-Executed QA Scenarios (Global)

Scenario: Delta trace capture for home scroll
  Tool: Playwright + CDP trace
  Preconditions: Dev server running on `localhost:3000`
  Steps:
    1. Navigate to `http://localhost:3000/`
    2. Wait for idle state (`networkidle` + 2s)
    3. Start performance tracing
    4. Scroll from top to bottom over 5s
    5. Stop tracing and save JSON to `.sisyphus/evidence/phase4-diagnostic/home-trace.json`
  Expected Result: Valid trace file exists and is parseable
  Evidence: `.sisyphus/evidence/phase4-diagnostic/home-trace.json`

Scenario: Interaction latency probe
  Tool: Playwright
  Preconditions: Dev server running
  Steps:
    1. Navigate to `http://localhost:3000/`
    2. Click navbar dropdown trigger and timestamp visible state
    3. Hover a program card and timestamp hover-visible state
    4. Open/close mobile menu at 375px viewport and timestamp render completion
  Expected Result: Interaction timings recorded and comparable pre/post
  Evidence: `.sisyphus/evidence/phase4-diagnostic/interaction-metrics.json`

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately)
- Task 0: Delta diagnostic + baseline refresh
- Task 1: UnicornStudio lifecycle gating on affected routes

Wave 2 (After Wave 1)
- Task 2: Preloader overlap deferral for heavy initializers
- Task 3: AnimatedCursor event-pressure reduction
- Task 4: Blend/compositing hotspot mitigation

Wave 3 (After Wave 2)
- Task 5: Dead `grad-bootcamp` originals cleanup (safe residue)
- Task 6: ScrollBackground filter cost mitigation (if trace-proven)

Wave 4 (After Wave 3)
- Task 7: Final verification + comparison report

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|----------------------|
| 0 | None | 2,3,4,6,7 | 1 |
| 1 | None | 7 | 0 |
| 2 | 0,1 | 7 | 3,4 |
| 3 | 0 | 7 | 2,4 |
| 4 | 0 | 7 | 2,3 |
| 5 | 0 | 7 | 6 |
| 6 | 0 | 7 | 5 |
| 7 | 0-6 | None | None |

---

## TODOs

- [ ] 0. Run Delta Diagnostic First (No Guesswork)

  **What to do**:
  - Reconfirm test harness health.
  - Capture fresh traces + interaction metrics on:
    - `/`
    - `/programs/product-team`
  - Produce ranked top-3 frame-time contributors per route.

  **Must NOT do**:
  - No code changes before this task completes.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1

  **References**:
  - `playwright.config.ts` - existing test driver configuration
  - `PERFORMANCE.md` - prior baseline context

  **Acceptance Criteria**:
  - [ ] `npm run test` succeeds
  - [ ] `npm run test:e2e` succeeds
  - [ ] Diagnostic traces saved under `.sisyphus/evidence/phase4-diagnostic/`
  - [ ] Diagnostic summary exists with top-3 contributors per route

- [ ] 1. Add UnicornStudio Lifecycle Gating (Residual Gap)

  **What to do**:
  - Add visibility + page-state lifecycle controls for UnicornStudio-backed sections.
  - Ensure hidden/offscreen sections do not keep unnecessary render work active.

  **Must NOT do**:
  - Do not remove UnicornStudio or visual features.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`vercel-react-best-practices`]

  **References**:
  - `app/components/UnicornHeroBackground.tsx` - Unicorn entrypoint behavior
  - `app/components/HomeProgramsSection.tsx` - embed initialization pattern
  - `app/components/HeroScene.tsx` and `app/components/Newsletter.tsx` - existing IO patterns

  **Acceptance Criteria**:
  - [ ] Offscreen Unicorn sections stop or minimize active work
  - [ ] No regression in visual behavior on all affected routes
  - [ ] Trace comparison shows reduced long-task or frame-cost pressure

- [ ] 2. Defer Heavy Initializers Until Preloader Exit

  **What to do**:
  - Prevent hidden-under-preloader heavy systems from eagerly doing work during the preloader window.
  - Sequence startup so expensive effects begin when actually visible/needed.

  **Must NOT do**:
  - Do not remove or visually alter preloader flow.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`vercel-composition-patterns`]

  **References**:
  - `app/components/Preloader.tsx` - preloader lifecycle
  - `app/layout.tsx` - global wrapper mount order
  - `app/components/HomeHeroSection.tsx` - hero-level heavy effects

  **Acceptance Criteria**:
  - [ ] Preloader phase does not run avoidable hidden heavy work
  - [ ] No startup interaction regression
  - [ ] Trace shows lower startup main-thread pressure

- [ ] 3. Reduce Global Cursor Event Pressure

  **What to do**:
  - Reduce event churn from document-level cursor mode checks while preserving behavior.
  - Ensure hover mode switching remains responsive and accurate.

  **Must NOT do**:
  - Do not remove custom cursor feature.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`vercel-react-best-practices`]

  **References**:
  - `app/components/AnimatedCursor.tsx` - document-level hover listeners
  - `app/components/Providers.tsx` - cursor gating policy

  **Acceptance Criteria**:
  - [ ] Cursor mode switching remains functionally identical
  - [ ] Reduced handler pressure under rapid pointer movement
  - [ ] No memory/listener leak after route changes

- [ ] 4. Mitigate Blend/Compositing Hotspots in Scroll Paths

  **What to do**:
  - Target only trace-proven expensive blend/filter layers in active scroll paths.
  - Apply minimal equivalent visual strategy where needed.

  **Must NOT do**:
  - No broad style redesign
  - No blanket removal of all blur/filter classes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **References**:
  - `app/components/Navbar.tsx` - backdrop blur usage
  - `app/components/HeroWarpCanvas.tsx` - full-viewport blend layer
  - `app/components/HomeProgramsSection.tsx` - blend + blur overlays

  **Acceptance Criteria**:
  - [ ] Paint/composite cost is reduced on measured scroll traces
  - [ ] Visual output remains equivalent for key journeys

- [ ] 5. Remove Dead Large Originals from `public/grad-bootcamp`

  **What to do**:
  - Remove legacy heavy originals confirmed to have `.webp` replacements and zero code references.
  - Re-verify no broken references.

  **Must NOT do**:
  - Do not delete referenced assets

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **References**:
  - `public/grad-bootcamp/` - oversized originals
  - `app/programs/grad-bootcamp/page.tsx` - active image references

  **Acceptance Criteria**:
  - [ ] Removed files are unreferenced
  - [ ] Build passes after cleanup
  - [ ] Public asset footprint decreases

- [ ] 6. Optimize ScrollBackground Filter If Trace-Proven

  **What to do**:
  - If diagnostics show `ScrollBackground` filter overhead, replace with equivalent lower-cost approach.
  - Keep aesthetic intent unchanged.

  **Must NOT do**:
  - No visual identity change

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`frontend-ui-ux`]

  **References**:
  - `app/components/ScrollBackground.tsx` - fixed background filter pipeline

  **Acceptance Criteria**:
  - [ ] Trace confirms reduced frame/painters cost when mitigation applied
  - [ ] Visual equivalence confirmed with screenshot checks

- [ ] 7. Final Verification and Comparison Report

  **What to do**:
  - Re-run diagnostic scenarios.
  - Compare pre/post metrics and summarize outcomes + residual risks.

  **Must NOT do**:
  - No subjective-only summary; evidence-backed only.

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: [`playwright`]

  **References**:
  - `.sisyphus/evidence/phase4-diagnostic/`
  - `.sisyphus/evidence/phase4-final/`

  **Acceptance Criteria**:
  - [ ] Before/after table for interaction and frame metrics
  - [ ] Build/test gates pass
  - [ ] Residual risk list and follow-up recommendations documented

---

## Commit Strategy

| After Task | Message | Verification |
|------------|---------|--------------|
| 1-2 | `perf(runtime): gate residual heavy lifecycle work` | lint + typecheck + build |
| 3-4 | `perf(interaction): reduce cursor/compositing pressure` | traces + interaction checks |
| 5-6 | `chore(perf): remove dead assets and tune background cost` | build + route checks |
| 7 | `docs(perf): add phase4 comparison report` | report completeness |

---

## Success Criteria

### Verification Commands
```bash
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

### Final Checklist
- [ ] All Must Have items completed
- [ ] All guardrails respected
- [ ] Evidence artifacts saved under `.sisyphus/evidence/`
- [ ] Measured lag reduction demonstrated on target routes
- [ ] No functionality/interactivity regressions
