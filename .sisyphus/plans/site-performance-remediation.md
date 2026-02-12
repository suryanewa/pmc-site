# Site Performance Remediation Plan

## TL;DR

> **Quick Summary**: Reduce scroll and interaction jank by targeting the highest-cost runtime paths first (WebGL/canvas lifecycle, scroll handlers, layout-thrashing reads, blur/compositing pressure), then harden bundle/media loading and regressions with automated QA.
>
> **Deliverables**:
> - Baseline + post-change performance evidence (Lighthouse + interaction checks)
> - Runtime optimizations across home/shared components
> - Test setup + automated regression checks (tests-after strategy)
> - CI-safe rollout with objective pass/fail criteria
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Baseline -> Scroll/runtime hotpaths -> WebGL/canvas gating -> Bundle/media -> Final verification

---

## Context

### Original Request
Website is very slow, especially while scrolling and interacting. Run comprehensive audit and implement optimizations.

### Interview Summary
- User requested exhaustive search/analyze mode and comprehensive optimization.
- Parallel audits identified critical hotspots in:
  - `app/components/SmoothScroll.tsx`
  - `app/components/HeroWarpCanvas.tsx`
  - `components/AsciiHoverEffect.tsx`
  - `components/ui/timeline.tsx`
  - `components/motion-primitives/progressive-blur.tsx`
  - `app/components/HomeProgramsSection.tsx`
- Test infra currently absent; user selected **Tests after setup**.

### Metis Review (addressed)
- Lock down scope creep with hard guardrails (no library rewrites, no backend/API work, no feature work).
- Add explicit quantitative baseline and post-change thresholds.
- Include edge-case QA for reduced-motion, resize breakpoint flips, and CDN/WebGL failure tolerance.
- Track preloader/LCP and Unicorn embed load strategy as explicit decision points.

---

## Work Objectives

### Core Objective
Improve runtime responsiveness and perceived load performance for core user journeys (home and high-traffic shared interactions) without changing product behavior.

### Concrete Deliverables
- Performance baseline artifacts for key routes.
- Optimized scroll/interaction paths for core runtime hotspots.
- Reduced unnecessary GPU/compositing pressure.
- Improved loading strategy for heavy visual modules and media.
- Automated verification setup and CI-compatible quality gate.

### Definition of Done
- [x] `npm run lint && npm run typecheck && npm run build` passes.
- [x] Lighthouse and interaction evidence captured before/after for key routes.
- [x] No regression in accessibility/visual correctness on desktop/mobile.
- [x] All plan tasks verified with agent-executed QA scenarios only.

### Must Have
- Target the identified high-impact hotspots first.
- Establish and enforce measurable pass/fail performance criteria.
- Keep behavior/UI intent intact.

### Must NOT Have (Guardrails)
- No backend/Supabase/API redesign.
- No animation library replacement/rewrite.
- No unrelated feature or visual redesign scope.
- No human-only acceptance criteria.

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> All verification is agent-executed via tools. No manual testing steps are allowed in acceptance criteria.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: YES (tests-after setup)
- **Framework**: Vitest + React Testing Library + Playwright (E2E checks)

### Test Setup (tests-after)
- Add minimal test infrastructure first, then apply optimization waves, then attach targeted automated checks to each wave.

### Agent-Executed QA Scenarios (applies to every task)
Each task includes:
- One happy-path scenario
- One negative/error scenario
- Concrete command/selectors/assertions
- Captured evidence path under `.sisyphus/evidence/`

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately)
- Task 1: Baseline + instrumentation setup
- Task 2: Test infrastructure + QA harness setup

Wave 2 (After Wave 1)
- Task 3: Scroll pipeline and listener optimization
- Task 4: Timeline/layout-thrash remediation
- Task 5: Navbar and hover interaction de-jank

Wave 3 (After Wave 2)
- Task 6: WebGL/canvas lifecycle gating and offscreen pause
- Task 7: Blur/compositing and paint-cost optimization

Wave 4 (After Wave 3)
- Task 8: Bundle/media loading strategy optimization
- Task 9: Regression validation + performance comparison report

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|----------------------|
| 1 | None | 3-9 | 2 |
| 2 | None | 9 | 1 |
| 3 | 1 | 6,9 | 4,5 |
| 4 | 1 | 9 | 3,5 |
| 5 | 1 | 9 | 3,4 |
| 6 | 3 | 8,9 | 7 |
| 7 | 3 | 9 | 6 |
| 8 | 6 | 9 | None |
| 9 | 1-8 | None | None |

---

## TODOs

- [x] 1. Baseline Performance Capture

  **What to do**:
  - Capture baseline Lighthouse JSON for key routes.
  - Capture bundle output summary and interaction trace evidence.
  - Record baseline in `.sisyphus/evidence/perf-baseline/`.

  **Must NOT do**:
  - Do not optimize before baseline evidence is stored.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 3-9
  - **Blocked By**: None

  **References**:
  - `app/page.tsx` - main landing composition.
  - `app/components/HomeProgramsSection.tsx` - heavy interactive/program card area.
  - `app/components/HeroWarpCanvas.tsx` - canvas hotspot.

  **Acceptance Criteria**:
  - [x] Lighthouse baseline artifacts saved for home + two secondary routes.
   - [x] Interaction trace evidence saved (scroll + hover scenarios).
   - [x] Baseline summary markdown saved under `.sisyphus/evidence/perf-baseline/summary.md`.

  **Agent-Executed QA Scenarios**:
  ```text
  Scenario: Baseline home metrics capture
    Tool: Bash + Playwright
    Steps:
      1. Run dev server and open home route.
      2. Run Lighthouse headless export JSON.
      3. Save JSON to .sisyphus/evidence/perf-baseline/home.json.
    Expected Result: Baseline metrics file exists and is parseable JSON.
  Scenario: Baseline interaction trace
    Tool: Playwright
    Steps:
      1. Navigate to home.
      2. Perform scripted full-page scroll and card hover path.
      3. Capture screenshot and trace export.
    Expected Result: Trace and screenshot artifacts saved.
  ```

- [x] 2. Set Up Test and QA Harness (Tests-After Strategy)

  **What to do**:
  - Install/configure Vitest + RTL + Playwright (minimal footprint).
  - Add scripts for local and CI execution.
  - Add one smoke test and one route-level Playwright check.

  **Must NOT do**:
  - No broad snapshot-golden expansion.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 9
  - **Blocked By**: None

  **References**:
  - `package.json` - scripts/deps baseline.
  - `.github/workflows/ci.yml` - CI gate integration point.

  **Acceptance Criteria**:
  - [x] `npm run test` executes successfully.
   - [x] `npm run test:e2e` executes one smoke scenario.
   - [x] CI includes test jobs without breaking existing gates.

- [x] 3. Scroll Pipeline Optimization (Lenis/GSAP/listeners)

  **What to do**:
  - Reduce unnecessary scroll-linked work.
  - Ensure listener/passive strategy is consistent.
  - Pause scroll animation work when offscreen/hidden where applicable.

  **Must NOT do**:
  - No library replacement.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `vercel-react-best-practices`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4,5)
  - **Blocks**: Tasks 6,9
  - **Blocked By**: Task 1

  **References**:
  - `app/components/SmoothScroll.tsx` - scroll loop integration.
  - `app/components/GsapScrollEffects.tsx` - scroll-linked effect boundary.

  **Acceptance Criteria**:
  - [x] No duplicated scroll update loops in steady-state.
   - [x] Hidden-tab/offscreen behavior avoids unnecessary animation work.
   - [x] Scroll interaction trace shows reduced long tasks vs baseline.

- [x] 4. Timeline Layout-Thrash Remediation

  **What to do**:
  - Remove/limit repeated hot-path layout reads.
  - Batch DOM reads/writes and schedule recalculation appropriately.

  **Must NOT do**:
  - Do not alter timeline UX behavior.

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: `vercel-react-best-practices`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 9
  - **Blocked By**: Task 1

  **References**:
  - `components/ui/timeline.tsx` - identified reflow hotspot.

  **Acceptance Criteria**:
  - [x] Continuous scroll no longer triggers excessive forced reflow patterns.
   - [x] Visual parity maintained on timeline labels and active states.

- [x] 5. Interaction De-Jank for Navbar/Hover Components

  **What to do**:
  - Reduce unnecessary rerender frequency from scroll/hover handlers.
  - Stabilize event scheduling and expensive transforms.

  **Must NOT do**:
  - No behavior changes to navigation hierarchy.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: `vercel-composition-patterns`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 9
  - **Blocked By**: Task 1

  **References**:
  - `app/components/Navbar.tsx`
  - `components/AsciiHoverEffect.tsx`
  - `app/components/InteractivePolaroids.tsx`

  **Acceptance Criteria**:
  - [x] Scroll/hover interactions remain smooth under scripted stress path.
   - [x] No listener leak after mount/unmount cycles.

- [x] 6. WebGL/Canvas Lifecycle Gating

  **What to do**:
  - Ensure heavy canvas/WebGL effects mount/start only when needed.
  - Pause/stop loops when offscreen, hidden, or reduced-motion context.

  **Must NOT do**:
  - No removal of required visuals without fallback.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `frontend-ui-ux`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 7)
  - **Blocks**: Tasks 8,9
  - **Blocked By**: Task 3

  **References**:
  - `app/components/HeroWarpCanvas.tsx`
  - `app/components/HomeProgramsSection.tsx`
  - `app/components/Newsletter.tsx`
  - `app/components/HeroScene.tsx`

  **Acceptance Criteria**:
  - [x] Offscreen sections do not run continuous heavy loops.
   - [x] Reduced-motion mode disables/degrades heavy effects safely.

- [x] 7. Compositing/Paint Cost Optimization (Blur/Blend/Effects)

  **What to do**:
  - Reduce excessive backdrop-filter/compositing pressure.
  - Keep visual identity while lowering paint cost.

  **Must NOT do**:
  - No broad style redesign.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: `frontend-design`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 9
  - **Blocked By**: Task 3

  **References**:
  - `components/motion-primitives/progressive-blur.tsx`
  - `app/components/Navbar.tsx`

  **Acceptance Criteria**:
  - [x] Scroll trace shows lower paint/composite burden than baseline.
   - [x] Component visuals remain functionally equivalent.

- [x] 8. Bundle and Media Loading Optimization

  **What to do**:
  - Improve dynamic loading boundaries for heavy modules.
  - Ensure images/components use performant loading strategy.

  **Must NOT do**:
  - No feature-level route restructuring.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: `vercel-react-best-practices`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4
  - **Blocks**: Task 9
  - **Blocked By**: Task 6

  **References**:
  - `app/components/Providers.tsx`
  - `app/components/Preloader.tsx`
  - `next.config.ts`
  - pages/components using `next/image` and raw images

  **Acceptance Criteria**:
  - [x] Main route JS payload does not regress and preferably decreases.
   - [x] Heavy visual modules are no longer eagerly paid on first paint when avoidable.

- [x] 9. Final Regression Verification and Performance Report

  **What to do**:
  - Re-run baseline suite and compare results.
  - Produce final report with diffs and residual risks.

  **Must NOT do**:
  - No subjective-only conclusion; evidence-backed only.

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Final
  - **Blocks**: None
  - **Blocked By**: Tasks 1-8

  **References**:
  - `.sisyphus/evidence/perf-baseline/*`
  - post-optimization evidence outputs

  **Acceptance Criteria**:
  - [x] Before/after table for LCP, INP, CLS, TBT, and Lighthouse performance score.
   - [x] Clear pass/fail against thresholds.
   - [x] Remaining known issues documented with severity.

---

## Commit Strategy

| After Task | Message | Verification |
|------------|---------|--------------|
| 1-2 | `chore(perf): establish baseline and test harness` | lint, typecheck, build, test smoke |
| 3-5 | `perf(interactions): reduce scroll and hover jank` | perf trace + Playwright scenarios |
| 6-8 | `perf(runtime): gate heavy effects and optimize loading` | Lighthouse and bundle checks |
| 9 | `docs(perf): add before-after report and residual risks` | report completeness |

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

### Target Metrics (defaults applied)
- LCP: < 2.5s on key route test runs
- INP: < 200ms on scripted interaction runs
- CLS: < 0.1
- TBT: < 300ms

### Final Checklist
- [x] All Must Have items complete.
- [x] All Must NOT Have guardrails respected.
- [x] All evidence artifacts saved under `.sisyphus/evidence/`.
- [x] Final comparison report completed and reproducible.

---

## Decision Resolution (User Confirmed)

- **Execution Profile**: Brand-Priority
  - Keep current preloader feel in `app/components/Preloader.tsx`.
  - Keep Unicorn program-card embeds in `app/components/HomeProgramsSection.tsx`.
  - Optimize via scheduling/lifecycle gating and surrounding runtime improvements rather than visual-effect removal.

## Defaults Applied (Ambiguous but safe)
- Home route and shared interaction components prioritized first.
- No animation-library replacement; optimization is lifecycle/scheduling-focused.
- Tests-after setup via Vitest/RTL/Playwright.
