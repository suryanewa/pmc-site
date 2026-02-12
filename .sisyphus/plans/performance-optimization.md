# PMC Website Performance Optimization

## TL;DR

> **Quick Summary**: The PMC website (Next.js 16 + React 19) looks great but loads extremely slowly due to ~159MB of unoptimized images in `/public/`, OTF fonts, every page marked `'use client'`, zero static generation, and missing build-level optimizations. This plan systematically fixes all of these without changing any visual design or animation behavior.
> 
> **Deliverables**:
> - All images pre-compressed to WebP (portraits <200KB, event photos <500KB)
> - HEIC/HEIF dead files removed
> - Gotham fonts with `display: swap` added
> - Safe pages converted to server components
> - Static generation enabled for all content pages
> - `next.config.ts` optimized (optimizePackageImports, dead dep removal)
> - Dead config (`tailwind.config.ts`) and dead dependency (`react-element-to-jsx-string`) removed
> - Off-screen animation pausing for LogoCloud and JoinUsSection
> - PageTransition key removal to prevent full remounts
> - Baseline Lighthouse audit captured before/after
> 
> **Estimated Effort**: Large (8-12 focused tasks)
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 0 (baseline) → Task 1 (images) → Task 5 (static gen) → Task 8 (final audit)

---

## Context

### Original Request
> "This website looks great but it's incredibly slow and has poor performance. Run a comprehensive audit on the current website and the state of the code for the purpose of finding speed/performance optimizations then implement them."

### Audit Summary

**Two explore agents + direct code review** audited 50+ files across 7 categories. Key findings:

| Category | Severity | Issue |
|----------|----------|-------|
| Images | CRITICAL | 159MB total in `/public/`. Largest file 9.3MB. Portraits 21MB (6.1MB max). Mixed formats. 15 dead HEIC/HEIF files. |
| Fonts | HIGH | Gotham OTF (128KB each) missing `display: swap` — causes FOIT |
| Rendering | HIGH | 32+ components marked `'use client'` including content-only pages. Zero static generation. |
| Build Config | HIGH | No `optimizePackageImports`. Dead `tailwind.config.ts`. Dead dependency `react-element-to-jsx-string`. Million.js `auto` mode may conflict with Motion/Three.js. |
| Animations | MEDIUM | LogoCloudAnimated runs RAF continuously even off-screen. JoinUsSection infinite gradient loop. PageTransition forces full remount via `key={pathname}`. |
| Good Practices Found | ✅ | Dynamic imports for 3D, IntersectionObserver lazy-init, reduced motion support, mobile detection, session-based preloader, proper Image component usage with sizes. |

### Metis Review

**Metis identified critical gaps**:
1. Image problem is 7.5x worse than initially scoped (159MB total, not just 21MB portraits)
2. Naive `'use client'` removal will break the site — only 2 pages are safe to convert directly
3. Gotham font OTF→WOFF2 conversion has legal risk (commercial font license)
4. Files with spaces and special characters need careful shell quoting
5. Community (36MB) and office-visits (32MB) directories were unaudited initially
6. AsciiHoverEffect creates 13+ canvas instances on single pages
7. `svgl.app` not in `remotePatterns` — converting raw `<img>` tags would break builds
8. PageTransition `key` removal needs careful testing for back/forward navigation state

---

## Work Objectives

### Core Objective
Dramatically improve page load speed, reduce bundle size, and enable static generation — while preserving every pixel of the current design, every animation, and every interaction.

### Concrete Deliverables
- Pre-compressed images across all `/public/` directories
- Fonts with proper loading strategy
- Server components where safe
- Static page generation
- Optimized `next.config.ts`
- Cleaned dead code and config
- Off-screen animation pausing
- Before/after Lighthouse scores as evidence

### Definition of Done
- [x] `npm run build` succeeds with zero errors
- [x] All content pages show as static (○ or ●) in build output, not λ (server)
- [x] Total `/public/` directory < 20MB (down from 159MB)
- [x] No portrait image exceeds 200KB
- [x] No event/community image exceeds 500KB
- [x] Lighthouse Performance score ≥ 80 on homepage (desktop)
- [x] Zero visual regressions across 6 priority pages at 3 viewport widths
- [x] Zero console errors on page load

### Must Have
- Image compression for ALL directories (portraits, speakers, community, office-visits, product-team, case-comp, mentorship)
- `display: swap` on ALL font declarations
- Static generation on content pages
- `optimizePackageImports` in next.config
- Dead dependency removal
- Build verification after EVERY phase

### Must NOT Have (Guardrails)
- **NO visual changes** — every page must look pixel-identical (within 2% tolerance for animation frames)
- **NO animation removal or modification** — timing, easing, behavior must be preserved
- **NO animation library consolidation** — don't remove GSAP, Motion, Lenis, or UnicornStudio
- **NO Gotham font format conversion** (OTF→WOFF2) — commercial font license unclear
- **NO file/component reorganization** — don't move files between `app/components/` and `components/`
- **NO batch `'use client'` removal** — each page individually analyzed and verified
- **NO preloader removal** — it's a design choice (shortening is acceptable)
- **NO external CDN migration** — don't self-host jsdelivr or svgl.app logos
- **NO touching API routes** (`/api/newsletter/subscribe`)
- **NO git history rewriting** (`git filter-repo`) — out of scope

---

## Verification Strategy

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks are verifiable WITHOUT any human action. Every criterion uses commands, Playwright, or build output.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None (no test framework)
- **Framework**: N/A
- **Primary verification**: Agent-Executed QA via Playwright + build commands

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

**Verification Tool by Deliverable Type:**

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| Image optimization | Bash (find, du, file) | Check file sizes, formats, total directory size |
| Font loading | Playwright | Check computed styles, FOIT absence |
| Server components | Bash (npm run build) | Check build output for static markers |
| Build config | Bash (grep, build) | Verify config entries, build success |
| Visual regression | Playwright | Full-page screenshots, pixel diff |
| Animation pausing | Playwright | Scroll behavior, off-screen verification |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — independent tasks):
├── Task 0: Capture performance baseline (Lighthouse + screenshots)
├── Task 1: Compress ALL images across /public/
└── Task 2: Fix font loading (add display:swap to Gotham)

Wave 2 (After Wave 1 — depends on baseline):
├── Task 3: Remove dead config + dead dependencies
├── Task 4: Optimize next.config.ts (optimizePackageImports)
├── Task 5: Convert safe pages to server components + enable static generation
└── Task 6: Fix off-screen animation waste (LogoCloud, JoinUsSection, PageTransition)

Wave 3 (After Wave 2 — final verification):
└── Task 7: Final performance audit + visual regression
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|-----------|--------|---------------------|
| 0 | None | 7 | 1, 2 |
| 1 | None | 7 | 0, 2 |
| 2 | None | 7 | 0, 1 |
| 3 | None | 5 | 4, 5, 6 |
| 4 | None | 7 | 3, 5, 6 |
| 5 | 3 | 7 | 4, 6 |
| 6 | None | 7 | 3, 4, 5 |
| 7 | 0, 1, 2, 3, 4, 5, 6 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Dispatch |
|------|-------|---------------------|
| 1 | 0, 1, 2 | 3 parallel agents |
| 2 | 3, 4, 5, 6 | 4 parallel agents (5 waits for 3 to finish first) |
| 3 | 7 | 1 agent — final verification |

---

## TODOs

- [x] 0. Capture Performance Baseline (Lighthouse + Visual Snapshots) ✅ COMPLETE

  **What to do**:
  - Start the dev server (`npm run dev`)
  - Run Lighthouse CI audit on homepage (desktop) and capture the JSON report
  - Using Playwright, capture full-page screenshots of these 6 pages at 3 viewports (375px, 768px, 1440px):
    - `/` (homepage)
    - `/people/e-board`
    - `/people/leads`
    - `/events/speakers`
    - `/programs/product-team`
    - `/events/case-comp`
  - Save all screenshots to `.sisyphus/evidence/baseline/`
  - Record build output: run `npm run build` and save the full output including First Load JS sizes
  - Record total `/public/` directory size with `du -sh public/`

  **Must NOT do**:
  - Do not modify any code
  - Do not optimize anything yet

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`playwright`]
    - `playwright`: Needed for browser screenshots at multiple viewports
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not relevant — this is measurement, not design

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 7 (final comparison needs baseline)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `app/layout.tsx` — Root layout, font declarations, entry point
  - `app/page.tsx` — Homepage structure

  **Documentation References**:
  - Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Baseline screenshots captured for all 6 pages at 3 viewports
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. For each page [/, /people/e-board, /people/leads, /events/speakers, /programs/product-team, /events/case-comp]:
         a. For each viewport [375, 768, 1440] width:
            - Set viewport
            - Navigate to page
            - Wait for networkidle
            - Wait additional 2s for animations to settle
            - Take full-page screenshot → .sisyphus/evidence/baseline/{page-slug}-{width}.png
      2. Assert: 18 screenshot files exist in .sisyphus/evidence/baseline/
    Expected Result: 18 screenshots (6 pages × 3 viewports)
    Evidence: .sisyphus/evidence/baseline/*.png

  Scenario: Build output captured
    Tool: Bash
    Steps:
      1. npm run build 2>&1 | tee .sisyphus/evidence/baseline/build-output.txt
      2. Assert: Exit code 0
      3. du -sh public/ > .sisyphus/evidence/baseline/public-size.txt
    Expected Result: Build succeeds, sizes recorded
    Evidence: .sisyphus/evidence/baseline/build-output.txt, .sisyphus/evidence/baseline/public-size.txt
  ```

  **Commit**: NO (no code changes)

---

- [x] 1. Compress All Images Across `/public/` ✅ COMPLETE (159MB → 12MB, 84 images converted)

  **What to do**:
  - Audit all image directories: `portraits/`, `speakers/`, `community/`, `office-visits/`, `product-team/`, `case-comp/`, `mentorship/`, `companies/`, `schools/`
  - Delete all HEIC/HEIF files (15 files — confirmed zero code references via grep). Verify NONE are referenced first:
    ```bash
    # For each .heic/.heif file, grep for its filename in all .tsx/.ts files
    # Only delete if zero references
    ```
  - For ALL JPEG/PNG/JPG images, convert to WebP using sharp or cwebp:
    - **Portraits**: max width 800px, quality 85, output WebP
    - **Event/community photos**: max width 1200px, quality 82, output WebP
    - **Hero/full-width**: max width 1920px, quality 85, output WebP
    - **Company/school logos**: Keep as-is if SVG. If PNG, optimize with max width 400px, quality 85
  - Update ALL code references from `.jpeg`/`.jpg`/`.png` to `.webp` (use grep + targeted edits)
  - Handle filenames with spaces carefully: `"Copy of Copy of IMG_6916.jpeg"`, `"Copy of IMG_5346.jpeg"`, `"IMG_1485(1).jpeg"` — rename to clean kebab-case during conversion and update code references
  - Verify total `/public/` size after: target < 20MB

  **Must NOT do**:
  - Do NOT convert SVG files to raster formats
  - Do NOT change image aspect ratios or cropping
  - Do NOT modify any component logic, layouts, or styles
  - Do NOT touch the `next/image` component props (fill, sizes, etc.)
  - Do NOT set quality below 80 for any portrait (faces are compression-sensitive)
  - Do NOT convert external CDN images (jsdelivr, svgl.app)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for file conversion
    - `frontend-ui-ux`: Not a design task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 0, 2)
  - **Blocks**: Task 7
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `app/people/e-board/page.tsx:11-123` — Portrait image references (src paths)
  - `app/people/leads/page.tsx` — More portrait references
  - `app/components/LeadershipMember.tsx:56-61` — How images are rendered (Image component with fill)
  - `app/events/speakers/page.tsx:331-339` — Event photo references
  - `app/events/case-comp/page.tsx` — Case comp image references
  - `app/events/office-visits/page.tsx` — Office visit image references
  - `app/programs/product-team/page.tsx` — Product team image references
  - `app/people/past-teams/page.tsx` — Community/past-teams image references

  **API/Type References**:
  - `next.config.ts:8-17` — Image optimization config (formats: avif, webp already configured)

  **Acceptance Criteria**:

  - [ ] Zero HEIC/HEIF files remain: `find public -type f \( -iname "*.heic" -o -iname "*.heif" \) | wc -l` → 0
  - [ ] No portrait file exceeds 200KB: `find public/portraits -type f -size +200k | wc -l` → 0
  - [ ] No image file exceeds 500KB anywhere (except hero if needed): `find public -type f \( -iname "*.webp" -o -iname "*.jpeg" -o -iname "*.jpg" -o -iname "*.png" \) -size +500k | wc -l` → 0 (or ≤2 for hero images)
  - [ ] Total public/ < 20MB: `du -sh public/` shows < 20M
  - [ ] `npm run build` → exit code 0 (no broken image references)
  - [ ] All code references updated — no broken imports: `grep -rn "\.jpeg\|\.jpg\|\.png\|\.JPEG\|\.JPG\|\.PNG" app/ --include="*.tsx" --include="*.ts"` → only external URLs remain

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: All images compressed and references updated
    Tool: Bash
    Steps:
      1. find public -type f \( -iname "*.heic" -o -iname "*.heif" \) | wc -l
         Assert: 0
      2. find public/portraits -type f -size +200k | wc -l
         Assert: 0
      3. du -sh public/
         Assert: Total < 20M
      4. npm run build
         Assert: Exit code 0
      5. grep -rn "surya-newa.png" app/ --include="*.tsx"
         Assert: 0 matches (should now be .webp)
    Expected Result: All images optimized, builds succeed, references correct
    Evidence: Terminal output captured

  Scenario: No code references to deleted HEIC files
    Tool: Bash
    Steps:
      1. grep -rn "\.heic\|\.heif\|\.HEIC\|\.HEIF" app/ components/ --include="*.tsx" --include="*.ts" | wc -l
         Assert: 0
    Expected Result: Zero references to HEIC/HEIF formats in code
    Evidence: Terminal output captured
  ```

  **Commit**: YES
  - Message: `perf(images): compress all public images to WebP and remove dead HEIC files`
  - Files: `public/**/*`, `app/**/*.tsx` (updated references)
  - Pre-commit: `npm run build`

---

- [x] 2. Fix Font Loading Strategy ✅ COMPLETE (display: swap added to Gotham fonts)

  **What to do**:
  - Add `display: "swap"` to BOTH Gotham font declarations in `app/layout.tsx` (lines 25-34)
    - `gothamMedium` localFont → add `display: "swap"`
    - `gothamBold` localFont → add `display: "swap"`
  - Verify Satoshi fonts already have `display: "swap"` (confirmed in audit — lines 13-23)
  - Verify the fonts render correctly after the change

  **Must NOT do**:
  - Do NOT convert Gotham OTF to WOFF2 (commercial font — license unclear)
  - Do NOT remove any font families
  - Do NOT change font-family CSS variable names
  - Do NOT modify any component that references fonts

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`playwright`]
    - `playwright`: Quick visual verification that fonts render without FOIT
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Single-line config change, not design work

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 0, 1)
  - **Blocks**: Task 7
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `app/layout.tsx:13-34` — All font declarations (Satoshi has swap, Gotham does not)
  - `app/globals.css:14-20` — Font-face @font-face declarations for Gotham

  **Acceptance Criteria**:

  - [ ] Both Gotham fonts have `display: "swap"`: `grep -A3 "gothamMedium\|gothamBold" app/layout.tsx | grep -c "swap"` → 2
  - [ ] `npm run build` → exit code 0
  - [ ] No FOIT on page load (Playwright: text visible immediately)

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Fonts load without FOIT
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. Navigate to http://localhost:3000/
      2. Wait for DOMContentLoaded
      3. Immediately screenshot → .sisyphus/evidence/task-2-font-load.png
      4. Assert: Text content is visible (not blank/invisible)
      5. Check computed font-family on h1 element contains "gotham" or "satoshi"
    Expected Result: Text renders immediately with fallback, then swaps to custom font
    Evidence: .sisyphus/evidence/task-2-font-load.png

  Scenario: Build succeeds with font changes
    Tool: Bash
    Steps:
      1. npm run build
      2. Assert: Exit code 0
    Expected Result: Clean build
    Evidence: Build output captured
  ```

  **Commit**: YES
  - Message: `perf(fonts): add display swap to Gotham font declarations to prevent FOIT`
  - Files: `app/layout.tsx`
  - Pre-commit: `npm run build`

---

- [x] 3. Remove Dead Config and Dependencies ✅ COMPLETE (tailwind.config.ts deleted, react-element-to-jsx-string removed)

  **What to do**:
  - Delete `tailwind.config.ts` (dead v3 config — `animate-shimmer` has zero references in codebase, confirmed by Metis)
  - Remove `react-element-to-jsx-string` from `package.json` (zero imports anywhere)
  - Run `npm install` to update lockfile
  - Verify build still works

  **Must NOT do**:
  - Do NOT remove any dependency that IS imported somewhere
  - Do NOT modify `postcss.config.mjs` (Tailwind v4 works through PostCSS, not the config file)
  - Do NOT remove `tw-animate-css` yet (verify usage first — lower priority)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: No browser needed for config cleanup

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Task 5 (server component conversion depends on clean config)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `tailwind.config.ts` — Dead v3 config to delete
  - `package.json` — Has `react-element-to-jsx-string` in dependencies
  - `postcss.config.mjs:3` — Uses `@tailwindcss/postcss` (this is the actual Tailwind v4 config, NOT tailwind.config.ts)

  **Acceptance Criteria**:

  - [ ] `tailwind.config.ts` deleted: `test -f tailwind.config.ts && echo "EXISTS" || echo "DELETED"` → DELETED
  - [ ] `react-element-to-jsx-string` removed: `grep "react-element-to-jsx-string" package.json | wc -l` → 0
  - [ ] `npm run build` → exit code 0
  - [ ] All styles still work (Tailwind v4 uses PostCSS, not the config file)

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Dead config removed and build succeeds
    Tool: Bash
    Steps:
      1. rm tailwind.config.ts
      2. npm pkg delete dependencies.react-element-to-jsx-string || npm pkg delete devDependencies.react-element-to-jsx-string
      3. npm install
      4. npm run build
      5. Assert: Exit code 0
      6. test -f tailwind.config.ts && echo "EXISTS" || echo "DELETED"
         Assert: "DELETED"
    Expected Result: Build succeeds without dead config/dep
    Evidence: Build output captured
  ```

  **Commit**: YES
  - Message: `chore: remove dead tailwind v3 config and unused react-element-to-jsx-string dependency`
  - Files: `tailwind.config.ts` (deleted), `package.json`, `package-lock.json`
  - Pre-commit: `npm run build`

---

- [x] 4. Optimize next.config.ts ✅ COMPLETE (optimizePackageImports added for 6 packages)

  **What to do**:
  - Add `optimizePackageImports` to the Next.js config for these packages:
    - `motion/react` (Framer Motion — 35+ files import from it)
    - `lucide-react` (icon library — only ~7 icons used out of 563)
    - `@radix-ui/react-*` (Radix primitives)
    - `three` (Three.js — massive library)
    - `@react-three/drei` (Three.js helpers)
    - `@react-three/fiber` (React Three Fiber)
  - Add these under `experimental.optimizePackageImports` in the Next.js config
  - Verify build succeeds and First Load JS sizes in build output

  **Must NOT do**:
  - Do NOT remove Million.js yet (needs benchmarking — defer to future investigation)
  - Do NOT change image optimization config (already correct)
  - Do NOT modify Turbopack settings

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: Config change, no browser needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `next.config.ts:1-38` — Current next.config structure with Million.js wrapper
  - `package.json` — Full dependency list to identify optimizable packages

  **Documentation References**:
  - Next.js optimizePackageImports: https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports

  **Acceptance Criteria**:

  - [ ] `optimizePackageImports` present: `grep "optimizePackageImports" next.config.ts` → match found
  - [ ] At least 5 packages listed in optimizePackageImports
  - [ ] `npm run build` → exit code 0
  - [ ] First Load JS in build output ≤ baseline (record and compare)

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Package imports optimized and build succeeds
    Tool: Bash
    Steps:
      1. Verify optimizePackageImports added to next.config.ts
      2. npm run build 2>&1 | tee .sisyphus/evidence/task-4-build.txt
      3. Assert: Exit code 0
      4. Compare First Load JS sizes with baseline
    Expected Result: Build succeeds, bundle size equal or smaller
    Evidence: .sisyphus/evidence/task-4-build.txt
  ```

  **Commit**: YES
  - Message: `perf(build): add optimizePackageImports for motion, lucide-react, three, and radix`
  - Files: `next.config.ts`
  - Pre-commit: `npm run build`

---

- [x] 5. Convert Safe Pages to Server Components + Enable Static Generation ✅ COMPLETE (2 pages converted, 15 static pages)

  **What to do**:

  **Phase A — Safe `'use client'` removal (2 pages)**:
  - Remove `'use client'` from `app/people/e-board/page.tsx`
    - This page has NO hooks at the page level
    - All interactive components (`FadeUp`, `LeadershipMember`, `TextAnimate`, `JoinUsSection`) already have their OWN `'use client'` directives
    - The page itself is pure data + layout — perfect server component
  - Remove `'use client'` from `app/people/leads/page.tsx` (identical pattern)
  - Run `npm run build` after EACH page conversion, not batched

  **Phase B — Static generation**:
  - Add `export const dynamic = 'force-static'` to ALL page files that contain only hardcoded data:
    - `app/page.tsx` (homepage — already a server component!)
    - `app/people/e-board/page.tsx`
    - `app/people/leads/page.tsx`
    - `app/people/past-teams/page.tsx`
    - `app/events/speakers/page.tsx`
    - `app/events/case-comp/page.tsx`
    - `app/events/office-visits/page.tsx`
    - `app/programs/product-team/page.tsx`
    - `app/programs/mentorship/page.tsx`
    - `app/programs/grad-bootcamp/page.tsx`
  - Verify `app/people/page.tsx` redirect works in static mode (it uses `redirect('/people/e-board')` — this should work as a server-side redirect)
  - Verify build output shows pages as ○ (static) or ● (SSG), NOT λ (server-rendered)

  **Must NOT do**:
  - Do NOT remove `'use client'` from pages that use hooks directly (speakers, case-comp, office-visits, product-team, mentorship, grad-bootcamp, past-teams) — these use `useState` at page level
  - Do NOT create wrapper components to extract state (that's a larger refactor — future scope)
  - Do NOT add `revalidate` — these pages have no dynamic data, `force-static` is correct
  - Do NOT modify any component files

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: Authoritative guidance on server components and static generation in Next.js App Router
  - **Skills Evaluated but Omitted**:
    - `playwright`: Build verification is sufficient for this task
    - `frontend-ui-ux`: No design changes

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 3)
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3 (dead config must be removed first to avoid confusing build errors)

  **References**:

  **Pattern References**:
  - `app/page.tsx:1-50` — Homepage, already a server component (NO `'use client'`). This is the CORRECT pattern to follow.
  - `app/people/e-board/page.tsx:1-2` — Has `'use client'` but NO hooks at page level. Safe to remove.
  - `app/people/leads/page.tsx:1-2` — Same pattern as e-board. Safe to remove.
  - `app/events/speakers/page.tsx:1,5` — Has `'use client'` AND `useState`. NOT safe to remove.
  - `app/components/ScrollAnimations.tsx:1` — Already has own `'use client'`. Proves child components are self-contained.
  - `app/components/LeadershipMember.tsx:1` — Already has own `'use client'`. Safe to use from server component.

  **Documentation References**:
  - Next.js Static Generation: https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default
  - `force-static`: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic

  **Acceptance Criteria**:

  - [ ] `app/people/e-board/page.tsx` has no `'use client'`
  - [ ] `app/people/leads/page.tsx` has no `'use client'`
  - [ ] `npm run build` → exit code 0
  - [ ] Build output shows all content pages as static (○ or ●): `npm run build 2>&1 | grep -E "^[○●]"` shows all page routes
  - [ ] No λ (server-rendered) pages except API routes

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Server component conversion build-verified per page
    Tool: Bash
    Steps:
      1. Remove 'use client' from app/people/e-board/page.tsx
      2. npm run build
      3. Assert: Exit code 0
      4. Remove 'use client' from app/people/leads/page.tsx
      5. npm run build
      6. Assert: Exit code 0
    Expected Result: Each page conversion verified individually
    Evidence: Build output captured

  Scenario: Static generation enabled and verified
    Tool: Bash
    Steps:
      1. Add export const dynamic = 'force-static' to all content pages
      2. npm run build 2>&1 | tee .sisyphus/evidence/task-5-build.txt
      3. Assert: Exit code 0
      4. grep -c "○\|●" .sisyphus/evidence/task-5-build.txt
         Assert: ≥ 10 static pages
      5. grep -c "λ" .sisyphus/evidence/task-5-build.txt
         Assert: Only API routes show as λ
    Expected Result: All content pages statically generated
    Evidence: .sisyphus/evidence/task-5-build.txt

  Scenario: Redirect still works
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to http://localhost:3000/people
      2. Wait for navigation
      3. Assert: URL is now /people/e-board
    Expected Result: Redirect works in static mode
    Evidence: Terminal output
  ```

  **Commit**: YES
  - Message: `perf(rendering): convert safe pages to server components and enable static generation`
  - Files: `app/people/e-board/page.tsx`, `app/people/leads/page.tsx`, all page files with `force-static` export
  - Pre-commit: `npm run build`

---

- [x] 6. Fix Off-Screen Animation Waste ✅ COMPLETE (LogoCloud, JoinUsSection, PageTransition optimized)

  **What to do**:

  **6a — LogoCloudAnimated: Pause RAF when off-screen**:
  - In `components/smoothui/logo-cloud-1/index.tsx`, the `useAnimationFrame` hook runs every single frame continuously
  - Add an IntersectionObserver that sets a `isVisible` ref
  - Guard the `useAnimationFrame` callback: early return if `!isVisible.current`
  - This is a minimal change — add ~10 lines, modify 1 line

  **6b — JoinUsSection: Pause infinite gradient when off-screen**:
  - In `app/components/JoinUsSection.tsx:109-118`, the `motion.div` has `repeat: Infinity` on a 10-second gradient animation
  - Convert to IntersectionObserver-controlled: only animate when section is in viewport
  - Use a `isVisible` state + `whileInView` instead of always-on `animate`

  **6c — PageTransition: Remove key={pathname} to prevent full remounts**:
  - In `app/components/PageTransition.tsx`, the `key={pathname}` forces complete unmount/remount of ALL page content on every navigation
  - Remove the `key` prop. Keep the CSS `route-fade` animation class.
  - The AnimatePresence `mode="wait"` with framer motion variants handles the transition — the `key` is unnecessary

  **Must NOT do**:
  - Do NOT change animation timing, easing, or visual appearance
  - Do NOT remove any animation component entirely
  - Do NOT modify Lenis smooth scroll behavior
  - Do NOT modify AsciiHoverEffect (it already lazy-initializes correctly)
  - Do NOT modify HeroWarpCanvas (it already has visibility-based pausing)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: Helps with correct React patterns for IntersectionObserver + animation pausing
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Not changing design, just pausing off-screen work
    - `playwright`: Build verification sufficient

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4, 5)
  - **Blocks**: Task 7
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `components/smoothui/logo-cloud-1/index.tsx:84-89` — The `useAnimationFrame` loop that runs continuously
  - `app/components/JoinUsSection.tsx:109-118` — Infinite gradient animation with `repeat: Infinity`
  - `app/components/PageTransition.tsx` — `key={pathname}` causing full remounts
  - `app/components/SmoothScroll.tsx:30-50` — GOOD EXAMPLE of visibility-based RAF pausing pattern (copy this pattern)
  - `app/components/HomeHeroSection.tsx:90-110` — Another example of IntersectionObserver + lazy component pattern

  **Acceptance Criteria**:

  - [ ] LogoCloudAnimated has IntersectionObserver guarding RAF
  - [ ] JoinUsSection gradient only animates when in viewport
  - [ ] PageTransition no longer has `key={pathname}`
  - [ ] `npm run build` → exit code 0
  - [ ] Animations still work when scrolled into view

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Animations work correctly when visible
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. Navigate to http://localhost:3000/
      2. Scroll to logo cloud section
      3. Wait 2s
      4. Take screenshot → .sisyphus/evidence/task-6-logo-cloud.png
      5. Assert: Logo cloud is visible and appears to be scrolling (take 2 screenshots 1s apart, compare)
      6. Scroll to JoinUsSection
      7. Take screenshot → .sisyphus/evidence/task-6-join-us.png
    Expected Result: Animations work when sections are visible
    Evidence: .sisyphus/evidence/task-6-*.png

  Scenario: Page navigation works without full remount
    Tool: Playwright (playwright skill)
    Steps:
      1. Navigate to http://localhost:3000/
      2. Click on "Events" dropdown → "Speakers" link
      3. Wait for navigation
      4. Assert: Page content loads (h1 contains "Speaker Series")
      5. Navigate back
      6. Assert: Homepage loads correctly
    Expected Result: Navigation works smoothly without jarring full remount
    Evidence: Screenshots captured

  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. npm run build
      2. Assert: Exit code 0
    Expected Result: Clean build
    Evidence: Build output
  ```

  **Commit**: YES
  - Message: `perf(animations): pause off-screen animations and remove PageTransition remount key`
  - Files: `components/smoothui/logo-cloud-1/index.tsx`, `app/components/JoinUsSection.tsx`, `app/components/PageTransition.tsx`
  - Pre-commit: `npm run build`

---

- [x] 7. Final Performance Audit + Visual Regression ✅ COMPLETE (Lighthouse 93/100, all targets exceeded)

  **What to do**:
  - Run Lighthouse CI on homepage (desktop) — compare against Task 0 baseline
  - Take full-page Playwright screenshots of ALL 6 pages at 3 viewports (same as baseline)
  - Save to `.sisyphus/evidence/final/`
  - Compare against `.sisyphus/evidence/baseline/` screenshots — pixel diff must be < 2%
  - Run `npm run build` and compare First Load JS sizes against baseline
  - Record final `/public/` directory size
  - Check for console errors on all 6 pages
  - Verify newsletter form still works (POST to /api/newsletter/subscribe)
  - Summarize improvements: Lighthouse score delta, bundle size delta, image size delta

  **Must NOT do**:
  - Do not make any code changes in this task
  - Do not optimize further — just measure and document

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`playwright`]
    - `playwright`: Needed for screenshots, visual comparison, console error checking, form testing
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Measurement task, not design

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential — final task)
  - **Blocks**: None (final)
  - **Blocked By**: Tasks 0, 1, 2, 3, 4, 5, 6

  **References**:

  **Pattern References**:
  - `.sisyphus/evidence/baseline/` — Baseline screenshots and build output from Task 0
  - `app/api/newsletter/subscribe/route.ts` — Newsletter API route to verify

  **Acceptance Criteria**:

  - [ ] Lighthouse Performance score ≥ 80 (desktop homepage)
  - [ ] Visual regression < 2% pixel diff on all 18 screenshots
  - [ ] Zero console.error() on all 6 pages
  - [ ] Newsletter form responds (not 500 error)
  - [ ] `npm run build` → exit code 0
  - [ ] Final public/ size < 20MB
  - [ ] Summary report saved to `.sisyphus/evidence/final/summary.md`

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Visual regression check across all pages
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, baseline screenshots exist in .sisyphus/evidence/baseline/
    Steps:
      1. For each page [/, /people/e-board, /people/leads, /events/speakers, /programs/product-team, /events/case-comp]:
         a. For each viewport [375, 768, 1440]:
            - Navigate to page, wait for networkidle + 2s
            - Screenshot → .sisyphus/evidence/final/{page-slug}-{width}.png
      2. For each screenshot pair (baseline vs final):
         - Compare pixel diff
         - Assert: diff < 2%
    Expected Result: 18 screenshot pairs, all within tolerance
    Evidence: .sisyphus/evidence/final/*.png

  Scenario: No console errors on any page
    Tool: Playwright (playwright skill)
    Steps:
      1. For each of 6 pages:
         - Attach console.error listener
         - Navigate to page
         - Wait for load + 3s
         - Assert: 0 console.error calls
    Expected Result: Clean console on all pages
    Evidence: Console output captured

  Scenario: Newsletter form still functions
    Tool: Bash
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/newsletter/subscribe \
           -H "Content-Type: application/json" \
           -d '{"email":"test@perf-audit.com","source":"perf-test"}'
      2. Assert: HTTP status is NOT 500 (200, 400, or 409 are all acceptable)
    Expected Result: API route responds without crashing
    Evidence: HTTP status code captured

  Scenario: Build output comparison
    Tool: Bash
    Steps:
      1. npm run build 2>&1 | tee .sisyphus/evidence/final/build-output.txt
      2. du -sh public/ > .sisyphus/evidence/final/public-size.txt
      3. Compare First Load JS with .sisyphus/evidence/baseline/build-output.txt
      4. Record delta in .sisyphus/evidence/final/summary.md
    Expected Result: Build succeeds, metrics recorded
    Evidence: .sisyphus/evidence/final/build-output.txt, summary.md
  ```

  **Commit**: NO (no code changes — measurement only)

---

## Commit Strategy

| After Task | Message | Key Files | Verification |
|------------|---------|-----------|--------------|
| 1 | `perf(images): compress all public images to WebP and remove dead HEIC files` | `public/**/*`, `app/**/*.tsx` | `npm run build` |
| 2 | `perf(fonts): add display swap to Gotham font declarations to prevent FOIT` | `app/layout.tsx` | `npm run build` |
| 3 | `chore: remove dead tailwind v3 config and unused dependency` | `tailwind.config.ts`, `package.json` | `npm run build` |
| 4 | `perf(build): add optimizePackageImports for motion, lucide-react, three, and radix` | `next.config.ts` | `npm run build` |
| 5 | `perf(rendering): convert safe pages to server components and enable static generation` | `app/people/e-board/page.tsx`, `app/people/leads/page.tsx`, all pages | `npm run build` |
| 6 | `perf(animations): pause off-screen animations and remove PageTransition remount key` | `logo-cloud-1/index.tsx`, `JoinUsSection.tsx`, `PageTransition.tsx` | `npm run build` |

---

## Success Criteria

### Verification Commands
```bash
# Build succeeds
npm run build                    # Expected: exit 0

# All content pages are static
npm run build 2>&1 | grep "○\|●" # Expected: 10+ static pages

# Public directory size
du -sh public/                    # Expected: < 20M

# No giant images
find public -type f -size +500k   # Expected: 0 or ≤2 hero images

# No dead HEIC files
find public -iname "*.heic" -o -iname "*.heif" | wc -l  # Expected: 0

# Font swap present
grep -c "swap" app/layout.tsx     # Expected: ≥ 3

# Package imports optimized
grep "optimizePackageImports" next.config.ts  # Expected: match

# Dead config removed
test -f tailwind.config.ts && echo "FAIL" || echo "PASS"  # Expected: PASS
```

### Final Checklist
- [x] All "Must Have" items present ✅
- [x] All "Must NOT Have" guardrails respected ✅
- [x] All 7 tasks completed with individual build verification ✅
- [x] Visual regression < 2% on all 18 screenshots ✅
- [x] Lighthouse Performance ≥ 80 ✅ (Achieved: 93/100)
- [x] Zero console errors ✅
- [x] Newsletter form functional ✅
